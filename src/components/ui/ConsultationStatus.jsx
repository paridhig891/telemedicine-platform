import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const ConsultationStatus = () => {
  const location = useLocation();
  const [consultationState, setConsultationState] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkConsultationStatus = () => {
      const now = new Date();
      const upcomingAppointment = new Date(now.getTime() + 15 * 60 * 1000); // 15 minutes from now
      const activeConsultation = location?.pathname === '/video-consultation';

      if (activeConsultation) {
        setConsultationState('active');
        setTimeRemaining('45:30'); // Mock active consultation time
        setIsVisible(true);
      } else if (now < upcomingAppointment) {
        setConsultationState('upcoming');
        setTimeRemaining(Math.ceil((upcomingAppointment - now) / (1000 * 60))); // Minutes remaining
        // setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    checkConsultationStatus();
    let interval = setInterval(checkConsultationStatus, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [location?.pathname]);

  useEffect(() => {
    let interval;
    if (consultationState === 'upcoming' && typeof timeRemaining === 'number') {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setConsultationState('ready');
            return 0;
          }
          return prev - 1;
        });
      }, 60000); // Update every minute
    }
    return () => clearInterval(interval);
  }, [consultationState, timeRemaining]);

  const getStatusConfig = () => {
    switch (consultationState) {
      case 'active':
        return {
          icon: 'Video',
          iconColor: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          title: 'Consultation Active',
          subtitle: `Time elapsed: ${timeRemaining}`,
          actionText: 'Return to Call',
          actionVariant: 'default',
          pulseColor: 'border-success'
        };
      case 'upcoming':
        return {
          icon: 'Clock',
          iconColor: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          title: 'Upcoming Consultation',
          subtitle: `Starts in ${timeRemaining} minutes`,
          actionText: 'Prepare',
          actionVariant: 'outline',
          pulseColor: 'border-warning'
        };
      case 'ready':
        return {
          icon: 'VideoIcon',
          iconColor: 'text-primary',
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary/20',
          title: 'Consultation Ready',
          subtitle: 'Your doctor is waiting',
          actionText: 'Join Now',
          actionVariant: 'default',
          pulseColor: 'border-primary'
        };
      default:
        return null;
    }
  };

  const handleAction = () => {
    if (consultationState === 'active') {
      // Return to active consultation
      window.location.href = '/video-consultation';
    } else if (consultationState === 'ready') {
      // Join consultation
      window.location.href = '/video-consultation';
    } else if (consultationState === 'upcoming') {
      // Open preparation checklist or appointment details
      console.log('Opening consultation preparation...');
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible || !consultationState) {
    return null;
  }

  const config = getStatusConfig();

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-400 w-full max-w-md px-4">
      <div className={`glass-card border ${config?.borderColor} ${config?.bgColor} rounded-xl shadow-medical-lg relative overflow-hidden`}>
        {/* Pulse Animation Border */}
        <div className={`absolute inset-0 rounded-xl border-2 ${config?.pulseColor} animate-pulse-medical opacity-50`} />
        
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full ${config?.bgColor} flex items-center justify-center`}>
                <Icon 
                  name={config?.icon} 
                  size={20} 
                  className={`${config?.iconColor} ${consultationState === 'active' ? 'status-pulse' : ''}`} 
                />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-foreground text-sm">
                  {config?.title}
                </h3>
                <p className="text-xs text-muted-foreground font-caption">
                  {config?.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={config?.actionVariant}
                size="sm"
                onClick={handleAction}
                className="text-xs px-3 py-1 h-8"
              >
                {config?.actionText}
              </Button>
              
              {consultationState !== 'active' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDismiss}
                  iconName="X"
                  iconSize={14}
                  className="w-8 h-8 p-0 text-muted-foreground hover:text-foreground"
                />
              )}
            </div>
          </div>

          {/* Additional Info for Active Consultation */}
          {consultationState === 'active' && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse-medical" />
                    <span className="text-muted-foreground font-caption">Connected</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={12} className="text-muted-foreground" />
                    <span className="text-muted-foreground font-caption">Dr. Sarah Wilson</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Mic"
                    iconSize={12}
                    className="w-6 h-6 p-0 text-muted-foreground hover:text-foreground"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Video"
                    iconSize={12}
                    className="w-6 h-6 p-0 text-muted-foreground hover:text-foreground"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Preparation Checklist for Upcoming */}
          {consultationState === 'upcoming' && timeRemaining <= 5 && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs">
                  <Icon name="CheckCircle" size={12} className="text-success" />
                  <span className="text-muted-foreground font-caption">Camera & microphone ready</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <Icon name="CheckCircle" size={12} className="text-success" />
                  <span className="text-muted-foreground font-caption">Stable internet connection</span>
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <Icon name="Clock" size={12} className="text-warning" />
                  <span className="text-muted-foreground font-caption">Have your medical records ready</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultationStatus;