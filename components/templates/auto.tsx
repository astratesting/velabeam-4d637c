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

export default function AutoTemplate({ data }: { data: TemplateData }) {
  const color = data.primaryColor || "#B91C1C";
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
          background: `linear-gradient(160deg, ${color} 0%, #7F1D1D 60%, #450A0A 100%)`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(255,255,255,0.4) 3px, rgba(255,255,255,0.4) 4px)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-8 w-8 text-white"
            >
              <circle cx="7" cy="17" r="2" />
              <circle cx="17" cy="17" r="2" />
              <path d="M5 17H3v-4l2-5h9l4 5h3v4h-2" />
              <path d="M5 8V6a1 1 0 0 1 1-1h4" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {data.heroTitle}
          </h1>
          {data.heroSubtitle && (
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/90">
              {data.heroSubtitle}
            </p>
          )}
          <a
            href={data.phone ? `tel:${data.phone}` : "#contact"}
            className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-base font-bold shadow-lg transition-transform hover:scale-105"
            style={{ color }}
          >
            Schedule service
          </a>
          {data.phone && (
            <p className="mt-4 text-sm text-white/70">
              Call now:{" "}
              <a
                href={`tel:${data.phone}`}
                className="font-semibold text-white underline underline-offset-2"
              >
                {data.phone}
              </a>
            </p>
          )}
        </div>
      </section>

      {/* ─── Trust badges ─── */}
      <section className="border-b border-gray-100 bg-gray-50 px-6 py-8">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-8 text-sm font-medium text-gray-500">
          {[
            "ASE Certified",
            "Family Owned",
            "Honest Pricing",
            "All Makes & Models",
          ].map((badge) => (
            <div key={badge} className="flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              {badge}
            </div>
          ))}
        </div>
      </section>

      {/* ─── About ─── */}
      {data.about && (
        <section className="px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Our Shop
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              {data.about}
            </p>
          </div>
        </section>
      )}

      {/* ─── Services ─── */}
      <section className="border-t border-gray-100 bg-gray-50 px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Services
          </h2>
          <p className="mt-2 text-center text-gray-500">
            Complete auto repair and maintenance
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.services.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border-l-4 bg-white px-5 py-4 shadow-sm transition-all hover:shadow-md"
                style={{ borderColor: color }}
              >
                <h3 className="text-base font-semibold">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Hours ─── */}
      {data.hours && Object.keys(data.hours).length > 0 && (
        <section className="px-6 py-16">
          <div className="mx-auto max-w-xl">
            <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
              Shop Hours
            </h2>
            <div className="mt-8 space-y-3">
              {days.map((day) =>
                data.hours?.[day] ? (
                  <div
                    key={day}
                    className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-5 py-3"
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
      <section
        id="contact"
        className="border-t border-gray-100 bg-gray-50 px-6 py-16"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Bring Your Vehicle In
          </h2>
          <p className="mt-2 text-gray-500">
            Walk-ins welcome, appointments recommended
          </p>
          <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-10">
            {data.phone && (
              <a
                href={`tel:${data.phone}`}
                className="flex items-center gap-2 text-gray-700 transition-colors hover:text-gray-900"
              >
                <Phone size={18} style={{ color }} />
                <span>{data.phone}</span>
              </a>
            )}
            {data.email && (
              <a
                href={`mailto:${data.email}`}
                className="flex items-center gap-2 text-gray-700 transition-colors hover:text-gray-900"
              >
                <Mail size={18} style={{ color }} />
                <span>{data.email}</span>
              </a>
            )}
            {data.address && (
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin size={18} style={{ color }} />
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
