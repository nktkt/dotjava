export type PerformanceLevel = "jvm" | "profiling" | "optimization";

export interface PerformanceQuizQuestion {
  id: string;
  question: string;
  choices: { label: string; text: string }[];
  correctLabel: string;
  explanation: string;
  code?: string;
  level: PerformanceLevel;
  chapter: string;
}

export const performanceQuizQuestions: PerformanceQuizQuestion[] = [
  // ════════════════════════════════════════
  // jvm: JVMとメモリ管理 5問
  // ════════════════════════════════════════
  {
    id: "jvm-q01",
    question: "JVMのヒープメモリが分割される領域として正しい組み合わせはどれですか？",
    choices: [
      { label: "A", text: "Young Generation と Old Generation" },
      { label: "B", text: "Stack と Queue" },
      { label: "C", text: "Code と Data" },
      { label: "D", text: "Thread と Process" },
    ],
    correctLabel: "A",
    explanation:
      "JVMのヒープメモリはYoung Generation（Eden, Survivor S0/S1）とOld Generation（Tenured）に分割されます。新しいオブジェクトはEdenに割り当てられ、GCを生き延びたオブジェクトはSurvivorを経てOld Generationに昇格します。この世代別GCにより効率的なメモリ管理が実現されます。",
    level: "jvm",
    chapter: "jvm",
  },
  {
    id: "jvm-q02",
    question: "JVMオプション -Xms と -Xmx の説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "-Xms はスタックサイズ、-Xmx はメタスペースサイズ" },
      { label: "B", text: "-Xms はヒープの初期サイズ、-Xmx はヒープの最大サイズ" },
      { label: "C", text: "-Xms はスレッド数、-Xmx はコネクション数" },
      { label: "D", text: "-Xms はGC頻度、-Xmx はGCタイムアウト" },
    ],
    correctLabel: "B",
    explanation:
      "-Xms はJVMヒープメモリの初期サイズ、-Xmx はヒープメモリの最大サイズを設定します。例えば -Xms512m -Xmx2g は初期512MB、最大2GBです。本番環境では -Xms と -Xmx を同じ値に設定し、ヒープの動的リサイズによるオーバーヘッドを避けることが推奨されます。",
    level: "jvm",
    chapter: "jvm",
  },
  {
    id: "jvm-q03",
    question: "ガベージコレクション（GC）のStop-The-Worldの説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "JVMが完全に停止して再起動する" },
      { label: "B", text: "GC実行時にすべてのアプリケーションスレッドが一時停止する" },
      { label: "C", text: "GCがメモリ不足で停止する" },
      { label: "D", text: "特定のスレッドだけが停止する" },
    ],
    correctLabel: "B",
    explanation:
      "Stop-The-World（STW）はGC実行時にすべてのアプリケーションスレッドが一時停止する現象です。GCがヒープメモリを安全にスキャン・整理するために必要です。G1 GCやZGCなどのモダンなGCは、STW時間を最小限に抑える工夫がされています。",
    level: "jvm",
    chapter: "jvm",
  },
  {
    id: "jvm-q04",
    question: "G1 GCの特徴として正しいものはどれですか？",
    choices: [
      { label: "A", text: "ヒープ全体を一度にGCする" },
      { label: "B", text: "ヒープをリージョンに分割し、ゴミの多いリージョンを優先的に回収する" },
      { label: "C", text: "GCを一切行わない" },
      { label: "D", text: "Young GenerationのみをGC対象とする" },
    ],
    correctLabel: "B",
    explanation:
      "G1（Garbage First）GCはヒープを等サイズのリージョンに分割し、ゴミ（回収可能なオブジェクト）が多いリージョンを優先的に回収します。停止時間の目標値を設定でき（-XX:MaxGCPauseMillis）、予測可能な停止時間を実現します。Java 9以降のデフォルトGCです。",
    level: "jvm",
    chapter: "jvm",
  },
  {
    id: "jvm-q05",
    question: "OutOfMemoryError が発生する原因として最も一般的なものはどれですか？",
    choices: [
      { label: "A", text: "CPUの使用率が100%になった" },
      { label: "B", text: "メモリリーク（不要なオブジェクトへの参照が解放されない）" },
      { label: "C", text: "ネットワーク接続がタイムアウトした" },
      { label: "D", text: "ディスク容量が不足した" },
    ],
    correctLabel: "B",
    explanation:
      "OutOfMemoryErrorの最も一般的な原因はメモリリークです。コレクションにオブジェクトを追加し続けて削除しない、リスナーの登録解除忘れ、キャッシュの際限ない増加などが典型例です。ヒープダンプを取得して解析ツール（Eclipse MAT等）で原因を特定します。",
    level: "jvm",
    chapter: "jvm",
  },
  // ════════════════════════════════════════
  // profiling: プロファイリングと測定 5問
  // ════════════════════════════════════════
  {
    id: "profiling-q01",
    question: "Javaアプリケーションのプロファイリングツールとして適切でないものはどれですか？",
    choices: [
      { label: "A", text: "JVisualVM" },
      { label: "B", text: "Java Flight Recorder（JFR）" },
      { label: "C", text: "javac" },
      { label: "D", text: "async-profiler" },
    ],
    correctLabel: "C",
    explanation:
      "javacはJavaコンパイラであり、プロファイリングツールではありません。JVisualVMはCPU・メモリのモニタリング、JFRはJVM内部の詳細なイベント記録、async-profilerは低オーバーヘッドのCPU・メモリプロファイリングツールです。これらを使ってボトルネックを特定します。",
    level: "profiling",
    chapter: "profiling",
  },
  {
    id: "profiling-q02",
    question: "JMH（Java Microbenchmark Harness）の目的として正しいものはどれですか？",
    choices: [
      { label: "A", text: "Webアプリケーションの負荷テスト" },
      { label: "B", text: "JVMのウォームアップやJIT最適化を考慮した正確なマイクロベンチマークの実施" },
      { label: "C", text: "メモリリークの検出" },
      { label: "D", text: "GCログの解析" },
    ],
    correctLabel: "B",
    explanation:
      "JMHはOpenJDKが提供するマイクロベンチマークフレームワークです。JVMのウォームアップ、JIT（Just-In-Time）コンパイル、デッドコード除去などの影響を考慮した正確な測定が可能です。@Benchmarkアノテーションでベンチマーク対象メソッドを指定し、@Warmupでウォームアップ回数を設定します。",
    level: "profiling",
    chapter: "profiling",
  },
  {
    id: "profiling-q03",
    question: "GCログの分析で確認すべき重要な指標はどれですか？",
    choices: [
      { label: "A", text: "HTTPリクエスト数" },
      { label: "B", text: "GC停止時間、GC頻度、ヒープ使用量の推移" },
      { label: "C", text: "CPU温度" },
      { label: "D", text: "ネットワーク帯域幅" },
    ],
    correctLabel: "B",
    explanation:
      "GCログの分析では、GC停止時間（STW時間）、GC頻度、ヒープ使用量の推移が重要です。頻繁なGCやSTW時間の増加はパフォーマンス低下の兆候です。-Xlog:gc*オプションでGCログを出力し、GCEasyやGCViewerなどのツールで可視化・分析します。",
    level: "profiling",
    chapter: "profiling",
  },
  {
    id: "profiling-q04",
    question: "スレッドダンプの用途として正しいものはどれですか？",
    choices: [
      { label: "A", text: "データベースのスキーマを確認する" },
      { label: "B", text: "デッドロックの検出やスレッドの状態確認を行う" },
      { label: "C", text: "ネットワーク通信のパケットを解析する" },
      { label: "D", text: "ファイルシステムの使用量を確認する" },
    ],
    correctLabel: "B",
    explanation:
      "スレッドダンプは、ある時点でのすべてのスレッドのスタックトレースと状態（RUNNABLE、BLOCKED、WAITINGなど）を出力します。デッドロックの検出、スレッドの待機状態の分析、CPU使用率が高いスレッドの特定に使用します。jstack、jcmd、kill -3（SIGQUIT）で取得できます。",
    level: "profiling",
    chapter: "profiling",
  },
  {
    id: "profiling-q05",
    question: "パフォーマンステストにおいて「レイテンシのパーセンタイル（P99）」が意味するものはどれですか？",
    choices: [
      { label: "A", text: "リクエストの99%がこの時間以内に完了する" },
      { label: "B", text: "リクエストの1%がこの時間以内に完了する" },
      { label: "C", text: "平均レイテンシの99倍" },
      { label: "D", text: "最大レイテンシの99%" },
    ],
    correctLabel: "A",
    explanation:
      "P99（99パーセンタイル）は、リクエストの99%がこの値以下のレイテンシで完了することを意味します。平均値よりも外れ値（テールレイテンシ）を考慮した指標で、ユーザー体験の品質をより正確に反映します。SLA/SLOの定義にもよく使用されます。",
    level: "profiling",
    chapter: "profiling",
  },
  // ════════════════════════════════════════
  // optimization: 最適化テクニック 5問
  // ════════════════════════════════════════
  {
    id: "optimization-q01",
    question: "文字列の連結を大量に行う場合に最適なクラスはどれですか？",
    code: `// パターン1
String result = "";
for (int i = 0; i < 10000; i++) {
    result += i;
}

// パターン2
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 10000; i++) {
    sb.append(i);
}
String result = sb.toString();`,
    choices: [
      { label: "A", text: "Stringの+演算子（パターン1）" },
      { label: "B", text: "StringBuilder（パターン2）" },
      { label: "C", text: "StringBuffer" },
      { label: "D", text: "どちらも同じパフォーマンス" },
    ],
    correctLabel: "B",
    explanation:
      "StringBuilderはミュータブルな文字列バッファで、append()による文字列連結は新しいStringオブジェクトを生成しません。パターン1はループ毎にStringオブジェクトが生成されるため O(n²) の時間がかかります。StringBufferはスレッドセーフですが、単一スレッドではStringBuilderの方が高速です。",
    level: "optimization",
    chapter: "optimization",
  },
  {
    id: "optimization-q02",
    question: "コネクションプーリングの利点として正しいものはどれですか？",
    choices: [
      { label: "A", text: "SQLクエリの実行速度が向上する" },
      { label: "B", text: "データベース接続の生成・破棄のオーバーヘッドを削減し、接続を再利用する" },
      { label: "C", text: "データベースのデータを自動的にキャッシュする" },
      { label: "D", text: "トランザクションを自動的にコミットする" },
    ],
    correctLabel: "B",
    explanation:
      "コネクションプーリングは事前に一定数のDB接続を作成してプールに保持し、必要時に貸し出して使用後に返却する仕組みです。接続の生成・破棄（TCP接続、認証等）のコストを削減し、接続数の上限も制御できます。HikariCPがJavaで最も高速なコネクションプールとして知られています。",
    level: "optimization",
    chapter: "optimization",
  },
  {
    id: "optimization-q03",
    question: "遅延読み込み（Lazy Loading）の説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "アプリケーション起動時にすべてのデータを読み込む" },
      { label: "B", text: "データが実際に必要になった時点で初めて読み込みを行う" },
      { label: "C", text: "定期的にバックグラウンドでデータを更新する" },
      { label: "D", text: "データを圧縮して読み込む" },
    ],
    correctLabel: "B",
    explanation:
      "遅延読み込み（Lazy Loading）は、データやリソースを事前に読み込むのではなく、実際にアクセスされた時点で初めて読み込む戦略です。不要なデータの読み込みを回避しメモリ使用量を削減します。JPAの@ManyToOne(fetch = FetchType.LAZY)やSingletonのlazy initializationが代表例です。",
    level: "optimization",
    chapter: "optimization",
  },
  {
    id: "optimization-q04",
    question: "N+1問題の説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "テーブルのカラム数がN+1を超えると性能が低下する問題" },
      { label: "B", text: "1回のクエリでリストを取得し、各要素に対して追加クエリが発行されることで合計N+1回のクエリが実行される問題" },
      { label: "C", text: "N+1個のスレッドが同時にDBにアクセスする問題" },
      { label: "D", text: "インデックスがN+1個以上あると性能が低下する問題" },
    ],
    correctLabel: "B",
    explanation:
      "N+1問題は、1回のクエリでN件のリストを取得した後、各要素の関連データを取得するためにN回の追加クエリが発行される問題です。JOIN FETCHやEntityGraph、バッチサイズの設定（@BatchSize）で解決できます。パフォーマンスに大きな影響を与えるため、ORM使用時は特に注意が必要です。",
    level: "optimization",
    chapter: "optimization",
  },
  {
    id: "optimization-q05",
    question: "JIT（Just-In-Time）コンパイラの役割として正しいものはどれですか？",
    choices: [
      { label: "A", text: "Javaソースコードをバイトコードにコンパイルする" },
      { label: "B", text: "実行時にホットスポット（頻繁に実行されるコード）をネイティブコードに変換して高速化する" },
      { label: "C", text: "GCの実行スケジュールを決定する" },
      { label: "D", text: "クラスファイルをJARにパッケージングする" },
    ],
    correctLabel: "B",
    explanation:
      "JITコンパイラは実行時にバイトコードの中で頻繁に実行される部分（ホットスポット）を検出し、ネイティブマシンコードにコンパイルします。これにより、インタプリタ実行よりも大幅に高速化されます。C1（クライアント）コンパイラとC2（サーバー）コンパイラの段階的コンパイルが行われます。",
    level: "optimization",
    chapter: "optimization",
  },
];
