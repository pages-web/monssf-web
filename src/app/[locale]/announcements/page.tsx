"use client";

import { useQuery } from "@apollo/client";
import queries from "@/graphql/cms/queries";
import Image from "next/image";
import PageShell from "@/components/PageShell";
import { CATEGORY } from "@/graphql/cms/categories";

export default function Page() {
  const { data } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: [CATEGORY.ANNOUNCEMENTS],
    },
  });

  const posts = data?.cpPostList?.posts || [];

  return (
    <PageShell title="Зар">
      {posts.map((post: any) => {
        const link = post?.content?.includes("http")
          ? post.content.replace(/<[^>]+>/g, "")
          : "#";

        return (
          <div key={post._id} className="post-excerpt clearfix">
            <div className="col-1-3 mosaic-block circle">
              <a href={link} className="mosaic-overlay link noajax" />
              <Image
                src={`https://monssfmn.next.erxes.io/gateway/read-file?key=${encodeURIComponent(post?.thumbnail?.url ?? "")}`}
                alt={post.title}
                width={400}
                height={400}
              />
              <div className="mosaic-backdrop">
                <div className="corner date">
                  {new Date(post.publishedDate).toLocaleDateString("mn-MN", {
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </div>

            <div className="col-2-3 last">
              <h3 className="news-title">
                <a href={link} className="noajax">
                  {post.title}
                </a>
              </h3>

              <p>
                {post.excerpt}
                <a href={"/#"} className="read-more noajax">
                  {" "}
                  Дэлгэрэнгүй
                </a>
              </p>
            </div>
          </div>
        );
      })}
    </PageShell>
  );
}
