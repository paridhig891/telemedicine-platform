import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapView = ({ pharmacies, currentLanguage, selectedPharmacy, onPharmacySelect }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 22.71957, lng: 75.85773 }); // Chandigarh coordinates
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const getStockStatusColor = (status) => {
    switch (status) {
      case 'in-stock':
        return '#10B981'; // success color
      case 'low-stock':
        return '#F59E0B'; // warning color
      case 'out-of-stock':
        return '#EF4444'; // error color
      default:
        return '#64748B'; // muted color
    }
  };

  const getMapLabels = () => {
    switch (currentLanguage) {
      case 'hi':
        return {
          loading: 'मैप लोड हो रहा है...',
          pharmaciesNearby: 'आस-पास की फार्मेसी',
          selectPharmacy: 'फार्मेसी चुनें',
          getDirections: 'दिशा प्राप्त करें',
          callNow: 'अभी कॉल करें'
        };
      case 'pa':
        return {
          loading: 'ਨਕਸ਼ਾ ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
          pharmaciesNearby: 'ਨੇੜੇ ਦੀਆਂ ਫਾਰਮੇਸੀਆਂ',
          selectPharmacy: 'ਫਾਰਮੇਸੀ ਚੁਣੋ',
          getDirections: 'ਦਿਸ਼ਾ ਪ੍ਰਾਪਤ ਕਰੋ',
          callNow: 'ਹੁਣੇ ਕਾਲ ਕਰੋ'
        };
      default:
        return {
          loading: 'Loading map...',
          pharmaciesNearby: 'Pharmacies Nearby',
          selectPharmacy: 'Select Pharmacy',
          getDirections: 'Get Directions',
          callNow: 'Call Now'
        };
    }
  };

  const labels = getMapLabels();

  const handleGetDirections = (pharmacy) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${pharmacy?.coordinates?.lat},${pharmacy?.coordinates?.lng}`;
    window.open(url, '_blank');
  };

  const handleCall = (pharmacy) => {
    window.open(`tel:${pharmacy?.phone}`, '_self');
  };

  return (
    <div className="glass-card border border-white/20 rounded-xl overflow-hidden">
      {/* Map Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Map" size={20} className="text-primary" />
            <h3 className="font-heading font-semibold text-foreground">
              {labels?.pharmaciesNearby}
            </h3>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-xs font-caption">In Stock</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span className="text-xs font-caption">Low Stock</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-error" />
              <span className="text-xs font-caption">Out of Stock</span>
            </div>
          </div>
        </div>
      </div>
      {/* Map Container */}
      <div className="relative h-96 lg:h-[500px]">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
            <div className="text-center">
              <Icon name="Loader2" size={32} className="animate-spin text-primary mb-2" />
              <p className="text-sm text-muted-foreground font-caption">
                {labels?.loading}
              </p>
            </div>
          </div>
        ) : (
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Pharmacy Locations"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=14&output=embed`}
            className="w-full h-full"
          />
        )}

        {/* Pharmacy Pins Overlay */}
        {!isLoading && (
          <div className="absolute inset-0 pointer-events-none">
            {pharmacies?.slice(0, 8)?.map((pharmacy, index) => (
              <div
                key={pharmacy?.id}
                className="absolute pointer-events-auto"
                style={{
                  left: `${20 + (index % 4) * 20}%`,
                  top: `${20 + Math.floor(index / 4) * 30}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div
                  className={`relative cursor-pointer transition-all duration-300 hover:scale-110 ${
                    selectedPharmacy?.id === pharmacy?.id ? 'scale-125' : ''
                  }`}
                  onClick={() => onPharmacySelect(pharmacy)}
                >
                  {/* Glowing Pin */}
                  <div
                    className="w-6 h-6 rounded-full border-2 border-white shadow-lg animate-pulse-medical"
                    style={{ backgroundColor: getStockStatusColor(pharmacy?.stockStatus) }}
                  >
                    <div className="absolute inset-0 rounded-full animate-ping opacity-75"
                         style={{ backgroundColor: getStockStatusColor(pharmacy?.stockStatus) }} />
                  </div>
                  
                  {/* Pharmacy Info Tooltip */}
                  {selectedPharmacy?.id === pharmacy?.id && (
                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-64 glass-card border border-white/20 rounded-lg p-3 shadow-medical-lg z-10">
                      <div className="text-center">
                        <h4 className="font-heading font-semibold text-foreground text-sm mb-1">
                          {pharmacy?.name}
                        </h4>
                        <p className="text-xs text-muted-foreground font-caption mb-2">
                          {pharmacy?.distance?.toFixed(1)} km away
                        </p>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e?.stopPropagation();
                              handleCall(pharmacy);
                            }}
                            iconName="Phone"
                            iconSize={12}
                            className="flex-1 text-xs py-1"
                          >
                            {labels?.callNow}
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={(e) => {
                              e?.stopPropagation();
                              handleGetDirections(pharmacy);
                            }}
                            iconName="Navigation"
                            iconSize={12}
                            className="flex-1 text-xs py-1"
                          >
                            {labels?.getDirections}
                          </Button>
                        </div>
                      </div>
                      {/* Tooltip Arrow */}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/20" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Map Controls */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground font-caption">
            {currentLanguage === 'hi' ? `${pharmacies?.length} फार्मेसी मिली` :
             currentLanguage === 'pa' ? `${pharmacies?.length} ਫਾਰਮੇਸੀਆਂ ਮਿਲੀਆਂ` :
             `${pharmacies?.length} pharmacies found`}
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="RotateCcw"
            iconPosition="left"
            iconSize={16}
            className="text-muted-foreground hover:text-foreground"
            onClick={() => setIsLoading(true)}
          >
            {currentLanguage === 'hi' ? 'रीफ्रेश' :
             currentLanguage === 'pa'? 'ਰੀਫ੍ਰੈਸ਼' : 'Refresh'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapView;