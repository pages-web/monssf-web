"use client";

import { useQuery } from "@apollo/client";
import { cmsPostList } from "@/graphql/cms/queries";
import Image from "next/image";
import PageShell from "@/components/PageShell";
import { CATEGORY } from "@/graphql/cms/categories";

export default function Page() {
  const { data } = useQuery(cmsPostList, {
    variables: {
      categoryIds: [CATEGORY.GALLERY],
    },
  });

  const post = data?.cpPostList?.posts?.[0];
  const images = post?.attachments || [];

  return (
    <PageShell title={post?.title || "Зургийн цомог"}>
      <div className="gallery-grid">
        {images.map((img: any, i: number) => (
          <div key={i} className="gallery-item">
            <Image
              src={`https://monssfmn.next.erxes.io/gateway/read-file?key=${encodeURIComponent(img.url ?? "")}`}
              alt={img.name || "image"}
              width={400}
              height={400}
            />
          </div>
        ))}
      </div>
    </PageShell>
  );
}
