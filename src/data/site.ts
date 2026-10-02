// Single source of truth for business facts. Only verified facts live here.
import { SHOW_PROJECTS } from './features.mjs';
export { SHOW_PROJECTS, SHOW_TESTIMONIAL, SHOW_OWNER_BIO, SHOW_JOB_SITE_PHOTO } from './features.mjs';

export const SITE = {
  name: 'Sound Electric',
  // Registered legal entity. Use only where a legal name belongs: footer copyright and JSON-LD legalName.
  legalName: 'Sound Electric NW LLC',
  url: 'https://soundelectric.com',
  phone: '(425) 971-7987',
  phoneHref: 'tel:+14259717987',
  email: 'jeremiah@soundelectric.com',
  license: 'SOUNDEN771M6',
  licenseVerifyUrl: 'https://secure.lni.wa.gov/verify/',
  owner: 'Jeremiah',
  tagline: 'Commercial electrical contractor serving the Greater Seattle Area',
};

// TODO(Jeremiah): confirm this list matches where you actually want to work.
// Roughly north to south. Keep in sync with the points in src/components/ServiceAreaMap.astro.
export const SERVICE_AREAS = [
  'Seattle', 'Bellingham', 'Marysville', 'Shoreline', 'Bothell', 'Woodinville', 'Duvall',
  'Kirkland', 'Redmond', 'Bellevue', 'Sammamish', 'Mercer Island', 'Issaquah',
  'Renton', 'Tukwila', 'Federal Way', 'Tacoma', 'Poulsbo', 'Port Orchard',
];

