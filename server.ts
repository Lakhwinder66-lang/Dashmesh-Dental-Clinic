import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy Nodemailer transporter
let mailTransporter: nodemailer.Transporter | null = null;
function getMailTransporter(): nodemailer.Transporter | null {
  if (!mailTransporter && process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      mailTransporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } catch (smtpErr) {
      console.warn('Could not initialize SMTP transport:', smtpErr);
    }
  }
  return mailTransporter;
}

// In-memory appointments and reviews storage
let appointments = [
  {
    id: 'DDC-2026-1082',
    opdNo: 'OPD-8942',
    patientName: 'Gurpreet Singh',
    phone: '98765-43210',
    age: 34,
    gender: 'Male',
    service: 'Root Canal Treatment (RCT)',
    doctor: 'Dr. Gurpreet Singh (BDS, MDS Oral & Maxillofacial)',
    date: '2026-08-20',
    time: '10:30 AM',
    tokenNo: 4,
    status: 'Confirmed',
    notes: 'Severe sensitivity in lower right molar with nocturnal pain.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'DDC-2026-1081',
    opdNo: 'OPD-8941',
    patientName: 'Kiran Bala',
    phone: '94179-11223',
    age: 28,
    gender: 'Female',
    service: 'Teeth Whitening & Polishing',
    doctor: 'Dr. Simran Kaur (BDS, Cosmetic Dental Surgeon)',
    date: '2026-08-20',
    time: '11:15 AM',
    tokenNo: 5,
    status: 'Confirmed',
    notes: 'Pre-wedding scaling and aesthetic teeth brightening.',
    createdAt: new Date().toISOString(),
  }
];

let reviews = [
  {
    id: 'rev-1',
    author: 'Sunaina Sharma',
    rating: 5,
    date: '3 weeks ago',
    comment: 'You treated me very well and I am completely satisfied with the treatment. Painless root canal and very polite staff!',
    verified: true,
    treatment: 'Root Canal Treatment'
  },
  {
    id: 'rev-2',
    author: 'Harpreet Sandhu',
    rating: 5,
    date: '1 month ago',
    comment: 'Best dental clinic in Abohar! The sterilization protocols and digital X-ray setup are top notch. Located right on Jain Nagari Road near water works.',
    verified: true,
    treatment: 'Dental Implants'
  },
  {
    id: 'rev-3',
    author: 'Anchal Goyal',
    rating: 2,
    date: '2 months ago',
    comment: 'Long waiting time during rush hours on Monday. Treatment was fine but appointment queue management could be improved.',
    verified: true,
    treatment: 'Scaling & Cleaning'
  },
  {
    id: 'rev-4',
    author: 'Rajesh Kumar',
    rating: 4,
    date: '2 months ago',
    comment: 'Dr. Sahab gave very honest advice. Did not recommend unnecessary extraction, saved my natural tooth with crown capping.',
    verified: true,
    treatment: 'Zirconia Crown'
  }
];

// Lazy Gemini client helper
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

