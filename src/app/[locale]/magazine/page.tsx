"use client";

import { useQuery } from "@apollo/client";
import { cmsPostList } from "@/graphql/cms/queries";
import Image from "next/image";
import PageShell from "@/components/PageShell";
import { CATEGORY } from "@/graphql/cms/categories";

export default function Page() {
  const { data } = useQuery(cmsPostList, {
    variables: {
      categoryIds: [CATEGORY.MAGAZINE],
    },
  });

  const posts = data?.cpPostList?.posts || [];

  return (
    <PageShell title="ОУОСХ-ны сэтгүүл">
      <div className="gallery">
        {posts.map((post: any) => (
          <div key={post._id} className="item">
            <div className="image-wrapper">
              <Image
                src={`https://monssfmn.next.erxes.io/gateway/read-file?key=${encodeURIComponent(post.thumbnail?.url ?? "")}`}
                alt={post.title}
                width={400}
                height={400}
              />
              <div className="date">{post.title}</div>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}
