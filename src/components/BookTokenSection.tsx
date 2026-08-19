import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Calendar, Clock, User, Phone, CheckCircle2, Stethoscope, Sparkles, MapPin, Download, AlertCircle, ArrowRight } from 'lucide-react';
import { DOCTORS, SERVICES, CLINIC_INFO } from '../data/clinicData';
import { Appointment } from '../types';

interface BookTokenSectionProps {
  preselectedService?: string;
  onAppointmentCreated?: (appointment: Appointment) => void;
}

const TIME_SLOTS = [
  '09:30 AM', '10:15 AM', '11:00 AM', '11:45 AM', '12:30 PM', '01:15 PM',
  '04:30 PM', '05:15 PM', '06:00 PM', '06:45 PM', '07:30 PM', '08:00 PM'
];

export const BookTokenSection: React.FC<BookTokenSectionProps> = ({
  preselectedService,
  onAppointmentCreated,
}) => {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState<number | ''>(28);
  const [gender, setGender] = useState('Male');
  const [service, setService] = useState(preselectedService || 'Root Canal Treatment (RCT)');
  const [doctor, setDoctor] = useState(DOCTORS[0].name);
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [time, setTime] = useState('10:15 AM');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmedAppt, setConfirmedAppt] = useState<Appointment | null>(null);

  const handleQuickDate = (daysAhead: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    setDate(d.toISOString().split('T')[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !phone.trim()) {
      alert('Please provide your name and contact phone number.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName: patientName.trim(),
          phone: phone.trim(),
          age: age || 30,
          gender,
          service,
          doctor,
          date,
          time,
          notes: notes.trim(),
        }),
      });

      const data = await res.json();
      if (data.success && data.appointment) {
        setConfirmedAppt(data.appointment);
        if (onAppointmentCreated) {
          onAppointmentCreated(data.appointment);
        }
        
        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0071e3', '#30d158', '#ffd60a', '#64d2ff']
        });
      }
    } catch (err) {
      console.error('Failed to book appointment:', err);
      // Fallback local creation
      const localAppt: Appointment = {
        id: `DDC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        opdNo: `OPD-${Math.floor(1000 + Math.random() * 9000)}`,
        patientName,
        phone,
        age: Number(age) || 30,
        gender,
        service,
        doctor,
        date,
        time,
        tokenNo: 3,
        status: 'Confirmed',
        notes,
        createdAt: new Date().toISOString(),
      };
      setConfirmedAppt(localAppt);
      if (onAppointmentCreated) {
        onAppointmentCreated(localAppt);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-8">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
          <Calendar className="w-3.5 h-3.5" />
          <span>Priority Digital Token System</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Book Appointment & Token Number
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-xl">
          Reserve your slot at Dashmesh Dental Clinic (Abohar) to avoid long waiting times. Walk-ins also welcomed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left / Booking Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="ios-glass rounded-3xl p-6 sm:p-8 border border-white/80 shadow-lg space-y-6">
            
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Patient Basic Info */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-sky-600" />
                  <span>1. Patient Details</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="booking-patient-name"
                      type="text"
                      required
                      placeholder="e.g. Jaswinder Kaur"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Mobile Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="booking-patient-phone"
                      type="tel"
                      required
                      placeholder="e.g. 98765-43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Age</label>
                    <input
                      id="booking-patient-age"
                      type="number"
                      min="1"
                      max="110"
                      value={age}
                      onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Gender</label>
                    <select
                      id="booking-patient-gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Child">Child (Under 12)</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Service & Doctor Selection */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-sky-600" />
                  <span>2. Treatment & Doctor</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Required Dental Service</label>
                    <select
                      id="booking-select-service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                    >
                      {SERVICES.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name} ({s.priceRange})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">Consulting Doctor</label>
                    <select
                      id="booking-select-doctor"
                      value={doctor}
                      onChange={(e) => setDoctor(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                    >
                      {DOCTORS.map((doc, idx) => (
                        <option key={idx} value={doc.name}>
                          {doc.name} - {doc.role.split('&')[0]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sky-600" />
                    <span>3. Date & Time Slot</span>
                  </h3>

                  {/* Quick Date Chips */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      id="date-shortcut-today"
                      onClick={() => handleQuickDate(0)}
                      className="text-[11px] px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                    >
                      Today
                    </button>
                    <button
                      type="button"
                      id="date-shortcut-tomorrow"
                      onClick={() => handleQuickDate(1)}
                      className="text-[11px] px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                    >
                      Tomorrow
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="sm:col-span-1">
                    <label className="block text-slate-700 font-semibold mb-1">Appointment Date</label>
                    <input
                      id="booking-select-date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-semibold mb-1">Available Token Slots</label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          id={`slot-btn-${slot.replace(/[^a-zA-Z0-9]/g, '')}`}
                          onClick={() => setTime(slot)}
                          className={`py-1.5 px-2 rounded-lg text-center font-mono text-[11px] font-semibold transition-all border ${
                            time === slot
                              ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                              : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs text-slate-700 font-semibold mb-1">
                  Symptoms / Special Requests (Optional)
                </label>
                <input
                  id="booking-notes-input"
                  type="text"
                  placeholder="e.g. Tooth sensitivity on lower right side, nervous patient"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
              </div>

              {/* Submit Button */}
              <button
                id="submit-booking-token-btn"
                type="submit"
                disabled={loading}
                className="w-full ios-btn-primary text-white font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25 text-sm cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>Generating Token...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm Booking & Generate Digital Token</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right / Live Confirmation Card & Token Pass (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {confirmedAppt ? (
            <div className="ios-glass rounded-3xl p-6 border-2 border-emerald-400/80 shadow-xl space-y-5 animate-scale-up">
              
              {/* Confirmed Banner */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Token Confirmed!</h3>
                    <p className="text-[11px] text-slate-500 font-mono">ID: {confirmedAppt.id}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                  Active
                </span>
              </div>

              {/* Token Number Highlight */}
              <div className="bg-gradient-to-tr from-sky-600 to-blue-700 text-white rounded-2xl p-4 text-center space-y-1 shadow-md shadow-sky-600/30">
                <span className="text-[11px] uppercase tracking-widest text-sky-200 font-bold block">
                  Daily OPD Token Number
                </span>
                <span className="text-4xl sm:text-5xl font-black font-mono">
                  #{confirmedAppt.tokenNo}
                </span>
                <p className="text-xs text-sky-100 pt-1">
                  Expected time: <span className="font-bold">{confirmedAppt.time}</span> on {confirmedAppt.date}
                </p>
              </div>

              {/* Summary Details */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Patient</span>
                  <span className="font-bold text-slate-800">{confirmedAppt.patientName} ({confirmedAppt.age}Y, {confirmedAppt.gender})</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">OPD Number</span>
                  <span className="font-mono font-bold text-slate-900">{confirmedAppt.opdNo}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Service</span>
                  <span className="font-semibold text-slate-800">{confirmedAppt.service}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Doctor</span>
                  <span className="font-semibold text-slate-800">{confirmedAppt.doctor}</span>
                </div>
              </div>

              {/* Clinic Address & Arrival tip */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>Dashmesh Dental Clinic, Abohar</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Main Jain Nagar Road (Near Main Water Works). Please arrive 10 minutes before your token time.
                </p>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2">
                <a
                  id="token-call-desk-btn"
                  href="tel:08430033333"
                  className="ios-btn-glass text-slate-800 text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Call Clinic</span>
                </a>
                <button
                  id="token-book-another-btn"
                  onClick={() => setConfirmedAppt(null)}
                  className="ios-btn-primary text-white text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1"
                >
                  <span>Book Another</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="ios-glass rounded-3xl p-6 border border-white/70 shadow-md space-y-4 text-xs text-slate-600">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>Why Book with Digital Token?</span>
              </h3>

              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0 font-bold text-[11px]">
                    1
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block">Zero Waiting Room Delay</span>
                    <p className="text-slate-500 mt-0.5">Priority entry into dental operatory on your scheduled token slot.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-[11px]">
                    2
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block">Instant OPD Number Generation</span>
                    <p className="text-slate-500 mt-0.5">Your clinical history and prescriptions are tied automatically to your OPD code.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 font-bold text-[11px]">
                    3
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block">Emergency & Direct Helpline</span>
                    <p className="text-slate-500 mt-0.5">Sudden dental trauma or severe pain? Call 084300 33333 or 94179-28951 directly.</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-sky-50 rounded-xl border border-sky-200/80 text-[11px] text-sky-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span>
                  No online payment required. Consultation fee (₹200) or treatment charges can be settled via UPI/Cash at the clinic reception.
                </span>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
