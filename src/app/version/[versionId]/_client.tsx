"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import { javaVersions } from "@/data/java-versions";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Shield,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VersionClientPage({
  versionId,
}: {
  versionId: string;
}) {
  const versionIndex = javaVersions.findIndex((v) => v.id === versionId);

  if (versionIndex === -1) {
    notFound();
  }

  const version = javaVersions[versionIndex];
  const prevVersion = versionIndex > 0 ? javaVersions[versionIndex - 1] : null;
  const nextVersion =
    versionIndex < javaVersions.length - 1
      ? javaVersions[versionIndex + 1]
      : null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6">
        <Link
          href="/#versions"
          className="inline-flex items-center text-sm text-[#626264] hover:text-[var(--color-dads-blue)] transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          バージョン一覧に戻る
        </Link>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-3 h-10 rounded-full"
            style={{ backgroundColor: version.color }}
          />
          <h1 className="text-4xl md:text-5xl font-bold">{version.name}</h1>
          {version.lts && (
            <Badge className="bg-[var(--color-dads-success-light)] text-[var(--color-dads-success)] border-[var(--color-dads-success)]/20 ml-2">
              <Shield className="h-3.5 w-3.5 mr-1" />
              LTS
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-[#626264] mb-4 ml-6">
          <Calendar className="h-4 w-4" />
          <span>{version.releaseDate} リリース</span>
        </div>
        <p className="text-lg text-[#626264] ml-6 max-w-3xl">
          {version.summary}
        </p>
      </motion.div>

      {/* Features */}
      <div className="space-y-8 mb-12">
        {version.features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                    style={{ backgroundColor: version.color }}
                  >
                    {index + 1}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-[#626264] mb-4">
                  {feature.description}
                </p>
                {feature.code && <CodeBlock code={feature.code} />}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Separator className="mb-8" />

      {/* Navigation */}
      <div className="flex justify-between items-center">
        {prevVersion ? (
          <Link href={`/version/${prevVersion.id}`}>
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {prevVersion.name}
            </Button>
          </Link>
        ) : (
          <div />
        )}
        {nextVersion ? (
          <Link href={`/version/${nextVersion.id}`}>
            <Button variant="outline" className="gap-2">
              {nextVersion.name}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
