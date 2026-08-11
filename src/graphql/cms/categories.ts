/**
 * Erxes CMS categories — single source of truth.
 * ------------------------------------------------------------------
 * Client portal: XavxCsmdYCm0Y48tM-Vxl (monssfmn)
 *
 * Every web page / component that filters CMS posts by category MUST
 * reference an entry here instead of hard-coding the raw id, so the
 * web ⇆ SaaS wiring stays in one auditable place.
 *
 * Entries are grouped by the category tree in Erxes and each line is
 * annotated with its Mongolian name and the page(s) that consume it.
 * Verified against the live SaaS on 2026-07-01 (69 categories total).
 */

export const CATEGORY = {
  // ── Section roots (parents of the curated navbar sections) ──────
  SECTION_MOSX: "AZf8qrc9UXh3Nvc7G7-hR", //    МОСХ
  SECTION_EVENTS: "6Phz0dWbMTWw0KxJmwb3v", //  Арга хэмжээ (Events)
  SECTION_EDUCATION: "6ON6dkrc5ZWMDyPxXzcaO", // Универсиадын боловсрол

  // ── МОСХ — About the organization ───────────────────────────────
  ABOUT_STRUCTURE: "lAyZZuEgEdqdt9z5JTHOA", // Бүтэц            → /about, /organization
  STATUTE: "zAgGb_UQGFbUEAF_iHClP", //         Дүрэм            → /statute
  TODAY: "s37_GUOA5JZDXknl1u88n", //           Өнөөдөр          → /today
  ACHIEVEMENTS: "FJYELVmQlIpx0Q3IM89D8", //    Спортын амжилт   → /achievements
  LOGO_AND_FLAG: "E5Rv77rFv-VKzEfIqzj8b", //   Таних тэмдэг     → /logo-and-flag
  HISTORY: "XyZNF352VpvykBxJIte7H", //         Түүх             → /history, /about (timeline)
  EXECUTIVE_COUNCIL: "GqNabNaNW7lmdesOABVmA", // УЗ-ийн гишүүд  → /executive-council
  COMMITTEES: "87CCZ3TmzyppXzOLs8naz", //      Хороод           → /committees

  // ── Арга хэмжээ — Events & competitions ─────────────────────────
  SPORT_TYPES: "P2zIZ9rYXLrsdWtxwQw3a", //     Спортын төрлүүд  → /sport
  SUMMER_SPORTS: "ZUXnbrlGdH2l3eQ3UDv7a", //   Зуны спорт       → /summer-sports
  WINTER_SPORTS: "WRNB0Q61SMp66SMDHMMfg", //   Өвлийн спорт     → /winter-sports
  UNIVERSIADE_WUC_AUC: "Ir2gt373mPEZDkZJ-GByJ", // Универсиад WUC/AUC → /international-events
  AUC_2014_RESULTS: "kuSSBF06WTIZfqfX4lq2b", // AUC-2014 үр дүн → /auc-2014-results
  WUC_2014_RESULTS: "iuiOHH8Vk8dUx0K9GcWtq", // WUC-2014 үр дүн → /wuc-2014-results
  SUMMER_UNIVERSIADE_2013_KAZAN: "Dko2cX_KsL_1Ob2GcAyAo", // Зуны универсиад 2013 Казань → /summer-universiade-2013
  WINTER_UNIVERSIADE_2013_TRENTINO: "yzW4gBKxaMgUQ_zGrmd2z", // Өвлийн универсиад 2013 Трентино → /winter-universiade-2013
  NATIONAL_GAMES: "kU8Hty9eeO1FRVCxh5a9k", //  Үндэсний наадам, тэмцээний дүн → /domestic-events
  CHAMPIONSHIPS: "nT1sUcmY-3cU3KX5EGU-A", //   Аварга шалгаруулалт → /student-championships
  REGIONAL_GAMES: "7yhQzBo0Iyr9OHr9V6XY7", //  Бүсийн наадам    → /regional-games
  UNIVERSIADE_2013_RESULTS: "PklZgGcQpN27_oXv22lrZ", // Универсиад 2013 үр дүн → /universiade-2013-results
  NATIONAL_UNIVERSIADE: "YS5ACVsrTfqtnPAyrwv44", // Үндэсний универсиад → /national-universiade
  NATIONAL_UNIVERSIADE_2014_RESULTS: "ytF_ggqTJMx6-sfV7TDOL", // Үндэсний универсиад 2014 дүн → /national-universiade-2014-results
  SCHEDULE: "Rj34KOEOHv13OntajdKmx", //        Хуваарь          → /schedule
  AUC_2015_CALENDAR: "SVTMIvdFvhM5G1XOjV4Lw", // AUC-2015 хуваарь → /auc-2015-calendar
  WUC_2014_CALENDAR: "aGizAeD7V5NyaT_i60hjK", // WUC-2014 хуваарь → /wuc-2014-calendar
  UNIVERSIADE_2015_CALENDAR: "aMAElCcvhpEnoZi3chNB9", // Өвөл-зуны универсиад 2015 хуваарь → /universiade-2015-calendar
  NATIONAL_UNIVERSIADE_2015_CALENDAR: "jMnbfN_2aV0v2CiidvoTh", // Үндэсний универсиад 2015 хуваарь → /national-universiade-2015-calendar

  // ── Универсиадын боловсрол — Universiade education ──────────────
  WORLD_UNIVERSITY_CHAMPIONSHIP: "SLBij1DyWKPxmeXoB8vSN", // ДОАШТ → /world-university-championship
  SUMMER_UNIVERSIADE_HISTORY: "AMOmakKBQexU11HcywQr6", // Зуны универсиадын түүх → /summer-universiade
  WINTER_UNIVERSIADE_HISTORY: "vood2CvMVhnqMqSVy--lf", // Өвлийн универсиадын түүх → /winter-universiade
  UNIVERSIADE_RECORDS: "QYTe7MWXzlD9y3Ri32aAU", // Универсиадын амжилтууд → /universiade-records
  // NOTE: the two duplicate "ОУОСХ, АОСХ-ны түүх" categories were merged
  // on 2026-07-01 — byNK… was deleted and its post moved into gtslaw…, so
  // both keys below now alias the single surviving category.
  FISU_CONFERENCE: "gtslawYu3wI9Op9DtDP83", //  → /fisu-ausf-history (merged)
  FISU_AUSF_HISTORY: "gtslawYu3wI9Op9DtDP83", // ОУОСХ, АОСХ-ны түүх → /fisu-ausf-history
  ANNOUNCEMENTS: "hO5VgmLWheZKC7nKMAimC", //   Хурлын зар       → /announcements

  // ── Мэдээллийн сан — News & media ───────────────────────────────
  NEWS_ROOT: "Y2gBhDY0k7qZIQowqginN", //       Мэдээллийн сан (parent; same 25 posts as NEWS) → homepage/news feed
  NEWS: "QsV5U10thi7BTbmzy4FID", //            Мэдээ            → (news subcategory)
  VIDEOS: "0w77szMTBiUVCMO-BFt5r", //          Бичлэг           → /videos
  GALLERY: "QIkZXatRueJ2xAHfvNUMn", //         Зургийн цомог    → /gallery
  MAGAZINE: "od7auLjpg5MXFmosYthjk", //        ОУОСХ сэтгүүл    → /magazine
  SPORT_LAWS: "TaqFVbq93hRwYAeh6QWra", //      Спортын хууль, эрх зүй → /sport-laws

  // ── Спортын төрлүүд — Individual sports ─────────────────────────
  WRESTLING: "OuFAmPVJfMTyp3rh0iOYd", //       Бөх              → /wrestling
  VOLLEYBALL: "aNXkN71LhYLafSDiOkP8u", //      Волейбол         → /volleyball
  HANDBALL: "NnBRZ2zaQ5ULfVcjCgtWq", //        Гар бөмбөг       → /handball
  BASKETBALL: "3y178lpJM9XG85ETh4F8J", //      Сагсан бөмбөг    → /basketball
  JUDO: "tqwE3QglvRHNtC9YTQRnS", //            Жүдо бөх         → /judo
  TAEKWONDO: "qbXBMGxKTMrz_V8kzKmtr", //       Таеквондо        → /taekwondo
  CHESS: "JYRDJEe2IwHo8oZcmv9ub", //           Шатар            → /chess
  TABLE_TENNIS: "rTrNmuH592ZCKEg_Q_5s3", //    Ширээний теннис  → /table-tennis
  FOOTBALL: "YXt1AtAE5w_MVd98PH6nr", //        Хөлбөмбөг        → /futsal
  CHEERLEADING: "BJ0oTCn662-lpQNnB28Jk", //    Чирлидинг        → /cheerleading

  // ── Site / homepage / misc ──────────────────────────────────────
  MEMBER_UNIVERSITIES: "IiRo9ygRbsGukh4sVkMnc", // Гишүүн сургууль → /member-universities
  CONTACT: "-aFqXP7a1yLhkIzLBfSAE", //         Холбоо барих     → /contact
  MOSN_2024: "btUgLXKrvbqvkoPBv35ll", //       МОСН 2024        → /mosn-2024
  MOSN_2020: "9pEd46LpVpAICfVB5Ws3n", //       МОСН 2020 (sports group parent, created 2026-07-01) → generic /category
  STATS: "traMDrN7HLpo5aTDXFOnd", //           Статистик        → StatsBar
  HOME_TITLE: "k_s8mapD2i1vzyw34RIq6", //      Гарчиг           → HeroSection
  HOME_EVENTS: "v_591LkOAsDBnqqaPi1sJ", //     Нүүр - Арга хэмжээ → SportEvent
  HOME_VIDEOS: "dqNv-FmhDK415HMvH1Ot5", //     Нүүр - Бичлэг    → OutterWrapper (video highlights)
  HOME_SECTION: "cHox0CXIEs_Bg_EF3XUTM", //    Нүүр хуудас (parent grouping the homepage-widget feeds above)
  HOME_PARTNERS: "7fMzFyxXiFIFfcE_tQdDH",
} as const;

