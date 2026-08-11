"use client";

import React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { Facebook, Twitter, Instagram } from "lucide-react";
import queries from "@/graphql/cms/queries";
import { menuHref, type CmsMenu } from "@/lib/menus";

/** Links per column before spilling into the next one. */
const LINKS_PER_COLUMN = 5;

/**
 * SiteFooter
 * ----------
 * Modern footer matching the approved reference: brand blurb, quick
 * links, contact details and a bottom bar with social icons.
 *
 * The links column comes entirely from the menus marked `kind: footer`
 * in the erxes CMS — nothing is hardcoded, so editors control it without
 * a code change. Past LINKS_PER_COLUMN the list continues in a new
 * column; with no footer menus the column is omitted altogether.
 */
export default function SiteFooter() {
  const t = useTranslations("Footer");
  const params = useParams();
  const locale = (params.locale as string) ?? "mn";

  const { data } = useQuery(queries.cpMenus, {
    variables: { kind: "footer", language: locale },
  });
  const footerMenus: CmsMenu[] = [...(data?.cpMenus ?? [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  const quickLinks = footerMenus.map((m) => ({
    key: m._id,
    label: m.label,
    href: menuHref(locale, m.url),
  }));

  // Chunk into columns; `.footer-content` is a wrapping flex row, so the
  // extra columns drop onto the next line on their own.
  const columns: (typeof quickLinks)[] = [];
  for (let i = 0; i < quickLinks.length; i += LINKS_PER_COLUMN) {
    columns.push(quickLinks.slice(i, i + LINKS_PER_COLUMN));
  }

  return (
    <footer className="site-footer">
      <div className="footer-content">
        {/* Brand */}
        <div className="footer-brand">
          <Image src="/images/logo.png" alt="МОСХ" width={72} height={72} />
          <p style={{ whiteSpace: "pre-line" }}>{t("brandDesc")}</p>
        </div>

        {/* Links — every CMS menu of kind "footer". Only the first column
            carries the heading; the continuation columns keep an empty one
            so the lists stay top-aligned. */}
        {columns.map((column, i) => (
          <div className="footer-links" key={i}>
            <h4 aria-hidden={i > 0 ? true : undefined}>
              {i === 0 ? t("quickLinks") : " "}
            </h4>
            <ul>
              {column.map((link) => (
                <li key={link.key}>
                  <a href={link.href} className="noajax">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div className="footer-links">
          <h4>{t("contactUs")}</h4>
          <ul>
            <li><a href="mailto:monssf@mongolnet.mn">monssf@mongolnet.mn</a></li>
            <li><a href="tel:+97611311947">+976 11 311947</a></li>
            <li><a href="https://maps.google.com/?q=Спортын+төв+ордон,+Улаанбаатар,+Монгол" target="_blank" rel="noopener noreferrer">Спортын төв ордон, 304 тоот, Бага тойруу, Улаанбаатар</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{t("rights", { year: new Date().getFullYear() })}</p>
        <ul className="social-links">
          <li>
            <a href="https://www.facebook.com/mongolianssf" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
              <Facebook size={16} />
            </a>
          </li>
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
              <Twitter size={16} />
            </a>
          </li>
          <li>
            <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
              <Instagram size={16} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
