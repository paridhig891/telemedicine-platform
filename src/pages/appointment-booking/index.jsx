import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import AIAssistant from '../../components/ui/AIAssistant';
import ConsultationStatus from '../../components/ui/ConsultationStatus';
import CalendarWidget from './components/CalendarWidget';
import DoctorCard from './components/DoctorCard';
import SymptomInput from './components/SymptomInput';
import TimeSlotSelector from './components/TimeSlotSelector';
import BookingForm from './components/BookingForm';
import BookingConfirmation from './components/BookingConfirmation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const AppointmentBooking = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [bookingData, setBookingData] = useState(null);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('all');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock data for available slots and doctors
  const availableSlots = [
    { date: '2025-10-06', time: '09:00', duration: '30', isBooked: false },
    { date: '2025-10-06', time: '09:30', duration: '30', isBooked: false },
    { date: '2025-10-06', time: '10:00', duration: '30', isBooked: true },
    { date: '2025-10-05', time: '14:00', duration: '30', isBooked: false },
    { date: '2025-10-06', time: '14:30', duration: '30', isBooked: false },
    { date: '2025-10-05', time: '15:00', duration: '30', isBooked: false },
    { date: '2025-10-06', time: '18:00', duration: '30', isBooked: false, isUrgent: true },
    { date: '2025-10-07', time: '09:00', duration: '30', isBooked: false },
    { date: '2025-10-07', time: '10:00', duration: '30', isBooked: false },
    { date: '2025-10-07', time: '11:00', duration: '30', isBooked: false },
    { date: '2025-10-07', time: '16:00', duration: '30', isBooked: false },
    { date: '2025-10-07', time: '17:00', duration: '30', isBooked: false }
  ];

  const mockDoctors = [
    {
      id: 1,
      name: "Dr. Nandani Gupta",
      specialization: "Cardiologist",
      specialization_hi: "हृदय रोग विशेषज्ञ",
      specialization_pa: "ਦਿਲ ਦੇ ਰੋਗ ਮਾਹਿਰ",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      reviewCount: 156,
      experience: 12,
      consultationFee: 800,
      languages: ['English', 'Hindi'],
      isOnline: true,
      nextAvailable: "Today 2:00 PM",
      availableSlots: availableSlots?.filter(slot => ['2025-10-05', '2025-10-06']?.includes(slot?.date))
    },
    {
      id: 2,
      name: "Dr.Prince Solanki",
      specialization: "General Physician",
      specialization_hi: "सामान्य चिकित्सक",
      specialization_pa: "ਆਮ ਡਾਕਟਰ",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
      rating: 4.6,
      reviewCount: 203,
      experience: 8,
      consultationFee: 500,
      languages: ['English', 'Hindi', 'Punjabi'],
      isOnline: true,
      nextAvailable: "Tomorrow 9:00 AM",
      availableSlots: availableSlots?.filter(slot => ['2025-10-05', '2025-10-07']?.includes(slot?.date))
    },
    {
      id: 3,
      name: "Dr. Paridhi Gupta",
      specialization: "Dermatologist",
      specialization_hi: "त्वचा रोग विशेषज्ञ",
      specialization_pa: "ਚਮੜੀ ਦੇ ਰੋਗ ਮਾਹਿਰ",
      avatar: "https://images.unsplash.com/photo-1594824475317-29bb4b8b2b8e?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      reviewCount: 89,
      experience: 10,
      consultationFee: 700,
      languages: ['English', 'Hindi'],
      isOnline: false,
      nextAvailable: "Jan 3, 10:00 AM",
      availableSlots: availableSlots?.filter(slot => ['2025-10-05']?.includes(slot?.date))
    },
    {
      id: 4,
      name: "Dr. Naman Malviya",
      specialization: "Orthopedist",
      specialization_hi: "हड्डी रोग विशेषज्ञ",
      specialization_pa: "ਹੱਡੀਆਂ ਦੇ ਰੋਗ ਮਾਹਿਰ",
      avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
      rating: 4.7,
      reviewCount: 134,
      experience: 15,
      consultationFee: 900,
      languages: ['English', 'Punjabi', 'Hindi'],
      isOnline: true,
      nextAvailable: "Today 4:00 PM",
      availableSlots: availableSlots?.filter(slot => ['2025-10-05', '2025-10-07']?.includes(slot?.date))
    }
  ];

  useEffect(() => {
    let filtered = mockDoctors;

    if (searchQuery) {
      filtered = filtered?.filter(doctor => 
        doctor?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        doctor?.specialization?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    if (filterSpecialty !== 'all') {
      filtered = filtered?.filter(doctor => 
        doctor?.specialization?.toLowerCase() === filterSpecialty?.toLowerCase()
      );
    }

    setFilteredDoctors(filtered);
  }, [searchQuery, filterSpecialty]);

  const steps = [
    { 
      id: 1, 
      title: currentLanguage === 'hi' ? 'लक्षण और तारीख' : 
             currentLanguage === 'pa' ? 'ਲੱਛਣ ਅਤੇ ਮਿਤੀ' : 'Symptoms & Date',
      icon: 'Calendar'
    },
    { 
      id: 2, 
      title: currentLanguage === 'hi' ? 'डॉक्टर चुनें' : 
             currentLanguage === 'pa' ? 'ਡਾਕਟਰ ਚੁਣੋ' : 'Select Doctor',
      icon: 'User'
    },
    { 
      id: 3, 
      title: currentLanguage === 'hi' ? 'समय स्लॉट' : 
             currentLanguage === 'pa' ? 'ਸਮਾਂ ਸਲਾਟ' : 'Time Slot',
      icon: 'Clock'
    },
    { 
      id: 4, 
      title: currentLanguage === 'hi' ? 'बुकिंग फॉर्म' : 
             currentLanguage === 'pa' ? 'ਬੁਕਿੰਗ ਫਾਰਮ' : 'Booking Form',
      icon: 'FileText'
    },
    { 
      id: 5, 
      title: currentLanguage === 'hi' ? 'पुष्टि' : 
             currentLanguage === 'pa' ? 'ਪੁਸ਼ਟੀ' : 'Confirmation',
      icon: 'CheckCircle'
    }
  ];

  const specialties = [
    { value: 'all', label: currentLanguage === 'hi' ? 'सभी विशेषज्ञताएं' : 
                          currentLanguage === 'pa' ? 'ਸਾਰੀਆਂ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ' : 'All Specialties' },
    { value: 'cardiologist', label: currentLanguage === 'hi' ? 'हृदय रोग विशेषज्ञ' : 
                                   currentLanguage === 'pa' ? 'ਦਿਲ ਦੇ ਰੋਗ ਮਾਹਿਰ' : 'Cardiologist' },
    { value: 'general physician', label: currentLanguage === 'hi' ? 'सामान्य चिकित्सक' : 
                                        currentLanguage === 'pa' ? 'ਆਮ ਡਾਕਟਰ' : 'General Physician' },
    { value: 'dermatologist', label: currentLanguage === 'hi' ? 'त्वचा रोग विशेषज्ञ' : 
                                    currentLanguage === 'pa' ? 'ਚਮੜੀ ਦੇ ਰੋਗ ਮਾਹਿਰ' : 'Dermatologist' },
    { value: 'orthopedist', label: currentLanguage === 'hi' ? 'हड्डी रोग विशेषज्ञ' : 
                                  currentLanguage === 'pa' ? 'ਹੱਡੀਆਂ ਦੇ ਰੋਗ ਮਾਹਿਰ' : 'Orthopedist' }
  ];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleSymptomsChange = (symptoms) => {
    setSelectedSymptoms(symptoms);
  };

  const handleBookingSubmit = (data) => {
    setBookingData(data);
    setCurrentStep(5);
  };

  const handleNextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return selectedDate !== null;
      case 2:
        return selectedDoctor !== null;
      case 3:
        return selectedSlot !== null;
      case 4:
        return false; // Form handles its own submission
      default:
        return false;
    }
  };

  const getPageTitle = () => {
    switch (currentLanguage) {
      case 'hi':
        return 'अपॉइंटमेंट बुकिंग';
      case 'pa':
        return 'ਮੁਲਾਕਾਤ ਬੁਕਿੰਗ';
      default:
        return 'Book Appointment';
    }
  };

  const getPageSubtitle = () => {
    switch (currentLanguage) {
      case 'hi':
        return 'अपने स्वास्थ्य विशेषज्ञ के साथ अपॉइंटमेंट बुक करें';
      case 'pa':
        return 'ਆਪਣੇ ਸਿਹਤ ਮਾਹਿਰ ਨਾਲ ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ';
      default:
        return 'Schedule your appointment with healthcare specialists';
    }
  };

  if (currentStep === 5 && bookingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <Header />
        <ConsultationStatus />
        
        <main className="container mx-auto px-4 py-8">
          <BookingConfirmation 
            bookingData={bookingData}
            currentLanguage={currentLanguage}
          />
        </main>
        
        <AIAssistant />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />
      <ConsultationStatus />
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
            {getPageTitle()}
          </h1>
          <p className="text-base font-caption text-muted-foreground">
            {getPageSubtitle()}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 overflow-x-auto pb-4">
            {steps?.map((step, index) => (
              <div key={step?.id} className="flex items-center space-x-4">
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                  currentStep === step?.id 
                    ? 'bg-primary text-primary-foreground shadow-medical-sm' 
                    : currentStep > step?.id
                      ? 'bg-success text-success-foreground'
                      : 'bg-muted text-muted-foreground'
                }`}>
                  <Icon 
                    name={currentStep > step?.id ? 'Check' : step?.icon} 
                    size={16} 
                  />
                  <span className="text-sm font-caption font-medium whitespace-nowrap">
                    {step?.title}
                  </span>
                </div>
                {index < steps?.length - 1 && (
                  <div className={`w-8 h-0.5 ${
                    currentStep > step?.id ? 'bg-success' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-6xl mx-auto">
          {currentStep === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <SymptomInput
                  onSymptomsChange={handleSymptomsChange}
                  selectedSymptoms={selectedSymptoms}
                  currentLanguage={currentLanguage}
                />
              </div>
              <div>
                <CalendarWidget
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                  availableSlots={availableSlots}
                  currentLanguage={currentLanguage}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              {/* Search and Filter */}
              <div className="glass-card border border-white/20 rounded-xl p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder={currentLanguage === 'hi' ? 'डॉक्टर का नाम या विशेषज्ञता खोजें...' : 
                                  currentLanguage === 'pa'? 'ਡਾਕਟਰ ਦਾ ਨਾਮ ਜਾਂ ਵਿਸ਼ੇਸ਼ਤਾ ਖੋਜੋ...' : 'Search doctor name or specialty...'}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e?.target?.value)}
                      className="w-full pl-10 pr-4 py-2 bg-input border border-white/20 rounded-lg text-sm font-caption text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-colors duration-150"
                    />
                    <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                  </div>
                  <select
                    value={filterSpecialty}
                    onChange={(e) => setFilterSpecialty(e?.target?.value)}
                    className="px-4 py-2 bg-input border border-white/20 rounded-lg text-sm font-caption text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-colors duration-150"
                  >
                    {specialties?.map(specialty => (
                      <option key={specialty?.value} value={specialty?.value}>
                        {specialty?.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Doctors List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredDoctors?.map(doctor => (
                  <DoctorCard
                    key={doctor?.id}
                    doctor={doctor}
                    onSelect={handleDoctorSelect}
                    isSelected={selectedDoctor?.id === doctor?.id}
                    currentLanguage={currentLanguage}
                    selectedDate={selectedDate}
                  />
                ))}
              </div>

              {filteredDoctors?.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="UserX" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    {currentLanguage === 'hi' ? 'कोई डॉक्टर नहीं मिला' : 
                     currentLanguage === 'pa' ? 'ਕੋਈ ਡਾਕਟਰ ਨਹੀਂ ਮਿਲਿਆ' : 'No Doctors Found'}
                  </h3>
                  <p className="text-sm font-caption text-muted-foreground">
                    {currentLanguage === 'hi' ? 'कृपया अपनी खोज या फ़िल्टर बदलें।' : 
                     currentLanguage === 'pa'? 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਖੋਜ ਜਾਂ ਫਿਲਟਰ ਬਦਲੋ।' : 'Please try different search terms or filters.'}
                  </p>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <TimeSlotSelector
              selectedDoctor={selectedDoctor}
              selectedDate={selectedDate}
              onSlotSelect={handleSlotSelect}
              selectedSlot={selectedSlot}
              currentLanguage={currentLanguage}
            />
          )}

          {currentStep === 4 && (
            <BookingForm
              selectedDoctor={selectedDoctor}
              selectedDate={selectedDate}
              selectedSlot={selectedSlot}
              onBookingSubmit={handleBookingSubmit}
              currentLanguage={currentLanguage}
            />
          )}
        </div>

        {/* Navigation Buttons */}
        {currentStep < 4 && (
          <div className="flex justify-between items-center mt-8 max-w-6xl mx-auto">
            <Button
              variant="outline"
              onClick={handlePrevStep}
              disabled={currentStep === 1}
              iconName="ArrowLeft"
              iconPosition="left"
              iconSize={16}
            >
              {currentLanguage === 'hi' ? 'पिछला' : 
               currentLanguage === 'pa' ? 'ਪਿਛਲਾ' : 'Previous'}
            </Button>

            <div className="text-sm font-caption text-muted-foreground">
              {currentLanguage === 'hi' ? `चरण ${currentStep} का ${steps?.length - 1}` : 
               currentLanguage === 'pa' ? `ਕਦਮ ${currentStep} ਦਾ ${steps?.length - 1}` : 
               `Step ${currentStep} of ${steps?.length - 1}`}
            </div>

            <Button
              variant="default"
              onClick={handleNextStep}
              disabled={!canProceedToNext()}
              iconName="ArrowRight"
              iconPosition="right"
              iconSize={16}
            >
              {currentLanguage === 'hi' ? 'अगला' : 
               currentLanguage === 'pa' ? 'ਅਗਲਾ' : 'Next'}
            </Button>
          </div>
        )}
      </main>
      <AIAssistant />
    </div>
  );
};

export default AppointmentBooking;