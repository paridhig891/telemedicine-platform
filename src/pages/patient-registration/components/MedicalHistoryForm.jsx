import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const MedicalHistoryForm = ({ currentLanguage, onSubmit, onSkip, isLoading }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [medicalData, setMedicalData] = useState({
    allergies: '',
    currentMedications: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelation: '',
    chronicConditions: [],
    bloodGroup: '',
    height: '',
    weight: ''
  });

  const getLabels = () => {
    switch (currentLanguage) {
      case 'hi':
        return {
          title: 'चिकित्सा इतिहास (वैकल्पिक)',
          subtitle: 'बेहतर देखभाल के लिए अपनी चिकित्सा जानकारी साझा करें',
          allergies: 'एलर्जी',
          currentMedications: 'वर्तमान दवाएं',
          emergencyContact: 'आपातकालीन संपर्क',
          emergencyContactName: 'संपर्क व्यक्ति का नाम',
          emergencyContactPhone: 'संपर्क व्यक्ति का फोन',
          emergencyContactRelation: 'रिश्ता',
          bloodGroup: 'रक्त समूह',
          height: 'ऊंचाई (सेमी)',
          weight: 'वजन (किग्रा)',
          chronicConditions: 'पुरानी बीमारियां',
          diabetes: 'मधुमेह',
          hypertension: 'उच्च रक्तचाप',
          heartDisease: 'हृदय रोग',
          asthma: 'दमा',
          saveAndContinue: 'सेव करें और आगे बढ़ें',
          skipForNow: 'अभी के लिए छोड़ें',
          expandForm: 'विस्तृत फॉर्म',
          collapseForm: 'संक्षिप्त फॉर्म',
          allergiesPlaceholder: 'कोई ज्ञात एलर्जी (जैसे: पेनिसिलिन, नट्स)',
          medicationsPlaceholder: 'वर्तमान में ली जा रही दवाएं',
          namePlaceholder: 'आपातकालीन संपर्क का नाम',
          phonePlaceholder: '+91 9876543210',
          relationPlaceholder: 'जैसे: पिता, माता, भाई'
        };
      case 'pa':
        return {
          title: 'ਮੈਡੀਕਲ ਇਤਿਹਾਸ (ਵਿਕਲਪਿਕ)',
          subtitle: 'ਬਿਹਤਰ ਦੇਖਭਾਲ ਲਈ ਆਪਣੀ ਮੈਡੀਕਲ ਜਾਣਕਾਰੀ ਸਾਂਝੀ ਕਰੋ',
          allergies: 'ਐਲਰਜੀ',
          currentMedications: 'ਮੌਜੂਦਾ ਦਵਾਈਆਂ',
          emergencyContact: 'ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ',
          emergencyContactName: 'ਸੰਪਰਕ ਵਿਅਕਤੀ ਦਾ ਨਾਮ',
          emergencyContactPhone: 'ਸੰਪਰਕ ਵਿਅਕਤੀ ਦਾ ਫੋਨ',
          emergencyContactRelation: 'ਰਿਸ਼ਤਾ',
          bloodGroup: 'ਖੂਨ ਦਾ ਗਰੁੱਪ',
          height: 'ਉਚਾਈ (ਸੈਮੀ)',
          weight: 'ਭਾਰ (ਕਿਗ੍ਰਾ)',
          chronicConditions: 'ਪੁਰਾਣੀਆਂ ਬਿਮਾਰੀਆਂ',
          diabetes: 'ਸ਼ੂਗਰ',
          hypertension: 'ਹਾਈ ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ',
          heartDisease: 'ਦਿਲ ਦੀ ਬਿਮਾਰੀ',
          asthma: 'ਦਮਾ',
          saveAndContinue: 'ਸੇਵ ਕਰੋ ਅਤੇ ਅੱਗੇ ਵਧੋ',
          skipForNow: 'ਹੁਣ ਲਈ ਛੱਡੋ',
          expandForm: 'ਵਿਸਤ੍ਰਿਤ ਫਾਰਮ',
          collapseForm: 'ਸੰਖੇਪ ਫਾਰਮ',
          allergiesPlaceholder: 'ਕੋਈ ਜਾਣੀ ਐਲਰਜੀ (ਜਿਵੇਂ: ਪੈਨਿਸਿਲਿਨ, ਨਟਸ)',
          medicationsPlaceholder: 'ਮੌਜੂਦਾ ਵਿੱਚ ਲਈ ਜਾ ਰਹੀ ਦਵਾਈਆਂ',
          namePlaceholder: 'ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ ਦਾ ਨਾਮ',
          phonePlaceholder: '+91 9876543210',
          relationPlaceholder: 'ਜਿਵੇਂ: ਪਿਤਾ, ਮਾਤਾ, ਭਰਾ'
        };
      default:
        return {
          title: 'Medical History (Optional)',
          subtitle: 'Share your medical information for better care',
          allergies: 'Allergies',
          currentMedications: 'Current Medications',
          emergencyContact: 'Emergency Contact',
          emergencyContactName: 'Contact Person Name',
          emergencyContactPhone: 'Contact Person Phone',
          emergencyContactRelation: 'Relationship',
          bloodGroup: 'Blood Group',
          height: 'Height (cm)',
          weight: 'Weight (kg)',
          chronicConditions: 'Chronic Conditions',
          diabetes: 'Diabetes',
          hypertension: 'Hypertension',
          heartDisease: 'Heart Disease',
          asthma: 'Asthma',
          saveAndContinue: 'Save & Continue',
          skipForNow: 'Skip for Now',
          expandForm: 'Detailed Form',
          collapseForm: 'Simple Form',
          allergiesPlaceholder: 'Any known allergies (e.g., Penicillin, Nuts)',
          medicationsPlaceholder: 'Current medications you are taking',
          namePlaceholder: 'Emergency contact name',
          phonePlaceholder: '+91 9876543210',
          relationPlaceholder: 'e.g., Father, Mother, Spouse'
        };
    }
  };

  const labels = getLabels();

  const handleInputChange = (field, value) => {
    setMedicalData(prev => ({ ...prev, [field]: value }));
  };

  const handleConditionChange = (condition, checked) => {
    setMedicalData(prev => ({
      ...prev,
      chronicConditions: checked
        ? [...prev?.chronicConditions, condition]
        : prev?.chronicConditions?.filter(c => c !== condition)
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit(medicalData);
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
          {labels?.title}
        </h3>
        <p className="text-sm  font-caption text-black">
          {labels?.subtitle}
        </p>
      </div>
      <div className="flex justify-center">
        <Button
        
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          iconSize={16}
          className="bg-red-500 text-primary hover:text-primary/80"
        >
          {isExpanded ? labels?.collapseForm : labels?.expandForm}
        </Button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={labels?.allergies}
            type="text"
            placeholder={labels?.allergiesPlaceholder}
            value={medicalData?.allergies}
            onChange={(e) => handleInputChange('allergies', e?.target?.value)}
            className="md:col-span-2"
          />

          <Input
            label={labels?.currentMedications}
            type="text"
            placeholder={labels?.medicationsPlaceholder}
            value={medicalData?.currentMedications}
            onChange={(e) => handleInputChange('currentMedications', e?.target?.value)}
            className="md:col-span-2"
          />
        </div>

        {/* Expanded Form */}
        {isExpanded && (
          <div className="space-y-6 border-t border-white/10 pt-6">
            {/* Physical Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  {labels?.bloodGroup}
                </label>
                <select
                  value={medicalData?.bloodGroup}
                  onChange={(e) => handleInputChange('bloodGroup', e?.target?.value)}
                  className="w-full px-3 py-2 bg-input border border-white/20 rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Select Blood Group</option>
                  {bloodGroups?.map(group => (
                    <option key={group} value={group}>{group}</option>
                  ))}
                </select>
              </div>

              <Input
                label={labels?.height}
                type="number"
                placeholder="170"
                value={medicalData?.height}
                onChange={(e) => handleInputChange('height', e?.target?.value)}
                min="50"
                max="250"
              />

              <Input
                label={labels?.weight}
                type="number"
                placeholder="70"
                value={medicalData?.weight}
                onChange={(e) => handleInputChange('weight', e?.target?.value)}
                min="10"
                max="300"
              />
            </div>

            {/* Chronic Conditions */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                {labels?.chronicConditions}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { key: 'diabetes', label: labels?.diabetes },
                  { key: 'hypertension', label: labels?.hypertension },
                  { key: 'heartDisease', label: labels?.heartDisease },
                  { key: 'asthma', label: labels?.asthma }
                ]?.map(condition => (
                  <Checkbox
                    key={condition?.key}
                    label={condition?.label}
                    checked={medicalData?.chronicConditions?.includes(condition?.key)}
                    onChange={(e) => handleConditionChange(condition?.key, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-foreground">
                {labels?.emergencyContact}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label={labels?.emergencyContactName}
                  type="text"
                  placeholder={labels?.namePlaceholder}
                  value={medicalData?.emergencyContactName}
                  onChange={(e) => handleInputChange('emergencyContactName', e?.target?.value)}
                />

                <Input
                  label={labels?.emergencyContactPhone}
                  type="tel"
                  placeholder={labels?.phonePlaceholder}
                  value={medicalData?.emergencyContactPhone}
                  onChange={(e) => handleInputChange('emergencyContactPhone', e?.target?.value)}
                />

                <Input
                  label={labels?.emergencyContactRelation}
                  type="text"
                  placeholder={labels?.relationPlaceholder}
                  value={medicalData?.emergencyContactRelation}
                  onChange={(e) => handleInputChange('emergencyContactRelation', e?.target?.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onSkip}
            className="flex-1 border-white/20 hover:bg-white/5"
          >
            {labels?.skipForNow}
          </Button>

          <Button
            type="submit"
            variant="default"
            size="lg"
            loading={isLoading}
            className="flex-1 bg-gradient-therapeutic hover:opacity-90"
          >
            {labels?.saveAndContinue}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MedicalHistoryForm;