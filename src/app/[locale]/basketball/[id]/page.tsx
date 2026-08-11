"use client";

import { useQuery } from "@apollo/client";
import { cmsPostDetails } from "@/graphql/cms/queries";
import SmartContentRenderer from "@/components/content/SmartContentRenderer";
import PageShell from "@/components/PageShell";

export default function Page({
  params,
}: {
  params: { id: string; locale: string };
}) {
  const { data, loading } = useQuery(cmsPostDetails, {
    variables: {
      id: params.id,
      clientPortalId: "XavxCsmdYCm0Y48tM-Vxl",
    },
  });

  const postDetails = data?.cpPost;

  return (
    <PageShell title={postDetails?.title}>
      {loading ? (
        <div>Loading...</div>
      ) : !postDetails ? (
        <div>Post not found</div>
      ) : (
        <SmartContentRenderer content={postDetails?.content || ""} />
      )}
    </PageShell>
  );
}
