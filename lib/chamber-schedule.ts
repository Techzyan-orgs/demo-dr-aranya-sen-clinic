import { Chamber } from '@/types/chamber';

export interface ChamberConfig {
  id: string;
  clinicName: string;
  location: string;
  address: string;
  days: string[];
  scheduleDays: number[]; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  timing: string;
  startMinutes: number; // minutes from 00:00 (e.g. 18:00 = 1080)
  endMinutes: number;   // minutes from 00:00 (e.g. 21:30 = 1290)
  startFormatted: string;
  endFormatted: string;
  totalTokensToday: number;
  contactNumber: string;
  mapQuery?: string;
  chamberRoom: string;
  chamberRoomShort: string;
  floor: string;
  slots: { time: string; token: string }[];
}

export const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const CHAMBER_CONFIGS: ChamberConfig[] = [
  {
    id: 'apollo-gleneagles',
    clinicName: 'Apollo Gleneagles Hospital',
    location: 'EM Bypass, Sector III, Salt Lake',
    address: '58 Canal Circular Road, Kolkata - 700054',
    days: ['Monday', 'Wednesday', 'Friday'],
    scheduleDays: [1, 3, 5],
    timing: '05:00 PM - 08:30 PM',
    startMinutes: 17 * 60, // 1020 (05:00 PM)
    endMinutes: 20 * 60 + 30, // 1230 (08:30 PM)
    startFormatted: '05:00 PM',
    endFormatted: '08:30 PM',
    totalTokensToday: 22,
    contactNumber: '+91 33 2320 3040',
    mapQuery: 'Apollo Gleneagles Hospitals Kolkata',
    chamberRoom: 'OPD Chamber 2A (1st Floor Neuro Block)',
    chamberRoomShort: 'Chamber 2A',
    floor: '1st Floor',
    slots: [
      { time: '05:00 PM', token: 'Token #02' },
      { time: '05:30 PM', token: 'Token #06' },
      { time: '06:00 PM', token: 'Token #09' },
      { time: '06:30 PM', token: 'Token #12' },
      { time: '07:00 PM', token: 'Token #15' },
      { time: '07:30 PM', token: 'Token #18' },
      { time: '08:00 PM', token: 'Token #21' },
    ],
  },
  {
    id: 'sen-brain-spine',
    clinicName: 'Sri Aurobindo Seva Kendra (EEDF)',
    location: 'Jodhpur Park (Near South City), South Kolkata',
    address: '1H, Gariahat Road South, Jodhpur Park, Kolkata - 700068',
    days: ['Tuesday', 'Thursday', 'Saturday'],
    scheduleDays: [2, 4, 6],
    timing: '06:00 PM - 09:30 PM',
    startMinutes: 18 * 60, // 1080 (06:00 PM)
    endMinutes: 21 * 60 + 30, // 1290 (09:30 PM)
    startFormatted: '06:00 PM',
    endFormatted: '09:30 PM',
    totalTokensToday: 18,
    contactNumber: '+91 33 2473 0300',
    mapQuery: 'Sri Aurobindo Seva Kendra Jodhpur Park Kolkata',
    chamberRoom: 'Neuro OPD Suite 101, Ground Floor',
    chamberRoomShort: 'Suite 101',
    floor: 'Ground Floor',
    slots: [
      { time: '06:00 PM', token: 'Token #01' },
      { time: '06:30 PM', token: 'Token #04' },
      { time: '07:00 PM', token: 'Token #07' },
      { time: '07:30 PM', token: 'Token #10' },
      { time: '08:00 PM', token: 'Token #13' },
      { time: '08:30 PM', token: 'Token #16' },
      { time: '09:00 PM', token: 'Token #18' },
    ],
  },
  {
    id: 'manipal-dhakuria',
    clinicName: 'Manipal Hospital (Dhakuria)',
    location: 'Dhakuria / Gariahat Connector, South Kolkata',
    address: 'P-4 & 5, CIT Scheme LXXII, Block-A, Gariahat, Kolkata - 700029',
    days: ['Saturday (Morning)', 'Sunday (Special OPD)'],
    scheduleDays: [6, 0],
    timing: '10:30 AM - 01:30 PM',
    startMinutes: 10 * 60 + 30, // 630 (10:30 AM)
    endMinutes: 13 * 60 + 30, // 810 (01:30 PM)
    startFormatted: '10:30 AM',
    endFormatted: '01:30 PM',
    totalTokensToday: 15,
    contactNumber: '+91 33 6680 0000',
    mapQuery: 'Manipal Hospital Dhakuria Kolkata',
    chamberRoom: 'Neuro Speciality Wing 3B',
    chamberRoomShort: 'Wing 3B',
    floor: '3rd Floor',
    slots: [
      { time: '10:30 AM', token: 'Token #01' },
      { time: '11:00 AM', token: 'Token #04' },
      { time: '11:30 AM', token: 'Token #07' },
      { time: '12:00 PM', token: 'Token #10' },
      { time: '12:30 PM', token: 'Token #12' },
      { time: '01:00 PM', token: 'Token #14' },
    ],
  },
  {
    id: 'tele-neurology',
    clinicName: 'Tele-Neurology Virtual Clinic',
    location: 'Secure HD Video Consult (Worldwide)',
    address: 'Encrypted Digital Neuro Consultation Room',
    days: ['Daily (Monday - Saturday)'],
    scheduleDays: [1, 2, 3, 4, 5, 6],
    timing: '02:00 PM - 04:30 PM',
    startMinutes: 14 * 60, // 840 (02:00 PM)
    endMinutes: 16 * 60 + 30, // 990 (04:30 PM)
    startFormatted: '02:00 PM',
    endFormatted: '04:30 PM',
    totalTokensToday: 8,
    contactNumber: '+91 98300 12345',
    chamberRoom: 'WebRTC Secure Video Portal',
    chamberRoomShort: 'Video Room',
    floor: 'Virtual',
    slots: [
      { time: '02:00 PM', token: 'Tele-Slot #1' },
      { time: '02:30 PM', token: 'Tele-Slot #2' },
      { time: '03:00 PM', token: 'Tele-Slot #3' },
      { time: '03:30 PM', token: 'Tele-Slot #4' },
      { time: '04:00 PM', token: 'Tele-Slot #5' },
    ],
  },
];

