import React from 'react';
import { MapPin, Navigation, Phone, Clock, Compass, Car, Train, ShieldCheck, ExternalLink, Calendar } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface MapAndDirectionsProps {
  onOpenBooking: () => void;
  onOpenCallSheet: () => void;
}

export const MapAndDirections: React.FC<MapAndDirectionsProps> = ({
  onOpenBooking,
  onOpenCallSheet,
}) => {
  return (
    <section className="space-y-8">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold mb-2">
          <MapPin className="w-3.5 h-3.5" />
          <span>Clinic Location & Landmark Guide</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Find Dashmesh Dental Clinic in Abohar
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-xl">
          Conveniently located on Main Jain Nagari Road, opposite / near Abohar Main Water Works (Punjab 152116).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left / Location Info & Hours (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Address & Direct Phone Card */}
          <div className="ios-glass rounded-3xl p-6 border border-white/80 shadow-md space-y-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                Official Address
              </span>
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                Dashmesh Dental Clinic
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Jain Nagari Road, Near Main Water Works, Jain Nagar, Abohar, Punjab 152116
              </p>
            </div>

            {/* Travel Time Badge from Prompt */}
            <div className="p-3 bg-sky-50 rounded-2xl border border-sky-200/80 flex items-center gap-3 text-xs text-sky-950">
              <div className="w-8 h-8 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold shrink-0">
                <Car className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold block">Travel Time: ~2 hrs 26 mins</span>
                <span className="text-[11px] text-sky-800">From Bathinda / regional highway routes</span>
              </div>
            </div>

            {/* Phone numbers */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                Direct Contact Helplines:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  id="map-call-primary"
                  href="tel:08430033333"
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between font-semibold text-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>084300 33333</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Reception</span>
                </a>

                <a
                  id="map-call-desk2"
                  href="tel:9779505055"
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-between font-semibold text-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-600" />
                    <span>9779505055</span>
                  </div>
                  <span className="text-[10px] text-slate-400">OPD Helpdesk</span>
                </a>
              </div>
            </div>

            {/* Launch Map Button */}
            <a
              id="open-google-maps-full-btn"
              href={CLINIC_INFO.mapCoordinates.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full ios-btn-primary text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-sky-500/20"
            >
              <Navigation className="w-4 h-4" />
              <span>Open in Google Maps App</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>

          {/* Working Hours Card */}
          <div className="ios-glass rounded-3xl p-6 border border-white/80 shadow-md space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-600" />
                <span>Operating Clinic Hours</span>
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Open Today
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="font-semibold text-slate-700">Monday – Saturday</span>
                <div className="text-right">
                  <span className="font-bold text-slate-900 block">9:00 AM – 2:00 PM</span>
                  <span className="font-bold text-slate-900 block">4:30 PM – 8:30 PM</span>
                </div>
              </div>

              <div className="flex justify-between py-1.5">
                <span className="font-semibold text-slate-700">Sunday</span>
                <div className="text-right">
                  <span className="font-bold text-slate-900 block">9:30 AM – 2:00 PM</span>
                  <span className="text-[10px] text-amber-600">(Emergency & Appt. Only)</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right / Interactive Map Visual & Landmark Directions (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Map Simulated Frame & Navigation Pin */}
          <div className="ios-glass rounded-3xl overflow-hidden border border-white/80 shadow-xl space-y-0">
            {/* Visual Map Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
                <span className="font-bold">Live GPS Coordinates: 30.1453° N, 74.1995° E</span>
              </div>
              <span className="text-slate-400 font-mono text-[11px]">Abohar, PB</span>
            </div>

            {/* Real Interactive Google Maps Iframe */}
            <div className="relative h-80 sm:h-96 w-full bg-slate-100 overflow-hidden">
              <iframe
                title="Dashmesh Dental Clinic Map"
                src="https://maps.google.com/maps?q=Dashmesh+Dental+Clinic+Jain+Nagari+Road+Abohar+Punjab+152116&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>

            {/* Map Card Footer with Quick Directions */}
            <div className="p-5 bg-white/80 backdrop-blur-md border-t border-slate-200 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                How to Reach Us (Turn-by-Turn Landmarks)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-800 block mb-0.5">By Car / Two-Wheeler:</span>
                  <span>Head towards Jain Nagar from Circular Road or NH-15, clinic is located right opposite Abohar Main Water Works with dedicated parking.</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-800 block mb-0.5">From Abohar Railway Station:</span>
                  <span>Only 1.5 km (approx. 5-7 minutes via auto-rickshaw or taxi).</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
