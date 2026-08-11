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
      categoryIds: [CATEGORY.STATUTE],
    },
  });

  const posts = data?.cpPostList?.posts || [];

  return (
    <>
      <section className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">{posts?.[0]?.title || t("statute")}</h1>
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
            dangerouslySetInnerHTML={{
              __html: posts?.[0]?.content || "",
            }}
          />
          {posts?.[0]?.thumbnail?.url && (
            <Image
              src={`https://monssfmn.next.erxes.io/gateway/read-file?key=${encodeURIComponent(posts?.[0]?.thumbnail?.url ?? "")}`}
              alt="МОСХ ДҮРЭМ"
              width={400}
              height={300}
            />
          )}
        </div>
      </div>
    </>
  );
}
