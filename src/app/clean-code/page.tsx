import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "クリーンコード・リファクタリング",
  description: "命名規則、SOLID原則、コードスメル、リファクタリング手法まで",
};

export default function Page() {
  return <ClientPage />;
}
