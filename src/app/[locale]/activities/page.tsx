"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function UilAjillagaa() {
  const params = useParams();
  return (
    <div className="outter-wrapper body-wrapper">
      <div className="wrapper ad-pad clearfix">
        <div className="main-content col-3-4">
          <h2 className="title">Үйл ажиллагаа</h2>
          <hr />
          <div className="clearfix teams">
            <figure>
              <Image
                src="http://monssf.mn/media/mssf/content/P3.jpg"
                data-image="i79f6pcjukz6"
                alt="uilAjilgaa"
                width={100}
                height={100}
              />
            </figure>
            <p>
              МОСХ нь &quot;Оюутны спорт, Универсиад&quot;наадмын чиглэлээр
              төрөл бүрийн сургалт, семинар, эрдэм шинжилгээний хурлыг жил бүр
              төв, орон нутагт зохион байгуулан багш, оюутнуудыг хамруулан
              оролцуулж байна. Түүнчлэн ОУОСХ-ны Эрдэм шинжилгээний их хурал,
              чуулган, семинар, Ази тивийн ОСХ-ны эрдэм шинжилгээний хурал,
              семинарт Монголын оюутны спортын холбооны төлөөлөгчид, багш,
              оюутнуудыг хамруулан оролцуулах ажлыг зохион байгуулдаг.
            </p>
            <p>
              МОСН 2020
              <br />
            </p>
            <ul className="list-2">
              <li>
                <p>Их, дээд, сургуулиуд</p>
              </li>
              <li>
                <p>Спортын төрөл</p>
              </li>
              <li>
                <p>Спорт холбоод</p>
              </li>
              <li>
                <p>Тэмцээний хуваарь</p>
              </li>
              <li>
                <p>Тамирчид</p>
              </li>
              <li>
                <p>Байршил</p>
              </li>
            </ul>
            <p>
              <br />
              <br />
            </p>
          </div>
        </div>
        {/* Start Main Sidebar  */}
        <aside className="widget">
          <div className="widget">
            <h3 className="widget-title">Холбооны үйл ажиллагааны тухай</h3>
            <br />
            <ul className="list-1 widget-list">
              <li>
                <Link
                  href={`/${params.locale}/student-universiade`}
                  className="noajax"
                >
                  Оюутны универсиад
                </Link>
              </li>
              <li>
                <Link
                  href={`/${params.locale}/oyutniiUASHT`}
                  className="noajax"
                >
                  Оюутны УАШТ
                </Link>
              </li>
              <li>
                <Link
                  href={`/${params.locale}/foreign-events`}
                  className="noajax"
                >
                  Гадаад арга хэмжээ
                </Link>
              </li>
              <li>
                <Link
                  href={`/${params.locale}/activities`}
                  className="noajax"
                >
                  Үйл ажиллагаа
                </Link>
              </li>
            </ul>
          </div>
          <div className="widget">
            <h3>Мэдээлэл</h3>
            <ul className="widget-event-list">
              <li>
                <Link href="/naadam">
                  <Image
                    className="left stay"
                    src="http://monssf.mn/media/mssf/content/2024/.4646081716254200_200_x_200.JPG"
                    alt="МОНГОЛЫН ОЮУТНЫ СПОРТЫН VI НААДАМ"
                  />
                  <div className="date">15 Aug</div>
                  <h6 className="title">
                    МОНГОЛЫН ОЮУТНЫ СПОРТЫН VI НААДАМ Ө...
                  </h6>
                </Link>
              </li>
              <li>
                <Link href="/volleyballChampionship">
                  <Image
                    className="left stay"
                    src="http://monssf.mn/media/mssf/content/2024/.7150325832898783150_200_x_200.JPG"
                    alt="ВОЛЕЙБОЛЫН ОЮУТНЫ АВАРГУУД ТОДОРЛОО"
                  />
                  <div className="date">15 Aug</div>
                  <h6 className="title">ВОЛЕЙБОЛЫН ОЮУТНЫ АВАРГУУД ТОДОРЛОО</h6>
                </Link>
              </li>
              <li>
                <Link href="/tableTenniChampionship">
                  <Image
                    className="left stay"
                    src="http://monssf.mn/media/mssf/content/2024/.2040699223373456625_200_x_200.jpg"
                    alt="ШИРЭЭНИЙ ТЕННИСНИЙ ОЮУТАН ТАМИРЧИД"
                  />
                  <div className="date">15 Aug</div>
                  <h6 className="title">
                    ШИРЭЭНИЙ ТЕННИСНИЙ ОЮУТАН ТАМИРЧИД ...
                  </h6>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
