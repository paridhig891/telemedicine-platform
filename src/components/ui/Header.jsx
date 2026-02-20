import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import Symptomchecker from 'pages/patient-dashboard/components/Symptomchecker';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const navigationItems = [
    { path: '/patient-dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/appointment-booking', label: 'Book Appointment', icon: 'Calendar' },
    { path: '/digital-health-records', label: 'My Records', icon: 'FileText' },
    { path: '/medicine-availability', label: 'Find Medicine', icon: 'Pill' },
    { path: '/video-consultation', label: 'Consultation', icon: 'Video' },
  ];

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
    { code: 'pa', label: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('preferred-language', langCode);
    setIsLanguageOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    navigate('/patient-registration');
    setIsProfileOpen(false);
  };

  const isActive = (path) => location?.pathname === path;

  return (
    <header className="sticky top-0 z-100 w-full glass-card border-b border-white/20 backdrop-blur-lg">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600">
            <Icon name="Heart" size={24} color="white" strokeWidth={2} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-heading font-semibold text-foreground">
              Jeevani
            </h1>
            <span className="text-xs font-caption text-muted-foreground">
              Your Health, Our Priority
            </span>
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Button
              key={item?.path}
              variant={isActive(item?.path) ? "default" : "ghost"}
              size="sm"
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={18}
              className={`micro-interact  ${
                isActive(item?.path) 
                  ? 'bg-primary text-primary-foreground shadow-medical-sm' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              {item?.label}
            </Button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Language Toggle */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              iconName="Globe"
              iconPosition="left"
              iconSize={16}
              className="text-muted-foreground hover:text-foreground "
            >
              {languages?.find(lang => lang?.code === currentLanguage)?.flag}
            </Button>
            
            {isLanguageOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 glass-card border border-white/20 rounded-lg shadow-medical-md z-200">
                <div className="p-2">
                  {languages?.map((lang) => (
                    <button
                      key={lang?.code}
                      onClick={() => handleLanguageChange(lang?.code)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors duration-150 ${
                        currentLanguage === lang?.code
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <span className="text-lg">{lang?.flag}</span>
                      <span className="font-caption">{lang?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <span className="hidden md:block font-caption font-medium">
                Patient
              </span>
              <Icon name="ChevronDown" size={16} />
            </Button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 glass-card border border-white/20 rounded-lg shadow-medical-md z-200">
                <div className="p-2">
                  <div className="px-3 py-2 border-b border-white/10">
                    <p className="font-caption font-medium text-foreground">John Doe</p>
                    <p className="text-sm text-muted-foreground">john.doe@email.com</p>
                  </div>
                  
                  <div className="mt-2 space-y-1">
                    <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm text-foreground hover:bg-muted transition-colors duration-150">
                      <Icon name="User" size={16} />
                      <span>Profile Settings</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm text-foreground hover:bg-muted transition-colors duration-150">
                      <Icon name="Bell" size={16} />
                      <span>Notifications</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm text-foreground hover:bg-muted transition-colors duration-150">
                      <Icon name="Settings" size={16} />
                      <span>Preferences</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm text-foreground hover:bg-muted transition-colors duration-150">
                      <Icon name="HelpCircle" size={16} />
                      <span>Help & Support</span>
                    </button>
                    <div className="border-t border-white/10 mt-2 pt-2">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm text-error hover:bg-error/10 transition-colors duration-150"
                      >
                        <Icon name="LogOut" size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-muted-foreground hover:text-foreground"
            iconName="Menu"
            iconSize={20}
          />
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="lg:hidden border-t border-white/10">
        <nav className="flex overflow-x-auto px-4 py-2 space-x-2">
          {navigationItems?.map((item) => (
            <Button
              key={item?.path}
              variant={isActive(item?.path) ? "default" : "ghost"}
              size="sm"
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={16}
              className={`whitespace-nowrap ${
                isActive(item?.path) 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item?.label}
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;