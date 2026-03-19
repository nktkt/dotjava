export interface PerformanceSection {
  title: string;
  content: string;
  code?: string;
}

export interface PerformanceChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: PerformanceSection[];
}

export const performanceCategories = [
  { id: "jvm", name: "JVM・GC", color: "#DC2626" },
  { id: "profiling", name: "プロファイリング", color: "#2563EB" },
  { id: "optimization", name: "最適化", color: "#059669" },
] as const;

export const performanceChapters: PerformanceChapter[] = [
  // ===== JVM・GC =====
  {
    id: "jvm-architecture",
    title: "JVMアーキテクチャ",
    category: "jvm",
    description:
      "ヒープ・スタック・メタスペースの構造、クラスローダの仕組み、JITコンパイラの最適化を理解する",
    sections: [
      {
        title: "JVMのメモリ構造",
        content:
          "JVM（Java Virtual Machine）は、Javaバイトコードを実行するための仮想マシンです。メモリは大きく分けてヒープ領域、スタック領域、メタスペース、ネイティブメモリに分類されます。ヒープはオブジェクトの格納場所で GC の対象、スタックはスレッドごとに確保されメソッド呼び出しのフレームを管理します。メタスペースはクラスメタデータを保持し、Java 8 以降は Permanent Generation に代わってネイティブメモリ上に配置されます。",
        code: `// JVMメモリ領域の確認
public class JvmMemoryInfo {
    public static void main(String[] args) {
        Runtime runtime = Runtime.getRuntime();

        // ヒープメモリの情報を取得
        long maxMemory = runtime.maxMemory();       // -Xmx で設定した最大値
        long totalMemory = runtime.totalMemory();   // 現在確保済みのヒープ
        long freeMemory = runtime.freeMemory();     // 未使用のヒープ
        long usedMemory = totalMemory - freeMemory; // 使用中のヒープ

        System.out.println("=== JVM ヒープメモリ情報 ===");
        System.out.printf("最大ヒープ: %,d MB%n", maxMemory / 1024 / 1024);
        System.out.printf("確保済み:   %,d MB%n", totalMemory / 1024 / 1024);
        System.out.printf("使用中:     %,d MB%n", usedMemory / 1024 / 1024);
        System.out.printf("空き:       %,d MB%n", freeMemory / 1024 / 1024);

        // メタスペース等はMXBeanで取得
        var memoryMXBean = java.lang.management.ManagementFactory.getMemoryMXBean();
        var nonHeap = memoryMXBean.getNonHeapMemoryUsage();
        System.out.printf("非ヒープ使用: %,d MB%n", nonHeap.getUsed() / 1024 / 1024);
    }
}`,
      },
      {
        title: "ヒープ領域の世代構造",
        content:
          "ヒープは Young 世代と Old 世代に分かれます。Young 世代はさらに Eden 領域と 2 つの Survivor 領域（S0・S1）で構成されます。新しいオブジェクトは Eden に作成され、Minor GC で生き残ったオブジェクトが Survivor に移動します。一定回数の GC を生き残ると Old 世代に昇格（Promotion）します。この世代別管理により、短命なオブジェクトを効率的に回収できます。",
        code: `// Young世代・Old世代の使用状況をMXBeanで確認
import java.lang.management.ManagementFactory;
import java.lang.management.MemoryPoolMXBean;

public class HeapGenerationInfo {
    public static void main(String[] args) {
        System.out.println("=== ヒープ世代別メモリ使用状況 ===");

        for (MemoryPoolMXBean pool : ManagementFactory.getMemoryPoolMXBeans()) {
            String name = pool.getName();
            long used = pool.getUsage().getUsed() / 1024;
            long max = pool.getUsage().getMax() / 1024;

            // Eden, Survivor, Old 領域を表示
            if (name.contains("Eden") || name.contains("Survivor")
                    || name.contains("Old") || name.contains("Tenured")) {
                System.out.printf("%-30s 使用: %,8d KB / 最大: %,8d KB%n",
                    name, used, max);
            }
        }
        // 大量の短命オブジェクトを生成してMinor GCを誘発
        for (int i = 0; i < 100_000; i++) {
            byte[] tmp = new byte[1024]; // Eden に確保→すぐGC対象
        }
        System.out.println("短命オブジェクト生成完了");
    }
}`,
      },
      {
        title: "スタック領域とスレッド",
        content:
          "各スレッドは独自のスタック領域を持ちます。スタックにはメソッド呼び出しごとのフレーム（ローカル変数、オペランドスタック、フレームデータ）が積まれます。スタックサイズは -Xss オプションで設定でき、深い再帰呼び出しで StackOverflowError が発生する場合は調整が必要です。プリミティブ型のローカル変数はスタックに、オブジェクトの参照もスタックに格納されますが、オブジェクト本体はヒープにあります。",
      },
      {
        title: "クラスローダの仕組み",
        content:
          "クラスローダは、.class ファイルを読み込んで JVM にロードする仕組みです。Bootstrap ClassLoader（rt.jar等）、Platform ClassLoader（拡張ライブラリ）、Application ClassLoader（クラスパス上のクラス）の3階層で構成されます。親委譲モデル（Parent Delegation Model）により、まず親のクラスローダに委譲し、見つからなければ自身でロードします。Spring Boot や Tomcat では独自のクラスローダでホットリロードを実現しています。",
        code: `// クラスローダの階層を確認する
public class ClassLoaderDemo {
    public static void main(String[] args) {
        // アプリケーションクラスのローダを確認
        ClassLoader appLoader = ClassLoaderDemo.class.getClassLoader();
        System.out.println("アプリクラスローダ: " + appLoader);

        // 親ローダの階層をたどる
        ClassLoader current = appLoader;
        while (current != null) {
            System.out.println("  親: " + current);
            current = current.getParent();
        }
        System.out.println("  親: Bootstrap ClassLoader (null)");

        // 標準ライブラリのクラスローダ
        System.out.println("String のローダ: "
            + String.class.getClassLoader()); // null = Bootstrap

        // カスタムクラスローダの例
        System.out.println("現在のコンテキストローダ: "
            + Thread.currentThread().getContextClassLoader());
    }
}`,
      },
      {
        title: "JITコンパイラ",
        content:
          "JIT（Just-In-Time）コンパイラは、頻繁に実行されるバイトコードをネイティブコードに変換して性能を向上させます。HotSpot VM では C1（クライアント）コンパイラと C2（サーバー）コンパイラの段階的コンパイル（Tiered Compilation）が使われます。インライン化、ループ最適化、エスケープ解析などの最適化が適用されます。-XX:+PrintCompilation で JIT コンパイルの様子を観察できます。GraalVM の Graal コンパイラはさらに高度な最適化を提供します。",
        code: `// JITコンパイルの効果を観察する
// 実行: java -XX:+PrintCompilation JitDemo
public class JitDemo {
    // この計算メソッドはJITで最適化される
    static long calculate(int n) {
        long sum = 0;
        for (int i = 0; i < n; i++) {
            sum += i * i; // ループ最適化の対象
        }
        return sum;
    }

    public static void main(String[] args) {
        // ウォームアップ: JITコンパイルを促す
        for (int i = 0; i < 10_000; i++) {
            calculate(1000); // 繰り返し呼び出しでホットメソッドに
        }

        // 計測: JIT最適化後は高速
        long start = System.nanoTime();
        long result = calculate(10_000_000);
        long elapsed = System.nanoTime() - start;

        System.out.printf("結果: %,d%n", result);
        System.out.printf("実行時間: %.2f ms（JIT最適化済み）%n",
            elapsed / 1_000_000.0);
    }
}`,
      },
    ],
  },
  {
    id: "gc-algorithms",
    title: "GCアルゴリズム",
    category: "jvm",
    description:
      "Serial・Parallel・G1・ZGC・Shenandoahの特徴と世代別GCの仕組み、適切なGCの選び方",
    sections: [
      {
        title: "世代別GCの基本",
        content:
          "Java の GC は世代別仮説（ほとんどのオブジェクトは短命である）に基づいて設計されています。Young 世代の GC（Minor GC）は頻繁かつ高速に実行され、Eden 領域がいっぱいになると発生します。Old 世代の GC（Major GC / Full GC）はヒープ全体を対象とするため時間がかかります。Stop-the-World（STW）はアプリケーションスレッドが一時停止する期間で、これを最小化することが GC チューニングの目標です。",
        code: `// GCの動作をログで確認する
// 実行オプション: java -verbose:gc -Xlog:gc*:file=gc.log:time,tags
//   -Xmx256m -Xms256m GcObserver

public class GcObserver {
    public static void main(String[] args) {
        var list = new java.util.ArrayList<byte[]>();

        System.out.println("=== GC動作の観察 ===");
        for (int i = 0; i < 1000; i++) {
            // 1MBのオブジェクトを繰り返し確保
            list.add(new byte[1024 * 1024]);

            if (list.size() > 50) {
                list.subList(0, 25).clear(); // 古いオブジェクトを解放
            }
            if (i % 100 == 0) {
                long used = Runtime.getRuntime().totalMemory()
                    - Runtime.getRuntime().freeMemory();
                System.out.printf("ループ %d: 使用メモリ %,d KB%n",
                    i, used / 1024);
            }
        }
    }
}`,
      },
      {
        title: "Serial GCとParallel GC",
        content:
          "Serial GC（-XX:+UseSerialGC）はシングルスレッドで GC を実行するシンプルなコレクタで、小さなヒープやシングルコア環境に適しています。Parallel GC（-XX:+UseParallelGC）は複数スレッドで Young/Old 世代の GC を並列に実行し、スループット（アプリケーション実行時間の割合）を最大化します。Java 8 のデフォルト GC であり、バッチ処理やバックエンドの大量データ処理に向いています。停止時間よりもスループットを重視する場合に選択します。",
      },
      {
        title: "G1 GC",
        content:
          "G1 GC（Garbage-First、-XX:+UseG1GC）は Java 9 以降のデフォルト GC です。ヒープをリージョン（Region）という固定サイズのブロックに分割し、ゴミの多いリージョンから優先的に回収します。停止時間の目標値を -XX:MaxGCPauseMillis で指定でき、レイテンシとスループットのバランスを取ります。Mixed GC により Young と Old を同時に回収可能で、大きなヒープ（4GB以上）で特に効果を発揮します。",
        code: `// G1 GCの設定例と監視
// 起動オプション:
//   java -XX:+UseG1GC
//        -XX:MaxGCPauseMillis=200
//        -XX:G1HeapRegionSize=4m
//        -Xlog:gc*:file=g1gc.log:time,tags
//        G1GcDemo

public class G1GcDemo {
    public static void main(String[] args) throws Exception {
        // GC情報をMXBeanで取得
        var gcBeans = java.lang.management.ManagementFactory
            .getGarbageCollectorMXBeans();

        for (var gc : gcBeans) {
            System.out.printf("GC名: %-30s 回数: %d 累積時間: %d ms%n",
                gc.getName(), gc.getCollectionCount(),
                gc.getCollectionTime());
        }

        // メモリ負荷をかけてG1 GCの動作を確認
        var cache = new java.util.LinkedHashMap<Integer, byte[]>();
        for (int i = 0; i < 5000; i++) {
            cache.put(i, new byte[4096]); // 4KB × 5000 = 20MB
            if (cache.size() > 1000) {
                cache.remove(cache.keySet().iterator().next());
            }
        }
        System.out.println("処理完了。GCログを確認してください。");
    }
}`,
      },
      {
        title: "ZGCとShenandoah",
        content:
          "ZGC（-XX:+UseZGC）は低レイテンシを追求した GC で、停止時間を数ミリ秒以下に抑えます。テラバイト級のヒープにも対応し、Java 15 で正式採用されました。カラーポインタとロードバリアにより、ほぼ全ての処理をコンカレントに実行します。Shenandoah（-XX:+UseShenandoahGC）も同様に低レイテンシを目指す GC で、OpenJDK で利用可能です。コンカレントコンパクションにより、ヒープサイズに関係なく一定の停止時間を実現します。リアルタイム性が求められるアプリケーションに最適です。",
        code: `// ZGCとShenandoahの起動オプション比較
// === ZGC ===
// java -XX:+UseZGC
//      -XX:+ZGenerational        # 世代別ZGC（Java 21+推奨）
//      -Xmx4g -Xms4g
//      -Xlog:gc*:file=zgc.log
//      MyApp

// === Shenandoah ===
// java -XX:+UseShenandoahGC
//      -XX:ShenandoahGCHeuristics=adaptive
//      -Xmx4g -Xms4g
//      -Xlog:gc*:file=shenandoah.log
//      MyApp

public class LowLatencyGcCheck {
    public static void main(String[] args) {
        // 使用中のGCを確認
        var gcBeans = java.lang.management.ManagementFactory
            .getGarbageCollectorMXBeans();
        System.out.println("=== 現在使用中のGC ===");
        for (var gc : gcBeans) {
            System.out.println("GC: " + gc.getName());
            System.out.println("  対象領域: "
                + String.join(", ", gc.getMemoryPoolNames()));
        }
        // JVMバージョン確認
        System.out.println("JVM: " + System.getProperty("java.vm.name")
            + " " + System.getProperty("java.vm.version"));
    }
}`,
      },
      {
        title: "GCの選び方ガイド",
        content:
          "GC の選択はアプリケーションの要件で決まります。スループット重視（バッチ処理）なら Parallel GC、一般的な Web アプリなら G1 GC（デフォルト）、低レイテンシが最優先（リアルタイム系）なら ZGC または Shenandoah を選びます。ヒープサイズが小さい（数百MB以下）場合は Serial GC でも十分です。判断基準は (1) 許容できる最大停止時間、(2) ヒープサイズ、(3) CPU コア数、(4) スループット要件の4点です。まず G1 GC で運用し、GC ログを分析して必要に応じて切り替えるのが実践的です。",
      },
    ],
  },
  {
    id: "jvm-tuning",
    title: "JVMチューニング",
    category: "jvm",
    description:
      "-Xmx/-Xms設定、GCログ分析、パフォーマンスパラメータの設定ガイド",
    sections: [
      {
        title: "ヒープサイズの設定",
        content:
          "JVM チューニングの基本はヒープサイズの適切な設定です。-Xmx（最大ヒープ）と -Xms（初期ヒープ）を同じ値にすることで、ヒープの拡張・縮小によるオーバーヘッドを防ぎます。一般的にはサーバーの物理メモリの 50〜75% を目安にします。-Xmn で Young 世代のサイズ、-XX:NewRatio で Young と Old の比率を調整できます。コンテナ環境では -XX:MaxRAMPercentage を使うと柔軟にメモリを設定できます。",
        code: `// JVM起動パラメータの推奨設定例
// === 一般的なWebアプリケーション（4GBメモリ環境）===
// java -Xmx2g -Xms2g
//      -XX:+UseG1GC
//      -XX:MaxGCPauseMillis=200
//      -XX:+HeapDumpOnOutOfMemoryError
//      -XX:HeapDumpPath=/var/log/app/heapdump.hprof
//      -jar app.jar

// === Docker/Kubernetes環境 ===
// java -XX:MaxRAMPercentage=75.0
//      -XX:InitialRAMPercentage=75.0
//      -XX:+UseG1GC
//      -XX:+ExitOnOutOfMemoryError
//      -jar app.jar

// === 大規模バッチ処理 ===
// java -Xmx8g -Xms8g
//      -XX:+UseParallelGC
//      -XX:ParallelGCThreads=8
//      -XX:+UseCompressedOops
//      -jar batch.jar

// プログラムからVM引数を確認
public class VmArgsCheck {
    public static void main(String[] args) {
        var vmArgs = java.lang.management.ManagementFactory
            .getRuntimeMXBean().getInputArguments();
        System.out.println("=== JVM起動引数 ===");
        vmArgs.forEach(System.out::println);
    }
}`,
      },
      {
        title: "GCログの有効化と読み方",
        content:
          "GC ログはパフォーマンス問題の診断に不可欠です。Java 9 以降は統合ログフレームワーク（-Xlog）を使用します。-Xlog:gc*:file=gc.log:time,tags でタイムスタンプ付きの詳細ログを出力できます。ログからは GC の種類、停止時間、回収量、ヒープ使用量の推移を読み取れます。GCViewer や GCEasy などのツールでグラフ化すると傾向を把握しやすくなります。",
        code: `// GCログの設定と分析ポイント
// === GCログ有効化（Java 17+） ===
// java -Xlog:gc*:file=gc.log:time,uptime,tags,level
//      -Xlog:gc+heap=debug:file=gc-heap.log
//      -Xlog:gc+age=trace:file=gc-age.log
//      -jar app.jar

// GCログの出力例（G1 GC）:
// [2024-01-15T10:30:00.123+0900] GC(42) Pause Young (Normal)
//   (G1 Evacuation Pause)
// [2024-01-15T10:30:00.123+0900] GC(42)   Eden: 256M -> 0B
//   Survivors: 32M -> 32M  Old: 512M -> 520M
// [2024-01-15T10:30:00.135+0900] GC(42) Pause Young 800M->552M(2048M)
//   12.345ms

// 分析時の注目ポイント:
// 1. GC頻度: Minor GCが頻発 → Eden が小さすぎる
// 2. 停止時間: Full GCが長い → Old世代が溢れている
// 3. 昇格量: Survivor → Old が多い → 閾値の調整が必要
// 4. ヒープ使用量: 右肩上がり → メモリリークの疑い

public class GcLogAnalysisHint {
    public static void main(String[] args) {
        System.out.println("GCログ解析ツール: GCEasy (https://gceasy.io)");
        System.out.println("GCViewer: オフラインで使えるOSSツール");
    }
}`,
      },
      {
        title: "G1 GCのチューニングパラメータ",
        content:
          "G1 GC のチューニングでは、まず -XX:MaxGCPauseMillis（停止時間目標、デフォルト200ms）を設定します。リージョンサイズは -XX:G1HeapRegionSize で 1MB〜32MB の範囲で設定でき、大きなオブジェクトが多い場合は大きめにします。-XX:InitiatingHeapOccupancyPercent（IHOP）はコンカレントマーキング開始のヒープ使用率で、デフォルト45%です。頻繁に Full GC が発生する場合は IHOP を下げて早めにマーキングを開始させます。",
        code: `// G1 GC チューニング設定例
// === レイテンシ重視の設定 ===
// java -XX:+UseG1GC
//      -XX:MaxGCPauseMillis=100         # 停止目標100ms
//      -XX:G1HeapRegionSize=4m          # リージョン4MB
//      -XX:InitiatingHeapOccupancyPercent=35  # 早めにマーキング
//      -XX:G1ReservePercent=15          # 昇格失敗防止の予約
//      -XX:ConcGCThreads=4              # コンカレントGCスレッド数
//      -Xmx4g -Xms4g
//      -jar app.jar

// === スループット重視の設定 ===
// java -XX:+UseG1GC
//      -XX:MaxGCPauseMillis=500         # 停止目標を緩く
//      -XX:G1HeapRegionSize=16m         # リージョンを大きく
//      -XX:InitiatingHeapOccupancyPercent=60
//      -XX:ParallelGCThreads=8          # 並列GCスレッド数
//      -Xmx8g -Xms8g
//      -jar batch.jar

public class G1TuningCheck {
    public static void main(String[] args) {
        // 現在のG1 GC設定を確認（要: -XX:+PrintFlagsFinal）
        System.out.println("推奨: まずデフォルトで運用し、");
        System.out.println("GCログを分析してからチューニングする");
    }
}`,
      },
      {
        title: "OOMエラー対策",
        content:
          "OutOfMemoryError はヒープ不足、メタスペース不足、ネイティブメモリ不足など複数の原因で発生します。-XX:+HeapDumpOnOutOfMemoryError で OOM 発生時に自動的にヒープダンプを取得し、原因分析に役立てます。-XX:+ExitOnOutOfMemoryError を設定すると OOM 発生時に即座にプロセスを終了し、コンテナ環境でのオーケストレータによる再起動を促進します。メタスペース不足は -XX:MaxMetaspaceSize で上限を設定し、クラスの動的生成が多い場合に調整します。",
        code: `// OOM対策の起動オプションと監視
// java -XX:+HeapDumpOnOutOfMemoryError
//      -XX:HeapDumpPath=/var/log/app/
//      -XX:+ExitOnOutOfMemoryError
//      -XX:MaxMetaspaceSize=256m
//      -jar app.jar

import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.lang.management.MemoryUsage;

public class OomMonitor {
    public static void main(String[] args) {
        MemoryMXBean memBean = ManagementFactory.getMemoryMXBean();

        // ヒープ使用率を監視
        MemoryUsage heap = memBean.getHeapMemoryUsage();
        double usagePercent = (double) heap.getUsed() / heap.getMax() * 100;

        System.out.printf("ヒープ使用率: %.1f%%%n", usagePercent);
        if (usagePercent > 80) {
            System.out.println("警告: ヒープ使用率が80%%を超えています！");
        }

        // メタスペース監視
        MemoryUsage nonHeap = memBean.getNonHeapMemoryUsage();
        System.out.printf("非ヒープ使用: %,d KB%n", nonHeap.getUsed() / 1024);
    }
}`,
      },
      {
        title: "パラメータ設定ガイド",
        content:
          "JVM パラメータは用途に応じて体系的に設定します。メモリ系（-Xmx, -Xms, -Xmn, -XX:MaxMetaspaceSize）、GC 系（-XX:+UseG1GC, -XX:MaxGCPauseMillis）、診断系（-XX:+HeapDumpOnOutOfMemoryError, -Xlog:gc*）、パフォーマンス系（-XX:+UseCompressedOops, -XX:+TieredCompilation）に分類して整理します。本番環境では必ず GC ログを有効にし、定期的に分析する運用フローを確立しましょう。",
        code: `// 本番環境向け推奨JVMパラメータテンプレート
// === Spring Boot Webアプリ（Kubernetes）===
// ENV JAVA_OPTS="\\
//   -XX:MaxRAMPercentage=75.0 \\
//   -XX:InitialRAMPercentage=75.0 \\
//   -XX:+UseG1GC \\
//   -XX:MaxGCPauseMillis=200 \\
//   -XX:+HeapDumpOnOutOfMemoryError \\
//   -XX:HeapDumpPath=/tmp/heapdump.hprof \\
//   -XX:+ExitOnOutOfMemoryError \\
//   -Xlog:gc*:file=/var/log/gc.log:time,tags:filecount=5,filesize=10m \\
//   -XX:+UseCompressedOops \\
//   -Djava.security.egd=file:/dev/./urandom"

// Dockerfileの例
// FROM eclipse-temurin:21-jre-alpine
// COPY target/app.jar /app.jar
// ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app.jar"]

public class ParamTemplate {
    public static void main(String[] args) {
        System.out.println("=== JVMパラメータカテゴリ ===");
        System.out.println("メモリ:    -Xmx, -Xms, -XX:MaxMetaspaceSize");
        System.out.println("GC:       -XX:+UseG1GC, -XX:MaxGCPauseMillis");
        System.out.println("診断:     -XX:+HeapDumpOnOutOfMemoryError");
        System.out.println("ログ:     -Xlog:gc*:file=gc.log");
        System.out.println("最適化:   -XX:+UseCompressedOops");
    }
}`,
      },
    ],
  },

  // ===== プロファイリング =====
  {
    id: "profiling-tools",
    title: "プロファイリングツール",
    category: "profiling",
    description:
      "JFR、async-profiler、VisualVM、フレームグラフを使ったパフォーマンス分析",
    sections: [
      {
        title: "JFR（Java Flight Recorder）",
        content:
          "JFR は JDK に組み込まれた低オーバーヘッドのプロファイリングツールです。CPU 使用率、メモリ割り当て、GC イベント、スレッドの状態、I/O 操作など多岐にわたるイベントを記録できます。本番環境でも安全に使用でき（オーバーヘッド1%未満）、JDK Mission Control（JMC）で記録データを分析します。Java 11 以降はオープンソースで利用可能です。",
        code: `// JFRの起動方法と基本設定
// === コマンドラインから記録開始 ===
// java -XX:StartFlightRecording=duration=60s,
//      filename=recording.jfr,settings=profile
//      -jar app.jar

// === jcmdで実行中のJVMに接続 ===
// jcmd <PID> JFR.start name=myRecording
//      duration=120s filename=my.jfr
// jcmd <PID> JFR.dump name=myRecording
//      filename=dump.jfr
// jcmd <PID> JFR.stop name=myRecording

// === プログラムからJFRを制御 ===
import jdk.jfr.Recording;
import jdk.jfr.Configuration;
import java.nio.file.Path;

public class JfrProgrammatic {
    public static void main(String[] args) throws Exception {
        // プロファイル設定で記録を開始
        Configuration config = Configuration.getConfiguration("profile");
        try (Recording recording = new Recording(config)) {
            recording.start();
            System.out.println("JFR記録を開始しました");

            // アプリケーション処理を実行
            Thread.sleep(10_000); // 10秒間記録

            recording.stop();
            recording.dump(Path.of("app-recording.jfr"));
            System.out.println("JFR記録をファイルに保存しました");
        }
    }
}`,
      },
      {
        title: "async-profiler",
        content:
          "async-profiler は Linux/macOS で動作する低オーバーヘッドのサンプリングプロファイラです。CPU プロファイリング、メモリアロケーション分析、ロック競合分析が可能で、perf_events を利用して正確なスタックトレースを取得します。JFR 形式での出力やフレームグラフの直接生成をサポートし、Safepoint バイアスがないため JVM 標準のプロファイラより正確な結果を得られます。",
        code: `// async-profilerの使い方
// === インストール ===
// wget https://github.com/async-profiler/async-profiler/
//      releases/latest/download/async-profiler-linux-x64.tar.gz
// tar xf async-profiler-linux-x64.tar.gz

// === CPU プロファイリング ===
// ./asprof -d 30 -f cpu-profile.html <PID>
//   -d 30: 30秒間サンプリング
//   -f: 出力ファイル（.html でフレームグラフ）

// === メモリアロケーション分析 ===
// ./asprof -e alloc -d 30 -f alloc.html <PID>

// === ロック競合分析 ===
// ./asprof -e lock -d 30 -f lock.html <PID>

// === Javaアプリ起動時に組み込み ===
// java -agentpath:/path/to/libasyncProfiler.so=\\
//      start,event=cpu,file=profile.jfr
//      -jar app.jar

// === JFR形式で出力してJMCで分析 ===
// ./asprof -d 60 -o jfr -f output.jfr <PID>

public class AsyncProfilerTarget {
    // このメソッドがホットスポットとしてプロファイルに現れる
    public static void main(String[] args) {
        System.out.println("PID: " + ProcessHandle.current().pid());
        System.out.println("async-profilerでプロファイル可能です");
    }
}`,
      },
      {
        title: "VisualVM",
        content:
          "VisualVM はローカルおよびリモートの JVM を監視・プロファイリングする GUI ツールです。CPU/メモリ使用量のリアルタイム監視、ヒープダンプの取得と分析、スレッドダンプの取得、サンプリングプロファイリングが可能です。プラグインで機能を拡張でき、JMX 経由でリモート JVM にも接続できます。開発時の手軽なパフォーマンス分析に最適です。",
        code: `// VisualVMでリモートJVMに接続するための設定
// === アプリケーション側のJMX設定 ===
// java -Dcom.sun.management.jmxremote
//      -Dcom.sun.management.jmxremote.port=9090
//      -Dcom.sun.management.jmxremote.ssl=false
//      -Dcom.sun.management.jmxremote.authenticate=false
//      -Djava.rmi.server.hostname=192.168.1.100
//      -jar app.jar

// === Spring Bootの場合（application.yml） ===
// management:
//   endpoints:
//     jmx:
//       exposure:
//         include: "*"

// MXBeanでプログラムから監視情報を取得
import java.lang.management.ManagementFactory;
import java.lang.management.ThreadMXBean;

public class MonitoringInfo {
    public static void main(String[] args) {
        ThreadMXBean threadBean = ManagementFactory.getThreadMXBean();

        System.out.println("=== スレッド情報 ===");
        System.out.println("スレッド数: " + threadBean.getThreadCount());
        System.out.println("ピーク:     " + threadBean.getPeakThreadCount());
        System.out.println("デーモン:   " + threadBean.getDaemonThreadCount());

        // デッドロック検出
        long[] deadlocked = threadBean.findDeadlockedThreads();
        if (deadlocked != null) {
            System.out.println("デッドロック検出！ スレッド数: " + deadlocked.length);
        } else {
            System.out.println("デッドロックなし");
        }
    }
}`,
      },
      {
        title: "フレームグラフの読み方",
        content:
          "フレームグラフはプロファイリング結果を視覚化する強力な手法です。X 軸はサンプル数（実行時間の割合）、Y 軸はコールスタックの深さを表します。幅が広いフレームほど CPU 時間を多く消費しているホットスポットです。色は通常ランダムですが、Java コード（緑）、ネイティブコード（黄）、カーネルコード（赤）で色分けする設定もあります。トップダウンで見てボトルネックを特定し、ボトムアップで呼び出し元を追跡します。",
        code: `// フレームグラフの生成方法
// === async-profiler で直接HTML生成 ===
// ./asprof -d 30 -f flamegraph.html <PID>

// === JFRからフレームグラフに変換 ===
// JMCで開く → 「メソッドプロファイリング」タブ
// または jfr-flame-graph ツールを使用:
// jfr2flame recording.jfr flamegraph.html

// パフォーマンスのボトルネックを作る例
public class FlameGraphDemo {
    // このメソッドがフレームグラフで幅広く表示される
    static void heavyComputation() {
        double result = 0;
        for (int i = 0; i < 10_000_000; i++) {
            result += Math.sin(i) * Math.cos(i); // CPU負荷
        }
    }

    // I/O待ちはフレームグラフのスタックに現れる
    static void slowIO() throws Exception {
        Thread.sleep(100); // I/O待ちをシミュレート
    }

    public static void main(String[] args) throws Exception {
        System.out.println("PID: " + ProcessHandle.current().pid());
        System.out.println("プロファイリングを開始してください");
        for (int i = 0; i < 100; i++) {
            heavyComputation(); // CPUバウンド
            slowIO();           // I/Oバウンド
        }
    }
}`,
      },
      {
        title: "カスタムJFRイベント",
        content:
          "JFR ではアプリケーション固有のカスタムイベントを定義して記録できます。jdk.jfr.Event を継承したクラスを作成し、@Label、@Description、@Category アノテーションでメタデータを付与します。ビジネスロジックの実行時間、外部API呼び出し、キャッシュのヒット率など、アプリケーション固有のメトリクスを JFR で統合的に管理できるため、問題の原因特定が容易になります。",
        code: `// カスタムJFRイベントの定義と使用
import jdk.jfr.*;

@Label("API呼び出し")
@Description("外部API呼び出しの記録")
@Category({"Application", "API"})
public class ApiCallEvent extends Event {
    @Label("エンドポイント")
    public String endpoint;

    @Label("レスポンス時間(ms)")
    public long responseTimeMs;

    @Label("ステータスコード")
    public int statusCode;

    @Label("成功")
    public boolean success;
}

// 使用例: APIクライアントに組み込む
class ApiClient {
    public String callApi(String endpoint) {
        var event = new ApiCallEvent();
        event.endpoint = endpoint;
        event.begin(); // 計測開始

        try {
            // API呼び出し処理
            String result = doHttpCall(endpoint);
            event.statusCode = 200;
            event.success = true;
            return result;
        } catch (Exception e) {
            event.statusCode = 500;
            event.success = false;
            throw e;
        } finally {
            event.responseTimeMs = event.getDuration().toMillis();
            event.commit(); // イベント記録
        }
    }
}`,
      },
    ],
  },
  {
    id: "memory-analysis",
    title: "メモリリーク検出",
    category: "profiling",
    description:
      "ヒープダンプ分析、MAT、参照の種類（Strong/Weak/Soft/Phantom）によるメモリ管理",
    sections: [
      {
        title: "メモリリークとは",
        content:
          "Java のメモリリークは、不要になったオブジェクトへの参照が残り続け、GC が回収できない状態を指します。典型的な原因は、static な Collection への追加のみ（削除忘れ）、リスナーやコールバックの登録解除漏れ、クローズされないリソース（DB接続、ストリーム）、ThreadLocal の未クリア、キャッシュの無制限な成長です。症状としては、ヒープ使用量が右肩上がりで増加し、最終的に OutOfMemoryError が発生します。",
        code: `// よくあるメモリリークのパターン
import java.util.*;

public class MemoryLeakExamples {
    // パターン1: staticなコレクションの無制限な成長
    private static final List<byte[]> cache = new ArrayList<>();

    static void leakyCache(byte[] data) {
        cache.add(data); // 追加のみで削除しない → リーク
    }

    // パターン2: リスナーの登録解除忘れ
    private static final List<Runnable> listeners = new ArrayList<>();

    static void addListener(Runnable listener) {
        listeners.add(listener); // 解除メソッドがない → リーク
    }

    // パターン3: ThreadLocalの未クリア（スレッドプール環境）
    private static final ThreadLocal<byte[]> threadData =
        new ThreadLocal<>();

    static void processRequest() {
        threadData.set(new byte[1024 * 1024]); // 1MB
        // 処理...
        // threadData.remove(); // これを忘れるとリーク！
    }

    // 修正版: try-finallyで確実にクリア
    static void processRequestFixed() {
        try {
            threadData.set(new byte[1024 * 1024]);
            // 処理...
        } finally {
            threadData.remove(); // 確実にクリア
        }
    }
}`,
      },
      {
        title: "ヒープダンプの取得と分析",
        content:
          "ヒープダンプは JVM のメモリ状態のスナップショットです。jcmd、jmap、JFR、または -XX:+HeapDumpOnOutOfMemoryError で取得できます。ダンプファイルには全オブジェクト、クラス、参照関係が含まれ、Eclipse MAT（Memory Analyzer Tool）や VisualVM で分析します。ダンプ取得時は STW が発生するため、本番環境ではタイミングに注意が必要です。サイズはヒープサイズに比例するため、十分なディスク空間を確保してください。",
        code: `// ヒープダンプの取得方法
// === jcmd（推奨） ===
// jcmd <PID> GC.heap_dump /tmp/heapdump.hprof

// === jmap ===
// jmap -dump:format=b,file=/tmp/heapdump.hprof <PID>

// === OOM時に自動取得（起動オプション） ===
// java -XX:+HeapDumpOnOutOfMemoryError
//      -XX:HeapDumpPath=/var/log/dumps/
//      -jar app.jar

// プログラムからヒープダンプを取得
import com.sun.management.HotSpotDiagnosticMXBean;
import java.lang.management.ManagementFactory;

public class HeapDumpUtil {
    public static void dumpHeap(String filePath, boolean live) {
        try {
            var bean = ManagementFactory.getPlatformMXBean(
                HotSpotDiagnosticMXBean.class);
            // live=trueでGC後の生存オブジェクトのみダンプ
            bean.dumpHeap(filePath, live);
            System.out.println("ヒープダンプを保存: " + filePath);
        } catch (Exception e) {
            System.err.println("ダンプ取得失敗: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        dumpHeap("/tmp/app-heap.hprof", true);
    }
}`,
      },
      {
        title: "Eclipse MAT（Memory Analyzer Tool）",
        content:
          "Eclipse MAT はヒープダンプを分析する最も強力なツールです。Leak Suspects レポートでメモリリークの疑いがあるオブジェクトを自動検出し、Dominator Tree で最もメモリを消費しているオブジェクトツリーを特定します。Histogram でクラスごとのオブジェクト数とサイズを一覧表示し、OQL（Object Query Language）で条件を指定して検索できます。Retained Size（そのオブジェクトが GC されると解放されるメモリ量）は特に重要な指標です。",
        code: `// MATで分析するためのメモリ問題シナリオ
import java.util.*;

public class MemoryProblemScenario {
    // Dominator Treeでこのマップが大きく表示される
    private final Map<String, List<byte[]>> dataStore = new HashMap<>();

    public void loadData(String key) {
        // 10MBのデータをキーごとに蓄積
        List<byte[]> chunks = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            chunks.add(new byte[1024 * 1024]); // 1MB × 10
        }
        dataStore.put(key, chunks);
    }

    public static void main(String[] args) throws Exception {
        var scenario = new MemoryProblemScenario();

        // データを蓄積し続ける（メモリリーク）
        for (int i = 0; i < 100; i++) {
            scenario.loadData("key-" + i);
            long used = Runtime.getRuntime().totalMemory()
                - Runtime.getRuntime().freeMemory();
            System.out.printf("キー数: %d, 使用メモリ: %,d MB%n",
                i + 1, used / 1024 / 1024);
        }
        // ここでヒープダンプを取得してMATで分析
        // → Leak Suspects: MemoryProblemScenario.dataStore
        // → Histogram: byte[] が大量に存在
    }
}`,
      },
      {
        title: "参照の種類（Strong/Weak/Soft/Phantom）",
        content:
          "Java には4種類のオブジェクト参照があります。Strong Reference は通常の参照で、到達可能な限り GC されません。Soft Reference はメモリ不足時に GC されるため、キャッシュに適しています。Weak Reference は次の GC で回収されるため、WeakHashMap のキーに使われます。Phantom Reference はオブジェクトがファイナライズされた後に通知を受けるために使い、リソースのクリーンアップに利用されます。参照の強さは Strong > Soft > Weak > Phantom の順です。",
        code: `// 4種類の参照を使い分ける例
import java.lang.ref.*;
import java.util.*;

public class ReferenceTypes {
    public static void main(String[] args) {
        // Strong Reference: GCされない
        Object strong = new Object();

        // Soft Reference: メモリ不足時にGCされる（キャッシュ向き）
        SoftReference<byte[]> softCache =
            new SoftReference<>(new byte[1024 * 1024]);
        System.out.println("Soft: " + (softCache.get() != null ? "有効" : "回収済み"));

        // Weak Reference: 次のGCで回収される
        WeakReference<Object> weak = new WeakReference<>(new Object());
        System.gc(); // GC実行
        System.out.println("Weak: " + (weak.get() != null ? "有効" : "回収済み"));

        // WeakHashMap: キーがGCされるとエントリ自動削除
        Map<Object, String> weakMap = new WeakHashMap<>();
        Object key = new Object();
        weakMap.put(key, "値");
        key = null; // 参照を切る
        System.gc();
        System.out.println("WeakHashMap サイズ: " + weakMap.size());

        // Phantom Reference: ファイナライズ後の通知用
        ReferenceQueue<Object> queue = new ReferenceQueue<>();
        PhantomReference<Object> phantom =
            new PhantomReference<>(new Object(), queue);
        System.gc();
        Reference<?> ref = queue.poll();
        System.out.println("Phantom通知: " + (ref != null ? "あり" : "なし"));
    }
}`,
      },
      {
        title: "メモリリーク対策のベストプラクティス",
        content:
          "メモリリークを防ぐには、予防と早期検出の両方が重要です。予防策として、try-with-resources で確実にリソースをクローズする、キャッシュには上限サイズを設定する（LRU キャッシュ等）、ThreadLocal は finally で remove する、リスナーは必ず解除する、static な Collection の使用を最小限にします。検出のためには、定期的にヒープ使用量を監視し、GC ログで Old 世代の傾向を確認し、負荷テスト時にプロファイリングを行います。",
        code: `// メモリリーク対策の実装パターン
import java.util.*;

public class MemoryLeakPrevention {
    // 対策1: LRUキャッシュで上限を設定
    private static final int MAX_CACHE_SIZE = 1000;
    private final Map<String, Object> lruCache =
        new LinkedHashMap<>(16, 0.75f, true) {
            @Override
            protected boolean removeEldestEntry(Map.Entry eldest) {
                return size() > MAX_CACHE_SIZE; // 上限超過で自動削除
            }
        };

    // 対策2: SoftReferenceでメモリ不足時に自動解放
    private final Map<String, SoftReference<byte[]>> softCache =
        new HashMap<>();

    public byte[] getCachedData(String key) {
        SoftReference<byte[]> ref = softCache.get(key);
        if (ref != null) {
            byte[] data = ref.get();
            if (data != null) return data; // キャッシュヒット
        }
        byte[] data = loadFromDB(key); // キャッシュミス→DB取得
        softCache.put(key, new SoftReference<>(data));
        return data;
    }

    // 対策3: AutoCloseableの実装
    public static class ManagedResource implements AutoCloseable {
        private final byte[] buffer = new byte[1024 * 1024];
        private boolean closed = false;

        @Override
        public void close() {
            if (!closed) {
                closed = true;
                // リソース解放処理
                System.out.println("リソース解放完了");
            }
        }
    }

    private byte[] loadFromDB(String key) { return new byte[1024]; }
}`,
      },
    ],
  },

  // ===== 最適化 =====
  {
    id: "code-optimization",
    title: "コード最適化",
    category: "optimization",
    description:
      "String最適化、コレクション選択、ストリーム性能、オートボクシング回避",
    sections: [
      {
        title: "String最適化",
        content:
          "String は不変（immutable）なため、文字列の連結を繰り返すと大量の中間オブジェクトが生成されます。ループ内の文字列結合には StringBuilder を使用します。Java 9 以降では String の内部表現が Compact Strings（byte[]）に変更され、ASCII 文字列のメモリ使用量が半減しました。String.intern() は文字列プールを活用してメモリを節約しますが、大量使用は GC に悪影響を与えるため注意が必要です。",
        code: `// String最適化の実践
public class StringOptimization {
    // 悪い例: ループ内でString連結
    static String buildBad(int n) {
        String result = "";
        for (int i = 0; i < n; i++) {
            result += "item" + i + ","; // 毎回新しいStringを生成
        }
        return result;
    }

    // 良い例: StringBuilderを使用
    static String buildGood(int n) {
        var sb = new StringBuilder(n * 10); // 初期容量を指定
        for (int i = 0; i < n; i++) {
            sb.append("item").append(i).append(',');
        }
        return sb.toString();
    }

    // Java 11+: stripはtrimより多くの空白文字に対応
    static String cleanString(String input) {
        return input.strip(); // Unicode空白も除去
    }

    public static void main(String[] args) {
        int n = 100_000;
        long start = System.nanoTime();
        buildGood(n); // StringBuilderは高速
        long fast = System.nanoTime() - start;

        start = System.nanoTime();
        buildBad(n); // String連結は低速
        long slow = System.nanoTime() - start;

        System.out.printf("StringBuilder: %.1f ms%n", fast / 1e6);
        System.out.printf("String連結:    %.1f ms%n", slow / 1e6);
        System.out.printf("速度差: %.0f倍%n", (double) slow / fast);
    }
}`,
      },
      {
        title: "コレクションの選択",
        content:
          "データ構造の選択はパフォーマンスに直結します。ArrayList はインデックスアクセスが O(1) で読み取り中心に適し、LinkedList は先頭・末尾の追加削除が O(1) ですが実際には ArrayList の方が高速なケースが多いです。HashMap は O(1) の検索、TreeMap は O(log n) でソート済み、LinkedHashMap は挿入順を保持します。初期容量を適切に設定し、不要な拡張（リサイズ）を防ぐことが重要です。List.of()、Map.of() で不変コレクションを使うとメモリ効率が向上します。",
        code: `// コレクション選択とパフォーマンスの比較
import java.util.*;

public class CollectionChoice {
    public static void main(String[] args) {
        int size = 100_000;

        // ArrayList vs LinkedList: ランダムアクセス
        var arrayList = new ArrayList<>(Collections.nCopies(size, "data"));
        var linkedList = new LinkedList<>(arrayList);

        long start = System.nanoTime();
        for (int i = 0; i < 10_000; i++) arrayList.get(size / 2);
        System.out.printf("ArrayList get: %.2f ms%n",
            (System.nanoTime() - start) / 1e6);

        start = System.nanoTime();
        for (int i = 0; i < 10_000; i++) linkedList.get(size / 2);
        System.out.printf("LinkedList get: %.2f ms%n",
            (System.nanoTime() - start) / 1e6);

        // HashMap: 初期容量の設定で性能向上
        int expectedSize = 10_000;
        // 初期容量 = 期待サイズ / ロードファクタ + 1
        var map = new HashMap<String, Integer>(expectedSize * 4 / 3 + 1);

        // 不変コレクションはメモリ効率が良い
        var immutableList = List.of("a", "b", "c"); // 内部実装が最適化
        var immutableMap = Map.of("key1", 1, "key2", 2);
        System.out.println("不変リスト: " + immutableList);
    }
}`,
      },
      {
        title: "ストリームAPIの性能",
        content:
          "Stream API は可読性に優れますが、単純なループより若干のオーバーヘッドがあります。少量のデータでは差は無視できますが、大量データでは parallelStream() で並列処理を検討します。ただし、並列ストリームはスレッド管理のオーバーヘッドがあるため、データ量が十分に大きく（1万件以上が目安）、各要素の処理が重い場合に効果的です。ボクシング/アンボクシングを避けるため、IntStream/LongStream/DoubleStream のプリミティブストリームを活用します。",
        code: `// ストリームの性能とベストプラクティス
import java.util.stream.*;
import java.util.*;

public class StreamPerformance {
    public static void main(String[] args) {
        int size = 1_000_000;
        var numbers = new Random().ints(size, 0, 1000).toArray();

        // プリミティブストリーム（ボクシングなし）→ 高速
        long start = System.nanoTime();
        long sum1 = IntStream.of(numbers).sum();
        System.out.printf("IntStream.sum: %.2f ms%n",
            (System.nanoTime() - start) / 1e6);

        // ボクシングありのストリーム → オーバーヘッド
        var boxedList = IntStream.of(numbers).boxed().toList();
        start = System.nanoTime();
        long sum2 = boxedList.stream()
            .mapToInt(Integer::intValue).sum();
        System.out.printf("Boxed stream:  %.2f ms%n",
            (System.nanoTime() - start) / 1e6);

        // 並列ストリーム（大量データ×重い処理で有効）
        start = System.nanoTime();
        long sum3 = IntStream.of(numbers).parallel().sum();
        System.out.printf("parallel sum:  %.2f ms%n",
            (System.nanoTime() - start) / 1e6);

        // toList()はJava 16+で使用可能（unmodifiableなList）
        var result = IntStream.of(numbers)
            .filter(n -> n > 500)
            .mapToObj(n -> "値:" + n)
            .toList();
        System.out.println("フィルタ後: " + result.size() + " 件");
    }
}`,
      },
      {
        title: "オートボクシング回避",
        content:
          "オートボクシングはプリミティブ型とラッパー型の自動変換ですが、不要なオブジェクト生成を引き起こします。特にループ内での Integer/Long/Double の使用は大量のゴミオブジェクトを生成し、GC 負荷を高めます。対策として、コレクションのキーや値にプリミティブ型が必要な場合は Eclipse Collections、Trove、fastutil などのプリミティブ特化ライブラリを検討します。計算処理ではプリミティブ型を使い、不要なラッパー型への変換を避けます。",
        code: `// オートボクシングのコストと回避策
public class AutoBoxingAvoidance {
    // 悪い例: Longのオートボクシングが毎回発生
    static long sumBad(int n) {
        Long sum = 0L; // Longラッパー型
        for (int i = 0; i < n; i++) {
            sum += i; // アンボクシング→加算→ボクシング が毎回発生
        }
        return sum;
    }

    // 良い例: プリミティブ型のみ使用
    static long sumGood(int n) {
        long sum = 0L; // プリミティブ型
        for (int i = 0; i < n; i++) {
            sum += i; // ボクシングなし
        }
        return sum;
    }

    public static void main(String[] args) {
        int n = 10_000_000;

        long start = System.nanoTime();
        sumGood(n);
        System.out.printf("プリミティブ: %.2f ms%n",
            (System.nanoTime() - start) / 1e6);

        start = System.nanoTime();
        sumBad(n);
        System.out.printf("オートボクシング: %.2f ms%n",
            (System.nanoTime() - start) / 1e6);

        // 比較時の注意: ==はキャッシュ範囲(-128～127)内のみ動作
        Integer a = 127, b = 127;
        Integer c = 128, d = 128;
        System.out.println("127 == 127: " + (a == b));   // true
        System.out.println("128 == 128: " + (c == d));   // false!
        System.out.println("128 equals 128: " + c.equals(d)); // true
    }
}`,
      },
      {
        title: "その他のコード最適化テクニック",
        content:
          "遅延初期化（Lazy Initialization）でリソースを必要時にのみ生成し、初期化コストを削減します。オブジェクトの使い回し（Object Pooling）は、生成コストの高いオブジェクト（DB接続、スレッド）に有効ですが、通常のオブジェクトでは JVM の最適化により不要です。正規表現の Pattern はコンパイル済みをキャッシュし、ループ内で Pattern.compile を呼ばないようにします。配列コピーは System.arraycopy を使い、ネイティブの高速コピーを活用します。",
        code: `// 実践的なコード最適化テクニック
import java.util.regex.Pattern;

public class CodeOptimizationTips {
    // 正規表現のコンパイル結果をキャッシュ
    private static final Pattern EMAIL_PATTERN =
        Pattern.compile("^[\\w.+-]+@[\\w-]+\\.[\\w.]+$");

    // 悪い例: 毎回コンパイル
    static boolean validateBad(String email) {
        return email.matches("^[\\w.+-]+@[\\w-]+\\.[\\w.]+$");
    }

    // 良い例: コンパイル済みPatternを再利用
    static boolean validateGood(String email) {
        return EMAIL_PATTERN.matcher(email).matches();
    }

    // 遅延初期化（Lazy Holder パターン）
    static class HeavyResource {
        private static class Holder {
            static final HeavyResource INSTANCE = new HeavyResource();
        }
        static HeavyResource getInstance() { return Holder.INSTANCE; }
        private HeavyResource() {
            System.out.println("重いリソースを初期化");
        }
    }

    public static void main(String[] args) {
        // 正規表現の性能比較
        String email = "test@example.com";
        long start = System.nanoTime();
        for (int i = 0; i < 100_000; i++) validateGood(email);
        System.out.printf("キャッシュ済み: %.2f ms%n",
            (System.nanoTime() - start) / 1e6);

        start = System.nanoTime();
        for (int i = 0; i < 100_000; i++) validateBad(email);
        System.out.printf("毎回コンパイル: %.2f ms%n",
            (System.nanoTime() - start) / 1e6);
    }
}`,
      },
    ],
  },
  {
    id: "db-optimization",
    title: "DB最適化",
    category: "optimization",
    description:
      "N+1問題の解決、インデックス設計、コネクションプール、クエリキャッシュの最適化",
    sections: [
      {
        title: "N+1問題",
        content:
          "N+1 問題は、親エンティティを1回のクエリで取得した後、関連する子エンティティを N 回個別に取得してしまう問題です。例えば、100件の注文を取得し、各注文の商品を個別にクエリすると計101回の SQL が発行されます。JPA/Hibernate では LAZY ローディングで発生しやすく、JOIN FETCH、@EntityGraph、@BatchSize で解決します。検出にはログで SQL 発行回数を監視するか、Hibernate の統計機能を有効にします。",
        code: `// N+1問題の発生と解決
// === N+1問題が発生するコード ===
@Entity
public class Order {
    @Id
    private Long id;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY)
    private List<OrderItem> items; // LAZY → アクセス時にSQLが発行
}

// リポジトリ
public interface OrderRepository extends JpaRepository<Order, Long> {

    // 問題: N+1が発生する
    // List<Order> orders = orderRepository.findAll();
    // orders.forEach(o -> o.getItems().size()); // N回のSQLが追加発行

    // 解決1: JOIN FETCHで一度に取得
    @Query("SELECT o FROM Order o JOIN FETCH o.items")
    List<Order> findAllWithItems();

    // 解決2: @EntityGraphで関連を一括取得
    @EntityGraph(attributePaths = {"items"})
    List<Order> findAll();
}

// 解決3: @BatchSizeで一括フェッチ
@Entity
public class OrderV2 {
    @OneToMany(mappedBy = "order")
    @BatchSize(size = 100) // 100件ずつまとめてIN句で取得
    private List<OrderItem> items;
}

// SQLログで検出（application.yml）
// spring.jpa.show-sql: true
// logging.level.org.hibernate.SQL: DEBUG
// logging.level.org.hibernate.stat: DEBUG`,
      },
      {
        title: "インデックス設計",
        content:
          "インデックスはクエリの検索性能を劇的に向上させますが、INSERT/UPDATE 性能は低下します。WHERE 句、JOIN 条件、ORDER BY に使われるカラムにインデックスを作成します。複合インデックスではカラムの順序が重要で、選択度（カーディナリティ）の高いカラムを先頭にします。カバリングインデックスを活用すると、テーブルへのアクセスなしにインデックスのみでクエリを完結できます。EXPLAIN で実行計画を確認し、インデックスが正しく使われているか検証しましょう。",
        code: `// インデックス設計のJPA実装例
@Entity
@Table(name = "users", indexes = {
    // 単一カラムインデックス
    @Index(name = "idx_email", columnList = "email", unique = true),
    // 複合インデックス（選択度の高いカラムを先頭に）
    @Index(name = "idx_status_created",
           columnList = "status, created_at"),
    // 検索条件に合わせたインデックス
    @Index(name = "idx_dept_name",
           columnList = "department_id, last_name")
})
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String status; // ACTIVE, INACTIVE, SUSPENDED

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "department_id")
    private Long departmentId;

    @Column(name = "last_name")
    private String lastName;
}

// EXPLAIN ANALYZEでインデックス使用状況を確認
// EXPLAIN ANALYZE SELECT * FROM users
//   WHERE status = 'ACTIVE' AND created_at > '2024-01-01';
// → Index Scan using idx_status_created が表示されればOK`,
      },
      {
        title: "コネクションプール",
        content:
          "DB コネクションの生成は重い処理のため、プールで再利用します。Spring Boot では HikariCP がデフォルトのコネクションプールです。プールサイズは CPU コア数の 2〜3 倍が目安で、多すぎるとスレッド競合やDB側のメモリ消費が増加します。最大プールサイズ（maximumPoolSize）、最小アイドル（minimumIdle）、コネクションタイムアウト（connectionTimeout）、最大生存時間（maxLifetime）を適切に設定します。リーク検出（leakDetectionThreshold）を有効にして、返却されないコネクションを検出しましょう。",
        code: `// HikariCPの最適設定（application.yml → Javaで解説）
// spring:
//   datasource:
//     hikari:
//       maximum-pool-size: 10      # 最大コネクション数
//       minimum-idle: 5            # 最小アイドルコネクション
//       connection-timeout: 30000  # 接続待ちタイムアウト(ms)
//       idle-timeout: 600000       # アイドルコネクション維持時間
//       max-lifetime: 1800000      # コネクション最大生存時間(30分)
//       leak-detection-threshold: 60000  # リーク検出(60秒)

// プログラムでHikariCPを設定する例
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

public class ConnectionPoolConfig {
    public static HikariDataSource createPool() {
        var config = new HikariConfig();
        config.setJdbcUrl("jdbc:postgresql://localhost:5432/mydb");
        config.setUsername("user");
        config.setPassword("pass");

        // プールサイズ設定（CPUコア数 × 2 が目安）
        int cores = Runtime.getRuntime().availableProcessors();
        config.setMaximumPoolSize(cores * 2);
        config.setMinimumIdle(cores);

        // タイムアウト設定
        config.setConnectionTimeout(30_000);  // 30秒
        config.setMaxLifetime(1_800_000);     // 30分
        config.setLeakDetectionThreshold(60_000); // リーク検出

        // パフォーマンス設定
        config.addDataSourceProperty("cachePrepStmts", "true");
        config.addDataSourceProperty("prepStmtCacheSize", "250");
        return new HikariDataSource(config);
    }
}`,
      },
      {
        title: "クエリキャッシュ",
        content:
          "クエリキャッシュは同じクエリの結果をメモリに保持し、DB への問い合わせを削減します。Hibernate の2次キャッシュ（L2 Cache）はエンティティやコレクションのキャッシュで、Ehcache や Caffeine をプロバイダーとして使用します。Spring Cache（@Cacheable）はメソッドレベルのキャッシュで、Redis や Caffeine と組み合わせて使います。キャッシュの無効化戦略（TTL、LRU、イベント駆動）が重要で、古いデータを返さないよう注意が必要です。",
        code: `// Spring Cache + Caffeine によるクエリキャッシュ
import org.springframework.cache.annotation.*;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // キャッシュから取得、なければDBから取得してキャッシュ
    @Cacheable(value = "users", key = "#id")
    public User findById(Long id) {
        System.out.println("DBから取得: " + id);
        return userRepository.findById(id).orElseThrow();
    }

    // 更新時にキャッシュを無効化
    @CacheEvict(value = "users", key = "#user.id")
    public User update(User user) {
        return userRepository.save(user);
    }

    // 更新してキャッシュも更新
    @CachePut(value = "users", key = "#user.id")
    public User updateAndCache(User user) {
        return userRepository.save(user);
    }

    // キャッシュ全削除
    @CacheEvict(value = "users", allEntries = true)
    public void clearCache() {
        System.out.println("ユーザーキャッシュをクリア");
    }
}

// Caffeine設定（application.yml）
// spring.cache.type: caffeine
// spring.cache.caffeine.spec:
//   maximumSize=10000,expireAfterWrite=10m`,
      },
      {
        title: "バッチ処理の最適化",
        content:
          "大量データの INSERT/UPDATE はバッチ処理で効率化します。JPA では hibernate.jdbc.batch_size でバッチサイズを設定し、一定件数ごとに flush & clear してメモリを解放します。JDBC の addBatch/executeBatch を使うと更に高速です。Spring の @Transactional で適切なトランザクション境界を設定し、大きすぎるトランザクションを避けます。ページング（LIMIT/OFFSET）で処理対象を分割し、メモリ使用量を制御することも重要です。",
        code: `// バッチINSERTの最適化例
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BatchInsertService {

    private final EntityManager em;
    private static final int BATCH_SIZE = 50;

    public BatchInsertService(EntityManager em) { this.em = em; }

    // JPA バッチINSERT
    @Transactional
    public void batchInsert(List<User> users) {
        for (int i = 0; i < users.size(); i++) {
            em.persist(users.get(i));

            // BATCH_SIZE件ごとにフラッシュしてメモリを解放
            if (i % BATCH_SIZE == 0 && i > 0) {
                em.flush();   // DBに書き込み
                em.clear();   // 1次キャッシュをクリア
            }
        }
        em.flush();
        em.clear();
        System.out.printf("%d件のバッチINSERT完了%n", users.size());
    }
}

// application.yml でバッチ設定
// spring.jpa.properties.hibernate:
//   jdbc.batch_size: 50
//   order_inserts: true
//   order_updates: true
//   generate_statistics: true`,
      },
    ],
  },
  {
    id: "jmh-benchmark",
    title: "JMHベンチマーク",
    category: "optimization",
    description:
      "JMH（Java Microbenchmark Harness）を使った正確なパフォーマンス計測とよくあるミス",
    sections: [
      {
        title: "JMHとは",
        content:
          "JMH（Java Microbenchmark Harness）は OpenJDK が提供するマイクロベンチマークフレームワークです。JIT コンパイラの最適化、ウォームアップ、デッドコード除去などの JVM の特性を考慮した正確な計測を行えます。System.nanoTime() による素朴な計測では JVM の最適化によって誤った結果が出ることがあるため、パフォーマンス比較には JMH を使うのが推奨です。Maven/Gradle で簡単にプロジェクトを作成できます。",
        code: `// JMHプロジェクトのセットアップ（build.gradle）
// plugins { id 'java' }
// dependencies {
//     implementation 'org.openjdk.jmh:jmh-core:1.37'
//     annotationProcessor 'org.openjdk.jmh:jmh-generator-annprocess:1.37'
// }

// Mavenの場合（pom.xml）
// <dependency>
//     <groupId>org.openjdk.jmh</groupId>
//     <artifactId>jmh-core</artifactId>
//     <version>1.37</version>
// </dependency>

import org.openjdk.jmh.annotations.*;
import org.openjdk.jmh.runner.Runner;
import org.openjdk.jmh.runner.options.OptionsBuilder;
import java.util.concurrent.TimeUnit;

@BenchmarkMode(Mode.AverageTime)        // 平均実行時間を計測
@OutputTimeUnit(TimeUnit.NANOSECONDS)   // ナノ秒単位で出力
@Warmup(iterations = 5, time = 1)       // ウォームアップ5回
@Measurement(iterations = 10, time = 1) // 計測10回
@Fork(2)                                // JVMフォーク2回
@State(Scope.Benchmark)                 // 状態のスコープ
public class MyBenchmark {

    @Benchmark
    public int baseline() {
        return 42; // ベースライン計測
    }

    public static void main(String[] args) throws Exception {
        var opt = new OptionsBuilder()
            .include(MyBenchmark.class.getSimpleName())
            .build();
        new Runner(opt).run();
    }
}`,
      },
      {
        title: "@Benchmarkと@State",
        content:
          "@Benchmark アノテーションを付けたメソッドが計測対象です。@State はベンチマーク間で共有するデータの定義に使い、Scope.Benchmark（全スレッド共有）、Scope.Thread（スレッドごと）、Scope.Group（グループごと）のスコープを指定します。@Setup でベンチマーク前の初期化、@TearDown で後処理を行います。@Param でパラメータを外部から注入し、異なる条件での比較を自動化できます。",
        code: `// @Stateと@Paramを使ったベンチマーク
import org.openjdk.jmh.annotations.*;
import java.util.*;
import java.util.concurrent.TimeUnit;

@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.MICROSECONDS)
@Warmup(iterations = 3, time = 1)
@Measurement(iterations = 5, time = 1)
@Fork(1)
@State(Scope.Benchmark)
public class CollectionBenchmark {

    @Param({"100", "10000", "1000000"}) // 複数サイズで比較
    private int size;

    private List<Integer> arrayList;
    private List<Integer> linkedList;

    @Setup(Level.Trial) // ベンチマーク開始前に1回実行
    public void setup() {
        arrayList = new ArrayList<>();
        linkedList = new LinkedList<>();
        var random = new Random(42);
        for (int i = 0; i < size; i++) {
            int val = random.nextInt();
            arrayList.add(val);
            linkedList.add(val);
        }
    }

    @Benchmark
    public int arrayListIterate() {
        int sum = 0;
        for (int val : arrayList) sum += val;
        return sum; // 結果を返してデッドコード除去を防ぐ
    }

    @Benchmark
    public int linkedListIterate() {
        int sum = 0;
        for (int val : linkedList) sum += val;
        return sum;
    }
}`,
      },
      {
        title: "結果の読み方",
        content:
          "JMH の結果には、Score（スコア：平均実行時間またはスループット）、Error（誤差：±で表示される信頼区間）、Units（単位：ns/op, us/op, ops/s など）が含まれます。Score の差が Error の範囲内にある場合、統計的に有意な差はありません。Mode.AverageTime は低いほど高速、Mode.Throughput は高いほど高スループットです。結果を比較する際は同じ条件（同一マシン、同一 JVM バージョン）で実行することが重要です。",
        code: `// JMH結果の読み方と解釈
// === 出力例 ===
// Benchmark                        (size)  Mode  Cnt    Score    Error  Units
// CollectionBenchmark.arrayList       100  avgt    5    0.045 ±  0.001  us/op
// CollectionBenchmark.arrayList     10000  avgt    5    4.512 ±  0.120  us/op
// CollectionBenchmark.linkedList      100  avgt    5    0.089 ±  0.003  us/op
// CollectionBenchmark.linkedList    10000  avgt    5   12.345 ±  0.890  us/op

// 読み方のポイント:
// 1. Score: 平均実行時間（avgt）→ 小さいほど高速
// 2. Error: ±の値が大きい → 結果のばらつきが大きい
// 3. Cnt: 計測回数（Measurement iterations × Forks）
// 4. 比較: arrayList(4.512) vs linkedList(12.345)
//    → arrayListが約2.7倍高速

// 結果をJSON/CSVで出力
// java -jar benchmark.jar -rf json -rff result.json
// java -jar benchmark.jar -rf csv -rff result.csv

import org.openjdk.jmh.runner.Runner;
import org.openjdk.jmh.runner.options.OptionsBuilder;

public class BenchmarkRunner {
    public static void main(String[] args) throws Exception {
        var opt = new OptionsBuilder()
            .include("CollectionBenchmark")
            .result("result.json")         // 結果をJSONで保存
            .resultFormat(org.openjdk.jmh.results.format
                .ResultFormatType.JSON)
            .build();
        new Runner(opt).run();
    }
}`,
      },
      {
        title: "よくある計測ミス",
        content:
          "JMH を使わない素朴な計測で起きやすいミスがあります。(1) デッドコード除去：計算結果を使わないと JIT が処理自体を除去する。対策は Blackhole.consume() または戻り値で返す。(2) 定数畳み込み：コンパイル時に定数として計算される。対策は @State で入力データを分離する。(3) ウォームアップ不足：JIT 最適化前の遅い結果が混ざる。対策は十分な Warmup iterations を設定する。(4) ループ最適化：ループ内の繰り返しが最適化で除去される。",
        code: `// よくある計測ミスとその対策
import org.openjdk.jmh.annotations.*;
import org.openjdk.jmh.infra.Blackhole;
import java.util.concurrent.TimeUnit;

@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.NANOSECONDS)
@State(Scope.Thread)
public class CommonMistakes {

    private double x = Math.PI;

    // ミス1: 結果を使わない → JITがコード自体を除去
    @Benchmark
    public void deadCodeWrong() {
        Math.sin(x); // 結果が捨てられる → 実質何も実行されない
    }

    // 対策: Blackholeで結果を消費
    @Benchmark
    public void deadCodeFixed(Blackhole bh) {
        bh.consume(Math.sin(x)); // 結果を確実に消費
    }

    // 対策: 戻り値で返す（JMHが自動的にBlackholeに渡す）
    @Benchmark
    public double deadCodeFixedReturn() {
        return Math.sin(x);
    }

    // ミス2: 定数畳み込み
    @Benchmark
    public double constantFoldingWrong() {
        return Math.sin(Math.PI); // コンパイル時に定数化される
    }

    // 対策: @Stateのフィールド経由で値を渡す
    @Benchmark
    public double constantFoldingFixed() {
        return Math.sin(x); // xはフィールドなので定数化されない
    }
}`,
      },
      {
        title: "実践的なベンチマーク例",
        content:
          "実際の開発で役立つベンチマーク例として、文字列操作の比較、JSON シリアライゼーションライブラリの比較、HTTP クライアントの性能比較などがあります。ベンチマーク設計のポイントは、現実的なデータサイズを使う、単一の変数のみ変更する、結果を統計的に検証する、環境要因（他プロセス、CPU 周波数）を排除することです。CI/CD にベンチマークを組み込み、パフォーマンスの劣化を早期に検出する仕組みも有効です。",
        code: `// JSON シリアライゼーションのベンチマーク例
import org.openjdk.jmh.annotations.*;
import java.util.concurrent.TimeUnit;

@BenchmarkMode(Mode.Throughput)          // スループット計測
@OutputTimeUnit(TimeUnit.SECONDS)
@Warmup(iterations = 3, time = 2)
@Measurement(iterations = 5, time = 2)
@Fork(2)
@State(Scope.Benchmark)
public class JsonBenchmark {

    private User testUser;
    // 各ライブラリのマッパーはフィールドで保持（初期化コスト除外）
    // private ObjectMapper jackson;
    // private Gson gson;

    @Setup
    public void setup() {
        testUser = new User("田中太郎", "tanaka@example.com", 30);
        // jackson = new ObjectMapper();
        // gson = new Gson();
    }

    // @Benchmark
    // public String jacksonSerialize() throws Exception {
    //     return jackson.writeValueAsString(testUser);
    // }

    // @Benchmark
    // public String gsonSerialize() {
    //     return gson.toJson(testUser);
    // }

    // 出力例:
    // Benchmark                    Mode  Cnt        Score   Error  Units
    // JsonBenchmark.jackson       thrpt   10  1234567.890 ± 1234  ops/s
    // JsonBenchmark.gson          thrpt   10   987654.321 ± 5678  ops/s
    // → Jacksonの方が約25%スループットが高い

    record User(String name, String email, int age) {}
}`,
      },
    ],
  },
];
