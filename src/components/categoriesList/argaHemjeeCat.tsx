"use client";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React from "react";

export default function ArgaHemjeeCat() {
  const params = useParams();
  const t = useTranslations("Header");
  return (
    <ul className="list-1 widget-list">
      <ul>
        <li>
          <a href={`/${params.locale}/domestic-events`} className="noajax">
            {t("national_results")} &nbsp; <em className="fa"></em>
          </a>
          <ul>
            <li>
              <a href={`/${params.locale}/student-championships`} className="noajax">
                {t("championships")}
              </a>
            </li>
            <li>
              <a href={`/${params.locale}/regional-games`} className="noajax">
                {t("regional_games")}
              </a>
            </li>
            <li>
              <a href={`/${params.locale}/universiade-2013-results`} className="noajax">
                {t("universiade_2013_result")}
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href={`/${params.locale}/international-events`} className="noajax">
            {t("universiade_wuc_auc")} &nbsp; <em className="fa"></em>
          </a>
          <ul>
            <li>
              <a href={`/${params.locale}/summer-universiade-2013`} className="noajax">
                {t("su_2013_kazan")}
              </a>
            </li>
            <li>
              <a href={`/${params.locale}/winter-universiade-2013`} className="noajax">
                {t("wu_2013_trentino")}
              </a>
            </li>
            <li>
              <a href={`/${params.locale}/wuc-2014-results`} className="noajax">
                {t("wuc_2014_results")}
              </a>
            </li>
            <li>
              <a href={`/${params.locale}/auc-2014-results`} className="noajax">
                {t("auc_2014_results")}
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href={`/${params.locale}/sport`} className="noajax">
            {t("sports")} &nbsp; <em className="fa"></em>
          </a>
          <ul>
            <li>
              <a href={`/${params.locale}/winter-sports`} className="noajax">
                {t("winter_sport")}
              </a>
            </li>
            <li>
              <a href={`/${params.locale}/summer-sports`} className="noajax">
                {t("summer_sport")}
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href={`/${params.locale}/schedule`} className="noajax">
            {t("calendar")} &nbsp; <em className="fa"></em>
          </a>
          <ul>
            <li>
              <a href={`/${params.locale}/universiade-2015-calendar`} className="noajax">
                {t("nu_2015_calendar")}
              </a>
            </li>
            {/* <li>
              <a href={`/${params.locale}/`} className="noajax">
                {t("wu_su_2015_calendar")}
              </a>
            </li> */}
            <li>
              <a
                href={`/${params.locale}/auc-2015-calendar`}
                className="noajax"
              >
                {t("auc_2015_calendar")}
              </a>
            </li>
            <li>
              <a href={`/${params.locale}/wuc-2014-calendar`} className="noajax">
                {t("wuc_2014_calendar")}
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href={`/${params.locale}/national-universiade-2014-results`} className="noajax">
            {t("nu_2014_results")}
          </a>
        </li>
      </ul>
    </ul>
  );
}
