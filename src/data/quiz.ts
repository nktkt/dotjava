export interface QuizQuestion {
  id: string;
  question: string;
  choices: { label: string; text: string }[];
  correctLabel: string;
  explanation: string;
  code?: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export const quizCategories = [
  { id: "basics", name: "基礎文法" },
  { id: "oop", name: "オブジェクト指向" },
  { id: "collections", name: "コレクション" },
  { id: "exceptions", name: "例外処理" },
  { id: "streams", name: "Stream API" },
  { id: "concurrency", name: "並行処理" },
  { id: "modern", name: "モダンJava" },
  { id: "excel", name: "Excel" },
  { id: "mos", name: "MOS Excel 365" },
  { id: "oracle", name: "Oracle/SQL" },
] as const;

export const quizQuestions: QuizQuestion[] = [
  // ============================================================
  // basics - beginner
  // ============================================================
  {
    id: "basics-1",
    question: "次のコードの出力は何ですか？",
    code: `int x = 10;
int y = 3;
System.out.println(x / y);`,
    choices: [
      { label: "A", text: "3.333..." },
      { label: "B", text: "3" },
      { label: "C", text: "3.0" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "B",
    explanation:
      "int同士の除算は整数除算になり、小数点以下は切り捨てられます。10 / 3 = 3（余り1）となるため、出力は「3」です。浮動小数点の結果を得るには、どちらかのオペランドをdoubleやfloatにキャストする必要があります。",
    category: "basics",
    difficulty: "beginner",
  },
  {
    id: "basics-2",
    question: "Javaでchar型のサイズは何ビットですか？",
    choices: [
      { label: "A", text: "8ビット" },
      { label: "B", text: "16ビット" },
      { label: "C", text: "32ビット" },
      { label: "D", text: "プラットフォームに依存する" },
    ],
    correctLabel: "B",
    explanation:
      "Javaのchar型は16ビット（2バイト）のUnicode文字（UTF-16）を格納します。0～65535の範囲の値を保持でき、C/C++のchar（通常8ビット）とは異なります。",
    category: "basics",
    difficulty: "beginner",
  },
  {
    id: "basics-3",
    question: "次のコードの出力は何ですか？",
    code: `String s1 = "Hello";
String s2 = "Hello";
System.out.println(s1 == s2);`,
    choices: [
      { label: "A", text: "true" },
      { label: "B", text: "false" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時エラー" },
    ],
    correctLabel: "A",
    explanation:
      "文字列リテラルはStringプール（String Intern Pool）で管理されます。同じリテラル \"Hello\" は同一のオブジェクト参照を共有するため、==比較はtrueを返します。ただし、new String(\"Hello\") で生成した場合は別オブジェクトになるため、文字列比較には常にequals()を使うべきです。",
    category: "basics",
    difficulty: "beginner",
  },
  {
    id: "basics-4",
    question: "次のうち、Javaの予約語でないものはどれですか？",
    choices: [
      { label: "A", text: "goto" },
      { label: "B", text: "const" },
      { label: "C", text: "sizeof" },
      { label: "D", text: "strictfp" },
    ],
    correctLabel: "C",
    explanation:
      "sizeofはC/C++の演算子であり、Javaには存在しません。gotoとconstはJavaでは予約語として登録されていますが、実際には使用できません。strictfpはJava 1.2で導入された修飾子で浮動小数点演算の厳密性を制御します（Java 17で実質的に非推奨）。",
    category: "basics",
    difficulty: "beginner",
  },
  {
    id: "basics-5",
    question: "次のコードの出力は何ですか？",
    code: `int[] arr = {1, 2, 3, 4, 5};
System.out.println(arr.length);`,
    choices: [
      { label: "A", text: "4" },
      { label: "B", text: "5" },
      { label: "C", text: "コンパイルエラー（length()が必要）" },
      { label: "D", text: "コンパイルエラー（size()が必要）" },
    ],
    correctLabel: "B",
    explanation:
      "配列のlengthはメソッドではなくフィールド（プロパティ）です。したがって括弧なしの arr.length で配列の要素数を取得できます。5つの要素があるので出力は「5」です。一方、Stringクラスではlength()メソッド、Collectionではsize()メソッドを使用します。",
    category: "basics",
    difficulty: "beginner",
  },
  // ============================================================
  // basics - intermediate
  // ============================================================
  {
    id: "basics-6",
    question: "次のコードの出力は何ですか？",
    code: `String s = "Java";
s.concat(" Programming");
System.out.println(s);`,
    choices: [
      { label: "A", text: "Java Programming" },
      { label: "B", text: "Java" },
      { label: "C", text: "null" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "B",
    explanation:
      "Stringはイミュータブル（不変）オブジェクトです。concat()メソッドは新しいStringオブジェクトを返しますが、元の変数sには代入されていないため、sの値は変わりません。「Java Programming」を得るには s = s.concat(\" Programming\"); と書く必要があります。",
    category: "basics",
    difficulty: "intermediate",
  },
  {
    id: "basics-7",
    question: "次のswitch文について正しい説明はどれですか？",
    code: `int x = 2;
switch (x) {
    case 1: System.out.print("A");
    case 2: System.out.print("B");
    case 3: System.out.print("C");
    default: System.out.print("D");
}`,
    choices: [
      { label: "A", text: "B のみ出力される" },
      { label: "B", text: "BCD が出力される" },
      { label: "C", text: "BD が出力される" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "B",
    explanation:
      "各caseにbreak文がないため、フォールスルー（fall-through）が発生します。x=2でcase 2にマッチした後、case 3とdefaultも連続して実行されます。結果として「BCD」が出力されます。意図しないフォールスルーを防ぐために、各caseの末尾にbreakを入れるのが一般的です。",
    category: "basics",
    difficulty: "intermediate",
  },
  // ============================================================
  // oop - beginner
  // ============================================================
  {
    id: "oop-1",
    question: "Javaのクラスにおいて、コンストラクタの説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "戻り値の型をvoidで宣言する" },
      { label: "B", text: "クラス名と同じ名前でなければならない" },
      { label: "C", text: "staticメソッドとして定義する" },
      { label: "D", text: "1つのクラスに1つしか定義できない" },
    ],
    correctLabel: "B",
    explanation:
      "コンストラクタはクラス名と同じ名前を持ち、戻り値の型を宣言しません（voidも指定しない）。static修飾子は付けられず、オーバーロードにより複数定義できます。コンストラクタを1つも定義しない場合、コンパイラが引数なしのデフォルトコンストラクタを自動生成します。",
    category: "oop",
    difficulty: "beginner",
  },
  {
    id: "oop-2",
    question: "次のコードの出力は何ですか？",
    code: `class Animal {
    void speak() { System.out.print("..."); }
}
class Dog extends Animal {
    void speak() { System.out.print("Woof"); }
}
Animal a = new Dog();
a.speak();`,
    choices: [
      { label: "A", text: "..." },
      { label: "B", text: "Woof" },
      { label: "C", text: "...Woof" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "B",
    explanation:
      "これはポリモーフィズム（多態性）の基本的な例です。変数aの型はAnimalですが、実際のオブジェクトはDogです。Javaではメソッド呼び出しは実行時のオブジェクトの型に基づいて解決されるため（動的ディスパッチ）、Dogクラスのspeak()が呼ばれ「Woof」が出力されます。",
    category: "oop",
    difficulty: "beginner",
  },
  {
    id: "oop-3",
    question: "Javaのアクセス修飾子の可視性が広い順に正しく並べたものはどれですか？",
    choices: [
      { label: "A", text: "public > protected > default > private" },
      { label: "B", text: "public > default > protected > private" },
      { label: "C", text: "public > protected > private > default" },
      { label: "D", text: "protected > public > default > private" },
    ],
    correctLabel: "A",
    explanation:
      "publicはすべてのクラスからアクセス可能、protectedは同一パッケージ+サブクラスからアクセス可能、default（修飾子なし）は同一パッケージのみ、privateはそのクラス内のみです。protectedはサブクラスが別パッケージにある場合でもアクセスできるため、defaultより範囲が広くなります。",
    category: "oop",
    difficulty: "beginner",
  },
  // ============================================================
  // oop - intermediate
  // ============================================================
  {
    id: "oop-4",
    question: "次のコードは正しくコンパイルできますか？",
    code: `abstract class Shape {
    abstract void draw();
    void fill() {
        System.out.println("Filling shape");
    }
}
Shape s = new Shape();`,
    choices: [
      { label: "A", text: "コンパイル成功し、実行可能" },
      { label: "B", text: "コンパイルエラー：抽象クラスはインスタンス化できない" },
      { label: "C", text: "コンパイルエラー：抽象クラスに具象メソッドは定義できない" },
      { label: "D", text: "実行時エラー" },
    ],
    correctLabel: "B",
    explanation:
      "抽象クラス（abstractクラス）は直接インスタンス化できません。new Shape()の行でコンパイルエラーになります。抽象クラスには抽象メソッドと具象メソッドの両方を定義できます。利用するにはサブクラスを作成してすべての抽象メソッドを実装する必要があります。",
    category: "oop",
    difficulty: "intermediate",
  },
  {
    id: "oop-5",
    question: "インタフェースに関する説明として、Java 8以降で正しいものはどれですか？",
    choices: [
      { label: "A", text: "インタフェースにはコンストラクタを定義できる" },
      { label: "B", text: "インタフェースにはdefaultメソッドとstaticメソッドを定義できる" },
      { label: "C", text: "インタフェースのフィールドはprivateにできる" },
      { label: "D", text: "インタフェースはextendsで別のクラスを継承できる" },
    ],
    correctLabel: "B",
    explanation:
      "Java 8以降、インタフェースにはdefaultメソッド（実装付きのインスタンスメソッド）とstaticメソッドを定義できるようになりました。コンストラクタは定義できず、フィールドは暗黙的にpublic static finalとなります。インタフェースはクラスを継承できませんが、他のインタフェースをextendsで拡張できます。",
    category: "oop",
    difficulty: "intermediate",
  },
  {
    id: "oop-6",
    question: "次のコードの出力は何ですか？",
    code: `class Parent {
    Parent() { System.out.print("P"); }
}
class Child extends Parent {
    Child() { System.out.print("C"); }
}
new Child();`,
    choices: [
      { label: "A", text: "C" },
      { label: "B", text: "PC" },
      { label: "C", text: "CP" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "B",
    explanation:
      "子クラスのコンストラクタが呼ばれると、最初に親クラスのコンストラクタが暗黙的に呼び出されます（super()が自動挿入）。そのため、まずParentのコンストラクタで「P」が出力され、次にChildのコンストラクタで「C」が出力されます。結果は「PC」です。",
    category: "oop",
    difficulty: "intermediate",
  },
  // ============================================================
  // oop - advanced
  // ============================================================
  {
    id: "oop-7",
    question: "次のコードの出力は何ですか？",
    code: `class Base {
    String name = "Base";
    String getName() { return name; }
}
class Derived extends Base {
    String name = "Derived";
    String getName() { return name; }
}
Base obj = new Derived();
System.out.println(obj.name + " " + obj.getName());`,
    choices: [
      { label: "A", text: "Base Base" },
      { label: "B", text: "Derived Derived" },
      { label: "C", text: "Base Derived" },
      { label: "D", text: "Derived Base" },
    ],
    correctLabel: "C",
    explanation:
      "フィールドアクセスはコンパイル時の型（Base）で解決されるため、obj.nameは「Base」を返します。一方、メソッド呼び出しは実行時のオブジェクトの型（Derived）で解決されるため、obj.getName()は「Derived」を返します。これがフィールドの隠蔽（field hiding）とメソッドのオーバーライドの違いです。",
    category: "oop",
    difficulty: "advanced",
  },
  // ============================================================
  // collections - beginner
  // ============================================================
  {
    id: "collections-1",
    question: "ArrayListとLinkedListの違いについて正しいものはどれですか？",
    choices: [
      { label: "A", text: "ArrayListはインデックスによるランダムアクセスが遅い" },
      { label: "B", text: "LinkedListはインデックスによるランダムアクセスがO(1)で高速" },
      { label: "C", text: "ArrayListは内部で配列を使用し、ランダムアクセスがO(1)で高速" },
      { label: "D", text: "LinkedListはメモリ使用量がArrayListより少ない" },
    ],
    correctLabel: "C",
    explanation:
      "ArrayListは内部的に配列で要素を管理するため、インデックスによるランダムアクセスがO(1)で高速です。LinkedListは二重連結リストで実装されており、ランダムアクセスはO(n)です。LinkedListは各要素にポインタを2つ持つため、一般的にArrayListよりメモリ使用量が多くなります。",
    category: "collections",
    difficulty: "beginner",
  },
  {
    id: "collections-2",
    question: "HashSetの特徴として正しいものはどれですか？",
    choices: [
      { label: "A", text: "要素の追加順序が保証される" },
      { label: "B", text: "重複する要素を許容する" },
      { label: "C", text: "要素の重複を許さず、順序は保証されない" },
      { label: "D", text: "要素がソートされた状態で保持される" },
    ],
    correctLabel: "C",
    explanation:
      "HashSetはSet インタフェースの実装で、重複する要素を許容しません。内部でHashMapを使用しており、要素の順序は保証されません。追加順序を保持したい場合はLinkedHashSet、ソート順で保持したい場合はTreeSetを使用します。",
    category: "collections",
    difficulty: "beginner",
  },
  // ============================================================
  // collections - intermediate
  // ============================================================
  {
    id: "collections-3",
    question: "次のコードの出力は何ですか？",
    code: `Map<String, Integer> map = new HashMap<>();
map.put("a", 1);
map.put("b", 2);
map.put("a", 3);
System.out.println(map.size() + " " + map.get("a"));`,
    choices: [
      { label: "A", text: "3 1" },
      { label: "B", text: "2 3" },
      { label: "C", text: "3 3" },
      { label: "D", text: "2 1" },
    ],
    correctLabel: "B",
    explanation:
      "HashMapでは同じキーにput()すると値が上書きされます。キー\"a\"に対して最初に1、次に3が設定されるため、最終的な値は3です。キーは\"a\"と\"b\"の2つなのでsize()は2です。put()は上書き時に以前の値を返します（この場合は1）。",
    category: "collections",
    difficulty: "intermediate",
  },
  {
    id: "collections-4",
    question: "次のコードを実行すると何が起こりますか？",
    code: `List<String> list = new ArrayList<>(List.of("A", "B", "C"));
for (String s : list) {
    if (s.equals("B")) {
        list.remove(s);
    }
}`,
    choices: [
      { label: "A", text: "\"B\"が正常に削除される" },
      { label: "B", text: "ConcurrentModificationExceptionが発生する" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "何も削除されない" },
    ],
    correctLabel: "B",
    explanation:
      "拡張for文（for-each）の内部ではIteratorが使用されています。ループ中にリストを直接変更するとConcurrentModificationExceptionが発生します。安全に削除するには、Iterator.remove()を使うか、Java 8以降のremoveIf()メソッドを使用します：list.removeIf(s -> s.equals(\"B\"));",
    category: "collections",
    difficulty: "intermediate",
  },
  {
    id: "collections-5",
    question: "次のコードの出力は何ですか？",
    code: `List<Integer> list = List.of(1, 2, 3);
list.add(4);`,
    choices: [
      { label: "A", text: "[1, 2, 3, 4]" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "UnsupportedOperationExceptionが発生する" },
      { label: "D", text: "[4, 1, 2, 3]" },
    ],
    correctLabel: "C",
    explanation:
      "List.of()（Java 9以降）は不変（immutable）リストを返します。不変リストに対してadd()、remove()、set()などの変更操作を行うと、UnsupportedOperationExceptionがスローされます。変更可能なリストが必要な場合は new ArrayList<>(List.of(1, 2, 3)) のようにコピーする必要があります。",
    category: "collections",
    difficulty: "intermediate",
  },
  // ============================================================
  // exceptions - beginner
  // ============================================================
  {
    id: "exceptions-1",
    question: "次のうち、チェック例外（checked exception）はどれですか？",
    choices: [
      { label: "A", text: "NullPointerException" },
      { label: "B", text: "IOException" },
      { label: "C", text: "ArrayIndexOutOfBoundsException" },
      { label: "D", text: "ClassCastException" },
    ],
    correctLabel: "B",
    explanation:
      "IOExceptionはチェック例外で、コンパイル時にtry-catchまたはthrows宣言が必要です。NullPointerException、ArrayIndexOutOfBoundsException、ClassCastExceptionはすべてRuntimeException（非チェック例外）のサブクラスです。チェック例外はExceptionを継承しRuntimeExceptionを継承しない例外です。",
    category: "exceptions",
    difficulty: "beginner",
  },
  {
    id: "exceptions-2",
    question: "try-catch-finallyブロックについて正しいものはどれですか？",
    choices: [
      { label: "A", text: "finallyブロックは例外が発生した場合のみ実行される" },
      { label: "B", text: "tryブロックの後にはcatchが必須である" },
      { label: "C", text: "finallyブロックは例外の有無に関わらず（ほぼ）必ず実行される" },
      { label: "D", text: "1つのtryに対してfinallyは複数定義できる" },
    ],
    correctLabel: "C",
    explanation:
      "finallyブロックは例外の発生有無に関わらず実行されます（System.exit()呼び出しやJVMクラッシュなどの極端な場合を除く）。tryの後にはcatchまたはfinallyのいずれか（もしくは両方）が必要です。try-finallyの組み合わせ（catchなし）も有効です。finallyは1つのtryに対して1つだけ定義できます。",
    category: "exceptions",
    difficulty: "beginner",
  },
  // ============================================================
  // exceptions - intermediate
  // ============================================================
  {
    id: "exceptions-3",
    question: "次のコードの出力は何ですか？",
    code: `public static int getValue() {
    try {
        return 1;
    } finally {
        return 2;
    }
}
System.out.println(getValue());`,
    choices: [
      { label: "A", text: "1" },
      { label: "B", text: "2" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時エラー" },
    ],
    correctLabel: "B",
    explanation:
      "finallyブロック内のreturnはtryブロック内のreturnを上書きします。tryで1を返そうとしますが、finallyが必ず実行されるため、最終的に2が返されます。ただし、finallyでreturnを使うのは混乱を招くためアンチパターンとされています。コンパイラも警告を出す場合があります。",
    category: "exceptions",
    difficulty: "intermediate",
  },
  {
    id: "exceptions-4",
    question: "try-with-resources文について正しいものはどれですか？",
    code: `try (BufferedReader br = new BufferedReader(
        new FileReader("file.txt"))) {
    String line = br.readLine();
}`,
    choices: [
      { label: "A", text: "リソースのclose()はfinallyで明示的に呼び出す必要がある" },
      { label: "B", text: "tryブロック終了時にAutoCloseableリソースが自動的にclose()される" },
      { label: "C", text: "catchブロックが必須である" },
      { label: "D", text: "リソースはSerializableインタフェースを実装する必要がある" },
    ],
    correctLabel: "B",
    explanation:
      "try-with-resources（Java 7以降）は、AutoCloseable（またはCloseable）インタフェースを実装したリソースをtryブロック終了時に自動的にclose()します。catchブロックやfinallyブロックは省略可能です。複数のリソースをセミコロンで区切って宣言することもできます。",
    category: "exceptions",
    difficulty: "intermediate",
  },
  // ============================================================
  // exceptions - advanced
  // ============================================================
  {
    id: "exceptions-5",
    question: "次のコードで、catch節の順序として正しいものはどれですか？",
    code: `try {
    // 何らかの処理
} catch (Exception e) {
    // 処理A
} catch (IOException e) {
    // 処理B
}`,
    choices: [
      { label: "A", text: "正常にコンパイルできる" },
      { label: "B", text: "コンパイルエラー：IOExceptionは到達不能" },
      { label: "C", text: "実行時にExceptionで常にキャッチされる" },
      { label: "D", text: "IOExceptionが優先される" },
    ],
    correctLabel: "B",
    explanation:
      "catch節は上から順に評価されます。ExceptionはIOExceptionの親クラスであるため、すべての例外が最初のcatch(Exception)で捕捉されてしまい、catch(IOException)に到達することはありません。コンパイラはこれを検出し、コンパイルエラーを発生させます。より具体的な例外を先に、一般的な例外を後に配置する必要があります。",
    category: "exceptions",
    difficulty: "advanced",
  },
  // ============================================================
  // streams - beginner
  // ============================================================
  {
    id: "streams-1",
    question: "Stream APIにおける「終端操作」はどれですか？",
    choices: [
      { label: "A", text: "filter()" },
      { label: "B", text: "map()" },
      { label: "C", text: "sorted()" },
      { label: "D", text: "collect()" },
    ],
    correctLabel: "D",
    explanation:
      "collect()は終端操作（terminal operation）です。filter()、map()、sorted()は中間操作（intermediate operation）で、Streamを返し遅延評価されます。終端操作が呼び出されるまで中間操作は実行されません。他の終端操作にはforEach()、count()、reduce()、toList()などがあります。",
    category: "streams",
    difficulty: "beginner",
  },
  {
    id: "streams-2",
    question: "次のコードの出力は何ですか？",
    code: `List<Integer> nums = List.of(1, 2, 3, 4, 5);
long count = nums.stream()
    .filter(n -> n % 2 == 0)
    .count();
System.out.println(count);`,
    choices: [
      { label: "A", text: "2" },
      { label: "B", text: "3" },
      { label: "C", text: "5" },
      { label: "D", text: "6" },
    ],
    correctLabel: "A",
    explanation:
      "filter(n -> n % 2 == 0) は偶数のみを通すフィルターです。リスト {1, 2, 3, 4, 5} の中で偶数は 2 と 4 の2つです。count()は終端操作でストリーム内の要素数を返すため、出力は「2」です。",
    category: "streams",
    difficulty: "beginner",
  },
  // ============================================================
  // streams - intermediate
  // ============================================================
  {
    id: "streams-3",
    question: "次のコードの出力は何ですか？",
    code: `List<String> list = List.of("a", "bb", "ccc", "dd");
String result = list.stream()
    .filter(s -> s.length() > 1)
    .map(String::toUpperCase)
    .collect(Collectors.joining(", "));
System.out.println(result);`,
    choices: [
      { label: "A", text: "BB, CCC, DD" },
      { label: "B", text: "a, bb, ccc, dd" },
      { label: "C", text: "BB, CCC" },
      { label: "D", text: "A, BB, CCC, DD" },
    ],
    correctLabel: "A",
    explanation:
      "filter(s -> s.length() > 1) で長さ1の \"a\" が除外されます。map(String::toUpperCase) で残りの要素が大文字に変換されます。Collectors.joining(\", \") でカンマ区切りの文字列に結合されます。結果は「BB, CCC, DD」です。",
    category: "streams",
    difficulty: "intermediate",
  },
  {
    id: "streams-4",
    question: "Stream APIの遅延評価について正しいものはどれですか？",
    code: `Stream.of(1, 2, 3, 4, 5)
    .filter(n -> {
        System.out.println("filter: " + n);
        return n > 2;
    })
    .map(n -> {
        System.out.println("map: " + n);
        return n * 10;
    })
    .findFirst();`,
    choices: [
      { label: "A", text: "filter が5回、map が3回実行される" },
      { label: "B", text: "filter が3回、map が1回実行される" },
      { label: "C", text: "filter が5回、map が5回実行される" },
      { label: "D", text: "何も実行されない" },
    ],
    correctLabel: "B",
    explanation:
      "Streamは遅延評価かつショートサーキット（短絡評価）です。findFirst()は最初の要素が見つかると処理を終了します。filterは1（不合格）、2（不合格）、3（合格）の3回実行され、mapは合格した3に対して1回だけ実行されます。4と5はfilterすら実行されません。",
    category: "streams",
    difficulty: "intermediate",
  },
  {
    id: "streams-5",
    question: "次のコードでOptionalの使い方として正しいものはどれですか？",
    code: `Optional<String> opt = Optional.ofNullable(getName());`,
    choices: [
      { label: "A", text: "opt.get() で安全に値を取得できる" },
      { label: "B", text: "opt.orElse(\"default\") で値がない場合にデフォルト値を返せる" },
      { label: "C", text: "optは必ず値を持つ" },
      { label: "D", text: "Optional.ofNullable(null) はNullPointerExceptionをスローする" },
    ],
    correctLabel: "B",
    explanation:
      "orElse()はOptionalが空の場合にデフォルト値を返す安全な方法です。get()は値がない場合にNoSuchElementExceptionをスローするため危険です。Optional.ofNullable(null) はNPEをスローせず空のOptionalを返します（Optional.of(null) はNPEをスローします）。",
    category: "streams",
    difficulty: "intermediate",
  },
  // ============================================================
  // concurrency - beginner
  // ============================================================
  {
    id: "concurrency-1",
    question: "Javaでスレッドを作成する方法として正しくないものはどれですか？",
    choices: [
      { label: "A", text: "Threadクラスを継承してrun()メソッドをオーバーライドする" },
      { label: "B", text: "Runnableインタフェースを実装してThreadに渡す" },
      { label: "C", text: "Callableインタフェースを実装してExecutorServiceに渡す" },
      { label: "D", text: "Serializableインタフェースを実装する" },
    ],
    correctLabel: "D",
    explanation:
      "Serializableはオブジェクトの直列化に使用されるインタフェースで、スレッドの作成とは関係ありません。Threadクラスの継承、Runnableの実装、CallableとExecutorServiceの使用がスレッド作成の主な方法です。",
    category: "concurrency",
    difficulty: "beginner",
  },
  {
    id: "concurrency-2",
    question: "synchronizedキーワードの説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "メソッドの実行速度を向上させる" },
      { label: "B", text: "同時に1つのスレッドだけがブロックを実行できるようにする" },
      { label: "C", text: "スレッドを一時停止させる" },
      { label: "D", text: "デッドロックを自動的に防止する" },
    ],
    correctLabel: "B",
    explanation:
      "synchronizedはモニタ（ロック）を使って、同時に1つのスレッドだけが指定されたブロックまたはメソッドを実行できるようにします。これによりスレッドセーフ性を確保できますが、パフォーマンスは低下する可能性があります。デッドロックは自動的には防止されず、プログラマが注意して設計する必要があります。",
    category: "concurrency",
    difficulty: "beginner",
  },
  // ============================================================
  // concurrency - intermediate
  // ============================================================
  {
    id: "concurrency-3",
    question: "volatileキーワードについて正しいものはどれですか？",
    choices: [
      { label: "A", text: "変数へのアクセスを排他的にする（ロックする）" },
      { label: "B", text: "変数の値が常にメインメモリから読み書きされることを保証する" },
      { label: "C", text: "変数を不変（immutable）にする" },
      { label: "D", text: "変数へのアトミックな複合操作を保証する" },
    ],
    correctLabel: "B",
    explanation:
      "volatileはスレッドがCPUキャッシュではなく常にメインメモリから値を読み書きすることを保証します（可視性の保証）。ただし、i++ のような複合操作のアトミック性は保証しません（読み取り→加算→書き込みの間に他のスレッドが割り込む可能性がある）。排他制御にはsynchronizedやAtomicIntegerなどを使います。",
    category: "concurrency",
    difficulty: "intermediate",
  },
  {
    id: "concurrency-4",
    question: "CompletableFutureの説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "同期処理専用のクラスである" },
      { label: "B", text: "非同期処理の結果を表し、コールバックチェーンを構築できる" },
      { label: "C", text: "Java 6で導入された" },
      { label: "D", text: "スレッドプールを使用しない" },
    ],
    correctLabel: "B",
    explanation:
      "CompletableFuture（Java 8以降）はFutureインタフェースの拡張で、非同期処理の結果を表します。thenApply()、thenCompose()、thenAccept()などのメソッドでコールバックチェーンを構築でき、複数の非同期処理の合成も可能です。デフォルトではForkJoinPool.commonPool()をスレッドプールとして使用します。",
    category: "concurrency",
    difficulty: "intermediate",
  },
  // ============================================================
  // concurrency - advanced
  // ============================================================
  {
    id: "concurrency-5",
    question: "次のコードにはどのような問題がありますか？",
    code: `class Counter {
    private int count = 0;

    public void increment() {
        count++;
    }

    public int getCount() {
        return count;
    }
}`,
    choices: [
      { label: "A", text: "問題なし。スレッドセーフである" },
      { label: "B", text: "count++は非アトミック操作であり、競合状態が発生しうる" },
      { label: "C", text: "countをpublicにすべき" },
      { label: "D", text: "コンパイルエラーが発生する" },
    ],
    correctLabel: "B",
    explanation:
      "count++ は「読み取り→加算→書き込み」の3ステップからなる非アトミック操作です。複数スレッドから同時にincrement()を呼ぶと、値の喪失（lost update）が発生する可能性があります。解決策として、synchronizedの使用、AtomicIntegerの使用、またはLockの使用が考えられます。",
    category: "concurrency",
    difficulty: "advanced",
  },
  {
    id: "concurrency-6",
    question: "デッドロックが発生する条件として必要でないものはどれですか？",
    choices: [
      { label: "A", text: "相互排除（Mutual Exclusion）" },
      { label: "B", text: "保持と待機（Hold and Wait）" },
      { label: "C", text: "先着順処理（First Come First Served）" },
      { label: "D", text: "循環待ち（Circular Wait）" },
    ],
    correctLabel: "C",
    explanation:
      "デッドロックの発生に必要な4つの条件（Coffman条件）は、相互排除、保持と待機、横取り不可（No Preemption）、循環待ちです。「先着順処理」はデッドロックの条件に含まれません。これら4つの条件すべてが揃った場合にデッドロックが発生する可能性があります。",
    category: "concurrency",
    difficulty: "advanced",
  },
  // ============================================================
  // modern - beginner
  // ============================================================
  {
    id: "modern-1",
    question: "var（ローカル変数型推論）について正しいものはどれですか？",
    code: `var list = new ArrayList<String>();
var x = 10;`,
    choices: [
      { label: "A", text: "varはJavaScriptのように動的型付けを導入する" },
      { label: "B", text: "varはコンパイル時に型が推論され、静的型付けのまま" },
      { label: "C", text: "varはフィールド宣言にも使用できる" },
      { label: "D", text: "varはJava 8で導入された" },
    ],
    correctLabel: "B",
    explanation:
      "var（Java 10以降）はローカル変数型推論で、コンパイル時に右辺から型が推論されます。Javaは依然として静的型付け言語のままです。varはローカル変数とfor文でのみ使用可能で、フィールド、メソッドの引数、戻り値の型には使用できません。",
    category: "modern",
    difficulty: "beginner",
  },
  {
    id: "modern-2",
    question: "テキストブロック（Text Blocks）の正しい書き方はどれですか？",
    choices: [
      { label: "A", text: '"""Hello World"""' },
      { label: "B", text: '"""\nHello World\n"""' },
      { label: "C", text: "```Hello World```" },
      { label: "D", text: "'''Hello World'''" },
    ],
    correctLabel: "B",
    explanation:
      'テキストブロック（Java 13プレビュー、Java 15正式）は三重ダブルクォート（\"\"\"）で囲みます。開始の\"\"\"の直後には改行が必要です。終了の\"\"\"は新しい行に置くことが推奨されます。インデントは自動的に調整され、複数行の文字列を読みやすく記述できます。',
    category: "modern",
    difficulty: "beginner",
  },
  // ============================================================
  // modern - intermediate
  // ============================================================
  {
    id: "modern-3",
    question: "record（レコード）クラスについて正しいものはどれですか？",
    code: `record Point(int x, int y) {}`,
    choices: [
      { label: "A", text: "recordは変更可能なデータクラスである" },
      { label: "B", text: "recordは自動的にequals()、hashCode()、toString()を生成する" },
      { label: "C", text: "recordは他のクラスを継承できる" },
      { label: "D", text: "recordのフィールドは後から追加できる" },
    ],
    correctLabel: "B",
    explanation:
      "record（Java 14プレビュー、Java 16正式）は不変のデータクラスを簡潔に定義するための機能です。equals()、hashCode()、toString()、アクセサメソッドが自動生成されます。recordのフィールドは暗黙的にprivate finalで、他のクラスは継承できません（暗黙的にjava.lang.Recordを継承）。インタフェースの実装は可能です。",
    category: "modern",
    difficulty: "intermediate",
  },
  {
    id: "modern-4",
    question: "sealed（シールド）クラスについて正しいものはどれですか？",
    code: `sealed interface Shape permits Circle, Rectangle {}
record Circle(double radius) implements Shape {}
record Rectangle(double w, double h) implements Shape {}`,
    choices: [
      { label: "A", text: "sealedクラスはサブクラス化を完全に禁止する" },
      { label: "B", text: "permitsで指定されたクラスのみがサブクラスになれる" },
      { label: "C", text: "sealedクラスのサブクラスに制約はない" },
      { label: "D", text: "sealedクラスはJava 8で導入された" },
    ],
    correctLabel: "B",
    explanation:
      "sealed（Java 15プレビュー、Java 17正式）はサブクラス化を制限する機能です。permitsで許可されたクラスのみがサブクラスになれます。完全禁止はfinalクラスです。サブクラスはfinal、sealed、non-sealedのいずれかを宣言する必要があります。パターンマッチングと組み合わせることで網羅性チェックが可能です。",
    category: "modern",
    difficulty: "intermediate",
  },
  {
    id: "modern-5",
    question: "switch式（switch expressions）の正しい使い方はどれですか？",
    code: `String result = switch (day) {
    case MONDAY, FRIDAY -> "Working";
    case SATURDAY, SUNDAY -> "Weekend";
    default -> "Midweek";
};`,
    choices: [
      { label: "A", text: "コンパイルエラー：switchは式として使えない" },
      { label: "B", text: "コンパイルエラー：アロー（->）は使えない" },
      { label: "C", text: "正しいswitch式で、resultに値が代入される" },
      { label: "D", text: "break文が必要である" },
    ],
    correctLabel: "C",
    explanation:
      "switch式（Java 14正式）では、switchを値を返す式として使用でき、アロー（->）構文でフォールスルーのないcaseを記述できます。複数のcase値はカンマで区切れます。すべてのケースを網羅するか、defaultが必要です。ブロック内で値を返す場合はyieldキーワードを使用します。",
    category: "modern",
    difficulty: "intermediate",
  },
  // ============================================================
  // modern - advanced
  // ============================================================
  {
    id: "modern-6",
    question: "パターンマッチング for instanceof の正しい使い方はどれですか？",
    code: `Object obj = "Hello";
if (obj instanceof String s && s.length() > 3) {
    System.out.println(s.toUpperCase());
}`,
    choices: [
      { label: "A", text: "コンパイルエラー" },
      { label: "B", text: "HELLO が出力される" },
      { label: "C", text: "Hello が出力される" },
      { label: "D", text: "実行時エラー" },
    ],
    correctLabel: "B",
    explanation:
      "パターンマッチング for instanceof（Java 16正式）では、instanceof チェックと同時に変数を宣言・束縛できます。objがString型であれば変数sに束縛され、そのスコープ内で使用できます。&&の右辺でsを使用できるのは、左辺がtrueの場合のみ右辺が評価されるためです。\"Hello\"は長さ5なのでtoUpperCase()が呼ばれ「HELLO」が出力されます。",
    category: "modern",
    difficulty: "advanced",
  },
  {
    id: "modern-7",
    question: "Virtual Threads（仮想スレッド）について正しいものはどれですか？",
    choices: [
      { label: "A", text: "Virtual ThreadsはOSスレッドと1対1で対応する" },
      { label: "B", text: "Virtual Threadsは数百万単位で軽量に作成でき、JVMが管理する" },
      { label: "C", text: "Virtual ThreadsはJava 11で導入された" },
      { label: "D", text: "Virtual Threadsではsynchronizedが使用不可能" },
    ],
    correctLabel: "B",
    explanation:
      "Virtual Threads（Java 21正式）はJVMが管理する軽量スレッドで、OSスレッドとは多対少（M:N）で対応します。メモリ消費が少なく、数百万単位で作成可能です。I/O待ちで自動的にキャリアスレッドを解放し、高い並行性を実現します。synchronizedは使用可能ですが、キャリアスレッドのピン留めが発生する場合があります。",
    category: "modern",
    difficulty: "advanced",
  },
  // ============================================================
  // advanced extras
  // ============================================================
  {
    id: "basics-8",
    question: "次のコードの出力は何ですか？",
    code: `System.out.println(1 + 2 + "3" + 4 + 5);`,
    choices: [
      { label: "A", text: "12345" },
      { label: "B", text: "3345" },
      { label: "C", text: "15" },
      { label: "D", text: "33" },
    ],
    correctLabel: "B",
    explanation:
      "式は左から右に評価されます。1+2=3（int加算）、次に3+\"3\"=\"33\"（文字列結合）、\"33\"+4=\"334\"（文字列結合）、\"334\"+5=\"3345\"（文字列結合）となります。文字列が登場した時点以降は文字列結合として処理されるため、結果は「3345」です。",
    category: "basics",
    difficulty: "advanced",
  },
  {
    id: "oop-8",
    question: "次のコードの出力は何ですか？",
    code: `interface A {
    default void hello() { System.out.print("A"); }
}
interface B {
    default void hello() { System.out.print("B"); }
}
class C implements A, B {
    public void hello() { A.super.hello(); }
}
new C().hello();`,
    choices: [
      { label: "A", text: "A" },
      { label: "B", text: "B" },
      { label: "C", text: "AB" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "A",
    explanation:
      "クラスCが2つのインタフェースから同じシグネチャのdefaultメソッドを継承する場合、コンパイルエラーを避けるためにオーバーライドが必須です。C内でA.super.hello()を呼び出しているため、インタフェースAのdefaultメソッドが実行され「A」が出力されます。",
    category: "oop",
    difficulty: "advanced",
  },
  {
    id: "streams-6",
    question: "次のコードの出力は何ですか？",
    code: `List<List<String>> nested = List.of(
    List.of("a", "b"),
    List.of("c", "d")
);
long count = nested.stream()
    .flatMap(Collection::stream)
    .distinct()
    .count();
System.out.println(count);`,
    choices: [
      { label: "A", text: "2" },
      { label: "B", text: "4" },
      { label: "C", text: "1" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "B",
    explanation:
      "flatMap()はネストされたリストを平坦化し、{\"a\", \"b\", \"c\", \"d\"} の単一ストリームにします。distinct()で重複を除去しますが、全要素が一意なので4要素のままです。count()で要素数を数え、出力は「4」です。flatMap()はStream<Stream<T>>をStream<T>に変換する重要な操作です。",
    category: "streams",
    difficulty: "advanced",
  },
  {
    id: "collections-6",
    question: "TreeMapについて正しいものはどれですか？",
    choices: [
      { label: "A", text: "要素のハッシュ値に基づいて格納される" },
      { label: "B", text: "キーが自然順序またはComparatorでソートされた状態で保持される" },
      { label: "C", text: "nullキーを許容する" },
      { label: "D", text: "スレッドセーフである" },
    ],
    correctLabel: "B",
    explanation:
      "TreeMapは赤黒木（Red-Black Tree）に基づくNavigableMapの実装です。キーは自然順序（Comparable）またはコンストラクタで指定したComparatorに従ってソートされます。nullキーは許容しません（NullPointerExceptionが発生）。スレッドセーフではなく、必要であればCollections.synchronizedSortedMap()でラップします。",
    category: "collections",
    difficulty: "advanced",
  },
  // ============================================================
  // basics - beginner (追加)
  // ============================================================
  {
    id: "basics-9",
    question: "次のコードの出力は何ですか？",
    code: `boolean a = true;
boolean b = false;
System.out.println(a && b);
System.out.println(a || b);`,
    choices: [
      { label: "A", text: "true true" },
      { label: "B", text: "false true" },
      { label: "C", text: "false false" },
      { label: "D", text: "true false" },
    ],
    correctLabel: "B",
    explanation:
      "&&（論理AND）は両方trueの場合のみtrue。a=true, b=falseなので false。||（論理OR）は少なくとも一方がtrueならtrue。a=trueなので true。結果は「false」「true」が改行で出力されます。",
    category: "basics",
    difficulty: "beginner",
  },
  {
    id: "basics-10",
    question: "Javaのプリミティブ型でないものはどれですか？",
    choices: [
      { label: "A", text: "int" },
      { label: "B", text: "String" },
      { label: "C", text: "double" },
      { label: "D", text: "boolean" },
    ],
    correctLabel: "B",
    explanation:
      "Stringはクラス（参照型）であり、プリミティブ型ではありません。Javaのプリミティブ型は byte, short, int, long, float, double, char, boolean の8つです。Stringは java.lang.String クラスのオブジェクトで、不変（immutable）です。",
    category: "basics",
    difficulty: "beginner",
  },
  {
    id: "basics-11",
    question: "次のコードの出力は何ですか？",
    code: `for (int i = 0; i < 5; i++) {
    if (i == 3) break;
    System.out.print(i + " ");
}`,
    choices: [
      { label: "A", text: "0 1 2 3 4" },
      { label: "B", text: "0 1 2" },
      { label: "C", text: "0 1 2 3" },
      { label: "D", text: "3" },
    ],
    correctLabel: "B",
    explanation:
      "break文はループを即座に終了させます。i=0, 1, 2 のとき出力され、i=3のとき break が実行されてループが終了します。i=3 自体は出力されないため、結果は「0 1 2」です。",
    category: "basics",
    difficulty: "beginner",
  },
  {
    id: "basics-12",
    question: "次のコードの出力は何ですか？",
    code: `int x = 5;
System.out.println(x++);
System.out.println(x);`,
    choices: [
      { label: "A", text: "5 と 6" },
      { label: "B", text: "6 と 6" },
      { label: "C", text: "5 と 5" },
      { label: "D", text: "6 と 7" },
    ],
    correctLabel: "A",
    explanation:
      "x++（後置インクリメント）は現在の値を返してからインクリメントします。最初のprintlnでは x の値 5 が出力され、その後 x が 6 になります。2回目のprintlnでは 6 が出力されます。++x（前置インクリメント）なら先にインクリメントしてから値を返します。",
    category: "basics",
    difficulty: "beginner",
  },
  // ============================================================
  // basics - intermediate (追加)
  // ============================================================
  {
    id: "basics-13",
    question: "次のコードの出力は何ですか？",
    code: `Integer a = 127;
Integer b = 127;
Integer c = 128;
Integer d = 128;
System.out.println(a == b);
System.out.println(c == d);`,
    choices: [
      { label: "A", text: "true true" },
      { label: "B", text: "true false" },
      { label: "C", text: "false false" },
      { label: "D", text: "false true" },
    ],
    correctLabel: "B",
    explanation:
      "Integerクラスは -128 から 127 の範囲の値をキャッシュしています。127は範囲内なので a と b は同じオブジェクトを参照し、== は true。128は範囲外なので c と d は異なるオブジェクトとなり、== は false。値の比較には equals() を使うべきです。",
    category: "basics",
    difficulty: "intermediate",
  },
  {
    id: "basics-14",
    question: "次のコードの出力は何ですか？",
    code: `String s1 = new String("Java");
String s2 = new String("Java");
System.out.println(s1 == s2);
System.out.println(s1.equals(s2));`,
    choices: [
      { label: "A", text: "true true" },
      { label: "B", text: "false true" },
      { label: "C", text: "true false" },
      { label: "D", text: "false false" },
    ],
    correctLabel: "B",
    explanation:
      "new String() は毎回新しいオブジェクトをヒープに生成するため、s1 と s2 は異なる参照を持ちます。== は参照の比較なので false。equals() は文字列の内容を比較するので true を返します。文字列の比較には常に equals() を使うべきです。",
    category: "basics",
    difficulty: "intermediate",
  },
  {
    id: "basics-15",
    question: "次のコードの出力は何ですか？",
    code: `double d = 0.1 + 0.2;
System.out.println(d == 0.3);
System.out.println(d);`,
    choices: [
      { label: "A", text: "true と 0.3" },
      { label: "B", text: "false と 0.30000000000000004" },
      { label: "C", text: "true と 0.30000000000000004" },
      { label: "D", text: "false と 0.3" },
    ],
    correctLabel: "B",
    explanation:
      "浮動小数点数（IEEE 754）では 0.1 + 0.2 は厳密に 0.3 にならず、0.30000000000000004 になります。そのため == 比較は false です。金額計算など精密な計算には BigDecimal を使用するべきです。",
    category: "basics",
    difficulty: "intermediate",
  },
  {
    id: "basics-16",
    question: "次のコードでコンパイルエラーになるのはどれですか？",
    code: `byte b = 10;       // (1)
short s = b;       // (2)
int i = s;         // (3)
byte b2 = i;       // (4)`,
    choices: [
      { label: "A", text: "(1)" },
      { label: "B", text: "(2)" },
      { label: "C", text: "(3)" },
      { label: "D", text: "(4)" },
    ],
    correctLabel: "D",
    explanation:
      "byte→short→int は拡大変換（widening）で自動的に行われます。しかし int→byte は縮小変換（narrowing）であり、情報が失われる可能性があるため明示的なキャストが必要です。byte b2 = (byte) i; と書く必要があります。",
    category: "basics",
    difficulty: "intermediate",
  },
  // ============================================================
  // basics - advanced (追加)
  // ============================================================
  {
    id: "basics-17",
    question: "次のコードの出力は何ですか？",
    code: `String s = null;
System.out.println("Hello" + s);`,
    choices: [
      { label: "A", text: "NullPointerExceptionが発生する" },
      { label: "B", text: "Hello" },
      { label: "C", text: "Hellonull" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "C",
    explanation:
      "文字列結合演算子 + は null を文字列 \"null\" に変換します。したがって \"Hello\" + null は \"Hellonull\" になります。これは内部的に StringBuilder.append(String) が null を \"null\" として処理するためです。ただし s.length() のように null に対してメソッドを呼ぶと NullPointerException が発生します。",
    category: "basics",
    difficulty: "advanced",
  },
  {
    id: "basics-18",
    question: "次のコードの出力は何ですか？",
    code: `int i = 0;
i = i++;
System.out.println(i);`,
    choices: [
      { label: "A", text: "0" },
      { label: "B", text: "1" },
      { label: "C", text: "2" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "A",
    explanation:
      "i = i++ は直感に反する動作をします。まず i++ の後置インクリメントが i の現在の値 0 を返し、その後 i を 1 にインクリメントします。しかし、返された 0 が i に代入されるため、最終的に i は 0 になります。この書き方は避けるべきです。",
    category: "basics",
    difficulty: "advanced",
  },
  // ============================================================
  // oop - beginner (追加)
  // ============================================================
  {
    id: "oop-9",
    question: "Javaにおけるカプセル化の説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "同じメソッド名で異なる動作をすること" },
      { label: "B", text: "既存クラスの機能を引き継いで新しいクラスを作ること" },
      { label: "C", text: "データとそれを操作するメソッドをまとめ、外部からのアクセスを制限すること" },
      { label: "D", text: "具体的な実装を持たない抽象的な型を定義すること" },
    ],
    correctLabel: "C",
    explanation:
      "カプセル化（Encapsulation）は、データ（フィールド）とそれを操作するメソッドを1つの単位にまとめ、外部から直接データにアクセスされることを防ぐ考え方です。フィールドをprivateにし、getter/setterメソッドを通じてアクセスするのが典型的な実装です。Aはポリモーフィズム、Bは継承の説明です。",
    category: "oop",
    difficulty: "beginner",
  },
  {
    id: "oop-10",
    question: "次のコードでコンパイルエラーになるのはどれですか？",
    code: `final class Immutable {
    final int value;
    Immutable(int value) { this.value = value; }
}
class Extended extends Immutable {  // ★
    Extended(int v) { super(v); }
}`,
    choices: [
      { label: "A", text: "finalフィールドの宣言" },
      { label: "B", text: "コンストラクタ内のthis.value" },
      { label: "C", text: "Extendedクラスの継承" },
      { label: "D", text: "エラーなし" },
    ],
    correctLabel: "C",
    explanation:
      "final class は継承を禁止します。Immutableクラスはfinalで宣言されているため、他のクラスがextendsすることはできません。「cannot inherit from final Immutable」というコンパイルエラーになります。finalクラスの代表例にはString、Integer、LocalDateなどがあります。",
    category: "oop",
    difficulty: "beginner",
  },
  // ============================================================
  // oop - intermediate (追加)
  // ============================================================
  {
    id: "oop-11",
    question: "次のコードの出力は何ですか？",
    code: `class A {
    static void greet() { System.out.print("A"); }
}
class B extends A {
    static void greet() { System.out.print("B"); }
}
A obj = new B();
obj.greet();`,
    choices: [
      { label: "A", text: "A" },
      { label: "B", text: "B" },
      { label: "C", text: "AB" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "A",
    explanation:
      "staticメソッドはオーバーライドされず、メソッド隠蔽（method hiding）が発生します。staticメソッドの呼び出しはコンパイル時の型（参照型）で解決されるため、obj の型が A なので A.greet() が呼ばれ「A」が出力されます。これはインスタンスメソッドのポリモーフィズムとは異なる動作です。",
    category: "oop",
    difficulty: "intermediate",
  },
  {
    id: "oop-12",
    question: "次のenumの使い方として正しいものはどれですか？",
    code: `enum Season {
    SPRING("暖かい"), SUMMER("暑い"),
    AUTUMN("涼しい"), WINTER("寒い");

    private final String description;
    Season(String desc) { this.description = desc; }
    public String getDescription() { return description; }
}`,
    choices: [
      { label: "A", text: "enumにコンストラクタやメソッドは定義できない" },
      { label: "B", text: "正しいenumで、各定数にフィールドとメソッドを持たせている" },
      { label: "C", text: "enumのコンストラクタはpublicでなければならない" },
      { label: "D", text: "enumはインタフェースを実装できない" },
    ],
    correctLabel: "B",
    explanation:
      "Javaのenumはクラスの一種で、フィールド、コンストラクタ、メソッドを定義できます。コンストラクタは暗黙的にprivateであり、publicやprotectedにはできません。enumはインタフェースを実装できますが、他のクラスを継承できません（暗黙的にjava.lang.Enumを継承）。",
    category: "oop",
    difficulty: "intermediate",
  },
  // ============================================================
  // oop - advanced (追加)
  // ============================================================
  {
    id: "oop-13",
    question: "ジェネリクスの型消去（Type Erasure）について正しいものはどれですか？",
    choices: [
      { label: "A", text: "実行時にジェネリクスの型パラメータの情報が保持される" },
      { label: "B", text: "コンパイル時に型チェックが行われ、実行時にはジェネリクスの型情報は消去される" },
      { label: "C", text: "new T() でジェネリクス型のインスタンスを作成できる" },
      { label: "D", text: "List<Integer> と List<String> は実行時に異なるクラスである" },
    ],
    correctLabel: "B",
    explanation:
      "Javaのジェネリクスは型消去（Type Erasure）を使用しています。コンパイル時に型の安全性がチェックされますが、実行時には型パラメータの情報は消去されます。そのため、List<Integer> と List<String> は実行時には同じ List クラスになります。new T() は型消去により実行時に T の実体がわからないため不可能です。",
    category: "oop",
    difficulty: "advanced",
  },
  {
    id: "oop-14",
    question: "次のコードの出力は何ですか？",
    code: `class Outer {
    private int x = 10;
    class Inner {
        void print() { System.out.println(x); }
    }
}
Outer.Inner inner = new Outer().new Inner();
inner.print();`,
    choices: [
      { label: "A", text: "コンパイルエラー：privateフィールドにアクセスできない" },
      { label: "B", text: "10" },
      { label: "C", text: "0" },
      { label: "D", text: "コンパイルエラー：Inner のインスタンス化方法が誤り" },
    ],
    correctLabel: "B",
    explanation:
      "内部クラス（Inner Class）は外部クラスのprivateメンバーにアクセスできます。非staticな内部クラスのインスタンス化には外部クラスのインスタンスが必要で、new Outer().new Inner() が正しい構文です。内部クラスは外部クラスのインスタンスへの暗黙的な参照を持ちます。",
    category: "oop",
    difficulty: "advanced",
  },
  // ============================================================
  // collections - beginner (追加)
  // ============================================================
  {
    id: "collections-7",
    question: "Java の Map インタフェースについて正しいものはどれですか？",
    choices: [
      { label: "A", text: "Map は Collection インタフェースを継承している" },
      { label: "B", text: "Map はキーと値のペアを格納し、キーは重複できない" },
      { label: "C", text: "Map の値は重複できない" },
      { label: "D", text: "Map は要素の順序を常に保証する" },
    ],
    correctLabel: "B",
    explanation:
      "Mapはキーと値のペアを格納するデータ構造で、キーの重複は許可されません（同じキーでputすると値が上書き）。Mapは Collection インタフェースを継承していません。値の重複は許可されます。順序はMapの実装によります（HashMap：順序なし、LinkedHashMap：挿入順、TreeMap：ソート順）。",
    category: "collections",
    difficulty: "beginner",
  },
  {
    id: "collections-8",
    question: "次のコードの出力は何ですか？",
    code: `List<String> list = new ArrayList<>();
list.add("A");
list.add("B");
list.add("C");
list.add(1, "X");
System.out.println(list);`,
    choices: [
      { label: "A", text: "[A, B, C, X]" },
      { label: "B", text: "[X, A, B, C]" },
      { label: "C", text: "[A, X, B, C]" },
      { label: "D", text: "IndexOutOfBoundsException" },
    ],
    correctLabel: "C",
    explanation:
      "add(int index, E element) はインデックス位置に要素を挿入し、既存の要素を右にシフトします。インデックス1に \"X\" を挿入するので、元のインデックス1以降の要素が右にずれます。結果は [A, X, B, C] です。",
    category: "collections",
    difficulty: "beginner",
  },
  // ============================================================
  // collections - intermediate (追加)
  // ============================================================
  {
    id: "collections-9",
    question: "次のコードの出力は何ですか？",
    code: `Map<String, Integer> map = new HashMap<>();
map.put("a", 1);
map.put("b", 2);
Integer val = map.getOrDefault("c", 0);
map.putIfAbsent("a", 99);
System.out.println(val + " " + map.get("a"));`,
    choices: [
      { label: "A", text: "null 99" },
      { label: "B", text: "0 1" },
      { label: "C", text: "0 99" },
      { label: "D", text: "null 1" },
    ],
    correctLabel: "B",
    explanation:
      "getOrDefault(\"c\", 0) はキー\"c\"が存在しないため、デフォルト値の 0 を返します。putIfAbsent(\"a\", 99) はキー\"a\"が既に存在するため何もしません（既存の値 1 が保持されます）。したがって出力は「0 1」です。",
    category: "collections",
    difficulty: "intermediate",
  },
  {
    id: "collections-10",
    question: "Comparable と Comparator の違いについて正しいものはどれですか？",
    choices: [
      { label: "A", text: "Comparable は外部でソート順を定義し、Comparator はクラス自体に定義する" },
      { label: "B", text: "Comparable は compareTo() を持ち、クラス自体に自然順序を定義する" },
      { label: "C", text: "どちらも同じインタフェースの別名である" },
      { label: "D", text: "Comparator はプリミティブ型のみに使用できる" },
    ],
    correctLabel: "B",
    explanation:
      "Comparable<T> はクラス自体に実装し、compareTo(T) メソッドで自然順序を定義します。Comparator<T> は外部のクラスやラムダ式で定義し、compare(T, T) メソッドで柔軟なソート順を指定できます。Collections.sort() は Comparable の自然順序か、引数で渡した Comparator を使用します。",
    category: "collections",
    difficulty: "intermediate",
  },
  // ============================================================
  // collections - advanced (追加)
  // ============================================================
  {
    id: "collections-11",
    question: "次のコードの出力は何ですか？",
    code: `Set<String> set = new HashSet<>();
System.out.println(set.add("A"));
System.out.println(set.add("B"));
System.out.println(set.add("A"));
System.out.println(set.size());`,
    choices: [
      { label: "A", text: "true true true 3" },
      { label: "B", text: "true true false 2" },
      { label: "C", text: "true true false 3" },
      { label: "D", text: "true true true 2" },
    ],
    correctLabel: "B",
    explanation:
      "Set.add() は要素が正常に追加された場合 true、既に存在する場合 false を返します。\"A\"の初回追加は true、\"B\"の追加は true、\"A\"の2回目は既に存在するため false。重複は無視されるため size() は 2 です。",
    category: "collections",
    difficulty: "advanced",
  },
  {
    id: "collections-12",
    question: "ConcurrentHashMap について正しいものはどれですか？",
    choices: [
      { label: "A", text: "全体をロックして排他制御する" },
      { label: "B", text: "null キーと null 値を許容する" },
      { label: "C", text: "セグメント単位の並行制御で高いスループットを実現する" },
      { label: "D", text: "イテレータが ConcurrentModificationException をスローする" },
    ],
    correctLabel: "C",
    explanation:
      "ConcurrentHashMap はロックストライピング（内部的にバケット単位のロック）により、複数スレッドが異なるセグメントに同時にアクセスできます。null キーと null 値は許容しません（HashMap は許容）。イテレータは弱い一貫性を持ち、ConcurrentModificationException をスローしません。",
    category: "collections",
    difficulty: "advanced",
  },
  // ============================================================
  // exceptions - beginner (追加)
  // ============================================================
  {
    id: "exceptions-6",
    question: "次のコードの出力は何ですか？",
    code: `try {
    int[] arr = {1, 2, 3};
    System.out.println(arr[5]);
} catch (ArrayIndexOutOfBoundsException e) {
    System.out.println("配列エラー");
} catch (Exception e) {
    System.out.println("一般エラー");
}`,
    choices: [
      { label: "A", text: "配列エラー" },
      { label: "B", text: "一般エラー" },
      { label: "C", text: "配列エラー 一般エラー" },
      { label: "D", text: "実行時エラー" },
    ],
    correctLabel: "A",
    explanation:
      "arr[5] は配列の範囲外アクセスなので ArrayIndexOutOfBoundsException がスローされます。catch ブロックは上から順に評価され、最初にマッチした catch(ArrayIndexOutOfBoundsException) が実行されます。一度キャッチされると後続の catch は実行されません。",
    category: "exceptions",
    difficulty: "beginner",
  },
  {
    id: "exceptions-7",
    question: "ErrorとExceptionの違いについて正しいものはどれですか？",
    choices: [
      { label: "A", text: "Error は回復可能な異常を表し、Exception は回復不能な異常を表す" },
      { label: "B", text: "Error はJVMレベルの重大な問題を表し、通常キャッチすべきでない" },
      { label: "C", text: "Error と Exception は同じ親クラスを持たない" },
      { label: "D", text: "Error は try-catch でキャッチできない" },
    ],
    correctLabel: "B",
    explanation:
      "Error は OutOfMemoryError や StackOverflowError のようなJVMレベルの重大な問題を表し、通常アプリケーションコードではキャッチすべきではありません。Exception はアプリケーションレベルの異常を表します。両方とも Throwable クラスを継承しています。Error も技術的にはキャッチ可能ですが、推奨されません。",
    category: "exceptions",
    difficulty: "beginner",
  },
  // ============================================================
  // exceptions - intermediate (追加)
  // ============================================================
  {
    id: "exceptions-8",
    question: "マルチキャッチ（multi-catch）について正しいものはどれですか？",
    code: `try {
    // 処理
} catch (IOException | SQLException e) {
    e.printStackTrace();
}`,
    choices: [
      { label: "A", text: "コンパイルエラー：1つの catch に複数の例外は指定できない" },
      { label: "B", text: "正しい構文で、IOException と SQLException の両方をキャッチできる" },
      { label: "C", text: "親子関係にある例外同士でも使用できる" },
      { label: "D", text: "変数 e は再代入可能である" },
    ],
    correctLabel: "B",
    explanation:
      "マルチキャッチ（Java 7以降）は | で複数の例外型を1つの catch で扱えます。ただし親子関係にある例外（例：Exception | IOException）はコンパイルエラーになります。マルチキャッチの変数 e は暗黙的に final であり再代入できません。",
    category: "exceptions",
    difficulty: "intermediate",
  },
  {
    id: "exceptions-9",
    question: "次のコードの出力は何ですか？",
    code: `try {
    System.out.print("A");
    throw new RuntimeException();
} catch (RuntimeException e) {
    System.out.print("B");
} finally {
    System.out.print("C");
}
System.out.print("D");`,
    choices: [
      { label: "A", text: "ABD" },
      { label: "B", text: "ABCD" },
      { label: "C", text: "ABC" },
      { label: "D", text: "ACD" },
    ],
    correctLabel: "B",
    explanation:
      "try ブロックで\"A\"を出力後、例外がスローされます。catch ブロックで例外をキャッチし\"B\"を出力。finally ブロックは必ず実行され\"C\"を出力。例外がキャッチされたため、プログラムは正常に継続し\"D\"が出力されます。結果は「ABCD」です。",
    category: "exceptions",
    difficulty: "intermediate",
  },
  // ============================================================
  // exceptions - advanced (追加)
  // ============================================================
  {
    id: "exceptions-10",
    question: "次のコードでは何が出力されますか？",
    code: `try {
    try {
        throw new RuntimeException("inner");
    } finally {
        throw new RuntimeException("finally");
    }
} catch (RuntimeException e) {
    System.out.println(e.getMessage());
}`,
    choices: [
      { label: "A", text: "inner" },
      { label: "B", text: "finally" },
      { label: "C", text: "inner と finally 両方" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "B",
    explanation:
      "内側の try で \"inner\" 例外がスローされますが、finally ブロックで新しい例外 \"finally\" がスローされます。finally で例外がスローされると、元の例外（\"inner\"）は抑制（suppressed）され、finally の例外が外側に伝播します。そのため \"finally\" が出力されます。元の例外を保持するには addSuppressed() を使用します。",
    category: "exceptions",
    difficulty: "advanced",
  },
  // ============================================================
  // streams - beginner (追加)
  // ============================================================
  {
    id: "streams-7",
    question: "次のコードの出力は何ですか？",
    code: `List<String> list = List.of("banana", "apple", "cherry");
list.stream()
    .sorted()
    .forEach(s -> System.out.print(s + " "));`,
    choices: [
      { label: "A", text: "banana apple cherry" },
      { label: "B", text: "apple banana cherry" },
      { label: "C", text: "cherry banana apple" },
      { label: "D", text: "元のリストが変更される" },
    ],
    correctLabel: "B",
    explanation:
      "sorted() は自然順序（String の場合はアルファベット順）でソートする中間操作です。forEach() は終端操作で各要素に対してアクションを実行します。Stream操作は元のリストを変更しません。結果は「apple banana cherry」です。",
    category: "streams",
    difficulty: "beginner",
  },
  {
    id: "streams-8",
    question: "Stream の map() と flatMap() の違いについて正しいものはどれですか？",
    choices: [
      { label: "A", text: "map() は要素を変換し、flatMap() は変換結果のストリームを平坦化する" },
      { label: "B", text: "map() と flatMap() は全く同じ動作をする" },
      { label: "C", text: "flatMap() は終端操作である" },
      { label: "D", text: "map() は複数の要素を返せるが、flatMap() は1つだけ" },
    ],
    correctLabel: "A",
    explanation:
      "map() は各要素を1対1で別の要素に変換します（T → R）。flatMap() は各要素をストリームに変換し、結果のストリームを平坦化（flatten）して1つのストリームにします（T → Stream<R>）。例えば、List<List<String>> を List<String> に変換する際に flatMap() が有効です。両方とも中間操作です。",
    category: "streams",
    difficulty: "beginner",
  },
  // ============================================================
  // streams - intermediate (追加)
  // ============================================================
  {
    id: "streams-9",
    question: "次のコードの出力は何ですか？",
    code: `int sum = IntStream.rangeClosed(1, 5)
    .reduce(0, Integer::sum);
System.out.println(sum);`,
    choices: [
      { label: "A", text: "10" },
      { label: "B", text: "15" },
      { label: "C", text: "5" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "B",
    explanation:
      "IntStream.rangeClosed(1, 5) は 1, 2, 3, 4, 5 の IntStream を生成します（終値を含む）。reduce(0, Integer::sum) は初期値 0 から全要素を合計します。1+2+3+4+5=15 なので出力は「15」です。IntStream.range(1, 5) は終値を含まず 1〜4 になります。",
    category: "streams",
    difficulty: "intermediate",
  },
  {
    id: "streams-10",
    question: "次のコードの出力は何ですか？",
    code: `Map<Boolean, List<Integer>> result =
    List.of(1, 2, 3, 4, 5, 6).stream()
        .collect(Collectors.partitioningBy(n -> n % 2 == 0));
System.out.println(result);`,
    choices: [
      { label: "A", text: "{true=[2, 4, 6], false=[1, 3, 5]}" },
      { label: "B", text: "{even=[2, 4, 6], odd=[1, 3, 5]}" },
      { label: "C", text: "{false=[2, 4, 6], true=[1, 3, 5]}" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "A",
    explanation:
      "Collectors.partitioningBy() は Predicate の結果に基づいて要素を true と false の2グループに分割します。偶数は true グループに、奇数は false グループに分類されます。キーは Boolean 型で、常に true と false の2つのエントリを持つ Map が返されます。",
    category: "streams",
    difficulty: "intermediate",
  },
  // ============================================================
  // streams - advanced (追加)
  // ============================================================
  {
    id: "streams-11",
    question: "並列ストリーム（parallel stream）について正しいものはどれですか？",
    choices: [
      { label: "A", text: "常に逐次ストリームより高速である" },
      { label: "B", text: "要素の処理順序が保証される" },
      { label: "C", text: "ForkJoinPool を使用して並列処理を行い、要素数が少ない場合はオーバーヘッドで逆に遅くなることがある" },
      { label: "D", text: "ステートフルな中間操作に最適である" },
    ],
    correctLabel: "C",
    explanation:
      "parallel stream は内部で ForkJoinPool.commonPool() を使用します。要素数が少ない場合、スレッド管理のオーバーヘッドにより逐次処理より遅くなることがあります。処理順序は保証されず（forEachOrdered() で順序を維持可能）、共有状態を持つステートフルな操作は競合状態を引き起こす可能性があります。",
    category: "streams",
    difficulty: "advanced",
  },
  {
    id: "streams-12",
    question: "次のコードの出力は何ですか？",
    code: `String result = Stream.of("J", "a", "v", "a")
    .collect(Collectors.joining("-", "[", "]"));
System.out.println(result);`,
    choices: [
      { label: "A", text: "J-a-v-a" },
      { label: "B", text: "[J-a-v-a]" },
      { label: "C", text: "[Java]" },
      { label: "D", text: "-J-a-v-a-" },
    ],
    correctLabel: "B",
    explanation:
      "Collectors.joining(delimiter, prefix, suffix) は要素をデリミタで結合し、プレフィックスとサフィックスを付加します。デリミタ \"-\" で結合し、プレフィックス \"[\" とサフィックス \"]\" を付けるため、結果は「[J-a-v-a]」です。",
    category: "streams",
    difficulty: "advanced",
  },
  // ============================================================
  // concurrency - beginner (追加)
  // ============================================================
  {
    id: "concurrency-7",
    question: "Thread の状態（ライフサイクル）に含まれないものはどれですか？",
    choices: [
      { label: "A", text: "NEW" },
      { label: "B", text: "RUNNABLE" },
      { label: "C", text: "STOPPED" },
      { label: "D", text: "BLOCKED" },
    ],
    correctLabel: "C",
    explanation:
      "Java の Thread.State enum は NEW、RUNNABLE、BLOCKED、WAITING、TIMED_WAITING、TERMINATED の6つの状態を定義しています。「STOPPED」は存在しません。スレッドが実行を終了した状態は TERMINATED です。Thread.stop() メソッドは非推奨（deprecated）です。",
    category: "concurrency",
    difficulty: "beginner",
  },
  {
    id: "concurrency-8",
    question: "Thread.sleep() について正しいものはどれですか？",
    choices: [
      { label: "A", text: "ロック（モニタ）を解放する" },
      { label: "B", text: "指定時間スレッドを一時停止し、ロックは保持したまま" },
      { label: "C", text: "他のスレッドを停止させる" },
      { label: "D", text: "InterruptedException をスローしない" },
    ],
    correctLabel: "B",
    explanation:
      "Thread.sleep() は現在のスレッドを指定ミリ秒間一時停止しますが、保持しているロック（モニタ）は解放しません。Object.wait() はロックを解放する点が異なります。sleep() は InterruptedException をスローする可能性があるため、try-catch が必要です。",
    category: "concurrency",
    difficulty: "beginner",
  },
  // ============================================================
  // concurrency - intermediate (追加)
  // ============================================================
  {
    id: "concurrency-9",
    question: "ExecutorService について正しいものはどれですか？",
    code: `ExecutorService executor = Executors.newFixedThreadPool(3);
executor.submit(() -> System.out.println("Task"));
executor.shutdown();`,
    choices: [
      { label: "A", text: "shutdown() は実行中のタスクを即座に中断する" },
      { label: "B", text: "shutdown() は新しいタスクの受付を停止し、送信済みタスクの完了を待つ" },
      { label: "C", text: "newFixedThreadPool(3) は最大3つのタスクしか実行できない" },
      { label: "D", text: "submit() は同期的にタスクを実行する" },
    ],
    correctLabel: "B",
    explanation:
      "shutdown() は新しいタスクの受付を停止し、既に送信されたタスクの完了を待ちます。即座に停止するには shutdownNow() を使います。newFixedThreadPool(3) は同時に3スレッドまで実行し、超過分はキューで待機します。submit() は非同期でタスクを実行し Future を返します。",
    category: "concurrency",
    difficulty: "intermediate",
  },
  {
    id: "concurrency-10",
    question: "AtomicInteger の説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "synchronized と同じくロックを使用して排他制御する" },
      { label: "B", text: "CAS（Compare-And-Swap）操作でロックフリーなアトミック操作を提供する" },
      { label: "C", text: "int型より多くのメモリを消費しない" },
      { label: "D", text: "複数のフィールドの同時更新を保証する" },
    ],
    correctLabel: "B",
    explanation:
      "AtomicInteger はCAS（Compare-And-Swap）というハードウェアレベルの命令を使用し、ロックなしでアトミックな操作を提供します。incrementAndGet()、compareAndSet() などのメソッドがスレッドセーフです。単一の変数のアトミック操作に特化しており、複数変数の同時更新には使えません。",
    category: "concurrency",
    difficulty: "intermediate",
  },
  // ============================================================
  // concurrency - advanced (追加)
  // ============================================================
  {
    id: "concurrency-11",
    question: "次のコードの問題点は何ですか？",
    code: `class Service {
    private final Map<String, String> cache =
        new HashMap<>();

    public String get(String key) {
        return cache.get(key);
    }
    public void put(String key, String value) {
        cache.put(key, value);
    }
}`,
    choices: [
      { label: "A", text: "問題なし。HashMap は常にスレッドセーフ" },
      { label: "B", text: "HashMap はスレッドセーフでなく、複数スレッドからの同時アクセスでデータ破損の恐れがある" },
      { label: "C", text: "final 修飾子のため値を追加できない" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "B",
    explanation:
      "HashMap はスレッドセーフではありません。複数スレッドから同時に読み書きすると、データ競合、無限ループ、データ破損が発生する可能性があります。解決策として ConcurrentHashMap の使用、Collections.synchronizedMap() でラップ、または明示的な synchronized ブロックが考えられます。final はフィールドの再代入を防ぐだけで、Map の内容変更は可能です。",
    category: "concurrency",
    difficulty: "advanced",
  },
  // ============================================================
  // modern - beginner (追加)
  // ============================================================
  {
    id: "modern-8",
    question: "ラムダ式の書き方として正しいものはどれですか？",
    choices: [
      { label: "A", text: "(x, y) -> x + y" },
      { label: "B", text: "x, y -> x + y" },
      { label: "C", text: "(x, y) => x + y" },
      { label: "D", text: "lambda(x, y) { return x + y; }" },
    ],
    correctLabel: "A",
    explanation:
      "Javaのラムダ式は (引数) -> 式 または (引数) -> { 文 } の形式です。引数が複数の場合は括弧が必要です。矢印は -> であり、=> (JavaScriptのアロー関数)ではありません。引数が1つの場合のみ括弧を省略でき、x -> x * 2 と書けます。",
    category: "modern",
    difficulty: "beginner",
  },
  {
    id: "modern-9",
    question: "メソッド参照について正しいものはどれですか？",
    code: `List<String> list = List.of("c", "a", "b");
list.stream().sorted(String::compareTo);`,
    choices: [
      { label: "A", text: "String::compareTo はラムダ式 (s1, s2) -> s1.compareTo(s2) と等価" },
      { label: "B", text: "メソッド参照はラムダ式より低速である" },
      { label: "C", text: "メソッド参照では引数の型を明示する必要がある" },
      { label: "D", text: "メソッド参照は static メソッドにのみ使用できる" },
    ],
    correctLabel: "A",
    explanation:
      "メソッド参照（Method Reference）はラムダ式の簡潔な記法です。String::compareTo は (s1, s2) -> s1.compareTo(s2) と等価です。メソッド参照には4種類あります：静的メソッド（Class::staticMethod）、インスタンスメソッド（instance::method）、任意オブジェクトのインスタンスメソッド（Class::method）、コンストラクタ（Class::new）。",
    category: "modern",
    difficulty: "beginner",
  },
  // ============================================================
  // modern - intermediate (追加)
  // ============================================================
  {
    id: "modern-10",
    question: "次のコードの出力は何ですか？",
    code: `sealed interface Expr permits Num, Add {}
record Num(int value) implements Expr {}
record Add(Expr left, Expr right) implements Expr {}

Expr expr = new Add(new Num(1), new Num(2));
String result = switch (expr) {
    case Num n -> "数値: " + n.value();
    case Add a -> "加算式";
};
System.out.println(result);`,
    choices: [
      { label: "A", text: "数値: 1" },
      { label: "B", text: "加算式" },
      { label: "C", text: "コンパイルエラー：default が必要" },
      { label: "D", text: "コンパイルエラー：switch で型パターンは使えない" },
    ],
    correctLabel: "B",
    explanation:
      "sealed interface と record を組み合わせたパターンマッチング switch です。expr は Add 型なので case Add a にマッチし「加算式」が出力されます。sealed interface の permits で全サブタイプが列挙されているため、コンパイラが網羅性をチェックでき default は不要です。",
    category: "modern",
    difficulty: "intermediate",
  },
  {
    id: "modern-11",
    question: "Java 9 のモジュールシステム（JPMS）について正しいものはどれですか？",
    choices: [
      { label: "A", text: "module-info.java で公開パッケージやモジュール間の依存を宣言する" },
      { label: "B", text: "すべてのクラスをモジュールに移行する義務がある" },
      { label: "C", text: "リフレクションのアクセス制御に影響しない" },
      { label: "D", text: "モジュールシステムは Java 11 で導入された" },
    ],
    correctLabel: "A",
    explanation:
      "Java 9 で導入された JPMS（Java Platform Module System）は、module-info.java で requires（依存モジュール）と exports（公開パッケージ）を宣言します。非モジュール化コードは unnamed module として動作し、移行は任意です。強いカプセル化により、exports されていないパッケージへのリフレクションアクセスも制限されます。",
    category: "modern",
    difficulty: "intermediate",
  },
  // ============================================================
  // modern - advanced (追加)
  // ============================================================
  {
    id: "modern-12",
    question: "Structured Concurrency（構造化並行性）について正しいものはどれですか？",
    choices: [
      { label: "A", text: "従来の ExecutorService と同じ動作をする" },
      { label: "B", text: "並行タスクのライフタイムをスコープに結びつけ、構造化されたタスク管理を実現する" },
      { label: "C", text: "Virtual Threads と互換性がない" },
      { label: "D", text: "Java 8 で正式導入された" },
    ],
    correctLabel: "B",
    explanation:
      "Structured Concurrency（Java 21でプレビュー）は、StructuredTaskScope を使って並行タスクのライフタイムをスコープに結びつけます。子タスクの完了やキャンセルが自動管理され、エラー処理も構造化されます。Virtual Threads との組み合わせが前提で、タスクのリーク防止や可読性の向上を目的としています。",
    category: "modern",
    difficulty: "advanced",
  },
  {
    id: "modern-13",
    question: "Stream Gatherers（Java 24）について正しいものはどれですか？",
    choices: [
      { label: "A", text: "既存の Collector インタフェースの別名である" },
      { label: "B", text: "中間操作をカスタム定義でき、ウィンドウ処理やステートフルな変換が可能になる" },
      { label: "C", text: "終端操作のみカスタマイズできる" },
      { label: "D", text: "並列ストリームでは使用できない" },
    ],
    correctLabel: "B",
    explanation:
      "Stream Gatherers（Java 24正式）は gather() メソッドで中間操作をカスタム定義できる仕組みです。Gatherer インタフェースを実装し、スライディングウィンドウ、グルーピング、ステートフルなフィルタリングなど、既存の中間操作では表現しにくい処理を可能にします。Collectors.teeing() のような複合操作も中間操作として実現できます。",
    category: "modern",
    difficulty: "advanced",
  },
  {
    id: "modern-14",
    question: "次のコードの出力は何ですか？（Java 21以降）",
    code: `Object obj = "Hello";
String result = switch (obj) {
    case Integer i -> "整数: " + i;
    case String s when s.length() > 3 -> "長い文字列: " + s;
    case String s -> "短い文字列: " + s;
    default -> "その他";
};
System.out.println(result);`,
    choices: [
      { label: "A", text: "長い文字列: Hello" },
      { label: "B", text: "短い文字列: Hello" },
      { label: "C", text: "その他" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "A",
    explanation:
      "Java 21 のパターンマッチング switch で、ガード条件（when 節）を使用しています。obj は \"Hello\"（長さ5）なので、case String s when s.length() > 3 にマッチし「長い文字列: Hello」が出力されます。when 節付きの case はガード条件なしの case より先に評価される必要があります。",
    category: "modern",
    difficulty: "advanced",
  },
  // ============================================================
  // basics - intermediate (追加2)
  // ============================================================
  {
    id: "basics-19",
    question: "次のコードの出力は何ですか？",
    code: `StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");
sb.insert(5, ",");
System.out.println(sb);`,
    choices: [
      { label: "A", text: "Hello, World" },
      { label: "B", text: "Hello World" },
      { label: "C", text: ",Hello World" },
      { label: "D", text: "Hello World," },
    ],
    correctLabel: "A",
    explanation:
      "StringBuilder は可変（mutable）な文字列クラスです。append(\" World\") で \"Hello World\" になり、insert(5, \",\") でインデックス5の位置（\"Hello\" の直後）に \",\" を挿入して \"Hello, World\" になります。String と異なり、操作ごとに新しいオブジェクトは作成されません。",
    category: "basics",
    difficulty: "intermediate",
  },
  {
    id: "basics-20",
    question: "三項演算子の結果として正しいものはどれですか？",
    code: `int x = 10;
String result = (x > 5) ? "大きい" : "小さい";
System.out.println(result);`,
    choices: [
      { label: "A", text: "大きい" },
      { label: "B", text: "小さい" },
      { label: "C", text: "10" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "A",
    explanation:
      "三項演算子（条件演算子）は 条件 ? 真の値 : 偽の値 の形式です。x=10 は 5 より大きいので条件は true となり、\"大きい\" が result に代入されます。三項演算子はif-else文の簡潔な書き方として使えますが、ネストすると可読性が低下します。",
    category: "basics",
    difficulty: "intermediate",
  },
  // ============================================================
  // oop - intermediate (追加2)
  // ============================================================
  {
    id: "oop-15",
    question: "次のコードはコンパイルできますか？",
    code: `interface Flyable {
    void fly();
}
interface Swimmable {
    void swim();
}
class Duck implements Flyable, Swimmable {
    public void fly() { System.out.println("飛ぶ"); }
    public void swim() { System.out.println("泳ぐ"); }
}`,
    choices: [
      { label: "A", text: "コンパイルエラー：複数のインタフェースを実装できない" },
      { label: "B", text: "正しいコード。Javaは複数のインタフェースを実装できる" },
      { label: "C", text: "コンパイルエラー：メソッドが衝突する" },
      { label: "D", text: "実行時エラー" },
    ],
    correctLabel: "B",
    explanation:
      "Javaはクラスの多重継承は許可しませんが、複数のインタフェースを実装できます。Duck クラスは Flyable と Swimmable の両方のメソッドを実装しています。これによりJavaは多重継承の「菱形問題」を避けつつ、柔軟な型の組み合わせを実現しています。",
    category: "oop",
    difficulty: "intermediate",
  },
  // ============================================================
  // collections - intermediate (追加2)
  // ============================================================
  {
    id: "collections-13",
    question: "次のコードの出力は何ですか？",
    code: `Deque<String> stack = new ArrayDeque<>();
stack.push("A");
stack.push("B");
stack.push("C");
System.out.print(stack.pop() + " ");
System.out.print(stack.peek() + " ");
System.out.print(stack.size());`,
    choices: [
      { label: "A", text: "A B 2" },
      { label: "B", text: "C B 2" },
      { label: "C", text: "C C 2" },
      { label: "D", text: "A A 2" },
    ],
    correctLabel: "B",
    explanation:
      "ArrayDeque をスタック（LIFO）として使用しています。push() で A, B, C の順に追加するとスタックトップは C です。pop() は C を取り出して返します。peek() は次の先頭要素 B を取り出さずに返します。pop() で1要素減ったので size() は 2 です。",
    category: "collections",
    difficulty: "intermediate",
  },
  // ============================================================
  // streams - intermediate (追加2)
  // ============================================================
  {
    id: "streams-13",
    question: "次のコードの出力は何ですか？",
    code: `Map<String, Long> result = Stream.of(
    "apple", "banana", "apple", "cherry", "banana", "apple"
).collect(Collectors.groupingBy(
    s -> s, Collectors.counting()
));
System.out.println(result.get("apple"));`,
    choices: [
      { label: "A", text: "1" },
      { label: "B", text: "2" },
      { label: "C", text: "3" },
      { label: "D", text: "null" },
    ],
    correctLabel: "C",
    explanation:
      "Collectors.groupingBy() でキーごとにグルーピングし、Collectors.counting() で各グループの要素数をカウントします。\"apple\" は3回出現するため result.get(\"apple\") は 3L を返します。groupingBy と counting の組み合わせは頻度カウントのイディオムです。",
    category: "streams",
    difficulty: "intermediate",
  },
  // ============================================================
  // concurrency - advanced (追加2)
  // ============================================================
  {
    id: "concurrency-12",
    question: "次のコードの問題点は何ですか？",
    code: `final Lock lockA = new ReentrantLock();
final Lock lockB = new ReentrantLock();
// Thread 1
lockA.lock(); lockB.lock();
// Thread 2
lockB.lock(); lockA.lock();`,
    choices: [
      { label: "A", text: "問題なし" },
      { label: "B", text: "デッドロックが発生する可能性がある" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "ReentrantLock は2つ同時に取得できない" },
    ],
    correctLabel: "B",
    explanation:
      "Thread 1 が lockA → lockB、Thread 2 が lockB → lockA の順でロックを取得しようとするため、デッドロックが発生する可能性があります（循環待ち）。解決策は常に同じ順序でロックを取得すること（例：両スレッドで lockA → lockB の順）や、tryLock() でタイムアウト付きのロック取得を使用することです。",
    category: "concurrency",
    difficulty: "advanced",
  },
  // ============================================================
  // oop - beginner (追加2)
  // ============================================================
  {
    id: "oop-16",
    question: "オーバーロード（Overload）とオーバーライド（Override）の違いとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "オーバーロードは同じメソッド名で異なる引数リスト、オーバーライドは親クラスのメソッドを子クラスで再定義" },
      { label: "B", text: "オーバーロードは親クラスのメソッドを再定義、オーバーライドは同じメソッド名で異なる引数リスト" },
      { label: "C", text: "どちらも同じ概念の別名である" },
      { label: "D", text: "オーバーロードは実行時に、オーバーライドはコンパイル時に解決される" },
    ],
    correctLabel: "A",
    explanation:
      "オーバーロードは同一クラス内で同名メソッドを引数の型や数を変えて複数定義することで、コンパイル時に解決されます。オーバーライドは継承関係で親クラスのメソッドを子クラスで再定義することで、実行時に解決されます（動的ディスパッチ）。@Override アノテーションの使用が推奨されます。",
    category: "oop",
    difficulty: "beginner",
  },
  // ============================================================
  // basics - advanced (追加2)
  // ============================================================
  {
    id: "basics-21",
    question: "次のコードの出力は何ですか？",
    code: `String s = "Hello World";
System.out.println(s.substring(0, 5));
System.out.println(s.indexOf('o'));
System.out.println(s.replace('l', 'L'));`,
    choices: [
      { label: "A", text: "Hello, 4, HeLLo WorLd" },
      { label: "B", text: "Hello, 5, HeLLo WorLd" },
      { label: "C", text: "Hell, 4, HeLLo WorLd" },
      { label: "D", text: "Hello, 4, Hello World" },
    ],
    correctLabel: "A",
    explanation:
      "substring(0, 5) は インデックス0から4まで（5は含まない）を抽出し \"Hello\" を返します。indexOf('o') は最初の 'o' の位置を返し、\"Hello\" の 'o' はインデックス4です。replace('l', 'L') は全ての 'l' を 'L' に置換し \"HeLLo WorLd\" を返します。",
    category: "basics",
    difficulty: "advanced",
  },
  // ============================================================
  // exceptions - advanced (追加2)
  // ============================================================
  {
    id: "exceptions-11",
    question: "カスタム例外クラスの実装として適切なものはどれですか？",
    code: `public class InsufficientFundsException
    extends Exception {
    private final double amount;
    public InsufficientFundsException(double amount) {
        super("残高不足: " + amount + "円必要です");
        this.amount = amount;
    }
    public double getAmount() { return amount; }
}`,
    choices: [
      { label: "A", text: "Exceptionを継承しているのでチェック例外として扱われる" },
      { label: "B", text: "RuntimeExceptionを継承すべきでコンパイルエラーになる" },
      { label: "C", text: "カスタム例外にフィールドを持たせることはできない" },
      { label: "D", text: "super() を呼ぶ必要はない" },
    ],
    correctLabel: "A",
    explanation:
      "Exception を直接継承したカスタム例外はチェック例外となり、呼び出し元で try-catch または throws 宣言が必要になります。非チェック例外にしたい場合は RuntimeException を継承します。カスタム例外にフィールドやメソッドを追加して、エラーの詳細情報を保持させることは一般的なプラクティスです。",
    category: "exceptions",
    difficulty: "advanced",
  },
  // ============================================================
  //  Excel - beginner
  // ============================================================
  {
    id: "excel-1",
    question: "Excelでセル A1 から A10 の合計を求める関数はどれですか？",
    choices: [
      { label: "A", text: "=SUM(A1:A10)" },
      { label: "B", text: "=TOTAL(A1:A10)" },
      { label: "C", text: "=ADD(A1:A10)" },
      { label: "D", text: "=SUM(A1-A10)" },
    ],
    correctLabel: "A",
    explanation:
      "SUM関数はセル範囲の合計を求めます。範囲はコロン（:）で指定し、=SUM(A1:A10) が正しい書き方です。TOTAL や ADD という関数はExcelに存在しません。ハイフン（-）は減算演算子であり範囲指定には使えません。",
    category: "excel",
    difficulty: "beginner",
  },
  {
    id: "excel-2",
    question: "Excelのセル参照で「$A$1」の意味は何ですか？",
    choices: [
      { label: "A", text: "相対参照" },
      { label: "B", text: "絶対参照" },
      { label: "C", text: "複合参照" },
      { label: "D", text: "外部参照" },
    ],
    correctLabel: "B",
    explanation:
      "$A$1 は絶対参照で、数式をコピーしても行と列の参照が変わりません。$A1 は列のみ絶対（複合参照）、A$1 は行のみ絶対（複合参照）、A1 は相対参照（コピー時に行列とも変わる）です。F4キーで参照方法を切り替えられます。",
    category: "excel",
    difficulty: "beginner",
  },
  {
    id: "excel-3",
    question: "Excelで平均値を求める関数はどれですか？",
    choices: [
      { label: "A", text: "=MEAN(A1:A10)" },
      { label: "B", text: "=AVG(A1:A10)" },
      { label: "C", text: "=AVERAGE(A1:A10)" },
      { label: "D", text: "=MID(A1:A10)" },
    ],
    correctLabel: "C",
    explanation:
      "AVERAGE関数はセル範囲の算術平均を求めます。MEAN や AVG という関数名はExcelには存在しません。MID関数は文字列の中央部分を抽出する関数です。空白セルは計算から除外されますが、0が入力されたセルは計算に含まれます。",
    category: "excel",
    difficulty: "beginner",
  },
  {
    id: "excel-4",
    question: "Excelで現在の日付を返す関数はどれですか？",
    choices: [
      { label: "A", text: "=NOW()" },
      { label: "B", text: "=TODAY()" },
      { label: "C", text: "=DATE()" },
      { label: "D", text: "=CURRENT()" },
    ],
    correctLabel: "B",
    explanation:
      "TODAY() は現在の日付のみを返します。NOW() は現在の日付と時刻の両方を返します。DATE() は年・月・日の引数からシリアル値を作成する関数で、引数なしでは使えません。CURRENT() はExcelに存在しません。",
    category: "excel",
    difficulty: "beginner",
  },
  {
    id: "excel-5",
    question: "Excelで数値の個数を数える関数はどれですか？",
    choices: [
      { label: "A", text: "=COUNTA(A1:A10)" },
      { label: "B", text: "=COUNT(A1:A10)" },
      { label: "C", text: "=COUNTIF(A1:A10)" },
      { label: "D", text: "=LEN(A1:A10)" },
    ],
    correctLabel: "B",
    explanation:
      "COUNT関数は数値が入力されたセルの個数を数えます。COUNTA関数は空でないセル（文字列含む）の個数を数えます。COUNTIF関数は条件に一致するセルの個数を数えますが、条件の引数が必要です。LEN関数は文字列の文字数を返します。",
    category: "excel",
    difficulty: "beginner",
  },
  {
    id: "excel-6",
    question: "Excelでセルに「0001」と数字の先頭のゼロを表示するにはどうしますか？",
    choices: [
      { label: "A", text: "そのまま 0001 と入力する" },
      { label: "B", text: "セルの書式を「文字列」に設定してから入力する" },
      { label: "C", text: "=0001 と入力する" },
      { label: "D", text: "先頭のゼロを表示する方法はない" },
    ],
    correctLabel: "B",
    explanation:
      "標準の書式ではExcelは先頭のゼロを自動削除し「1」と表示します。先頭のゼロを保持するには、セルの書式を「文字列」に設定するか、先頭にアポストロフィ（'0001）を付けます。また、表示形式のユーザー定義で「0000」と設定する方法もあります。",
    category: "excel",
    difficulty: "beginner",
  },
  {
    id: "excel-7",
    question: "Excelで最大値を求める関数はどれですか？",
    choices: [
      { label: "A", text: "=LARGE(A1:A10)" },
      { label: "B", text: "=MAX(A1:A10)" },
      { label: "C", text: "=HIGH(A1:A10)" },
      { label: "D", text: "=TOP(A1:A10)" },
    ],
    correctLabel: "B",
    explanation:
      "MAX関数は範囲内の最大値を返します。LARGE関数は k 番目に大きい値を返す関数で、第2引数に順位を指定する必要があります（例：=LARGE(A1:A10, 1) は最大値）。HIGH や TOP はExcelに存在しません。最小値には MIN 関数を使います。",
    category: "excel",
    difficulty: "beginner",
  },
  // ============================================================
  //  Excel - intermediate
  // ============================================================
  {
    id: "excel-8",
    question: "=IF(A1>=80, \"合格\", \"不合格\") の意味として正しいものはどれですか？",
    choices: [
      { label: "A", text: "A1が80以上なら「不合格」、それ以外なら「合格」" },
      { label: "B", text: "A1が80以上なら「合格」、それ以外なら「不合格」" },
      { label: "C", text: "A1が80より大きいなら「合格」" },
      { label: "D", text: "構文エラー" },
    ],
    correctLabel: "B",
    explanation:
      "IF関数は =IF(条件, 真の場合, 偽の場合) の構文です。A1>=80 は「A1が80以上」を意味し、条件が真なら第2引数「合格」、偽なら第3引数「不合格」を返します。>=は「以上」、>は「より大きい」を意味します。",
    category: "excel",
    difficulty: "intermediate",
  },
  {
    id: "excel-9",
    question: "VLOOKUP関数の第4引数について正しいものはどれですか？",
    code: `=VLOOKUP(A1, B1:D10, 3, FALSE)`,
    choices: [
      { label: "A", text: "TRUE は完全一致検索、FALSE は近似一致検索" },
      { label: "B", text: "FALSE は完全一致検索、TRUE は近似一致検索" },
      { label: "C", text: "第4引数は省略できない" },
      { label: "D", text: "TRUE と FALSE の結果は常に同じ" },
    ],
    correctLabel: "B",
    explanation:
      "VLOOKUP の第4引数は検索方法を指定します。FALSE（または0）は完全一致検索で、正確に一致する値のみ返します。TRUE（または1、省略時のデフォルト）は近似一致検索で、検索値以下の最大値を返します。実務では FALSE を指定することが多いです。",
    category: "excel",
    difficulty: "intermediate",
  },
  {
    id: "excel-10",
    question: "=COUNTIF(A1:A20, \">=80\") は何を返しますか？",
    choices: [
      { label: "A", text: "A1:A20の範囲で80以上のセルの個数" },
      { label: "B", text: "A1:A20の範囲で80より大きいセルの個数" },
      { label: "C", text: "A1:A20の合計が80以上かどうか" },
      { label: "D", text: "構文エラー" },
    ],
    correctLabel: "A",
    explanation:
      "COUNTIF関数は =COUNTIF(範囲, 条件) の構文で、条件に一致するセルの個数を返します。\">=80\" は「80以上」を意味します。条件の比較演算子と数値は文字列として指定します。複数条件で数える場合は COUNTIFS 関数を使用します。",
    category: "excel",
    difficulty: "intermediate",
  },
  {
    id: "excel-11",
    question: "=CONCATENATE(\"Hello\", \" \", \"World\") の結果は何ですか？",
    choices: [
      { label: "A", text: "HelloWorld" },
      { label: "B", text: "Hello World" },
      { label: "C", text: "Hello, World" },
      { label: "D", text: "#VALUE! エラー" },
    ],
    correctLabel: "B",
    explanation:
      "CONCATENATE関数は引数の文字列を結合します。第2引数にスペース（\" \"）が含まれているため、結果は「Hello World」です。Excel 2019以降では CONCAT 関数や & 演算子（=\"Hello\" & \" \" & \"World\"）でも同様の結合が可能です。",
    category: "excel",
    difficulty: "intermediate",
  },
  {
    id: "excel-12",
    question: "Excelの IFERROR 関数について正しいものはどれですか？",
    code: `=IFERROR(A1/B1, "エラー")`,
    choices: [
      { label: "A", text: "B1が0でも常にA1/B1の結果を返す" },
      { label: "B", text: "A1/B1がエラーの場合に「エラー」を返し、正常時は計算結果を返す" },
      { label: "C", text: "A1/B1の結果が負の値なら「エラー」を返す" },
      { label: "D", text: "常に「エラー」を返す" },
    ],
    correctLabel: "B",
    explanation:
      "IFERROR関数は第1引数の計算結果がエラー（#DIV/0!, #VALUE!, #REF! 等）の場合に第2引数を返し、正常な場合は計算結果をそのまま返します。B1が0の場合 A1/B1 は #DIV/0! エラーとなるため「エラー」が返されます。",
    category: "excel",
    difficulty: "intermediate",
  },
  {
    id: "excel-13",
    question: "=ROUND(3.456, 2) の結果は何ですか？",
    choices: [
      { label: "A", text: "3.45" },
      { label: "B", text: "3.46" },
      { label: "C", text: "3.5" },
      { label: "D", text: "4" },
    ],
    correctLabel: "B",
    explanation:
      "ROUND関数は指定した桁数に四捨五入します。第2引数の 2 は小数点以下2桁に丸めることを意味します。3.456 の小数第3位は 6 なので切り上げとなり、結果は 3.46 です。ROUNDDOWN は切り捨て、ROUNDUP は切り上げを行います。",
    category: "excel",
    difficulty: "intermediate",
  },
  {
    id: "excel-14",
    question: "=INDEX(A1:C3, 2, 3) は何を返しますか？",
    choices: [
      { label: "A", text: "A2の値" },
      { label: "B", text: "C2の値" },
      { label: "C", text: "B3の値" },
      { label: "D", text: "C3の値" },
    ],
    correctLabel: "B",
    explanation:
      "INDEX関数は =INDEX(範囲, 行番号, 列番号) で指定した位置のセルの値を返します。A1:C3 の範囲で 2行目・3列目は C2 です。INDEX関数はMATCH関数と組み合わせてVLOOKUPの代替として使われることが多く、左方向の検索も可能です。",
    category: "excel",
    difficulty: "intermediate",
  },
  {
    id: "excel-15",
    question: "=LEFT(\"Excel関数\", 5) の結果は何ですか？",
    choices: [
      { label: "A", text: "Excel" },
      { label: "B", text: "Excel関" },
      { label: "C", text: "関数" },
      { label: "D", text: "l関数" },
    ],
    correctLabel: "A",
    explanation:
      "LEFT関数は文字列の左から指定した文字数分を抽出します。\"Excel関数\" の左から5文字は \"Excel\" です。日本語も1文字として数えます。右からの抽出は RIGHT 関数、中央部分の抽出は MID 関数を使用します。",
    category: "excel",
    difficulty: "intermediate",
  },
  {
    id: "excel-16",
    question: "Excelの条件付き書式で「データバー」を使うとどうなりますか？",
    choices: [
      { label: "A", text: "セル内に棒グラフのようなバーが表示される" },
      { label: "B", text: "セルの文字色が変わる" },
      { label: "C", text: "セルにグラフが挿入される" },
      { label: "D", text: "セルに罫線が追加される" },
    ],
    correctLabel: "A",
    explanation:
      "データバーは条件付き書式の一種で、セル内に値の大きさに応じた棒グラフ状のバーを表示します。値の分布やデータの大小を視覚的に把握しやすくなります。他にもカラースケール（色の濃淡）やアイコンセット（矢印やマーク）があります。",
    category: "excel",
    difficulty: "intermediate",
  },
  // ============================================================
  //  Excel - advanced
  // ============================================================
  {
    id: "excel-17",
    question: "=XLOOKUP(E1, A1:A10, C1:C10, \"該当なし\") について正しいものはどれですか？",
    choices: [
      { label: "A", text: "VLOOKUP と全く同じ動作をする" },
      { label: "B", text: "検索値が見つからない場合に「該当なし」を返し、左方向の検索も可能" },
      { label: "C", text: "Excel 2010 以降で使用可能" },
      { label: "D", text: "第4引数は検索方法（近似/完全一致）を指定する" },
    ],
    correctLabel: "B",
    explanation:
      "XLOOKUP（Microsoft 365 / Excel 2021以降）はVLOOKUPの後継関数です。第4引数は見つからない場合のデフォルト値を指定します。VLOOKUPと異なり、検索列が範囲の左端でなくてもよく（左方向検索可能）、デフォルトで完全一致検索を行います。",
    category: "excel",
    difficulty: "advanced",
  },
  {
    id: "excel-18",
    question: "動的配列関数 =FILTER(A1:C10, B1:B10>=80) は何をしますか？",
    choices: [
      { label: "A", text: "B列が80以上の行のみを抽出して複数セルに展開する" },
      { label: "B", text: "B列が80以上のセルの個数を返す" },
      { label: "C", text: "A列からC列の合計が80以上の値を返す" },
      { label: "D", text: "データを80以上のグループにフィルタリングする" },
    ],
    correctLabel: "A",
    explanation:
      "FILTER関数（Microsoft 365 / Excel 2021以降）は動的配列関数で、条件に一致する行を抽出して自動的に複数セルにスピル（展開）します。数式を1つのセルに入力するだけで、結果が隣接するセルに展開されます。従来のフィルター機能と異なり、数式として結果を返すためリアルタイムに更新されます。",
    category: "excel",
    difficulty: "advanced",
  },
  {
    id: "excel-19",
    question: "=SORT(A1:A10, 1, -1) の第3引数「-1」の意味は何ですか？",
    choices: [
      { label: "A", text: "最初の1行を除外する" },
      { label: "B", text: "降順に並べ替える" },
      { label: "C", text: "最後の要素を除外する" },
      { label: "D", text: "エラーを無視する" },
    ],
    correctLabel: "B",
    explanation:
      "SORT関数の第3引数は並べ替え順序を指定します。1（またはTRUE）は昇順、-1（またはFALSE）は降順です。第2引数はソート基準の列番号（ここでは1列目）です。SORT関数は動的配列関数で、結果が複数セルにスピルされます。",
    category: "excel",
    difficulty: "advanced",
  },
  {
    id: "excel-20",
    question: "=UNIQUE(A1:A20) は何を返しますか？",
    choices: [
      { label: "A", text: "重複を除いた一意の値の一覧をスピルして返す" },
      { label: "B", text: "重複する値の個数を返す" },
      { label: "C", text: "一意の値の個数を数える" },
      { label: "D", text: "重複する値のみを抽出する" },
    ],
    correctLabel: "A",
    explanation:
      "UNIQUE関数（Microsoft 365 / Excel 2021以降）は動的配列関数で、重複を除いた一意の値の一覧を返します。第2引数でTRUEを指定すると行全体で比較し、第3引数でTRUEを指定すると1回だけ出現する値のみを返します。結果は複数セルにスピルされます。",
    category: "excel",
    difficulty: "advanced",
  },
  {
    id: "excel-21",
    question: "ピボットテーブルについて正しい説明はどれですか？",
    choices: [
      { label: "A", text: "元データを直接書き換えて集計する" },
      { label: "B", text: "行・列・値・フィルターを自由に配置してデータを集計・分析する機能" },
      { label: "C", text: "グラフの一種である" },
      { label: "D", text: "マクロを使わないと作成できない" },
    ],
    correctLabel: "B",
    explanation:
      "ピボットテーブルは大量のデータをドラッグ＆ドロップで集計・分析できる機能です。行・列・値・フィルターの各エリアにフィールドを配置して、クロス集計や多角的な分析が可能です。元データを変更せず、集計結果を別の場所に表示します。マクロは不要で、メニューから作成できます。",
    category: "excel",
    difficulty: "advanced",
  },
  {
    id: "excel-22",
    question: "=SUMIFS(C1:C10, A1:A10, \"東京\", B1:B10, \">=100\") は何を返しますか？",
    choices: [
      { label: "A", text: "A列が「東京」のC列の合計" },
      { label: "B", text: "A列が「東京」かつB列が100以上のC列の合計" },
      { label: "C", text: "A列が「東京」またはB列が100以上のC列の合計" },
      { label: "D", text: "構文エラー" },
    ],
    correctLabel: "B",
    explanation:
      "SUMIFS関数は複数条件のAND（かつ）条件で合計を求めます。第1引数が合計範囲、以降は条件範囲と条件のペアです。A列が「東京」かつB列が100以上の行のC列の値を合計します。SUMIF（条件が1つ）とは引数の順序が異なるので注意が必要です。",
    category: "excel",
    difficulty: "advanced",
  },
  {
    id: "excel-23",
    question: "=INDEX(A1:C10, MATCH(\"りんご\", A1:A10, 0), 3) は何をしますか？",
    choices: [
      { label: "A", text: "A列で「りんご」を検索し、同じ行のC列の値を返す" },
      { label: "B", text: "C列で「りんご」を検索する" },
      { label: "C", text: "A列とC列の積を返す" },
      { label: "D", text: "3番目の「りんご」を返す" },
    ],
    correctLabel: "A",
    explanation:
      "INDEX+MATCH の組み合わせはVLOOKUPの柔軟な代替手段です。MATCH(\"りんご\", A1:A10, 0) がA列で「りんご」の行番号を返し、INDEX がその行の3列目（C列）の値を返します。VLOOKUPと異なり、検索列が左端でなくても使えるのが大きな利点です。",
    category: "excel",
    difficulty: "advanced",
  },
  {
    id: "excel-24",
    question: "Excelの名前付き範囲（名前の定義）の利点として正しくないものはどれですか？",
    choices: [
      { label: "A", text: "数式が読みやすくなる（例：=SUM(売上データ)）" },
      { label: "B", text: "範囲の変更が一箇所で済む" },
      { label: "C", text: "ファイルサイズが大幅に削減される" },
      { label: "D", text: "数式の入力が簡単になる" },
    ],
    correctLabel: "C",
    explanation:
      "名前付き範囲の主な利点は、数式の可読性向上（=SUM(A1:A100) → =SUM(売上データ)）、範囲変更の一元管理、入力の簡素化です。ファイルサイズの大幅な削減効果はありません。名前はブック全体またはシートスコープで定義でき、数式バーの名前ボックスやCtrl+F3で管理できます。",
    category: "excel",
    difficulty: "advanced",
  },
  // ============================================================
  //  MOS Excel 365 対策 — Domain 1: ワークシートとブックの管理
  // ============================================================
  {
    id: "mos-1",
    question: "Excelでブックを PDF として保存する方法はどれですか？",
    choices: [
      { label: "A", text: "「ファイル」→「名前を付けて保存」→ファイルの種類で「PDF」を選択" },
      { label: "B", text: "「ファイル」→「印刷」→「PDF変換」ボタンをクリック" },
      { label: "C", text: "「挿入」タブから「PDF」を選択" },
      { label: "D", text: "PDF出力はExcelではできない" },
    ],
    correctLabel: "A",
    explanation:
      "「ファイル」→「名前を付けて保存」（またはエクスポート）でファイルの種類をPDFに変更して保存します。また「ファイル」→「エクスポート」→「PDF/XPSドキュメントの作成」からも可能です。印刷範囲や品質のオプションも設定できます。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-2",
    question: "Excelで別のシートのセルA1を参照する正しい数式はどれですか？（シート名：「売上」）",
    choices: [
      { label: "A", text: "=売上.A1" },
      { label: "B", text: "=売上!A1" },
      { label: "C", text: "=売上:A1" },
      { label: "D", text: "=[売上]A1" },
    ],
    correctLabel: "B",
    explanation:
      "別シートの参照は「シート名!セル参照」の形式です。シート名にスペースや特殊文字が含まれる場合は 'シート名'!A1 のように単一引用符で囲みます。別ブックの参照は [ブック名]シート名!A1 の形式です。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-3",
    question: "Excelでウィンドウ枠を固定する目的として正しいものはどれですか？",
    choices: [
      { label: "A", text: "特定の行や列をスクロールしても常に表示されるようにする" },
      { label: "B", text: "セルの内容を編集できなくする" },
      { label: "C", text: "グラフの位置を固定する" },
      { label: "D", text: "数式の参照先を固定する" },
    ],
    correctLabel: "A",
    explanation:
      "ウィンドウ枠の固定は「表示」タブから設定し、ヘッダー行や項目列をスクロールしても画面上に表示し続ける機能です。「先頭行の固定」「先頭列の固定」「ウィンドウ枠の固定」の3種類があります。セルの編集制限にはシートの保護を使います。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-4",
    question: "Excelのヘッダーやフッターを設定できるのはどこですか？",
    choices: [
      { label: "A", text: "「ホーム」タブ" },
      { label: "B", text: "「挿入」タブ →「テキスト」→「ヘッダーとフッター」" },
      { label: "C", text: "「データ」タブ" },
      { label: "D", text: "セルに直接入力する" },
    ],
    correctLabel: "B",
    explanation:
      "ヘッダーとフッターは「挿入」タブの「テキスト」グループから設定します。ページレイアウトビューでも直接編集できます。ページ番号、日付、ファイル名、シート名などの自動フィールドを挿入できます。「ページ設定」ダイアログからも設定可能です。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-5",
    question: "Excelで複数のシートを同時に選択して同じ内容を入力する方法はどれですか？",
    choices: [
      { label: "A", text: "シートタブをCtrlキーを押しながらクリックして選択し、データを入力する" },
      { label: "B", text: "シートをコピーしてから入力する" },
      { label: "C", text: "マクロを使わないと不可能" },
      { label: "D", text: "「データ」タブの「グループ入力」を使用する" },
    ],
    correctLabel: "A",
    explanation:
      "Ctrlキーを押しながらシートタブをクリックするとシートのグループ化ができます（タイトルバーに「[グループ]」と表示）。グループ化した状態で入力すると全シートに同じ内容が入力されます。連続シートはShiftキーで範囲選択できます。作業後はグループ解除を忘れずに。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-6",
    question: "Excelの「ページレイアウト」ビューの説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "印刷結果に近いレイアウトで表示し、ヘッダー/フッターも編集できる" },
      { label: "B", text: "VBAコードを編集するビュー" },
      { label: "C", text: "セルの数式を一覧表示するビュー" },
      { label: "D", text: "グラフだけを表示するビュー" },
    ],
    correctLabel: "A",
    explanation:
      "ページレイアウトビューは印刷時のページ区切り、余白、ヘッダー/フッターが確認・編集できるビューです。「表示」タブから切り替えます。他に「標準」ビュー、「改ページプレビュー」ビューがあります。数式の一覧表示はCtrl+`で切り替えられます。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-7",
    question: "Excelで行や列を非表示にする方法はどれですか？",
    choices: [
      { label: "A", text: "行/列を選択→右クリック→「非表示」" },
      { label: "B", text: "行/列を選択→Deleteキー" },
      { label: "C", text: "「表示」タブ→「非表示」" },
      { label: "D", text: "行/列をドラッグして画面外に移動する" },
    ],
    correctLabel: "A",
    explanation:
      "行番号または列文字を選択して右クリック→「非表示」で非表示にできます。再表示は非表示部分の前後を選択して右クリック→「再表示」です。Deleteキーはセルの内容を削除するだけで行列自体は残ります。「ホーム」→「書式」→「非表示/再表示」からも操作できます。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-8",
    question: "Excelでシートを保護する際、特定のセルだけ編集可能にするにはどうしますか？",
    choices: [
      { label: "A", text: "編集可能にしたいセルの「ロック」を解除してからシートを保護する" },
      { label: "B", text: "シートを保護した後に編集可能なセルを設定する" },
      { label: "C", text: "特定セルの編集許可はできない" },
      { label: "D", text: "セルにパスワードを個別に設定する" },
    ],
    correctLabel: "A",
    explanation:
      "デフォルトでは全セルが「ロック」されています。編集可能にしたいセルを選択→「セルの書式設定」→「保護」タブ→「ロック」のチェックを外します。その後「校閲」→「シートの保護」でシートを保護すると、ロック解除したセルのみ編集可能になります。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-9",
    question: "Excelのプロパティ（ドキュメント情報）に設定できるものはどれですか？",
    choices: [
      { label: "A", text: "タイトル、作成者、コメント、タグ" },
      { label: "B", text: "セルの書式設定のみ" },
      { label: "C", text: "マクロの設定のみ" },
      { label: "D", text: "ネットワーク共有の設定" },
    ],
    correctLabel: "A",
    explanation:
      "ドキュメントのプロパティは「ファイル」→「情報」→「プロパティ」から設定できます。タイトル、作成者、会社名、タグ（キーワード）、カテゴリ、コメントなどのメタデータを設定できます。ファイルの検索性向上や管理に役立ちます。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-10",
    question: "Excelで印刷範囲を設定する方法はどれですか？",
    choices: [
      { label: "A", text: "印刷したい範囲を選択→「ページレイアウト」→「印刷範囲の設定」" },
      { label: "B", text: "「ファイル」→「印刷範囲」" },
      { label: "C", text: "Ctrl+Pで自動的に設定される" },
      { label: "D", text: "印刷範囲は設定できず、常にシート全体が印刷される" },
    ],
    correctLabel: "A",
    explanation:
      "印刷範囲は、対象セルを選択し「ページレイアウト」タブ→「印刷範囲」→「印刷範囲の設定」で設定します。印刷範囲はシートに保存され、印刷時に自動適用されます。「印刷範囲のクリア」で解除できます。複数の離れた範囲も設定でき、各範囲が別ページに印刷されます。",
    category: "mos",
    difficulty: "beginner",
  },
  // ============================================================
  //  MOS Excel 365 対策 — Domain 2: データセルと範囲の管理
  // ============================================================
  {
    id: "mos-11",
    question: "Excelで「形式を選択して貼り付け」で「値のみ」を貼り付けると何が起こりますか？",
    choices: [
      { label: "A", text: "数式と書式がそのまま貼り付けられる" },
      { label: "B", text: "数式の計算結果だけが貼り付けられ、数式や書式は含まれない" },
      { label: "C", text: "書式のみ貼り付けられ、値は含まれない" },
      { label: "D", text: "コメントのみ貼り付けられる" },
    ],
    correctLabel: "B",
    explanation:
      "「値のみ」貼り付けは数式の計算結果を静的な値として貼り付けます。元の数式、書式、罫線、コメントは含まれません。Ctrl+Alt+Vで「形式を選択して貼り付け」ダイアログが開きます。他に「数式」「書式」「列幅」「行列を入れ替え」などの選択肢があります。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-12",
    question: "Excelのオートフィル機能で「月」「火」「水」の次に自動入力される値はどれですか？",
    choices: [
      { label: "A", text: "月" },
      { label: "B", text: "木" },
      { label: "C", text: "水" },
      { label: "D", text: "何も入力されない" },
    ],
    correctLabel: "B",
    explanation:
      "オートフィルはExcelに組み込まれた連続データリスト（曜日、月名など）を認識して自動入力します。「月」「火」「水」の次は「木」「金」「土」「日」と続きます。「1月」「2月」の連続や「第1四半期」「第2四半期」のようなカスタムリストも対応しています。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-13",
    question: "Excelで複数セルにまとめて同じデータを入力するショートカットはどれですか？",
    choices: [
      { label: "A", text: "セルを選択→入力→Ctrl+Enter" },
      { label: "B", text: "セルを選択→入力→Shift+Enter" },
      { label: "C", text: "セルを選択→入力→Alt+Enter" },
      { label: "D", text: "セルを選択→入力→Tab" },
    ],
    correctLabel: "A",
    explanation:
      "複数セルを選択した状態でデータを入力し、Ctrl+Enterを押すと選択したすべてのセルに同じ値が一括入力されます。Shift+Enterは上のセルへ移動、Alt+Enterはセル内改行、Tabは右のセルへ移動します。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-14",
    question: "Excelのフラッシュフィルの説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "入力パターンを認識して残りのデータを自動的に埋める機能" },
      { label: "B", text: "セルの書式を一括で変更する機能" },
      { label: "C", text: "データを検索して置換する機能" },
      { label: "D", text: "マクロを自動記録する機能" },
    ],
    correctLabel: "A",
    explanation:
      "フラッシュフィル（Excel 2013以降）は、隣接する列のデータからパターンを認識し、残りを自動入力します。例えば「山田 太郎」から「山田」を手動入力すると、残りの姓を自動抽出します。Ctrl+Eで実行するか、「データ」タブの「フラッシュフィル」をクリックします。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-15",
    question: "Excelの「セルの結合」について正しいものはどれですか？",
    choices: [
      { label: "A", text: "結合すると複数セルのデータがすべて保持される" },
      { label: "B", text: "左上のセルの値のみ保持され、他のセルのデータは削除される" },
      { label: "C", text: "結合したセルには数式を入力できない" },
      { label: "D", text: "結合は元に戻せない" },
    ],
    correctLabel: "B",
    explanation:
      "セルを結合すると、左上のセルの値のみ残り、他のセルのデータは失われます。結合セルは「ホーム」タブの「セルを結合して中央揃え」で作成します。結合の解除も同じボタンで可能です。テーブル内のセルは結合できません。並べ替えやフィルターに支障が出るため、多用は避けるべきです。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-16",
    question: "Excelで数値の表示形式を「#,##0」に設定するとどう表示されますか？（値：1234567）",
    choices: [
      { label: "A", text: "1234567" },
      { label: "B", text: "1,234,567" },
      { label: "C", text: "1234567.00" },
      { label: "D", text: "¥1,234,567" },
    ],
    correctLabel: "B",
    explanation:
      "「#,##0」は3桁区切りのカンマ付き整数表示です。#は数値がある場合のみ表示、0は数値がなくても0を表示するプレースホルダーです。小数を含む場合は「#,##0.00」、通貨は「¥#,##0」、パーセントは「0.0%」のように設定します。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-17",
    question: "Excelで名前付き範囲を作成する最も簡単な方法はどれですか？",
    choices: [
      { label: "A", text: "範囲を選択→名前ボックス（数式バーの左）に名前を入力してEnter" },
      { label: "B", text: "範囲を選択→「データ」→「名前の管理」" },
      { label: "C", text: "範囲を選択→右クリック→「名前の定義」" },
      { label: "D", text: "VBAでしか作成できない" },
    ],
    correctLabel: "A",
    explanation:
      "範囲を選択して名前ボックス（数式バーの左にあるセルアドレス表示欄）に名前を入力し、Enterキーを押すのが最も簡単な方法です。「数式」→「名前の管理」（Ctrl+F3）からも作成・編集・削除ができます。名前はスペースを含められず、先頭は文字またはアンダースコアでなければなりません。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-18",
    question: "Excelの「条件付き書式」でセルの値に応じてアイコンを表示する機能はどれですか？",
    choices: [
      { label: "A", text: "データバー" },
      { label: "B", text: "カラースケール" },
      { label: "C", text: "アイコンセット" },
      { label: "D", text: "セルの強調表示ルール" },
    ],
    correctLabel: "C",
    explanation:
      "アイコンセットは値の大小に応じて矢印、信号、星などのアイコンをセルに表示します。データバーはセル内に棒グラフを表示、カラースケールは色の濃淡で値を表現します。セルの強調表示ルールは特定条件のセルの書式を変更します。すべて条件付き書式の機能です。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-19",
    question: "Excelのスパークラインについて正しいものはどれですか？",
    choices: [
      { label: "A", text: "セル内に表示される小さなグラフで、折れ線・縦棒・勝敗の3種類がある" },
      { label: "B", text: "通常のグラフと同じもので、名前が違うだけ" },
      { label: "C", text: "印刷されない" },
      { label: "D", text: "1シートに1つしか挿入できない" },
    ],
    correctLabel: "A",
    explanation:
      "スパークラインは「挿入」タブから作成できるセル内ミニグラフです。折れ線（トレンド）、縦棒（比較）、勝敗（+/-の表示）の3種類があります。通常のグラフとは異なり1つのセルに収まり、印刷も可能です。データの傾向を省スペースで表現できます。",
    category: "mos",
    difficulty: "intermediate",
  },
  // ============================================================
  //  MOS Excel 365 対策 — Domain 3: テーブルとテーブルデータの管理
  // ============================================================
  {
    id: "mos-20",
    question: "Excelでデータ範囲をテーブルに変換するショートカットはどれですか？",
    choices: [
      { label: "A", text: "Ctrl+T" },
      { label: "B", text: "Ctrl+L" },
      { label: "C", text: "Ctrl+T または Ctrl+L（どちらも同じ）" },
      { label: "D", text: "Alt+T" },
    ],
    correctLabel: "C",
    explanation:
      "Ctrl+T と Ctrl+L はどちらもデータ範囲をテーブルに変換するショートカットです。テーブルに変換すると、フィルターボタンの自動追加、構造化参照、自動拡張、交互の行色などの機能が使えるようになります。「挿入」→「テーブル」からも作成できます。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-21",
    question: "Excelのテーブル機能の利点として正しくないものはどれですか？",
    choices: [
      { label: "A", text: "データ追加時にテーブル範囲が自動拡張される" },
      { label: "B", text: "構造化参照（[@列名]）が使える" },
      { label: "C", text: "集計行を簡単に追加できる" },
      { label: "D", text: "テーブル内のセルを結合できる" },
    ],
    correctLabel: "D",
    explanation:
      "テーブル内のセルは結合できません。テーブルの利点は自動拡張、構造化参照（例：=SUM(テーブル1[売上])）、集計行の追加、自動書式（縞模様）、フィルターの自動設定などです。テーブルはデータの一貫性を保つ設計のため、結合は許可されません。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-22",
    question: "Excelのテーブルに集計行を追加するにはどうしますか？",
    choices: [
      { label: "A", text: "テーブル内をクリック→「テーブルデザイン」タブ→「集計行」にチェック" },
      { label: "B", text: "テーブルの下にSUM関数を手動で入力する" },
      { label: "C", text: "「データ」タブ→「集計」" },
      { label: "D", text: "テーブルには集計行を追加できない" },
    ],
    correctLabel: "A",
    explanation:
      "テーブル内をクリックすると表示される「テーブルデザイン」タブで「集計行」のチェックボックスをオンにします。集計行の各セルのドロップダウンから合計、平均、個数、最大、最小などの集計方法を選択できます。SUBTOTAL関数が自動的に使用されます。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-23",
    question: "Excelでテーブルのフィルターで「上位10項目」を抽出する方法はどれですか？",
    choices: [
      { label: "A", text: "フィルターボタン→「数値フィルター」→「トップテン」" },
      { label: "B", text: "フィルターボタン→「昇順で並べ替え」" },
      { label: "C", text: "「データ」タブ→「上位10」" },
      { label: "D", text: "LARGE関数を使用する" },
    ],
    correctLabel: "A",
    explanation:
      "数値列のフィルターボタンをクリックし、「数値フィルター」→「トップテン」を選択すると、上位/下位のN件やN%を抽出できます。件数やパーセンテージは自由に変更できます。テキスト列では「テキストフィルター」、日付列では「日付フィルター」が表示されます。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-24",
    question: "Excelでテーブルを通常の範囲に戻す方法はどれですか？",
    choices: [
      { label: "A", text: "テーブルを選択→Deleteキー" },
      { label: "B", text: "「テーブルデザイン」タブ→「範囲に変換」" },
      { label: "C", text: "テーブルは通常の範囲に戻せない" },
      { label: "D", text: "Ctrl+Z で元に戻す" },
    ],
    correctLabel: "B",
    explanation:
      "テーブル内をクリック→「テーブルデザイン」タブ→「範囲に変換」でテーブルを通常のセル範囲に戻せます。書式は保持されますが、テーブル固有の機能（自動拡張、構造化参照、集計行等）は失われます。データ自体は変わりません。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-25",
    question: "Excelの並べ替えで、複数の基準（第1キー、第2キー）で並べ替える方法はどれですか？",
    choices: [
      { label: "A", text: "「データ」→「並べ替え」で「レベルの追加」をクリック" },
      { label: "B", text: "1つの列でしか並べ替えられない" },
      { label: "C", text: "フィルターボタンを2回クリックする" },
      { label: "D", text: "「ホーム」→「並べ替え」→「複数キー」" },
    ],
    correctLabel: "A",
    explanation:
      "「データ」タブ→「並べ替え」で並べ替えダイアログを開き、「レベルの追加」で複数の並べ替え基準を設定できます。例えば「部門（昇順）」→「売上（降順）」のように、優先順位を付けた並べ替えが可能です。最大64レベルまで追加できます。",
    category: "mos",
    difficulty: "intermediate",
  },
  // ============================================================
  //  MOS Excel 365 対策 — Domain 4: 数式と関数
  // ============================================================
  {
    id: "mos-26",
    question: "Excelで数式のセル参照をF4キーで切り替える順序として正しいものはどれですか？",
    choices: [
      { label: "A", text: "A1 → $A$1 → A$1 → $A1 → A1" },
      { label: "B", text: "A1 → $A1 → A$1 → $A$1 → A1" },
      { label: "C", text: "$A$1 → $A1 → A$1 → A1 → $A$1" },
      { label: "D", text: "A1 → A$1 → $A1 → $A$1 → A1" },
    ],
    correctLabel: "A",
    explanation:
      "数式の入力中にF4キーを押すたびに、A1（相対）→ $A$1（絶対）→ A$1（行のみ絶対）→ $A1（列のみ絶対）→ A1（相対）の順で切り替わります。セル参照を素早く変更できる重要なショートカットで、MOS試験でも頻出です。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-27",
    question: "=SUMIF(A:A, \"*東京*\", B:B) のワイルドカード「*」の意味は何ですか？",
    choices: [
      { label: "A", text: "任意の1文字" },
      { label: "B", text: "0文字以上の任意の文字列" },
      { label: "C", text: "数値のみ" },
      { label: "D", text: "空白文字" },
    ],
    correctLabel: "B",
    explanation:
      "SUMIF/COUNTIF等の条件で使えるワイルドカードは * (0文字以上の任意の文字列) と ? (任意の1文字) です。\"*東京*\" は「東京」を含む文字列全てにマッチします。\"東京*\" は「東京」で始まる文字列、\"???\" は3文字の文字列にマッチします。~を前置するとワイルドカードをエスケープできます。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-28",
    question: "=IF(AND(A1>=60, B1>=60), \"合格\", \"不合格\") の意味として正しいものはどれですか？",
    choices: [
      { label: "A", text: "A1またはB1が60以上なら合格" },
      { label: "B", text: "A1かつB1が60以上なら合格" },
      { label: "C", text: "A1とB1の合計が60以上なら合格" },
      { label: "D", text: "A1が60以上かつB1が60未満なら合格" },
    ],
    correctLabel: "B",
    explanation:
      "AND関数はすべての条件がTRUEの場合にTRUEを返します。A1>=60 と B1>=60 の両方を満たす場合のみ「合格」を返します。どちらか一方でも満たせば合格にするにはOR関数を使います。AND/ORはIF関数の中で複合条件を作るのに頻出です。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-29",
    question: "=COUNTA(A1:A10) と =COUNT(A1:A10) の違いは何ですか？",
    choices: [
      { label: "A", text: "全く同じ結果を返す" },
      { label: "B", text: "COUNTAは空でないセルすべてを数え、COUNTは数値セルのみ数える" },
      { label: "C", text: "COUNTAは数値のみ、COUNTは文字列のみ数える" },
      { label: "D", text: "COUNTAはエラーを無視し、COUNTはエラーも数える" },
    ],
    correctLabel: "B",
    explanation:
      "COUNT は数値が入力されたセルのみをカウントします（文字列や空白は含みません）。COUNTA は空でないセルすべてをカウントします（数値、文字列、論理値、エラー値を含む）。空白セルの数は COUNTBLANK 関数で数えられます。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-30",
    question: "=HLOOKUP の説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "垂直方向（列）にデータを検索する" },
      { label: "B", text: "水平方向（行）にデータを検索し、指定した行の値を返す" },
      { label: "C", text: "VLOOKUPと全く同じ動作をする" },
      { label: "D", text: "ハイパーリンクを検索する関数" },
    ],
    correctLabel: "B",
    explanation:
      "HLOOKUPは Horizontal（水平）の Lookup です。先頭行で検索値を探し、指定した行番号の値を返します。VLOOKUPは先頭列で検索して指定列の値を返す垂直検索です。データが横方向に並んでいる場合に使用しますが、XLOOKUP の登場により使用頻度は減少しています。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-31",
    question: "Excelでセル内の文字列から空白を除去する関数はどれですか？",
    choices: [
      { label: "A", text: "=CLEAN(A1)" },
      { label: "B", text: "=TRIM(A1)" },
      { label: "C", text: "=STRIP(A1)" },
      { label: "D", text: "=REMOVE(A1)" },
    ],
    correctLabel: "B",
    explanation:
      "TRIM関数は文字列の先頭・末尾の空白と、単語間の余分な空白を除去します（単語間のスペース1つは残す）。CLEAN関数は印刷できない制御文字を除去する関数です。STRIP や REMOVE はExcelに存在しません。データクレンジングで頻出の関数です。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-32",
    question: "=CONCAT(A1, \" \", B1) と =A1 & \" \" & B1 の関係として正しいものはどれですか？",
    choices: [
      { label: "A", text: "全く異なる結果を返す" },
      { label: "B", text: "どちらも同じ文字列結合の結果を返す" },
      { label: "C", text: "CONCAT は数値のみ、& は文字列のみ結合する" },
      { label: "D", text: "& 演算子はExcelでは使えない" },
    ],
    correctLabel: "B",
    explanation:
      "CONCAT関数と&演算子はどちらも文字列を結合します。結果は同じです。CONCAT（Excel 2019以降）は CONCATENATE の後継で、セル範囲も引数にできます（例：=CONCAT(A1:A5)）。&演算子は古いバージョンでも使える汎用的な方法です。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-33",
    question: "=SWITCH(A1, 1, \"低\", 2, \"中\", 3, \"高\", \"不明\") の意味はどれですか？",
    choices: [
      { label: "A", text: "A1が1なら「低」、2なら「中」、3なら「高」、それ以外は「不明」" },
      { label: "B", text: "A1を1→低、2→中、3→高に変換してセルに書き込む" },
      { label: "C", text: "A1が「低」「中」「高」のいずれかかを判定する" },
      { label: "D", text: "構文エラー" },
    ],
    correctLabel: "A",
    explanation:
      "SWITCH関数（Excel 2019以降）は値に対応する結果を返します。=SWITCH(式, 値1, 結果1, 値2, 結果2, ..., デフォルト) の構文です。ネストしたIF関数の代替として可読性が高く、IFS関数とは異なり値の完全一致で判定します。最後の引数はどれにも一致しない場合のデフォルト値です。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-34",
    question: "Excelの数式で発生する #REF! エラーの原因はどれですか？",
    choices: [
      { label: "A", text: "ゼロで除算した" },
      { label: "B", text: "参照先のセルや範囲が削除された" },
      { label: "C", text: "関数名のスペルが間違っている" },
      { label: "D", text: "検索値が見つからない" },
    ],
    correctLabel: "B",
    explanation:
      "#REF! は無効な参照エラーです。数式が参照しているセル・行・列が削除されたときに発生します。#DIV/0! はゼロ除算、#NAME? は関数名の誤り、#N/A は検索値が見つからない場合です。エラーの種類を区別する知識はMOS試験で重要です。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-35",
    question: "=SUMPRODUCT((A2:A100=\"東京\")*(C2:C100)) はどんな計算をしますか？",
    choices: [
      { label: "A", text: "A列が「東京」のC列の値を合計する" },
      { label: "B", text: "A列とC列を掛け算する" },
      { label: "C", text: "東京の件数を数える" },
      { label: "D", text: "構文エラー" },
    ],
    correctLabel: "A",
    explanation:
      "SUMPRODUCTは配列同士の積の合計を返します。(A2:A100=\"東京\") は条件に一致すれば1、不一致なら0の配列になります。これとC2:C100を掛けると、東京以外は0になり、結果的に東京のC列の値だけが合計されます。SUMIFSの代替として複雑な条件にも対応できます。",
    category: "mos",
    difficulty: "advanced",
  },
  {
    id: "mos-36",
    question: "Excelで数式の検証に使う「参照元のトレース」機能は何を表示しますか？",
    choices: [
      { label: "A", text: "選択セルの数式が参照しているセルを矢印で表示する" },
      { label: "B", text: "選択セルを参照している他のセルを矢印で表示する" },
      { label: "C", text: "エラーのあるセルを赤く表示する" },
      { label: "D", text: "数式を文字列に変換する" },
    ],
    correctLabel: "A",
    explanation:
      "「参照元のトレース」（数式タブ）はアクティブセルの数式が参照しているセルを青い矢印で表示します。「参照先のトレース」はアクティブセルを参照している他のセルを表示します。「エラーチェック」はエラーの原因を特定するのに使います。数式のデバッグに重要な機能です。",
    category: "mos",
    difficulty: "intermediate",
  },
  // ============================================================
  //  MOS Excel 365 対策 — Domain 5: グラフの管理
  // ============================================================
  {
    id: "mos-37",
    question: "Excelでデータを選択してグラフを素早く挿入するショートカットはどれですか？",
    choices: [
      { label: "A", text: "Alt+F1" },
      { label: "B", text: "Ctrl+G" },
      { label: "C", text: "F11" },
      { label: "D", text: "AとCの両方（Alt+F1は埋め込み、F11はグラフシート）" },
    ],
    correctLabel: "D",
    explanation:
      "Alt+F1はアクティブシートに埋め込みグラフを挿入し、F11は新しいグラフシートにグラフを作成します。どちらもデフォルトのグラフの種類（通常は集合縦棒）が使われます。「挿入」タブの「おすすめグラフ」からデータに適したグラフを選択することもできます。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-38",
    question: "Excelのグラフで「第2軸」を追加する目的として正しいものはどれですか？",
    choices: [
      { label: "A", text: "値のスケールが大きく異なるデータ系列を同じグラフに表示するため" },
      { label: "B", text: "グラフのタイトルを2つ付けるため" },
      { label: "C", text: "グラフに3Dの奥行きを出すため" },
      { label: "D", text: "凡例を2列に並べるため" },
    ],
    correctLabel: "A",
    explanation:
      "第2軸（第2縦軸）は、値のスケールが大きく異なるデータ系列（例：売上金額と利益率）を1つのグラフに表示する際に使います。データ系列を右クリック→「データ系列の書式設定」→「第2軸」で設定します。複合グラフ（棒+折れ線）でよく使われるテクニックです。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-39",
    question: "Excelのグラフで「データラベル」を表示すると何が表示されますか？",
    choices: [
      { label: "A", text: "グラフの各データポイントに値やカテゴリ名が表示される" },
      { label: "B", text: "グラフのタイトルが表示される" },
      { label: "C", text: "X軸のラベルが表示される" },
      { label: "D", text: "凡例が表示される" },
    ],
    correctLabel: "A",
    explanation:
      "データラベルはグラフの各データポイント（棒の上、折れ線の点など）に数値やカテゴリ名を直接表示する機能です。グラフを選択→「+」ボタン→「データラベル」で追加します。表示する内容（値、カテゴリ名、系列名、パーセンテージ等）は書式設定でカスタマイズできます。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-40",
    question: "円グラフの使い方として最も適切なものはどれですか？",
    choices: [
      { label: "A", text: "全体に対する各項目の割合を表現するとき" },
      { label: "B", text: "時系列データの推移を表現するとき" },
      { label: "C", text: "2つの変数の相関関係を表現するとき" },
      { label: "D", text: "項目数が20以上ある場合の比較" },
    ],
    correctLabel: "A",
    explanation:
      "円グラフは全体（100%）に対する各要素の構成比を表すのに適しています。項目数は5～7個程度が見やすく、多すぎると読みにくくなります。時系列は折れ線グラフ、相関は散布図、多数項目の比較は棒グラフが適切です。MOS試験ではグラフの種類の使い分けが問われます。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-41",
    question: "Excelのグラフ要素の「トレンドライン」の用途はどれですか？",
    choices: [
      { label: "A", text: "データの傾向（増加・減少）を視覚化する近似線を追加する" },
      { label: "B", text: "グラフに目盛線を追加する" },
      { label: "C", text: "グラフの色をトレンドに合わせて変更する" },
      { label: "D", text: "データの最大値を強調する" },
    ],
    correctLabel: "A",
    explanation:
      "トレンドライン（近似曲線）はデータの傾向を視覚化する補助線です。線形、指数、対数、多項式、移動平均などの種類があります。データ系列を右クリック→「トレンドラインの追加」で設定します。R二乗値を表示して近似の精度を確認することもできます。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-42",
    question: "Excelのグラフのスタイルや色を素早く変更する方法はどれですか？",
    choices: [
      { label: "A", text: "グラフを選択→「グラフデザイン」タブ→「グラフスタイル」や「色の変更」" },
      { label: "B", text: "グラフを右クリック→「グラフの削除」" },
      { label: "C", text: "「ホーム」タブの書式設定を使用する" },
      { label: "D", text: "グラフのスタイルは変更できない" },
    ],
    correctLabel: "A",
    explanation:
      "グラフを選択すると「グラフデザイン」タブが表示されます。「グラフスタイル」ギャラリーから見た目を一括変更でき、「色の変更」で配色セットを切り替えられます。また、グラフ右上の筆アイコンからもスタイルと色を変更できます。「グラフの種類の変更」でグラフタイプも変更可能です。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-43",
    question: "Excelで「おすすめグラフ」機能を使うと何が起こりますか？",
    choices: [
      { label: "A", text: "Excelがデータの特性を分析して適切なグラフの種類を提案する" },
      { label: "B", text: "インターネットからグラフのテンプレートをダウンロードする" },
      { label: "C", text: "他のユーザーが作成したグラフを表示する" },
      { label: "D", text: "グラフを自動的に挿入して確定する" },
    ],
    correctLabel: "A",
    explanation:
      "「おすすめグラフ」（「挿入」タブ）はデータの構造を分析して最適なグラフの種類を提案します。複数の候補がプレビュー表示され、クリックするだけで挿入できます。「すべてのグラフ」タブに切り替えると、全種類から手動選択も可能です。",
    category: "mos",
    difficulty: "beginner",
  },
  // ============================================================
  //  MOS Excel 365 対策 — 横断的な実務問題
  // ============================================================
  {
    id: "mos-44",
    question: "Excelでデータの入力規則を設定する場所はどこですか？",
    choices: [
      { label: "A", text: "「データ」タブ→「データの入力規則」" },
      { label: "B", text: "「ホーム」タブ→「入力規則」" },
      { label: "C", text: "「挿入」タブ→「入力規則」" },
      { label: "D", text: "「校閲」タブ→「入力規則」" },
    ],
    correctLabel: "A",
    explanation:
      "データの入力規則は「データ」タブの「データの入力規則」から設定します。整数、小数、リスト、日付、時刻、文字列の長さ、ユーザー設定（数式）の条件を設定できます。リストを使ったドロップダウンリストの作成もここから行います。入力メッセージやエラーメッセージのカスタマイズも可能です。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-45",
    question: "Excelでドロップダウンリストを作成する方法はどれですか？",
    choices: [
      { label: "A", text: "「データ」→「データの入力規則」→入力値の種類で「リスト」→元の値にリスト項目を入力" },
      { label: "B", text: "「挿入」→「ドロップダウン」" },
      { label: "C", text: "「ホーム」→「ドロップダウン」" },
      { label: "D", text: "VBAでしか作成できない" },
    ],
    correctLabel: "A",
    explanation:
      "「データ」→「データの入力規則」→入力値の種類を「リスト」に設定し、元の値にカンマ区切りで項目を入力するか、セル範囲を指定します。例：元の値に「東京,大阪,名古屋」またはセル範囲「=$F$1:$F$3」を設定します。名前付き範囲も使用可能です。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-46",
    question: "Excelのショートカット Ctrl+; は何をしますか？",
    choices: [
      { label: "A", text: "現在の日付を入力する" },
      { label: "B", text: "現在の時刻を入力する" },
      { label: "C", text: "セルを削除する" },
      { label: "D", text: "コメントを挿入する" },
    ],
    correctLabel: "A",
    explanation:
      "Ctrl+; は現在の日付を静的な値として入力します。Ctrl+: は現在の時刻を入力します。TODAY()やNOW()と異なり、再計算されない固定値です。MOS試験ではショートカットキーの知識が問われることがあります。主要なショートカット：Ctrl+C（コピー）、Ctrl+V（貼り付け）、Ctrl+Z（元に戻す）、Ctrl+S（保存）。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-47",
    question: "Excelの「検索と置換」（Ctrl+H）で正しいものはどれですか？",
    choices: [
      { label: "A", text: "値のみ検索でき、書式では検索できない" },
      { label: "B", text: "「オプション」を展開すると書式による検索・置換も可能" },
      { label: "C", text: "シート内のみ検索でき、ブック全体は検索できない" },
      { label: "D", text: "数式の中の文字列は検索できない" },
    ],
    correctLabel: "B",
    explanation:
      "「検索と置換」ダイアログの「オプション」を展開すると、書式による検索・置換、検索範囲（シート/ブック）、検索対象（値/数式/メモ）、大文字小文字の区別、セル内容の完全一致などの詳細設定が可能です。ワイルドカード（* や ?）も使用できます。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-48",
    question: "Excelで重複するデータを削除する方法はどれですか？",
    choices: [
      { label: "A", text: "「データ」タブ→「重複の削除」" },
      { label: "B", text: "「ホーム」タブ→「クリア」→「重複の削除」" },
      { label: "C", text: "UNIQUE関数を使って元データを上書きする" },
      { label: "D", text: "手動で1行ずつ削除するしかない" },
    ],
    correctLabel: "A",
    explanation:
      "「データ」タブ→「重複の削除」で、重複行を自動的に検出・削除できます。どの列を基準に重複を判断するかを選択でき、削除された件数と残った件数が表示されます。テーブル内では「テーブルデザイン」タブからもアクセスできます。元データが変更されるため事前のバックアップを推奨します。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-49",
    question: "Excelの「区切り位置」機能は何に使いますか？",
    choices: [
      { label: "A", text: "1つのセルに入った文字列をカンマやスペースで複数列に分割する" },
      { label: "B", text: "グラフの軸に区切り線を追加する" },
      { label: "C", text: "セル内改行を追加する" },
      { label: "D", text: "テーブルを分割する" },
    ],
    correctLabel: "A",
    explanation:
      "「データ」タブ→「区切り位置」は、1つのセルに入った文字列をカンマ、タブ、スペースなどの区切り文字、または固定幅で複数列に分割する機能です。CSVデータの整理やフルネームを姓と名に分ける際に便利です。Excel 2013以降ではフラッシュフィルも代替手段として使えます。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-50",
    question: "Excelで「#N/A」エラーが表示される最も一般的な原因はどれですか？",
    choices: [
      { label: "A", text: "数値をゼロで割った" },
      { label: "B", text: "VLOOKUP やMATCH で検索値が見つからなかった" },
      { label: "C", text: "参照先のセルが削除された" },
      { label: "D", text: "関数名のスペルが間違っている" },
    ],
    correctLabel: "B",
    explanation:
      "#N/A（Not Available）は検索関数（VLOOKUP, HLOOKUP, MATCH, XLOOKUP）で検索値が見つからない場合に発生します。対処法としてIFNA関数やIFERROR関数で代替値を返す方法があります。#DIV/0!はゼロ除算、#REF!は参照削除、#NAME?は名前の誤りです。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-51",
    question: "Excelでセルにコメント（メモ）を追加するショートカットはどれですか？",
    choices: [
      { label: "A", text: "Shift+F2" },
      { label: "B", text: "Ctrl+F2" },
      { label: "C", text: "Alt+F2" },
      { label: "D", text: "F2" },
    ],
    correctLabel: "A",
    explanation:
      "Shift+F2でセルにメモ（旧コメント）を追加できます。F2はセルの編集モードへの切り替えです。Excel 365ではメモ（黄色い付箋）とコメント（スレッド形式で返信可能）が区別されています。右クリック→「メモの挿入」または「新しいコメント」からも追加可能です。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-52",
    question: "Excelの「クイック分析」ツール（Ctrl+Q）でできることはどれですか？",
    choices: [
      { label: "A", text: "書式設定、グラフ、合計、テーブル、スパークラインを素早く適用できる" },
      { label: "B", text: "マクロを実行する" },
      { label: "C", text: "データを印刷する" },
      { label: "D", text: "ファイルを圧縮する" },
    ],
    correctLabel: "A",
    explanation:
      "データ範囲を選択すると右下に表示される「クイック分析」ボタン（またはCtrl+Q）から、書式設定（条件付き書式）、グラフ、合計（SUM等の自動挿入）、テーブル変換、スパークラインの挿入を素早く行えます。データ分析の最初の一歩として非常に便利な機能です。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-53",
    question: "Excelで「ゴールシーク」機能の用途はどれですか？",
    choices: [
      { label: "A", text: "目標値を達成するために必要な入力値を逆算する" },
      { label: "B", text: "データを自動的にフィルタリングする" },
      { label: "C", text: "グラフのデータ範囲を変更する" },
      { label: "D", text: "数式のエラーを自動修正する" },
    ],
    correctLabel: "A",
    explanation:
      "ゴールシーク（「データ」→「What-If分析」→「ゴールシーク」）は、目標とする結果から逆算して入力値を求める機能です。例えば「利益を100万円にするには売上がいくら必要か」のような分析に使います。数式セル、目標値、変化させるセルの3つを指定します。",
    category: "mos",
    difficulty: "advanced",
  },
  {
    id: "mos-54",
    question: "Excelのグラフで、データソースを変更する方法はどれですか？",
    choices: [
      { label: "A", text: "グラフを削除して作り直す" },
      { label: "B", text: "グラフを選択→「グラフデザイン」→「データの選択」" },
      { label: "C", text: "元データのセルを直接編集するしかない" },
      { label: "D", text: "グラフのデータソースは変更できない" },
    ],
    correctLabel: "B",
    explanation:
      "グラフを選択→「グラフデザイン」タブ→「データの選択」でデータソースの範囲、系列の追加・削除・編集、軸ラベルの変更ができます。グラフを選択したときにシート上に表示される色付き枠をドラッグしてデータ範囲を変更することもできます。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-55",
    question: "Excelで「ブックの検査」機能で確認できるものはどれですか？",
    choices: [
      { label: "A", text: "非表示の行列、個人情報、コメント、非表示シートなどの潜在的な問題" },
      { label: "B", text: "数式のエラーのみ" },
      { label: "C", text: "ファイルサイズの最適化" },
      { label: "D", text: "ウイルスの検出" },
    ],
    correctLabel: "A",
    explanation:
      "「ファイル」→「情報」→「問題のチェック」→「ドキュメント検査」で、個人情報（作成者名等）、コメント、非表示の行列・シート、カスタムXMLデータなどを検出・削除できます。ファイルを外部に共有する前に実行することが推奨されます。アクセシビリティチェックも同メニューから実行できます。",
    category: "mos",
    difficulty: "advanced",
  },
  {
    id: "mos-56",
    question: "Excelの「アクセシビリティチェック」の目的はどれですか？",
    choices: [
      { label: "A", text: "障害のあるユーザーがコンテンツを利用しやすいか確認する" },
      { label: "B", text: "ファイルのアクセス権限を確認する" },
      { label: "C", text: "ネットワーク接続を確認する" },
      { label: "D", text: "パスワードの強度を確認する" },
    ],
    correctLabel: "A",
    explanation:
      "アクセシビリティチェック（「校閲」→「アクセシビリティチェック」）は、スクリーンリーダー等の支援技術を使うユーザーにとって問題がないか確認します。画像の代替テキスト、テーブルのヘッダー、シート名の付け方、セルの結合などをチェックし、改善提案を表示します。",
    category: "mos",
    difficulty: "advanced",
  },
  // ============================================================
  //  MOS 追加問題 — Domain 1 補完
  // ============================================================
  {
    id: "mos-57",
    question: "ExcelでCSVファイルをインポートする方法として正しいものはどれですか？",
    choices: [
      { label: "A", text: "「データ」タブ→「テキストまたはCSVから」を選択" },
      { label: "B", text: "「ホーム」タブ→「貼り付け」→「CSVインポート」を選択" },
      { label: "C", text: "「挿入」タブ→「CSVファイル」を選択" },
      { label: "D", text: "「ファイル」タブ→「最近使ったファイル」から選択するしかない" },
    ],
    correctLabel: "A",
    explanation:
      "CSVやテキストファイルのインポートは「データ」タブ→「データの取得」→「テキストまたはCSVから」で行います。Power Queryエディターが開き、区切り文字の指定やデータ型の変更が可能です。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-58",
    question: "Excelの「ブックの保護」と「シートの保護」の違いとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "ブックの保護はシートの追加・削除・移動・名前変更を防ぎ、シートの保護はセルの編集を防ぐ" },
      { label: "B", text: "どちらも全く同じ機能で名前が違うだけ" },
      { label: "C", text: "ブックの保護はファイルの読み取りを制限し、シートの保護はファイルの書き込みを制限する" },
      { label: "D", text: "ブックの保護はセルの編集を防ぎ、シートの保護はシートの構成変更を防ぐ" },
    ],
    correctLabel: "A",
    explanation:
      "「ブックの保護」（校閲タブ）はシート構成（シートの追加・削除・移動・名前変更・表示/非表示）を保護します。「シートの保護」は個々のシート内のセル編集を制限します。両方を組み合わせて使用することもできます。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-59",
    question: "Excelで改ページを手動で挿入する方法はどれですか？",
    choices: [
      { label: "A", text: "改ページを入れたい行を選択→「ページレイアウト」タブ→「改ページ」→「改ページの挿入」" },
      { label: "B", text: "「ホーム」タブ→「セルの書式設定」→「改ページ」" },
      { label: "C", text: "「挿入」タブ→「改ページ」を選択" },
      { label: "D", text: "Ctrl+Enter で改ページを挿入" },
    ],
    correctLabel: "A",
    explanation:
      "改ページの挿入は、挿入したい位置の行（または列）を選択して「ページレイアウト」タブ→「改ページ」→「改ページの挿入」で行います。改ページプレビューで青い線をドラッグして位置を調整することもできます。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-60",
    question: "Excelで印刷時に全ページの先頭に見出し行を繰り返し表示するにはどうしますか？",
    choices: [
      { label: "A", text: "「ページレイアウト」タブ→「印刷タイトル」→「タイトル行」に範囲を指定" },
      { label: "B", text: "「ホーム」タブ→「繰り返し行」を設定" },
      { label: "C", text: "見出し行をコピーして各ページの先頭に貼り付ける" },
      { label: "D", text: "ウィンドウ枠の固定を設定すれば自動的に印刷でも繰り返される" },
    ],
    correctLabel: "A",
    explanation:
      "「ページレイアウト」タブ→「印刷タイトル」で「ページ設定」ダイアログが開き、「タイトル行」に繰り返したい行（例: $1:$1）、「タイトル列」に繰り返したい列を指定します。ウィンドウ枠の固定は画面表示のみで印刷には影響しません。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-61",
    question: "Excelのテンプレートファイルの拡張子はどれですか？",
    choices: [
      { label: "A", text: ".xltx" },
      { label: "B", text: ".xlsx" },
      { label: "C", text: ".xlsm" },
      { label: "D", text: ".xltm" },
    ],
    correctLabel: "A",
    explanation:
      "Excelテンプレートの拡張子は .xltx（マクロなし）、.xltm（マクロ有効）です。.xlsx は通常のブック、.xlsm はマクロ有効ブックです。テンプレートは「ファイル」→「名前を付けて保存」→ファイルの種類で「Excelテンプレート」を選択して保存します。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-62",
    question: "Excelで名前ボックスを使ってセルE100に移動する方法はどれですか？",
    choices: [
      { label: "A", text: "名前ボックスに「E100」と入力してEnterを押す" },
      { label: "B", text: "名前ボックスに「E100」と入力してTabを押す" },
      { label: "C", text: "名前ボックスをダブルクリックする" },
      { label: "D", text: "名前ボックスに「GO E100」と入力する" },
    ],
    correctLabel: "A",
    explanation:
      "名前ボックス（数式バーの左にあるセル参照表示部分）にセル参照（例: E100）や名前付き範囲名を入力してEnterキーを押すと、そのセルに即座にジャンプします。複数セルの範囲（例: A1:D10）を入力するとその範囲を選択できます。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-63",
    question: "Excelで数式の表示と値の表示を切り替えるショートカットはどれですか？",
    choices: [
      { label: "A", text: "Ctrl+`（バッククォート）" },
      { label: "B", text: "Ctrl+Shift+@" },
      { label: "C", text: "Alt+F11" },
      { label: "D", text: "F9" },
    ],
    correctLabel: "A",
    explanation:
      "Ctrl+`（バッククォート）を押すと、ワークシート上のすべてのセルが計算結果ではなく数式を表示するモードに切り替わります。もう一度押すと元の値表示に戻ります。「数式」タブ→「数式の表示」からも同じ操作ができます。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-64",
    question: "Excelの「ドキュメント検査」で検出・削除できるものはどれですか？",
    choices: [
      { label: "A", text: "個人情報、コメント、非表示の行列、ヘッダー/フッターの情報" },
      { label: "B", text: "ウイルスやマルウェア" },
      { label: "C", text: "文法の間違い" },
      { label: "D", text: "数式のエラー" },
    ],
    correctLabel: "A",
    explanation:
      "「ファイル」→「情報」→「問題のチェック」→「ドキュメント検査」で、コメント、ドキュメントのプロパティと個人情報、非表示の行と列、非表示のワークシート、カスタムXMLデータなどを検出し、必要に応じて削除できます。配布前のプライバシー保護に使用します。",
    category: "mos",
    difficulty: "intermediate",
  },
  // ============================================================
  //  MOS 追加問題 — Domain 2 補完
  // ============================================================
  {
    id: "mos-65",
    question: "Excelの条件付き書式で「セルの強調表示ルール」→「重複する値」を設定すると何が起こりますか？",
    choices: [
      { label: "A", text: "選択範囲内で重複している値のセルが強調表示される" },
      { label: "B", text: "重複する値が自動的に削除される" },
      { label: "C", text: "重複する値がある行全体が非表示になる" },
      { label: "D", text: "重複する値に連番が振られる" },
    ],
    correctLabel: "A",
    explanation:
      "「ホーム」タブ→「条件付き書式」→「セルの強調表示ルール」→「重複する値」で、選択範囲内の重複値（または一意の値）に色を付けて視覚的に強調できます。データの削除は行わず、表示のみ変更します。削除には「データ」タブ→「重複の削除」を使います。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-66",
    question: "Excelの条件付き書式で「データバー」を設定すると何が表示されますか？",
    choices: [
      { label: "A", text: "セル内に値の大きさに比例した棒グラフが表示される" },
      { label: "B", text: "セルの背景色がグラデーションで変化する" },
      { label: "C", text: "セルに矢印アイコンが表示される" },
      { label: "D", text: "セルの罫線の太さが値に応じて変わる" },
    ],
    correctLabel: "A",
    explanation:
      "データバーは、セル内に値の大きさに応じた横棒を表示します。値の比較を視覚的に行えます。カラースケールはグラデーションで分布を表示、アイコンセットは矢印や信号機などのアイコンで状態を表示する機能です。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-67",
    question: "Excelの「形式を選択して貼り付け」で「行列を入れ替える」を選択すると何が起こりますか？",
    choices: [
      { label: "A", text: "行と列が入れ替わって貼り付けられる（縦横の転置）" },
      { label: "B", text: "行の順序が逆転して貼り付けられる" },
      { label: "C", text: "列の幅と行の高さが入れ替わる" },
      { label: "D", text: "セルの結合が入れ替わる" },
    ],
    correctLabel: "A",
    explanation:
      "「形式を選択して貼り付け」（Ctrl+Alt+V）で「行列を入れ替える」にチェックを入れると、元データの行が列に、列が行に転置されて貼り付けられます。横長のデータを縦長に変換する場合などに便利です。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-68",
    question: "Excelでセル内のテキストが長い場合、セル内で自動的に改行して全体を表示する設定はどれですか？",
    choices: [
      { label: "A", text: "「ホーム」タブ→「折り返して全体を表示する」" },
      { label: "B", text: "「ホーム」タブ→「セルの結合」" },
      { label: "C", text: "「ホーム」タブ→「インデント」を設定" },
      { label: "D", text: "「表示」タブ→「テキストの折り返し」" },
    ],
    correctLabel: "A",
    explanation:
      "「ホーム」タブの「配置」グループにある「折り返して全体を表示する」をクリックすると、セルの幅に合わせてテキストが自動改行されます。「セルの書式設定」→「配置」タブの「折り返して全体を表示する」からも設定可能。「縮小して全体を表示する」はフォントサイズを自動縮小します。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-69",
    question: "Excelのユーザー定義の表示形式「0.0%」でセルの値が0.856の場合、どのように表示されますか？",
    choices: [
      { label: "A", text: "85.6%" },
      { label: "B", text: "0.856%" },
      { label: "C", text: "0.9%" },
      { label: "D", text: "856%" },
    ],
    correctLabel: "A",
    explanation:
      "パーセンテージ形式では、セルの値に100を掛けた値が表示されます。0.856 × 100 = 85.6 で、小数第1位まで表示する「0.0%」の形式により「85.6%」と表示されます。「0%」なら「86%」、「0.00%」なら「85.60%」と表示されます。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-70",
    question: "Excelで行や列を「グループ化」する操作の説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "行や列をまとめて折りたたみ/展開できるアウトラインを作成する" },
      { label: "B", text: "行や列を結合して1つのセルにする" },
      { label: "C", text: "行や列を非表示にして再表示できなくする" },
      { label: "D", text: "行や列を別シートに移動する" },
    ],
    correctLabel: "A",
    explanation:
      "「データ」タブ→「グループ化」で、選択した行や列にアウトラインを作成し、+/-ボタンで折りたたみ/展開ができるようになります。アウトラインレベルの番号（1, 2, 3）をクリックすると、そのレベルまで一括で表示切替できます。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-71",
    question: "Excelの「小計」機能を使う前に必要な操作はどれですか？",
    choices: [
      { label: "A", text: "グループ化の基準となる列でデータを並べ替えておく" },
      { label: "B", text: "テーブルに変換しておく" },
      { label: "C", text: "ピボットテーブルを作成しておく" },
      { label: "D", text: "特に事前の操作は不要" },
    ],
    correctLabel: "A",
    explanation:
      "「データ」タブ→「小計」を使う前に、グループ化したい列でデータを並べ替えておく必要があります。例えば「部署別の売上合計」を求める場合、まず部署列で昇順に並べ替えてから小計を実行します。テーブルでは小計は使用できないため、通常のセル範囲で行います。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-72",
    question: "Excelの書式のコピー/貼り付け（ハケアイコン）をダブルクリックすると何が起こりますか？",
    choices: [
      { label: "A", text: "連続して複数のセルに書式を貼り付けられるモードになる" },
      { label: "B", text: "書式と値の両方がコピーされる" },
      { label: "C", text: "書式の設定ダイアログが開く" },
      { label: "D", text: "元のセルの書式がクリアされる" },
    ],
    correctLabel: "A",
    explanation:
      "書式のコピー/貼り付けボタン（ハケアイコン）を1回クリックすると1回だけ書式を貼り付けて解除されますが、ダブルクリックすると連続貼り付けモードになり、複数のセルや範囲に続けて書式を適用できます。Escキーで連続モードを解除します。",
    category: "mos",
    difficulty: "beginner",
  },
  // ============================================================
  //  MOS 追加問題 — Domain 3 補完
  // ============================================================
  {
    id: "mos-73",
    question: "Excelのテーブルで構造化参照「=SUM(テーブル1[売上])」の意味はどれですか？",
    choices: [
      { label: "A", text: "テーブル1の「売上」列のすべての値を合計する" },
      { label: "B", text: "テーブル1のすべての列を合計する" },
      { label: "C", text: "「売上」という名前のテーブルを合計する" },
      { label: "D", text: "テーブル1の1行目の「売上」セルだけを参照する" },
    ],
    correctLabel: "A",
    explanation:
      "テーブルの構造化参照では、テーブル名[列名]で特定の列全体を参照できます。テーブルにデータが追加されると自動的に参照範囲が拡張されます。[@列名]は同じ行の値を参照する記法です。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-74",
    question: "Excelでテーブルのサイズを変更（範囲を拡張/縮小）するにはどうしますか？",
    choices: [
      { label: "A", text: "「テーブルデザイン」タブ→「テーブルのサイズ変更」で新しい範囲を指定する" },
      { label: "B", text: "テーブルの枠線をドラッグして拡大する" },
      { label: "C", text: "テーブルを削除して新しいテーブルを作り直す" },
      { label: "D", text: "「ホーム」タブ→「セルのサイズ」から変更する" },
    ],
    correctLabel: "A",
    explanation:
      "テーブル内のセルを選択して表示される「テーブルデザイン」タブ→「テーブルのサイズ変更」をクリックし、新しいデータ範囲を指定します。また、テーブル右下隅のハンドルをドラッグしても行列を追加/削除できます。テーブルの最終行の次にデータを入力すると自動的に拡張されます。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-75",
    question: "Excelのテーブルに「スライサー」を挿入する目的はどれですか？",
    choices: [
      { label: "A", text: "視覚的なボタンでデータをフィルターする" },
      { label: "B", text: "テーブルのデータを並べ替える" },
      { label: "C", text: "テーブルのデータを別シートにコピーする" },
      { label: "D", text: "テーブルにグラフを埋め込む" },
    ],
    correctLabel: "A",
    explanation:
      "スライサーはテーブルやピボットテーブルのフィルターを視覚的なボタン形式で提供する機能です。「テーブルデザイン」タブ→「スライサーの挿入」で追加できます。複数のスライサーを連動させてインタラクティブなダッシュボードを作成できます。Ctrlキーを押しながらクリックで複数項目を選択できます。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-76",
    question: "Excelでテーブル名を変更する方法はどれですか？",
    choices: [
      { label: "A", text: "テーブル内をクリックして「テーブルデザイン」タブの「テーブル名」ボックスで変更する" },
      { label: "B", text: "テーブルを右クリックして「名前の変更」を選択する" },
      { label: "C", text: "「数式」タブ→「名前の管理」からテーブル名を変更する" },
      { label: "D", text: "テーブル名は変更できない" },
    ],
    correctLabel: "A",
    explanation:
      "テーブル内のセルを選択すると「テーブルデザイン」タブが表示され、左端にある「テーブル名」ボックスで名前を変更できます。テーブル名は数式の構造化参照で使用されるため、分かりやすい名前を付けると管理が容易になります。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-77",
    question: "Excelのテーブルでフィルターのドロップダウンからワイルドカードを使うとき、「任意の1文字」を表す記号はどれですか？",
    choices: [
      { label: "A", text: "?（疑問符）" },
      { label: "B", text: "*（アスタリスク）" },
      { label: "C", text: "#（シャープ）" },
      { label: "D", text: "%（パーセント）" },
    ],
    correctLabel: "A",
    explanation:
      "Excelのフィルターや検索で使えるワイルドカードは、*（アスタリスク）= 任意の文字列（0文字以上）、?（疑問符）= 任意の1文字です。例えば「田?」で「田中」「田口」にマッチし、「*東京*」で「東京」を含む文字列にマッチします。",
    category: "mos",
    difficulty: "intermediate",
  },
  // ============================================================
  //  MOS 追加問題 — Domain 4 補完
  // ============================================================
  {
    id: "mos-78",
    question: "=VLOOKUP(A1, B:D, 3, FALSE) の第4引数「FALSE」の意味はどれですか？",
    choices: [
      { label: "A", text: "完全一致で検索する" },
      { label: "B", text: "近似一致で検索する" },
      { label: "C", text: "検索を逆順で行う" },
      { label: "D", text: "大文字と小文字を区別する" },
    ],
    correctLabel: "A",
    explanation:
      "VLOOKUPの第4引数はFALSE（完全一致）またはTRUE（近似一致）を指定します。FALSEは検索値と完全に一致する値のみを返し、見つからなければ#N/Aエラーになります。TRUE（または省略）は昇順に並べ替えられたデータで近似一致を行います。通常はFALSEの使用が推奨されます。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-79",
    question: "XLOOKUP関数のVLOOKUPに対する利点として正しくないものはどれですか？",
    choices: [
      { label: "A", text: "検索範囲より左側の列も戻り値にできる" },
      { label: "B", text: "見つからない場合の既定値を指定できる" },
      { label: "C", text: "完全一致がデフォルト" },
      { label: "D", text: "2次元の検索（行と列の交差点）ができる" },
    ],
    correctLabel: "D",
    explanation:
      "XLOOKUPはVLOOKUPの後継関数で、左方向検索が可能（A）、見つからない場合の値を指定可能（B）、完全一致がデフォルト（C）という利点があります。2次元検索にはINDEX+MATCHの組み合わせやXLOOKUPのネストが必要です。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-80",
    question: "=COUNTIF(A:A, \">=60\") は何を求めますか？",
    choices: [
      { label: "A", text: "A列で60以上の値を持つセルの個数" },
      { label: "B", text: "A列の合計が60以上かを判定" },
      { label: "C", text: "A列で60以上の値の合計" },
      { label: "D", text: "A列の60番目のセルの値" },
    ],
    correctLabel: "A",
    explanation:
      "COUNTIFは条件に合うセルの個数を数えます。=COUNTIF(範囲, 条件) の形式で、条件に比較演算子を使う場合は \">=60\" のように文字列で指定します。SUMIFは条件に合う値の合計、COUNTIFは条件に合うセルの個数を返します。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-81",
    question: "=COUNTIFS(A:A, \"東京\", B:B, \">=100\") の意味はどれですか？",
    choices: [
      { label: "A", text: "A列が「東京」かつB列が100以上のセルの個数" },
      { label: "B", text: "A列が「東京」またはB列が100以上のセルの個数" },
      { label: "C", text: "A列が「東京」のセルの個数とB列が100以上の個数の合計" },
      { label: "D", text: "A列が「東京」の行のB列の合計が100以上か判定" },
    ],
    correctLabel: "A",
    explanation:
      "COUNTIFSは複数の条件をすべて満たす（AND条件）セルの個数を数えます。各条件は「範囲, 条件」のペアで指定します。OR条件が必要な場合はCOUNTIF同士を足し算するか、SUMPRODUCT関数を使用します。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-82",
    question: "=AVERAGEIF(B:B, \"営業部\", C:C) は何を計算しますか？",
    choices: [
      { label: "A", text: "B列が「営業部」の行のC列の値の平均" },
      { label: "B", text: "B列とC列の「営業部」の平均" },
      { label: "C", text: "B列が「営業部」のセルの個数" },
      { label: "D", text: "C列の全データの平均" },
    ],
    correctLabel: "A",
    explanation:
      "AVERAGEIF(条件範囲, 条件, 平均対象範囲)は、条件に合うデータの平均値を求めます。AVERAGEIFSは複数条件に対応し、AVERAGEIFS(平均対象範囲, 条件範囲1, 条件1, 条件範囲2, 条件2, ...)の形式です。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-83",
    question: "IFS関数の使い方として正しいものはどれですか？",
    choices: [
      { label: "A", text: "=IFS(条件1, 値1, 条件2, 値2, TRUE, 既定値)" },
      { label: "B", text: "=IFS(値, 条件1, 結果1, 条件2, 結果2)" },
      { label: "C", text: "=IFS(条件1 AND 条件2, 値)" },
      { label: "D", text: "=IFS(範囲, 条件, 結果)" },
    ],
    correctLabel: "A",
    explanation:
      "IFS関数は=IFS(条件1, 値1, 条件2, 値2, ...)の形式で、最初にTRUEになった条件の値を返します。どの条件にも一致しない場合のデフォルト値は最後に「TRUE, 既定値」を追加して設定します。IF関数の多重ネストの代替として使用できます。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-84",
    question: "=LEFT(\"Microsoft Excel\", 5) の結果はどれですか？",
    choices: [
      { label: "A", text: "Micro" },
      { label: "B", text: "Excel" },
      { label: "C", text: "Micro " },
      { label: "D", text: "M" },
    ],
    correctLabel: "A",
    explanation:
      "LEFT(文字列, 文字数)は文字列の左側（先頭）から指定した文字数を取り出します。\"Microsoft Excel\"の左から5文字は\"Micro\"です。RIGHT(文字列, 文字数)は右側から、MID(文字列, 開始位置, 文字数)は任意の位置から取り出します。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-85",
    question: "=MID(\"ABCDEFG\", 3, 2) の結果はどれですか？",
    choices: [
      { label: "A", text: "CD" },
      { label: "B", text: "BC" },
      { label: "C", text: "CDE" },
      { label: "D", text: "DE" },
    ],
    correctLabel: "A",
    explanation:
      "MID(文字列, 開始位置, 文字数)は文字列の指定した開始位置から指定した文字数を取り出します。開始位置3（C）から2文字を取り出すので\"CD\"です。開始位置は1から始まります。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-86",
    question: "=TEXT(44927, \"yyyy/mm/dd\") は何を行いますか？",
    choices: [
      { label: "A", text: "シリアル値を指定した日付形式の文字列に変換する" },
      { label: "B", text: "日付を数値に変換する" },
      { label: "C", text: "テキストを日付に変換する" },
      { label: "D", text: "数値にカンマ区切りを追加する" },
    ],
    correctLabel: "A",
    explanation:
      "TEXT(値, 表示形式)は数値を指定した書式の文字列に変換します。日付のシリアル値に\"yyyy/mm/dd\"を適用すると「2023/01/01」のような文字列になります。数値の場合は\"#,##0\"でカンマ区切り、\"0.00\"で小数2桁表示などに変換できます。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-87",
    question: "=TODAY() と =NOW() の違いとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "TODAYは今日の日付のみ、NOWは現在の日付と時刻を返す" },
      { label: "B", text: "TODAYは昨日の日付、NOWは今日の日付を返す" },
      { label: "C", text: "TODAYは文字列、NOWは数値を返す" },
      { label: "D", text: "TODAYはブックを開いた日、NOWは保存した日を返す" },
    ],
    correctLabel: "A",
    explanation:
      "TODAY()は今日の日付（時刻なし）を返し、NOW()は現在の日付と時刻を返します。どちらもワークシートを再計算するたびに更新されます。固定の日付が必要な場合はDATE関数やCtrl+;（日付入力）を使用します。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-88",
    question: "=DATE(2024, 3, 15) は何を返しますか？",
    choices: [
      { label: "A", text: "2024年3月15日を表す日付のシリアル値" },
      { label: "B", text: "文字列「2024/3/15」" },
      { label: "C", text: "数値 20240315" },
      { label: "D", text: "エラーが発生する" },
    ],
    correctLabel: "A",
    explanation:
      "DATE(年, 月, 日)は指定した年月日の日付シリアル値を返します。表示形式により「2024/3/15」等で表示されますが、内部的には数値です。YEAR(), MONTH(), DAY()で日付から各要素を取り出すことができます。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-89",
    question: "=ROUND(3.456, 1) の結果はどれですか？",
    choices: [
      { label: "A", text: "3.5" },
      { label: "B", text: "3.4" },
      { label: "C", text: "4" },
      { label: "D", text: "3.46" },
    ],
    correctLabel: "A",
    explanation:
      "ROUND(数値, 桁数)は指定した桁数で四捨五入します。桁数1は小数第1位まで残す（第2位を四捨五入）ので、3.456→3.5になります。ROUNDUP(切り上げ)なら3.5、ROUNDDOWN(切り捨て)なら3.4になります。桁数0は整数に、-1は10の位に丸めます。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-90",
    question: "=IFERROR(A1/B1, \"計算不可\") の動作として正しいものはどれですか？",
    choices: [
      { label: "A", text: "A1/B1がエラーの場合は「計算不可」を表示し、正常なら計算結果を表示する" },
      { label: "B", text: "常に「計算不可」を表示する" },
      { label: "C", text: "A1/B1の結果が0の場合に「計算不可」を表示する" },
      { label: "D", text: "エラーがあるセルを赤く強調する" },
    ],
    correctLabel: "A",
    explanation:
      "IFERROR(値, エラーの場合の値)は、第1引数がエラー（#DIV/0!, #N/A, #VALUE!等）の場合に第2引数を返し、エラーでない場合は第1引数の結果をそのまま返します。B1が0の場合の#DIV/0!エラーを「計算不可」や空白(\"\")で置き換えるのが典型的な使い方です。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-91",
    question: "=LARGE(A1:A10, 2) は何を返しますか？",
    choices: [
      { label: "A", text: "A1:A10の中で2番目に大きい値" },
      { label: "B", text: "A1:A10の中で2番目に小さい値" },
      { label: "C", text: "A1:A10の上位2つの合計" },
      { label: "D", text: "A1:A10の2番目のセルの値" },
    ],
    correctLabel: "A",
    explanation:
      "LARGE(範囲, 順位)は指定した範囲のn番目に大きい値を返します。LARGE(A1:A10, 1)は最大値（MAX関数と同じ）、LARGE(A1:A10, 2)は2番目に大きい値です。SMALL関数はn番目に小さい値を返します。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-92",
    question: "=RANK.EQ(B2, B:B) は何を返しますか？",
    choices: [
      { label: "A", text: "B列の中でのB2の値の降順での順位" },
      { label: "B", text: "B列の中でのB2の値の昇順での順位" },
      { label: "C", text: "B2セルの行番号" },
      { label: "D", text: "B列のデータの個数" },
    ],
    correctLabel: "A",
    explanation:
      "RANK.EQ(数値, 範囲, 順序)は範囲内での順位を返します。第3引数を省略またはは0にすると降順（大きい順）、1にすると昇順（小さい順）の順位になります。同じ値がある場合は同順位になり、次の順位はスキップされます。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-93",
    question: "=LEN(\"Excel 365\") の結果はどれですか？",
    choices: [
      { label: "A", text: "9" },
      { label: "B", text: "8" },
      { label: "C", text: "10" },
      { label: "D", text: "6" },
    ],
    correctLabel: "A",
    explanation:
      "LEN(文字列)は文字列の文字数を返します。\"Excel 365\"はスペースを含めて9文字です。LEN関数はスペースも1文字としてカウントします。LENB関数はバイト数を返し、全角文字は2バイトとしてカウントされます。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-94",
    question: "=SUBSTITUTE(A1, \"株式会社\", \"(株)\") の動作はどれですか？",
    choices: [
      { label: "A", text: "A1の文字列中の「株式会社」をすべて「(株)」に置換する" },
      { label: "B", text: "A1が「株式会社」の場合だけ「(株)」に変更する" },
      { label: "C", text: "A1の先頭の「株式会社」だけを置換する" },
      { label: "D", text: "A1のセルの値を直接書き換える" },
    ],
    correctLabel: "A",
    explanation:
      "SUBSTITUTE(文字列, 検索文字列, 置換文字列)は文字列中の該当箇所をすべて置換した結果を返します。第4引数に置換対象の出現回数を指定すると、n回目の出現のみ置換できます。元のセルの値は変更されず、新しい文字列を返します。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-95",
    question: "Excelで「#VALUE!」エラーが発生する原因として最も一般的なものはどれですか？",
    choices: [
      { label: "A", text: "数値が必要な場所に文字列が入力されている" },
      { label: "B", text: "参照先のセルが削除された" },
      { label: "C", text: "0で除算しようとした" },
      { label: "D", text: "VLOOKUP で値が見つからなかった" },
    ],
    correctLabel: "A",
    explanation:
      "#VALUE!は数値が期待される場所に文字列が使われた場合などに発生します。#REF!は参照先の削除、#DIV/0!は0除算、#N/Aは値が見つからない場合です。主なエラーの意味を把握しておくことが試験対策として重要です。",
    category: "mos",
    difficulty: "intermediate",
  },
  // ============================================================
  //  MOS 追加問題 — Domain 5 補完
  // ============================================================
  {
    id: "mos-96",
    question: "Excelでグラフを別のシート（グラフシート）に移動する方法はどれですか？",
    choices: [
      { label: "A", text: "グラフを右クリック→「グラフの移動」→「新しいシート」を選択" },
      { label: "B", text: "グラフを切り取って別シートに貼り付ける" },
      { label: "C", text: "「ファイル」→「名前を付けて保存」でグラフのみ保存する" },
      { label: "D", text: "グラフはシート上にのみ配置でき、移動はできない" },
    ],
    correctLabel: "A",
    explanation:
      "グラフを右クリック→「グラフの移動」で、「新しいシート」（グラフ専用シート）または「オブジェクト」（既存シート上に埋め込み）を選択できます。グラフシートにするとシート全体がグラフになり、大きく表示してプレゼンテーションに使用できます。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-97",
    question: "Excelのグラフで軸の最小値・最大値・目盛間隔を変更するにはどうしますか？",
    choices: [
      { label: "A", text: "軸をダブルクリック→「軸の書式設定」で数値を指定する" },
      { label: "B", text: "「グラフデザイン」タブ→「軸の設定」から変更する" },
      { label: "C", text: "データの値を変更してグラフを更新する" },
      { label: "D", text: "グラフの種類を変更して再作成する" },
    ],
    correctLabel: "A",
    explanation:
      "軸をダブルクリック（または右クリック→「軸の書式設定」）すると書式設定ウィンドウが開き、最小値・最大値・目盛間隔・表示単位（百、千、万など）を設定できます。「自動」を解除して任意の値を入力します。対数目盛の設定もここで行えます。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-98",
    question: "Excelのグラフで右上の「+」ボタンをクリックすると何ができますか？",
    choices: [
      { label: "A", text: "グラフ要素（タイトル、凡例、データラベル、目盛線等）の追加/削除" },
      { label: "B", text: "グラフのスタイルと色の変更" },
      { label: "C", text: "グラフのフィルター（表示するデータの選択）" },
      { label: "D", text: "新しいデータ系列の追加" },
    ],
    correctLabel: "A",
    explanation:
      "グラフ選択時に右上に表示される3つのボタンは: 「+」= グラフ要素の追加/削除（タイトル・軸ラベル・データラベル・凡例・目盛線・データテーブル等）、筆アイコン = スタイルと色、フィルターアイコン = データのフィルターです。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-99",
    question: "Excelのグラフの凡例の位置を変更するにはどうしますか？",
    choices: [
      { label: "A", text: "凡例を右クリック→「凡例の書式設定」で位置（上/下/左/右）を選択" },
      { label: "B", text: "凡例はグラフの下にのみ表示でき、位置は変更できない" },
      { label: "C", text: "「ページレイアウト」タブから凡例の位置を変更する" },
      { label: "D", text: "凡例を削除して新しく追加する" },
    ],
    correctLabel: "A",
    explanation:
      "凡例を右クリック→「凡例の書式設定」、またはグラフの「+」ボタン→「凡例」の右矢印から、上・下・左・右・右上の位置を選択できます。凡例をドラッグして任意の位置に移動することも可能です。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-100",
    question: "Excelでグラフの種類を変更する方法はどれですか？",
    choices: [
      { label: "A", text: "グラフを右クリック→「グラフの種類の変更」を選択" },
      { label: "B", text: "グラフを削除して新しい種類のグラフを挿入する" },
      { label: "C", text: "「データ」タブ→「グラフの変換」を選択" },
      { label: "D", text: "グラフを選択して「ホーム」タブ→「書式の変更」" },
    ],
    correctLabel: "A",
    explanation:
      "グラフを右クリック→「グラフの種類の変更」、または「グラフデザイン」タブ→「グラフの種類の変更」で変更できます。同じダイアログ内で複合グラフ（例: 棒と折れ線の組み合わせ）の設定も可能です。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-101",
    question: "Excelの複合グラフの説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "1つのグラフ内に異なる種類のグラフ（例: 縦棒と折れ線）を組み合わせたもの" },
      { label: "B", text: "複数のグラフを横に並べて表示するもの" },
      { label: "C", text: "3D表示で複数の面を持つグラフ" },
      { label: "D", text: "複数のシートのデータを1つのグラフにまとめたもの" },
    ],
    correctLabel: "A",
    explanation:
      "複合グラフは1つのグラフ内に異なる種類のグラフを組み合わせたものです。「グラフの種類の変更」→「組み合わせ」から設定し、各データ系列ごとにグラフの種類と第2軸の使用を指定できます。単位の異なるデータを同時に比較する場合に便利です。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-102",
    question: "Excelのグラフに「代替テキスト（Altテキスト）」を設定する目的はどれですか？",
    choices: [
      { label: "A", text: "スクリーンリーダーがグラフの内容を読み上げるための説明を提供する" },
      { label: "B", text: "グラフにマウスを重ねたときにツールチップを表示する" },
      { label: "C", text: "グラフのタイトルを変更する" },
      { label: "D", text: "グラフのデータソースを説明する注釈を追加する" },
    ],
    correctLabel: "A",
    explanation:
      "代替テキスト（Altテキスト）はアクセシビリティのために設定します。視覚障害のあるユーザーがスクリーンリーダーでグラフの内容を理解できるよう、グラフの概要を説明するテキストです。グラフを右クリック→「代替テキストの編集」から設定します。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-103",
    question: "Excelのグラフで「行/列の切り替え」を行うと何が変わりますか？",
    choices: [
      { label: "A", text: "X軸（項目軸）とデータ系列（凡例）が入れ替わる" },
      { label: "B", text: "グラフの向きが横から縦に変わる" },
      { label: "C", text: "グラフのデータが昇順/降順に切り替わる" },
      { label: "D", text: "グラフのタイトルと凡例の位置が入れ替わる" },
    ],
    correctLabel: "A",
    explanation:
      "「グラフデザイン」タブ→「行/列の切り替え」をクリックすると、元データの行と列の解釈が入れ替わります。例えば月別データで系列が商品だったものが、商品別データで系列が月に切り替わります。",
    category: "mos",
    difficulty: "intermediate",
  },
  // ============================================================
  //  MOS 追加問題 — 横断的な実践問題 補完
  // ============================================================
  {
    id: "mos-104",
    question: "Excelでハイパーリンクを挿入する方法はどれですか？",
    choices: [
      { label: "A", text: "「挿入」タブ→「リンク」をクリック" },
      { label: "B", text: "「ホーム」タブ→「リンクの貼り付け」をクリック" },
      { label: "C", text: "「データ」タブ→「外部参照」をクリック" },
      { label: "D", text: "「表示」タブ→「ハイパーリンク」をクリック" },
    ],
    correctLabel: "A",
    explanation:
      "ハイパーリンクは「挿入」タブ→「リンク」、またはCtrl+K（ショートカット）で挿入します。Webページ、同じブック内の別シート/セル、メールアドレス、ファイルへのリンクを作成できます。セルを右クリック→「リンク」からも設定可能です。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-105",
    question: "Excelの条件付き書式で、ルールの優先順位を変更する方法はどれですか？",
    choices: [
      { label: "A", text: "「ホーム」タブ→「条件付き書式」→「ルールの管理」で上下に移動" },
      { label: "B", text: "条件付き書式は設定した順番で固定され変更できない" },
      { label: "C", text: "「書式」タブ→「優先順位」で変更する" },
      { label: "D", text: "すべてのルールを削除して正しい順序で再設定する" },
    ],
    correctLabel: "A",
    explanation:
      "「ホーム」タブ→「条件付き書式」→「ルールの管理」で「条件付き書式ルールの管理」ダイアログを開き、上矢印/下矢印ボタンでルールの優先順位を変更できます。上位のルールが優先されます。「条件を満たす場合は停止」にチェックすると、そのルールが適用された時点で以降のルールは評価されません。",
    category: "mos",
    difficulty: "advanced",
  },
  {
    id: "mos-106",
    question: "Excelでフィルターのオン/オフを切り替えるショートカットはどれですか？",
    choices: [
      { label: "A", text: "Ctrl+Shift+L" },
      { label: "B", text: "Ctrl+F" },
      { label: "C", text: "Ctrl+L" },
      { label: "D", text: "Ctrl+Shift+F" },
    ],
    correctLabel: "A",
    explanation:
      "Ctrl+Shift+L でオートフィルターのオン/オフを切り替えられます。または「データ」タブ→「フィルター」ボタンからも設定可能です。Ctrl+F は検索、Ctrl+L はテーブルの作成ダイアログ（Ctrl+Tと同じ）です。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-107",
    question: "Excelのカラースケール（条件付き書式）の説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "セルの値に応じて背景色がグラデーションで変化する" },
      { label: "B", text: "セル内に値の大きさに比例した棒グラフが表示される" },
      { label: "C", text: "セルに矢印や信号機のアイコンが表示される" },
      { label: "D", text: "セルのフォントカラーが自動的に変更される" },
    ],
    correctLabel: "A",
    explanation:
      "カラースケールは値の分布をグラデーション（例: 赤→黄→緑）で表現します。最小値・中間値・最大値にそれぞれ色を設定でき、データの分布や傾向を一目で把握できます。データバー（棒グラフ）やアイコンセット（矢印等）とは別の視覚化方法です。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-108",
    question: "Excelでセル内で強制的に改行する（Alt+Enter）とセルはどうなりますか？",
    choices: [
      { label: "A", text: "セル内で改行され、行の高さが自動的に広がる" },
      { label: "B", text: "次のセルに移動する" },
      { label: "C", text: "セルが結合される" },
      { label: "D", text: "改行はできずエラーになる" },
    ],
    correctLabel: "A",
    explanation:
      "Alt+Enter でセル内に改行を挿入できます。自動的に「折り返して全体を表示する」が有効になり、行の高さが調整されます。セル内の改行はCLEAN関数で削除したり、CHAR(10)として検索・置換で操作できます。",
    category: "mos",
    difficulty: "beginner",
  },
  {
    id: "mos-109",
    question: "Excelの「データの入力規則」で設定できないものはどれですか？",
    choices: [
      { label: "A", text: "セルの背景色を自動変更する" },
      { label: "B", text: "入力できる値の範囲（整数、小数、日付など）を制限する" },
      { label: "C", text: "ドロップダウンリストから選択させる" },
      { label: "D", text: "無効なデータ入力時のエラーメッセージを表示する" },
    ],
    correctLabel: "A",
    explanation:
      "データの入力規則（「データ」タブ→「データの入力規則」）では、入力値の制限（整数・小数・リスト・日付・時刻・文字列の長さ等）、入力時のメッセージ、エラー時のアラートを設定できます。セルの書式設定（背景色）は変更できません。背景色の自動変更には条件付き書式を使用します。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-110",
    question: "Excelでセルに「2024/4/1」と入力したら数値として認識されず文字列になりました。原因として考えられるのはどれですか？",
    choices: [
      { label: "A", text: "セルの表示形式が「文字列」に設定されている" },
      { label: "B", text: "日付は必ず「2024年4月1日」と入力する必要がある" },
      { label: "C", text: "シートが保護されている" },
      { label: "D", text: "ブックが読み取り専用になっている" },
    ],
    correctLabel: "A",
    explanation:
      "セルの表示形式が「文字列」に設定されていると、日付や数値を入力しても文字列として扱われます。表示形式を「標準」や「日付」に変更してから再入力するか、VALUE関数やDATEVALUE関数で変換する必要があります。セルが左揃えで表示される場合は文字列として認識されている可能性があります。",
    category: "mos",
    difficulty: "intermediate",
  },
  {
    id: "mos-111",
    question: "Excelで複数条件のOR条件で合計を求めたい場合、最も適切な方法はどれですか？",
    choices: [
      { label: "A", text: "SUMIF関数を条件ごとに使って結果を足し算する" },
      { label: "B", text: "SUMIFS関数に複数条件を指定する" },
      { label: "C", text: "SUM関数にIF関数をネストする" },
      { label: "D", text: "AVERAGEIF関数を使う" },
    ],
    correctLabel: "A",
    explanation:
      "SUMIFSは複数条件のAND（すべて満たす）で合計しますが、OR条件（いずれかを満たす）には対応していません。OR条件の場合は =SUMIF(条件1) + SUMIF(条件2) のように各条件のSUMIFを足すか、SUMPRODUCT関数で配列計算を行います。",
    category: "mos",
    difficulty: "advanced",
  },
  {
    id: "mos-112",
    question: "Excelで印刷時に「白黒印刷」を設定する場所はどこですか？",
    choices: [
      { label: "A", text: "「ページレイアウト」タブ→「ページ設定」ダイアログ→「シート」タブ" },
      { label: "B", text: "「ファイル」→「印刷」→「カラー/白黒」ボタン" },
      { label: "C", text: "「ホーム」タブ→「フォントの色」を黒に変更" },
      { label: "D", text: "「表示」タブ→「白黒表示」" },
    ],
    correctLabel: "A",
    explanation:
      "「ページレイアウト」タブ→「ページ設定」ダイアログの「シート」タブで「白黒印刷」にチェックを入れます。同じタブには「行のタイトル」「列のタイトル」（印刷タイトル）、「セル枠線の印刷」、「行列番号の印刷」なども設定できます。",
    category: "mos",
    difficulty: "advanced",
  },
  // ============================================================
  //  Oracle/SQL - beginner
  // ============================================================
  {
    id: "oracle-1",
    question: "SQLでテーブルの全データを取得するSELECT文はどれですか？",
    choices: [
      { label: "A", text: "SELECT ALL FROM employees;" },
      { label: "B", text: "SELECT * FROM employees;" },
      { label: "C", text: "GET ALL FROM employees;" },
      { label: "D", text: "FETCH * FROM employees;" },
    ],
    correctLabel: "B",
    explanation:
      "SELECT * FROM テーブル名 は、指定したテーブルの全列・全行を取得する基本構文です。*（アスタリスク）は「全列」を意味します。ALL は SELECT の重複除外指定のデフォルト値で、FROM の前に使うのは正しくありません。GET や FETCH は SELECT 文の代替にはなりません。",
    category: "oracle",
    difficulty: "beginner",
  },
  {
    id: "oracle-2",
    question: "SQLで重複行を除外するキーワードはどれですか？",
    choices: [
      { label: "A", text: "UNIQUE" },
      { label: "B", text: "DISTINCT" },
      { label: "C", text: "DIFFERENT" },
      { label: "D", text: "NODUP" },
    ],
    correctLabel: "B",
    explanation:
      "DISTINCT は SELECT の直後に指定し、結果セットから重複行を除外します。例：SELECT DISTINCT department_id FROM employees; Oracle ではCREATE TABLE 文でUNIQUE制約を使いますが、SELECT 文で重複除外に使うのは DISTINCT です。",
    category: "oracle",
    difficulty: "beginner",
  },
  {
    id: "oracle-3",
    question: "SQLの WHERE 句で NULL を検索する正しい方法はどれですか？",
    choices: [
      { label: "A", text: "WHERE column = NULL" },
      { label: "B", text: "WHERE column == NULL" },
      { label: "C", text: "WHERE column IS NULL" },
      { label: "D", text: "WHERE column EQUALS NULL" },
    ],
    correctLabel: "C",
    explanation:
      "NULLは「値が存在しない」状態を表し、= で比較できません（NULL = NULL は TRUE ではなく UNKNOWN）。IS NULL でNULLかどうかを判定します。NULLでない行を検索するには IS NOT NULL を使います。これは Oracle に限らず SQL の標準仕様です。",
    category: "oracle",
    difficulty: "beginner",
  },
  {
    id: "oracle-4",
    question: "SQLで結果を昇順に並べ替えるキーワードはどれですか？",
    choices: [
      { label: "A", text: "SORT BY column ASC" },
      { label: "B", text: "ORDER BY column ASC" },
      { label: "C", text: "ARRANGE BY column" },
      { label: "D", text: "GROUP BY column ASC" },
    ],
    correctLabel: "B",
    explanation:
      "ORDER BY は結果セットの並べ替えに使用します。ASC（昇順、デフォルト）または DESC（降順）を指定できます。SORT BY や ARRANGE BY はSQLのキーワードではありません。GROUP BY はグループ化に使用する別の句です。複数列での並べ替えもカンマ区切りで指定可能です。",
    category: "oracle",
    difficulty: "beginner",
  },
  {
    id: "oracle-5",
    question: "SQLの WHERE 句で複数の値に一致するか調べる方法はどれですか？",
    code: `-- department_id が 10, 20, 30 のいずれかの行を取得したい`,
    choices: [
      { label: "A", text: "WHERE department_id IN (10, 20, 30)" },
      { label: "B", text: "WHERE department_id = (10, 20, 30)" },
      { label: "C", text: "WHERE department_id BETWEEN 10 AND 30" },
      { label: "D", text: "WHERE department_id HAS (10, 20, 30)" },
    ],
    correctLabel: "A",
    explanation:
      "IN演算子はリスト内のいずれかの値に一致するか判定します。= で複数値は指定できません。BETWEEN 10 AND 30 は10〜30の範囲全体（10, 11, 12...30）を意味し、10, 20, 30 だけではありません。HAS はSQLのキーワードではありません。",
    category: "oracle",
    difficulty: "beginner",
  },
  {
    id: "oracle-6",
    question: "SQLのLIKE演算子で「任意の1文字」を表すワイルドカードはどれですか？",
    choices: [
      { label: "A", text: "%" },
      { label: "B", text: "_" },
      { label: "C", text: "*" },
      { label: "D", text: "?" },
    ],
    correctLabel: "B",
    explanation:
      "LIKE演算子のワイルドカードは、% が「0文字以上の任意の文字列」、_ が「任意の1文字」です。例：'田%' は「田中」「田辺」等に一致、'_田' は「山田」「吉田」等に一致。* や ? はSQLでは使用しません（*はファイル名やSELECTの全列指定で使用）。",
    category: "oracle",
    difficulty: "beginner",
  },
  {
    id: "oracle-7",
    question: "SQLの集計関数で、NULLを含む列の行数を正しく数えるのはどれですか？",
    choices: [
      { label: "A", text: "COUNT(column_name) — NULLも含めて数える" },
      { label: "B", text: "COUNT(*) — NULLの行も含めて全行数を返す" },
      { label: "C", text: "SUM(1) — NULLの行は除外される" },
      { label: "D", text: "COUNT(DISTINCT column_name) — 全行を数える" },
    ],
    correctLabel: "B",
    explanation:
      "COUNT(*) はNULLを含む全行数を返します。COUNT(column_name) はその列がNULLでない行のみを数えます。COUNT(DISTINCT column_name) は一意の非NULL値の数を数えます。全行を数えたい場合は必ず COUNT(*) を使用してください。",
    category: "oracle",
    difficulty: "beginner",
  },
  // ============================================================
  //  Oracle/SQL - intermediate
  // ============================================================
  {
    id: "oracle-8",
    question: "次のSQLの結果として正しいものはどれですか？",
    code: `SELECT department_id, COUNT(*) AS cnt
FROM employees
GROUP BY department_id
HAVING COUNT(*) >= 5
ORDER BY cnt DESC;`,
    choices: [
      { label: "A", text: "全部門の人数を降順で表示" },
      { label: "B", text: "5人以上の部門のみ、人数の降順で表示" },
      { label: "C", text: "5人以下の部門のみ表示" },
      { label: "D", text: "構文エラー" },
    ],
    correctLabel: "B",
    explanation:
      "GROUP BY で部門ごとにグループ化し、HAVING COUNT(*) >= 5 で5人以上の部門のみに絞り込みます。WHERE はグループ化前のフィルタ、HAVING はグループ化後のフィルタです。ORDER BY cnt DESC で人数の多い順に並べます。",
    category: "oracle",
    difficulty: "intermediate",
  },
  {
    id: "oracle-9",
    question: "INNER JOIN と LEFT JOIN の違いとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "INNER JOINは両テーブルの一致する行のみ、LEFT JOINは左テーブルの全行を含む" },
      { label: "B", text: "INNER JOINは全行を返し、LEFT JOINは一致する行のみ返す" },
      { label: "C", text: "どちらも同じ結果を返す" },
      { label: "D", text: "LEFT JOINはNULLを除外する" },
    ],
    correctLabel: "A",
    explanation:
      "INNER JOIN は両テーブルで結合条件が一致する行のみを返します。LEFT JOIN（LEFT OUTER JOIN）は左テーブルの全行を返し、右テーブルに一致がない場合は NULL で埋めます。例えば、従業員テーブルと部署テーブルのLEFT JOINでは、部署未配属の従業員も結果に含まれます。",
    category: "oracle",
    difficulty: "intermediate",
  },
  {
    id: "oracle-10",
    question: "次のサブクエリの意味として正しいものはどれですか？",
    code: `SELECT employee_name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);`,
    choices: [
      { label: "A", text: "給与が平均より高い従業員を取得" },
      { label: "B", text: "給与が最大の従業員を取得" },
      { label: "C", text: "全従業員の平均給与を取得" },
      { label: "D", text: "構文エラー" },
    ],
    correctLabel: "A",
    explanation:
      "サブクエリ (SELECT AVG(salary) FROM employees) が全従業員の平均給与を計算し、外側のクエリでその平均より高い給与の従業員を取得します。これはスカラーサブクエリ（単一値を返すサブクエリ）の典型的な使い方です。",
    category: "oracle",
    difficulty: "intermediate",
  },
  {
    id: "oracle-11",
    question: "OracleのNVL関数について正しいものはどれですか？",
    code: `SELECT NVL(commission_pct, 0) FROM employees;`,
    choices: [
      { label: "A", text: "commission_pctが0の場合にNULLを返す" },
      { label: "B", text: "commission_pctがNULLの場合に0を返す" },
      { label: "C", text: "commission_pctを常に0に変換する" },
      { label: "D", text: "標準SQLの関数である" },
    ],
    correctLabel: "B",
    explanation:
      "NVL(式, 代替値) はOracle固有の関数で、第1引数がNULLの場合に第2引数の代替値を返します。NULLでない場合はそのまま第1引数の値を返します。標準SQLではCOALESCE関数が同等の機能を提供し、COALESCE は複数の引数から最初のNULLでない値を返します。",
    category: "oracle",
    difficulty: "intermediate",
  },
  {
    id: "oracle-12",
    question: "次のSQLの BETWEEN の意味として正しいものはどれですか？",
    code: `SELECT * FROM employees
WHERE salary BETWEEN 30000 AND 50000;`,
    choices: [
      { label: "A", text: "30000より大きく50000未満" },
      { label: "B", text: "30000以上50000以下（両端を含む）" },
      { label: "C", text: "30000以上50000未満" },
      { label: "D", text: "30000より大きく50000以下" },
    ],
    correctLabel: "B",
    explanation:
      "BETWEEN は両端の値を含みます（30000以上かつ50000以下）。つまり salary >= 30000 AND salary <= 50000 と同等です。NOT BETWEEN で範囲外を指定することもできます。日付型にも使用可能で、BETWEEN '2024-01-01' AND '2024-12-31' のように範囲指定できます。",
    category: "oracle",
    difficulty: "intermediate",
  },
  {
    id: "oracle-13",
    question: "Oracleで文字列を大文字に変換する関数はどれですか？",
    choices: [
      { label: "A", text: "UPPER()" },
      { label: "B", text: "UCASE()" },
      { label: "C", text: "TOUPPER()" },
      { label: "D", text: "CAPITALIZE()" },
    ],
    correctLabel: "A",
    explanation:
      "UPPER() は文字列を大文字に変換するOracle/SQL標準の関数です。小文字への変換は LOWER()、先頭文字のみ大文字にするには INITCAP() を使用します。UCASE() はMySQL固有、TOUPPER() はC言語の関数です。WHERE句で UPPER(name) = 'TANAKA' のように大文字小文字を無視した検索に使えます。",
    category: "oracle",
    difficulty: "intermediate",
  },
  {
    id: "oracle-14",
    question: "Oracle の DECODE 関数について正しいものはどれですか？",
    code: `SELECT DECODE(status, 'A', '有効', 'D', '無効', '不明')
FROM users;`,
    choices: [
      { label: "A", text: "status が 'A' なら '有効'、'D' なら '無効'、それ以外は '不明' を返す" },
      { label: "B", text: "status を数値にデコードする" },
      { label: "C", text: "標準SQLの関数である" },
      { label: "D", text: "status が NULL の場合はエラーになる" },
    ],
    correctLabel: "A",
    explanation:
      "DECODE はOracle固有の関数で、DECODE(式, 値1, 結果1, 値2, 結果2, ..., デフォルト) の形式で条件分岐を行います。標準SQLの CASE 式と同等の機能で、CASE WHEN status = 'A' THEN '有効' WHEN status = 'D' THEN '無効' ELSE '不明' END と同じ結果です。",
    category: "oracle",
    difficulty: "intermediate",
  },
  {
    id: "oracle-15",
    question: "次の SQL で CASE 式の使い方として正しいものはどれですか？",
    code: `SELECT employee_name,
  CASE
    WHEN salary >= 50000 THEN '高'
    WHEN salary >= 30000 THEN '中'
    ELSE '低'
  END AS salary_grade
FROM employees;`,
    choices: [
      { label: "A", text: "構文エラー" },
      { label: "B", text: "給与に応じて「高」「中」「低」のラベルを表示する" },
      { label: "C", text: "給与を変更する" },
      { label: "D", text: "ELSE は省略できない" },
    ],
    correctLabel: "B",
    explanation:
      "CASE式は条件に応じた値を返す標準SQLの構文です。WHEN句は上から順に評価され、最初に一致した条件の結果を返します。salary が 50000 以上なら「高」、30000 以上なら「中」、それ以外は「低」を返します。ELSE は省略可能で、省略した場合は NULL が返されます。",
    category: "oracle",
    difficulty: "intermediate",
  },
  // ============================================================
  //  Oracle/SQL - advanced
  // ============================================================
  {
    id: "oracle-16",
    question: "Oracleの分析関数 ROW_NUMBER() について正しいものはどれですか？",
    code: `SELECT employee_name, salary,
  ROW_NUMBER() OVER (
    PARTITION BY department_id
    ORDER BY salary DESC
  ) AS rank
FROM employees;`,
    choices: [
      { label: "A", text: "全社員に通し番号を振る" },
      { label: "B", text: "部門ごとに給与の高い順に連番を振る" },
      { label: "C", text: "同一給与に同じ番号を振る" },
      { label: "D", text: "GROUP BYの代替として使う" },
    ],
    correctLabel: "B",
    explanation:
      "ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...) は、パーティション（グループ）ごとに指定した順序で一意の連番を振る分析関数です。同じ値でも異なる番号が付きます。同一値に同じ番号を振るには RANK()（ギャップあり）や DENSE_RANK()（ギャップなし）を使用します。",
    category: "oracle",
    difficulty: "advanced",
  },
  {
    id: "oracle-17",
    question: "次のSQL文の実行順序として正しいものはどれですか？",
    code: `SELECT department_id, AVG(salary)
FROM employees
WHERE hire_date >= '2020-01-01'
GROUP BY department_id
HAVING AVG(salary) > 40000
ORDER BY AVG(salary) DESC;`,
    choices: [
      { label: "A", text: "SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY" },
      { label: "B", text: "FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY" },
      { label: "C", text: "FROM → GROUP BY → WHERE → HAVING → SELECT → ORDER BY" },
      { label: "D", text: "SELECT → ORDER BY → FROM → WHERE → GROUP BY → HAVING" },
    ],
    correctLabel: "B",
    explanation:
      "SQLの論理的な実行順序は FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY です。まずFROMでテーブルを指定し、WHEREで行を絞り込み、GROUP BYでグループ化、HAVINGでグループを絞り込み、SELECTで列を選択し、最後にORDER BYで並べ替えます。",
    category: "oracle",
    difficulty: "advanced",
  },
  {
    id: "oracle-18",
    question: "OracleでINDEX（索引）の効果について正しいものはどれですか？",
    choices: [
      { label: "A", text: "INDEXは常にSELECTの性能を向上させる" },
      { label: "B", text: "INDEXはSELECTを高速化するが、INSERT/UPDATE/DELETEに追加のオーバーヘッドが発生する" },
      { label: "C", text: "INDEXはテーブルのデータを物理的に並べ替える" },
      { label: "D", text: "1テーブルに1つしか作成できない" },
    ],
    correctLabel: "B",
    explanation:
      "INDEXはB-tree等の構造で検索を高速化しますが、データの挿入・更新・削除時にインデックスも更新する必要があるためオーバーヘッドが発生します。全表走査（Full Table Scan）の方が効率的な場合もあり、常に性能が向上するとは限りません。1テーブルに複数のINDEXを作成可能です。",
    category: "oracle",
    difficulty: "advanced",
  },
  {
    id: "oracle-19",
    question: "WITH句（共通テーブル式/CTE）の使い方として正しいものはどれですか？",
    code: `WITH dept_avg AS (
  SELECT department_id, AVG(salary) AS avg_sal
  FROM employees
  GROUP BY department_id
)
SELECT e.employee_name, e.salary, d.avg_sal
FROM employees e
JOIN dept_avg d ON e.department_id = d.department_id
WHERE e.salary > d.avg_sal;`,
    choices: [
      { label: "A", text: "一時テーブルを物理的に作成する" },
      { label: "B", text: "サブクエリに名前を付けて再利用可能にし、可読性を向上させる" },
      { label: "C", text: "ビューを作成する" },
      { label: "D", text: "Oracle専用の構文である" },
    ],
    correctLabel: "B",
    explanation:
      "WITH句（CTE: Common Table Expression）はサブクエリに名前を付けて再利用可能にする標準SQLの構文です。物理テーブルは作成されず、クエリの実行中のみ有効です。複雑なクエリの可読性を向上させ、同じサブクエリの重複を避けられます。再帰クエリ（WITH RECURSIVE）も記述可能です。",
    category: "oracle",
    difficulty: "advanced",
  },
  {
    id: "oracle-20",
    question: "トランザクションの ACID 特性に含まれないものはどれですか？",
    choices: [
      { label: "A", text: "Atomicity（原子性）" },
      { label: "B", text: "Consistency（一貫性）" },
      { label: "C", text: "Integrity（完全性）" },
      { label: "D", text: "Durability（永続性）" },
    ],
    correctLabel: "C",
    explanation:
      "ACIDはAtomicity（原子性）、Consistency（一貫性）、Isolation（分離性）、Durability（永続性）の頭文字です。Integrity（完全性）はACIDの要素ではありません。Isolation（分離性）は並行するトランザクション同士が互いに影響しないことを保証します。",
    category: "oracle",
    difficulty: "advanced",
  },
  {
    id: "oracle-21",
    question: "OracleのSQL*Plusで直前のSQL文を再実行するコマンドはどれですか？",
    choices: [
      { label: "A", text: "RERUN" },
      { label: "B", text: "/" },
      { label: "C", text: "EXEC" },
      { label: "D", text: "AGAIN" },
    ],
    correctLabel: "B",
    explanation:
      "SQL*Plusでは / (スラッシュ)コマンドでSQLバッファに格納された直前のSQL文を再実行できます。RUN（または R）コマンドも同様の機能ですが、まず内容を表示してから実行します。RERUN や AGAIN はSQL*Plusのコマンドではありません。",
    category: "oracle",
    difficulty: "advanced",
  },
  {
    id: "oracle-22",
    question: "SQL*Plusの SPOOL コマンドの用途はどれですか？",
    choices: [
      { label: "A", text: "SQLの実行結果をファイルに出力する" },
      { label: "B", text: "テーブルのデータをバックアップする" },
      { label: "C", text: "SQLの実行速度を計測する" },
      { label: "D", text: "データベースに接続する" },
    ],
    correctLabel: "A",
    explanation:
      "SPOOL ファイル名 で、以降の画面出力をファイルに記録します。SPOOL OFF で記録を終了します。ログの保存やレポート出力に使われます。バックアップには EXPDP/Data Pump、速度計測には SET TIMING ON、接続には CONNECT を使用します。",
    category: "oracle",
    difficulty: "advanced",
  },
  {
    id: "oracle-23",
    question: "次のDDL文について正しいものはどれですか？",
    code: `CREATE TABLE orders (
  order_id   NUMBER PRIMARY KEY,
  customer_id NUMBER NOT NULL,
  order_date DATE DEFAULT SYSDATE,
  CONSTRAINT fk_customer
    FOREIGN KEY (customer_id)
    REFERENCES customers(customer_id)
);`,
    choices: [
      { label: "A", text: "order_dateのデフォルト値はNULLである" },
      { label: "B", text: "customer_idはNULLを許容する" },
      { label: "C", text: "外部キー制約により、customersテーブルに存在しないcustomer_idは登録できない" },
      { label: "D", text: "PRIMARY KEYは複数列に設定できない" },
    ],
    correctLabel: "C",
    explanation:
      "FOREIGN KEY制約はcustomersテーブルのcustomer_idに存在する値のみ登録を許可します（参照整合性）。order_dateのデフォルトはSYSDATE（現在日時）です。customer_idはNOT NULLでNULL不可。PRIMARY KEYは複合主キー（複数列）も可能です。",
    category: "oracle",
    difficulty: "advanced",
  },
  {
    id: "oracle-24",
    question: "Oracleの MERGE 文（UPSERT）の説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "2つのテーブルを物理的に結合する" },
      { label: "B", text: "条件に一致する行があれば更新（UPDATE）、なければ挿入（INSERT）を1文で実行できる" },
      { label: "C", text: "テーブルを削除する" },
      { label: "D", text: "SELECT結果をソートする" },
    ],
    correctLabel: "B",
    explanation:
      "MERGE文はソーステーブルとターゲットテーブルを比較し、一致する行はUPDATE、一致しない行はINSERTを1つのSQL文で実行できます。UPSERT（Update + Insert）とも呼ばれ、データの同期やバッチ更新処理でよく使用されます。WHEN MATCHED / WHEN NOT MATCHED 句で処理を分岐します。",
    category: "oracle",
    difficulty: "advanced",
  },
];
