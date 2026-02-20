import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SymptomInput = ({ onSymptomsChange, currentLanguage, selectedSymptoms = [] }) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const symptomDatabase = {
    en: [
      'Headache', 'Fever', 'Cough', 'Sore throat', 'Runny nose', 'Body ache', 'Fatigue',
      'Nausea', 'Vomiting', 'Diarrhea', 'Stomach pain', 'Chest pain', 'Shortness of breath',
      'Dizziness', 'Joint pain', 'Back pain', 'Skin rash', 'Eye irritation', 'Ear pain',
      'Difficulty sleeping', 'Loss of appetite', 'Weight loss', 'Weight gain', 'Anxiety',
      'Depression', 'Memory problems', 'Confusion', 'Blurred vision', 'Hearing loss'
    ],
    hi: [
      'सिरदर्द', 'बुखार', 'खांसी', 'गले में दर्द', 'नाक बहना', 'शरीर में दर्द', 'थकान',
      'मतली', 'उल्टी', 'दस्त', 'पेट दर्द', 'छाती में दर्द', 'सांस लेने में कठिनाई',
      'चक्कर आना', 'जोड़ों में दर्द', 'कमर दर्द', 'त्वचा पर चकत्ते', 'आंखों में जलन', 'कान दर्द',
      'नींद न आना', 'भूख न लगना', 'वजन कम होना', 'वजन बढ़ना', 'चिंता',
      'अवसाद', 'याददाश्त की समस्या', 'भ्रम', 'धुंधला दिखना', 'सुनाई न देना'
    ],
    pa: [
      'ਸਿਰ ਦਰਦ', 'ਬੁਖਾਰ', 'ਖੰਘ', 'ਗਲੇ ਵਿੱਚ ਦਰਦ', 'ਨੱਕ ਵਗਣਾ', 'ਸਰੀਰ ਵਿੱਚ ਦਰਦ', 'ਥਕਾਵਟ',
      'ਜੀ ਮਿਚਲਾਉਣਾ', 'ਉਲਟੀ', 'ਦਸਤ', 'ਪੇਟ ਦਰਦ', 'ਛਾਤੀ ਵਿੱਚ ਦਰਦ', 'ਸਾਹ ਲੈਣ ਵਿੱਚ ਮੁਸ਼ਕਿਲ',
      'ਚੱਕਰ ਆਉਣਾ', 'ਜੋੜਾਂ ਵਿੱਚ ਦਰਦ', 'ਕਮਰ ਦਰਦ', 'ਚਮੜੀ ਤੇ ਦਾਗ', 'ਅੱਖਾਂ ਵਿੱਚ ਜਲਣ', 'ਕੰਨ ਦਰਦ',
      'ਨੀਂਦ ਨਾ ਆਉਣਾ', 'ਭੁੱਖ ਨਾ ਲੱਗਣਾ', 'ਭਾਰ ਘਟਣਾ', 'ਭਾਰ ਵਧਣਾ', 'ਚਿੰਤਾ',
      'ਉਦਾਸੀ', 'ਯਾਦਦਾਸ਼ਤ ਦੀ ਸਮੱਸਿਆ', 'ਭਰਮ', 'ਧੁੰਦਲਾ ਦਿਖਣਾ', 'ਸੁਣਾਈ ਨਾ ਦੇਣਾ'
    ]
  };

  const specialistMapping = {
    'Headache': 'Neurologist',
    'Fever': 'General Physician',
    'Chest pain': 'Cardiologist',
    'Skin rash': 'Dermatologist',
    'Eye irritation': 'Ophthalmologist',
    'Ear pain': 'ENT Specialist',
    'Joint pain': 'Orthopedist',
    'Anxiety': 'Psychiatrist',
    'Depression': 'Psychiatrist'
  };

  useEffect(() => {
    if (inputValue?.length > 1) {
      const filtered = symptomDatabase?.[currentLanguage]?.filter(symptom =>
        symptom?.toLowerCase()?.includes(inputValue?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 6));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [inputValue, currentLanguage]);

  const handleAddSymptom = (symptom) => {
    if (!selectedSymptoms?.includes(symptom)) {
      const newSymptoms = [...selectedSymptoms, symptom];
      onSymptomsChange(newSymptoms);
      analyzeSymptoms(newSymptoms);
    }
    setInputValue('');
    setShowSuggestions(false);
  };

  const handleRemoveSymptom = (symptom) => {
    const newSymptoms = selectedSymptoms?.filter(s => s !== symptom);
    onSymptomsChange(newSymptoms);
  };

  const analyzeSymptoms = (symptoms) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 1500);
  };

  const getRecommendedSpecialist = () => {
    if (selectedSymptoms?.length === 0) return null;
    
    const englishSymptoms = symptomDatabase?.en;
    const currentSymptoms = symptomDatabase?.[currentLanguage];
    
    for (let i = 0; i < selectedSymptoms?.length; i++) {
      const symptomIndex = currentSymptoms?.indexOf(selectedSymptoms?.[i]);
      if (symptomIndex !== -1) {
        const englishSymptom = englishSymptoms?.[symptomIndex];
        if (specialistMapping?.[englishSymptom]) {
          return specialistMapping?.[englishSymptom];
        }
      }
    }
    return 'General Physician';
  };

  const getPlaceholderText = () => {
    switch (currentLanguage) {
      case 'hi':
        return 'अपने लक्षण बताएं...';
      case 'pa':
        return 'ਆਪਣੇ ਲੱਛਣ ਦੱਸੋ...';
      default:
        return 'Describe your symptoms...';
    }
  };

  const getLabelText = () => {
    switch (currentLanguage) {
      case 'hi':
        return 'लक्षण जोड़ें';
      case 'pa':
        return 'ਲੱਛਣ ਸ਼ਾਮਲ ਕਰੋ';
      default:
        return 'Add Symptoms';
    }
  };

  return (
    <div className="glass-card border border-white/20 rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 rounded-full bg-gradient-therapeutic flex items-center justify-center">
          <Icon name="Stethoscope" size={16} color="white" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {currentLanguage === 'hi' ? 'स्मार्ट लक्षण विश्लेषण' : 
           currentLanguage === 'pa' ? 'ਸਮਾਰਟ ਲੱਛਣ ਵਿਸ਼ਲੇਸ਼ਣ' : 'Smart Symptom Analysis'}
        </h3>
      </div>
      {/* Symptom Input */}
      <div className="relative mb-4">
        <Input
          label={getLabelText()}
          type="text"
          placeholder={getPlaceholderText()}
          value={inputValue}
          onChange={(e) => setInputValue(e?.target?.value)}
          className="pr-10"
        />
        <div className="absolute right-3 top-9 flex items-center">
          {isAnalyzing ? (
            <Icon name="Loader2" size={16} className="text-primary animate-spin" />
          ) : (
            <Icon name="Search" size={16} className="text-muted-foreground" />
          )}
        </div>

        {/* Suggestions Dropdown */}
        {showSuggestions && suggestions?.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1 glass-card border border-white/20 rounded-lg shadow-medical-md z-50">
            <div className="p-2 max-h-48 overflow-y-auto">
              {suggestions?.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleAddSymptom(suggestion)}
                  className="w-full text-left px-3 py-2 rounded-md text-sm font-caption text-foreground hover:bg-primary/10 transition-colors duration-150"
                >
                  <div className="flex items-center space-x-2">
                    <Icon name="Plus" size={12} className="text-primary" />
                    <span>{suggestion}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Selected Symptoms */}
      {selectedSymptoms?.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-caption text-muted-foreground mb-2">
            {currentLanguage === 'hi' ? 'चयनित लक्षण:' : 
             currentLanguage === 'pa' ? 'ਚੁਣੇ ਗਏ ਲੱਛਣ:' : 'Selected Symptoms:'}
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedSymptoms?.map((symptom, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-caption border border-primary/20"
              >
                <span>{symptom}</span>
                <button
                  onClick={() => handleRemoveSymptom(symptom)}
                  className="text-primary hover:text-primary/70 transition-colors duration-150"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* AI Analysis Result */}
      {selectedSymptoms?.length > 0 && !isAnalyzing && (
        <div className="p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="Brain" size={12} className="text-primary" />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-heading font-medium text-foreground mb-1">
                {currentLanguage === 'hi' ? 'AI सुझाव' : 
                 currentLanguage === 'pa' ? 'AI ਸੁਝਾਅ' : 'AI Recommendation'}
              </h4>
              <p className="text-sm font-caption text-muted-foreground mb-2">
                {currentLanguage === 'hi' ? `आपके लक्षणों के आधार पर, हम ${getRecommendedSpecialist()} से सलाह लेने की सिफारिश करते हैं।` :
                 currentLanguage === 'pa' ? `ਤੁਹਾਡੇ ਲੱਛਣਾਂ ਦੇ ਆਧਾਰ ਤੇ, ਅਸੀਂ ${getRecommendedSpecialist()} ਨਾਲ ਸਲਾਹ ਲੈਣ ਦੀ ਸਿਫਾਰਸ਼ ਕਰਦੇ ਹਾਂ।` :
                 `Based on your symptoms, we recommend consulting with a ${getRecommendedSpecialist()}.`}
              </p>
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={12} className="text-warning" />
                <span className="text-xs font-caption text-warning">
                  {currentLanguage === 'hi' ? 'यह केवल एक सुझाव है, पेशेवर सलाह के लिए डॉक्टर से मिलें।' :
                   currentLanguage === 'pa'? 'ਇਹ ਸਿਰਫ਼ ਇੱਕ ਸੁਝਾਅ ਹੈ, ਪੇਸ਼ੇਵਰ ਸਲਾਹ ਲਈ ਡਾਕਟਰ ਨਾਲ ਮਿਲੋ।' : 'This is only a suggestion, consult a doctor for professional advice.'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Quick Symptom Categories */}
      <div className="mt-4">
        <p className="text-sm font-caption text-muted-foreground mb-3">
          {currentLanguage === 'hi' ? 'सामान्य श्रेणियां:' : 
           currentLanguage === 'pa' ? 'ਆਮ ਸ਼੍ਰੇਣੀਆਂ:' : 'Common Categories:'}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {symptomDatabase?.[currentLanguage]?.slice(0, 8)?.map((symptom, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => handleAddSymptom(symptom)}
              disabled={selectedSymptoms?.includes(symptom)}
              className={`text-xs justify-start h-8 ${
                selectedSymptoms?.includes(symptom) 
                  ? 'bg-primary/10 text-primary border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {symptom}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SymptomInput;