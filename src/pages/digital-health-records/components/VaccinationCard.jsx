import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VaccinationCard = ({ vaccination }) => {
  const getVaccineStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'due':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'overdue':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getDoseProgress = () => {
    return (vaccination?.currentDose / vaccination?.totalDoses) * 100;
  };

  return (
    <div className="glass-card border border-white/20 rounded-lg p-4 hover:shadow-medical-md transition-all duration-200 micro-interact">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-heading font-semibold text-foreground">
              {vaccination?.vaccineName}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-caption border ${getVaccineStatusColor(vaccination?.status)}`}>
              {vaccination?.status}
            </span>
          </div>
          <p className="text-sm text-muted-foreground font-caption mb-1">
            {vaccination?.manufacturer}
          </p>
          <p className="text-xs text-muted-foreground font-caption">
            Batch: {vaccination?.batchNumber}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground font-caption">
            {vaccination?.lastDoseDate ? 
              new Date(vaccination.lastDoseDate)?.toLocaleDateString('en-IN') : 
              'Not started'
            }
          </p>
          {vaccination?.nextDueDate && (
            <p className="text-xs text-primary font-caption mt-1">
              Next: {new Date(vaccination.nextDueDate)?.toLocaleDateString('en-IN')}
            </p>
          )}
        </div>
      </div>
      {/* Dose Progress */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-caption text-muted-foreground">
            Dose Progress
          </span>
          <span className="text-sm font-caption text-foreground">
            {vaccination?.currentDose}/{vaccination?.totalDoses}
          </span>
        </div>
        <div className="w-full bg-muted/30 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${getDoseProgress()}%` }}
          />
        </div>
      </div>
      {/* Administered By */}
      <div className="border-t border-white/10 pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-caption">
              {vaccination?.administeredBy}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {vaccination?.status === 'due' && (
              <Button
                variant="outline"
                size="sm"
                iconName="Calendar"
                iconPosition="left"
                iconSize={14}
                className="text-xs px-3 py-1 h-7"
              >
                Schedule
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              iconName="Download"
              iconSize={14}
              className="w-7 h-7 p-0 text-muted-foreground hover:text-foreground"
            />
          </div>
        </div>
      </div>
      {/* Side Effects Note */}
      {vaccination?.sideEffects && (
        <div className="mt-3 p-2 bg-warning/5 rounded-lg border border-warning/10">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={12} className="text-warning mt-0.5" />
            <div>
              <p className="text-xs font-caption font-medium text-warning mb-1">
                Reported Side Effects
              </p>
              <p className="text-xs text-muted-foreground font-caption">
                {vaccination?.sideEffects}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VaccinationCard;