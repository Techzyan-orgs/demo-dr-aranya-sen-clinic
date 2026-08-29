import { SymptomCategory, TriageEvaluation } from '@/types/triage';

export const SYMPTOM_CATEGORIES: SymptomCategory[] = [
  {
    id: 'headache-migraine',
    name: 'Headache & Migraine',
    description: 'Chronic migraine, cluster headache, tension headache, facial pain, or persistent pressure.',
    iconName: 'Activity',
    commonSymptoms: [
      'Unilateral throbbing headache with light/sound sensitivity',
      'Visual aura, zigzag lines, or blind spots before headache',
      'Chronic daily headache (>15 days/month)',
      'Sharp stabbing shock-like pain on face / Trigeminal neuralgia',
      'Band-like tight pressure around temples & neck',
    ],
    redFlags: [
      'Sudden worst headache of life (Thunderclap - peak < 1 min)',
      'Headache with high fever, stiff neck & altered sensorium',
      'Progressive headache worse with coughing/straining & morning vomiting',
      'New onset headache with history of cancer or immunosuppression',
    ],
    guidanceNote: 'If you experience severe sudden onset ("Thunderclap"), immediate emergency hospital evaluation is critical to rule out subarachnoid hemorrhage.',
  },
  {
    id: 'stroke-vascular',
    name: 'Stroke & Vascular Deficits',
    description: 'Transient ischemic attacks (TIA), stroke recovery, post-stroke spasticity, carotid stenosis.',
    iconName: 'HeartPulse',
    commonSymptoms: [
      'Post-stroke rehabilitation & mobility management',
      'Secondary stroke prevention & medication review',
      'Transient tingling or numbness in arm/leg that resolved',
      'Post-stroke speech therapy & cognitive follow-up',
      'Vascular risk factor management (Carotid bruit / AFib)',
    ],
    redFlags: [
      'Sudden one-sided weakness / facial droop (FAST alert)',
      'Sudden slurred speech, confusion, or inability to comprehend',
      'Sudden loss of balance, vertigo, or inability to walk',
      'Sudden blindness or dark curtain in one eye (Amaurosis fugax)',
    ],
    guidanceNote: 'Stroke is a medical emergency. Every minute counts (Golden 4.5 Hour Window for IV Thrombolysis).',
  },
  {
    id: 'seizures-epilepsy',
    name: 'Seizures & Epilepsy',
    description: 'Generalized tonic-clonic seizures, focal epilepsy, absence spells, syncope vs seizure.',
    iconName: 'Zap',
    commonSymptoms: [
      'Recurrent episodes of brief unresponsiveness or lip smacking',
      'Post-ictal confusion, tongue bite, or muscle soreness',
      'Myoclonic jerks (sudden morning arm twitches/dropping items)',
      'Follow-up for antiepileptic drug (AED) dosage & EEG review',
      'Fainting spells (syncope) vs epileptic seizure differentiation',
    ],
    redFlags: [
      'Uncontrolled active seizures / Status epilepticus (>5 mins continuous or back-to-back)',
      'First-ever seizure with persistent drowsiness or focal weakness',
      'Seizure in pregnancy or with high fever/rash',
      'Severe head trauma with loss of consciousness > 5 minutes',
    ],
    guidanceNote: 'Do not insert anything into the mouth during an active seizure. Place the patient in a lateral recovery position and dial emergency.',
  },
  {
    id: 'movement-tremors',
    name: 'Movement & Tremors',
    description: "Parkinson's disease, essential tremor, dystonia, chorea, gait unsteadiness, restless legs.",
    iconName: 'Gauge',
    commonSymptoms: [
      'Resting tremor in hand (pill-rolling) or chin tremor',
      'Slowness of movements (bradykinesia) & shuffling small steps',
      'Muscle stiffness, rigidity, and loss of arm swing while walking',
      'Involuntary neck turning (cervical dystonia) or eyelid spasms (blepharospasm)',
      'Severe creeping/uncomfortable leg sensations at night (RLS)',
    ],
    redFlags: [
      'Acute rapidly progressive freezing of gait with frequent falls',
      'Sudden onset severe generalized chorea or ballismus',
      'Neuroleptic Malignant Syndrome signs (High fever, severe rigidity, confusion)',
    ],
    guidanceNote: 'Routine consultations are ideal for baseline Unified Parkinson\'s Disease Rating Scale (UPDRS) scoring and medication titration.',
  },
  {
    id: 'memory-cognitive',
    name: 'Memory & Cognitive Disorders',
    description: "Alzheimer's disease, frontotemporal dementia, mild cognitive impairment, normal pressure hydrocephalus.",
    iconName: 'Brain',
    commonSymptoms: [
      'Progressive short-term memory loss (repeating same questions)',
      'Difficulty managing finances, medications, or navigation in familiar streets',
      'Word-finding difficulty (aphasia) and behavioral changes',
      'Triad of memory decline, urinary urgency, and gait magnetic unsteadiness (NPH screening)',
      'Brain fog, post-viral cognitive fatigue, or sleep disturbances',
    ],
    redFlags: [
      'Acute sudden delirium / disorientation over hours to days',
      'Rapid cognitive decline over a few weeks with myoclonus (Prion/Autoimmune encephalitis concern)',
      'Severe agitation, hallucinations, or acute personality shift',
    ],
    guidanceNote: 'Please bring prior MRI/CT scans, blood test reports, and a close family member/caregiver to the OPD session.',
  },
  {
    id: 'spine-nerve-pain',
    name: 'Spine & Peripheral Nerve Disorders',
    description: 'Sciatica, cervical radiculopathy, diabetic neuropathy, myasthenia gravis, carpal tunnel.',
    iconName: 'Activity',
    commonSymptoms: [
      'Radiating electric pain from lower back down to leg/foot (Sciatica)',
      'Neck pain radiating down arm with tingling in fingers',
      'Burning sensation, pins and needles, or numbness in feet (Diabetic neuropathy)',
      'Drooping eyelids and fluctuating muscle weakness worse toward evening (Myasthenia)',
      'Hand numbness waking you at night (Carpal tunnel syndrome)',
    ],
    redFlags: [
      'Sudden loss of bowel or bladder control (Cauda Equina Syndrome)',
      'Rapidly ascending weakness from legs to arms over hours/days (Guillain-Barré Syndrome)',
      'Sudden foot drop or inability to bear weight on legs',
      'Severe shortness of breath accompanied by general muscle weakness',
    ],
    guidanceNote: 'Nerve Conduction Studies (NCS) and Electromyography (EMG) facilities are available at Dr. Sen’s affiliated clinics.',
  },
];

