import { prisma } from "./prisma";

const CATEGORIES = [
  "Restaurant",
  "Dentist",
  "Salon",
  "Plumber",
  "Roofer",
  "Auto Shop",
  "Law Firm",
  "Chiropractor",
  "Veterinarian",
  "Landscaping",
  "HVAC",
  "Electrician",
];

const BUSINESS_NAMES: Record<string, string[]> = {
  Restaurant: ["Bella's Kitchen", "The Harbor Grill", "Sunrise Cafe", "Coastal Bites"],
  Dentist: ["Bright Smile Dental", "Harbor Dental Care", "Coastal Dentistry", "Seaside Smiles"],
  Salon: ["Glow Hair Studio", "The Lighthouse Salon", "Coastal Cuts", "Harbor Beauty Bar"],
  Plumber: ["FlowRight Plumbing", "AquaPipe Solutions", "Harbor Plumbing Co", "TidePool Plumbing"],
  Roofer: ["SkyShield Roofing", "Peak Roofing LLC", "Harbor Roof Masters", "Coastal Roofing"],
  "Auto Shop": ["Coastal Auto Care", "Harbor Motor Works", "Seaside Auto Repair", "TideLine Auto"],
};

const CITIES = [
  "Santa Monica, CA",
  "Venice, CA",
  "Manhattan Beach, CA",
  "Redondo Beach, CA",
  "Hermosa Beach, CA",
  "Long Beach, CA",
  "Marina del Rey, CA",
  "El Segundo, CA",
];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generatePhone(): string {
  const area = 310 + Math.floor(Math.random() * 10);
  const mid = Math.floor(Math.random() * 900) + 100;
  const end = Math.floor(Math.random() * 9000) + 1000;
  return `(${area}) ${mid}-${end}`;
}

function generateEmail(name: string): string {
  const slug = name.toLowerCase().replace(/[^a-z]+/g, "").slice(0, 12);
  return `info@${slug}.com`;
}

function generateHours(): string {
  return JSON.stringify({
    Monday: "9:00 AM – 6:00 PM",
    Tuesday: "9:00 AM – 6:00 PM",
    Wednesday: "9:00 AM – 6:00 PM",
    Thursday: "9:00 AM – 6:00 PM",
    Friday: "9:00 AM – 5:00 PM",
    Saturday: "10:00 AM – 3:00 PM",
    Sunday: "Closed",
  });
}

export async function generateSeededLeads(agencyId: string, count: number = 8) {
  const categories = CATEGORIES.slice(0, count);
  const leads = [];

  for (let i = 0; i < count; i++) {
    const category = categories[i % categories.length];
    const namePool = BUSINESS_NAMES[category] || [`${category} Plus`, `${category} Pro`, `Harbor ${category}`, `Coastal ${category}`];
    const name = namePool[i % namePool.length];
    const city = randomFrom(CITIES);

    leads.push({
      agencyId,
      name,
      category,
      address: `${100 + Math.floor(Math.random() * 900)} Harbor Blvd`,
      city,
      lat: 33.9 + Math.random() * 0.2,
      lng: -118.4 + Math.random() * 0.2,
      phone: generatePhone(),
      email: generateEmail(name),
      hours: generateHours(),
      rating: Math.round((3.5 + Math.random() * 1.5) * 10) / 10,
      hasWebsite: false,
      source: "scan",
      status: "NEW",
    });
  }

  return prisma.localBusiness.createMany({ data: leads });
}
