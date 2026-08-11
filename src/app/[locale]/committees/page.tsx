"use client";

import { useQuery } from "@apollo/client";
import queries from "@/graphql/cms/queries";
import SmartContentRenderer from "@/components/content/SmartContentRenderer";
import MocxCategories from "@/components/categoriesList/mocxCategories";
import { useTranslations } from "next-intl";
import { CATEGORY } from "@/graphql/cms/categories";

export default function Page() {
  const t = useTranslations("Header");

  const { data, loading, error } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: [CATEGORY.COMMITTEES],
      limit: 30,
      cursor: "",
      sortField: "createdAt",
      sortDirection: "-1",
      type: "post",
    },
  });

  const post = data?.cpPostList?.posts?.[0];

  return (
    <>
      <section className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">{post?.title || t("committee")}</h1>
          <p className="page-subtitle">{t("mocxSubtitle")}</p>
        </div>
      </section>

      <div className="page-container">
        <aside className="sidebar">
          <h3 className="sidebar-title">{t("MOSFF")}</h3>
          <MocxCategories />
        </aside>

        <div className="content-area">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error...</div>
          ) : (
            <>
              {post?.excerpt && <p>{post.excerpt}</p>}
              <SmartContentRenderer content={post?.content || ""} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
