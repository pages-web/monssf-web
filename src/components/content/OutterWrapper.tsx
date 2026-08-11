"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { useTranslations } from "next-intl";
import queries from "@/graphql/cms/queries";
import { CATEGORY } from "@/graphql/cms/categories";

// Erxes CMS category ID for video posts — update here if category changes
const VIDEO_CATEGORY_ID = CATEGORY.HOME_VIDEOS;

/**
 * OutterWrapper — "Competition Highlights" video section.
 * Data logic unchanged. Each post's `excerpt` holds an embeddable video
 * URL, which we render as a real iframe inside the new card design.
 */
export default function OutterWrapper({ params }: { params: { locale: string } }) {
  const t = useTranslations("Home");
  const { data, loading } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: [VIDEO_CATEGORY_ID],
      sortField: "createdAt",
      sortDirection: "desc",
    },
  });

  if (loading) return null;

  const posts = data?.cpPostList?.posts ?? [];
  const videos = posts.slice(0, 3);

  if (videos.length === 0) return null;

  return (
    <section className="section bg-warm">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">{t("videoTitle")}</h2>
            <p className="section-subtitle">{t("videoSub")}</p>
          </div>
          <a href={`/${params.locale}/all-videos`} className="btn btn-brand btn-lg noajax">
            {t("viewAllVideos")}
          </a>
        </div>

        <div className="grid-3">
          {videos.map((video: any) => (
            <div className="card" key={video._id}>
              <div className="card-image">
                <iframe
                  src={video.excerpt}
                  title={video.title}
                  width="100%"
                  height="100%"
                  style={{ border: "none", position: "absolute", inset: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              {video.title && (
                <div className="card-content">
                  <h3 className="card-title line-clamp-2" style={{ fontSize: "var(--text-base)" }}>
                    {video.title}
                  </h3>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
