import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrescriptionCard = ({ prescription }) => {
  const getMedicineTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'tablet':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'capsule':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'syrup':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'injection':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'cream':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRefillStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'text-success';
      case 'low':
        return 'text-warning';
      case 'out':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="glass-card border border-white/20 rounded-lg p-4 hover:shadow-medical-md transition-all duration-200 micro-interact">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="font-heading font-semibold text-foreground">
              {prescription?.medicineName}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs font-caption border ${getMedicineTypeColor(prescription?.type)}`}>
              {prescription?.type}
            </span>
          </div>
          <p className="text-sm text-muted-foreground font-caption mb-1">
            {prescription?.dosage} • {prescription?.frequency}
          </p>
          <p className="text-xs text-muted-foreground font-caption">
            Duration: {prescription?.duration}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground font-caption">
            {new Date(prescription.prescribedDate)?.toLocaleDateString('en-IN')}
          </p>
          <div className="flex items-center space-x-1 mt-1">
            <Icon 
              name="RefreshCw" 
              size={12} 
              className={getRefillStatusColor(prescription?.refillStatus)} 
            />
            <span className={`text-xs font-caption ${getRefillStatusColor(prescription?.refillStatus)}`}>
              {prescription?.refillStatus === 'available' ? 'Refill Available' : 
               prescription?.refillStatus === 'low' ? 'Low Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 pt-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="UserCheck" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-caption">
              Dr. {prescription?.doctorName}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {prescription?.refillStatus === 'available' && (
              <Button
                variant="outline"
                size="sm"
                iconName="Plus"
                iconPosition="left"
                iconSize={14}
                className="text-xs px-3 py-1 h-7"
              >
                Reorder
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
    </div>
  );
};

export default PrescriptionCard;