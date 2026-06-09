import React from "react";

interface HarborHeroProps {
  className?: string;
}

/** Hero illustration: a friendly harbor scene with lighthouse, sailboat, and warm sunset. */
export default function HarborHero({ className }: HarborHeroProps) {
  return (
    <svg
      viewBox="0 0 500 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Harbor illustration"
    >
      <defs>
        {/* Sunset sky gradient */}
        <linearGradient id="heroSkyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F5B544" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#FF6B5B" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#FBF7F2" />
        </linearGradient>

        {/* Lighthouse beam */}
        <linearGradient id="heroBeamGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6B4FE0" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#6B4FE0" stopOpacity="0" />
        </linearGradient>

        {/* Water gradient */}
        <linearGradient id="heroWaterGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6B4FE0" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#6B4FE0" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Sky background */}
      <rect width="500" height="400" fill="#FBF7F2" />
      <rect width="500" height="260" fill="url(#heroSkyGrad)" />

      {/* Sun - warm honey */}
      <circle cx="400" cy="90" r="50" fill="#F5B544" opacity="0.35" />
      <circle cx="400" cy="90" r="35" fill="#F5B544" opacity="0.25" />
      <circle cx="400" cy="90" r="20" fill="#F5B544" opacity="0.4" />

      {/* Distant clouds */}
      <ellipse cx="120" cy="70" rx="60" ry="18" fill="#FF6B5B" opacity="0.12" />
      <ellipse cx="300" cy="50" rx="80" ry="14" fill="#F5B544" opacity="0.1" />
      <ellipse cx="450" cy="65" rx="40" ry="12" fill="#FF6B5B" opacity="0.08" />

      {/* ---- Lighthouse ---- */}
      {/* Lighthouse base / cliff */}
      <ellipse cx="80" cy="260" rx="50" ry="20" fill="#1B1530" opacity="0.1" />

      {/* Lighthouse body */}
      <rect x="62" y="140" width="36" height="120" rx="4" fill="#FBF7F2" stroke="#1B1530" strokeWidth="2" />
      {/* Stripes */}
      <rect x="62" y="160" width="36" height="20" rx="0" fill="#FF6B5B" opacity="0.6" />
      <rect x="62" y="200" width="36" height="20" rx="0" fill="#FF6B5B" opacity="0.6" />
      <rect x="62" y="240" width="36" height="20" rx="0" fill="#FF6B5B" opacity="0.6" />

      {/* Lighthouse top / lantern room */}
      <rect x="56" y="128" width="48" height="16" rx="4" fill="#6B4FE0" />
      <rect x="52" y="122" width="56" height="10" rx="5" fill="#1B1530" />

      {/* Lantern glow */}
      <circle cx="80" cy="136" r="6" fill="#F5B544" opacity="0.8" />
      <circle cx="80" cy="136" r="12" fill="#F5B544" opacity="0.25" />

      {/* Lighthouse beam */}
      <polygon
        points="80,130 480,80 480,140"
        fill="url(#heroBeamGrad)"
      />

      {/* ---- Sailboat ---- */}
      <g transform="translate(280, 200)">
        {/* Sail - violet */}
        <path d="M0,0 L0,-60 L40,-10 Z" fill="#6B4FE0" opacity="0.8" />
        {/* Secondary sail */}
        <path d="M0,-5 L0,-55 L-25,-15 Z" fill="#6B4FE0" opacity="0.5" />
        {/* Mast */}
        <line x1="0" y1="5" x2="0" y2="-62" stroke="#1B1530" strokeWidth="2" strokeLinecap="round" />
        {/* Hull */}
        <path d="M-25,5 Q0,15 30,5 Q18,10 0,10 Q-12,10 -25,5Z" fill="#1B1530" />
      </g>

      {/* ---- Second small sailboat (distant) ---- */}
      <g transform="translate(380, 230) scale(0.5)">
        <path d="M0,0 L0,-40 L25,-8 Z" fill="#6B4FE0" opacity="0.5" />
        <line x1="0" y1="4" x2="0" y2="-42" stroke="#1B1530" strokeWidth="2" strokeLinecap="round" />
        <path d="M-18,4 Q0,12 22,4 Q12,8 0,8 Q-10,8 -18,4Z" fill="#1B1530" opacity="0.6" />
      </g>

      {/* ---- Water ---- */}
      <rect x="0" y="260" width="500" height="140" fill="url(#heroWaterGrad)" />

      {/* Wave lines */}
      <path
        d="M0,275 Q50,268 100,275 Q150,282 200,275 Q250,268 300,275 Q350,282 400,275 Q450,268 500,275"
        stroke="#6B4FE0"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
      />
      <path
        d="M0,290 Q60,283 120,290 Q180,297 240,290 Q300,283 360,290 Q420,297 480,290"
        stroke="#6B4FE0"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.2"
      />
      <path
        d="M0,310 Q70,304 140,310 Q210,316 280,310 Q350,304 420,310 Q460,314 500,310"
        stroke="#6B4FE0"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.15"
      />

      {/* Reflections on water */}
      <ellipse cx="80" cy="285" rx="15" ry="3" fill="#F5B544" opacity="0.2" />
      <ellipse cx="80" cy="300" rx="10" ry="2" fill="#F5B544" opacity="0.12" />

      {/* ---- Harbor dock ---- */}
      {/* Dock posts */}
      <rect x="20" y="255" width="6" height="30" rx="2" fill="#1B1530" opacity="0.4" />
      <rect x="40" y="255" width="6" height="30" rx="2" fill="#1B1530" opacity="0.4" />
      <rect x="60" y="255" width="6" height="30" rx="2" fill="#1B1530" opacity="0.4" />
      {/* Dock platform */}
      <rect x="12" y="252" width="60" height="8" rx="3" fill="#1B1530" opacity="0.25" />

      {/* ---- Birds in the distance ---- */}
      <path d="M320,40 Q325,35 330,40" stroke="#1B1530" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.3" />
      <path d="M340,50 Q344,46 348,50" stroke="#1B1530" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.25" />
      <path d="M310,55 Q314,51 318,55" stroke="#1B1530" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.2" />
    </svg>
  );
}
