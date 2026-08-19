import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { OpdSlipGenerator } from './components/OpdSlipGenerator';
import { BookTokenSection } from './components/BookTokenSection';
import { ReviewsSection } from './components/ReviewsSection';
import { MapAndDirections } from './components/MapAndDirections';
import { ClinicGallery } from './components/ClinicGallery';
import { AiDentalAssistant } from './components/AiDentalAssistant';
import { CallActionSheet } from './components/CallActionSheet';
import { IosBottomDock } from './components/IosBottomDock';
import { Footer } from './components/Footer';
import { DOCTORS, CLINIC_INFO, SERVICES } from './data/clinicData';
import { Stethoscope, Sparkles, Star, Calendar, ArrowRight, ShieldCheck, Phone, CheckCircle, MapPin, Camera } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [callSheetOpen, setCallSheetOpen] = useState(false);
  const [preselectedBookingService, setPreselectedBookingService] = useState<string | undefined>(undefined);

  const handleOpenBookingWithService = (serviceName: string) => {
    setPreselectedBookingService(serviceName);
    setActiveTab('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = () => {
    setActiveTab('book');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenOpdSlip = () => {
    setActiveTab('opd-slip');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAiTriage = () => {
    setActiveTab('ai-triage');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col selection:bg-sky-500/20 selection:text-sky-900">
      
      {/* iOS 26 Glass Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBooking={handleOpenBooking}
        onOpenCallSheet={() => setCallSheetOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-16">
            {/* Hero Section */}
            <HeroSection
              onOpenBooking={handleOpenBooking}
              onOpenOpdSlip={handleOpenOpdSlip}
              onOpenCallSheet={() => setCallSheetOpen(true)}
              onOpenAiTriage={handleOpenAiTriage}
              setActiveTab={setActiveTab}
            />

            {/* Doctors & Specialists Banner */}
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold mb-2">
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span>Experienced Dental Surgeons</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Meet Our Dental Doctors
                  </h2>
                </div>
                <p className="text-xs text-slate-500 max-w-xs">
                  Expert clinical care with personalized treatment planning and gentle chairside demeanor.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DOCTORS.map((doc, idx) => (
                  <div
                    key={idx}
                    id={`doctor-card-${idx}`}
                    className="ios-glass rounded-3xl p-6 sm:p-8 border border-white/80 shadow-md space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-700 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-sky-600/30">
                            {doc.name.split(' ')[1]?.charAt(0) || 'D'}
                          </div>
                          <div>
                            <h3 className="text-base sm:text-lg font-bold text-slate-900">
                              {doc.name}
                            </h3>
                            <p className="text-xs font-semibold text-sky-700">
                              {doc.qualification}
                            </p>
                          </div>
                        </div>

                        <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                          {doc.experience}
                        </span>
                      </div>

                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1">
                        <p className="font-semibold text-slate-800">{doc.role}</p>
                        <p className="text-[11px] text-slate-500">Availability: {doc.availability}</p>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center gap-2">
                      <button
                        id={`book-with-doc-${idx}`}
                        onClick={handleOpenBooking}
                        className="flex-1 ios-btn-primary text-white text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Book Consultation</span>
                      </button>

                      <button
                        id={`call-doc-${idx}`}
                        onClick={() => setCallSheetOpen(true)}
                        className="ios-btn-glass text-slate-800 text-xs font-semibold py-2.5 px-3.5 rounded-xl flex items-center gap-1"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Call</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Services Preview */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Key Dental Treatments
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Advanced painless dentistry at transparent standardized rates in Abohar
                  </p>
                </div>
                <button
                  id="overview-see-all-services"
                  onClick={() => setActiveTab('services')}
                  className="text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1"
                >
                  <span>View All Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {SERVICES.slice(0, 4).map((s) => (
                  <div
                    key={s.id}
                    className="ios-glass rounded-2xl p-5 border border-white/70 shadow-sm space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded uppercase">
                        {s.category}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">{s.name}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2">{s.description}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{s.priceRange}</span>
                      <button
                        id={`overview-book-${s.id}`}
                        onClick={() => handleOpenBookingWithService(s.name)}
                        className="text-sky-600 font-bold hover:underline"
                      >
                        Book →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Google Reviews Quick Spotlight */}
            <section className="ios-glass rounded-3xl p-6 sm:p-8 border border-white/80 shadow-md space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-slate-900">
                      Google Reviews (3.02★)
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                      Verified
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    See what patients in Abohar say about Dashmesh Dental Clinic.
                  </p>
                </div>

                <button
                  id="overview-reviews-full-btn"
                  onClick={() => setActiveTab('reviews')}
                  className="ios-btn-glass text-slate-800 text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5"
                >
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>View All Reviews & Write One</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Sunaina Sharma</span>
                    <div className="flex text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-700 italic">
                    "You treated me very well and I am completely satisfied with the treatment."
                  </p>
                  <span className="text-[10px] text-emerald-800 font-semibold block">
                    Verified Patient • Root Canal Treatment
                  </span>
                </div>

                <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Harpreet Sandhu</span>
                    <div className="flex text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-700 italic">
                    "Best dental clinic in Abohar! The sterilization protocols and digital X-ray setup are top notch. Located right on Jain Nagari Road near water works."
                  </p>
                  <span className="text-[10px] text-slate-500 font-semibold block">
                    Verified Patient • Dental Implants
                  </span>
                </div>
              </div>
            </section>

            {/* Photos & Clinic Tour Section */}
            <ClinicGallery />

            {/* Map & Directions Preview */}
            <MapAndDirections
              onOpenBooking={handleOpenBooking}
              onOpenCallSheet={() => setCallSheetOpen(true)}
            />
          </div>
        )}

        {/* TAB 2: SERVICES */}
        {activeTab === 'services' && (
          <ServicesSection
            onSelectServiceForBooking={handleOpenBookingWithService}
            onOpenCallSheet={() => setCallSheetOpen(true)}
          />
        )}

        {/* TAB 3: DIGITAL OPD SLIP */}
        {activeTab === 'opd-slip' && <OpdSlipGenerator />}

        {/* TAB 4: BOOK TOKEN */}
        {activeTab === 'book' && (
          <BookTokenSection
            preselectedService={preselectedBookingService}
            onAppointmentCreated={() => {}}
          />
        )}

        {/* TAB 5: REVIEWS */}
        {activeTab === 'reviews' && <ReviewsSection />}

        {/* TAB 6: MAP & LOCATION */}
        {activeTab === 'map' && (
          <MapAndDirections
            onOpenBooking={handleOpenBooking}
            onOpenCallSheet={() => setCallSheetOpen(true)}
          />
        )}

        {/* TAB 7: AI TOOTH CARE ASSISTANT */}
        {activeTab === 'ai-triage' && (
          <AiDentalAssistant
            onOpenBooking={handleOpenBooking}
            onOpenCallSheet={() => setCallSheetOpen(true)}
          />
        )}

      </main>

      {/* iOS Action Sheet for Direct Calls */}
      <CallActionSheet
        isOpen={callSheetOpen}
        onClose={() => setCallSheetOpen(false)}
      />

      {/* Floating iOS Bottom Dock */}
      <IosBottomDock
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBooking={handleOpenBooking}
        onOpenCallSheet={() => setCallSheetOpen(true)}
      />

      {/* Footer */}
      <Footer
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenBooking={handleOpenBooking}
        onOpenCallSheet={() => setCallSheetOpen(true)}
      />

    </div>
  );
}
