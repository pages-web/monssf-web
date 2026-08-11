"use client";

import { useQuery } from "@apollo/client";
import { cmsPostDetails } from "@/graphql/cms/queries";
import { CLIENT_PORTAL_ID } from "@/graphql/cms/categories";
import SmartContentRenderer from "@/components/content/SmartContentRenderer";
import PageShell from "@/components/PageShell";

/**
 * Generic post detail for a category post (mirrors /news/[id]). Reached
 * from the generic category landing so any category's posts open without
 * a dedicated per-section detail route.
 */
export default function CategoryPostPage({
  params,
}: {
  params: { locale: string; id: string; postId: string };
}) {
  const { data, loading } = useQuery(cmsPostDetails, {
    variables: { id: params.postId, clientPortalId: CLIENT_PORTAL_ID },
  });

  const post = data?.cpPost;

  return (
    <PageShell title={post?.title}>
      {loading ? (
        <div>Loading...</div>
      ) : !post ? (
        <div>Post not found</div>
      ) : (
        <SmartContentRenderer content={post?.content || ""} />
      )}
    </PageShell>
  );
}
