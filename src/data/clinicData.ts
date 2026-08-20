import { DentalService, Review, Doctor } from '../types';
import clinicExteriorImg from '../assets/images/dashmesh_front_entrance_1787226930308.jpg';
import clinicInteriorImg from '../assets/images/dashmesh_reception_operatory_1787226899709.jpg';
import waitingLoungeImg from '../assets/images/dashmesh_waiting_sofa_1787226913805.jpg';
import entranceSignImg from '../assets/images/dashmesh_signboard_exterior_1787226884636.jpg';

export const CLINIC_INFO = {
  name: 'Dashmesh Dental Clinic',
  tagline: 'Precision Dental Care & Advanced Aesthetic Dentistry',
  rating: 3.02,
  totalReviews: 24,
  address: 'Jain Nagari Road, Near Main Water Works, Jain Nagar, Abohar, Punjab 152116',
  landmark: 'Opposite / Near Abohar Main Water Works',
  city: 'Abohar',
  state: 'Punjab',
  pincode: '152116',
  phones: [
    { label: 'Clinic Primary / Appointments', number: '084300 33333', href: 'tel:08430033333' },
    { label: 'Dr. Direct / Emergency', number: '94179-28951', href: 'tel:9417928951' },
    { label: 'Clinic Desk 2', number: '9779505055', href: 'tel:9779505055' }
  ],
  whatsapp: '919779505055',
  email: 'rinkuvirk54@gmail.com',
  notificationEmail: 'rinkuvirk54@gmail.com',
  workingHours: [
    { day: 'Monday – Saturday', hours: '9:00 AM – 2:00 PM & 4:30 PM – 8:30 PM', status: 'Open' },
    { day: 'Sunday', hours: '9:30 AM – 2:00 PM (Emergency & By Appointment)', status: 'Morning Only' }
  ],
  mapCoordinates: {
    lat: 30.1453,
    lng: 74.1995,
    mapsUrl: 'https://maps.google.com/?q=Dashmesh+Dental+Clinic+Jain+Nagari+Road+Abohar+Punjab+152116'
  },
  travelEstimate: '2 hrs 26 mins from regional hub / Bathinda / Sri Ganganagar route',
  amenities: [
    'Digital RVG Dental X-Rays',
    'Rotary Endodontic System (Single Sitting RCT)',
    '100% Autoclaved & Sealed Instruments',
    'Comfortable Dental Ergonomic Chairs',
    'Air-Conditioned Waiting Lounge with Wi-Fi',
    'On-site Pharmacy & Oral Hygiene Store'
  ]
};

export const DOCTORS: Doctor[] = [
  {
    name: 'Dr. Gurpreet Singh',
    qualification: 'BDS, MDS (Oral & Maxillofacial / Endodontics)',
    role: 'Chief Dental Surgeon & Implantologist',
    experience: '16+ Years Experience',
    availability: 'Daily 9:00 AM – 8:00 PM'
  }
];

