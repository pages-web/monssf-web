"use client";

import { useQuery } from "@apollo/client";
import queries from "@/graphql/cms/queries";
import SmartContentRenderer from "@/components/content/SmartContentRenderer";
import Image from "next/image";
import PageShell from "@/components/PageShell";
import { CATEGORY } from "@/graphql/cms/categories";

export default function Page() {
  const { data } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: [CATEGORY.WUC_2014_RESULTS],
    },
  });

  const posts = data?.cpPostList?.posts || [];
  const post = posts[0];

  return (
    <PageShell title={post?.title}>
      {posts.map((p: any, index: number) => (
        <div
          key={p._id}
          className="clearfix post"
          style={{ marginBottom: "40px" }}
        >
          {p.excerpt && <p>{p.excerpt}</p>}

          <SmartContentRenderer content={p.content || ""} />

          {index !== posts.length - 1 && <hr />}
        </div>
      ))}
      {post?.thumbnail?.url && (
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Image
            src={`https://monssfmn.next.erxes.io/gateway/read-file?key=${encodeURIComponent(post?.thumbnail?.url ?? "")}`}
            alt={post.title}
            width={400}
            height={300}
          />
        </div>
      )}
    </PageShell>
  );
}
