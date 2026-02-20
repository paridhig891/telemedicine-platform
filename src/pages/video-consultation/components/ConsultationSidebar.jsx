import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ConsultationSidebar = ({ isVisible, onClose, currentLanguage = 'en' }) => {
  const [activeTab, setActiveTab] = useState('vitals');
  const [consultationTime, setConsultationTime] = useState(0);
  const [notes, setNotes] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setConsultationTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getTabLabels = () => {
    switch (currentLanguage) {
      case 'hi':
        return {
          vitals: 'जीवन संकेत',
          notes: 'नोट्स',
          prescription: 'नुस्खा',
          history: 'इतिहास'
        };
      case 'pa':
        return {
          vitals: 'ਜੀਵਨ ਸੰਕੇਤ',
          notes: 'ਨੋਟਸ',
          prescription: 'ਨੁਸਖਾ',
          history: 'ਇਤਿਹਾਸ'
        };
      default:
        return {
          vitals: 'Vitals',
          notes: 'Notes',
          prescription: 'Prescription',
          history: 'History'
        };
    }
  };

  const mockVitals = [
    {
      id: 1,
      type: 'heart_rate',
      label: currentLanguage === 'hi' ? 'हृदय गति' : currentLanguage === 'pa' ? 'ਦਿਲ ਦੀ ਗਤੀ' : 'Heart Rate',
      value: '78',
      unit: 'bpm',
      status: 'normal',
      icon: 'Heart',
      color: 'text-success'
    },
    {
      id: 2,
      type: 'blood_pressure',
      label: currentLanguage === 'hi' ? 'रक्तचाप' : currentLanguage === 'pa' ? 'ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ' : 'Blood Pressure',
      value: '120/80',
      unit: 'mmHg',
      status: 'normal',
      icon: 'Activity',
      color: 'text-primary'
    },
    {
      id: 3,
      type: 'temperature',
      label: currentLanguage === 'hi' ? 'तापमान' : currentLanguage === 'pa' ? 'ਤਾਪਮਾਨ' : 'Temperature',
      value: '98.6',
      unit: '°F',
      status: 'normal',
      icon: 'Thermometer',
      color: 'text-warning'
    },
    {
      id: 4,
      type: 'oxygen',
      label: currentLanguage === 'hi' ? 'ऑक्सीजन' : currentLanguage === 'pa' ? 'ਆਕਸੀਜਨ' : 'Oxygen Saturation',
      value: '98',
      unit: '%',
      status: 'normal',
      icon: 'Wind',
      color: 'text-accent'
    }
  ];

  const mockPrescriptions = [
    {
      id: 1,
      medicine: 'Paracetamol 500mg',
      dosage: '1 tablet twice daily',
      duration: '5 days',
      type: 'tablet',
      color: 'bg-blue-100 text-blue-800'
    },
    {
      id: 2,
      medicine: 'Amoxicillin 250mg',
      dosage: '1 capsule thrice daily',
      duration: '7 days',
      type: 'capsule',
      color: 'bg-green-100 text-green-800'
    }
  ];

  const tabLabels = getTabLabels();

  const renderVitalsTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-foreground">
          {tabLabels?.vitals}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="RefreshCw"
          iconSize={14}
          className="text-muted-foreground hover:text-foreground"
        />
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {mockVitals?.map((vital) => (
          <div key={vital?.id} className="glass-card p-3 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name={vital?.icon} size={16} className={vital?.color} />
                <span className="text-sm font-caption text-foreground">
                  {vital?.label}
                </span>
              </div>
              <div className="text-right">
                <span className="text-sm font-heading font-semibold text-foreground">
                  {vital?.value}
                </span>
                <span className="text-xs text-muted-foreground ml-1">
                  {vital?.unit}
                </span>
              </div>
            </div>
            <div className="mt-2">
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-caption ${
                vital?.status === 'normal' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full mr-1 ${
                  vital?.status === 'normal' ? 'bg-success' : 'bg-warning'
                }`} />
                {vital?.status === 'normal' ? 
                  (currentLanguage === 'hi' ? 'सामान्य' : currentLanguage === 'pa' ? 'ਸਾਧਾਰਨ' : 'Normal') :
                  (currentLanguage === 'hi' ? 'असामान्य' : currentLanguage === 'pa' ? 'ਅਸਾਧਾਰਨ' : 'Abnormal')
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderNotesTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-foreground">
          {tabLabels?.notes}
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant={isRecording ? "destructive" : "outline"}
            size="sm"
            onClick={() => setIsRecording(!isRecording)}
            iconName={isRecording ? "Square" : "Mic"}
            iconSize={14}
            className={isRecording ? "animate-pulse-medical" : ""}
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Save"
            iconSize={14}
            className="text-muted-foreground hover:text-foreground"
          />
        </div>
      </div>
      
      <div className="space-y-3">
        <Input
          type="textarea"
          placeholder={
            currentLanguage === 'hi' ? 'परामर्श नोट्स लिखें...' :
            currentLanguage === 'pa'? 'ਸਲਾਹ ਨੋਟਸ ਲਿਖੋ...' : 'Write consultation notes...'
          }
          value={notes}
          onChange={(e) => setNotes(e?.target?.value)}
          className="min-h-32"
        />
        
        <div className="flex flex-wrap gap-2">
          {['Chief Complaint', 'Diagnosis', 'Treatment Plan', 'Follow-up']?.map((template) => (
            <Button
              key={template}
              variant="ghost"
              size="sm"
              onClick={() => setNotes(prev => prev + `\n${template}: `)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              {template}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrescriptionTab = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-foreground">
          {tabLabels?.prescription}
        </h3>
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconSize={14}
          className="text-muted-foreground hover:text-foreground"
        />
      </div>
      
      <div className="space-y-3">
        {mockPrescriptions?.map((prescription) => (
          <div key={prescription?.id} className="glass-card p-3 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-caption font-medium text-foreground">
                  {prescription?.medicine}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {prescription?.dosage}
                </p>
                <p className="text-xs text-muted-foreground">
                  Duration: {prescription?.duration}
                </p>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-caption ${prescription?.color}`}>
                {prescription?.type}
              </div>
            </div>
          </div>
        ))}
        
        <Button
          variant="outline"
          size="sm"
          fullWidth
          iconName="Plus"
          iconPosition="left"
          iconSize={14}
          className="mt-3"
        >
          {currentLanguage === 'hi' ? 'दवा जोड़ें' : 
           currentLanguage === 'pa'? 'ਦਵਾਈ ਸ਼ਾਮਲ ਕਰੋ' : 'Add Medicine'}
        </Button>
      </div>
    </div>
  );

  const renderHistoryTab = () => (
    <div className="space-y-4">
      <h3 className="font-heading font-semibold text-foreground">
        {tabLabels?.history}
      </h3>
      
      <div className="space-y-3">
        <div className="glass-card p-3 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Calendar" size={14} className="text-muted-foreground" />
            <span className="text-sm font-caption text-muted-foreground">
              Previous Visit - Sept 15, 2024
            </span>
          </div>
          <p className="text-sm text-foreground">
            Routine checkup - Blood pressure monitoring
          </p>
          <div className="mt-2 flex items-center space-x-2">
            <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">
              Completed
            </span>
          </div>
        </div>
        
        <div className="glass-card p-3 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Calendar" size={14} className="text-muted-foreground" />
            <span className="text-sm font-caption text-muted-foreground">
              Lab Results - Sept 10, 2024
            </span>
          </div>
          <p className="text-sm text-foreground">
            Blood work - All parameters normal
          </p>
          <div className="mt-2 flex items-center space-x-2">
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              Report Available
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  if (!isVisible) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-80 glass-card border-l border-white/20 z-400 overflow-hidden">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-heading font-semibold text-foreground">
              Consultation Panel
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
              iconSize={16}
              className="text-muted-foreground hover:text-foreground"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} className="text-muted-foreground" />
              <span className="text-sm font-caption text-muted-foreground">
                Duration: {formatTime(consultationTime)}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse-medical" />
              <span className="text-xs font-caption text-success">Active</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10">
          {Object.entries(tabLabels)?.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex-1 px-3 py-2 text-sm font-caption transition-colors duration-150 ${
                activeTab === key
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          {activeTab === 'vitals' && renderVitalsTab()}
          {activeTab === 'notes' && renderNotesTab()}
          {activeTab === 'prescription' && renderPrescriptionTab()}
          {activeTab === 'history' && renderHistoryTab()}
        </div>
      </div>
    </div>
  );
};

export default ConsultationSidebar;