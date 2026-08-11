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
      categoryIds: [CATEGORY.REGIONAL_GAMES],
    },
  });

  const post = data?.cpPostList?.posts?.[0];

  return (
    <PageShell title={post?.title}>
      <SmartContentRenderer content={post?.content || ""} />
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
