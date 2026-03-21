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
import { javaCertChapters } from "@/data/java-cert";
import { oracleCertChapters } from "@/data/oracle-cert";
import { clangChapters } from "@/data/c-lang";
import { cppLangChapters } from "@/data/cpp-lang";
import { githubChapters } from "@/data/github";
import { testingChapters } from "@/data/testing";
import { springBootChapters } from "@/data/spring-boot";
import { buildToolsChapters } from "@/data/build-tools";
import { concurrencyChapters } from "@/data/concurrency";
import { jpaChapters } from "@/data/jpa";
import { loggingChapters } from "@/data/logging";
import { dockerJavaChapters } from "@/data/docker-java";
import { cleanCodeChapters } from "@/data/clean-code";
import { performanceChapters } from "@/data/performance";
import { microservicesChapters } from "@/data/microservices";
import { restApiChapters } from "@/data/rest-api";
import { springSecurityChapters } from "@/data/spring-security";
import { sqlBasicsChapters } from "@/data/sql-basics";
import { linuxCliChapters } from "@/data/linux-cli";
import { cicdChapters } from "@/data/cicd";
import { kotlinChapters } from "@/data/kotlin";
import { jmeterChapters } from "@/data/jmeter";
import { gitPracticalChapters } from "@/data/git-practical";
import { exercisesChapters } from "@/data/exercises";
import { springBootTestingChapters } from "@/data/spring-boot-testing";
import { dbDesignChapters } from "@/data/db-design";
import { jvmChapters } from "@/data/jvm";
import { owaspChapters } from "@/data/owasp";
import { redisChapters } from "@/data/redis";
import { messagingChapters } from "@/data/messaging";
import { terraformChapters } from "@/data/terraform";

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
    { url: `${baseUrl}/java-cert`, priority: 0.8 },
    { url: `${baseUrl}/oracle-cert`, priority: 0.8 },
    { url: `${baseUrl}/c-lang`, priority: 0.8 },
    { url: `${baseUrl}/cpp-lang`, priority: 0.8 },
    { url: `${baseUrl}/github`, priority: 0.8 },
    { url: `${baseUrl}/github-pr`, priority: 0.8 },
    { url: `${baseUrl}/testing`, priority: 0.8 },
    { url: `${baseUrl}/spring-boot`, priority: 0.8 },
    { url: `${baseUrl}/build-tools`, priority: 0.8 },
    { url: `${baseUrl}/concurrency`, priority: 0.8 },
    { url: `${baseUrl}/jpa`, priority: 0.8 },
    { url: `${baseUrl}/logging`, priority: 0.8 },
    { url: `${baseUrl}/docker-java`, priority: 0.8 },
    { url: `${baseUrl}/clean-code`, priority: 0.8 },
    { url: `${baseUrl}/performance`, priority: 0.8 },
    { url: `${baseUrl}/microservices`, priority: 0.8 },
    { url: `${baseUrl}/rest-api`, priority: 0.8 },
    { url: `${baseUrl}/spring-security`, priority: 0.8 },
    { url: `${baseUrl}/sql-basics`, priority: 0.8 },
    { url: `${baseUrl}/linux-cli`, priority: 0.8 },
    { url: `${baseUrl}/cicd`, priority: 0.8 },
    { url: `${baseUrl}/kotlin`, priority: 0.8 },
    { url: `${baseUrl}/jmeter`, priority: 0.8 },
    { url: `${baseUrl}/git`, priority: 0.8 },
    { url: `${baseUrl}/exercises`, priority: 0.8 },
    { url: `${baseUrl}/spring-boot-testing`, priority: 0.8 },
    { url: `${baseUrl}/db-design`, priority: 0.8 },
    { url: `${baseUrl}/jvm`, priority: 0.8 },
    { url: `${baseUrl}/owasp`, priority: 0.8 },
    { url: `${baseUrl}/redis`, priority: 0.8 },
    { url: `${baseUrl}/messaging`, priority: 0.8 },
    { url: `${baseUrl}/terraform`, priority: 0.8 },
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

  const javaCertPages: MetadataRoute.Sitemap = javaCertChapters.map((c) => ({
    url: `${baseUrl}/java-cert/${c.id}`,
    priority: 0.6,
  }));

  const oracleCertPages: MetadataRoute.Sitemap = oracleCertChapters.map((c) => ({
    url: `${baseUrl}/oracle-cert/${c.id}`,
    priority: 0.6,
  }));

  const clangPages: MetadataRoute.Sitemap = clangChapters.map((c) => ({
    url: `${baseUrl}/c-lang/${c.id}`,
    priority: 0.6,
  }));

  const cppLangPages: MetadataRoute.Sitemap = cppLangChapters.map((c) => ({
    url: `${baseUrl}/cpp-lang/${c.id}`,
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

  const githubPages: MetadataRoute.Sitemap = githubChapters.map((c) => ({
    url: `${baseUrl}/github/${c.id}`,
    priority: 0.6,
  }));

  const testingPages: MetadataRoute.Sitemap = testingChapters.map((c) => ({
    url: `${baseUrl}/testing/${c.id}`,
    priority: 0.6,
  }));

  const springBootPages: MetadataRoute.Sitemap = springBootChapters.map((c) => ({
    url: `${baseUrl}/spring-boot/${c.id}`,
    priority: 0.6,
  }));

  const buildToolsPages: MetadataRoute.Sitemap = buildToolsChapters.map((c) => ({
    url: `${baseUrl}/build-tools/${c.id}`,
    priority: 0.6,
  }));

  const concurrencyPages: MetadataRoute.Sitemap = concurrencyChapters.map((c) => ({
    url: `${baseUrl}/concurrency/${c.id}`,
    priority: 0.6,
  }));

  const jpaPages: MetadataRoute.Sitemap = jpaChapters.map((c) => ({
    url: `${baseUrl}/jpa/${c.id}`,
    priority: 0.6,
  }));

  const loggingPages: MetadataRoute.Sitemap = loggingChapters.map((c) => ({
    url: `${baseUrl}/logging/${c.id}`,
    priority: 0.6,
  }));

  const dockerJavaPages: MetadataRoute.Sitemap = dockerJavaChapters.map((c) => ({
    url: `${baseUrl}/docker-java/${c.id}`,
    priority: 0.6,
  }));

  const cleanCodePages: MetadataRoute.Sitemap = cleanCodeChapters.map((c) => ({
    url: `${baseUrl}/clean-code/${c.id}`,
    priority: 0.6,
  }));

  const performancePages: MetadataRoute.Sitemap = performanceChapters.map((c) => ({
    url: `${baseUrl}/performance/${c.id}`,
    priority: 0.6,
  }));

  const microservicesPages: MetadataRoute.Sitemap = microservicesChapters.map((c) => ({
    url: `${baseUrl}/microservices/${c.id}`,
    priority: 0.6,
  }));

  const restApiPages: MetadataRoute.Sitemap = restApiChapters.map((c) => ({
    url: `${baseUrl}/rest-api/${c.id}`,
    priority: 0.6,
  }));

  const springSecurityPages: MetadataRoute.Sitemap = springSecurityChapters.map((c) => ({
    url: `${baseUrl}/spring-security/${c.id}`,
    priority: 0.6,
  }));

  const sqlBasicsPages: MetadataRoute.Sitemap = sqlBasicsChapters.map((c) => ({
    url: `${baseUrl}/sql-basics/${c.id}`,
    priority: 0.6,
  }));

  const linuxCliPages: MetadataRoute.Sitemap = linuxCliChapters.map((c) => ({
    url: `${baseUrl}/linux-cli/${c.id}`,
    priority: 0.6,
  }));

  const cicdPages: MetadataRoute.Sitemap = cicdChapters.map((c) => ({
    url: `${baseUrl}/cicd/${c.id}`,
    priority: 0.6,
  }));

  const kotlinPages: MetadataRoute.Sitemap = kotlinChapters.map((c) => ({
    url: `${baseUrl}/kotlin/${c.id}`,
    priority: 0.6,
  }));

  const jmeterPages: MetadataRoute.Sitemap = jmeterChapters.map((c) => ({
    url: `${baseUrl}/jmeter/${c.id}`,
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
    ...javaCertPages,
    ...oracleCertPages,
    ...clangPages,
    ...cppLangPages,
    ...patternPages,
    ...githubPages,
    ...testingPages,
    ...springBootPages,
    ...buildToolsPages,
    ...concurrencyPages,
    ...jpaPages,
    ...loggingPages,
    ...dockerJavaPages,
    ...cleanCodePages,
    ...performancePages,
    ...microservicesPages,
    ...restApiPages,
    ...springSecurityPages,
    ...sqlBasicsPages,
    ...linuxCliPages,
    ...cicdPages,
    ...kotlinPages,
    ...jmeterPages,
    ...gitPracticalChapters.map((c) => ({ url: `${baseUrl}/git/${c.id}`, priority: 0.6 as const })),
    ...exercisesChapters.map((c) => ({ url: `${baseUrl}/exercises/${c.id}`, priority: 0.6 as const })),
    ...springBootTestingChapters.map((c) => ({ url: `${baseUrl}/spring-boot-testing/${c.id}`, priority: 0.6 as const })),
    ...dbDesignChapters.map((c) => ({ url: `${baseUrl}/db-design/${c.id}`, priority: 0.6 as const })),
    ...jvmChapters.map((c) => ({ url: `${baseUrl}/jvm/${c.id}`, priority: 0.6 as const })),
    ...owaspChapters.map((c) => ({ url: `${baseUrl}/owasp/${c.id}`, priority: 0.6 as const })),
    ...redisChapters.map((c) => ({ url: `${baseUrl}/redis/${c.id}`, priority: 0.6 as const })),
    ...messagingChapters.map((c) => ({ url: `${baseUrl}/messaging/${c.id}`, priority: 0.6 as const })),
    ...terraformChapters.map((c) => ({ url: `${baseUrl}/terraform/${c.id}`, priority: 0.6 as const })),
  ];
}
