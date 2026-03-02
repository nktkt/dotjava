import type { MetadataRoute } from "next";
import { javaVersions } from "@/data/java-versions";
import { javaTopics } from "@/data/java-topics";
import { webChapters } from "@/data/java-web";
import { ioChapters } from "@/data/java-io";
import { excelChapters } from "@/data/excel";
import { oracleChapters } from "@/data/oracle";
import { designPatterns } from "@/data/design-patterns";
import { securityChapters } from "@/data/java-security";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dotjava.org";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, priority: 1.0 },
    { url: `${baseUrl}/web`, priority: 0.8 },
    { url: `${baseUrl}/io`, priority: 0.8 },
    { url: `${baseUrl}/excel`, priority: 0.8 },
    { url: `${baseUrl}/oracle`, priority: 0.8 },
    { url: `${baseUrl}/security`, priority: 0.8 },
    { url: `${baseUrl}/glossary`, priority: 0.7 },
    { url: `${baseUrl}/patterns`, priority: 0.8 },
    { url: `${baseUrl}/errors`, priority: 0.7 },
    { url: `${baseUrl}/quiz`, priority: 0.7 },
  ];

  const versionPages: MetadataRoute.Sitemap = javaVersions.map((v) => ({
    url: `${baseUrl}/version/${v.id}`,
    priority: 0.7,
  }));

  const topicPages: MetadataRoute.Sitemap = javaTopics.map((t) => ({
    url: `${baseUrl}/topic/${t.id}`,
    priority: 0.7,
  }));

  const webPages: MetadataRoute.Sitemap = webChapters.map((c) => ({
    url: `${baseUrl}/web/${c.id}`,
    priority: 0.6,
  }));

  const ioPages: MetadataRoute.Sitemap = ioChapters.map((c) => ({
    url: `${baseUrl}/io/${c.id}`,
    priority: 0.6,
  }));

  const excelPages: MetadataRoute.Sitemap = excelChapters.map((c) => ({
    url: `${baseUrl}/excel/${c.id}`,
    priority: 0.6,
  }));

  const oraclePages: MetadataRoute.Sitemap = oracleChapters.map((c) => ({
    url: `${baseUrl}/oracle/${c.id}`,
    priority: 0.6,
  }));

  const securityPages: MetadataRoute.Sitemap = securityChapters.map((c) => ({
    url: `${baseUrl}/security/${c.id}`,
    priority: 0.6,
  }));

  const patternPages: MetadataRoute.Sitemap = designPatterns.map((p) => ({
    url: `${baseUrl}/patterns/${p.id}`,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...versionPages,
    ...topicPages,
    ...webPages,
    ...ioPages,
    ...excelPages,
    ...oraclePages,
    ...securityPages,
    ...patternPages,
  ];
}
