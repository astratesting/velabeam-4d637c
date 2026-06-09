"use client";

import { forwardRef, type InputHTMLAttributes } from "react";

/* ─── Warm-Catalyst palette ─── */
const violet = "#6B4FE0";
const coral = "#FF6B5B";
const ink = "#1B1530";
const mute = "#6B6480";
const line = "#ECE6DE";

/* ─── Types ─── */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  className?: string;
}

/* ─── Component ─── */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = "", id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium"
            style={{ color: ink }}
          >
            {label}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          className={[
            "h-10 w-full rounded-xl px-3 text-sm",
            "outline-none transition-all duration-150",
            "placeholder:text-[var(--color-muted)]",
            error
              ? "border-2"
              : "border",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
          style={{
            borderColor: error ? coral : line,
            color: ink,
            backgroundColor: "white",
            boxShadow: `0 0 0 0px transparent`,
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = error ? coral : violet;
            e.currentTarget.style.boxShadow = `0 0 0 3px ${error ? `${coral}20` : `${violet}20`}`;
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = error ? coral : line;
            e.currentTarget.style.boxShadow = `0 0 0 0px transparent`;
            props.onBlur?.(e);
          }}
          {...props}
        />

        {error && (
          <p className="text-xs font-medium" style={{ color: coral }}>
            {error}
          </p>
        )}

        {!error && helperText && (
          <p className="text-xs" style={{ color: mute }}>
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
export default Input;
