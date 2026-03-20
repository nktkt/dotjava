export type ConcurrencyLevel = "basics" | "sync" | "concurrent" | "modern";

export interface ConcurrencyQuizQuestion {
  id: string;
  question: string;
  choices: { label: string; text: string }[];
  correctLabel: string;
  explanation: string;
  code?: string;
  level: ConcurrencyLevel;
  chapter: string;
}

export const concurrencyQuizQuestions: ConcurrencyQuizQuestion[] = [
  // ════════════════════════════════════════
  // basics: スレッドの基礎 4問
  // ════════════════════════════════════════
  {
    id: "concurrency-basics-q01",
    question: "Javaでスレッドを作成する方法として正しいものはどれですか？",
    choices: [
      { label: "A", text: "Threadクラスを継承するか、Runnableインタフェースを実装する" },
      { label: "B", text: "Processクラスを継承する" },
      { label: "C", text: "Taskクラスを継承する" },
      { label: "D", text: "Workerインタフェースを実装する" },
    ],
    correctLabel: "A",
    explanation:
      "Javaでスレッドを作成するには、Threadクラスを継承してrun()メソッドをオーバーライドするか、Runnableインタフェースを実装してrun()メソッドを定義します。Java 5以降ではCallableインタフェースも使用できます。Runnableの方が他のクラスを継承できるため推奨されます。",
    level: "basics",
    chapter: "concurrency-basics",
  },
  {
    id: "concurrency-basics-q02",
    question: "次のコードを実行した場合の動作として正しいものはどれですか？",
    code: `Thread t = new Thread(() -> System.out.println("Hello"));
t.run();`,
    choices: [
      { label: "A", text: "新しいスレッドで \"Hello\" が出力される" },
      { label: "B", text: "現在のスレッド（メインスレッド）で \"Hello\" が出力される" },
      { label: "C", text: "コンパイルエラーになる" },
      { label: "D", text: "何も出力されない" },
    ],
    correctLabel: "B",
    explanation:
      "run()メソッドを直接呼び出すと、新しいスレッドは作成されず、現在のスレッドで通常のメソッド呼び出しとして実行されます。新しいスレッドを開始するにはstart()メソッドを呼び出す必要があります。start()はOSレベルのスレッドを作成し、その中でrun()を実行します。",
    level: "basics",
    chapter: "concurrency-basics",
  },
  {
    id: "concurrency-basics-q03",
    question: "スレッドのライフサイクルにおいて、start()メソッド呼び出し後のスレッド状態はどれですか？",
    choices: [
      { label: "A", text: "NEW" },
      { label: "B", text: "RUNNABLE" },
      { label: "C", text: "RUNNING" },
      { label: "D", text: "TERMINATED" },
    ],
    correctLabel: "B",
    explanation:
      "start()メソッドを呼び出すと、スレッドはNEW状態からRUNNABLE状態に遷移します。RUNNABLE状態のスレッドはスレッドスケジューラによって実行が割り当てられるのを待っています。Javaのスレッド状態にRUNNINGという状態は定義されておらず、実行中もRUNNABLEに含まれます。",
    level: "basics",
    chapter: "concurrency-basics",
  },
  {
    id: "concurrency-basics-q04",
    question: "デーモンスレッドの特徴として正しいものはどれですか？",
    choices: [
      { label: "A", text: "他のすべてのスレッドより高い優先度を持つ" },
      { label: "B", text: "すべての非デーモンスレッドが終了すると、JVMが自動的に終了しデーモンスレッドも停止する" },
      { label: "C", text: "例外をスローすることができない" },
      { label: "D", text: "GUIアプリケーション専用のスレッドである" },
    ],
    correctLabel: "B",
    explanation:
      "デーモンスレッドはバックグラウンドで動作するサービススレッドです。すべての非デーモン（ユーザー）スレッドが終了すると、JVMは残っているデーモンスレッドを停止してプロセスを終了します。ガベージコレクタはデーモンスレッドの代表例です。setDaemon(true)で設定します。",
    level: "basics",
    chapter: "concurrency-basics",
  },
  // ════════════════════════════════════════
  // sync: 同期とロック 4問
  // ════════════════════════════════════════
  {
    id: "sync-q01",
    question: "synchronizedキーワードの役割として正しいものはどれですか？",
    choices: [
      { label: "A", text: "スレッドの実行速度を向上させる" },
      { label: "B", text: "複数のスレッドが同時にクリティカルセクションにアクセスすることを防ぐ" },
      { label: "C", text: "スレッドを自動的に作成する" },
      { label: "D", text: "デッドロックを自動的に検出して解消する" },
    ],
    correctLabel: "B",
    explanation:
      "synchronizedはモニターロック（排他制御）を使って、同時に1つのスレッドだけがクリティカルセクション（共有リソースにアクセスするコード）を実行できるようにします。これによりレースコンディション（競合状態）を防ぎます。ただし、不適切に使うとデッドロックの原因になります。",
    level: "sync",
    chapter: "sync",
  },
  {
    id: "sync-q02",
    question: "次のコードでデッドロックが発生する理由はどれですか？",
    code: `// Thread 1
synchronized(lockA) {
    synchronized(lockB) { /* 処理 */ }
}
// Thread 2
synchronized(lockB) {
    synchronized(lockA) { /* 処理 */ }
}`,
    choices: [
      { label: "A", text: "ロックの順序が統一されていないため" },
      { label: "B", text: "synchronizedを2回使用しているため" },
      { label: "C", text: "ロックオブジェクトが異なるため" },
      { label: "D", text: "スレッドが2つあるため" },
    ],
    correctLabel: "A",
    explanation:
      "Thread 1はlockA→lockBの順で、Thread 2はlockB→lockAの順でロックを取得しようとします。Thread 1がlockAを保持しThread 2がlockBを保持した状態で、互いに相手のロックを待つ循環待ちが発生しデッドロックになります。ロック取得の順序を統一することで回避できます。",
    level: "sync",
    chapter: "sync",
  },
  {
    id: "sync-q03",
    question: "volatileキーワードの効果として正しいものはどれですか？",
    choices: [
      { label: "A", text: "変数への操作をアトミックにする" },
      { label: "B", text: "変数の値をメインメモリから直接読み書きし、キャッシュの不整合を防ぐ" },
      { label: "C", text: "変数をimmutableにする" },
      { label: "D", text: "変数へのアクセスをsynchronizedと同等にする" },
    ],
    correctLabel: "B",
    explanation:
      "volatileは変数の可視性（visibility）を保証します。各スレッドはCPUキャッシュではなくメインメモリから値を読み書きするため、あるスレッドの変更が他のスレッドに即座に見えるようになります。ただし、複合操作（例：i++）のアトミック性は保証しません。",
    level: "sync",
    chapter: "sync",
  },
  {
    id: "sync-q04",
    question: "ReentrantLockがsynchronizedに比べて優れている点はどれですか？",
    choices: [
      { label: "A", text: "常にパフォーマンスが良い" },
      { label: "B", text: "ロックの取得をタイムアウト付きで試行でき、割り込み可能である" },
      { label: "C", text: "デッドロックが絶対に発生しない" },
      { label: "D", text: "自動的にロックが解放される" },
    ],
    correctLabel: "B",
    explanation:
      "ReentrantLockはtryLock(timeout)でタイムアウト付きのロック取得、lockInterruptibly()で割り込み可能なロック取得が可能です。また、公平性の設定やConditionオブジェクトによる柔軟な待機・通知が行えます。ただし、明示的にunlock()を呼ぶ必要があり、finallyブロックでの解放が必須です。",
    level: "sync",
    chapter: "sync",
  },
  // ════════════════════════════════════════
  // concurrent: 並行処理ユーティリティ 4問
  // ════════════════════════════════════════
  {
    id: "concurrent-q01",
    question: "ExecutorServiceの利点として正しいものはどれですか？",
    choices: [
      { label: "A", text: "スレッドプールを管理し、スレッドの生成・破棄のオーバーヘッドを削減する" },
      { label: "B", text: "同期処理を自動的に非同期処理に変換する" },
      { label: "C", text: "デッドロックを自動的に検出する" },
      { label: "D", text: "GCの頻度を削減する" },
    ],
    correctLabel: "A",
    explanation:
      "ExecutorServiceはスレッドプールを管理するフレームワークです。スレッドの再利用により生成・破棄のオーバーヘッドを削減し、同時実行数を制御できます。Executors.newFixedThreadPool()、newCachedThreadPool()、newSingleThreadExecutor()などのファクトリメソッドで生成します。",
    level: "concurrent",
    chapter: "concurrent",
  },
  {
    id: "concurrent-q02",
    question: "ConcurrentHashMapの特徴として正しいものはどれですか？",
    choices: [
      { label: "A", text: "マップ全体をロックして排他制御を行う" },
      { label: "B", text: "セグメント単位（Java 8以降はノード単位）でロックし、高い並行性を実現する" },
      { label: "C", text: "スレッドセーフではないが高速である" },
      { label: "D", text: "nullキーとnull値を許容する" },
    ],
    correctLabel: "B",
    explanation:
      "ConcurrentHashMapはJava 8以降、CASとノード単位のロックを使用して高い並行性を実現します。Hashtableのようにマップ全体をロックするのではなく、必要な部分のみをロックするため、複数スレッドが同時に異なるバケットにアクセスできます。nullキー・null値は許容しません。",
    level: "concurrent",
    chapter: "concurrent",
  },
  {
    id: "concurrent-q03",
    question: "CountDownLatchの用途として正しいものはどれですか？",
    choices: [
      { label: "A", text: "一定数のスレッドが完了するまで他のスレッドを待機させる" },
      { label: "B", text: "スレッドの優先度を動的に変更する" },
      { label: "C", text: "スレッドプールのサイズを自動調整する" },
      { label: "D", text: "スレッド間でデータを共有する" },
    ],
    correctLabel: "A",
    explanation:
      "CountDownLatchは指定したカウントが0になるまでスレッドを待機させる同期補助クラスです。各スレッドがcountDown()を呼びカウントを減らし、await()で待っているスレッドはカウントが0になると実行を再開します。一度0になると再利用できない点がCyclicBarrierとの違いです。",
    level: "concurrent",
    chapter: "concurrent",
  },
  {
    id: "concurrent-q04",
    question: "AtomicIntegerを使う利点として正しいものはどれですか？",
    choices: [
      { label: "A", text: "intよりメモリ効率が良い" },
      { label: "B", text: "synchronizedを使わずにスレッドセーフなインクリメント・デクリメントが可能" },
      { label: "C", text: "自動的に値の範囲チェックを行う" },
      { label: "D", text: "不変（immutable）な整数値を提供する" },
    ],
    correctLabel: "B",
    explanation:
      "AtomicIntegerはCAS（Compare-And-Swap）操作を使い、ロックなしでスレッドセーフなアトミック操作を提供します。incrementAndGet()、compareAndSet()などのメソッドがあり、synchronizedブロックよりも軽量で高パフォーマンスです。カウンターやシーケンス番号の生成に適しています。",
    level: "concurrent",
    chapter: "concurrent",
  },
  // ════════════════════════════════════════
  // modern: モダンな並行処理 3問
  // ════════════════════════════════════════
  {
    id: "modern-q01",
    question: "CompletableFutureの特徴として正しいものはどれですか？",
    choices: [
      { label: "A", text: "同期的なAPIのみを提供する" },
      { label: "B", text: "非同期処理の合成・チェーンが可能で、コールバックベースの処理を記述できる" },
      { label: "C", text: "Java 7で導入された" },
      { label: "D", text: "Executorなしでは使用できない" },
    ],
    correctLabel: "B",
    explanation:
      "CompletableFutureはJava 8で導入された非同期処理のためのクラスです。thenApply()、thenCompose()、thenCombine()などで処理を合成・チェーンでき、exceptionally()やhandle()でエラー処理も行えます。supplyAsync()でForkJoinPool.commonPool()をデフォルトのExecutorとして使用します。",
    level: "modern",
    chapter: "modern",
  },
  {
    id: "modern-q02",
    question: "次のコードの説明として正しいものはどれですか？",
    code: `CompletableFuture<String> future = CompletableFuture
    .supplyAsync(() -> fetchData())
    .thenApply(data -> process(data))
    .exceptionally(ex -> "Error: " + ex.getMessage());`,
    choices: [
      { label: "A", text: "同期的にfetchDataとprocessを順番に実行する" },
      { label: "B", text: "非同期にデータ取得→加工を行い、例外発生時にフォールバック値を返す" },
      { label: "C", text: "並列にfetchDataとprocessを実行する" },
      { label: "D", text: "コンパイルエラーになる" },
    ],
    correctLabel: "B",
    explanation:
      "supplyAsync()で非同期にfetchData()を実行し、完了後にthenApply()でprocess()を適用します。途中で例外が発生した場合はexceptionally()で指定したフォールバック値を返します。これは非同期パイプラインパターンで、各ステージは前のステージの完了を待ってから実行されます。",
    level: "modern",
    chapter: "modern",
  },
  {
    id: "modern-q03",
    question: "Java 21で正式導入された仮想スレッド（Virtual Threads）の特徴として正しいものはどれですか？",
    choices: [
      { label: "A", text: "OSスレッドと1対1で対応し、高いパフォーマンスを発揮する" },
      { label: "B", text: "JVMが管理する軽量スレッドで、大量のI/O待ちタスクを効率的に処理できる" },
      { label: "C", text: "CPU集約型タスクに最適化されている" },
      { label: "D", text: "従来のスレッドAPIとは互換性がない" },
    ],
    correctLabel: "B",
    explanation:
      "仮想スレッド（Virtual Threads）はJVM管理の軽量スレッドで、OSスレッドに多対1でマッピングされます。数百万の仮想スレッドを作成可能で、I/O待ちが多いアプリケーション（Webサーバーなど）に最適です。Thread.ofVirtual().start()やExecutors.newVirtualThreadPerTaskExecutor()で使用できます。",
    level: "modern",
    chapter: "modern",
  },
];
