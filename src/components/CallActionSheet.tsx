import React from 'react';
import { Phone, MessageCircle, X, MapPin, Clock, User, ShieldCheck } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface CallActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CallActionSheet: React.FC<CallActionSheetProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="ios-glass w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl p-6 border border-white/80 shadow-2xl space-y-5 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/30">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Call Dashmesh Dental Clinic
              </h3>
              <p className="text-[11px] text-slate-500">Abohar, Punjab</p>
            </div>
          </div>

          <button
            id="close-call-sheet-btn"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Direct Phone Numbers List */}
        <div className="space-y-2.5">
          <a
            id="call-sheet-btn-primary"
            href="tel:08430033333"
            className="p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/90 flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-black text-emerald-950 block font-mono">
                  084300 33333
                </span>
                <span className="text-[11px] text-emerald-800">
                  Primary Clinic Line & Appointments
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200">
              Call Now
            </span>
          </a>

          <a
            id="call-sheet-btn-dr"
            href="tel:9417928951"
            className="p-3.5 rounded-2xl bg-sky-50 hover:bg-sky-100/80 border border-sky-200/90 flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-black text-sky-950 block font-mono">
                  94179-28951
                </span>
                <span className="text-[11px] text-sky-800">
                  Dr. Gurmeet Singh (Chief Surgeon)
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-sky-700 bg-white px-2.5 py-1 rounded-lg border border-sky-200">
              Call Now
            </span>
          </a>

          <a
            id="call-sheet-btn-desk2"
            href="tel:9779505055"
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-700 text-white flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-sm font-black text-slate-900 block font-mono">
                  9779505055
                </span>
                <span className="text-[11px] text-slate-600">
                  OPD Registration Desk 2
                </span>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
              Call Now
            </span>
          </a>

          {/* WhatsApp Action */}
          <a
            id="call-sheet-btn-whatsapp"
            href={`https://wa.me/${CLINIC_INFO.whatsapp}?text=Hello%20Dashmesh%20Dental%20Clinic,%20I%20would%20like%20to%20inquire%20about%20dental%20treatment.`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-between transition-all shadow-md shadow-emerald-600/30"
          >
            <div className="flex items-center gap-3">
              <MessageCircle className="w-5 h-5" />
              <div>
                <span className="text-xs font-bold block">WhatsApp Consultation</span>
                <span className="text-[10px] text-emerald-100">Send tooth photos or ask query</span>
              </div>
            </div>
            <span className="text-xs font-semibold bg-emerald-500/80 px-2.5 py-1 rounded-lg">
              Open Chat
            </span>
          </a>
        </div>

        {/* Footer address reminder */}
        <div className="pt-2 text-center text-xs text-slate-500 space-y-1">
          <p className="font-semibold text-slate-700">
            Jain Nagari Road, Near Main Water Works, Abohar (PB)
          </p>
          <p className="text-[11px]">Open 9:00 AM – 8:30 PM</p>
        </div>
      </div>
    </div>
  );
};
