"use client";

import { ApolloWrapper } from "@/lib/ApolloWrapper";


export function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloWrapper>{children}</ApolloWrapper>;
}