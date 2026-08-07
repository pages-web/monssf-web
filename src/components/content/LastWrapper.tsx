"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useQuery } from "@apollo/client";
import { queries } from "@/graphql/cms";
import { CATEGORY } from "@/graphql/cms/categories";

const FILE_BASE = "https://monssfmn.next.erxes.io/gateway/read-file?key=";

export default function LastWrapper() {
  const { data, loading, error } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: [CATEGORY.HOME_PARTNERS],
    },
  });

  const partners = data?.cpPostList?.posts || [];
  const t = useTranslations("Home");

  if (loading) return null;
  if (error) return null;

  return (
    <section className="section partners-section">
      <div className="container">
        <h2 className="section-title">{t("partnersTitle")}</h2>
        <ul className="partners-grid">
          {partners.map((post: any) => (
            <li className="partner-logo" key={post.id}>
              
                {post.thumbnail?.url ? (
                  <Image
                    src={`${FILE_BASE}${encodeURIComponent(post.thumbnail.url)}`}
                    alt={post.title}
                    width={150}
                    height={100}
                  />
                ) : (
                  <span>{post.title}</span>
                )}
              
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}