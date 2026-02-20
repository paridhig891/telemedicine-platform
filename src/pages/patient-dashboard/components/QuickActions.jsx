import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const getLabels = () => {
    switch (currentLanguage) {
      case 'hi':
        return {
          title: 'त्वरित कार्य',
          bookAppointment: 'अपॉइंटमेंट बुक करें',
          findMedicine: 'दवा खोजें',
          symptomChecker: 'लक्षण चेकर',
          healthRecords: 'स्वास्थ्य रिकॉर्ड',
          videoConsult: 'वीडियो परामर्श',
          emergencyHelp: 'आपातकालीन सहायता'
        };
      case 'pa':
        return {
          title: 'ਤੇਜ਼ ਕਾਰਵਾਈਆਂ',
          bookAppointment: 'ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ',
          findMedicine: 'ਦਵਾਈ ਲੱਭੋ',
          symptomChecker: 'ਲੱਛਣ ਚੈਕਰ',
          healthRecords: 'ਸਿਹਤ ਰਿਕਾਰਡ',
          videoConsult: 'ਵੀਡੀਓ ਸਲਾਹ',
          emergencyHelp: 'ਐਮਰਜੈਂਸੀ ਮਦਦ'
        };
      default:
        return {
          title: 'Quick Actions',
          bookAppointment: 'Appointment',
          findMedicine: 'Medicine',
          symptomChecker: 'SymptomAI',
          healthRecords: 'Records',
          videoConsult: 'Consultation',
          emergencyHelp: 'Emergency'
        };
    }
  };

  const labels = getLabels();

  const quickActions = [
    {
      id: 'appointment',
      label: labels?.bookAppointment,
      icon: 'Calendar',
      color: 'bg-blue-600',
      route: '/appointment-booking',
      description: 'Schedule with doctors'
    },
    {
      id: 'medicine',
      label: labels?.findMedicine,
      icon: 'Pill',
      color: 'bg-blue-600',
      route: '/medicine-availability',
      description: 'Search nearby pharmacies'
    },
    {
      id: 'symptom',
      label: labels?.symptomChecker,
      icon: 'Stethoscope',
      color: 'bg-blue-600',
      route: '/symptomchecker',
      description: 'AI-powered diagnosis',
      action: 'symptom-checker'
    },
    {
      id: 'records',
      label: labels?.healthRecords,
      icon: 'FileText',
      color: 'bg-blue-600',
      route: '/digital-health-records',
      description: 'View medical history'
    },
    {
      id: 'video',
      label: labels?.videoConsult,
      icon: 'Video',
      color: 'bg-blue-600',
      route: '/video-consultation',
      description: 'Start consultation'
    },
    {
      id: 'emergency',
      label: labels?.emergencyHelp,
      icon: 'Phone',
      color: 'bg-red-700',
      route: '#',
      description: 'Emergency services',
      action: 'emergency'
    }
  ];

  const handleActionClick = (action) => {
    if (action?.action === 'symptom-checker') {
     navigate('/symptomchecker')
      console.log('Opening AI symptom checker...');
      // This would typically trigger the AI assistant component
    } else if (action?.action === 'emergency') {
      // Handle emergency action
      console.log('Emergency services activated...');
      // This would typically show emergency contacts or call emergency services
    } else if (action?.route && action?.route !== '#') {
      navigate(action?.route);
    }
  };

  return (
    <div className="glass-card border border-white/20 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4 ">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {labels?.title}
        </h3>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-muted-foreground font-caption">
            All services available
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions?.map((action) => (
          <Button
            key={action?.id}
            variant="ghost"
            onClick={() => handleActionClick(action)}
            className="h-auto p-0 hover:scale-105 transition-transform duration-200 w-full "
          >
            <div className={`${action?.color} rounded-xl p-4 w-full text-white relative overflow-hidden group`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              
              <div className="relative z-10 text-center">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200">
                  <Icon 
                    name={action?.icon} 
                    size={24} 
                    color="white" 
                  />
                </div>
                
                <h4 className="font-heading font-medium text-white mb-1 text-xs ">
                  {action?.label}
                </h4>
                
                <p className="text-xs text-white/80 font-caption">
                  {action?.description}
                </p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              
              {/* Decorative Elements */}
              <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white/10 opacity-50" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-white/10 opacity-30" />
            </div>
          </Button>
        ))}
      </div>
      {/* Cloud Sync Status */}
      <div className="mt-4 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Cloud" size={16} className="text-success" />
            <span className="text-sm text-muted-foreground font-caption">
              Data synced • Last updated: 2 minutes ago
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs text-success font-caption">
              Online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;