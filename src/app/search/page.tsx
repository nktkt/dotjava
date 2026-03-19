import type { Metadata } from "next";
import { Suspense } from "react";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "検索",
  description: "サイト内検索",
};

export default function Page() {
  return (
    <Suspense>
      <ClientPage />
    </Suspense>
  );
}
