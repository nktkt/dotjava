import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Spring Boot 完全ガイド",
  description: "DI/IoC、REST API、Spring Data JPA、Spring Security、デプロイまで体系的に学習",
};

export default function Page() {
  return <ClientPage />;
}
