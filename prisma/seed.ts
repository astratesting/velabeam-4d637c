import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create demo user
  const passwordHash = await bcrypt.hash("demo1234", 12);
  const user = await prisma.user.create({
    data: {
      email: "demo@velabeam.com",
      name: "Demo User",
      passwordHash,
      role: "OWNER",
      onboardingStep: 3,
    },
  });

  // Create demo agency
  const agency = await prisma.agency.create({
    data: {
      name: "Demo Agency",
      slug: "demo-agency",
      ownerId: user.id,
      accentColor: "#6B4FE0",
      plan: "TRIAL",
      profileComplete: true,
    },
  });

  // Link user to agency
  await prisma.user.update({
    where: { id: user.id },
    data: { agencyId: agency.id },
  });

  // Create demo leads
  const leads = [
    { name: "Bella's Kitchen", category: "Restaurant", address: "123 Harbor Blvd", city: "Santa Monica, CA", lat: 33.9425, lng: -118.4081, phone: "(310) 555-0101", email: "info@bellaskitchen.com", rating: 4.5, hours: JSON.stringify({ Monday: "9:00 AM – 9:00 PM", Tuesday: "9:00 AM – 9:00 PM", Wednesday: "9:00 AM – 9:00 PM", Thursday: "9:00 AM – 9:00 PM", Friday: "9:00 AM – 10:00 PM", Saturday: "10:00 AM – 10:00 PM", Sunday: "10:00 AM – 8:00 PM" }) },
    { name: "Bright Smile Dental", category: "Dentist", address: "456 Main St", city: "Venice, CA", lat: 33.9925, lng: -118.4690, phone: "(310) 555-0102", email: "hello@brightsmile.com", rating: 4.8, hours: JSON.stringify({ Monday: "8:00 AM – 5:00 PM", Tuesday: "8:00 AM – 5:00 PM", Wednesday: "8:00 AM – 5:00 PM", Thursday: "8:00 AM – 5:00 PM", Friday: "8:00 AM – 3:00 PM", Saturday: "Closed", Sunday: "Closed" }) },
    { name: "Glow Hair Studio", category: "Salon", address: "789 Ocean Ave", city: "Manhattan Beach, CA", lat: 33.8847, lng: -118.4109, phone: "(310) 555-0103", email: "book@glowhair.com", rating: 4.6 },
    { name: "FlowRight Plumbing", category: "Plumber", address: "321 Elm St", city: "Redondo Beach, CA", lat: 33.8492, lng: -118.3884, phone: "(310) 555-0104", email: "service@flowright.com", rating: 4.3 },
    { name: "SkyShield Roofing", category: "Roofer", address: "654 Pacific Coast Hwy", city: "Hermosa Beach, CA", lat: 33.8622, lng: -118.3993, phone: "(310) 555-0105", email: "info@skyshield.com", rating: 4.7 },
    { name: "Coastal Auto Care", category: "Auto Shop", address: "987 Sepulveda Blvd", city: "El Segundo, CA", lat: 33.9192, lng: -118.4164, phone: "(310) 555-0106", email: "shop@coastalauto.com", rating: 4.4 },
    { name: "Harbor Dental Group", category: "Dentist", address: "147 Marina Way", city: "Marina del Rey, CA", lat: 33.9803, lng: -118.4518, phone: "(310) 555-0107", email: "info@harbordental.com", rating: 4.9 },
    { name: "Sunset Grill", category: "Restaurant", address: "258 Beach Ave", city: "Long Beach, CA", lat: 33.7701, lng: -118.1937, phone: "(562) 555-0108", email: "eat@sunsetgrill.com", rating: 4.2 },
  ];

  for (const lead of leads) {
    await prisma.localBusiness.create({
      data: {
        ...lead,
        agencyId: agency.id,
        hasWebsite: false,
        source: "scan",
        status: "NEW",
      },
    });
  }

  console.log(`Created demo user: demo@velabeam.com / demo1234`);
  console.log(`Created agency: ${agency.name}`);
  console.log(`Created ${leads.length} leads`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
