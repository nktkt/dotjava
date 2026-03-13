import type { DocsChapter } from "../java-docs";

export const classesObjectsChapters: DocsChapter[] = [
  {
    id: "creating-classes",
    title: "クラスの作成",
    category: "classes-objects",
    description: "クラス宣言、フィールド、アクセス修飾子、static メンバー",
    sections: [
      {
        title: "クラス宣言とフィールド",
        content:
          "クラスはオブジェクトの設計図です。フィールド（状態）とメソッド（振る舞い）で構成されます。アクセス修飾子（public, protected, private, パッケージプライベート）でアクセス範囲を制御します。",
        code: `public class BankAccount {
    // フィールド（インスタンス変数）
    private String owner;
    private double balance;
    private final String accountId;    // final: 変更不可

    // クラス変数（static）- 全インスタンスで共有
    private static int nextId = 1;
    public static final double INTEREST_RATE = 0.05;

    // コンストラクタ
    public BankAccount(String owner, double initialBalance) {
        this.owner = owner;
        this.balance = initialBalance;
        this.accountId = "ACC-" + nextId++;
    }

    // ゲッター
    public String getOwner() { return owner; }
    public double getBalance() { return balance; }
    public String getAccountId() { return accountId; }

    // メソッド
    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    public boolean withdraw(double amount) {
        if (amount > 0 && balance >= amount) {
            balance -= amount;
            return true;
        }
        return false;
    }
}

// アクセス修飾子
// public:    どこからでもアクセス可能
// protected: 同パッケージ + サブクラス
// (なし):    同パッケージのみ（パッケージプライベート）
// private:   同クラス内のみ`,
      },
    ],
  },
  {
    id: "methods",
    title: "メソッドの定義",
    category: "classes-objects",
    description: "メソッド宣言、オーバーロード、可変長引数、static メソッド",
    sections: [
      {
        title: "メソッドの宣言と呼び出し",
        content:
          "メソッドは戻り値の型、名前、パラメータリスト、メソッド本体で構成されます。オーバーロードにより同名で引数が異なるメソッドを定義できます。可変長引数（varargs）で任意個数の引数を受け取れます。",
        code: `public class Calculator {
    // 基本的なメソッド
    public int add(int a, int b) {
        return a + b;
    }

    // メソッドオーバーロード（同名・異なる引数）
    public double add(double a, double b) {
        return a + b;
    }

    public int add(int a, int b, int c) {
        return a + b + c;
    }

    // 可変長引数（varargs）
    public int sum(int... numbers) {
        int total = 0;
        for (int n : numbers) total += n;
        return total;
    }

    // static メソッド（インスタンス不要で呼び出し可能）
    public static int multiply(int a, int b) {
        return a * b;
    }

    // 戻り値なし（void）
    public void printResult(String label, int value) {
        System.out.println(label + ": " + value);
    }
}

// 使用例
Calculator calc = new Calculator();
calc.add(1, 2);           // 3
calc.add(1.5, 2.5);       // 4.0
calc.sum(1, 2, 3, 4, 5);  // 15
Calculator.multiply(3, 4); // 12（staticはクラス名で呼び出し）`,
      },
    ],
  },
  {
    id: "constructors",
    title: "コンストラクタ",
    category: "classes-objects",
    description: "デフォルト、引数付き、this()、コンストラクタチェーン",
    sections: [
      {
        title: "コンストラクタの種類と連鎖",
        content:
          "コンストラクタはオブジェクト生成時に呼ばれる特殊なメソッドです。戻り値の型を持たず、クラス名と同じ名前です。this() で同クラスの別コンストラクタを呼び出せます（コンストラクタチェーン）。",
        code: `public class User {
    private String name;
    private String email;
    private int age;

    // 全引数コンストラクタ
    public User(String name, String email, int age) {
        this.name = name;
        this.email = email;
        this.age = age;
    }

    // コンストラクタチェーン（this() で他のコンストラクタを呼ぶ）
    public User(String name, String email) {
        this(name, email, 0);       // 3引数コンストラクタを呼ぶ
    }

    public User(String name) {
        this(name, "unknown@example.com");
    }

    // デフォルトコンストラクタ風
    public User() {
        this("Anonymous");
    }

    // コピーコンストラクタ
    public User(User other) {
        this(other.name, other.email, other.age);
    }
}

// 使い分け
User u1 = new User("Alice", "alice@ex.com", 25);
User u2 = new User("Bob", "bob@ex.com");
User u3 = new User("Charlie");
User u4 = new User();
User u5 = new User(u1);           // u1のコピー`,
      },
    ],
  },
  {
    id: "nested-classes",
    title: "ネストしたクラス",
    category: "classes-objects",
    description: "static ネストクラス、内部クラス、ローカルクラス、匿名クラス",
    sections: [
      {
        title: "ネストクラスの種類",
        content:
          "Javaでは他のクラスの内部にクラスを定義できます。static ネストクラスは外部クラスのインスタンスを必要としません。内部クラス（non-static）は外部クラスのインスタンスメンバーにアクセスできます。ローカルクラスと匿名クラスは限定されたスコープで使用されます。",
        code: `public class Outer {
    private int x = 10;

    // static ネストクラス（外部インスタンス不要）
    static class StaticNested {
        void display() {
            System.out.println("Static nested class");
            // x にはアクセス不可（staticのため）
        }
    }

    // 内部クラス（外部インスタンスが必要）
    class Inner {
        void display() {
            System.out.println("Inner class: x = " + x); // xにアクセス可
        }
    }

    void method() {
        // ローカルクラス（メソッド内で定義）
        class Local {
            void display() {
                System.out.println("Local class: x = " + x);
            }
        }
        new Local().display();

        // 匿名クラス（名前なし、1回限りの実装）
        Runnable task = new Runnable() {
            @Override
            public void run() {
                System.out.println("Anonymous class");
            }
        };
        task.run();

        // ラムダ式で置き換え可能（関数型インターフェースの場合）
        Runnable task2 = () -> System.out.println("Lambda");
    }
}

// 使用例
Outer.StaticNested sn = new Outer.StaticNested();
Outer outer = new Outer();
Outer.Inner inner = outer.new Inner();`,
      },
    ],
  },
  {
    id: "enums",
    title: "列挙型 (enum)",
    category: "classes-objects",
    description: "enum の宣言、メソッド、フィールド、コンストラクタ",
    sections: [
      {
        title: "enumの定義と活用",
        content:
          "enum は固定された定数の集合を表す特殊なクラスです。フィールド、メソッド、コンストラクタを持つことができ、型安全な定数を定義します。すべてのenumはjava.lang.Enumを暗黙的に継承します。",
        code: `// 基本的な enum
enum Direction {
    NORTH, SOUTH, EAST, WEST
}

// フィールドとメソッドを持つ enum
enum Planet {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS(4.869e+24, 6.0518e6),
    EARTH(5.976e+24, 6.37814e6),
    MARS(6.421e+23, 3.3972e6);

    private final double mass;
    private final double radius;

    // コンストラクタ（暗黙的に private）
    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }

    // メソッド
    double surfaceGravity() {
        final double G = 6.67300E-11;
        return G * mass / (radius * radius);
    }

    double surfaceWeight(double otherMass) {
        return otherMass * surfaceGravity();
    }
}

// 使用例
Direction d = Direction.NORTH;
Planet earth = Planet.EARTH;

// 組み込みメソッド
Direction[] all = Direction.values();        // 全値の配列
Direction n = Direction.valueOf("NORTH");    // 名前から取得
d.name();                                   // "NORTH"
d.ordinal();                                // 0（宣言順）

// switch との組み合わせ
String msg = switch (d) {
    case NORTH -> "上";
    case SOUTH -> "下";
    case EAST  -> "右";
    case WEST  -> "左";
};`,
      },
    ],
  },
  {
    id: "records",
    title: "レコード (Java 16+)",
    category: "classes-objects",
    description: "不変データを簡潔に定義するレコードクラス",
    sections: [
      {
        title: "レコードの基本と活用",
        content:
          "record は不変のデータキャリアを簡潔に定義するための特殊なクラスです。コンストラクタ、getter、equals()、hashCode()、toString() が自動生成されます。コンパクトコンストラクタでバリデーションを追加できます。",
        code: `// 基本的なレコード
record Point(int x, int y) {}

// 使用例
Point p = new Point(3, 4);
p.x();                          // 3（getterは自動生成）
p.y();                          // 4
p.toString();                   // "Point[x=3, y=4]"
p.equals(new Point(3, 4));      // true（値で比較）

// コンパクトコンストラクタ（バリデーション）
record Range(int min, int max) {
    Range {    // コンパクトコンストラクタ（引数なし）
        if (min > max) {
            throw new IllegalArgumentException(
                "min(%d) > max(%d)".formatted(min, max));
        }
    }
}

// メソッドの追加
record Person(String name, int age) {
    // 追加メソッド
    String greeting() {
        return "Hello, I'm %s (%d)".formatted(name, age);
    }

    // static メソッド
    static Person of(String name) {
        return new Person(name, 0);
    }
}

// レコードの制約
// - フィールドは暗黙的に final（不変）
// - 他のクラスを継承できない（暗黙的に Record を継承）
// - インターフェースは実装可能
record NamedPoint(String name, int x, int y) implements Serializable {}

// ジェネリクスも使用可能
record Pair<A, B>(A first, B second) {}
var pair = new Pair<>("Java", 21);`,
      },
    ],
  },
];
