'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { TriageWizard } from '@/components/triage-wizard/triage-wizard';
import { Footer } from '@/components/footer';
import { ArrowLeft, ShieldCheck, PhoneCall, AlertTriangle } from 'lucide-react';

export default function StandaloneTriagePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <div className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        {/* Top Breadcrumb & Status */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0D9488] hover:text-[#0f766e] bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Doctor Profile & Chamber Schedule</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-xl">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified Clinical Triage Protocol Active</span>
          </div>
        </div>

        {/* Triage Wizard Component */}
        <TriageWizard isStandalone={true} />
      </div>

      <Footer />
    </div>
  );
}
