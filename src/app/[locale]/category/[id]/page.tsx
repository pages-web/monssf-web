"use client";

import { useQuery } from "@apollo/client";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { queries } from "@/graphql/cms";
import { routeForCategory, CLIENT_PORTAL_ID } from "@/graphql/cms/categories";
import MenuCategoryPage from "@/components/MenuCategoryPage";
import { findMenuBySlug, type CmsMenu } from "@/lib/menus";

/**
 * Category landing — works for ANY CMS category, including ones added
 * after this code shipped.
 *
 * This is where menus with a LINK TYPE of Category land: erxes writes
 * their url as `/category/<category-slug>`, so `id` here is usually a
 * SLUG rather than an `_id` (older links still pass the raw id, and both
 * are accepted). It renders through MenuCategoryPage so a category menu
 * looks exactly like every other menu page — same banner, same card grid,
 * same CMS-driven sidebar.
 */
export default function CategoryPage({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const { locale, id } = params;
  const t = useTranslations("Home");

  const { data: menuData } = useQuery(queries.cpMenus, {
    variables: { kind: "header", language: locale },
  });
  const menus: CmsMenu[] = menuData?.cpMenus ?? [];
  // The menu that points here, so the page can use its label and sidebar.
  const menu = findMenuBySlug(menus, `category/${id}`);

  const { data: catData } = useQuery(queries.cmsCategoryList, {
    variables: { clientPortalId: CLIENT_PORTAL_ID },
  });
  const cats: any[] = catData?.cpCategories?.list ?? [];

  const category =
    cats.find((c) => c._id === id) ?? cats.find((c) => c.slug === id);
  const categoryId = category?._id;

  const children = cats
    .filter((c) => c.parentId === categoryId)
    .sort((a, b) => (a.name || "").localeCompare(b.name || ""));

  return (
    <MenuCategoryPage
      locale={locale}
      // Prefer the menu's own wording ("МОСХ-ын түүх") over the bare
      // category name ("Түүх") so the page matches the link that led here.
      title={menu?.label ?? category?.name ?? ""}
      menus={menus}
      menu={menu}
      categoryId={categoryId}
    >
      {/* Sub-categories, as the same cards the posts below use — a parent
          menu's children were a bare bullet list before, which read as
          leftover markup next to the card grid. Destinations are unchanged. */}
      {children.length > 0 && (
        <div className="grid-3" style={{ marginBottom: "var(--space-10)" }}>
          {children.map((c) => (
            <a
              key={c._id}
              href={`/${locale}/${routeForCategory(c._id)}`}
              className="noajax"
            >
              <article className="card">
                <div className="card-content">
                  <h3 className="card-title line-clamp-2">{c.name}</h3>
                  {c.description && (
                    <p className="card-text line-clamp-2">{c.description}</p>
                  )}
                  <span className="card-link">
                    {t("readMore")} <ArrowRight size={16} />
                  </span>
                </div>
              </article>
            </a>
          ))}
        </div>
      )}
    </MenuCategoryPage>
  );
}
