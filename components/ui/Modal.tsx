"use client";

import { useEffect, useRef, useCallback, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

/* ─── Warm-Catalyst palette ─── */
const ink = "#1B1530";
const mute = "#6B6480";

/* ─── Types ─── */
export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
}

/* ─── Component ─── */
function Modal({ open, onClose, title, children, className = "" }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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

  /* Close when clicking the backdrop */
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!open) return null;

  /* Guard for SSR */
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-[fadeIn_150ms_ease-out]"
      style={{ backgroundColor: "rgba(27, 21, 48, 0.45)", backdropFilter: "blur(4px)" }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={[
          "relative w-full max-w-lg bg-white rounded-2xl p-6",
          "shadow-[0_8px_30px_rgba(27,21,48,0.12)]",
          "animate-[scaleIn_150ms_ease-out]",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ borderRadius: 16 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
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
            aria-label="Close modal"
          >
            <X size={18} style={{ color: mute }} />
          </button>
        </div>

        {/* Body */}
        {children}
      </div>
    </div>,
    document.body,
  );
}

export { Modal };
export default Modal;
