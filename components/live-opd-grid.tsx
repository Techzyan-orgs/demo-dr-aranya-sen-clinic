'use client';

import React, { useState, useEffect } from 'react';
import { Chamber } from '@/types/chamber';
import {
  Clock,
  MapPin,
  Phone,
  Calendar,
  Users,
  Activity,
  ChevronRight,
  RefreshCw,
  Video,
  Navigation,
  CheckCircle2,
} from 'lucide-react';

interface LiveOpdGridProps {
  onSelectChamber?: (chamberId: string) => void;
}

export function LiveOpdGrid({ onSelectChamber }: LiveOpdGridProps) {
  const [chambers, setChambers] = useState<Chamber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchChambers = async () => {
    try {
      setIsRefreshing(true);
      const res = await fetch('/api/chambers');
      if (res.ok) {
        const data = await res.json();
        setChambers(data.chambers || []);
        setLastRefreshed(new Date());
      }
    } catch (e) {
      console.error('Failed to fetch live chamber schedule', e);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        setIsRefreshing(true);
        const res = await fetch('/api/chambers');
        if (res.ok && isMounted) {
          const data = await res.json();
          setChambers(data.chambers || []);
          setLastRefreshed(new Date());
        }
      } catch (e) {
        console.error('Failed to fetch live chamber schedule', e);
      } finally {
        if (isMounted) {
          setIsLoading(false);
          setIsRefreshing(false);
        }
      }
    }

    loadData();
    // Auto-refresh every 45 seconds to keep queue and status updated
    const interval = setInterval(loadData, 45000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

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

  return (
    <section id="chambers" className="py-14 bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-[#3A506B] text-[11px] font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0D9488]"></span>
              Live OPD Dashboard
            </h2>
            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0B132B] tracking-tight">
              Hospital Chambers & Real-Time Queue
            </h3>
            <p className="text-xs sm:text-sm text-[#3A506B] mt-1 max-w-2xl">
              Track live consultation progress, available tokens, and chamber room allocations across Dr. Sen&apos;s affiliated hospital suites and tele-neurology clinic.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 hidden sm:inline font-medium">
              Updated: {lastRefreshed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
            <button
              onClick={fetchChambers}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#0B132B] bg-white border border-[#3A506B]/20 rounded-xl hover:bg-slate-50 hover:border-[#0D9488] transition-all shadow-sm disabled:opacity-50"
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
                  className={`bg-white rounded-2xl border border-[#3A506B]/10 shadow-neural flex flex-col justify-between overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                    isActive
                      ? 'border-l-4 border-l-[#10B981]'
                      : isStartingSoon
                      ? 'border-l-4 border-l-[#F59E0B]'
                      : 'border-l-4 border-l-slate-300'
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
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#10B981] text-white animate-pulse uppercase tracking-wider">
                          Live Now
                        </span>
                      )}
                      {isStartingSoon && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#F59E0B] text-white uppercase tracking-wider">
                          Starts Soon
                        </span>
                      )}
                      {isClosed && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-400 text-white uppercase tracking-wider">
                          Closed
                        </span>
                      )}
                      <span className="truncate text-[11px] font-medium">{chamber.statusText}</span>
                    </div>

                    {chamber.id === 'tele-neurology' ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-[#0D9488]">
                        <Video className="w-3 h-3" /> Tele-OPD
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-500 font-medium">
                        {chamber.floor}
                      </span>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-4 flex-1">
                    <div>
                      <h3 className="font-heading font-bold text-base text-[#0B132B] line-clamp-1">
                        {chamber.clinicName}
                      </h3>
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
                      <div className="bg-[#10B981]/5 border border-[#10B981]/20 rounded-xl p-2.5 text-center">
                        <div className="text-[10px] uppercase font-bold text-[#3A506B] tracking-wider">Current Token</div>
                        <div className="text-base font-heading font-extrabold text-[#0B132B]">
                          {isActive || isStartingSoon ? `#${chamber.currentQueue}` : '--'}
                        </div>
                        <div className="text-[10px] text-[#3A506B] font-medium">
                          {isActive ? 'Est. Wait: 20m' : 'Queue on deck'}
                        </div>
                      </div>
                      <div className="bg-[#0D9488]/5 border border-[#0D9488]/20 rounded-xl p-2.5 text-center">
                        <div className="text-[10px] uppercase font-bold text-[#3A506B] tracking-wider">Tokens Cap</div>
                        <div className="text-base font-heading font-extrabold text-[#0D9488]">
                          {chamber.totalTokensToday}
                        </div>
                        <div className="text-[10px] text-[#3A506B] font-medium">Slots / session</div>
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
                      className="flex-1 py-2.5 px-3.5 text-xs font-bold text-white bg-[#0D9488] hover:bg-[#0B7A6E] active:scale-98 transition-all rounded-xl shadow-neural flex items-center justify-center gap-1"
                    >
                      <span>Book Consultation</span>
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
              <strong>OPD Token Protocol:</strong> Emergency stroke and refractory seizure follow-ups are given priority token allocations upon arrival at hospital chambers.
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
