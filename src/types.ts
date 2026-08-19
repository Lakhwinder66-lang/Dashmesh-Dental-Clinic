export interface DentalService {
  id: string;
  name: string;
  category: 'Restorative' | 'Cosmetic' | 'Surgical' | 'Preventive' | 'Orthodontic';
  tagline: string;
  description: string;
  duration: string;
  priceRange: string;
  painRating: 'Zero Pain (Under Local Anesthesia)' | 'Minimal Discomfort' | 'Completely Painless';
  features: string[];
  postCare: string[];
  icon: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  treatment?: string;
  likes?: number;
}

export interface Appointment {
  id: string;
  opdNo: string;
  patientName: string;
  phone: string;
  age: number;
  gender: string;
  service: string;
  doctor: string;
  date: string;
  time: string;
  tokenNo: number;
  status: 'Confirmed' | 'Completed' | 'Pending';
  notes?: string;
  createdAt: string;
}

export interface ToothCondition {
  id: number; // 1 to 32
  fdiNumber: number; // FDI standard 11-48
  name: string;
  arch: 'Upper' | 'Lower';
  status: 'Normal' | 'Cavity / Decay' | 'RCT Required' | 'Crowned / Capped' | 'Missing / Extracted' | 'Filling Done';
  notes?: string;
}

export interface OPDSlipData {
  opdNo: string;
  date: string;
  patientName: string;
  age: number;
  gender: string;
  phone: string;
  address: string;
  chiefComplaint: string;
  clinicalHistory: string;
  provisionalDiagnosis: string;
  prescribedMedicines: Array<{
    name: string;
    dosage: string;
    duration: string;
    instructions: string;
  }>;
  teethNotes: Record<number, string>;
  selectedTeeth: number[];
  doctorName: string;
}

export interface Doctor {
  name: string;
  qualification: string;
  role: string;
  experience: string;
  availability: string;
}
