"use client";

import { type ReactNode } from "react";

/* ─── Warm-Catalyst palette ─── */
const violet = "#6B4FE0";
const coral = "#FF6B5B";
const honey = "#F5B544";
const mute = "#6B6480";

/* ─── Variant styles ─── */
const variantMap: Record<string, { bg: string; text: string }> = {
  default: { bg: `${violet}18`, text: violet },
  success: { bg: `${honey}22`, text: "#9A7A00" },
  warning: { bg: `${coral}18`, text: coral },
  muted: { bg: `${mute}18`, text: mute },
};

/* ─── Types ─── */
export interface BadgeProps {
  variant?: "default" | "success" | "warning" | "muted";
  children: ReactNode;
  className?: string;
}

/* ─── Component ─── */
function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  const { bg, text } = variantMap[variant];

  return (
    <span
      className={[
        "inline-flex items-center justify-center",
        "px-2.5 py-0.5 text-xs font-semibold leading-tight",
        "select-none whitespace-nowrap",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        borderRadius: 999,
        backgroundColor: bg,
        color: text,
      }}
    >
      {children}
    </span>
  );
}

export { Badge };
export default Badge;
