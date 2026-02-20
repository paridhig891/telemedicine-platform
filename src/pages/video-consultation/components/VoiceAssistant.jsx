import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VoiceAssistant = ({ currentLanguage = 'en', isVisible = true }) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [waveformData, setWaveformData] = useState(Array(12)?.fill(0));
  const [assistantMessage, setAssistantMessage] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    let interval;
    if (isListening) {
      interval = setInterval(() => {
        setWaveformData(prev => 
          prev?.map(() => Math.random() * 100)
        );
      }, 100);
    } else {
      setWaveformData(Array(12)?.fill(0));
    }
    return () => clearInterval(interval);
  }, [isListening]);

  const handleStartListening = () => {
    setIsListening(true);
    setIsProcessing(false);
    setAssistantMessage('');
    
    // Mock voice recognition process
    setTimeout(() => {
      setIsListening(false);
      setIsProcessing(true);
      
      setTimeout(() => {
        setIsProcessing(false);
        setAssistantMessage(getMockTranslation());
        setShowTranslation(true);
      }, 2000);
    }, 4000);
  };

  const handleStopListening = () => {
    setIsListening(false);
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setAssistantMessage(getMockTranslation());
      setShowTranslation(true);
    }, 1500);
  };

  const getMockTranslation = () => {
    const translations = {
      'en': "Patient says: \'I have been experiencing chest pain for the past two days.'",
      'hi': "रोगी कहता है: \'मुझे पिछले दो दिनों से सीने में दर्द हो रहा है।'",
      'pa': "ਮਰੀਜ਼ ਕਹਿੰਦਾ ਹੈ: \'ਮੈਨੂੰ ਪਿਛਲੇ ਦੋ ਦਿਨਾਂ ਤੋਂ ਛਾਤੀ ਵਿੱਚ ਦਰਦ ਹੋ ਰਿਹਾ ਹੈ।'"
    };
    return translations?.[currentLanguage] || translations?.['en'];
  };

  const getAssistantLabels = () => {
    switch (currentLanguage) {
      case 'hi':
        return {
          listening: 'सुन रहा है...',
          processing: 'प्रोसेसिंग...',
          ready: 'अनुवाद सहायक तैयार',
          startVoice: 'आवाज़ शुरू करें',
          stopVoice: 'रोकें',
          translate: 'अनुवाद करें',
          clear: 'साफ़ करें'
        };
      case 'pa':
        return {
          listening: 'ਸੁਣ ਰਿਹਾ ਹੈ...',
          processing: 'ਪ੍ਰੋਸੈਸਿੰਗ...',
          ready: 'ਅਨੁਵਾਦ ਸਹਾਇਕ ਤਿਆਰ',
          startVoice: 'ਆਵਾਜ਼ ਸ਼ੁਰੂ ਕਰੋ',
          stopVoice: 'ਰੋਕੋ',
          translate: 'ਅਨੁਵਾਦ ਕਰੋ',
          clear: 'ਸਾਫ਼ ਕਰੋ'
        };
      default:
        return {
          listening: 'Listening...',
          processing: 'Processing...',
          ready: 'Translation Assistant Ready',
          startVoice: 'Start Voice',
          stopVoice: 'Stop',
          translate: 'Translate',
          clear: 'Clear'
        };
    }
  };

  const labels = getAssistantLabels();

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-300">
      {/* Main Assistant Bubble */}
      <div className="relative">
        <div className={`glass-card rounded-full p-4 transition-all duration-300 ${
          isListening ? 'scale-110 bg-primary/20' : 'hover:scale-105'
        }`}>
          <div className="flex items-center justify-center w-12 h-12">
            {isListening ? (
              <div className="flex items-center space-x-1">
                {waveformData?.slice(0, 5)?.map((height, index) => (
                  <div
                    key={index}
                    className="w-1 bg-primary rounded-full transition-all duration-100"
                    style={{ height: `${Math.max(4, height * 0.3)}px` }}
                  />
                ))}
              </div>
            ) : isProcessing ? (
              <Icon name="Loader2" size={24} className="text-primary animate-spin" />
            ) : (
              <Icon name="Languages" size={24} className="text-primary" />
            )}
          </div>
        </div>

        {/* Pulse Ring Animation */}
        {isListening && (
          <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-75" />
        )}

        {/* Status Label */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          <div className="glass-card px-2 py-1 rounded-full">
            <span className="text-xs font-caption text-foreground">
              {isListening ? labels?.listening : 
               isProcessing ? labels?.processing : 
               labels?.ready}
            </span>
          </div>
        </div>
      </div>
      {/* Control Panel */}
      <div className="mt-4 glass-card rounded-lg p-3 w-64">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading font-medium text-foreground text-sm">
            Voice Translation
          </h3>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse-medical" />
            <span className="text-xs font-caption text-success">
              {currentLanguage?.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Waveform Visualization */}
        {isListening && (
          <div className="mb-3 flex items-center justify-center space-x-1 h-8 bg-muted/30 rounded-lg">
            {waveformData?.map((height, index) => (
              <div
                key={index}
                className="w-1 bg-primary rounded-full transition-all duration-100"
                style={{ height: `${Math.max(2, height * 0.25)}px` }}
              />
            ))}
          </div>
        )}

        {/* Translation Output */}
        {showTranslation && assistantMessage && (
          <div className="mb-3 p-2 bg-muted/50 rounded-lg">
            <p className="text-sm font-caption text-foreground">
              {assistantMessage}
            </p>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center space-x-2">
          {!isListening ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleStartListening}
              disabled={isProcessing}
              iconName="Mic"
              iconPosition="left"
              iconSize={14}
              className="flex-1 text-xs"
            >
              {labels?.startVoice}
            </Button>
          ) : (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleStopListening}
              iconName="MicOff"
              iconPosition="left"
              iconSize={14}
              className="flex-1 text-xs"
            >
              {labels?.stopVoice}
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowTranslation(false);
              setAssistantMessage('');
            }}
            iconName="RotateCcw"
            iconSize={14}
            className="text-muted-foreground hover:text-foreground"
          />
        </div>

        {/* Quick Translation Phrases */}
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="grid grid-cols-2 gap-1">
            {[
              currentLanguage === 'hi' ? 'दर्द कहाँ है?' : 
              currentLanguage === 'pa' ? 'ਦਰਦ ਕਿੱਥੇ ਹੈ?' : 'Where is the pain?',
              
              currentLanguage === 'hi' ? 'कब से?' : 
              currentLanguage === 'pa' ? 'ਕਦੋਂ ਤੋਂ?' : 'Since when?',
              
              currentLanguage === 'hi' ? 'दवा लें' : 
              currentLanguage === 'pa' ? 'ਦਵਾਈ ਲਓ' : 'Take medicine',
              
              currentLanguage === 'hi' ? 'आराम करें' : 
              currentLanguage === 'pa' ? 'ਆਰਾਮ ਕਰੋ' : 'Take rest'
            ]?.map((phrase, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => {
                  setAssistantMessage(`Translated: "${phrase}"`);
                  setShowTranslation(true);
                }}
                className="text-xs text-muted-foreground hover:text-foreground p-1 h-auto justify-start"
              >
                {phrase}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceAssistant;