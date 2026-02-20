import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import RegistrationForm from './components/RegistrationForm';
import SocialLogin from './components/SocialLogin';
import MedicalHistoryForm from './components/MedicalHistoryForm';
import LanguageToggle from './components/LanguageToggle';
import Registration from './components/Registration';

const PatientRegistration = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const getPageContent = () => {
    switch (currentLanguage) {
      case 'hi':
        return {
          title: 'Sehaj Healthcare में आपका स्वागत है',
          subtitle: 'अपना खाता बनाएं और गुणवत्तापूर्ण स्वास्थ्य सेवा का अनुभव करें',
          alreadyHaveAccount: 'पहले से खाता है?',
          signIn: 'साइन इन करें',
          step1Title: 'खाता बनाएं',
          step2Title: 'चिकित्सा जानकारी',
          successTitle: 'पंजीकरण सफल!',
          successMessage: 'आपका खाता सफलतापूर्वक बनाया गया है। अब आप अपने डैशबोर्ड पर जा सकते हैं।',
          goToDashboard: 'डैशबोर्ड पर जाएं'
        };
      case 'pa':
        return {
          title: 'Sehaj Healthcare ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ',
          subtitle: 'ਆਪਣਾ ਖਾਤਾ ਬਣਾਓ ਅਤੇ ਗੁਣਵੱਤਾ ਵਾਲੀ ਸਿਹਤ ਸੇਵਾ ਦਾ ਅਨੁਭਵ ਕਰੋ',
          alreadyHaveAccount: 'ਪਹਿਲਾਂ ਤੋਂ ਖਾਤਾ ਹੈ?',
          signIn: 'ਸਾਈਨ ਇਨ ਕਰੋ',
          step1Title: 'ਖਾਤਾ ਬਣਾਓ',
          step2Title: 'ਮੈਡੀਕਲ ਜਾਣਕਾਰੀ',
          successTitle: 'ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਸਫਲ!',
          successMessage: 'ਤੁਹਾਡਾ ਖਾਤਾ ਸਫਲਤਾਪੂਰਵਕ ਬਣਾਇਆ ਗਿਆ ਹੈ। ਹੁਣ ਤੁਸੀਂ ਆਪਣੇ ਡੈਸ਼ਬੋਰਡ ਤੇ ਜਾ ਸਕਦੇ ਹੋ।',
          goToDashboard: 'ਡੈਸ਼ਬੋਰਡ ਤੇ ਜਾਓ'
        };
      default:
        return {
          title: 'Welcome to Sehaj Healthcare',
          subtitle: 'Create your account and experience quality healthcare services',
          alreadyHaveAccount: 'Already have an account?',
          signIn: 'Sign In',
          step1Title: 'Create Account',
          step2Title: 'Medical Information',
          successTitle: 'Registration Successful!',
          successMessage: 'Your account has been created successfully. You can now access your dashboard.',
          goToDashboard: 'Go to Dashboard'
        };
    }
  };

  const content = getPageContent();

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('preferred-language', langCode);
  };

  const handleRegistrationSubmit = async (formData) => {
    setIsLoading(true);
    
    // Mock API call
    setTimeout(() => {
      setRegistrationData(formData);
      setCurrentStep(2);
      setIsLoading(false);
    }, 2000);
  };

  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    
    // Mock social login
    setTimeout(() => {
      console.log(`Logging in with ${provider}`);
      // Mock successful login - redirect to dashboard
      navigate('/patient-dashboard');
    }, 1500);
  };

  const handleMedicalHistorySubmit = async (medicalData) => {
    setIsLoading(true);
    
    // Mock API call to save medical history
    setTimeout(() => {
      setCurrentStep(3);
      setIsLoading(false);
    }, 1500);
  };

  const handleSkipMedicalHistory = () => {
    setCurrentStep(3);
  };

  const handleGoToDashboard = () => {
    // Store auth token (mock)
    localStorage.setItem('auth-token', 'mock-patient-token-' + Date.now());
    navigate('/patient-dashboard');
  };

  const handleSignInRedirect = () => {
    navigate('/patient-login');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-heading font-bold text-white mb-2">
                {content?.step1Title}
              </h2>
              <p className="text-white/80 font-caption">
                {content?.subtitle}
              </p>
            </div>
            <RegistrationForm
              currentLanguage={currentLanguage}
              onSubmit={handleRegistrationSubmit}
              isLoading={isLoading}
            />
            <SocialLogin
              currentLanguage={currentLanguage}
              onSocialLogin={handleSocialLogin}
            />
            <div className="text-center">
              <p className="text-white/70 text-sm font-caption">
                {content?.alreadyHaveAccount}{' '}
                <button
                  onClick={handleSignInRedirect}
                  className="text-white font-medium hover:text-white/80 transition-colors duration-150 underline"
                >
                  {content?.signIn}
                </button>
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <MedicalHistoryForm
              currentLanguage={currentLanguage}
              onSubmit={handleMedicalHistorySubmit}
              onSkip={handleSkipMedicalHistory}
              isLoading={isLoading}
            />
          </div>
        );

      case 3:
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 mx-auto bg-success/20 rounded-full flex items-center justify-center mb-6">
              <Icon name="CheckCircle" size={40} className="text-success" />
            </div>
            <div>
              <h2 className="text-2xl font-heading font-bold text-white mb-2">
                {content?.successTitle}
              </h2>
              <p className="text-white/80 font-caption">
                {content?.successMessage}
              </p>
            </div>
            <Button
              variant="default"
              size="lg"
              onClick={handleGoToDashboard}
              className="bg-gradient-therapeutic hover:opacity-90 transition-opacity duration-150"
            >
              {content?.goToDashboard}
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-blue-600 to-violet-700 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      {/* Language Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <LanguageToggle
          currentLanguage={currentLanguage}
          onLanguageChange={handleLanguageChange}
        />
      </div>
      {/* Logo */}
      <div className="absolute top-6 left-6 z-50">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm">
            <Icon name="Heart" size={24} color="white" strokeWidth={2} />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-heading font-bold text-white">
              Sehaj Healthcare
            </h1>
            <p className="text-xs text-white/70 font-caption">
              Your Health, Our Priority
            </p>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="w-full max-w-md mx-auto relative z-10">
        {/* Progress Indicator */}
        {currentStep < 3 && (
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2]?.map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-150 ${
                    currentStep >= step
                      ? 'bg-white text-primary' :'bg-white/20 text-white/60'
                  }`}>
                    {currentStep > step ? (
                      <Icon name="Check" size={16} />
                    ) : (
                      step
                    )}
                  </div>
                  {step < 2 && (
                    <div className={`w-12 h-0.5 mx-2 transition-colors duration-150 ${
                      currentStep > step ? 'bg-white' : 'bg-white/20'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Registration Card */}
        <div className="glass-card border border-white/20 rounded-2xl p-8 shadow-medical-lg">
          {renderStepContent()}
        </div>
      </div>
      {/* Footer */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-white/60 text-xs font-caption">
          © {new Date()?.getFullYear()} Sehaj Healthcare. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default PatientRegistration;