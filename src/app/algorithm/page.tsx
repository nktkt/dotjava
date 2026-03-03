import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Java アルゴリズム学習",
  description:
    "計算量、ソート、探索、データ構造、グラフ、動的計画法、実践テクニックまで、Javaで学ぶアルゴリズムの基礎と応用。",
};

export default function Page() {
  return <ClientPage />;
}
