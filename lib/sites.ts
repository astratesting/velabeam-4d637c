export interface SiteData {
  heroTitle: string;
  heroSubtitle?: string;
  about?: string;
  services: string[];
  phone?: string;
  email?: string;
  address?: string;
  hours?: Record<string, string>;
  socialLinks?: Record<string, string>;
}

export interface SiteBrand {
  primaryColor: string;
  accentColor: string;
  fontPair: string;
  logoUrl?: string;
}

export function buildSiteDataFromLead(lead: {
  name: string;
  category: string;
  phone?: string | null;
  email?: string | null;
  address?: string;
  hours?: string | null;
}): SiteData {
  const hours = lead.hours ? JSON.parse(lead.hours) : undefined;
  const defaultServices = getDefaultServices(lead.category);

  return {
    heroTitle: lead.name,
    heroSubtitle: `Professional ${lead.category.toLowerCase()} services`,
    about: `${lead.name} is a trusted local ${lead.category.toLowerCase()} dedicated to serving our community with excellence.`,
    services: defaultServices,
    phone: lead.phone ?? undefined,
    email: lead.email ?? undefined,
    address: lead.address,
    hours,
  };
}

function getDefaultServices(category: string): string[] {
  const services: Record<string, string[]> = {
    Restaurant: ["Dine-In", "Takeout", "Catering", "Private Events"],
    Dentist: ["General Dentistry", "Cosmetic Dentistry", "Teeth Whitening", "Emergency Care"],
    Salon: ["Haircuts & Styling", "Color & Highlights", "Manicure & Pedicure", "Facials"],
    Plumber: ["Emergency Repairs", "Drain Cleaning", "Water Heater Installation", "Pipe Repair"],
    Roofer: ["Roof Repair", "New Installation", "Inspections", "Gutter Cleaning"],
    "Auto Shop": ["Oil Changes", "Brake Repair", "Engine Diagnostics", "Tire Service"],
    "Law Firm": ["Consultation", "Legal Advice", "Document Review", "Representation"],
    Chiropractor: ["Spinal Adjustment", "Pain Management", "Sports Injury", "Wellness Care"],
    Veterinarian: ["Wellness Exams", "Vaccinations", "Dental Care", "Surgery"],
    Landscaping: ["Lawn Care", "Garden Design", "Tree Trimming", "Irrigation"],
    HVAC: ["AC Repair", "Heating Installation", "Maintenance Plans", "Duct Cleaning"],
    Electrician: ["Wiring & Rewiring", "Panel Upgrades", "Lighting Installation", "Safety Inspections"],
  };

  return services[category] || ["Service 1", "Service 2", "Service 3", "Service 4"];
}
