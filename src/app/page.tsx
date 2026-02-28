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
import { Globe, ArrowRight, FileInput, Table2 } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Version Cards Section */}
      <section id="versions" className="py-16 bg-[#F8F9FB]">
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
            <p className="text-[#626264] max-w-xl mx-auto">
              Java 8 から最新の Java 24 まで、各バージョンで追加された機能を詳しく解説
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
            <p className="text-[#626264] max-w-xl mx-auto">
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
            <p className="text-[#626264] max-w-xl mx-auto">
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
      <section className="py-16 bg-[#F8F9FB]">
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
            <p className="text-[#626264] max-w-xl mx-auto">
              入出力処理、Web開発、Excel を実践的に体系的に学習
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/io">
                <Card className="group h-full cursor-pointer overflow-hidden border border-[#D9DBE0] transition-all hover:shadow-md hover:border-[var(--color-dads-blue)]">
                  <CardContent className="flex flex-col items-center sm:items-start gap-4 py-8">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-dads-blue-light)] flex items-center justify-center shrink-0">
                      <FileInput className="h-7 w-7 text-[var(--color-dads-blue)]" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-dads-blue)] transition-colors">
                        入出力 完全ガイド
                      </h3>
                      <p className="text-[#626264] text-sm mb-3">
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
                <Card className="group h-full cursor-pointer overflow-hidden border border-[#D9DBE0] transition-all hover:shadow-md hover:border-[var(--color-dads-blue)]">
                  <CardContent className="flex flex-col items-center sm:items-start gap-4 py-8">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-dads-warning-light)] flex items-center justify-center shrink-0">
                      <Globe className="h-7 w-7 text-[var(--color-dads-warning)]" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-dads-blue)] transition-colors">
                        Web開発 完全ガイド
                      </h3>
                      <p className="text-[#626264] text-sm mb-3">
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
                <Card className="group h-full cursor-pointer overflow-hidden border border-[#D9DBE0] transition-all hover:shadow-md hover:border-[var(--color-dads-success)]">
                  <CardContent className="flex flex-col items-center sm:items-start gap-4 py-8">
                    <div className="w-14 h-14 rounded-2xl bg-[var(--color-dads-success-light)] flex items-center justify-center shrink-0">
                      <Table2 className="h-7 w-7 text-[var(--color-dads-success)]" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-[var(--color-dads-success)] transition-colors">
                        Excel 完全ガイド
                      </h3>
                      <p className="text-[#626264] text-sm mb-3">
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
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-16 bg-[#F8F9FB]">
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
            <p className="text-[#626264] max-w-xl mx-auto">
              入門からエキスパートまでの学習ステップ
            </p>
          </motion.div>

          <Roadmap />
        </div>
      </section>
    </>
  );
}
