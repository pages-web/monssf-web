"use client";

import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import queries from "@/graphql/cms/queries";
import SmartContentRenderer from "@/components/content/SmartContentRenderer";
import { CATEGORY } from "@/graphql/cms/categories";

export default function Page() {
  const { data, loading } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: [CATEGORY.UNIVERSIADE_WUC_AUC],
    },
  });

  const post = data?.cpPostList?.posts?.[0];

  useEffect(() => {
    const tabs = document.querySelectorAll(".tab-nav li");

    tabs.forEach((tab: any) => {
      tab.onclick = () => {
        const target = tab.getAttribute("data-tab");

        document
          .querySelectorAll(".tab_content")
          .forEach((c: any) => (c.style.display = "none"));

        const targetElement = document.getElementById(target);
        if (targetElement) {
          targetElement.style.display = "block";
        }

        tabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
      };
    });
  }, [post]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="outter-wrapper body-wrapper">
      <div className="wrapper blog-roll ad-pad clearfix">
        <div className="col-1-1">
          <div className="clearfix post">
            <h1 className="title">{post?.title}</h1>

            <SmartContentRenderer content={post?.content || ""} />
          </div>
        </div>
      </div>
    </div>
  );
}