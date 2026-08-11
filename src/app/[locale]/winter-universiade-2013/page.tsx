"use client";

import { useQuery } from "@apollo/client";
import queries from "@/graphql/cms/queries";
import SmartContentRenderer from "@/components/content/SmartContentRenderer";
import PageShell from "@/components/PageShell";
import { CATEGORY } from "@/graphql/cms/categories";

export default function Page() {
  const { data } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: [CATEGORY.WINTER_UNIVERSIADE_2013_TRENTINO],
    },
  });

  const post = data?.cpPostList?.posts?.[0];

  return (
    <PageShell title={post?.title}>
      <SmartContentRenderer content={post?.content || ""} />
    </PageShell>
  );
}