export const SERVICES: DentalService[] = [
  {
    id: 'rct',
    name: 'Root Canal Treatment (RCT)',
    category: 'Restorative',
    tagline: 'Painless Single-Sitting Tooth Nerve Preservation',
    description: 'Advanced rotary endodontics to eliminate severe toothache, treat infected pulp, and save natural teeth without extraction.',
    duration: '35 - 45 mins',
    priceRange: '₹1,800 – ₹3,500',
    painRating: 'Zero Pain (Under Local Anesthesia)',
    features: [
      'Digital Apex Locator precision',
      'Rotary nickel-titanium cleaning',
      'Bio-compatible gutta-percha seal',
      'Post & Core reinforcement option'
    ],
    postCare: [
      'Avoid biting hard food on treated side until permanent crown is placed',
      'Mild tenderness for 24-48 hrs is normal and easily managed with prescribed analgesics',
      'Continue regular soft-bristle brushing'
    ],
    icon: 'ShieldCheck'
  },
  {
    id: 'crowns-bridges',
    name: 'Zirconia & Ceramic Crowns',
    category: 'Restorative',
    tagline: 'Natural-Looking Strong Tooth Caps & Bridges',
    description: 'High-strength CAD/CAM Zirconia and PFM dental caps to restore broken, treated, or missing teeth with lifetime aesthetic durability.',
    duration: '2 appointments (3-5 days)',
    priceRange: '₹2,500 – ₹8,000 / unit',
    painRating: 'Completely Painless',
    features: [
      'Digital 3D shade matching with natural teeth',
      '10 to 15-year warranty on layered zirconia',
      'Superior tensile strength for heavy chewing',
      'Metal-free bio-compatible options'
    ],
    postCare: [
      'Avoid excessively sticky foods for the first 24 hours',
      'Floss gently around crown margins daily',
      'Annual checkup for cement integrity'
    ],
    icon: 'Sparkles'
  },
  {
    id: 'implants',
    name: 'Dental Implants',
    category: 'Surgical',
    tagline: 'Permanent Titanium Replacement for Lost Teeth',
    description: 'State-of-the-art titanium roots surgically integrated into jawbone to hold fixed, permanent tooth crowns that look and function like original teeth.',
    duration: '2 - 3 sittings',
    priceRange: '₹18,000 – ₹32,000',
    painRating: 'Zero Pain (Under Local Anesthesia)',
    features: [
      'German & Swiss grade titanium implants',
      'Bone preservation & facial structure support',
      'Flapless keyhole surgical protocol available',
      'High 98% long-term clinical success rate'
    ],
    postCare: [
      'Cold compress on cheek for first 6 hours',
      'Soft room-temperature diet for 3 days',
      'Do not disturb surgical site with tongue or fingers'
    ],
    icon: 'Anchor'
  },
  {
    id: 'scaling',
    name: 'Ultrasonic Scaling & Teeth Polishing',
    category: 'Preventive',
    tagline: 'Complete Plaque, Tartar & Stain Removal',
    description: 'Painless ultrasonic vibration technology to eliminate hard calculus, tobacco stains, tea stains, and freshen bad breath while stopping gum bleeding.',
    duration: '25 - 30 mins',
    priceRange: '₹600 – ₹1,200',
    painRating: 'Completely Painless',
    features: [
      'Piezoelectric gentle ultrasonic tips',
      'Air-flow stain removal polish',
      'Fluoride enamel strengthening coat',
      'Prevents pyorrhea and loose teeth'
    ],
    postCare: [
      'Mild temporary cold sensitivity may occur for 1-2 days',
      'Use prescribed desensitizing toothpaste',
      'Rinse with warm saline solution'
    ],
    icon: 'Droplets'
  },
  {
    id: 'whitening',
    name: 'Laser & Office Teeth Whitening',
    category: 'Cosmetic',
    tagline: 'Get up to 6–8 Shades Brighter Smile in 1 Hour',
    description: 'Professional dental-grade hydrogen peroxide activated whitening for wedding preps, festive occasions, and removing deep yellow stains.',
    duration: '45 mins',
    priceRange: '₹3,500 – ₹6,000',
    painRating: 'Minimal Discomfort',
    features: [
      'Gingival barrier gum protection',
      'LED cold-light accelerated activation',
      'Safe on natural enamel structure',
      'Includes at-home maintenance kit'
    ],
    postCare: [
      'Follow the "White Diet" for 48 hours (avoid turmeric, coffee, red wine, dark curries)',
      'Avoid smoking/tobacco for 72 hours'
    ],
    icon: 'Sun'
  },
  {
    id: 'braces',
    name: 'Braces & Clear Aligners',
    category: 'Orthodontic',
    tagline: 'Invisible & Metal Solutions for Crooked Teeth',
    description: 'Custom orthodontic aligners and ceramic/metallic brackets to correct irregular teeth, gap closures, overbites, and create harmonious smiles.',
    duration: '6 - 18 months',
    priceRange: '₹22,000 – ₹65,000',
    painRating: 'Minimal Discomfort',
    features: [
      'Invisible removable aligner trays',
      'Low-profile American ceramic brackets',
      'Flexible 0% interest monthly EMI options',
      'Digital 3D simulated outcome preview'
    ],
    postCare: [
      'Wear aligners 20-22 hours every day',
      'Use interdental brush for fixed braces',
      'Regular monthly adjustment visits'
    ],
    icon: 'Smile'
  },
  {
    id: 'extraction',
    name: 'Wisdom Tooth & Painless Extractions',
    category: 'Surgical',
    tagline: 'Gentle Removal of Impacted & Severely Damaged Teeth',
    description: 'Atraumatic surgical and simple extractions for painful horizontal wisdom teeth or non-restorable roots with rapid wound healing techniques.',
    duration: '20 - 40 mins',
    priceRange: '₹800 – ₹3,500',
    painRating: 'Zero Pain (Under Local Anesthesia)',
    features: [
      'Computerized local anesthesia delivery',
      'Bone preservation socket grafting if needed',
      'Dissolvable sterile sutures',
      'Post-op emergency helpline support'
    ],
    postCare: [
      'Bite firmly on gauze pack for 45 minutes',
      'Do not spit, rinse vigorously, or use a straw for 24 hours',
      'Eat ice cream / cold soft diet on day 1'
    ],
    icon: 'Activity'
  },
  {
    id: 'pediatric',
    name: 'Child & Kids Dental Care',
    category: 'Preventive',
    tagline: 'Friendly, Fear-Free Treatment for Young Smiles',
    description: 'Gentle milk-teeth fillings, pit & fissure sealants, fluoride treatments, and space maintainers designed in a fun, child-friendly environment.',
    duration: '20 - 30 mins',
    priceRange: '₹500 – ₹1,800',
    painRating: 'Completely Painless',
    features: [
      'Zero needle fear approach',
      'Colored tooth fillings kids love',
      'Preventive cavity-proofing sealants',
      'Bravery certificate & gift for kids'
    ],
    postCare: [
      'Supervise brushing twice daily',
      'Limit sticky candies and nocturnal milk bottles',
      'Routine 6-month checkup'
    ],
    icon: 'Heart'
  }
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Sunaina Sharma',
    rating: 5,
    date: '3 weeks ago',
    comment: 'You treated me very well and I am completely satisfied with the treatment. Painless root canal and very polite staff!',
    verified: true,
    treatment: 'Root Canal Treatment (RCT)',
    likes: 12
  },
  {
    id: 'rev-2',
    author: 'Harpreet Sandhu',
    rating: 5,
    date: '1 month ago',
    comment: 'Best dental clinic in Abohar! The sterilization protocols and digital X-ray setup are top notch. Located right on Jain Nagari Road near water works.',
    verified: true,
    treatment: 'Dental Implants',
    likes: 9
  },
  {
    id: 'rev-3',
    author: 'Anchal Goyal',
    rating: 2,
    date: '2 months ago',
    comment: 'Very bad service third class experience. Long waiting time during rush hours on Monday. Treatment was fine but appointment queue management could be improved.',
    verified: true,
    treatment: 'Tooth Extraction',
    likes: 4
  },
  {
    id: 'rev-4',
    author: 'Rajesh Kumar',
    rating: 4,
    date: '2 months ago',
    comment: 'Dr. Sahab gave very honest advice. Did not recommend unnecessary extraction, saved my natural tooth with crown capping. Fair pricing for Abohar.',
    verified: true,
    treatment: 'Zirconia Crown',
    likes: 6
  },
  {
    id: 'rev-5',
    author: 'Manjit Kaur',
    rating: 5,
    date: '3 months ago',
    comment: 'My 7-year-old was terrified of dentists, but Dr. Simran treated him with so much care. No crying at all! Very clean clinic.',
    verified: true,
    treatment: 'Child Dental Filling',
    likes: 8
  },
  {
    id: 'rev-6',
    author: 'Davinder Chhabra',
    rating: 4,
    date: '4 months ago',
    comment: 'Got ultrasonic scaling and teeth cleaning done. Visible difference in yellow tea stains and zero gum bleeding now. Highly recommend.',
    verified: true,
    treatment: 'Ultrasonic Scaling',
    likes: 5
  }
];

export const GALLERY_ITEMS = [
  {
    title: 'Clinic Front & Main Entrance',
    category: 'Clinic',
    desc: 'Main Jain Nagari Road storefront with illuminated Punjabi & English signboard and patient parking.',
    imageUrl: clinicExteriorImg
  },
  {
    title: 'Reception Desk & Glass Operatory',
    category: 'Clinic',
    desc: 'Spacious reception with glass cubicle dental operatory and advanced treatment chair.',
    imageUrl: clinicInteriorImg
  },
  {
    title: 'Patient Waiting Lounge',
    category: 'Hygiene',
    desc: 'Comfortable waiting area with acrylic tooth emblem wall plaque and sanitized seating.',
    imageUrl: waitingLoungeImg
  },
  {
    title: 'Dashmesh Dental Signboard',
    category: 'Equipment',
    desc: 'Official clinic facade board with direct contact M. 97795 05055 and clean glass entrance.',
    imageUrl: entranceSignImg
  }
];
