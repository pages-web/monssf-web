"use client";

import CategoryCardsPage from "@/components/content/CategoryCardsPage";
import { CATEGORY } from "@/graphql/cms/categories";

export default function Page({ params }: { params: { locale: string } }) {
  return (
    <CategoryCardsPage
      locale={params.locale}
      categoryId={CATEGORY.TABLE_TENNIS}
      basePath="table-tennis"
      title="Ширээний теннис"
    />
  );
}
