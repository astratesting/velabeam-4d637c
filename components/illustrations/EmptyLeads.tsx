import React from "react";

interface EmptyLeadsProps {
  className?: string;
}

/** Empty state: a lighthouse with no ships nearby. Friendly, encouraging feel. */
export default function EmptyLeads({ className }: EmptyLeadsProps) {
  return (
    <svg
      viewBox="0 0 320 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="No leads yet - a lighthouse awaits ships"
    >
      <defs>
        <linearGradient id="emptyLeadsSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5B544" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#FBF7F2" />
        </linearGradient>
        <linearGradient id="emptyLeadsBeam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6B4FE0" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#6B4FE0" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="320" height="280" fill="url(#emptyLeadsSky)" rx="12" />

      {/* Sun */}
      <circle cx="260" cy="50" r="30" fill="#F5B544" opacity="0.2" />
      <circle cx="260" cy="50" r="18" fill="#F5B544" opacity="0.3" />

      {/* Clouds */}
      <ellipse cx="80" cy="40" rx="35" ry="10" fill="#FF6B5B" opacity="0.08" />
      <ellipse cx="200" cy="55" rx="45" ry="10" fill="#6B4FE0" opacity="0.06" />

      {/* ---- Lighthouse ---- */}
      {/* Cliff / base */}
      <ellipse cx="100" cy="195" rx="40" ry="12" fill="#1B1530" opacity="0.08" />

      {/* Body */}
      <rect x="85" y="100" width="30" height="95" rx="3" fill="#FBF7F2" stroke="#1B1530" strokeWidth="1.5" />
      {/* Red stripes */}
      <rect x="85" y="115" width="30" height="15" fill="#FF6B5B" opacity="0.5" />
      <rect x="85" y="145" width="30" height="15" fill="#FF6B5B" opacity="0.5" />
      <rect x="85" y="175" width="30" height="15" fill="#FF6B5B" opacity="0.5" />

      {/* Lantern room */}
      <rect x="80" y="90" width="40" height="14" rx="3" fill="#6B4FE0" />
      <rect x="76" y="85" width="48" height="8" rx="4" fill="#1B1530" />

      {/* Lantern glow */}
      <circle cx="100" cy="97" r="5" fill="#F5B544" opacity="0.8" />
      <circle cx="100" cy="97" r="14" fill="#F5B544" opacity="0.15" />
      <circle cx="100" cy="97" r="24" fill="#F5B544" opacity="0.07" />

      {/* Beam */}
      <polygon points="100,92 310,70 310,110" fill="url(#emptyLeadsBeam)" />

      {/* ---- Water ---- */}
      <rect x="0" y="195" width="320" height="85" fill="#6B4FE0" opacity="0.06" />

      {/* Waves */}
      <path
        d="M0,210 Q40,204 80,210 Q120,216 160,210 Q200,204 240,210 Q280,216 320,210"
        stroke="#6B4FE0"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.2"
      />
      <path
        d="M0,228 Q50,222 100,228 Q150,234 200,228 Q250,222 300,228"
        stroke="#6B4FE0"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.12"
      />

      {/* ---- Floating question marks (no ships) ---- */}
      <text
        x="200"
        y="170"
        fontFamily="inherit"
        fontSize="22"
        fill="#6B4FE0"
        opacity="0.25"
        textAnchor="middle"
      >
        ?
      </text>
      <text
        x="250"
        y="190"
        fontFamily="inherit"
        fontSize="16"
        fill="#6B4FE0"
        opacity="0.18"
        textAnchor="middle"
      >
        ?
      </text>
      <text
        x="160"
        y="185"
        fontFamily="inherit"
        fontSize="14"
        fill="#6B4FE0"
        opacity="0.15"
        textAnchor="middle"
      >
        ?
      </text>

      {/* Compass rose hint */}
      <g transform="translate(260, 230)" opacity="0.15">
        <circle cx="0" cy="0" r="16" stroke="#6B4FE0" strokeWidth="1" fill="none" />
        <line x1="0" y1="-14" x2="0" y2="14" stroke="#6B4FE0" strokeWidth="0.8" />
        <line x1="-14" y1="0" x2="14" y2="0" stroke="#6B4FE0" strokeWidth="0.8" />
        <polygon points="0,-12 -3,-2 3,-2" fill="#FF6B5B" />
      </g>
    </svg>
  );
}
