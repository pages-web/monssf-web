"use client";

import React from "react";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import queries from "@/graphql/cms/queries";
import { CATEGORY } from "@/graphql/cms/categories";

// Erxes CMS category ID for news posts — update here if category changes
const NEWS_CATEGORY_ID = CATEGORY.NEWS_ROOT;

// Erxes file serving base URL
const FILE_BASE = "https://monssfmn.next.erxes.io/gateway/read-file?key=";

/**
 * NewWrapper — "Latest News" homepage section.
 * Data logic (CMS query, category id, file URL) is unchanged; only the
 * presentation was moved onto the new card-grid design.
 */
export default function NewWrapper({ params }: { params: { locale: string } }) {
  const t = useTranslations("Home");
  const { data, loading } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: [NEWS_CATEGORY_ID],
      sortField: "createdAt",
      sortDirection: "desc",
    },
  });

  const posts = data?.cpPostList?.posts ?? [];

  if (loading || posts.length === 0) return null;

  // Show the six most recent items in a responsive 3-column grid
  const items = posts.slice(0, 6);

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">{t("latestNews")}</h2>
            <p className="section-subtitle">{t("latestNewsSub")}</p>
          </div>
          <a href={`/${params.locale}/all-news`} className="btn btn-brand btn-lg noajax">
            {t("viewAllNews")}
          </a>
        </div>

        <div className="grid-3">
          {items.map((post: any) => (
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
      </div>
    </section>
  );
}
