"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useQuery } from "@apollo/client";
import { queries } from "@/graphql/cms";
import { CATEGORY } from "@/graphql/cms/categories";

const FILE_BASE = "https://monssfmn.next.erxes.io/gateway/read-file?key=";

/**
 * The partner's website, as entered in the CMS.
 *
 * Editors put it in a custom field on the partner post (currently
 * `field_1774011402246`), but the field id changes whenever the field is
 * recreated, so scan every custom value for the first real URL instead of
 * hardcoding it. Older entries kept the link in the excerpt or as a link
 * in the body, so both are honoured as fallbacks.
 */
function partnerUrl(post: any): string | undefined {
  const custom = post?.customFieldsData;
  const values = Array.isArray(custom)
    ? custom.map((f: any) => f?.value)
    : Object.values(custom ?? {});
  const fromField = values.find(
    (v: any) => typeof v === "string" && /^https?:\/\//i.test(v.trim()),
  );
  if (fromField) return String(fromField).trim();

  const excerpt = (post?.excerpt ?? "").trim();
  if (/^https?:\/\//i.test(excerpt)) return excerpt;

  const href = /href="(https?:\/\/[^"]+)"/i.exec(post?.content ?? "");
  return href?.[1];
}

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
          {partners.map((post: any) => {
            const logo = post.thumbnail?.url ? (
              <Image
                src={`${FILE_BASE}${encodeURIComponent(post.thumbnail.url)}`}
                alt={post.title}
                width={150}
                height={100}
              />
            ) : (
              <span>{post.title}</span>
            );
            const url = partnerUrl(post);

            return (
              <li className="partner-logo" key={post._id}>
                {url ? (
                  // Partner sites are external, so open in a new tab and
                  // keep the opener hardening with it.
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={post.title}
                  >
                    {logo}
                  </a>
                ) : (
                  logo
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}