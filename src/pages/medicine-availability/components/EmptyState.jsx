import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ searchTerm, onClearSearch, currentLanguage }) => {
  const getEmptyStateContent = () => {
    switch (currentLanguage) {
      case 'hi':
        return {
          title: searchTerm ? 'कोई फार्मेसी नहीं मिली' : 'दवा खोजना शुरू करें',
          subtitle: searchTerm 
            ? `"${searchTerm}" के लिए कोई परिणाम नहीं मिला। कृपया अपनी खोज बदलें या फिल्टर समायोजित करें।`
            : 'अपनी आवश्यक दवा का नाम दर्ज करें और आस-पास की फार्मेसी खोजें।',
          suggestions: [
            'वर्तनी की जांच करें',
            'अधिक सामान्य शब्दों का उपयोग करें',
            'फिल्टर हटाएं',
            'खोज क्षेत्र बढ़ाएं'
          ],
          clearSearch: 'खोज साफ़ करें',
          startSearching: 'खोजना शुरू करें'
        };
      case 'pa':
        return {
          title: searchTerm ? 'ਕੋਈ ਫਾਰਮੇਸੀ ਨਹੀਂ ਮਿਲੀ' : 'ਦਵਾਈ ਖੋਜਣਾ ਸ਼ੁਰੂ ਕਰੋ',
          subtitle: searchTerm 
            ? `"${searchTerm}" ਲਈ ਕੋਈ ਨਤੀਜਾ ਨਹੀਂ ਮਿਲਿਆ। ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਖੋਜ ਬਦਲੋ ਜਾਂ ਫਿਲਟਰ ਸੰਸ਼ੋਧਿਤ ਕਰੋ।`
            : 'ਆਪਣੀ ਲੋੜੀਂਦੀ ਦਵਾਈ ਦਾ ਨਾਮ ਦਰਜ ਕਰੋ ਅਤੇ ਨੇੜੇ ਦੀਆਂ ਫਾਰਮੇਸੀਆਂ ਖੋਜੋ।',
          suggestions: [
            'ਸਪੈਲਿੰਗ ਦੀ ਜਾਂਚ ਕਰੋ',
            'ਵਧੇਰੇ ਆਮ ਸ਼ਬਦਾਂ ਦਾ ਉਪਯੋਗ ਕਰੋ',
            'ਫਿਲਟਰ ਹਟਾਓ',
            'ਖੋਜ ਖੇਤਰ ਵਧਾਓ'
          ],
          clearSearch: 'ਖੋਜ ਸਾਫ਼ ਕਰੋ',
          startSearching: 'ਖੋਜਣਾ ਸ਼ੁਰੂ ਕਰੋ'
        };
      default:
        return {
          title: searchTerm ? 'No Pharmacies Found' : 'Start Searching for Medicine',
          subtitle: searchTerm 
            ? `No results found for "${searchTerm}". Please try modifying your search or adjusting filters.`
            : 'Enter the name of the medicine you need and find nearby pharmacies.',
          suggestions: [
            'Check spelling',
            'Use more general terms',
            'Remove filters',
            'Expand search area'
          ],
          clearSearch: 'Clear Search',
          startSearching: 'Start Searching'
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/20 flex items-center justify-center">
          <Icon 
            name={searchTerm ? "SearchX" : "Search"} 
            size={40} 
            className="text-muted-foreground" 
          />
        </div>

        {/* Title */}
        <h3 className="font-heading font-semibold text-xl text-foreground mb-3">
          {content?.title}
        </h3>

        {/* Subtitle */}
        <p className="text-muted-foreground font-caption mb-6 leading-relaxed">
          {content?.subtitle}
        </p>

        {/* Suggestions */}
        {searchTerm && (
          <div className="mb-6">
            <p className="text-sm font-caption font-medium text-foreground mb-3">
              {currentLanguage === 'hi' ? 'सुझाव:' : 
               currentLanguage === 'pa'? 'ਸੁਝਾਅ:' : 'Suggestions:'}
            </p>
            <ul className="text-sm text-muted-foreground space-y-2">
              {content?.suggestions?.map((suggestion, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <Icon name="ChevronRight" size={12} className="text-primary" />
                  <span className="font-caption">{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Button */}
        <div className="space-y-3">
          {searchTerm ? (
            <Button
              variant="outline"
              onClick={onClearSearch}
              iconName="X"
              iconPosition="left"
              iconSize={16}
            >
              {content?.clearSearch}
            </Button>
          ) : (
            <Button
              variant="default"
              iconName="Search"
              iconPosition="left"
              iconSize={16}
              disabled
            >
              {content?.startSearching}
            </Button>
          )}
        </div>

        {/* Popular Medicines */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-sm font-caption font-medium text-foreground mb-3">
            {currentLanguage === 'hi' ? 'लोकप्रिय दवाएं:' :
             currentLanguage === 'pa'? 'ਪ੍ਰਸਿੱਧ ਦਵਾਈਆਂ:' : 'Popular medicines:'}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {['Paracetamol', 'Crocin', 'Dolo 650', 'Azithromycin']?.map((medicine) => (
              <Button
                key={medicine}
                variant="ghost"
                size="sm"
                className="text-xs px-3 py-1 h-7 bg-muted/30 hover:bg-muted text-muted-foreground hover:text-foreground rounded-full"
              >
                {medicine}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;