"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { cmsPostList } from "@/graphql/cms/queries";
import Image from "next/image";

export default function News() {
  const { data, loading } = useQuery(cmsPostList, {
    variables: {
      clientPortalId: "XavxCsmdYCm0Y48tM-Vxl",
      perPage: 5,
      page: 1,
    },
  });

  if (loading) return <div>Loading...</div>;

  const postList = data?.cmsPostList;
  return (
    <div className="widget">
      <h3>Мэдээлэл</h3>
      {postList?.posts?.slice(0, 3)?.map((post: any, index: number) => (
        <ul className="widget-event-list" key={index}>
          <li>
            <Image
              className="left stay"
              src={`https://monssfmn.next.erxes.io/gateway/read-file?key=${encodeURIComponent(post?.thumbnail?.url ?? "")}`}
              alt="mock"
              width={60}
              height={60}
            />
            <div className="date"></div>
            <h6 className="title">
              <a href={`/news/${post?._id}`} className="noajax">
                {post?.title}
              </a>
            </h6>
          </li>
        </ul>
      ))}
    </div>
  );
}
