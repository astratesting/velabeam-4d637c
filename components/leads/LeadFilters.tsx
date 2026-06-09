"use client";

import { Select, type SelectOption } from "@/components/ui/Select";

/* ─── Warm-Catalyst palette ─── */
const ink = "#1B1530";
const violet = "#6B4FE0";

/* ─── Options ─── */
const categoryOptions: SelectOption[] = [
  { value: "", label: "All categories" },
  { value: "Restaurant", label: "Restaurant" },
  { value: "Dentist", label: "Dentist" },
  { value: "Salon", label: "Salon" },
  { value: "Plumber", label: "Plumber" },
  { value: "Roofer", label: "Roofer" },
  { value: "Auto Shop", label: "Auto Shop" },
];

const statusOptions: SelectOption[] = [
  { value: "", label: "All statuses" },
  { value: "NEW", label: "New" },
  { value: "CONTACTED", label: "Contacted" },
  { value: "WON", label: "Won" },
  { value: "LOST", label: "Lost" },
];

/* ─── Types ─── */
export interface LeadFilters {
  category?: string;
  status?: string;
  hasEmail?: boolean;
  hasPhone?: boolean;
}

export interface LeadFiltersProps {
  filters: LeadFilters;
  onFilterChange: (filters: LeadFilters) => void;
}

/* ─── Component ─── */
export function LeadFilters({ filters, onFilterChange }: LeadFiltersProps) {
  return (
    <div
      className="flex flex-wrap items-end gap-3 px-4 py-3 rounded-xl border"
      style={{ borderColor: "#ECE6DE", backgroundColor: "white" }}
    >
      {/* Category */}
      <div className="w-44">
        <Select
          label="Category"
          options={categoryOptions}
          value={filters.category ?? ""}
          onChange={(e) =>
            onFilterChange({ ...filters, category: e.target.value || undefined })
          }
        />
      </div>

      {/* Status */}
      <div className="w-44">
        <Select
          label="Status"
          options={statusOptions}
          value={filters.status ?? ""}
          onChange={(e) =>
            onFilterChange({ ...filters, status: e.target.value || undefined })
          }
        />
      </div>

      {/* Has email checkbox */}
      <label className="flex items-center gap-2 cursor-pointer select-none pb-2.5">
        <input
          type="checkbox"
          checked={filters.hasEmail ?? false}
          onChange={(e) =>
            onFilterChange({ ...filters, hasEmail: e.target.checked || undefined })
          }
          className="w-4 h-4 rounded accent-[#6B4FE0] cursor-pointer"
          style={{ accentColor: violet }}
        />
        <span className="text-sm font-medium" style={{ color: ink }}>
          Has email
        </span>
      </label>

      {/* Has phone checkbox */}
      <label className="flex items-center gap-2 cursor-pointer select-none pb-2.5">
        <input
          type="checkbox"
          checked={filters.hasPhone ?? false}
          onChange={(e) =>
            onFilterChange({ ...filters, hasPhone: e.target.checked || undefined })
          }
          className="w-4 h-4 rounded accent-[#6B4FE0] cursor-pointer"
          style={{ accentColor: violet }}
        />
        <span className="text-sm font-medium" style={{ color: ink }}>
          Has phone
        </span>
      </label>
    </div>
  );
}

export default LeadFilters;
