"use client";

import { useQuery } from "@apollo/client";
import queries from "@/graphql/cms/queries";
import SmartContentRenderer from "@/components/content/SmartContentRenderer";
import MocxCategories from "@/components/categoriesList/mocxCategories";
import { useTranslations } from "next-intl";
import { CATEGORY } from "@/graphql/cms/categories";

export default function Page() {
  const t = useTranslations("Header");

  const { data, loading } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: [CATEGORY.ACHIEVEMENTS],
      sortField: "createdAt",
      sortDirection: "asc",
    },
  });

  const posts = data?.cpPostList?.posts || [];

  return (
    <>
      <section className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">{t("achievements")}</h1>
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
          ) : (
            posts.map((post: any, index: number) => (
              <div
                key={post._id}
                className="clearfix post"
                style={{ marginBottom: "40px" }}
              >
                {post.excerpt && <p>{post.excerpt}</p>}

                <SmartContentRenderer content={post.content || ""} />

                {index !== posts.length - 1 && <hr />}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
