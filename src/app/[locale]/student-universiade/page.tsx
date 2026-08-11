"use client";
import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client";
import { queries } from "@/graphql/cms";
import { menuHref } from "@/lib/menus";

export default function OyutniiUniversiade() {
  const params = useParams();
  const locale =
    typeof params.locale === "string"
      ? params.locale
      : Array.isArray(params.locale)
        ? params.locale[0]
        : "mn";

  const { data, loading, error } = useQuery(queries.cpMenus, {
    variables: { kind: "header", language: locale },
  });

  const menuItems = data?.cpMenus || [];

  return (
    <div className="outter-wrapper body-wrapper">
      <div className="wrapper ad-pad clearfix">
        <div className="main-content col-3-4">
          <h2 className="title">Оюутны универсиад</h2>
          <hr />
          <div className="clearfix teams">
            <h3>
              <figure>
                <Image
                  src="http://monssf.mn/media/mssf/content/Games2020/neelt/_MG_8868.jpg"
                  alt="universiade"
                  width={500}
                  height={500}
                />
              </figure>
              <br />
            </h3>
            <p>
              Монголын оюутны спортын &quot;Универсиад&quot;&nbsp;наадам нь 2
              жил тутамд нэг удаа сондгой&nbsp;тоотой жилд МОСХ-ноос эрхлэн
              холбогдох&nbsp;байгууллагуудтай хамтран зохион&nbsp;явуулдаг.
              Наадамд өвлийн төрлөөр тэшүүр,&nbsp;цана, тэшүүр, зуны спортын
              төрлүүдээр&nbsp;аэробек, байт харваа, бокс,
              буудлага,&nbsp;волейбол, гандбол, жүдо, заалны
              хөлбөмбөг,&nbsp;футзал, модон бөмбөг, нийтийн гүйлт,&nbsp;сагсан
              бөмбөг, спортын бүжиг, таэквондо,&nbsp;үндэсний бөх, хөл
              бөмбөг,хөнгөн атлетик,&nbsp;чөлөөт бөх,шатар, ширээний
              теннис,олс&nbsp;таталт, спорт аялалын спортын
              төрлүүд&nbsp;хөтөлбөрт багтдаг.
              <br />
            </p>
          </div>
        </div>

        <aside className="widget">
          <div className="widget">
            <h3 className="widget-title">Холбооны үйл ажиллагааны тухай</h3>
            <br />
            <ul className="list-1 widget-list">
              {!loading && !error
                ? menuItems.map((item: any) => (
                    <li key={item._id}>
                      <a
                        href={menuHref(locale, item.url)}
                        className="noajax"
                        target={item.target || "_self"}
                        rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
