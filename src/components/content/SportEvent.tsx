"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { useTranslations } from "next-intl";
import queries from "@/graphql/cms/queries";
import { CATEGORY } from "@/graphql/cms/categories";

// Erxes CMS category ID for federation activity posts — update here if category changes
const ACTIVITY_CATEGORY_ID = CATEGORY.HOME_EVENTS;


/**
 * SportEvent — "Federation Activities" section.
 * Data logic unchanged (incl. the route stored as plain text in
 * `post.content`). Presentation moved onto the new activity-card grid.
 */
export default function SportEvent() {
  const t = useTranslations("Home");
  const { data, loading } = useQuery(queries.cmsPostList, {
    variables: { categoryIds: [ACTIVITY_CATEGORY_ID] },
  });

  const posts = data?.cpPostList?.posts ?? [];

  if (loading || posts.length === 0) return null;

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <h2 className="section-title">{t("activitiesTitle")}</h2>
            <p className="section-subtitle">{t("activitiesSub")}</p>
          </div>
        </div>

        <div className="grid-2">
          {posts.map((post: any) => (
            <div className="activity-card" key={post._id}>
              <div className="activity-content">
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
