"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { awsChapters, awsCategories } from "@/data/aws";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, ArrowRight } from "lucide-react";

export default function AwsClientPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-dads-warning-light)] mb-4">
          <Cloud className="h-8 w-8 text-[var(--color-dads-warning)]" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">AWS 学習</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Amazon Web Servicesの主要サービスを体系的に学習。コンピューティング、ストレージ、データベース、ネットワーキング、セキュリティ、コンテナ、DevOps、監視、AI/ML、アーキテクチャ設計まで幅広くカバーします。
        </p>
      </motion.div>

      {/* Categories */}
      <div className="space-y-12 mb-16">
        {awsCategories.map((category, catIndex) => {
          const chapters = awsChapters.filter(
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
                  <Link key={chapter.id} href={`/aws/${chapter.id}`}>
                    <Card className="group h-full cursor-pointer border border-border transition-all hover:shadow-md hover:border-[var(--color-dads-warning)]">
                      <CardContent className="py-6">
                        <h3 className="text-lg font-bold mb-2 group-hover:text-[var(--color-dads-warning)] transition-colors flex items-center justify-between">
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

      {/* Learning Path */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-muted rounded-2xl p-8 text-center"
      >
        <h2 className="text-2xl font-bold mb-3">学習の進め方</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
          まずIAM・VPC・EC2・S3の基礎を押さえ、次にRDS・Lambdaなどの主要サービスを学習。その後、ECS/Fargate、CloudFormation、CloudWatchなどの運用系サービスに進み、最後にWell-Architectedフレームワークで全体設計を学びましょう。
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {awsCategories.map((cat) => (
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
