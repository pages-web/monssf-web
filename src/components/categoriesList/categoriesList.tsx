"use client";
import { useParams } from "next/navigation";
import React from "react";

export default function CategoriesList() {
  const params = useParams();
  return (
    <aside className="">
      <div className="widget">
        <h3 className="widget-title">Универсиад боловсрол</h3>
        <ul className="list-1 widget-list">
          <li>
            <a href={`/${params.locale}/summer-universiade/`} className="noajax">
              Зуны Универсиадын түүх
            </a>
          </li>
          <li>
            <a href={`/${params.locale}/winter-universiade/`} className="noajax">
              Өвлийн Универсиадын түүх
            </a>
          </li>
          <li>
            <a href={`/${params.locale}/universiade-records/`} className="noajax">
              Универсиад наадмын дээд амжилтүүд
            </a>
          </li>
          <li>
            <a href={`/${params.locale}/world-university-championship/`} className="noajax">
              Дэлхийн оюутны аварга шалгаруулах тэмцээн
            </a>
          </li>
          <li>
            <a href={`/${params.locale}/international-events/`} className="noajax">
              ОУОСХ болон АОСХ-ны түүх
            </a>
          </li>
          <li>
            <a href={`/${params.locale}/fisu-conference/`} className="noajax">
              ОУОСХ-ын хурал
            </a>
          </li>
          <li>
            <a href={`/${params.locale}/announcements/`} className="noajax">
              Хурлын зар
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}
