"use client";

import React, { useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

/**
 * PageShell
 * ---------
 * Shared page chrome for every navbar-reachable page: a solid maroon
 * header banner (title + optional subtitle) over a centred white content
 * area, plus a left sidebar chosen automatically from the current route.
 *
 * Short sections (МОСХ, Universiade education) render a flat list. Long
 * sections (Events, News) render collapsible groups — an accordion that
 * mirrors the navbar dropdown groupings, with the group containing the
 * current page expanded by default.
 */

type SectionItem = { slug: string; key: string; href?: string };
type SectionGroup = { label?: string; headingKey?: string; items: SectionItem[] };
type Section = {
  titleKey: string;
  items?: SectionItem[];
  groups?: SectionGroup[];
};

const MOSX: SectionItem[] = [
  { slug: "history", key: "history" },
  { slug: "today", key: "today" },
  { slug: "achievements", key: "achievements" },
  { slug: "statute", key: "statute" },
  { slug: "organization", key: "organization" },
  { slug: "executive-council", key: "memberEC" },
  { slug: "committees", key: "committee" },
  { slug: "member-universities", key: "universities" },
  { slug: "logo-and-flag", key: "logo_flag" },
];

const EVENTS_GROUPS: SectionGroup[] = [
  {
    headingKey: "national_results",
    items: [
      { slug: "national-universiade", key: "national_universiade" },
      { slug: "student-championships", key: "championships" },
      { slug: "regional-games", key: "regional_games" },
      { slug: "universiade-2013-results", key: "universiade_2013_result" },
    ],
  },
  {
    headingKey: "universiade_wuc_auc",
    items: [
      { slug: "summer-universiade-2013", key: "su_2013_kazan" },
      { slug: "winter-universiade-2013", key: "wu_2013_trentino" },
      { slug: "wuc-2014-results", key: "wuc_2014_results" },
      { slug: "auc-2014-results", key: "auc_2014_results" },
    ],
  },
  {
    headingKey: "sports",
    items: [
      { slug: "winter-sports", key: "winter_sport" },
      { slug: "summer-sports", key: "summer_sport" },
    ],
  },
  {
    headingKey: "calendar",
    items: [
      { slug: "national-universiade-2015-calendar", key: "nu_2015_calendar" },
      { slug: "universiade-2015-calendar", key: "wu_su_2015_calendar" },
      { slug: "auc-2015-calendar", key: "auc_2015_calendar" },
      { slug: "wuc-2014-calendar", key: "wuc_2014_calendar" },
      { slug: "national-universiade-2014-results", key: "nu_2014_results" },
    ],
  },
];

const EDUCATION: SectionItem[] = [
  { slug: "summer-universiade", key: "summerUniversiade" },
  { slug: "winter-universiade", key: "winterUniversiade" },
  { slug: "universiade-records", key: "universiadeRecords" },
  { slug: "world-university-championship", key: "worldUniversityChampionship" },
  { slug: "fisu-ausf-history", key: "fisuAndAusfHistory" },
  { slug: "fisu-conference", key: "fisuConference" },
  { slug: "announcements", key: "meetingAnnouncements" },
];

const NEWS_GROUPS: SectionGroup[] = [
  {
    label: "МОСН 2020",
    items: [
      { slug: "basketball", key: "basketball" },
      { slug: "handball", key: "handball" },
      { slug: "cheerleading", key: "cheerleading" },
      { slug: "taekwondo", key: "taekwondo" },
      { slug: "judo", key: "judo" },
      { slug: "wrestling", key: "wrestling" },
      { slug: "futsal", key: "futsal" },
      { slug: "volleyball", key: "volleyball" },
      { slug: "chess", key: "chess" },
      { slug: "table-tennis", key: "table-tennis" },
    ],
  },
  {
    headingKey: "news",
    items: [
      { slug: "news", key: "allNews", href: "all-news" },
      { slug: "magazine", key: "fisu-magazine" },
      { slug: "gallery", key: "gallery" },
      { slug: "videos", key: "video" },
      { slug: "sport-laws", key: "sport-laws" },
    ],
  },
];

const SECTIONS: Section[] = [
  { titleKey: "MOSFF", items: MOSX },
  { titleKey: "events", groups: EVENTS_GROUPS },
  { titleKey: "universiadEducation", items: EDUCATION },
  { titleKey: "news", groups: NEWS_GROUPS },
];

export default function PageShell({
  title,
  subtitle,
  compact,
  hideSidebar,
  children,
}: {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  compact?: boolean;
  /**
   * Drop the section sidebar. Detail pages (a single post) opt out: the
   * section is guessed from the URL, so /news/<id> would show the whole
   * "Мэдээллийн сан" menu regardless of which page the reader came from,
   * which is more confusing than helpful.
   */
  hideSidebar?: boolean;
  children: React.ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();
  const t = useTranslations("Header");
  const locale = (params.locale as string) ?? "mn";

  const segments = pathname?.split("/").filter(Boolean) ?? [];
  const slugs = segments.slice(1); // drop the locale segment

  // Match the section by any path segment, so a list page (/medee) and a
  // detail page (/news/<id>) both resolve to the same section + active item.
  let activeSlug: string | undefined;
  const section = SECTIONS.find((s) => {
    const items = s.items ?? s.groups?.flatMap((g) => g.items) ?? [];
    const found = items.find((it) => slugs.includes(it.slug));
    if (found) {
      activeSlug = found.slug;
      return true;
    }
    return false;
  });

  // Accordion: open the group that contains the active page by default.
  const [openGroups, setOpenGroups] = useState<number[]>(() => {
    if (!section?.groups) return [];
    const idx = section.groups.findIndex((g) =>
      g.items.some((it) => it.slug === activeSlug),
    );
    return [idx >= 0 ? idx : 0];
  });

  const toggleGroup = (gi: number) =>
    setOpenGroups((cur) =>
      cur.includes(gi) ? cur.filter((x) => x !== gi) : [...cur, gi],
    );

  const renderItem = (it: SectionItem, i: number, numbered: boolean) => (
    <li key={it.slug}>
      <a
        href={`/${locale}/${it.href ?? it.slug}`}
        className={`sidebar-btn noajax ${it.slug === activeSlug ? "active" : ""}`}
      >
        {numbered ? <span className="number">{i + 1}</span> : null}
        {t(it.key)}
        <span className="arrow">›</span>
      </a>
    </li>
  );

  return (
    <>
      <section className={`page-header ${compact ? "compact" : ""}`}>
        <div className="page-header-content">
          {title ? <h1 className="page-title">{title}</h1> : null}
          {subtitle ? <p className="page-subtitle">{subtitle}</p> : null}
        </div>
      </section>

      <div className="page-container">
        {section && !hideSidebar ? (
          <aside className="sidebar">
            <h3 className="sidebar-title">{t(section.titleKey)}</h3>

            {section.groups ? (
              section.groups.map((group, gi) => {
                const isOpen = openGroups.includes(gi);
                return (
                  <div className="sidebar-group" key={gi}>
                    <button
                      type="button"
                      className={`sidebar-group-title ${isOpen ? "open" : ""}`}
                      onClick={() => toggleGroup(gi)}
                    >
                      {group.label ?? t(group.headingKey as string)}
                      <span className="chev">›</span>
                    </button>
                    {isOpen ? (
                      <ul className="sidebar-nav sidebar-group-items">
                        {group.items.map((it, i) => renderItem(it, i, false))}
                      </ul>
                    ) : null}
                  </div>
                );
              })
            ) : (
              <ul className="sidebar-nav">
                {section.items?.map((it, i) => renderItem(it, i, true))}
              </ul>
            )}
          </aside>
        ) : null}

        <div className="content-area">{children}</div>
      </div>
    </>
  );
}
