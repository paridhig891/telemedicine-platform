import React from 'react';

import Button from '../../../components/ui/Button';

const ViewToggle = ({ currentView, onViewChange, currentLanguage }) => {
  const getLabels = () => {
    switch (currentLanguage) {
      case 'hi':
        return {
          listView: 'सूची दृश्य',
          mapView: 'मैप दृश्य'
        };
      case 'pa':
        return {
          listView: 'ਸੂਚੀ ਦ੍ਰਿਸ਼',
          mapView: 'ਨਕਸ਼ਾ ਦ੍ਰਿਸ਼'
        };
      default:
        return {
          listView: 'List View',
          mapView: 'Map View'
        };
    }
  };

  const labels = getLabels();

  return (
    <div className="flex items-center justify-center mb-6">
      <div className="glass-card border border-white/20 rounded-lg p-1 flex">
        <Button
          variant={currentView === 'list' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewChange('list')}
          iconName="List"
          iconPosition="left"
          iconSize={16}
          className={`transition-all duration-200 ${
            currentView === 'list' ?'bg-primary text-primary-foreground shadow-medical-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          {labels?.listView}
        </Button>
        <Button
          variant={currentView === 'map' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewChange('map')}
          iconName="Map"
          iconPosition="left"
          iconSize={16}
          className={`transition-all duration-200 ${
            currentView === 'map' ?'bg-primary text-primary-foreground shadow-medical-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          {labels?.mapView}
        </Button>
      </div>
    </div>
  );
};

export default ViewToggle;