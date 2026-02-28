# Java Learning Site

A comprehensive Java learning reference site covering Java 8 through Java 24, built with Next.js, shadcn/ui, and Motion. Styled with the [Japan Digital Agency Design System (DADS)](https://design.digital.go.jp/dads/).

## Features

- **Version Guides** — Detailed feature breakdowns for every Java release from Java 8 to Java 24 (17 versions), with code examples for each feature
- **Topic-Based Learning** — 15+ core Java topics across 6 categories (basics, OOP, collections, concurrency, I/O, advanced)
- **Web Development Guide** — 20+ chapters covering HTTP fundamentals, Servlet/JSP, Spring Boot, JPA, Spring Security, REST API, testing, Docker deployment, and Apache Tomcat
- **I/O Guide** — 12 chapters on streams, file operations, CSV, JSON, XML, Excel, network I/O, and character encoding
- **Glossary** — 65 searchable/filterable Java terms with code examples and cross-references
- **Learning Roadmap** — 5-step progression from beginner to expert

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 16 (App Router, Turbopack)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Motion](https://motion.dev/) (Framer Motion)
- **Styling**: Tailwind CSS v4 with [DADS](https://design.digital.go.jp/dads/) design tokens
- **Font**: Noto Sans JP
- **Icons**: Lucide React
- **Runtime**: [Bun](https://bun.sh/)
- **Language**: TypeScript

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) v1.0+
- Node.js 18+ (for Next.js compatibility)

### Installation

```bash
git clone https://github.com/nktkt/dotjava.git
cd dotjava
bun install
```

### Development

```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
bun run build
bun run start
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Home page
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # DADS design tokens
│   ├── glossary/page.tsx           # Glossary page
│   ├── io/
│   │   ├── page.tsx                # I/O guide overview
│   │   └── [chapterId]/page.tsx    # I/O chapter detail
│   ├── web/
│   │   ├── page.tsx                # Web dev guide overview
│   │   └── [chapterId]/page.tsx    # Web chapter detail
│   ├── version/
│   │   └── [versionId]/page.tsx    # Version detail
│   └── topic/
│       └── [topicId]/page.tsx      # Topic detail
├── components/
│   ├── header.tsx                  # Navigation header
│   ├── hero.tsx                    # Hero section
│   ├── version-card.tsx            # Version card
│   ├── topic-card.tsx              # Topic card
│   ├── version-timeline.tsx        # Version timeline
│   ├── roadmap.tsx                 # Learning roadmap
│   ├── code-block.tsx              # Code display with copy
│   ├── footer.tsx                  # Footer
│   └── ui/                         # shadcn/ui components
├── data/
│   ├── java-versions.ts            # Java 8-24 version data
│   ├── java-topics.ts              # Core Java topics
│   ├── java-web.ts                 # Web development chapters
│   ├── java-io.ts                  # I/O chapters
│   └── glossary.ts                 # Glossary terms
└── lib/
    └── utils.ts                    # Utility functions
```

## Design System

This site implements the [Japan Digital Agency Design System (DADS)](https://design.digital.go.jp/dads/) v2:

- **Primary**: `#0017C1` (Digital Agency Blue)
- **Typography**: Noto Sans JP, min 14px, body line-height 1.75
- **Spacing**: 8px grid base
- **Border radius**: 5 levels (0/8/12/16/32px)
- **Contrast**: Minimum 4.5:1 ratio

## License

MIT
