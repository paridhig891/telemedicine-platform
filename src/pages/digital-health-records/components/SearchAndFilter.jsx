import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SearchAndFilter = ({ onSearch, onFilter, activeTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'last-week', label: 'Last Week' },
    { value: 'last-month', label: 'Last Month' },
    { value: 'last-3-months', label: 'Last 3 Months' },
    { value: 'last-year', label: 'Last Year' }
  ];

  const getSortOptions = () => {
    switch (activeTab) {
      case 'prescriptions':
        return [
          { value: 'date-desc', label: 'Newest First' },
          { value: 'date-asc', label: 'Oldest First' },
          { value: 'medicine-name', label: 'Medicine Name' },
          { value: 'doctor-name', label: 'Doctor Name' }
        ];
      case 'lab-reports':
        return [
          { value: 'date-desc', label: 'Newest First' },
          { value: 'date-asc', label: 'Oldest First' },
          { value: 'test-name', label: 'Test Name' },
          { value: 'lab-name', label: 'Lab Name' }
        ];
      case 'consultation-notes':
        return [
          { value: 'date-desc', label: 'Newest First' },
          { value: 'date-asc', label: 'Oldest First' },
          { value: 'doctor-name', label: 'Doctor Name' },
          { value: 'specialty', label: 'Specialty' }
        ];
      case 'vaccinations':
        return [
          { value: 'date-desc', label: 'Newest First' },
          { value: 'date-asc', label: 'Oldest First' },
          { value: 'vaccine-name', label: 'Vaccine Name' },
          { value: 'status', label: 'Status' }
        ];
      default:
        return [
          { value: 'date-desc', label: 'Newest First' },
          { value: 'date-asc', label: 'Oldest First' }
        ];
    }
  };

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleDateRangeChange = (value) => {
    setDateRange(value);
    onFilter({ dateRange: value, sortBy });
  };

  const handleSortChange = (value) => {
    setSortBy(value);
    onFilter({ dateRange, sortBy: value });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setDateRange('all');
    setSortBy('date-desc');
    onSearch('');
    onFilter({ dateRange: 'all', sortBy: 'date-desc' });
  };

  return (
    <div className="glass-card border border-white/20 rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Search Input */}
        <div className="flex-1 lg:max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={16} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="search"
              placeholder={`Search ${activeTab?.replace('-', ' ')}...`}
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <Select
            options={dateRangeOptions}
            value={dateRange}
            onChange={handleDateRangeChange}
            placeholder="Date Range"
            className="w-full sm:w-40"
          />
          
          <Select
            options={getSortOptions()}
            value={sortBy}
            onChange={handleSortChange}
            placeholder="Sort By"
            className="w-full sm:w-40"
          />

          {(searchQuery || dateRange !== 'all' || sortBy !== 'date-desc') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={14}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      {/* Active Filters Display */}
      {(searchQuery || dateRange !== 'all' || sortBy !== 'date-desc') && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Filter" size={12} />
            <span>Active filters:</span>
            {searchQuery && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
                "{searchQuery}"
              </span>
            )}
            {dateRange !== 'all' && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
                {dateRangeOptions?.find(opt => opt?.value === dateRange)?.label}
              </span>
            )}
            {sortBy !== 'date-desc' && (
              <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
                {getSortOptions()?.find(opt => opt?.value === sortBy)?.label}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;