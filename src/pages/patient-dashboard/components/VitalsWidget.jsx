import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VitalsWidget = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [vitals, setVitals] = useState({
    temperature: { value: 98.6, unit: '°F', status: 'normal' },
    bloodPressure: { systolic: 120, diastolic: 80, status: 'normal' },
    heartRate: { value: 70, unit: 'bpm', status: 'normal' },
    oxygenLevel: { value: 98, unit: '%', status: 'normal' }
  });
  const [isEditing, setIsEditing] = useState(null);
  const [tempValues, setTempValues] = useState({});

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const getVitalLabels = () => {
    switch (currentLanguage) {
      case 'hi':
        return {
          title: 'जीवन संकेतक',
          temperature: 'तापमान',
          bloodPressure: 'रक्तचाप',
          heartRate: 'हृदय गति',
          oxygenLevel: 'ऑक्सीजन स्तर',
          update: 'अपडेट करें',
          save: 'सेव करें',
          cancel: 'रद्द करें'
        };
      case 'pa':
        return {
          title: 'ਜੀਵਨ ਸੰਕੇਤਕ',
          temperature: 'ਤਾਪਮਾਨ',
          bloodPressure: 'ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ',
          heartRate: 'ਦਿਲ ਦੀ ਗਤੀ',
          oxygenLevel: 'ਆਕਸੀਜਨ ਪੱਧਰ',
          update: 'ਅਪਡੇਟ ਕਰੋ',
          save: 'ਸੇਵ ਕਰੋ',
          cancel: 'ਰੱਦ ਕਰੋ'
        };
      default:
        return {
          title: 'Ideal Vital Signs of a Healthy Person',
          temperature: 'Temperature',
          bloodPressure: 'Blood Pressure',
          heartRate: 'Heart Rate',
          oxygenLevel: 'Oxygen Level',
          update: 'Update',
          save: 'Save',
          cancel: 'Cancel'
        };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'high':
        return 'bg-error/10 border-error/20 text-error';
      case 'low':
        return 'bg-black border-warning/20 text-warning';
      case 'normal':
      default:
        return 'bg-blue-900 border-success/20 text-success';
    }
  };

  const getVitalIcon = (type) => {
    switch (type) {
      case 'temperature':
        return 'Thermometer';
      case 'bloodPressure':
        return 'Activity';
      case 'heartRate':
        return 'Heart';
      case 'oxygenLevel':
        return 'Droplets';
      default:
        return 'Activity';
    }
  };

  const handleEdit = (vitalType) => {
    setIsEditing(vitalType);
    if (vitalType === 'bloodPressure') {
      setTempValues({
        systolic: vitals?.bloodPressure?.systolic,
        diastolic: vitals?.bloodPressure?.diastolic
      });
    } else {
      setTempValues({ value: vitals?.[vitalType]?.value });
    }
  };

  const handleSave = (vitalType) => {
    setVitals(prev => ({
      ...prev,
      [vitalType]: {
        ...prev?.[vitalType],
        ...(vitalType === 'bloodPressure' 
          ? { systolic: tempValues?.systolic, diastolic: tempValues?.diastolic }
          : { value: tempValues?.value }
        )
      }
    }));
    setIsEditing(null);
    setTempValues({});
  };

  const handleCancel = () => {
    setIsEditing(null);
    setTempValues({});
  };

  const labels = getVitalLabels();

  const vitalCards = [
    {
      type: 'temperature',
      label: labels?.temperature,
      value: `${vitals?.temperature?.value}${vitals?.temperature?.unit}`,
      color: 'bg-blue-600'
    },
    {
      type: 'bloodPressure',
      label: labels?.bloodPressure,
      value: `${vitals?.bloodPressure?.systolic}/${vitals?.bloodPressure?.diastolic}`,
      color: 'bg-blue-600'
    },
    {
      type: 'heartRate',
      label: labels?.heartRate,
      value: `${vitals?.heartRate?.value} ${vitals?.heartRate?.unit}`,
      color: 'bg-blue-600'
    },
    {
      type: 'oxygenLevel',
      label: labels?.oxygenLevel,
      value: `${vitals?.oxygenLevel?.value}${vitals?.oxygenLevel?.unit}`,
      color: 'bg-blue-600'
    }
  ];

  return (
    <div className="glass-card border border-white/20 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {labels?.title}
        </h3>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-xs text-muted-foreground font-caption">
            Last updated: 2 hours ago
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {vitalCards?.map((vital) => (
          <div
            key={vital?.type}
            className="relative group micro-interact cursor-pointer"
            onClick={() => handleEdit(vital?.type)}
          >
            <div className={`${vital?.color} rounded-xl p-4 text-white relative overflow-hidden`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <Icon 
                    name={getVitalIcon(vital?.type)} 
                    size={20} 
                    color="white" 
                    className="opacity-80"
                  />
                  <div className={`px-2 py-1 rounded-full text-xs font-caption ${getStatusColor(vitals?.[vital?.type]?.status)} bg-white/20`}>
                    Normal
                  </div>
                </div>

                <div className="mb-1">
                  <div className="text-2xl font-heading font-bold animate-counter">
                    {isEditing === vital?.type ? (
                      vital?.type === 'bloodPressure' ? (
                        <div className="flex items-center space-x-1">
                          <input
                            type="number"
                            value={tempValues?.systolic || ''}
                            onChange={(e) => setTempValues(prev => ({ ...prev, systolic: parseInt(e?.target?.value) }))}
                            className="w-12 bg-white/20 border border-white/30 rounded px-1 text-sm text-center"
                            onClick={(e) => e?.stopPropagation()}
                          />
                          <span>/</span>
                          <input
                            type="number"
                            value={tempValues?.diastolic || ''}
                            onChange={(e) => setTempValues(prev => ({ ...prev, diastolic: parseInt(e?.target?.value) }))}
                            className="w-12 bg-white/20 border border-white/30 rounded px-1 text-sm text-center"
                            onClick={(e) => e?.stopPropagation()}
                          />
                        </div>
                      ) : (
                        <input
                          type="number"
                          step="0.1"
                          value={tempValues?.value || ''}
                          onChange={(e) => setTempValues({ value: parseFloat(e?.target?.value) })}
                          className="w-16 bg-white/20 border border-white/30 rounded px-1 text-sm text-center"
                          onClick={(e) => e?.stopPropagation()}
                        />
                      )
                    ) : (
                      vital?.value
                    )}
                  </div>
                  <div className="text-xs opacity-80 font-caption">
                    {vital?.label}
                  </div>
                </div>

                {isEditing === vital?.type && (
                  <div className="flex space-x-1 mt-2" onClick={(e) => e?.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => handleSave(vital?.type)}
                      iconName="Check"
                      iconSize={12}
                      className="bg-white/20 text-white hover:bg-white/30 px-2 py-1 h-6"
                    />
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={handleCancel}
                      iconName="X"
                      iconSize={12}
                      className="bg-white/20 text-white hover:bg-white/30 px-2 py-1 h-6"
                    />
                  </div>
                )}
              </div>

              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white/10 opacity-50" />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Button
          variant="outline"
          size="sm"
          iconName="Plus"
          iconPosition="left"
          iconSize={16}
          className="text-muted-foreground hover:text-foreground"
        >
          {labels?.update} Vitals
        </Button>
      </div>
    </div>
  );
};

export default VitalsWidget;