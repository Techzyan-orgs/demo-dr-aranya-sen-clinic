'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Chamber } from '@/types/chamber';
import { getLiveChambers, getKolkataTimeInfo } from '@/lib/chamber-schedule';
import {
  Clock,
  MapPin,
  Phone,
  Calendar,
  Activity,
  ChevronRight,
  RefreshCw,
  Video,
  Navigation,
  CheckCircle2,
  Sparkles,
  AlertCircle,
} from 'lucide-react';

interface LiveOpdGridProps {
  onSelectChamber?: (chamberId: string) => void;
}

export function LiveOpdGrid({ onSelectChamber }: LiveOpdGridProps) {
  // Initialize immediately with current live calculated chambers
  const [chambers, setChambers] = useState<Chamber[]>(() => getLiveChambers());
  const [timeInfo, setTimeInfo] = useState(() => getKolkataTimeInfo());
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(() => new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sync with server API or local live engine
  const fetchChambers = useCallback(async (manual = false) => {
    try {
      if (manual) setIsRefreshing(true);
      const res = await fetch(`/api/chambers?t=${Date.now()}`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        if (data.chambers && Array.isArray(data.chambers)) {
          setChambers(data.chambers);
        }
      } else {
        // Fallback to local live calculation
        setChambers(getLiveChambers());
      }
      setTimeInfo(getKolkataTimeInfo());
      setLastRefreshed(new Date());
    } catch (e) {
      console.warn('Network sync failed, falling back to local live chamber engine', e);
      setChambers(getLiveChambers());
      setTimeInfo(getKolkataTimeInfo());
    } finally {
      if (manual) setIsRefreshing(false);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch to sync server metadata
    fetchChambers(false);

    // Dynamic timer: check every 15 seconds so exact minute transitions (e.g. 06:00 PM start)
    // trigger instantaneous live status update without waiting
    const interval = setInterval(() => {
      setTimeInfo(getKolkataTimeInfo());
      setChambers(getLiveChambers());
      setLastRefreshed(new Date());
    }, 15000);

    return () => clearInterval(interval);
  }, [fetchChambers]);

  const handleBookChamber = (chamberId: string) => {
    if (onSelectChamber) {
      onSelectChamber(chamberId);
    }
    // Scroll to triage section smoothly
    const triageEl = document.getElementById('triage');
    if (triageEl) {
      triageEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const hasAnyActive = chambers.some((c) => c.status === 'active');
  const hasAnyStartingSoon = chambers.some((c) => c.status === 'starting_soon');

  return (
    <section id="chambers" className="py-14 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#0D9488]/10 text-[#0D9488] border border-[#0D9488]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488] animate-pulse"></span>
                Live OPD Feed • IST
              </span>
              {hasAnyActive && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping"></span>
                  Doctor In Session Now
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0B132B] tracking-tight">
              Hospital Chambers & Real-Time Queue
            </h3>
            <p className="text-xs sm:text-sm text-[#3A506B] mt-1 max-w-2xl">
              Live consultation tracking and token allocation for Dr. Sen&apos;s hospital OPD suites and tele-neurology clinic. Automatically synchronised to Indian Standard Time (Kolkata).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Live Clock Strip */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-sm text-xs font-semibold text-[#0B132B]">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${hasAnyActive ? 'bg-[#10B981]' : 'bg-[#0D9488]'}`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${hasAnyActive ? 'bg-[#10B981]' : 'bg-[#0D9488]'}`} />
              </span>
              <span className="text-slate-500 font-medium">Clinic Time:</span>
              <span className="text-[#0D9488] font-bold">{timeInfo.formattedTime} IST</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-700">{timeInfo.weekday}</span>
            </div>

            <button
              onClick={() => fetchChambers(true)}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#0B132B] bg-white border border-[#3A506B]/20 rounded-xl hover:bg-slate-50 hover:border-[#0D9488] transition-all shadow-sm disabled:opacity-50 active:scale-95"
              title="Refresh Live Token Status"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-[#0D9488] ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh Status</span>
            </button>
          </div>
        </div>

        {/* Chambers Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-64 bg-white rounded-2xl border border-[#3A506B]/10 shadow-neural animate-pulse p-6" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {chambers.map((chamber) => {
              const isActive = chamber.status === 'active';
              const isStartingSoon = chamber.status === 'starting_soon';
              const isClosed = chamber.status === 'closed';

              return (
                <div
                  key={chamber.id}
                  className={`bg-white rounded-2xl border shadow-neural flex flex-col justify-between overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                    isActive
                      ? 'border-l-4 border-l-[#10B981] border-[#10B981]/30 ring-1 ring-[#10B981]/15'
                      : isStartingSoon
                      ? 'border-l-4 border-l-[#F59E0B] border-[#F59E0B]/30 ring-1 ring-[#F59E0B]/15'
                      : 'border-l-4 border-l-slate-300 border-[#3A506B]/10'
                  }`}
                >
                  {/* Status Banner */}
                  <div
                    className={`px-4 py-2.5 text-xs font-semibold flex items-center justify-between border-b ${
                      isActive
                        ? 'bg-[#10B981]/10 text-[#0f766e] border-[#10B981]/20'
                        : isStartingSoon
                        ? 'bg-[#F59E0B]/10 text-[#B45309] border-[#F59E0B]/20'
                        : 'bg-slate-50 text-slate-600 border-slate-200/70'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      {isActive && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#10B981] text-white animate-pulse uppercase tracking-wider flex items-center gap-1 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                          Live Now
                        </span>
                      )}
                      {isStartingSoon && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F59E0B] text-white uppercase tracking-wider shadow-sm">
                          Starts Soon
                        </span>
                      )}
                      {isClosed && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-400 text-white uppercase tracking-wider">
                          Closed
                        </span>
                      )}
                      <span className="truncate text-[11px] font-medium" title={chamber.statusText}>
                        {chamber.statusText}
                      </span>
                    </div>

                    {chamber.id === 'tele-neurology' ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-[#0D9488] shrink-0 ml-1">
                        <Video className="w-3 h-3" /> Tele-OPD
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-500 font-medium shrink-0 ml-1">
                        {chamber.floor}
                      </span>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-4 flex-1">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-heading font-bold text-base text-[#0B132B] line-clamp-1">
                          {chamber.clinicName}
                        </h3>
                        {chamber.isOpenToday && (
                          <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-teal-50 text-[#0D9488] border border-[#0D9488]/20 shrink-0">
                            Today
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#3A506B] flex items-center gap-1 mt-1 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="line-clamp-1">{chamber.location}</span>
                      </p>
                    </div>

                    {/* Schedule Details */}
                    <div className="space-y-2 text-xs bg-[#F8FAFC] p-3 rounded-xl border border-slate-200/60">
                      <div className="flex items-center justify-between text-slate-700">
                        <span className="flex items-center gap-1 text-slate-500">
                          <Calendar className="w-3.5 h-3.5 text-[#0D9488]" /> Days:
                        </span>
                        <span className="font-medium text-right truncate max-w-[140px] text-[#0B132B]">
                          {chamber.days.join(', ')}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-700">
                        <span className="flex items-center gap-1 text-slate-500">
                          <Clock className="w-3.5 h-3.5 text-[#0D9488]" /> Timing:
                        </span>
                        <span className="font-bold text-[#0B132B]">
                          {chamber.timing}
                        </span>
                      </div>
                    </div>

                    {/* Token Queue Stats */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <div
                        className={`rounded-xl p-2.5 text-center border ${
                          isActive
                            ? 'bg-[#10B981]/5 border-[#10B981]/25'
                            : isStartingSoon
                            ? 'bg-[#F59E0B]/5 border-[#F59E0B]/25'
                            : 'bg-slate-50 border-slate-200/60'
                        }`}
                      >
                        <div className="text-[10px] uppercase font-bold text-[#3A506B] tracking-wider">
                          Current Token
                        </div>
                        <div
                          className={`text-base font-heading font-extrabold ${
                            isActive
                              ? 'text-[#0B132B]'
                              : isStartingSoon
                              ? 'text-[#B45309]'
                              : 'text-slate-400'
                          }`}
                        >
                          {isActive
                            ? `#${chamber.currentQueue}`
                            : isStartingSoon
                            ? '#01'
                            : '--'}
                        </div>
                        <div className="text-[10px] text-[#3A506B] font-medium truncate">
                          {isActive
                            ? 'In Session'
                            : isStartingSoon
                            ? 'Desk Open'
                            : 'Queue Closed'}
                        </div>
                      </div>

                      <div className="bg-[#0D9488]/5 border border-[#0D9488]/20 rounded-xl p-2.5 text-center">
                        <div className="text-[10px] uppercase font-bold text-[#3A506B] tracking-wider">
                          Tokens Cap
                        </div>
                        <div className="text-base font-heading font-extrabold text-[#0D9488]">
                          {chamber.totalTokensToday}
                        </div>
                        <div className="text-[10px] text-[#3A506B] font-medium truncate">
                          {isActive && typeof chamber.slotsRemaining === 'number'
                            ? `${chamber.slotsRemaining} slots left`
                            : 'Slots / session'}
                        </div>
                      </div>
                    </div>

                    {/* Chamber Room Info */}
                    {chamber.chamberRoom && (
                      <p className="text-[11px] text-[#3A506B] font-medium flex items-center gap-1">
                        <Activity className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                        <span className="truncate">{chamber.chamberRoom}</span>
                      </p>
                    )}
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => handleBookChamber(chamber.id)}
                      className={`flex-1 py-2.5 px-3.5 text-xs font-bold rounded-xl transition-all shadow-neural flex items-center justify-center gap-1 active:scale-98 ${
                        isActive
                          ? 'text-white bg-[#0D9488] hover:bg-[#0B7A6E]'
                          : isStartingSoon
                          ? 'text-white bg-[#0D9488] hover:bg-[#0B7A6E]'
                          : 'text-slate-700 bg-white border border-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      <span>
                        {isActive
                          ? 'Join Live OPD Queue'
                          : isStartingSoon
                          ? 'Get Early Token'
                          : 'Book Next Session'}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={`tel:${chamber.contactNumber}`}
                      className="p-2.5 rounded-xl text-[#0B132B] bg-white border border-[#3A506B]/15 hover:bg-slate-100 hover:border-[#0D9488] transition-colors"
                      title={`Call ${chamber.clinicName}`}
                    >
                      <Phone className="w-4 h-4 text-[#0D9488]" />
                    </a>

                    {chamber.mapQuery && (
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          chamber.mapQuery
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl text-slate-700 bg-white border border-[#3A506B]/15 hover:bg-slate-100 hover:border-[#0D9488] transition-colors"
                        title="Directions on Google Maps"
                      >
                        <Navigation className="w-4 h-4 text-slate-600" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Live OPD Advisory Banner */}
        <div className="mt-8 p-4 rounded-xl bg-white border border-[#3A506B]/20 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
            <span>
              <strong>Real-Time Token Advisory:</strong> Live queue positions update automatically. Acute stroke evaluations and post-discharge neurology reviews receive prioritized triage allocations.
            </span>
          </div>
          <a
            href="tel:+919830012345"
            className="font-semibold text-[#0D9488] hover:underline whitespace-nowrap"
          >
            Direct Helpdesk: +91 98300 12345 &rarr;
          </a>
        </div>

      </div>
    </section>
  );
}
