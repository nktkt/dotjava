"use client";

import { motion } from "motion/react";
import { javaVersions } from "@/data/java-versions";
import { Shield } from "lucide-react";
import Link from "next/link";

export function VersionTimeline() {
  return (
    <div className="relative">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#D9DBE0] md:-translate-x-px" />
      <div className="space-y-8">
        {javaVersions.map((version, index) => (
          <motion.div
            key={version.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            viewport={{ once: true, margin: "-50px" }}
            className={`relative flex items-center ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full border-2 border-background -translate-x-1.5 md:-translate-x-1.5 z-10"
              style={{ backgroundColor: version.color }}
            />
            <div className={`ml-10 md:ml-0 md:w-1/2 ${
              index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
            }`}>
              <Link href={`/version/${version.id}`} className="group block">
                <div className="inline-flex items-center gap-2 mb-1">
                  <span className="text-lg font-bold group-hover:text-[var(--color-dads-blue)] transition-colors">
                    {version.name}
                  </span>
                  {version.lts && (
                    <span className="inline-flex items-center text-xs text-[var(--color-dads-success)] bg-[var(--color-dads-success-light)] px-1.5 py-0.5 rounded">
                      <Shield className="h-3 w-3 mr-0.5" />LTS
                    </span>
                  )}
                </div>
                <div className="text-sm text-[#626264]">{version.releaseDate}</div>
                <p className="text-sm text-[#626264] mt-1 line-clamp-2">{version.summary}</p>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
