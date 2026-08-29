'use client';

import React from 'react';
import {
  Activity,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  HeartPulse,
  Hospital,
  ShieldCheck,
  Sparkles,
  Users,
  Zap,
} from 'lucide-react';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0B132B] via-[#1C2541] to-[#0B132B] text-white pt-12 pb-16 md:pt-16 md:pb-24 border-b border-[#3A506B]/30">
      {/* Background Neural Grid & Synaptic Light Texture */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#5BC0BE_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#0D9488]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Main Hero Copy (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Super Header Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C2541] border border-[#3A506B] shadow-inner text-xs text-slate-200">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
              </span>
              <span className="font-semibold text-[#5BC0BE]">AIIMS Alum</span>
              <span className="text-slate-400">•</span>
              <span>14+ Years Clinical Excellence</span>
              <span className="text-slate-400">•</span>
              <span>Head of Stroke Care</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[2.85rem] font-heading font-extrabold tracking-tight text-white leading-tight">
                Restoring Neural Function Through{' '}
                <span className="text-[#5BC0BE]">Precision Medicine</span>
              </h1>
              <p className="text-lg md:text-xl font-medium text-slate-200">
                Dr. Aranya Sen, <span className="text-[#5BC0BE] font-semibold">DM (Neurology)</span>, MD, MBBS
              </p>
            </div>

            {/* Clinical Bio Summary */}
            <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl">
              Senior Consultant Neurologist specializing in hyper-acute stroke intervention, refractory epilepsy,
              neuro-immunological disorders, Parkinson’s & movement disorders, and advanced diagnostic neurophysiology.
              Bridging evidence-based neuro-therapeutics with rapid clinical triage.
            </p>

            {/* Dual Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#triage"
                className="px-6 py-3.5 rounded-xl font-heading font-bold text-sm text-white bg-[#0D9488] hover:bg-[#0f766e] active:scale-[0.98] transition-all shadow-lg shadow-[#0D9488]/30 flex items-center justify-center gap-2 border border-[#0D9488]"
              >
                <Activity className="w-4 h-4 text-emerald-200" />
                <span>Start Patient Triage</span>
              </a>
              <a
                href="#chambers"
                className="px-6 py-3.5 rounded-xl font-heading font-semibold text-sm text-slate-200 hover:text-white bg-[#1C2541] hover:bg-[#3A506B]/80 border border-[#3A506B] transition-all flex items-center justify-center gap-2"
              >
                <Clock className="w-4 h-4 text-[#5BC0BE]" />
                <span>View Chamber Timings</span>
              </a>
            </div>

            {/* Quick Micro Credentials Strip */}
            <div className="pt-4 border-t border-[#3A506B]/40 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0D9488]/20 flex items-center justify-center text-[#5BC0BE]">
                  <Hospital className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Apollo Gleneagles</div>
                  <div className="text-[11px] text-slate-400">Chief Neuro Unit</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0D9488]/20 flex items-center justify-center text-[#5BC0BE]">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">45+ Papers</div>
                  <div className="text-[11px] text-slate-400">PubMed Indexed</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0D9488]/20 flex items-center justify-center text-[#5BC0BE]">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">28,000+</div>
                  <div className="text-[11px] text-slate-400">Patients Managed</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0D9488]/20 flex items-center justify-center text-[#5BC0BE]">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">IAN Fellow</div>
                  <div className="text-[11px] text-slate-400">Neurology Board</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Clinical Authority Card & Sub-Specialty Matrix (5 Cols) */}
          <div className="lg:col-span-5">
            <section className="bg-[#1C2541] rounded-2xl p-6 text-white border border-[#3A506B]/50 shadow-neural relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#0D9488]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Doctor Credentials Header */}
              <div className="flex items-center gap-3.5 mb-4 pb-4 border-b border-[#3A506B]/40">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-[#5BC0BE]/30 shrink-0">
                  <Activity className="w-6 h-6 text-[#5BC0BE]" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-[#5BC0BE] font-bold uppercase tracking-wider">Clinical Credentials</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
                  </div>
                  <span className="text-sm font-semibold text-white">DM (Neurology), MD, MBBS</span>
                  <span className="text-[10px] text-slate-400">All India Institute of Medical Sciences (AIIMS)</span>
                </div>
              </div>

              {/* Clinical Quote */}
              <p className="text-xs text-slate-300 leading-relaxed mb-5 italic border-l-2 border-[#5BC0BE]/60 pl-3 py-0.5">
                &ldquo;Restoring neural function through precision evidence-based therapeutics, rapid triage, and synaptic focus.&rdquo;
              </p>

              {/* Stat Pillars */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-white/5 rounded-xl p-2.5 text-center border border-white/5">
                  <span className="block text-xl font-heading font-extrabold text-[#5BC0BE]">14+</span>
                  <span className="text-[9px] uppercase font-semibold tracking-tighter opacity-80 text-slate-300">Yrs Practice</span>
                </div>
                <div className="bg-white/5 rounded-xl p-2.5 text-center border border-white/5">
                  <span className="block text-xl font-heading font-extrabold text-[#5BC0BE]">50+</span>
                  <span className="text-[9px] uppercase font-semibold tracking-tighter opacity-80 text-slate-300">Publications</span>
                </div>
                <div className="bg-white/5 rounded-xl p-2.5 text-center border border-white/5">
                  <span className="block text-xl font-heading font-extrabold text-[#5BC0BE]">28k+</span>
                  <span className="text-[9px] uppercase font-semibold tracking-tighter opacity-80 text-slate-300">Cases Managed</span>
                </div>
              </div>

              {/* Core Sub-Specialties Matrix */}
              <div className="space-y-2 pt-2 border-t border-[#3A506B]/40">
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#5BC0BE] flex items-center justify-between">
                  <span>Core Clinical Units</span>
                  <span className="text-[10px] text-slate-400 font-normal">Chamber & IPD</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5 flex items-center gap-1.5">
                    <HeartPulse className="w-3.5 h-3.5 text-[#EF4444] shrink-0" />
                    <span className="text-[11px] font-medium text-slate-200">Hyper-Acute Stroke</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                    <span className="text-[11px] font-medium text-slate-200">Epilepsy & Video EEG</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-[#5BC0BE] shrink-0" />
                    <span className="text-[11px] font-medium text-slate-200">Parkinson’s & Gait</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 border border-white/5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                    <span className="text-[11px] font-medium text-slate-200">Neuro-Immunology</span>
                  </div>
                </div>
              </div>

              {/* Live Availability Notice */}
              <div className="mt-4 pt-3 border-t border-[#3A506B]/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
                  <span className="text-slate-300 font-medium text-[11px]">Live Token Desk Open</span>
                </div>
                <a
                  href="#triage"
                  className="text-[11px] font-bold text-[#5BC0BE] hover:underline flex items-center gap-1"
                >
                  Check OPD Slots &rarr;
                </a>
              </div>

            </section>
          </div>

        </div>
      </div>
    </section>
  );
}
