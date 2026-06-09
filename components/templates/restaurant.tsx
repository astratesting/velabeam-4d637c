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

export default function RestaurantTemplate({ data }: { data: TemplateData }) {
  const color = data.primaryColor || "#D94F30";
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
          background: `linear-gradient(135deg, ${color} 0%, ${color}dd 50%, ${color}aa 100%)`,
        }}
      >
        {/* Subtle pattern overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 80%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.2) 0%, transparent 50%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/80">
            Welcome to
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
            className="mt-8 inline-block rounded-full bg-white px-8 py-3.5 text-base font-bold shadow-lg transition-transform hover:scale-105"
            style={{ color }}
          >
            Reserve a table
          </a>
        </div>
      </section>

      {/* ─── About ─── */}
      {data.about && (
        <section className="border-b border-gray-100 bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Our Story
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              {data.about}
            </p>
          </div>
        </section>
      )}

      {/* ─── Menu / Services ─── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">
            Our Menu
          </h2>
          <p className="mt-2 text-center text-gray-500">
            Crafted with fresh, locally sourced ingredients
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.services.map((item, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-100 bg-gray-50 p-5 transition-all hover:shadow-md"
              >
                <div
                  className="mb-3 h-1 w-10 rounded-full"
                  style={{ backgroundColor: color }}
                />
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
              Hours
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
            Visit Us
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
        style={{ backgroundColor: color }}
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
