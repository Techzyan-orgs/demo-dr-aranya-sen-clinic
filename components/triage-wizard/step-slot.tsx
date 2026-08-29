'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  Building,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { PatientFormData } from '@/types/triage';
import { Chamber } from '@/types/chamber';

interface StepSlotProps {
  formData: PatientFormData;
  updateFormData: (updates: Partial<PatientFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function StepSlot({ formData, updateFormData, onNext, onPrev }: StepSlotProps) {
  const [chambers, setChambers] = useState<Chamber[]>([]);
  const [loading, setLoading] = useState(true);

  // Generate next 10 dates for interactive booking
  const getNextDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 10; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dates.push(d);
    }
    return dates;
  };

  const upcomingDates = getNextDates();

  useEffect(() => {
    async function loadChambers() {
      try {
        const res = await fetch('/api/chambers');
        if (res.ok) {
          const data = await res.json();
          setChambers(data.chambers || []);
          // Set default chamber if not set
          if (!formData.chamberId && data.chambers?.length > 0) {
            updateFormData({ chamberId: data.chambers[0].id });
          }
        }
      } catch (err) {
        console.error('Failed to load chambers in StepSlot', err);
      } finally {
        setLoading(false);
      }
    }
    loadChambers();
  }, [formData.chamberId, updateFormData]);

  const selectedChamber =
    chambers.find((c) => c.id === formData.chamberId) || chambers[0];

  // Generate slot options based on mode & chamber
  const physicalSlots = [
    { time: '05:00 PM', status: 'available', token: 'Token #04' },
    { time: '05:30 PM', status: 'available', token: 'Token #06' },
    { time: '06:00 PM', status: 'available', token: 'Token #09' },
    { time: '06:30 PM', status: 'filling_fast', token: 'Token #11' },
    { time: '07:00 PM', status: 'available', token: 'Token #14' },
    { time: '07:30 PM', status: 'available', token: 'Token #17' },
    { time: '08:00 PM', status: 'available', token: 'Token #20' },
  ];

  const teleSlots = [
    { time: '02:00 PM', status: 'available', token: 'Tele-Slot #1' },
    { time: '02:30 PM', status: 'available', token: 'Tele-Slot #2' },
    { time: '03:00 PM', status: 'filling_fast', token: 'Tele-Slot #3' },
    { time: '03:30 PM', status: 'available', token: 'Tele-Slot #4' },
    { time: '04:00 PM', status: 'available', token: 'Tele-Slot #5' },
  ];

  const slots = formData.mode === 'tele' ? teleSlots : physicalSlots;

  const handleModeChange = (mode: 'physical' | 'tele') => {
    updateFormData({
      mode,
      chamberId: mode === 'tele' ? 'tele-neurology' : chambers[0]?.id || 'apollo-gleneagles',
    });
  };

