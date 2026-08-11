"use client";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  return (
    <div className="outter-wrapper body-wrapper">
      <div className="wrapper ad-pad clearfix">
        <div className="main-content col-3-4">
          <h2 className="title">ЭРДЭМ ШИНЖИЛГЭЭНИЙ ХУРЛЫН УДИРДАМЖ</h2>
          <hr />
          <div className="clearfix teams">
            <figure>
              <Image
                src="http://monssf.mn/media/mssf/content/2020/hural-1.jpg"
                alt="udirdamj"
                data-image="tjnxhcq0gw9t"
              />
            </figure>
            <p />
            <figure>
              <Image
                src="http://monssf.mn/media/mssf/content/2020/hural-2.jpg"
                alt="udirdamj"
                data-image="4axd0xmzwsfq"
              />
            </figure>
            <p />
            <figure>
              <Image
                src="http://monssf.mn/media/mssf/content/2020/hural-3.jpg"
                alt="udirdamj"
                data-image="7c7l4qg95l7k"
              />
            </figure>
            <div className="clearfix">
              <hr />
            </div>
            <div className="clearfix">
              <span className="st_facebook_large">
                <span
                  style={{
                    textDecoration: "none",
                    color: "#000000",
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                  className="stButton"
                >
                  <span
                    className="stLarge"
                    style={{
                      backgroundImage:
                        'url("https://ws.sharethis.com/images/2017/facebook_32.png")',
                    }}
                  />
                </span>
              </span>
              <span className="st_twitter_large">
                <span
                  style={{
                    textDecoration: "none",
                    color: "#000000",
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                  className="stButton"
                >
                  <span
                    className="stLarge"
                    style={{
                      backgroundImage:
                        'url("https://ws.sharethis.com/images/2017/twitter_32.png")',
                    }}
                  />
                </span>
              </span>
              <span className="st_linkedin_large">
                <span
                  style={{
                    textDecoration: "none",
                    color: "#000000",
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                  className="stButton"
                >
                  <span
                    className="stLarge"
                    style={{
                      backgroundImage:
                        'url("https://ws.sharethis.com/images/2017/linkedin_32.png")',
                    }}
                  />
                </span>
              </span>
              <span className="st_googleplus_large">
                <span
                  style={{
                    textDecoration: "none",
                    color: "#000000",
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                  className="stButton"
                >
                  <span
                    className="stLarge"
                    style={{
                      backgroundImage:
                        'url("https://ws.sharethis.com/images/2017/googleplus_32.png")',
                    }}
                  />
                </span>
              </span>
              <span className="st_blogger_large">
                <span
                  style={{
                    textDecoration: "none",
                    color: "#000000",
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                  className="stButton"
                >
                  <span
                    className="stLarge"
                    style={{
                      backgroundImage:
                        'url("https://ws.sharethis.com/images/2017/blogger_32.png")',
                    }}
                  />
                </span>
              </span>
              <span className="st_pinterest_large">
                <span
                  style={{
                    textDecoration: "none",
                    color: "#000000",
                    display: "inline-block",
                    cursor: "pointer",
                  }}
                  className="stButton"
                >
                  <span
                    className="stLarge"
                    style={{
                      backgroundImage:
                        'url("https://ws.sharethis.com/images/2017/pinterest_32.png")',
                    }}
                  />
                </span>
              </span>
            </div>
          </div>
        </div>
        {/* Start Main Sidebar  */}
        <aside className="col-1-4 last">
          <div className="widget">
            <h3 className="widget-title">Мэдээллийн сан</h3>
            <ul className="list-1 widget-list">
              <li>
                <a
                  href={`/${params.locale}/mosn-2024`}
                  className="widget-in-title noajax"
                >
                  МОСН 2020
                </a>
                <ul className="list-2">
                  {[
                    { href: "basketball", name: "Сагсан бөмбөг" },
                    { href: "handball", name: "Гандбол" },
                    { href: "cheerleading", name: "Чирлидинг" },
                    { href: "taekwondo", name: "Таеквондо" },
                    { href: "judo", name: "Жүдо" },
                    { href: "wrestling", name: "Чөлөөт бөх" },
                    { href: "futsal", name: "Футзал" },
                    { href: "volleyball", name: "Волейбол" },
                    { href: "chess", name: "Шатар" },
                    { href: "table-tennis", name: "Ширээний теннис" },
                  ].map(({ href, name }) => (
                    <li key={href}>
                      <a href={`/${params.locale}/${href}`} className="noajax">
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              {[
                { href: "news", name: "Мэдээ" },
                { href: "magazine", name: "ОУОСХ-ны сэтгүүл" },
                { href: "gallery", name: "Зургийн цомог" },
                { href: "videos", name: "Видео" },
                { href: "sport-laws", name: "Спортын хууль эрх зүй" },
              ].map(({ href, name }) => (
                <li key={href}>
                  <a
                    href={`/${params.locale}/${href}`}
                    className="widget-in-title noajax"
                  >
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
