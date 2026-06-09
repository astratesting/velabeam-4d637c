"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Product", href: "/product" },
  { label: "Pricing", href: "/pricing" },
  { label: "For Agencies", href: "/agencies" },
];

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-vb-line bg-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {/* Sail */}
            <path
              d="M8 28V8l12 10-12 10z"
              fill="#6B4FE0"
              opacity="0.85"
            />
            {/* Beam / horizon line */}
            <path
              d="M4 22h24"
              stroke="#FF6B5B"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Accent dot */}
            <circle cx="26" cy="10" r="3" fill="#F5B544" />
          </svg>
          <span className="font-heading text-xl font-extrabold tracking-tight text-vb-ink">
            VelaBeam
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-vb-muted transition-colors hover:text-vb-ink"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop right section */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/signin"
            className="text-sm font-medium text-vb-muted transition-colors hover:text-vb-ink"
          >
            Sign in
          </Link>
          <Link
            href="/signup"
            className="rounded-input bg-vb-violet px-5 py-2 text-sm font-semibold text-white shadow-warm transition-all hover:bg-vb-violet/90 hover:shadow-warm-lg"
          >
            Start free trial
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-vb-ink md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-vb-line bg-white px-4 pb-6 pt-4 md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block text-base font-medium text-vb-muted transition-colors hover:text-vb-ink"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3 border-t border-vb-line pt-4">
            <Link
              href="/signin"
              className="text-base font-medium text-vb-muted transition-colors hover:text-vb-ink"
              onClick={() => setMobileOpen(false)}
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="rounded-input bg-vb-violet px-5 py-2.5 text-center text-sm font-semibold text-white shadow-warm transition-all hover:bg-vb-violet/90 hover:shadow-warm-lg"
              onClick={() => setMobileOpen(false)}
            >
              Start free trial
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
