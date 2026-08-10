"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams, usePathname } from "next/navigation";
import { useQuery } from "@apollo/client";
import { Search, User, Menu, X, ChevronDown } from "lucide-react";
import queries from "@/graphql/cms/queries";
import {
  CATEGORY,
  routeForCategory,
  KNOWN_CATEGORY_IDS,
  CLIENT_PORTAL_ID,
} from "@/graphql/cms/categories";

// Erxes CMS category ID for the headline ticker — keep in sync with the news category
const NEWS_CATEGORY_ID = CATEGORY.NEWS_ROOT;

/**
 * SiteHeader
 * ----------
 * The single modern header for the whole site. It replaces the old
 * PreHeader + MainHeader pair. Visual design follows the approved
 * reference (maroon bar, logo + brand, centred nav with dropdowns,
 * language switch and search/login actions), while preserving every
 * route from the original mega-menu so no CMS section becomes
 * unreachable. The scrolling headline strip below is still driven by
 * the CMS query (unchanged data logic).
 */
export default function SiteHeader() {
  const t = useTranslations("Header");
  const params = useParams();
  const pathname = usePathname();
  const locale = (params.locale as string) ?? "mn";

  // Mobile: whether the nav drawer is open, and which dropdown is expanded
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Build a locale-prefixed internal link
  const lk = (path: string) => `/${locale}/${path}`;

  // Keep the language toggle on the current page
  const pathSegments = pathname.split("/").filter(Boolean);
  const restOfPath = pathSegments.slice(1).join("/");
  const otherLocale = locale === "mn" ? "en" : "mn";
  const otherLabel = locale === "mn" ? "English" : "Монгол";

  // ── Navigation model ───────────────────────────────────────────
  // Each top-level entry optionally carries a flat dropdown of links.
  // Group headings (`heading: true`) are non-clickable labels used to
  // keep the long menus readable. All original routes are preserved.
  type NavLink = {
    label: string;
    href: string;
    heading?: boolean;
    children?: NavLink[];
  };
  type NavEntry = { label: string; href: string; children?: NavLink[] };

  // The curated, hardcoded navbar (kept only as fallback).
  const baseNav: NavEntry[] = [
    {
      label: t("MOSFF"),
      href: lk("history"),
      children: [
        { label: t("history"), href: lk("history") },
        { label: t("today"), href: lk("today") },
        { label: t("achievements"), href: lk("achievements") },
        { label: t("statute"), href: lk("statute") },
        { label: t("organization"), href: lk("organization") },
        { label: t("memberEC"), href: lk("executive-council") },
        { label: t("committee"), href: lk("committees") },
        { label: t("universities"), href: lk("member-universities") },
        { label: t("logo_flag"), href: lk("logo-and-flag") },
      ],
    },
    {
      label: t("events"),
      href: lk("national-universiade"),
      children: [
        {
          label: t("national_results"),
          href: "",
          children: [
            { label: t("national_universiade"), href: lk("national-universiade") },
            { label: t("championships"), href: lk("student-championships") },
            { label: t("regional_games"), href: lk("regional-games") },
            { label: t("universiade_2013_result"), href: lk("universiade-2013-results") },
          ],
        },
        {
          label: t("universiade_wuc_auc"),
          href: "",
          children: [
            { label: t("su_2013_kazan"), href: lk("summer-universiade-2013") },
            { label: t("wu_2013_trentino"), href: lk("winter-universiade-2013") },
            { label: t("wuc_2014_results"), href: lk("wuc-2014-results") },
            { label: t("auc_2014_results"), href: lk("auc-2014-results") },
          ],
        },
        {
          label: t("sports"),
          href: "",
          children: [
            { label: t("winter_sport"), href: lk("winter-sports") },
            { label: t("summer_sport"), href: lk("summer-sports") },
          ],
        },
        {
          label: t("calendar"),
          href: "",
          children: [
            { label: t("nu_2015_calendar"), href: lk("national-universiade-2015-calendar") },
            { label: t("wu_su_2015_calendar"), href: lk("universiade-2015-calendar") },
            { label: t("auc_2015_calendar"), href: lk("auc-2015-calendar") },
            { label: t("wuc_2014_calendar"), href: lk("wuc-2014-calendar") },
            { label: t("nu_2014_results"), href: lk("national-universiade-2014-results") },
          ],
        },
      ],
    },
    {
      label: t("universiadEducation"),
      href: lk("summer-universiade"),
      children: [
        { label: t("summerUniversiade"), href: lk("summer-universiade") },
        { label: t("winterUniversiade"), href: lk("winter-universiade") },
        { label: t("universiadeRecords"), href: lk("universiade-records") },
        { label: t("worldUniversityChampionship"), href: lk("world-university-championship") },
        { label: t("fisuAndAusfHistory"), href: lk("fisu-ausf-history") },
        { label: t("fisuConference"), href: lk("fisu-conference") },
        { label: t("meetingAnnouncements"), href: lk("announcements") },
      ],
    },
    {
      label: "МОСН 2024",
      href: lk("mosn-2024"),
    },
    {
      label: t("news"),
      href: lk("all-news"),
      children: [
        {
          label: "МОСН 2020",
          href: "",
          children: [
            { label: t("basketball"), href: lk("basketball") },
            { label: t("handball"), href: lk("handball") },
            { label: t("cheerleading"), href: lk("cheerleading") },
            { label: t("taekwondo"), href: lk("taekwondo") },
          ],
        },
        {
          label: t("news"),
          href: "",
          children: [
            { label: t("allNews"), href: lk("all-news") },
            { label: t("fisu-magazine"), href: lk("magazine") },
            { label: t("gallery"), href: lk("gallery") },
            { label: t("video"), href: lk("videos") },
            { label: t("sport-laws"), href: lk("sport-laws") },
          ],
        },
      ],
    },
    {
      label: t("contact"),
      href: lk("contact"),
    },
  ];

  // ── New: build header from Erxes CMS menus (falls back to baseNav) ──
  const { data: catData } = useQuery(queries.cmsCategoryList, {
    variables: { clientPortalId: CLIENT_PORTAL_ID },
  });

  // fetch menus
  const { data: menuData } = useQuery(queries.cmsMenuList);
  const menuList: any[] = menuData?.cmsMenuList ?? [];

  // helper: build nested menu tree from flat menu list
  const buildChildrenFrom = (parentId: string | null): NavEntry[] =>
    menuList
      .filter((m: any) => (m.parentId ?? null) === parentId)
      .slice()
      .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
      .map((m: any) => {
        // resolve href: external urls left as-is, otherwise locale-prefix
        const raw = (m.url || "").trim();
        const href =
          raw.length === 0
            ? "#"
            : raw.match(/^https?:\/\//)
            ? raw
            : lk(raw.replace(/^\/+/g, ""));
        return {
          label: m.label,
          href,
          children: buildChildrenFrom(m._id),
        };
      });

  // top-level header items are menus with parentId null (and kind 'header' where provided)
  const cmsTopNav: NavEntry[] = menuList.length
    ? buildChildrenFrom(null)
    : [];

  // append unknown CMS categories as extra top-level items (keeps previous behaviour)
  const newCategories: NavEntry[] = (catData?.cpCategories?.list ?? [])
    .filter((c: any) => c && !KNOWN_CATEGORY_IDS.has(c._id))
    .slice()
    .sort((a: any, b: any) => (a.name || "").localeCompare(b.name || ""))
    .map((c: any) => ({ label: c.name, href: lk(routeForCategory(c._id)) }));

  // final navigation: prefer CMS-driven top nav when available, otherwise fallback to baseNav
  const nav: NavEntry[] = cmsTopNav.length
    ? [...cmsTopNav, ...newCategories]
    : [...baseNav, ...newCategories];

  // ── Headline ticker (CMS) — newest news first ──────────────────
  const { data } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: [NEWS_CATEGORY_ID],
      sortField: "createdAt",
      sortDirection: "desc",
    },
  });
  const headlines: string[] = (data?.cpPostList?.posts ?? [])
    .slice(0, 8)
    .map((p: any) => p.title)
    .filter(Boolean);

  const toggleMenu = (label: string) =>
    setOpenMenu((cur) => (cur === label ? null : label));

  return (
    <>
      <header className="site-header">
        {/* Brand */}
        <div className="logo-section">
          <a href={`/${locale}`} className="noajax" aria-label="МОСХ home">
            <span className="logo-icon">
              <Image src="/images/logo.png" alt="МОНССФ" width={58} height={58} priority />
            </span>
          </a>
        </div>

        {/* Primary navigation */}
        <nav className={`main-nav ${mobileOpen ? "open" : ""}`}>
          {nav.map((entry) => {
            const isOpen = openMenu === entry.label;
            return (
              <div
                key={entry.label}
                className={`nav-item ${isOpen ? "open" : ""}`}
              >
                {entry.children ? (
                  <>
                    {/* On desktop this is a link; the caret toggles the
                        dropdown on mobile where hover is unavailable. */}
                    <a href={entry.href} className="noajax">
                      {entry.label}
                      <button
                        type="button"
                        className="nav-caret"
                        aria-label="Toggle submenu"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleMenu(entry.label);
                        }}
                        style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: 0, display: "inline-flex" }}
                      >
                        <ChevronDown size={14} />
                      </button>
                    </a>
                    <ul className="nav-dropdown">
                      {entry.children.map((child, i) =>
                        child.children ? (
                          <li key={`sub-${i}`} className="nav-subitem">
                            <span className="nav-submenu-toggle">
                              {child.label}
                              <ChevronDown size={14} className="nav-sub-chev" />
                            </span>
                            <ul className="nav-submenu">
                              {child.children.map((sub, j) => (
                                <li key={sub.href + j}>
                                  <a href={sub.href} className="noajax">
                                    {sub.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ) : child.heading ? (
                          <li key={`h-${i}`} className="nav-dropdown-heading">
                            {child.label}
                          </li>
                        ) : (
                          <li key={child.href + i}>
                            <a href={child.href} className="noajax">
                              {child.label}
                            </a>
                          </li>
                        )
                      )}
                    </ul>
                  </>
                ) : (
                  <a href={entry.href} className="noajax">
                    {entry.label}
                  </a>
                )}
              </div>
            );
          })}
        </nav>

        {/* Actions: language, search, login, mobile toggle */}
        <div className="header-actions">
          <a href={`/${otherLocale}/${restOfPath}`} className="lang-btn noajax">
            {otherLabel}
          </a>
          <a href={`/${locale}/search`} className="icon-btn noajax">
            <Search size={14} /> {t("search")}
          </a>
          <a href={`/${locale}/register`} className="icon-btn noajax">
            <User size={14} /> {t("login")}
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Scrolling headline strip — CMS-driven */}
      {headlines.length > 0 && (
        <div className="news-ticker">
          <div className="ticker-content">
            {[...headlines, ...headlines].map((title, i) => (
              <React.Fragment key={i}>
                <span className="ticker-item">🏆 {title}</span>
                <span className="ticker-separator">|</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
