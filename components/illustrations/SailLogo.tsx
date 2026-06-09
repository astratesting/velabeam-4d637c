import React from "react";

interface SailLogoProps {
  size?: number;
  className?: string;
}

/** VelaBeam logo: stylized sailboat sail with a beam of light. */
export default function SailLogo({ size = 40, className }: SailLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="VelaBeam logo"
    >
      {/* Sail body - violet */}
      <path
        d="M20 6 L20 30 L8 22 Q12 14 20 6Z"
        fill="#6B4FE0"
        opacity="0.9"
      />
      {/* Secondary sail panel - lighter violet */}
      <path
        d="M20 10 L20 30 L30 24 Q28 16 20 10Z"
        fill="#6B4FE0"
        opacity="0.6"
      />

      {/* Beam of light - coral to honey gradient */}
      <defs>
        <linearGradient id="sailBeamGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF6B5B" />
          <stop offset="100%" stopColor="#F5B544" />
        </linearGradient>
      </defs>
      <path
        d="M20 6 L34 2 L36 4 L22 8Z"
        fill="url(#sailBeamGrad)"
        opacity="0.85"
      />
      {/* Light rays */}
      <path
        d="M20 6 L38 0 L38 3 L22 7Z"
        fill="#F5B544"
        opacity="0.4"
      />

      {/* Mast */}
      <line
        x1="20" y1="4" x2="20" y2="32"
        stroke="#1B1530"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Hull - ink */}
      <path
        d="M6 32 Q20 38 34 32 Q28 35 20 35 Q12 35 6 32Z"
        fill="#1B1530"
      />

      {/* Water line accent */}
      <path
        d="M8 33 Q14 31 20 33 Q26 35 32 33"
        stroke="#6B4FE0"
        strokeWidth="0.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}
