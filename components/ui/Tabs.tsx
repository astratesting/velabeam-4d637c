"use client";

import { useState, type ReactNode } from "react";

/* ─── Warm-Catalyst palette ─── */
const violet = "#6B4FE0";
const ink = "#1B1530";
const mute = "#6B6480";
const line = "#ECE6DE";

/* ─── Types ─── */
export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
}

/* ─── Component ─── */
function Tabs({ tabs, defaultTab, className = "" }: TabsProps) {
  const [activeId, setActiveId] = useState<string>(
    defaultTab || tabs[0]?.id || "",
  );

  const activeTab = tabs.find((t) => t.id === activeId);

  return (
    <div className={className}>
      {/* Tab list */}
      <div
        className="flex gap-1 border-b overflow-x-auto"
        style={{ borderColor: line }}
        role="tablist"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveId(tab.id)}
              className={[
                "relative px-4 py-2.5 text-sm font-medium whitespace-nowrap",
                "transition-colors duration-150 cursor-pointer",
                "-mb-px",
              ].join(" ")}
              style={{
                color: isActive ? violet : mute,
                borderBottom: isActive ? `2px solid ${violet}` : "2px solid transparent",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="pt-4" role="tabpanel">
        {activeTab?.content}
      </div>
    </div>
  );
}

export { Tabs };
export default Tabs;
