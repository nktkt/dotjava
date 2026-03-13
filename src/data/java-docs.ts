export interface DocsSection {
  title: string;
  content: string;
  code?: string;
}

export interface DocsChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: DocsSection[];
}

export const docsCategories = [
  { id: "getting-started", name: "はじめに", color: "#2563EB" },
  { id: "language-basics", name: "言語の基本", color: "#7C3AED" },
  { id: "classes-objects", name: "クラスとオブジェクト", color: "#059669" },
  { id: "oop", name: "オブジェクト指向", color: "#D97706" },
  { id: "generics-lambdas", name: "ジェネリクスとラムダ", color: "#DC2626" },
  { id: "exceptions", name: "例外処理", color: "#9333EA" },
  { id: "collections", name: "コレクション", color: "#0891B2" },
  { id: "streams", name: "Stream API", color: "#4F46E5" },
  { id: "io", name: "入出力", color: "#B45309" },
  { id: "api", name: "標準API", color: "#0D9488" },
  { id: "concurrent", name: "並行処理", color: "#BE185D" },
  { id: "modules-jvm", name: "モジュールとJVM", color: "#475569" },
] as const;

// Split into separate files for maintainability
import { gettingStartedChapters } from "./docs/getting-started";
import { languageBasicsChapters } from "./docs/language-basics";
import { classesObjectsChapters } from "./docs/classes-objects";
import { oopChapters } from "./docs/oop";
import { genericsLambdasChapters } from "./docs/generics-lambdas";
import { exceptionsChapters } from "./docs/exceptions";
import { collectionsChapters } from "./docs/collections";
import { streamsChapters } from "./docs/streams";
import { ioChapters } from "./docs/io";
import { apiChapters } from "./docs/api";
import { concurrentChapters } from "./docs/concurrent";
import { modulesJvmChapters } from "./docs/modules-jvm";

export const docsChapters: DocsChapter[] = [
  ...gettingStartedChapters,
  ...languageBasicsChapters,
  ...classesObjectsChapters,
  ...oopChapters,
  ...genericsLambdasChapters,
  ...exceptionsChapters,
  ...collectionsChapters,
  ...streamsChapters,
  ...ioChapters,
  ...apiChapters,
  ...concurrentChapters,
  ...modulesJvmChapters,
];
