import Link from "next/link";
import { Anchor } from "lucide-react";

/* ─── Palette tokens ─── */
const violet = "#6B4FE0";
const ink = "#1B1530";
const mute = "#6B6480";
const bg = "#FBF7F2";
const line = "#ECE6DE";
const honey = "#F5B544";

export default function NotFound() {
  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-6 text-center"
      style={{ background: bg }}
    >
      {/* ── Illustration ─────────────────────────────────────── */}
      <div className="relative mb-10">
        {/* Water waves */}
        <svg
          width="220"
          height="100"
          viewBox="0 0 220 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Wave 1 */}
          <path
            d="M0 60 C30 40, 50 80, 80 60 C110 40, 130 80, 160 60 C190 40, 210 80, 220 60 L220 100 L0 100 Z"
            fill={line}
            opacity="0.6"
          />
          {/* Wave 2 */}
          <path
            d="M0 70 C25 50, 55 90, 85 70 C115 50, 145 90, 175 70 C195 55, 210 85, 220 70 L220 100 L0 100 Z"
            fill={line}
            opacity="0.4"
          />
        </svg>

        {/* Anchor icon floating above waves */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full"
            style={{
              background: `linear-gradient(135deg, ${violet}, #FF6B5B)`,
              boxShadow: `0 8px 30px rgba(107, 79, 224, 0.25)`,
            }}
          >
            <Anchor size={36} color="white" strokeWidth={1.8} />
          </div>
        </div>
      </div>

      {/* ── Error code ───────────────────────────────────────── */}
      <p
        className="mb-2 font-heading text-[80px] font-bold leading-none tracking-tight md:text-[100px]"
        style={{ color: honey }}
      >
        404
      </p>

      {/* ── Heading ──────────────────────────────────────────── */}
      <h1
        className="mb-4 font-heading text-[28px] font-bold leading-tight tracking-tight md:text-[36px]"
        style={{ color: ink }}
      >
        This page drifted out to sea
      </h1>

      {/* ── Subtext ──────────────────────────────────────────── */}
      <p
        className="mx-auto mb-10 max-w-md font-body text-lg"
        style={{ color: mute }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      {/* ── CTA button ───────────────────────────────────────── */}
      <Link
        href="/"
        className="inline-flex h-12 items-center justify-center rounded-xl px-6 text-base font-medium text-white shadow-md transition-all duration-150 hover:shadow-lg"
        style={{
          background: `linear-gradient(135deg, ${violet}, #FF6B5B)`,
        }}
      >
        Take me home
      </Link>
    </div>
  );
}
