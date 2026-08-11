"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

/**
 * BackButton — returns the reader to the page they came from.
 *
 * Detail pages carry no sidebar (the section can't be inferred reliably
 * from a post id), so this is the way back to whichever menu page linked
 * here. Falls back to the locale home when there is no history to pop —
 * e.g. the post was opened from a shared link in a fresh tab.
 */
export default function BackButton({ label = "Буцах" }: { label?: string }) {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) ?? "mn";

  const onClick = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(`/${locale}`);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="btn btn-outline btn-sm"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-2)",
        marginBottom: "var(--space-6)",
      }}
    >
      <ArrowLeft size={16} />
      {label}
    </button>
  );
}
