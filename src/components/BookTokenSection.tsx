import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  User,
  Phone,
  CheckCircle2,
  Stethoscope,
  Sparkles,
  MapPin,
  AlertCircle,
  Mail,
  MessageSquare,
  ListFilter,
  Bot
} from 'lucide-react';
import { DOCTORS, SERVICES, CLINIC_INFO } from '../data/clinicData';
import { Appointment } from '../types';
import { InteractiveBookingChatbot } from './InteractiveBookingChatbot';

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
  const [bookingMode, setBookingMode] = useState<'chatbot' | 'form'>('chatbot');
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState<number | ''>(28);
  const [gender, setGender] = useState('Male');
  const [service, setService] = useState(preselectedService || 'Root Canal Treatment (RCT)');
  const [doctor, setDoctor] = useState(DOCTORS[0].name);
  const [isExistingPatient, setIsExistingPatient] = useState<'Yes' | 'No'>('No');
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
          email: email.trim(),
          age: age || 30,
          gender,
          service,
          doctor,
          date,
          time,
          existingPatient: isExistingPatient,
          notes: notes.trim(),
        }),
      });

      const data = await res.json();
      const appt: Appointment = data.appointment || {
        id: `DDC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        opdNo: `OPD-${Math.floor(1000 + Math.random() * 9000)}`,
        patientName: patientName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        age: Number(age) || 30,
        gender,
        service,
        doctor,
        date,
        time,
        tokenNo: 4,
        status: 'Confirmed',
        existingPatient: isExistingPatient,
        notes: notes.trim(),
        createdAt: new Date().toISOString(),
      };

      setConfirmedAppt(appt);
      if (onAppointmentCreated) {
        onAppointmentCreated(appt);
      }

      // Send Email notification to both clinic4@gmail.com & rinkuvirk54@gmail.com
      try {
        await fetch('/api/send-appointment-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: patientName.trim(),
            mobile_number: phone.trim(),
            email: email.trim(),
            date,
            time,
            reason: service,
            yes_no: isExistingPatient,
          }),
        });
      } catch (errEmail) {
        console.warn('Email dispatch log:', errEmail);
      }
      
      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0071e3', '#30d158', '#ffd60a', '#64d2ff']
      });
    } catch (err) {
      console.error('Failed to book appointment:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      {/* Title & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Priority Digital Token System</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Book Appointment & Token Number
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            Confirm your appointment with Dashmesh Dental Clinic (Abohar). Instant notifications dispatched to clinic4@gmail.com, rinkuvirk54@gmail.com, and WhatsApp (+91 9779505055).
          </p>
        </div>

        {/* Segmented Switcher for Chatbot vs Form */}
        <div className="inline-flex p-1 rounded-2xl bg-slate-200/80 border border-slate-300/70 self-start sm:self-auto shadow-inner">
          <button
            id="book-mode-chatbot-btn"
            onClick={() => setBookingMode('chatbot')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              bookingMode === 'chatbot'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Bot className="w-3.5 h-3.5 text-sky-600" />
            <span>Chatbot Assistant (Steps 1–5)</span>
          </button>
          <button
            id="book-mode-form-btn"
            onClick={() => setBookingMode('form')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              bookingMode === 'form'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5 text-emerald-600" />
            <span>Quick Form View</span>
          </button>
        </div>
      </div>

      {bookingMode === 'chatbot' ? (
        <InteractiveBookingChatbot
          preselectedService={preselectedService}
          onAppointmentCreated={(appt) => {
            if (onAppointmentCreated) onAppointmentCreated(appt);
          }}
        />
      ) : (
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
                        placeholder="e.g. 9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="booking-patient-email"
                        type="email"
                        required
                        placeholder="e.g. patient@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Existing Patient?</label>
                      <div className="grid grid-cols-2 gap-2 pt-0.5">
                        <button
                          type="button"
                          onClick={() => setIsExistingPatient('Yes')}
                          className={`py-2 px-3 rounded-xl font-semibold text-xs border cursor-pointer ${
                            isExistingPatient === 'Yes'
                              ? 'bg-sky-600 text-white border-sky-600'
                              : 'bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          Yes, Existing
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsExistingPatient('No')}
                          className={`py-2 px-3 rounded-xl font-semibold text-xs border cursor-pointer ${
                            isExistingPatient === 'No'
                              ? 'bg-sky-600 text-white border-sky-600'
                              : 'bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          No, New
                        </button>
                      </div>
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
                        className="text-[11px] px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
                      >
                        Today
                      </button>
                      <button
                        type="button"
                        id="date-shortcut-tomorrow"
                        onClick={() => handleQuickDate(1)}
                        className="text-[11px] px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
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
                            className={`py-1.5 px-2 rounded-lg text-center font-mono text-[11px] font-semibold transition-all border cursor-pointer ${
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
                    <span>Generating Token & Sending Alerts...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm Booking & Notify Clinic</span>
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
                    <span className="font-bold text-slate-800">{confirmedAppt.patientName}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Mobile</span>
                    <span className="font-bold text-slate-800">+91 {confirmedAppt.phone}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500">Email</span>
                    <span className="font-medium text-slate-800">{confirmedAppt.email || 'Provided'}</span>
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

                {/* WhatsApp & Email Direct Actions */}
                <div className="space-y-2">
                  <a
                    id="form-confirmed-wa-btn"
                    href={`https://wa.me/919779505055?text=${encodeURIComponent(
                      `📋 New Appointment Request\n\nName: ${confirmedAppt.patientName}\nMobile Number: ${confirmedAppt.phone}\nEmail: ${confirmedAppt.email || 'Not provided'}\nPreferred Date: ${confirmedAppt.date}\nPreferred Time: ${confirmedAppt.time}\nReason for Visit: ${confirmedAppt.service}\nExisting Patient: ${confirmedAppt.existingPatient || 'No'}\n\n— Booked via website chatbot`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send WhatsApp Alert (+91 9779505055)</span>
                  </a>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <a
                      id="form-confirmed-email-clinic4-btn"
                      href={`mailto:clinic4@gmail.com?subject=${encodeURIComponent(
                        `New Appointment Request – ${confirmedAppt.patientName}`
                      )}&body=${encodeURIComponent(
                        `📋 New Appointment Request\n\nName: ${confirmedAppt.patientName}\nMobile Number: ${confirmedAppt.phone}\nEmail: ${confirmedAppt.email || 'Not provided'}\nPreferred Date: ${confirmedAppt.date}\nPreferred Time: ${confirmedAppt.time}\nReason for Visit: ${confirmedAppt.service}\nExisting Patient: ${confirmedAppt.existingPatient || 'No'}\n\n— Booked via website chatbot`
                      )}`}
                      className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer text-center"
                    >
                      <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                      <span className="truncate">Email clinic4@gmail.com</span>
                    </a>

                    <a
                      id="form-confirmed-email-rinku-btn"
                      href={`mailto:rinkuvirk54@gmail.com?subject=${encodeURIComponent(
                        `New Appointment Request – ${confirmedAppt.patientName}`
                      )}&body=${encodeURIComponent(
                        `📋 New Appointment Request\n\nName: ${confirmedAppt.patientName}\nMobile Number: ${confirmedAppt.phone}\nEmail: ${confirmedAppt.email || 'Not provided'}\nPreferred Date: ${confirmedAppt.date}\nPreferred Time: ${confirmedAppt.time}\nReason for Visit: ${confirmedAppt.service}\nExisting Patient: ${confirmedAppt.existingPatient || 'No'}\n\n— Booked via website chatbot`
                      )}`}
                      className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer text-center"
                    >
                      <Mail className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span className="truncate">Email rinkuvirk54@gmail.com</span>
                    </a>
                  </div>

                  <a
                    id="form-confirmed-email-both-btn"
                    href={`mailto:clinic4@gmail.com,rinkuvirk54@gmail.com?subject=${encodeURIComponent(
                      `New Appointment Request – ${confirmedAppt.patientName}`
                    )}&body=${encodeURIComponent(
                      `📋 New Appointment Request\n\nName: ${confirmedAppt.patientName}\nMobile Number: ${confirmedAppt.phone}\nEmail: ${confirmedAppt.email || 'Not provided'}\nPreferred Date: ${confirmedAppt.date}\nPreferred Time: ${confirmedAppt.time}\nReason for Visit: ${confirmedAppt.service}\nExisting Patient: ${confirmedAppt.existingPatient || 'No'}\n\n— Booked via website chatbot`
                    )}`}
                    className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center justify-center gap-1.5 border border-slate-300/80 cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Email Both Clinic Addresses</span>
                  </a>
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
                    className="ios-btn-glass text-slate-800 text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Call Clinic</span>
                  </a>
                  <button
                    id="token-book-another-btn"
                    onClick={() => setConfirmedAppt(null)}
                    className="ios-btn-primary text-white text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1 cursor-pointer"
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
                      <span className="font-bold text-slate-800 block">Instant Email & WhatsApp Alert</span>
                      <p className="text-slate-500 mt-0.5">Dispatches notification directly to clinic4@gmail.com, rinkuvirk54@gmail.com and WhatsApp +91 9779505055.</p>
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
      )}
    </section>
  );
};
