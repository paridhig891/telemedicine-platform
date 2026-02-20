import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConsultationHistory = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const consultations = [
    {
      id: 1,
      doctor: "Dr. Paridhi Gupta",
      specialty: "Cardiology",
      date: "2024-12-25",
      time: "2:30 PM",
      type: "video",
      status: "completed",
      diagnosis: "Routine cardiac checkup",
      followUp: "Follow up in 3 months",
      prescription: ["Metformin 500mg", "Lisinopril 10mg"],
      notes: `Patient reported feeling well with no chest pain or shortness of breath.\nBlood pressure readings have been stable.\nContinue current medication regimen.`,
      rating: 5
    },
    {
      id: 2,
      doctor: "Dr. Prince Solanki",
      specialty: "General Medicine",
      date: "2024-12-20",
      time: "10:15 AM",
      type: "in-person",
      status: "completed",
      diagnosis: "Annual health checkup",
      followUp: "Schedule blood work in 6 months",
      prescription: ["Vitamin D3 1000IU"],
      notes: `Comprehensive physical examination completed.\nAll vital signs within normal limits.\nRecommended lifestyle modifications for better health.`,
      rating: 4
    },
    {
      id: 3,
      doctor: "Dr. Naman Malviya",
      specialty: "Gastroenterology",
      date: "2024-12-15",
      time: "4:45 PM",
      type: "video",
      status: "completed",
      diagnosis: "Gastric acid reflux",
      followUp: "Follow up in 2 weeks if symptoms persist",
      prescription: ["Omeprazole 20mg"],
      notes: `Patient complained of heartburn and acid reflux symptoms.\nRecommended dietary changes and prescribed PPI.\nAdvised to avoid spicy foods and late-night meals.`,
      rating: 5
    }
  ];

  const getLabels = () => {
    switch (currentLanguage) {
      case 'hi':
        return {
          title: 'परामर्श इतिहास',
          recent: 'हाल की परामर्श',
          viewAll: 'सभी देखें',
          diagnosis: 'निदान',
          followUp: 'फॉलो अप',
          prescription: 'नुस्खा',
          notes: 'टिप्पणियां',
          rating: 'रेटिंग',
          bookNext: 'अगली बुकिंग'
        };
      case 'pa':
        return {
          title: 'ਸਲਾਹ ਦਾ ਇਤਿਹਾਸ',
          recent: 'ਹਾਲ ਦੀ ਸਲਾਹ',
          viewAll: 'ਸਭ ਦੇਖੋ',
          diagnosis: 'ਨਿਦਾਨ',
          followUp: 'ਫਾਲੋ ਅੱਪ',
          prescription: 'ਨੁਸਖਾ',
          notes: 'ਨੋਟਸ',
          rating: 'ਰੇਟਿੰਗ',
          bookNext: 'ਅਗਲੀ ਬੁਕਿੰਗ'
        };
      default:
        return {
          title: 'Consultation History',
          recent: 'Recent Consultations',
          viewAll: 'View All',
          diagnosis: 'Diagnosis',
          followUp: 'Follow Up',
          prescription: 'Prescription',
          notes: 'Notes',
          rating: 'Rating',
          bookNext: 'Book Next'
        };
    }
  };

  const getConsultationTypeIcon = (type) => {
    return type === 'video' ? 'Video' : 'User';
  };

  const getConsultationTypeColor = (type) => {
    return type === 'video' ?'bg-primary/10 text-primary border-primary/20' :'bg-secondary/10 text-secondary border-secondary/20';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={12}
        className={index < rating ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  const labels = getLabels();

  return (
    <div className="glass-card border border-white/20 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {labels?.title}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/digital-health-records')}
          iconName="ExternalLink"
          iconSize={16}
          className="text-muted-foreground hover:text-foreground"
        >
          {labels?.viewAll}
        </Button>
      </div>
      <div className="space-y-4">
        <h4 className="text-sm font-heading font-medium text-foreground">
          {labels?.recent}
        </h4>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {consultations?.map((consultation, index) => (
            <div key={consultation?.id} className="relative">
              {/* Timeline Line */}
              {index < consultations?.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-full bg-border" />
              )}
              
              <div className="flex space-x-4">
                {/* Timeline Dot */}
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center relative z-10">
                  <Icon 
                    name={getConsultationTypeIcon(consultation?.type)} 
                    size={18} 
                    color="white" 
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="glass-card border border-white/10 rounded-lg p-4 hover:border-white/20 transition-colors duration-150 micro-interact">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h5 className="font-heading font-medium text-foreground">
                          {consultation?.doctor}
                        </h5>
                        <p className="text-sm text-muted-foreground font-caption">
                          {consultation?.specialty}
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className={`px-2 py-1 rounded-full text-xs font-caption ${getConsultationTypeColor(consultation?.type)}`}>
                          {consultation?.type === 'video' ? 'Video' : 'In-Person'}
                        </div>
                        <span className="text-xs text-muted-foreground font-caption">
                          {formatDate(consultation?.date)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h6 className="text-sm font-heading font-medium text-foreground mb-1">
                          {labels?.diagnosis}
                        </h6>
                        <p className="text-sm text-muted-foreground font-caption">
                          {consultation?.diagnosis}
                        </p>
                      </div>

                      <div>
                        <h6 className="text-sm font-heading font-medium text-foreground mb-1">
                          {labels?.followUp}
                        </h6>
                        <p className="text-sm text-muted-foreground font-caption">
                          {consultation?.followUp}
                        </p>
                      </div>

                      {consultation?.prescription?.length > 0 && (
                        <div>
                          <h6 className="text-sm font-heading font-medium text-foreground mb-1">
                            {labels?.prescription}
                          </h6>
                          <div className="flex flex-wrap gap-2">
                            {consultation?.prescription?.map((med, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-caption"
                              >
                                {med}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h6 className="text-sm font-heading font-medium text-foreground mb-1">
                          {labels?.notes}
                        </h6>
                        <p className="text-sm text-muted-foreground font-caption whitespace-pre-line">
                          {consultation?.notes}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/10">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground font-caption">
                            {labels?.rating}:
                          </span>
                          <div className="flex space-x-1">
                            {renderStars(consultation?.rating)}
                          </div>
                        </div>
                        
                        <Button
                          variant="outline"
                          size="xs"
                          onClick={() => navigate('/appointment-booking')}
                          iconName="Calendar"
                          iconPosition="left"
                          iconSize={12}
                          className="text-xs px-2 py-1 h-6"
                        >
                          {labels?.bookNext}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultationHistory;