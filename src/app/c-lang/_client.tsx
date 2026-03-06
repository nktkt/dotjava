"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { clangChapters, clangCategories } from "@/data/c-lang";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code2, ArrowRight, Brain } from "lucide-react";

export default function CLangClientPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-dads-cyan-light)] mb-4">
          <Code2 className="h-8 w-8 text-[var(--color-dads-cyan)]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">
          C言語学習
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          C言語の基礎文法からポインタ・メモリ管理、データ構造、マルチスレッド、ネットワークプログラミングまで体系的に学習。基礎から実践レベルまで段階的にスキルを習得します。
        </p>
      </motion.div>

      {/* Categories */}
      <div className="space-y-12 mb-16">
        {clangCategories.map((category, catIndex) => {
          const chapters = clangChapters.filter(
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
                  <Link
                    key={chapter.id}
                    href={`/c-lang/${chapter.id}`}
                  >
                    <Card className="group h-full cursor-pointer border border-border transition-all hover:shadow-md hover:border-[var(--color-dads-cyan)]">
                      <CardContent className="py-6">
                        <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--color-dads-cyan)] transition-colors flex items-center justify-between">
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
        <Link href="/c-lang/quiz">
          <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl border-2 border-dashed border-[var(--color-dads-blue)] bg-[var(--color-dads-blue-light)] hover:bg-[var(--color-dads-blue)]/10 transition-colors cursor-pointer">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-dads-blue)] text-white">
              <Brain className="h-7 w-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">クイズに挑戦</h3>
              <p className="text-sm text-muted-foreground">
                Duolingo風クイズで基礎文法・中級・上級・実践・応用の知識をテスト
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
          まず基礎文法でC言語の基本を固め、中級・上級とポインタやメモリ管理の理解を深め、実践・応用でシステムプログラミングのスキルを段階的に習得しましょう。手を動かしてコードを書くことが上達への近道です。
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {clangCategories.map((cat) => (
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
