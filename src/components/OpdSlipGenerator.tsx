import React, { useState } from 'react';
import { Stethoscope, Printer, Download, Plus, Trash2, CheckCircle2, RotateCcw, Sparkles, FileText, Phone, User, Calendar } from 'lucide-react';
import { OPDSlipData } from '../types';
import { CLINIC_INFO } from '../data/clinicData';

// Adult 32 Teeth data with standard FDI numbering & common names
const UPPER_TEETH = [
  { id: 1, fdi: 18, name: 'Upper Right 3rd Molar (Wisdom)' },
  { id: 2, fdi: 17, name: 'Upper Right 2nd Molar' },
  { id: 3, fdi: 16, name: 'Upper Right 1st Molar' },
  { id: 4, fdi: 15, name: 'Upper Right 2nd Premolar' },
  { id: 5, fdi: 14, name: 'Upper Right 1st Premolar' },
  { id: 6, fdi: 13, name: 'Upper Right Canine' },
  { id: 7, fdi: 12, name: 'Upper Right Lateral Incisor' },
  { id: 8, fdi: 11, name: 'Upper Right Central Incisor' },
  { id: 9, fdi: 21, name: 'Upper Left Central Incisor' },
  { id: 10, fdi: 22, name: 'Upper Left Lateral Incisor' },
  { id: 11, fdi: 23, name: 'Upper Left Canine' },
  { id: 12, fdi: 24, name: 'Upper Left 1st Premolar' },
  { id: 13, fdi: 25, name: 'Upper Left 2nd Premolar' },
  { id: 14, fdi: 26, name: 'Upper Left 1st Molar' },
  { id: 15, fdi: 27, name: 'Upper Left 2nd Molar' },
  { id: 16, fdi: 28, name: 'Upper Left 3rd Molar (Wisdom)' },
];

