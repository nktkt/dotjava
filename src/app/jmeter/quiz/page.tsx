import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "JMeter クイズ | Java学習サイト",
  description: "JMeter負荷テストの知識をテスト。スレッドグループ、サンプラー、リスナー、分散テストの理解度を確認。",
};

export default function Page() {
  return <ClientPage />;
}
