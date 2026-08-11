"use client";

import React from "react";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import queries from "@/graphql/cms/queries";
import StatsBar from "@/components/home/StatsBar";
import SportEvent from "@/components/content/SportEvent";
import { CATEGORY } from "@/graphql/cms/categories";

// CMS category IDs — replace with actual IDs in Erxes
const TIMELINE_CATEGORY_ID = CATEGORY.HISTORY;
const STRUCTURE_CATEGORY_ID = CATEGORY.ABOUT_STRUCTURE;

const FILE_BASE = "https://monssfmn.next.erxes.io/gateway/read-file?key=";

export default function AboutPage() {
  const params = useParams<{ locale: string }>();

  const { data: timelineData } = useQuery(queries.cmsPostList, {
    variables: { categoryIds: [TIMELINE_CATEGORY_ID] },
  });

  const { data: structureData } = useQuery(queries.cmsPostList, {
    variables: { categoryIds: [STRUCTURE_CATEGORY_ID] },
  });

  const timelinePosts = timelineData?.cpPostList?.posts ?? [];
  const structurePost = structureData?.cpPostList?.posts?.[0];

  return (
    <main className="page-shell">
      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <div className="page-header-content">
            <h1 className="page-title">МОСХ-ны тухай</h1>
            <p className="page-subtitle">
              Монголын Оюутны Спортын Холбооны түүх, бүтэц, үйл ажиллагааны тухай
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      {timelinePosts.length > 0 && (
        <section className="section">
          <div className="container">
            <h2 className="section-title">Түүх</h2>
            <p className="section-subtitle" style={{ marginBottom: "var(--space-10)" }}>
              МОСХ-ны үүсэл хөгжлийн гол үе шатууд
            </p>
            <div className="timeline">
              {timelinePosts.map((post: any) => (
                <div className="timeline-item" key={post._id}>
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <div className="timeline-date">{post.excerpt}</div>
                    <h3 className="timeline-title">{post.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Stats */}
      <StatsBar />

      {/* Activities */}
      <SportEvent />

      {/* Structure */}
      {structurePost && (
        <section className="section bg-warm">
          <div className="container">
            <div className="section-header">
              <div>
                <h2 className="section-title">Бүтэц</h2>
                <p className="section-subtitle">Байгууллагын удирдлагын бүтэц</p>
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              {structurePost.thumbnail?.url && (
                <Image
                  src={`${FILE_BASE}${encodeURIComponent(structurePost.thumbnail.url)}`}
                  alt={structurePost.title ?? "Бүтэц"}
                  width={900}
                  height={600}
                  style={{ maxWidth: "100%", height: "auto", borderRadius: "var(--radius-lg)" }}
                />
              )}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
