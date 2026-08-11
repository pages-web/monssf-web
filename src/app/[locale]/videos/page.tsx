"use client";

import { useQuery } from "@apollo/client";
import { cmsPostList } from "@/graphql/cms/queries";
import Image from "next/image";
import PageShell from "@/components/PageShell";
import { CATEGORY } from "@/graphql/cms/categories";

/* 🔥 excerpt доторх YouTube URL олно */
function extractYoutubeUrl(text: string) {
  if (!text) return "";

  const match = text.match(
    /(https?:\/\/(www\.)?(youtube\.com|youtu\.be)\/[^\s]+)/i,
  );

  return match ? match[0] : "";
}

/* 🔥 бүх төрлийн YouTube link support */
function getYoutubeId(url: string) {
  if (!url) return "";

  const regExp =
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([^&?]+)/;

  const match = url.match(regExp);
  return match ? match[1] : "";
}

export default function Page() {
  const { data } = useQuery(cmsPostList, {
    variables: {
      categoryIds: [CATEGORY.VIDEOS],
    },
  });

  const posts = data?.cpPostList?.posts || [];

  return (
    <PageShell title="Видео">
      <div
        className="thumb-gallery clearfix"
        style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
      >
        {posts.map((post: any, i: number) => {
          const url = extractYoutubeUrl(post.excerpt || "");
          const videoId = getYoutubeId(url);

          if (!videoId) return null;

          return (
            <div key={i} className="col-1-4" style={{ width: "23%" }}>
              <div className="mosaic-block fade">
                <a href={`/video/${post.slug || post._id}`}>
                  <div className="mosaic-backdrop">
                    <Image
                      src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
                      alt={post.title}
                      style={{ width: "100%", display: "block" }}
                      width={400}
                      height={300}
                    />
                  </div>

                  <div className="details">
                    <h4>{post.title}</h4>
                  </div>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}