// Dental AI Assistant Endpoint
app.post('/api/ai-dental-triage', async (req, res) => {
  try {
    const { message, symptoms, history = [] } = req.body;
    
    if (!message && !symptoms) {
      return res.status(400).json({ error: 'Message or symptoms required' });
    }

    const client = getGeminiClient();
    const promptText = `You are the friendly, reassuring, expert AI Dental Assistant for "Dashmesh Dental Clinic", located on Jain Nagari Road, Abohar, Punjab (Phone: 084300 33333, 94179-28951, 9779505055).
The clinic provides high-standard dentistry: Root Canal Treatment (RCT), Dental Implants, Braces & Aligners, Crown & Bridge, Teeth Whitening, Wisdom Tooth Extraction, Gum Treatment, and Child Dentistry.

User query or symptoms: "${message || symptoms}".
Previous conversation context: ${JSON.stringify(history.slice(-4))}

Instructions:
1. Provide empathetic, clear, medically responsible dental guidance in simple, sober terms.
2. Outline possible causes (e.g. pulpitis, dentin hypersensitivity, plaque build-up, gingivitis).
3. Offer safe immediate home comfort tips (e.g., warm salt water rinse, cold compress, avoiding extreme temperatures, over-the-counter pain relief caution).
4. Clearly state when to visit Dashmesh Dental Clinic in Abohar immediately (e.g., facial swelling, severe throbbing pain, bleeding, broken tooth).
5. Always remind them that an in-person clinical exam with digital dental X-rays at Dashmesh Dental Clinic is essential for a definitive diagnosis.
6. Keep the tone calm, professional, warm, concise and easy to read.`;

    if (client) {
      try {
        const response = await client.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: promptText,
        });
        const reply = response.text || 'Dashmesh Dental Clinic is ready to help you with expert diagnosis and treatment. Please call 084300 33333 or visit us on Jain Nagari Road, Abohar.';
        return res.json({ reply, source: 'gemini' });
      } catch (geminiErr: any) {
        console.warn('Gemini API call failed, falling back to smart local triage:', geminiErr?.message);
      }
    }

    // Smart triage fallback when API key is pending
    const query = (message || symptoms || '').toLowerCase();
    let reply = `Thank you for consulting Dashmesh Dental Clinic (Abohar). `;
    
    if (query.includes('pain') || query.includes('toothache') || query.includes('dard')) {
      reply += `For toothache:\n\n• **Immediate Relief:** Rinse gently with lukewarm salt water (1/2 tsp salt in warm water). You may apply a cold compress on the outside of your cheek if there is soreness.\n• **Avoid:** Very hot, icy cold, or sweet food and drinks. Do NOT place an aspirin tablet directly against your gums.\n• **Clinical Care:** Severe or throbbing pain often indicates deep decay or pulp nerve inflammation requiring a Root Canal (RCT) or protective filling.\n• **Visit Us:** Please book an appointment or walk in at our clinic on Jain Nagari Road, Abohar. Phone: 084300 33333 / 94179-28951.`;
    } else if (query.includes('bleed') || query.includes('gum') || query.includes('masooda')) {
      reply += `For bleeding or swollen gums:\n\n• **Care Advice:** Use an ultra-soft bristle toothbrush with gentle circular motions. Rinse with warm saline water.\n• **Underlying Cause:** Plaque or tartar accumulation beneath the gumline causes gingivitis, which is easily reversible with ultrasonic scaling & polishing.\n• **Recommendation:** Visit Dashmesh Dental Clinic for a thorough dental cleaning and gum health evaluation.`;
    } else if (query.includes('rct') || query.includes('root canal')) {
      reply += `About Root Canal Treatment at Dashmesh Dental Clinic:\n\n• **Modern Painless RCT:** We use rotary endodontics and local anesthesia for comfortable single/multi-sitting root canals.\n• **Indications:** Severe nocturnal pain, pain while chewing, deep cavity reaching tooth nerve.\n• **Protection:** A crown (Zirconia / PFM) is recommended after RCT to restore full bite strength.`;
    } else if (query.includes('braces') || query.includes('aligner') || query.includes('straight')) {
      reply += `For teeth alignment & smile makeover:\n\n• We offer both traditional ceramic/metal braces and modern invisible clear aligners.\n• Treatment plans are customized after digital impressions and intraoral assessment.\n• Book a consultation at our Abohar clinic to discuss timeline and EMI options.`;
    } else {
      reply += `Our dental team at Dashmesh Dental Clinic (Jain Nagari Road, Abohar) provides full comprehensive care including RCT, Implants, Whitening, Extractions, and Cosmetic Dentistry.\n\nFor personalized advice or to schedule a checkup, call 084300 33333 or 94179-28951, or use the quick booking tab above!`;
    }

    return res.json({ reply, source: 'fallback' });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to process dental triage', details: err?.message });
  }
});

// Appointments API
app.get('/api/appointments', (req, res) => {
  res.json({ success: true, appointments });
});

