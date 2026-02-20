import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SearchHeader = ({ onSearch, onLocationChange, onFilterChange, currentLanguage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('current');
  const [isAnimating, setIsAnimating] = useState(false);

  const locationOptions = [
    { value: 'current', label: currentLanguage === 'hi' ? 'वर्तमान स्थान' : currentLanguage === 'pa' ? 'ਮੌਜੂਦਾ ਸਥਾਨ' : 'Current Location' },
    { value: 'Indore', label: 'Indore' },
    { value: 'mohali', label: 'Mohali' },
    { value: 'Bhopal', label: 'Panchkula' },
    { value: 'ludhiana', label: 'Ludhiana' },
    { value: 'Mhow', label: 'Amritsar' }
  ];

  const handleSearch = () => {
    setIsAnimating(true);
    onSearch(searchTerm);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleSearch();
    }
  };

  const getPlaceholderText = () => {
    switch (currentLanguage) {
      case 'hi':
        return 'दवा का नाम खोजें...';
      case 'pa':
        return 'ਦਵਾਈ ਦਾ ਨਾਮ ਖੋਜੋ...';
      default:
        return 'Search medicine name...';
    }
  };

  const getSearchButtonText = () => {
    switch (currentLanguage) {
      case 'hi':
        return 'खोजें';
      case 'pa':
        return 'ਖੋਜੋ';
      default:
        return 'Search';
    }
  };

  return (
    <div className="glass-card border border-white/20 rounded-xl p-6 mb-6  ">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Medicine Search */}
        <div className="flex-1">
          <div className="relative">
            <Input
              type="text"
              placeholder={getPlaceholderText()}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              onKeyPress={handleKeyPress}
              className="pr-12"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Icon 
                name="Search" 
                size={20} 
                className={`text-muted-foreground transition-transform duration-300 ${
                  isAnimating ? 'animate-bounce' : ''
                }`} 
              />
            </div>
          </div>
        </div>

        {/* Location Filter */}
        <div className="w-full lg:w-64 z-[99999]">
          <Select
            options={locationOptions}
            value={selectedLocation}
            onChange={(value) => {
              setSelectedLocation(value);
              onLocationChange(value);
            }}
            placeholder={currentLanguage === 'hi' ? 'स्थान चुनें' : currentLanguage === 'pa' ? 'ਸਥਾਨ ਚੁਣੋ' : 'Select Location'}
          />
        </div>

        {/* Search Button */}
        <Button
          variant="default"
          onClick={handleSearch}
          disabled={!searchTerm?.trim()}
          iconName="Search"
          iconPosition="left"
          iconSize={18}
          className="lg:w-auto"
        >
          {getSearchButtonText()}
        </Button>
      </div>
      {/* Quick Search Pills */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground font-caption">
          {currentLanguage === 'hi' ? 'लोकप्रिय खोजें:' : currentLanguage === 'pa' ? 'ਪ੍ਰਸਿੱਧ ਖੋਜਾਂ:' : 'Popular searches:'}
        </span>
        {['Paracetamol', 'Crocin', 'Dolo 650', 'Azithromycin', 'Omeprazole']?.map((medicine) => (
          <Button
            key={medicine}
            variant="ghost"
            size="sm"
            onClick={() => {
              setSearchTerm(medicine);
              onSearch(medicine);
            }}
            className="text-xs px-3 py-1 h-7 bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground rounded-full"
          >
            {medicine}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SearchHeader;