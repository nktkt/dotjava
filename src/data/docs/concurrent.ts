import type { DocsChapter } from "../java-docs";

export const concurrentChapters: DocsChapter[] = [
  {
    id: "thread-basics",
    title: "スレッドの基本",
    category: "concurrent",
    description: "Thread, Runnable, ライフサイクル, start/join/sleep",
    sections: [
      {
        title: "スレッドの生成と制御",
        content:
          "Javaのスレッドは Thread クラスまたは Runnable インターフェースで作成します。start() で新しいスレッドを開始し、join() で完了を待機します。Thread.sleep() でスレッドを一時停止させます。",
        code: `// Runnable で生成（推奨）
Runnable task = () -> {
    System.out.println("Thread: " + Thread.currentThread().getName());
};
Thread t1 = new Thread(task, "Worker-1");
t1.start();
t1.join();                       // t1 の完了を待機

// Thread を継承
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Running: " + getName());
    }
}
new MyThread().start();

// スレッドの制御
Thread.sleep(1000);              // 1秒停止
t1.join(5000);                   // 最大5秒待機
Thread.currentThread().getName();
t1.isAlive();                    // 実行中か
t1.setPriority(Thread.MAX_PRIORITY);
t1.setDaemon(true);              // デーモンスレッド

// スレッドの状態
// NEW → RUNNABLE → BLOCKED/WAITING/TIMED_WAITING → TERMINATED

// 割り込み
Thread worker = new Thread(() -> {
    while (!Thread.currentThread().isInterrupted()) {
        // 処理を続行
    }
    System.out.println("割り込まれました");
});
worker.start();
worker.interrupt();              // 割り込みフラグを設定`,
      },
    ],
  },
  {
    id: "synchronization",
    title: "同期と排他制御",
    category: "concurrent",
    description: "synchronized, volatile, Lock, Atomic, デッドロック",
    sections: [
      {
        title: "スレッドセーフな実装",
        content:
          "複数スレッドが共有データにアクセスする場合、synchronized やLockで排他制御を行います。Atomicクラスはロックフリーのスレッドセーフ操作を提供します。volatileはフィールドの可視性を保証します。",
        code: `// synchronized メソッド
public class Counter {
    private int count = 0;

    public synchronized void increment() { count++; }
    public synchronized int getCount() { return count; }
}

// synchronized ブロック（より細かい制御）
private final Object lock = new Object();
public void update() {
    synchronized (lock) {
        // クリティカルセクション
    }
}

// ReentrantLock（より柔軟）
private final ReentrantLock lock = new ReentrantLock();
public void safeUpdate() {
    lock.lock();
    try {
        // クリティカルセクション
    } finally {
        lock.unlock();           // 必ずunlock
    }
}

// ReadWriteLock（読み取り並行、書き込み排他）
private final ReadWriteLock rwLock = new ReentrantReadWriteLock();
public String read() {
    rwLock.readLock().lock();
    try { return data; }
    finally { rwLock.readLock().unlock(); }
}
public void write(String val) {
    rwLock.writeLock().lock();
    try { data = val; }
    finally { rwLock.writeLock().unlock(); }
}

// Atomic クラス（ロックフリー）
AtomicInteger counter = new AtomicInteger(0);
counter.incrementAndGet();       // 1
counter.compareAndSet(1, 10);    // true
counter.getAndAdd(5);            // 10

// volatile（可視性の保証）
private volatile boolean running = true;`,
      },
    ],
  },
  {
    id: "executor-future",
    title: "ExecutorService と Future",
    category: "concurrent",
    description: "スレッドプール、Callable、CompletableFuture",
    sections: [
      {
        title: "ExecutorService",
        content:
          "ExecutorServiceはスレッドプールを管理し、タスクの非同期実行を抽象化します。直接Threadを生成するよりも推奨されます。Future でタスクの結果を取得し、CompletableFutureで関数型スタイルの非同期処理を記述できます。",
        code: `// スレッドプール
ExecutorService pool = Executors.newFixedThreadPool(4);
var cached = Executors.newCachedThreadPool();
var single = Executors.newSingleThreadExecutor();

// タスクの実行
pool.execute(() -> System.out.println("fire and forget"));

// Future で結果取得
Future<String> future = pool.submit(() -> {
    Thread.sleep(1000);
    return "完了";
});
String result = future.get(5, TimeUnit.SECONDS);

// CompletableFuture（関数型チェーン）
CompletableFuture<String> cf = CompletableFuture
    .supplyAsync(() -> "Hello")
    .thenApply(s -> s + " World")
    .thenApply(String::toUpperCase);
cf.join();                       // "HELLO WORLD"

// 複数の非同期タスクを合成
var f1 = CompletableFuture.supplyAsync(() -> "Hello");
var f2 = CompletableFuture.supplyAsync(() -> "World");

f1.thenCombine(f2, (a, b) -> a + " " + b)
  .thenAccept(System.out::println);  // "Hello World"

CompletableFuture.allOf(f1, f2).join();  // 全完了待ち

// エラーハンドリング
cf.exceptionally(ex -> "Error: " + ex.getMessage())
  .handle((val, ex) -> ex != null ? "fallback" : val);

// シャットダウン
pool.shutdown();
pool.awaitTermination(10, TimeUnit.SECONDS);`,
      },
    ],
  },
  {
    id: "virtual-threads",
    title: "バーチャルスレッド (Java 21+)",
    category: "concurrent",
    description: "軽量スレッド、構造化並行性、大量I/O処理",
    sections: [
      {
        title: "バーチャルスレッドの活用",
        content:
          "Java 21で正式導入されたバーチャルスレッドは、JVMが管理する軽量スレッドです。OSスレッドに1:1でマッピングされず、数百万のスレッドを作成できます。I/Oバウンドの処理に最適で、従来のスレッドプールの代替になります。",
        code: `// バーチャルスレッドの生成
Thread vt = Thread.ofVirtual().start(() -> {
    System.out.println("Virtual thread: " +
        Thread.currentThread().isVirtual());  // true
});
vt.join();

// 名前付き
Thread.ofVirtual().name("worker-1").start(() -> {
    System.out.println(Thread.currentThread().getName());
});

// ExecutorService（タスクごとにバーチャルスレッド）
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    // 100万のタスクを同時実行可能
    List<Future<String>> futures = new ArrayList<>();
    for (int i = 0; i < 10_000; i++) {
        int id = i;
        futures.add(executor.submit(() -> {
            Thread.sleep(1000);  // I/O待ちをシミュレート
            return "Task-" + id;
        }));
    }
    for (var f : futures) {
        f.get();  // 結果を取得
    }
}

// プラットフォームスレッドとの比較
// プラットフォームスレッド: OSスレッドと1:1、重い（MB単位のスタック）
// バーチャルスレッド: JVM管理、軽い（KB単位）、I/Oで自動ブロック解除

// 使い分け
// ✓ I/Oバウンド（HTTP呼び出し、DB問い合わせ、ファイルI/O）
// ✗ CPUバウンド（計算処理 → プラットフォームスレッド推奨）
// ✗ synchronized ブロック内の長時間処理（pinning問題）`,
      },
    ],
  },
];
