export interface BookingPayload {
  patientName: string;
  age: string;
  gender?: string;
  phone?: string;
  category: string;
  chamber: string;
  mode: 'physical' | 'tele';
  date: string;
  timeSlot: string;
  duration?: string;
  severity?: number;
  selectedSymptoms?: string[];
  previousConsultation?: boolean;
  emergencyContact?: string;
  isEmergencyReferral?: boolean;
}

export function generateWhatsAppLink(data: BookingPayload): string {
  // Dr. Aranya Sen's clinic WhatsApp official coordination desk
  const clinicPhone = '919830012345';

  const modeLabel = data.mode === 'tele' ? 'Tele-Neurology (Video Consultation)' : 'In-Person Chamber OPD';
  const prevLabel = data.previousConsultation ? 'Yes (Follow-up visit)' : 'No (First-time consultation)';
  const symptomsText = data.selectedSymptoms && data.selectedSymptoms.length > 0
    ? data.selectedSymptoms.map((s) => `  - ${s}`).join('\n')
    : '  - Not specified';

  const message = `*APPOINTMENT TRIAGE REQUEST*
-----------------------------
*Doctor:* Dr. Aranya Sen, DM (Neurology)
*Patient:* ${data.patientName} (${data.age} yrs${data.gender ? `, ${data.gender.toUpperCase()}` : ''})
*Contact Phone:* ${data.phone || 'N/A'}
*Consultation Mode:* ${modeLabel}
*Category:* ${data.category}
*Chamber/Center:* ${data.chamber}
*Preferred Slot:* ${data.date} at ${data.timeSlot}
-----------------------------
*CLINICAL SUMMARY:*
*Symptoms Duration:* ${data.duration || 'Not stated'}
*Pain/Severity Index:* ${data.severity ? `${data.severity}/10` : 'N/A'}
*Key Complaints:*
${symptomsText}
*Prior Neuro Consult:* ${prevLabel}
${data.emergencyContact ? `*Emergency Contact:* ${data.emergencyContact}\n` : ''}-----------------------------
*Note:* Generated via Dr. Sen's Neurological Clinical Triage Portal. Please confirm token availability & send chamber guidelines.`;

  return `https://wa.me/${clinicPhone}?text=${encodeURIComponent(message)}`;
}

export function getEmergencyHotlines() {
  return {
    nationalEmergency: '108',
    strokeRapidUnit: '+91 98300 99911',
    clinicDesk: '+91 98300 12345',
    apolloER: '+91 33 2320 2122',
  };
}
