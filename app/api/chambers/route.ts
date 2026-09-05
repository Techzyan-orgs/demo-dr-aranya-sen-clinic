import { NextResponse } from 'next/server';
import { getLiveChambers, getKolkataTimeInfo } from '@/lib/chamber-schedule';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const testTime = searchParams.get('testTime');
  
  const baseDate = testTime ? new Date(testTime) : new Date();
  const timeInfo = getKolkataTimeInfo(baseDate);
  const liveChambers = getLiveChambers(baseDate);

  const activeChambers = liveChambers.filter((c) => c.status === 'active');
  const startingSoonChambers = liveChambers.filter((c) => c.status === 'starting_soon');

  return NextResponse.json(
    {
      timestamp: baseDate.toISOString(),
      timezone: 'Asia/Kolkata',
      clinicTime: {
        formattedTime: timeInfo.formattedTime,
        weekday: timeInfo.weekday,
        day: timeInfo.day,
        month: timeInfo.month,
        year: timeInfo.year,
        hour: timeInfo.hour,
        minute: timeInfo.minute,
      },
      hasActiveSession: activeChambers.length > 0,
      hasStartingSoonSession: startingSoonChambers.length > 0,
      doctor: {
        name: 'Dr. Aranya Sen',
        degrees: 'DM (Neurology), MD (Medicine), MBBS',
        designation: 'Senior Consultant Neurologist & Stroke Specialist',
        experienceYears: 14,
        registrationNo: 'WBMC-62419',
        affiliations: [
          'AIIMS (New Delhi) Alum',
          'Head of Stroke & Neurovascular Unit',
          'Indian Academy of Neurology (IAN) Fellow',
        ],
      },
      chambers: liveChambers,
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    }
  );
}
