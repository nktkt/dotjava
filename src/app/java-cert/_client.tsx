"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { javaCertChapters, javaCertCategories } from "@/data/java-cert";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, ArrowRight, Brain } from "lucide-react";

export default function JavaCertClientPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-dads-success-light)] mb-4">
          <Award className="h-8 w-8 text-[var(--color-dads-success)]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          Java資格試験対策
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Oracle Certified Java Programmer Bronze・Silver・Goldの資格試験対策。出題範囲を体系的にカバーし、頻出パターンと模擬問題で合格力を養成します。
        </p>
      </motion.div>

      {/* Categories */}
      <div className="space-y-12 mb-16">
        {javaCertCategories.map((category, catIndex) => {
          const chapters = javaCertChapters.filter(
            (c) => c.category === category.id
          );
          if (chapters.length === 0) return null;
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIndex * 0.05 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <h2 className="text-2xl font-bold">{category.name}</h2>
                <Badge
                  variant="outline"
                  style={{
                    borderColor: category.color,
                    color: category.color,
                  }}
                >
                  {chapters.length}チャプター
                </Badge>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {chapters.map((chapter) => (
                  <Link key={chapter.id} href={`/java-cert/${chapter.id}`}>
                    <Card className="group h-full cursor-pointer border border-border transition-all hover:shadow-md hover:border-[var(--color-dads-success)]">
                      <CardContent className="py-6">
                        <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--color-dads-success)] transition-colors flex items-center justify-between">
                          {chapter.title}
                          <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {chapter.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {chapter.sections.map((s) => (
                            <Badge
                              key={s.title}
                              variant="secondary"
                              className="text-xs"
                            >
                              {s.title}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quiz CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <Link href="/java-cert/quiz">
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl border-2 border-dashed border-[var(--color-dads-blue)] bg-[var(--color-dads-blue-light)] hover:bg-[var(--color-dads-blue)]/10 transition-colors cursor-pointer">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-dads-blue)] text-white">
              <Brain className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">クイズに挑戦</h3>
              <p className="text-sm text-muted-foreground">
                Duolingo風クイズでBronze・Silver・Goldの知識をテスト
              </p>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Learning Path */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-muted rounded-2xl p-8 text-center"
      >
        <h2 className="text-2xl font-bold mb-3">学習の進め方</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          まずBronzeで基礎を固め、Silverで実践的なJava開発力を証明し、Goldで上級者としてのスキルを認定されましょう。各レベルの出題傾向を把握し、コードトレースの練習を重ねることが合格への近道です。
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {javaCertCategories.map((cat) => (
            <Badge
              key={cat.id}
              variant="outline"
              style={{ borderColor: cat.color, color: cat.color }}
            >
              {cat.name}
            </Badge>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
