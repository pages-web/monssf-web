"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";

/**
 * PostCards — a responsive card grid for a list of CMS posts (no images),
 * matching the news-card look. Each card links to `/{locale}/{basePath}/{postId}`.
 */
export default function PostCards({
  posts,
  locale,
  basePath,
}: {
  posts: any[];
  locale: string;
  basePath: string;
}) {
  const t = useTranslations("Home");

  if (!posts || posts.length === 0) return <p>—</p>;

  return (
    <div className="grid-3">
      {posts.map((post: any) => (
        <a
          key={post._id}
          href={`/${locale}/${basePath}/${post._id}`}
          className="noajax"
        >
          <article className="card">
            <div className="card-content">
              <h3 className="card-title line-clamp-2">{post.title}</h3>
              {post.excerpt && (
                <p className="card-text line-clamp-2">{post.excerpt}</p>
              )}
              <span className="card-link">
                {t("readMore")} <ArrowRight size={16} />
              </span>
            </div>
          </article>
        </a>
      ))}
    </div>
  );
}
