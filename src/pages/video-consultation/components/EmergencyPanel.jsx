import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyPanel = ({ currentLanguage = 'en', onEmergencyAction }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedEmergency, setSelectedEmergency] = useState(null);

  const getEmergencyLabels = () => {
    switch (currentLanguage) {
      case 'hi':
        return {
          emergency: 'आपातकाल',
          callAmbulance: 'एम्बुलेंस बुलाएं',
          callSpecialist: 'विशेषज्ञ को बुलाएं',
          sendAlert: 'अलर्ट भेजें',
          shareLocation: 'स्थान साझा करें',
          medicalHistory: 'चिकित्सा इतिहास',
          allergies: 'एलर्जी की जानकारी',
          emergencyContact: 'आपातकालीन संपर्क',
          confirm: 'पुष्टि करें',
          cancel: 'रद्द करें'
        };
      case 'pa':
        return {
          emergency: 'ਐਮਰਜੈਂਸੀ',
          callAmbulance: 'ਐਂਬੂਲੈਂਸ ਬੁਲਾਓ',
          callSpecialist: 'ਮਾਹਰ ਨੂੰ ਬੁਲਾਓ',
          sendAlert: 'ਅਲਰਟ ਭੇਜੋ',
          shareLocation: 'ਸਥਾਨ ਸਾਂਝਾ ਕਰੋ',
          medicalHistory: 'ਮੈਡੀਕਲ ਇਤਿਹਾਸ',
          allergies: 'ਐਲਰਜੀ ਦੀ ਜਾਣਕਾਰੀ',
          emergencyContact: 'ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ',
          confirm: 'ਪੁਸ਼ਟੀ ਕਰੋ',
          cancel: 'ਰੱਦ ਕਰੋ'
        };
      default:
        return {
          emergency: 'Emergency',
          callAmbulance: 'Call Ambulance',
          callSpecialist: 'Call Specialist',
          sendAlert: 'Send Alert',
          shareLocation: 'Share Location',
          medicalHistory: 'Medical History',
          allergies: 'Allergies Info',
          emergencyContact: 'Emergency Contact',
          confirm: 'Confirm',
          cancel: 'Cancel'
        };
    }
  };

  const emergencyActions = [
    {
      id: 'ambulance',
      icon: 'Truck',
      color: 'bg-error text-white',
      priority: 'critical'
    },
    {
      id: 'specialist',
      icon: 'UserPlus',
      color: 'bg-warning text-white',
      priority: 'high'
    },
    {
      id: 'alert',
      icon: 'AlertTriangle',
      color: 'bg-orange-500 text-white',
      priority: 'medium'
    },
    {
      id: 'location',
      icon: 'MapPin',
      color: 'bg-primary text-white',
      priority: 'low'
    }
  ];

  const patientInfo = {
    allergies: ['Penicillin', 'Shellfish'],
    bloodType: 'O+',
    emergencyContact: '+91 98765 43210',
    medicalConditions: ['Hypertension', 'Diabetes Type 2']
  };

  const labels = getEmergencyLabels();

  const handleEmergencyClick = (actionId) => {
    setSelectedEmergency(actionId);
  };

  const handleConfirmEmergency = () => {
    if (onEmergencyAction) {
      onEmergencyAction(selectedEmergency);
    }
    setSelectedEmergency(null);
    setIsExpanded(false);
  };

  return (
    <div className="fixed top-1/2 left-4 transform -translate-y-1/2 z-400">
      {/* Emergency Toggle Button */}
      <Button
        variant="destructive"
        size="icon"
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-12 h-12 rounded-full shadow-medical-lg transition-all duration-300 ${
          isExpanded ? 'scale-110' : 'hover:scale-105'
        } ${isExpanded ? 'animate-pulse-medical' : ''}`}
      >
        <Icon name="AlertCircle" size={20} color="white" />
      </Button>
      {/* Emergency Panel */}
      {isExpanded && (
        <div className="absolute left-16 top-1/2 transform -translate-y-1/2 w-80 glass-card border border-white/20 rounded-xl shadow-medical-lg">
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={20} className="text-error" />
                <h3 className="font-heading font-semibold text-foreground">
                  {labels?.emergency}
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsExpanded(false)}
                iconName="X"
                iconSize={16}
                className="text-muted-foreground hover:text-foreground"
              />
            </div>

            {/* Emergency Actions */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {emergencyActions?.map((action) => (
                <Button
                  key={action?.id}
                  variant="outline"
                  onClick={() => handleEmergencyClick(action?.id)}
                  className={`h-16 flex-col space-y-1 ${
                    selectedEmergency === action?.id ? action?.color : 'hover:bg-muted'
                  }`}
                >
                  <Icon name={action?.icon} size={20} />
                  <span className="text-xs font-caption">
                    {labels?.[action?.id === 'ambulance' ? 'callAmbulance' :
                            action?.id === 'specialist' ? 'callSpecialist' :
                            action?.id === 'alert'? 'sendAlert' : 'shareLocation']}
                  </span>
                </Button>
              ))}
            </div>

            {/* Patient Critical Info */}
            <div className="space-y-3 mb-4">
              <h4 className="font-heading font-medium text-foreground text-sm">
                Critical Information
              </h4>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-caption">Blood Type:</span>
                  <span className="font-caption font-medium text-foreground">
                    {patientInfo?.bloodType}
                  </span>
                </div>
                
                <div className="flex items-start justify-between text-sm">
                  <span className="text-muted-foreground font-caption">Allergies:</span>
                  <div className="text-right">
                    {patientInfo?.allergies?.map((allergy, index) => (
                      <span key={index} className="block font-caption text-error text-xs">
                        {allergy}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-caption">Emergency Contact:</span>
                  <span className="font-caption font-medium text-foreground text-xs">
                    {patientInfo?.emergencyContact}
                  </span>
                </div>
              </div>
            </div>

            {/* Medical Conditions */}
            <div className="mb-4">
              <h4 className="font-heading font-medium text-foreground text-sm mb-2">
                Medical Conditions
              </h4>
              <div className="flex flex-wrap gap-1">
                {patientInfo?.medicalConditions?.map((condition, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-warning/10 text-warning text-xs font-caption rounded-full"
                  >
                    {condition}
                  </span>
                ))}
              </div>
            </div>

            {/* Confirmation */}
            {selectedEmergency && (
              <div className="border-t border-white/10 pt-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="AlertTriangle" size={16} className="text-warning" />
                  <span className="text-sm font-caption text-foreground">
                    Confirm emergency action?
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleConfirmEmergency}
                    className="flex-1"
                  >
                    {labels?.confirm}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedEmergency(null)}
                    className="flex-1"
                  >
                    {labels?.cancel}
                  </Button>
                </div>
              </div>
            )}

            {/* Quick Access Numbers */}
            <div className="border-t border-white/10 pt-4 mt-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="text-xs">
                  <div className="font-caption font-medium text-foreground">108</div>
                  <div className="text-muted-foreground">Ambulance</div>
                </div>
                <div className="text-xs">
                  <div className="font-caption font-medium text-foreground">102</div>
                  <div className="text-muted-foreground">Emergency</div>
                </div>
                <div className="text-xs">
                  <div className="font-caption font-medium text-foreground">100</div>
                  <div className="text-muted-foreground">Police</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyPanel;