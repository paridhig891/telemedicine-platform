import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const DoctorCard = ({ doctor, onSelect, isSelected, currentLanguage, selectedDate }) => {
  const getSpecializationText = () => {
    switch (currentLanguage) {
      case 'hi':
        return doctor?.specialization_hi || doctor?.specialization;
      case 'pa':
        return doctor?.specialization_pa || doctor?.specialization;
      default:
        return doctor?.specialization;
    }
  };

  const getAvailableSlots = () => {
    if (!selectedDate) return [];
    const dateStr = selectedDate?.toDateString();
    return doctor?.availableSlots?.filter(slot => 
      new Date(slot.date)?.toDateString() === dateStr
    );
  };

  const formatFee = (fee) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    })?.format(fee);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < Math.floor(rating) ? 'text-warning fill-current' : 'text-muted-foreground/30'}
      />
    ));
  };

  const availableSlots = getAvailableSlots();

  return (
    <div className={`glass-card border rounded-xl p-4 transition-all duration-200 micro-interact ${
      isSelected 
        ? 'border-primary/40 bg-primary/5 shadow-medical-md' 
        : 'border-white/20 hover:border-primary/20 hover:bg-primary/2'
    }`}>
      <div className="flex items-start space-x-4">
        {/* Doctor Avatar */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20">
            <Image
              src={doctor?.avatar}
              alt={doctor?.name}
              className="w-full h-full object-cover"
            />
          </div>
          {doctor?.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-white flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse-medical" />
            </div>
          )}
        </div>

        {/* Doctor Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-base font-heading font-semibold text-foreground truncate">
                {doctor?.name}
              </h3>
              <p className="text-sm font-caption text-muted-foreground">
                {getSpecializationText()}
              </p>
            </div>
            <div className="flex items-center space-x-1 ml-2">
              {renderStars(doctor?.rating)}
              <span className="text-sm font-caption text-muted-foreground ml-1">
                ({doctor?.reviewCount})
              </span>
            </div>
          </div>

          {/* Experience and Languages */}
          <div className="flex items-center space-x-4 mb-3 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Award" size={12} />
              <span className="font-caption">
                {doctor?.experience} {currentLanguage === 'hi' ? 'साल अनुभव' : 
                                   currentLanguage === 'pa' ? 'ਸਾਲ ਤਜਰਬਾ' : 'years exp'}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Globe" size={12} />
              <span className="font-caption">
                {doctor?.languages?.join(', ')}
              </span>
            </div>
          </div>

          {/* Consultation Fee */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Icon name="IndianRupee" size={14} className="text-primary" />
              <span className="text-sm font-caption font-medium text-foreground">
                {formatFee(doctor?.consultationFee)}
              </span>
              <span className="text-xs text-muted-foreground font-caption">
                {currentLanguage === 'hi' ? 'परामर्श शुल्क' : 
                 currentLanguage === 'pa' ? 'ਸਲਾਹ ਫੀਸ' : 'consultation'}
              </span>
            </div>
            {doctor?.nextAvailable && (
              <div className="flex items-center space-x-1 text-xs text-success">
                <Icon name="Clock" size={12} />
                <span className="font-caption">
                  {currentLanguage === 'hi' ? 'अगला उपलब्ध:' : 
                   currentLanguage === 'pa' ? 'ਅਗਲਾ ਉਪਲਬਧ:' : 'Next:'} {doctor?.nextAvailable}
                </span>
              </div>
            )}
          </div>

          {/* Available Time Slots */}
          {selectedDate && availableSlots?.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-caption text-muted-foreground mb-2">
                {currentLanguage === 'hi' ? 'उपलब्ध समय:' : 
                 currentLanguage === 'pa' ? 'ਉਪਲਬਧ ਸਮਾਂ:' : 'Available Times:'}
              </p>
              <div className="flex flex-wrap gap-2">
                {availableSlots?.slice(0, 4)?.map((slot, index) => (
                  <div
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-caption border border-primary/20"
                  >
                    {slot?.time}
                  </div>
                ))}
                {availableSlots?.length > 4 && (
                  <div className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs font-caption">
                    +{availableSlots?.length - 4} {currentLanguage === 'hi' ? 'और' : 
                                                  currentLanguage === 'pa' ? 'ਹੋਰ' : 'more'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="flex items-center space-x-2">
            <Button
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => onSelect(doctor)}
              iconName={isSelected ? "Check" : "Calendar"}
              iconPosition="left"
              iconSize={14}
              className="flex-1"
            >
              {isSelected 
                ? (currentLanguage === 'hi' ? 'चयनित' : 
                   currentLanguage === 'pa' ? 'ਚੁਣਿਆ ਗਿਆ' : 'Selected')
                : (currentLanguage === 'hi' ? 'चुनें' : 
                   currentLanguage === 'pa' ? 'ਚੁਣੋ' : 'Select')
              }
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="MessageCircle"
              iconSize={14}
              className="text-muted-foreground hover:text-foreground"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;