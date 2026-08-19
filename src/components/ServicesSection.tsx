import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Clock, CheckCircle2, ArrowRight, X, AlertCircle, Phone, Calendar } from 'lucide-react';
import { SERVICES } from '../data/clinicData';
import { DentalService } from '../types';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceName: string) => void;
  onOpenCallSheet: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking,
  onOpenCallSheet,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeServiceModal, setActiveServiceModal] = useState<DentalService | null>(null);

  const categories = ['All', 'Restorative', 'Cosmetic', 'Surgical', 'Preventive', 'Orthodontic'];

  const filteredServices = selectedCategory === 'All'
    ? SERVICES
    : SERVICES.filter((s) => s.category === selectedCategory);

  return (
    <section className="space-y-8">
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Standardized Transparent Pricing</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Dental Treatments & Services
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            From single-sitting painless RCTs and titanium implants to clear aligners and kids dentistry at Dashmesh Dental Clinic.
          </p>
        </div>

        {/* Category Pills */}
        <div className="ios-segmented-container flex flex-wrap gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`service-cat-${cat.toLowerCase()}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/70'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid in iOS Glass Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            id={`service-card-${service.id}`}
            className="ios-glass rounded-3xl p-6 border border-white/70 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="space-y-4">
              {/* Card Header & Category Badge */}
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                  {service.category}
                </span>
                <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                  {service.priceRange}
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  {service.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed">
                {service.description}
              </p>

              {/* Key Highlights */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                {service.features.slice(0, 3).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="line-clamp-1">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Duration & Pain Rating Badges */}
              <div className="flex flex-wrap gap-2 pt-2 text-[11px]">
                <span className="inline-flex items-center gap-1 text-slate-600 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                  <Clock className="w-3 h-3 text-sky-500" />
                  {service.duration}
                </span>
                <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  {service.painRating}
                </span>
              </div>
            </div>

            {/* Card Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-6 mt-4 border-t border-slate-100">
              <button
                id={`view-details-${service.id}`}
                onClick={() => setActiveServiceModal(service)}
                className="ios-btn-glass text-slate-700 text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1"
              >
                <span>Details & Care</span>
              </button>

              <button
                id={`book-service-${service.id}`}
                onClick={() => onSelectServiceForBooking(service.name)}
                className="ios-btn-primary text-white text-xs font-semibold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Book Slot</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-80" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Service Detail Modal */}
      {activeServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
          <div className="ios-glass max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-white/80 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
                  {activeServiceModal.category}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-2">
                  {activeServiceModal.name}
                </h3>
                <p className="text-xs text-slate-500">{activeServiceModal.tagline}</p>
              </div>

              <button
                id="close-service-modal-btn"
                onClick={() => setActiveServiceModal(null)}
                className="p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Estimated Cost</span>
                <span className="font-bold text-slate-900 text-sm">{activeServiceModal.priceRange}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Procedure Time</span>
                <span className="font-semibold text-slate-800">{activeServiceModal.duration}</span>
              </div>
              <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 col-span-2 sm:col-span-1">
                <span className="text-emerald-700 block text-[10px] uppercase font-bold">Comfort Level</span>
                <span className="font-bold text-emerald-800">{activeServiceModal.painRating}</span>
              </div>
            </div>

            {/* Procedure Features */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Clinical Workflow & Advantages
              </h4>
              <div className="space-y-1.5">
                {activeServiceModal.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50/70 p-2 rounded-lg">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Post-Care Guidelines */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span>Post-Treatment Care Instructions</span>
              </h4>
              <div className="space-y-1.5">
                {activeServiceModal.postCare.map((care, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-600 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/60">
                    <span className="font-bold text-amber-700">•</span>
                    <span>{care}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                id="modal-call-desk-btn"
                onClick={() => {
                  setActiveServiceModal(null);
                  onOpenCallSheet();
                }}
                className="ios-btn-glass text-slate-800 text-xs font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Speak to Doctor</span>
              </button>

              <button
                id="modal-book-this-service-btn"
                onClick={() => {
                  const serviceName = activeServiceModal.name;
                  setActiveServiceModal(null);
                  onSelectServiceForBooking(serviceName);
                }}
                className="ios-btn-primary text-white text-xs font-semibold py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book This Treatment</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
