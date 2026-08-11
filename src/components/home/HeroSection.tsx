"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { queries } from "@/graphql/cms";
import { useQuery } from "@apollo/client";
import { CATEGORY } from "@/graphql/cms/categories";

const FILE_BASE = "https://monssfmn.next.erxes.io/gateway/read-file?key=";

/**
 * HeroSection
 * -----------
 * Static marketing banner at the top of the homepage (title, subtitle,
 * two CTAs and a photo). Content is bilingual via the `Home` messages
 * namespace — edit the copy there, not here.
 */
export default function HeroSection() {
  const { data, loading, error } = useQuery(queries.cmsPostList, {
  variables: {
    categoryIds: [ CATEGORY.HOME_TITLE],
  },
});

const posts: any[] = data?.cpPostList?.posts || [];

  const t = useTranslations("Home");
  const params = useParams();
  const locale = (params.locale as string) ?? "mn";

  return (
    <section className="hero">
      {posts[0]?.thumbnail?.url && (
        <div className="hero-bg">
          <Image
            src={`${FILE_BASE}${encodeURIComponent(posts[0].thumbnail.url)}`}
            alt={posts[0].title}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      )}
      <div className="hero-content">
        {posts.map((post) => (
          <h1 className="hero-title" key={post.id} style={{ whiteSpace: "pre-line" }}>
            {post.title}
          </h1>
        ))}
        {posts.map((post) => (
          <p key={post.id} className="hero-subtitle" style={{ whiteSpace: "pre-line" }}>
            {post.content?.replace(/<[^>]*>/g, "")}
          </p>
        ))}
        <div className="hero-buttons">
          <a href={`/${locale}/national-universiade`} className="btn btn-primary btn-lg noajax">
            {t("heroExplore")}
          </a>
          <a href={`/${locale}/history`} className="btn btn-secondary btn-lg noajax">
            {t("heroLearn")}
          </a>
        </div>
      </div>
    </section>
  );
}
