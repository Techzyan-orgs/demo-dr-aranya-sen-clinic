export type TriageUrgency = 'emergency' | 'urgent' | 'routine';

export interface SymptomCategory {
  id: string;
  name: string;
  description: string;
  iconName: string;
  commonSymptoms: string[];
  redFlags: string[];
  guidanceNote?: string;
}

export interface PatientFormData {
  fullName: string;
  age: string;
  gender: 'male' | 'female' | 'other' | '';
  phone: string;
  email?: string;
  category: string;
  selectedSymptoms: string[];
  checkedRedFlags: string[];
  duration: string;
  severity: number; // 1 - 10
  previousConsultation: boolean;
  previousDetails?: string;
  mode: 'physical' | 'tele';
  chamberId: string;
  date: string;
  timeSlot: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  additionalNotes?: string;
}

export interface TriageEvaluation {
  urgency: TriageUrgency;
  isRedFlag: boolean;
  redFlagTriggers: string[];
  recommendation: string;
  protocolBadge: string;
  priorityOrder: number;
}
