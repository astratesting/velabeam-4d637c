"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader2 } from "lucide-react";

/* ─── Warm-Catalyst palette ─── */
const violet = "#6B4FE0";
const coral = "#FF6B5B";
const mute = "#6B6480";
const bg = "#FBF7F2";
const ink = "#1B1530";

/* ─── Variant / size maps ─── */
const variantStyles: Record<string, string> = {
  primary: [
    `bg-gradient-to-r from-[${violet}] to-[${coral}]`,
    "text-white",
    "shadow-md",
    "hover:shadow-lg",
    "active:shadow-sm",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ].join(" "),
  secondary: [
    `border border-[${violet}]`,
    `text-[${violet}]`,
    `bg-transparent`,
    `hover:bg-[${violet}]/10`,
    "active:bg-[${violet}]/20",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ].join(" "),
  ghost: [
    "bg-transparent",
    `text-[${ink}]`,
    `hover:bg-[${mute}]/10`,
    "active:bg-transparent",
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ].join(" "),
  danger: [
    `bg-[${coral}]`,
    "text-white",
    `hover:bg-[${coral}]/90`,
    `active:bg-[${coral}]/80`,
    "disabled:opacity-50 disabled:cursor-not-allowed",
  ].join(" "),
};

const sizeStyles: Record<string, string> = {
  sm: "h-8 px-3 text-sm gap-1.5 rounded-lg",
  md: "h-10 px-4 text-sm gap-2 rounded-xl",
  lg: "h-12 px-6 text-base gap-2.5 rounded-xl",
};

/* ─── Types ─── */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: ReactNode;
  className?: string;
}

/* ─── Component ─── */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled = false,
      children,
      className = "",
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={[
          "inline-flex items-center justify-center font-medium transition-all duration-150",
          "select-none cursor-pointer",
          variantStyles[variant],
          sizeStyles[size],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={{
          background:
            variant === "primary" && !isDisabled
              ? `linear-gradient(135deg, ${violet}, ${coral})`
              : undefined,
          borderColor: variant === "secondary" ? violet : undefined,
          color:
            variant === "secondary"
              ? violet
              : variant === "ghost"
                ? ink
                : variant === "danger" && !isDisabled
                  ? "white"
                  : undefined,
          backgroundColor:
            variant === "danger" && !isDisabled
              ? coral
              : variant === "ghost"
                ? "transparent"
                : undefined,
        }}
        {...props}
      >
        {loading && (
          <Loader2
            className="animate-spin shrink-0"
            size={size === "sm" ? 14 : size === "lg" ? 20 : 16}
          />
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button };
export default Button;
