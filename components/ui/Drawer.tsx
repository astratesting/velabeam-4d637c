"use client";

import { useEffect, useRef, useCallback, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

/* ─── Warm-Catalyst palette ─── */
const ink = "#1B1530";
const mute = "#6B6480";

/* ─── Types ─── */
export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

/* ─── Component ─── */
function Drawer({
  open,
  onClose,
  title,
  children,
  className = "",
}: DrawerProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  /* Close on Escape */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, handleKeyDown]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!open) return null;
  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      <style>{`
        @keyframes fadeOverlay {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
      `}</style>

      <div
        ref={overlayRef}
        onClick={handleOverlayClick}
        className="fixed inset-0 z-50 animate-[fadeOverlay_200ms_ease-out]"
        style={{
          backgroundColor: "rgba(27, 21, 48, 0.4)",
          backdropFilter: "blur(4px)",
        }}
      >
        {/* Drawer panel */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          className={[
            "absolute right-0 top-0 h-full w-full max-w-md",
            "bg-white shadow-[-4px_0_24px_rgba(27,21,48,0.1)]",
            "flex flex-col",
            "animate-[slideInRight_250ms_cubic-bezier(0.16,1,0.3,1)]",
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "#ECE6DE" }}>
            {title && (
              <h2
                className="text-lg font-semibold leading-tight"
                style={{ color: ink }}
              >
                {title}
              </h2>
            )}
            <button
              type="button"
              onClick={onClose}
              className="ml-auto -mr-1 p-1.5 rounded-lg hover:bg-black/5 transition-colors cursor-pointer"
              aria-label="Close drawer"
            >
              <X size={18} style={{ color: mute }} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4">{children}</div>
        </div>
      </div>
    </>,
    document.body,
  );
}

export { Drawer };
export default Drawer;
