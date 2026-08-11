"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { FORM_CONNECT, FORM_SAVE_LEAD } from "@/graphql/forms";

/**
 * ErxesForm
 * ---------
 * Native, fully styled replacement for the erxes embed widget. It talks to
 * the same erxes Forms backend the embed used (`widgetsLeadConnect` /
 * `widgetsSaveLead`) but renders the fields itself so they match the site
 * design (.form-card / .form-field in site.css). The form definition is
 * fetched live, so editing the form in the erxes admin updates this UI.
 *
 * Pass the form CODE + channel id from the erxes embed snippet. Defaults to
 * the Contact form so existing `<ErxesForm />` usages keep working.
 *
 * File fields are supported: the file is uploaded to the erxes gateway first
 * (returning a key), then submitted as an attachment array — the same shape
 * the official widget uses.
 */
const UPLOAD_URL = "https://monssfmn.next.erxes.io/gateway/upload-file";
const READ_BASE = "https://monssfmn.next.erxes.io/gateway/read-file?key=";

type Props = {
  formCode?: string;
  channelId?: string;
};

type Field = {
  _id: string;
  text?: string;
  type?: string;
  description?: string;
  options?: string[] | string;
  isRequired?: boolean;
  order?: number;
};

function normalizeOptions(options?: string[] | string): string[] {
  if (!options) return [];
  if (Array.isArray(options)) return options;
  return String(options)
    .split("\n")
    .map((o) => o.trim())
    .filter(Boolean);
}

/**
 * Downscale + re-encode an image file to a JPEG before upload.
 *
 * The erxes SaaS stores form uploads in Cloudflare Images, which rejects very
 * large files (and formats it can't decode) with
 * "Error uploading file to Cloudflare Images". Phone photos for the passport /
 * 3x4 photo fields are routinely 4–12 MB, so without this they fail and "the
 * image doesn't come". Re-encoding to a max-1600px JPEG keeps every common
 * photo well under the limit and converts most browser-decodable formats.
 *
 * Returns `null` (caller falls back to the original file) for non-images or if
 * the browser can't decode the file (e.g. HEIC on Chrome) — in that case the
 * raw file is uploaded and any rejection surfaces as a clear error.
 */
async function compressImage(
  file: File,
): Promise<{ blob: Blob; name: string; type: string } | null> {
  if (typeof document === "undefined") return null;
  if (!file.type.startsWith("image/")) return null;
  const objUrl = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const im = new Image();
      im.onload = () => resolve(im);
      im.onerror = () => reject(new Error("decode failed"));
      im.src = objUrl;
    });
    const maxDim = 1600;
    let width = img.naturalWidth || img.width;
    let height = img.naturalHeight || img.height;
    if (!width || !height) return null;
    if (width > maxDim || height > maxDim) {
      const scale = Math.min(maxDim / width, maxDim / height);
      width = Math.round(width * scale);
      height = Math.round(height * scale);
    }
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0, width, height);
    const blob = await new Promise<Blob | null>((res) =>
      canvas.toBlob(res, "image/jpeg", 0.85),
    );
    if (!blob) return null;
    const base = file.name.replace(/\.[^.]+$/, "") || "image";
    return { blob, name: `${base}.jpg`, type: "image/jpeg" };
  } catch {
    return null;
  } finally {
    URL.revokeObjectURL(objUrl);
  }
}

type Status = "loading" | "ready" | "submitting" | "done" | "error";

