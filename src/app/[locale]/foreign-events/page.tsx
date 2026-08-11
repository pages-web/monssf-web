import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function gadaadArgaHemjee({
  params,
}: {
  params: { locale: string };
}) {
  return (
    <div className="outter-wrapper body-wrapper">
      <div className="wrapper ad-pad clearfix">
        <div className="main-content col-3-4">
          <h2 className="title">Гадаад арга хэмжээ</h2>
          <hr />
          <div className="clearfix teams">
            <figure>
              <Image
                src="http://monssf.mn/media/mssf/content/2020/tugggg-1.jpg"
                alt="gadaadArgaHemjee"
                width={800}
                height={500}
              />
            </figure>
            <h1>Introduction</h1>
            <p>
              Staged every two years in a different city, the winter edition of
              the FISU World University Games is a celebration of international
              university sports and culture. With several thousand
              student-athletes competing in each event edition, the FISU World
              University Games is among the word&apos;s largest winter
              multi-sports competition.
            </p>
            <p />
            <p>
              Embracing FISU’s motto of ‘Excellence in Mind and Body,’ the FISU
              World University Games incorporate an educational aspect into the
              sports competitions which allows university student-athletes to
              celebrate high sports performance while continuing their education
              with the local host city.
            </p>
            <p>&nbsp;&nbsp;</p>
            <p>
              The eleven-day competition programme includes nine compulsory
              sports at every FISU World University Games. To stay on the
              leading edge of sport delivery and innovation, organising
              committees can also include up to three optional sports from the
              FISU Recognised Sports and World University Championships
              programme to include in their edition of the FISU World University
              Games.
            </p>
            <p />
            <p>
              In 2013, the Trentino Winter Universiade drew an event best 2,668
              competitors to the Italian Alps. In 2019, the Krasnoyarsk Winter
              Universiade saw a record 58 countries compete in the heart of
              Siberia in the Russian Federation.
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
                    width={200}
                    height={200}
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
                    width={200}
                    height={200}
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
                    width={200}
                    height={200}
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
