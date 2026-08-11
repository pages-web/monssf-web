"use client";

import { useQuery } from "@apollo/client";
import queries from "@/graphql/cms/queries";
import SmartContentRenderer from "@/components/content/SmartContentRenderer";
import PageShell from "@/components/PageShell";
import { CATEGORY } from "@/graphql/cms/categories";

export default function Page() {
  const { data } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: [CATEGORY.WUC_2014_CALENDAR],
    },
  });

  const post = data?.cpPostList?.posts?.[0];

  return (
    <PageShell title={post?.title} subtitle={post?.excerpt}>
      <SmartContentRenderer content={post?.content || ""} />
    </PageShell>
  );
}
