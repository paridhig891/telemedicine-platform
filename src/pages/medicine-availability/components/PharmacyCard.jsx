import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PharmacyCard = ({ pharmacy, currentLanguage, searchedMedicine }) => {
  const [stockStatus, setStockStatus] = useState(pharmacy?.stockStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  // Simulate real-time stock updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance of stock update
        setIsUpdating(true);
        setTimeout(() => {
          const statuses = ['in-stock', 'low-stock', 'out-of-stock'];
          const newStatus = statuses?.[Math.floor(Math.random() * statuses?.length)];
          setStockStatus(newStatus);
          setIsUpdating(false);
        }, 1000);
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStockStatusConfig = () => {
    switch (stockStatus) {
      case 'in-stock':
        return {
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          text: currentLanguage === 'hi' ? 'स्टॉक में' : currentLanguage === 'pa' ? 'ਸਟਾਕ ਵਿੱਚ' : 'In Stock',
          icon: 'CheckCircle'
        };
      case 'low-stock':
        return {
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          text: currentLanguage === 'hi' ? 'कम स्टॉक' : currentLanguage === 'pa' ? 'ਘੱਟ ਸਟਾਕ' : 'Low Stock',
          icon: 'AlertTriangle'
        };
      case 'out-of-stock':
        return {
          color: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20',
          text: currentLanguage === 'hi' ? 'स्टॉक खत्म' : currentLanguage === 'pa' ? 'ਸਟਾਕ ਖਤਮ' : 'Out of Stock',
          icon: 'XCircle'
        };
      default:
        return {
          color: 'text-muted-foreground',
          bgColor: 'bg-muted/10',
          borderColor: 'border-muted/20',
          text: currentLanguage === 'hi' ? 'अज्ञात' : currentLanguage === 'pa' ? 'ਅਣਜਾਣ' : 'Unknown',
          icon: 'HelpCircle'
        };
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    })?.format(price);
  };

  const formatDistance = (distance) => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    }
    return `${distance?.toFixed(1)} km`;
  };

  const handleCall = () => {
    window.open(`tel:${pharmacy?.phone}`, '_self');
  };

  const handleDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${pharmacy?.coordinates?.lat},${pharmacy?.coordinates?.lng}`;
    window.open(url, '_blank');
  };

  const statusConfig = getStockStatusConfig();

  const getLabels = () => {
    switch (currentLanguage) {
      case 'hi':
        return {
          call: 'कॉल करें',
          directions: 'दिशा',
          delivery: 'डिलीवरी',
          open24: '24 घंटे',
          insurance: 'बीमा',
          mins: 'मिनट',
          away: 'दूर'
        };
      case 'pa':
        return {
          call: 'ਕਾਲ ਕਰੋ',
          directions: 'ਦਿਸ਼ਾ',
          delivery: 'ਡਿਲੀਵਰੀ',
          open24: '24 ਘੰਟੇ',
          insurance: 'ਬੀਮਾ',
          mins: 'ਮਿੰਟ',
          away: 'ਦੂਰ'
        };
      default:
        return {
          call: 'Call',
          directions: 'Directions',
          delivery: 'Delivery',
          open24: '24 Hours',
          insurance: 'Insurance',
          mins: 'mins',
          away: 'away'
        };
    }
  };

  const labels = getLabels();

  return (
    <div className="glass-card border border-white/20 rounded-xl p-6 hover:shadow-medical-md transition-all duration-300 micro-interact">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Building2" size={20} className="text-primary" />
            <h3 className="font-heading font-semibold text-foreground">
              {pharmacy?.name}
            </h3>
            {pharmacy?.isVerified && (
              <Icon name="BadgeCheck" size={16} className="text-success" />
            )}
          </div>
          <p className="text-sm text-muted-foreground font-caption mb-1">
            {pharmacy?.address}
          </p>
          <div className="flex items-center space-x-4 text-xs text-muted-foreground">
            <span className="flex items-center space-x-1">
              <Icon name="MapPin" size={12} />
              <span>{formatDistance(pharmacy?.distance)} {labels?.away}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Icon name="Clock" size={12} />
              <span>{pharmacy?.deliveryTime} {labels?.mins}</span>
            </span>
          </div>
        </div>

        {/* Stock Status */}
        <div className={`px-3 py-1 rounded-full border ${statusConfig?.borderColor} ${statusConfig?.bgColor} ${
          isUpdating ? 'animate-pulse' : ''
        }`}>
          <div className="flex items-center space-x-1">
            <Icon name={statusConfig?.icon} size={12} className={statusConfig?.color} />
            <span className={`text-xs font-caption font-medium ${statusConfig?.color}`}>
              {statusConfig?.text}
            </span>
          </div>
        </div>
      </div>
      {/* Medicine Info */}
      {searchedMedicine && (
        <div className="mb-4 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-caption font-medium text-foreground">
                {searchedMedicine}
              </p>
              <p className="text-sm text-muted-foreground">
                {pharmacy?.medicineDetails?.brand || 'Generic'}
              </p>
            </div>
            <div className="text-right">
              <p className="font-heading font-semibold text-foreground">
                {formatPrice(pharmacy?.medicineDetails?.price || 0)}
              </p>
              {pharmacy?.medicineDetails?.originalPrice && (
                <p className="text-xs text-muted-foreground line-through">
                  {formatPrice(pharmacy?.medicineDetails?.originalPrice)}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Features */}
      <div className="flex flex-wrap gap-2 mb-4">
        {pharmacy?.is24Hours && (
          <span className="px-2 py-1 bg-success/10 text-success text-xs rounded-full border border-success/20">
            <Icon name="Clock" size={10} className="inline mr-1" />
            {labels?.open24}
          </span>
        )}
        {pharmacy?.hasDelivery && (
          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
            <Icon name="Truck" size={10} className="inline mr-1" />
            {labels?.delivery}
          </span>
        )}
        {pharmacy?.acceptsInsurance && (
          <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full border border-secondary/20">
            <Icon name="Shield" size={10} className="inline mr-1" />
            {labels?.insurance}
          </span>
        )}
      </div>
      {/* Rating */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="flex items-center space-x-1">
          {[...Array(5)]?.map((_, i) => (
            <Icon
              key={i}
              name="Star"
              size={14}
              className={i < Math.floor(pharmacy?.rating) ? 'text-warning fill-current' : 'text-muted-foreground'}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground font-caption">
          {pharmacy?.rating} ({pharmacy?.reviewCount} reviews)
        </span>
      </div>
      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCall}
          iconName="Phone"
          iconPosition="left"
          iconSize={16}
          className="flex-1"
        >
          {labels?.call}
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={handleDirections}
          iconName="Navigation"
          iconPosition="left"
          iconSize={16}
          className="flex-1"
        >
          {labels?.directions}
        </Button>
      </div>
      {/* Real-time Update Indicator */}
      {isUpdating && (
        <div className="mt-3 flex items-center justify-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Loader2" size={12} className="animate-spin" />
          <span className="font-caption">
            {currentLanguage === 'hi' ? 'स्टॉक अपडेट हो रहा है...' : 
             currentLanguage === 'pa'? 'ਸਟਾਕ ਅਪਡੇਟ ਹੋ ਰਿਹਾ ਹੈ...' : 'Updating stock...'}
          </span>
        </div>
      )}
    </div>
  );
};

export default PharmacyCard;