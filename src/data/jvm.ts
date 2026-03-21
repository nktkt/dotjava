export interface JvmSection {
  title: string;
  content: string;
  code?: string;
}

export interface JvmChapter {
  id: string;
  title: string;
  description: string;
  category: string;
  sections: JvmSection[];
}

export interface JvmCategory {
  id: string;
  name: string;
  color: string;
}

export const jvmCategories: JvmCategory[] = [
  { id: "memory", name: "メモリ構造", color: "#2563EB" },
  { id: "gc", name: "ガベージコレクション", color: "#059669" },
  { id: "tuning", name: "チューニング", color: "#D97706" },
];

export const jvmChapters: JvmChapter[] = [
  // ===== メモリ構造 =====
  {
    id: "jvm-architecture",
    title: "JVMアーキテクチャ",
    description:
      "クラスローダ、実行エンジン、メモリ領域など、JVMの全体構造を理解する",
    category: "memory",
    sections: [
      {
        title: "クラスローダ",
        content:
          "JVMはJavaバイトコード(.classファイル)を実行するための仮想マシンです。クラスローダはクラスファイルをメモリにロードする仕組みで、Bootstrap ClassLoader、Platform ClassLoader（旧Extension）、Application ClassLoaderの3階層で構成されます。親委譲モデル（Parent Delegation Model）により、クラスのロード要求は常に親クラスローダに委譲され、親がロードできない場合のみ子がロードします。これにより、java.lang.Stringなどのコアクラスが改ざんされることを防ぎます。",
        code: `// クラスローダの階層を確認する
public class ClassLoaderDemo {
    public static void main(String[] args) {
        // Application ClassLoader（アプリのクラスパス上のクラスをロード）
        ClassLoader appLoader = ClassLoaderDemo.class.getClassLoader();
        System.out.println("アプリケーション: " + appLoader);
        // 出力例: jdk.internal.loader.ClassLoaders$AppClassLoader@...

        // Platform ClassLoader（拡張ライブラリをロード）
        ClassLoader platformLoader = appLoader.getParent();
        System.out.println("プラットフォーム: " + platformLoader);
        // 出力例: jdk.internal.loader.ClassLoaders$PlatformClassLoader@...

        // Bootstrap ClassLoader（java.langなどコアAPIをロード、ネイティブ実装）
        ClassLoader bootstrapLoader = platformLoader.getParent();
        System.out.println("ブートストラップ: " + bootstrapLoader);
        // 出力: null（ネイティブコードで実装されているためnull）

        // クラスがどのクラスローダでロードされたか確認
        System.out.println("String: " + String.class.getClassLoader());
        // 出力: null（Bootstrap ClassLoaderでロード）
    }
}`,
      },
      {
        title: "実行エンジン（JITコンパイラ）",
        content:
          "JVMの実行エンジンはバイトコードを解釈・実行します。最初はインタプリタ方式でバイトコードを1命令ずつ実行しますが、頻繁に実行されるコード（ホットスポット）はJIT（Just-In-Time）コンパイラによってネイティブコードにコンパイルされます。HotSpot JVMにはC1（クライアント）コンパイラとC2（サーバー）コンパイラがあり、段階的コンパイル（Tiered Compilation）により、最初はC1で素早くコンパイルし、さらにホットなコードはC2で高度な最適化を施します。",
        code: `// JITコンパイルの動作を確認するJVMオプション
// -XX:+PrintCompilation でJITコンパイルされたメソッドを表示
// java -XX:+PrintCompilation JitDemo

public class JitDemo {
    // このメソッドはループ内で多数回呼ばれるためJITコンパイルされる
    private static int hotMethod(int a, int b) {
        return a * b + a - b;
    }

    public static void main(String[] args) {
        long start = System.nanoTime();
        int result = 0;

        // 大量の繰り返しでホットスポットを形成
        for (int i = 0; i < 1_000_000; i++) {
            result += hotMethod(i, i + 1);
        }

        long elapsed = System.nanoTime() - start;
        System.out.println("結果: " + result);
        System.out.println("実行時間: " + elapsed / 1_000_000 + " ms");

        // JITコンパイル後は大幅に高速化される
        start = System.nanoTime();
        result = 0;
        for (int i = 0; i < 1_000_000; i++) {
            result += hotMethod(i, i + 1);
        }
        elapsed = System.nanoTime() - start;
        System.out.println("2回目実行時間: " + elapsed / 1_000_000 + " ms");
    }
}

// 段階的コンパイルのレベル:
// Level 0: インタプリタ
// Level 1: C1（フルプロファイリングなし）
// Level 2: C1（カウンタ付き）
// Level 3: C1（フルプロファイリング）
// Level 4: C2（最大最適化）`,
      },
      {
        title: "メモリ領域の全体像",
        content:
          "JVMのメモリは大きく分けてヒープ領域、スタック領域、メソッド領域（Metaspace）、PC（プログラムカウンタ）レジスタ、ネイティブメソッドスタックで構成されます。ヒープはすべてのスレッドで共有され、オブジェクトのインスタンスが格納されます。スタックはスレッドごとに独立しており、ローカル変数やメソッド呼び出しの情報を保持します。Metaspaceはクラスのメタデータを格納するネイティブメモリ領域で、Java 8以降PermGen（永続世代）に代わって導入されました。",
        code: `// JVMメモリ領域の概要図
//
// ┌──────────────────────────────────────────────┐
// │                  JVM メモリ                    │
// ├──────────────────────────────────────────────┤
// │  ┌────────────────────────────────────────┐  │
// │  │          ヒープ領域（共有）               │  │
// │  │  ┌──────────────┐ ┌────────────────┐  │  │
// │  │  │  Young世代    │ │   Old世代       │  │  │
// │  │  │ Eden/S0/S1   │ │  Tenured       │  │  │
// │  │  └──────────────┘ └────────────────┘  │  │
// │  └────────────────────────────────────────┘  │
// │                                              │
// │  ┌──────────┐ ┌──────────┐ ┌────────────┐  │
// │  │ スタック   │ │ スタック   │ │ Metaspace  │  │
// │  │ Thread-1 │ │ Thread-2 │ │ (クラス情報) │  │
// │  └──────────┘ └──────────┘ └────────────┘  │
// │                                              │
// │  ┌──────────────────────────────────────────┐│
// │  │    ネイティブメモリ（Direct Buffer等）      ││
// │  └──────────────────────────────────────────┘│
// └──────────────────────────────────────────────┘

// Runtime APIでメモリ情報を取得
public class MemoryInfo {
    public static void main(String[] args) {
        Runtime rt = Runtime.getRuntime();
        long maxMemory = rt.maxMemory();       // -Xmx
        long totalMemory = rt.totalMemory();   // 現在確保済み
        long freeMemory = rt.freeMemory();     // 未使用分
        long usedMemory = totalMemory - freeMemory;

        System.out.println("最大ヒープ: " + maxMemory / 1024 / 1024 + " MB");
        System.out.println("確保済み:   " + totalMemory / 1024 / 1024 + " MB");
        System.out.println("使用中:     " + usedMemory / 1024 / 1024 + " MB");
        System.out.println("空き:       " + freeMemory / 1024 / 1024 + " MB");
    }
}`,
      },
      {
        title: "Java 21のJVM改善",
        content:
          "Java 21ではJVMに多くの改善が加えられました。仮想スレッド（Virtual Threads / Project Loom）が正式リリースされ、軽量スレッドにより大量の並行処理が効率的に実行できます。仮想スレッドはヒープ上に格納され、従来のプラットフォームスレッドのように大きなスタック領域を消費しません。また、Generational ZGCが導入され、ZGCに世代別GCの仕組みを取り入れることで、若いオブジェクトの回収効率が大幅に向上しました。さらにString Templatesなどの言語改善もJVMレベルでサポートされています。",
        code: `// Java 21: 仮想スレッド（Virtual Threads）
// 従来のプラットフォームスレッドより大幅に軽量
import java.util.concurrent.Executors;
import java.util.stream.IntStream;

public class VirtualThreadDemo {
    public static void main(String[] args) throws Exception {
        // 仮想スレッドのExecutorを使用
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            IntStream.rangeClosed(1, 10_000).forEach(i -> {
                executor.submit(() -> {
                    // 各タスクが仮想スレッドで実行される
                    Thread.sleep(1000);
                    System.out.println("タスク " + i
                        + " [" + Thread.currentThread() + "]");
                    return i;
                });
            });
        }
        // 10,000個の仮想スレッドを同時実行可能
        // プラットフォームスレッドでは不可能な規模

        // 仮想スレッドを直接作成
        Thread vThread = Thread.ofVirtual()
            .name("my-virtual-thread")
            .start(() -> {
                System.out.println("仮想スレッド実行中");
                System.out.println("isVirtual: "
                    + Thread.currentThread().isVirtual());
            });
        vThread.join();
    }
}

// Generational ZGCの有効化（Java 21）
// java -XX:+UseZGC -XX:+ZGenerational MyApp
// ※Java 21ではZGenerationalフラグで世代別を有効化
// ※Java 23以降はZGCがデフォルトで世代別になる予定`,
      },
    ],
  },
  {
    id: "heap-stack",
    title: "ヒープとスタック",
    description:
      "ヒープ領域とスタック領域の構造、Metaspace、直接メモリの仕組みを詳しく学ぶ",
    category: "memory",
    sections: [
      {
        title: "ヒープ領域（Young世代/Old世代）",
        content:
          "ヒープ領域はオブジェクトのインスタンスが格納される共有メモリです。Young世代（若い世代）とOld世代（古い世代）に分かれます。Young世代はさらにEden領域とSurvivor領域（S0/S1）に分かれます。新しいオブジェクトはまずEdenに割り当てられ、Minor GC（Young GC）で生き残ったオブジェクトはSurvivor領域に移動します。複数回のGCを生き残ったオブジェクトは昇格（Promotion）してOld世代に移ります。昇格の閾値は-XX:MaxTenuringThresholdで設定できます（デフォルトは15）。",
        code: `// ヒープのYoung/Old世代の動きを確認する
// java -Xms256m -Xmx256m -XX:+PrintGCDetails -Xlog:gc* HeapDemo

import java.util.ArrayList;
import java.util.List;

public class HeapDemo {
    public static void main(String[] args) {
        List<byte[]> longLived = new ArrayList<>();

        for (int i = 0; i < 100; i++) {
            // Edenに割り当てられる短命オブジェクト
            byte[] shortLived = new byte[1024 * 100]; // 100KB
            // すぐに参照を失うのでMinor GCで回収される

            if (i % 10 == 0) {
                // 長寿命オブジェクト → Old世代に昇格
                longLived.add(new byte[1024 * 1024]); // 1MB
                System.out.println("長寿命オブジェクト追加: "
                    + longLived.size() + "個");
            }
        }

        // ヒープ状態の確認
        Runtime rt = Runtime.getRuntime();
        System.out.println("使用中ヒープ: "
            + (rt.totalMemory() - rt.freeMemory()) / 1024 / 1024 + " MB");
    }
}

// ヒープ領域の構造:
// ┌─────────────────────────────────────────┐
// │              Young世代                   │
// │  ┌────────┐ ┌────────┐ ┌────────┐      │
// │  │  Eden  │ │   S0   │ │   S1   │      │
// │  │ (新規) │ │(From)  │ │ (To)   │      │
// │  └────────┘ └────────┘ └────────┘      │
// ├─────────────────────────────────────────┤
// │              Old世代                     │
// │  ┌───────────────────────────────────┐  │
// │  │    Tenured（長寿命オブジェクト）     │  │
// │  └───────────────────────────────────┘  │
// └─────────────────────────────────────────┘`,
      },
      {
        title: "スタックフレーム",
        content:
          "各スレッドには専用のスタック領域が割り当てられ、メソッド呼び出しごとにスタックフレームが積まれます。スタックフレームにはローカル変数配列、オペランドスタック、フレームデータ（定数プールへの参照など）が含まれます。メソッドが終了するとフレームがポップされます。再帰呼び出しが深くなりすぎるとStackOverflowErrorが発生します。スタックサイズは-Xssオプションで設定でき、デフォルトは通常512KB〜1MBです。",
        code: `// スタックフレームの動作を理解する
public class StackFrameDemo {
    // メソッド呼び出しのたびにスタックフレームが積まれる
    //
    // スタック:
    // ┌──────────────────┐
    // │ multiply(3, 4)   │ ← 現在のフレーム
    // ├──────────────────┤
    // │ calculate(3, 4)  │
    // ├──────────────────┤
    // │ main(args)       │ ← 最初のフレーム
    // └──────────────────┘

    public static void main(String[] args) {
        int result = calculate(3, 4);
        System.out.println("結果: " + result);
    }

    // スタックフレーム: ローカル変数 [a=3, b=4, sum]
    static int calculate(int a, int b) {
        int sum = a + b;
        return multiply(sum, 2);
    }

    // スタックフレーム: ローカル変数 [x, y]
    static int multiply(int x, int y) {
        return x * y;
    }

    // StackOverflowErrorの例
    static void infiniteRecursion(int depth) {
        System.out.println("深さ: " + depth);
        infiniteRecursion(depth + 1); // 終了条件なし → StackOverflowError
    }
}

// スタックサイズの設定
// java -Xss512k StackFrameDemo   # 512KBに設定
// java -Xss1m StackFrameDemo     # 1MBに設定（デフォルト相当）
// java -Xss2m StackFrameDemo     # 2MB（深い再帰が必要な場合）`,
      },
      {
        title: "メソッド領域 / Metaspace",
        content:
          "メソッド領域にはクラスの構造情報（フィールド、メソッドのメタデータ、定数プール、staticフィールド）が格納されます。Java 7以前はPermGen（永続世代）としてヒープ内に配置されていましたが、Java 8以降はMetaspaceとしてネイティブメモリ上に移されました。Metaspaceはデフォルトで自動拡張されますが、-XX:MaxMetaspaceSizeで上限を設定できます。動的にクラスを大量生成するフレームワーク（Spring、Hibernateなど）ではMetaspaceの監視が重要です。",
        code: `// Metaspaceの使用状況を確認する
import java.lang.management.ManagementFactory;
import java.lang.management.MemoryPoolMXBean;

public class MetaspaceDemo {
    public static void main(String[] args) {
        // Metaspaceの使用状況を取得
        for (MemoryPoolMXBean pool :
                ManagementFactory.getMemoryPoolMXBeans()) {
            if (pool.getName().contains("Metaspace")) {
                long used = pool.getUsage().getUsed();
                long committed = pool.getUsage().getCommitted();
                long max = pool.getUsage().getMax();
                System.out.println("Metaspace使用量: "
                    + used / 1024 / 1024 + " MB");
                System.out.println("Metaspaceコミット: "
                    + committed / 1024 / 1024 + " MB");
                System.out.println("Metaspace最大: "
                    + (max == -1 ? "無制限" : max / 1024 / 1024 + " MB"));
            }
        }
    }
}

// Metaspace関連のJVMオプション
// -XX:MetaspaceSize=128m        # 初期サイズ（GCトリガー閾値）
// -XX:MaxMetaspaceSize=512m     # 最大サイズ（上限設定）
// -XX:MinMetaspaceFreeRatio=40  # GC後の最小空き率
// -XX:MaxMetaspaceFreeRatio=70  # GC後の最大空き率

// Java 7以前（PermGen）との比較:
// PermGen: ヒープ内、固定サイズ、OOMが発生しやすい
// Metaspace: ネイティブメモリ、自動拡張、柔軟性が高い`,
      },
      {
        title: "直接メモリ（DirectByteBuffer）",
        content:
          "直接メモリ（Direct Memory / Off-Heap Memory）はJVMヒープ外のネイティブメモリ領域です。ByteBuffer.allocateDirect()で確保でき、I/O操作時にヒープとネイティブメモリ間のコピーを省略できるため、大規模なI/O処理で高いパフォーマンスを発揮します。ただし、GCによる自動回収が遅れることがあるため、使用後は明示的に解放することが推奨されます。NIOチャネルやNettyなどのフレームワークで多用されます。-XX:MaxDirectMemorySizeで上限を設定できます。",
        code: `import java.nio.ByteBuffer;

public class DirectMemoryDemo {
    public static void main(String[] args) {
        // ヒープ上のByteBuffer（通常のバッファ）
        ByteBuffer heapBuffer = ByteBuffer.allocate(1024 * 1024); // 1MB
        System.out.println("ヒープバッファ: isDirect=" + heapBuffer.isDirect());
        // isDirect=false

        // 直接メモリ上のByteBuffer（Off-Heap）
        ByteBuffer directBuffer = ByteBuffer.allocateDirect(1024 * 1024);
        System.out.println("直接バッファ:   isDirect=" + directBuffer.isDirect());
        // isDirect=true

        // パフォーマンス比較
        int iterations = 1_000_000;

        // ヒープバッファへの書き込み
        long start = System.nanoTime();
        for (int i = 0; i < iterations; i++) {
            heapBuffer.putInt(0, i);
        }
        long heapTime = System.nanoTime() - start;

        // 直接バッファへの書き込み
        start = System.nanoTime();
        for (int i = 0; i < iterations; i++) {
            directBuffer.putInt(0, i);
        }
        long directTime = System.nanoTime() - start;

        System.out.println("ヒープバッファ:  " + heapTime / 1_000_000 + " ms");
        System.out.println("直接バッファ:    " + directTime / 1_000_000 + " ms");

        // 直接バッファの明示的な解放（推奨）
        // sun.misc.Unsafe経由で解放（本番では慎重に使用）
        // またはバッファをnullにしてSystem.gc()を呼ぶ
        directBuffer = null;
        System.gc();
    }
}

// 直接メモリのJVMオプション
// -XX:MaxDirectMemorySize=256m  # 直接メモリの上限設定`,
      },
    ],
  },

  // ===== ガベージコレクション =====
  {
    id: "gc-basics",
    title: "GCの基礎",
    description:
      "GC Roots、マーク&スイープ、世代別GC、Stop-the-Worldの基本概念を理解する",
    category: "gc",
    sections: [
      {
        title: "ルート参照（GC Roots）",
        content:
          "ガベージコレクタはGC Rootsからの到達可能性（Reachability）に基づいてオブジェクトの生死を判定します。GC Rootsには、スタック上のローカル変数、staticフィールド、JNI参照、アクティブなスレッドオブジェクトなどが含まれます。GC Rootsから参照チェーンを辿って到達できるオブジェクトは「生存」、到達できないオブジェクトは「ゴミ」として回収対象になります。参照カウント方式と異なり、循環参照があっても正しく回収できるのがこの方式の利点です。",
        code: `// GC Rootsからの到達可能性
public class GcRootsDemo {
    // GC Root: staticフィールド
    private static Object staticRef = new Object();

    public static void main(String[] args) {
        // GC Root: ローカル変数（スタック上）
        Object localRef = new Object();

        // 到達可能なオブジェクト（localRefから辿れる）
        Object[] array = new Object[3];
        array[0] = new Object(); // arrayから到達可能
        localRef = array;         // localRefがarrayを指す

        // 到達不能 → GC対象
        Object garbage = new Object();
        garbage = null; // 参照を切る → GC対象

        // 循環参照でもGC Rootsから到達不能なら回収される
        Object a = new Object();
        Object b = new Object();
        // a → b → a の循環参照（実際にはフィールド経由で実現）
        // 両方のローカル変数がnullになれば回収される
        a = null;
        b = null;
        // → 循環参照していても、GC Rootsから到達不能なので回収される
    }
}

// GC Rootsの種類:
// 1. スタック上のローカル変数（各スレッド）
// 2. staticフィールド
// 3. JNIグローバル参照
// 4. アクティブなスレッドオブジェクト
// 5. synchronized でロック中のオブジェクト
// 6. JVM内部の参照（基本型のClassオブジェクト等）`,
      },
      {
        title: "マーク&スイープ",
        content:
          "マーク&スイープはGCの基本アルゴリズムです。マークフェーズでGC Rootsから到達可能なオブジェクトをすべてマークし、スイープフェーズでマークされていないオブジェクトのメモリを解放します。単純なマーク&スイープではメモリのフラグメンテーション（断片化）が発生するため、マーク&コンパクトという変種では生存オブジェクトを一方に寄せて連続した空き領域を作ります。マーク&コピーでは生存オブジェクトを別の領域にコピーすることでフラグメンテーションを防ぎます。",
        code: `// マーク&スイープの概念を理解する

// 【マークフェーズ】GC Rootsから参照を辿って到達可能オブジェクトをマーク
//
// GC Roots
//   │
//   ├── obj1 [マーク済] ──→ obj2 [マーク済]
//   │                         │
//   └── obj3 [マーク済]       └── obj4 [マーク済]
//
//   obj5 [未マーク]  obj6 [未マーク]  ← 到達不能
//
// 【スイープフェーズ】未マークのオブジェクトを回収
//
// メモリ:
// [obj1][    ][obj2][obj3][    ][obj4]
//        ↑空き               ↑空き
// → フラグメンテーションが発生！
//
// 【コンパクション】生存オブジェクトを詰めて断片化を解消
//
// メモリ:
// [obj1][obj2][obj3][obj4][          ]
//                          ↑連続した空き領域

// finalize()は非推奨（Java 9+で@Deprecated）
// 代わりにCleaner/PhantomReferenceを使う
import java.lang.ref.Cleaner;

public class CleanerDemo implements AutoCloseable {
    private static final Cleaner cleaner = Cleaner.create();
    private final Cleaner.Cleanable cleanable;
    private final Resource resource;

    // クリーンアップ対象のリソース（staticで外部クラスへの参照を持たない）
    private static class Resource implements Runnable {
        private final String name;
        Resource(String name) { this.name = name; }
        @Override
        public void run() {
            System.out.println("リソース解放: " + name);
        }
    }

    public CleanerDemo(String name) {
        this.resource = new Resource(name);
        this.cleanable = cleaner.register(this, resource);
    }

    @Override
    public void close() {
        cleanable.clean(); // 明示的にクリーンアップ
    }
}`,
      },
      {
        title: "世代別GCの仕組み",
        content:
          "世代別GC（Generational GC）は「ほとんどのオブジェクトは短命である」という弱い世代仮説に基づいています。ヒープをYoung世代とOld世代に分け、Young世代では頻繁にMinor GCを実行し、短命オブジェクトを素早く回収します。Minor GCではEden + 使用中のSurvivor領域の生存オブジェクトをもう一方のSurvivor領域にコピーします（マーク&コピー）。一定回数（MaxTenuringThreshold）のGCを生き残ったオブジェクトはOld世代に昇格します。Old世代が満杯になるとMajor GC（Full GC）が発生し、ヒープ全体を対象にGCが実行されます。",
        code: `// 世代別GCの流れを確認する
// java -Xms128m -Xmx128m -Xlog:gc*=info -XX:+UseSerialGC GenGcDemo

import java.util.ArrayList;
import java.util.List;

public class GenGcDemo {
    public static void main(String[] args) throws InterruptedException {
        List<byte[]> oldGenObjects = new ArrayList<>();

        System.out.println("=== 世代別GCのデモ ===");

        for (int round = 1; round <= 20; round++) {
            // 短命オブジェクト（Eden → Minor GCで回収）
            for (int i = 0; i < 100; i++) {
                byte[] shortLived = new byte[10_000]; // 10KB
                // ループ終了後に参照が切れる → GC対象
            }

            // 一部のオブジェクトは長寿命（Old世代に昇格）
            if (round % 5 == 0) {
                oldGenObjects.add(new byte[5_000_000]); // 5MB
                System.out.println("Round " + round
                    + ": Old世代にオブジェクト追加（計 "
                    + oldGenObjects.size() + " 個）");
            }

            Thread.sleep(100);
        }

        // GCログ出力例（-Xlog:gc*=info）:
        // [gc] GC(0) Pause Young (Allocation Failure)
        //   Eden: 33M->0M  Survivor: 0M->4M  Old: 0M->0M
        // [gc] GC(5) Pause Young (Allocation Failure)
        //   Eden: 33M->0M  Survivor: 4M->3M  Old: 5M->5M
        // [gc] GC(10) Pause Full (Allocation Failure)
        //   全領域を対象にGC実行
    }
}`,
      },
      {
        title: "Stop-the-World",
        content:
          "Stop-the-World（STW）とは、GC実行中にすべてのアプリケーションスレッドが一時停止する現象です。GCがオブジェクトグラフを正確にトレースするために必要ですが、アプリケーションの応答性に影響します。STWの時間はGCアルゴリズムやヒープサイズによって異なり、数ミリ秒から数秒に及ぶことがあります。G1 GCやZGCなどの最新GCは、STW時間を最小化する設計になっています。セーフポイント（Safepoint）はJVMがSTWを開始できるコード上のポイントで、すべてのスレッドがセーフポイントに到達するまでSTWは開始されません。",
        code: `// Stop-the-Worldの影響を測定する
public class StwDemo {
    public static void main(String[] args) throws InterruptedException {
        // レイテンシ測定スレッド
        Thread monitor = new Thread(() -> {
            long prev = System.nanoTime();
            while (!Thread.currentThread().isInterrupted()) {
                long now = System.nanoTime();
                long pause = (now - prev) / 1_000_000; // ミリ秒

                // 10ms以上の停止はSTWの可能性
                if (pause > 10) {
                    System.out.println("!! 停止検出: " + pause + " ms"
                        + "（STWの可能性）");
                }
                prev = now;

                try {
                    Thread.sleep(1); // 1msごとにチェック
                } catch (InterruptedException e) {
                    break;
                }
            }
        });
        monitor.setDaemon(true);
        monitor.start();

        // メモリを大量消費してGCを発生させる
        byte[][] data = new byte[1000][];
        for (int i = 0; i < 1000; i++) {
            data[i] = new byte[1024 * 1024]; // 1MB
            if (i % 100 == 0) {
                // 古いデータを解放してGCを誘発
                for (int j = 0; j < i; j++) {
                    data[j] = null;
                }
            }
        }

        Thread.sleep(3000);
    }
}

// STWを最小化するJVMオプション:
// -XX:+UseG1GC               # G1 GC（バランス型）
// -XX:MaxGCPauseMillis=200   # 目標停止時間200ms
// -XX:+UseZGC                # ZGC（超低レイテンシ）
// -XX:+UseShenandoahGC       # Shenandoah（低レイテンシ）`,
      },
    ],
  },
  {
    id: "gc-algorithms",
    title: "GCアルゴリズム",
    description:
      "Serial GC、Parallel GC、G1 GC、ZGC/Shenandoahの特徴と使い分けを学ぶ",
    category: "gc",
    sections: [
      {
        title: "Serial GC",
        content:
          "Serial GCは最もシンプルなGCアルゴリズムで、シングルスレッドでGCを実行します。Young世代ではマーク&コピー、Old世代ではマーク&コンパクトを使用します。GC中はすべてのアプリケーションスレッドが停止（STW）します。メモリ消費量が少なく、シングルコア環境や小規模アプリケーション（数百MB程度のヒープ）に適しています。コンテナ環境で1CPU割り当ての場合にも有効です。-XX:+UseSerialGCで有効化します。",
        code: `// Serial GCの有効化と動作確認
// java -XX:+UseSerialGC -Xms64m -Xmx64m -Xlog:gc*=info SerialGcDemo

public class SerialGcDemo {
    public static void main(String[] args) {
        System.out.println("=== Serial GC デモ ===");

        // 使用中のGCを確認
        java.lang.management.ManagementFactory
            .getGarbageCollectorMXBeans()
            .forEach(gc -> System.out.println(
                "GC名: " + gc.getName()
                + " / コレクション回数: " + gc.getCollectionCount()));

        // メモリ割り当てでGCを発生させる
        for (int i = 0; i < 1000; i++) {
            byte[] data = new byte[50_000]; // 50KB
        }

        // GCの結果を確認
        java.lang.management.ManagementFactory
            .getGarbageCollectorMXBeans()
            .forEach(gc -> System.out.println(
                "GC名: " + gc.getName()
                + " / コレクション回数: " + gc.getCollectionCount()
                + " / 合計時間: " + gc.getCollectionTime() + " ms"));
    }
}

// Serial GCのGCログ出力例:
// [gc] GC(0) Pause Young (Allocation Failure)
//   DefNew: 17472K->2176K(19648K), 0.0045123 secs
// [gc] GC(1) Pause Full (Allocation Failure)
//   Tenured: 43712K->25600K(43712K), 0.0312456 secs

// Serial GCの特徴:
// ✓ シンプル・低オーバーヘッド
// ✓ 小ヒープ向き（数百MB以下）
// ✗ マルチコアの恩恵なし
// ✗ STW時間が長い`,
      },
      {
        title: "Parallel GC",
        content:
          "Parallel GC（Throughput GC）は複数のGCスレッドを使って並列にGCを実行します。Serial GCと同じアルゴリズム（Young: マーク&コピー、Old: マーク&コンパクト）ですが、複数スレッドで並列処理するためGC時間が短縮されます。スループット（GCに費やす時間の割合を最小化）を重視する設計で、バッチ処理や大量データ処理に適しています。Java 8まではデフォルトGCでした。-XX:ParallelGCThreadsでGCスレッド数を設定できます。",
        code: `// Parallel GCの有効化と設定
// java -XX:+UseParallelGC -Xms256m -Xmx256m \\
//      -XX:ParallelGCThreads=4 -Xlog:gc*=info ParallelGcDemo

public class ParallelGcDemo {
    public static void main(String[] args) {
        System.out.println("=== Parallel GC デモ ===");
        System.out.println("利用可能プロセッサ: "
            + Runtime.getRuntime().availableProcessors());

        long start = System.currentTimeMillis();

        // 大量のオブジェクト生成（スループット測定）
        for (int round = 0; round < 50; round++) {
            byte[][] objects = new byte[1000][];
            for (int i = 0; i < 1000; i++) {
                objects[i] = new byte[10_000]; // 10KB × 1000 = 10MB
            }
            // ラウンド終了時にオブジェクトが回収される
        }

        long elapsed = System.currentTimeMillis() - start;
        System.out.println("処理時間: " + elapsed + " ms");

        // GC統計の確認
        java.lang.management.ManagementFactory
            .getGarbageCollectorMXBeans()
            .forEach(gc -> System.out.println(
                gc.getName() + ": "
                + gc.getCollectionCount() + "回, "
                + gc.getCollectionTime() + "ms"));
    }
}

// Parallel GCの主要オプション:
// -XX:+UseParallelGC              # Parallel GCを有効化
// -XX:ParallelGCThreads=N         # GCスレッド数
// -XX:GCTimeRatio=99              # GC時間の割合（1/(1+N)）
// -XX:MaxGCPauseMillis=200        # 最大停止時間の目標
// -XX:+UseAdaptiveSizePolicy      # ヒープサイズ自動調整（デフォルト有効）`,
      },
      {
        title: "G1 GC（デフォルト）",
        content:
          "G1 GC（Garbage-First GC）はJava 9以降のデフォルトGCです。ヒープを固定サイズのリージョン（通常1〜32MB）に分割し、各リージョンをEden、Survivor、Old、Humongousのいずれかに動的に割り当てます。G1はGC停止時間の目標値（-XX:MaxGCPauseMillis）を設定でき、ゴミの多いリージョンを優先的に回収（Garbage-First）することで、効率的なGCを実現します。Mixed GCではYoungとOldの両方のリージョンを同時に回収できます。大規模ヒープ（数GB〜数十GB）でも安定した停止時間を実現します。",
        code: `// G1 GCの有効化と設定
// java -XX:+UseG1GC -Xms512m -Xmx512m \\
//      -XX:MaxGCPauseMillis=200 \\
//      -XX:G1HeapRegionSize=4m \\
//      -Xlog:gc*=info G1GcDemo

import java.util.ArrayList;
import java.util.List;

public class G1GcDemo {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("=== G1 GC デモ ===");
        List<byte[]> longLived = new ArrayList<>();

        for (int round = 0; round < 100; round++) {
            // 通常サイズのオブジェクト（Eden リージョンに配置）
            for (int i = 0; i < 100; i++) {
                byte[] obj = new byte[5_000]; // 5KB
            }

            // 巨大オブジェクト（Humongousリージョンに配置）
            // リージョンサイズの50%を超えるオブジェクト
            if (round % 20 == 0) {
                longLived.add(new byte[5_000_000]); // 5MB
                System.out.println("Humongousオブジェクト追加: "
                    + longLived.size());
            }

            Thread.sleep(50);
        }
    }
}

// G1 GCの主要フェーズ:
// 1. Young GC: Edenリージョンが満杯 → 生存オブジェクトをSurvivorへ
// 2. 並行マーキング: Old世代のマーキングをバックグラウンドで実行
// 3. Mixed GC: Young + ゴミの多いOldリージョンを同時回収
// 4. Full GC: 最後の手段（発生を避けるべき）

// G1 GCの主要オプション:
// -XX:+UseG1GC                    # G1 GCを有効化（Java 9+デフォルト）
// -XX:MaxGCPauseMillis=200        # 目標停止時間（デフォルト200ms）
// -XX:G1HeapRegionSize=4m         # リージョンサイズ（1-32MB）
// -XX:G1NewSizePercent=5          # Young世代の最小割合
// -XX:G1MaxNewSizePercent=60      # Young世代の最大割合
// -XX:InitiatingHeapOccupancyPercent=45  # 並行マーキング開始閾値`,
      },
      {
        title: "ZGC / Shenandoah",
        content:
          "ZGCとShenandoahは超低レイテンシを実現するGCです。ZGCはJava 15で正式リリースされ、GC停止時間を数ミリ秒以内に抑えます。カラーポインタとロードバリアを使い、ほぼすべてのGC処理を並行（Concurrent）に実行します。ヒープサイズが数TB規模でも停止時間はヒープサイズに比例しません。Java 21ではGenerational ZGCが導入されました。ShenandoahはRed Hatが開発したGCで、ZGCと同様に低レイテンシを目指しますが、Brooks Pointerとライトバリアという異なる方式を使用します。リアルタイム性が求められるWebアプリケーションや金融系システムに最適です。",
        code: `// ZGCの有効化
// java -XX:+UseZGC -Xms1g -Xmx1g -Xlog:gc*=info ZgcDemo
// Java 21: Generational ZGC
// java -XX:+UseZGC -XX:+ZGenerational -Xms1g -Xmx1g ZgcDemo

// Shenandoahの有効化（OpenJDKのみ、Oracle JDKには含まれない）
// java -XX:+UseShenandoahGC -Xms1g -Xmx1g -Xlog:gc*=info ZgcDemo

public class ZgcDemo {
    public static void main(String[] args) throws InterruptedException {
        System.out.println("=== ZGC / Shenandoah デモ ===");

        // レイテンシ測定スレッド
        Thread latencyMonitor = new Thread(() -> {
            long maxPause = 0;
            long prev = System.nanoTime();
            for (int i = 0; i < 100_000; i++) {
                long now = System.nanoTime();
                long pause = (now - prev) / 1_000_000;
                if (pause > maxPause) maxPause = pause;
                prev = now;
                try { Thread.sleep(1); }
                catch (InterruptedException e) { break; }
            }
            System.out.println("最大停止時間: " + maxPause + " ms");
        });
        latencyMonitor.setDaemon(true);
        latencyMonitor.start();

        // メモリ負荷をかける
        byte[][] data = new byte[500][];
        for (int i = 0; i < 500; i++) {
            data[i % 500] = new byte[2_000_000]; // 2MB
            if (i % 50 == 0) {
                System.out.println("割り当て: " + (i * 2) + " MB");
            }
            Thread.sleep(10);
        }

        latencyMonitor.join(5000);
    }
}

// GCの比較表:
// ┌────────────────┬──────────┬─────────┬─────────────┐
// │     GC         │ STW時間   │ スループ │ 推奨ヒープ    │
// ├────────────────┼──────────┼─────────┼─────────────┤
// │ Serial         │ 長い     │ 低      │ ～数百MB     │
// │ Parallel       │ 中程度   │ 高      │ ～数GB       │
// │ G1             │ 短い     │ 中-高   │ 数GB～数十GB  │
// │ ZGC            │ 極短     │ 中      │ 数百MB～数TB  │
// │ Shenandoah     │ 極短     │ 中      │ 数百MB～数TB  │
// └────────────────┴──────────┴─────────┴─────────────┘`,
      },
    ],
  },
  {
    id: "gc-tuning",
    title: "GCチューニング",
    description:
      "GCログの読み方、ヒープサイズ設定、G1GCパラメータ、GCログ解析ツールを習得する",
    category: "gc",
    sections: [
      {
        title: "GCログの有効化と読み方（-Xlog:gc）",
        content:
          "GCチューニングの第一歩はGCログの有効化です。Java 9以降は統合ログフレームワーク（-Xlog）を使い、-Xlog:gc*でGC関連のすべてのログを出力できます。GCログにはGCの種類（Young/Mixed/Full）、回収前後のヒープ使用量、GC停止時間などの重要な情報が含まれます。Java 8以前は-XX:+PrintGCDetails -XX:+PrintGCDateStampsを使用します。ログをファイルに出力する場合は-Xlog:gc*:file=gc.log:time,uptimeを指定します。ローテーション設定も可能です。",
        code: `# GCログの有効化（Java 9+）

# 基本的なGCログ出力
java -Xlog:gc MyApp

# 詳細なGCログをファイルに出力
java -Xlog:gc*=info:file=gc.log:time,uptime,level,tags MyApp

# ログローテーション付き（5ファイル、各20MB）
java -Xlog:gc*=info:file=gc.log:time,uptime:filecount=5,filesize=20m MyApp

# Java 8以前のGCログ設定
java -XX:+PrintGCDetails -XX:+PrintGCDateStamps \\
     -XX:+PrintGCTimeStamps -Xloggc:gc.log MyApp

# === GCログの読み方 ===

# Young GCのログ例:
# [2024-01-15T10:30:15.123+0900][0.456s] GC(0) Pause Young
#   (Normal) (G1 Evacuation Pause)
# [2024-01-15T10:30:15.130+0900][0.463s] GC(0)
#   Eden regions: 24->0(24)
#   Survivor regions: 0->3(3)
#   Old regions: 0->5
#   Humongous regions: 0->0
# [2024-01-15T10:30:15.130+0900][0.463s] GC(0)
#   Pause Young (Normal) 24M->8M(256M) 7.123ms
#
# 読み方:
# - Pause Young: Young世代のGC
# - 24M->8M: GC前24MB → GC後8MB
# - (256M): ヒープ全体のサイズ
# - 7.123ms: STW時間

# Full GCのログ例:
# [gc] GC(10) Pause Full (G1 Compaction Pause)
#   Eden: 0M  Survivor: 0M  Old: 200M->150M
#   Metaspace: 35M->35M
#   240M->150M(256M) 120.456ms
#
# 読み方:
# - Pause Full: Full GC（問題の兆候）
# - 120.456ms: 長い停止時間 → チューニングが必要`,
      },
      {
        title: "ヒープサイズ設定（-Xms / -Xmx）",
        content:
          "ヒープサイズの設定はJVMチューニングの最も基本的な項目です。-Xmsは初期ヒープサイズ、-Xmxは最大ヒープサイズを指定します。本番環境では-Xmsと-Xmxを同じ値に設定することが推奨されます。これによりヒープの拡張・縮小によるオーバーヘッドを防ぎます。適切なヒープサイズは、Full GC後のヒープ使用量の3〜4倍が目安です。Young世代の割合は-XX:NewRatioで設定でき、デフォルトは2（Old:Young = 2:1）です。",
        code: `# ヒープサイズの設定

# 基本設定（初期256MB、最大512MB）
java -Xms256m -Xmx512m MyApp

# 本番推奨（初期と最大を同じに）
java -Xms2g -Xmx2g MyApp

# Young世代サイズの設定
java -Xms2g -Xmx2g -XX:NewSize=512m -XX:MaxNewSize=512m MyApp

# NewRatioで設定（Old:Young = 2:1 → Youngが1/3）
java -Xms2g -Xmx2g -XX:NewRatio=2 MyApp

# === 適切なヒープサイズの決め方 ===

# Step 1: 現在のメモリ使用量を確認
java -Xlog:gc*=info -Xms512m -Xmx512m MyApp

# Step 2: Full GC後のヒープ使用量を確認
# GCログから: Full GC後 150MB使用 → 推奨ヒープ: 450MB～600MB

# Step 3: GC頻度と停止時間を確認して微調整
# Minor GC: 50ms以内、Full GC: 200ms以内が目安

# === メモリサイズの指定方法 ===
# -Xms512m   → 512メガバイト
# -Xmx2g     → 2ギガバイト
# -Xms1024k  → 1024キロバイト

# === OutOfMemoryError時の対策 ===
# ヒープダンプを自動取得
java -Xms2g -Xmx2g \\
     -XX:+HeapDumpOnOutOfMemoryError \\
     -XX:HeapDumpPath=/var/log/java/heapdump.hprof \\
     MyApp`,
      },
      {
        title: "G1GCのチューニングパラメータ",
        content:
          "G1 GCはデフォルトGCとして多くの場面で使われますが、ワークロードに応じたチューニングが有効です。最も重要なパラメータはMaxGCPauseMillis（目標停止時間）で、デフォルト200msです。この値を小さくするとGC頻度が増えスループットが低下し、大きくすると停止時間が長くなります。InitiatingHeapOccupancyPercent（IHOP）は並行マーキングを開始するヒープ占有率の閾値で、デフォルト45%です。G1 GCではFull GCの発生を避けることが最も重要で、Mixed GCで十分にOld領域を回収できるように調整します。",
        code: `# G1 GCのチューニングパラメータ

# 基本設定
java -XX:+UseG1GC \\
     -Xms4g -Xmx4g \\
     -XX:MaxGCPauseMillis=200 \\
     -Xlog:gc*=info:file=gc.log:time \\
     MyApp

# === 主要チューニングパラメータ ===

# リージョンサイズ（1MB/2MB/4MB/8MB/16MB/32MBから選択）
# ヒープの2048分割程度が目安
-XX:G1HeapRegionSize=4m

# 並行マーキング開始閾値（デフォルト45%）
# Full GCが頻発する場合は下げる
-XX:InitiatingHeapOccupancyPercent=35

# Mixed GC関連
-XX:G1MixedGCLiveThresholdPercent=85  # 回収対象リージョンの生存率閾値
-XX:G1MixedGCCountTarget=8            # Mixed GCの目標回数
-XX:G1OldCSetRegionThresholdPercent=10 # Mixed GCで回収するOldリージョン上限

# Young世代の割合
-XX:G1NewSizePercent=5                 # Young世代の最小割合（デフォルト5%）
-XX:G1MaxNewSizePercent=60             # Young世代の最大割合（デフォルト60%）

# GCスレッド数
-XX:ParallelGCThreads=8               # STW時の並列GCスレッド数
-XX:ConcGCThreads=2                   # 並行GCスレッド数

# === チューニング例: レイテンシ重視 ===
java -XX:+UseG1GC -Xms8g -Xmx8g \\
     -XX:MaxGCPauseMillis=100 \\
     -XX:G1NewSizePercent=20 \\
     -XX:G1MaxNewSizePercent=40 \\
     -XX:InitiatingHeapOccupancyPercent=35 \\
     -XX:ParallelGCThreads=8 \\
     -XX:ConcGCThreads=4 \\
     MyApp

# === チューニング例: スループット重視 ===
java -XX:+UseG1GC -Xms8g -Xmx8g \\
     -XX:MaxGCPauseMillis=500 \\
     -XX:G1NewSizePercent=30 \\
     -XX:G1MaxNewSizePercent=70 \\
     MyApp`,
      },
      {
        title: "GCログ解析ツール（GCViewer）",
        content:
          "GCログを手動で分析するのは困難なため、専用のツールを活用します。GCViewerはオープンソースのGCログ分析ツールで、GCログをグラフィカルに可視化できます。GCEasyはWebベースのGCログ分析サービスで、ログファイルをアップロードするだけで詳細なレポートを生成します。JDK付属のjstatコマンドでリアルタイムにGC統計を確認することも重要です。これらのツールでGC停止時間の傾向、ヒープ使用量の推移、GC頻度などを分析し、チューニングの方向性を決定します。",
        code: `# === GCViewer（デスクトップツール） ===
# ダウンロード: https://github.com/chewiebug/GCViewer
# GCログファイルを開いてグラフで分析

# GCViewerの起動
java -jar gcviewer-1.36.jar gc.log

# GCViewerで確認できる情報:
# - ヒープ使用量の推移グラフ
# - GC停止時間の分布
# - スループット（GCに費やした時間の割合）
# - Full GCの発生回数と時間

# === GCEasy（Webサービス） ===
# URL: https://gceasy.io/
# GCログファイルをアップロードするだけで分析
# レポート内容:
# - GC統計サマリー
# - メモリリークの検出
# - GC停止時間のヒストグラム
# - チューニング推奨事項

# === jstat（リアルタイムGC監視） ===

# プロセスIDの確認
jps -l

# GC統計を1秒ごとに10回表示
jstat -gcutil <PID> 1000 10

# 出力例:
#   S0     S1     E      O      M     CCS    YGC   YGCT   FGC  FGCT   CGC  CGCT   GCT
#   0.00  45.23  67.89  34.56  97.12  94.56   25   0.234    2  0.567    5  0.012  0.813

# 各列の意味:
# S0/S1: Survivor領域の使用率(%)
# E: Eden領域の使用率(%)
# O: Old世代の使用率(%)
# M: Metaspace使用率(%)
# YGC/YGCT: Young GC回数/時間
# FGC/FGCT: Full GC回数/時間
# GCT: GC合計時間

# ヒープ容量の詳細
jstat -gc <PID> 1000 5

# メモリ割り当て速度の確認（New世代のサイズ変化を監視）
jstat -gccapacity <PID> 1000 5`,
      },
    ],
  },

  // ===== チューニング =====
  {
    id: "memory-leak",
    title: "メモリリーク調査",
    description:
      "メモリリークのパターン、ヒープダンプ取得、MAT/VisualVMでの分析手法を学ぶ",
    category: "tuning",
    sections: [
      {
        title: "よくあるメモリリークパターン",
        content:
          "Javaでもメモリリークは発生します。GCは到達不能なオブジェクトのみ回収するため、不要なのに参照が残っているオブジェクトは解放されません。よくあるパターンには、コレクションへの追加のみで削除しない場合、staticフィールドに蓄積されるキャッシュ、クローズされないリソース（InputStream、Connection等）、リスナーやコールバックの登録解除漏れ、内部クラスが外部クラスへの参照を保持するケースなどがあります。これらはOutOfMemoryErrorの原因となり、本番環境で深刻な問題を引き起こします。",
        code: `import java.util.*;

public class MemoryLeakPatterns {

    // パターン1: コレクションに追加し続ける
    private static final List<byte[]> cache = new ArrayList<>();

    static void leakByCollection() {
        while (true) {
            cache.add(new byte[1024 * 1024]); // 削除しないため蓄積
        }
    }

    // パターン2: staticなMapでキャッシュ（上限なし）
    private static final Map<String, Object> sessionMap = new HashMap<>();

    static void leakByStaticMap(String sessionId, Object data) {
        sessionMap.put(sessionId, data);
        // セッション終了時にremove()を忘れると蓄積
    }

    // パターン3: リソースのクローズ漏れ
    static void leakByUnclosedResource() throws Exception {
        // BAD: クローズしない
        java.io.InputStream is =
            new java.io.FileInputStream("data.txt");
        is.read();
        // is.close() が呼ばれない → リソースリーク

        // GOOD: try-with-resources
        try (java.io.InputStream is2 =
                new java.io.FileInputStream("data.txt")) {
            is2.read();
        } // 自動的にクローズされる
    }

    // パターン4: リスナーの登録解除漏れ
    interface EventListener { void onEvent(String event); }
    private static final List<EventListener> listeners = new ArrayList<>();

    static void leakByListener() {
        // 登録はするが解除しない → リスナーオブジェクトが蓄積
        listeners.add(event -> System.out.println(event));
    }

    // パターン5: 内部クラスが外部クラスの参照を保持
    class InnerTask implements Runnable {
        // 非staticな内部クラスは外部クラスへの暗黙の参照を持つ
        @Override
        public void run() { /* ... */ }
    }
    // 対策: static内部クラスにする
    static class StaticInnerTask implements Runnable {
        @Override
        public void run() { /* ... */ }
    }
}`,
      },
      {
        title: "ヒープダンプの取得（jmap）",
        content:
          "メモリリークの調査にはヒープダンプ（Heap Dump）の取得が不可欠です。ヒープダンプはある時点でのヒープ上のすべてのオブジェクトのスナップショットです。jmapコマンドで実行中のJVMからヒープダンプを取得できます。また、-XX:+HeapDumpOnOutOfMemoryErrorオプションを設定しておくと、OOM発生時に自動的にヒープダンプが出力されます。ヒープダンプファイル（.hprof形式）は数百MBから数GBになることがあるため、ディスク容量に注意が必要です。",
        code: `# === ヒープダンプの取得方法 ===

# 方法1: jmapコマンド（推奨）
# プロセスIDを確認
jps -l
# 出力例: 12345 com.example.MyApp

# ヒープダンプを取得（ライブオブジェクトのみ）
jmap -dump:live,format=b,file=heapdump.hprof 12345

# すべてのオブジェクト（到達不能含む）
jmap -dump:format=b,file=heapdump_all.hprof 12345

# 方法2: OOM時に自動取得（本番必須設定）
java -XX:+HeapDumpOnOutOfMemoryError \\
     -XX:HeapDumpPath=/var/log/java/heapdump.hprof \\
     -Xmx512m MyApp

# 方法3: jcmdコマンド（Java 8+推奨）
jcmd 12345 GC.heap_dump /tmp/heapdump.hprof

# 方法4: JMX経由（リモートでも取得可能）
# VisualVMやJConsoleから取得

# === ヒープダンプ取得の注意点 ===
# - ダンプ中はアプリケーションが一時停止する
# - ファイルサイズ = ヒープ使用量と同程度
# - ディスク容量の事前確認が必要
# - 本番では-XX:HeapDumpPath先のディスク容量に注意

# === ヒープの簡易確認（ダンプなし） ===
# クラスごとのインスタンス数とメモリ使用量
jmap -histo 12345 | head -30

# 出力例:
#  num   #instances   #bytes  class name
#    1:       5000   50000000  [B (byte[])
#    2:      30000    1200000  java.lang.String
#    3:      25000     800000  java.util.HashMap$Node

# jcmd版
jcmd 12345 GC.class_histogram | head -30`,
      },
      {
        title: "Eclipse MAT / VisualVMでの分析",
        content:
          "Eclipse MAT（Memory Analyzer Tool）はヒープダンプを分析するための強力なツールです。ヒープダンプファイルを開くと、自動的にリーク疑い箇所を検出する「Leak Suspects」レポートを生成します。Dominator Treeでは各オブジェクトが保持するメモリ量を階層的に表示し、大量のメモリを保持しているオブジェクトを特定できます。OQL（Object Query Language）でオブジェクトを検索することも可能です。VisualVMはJDK付属のプロファイリングツールで、リアルタイムのヒープ使用量、GC活動、スレッド状態をGUIで監視できます。",
        code: `# === Eclipse MAT（Memory Analyzer Tool） ===
# ダウンロード: https://eclipse.dev/mat/

# 基本的な分析手順:
# 1. File → Open Heap Dump → heapdump.hprof を選択
# 2. 自動で "Leak Suspects" レポートが生成される
# 3. Dominator Tree で大きなオブジェクトを確認
# 4. Histogram で各クラスのインスタンス数を確認

# MAT の主要ビュー:
# - Leak Suspects: メモリリークの疑いがある箇所を自動検出
# - Dominator Tree: オブジェクトの支配木（保持メモリ順）
# - Histogram: クラスごとのインスタンス数とサイズ
# - Top Consumers: メモリ消費量トップのオブジェクト
# - OQL: SQLライクなクエリでオブジェクトを検索

# OQLクエリの例:
# 100KB以上のbyte配列を検索
# SELECT * FROM byte[] b WHERE b.@length > 100000

# HashMapのサイズが1000以上のものを検索
# SELECT m FROM java.util.HashMap m WHERE m.size > 1000

# === VisualVM ===
# JDK 8まではjvisualvmコマンドで起動
# JDK 9以降は別途ダウンロード: https://visualvm.github.io/

# VisualVMの起動
jvisualvm   # JDK 8の場合

# VisualVMの主要機能:
# - Monitor: CPU、メモリ、クラス数、スレッド数のリアルタイム監視
# - Threads: スレッドの状態とスタックトレース
# - Sampler: CPU/メモリのサンプリング
# - Profiler: 詳細なCPU/メモリプロファイリング
# - Heap Dump: ヒープダンプの取得と分析

# リモート接続設定（JMX）
java -Dcom.sun.management.jmxremote \\
     -Dcom.sun.management.jmxremote.port=9090 \\
     -Dcom.sun.management.jmxremote.ssl=false \\
     -Dcom.sun.management.jmxremote.authenticate=false \\
     MyApp`,
      },
      {
        title: "WeakReference / SoftReferenceの活用",
        content:
          "Javaの参照型を活用することでメモリリークを防止できます。通常の参照（Strong Reference）はGCに回収されません。SoftReferenceはメモリが不足した場合にGCが回収する参照で、キャッシュの実装に適しています。WeakReferenceはGCがいつでも回収できる参照で、WeakHashMapのキーなどに使われます。PhantomReferenceはオブジェクトがファイナライズされた後に通知を受ける仕組みで、ネイティブリソースの解放に使います。これらを適切に使い分けることで、メモリ効率の良いアプリケーションを設計できます。",
        code: `import java.lang.ref.*;
import java.util.WeakHashMap;

public class ReferenceDemo {
    public static void main(String[] args) {
        // === Strong Reference（通常の参照） ===
        // GCに回収されない
        Object strong = new Object();
        // strong = null にしない限り回収されない

        // === SoftReference（ソフト参照） ===
        // メモリ不足時のみGCが回収 → キャッシュに最適
        SoftReference<byte[]> softRef =
            new SoftReference<>(new byte[1024 * 1024]); // 1MB
        byte[] cached = softRef.get();
        if (cached != null) {
            System.out.println("キャッシュヒット: " + cached.length);
        } else {
            System.out.println("キャッシュミス: GCに回収された");
            // 再作成が必要
        }

        // === WeakReference（弱参照） ===
        // 次のGCで回収される可能性がある
        WeakReference<Object> weakRef = new WeakReference<>(new Object());
        System.out.println("GC前: " + weakRef.get()); // 非null
        System.gc();
        System.out.println("GC後: " + weakRef.get()); // nullの可能性

        // === WeakHashMap（キーが弱参照のMap） ===
        // キーへの強参照がなくなるとエントリが自動削除
        WeakHashMap<Object, String> weakMap = new WeakHashMap<>();
        Object key = new Object();
        weakMap.put(key, "値");
        System.out.println("削除前: " + weakMap.size()); // 1
        key = null; // キーへの強参照を削除
        System.gc();
        System.out.println("削除後: " + weakMap.size()); // 0の可能性

        // === PhantomReference（ファントム参照） ===
        // get()は常にnull。ReferenceQueueと組み合わせて使用
        ReferenceQueue<Object> queue = new ReferenceQueue<>();
        Object obj = new Object();
        PhantomReference<Object> phantomRef =
            new PhantomReference<>(obj, queue);
        obj = null;
        System.gc();
        // queueをポーリングしてクリーンアップ処理を実行
        Reference<?> ref = queue.poll();
        if (ref != null) {
            System.out.println("ファントム参照がキューに入った");
            // ネイティブリソースの解放などを実行
        }
    }
}

// 参照の強さ: Strong > Soft > Weak > Phantom
// Strong: 通常の参照。GCに回収されない
// Soft:   メモリ不足時のみ回収。キャッシュ向き
// Weak:   次のGCで回収。一時的な参照向き
// Phantom: get()は常にnull。リソース解放通知用`,
      },
    ],
  },
  {
    id: "profiling",
    title: "プロファイリング",
    description:
      "jconsole、JFR、async-profiler等を使ったCPU/メモリプロファイリング手法を学ぶ",
    category: "tuning",
    sections: [
      {
        title: "jconsole / jvisualvm",
        content:
          "jconsoleはJDK付属のJMXベースの監視ツールで、メモリ使用量、スレッド数、CPU負荷、MBeanの操作をリアルタイムで確認できます。軽量でローカル・リモート両方の接続に対応しています。jvisualvm（VisualVM）はjconsoleの上位互換で、サンプリング、プロファイリング、スナップショット比較、プラグイン拡張などの高度な機能を備えています。どちらもGUI操作で手軽にJVMの状態を監視でき、問題の初期調査に適しています。",
        code: `# === jconsole の起動 ===
jconsole
# ローカルプロセスを選択、またはリモート接続

# リモート接続用のJVMオプション
java -Dcom.sun.management.jmxremote \\
     -Dcom.sun.management.jmxremote.port=9090 \\
     -Dcom.sun.management.jmxremote.ssl=false \\
     -Dcom.sun.management.jmxremote.authenticate=false \\
     -Djava.rmi.server.hostname=192.168.1.100 \\
     MyApp

# === VisualVM の使い方 ===
# ダウンロード: https://visualvm.github.io/
visualvm

# VisualVMでの基本操作:
# 1. 左パネルでJVMプロセスを選択
# 2. Monitorタブ: CPU/メモリ/スレッドのリアルタイムグラフ
# 3. Threadsタブ: スレッド状態の時系列表示
# 4. Samplerタブ: CPUサンプリング開始
# 5. Profilerタブ: 詳細プロファイリング

# === プログラムからJMXでメモリ情報を取得 ===`,
      },
      {
        title: "JFR（Java Flight Recorder）",
        content:
          "Java Flight Recorder（JFR）はJDK 11以降で無料で使用できる低オーバーヘッドのプロファイリングツールです。CPU使用率、メモリ割り当て、GCイベント、I/O操作、スレッドのロック競合など、JVMの包括的なイベントデータを収集できます。本番環境でも使用できるよう設計されており、通常のパフォーマンスへの影響は1〜2%程度です。収集したデータはJDK Mission Control（JMC）で分析します。JFRはコマンドラインから起動でき、プログラムからAPIで制御することも可能です。",
        code: `# === JFRの起動方法 ===

# 方法1: JVMオプションで起動時に有効化
java -XX:StartFlightRecording=duration=60s,filename=recording.jfr MyApp

# 方法2: 詳細設定付き
java -XX:StartFlightRecording=settings=profile,\\
duration=120s,\\
maxsize=256m,\\
filename=recording.jfr \\
MyApp

# 方法3: jcmdで実行中のプロセスに対して開始/停止
jcmd <PID> JFR.start name=myrecording settings=profile
# ... しばらく待つ ...
jcmd <PID> JFR.stop name=myrecording filename=recording.jfr

# 方法4: jcmdで設定を確認
jcmd <PID> JFR.check

# === JFRの記録設定（プリセット） ===
# default: 低オーバーヘッド（本番向き）
# profile: 詳細情報（開発・調査向き）

# === JFRデータの分析（JDK Mission Control） ===
# ダウンロード: https://www.oracle.com/java/technologies/jdk-mission-control.html
# JMCで recording.jfr を開いて分析

# === プログラムからJFRを制御 ===`,
      },
      {
        title: "async-profiler",
        content:
          "async-profilerはJVM向けの高精度サンプリングプロファイラです。Linuxのperf_eventsとmacOSのdtraceを活用し、SafePoint Biasの問題がないため正確なプロファイリング結果を得られます。CPUプロファイリング、メモリアロケーションプロファイリング、ロック競合の分析が可能です。フレームグラフ（Flame Graph）形式で結果を可視化でき、ボトルネックを直感的に把握できます。軽量で本番環境でも使用可能です。IntelliJ IDEAにも統合されています。",
        code: `# === async-profiler のインストール ===
# ダウンロード: https://github.com/async-profiler/async-profiler

# Linux
wget https://github.com/async-profiler/async-profiler/releases/download/v3.0/async-profiler-3.0-linux-x64.tar.gz
tar xzf async-profiler-3.0-linux-x64.tar.gz

# macOS
wget https://github.com/async-profiler/async-profiler/releases/download/v3.0/async-profiler-3.0-macos.zip
unzip async-profiler-3.0-macos.zip

# === CPUプロファイリング ===
# 30秒間CPUプロファイリングしてフレームグラフを生成
./asprof -d 30 -f cpu_profile.html <PID>

# SVG形式のフレームグラフ
./asprof -d 30 -f flamegraph.svg <PID>

# テキスト形式の出力
./asprof -d 30 -o flat <PID>

# === メモリアロケーションプロファイリング ===
# オブジェクトの割り当て箇所を特定
./asprof -d 30 -e alloc -f alloc_profile.html <PID>

# === ロック競合プロファイリング ===
./asprof -d 30 -e lock -f lock_profile.html <PID>

# === JVMオプションでエージェントとして起動 ===
java -agentpath:/path/to/libasyncProfiler.so=start,\\
event=cpu,file=profile.html \\
MyApp

# === フレームグラフの読み方 ===
# - X軸: CPU時間の割合（幅が広いほどCPU消費大）
# - Y軸: コールスタックの深さ（上が呼び出し元）
# - 色: ランダム（同じメソッドは同じ色）
# - クリックで拡大、詳細を確認可能
# - 幅の広い「プラトー」がボトルネック箇所`,
      },
      {
        title: "CPU / メモリプロファイリングの手法",
        content:
          "プロファイリングの手法はサンプリングとインストルメンテーションの2種類があります。サンプリングは一定間隔でスレッドのスタックトレースを取得する方法で、低オーバーヘッドですが精度は統計的です。インストルメンテーションはバイトコードを書き換えて全メソッド呼び出しを計測する方法で、正確ですがオーバーヘッドが大きいため本番では使用しません。CPUプロファイリングではホットメソッド（CPU時間の多くを消費するメソッド）を特定し、メモリプロファイリングではオブジェクトの割り当て率が高い箇所やメモリリークの原因を特定します。",
        code: `// === プロファイリングの手法と実践 ===

// サンプリング vs インストルメンテーション
//
// サンプリング:
//   定期的にスタックトレースを取得
//   オーバーヘッド: 低（1-5%）
//   精度: 統計的（短いメソッドを見逃す可能性）
//   用途: 本番環境でも使用可能
//
// インストルメンテーション:
//   全メソッド呼び出しを計測
//   オーバーヘッド: 高（10-100%）
//   精度: 正確
//   用途: 開発・テスト環境のみ

// === CPU プロファイリング手順 ===
// 1. 問題の症状を確認（レスポンス遅延、CPU使用率100%等）
// 2. async-profiler等でCPUプロファイルを取得
// 3. フレームグラフでホットメソッドを特定
// 4. コードを改善して再測定

// CPU時間を消費するコード例と改善
public class ProfilingExample {

    // BAD: O(n^2)のアルゴリズム
    static boolean containsDuplicateSlow(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[i] == arr[j]) return true;
            }
        }
        return false;
    }

    // GOOD: O(n)のアルゴリズム
    static boolean containsDuplicateFast(int[] arr) {
        java.util.Set<Integer> seen = new java.util.HashSet<>();
        for (int val : arr) {
            if (!seen.add(val)) return true;
        }
        return false;
    }

    // === メモリプロファイリング ===
    // BAD: 大量の一時オブジェクトを生成
    static String buildStringSlow(int n) {
        String result = "";
        for (int i = 0; i < n; i++) {
            result += i + ","; // 毎回新しいStringオブジェクトを生成
        }
        return result;
    }

    // GOOD: StringBuilderで効率化
    static String buildStringFast(int n) {
        StringBuilder sb = new StringBuilder(n * 4);
        for (int i = 0; i < n; i++) {
            sb.append(i).append(',');
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        int[] data = new int[100_000];
        // プロファイラで両メソッドのCPU/メモリ消費を比較
        containsDuplicateSlow(data);
        containsDuplicateFast(data);

        buildStringSlow(100_000);
        buildStringFast(100_000);
    }
}`,
      },
    ],
  },
  {
    id: "jvm-options",
    title: "JVMオプション集",
    description:
      "メモリ、GC、デバッグ、コンテナ環境で使用する主要なJVMオプションを網羅する",
    category: "tuning",
    sections: [
      {
        title: "メモリ関連オプション（-Xms / -Xmx / -Xss）",
        content:
          "JVMのメモリ関連オプションは、アプリケーションの安定性とパフォーマンスに直結します。-Xmsは初期ヒープサイズ、-Xmxは最大ヒープサイズで、本番環境では同じ値に設定するのが一般的です。-Xssはスレッドごとのスタックサイズで、デフォルトは約512KB〜1MBです。Metaspaceのサイズは-XX:MetaspaceSize（GCトリガー閾値）と-XX:MaxMetaspaceSize（上限）で制御します。ダイレクトメモリは-XX:MaxDirectMemorySizeで設定します。これらの値は、アプリケーションの特性と利用可能なリソースに基づいて決定します。",
        code: `# === メモリ関連JVMオプション一覧 ===

# ヒープメモリ
-Xms2g                              # 初期ヒープサイズ（2GB）
-Xmx2g                              # 最大ヒープサイズ（2GB）

# Young世代
-XX:NewSize=512m                     # Young世代の初期サイズ
-XX:MaxNewSize=512m                  # Young世代の最大サイズ
-XX:NewRatio=2                       # Old:Young = 2:1
-XX:SurvivorRatio=8                  # Eden:S0:S1 = 8:1:1

# スタック
-Xss512k                            # スレッドスタックサイズ（512KB）

# Metaspace
-XX:MetaspaceSize=128m               # Metaspace初期サイズ（GCトリガー）
-XX:MaxMetaspaceSize=512m            # Metaspace最大サイズ

# ダイレクトメモリ
-XX:MaxDirectMemorySize=256m         # ダイレクトメモリの上限

# コードキャッシュ（JITコンパイル済みコードの格納領域）
-XX:ReservedCodeCacheSize=256m       # コードキャッシュの最大サイズ
-XX:InitialCodeCacheSize=64m         # コードキャッシュの初期サイズ

# === 推奨設定例 ===
# Webアプリケーション（Spring Boot）
java -Xms1g -Xmx1g \\
     -Xss512k \\
     -XX:MetaspaceSize=128m \\
     -XX:MaxMetaspaceSize=256m \\
     -jar myapp.jar

# バッチ処理（大量データ処理）
java -Xms4g -Xmx4g \\
     -XX:NewRatio=1 \\
     -XX:MaxDirectMemorySize=512m \\
     -jar batch.jar

# マイクロサービス（軽量）
java -Xms256m -Xmx256m \\
     -Xss256k \\
     -XX:MetaspaceSize=64m \\
     -XX:MaxMetaspaceSize=128m \\
     -jar microservice.jar`,
      },
      {
        title: "GC関連オプション（-XX:+UseG1GC等）",
        content:
          "GC関連のオプションは使用するGCアルゴリズムの選択と動作のチューニングに使います。-XX:+UseG1GC、-XX:+UseZGC、-XX:+UseParallelGC、-XX:+UseSerialGCでGCを選択します。G1 GCでは-XX:MaxGCPauseMillisで目標停止時間を設定でき、JVMがこの目標を達成するよう自動調整します。GCログの出力は-Xlog:gc*で設定します。GCの選択基準として、低レイテンシが必要ならZGC/Shenandoah、バランス重視ならG1 GC、スループット重視ならParallel GCが適しています。",
        code: `# === GCアルゴリズムの選択 ===
-XX:+UseSerialGC                     # Serial GC
-XX:+UseParallelGC                   # Parallel GC
-XX:+UseG1GC                         # G1 GC（Java 9+デフォルト）
-XX:+UseZGC                          # ZGC
-XX:+UseShenandoahGC                 # Shenandoah GC（OpenJDKのみ）

# === G1 GC チューニング ===
-XX:MaxGCPauseMillis=200             # 目標停止時間（ms）
-XX:G1HeapRegionSize=4m              # リージョンサイズ
-XX:InitiatingHeapOccupancyPercent=45 # 並行マーキング開始閾値
-XX:G1NewSizePercent=5               # Young世代の最小割合
-XX:G1MaxNewSizePercent=60           # Young世代の最大割合
-XX:ParallelGCThreads=8             # 並列GCスレッド数
-XX:ConcGCThreads=2                  # 並行GCスレッド数
-XX:MaxTenuringThreshold=15          # 昇格閾値

# === ZGC チューニング ===
-XX:+UseZGC                          # ZGCを有効化
-XX:+ZGenerational                   # 世代別ZGC（Java 21+）
-XX:SoftMaxHeapSize=4g               # ソフト上限（ZGCが目標とするサイズ）

# === GCログ設定（Java 9+） ===
-Xlog:gc*=info                       # GCログをコンソールに出力
-Xlog:gc*=info:file=gc.log:time      # ファイルに出力
-Xlog:gc*=info:file=gc.log:time,uptime:filecount=5,filesize=20m

# === 推奨設定例 ===

# 低レイテンシWebアプリ
java -XX:+UseZGC -XX:+ZGenerational \\
     -Xms4g -Xmx4g \\
     -Xlog:gc*=info:file=gc.log:time \\
     -jar webapp.jar

# バッチ処理（スループット重視）
java -XX:+UseParallelGC \\
     -Xms8g -Xmx8g \\
     -XX:ParallelGCThreads=8 \\
     -Xlog:gc*=info:file=gc.log:time \\
     -jar batch.jar`,
      },
      {
        title: "デバッグ関連オプション（-XX:+HeapDumpOnOutOfMemoryError）",
        content:
          "デバッグ・診断用のJVMオプションは、本番環境での障害調査に不可欠です。-XX:+HeapDumpOnOutOfMemoryErrorはOOM発生時にヒープダンプを自動出力する設定で、本番環境では必ず有効にすべきです。-XX:+PrintFlagsFinalで全JVMフラグの値を確認でき、設定の検証に役立ちます。エラーファイルの出力先は-XX:ErrorFileで指定します。JFR（Java Flight Recorder）は-XX:StartFlightRecordingで有効化でき、低オーバーヘッドで本番環境でもプロファイリングが可能です。",
        code: `# === デバッグ・診断オプション ===

# OOM時にヒープダンプを自動出力（本番必須）
-XX:+HeapDumpOnOutOfMemoryError
-XX:HeapDumpPath=/var/log/java/heapdump.hprof

# OOM時にスクリプトを実行（アラート通知など）
-XX:OnOutOfMemoryError="kill -9 %p"
-XX:OnOutOfMemoryError="/opt/scripts/oom_alert.sh %p"

# クラッシュ時のエラーファイル出力先
-XX:ErrorFile=/var/log/java/hs_err_pid%p.log

# JVMフラグの値を全表示
-XX:+PrintFlagsFinal

# コンパイラ関連
-XX:+PrintCompilation                # JITコンパイル状況を表示
-XX:+UnlockDiagnosticVMOptions       # 診断用オプションを有効化

# Java Flight Recorder（JFR）
-XX:StartFlightRecording=duration=60s,filename=recording.jfr
-XX:StartFlightRecording=settings=profile,maxsize=256m,disk=true

# リモートデバッグ
-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005

# JMXリモート監視
-Dcom.sun.management.jmxremote
-Dcom.sun.management.jmxremote.port=9090
-Dcom.sun.management.jmxremote.ssl=false
-Dcom.sun.management.jmxremote.authenticate=false

# === 本番環境の推奨設定 ===
java -Xms2g -Xmx2g \\
     -XX:+UseG1GC \\
     -XX:MaxGCPauseMillis=200 \\
     -XX:+HeapDumpOnOutOfMemoryError \\
     -XX:HeapDumpPath=/var/log/java/ \\
     -XX:ErrorFile=/var/log/java/hs_err_%p.log \\
     -XX:StartFlightRecording=settings=default,maxsize=128m,disk=true \\
     -Xlog:gc*=info:file=/var/log/java/gc.log:time:filecount=5,filesize=20m \\
     -jar myapp.jar`,
      },
      {
        title: "コンテナ環境での設定",
        content:
          "Docker/Kubernetesなどのコンテナ環境では、JVMのメモリ設定に特別な注意が必要です。Java 10以降、JVMはコンテナのメモリ制限を自動認識します（-XX:+UseContainerSupport、デフォルト有効）。-XX:MaxRAMPercentageでコンテナメモリの何%をヒープに割り当てるかを指定でき、固定値の-Xmxよりもコンテナ環境に適しています。CPUも同様に-XX:ActiveProcessorCountで制限できます。コンテナのメモリ制限とJVMのメモリ設定が不整合だと、OOM Killerによるプロセス強制終了が発生するため、適切な設定が重要です。",
        code: `# === コンテナ環境でのJVM設定 ===

# コンテナサポート（Java 10+、デフォルト有効）
-XX:+UseContainerSupport              # コンテナのリソース制限を認識

# ヒープサイズをコンテナメモリの割合で指定（推奨）
-XX:MaxRAMPercentage=75.0             # 最大ヒープ = メモリの75%
-XX:InitialRAMPercentage=50.0         # 初期ヒープ = メモリの50%
-XX:MinRAMPercentage=25.0             # 最小ヒープ = メモリの25%

# CPU数の制限
-XX:ActiveProcessorCount=2             # 認識するCPU数を制限

# === Dockerfile の例 ===
# FROM eclipse-temurin:21-jre-alpine
#
# COPY target/myapp.jar /app/myapp.jar
#
# ENV JAVA_OPTS="-XX:MaxRAMPercentage=75.0 \
#   -XX:InitialRAMPercentage=50.0 \
#   -XX:+UseG1GC \
#   -XX:+HeapDumpOnOutOfMemoryError \
#   -XX:HeapDumpPath=/tmp/ \
#   -Xlog:gc*=info:file=/var/log/gc.log:time"
#
# ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/myapp.jar"]

# === Kubernetes のリソース設定例 ===
# resources:
#   requests:
#     memory: "512Mi"
#     cpu: "500m"
#   limits:
#     memory: "1Gi"    # JVMはこの値を認識
#     cpu: "1000m"

# === コンテナ環境での注意点 ===

# メモリの内訳（コンテナ制限1GBの場合）
# ┌──────────────────────────────────────┐
# │        コンテナメモリ上限: 1GB         │
# ├──────────────────────────────────────┤
# │ ヒープ（-XX:MaxRAMPercentage=75%）    │
# │ → 約750MB                            │
# ├──────────────────────────────────────┤
# │ 非ヒープ領域（約250MB）               │
# │ - Metaspace: ~100MB                  │
# │ - スレッドスタック: ~50MB              │
# │ - コードキャッシュ: ~50MB              │
# │ - ダイレクトメモリ: ~50MB              │
# └──────────────────────────────────────┘
# ※ 非ヒープ領域を考慮しないとOOM Killerに強制終了される

# コンテナの実際のメモリ使用量を確認
# docker stats <container_id>

# JVMが認識しているメモリ制限を確認
java -XX:+UseContainerSupport \\
     -XshowSettings:system \\
     -version`,
      },
    ],
  },
];
