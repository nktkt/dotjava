import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "Java エラー・例外 完全ガイド96選",
  description:
    "Javaでよく遭遇するエラー・例外96件を網羅的に解説。実行時例外、チェック例外、コンパイルエラー、論理エラー、Spring/DB/ビルドエラーの原因と修正方法をコード例付きで学習。",
};

export default function Page() {
  return <ClientPage />;
}
