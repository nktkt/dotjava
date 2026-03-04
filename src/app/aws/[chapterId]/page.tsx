import type { Metadata } from "next";
import { awsChapters } from "@/data/aws";
import ClientPage from "./_client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ chapterId: string }>;
}): Promise<Metadata> {
  const { chapterId } = await params;
  const chapter = awsChapters.find((c) => c.id === chapterId);
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
