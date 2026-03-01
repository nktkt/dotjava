"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { JavaTopic } from "@/data/java-topics";
import { topicCategories } from "@/data/java-topics";
import { ArrowRight } from "lucide-react";

interface TopicCardProps {
  topic: JavaTopic;
  index: number;
}

export function TopicCard({ topic, index }: TopicCardProps) {
  const category = topicCategories.find((c) => c.id === topic.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      viewport={{ once: true, margin: "-30px" }}
    >
      <Link href={`/topic/${topic.id}`}>
        <Card className="group h-full cursor-pointer overflow-hidden border border-border transition-all hover:shadow-md hover:border-[var(--color-dads-blue)]">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg group-hover:text-[var(--color-dads-blue)] transition-colors">
                {topic.title}
              </CardTitle>
              <Badge
                variant="outline"
                className="text-xs shrink-0"
                style={{ borderColor: category?.color, color: category?.color }}
              >
                {category?.name}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {topic.description}
            </p>
            <div className="flex items-center text-sm text-[var(--color-dads-blue)] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              学習する
              <ArrowRight className="h-4 w-4 ml-1" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
