import React, { useState } from 'react';
import { Camera, Sparkles, Shield, Image as ImageIcon, CheckCircle, ChevronRight, Eye } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/clinicData';

export const ClinicGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [previewImage, setPreviewImage] = useState<any | null>(null);

  const filters = ['All', 'Clinic', 'Equipment', 'Hygiene', 'Results'];

  const filteredItems = activeFilter === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <section className="space-y-8">
      {/* Title & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>Virtual Tour & Infrastructure</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            See Photos of Dashmesh Dental Clinic
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            Take a look inside our clean, sterilized operatories, modern digital equipment, and patient smile makeovers.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="ios-segmented-container flex flex-wrap gap-1">
          {filters.map((f) => (
            <button
              key={f}
              id={`gallery-filter-${f.toLowerCase()}`}
              onClick={() => setActiveFilter(f)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeFilter === f
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/70'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid in iOS Glass Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={idx}
            id={`gallery-card-${idx}`}
            onClick={() => setPreviewImage(item)}
            className="ios-glass rounded-3xl overflow-hidden border border-white/80 shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between"
          >
            {/* Image Container */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-full bg-slate-900/75 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/20">
                  {item.category}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="p-5 space-y-1.5">
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Enlarge Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="ios-glass max-w-2xl w-full rounded-3xl overflow-hidden border border-white/30 shadow-2xl space-y-4 p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 h-72 sm:h-96">
              <img
                src={previewImage.imageUrl}
                alt={previewImage.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-sky-600 uppercase tracking-wider bg-sky-50 px-2 py-0.5 rounded">
                  {previewImage.category}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {previewImage.title}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">{previewImage.desc}</p>
              </div>
              <button
                id="close-gallery-preview-btn"
                onClick={() => setPreviewImage(null)}
                className="ios-btn-glass text-xs font-semibold px-3 py-1.5 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
