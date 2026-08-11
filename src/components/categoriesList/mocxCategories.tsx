"use client";
import { useTranslations } from "next-intl";
import { useParams, usePathname } from "next/navigation";
import React from "react";

/**
 * MocxCategories
 * --------------
 * Left-hand section navigation for the МОСХ ("About") pages. Rendered
 * inside `.sidebar`, it mirrors the reference design: numbered pills
 * with an arrow, the current page highlighted. Routes are unchanged.
 */
export default function MocxCategories() {
  const params = useParams();
  const pathname = usePathname();
  const locale = (params.locale as string) ?? "mn";
  const t = useTranslations("Header");

  const items = [
    { slug: "history", label: t("history") },
    { slug: "today", label: t("today") },
    { slug: "achievements", label: t("achievements") },
    { slug: "statute", label: t("statute") },
    { slug: "organization", label: t("organization") },
    { slug: "executive-council", label: t("memberEC") },
    { slug: "committees", label: t("committee") },
    { slug: "member-universities", label: t("universities") },
    { slug: "logo-and-flag", label: t("logo_flag") },
  ];

  return (
    <ul className="sidebar-nav">
      {items.map((item, i) => {
        const href = `/${locale}/${item.slug}`;
        const active = pathname?.endsWith(`/${item.slug}`);
        return (
          <li key={item.slug}>
            <a
              href={href}
              className={`sidebar-btn noajax ${active ? "active" : ""}`}
            >
              <span className="number">{i + 1}</span>
              {item.label}
              <span className="arrow">›</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
