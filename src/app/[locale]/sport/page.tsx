"use client";

import { useQuery } from "@apollo/client";
import queries from "@/graphql/cms/queries";
import ArgaHemjeeCat from "@/components/categoriesList/argaHemjeeCat";
import SmartContentRenderer from "@/components/content/SmartContentRenderer";
import { CATEGORY } from "@/graphql/cms/categories";

export default function Page() {
  const { data } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: [CATEGORY.SPORT_TYPES],
    },
  });

  const post = data?.cpPostList?.posts?.[0];

  const html = post?.content?.replace(
    /src="\/erxes-saas/g,
    `src="${process.env.NEXT_PUBLIC_ERXES_URL}/erxes-saas`,
  );

  return (
    <div id="content">
      <div className="outter-wrapper body-wrapper">
        <div className="wrapper blog-roll ad-pad clearfix">
          <div className="col-3-4">
            <div className="clearfix post">
              <h1 className="title">{post?.title}</h1>

              <div className="clearfix post">
                <SmartContentRenderer content={post?.content || ""} />
              </div>
            </div>
          </div>

          <aside className="col-1-4 last">
            <div className="widget">
              <h3 className="widget-title">Арга хэмжээ</h3>
              <ArgaHemjeeCat />
            </div>
            <iframe
              src="//www.facebook.com/plugins/likebox.php?href=https%3A%2F%2Fwww.facebook.com%2Fpages%2FMongolian-Student-Sports-Federation%25D0%259C%25D0%25BE%25D0%25BD%25D0%25B3%25D0%25BE%25D0%25BB%25D1%258B%25D0%25BD-%25D0%25BE%25D1%258E%25D1%2583%25D1%2582%25D0%25BD%25D1%258B-%25D1%2581%25D0%25BF%25D0%25BE%25D1%2580%25D1%2582%25D1%258B%25D0%25BD-%25D1%2585%25D0%25BE%25D0%25BB%25D0%25B1%25D0%25BE%25D0%25BE%2F463371917048403%3Ffref%3Dts&width&height=258&colorscheme=light&show_faces=true&header=false&stream=false&show_border=false&appId=267664896697840"
              scrolling="no"
              frameBorder={0}
              style={{ border: "none", overflow: "hidden", height: 300 }}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
