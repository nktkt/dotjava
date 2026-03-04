import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "CSS 学習",
  description:
    "CSS の基礎文法からレイアウト、デザイン・装飾、レスポンシブ、アニメーション、モダンCSS、実践パターンまで体系的に学習。",
};

export default function Page() {
  return <ClientPage />;
}