// Send Appointment Email & WhatsApp Notification to Clinics
app.post('/api/send-appointment-email', async (req, res) => {
  const {
    name = 'Valued Patient',
    mobile_number = '',
    email = '',
    date = '',
    time = '',
    reason = 'Dental Consultation',
    yes_no = 'No',
  } = req.body;

  const recipients = ['clinic4@gmail.com', 'rinkuvirk54@gmail.com'];
  const subject = `New Appointment Request – ${name}`;
  const plainTextBody = `📋 New Appointment Request

Name: ${name}
Mobile Number: ${mobile_number}
Email: ${email || 'Not provided'}
Preferred Date: ${date}
Preferred Time: ${time}
Reason for Visit: ${reason}
Existing Patient: ${yes_no}

— Booked via website chatbot`;

  console.log('====================================================');
  console.log(`[DUAL CLINIC EMAIL NOTIFICATION DISPATCH]`);
  console.log(`To: ${recipients.join(', ')}`);
  console.log(`Subject: ${subject}`);
  console.log(`Body:\n${plainTextBody}`);
  console.log('====================================================');

  let liveSmtpSent = false;
  const transporter = getMailTransporter();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || `"Dashmesh Dental Clinic" <${process.env.SMTP_USER}>`,
        to: recipients,
        subject,
        text: plainTextBody,
      });
      liveSmtpSent = true;
      console.log(`[SMTP SUCCESS] Live email sent to ${recipients.join(', ')}`);
    } catch (sendErr: any) {
      console.warn('[SMTP WARNING] Could not send via SMTP transport:', sendErr?.message);
    }
  }

  const waNumber = '919779505055';
  const waAlertUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(plainTextBody)}`;
  const mailtoBothUrl = `mailto:${recipients.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(plainTextBody)}`;
  const mailtoClinic4Url = `mailto:clinic4@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(plainTextBody)}`;
  const mailtoRinkuUrl = `mailto:rinkuvirk54@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(plainTextBody)}`;

  res.json({
    success: true,
    message: `Appointment notifications dispatched to ${recipients.join(' and ')}`,
    recipients,
    subject,
    body: plainTextBody,
    liveSmtpSent,
    waNumber: '+91 9779505055',
    waRawNumber: '09779505055',
    waAlertUrl,
    mailtoBothUrl,
    mailtoClinic4Url,
    mailtoRinkuUrl,
    dispatchedAt: new Date().toISOString(),
  });
});

app.post('/api/appointments', (req, res) => {
  const { patientName, phone, email, age, gender, service, doctor, date, time, notes, existingPatient } = req.body;
  if (!patientName || !phone || !service || !date || !time) {
    return res.status(400).json({ error: 'Missing required appointment fields' });
  }

  const opdNumber = `OPD-${Math.floor(1000 + Math.random() * 9000)}`;
  const bookingId = `DDC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const tokenNo = appointments.filter(a => a.date === date).length + 1;

  const newAppt = {
    id: bookingId,
    opdNo: opdNumber,
    patientName,
    phone,
    email: email || '',
    age: age ? Number(age) : 30,
    gender: gender || 'Not Specified',
    service,
    doctor: doctor || 'Dr. Gurpreet Singh (BDS, MDS)',
    date,
    time,
    tokenNo,
    status: 'Confirmed',
    existingPatient: existingPatient ? 'Yes' : 'No',
    notes: notes || 'General dental checkup & consultation',
    createdAt: new Date().toISOString(),
  };

  appointments.unshift(newAppt);
  res.status(201).json({ success: true, appointment: newAppt });
});

// Reviews API
app.get('/api/reviews', (req, res) => {
  res.json({ success: true, reviews });
});

app.post('/api/reviews', (req, res) => {
  const { author, rating, comment, treatment } = req.body;
  if (!author || !rating || !comment) {
    return res.status(400).json({ error: 'Author, rating, and comment are required' });
  }

  const newReview = {
    id: `rev-${Date.now()}`,
    author: author.trim(),
    rating: Number(rating),
    date: 'Just now',
    comment: comment.trim(),
    verified: true,
    treatment: treatment || 'General Consultation'
  };

  reviews.unshift(newReview);
  res.status(201).json({ success: true, review: newReview });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    clinic: 'Dashmesh Dental Clinic',
    city: 'Abohar, Punjab',
    phone: ['084300 33333', '94179-28951', '9779505055']
  });
});

// Vite middleware configuration
async function setupVite() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Dashmesh Dental Clinic server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite().catch((err) => {
  console.error('Failed to start server:', err);
});
