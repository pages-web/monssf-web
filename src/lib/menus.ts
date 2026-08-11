/**
 * Erxes CMS menus — shared shaping helpers.
 * ------------------------------------------------------------------
 * The navigation is driven entirely by the "Menus" section of the
 * erxes CMS (Content → Menus). Nothing here is hardcoded: labels,
 * ordering and nesting all come from the CMS.
 *
 * IMPORTANT — which query to use:
 *   `cpMenus`      → public, works with the app token. Use this.
 *   `cmsMenuList`  → admin-only, answers "Login required" for the
 *                    website. Do NOT use it from the front end.
 *
 * The `url` an editor types in erxes is treated as the source of
 * truth. See `menuHref` for the (forgiving) normalisation rules.
 */

/** A single row as returned by the public `cpMenus` query. */
export type CmsMenu = {
  _id: string;
  label: string;
  url?: string | null;
  target?: string | null;
  kind?: string | null;
  parentId?: string | null;
  order?: number | null;
  /**
   * Set when an editor picks a LINK TYPE of Category/Post in erxes. This
   * is what tells a menu page which category's posts to list; it is null
   * until someone fills it in, so the page falls back to slug/name.
   */
  contentType?: string | null;
  contentTypeId?: string | null;
};

/** A menu shaped into a render-ready tree node. */
export type MenuNode = {
  id: string;
  label: string;
  href: string;
  target?: string;
  children: MenuNode[];
};

const EXTERNAL = /^(https?:\/\/|mailto:|tel:|#)/i;
const LEADING_LOCALE = /^(mn|en)(?=\/|$)/;

/**
 * Turn a CMS `url` into a link the site can actually navigate to.
 *
 * Editors may type any of these and all resolve to the same place —
 * the locale is always re-applied from the current request, so the
 * language switch keeps working no matter which form was used:
 *
 *   "statute"      → /mn/statute
 *   "/statute"     → /mn/statute
 *   "/mn/statute"  → /mn/statute   (and /en/statute when locale=en)
 *
 * Absolute URLs, mailto:, tel: and bare "#" are passed through as-is.
 */
export function menuHref(locale: string, url?: string | null): string {
  const raw = (url ?? "").trim();
  if (!raw) return "#";
  if (EXTERNAL.test(raw)) return raw;

  // Drop leading slashes, then a leading locale segment if the editor
  // already included one, so we never end up with /mn/mn/... .
  const path = raw.replace(/^\/+/, "").replace(LEADING_LOCALE, "").replace(/^\/+/, "");
  return path ? `/${locale}/${path}` : `/${locale}`;
}

/**
 * Build the nested menu tree from the flat `cpMenus` list.
 *
 * Menus whose `parentId` points at a row the API did not return are
 * promoted to the top level rather than dropped — otherwise a broken
 * parent link would silently hide a whole branch of the navigation.
 */
export function buildMenuTree(menus: CmsMenu[], locale: string): MenuNode[] {
  const present = new Set(menus.map((m) => m._id));
  const sorted = [...menus].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const childrenOf = new Map<string, CmsMenu[]>();
  const roots: CmsMenu[] = [];

  for (const menu of sorted) {
    const parentId = menu.parentId ?? null;
    if (parentId && present.has(parentId)) {
      const siblings = childrenOf.get(parentId) ?? [];
      siblings.push(menu);
      childrenOf.set(parentId, siblings);
    } else {
      roots.push(menu);
    }
  }

  // `seen` guards against a parentId cycle in the CMS data, which would
  // otherwise recurse until the stack blows.
  const toNode = (menu: CmsMenu, seen: Set<string>): MenuNode => ({
    id: menu._id,
    label: menu.label,
    href: menuHref(locale, menu.url),
    target: menu.target || undefined,
    children: seen.has(menu._id)
      ? []
      : (childrenOf.get(menu._id) ?? []).map((child) =>
          toNode(child, new Set(seen).add(menu._id))
        ),
  });

  return roots.map((menu) => toNode(menu, new Set()));
}

/**
 * The single path segment a menu lives at, with locale and slashes
 * stripped — "/mn/buetec", "/buetec" and "buetec" all give "buetec".
 * This is what the `[slug]` route matches against.
 */
export function menuSlug(url?: string | null): string {
  const raw = (url ?? "").trim();
  if (!raw || EXTERNAL.test(raw)) return "";
  return raw
    .replace(/^\/+/, "")
    .replace(LEADING_LOCALE, "")
    .replace(/^\/+/, "")
    .replace(/\/+$/, "");
}

/** Find the menu that owns a given URL segment. */
export function findMenuBySlug(
  menus: CmsMenu[],
  slug: string
): CmsMenu | undefined {
  return menus.find((m) => menuSlug(m.url) === slug);
}

/**
 * The sidebar shown next to a menu page, or null when the menu does not
 * belong to a group.
 *
 * Only menus that live in a "dropdown family" get one, which mirrors the
 * navbar: a parent shows its own children, a child shows its siblings
 * under the parent's name. A standalone menu (no parent, no children —
 * e.g. Мэдээ, Видео) gets no sidebar and the content runs full width.
 *
 * Because both the title and the items come straight from `cpMenus`,
 * adding a menu in erxes grows the sidebar with no code change.
 */
export function sidebarFor(
  menus: CmsMenu[],
  menu: CmsMenu,
  locale: string
): { title: string; items: MenuNode[] } | null {
  const present = new Set(menus.map((m) => m._id));
  const childrenOf = (id: string) =>
    menus
      .filter((m) => m.parentId === id)
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  const own = childrenOf(menu._id);
  if (own.length > 0) {
    return { title: menu.label, items: own.map((m) => toFlatNode(m, locale)) };
  }

  const parentId = menu.parentId ?? null;
  if (parentId && present.has(parentId)) {
    const parent = menus.find((m) => m._id === parentId)!;
    const siblings = childrenOf(parentId);
    if (siblings.length > 0) {
      return {
        title: parent.label,
        items: siblings.map((m) => toFlatNode(m, locale)),
      };
    }
  }

  return null;
}

/** The subset of a CMS category this module needs. */
export type CmsCategoryRef = {
  _id: string;
  name?: string | null;
  slug?: string | null;
};

/**
 * Which category's posts belong to a menu.
 *
 * `contentTypeId` would be the direct answer, but the public `cpMenus`
 * query returns it as null even for menus whose LINK TYPE is Category —
 * erxes only encodes the choice in the url (`/category/<slug>`). So the
 * slug is the reliable signal; the name match is a last resort for menus
 * that were never linked to anything.
 */
export function resolveCategoryId(
  menu: CmsMenu | undefined,
  categories: CmsCategoryRef[]
): string | undefined {
  if (!menu) return undefined;
  if (menu.contentTypeId) return menu.contentTypeId;

  // "/category/tuukh" → "tuukh"; a plain menu slug is used as-is.
  const slug = menuSlug(menu.url).replace(/^category\//, "");
  const bySlug = categories.find((c) => c.slug && c.slug === slug);
  if (bySlug) return bySlug._id;

  const byId = categories.find((c) => c._id === slug);
  if (byId) return byId._id;

  return categories.find((c) => c.name === menu.label)?._id;
}

/** A sidebar row — flat, so no nested dropdowns leak into the aside. */
function toFlatNode(menu: CmsMenu, locale: string): MenuNode {
  return {
    id: menu._id,
    label: menu.label,
    href: menuHref(locale, menu.url),
    target: menu.target || undefined,
    children: [],
  };
}