/**
 * Returns the current date and time extracted in Asia/Kolkata timezone (IST)
 */
export function getKolkataTimeInfo(baseDate: Date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false,
  }).formatToParts(baseDate);

  let weekday = 'Saturday';
  let hour = 18;
  let minute = 0;
  let second = 0;
  let month = 1;
  let day = 1;
  let year = 2026;

  for (const part of parts) {
    if (part.type === 'weekday') weekday = part.value;
    if (part.type === 'hour') hour = parseInt(part.value, 10);
    if (part.type === 'minute') minute = parseInt(part.value, 10);
    if (part.type === 'second') second = parseInt(part.value, 10);
    if (part.type === 'month') month = parseInt(part.value, 10);
    if (part.type === 'day') day = parseInt(part.value, 10);
    if (part.type === 'year') year = parseInt(part.value, 10);
  }

  // Handle midnight 24:00 edge case from some formatters
  if (hour === 24) hour = 0;

  const dayOfWeek = DAYS_OF_WEEK.indexOf(weekday);
  const totalMinutes = hour * 60 + minute;

  // Format friendly 12-hour string
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const pad = (n: number) => n.toString().padStart(2, '0');
  const formattedTime = `${pad(h12)}:${pad(minute)} ${ampm}`;

  return {
    weekday,
    dayOfWeek: dayOfWeek >= 0 ? dayOfWeek : 0,
    hour,
    minute,
    second,
    month,
    day,
    year,
    totalMinutes,
    formattedTime,
  };
}

/**
 * Computes live chamber status, active queues, and next session timings
 * based on current Indian Standard Time (Asia/Kolkata).
 */