export type CategoryKey = keyof typeof CATEGORY;

/** Erxes client portal that owns these categories. */
export const CLIENT_PORTAL_ID = "XavxCsmdYCm0Y48tM-Vxl";

/**
 * Dedicated page routes for known categories. When a category id is in
 * this map the nav/sidebar links to its purpose-built page; any other
 * category (e.g. a brand-new one added in the CMS) falls back to the
 * generic /category/[id] route, so it works with zero code changes.
 * Keyed by CATEGORY key → route slug (relative to /[locale]).
 */
const ROUTE_BY_KEY: Partial<Record<CategoryKey, string>> = {
  ABOUT_STRUCTURE: "organization",
  STATUTE: "statute",
  TODAY: "today",
  ACHIEVEMENTS: "achievements",
  LOGO_AND_FLAG: "logo-and-flag",
  HISTORY: "history",
  EXECUTIVE_COUNCIL: "executive-council",
  COMMITTEES: "committees",
  SPORT_TYPES: "sport",
  SUMMER_SPORTS: "summer-sports",
  WINTER_SPORTS: "winter-sports",
  UNIVERSIADE_WUC_AUC: "international-events",
  AUC_2014_RESULTS: "auc-2014-results",
  WUC_2014_RESULTS: "wuc-2014-results",
  SUMMER_UNIVERSIADE_2013_KAZAN: "summer-universiade-2013",
  WINTER_UNIVERSIADE_2013_TRENTINO: "winter-universiade-2013",
  NATIONAL_GAMES: "domestic-events",
  CHAMPIONSHIPS: "student-championships",
  REGIONAL_GAMES: "regional-games",
  UNIVERSIADE_2013_RESULTS: "universiade-2013-results",
  NATIONAL_UNIVERSIADE: "national-universiade",
  NATIONAL_UNIVERSIADE_2014_RESULTS: "national-universiade-2014-results",
  SCHEDULE: "schedule",
  AUC_2015_CALENDAR: "auc-2015-calendar",
  WUC_2014_CALENDAR: "wuc-2014-calendar",
  UNIVERSIADE_2015_CALENDAR: "universiade-2015-calendar",
  NATIONAL_UNIVERSIADE_2015_CALENDAR: "national-universiade-2015-calendar",
  WORLD_UNIVERSITY_CHAMPIONSHIP: "world-university-championship",
  SUMMER_UNIVERSIADE_HISTORY: "summer-universiade",
  WINTER_UNIVERSIADE_HISTORY: "winter-universiade",
  UNIVERSIADE_RECORDS: "universiade-records",
  // FISU_CONFERENCE intentionally omitted — merged into FISU_AUSF_HISTORY
  // (same category id), which owns the /fisu-ausf-history route.
  FISU_AUSF_HISTORY: "fisu-ausf-history",
  ANNOUNCEMENTS: "announcements",
  NEWS_ROOT: "all-news",
  VIDEOS: "videos",
  GALLERY: "gallery",
  MAGAZINE: "magazine",
  SPORT_LAWS: "sport-laws",
  WRESTLING: "wrestling",
  VOLLEYBALL: "volleyball",
  HANDBALL: "handball",
  BASKETBALL: "basketball",
  JUDO: "judo",
  TAEKWONDO: "taekwondo",
  CHESS: "chess",
  TABLE_TENNIS: "table-tennis",
  FOOTBALL: "futsal",
  CHEERLEADING: "cheerleading",
  MEMBER_UNIVERSITIES: "member-universities",
  CONTACT: "contact",
  MOSN_2024: "mosn-2024",
};

