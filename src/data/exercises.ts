export interface ExercisesSection {
  title: string;
  content: string;
  code?: string;
}

export interface ExercisesChapter {
  id: string;
  title: string;
  description: string;
  category: string;
  sections: ExercisesSection[];
}

export interface ExercisesCategory {
  id: string;
  name: string;
  color: string;
}

export const exercisesCategories: ExercisesCategory[] = [
  { id: "basics", name: "基礎文法", color: "#2563EB" },
  { id: "oop", name: "オブジェクト指向", color: "#059669" },
  { id: "collections", name: "コレクション・Stream", color: "#D97706" },
  { id: "practical", name: "実践課題", color: "#DC2626" },
];

export const exercisesChapters: ExercisesChapter[] = [
  // ===== 基礎文法 =====
  {
    id: "variables-types",
    title: "変数と型の演習",
    description: "プリミティブ型の変換、文字列操作、配列操作、var の使い方を実践する",
    category: "basics",
    sections: [
      {
        title: "プリミティブ型の変換",
        content:
          "さまざまなプリミティブ型の変数を宣言し、型変換（キャスト）を行うプログラムを作成してください。暗黙的な拡大変換と明示的な縮小変換の違いを確認しましょう。",
        code: `public class TypeConversion {
    public static void main(String[] args) {
        // 演習1: int → long → double の拡大変換（暗黙的）
        int intVal = 42;
        long longVal = intVal;        // int → long（自動変換）
        double doubleVal = longVal;   // long → double（自動変換）
        System.out.println("int: " + intVal);
        System.out.println("long: " + longVal);
        System.out.println("double: " + doubleVal);

        // 演習2: double → int の縮小変換（明示的キャスト必須）
        double pi = 3.14159;
        int truncated = (int) pi;  // 小数部が切り捨てられる
        System.out.println("double: " + pi + " → int: " + truncated);

        // 演習3: char と int の相互変換
        char ch = 'A';
        int ascii = ch;            // char → int（自動変換）
        char back = (char) (ascii + 32);  // int → char（明示的）
        System.out.println(ch + " の ASCII: " + ascii);
        System.out.println("小文字: " + back);

        // 演習4: オーバーフローの確認
        int maxInt = Integer.MAX_VALUE;
        System.out.println("MAX_VALUE: " + maxInt);
        System.out.println("MAX_VALUE + 1: " + (maxInt + 1));  // オーバーフロー！

        // 演習5: 安全な変換（Math.toIntExact）
        long safeLong = 100L;
        int safeInt = Math.toIntExact(safeLong);
        System.out.println("安全な変換: " + safeInt);
    }
}`,
      },
      {
        title: "文字列操作",
        content:
          "String クラスの主要メソッドを使って、文字列の検索・置換・分割・結合を行うプログラムを作成してください。StringBuilder との使い分けも練習しましょう。",
        code: `public class StringExercise {
    public static void main(String[] args) {
        // 演習1: 基本的な文字列操作
        String message = "  Hello, Java World!  ";
        System.out.println("長さ: " + message.length());
        System.out.println("トリム: [" + message.trim() + "]");
        System.out.println("大文字: " + message.trim().toUpperCase());
        System.out.println("部分文字列: " + message.trim().substring(7, 11));

        // 演習2: 文字列の検索
        String text = "Java is a programming language. Java is versatile.";
        System.out.println("含む: " + text.contains("programming"));
        System.out.println("最初の位置: " + text.indexOf("Java"));
        System.out.println("最後の位置: " + text.lastIndexOf("Java"));
        System.out.println("開始判定: " + text.startsWith("Java"));

        // 演習3: 文字列の分割と結合
        String csv = "Alice,Bob,Charlie,Diana";
        String[] names = csv.split(",");
        for (String name : names) {
            System.out.println("名前: " + name);
        }
        String joined = String.join(" | ", names);
        System.out.println("結合: " + joined);

        // 演習4: StringBuilder で効率的に文字列構築
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= 5; i++) {
            sb.append("Item").append(i);
            if (i < 5) sb.append(", ");
        }
        System.out.println(sb.toString());

        // 演習5: 文字列のフォーマット
        String name = "太郎";
        int age = 25;
        double score = 87.5;
        String formatted = String.format("%sさん（%d歳）のスコア: %.1f点", name, age, score);
        System.out.println(formatted);
    }
}`,
      },
      {
        title: "配列操作",
        content:
          "配列の宣言・初期化・操作を行うプログラムを作成してください。1次元配列と2次元配列の両方を扱い、Arrays ユーティリティクラスも活用しましょう。",
        code: `import java.util.Arrays;

public class ArrayExercise {
    public static void main(String[] args) {
        // 演習1: 配列の宣言と初期化
        int[] numbers = {5, 3, 8, 1, 9, 2, 7};
        System.out.println("元の配列: " + Arrays.toString(numbers));

        // 演習2: 配列のソートと検索
        int[] sorted = Arrays.copyOf(numbers, numbers.length);
        Arrays.sort(sorted);
        System.out.println("ソート済: " + Arrays.toString(sorted));
        int idx = Arrays.binarySearch(sorted, 7);
        System.out.println("7 の位置: " + idx);

        // 演習3: 配列の最大値・最小値・合計を求める
        int max = Integer.MIN_VALUE;
        int min = Integer.MAX_VALUE;
        int sum = 0;
        for (int n : numbers) {
            if (n > max) max = n;
            if (n < min) min = n;
            sum += n;
        }
        System.out.println("最大: " + max + ", 最小: " + min + ", 合計: " + sum);

        // 演習4: 2次元配列（行列の表示）
        int[][] matrix = {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        for (int[] row : matrix) {
            System.out.println(Arrays.toString(row));
        }

        // 演習5: 配列の逆転
        int[] reversed = new int[numbers.length];
        for (int i = 0; i < numbers.length; i++) {
            reversed[numbers.length - 1 - i] = numbers[i];
        }
        System.out.println("逆転: " + Arrays.toString(reversed));
    }
}`,
      },
      {
        title: "var（ローカル変数型推論）の使い方",
        content:
          "Java 10 以降で使えるローカル変数型推論 var を使ったプログラムを作成してください。var が使える場面・使えない場面を理解しましょう。",
        code: `import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class VarExercise {
    public static void main(String[] args) {
        // 演習1: 基本的な var の利用
        var name = "Java";        // String と推論される
        var version = 21;         // int と推論される
        var pi = 3.14;            // double と推論される
        var flag = true;          // boolean と推論される
        System.out.println(name + " " + version + " " + pi + " " + flag);

        // 演習2: コレクションで var を使う
        var list = new ArrayList<String>();
        list.add("Apple");
        list.add("Banana");
        list.add("Cherry");
        System.out.println("リスト: " + list);

        var map = new HashMap<String, Integer>();
        map.put("国語", 85);
        map.put("数学", 92);
        map.put("英語", 78);
        System.out.println("マップ: " + map);

        // 演習3: 拡張forループで var を使う
        for (var fruit : list) {
            System.out.println("果物: " + fruit);
        }
        for (var entry : map.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }

        // 演習4: var が使えない場面（コメントで確認）
        // var x;              // 初期化なしは不可
        // var nothing = null; // null の型は推論不可
        // var nums = {1,2,3}; // 配列の初期化子では不可

        // var が使える場面のベストプラクティス
        var scores = List.of(90, 85, 78, 92, 88);  // 右辺で型が明らか
        var average = scores.stream()
                .mapToInt(Integer::intValue)
                .average()
                .orElse(0.0);
        System.out.println("平均点: " + average);
    }
}`,
      },
    ],
  },
  {
    id: "control-flow",
    title: "制御構文の演習",
    description: "if-else/switch式、ループ処理、再帰、例外処理を実践する",
    category: "basics",
    sections: [
      {
        title: "if-else と switch 式",
        content:
          "条件分岐を使った成績判定プログラムを作成してください。従来の if-else に加え、Java 14 以降の switch 式も活用しましょう。",
        code: `public class BranchExercise {
    // 演習1: if-else による成績判定
    public static String gradeByIfElse(int score) {
        if (score < 0 || score > 100) {
            throw new IllegalArgumentException("スコアは0〜100の範囲: " + score);
        }
        if (score >= 90) {
            return "A（優秀）";
        } else if (score >= 80) {
            return "B（良好）";
        } else if (score >= 70) {
            return "C（普通）";
        } else if (score >= 60) {
            return "D（可）";
        } else {
            return "F（不可）";
        }
    }

    // 演習2: switch 式による季節判定（Java 14+）
    public static String season(int month) {
        return switch (month) {
            case 3, 4, 5   -> "春";
            case 6, 7, 8   -> "夏";
            case 9, 10, 11 -> "秋";
            case 12, 1, 2  -> "冬";
            default -> throw new IllegalArgumentException("無効な月: " + month);
        };
    }

    // 演習3: switch 式でパターンマッチング（Java 21+）
    public static String describeObject(Object obj) {
        return switch (obj) {
            case Integer i when i > 0  -> "正の整数: " + i;
            case Integer i             -> "整数: " + i;
            case String s when s.isEmpty() -> "空文字列";
            case String s              -> "文字列: " + s;
            case null                  -> "null";
            default                    -> "その他: " + obj.getClass().getSimpleName();
        };
    }

    public static void main(String[] args) {
        int[] scores = {95, 82, 73, 65, 40};
        for (int s : scores) {
            System.out.println(s + "点 → " + gradeByIfElse(s));
        }
        for (int m = 1; m <= 12; m++) {
            System.out.println(m + "月 → " + season(m));
        }
        System.out.println(describeObject(42));
        System.out.println(describeObject("Hello"));
        System.out.println(describeObject(null));
    }
}`,
      },
      {
        title: "ループ処理",
        content:
          "for / while / do-while ループを使い、FizzBuzz や九九の表などの定番問題を解いてください。",
        code: `public class LoopExercise {
    public static void main(String[] args) {
        // 演習1: FizzBuzz（1〜30）
        System.out.println("=== FizzBuzz ===");
        for (int i = 1; i <= 30; i++) {
            if (i % 15 == 0) {
                System.out.print("FizzBuzz ");
            } else if (i % 3 == 0) {
                System.out.print("Fizz ");
            } else if (i % 5 == 0) {
                System.out.print("Buzz ");
            } else {
                System.out.print(i + " ");
            }
        }
        System.out.println();

        // 演習2: 九九の表
        System.out.println("=== 九九の表 ===");
        for (int i = 1; i <= 9; i++) {
            for (int j = 1; j <= 9; j++) {
                System.out.printf("%3d", i * j);
            }
            System.out.println();
        }

        // 演習3: while で素数判定
        System.out.println("=== 100以下の素数 ===");
        for (int n = 2; n <= 100; n++) {
            if (isPrime(n)) {
                System.out.print(n + " ");
            }
        }
        System.out.println();

        // 演習4: do-while でユーザ入力シミュレーション
        System.out.println("=== コラッツ数列 (27から開始) ===");
        int num = 27;
        int steps = 0;
        do {
            System.out.print(num + " → ");
            if (num % 2 == 0) {
                num = num / 2;
            } else {
                num = num * 3 + 1;
            }
            steps++;
        } while (num != 1);
        System.out.println("1 (" + steps + "ステップ)");
    }

    static boolean isPrime(int n) {
        if (n < 2) return false;
        int i = 2;
        while (i * i <= n) {
            if (n % i == 0) return false;
            i++;
        }
        return true;
    }
}`,
      },
      {
        title: "再帰",
        content:
          "再帰関数を使って階乗・フィボナッチ数列・ハノイの塔を実装してください。メモ化による最適化も試しましょう。",
        code: `import java.util.HashMap;
import java.util.Map;

public class RecursionExercise {
    // 演習1: 階乗 (n!)
    public static long factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }

    // 演習2: フィボナッチ（単純再帰 → 遅い）
    public static long fibSlow(int n) {
        if (n <= 1) return n;
        return fibSlow(n - 1) + fibSlow(n - 2);
    }

    // 演習3: フィボナッチ（メモ化 → 高速）
    private static Map<Integer, Long> memo = new HashMap<>();
    public static long fibFast(int n) {
        if (n <= 1) return n;
        if (memo.containsKey(n)) return memo.get(n);
        long result = fibFast(n - 1) + fibFast(n - 2);
        memo.put(n, result);
        return result;
    }

    // 演習4: ハノイの塔
    public static void hanoi(int n, char from, char to, char via) {
        if (n == 1) {
            System.out.println("円盤1: " + from + " → " + to);
            return;
        }
        hanoi(n - 1, from, via, to);
        System.out.println("円盤" + n + ": " + from + " → " + to);
        hanoi(n - 1, via, to, from);
    }

    public static void main(String[] args) {
        // 階乗
        for (int i = 0; i <= 10; i++) {
            System.out.println(i + "! = " + factorial(i));
        }

        // フィボナッチ
        System.out.println("=== フィボナッチ（メモ化） ===");
        for (int i = 0; i <= 20; i++) {
            System.out.print(fibFast(i) + " ");
        }
        System.out.println();

        // ハノイの塔（3枚）
        System.out.println("=== ハノイの塔（3枚） ===");
        hanoi(3, 'A', 'C', 'B');
    }
}`,
      },
      {
        title: "例外処理",
        content:
          "try-catch-finally やカスタム例外を使ったプログラムを作成してください。例外の階層構造と適切なエラーハンドリングを理解しましょう。",
        code: `// 演習1: カスタム例外クラスの定義
class InsufficientFundsException extends Exception {
    private final int amount;
    public InsufficientFundsException(int amount) {
        super("残高不足: " + amount + "円が不足しています");
        this.amount = amount;
    }
    public int getAmount() { return amount; }
}

// 演習2: 例外を活用するクラス
class BankAccount {
    private String owner;
    private int balance;

    public BankAccount(String owner, int balance) {
        this.owner = owner;
        this.balance = balance;
    }

    public void deposit(int amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("入金額は正の値: " + amount);
        }
        balance += amount;
        System.out.println(amount + "円を入金。残高: " + balance + "円");
    }

    public void withdraw(int amount) throws InsufficientFundsException {
        if (amount <= 0) {
            throw new IllegalArgumentException("出金額は正の値: " + amount);
        }
        if (amount > balance) {
            throw new InsufficientFundsException(amount - balance);
        }
        balance -= amount;
        System.out.println(amount + "円を出金。残高: " + balance + "円");
    }

    public int getBalance() { return balance; }
}

public class ExceptionExercise {
    public static void main(String[] args) {
        var account = new BankAccount("太郎", 10000);

        // 演習3: try-catch-finally
        try {
            account.deposit(5000);
            account.withdraw(8000);
            account.withdraw(10000);  // InsufficientFundsException
        } catch (InsufficientFundsException e) {
            System.out.println("エラー: " + e.getMessage());
        } finally {
            System.out.println("最終残高: " + account.getBalance() + "円");
        }

        // 演習4: 複数の例外をキャッチ
        String[] inputs = {"42", "abc", null};
        for (String input : inputs) {
            try {
                int value = Integer.parseInt(input);
                System.out.println("変換成功: " + value);
            } catch (NumberFormatException e) {
                System.out.println("数値に変換不可: " + input);
            } catch (NullPointerException e) {
                System.out.println("入力が null です");
            }
        }

        // 演習5: try-with-resources（AutoCloseable）
        try (var resource = new AutoCloseable() {
            { System.out.println("リソース取得"); }
            @Override
            public void close() { System.out.println("リソース解放"); }
        }) {
            System.out.println("リソース使用中");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}`,
      },
    ],
  },
  {
    id: "class-design",
    title: "クラス設計演習",
    description: "クラスの定義、カプセル化、継承とオーバーライド、抽象クラスとインターフェースを実践する",
    category: "oop",
    sections: [
      {
        title: "クラスの定義（フィールド/コンストラクタ/メソッド）",
        content:
          "商品（Product）クラスを設計してください。フィールド、コンストラクタ、メソッドの基本的な定義方法を練習します。",
        code: `public class Product {
    // フィールド
    private String name;
    private int price;
    private int stock;

    // コンストラクタ（全フィールド）
    public Product(String name, int price, int stock) {
        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    // オーバーロードしたコンストラクタ（在庫デフォルト0）
    public Product(String name, int price) {
        this(name, price, 0);
    }

    // メソッド: 税込価格の計算
    public int getPriceWithTax(double taxRate) {
        return (int) (price * (1 + taxRate));
    }

    // メソッド: 在庫追加
    public void addStock(int quantity) {
        if (quantity <= 0) {
            throw new IllegalArgumentException("追加数は正の値: " + quantity);
        }
        this.stock += quantity;
    }

    // メソッド: 在庫から出荷
    public boolean ship(int quantity) {
        if (quantity > stock) {
            System.out.println("在庫不足: " + name);
            return false;
        }
        stock -= quantity;
        return true;
    }

    // toString
    @Override
    public String toString() {
        return String.format("Product{name='%s', price=%d円, stock=%d}", name, price, stock);
    }

    // equals と hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Product p)) return false;
        return price == p.price && name.equals(p.name);
    }

    @Override
    public int hashCode() {
        return java.util.Objects.hash(name, price);
    }

    public static void main(String[] args) {
        var laptop = new Product("ノートPC", 120000, 10);
        var mouse = new Product("マウス", 3000);
        mouse.addStock(50);

        System.out.println(laptop);
        System.out.println("税込: " + laptop.getPriceWithTax(0.10) + "円");
        laptop.ship(3);
        System.out.println("出荷後: " + laptop);
        System.out.println(mouse);
    }
}`,
      },
      {
        title: "カプセル化",
        content:
          "銀行口座クラスを設計し、カプセル化の原則を適用してください。フィールドを private にし、バリデーション付きの setter/getter を実装します。",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class SavingsAccount {
    private final String accountNumber;
    private String holderName;
    private int balance;
    private final List<String> history;

    public SavingsAccount(String accountNumber, String holderName) {
        this.accountNumber = accountNumber;
        this.holderName = holderName;
        this.balance = 0;
        this.history = new ArrayList<>();
        addHistory("口座開設");
    }

    // getter: 口座番号は変更不可
    public String getAccountNumber() { return accountNumber; }

    // getter/setter: 名義人は変更可能だがバリデーション付き
    public String getHolderName() { return holderName; }
    public void setHolderName(String name) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("名義人は空にできません");
        }
        this.holderName = name;
    }

    // getter: 残高は読み取り専用
    public int getBalance() { return balance; }

    // ビジネスロジックをメソッドに集約
    public void deposit(int amount) {
        validatePositive(amount);
        balance += amount;
        addHistory("入金: " + amount + "円");
    }

    public void withdraw(int amount) {
        validatePositive(amount);
        if (amount > balance) {
            throw new IllegalStateException("残高不足（残高: " + balance + "円）");
        }
        balance -= amount;
        addHistory("出金: " + amount + "円");
    }

    // 履歴は防御的コピーで返す
    public List<String> getHistory() {
        return Collections.unmodifiableList(history);
    }

    private void addHistory(String entry) {
        history.add(entry + "（残高: " + balance + "円）");
    }

    private void validatePositive(int amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("金額は正の値: " + amount);
        }
    }

    public static void main(String[] args) {
        var account = new SavingsAccount("001-1234567", "山田太郎");
        account.deposit(100000);
        account.withdraw(30000);
        account.deposit(5000);

        System.out.println("口座: " + account.getAccountNumber());
        System.out.println("名義: " + account.getHolderName());
        System.out.println("残高: " + account.getBalance() + "円");
        System.out.println("--- 履歴 ---");
        account.getHistory().forEach(System.out::println);
    }
}`,
      },
      {
        title: "継承とオーバーライド",
        content:
          "図形の階層構造を継承で設計してください。親クラス Shape を定義し、Circle と Rectangle が継承してメソッドをオーバーライドします。",
        code: `// 親クラス
class Shape {
    protected String name;

    public Shape(String name) {
        this.name = name;
    }

    public double area() {
        return 0;
    }

    public double perimeter() {
        return 0;
    }

    @Override
    public String toString() {
        return String.format("%s [面積=%.2f, 周長=%.2f]", name, area(), perimeter());
    }
}

// 子クラス: 円
class Circle extends Shape {
    private double radius;

    public Circle(double radius) {
        super("円");
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
}

// 子クラス: 長方形
class Rectangle extends Shape {
    private double width;
    private double height;

    public Rectangle(double width, double height) {
        super("長方形");
        this.width = width;
        this.height = height;
    }

    @Override
    public double area() {
        return width * height;
    }

    @Override
    public double perimeter() {
        return 2 * (width + height);
    }
}

// 子クラス: 正方形（長方形を継承）
class Square extends Rectangle {
    public Square(double side) {
        super(side, side);
    }

    @Override
    public String toString() {
        return "正方形" + super.toString().substring(super.toString().indexOf(" "));
    }
}

public class InheritanceExercise {
    public static void main(String[] args) {
        Shape[] shapes = {
            new Circle(5),
            new Rectangle(4, 6),
            new Square(3)
        };

        for (Shape s : shapes) {
            System.out.println(s);
        }

        // ポリモーフィズム: 面積の合計
        double totalArea = 0;
        for (Shape s : shapes) {
            totalArea += s.area();
        }
        System.out.printf("全図形の面積合計: %.2f%n", totalArea);
    }
}`,
      },
      {
        title: "抽象クラスとインターフェース",
        content:
          "動物の鳴き声と動作をモデル化するために、抽象クラスとインターフェースを組み合わせて設計してください。",
        code: `// インターフェース: 泳げる
interface Swimmable {
    void swim();
    default String swimStyle() { return "犬かき"; }
}

// インターフェース: 飛べる
interface Flyable {
    void fly();
    int maxAltitude();
}

// 抽象クラス: 動物
abstract class Animal {
    protected String name;
    protected int age;

    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // 抽象メソッド（子クラスで必ず実装）
    public abstract String sound();

    // 具象メソッド（共通の処理）
    public String introduce() {
        return name + "（" + age + "歳）: " + sound();
    }
}

// 犬: 泳げる動物
class Dog extends Animal implements Swimmable {
    public Dog(String name, int age) { super(name, age); }

    @Override
    public String sound() { return "ワンワン！"; }

    @Override
    public void swim() { System.out.println(name + "が泳いでいます（" + swimStyle() + "）"); }
}

// カモ: 泳げて飛べる動物
class Duck extends Animal implements Swimmable, Flyable {
    public Duck(String name, int age) { super(name, age); }

    @Override
    public String sound() { return "ガーガー！"; }

    @Override
    public void swim() { System.out.println(name + "が水面を泳いでいます"); }

    @Override
    public String swimStyle() { return "水かき泳ぎ"; }

    @Override
    public void fly() { System.out.println(name + "が飛んでいます"); }

    @Override
    public int maxAltitude() { return 6000; }
}

// 猫: 泳げない・飛べない
class Cat extends Animal {
    public Cat(String name, int age) { super(name, age); }

    @Override
    public String sound() { return "ニャー！"; }
}

public class AbstractInterfaceExercise {
    public static void main(String[] args) {
        Animal[] animals = { new Dog("ポチ", 3), new Cat("タマ", 5), new Duck("ドナルド", 2) };

        // 全動物の自己紹介
        for (Animal a : animals) {
            System.out.println(a.introduce());
        }

        // 泳げる動物だけ泳がせる
        System.out.println("--- 泳げる動物 ---");
        for (Animal a : animals) {
            if (a instanceof Swimmable s) {
                s.swim();
            }
        }

        // 飛べる動物だけ飛ばせる
        System.out.println("--- 飛べる動物 ---");
        for (Animal a : animals) {
            if (a instanceof Flyable f) {
                f.fly();
                System.out.println("最大高度: " + f.maxAltitude() + "m");
            }
        }
    }
}`,
      },
    ],
  },
  // ===== オブジェクト指向 =====
  {
    id: "polymorphism",
    title: "ポリモーフィズム演習",
    description: "インターフェース実装、ジェネリクス、Enum活用、Record/Sealed classを実践する",
    category: "oop",
    sections: [
      {
        title: "インターフェース実装",
        content:
          "支払い処理をインターフェースで抽象化し、複数の支払い方法（クレジットカード、電子マネー、銀行振込）を実装してください。",
        code: `// 支払いインターフェース
interface Payment {
    boolean pay(int amount);
    String getMethodName();

    // デフォルトメソッド: 領収書の発行
    default String receipt(int amount) {
        return String.format("[%s] %,d円 の支払い完了", getMethodName(), amount);
    }
}

// クレジットカード支払い
class CreditCardPayment implements Payment {
    private String cardNumber;
    private int limit;
    private int used;

    public CreditCardPayment(String cardNumber, int limit) {
        this.cardNumber = cardNumber;
        this.limit = limit;
        this.used = 0;
    }

    @Override
    public boolean pay(int amount) {
        if (used + amount > limit) {
            System.out.println("利用限度額を超えています");
            return false;
        }
        used += amount;
        return true;
    }

    @Override
    public String getMethodName() {
        return "クレジットカード(" + cardNumber.substring(cardNumber.length() - 4) + ")";
    }
}

// 電子マネー支払い
class EMoneyPayment implements Payment {
    private String name;
    private int balance;

    public EMoneyPayment(String name, int balance) {
        this.name = name;
        this.balance = balance;
    }

    @Override
    public boolean pay(int amount) {
        if (amount > balance) {
            System.out.println("残高不足です");
            return false;
        }
        balance -= amount;
        return true;
    }

    @Override
    public String getMethodName() { return name; }
}

public class InterfaceExercise {
    // ポリモーフィズム: Payment型で統一的に処理
    static void processPayment(Payment payment, int amount) {
        if (payment.pay(amount)) {
            System.out.println(payment.receipt(amount));
        } else {
            System.out.println(payment.getMethodName() + ": 支払い失敗");
        }
    }

    public static void main(String[] args) {
        Payment[] payments = {
            new CreditCardPayment("1234-5678-9012-3456", 100000),
            new EMoneyPayment("Suica", 5000),
        };

        for (Payment p : payments) {
            processPayment(p, 3000);
        }
    }
}`,
      },
      {
        title: "ジェネリクス",
        content:
          "ジェネリクスを使った汎用的なデータ構造（Pair、スタック）を実装してください。型パラメータの境界（extends）も練習しましょう。",
        code: `// 演習1: ジェネリックな Pair クラス
class Pair<A, B> {
    private final A first;
    private final B second;

    public Pair(A first, B second) {
        this.first = first;
        this.second = second;
    }

    public A getFirst() { return first; }
    public B getSecond() { return second; }

    @Override
    public String toString() {
        return "(" + first + ", " + second + ")";
    }
}

// 演習2: ジェネリックなスタック
class SimpleStack<T> {
    private Object[] elements;
    private int size;

    @SuppressWarnings("unchecked")
    public SimpleStack(int capacity) {
        elements = new Object[capacity];
        size = 0;
    }

    public void push(T item) {
        if (size >= elements.length) throw new RuntimeException("スタック満杯");
        elements[size++] = item;
    }

    @SuppressWarnings("unchecked")
    public T pop() {
        if (size == 0) throw new RuntimeException("スタック空");
        T item = (T) elements[--size];
        elements[size] = null;
        return item;
    }

    public boolean isEmpty() { return size == 0; }
    public int size() { return size; }
}

// 演習3: 境界付き型パラメータ
class MathUtil {
    // T は Number のサブクラスに限定
    public static <T extends Comparable<T>> T max(T a, T b) {
        return a.compareTo(b) >= 0 ? a : b;
    }

    // ワイルドカード: 任意の Number リストの合計
    public static double sum(java.util.List<? extends Number> list) {
        double total = 0;
        for (Number n : list) {
            total += n.doubleValue();
        }
        return total;
    }
}

public class GenericsExercise {
    public static void main(String[] args) {
        // Pair の使用
        var nameAge = new Pair<>("太郎", 25);
        var pointXY = new Pair<>(3.5, 7.2);
        System.out.println("名前と年齢: " + nameAge);
        System.out.println("座標: " + pointXY);

        // スタックの使用
        var stack = new SimpleStack<String>(5);
        stack.push("A");
        stack.push("B");
        stack.push("C");
        while (!stack.isEmpty()) {
            System.out.print(stack.pop() + " ");
        }
        System.out.println();

        // 境界付き型パラメータ
        System.out.println("max(3, 7) = " + MathUtil.max(3, 7));
        System.out.println("max(\"abc\", \"xyz\") = " + MathUtil.max("abc", "xyz"));

        var numbers = java.util.List.of(1, 2.5, 3, 4.5);
        System.out.println("合計: " + MathUtil.sum(numbers));
    }
}`,
      },
      {
        title: "Enum 活用",
        content:
          "Enum を使って信号機や注文ステータスをモデル化してください。Enum にメソッドやフィールドを持たせる方法を練習します。",
        code: `// 演習1: フィールドとメソッドを持つ Enum
enum Planet {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS(4.869e+24, 6.0518e6),
    EARTH(5.976e+24, 6.37814e6),
    MARS(6.421e+23, 3.3972e6);

    private final double mass;    // kg
    private final double radius;  // m

    Planet(double mass, double radius) {
        this.mass = mass;
        this.radius = radius;
    }

    // 表面重力
    double surfaceGravity() {
        final double G = 6.67300E-11;
        return G * mass / (radius * radius);
    }

    // 表面上の重さ
    double surfaceWeight(double otherMass) {
        return otherMass * surfaceGravity();
    }
}

// 演習2: 抽象メソッドを持つ Enum
enum Operation {
    ADD("+") {
        @Override
        public double apply(double a, double b) { return a + b; }
    },
    SUB("-") {
        @Override
        public double apply(double a, double b) { return a - b; }
    },
    MUL("*") {
        @Override
        public double apply(double a, double b) { return a * b; }
    },
    DIV("/") {
        @Override
        public double apply(double a, double b) {
            if (b == 0) throw new ArithmeticException("ゼロ除算");
            return a / b;
        }
    };

    private final String symbol;
    Operation(String symbol) { this.symbol = symbol; }

    public abstract double apply(double a, double b);

    @Override
    public String toString() { return symbol; }
}

// 演習3: 状態遷移を持つ Enum
enum OrderStatus {
    PENDING("注文受付"),
    CONFIRMED("確認済み"),
    SHIPPED("発送済み"),
    DELIVERED("配達完了"),
    CANCELLED("キャンセル");

    private final String displayName;
    OrderStatus(String displayName) { this.displayName = displayName; }

    public String getDisplayName() { return displayName; }

    // 次の状態に遷移可能か判定
    public boolean canTransitionTo(OrderStatus next) {
        return switch (this) {
            case PENDING   -> next == CONFIRMED || next == CANCELLED;
            case CONFIRMED -> next == SHIPPED || next == CANCELLED;
            case SHIPPED   -> next == DELIVERED;
            case DELIVERED, CANCELLED -> false;
        };
    }
}

public class EnumExercise {
    public static void main(String[] args) {
        // 惑星の表面重量
        double earthWeight = 75.0;
        double mass = earthWeight / Planet.EARTH.surfaceGravity();
        for (Planet p : Planet.values()) {
            System.out.printf("%s での重さ: %.2f kg%n", p, p.surfaceWeight(mass));
        }

        // 演算
        double a = 10, b = 3;
        for (Operation op : Operation.values()) {
            System.out.printf("%.0f %s %.0f = %.2f%n", a, op, b, op.apply(a, b));
        }

        // 状態遷移
        var status = OrderStatus.PENDING;
        var next = OrderStatus.CONFIRMED;
        System.out.printf("%s → %s: %s%n",
            status.getDisplayName(), next.getDisplayName(),
            status.canTransitionTo(next) ? "可能" : "不可");
    }
}`,
      },
      {
        title: "Record と Sealed Class",
        content:
          "Java 16 の Record と Java 17 の Sealed Class を使って、不変データと制限付き階層を設計してください。",
        code: `// 演習1: Record — 不変のデータキャリア
record Point(double x, double y) {
    // コンパクトコンストラクタでバリデーション
    Point {
        if (Double.isNaN(x) || Double.isNaN(y)) {
            throw new IllegalArgumentException("NaN は不可");
        }
    }

    // カスタムメソッド
    double distanceTo(Point other) {
        double dx = this.x - other.x;
        double dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    Point translate(double dx, double dy) {
        return new Point(x + dx, y + dy);
    }
}

record Person(String name, int age, String email) {
    // コンパクトコンストラクタ
    Person {
        if (name == null || name.isBlank()) throw new IllegalArgumentException("名前は必須");
        if (age < 0 || age > 150) throw new IllegalArgumentException("年齢が不正: " + age);
        if (email != null && !email.contains("@")) throw new IllegalArgumentException("メール不正");
    }
}

// 演習2: Sealed Class — 許可された子クラスのみ継承可能
sealed interface Shape permits CircleShape, RectangleShape, TriangleShape {
    double area();
}

record CircleShape(double radius) implements Shape {
    @Override
    public double area() { return Math.PI * radius * radius; }
}

record RectangleShape(double width, double height) implements Shape {
    @Override
    public double area() { return width * height; }
}

record TriangleShape(double base, double height) implements Shape {
    @Override
    public double area() { return 0.5 * base * height; }
}

public class RecordSealedExercise {
    // Sealed Class + パターンマッチングで網羅的な処理
    static String describe(Shape shape) {
        return switch (shape) {
            case CircleShape c    -> String.format("半径%.1fの円（面積: %.2f）", c.radius(), c.area());
            case RectangleShape r -> String.format("%.1f×%.1fの長方形（面積: %.2f）", r.width(), r.height(), r.area());
            case TriangleShape t  -> String.format("底辺%.1f 高さ%.1fの三角形（面積: %.2f）", t.base(), t.height(), t.area());
        };
    }

    public static void main(String[] args) {
        // Record の使用
        var p1 = new Point(0, 0);
        var p2 = new Point(3, 4);
        System.out.println("点1: " + p1);
        System.out.println("点2: " + p2);
        System.out.println("距離: " + p1.distanceTo(p2));
        System.out.println("移動後: " + p1.translate(1, 1));

        var person = new Person("山田太郎", 30, "taro@example.com");
        System.out.println(person);

        // Sealed Class の使用
        Shape[] shapes = {
            new CircleShape(5),
            new RectangleShape(4, 6),
            new TriangleShape(3, 8)
        };
        for (Shape s : shapes) {
            System.out.println(describe(s));
        }
    }
}`,
      },
    ],
  },
  // ===== コレクション・Stream =====
  {
    id: "list-set-map",
    title: "List/Set/Map演習",
    description: "ArrayListの操作、HashSetの重複排除、HashMapの活用、TreeMapでのソートを実践する",
    category: "collections",
    sections: [
      {
        title: "ArrayList の操作",
        content:
          "ArrayList を使って学生の名前リストを管理するプログラムを作成してください。追加・削除・検索・ソートの操作を練習します。",
        code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class ArrayListExercise {
    public static void main(String[] args) {
        // 演習1: リストの作成と基本操作
        var students = new ArrayList<>(List.of("田中", "佐藤", "鈴木", "高橋", "伊藤"));
        System.out.println("初期リスト: " + students);

        // 追加
        students.add("渡辺");
        students.add(2, "山本");  // インデックス2に挿入
        System.out.println("追加後: " + students);

        // 削除
        students.remove("佐藤");      // 値で削除
        students.remove(0);            // インデックスで削除
        System.out.println("削除後: " + students);

        // 演習2: 検索
        System.out.println("鈴木を含む: " + students.contains("鈴木"));
        System.out.println("鈴木の位置: " + students.indexOf("鈴木"));

        // 演習3: ソート
        Collections.sort(students);
        System.out.println("自然順序: " + students);

        students.sort(Comparator.comparingInt(String::length));
        System.out.println("文字数順: " + students);

        // 演習4: フィルタリング（removeIf）
        var scores = new ArrayList<>(List.of(45, 78, 92, 33, 67, 88, 51));
        System.out.println("全スコア: " + scores);
        scores.removeIf(s -> s < 60);
        System.out.println("60点以上: " + scores);

        // 演習5: 不変リスト vs 可変リスト
        var immutable = List.of("A", "B", "C");
        // immutable.add("D");  // UnsupportedOperationException!
        var mutable = new ArrayList<>(immutable);
        mutable.add("D");
        System.out.println("不変: " + immutable);
        System.out.println("可変: " + mutable);
    }
}`,
      },
      {
        title: "HashSet の重複排除",
        content:
          "HashSet を使って重複データの排除と集合演算（和・積・差）を行うプログラムを作成してください。",
        code: `import java.util.Arrays;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

public class HashSetExercise {
    public static void main(String[] args) {
        // 演習1: 重複排除
        List<String> withDups = Arrays.asList(
            "Java", "Python", "Java", "Go", "Python", "Rust", "Java");
        var unique = new HashSet<>(withDups);
        System.out.println("元のリスト: " + withDups);
        System.out.println("重複排除後: " + unique);
        System.out.println("ユニーク数: " + unique.size());

        // 演習2: 集合演算
        var setA = new HashSet<>(Set.of(1, 2, 3, 4, 5));
        var setB = new HashSet<>(Set.of(3, 4, 5, 6, 7));

        // 和集合（Union）
        var union = new HashSet<>(setA);
        union.addAll(setB);
        System.out.println("和集合: " + union);

        // 積集合（Intersection）
        var intersection = new HashSet<>(setA);
        intersection.retainAll(setB);
        System.out.println("積集合: " + intersection);

        // 差集合（Difference）
        var difference = new HashSet<>(setA);
        difference.removeAll(setB);
        System.out.println("差集合 (A-B): " + difference);

        // 演習3: LinkedHashSet（挿入順を保持）
        var ordered = new LinkedHashSet<String>();
        ordered.add("第三");
        ordered.add("第一");
        ordered.add("第二");
        System.out.println("LinkedHashSet: " + ordered);

        // 演習4: TreeSet（自然順序でソート）
        var sorted = new TreeSet<>(List.of(5, 2, 8, 1, 9, 3));
        System.out.println("TreeSet: " + sorted);
        System.out.println("最小: " + sorted.first());
        System.out.println("最大: " + sorted.last());
    }
}`,
      },
      {
        title: "HashMap の活用",
        content:
          "HashMap を使って単語の出現回数をカウントするプログラムを作成してください。merge や computeIfAbsent などの便利メソッドも活用しましょう。",
        code: `import java.util.HashMap;
import java.util.Map;

public class HashMapExercise {
    public static void main(String[] args) {
        // 演習1: 単語の出現回数カウント
        String text = "Java is great Java is powerful Java is everywhere";
        String[] words = text.split(" ");

        var wordCount = new HashMap<String, Integer>();
        for (String word : words) {
            wordCount.merge(word, 1, Integer::sum);
        }
        System.out.println("単語カウント: " + wordCount);

        // 演習2: getOrDefault と putIfAbsent
        var config = new HashMap<String, String>();
        config.put("host", "localhost");
        config.put("port", "8080");

        String timeout = config.getOrDefault("timeout", "30");
        System.out.println("タイムアウト: " + timeout);

        config.putIfAbsent("port", "9090");  // 既にあるので変更されない
        config.putIfAbsent("timeout", "60"); // ないので追加される
        System.out.println("設定: " + config);

        // 演習3: computeIfAbsent でグループ化
        String[] names = {"Alice", "Bob", "Anna", "Charlie", "Ben", "Amy"};
        var grouped = new HashMap<Character, java.util.List<String>>();
        for (String name : names) {
            grouped.computeIfAbsent(name.charAt(0), k -> new java.util.ArrayList<>()).add(name);
        }
        System.out.println("グループ化: " + grouped);

        // 演習4: entrySet でイテレーション
        var scores = Map.of("国語", 85, "数学", 92, "英語", 78, "理科", 88, "社会", 73);
        System.out.println("--- 成績表 ---");
        int total = 0;
        for (var entry : scores.entrySet()) {
            System.out.printf("  %s: %d点%n", entry.getKey(), entry.getValue());
            total += entry.getValue();
        }
        System.out.printf("  合計: %d点 / 平均: %.1f点%n", total, total / (double) scores.size());
    }
}`,
      },
      {
        title: "TreeMap でのソート",
        content:
          "TreeMap を使ってデータを自動ソートし、範囲検索やカスタムソートを行うプログラムを作成してください。",
        code: `import java.util.Comparator;
import java.util.Map;
import java.util.TreeMap;

public class TreeMapExercise {
    public static void main(String[] args) {
        // 演習1: 自然順序でのソート
        var scoreMap = new TreeMap<String, Integer>();
        scoreMap.put("Charlie", 78);
        scoreMap.put("Alice", 95);
        scoreMap.put("Bob", 82);
        scoreMap.put("Diana", 91);
        scoreMap.put("Eve", 67);

        System.out.println("名前順: " + scoreMap);
        System.out.println("最初: " + scoreMap.firstEntry());
        System.out.println("最後: " + scoreMap.lastEntry());

        // 演習2: 範囲検索
        var numMap = new TreeMap<Integer, String>();
        numMap.put(10, "ten");
        numMap.put(20, "twenty");
        numMap.put(30, "thirty");
        numMap.put(40, "forty");
        numMap.put(50, "fifty");

        System.out.println("20〜40の範囲: " + numMap.subMap(20, true, 40, true));
        System.out.println("30以上: " + numMap.tailMap(30));
        System.out.println("30未満: " + numMap.headMap(30));

        // 演習3: 逆順ソート
        var descMap = new TreeMap<Integer, String>(Comparator.reverseOrder());
        descMap.putAll(numMap);
        System.out.println("降順: " + descMap);

        // 演習4: 値でソートしたい場合のテクニック
        System.out.println("--- スコア順（降順）---");
        scoreMap.entrySet().stream()
            .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
            .forEach(e -> System.out.printf("  %s: %d点%n", e.getKey(), e.getValue()));

        // 演習5: floorEntry / ceilingEntry
        System.out.println("25以下の最大キー: " + numMap.floorEntry(25));
        System.out.println("25以上の最小キー: " + numMap.ceilingEntry(25));
    }
}`,
      },
    ],
  },
  {
    id: "stream-api",
    title: "Stream API演習",
    description: "filter/map/reduce、Collectors、flatMap、Optional活用を実践する",
    category: "collections",
    sections: [
      {
        title: "filter / map / reduce",
        content:
          "Stream API の基本操作である filter、map、reduce を使って、データの変換・集約を行うプログラムを作成してください。",
        code: `import java.util.List;
import java.util.stream.IntStream;

public class StreamBasicExercise {
    record Employee(String name, String dept, int salary) {}

    public static void main(String[] args) {
        var employees = List.of(
            new Employee("田中", "開発", 500000),
            new Employee("佐藤", "営業", 450000),
            new Employee("鈴木", "開発", 600000),
            new Employee("高橋", "人事", 480000),
            new Employee("伊藤", "開発", 550000),
            new Employee("渡辺", "営業", 520000)
        );

        // 演習1: filter — 開発部のみ抽出
        System.out.println("=== 開発部のメンバー ===");
        employees.stream()
            .filter(e -> e.dept().equals("開発"))
            .forEach(e -> System.out.println("  " + e.name() + ": " + e.salary() + "円"));

        // 演習2: map — 名前のリストに変換
        var names = employees.stream()
            .map(Employee::name)
            .toList();
        System.out.println("名前一覧: " + names);

        // 演習3: reduce — 給与の合計
        int totalSalary = employees.stream()
            .mapToInt(Employee::salary)
            .sum();
        System.out.println("給与合計: " + String.format("%,d円", totalSalary));

        // reduce で最大給与の社員を取得
        employees.stream()
            .reduce((a, b) -> a.salary() > b.salary() ? a : b)
            .ifPresent(e -> System.out.println("最高給与: " + e.name() + " (" + e.salary() + "円)"));

        // 演習4: IntStream で数値処理
        int sumOfSquares = IntStream.rangeClosed(1, 10)
            .map(n -> n * n)
            .sum();
        System.out.println("1〜10の二乗和: " + sumOfSquares);

        // 偶数のみのフィルタリング
        int[] evens = IntStream.rangeClosed(1, 20)
            .filter(n -> n % 2 == 0)
            .toArray();
        System.out.println("偶数: " + java.util.Arrays.toString(evens));
    }
}`,
      },
      {
        title: "Collectors",
        content:
          "Collectors を使ったグループ化、パーティショニング、集計を行うプログラムを作成してください。",
        code: `import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class CollectorsExercise {
    record Student(String name, String grade, int score) {}

    public static void main(String[] args) {
        var students = List.of(
            new Student("田中", "A組", 85),
            new Student("佐藤", "B組", 92),
            new Student("鈴木", "A組", 78),
            new Student("高橋", "B組", 95),
            new Student("伊藤", "A組", 60),
            new Student("渡辺", "B組", 73),
            new Student("山本", "A組", 88),
            new Student("中村", "B組", 45)
        );

        // 演習1: groupingBy — クラス別にグループ化
        Map<String, List<Student>> byGrade = students.stream()
            .collect(Collectors.groupingBy(Student::grade));
        byGrade.forEach((grade, list) -> {
            System.out.println(grade + ": " + list.stream().map(Student::name).toList());
        });

        // 演習2: groupingBy + 集計 — クラス別の平均点
        Map<String, Double> avgByGrade = students.stream()
            .collect(Collectors.groupingBy(
                Student::grade,
                Collectors.averagingInt(Student::score)
            ));
        avgByGrade.forEach((g, avg) ->
            System.out.printf("%s の平均点: %.1f%n", g, avg));

        // 演習3: partitioningBy — 合格(60点以上)/不合格
        Map<Boolean, List<Student>> passOrFail = students.stream()
            .collect(Collectors.partitioningBy(s -> s.score() >= 60));
        System.out.println("合格者: " + passOrFail.get(true).stream().map(Student::name).toList());
        System.out.println("不合格者: " + passOrFail.get(false).stream().map(Student::name).toList());

        // 演習4: joining — 名前をカンマ区切りで結合
        String nameList = students.stream()
            .map(Student::name)
            .collect(Collectors.joining(", ", "【", "】"));
        System.out.println("学生一覧: " + nameList);

        // 演習5: toMap — 名前→スコアのマップ
        Map<String, Integer> scoreMap = students.stream()
            .collect(Collectors.toMap(Student::name, Student::score));
        System.out.println("スコアマップ: " + scoreMap);
    }
}`,
      },
      {
        title: "flatMap",
        content:
          "flatMap を使ってネストしたコレクションを平坦化するプログラムを作成してください。",
        code: `import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class FlatMapExercise {
    record Order(String customer, List<String> items) {}
    record Department(String name, List<String> members) {}

    public static void main(String[] args) {
        // 演習1: ネストしたリストの平坦化
        var nestedList = List.of(
            List.of(1, 2, 3),
            List.of(4, 5),
            List.of(6, 7, 8, 9)
        );
        var flat = nestedList.stream()
            .flatMap(List::stream)
            .toList();
        System.out.println("平坦化: " + flat);

        // 演習2: 注文から全商品を抽出
        var orders = List.of(
            new Order("田中", List.of("ノートPC", "マウス", "キーボード")),
            new Order("佐藤", List.of("モニター", "マウス")),
            new Order("鈴木", List.of("ノートPC", "USBケーブル", "ヘッドセット"))
        );

        // 全商品のユニークリスト
        var allItems = orders.stream()
            .flatMap(o -> o.items().stream())
            .distinct()
            .sorted()
            .toList();
        System.out.println("全商品: " + allItems);

        // 商品ごとの注文数
        var itemCount = orders.stream()
            .flatMap(o -> o.items().stream())
            .collect(Collectors.groupingBy(item -> item, Collectors.counting()));
        System.out.println("商品別注文数: " + itemCount);

        // 演習3: 文章から単語を抽出
        var sentences = List.of(
            "Java is great",
            "Stream API is powerful",
            "Java Stream is elegant"
        );
        var uniqueWords = sentences.stream()
            .flatMap(s -> Arrays.stream(s.split(" ")))
            .map(String::toLowerCase)
            .distinct()
            .sorted()
            .toList();
        System.out.println("ユニーク単語: " + uniqueWords);

        // 演習4: 部署から全メンバーを抽出
        var departments = List.of(
            new Department("開発", List.of("田中", "鈴木", "伊藤")),
            new Department("営業", List.of("佐藤", "渡辺")),
            new Department("人事", List.of("高橋"))
        );
        long totalMembers = departments.stream()
            .flatMap(d -> d.members().stream())
            .count();
        System.out.println("全社員数: " + totalMembers);
    }
}`,
      },
      {
        title: "Optional 活用",
        content:
          "Optional を使って null 安全なプログラムを作成してください。map/flatMap/orElse などのメソッドチェーンを練習します。",
        code: `import java.util.List;
import java.util.Optional;

public class OptionalExercise {
    record Address(String city, String street) {}
    record Company(String name, Address address) {}
    record User(String name, Company company) {}

    // 演習1: Optional の基本
    static Optional<String> findUserById(int id) {
        return switch (id) {
            case 1 -> Optional.of("田中太郎");
            case 2 -> Optional.of("佐藤花子");
            default -> Optional.empty();
        };
    }

    public static void main(String[] args) {
        // 基本的な使い方
        Optional<String> user1 = findUserById(1);
        Optional<String> user3 = findUserById(3);

        System.out.println(user1.orElse("不明"));       // 田中太郎
        System.out.println(user3.orElse("不明"));       // 不明

        // ifPresent
        user1.ifPresent(name -> System.out.println("見つかった: " + name));
        // ifPresentOrElse (Java 9+)
        user3.ifPresentOrElse(
            name -> System.out.println("見つかった: " + name),
            () -> System.out.println("ユーザーが見つかりません")
        );

        // 演習2: map でチェーン
        Optional<Integer> nameLength = user1.map(String::length);
        System.out.println("名前の文字数: " + nameLength.orElse(0));

        // 演習3: flatMap でネスト解消
        var user = new User("田中", new Company("ABC株式会社", new Address("東京", "渋谷1-1")));
        var nullCompanyUser = new User("佐藤", null);

        String city1 = Optional.ofNullable(user)
            .map(User::company)
            .map(Company::address)
            .map(Address::city)
            .orElse("不明");
        System.out.println("都市: " + city1);

        String city2 = Optional.ofNullable(nullCompanyUser)
            .map(User::company)
            .map(Company::address)
            .map(Address::city)
            .orElse("不明");
        System.out.println("都市: " + city2);

        // 演習4: Stream と Optional の連携
        var names = List.of("Alice", "Bob", "Charlie", "Diana");
        Optional<String> first = names.stream()
            .filter(n -> n.startsWith("C"))
            .findFirst();
        System.out.println("Cで始まる名前: " + first.orElse("なし"));

        // or (Java 9+) — 代替 Optional を返す
        Optional<String> result = findUserById(99)
            .or(() -> findUserById(1));
        System.out.println("フォールバック: " + result.orElse("なし"));
    }
}`,
      },
    ],
  },
  // ===== 実践課題 =====
  {
    id: "string-processing",
    title: "文字列処理の実践",
    description: "パスワードバリデータ、CSVパーサー、文字列圧縮、アナグラム判定を実装する",
    category: "practical",
    sections: [
      {
        title: "パスワードバリデータ",
        content:
          "パスワードの強度を検証するバリデータを実装してください。8文字以上、大文字・小文字・数字・記号をそれぞれ1文字以上含むことを検証します。",
        code: `import java.util.ArrayList;
import java.util.List;

public class PasswordValidator {

    public record ValidationResult(boolean valid, List<String> errors) {
        public void print() {
            if (valid) {
                System.out.println("  ✓ パスワードは有効です");
            } else {
                errors.forEach(e -> System.out.println("  ✗ " + e));
            }
        }
    }

    public static ValidationResult validate(String password) {
        var errors = new ArrayList<String>();

        if (password == null || password.isEmpty()) {
            return new ValidationResult(false, List.of("パスワードが空です"));
        }
        if (password.length() < 8) {
            errors.add("8文字以上必要です（現在: " + password.length() + "文字）");
        }
        if (!password.matches(".*[A-Z].*")) {
            errors.add("大文字を1文字以上含めてください");
        }
        if (!password.matches(".*[a-z].*")) {
            errors.add("小文字を1文字以上含めてください");
        }
        if (!password.matches(".*[0-9].*")) {
            errors.add("数字を1文字以上含めてください");
        }
        if (!password.matches(".*[!@#$%^&*()_+\\\\-=\\\\[\\\\]{};':\",./<>?].*")) {
            errors.add("記号を1文字以上含めてください");
        }

        return new ValidationResult(errors.isEmpty(), errors);
    }

    // パスワード強度スコア（0〜5）
    public static int strengthScore(String password) {
        int score = 0;
        if (password.length() >= 8) score++;
        if (password.length() >= 12) score++;
        if (password.matches(".*[A-Z].*")) score++;
        if (password.matches(".*[a-z].*") && password.matches(".*[0-9].*")) score++;
        if (password.matches(".*[^A-Za-z0-9].*")) score++;
        return score;
    }

    public static void main(String[] args) {
        String[] passwords = {"abc", "password", "Pass1234", "P@ssw0rd!", "MyS3cur3!Pass"};
        for (String pw : passwords) {
            System.out.println("パスワード: " + pw);
            validate(pw).print();
            System.out.println("  強度: " + "★".repeat(strengthScore(pw))
                + "☆".repeat(5 - strengthScore(pw)));
            System.out.println();
        }
    }
}`,
      },
      {
        title: "CSV パーサー",
        content:
          "カンマ区切りの CSV 文字列を解析し、データを構造化するパーサーを実装してください。ダブルクォートで囲まれたフィールドにも対応します。",
        code: `import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class CsvParser {

    // CSV行を解析してフィールドのリストに変換
    public static List<String> parseLine(String line) {
        var fields = new ArrayList<String>();
        var current = new StringBuilder();
        boolean inQuotes = false;

        for (int i = 0; i < line.length(); i++) {
            char c = line.charAt(i);
            if (inQuotes) {
                if (c == '"') {
                    if (i + 1 < line.length() && line.charAt(i + 1) == '"') {
                        current.append('"');
                        i++;  // エスケープされた引用符
                    } else {
                        inQuotes = false;
                    }
                } else {
                    current.append(c);
                }
            } else {
                if (c == '"') {
                    inQuotes = true;
                } else if (c == ',') {
                    fields.add(current.toString().trim());
                    current.setLength(0);
                } else {
                    current.append(c);
                }
            }
        }
        fields.add(current.toString().trim());
        return fields;
    }

    // CSV文字列全体を解析（ヘッダー行 + データ行）
    public static List<Map<String, String>> parse(String csv) {
        String[] lines = csv.split("\\n");
        if (lines.length < 2) return List.of();

        List<String> headers = parseLine(lines[0]);
        var result = new ArrayList<Map<String, String>>();

        for (int i = 1; i < lines.length; i++) {
            List<String> values = parseLine(lines[i]);
            var row = new LinkedHashMap<String, String>();
            for (int j = 0; j < headers.size(); j++) {
                row.put(headers.get(j), j < values.size() ? values.get(j) : "");
            }
            result.add(row);
        }
        return result;
    }

    public static void main(String[] args) {
        String csv = """
            名前,年齢,都市,備考
            田中太郎,30,東京,エンジニア
            佐藤花子,25,"大阪市,北区",デザイナー
            鈴木一郎,35,名古屋,"備考に""引用符""あり"
            """;

        var data = parse(csv);
        for (var row : data) {
            System.out.println(row);
        }
    }
}`,
      },
      {
        title: "文字列圧縮",
        content:
          "ランレングス圧縮（RLE）を実装してください。連続する同じ文字を「文字+回数」に変換し、圧縮・展開の両方を実装します。",
        code: `public class StringCompression {

    // ランレングス圧縮: "aaabbbccdddddd" → "a3b3c2d6"
    public static String compress(String input) {
        if (input == null || input.isEmpty()) return input;

        var sb = new StringBuilder();
        int count = 1;
        for (int i = 1; i <= input.length(); i++) {
            if (i < input.length() && input.charAt(i) == input.charAt(i - 1)) {
                count++;
            } else {
                sb.append(input.charAt(i - 1));
                if (count > 1) {
                    sb.append(count);
                }
                count = 1;
            }
        }

        // 圧縮結果が元より長ければ元の文字列を返す
        String compressed = sb.toString();
        return compressed.length() < input.length() ? compressed : input;
    }

    // ランレングス展開: "a3b3c2d6" → "aaabbbccdddddd"
    public static String decompress(String input) {
        if (input == null || input.isEmpty()) return input;

        var sb = new StringBuilder();
        int i = 0;
        while (i < input.length()) {
            char ch = input.charAt(i);
            i++;
            // 数字部分を読み取る
            var numStr = new StringBuilder();
            while (i < input.length() && Character.isDigit(input.charAt(i))) {
                numStr.append(input.charAt(i));
                i++;
            }
            int count = numStr.length() > 0 ? Integer.parseInt(numStr.toString()) : 1;
            sb.append(String.valueOf(ch).repeat(count));
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        String[] testCases = {
            "aaabbbccdddddd",
            "aabcccccaaa",
            "abcdef",
            "aaaaaaaaaa"
        };

        for (String test : testCases) {
            String compressed = compress(test);
            String decompressed = decompress(compressed);
            System.out.printf("元: %-20s → 圧縮: %-15s → 展開: %s [%s]%n",
                test, compressed, decompressed,
                test.equals(decompressed) ? "OK" : "NG");
        }
    }
}`,
      },
      {
        title: "アナグラム判定",
        content:
          "2つの文字列がアナグラム（同じ文字を並び替えたもの）かどうかを判定するプログラムを実装してください。複数の解法で比較しましょう。",
        code: `import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class AnagramChecker {

    // 解法1: ソートして比較
    public static boolean isAnagramSort(String a, String b) {
        if (a.length() != b.length()) return false;
        char[] charsA = a.toLowerCase().toCharArray();
        char[] charsB = b.toLowerCase().toCharArray();
        Arrays.sort(charsA);
        Arrays.sort(charsB);
        return Arrays.equals(charsA, charsB);
    }

    // 解法2: 文字カウントで比較
    public static boolean isAnagramCount(String a, String b) {
        if (a.length() != b.length()) return false;
        var countMap = new HashMap<Character, Integer>();
        for (char c : a.toLowerCase().toCharArray()) {
            countMap.merge(c, 1, Integer::sum);
        }
        for (char c : b.toLowerCase().toCharArray()) {
            countMap.merge(c, -1, Integer::sum);
        }
        return countMap.values().stream().allMatch(v -> v == 0);
    }

    // 応用: アナグラムのグループ分け
    public static Map<String, List<String>> groupAnagrams(List<String> words) {
        return words.stream().collect(Collectors.groupingBy(word -> {
            char[] chars = word.toLowerCase().toCharArray();
            Arrays.sort(chars);
            return new String(chars);
        }));
    }

    public static void main(String[] args) {
        // 基本判定
        String[][] pairs = {
            {"listen", "silent"},
            {"hello", "world"},
            {"anagram", "nagaram"},
            {"Dormitory", "Dirty Room"}
        };

        for (String[] pair : pairs) {
            String a = pair[0].replaceAll("\\\\s", "");
            String b = pair[1].replaceAll("\\\\s", "");
            System.out.printf("\"%s\" と \"%s\": %s%n",
                pair[0], pair[1],
                isAnagramSort(a, b) ? "アナグラム ○" : "アナグラムではない ✗");
        }

        // アナグラムのグループ分け
        System.out.println("\\n=== アナグラムグループ ===");
        var words = List.of("eat", "tea", "tan", "ate", "nat", "bat", "tab");
        var groups = groupAnagrams(words);
        groups.values().forEach(group -> System.out.println("  " + group));
    }
}`,
      },
    ],
  },
  {
    id: "file-io",
    title: "ファイルI/O演習",
    description: "テキストファイル読み書き、CSVファイル処理、JSONパース、ディレクトリ走査を実践する",
    category: "practical",
    sections: [
      {
        title: "テキストファイル読み書き",
        content:
          "java.nio.file パッケージを使って、テキストファイルの読み込みと書き込みを行うプログラムを作成してください。",
        code: `import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.List;

public class TextFileExercise {
    public static void main(String[] args) throws IOException {
        Path dir = Path.of("exercise-output");
        Files.createDirectories(dir);

        // 演習1: 文字列をファイルに書き込む
        Path filePath = dir.resolve("sample.txt");
        String content = """
            Java ファイル I/O 演習
            これはサンプルファイルです。
            3行目のテキストです。
            """;
        Files.writeString(filePath, content, StandardCharsets.UTF_8);
        System.out.println("ファイル作成: " + filePath);

        // 演習2: ファイルを一括読み込み
        String readContent = Files.readString(filePath, StandardCharsets.UTF_8);
        System.out.println("--- 一括読み込み ---");
        System.out.println(readContent);

        // 演習3: 行単位で読み込み
        List<String> lines = Files.readAllLines(filePath, StandardCharsets.UTF_8);
        System.out.println("--- 行単位 ---");
        for (int i = 0; i < lines.size(); i++) {
            System.out.printf("%d: %s%n", i + 1, lines.get(i));
        }

        // 演習4: ファイルに追記
        Files.writeString(filePath, "追記された行\\n",
            StandardCharsets.UTF_8, StandardOpenOption.APPEND);

        // 演習5: Stream で大きなファイルを効率的に処理
        System.out.println("--- Stream 読み込み ---");
        try (var stream = Files.lines(filePath, StandardCharsets.UTF_8)) {
            stream.filter(line -> !line.isBlank())
                  .map(String::trim)
                  .forEach(line -> System.out.println("  > " + line));
        }

        // 後片付け
        Files.deleteIfExists(filePath);
        Files.deleteIfExists(dir);
    }
}`,
      },
      {
        title: "CSV ファイル処理",
        content:
          "CSV ファイルの読み込み・集計・書き出しを行うプログラムを作成してください。売上データの集計を題材にします。",
        code: `import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class CsvFileExercise {
    record SalesRecord(String date, String product, int quantity, int price) {
        int total() { return quantity * price; }

        String toCsvLine() {
            return String.join(",", date, product,
                String.valueOf(quantity), String.valueOf(price), String.valueOf(total()));
        }
    }

    public static void main(String[] args) throws IOException {
        Path dir = Path.of("exercise-output");
        Files.createDirectories(dir);

        // サンプルCSVデータの生成
        Path csvPath = dir.resolve("sales.csv");
        var csvContent = """
            日付,商品,数量,単価
            2024-01-15,ノートPC,2,120000
            2024-01-15,マウス,5,3000
            2024-01-16,キーボード,3,8000
            2024-01-16,ノートPC,1,120000
            2024-01-17,マウス,10,3000
            2024-01-17,モニター,2,45000
            """;
        Files.writeString(csvPath, csvContent);

        // 演習1: CSV読み込みとパース
        List<String> lines = Files.readAllLines(csvPath);
        var records = new ArrayList<SalesRecord>();
        for (int i = 1; i < lines.size(); i++) {  // ヘッダーをスキップ
            String line = lines.get(i).trim();
            if (line.isEmpty()) continue;
            String[] cols = line.split(",");
            records.add(new SalesRecord(cols[0], cols[1],
                Integer.parseInt(cols[2]), Integer.parseInt(cols[3])));
        }

        // 演習2: 商品別の売上合計
        System.out.println("=== 商品別売上 ===");
        Map<String, Integer> salesByProduct = records.stream()
            .collect(Collectors.groupingBy(
                SalesRecord::product,
                Collectors.summingInt(SalesRecord::total)));
        salesByProduct.entrySet().stream()
            .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
            .forEach(e -> System.out.printf("  %s: %,d円%n", e.getKey(), e.getValue()));

        // 演習3: 日別の売上合計
        System.out.println("=== 日別売上 ===");
        records.stream()
            .collect(Collectors.groupingBy(SalesRecord::date, Collectors.summingInt(SalesRecord::total)))
            .forEach((date, total) -> System.out.printf("  %s: %,d円%n", date, total));

        // 演習4: 集計結果をCSVに書き出し
        Path outputPath = dir.resolve("sales_summary.csv");
        var outputLines = new ArrayList<String>();
        outputLines.add("日付,商品,数量,単価,小計");
        records.stream()
            .sorted(Comparator.comparing(SalesRecord::date))
            .forEach(r -> outputLines.add(r.toCsvLine()));
        Files.write(outputPath, outputLines);
        System.out.println("集計ファイル出力: " + outputPath);

        // 後片付け
        Files.deleteIfExists(csvPath);
        Files.deleteIfExists(outputPath);
        Files.deleteIfExists(dir);
    }
}`,
      },
      {
        title: "JSON パース（Gson / Jackson）",
        content:
          "JSON データの読み込みと書き出しを行うプログラムを作成してください。標準ライブラリだけでの簡易パースと、Gson/Jackson の利用例を示します。",
        code: `// === 標準ライブラリのみでの簡易JSON構築 ===
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.StringJoiner;

public class JsonExercise {

    // 簡易 JSON ビルダー（ライブラリ不要）
    static class SimpleJson {
        static String toJson(Map<String, Object> map) {
            var sj = new StringJoiner(", ", "{", "}");
            for (var entry : map.entrySet()) {
                sj.add("\\"" + entry.getKey() + "\\": " + valueToJson(entry.getValue()));
            }
            return sj.toString();
        }

        @SuppressWarnings("unchecked")
        static String valueToJson(Object value) {
            if (value == null) return "null";
            if (value instanceof String s) return "\\"" + s + "\\"";
            if (value instanceof Number || value instanceof Boolean) return value.toString();
            if (value instanceof Map) return toJson((Map<String, Object>) value);
            if (value instanceof List<?> list) {
                var sj = new StringJoiner(", ", "[", "]");
                list.forEach(v -> sj.add(valueToJson(v)));
                return sj.toString();
            }
            return "\\"" + value + "\\"";
        }
    }

    public static void main(String[] args) {
        // 演習1: JSON 構築
        var person = new LinkedHashMap<String, Object>();
        person.put("name", "田中太郎");
        person.put("age", 30);
        person.put("active", true);
        person.put("skills", List.of("Java", "Spring", "SQL"));

        var address = new LinkedHashMap<String, Object>();
        address.put("city", "東京");
        address.put("zip", "100-0001");
        person.put("address", address);

        String json = SimpleJson.toJson(person);
        System.out.println("JSON: " + json);

        // 演習2: Gson の使用例（コメント / 要ライブラリ追加）
        // Gson gson = new GsonBuilder().setPrettyPrinting().create();
        // record User(String name, int age, List<String> skills) {}
        // var user = new User("田中太郎", 30, List.of("Java", "Spring"));
        //
        // // オブジェクト → JSON
        // String jsonStr = gson.toJson(user);
        // System.out.println(jsonStr);
        //
        // // JSON → オブジェクト
        // User parsed = gson.fromJson(jsonStr, User.class);
        // System.out.println(parsed);

        // 演習3: Jackson の使用例（コメント / 要ライブラリ追加）
        // ObjectMapper mapper = new ObjectMapper();
        // mapper.enable(SerializationFeature.INDENT_OUTPUT);
        //
        // String jacksonJson = mapper.writeValueAsString(user);
        // User jacksonParsed = mapper.readValue(jacksonJson, User.class);

        System.out.println("\\n※ Gson/Jackson は build.gradle に依存関係を追加して利用します");
        System.out.println("  implementation 'com.google.code.gson:gson:2.11.0'");
        System.out.println("  implementation 'com.fasterxml.jackson.core:jackson-databind:2.17.0'");
    }
}`,
      },
      {
        title: "ディレクトリ走査",
        content:
          "java.nio.file を使ってディレクトリを再帰的に走査し、ファイルの一覧表示やサイズ集計を行うプログラムを作成してください。",
        code: `import java.io.IOException;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

public class DirectoryWalkExercise {
    public static void main(String[] args) throws IOException {
        Path targetDir = Path.of(".");  // カレントディレクトリ

        // 演習1: Files.list() — 直下のファイル一覧
        System.out.println("=== 直下のファイル ===");
        try (var stream = Files.list(targetDir)) {
            stream.sorted()
                  .forEach(p -> {
                      String type = Files.isDirectory(p) ? "[DIR] " : "[FILE]";
                      System.out.println("  " + type + " " + p.getFileName());
                  });
        }

        // 演習2: Files.walk() — 再帰的にファイル走査
        System.out.println("\\n=== Java ファイル一覧 ===");
        try (var stream = Files.walk(targetDir, 3)) {  // 最大深度3
            stream.filter(p -> p.toString().endsWith(".java"))
                  .forEach(p -> System.out.println("  " + p));
        }

        // 演習3: Files.find() — 条件付き検索
        System.out.println("\\n=== 1KB以上のファイル ===");
        try (var stream = Files.find(targetDir, 3,
                (path, attrs) -> attrs.isRegularFile() && attrs.size() > 1024)) {
            stream.forEach(p -> {
                try {
                    long size = Files.size(p);
                    System.out.printf("  %s (%,d bytes)%n", p.getFileName(), size);
                } catch (IOException e) {
                    System.out.println("  エラー: " + p);
                }
            });
        }

        // 演習4: FileVisitor でカスタム走査
        System.out.println("\\n=== 拡張子別ファイル数 ===");
        var extCount = new TreeMap<String, Integer>();
        Files.walkFileTree(targetDir, new SimpleFileVisitor<>() {
            @Override
            public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) {
                String name = file.getFileName().toString();
                int dot = name.lastIndexOf('.');
                String ext = dot >= 0 ? name.substring(dot) : "(なし)";
                extCount.merge(ext, 1, Integer::sum);
                return FileVisitResult.CONTINUE;
            }
        });
        extCount.forEach((ext, count) ->
            System.out.printf("  %-10s : %d ファイル%n", ext, count));
    }
}`,
      },
    ],
  },
  {
    id: "design-patterns",
    title: "デザインパターン演習",
    description: "Singleton、Strategy、Observer、Builderパターンを実装する",
    category: "practical",
    sections: [
      {
        title: "Singleton パターン",
        content:
          "アプリケーション設定を管理する Singleton クラスを実装してください。スレッドセーフな実装方法を複数示します。",
        code: `import java.util.HashMap;
import java.util.Map;

// 方法1: enum を使った Singleton（最も推奨）
enum AppConfig {
    INSTANCE;

    private final Map<String, String> settings = new HashMap<>();

    AppConfig() {
        // デフォルト設定
        settings.put("app.name", "MyApp");
        settings.put("app.version", "1.0.0");
        settings.put("db.host", "localhost");
        settings.put("db.port", "5432");
    }

    public String get(String key) {
        return settings.getOrDefault(key, "");
    }

    public void set(String key, String value) {
        settings.put(key, value);
    }

    public void printAll() {
        settings.forEach((k, v) -> System.out.println("  " + k + " = " + v));
    }
}

// 方法2: static inner class（遅延初期化 + スレッドセーフ）
class DatabaseConnection {
    private final String url;

    private DatabaseConnection() {
        this.url = "jdbc:postgresql://localhost:5432/mydb";
        System.out.println("データベース接続を初期化");
    }

    // 内部クラスが初めて参照された時に初期化（遅延初期化）
    private static class Holder {
        private static final DatabaseConnection INSTANCE = new DatabaseConnection();
    }

    public static DatabaseConnection getInstance() {
        return Holder.INSTANCE;
    }

    public String getUrl() { return url; }

    public void query(String sql) {
        System.out.println("実行: " + sql + " (" + url + ")");
    }
}

public class SingletonExercise {
    public static void main(String[] args) {
        // enum Singleton の使用
        System.out.println("=== AppConfig ===");
        AppConfig.INSTANCE.printAll();
        AppConfig.INSTANCE.set("app.debug", "true");
        System.out.println("debug: " + AppConfig.INSTANCE.get("app.debug"));

        // 同一インスタンスの確認
        var config1 = AppConfig.INSTANCE;
        var config2 = AppConfig.INSTANCE;
        System.out.println("同一インスタンス: " + (config1 == config2));

        // DatabaseConnection Singleton
        System.out.println("\\n=== DatabaseConnection ===");
        var db = DatabaseConnection.getInstance();
        db.query("SELECT * FROM users");
    }
}`,
      },
      {
        title: "Strategy パターン",
        content:
          "ソートアルゴリズムを Strategy パターンで切り替えられるようにしてください。バブルソート、選択ソート、挿入ソートを実装します。",
        code: `import java.util.Arrays;

// Strategy インターフェース
interface SortStrategy {
    void sort(int[] array);
    String getName();
}

// 具体的なストラテジー1: バブルソート
class BubbleSort implements SortStrategy {
    @Override
    public void sort(int[] array) {
        int n = array.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    int tmp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = tmp;
                }
            }
        }
    }
    @Override
    public String getName() { return "バブルソート"; }
}

// 具体的なストラテジー2: 選択ソート
class SelectionSort implements SortStrategy {
    @Override
    public void sort(int[] array) {
        int n = array.length;
        for (int i = 0; i < n - 1; i++) {
            int minIdx = i;
            for (int j = i + 1; j < n; j++) {
                if (array[j] < array[minIdx]) minIdx = j;
            }
            int tmp = array[minIdx];
            array[minIdx] = array[i];
            array[i] = tmp;
        }
    }
    @Override
    public String getName() { return "選択ソート"; }
}

// 具体的なストラテジー3: 挿入ソート
class InsertionSort implements SortStrategy {
    @Override
    public void sort(int[] array) {
        for (int i = 1; i < array.length; i++) {
            int key = array[i];
            int j = i - 1;
            while (j >= 0 && array[j] > key) {
                array[j + 1] = array[j];
                j--;
            }
            array[j + 1] = key;
        }
    }
    @Override
    public String getName() { return "挿入ソート"; }
}

// Context: ストラテジーを使うクラス
class Sorter {
    private SortStrategy strategy;

    public Sorter(SortStrategy strategy) {
        this.strategy = strategy;
    }

    public void setStrategy(SortStrategy strategy) {
        this.strategy = strategy;
    }

    public int[] sortArray(int[] array) {
        int[] copy = Arrays.copyOf(array, array.length);
        long start = System.nanoTime();
        strategy.sort(copy);
        long elapsed = System.nanoTime() - start;
        System.out.printf("  %s: %,d ns%n", strategy.getName(), elapsed);
        return copy;
    }
}

public class StrategyExercise {
    public static void main(String[] args) {
        int[] data = {64, 34, 25, 12, 22, 11, 90, 45, 78, 33};
        System.out.println("元データ: " + Arrays.toString(data));

        var sorter = new Sorter(new BubbleSort());

        // 各ストラテジーで実行
        SortStrategy[] strategies = {
            new BubbleSort(),
            new SelectionSort(),
            new InsertionSort()
        };

        for (SortStrategy strategy : strategies) {
            sorter.setStrategy(strategy);
            int[] result = sorter.sortArray(data);
            System.out.println("  結果: " + Arrays.toString(result));
        }
    }
}`,
      },
      {
        title: "Observer パターン",
        content:
          "ニュース配信システムを Observer パターンで実装してください。ニュースチャンネル（Subject）が更新されると、登録された購読者（Observer）に通知が届きます。",
        code: `import java.util.ArrayList;
import java.util.List;

// Observer インターフェース
interface Subscriber {
    void update(String channel, String news);
    String getName();
}

// Subject インターフェース
interface NewsPublisher {
    void subscribe(Subscriber subscriber);
    void unsubscribe(Subscriber subscriber);
    void publish(String news);
}

// 具体的な Subject: ニュースチャンネル
class NewsChannel implements NewsPublisher {
    private final String name;
    private final List<Subscriber> subscribers = new ArrayList<>();
    private String latestNews;

    public NewsChannel(String name) { this.name = name; }

    @Override
    public void subscribe(Subscriber subscriber) {
        subscribers.add(subscriber);
        System.out.println(subscriber.getName() + " が " + name + " を購読開始");
    }

    @Override
    public void unsubscribe(Subscriber subscriber) {
        subscribers.remove(subscriber);
        System.out.println(subscriber.getName() + " が " + name + " の購読を解除");
    }

    @Override
    public void publish(String news) {
        this.latestNews = news;
        System.out.println("\\n【" + name + "】" + news);
        notifySubscribers();
    }

    private void notifySubscribers() {
        for (Subscriber s : subscribers) {
            s.update(name, latestNews);
        }
    }
}

// 具体的な Observer: メール通知
class EmailSubscriber implements Subscriber {
    private final String name;
    private final String email;

    public EmailSubscriber(String name, String email) {
        this.name = name;
        this.email = email;
    }

    @Override
    public void update(String channel, String news) {
        System.out.println("  📧 " + email + " へメール送信: [" + channel + "] " + news);
    }

    @Override
    public String getName() { return name; }
}

// 具体的な Observer: アプリ通知
class AppSubscriber implements Subscriber {
    private final String name;
    private final List<String> notifications = new ArrayList<>();

    public AppSubscriber(String name) { this.name = name; }

    @Override
    public void update(String channel, String news) {
        String notification = "[" + channel + "] " + news;
        notifications.add(notification);
        System.out.println("  📱 " + name + " のアプリ通知: " + notification);
    }

    @Override
    public String getName() { return name; }

    public List<String> getNotifications() { return notifications; }
}

public class ObserverExercise {
    public static void main(String[] args) {
        // チャンネル作成
        var techNews = new NewsChannel("テックニュース");
        var sportsNews = new NewsChannel("スポーツニュース");

        // 購読者作成
        var taro = new EmailSubscriber("太郎", "taro@example.com");
        var hanako = new AppSubscriber("花子");
        var jiro = new AppSubscriber("次郎");

        // 購読
        techNews.subscribe(taro);
        techNews.subscribe(hanako);
        sportsNews.subscribe(hanako);
        sportsNews.subscribe(jiro);

        // ニュース配信
        techNews.publish("Java 25 がリリースされました！");
        sportsNews.publish("日本代表がワールドカップ出場決定！");

        // 購読解除後の配信
        techNews.unsubscribe(taro);
        techNews.publish("Spring Boot 4.0 が公開されました");

        // 花子の通知一覧
        System.out.println("\\n花子の全通知:");
        hanako.getNotifications().forEach(n -> System.out.println("  " + n));
    }
}`,
      },
      {
        title: "Builder パターン",
        content:
          "複雑なオブジェクト（HTTPリクエスト、SQL クエリ）を Builder パターンで構築してください。メソッドチェーンで直感的にオブジェクトを組み立てます。",
        code: `import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.StringJoiner;

// 演習1: HTTP リクエストの Builder
class HttpRequest {
    private final String method;
    private final String url;
    private final Map<String, String> headers;
    private final String body;

    private HttpRequest(Builder builder) {
        this.method = builder.method;
        this.url = builder.url;
        this.headers = builder.headers;
        this.body = builder.body;
    }

    @Override
    public String toString() {
        var sb = new StringBuilder();
        sb.append(method).append(" ").append(url).append("\\n");
        headers.forEach((k, v) -> sb.append(k).append(": ").append(v).append("\\n"));
        if (body != null) sb.append("\\n").append(body);
        return sb.toString();
    }

    static class Builder {
        private String method = "GET";
        private String url;
        private final Map<String, String> headers = new LinkedHashMap<>();
        private String body;

        public Builder(String url) { this.url = url; }

        public Builder method(String method) { this.method = method; return this; }
        public Builder header(String key, String value) { headers.put(key, value); return this; }
        public Builder body(String body) { this.body = body; return this; }
        public Builder contentType(String type) { return header("Content-Type", type); }
        public Builder auth(String token) { return header("Authorization", "Bearer " + token); }

        public HttpRequest build() {
            if (url == null) throw new IllegalStateException("URL は必須");
            return new HttpRequest(this);
        }
    }
}

// 演習2: SQL クエリの Builder
class SqlQuery {
    private final String table;
    private final List<String> columns;
    private final List<String> conditions;
    private final String orderBy;
    private final Integer limit;

    private SqlQuery(Builder builder) {
        this.table = builder.table;
        this.columns = builder.columns;
        this.conditions = builder.conditions;
        this.orderBy = builder.orderBy;
        this.limit = builder.limit;
    }

    public String toSql() {
        var sb = new StringBuilder("SELECT ");
        sb.append(columns.isEmpty() ? "*" : String.join(", ", columns));
        sb.append(" FROM ").append(table);
        if (!conditions.isEmpty()) {
            sb.append(" WHERE ").append(String.join(" AND ", conditions));
        }
        if (orderBy != null) sb.append(" ORDER BY ").append(orderBy);
        if (limit != null) sb.append(" LIMIT ").append(limit);
        return sb.toString();
    }

    static class Builder {
        private final String table;
        private final List<String> columns = new ArrayList<>();
        private final List<String> conditions = new ArrayList<>();
        private String orderBy;
        private Integer limit;

        public Builder(String table) { this.table = table; }

        public Builder select(String... cols) {
            columns.addAll(List.of(cols));
            return this;
        }
        public Builder where(String condition) { conditions.add(condition); return this; }
        public Builder orderBy(String column) { this.orderBy = column; return this; }
        public Builder limit(int n) { this.limit = n; return this; }

        public SqlQuery build() { return new SqlQuery(this); }
    }
}

public class BuilderExercise {
    public static void main(String[] args) {
        // HTTP リクエスト構築
        var request = new HttpRequest.Builder("https://api.example.com/users")
            .method("POST")
            .contentType("application/json")
            .auth("my-secret-token")
            .header("Accept", "application/json")
            .body("{\\"name\\": \\"太郎\\", \\"age\\": 30}")
            .build();
        System.out.println("=== HTTP Request ===");
        System.out.println(request);

        // SQL クエリ構築
        var query = new SqlQuery.Builder("employees")
            .select("name", "department", "salary")
            .where("department = '開発'")
            .where("salary > 400000")
            .orderBy("salary DESC")
            .limit(10)
            .build();
        System.out.println("=== SQL Query ===");
        System.out.println(query.toSql());
    }
}`,
      },
    ],
  },
  {
    id: "mini-projects",
    title: "ミニプロジェクト",
    description: "TODO管理アプリ、簡易電卓、学生成績管理システム、銀行口座シミュレータを実装する",
    category: "practical",
    sections: [
      {
        title: "TODO管理アプリ（CLI）",
        content:
          "コマンドラインで操作できる TODO 管理アプリを実装してください。タスクの追加・完了・削除・一覧表示ができるようにします。",
        code: `import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.concurrent.atomic.AtomicInteger;

public class TodoApp {
    enum Priority { HIGH, MEDIUM, LOW }

    record Todo(int id, String title, Priority priority,
                boolean done, LocalDateTime createdAt) {
        String display() {
            String status = done ? "✓" : "○";
            String pLabel = switch (priority) {
                case HIGH   -> "[高]";
                case MEDIUM -> "[中]";
                case LOW    -> "[低]";
            };
            String date = createdAt.format(DateTimeFormatter.ofPattern("MM/dd HH:mm"));
            return String.format("  %s %d. %s %s (%s)", status, id, pLabel, title, date);
        }
    }

    private final List<Todo> todos = new ArrayList<>();
    private final AtomicInteger nextId = new AtomicInteger(1);

    public void add(String title, Priority priority) {
        var todo = new Todo(nextId.getAndIncrement(), title, priority,
                false, LocalDateTime.now());
        todos.add(todo);
        System.out.println("追加: " + todo.title());
    }

    public void complete(int id) {
        for (int i = 0; i < todos.size(); i++) {
            if (todos.get(i).id() == id) {
                var old = todos.get(i);
                todos.set(i, new Todo(old.id(), old.title(), old.priority(),
                        true, old.createdAt()));
                System.out.println("完了: " + old.title());
                return;
            }
        }
        System.out.println("ID " + id + " が見つかりません");
    }

    public void delete(int id) {
        todos.removeIf(t -> t.id() == id);
        System.out.println("削除: ID " + id);
    }

    public void list() {
        System.out.println("\\n=== TODO リスト ===");
        if (todos.isEmpty()) {
            System.out.println("  (タスクなし)");
            return;
        }
        todos.stream()
            .sorted((a, b) -> a.done() == b.done() ? a.priority().compareTo(b.priority()) : Boolean.compare(a.done(), b.done()))
            .forEach(t -> System.out.println(t.display()));
        long remaining = todos.stream().filter(t -> !t.done()).count();
        System.out.println("  残タスク: " + remaining + "/" + todos.size());
    }

    // デモ実行（Scanner ループの代わり）
    public static void main(String[] args) {
        var app = new TodoApp();
        app.add("Spring Boot の学習", Priority.HIGH);
        app.add("買い物に行く", Priority.LOW);
        app.add("レポート提出", Priority.HIGH);
        app.add("部屋の掃除", Priority.MEDIUM);
        app.list();

        app.complete(1);
        app.complete(3);
        app.list();

        app.delete(2);
        app.list();
    }
}`,
      },
      {
        title: "簡易電卓",
        content:
          "四則演算に加え、括弧や優先順位を考慮した式を評価できる簡易電卓を実装してください。逆ポーランド記法（RPN）変換を使います。",
        code: `import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

public class Calculator {

    // トークンに分割
    static List<String> tokenize(String expression) {
        var tokens = new ArrayList<String>();
        var num = new StringBuilder();
        for (int i = 0; i < expression.length(); i++) {
            char c = expression.charAt(i);
            if (Character.isDigit(c) || c == '.') {
                num.append(c);
            } else {
                if (num.length() > 0) {
                    tokens.add(num.toString());
                    num.setLength(0);
                }
                if (c != ' ') {
                    tokens.add(String.valueOf(c));
                }
            }
        }
        if (num.length() > 0) tokens.add(num.toString());
        return tokens;
    }

    // 中置記法 → 逆ポーランド記法（Shunting-yard アルゴリズム）
    static List<String> toRPN(List<String> tokens) {
        var output = new ArrayList<String>();
        Deque<String> stack = new ArrayDeque<>();

        for (String token : tokens) {
            if (token.matches("[0-9.]+")) {
                output.add(token);
            } else if (token.equals("(")) {
                stack.push(token);
            } else if (token.equals(")")) {
                while (!stack.isEmpty() && !stack.peek().equals("(")) {
                    output.add(stack.pop());
                }
                if (!stack.isEmpty()) stack.pop(); // "(" を捨てる
            } else { // 演算子
                while (!stack.isEmpty() && precedence(stack.peek()) >= precedence(token)) {
                    output.add(stack.pop());
                }
                stack.push(token);
            }
        }
        while (!stack.isEmpty()) output.add(stack.pop());
        return output;
    }

    static int precedence(String op) {
        return switch (op) {
            case "+", "-" -> 1;
            case "*", "/" -> 2;
            default -> 0;
        };
    }

    // RPN を評価
    static double evaluateRPN(List<String> rpn) {
        Deque<Double> stack = new ArrayDeque<>();
        for (String token : rpn) {
            if (token.matches("[0-9.]+")) {
                stack.push(Double.parseDouble(token));
            } else {
                double b = stack.pop();
                double a = stack.pop();
                stack.push(switch (token) {
                    case "+" -> a + b;
                    case "-" -> a - b;
                    case "*" -> a * b;
                    case "/" -> { if (b == 0) throw new ArithmeticException("ゼロ除算"); yield a / b; }
                    default -> throw new IllegalArgumentException("不明な演算子: " + token);
                });
            }
        }
        return stack.pop();
    }

    // 式を計算
    public static double calculate(String expression) {
        var tokens = tokenize(expression);
        var rpn = toRPN(tokens);
        return evaluateRPN(rpn);
    }

    public static void main(String[] args) {
        String[] expressions = {
            "3 + 4",
            "10 - 2 * 3",
            "(10 - 2) * 3",
            "100 / (4 + 1) * 2",
            "3.14 * 5 * 5"
        };

        for (String expr : expressions) {
            double result = calculate(expr);
            System.out.printf("  %s = %.2f%n", expr, result);
        }
    }
}`,
      },
      {
        title: "学生成績管理システム",
        content:
          "学生の成績を管理するシステムを実装してください。学生の登録、科目別スコアの追加、統計情報の表示ができるようにします。",
        code: `import java.util.*;
import java.util.stream.Collectors;

public class GradeManagement {
    record Score(String subject, int point) {}

    static class Student {
        private final String id;
        private final String name;
        private final List<Score> scores = new ArrayList<>();

        public Student(String id, String name) {
            this.id = id;
            this.name = name;
        }

        public void addScore(String subject, int point) {
            if (point < 0 || point > 100) {
                throw new IllegalArgumentException("点数は0〜100: " + point);
            }
            scores.add(new Score(subject, point));
        }

        public double average() {
            return scores.stream().mapToInt(Score::point).average().orElse(0);
        }

        public int total() {
            return scores.stream().mapToInt(Score::point).sum();
        }

        public String grade() {
            double avg = average();
            if (avg >= 90) return "A";
            if (avg >= 80) return "B";
            if (avg >= 70) return "C";
            if (avg >= 60) return "D";
            return "F";
        }

        public String getId() { return id; }
        public String getName() { return name; }
        public List<Score> getScores() { return Collections.unmodifiableList(scores); }
    }

    static class GradeSystem {
        private final Map<String, Student> students = new LinkedHashMap<>();

        public void addStudent(String id, String name) {
            students.put(id, new Student(id, name));
        }

        public void addScore(String studentId, String subject, int point) {
            var student = students.get(studentId);
            if (student == null) throw new IllegalArgumentException("学生不明: " + studentId);
            student.addScore(subject, point);
        }

        public void printReport() {
            System.out.println("╔══════════════════════════════════════════════╗");
            System.out.println("║           学生成績レポート                   ║");
            System.out.println("╚══════════════════════════════════════════════╝");

            for (var student : students.values()) {
                System.out.printf("\\n%s (%s) — 評定: %s%n", student.getName(), student.getId(), student.grade());
                for (var score : student.getScores()) {
                    System.out.printf("  %-6s: %3d点%n", score.subject(), score.point());
                }
                System.out.printf("  合計: %d点 / 平均: %.1f点%n", student.total(), student.average());
            }
        }

        public void printRanking() {
            System.out.println("\\n=== 成績ランキング ===");
            students.values().stream()
                .sorted(Comparator.comparingDouble(Student::average).reversed())
                .forEach(s -> System.out.printf("  %s: %.1f点 (%s)%n",
                    s.getName(), s.average(), s.grade()));
        }

        public void printSubjectStats() {
            System.out.println("\\n=== 科目別統計 ===");
            var allScores = students.values().stream()
                .flatMap(s -> s.getScores().stream())
                .collect(Collectors.groupingBy(Score::subject));
            allScores.forEach((subject, scores) -> {
                var stats = scores.stream().mapToInt(Score::point).summaryStatistics();
                System.out.printf("  %s: 平均%.1f / 最高%d / 最低%d%n",
                    subject, stats.getAverage(), stats.getMax(), stats.getMin());
            });
        }
    }

    public static void main(String[] args) {
        var system = new GradeSystem();

        system.addStudent("S001", "田中太郎");
        system.addStudent("S002", "佐藤花子");
        system.addStudent("S003", "鈴木一郎");

        system.addScore("S001", "国語", 85); system.addScore("S001", "数学", 72);
        system.addScore("S001", "英語", 90); system.addScore("S001", "理科", 68);
        system.addScore("S002", "国語", 92); system.addScore("S002", "数学", 95);
        system.addScore("S002", "英語", 88); system.addScore("S002", "理科", 91);
        system.addScore("S003", "国語", 60); system.addScore("S003", "数学", 55);
        system.addScore("S003", "英語", 70); system.addScore("S003", "理科", 65);

        system.printReport();
        system.printRanking();
        system.printSubjectStats();
    }
}`,
      },
      {
        title: "銀行口座シミュレータ",
        content:
          "複数の口座間での送金、取引履歴の記録、残高レポートの表示ができる銀行口座シミュレータを実装してください。",
        code: `import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

public class BankSimulator {
    enum TxType { DEPOSIT, WITHDRAW, TRANSFER_IN, TRANSFER_OUT }

    record Transaction(TxType type, int amount, String description, LocalDateTime timestamp) {
        String display() {
            String sign = (type == TxType.DEPOSIT || type == TxType.TRANSFER_IN) ? "+" : "-";
            String time = timestamp.format(DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm"));
            return String.format("  %s %s%,d円 — %s", time, sign, amount, description);
        }
    }

    static class Account {
        private final String number;
        private final String owner;
        private int balance;
        private final List<Transaction> history = new ArrayList<>();

        public Account(String number, String owner, int initialBalance) {
            this.number = number;
            this.owner = owner;
            this.balance = initialBalance;
            if (initialBalance > 0) {
                addTx(TxType.DEPOSIT, initialBalance, "初期入金");
            }
        }

        public void deposit(int amount) {
            validatePositive(amount);
            balance += amount;
            addTx(TxType.DEPOSIT, amount, "入金");
        }

        public void withdraw(int amount) {
            validatePositive(amount);
            if (amount > balance) {
                throw new IllegalStateException(
                    owner + ": 残高不足（残高 " + balance + "円に対し " + amount + "円の出金）");
            }
            balance -= amount;
            addTx(TxType.WITHDRAW, amount, "出金");
        }

        public void transferTo(Account target, int amount) {
            validatePositive(amount);
            if (amount > balance) {
                throw new IllegalStateException(owner + ": 送金額が残高を超えています");
            }
            balance -= amount;
            target.balance += amount;
            addTx(TxType.TRANSFER_OUT, amount, target.owner + "への送金");
            target.addTx(TxType.TRANSFER_IN, amount, owner + "からの送金");
        }

        public void printStatement() {
            System.out.println("\\n━━━ " + owner + "（" + number + "）━━━");
            System.out.println("  現在の残高: " + String.format("%,d円", balance));
            System.out.println("  --- 取引履歴 ---");
            history.forEach(tx -> System.out.println(tx.display()));
        }

        private void addTx(TxType type, int amount, String desc) {
            history.add(new Transaction(type, amount, desc, LocalDateTime.now()));
        }

        private void validatePositive(int amount) {
            if (amount <= 0) throw new IllegalArgumentException("金額は正の値: " + amount);
        }

        public String getOwner() { return owner; }
        public int getBalance() { return balance; }
    }

    static class Bank {
        private final String name;
        private final Map<String, Account> accounts = new LinkedHashMap<>();

        public Bank(String name) { this.name = name; }

        public Account createAccount(String number, String owner, int initial) {
            var account = new Account(number, owner, initial);
            accounts.put(number, account);
            System.out.println(owner + "の口座を開設しました（" + number + "）");
            return account;
        }

        public void printBankReport() {
            System.out.println("\\n╔════════════════════════════════════╗");
            System.out.println("║    " + name + " — 全口座レポート     ║");
            System.out.println("╚════════════════════════════════════╝");
            int totalDeposits = 0;
            for (var account : accounts.values()) {
                System.out.printf("  %-10s: %,10d円%n", account.getOwner(), account.getBalance());
                totalDeposits += account.getBalance();
            }
            System.out.printf("  %-10s: %,10d円%n", "預金総額", totalDeposits);
        }
    }

    public static void main(String[] args) {
        var bank = new Bank("Java銀行");

        var taro = bank.createAccount("001-001", "田中太郎", 500000);
        var hanako = bank.createAccount("001-002", "佐藤花子", 300000);
        var jiro = bank.createAccount("001-003", "鈴木次郎", 100000);

        // 取引の実行
        taro.deposit(200000);
        taro.withdraw(50000);
        taro.transferTo(hanako, 100000);
        hanako.transferTo(jiro, 50000);
        jiro.deposit(30000);

        // 明細表示
        taro.printStatement();
        hanako.printStatement();
        jiro.printStatement();

        // 銀行全体レポート
        bank.printBankReport();
    }
}`,
      },
    ],
  },
];
