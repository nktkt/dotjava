"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { javaTopics, topicCategories } from "@/data/java-topics";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TopicPage({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = use(params);
  const topicIndex = javaTopics.findIndex((t) => t.id === topicId);

  if (topicIndex === -1) {
    notFound();
  }

  const topic = javaTopics[topicIndex];
  const category = topicCategories.find((c) => c.id === topic.category);

  const sameCategoryTopics = javaTopics.filter(
    (t) => t.category === topic.category && t.id !== topic.id
  );

  const prevTopic = topicIndex > 0 ? javaTopics[topicIndex - 1] : null;
  const nextTopic =
    topicIndex < javaTopics.length - 1 ? javaTopics[topicIndex + 1] : null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/#topics"
          className="inline-flex items-center text-sm text-[#626264] hover:text-[var(--color-dads-blue)] transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          トピック一覧に戻る
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
              <h1 className="text-3xl md:text-4xl font-bold">{topic.title}</h1>
              <Badge
                variant="outline"
                style={{ borderColor: category?.color, color: category?.color }}
              >
                {category?.name}
              </Badge>
            </div>
            <p className="text-lg text-[#626264]">{topic.description}</p>
          </motion.div>

          <div className="space-y-8 mb-12">
            {topic.sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">{section.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-[#626264] mb-4">
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
            {prevTopic ? (
              <Link href={`/topic/${prevTopic.id}`}>
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  {prevTopic.title}
                </Button>
              </Link>
            ) : (
              <div />
            )}
            {nextTopic ? (
              <Link href={`/topic/${nextTopic.id}`}>
                <Button variant="outline" className="gap-2">
                  {nextTopic.title}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>

        {/* Sidebar */}
        {sameCategoryTopics.length > 0 && (
          <div className="lg:w-64 shrink-0">
            <div className="sticky top-24">
              <h3 className="font-semibold mb-3 text-sm text-[#626264] uppercase tracking-wide">
                {category?.name}の関連トピック
              </h3>
              <div className="space-y-1">
                {sameCategoryTopics.map((t) => (
                  <Link
                    key={t.id}
                    href={`/topic/${t.id}`}
                    className="block px-3 py-2 text-sm rounded-lg hover:bg-[var(--color-dads-blue-light)] transition-colors"
                  >
                    {t.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
