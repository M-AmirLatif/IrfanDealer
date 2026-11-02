/**
 * Authorized Dealers Dataset
 * Contains Irfan Umri (active for v1) and 4 placeholder dealer profiles
 * configured with isActive: false.
 * NOTE FOR EXTENSION: Flipping `isActive: true` on any placeholder dealer
 * will automatically surface them in the dealers directory and listings
 * without requiring any UI component code changes.
 */

export const DEALERS = [
  {
    id: 'irfan-umri',
    slug: 'irfan-umri',
    name: 'Irfan Umri',
    agencyName: 'Umri Properties',
    phone: '+923016803398',
    phoneDisplay: '+92 301 6803398',
    whatsapp: '923016803398',
    email: 'irfan@umriproperties.pk',
    photo: '/dealerimg.jpg',
    bio: 'Irfan Umri is the founder of Umri Properties and a veteran real estate consultant in Kasur with over 15 years of on-the-ground experience. Renowned for transparent document verification, fair valuations, and trusted advisory across residential, commercial, and agricultural sectors.',
    experienceYears: 15,
    specialization: [
      'Residential Houses',
      'Plots & Files',
      'Agricultural Land',
      'Commercial Shops',
    ],
    areasServed: [
      'Lahore Road',
      'Model Town',
      'Railway Road',
      'Kasur City Center',
      'Bypass Road',
      'Chunian',
    ],
    address: 'Shop # 12, Umri Commercial Plaza, Lahore Road, Kasur, Punjab',
    workingHours: 'Mon – Sat: 9:00 AM – 8:00 PM',
    isActive: true,
  },
  {
    id: 'malik-tariq',
    slug: 'malik-tariq',
    name: 'Malik Tariq Mehmood',
    agencyName: 'Tariq Real Estate',
    phone: '+923019876543',
    phoneDisplay: '+92 301 9876543',
    whatsapp: '923019876543',
    email: 'tariq@umriproperties.pk',
    photo:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    bio: 'Specialist in agricultural land, farmhouses, and industrial plots around Chunian, Pattoki, and Ferozepur Road.',
    experienceYears: 11,
    specialization: ['Agricultural Land', 'Industrial Plots', 'Farmhouses'],
    areasServed: ['Chunian', 'Pattoki', 'Khudian Khas'],
    address: 'Main Multan Road Bypass, Pattoki, Kasur District',
    workingHours: 'Mon – Sat: 9:30 AM – 7:30 PM',
    isActive: false, // Inactive in v1 demo; set to true to enable multi-dealer view
  },
  {
    id: 'sheikh-adnan',
    slug: 'sheikh-adnan',
    name: 'Sheikh Adnan Rasheed',
    agencyName: 'Al-Madina Estate Advisors',
    phone: '+923214561234',
    phoneDisplay: '+92 321 4561234',
    whatsapp: '923214561234',
    email: 'adnan@umriproperties.pk',
    photo:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    bio: 'Expert in commercial plazas, high-street shops, and retail spaces in Kasur City Center, Circular Road, and Railway Road.',
    experienceYears: 9,
    specialization: ['Commercial Shops', 'Plazas & Offices', 'Rental Leases'],
    areasServed: ['Kasur City Center', 'Circular Road', 'Railway Road'],
    address: 'Near Old City Gate, Circular Road, Kasur',
    workingHours: 'Mon – Sat: 10:00 AM – 9:00 PM',
    isActive: false, // Inactive in v1 demo
  },
  {
    id: 'chaudhry-waqas',
    slug: 'chaudhry-waqas',
    name: 'Chaudhry Waqas Gujjar',
    agencyName: 'Gujjar Property Network',
    phone: '+923335557788',
    phoneDisplay: '+92 333 5557788',
    whatsapp: '923335557788',
    email: 'waqas@umriproperties.pk',
    photo:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    bio: 'Dedicated agent for newly developed housing societies, luxury family homes, and residential plots on Lahore Road and Model Town.',
    experienceYears: 7,
    specialization: ['Modern Houses', 'Gated Societies', 'Installment Plots'],
    areasServed: ['Model Town', 'Lahore Road', 'Bypass Road'],
    address: 'Model Town Commercial Block, Kasur',
    workingHours: 'Mon – Sat: 10:00 AM – 8:00 PM',
    isActive: false, // Inactive in v1 demo
  },
  {
    id: 'mian-kamran',
    slug: 'mian-kamran',
    name: 'Mian Kamran Javed',
    agencyName: 'Kasur Land Registry Partners',
    phone: '+923028889900',
    phoneDisplay: '+92 302 8889900',
    whatsapp: '923028889900',
    email: 'kamran@umriproperties.pk',
    photo:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    bio: 'Focused on property documentation verification, legal intiqal guidance, and prime residential plots across Kot Radha Kishan and Raja Jang.',
    experienceYears: 12,
    specialization: ['Legal Verification', 'Intiqal Advisory', 'Plots & Land'],
    areasServed: ['Kot Radha Kishan', 'Raja Jang', 'Ferozepur Road'],
    address: 'Katchery Road, District Courts Complex, Kasur',
    workingHours: 'Mon – Sat: 8:30 AM – 6:00 PM',
    isActive: false, // Inactive in v1 demo
  },
];
