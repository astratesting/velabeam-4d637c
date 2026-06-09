import React from "react";

interface AnchorDividerProps {
  className?: string;
}

/** Decorative section divider with an anchor motif in the center. */
export function AnchorDivider({ className }: AnchorDividerProps) {
  return (
    <svg
      viewBox="0 0 600 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      {/* Left line */}
      <line
        x1="0"
        y1="20"
        x2="260"
        y2="20"
        stroke="#6B4FE0"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />
      {/* Right line */}
      <line
        x1="340"
        y1="20"
        x2="600"
        y2="20"
        stroke="#6B4FE0"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.3"
      />

      {/* Anchor in center */}
      <g transform="translate(300, 20)">
        {/* Ring at top */}
        <circle
          cx="0"
          cy="-10"
          r="4"
          stroke="#6B4FE0"
          strokeWidth="2"
          fill="none"
        />

        {/* Vertical shank */}
        <line
          x1="0"
          y1="-6"
          x2="0"
          y2="12"
          stroke="#6B4FE0"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Cross bar */}
        <line
          x1="-8"
          y1="0"
          x2="8"
          y2="0"
          stroke="#6B4FE0"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Flukes - curved arms */}
        <path
          d="M-14,12 Q-14,4 -4,12"
          stroke="#6B4FE0"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M14,12 Q14,4 4,12"
          stroke="#6B4FE0"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Small decorative dots on either side */}
      <circle cx="250" cy="20" r="2" fill="#6B4FE0" opacity="0.4" />
      <circle cx="350" cy="20" r="2" fill="#6B4FE0" opacity="0.4" />
      <circle cx="236" cy="20" r="1.2" fill="#6B4FE0" opacity="0.25" />
      <circle cx="364" cy="20" r="1.2" fill="#6B4FE0" opacity="0.25" />
    </svg>
  );
}
