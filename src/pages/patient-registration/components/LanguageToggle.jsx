import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LanguageToggle = ({ currentLanguage, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸', nativeLabel: 'English' },
    { code: 'hi', label: 'Hindi', flag: '🇮🇳', nativeLabel: 'हिंदी' },
    { code: 'pa', label: 'Punjabi', flag: '🇮🇳', nativeLabel: 'ਪੰਜਾਬੀ' },
  ];

  const currentLang = languages?.find(lang => lang?.code === currentLanguage);

  const handleLanguageSelect = (langCode) => {
    onLanguageChange(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white/80 hover:text-white hover:bg-white/10 border border-white/20 backdrop-blur-sm"
      >
        <span className="text-lg">{currentLang?.flag}</span>
        <span className="font-caption text-sm hidden sm:block">
          {currentLang?.nativeLabel}
        </span>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="transition-transform duration-150"
        />
      </Button>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-48 glass-card border border-white/20 rounded-lg shadow-medical-md z-50">
            <div className="p-2">
              {languages?.map((lang) => (
                <button
                  key={lang?.code}
                  onClick={() => handleLanguageSelect(lang?.code)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors duration-150 ${
                    currentLanguage === lang?.code
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-white/10'
                  }`}
                >
                  <span className="text-lg">{lang?.flag}</span>
                  <div className="flex flex-col items-start">
                    <span className="font-caption font-medium">{lang?.nativeLabel}</span>
                    <span className="text-xs opacity-70">{lang?.label}</span>
                  </div>
                  {currentLanguage === lang?.code && (
                    <Icon name="Check" size={16} className="ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageToggle;