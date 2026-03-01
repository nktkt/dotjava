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
];
