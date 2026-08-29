'use client';

import React from 'react';
import {
  Activity,
  AlertTriangle,
  Brain,
  Check,
  ChevronRight,
  Flame,
  Gauge,
  HeartPulse,
  Info,
  ShieldAlert,
  Zap,
} from 'lucide-react';
import { PatientFormData } from '@/types/triage';
import { SYMPTOM_CATEGORIES, evaluateTriage } from '@/lib/triage-rules';

interface StepSymptomsProps {
  formData: PatientFormData;
  updateFormData: (updates: Partial<PatientFormData>) => void;
  onNext: () => void;
  onTriggerEmergency: (flags: string[]) => void;
}

export function StepSymptoms({
  formData,
  updateFormData,
  onNext,
  onTriggerEmergency,
}: StepSymptomsProps) {
  const currentCategory =
    SYMPTOM_CATEGORIES.find((c) => c.id === formData.category) || SYMPTOM_CATEGORIES[0];

  const handleSelectCategory = (categoryId: string) => {
    updateFormData({
      category: categoryId,
      selectedSymptoms: [],
      checkedRedFlags: [],
    });
  };

  const handleToggleSymptom = (symptom: string) => {
    const exists = formData.selectedSymptoms.includes(symptom);
    const updated = exists
      ? formData.selectedSymptoms.filter((s) => s !== symptom)
      : [...formData.selectedSymptoms, symptom];
    updateFormData({ selectedSymptoms: updated });
  };

  const handleToggleRedFlag = (flag: string) => {
    const exists = formData.checkedRedFlags.includes(flag);
    const updated = exists
      ? formData.checkedRedFlags.filter((f) => f !== flag)
      : [...formData.checkedRedFlags, flag];

    updateFormData({ checkedRedFlags: updated });

    if (updated.length > 0) {
      onTriggerEmergency(updated);
    }
  };

  const evaluation = evaluateTriage(
    formData.category,
    formData.selectedSymptoms,
    formData.checkedRedFlags,
    formData.severity
  );

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      case 'HeartPulse':
        return <HeartPulse className="w-5 h-5 text-rose-500" />;
      case 'Zap':
        return <Zap className="w-5 h-5 text-amber-500" />;
      case 'Gauge':
        return <Gauge className="w-5 h-5 text-teal-600" />;
      case 'Brain':
        return <Brain className="w-5 h-5 text-cyan-600" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  const durations = [
    { label: '< 24 Hours (Acute)', value: 'Sudden acute (<24h)' },
    { label: '1 - 7 Days', value: '1 to 7 days' },
    { label: '1 - 4 Weeks', value: '1 to 4 weeks' },
    { label: '1 - 6 Months', value: '1 to 6 months' },
    { label: '> 6 Months (Chronic)', value: 'Chronic (>6 months)' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Category Selector */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-[#3A506B] uppercase tracking-widest">
          1. Select Primary Neurological Complaint Category <span className="text-[#0D9488]">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {SYMPTOM_CATEGORIES.map((cat) => {
            const isSelected = formData.category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleSelectCategory(cat.id)}
                className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 group ${
                  isSelected
                    ? 'border-[#0D9488] bg-[#0D9488]/10 ring-2 ring-[#0D9488]/20 shadow-neural'
                    : 'border-[#3A506B]/10 bg-white hover:border-[#0D9488] hover:bg-[#0D9488]/5 shadow-sm'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                    isSelected ? 'bg-[#0D9488] text-white' : 'bg-slate-50 text-[#0D9488] group-hover:bg-[#0D9488]/20'
                  }`}
                >
                  {getCategoryIcon(cat.iconName)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-sm font-bold text-[#0B132B] truncate">{cat.name}</h4>
                    {isSelected && (
                      <span className="text-[10px] font-bold text-[#0D9488] bg-white px-1.5 py-0.5 rounded border border-[#0D9488]/30 shrink-0">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#3A506B] mt-0.5 line-clamp-2 leading-relaxed">{cat.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Red-Flag Emergency Screening Strip (Critical Safety Intercept) */}
      <div className="bg-[#EF4444]/10 border border-[#EF4444]/25 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EF4444] flex items-center justify-center text-white shrink-0 shadow-sm">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-heading font-extrabold text-[#EF4444] uppercase tracking-wide">
              Mandatory Red-Flag Safety Screening
            </h3>
            <p className="text-xs text-[#0B132B] font-medium leading-relaxed">
              Sudden facial droop, one-sided weakness, or the &ldquo;worst headache of your life&rdquo; requires immediate attention.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {currentCategory.redFlags.map((flag, idx) => {
            const isChecked = formData.checkedRedFlags.includes(flag);
            return (
              <label
                key={idx}
                className={`p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all flex items-start gap-2.5 ${
                  isChecked
                    ? 'border-[#EF4444] bg-[#EF4444] text-white shadow-md'
                    : 'border-[#EF4444]/30 bg-white text-slate-800 hover:bg-rose-50/70'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleToggleRedFlag(flag)}
                  className="mt-0.5 rounded text-[#EF4444] focus:ring-[#EF4444]"
                />
                <span className="leading-snug">{flag}</span>
              </label>
            );
          })}
        </div>

        {formData.checkedRedFlags.length > 0 && (
          <div className="p-3 bg-[#EF4444] text-white rounded-xl text-xs font-bold flex items-center justify-between">
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Emergency protocol activated. Standard booking locked.
            </span>
            <button
              type="button"
              onClick={() => onTriggerEmergency(formData.checkedRedFlags)}
              className="px-3 py-1 bg-white text-[#EF4444] rounded-lg text-xs hover:bg-slate-100"
            >
              Open ER Hotline
            </button>
          </div>
        )}
      </div>

      {/* 3. Specific Symptoms Checklist */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-heading font-bold text-[#0B132B]">
            2. Check Associated Symptoms (Optional Details)
          </label>
          <span className="text-xs text-slate-500">
            {formData.selectedSymptoms.length} selected
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {currentCategory.commonSymptoms.map((sym, idx) => {
            const isSelected = formData.selectedSymptoms.includes(sym);
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleToggleSymptom(sym)}
                className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 ${
                  isSelected
                    ? 'border-[#0D9488] bg-[#0D9488]/10 font-semibold text-[#0B132B]'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border ${
                    isSelected
                      ? 'bg-[#0D9488] border-[#0D9488] text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <span className="leading-snug">{sym}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Symptom Duration & Severity Scale */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-5 rounded-2xl border border-slate-200">
        {/* Duration */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
            Symptoms Duration <span className="text-[#0D9488]">*</span>
          </label>
          <div className="space-y-1.5">
            {durations.map((d) => (
              <label
                key={d.value}
                className={`flex items-center gap-2 p-2 rounded-lg border text-xs cursor-pointer transition-colors ${
                  formData.duration === d.value
                    ? 'border-[#0D9488] bg-[#0D9488]/5 font-semibold text-[#0B132B]'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="duration"
                  value={d.value}
                  checked={formData.duration === d.value}
                  onChange={(e) => updateFormData({ duration: e.target.value })}
                  className="text-[#0D9488] focus:ring-[#0D9488]"
                />
                <span>{d.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Severity Scale (1 - 10) */}
        <div className="space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Pain / Severity Index
              </label>
              <span className="text-sm font-heading font-extrabold text-[#0D9488]">
                {formData.severity} / 10
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mb-3">
              1 = Mild discomfort, 5 = Moderate affecting daily routine, 10 = Severe agonizing
            </p>

            <input
              type="range"
              min="1"
              max="10"
              value={formData.severity}
              onChange={(e) => updateFormData({ severity: parseInt(e.target.value) })}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0D9488]"
            />

            <div className="flex justify-between text-[10px] text-slate-400 font-semibold mt-1">
              <span>1 (Mild)</span>
              <span>5 (Moderate)</span>
              <span>10 (Severe)</span>
            </div>
          </div>

          {/* Clinical Guidance Note */}
          {currentCategory.guidanceNote && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
              <Info className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
              <span>{currentCategory.guidanceNote}</span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation CTA */}
      <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-3">
        <span className="text-xs text-[#3A506B] font-medium italic text-center sm:text-left">
          *Triage is for clinical prioritization, not a final medical diagnosis.
        </span>

        <button
          type="button"
          onClick={() => {
            if (formData.checkedRedFlags.length > 0) {
              onTriggerEmergency(formData.checkedRedFlags);
            } else {
              onNext();
            }
          }}
          className="w-full sm:w-auto px-7 py-3 bg-[#0D9488] text-white rounded-xl text-xs sm:text-sm font-bold shadow-neural hover:bg-[#0B7A6E] active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <span>Proceed to Slot Selection</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
