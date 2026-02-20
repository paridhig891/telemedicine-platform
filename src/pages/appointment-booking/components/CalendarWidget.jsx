import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalendarWidget = ({ selectedDate, onDateSelect, availableSlots, currentLanguage }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);

  const monthNames = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    hi: ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'],
    pa: ['ਜਨਵਰੀ', 'ਫਰਵਰੀ', 'ਮਾਰਚ', 'ਅਪ੍ਰੈਲ', 'ਮਈ', 'ਜੂਨ', 'ਜੁਲਾਈ', 'ਅਗਸਤ', 'ਸਤੰਬਰ', 'ਅਕਤੂਬਰ', 'ਨਵੰਬਰ', 'ਦਸੰਬਰ']
  };

  const dayNames = {
    en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    hi: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
    pa: ['ਐਤ', 'ਸੋਮ', 'ਮੰਗਲ', 'ਬੁੱਧ', 'ਵੀਰ', 'ਸ਼ੁੱਕਰ', 'ਸ਼ਨੀ']
  };

  useEffect(() => {
    generateCalendarDays();
  }, [currentMonth]);

  const generateCalendarDays = () => {
    const year = currentMonth?.getFullYear();
    const month = currentMonth?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate?.setDate(startDate?.getDate() - firstDay?.getDay());

    const days = [];
    const today = new Date();
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date?.setDate(startDate?.getDate() + i);
      
      const isCurrentMonth = date?.getMonth() === month;
      const isToday = date?.toDateString() === today?.toDateString();
      const isPast = date < today && !isToday;
      const hasSlots = availableSlots?.some(slot => 
        new Date(slot.date)?.toDateString() === date?.toDateString()
      );
      
      days?.push({
        date,
        day: date?.getDate(),
        isCurrentMonth,
        isToday,
        isPast,
        hasSlots,
        isSelected: selectedDate && date?.toDateString() === selectedDate?.toDateString()
      });
    }
    
    setCalendarDays(days);
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth?.setMonth(currentMonth?.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const formatDate = (date) => {
    return `${date?.getDate()?.toString()?.padStart(2, '0')}/${(date?.getMonth() + 1)?.toString()?.padStart(2, '0')}/${date?.getFullYear()}`;
  };

  return (
    <div className="glass-card border border-white/20 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {currentLanguage === 'hi' ? 'तारीख चुनें' : 
           currentLanguage === 'pa' ? 'ਮਿਤੀ ਚੁਣੋ' : 'Select Date'}
        </h3>
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth(-1)}
            iconName="ChevronLeft"
            iconSize={16}
            className="text-muted-foreground hover:text-foreground"
          />
          <h4 className="text-base font-heading font-medium text-foreground min-w-[140px] text-center">
            {monthNames?.[currentLanguage]?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
          </h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth(1)}
            iconName="ChevronRight"
            iconSize={16}
            className="text-muted-foreground hover:text-foreground"
          />
        </div>
      </div>
      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames?.[currentLanguage]?.map((day, index) => (
          <div key={index} className="p-2 text-center">
            <span className="text-sm font-caption font-medium text-muted-foreground">
              {day}
            </span>
          </div>
        ))}
      </div>
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays?.map((day, index) => (
          <button
            key={index}
            onClick={() => !day?.isPast && day?.isCurrentMonth && onDateSelect(day?.date)}
            disabled={day?.isPast || !day?.isCurrentMonth}
            className={`
              relative p-2 h-12 rounded-lg text-sm font-caption transition-all duration-150 micro-interact
              ${day?.isCurrentMonth 
                ? day?.isPast 
                  ? 'text-muted-foreground/50 cursor-not-allowed'
                  : day?.isSelected
                    ? 'bg-primary text-primary-foreground shadow-medical-sm'
                    : day?.hasSlots
                      ? 'text-foreground hover:bg-primary/10 border border-primary/20'
                      : 'text-muted-foreground hover:bg-muted' :'text-muted-foreground/30 cursor-not-allowed'
              }
              ${day?.isToday && !day?.isSelected ? 'ring-2 ring-primary/30' : ''}
            `}
          >
            <span>{day?.day}</span>
            {day?.hasSlots && day?.isCurrentMonth && !day?.isPast && (
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-medical" />
              </div>
            )}
          </button>
        ))}
      </div>
      {selectedDate && (
        <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-primary" />
            <span className="text-sm font-caption text-foreground">
              {currentLanguage === 'hi' ? 'चयनित तारीख:' : 
               currentLanguage === 'pa' ? 'ਚੁਣੀ ਗਈ ਮਿਤੀ:' : 'Selected Date:'} {formatDate(selectedDate)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarWidget;