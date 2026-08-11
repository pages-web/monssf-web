"use client";

import { useQuery } from "@apollo/client";
import MocxCategories from "@/components/categoriesList/mocxCategories";
import { cmsPostList } from "@/graphql/cms/queries";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { CATEGORY } from "@/graphql/cms/categories";

export default function Page() {
  const t = useTranslations("Header");

  const { data, loading, error } = useQuery(cmsPostList, {
    variables: {
      categoryIds: [CATEGORY.EXECUTIVE_COUNCIL],
    },
  });

  const members = data?.cpPostList?.posts || [];

  return (
    <>
      <section className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">{t("memberEC")}</h1>
          <p className="page-subtitle">{t("mocxSubtitle")}</p>
        </div>
      </section>

      <div className="page-container">
        <aside className="sidebar">
          <h3 className="sidebar-title">{t("MOSFF")}</h3>
          <MocxCategories />
        </aside>

        <div className="content-area">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error loading data</div>
          ) : (
            <>
              <h6>МОНГОЛЫН ОЮУТНЫ СПОРТЫН ХОЛБООНЫ УДИРДАХ ЗӨВЛӨЛИЙН ГИШҮҮД</h6>
              <hr />

              <div className="teams">
                {members.map((m: any) => (
                  <div key={m._id} className="boxy w-fit">
                    <div className="image-wrapper w-fit">
                      <Image
                        src={`https://monssfmn.next.erxes.io/gateway/read-file?key=${encodeURIComponent(m.thumbnail?.url ?? "")}`}
                        alt={m.title}
                        width={200}
                        height={200}
                      />
                    </div>

                    <div className="inner-box">
                      <h6 className="team-title">{m.title}</h6>
                      <div
                        className="team-role"
                        dangerouslySetInnerHTML={{
                          __html: m.content || "",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
