import React from 'react';
import Icon from '../../../components/AppIcon';

const RecordTabs = ({ activeTab, onTabChange, recordCounts }) => {
  const tabs = [
    {
      id: 'prescriptions',
      label: 'Prescriptions',
      icon: 'Pill',
      count: recordCounts?.prescriptions
    },
    {
      id: 'lab-reports',
      label: 'Lab Reports',
      icon: 'FileText',
      count: recordCounts?.labReports
    },
    {
      id: 'consultation-notes',
      label: 'Consultations',
      icon: 'MessageSquare',
      count: recordCounts?.consultations
    },
    {
      id: 'vaccinations',
      label: 'Vaccinations',
      icon: 'Shield',
      count: recordCounts?.vaccinations
    }
  ];

  return (
    <div className="flex space-x-1 bg-muted/30 p-1 rounded-lg">
      {tabs?.map((tab) => (
        <button
          key={tab?.id}
          onClick={() => onTabChange(tab?.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-caption transition-all duration-200 flex-1 justify-center ${
            activeTab === tab?.id
              ? 'bg-primary text-primary-foreground shadow-medical-sm'
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <Icon name={tab?.icon} size={16} />
          <span className="hidden sm:inline">{tab?.label}</span>
          <span className="sm:hidden">{tab?.label?.split(' ')?.[0]}</span>
          {tab?.count > 0 && (
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              activeTab === tab?.id
                ? 'bg-primary-foreground/20 text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              {tab?.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default RecordTabs;