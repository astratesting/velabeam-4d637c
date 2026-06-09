"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";

interface TemplateData {
  heroTitle: string;
  heroSubtitle?: string;
  about?: string;
  services: string[];
  phone?: string;
  email?: string;
  address?: string;
  hours?: Record<string, string>;
  primaryColor?: string;
}

export default function RooferTemplate({ data }: { data: TemplateData }) {
  const color = data.primaryColor || "#4A5568";
  const accent = "#E8732C";
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* ─── Hero ─── */}
      <section
        className="relative flex min-h-[70vh] items-center justify-center px-6 py-24 text-center text-white"
        style={{
          background: `linear-gradient(135deg, ${color} 0%, #2D3748 60%, #1A202C 100%)`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.3) 20px, rgba(255,255,255,0.3) 22px)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/70">
            Professional Roofing
          </p>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {data.heroTitle}
          </h1>
          {data.heroSubtitle && (
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/90">
              {data.heroSubtitle}
            </p>
          )}
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href={data.phone ? `tel:${data.phone}` : "#contact"}
              className="inline-block rounded-full px-8 py-3.5 text-base font-bold shadow-lg transition-transform hover:scale-105"
              style={{ backgroundColor: accent, color: "#fff" }}
            >
              Free estimate
            </a>
            {data.phone && (
              <span className="text-sm text-white/70">
                or call{" "}
                <a
                  href={`tel:${data.phone}`}
                  className="font-semibold text-white underline underline-offset-2"
                >
                  {data.phone}
                </a>
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ─── Trust bar ─── */}
      <section
        className="px-6 py-6"
        style={{ backgroundColor: accent }}
      >
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 text-sm font-semibold text-white">
          {[
            "Free Inspections",
            "Licensed & Bonded",
            "Storm Damage Experts",
            "Warranty Included",
          ].map((badge) => (
            <div key={badge} className="flex items-center gap-2">
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {badge}
            </div>
          ))}
        </div>
      </section>

      {/* ─── About ─── */}
      {data.about && (
        <section className="border-b border-gray-100 bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              About Us
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              {data.about}
            </p>
          </div>
        </section>
      )}

      {/* ─── Services ─── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            What We Do
          </h2>
          <p className="mt-2 text-center text-gray-500">
            Quality roofing solutions for homes and businesses
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.services.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div
                  className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg text-lg font-extrabold text-white"
                  style={{ backgroundColor: accent }}
                >
                  {i + 1}
                </div>
                <h3 className="text-base font-semibold">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Hours ─── */}
      {data.hours && Object.keys(data.hours).length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-xl">
            <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
              Working Hours
            </h2>
            <div className="mt-8 space-y-3">
              {days.map((day) =>
                data.hours?.[day] ? (
                  <div
                    key={day}
                    className="flex items-center justify-between rounded-lg border border-gray-100 bg-white px-5 py-3"
                  >
                    <span className="font-medium">{day}</span>
                    <span className="text-gray-600">{data.hours[day]}</span>
                  </div>
                ) : null,
              )}
            </div>
          </div>
        </section>
      )}

      {/* ─── Contact ─── */}
      <section id="contact" className="px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Schedule Your Free Inspection
          </h2>
          <p className="mt-2 text-gray-500">
            No obligation, no pressure — just honest answers
          </p>
          <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-10">
            {data.phone && (
              <a
                href={`tel:${data.phone}`}
                className="flex items-center gap-2 text-gray-700 transition-colors hover:text-gray-900"
              >
                <Phone size={18} style={{ color: accent }} />
                <span>{data.phone}</span>
              </a>
            )}
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="flex items-center gap-2 text-gray-700 transition-colors hover:text-gray-900"
              >
                <Mail size={18} style={{ color: accent }} />
                <span>{data.email}</span>
              </a>
            )}
            {data.address && (
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin size={18} style={{ color: accent }} />
                <span>{data.address}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        className="px-6 py-10 text-center text-sm text-white"
        style={{ backgroundColor: color }}
      >
        <p className="font-semibold">{data.heroTitle}</p>
        {data.address && <p className="mt-1 text-white/80">{data.address}</p>}
        {data.phone && (
          <p className="mt-1 text-white/80">
            <a href={`tel:${data.phone}`} className="hover:underline">
              {data.phone}
            </a>
          </p>
        )}
        <p className="mt-3 text-white/60">
          &copy; {new Date().getFullYear()} {data.heroTitle}. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
