/**
 * =========================================================================
 * 💬 CLINIC WHATSAPP NOTIFICATION SERVICE
 * Target WhatsApp Number: +91 8430033333
 * Format: https://wa.me/918430033333?text=...
 * =========================================================================
 */
export const WHATSAPP_CONFIG = {
  CLINIC_PHONE_NUMBER: '918430033333',
  CLINIC_DISPLAY_NUMBER: '+91 8430033333',
};

export interface AppointmentBookingPayload {
  patientName: string;
  phone: string;
  date: string;
  time: string;
  doctorName?: string;
  dentalIssue: string;
  email?: string;
  existingPatient?: string;
  tokenNo?: string;
}

/**
 * Formats the exact message string requested:
 * “New Appointment Request 🦷
 * Patient Name: [name]
 * Phone: [phone]
 * Date: [date]
 * Time: [time]
 * Doctor: [doctor]
 * Issue: [issue]”
 */
export function formatAppointmentWhatsAppMessage(booking: AppointmentBookingPayload): string {
  const doctor = booking.doctorName || 'Dr. Gurpreet Singh (BDS, MDS)';
  const phone = booking.phone.startsWith('+91') ? booking.phone : `+91 ${booking.phone.replace(/\D/g, '')}`;
  
  return `New Appointment Request 🦷\nPatient Name: ${booking.patientName}\nPhone: ${phone}\nDate: ${booking.date}\nTime: ${booking.time}\nDoctor: ${doctor}\nIssue: ${booking.dentalIssue}`;
}

/**
 * Generates the encoded WhatsApp API URL:
 * https://wa.me/918430033333?text=...
 */
export function getClinicWhatsAppUrl(booking: AppointmentBookingPayload): string {
  const message = formatAppointmentWhatsAppMessage(booking);
  return `https://wa.me/${WHATSAPP_CONFIG.CLINIC_PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Automatically opens WhatsApp with the pre-filled booking details.
 */
export function openClinicWhatsAppAlert(booking: AppointmentBookingPayload): string {
  const waUrl = getClinicWhatsAppUrl(booking);

  try {
    const newTab = window.open(waUrl, '_blank', 'noopener,noreferrer');
    if (!newTab || newTab.closed || typeof newTab.closed === 'undefined') {
      // If popup blocked or on mobile redirect directly
      window.location.href = waUrl;
    }
  } catch (e) {
    window.location.href = waUrl;
  }

  return waUrl;
}

