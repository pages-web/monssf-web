"use client";

import { useParams, usePathname } from "next/navigation";
import { useQuery } from "@apollo/client";
import { useTranslations } from "next-intl";
import queries from "@/graphql/cms/queries";
import React from "react";
import { CATEGORY } from "@/graphql/cms/categories";

// Reuses the same news category as NewWrapper for the ticker headlines
const NEWS_CATEGORY_ID = CATEGORY.NEWS_ROOT;

export default function TopHeader() {
  const t = useTranslations("Header");
  const pathname = usePathname();
  const params = useParams();

  const pathSegments = pathname.split("/").filter(Boolean);
  const restOfPath = pathSegments.slice(1).join("/");

  const { data } = useQuery(queries.cmsPostList, {
    variables: { categoryIds: [NEWS_CATEGORY_ID] },
  });

  const headlines: string[] = (data?.cpPostList?.posts ?? [])
    .slice(0, 8)
    .map((p: any) => p.title)
    .filter(Boolean);

  return (
    <div className="outter-wrapper pre-header-area rint-media">

      {/* Scrolling ticker — headlines come from CMS */}
      {headlines.length > 0 && (
        <div className="news-ticker">
          <span className="ticker-label">Мэдээ</span>
          <div className="ticker-overflow">
            <div className="ticker-track">
              {/* Duplicated so the scroll loops seamlessly */}
              {[...headlines, ...headlines].map((title, i) => (
                <span key={i} className="ticker-item">● {title}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Language switcher + search + login + social */}
      <div className="wrapper clearfix">

        <div className="pft left">
          <a href={`/mn/${restOfPath}`} rel="noopener noreferrer">Монгол</a>
          <a href={`/en/${restOfPath}`} rel="noopener noreferrer">English</a>
        </div>

        <div className="pre-header-right right">
          <ul className="social-links boxy head-other">
            <li>
              <a href={`/${params.locale}/search`} className="txt noajax">{t("search")}</a>
            </li>
            <li>
              <a href={`/${params.locale}/register`} className="txt noajax">{t("login")}</a>
            </li>
            <li>
              <a className="noajax" target="_blank" rel="noopener noreferrer" title="Facebook" href="https://www.facebook.com">
                <i className="fa fa-facebook" />
              </a>
            </li>
            <li>
              <a className="noajax" target="_blank" rel="noopener noreferrer" title="Twitter" href="#">
                <i className="fa fa-twitter" />
              </a>
            </li>
            <li>
              <a className="noajax" target="_blank" rel="noopener noreferrer" title="Instagram" href="#">
                <i className="fa fa-instagram" />
              </a>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
}
