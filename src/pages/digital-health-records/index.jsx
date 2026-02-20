import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import AIAssistant from '../../components/ui/AIAssistant';
import ConsultationStatus from '../../components/ui/ConsultationStatus';
import RecordTabs from './components/RecordTabs';
import SearchAndFilter from './components/SearchAndFilter';
import PrescriptionCard from './components/PrescriptionCard';
import LabReportCard from './components/LabReportCard';
import ConsultationTimeline from './components/ConsultationTimeline';
import VaccinationCard from './components/VaccinationCard';
import DocumentUpload from './components/DocumentUpload';
import CloudSyncStatus from './components/CloudSyncStatus';
import ExportOptions from './components/ExportOptions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const DigitalHealthRecords = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('prescriptions');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ dateRange: 'all', sortBy: 'date-desc' });
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [showUpload, setShowUpload] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock data for prescriptions
  const prescriptions = [
    {
      id: 1,
      medicineName: "Paracetamol 500mg",
      type: "Tablet",
      dosage: "500mg",
      frequency: "3 times daily",
      duration: "7 days",
      prescribedDate: "2024-09-25",
      doctorName: "Sarah Wilson",
      refillStatus: "available"
    },
    {
      id: 2,
      medicineName: "Amoxicillin 250mg",
      type: "Capsule",
      dosage: "250mg",
      frequency: "2 times daily",
      duration: "10 days",
      prescribedDate: "2024-09-20",
      doctorName: "Michael Chen",
      refillStatus: "low"
    },
    {
      id: 3,
      medicineName: "Cough Syrup",
      type: "Syrup",
      dosage: "10ml",
      frequency: "3 times daily",
      duration: "5 days",
      prescribedDate: "2024-09-15",
      doctorName: "Emily Rodriguez",
      refillStatus: "out"
    }
  ];

  // Mock data for lab reports
  const labReports = [
    {
      id: 1,
      testName: "Complete Blood Count (CBC)",
      category: "Hematology",
      testDate: "2024-09-22",
      labName: "City Diagnostics Lab",
      results: [
        {
          parameter: "Hemoglobin",
          value: "14.2",
          unit: "g/dL",
          referenceRange: "12.0-15.5",
          trend: "stable"
        },
        {
          parameter: "White Blood Cells",
          value: "8.5",
          unit: "×10³/μL",
          referenceRange: "4.0-11.0",
          trend: "up"
        },
        {
          parameter: "Platelets",
          value: "250",
          unit: "×10³/μL",
          referenceRange: "150-450",
          trend: "down"
        }
      ],
      doctorNotes: "All values within normal range. Continue current medication."
    },
    {
      id: 2,
      testName: "Lipid Profile",
      category: "Biochemistry",
      testDate: "2024-09-18",
      labName: "Metro Health Labs",
      results: [
        {
          parameter: "Total Cholesterol",
          value: "195",
          unit: "mg/dL",
          referenceRange: "150-200",
          trend: "stable"
        },
        {
          parameter: "HDL Cholesterol",
          value: "45",
          unit: "mg/dL",
          referenceRange: "40-60",
          trend: "up"
        }
      ],
      doctorNotes: "Cholesterol levels are improving. Continue with diet modifications."
    }
  ];

  // Mock data for consultations
  const consultations = [
    {
      id: 1,
      doctorName: "Sarah Wilson",
      specialty: "General Medicine",
      type: "Video",
      date: "2024-09-25",
      time: "10:30 AM",
      duration: 30,
      chiefComplaint: "Fever and headache for 3 days",
      diagnosis: "Viral fever with associated symptoms",
      treatmentPlan: "Prescribed paracetamol for fever management, adequate rest and hydration. Monitor symptoms for 48 hours.",
      followUp: "Follow up in 1 week if symptoms persist",
      medicinesCount: 2
    },
    {
      id: 2,
      doctorName: "Michael Chen",
      specialty: "Internal Medicine",
      type: "In-Person",
      date: "2024-09-20",
      time: "2:15 PM",
      duration: 45,
      chiefComplaint: "Persistent cough and throat irritation",
      diagnosis: "Upper respiratory tract infection",
      treatmentPlan: "Antibiotic course prescribed along with cough suppressant. Steam inhalation recommended twice daily.",
      followUp: "Review after completing antibiotic course",
      medicinesCount: 3
    }
  ];

  // Mock data for vaccinations
  const vaccinations = [
    {
      id: 1,
      vaccineName: "COVID-19 Booster",
      manufacturer: "Pfizer-BioNTech",
      batchNumber: "FF2345",
      status: "Completed",
      currentDose: 3,
      totalDoses: 3,
      lastDoseDate: "2024-08-15",
      nextDueDate: null,
      administeredBy: "City Health Center",
      sideEffects: "Mild soreness at injection site for 24 hours"
    },
    {
      id: 2,
      vaccineName: "Influenza Vaccine",
      manufacturer: "Sanofi Pasteur",
      batchNumber: "FLU2024",
      status: "Due",
      currentDose: 0,
      totalDoses: 1,
      lastDoseDate: null,
      nextDueDate: "2024-10-15",
      administeredBy: "Metro Vaccination Center",
      sideEffects: null
    }
  ];

  const recordCounts = {
    prescriptions: prescriptions?.length,
    labReports: labReports?.length,
    consultations: consultations?.length,
    vaccinations: vaccinations?.length
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleDocumentUpload = (file) => {
    console.log('Document uploaded:', file);
  };

  const handleExport = (exportData) => {
    console.log('Exporting data:', exportData);
  };

  const getTabContent = () => {
    switch (activeTab) {
      case 'prescriptions':
        return (
          <div className="space-y-4">
            {prescriptions?.map((prescription) => (
              <PrescriptionCard key={prescription?.id} prescription={prescription} />
            ))}
          </div>
        );
      case 'lab-reports':
        return (
          <div className="space-y-4">
            {labReports?.map((report) => (
              <LabReportCard key={report?.id} report={report} />
            ))}
          </div>
        );
      case 'consultation-notes':
        return <ConsultationTimeline consultations={consultations} />;
      case 'vaccinations':
        return (
          <div className="space-y-4">
            {vaccinations?.map((vaccination) => (
              <VaccinationCard key={vaccination?.id} vaccination={vaccination} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const getEmptyState = () => {
    const emptyStates = {
      prescriptions: {
        icon: 'Pill',
        title: 'No Prescriptions Found',
        description: 'Your prescription history will appear here after consultations.'
      },
      'lab-reports': {
        icon: 'FileText',
        title: 'No Lab Reports Found',
        description: 'Upload or sync your lab reports to view them here.'
      },
      'consultation-notes': {
        icon: 'MessageSquare',
        title: 'No Consultations Found',
        description: 'Your consultation history will appear here after appointments.'
      },
      vaccinations: {
        icon: 'Shield',
        title: 'No Vaccination Records Found',
        description: 'Add your vaccination records to track your immunization status.'
      }
    };

    const state = emptyStates?.[activeTab];
    
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto rounded-full bg-muted/20 flex items-center justify-center mb-4">
          <Icon name={state?.icon} size={32} className="text-muted-foreground" />
        </div>
        <h3 className="font-heading font-semibold text-foreground mb-2">
          {state?.title}
        </h3>
        <p className="text-muted-foreground font-caption mb-6 max-w-md mx-auto">
          {state?.description}
        </p>
        <Button
          variant="outline"
          onClick={() => setShowUpload(true)}
          iconName="Upload"
          iconPosition="left"
          iconSize={16}
        >
          Upload Documents
        </Button>
      </div>
    );
  };

  const hasData = () => {
    switch (activeTab) {
      case 'prescriptions':
        return prescriptions?.length > 0;
      case 'lab-reports':
        return labReports?.length > 0;
      case 'consultation-notes':
        return consultations?.length > 0;
      case 'vaccinations':
        return vaccinations?.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ConsultationStatus />
      
      <main className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-2">
                Digital Health Records
              </h1>
              <p className="text-muted-foreground font-caption">
                Access and manage your complete medical history offline and online
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <CloudSyncStatus />
              <ExportOptions onExport={handleExport} />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowUpload(!showUpload)}
                iconName="Upload"
                iconPosition="left"
                iconSize={16}
              >
                Upload
              </Button>
            </div>
          </div>
        </div>

        {/* Document Upload Section */}
        {showUpload && (
          <div className="mb-6">
            <div className="glass-card border border-white/20 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading font-semibold text-foreground">
                  Upload Medical Documents
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowUpload(false)}
                  iconName="X"
                  iconSize={16}
                  className="text-muted-foreground hover:text-foreground"
                />
              </div>
              <DocumentUpload onUpload={handleDocumentUpload} />
            </div>
          </div>
        )}

        {/* Tabs Navigation */}
        <div className="mb-6">
          <RecordTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            recordCounts={recordCounts}
          />
        </div>

        {/* Search and Filter */}
        {hasData() && (
          <SearchAndFilter
            onSearch={handleSearch}
            onFilter={handleFilter}
            activeTab={activeTab}
          />
        )}

        {/* Content Area */}
        <div className="min-h-[400px]">
          {hasData() ? getTabContent() : getEmptyState()}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 glass-card border border-white/20 rounded-lg p-4">
          <h3 className="font-heading font-semibold text-foreground mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/appointment-booking')}
              iconName="Calendar"
              iconPosition="left"
              iconSize={16}
              className="justify-start"
            >
              Book Appointment
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/medicine-availability')}
              iconName="Pill"
              iconPosition="left"
              iconSize={16}
              className="justify-start"
            >
              Find Medicine
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/video-consultation')}
              iconName="Video"
              iconPosition="left"
              iconSize={16}
              className="justify-start"
            >
              Start Consultation
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/patient-dashboard')}
              iconName="LayoutDashboard"
              iconPosition="left"
              iconSize={16}
              className="justify-start"
            >
              Dashboard
            </Button>
          </div>
        </div>
      </main>

      <AIAssistant />
    </div>
  );
};

export default DigitalHealthRecords;