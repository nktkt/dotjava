"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { JavaVersion } from "@/data/java-versions";
import { ArrowRight, Calendar, Shield } from "lucide-react";

interface VersionCardProps {
  version: JavaVersion;
  index: number;
}

export function VersionCard({ version, index }: VersionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Link href={`/version/${version.id}`}>
        <Card className="group h-full cursor-pointer overflow-hidden border border-border transition-all hover:shadow-md hover:border-[var(--color-dads-blue)]">
          <div className="h-1" style={{ backgroundColor: version.color }} />
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg group-hover:text-[var(--color-dads-blue)] transition-colors">
                {version.name}
              </CardTitle>
              <div className="flex items-center gap-2">
                {version.lts && (
                  <Badge variant="secondary" className="bg-[var(--color-dads-success-light)] text-[var(--color-dads-success)] border border-[var(--color-dads-success)]/20 text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    LTS
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              {version.releaseDate}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {version.summary}
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {version.features.slice(0, 3).map((feature) => (
                <Badge key={feature.title} variant="outline" className="text-xs border-border">
                  {feature.title}
                </Badge>
              ))}
              {version.features.length > 3 && (
                <Badge variant="outline" className="text-xs border-border">
                  +{version.features.length - 3}
                </Badge>
              )}
            </div>
            <div className="flex items-center text-sm text-[var(--color-dads-blue)] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              詳しく見る
              <ArrowRight className="h-4 w-4 ml-1" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
