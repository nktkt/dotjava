import type { Metadata } from "next";
import { javaTopics } from "@/data/java-topics";
import ClientPage from "./_client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topicId: string }>;
}): Promise<Metadata> {
  const { topicId } = await params;
  const topic = javaTopics.find((t) => t.id === topicId);
  if (!topic) return {};
  return {
    title: topic.title,
    description: topic.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = await params;
  return <ClientPage topicId={topicId} />;
}
