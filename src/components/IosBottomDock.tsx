import React from 'react';
import { Phone, Calendar, Stethoscope, Sparkles, MapPin, MessageSquare } from 'lucide-react';

interface IosBottomDockProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBooking: () => void;
  onOpenCallSheet: () => void;
}

export const IosBottomDock: React.FC<IosBottomDockProps> = ({
  activeTab,
  setActiveTab,
  onOpenBooking,
  onOpenCallSheet,
}) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-md w-[92%] sm:w-auto">
      <div className="ios-glass rounded-full px-4 py-2 border border-white/80 shadow-2xl backdrop-blur-2xl flex items-center justify-between sm:justify-center gap-1 sm:gap-3">
        
        {/* Call button */}
        <button
          id="dock-call-btn"
          onClick={onOpenCallSheet}
          className="flex flex-col items-center justify-center p-2 rounded-2xl text-emerald-600 hover:bg-emerald-50 active:scale-95 transition-all group"
          title="Call Clinic"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-200">
            <Phone className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-slate-700 mt-0.5">Call</span>
        </button>

        {/* Book Token */}
        <button
          id="dock-book-btn"
          onClick={onOpenBooking}
          className="flex flex-col items-center justify-center p-2 rounded-2xl text-sky-600 hover:bg-sky-50 active:scale-95 transition-all group"
          title="Book Token"
        >
          <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center group-hover:bg-sky-200">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="text-[10px] font-bold text-slate-700 mt-0.5">Token</span>
        </button>

        {/* OPD Slip */}
        <button
          id="dock-opd-btn"
          onClick={() => setActiveTab('opd-slip')}
          className={`flex flex-col items-center justify-center p-2 rounded-2xl active:scale-95 transition-all group ${
            activeTab === 'opd-slip' ? 'bg-slate-900 text-white rounded-full px-3' : 'text-slate-700 hover:bg-slate-100'
          }`}
          title="Digital OPD Slip"
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === 'opd-slip' ? 'bg-slate-800' : 'bg-slate-100'}`}>
            <Stethoscope className="w-4 h-4" />
          </div>
          <span className={`text-[10px] font-bold mt-0.5 ${activeTab === 'opd-slip' ? 'text-white' : 'text-slate-700'}`}>OPD Slip</span>
        </button>

        {/* AI Care */}
        <button
          id="dock-ai-btn"
          onClick={() => setActiveTab('ai-triage')}
          className={`flex flex-col items-center justify-center p-2 rounded-2xl active:scale-95 transition-all group ${
            activeTab === 'ai-triage' ? 'bg-slate-900 text-white rounded-full px-3' : 'text-slate-700 hover:bg-slate-100'
          }`}
          title="AI Dental Triage"
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === 'ai-triage' ? 'bg-slate-800' : 'bg-slate-100'}`}>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <span className={`text-[10px] font-bold mt-0.5 ${activeTab === 'ai-triage' ? 'text-white' : 'text-slate-700'}`}>AI Care</span>
        </button>

        {/* Map */}
        <button
          id="dock-map-btn"
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center justify-center p-2 rounded-2xl active:scale-95 transition-all group ${
            activeTab === 'map' ? 'bg-slate-900 text-white rounded-full px-3' : 'text-slate-700 hover:bg-slate-100'
          }`}
          title="Map & Location"
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === 'map' ? 'bg-slate-800' : 'bg-slate-100'}`}>
            <MapPin className="w-4 h-4 text-rose-500" />
          </div>
          <span className={`text-[10px] font-bold mt-0.5 ${activeTab === 'map' ? 'text-white' : 'text-slate-700'}`}>Map</span>
        </button>

      </div>
    </div>
  );
};
