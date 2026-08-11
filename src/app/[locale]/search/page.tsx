import { getCmsPostList } from "@/lib/kb";
import SearchForm from "@/components/SearchForm";
import PostCards from "@/components/content/PostCards";

interface SearchProps {
  params: { locale: string };
  searchParams: { q?: string };
}

export default async function SearchPage({ params, searchParams }: SearchProps) {
  const searchQuery = searchParams.q ?? "";

  const { postList } = searchQuery
    ? await getCmsPostList({ variables: { searchValue: searchQuery } })
    : { postList: null };

  const posts = postList?.posts ?? [];

  return (
    <div className="content wrapper" style={{ padding: "var(--space-8) 0" }}>
      <SearchForm searchQuery={searchQuery} />

      {searchQuery ? (
        <>
          <h2 className="section-title" style={{ margin: "var(--space-6) 0" }}>
            Хайлтын үр дүн: “{searchQuery}”
          </h2>
          {posts.length > 0 ? (
            <PostCards posts={posts} locale={params.locale} basePath="news" />
          ) : (
            <p>Илэрц олдсонгүй.</p>
          )}
        </>
      ) : (
        <p>Хайх түлхүүр үг оруулна уу.</p>
      )}
    </div>
  );
}
