import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold tracking-tighter text-lg">CL</span>
          <p className="text-sm text-muted-foreground text-center">
            エンジニアのための技術学習リファレンス
          </p>
        </div>
      </div>
    </footer>
  );
}
