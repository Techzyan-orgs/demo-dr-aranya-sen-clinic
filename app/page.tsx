'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { LiveOpdGrid } from '@/components/live-opd-grid';
import { TriageWizard } from '@/components/triage-wizard/triage-wizard';
import { CredentialsSection } from '@/components/credentials-section';
import { PatientResources } from '@/components/patient-resources';
import { Footer } from '@/components/footer';

export default function HomePage() {
  const [selectedChamberId, setSelectedChamberId] = useState<string>('apollo-gleneagles');

  const handleSelectChamber = (chamberId: string) => {
    setSelectedChamberId(chamberId);
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Navigation */}
      <Navbar />

      {/* Hero & Authority Section */}
      <Hero />

      {/* Live OPD Chambers Grid with real-time status */}
      <LiveOpdGrid onSelectChamber={handleSelectChamber} />

      {/* 3-Step Interactive Neurological Triage Booking Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <TriageWizard initialChamberId={selectedChamberId} />
      </section>

      {/* Sub-Specialties, Research, Diagnostic Suite */}
      <CredentialsSection />

      {/* Patient Resources & FAQ */}
      <PatientResources />

      {/* Footer & Emergency Disclaimers */}
      <Footer />
    </main>
  );
}
