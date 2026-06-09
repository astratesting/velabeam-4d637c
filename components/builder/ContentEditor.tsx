"use client";

import { useState, useEffect } from "react";

export interface SiteData {
  businessName: string;
  heroSubtitle: string;
  about: string;
  services: string[];
  phone: string;
  email: string;
  address: string;
  hours: Record<string, string>;
}

const defaultDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

interface ContentEditorProps {
  data: SiteData;
  onChange: (data: SiteData) => void;
}

export default function ContentEditor({ data, onChange }: ContentEditorProps) {
  const [servicesInput, setServicesInput] = useState(data.services.join(", "));

  useEffect(() => {
    setServicesInput(data.services.join(", "));
  }, [data.services]);

  function update<K extends keyof SiteData>(key: K, value: SiteData[K]) {
    onChange({ ...data, [key]: value });
  }

  function handleServicesBlur() {
    const parsed = servicesInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    update("services", parsed);
  }

  function handleHoursChange(day: string, value: string) {
    update("hours", { ...data.hours, [day]: value });
  }

  return (
    <div className="space-y-5">
      {/* Business Name */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#1B1530]">
          Business Name
        </label>
        <input
          type="text"
          value={data.businessName}
          onChange={(e) => update("businessName", e.target.value)}
          className="w-full rounded-lg border border-[#ECE6DE] bg-white px-3.5 py-2.5 text-sm text-[#1B1530] placeholder:text-[#6B6480] focus:border-[#6B4FE0] focus:outline-none focus:ring-1 focus:ring-[#6B4FE0]"
          placeholder="e.g. Bella's Kitchen"
        />
      </div>

      {/* Hero Subtitle */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#1B1530]">
          Hero Subtitle
        </label>
        <input
          type="text"
          value={data.heroSubtitle}
          onChange={(e) => update("heroSubtitle", e.target.value)}
          className="w-full rounded-lg border border-[#ECE6DE] bg-white px-3.5 py-2.5 text-sm text-[#1B1530] placeholder:text-[#6B6480] focus:border-[#6B4FE0] focus:outline-none focus:ring-1 focus:ring-[#6B4FE0]"
          placeholder="e.g. Farm-to-table dining in Santa Monica"
        />
      </div>

      {/* About */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#1B1530]">
          About
        </label>
        <textarea
          rows={3}
          value={data.about}
          onChange={(e) => update("about", e.target.value)}
          className="w-full rounded-lg border border-[#ECE6DE] bg-white px-3.5 py-2.5 text-sm text-[#1B1530] placeholder:text-[#6B6480] focus:border-[#6B4FE0] focus:outline-none focus:ring-1 focus:ring-[#6B4FE0] resize-none"
          placeholder="Tell visitors about your business..."
        />
      </div>

      {/* Services */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#1B1530]">
          Services
        </label>
        <input
          type="text"
          value={servicesInput}
          onChange={(e) => setServicesInput(e.target.value)}
          onBlur={handleServicesBlur}
          className="w-full rounded-lg border border-[#ECE6DE] bg-white px-3.5 py-2.5 text-sm text-[#1B1530] placeholder:text-[#6B6480] focus:border-[#6B4FE0] focus:outline-none focus:ring-1 focus:ring-[#6B4FE0]"
          placeholder="e.g. Dine-in, Catering, Private Events"
        />
        <p className="mt-1 text-xs text-[#6B6480]">
          Separate each service with a comma
        </p>
      </div>

      {/* Phone */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#1B1530]">
          Phone
        </label>
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => update("phone", e.target.value)}
          className="w-full rounded-lg border border-[#ECE6DE] bg-white px-3.5 py-2.5 text-sm text-[#1B1530] placeholder:text-[#6B6480] focus:border-[#6B4FE0] focus:outline-none focus:ring-1 focus:ring-[#6B4FE0]"
          placeholder="(555) 123-4567"
        />
      </div>

      {/* Email */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#1B1530]">
          Email
        </label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => update("email", e.target.value)}
          className="w-full rounded-lg border border-[#ECE6DE] bg-white px-3.5 py-2.5 text-sm text-[#1B1530] placeholder:text-[#6B6480] focus:border-[#6B4FE0] focus:outline-none focus:ring-1 focus:ring-[#6B4FE0]"
          placeholder="info@example.com"
        />
      </div>

      {/* Address */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#1B1530]">
          Address
        </label>
        <input
          type="text"
          value={data.address}
          onChange={(e) => update("address", e.target.value)}
          className="w-full rounded-lg border border-[#ECE6DE] bg-white px-3.5 py-2.5 text-sm text-[#1B1530] placeholder:text-[#6B6480] focus:border-[#6B4FE0] focus:outline-none focus:ring-1 focus:ring-[#6B4FE0]"
          placeholder="123 Main St, City, State"
        />
      </div>

      {/* Hours */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-[#1B1530]">
          Business Hours
        </label>
        <div className="space-y-2">
          {defaultDays.map((day) => (
            <div key={day} className="flex items-center gap-3">
              <span className="w-24 shrink-0 text-sm font-medium text-[#1B1530]">
                {day}
              </span>
              <input
                type="text"
                value={data.hours[day] ?? ""}
                onChange={(e) => handleHoursChange(day, e.target.value)}
                className="flex-1 rounded-lg border border-[#ECE6DE] bg-white px-3 py-2 text-sm text-[#1B1530] placeholder:text-[#6B6480] focus:border-[#6B4FE0] focus:outline-none focus:ring-1 focus:ring-[#6B4FE0]"
                placeholder="9:00 AM - 5:00 PM"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
