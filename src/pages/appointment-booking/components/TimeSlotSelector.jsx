import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TimeSlotSelector = ({ selectedDoctor, selectedDate, onSlotSelect, selectedSlot, currentLanguage }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('morning');

  const periods = {
    morning: {
      en: 'Morning',
      hi: 'सुबह',
      pa: 'ਸਵੇਰ',
      icon: 'Sunrise',
      color: 'text-warning'
    },
    afternoon: {
      en: 'Afternoon',
      hi: 'दोपहर',
      pa: 'ਦੁਪਹਿਰ',
      icon: 'Sun',
      color: 'text-primary'
    },
    evening: {
      en: 'Evening',
      hi: 'शाम',
      pa: 'ਸ਼ਾਮ',
      icon: 'Sunset',
      color: 'text-secondary'
    }
  };

  const getAvailableSlots = () => {
    if (!selectedDoctor || !selectedDate) return [];
    
    const dateStr = selectedDate?.toDateString();
    const doctorSlots = selectedDoctor?.availableSlots?.filter(slot => 
      new Date(slot.date)?.toDateString() === dateStr
    );

    // Group slots by period
    const groupedSlots = {
      morning: [1,1,1,1,1].map((_,i)=>({id:i+1,time:`0${8+i}:00`,duration:30,isBooked:false,isUrgent:i%3===0})), // Dummy slots from 08:00 to 11:00
      afternoon: [1,1,1,1,1,1].map((_,i)=>({id:i+1,time:`0${1+i}:00`,duration:30,isBooked:false,isUrgent:i%3===0})),
      evening: [1,1,1].map((_,i)=>({id:i+1,time:`0${7+i}:00`,duration:30,isBooked:false,isUrgent:i%3===0})),
    };

    doctorSlots?.forEach(slot => {
      const hour = parseInt(slot?.time?.split(':')?.[0]);
      if (hour < 12) {
        groupedSlots?.morning?.push(slot);
      } else if (hour < 17) {
        groupedSlots?.afternoon?.push(slot);
      } else {
        groupedSlots?.evening?.push(slot);
      }
    });

    return groupedSlots?.[selectedPeriod] || [];
  };

  const formatDate = (date) => {
    return `${date?.getDate()?.toString()?.padStart(2, '0')}/${(date?.getMonth() + 1)?.toString()?.padStart(2, '0')}/${date?.getFullYear()}`;
  };

  const getSlotStatus = (slot) => {
    if (slot?.isBooked) return 'booked';
    if (slot?.isUrgent) return 'urgent';
    return 'available';
  };

  const getSlotStatusColor = (status) => {
    switch (status) {
      case 'booked':
        return 'bg-muted text-muted-foreground cursor-not-allowed';
      case 'urgent':
        return 'bg-warning/10 text-warning border-warning/20 hover:bg-warning/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/20';
    }
  };

  const availableSlots = getAvailableSlots();

  if (!selectedDoctor || !selectedDate) {
    return (
      <div className="glass-card border border-white/20 rounded-xl p-6">
        <div className="text-center py-8">
          <Icon name="Clock" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            {currentLanguage === 'hi' ? 'समय स्लॉट चुनें' : 
             currentLanguage === 'pa' ? 'ਸਮਾਂ ਸਲਾਟ ਚੁਣੋ' : 'Select Time Slot'}
          </h3>
          <p className="text-sm font-caption text-muted-foreground">
            {currentLanguage === 'hi' ? 'पहले डॉक्टर और तारीख चुनें।' : 
             currentLanguage === 'pa' ? 'ਪਹਿਲਾਂ ਡਾਕਟਰ ਅਤੇ ਮਿਤੀ ਚੁਣੋ।' : 'Please select doctor and date first.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card border border-white/20 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {currentLanguage === 'hi' ? 'उपलब्ध समय स्लॉट' : 
           currentLanguage === 'pa' ? 'ਉਪਲਬਧ ਸਮਾਂ ਸਲਾਟ' : 'Available Time Slots'}
        </h3>
        <div className="text-sm font-caption text-muted-foreground">
          {formatDate(selectedDate)}
        </div>
      </div>
      {/* Period Selector */}
      <div className="flex space-x-1 mb-6 p-1 bg-muted/30 rounded-lg">
        {Object.entries(periods)?.map(([key, period]) => (
          <button
            key={key}
            onClick={() => setSelectedPeriod(key)}
            className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-caption transition-all duration-150 ${
              selectedPeriod === key
                ? 'bg-primary text-primary-foreground shadow-medical-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            }`}
          >
            <Icon name={period?.icon} size={14} />
            <span>{period?.[currentLanguage]}</span>
          </button>
        ))}
      </div>
      {/* Time Slots Grid */}
      {availableSlots?.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {availableSlots?.map((slot, index) => {
            const status = getSlotStatus(slot);
            const isSelected = selectedSlot && selectedSlot?.id === slot?.id;
            
            return (
              <button
                key={index}
                onClick={() => status !== 'booked' && onSlotSelect(slot)}
                disabled={status === 'booked'}
                className={`
                  relative p-3 rounded-lg border text-sm font-caption transition-all duration-150 micro-interact
                  ${isSelected 
                    ? 'bg-primary text-primary-foreground border-primary shadow-medical-sm' 
                    : getSlotStatusColor(status)
                  }
                `}
              >
                <div className="flex flex-col items-center space-y-1">
                  <span className="font-medium">{slot?.time}</span>
                  <span className="text-xs opacity-75">
                    {slot?.duration || '30'} {currentLanguage === 'hi' ? 'मिनट' : 
                                            currentLanguage === 'pa' ? 'ਮਿੰਟ' : 'min'}
                  </span>
                  
                  {status === 'urgent' && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Zap" size={10} />
                      <span className="text-xs">
                        {currentLanguage === 'hi' ? 'तत्काल' : 
                         currentLanguage === 'pa' ? 'ਤੁਰੰਤ' : 'Urgent'}
                      </span>
                    </div>
                  )}
                  
                  {status === 'booked' && (
                    <div className="flex items-center space-x-1">
                      <Icon name="X" size={10} />
                      <span className="text-xs">
                        {currentLanguage === 'hi' ? 'बुक्ड' : 
                         currentLanguage === 'pa' ? 'ਬੁੱਕ' : 'Booked'}
                      </span>
                    </div>
                  )}
                </div>
                {isSelected && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} color="white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="Clock" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-base font-heading font-medium text-foreground mb-2">
            {currentLanguage === 'hi' ? 'कोई स्लॉट उपलब्ध नहीं' : 
             currentLanguage === 'pa' ? 'ਕੋਈ ਸਲਾਟ ਉਪਲਬਧ ਨਹੀਂ' : 'No Slots Available'}
          </h4>
          <p className="text-sm font-caption text-muted-foreground mb-4">
            {currentLanguage === 'hi' ? `${periods?.[selectedPeriod]?.hi} के लिए कोई स्लॉट उपलब्ध नहीं है।` : 
             currentLanguage === 'pa' ? `${periods?.[selectedPeriod]?.pa} ਲਈ ਕੋਈ ਸਲਾਟ ਉਪਲਬਧ ਨਹੀਂ ਹੈ।` : 
             `No slots available for ${periods?.[selectedPeriod]?.en?.toLowerCase()}.`}
          </p>
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            iconSize={14}
          >
            {currentLanguage === 'hi' ? 'अन्य समय देखें' : 
             currentLanguage === 'pa' ? 'ਹੋਰ ਸਮਾਂ ਦੇਖੋ' : 'Try Different Time'}
          </Button>
        </div>
      )}
      {/* Selected Slot Info */}
      {selectedSlot && (
        <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Icon name="Clock" size={14} className="text-primary" />
              </div>
              <div>
                <h4 className="text-sm font-heading font-medium text-foreground">
                  {currentLanguage === 'hi' ? 'चयनित समय स्लॉट' : 
                   currentLanguage === 'pa' ? 'ਚੁਣਿਆ ਗਿਆ ਸਮਾਂ ਸਲਾਟ' : 'Selected Time Slot'}
                </h4>
                <p className="text-sm font-caption text-muted-foreground">
                  {selectedSlot?.time} - {selectedSlot?.duration || '30'} {currentLanguage === 'hi' ? 'मिनट' : 
                                                                        currentLanguage === 'pa' ? 'ਮਿੰਟ' : 'minutes'}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onSlotSelect(null)}
              iconName="X"
              iconSize={14}
              className="text-muted-foreground hover:text-foreground"
            />
          </div>
        </div>
      )}
      {/* Slot Legend */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center justify-center space-x-6 text-xs font-caption">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-primary/20 border border-primary/20" />
            <span className="text-muted-foreground">
              {currentLanguage === 'hi' ? 'उपलब्ध' : 
               currentLanguage === 'pa' ? 'ਉਪਲਬਧ' : 'Available'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-warning/20 border border-warning/20" />
            <span className="text-muted-foreground">
              {currentLanguage === 'hi' ? 'तत्काल' : 
               currentLanguage === 'pa' ? 'ਤੁਰੰਤ' : 'Urgent'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded bg-muted" />
            <span className="text-muted-foreground">
              {currentLanguage === 'hi' ? 'बुक्ड' : 
               currentLanguage === 'pa' ? 'ਬੁੱਕ' : 'Booked'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSlotSelector;