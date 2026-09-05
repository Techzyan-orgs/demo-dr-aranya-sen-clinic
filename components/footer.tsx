'use client';

import React from 'react';
import {
  Activity,
  AlertTriangle,
  HeartPulse,
  Hospital,
  MapPin,
  Phone,
  ShieldCheck,
  Clock,
  ExternalLink,
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0B132B] text-slate-300 border-t border-[#3A506B]/50 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Emergency Disclaimer Banner */}
        <div className="bg-[#1C2541] border border-[#EF4444]/40 rounded-2xl p-5 text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#EF4444] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white uppercase tracking-wider block mb-0.5">
                Clinical Emergency Disclaimer:
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                This digital triage portal provides clinical scheduling and preliminary safety screening. It does NOT replace real-time emergency medical evaluation. For sudden paralysis, loss of consciousness, or thunderclap headache, call <strong>108</strong> immediately.
              </p>
            </div>
          </div>
          <a
            href="tel:108"
            className="px-4 py-2 bg-[#EF4444] text-white font-bold text-xs rounded-xl whitespace-nowrap hover:bg-rose-700 transition-colors shrink-0"
          >
            Emergency 108
          </a>
        </div>

        {/* 4 Column Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">
          
          {/* Col 1: Identity & Credentials */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#0D9488] flex items-center justify-center text-white">
                <Activity className="w-4 h-4" />
              </div>
              <span className="font-heading font-bold text-base text-white">
                Dr. Aranya Sen
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Senior Consultant Neurologist & Stroke Specialist. Former Fellow, All India Institute of Medical Sciences (AIIMS, New Delhi).
            </p>
            <div className="pt-1 text-[11px] text-slate-400 space-y-1">
              <div>Medical Council Reg: <strong>WBMC-62419</strong></div>
              <div>Fellow: <strong>Indian Academy of Neurology (IAN)</strong></div>
            </div>
          </div>

          {/* Col 2: Hospital Chambers */}
          <div className="space-y-2.5">
            <h4 className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
              <Hospital className="w-4 h-4 text-[#5BC0BE]" /> Primary Chambers
            </h4>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li>
                <strong className="text-slate-200">Apollo Gleneagles Hospital</strong>
                <div className="text-slate-500">Chamber 2A • Mon, Wed, Fri (5:00 - 8:30 PM)</div>
              </li>
              <li>
                <strong className="text-slate-200">Sri Aurobindo Seva Kendra (EEDF)</strong>
                <div className="text-slate-500">Jodhpur Park (Near South City) • Tue, Thu, Sat (6:00 - 9:30 PM)</div>
              </li>
              <li>
                <strong className="text-slate-200">Manipal Hospital (Dhakuria)</strong>
                <div className="text-slate-500">Neuro Wing 3B • Saturday Morning & Sunday Special OPD</div>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-2.5">
            <h4 className="font-heading font-bold text-sm text-white">Clinical Links</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <a href="#chambers" className="hover:text-[#5BC0BE] transition-colors">
                  Live Chamber Status & Queue
                </a>
              </li>
              <li>
                <a href="#triage" className="hover:text-[#5BC0BE] transition-colors">
                  Neurological Triage Wizard
                </a>
              </li>
              <li>
                <a href="#expertise" className="hover:text-[#5BC0BE] transition-colors">
                  Stroke, Epilepsy & Movement Disorders
                </a>
              </li>
              <li>
                <a href="#patient-guide" className="hover:text-[#5BC0BE] transition-colors">
                  Pre-Consultation Checklist & FAQ
                </a>
              </li>
              <li>
                <a href="https://wa.me/919830012345" target="_blank" rel="noopener noreferrer" className="hover:text-[#5BC0BE] transition-colors flex items-center gap-1">
                  WhatsApp Coordination Desk <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Rapid Contact */}
          <div className="space-y-2.5">
            <h4 className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-[#0D9488]" /> Direct Desks
            </h4>
            <div className="space-y-2 text-[11px]">
              <div className="p-2.5 rounded-xl bg-[#1C2541] border border-[#3A506B]/50">
                <div className="text-slate-400">Clinic Coordinator WhatsApp:</div>
                <div className="font-bold text-[#5BC0BE] text-xs mt-0.5">+91 98300 12345</div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#1C2541] border border-[#3A506B]/50">
                <div className="text-slate-400">Stroke Emergency Rapid Unit:</div>
                <div className="font-bold text-[#EF4444] text-xs mt-0.5">+91 98300 99911</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Verification */}
        <div className="pt-6 border-t border-[#3A506B]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Dr. Aranya Sen, DM (Neurology). All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" /> Clinical HIPAA & Patient Data Safety
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
