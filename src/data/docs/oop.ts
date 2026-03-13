import type { DocsChapter } from "../java-docs";

export const oopChapters: DocsChapter[] = [
  {
    id: "oop-concepts",
    title: "OOPの基本概念",
    category: "oop",
    description: "オブジェクト指向プログラミングの4つの柱: カプセル化、継承、ポリモーフィズム、抽象化",
    sections: [
      {
        title: "オブジェクト指向の基礎",
        content:
          "オブジェクト指向プログラミング（OOP）は、データ（状態）と処理（振る舞い）をオブジェクトとしてまとめるパラダイムです。カプセル化でデータを保護し、継承でコードを再利用し、ポリモーフィズムで柔軟な設計を実現します。",
        code: `// カプセル化: データとメソッドをまとめ、アクセスを制限
public class Employee {
    private String name;        // 外部から直接アクセス不可
    private double salary;

    public Employee(String name, double salary) {
        this.name = name;
        setSalary(salary);      // バリデーション付き
    }

    public String getName() { return name; }

    public double getSalary() { return salary; }

    public void setSalary(double salary) {
        if (salary < 0) throw new IllegalArgumentException("負の給与");
        this.salary = salary;
    }

    public void raiseSalary(double percent) {
        salary *= (1 + percent / 100);
    }
}

// 継承: 既存クラスを拡張
public class Manager extends Employee {
    private double bonus;

    public Manager(String name, double salary, double bonus) {
        super(name, salary);    // 親コンストラクタ
        this.bonus = bonus;
    }

    @Override
    public double getSalary() {
        return super.getSalary() + bonus;  // 振る舞いの変更
    }
}

// ポリモーフィズム: 親の型で子を扱う
Employee emp = new Manager("Alice", 80000, 10000);
emp.getSalary();  // 90000（Manager の実装が呼ばれる）`,
      },
    ],
  },
  {
    id: "inheritance",
    title: "継承",
    category: "oop",
    description: "extends, super, メソッドオーバーライド、継承の設計",
    sections: [
      {
        title: "クラスの継承",
        content:
          "extends キーワードでクラスを継承します。サブクラスは親クラスのフィールドとメソッドを引き継ぎます。super で親クラスのコンストラクタやメソッドを明示的に呼び出せます。Javaは単一継承のみ（1つの親クラス）をサポートします。",
        code: `// 親クラス
public class Animal {
    protected String name;

    public Animal(String name) {
        this.name = name;
    }

    public void speak() {
        System.out.println(name + " makes a sound");
    }

    public String getName() { return name; }
}

// 子クラス
public class Dog extends Animal {
    private String breed;

    public Dog(String name, String breed) {
        super(name);             // 親のコンストラクタ呼び出し（必須）
        this.breed = breed;
    }

    @Override                    // オーバーライド（振る舞いの変更）
    public void speak() {
        System.out.println(name + " barks!");
    }

    public void fetch() {        // 子クラス固有のメソッド
        System.out.println(name + " fetches the ball");
    }
}

// 使用
Animal animal = new Dog("Rex", "Labrador");
animal.speak();     // "Rex barks!"（ポリモーフィズム）
// animal.fetch();  // コンパイルエラー（Animal型にはfetchがない）

// 型チェックとキャスト
if (animal instanceof Dog dog) {  // パターンマッチング
    dog.fetch();    // OK
}`,
      },
      {
        title: "オーバーライドの規則",
        content:
          "メソッドのオーバーライドにはルールがあります。@Override アノテーションで意図を明示します。final メソッドはオーバーライド不可、final クラスは継承不可です。Object クラスの toString(), equals(), hashCode() は適切にオーバーライドすべきです。",
        code: `public class Shape {
    // final メソッド: オーバーライド不可
    public final String getType() {
        return this.getClass().getSimpleName();
    }

    // オーバーライド可能
    public double area() { return 0; }

    // toString のオーバーライド
    @Override
    public String toString() {
        return getType() + "(area=" + area() + ")";
    }
}

public class Circle extends Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }

    // @Override
    // public String getType() {}  // コンパイルエラー（final）
}

// オーバーライドの規則:
// 1. メソッドシグネチャ（名前+引数）が同一
// 2. 戻り値は同型または共変型（サブタイプ）
// 3. アクセス修飾子は同じか、より広い
// 4. チェック例外は同じか、より狭い
// 5. static メソッドはオーバーライドではなく隠蔽（hiding）

// final クラス: 継承不可
public final class ImmutablePoint {
    private final int x, y;
    public ImmutablePoint(int x, int y) { this.x = x; this.y = y; }
}`,
      },
    ],
  },
  {
    id: "abstract-classes",
    title: "抽象クラスとメソッド",
    category: "oop",
    description: "abstract 修飾子、テンプレートメソッドパターン",
    sections: [
      {
        title: "抽象クラスの設計",
        content:
          "abstract クラスはインスタンス化できず、サブクラスの共通基盤として使用します。abstract メソッドは本体を持たず、サブクラスで必ず実装する必要があります。具象メソッドとの組み合わせでテンプレートメソッドパターンを実現できます。",
        code: `// 抽象クラス
public abstract class Shape {
    private String color;

    public Shape(String color) {
        this.color = color;
    }

    // 抽象メソッド: サブクラスで必ず実装
    public abstract double area();
    public abstract double perimeter();

    // 具象メソッド: 共通の実装
    public String getColor() { return color; }

    // テンプレートメソッド: 処理の骨格を定義
    public void describe() {
        System.out.println(getClass().getSimpleName());
        System.out.println("  色: " + color);
        System.out.printf("  面積: %.2f%n", area());
        System.out.printf("  周囲: %.2f%n", perimeter());
    }
}

// 具象クラス
public class Circle extends Shape {
    private double radius;

    public Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    public double area() { return Math.PI * radius * radius; }

    @Override
    public double perimeter() { return 2 * Math.PI * radius; }
}

public class Rectangle extends Shape {
    private double width, height;

    public Rectangle(String color, double width, double height) {
        super(color);
        this.width = width;
        this.height = height;
    }

    @Override
    public double area() { return width * height; }

    @Override
    public double perimeter() { return 2 * (width + height); }
}

// 使用
Shape s = new Circle("Red", 5);
s.describe();  // テンプレートメソッドが呼ばれる`,
      },
    ],
  },
  {
    id: "interfaces",
    title: "インターフェース",
    category: "oop",
    description: "宣言、デフォルトメソッド、staticメソッド、多重実装",
    sections: [
      {
        title: "インターフェースの定義と実装",
        content:
          "インターフェースは実装を持たない抽象メソッドの集合で、型の契約を定義します。Java 8以降はデフォルトメソッド（default）とstaticメソッドも持てます。クラスは複数のインターフェースを実装（implements）できます。",
        code: `// インターフェースの定義
public interface Sortable<T> {
    // 抽象メソッド（暗黙的に public abstract）
    int compareTo(T other);

    // デフォルトメソッド（Java 8+）
    default boolean isGreaterThan(T other) {
        return compareTo(other) > 0;
    }

    default boolean isLessThan(T other) {
        return compareTo(other) < 0;
    }

    // static メソッド
    static <T extends Sortable<T>> T max(T a, T b) {
        return a.compareTo(b) >= 0 ? a : b;
    }
}

// インターフェースの実装
public class Product implements Sortable<Product>, Serializable {
    private String name;
    private double price;

    public Product(String name, double price) {
        this.name = name;
        this.price = price;
    }

    @Override
    public int compareTo(Product other) {
        return Double.compare(this.price, other.price);
    }
}

// 多重実装
interface Printable { void print(); }
interface Loggable { void log(); }

class Report implements Printable, Loggable {
    @Override public void print() { System.out.println("Printing..."); }
    @Override public void log() { System.out.println("Logging..."); }
}

// sealed interface (Java 17+)
sealed interface Shape permits Circle, Rectangle, Triangle {}`,
      },
    ],
  },
  {
    id: "polymorphism",
    title: "ポリモーフィズム",
    category: "oop",
    description: "動的ディスパッチ、型キャスト、instanceof",
    sections: [
      {
        title: "多態性の活用",
        content:
          "ポリモーフィズムにより、親クラスやインターフェースの型で異なるサブクラスのオブジェクトを統一的に扱えます。メソッド呼び出しは実行時のオブジェクトの実際の型に基づいて解決されます（動的ディスパッチ）。",
        code: `// インターフェースによるポリモーフィズム
interface Drawable {
    void draw();
    default String description() {
        return getClass().getSimpleName();
    }
}

class CircleShape implements Drawable {
    @Override public void draw() {
        System.out.println("○ を描画");
    }
}

class SquareShape implements Drawable {
    @Override public void draw() {
        System.out.println("□ を描画");
    }
}

class TriangleShape implements Drawable {
    @Override public void draw() {
        System.out.println("△ を描画");
    }
}

// 統一的に扱う
List<Drawable> shapes = List.of(
    new CircleShape(), new SquareShape(), new TriangleShape()
);
for (Drawable shape : shapes) {
    shape.draw();  // 実際の型のメソッドが呼ばれる
}

// パターンマッチングによる型判定（Java 21+）
void process(Object obj) {
    switch (obj) {
        case String s  -> System.out.println("文字列: " + s);
        case Integer i -> System.out.println("整数: " + i);
        case int[] arr -> System.out.println("配列: " + Arrays.toString(arr));
        case null      -> System.out.println("null");
        default        -> System.out.println("不明: " + obj);
    }
}`,
      },
    ],
  },
];
