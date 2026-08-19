import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Stethoscope, AlertTriangle, Phone, Calendar, Bot, User, RefreshCw, CheckCircle2 } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

interface AiDentalAssistantProps {
  onOpenBooking: () => void;
  onOpenCallSheet: () => void;
}

const PRESET_QUESTIONS = [
  'Severe toothache keeping me awake at night',
  'Is Root Canal Treatment (RCT) painful?',
  'Bleeding and swollen gums while brushing',
  'Cost & lifespan of Dental Implants vs Crowns',
  'Emergency: Broken or chipped tooth first aid'
];

export const AiDentalAssistant: React.FC<AiDentalAssistantProps> = ({
  onOpenBooking,
  onOpenCallSheet,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      sender: 'ai',
      text: `Hello! I am your AI Dental Care Assistant at Dashmesh Dental Clinic (Abohar, Punjab).\n\nHow can I help you today? Describe your symptoms, tooth sensitivity, pain duration, or ask any question about Root Canal (RCT), Implants, Teeth Whitening, or Braces.`,
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputText).trim();
    if (!query || loading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai-dental-triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.map((m) => ({ role: m.sender, content: m.text }))
        }),
      });

      const data = await response.json();
      const aiReplyText = data.reply || 'Please visit Dashmesh Dental Clinic on Jain Nagari Road, Abohar for an in-person clinical checkup and digital X-ray.';

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      console.error('AI Triage error:', err);
      const fallbackMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `For your dental concern, we recommend booking a checkup at Dashmesh Dental Clinic (Jain Nagari Road, Abohar). In case of severe pain, please call our emergency helpline at 084300 33333 or 94179-28951.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="space-y-6">
      {/* Title */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-semibold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Dental Triage & Symptom Evaluation</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          AI Tooth Care Assistant
        </h2>
        <p className="text-sm text-slate-500 mt-1 max-w-xl">
          Get instantaneous preliminary guidance, home care comfort protocols, and treatment advice directly from Dashmesh Dental Clinic's digital system.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chat Window (8 cols) */}
        <div className="lg:col-span-8">
          <div className="ios-glass rounded-3xl border border-white/80 shadow-xl overflow-hidden flex flex-col h-[560px]">
            
            {/* Chat Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-sky-500 text-white flex items-center justify-center font-bold shadow-md shadow-sky-500/40">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold flex items-center gap-1.5">
                    <span>Dashmesh AI Dental Assistant</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  </h3>
                  <p className="text-[11px] text-slate-400">Online • Powered by Gemini AI</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="reset-chat-history-btn"
                  onClick={() => setMessages(messages.slice(0, 1))}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="Clear Chat"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Thread */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 max-w-[85%] ${
                    msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                      msg.sender === 'user'
                        ? 'bg-sky-600 text-white shadow-sm'
                        : 'bg-slate-900 text-white shadow-sm'
                    }`}
                  >
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className="space-y-1">
                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-sky-600 text-white rounded-tr-none shadow-md shadow-sky-600/10'
                          : 'ios-glass bg-white text-slate-800 rounded-tl-none border border-slate-200/80 shadow-sm'
                      }`}
                    >
                      <div className="whitespace-pre-line">{msg.text}</div>
                    </div>
                    <span
                      className={`text-[10px] text-slate-400 block px-1 ${
                        msg.sender === 'user' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-xs text-slate-500 italic p-3 bg-white/80 rounded-2xl border border-slate-200 w-fit">
                  <div className="w-2 h-2 rounded-full bg-sky-500 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-sky-500 animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 rounded-full bg-sky-500 animate-bounce [animation-delay:0.4s]"></div>
                  <span>Analyzing dental symptoms...</span>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Suggested Question Chips */}
            <div className="px-4 py-2 bg-slate-100/80 border-t border-slate-200 overflow-x-auto flex items-center gap-1.5 text-xs">
              <span className="text-[11px] font-bold text-slate-400 shrink-0">Quick Ask:</span>
              {PRESET_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  id={`preset-q-${idx}`}
                  onClick={() => handleSendMessage(q)}
                  className="px-2.5 py-1 rounded-full bg-white hover:bg-slate-200/90 text-slate-700 font-medium text-[11px] shrink-0 border border-slate-300/70 transition-colors shadow-2xs"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-slate-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  id="ai-chat-input-text"
                  type="text"
                  placeholder="Type your toothache, bleeding, or treatment query..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
                />
                <button
                  id="ai-chat-send-btn"
                  type="submit"
                  disabled={loading || !inputText.trim()}
                  className="ios-btn-primary text-white p-2.5 rounded-xl cursor-pointer disabled:opacity-40"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* Right / Emergency Disclaimer & Quick Actions (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Direct Actions Card */}
          <div className="ios-glass rounded-3xl p-6 border border-white/80 shadow-md space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Need In-Person Dental Examination?
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              AI advice cannot substitute for an intraoral inspection and digital RVG dental X-ray by Dr. Gurmeet Singh.
            </p>

            <div className="space-y-2 pt-2">
              <button
                id="ai-page-book-btn"
                onClick={onOpenBooking}
                className="w-full ios-btn-primary text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-sky-500/20"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Priority Token</span>
              </button>

              <button
                id="ai-page-call-btn"
                onClick={onOpenCallSheet}
                className="w-full ios-btn-glass text-slate-800 text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Call 084300 33333</span>
              </button>
            </div>
          </div>

          {/* Emergency Triage Red Flags */}
          <div className="p-5 rounded-3xl bg-rose-50 border border-rose-200/80 text-xs text-rose-950 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-rose-900">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Immediate Dental Emergency Flags</span>
            </div>
            <ul className="space-y-1 text-[11px] text-rose-800 list-disc list-inside">
              <li>Visible facial swelling near jaw or eye</li>
              <li>Continuous bleeding after dental trauma</li>
              <li>Completely knocked-out tooth (save in milk & visit within 30 mins)</li>
              <li>Difficulty swallowing or opening jaw</li>
            </ul>
          </div>

          {/* Clinic Address Reminder */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600">
            <span className="font-bold text-slate-800 block">Dashmesh Dental Clinic</span>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Jain Nagari Road, Near Main Water Works, Abohar (PB)
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
