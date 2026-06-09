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

export default function DentistTemplate({ data }: { data: TemplateData }) {
  const color = data.primaryColor || "#2D7DD2";
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
          background: `linear-gradient(160deg, ${color} 0%, ${color}cc 60%, ${color}99 100%)`,
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative z-10 mx-auto max-w-3xl">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="h-8 w-8 text-white"
            >
              <path d="M12 2C9 2 7 4 7 7c0 2 .5 3.5 1.5 5.5C9.5 14.5 10 17 10 19c0 1.5.5 3 2 3s2-1.5 2-3c0-2 .5-4.5 1.5-6.5C16.5 10.5 17 9 17 7c0-3-2-5-5-5z" />
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
            Book an appointment
          </a>
        </div>
      </section>

      {/* ─── About ─── */}
      {data.about && (
        <section className="border-b border-gray-100 bg-gray-50 px-6 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              About Our Practice
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
            Comprehensive dental care for the whole family
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.services.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-xl border border-gray-100 bg-gray-50 p-5 transition-all hover:shadow-md"
              >
                <div
                  className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: color }}
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
              Office Hours
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
            Get in Touch
          </h2>
          <p className="mt-2 text-gray-500">
            New patients are always welcome
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
        <p className="mt-3 text-white/60">
          &copy; {new Date().getFullYear()} {data.heroTitle}. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}
