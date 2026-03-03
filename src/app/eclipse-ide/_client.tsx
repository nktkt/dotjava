"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { eclipseChapters, eclipseCategories } from "@/data/eclipse-ide";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, ArrowRight, BookOpen } from "lucide-react";

export default function EclipseClientPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 mb-4">
          <Code className="h-8 w-8 text-[var(--color-dads-purple)]" />
          <h1 className="text-3xl md:text-4xl font-bold">
            Eclipse <span className="text-[var(--color-dads-purple)]">IDE</span> ガイド
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          インストール・初期設定、エディタ機能、デバッグ、リファクタリング、
          ビルド・実行、プラグインまで体系的に学習
        </p>
        <div className="mt-3 text-sm text-muted-foreground">
          全 {eclipseChapters.length} チャプター /{" "}
          {eclipseChapters.reduce((sum, c) => sum + c.sections.length, 0)} セクション
        </div>
      </motion.div>

      {/* Category Sections */}
      {eclipseCategories.map((category, catIndex) => {
        const chapters = eclipseChapters.filter(
          (c) => c.category === category.id
        );
        if (chapters.length === 0) return null;

        return (
          <motion.section
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: catIndex * 0.05 }}
            viewport={{ once: true, margin: "-30px" }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-1.5 h-8 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <h2 className="text-xl font-bold">{category.name}</h2>
              <Badge
                variant="outline"
                className="text-xs"
                style={{
                  borderColor: category.color,
                  color: category.color,
                }}
              >
                {chapters.length} チャプター
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {chapters.map((chapter) => (
                <Link key={chapter.id} href={`/eclipse-ide/${chapter.id}`}>
                  <Card className="group h-full cursor-pointer overflow-hidden border border-border transition-all hover:shadow-md hover:border-[var(--color-dads-purple)]">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg group-hover:text-[var(--color-dads-purple)] transition-colors">
                        {chapter.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {chapter.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <BookOpen className="h-3.5 w-3.5" />
                          {chapter.sections.length} セクション
                        </div>
                        <div className="flex items-center text-sm text-[var(--color-dads-purple)] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          学習する
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.section>
        );
      })}

      {/* Glossary Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 mb-6"
      >
        <Link href="/eclipse-ide/glossary">
          <Card className="group cursor-pointer overflow-hidden border border-border transition-all hover:shadow-md hover:border-[var(--color-dads-purple)]">
            <CardContent className="flex items-center justify-between py-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-dads-purple)]/10 flex items-center justify-center shrink-0">
                  <BookOpen className="h-6 w-6 text-[var(--color-dads-purple)]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold group-hover:text-[var(--color-dads-purple)] transition-colors">
                    Eclipse IDE 用語集
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Eclipse に関する重要な用語を検索・カテゴリフィルターで素早く確認
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-[var(--color-dads-purple)] transition-colors shrink-0" />
            </CardContent>
          </Card>
        </Link>
      </motion.div>

      {/* Learning Path */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 mb-8"
      >
        <Card className="bg-muted">
          <CardContent className="pt-6">
            <h3 className="text-lg font-bold mb-4 text-center">
              推奨学習順序
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-2">
              {eclipseCategories.map((cat, index) => (
                <div key={cat.id} className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="font-medium"
                    style={{
                      borderColor: cat.color,
                      color: cat.color,
                    }}
                  >
                    {index + 1}. {cat.name}
                  </Badge>
                  {index < eclipseCategories.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
}
