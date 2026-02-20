import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import AIAssistant from '../../components/ui/AIAssistant';
import ConsultationStatus from '../../components/ui/ConsultationStatus';
import SearchHeader from './components/SearchHeader';
import FilterPanel from './components/FilterPanel';
import PharmacyCard from './components/PharmacyCard';
import MapView from './components/MapView';
import ViewToggle from './components/ViewToggle';
import EmptyState from './components/EmptyState';

const MedicineAvailability = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('current');
  const [filters, setFilters] = useState({
    distance: '5',
    priceRange: 'all',
    availability: 'all',
    is24Hours: false,
    hasDelivery: false,
    acceptsInsurance: false
  });
  const [currentView, setCurrentView] = useState('list');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pharmacies, setPharmacies] = useState([]);

  // Mock pharmacy data
  const mockPharmacies = [
    {
      id: 1,
      name: "A R Chemist",
      address: "Shri Ram medical,Borkhedi",
      distance: 0.8,
      phone: "+91-172-2701234",
      coordinates: { lat: 22.58022, lng: 75.78893 },
      stockStatus: "in-stock",
      deliveryTime: 15,
      rating: 4.5,
      reviewCount: 234,
      is24Hours: true,
      hasDelivery: true,
      acceptsInsurance: true,
      isVerified: true,
      medicineDetails: {
        price: 45,
        originalPrice: 50,
        brand: "GSK"
      }
    },
    {
      id: 2,
      name: "MedPlus Pharmacy",
      address: "Samarth medicose,kalndi vihar colony",
      distance: 1.2,
      phone: "+91-172-2705678",
      coordinates: { lat: 22.57989, lng:75.78913 },
      stockStatus: "low-stock",
      deliveryTime: 20,
      rating: 4.2,
      reviewCount: 156,
      is24Hours: false,
      hasDelivery: true,
      acceptsInsurance: false,
      isVerified: true,
      medicineDetails: {
        price: 42,
        brand: "Generic"
      }
    },
    {
      id: 3,
      name: "Wellness Forever",
      address: "Sector 35, Chandigarh",
      distance: 2.1,
      phone: "+91-172-2709012",
      coordinates: { lat: 30.7156, lng: 76.7672 },
      stockStatus: "in-stock",
      deliveryTime: 25,
      rating: 4.3,
      reviewCount: 89,
      is24Hours: false,
      hasDelivery: false,
      acceptsInsurance: true,
      isVerified: false,
      medicineDetails: {
        price: 48,
        brand: "Cipla"
      }
    },
    {
      id: 4,
      name: "Guardian Pharmacy",
      address: "Phase 3B2, Mohali",
      distance: 3.5,
      phone: "+91-172-2713456",
      coordinates: { lat: 30.7046, lng: 76.7179 },
      stockStatus: "out-of-stock",
      deliveryTime: 30,
      rating: 4.0,
      reviewCount: 67,
      is24Hours: true,
      hasDelivery: true,
      acceptsInsurance: false,
      isVerified: true,
      medicineDetails: {
        price: 0,
        brand: "N/A"
      }
    },
    {
      id: 5,
      name: "LifeCare Pharmacy",
      address: "Sector 8, Panchkula",
      distance: 4.2,
      phone: "+91-172-2717890",
      coordinates: { lat: 30.6942, lng: 76.8606 },
      stockStatus: "in-stock",
      deliveryTime: 35,
      rating: 4.4,
      reviewCount: 123,
      is24Hours: false,
      hasDelivery: true,
      acceptsInsurance: true,
      isVerified: true,
      medicineDetails: {
        price: 46,
        originalPrice: 52,
        brand: "Sun Pharma"
      }
    },
    {
      id: 6,
      name: "Max Healthcare Pharmacy",
      address: "Sector 51, Chandigarh",
      distance: 5.8,
      phone: "+91-172-2721234",
      coordinates: { lat: 30.6789, lng: 76.7345 },
      stockStatus: "low-stock",
      deliveryTime: 40,
      rating: 4.6,
      reviewCount: 298,
      is24Hours: true,
      hasDelivery: true,
      acceptsInsurance: true,
      isVerified: true,
      medicineDetails: {
        price: 49,
        brand: "Dr. Reddy\'s"
      }
    }
  ];

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    // Simulate API call for pharmacy data
    setIsLoading(true);
    setTimeout(() => {
      let filteredPharmacies = [...mockPharmacies];

      // Apply filters
      if (filters?.distance !== 'all') {
        const maxDistance = parseInt(filters?.distance);
        filteredPharmacies = filteredPharmacies?.filter(p => p?.distance <= maxDistance);
      }

      if (filters?.availability !== 'all') {
        filteredPharmacies = filteredPharmacies?.filter(p => p?.stockStatus === filters?.availability);
      }

      if (filters?.is24Hours) {
        filteredPharmacies = filteredPharmacies?.filter(p => p?.is24Hours);
      }

      if (filters?.hasDelivery) {
        filteredPharmacies = filteredPharmacies?.filter(p => p?.hasDelivery);
      }

      if (filters?.acceptsInsurance) {
        filteredPharmacies = filteredPharmacies?.filter(p => p?.acceptsInsurance);
      }

      // Sort by distance
      filteredPharmacies?.sort((a, b) => a?.distance - b?.distance);

      setPharmacies(filteredPharmacies);
      setIsLoading(false);
    }, 1000);
  }, [filters, selectedLocation]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setIsLoading(true);
    
    // Simulate search API call
    setTimeout(() => {
      if (term?.trim()) {
        // Filter pharmacies that might have the searched medicine
        const searchResults = mockPharmacies?.filter(pharmacy => 
          pharmacy?.stockStatus !== 'out-of-stock' || Math.random() > 0.5
        );
        setPharmacies(searchResults);
      } else {
        setPharmacies(mockPharmacies);
      }
      setIsLoading(false);
    }, 800);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handlePharmacySelect = (pharmacy) => {
    setSelectedPharmacy(pharmacy);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setPharmacies(mockPharmacies);
  };

  const getPageTitle = () => {
    switch (currentLanguage) {
      case 'hi':
        return 'दवा उपलब्धता - सहज हेल्थकेयर';
      case 'pa':
        return 'ਦਵਾਈ ਉਪਲਬਧਤਾ - ਸਹਜ ਹੈਲਥਕੇਅਰ';
      default:
        return 'Medicine Availability - Sehaj Healthcare';
    }
  };

  const getPageDescription = () => {
    switch (currentLanguage) {
      case 'hi':
        return 'आस-पास की फार्मेसी में दवाओं की वास्तविक समय उपलब्धता खोजें। तुरंत स्टॉक स्थिति, कीमतें और दिशा-निर्देश प्राप्त करें।';
      case 'pa':
        return 'ਨੇੜੇ ਦੀਆਂ ਫਾਰਮੇਸੀਆਂ ਵਿੱਚ ਦਵਾਈਆਂ ਦੀ ਅਸਲ ਸਮੇਂ ਦੀ ਉਪਲਬਧਤਾ ਖੋਜੋ। ਤੁਰੰਤ ਸਟਾਕ ਸਥਿਤੀ, ਕੀਮਤਾਂ ਅਤੇ ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼ ਪ੍ਰਾਪਤ ਕਰੋ।';
      default:
        return 'Find real-time medicine availability at nearby pharmacies. Get instant stock status, prices, and directions.';
    }
  };

  return (
    <>
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
        <meta name="keywords" content="medicine, pharmacy, availability, stock, healthcare, real-time" />
      </Helmet>
      <div className="min-h-screen relative z-50 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Header />
        <ConsultationStatus />
        
        <main className="container mx-auto px-4 py-6">
          {/* Search Header */}
          <SearchHeader
            onSearch={handleSearch}
            onLocationChange={handleLocationChange}
            onFilterChange={handleFilterChange}
            currentLanguage={currentLanguage}
          />
                <h2 className='font-bold ml-96 mt-24 text-3xl'>Filter by choice</h2>
          {/* Filter Panel */}
          <FilterPanel className='  absolute z-[999] mt-40'
            onFilterChange={handleFilterChange}
            currentLanguage={currentLanguage}
            isOpen={isFilterOpen}
            onToggle={() => setIsFilterOpen(!isFilterOpen)}
          />

          {/* View Toggle */}
          <ViewToggle  className='  absolute'
            currentView={currentView}
            onViewChange={handleViewChange}
            currentLanguage={currentLanguage}
          />

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground font-caption">
                  {currentLanguage === 'hi' ? 'फार्मेसी खोजी जा रही है...' :
                   currentLanguage === 'pa'? 'ਫਾਰਮੇਸੀਆਂ ਖੋਜੀਆਂ ਜਾ ਰਹੀਆਂ ਹਨ...' : 'Searching pharmacies...'}
                </p>
              </div>
            </div>
          )}

          {/* Content */}
          {!isLoading && (
            <>
              {pharmacies?.length === 0 ? (
                <EmptyState
                  searchTerm={searchTerm}
                  onClearSearch={handleClearSearch}
                  currentLanguage={currentLanguage}
                />
              ) : (
                <>
                  {currentView === 'list' ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {pharmacies?.map((pharmacy) => (
                        <PharmacyCard
                          key={pharmacy?.id}
                          pharmacy={pharmacy}
                          currentLanguage={currentLanguage}
                          searchedMedicine={searchTerm}
                        />
                      ))}
                    </div>
                  ) : (
                    <MapView
                      pharmacies={pharmacies}
                      currentLanguage={currentLanguage}
                      selectedPharmacy={selectedPharmacy}
                      onPharmacySelect={handlePharmacySelect}
                    />
                  )}

                  {/* Results Summary */}
                  <div className="mt-8 text-center">
                    <p className="text-sm text-muted-foreground font-caption">
                      {currentLanguage === 'hi' ? 
                        `${pharmacies?.length} फार्मेसी मिली${searchTerm ? ` "${searchTerm}" के लिए` : ''}` :
                       currentLanguage === 'pa' ? 
                        `${pharmacies?.length} ਫਾਰਮੇਸੀਆਂ ਮਿਲੀਆਂ${searchTerm ? ` "${searchTerm}" ਲਈ` : ''}` :
                        `${pharmacies?.length} pharmacies found${searchTerm ? ` for "${searchTerm}"` : ''}`}
                    </p>
                  </div>
                </>
              )}
            </>
          )}
        </main>

        <AIAssistant />
      </div>
    </>
  );
};

export default MedicineAvailability;