import Link from "next/link";

/* ─── Column link data ─── */
const columns: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Pricing", href: "/#pricing" },
      { label: "For Agencies", href: "/agencies" },
      { label: "Lead Radar", href: "/lead-radar" },
      { label: "AI Builder", href: "/ai-builder" },
      { label: "White-label", href: "/white-label" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="w-full bg-white"
      style={{ borderTop: "1px solid #ECE6DE" }}
    >
      <div className="mx-auto max-w-[1200px] px-6 py-16 lg:px-8">
        {/* ── Columns ─────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-4">
          {columns.map((col) => (
            <div key={col.heading}>
              <h4
                className="mb-4 font-heading text-sm font-semibold uppercase tracking-wider"
                style={{ color: "#1B1530" }}
              >
                {col.heading}
              </h4>

              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-body text-sm transition-colors duration-150 hover:opacity-80"
                      style={{ color: "#6B6480" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Empty column spacer for alignment on lg */}
          <div className="hidden lg:block" />
        </div>

        {/* ── Bottom bar ──────────────────────────────────── */}
        <div
          className="mt-14 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row"
          style={{ borderColor: "#ECE6DE" }}
        >
          <p className="font-body text-sm" style={{ color: "#6B6480" }}>
            &copy; 2026 VelaBeam. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: "#22c55e" }}
              aria-hidden="true"
            />
            <span className="font-body text-sm" style={{ color: "#6B6480" }}>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
