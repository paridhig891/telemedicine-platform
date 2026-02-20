import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import axios from "axios";
const BookingForm = ({ selectedDoctor, selectedDate, selectedSlot, onBookingSubmit, currentLanguage }) => {
  const [formData, setFormData] = useState({
    appointmentType: 'video',
    consultationLanguage: currentLanguage,
    specialRequirements: '',
    patientName: 'Naman Malviya',
    patientEmail: 'namanmalviya234@gmail.com',
    patientPhone: '+91 98765 43210'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
   
  const appointmentTypes = [
    { 
      value: 'video', 
      label: currentLanguage === 'hi' ? 'वीडियो परामर्श' : 
             currentLanguage === 'pa' ? 'ਵੀਡੀਓ ਸਲਾਹ' : 'Video Consultation' 
    },
    { 
      value: 'in-person', 
      label: currentLanguage === 'hi' ? 'व्यक्तिगत मुलाकात' : 
             currentLanguage === 'pa' ? 'ਵਿਅਕਤੀਗਤ ਮੁਲਾਕਾਤ' : 'In-Person Visit' 
    }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'हिंदी' },
    { value: 'pa', label: 'ਪੰਜਾਬੀ' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
	//setTo(patientEmail)
  };
 const sendmail=async()=>{
const to='namanmalviya234@gmail.com'

 try {
      const res = await axios.post("https://innovik-1-xzbo.vercel.app/", {
        to:to,
		//patientEmail:patientEmail,
        subject: "Appointment Booking Confirmation",
		text: `Dear ${formData.patientName},\n\nYour appointment with Dr. ${selectedDoctor.name} on ${formatDate(selectedDate)} at ${selectedSlot.time} has been successfully booked.\n\nThank you for choosing our service!\n\nBest regards,\nJeevani Team`
      });
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Failed to send email");
    }
 }
  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);
    
    // Simulate booking process
    setTimeout(() => {
      onBookingSubmit({
        ...formData,
        doctor: selectedDoctor,
        date: selectedDate,
        slot: selectedSlot,
        bookingId: `BK${Date.now()}`,
        status: 'confirmed'
      });
      setIsSubmitting(false);
    }, 2000);
  };

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

  const getFormTitle = () => {
    switch (currentLanguage) {
      case 'hi':
        return 'अपॉइंटमेंट बुकिंग फॉर्म';
      case 'pa':
        return 'ਮੁਲਾਕਾਤ ਬੁਕਿੰਗ ਫਾਰਮ';
      default:
        return 'Appointment Booking Form';
    }
  };

  if (!selectedDoctor || !selectedDate || !selectedSlot) {
    return (
      <div className="glass-card border border-white/20 rounded-xl p-6">
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            {currentLanguage === 'hi' ? 'बुकिंग विवरण अधूरे हैं' : 
             currentLanguage === 'pa' ? 'ਬੁਕਿੰਗ ਵੇਰਵੇ ਅਧੂਰੇ ਹਨ' : 'Booking Details Incomplete'}
          </h3>
          <p className="text-sm font-caption text-muted-foreground">
            {currentLanguage === 'hi' ? 'कृपया डॉक्टर, तारीख और समय चुनें।' : 
             currentLanguage === 'pa' ? 'ਕਿਰਪਾ ਕਰਕੇ ਡਾਕਟਰ, ਮਿਤੀ ਅਤੇ ਸਮਾਂ ਚੁਣੋ।' : 'Please select doctor, date and time slot.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card border border-white/20 rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-8 h-8 rounded-full bg-gradient-therapeutic flex items-center justify-center">
          <Icon name="FileText" size={16} color="white" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {getFormTitle()}
        </h3>
      </div>
      {/* Booking Summary */}
      <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
        <h4 className="text-sm font-heading font-medium text-foreground mb-3">
          {currentLanguage === 'hi' ? 'बुकिंग सारांश' : 
           currentLanguage === 'pa' ? 'ਬੁਕਿੰਗ ਸਾਰਾਂਸ਼' : 'Booking Summary'}
        </h4>
        <div className="space-y-2 text-sm font-caption">
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {currentLanguage === 'hi' ? 'डॉक्टर:' : 
               currentLanguage === 'pa' ? 'ਡਾਕਟਰ:' : 'Doctor:'}
            </span>
            <span className="text-foreground font-medium">{selectedDoctor?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {currentLanguage === 'hi' ? 'तारीख:' : 
               currentLanguage === 'pa' ? 'ਮਿਤੀ:' : 'Date:'}
            </span>
            <span className="text-foreground font-medium">{formatDate(selectedDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {currentLanguage === 'hi' ? 'समय:' : 
               currentLanguage === 'pa' ? 'ਸਮਾਂ:' : 'Time:'}
            </span>
            <span className="text-foreground font-medium">{selectedSlot?.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {currentLanguage === 'hi' ? 'अवधि:' : 
               currentLanguage === 'pa' ? 'ਮਿਆਦ:' : 'Duration:'}
            </span>
            <span className="text-foreground font-medium">
              {selectedSlot?.duration || '30'} {currentLanguage === 'hi' ? 'मिनट' : 
                                                currentLanguage === 'pa' ? 'ਮਿੰਟ' : 'minutes'}
            </span>
          </div>
          <div className="flex justify-between pt-2 border-t border-primary/10">
            <span className="text-muted-foreground">
              {currentLanguage === 'hi' ? 'कुल शुल्क:' : 
               currentLanguage === 'pa' ? 'ਕੁੱਲ ਫੀਸ:' : 'Total Fee:'}
            </span>
            <span className="text-foreground font-semibold">{formatFee(selectedDoctor?.consultationFee)}</span>
          </div>
        </div>
      </div>
      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Appointment Type */}
        <Select
          label={currentLanguage === 'hi' ? 'अपॉइंटमेंट प्रकार' : 
                 currentLanguage === 'pa' ? 'ਮੁਲਾਕਾਤ ਦੀ ਕਿਸਮ' : 'Appointment Type'}
          options={appointmentTypes}
          value={formData?.appointmentType}
          onChange={(value) => handleInputChange('appointmentType', value)}
          required
        />

        {/* Consultation Language */}
        <Select
          label={currentLanguage === 'hi' ? 'परामर्श भाषा' : 
                 currentLanguage === 'pa' ? 'ਸਲਾਹ ਦੀ ਭਾਸ਼ਾ' : 'Consultation Language'}
          options={languageOptions}
          value={formData?.consultationLanguage}
          onChange={(value) => handleInputChange('consultationLanguage', value)}
          required
        />

        {/* Patient Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={currentLanguage === 'hi' ? 'रोगी का नाम' : 
                   currentLanguage === 'pa' ? 'ਮਰੀਜ਼ ਦਾ ਨਾਮ' : 'Patient Name'}
            type="text"
            value={formData?.patientName}
            onChange={(e) => handleInputChange('patientName', e?.target?.value)}
            required
          />
          <Input
            label={currentLanguage === 'hi' ? 'फोन नंबर' : 
                   currentLanguage === 'pa' ? 'ਫੋਨ ਨੰਬਰ' : 'Phone Number'}
            type="tel"
            value={formData?.patientPhone}
            onChange={(e) => handleInputChange('patientPhone', e?.target?.value)}
            required
          />
        </div>

        <Input
          label={currentLanguage === 'hi' ? 'ईमेल पता' : 
                 currentLanguage === 'pa' ? 'ਈਮੇਲ ਪਤਾ' : 'Email Address'}
          type="email"
          value={formData?.patientEmail}
          onChange={(e) => setTo((e)=>e.target.value)}
          required
        />

        {/* Special Requirements */}
        <div>
          <label className="block text-sm font-caption font-medium text-foreground mb-2">
            {currentLanguage === 'hi' ? 'विशेष आवश्यकताएं (वैकल्पिक)' : 
             currentLanguage === 'pa' ? 'ਵਿਸ਼ੇਸ਼ ਲੋੜਾਂ (ਵਿਕਲਪਿਕ)' : 'Special Requirements (Optional)'}
          </label>
          <textarea
            value={formData?.specialRequirements}
            onChange={(e) => handleInputChange('specialRequirements', e?.target?.value)}
            placeholder={currentLanguage === 'hi' ? 'कोई विशेष जानकारी या आवश्यकताएं...' : 
                        currentLanguage === 'pa' ? 'ਕੋਈ ਵਿਸ਼ੇਸ਼ ਜਾਣਕਾਰੀ ਜਾਂ ਲੋੜਾਂ...' : 'Any special information or requirements...'}
            rows={3}
            className="w-full px-3 py-2 bg-input border border-white/20 rounded-lg text-sm font-caption text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-colors duration-150"
          />
        </div>

        {/* Payment Information */}
        <div className="p-4 bg-warning/5 rounded-lg border border-warning/10">
          <div className="flex items-start space-x-3">
            <Icon name="CreditCard" size={16} className="text-warning mt-0.5" />
            <div>
              <h4 className="text-sm font-heading font-medium text-foreground mb-1">
                {currentLanguage === 'hi' ? 'भुगतान जानकारी' : 
                 currentLanguage === 'pa' ? 'ਭੁਗਤਾਨ ਜਾਣਕਾਰੀ' : 'Payment Information'}
              </h4>
              <p className="text-xs font-caption text-muted-foreground">
                {currentLanguage === 'hi' ? 'भुगतान बुकिंग पुष्टि के बाद सुरक्षित गेटवे के माध्यम से किया जाएगा।' : 
                 currentLanguage === 'pa' ? 'ਭੁਗਤਾਨ ਬੁਕਿੰਗ ਪੁਸ਼ਟੀ ਤੋਂ ਬਾਅਦ ਸੁਰੱਖਿਤ ਗੇਟਵੇ ਰਾਹੀਂ ਕੀਤਾ ਜਾਵੇਗਾ।' : 'Payment will be processed through secure gateway after booking confirmation.'}
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex space-x-3 pt-4">
          <Button
            type="submit"
            variant="default"
            loading={isSubmitting}
            iconName="Calendar"
            iconPosition="left"
            iconSize={16}
			onClick={sendmail}
            className="flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting 
              ? (currentLanguage === 'hi' ? 'बुकिंग हो रही है...' : 
                 currentLanguage === 'pa' ? 'ਬੁਕਿੰਗ ਹੋ ਰਹੀ ਹੈ...' : 'Booking...')
              : (currentLanguage === 'hi' ? 'अपॉइंटमेंट बुक करें' : 
                 currentLanguage === 'pa' ? 'ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ' : 'Book Appointment')
            }
          </Button>
          <Button
            type="button"
            variant="outline"
            iconName="ArrowLeft"
            iconPosition="left"
            iconSize={16}
            disabled={isSubmitting}
          >
            {currentLanguage === 'hi' ? 'वापस' : 
             currentLanguage === 'pa' ? 'ਵਾਪਸ' : 'Back'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;