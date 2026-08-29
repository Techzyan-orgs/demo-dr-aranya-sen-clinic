'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  FileText,
  AlertOctagon,
  Clock,
  Video,
  Pill,
  BookOpen,
  CheckCircle2,
  PhoneCall,
  Activity,
  HeartPulse,
} from 'lucide-react';

export function PatientResources() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'When is a headache considered an immediate medical emergency?',
      a: 'A headache requires immediate ER evaluation if it is sudden and reaches maximum agony within 60 seconds (Thunderclap headache), if it occurs with stiff neck and high fever, if accompanied by one-sided arm/leg weakness or slurred speech, or if it is a new progressive headache in individuals over 50 years of age.',
    },
    {
      q: 'What should bystanders do (and NOT do) during an active epileptic seizure?',
      a: 'DO: Turn the person gently onto their side (lateral recovery position), place a soft cushion under their head, loosen tight clothing around the neck, and time the seizure. DO NOT: Never force open their mouth, do not insert spoons, keys, or fingers, and do not hold down their jerking limbs.',
    },
    {
      q: 'What is the "Golden Window" in acute ischemic stroke?',
      a: 'The first 4.5 hours from the onset of symptoms is the critical window for Intravenous Thrombolysis (clot-dissolving medicine). For large vessel occlusions, mechanical thrombectomy can be performed up to 24 hours in selected patients. Every minute saved preserves up to 1.9 million neurons.',
    },
    {
      q: 'What documents and reports should I bring to the OPD chamber?',
      a: 'Please bring: 1) Physical MRI/CT film sheets and CD DICOM disks (not just the written report), 2) All ongoing medication prescriptions and actual medicine strips, 3) Recent blood tests (kidney, liver, thyroid, HbA1c), and 4) If possible, a smartphone video recording of the seizure or movement episode.',
    },
    {
      q: 'How should I prepare for a routine or sleep-deprived Video EEG?',
      a: 'Wash your hair thoroughly with shampoo the night before and avoid applying hair oils, gels, or sprays. If a sleep-deprived EEG is ordered, stay awake until 2:00 AM and wake up at 5:00 AM as instructed by our neurophysiology desk.',
    },
    {
      q: 'Can migraine be completely prevented or managed without daily painkillers?',
      a: 'Yes. Modern neurological care utilizes preventive prophylactic medications (such as CGRP antagonists, beta-blockers, topiramate) combined with trigger identification and lifestyle modulation to reduce attack frequency by over 80%, avoiding medication-overuse headaches.',
    },
  ];

  const prepChecklist = [
    {
      title: 'Original Scan Films & CDs',
      desc: 'Bring physical MRI / CT scan plates and DICOM CDs so Dr. Sen can examine raw axial & coronal sequences directly.',
      icon: FileText,
    },
    {
      title: 'Active Medicine Strips',
      desc: 'Bring the actual medicine boxes/foils of all prescription drugs you are currently taking, including non-neuro drugs.',
      icon: Pill,
    },
    {
      title: 'Symptom / Attack Diary',
      desc: 'Note the dates, time of day, triggers, duration, and pain scale of recent headaches or seizure spells.',
      icon: BookOpen,
    },
    {
      title: 'Episode Video Recordings',
      desc: 'If a family member witnessed abnormal jerks, tremors, or walking imbalance, bring the smartphone video clip.',
      icon: Video,
    },
  ];

  return (
    <section id="patient-guide" className="py-16 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-[#3A506B] text-[11px] font-bold uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#0D9488]" />
            Clinical Guidance & Patient Education
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-extrabold text-[#0B132B] tracking-tight">
            Neurology Patient Guide & FAQ
          </h3>
          <p className="text-xs sm:text-sm text-[#3A506B] mt-2">
            Essential protocols to help patients and caregivers prepare for OPD consultations and recognize neurological emergencies.
          </p>
        </div>

        {/* Pre-Consultation Checklist Grid */}
        <div className="mb-14">
          <h4 className="text-sm font-heading font-bold uppercase tracking-widest text-[#3A506B] mb-5 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0D9488]" />
            What to Bring to Your First Consultation
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {prepChecklist.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-2xl border border-[#3A506B]/10 shadow-neural hover:border-[#0D9488]/40 transition-colors space-y-2"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h5 className="text-sm font-bold text-[#0B132B]">{item.title}</h5>
                  <p className="text-xs text-[#3A506B] leading-relaxed font-medium">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto space-y-3">
          <h4 className="text-sm font-heading font-bold uppercase tracking-widest text-[#3A506B] mb-4 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#0D9488]" />
            Frequently Asked Neurological Questions
          </h4>

          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#3A506B]/10 overflow-hidden shadow-neural transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-heading font-bold text-sm text-[#0B132B] hover:text-[#0D9488] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-[#0D9488]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 text-xs text-[#3A506B] leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-200 font-medium">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
