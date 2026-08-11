"use client";

import { useQuery } from "@apollo/client";
import { notFound, redirect } from "next/navigation";
import queries from "@/graphql/cms/queries";
import {
  CLIENT_PORTAL_ID,
  DEDICATED_ROUTE_BY_ID,
} from "@/graphql/cms/categories";
import MenuCategoryPage from "@/components/MenuCategoryPage";
import { findMenuBySlug, resolveCategoryId, type CmsMenu } from "@/lib/menus";

/**
 * Routes whose page does more than list posts, so a menu pointing at their
 * category should go there instead of rendering the generic layout.
 * `contact` embeds the map and the erxes enquiry form.
 */
const BESPOKE_ROUTES = new Set(["contact"]);

/**
 * Menu page — the automatic page behind every erxes CMS menu.
 * ------------------------------------------------------------------
 * Adding a menu in Content → Menus is all it takes: this route picks it
 * up by its URL slug and renders the page. No code change, no new folder.
 *
 * Menus whose LINK TYPE is Category get a /category/<slug> URL instead and
 * are served by app/[locale]/category/[id] — same layout, see
 * MenuCategoryPage.
 *
 * Next.js matches static routes before dynamic ones, so the hand-built
 * pages (/history, /statute, …) keep winning over this catch-all. Only
 * slugs with no folder of their own land here.
 */
export default function MenuPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const { locale, slug } = params;

  const { data: menuData, loading: menusLoading } = useQuery(queries.cpMenus, {
    variables: { kind: "header", language: locale },
  });
  const menus: CmsMenu[] = menuData?.cpMenus ?? [];
  const menu = findMenuBySlug(menus, slug);

  const { data: catData } = useQuery(queries.cmsCategoryList, {
    variables: { clientPortalId: CLIENT_PORTAL_ID },
  });
  const categories: any[] = catData?.cpCategories?.list ?? [];

  const categoryId = resolveCategoryId(menu, categories);

  // Only 404 once the menus are actually in — otherwise the first render
  // (empty cache) would throw a not-found at every visitor.
  if (!menusLoading && menus.length > 0 && !menu) notFound();

  // A few pages carry chrome this generic one cannot reproduce — Холбоо
  // барих has the map and the enquiry form. When a menu resolves to one of
  // those categories, hand over to the purpose-built page.
  //
  // Deliberately NOT every route in DEDICATED_ROUTE_BY_ID: most of those
  // pages are just a post list, and redirecting to them would throw away
  // the menu's own title and its CMS-driven sidebar. Add a route here only
  // when its page really does more than list posts.
  const dedicated = categoryId ? DEDICATED_ROUTE_BY_ID[categoryId] : undefined;
  if (dedicated && dedicated !== slug && BESPOKE_ROUTES.has(dedicated)) {
    redirect(`/${locale}/${dedicated}`);
  }

  return (
    <MenuCategoryPage
      locale={locale}
      title={menu?.label ?? ""}
      menus={menus}
      menu={menu}
      categoryId={categoryId}
    />
  );
}
