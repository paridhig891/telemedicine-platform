import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const ExportOptions = ({ onExport }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [dateRange, setDateRange] = useState('all');
  const [selectedSections, setSelectedSections] = useState({
    prescriptions: true,
    labReports: true,
    consultations: true,
    vaccinations: true
  });
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: 'pdf', label: 'PDF Document' },
    { value: 'csv', label: 'CSV Spreadsheet' },
    { value: 'json', label: 'JSON Data' }
  ];

  const dateRangeOptions = [
    { value: 'all', label: 'All Records' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'last-3-months', label: 'Last 3 Months' },
    { value: 'last-6-months', label: 'Last 6 Months' },
    { value: 'last-year', label: 'Last Year' }
  ];

  const handleSectionChange = (section, checked) => {
    setSelectedSections(prev => ({
      ...prev,
      [section]: checked
    }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    const exportData = {
      format: exportFormat,
      dateRange,
      sections: selectedSections,
      timestamp: new Date()?.toISOString()
    };

    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      setIsOpen(false);
      onExport && onExport(exportData);
      
      // Show success message (in real app, this would trigger a download)
      console.log('Export completed:', exportData);
    }, 2000);
  };

  const getSelectedSectionsCount = () => {
    return Object.values(selectedSections)?.filter(Boolean)?.length;
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        iconName="Download"
        iconPosition="left"
        iconSize={16}
        className="text-muted-foreground hover:text-foreground"
      >
        Export Records
      </Button>
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 glass-card border border-white/20 rounded-lg shadow-medical-lg z-200">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-foreground">
                Export Health Records
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                iconName="X"
                iconSize={16}
                className="w-8 h-8 p-0 text-muted-foreground hover:text-foreground"
              />
            </div>

            <div className="space-y-4">
              {/* Export Format */}
              <div>
                <Select
                  label="Export Format"
                  options={formatOptions}
                  value={exportFormat}
                  onChange={setExportFormat}
                />
              </div>

              {/* Date Range */}
              <div>
                <Select
                  label="Date Range"
                  options={dateRangeOptions}
                  value={dateRange}
                  onChange={setDateRange}
                />
              </div>

              {/* Sections to Include */}
              <div>
                <label className="text-sm font-caption font-medium text-foreground mb-3 block">
                  Include Sections ({getSelectedSectionsCount()}/4)
                </label>
                <div className="space-y-2">
                  <Checkbox
                    label="Prescriptions"
                    checked={selectedSections?.prescriptions}
                    onChange={(e) => handleSectionChange('prescriptions', e?.target?.checked)}
                  />
                  <Checkbox
                    label="Lab Reports"
                    checked={selectedSections?.labReports}
                    onChange={(e) => handleSectionChange('labReports', e?.target?.checked)}
                  />
                  <Checkbox
                    label="Consultation Notes"
                    checked={selectedSections?.consultations}
                    onChange={(e) => handleSectionChange('consultations', e?.target?.checked)}
                  />
                  <Checkbox
                    label="Vaccination Records"
                    checked={selectedSections?.vaccinations}
                    onChange={(e) => handleSectionChange('vaccinations', e?.target?.checked)}
                  />
                </div>
              </div>

              {/* Export Summary */}
              <div className="p-3 bg-muted/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="Info" size={14} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-xs font-caption font-medium text-foreground mb-1">
                      Export Summary
                    </p>
                    <p className="text-xs text-muted-foreground font-caption">
                      {getSelectedSectionsCount()} sections • {dateRangeOptions?.find(opt => opt?.value === dateRange)?.label} • {formatOptions?.find(opt => opt?.value === exportFormat)?.label}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="flex-1"
                  disabled={isExporting}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleExport}
                  disabled={getSelectedSectionsCount() === 0 || isExporting}
                  loading={isExporting}
                  iconName="Download"
                  iconPosition="left"
                  iconSize={14}
                  className="flex-1"
                >
                  {isExporting ? 'Exporting...' : 'Export'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportOptions;