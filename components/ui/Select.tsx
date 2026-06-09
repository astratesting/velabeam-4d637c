"use client";

import { forwardRef, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";

/* ─── Warm-Catalyst palette ─── */
const violet = "#6B4FE0";
const coral = "#FF6B5B";
const ink = "#1B1530";
const mute = "#6B6480";
const line = "#ECE6DE";

/* ─── Types ─── */
export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  className?: string;
  placeholder?: string;
}

/* ─── Component ─── */
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, className = "", id, placeholder, ...props }, ref) => {
    const selectId =
      id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium"
            style={{ color: ink }}
          >
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={[
              "h-10 w-full rounded-xl px-3 pr-9 text-sm appearance-none",
              "outline-none transition-all duration-150 cursor-pointer",
              error ? "border-2" : "border",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            style={{
              borderColor: error ? coral : line,
              color: ink,
              backgroundColor: "white",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = error ? coral : violet;
              e.currentTarget.style.boxShadow = `0 0 0 3px ${error ? `${coral}20` : `${violet}20`}`;
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = error ? coral : line;
              e.currentTarget.style.boxShadow = "none";
              props.onBlur?.(e);
            }}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: mute }}
          />
        </div>

        {error && (
          <p className="text-xs font-medium" style={{ color: coral }}>
            {error}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };
export default Select;
