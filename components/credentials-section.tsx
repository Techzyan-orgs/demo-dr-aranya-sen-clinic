'use client';

import React from 'react';
import {
  Activity,
  Award,
  BookOpen,
  Brain,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  HeartPulse,
  Microscope,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Zap,
} from 'lucide-react';

export function CredentialsSection() {
  const domains = [
    {
      title: 'Hyper-Acute Stroke & Neurovascular',
      icon: HeartPulse,
      color: 'text-rose-500',
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      points: [
        'Intravenous Thrombolysis (rt-PA) in acute ischemic stroke',
        'Endovascular Thrombectomy candidate selection & post-care',
        'Carotid artery disease, Vertebrobasilar insufficiency & TIA workup',
        'Cerebral venous sinus thrombosis (CVST) anticoagulation protocols',
      ],
    },
    {
      title: 'Epileptology & Clinical Neurophysiology',
      icon: Zap,
      color: 'text-amber-500',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      points: [
        'Refractory epilepsy & multi-drug antiepileptic optimization',
        'Long-term Video EEG monitoring & seizure localization',
        'Autoimmune epilepsy and surgical resection workup',
        'First seizure vs cardiac syncope differential diagnosis',
      ],
    },
    {
      title: 'Movement Disorders & Neuro-Degeneration',
      icon: Activity,
      color: 'text-teal-600',
      bg: 'bg-teal-50',
      border: 'border-teal-200',
      points: [
        'Parkinson’s Disease: Motor & non-motor symptom titration',
        'Deep Brain Stimulation (DBS) pre-assessment and programming',
        'Botulinum Toxin injections for Blepharospasm, Hemifacial spasm & Dystonia',
        'Atypical parkinsonism (PSP, MSA, CBD) differential care',
      ],
    },
    {
      title: 'Cognitive Neurology & Neuro-Immunology',
      icon: Brain,
      color: 'text-cyan-600',
      bg: 'bg-cyan-50',
      border: 'border-cyan-200',
      points: [
        'Early-onset Alzheimer’s & Frontotemporal Lobar Degeneration (FTD)',
        'Multiple Sclerosis (MS) & Neuromyelitis Optica Spectrum (NMOSD)',
        'Myasthenia Gravis crisis prevention and biologic therapies',
        'Autoimmune encephalopathies (Anti-NMDA, Anti-LGI1)',
      ],
    },
  ];

  const diagnosticTech = [
    {
      name: 'Digital Video EEG (32-Channel)',
      desc: 'High-density electroencephalography with sleep-deprived provocation.',
    },
    {
      name: 'Electromyography & Nerve Conduction (EMG/NCS)',
      desc: 'Precision localized evaluation for neuropathy, radiculopathy, and ALS.',
    },
    {
      name: 'Visual & Somatosensory Evoked Potentials (VEP/SSEP)',
      desc: 'Optic neuritis and central conduction velocity testing.',
    },
    {
      name: 'High-Resolution 3T Neuro-MRI Correlation',
      desc: 'Susceptibility-weighted imaging (SWI), DWI stroke maps, and volumetric spectroscopy.',
    },
  ];

  return (
    <section id="expertise" className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-[#3A506B] text-[11px] font-bold uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#0D9488]" />
            AIIMS Alum & Clinical Leadership
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-[#0B132B] tracking-tight">
            Comprehensive Neurological Sub-Specialties
          </h3>
          <p className="text-xs sm:text-sm text-[#3A506B] mt-2">
            Combining rigorous clinical neuro-investigations, cutting-edge neuro-imaging correlation, and personalized therapeutic regimens.
          </p>
        </div>

        {/* 4 Core Clinical Domains Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {domains.map((d, idx) => {
            const Icon = d.icon;
            return (
              <div
                key={idx}
                className="bg-[#F8FAFC] border border-[#3A506B]/10 hover:border-[#0D9488]/40 rounded-2xl p-6 transition-all duration-200 shadow-neural flex flex-col justify-between hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className={`p-3 rounded-xl ${d.bg} ${d.color} border ${d.border} shadow-sm`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-base text-[#0B132B]">
                        {d.title}
                      </h4>
                      <span className="text-[10px] font-bold text-[#0D9488] uppercase tracking-wider">
                        Sub-Specialty Domain
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-700">
                    {d.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] shrink-0 mt-0.5" />
                        <span className="leading-relaxed font-medium">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Diagnostic Facilities & Hospital Affiliations Banner */}
        <div className="bg-[#1C2541] text-white rounded-3xl p-8 sm:p-10 border border-[#3A506B]/60 shadow-xl relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#0D9488]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#0B132B] border border-[#3A506B] text-[#5BC0BE]">
                <Microscope className="w-3.5 h-3.5 text-[#0D9488]" />
                Advanced Neurophysiology Suite
              </div>
              <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-white">
                In-Chamber Advanced Diagnostic Capabilities
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Accurate neuro-localization requires pristine diagnostic execution. Dr. Sen works directly with certified neurophysiology technologists to review raw tracings and recordings.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#10B981]" /> NABL Accredited Labs
                </div>
                <div className="flex items-center gap-1.5">
                  <FileCheck2 className="w-4 h-4 text-[#5BC0BE]" /> Same-Day Digital Reports
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {diagnosticTech.map((tech, idx) => (
                <div
                  key={idx}
                  className="bg-[#0B132B]/80 border border-[#3A506B]/50 p-4 rounded-xl space-y-1 hover:border-[#0D9488] transition-colors"
                >
                  <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
                    {tech.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-normal">{tech.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
