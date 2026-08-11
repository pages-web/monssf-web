"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams, usePathname } from "next/navigation";
import { useQuery } from "@apollo/client";
import { Search, User, Menu, X, ChevronDown } from "lucide-react";
import queries from "@/graphql/cms/queries";
import { CATEGORY } from "@/graphql/cms/categories";
import { buildMenuTree, type MenuNode } from "@/lib/menus";

// Erxes CMS category ID for the headline ticker — keep in sync with the news category
const NEWS_CATEGORY_ID = CATEGORY.NEWS_ROOT;

/**
 * SiteHeader
 * ----------
 * The single modern header for the whole site. It replaces the old
 * PreHeader + MainHeader pair. Visual design follows the approved
 * reference (maroon bar, logo + brand, centred nav with dropdowns,
 * language switch and search/login actions).
 *
 * The navigation itself is 100% CMS driven — see the `cpMenus` query
 * below. The scrolling headline strip is likewise CMS driven.
 */
export default function SiteHeader() {
  const t = useTranslations("Header");
  const params = useParams();
  const pathname = usePathname();
  const locale = (params.locale as string) ?? "mn";

  // Mobile: whether the nav drawer is open, and which dropdown is expanded
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  // Keep the language toggle on the current page
  const pathSegments = pathname.split("/").filter(Boolean);
  const restOfPath = pathSegments.slice(1).join("/");
  const otherLocale = locale === "mn" ? "en" : "mn";
  const otherLabel = locale === "mn" ? "English" : "Монгол";

  // ── Navigation — driven entirely by the erxes CMS ───────────────
  // Labels, ordering and nesting all come from Content → Menus in the
  // erxes admin. There is deliberately no hardcoded fallback: to change
  // the navbar, edit the CMS. The `url` typed there is the source of
  // truth for where each item points (see `menuHref` for how it is
  // normalised), so keep those pointing at real routes.
  //
  // The markup below renders three levels; anything nested deeper in
  // the CMS is reachable but will not get its own flyout.
  const { data: menuData } = useQuery(queries.cpMenus, {
    variables: { kind: "header", language: locale },
  });

  const nav: MenuNode[] = buildMenuTree(menuData?.cpMenus ?? [], locale);

  // External links open in a new tab; keep the rel hardening with it.
  const linkProps = (node: MenuNode) =>
    node.target === "_blank"
      ? { target: "_blank", rel: "noopener noreferrer" }
      : {};

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

  const toggleMenu = (id: string) =>
    setOpenMenu((cur) => (cur === id ? null : id));

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
            const isOpen = openMenu === entry.id;
            return (
              <div
                key={entry.id}
                className={`nav-item ${isOpen ? "open" : ""}`}
              >
                {entry.children.length > 0 ? (
                  <>
                    {/* On desktop this is a link; the caret toggles the
                        dropdown on mobile where hover is unavailable. */}
                    <a href={entry.href} className="noajax" {...linkProps(entry)}>
                      {entry.label}
                      <button
                        type="button"
                        className="nav-caret"
                        aria-label="Toggle submenu"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleMenu(entry.id);
                        }}
                        style={{ background: "none", border: "none", color: "inherit", cursor: "pointer", padding: 0, display: "inline-flex" }}
                      >
                        <ChevronDown size={14} />
                      </button>
                    </a>
                    <ul className="nav-dropdown">
                      {entry.children.map((child) =>
                        child.children.length > 0 ? (
                          <li key={child.id} className="nav-subitem">
                            <span className="nav-submenu-toggle">
                              {child.label}
                              <ChevronDown size={14} className="nav-sub-chev" />
                            </span>
                            <ul className="nav-submenu">
                              {child.children.map((sub) => (
                                <li key={sub.id}>
                                  <a href={sub.href} className="noajax" {...linkProps(sub)}>
                                    {sub.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ) : (
                          <li key={child.id}>
                            <a href={child.href} className="noajax" {...linkProps(child)}>
                              {child.label}
                            </a>
                          </li>
                        )
                      )}
                    </ul>
                  </>
                ) : (
                  <a href={entry.href} className="noajax" {...linkProps(entry)}>
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
