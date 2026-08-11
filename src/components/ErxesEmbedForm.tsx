"use client";

import { useEffect } from "react";

/**
 * ErxesEmbedForm
 * --------------
 * Mounts the OFFICIAL erxes form widget (`formBundle.js`) instead of rendering
 * the fields ourselves. This is what the erxes "Installation Guide" snippet
 * does, and it's the reliable way to handle file uploads: the official widget
 * submits files in exactly the shape the erxes inbox/CMS expects, so the
 * uploaded image actually renders there (our hand-rolled submission format
 * tripped the inbox's `n.split` / showed no image).
 *
 * How the bundle works (from reading formBundle.js):
 *   - it reads `window.erxesSettings.forms` at script-eval time;
 *   - a MutationObserver watches <body> and injects an <iframe> into the
 *     `[data-erxes-embed="<form_id>"]` element when it appears;
 *   - it caches each initialised form inside its closure, so after a client
 *     side navigation away-and-back the cached entry leaves the freshly mounted
 *     div empty.
 *
 * To stay correct across Next.js client navigation we set `erxesSettings` and
 * then RE-INJECT the bundle on every mount — a new closure has an empty cache
 * and re-renders into the current div. We remove our previously injected tag
 * first so they don't pile up.
 */
type Props = {
  formId: string;
  channelId: string;
  /** Widget bundle URL (override only for a different erxes instance). */
  bundleUrl?: string;
  /** Reserve vertical space so layout doesn't jump while the iframe loads. */
  minHeight?: number;
};

const DEFAULT_BUNDLE = "https://monssfmn.nextwidgets.erxes.io/formBundle.js";

export default function ErxesEmbedForm({
  formId,
  channelId,
  bundleUrl = DEFAULT_BUNDLE,
  minHeight = 480,
}: Props) {
  useEffect(() => {
    (window as any).erxesSettings = {
      forms: [{ form_id: formId, channel_id: channelId }],
    };

    // Remove any bundle we injected on a previous mount, then add a fresh one
    // (dynamically inserted scripts always re-execute, giving a clean closure).
    document
      .querySelectorAll("script[data-erxes-form-bundle]")
      .forEach((s) => s.remove());

    const script = document.createElement("script");
    script.src = bundleUrl;
    script.async = true;
    script.setAttribute("data-erxes-form-bundle", formId);
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [formId, channelId, bundleUrl]);

  return <div data-erxes-embed={formId} style={{ minHeight }} />;
}
