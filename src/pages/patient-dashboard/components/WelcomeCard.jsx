import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeCard = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [timeUntilAppointment, setTimeUntilAppointment] = useState({
    hours: 5,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUntilAppointment(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getWelcomeMessage = () => {
    const hour = new Date()?.getHours();
    const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening';
    
    switch (currentLanguage) {
      case 'hi':
        return {
          greeting: hour < 12 ? 'सुप्रभात' : hour < 17 ? 'नमस्कार' : 'शुभ संध्या',
          message: 'आपका स्वास्थ्य हमारी प्राथमिकता है',
          nextAppointment: 'अगली अपॉइंटमेंट'
        };
      case 'pa':
        return {
          greeting: hour < 12 ? 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ' : hour < 17 ? 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ' : 'ਸ਼ੁਭ ਸ਼ਾਮ',
          message: 'ਤੁਹਾਡੀ ਸਿਹਤ ਸਾਡੀ ਪਹਿਲੀ ਤਰਜੀਹ ਹੈ',
          nextAppointment: 'ਅਗਲੀ ਮੁਲਾਕਾਤ'
        };
      default:
        return {
          greeting: `Good ${timeOfDay}`,
          message: 'Your health is our priority',
          nextAppointment: 'Next Appointment'
        };
    }
  };

  const messages = getWelcomeMessage();

  return (
    <div className="glass-card border border-white/20 rounded-xl p-6 mb-6 bg-blue-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
              <Icon name="User" size={24} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-semibold text-white">
                {messages?.greeting}, Ram
              </h2>
              <p className="text-white/80 font-caption">
                {messages?.message}
              </p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/digital-health-records')}
            iconName="FileText"
            iconSize={18}
            className="text-white/80 hover:text-white hover:bg-white/10"
          />
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading font-medium text-white">
              {messages?.nextAppointment}
            </h3>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-white/80 font-caption">Confirmed</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-caption font-medium">
                Dr. Nandani Gupta - Cardiology
              </p>
              <p className="text-xs text-white/80 font-caption">
                Today, 7:30 PM
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-white animate-counter">
                  {String(timeUntilAppointment?.hours)?.padStart(2, '0')}
                </div>
                <div className="text-xs text-white/80 font-caption">Hours</div>
              </div>
              <div className="text-white/60">:</div>
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-white animate-counter">
                  {String(timeUntilAppointment?.minutes)?.padStart(2, '0')}
                </div>
                <div className="text-xs text-white/80 font-caption">Minutes</div>
              </div>
              <div className="text-white/60">:</div>
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-white animate-counter">
                  {String(timeUntilAppointment?.seconds)?.padStart(2, '0')}
                </div>
                <div className="text-xs text-white/80 font-caption">Seconds</div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/video-consultation')}
              iconName="Video"
              iconPosition="left"
              iconSize={16}
              className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              Join Early
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/appointment-booking')}
              iconName="Calendar"
              iconSize={16}
              className="text-white/80 hover:text-white hover:bg-white/10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;