'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Activity, Phone, Clock, AlertTriangle, ShieldCheck, Menu, X, ChevronRight } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#0B132B]/95 backdrop-blur-md border-b border-[#3A506B]/40 text-white transition-all shadow-md">
      {/* Top Clinical Alert Bar */}
      <div className="bg-[#1C2541] border-b border-[#3A506B]/30 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/30">
              <AlertTriangle className="w-3 h-3 mr-1" /> EMERGENCY
            </span>
            <span>Acute Stroke or Thunderclap Headache? Call <strong>108</strong> or Stroke Rapid Unit: <strong>+91 98300 99911</strong></span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-slate-300">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488]" /> WBMC Reg: 62419
            </span>
            <span className="flex items-center gap-1 text-[#5BC0BE]">
              <Clock className="w-3.5 h-3.5" /> OPD Mon-Sat
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#0D9488] rounded-lg flex items-center justify-center text-white shadow-sm group-hover:bg-[#0B7A6E] transition-colors">
              <Activity className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base sm:text-lg tracking-tight leading-none uppercase text-white font-heading">
                  Dr. Aranya Sen
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold bg-[#0D9488]/20 text-[#5BC0BE] border border-[#0D9488]/40 rounded-full tracking-wider uppercase">
                  DM (Neurology)
                </span>
              </div>
              <span className="text-[10px] font-semibold text-[#5BC0BE] tracking-widest uppercase mt-0.5">
                Consultant Neurologist & Stroke Lead
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-200">
            <a
              href="#chambers"
              className="hover:text-[#5BC0BE] transition-colors py-1 flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              Live OPD Status
            </a>
            <a
              href="#triage"
              className="hover:text-[#5BC0BE] transition-colors py-1"
            >
              Triage Wizard
            </a>
            <a
              href="#expertise"
              className="hover:text-[#5BC0BE] transition-colors py-1"
            >
              Expertise
            </a>
            <a
              href="#patient-guide"
              className="hover:text-[#5BC0BE] transition-colors py-1"
            >
              Resources & FAQ
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+919830012345"
              className="px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-[#1C2541] hover:bg-[#3A506B] border border-[#3A506B]/80 rounded-xl transition-all flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#5BC0BE]" />
              Clinic Desk
            </a>
            <a
              href="#triage"
              className="px-5 py-2.5 bg-[#0D9488] text-white rounded-full text-xs font-semibold hover:bg-[#0B7A6E] active:scale-95 transition-all shadow-neural flex items-center gap-1.5"
            >
              <span>Book Consultation</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-[#1C2541] focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B132B] border-b border-[#3A506B] px-4 pt-3 pb-5 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-1 gap-2 pt-2">
            <a
              href="#chambers"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#1C2541] text-slate-200 text-sm font-medium"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                Live OPD Chambers
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
            <a
              href="#triage"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#1C2541] text-slate-200 text-sm font-medium"
            >
              <span>3-Step Triage Booking</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
            <a
              href="#expertise"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#1C2541] text-slate-200 text-sm font-medium"
            >
              <span>Neurological Expertise & AIIMS Pedigree</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
            <a
              href="#patient-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#1C2541] text-slate-200 text-sm font-medium"
            >
              <span>Patient Resources & Stroke Guidelines</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href="#triage"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 px-4 bg-[#0D9488] text-white font-semibold text-sm rounded-lg shadow-sm"
            >
              Start Patient Triage Wizard
            </a>
            <a
              href="tel:+919830012345"
              className="w-full text-center py-2 px-4 bg-[#1C2541] border border-[#3A506B] text-slate-200 font-medium text-xs rounded-lg flex items-center justify-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#5BC0BE]" />
              Call Clinic Desk: +91 98300 12345
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
