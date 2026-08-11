"use client";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface SearchFormProps {
  searchQuery?: string;
}

export default function SearchForm({ searchQuery = "" }: SearchFormProps) {
  const [query, setQuery] = useState(searchQuery);
  const router = useRouter();
  const params = useParams();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/${params?.locale}/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
