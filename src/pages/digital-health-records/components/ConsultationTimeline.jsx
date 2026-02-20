import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConsultationTimeline = ({ consultations }) => {
  const getConsultationTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'video':
        return 'Video';
      case 'in-person':
        return 'User';
      case 'phone':
        return 'Phone';
      default:
        return 'MessageSquare';
    }
  };

  const getConsultationTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'video':
        return 'bg-blue-100 text-blue-800';
      case 'in-person':
        return 'bg-green-100 text-green-800';
      case 'phone':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {consultations?.map((consultation, index) => (
        <div key={consultation?.id} className="relative">
          {/* Timeline Line */}
          {index < consultations?.length - 1 && (
            <div className="absolute left-6 top-12 w-0.5 h-16 bg-border" />
          )}
          
          <div className="flex items-start space-x-4">
            {/* Timeline Icon */}
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon 
                name={getConsultationTypeIcon(consultation?.type)} 
                size={20} 
                className="text-primary" 
              />
            </div>
            
            {/* Consultation Card */}
            <div className="flex-1 glass-card border border-white/20 rounded-lg p-4 hover:shadow-medical-md transition-all duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-heading font-semibold text-foreground">
                      Dr. {consultation?.doctorName}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-caption ${getConsultationTypeColor(consultation?.type)}`}>
                      {consultation?.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground font-caption mb-1">
                    {consultation?.specialty} • {consultation?.duration} mins
                  </p>
                  <p className="text-xs text-muted-foreground font-caption">
                    {new Date(consultation.date)?.toLocaleDateString('en-IN')} at {consultation?.time}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Download"
                  iconSize={14}
                  className="w-8 h-8 p-0 text-muted-foreground hover:text-foreground"
                />
              </div>

              {/* Chief Complaint */}
              <div className="mb-3">
                <p className="text-xs font-caption font-medium text-muted-foreground mb-1">
                  CHIEF COMPLAINT
                </p>
                <p className="text-sm text-foreground font-caption">
                  {consultation?.chiefComplaint}
                </p>
              </div>

              {/* Diagnosis */}
              <div className="mb-3">
                <p className="text-xs font-caption font-medium text-muted-foreground mb-1">
                  DIAGNOSIS
                </p>
                <p className="text-sm text-foreground font-caption">
                  {consultation?.diagnosis}
                </p>
              </div>

              {/* Treatment Plan */}
              <div className="mb-3">
                <p className="text-xs font-caption font-medium text-muted-foreground mb-1">
                  TREATMENT PLAN
                </p>
                <p className="text-sm text-foreground font-caption">
                  {consultation?.treatmentPlan}
                </p>
              </div>

              {/* Follow-up */}
              {consultation?.followUp && (
                <div className="border-t border-white/10 pt-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={14} className="text-primary" />
                    <p className="text-sm font-caption text-primary">
                      Follow-up: {consultation?.followUp}
                    </p>
                  </div>
                </div>
              )}

              {/* Prescribed Medicines Count */}
              {consultation?.medicinesCount > 0 && (
                <div className="border-t border-white/10 pt-3 mt-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="Pill" size={14} className="text-muted-foreground" />
                    <p className="text-sm font-caption text-muted-foreground">
                      {consultation?.medicinesCount} medicines prescribed
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConsultationTimeline;