'use client';

import React from 'react';
import {
  AlertTriangle,
  PhoneCall,
  MapPin,
  Clock,
  ShieldAlert,
  X,
  HeartPulse,
  Activity,
  Ambulance,
} from 'lucide-react';
import { getEmergencyHotlines } from '@/lib/whatsapp';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  redFlagTriggers: string[];
}

export function EmergencyModal({ isOpen, onClose, redFlagTriggers }: EmergencyModalProps) {
  if (!isOpen) return null;

  const hotlines = getEmergencyHotlines();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0B132B]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white border-2 border-[#EF4444] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Top Danger Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-2.5 bg-gradient-to-r from-[#EF4444] via-rose-600 to-[#EF4444]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#EF4444]/15 border border-[#EF4444]/30 flex items-center justify-center text-[#EF4444] shrink-0 animate-bounce">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EF4444]/15 text-[#EF4444] uppercase tracking-wider mb-1">
              <AlertTriangle className="w-3.5 h-3.5" /> High-Priority Clinical Intercept
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-[#0B132B]">
              Emergency Red-Flag Symptoms Detected
            </h3>
            <p className="text-xs sm:text-sm text-[#3A506B] mt-0.5">
              Standard outpatient booking is strictly locked for immediate patient safety.
            </p>
          </div>
        </div>

        {/* Red Flags Triggered List */}
        {redFlagTriggers.length > 0 && (
          <div className="mb-6 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-xl p-4">
            <h4 className="text-xs font-bold text-[#EF4444] uppercase tracking-wider mb-2">
              Critical Warning Symptoms Selected:
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-800 font-medium">
              {redFlagTriggers.map((flag, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#EF4444] font-bold">•</span>
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* FAST Stroke Protocol Callout */}
        <div className="mb-6 bg-slate-900 text-white rounded-xl p-4 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-[#5BC0BE] uppercase tracking-wider flex items-center gap-1.5">
              <HeartPulse className="w-4 h-4 text-[#EF4444]" /> FAST Stroke & Aneurysm Protocol
            </span>
            <span className="text-[11px] bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-500/40">
              Golden Window: 4.5 Hours
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs pt-1">
            <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700">
              <div className="font-extrabold text-[#EF4444] text-base">F</div>
              <div className="text-[11px] text-slate-300">Face Droop</div>
            </div>
            <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700">
              <div className="font-extrabold text-[#EF4444] text-base">A</div>
              <div className="text-[11px] text-slate-300">Arm Weakness</div>
            </div>
            <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700">
              <div className="font-extrabold text-[#EF4444] text-base">S</div>
              <div className="text-[11px] text-slate-300">Speech Slur</div>
            </div>
            <div className="bg-slate-800/80 p-2 rounded-lg border border-slate-700">
              <div className="font-extrabold text-[#10B981] text-base">T</div>
              <div className="text-[11px] text-slate-300">Time to Call 108</div>
            </div>
          </div>
        </div>

        {/* Immediate 1-Click Dialers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <a
            href="tel:108"
            className="p-4 bg-[#EF4444] hover:bg-rose-700 text-white rounded-xl shadow-lg shadow-rose-600/30 flex items-center justify-center gap-3 font-heading font-extrabold text-base transition-all active:scale-98"
          >
            <Ambulance className="w-6 h-6" />
            <div className="text-left">
              <div className="text-[11px] uppercase tracking-wider font-semibold opacity-90">National Helpline</div>
              <div>Dial 108 (Ambulance)</div>
            </div>
          </a>

          <a
            href="tel:+919830099911"
            className="p-4 bg-[#1C2541] hover:bg-[#0B132B] text-white rounded-xl border border-[#3A506B] flex items-center justify-center gap-3 font-heading font-bold text-sm transition-all active:scale-98"
          >
            <PhoneCall className="w-5 h-5 text-[#5BC0BE]" />
            <div className="text-left">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Stroke Rapid Unit</div>
              <div className="text-xs sm:text-sm font-extrabold text-[#5BC0BE]">+91 98300 99911</div>
            </div>
          </a>
        </div>

        {/* Emergency Centers Directions */}
        <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <div className="font-bold text-[#0B132B] flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#EF4444]" /> Nearest Comprehensive Emergency Centers:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
            <div>
              <strong>Apollo Gleneagles Emergency:</strong> 58 Canal Circular Rd, EM Bypass (+91 33 2320 2122)
            </div>
            <div>
              <strong>Sen Brain Emergency Annex:</strong> South City Complex (+91 98300 12345)
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            I understand, adjust symptoms
          </button>
          <a
            href="tel:+919830012345"
            className="text-xs font-bold text-[#0D9488] hover:underline"
          >
            Speak to Clinic Triage Desk &rarr;
          </a>
        </div>

      </div>
    </div>
  );
}
