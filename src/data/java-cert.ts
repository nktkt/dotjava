export interface JavaCertSection {
  title: string;
  content: string;
  code?: string;
}

export interface JavaCertChapter {
  id: string;
  title: string;
  description: string;
  category: string;
  sections: JavaCertSection[];
}

export interface JavaCertCategory {
  id: string;
  name: string;
  color: string;
}

export const javaCertCategories: JavaCertCategory[] = [
  { id: "bronze", name: "Java SE Bronze", color: "#CD7F32" },
  { id: "silver", name: "Java SE Silver", color: "#9E9E9E" },
  { id: "gold", name: "Java SE Gold", color: "#FFC107" },
];

export const javaCertChapters: JavaCertChapter[] = [
  // ── Bronze ──
  {
    id: "bronze-basics",
    title: "Java言語の基本",
    description: "変数、データ型、演算子、制御構文の基礎をマスター",
    category: "bronze",
    sections: [
      {
        title: "変数とデータ型",
        content:
          "Javaの変数はプリミティブ型と参照型に分かれます。プリミティブ型にはbyte(8bit)、short(16bit)、int(32bit)、long(64bit)、float(32bit)、double(64bit)、char(16bit)、boolean(true/false)の8種類があります。変数を使用する前に必ず宣言と初期化が必要です。ローカル変数は自動初期化されないため、使用前に値を代入しないとコンパイルエラーになります。Bronze試験ではint、double、char、booleanが頻出です。",
        code: `// プリミティブ型の宣言と初期化
int age = 25;
double price = 1980.5;
char grade = 'A';
boolean isActive = true;
long population = 126_000_000L;  // アンダースコアで桁区切り可能

// 型変換（暗黙の拡大変換）
int i = 100;
double d = i;  // int → double（OK）

// 型変換（明示的な縮小変換 — キャスト必要）
double pi = 3.14;
int rounded = (int) pi;  // 3（小数部切り捨て）

// 参照型
String name = "Java";  // Stringは参照型
String nullStr = null;  // 参照型はnullを持てる
// int x = null;  // コンパイルエラー：プリミティブ型はnull不可`,
      },
      {
        title: "演算子と式",
        content:
          "算術演算子(+,-,*,/,%)、比較演算子(==,!=,<,>,<=,>=)、論理演算子(&&,||,!)、代入演算子(=,+=,-=,*=,/=)があります。整数同士の除算は小数部が切り捨てられます。文字列との+演算子は文字列連結になります。==演算子はプリミティブ型では値を比較しますが、参照型では参照（アドレス）を比較する点がBronze試験の頻出ポイントです。",
        code: `// 整数除算の注意点
int a = 7 / 2;     // 3（小数部切り捨て）
double b = 7 / 2;  // 3.0（整数同士の除算 → int結果をdoubleに代入）
double c = 7.0 / 2; // 3.5（一方がdoubleなら結果もdouble）

// インクリメント・デクリメント
int x = 5;
System.out.println(x++); // 5を出力してから6に（後置）
System.out.println(++x); // 7に増やしてから7を出力（前置）

// 文字列連結の評価順序（左から順に評価）
System.out.println(1 + 2 + "java");   // "3java"
System.out.println("java" + 1 + 2);   // "java12"

// == と equals の違い
String s1 = new String("hello");
String s2 = new String("hello");
System.out.println(s1 == s2);      // false（異なるオブジェクト）
System.out.println(s1.equals(s2)); // true（値が同じ）`,
      },
      {
        title: "制御構文",
        content:
          "if-else文、switch文、for文、while文、do-while文が基本の制御構文です。switch文ではbyte、short、int、char、String、enumが使用可能です（longやdoubleは不可）。for文の初期化部・条件部・更新部はそれぞれ省略可能で、すべて省略するとfor(;;)という無限ループになります。break文はループとswitchの脱出、continue文はループの次の繰り返しへのスキップに使います。",
        code: `// if-else文
int score = 75;
if (score >= 80) {
    System.out.println("A");
} else if (score >= 60) {
    System.out.println("B");  // これが出力される
} else {
    System.out.println("C");
}

// switch文（Bronze頻出：fall-through）
int day = 2;
switch (day) {
    case 1: System.out.println("月"); break;
    case 2: System.out.println("火");  // break忘れ！
    case 3: System.out.println("水"); break;  // "火"と"水"が出力される
    default: System.out.println("他");
}

// for文とwhile文
for (int i = 0; i < 5; i++) {
    if (i == 3) continue;  // 3をスキップ
    System.out.print(i + " ");  // 0 1 2 4
}

// do-while（最低1回は実行される）
int count = 0;
do {
    count++;
} while (count < 0);
System.out.println(count);  // 1`,
      },
    ],
  },
  {
    id: "bronze-oop",
    title: "オブジェクト指向の基礎",
    description: "クラス、メソッド、コンストラクタ、継承の基本",
    category: "bronze",
    sections: [
      {
        title: "クラスとインスタンス",
        content:
          "クラスはオブジェクトの設計図で、フィールド（属性）とメソッド（操作）を定義します。newキーワードでインスタンスを生成します。コンストラクタはインスタンス生成時に呼ばれる特殊なメソッドで、クラス名と同名・戻り値なしです。デフォルトコンストラクタはコンストラクタを1つも定義しない場合にコンパイラが自動生成します。thisキーワードは現在のインスタンス自身を参照します。",
        code: `// クラスの定義
class Student {
    // フィールド
    String name;
    int age;

    // コンストラクタ
    Student(String name, int age) {
        this.name = name;  // thisで自身のフィールドを参照
        this.age = age;
    }

    // デフォルトコンストラクタ（上を定義すると自動生成されない）
    Student() {
        this("未設定", 0);  // 別のコンストラクタを呼び出し
    }

    // メソッド
    void introduce() {
        System.out.println(name + "(" + age + "歳)");
    }
}

// インスタンスの生成と使用
Student s1 = new Student("田中", 20);
s1.introduce();  // 田中(20歳)

Student s2 = new Student();
s2.introduce();  // 未設定(0歳)`,
      },
      {
        title: "継承とオーバーライド",
        content:
          "extendsキーワードでクラスを継承します。Javaは単一継承のみで、1つのクラスしか継承できません。サブクラスはスーパークラスのフィールドとメソッドを引き継ぎます。メソッドのオーバーライドではスーパークラスのメソッドをサブクラスで再定義します。superキーワードでスーパークラスのコンストラクタやメソッドを呼び出せます。コンストラクタの最初の行ではsuper()が暗黙的に呼ばれます。",
        code: `class Animal {
    String name;

    Animal(String name) {
        this.name = name;
    }

    void speak() {
        System.out.println(name + "が鳴く");
    }
}

class Dog extends Animal {
    String breed;

    Dog(String name, String breed) {
        super(name);  // スーパークラスのコンストラクタ呼び出し（必須）
        this.breed = breed;
    }

    @Override  // オーバーライドを明示
    void speak() {
        System.out.println(name + "がワンと鳴く");
    }

    void fetch() {
        System.out.println(name + "がボールを取ってくる");
    }
}

Animal a = new Dog("ポチ", "柴犬");  // ポリモーフィズム
a.speak();   // "ポチがワンと鳴く"（Dogのメソッドが呼ばれる）
// a.fetch(); // コンパイルエラー：Animal型にfetchメソッドはない`,
      },
      {
        title: "カプセル化とアクセス修飾子",
        content:
          "カプセル化はフィールドをprivateにし、publicなgetter/setterメソッド経由でアクセスさせる設計です。アクセス修飾子は4段階あります。public（すべてのクラスからアクセス可）、protected（同パッケージ＋サブクラス）、パッケージプライベート（修飾子なし、同パッケージのみ）、private（同クラスのみ）。Bronze試験ではpublicとprivateの違いが特に重要です。",
        code: `class BankAccount {
    private int balance;  // 外部から直接アクセス不可
    private String owner;

    public BankAccount(String owner, int balance) {
        this.owner = owner;
        this.balance = balance;
    }

    // getter
    public int getBalance() {
        return balance;
    }

    public String getOwner() {
        return owner;
    }

    // setter（バリデーション付き）
    public void deposit(int amount) {
        if (amount > 0) {
            balance += amount;
        }
    }

    public boolean withdraw(int amount) {
        if (amount > 0 && balance >= amount) {
            balance -= amount;
            return true;
        }
        return false;  // 残高不足
    }
}

BankAccount account = new BankAccount("田中", 10000);
// account.balance = -1;  // コンパイルエラー：privateフィールド
account.deposit(5000);
System.out.println(account.getBalance());  // 15000`,
      },
    ],
  },
  {
    id: "bronze-api",
    title: "基本APIと配列",
    description: "String、配列、ArrayListの操作を習得",
    category: "bronze",
    sections: [
      {
        title: "String操作",
        content:
          "StringはJavaで最もよく使われるクラスです。Stringオブジェクトはイミュータブル（不変）で、一度作成された文字列は変更できません。メソッドを呼んでも元の文字列は変わらず、新しいStringオブジェクトが返されます。主要メソッドはlength()、charAt()、substring()、indexOf()、equals()、toUpperCase()、toLowerCase()、trim()、contains()、replace()です。",
        code: `String s = "Hello Java";

// 基本メソッド
System.out.println(s.length());        // 10
System.out.println(s.charAt(0));       // 'H'
System.out.println(s.indexOf("Java")); // 6
System.out.println(s.contains("Java")); // true

// 文字列の切り出し
System.out.println(s.substring(6));    // "Java"
System.out.println(s.substring(0, 5)); // "Hello"

// 変換（元の文字列は変わらない！）
System.out.println(s.toUpperCase());   // "HELLO JAVA"
System.out.println(s.replace("Java", "World")); // "Hello World"
System.out.println(s);                 // "Hello Java"（元のまま）

// 文字列の比較（==ではなくequalsを使う）
String a = "hello";
String b = "hello";
String c = new String("hello");
System.out.println(a == b);       // true（文字列プール）
System.out.println(a == c);       // false（新規オブジェクト）
System.out.println(a.equals(c));  // true（値の比較）`,
      },
      {
        title: "配列",
        content:
          "配列は同じ型の要素を固定長で格納するデータ構造です。宣言時にサイズを指定し、作成後にサイズは変更できません。配列の要素にはインデックス（0から始まる）でアクセスします。存在しないインデックスにアクセスするとArrayIndexOutOfBoundsExceptionが発生します。多次元配列やfor-each文（拡張for文）もBronze試験で出題されます。",
        code: `// 配列の宣言と初期化
int[] scores = new int[5];        // 要素数5の配列（初期値は0）
String[] names = {"田中", "佐藤", "鈴木"};  // 初期値指定

// 要素のアクセス
scores[0] = 85;
scores[1] = 92;
System.out.println(scores.length); // 5（lengthはフィールド）

// for-each文（拡張for文）
for (String name : names) {
    System.out.print(name + " ");  // 田中 佐藤 鈴木
}

// 多次元配列
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6}
};
System.out.println(matrix[1][2]); // 6
System.out.println(matrix.length);    // 2（行数）
System.out.println(matrix[0].length); // 3（列数）

// 配列のコピー（参照のコピーに注意）
int[] original = {1, 2, 3};
int[] copy = original;     // 同じ配列を参照
copy[0] = 99;
System.out.println(original[0]); // 99（元も変わる！）`,
      },
      {
        title: "ArrayListとラッパークラス",
        content:
          "ArrayListは可変長の配列で、要素の追加・削除が柔軟にできます。java.util.ArrayListをインポートして使用します。ジェネリクス（<型>）で格納する型を指定し、プリミティブ型は直接格納できないためラッパークラス（Integer、Double等）を使います。オートボクシング/アンボクシングにより、プリミティブ型とラッパークラスの変換は自動的に行われます。",
        code: `import java.util.ArrayList;

// ArrayListの作成と操作
ArrayList<String> list = new ArrayList<>();
list.add("Java");
list.add("Python");
list.add("Go");
System.out.println(list.size());    // 3
System.out.println(list.get(0));    // "Java"
System.out.println(list.contains("Go")); // true

list.set(1, "Kotlin");  // インデックス1を置換
list.remove(2);          // インデックス2を削除
System.out.println(list); // [Java, Kotlin]

// ラッパークラスとオートボクシング
ArrayList<Integer> nums = new ArrayList<>();
nums.add(10);        // int → Integer（オートボクシング）
nums.add(20);
int val = nums.get(0); // Integer → int（アンボクシング）

// ラッパークラスの主要メソッド
int parsed = Integer.parseInt("123");   // 文字列 → int
String str = Integer.toString(456);     // int → 文字列
int max = Integer.MAX_VALUE;  // 2147483647

// nullの注意点
Integer num = null;
// int x = num;  // NullPointerException（実行時エラー）`,
      },
    ],
  },
  {
    id: "bronze-exam",
    title: "Bronze試験対策",
    description: "出題傾向、頻出パターン、模擬問題で合格力を養成",
    category: "bronze",
    sections: [
      {
        title: "試験概要と出題傾向",
        content:
          "Oracle Certified Java Programmer Bronze（Java SE Bronze）は、Javaプログラミングの基礎知識を問う入門レベルの資格です。試験時間65分、60問出題で約60%の正答率で合格です。出題範囲はJava言語の基本（変数、演算子、制御構文）、オブジェクト指向（クラス、継承、ポリモーフィズム）、基本API（String、配列、ArrayList）です。特にオブジェクト指向の理解が重要で、コードの実行結果を問う問題が多く出題されます。",
        code: `// ★頻出パターン① コンパイルエラー or 実行時エラー or 正常実行？
// → 変数の初期化忘れ、型の不一致、アクセス修飾子の違反を見抜く

// 問題例：このコードの出力は？
int x;
if (true) {
    x = 10;
}
System.out.println(x);
// 答え：10（条件が常にtrueなのでコンパイラが初期化を認識する）

// 問題例：このコードの出力は？
int x2;
if (args.length > 0) {
    x2 = 10;
}
// System.out.println(x2);  // コンパイルエラー！初期化されない可能性がある`,
      },
      {
        title: "頻出ひっかけパターン",
        content:
          "Bronze試験では、一見正しく見えるが実はエラーになるコードや、予想と異なる出力になるコードがよく出題されます。特に注意すべきポイントは、①Stringの==とequalsの違い、②switchのfall-through（break忘れ）、③配列の範囲外アクセス、④コンストラクタチェーン（superの暗黙呼び出し）、⑤メソッドのオーバーロードとオーバーライドの区別です。",
        code: `// ★頻出パターン② switch の fall-through
String color = "red";
switch (color) {
    case "red":   System.out.print("R");
    case "green": System.out.print("G");
    case "blue":  System.out.print("B"); break;
    default:      System.out.print("?");
}
// 出力: "RGB"（breakがないためfall-through）

// ★頻出パターン③ オーバーロード vs オーバーライド
class Parent {
    void print(int x) { System.out.println("Parent: " + x); }
}
class Child extends Parent {
    void print(String x) { System.out.println("Child: " + x); }
    // ↑ これはオーバーライドではなくオーバーロード（引数の型が異なる）
}
Child c = new Child();
c.print(10);      // "Parent: 10"（Parentのメソッドが呼ばれる）
c.print("hello"); // "Child: hello"

// ★頻出パターン④ コンストラクタチェーン
class A { A() { System.out.print("A"); } }
class B extends A { B() { System.out.print("B"); } }
class C extends B { C() { System.out.print("C"); } }
new C();  // 出力: "ABC"（親から順に実行される）`,
      },
      {
        title: "模擬問題と解説",
        content:
          "Bronze試験では「コードを読んで出力結果を答える」形式が中心です。解答のコツは、①まずコンパイルエラーがないか確認する、②変数の値をトレースしながら読む、③ポリモーフィズムの場合は実際のオブジェクト型のメソッドが呼ばれることを意識する、④配列やArrayListの範囲外アクセスに注意する、の4ステップです。時間配分は1問あたり約1分が目安です。",
        code: `// 【模擬問題1】出力結果を答えよ
int[] arr = {10, 20, 30, 40, 50};
for (int i = 0; i < arr.length; i += 2) {
    System.out.print(arr[i] + " ");
}
// 答え: 10 30 50

// 【模擬問題2】出力結果を答えよ
String s = "Java";
s.concat(" SE");
s.toUpperCase();
System.out.println(s);
// 答え: "Java"（Stringはイミュータブル。結果を変数に入れてない）

// 【模擬問題3】出力結果を答えよ
class Base {
    int x = 10;
    int getX() { return x; }
}
class Sub extends Base {
    int x = 20;
    int getX() { return x; }
}
Base obj = new Sub();
System.out.println(obj.x);      // 10（フィールドは宣言型で決まる）
System.out.println(obj.getX()); // 20（メソッドは実際の型で決まる）

// 【模擬問題4】コンパイルエラーはどれ？
// A: int a = 10L;           // エラー: longをintに代入不可
// B: double b = 10;         // OK: intからdoubleへ暗黙変換
// C: char c = 'A' + 1;     // OK: 定数式でchar範囲内
// D: boolean d = 1;         // エラー: intをbooleanに代入不可
// 答え: AとD`,
      },
    ],
  },

  // ── Silver ──
  {
    id: "silver-types",
    title: "データ型と演算子",
    description: "プリミティブ型、参照型、var型推論、演算子の優先順位",
    category: "silver",
    sections: [
      {
        title: "プリミティブ型と型変換",
        content:
          "Silver試験ではプリミティブ型の型変換規則が重要です。暗黙の拡大変換（byte→short→int→long→float→double）は自動的に行われますが、縮小変換にはキャストが必要です。ただしchar型はunsignedのため、byte/shortとchar間の変換は明示的キャストが必要です。リテラルの表記（0x: 16進数、0b: 2進数、0: 8進数）、アンダースコア区切り、数値の末尾文字（L, F, D）も出題されます。",
        code: `// 型変換の詳細ルール
byte b = 127;
// byte b2 = 128;  // コンパイルエラー: byteの範囲は-128〜127

short s = b;       // byte → short: OK（拡大変換）
int i = s;         // short → int: OK
long l = i;        // int → long: OK
float f = l;       // long → float: OK（精度が落ちる可能性あり）
double d = f;      // float → double: OK

// char の特殊性
char c = 65;       // 'A'（0〜65535の範囲）
// char c2 = -1;   // コンパイルエラー: charは負の値を持てない
int fromChar = c;  // char → int: OK
// char toChar = i; // コンパイルエラー: int → char は縮小変換

// varによるローカル変数の型推論（Java 10+）
var name = "Java";     // String型と推論
var count = 10;        // int型と推論
var list = new ArrayList<String>();  // ArrayList<String>と推論
// var x;             // コンパイルエラー: 初期値なしでは推論不可
// var y = null;      // コンパイルエラー: nullでは推論不可`,
      },
      {
        title: "参照型とnull",
        content:
          "参照型変数はオブジェクトへの参照（アドレス）を保持します。nullは「何も参照していない」状態を表し、nullに対してメソッドを呼ぶとNullPointerExceptionが発生します。instanceof演算子で型チェックが可能で、nullに対するinstanceofは常にfalseを返します。Java 16以降のパターンマッチングinstanceofは型チェックとキャストを同時に行えます。",
        code: `// 参照型の特性
String s1 = "hello";
String s2 = s1;    // 同じオブジェクトを参照
s2 = "world";      // s2は新しいStringを参照（s1は変わらない）
System.out.println(s1);  // "hello"

// null の扱い
String str = null;
// str.length();  // NullPointerException
System.out.println(str == null);       // true
System.out.println(str instanceof String); // false（nullはinstanceofでfalse）

// パターンマッチング instanceof（Java 16+）
Object obj = "Hello Java";
if (obj instanceof String text) {
    // text は String型として使える（キャスト不要）
    System.out.println(text.toUpperCase());  // "HELLO JAVA"
}

// パターンマッチングの否定パターン
if (!(obj instanceof String text)) {
    System.out.println("Stringではない");
} else {
    System.out.println(text.length());  // ここでもtextは使える
}`,
      },
      {
        title: "演算子の優先順位と注意点",
        content:
          "Silver試験では演算子の優先順位、短絡評価（ショートサーキット）、三項演算子が頻出です。&&と||は短絡評価を行い、左辺で結果が確定すれば右辺を評価しません。&と|はビット演算子としても論理演算子としても使えますが、短絡評価を行いません。三項演算子（条件 ? 真の値 : 偽の値）はネストすると可読性が下がるため注意が必要です。",
        code: `// 短絡評価（ショートサーキット）
int x = 0;
boolean result = (x != 0) && (10 / x > 1);
// x==0なので左辺がfalse → 右辺は評価されない（0除算を回避）
System.out.println(result);  // false

// & は短絡評価しない
// boolean result2 = (x != 0) & (10 / x > 1);
// → ArithmeticException: 右辺も必ず評価される

// 三項演算子
int age = 20;
String status = (age >= 18) ? "成人" : "未成年";
System.out.println(status);  // "成人"

// 演算子の優先順位の罠
System.out.println(1 + 2 * 3);   // 7（*が先）
System.out.println((1 + 2) * 3); // 9

// 代入演算子の型変換
byte b = 10;
b += 5;      // OK: b = (byte)(b + 5) と同等
// b = b + 5; // コンパイルエラー: b + 5 はint型になる
byte b2 = (byte)(b + 5);  // 明示的キャストが必要`,
      },
    ],
  },
  {
    id: "silver-flow",
    title: "制御構文とメソッド",
    description: "拡張switch、テキストブロック、メソッド設計",
    category: "silver",
    sections: [
      {
        title: "拡張switch式",
        content:
          "Java 14以降のswitch式は値を返すことができ、アロー（->）構文でfall-throughが発生しません。yield文で値を明示的に返すこともできます。Java 21以降ではパターンマッチングswitchにより、instanceof判定とキャストを一体化したcase文が書けます。Silver試験では従来のswitch文との違いと、コンパイルエラーになるケースが出題されます。",
        code: `// switch式（Java 14+）
int dayNum = 3;
String dayName = switch (dayNum) {
    case 1 -> "月曜日";
    case 2 -> "火曜日";
    case 3 -> "水曜日";
    case 4 -> "木曜日";
    case 5 -> "金曜日";
    case 6, 7 -> "週末";   // 複数ケースをまとめる
    default -> "不明";
};
System.out.println(dayName);  // "水曜日"

// yield文でブロック内から値を返す
int score = 85;
String grade = switch (score / 10) {
    case 10, 9 -> "A";
    case 8 -> {
        System.out.println("Good!");
        yield "B";  // ブロック内ではyieldを使う
    }
    case 7 -> "C";
    default -> "D";
};

// パターンマッチングswitch（Java 21+）
Object obj = 42;
String result = switch (obj) {
    case Integer i when i > 0 -> "正の整数: " + i;
    case Integer i -> "整数: " + i;
    case String s  -> "文字列: " + s;
    case null      -> "null";
    default        -> "その他";
};`,
      },
      {
        title: "テキストブロックとループ",
        content:
          "テキストブロック（Java 15+）は3つのダブルクォートで囲む複数行文字列リテラルです。インデントは自動調整され、共通の先頭空白が除去されます。Silver試験ではfor-each文、ラベル付きbreak/continue、無限ループの判定も出題されます。ネストしたループからの脱出にはラベル付きbreakが使えます。",
        code: `// テキストブロック（Java 15+）
String html = """
        <html>
            <body>
                <p>Hello</p>
            </body>
        </html>
        """;
// 閉じの\"\"\"の位置でインデント基準が決まる

// テキストブロック内のエスケープ
String json = """
        {
            "name": "Java",
            "version": 21
        }
        """;

// ラベル付きbreak（ネストしたループからの脱出）
outer:
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        if (i == 1 && j == 1) {
            break outer;  // 外側のループも終了
        }
        System.out.print(i + "" + j + " ");
    }
}
// 出力: 00 01 02 10

// while(true) と for(;;) は同じ無限ループ
// do-while は条件評価前に必ず1回実行される`,
      },
      {
        title: "メソッドの設計と呼び出し",
        content:
          "メソッドの引数はプリミティブ型の場合は値渡し（コピー）、参照型の場合は参照の値渡しです。可変長引数（varargs）はメソッドの最後の引数として1つだけ定義できます。メソッドのオーバーロードは同名で引数の型・数・順序が異なるメソッドを定義することです。戻り値の型だけ異なるオーバーロードはコンパイルエラーになります。",
        code: `// 値渡し vs 参照の値渡し
static void change(int x, int[] arr) {
    x = 99;        // ローカルコピーを変更（元に影響なし）
    arr[0] = 99;   // 参照先のオブジェクトを変更（元に影響あり）
}
int num = 10;
int[] array = {1, 2, 3};
change(num, array);
System.out.println(num);      // 10（変わらない）
System.out.println(array[0]); // 99（変わる！）

// 可変長引数（varargs）
static int sum(int... numbers) {
    int total = 0;
    for (int n : numbers) total += n;
    return total;
}
System.out.println(sum(1, 2, 3));    // 6
System.out.println(sum(10, 20));     // 30
System.out.println(sum());           // 0

// メソッドのオーバーロード
static void print(int x) { System.out.println("int: " + x); }
static void print(double x) { System.out.println("double: " + x); }
static void print(String x) { System.out.println("String: " + x); }

print(10);    // "int: 10"
print(3.14);  // "double: 3.14"
print("Hi");  // "String: Hi"`,
      },
    ],
  },
  {
    id: "silver-oop",
    title: "クラス設計とOOP",
    description: "抽象クラス、インターフェース、sealed class、レコード",
    category: "silver",
    sections: [
      {
        title: "抽象クラスとインターフェース",
        content:
          "抽象クラス（abstract class）はインスタンス化できないクラスで、抽象メソッド（実装なし）と具象メソッド（実装あり）を持てます。インターフェースはメソッドの契約を定義し、Java 8以降はdefaultメソッド（デフォルト実装）とstaticメソッドも持てます。クラスは単一継承ですが、インターフェースは複数実装可能です。Silver試験ではこの2つの使い分けが重要です。",
        code: `// 抽象クラス
abstract class Shape {
    String color;
    Shape(String color) { this.color = color; }
    abstract double area();  // 抽象メソッド（実装なし）
    void display() {         // 具象メソッド（実装あり）
        System.out.println(color + ": " + area());
    }
}

class Circle extends Shape {
    double radius;
    Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }
    @Override
    double area() { return Math.PI * radius * radius; }
}

// インターフェース
interface Printable {
    void print();  // 抽象メソッド
    default void printWithBorder() {  // デフォルトメソッド
        System.out.println("---");
        print();
        System.out.println("---");
    }
    static Printable of(String msg) {  // staticメソッド
        return () -> System.out.println(msg);
    }
}

// 複数インターフェースの実装
class Report extends Shape implements Printable {
    Report() { super("white"); }
    @Override double area() { return 0; }
    @Override public void print() { System.out.println("Report"); }
}`,
      },
      {
        title: "sealed classとrecord",
        content:
          "sealed class（Java 17）はどのクラスが継承できるかを制限します。permits句で許可するサブクラスを明示し、サブクラスはfinal、sealed、non-sealedのいずれかを宣言する必要があります。record（Java 16）はイミュータブルなデータキャリアクラスを簡潔に定義する構文で、コンストラクタ、getter、equals、hashCode、toStringが自動生成されます。",
        code: `// sealed class（Java 17+）
sealed class Payment permits CreditCard, BankTransfer, Cash {
    double amount;
    Payment(double amount) { this.amount = amount; }
}

final class CreditCard extends Payment {
    String cardNumber;
    CreditCard(double amount, String cardNumber) {
        super(amount);
        this.cardNumber = cardNumber;
    }
}

non-sealed class BankTransfer extends Payment {
    BankTransfer(double amount) { super(amount); }
    // non-sealed: 誰でも継承可能
}

final class Cash extends Payment {
    Cash(double amount) { super(amount); }
}

// record（Java 16+）
record Point(int x, int y) {
    // コンストラクタ、getter（x(), y()）、equals、hashCode、toStringが自動生成
    // コンパクトコンストラクタでバリデーション
    Point {
        if (x < 0 || y < 0) throw new IllegalArgumentException("負の座標");
    }
}

Point p = new Point(3, 4);
System.out.println(p.x());  // 3（getX()ではなくx()）
System.out.println(p);      // Point[x=3, y=4]`,
      },
      {
        title: "ポリモーフィズムとキャスト",
        content:
          "ポリモーフィズムは親クラス型の変数でサブクラスのオブジェクトを扱う仕組みです。メソッド呼び出しは実行時のオブジェクトの型で決まります（動的バインディング）。ただしフィールドへのアクセスは変数の宣言型で決まります。ダウンキャスト（親→子への型変換）にはキャストが必要で、実際の型と合わない場合はClassCastExceptionが発生します。",
        code: `class Animal {
    String type = "Animal";
    void sound() { System.out.println("..."); }
}

class Cat extends Animal {
    String type = "Cat";
    @Override void sound() { System.out.println("にゃー"); }
    void purr() { System.out.println("ゴロゴロ"); }
}

// アップキャスト（暗黙的）
Animal a = new Cat();
a.sound();                 // "にゃー"（実際の型Catのメソッド）
System.out.println(a.type); // "Animal"（宣言型のフィールド）
// a.purr();               // コンパイルエラー: Animalにpurrはない

// ダウンキャスト（明示的）
if (a instanceof Cat cat) {  // パターンマッチング
    cat.purr();  // "ゴロゴロ"（Cat型として使える）
}

// 不正なキャスト
Animal a2 = new Animal();
// Cat c2 = (Cat) a2;  // ClassCastException（実行時エラー）

// インターフェース型での多態性
interface Drawable { void draw(); }
class Square implements Drawable {
    public void draw() { System.out.println("□"); }
}
Drawable d = new Square();
d.draw();  // "□"`,
      },
    ],
  },
  {
    id: "silver-exception",
    title: "例外処理",
    description: "try-with-resources、マルチキャッチ、カスタム例外",
    category: "silver",
    sections: [
      {
        title: "例外の階層と分類",
        content:
          "Javaの例外はThrowableクラスを頂点とし、Error（回復不能な致命的エラー）とException（回復可能な例外）に分かれます。Exceptionの中でRuntimeExceptionのサブクラスは非チェック例外（unchecked）でcatchが任意、それ以外はチェック例外（checked）でcatch or throwsが必須です。Silver試験では各例外の分類（チェック/非チェック）を問う問題が頻出です。",
        code: `// チェック例外（検査例外）— catch or throws が必須
// IOException, SQLException, FileNotFoundException, ClassNotFoundException

// 非チェック例外（実行時例外）— catch/throws は任意
// NullPointerException, ArrayIndexOutOfBoundsException,
// ClassCastException, IllegalArgumentException,
// ArithmeticException, NumberFormatException

// Error — 通常catchしない
// OutOfMemoryError, StackOverflowError

// try-catch-finally の実行順序
static int test() {
    try {
        System.out.println("try");
        return 1;
    } catch (Exception e) {
        System.out.println("catch");
        return 2;
    } finally {
        System.out.println("finally");  // 必ず実行される
        // return 3;  // finallyのreturnはtry/catchのreturnを上書きする（非推奨）
    }
}
// 出力: "try" → "finally"、戻り値: 1`,
      },
      {
        title: "try-with-resourcesとマルチキャッチ",
        content:
          "try-with-resources（Java 7+）はAutoCloseableを実装したリソースを自動的にクローズします。tryブロックを抜けるとclose()が呼ばれるため、finallyでのクローズ処理が不要になります。マルチキャッチ（|）は複数の例外を1つのcatchブロックで処理できます。ただし、継承関係のある例外を同じマルチキャッチに書くとコンパイルエラーになります。",
        code: `import java.io.*;

// try-with-resources
try (var reader = new BufferedReader(new FileReader("data.txt"))) {
    String line = reader.readLine();
    System.out.println(line);
}  // 自動的にreader.close()が呼ばれる
// catchやfinallyは省略可能

// 複数リソースの管理
try (var in = new FileInputStream("input.txt");
     var out = new FileOutputStream("output.txt")) {
    out.write(in.readAllBytes());
}  // out → in の順でclose（宣言と逆順）

// マルチキャッチ
try {
    // 何らかの処理
} catch (IOException | SQLException e) {
    // 2つの例外を1つのcatchで処理
    System.out.println("エラー: " + e.getMessage());
    // e = new IOException();  // コンパイルエラー: マルチキャッチの変数は暗黙final
}

// 継承関係のある例外は同じマルチキャッチに書けない
// catch (FileNotFoundException | IOException e) { }
// → コンパイルエラー: FileNotFoundExceptionはIOExceptionのサブクラス`,
      },
      {
        title: "カスタム例外とthrows",
        content:
          "独自の例外クラスを作成して、アプリケーション固有のエラーを表現できます。Exceptionを継承するとチェック例外、RuntimeExceptionを継承すると非チェック例外になります。throwsはメソッドが例外をスローする可能性を宣言し、オーバーライドの際はスーパークラスと同じかそのサブクラスの例外のみスロー可能です。",
        code: `// カスタムチェック例外
class InsufficientFundsException extends Exception {
    private final double amount;
    InsufficientFundsException(double amount) {
        super("残高不足: " + amount + "円不足しています");
        this.amount = amount;
    }
    double getAmount() { return amount; }
}

// カスタム非チェック例外
class InvalidAgeException extends RuntimeException {
    InvalidAgeException(int age) {
        super("無効な年齢: " + age);
    }
}

// throwsの宣言とオーバーライドルール
class Base {
    void process() throws IOException { }
}
class Sub extends Base {
    @Override
    void process() throws FileNotFoundException { }  // OK: サブクラスの例外
    // void process() throws Exception { }  // コンパイルエラー: より広い例外は不可
    // void process() throws SQLException { } // コンパイルエラー: 無関係な例外は不可
    // void process() { }                    // OK: 例外をスローしないのは可
}

// 例外チェーン
try {
    throw new IOException("ファイルエラー");
} catch (IOException e) {
    throw new RuntimeException("処理失敗", e);  // causeを設定
}`,
      },
    ],
  },
  {
    id: "silver-api",
    title: "主要API",
    description: "String/StringBuilder、日時API、コレクション基礎",
    category: "silver",
    sections: [
      {
        title: "StringとStringBuilder",
        content:
          "Stringはイミュータブルで、操作のたびに新しいオブジェクトが作成されます。StringBuilder（およびStringBuffer）はミュータブルで、文字列を効率的に組み立てられます。Silver試験ではStringメソッドの戻り値、StringBuilderのメソッドチェーン、文字列プールの仕組みが頻出です。特にsubstring、indexOf、replace、strip（Java 11+）の挙動を正確に理解する必要があります。",
        code: `// Stringメソッドの戻り値に注意
String s = "  Hello Java  ";
System.out.println(s.strip());      // "Hello Java"（前後の空白除去、Java 11+）
System.out.println(s.stripLeading()); // "Hello Java  "
System.out.println(s.stripTrailing()); // "  Hello Java"
System.out.println(s.isBlank());    // false（Java 11+）
System.out.println("  ".isBlank()); // true

// StringBuilder（ミュータブル）
var sb = new StringBuilder("Hello");
sb.append(" Java");     // sb自身が変更される
sb.insert(5, ",");      // "Hello, Java"
sb.delete(5, 6);        // "Hello Java"
sb.reverse();           // "avaJ olleH"
System.out.println(sb); // "avaJ olleH"

// メソッドチェーン
String result = new StringBuilder("abc")
    .append("def")
    .insert(3, "-")
    .reverse()
    .toString();
System.out.println(result);  // "fed-cba"

// 文字列プール
String a = "hello";
String b = "hello";
String c = new String("hello");
String d = c.intern();  // プールの参照を取得
System.out.println(a == b);  // true（同じプール参照）
System.out.println(a == c);  // false（newは別オブジェクト）
System.out.println(a == d);  // true（internでプール参照に）`,
      },
      {
        title: "日時API（java.time）",
        content:
          "Java 8以降のjava.timeパッケージはイミュータブルな日時クラスを提供します。LocalDate（日付のみ）、LocalTime（時刻のみ）、LocalDateTime（日時）、Period（日付の期間）、Duration（時刻の期間）、DateTimeFormatter（書式）が主要クラスです。すべてイミュータブルなので、操作メソッドは新しいオブジェクトを返します。Silver試験では操作結果と不正な日時のDateTimeExceptionが出題されます。",
        code: `import java.time.*;
import java.time.format.DateTimeFormatter;

// 生成
LocalDate date = LocalDate.of(2025, 3, 15);
LocalTime time = LocalTime.of(14, 30, 0);
LocalDateTime dt = LocalDateTime.of(date, time);

// 操作（イミュータブル — 新しいオブジェクトを返す）
LocalDate nextWeek = date.plusWeeks(1);    // 2025-03-22
LocalDate lastMonth = date.minusMonths(1); // 2025-02-15
// date は変わらない

// Period（日付ベースの期間）
Period period = Period.between(
    LocalDate.of(2025, 1, 1),
    LocalDate.of(2025, 3, 15)
);
System.out.println(period);  // P2M14D（2ヶ月14日）

// Duration（時刻ベースの期間）
Duration duration = Duration.ofHours(2).plusMinutes(30);
System.out.println(duration);  // PT2H30M

// フォーマット
DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy年MM月dd日");
System.out.println(date.format(fmt));  // "2025年03月15日"

// 不正な日付
// LocalDate.of(2025, 2, 30);  // DateTimeException: 2月30日は存在しない`,
      },
      {
        title: "配列操作とArrays",
        content:
          "java.util.Arraysクラスは配列操作のユーティリティメソッドを提供します。sort()で昇順ソート、binarySearch()でソート済み配列の二分探索、copyOf()でコピー、equals()で要素の比較、fill()で全要素の初期化、asList()でList変換ができます。Silver試験ではasList()の戻り値が固定サイズのリストである点と、Arrays.compare()、Arrays.mismatch()も出題されます。",
        code: `import java.util.Arrays;
import java.util.List;

int[] nums = {5, 3, 8, 1, 9};

// ソート
Arrays.sort(nums);
System.out.println(Arrays.toString(nums)); // [1, 3, 5, 8, 9]

// 二分探索（ソート済み配列が前提）
int idx = Arrays.binarySearch(nums, 5);
System.out.println(idx);  // 2（インデックス）

// コピー
int[] copy = Arrays.copyOf(nums, 3);     // [1, 3, 5]
int[] range = Arrays.copyOfRange(nums, 1, 4); // [3, 5, 8]

// Arrays.asList() の注意点
String[] arr = {"A", "B", "C"};
List<String> list = Arrays.asList(arr);
list.set(0, "X");     // OK: 要素の変更はできる
// list.add("D");      // UnsupportedOperationException: サイズ変更不可
System.out.println(arr[0]);  // "X"（元の配列も変わる！）

// compare（Java 9+）
int[] a = {1, 2, 3};
int[] b = {1, 2, 4};
System.out.println(Arrays.compare(a, b));  // 負の値（a < b）

// mismatch（Java 9+）
System.out.println(Arrays.mismatch(a, b)); // 2（最初に異なるインデックス）`,
      },
    ],
  },
  {
    id: "silver-lambda",
    title: "ラムダ式とモジュール",
    description: "関数型インターフェース、ラムダ式、モジュールシステム基礎",
    category: "silver",
    sections: [
      {
        title: "ラムダ式の基本",
        content:
          "ラムダ式は関数型インターフェース（抽象メソッドが1つだけのインターフェース）のインスタンスを簡潔に記述する構文です。(引数) -> {処理}の形式で書き、引数の型は推論可能なら省略できます。引数が1つの場合はカッコも省略可能です。処理が1文なら中括弧とreturnも省略できます。Silver試験ではラムダ式の構文ルールと、ローカル変数の実質的final制約が頻出です。",
        code: `// 関数型インターフェース
@FunctionalInterface
interface Greeting {
    String greet(String name);
}

// ラムダ式の省略パターン
Greeting g1 = (String name) -> { return "Hello, " + name; };  // フル記法
Greeting g2 = (name) -> { return "Hello, " + name; };         // 型省略
Greeting g3 = name -> "Hello, " + name;                        // 最大省略

System.out.println(g3.greet("Java"));  // "Hello, Java"

// 引数なし・複数引数
Runnable r = () -> System.out.println("実行");
Comparator<String> comp = (a, b) -> a.length() - b.length();

// 実質的final（effectively final）
int base = 100;  // この後変更しなければラムダ内で使える
Greeting g4 = name -> name + "(" + base + ")";
// base = 200;  // これがあるとラムダ内でbaseを使えない（コンパイルエラー）

// ラムダ式とスコープ
// ラムダ内のthisは外側のクラスのインスタンスを指す（匿名クラスとは異なる）`,
      },
      {
        title: "標準関数型インターフェース",
        content:
          "java.util.functionパッケージに汎用的な関数型インターフェースが定義されています。Predicate<T>（T→boolean）、Consumer<T>（T→void）、Function<T,R>（T→R）、Supplier<T>（()→T）、UnaryOperator<T>（T→T）が代表的です。Silver試験ではこれらのメソッド名（test、accept、apply、get）と、andThen/compose/and/orなどの合成メソッドが出題されます。",
        code: `import java.util.function.*;

// Predicate<T> — T を受け取り boolean を返す
Predicate<String> isLong = s -> s.length() > 5;
System.out.println(isLong.test("Java"));   // false
System.out.println(isLong.test("JavaScript")); // true

// Predicateの合成
Predicate<String> startsJ = s -> s.startsWith("J");
Predicate<String> combined = isLong.and(startsJ);
System.out.println(combined.test("JavaScript")); // true

// Consumer<T> — T を受け取り何も返さない
Consumer<String> printer = s -> System.out.println(">> " + s);
printer.accept("Hello");  // >> Hello

// Function<T, R> — T を受け取り R を返す
Function<String, Integer> toLen = String::length;
System.out.println(toLen.apply("Java"));  // 4

// andThen / compose
Function<Integer, Integer> doubleIt = x -> x * 2;
Function<Integer, Integer> addTen = x -> x + 10;
System.out.println(doubleIt.andThen(addTen).apply(5));  // 20 (5*2=10, 10+10=20)
System.out.println(doubleIt.compose(addTen).apply(5));  // 30 (5+10=15, 15*2=30)

// Supplier<T> — 引数なしで T を返す
Supplier<LocalDate> today = LocalDate::now;
System.out.println(today.get());`,
      },
      {
        title: "モジュールシステム基礎",
        content:
          "Java 9以降のモジュールシステム（JPMS）はパッケージの公開範囲を制御します。module-info.javaファイルでモジュールを定義し、exportsで公開パッケージ、requiresで依存モジュールを宣言します。Silver試験ではモジュール定義の基本構文、exportsとrequiresの関係、コンパイル・実行時のモジュールパス指定が出題されます。",
        code: `// module-info.java（モジュール定義）
// src/com.myapp/module-info.java
module com.myapp {
    requires java.sql;           // java.sqlモジュールに依存
    requires transitive java.logging; // 推移的依存（このモジュールの利用者にも公開）
    exports com.myapp.api;       // com.myapp.apiパッケージを公開
    exports com.myapp.util to com.other; // 特定モジュールにのみ公開
}

// コンパイルと実行
// javac --module-source-path src -d out -m com.myapp
// java --module-path out -m com.myapp/com.myapp.Main

// 主要な標準モジュール
// java.base   — 自動的にrequired（明示不要）
// java.sql    — JDBC
// java.logging — ロギング
// java.desktop — Swing/AWT

// モジュールが未定義の場合（クラスパスモード）
// → 従来通りすべてのクラスにアクセス可能（unnamed module）

// jdeps でモジュール依存関係を分析
// jdeps --module-path libs -s myapp.jar`,
      },
    ],
  },
  {
    id: "silver-exam",
    title: "Silver試験対策",
    description: "出題傾向、頻出パターン、模擬問題で合格力を養成",
    category: "silver",
    sections: [
      {
        title: "試験概要と対策",
        content:
          "Oracle Certified Java Programmer Silver（Java SE 11/17）は中級レベルの資格です。試験時間180分、80問出題で約63%の正答率で合格です。Bronze範囲に加え、例外処理、ラムダ式、日時API、モジュールシステムが出題されます。特にコードの実行結果を正確にトレースする力が必要で、コンパイルエラーか実行時エラーかを見分ける問題が多く出ます。",
        code: `// ★Silver頻出：コンパイルエラーの見分け
// 問題：このコードはコンパイルエラー？実行時エラー？正常？

// パターン1: チェック例外のcatch漏れ
// void readFile() {
//     new FileInputStream("test.txt");  // コンパイルエラー: IOException未処理
// }

// パターン2: オーバーライドの条件違反
class Parent { void process() throws IOException { } }
class Child extends Parent {
    // void process() throws Exception { }  // コンパイルエラー: 例外を広げられない
    void process() throws FileNotFoundException { }  // OK: 狭められる
    // void process() throws SQLException { }  // コンパイルエラー: 無関係な例外
}

// パターン3: finalの再代入
final int x = 10;
// x = 20;  // コンパイルエラー

final List<String> list = new ArrayList<>();
list.add("OK");  // OK: 参照先の変更は可能
// list = new ArrayList<>();  // コンパイルエラー: 参照の再代入は不可`,
      },
      {
        title: "頻出ひっかけ問題",
        content:
          "Silver試験では細かい構文ルールの知識が問われます。特に注意すべきポイントは、①varの使用制限、②switch式のカバレッジ（すべてのケースを網羅する必要）、③ラムダ式の変数キャプチャ制約、④DateTimeAPIのイミュータブル性、⑤try-with-resourcesのclose順序です。コードを丁寧にトレースし、各選択肢を消去法で絞りましょう。",
        code: `// ★ varの使用制限
var x = 10;           // OK
// var y;              // コンパイルエラー: 初期値必要
// var z = null;       // コンパイルエラー: 型推論不能
// var w = {1, 2, 3};  // コンパイルエラー: 配列初期化子は不可
var arr = new int[]{1, 2, 3}; // OK

// ★ switch式のカバレッジ
// enum Season { SPRING, SUMMER, FALL, WINTER }
// String s = switch(season) {
//     case SPRING -> "春";
//     case SUMMER -> "夏";
//     // コンパイルエラー: FALLとWINTERがない（switch式は網羅必須）
// };

// ★ try-with-resourcesのclose順序
class A implements AutoCloseable {
    public void close() { System.out.print("A "); }
}
class B implements AutoCloseable {
    public void close() { System.out.print("B "); }
}
try (var a = new A(); var b = new B()) {
    System.out.print("try ");
}
// 出力: "try B A "（宣言と逆順でclose）

// ★ String操作の戻り値を使わないミス
String s = "hello";
s.toUpperCase();          // 戻り値を捨てている！
System.out.println(s);    // "hello"（変わらない）
s = s.toUpperCase();      // 正しい使い方
System.out.println(s);    // "HELLO"`,
      },
      {
        title: "模擬問題と解説",
        content:
          "Silver試験は選択式で、「正しいものを1つ/2つ選べ」「コンパイルエラーになるのはどれか」「出力結果は何か」の形式が中心です。解答テクニックとして、①まずコンパイルエラーを除外する、②残りの選択肢で実行時の挙動をトレースする、③例外の種類（チェック/非チェック）を確認する、の3ステップが有効です。時間配分は1問あたり約2分が目安です。",
        code: `// 【模擬問題1】出力結果を答えよ
var list = new ArrayList<>(List.of("a", "b", "c"));
list.removeIf(s -> s.equals("b"));
list.replaceAll(String::toUpperCase);
System.out.println(list);
// 答え: [A, C]

// 【模擬問題2】コンパイルエラーはどれ？
// A: Predicate<String> p = s -> s.isEmpty();   // OK
// B: Predicate<String> p = String::isEmpty;     // OK（メソッド参照）
// C: Function<String> f = s -> s.length();      // エラー: Function<T,R>は2型引数必要
// D: Consumer<String> c = System.out::println;  // OK
// 答え: C

// 【模擬問題3】出力結果を答えよ
interface Calc {
    int compute(int a, int b);
}
Calc add = (a, b) -> a + b;
Calc mul = (a, b) -> a * b;
System.out.println(add.compute(mul.compute(2, 3), 4));
// 答え: 10（mul: 2*3=6, add: 6+4=10）

// 【模擬問題4】出力結果を答えよ
LocalDate d = LocalDate.of(2025, 1, 31);
d = d.plusMonths(1);
System.out.println(d);
// 答え: 2025-02-28（1月31日+1ヶ月→2月28日に自動調整）`,
      },
    ],
  },

  // ── Gold ──
  {
    id: "gold-generics",
    title: "ジェネリクスとコレクション",
    description: "型パラメータ、ワイルドカード、List/Set/Map/Deque",
    category: "gold",
    sections: [
      {
        title: "ジェネリクスの基本と境界",
        content:
          "ジェネリクスは型安全なコレクションやメソッドを実現するための仕組みです。型パラメータ<T>でクラスやメソッドに型を柔軟に指定できます。上限境界（<T extends Number>）でTをNumberのサブクラスに制限し、下限境界は使えません。ジェネリクメソッドはメソッドレベルで型パラメータを定義でき、呼び出し時に型推論されます。型消去（type erasure）によりジェネリクスの型情報はコンパイル後に消えます。",
        code: `// ジェネリクスクラス
class Box<T> {
    private T value;
    Box(T value) { this.value = value; }
    T get() { return value; }
}

Box<String> stringBox = new Box<>("Hello");
Box<Integer> intBox = new Box<>(42);

// 上限境界
class NumberBox<T extends Number> {
    T value;
    NumberBox(T value) { this.value = value; }
    double doubleValue() { return value.doubleValue(); }
}
// NumberBox<String> nb = ...;  // コンパイルエラー: StringはNumberのサブクラスではない

// ジェネリクスメソッド
static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}
System.out.println(max(3, 7));       // 7
System.out.println(max("abc", "xyz")); // "xyz"

// 型消去の影響
// List<String>とList<Integer>は実行時は同じList型
// → instanceof List<String> は不可
// → new T() や new T[] は不可`,
      },
      {
        title: "ワイルドカード",
        content:
          "ワイルドカード<?>は不特定の型を表します。上限ワイルドカード（<? extends Number>）は読み取り専用（プロデューサー）、下限ワイルドカード（<? super Integer>）は書き込み可能（コンシューマー）として使います。PECS原則（Producer-Extends, Consumer-Super）が設計の指針です。Gold試験ではワイルドカードを使ったメソッドの引数でどの操作が可能かを問う問題が頻出です。",
        code: `// 上限ワイルドカード（Producer Extends）— 読み取り向き
static double sum(List<? extends Number> list) {
    double total = 0;
    for (Number n : list) {
        total += n.doubleValue();  // Number型として読める
    }
    // list.add(1);  // コンパイルエラー: ? extends Number には追加不可
    return total;
}
sum(List.of(1, 2, 3));      // OK: List<Integer>
sum(List.of(1.0, 2.0, 3.0)); // OK: List<Double>

// 下限ワイルドカード（Consumer Super）— 書き込み向き
static void addIntegers(List<? super Integer> list) {
    list.add(1);    // OK: Integer以下を追加可能
    list.add(2);
    // Integer x = list.get(0);  // コンパイルエラー: 取得はObject型
    Object obj = list.get(0);    // OK
}
addIntegers(new ArrayList<Number>());  // OK
addIntegers(new ArrayList<Object>());  // OK
// addIntegers(new ArrayList<Double>()); // コンパイルエラー

// 非境界ワイルドカード
static void printAll(List<?> list) {
    for (Object o : list) System.out.println(o);  // 読み取りのみ
}`,
      },
      {
        title: "コレクションフレームワーク",
        content:
          "主要なコレクションインターフェースはList（順序付き、重複可）、Set（重複不可）、Map（キーと値のペア）、Queue/Deque（キュー/両端キュー）です。各インターフェースに複数の実装クラスがあり、用途によって使い分けます。Collections.unmodifiableList()やList.of()で不変コレクションを作成できます。Gold試験ではTreeSet/TreeMapのソート順、LinkedHashSet/LinkedHashMapの挿入順保持が頻出です。",
        code: `import java.util.*;

// List実装の比較
List<String> arrayList = new ArrayList<>();  // ランダムアクセスO(1)
List<String> linkedList = new LinkedList<>(); // 挿入削除O(1)

// Set実装の比較
Set<String> hashSet = new HashSet<>();       // 順不同
Set<String> linkedHashSet = new LinkedHashSet<>(); // 挿入順
Set<String> treeSet = new TreeSet<>();       // 自然順序（ソート済み）

treeSet.addAll(List.of("banana", "apple", "cherry"));
System.out.println(treeSet);  // [apple, banana, cherry]

// Map実装
Map<String, Integer> map = new TreeMap<>();
map.put("c", 3); map.put("a", 1); map.put("b", 2);
System.out.println(map);  // {a=1, b=2, c=3}（キーでソート）

// Deque（両端キュー）
Deque<String> deque = new ArrayDeque<>();
deque.offerFirst("A");  // 先頭に追加
deque.offerLast("B");   // 末尾に追加
deque.offerFirst("C");
System.out.println(deque); // [C, A, B]

// 不変コレクション（Java 9+）
List<String> immutable = List.of("a", "b", "c");
// immutable.add("d");  // UnsupportedOperationException
// immutable.set(0, "x"); // UnsupportedOperationException`,
      },
    ],
  },
  {
    id: "gold-stream",
    title: "Stream API",
    description: "ストリーム生成、中間操作、終端操作、Collector",
    category: "gold",
    sections: [
      {
        title: "ストリームの生成と中間操作",
        content:
          "Stream APIは要素のシーケンスに対する関数型スタイルの操作を提供します。ストリームは一度しか消費できず、元のデータソースを変更しません。中間操作（filter、map、flatMap、sorted、distinct、peek、limit、skip）は遅延評価され、終端操作が呼ばれるまで実行されません。Gold試験ではストリームの遅延評価の挙動と、各中間操作の特性が頻出です。",
        code: `import java.util.stream.*;
import java.util.*;

// ストリーム生成
Stream<String> s1 = List.of("a", "b", "c").stream();
Stream<Integer> s2 = Stream.of(1, 2, 3, 4, 5);
IntStream s3 = IntStream.rangeClosed(1, 10);  // 1〜10
Stream<String> s4 = Stream.generate(() -> "hello").limit(3);

// 中間操作（遅延評価）
List<String> result = List.of("Java", "Go", "Python", "JavaScript", "C")
    .stream()
    .filter(s -> s.length() > 2)         // 3文字以上
    .map(String::toUpperCase)            // 大文字変換
    .sorted()                            // ソート
    .collect(Collectors.toList());
System.out.println(result);  // [GO と C は除外 → JAVA, JAVASCRIPT, PYTHON]

// flatMap（ネストの平坦化）
List<List<Integer>> nested = List.of(List.of(1,2), List.of(3,4), List.of(5));
List<Integer> flat = nested.stream()
    .flatMap(Collection::stream)
    .collect(Collectors.toList());
System.out.println(flat);  // [1, 2, 3, 4, 5]

// 遅延評価の確認
Stream.of("a", "b", "c", "d")
    .peek(s -> System.out.println("peek: " + s))
    .filter(s -> !s.equals("b"))
    .limit(2)
    .forEach(s -> System.out.println("result: " + s));
// peek: a → result: a → peek: b → peek: c → result: c（2件で終了）`,
      },
      {
        title: "終端操作とOptional",
        content:
          "終端操作はストリームを消費して結果を生成します。forEach（各要素に処理）、collect（コレクションに変換）、reduce（畳み込み）、count/min/max/sum/average（集計）、anyMatch/allMatch/noneMatch（条件判定）、findFirst/findAny（要素取得）があります。Optional<T>はnullの代わりに「値の有無」を表現するラッパークラスで、map/flatMap/orElse/orElseThrowなどのメソッドを持ちます。",
        code: `// reduce（畳み込み）
int sum = IntStream.rangeClosed(1, 10)
    .reduce(0, Integer::sum);  // 55

Optional<String> longest = List.of("Java", "Go", "Python")
    .stream()
    .reduce((a, b) -> a.length() >= b.length() ? a : b);
System.out.println(longest.orElse("empty"));  // "Python"

// 条件判定
boolean anyLong = List.of("a", "bb", "ccc").stream()
    .anyMatch(s -> s.length() > 2);  // true

// Optional
Optional<String> opt = Optional.of("Java");
System.out.println(opt.isPresent());  // true
System.out.println(opt.get());        // "Java"
System.out.println(opt.map(String::toUpperCase).orElse("N/A")); // "JAVA"

Optional<String> empty = Optional.empty();
System.out.println(empty.orElse("default"));        // "default"
System.out.println(empty.orElseGet(() -> "lazy"));  // "lazy"
// empty.orElseThrow();  // NoSuchElementException

// OptionalのflatMap
Optional<String> name = Optional.of("  Java  ");
Optional<String> trimmed = name.flatMap(s ->
    s.isBlank() ? Optional.empty() : Optional.of(s.strip()));
System.out.println(trimmed);  // Optional[Java]`,
      },
      {
        title: "Collectorsの活用",
        content:
          "Collectorsクラスはcollect()終端操作で使う多様なコレクター（収集器）を提供します。toList()、toSet()、toMap()、joining()、groupingBy()、partitioningBy()、counting()、summarizing*()など。Gold試験ではgroupingByの多段グループ化、toMapのキー衝突時のマージ関数、下流コレクターの組み合わせが頻出です。",
        code: `import java.util.stream.Collectors;

record Employee(String name, String dept, int salary) {}

List<Employee> emps = List.of(
    new Employee("田中", "開発", 500),
    new Employee("佐藤", "営業", 400),
    new Employee("鈴木", "開発", 600),
    new Employee("高橋", "営業", 450)
);

// groupingBy
Map<String, List<Employee>> byDept = emps.stream()
    .collect(Collectors.groupingBy(Employee::dept));
// {開発=[田中, 鈴木], 営業=[佐藤, 高橋]}

// groupingBy + 下流コレクター
Map<String, Double> avgSalary = emps.stream()
    .collect(Collectors.groupingBy(
        Employee::dept,
        Collectors.averagingInt(Employee::salary)
    ));
// {開発=550.0, 営業=425.0}

// partitioningBy（true/falseの2グループ）
Map<Boolean, List<Employee>> partition = emps.stream()
    .collect(Collectors.partitioningBy(e -> e.salary() >= 500));

// toMap（キー衝突時のマージ関数）
Map<String, Integer> maxSalaryByDept = emps.stream()
    .collect(Collectors.toMap(
        Employee::dept, Employee::salary,
        Integer::max  // キー衝突時は大きい方を採用
    ));
// {開発=600, 営業=450}

// joining
String names = emps.stream()
    .map(Employee::name)
    .collect(Collectors.joining(", ", "[", "]"));
// "[田中, 佐藤, 鈴木, 高橋]"`,
      },
    ],
  },
  {
    id: "gold-concurrency",
    title: "並行処理",
    description: "ExecutorService、Future、synchronized、Concurrent API",
    category: "gold",
    sections: [
      {
        title: "スレッドとExecutorService",
        content:
          "Javaの並行処理はThreadクラスとRunnableインターフェースが基本です。しかし直接Threadを管理するのは非効率なため、ExecutorServiceによるスレッドプール管理が推奨されます。Executors.newFixedThreadPool()で固定サイズ、newCachedThreadPool()で可変サイズ、newSingleThreadExecutor()で単一スレッドのプールを作成します。submit()でタスクを投入し、Future<T>で結果を非同期に取得します。",
        code: `import java.util.concurrent.*;

// ExecutorServiceの基本
ExecutorService executor = Executors.newFixedThreadPool(3);

// Runnable（戻り値なし）
executor.submit(() -> {
    System.out.println(Thread.currentThread().getName() + ": 処理中");
});

// Callable<T>（戻り値あり）
Future<Integer> future = executor.submit(() -> {
    Thread.sleep(1000);
    return 42;
});

System.out.println(future.isDone());    // false
System.out.println(future.get());       // 42（完了まで待機）
System.out.println(future.isDone());    // true

// 複数タスクの実行
List<Future<String>> futures = executor.invokeAll(List.of(
    () -> "Task 1",
    () -> "Task 2",
    () -> "Task 3"
));
for (Future<String> f : futures) {
    System.out.println(f.get());
}

// 必ずシャットダウン
executor.shutdown();
executor.awaitTermination(10, TimeUnit.SECONDS);`,
      },
      {
        title: "同期とスレッドセーフ",
        content:
          "複数スレッドが同じデータにアクセスする場合、レースコンディション（競合状態）が発生する可能性があります。synchronizedキーワードでクリティカルセクションを保護し、AtomicInteger等のアトミッククラスでロックなしのスレッドセーフ操作を実現します。volatileキーワードはメモリの可視性を保証します。Gold試験ではデッドロックの発生条件と回避方法も問われます。",
        code: `import java.util.concurrent.atomic.*;

// synchronizedメソッド
class Counter {
    private int count = 0;

    synchronized void increment() {
        count++;  // これでスレッドセーフ
    }

    synchronized int getCount() {
        return count;
    }
}

// synchronizedブロック
class SafeList {
    private final List<String> list = new ArrayList<>();
    private final Object lock = new Object();

    void add(String item) {
        synchronized (lock) {
            list.add(item);
        }
    }
}

// AtomicInteger（ロックフリー）
AtomicInteger atomicCount = new AtomicInteger(0);
atomicCount.incrementAndGet();  // スレッドセーフなインクリメント
atomicCount.compareAndSet(1, 10);  // CAS操作
System.out.println(atomicCount.get());  // 10

// ConcurrentHashMap（スレッドセーフなMap）
ConcurrentMap<String, Integer> map = new ConcurrentHashMap<>();
map.put("a", 1);
map.computeIfAbsent("b", k -> 2);  // アトミックな条件付き追加
map.merge("a", 10, Integer::sum);   // アトミックなマージ
System.out.println(map);  // {a=11, b=2}`,
      },
      {
        title: "並列ストリームとFork/Join",
        content:
          "parallelStream()またはstream().parallel()で並列ストリームを作成できます。並列ストリームは内部的にFork/Joinフレームワークを使い、要素を分割して複数スレッドで処理します。ただし、順序依存の処理やスレッドセーフでないコレクションでは正しく動作しない場合があります。Gold試験ではreduce()の結合規則（associativity）と並列ストリームの注意点が出題されます。",
        code: `// 並列ストリーム
long count = IntStream.rangeClosed(1, 1_000_000)
    .parallel()
    .filter(n -> n % 2 == 0)
    .count();
System.out.println(count);  // 500000

// reduceの結合規則（並列安全な条件）
// identity: reduce(identity, accumulator) の第1引数
// (identity op x) = x を満たす必要がある
int sum = List.of(1, 2, 3, 4, 5).parallelStream()
    .reduce(0, Integer::sum);  // OK: 0 + x = x
System.out.println(sum);  // 15

// NG例: 並列で正しく動かないreduce
// int wrong = List.of(1, 2, 3, 4, 5).parallelStream()
//     .reduce(10, Integer::sum);
// → 各スレッドがidentity(10)から始めるため結果が不正

// forEachOrdered（順序保証付き並列処理）
List.of("a", "b", "c", "d").parallelStream()
    .map(String::toUpperCase)
    .forEachOrdered(System.out::print);  // "ABCD"（順序保証）

// CopyOnWriteArrayList（並列ストリーム向け）
List<Integer> safeList = new CopyOnWriteArrayList<>();
IntStream.rangeClosed(1, 100).parallel()
    .forEach(safeList::add);
System.out.println(safeList.size());  // 100（スレッドセーフ）`,
      },
    ],
  },
  {
    id: "gold-io",
    title: "I/O・NIO.2・JDBC",
    description: "ファイル操作、NIO.2 API、JDBC基礎",
    category: "gold",
    sections: [
      {
        title: "I/Oストリーム",
        content:
          "JavaのI/Oはバイトストリーム（InputStream/OutputStream）と文字ストリーム（Reader/Writer）に大別されます。BufferedReader/BufferedWriterでバッファリングによる効率化、PrintWriterで書式付き出力が可能です。try-with-resourcesでリソースを確実にクローズすることが推奨されます。Gold試験ではストリームのラップ（デコレータパターン）とシリアライズが出題されます。",
        code: `import java.io.*;

// テキストファイルの読み書き
try (var writer = new BufferedWriter(new FileWriter("output.txt"))) {
    writer.write("Hello Java\\n");
    writer.write("Gold Exam\\n");
}

try (var reader = new BufferedReader(new FileReader("output.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
}

// シリアライズ（オブジェクトの永続化）
class User implements Serializable {
    private static final long serialVersionUID = 1L;
    String name;
    transient String password;  // transient: シリアライズ対象外
    User(String name, String password) {
        this.name = name;
        this.password = password;
    }
}

// 書き込み
try (var oos = new ObjectOutputStream(new FileOutputStream("user.dat"))) {
    oos.writeObject(new User("admin", "secret"));
}

// 読み込み
try (var ois = new ObjectInputStream(new FileInputStream("user.dat"))) {
    User user = (User) ois.readObject();
    System.out.println(user.name);     // "admin"
    System.out.println(user.password); // null（transient）
}`,
      },
      {
        title: "NIO.2（java.nio.file）",
        content:
          "NIO.2はJava 7以降のファイル操作APIで、PathとFilesクラスが中心です。Path.of()でパスを作成し、Files.readString()、Files.writeString()、Files.lines()で簡潔にファイル操作できます。Files.walk()でディレクトリツリーを再帰的に走査し、Files.find()で条件に合うファイルを検索します。Gold試験ではパスの正規化（normalize）と相対パス解決（resolve/relativize）が頻出です。",
        code: `import java.nio.file.*;

// Pathの操作
Path p = Path.of("/home/user/docs/file.txt");
System.out.println(p.getFileName());    // file.txt
System.out.println(p.getParent());      // /home/user/docs
System.out.println(p.getNameCount());   // 4
System.out.println(p.getName(1));       // user

// パスの正規化と解決
Path p1 = Path.of("/home/user/../user/docs");
System.out.println(p1.normalize());     // /home/user/docs

Path base = Path.of("/home/user");
Path resolved = base.resolve("docs/file.txt");  // /home/user/docs/file.txt
Path relative = base.relativize(Path.of("/home/user/docs"));  // docs

// ファイル操作（Java 11+）
Files.writeString(Path.of("test.txt"), "Hello NIO.2");
String content = Files.readString(Path.of("test.txt"));

// ファイル一覧（Stream）
try (var stream = Files.list(Path.of("."))) {
    stream.filter(Files::isRegularFile)
          .forEach(System.out::println);
}

// ディレクトリの再帰走査
try (var walk = Files.walk(Path.of("/home/user"), 3)) {
    walk.filter(f -> f.toString().endsWith(".java"))
        .forEach(System.out::println);
}`,
      },
      {
        title: "JDBC基礎",
        content:
          "JDBC（Java Database Connectivity）はリレーショナルデータベースへの標準APIです。DriverManagerでConnection取得、PreparedStatementでパラメータ付きSQL実行、ResultSetで結果セット操作を行います。executeQuery()はSELECT用、executeUpdate()はINSERT/UPDATE/DELETE用です。Gold試験ではAutoCommit、トランザクション管理、SavePointが出題されます。",
        code: `import java.sql.*;

// データベース接続と操作
String url = "jdbc:mysql://localhost:3306/mydb";
try (Connection conn = DriverManager.getConnection(url, "user", "pass")) {

    // PreparedStatement（SQLインジェクション対策）
    String sql = "SELECT id, name, age FROM users WHERE age >= ?";
    try (PreparedStatement ps = conn.prepareStatement(sql)) {
        ps.setInt(1, 20);
        try (ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                int age = rs.getInt("age");
                System.out.printf("%d: %s (%d)%n", id, name, age);
            }
        }
    }

    // トランザクション管理
    conn.setAutoCommit(false);  // 自動コミットを無効化
    try {
        PreparedStatement ps1 = conn.prepareStatement(
            "UPDATE accounts SET balance = balance - ? WHERE id = ?");
        ps1.setInt(1, 1000); ps1.setInt(2, 1);
        ps1.executeUpdate();

        Savepoint sp = conn.setSavepoint("afterDebit");

        PreparedStatement ps2 = conn.prepareStatement(
            "UPDATE accounts SET balance = balance + ? WHERE id = ?");
        ps2.setInt(1, 1000); ps2.setInt(2, 2);
        ps2.executeUpdate();

        conn.commit();
    } catch (SQLException e) {
        conn.rollback();  // エラー時はロールバック
    }
}`,
      },
    ],
  },
  {
    id: "gold-advanced",
    title: "モジュール・アノテーション・ローカライゼーション",
    description: "サービスプロバイダ、アノテーション、Locale・ResourceBundle",
    category: "gold",
    sections: [
      {
        title: "モジュールの詳細",
        content:
          "Gold試験ではSilverより深いモジュール知識が求められます。サービスプロバイダインターフェース（SPI）パターンでは、usesでインターフェースを消費し、providesで実装を登録します。ServiceLoaderで実行時にプロバイダを検出・読み込みします。opensはリフレクションアクセスを許可するディレクティブで、JPAやJacksonなどのフレームワークで必要です。",
        code: `// サービスプロバイダパターン

// ---- API モジュール ----
// module com.myapp.api {
//     exports com.myapp.api;
// }
// public interface MessageService {
//     String getMessage();
// }

// ---- プロバイダモジュール ----
// module com.myapp.provider {
//     requires com.myapp.api;
//     provides com.myapp.api.MessageService
//         with com.myapp.provider.JapaneseMessageService;
// }
// public class JapaneseMessageService implements MessageService {
//     public String getMessage() { return "こんにちは"; }
// }

// ---- アプリモジュール ----
// module com.myapp.main {
//     requires com.myapp.api;
//     uses com.myapp.api.MessageService;
// }
import java.util.ServiceLoader;
ServiceLoader<MessageService> loader = ServiceLoader.load(MessageService.class);
loader.findFirst().ifPresent(svc ->
    System.out.println(svc.getMessage())  // "こんにちは"
);

// opens（リフレクション用）
// module com.myapp {
//     opens com.myapp.model to com.fasterxml.jackson.databind;
// }`,
      },
      {
        title: "アノテーション",
        content:
          "アノテーションはメタデータをコードに付与する仕組みです。カスタムアノテーションは@interfaceで定義し、@Target（適用先）、@Retention（保持期間）、@Documented、@Inherited、@Repeatable等のメタアノテーションで属性を指定します。RetentionPolicyはSOURCE（コンパイル時破棄）、CLASS（クラスファイルに残る）、RUNTIME（実行時に参照可能）の3段階です。",
        code: `import java.lang.annotation.*;

// カスタムアノテーションの定義
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@interface Audit {
    String author();
    String date();
    String description() default "";  // デフォルト値
}

// アノテーションの使用
class UserService {
    @Audit(author = "tanaka", date = "2025-01-15", description = "ユーザー作成")
    public void createUser(String name) {
        // 処理
    }
}

// リフレクションでアノテーション情報を取得
for (var method : UserService.class.getDeclaredMethods()) {
    if (method.isAnnotationPresent(Audit.class)) {
        Audit audit = method.getAnnotation(Audit.class);
        System.out.printf("メソッド: %s, 作者: %s, 日付: %s%n",
            method.getName(), audit.author(), audit.date());
    }
}

// @Repeatable（繰り返し可能アノテーション）
@Repeatable(Roles.class)
@interface Role { String value(); }
@interface Roles { Role[] value(); }

@Role("admin") @Role("user")
class AdminUser { }`,
      },
      {
        title: "ローカライゼーション",
        content:
          "ローカライゼーションはアプリケーションを複数の言語・地域に対応させる仕組みです。Localeクラスで言語と国を指定し、ResourceBundleでロケール別のプロパティファイルからメッセージを取得します。NumberFormat、DateTimeFormatter、MessageFormatでロケール固有の書式化を行います。Gold試験ではResourceBundleの検索順序とフォールバック機構が頻出です。",
        code: `import java.util.*;
import java.text.*;
import java.time.format.*;

// Locale
Locale ja = Locale.JAPAN;           // ja_JP
Locale us = Locale.US;              // en_US
Locale custom = new Locale("ko", "KR"); // ko_KR

// ResourceBundle
// messages_ja.properties: greeting=こんにちは
// messages_en.properties: greeting=Hello
// messages.properties:    greeting=Hi（デフォルト）

ResourceBundle bundle = ResourceBundle.getBundle("messages", Locale.JAPAN);
System.out.println(bundle.getString("greeting"));  // "こんにちは"

// 検索順序: messages_ja_JP → messages_ja → messages_en_US（デフォルトロケール）→ messages

// NumberFormat
NumberFormat nf = NumberFormat.getCurrencyInstance(Locale.JAPAN);
System.out.println(nf.format(1234567));  // "¥1,234,567"

NumberFormat nfUS = NumberFormat.getCurrencyInstance(Locale.US);
System.out.println(nfUS.format(1234.5)); // "$1,234.50"

// DateTimeFormatter with Locale
var formatter = DateTimeFormatter
    .ofLocalizedDate(FormatStyle.FULL)
    .withLocale(Locale.JAPAN);
System.out.println(LocalDate.now().format(formatter));
// "2025年3月15日土曜日"`,
      },
    ],
  },
  {
    id: "gold-exam",
    title: "Gold試験対策",
    description: "出題傾向、頻出パターン、模擬問題で合格力を養成",
    category: "gold",
    sections: [
      {
        title: "試験概要と対策",
        content:
          "Oracle Certified Java Programmer Gold（Java SE 11/17）はJava上級者向けの資格で、Silver合格が前提です。試験時間180分、80問出題で約63%の正答率で合格です。Silver範囲に加え、ジェネリクス、Stream API、並行処理、I/O・NIO.2、JDBC、モジュール詳細、アノテーション、ローカライゼーションが範囲です。特にStream APIとジェネリクスのワイルドカードが難問として多く出題されます。",
        code: `// ★Gold頻出：Streamの遅延評価を理解する
// 問題：次のコードの出力は？
Stream.of("a", "b", "c", "d", "e")
    .peek(s -> System.out.print("1:" + s + " "))
    .filter(s -> {
        System.out.print("2:" + s + " ");
        return !s.equals("c");
    })
    .peek(s -> System.out.print("3:" + s + " "))
    .limit(2)
    .forEach(s -> System.out.print("4:" + s + " "));
// 出力:
// 1:a 2:a 3:a 4:a 1:b 2:b 3:b 4:b
// （2件取得した時点で終了。c,d,eは処理されない）

// ★Gold頻出：ジェネリクスのワイルドカード
// List<? extends Number> → 読み取り可、書き込み不可
// List<? super Integer>  → 書き込み可、読み取りはObject型`,
      },
      {
        title: "頻出ひっかけ問題",
        content:
          "Gold試験では複合的な知識を問う問題が多く、複数トピックの理解が必要です。特に注意すべきは、①Collectorsのメソッドの戻り値型、②parallelStream()でのreduce()のidentity問題、③NIO.2のPath.resolve()とrelativize()の挙動、④モジュールのアクセシビリティ（exportsしていないパッケージへのアクセス）、⑤JDBCのAutoCommitとSavePointの関係です。",
        code: `// ★ Collectors.toMap のキー衝突
List.of("apple", "avocado", "banana").stream()
    .collect(Collectors.toMap(
        s -> s.charAt(0),  // キー: 先頭文字
        s -> s             // 値: 文字列
    ));
// → IllegalStateException: 'a'でキー衝突
// 対策: 第3引数にマージ関数を指定
// (existing, replacement) -> existing

// ★ Path.resolve() と relativize()
Path p1 = Path.of("/home/user");
Path p2 = Path.of("docs/file.txt");
System.out.println(p1.resolve(p2));    // /home/user/docs/file.txt
System.out.println(p1.resolve("/etc")); // /etc（絶対パスを渡すとそのまま）

Path a = Path.of("/a/b");
Path b = Path.of("/a/b/c/d");
System.out.println(a.relativize(b));   // c/d
System.out.println(b.relativize(a));   // ../..

// ★ ConcurrentModificationException
List<String> list = new ArrayList<>(List.of("a", "b", "c"));
// for (String s : list) {
//     if (s.equals("b")) list.remove(s);  // ConcurrentModificationException
// }
// 正しい方法:
list.removeIf(s -> s.equals("b"));  // OK`,
      },
      {
        title: "模擬問題と解説",
        content:
          "Gold試験は選択式で、コードの実行結果、コンパイルエラー箇所の特定、正しい実装の選択が中心です。解答テクニックとして、①ジェネリクス問題は型の互換性を紙に書いて確認する、②Stream問題は各中間操作後の型を追跡する、③並行処理問題はスレッドの実行順序が不定であることを意識する、④Path問題は具体的なパス文字列を書いてトレースする、の4つが有効です。",
        code: `// 【模擬問題1】コンパイルエラーはどこ？
List<Number> nums = new ArrayList<>();
nums.add(1);           // OK: Integer は Number のサブ型
nums.add(1.5);         // OK: Double は Number のサブ型
// List<Integer> ints = nums;  // コンパイルエラー: List<Number> ≠ List<Integer>

// 【模擬問題2】出力結果を答えよ
Map<String, Long> result = List.of("aa", "bb", "aa", "cc", "bb", "aa")
    .stream()
    .collect(Collectors.groupingBy(s -> s, Collectors.counting()));
System.out.println(result);
// 答え: {aa=3, bb=2, cc=1}

// 【模擬問題3】出力結果を答えよ
Optional<String> opt = Optional.of("Java");
System.out.println(
    opt.filter(s -> s.length() > 5)
       .map(String::toUpperCase)
       .orElse("short")
);
// 答え: "short"（"Java"は5文字以下なのでfilterでemptyに）

// 【模擬問題4】出力結果を答えよ
var list = List.of(3, 1, 4, 1, 5, 9);
list.stream()
    .distinct()
    .sorted(Comparator.reverseOrder())
    .limit(3)
    .forEach(n -> System.out.print(n + " "));
// 答え: 9 5 4`,
      },
    ],
  },
];
