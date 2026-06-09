"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { CheckCircle, XCircle, Info, X } from "lucide-react";

/* ─── Warm-Catalyst palette ─── */
const violet = "#6B4FE0";
const coral = "#FF6B5B";
const honey = "#F5B544";
const ink = "#1B1530";

/* ─── Types ─── */
type ToastType = "success" | "error" | "info";

interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextValue {
  toast: (opts: { type?: ToastType; message: string }) => void;
}

/* ─── Context ─── */
const ToastContext = createContext<ToastContextValue | null>(null);

/* ─── Type styling ─── */
const typeConfig: Record<
  ToastType,
  { bg: string; border: string; icon: ReactNode }
> = {
  success: {
    bg: `${honey}18`,
    border: honey,
    icon: <CheckCircle size={18} style={{ color: honey }} />,
  },
  error: {
    bg: `${coral}18`,
    border: coral,
    icon: <XCircle size={18} style={{ color: coral }} />,
  },
  info: {
    bg: `${violet}18`,
    border: violet,
    icon: <Info size={18} style={{ color: violet }} />,
  },
};

/* ─── ToastItem component ─── */
function ToastCard({
  item,
  onDismiss,
}: {
  item: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const config = typeConfig[item.type];

  return (
    <div
      className="flex items-start gap-3 p-4 rounded-xl shadow-lg border-l-4 bg-white min-w-[300px] max-w-[420px] animate-[slideInRight_250ms_ease-out]"
      style={{ borderColor: config.border, backgroundColor: config.bg }}
    >
      <span className="shrink-0 mt-0.5">{config.icon}</span>
      <p className="flex-1 text-sm font-medium" style={{ color: ink }}>
        {item.message}
      </p>
      <button
        type="button"
        onClick={() => onDismiss(item.id)}
        className="shrink-0 p-0.5 rounded hover:bg-black/5 transition-colors cursor-pointer"
        aria-label="Dismiss toast"
      >
        <X size={14} style={{ color: ink }} />
      </button>
    </div>
  );
}

/* ─── Provider ─── */
function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ type = "info", message }: { type?: ToastType; message: string }) => {
      const id = `toast-${++counter.current}`;
      setToasts((prev) => [...prev, { id, type, message }]);

      /* Auto-dismiss after 3 s */
      setTimeout(() => dismiss(id), 3000);
    },
    [dismiss],
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {typeof document !== "undefined" &&
        createPortal(
          <>
            <style>{`
              @keyframes slideInRight {
                from { opacity: 0; transform: translateX(100%); }
                to   { opacity: 1; transform: translateX(0); }
              }
            `}</style>
            <div className="fixed top-4 right-4 z-[60] flex flex-col gap-3 pointer-events-none">
              {toasts.map((t) => (
                <div key={t.id} className="pointer-events-auto">
                  <ToastCard item={t} onDismiss={dismiss} />
                </div>
              ))}
            </div>
          </>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

/* ─── Hook ─── */
function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a <ToastProvider>");
  }
  return ctx;
}

export { ToastProvider, useToast };
export default ToastProvider;
