import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const RegistrationForm = ({ currentLanguage, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
    agreeToPrivacy: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const getFormLabels = () => {
    switch (currentLanguage) {
      case 'hi':
        return {
          fullName: 'पूरा नाम',
          email: 'ईमेल पता',
          phone: 'फोन नंबर',
          dateOfBirth: 'जन्म तिथि',
          password: 'पासवर्ड',
          confirmPassword: 'पासवर्ड की पुष्टि करें',
          agreeToTerms: 'मैं नियम और शर्तों से सहमत हूं',
          agreeToPrivacy: 'मैं गोपनीयता नीति से सहमत हूं',
          register: 'पंजीकरण करें',
          fullNamePlaceholder: 'अपना पूरा नाम दर्ज करें',
          emailPlaceholder: 'आपका ईमेल पता',
          phonePlaceholder: '+91 9876543210',
          passwordPlaceholder: 'एक मजबूत पासवर्ड बनाएं',
          confirmPasswordPlaceholder: 'पासवर्ड दोबारा दर्ज करें'
        };
      case 'pa':
        return {
          fullName: 'ਪੂਰਾ ਨਾਮ',
          email: 'ਈਮੇਲ ਪਤਾ',
          phone: 'ਫੋਨ ਨੰਬਰ',
          dateOfBirth: 'ਜਨਮ ਤਾਰੀਖ',
          password: 'ਪਾਸਵਰਡ',
          confirmPassword: 'ਪਾਸਵਰਡ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ',
          agreeToTerms: 'ਮੈਂ ਨਿਯਮਾਂ ਅਤੇ ਸ਼ਰਤਾਂ ਨਾਲ ਸਹਿਮਤ ਹਾਂ',
          agreeToPrivacy: 'ਮੈਂ ਗੁਪਤਤਾ ਨੀਤੀ ਨਾਲ ਸਹਿਮਤ ਹਾਂ',
          register: 'ਰਜਿਸਟਰ ਕਰੋ',
          fullNamePlaceholder: 'ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਰਜ ਕਰੋ',
          emailPlaceholder: 'ਤੁਹਾਡਾ ਈਮੇਲ ਪਤਾ',
          phonePlaceholder: '+91 9876543210',
          passwordPlaceholder: 'ਇੱਕ ਮਜ਼ਬੂਤ ਪਾਸਵਰਡ ਬਣਾਓ',
          confirmPasswordPlaceholder: 'ਪਾਸਵਰਡ ਦੁਬਾਰਾ ਦਰਜ ਕਰੋ'
        };
      default:
        return {
          fullName: 'Full Name',
          email: 'Email Address',
          phone: 'Phone Number',
          dateOfBirth: 'Date of Birth',
          password: 'Password',
          confirmPassword: 'Confirm Password',
          agreeToTerms: 'I agree to the Terms of Service',
          agreeToPrivacy: 'I agree to the Privacy Policy',
          register: 'Create Account',
          fullNamePlaceholder: 'Enter your full name',
          emailPlaceholder: 'your.email@example.com',
          phonePlaceholder: '+91 9876543210',
          passwordPlaceholder: 'Create a strong password',
          confirmPasswordPlaceholder: 'Re-enter your password'
        };
    }
  };

  const labels = getFormLabels();

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.fullName?.trim()) {
      newErrors.fullName = currentLanguage === 'hi' ? 'नाम आवश्यक है' : 
                          currentLanguage === 'pa' ? 'ਨਾਮ ਲੋੜੀਂਦਾ ਹੈ' : 'Full name is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData?.email?.trim()) {
      newErrors.email = currentLanguage === 'hi' ? 'ईमेल आवश्यक है' : 
                       currentLanguage === 'pa' ? 'ਈਮੇਲ ਲੋੜੀਂਦਾ ਹੈ' : 'Email is required';
    } else if (!emailRegex?.test(formData?.email)) {
      newErrors.email = currentLanguage === 'hi' ? 'वैध ईमेल दर्ज करें' : 
                       currentLanguage === 'pa' ? 'ਸਹੀ ਈਮੇਲ ਦਰਜ ਕਰੋ' : 'Please enter a valid email';
    }

    const phoneRegex = /^[+]?[0-9]{10,15}$/;
    if (!formData?.phone?.trim()) {
      newErrors.phone = currentLanguage === 'hi' ? 'फोन नंबर आवश्यक है' : 
                       currentLanguage === 'pa' ? 'ਫੋਨ ਨੰਬਰ ਲੋੜੀਂਦਾ ਹੈ' : 'Phone number is required';
    } else if (!phoneRegex?.test(formData?.phone?.replace(/\s/g, ''))) {
      newErrors.phone = currentLanguage === 'hi' ? 'वैध फोन नंबर दर्ज करें' : 
                       currentLanguage === 'pa' ? 'ਸਹੀ ਫੋਨ ਨੰਬਰ ਦਰਜ ਕਰੋ' : 'Please enter a valid phone number';
    }

    if (!formData?.dateOfBirth) {
      newErrors.dateOfBirth = currentLanguage === 'hi' ? 'जन्म तिथि आवश्यक है' : 
                             currentLanguage === 'pa' ? 'ਜਨਮ ਤਾਰੀਖ ਲੋੜੀਂਦੀ ਹੈ' : 'Date of birth is required';
    }

    if (!formData?.password) {
      newErrors.password = currentLanguage === 'hi' ? 'पासवर्ड आवश्यक है' : 
                          currentLanguage === 'pa' ? 'ਪਾਸਵਰਡ ਲੋੜੀਂਦਾ ਹੈ' : 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = currentLanguage === 'hi' ? 'पासवर्ड कम से कम 8 अक्षर का होना चाहिए' : 
                          currentLanguage === 'pa' ? 'ਪਾਸਵਰਡ ਘੱਟੋ ਘੱਟ 8 ਅੱਖਰਾਂ ਦਾ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ' : 'Password must be at least 8 characters';
    }

    if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = currentLanguage === 'hi' ? 'पासवर्ड मेल नहीं खाते' : 
                                 currentLanguage === 'pa' ? 'ਪਾਸਵਰਡ ਮੇਲ ਨਹੀਂ ਖਾਂਦੇ' : 'Passwords do not match';
    }

    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = currentLanguage === 'hi' ? 'नियम और शर्तों से सहमति आवश्यक है' : 
                              currentLanguage === 'pa' ? 'ਨਿਯਮਾਂ ਅਤੇ ਸ਼ਰਤਾਂ ਨਾਲ ਸਹਿਮਤੀ ਲੋੜੀਂਦੀ ਹੈ' : 'You must agree to the terms of service';
    }

    if (!formData?.agreeToPrivacy) {
      newErrors.agreeToPrivacy = currentLanguage === 'hi' ? 'गोपनीयता नीति से सहमति आवश्यक है' : 
                                currentLanguage === 'pa' ? 'ਗੁਪਤਤਾ ਨੀਤੀ ਨਾਲ ਸਹਿਮਤੀ ਲੋੜੀਂਦੀ ਹੈ' : 'You must agree to the privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label={labels?.fullName}
          type="text"
          placeholder={labels?.fullNamePlaceholder}
          value={formData?.fullName}
          onChange={(e) => handleInputChange('fullName', e?.target?.value)}
          error={errors?.fullName}
          required
          className="md:col-span-2"
        />

        <Input
          label={labels?.email}
          type="email"
          placeholder={labels?.emailPlaceholder}
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          required
        />

        <Input
          label={labels?.phone}
          type="tel"
          placeholder={labels?.phonePlaceholder}
          value={formData?.phone}
          onChange={(e) => handleInputChange('phone', e?.target?.value)}
          error={errors?.phone}
          required
        />

        <Input
          label={labels?.dateOfBirth}
          type="date"
          value={formData?.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
          error={errors?.dateOfBirth}
          required
          max={new Date()?.toISOString()?.split('T')?.[0]}
        />

        <div className="relative">
          <Input
            label={labels?.password}
            type={showPassword ? "text" : "password"}
            placeholder={labels?.passwordPlaceholder}
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
          </button>
        </div>

        <div className="relative">
          <Input
            label={labels?.confirmPassword}
            type={showConfirmPassword ? "text" : "password"}
            placeholder={labels?.confirmPasswordPlaceholder}
            value={formData?.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
            error={errors?.confirmPassword}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={18} />
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <Checkbox
          label={labels?.agreeToTerms}
          checked={formData?.agreeToTerms}
          onChange={(e) => handleInputChange('agreeToTerms', e?.target?.checked)}
          error={errors?.agreeToTerms}
          required
        />

        <Checkbox
          label={labels?.agreeToPrivacy}
          checked={formData?.agreeToPrivacy}
          onChange={(e) => handleInputChange('agreeToPrivacy', e?.target?.checked)}
          error={errors?.agreeToPrivacy}
          required
        />
      </div>
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={isLoading}
        className="bg-gradient-therapeutic hover:opacity-90 transition-opacity duration-150"
      >
        {labels?.register}
      </Button>
    </form>
  );
};

export default RegistrationForm;