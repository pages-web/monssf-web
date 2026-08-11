"use client";

import MocxCategories from "@/components/categoriesList/mocxCategories";
import { useQuery } from "@apollo/client";
import queries from "@/graphql/cms/queries";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CATEGORY } from "@/graphql/cms/categories";

export default function Page() {
  const t = useTranslations("Header");

  const { data } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: [CATEGORY.LOGO_AND_FLAG],
    },
  });

  const post = data?.cpPostList?.posts?.[0];

  return (
    <>
      <section className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">{post?.title || t("logo_flag")}</h1>
          <p className="page-subtitle">{t("mocxSubtitle")}</p>
        </div>
      </section>

      <div className="page-container">
        <aside className="sidebar">
          <h3 className="sidebar-title">{t("MOSFF")}</h3>
          <MocxCategories />
        </aside>

        <div className="content-area">
          <div
            style={{
              display: "flex",
              gap: "30px",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            <div style={{ flex: "1 1 300px", maxWidth: "400px" }}>
              {post?.thumbnail?.url && (
                <Image
                  src={`https://monssfmn.next.erxes.io/gateway/read-file?key=${encodeURIComponent(post?.thumbnail?.url ?? "")}`}
                  alt={post?.title || ""}
                  width={400}
                  height={400}
                />
              )}
            </div>

            <div style={{ flex: "2 1 400px" }}>
              <div
                dangerouslySetInnerHTML={{
                  __html: post?.content || "",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
