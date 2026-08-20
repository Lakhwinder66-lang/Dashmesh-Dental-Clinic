import React from 'react';
import { Phone, Calendar, MapPin, Star, Sparkles, Shield, Clock, ArrowRight, Stethoscope, Award, Mail } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenOpdSlip: () => void;
  onOpenCallSheet: () => void;
  onOpenAiTriage: () => void;
  setActiveTab: (tab: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onOpenOpdSlip,
  onOpenCallSheet,
  onOpenAiTriage,
  setActiveTab,
}) => {
  return (
    <section className="relative pt-6 pb-12 overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-blue-100/60 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Hero Card with iOS Liquid Glass */}
        <div className="ios-glass rounded-3xl p-6 sm:p-10 border border-white/70 shadow-xl backdrop-blur-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Heading & Key Details */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200/70 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                <span>Modern Dental Care in Abohar, Punjab</span>
              </div>

              {/* Title & Subheading */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                  Dashmesh Dental Clinic
                </h1>
                <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
                  Comprehensive, painless dentistry with advanced digital diagnostics, rotary RCT, dental implants, and cosmetic smile makeovers on Jain Nagari Road, Abohar.
                </p>
              </div>

              {/* Quick Google Review Bar & Rating */}
              <div className="flex flex-wrap items-center gap-4 py-2 border-y border-slate-200/60">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[1, 2, 3].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                    <Star className="w-4 h-4 text-amber-300 fill-amber-200" />
                    <Star className="w-4 h-4 text-slate-300" />
                  </div>
                  <span className="text-sm font-bold text-slate-800">3.02</span>
                </div>
                <span className="text-xs text-slate-400">•</span>
                <button
                  id="hero-view-reviews-btn"
                  onClick={() => setActiveTab('reviews')}
                  className="text-xs font-semibold text-sky-600 hover:text-sky-700 underline decoration-sky-300 underline-offset-4"
                >
                  See Google Reviews & Feedback
                </button>
                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Open Today
                </span>
              </div>

              {/* Action Buttons in iOS Glass Style */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="hero-book-token-btn"
                  onClick={onOpenBooking}
                  className="ios-btn-primary text-white font-semibold px-6 py-3.5 rounded-2xl flex items-center gap-2 shadow-lg shadow-sky-500/20 text-sm cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment / Token</span>
                  <ArrowRight className="w-4 h-4 opacity-80" />
                </button>

                <a
                  id="hero-email-btn"
                  href="mailto:rinkuvirk54@gmail.com?subject=Inquiry%20%E2%80%93%20Dashmesh%20Dental%20Clinic&body=Hello%20Dashmesh%20Dental%20Clinic,%0A%0AI%20would%20like%20to%20inquire%20about%20dental%20treatments%20and%20consultations."
                  className="ios-btn-glass text-slate-800 font-semibold px-4 py-3.5 rounded-2xl flex items-center gap-2 text-sm bg-white/90 border border-slate-300 hover:bg-slate-50 transition-all shadow-sm"
                  title="Email rinkuvirk54@gmail.com"
                >
                  <Mail className="w-4 h-4 text-rose-500" />
                  <span className="font-mono text-xs sm:text-sm">rinkuvirk54@gmail.com</span>
                </a>

                <button
                  id="hero-opd-slip-btn"
                  onClick={onOpenOpdSlip}
                  className="ios-btn-glass text-slate-800 font-semibold px-5 py-3.5 rounded-2xl flex items-center gap-2 text-sm border border-slate-300/80"
                >
                  <Stethoscope className="w-4 h-4 text-sky-600" />
                  <span>Generate OPD Slip</span>
                </button>

                <button
                  id="hero-call-direct-btn"
                  onClick={onOpenCallSheet}
                  className="ios-btn-glass text-emerald-800 font-semibold px-4 py-3.5 rounded-2xl flex items-center gap-2 text-sm bg-emerald-50/80 border-emerald-200/80 hover:bg-emerald-100/90"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>084300 33333</span>
                </button>
              </div>

              {/* Location & Landmark Info */}
              <div className="flex items-start gap-2.5 pt-2 text-xs text-slate-600 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/70">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-800">
                    Jain Nagari Road, Abohar Main Water Works, Jain Nagar, Abohar, PB 152116
                  </p>
                  <p className="text-slate-500 mt-0.5">
                    Landmark: Near Main Water Works • Approx 2 hrs 26 mins from Bathinda/regional route
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Quick Status & iOS Feature Cards */}
            <div className="lg:col-span-5 space-y-4">
              {/* Doctor OPD Card */}
              <div className="ios-glass-subtle bg-white/80 rounded-2xl p-5 border border-white/80 shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center font-bold">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-slate-900">Dr. Gurpreet Singh</h2>
                      <p className="text-[11px] text-slate-500">BDS, MDS • 16+ Years Exp.</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
                    Consulting Now
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">Morning OPD</span>
                    <span className="font-semibold text-slate-800">9:00 AM – 2:00 PM</span>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">Evening OPD</span>
                    <span className="font-semibold text-slate-800">4:30 PM – 8:30 PM</span>
                  </div>
                </div>
              </div>

              {/* AI Triage Quick Launcher */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-lg border border-slate-700/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-white">AI Dental Symptom Checker</h2>
                      <p className="text-[11px] text-slate-400">Emergency relief & treatment advice</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300">
                  Got a sudden toothache, bleeding gums, or questions about Root Canal (RCT)? Get instant advice before your visit.
                </p>

                <button
                  id="hero-ai-triage-btn"
                  onClick={onOpenAiTriage}
                  className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-sky-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border border-white/10"
                >
                  <span>Start Instant AI Dental Triage</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

function ChevronRight(props: any) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}
