"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { VersionCard } from "@/components/version-card";
import { TopicCard } from "@/components/topic-card";
import { VersionTimeline } from "@/components/version-timeline";
import { javaVersions } from "@/data/java-versions";
import { javaTopics, topicCategories } from "@/data/java-topics";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Coffee,
  ArrowRight,
  FileInput,
  Binary,
  Layers,
  Code,
  Gauge,
  Cpu,
  Dumbbell,
  Shield,
  BookOpen,
  Sparkles,
} from "lucide-react";

const javaSubSections = [
  { href: "/io", icon: FileInput, color: "#2563EB", title: "入出力", desc: "ストリーム、ファイル操作、CSV、JSON、NIO.2" },
  { href: "/algorithm", icon: Binary, color: "#0891B2", title: "アルゴリズム", desc: "ソート、探索、データ構造、グラフ、DP" },
  { href: "/concurrency", icon: Layers, color: "#7C3AED", title: "並行処理", desc: "Thread、Lock、Future、Virtual Thread" },
  { href: "/clean-code", icon: Code, color: "#2563EB", title: "クリーンコード", desc: "SOLID原則、命名規則、リファクタリング" },
  { href: "/performance", icon: Gauge, color: "#D97706", title: "パフォーマンス", desc: "JMH、プロファイリング、最適化" },
  { href: "/jvm", icon: Cpu, color: "#059669", title: "JVM / メモリ", desc: "GC、ヒープ、メモリリーク、JFR" },
  { href: "/exercises", icon: Dumbbell, color: "#DC2626", title: "実践演習", desc: "穴埋め・写経形式の演習問題集" },
  { href: "/security", icon: Shield, color: "#1E3A5F", title: "セキュリティ", desc: "認証、暗号化、セキュアコーディング" },
];

export default function JavaHubPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-gradient-to-b from-accent to-background">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="outline"
              className="mb-6 px-4 py-1.5 text-sm border-[var(--color-dads-blue)] text-[var(--color-dads-blue)] bg-background"
            >
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              Java 8 ~ Java 26 対応
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              <span className="text-[var(--color-dads-blue)]">Java</span> 学習ガイド
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              バージョン別の新機能、基本トピック、I/O、並行処理、アルゴリズムまで
              Javaプログラミングを体系的に学習
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              <Stat icon={<Coffee className="h-5 w-5 text-[var(--color-dads-blue)]" />} value="10+" label="バージョン" />
              <Stat icon={<BookOpen className="h-5 w-5 text-[var(--color-dads-success)]" />} value="80+" label="機能解説" />
              <Stat icon={<Layers className="h-5 w-5 text-[var(--color-dads-warning)]" />} value="15+" label="基本トピック" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sub Sections */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Java 関連セクション</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
            {javaSubSections.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Link href={item.href}>
                  <Card className="group h-full cursor-pointer border border-border hover:shadow-md hover:border-[#2563EB] transition-all">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <item.icon className="h-5 w-5 shrink-0" style={{ color: item.color }} />
                        <h3 className="font-bold text-sm group-hover:text-[#2563EB] transition-colors">
                          {item.title}
                        </h3>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{item.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Version Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-3">バージョン別ガイド</h2>
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

      {/* Timeline */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-3">バージョン年表</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Javaの進化の歴史を年表で確認
            </p>
          </motion.div>
          <VersionTimeline />
        </div>
      </section>

      <Separator />

      {/* Topics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-3">トピック別学習</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Javaの基礎からオブジェクト指向、並行処理まで体系的に学習
            </p>
          </motion.div>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex flex-wrap justify-center mb-8 h-auto gap-1 bg-transparent">
              <TabsTrigger
                value="all"
                className="rounded-full data-[state=active]:bg-[var(--color-dads-blue)] data-[state=active]:text-white"
              >
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
    </>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <div className="text-left">
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
