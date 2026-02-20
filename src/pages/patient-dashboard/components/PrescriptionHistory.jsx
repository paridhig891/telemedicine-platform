import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrescriptionHistory = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const prescriptions = [
    {
      id: 1,
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      type: "diabetes",
      refillDate: "2025-01-15",
      daysLeft: 17,
      doctor: "Dr. Sarah Wilson",
      instructions: "Take with meals",
      isActive: true
    },
    {
      id: 2,
      name: "Lisinopril",
      dosage: "10mg",
      frequency: "Once daily",
      type: "blood_pressure",
      refillDate: "2025-01-20",
      daysLeft: 22,
      doctor: "Dr. Michael Chen",
      instructions: "Take in the morning",
      isActive: true
    },
    {
      id: 3,
      name: "Atorvastatin",
      dosage: "20mg",
      frequency: "Once daily",
      type: "cholesterol",
      refillDate: "2025-01-10",
      daysLeft: 12,
      doctor: "Dr. Sarah Wilson",
      instructions: "Take at bedtime",
      isActive: true
    },
    {
      id: 4,
      name: "Omeprazole",
      dosage: "20mg",
      frequency: "Once daily",
      type: "gastric",
      refillDate: "2025-01-25",
      daysLeft: 27,
      doctor: "Dr. Emily Rodriguez",
      instructions: "Take before breakfast",
      isActive: false
    }
  ];

  const getLabels = () => {
    switch (currentLanguage) {
      case 'hi':
        return {
          title: 'दवा का इतिहास',
          current: 'वर्तमान दवाएं',
          refillIn: 'रिफिल में',
          days: 'दिन',
          viewAll: 'सभी देखें',
          refillReminder: 'रिफिल रिमाइंडर',
          instructions: 'निर्देश'
        };
      case 'pa':
        return {
          title: 'ਦਵਾਈ ਦਾ ਇਤਿਹਾਸ',
          current: 'ਮੌਜੂਦਾ ਦਵਾਈਆਂ',
          refillIn: 'ਰੀਫਿਲ ਵਿੱਚ',
          days: 'ਦਿਨ',
          viewAll: 'ਸਭ ਦੇਖੋ',
          refillReminder: 'ਰੀਫਿਲ ਰਿਮਾਈਂਡਰ',
          instructions: 'ਹਿਦਾਇਤਾਂ'
        };
      default:
        return {
          title: 'Prescription History',
          current: 'Current Medications',
          refillIn: 'Refill in',
          days: 'days',
          viewAll: 'View All',
          refillReminder: 'Refill Reminder',
          instructions: 'Instructions'
        };
    }
  };

  const getMedicineTypeColor = (type) => {
    switch (type) {
      case 'diabetes':
        return 'bg-blue-500';
      case 'blood_pressure':
        return 'bg-red-500';
      case 'cholesterol':
        return 'bg-yellow-500';
      case 'gastric':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getMedicineTypeIcon = (type) => {
    switch (type) {
      case 'diabetes':
        return 'Droplets';
      case 'blood_pressure':
        return 'Heart';
      case 'cholesterol':
        return 'Activity';
      case 'gastric':
        return 'Shield';
      default:
        return 'Pill';
    }
  };

  const labels = getLabels();
  const activePrescriptions = prescriptions?.filter(p => p?.isActive);

  return (
    <div className="glass-card border border-white/20 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {labels?.title}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/digital-health-records')}
          iconName="ExternalLink"
          iconSize={16}
          className="text-muted-foreground hover:text-foreground"
        >
          {labels?.viewAll}
        </Button>
      </div>
      <div className="mb-4">
        <h4 className="text-sm font-heading font-medium text-foreground mb-3">
          {labels?.current}
        </h4>
        
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {activePrescriptions?.map((prescription) => (
            <div
              key={prescription?.id}
              className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-150 micro-interact"
            >
              <div className={`w-10 h-10 rounded-full ${getMedicineTypeColor(prescription?.type)} flex items-center justify-center flex-shrink-0`}>
                <Icon 
                  name={getMedicineTypeIcon(prescription?.type)} 
                  size={18} 
                  color="white" 
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h5 className="font-heading font-medium text-foreground truncate">
                    {prescription?.name}
                  </h5>
                  <div className={`px-2 py-1 rounded-full text-xs font-caption ${
                    prescription?.daysLeft <= 7 
                      ? 'bg-error/10 text-error' 
                      : prescription?.daysLeft <= 14 
                        ? 'bg-warning/10 text-warning' :'bg-success/10 text-success'
                  }`}>
                    {prescription?.daysLeft} {labels?.days}
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-sm text-muted-foreground font-caption">
                    {prescription?.dosage} • {prescription?.frequency}
                  </span>
                </div>
                
                <p className="text-xs text-muted-foreground font-caption mt-1">
                  {labels?.instructions}: {prescription?.instructions}
                </p>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/medicine-availability')}
                iconName="ShoppingCart"
                iconSize={16}
                className="text-muted-foreground hover:text-foreground flex-shrink-0"
              />
            </div>
          ))}
        </div>
      </div>
      {/* Refill Reminders */}
      <div className="border-t border-white/10 pt-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Bell" size={16} className="text-warning" />
          <h4 className="text-sm font-heading font-medium text-foreground">
            {labels?.refillReminder}
          </h4>
        </div>

        <div className="space-y-2">
          {activePrescriptions?.filter(p => p?.daysLeft <= 14)?.map((prescription) => (
              <div
                key={`reminder-${prescription?.id}`}
                className="flex items-center justify-between p-2 bg-warning/5 border border-warning/20 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-warning animate-pulse" />
                  <span className="text-sm font-caption text-foreground">
                    {prescription?.name} - {labels?.refillIn} {prescription?.daysLeft} {labels?.days}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="xs"
                  onClick={() => navigate('/medicine-availability')}
                  className="text-xs px-2 py-1 h-6"
                >
                  Order
                </Button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PrescriptionHistory;