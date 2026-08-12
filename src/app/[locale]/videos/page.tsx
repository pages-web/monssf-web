"use client";

import { useQuery } from "@apollo/client";
import { cmsPostList } from "@/graphql/cms/queries";
import PageShell from "@/components/PageShell";
import { CATEGORY } from "@/graphql/cms/categories";

/**
 * Видео — every post in the "Бичлэг" category.
 *
 * The homepage section (OutterWrapper) shows only the three picked for
 * "Нүүр - Бичлэг"; its "Бүх видео" button lands here.
 *
 * Cards embed the player directly, the same way the homepage does. The
 * previous version rendered legacy `.mosaic-*` markup with a YouTube
 * thumbnail, which could never show: `.mosaic-backdrop` is `display:none`
 * in the old template CSS and was revealed by template JS that no longer
 * runs, so every image collapsed to 0×0. Embedding also means each card
 * plays in place — the old ones linked to `/video/<id>`, a route that
 * does not exist.
 */

/** Pull the YouTube id out of whatever shape the excerpt holds. */
function getYoutubeId(text: string): string {
  if (!text) return "";
  const match = text.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([\w-]+)/,
  );
  return match ? match[1] : "";
}

export default function Page() {
  const { data, loading } = useQuery(cmsPostList, {
    variables: {
      categoryIds: [CATEGORY.VIDEOS],
      sortField: "createdAt",
      sortDirection: "desc",
    },
  });

  // The API also returns posts of child categories; keep this page to its own.
  const posts: any[] =
    data?.cpPostList?.posts?.filter((p: any) =>
      p?.categoryIds?.includes(CATEGORY.VIDEOS),
    ) ?? [];

  const videos = posts
    .map((post) => ({ post, videoId: getYoutubeId(post.excerpt || "") }))
    .filter((v) => v.videoId);

  return (
    <PageShell title="Видео">
      {loading ? (
        <p>...</p>
      ) : videos.length === 0 ? (
        <p>—</p>
      ) : (
        <div className="grid-3">
          {videos.map(({ post, videoId }) => (
            <div className="card" key={post._id}>
              <div className="card-image">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={post.title}
                  width="100%"
                  height="100%"
                  style={{ border: "none", position: "absolute", inset: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              {post.title && (
                <div className="card-content">
                  <h3
                    className="card-title line-clamp-2"
                    style={{ fontSize: "var(--text-base)" }}
                  >
                    {post.title}
                  </h3>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}
