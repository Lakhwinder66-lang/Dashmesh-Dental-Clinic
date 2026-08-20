import React from 'react';
import { Phone, MapPin, Clock, ShieldCheck, Heart, Stethoscope, Star } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
  onOpenCallSheet: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenBooking,
  onOpenCallSheet,
}) => {
  return (
    <footer className="mt-16 border-t border-slate-200/80 bg-white/70 backdrop-blur-xl pb-24 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        
        {/* Main 4-column footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">
          
          {/* Brand & Clinic Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
                D
              </div>
              <span className="font-bold text-sm text-slate-900">
                Dashmesh Dental Clinic
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Providing precision dental implants, rotary single-sitting root canals, cosmetic smile makeovers, and orthodontic care in Abohar, Punjab.
            </p>
            <div className="flex items-center gap-2 text-amber-500 font-bold">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <Star className="w-3.5 h-3.5 fill-amber-200 text-amber-300" />
                <Star className="w-3.5 h-3.5 text-slate-300" />
              </div>
              <span className="text-slate-800">3.02 / 5.0 Google Rating</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Patient Portal
            </h3>
            <ul className="space-y-2 text-slate-600">
              <li>
                <button
                  id="footer-nav-services"
                  onClick={() => setActiveTab('services')}
                  className="hover:text-sky-600 transition-colors"
                >
                  Treatments & Rate List
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-opd"
                  onClick={() => setActiveTab('opd-slip')}
                  className="hover:text-sky-600 transition-colors"
                >
                  Digital OPD Prescription Slip
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-booking"
                  onClick={onOpenBooking}
                  className="hover:text-sky-600 transition-colors"
                >
                  Online Token Reservation
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-reviews"
                  onClick={() => setActiveTab('reviews')}
                  className="hover:text-sky-600 transition-colors"
                >
                  Google Patient Reviews
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-ai"
                  onClick={() => setActiveTab('ai-triage')}
                  className="hover:text-sky-600 transition-colors"
                >
                  AI Dental Symptom Checker
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Numbers & Hours */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Clinic Helplines
            </h3>
            <div className="space-y-1.5 text-slate-700">
              <button
                id="footer-call-1"
                onClick={onOpenCallSheet}
                className="flex items-center gap-2 hover:text-emerald-700 transition-colors font-mono font-bold"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>084300 33333 (Primary Line)</span>
              </button>
              <button
                id="footer-call-3"
                onClick={onOpenCallSheet}
                className="flex items-center gap-2 hover:text-slate-900 transition-colors font-mono font-bold"
              >
                <Phone className="w-3.5 h-3.5 text-slate-500" />
                <span>9779505055 (OPD Desk)</span>
              </button>
            </div>
            <div className="pt-1 text-slate-500">
              <p className="font-semibold text-slate-700">Timings:</p>
              <p>Mon – Sat: 9:00 AM – 2:00 PM & 4:30 PM – 8:30 PM</p>
              <p>Sun: 9:30 AM – 2:00 PM</p>
            </div>
          </div>

          {/* Abohar Location */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Clinic Location
            </h3>
            <div className="flex items-start gap-2 text-slate-600">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <p>
                Jain Nagari Road, Near Main Water Works, Jain Nagar, Abohar, Punjab 152116
              </p>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500">
              Landmark: Near Abohar Main Water Works (PB-152116)
            </div>
          </div>

        </div>

        {/* Copyright & Disclaimer */}
        <div className="border-t border-slate-200/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Dashmesh Dental Clinic, Abohar. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with iOS 26 Glass UI for Abohar Patients</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
