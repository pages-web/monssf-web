import { getCmsPostList } from "@/lib/kb";
import React from "react";

export default async function page({ params }: { params: { id: string } }) {
  const { postList } = await getCmsPostList({
    variables: {
      clientPortalId: "XavxCsmdYCm0Y48tM-Vxl",
    },
  });
  const postData = postList?.posts;
  return (
    <div className="wrapper">
      {postData?.map((post: any) => (
        <div key={post._id}>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      ))}
    </div>
  );
}
