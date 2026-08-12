"use client";

import { useQuery } from "@apollo/client";
import { cmsPostDetails } from "@/graphql/cms/queries";
import SmartContentRenderer from "@/components/content/SmartContentRenderer";
import PageShell from "@/components/PageShell";
import BackButton from "@/components/BackButton";

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
    // No sidebar here: a post id says nothing about which section the
    // reader came from, so the guessed menu was always the wrong one. The
    // back button replaces it.
    <PageShell title={postDetails?.title} hideSidebar>
      <BackButton />

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