const LOWER_TEETH = [
  { id: 32, fdi: 48, name: 'Lower Right 3rd Molar (Wisdom)' },
  { id: 31, fdi: 47, name: 'Lower Right 2nd Molar' },
  { id: 30, fdi: 46, name: 'Lower Right 1st Molar' },
  { id: 29, fdi: 45, name: 'Lower Right 2nd Premolar' },
  { id: 28, fdi: 44, name: 'Lower Right 1st Premolar' },
  { id: 27, fdi: 43, name: 'Lower Right Canine' },
  { id: 26, fdi: 42, name: 'Lower Right Lateral Incisor' },
  { id: 25, fdi: 41, name: 'Lower Right Central Incisor' },
  { id: 24, fdi: 31, name: 'Lower Left Central Incisor' },
  { id: 23, fdi: 32, name: 'Lower Left Lateral Incisor' },
  { id: 22, fdi: 33, name: 'Lower Left Canine' },
  { id: 21, fdi: 34, name: 'Lower Left 1st Premolar' },
  { id: 20, fdi: 35, name: 'Lower Left 2nd Premolar' },
  { id: 19, fdi: 36, name: 'Lower Left 1st Molar' },
  { id: 18, fdi: 37, name: 'Lower Left 2nd Molar' },
  { id: 17, fdi: 38, name: 'Lower Left 3rd Molar (Wisdom)' },
];

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string; label: string }> = {
  'Normal': { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', label: 'Healthy / Normal' },
  'Cavity': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-300', label: 'Decay / Deep Cavity' },
  'RCT': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-300', label: 'RCT Required / Done' },
  'Crown': { bg: 'bg-sky-50', text: 'text-sky-700', border: 'border-sky-300', label: 'Crowned / Cap' },
  'Missing': { bg: 'bg-slate-100', text: 'text-slate-500', border: 'border-slate-300', label: 'Missing / Extracted' },
};

export const OpdSlipGenerator: React.FC = () => {
  const [formData, setFormData] = useState<OPDSlipData>({
    opdNo: `OPD-${Math.floor(1000 + Math.random() * 9000)}`,
    date: new Date().toISOString().split('T')[0],
    patientName: 'Sunaina Sharma',
    age: 32,
    gender: 'Female',
    phone: '084300 33333',
    address: 'Main Jain Nagar Road, Abohar, Punjab',
    chiefComplaint: 'Pain and severe sensitivity in lower right molar with cold drinks',
    clinicalHistory: 'Deep disto-occlusal caries in tooth #46 involving pulp chamber. Tender on percussion. Vitality test negative.',
    provisionalDiagnosis: 'Irreversible Pulpitis with Acute Apical Periodontitis (Tooth 46)',
    prescribedMedicines: [
      { name: 'Tab. Augmentin 625mg', dosage: '1 tablet twice daily', duration: '5 days', instructions: 'After meals' },
      { name: 'Tab. Ketorol-DT', dosage: '1 tablet dissolved in water when needed for pain', duration: '3 days', instructions: 'SOS after food' },
      { name: 'Tab. Pantocid 40mg', dosage: '1 tablet once daily', duration: '5 days', instructions: '30 mins before breakfast' },
      { name: 'Hexidine 0.2% Mouthwash', dosage: '10ml rinse for 1 min twice daily', duration: '7 days', instructions: 'Do not eat for 30 mins after rinse' }
    ],
    teethNotes: {
      30: 'RCT', // Tooth 46
      14: 'Crown', // Tooth 26
    },
    selectedTeeth: [30, 14],
    doctorName: 'Dr. Gurmeet Singh (BDS, MDS)'
  });

  const [activeTooth, setActiveTooth] = useState<number | null>(30);
  const [copiedNotification, setCopiedNotification] = useState(false);

  const handleToothStatusChange = (toothId: number, status: string) => {
    setFormData(prev => {
      const updatedTeethNotes = { ...prev.teethNotes };
      if (status === 'Normal') {
        delete updatedTeethNotes[toothId];
      } else {
        updatedTeethNotes[toothId] = status;
      }
      return {
        ...prev,
        teethNotes: updatedTeethNotes,
        selectedTeeth: Object.keys(updatedTeethNotes).map(Number)
      };
    });
  };

  const handleAddMedicine = () => {
    setFormData(prev => ({
      ...prev,
      prescribedMedicines: [
        ...prev.prescribedMedicines,
        { name: '', dosage: '1 tab BD', duration: '3 days', instructions: 'After food' }
      ]
    }));
  };

  const handleRemoveMedicine = (index: number) => {
    setFormData(prev => ({
      ...prev,
      prescribedMedicines: prev.prescribedMedicines.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateMedicine = (index: number, field: string, value: string) => {
    setFormData(prev => {
      const list = [...prev.prescribedMedicines];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, prescribedMedicines: list };
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const summary = `DASHMESH DENTAL CLINIC - OPD SLIP
Phone: 94179-28951 | 9779505055 • Main Jain Nagar Road, Abohar-152116 (PB)
----------------------------------------
OPD NO: ${formData.opdNo} | Date: ${formData.date}
NAME: ${formData.patientName} (${formData.age} Y / ${formData.gender})
PHONE: ${formData.phone}
ADDRESS: ${formData.address}
CHIEF COMPLAINT: ${formData.chiefComplaint}
CLINICAL HISTORY: ${formData.clinicalHistory}
DIAGNOSIS: ${formData.provisionalDiagnosis}
DOCTOR: ${formData.doctorName}
----------------------------------------`;
    navigator.clipboard.writeText(summary);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Digital Clinical Record & Prescription Slip</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dashmesh Dental OPD Slip Generator
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Complete digital prescription sheet with interactive 32-tooth odontogram matching the official Abohar clinic format.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="opd-copy-summary-btn"
            onClick={handleCopySummary}
            className="ios-btn-glass text-slate-700 text-xs font-semibold px-3.5 py-2.5 rounded-xl flex items-center gap-1.5"
          >
            {copiedNotification ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Copied!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-slate-500" />
                <span>Copy Summary</span>
              </>
            )}
          </button>

          <button
            id="opd-print-slip-btn"
            onClick={handlePrint}
            className="ios-btn-primary text-white text-xs font-semibold px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md shadow-sky-500/20 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Slip</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left / Controls: Interactive Form & Tooth Chart (5 cols) */}
        <div className="xl:col-span-5 space-y-6">
          
          {/* Patient Details Form */}
          <div className="ios-glass rounded-2xl p-5 border border-white/70 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
              <User className="w-4 h-4 text-sky-600" />
              <span>Patient & OPD Registration</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-1">OPD Number</label>
                <input
                  id="opd-input-number"
                  type="text"
                  value={formData.opdNo}
                  onChange={(e) => setFormData({ ...formData, opdNo: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-mono font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Date</label>
                <input
                  id="opd-input-date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-slate-600 font-semibold mb-1">Patient Name</label>
                <input
                  id="opd-input-name"
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Age</label>
                <input
                  id="opd-input-age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-1">Gender</label>
                <select
                  id="opd-input-gender"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Child">Child</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-slate-600 font-semibold mb-1">Phone Number</label>
                <input
                  id="opd-input-phone"
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-slate-600 font-semibold mb-1">Chief Complaint</label>
                <input
                  id="opd-input-complaint"
                  type="text"
                  value={formData.chiefComplaint}
                  onChange={(e) => setFormData({ ...formData, chiefComplaint: e.target.value })}
                  placeholder="e.g. Toothache in lower molar, bleeding gums..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-slate-600 font-semibold mb-1">Clinical History</label>
                <textarea
                  id="opd-input-history"
                  rows={2}
                  value={formData.clinicalHistory}
                  onChange={(e) => setFormData({ ...formData, clinicalHistory: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-slate-600 font-semibold mb-1">Provisional Diagnosis</label>
                <input
                  id="opd-input-diagnosis"
                  type="text"
                  value={formData.provisionalDiagnosis}
                  onChange={(e) => setFormData({ ...formData, provisionalDiagnosis: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>
            </div>
          </div>

          {/* Interactive Odontogram Tooth Selector */}
          <div className="ios-glass rounded-2xl p-5 border border-white/70 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>Interactive 32-Tooth Chart (Click Tooth)</span>
              </h3>
              <button
                id="opd-reset-teeth-btn"
                onClick={() => setFormData(prev => ({ ...prev, teethNotes: {}, selectedTeeth: [] }))}
                className="text-[11px] text-slate-400 hover:text-slate-700 flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Upper Jaw */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block text-center">
                Upper Arch (Maxillary)
              </span>
              <div className="grid grid-cols-8 sm:grid-cols-16 gap-1 p-2 bg-slate-50/80 rounded-xl border border-slate-200/60 overflow-x-auto">
                {UPPER_TEETH.map((tooth) => {
                  const status = formData.teethNotes[tooth.id] || 'Normal';
                  const style = STATUS_COLORS[status] || STATUS_COLORS['Normal'];
                  const isSelected = activeTooth === tooth.id;
                  return (
                    <button
                      key={tooth.id}
                      id={`tooth-btn-${tooth.id}`}
                      onClick={() => setActiveTooth(tooth.id)}
                      title={`${tooth.name} (#${tooth.fdi}) - Status: ${status}`}
                      className={`h-8 sm:h-9 flex flex-col items-center justify-center rounded-lg border text-[10px] font-bold transition-all ${style.bg} ${style.text} ${style.border} ${
                        isSelected ? 'ring-2 ring-sky-500 scale-105 shadow-sm' : ''
                      }`}
                    >
                      <span>{tooth.fdi}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Lower Jaw */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block text-center">
                Lower Arch (Mandibular)
              </span>
              <div className="grid grid-cols-8 sm:grid-cols-16 gap-1 p-2 bg-slate-50/80 rounded-xl border border-slate-200/60 overflow-x-auto">
                {LOWER_TEETH.map((tooth) => {
                  const status = formData.teethNotes[tooth.id] || 'Normal';
                  const style = STATUS_COLORS[status] || STATUS_COLORS['Normal'];
                  const isSelected = activeTooth === tooth.id;
                  return (
                    <button
                      key={tooth.id}
                      id={`tooth-btn-${tooth.id}`}
                      onClick={() => setActiveTooth(tooth.id)}
                      title={`${tooth.name} (#${tooth.fdi}) - Status: ${status}`}
                      className={`h-8 sm:h-9 flex flex-col items-center justify-center rounded-lg border text-[10px] font-bold transition-all ${style.bg} ${style.text} ${style.border} ${
                        isSelected ? 'ring-2 ring-sky-500 scale-105 shadow-sm' : ''
                      }`}
                    >
                      <span>{tooth.fdi}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Tooth Quick Selector Status buttons */}
            {activeTooth && (
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">
                    Selected: Tooth #{[...UPPER_TEETH, ...LOWER_TEETH].find(t => t.id === activeTooth)?.fdi} (
                    {[...UPPER_TEETH, ...LOWER_TEETH].find(t => t.id === activeTooth)?.name})
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    Current: {formData.teethNotes[activeTooth] || 'Normal'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['Normal', 'Cavity', 'RCT', 'Crown', 'Missing'].map((st) => (
                    <button
                      key={st}
                      id={`set-status-${st}`}
                      onClick={() => handleToothStatusChange(activeTooth, st)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                        (formData.teethNotes[activeTooth] || 'Normal') === st
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Rx Prescription Manager */}
          <div className="ios-glass rounded-2xl p-5 border border-white/70 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-emerald-600" />
                <span>Prescribed Medicines (Rx)</span>
              </h3>
              <button
                id="add-medicine-btn"
                onClick={handleAddMedicine}
                className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Med</span>
              </button>
            </div>

            <div className="space-y-2">
              {formData.prescribedMedicines.map((med, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50/90 rounded-xl border border-slate-200/80 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Medicine Name (e.g. Augmentin 625)"
                      value={med.name}
                      onChange={(e) => handleUpdateMedicine(idx, 'name', e.target.value)}
                      className="flex-1 bg-white border border-slate-200 rounded-lg px-2 py-1 font-semibold text-slate-800 focus:outline-none"
                    />
                    <button
                      id={`delete-med-btn-${idx}`}
                      onClick={() => handleRemoveMedicine(idx)}
                      className="p-1 text-slate-400 hover:text-rose-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Dosage (e.g. 1-0-1)"
                      value={med.dosage}
                      onChange={(e) => handleUpdateMedicine(idx, 'dosage', e.target.value)}
                      className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-700"
                    />
                    <input
                      type="text"
                      placeholder="Duration (5 days)"
                      value={med.duration}
                      onChange={(e) => handleUpdateMedicine(idx, 'duration', e.target.value)}
                      className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-700"
                    />
                    <input
                      type="text"
                      placeholder="Instructions (After food)"
                      value={med.instructions}
                      onChange={(e) => handleUpdateMedicine(idx, 'instructions', e.target.value)}
                      className="bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-700"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right / Printable Document Preview (7 cols) */}
        <div className="xl:col-span-7">
          <div className="sticky top-24">
            
            {/* Authentic Printable OPD Slip Container */}
            <div
              id="printable-opd-slip"
              className="bg-white rounded-2xl p-6 sm:p-8 border-2 border-slate-300 shadow-xl text-slate-900 font-sans space-y-6"
            >
              {/* Slip Official Letterhead */}
              <div className="border-b-2 border-slate-900 pb-4 text-center space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600 border-b border-slate-200 pb-1 mb-2">
                  <span>REG. NO: PB/DENT/2026/049</span>
                  <span>TIMINGS: 9 AM - 2 PM | 4:30 PM - 8:30 PM</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 uppercase">
                  DASHMESH DENTAL CLINIC
                </h1>
                
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-800">
                  <span>94179-28951</span>
                  <span>|</span>
                  <span>9779505055</span>
                  <span>|</span>
                  <span>084300 33333</span>
                </div>

                <p className="text-xs text-slate-600 font-medium">
                  Main Jain Nagar Road, Near Main Water Works, Abohar - 152116 (PB)
                </p>
              </div>

              {/* Patient Header Block */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="font-bold text-slate-500 uppercase text-[10px] block">OPD NO.</span>
                  <span className="font-mono font-black text-slate-900 text-sm">{formData.opdNo}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-500 uppercase text-[10px] block">DATE</span>
                  <span className="font-semibold text-slate-900">{formData.date}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-500 uppercase text-[10px] block">PATIENT NAME</span>
                  <span className="font-bold text-slate-900">{formData.patientName || '—'}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-500 uppercase text-[10px] block">AGE / GENDER</span>
                  <span className="font-semibold text-slate-900">{formData.age} Y / {formData.gender}</span>
                </div>
              </div>

              {/* Clinical History & Complaints Block */}
              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-bold text-slate-900 uppercase tracking-wider block mb-1">
                    CHIEF COMPLAINT:
                  </span>
                  <p className="text-slate-800 bg-slate-50/60 p-2 rounded border border-slate-100 italic">
                    "{formData.chiefComplaint || 'Routine checkup and dental examination'}"
                  </p>
                </div>

                <div>
                  <span className="font-bold text-slate-900 uppercase tracking-wider block mb-1">
                    CLINICAL HISTORY:
                  </span>
                  <p className="text-slate-800 bg-slate-50/60 p-2 rounded border border-slate-100">
                    {formData.clinicalHistory || 'No significant medical history.'}
                  </p>
                </div>

                <div>
                  <span className="font-bold text-slate-900 uppercase tracking-wider block mb-1">
                    PROVISIONAL DIAGNOSIS:
                  </span>
                  <p className="text-slate-900 font-bold bg-sky-50/80 p-2 rounded border border-sky-200">
                    {formData.provisionalDiagnosis}
                  </p>
                </div>
              </div>

              {/* Dental Odontogram Representation */}
              {Object.keys(formData.teethNotes).length > 0 && (
                <div className="border border-slate-200 rounded-lg p-3 bg-slate-50/50 space-y-2">
                  <span className="text-[11px] font-bold text-slate-800 uppercase block">
                    Tooth Status Findings:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {Object.entries(formData.teethNotes).map(([toothId, status]) => {
                      const allTeeth = [...UPPER_TEETH, ...LOWER_TEETH];
                      const t = allTeeth.find(item => item.id === Number(toothId));
                      const statusKey = String(status);
                      const badgeStyle = STATUS_COLORS[statusKey] || STATUS_COLORS['Normal'];
                      return (
                        <div key={toothId} className={`px-2.5 py-1 rounded border font-semibold ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}>
                          Tooth #{t?.fdi} ({t?.name.split(' ')[0]} {t?.name.split(' ')[1]}): <span className="font-bold">{statusKey}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Rx Prescription Table */}
              <div className="space-y-2">
                <div className="flex items-center gap-1 font-serif italic text-lg font-black text-slate-900">
                  <span>℞</span>
                  <span className="text-xs font-sans font-bold uppercase not-italic tracking-wider text-slate-600 ml-2">
                    Prescribed Medication & Directions
                  </span>
                </div>

                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                      <tr>
                        <th className="p-2">#</th>
                        <th className="p-2">Medicine / Form</th>
                        <th className="p-2">Dosage</th>
                        <th className="p-2">Duration</th>
                        <th className="p-2">Instructions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {formData.prescribedMedicines.map((med, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}>
                          <td className="p-2 font-mono text-slate-400">{idx + 1}</td>
                          <td className="p-2 font-bold text-slate-900">{med.name}</td>
                          <td className="p-2 font-semibold text-slate-800">{med.dosage}</td>
                          <td className="p-2 text-slate-600">{med.duration}</td>
                          <td className="p-2 text-slate-600">{med.instructions}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Footer Doctor Signature & Disclaimer */}
              <div className="pt-8 border-t border-slate-200 flex items-end justify-between text-xs">
                <div className="space-y-1 max-w-xs text-[10px] text-slate-500">
                  <p>• Not valid for medico-legal purpose unless countersigned.</p>
                  <p>• Emergency Helpline: 084300 33333 / 94179-28951</p>
                  <p>• Next Review: In 7 Days or SOS</p>
                </div>

                <div className="text-right space-y-1">
                  <div className="w-36 border-b border-slate-800 ml-auto h-8"></div>
                  <p className="font-bold text-slate-900">{formData.doctorName}</p>
                  <p className="text-[10px] text-slate-500">Dashmesh Dental Clinic, Abohar</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
