"use client";

import { Loader2 } from "lucide-react";

interface PublishBarProps {
  onSave: () => void;
  onPublish: () => void;
  saving: boolean;
  publishing: boolean;
  slug: string;
}

export default function PublishBar({
  onSave,
  onPublish,
  saving,
  publishing,
  slug,
}: PublishBarProps) {
  return (
    <div className="sticky bottom-0 z-40 flex items-center justify-between border-t border-[#ECE6DE] bg-white/90 px-6 py-3 backdrop-blur">
      {/* Save draft */}
      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="inline-flex items-center gap-2 rounded-lg border border-[#ECE6DE] bg-white px-4 py-2 text-sm font-medium text-[#1B1530] transition-colors hover:bg-[#FBF7F2] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {saving && <Loader2 className="h-4 w-4 animate-spin" />}
        Save draft
      </button>

      {/* Publish */}
      <button
        type="button"
        onClick={onPublish}
        disabled={publishing}
        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#6B4FE0] to-[#FF6B5B] px-5 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {publishing && <Loader2 className="h-4 w-4 animate-spin" />}
        Publish to {slug || "yoursite"}.velabeam.app
      </button>
    </div>
  );
}
