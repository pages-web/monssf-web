
"use client";

import { useQuery } from "@apollo/client";
import queries from "@/graphql/cms/queries";
import SmartContentRenderer from "@/components/content/SmartContentRenderer";
import Image from "next/image";
import { CATEGORY } from "@/graphql/cms/categories";

export default function Page() {
  const { data } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: [CATEGORY.NATIONAL_GAMES],
    },
  });

  const post = data?.cpPostList?.posts?.[0];

  const image = post?.thumbnail?.url
    ? `${process.env.NEXT_PUBLIC_ERXES_URL}/${post.thumbnail.url}`
    : "";

  const html = post?.content?.replace(
    /src="\/erxes-saas/g,
    `src="${process.env.NEXT_PUBLIC_ERXES_URL}/erxes-saas`,
  );

  return (
    <div id="content">
      <div className="outter-wrapper body-wrapper">
        <div className="wrapper blog-roll ad-pad clearfix">
          <div className="clearfix post">
            <h1 className="title">{post?.title}</h1>
            {image && (
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <Image
                  src={`https://monssfmn.next.erxes.io/gateway/read-file?key=${encodeURIComponent(post?.thumbnail?.url ?? "")}`}
                  alt={post.title}
                  width={400}
                  height={300}
                />
              </div>
            )}
            <p className="excerpt">{post?.excerpt}</p>

            <div className="clearfix post">
              <SmartContentRenderer content={post?.content || ""} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
