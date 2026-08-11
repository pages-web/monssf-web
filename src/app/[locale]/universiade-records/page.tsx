"use client";

import { useQuery } from "@apollo/client";
import queries from "@/graphql/cms/queries";
import PageShell from "@/components/PageShell";
import { CATEGORY } from "@/graphql/cms/categories";

function getRawHtml(post: any) {
  const data = post?.customFieldsData;

  if (!data) return "";

  if (typeof data === "object" && !Array.isArray(data)) {
    return data.rawHtml || "";
  }

  if (Array.isArray(data)) {
    const field = data.find((f: any) => f.field === "rawHtml");
    return field?.value || "";
  }

  return "";
}

export default function Page() {
  const { data } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: [CATEGORY.UNIVERSIADE_RECORDS],
    },
  });

  const post = data?.cpPostList?.posts?.[0];
  const rawHtml = getRawHtml(post);

  return (
    <PageShell title={post?.title}>
      <div dangerouslySetInnerHTML={{ __html: rawHtml }} />
      <iframe
        src={post?.customFieldsData?.[0]?.value}
        frameBorder="0"
        width="100%"
        height={1000}
      />
    </PageShell>
  );
}
