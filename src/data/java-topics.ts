export interface TopicSection {
  title: string;
  content: string;
  code?: string;
}

export interface JavaTopic {
  id: string;
  title: string;
  category: string;
  icon: string;
  description: string;
  sections: TopicSection[];
}

export const topicCategories = [
  { id: "basics", name: "基礎", color: "var(--color-dads-success)" },
  { id: "oop", name: "オブジェクト指向", color: "var(--color-dads-blue)" },
  { id: "collections", name: "コレクション", color: "var(--color-dads-warning)" },
  { id: "concurrency", name: "並行処理", color: "var(--color-dads-purple)" },
  { id: "io", name: "入出力", color: "var(--color-dads-error)" },
  { id: "advanced", name: "応用", color: "var(--color-dads-gray)" },
] as const;

export const javaTopics: JavaTopic[] = [
  // === 基礎 ===
  {
    id: "variables",
    title: "変数とデータ型",
    category: "basics",
    icon: "Variable",
    description: "Javaの基本データ型、変数宣言、型変換について学ぶ",
    sections: [
      {
        title: "プリミティブ型",
        content: "Javaには8つのプリミティブ型があります。数値型 (byte, short, int, long, float, double)、文字型 (char)、論理型 (boolean) です。",
        code: `// 整数型
byte b = 127;                // 8bit: -128 ~ 127
short s = 32767;             // 16bit: -32768 ~ 32767
int i = 2_147_483_647;      // 32bit（アンダースコア区切り可能）
long l = 9_223_372_036_854_775_807L;  // 64bit

// 浮動小数点型
float f = 3.14f;             // 32bit
double d = 3.141592653589;   // 64bit

// 文字型
char c = 'A';                // 16bit Unicode
char unicode = '\\u3042';     // 'あ'

// 論理型
boolean flag = true;         // true or false`,
      },
      {
        title: "参照型",
        content: "プリミティブ型以外はすべて参照型です。String、配列、クラスのインスタンスなどが該当します。",
        code: `// String（不変オブジェクト）
String name = "Hello";
String greeting = name + " World";  // 新しいオブジェクトが生成

// 配列
int[] numbers = {1, 2, 3, 4, 5};
String[] names = new String[3];
int[][] matrix = {{1, 2}, {3, 4}};

// ラッパークラス（オートボクシング）
Integer wrapped = 42;        // int -> Integer (ボクシング)
int unwrapped = wrapped;     // Integer -> int (アンボクシング)`,
      },
      {
        title: "型変換",
        content: "暗黙的な拡大変換と、明示的なキャストによる縮小変換があります。",
        code: `// 拡大変換（暗黙的）
int i = 100;
long l = i;        // int -> long
double d = l;      // long -> double

// 縮小変換（明示的キャスト）
double pi = 3.14;
int intPi = (int) pi;      // 3（小数部が切り捨て）

// 文字列との変換
String str = String.valueOf(42);     // "42"
int num = Integer.parseInt("42");    // 42
double dbl = Double.parseDouble("3.14");`,
      },
    ],
  },
  {
    id: "control-flow",
    title: "制御構文",
    category: "basics",
    icon: "GitBranch",
    description: "if文、switch文、ループ、例外処理などの制御フロー",
    sections: [
      {
        title: "条件分岐",
        content: "if-else文とswitch文でプログラムの流れを制御します。",
        code: `// if-else
if (score >= 90) {
    grade = "A";
} else if (score >= 80) {
    grade = "B";
} else {
    grade = "C";
}

// 三項演算子
String result = (age >= 18) ? "成人" : "未成年";

// switch文
switch (day) {
    case MONDAY:
        System.out.println("月曜日");
        break;
    case SATURDAY:
    case SUNDAY:
        System.out.println("週末");
        break;
    default:
        System.out.println("平日");
}`,
      },
      {
        title: "ループ",
        content: "for文、while文、do-while文、拡張for文でループ処理を行います。",
        code: `// for文
for (int i = 0; i < 10; i++) {
    System.out.println(i);
}

// 拡張for文（for-each）
for (String name : names) {
    System.out.println(name);
}

// while文
while (condition) {
    // 処理
}

// do-while文（最低1回は実行）
do {
    line = reader.readLine();
} while (line != null);

// break と continue
for (int i = 0; i < 100; i++) {
    if (i % 2 == 0) continue;  // 偶数をスキップ
    if (i > 50) break;          // 50を超えたら終了
    System.out.println(i);
}`,
      },
    ],
  },
  {
    id: "methods",
    title: "メソッド",
    category: "basics",
    icon: "Code",
    description: "メソッドの定義、オーバーロード、可変長引数",
    sections: [
      {
        title: "メソッドの基本",
        content: "メソッドは処理をまとめた再利用可能なブロックです。アクセス修飾子、戻り値の型、名前、パラメータで構成されます。",
        code: `// 基本的なメソッド
public int add(int a, int b) {
    return a + b;
}

// void メソッド
public void greet(String name) {
    System.out.println("Hello, " + name + "!");
}

// static メソッド
public static double calculateArea(double radius) {
    return Math.PI * radius * radius;
}`,
      },
      {
        title: "オーバーロードと可変長引数",
        content: "同じ名前で異なる引数を持つメソッドを定義できます（オーバーロード）。可変長引数で任意の数の引数を受け取れます。",
        code: `// メソッドオーバーロード
public int sum(int a, int b) { return a + b; }
public int sum(int a, int b, int c) { return a + b + c; }
public double sum(double a, double b) { return a + b; }

// 可変長引数
public int sum(int... numbers) {
    int total = 0;
    for (int n : numbers) {
        total += n;
    }
    return total;
}

// 呼び出し
sum(1, 2);           // 3
sum(1, 2, 3, 4, 5);  // 15`,
      },
    ],
  },
  {
    id: "strings",
    title: "文字列操作",
    category: "basics",
    icon: "Type",
    description: "String, StringBuilder, 文字列操作メソッド、正規表現",
    sections: [
      {
        title: "Stringクラス",
        content: "Javaの文字列は不変（immutable）オブジェクトです。変更のたびに新しいオブジェクトが生成されます。",
        code: `String str = "Hello, World!";

// 基本操作
str.length();              // 13
str.charAt(0);             // 'H'
str.substring(0, 5);       // "Hello"
str.indexOf("World");      // 7
str.contains("Hello");     // true

// 変換
str.toUpperCase();         // "HELLO, WORLD!"
str.toLowerCase();         // "hello, world!"
str.trim();                // 前後の空白除去
str.replace("World", "Java"); // "Hello, Java!"

// 分割と結合
String[] parts = "a,b,c".split(",");  // ["a", "b", "c"]
String joined = String.join("-", "a", "b", "c"); // "a-b-c"

// 比較
str.equals("Hello");       // false（内容比較）
str.equalsIgnoreCase("hello, world!"); // true`,
      },
      {
        title: "StringBuilderとStringBuffer",
        content: "頻繁な文字列連結にはStringBuilder（非スレッドセーフ）やStringBuffer（スレッドセーフ）を使用します。",
        code: `// StringBuilder（推奨）
StringBuilder sb = new StringBuilder();
sb.append("Hello");
sb.append(", ");
sb.append("World!");
String result = sb.toString(); // "Hello, World!"

// メソッドチェーン
String result2 = new StringBuilder()
    .append("Name: ")
    .append(name)
    .append("\\nAge: ")
    .append(age)
    .toString();

// String.format
String formatted = String.format(
    "%s is %d years old", "Alice", 30);`,
      },
    ],
  },

  // === オブジェクト指向 ===
  {
    id: "classes",
    title: "クラスとオブジェクト",
    category: "oop",
    icon: "Box",
    description: "クラスの定義、コンストラクタ、フィールド、アクセス修飾子",
    sections: [
      {
        title: "クラスの定義",
        content: "クラスはオブジェクトの設計図です。フィールド（状態）とメソッド（振る舞い）を持ちます。",
        code: `public class Person {
    // フィールド
    private String name;
    private int age;

    // コンストラクタ
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // ゲッター
    public String getName() { return name; }
    public int getAge() { return age; }

    // メソッド
    public void introduce() {
        System.out.println(
            "私は" + name + "、" + age + "歳です。");
    }

    @Override
    public String toString() {
        return "Person{name='" + name + "', age=" + age + "}";
    }
}

// 使用
Person alice = new Person("Alice", 30);
alice.introduce();`,
      },
      {
        title: "アクセス修飾子",
        content: "public, protected, package-private（デフォルト）, private の4つのアクセスレベルがあります。",
        code: `public class MyClass {
    public int publicField;       // どこからでもアクセス可
    protected int protectedField; // 同パッケージ + サブクラス
    int packageField;             // 同パッケージのみ
    private int privateField;     // クラス内のみ
}

// カプセル化の原則
public class Account {
    private double balance;  // private で保護

    public double getBalance() {
        return balance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
        }
    }
}`,
      },
    ],
  },
  {
    id: "inheritance",
    title: "継承とポリモーフィズム",
    category: "oop",
    icon: "GitMerge",
    description: "extends, super, オーバーライド、抽象クラス、ポリモーフィズム",
    sections: [
      {
        title: "継承 (extends)",
        content: "既存のクラスを拡張して新しいクラスを作成します。コードの再利用性を高めます。",
        code: `// 基底クラス
public class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;
    }

    public void speak() {
        System.out.println(name + "が鳴きます");
    }
}

// 派生クラス
public class Dog extends Animal {
    private String breed;

    public Dog(String name, String breed) {
        super(name);  // 親のコンストラクタ呼び出し
        this.breed = breed;
    }

    @Override
    public void speak() {
        System.out.println(name + "がワンワンと鳴きます");
    }
}

// ポリモーフィズム
Animal animal = new Dog("ポチ", "柴犬");
animal.speak(); // "ポチがワンワンと鳴きます"`,
      },
      {
        title: "抽象クラス",
        content: "インスタンス化できないクラスで、サブクラスに実装を強制する抽象メソッドを持てます。",
        code: `public abstract class Shape {
    protected String color;

    public Shape(String color) {
        this.color = color;
    }

    // 抽象メソッド（サブクラスで実装必須）
    public abstract double area();
    public abstract double perimeter();

    // 通常のメソッド
    public void describe() {
        System.out.println(color + "の図形（面積: "
            + area() + "）");
    }
}

public class Circle extends Shape {
    private double radius;

    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }

    @Override
    public double perimeter() {
        return 2 * Math.PI * radius;
    }
}`,
      },
    ],
  },
  {
    id: "interfaces",
    title: "インターフェース",
    category: "oop",
    icon: "Puzzle",
    description: "インターフェースの定義、実装、デフォルトメソッド、関数型インターフェース",
    sections: [
      {
        title: "インターフェースの基本",
        content: "メソッドのシグネチャを定義し、クラスに実装を強制します。多重継承的な機能を提供します。",
        code: `// インターフェース定義
public interface Drawable {
    void draw();
    default String getType() { return "Shape"; }
}

public interface Resizable {
    void resize(double factor);
}

// 複数のインターフェースを実装
public class Square implements Drawable, Resizable {
    private double side;

    @Override
    public void draw() {
        System.out.println("正方形を描画");
    }

    @Override
    public void resize(double factor) {
        side *= factor;
    }

    @Override
    public String getType() {
        return "Square";
    }
}`,
      },
      {
        title: "インターフェースの活用パターン",
        content: "戦略パターン、コールバック、依存性の注入などで活用されます。",
        code: `// 戦略パターン
public interface SortStrategy {
    void sort(int[] array);
}

public class QuickSort implements SortStrategy {
    @Override
    public void sort(int[] array) {
        // クイックソートの実装
    }
}

public class Sorter {
    private SortStrategy strategy;

    public Sorter(SortStrategy strategy) {
        this.strategy = strategy;
    }

    public void sort(int[] array) {
        strategy.sort(array);
    }
}

// 使用
Sorter sorter = new Sorter(new QuickSort());
sorter.sort(data);

// ラムダ式で匿名実装
Sorter sorter2 = new Sorter(array -> Arrays.sort(array));`,
      },
    ],
  },
  {
    id: "generics",
    title: "ジェネリクス",
    category: "oop",
    icon: "Layers",
    description: "型パラメータ、境界型、ワイルドカード、型消去",
    sections: [
      {
        title: "ジェネリクスの基本",
        content: "型パラメータを使用して、型安全で再利用可能なコードを記述します。",
        code: `// ジェネリッククラス
public class Box<T> {
    private T value;

    public Box(T value) { this.value = value; }
    public T getValue() { return value; }
    public void setValue(T value) { this.value = value; }
}

Box<String> stringBox = new Box<>("Hello");
Box<Integer> intBox = new Box<>(42);

// ジェネリックメソッド
public <T> T getFirst(List<T> list) {
    return list.isEmpty() ? null : list.get(0);
}

// 複数の型パラメータ
public class Pair<K, V> {
    private K key;
    private V value;
    public Pair(K key, V value) {
        this.key = key;
        this.value = value;
    }
}`,
      },
      {
        title: "境界型とワイルドカード",
        content: "型パラメータに制約を設けて、使用可能な型を制限します。",
        code: `// 上限境界（extends）- Tは Number のサブクラス
public <T extends Number> double sum(List<T> list) {
    return list.stream()
        .mapToDouble(Number::doubleValue)
        .sum();
}

// 複数の境界
public <T extends Comparable<T> & Serializable> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}

// ワイルドカード
// 上限ワイルドカード（読み取り専用）
public double sum(List<? extends Number> list) { ... }

// 下限ワイルドカード（書き込み用）
public void addNumbers(List<? super Integer> list) {
    list.add(1);
    list.add(2);
}

// 非境界ワイルドカード
public void printList(List<?> list) {
    list.forEach(System.out::println);
}`,
      },
    ],
  },
  {
    id: "enums",
    title: "列挙型 (Enum)",
    category: "oop",
    icon: "List",
    description: "Enumの定義、メソッド、高度な使い方",
    sections: [
      {
        title: "Enumの基本と活用",
        content: "決まった定数の集合を型安全に表現します。メソッドやフィールドも持てます。",
        code: `// 基本的なEnum
public enum Season {
    SPRING, SUMMER, AUTUMN, WINTER
}

// フィールドとメソッドを持つEnum
public enum Planet {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS(4.869e+24, 6.0518e6),
    EARTH(5.976e+24, 6.37814e6);

    private final double mass;
    private final double radius;

    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }

    double surfaceGravity() {
        final double G = 6.67300E-11;
        return G * mass / (radius * radius);
    }
}

// 抽象メソッドを持つEnum
public enum Operation {
    ADD {
        @Override
        public double apply(double x, double y) { return x + y; }
    },
    SUBTRACT {
        @Override
        public double apply(double x, double y) { return x - y; }
    };

    public abstract double apply(double x, double y);
}`,
      },
    ],
  },

  // === コレクション ===
  {
    id: "collections-list",
    title: "List (リスト)",
    category: "collections",
    icon: "ListOrdered",
    description: "ArrayList, LinkedList, 不変リスト、ソートと検索",
    sections: [
      {
        title: "Listの基本操作",
        content: "順序付きの要素のコレクション。ArrayList（高速ランダムアクセス）とLinkedList（高速挿入/削除）が主な実装です。",
        code: `// ArrayList
List<String> list = new ArrayList<>();
list.add("Alice");
list.add("Bob");
list.add(1, "Charlie");  // インデックス1に挿入

// 取得と更新
String first = list.get(0);      // "Alice"
list.set(0, "Alex");             // 0番目を更新
list.remove("Bob");              // 要素で削除
list.remove(0);                  // インデックスで削除

// 検索
boolean has = list.contains("Alice");
int idx = list.indexOf("Alice");

// ソート
list.sort(Comparator.naturalOrder());
list.sort(Comparator.comparing(String::length));

// 不変リスト
List<String> immutable = List.of("a", "b", "c");
List<String> copy = List.copyOf(list);`,
      },
    ],
  },
  {
    id: "collections-map",
    title: "Map (マップ)",
    category: "collections",
    icon: "Map",
    description: "HashMap, TreeMap, LinkedHashMap, ConcurrentHashMap",
    sections: [
      {
        title: "Mapの基本操作",
        content: "キーと値のペアを管理するデータ構造。HashMap（最速）、TreeMap（ソート済み）、LinkedHashMap（挿入順維持）などがあります。",
        code: `// HashMap
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 95);
scores.put("Bob", 87);

// 取得
int score = scores.get("Alice");        // 95
int safe = scores.getOrDefault("Eve", 0); // 0

// Java 8以降の便利メソッド
scores.putIfAbsent("Charlie", 90);
scores.computeIfAbsent("Dave", k -> k.length() * 10);
scores.merge("Alice", 5, Integer::sum); // 95 + 5 = 100

// 走査
scores.forEach((name, s) ->
    System.out.println(name + ": " + s));

// entrySet
for (var entry : scores.entrySet()) {
    System.out.println(entry.getKey() + "=" + entry.getValue());
}

// 不変Map
Map<String, Integer> immutable = Map.of(
    "one", 1, "two", 2, "three", 3
);`,
      },
    ],
  },
  {
    id: "collections-set",
    title: "Set (セット)",
    category: "collections",
    icon: "CircleDot",
    description: "HashSet, TreeSet, LinkedHashSet, EnumSet",
    sections: [
      {
        title: "Setの基本操作",
        content: "重複を許さない要素のコレクション。HashSet（最速）、TreeSet（ソート済み）、LinkedHashSet（挿入順維持）があります。",
        code: `// HashSet
Set<String> set = new HashSet<>();
set.add("Java");
set.add("Python");
set.add("Java");        // 重複は無視される
System.out.println(set.size()); // 2

// 集合演算
Set<Integer> a = Set.of(1, 2, 3, 4, 5);
Set<Integer> b = Set.of(4, 5, 6, 7, 8);

// 和集合
Set<Integer> union = new HashSet<>(a);
union.addAll(b);         // {1,2,3,4,5,6,7,8}

// 積集合
Set<Integer> intersection = new HashSet<>(a);
intersection.retainAll(b); // {4, 5}

// 差集合
Set<Integer> diff = new HashSet<>(a);
diff.removeAll(b);       // {1, 2, 3}

// TreeSet（ソート済み）
TreeSet<String> sorted = new TreeSet<>(set);
sorted.first();          // 最小要素
sorted.last();           // 最大要素`,
      },
    ],
  },

  // === 並行処理 ===
  {
    id: "threads",
    title: "スレッドの基礎",
    category: "concurrency",
    icon: "Cpu",
    description: "Thread, Runnable, スレッドの同期、wait/notify",
    sections: [
      {
        title: "スレッドの作成と実行",
        content: "Threadクラスの継承またはRunnableインターフェースの実装でスレッドを作成します。",
        code: `// Runnableインターフェース（推奨）
Runnable task = () -> {
    System.out.println("スレッド: "
        + Thread.currentThread().getName());
};
Thread thread = new Thread(task, "MyThread");
thread.start();

// Threadクラスの継承
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("実行中");
    }
}

// スレッドの制御
thread.join();           // 終了を待機
thread.join(1000);       // 最大1秒待機
Thread.sleep(500);       // 500ms停止
thread.isAlive();        // 実行中かチェック`,
      },
      {
        title: "同期制御",
        content: "synchronizedキーワードやLockインターフェースで、スレッド間のデータ競合を防ぎます。",
        code: `// synchronizedメソッド
public class Counter {
    private int count = 0;

    public synchronized void increment() {
        count++;
    }

    public synchronized int getCount() {
        return count;
    }
}

// synchronizedブロック
public void process() {
    synchronized (this) {
        // 排他制御された処理
    }
}

// ReentrantLock
private final Lock lock = new ReentrantLock();

public void safeMethod() {
    lock.lock();
    try {
        // 排他制御された処理
    } finally {
        lock.unlock();
    }
}`,
      },
    ],
  },
  {
    id: "executor",
    title: "ExecutorService",
    category: "concurrency",
    icon: "Workflow",
    description: "スレッドプール、Future、Callable、タスクのスケジューリング",
    sections: [
      {
        title: "ExecutorServiceの基本",
        content: "スレッドプールを管理し、タスクの実行をフレームワークに委譲します。",
        code: `// 固定サイズのスレッドプール
ExecutorService executor = Executors.newFixedThreadPool(4);

// タスクの送信
executor.execute(() -> System.out.println("非同期タスク"));

// Future で結果を取得
Future<String> future = executor.submit(() -> {
    Thread.sleep(1000);
    return "完了";
});
String result = future.get(); // ブロッキング

// 複数のタスクを一括実行
List<Callable<Integer>> tasks = List.of(
    () -> compute(1),
    () -> compute(2),
    () -> compute(3)
);
List<Future<Integer>> futures = executor.invokeAll(tasks);

// シャットダウン
executor.shutdown();
executor.awaitTermination(60, TimeUnit.SECONDS);`,
      },
    ],
  },

  // === 入出力 ===
  {
    id: "file-io",
    title: "ファイル入出力",
    category: "io",
    icon: "FileText",
    description: "Files, Path, BufferedReader/Writer, NIO.2",
    sections: [
      {
        title: "ファイル操作",
        content: "java.nio.file パッケージで、モダンなファイル操作が可能です。",
        code: `// パス操作
Path path = Path.of("data", "users.txt");
Path absolute = path.toAbsolutePath();
Path parent = path.getParent();

// ファイル読み込み
String content = Files.readString(path);
List<String> lines = Files.readAllLines(path);
byte[] bytes = Files.readAllBytes(path);

// ファイル書き込み
Files.writeString(path, "Hello World");
Files.write(path, lines);

// ストリームで大きなファイルを処理
try (Stream<String> stream = Files.lines(path)) {
    stream.filter(line -> line.contains("error"))
          .forEach(System.out::println);
}

// ファイル操作
Files.copy(source, target);
Files.move(source, target);
Files.delete(path);
Files.exists(path);
Files.isDirectory(path);

// ディレクトリ走査
try (Stream<Path> files = Files.walk(dir)) {
    files.filter(p -> p.toString().endsWith(".java"))
         .forEach(System.out::println);
}`,
      },
    ],
  },
  {
    id: "serialization",
    title: "シリアライゼーション",
    category: "io",
    icon: "ArrowRightLeft",
    description: "Javaオブジェクトのシリアライズとデシリアライズ、JSON変換",
    sections: [
      {
        title: "Javaシリアライゼーション",
        content: "オブジェクトをバイト列に変換して保存・転送し、復元する仕組みです。",
        code: `// Serializableの実装
public class User implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private transient String password; // シリアライズ除外

    public User(String name, String password) {
        this.name = name;
        this.password = password;
    }
}

// シリアライズ（書き込み）
try (var oos = new ObjectOutputStream(
        new FileOutputStream("user.ser"))) {
    oos.writeObject(new User("Alice", "secret"));
}

// デシリアライズ（読み込み）
try (var ois = new ObjectInputStream(
        new FileInputStream("user.ser"))) {
    User user = (User) ois.readObject();
}`,
      },
    ],
  },

  // === 応用 ===
  {
    id: "exceptions",
    title: "例外処理",
    category: "advanced",
    icon: "AlertTriangle",
    description: "try-catch-finally, カスタム例外, try-with-resources",
    sections: [
      {
        title: "例外処理の基本",
        content: "Javaの例外階層と、try-catch-finally による例外処理パターン。",
        code: `// 基本的な例外処理
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("計算エラー: " + e.getMessage());
} catch (Exception e) {
    System.out.println("エラー: " + e.getMessage());
} finally {
    System.out.println("必ず実行される");
}

// try-with-resources（Java 7+）
try (var reader = new BufferedReader(
        new FileReader("file.txt"))) {
    String line = reader.readLine();
} catch (IOException e) {
    e.printStackTrace();
}

// カスタム例外
public class BusinessException extends RuntimeException {
    private final String errorCode;

    public BusinessException(String errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public String getErrorCode() { return errorCode; }
}`,
      },
    ],
  },
  {
    id: "annotations",
    title: "アノテーション",
    category: "advanced",
    icon: "AtSign",
    description: "標準アノテーション、カスタムアノテーション、リフレクションでの利用",
    sections: [
      {
        title: "アノテーションの基本と活用",
        content: "メタデータをコードに付与する仕組み。コンパイル時や実行時に情報を提供します。",
        code: `// 標準アノテーション
@Override
public String toString() { ... }

@Deprecated(since = "9", forRemoval = true)
public void oldMethod() { ... }

@SuppressWarnings("unchecked")
public void genericMethod() { ... }

@FunctionalInterface
interface MyFunc { void apply(); }

// カスタムアノテーション
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface Cacheable {
    int ttl() default 300;
    String key() default "";
}

// 使用
@Cacheable(ttl = 600, key = "users")
public List<User> getUsers() { ... }

// リフレクションで取得
Method method = MyClass.class.getMethod("getUsers");
Cacheable cache = method.getAnnotation(Cacheable.class);
int ttl = cache.ttl(); // 600`,
      },
    ],
  },
  {
    id: "design-patterns",
    title: "デザインパターン",
    category: "advanced",
    icon: "Blocks",
    description: "Singleton, Factory, Observer, Builder, Strategy パターン",
    sections: [
      {
        title: "生成パターン",
        content: "オブジェクトの生成を柔軟にするパターン。",
        code: `// Singleton
public class Config {
    private static final Config INSTANCE = new Config();
    private Config() {}
    public static Config getInstance() { return INSTANCE; }
}

// Builder
public class User {
    private final String name;
    private final String email;
    private final int age;

    private User(Builder builder) {
        this.name = builder.name;
        this.email = builder.email;
        this.age = builder.age;
    }

    public static class Builder {
        private String name;
        private String email;
        private int age;

        public Builder name(String name) {
            this.name = name; return this;
        }
        public Builder email(String email) {
            this.email = email; return this;
        }
        public Builder age(int age) {
            this.age = age; return this;
        }
        public User build() {
            return new User(this);
        }
    }
}

User user = new User.Builder()
    .name("Alice")
    .email("alice@example.com")
    .age(30)
    .build();`,
      },
      {
        title: "振る舞いパターン",
        content: "オブジェクト間の責任分担や通信を定義するパターン。",
        code: `// Observer（イベント通知）
public interface EventListener {
    void onEvent(String event);
}

public class EventEmitter {
    private final List<EventListener> listeners
        = new ArrayList<>();

    public void addListener(EventListener l) {
        listeners.add(l);
    }

    public void emit(String event) {
        listeners.forEach(l -> l.onEvent(event));
    }
}

// Strategy（戦略の切り替え）
public interface Validator {
    boolean validate(String input);
}

public class FormProcessor {
    private Validator validator;

    public void setValidator(Validator v) {
        this.validator = v;
    }

    public void process(String input) {
        if (validator.validate(input)) {
            // 処理
        }
    }
}`,
      },
    ],
  },
];
