"use client";

import { useQuery } from "@apollo/client";
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
      {children.length > 0 && (
        <ul className="cat-list" style={{ marginBottom: "2rem" }}>
          {children.map((c) => (
            <li key={c._id}>
              <a href={`/${locale}/${routeForCategory(c._id)}`} className="noajax">
                {c.name}
              </a>
            </li>
          ))}
        </ul>
      )}
    </MenuCategoryPage>
  );
}
