import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BookingConfirmation = ({ bookingData, currentLanguage }) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return `${date?.getDate()?.toString()?.padStart(2, '0')}/${(date?.getMonth() + 1)?.toString()?.padStart(2, '0')}/${date?.getFullYear()}`;
  };

  const formatFee = (fee) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    })?.format(fee);
  };

  const getConfirmationTitle = () => {
    switch (currentLanguage) {
      case 'hi':
        return 'अपॉइंटमेंट सफलतापूर्वक बुक हो गई!';
      case 'pa':
        return 'ਮੁਲਾਕਾਤ ਸਫਲਤਾਪੂਰਵਕ ਬੁੱਕ ਹੋ ਗਈ!';
      default:
        return 'Appointment Successfully Booked!';
    }
  };

  const getAppointmentTypeText = (type) => {
    if (type === 'video') {
      return currentLanguage === 'hi' ? 'वीडियो परामर्श' : 
             currentLanguage === 'pa' ? 'ਵੀਡੀਓ ਸਲਾਹ' : 'Video Consultation';
    }
    return currentLanguage === 'hi' ? 'व्यक्तिगत मुलाकात' : 
           currentLanguage === 'pa' ? 'ਵਿਅਕਤੀਗਤ ਮੁਲਾਕਾਤ' : 'In-Person Visit';
  };

  const handleGoToDashboard = () => {
    navigate('/patient-dashboard');
  };

  const handleViewAppointments = () => {
    navigate('/patient-dashboard');
  };

  const handleAddToCalendar = () => {
    // Create calendar event
    const event = {
      title: `Appointment with ${bookingData?.doctor?.name}`,
      start: new Date(bookingData.date),
      description: `${getAppointmentTypeText(bookingData?.appointmentType)} with ${bookingData?.doctor?.name}`
    };
    
    // For demo purposes, show success message
    alert(currentLanguage === 'hi' ? 'कैलेंडर में जोड़ा गया!' : 
          currentLanguage === 'pa' ? 'ਕੈਲੰਡਰ ਵਿੱਚ ਸ਼ਾਮਲ ਕੀਤਾ ਗਿਆ!' : 'Added to calendar!');
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Success Animation */}
      <div className="text-center mb-8">
        <div className="relative inline-flex items-center justify-center w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full bg-success/20 animate-ping" />
          <div className="relative w-16 h-16 rounded-full bg-success flex items-center justify-center">
            <Icon name="Check" size={32} color="white" strokeWidth={3} />
          </div>
        </div>
        
        <h1 className="text-2xl font-heading font-bold text-foreground mb-2">
          {getConfirmationTitle()}
        </h1>
        
        <p className="text-base font-caption text-muted-foreground">
          {currentLanguage === 'hi' ? 'आपकी बुकिंग की पुष्टि हो गई है। विवरण नीचे देखें।' : 
           currentLanguage === 'pa'? 'ਤੁਹਾਡੀ ਬੁਕਿੰਗ ਦੀ ਪੁਸ਼ਟੀ ਹੋ ਗਈ ਹੈ। ਵੇਰਵੇ ਹੇਠਾਂ ਦੇਖੋ।' : 'Your booking has been confirmed. See details below.'}
        </p>
      </div>
      {/* Booking Details Card */}
      <div className="glass-card border border-white/20 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold text-foreground">
            {currentLanguage === 'hi' ? 'बुकिंग विवरण' : 
             currentLanguage === 'pa' ? 'ਬੁਕਿੰਗ ਵੇਰਵੇ' : 'Booking Details'}
          </h2>
          <div className="flex items-center space-x-2 px-3 py-1 bg-success/10 text-success rounded-full text-sm font-caption border border-success/20">
            <Icon name="CheckCircle" size={14} />
            <span>
              {currentLanguage === 'hi' ? 'पुष्ट' : 
               currentLanguage === 'pa' ? 'ਪੁਸ਼ਟ' : 'Confirmed'}
            </span>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-3 p-3 bg-primary/5 rounded-lg">
            <Icon name="Calendar" size={20} className="text-primary" />
            <div>
              <p className="text-sm font-caption text-muted-foreground">
                {currentLanguage === 'hi' ? 'तारीख और समय' : 
                 currentLanguage === 'pa' ? 'ਮਿਤੀ ਅਤੇ ਸਮਾਂ' : 'Date & Time'}
              </p>
              <p className="text-base font-heading font-medium text-foreground">
                {formatDate(bookingData?.date)} at {bookingData?.slot?.time}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 bg-secondary/5 rounded-lg">
            <Icon name="User" size={20} className="text-secondary" />
            <div>
              <p className="text-sm font-caption text-muted-foreground">
                {currentLanguage === 'hi' ? 'डॉक्टर' : 
                 currentLanguage === 'pa' ? 'ਡਾਕਟਰ' : 'Doctor'}
              </p>
              <p className="text-base font-heading font-medium text-foreground">
                {bookingData?.doctor?.name}
              </p>
            </div>
          </div>
        </div>

        {/* Booking ID */}
        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg mb-4">
          <div>
            <p className="text-sm font-caption text-muted-foreground">
              {currentLanguage === 'hi' ? 'बुकिंग आईडी' : 
               currentLanguage === 'pa' ? 'ਬੁਕਿੰਗ ਆਈਡੀ' : 'Booking ID'}
            </p>
            <p className="text-base font-mono font-medium text-foreground">
              {bookingData?.bookingId}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="Copy"
            iconSize={14}
            className="text-muted-foreground hover:text-foreground"
          />
        </div>

        {/* Toggle Details */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDetails(!showDetails)}
          iconName={showDetails ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          iconSize={16}
          className="w-full justify-center text-muted-foreground hover:text-foreground"
        >
          {showDetails 
            ? (currentLanguage === 'hi' ? 'कम विवरण' : 
               currentLanguage === 'pa' ? 'ਘੱਟ ਵੇਰਵੇ' : 'Less Details')
            : (currentLanguage === 'hi' ? 'अधिक विवरण' : 
               currentLanguage === 'pa' ? 'ਹੋਰ ਵੇਰਵੇ' : 'More Details')
          }
        </Button>

        {/* Detailed Information */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-caption">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {currentLanguage === 'hi' ? 'अपॉइंटमेंट प्रकार:' : 
                   currentLanguage === 'pa' ? 'ਮੁਲਾਕਾਤ ਦੀ ਕਿਸਮ:' : 'Appointment Type:'}
                </span>
                <span className="text-foreground font-medium">
                  {getAppointmentTypeText(bookingData?.appointmentType)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {currentLanguage === 'hi' ? 'परामर्श भाषा:' : 
                   currentLanguage === 'pa' ? 'ਸਲਾਹ ਦੀ ਭਾਸ਼ਾ:' : 'Consultation Language:'}
                </span>
                <span className="text-foreground font-medium">
                  {bookingData?.consultationLanguage === 'hi' ? 'हिंदी' : 
                   bookingData?.consultationLanguage === 'pa' ? 'ਪੰਜਾਬੀ' : 'English'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {currentLanguage === 'hi' ? 'अवधि:' : 
                   currentLanguage === 'pa' ? 'ਮਿਆਦ:' : 'Duration:'}
                </span>
                <span className="text-foreground font-medium">
                  {bookingData?.slot?.duration || '30'} {currentLanguage === 'hi' ? 'मिनट' : 
                                                      currentLanguage === 'pa' ? 'ਮਿੰਟ' : 'minutes'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {currentLanguage === 'hi' ? 'परामर्श शुल्क:' : 
                   currentLanguage === 'pa' ? 'ਸਲਾਹ ਫੀਸ:' : 'Consultation Fee:'}
                </span>
                <span className="text-foreground font-semibold">
                  {formatFee(bookingData?.doctor?.consultationFee)}
                </span>
              </div>
            </div>
            
            {bookingData?.specialRequirements && (
              <div className="pt-2">
                <p className="text-sm font-caption text-muted-foreground mb-1">
                  {currentLanguage === 'hi' ? 'विशेष आवश्यकताएं:' : 
                   currentLanguage === 'pa' ? 'ਵਿਸ਼ੇਸ਼ ਲੋੜਾਂ:' : 'Special Requirements:'}
                </p>
                <p className="text-sm font-caption text-foreground bg-muted/30 p-2 rounded">
                  {bookingData?.specialRequirements}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Button
          variant="default"
          onClick={handleGoToDashboard}
          iconName="LayoutDashboard"
          iconPosition="left"
          iconSize={16}
          className="w-full"
        >
          {currentLanguage === 'hi' ? 'डैशबोर्ड पर जाएं' : 
           currentLanguage === 'pa' ? 'ਡੈਸ਼ਬੋਰਡ ਤੇ ਜਾਓ' : 'Go to Dashboard'}
        </Button>
        
        <Button
          variant="outline"
          onClick={handleAddToCalendar}
          iconName="Calendar"
          iconPosition="left"
          iconSize={16}
          className="w-full"
        >
          {currentLanguage === 'hi' ? 'कैलेंडर में जोड़ें' : 
           currentLanguage === 'pa' ? 'ਕੈਲੰਡਰ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰੋ' : 'Add to Calendar'}
        </Button>
        
        <Button
          variant="ghost"
          onClick={handleViewAppointments}
          iconName="Clock"
          iconPosition="left"
          iconSize={16}
          className="w-full"
        >
          {currentLanguage === 'hi' ? 'अपॉइंटमेंट देखें' : 
           currentLanguage === 'pa' ? 'ਮੁਲਾਕਾਤਾਂ ਦੇਖੋ' : 'View Appointments'}
        </Button>
      </div>
      {/* Important Notes */}
      <div className="glass-card border border-warning/20 bg-warning/5 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
          <div>
            <h3 className="text-sm font-heading font-medium text-foreground mb-2">
              {currentLanguage === 'hi' ? 'महत्वपूर्ण जानकारी' : 
               currentLanguage === 'pa' ? 'ਮਹੱਤਵਪੂਰਨ ਜਾਣਕਾਰੀ' : 'Important Information'}
            </h3>
            <ul className="text-sm font-caption text-muted-foreground space-y-1">
              <li>
                {currentLanguage === 'hi' ? '• अपॉइंटमेंट से 15 मिनट पहले तैयार रहें।' : 
                 currentLanguage === 'pa'? '• ਮੁਲਾਕਾਤ ਤੋਂ 15 ਮਿੰਟ ਪਹਿਲਾਂ ਤਿਆਰ ਰਹੋ।' : '• Please be ready 15 minutes before your appointment.'}
              </li>
              <li>
                {currentLanguage === 'hi' ? '• वीडियो कॉल के लिए अच्छा इंटरनेट कनेक्शन सुनिश्चित करें।' : 
                 currentLanguage === 'pa'? '• ਵੀਡੀਓ ਕਾਲ ਲਈ ਚੰਗਾ ਇੰਟਰਨੈੱਟ ਕਨੈਕਸ਼ਨ ਯਕੀਨੀ ਬਣਾਓ।' : '• Ensure good internet connection for video calls.'}
              </li>
              <li>
                {currentLanguage === 'hi' ? '• रद्दीकरण के लिए कम से कम 2 घंटे पहले सूचना दें।' : 
                 currentLanguage === 'pa'? '• ਰੱਦ ਕਰਨ ਲਈ ਘੱਟੋ ਘੱਟ 2 ਘੰਟੇ ਪਹਿਲਾਂ ਸੂਚਨਾ ਦਿਓ।' : '• For cancellation, notify at least 2 hours in advance.'}
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* Auto-redirect Notice */}
      {countdown > 0 && (
        <div className="text-center mt-6 p-3 bg-muted/30 rounded-lg">
          <p className="text-sm font-caption text-muted-foreground">
            {currentLanguage === 'hi' ? `${countdown} सेकंड में डैशबोर्ड पर रीडायरेक्ट हो रहे हैं...` : 
             currentLanguage === 'pa' ? `${countdown} ਸਕਿੰਟ ਵਿੱਚ ਡੈਸ਼ਬੋਰਡ ਤੇ ਰੀਡਾਇਰੈਕਟ ਹੋ ਰਹੇ ਹਾਂ...` : 
             `Redirecting to dashboard in ${countdown} seconds...`}
          </p>
        </div>
      )}
    </div>
  );
};

export default BookingConfirmation;