/** category id → dedicated route slug (derived from ROUTE_BY_KEY). */
export const DEDICATED_ROUTE_BY_ID: Record<string, string> = Object.fromEntries(
  Object.entries(ROUTE_BY_KEY).map(([key, slug]) => [
    CATEGORY[key as CategoryKey],
    slug as string,
  ]),
);

/**
 * Resolve the href (relative to /[locale]) for a category. Known
 * categories use their dedicated page; everything else uses the generic
 * category route so new CMS categories are reachable with no code change.
 */
export function routeForCategory(id: string): string {
  return DEDICATED_ROUTE_BY_ID[id] ?? `category/${id}`;
}

/**
 * Categories that exist in the SaaS but are NOT wired to any page — kept
 * here so the navbar doesn't treat them as "brand new". These are empty
 * placeholders the site owner may fill with content later (per request,
 * NOT deleted). The empty duplicates + "test" junk were removed from the
 * CMS on 2026-07-01.
 */
export const UNUSED_CATEGORIES = {
  HOME_NEWS: "ByIAXhdzn6ZvMKN31fdkr", //       Нүүр - Мэдээ (empty placeholder)
  HOMEPAGE_TEST: "oN6T4NXIrEkLzCkdud80W", //   Нүүр хуудас (тест)
  FISU_CONFERENCE_EMPTY: "n1TvfW8TmZcEeur7fh7mx", //   ОУОСХ-ны хурал (empty placeholder)
  INFO_1: "MYevCc0OxsdRy1VhCLlaV", //          Мэдээлэл 1 (empty placeholder)
  INFO_2: "FASRkrNpTbxlcuLM_Fa8F", //          Мэдээлэл 2 (empty placeholder)
  INFO_3: "5zSaRx_ghlFFttgUC0IsH", //          Мэдээлэл 3 (empty placeholder)
  INFO_4: "OgAEqQMCh07MG8Ud0VE96", //          Мэдээлэл 4 (empty placeholder)
} as const;

/**
 * Every category id this codebase already knows about — the curated
 * catalog plus the unused/junk list. The navbar treats any CMS category
 * NOT in this set as "brand new" and appends a button for it, so newly
 * created categories surface automatically without a code change.
 */
export const KNOWN_CATEGORY_IDS = new Set<string>([
  ...Object.values(CATEGORY),
  ...Object.values(UNUSED_CATEGORIES),
]);

export default CATEGORY;
