"use client";

import { useQuery } from "@apollo/client";
import queries from "@/graphql/cms/queries";
import SmartContentRenderer from "@/components/content/SmartContentRenderer";
import PageShell from "@/components/PageShell";
import ErxesForm from "@/components/ErxesForm";
import { CATEGORY } from "@/graphql/cms/categories";

export default function Page() {
  const { data } = useQuery(queries.cmsPostList, {
    variables: {
      categoryIds: [CATEGORY.CONTACT],
    },
  });

  // The API also returns posts of child categories; keep this page to its own.
  const posts: any[] =
    data?.cpPostList?.posts?.filter((p: any) =>
      p?.categoryIds?.includes(CATEGORY.CONTACT),
    ) ?? [];
  const post = posts[0];

  return (
    <>
      <PageShell title={post?.title} compact>
        {/* CMS content first: anything published to the Холбоо барих
            category lands above the map, so new posts are the first thing
            read instead of being buried under it. */}
        {posts.map((p) => (
          <SmartContentRenderer key={p._id} content={p.content || ""} />
        ))}

        {/* Map — between the CMS content and the contact form */}
        <iframe
          src="https://maps.google.com/maps?q=Спортын төв ордон, Улаанбаатар, Монгол&t=&z=16&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="320"
          style={{
            border: 0,
            display: "block",
            borderRadius: "var(--radius-lg)",
            marginBlock: "var(--space-6)",
          }}
          loading="lazy"
        />

        {/* erxes contact form — centred by .form-card (max-width + auto margin) */}
        <ErxesForm />
      </PageShell>
    </>
  );
}