export function evaluateTriage(
  categoryId: string,
  selectedSymptoms: string[],
  checkedRedFlags: string[],
  severity: number
): TriageEvaluation {
  // If ANY red flag is selected: immediate EMERGENCY
  if (checkedRedFlags.length > 0) {
    return {
      urgency: 'emergency',
      isRedFlag: true,
      redFlagTriggers: checkedRedFlags,
      recommendation:
        'RED-FLAG SYMPTOMS DETECTED: Proceed immediately to the nearest Emergency Room or dial Emergency Helpline 108. Standard outpatient booking is locked for clinical patient safety.',
      protocolBadge: 'CRITICAL EMERGENCY PROTOCOL',
      priorityOrder: 1,
    };
  }

  // If severity is >= 8 or specific category high urgency
  if (severity >= 8 || selectedSymptoms.length >= 3) {
    return {
      urgency: 'urgent',
      isRedFlag: false,
      redFlagTriggers: [],
      recommendation:
        'Sub-acute Neurological Priority: High-priority OPD consultation recommended within 24 to 48 hours.',
      protocolBadge: 'PRIORITY CLINICAL OPD',
      priorityOrder: 2,
    };
  }

  return {
    urgency: 'routine',
    isRedFlag: false,
    redFlagTriggers: [],
    recommendation:
      'Standard Neurological OPD Consultation: Comprehensive evaluation, diagnostic review, and tailored management plan.',
    protocolBadge: 'ROUTINE OPD CONSULT',
    priorityOrder: 3,
  };
}
