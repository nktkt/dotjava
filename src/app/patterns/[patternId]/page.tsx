import type { Metadata } from "next";
import { designPatterns } from "@/data/design-patterns";
import ClientPage from "./_client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ patternId: string }>;
}): Promise<Metadata> {
  const { patternId } = await params;
  const pattern = designPatterns.find((p) => p.id === patternId);
  if (!pattern) return {};
  return {
    title: pattern.title,
    description: pattern.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ patternId: string }>;
}) {
  const { patternId } = await params;
  return <ClientPage patternId={patternId} />;
}