  const formatDateLabel = (d: Date) => {
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Consultation Mode Selector */}
      <div className="space-y-3">
        <label className="block text-sm font-heading font-bold text-[#0B132B]">
          1. Choose Consultation Type <span className="text-[#0D9488]">*</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleModeChange('physical')}
            className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 ${
              formData.mode === 'physical'
                ? 'border-[#0D9488] bg-[#0D9488]/10 ring-2 ring-[#0D9488]/20 shadow-sm'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div
              className={`p-2.5 rounded-lg ${
                formData.mode === 'physical'
                  ? 'bg-[#0D9488] text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              <Building className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-[#0B132B]">In-Person Hospital Chamber</h4>
                {formData.mode === 'physical' && (
                  <span className="text-[10px] font-bold text-[#0D9488] bg-white px-2 py-0.5 rounded-full border border-[#0D9488]/30">
                    Active
                  </span>
                )}
              </div>
              <p className="text-xs text-[#3A506B] mt-0.5">
                Physical neurological exam, reflex testing, live OPD tokens.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleModeChange('tele')}
            className={`p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 ${
              formData.mode === 'tele'
                ? 'border-[#0D9488] bg-[#0D9488]/10 ring-2 ring-[#0D9488]/20 shadow-sm'
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div
              className={`p-2.5 rounded-lg ${
                formData.mode === 'tele'
                  ? 'bg-[#0D9488] text-white'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold text-[#0B132B]">Tele-Neurology (Video Consult)</h4>
                {formData.mode === 'tele' && (
                  <span className="text-[10px] font-bold text-[#0D9488] bg-white px-2 py-0.5 rounded-full border border-[#0D9488]/30">
                    Active
                  </span>
                )}
              </div>
              <p className="text-xs text-[#3A506B] mt-0.5">
                Encrypted HD video consult, report analysis, digital prescription.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* 2. Chamber Location Selection (for Physical mode) */}
      {formData.mode === 'physical' && (
        <div className="space-y-3">
          <label className="block text-sm font-heading font-bold text-[#0B132B]">
            2. Select Chamber Location <span className="text-[#0D9488]">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {chambers
              .filter((c) => c.id !== 'tele-neurology')
              .map((c) => {
                const isSelected = formData.chamberId === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => updateFormData({ chamberId: c.id })}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#0D9488] bg-[#0D9488]/5 ring-2 ring-[#0D9488]/20 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[#0B132B] truncate">{c.clinicName}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                          c.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {c.status === 'active' ? 'Active OPD' : 'Weekly'}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1 mb-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span className="truncate">{c.location}</span>
                    </div>
                    <div className="text-[11px] text-[#0D9488] font-medium truncate">
                      {c.days.join(', ')}
                    </div>
                  </button>
                );
              })}
          </div>
        </div>
      )}

      {/* 3. Interactive Date Picker */}
      <div className="space-y-3">
        <label className="block text-sm font-heading font-bold text-[#0B132B]">
          3. Select Preferred Appointment Date <span className="text-[#0D9488]">*</span>
        </label>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {upcomingDates.map((d, index) => {
            const dateStr = d.toISOString().split('T')[0];
            const isSelected = formData.date === dateStr;
            const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
            const dayNum = d.getDate();
            const monthName = d.toLocaleDateString('en-US', { month: 'short' });

            return (
              <button
                key={index}
                type="button"
                onClick={() => updateFormData({ date: dateStr })}
                className={`flex-shrink-0 w-20 py-3 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'border-[#0D9488] bg-[#0D9488] text-white shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className={`text-[11px] font-semibold uppercase ${isSelected ? 'text-teal-100' : 'text-slate-400'}`}>
                  {dayName}
                </div>
                <div className="text-lg font-heading font-extrabold my-0.5">
                  {dayNum}
                </div>
                <div className={`text-[10px] ${isSelected ? 'text-teal-100' : 'text-slate-500'}`}>
                  {monthName}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Time Slot Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-heading font-bold text-[#0B132B]">
            4. Select Available Time Slot & OPD Token <span className="text-[#0D9488]">*</span>
          </label>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#0D9488]" /> Approximate consultation window
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
          {slots.map((slot, idx) => {
            const isSelected = formData.timeSlot === slot.time;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => updateFormData({ timeSlot: slot.time })}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#0D9488] bg-[#0D9488]/10 ring-2 ring-[#0D9488]/20 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0B132B]">{slot.time}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-[#0D9488]" />}
                </div>
                <div className="text-[10px] font-semibold text-[#0D9488] mt-1">
                  {slot.token}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chamber Info Recap Strip */}
      {selectedChamber && (
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="font-bold text-[#0B132B]">
              {selectedChamber.clinicName} ({selectedChamber.timing})
            </div>
            <div className="text-[11px] text-slate-500">
              {selectedChamber.address}
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-[#0D9488] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" /> Tokens confirmed upon WhatsApp verification
          </div>
        </div>
      )}

      {/* Navigation CTA */}
      <div className="p-4 sm:p-5 bg-slate-50 border border-slate-200/80 rounded-2xl flex flex-col sm:flex-row justify-between items-center gap-3">
        <button
          type="button"
          onClick={onPrev}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-heading font-semibold text-xs text-slate-700 bg-white border border-[#3A506B]/20 hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Symptoms</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="w-full sm:w-auto px-7 py-3 bg-[#0D9488] text-white rounded-xl text-xs sm:text-sm font-bold shadow-neural hover:bg-[#0B7A6E] active:scale-98 transition-all flex items-center justify-center gap-2"
        >
          <span>Continue to Patient Details</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
