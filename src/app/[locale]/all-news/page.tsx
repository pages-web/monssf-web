"use client";

import React from "react";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import queries from "@/graphql/cms/queries";
import PageShell from "@/components/PageShell";
import { CATEGORY } from "@/graphql/cms/categories";

// Erxes CMS category ID for news posts — keep in sync with NewWrapper
const NEWS_CATEGORY_ID = CATEGORY.NEWS_ROOT;
const FILE_BASE = "https://monssfmn.next.erxes.io/gateway/read-file?key=";

/**
 * Бүх мэдээ — all news in one page, using the homepage news card grid.
 * Same CMS source as the homepage "Latest News" section, just without
 * the 6-item cap.
 */
export default function Page({ params }: { params: { locale: string } }) {
  const t = useTranslations("Home");
  const { data, loading } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: [NEWS_CATEGORY_ID],
      sortField: "createdAt",
      sortDirection: "desc",
    },
  });

  const posts = data?.cpPostList?.posts ?? [];

  return (
    <PageShell title={t("viewAllNews")} subtitle={t("latestNewsSub")}>
      {loading ? (
        <p>...</p>
      ) : posts.length === 0 ? (
        <p>{t("latestNews")}</p>
      ) : (
        <div className="grid-3">
          {posts.map((post: any) => (
            <a
              key={post._id}
              href={`/${params.locale}/news/${post._id}`}
              className="noajax"
            >
              <article className="card">
                <div className="card-image">
                  {(() => {
                    const key = post.thumbnail?.url ?? post.images?.[0]?.url;
                    return key ? (
                      <Image
                        src={`${FILE_BASE}${encodeURIComponent(key)}`}
                        alt={post.title ?? ""}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <div className="card-image-fallback" aria-hidden />
                    );
                  })()}
                </div>
                <div className="card-content">
                  <h3 className="card-title line-clamp-2">{post.title}</h3>
                  {post.excerpt && (
                    <p className="card-text line-clamp-2">{post.excerpt}</p>
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
    </PageShell>
  );
}
