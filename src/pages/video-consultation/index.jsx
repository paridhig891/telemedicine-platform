import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ConsultationStatus from '../../components/ui/ConsultationStatus';
import VideoPlayer from './components/VideoPlayer';
import ConsultationSidebar from './components/ConsultationSidebar';
import VoiceAssistant from './components/VoiceAssistant';
import EmergencyPanel from './components/EmergencyPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const VideoConsultation = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [connectionQuality, setConnectionQuality] = useState('excellent');
  const [consultationStartTime] = useState(new Date());

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    // Mock connection quality monitoring
    const interval = setInterval(() => {
      const qualities = ['excellent', 'good', 'poor'];
      const randomQuality = qualities?.[Math.floor(Math.random() * qualities?.length)];
      setConnectionQuality(randomQuality);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      setIsSidebarVisible(false);
    } else {
      setIsSidebarVisible(true);
    }
  };

  const handleEndCall = () => {
    const confirmEnd = window.confirm(
      currentLanguage === 'hi' ? 'क्या आप वाकई कॉल समाप्त करना चाहते हैं?' :
      currentLanguage === 'pa'? 'ਕੀ ਤੁਸੀਂ ਸੱਚਮੁੱਚ ਕਾਲ ਖਤਮ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?' : 'Are you sure you want to end the call?'
    );
    
    if (confirmEnd) {
      navigate('/patient-dashboard');
    }
  };

  const handleEmergencyAction = (actionType) => {
    console.log(`Emergency action triggered: ${actionType}`);
    // In production, this would trigger actual emergency protocols
  };

  const handleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };

  const getPageLabels = () => {
    switch (currentLanguage) {
      case 'hi':
        return {
          title: 'वीडियो परामर्श',
          doctorName: 'डॉ. सारा विल्सन',
          specialty: 'सामान्य चिकित्सक',
          patientName: 'राजेश कुमार',
          consultationWith: 'के साथ परामर्श',
          toggleSidebar: 'साइडबार टॉगल करें',
          screenShare: 'स्क्रीन साझा करें',
          settings: 'सेटिंग्स',
          chat: 'चैट',
          endCall: 'कॉल समाप्त करें'
        };
      case 'pa':
        return {
          title: 'ਵੀਡੀਓ ਸਲਾਹ',
          doctorName: 'ਡਾ. ਸਾਰਾ ਵਿਲਸਨ',
          specialty: 'ਜਨਰਲ ਫਿਜ਼ੀਸ਼ਨ',
          patientName: 'ਰਾਜੇਸ਼ ਕੁਮਾਰ',
          consultationWith: 'ਨਾਲ ਸਲਾਹ',
          toggleSidebar: 'ਸਾਈਡਬਾਰ ਟੌਗਲ ਕਰੋ',
          screenShare: 'ਸਕ੍ਰੀਨ ਸਾਂਝਾ ਕਰੋ',
          settings: 'ਸੈਟਿੰਗਜ਼',
          chat: 'ਚੈਟ',
          endCall: 'ਕਾਲ ਖਤਮ ਕਰੋ'
        };
      default:
        return {
          title: 'Video Consultation',
          doctorName: 'Dr. Sarah Wilson',
          specialty: 'General Physician',
          patientName: 'Rajesh Kumar',
          consultationWith: 'Consultation with',
          toggleSidebar: 'Toggle Sidebar',
          screenShare: 'Screen Share',
          settings: 'Settings',
          chat: 'Chat',
          endCall: 'End Call'
        };
    }
  };

  const labels = getPageLabels();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {!isFullscreen && <Header />}
      {/* <ConsultationStatus /> */}
      <div className={`${isFullscreen ? 'fixed inset-0 z-300' : 'container mx-auto px-4 py-6'}`}>
        {/* Page Header - Hidden in fullscreen */}
        {!isFullscreen && (
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
                  {labels?.title}
                </h1>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Icon name="Video" size={16} />
                  <span className="font-caption">
                    {labels?.consultationWith} {labels?.doctorName} • {labels?.specialty}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSidebarVisible(!isSidebarVisible)}
                  iconName={isSidebarVisible ? "PanelRightClose" : "PanelRightOpen"}
                  iconPosition="left"
                  iconSize={16}
                  className="hidden lg:flex"
                >
                  {labels?.toggleSidebar}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleScreenShare}
                  iconName="Monitor"
                  iconPosition="left"
                  iconSize={16}
                  className={isScreenSharing ? "bg-primary text-primary-foreground" : ""}
                >
                  {labels?.screenShare}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Layout */}
        <div className={`flex ${isFullscreen ? 'h-screen' : 'gap-6'}`}>
          {/* Video Section */}
          <div className={`${isFullscreen ? 'flex-1' : isSidebarVisible ? 'flex-1' : 'w-full'}`}>
            <VideoPlayer
              isFullscreen={isFullscreen}
              onToggleFullscreen={handleToggleFullscreen}
              isMuted={isMuted}
              onToggleMute={() => setIsMuted(!isMuted)}
              isVideoEnabled={isVideoEnabled}
              onToggleVideo={() => setIsVideoEnabled(!isVideoEnabled)}
              onEndCall={handleEndCall}
              connectionQuality={connectionQuality}
            />

            {/* Mobile Controls - Only visible on mobile and not in fullscreen */}
            {!isFullscreen && (
              <div className="lg:hidden mt-4 flex justify-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSidebarVisible(!isSidebarVisible)}
                  iconName="MessageSquare"
                  iconSize={16}
                >
                  {labels?.chat}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Settings"
                  iconSize={16}
                >
                  {labels?.settings}
                </Button>
                
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleEndCall}
                  iconName="PhoneOff"
                  iconSize={16}
                >
                  {labels?.endCall}
                </Button>
              </div>
            )}
          </div>

          {/* Sidebar - Hidden in fullscreen on mobile */}
          {isSidebarVisible && !isFullscreen && (
            <div className="hidden lg:block">
              <ConsultationSidebar
                isVisible={true}
                onClose={() => setIsSidebarVisible(false)}
                currentLanguage={currentLanguage}
              />
            </div>
          )}

          {/* Mobile Sidebar Overlay */}
          {isSidebarVisible && (
            <div className="lg:hidden">
              <div className="fixed inset-0 bg-black/50 z-400" onClick={() => setIsSidebarVisible(false)} />
              <ConsultationSidebar
                isVisible={true}
                onClose={() => setIsSidebarVisible(false)}
                currentLanguage={currentLanguage}
              />
            </div>
          )}
        </div>

        {/* Consultation Info Bar - Only in fullscreen */}
        {isFullscreen && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-500">
            <div className="glass-card px-4 py-2 rounded-full">
              <div className="flex items-center space-x-4 text-white">
                <div className="flex items-center space-x-2">
                  <Icon name="User" size={16} />
                  <span className="font-caption text-sm">{labels?.patientName}</span>
                </div>
                <div className="w-px h-4 bg-white/30" />
                <div className="flex items-center space-x-2">
                  <Icon name="Stethoscope" size={16} />
                  <span className="font-caption text-sm">{labels?.doctorName}</span>
                </div>
                <div className="w-px h-4 bg-white/30" />
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} />
                  <span className="font-caption text-sm">
                    {Math.floor((new Date() - consultationStartTime) / 60000)}:
                    {String(Math.floor(((new Date() - consultationStartTime) % 60000) / 1000))?.padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Voice Assistant */}
      <VoiceAssistant 
        currentLanguage={currentLanguage}
        isVisible={!isFullscreen || window.innerWidth >= 1024}
      />
      {/* Emergency Panel */}
      <EmergencyPanel 
        currentLanguage={currentLanguage}
        onEmergencyAction={handleEmergencyAction}
      />
      {/* Connection Quality Indicator */}
      <div className="fixed bottom-4 right-4 z-300">
        <div className={`glass-card px-3 py-2 rounded-full ${
          connectionQuality === 'poor' ? 'bg-error/10 border-error/20' :
          connectionQuality === 'good'? 'bg-warning/10 border-warning/20' : 'bg-success/10 border-success/20'
        }`}>
          <div className="flex items-center space-x-2">
            <Icon 
              name={connectionQuality === 'poor' ? 'WifiOff' : 'Wifi'} 
              size={14} 
              className={
                connectionQuality === 'poor' ? 'text-error' :
                connectionQuality === 'good'? 'text-warning' : 'text-success'
              }
            />
            <span className="text-xs font-caption text-foreground capitalize">
              {connectionQuality}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoConsultation;