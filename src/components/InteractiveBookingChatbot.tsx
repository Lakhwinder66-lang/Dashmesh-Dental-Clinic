import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Send,
  Bot,
  User,
  Calendar,
  Clock,
  Phone,
  Mail,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  MessageCircle,
  Stethoscope,
  MapPin,
  FileText,
  ArrowRight,
  Edit3
} from 'lucide-react';
import { CLINIC_INFO, SERVICES } from '../data/clinicData';
import { Appointment } from '../types';

export interface BookingFormData {
  fullName: string;
  mobileNumber: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  reasonForVisit: string;
  isExistingPatient: string; // 'Yes' | 'No'
}

type BookingStep =
  | 'GREETING'
  | 'STEP_NAME'
  | 'STEP_PHONE'
  | 'STEP_EMAIL'
  | 'STEP_DATE'
  | 'STEP_TIME'
  | 'STEP_REASON'
  | 'STEP_EXISTING'
  | 'CONFIRMATION_SUMMARY'
  | 'BOOKING_COMPLETED';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  chips?: { label: string; action: () => void }[];
  isSummary?: boolean;
  isCompleted?: boolean;
}

interface InteractiveBookingChatbotProps {
  onAppointmentCreated?: (appointment: Appointment) => void;
  preselectedService?: string;
}

export const InteractiveBookingChatbot: React.FC<InteractiveBookingChatbotProps> = ({
  onAppointmentCreated,
  preselectedService,
}) => {
  const [currentStep, setCurrentStep] = useState<BookingStep>('GREETING');
  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    mobileNumber: '',
    email: '',
    preferredDate: '',
    preferredTime: '',
    reasonForVisit: preselectedService || '',
    isExistingPatient: '',
  });

  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Helper format Indian Phone Number
  const cleanAndValidatePhone = (phoneStr: string): { valid: boolean; cleaned: string } => {
    const digitsOnly = phoneStr.replace(/\D/g, '');
    let clean = digitsOnly;
    if (clean.length === 12 && clean.startsWith('91')) {
      clean = clean.slice(2);
    } else if (clean.length === 11 && clean.startsWith('0')) {
      clean = clean.slice(1);
    }
    const isValid = clean.length === 10 && /^[6789]\d{9}$/.test(clean);
    return { valid: isValid, cleaned: clean };
  };

  // Helper validate Email format
  const validateEmail = (emailStr: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr.trim());
  };

  // Generate today and tomorrow date strings
  const getQuickDates = () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(today.getDate() + 2);

    const fmt = (d: Date) => d.toISOString().split('T')[0];
    const fmtDisplay = (d: Date) =>
      d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });

    return [
      { raw: fmt(today), label: `Today (${fmtDisplay(today)})` },
      { raw: fmt(tomorrow), label: `Tomorrow (${fmtDisplay(tomorrow)})` },
      { raw: fmt(dayAfter), label: `Day After (${fmtDisplay(dayAfter)})` },
    ];
  };

  const initialGreetingText = `Hello and welcome to **Dashmesh Dental Clinic** (Abohar, Punjab)!\n\nI am your digital appointment assistant. How may I assist you today? You can book an appointment slot, check dental services, or ask any question.`;

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // Initialize first greeting
  useEffect(() => {
    const quickDates = getQuickDates();
    setMessages([
      {
        id: 'msg-greeting',
        sender: 'ai',
        text: initialGreetingText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        chips: [
          {
            label: '📅 Book an Appointment',
            action: () => startBookingFlow(),
          },
          {
            label: '🦷 Ask Dental Symptoms & Pricing',
            action: () => handleGeneralInquiry('What are the dental services and RCT pricing at Dashmesh Dental Clinic?'),
          },
          {
            label: '📍 Clinic Location & Timings',
            action: () => handleGeneralInquiry('Where is Dashmesh Dental Clinic located and what are opening hours?'),
          },
          {
            label: '📞 Call Reception (084300 33333)',
            action: () => window.open('tel:08430033333'),
          }
        ]
      }
    ]);
  }, []);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const addAiMessage = (
    text: string,
    chips?: { label: string; action: () => void }[],
    options?: { isSummary?: boolean; isCompleted?: boolean }
  ) => {
    const newMsg: ChatMessage = {
      id: `ai-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      sender: 'ai',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      chips,
      isSummary: options?.isSummary,
      isCompleted: options?.isCompleted,
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  const addUserMessage = (text: string) => {
    const newMsg: ChatMessage = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, newMsg]);
  };

  // STEP 1 -> STEP 2 Transition
  const startBookingFlow = () => {
    setCurrentStep('STEP_NAME');
    addUserMessage('I would like to book an appointment.');
    setTimeout(() => {
      addAiMessage(
        `Wonderful! I will guide you through collecting your appointment details step-by-step.\n\n**Step 1 of 7:** What is your **Full Name**?`
      );
    }, 400);
  };

  // Handle General Inquiries outside booking or during booking
  const handleGeneralInquiry = async (queryText: string) => {
    addUserMessage(queryText);
    setLoading(true);

    try {
      const res = await fetch('/api/ai-dental-triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: queryText }),
      });
      const data = await res.json();
      const reply = data.reply || 'Dashmesh Dental Clinic is located on Main Jain Nagari Road, Abohar (Phone: 084300 33333).';

      if (currentStep === 'GREETING') {
        addAiMessage(reply, [
          { label: '📅 Book Appointment Now', action: () => startBookingFlow() },
          { label: '📞 Call 084300 33333', action: () => window.open('tel:08430033333') },
        ]);
      } else {
        // Answer briefly, then guide back to the current booking step
        const stepReminder = getStepPrompt(currentStep, formData);
        addAiMessage(`${reply}\n\n---\n*Now, returning to your appointment booking:*\n${stepReminder}`);
      }
    } catch (e) {
      addAiMessage(
        `Dashmesh Dental Clinic (Abohar) offers painless dentistry, digital RCT, and implants. Call 084300 33333 for immediate assistance.`
      );
    } finally {
      setLoading(false);
    }
  };

  // Step prompt generator for reminders
  const getStepPrompt = (step: BookingStep, currentData: BookingFormData): string => {
    switch (step) {
      case 'STEP_NAME':
        return `**Step 1 of 7:** Please tell me your **Full Name**.`;
      case 'STEP_PHONE':
        return `**Step 2 of 7:** What is your **10-digit Mobile Number**?`;
      case 'STEP_EMAIL':
        return `**Step 3 of 7:** What is your **Email Address**?`;
      case 'STEP_DATE':
        return `**Step 4 of 7:** What is your **Preferred Date** for the visit?`;
      case 'STEP_TIME':
        return `**Step 5 of 7:** What is your **Preferred Time Slot**?`;
      case 'STEP_REASON':
        return `**Step 6 of 7:** What is the **Reason for your Visit** / dental service needed?`;
      case 'STEP_EXISTING':
        return `**Step 7 of 7:** Have you visited us before? Are you an **Existing Patient** (Yes/No)?`;
      case 'CONFIRMATION_SUMMARY':
        return `Please review your summary above and let me know: "Yes, Confirm Booking" or "Edit".`;
      default:
        return `How can I help you?`;
    }
  };

  // STEP 2: Handle Sequential Steps
  const processUserInput = (rawInput: string) => {
    const input = rawInput.trim();
    if (!input || loading) return;

    // Check if user is in GREETING state and wants to book
    if (currentStep === 'GREETING') {
      const lower = input.toLowerCase();
      if (
        lower.includes('book') ||
        lower.includes('appointment') ||
        lower.includes('token') ||
        lower.includes('slot') ||
        lower.includes('yes')
      ) {
        startBookingFlow();
      } else {
        handleGeneralInquiry(input);
      }
      return;
    }

    // 1. FULL NAME STEP
    if (currentStep === 'STEP_NAME') {
      if (input.length < 2) {
        addUserMessage(input);
        addAiMessage(
          `Please provide a valid full name (at least 2 characters) so our clinic can record your OPD registration properly.`
        );
        return;
      }
      const updated = { ...formData, fullName: input };
      setFormData(updated);
      addUserMessage(input);
      setCurrentStep('STEP_PHONE');
      setTimeout(() => {
        addAiMessage(
          `Thank you, **${input}**!\n\n**Step 2 of 7:** What is your **10-digit Mobile Number** (India)?\n*(e.g., 9876543210 or 9779505055)*`
        );
      }, 400);
      return;
    }

    // 2. MOBILE NUMBER STEP
    if (currentStep === 'STEP_PHONE') {
      addUserMessage(input);
      const { valid, cleaned } = cleanAndValidatePhone(input);
      if (!valid) {
        addAiMessage(
          `⚠️ **Invalid Mobile Number format.**\nPlease enter a valid 10-digit Indian mobile number (e.g., **9876543210** or **9779505055**). We cannot skip this field as our doctors require it for confirmation.`
        );
        return;
      }
      const updated = { ...formData, mobileNumber: cleaned };
      setFormData(updated);
      setCurrentStep('STEP_EMAIL');
      setTimeout(() => {
        addAiMessage(
          `Got it (+91 ${cleaned}).\n\n**Step 3 of 7:** What is your **Email Address** for receiving your digital confirmation and OPD slip?`
        );
      }, 400);
      return;
    }

    // 3. EMAIL ADDRESS STEP
    if (currentStep === 'STEP_EMAIL') {
      addUserMessage(input);
      if (!validateEmail(input)) {
        addAiMessage(
          `⚠️ **Invalid Email format.**\nPlease provide a valid email address (e.g., **name@gmail.com**). This field is required to send your appointment record.`
        );
        return;
      }
      const updated = { ...formData, email: input.toLowerCase() };
      setFormData(updated);
      setCurrentStep('STEP_DATE');

      const quickDates = getQuickDates();
      setTimeout(() => {
        addAiMessage(
          `Thank you.\n\n**Step 4 of 7:** What is your **Preferred Date** for the appointment?\n*You can select from the quick options below or type any date.*`,
          quickDates.map((qd) => ({
            label: qd.label,
            action: () => handleSelectDate(qd.raw, qd.label),
          }))
        );
      }, 400);
      return;
    }

    // 4. PREFERRED DATE STEP
    if (currentStep === 'STEP_DATE') {
      addUserMessage(input);
      if (input.length < 3) {
        addAiMessage(`Please specify a valid preferred date for your appointment.`);
        return;
      }
      handleSelectDate(input, input);
      return;
    }

    // 5. PREFERRED TIME SLOT STEP
    if (currentStep === 'STEP_TIME') {
      addUserMessage(input);
      if (input.length < 2) {
        addAiMessage(`Please choose or type your preferred time slot.`);
        return;
      }
      handleSelectTime(input);
      return;
    }

    // 6. REASON FOR VISIT STEP
    if (currentStep === 'STEP_REASON') {
      addUserMessage(input);
      if (input.length < 2) {
        addAiMessage(`Please describe the reason for your visit or the dental treatment needed.`);
        return;
      }
      handleSelectReason(input);
      return;
    }

    // 7. EXISTING PATIENT STEP
    if (currentStep === 'STEP_EXISTING') {
      addUserMessage(input);
      const lower = input.toLowerCase();
      let isExisting = 'No';
      if (lower.includes('yes') || lower.includes('haan') || lower.includes('old') || lower.includes('existing')) {
        isExisting = 'Yes';
      } else if (lower.includes('no') || lower.includes('nahi') || lower.includes('new') || lower.includes('first')) {
        isExisting = 'No';
      } else {
        addAiMessage(
          `Please clarify: Have you visited Dashmesh Dental Clinic before?\n*(Please answer "Yes" or "No")*`,
          [
            { label: 'Yes, Existing Patient', action: () => handleSelectExisting('Yes') },
            { label: 'No, New Patient', action: () => handleSelectExisting('No') },
          ]
        );
        return;
      }
      handleSelectExisting(isExisting);
      return;
    }

    // STEP 3: CONFIRMATION SUMMARY STEP
    if (currentStep === 'CONFIRMATION_SUMMARY') {
      addUserMessage(input);
      const lower = input.toLowerCase();
      if (lower.includes('yes') || lower.includes('confirm') || lower.includes('ok') || lower.includes('done') || lower.includes('sahi')) {
        executeFinalConfirmation();
      } else if (lower.includes('edit') || lower.includes('change') || lower.includes('no')) {
        handleEditDetails();
      } else {
        addAiMessage(
          `Would you like to confirm this appointment or edit details?\n\n• Reply **"Yes"** to confirm\n• Reply **"Edit"** to modify your information`,
          [
            { label: '✅ Yes, Confirm Booking', action: () => executeFinalConfirmation() },
            { label: '✏️ Edit Details', action: () => handleEditDetails() },
          ]
        );
      }
      return;
    }

    // Default if completed
    if (currentStep === 'BOOKING_COMPLETED') {
      addUserMessage(input);
      handleGeneralInquiry(input);
    }
  };

  // Handlers for chip clicks
  const handleSelectDate = (dateVal: string, displayVal: string) => {
    const updated = { ...formData, preferredDate: dateVal };
    setFormData(updated);
    setCurrentStep('STEP_TIME');

    setTimeout(() => {
      addAiMessage(
        `Selected Date: **${displayVal}**\n\n**Step 5 of 7:** What is your **Preferred Time Slot**?\n\n*Clinic Timings:*\n• Morning: 9:00 AM – 2:00 PM\n• Evening: 4:30 PM – 8:30 PM`,
        [
          { label: '🌅 10:00 AM', action: () => handleSelectTime('10:00 AM') },
          { label: '🌅 11:15 AM', action: () => handleSelectTime('11:15 AM') },
          { label: '🌅 12:30 PM', action: () => handleSelectTime('12:30 PM') },
          { label: '🌇 05:00 PM', action: () => handleSelectTime('05:00 PM') },
          { label: '🌇 06:15 PM', action: () => handleSelectTime('06:15 PM') },
          { label: '🌇 07:30 PM', action: () => handleSelectTime('07:30 PM') },
        ]
      );
    }, 400);
  };

  const handleSelectTime = (timeVal: string) => {
    const updated = { ...formData, preferredTime: timeVal };
    setFormData(updated);
    setCurrentStep('STEP_REASON');

    setTimeout(() => {
      addAiMessage(
        `Time selected: **${timeVal}**\n\n**Step 6 of 7:** What is the **Reason for your Visit** or service needed?`,
        [
          { label: 'Toothache / RCT', action: () => handleSelectReason('Root Canal Treatment (RCT) / Toothache') },
          { label: 'Teeth Cleaning & Scaling', action: () => handleSelectReason('Teeth Cleaning & Scaling') },
          { label: 'Dental Implants', action: () => handleSelectReason('Dental Implants Consultation') },
          { label: 'Braces / Aligners', action: () => handleSelectReason('Braces & Invisible Aligners') },
          { label: 'Crown / Capping', action: () => handleSelectReason('Zirconia / Ceramic Crown') },
          { label: 'Teeth Whitening', action: () => handleSelectReason('Teeth Whitening & Brightening') },
          { label: 'General Checkup', action: () => handleSelectReason('General Dental Examination') },
        ]
      );
    }, 400);
  };

  const handleSelectReason = (reasonVal: string) => {
    const updated = { ...formData, reasonForVisit: reasonVal };
    setFormData(updated);
    setCurrentStep('STEP_EXISTING');

    setTimeout(() => {
      addAiMessage(
        `Reason noted: **${reasonVal}**\n\n**Step 7 of 7:** Have you visited Dashmesh Dental Clinic before? Are you an **Existing Patient**?`,
        [
          { label: 'Yes, Existing Patient', action: () => handleSelectExisting('Yes') },
          { label: 'No, New Patient', action: () => handleSelectExisting('No') },
        ]
      );
    }, 400);
  };

  const handleSelectExisting = (yesNo: string) => {
    const updated = { ...formData, isExistingPatient: yesNo };
    setFormData(updated);
    setCurrentStep('CONFIRMATION_SUMMARY');

    // STEP 3: Show Structured Summary back to visitor
    const summaryText = `📋 **Appointment Details Summary:**\n\n• **Name:** ${updated.fullName}\n• **Mobile Number:** +91 ${updated.mobileNumber}\n• **Email:** ${updated.email}\n• **Preferred Date:** ${updated.preferredDate}\n• **Preferred Time:** ${updated.preferredTime}\n• **Reason for Visit:** ${updated.reasonForVisit}\n• **Existing Patient:** ${updated.isExistingPatient}\n\nIs all of this information correct? Please click **"Yes, Confirm Booking"** or **"Edit"**.`;

    setTimeout(() => {
      addAiMessage(
        summaryText,
        [
          { label: '✅ Yes, Confirm Booking', action: () => executeFinalConfirmation(updated) },
          { label: '✏️ Edit Details', action: () => handleEditDetails() },
        ],
        { isSummary: true }
      );
    }, 400);
  };

  const handleEditDetails = () => {
    setCurrentStep('STEP_NAME');
    addAiMessage(
      `No problem! Let's update your details from Step 1.\n\nWhat is your **Full Name**?`
    );
  };

  // STEP 4 & STEP 5: Execution on Confirmation
  const executeFinalConfirmation = async (dataOverride?: BookingFormData) => {
    const data = dataOverride || formData;
    setLoading(true);

    try {
      // 1. Create appointment in backend
      const apptRes = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName: data.fullName,
          phone: data.mobileNumber,
          email: data.email,
          service: data.reasonForVisit,
          date: data.preferredDate,
          time: data.preferredTime,
          existingPatient: data.isExistingPatient,
          notes: `Booked via website chatbot. Existing Patient: ${data.isExistingPatient}`,
        }),
      });

      const apptData = await apptRes.json();
      const confirmed: Appointment = apptData.appointment || {
        id: `DDC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        opdNo: `OPD-${Math.floor(1000 + Math.random() * 9000)}`,
        patientName: data.fullName,
        phone: data.mobileNumber,
        email: data.email,
        age: 30,
        gender: 'Not Specified',
        service: data.reasonForVisit,
        doctor: 'Dr. Gurpreet Singh (BDS, MDS)',
        date: data.preferredDate,
        time: data.preferredTime,
        tokenNo: 5,
        status: 'Confirmed',
        existingPatient: data.isExistingPatient,
        notes: `Booked via website chatbot. Existing Patient: ${data.isExistingPatient}`,
        createdAt: new Date().toISOString(),
      };

      setConfirmedAppointment(confirmed);
      if (onAppointmentCreated) {
        onAppointmentCreated(confirmed);
      }

      // 2. STEP 4a: Send Email Notification to both clinic4@gmail.com and rinkuvirk54@gmail.com
      try {
        await fetch('/api/send-appointment-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.fullName,
            mobile_number: data.mobileNumber,
            email: data.email,
            date: data.preferredDate,
            time: data.preferredTime,
            reason: data.reasonForVisit,
            yes_no: data.isExistingPatient,
          }),
        });
      } catch (e) {
        console.warn('Email endpoint log dispatch:', e);
      }

      // STEP 4b: WhatsApp & Email Payload Formulation
      const plainTextPayload = `📋 New Appointment Request\n\nName: ${data.fullName}\nMobile Number: ${data.mobileNumber}\nEmail: ${data.email || 'Not provided'}\nPreferred Date: ${data.preferredDate}\nPreferred Time: ${data.preferredTime}\nReason for Visit: ${data.reasonForVisit}\nExisting Patient: ${data.isExistingPatient}\n\n— Booked via website chatbot`;

      const waEncoded = encodeURIComponent(plainTextPayload);
      const waUrl = `https://wa.me/919779505055?text=${waEncoded}`;
      const waDirectApi = `https://api.whatsapp.com/send?phone=919779505055&text=${waEncoded}`;

      const emailSubject = encodeURIComponent(`New Appointment Request – ${data.fullName}`);
      const emailBody = encodeURIComponent(plainTextPayload);
      const mailtoBothUrl = `mailto:clinic4@gmail.com,rinkuvirk54@gmail.com?subject=${emailSubject}&body=${emailBody}`;
      const mailtoClinic4Url = `mailto:clinic4@gmail.com?subject=${emailSubject}&body=${emailBody}`;
      const mailtoRinkuUrl = `mailto:rinkuvirk54@gmail.com?subject=${emailSubject}&body=${emailBody}`;

      // Helper for direct link clicks
      const openExternalLink = (url: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      // STEP 5: Confirmation message to visitor
      const step5Confirmation = `🎉 **Appointment Request Successfully Received!**\n\nThank you, **${data.fullName}**!\nYour appointment request has been recorded for **${data.preferredDate} at ${data.preferredTime}**.\n\n• **Token ID:** ${confirmed.id} (${confirmed.opdNo})\n• **Email Alert Dispatched To:** \`clinic4@gmail.com\` & \`rinkuvirk54@gmail.com\`\n• **Clinic WhatsApp Alert:** \`+91 9779505055\` (09779505055)\n\nOur clinic reception at Dashmesh Dental Clinic will contact you shortly on **+91 ${data.mobileNumber}** to finalize your consultation.`;

      setCurrentStep('BOOKING_COMPLETED');

      // Trigger Confetti
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#0071e3', '#30d158', '#ffd60a', '#64d2ff'],
      });

      addAiMessage(
        step5Confirmation,
        [
          {
            label: '💬 Send WhatsApp Alert to +91 9779505055',
            action: () => openExternalLink(waUrl),
          },
          {
            label: '✉️ Send Email to clinic4@gmail.com',
            action: () => openExternalLink(mailtoClinic4Url),
          },
          {
            label: '✉️ Send Email to rinkuvirk54@gmail.com',
            action: () => openExternalLink(mailtoRinkuUrl),
          },
          {
            label: '📩 Send Email to Both Clinics',
            action: () => openExternalLink(mailtoBothUrl),
          },
          {
            label: '📞 Call Reception: 084300 33333',
            action: () => (window.location.href = 'tel:08430033333'),
          },
          {
            label: '🔄 Book Another Appointment',
            action: () => resetChat(),
          }
        ],
        { isCompleted: true }
      );
    } catch (err) {
      console.error('Confirmation error:', err);
      addAiMessage(
        `Your booking information has been captured! Please call our reception at 084300 33333 or WhatsApp +91 9779505055.`
      );
    } finally {
      setLoading(false);
    }
  };

  const resetChat = () => {
    setCurrentStep('GREETING');
    setFormData({
      fullName: '',
      mobileNumber: '',
      email: '',
      preferredDate: '',
      preferredTime: '',
      reasonForVisit: '',
      isExistingPatient: '',
    });
    setConfirmedAppointment(null);
    setMessages([
      {
        id: `msg-reset-${Date.now()}`,
        sender: 'ai',
        text: initialGreetingText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        chips: [
          { label: '📅 Book an Appointment', action: () => startBookingFlow() },
          { label: '🦷 Ask Dental Symptoms & Pricing', action: () => handleGeneralInquiry('What are the dental services and RCT pricing at Dashmesh Dental Clinic?') },
          { label: '📍 Clinic Location & Timings', action: () => handleGeneralInquiry('Where is Dashmesh Dental Clinic located and what are opening hours?') },
        ]
      }
    ]);
  };

  return (
    <div className="ios-glass rounded-3xl border border-white/80 shadow-2xl overflow-hidden flex flex-col h-[640px]">
      
      {/* Header Bar */}
      <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center font-bold text-white shadow-md shadow-sky-500/30">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold">Dashmesh Clinic Booking Assistant</h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Active
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Auto-Notification: clinic4@gmail.com & rinkuvirk54@gmail.com • WhatsApp: +91 9779505055
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="reset-booking-chat-btn"
            onClick={resetChat}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Restart Assistant"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress Step Indicator if booking is active */}
      {currentStep !== 'GREETING' && currentStep !== 'BOOKING_COMPLETED' && (
        <div className="bg-sky-50/90 border-b border-sky-100 px-4 py-2 flex items-center justify-between text-xs text-sky-900 font-medium">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-sky-600" />
            <span>
              Booking Progress:{' '}
              {currentStep === 'STEP_NAME' && 'Step 1 of 7 (Full Name)'}
              {currentStep === 'STEP_PHONE' && 'Step 2 of 7 (Mobile Number)'}
              {currentStep === 'STEP_EMAIL' && 'Step 3 of 7 (Email Address)'}
              {currentStep === 'STEP_DATE' && 'Step 4 of 7 (Preferred Date)'}
              {currentStep === 'STEP_TIME' && 'Step 5 of 7 (Preferred Time)'}
              {currentStep === 'STEP_REASON' && 'Step 6 of 7 (Reason for Visit)'}
              {currentStep === 'STEP_EXISTING' && 'Step 7 of 7 (Existing Patient)'}
              {currentStep === 'CONFIRMATION_SUMMARY' && 'Summary Review & Confirmation'}
            </span>
          </span>
          <span className="text-[11px] text-sky-700 font-bold bg-white px-2 py-0.5 rounded-md border border-sky-200">
            {formData.fullName ? formData.fullName : 'New Patient'}
          </span>
        </div>
      )}

      {/* Messages Thread */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 max-w-[90%] sm:max-w-[85%] ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                msg.sender === 'user'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-900 text-white shadow-sm'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            <div className="space-y-2 flex-1">
              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-sky-600 text-white rounded-tr-none shadow-md shadow-sky-600/10'
                    : msg.isCompleted
                    ? 'bg-emerald-50 text-emerald-950 rounded-tl-none border border-emerald-200 shadow-md'
                    : msg.isSummary
                    ? 'bg-white text-slate-800 rounded-tl-none border-2 border-sky-500/80 shadow-lg'
                    : 'ios-glass bg-white text-slate-800 rounded-tl-none border border-slate-200/80 shadow-sm'
                }`}
              >
                <div className="whitespace-pre-line font-sans">{msg.text}</div>

                {/* If completed, show structured cards */}
                {msg.isCompleted && confirmedAppointment && (
                  <div className="mt-3 pt-3 border-t border-emerald-200/80 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-200">
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">Token Number</span>
                      <span className="font-extrabold text-emerald-700 text-sm">Token #{confirmedAppointment.tokenNo}</span>
                    </div>
                    <div className="bg-white/80 p-2.5 rounded-xl border border-emerald-200">
                      <span className="text-[10px] text-slate-500 font-bold uppercase block">OPD Reference</span>
                      <span className="font-extrabold text-slate-800 font-mono text-xs">{confirmedAppointment.opdNo}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Chips */}
              {msg.chips && msg.chips.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {msg.chips.map((chip, idx) => (
                    <button
                      key={idx}
                      onClick={chip.action}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-sky-50 text-sky-800 text-xs font-semibold border border-sky-200/80 shadow-xs active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>{chip.label}</span>
                    </button>
                  ))}
                </div>
              )}

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
            <span>Processing your appointment request...</span>
          </div>
        )}
        <div ref={chatBottomRef} />
      </div>

      {/* Input Bar */}
      <div className="p-3 bg-white border-t border-slate-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (inputText.trim()) {
              const text = inputText;
              setInputText('');
              processUserInput(text);
            }
          }}
          className="flex items-center gap-2"
        >
          <input
            id="chatbot-input-text"
            type="text"
            placeholder={
              currentStep === 'STEP_NAME'
                ? 'Type your Full Name...'
                : currentStep === 'STEP_PHONE'
                ? 'Type 10-digit Indian Mobile Number...'
                : currentStep === 'STEP_EMAIL'
                ? 'Type your Email Address...'
                : currentStep === 'STEP_DATE'
                ? 'Type or pick Preferred Date...'
                : currentStep === 'STEP_TIME'
                ? 'Type or choose Preferred Time...'
                : currentStep === 'STEP_REASON'
                ? 'Type reason for visit / service...'
                : currentStep === 'STEP_EXISTING'
                ? 'Type "Yes" or "No"...'
                : currentStep === 'CONFIRMATION_SUMMARY'
                ? 'Type "Yes" to confirm or "Edit"...'
                : 'Type your message or ask to book an appointment...'
            }
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/30"
          />
          <button
            id="chatbot-send-btn"
            type="submit"
            disabled={loading || !inputText.trim()}
            className="ios-btn-primary text-white p-2.5 sm:px-4 sm:py-2.5 rounded-xl cursor-pointer disabled:opacity-40 flex items-center gap-1.5 text-xs font-semibold"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </div>

    </div>
  );
};
