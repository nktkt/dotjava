import type { MetadataRoute } from "next";
import { javaVersions } from "@/data/java-versions";
import { javaTopics } from "@/data/java-topics";
import { webChapters } from "@/data/java-web";
import { ioChapters } from "@/data/java-io";
import { excelChapters } from "@/data/excel";
import { oracleChapters } from "@/data/oracle";
import { designPatterns } from "@/data/design-patterns";
import { securityChapters } from "@/data/java-security";
import { eclipseChapters } from "@/data/eclipse-ide";
import { algorithmChapters } from "@/data/algorithm";
import { javascriptChapters } from "@/data/javascript";
import { htmlChapters } from "@/data/html";
import { htmxChapters } from "@/data/htmx";
import { cssChapters } from "@/data/css";
import { bootstrapChapters } from "@/data/bootstrap";
import { postgresqlChapters } from "@/data/postgresql";
import { awsChapters } from "@/data/aws";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://dotjava.org";

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, priority: 1.0 },
    { url: `${baseUrl}/web`, priority: 0.8 },
    { url: `${baseUrl}/io`, priority: 0.8 },
    { url: `${baseUrl}/excel`, priority: 0.8 },
    { url: `${baseUrl}/oracle`, priority: 0.8 },
    { url: `${baseUrl}/security`, priority: 0.8 },
    { url: `${baseUrl}/eclipse-ide`, priority: 0.8 },
    { url: `${baseUrl}/eclipse-ide/glossary`, priority: 0.7 },
    { url: `${baseUrl}/algorithm`, priority: 0.8 },
    { url: `${baseUrl}/javascript`, priority: 0.8 },
    { url: `${baseUrl}/html`, priority: 0.8 },
    { url: `${baseUrl}/htmx`, priority: 0.8 },
    { url: `${baseUrl}/css`, priority: 0.8 },
    { url: `${baseUrl}/bootstrap`, priority: 0.8 },
    { url: `${baseUrl}/postgresql`, priority: 0.8 },
    { url: `${baseUrl}/aws`, priority: 0.8 },
    { url: `${baseUrl}/glossary`, priority: 0.7 },
    { url: `${baseUrl}/patterns`, priority: 0.8 },
    { url: `${baseUrl}/errors`, priority: 0.7 },
    { url: `${baseUrl}/interview`, priority: 0.8 },
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

  const eclipsePages: MetadataRoute.Sitemap = eclipseChapters.map((c) => ({
    url: `${baseUrl}/eclipse-ide/${c.id}`,
    priority: 0.6,
  }));

  const algorithmPages: MetadataRoute.Sitemap = algorithmChapters.map((c) => ({
    url: `${baseUrl}/algorithm/${c.id}`,
    priority: 0.6,
  }));

  const javascriptPages: MetadataRoute.Sitemap = javascriptChapters.map((c) => ({
    url: `${baseUrl}/javascript/${c.id}`,
    priority: 0.6,
  }));

  const htmlPages: MetadataRoute.Sitemap = htmlChapters.map((c) => ({
    url: `${baseUrl}/html/${c.id}`,
    priority: 0.6,
  }));

  const htmxPages: MetadataRoute.Sitemap = htmxChapters.map((c) => ({
    url: `${baseUrl}/htmx/${c.id}`,
    priority: 0.6,
  }));

  const postgresqlPages: MetadataRoute.Sitemap = postgresqlChapters.map((c) => ({
    url: `${baseUrl}/postgresql/${c.id}`,
    priority: 0.6,
  }));

  const bootstrapPages: MetadataRoute.Sitemap = bootstrapChapters.map((c) => ({
    url: `${baseUrl}/bootstrap/${c.id}`,
    priority: 0.6,
  }));

  const awsPages: MetadataRoute.Sitemap = awsChapters.map((c) => ({
    url: `${baseUrl}/aws/${c.id}`,
    priority: 0.6,
  }));

  const cssPages: MetadataRoute.Sitemap = cssChapters.map((c) => ({
    url: `${baseUrl}/css/${c.id}`,
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
    ...eclipsePages,
    ...algorithmPages,
    ...javascriptPages,
    ...htmlPages,
    ...htmxPages,
    ...cssPages,
    ...bootstrapPages,
    ...postgresqlPages,
    ...awsPages,
    ...patternPages,
  ];
}
