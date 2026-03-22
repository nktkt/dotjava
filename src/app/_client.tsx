"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Coffee,
  ArrowRight,
  Rocket,
  ShieldCheck,
  Plug,
  DatabaseIcon,
  FlaskConical,
  Wrench,
  BookOpen,
  Globe,
  Braces,
  Code2,
  Zap,
  Paintbrush,
  LayoutGrid,
  DatabaseZap,
  Database,
  Table2,
  Container,
  GitBranch,
  Terminal,
  Cloud,
  Shield,
  ShieldAlert,
  Gauge,
  Code,
  Binary,
  Brain,
  MessageCircleQuestion,
  Blocks,
  AlertTriangle,
  FileCode2,
  Dumbbell,
  Award,
  Layers,
  Network,
  MessageSquare,
} from "lucide-react";

interface SectionItem {
  href: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface CategoryGroup {
  title: string;
  items: SectionItem[];
}

const categories: CategoryGroup[] = [
  {
    title: "Java",
    items: [
      { href: "/java", icon: <Coffee className="h-6 w-6" />, title: "Java 学習ガイド", desc: "バージョン別、トピック別、I/O、並行処理、JVM、アルゴリズム" },
    ],
  },
  {
    title: "Spring / フレームワーク",
    items: [
      { href: "/spring-boot", icon: <Rocket className="h-5 w-5" />, title: "Spring Boot", desc: "DI、Web MVC、Data JPA、Security" },
      { href: "/spring-security", icon: <ShieldCheck className="h-5 w-5" />, title: "Spring Security", desc: "JWT、OAuth2、RBAC、CSRF" },
      { href: "/rest-api", icon: <Plug className="h-5 w-5" />, title: "REST API", desc: "設計原則、OpenAPI、バージョニング" },
      { href: "/jpa", icon: <DatabaseIcon className="h-5 w-5" />, title: "JPA / Hibernate", desc: "Entity、JPQL、N+1、キャッシュ" },
      { href: "/build-tools", icon: <Wrench className="h-5 w-5" />, title: "Maven / Gradle", desc: "ビルド、依存管理、マルチモジュール" },
      { href: "/logging", icon: <BookOpen className="h-5 w-5" />, title: "ロギング", desc: "SLF4J、Logback、構造化ログ" },
      { href: "/microservices", icon: <Network className="h-5 w-5" />, title: "マイクロサービス", desc: "Gateway、Eureka、Resilience4j" },
    ],
  },
  {
    title: "テスト / 品質",
    items: [
      { href: "/testing", icon: <FlaskConical className="h-5 w-5" />, title: "テスト", desc: "JUnit 5、Mockito、TDD/BDD" },
      { href: "/spring-boot-testing", icon: <FlaskConical className="h-5 w-5" />, title: "SB テスト", desc: "MockMvc、Testcontainers" },
      { href: "/jmeter", icon: <Gauge className="h-5 w-5" />, title: "JMeter", desc: "負荷テスト、REST APIテスト" },
      { href: "/owasp", icon: <ShieldAlert className="h-5 w-5" />, title: "OWASP", desc: "Top 10、Java/Spring対策" },
      { href: "/security", icon: <Shield className="h-5 w-5" />, title: "セキュリティ", desc: "認証、暗号化、セキュアコーディング" },
    ],
  },
  {
    title: "データベース",
    items: [
      { href: "/sql-basics", icon: <DatabaseZap className="h-5 w-5" />, title: "SQL 基礎", desc: "JOIN、CTE、ウィンドウ関数" },
      { href: "/db-design", icon: <Database className="h-5 w-5" />, title: "DB 設計", desc: "正規化、ER図、インデックス" },
      { href: "/postgresql", icon: <DatabaseZap className="h-5 w-5" />, title: "PostgreSQL", desc: "JSONB、PL/pgSQL、チューニング" },
      { href: "/oracle", icon: <Database className="h-5 w-5" />, title: "Oracle", desc: "SQL、PL/SQL、管理・運用" },
      { href: "/redis", icon: <Database className="h-5 w-5" />, title: "Redis", desc: "キャッシュ、Pub/Sub、分散ロック" },
      { href: "/messaging", icon: <MessageSquare className="h-5 w-5" />, title: "メッセージキュー", desc: "Kafka、RabbitMQ" },
    ],
  },
  {
    title: "DevOps / インフラ",
    items: [
      { href: "/docker-java", icon: <Container className="h-5 w-5" />, title: "Docker", desc: "Dockerfile、Compose、最適化" },
      { href: "/cicd", icon: <GitBranch className="h-5 w-5" />, title: "CI/CD", desc: "GitHub Actions、Jenkins" },
      { href: "/git", icon: <GitBranch className="h-5 w-5" />, title: "Git 実践", desc: "ブランチ戦略、マージ、PR" },
      { href: "/linux-cli", icon: <Terminal className="h-5 w-5" />, title: "Linux", desc: "コマンド、シェル、プロセス管理" },
      { href: "/aws", icon: <Cloud className="h-5 w-5" />, title: "AWS", desc: "EC2、S3、Lambda、ECS" },
      { href: "/terraform", icon: <Cloud className="h-5 w-5" />, title: "Terraform", desc: "IaC、VPC、ECS/Fargate" },
      { href: "/github", icon: <GitBranch className="h-5 w-5" />, title: "GitHub", desc: "リポジトリ管理、Actions" },
    ],
  },
  {
    title: "Web / フロントエンド",
    items: [
      { href: "/web", icon: <Globe className="h-5 w-5" />, title: "Web 開発", desc: "Servlet、Spring MVC、テンプレート" },
      { href: "/javascript", icon: <Braces className="h-5 w-5" />, title: "JavaScript", desc: "ES6+、Promise、DOM" },
      { href: "/html", icon: <Code2 className="h-5 w-5" />, title: "HTML", desc: "セマンティクス、フォーム、SEO" },
      { href: "/htmx", icon: <Zap className="h-5 w-5" />, title: "HTMX", desc: "AJAX、SSE、WebSocket" },
      { href: "/css", icon: <Paintbrush className="h-5 w-5" />, title: "CSS", desc: "Flexbox、Grid、アニメーション" },
      { href: "/bootstrap", icon: <LayoutGrid className="h-5 w-5" />, title: "Bootstrap", desc: "グリッド、コンポーネント、Sass" },
    ],
  },
  {
    title: "他言語",
    items: [
      { href: "/kotlin", icon: <Code className="h-5 w-5" />, title: "Kotlin", desc: "コルーチン、Null安全、Android" },
      { href: "/c-lang", icon: <Binary className="h-5 w-5" />, title: "C 言語", desc: "ポインタ、構造体、メモリ管理" },
      { href: "/cpp-lang", icon: <Binary className="h-5 w-5" />, title: "C++", desc: "クラス、テンプレート、STL" },
      { href: "/excel", icon: <Table2 className="h-5 w-5" />, title: "Excel", desc: "関数、ピボット、VBA" },
    ],
  },
  {
    title: "学習ツール / 資格",
    items: [
      { href: "/quiz", icon: <Brain className="h-5 w-5" />, title: "クイズ", desc: "各分野の理解度をテスト" },
      { href: "/interview", icon: <MessageCircleQuestion className="h-5 w-5" />, title: "面接質問 250選", desc: "Java面接の頻出質問と解答" },
      { href: "/exercises", icon: <Dumbbell className="h-5 w-5" />, title: "実践演習", desc: "穴埋め・写経形式の問題集" },
      { href: "/cheatsheet", icon: <FileCode2 className="h-5 w-5" />, title: "チートシート", desc: "Java、SQL、Git、Docker早見表" },
      { href: "/projects", icon: <Rocket className="h-5 w-5" />, title: "プロジェクト集", desc: "TODO API、ブログ、バッチ" },
      { href: "/patterns", icon: <Blocks className="h-5 w-5" />, title: "デザインパターン", desc: "GoF 23パターン" },
      { href: "/errors", icon: <AlertTriangle className="h-5 w-5" />, title: "エラー集", desc: "よくあるエラーと解決法" },
      { href: "/java-cert", icon: <Award className="h-5 w-5" />, title: "Java 資格", desc: "Bronze/Silver/Gold対策" },
      { href: "/oracle-cert", icon: <Award className="h-5 w-5" />, title: "Oracle 資格", desc: "ORACLE MASTER対策" },
    ],
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-20 md:py-28 bg-gradient-to-b from-neutral-100 to-background dark:from-neutral-900 dark:to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="outline"
              className="mb-6 px-4 py-1.5 text-sm border-neutral-400 text-neutral-600 dark:border-neutral-500 dark:text-neutral-400 bg-background"
            >
              40+ sections / 200+ chapters
            </Badge>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 text-foreground">
              CL
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Java、Spring Boot、データベース、DevOps、フロントエンドまで
              <br className="hidden sm:block" />
              エンジニアに必要な技術を体系的に学習
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-10">
            {categories.map((category, catIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: catIndex * 0.04 }}
                viewport={{ once: true, margin: "-50px" }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1 h-6 rounded-full bg-neutral-400 dark:bg-neutral-500" />
                  <h2 className="text-lg md:text-xl font-bold text-foreground">{category.title}</h2>
                  <span className="text-xs text-muted-foreground">
                    {category.items.length}
                  </span>
                </div>

                {/* Cards */}
                {category.items.length === 1 ? (
                  <Link href={category.items[0].href}>
                    <Card className="group cursor-pointer border border-border hover:shadow-lg hover:border-neutral-400 dark:hover:border-neutral-500 transition-all">
                      <CardContent className="flex items-center gap-6 py-6 px-6">
                        <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center shrink-0">
                          <span className="text-neutral-600 dark:text-neutral-300">{category.items[0].icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold mb-1 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                            {category.items[0].title}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {category.items[0].desc}
                          </p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
                      </CardContent>
                    </Card>
                  </Link>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
                    {category.items.map((item) => (
                      <Link key={item.href} href={item.href}>
                        <Card className="group h-full cursor-pointer border border-border hover:shadow-md hover:border-neutral-400 dark:hover:border-neutral-500 transition-all">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2.5 mb-2">
                              <span className="text-neutral-500 dark:text-neutral-400 group-hover:text-foreground transition-colors">{item.icon}</span>
                              <h3 className="font-bold text-sm group-hover:text-foreground transition-colors truncate">
                                {item.title}
                              </h3>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2">
                              {item.desc}
                            </p>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
