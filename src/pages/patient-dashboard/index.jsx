import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import AIAssistant from '../../components/ui/AIAssistant';
import ConsultationStatus from '../../components/ui/ConsultationStatus';
import WelcomeCard from './components/WelcomeCard';
import VitalsWidget from './components/VitalsWidget';
import PrescriptionHistory from './components/PrescriptionHistory';
import ConsultationHistory from './components/ConsultationHistory';
import QuickActions from './components/QuickActions';

const PatientDashboard = () => {
  useEffect(() => {
    // Auto-refresh data every 5 minutes
    const refreshInterval = setInterval(() => {
      console.log('Refreshing dashboard data...');
      // This would typically trigger data refresh from API
    }, 5 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Patient Dashboard -Jeevani</title>
        <meta name="description" content="Manage your health with personalized dashboard, appointment tracking, vitals monitoring, and prescription management." />
      </Helmet>

      <Header />
      <ConsultationStatus />

      <main className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <WelcomeCard />
            <VitalsWidget />
            <PrescriptionHistory />
          </div>

          {/* Right Column - Secondary Content */}
          <div className="lg:col-span-1 space-y-6">
            <QuickActions />
            <ConsultationHistory />
          </div>
        </div>
      </main>

      <AIAssistant />
    </div>
  );
};

export default PatientDashboard;