export function getLiveChambers(baseDate: Date = new Date()): Chamber[] {
  const { dayOfWeek, totalMinutes } = getKolkataTimeInfo(baseDate);

  return CHAMBER_CONFIGS.map((cfg) => {
    const isOpenToday = cfg.scheduleDays.includes(dayOfWeek);

    // Helper to find the next scheduled operational day & time
    const getNextSessionText = (): string => {
      for (let offset = 1; offset <= 7; offset++) {
        const nextDayIdx = (dayOfWeek + offset) % 7;
        if (cfg.scheduleDays.includes(nextDayIdx)) {
          const nextDayName = DAYS_OF_WEEK[nextDayIdx];
          const label = offset === 1 ? `Tomorrow (${nextDayName})` : nextDayName;
          return `Resumes ${label} ${cfg.startFormatted}`;
        }
      }
      return `Resumes ${cfg.startFormatted}`;
    };

    let status: 'active' | 'starting_soon' | 'closed' = 'closed';
    let statusText = '';
    let currentQueue = 0;
    let slotsRemaining = cfg.totalTokensToday;
    let estWaitMinutes = 0;
    const nextSessionText = getNextSessionText();

    if (isOpenToday) {
      // 1. More than 60 minutes before start time today
      if (totalMinutes < cfg.startMinutes - 60) {
        status = 'closed';
        statusText = `Opens Today at ${cfg.startFormatted} • ${cfg.chamberRoomShort}`;
        currentQueue = 0;
        slotsRemaining = cfg.totalTokensToday;
      }
      // 2. Within 60 minutes prior to session start
      else if (totalMinutes < cfg.startMinutes) {
        status = 'starting_soon';
        const minsLeft = cfg.startMinutes - totalMinutes;
        statusText =
          minsLeft <= 1
            ? `Opening any minute (${cfg.startFormatted}) • Token Desk Open`
            : `Starts in ${minsLeft}m (${cfg.startFormatted}) • Token Desk Open`;
        currentQueue = 1;
        slotsRemaining = cfg.totalTokensToday;
        estWaitMinutes = 10;
      }
      // 3. Consultation actively ongoing
      else if (totalMinutes < cfg.endMinutes) {
        status = 'active';
        const elapsed = totalMinutes - cfg.startMinutes;
        const totalDuration = cfg.endMinutes - cfg.startMinutes;
        const progress = Math.min(1, Math.max(0, elapsed / totalDuration));

        // Progressive queue count
        const tokenNum = Math.min(
          cfg.totalTokensToday,
          Math.max(1, Math.floor(progress * cfg.totalTokensToday) + 1)
        );
        currentQueue = tokenNum;
        slotsRemaining = Math.max(0, cfg.totalTokensToday - tokenNum);
        estWaitMinutes = 15;

        statusText = `Consultation Ongoing • ${cfg.chamberRoomShort} (${slotsRemaining} slots remaining)`;
      }
      // 4. Session concluded for today
      else {
        status = 'closed';
        statusText = `Session Ended • ${nextSessionText}`;
        currentQueue = 0;
        slotsRemaining = 0;
      }
    } else {
      // Not scheduled for today
      status = 'closed';
      statusText = `Closed • ${nextSessionText}`;
      currentQueue = 0;
      slotsRemaining = 0;
    }

    return {
      id: cfg.id,
      clinicName: cfg.clinicName,
      location: cfg.location,
      address: cfg.address,
      days: cfg.days,
      timing: cfg.timing,
      status,
      statusText,
      currentQueue,
      totalTokensToday: cfg.totalTokensToday,
      contactNumber: cfg.contactNumber,
      mapQuery: cfg.mapQuery,
      chamberRoom: cfg.chamberRoom,
      floor: cfg.floor,
      isOpenToday,
      nextSessionText,
      slotsRemaining,
      estWaitMinutes,
      slots: cfg.slots,
    };
  });
}
