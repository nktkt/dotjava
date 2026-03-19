export interface ConcurrencySection {
  title: string;
  content: string;
  code?: string;
}

export interface ConcurrencyChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: ConcurrencySection[];
}

export const concurrencyCategories = [
  { id: "basics", name: "スレッド基礎", color: "#2563EB" },
  { id: "sync", name: "同期と排他制御", color: "#DC2626" },
  { id: "concurrent-api", name: "Concurrent API", color: "#7C3AED" },
  { id: "modern", name: "モダン並行処理", color: "#059669" },
] as const;

export const concurrencyChapters: ConcurrencyChapter[] = [
  // ===== スレッド基礎 =====
  {
    id: "thread-basics",
    title: "Thread と Runnable",
    category: "basics",
    description:
      "Javaにおけるスレッドの作成方法、ライフサイクル、基本操作を学ぶ",
    sections: [
      {
        title: "Thread の作成",
        content:
          "Javaでスレッドを作成する最も基本的な方法は、Thread クラスを継承して run() メソッドをオーバーライドすることです。start() を呼び出すと新しいスレッドが生成され、run() メソッドが別スレッドで実行されます。直接 run() を呼ぶと同じスレッドで実行されるため、必ず start() を使います。",
        code: `// Thread クラスを継承してスレッドを作成
class MyThread extends Thread {
    private final String taskName;

    public MyThread(String taskName) {
        this.taskName = taskName;
    }

    @Override
    public void run() {
        // このメソッドが別スレッドで実行される
        for (int i = 0; i < 3; i++) {
            System.out.println(taskName + " - 実行中: " + i
                + " [" + Thread.currentThread().getName() + "]");
        }
    }
}

// 使用例
public class ThreadDemo {
    public static void main(String[] args) {
        MyThread t1 = new MyThread("タスクA");
        MyThread t2 = new MyThread("タスクB");
        t1.start(); // 新しいスレッドで実行（run()を直接呼ばない）
        t2.start(); // 並行して実行される
        System.out.println("メインスレッド継続中");
    }
}`,
      },
      {
        title: "Runnable インターフェース",
        content:
          "Runnable インターフェースを実装する方法は、Thread 継承より推奨されます。Javaは単一継承のため、Runnable を使えば他のクラスを継承しながらスレッド処理を定義できます。Java 8 以降ではラムダ式で簡潔に記述でき、コードの可読性も向上します。",
        code: `// Runnable インターフェースの実装
class DownloadTask implements Runnable {
    private final String url;

    public DownloadTask(String url) {
        this.url = url;
    }

    @Override
    public void run() {
        System.out.println("ダウンロード開始: " + url);
        // 処理のシミュレーション
        try { Thread.sleep(1000); } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
        System.out.println("ダウンロード完了: " + url);
    }
}

// 使用例
public class RunnableDemo {
    public static void main(String[] args) {
        // 従来の方法
        Thread t1 = new Thread(new DownloadTask("https://example.com/file1"));
        t1.start();

        // ラムダ式（Java 8+）- 簡潔に記述可能
        Thread t2 = new Thread(() -> {
            System.out.println("ラムダで実行中: "
                + Thread.currentThread().getName());
        });
        t2.start();
    }
}`,
      },
      {
        title: "スレッドのライフサイクル",
        content:
          "スレッドには NEW、RUNNABLE、BLOCKED、WAITING、TIMED_WAITING、TERMINATED の6つの状態があります。start() で NEW から RUNNABLE になり、synchronized ブロック待ちで BLOCKED、wait() で WAITING、sleep() で TIMED_WAITING になります。Thread.getState() で現在の状態を確認できます。",
        code: `// スレッドのライフサイクルを確認する
public class ThreadLifecycleDemo {
    public static void main(String[] args) throws InterruptedException {
        Thread thread = new Thread(() -> {
            try {
                Thread.sleep(2000); // TIMED_WAITING 状態
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        // NEW - まだ start() されていない
        System.out.println("作成直後: " + thread.getState()); // NEW

        thread.start();
        // RUNNABLE - 実行可能状態
        System.out.println("start後: " + thread.getState()); // RUNNABLE

        Thread.sleep(500);
        // TIMED_WAITING - sleep中
        System.out.println("sleep中: " + thread.getState()); // TIMED_WAITING

        thread.join(); // 終了を待つ
        // TERMINATED - 実行完了
        System.out.println("終了後: " + thread.getState()); // TERMINATED
    }
}`,
      },
      {
        title: "start / join / sleep",
        content:
          "start() は新しいスレッドを起動し、join() は指定スレッドの終了を待機します。sleep() は現在のスレッドを指定ミリ秒だけ一時停止します。join() を使うことで、複数スレッドの実行結果を集約してから次の処理に進むことができます。InterruptedException の適切な処理も重要です。",
        code: `// start, join, sleep の活用例
public class JoinSleepDemo {
    public static void main(String[] args) throws InterruptedException {
        long startTime = System.currentTimeMillis();

        // 2つの並行タスクを起動
        Thread taskA = new Thread(() -> {
            try {
                Thread.sleep(2000); // 2秒かかる処理
                System.out.println("タスクA完了");
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        Thread taskB = new Thread(() -> {
            try {
                Thread.sleep(3000); // 3秒かかる処理
                System.out.println("タスクB完了");
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        taskA.start();
        taskB.start();

        // 両方の完了を待つ（合計約3秒で完了）
        taskA.join();
        taskB.join();

        long elapsed = System.currentTimeMillis() - startTime;
        System.out.println("全タスク完了: " + elapsed + "ms");
        // → 約3000ms（逐次なら5000ms）
    }
}`,
      },
      {
        title: "スレッド名とデーモンスレッド",
        content:
          "スレッドに名前を付けることで、デバッグやログ出力時にどのスレッドが処理しているか識別しやすくなります。デーモンスレッドは、全ての非デーモンスレッドが終了すると自動的に終了するバックグラウンドスレッドです。GCやログ出力など、メインの処理に依存しないタスクに適しています。",
        code: `// スレッド名とデーモンスレッドの設定
public class DaemonThreadDemo {
    public static void main(String[] args) throws InterruptedException {
        // スレッド名を設定
        Thread worker = new Thread(() -> {
            System.out.println("実行中: "
                + Thread.currentThread().getName());
        }, "ワーカースレッド-1"); // コンストラクタで名前を設定

        // デーモンスレッド: バックグラウンド処理用
        Thread daemon = new Thread(() -> {
            while (true) {
                System.out.println("[デーモン] ヘルスチェック実行中...");
                try { Thread.sleep(1000); } catch (InterruptedException e) {
                    break;
                }
            }
        });
        daemon.setName("ヘルスチェック-デーモン");
        daemon.setDaemon(true); // デーモンスレッドに設定（start前に呼ぶ）

        worker.start();
        daemon.start();

        worker.join();
        System.out.println("メイン終了 → デーモンも自動終了");
        // デーモンスレッドはメインスレッド終了時に自動停止
    }
}`,
      },
    ],
  },
  {
    id: "thread-safety",
    title: "スレッドセーフティ",
    category: "basics",
    description:
      "共有変数の問題、レースコンディション、volatile、Atomic、ThreadLocal を学ぶ",
    sections: [
      {
        title: "共有変数の問題",
        content:
          "複数のスレッドが同じ変数を読み書きすると、予期しない結果が生じます。これはスレッドがCPUキャッシュに値を保持し、メインメモリとの同期タイミングが不定なためです。例えばカウンタのインクリメントは「読み取り→加算→書き込み」の3ステップで、途中で他スレッドが割り込む可能性があります。",
        code: `// 共有変数の問題を示すデモ
public class SharedVariableProblem {
    private static int counter = 0; // 共有変数

    public static void main(String[] args) throws InterruptedException {
        Runnable incrementTask = () -> {
            for (int i = 0; i < 100_000; i++) {
                counter++; // 非アトミック操作（読み取り→加算→書き込み）
            }
        };

        Thread t1 = new Thread(incrementTask);
        Thread t2 = new Thread(incrementTask);
        t1.start();
        t2.start();
        t1.join();
        t2.join();

        // 期待値: 200,000 だが実際は不定（例: 156,423）
        System.out.println("結果: " + counter);
        // → 複数スレッドの競合により正しくカウントされない
        // 「読み取り→加算→書き込み」の間に他スレッドが割り込む
    }
}`,
      },
      {
        title: "レースコンディション",
        content:
          "レースコンディションは、複数スレッドが同じリソースに同時アクセスし、実行順序によって結果が変わる問題です。チェック・ゼン・アクト（check-then-act）パターンが典型例で、条件チェックと操作の間に他スレッドが介入すると不整合が生じます。銀行口座の入出金などで深刻なバグとなります。",
        code: `// レースコンディションの典型例: check-then-act
public class RaceConditionDemo {
    private int balance = 1000; // 口座残高

    // 非スレッドセーフな出金処理
    public void withdraw(int amount) {
        // check（残高チェック）と act（出金）が分離
        if (balance >= amount) {          // ← チェック
            // この間に他スレッドが出金する可能性あり！
            try { Thread.sleep(1); } catch (InterruptedException e) {}
            balance -= amount;            // ← 操作
            System.out.println("出金: " + amount + " 残高: " + balance);
        } else {
            System.out.println("残高不足");
        }
    }

    public static void main(String[] args) throws InterruptedException {
        RaceConditionDemo account = new RaceConditionDemo();
        // 2スレッドが同時に800円を出金しようとする
        Thread t1 = new Thread(() -> account.withdraw(800));
        Thread t2 = new Thread(() -> account.withdraw(800));
        t1.start(); t2.start();
        t1.join(); t2.join();
        // → 残高1000円なのに合計1600円出金される可能性！
    }
}`,
      },
      {
        title: "volatile キーワード",
        content:
          "volatile はフィールドの値がメインメモリから直接読み書きされることを保証します。CPUキャッシュによる古い値の参照を防ぎ、可視性（visibility）を確保します。ただし、複合操作（i++のような読み取り＋書き込み）のアトミック性は保証しません。フラグ変数の共有に適しています。",
        code: `// volatile による可視性の保証
public class VolatileDemo {
    // volatile がないとスレッド間で変更が見えない場合がある
    private volatile boolean running = true;

    public void startWorker() {
        Thread worker = new Thread(() -> {
            int count = 0;
            // volatile により running の最新値が常に見える
            while (running) {
                count++;
            }
            System.out.println("ワーカー停止: count=" + count);
        });
        worker.start();
    }

    public void stop() {
        // メインスレッドからの変更が即座にワーカーに反映される
        running = false;
        System.out.println("停止フラグを設定");
    }

    public static void main(String[] args) throws InterruptedException {
        VolatileDemo demo = new VolatileDemo();
        demo.startWorker();
        Thread.sleep(100);
        demo.stop();
        // volatile がなければワーカーが永遠に停止しない可能性あり
    }
}`,
      },
      {
        title: "AtomicInteger",
        content:
          "java.util.concurrent.atomic パッケージの AtomicInteger はスレッドセーフな整数型です。CAS（Compare-And-Swap）操作により、ロックなしでアトミックな更新を実現します。synchronized よりも軽量で、カウンタやシーケンス番号の生成に最適です。AtomicLong、AtomicReference なども利用できます。",
        code: `import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicReference;

public class AtomicDemo {
    // AtomicInteger でスレッドセーフなカウンタ
    private static final AtomicInteger counter = new AtomicInteger(0);

    public static void main(String[] args) throws InterruptedException {
        Runnable task = () -> {
            for (int i = 0; i < 100_000; i++) {
                counter.incrementAndGet(); // アトミック操作
            }
        };

        Thread t1 = new Thread(task);
        Thread t2 = new Thread(task);
        t1.start(); t2.start();
        t1.join(); t2.join();

        // 常に正確に 200,000 になる
        System.out.println("結果: " + counter.get());

        // CAS操作: 現在値が期待値と一致する場合のみ更新
        boolean updated = counter.compareAndSet(200_000, 0);
        System.out.println("CAS成功: " + updated); // true

        // AtomicReference で参照型もアトミックに操作
        AtomicReference<String> ref = new AtomicReference<>("初期値");
        ref.compareAndSet("初期値", "更新値");
        System.out.println("参照: " + ref.get()); // 更新値
    }
}`,
      },
      {
        title: "ThreadLocal",
        content:
          "ThreadLocal はスレッドごとに独立した変数コピーを保持する仕組みです。各スレッドが自分専用の値を持つため、同期が不要になります。ユーザーセッション、データベース接続、日付フォーマッタの保持などに使われます。メモリリーク防止のため、使用後は必ず remove() を呼び出します。",
        code: `import java.text.SimpleDateFormat;
import java.util.Date;

public class ThreadLocalDemo {
    // SimpleDateFormat はスレッドセーフではないため ThreadLocal で保持
    private static final ThreadLocal<SimpleDateFormat> dateFormat =
        ThreadLocal.withInitial(
            () -> new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")
        );

    // リクエストごとのユーザーID管理
    private static final ThreadLocal<String> currentUser =
        new ThreadLocal<>();

    public static String formatDate(Date date) {
        return dateFormat.get().format(date); // スレッドごとに独立
    }

    public static void main(String[] args) throws InterruptedException {
        Runnable task = () -> {
            try {
                currentUser.set(Thread.currentThread().getName());
                System.out.println("ユーザー: " + currentUser.get());
                System.out.println("日時: " + formatDate(new Date()));
            } finally {
                // メモリリーク防止: 必ず remove() を呼ぶ
                currentUser.remove();
                dateFormat.remove();
            }
        };

        Thread t1 = new Thread(task, "UserA");
        Thread t2 = new Thread(task, "UserB");
        t1.start(); t2.start();
        t1.join(); t2.join();
    }
}`,
      },
    ],
  },

  // ===== 同期と排他制御 =====
  {
    id: "synchronized-lock",
    title: "synchronized と Lock",
    category: "sync",
    description:
      "synchronized ブロック、ReentrantLock、ReadWriteLock、デッドロック回避を学ぶ",
    sections: [
      {
        title: "synchronized キーワード",
        content:
          "synchronized はJavaの組み込みロック機構で、メソッドまたはブロックに適用できます。1つのスレッドがロックを取得している間、他のスレッドは待機します。モニターオブジェクトのロックにより排他制御を実現し、可視性も保証されます。メソッド全体よりも、必要な範囲だけを synchronized ブロックで囲む方が効率的です。",
        code: `// synchronized によるスレッドセーフなカウンタ
public class SynchronizedDemo {
    private int count = 0;
    private final Object lock = new Object(); // ロックオブジェクト

    // メソッド全体を同期（this がモニターオブジェクト）
    public synchronized void incrementSync() {
        count++;
    }

    // ブロック単位の同期（必要な範囲だけロック）
    public void incrementBlock() {
        // ロック外の処理はここで実行
        synchronized (lock) {
            count++; // この部分だけ排他制御
        }
        // ロック外の処理はここでも実行可能
    }

    public static void main(String[] args) throws InterruptedException {
        SynchronizedDemo demo = new SynchronizedDemo();
        Runnable task = () -> {
            for (int i = 0; i < 100_000; i++) {
                demo.incrementBlock();
            }
        };
        Thread t1 = new Thread(task);
        Thread t2 = new Thread(task);
        t1.start(); t2.start();
        t1.join(); t2.join();
        System.out.println("結果: " + demo.count); // 常に200,000
    }
}`,
      },
      {
        title: "ReentrantLock",
        content:
          "ReentrantLock は synchronized より柔軟なロック機構です。tryLock() でロック取得を試み、取得できなければ別の処理を行えます。lockInterruptibly() で割り込み可能なロック待ちも実現できます。公平性（fairness）の設定も可能で、長時間待っているスレッドを優先できます。finally ブロックでのアンロックが必須です。",
        code: `import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.TimeUnit;

public class ReentrantLockDemo {
    private final ReentrantLock lock = new ReentrantLock(true); // 公平ロック
    private int balance = 1000;

    public void withdraw(int amount) {
        // tryLock: ロック取得を試みる（タイムアウト付き）
        try {
            if (lock.tryLock(3, TimeUnit.SECONDS)) {
                try {
                    if (balance >= amount) {
                        balance -= amount;
                        System.out.println("出金: " + amount
                            + " 残高: " + balance);
                    } else {
                        System.out.println("残高不足");
                    }
                } finally {
                    lock.unlock(); // 必ずアンロック
                }
            } else {
                System.out.println("ロック取得タイムアウト");
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    public static void main(String[] args) {
        ReentrantLockDemo account = new ReentrantLockDemo();
        Thread t1 = new Thread(() -> account.withdraw(800));
        Thread t2 = new Thread(() -> account.withdraw(800));
        t1.start(); t2.start();
    }
}`,
      },
      {
        title: "ReadWriteLock",
        content:
          "ReadWriteLock は読み取りと書き込みのロックを分離し、並行性を向上させます。複数スレッドが同時に読み取りできますが、書き込み中は他のスレッドは読み書きできません。読み取りが多く書き込みが少ないシナリオ（キャッシュ、設定値など）で特に効果を発揮します。",
        code: `import java.util.concurrent.locks.ReadWriteLock;
import java.util.concurrent.locks.ReentrantReadWriteLock;
import java.util.HashMap;
import java.util.Map;

// ReadWriteLock を使ったスレッドセーフなキャッシュ
public class ThreadSafeCache<K, V> {
    private final Map<K, V> cache = new HashMap<>();
    private final ReadWriteLock rwLock = new ReentrantReadWriteLock();

    // 読み取り: 複数スレッドが同時にアクセス可能
    public V get(K key) {
        rwLock.readLock().lock();
        try {
            return cache.get(key);
        } finally {
            rwLock.readLock().unlock();
        }
    }

    // 書き込み: 排他的アクセス（読み取りもブロック）
    public void put(K key, V value) {
        rwLock.writeLock().lock();
        try {
            cache.put(key, value);
        } finally {
            rwLock.writeLock().unlock();
        }
    }

    // 読み取り: キャッシュサイズ取得
    public int size() {
        rwLock.readLock().lock();
        try {
            return cache.size();
        } finally {
            rwLock.readLock().unlock();
        }
    }
}`,
      },
      {
        title: "Condition",
        content:
          "Condition は ReentrantLock と組み合わせて使う待機・通知の仕組みです。Object の wait/notify に相当しますが、1つのロックに複数の Condition を作成できるため、より細かい制御が可能です。await() で待機し、signal() または signalAll() で通知します。",
        code: `import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;
import java.util.LinkedList;
import java.util.Queue;

// Condition を使った制限付きバッファ
public class BoundedBuffer<T> {
    private final Queue<T> queue = new LinkedList<>();
    private final int capacity;
    private final ReentrantLock lock = new ReentrantLock();
    private final Condition notFull = lock.newCondition();  // 満杯でない条件
    private final Condition notEmpty = lock.newCondition(); // 空でない条件

    public BoundedBuffer(int capacity) {
        this.capacity = capacity;
    }

    public void put(T item) throws InterruptedException {
        lock.lock();
        try {
            while (queue.size() == capacity) {
                notFull.await(); // バッファが空くまで待機
            }
            queue.add(item);
            notEmpty.signal(); // 消費者に通知
        } finally {
            lock.unlock();
        }
    }

    public T take() throws InterruptedException {
        lock.lock();
        try {
            while (queue.isEmpty()) {
                notEmpty.await(); // データが来るまで待機
            }
            T item = queue.poll();
            notFull.signal(); // 生産者に通知
            return item;
        } finally {
            lock.unlock();
        }
    }
}`,
      },
      {
        title: "デッドロック回避",
        content:
          "デッドロックは、2つ以上のスレッドが互いのロックを待ち合う状態で、永遠に処理が進みません。回避策として、ロックの取得順序を一定にする、タイムアウト付きロックを使う、一度に全てのロックを取得する、などがあります。jstack コマンドでデッドロックの検出も可能です。",
        code: `import java.util.concurrent.locks.ReentrantLock;
import java.util.concurrent.TimeUnit;

public class DeadlockAvoidance {
    private final ReentrantLock lockA = new ReentrantLock();
    private final ReentrantLock lockB = new ReentrantLock();

    // NG: デッドロックの可能性あり
    // スレッド1: lockA → lockB の順でロック
    // スレッド2: lockB → lockA の順でロック → デッドロック！

    // OK: タイムアウト付きで全ロック取得を試みる
    public boolean transferSafe(String from, String to, int amount) {
        boolean gotBoth = false;
        try {
            // 両方のロックをタイムアウト付きで取得
            boolean gotA = lockA.tryLock(1, TimeUnit.SECONDS);
            boolean gotB = lockB.tryLock(1, TimeUnit.SECONDS);
            gotBoth = gotA && gotB;

            if (gotBoth) {
                System.out.println(from + " → " + to + ": " + amount);
                return true;
            } else {
                System.out.println("ロック取得失敗 - リトライ");
                return false;
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            return false;
        } finally {
            // 取得できたロックのみ解放
            if (lockA.isHeldByCurrentThread()) lockA.unlock();
            if (lockB.isHeldByCurrentThread()) lockB.unlock();
        }
    }
}`,
      },
    ],
  },
  {
    id: "wait-notify",
    title: "wait/notify と生産者消費者",
    category: "sync",
    description:
      "wait/notify、生産者消費者パターン、BlockingQueue、Semaphore、CountDownLatch を学ぶ",
    sections: [
      {
        title: "wait / notify",
        content:
          "wait() はスレッドをモニターの待機セットに入れ、notify() は待機中のスレッドを1つ起こします。notifyAll() は全待機スレッドを起こします。必ず synchronized ブロック内で使用し、条件チェックは while ループで行います（スプリアスウェイクアップ対策）。",
        code: `// wait/notify の基本パターン
public class WaitNotifyDemo {
    private final Object monitor = new Object();
    private boolean dataReady = false;
    private String data;

    // データを準備するスレッド
    public void produce() {
        synchronized (monitor) {
            data = "処理結果データ";
            dataReady = true;
            System.out.println("データ準備完了 → 通知");
            monitor.notifyAll(); // 待機中のスレッドに通知
        }
    }

    // データを待つスレッド
    public void consume() throws InterruptedException {
        synchronized (monitor) {
            // while で条件チェック（スプリアスウェイクアップ対策）
            while (!dataReady) {
                System.out.println("データ待機中...");
                monitor.wait(); // ロックを解放して待機
            }
            System.out.println("受信: " + data);
        }
    }

    public static void main(String[] args) {
        WaitNotifyDemo demo = new WaitNotifyDemo();
        new Thread(() -> { try { demo.consume(); }
            catch (InterruptedException e) {} }).start();
        new Thread(demo::produce).start();
    }
}`,
      },
      {
        title: "生産者消費者パターン",
        content:
          "生産者消費者パターンは、データの生成と消費を別スレッドで行う並行処理の基本パターンです。共有バッファを介してデータを受け渡し、バッファが満杯なら生産者が待ち、空なら消費者が待ちます。スレッド間の処理速度差を吸収し、システムのスループットを向上させます。",
        code: `// wait/notify による生産者消費者パターン
public class ProducerConsumer {
    private final Queue<Integer> buffer = new LinkedList<>();
    private final int MAX_SIZE = 5;

    public void produce() throws InterruptedException {
        int value = 0;
        while (true) {
            synchronized (buffer) {
                while (buffer.size() == MAX_SIZE) {
                    buffer.wait(); // バッファ満杯 → 待機
                }
                buffer.add(value);
                System.out.println("生産: " + value++
                    + " (サイズ: " + buffer.size() + ")");
                buffer.notifyAll(); // 消費者に通知
            }
            Thread.sleep(100);
        }
    }

    public void consume() throws InterruptedException {
        while (true) {
            synchronized (buffer) {
                while (buffer.isEmpty()) {
                    buffer.wait(); // バッファ空 → 待機
                }
                int value = buffer.poll();
                System.out.println("  消費: " + value
                    + " (サイズ: " + buffer.size() + ")");
                buffer.notifyAll(); // 生産者に通知
            }
            Thread.sleep(200);
        }
    }
}`,
      },
      {
        title: "BlockingQueue",
        content:
          "BlockingQueue は生産者消費者パターンを簡潔に実装するためのインターフェースです。put() はキューが満杯なら自動的にブロックし、take() はキューが空なら自動的にブロックします。wait/notify を自前で書く必要がなく、バグが入りにくいのが利点です。ArrayBlockingQueue と LinkedBlockingQueue がよく使われます。",
        code: `import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

// BlockingQueue で生産者消費者を簡潔に実装
public class BlockingQueueDemo {
    public static void main(String[] args) {
        // 容量5の制限付きキュー
        BlockingQueue<String> queue = new ArrayBlockingQueue<>(5);

        // 生産者: put() はキュー満杯時に自動ブロック
        Thread producer = new Thread(() -> {
            try {
                for (int i = 0; i < 10; i++) {
                    String item = "アイテム-" + i;
                    queue.put(item); // 満杯なら自動で待機
                    System.out.println("生産: " + item);
                }
                queue.put("END"); // 終了シグナル
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        // 消費者: take() はキュー空時に自動ブロック
        Thread consumer = new Thread(() -> {
            try {
                while (true) {
                    String item = queue.take(); // 空なら自動で待機
                    if ("END".equals(item)) break;
                    System.out.println("  消費: " + item);
                    Thread.sleep(200);
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        });

        producer.start();
        consumer.start();
    }
}`,
      },
      {
        title: "Semaphore",
        content:
          "Semaphore は同時アクセス数を制限する仕組みです。permits（許可数）を指定し、acquire() で許可を取得、release() で返却します。データベース接続プールや、同時実行スレッド数の制限に使われます。tryAcquire() でタイムアウト付きの取得も可能です。",
        code: `import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;

// Semaphore で同時アクセス数を制限
public class SemaphoreDemo {
    // 最大3つの同時接続を許可
    private static final Semaphore connectionPool = new Semaphore(3);

    public static void accessDatabase(String user) {
        try {
            System.out.println(user + ": 接続待ち...");
            connectionPool.acquire(); // 許可を取得（空きがなければ待機）
            try {
                System.out.println(user + ": DB接続中 (空き: "
                    + connectionPool.availablePermits() + ")");
                Thread.sleep(2000); // DB操作のシミュレーション
                System.out.println(user + ": 処理完了");
            } finally {
                connectionPool.release(); // 許可を返却
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    public static void main(String[] args) {
        // 5ユーザーが同時にアクセス（最大3つまで同時実行）
        for (int i = 1; i <= 5; i++) {
            final String user = "ユーザー" + i;
            new Thread(() -> accessDatabase(user)).start();
        }
    }
}`,
      },
      {
        title: "CountDownLatch / CyclicBarrier",
        content:
          "CountDownLatch は指定回数カウントダウンされるまでスレッドを待機させます。全サービスの初期化完了を待つ場合などに使います。CyclicBarrier は指定数のスレッドがバリアに到達するまで全員が待機し、再利用可能です。並列計算のフェーズ同期に適しています。",
        code: `import java.util.concurrent.CountDownLatch;
import java.util.concurrent.CyclicBarrier;

public class LatchBarrierDemo {
    public static void main(String[] args) throws Exception {
        // CountDownLatch: 3つのサービス初期化を待つ
        CountDownLatch latch = new CountDownLatch(3);
        String[] services = {"DB", "Cache", "MQ"};

        for (String svc : services) {
            new Thread(() -> {
                System.out.println(svc + " 初期化中...");
                try { Thread.sleep(1000); } catch (InterruptedException e) {}
                System.out.println(svc + " 初期化完了");
                latch.countDown(); // カウントダウン
            }).start();
        }
        latch.await(); // 全サービス完了まで待機
        System.out.println("全サービス起動完了！アプリ開始");

        // CyclicBarrier: 3スレッドがバリアで合流
        CyclicBarrier barrier = new CyclicBarrier(3, () -> {
            System.out.println("--- 全員到達！次フェーズへ ---");
        });

        for (int i = 0; i < 3; i++) {
            final int id = i;
            new Thread(() -> {
                try {
                    System.out.println("Worker" + id + " フェーズ1完了");
                    barrier.await(); // 全員が到達するまで待機
                    System.out.println("Worker" + id + " フェーズ2開始");
                } catch (Exception e) {}
            }).start();
        }
    }
}`,
      },
    ],
  },

  // ===== Concurrent API =====
  {
    id: "executor-service",
    title: "ExecutorService",
    category: "concurrent-api",
    description:
      "ThreadPoolExecutor、各種プールの種類、Future/Callable、シャットダウン戦略を学ぶ",
    sections: [
      {
        title: "ThreadPoolExecutor",
        content:
          "ThreadPoolExecutor はスレッドプールの中核クラスです。コアプールサイズ、最大プールサイズ、キュー容量などを細かく設定できます。スレッドの生成と破棄のコストを削減し、リソースを効率的に管理します。直接生成するよりも Executors ファクトリメソッドを使うことが多いですが、パラメータの理解は重要です。",
        code: `import java.util.concurrent.*;

public class ThreadPoolExecutorDemo {
    public static void main(String[] args) {
        // ThreadPoolExecutor を直接生成（細かい制御が可能）
        ThreadPoolExecutor executor = new ThreadPoolExecutor(
            2,                       // コアプールサイズ（常に維持するスレッド数）
            4,                       // 最大プールサイズ
            60, TimeUnit.SECONDS,    // アイドルスレッドの生存時間
            new ArrayBlockingQueue<>(10), // タスクキュー（容量10）
            new ThreadPoolExecutor.CallerRunsPolicy() // 拒否ポリシー
        );

        // タスクを投入
        for (int i = 0; i < 8; i++) {
            final int taskId = i;
            executor.execute(() -> {
                System.out.println("タスク" + taskId + " 実行中 ["
                    + Thread.currentThread().getName() + "]");
                try { Thread.sleep(1000); } catch (InterruptedException e) {}
            });
        }

        // プールの状態を確認
        System.out.println("アクティブ: " + executor.getActiveCount());
        System.out.println("キュー待ち: " + executor.getQueue().size());

        executor.shutdown();
    }
}`,
      },
      {
        title: "プールの種類（Fixed / Cached / Scheduled）",
        content:
          "Executors クラスは用途に応じた定型スレッドプールを提供します。FixedThreadPool は固定サイズで安定したスループットを提供し、CachedThreadPool は必要に応じてスレッドを生成・再利用します。ScheduledThreadPool は定期実行やスケジュール実行に使います。本番環境では直接 ThreadPoolExecutor を使う方が安全です。",
        code: `import java.util.concurrent.*;

public class ExecutorTypesDemo {
    public static void main(String[] args) throws Exception {
        // FixedThreadPool: 固定サイズ（CPU集約型タスク向け）
        ExecutorService fixed = Executors.newFixedThreadPool(
            Runtime.getRuntime().availableProcessors()
        );
        fixed.execute(() -> System.out.println("Fixed: "
            + Thread.currentThread().getName()));

        // CachedThreadPool: 動的サイズ（短時間のI/Oタスク向け）
        ExecutorService cached = Executors.newCachedThreadPool();
        cached.execute(() -> System.out.println("Cached: "
            + Thread.currentThread().getName()));

        // ScheduledThreadPool: 定期実行・遅延実行
        ScheduledExecutorService scheduled =
            Executors.newScheduledThreadPool(2);

        // 1秒後に1回だけ実行
        scheduled.schedule(() ->
            System.out.println("1秒後に実行"), 1, TimeUnit.SECONDS);

        // 初回2秒後、以降3秒間隔で繰り返し実行
        scheduled.scheduleAtFixedRate(() ->
            System.out.println("定期実行: " + System.currentTimeMillis()),
            2, 3, TimeUnit.SECONDS);

        Thread.sleep(10000); // 実行を観察
        fixed.shutdown(); cached.shutdown(); scheduled.shutdown();
    }
}`,
      },
      {
        title: "Future と Callable",
        content:
          "Callable は戻り値と例外送出が可能な Runnable の拡張版です。submit() で投入すると Future オブジェクトが返り、get() で結果を取得できます。get() はタスク完了まで待機するブロッキング呼び出しです。invokeAll() で複数タスクを一括実行し、結果をまとめて受け取ることもできます。",
        code: `import java.util.concurrent.*;
import java.util.List;
import java.util.ArrayList;

public class FutureCallableDemo {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(3);

        // Callable: 戻り値あり・例外送出可能
        Callable<Integer> task = () -> {
            Thread.sleep(1000);
            return 42;
        };

        // submit() で Future を取得
        Future<Integer> future = executor.submit(task);
        System.out.println("計算中...");
        Integer result = future.get(5, TimeUnit.SECONDS); // タイムアウト付き
        System.out.println("結果: " + result); // 42

        // invokeAll: 複数タスクを一括実行
        List<Callable<String>> tasks = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            final int id = i;
            tasks.add(() -> {
                Thread.sleep(500);
                return "タスク" + id + "完了";
            });
        }
        List<Future<String>> futures = executor.invokeAll(tasks);
        for (Future<String> f : futures) {
            System.out.println(f.get()); // 全結果を順に取得
        }

        executor.shutdown();
    }
}`,
      },
      {
        title: "shutdown 戦略",
        content:
          "ExecutorService の適切なシャットダウンは重要です。shutdown() は新規タスクの受付を停止し、実行中のタスクは完了させます。shutdownNow() は実行中のタスクに割り込みを送り、待機中のタスクを返却します。2段階シャットダウンパターンを使い、graceful に終了させるのがベストプラクティスです。",
        code: `import java.util.concurrent.*;
import java.util.List;

public class ShutdownStrategyDemo {
    // 推奨: 2段階シャットダウンパターン
    public static void shutdownGracefully(ExecutorService executor) {
        // フェーズ1: 新規タスク受付停止、実行中タスクの完了を待つ
        executor.shutdown();
        try {
            if (!executor.awaitTermination(30, TimeUnit.SECONDS)) {
                // フェーズ2: タイムアウト後は強制停止
                List<Runnable> pending = executor.shutdownNow();
                System.out.println("未実行タスク: " + pending.size());

                if (!executor.awaitTermination(10, TimeUnit.SECONDS)) {
                    System.err.println("プールが正常に終了しませんでした");
                }
            }
        } catch (InterruptedException e) {
            executor.shutdownNow(); // 割り込み時も強制停止
            Thread.currentThread().interrupt();
        }
        System.out.println("シャットダウン完了");
    }

    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(3);
        for (int i = 0; i < 10; i++) {
            executor.execute(() -> {
                try { Thread.sleep(2000); } catch (InterruptedException e) {
                    System.out.println("タスク中断");
                }
            });
        }
        shutdownGracefully(executor);
    }
}`,
      },
      {
        title: "タスク実行のベストプラクティス",
        content:
          "スレッドプールのサイズは、CPUバウンドのタスクではCPUコア数に近い値、I/Oバウンドのタスクではコア数の数倍に設定します。タスク内で InterruptedException を適切に処理し、カスタム ThreadFactory で分かりやすいスレッド名を付けるとデバッグが容易になります。try-with-resources（Java 19+）を使えばシャットダウン忘れも防げます。",
        code: `import java.util.concurrent.*;
import java.util.concurrent.atomic.AtomicInteger;

public class ExecutorBestPractices {
    // カスタムThreadFactory: 意味のあるスレッド名を付与
    static class NamedThreadFactory implements ThreadFactory {
        private final AtomicInteger count = new AtomicInteger(0);
        private final String prefix;

        NamedThreadFactory(String prefix) { this.prefix = prefix; }

        @Override
        public Thread newThread(Runnable r) {
            Thread t = new Thread(r, prefix + "-" + count.incrementAndGet());
            t.setDaemon(false);
            return t;
        }
    }

    public static void main(String[] args) throws Exception {
        int cpuCores = Runtime.getRuntime().availableProcessors();

        // CPU集約型: コア数と同じサイズ
        ExecutorService cpuPool = Executors.newFixedThreadPool(
            cpuCores, new NamedThreadFactory("cpu-worker"));

        // I/O集約型: コア数の2〜4倍
        ExecutorService ioPool = Executors.newFixedThreadPool(
            cpuCores * 2, new NamedThreadFactory("io-worker"));

        // Java 19+: try-with-resources でシャットダウン忘れ防止
        // try (var pool = Executors.newFixedThreadPool(4)) {
        //     pool.submit(() -> "自動シャットダウン");
        // }

        cpuPool.execute(() -> System.out.println(
            Thread.currentThread().getName() + ": CPU集約処理"));
        ioPool.execute(() -> System.out.println(
            Thread.currentThread().getName() + ": I/O処理"));

        cpuPool.shutdown(); ioPool.shutdown();
    }
}`,
      },
    ],
  },
  {
    id: "completable-future",
    title: "CompletableFuture",
    category: "concurrent-api",
    description:
      "非同期処理のチェーン、合成、例外処理、タイムアウトを CompletableFuture で学ぶ",
    sections: [
      {
        title: "基本（supplyAsync / thenApply）",
        content:
          "CompletableFuture は非同期処理を宣言的に記述できるクラスです。supplyAsync() で非同期タスクを開始し、thenApply() で結果を変換、thenAccept() で結果を消費します。従来の Future と違い、コールバック形式で結果を処理するため、ブロッキングなしに連鎖的な処理を記述できます。",
        code: `import java.util.concurrent.CompletableFuture;

public class CompletableFutureBasic {
    public static void main(String[] args) throws Exception {
        // supplyAsync: 非同期でデータを取得
        CompletableFuture<String> future = CompletableFuture
            .supplyAsync(() -> {
                System.out.println("取得中... ["
                    + Thread.currentThread().getName() + "]");
                return "ユーザーデータ";
            })
            // thenApply: 結果を変換（map と同様）
            .thenApply(data -> {
                System.out.println("変換中...");
                return data.toUpperCase();
            })
            // thenApply: さらに変換を連鎖
            .thenApply(data -> "処理済み: " + data);

        // thenAccept: 最終結果を消費（戻り値なし）
        future.thenAccept(result ->
            System.out.println("結果: " + result));

        // runAsync: 戻り値のない非同期タスク
        CompletableFuture<Void> task = CompletableFuture
            .runAsync(() -> System.out.println("バックグラウンド処理"));

        // join() で結果を待つ（get()と違いチェック例外なし）
        String result = future.join();
        System.out.println("join結果: " + result);
    }
}`,
      },
      {
        title: "チェーン（thenCompose / thenCombine）",
        content:
          "thenCompose() は非同期処理の結果を使って別の非同期処理を実行するフラットマップ操作です。thenCombine() は2つの独立した非同期処理の結果を合成します。thenApply() はシンプルな変換、thenCompose() はネストした CompletableFuture のフラット化に使い分けます。",
        code: `import java.util.concurrent.CompletableFuture;

public class CompletableFutureChain {
    // ユーザーID取得（非同期）
    static CompletableFuture<Integer> getUserId(String name) {
        return CompletableFuture.supplyAsync(() -> {
            System.out.println("ユーザーID取得: " + name);
            return 42;
        });
    }

    // ユーザー詳細取得（非同期）
    static CompletableFuture<String> getUserDetail(int userId) {
        return CompletableFuture.supplyAsync(() -> {
            System.out.println("詳細取得: ID=" + userId);
            return "山田太郎 (ID:" + userId + ")";
        });
    }

    // 注文履歴取得（非同期）
    static CompletableFuture<String> getOrders(int userId) {
        return CompletableFuture.supplyAsync(() -> "注文3件");
    }

    public static void main(String[] args) {
        // thenCompose: 直列の非同期チェーン（flatMap）
        CompletableFuture<String> detail = getUserId("yamada")
            .thenCompose(id -> getUserDetail(id)); // 結果を次の非同期処理へ

        // thenCombine: 並列の非同期処理を合成
        CompletableFuture<String> combined = getUserId("yamada")
            .thenCompose(id -> {
                var detailF = getUserDetail(id);   // 並行実行
                var ordersF = getOrders(id);       // 並行実行
                return detailF.thenCombine(ordersF,
                    (d, o) -> d + " | " + o);      // 結果を合成
            });

        System.out.println(combined.join());
        // → 山田太郎 (ID:42) | 注文3件
    }
}`,
      },
      {
        title: "allOf / anyOf",
        content:
          "allOf() は全ての CompletableFuture が完了するまで待機し、anyOf() はいずれか1つが完了した時点で結果を返します。allOf() はマイクロサービスの複数API呼び出しを並行実行する場合に便利です。anyOf() は最速のレスポンスを採用するフォールバックパターンに使えます。",
        code: `import java.util.concurrent.CompletableFuture;
import java.util.List;
import java.util.stream.Collectors;

public class AllOfAnyOfDemo {
    static CompletableFuture<String> fetchApi(String api, long delay) {
        return CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(delay); } catch (InterruptedException e) {}
            return api + "のレスポンス";
        });
    }

    public static void main(String[] args) {
        // allOf: 全APIのレスポンスを並行取得
        var userApi = fetchApi("ユーザーAPI", 1000);
        var orderApi = fetchApi("注文API", 1500);
        var reviewApi = fetchApi("レビューAPI", 800);

        CompletableFuture.allOf(userApi, orderApi, reviewApi)
            .thenRun(() -> {
                // 全て完了後に結果を集約
                System.out.println(userApi.join());
                System.out.println(orderApi.join());
                System.out.println(reviewApi.join());
            }).join();

        // anyOf: 最速のレスポンスを採用
        var primary = fetchApi("プライマリDB", 2000);
        var replica = fetchApi("レプリカDB", 500);
        var cache = fetchApi("キャッシュ", 100);

        Object fastest = CompletableFuture
            .anyOf(primary, replica, cache).join();
        System.out.println("最速: " + fastest);
        // → キャッシュのレスポンス
    }
}`,
      },
      {
        title: "例外処理",
        content:
          "CompletableFuture では exceptionally()、handle()、whenComplete() の3つの例外処理方法があります。exceptionally() は例外発生時のフォールバック値を返します。handle() は正常結果と例外の両方を処理でき、whenComplete() は結果を変更せずに副作用を実行します。",
        code: `import java.util.concurrent.CompletableFuture;

public class CompletableFutureException {
    static CompletableFuture<String> riskyOperation(boolean fail) {
        return CompletableFuture.supplyAsync(() -> {
            if (fail) throw new RuntimeException("API呼び出し失敗");
            return "成功データ";
        });
    }

    public static void main(String[] args) {
        // exceptionally: 例外時のフォールバック値
        String result1 = riskyOperation(true)
            .exceptionally(ex -> {
                System.out.println("エラー: " + ex.getMessage());
                return "デフォルト値"; // フォールバック
            }).join();
        System.out.println("結果: " + result1); // デフォルト値

        // handle: 正常・異常の両方を処理
        String result2 = riskyOperation(true)
            .handle((data, ex) -> {
                if (ex != null) {
                    return "リカバリ: " + ex.getMessage();
                }
                return "正常: " + data;
            }).join();
        System.out.println("結果: " + result2);

        // whenComplete: 副作用のみ（値は変更しない）
        riskyOperation(false)
            .whenComplete((data, ex) -> {
                if (ex != null) {
                    System.err.println("ログ: " + ex.getMessage());
                } else {
                    System.out.println("ログ: 成功 - " + data);
                }
            })
            .thenApply(data -> data + " → 次の処理")
            .thenAccept(System.out::println)
            .join();
    }
}`,
      },
      {
        title: "タイムアウト",
        content:
          "Java 9 以降の completeOnTimeout() は指定時間内に完了しなければデフォルト値で完了させます。orTimeout() はタイムアウト時に TimeoutException をスローします。外部API呼び出しなど、応答時間が不定な処理には必ずタイムアウトを設定し、システムのハングアップを防ぎます。",
        code: `import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

public class CompletableFutureTimeout {
    static CompletableFuture<String> slowApi() {
        return CompletableFuture.supplyAsync(() -> {
            try { Thread.sleep(5000); } catch (InterruptedException e) {}
            return "API結果";
        });
    }

    public static void main(String[] args) {
        // completeOnTimeout (Java 9+): タイムアウト時にデフォルト値
        String result1 = slowApi()
            .completeOnTimeout("タイムアウト - デフォルト値",
                2, TimeUnit.SECONDS)
            .join();
        System.out.println("結果1: " + result1);
        // → タイムアウト - デフォルト値

        // orTimeout (Java 9+): タイムアウト時に例外スロー
        String result2 = slowApi()
            .orTimeout(2, TimeUnit.SECONDS)
            .exceptionally(ex -> {
                System.out.println("タイムアウト例外: "
                    + ex.getClass().getSimpleName());
                return "フォールバック値";
            })
            .join();
        System.out.println("結果2: " + result2);

        // 実践パターン: タイムアウト + リトライ
        CompletableFuture<String> withRetry = slowApi()
            .orTimeout(1, TimeUnit.SECONDS)
            .exceptionally(ex -> {
                System.out.println("リトライ中...");
                return slowApi()
                    .completeOnTimeout("最終フォールバック",
                        1, TimeUnit.SECONDS)
                    .join();
            });
        System.out.println("結果3: " + withRetry.join());
    }
}`,
      },
    ],
  },

  // ===== モダン並行処理 =====
  {
    id: "virtual-threads",
    title: "Virtual Threads (Java 21)",
    category: "modern",
    description:
      "Virtual Threads の基本、プラットフォームスレッドとの比較、Structured Concurrency を学ぶ",
    sections: [
      {
        title: "Virtual Threads とは",
        content:
          "Virtual Threads（仮想スレッド）は Java 21 で正式導入された軽量スレッドです。OSスレッドに1対1で対応する従来のプラットフォームスレッドと異なり、JVMが管理するため数百万のスレッドを同時に生成できます。I/Oバウンドな処理で特に効果を発揮し、スレッドプールのサイズ調整が不要になります。",
        code: `// Virtual Threads の基本（Java 21+）
public class VirtualThreadIntro {
    public static void main(String[] args) throws InterruptedException {
        // 従来のプラットフォームスレッド
        Thread platformThread = Thread.ofPlatform()
            .name("platform-1")
            .start(() -> {
                System.out.println("プラットフォームスレッド: "
                    + Thread.currentThread());
                System.out.println("仮想?: "
                    + Thread.currentThread().isVirtual()); // false
            });

        // Virtual Thread（軽量・大量生成可能）
        Thread virtualThread = Thread.ofVirtual()
            .name("virtual-1")
            .start(() -> {
                System.out.println("仮想スレッド: "
                    + Thread.currentThread());
                System.out.println("仮想?: "
                    + Thread.currentThread().isVirtual()); // true
            });

        platformThread.join();
        virtualThread.join();

        // 100万スレッドも問題なく生成可能
        long start = System.currentTimeMillis();
        Thread[] threads = new Thread[1_000_000];
        for (int i = 0; i < threads.length; i++) {
            threads[i] = Thread.ofVirtual().start(() -> {
                try { Thread.sleep(1000); } catch (InterruptedException e) {}
            });
        }
        System.out.println("100万スレッド生成: "
            + (System.currentTimeMillis() - start) + "ms");
    }
}`,
      },
      {
        title: "Thread.ofVirtual と Executor",
        content:
          "Thread.ofVirtual() ビルダーやExecutors.newVirtualThreadPerTaskExecutor() で仮想スレッドを生成できます。仮想スレッドではスレッドプールのサイズ管理が不要で、タスクごとに新しいスレッドを作成するのが推奨パターンです。既存の ExecutorService ベースのコードも簡単に移行できます。",
        code: `import java.util.concurrent.*;

public class VirtualThreadExecutor {
    public static void main(String[] args) throws Exception {
        // newVirtualThreadPerTaskExecutor: タスクごとに仮想スレッド生成
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            // 10,000リクエストを並行処理
            List<Future<String>> futures = new ArrayList<>();
            for (int i = 0; i < 10_000; i++) {
                final int id = i;
                futures.add(executor.submit(() -> {
                    // I/O操作のシミュレーション
                    Thread.sleep(100);
                    return "結果-" + id;
                }));
            }
            // 全結果を収集
            int count = 0;
            for (Future<String> f : futures) {
                f.get(); // 結果取得
                count++;
            }
            System.out.println("完了タスク数: " + count);
        } // try-with-resources で自動シャットダウン

        // Thread.ofVirtual() ビルダー: カスタム設定
        ThreadFactory factory = Thread.ofVirtual()
            .name("worker-", 0) // worker-0, worker-1, ...
            .factory();
        Thread t = factory.newThread(() ->
            System.out.println(Thread.currentThread().getName()));
        t.start();
        t.join();
    }
}`,
      },
      {
        title: "プラットフォームスレッドとの比較",
        content:
          "プラットフォームスレッドはOSスレッドに対応し、1スレッドあたり約1MBのスタックメモリを消費するため数千が限界です。仮想スレッドはJVMが管理しスタックも動的なため、数百万スレッドが可能です。CPU集約型の処理ではプラットフォームスレッドが適し、I/Oバウンド処理では仮想スレッドが圧倒的に有利です。",
        code: `import java.util.concurrent.*;
import java.time.Duration;
import java.time.Instant;

public class VirtualVsPlatform {
    // I/Oバウンドタスク（仮想スレッドが有利）
    static Runnable ioTask = () -> {
        try { Thread.sleep(100); } catch (InterruptedException e) {}
    };

    public static void main(String[] args) throws Exception {
        int taskCount = 10_000;

        // プラットフォームスレッド: スレッドプールでの実行
        Instant start1 = Instant.now();
        try (var executor = Executors.newFixedThreadPool(200)) {
            for (int i = 0; i < taskCount; i++) {
                executor.submit(ioTask);
            }
        }
        System.out.println("プラットフォーム(200スレッド): "
            + Duration.between(start1, Instant.now()).toMillis() + "ms");
        // → 約5000ms（200スレッドで10000タスクを順に処理）

        // 仮想スレッド: タスクごとにスレッド生成
        Instant start2 = Instant.now();
        try (var executor =
                Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < taskCount; i++) {
                executor.submit(ioTask);
            }
        }
        System.out.println("仮想スレッド: "
            + Duration.between(start2, Instant.now()).toMillis() + "ms");
        // → 約100ms（10000スレッドが同時にsleep）
    }
}`,
      },
      {
        title: "Structured Concurrency",
        content:
          "Structured Concurrency（Java 21 プレビュー）はサブタスクのライフサイクルをスコープで管理するAPIです。StructuredTaskScope を使い、サブタスクの成功・失敗を構造化して処理します。親タスクのキャンセル時にサブタスクも自動キャンセルされ、リソースリークを防ぎます。エラーハンドリングも明確になります。",
        code: `// Structured Concurrency（Java 21 プレビュー）
// --enable-preview フラグが必要
import java.util.concurrent.StructuredTaskScope;

public class StructuredConcurrencyDemo {
    record User(String name) {}
    record Order(String item) {}

    static User fetchUser() throws InterruptedException {
        Thread.sleep(500);
        return new User("山田太郎");
    }

    static Order fetchOrder() throws InterruptedException {
        Thread.sleep(300);
        return new Order("Java入門書");
    }

    // ShutdownOnFailure: いずれかが失敗したら全サブタスクをキャンセル
    static String getUserWithOrder() throws Exception {
        try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
            // サブタスクをフォーク（仮想スレッドで並行実行）
            var userTask = scope.fork(() -> fetchUser());
            var orderTask = scope.fork(() -> fetchOrder());

            scope.join();           // 全サブタスク完了を待機
            scope.throwIfFailed();  // いずれか失敗なら例外スロー

            // 両方成功した場合のみここに到達
            return userTask.get().name() + ": "
                + orderTask.get().item();
        }
        // スコープを抜けると未完了のサブタスクは自動キャンセル
    }

    public static void main(String[] args) throws Exception {
        System.out.println(getUserWithOrder());
        // → 山田太郎: Java入門書
    }
}`,
      },
      {
        title: "性能ベンチマーク",
        content:
          "仮想スレッドはI/O待ちの多いWebアプリケーションで劇的な効果を発揮します。HTTPリクエスト処理、DB接続、ファイルI/Oなどブロッキング操作が多い場面で、スループットが数倍に向上するケースがあります。ただし、synchronized ブロック内のI/O操作はキャリアスレッドをピン留めするため、ReentrantLock への置き換えが推奨されます。",
        code: `import java.util.concurrent.*;
import java.time.*;

public class VirtualThreadBenchmark {
    // ブロッキングI/Oを模擬するHTTPハンドラ
    static String handleRequest(int id) throws InterruptedException {
        Thread.sleep(50); // DB問い合わせ (50ms)
        Thread.sleep(30); // 外部API呼び出し (30ms)
        return "レスポンス-" + id;
    }

    public static void main(String[] args) throws Exception {
        int requests = 50_000;

        // 仮想スレッドでのWebサーバーシミュレーション
        Instant start = Instant.now();
        try (var executor =
                Executors.newVirtualThreadPerTaskExecutor()) {
            var futures = new java.util.ArrayList<Future<String>>();
            for (int i = 0; i < requests; i++) {
                final int id = i;
                futures.add(executor.submit(
                    () -> handleRequest(id)));
            }
            for (var f : futures) f.get(); // 全結果を待機
        }
        long elapsed = Duration.between(start, Instant.now()).toMillis();
        System.out.println("仮想スレッド: " + elapsed + "ms");
        System.out.println("スループット: "
            + (requests * 1000L / elapsed) + " req/s");

        // 注意: synchronized 内のI/Oはキャリアスレッドをピン留め
        // NG: synchronized (lock) { database.query(); }
        // OK: reentrantLock.lock(); try { database.query(); }
        //     finally { reentrantLock.unlock(); }
    }
}`,
      },
    ],
  },
  {
    id: "concurrent-collections",
    title: "並行コレクション",
    category: "modern",
    description:
      "ConcurrentHashMap、CopyOnWriteArrayList、各種並行キューの特徴と使い分けを学ぶ",
    sections: [
      {
        title: "ConcurrentHashMap",
        content:
          "ConcurrentHashMap はスレッドセーフなHashMapで、セグメント単位のロックにより高い並行性を実現します。Collections.synchronizedMap() と異なり、読み取りはロック不要で、書き込みも部分ロックのみです。compute()、merge()、putIfAbsent() などのアトミック操作を提供し、check-then-act のレースコンディションを防ぎます。",
        code: `import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

public class ConcurrentHashMapDemo {
    public static void main(String[] args) throws InterruptedException {
        ConcurrentHashMap<String, Integer> wordCount =
            new ConcurrentHashMap<>();

        // putIfAbsent: キーが存在しない場合のみ追加（アトミック）
        wordCount.putIfAbsent("Java", 0);

        // compute: アトミックに値を更新
        wordCount.compute("Java", (key, val) -> val + 1);

        // merge: 既存値と新しい値を合成（アトミック）
        wordCount.merge("Java", 1, Integer::sum);
        System.out.println("Java: " + wordCount.get("Java")); // 2

        // 並行ワードカウント
        String[] words = {"Java", "Python", "Java", "Go", "Java", "Python"};
        ConcurrentHashMap<String, Integer> counter =
            new ConcurrentHashMap<>();

        Thread[] threads = new Thread[words.length];
        for (int i = 0; i < words.length; i++) {
            final String word = words[i];
            threads[i] = new Thread(() ->
                counter.merge(word, 1, Integer::sum) // スレッドセーフ
            );
            threads[i].start();
        }
        for (Thread t : threads) t.join();

        // 並行ストリーム操作
        counter.forEach(2, // 並列度2
            (key, value) ->
                System.out.println(key + ": " + value));
    }
}`,
      },
      {
        title: "CopyOnWriteArrayList",
        content:
          "CopyOnWriteArrayList は書き込み時に内部配列をコピーするスレッドセーフなリストです。読み取りはロック不要で高速ですが、書き込みのたびにコピーが発生するため、読み取りが圧倒的に多く書き込みが少ない場面に適しています。イベントリスナーの管理やホワイトリストなどのユースケースに最適です。",
        code: `import java.util.concurrent.CopyOnWriteArrayList;
import java.util.List;

public class CopyOnWriteDemo {
    // イベントリスナー管理に最適（追加/削除は少、通知は多）
    private static final CopyOnWriteArrayList<String> listeners =
        new CopyOnWriteArrayList<>();

    public static void main(String[] args) throws InterruptedException {
        // 書き込みスレッド: リスナー登録
        Thread writer = new Thread(() -> {
            for (int i = 0; i < 5; i++) {
                listeners.add("Listener-" + i);
                System.out.println("追加: Listener-" + i);
                try { Thread.sleep(100); } catch (InterruptedException e) {}
            }
        });

        // 読み取りスレッド: リスナー通知（イテレーション中に追加されても例外なし）
        Thread reader = new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                // ConcurrentModificationException が発生しない
                for (String listener : listeners) {
                    System.out.println("  通知: " + listener);
                }
                try { Thread.sleep(50); } catch (InterruptedException e) {}
            }
        });

        writer.start(); reader.start();
        writer.join(); reader.join();

        // 通常の ArrayList では ConcurrentModificationException が発生する
        // CopyOnWriteArrayList は読み取り時にスナップショットを使用
        System.out.println("最終リスト: " + listeners);
    }
}`,
      },
      {
        title: "BlockingQueue の実装",
        content:
          "BlockingQueue には複数の実装があり、用途に応じて使い分けます。ArrayBlockingQueue は固定サイズの配列ベース、LinkedBlockingQueue は可変サイズのリンクリストベースです。PriorityBlockingQueue は優先度付きで、DelayQueue は遅延実行のスケジューリングに使います。",
        code: `import java.util.concurrent.*;

public class BlockingQueueTypes {
    public static void main(String[] args) throws Exception {
        // ArrayBlockingQueue: 固定サイズ（メモリ効率が良い）
        BlockingQueue<String> arrayBQ = new ArrayBlockingQueue<>(100);
        arrayBQ.put("アイテム1");
        System.out.println("ArrayBQ: " + arrayBQ.take());

        // LinkedBlockingQueue: 可変サイズ（デフォルトはInteger.MAX_VALUE）
        BlockingQueue<String> linkedBQ = new LinkedBlockingQueue<>(1000);
        linkedBQ.offer("アイテム2", 1, TimeUnit.SECONDS); // タイムアウト付き
        System.out.println("LinkedBQ: " + linkedBQ.poll());

        // PriorityBlockingQueue: 優先度順（自然順序またはComparator）
        PriorityBlockingQueue<Integer> priorityBQ =
            new PriorityBlockingQueue<>();
        priorityBQ.put(30);
        priorityBQ.put(10);
        priorityBQ.put(20);
        System.out.println("PriorityBQ: " + priorityBQ.take()); // 10（最小値）

        // SynchronousQueue: 容量0（直接ハンドオフ）
        SynchronousQueue<String> syncQ = new SynchronousQueue<>();
        new Thread(() -> {
            try { syncQ.put("ダイレクト"); } // 受け取り手が来るまでブロック
            catch (InterruptedException e) {}
        }).start();
        System.out.println("SyncQ: " + syncQ.take());

        // DelayQueue: 遅延実行（指定時刻まで取り出せない）
        // タスクスケジューリングやキャッシュ有効期限管理に利用
        System.out.println("全キューの動作確認完了");
    }
}`,
      },
      {
        title: "ConcurrentLinkedQueue",
        content:
          "ConcurrentLinkedQueue はロックフリーのスレッドセーフなキューです。CAS操作に基づく非ブロッキングアルゴリズムで、高い並行性を実現します。ブロッキング操作（put/take）はなく、offer/poll で操作します。BlockingQueue のような待機が不要な場合に、より軽量な選択肢として使えます。",
        code: `import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ConcurrentLinkedDeque;

public class ConcurrentLinkedQueueDemo {
    public static void main(String[] args) throws InterruptedException {
        // ConcurrentLinkedQueue: ロックフリーのFIFOキュー
        ConcurrentLinkedQueue<String> queue = new ConcurrentLinkedQueue<>();

        // 複数スレッドから安全に追加
        Thread producer1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                queue.offer("P1-" + i); // ノンブロッキング追加
            }
        });
        Thread producer2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                queue.offer("P2-" + i);
            }
        });

        // 複数スレッドから安全に取得
        Thread consumer = new Thread(() -> {
            int count = 0;
            String item;
            while (count < 2000) {
                item = queue.poll(); // ノンブロッキング取得（空ならnull）
                if (item != null) count++;
            }
            System.out.println("消費完了: " + count + "件");
        });

        producer1.start(); producer2.start(); consumer.start();
        producer1.join(); producer2.join(); consumer.join();

        // ConcurrentLinkedDeque: 両端キュー（スタックとしても使える）
        ConcurrentLinkedDeque<String> deque = new ConcurrentLinkedDeque<>();
        deque.offerFirst("先頭");
        deque.offerLast("末尾");
        System.out.println("先頭: " + deque.pollFirst()); // 先頭
        System.out.println("末尾: " + deque.pollLast());  // 末尾
    }
}`,
      },
      {
        title: "使い分けガイド",
        content:
          "並行コレクションの選択はパフォーマンスに大きく影響します。Map には ConcurrentHashMap、読み取り多のリストには CopyOnWriteArrayList、生産者消費者パターンには BlockingQueue を使います。非ブロッキングが必要なら ConcurrentLinkedQueue、ソート順が必要なら ConcurrentSkipListMap を選びます。",
        code: `import java.util.concurrent.*;
import java.util.*;

// 並行コレクション使い分けガイド
public class CollectionGuide {
    public static void main(String[] args) {
        // === Map ===
        // 汎用: ConcurrentHashMap（最も頻繁に使用）
        Map<String, Object> cache = new ConcurrentHashMap<>();

        // ソート順が必要: ConcurrentSkipListMap
        NavigableMap<String, Integer> sorted = new ConcurrentSkipListMap<>();
        sorted.put("B", 2); sorted.put("A", 1); sorted.put("C", 3);
        System.out.println("最小キー: " + sorted.firstKey()); // A

        // === List ===
        // 読み取り多・書き込み少: CopyOnWriteArrayList
        List<String> listeners = new CopyOnWriteArrayList<>();

        // 書き込みも多い場合: Collections.synchronizedList
        List<String> syncList = Collections.synchronizedList(new ArrayList<>());

        // === Queue ===
        // ブロッキング(生産者消費者): ArrayBlockingQueue
        BlockingQueue<String> bounded = new ArrayBlockingQueue<>(100);
        // ブロッキング(無制限): LinkedBlockingQueue
        BlockingQueue<String> unbounded = new LinkedBlockingQueue<>();
        // ノンブロッキング: ConcurrentLinkedQueue
        Queue<String> nonBlocking = new ConcurrentLinkedQueue<>();

        // === Set ===
        // 並行Set: ConcurrentHashMap ベース
        Set<String> concurrentSet = ConcurrentHashMap.newKeySet();
        concurrentSet.add("Java");

        System.out.println("用途に応じたコレクション選択が重要！");
    }
}`,
      },
    ],
  },
];
