"use client";

import { useQuery } from "@apollo/client";
import queries from "@/graphql/cms/queries";
import SmartContentRenderer from "@/components/content/SmartContentRenderer";
import Image from "next/image";
import { CATEGORY } from "@/graphql/cms/categories";

export default function Page() {
  const { data } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: [CATEGORY.SCHEDULE],
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
              {post?.thumbnail?.url && (
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <Image
                  src={`https://monssfmn.next.erxes.io/gateway/read-file?key=${encodeURIComponent(post?.thumbnail?.url ?? "")}`}
                  alt={post.title}
                />
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}











