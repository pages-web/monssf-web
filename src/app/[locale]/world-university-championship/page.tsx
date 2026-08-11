"use client";

import { useQuery } from "@apollo/client";
import queries from "@/graphql/cms/queries";
import PageShell from "@/components/PageShell";
import { CATEGORY } from "@/graphql/cms/categories";

function getEmbedUrl(url: string) {
  if (!url) return "";

  const match = url.match(/\/d\/(.*?)\//);
  if (!match) return "";

  return `https://drive.google.com/file/d/${match[1]}/preview`;
}

export default function Page() {
  const { data } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: [CATEGORY.WORLD_UNIVERSITY_CHAMPIONSHIP],
    },
  });

  const post = data?.cpPostList?.posts?.[0];
  const embedUrl = getEmbedUrl(post?.content || "");

  return (
    <PageShell title={post?.title}>
      {embedUrl ? (
        <iframe src={embedUrl} className="google-frame" allow="autoplay" />
      ) : (
        <p>No document found</p>
      )}
    </PageShell>
  );
}
