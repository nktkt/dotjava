"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { bootstrapChapters, bootstrapCategories } from "@/data/bootstrap";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BootstrapChapterClientPage({
  chapterId,
}: {
  chapterId: string;
}) {
  const chapterIndex = bootstrapChapters.findIndex((c) => c.id === chapterId);

  if (chapterIndex === -1) {
    notFound();
  }

  const chapter = bootstrapChapters[chapterIndex];
  const category = bootstrapCategories.find((c) => c.id === chapter.category);

  const sameCategoryChapters = bootstrapChapters.filter(
    (c) => c.category === chapter.category && c.id !== chapter.id
  );

  const prevChapter =
    chapterIndex > 0 ? bootstrapChapters[chapterIndex - 1] : null;
  const nextChapter =
    chapterIndex < bootstrapChapters.length - 1
      ? bootstrapChapters[chapterIndex + 1]
      : null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/bootstrap"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-[var(--color-dads-purple)] transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Bootstrap CSS学習に戻る
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-3xl md:text-4xl font-bold">
                {chapter.title}
              </h1>
              <Badge
                variant="outline"
                style={{
                  borderColor: category?.color,
                  color: category?.color,
                }}
              >
                {category?.name}
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground">
              {chapter.description}
            </p>
          </motion.div>

          <div className="space-y-8 mb-12">
            {chapter.sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                        style={{ backgroundColor: category?.color }}
                      >
                        {index + 1}
                      </div>
                      <CardTitle className="text-xl">
                        {section.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {section.content}
                    </p>
                    {section.code && <CodeBlock code={section.code} />}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Separator className="mb-8" />

          {/* Navigation */}
          <div className="flex justify-between items-center">
            {prevChapter ? (
              <Link href={`/bootstrap/${prevChapter.id}`}>
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {prevChapter.title}
                  </span>
                  <span className="sm:hidden">前へ</span>
                </Button>
              </Link>
            ) : (
              <div />
            )}
            {nextChapter ? (
              <Link href={`/bootstrap/${nextChapter.id}`}>
                <Button variant="outline" className="gap-2">
                  <span className="hidden sm:inline">
                    {nextChapter.title}
                  </span>
                  <span className="sm:hidden">次へ</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-64 shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Same category chapters */}
            {sameCategoryChapters.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
                  {category?.name}の他のチャプター
                </h3>
                <div className="space-y-1">
                  {sameCategoryChapters.map((c) => (
                    <Link
                      key={c.id}
                      href={`/bootstrap/${c.id}`}
                      className="block px-3 py-2 text-sm rounded-lg hover:bg-[var(--color-dads-purple)]/10 transition-colors"
                    >
                      {c.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Table of contents */}
            <div>
              <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wide">
                このページの内容
              </h3>
              <div className="space-y-1">
                {chapter.sections.map((section, index) => (
                  <div
                    key={section.title}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground"
                  >
                    <span
                      className="w-5 h-5 rounded text-xs flex items-center justify-center text-white shrink-0"
                      style={{ backgroundColor: category?.color }}
                    >
                      {index + 1}
                    </span>
                    <span className="line-clamp-1">{section.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
