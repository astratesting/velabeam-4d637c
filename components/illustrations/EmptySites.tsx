import React from "react";

interface EmptySitesProps {
  className?: string;
}

/** Empty state: a dock/wharf with no boats. Friendly, encouraging feel. */
export default function EmptySites({ className }: EmptySitesProps) {
  return (
    <svg
      viewBox="0 0 320 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="No sites yet - an empty dock awaits boats"
    >
      <defs>
        <linearGradient id="emptySitesSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF6B5B" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#FBF7F2" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="320" height="280" fill="url(#emptySitesSky)" rx="12" />

      {/* Sun */}
      <circle cx="250" cy="45" r="28" fill="#F5B544" opacity="0.2" />
      <circle cx="250" cy="45" r="16" fill="#F5B544" opacity="0.3" />

      {/* Clouds */}
      <ellipse cx="70" cy="35" rx="30" ry="9" fill="#6B4FE0" opacity="0.06" />
      <ellipse cx="180" cy="50" rx="40" ry="10" fill="#FF6B5B" opacity="0.06" />

      {/* ---- Dock / Wharf ---- */}
      {/* Dock pilings */}
      <rect x="30" y="170" width="6" height="50" rx="2" fill="#1B1530" opacity="0.3" />
      <rect x="55" y="170" width="6" height="50" rx="2" fill="#1B1530" opacity="0.3" />
      <rect x="80" y="170" width="6" height="50" rx="2" fill="#1B1530" opacity="0.3" />
      <rect x="105" y="170" width="6" height="50" rx="2" fill="#1B1530" opacity="0.3" />
      <rect x="130" y="170" width="6" height="50" rx="2" fill="#1B1530" opacity="0.3" />

      {/* Dock surface / planks */}
      <rect x="22" y="162" width="122" height="12" rx="4" fill="#1B1530" opacity="0.2" />
      {/* Plank lines */}
      <line x1="44" y1="163" x2="44" y2="173" stroke="#1B1530" strokeWidth="0.5" opacity="0.15" />
      <line x1="66" y1="163" x2="66" y2="173" stroke="#1B1530" strokeWidth="0.5" opacity="0.15" />
      <line x1="88" y1="163" x2="88" y2="173" stroke="#1B1530" strokeWidth="0.5" opacity="0.15" />
      <line x1="110" y1="163" x2="110" y2="173" stroke="#1B1530" strokeWidth="0.5" opacity="0.15" />

      {/* Bollard / cleat on dock */}
      <rect x="40" y="155" width="10" height="8" rx="3" fill="#1B1530" opacity="0.25" />
      <rect x="100" y="155" width="10" height="8" rx="3" fill="#1B1530" opacity="0.25" />

      {/* Rope from cleat */}
      <path
        d="M45,158 Q50,165 52,170"
        stroke="#F5B544"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />

      {/* ---- Water ---- */}
      <rect x="0" y="195" width="320" height="85" fill="#6B4FE0" opacity="0.05" />

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
      <path
        d="M10,248 Q60,242 110,248 Q160,254 210,248 Q260,242 310,248"
        stroke="#6B4FE0"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.08"
      />

      {/* ---- Empty mooring spots (dotted outlines) ---- */}
      {/* Ghost boat 1 */}
      <g opacity="0.12">
        <path d="M190,185 L190,155 L210,175 Z" stroke="#6B4FE0" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
        <path d="M182,195 Q190,202 215,195" stroke="#6B4FE0" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
      </g>

      {/* Ghost boat 2 */}
      <g opacity="0.1">
        <path d="M240,188 L240,162 L258,180 Z" stroke="#6B4FE0" strokeWidth="1.2" strokeDasharray="3 3" fill="none" />
        <path d="M234,196 Q242,202 264,196" stroke="#6B4FE0" strokeWidth="1.2" strokeDasharray="3 3" fill="none" />
      </g>

      {/* Seagull silhouettes */}
      <path d="M200,70 Q204,65 208,70" stroke="#1B1530" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.15" />
      <path d="M220,60 Q223,57 226,60" stroke="#1B1530" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.12" />

      {/* Floating dotted path (inviting) */}
      <path
        d="M160,230 Q180,225 200,230 Q220,235 240,230 Q260,225 280,230"
        stroke="#F5B544"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="6 6"
        fill="none"
        opacity="0.25"
      />
      {/* Arrow at end of dotted path */}
      <polygon
        points="280,227 290,230 280,233"
        fill="#F5B544"
        opacity="0.25"
      />
    </svg>
  );
}
