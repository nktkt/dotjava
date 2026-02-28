import type { Metadata } from "next";
import { javaVersions } from "@/data/java-versions";
import ClientPage from "./_client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ versionId: string }>;
}): Promise<Metadata> {
  const { versionId } = await params;
  const version = javaVersions.find((v) => v.id === versionId);
  if (!version) return {};
  return {
    title: version.name,
    description: version.summary,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ versionId: string }>;
}) {
  const { versionId } = await params;
  return <ClientPage versionId={versionId} />;
}
