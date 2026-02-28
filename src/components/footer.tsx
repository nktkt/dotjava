import { Coffee } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t border-[#D9DBE0] bg-[#F8F9FB]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Coffee className="h-5 w-5 text-[var(--color-dads-blue)]" />
            <span className="font-semibold">Java学習サイト</span>
          </div>
          <p className="text-sm text-[#626264] text-center">
            Java 8 ~ Java 24 の全機能を網羅した学習リファレンス
          </p>
        </div>
      </div>
    </footer>
  );
}
