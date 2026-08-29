'use client';

import React, { useState } from 'react';
import {
  Activity,
  Calendar,
  Check,
  CheckCircle2,
  FileText,
  HeartPulse,
  PhoneCall,
  ShieldAlert,
  Sparkles,
  Zap,
} from 'lucide-react';
import { PatientFormData } from '@/types/triage';
import { StepSymptoms } from './step-symptoms';
import { StepSlot } from './step-slot';
import { StepDetails } from './step-details';
import { EmergencyModal } from './emergency-modal';

interface TriageWizardProps {
  initialChamberId?: string;
  isStandalone?: boolean;
}

export function TriageWizard({ initialChamberId, isStandalone = false }: TriageWizardProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [emergencyFlags, setEmergencyFlags] = useState<string[]>([]);

  const [formData, setFormData] = useState<PatientFormData>({
    fullName: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    category: 'headache-migraine',
    selectedSymptoms: [],
    checkedRedFlags: [],
    duration: '1 to 7 days',
    severity: 5,
    previousConsultation: false,
    previousDetails: '',
    mode: 'physical',
    chamberId: initialChamberId || 'apollo-gleneagles',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '05:30 PM',
    emergencyContactName: '',
    emergencyContactPhone: '',
    additionalNotes: '',
  });

  const updateFormData = (updates: Partial<PatientFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleTriggerEmergency = (flags: string[]) => {
    setEmergencyFlags(flags);
    setEmergencyModalOpen(true);
  };

  const steps = [
    { number: 1, title: 'Symptoms & Red Flags', icon: Activity, desc: 'Safety triage check' },
    { number: 2, title: 'Chamber & Slot', icon: Calendar, desc: 'Location & timing' },
    { number: 3, title: 'Patient Intake', icon: FileText, desc: 'WhatsApp docket' },
  ];

  return (
    <div id="triage" className="scroll-mt-20">
      <div className={`bg-white rounded-3xl border border-[#3A506B]/10 shadow-neural overflow-hidden ${isStandalone ? 'max-w-5xl mx-auto' : ''}`}>
        
        {/* Wizard Top Header Bar */}
        <div className="bg-[#0B132B] text-white p-6 sm:p-8 border-b border-[#3A506B]/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#0D9488]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#1C2541] border border-[#3A506B]/80 text-[#5BC0BE] mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
                Interactive 3-Step Neurological Triage
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-extrabold text-white tracking-tight">
                Specialized Neurological Intake & Booking
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                Immediate clinical red-flag evaluation followed by seamless OPD slot reservation for Dr. Aranya Sen’s clinics.
              </p>
            </div>

            {/* Quick Emergency Desk Button */}
            <a
              href="tel:+919830099911"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#EF4444]/20 hover:bg-[#EF4444]/30 border border-[#EF4444]/40 text-rose-200 text-xs font-bold transition-all shrink-0 self-start md:self-auto shadow-sm"
            >
              <PhoneCall className="w-4 h-4 text-[#EF4444]" />
              <span>Stroke / Acute Helpline</span>
            </a>
          </div>

          {/* Stepper Navigation Progress Bar with Visual Pills */}
          <div className="mt-8 pt-6 border-t border-[#3A506B]/40">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#5BC0BE]">
                Step {currentStep} of 3: {steps[currentStep - 1].title}
              </span>
              <div className="flex gap-1.5">
                <div className={`w-8 h-1.5 rounded-full transition-all ${currentStep >= 1 ? 'bg-[#0D9488]' : 'bg-slate-700'}`} />
                <div className={`w-8 h-1.5 rounded-full transition-all ${currentStep >= 2 ? 'bg-[#0D9488]' : 'bg-slate-700'}`} />
                <div className={`w-8 h-1.5 rounded-full transition-all ${currentStep >= 3 ? 'bg-[#0D9488]' : 'bg-slate-700'}`} />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {steps.map((s) => {
                const isCurrent = currentStep === s.number;
                const isDone = currentStep > s.number;
                const Icon = s.icon;

                return (
                  <button
                    key={s.number}
                    type="button"
                    onClick={() => {
                      if (isDone || s.number === currentStep) {
                        setCurrentStep(s.number as any);
                      }
                    }}
                    disabled={!isDone && s.number !== currentStep}
                    className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl text-left transition-all ${
                      isCurrent
                        ? 'bg-[#1C2541] border border-[#0D9488] text-white shadow-md'
                        : isDone
                        ? 'bg-[#1C2541]/60 border border-[#3A506B]/50 text-slate-200 hover:bg-[#1C2541]'
                        : 'bg-[#1C2541]/20 border border-transparent text-slate-400 opacity-60'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-extrabold transition-colors ${
                        isDone
                          ? 'bg-[#10B981] text-white'
                          : isCurrent
                          ? 'bg-[#0D9488] text-white'
                          : 'bg-[#3A506B]/40 text-slate-400'
                      }`}
                    >
                      {isDone ? <Check className="w-4 h-4 stroke-[3]" /> : s.number}
                    </div>
                    <div className="hidden sm:block">
                      <div className="text-xs font-heading font-bold leading-tight">
                        {s.title}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {s.desc}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Wizard Content Body */}
        <div className="p-6 sm:p-8 bg-[#F8FAFC]">
          {currentStep === 1 && (
            <StepSymptoms
              formData={formData}
              updateFormData={updateFormData}
              onNext={() => setCurrentStep(2)}
              onTriggerEmergency={handleTriggerEmergency}
            />
          )}

          {currentStep === 2 && (
            <StepSlot
              formData={formData}
              updateFormData={updateFormData}
              onNext={() => setCurrentStep(3)}
              onPrev={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <StepDetails
              formData={formData}
              updateFormData={updateFormData}
              onPrev={() => setCurrentStep(2)}
            />
          )}
        </div>

      </div>

      {/* Emergency Red-Flag Intercept Modal */}
      <EmergencyModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
        redFlagTriggers={emergencyFlags}
      />
    </div>
  );
}
