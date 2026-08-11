"use client";

import { useQuery } from "@apollo/client";
import { queries } from "@/graphql/cms";
import PageShell from "@/components/PageShell";
import PostCards from "@/components/content/PostCards";

/**
 * CategoryCardsPage — full page that lists one category's posts as a card
 * grid (newest first, no images). Used by the per-category list routes so
 * every "posts on one page" view shares the same news-card look.
 */
export default function CategoryCardsPage({
  locale,
  categoryId,
  basePath,
  title,
}: {
  locale: string;
  categoryId: string;
  basePath: string;
  title: string;
}) {
  const { data, loading } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: [categoryId],
      sortField: "createdAt",
      sortDirection: "desc",
    },
  });

  const posts =
    data?.cpPostList?.posts?.filter((post: any) =>
      post?.categoryIds?.includes(categoryId),
    ) ?? [];

  return (
    <PageShell title={title}>
      {loading ? <p>...</p> : <PostCards posts={posts} locale={locale} basePath={basePath} />}
    </PageShell>
  );
}
