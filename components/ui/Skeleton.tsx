"use client";

import { type CSSProperties } from "react";

/* ─── Types ─── */
export interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  style?: CSSProperties;
}

/* ─── Component ─── */
function Skeleton({ className = "", width, height, style }: SkeletonProps) {
  return (
    <>
      <style>{`
        @keyframes skeletonShimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      <div
        className={`rounded-xl ${className}`}
        style={{
          width: typeof width === "number" ? `${width}px` : width,
          height: typeof height === "number" ? `${height}px` : height,
          background: `linear-gradient(90deg, #F5B54426 25%, #F5B54418 50%, #F5B54426 75%)`,
          backgroundSize: "200% 100%",
          animation: "skeletonShimmer 1.5s ease-in-out infinite",
          ...style,
        }}
        aria-hidden="true"
      />
    </>
  );
}

/* ─── Card-shaped skeleton ─── */
function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 shadow-[0_2px_12px_rgba(27,21,48,0.06)] ${className}`}
      style={{ borderRadius: 16 }}
    >
      {/* Title placeholder */}
      <Skeleton width="60%" height={20} className="mb-3" />
      {/* Description placeholder */}
      <Skeleton width="90%" height={14} className="mb-2" />
      <Skeleton width="75%" height={14} className="mb-6" />
      {/* Action placeholder */}
      <Skeleton width="40%" height={36} className="rounded-xl" />
    </div>
  );
}

export { Skeleton, SkeletonCard };
export default Skeleton;
