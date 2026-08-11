"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import queries from "@/graphql/cms/queries";
import PostCards from "@/components/content/PostCards";
import { sidebarFor, type CmsMenu } from "@/lib/menus";

/**
 * MenuCategoryPage — the shared layout behind every CMS menu page.
 * ------------------------------------------------------------------
 * A banner carrying the menu's own label, the linked category's posts as
 * a card grid, and the section sidebar (numbered pills) on the right.
 *
 * Two routes render it, because erxes writes two different URL shapes
 * depending on the menu's LINK TYPE:
 *   • a plain slug  → /[locale]/[slug]
 *   • LINK TYPE Category → /category/<category-slug> → /[locale]/category/[id]
 * Both end up here so the two look identical.
 *
 * Callers resolve the menu and the category; this component owns the post
 * query and the markup.
 */
export default function MenuCategoryPage({
  locale,
  title,
  menus,
  menu,
  categoryId,
  children,
}: {
  locale: string;
  title: string;
  menus: CmsMenu[];
  /** The menu this page belongs to — drives the sidebar and its active row. */
  menu?: CmsMenu;
  /** Category whose posts to list; undefined when the menu links nowhere. */
  categoryId?: string;
  /** Optional extra content rendered above the cards (e.g. sub-categories). */
  children?: React.ReactNode;
}) {
  const { data, loading } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: [categoryId],
      sortField: "createdAt",
      sortDirection: "desc",
    },
    skip: !categoryId,
  });

  // The API returns posts of child categories too; keep this page to its own.
  const posts =
    data?.cpPostList?.posts?.filter((p: any) =>
      p?.categoryIds?.includes(categoryId),
    ) ?? [];

  const sidebar = menu ? sidebarFor(menus, menu, locale) : null;

  return (
    <>
      <section className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">{title}</h1>
        </div>
      </section>

      <div className="page-container">
        {/* Sidebar first, content second: `.page-container` is a flex row,
            so DOM order puts the aside on the left — matching PageShell and
            every hand-built section page. */}
        {sidebar && (
          <aside className="sidebar">
            <h3 className="sidebar-title">{sidebar.title}</h3>
            <ul className="sidebar-nav">
              {sidebar.items.map((item, i) => (
                <li key={item.id}>
                  <a
                    href={item.href}
                    className={`sidebar-btn noajax ${
                      item.id === menu?._id ? "active" : ""
                    }`}
                  >
                    <span className="number">{i + 1}</span>
                    {item.label}
                    <span className="arrow">›</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <div className="content-area">
          {children}

          {loading ? (
            <p>...</p>
          ) : !categoryId ? (
            <p className="page-subtitle" style={{ color: "inherit" }}>
              Энэ цэсэнд категори холбогдоогүй байна. erxes → Content → Menus
              дотор энэ цэсийг нээж, LINK TYPE-ыг Category болгон сонгоно уу.
            </p>
          ) : (
            <PostCards posts={posts} locale={locale} basePath="news" />
          )}
        </div>
      </div>
    </>
  );
}
