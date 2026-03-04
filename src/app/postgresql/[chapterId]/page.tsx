import type { Metadata } from "next";
import { postgresqlChapters } from "@/data/postgresql";
import ClientPage from "./_client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapterId: string }>;
}): Promise<Metadata> {
  const { chapterId } = await params;
  const chapter = postgresqlChapters.find((c) => c.id === chapterId);
  if (!chapter) return {};
  return {
    title: chapter.title,
    description: chapter.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ chapterId: string }>;
}) {
  const { chapterId } = await params;
  return <ClientPage chapterId={chapterId} />;
}