const NAV_ITEMS = [
  { href: '/services/', label: 'Services' },
  { href: '/projects/', label: 'Projects' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
];

// Drop Projects while SHOW_PROJECTS is false so header and footer never link to it.
export const NAV = NAV_ITEMS.filter((item) => SHOW_PROJECTS || item.href !== '/projects/');

export type Service = {
  id: string; title: string; icon: string; short: string; body: string; includes: string[]; goodFor: string;
};

export const SERVICES: Service[] = [
  {
    id: 'tenant-improvements',
    title: 'Tenant Improvements',
    icon: 'Building2',
    short: 'Power and lighting for commercial TI projects, from make-safe and demo through final inspection.',
    body: 'When a space changes hands or changes use, the electrical has to keep up. We take tenant improvement work from make-safe and demolition of existing circuits through rough-in, trim-out and final inspection, and we coordinate with the general contractor, the design team and the other trades along the way.',
    includes: ['Make-safe and removal of existing circuits', 'New branch circuits, receptacles and dedicated circuits', 'Lighting layout, switching and controls', 'Coordination with GCs, architects and other trades', 'Permits and inspections'],
    goodFor: 'Landlords, tenants, general contractors and property managers',
  },
  {
    id: 'build-outs',
    title: 'Office & Retail Build-Outs',
    icon: 'Store',
    short: 'Electrical for new and remodeled offices, storefronts and showrooms, built to your layout and schedule.',
    body: 'A build-out has to look finished and run reliably. We wire offices, storefronts and showrooms to match your floor plan: power to every workstation and display, lighting that suits the space, and code-required exit and emergency lighting.',
    includes: ['Power distribution and sub-panels', 'Workstation, furniture and equipment feeds', 'Display, track and accent lighting', 'Signage circuits', 'Exit and emergency lighting'],
    goodFor: 'Offices, dental and veterinary clinics, retail storefronts and professional suites',
  },
  {
    id: 'lighting-retrofits',
    title: 'Lighting Retrofits & LED Upgrades',
    icon: 'Lightbulb',
    short: 'Swap aging fluorescent and HID fixtures for efficient LED lighting and modern controls.',
    body: 'Older fluorescent and HID fixtures use more energy and need more maintenance. We plan and install LED retrofits and new fixtures inside and out, add controls like occupancy sensors and dimming where they make sense, and can help gather fixture counts and specs for utility incentive applications where programs are available.',
    includes: ['Interior LED fixture and retrofit-kit installation', 'Exterior, parking-lot and wall-pack lighting', 'Occupancy, daylight and dimming controls', 'Fixture surveys and counts', 'Documentation for incentive applications, where available'],
    goodFor: 'Offices, warehouses, retail and parking areas',
  },
  {
    id: 'service-panel-upgrades',
    title: 'Service & Panel Upgrades',
    icon: 'Gauge',
    short: 'More capacity for growing loads: commercial panelboards, sub-panels and service upgrades.',
    body: 'New equipment, EV chargers and tenant changes can push an existing service past its limits. We run load calculations, replace or add commercial bolt-on panelboards and sub-panels, and handle service upgrades, coordinating with the serving utility and the inspector so the cutover goes smoothly.',
    includes: ['Load calculations and capacity planning', 'Commercial panelboard replacement and additions', 'Sub-panels and feeders', 'Service upgrades with utility coordination', 'Updated, typed circuit directories'],
    goodFor: 'Buildings adding equipment, tenants or EV charging',
  },
  {
    id: 'ev-charging',
    title: 'EV Charging for Businesses & Fleets',
    icon: 'PlugZap',
    short: 'Workplace, customer and fleet charging, sized for today with room to grow.',
    body: 'Whether you are adding a few chargers for staff or getting a fleet lot ready, we plan EV charging around your actual electrical capacity. That means load calculations, load management where it helps, and make-ready infrastructure so the next round of chargers costs less.',
    includes: ['Site assessment and load calculations', 'Level 2 charger installation', 'Load management options', 'Make-ready conduit and capacity for future expansion', 'Permits and inspections'],
    goodFor: 'Workplaces, customer parking, multi-tenant buildings and fleets',
  },
  {
    id: 'maintenance-troubleshooting',
    title: 'Maintenance & Troubleshooting',
    icon: 'Wrench',
    short: 'Tracking down nuisance trips, failed circuits and outages, plus fixes that keep you running.',
    body: 'When something stops working, you need a straight diagnosis and a clean fix. We troubleshoot tripping breakers, dead circuits, flickering lighting and other faults, correct items flagged by inspectors or insurers, and handle the routine repairs that keep a commercial space running.',
    includes: ['Fault finding and circuit tracing', 'Breaker, device and fixture replacement', 'Correction of inspection or insurance findings', 'Panel directory audits and updates', 'Ongoing service for property managers'],
    goodFor: 'Property managers, facility teams, restaurants and business owners',
  },
];

export type Industry = {
  id: string; title: string; icon: string; label: string; text: string; points: string[]; specialty?: boolean; schemaName: string;
};

// Industries we serve. Dental and veterinary clinics are the specialties (flagged with a "Specialty" badge).
// Keep copy generic: no client names, stats, years or certifications.
export const INDUSTRIES: Industry[] = [
  {
    id: 'dental-clinics',
    title: 'Dental Clinics',
    icon: 'Tooth',
    label: 'Dental office electrician',
    specialty: true,
    text: 'Dental offices run on specialized equipment, and every operatory depends on it. We plan the electrical around your equipment list, with dedicated circuits where the equipment calls for them.',
    points: ['Dental chair and delivery unit circuits', 'Air compressor and vacuum system power', 'Imaging and X-ray equipment circuits', 'Sterilization area power', 'Dedicated equipment circuits'],
    schemaName: 'Dental office electrical work',
  },
  {
    id: 'veterinary-clinics',
    title: 'Veterinary Clinics',
    icon: 'PawPrint',
    label: 'Veterinary clinic electrician',
    specialty: true,
    text: 'Veterinary clinics combine medical-style exam and surgery space with kennels and boarding. We wire each area for how it is used, with dedicated circuits for the clinic equipment.',
    points: ['Exam room and surgery suite power and lighting', 'Imaging equipment circuits', 'Kennel and boarding area electrical', 'Dedicated equipment circuits'],
    schemaName: 'Veterinary clinic electrical work',
  },
  {
    id: 'offices',
    title: 'Offices',
    icon: 'Building',
    label: 'Office electrician',
    text: 'Build-outs and tenant improvements, lighting, and power and data rough-in for workstations and shared spaces.',
    points: ['Build-outs and tenant improvements', 'Lighting and controls', 'Workstation power and data rough-in'],
    schemaName: 'Office electrical work',
  },
  {
    id: 'restaurants',
    title: 'Restaurants',
    icon: 'UtensilsCrossed',
    label: 'Restaurant electrician',
    text: 'Electrical for commercial kitchens and dining rooms, from equipment circuits back of house to the lighting out front.',
    points: ['Kitchen equipment circuits', 'Hood and exhaust fan power', 'Walk-in cooler and freezer circuits', 'Dining room lighting'],
    schemaName: 'Restaurant electrical work',
  },
  {
    id: 'service-work',
    title: 'Service Work',
    icon: 'Wrench',
    label: 'Commercial service electrician',
    text: 'Troubleshooting, repairs and maintenance for existing commercial spaces, plus panel and service upgrades when you need more capacity.',
    points: ['Troubleshooting and repairs', 'Maintenance', 'Panel and service upgrades'],
    schemaName: 'Commercial electrical service and repair',
  },
];

export const FAQS = [
  {
    q: 'Do you do residential work?',
    a: 'No. Sound Electric focuses on commercial electrical work: tenant improvements, build-outs, lighting, service upgrades, EV charging and maintenance for businesses and commercial properties.',
  },
  {
    q: 'Do you work in dental offices and veterinary clinics?',
    a: 'Yes. Dental and veterinary clinics are a specialty. We plan the electrical around the equipment you use, including dedicated circuits for chairs, compressors and vacuum systems, imaging, and sterilization, and we can schedule work around patient hours to keep disruption to your practice as small as we can.',
  },
  {
    q: 'Are you licensed, bonded and insured?',
    a: `Yes. Sound Electric is a licensed, bonded and insured Washington electrical contractor, license ${SITE.license}. You can verify the license yourself on the Washington State Department of Labor & Industries (L&I) website.`,
  },
  {
    q: 'What areas do you serve?',
    a: 'We serve the Greater Seattle Area, from Bellingham and Marysville in the north to Tacoma and Federal Way in the south, east to Duvall and Issaquah, and west across the Sound to Poulsbo and Port Orchard. If you are not sure your site is in our area, just ask.',
  },
  {
    q: 'Do you work with general contractors and property managers?',
    a: 'Yes. We work directly with business owners and also as the electrical sub for general contractors, property managers and facility teams.',
  },
  {
    q: 'Do you handle permits and inspections?',
    a: 'Yes. We pull the electrical permits our scope requires and coordinate inspections with the local authority having jurisdiction.',
  },
  {
    q: 'Can work be scheduled around business hours?',
    a: 'Tell us your operating hours when you request a quote, and we will talk through scheduling options that keep the disruption to your business as small as we can.',
  },
  {
    q: 'How do I get a quote?',
    a: `Call ${SITE.phone}, email ${SITE.email}, or use the quote form. Drawings, photos of the existing equipment and your target schedule all help us scope the job accurately.`,
  },
];
