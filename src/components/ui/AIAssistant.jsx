import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [waveformData, setWaveformData] = useState(Array(20)?.fill(0));

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    let interval;
    if (isListening) {
      interval = setInterval(() => {
        setWaveformData(prev => 
          prev?.map(() => Math.random() * 100)
        );
      }, 100);
    } else {
      setWaveformData(Array(20)?.fill(0));
    }
    return () => clearInterval(interval);
  }, [isListening]);

  const handleToggleAssistant = () => {
    setIsOpen(!isOpen);
  };

  const handleStartListening = () => {
    setIsListening(true);
    setIsProcessing(false);
    
    setTimeout(() => {
      setIsListening(false);
      setIsProcessing(true);
      
      setTimeout(() => {
        setIsProcessing(false);
      }, 2000);
    }, 3000);
  };

const toai=()=>{
  window.open("https://vapi.ai/?demo=true&shareKey=ac6c621a-5659-4061-9a81-580d2ca2cd28&assistantId=ce2883f5-f6af-4243-beb7-3b01aa89f423","_blank");
}

  const handleStopListening = () => {
    setIsListening(false);
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
    }, 1500);
  };

  const getGreeting = () => {
    switch (currentLanguage) {
      case 'hi':
        return 'नमस्ते! मैं आपकी स्वास्थ्य सहायता के लिए यहाँ हूँ।';
      case 'pa':
        return 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡੀ ਸਿਹਤ ਸਹਾਇਤਾ ਲਈ ਇੱਥੇ ਹਾਂ।';
      default:
        return 'Hello! I\'m here to help with your health questions.';
    }
  };

  const getQuickActions = () => {
    switch (currentLanguage) {
      case 'hi':
        return [
          'अपॉइंटमेंट बुक करें',
          'दवा की जानकारी',
          'लक्षण चेकर',
          'रिपोर्ट समझाएं'
        ];
      case 'pa':
        return [
          'ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ',
          'ਦਵਾਈ ਦੀ ਜਾਣਕਾਰੀ',
          'ਲੱਛਣ ਚੈਕਰ',
          'ਰਿਪੋਰਟ ਸਮਝਾਓ'
        ];
      default:
        return [
          'Book Appointment',
          'Medicine Info',
          'Symptom Checker',
          'Explain Reports'
        ];
    }
  };

  return (
    <>
      {/* AI Assistant Bubble */}
      <div className="fixed bottom-6 right-6 z-300" >
        <Button
          variant="default"
          size="icon"
          onClick={toai}
         // onClick={handleToggleAssistant}
          className={`w-14 h-14 rounded-full bg-blue-600 shadow-medical-lg float-action ${
            isOpen ? 'scale-110' : ''
          } ${isListening ? 'animate-pulse-medical' : ''}`}
        >
          {isListening ? (
            <div className="flex items-center justify-center">
              <div className="flex space-x-1">
                {waveformData?.slice(0, 3)?.map((height, index) => (
                  <div
                    key={index}
                    className="w-1 bg-white rounded-full transition-all duration-100"
                    style={{ height: `${Math.max(4, height * 0.2)}px` }}
                  />
                ))}
              </div>
            </div>
          ) : isProcessing ? (
            <Icon name="Loader2" size={24} color="white" className="animate-spin" />
          ) : (
            <Icon name="MessageCircle" size={24} color="white" />
          )}
        </Button>

        {/* Pulse Ring Animation */}
        {isListening && (
          <div className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-75" />
        )}
      </div>
      {/* AI Assistant Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 max-w-[calc(100vw-3rem)] glass-card border border-white/20 rounded-xl shadow-medical-lg z-300">
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-therapeutic flex items-center justify-center">
                  <Icon name="Bot" size={16} color="white" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground">
                    Health Assistant
                  </h3>
                  <p className="text-xs text-muted-foreground font-caption">
                    {isProcessing ? 'Processing...' : isListening ? 'Listening...' : 'Ready to help'}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleAssistant}
                iconName="X"
                iconSize={16}
                className="text-muted-foreground hover:text-foreground"
              />
            </div>

            {/* Greeting */}
            <div className="mb-4 p-3 bg-muted/50 rounded-lg">
              <p className="text-sm text-foreground font-caption">
                {getGreeting()}
              </p>
            </div>

            {/* Voice Controls */}
            <div className="mb-4">
              <div className="flex items-center justify-center space-x-4">
                {!isListening ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleStartListening}
                    disabled={isProcessing}
                    iconName="Mic"
                    iconPosition="left"
                    iconSize={16}
                    className="flex-1"
                  >
                    Start Voice
                  </Button>
                ) : (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleStopListening}
                    iconName="MicOff"
                    iconPosition="left"
                    iconSize={16}
                    className="flex-1"
                  >
                    Stop
                  </Button>
                )}
              </div>

              {/* Waveform Visualization */}
              {isListening && (
                <div className="mt-3 flex items-center justify-center space-x-1 h-8">
                  {waveformData?.map((height, index) => (
                    <div
                      key={index}
                      className="w-1 bg-primary rounded-full transition-all duration-100"
                      style={{ height: `${Math.max(4, height * 0.3)}px` }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <h4 className="text-sm font-heading font-medium text-foreground mb-2">
                Quick Actions
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {getQuickActions()?.map((action, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="text-xs text-muted-foreground hover:text-foreground hover:bg-muted justify-start p-2 h-auto"
                  >
                    {action}
                  </Button>
                ))}
              </div>
            </div>

            {/* Language Indicator */}
            <div className="mt-4 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="font-caption">
                  Language: {currentLanguage?.toUpperCase()}
                </span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse-medical" />
                  <span>Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;