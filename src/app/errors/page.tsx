import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Java エラー集",
  description:
    "Javaでよく遭遇するエラー・例外を網羅的に解説。原因、修正方法、回避のコツをコード例付きで学習。",
};

export default function Page() {
  return <ClientPage />;
}
