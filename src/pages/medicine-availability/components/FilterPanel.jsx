import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ onFilterChange, currentLanguage, isOpen, onToggle }) => {
  const [filters, setFilters] = useState({
    distance: '5',
    priceRange: 'all',
    availability: 'all',
    is24Hours: false,
    hasDelivery: false,
    acceptsInsurance: false
  });

  const distanceOptions = [
    { value: '1', label: currentLanguage === 'hi' ? '1 किमी के भीतर' : currentLanguage === 'pa' ? '1 ਕਿਮੀ ਦੇ ਅੰਦਰ' : 'Within 1 km' },
    { value: '5', label: currentLanguage === 'hi' ? '5 किमी के भीतर' : currentLanguage === 'pa' ? '5 ਕਿਮੀ ਦੇ ਅੰਦਰ' : 'Within 5 km' },
    { value: '10', label: currentLanguage === 'hi' ? '10 किमी के भीतर' : currentLanguage === 'pa' ? '10 ਕਿਮੀ ਦੇ ਅੰਦਰ' : 'Within 10 km' },
    { value: '25', label: currentLanguage === 'hi' ? '25 किमी के भीतर' : currentLanguage === 'pa' ? '25 ਕਿਮੀ ਦੇ ਅੰਦਰ' : 'Within 25 km' }
  ];

  const priceRangeOptions = [
    { value: 'all', label: currentLanguage === 'hi' ? 'सभी कीमतें' : currentLanguage === 'pa' ? 'ਸਾਰੀਆਂ ਕੀਮਤਾਂ' : 'All Prices' },
    { value: 'low', label: currentLanguage === 'hi' ? '₹0 - ₹100' : currentLanguage === 'pa' ? '₹0 - ₹100' : '₹0 - ₹100' },
    { value: 'medium', label: currentLanguage === 'hi' ? '₹100 - ₹500' : currentLanguage === 'pa' ? '₹100 - ₹500' : '₹100 - ₹500' },
    { value: 'high', label: currentLanguage === 'hi' ? '₹500+' : currentLanguage === 'pa' ? '₹500+' : '₹500+' }
  ];

  const availabilityOptions = [
    { value: 'all', label: currentLanguage === 'hi' ? 'सभी स्टॉक' : currentLanguage === 'pa' ? 'ਸਾਰਾ ਸਟਾਕ' : 'All Stock' },
    { value: 'in-stock', label: currentLanguage === 'hi' ? 'स्टॉक में' : currentLanguage === 'pa' ? 'ਸਟਾਕ ਵਿੱਚ' : 'In Stock' },
    { value: 'low-stock', label: currentLanguage === 'hi' ? 'कम स्टॉक' : currentLanguage === 'pa' ? 'ਘੱਟ ਸਟਾਕ' : 'Low Stock' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    const defaultFilters = {
      distance: '5',
      priceRange: 'all',
      availability: 'all',
      is24Hours: false,
      hasDelivery: false,
      acceptsInsurance: false
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const getFilterLabels = () => {
    switch (currentLanguage) {
      case 'hi':
        return {
          distance: 'दूरी',
          priceRange: 'कीमत सीमा',
          availability: 'उपलब्धता',
          is24Hours: '24 घंटे खुला',
          hasDelivery: 'होम डिलीवरी',
          acceptsInsurance: 'बीमा स्वीकार करता है',
          clearAll: 'सभी साफ़ करें',
          filters: 'फिल्टर'
        };
      case 'pa':
        return {
          distance: 'ਦੂਰੀ',
          priceRange: 'ਕੀਮਤ ਸੀਮਾ',
          availability: 'ਉਪਲਬਧਤਾ',
          is24Hours: '24 ਘੰਟੇ ਖੁੱਲ੍ਹਾ',
          hasDelivery: 'ਘਰ ਡਿਲੀਵਰੀ',
          acceptsInsurance: 'ਬੀਮਾ ਸਵੀਕਾਰ ਕਰਦਾ ਹੈ',
          clearAll: 'ਸਭ ਸਾਫ਼ ਕਰੋ',
          filters: 'ਫਿਲਟਰ'
        };
      default:
        return {
          distance: 'Distance',
          priceRange: 'Price Range',
          availability: 'Availability',
          is24Hours: '24 Hours Open',
          hasDelivery: 'Home Delivery',
          acceptsInsurance: 'Accepts Insurance',
          clearAll: 'Clear All',
          filters: 'Filters'
        };
    }
  };

  const labels = getFilterLabels();

  return (
    <div className={`glass-card border border-white/20 rounded-xl transition-all  duration-300   ${
      isOpen ? 'p-6 mb-6  ' : 'p-4 mb-4'
    }`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4 ">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="font-heading font-semibold text-foreground">
            {labels?.filters}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            {labels?.clearAll}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            iconName={isOpen ? "ChevronUp" : "ChevronDown"}
            iconSize={16}
            className="text-muted-foreground hover:text-foreground lg:hidden"
          />
        </div>
      </div>
      {/* Filter Content */}
      <div className={`${isOpen ? 'block' : 'hidden lg:block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Distance Filter */}
          <div>
            <Select
              label={labels?.distance}
              options={distanceOptions}
              value={filters?.distance}
              onChange={(value) => handleFilterChange('distance', value)}
            />
          </div>

          {/* Price Range Filter */}
          <div>
            <Select
              label={labels?.priceRange}
              options={priceRangeOptions}
              value={filters?.priceRange}
              onChange={(value) => handleFilterChange('priceRange', value)}
            />
          </div>

          {/* Availability Filter */}
          <div>
            <Select
              label={labels?.availability}
              options={availabilityOptions}
              value={filters?.availability}
              onChange={(value) => handleFilterChange('availability', value)}
            />
          </div>
        </div>

        {/* Checkbox Filters */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Checkbox
            label={labels?.is24Hours}
            checked={filters?.is24Hours}
            onChange={(e) => handleFilterChange('is24Hours', e?.target?.checked)}
          />
          <Checkbox
            label={labels?.hasDelivery}
            checked={filters?.hasDelivery}
            onChange={(e) => handleFilterChange('hasDelivery', e?.target?.checked)}
          />
          <Checkbox
            label={labels?.acceptsInsurance}
            checked={filters?.acceptsInsurance}
            onChange={(e) => handleFilterChange('acceptsInsurance', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;