'use client';

import React, { useState } from 'react';
import {
  User,
  Phone,
  Calendar,
  Clock,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  ChevronLeft,
  Activity,
  FileText,
  ShieldCheck,
  Building,
  Video,
} from 'lucide-react';
import { PatientFormData } from '@/types/triage';
import { SYMPTOM_CATEGORIES, evaluateTriage } from '@/lib/triage-rules';
import { generateWhatsAppLink } from '@/lib/whatsapp';
import { CHAMBER_CONFIGS } from '@/lib/chamber-schedule';

interface StepDetailsProps {
  formData: PatientFormData;
  updateFormData: (updates: Partial<PatientFormData>) => void;
  onPrev: () => void;
}

export function StepDetails({ formData, updateFormData, onPrev }: StepDetailsProps) {
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentCategory =
    SYMPTOM_CATEGORIES.find((c) => c.id === formData.category) || SYMPTOM_CATEGORIES[0];

  const evaluation = evaluateTriage(
    formData.category,
    formData.selectedSymptoms,
    formData.checkedRedFlags,
    formData.severity
  );

  const validateAndSubmit = () => {
    if (!formData.fullName.trim()) {
      setErrorMsg('Please enter patient full name.');
      return;
    }
    if (!formData.age.trim()) {
      setErrorMsg('Please specify patient age.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setErrorMsg('Please enter a valid contact phone number.');
      return;
    }

    setErrorMsg('');
    setIsSubmitted(true);

    const matchedConfig = CHAMBER_CONFIGS.find((c) => c.id === formData.chamberId);
    const chamberName =
      formData.mode === 'tele'
        ? 'Tele-Neurology Digital OPD'
        : matchedConfig
        ? `${matchedConfig.clinicName} (${matchedConfig.chamberRoomShort})`
        : formData.chamberId === 'apollo-gleneagles'
        ? 'Apollo Gleneagles Hospital (Chamber 2A)'
        : formData.chamberId === 'sen-brain-spine'
        ? 'Sri Aurobindo Seva Kendra (Suite 101)'
        : 'Manipal Hospital (Dhakuria Neuro Wing)';

    const link = generateWhatsAppLink({
      patientName: formData.fullName,
      age: formData.age,
      gender: formData.gender,
      phone: formData.phone,
      category: currentCategory.name,
      chamber: chamberName,
      mode: formData.mode,
      date: formData.date || 'Earliest Available',
      timeSlot: formData.timeSlot || 'Chamber Session',
      duration: formData.duration,
      severity: formData.severity,
      selectedSymptoms: formData.selectedSymptoms,
      previousConsultation: formData.previousConsultation,
      emergencyContact: formData.emergencyContactPhone
        ? `${formData.emergencyContactName || 'Contact'} (${formData.emergencyContactPhone})`
        : undefined,
    });

    if (typeof window !== 'undefined') {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  const copySummary = () => {
    const summaryText = `Dr. Aranya Sen Neurology Triage Request
Patient: ${formData.fullName} (${formData.age}y, ${formData.gender || 'N/A'})
Category: ${currentCategory.name}
Preferred Date/Slot: ${formData.date} at ${formData.timeSlot}
Mode: ${formData.mode === 'tele' ? 'Tele-Neurology' : 'Chamber Consult'}
Phone: ${formData.phone}
Duration: ${formData.duration} (Severity: ${formData.severity}/10)`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Top Banner Error Notification */}
      {errorMsg && (
        <div className="p-4 bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-xl text-xs font-bold text-[#EF4444] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form: Patient Data Intake (7 Cols) */}
        <div className="lg:col-span-7 space-y-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-heading font-bold text-base text-[#0B132B] pb-2 border-b border-slate-100 flex items-center gap-2">
            <User className="w-4 h-4 text-[#0D9488]" />
            Patient Clinical Intake Form
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="sm:col-span-2 space-y-1">
              <label className="block text-xs font-bold text-slate-700">
                Patient Full Name <span className="text-[#0D9488]">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => updateFormData({ fullName: e.target.value })}
                placeholder="e.g., Smt. Ananya Banerjee"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488]"
                required
              />
            </div>

            {/* Age */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">
                Age (in Years) <span className="text-[#0D9488]">*</span>
              </label>
              <input
                type="number"
                min="1"
                max="110"
                value={formData.age}
                onChange={(e) => updateFormData({ age: e.target.value })}
                placeholder="e.g., 48"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488]"
                required
              />
            </div>

            {/* Gender */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">
                Gender <span className="text-[#0D9488]">*</span>
              </label>
              <select
                value={formData.gender}
                onChange={(e) => updateFormData({ gender: e.target.value as any })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488]"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Primary Phone */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">
                WhatsApp / Mobile Phone <span className="text-[#0D9488]">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => updateFormData({ phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488]"
                required
              />
            </div>

            {/* Email (Optional) */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => updateFormData({ email: e.target.value })}
                placeholder="patient@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#0D9488]/30 focus:border-[#0D9488]"
              />
            </div>
          </div>

          {/* Previous Consultation Toggle */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-[#0B132B]">
                  Prior Neurological Consultation / Follow-up?
                </label>
                <p className="text-[11px] text-slate-500">
                  Have you previously consulted Dr. Aranya Sen or another neurologist?
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => updateFormData({ previousConsultation: true })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                    formData.previousConsultation
                      ? 'bg-[#0D9488] text-white border-[#0D9488]'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => updateFormData({ previousConsultation: false })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                    !formData.previousConsultation
                      ? 'bg-[#0D9488] text-white border-[#0D9488]'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  No (First Visit)
                </button>
              </div>
            </div>

            {formData.previousConsultation && (
              <div className="mt-3">
                <input
                  type="text"
                  value={formData.previousDetails || ''}
                  onChange={(e) => updateFormData({ previousDetails: e.target.value })}
                  placeholder="Previous prescription / Diagnosis note / MRI findings (optional)"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-[#0D9488]/30"
                />
              </div>
            )}
          </div>

          {/* Emergency Contact */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-600">
                Caregiver / Emergency Contact Name
              </label>
              <input
                type="text"
                value={formData.emergencyContactName || ''}
                onChange={(e) => updateFormData({ emergencyContactName: e.target.value })}
                placeholder="Relative / Spouse"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-600">
                Emergency Phone Number
              </label>
              <input
                type="tel"
                value={formData.emergencyContactPhone || ''}
                onChange={(e) => updateFormData({ emergencyContactPhone: e.target.value })}
                placeholder="Emergency Contact Phone"
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs"
              />
            </div>
          </div>

        </div>

        {/* Right Card: Dynamic Appointment Summary Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#0B132B] text-white rounded-2xl p-6 border border-[#3A506B] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#0D9488]/15 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-[#3A506B]/60">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#5BC0BE]">
                  Clinical Triage Summary
                </span>
                <h4 className="font-heading font-extrabold text-base text-white">
                  OPD Consult Docket
                </h4>
              </div>
              <div
                className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                  evaluation.urgency === 'urgent'
                    ? 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/40'
                    : 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40'
                }`}
              >
                {evaluation.protocolBadge}
              </div>
            </div>

            {/* Summary Details Rows */}
            <div className="py-4 space-y-3 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">Patient:</span>
                <span className="font-bold text-white">
                  {formData.fullName || '—'} {formData.age ? `(${formData.age}y)` : ''}
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">Chief Category:</span>
                <span className="font-semibold text-[#5BC0BE]">
                  {currentCategory.name}
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">Consult Mode:</span>
                <span className="font-medium text-white flex items-center gap-1">
                  {formData.mode === 'tele' ? (
                    <>
                      <Video className="w-3.5 h-3.5 text-[#5BC0BE]" /> Tele-Neurology
                    </>
                  ) : (
                    <>
                      <Building className="w-3.5 h-3.5 text-[#5BC0BE]" /> In-Person Chamber
                    </>
                  )}
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">Scheduled Date:</span>
                <span className="font-semibold text-white">
                  {formData.date || 'Earliest available'}
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">Allocated Slot:</span>
                <span className="font-bold text-[#10B981]">
                  {formData.timeSlot || 'OPD Session'}
                </span>
              </div>

              <div className="flex justify-between items-center text-slate-300">
                <span className="text-slate-400">Symptom Severity:</span>
                <span className="font-medium text-white">
                  {formData.severity}/10 ({formData.duration})
                </span>
              </div>

              {formData.selectedSymptoms.length > 0 && (
                <div className="pt-2 border-t border-[#3A506B]/50">
                  <span className="text-slate-400 block mb-1">Key Symptoms Logged:</span>
                  <div className="flex flex-wrap gap-1">
                    {formData.selectedSymptoms.slice(0, 3).map((s, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-[#1C2541] border border-[#3A506B] text-[10px] text-slate-300"
                      >
                        {s}
                      </span>
                    ))}
                    {formData.selectedSymptoms.length > 3 && (
                      <span className="text-[10px] text-slate-400 self-center">
                        +{formData.selectedSymptoms.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons Inside Summary */}
            <div className="pt-4 border-t border-[#3A506B]/60 space-y-2">
              <button
                type="button"
                onClick={validateAndSubmit}
                className="w-full py-3.5 px-4 rounded-xl font-heading font-extrabold text-sm text-white bg-[#0D9488] hover:bg-[#0f766e] active:scale-[0.98] transition-all shadow-lg shadow-[#0D9488]/30 flex items-center justify-center gap-2 border border-[#0D9488]"
              >
                <Send className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={copySummary}
                className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-[#1C2541] hover:bg-[#3A506B] transition-colors flex items-center justify-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5 text-[#5BC0BE]" />
                <span>{copied ? 'Summary Copied to Clipboard!' : 'Copy Summary Text'}</span>
              </button>
            </div>

            <div className="mt-3 text-[10px] text-slate-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-[#10B981]" />
              Encrypted dispatch to Dr. Sen&apos;s WhatsApp Desk
            </div>
          </div>
        </div>

      </div>

      {/* Navigation Footer */}
      <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-3">
        <button
          type="button"
          onClick={onPrev}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-heading font-semibold text-xs text-slate-700 bg-white border border-[#3A506B]/20 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Slot Picker</span>
        </button>

        <button
          type="button"
          onClick={validateAndSubmit}
          className="w-full sm:w-auto px-7 py-3 bg-[#0D9488] text-white rounded-xl text-xs sm:text-sm font-bold shadow-neural hover:bg-[#0B7A6E] active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <span>Complete & Send via WhatsApp</span>
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
