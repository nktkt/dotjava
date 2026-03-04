"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Hero } from "@/components/hero";
import { VersionCard } from "@/components/version-card";
import { TopicCard } from "@/components/topic-card";
import { VersionTimeline } from "@/components/version-timeline";
import { Roadmap } from "@/components/roadmap";
import { javaVersions } from "@/data/java-versions";
import { javaTopics, topicCategories } from "@/data/java-topics";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, ArrowRight, FileInput, Table2, Database, Shield, Code, Blocks, AlertTriangle, Brain, MessageCircleQuestion, Binary, Braces, Code2, Zap, Paintbrush, LayoutGrid, DatabaseZap, Cloud } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Version Cards Section */}
      <section id="versions" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              バージョン別ガイド
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Java 8 から最新の Java 26 まで、各バージョンで追加された機能を詳しく解説
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {javaVersions.map((version, index) => (
              <VersionCard key={version.id} version={version} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              バージョン年表
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Javaの進化の歴史を年表で確認
            </p>
          </motion.div>

          <VersionTimeline />
        </div>
      </section>

      <Separator />

      {/* Topics Section */}
      <section id="topics" className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              トピック別学習
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Javaの基礎からオブジェクト指向、並行処理まで体系的に学習
            </p>
          </motion.div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex flex-wrap justify-center mb-8 h-auto gap-1 bg-transparent">
              <TabsTrigger value="all" className="rounded-full data-[state=active]:bg-[var(--color-dads-blue)] data-[state=active]:text-white">
                全て
              </TabsTrigger>
              {topicCategories.map((cat) => (
                <TabsTrigger
                  key={cat.id}
                  value={cat.id}
                  className="rounded-full data-[state=active]:bg-[var(--color-dads-blue)] data-[state=active]:text-white"
                >
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="all">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {javaTopics.map((topic, index) => (
                  <TopicCard key={topic.id} topic={topic} index={index} />
                ))}
              </div>
            </TabsContent>

            {topicCategories.map((cat) => (
              <TabsContent key={cat.id} value={cat.id}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {javaTopics
                    .filter((t) => t.category === cat.id)
                    .map((topic, index) => (
                      <TopicCard key={topic.id} topic={topic} index={index} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      <Separator />

      {/* IO & Web Guides Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              実践ガイド
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              入出力処理、Web開発、Excel、Oracle Database、セキュリティ、Eclipse IDE、アルゴリズム、JavaScript、HTML、HTMX、CSS、Bootstrap、PostgreSQL、AWSを実践的に体系的に学習
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/io">
                <Card className="group h-full cursor-pointer overflow-hidden border border-border transition-all hover:shadow-md hover:border-[var(--color-dads-blue)]">
                  <CardContent className="flex flex-col items-center sm:items-start gap-4 py-8">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-dads-blue-light)] flex items-center justify-center shrink-0">
                      <FileInput className="h-7 w-7 text-[var(--color-dads-blue)]" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-dads-blue)] transition-colors">
                        入出力 完全ガイド
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        ストリーム基礎、ファイル操作、CSV、JSON、XML、Excel、ネットワークI/O、文字エンコーディングまで全12チャプター
                      </p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        {["CSV", "JSON", "XML", "Excel", "NIO.2"].map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Link href="/web">
                <Card className="group h-full cursor-pointer overflow-hidden border border-border transition-all hover:shadow-md hover:border-[var(--color-dads-blue)]">
                  <CardContent className="flex flex-col items-center sm:items-start gap-4 py-8">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-dads-warning-light)] flex items-center justify-center shrink-0">
                      <Globe className="h-7 w-7 text-[var(--color-dads-warning)]" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-dads-blue)] transition-colors">
                        Web開発 完全ガイド
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        HTTP基礎、Servlet/JSP、Spring Boot、JPA、Spring Security、REST API設計、テスト、Docker デプロイまで全12チャプター
                      </p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        {["Spring Boot", "REST API", "JPA", "Security", "Docker"].map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link href="/excel">
                <Card className="group h-full cursor-pointer overflow-hidden border border-border transition-all hover:shadow-md hover:border-[var(--color-dads-success)]">
                  <CardContent className="flex flex-col items-center sm:items-start gap-4 py-8">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-dads-success-light)] flex items-center justify-center shrink-0">
                      <Table2 className="h-7 w-7 text-[var(--color-dads-success)]" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-dads-success)] transition-colors">
                        Excel 完全ガイド
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        基本操作、数式・関数、ピボットテーブル、グラフ、VBA マクロまで全18チャプター
                      </p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        {["関数", "ピボット", "グラフ", "VBA", "動的配列"].map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Link href="/oracle">
                <Card className="group h-full cursor-pointer overflow-hidden border border-border transition-all hover:shadow-md hover:border-[var(--color-dads-error)]">
                  <CardContent className="flex flex-col items-center sm:items-start gap-4 py-8">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-dads-error-light)] flex items-center justify-center shrink-0">
                      <Database className="h-7 w-7 text-[var(--color-dads-error)]" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-dads-error)] transition-colors">
                        Oracle Database ガイド
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        SQL基礎、結合・サブクエリ、PL/SQL、パフォーマンスチューニング、管理・運用まで全18チャプター
                      </p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        {["SQL", "PL/SQL", "チューニング", "DDL", "運用"].map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Link href="/security">
                <Card className="group h-full cursor-pointer overflow-hidden border border-border transition-all hover:shadow-md hover:border-[var(--color-dads-navy)]">
                  <CardContent className="flex flex-col items-center sm:items-start gap-4 py-8">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-dads-navy-light)] flex items-center justify-center shrink-0">
                      <Shield className="h-7 w-7 text-[var(--color-dads-navy)]" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-dads-navy)] transition-colors">
                        セキュリティ ガイド
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        認証・認可、暗号化、Webセキュリティ、セキュアコーディング、テスト・運用まで全18チャプター
                      </p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        {["認証", "暗号化", "XSS", "CSRF", "JWT"].map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Link href="/eclipse-ide">
                <Card className="group h-full cursor-pointer overflow-hidden border border-border transition-all hover:shadow-md hover:border-[var(--color-dads-purple)]">
                  <CardContent className="flex flex-col items-center sm:items-start gap-4 py-8">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-dads-purple)]/10 flex items-center justify-center shrink-0">
                      <Code className="h-7 w-7 text-[var(--color-dads-purple)]" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-dads-purple)] transition-colors">
                        Eclipse IDE ガイド
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        基本操作、エディタ機能、デバッグ、リファクタリング、ビルド、プラグインまで全16チャプター
                      </p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        {["デバッグ", "リファクタリング", "Maven", "JUnit", "Git"].map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Link href="/algorithm">
                <Card className="group h-full cursor-pointer overflow-hidden border border-border transition-all hover:shadow-md hover:border-[var(--color-dads-cyan)]">
                  <CardContent className="flex flex-col items-center sm:items-start gap-4 py-8">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-dads-cyan)]/10 flex items-center justify-center shrink-0">
                      <Binary className="h-7 w-7 text-[var(--color-dads-cyan)]" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-dads-cyan)] transition-colors">
                        アルゴリズム学習
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        計算量、ソート、探索、データ構造、グラフ、動的計画法まで全12チャプター
                      </p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        {["ソート", "探索", "グラフ", "DP", "再帰"].map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              viewport={{ once: true }}
            >
              <Link href="/javascript">
                <Card className="group h-full cursor-pointer overflow-hidden border border-border transition-all hover:shadow-md hover:border-[var(--color-dads-amber)]">
                  <CardContent className="flex flex-col items-center sm:items-start gap-4 py-8">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-dads-amber)]/10 flex items-center justify-center shrink-0">
                      <Braces className="h-7 w-7 text-[var(--color-dads-amber)]" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-dads-amber)] transition-colors">
                        JavaScript 学習
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        基礎文法、関数・スコープ、オブジェクト・配列、非同期処理、DOM操作、モダンJS、実践パターンまで全16チャプター
                      </p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        {["ES6+", "Promise", "DOM", "関数型", "モジュール"].map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              viewport={{ once: true }}
            >
              <Link href="/html">
                <Card className="group h-full cursor-pointer overflow-hidden border border-border transition-all hover:shadow-md hover:border-[var(--color-dads-warning)]">
                  <CardContent className="flex flex-col items-center sm:items-start gap-4 py-8">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-dads-warning)]/10 flex items-center justify-center shrink-0">
                      <Code2 className="h-7 w-7 text-[var(--color-dads-warning)]" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-dads-warning)] transition-colors">
                        HTML 学習
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        基礎構造、フォーム、メディア、セマンティクス、アクセシビリティ、SEO、モダンHTMLまで全16チャプター
                      </p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        {["セマンティクス", "フォーム", "SEO", "ARIA", "レスポンシブ"].map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              viewport={{ once: true }}
            >
              <Link href="/htmx">
                <Card className="group h-full cursor-pointer overflow-hidden border border-border transition-all hover:shadow-md hover:border-[var(--color-dads-purple)]">
                  <CardContent className="flex flex-col items-center sm:items-start gap-4 py-8">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-dads-purple)]/10 flex items-center justify-center shrink-0">
                      <Zap className="h-7 w-7 text-[var(--color-dads-purple)]" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-dads-purple)] transition-colors">
                        HTMX 学習
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        HTML属性だけでAJAX、WebSocket、SSEを実現する軽量ライブラリを体系的に学習。全16チャプター
                      </p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        {["hx-get", "hx-swap", "SSE", "WebSocket", "OOB"].map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              viewport={{ once: true }}
            >
              <Link href="/css">
                <Card className="group h-full cursor-pointer overflow-hidden border border-border transition-all hover:shadow-md hover:border-[var(--color-dads-blue)]">
                  <CardContent className="flex flex-col items-center sm:items-start gap-4 py-8">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-dads-blue-light)] flex items-center justify-center shrink-0">
                      <Paintbrush className="h-7 w-7 text-[var(--color-dads-blue)]" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-dads-blue)] transition-colors">
                        CSS 学習
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        セレクタ、Flexbox、Grid、アニメーション、レスポンシブデザイン、モダンCSSまで全16チャプター
                      </p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        {["Flexbox", "Grid", "変数", "アニメーション", ":has()"].map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              viewport={{ once: true }}
            >
              <Link href="/bootstrap">
                <Card className="group h-full cursor-pointer overflow-hidden border border-border transition-all hover:shadow-md hover:border-[var(--color-dads-purple)]">
                  <CardContent className="flex flex-col items-center sm:items-start gap-4 py-8">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-dads-purple)]/10 flex items-center justify-center shrink-0">
                      <LayoutGrid className="h-7 w-7 text-[var(--color-dads-purple)]" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-dads-purple)] transition-colors">
                        Bootstrap CSS 学習
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        グリッド、コンポーネント、フォーム、ユーティリティ、Sassカスタマイズまで全16チャプター
                      </p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        {["Grid", "Navbar", "Card", "Flex", "Sass"].map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              viewport={{ once: true }}
            >
              <Link href="/postgresql">
                <Card className="group h-full cursor-pointer overflow-hidden border border-border transition-all hover:shadow-md hover:border-[var(--color-dads-blue)]">
                  <CardContent className="flex flex-col items-center sm:items-start gap-4 py-8">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-dads-blue-light)] flex items-center justify-center shrink-0">
                      <DatabaseZap className="h-7 w-7 text-[var(--color-dads-blue)]" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-dads-blue)] transition-colors">
                        PostgreSQL 学習
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        JSONB、ウィンドウ関数、CTE、PL/pgSQL、インデックス最適化、トランザクション管理まで全16チャプター
                      </p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        {["JSONB", "Window関数", "CTE", "PL/pgSQL", "Index"].map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
              viewport={{ once: true }}
            >
              <Link href="/aws">
                <Card className="group h-full cursor-pointer overflow-hidden border border-border transition-all hover:shadow-md hover:border-[var(--color-dads-warning)]">
                  <CardContent className="flex flex-col items-center sm:items-start gap-4 py-8">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-dads-warning-light)] flex items-center justify-center shrink-0">
                      <Cloud className="h-7 w-7 text-[var(--color-dads-warning)]" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-dads-warning)] transition-colors">
                        AWS 学習
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        EC2、S3、Lambda、VPC、IAM、ECS、CloudFormation、CloudWatch、Bedrock、Well-Architectedまで全22チャプター
                      </p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        {["EC2", "S3", "Lambda", "VPC", "IAM"].map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <Separator />

      {/* Learning Tools Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              学習ツール
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              クイズ、面接対策、デザインパターン、エラー集で理解を深める
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/quiz">
                <Card className="group h-full cursor-pointer overflow-hidden border border-border transition-all hover:shadow-md hover:border-[var(--color-dads-blue)]">
                  <CardContent className="flex flex-col items-center sm:items-start gap-4 py-8">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-dads-blue-light)] flex items-center justify-center shrink-0">
                      <Brain className="h-7 w-7 text-[var(--color-dads-blue)]" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-dads-blue)] transition-colors">
                        Java クイズ
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        基礎文法からモダンJavaまで、難易度別に知識を腕試し。解説付きで学習効果アップ
                      </p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        {["基礎", "OOP", "Stream", "並行処理"].map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Link href="/interview">
                <Card className="group h-full cursor-pointer overflow-hidden border border-border transition-all hover:shadow-md hover:border-[var(--color-dads-navy)]">
                  <CardContent className="flex flex-col items-center sm:items-start gap-4 py-8">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-dads-blue-light)] flex items-center justify-center shrink-0">
                      <MessageCircleQuestion className="h-7 w-7 text-[var(--color-dads-navy)]" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-dads-navy)] transition-colors">
                        面接質問100選
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        Java面接でよく聞かれる質問を基礎・中級・上級に分けてコード例付きで解説
                      </p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        {["基礎", "OOP", "Spring", "設計"].map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link href="/patterns">
                <Card className="group h-full cursor-pointer overflow-hidden border border-border transition-all hover:shadow-md hover:border-[var(--color-dads-warning)]">
                  <CardContent className="flex flex-col items-center sm:items-start gap-4 py-8">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-dads-warning-light)] flex items-center justify-center shrink-0">
                      <Blocks className="h-7 w-7 text-[var(--color-dads-warning)]" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-dads-warning)] transition-colors">
                        デザインパターン
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        GoF 23パターンをJavaコード例と共に学習。生成・構造・振る舞いパターンを網羅
                      </p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        {["Singleton", "Factory", "Observer", "Strategy"].map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Link href="/errors">
                <Card className="group h-full cursor-pointer overflow-hidden border border-border transition-all hover:shadow-md hover:border-[var(--color-dads-error)]">
                  <CardContent className="flex flex-col items-center sm:items-start gap-4 py-8">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-dads-error-light)] flex items-center justify-center shrink-0">
                      <AlertTriangle className="h-7 w-7 text-[var(--color-dads-error)]" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-dads-error)] transition-colors">
                        エラー集
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        よく遭遇するエラー・例外を網羅的に解説。原因と修正方法をコード例付きで学習
                      </p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        {["実行時例外", "チェック例外", "コンパイルエラー"].map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              学習ロードマップ
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              入門からエキスパートまでの学習ステップ
            </p>
          </motion.div>

          <Roadmap />
        </div>
      </section>
    </>
  );
}
