"use client";

import SmartContentRenderer from "@/components/content/SmartContentRenderer";
import { useQuery } from "@apollo/client";
import queries from "@/graphql/cms/queries";
import PageShell from "@/components/PageShell";
import { CATEGORY } from "@/graphql/cms/categories";

// "Гишүүн сургууль" category in Erxes CMS (post: fCbjV1-6mME36IRdR6HA0).
const CATEGORY_ID = CATEGORY.MEMBER_UNIVERSITIES;

export default function Page() {
  const { data } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: [CATEGORY_ID],
    },
  });

  const post = data?.cpPostList?.posts?.[0];

  return (
    <PageShell title={post?.title || "Гишүүн сургууль"}>
      <SmartContentRenderer content={post?.content || ""} className="member-table" />
    </PageShell>
  );
}