export default function ErxesForm({
  formCode = "awUKzS",
  channelId = "3OymeTH7SQlGwACAHohOL",
}: Props) {
  const [connect] = useMutation(FORM_CONNECT);
  const [saveLead] = useMutation(FORM_SAVE_LEAD);

  const [formId, setFormId] = useState<string | null>(null);
  const [title, setTitle] = useState<string>("");
  const [fields, setFields] = useState<Field[]>([]);
  const [values, setValues] = useState<Record<string, any>>({});
  const [fileMeta, setFileMeta] = useState<
    Record<string, { name: string; type: string; size: number }>
  >({});
  // Local object-URL previews per file field, shown instantly on select so the
  // user always sees their image (independent of the upload/read-file round
  // trip). Revoked on replace, on reset, and on unmount.
  const [filePreview, setFilePreview] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let active = true;
    connect({ variables: { channelId, formCode } })
      .then((res) => {
        if (!active) return;
        const form = res.data?.widgetsLeadConnect?.form;
        if (!form?._id) {
          setStatus("error");
          setError("Маягтыг ачаалж чадсангүй.");
          return;
        }
        const flds: Field[] = [...(form.fields ?? [])].sort(
          (a: Field, b: Field) => (a.order ?? 0) - (b.order ?? 0),
        );
        setFormId(form._id);
        setTitle(form.title ?? "");
        setFields(flds);
        setStatus("ready");
      })
      .catch((e) => {
        if (!active) return;
        setStatus("error");
        setError(e.message);
      });
    return () => {
      active = false;
    };
  }, [connect, channelId, formCode]);

  // Revoke any outstanding object-URL previews when the component unmounts.
  useEffect(() => {
    return () => {
      setFilePreview((prev) => {
        Object.values(prev).forEach((u) => URL.revokeObjectURL(u));
        return {};
      });
    };
  }, []);

  const setValue = (id: string, v: any) =>
    setValues((prev) => ({ ...prev, [id]: v }));

  const clearPreview = (id: string) =>
    setFilePreview((p) => {
      if (p[id]) URL.revokeObjectURL(p[id]);
      const { [id]: _removed, ...rest } = p;
      return rest;
    });

  const onFile = async (id: string, file: File | undefined) => {
    clearPreview(id);
    if (!file) {
      setValue(id, undefined);
      setFileMeta((p) => {
        const { [id]: _removed, ...rest } = p;
        return rest;
      });
      return;
    }

    // Show the picked image immediately (before/independent of the upload), so
    // the user always sees a preview even if the network is slow.
    if (file.type.startsWith("image/")) {
      setFilePreview((p) => ({ ...p, [id]: URL.createObjectURL(file) }));
    }

    setUploading((p) => ({ ...p, [id]: true }));
    setError("");
    try {
      // Re-encode large/odd images to a sane JPEG first (see compressImage):
      // Cloudflare Images rejects oversized files, which is the usual reason
      // "the image doesn't come". Non-images / undecodable files pass through.
      const processed = await compressImage(file);
      const uploadBlob: Blob = processed ? processed.blob : file;
      const uploadName = processed ? processed.name : file.name;
      const uploadType = processed ? processed.type : file.type;

      const body = new FormData();
      body.append("file", uploadBlob, uploadName);
      // Match the official erxes widget: it POSTs with ?kind=main and sends
      // credentials. `credentials: "include"` carries the widget session
      // cookie set by widgetsLeadConnect.
      const res = await fetch(`${UPLOAD_URL}?kind=main&maxHeight=0&maxWidth=0`, {
        method: "POST",
        body,
        credentials: "include",
      });
      const text = (await res.text()).trim();
      // The upload endpoint returns the key on success, or an error string as
      // the body (e.g. "Error uploading file to Cloudflare Images 1"). A real
      // key is always a path like "erxes-saas/<id><filename>", so anything
      // without a "/" is an error message — don't store it as a key.
      if (!res.ok || !text || !text.includes("/")) {
        throw new Error(text || `upload failed (${res.status})`);
      }
      // Keep the raw key in `values` (used for the required check). On submit
      // it's converted to the attachment format the inbox needs (see onSubmit).
      setValue(id, text);
      setFileMeta((p) => ({
        ...p,
        [id]: { name: uploadName, type: uploadType, size: uploadBlob.size },
      }));
    } catch (err: any) {
      const msg = String(err?.message ?? "");
      setError(
        /cloudflare/i.test(msg)
          ? "Зураг хуулахад алдаа гарлаа. Өөр зураг (JPG эсвэл PNG) сонгож үзнэ үү."
          : "Файл хуулахад алдаа гарлаа. Дахин оролдоно уу.",
      );
      setValue(id, undefined);
      clearPreview(id);
    } finally {
      setUploading((p) => ({ ...p, [id]: false }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formId) return;
    setStatus("submitting");
    setError("");
    try {
      const submissions = fields.map((f) => {
        const raw = values[f._id];
        // FieldValueInput.value is a JSON scalar. For file fields the erxes
        // widget submits an ACTUAL attachment array (not a JSON-stringified
        // string) whose `url` is the RAW upload key (e.g.
        // "erxes-saas/abc123photo.jpg") — NOT the full read-file URL. The
        // backend prepends the read-file base itself when rendering. This
        // matches exactly what the official erxes formBundle.js widget sends:
        //   value: [{ url: <key>, name, size, type }]
        let value: unknown;
        if (f.type === "file") {
          const m = fileMeta[f._id];
          value = raw
            ? [
                {
                  url: raw,
                  name: m?.name ?? "file",
                  size: m?.size ?? 0,
                  type: m?.type ?? "",
                },
              ]
            : "";
        } else {
          // Multi-select (checkbox) arrays are comma-joined; else a string.
          value = Array.isArray(raw) ? raw.join(", ") : raw ?? "";
        }
        return { _id: f._id, type: f.type, text: f.text, value };
      });
      const browserInfo = {
        url: typeof window !== "undefined" ? window.location.href : "",
        language: typeof navigator !== "undefined" ? navigator.language : "",
      };
      const res = await saveLead({
        variables: { formId, submissions, browserInfo },
      });
      if (res.data?.widgetsSaveLead?.status === "ok") {
        setStatus("done");
        setValues({});
        setFileMeta({});
        setFilePreview((prev) => {
          Object.values(prev).forEach((u) => URL.revokeObjectURL(u));
          return {};
        });
      } else {
        setStatus("error");
        setError("Илгээхэд алдаа гарлаа. Дахин оролдоно уу.");
      }
    } catch (e: any) {
      setStatus("error");
      setError(e.message);
    }
  };

  if (status === "loading") return <p>Уншиж байна…</p>;
  if (status === "done")
    return (
      <div className="form-card">
        <p style={{ color: "var(--color-primary)", fontWeight: 600, margin: 0 }}>
          Таны мэдээлэл амжилттай илгээгдлээ. Баярлалаа!
        </p>
      </div>
    );
  if (status === "error" && fields.length === 0)
    return <p style={{ color: "var(--color-accent)" }}>{error}</p>;

  const anyUploading = Object.values(uploading).some(Boolean);

  return (
    <form className="form-card" onSubmit={onSubmit}>
      {title ? (
        <h3 style={{ marginTop: 0, marginBottom: "var(--space-6)" }}>{title}</h3>
      ) : null}

      {fields.map((f) => {
        const opts = normalizeOptions(f.options);
        const value = values[f._id] ?? "";
        const inputType =
          f.type === "email"
            ? "email"
            : f.type === "phone"
              ? "tel"
              : f.type === "number"
                ? "number"
                : f.type === "date"
                  ? "date"
                  : "text";

        return (
          <div className="form-field" key={f._id}>
            <label htmlFor={f._id}>
              {f.text}
              {f.isRequired ? " *" : ""}
            </label>

            {f.type === "textarea" ? (
              <textarea
                id={f._id}
                required={f.isRequired}
                rows={6}
                value={value}
                onChange={(e) => setValue(f._id, e.target.value)}
              />
            ) : f.type === "select" ? (
              <select
                id={f._id}
                required={f.isRequired}
                value={value}
                onChange={(e) => setValue(f._id, e.target.value)}
              >
                <option value="">—</option>
                {opts.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            ) : f.type === "radio" ? (
              <div>
                {opts.map((o) => (
                  <label
                    key={o}
                    style={{ display: "flex", gap: 8, fontWeight: 400 }}
                  >
                    <input
                      type="radio"
                      name={f._id}
                      checked={value === o}
                      onChange={() => setValue(f._id, o)}
                      style={{ width: "auto" }}
                    />
                    {o}
                  </label>
                ))}
              </div>
            ) : f.type === "file" ? (
              <div>
                <input
                  id={f._id}
                  type="file"
                  required={f.isRequired && !values[f._id]}
                  onChange={(e) => onFile(f._id, e.target.files?.[0])}
                />
                {/* Image preview — shown from the local object URL as soon as
                    a file is picked (instant, works regardless of upload state)
                    and falls back to the read-file URL for an already-uploaded
                    image with no local preview. */}
                {(() => {
                  const previewSrc =
                    filePreview[f._id] ??
                    ((fileMeta[f._id]?.type ?? "").startsWith("image/") &&
                    values[f._id]
                      ? `${READ_BASE}${encodeURIComponent(values[f._id])}`
                      : null);
                  return previewSrc ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={previewSrc}
                      alt={fileMeta[f._id]?.name ?? "preview"}
                      style={{
                        display: "block",
                        maxHeight: 120,
                        marginTop: "var(--space-2)",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--color-border)",
                        opacity: uploading[f._id] ? 0.6 : 1,
                      }}
                    />
                  ) : null;
                })()}

                {uploading[f._id] ? (
                  <span
                    style={{
                      display: "block",
                      marginTop: "var(--space-2)",
                      fontSize: "var(--text-sm)",
                      color: "var(--color-text-light)",
                    }}
                  >
                    Хуулж байна…
                  </span>
                ) : values[f._id] ? (
                  <a
                    href={`${READ_BASE}${encodeURIComponent(values[f._id])}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "block",
                      marginTop: "var(--space-2)",
                      fontSize: "var(--text-sm)",
                      color: "var(--color-primary)",
                    }}
                  >
                    ✓ {fileMeta[f._id]?.name ?? "Хуулагдсан"}
                  </a>
                ) : null}
              </div>
            ) : (
              <input
                id={f._id}
                type={inputType}
                required={f.isRequired}
                value={value}
                onChange={(e) => setValue(f._id, e.target.value)}
              />
            )}
          </div>
        );
      })}

      {status === "error" ? (
        <p style={{ color: "var(--color-accent)" }}>{error}</p>
      ) : null}

      <button
        type="submit"
        className="btn btn-brand btn-lg"
        disabled={status === "submitting" || anyUploading}
        style={{ marginTop: "var(--space-2)" }}
      >
        {status === "submitting" ? "Илгээж байна…" : "Илгээх"}
      </button>
    </form>
  );
}
