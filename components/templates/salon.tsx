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

export default function SalonTemplate({ data }: { data: TemplateData }) {
  const color = data.primaryColor || "#C06C84";
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
          background: `linear-gradient(135deg, ${color} 0%, #3a1c71 50%, #d76d77 100%)`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.25) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.15) 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-white/70">
            Beauty &amp; Style
          </p>
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
            className="mt-8 inline-block rounded-full border-2 border-white/40 bg-white/10 px-8 py-3.5 text-base font-bold text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/20"
          >
            Book now
          </a>
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
            Our Services
          </h2>
          <p className="mt-2 text-center text-gray-500">
            Pamper yourself with our full range of beauty services
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.services.map((item, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 p-6 transition-all hover:shadow-lg"
              >
                <div
                  className="absolute left-0 top-0 h-1 w-full transition-all group-hover:h-1.5"
                  style={{ backgroundColor: color }}
                />
                <h3 className="mt-2 text-base font-semibold">{item}</h3>
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
              Studio Hours
            </h2>
            <div className="mt-8 space-y-3">
              {days.map((day) =>
                data.hours?.[day] ? (
                  <div
                    key={day}
                    className="flex items-center justify-between rounded-lg bg-white px-5 py-3 shadow-sm"
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
            Book Your Visit
          </h2>
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
        style={{
          background: `linear-gradient(135deg, ${color} 0%, #3a1c71 100%)`,
        }}
      >
        <p className="font-semibold">{data.heroTitle}</p>
        {data.address && <p className="mt-1 text-white/80">{data.address}</p>}
        <p className="mt-3 text-white/60">
          &copy; {new Date().getFullYear()} {data.heroTitle}. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
