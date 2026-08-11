"use client";

import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { WIDGETS_LEAD_CONNECT, WIDGETS_SAVE_LEAD } from "@/graphql/forms";

const BRAND_ID = process.env.ERXES_BRAND_ID || "";
const FORM_ID = process.env.ERXES_FORM_ID || "";

type Field = {
  _id: string;
  text?: string;
  type?: string;
  description?: string;
  options?: string[] | string;
  isRequired?: boolean;
};

type Status =
  | "loading"
  | "ready"
  | "submitting"
  | "done"
  | "error";

function normalizeOptions(options?: string[] | string): string[] {
  if (!options) return [];
  if (Array.isArray(options)) return options;
  return String(options)
    .split("\n")
    .map((o) => o.trim())
    .filter(Boolean);
}

/**
 * RegistrationForm — connects to the erxes Forms (lead) widget API,
 * renders the form's fields dynamically and submits as a lead. The
 * brand/form ids come from next.config env. File fields are skipped for
 * now (erxes file upload needs a separate step).
 */
export default function RegistrationForm() {
  const [leadConnect] = useMutation(WIDGETS_LEAD_CONNECT);
  const [saveLead] = useMutation(WIDGETS_SAVE_LEAD);

  const [integrationId, setIntegrationId] = useState<string | null>(null);
  const [fields, setFields] = useState<Field[]>([]);
  const [values, setValues] = useState<Record<string, any>>({});
  const [status, setStatus] = useState<Status>("loading");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!BRAND_ID || !FORM_ID) {
      setStatus("error");
      setError(
        "Бүртгэлийн маягт тохируулагдаагүй байна (ERXES_FORM_ID / ERXES_BRAND_ID).",
      );
      return;
    }
    let active = true;
    leadConnect({ variables: { brandId: BRAND_ID, formId: FORM_ID } })
      .then((res) => {
        if (!active) return;
        const conn = res.data?.widgetsLeadConnect;
        const flds: Field[] = (conn?.form?.fields ?? []).filter(
          (f: Field) => f.type !== "file",
        );
        setIntegrationId(conn?.integration?._id ?? null);
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
  }, [leadConnect]);

  const setValue = (id: string, v: any) =>
    setValues((prev) => ({ ...prev, [id]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!integrationId) return;
    setStatus("submitting");
    setError("");
    try {
      const submissions = fields.map((f) => {
        const raw = values[f._id];
        return {
          _id: f._id,
          type: f.type,
          text: f.text,
          value: Array.isArray(raw) ? raw.join(", ") : raw ?? "",
        };
      });
      const browserInfo = {
        url: typeof window !== "undefined" ? window.location.href : "",
        language: typeof navigator !== "undefined" ? navigator.language : "",
      };
      const res = await saveLead({
        variables: {
          integrationId,
          formId: FORM_ID,
          submissions,
          browserInfo,
        },
      });
      if (res.data?.widgetsSaveLead?.status === "ok") {
        setStatus("done");
      } else {
        setStatus("error");
        setError("Хадгалахад алдаа гарлаа. Дахин оролдоно уу.");
      }
    } catch (e: any) {
      setStatus("error");
      setError(e.message);
    }
  };

  if (status === "loading") return <p>Уншиж байна...</p>;
  if (status === "done")
    return <p>Таны бүртгэл амжилттай илгээгдлээ. Баярлалаа!</p>;
  if (status === "error" && fields.length === 0)
    return <p style={{ color: "var(--color-accent)" }}>{error}</p>;

  return (
    <form className="form-card" onSubmit={onSubmit}>
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
            ) : f.type === "check" ? (
              <div>
                {opts.map((o) => {
                  const arr: string[] = Array.isArray(values[f._id])
                    ? values[f._id]
                    : [];
                  return (
                    <label
                      key={o}
                      style={{ display: "flex", gap: 8, fontWeight: 400 }}
                    >
                      <input
                        type="checkbox"
                        checked={arr.includes(o)}
                        onChange={(e) =>
                          setValue(
                            f._id,
                            e.target.checked
                              ? [...arr, o]
                              : arr.filter((x) => x !== o),
                          )
                        }
                        style={{ width: "auto" }}
                      />
                      {o}
                    </label>
                  );
                })}
              </div>
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
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Илгээж байна..." : "Илгээх"}
      </button>
    </form>
  );
}
