import React, { useState } from 'react';
import { Phone, MapPin, Sparkles, Clock, Calendar, Star, Stethoscope, ChevronRight, Menu, X, Mail } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
  onOpenCallSheet: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenBooking,
  onOpenCallSheet,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Stethoscope },
    { id: 'services', label: 'Services & Rates', icon: Sparkles },
    { id: 'opd-slip', label: 'Digital OPD Slip', icon: Stethoscope },
    { id: 'book', label: 'Book Token', icon: Calendar },
    { id: 'reviews', label: 'Reviews (3.02★)', icon: Star },
    { id: 'map', label: 'Map & Location', icon: MapPin },
    { id: 'ai-triage', label: 'AI Tooth Care', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* iOS Top Bar Pill / Dynamic Status Strip */}
      <div className="bg-slate-900/90 text-white backdrop-blur-md border-b border-white/10 px-4 py-1.5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-medium border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Open Today: 9:00 AM – 8:30 PM
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-slate-300">
              <MapPin className="w-3 h-3 text-sky-400" />
              Main Jain Nagar Road, Abohar
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <button
              id="header-top-call-btn"
              onClick={onOpenCallSheet}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors font-medium text-sky-300"
            >
              <Phone className="w-3 h-3" />
              <span>084300 33333</span>
              <span className="text-slate-500">|</span>
              <span>94179-28951</span>
            </button>
            <a
              id="header-top-maps-link"
              href={CLINIC_INFO.mapCoordinates.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <Clock className="w-3 h-3 text-amber-400" />
              <span>Directions</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Glass Navigation Bar */}
      <div className="ios-glass border-b border-white/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Brand Logo & Name */}
          <button
            id="brand-logo-btn"
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-sky-500/25 border border-white/40 group-hover:scale-105 transition-transform">
              <span className="font-bold text-lg tracking-tight">D</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">
                  Dashmesh Dental Clinic
                </span>
                <span className="hidden lg:inline-flex px-2 py-0.5 text-[10px] font-semibold bg-sky-100/90 text-sky-800 rounded-full border border-sky-200">
                  Abohar, PB
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Precision & Aesthetic Dental Care
              </p>
            </div>
          </button>

          {/* Desktop iOS Segmented Navigation */}
          <nav className="hidden xl:flex items-center ios-segmented-container">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/40'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-sky-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Glass Buttons */}
          <div className="flex items-center gap-2">
            <a
              id="header-email-btn"
              href="mailto:rinkuvirk54@gmail.com?subject=Appointment%20Inquiry%20%E2%80%93%20Dashmesh%20Dental%20Clinic"
              className="ios-btn-glass text-slate-800 text-xs font-semibold px-3 py-2 rounded-xl hidden lg:flex items-center gap-1.5 hover:text-rose-600 transition-colors"
              title="Email rinkuvirk54@gmail.com"
            >
              <Mail className="w-3.5 h-3.5 text-rose-500" />
              <span>Email Us</span>
            </a>

            <button
              id="header-book-btn"
              onClick={onOpenBooking}
              className="ios-btn-primary text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Token</span>
            </button>

            <button
              id="header-call-quick-btn"
              onClick={onOpenCallSheet}
              className="ios-btn-glass text-slate-800 text-xs sm:text-sm font-semibold px-3 py-2 rounded-xl hidden sm:flex items-center gap-1.5"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Call</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl ios-btn-glass text-slate-700"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer / Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden px-4 pt-2 pb-4 border-t border-slate-200/60 bg-white/95 backdrop-blur-xl">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                      isActive
                        ? 'bg-sky-500 text-white shadow-sm'
                        : 'bg-slate-100/80 text-slate-700 hover:bg-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
