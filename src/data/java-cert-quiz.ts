export type CertLevel = "bronze" | "silver" | "gold";

export interface CertQuizQuestion {
  id: string;
  question: string;
  choices: { label: string; text: string }[];
  correctLabel: string;
  explanation: string;
  code?: string;
  chapter: string;
  level: CertLevel;
}

export const certQuizQuestions: CertQuizQuestion[] = [
  // ════════════════════════════════════════
  // Bronze: Java言語の基本 (bronze-basics) 13問
  // ════════════════════════════════════════
  {
    id: "bronze-basics-q01",
    question: "Javaのプリミティブ型として正しいものはどれですか？",
    choices: [
      { label: "A", text: "String" },
      { label: "B", text: "int" },
      { label: "C", text: "Integer" },
      { label: "D", text: "Object" },
    ],
    correctLabel: "B",
    explanation:
      "intはJavaの8つのプリミティブ型の1つです。String、Integer、Objectはすべて参照型（クラス）です。プリミティブ型はbyte, short, int, long, float, double, char, booleanの8種類です。",
    chapter: "bronze-basics",
    level: "bronze",
  },
  {
    id: "bronze-basics-q02",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "3java" },
      { label: "B", text: "java12" },
      { label: "C", text: "java3" },
      { label: "D", text: "3" },
    ],
    correctLabel: "A",
    explanation:
      '文字列連結は左から順に評価されます。1 + 2 = 3（int同士の加算）、次に3 + "java" = "3java"（文字列連結）となります。',
    code: 'System.out.println(1 + 2 + "java");',
    chapter: "bronze-basics",
    level: "bronze",
  },
  {
    id: "bronze-basics-q03",
    question: "ローカル変数について正しい記述はどれですか？",
    choices: [
      { label: "A", text: "自動的にデフォルト値で初期化される" },
      { label: "B", text: "使用前に初期化しないとコンパイルエラーになる" },
      { label: "C", text: "finalを付けなくても値を変更できない" },
      { label: "D", text: "staticを付けることができる" },
    ],
    correctLabel: "B",
    explanation:
      "ローカル変数は自動初期化されません。使用前に値を代入しないとコンパイルエラーになります。フィールド（インスタンス変数）はデフォルト値で初期化されます。",
    chapter: "bronze-basics",
    level: "bronze",
  },
  {
    id: "bronze-basics-q04",
    question: "switch文で使用できないデータ型はどれですか？",
    choices: [
      { label: "A", text: "int" },
      { label: "B", text: "String" },
      { label: "C", text: "long" },
      { label: "D", text: "char" },
    ],
    correctLabel: "C",
    explanation:
      "switch文ではbyte、short、int、char、String、enumが使用可能です。longやdouble、floatは使用できません。",
    chapter: "bronze-basics",
    level: "bronze",
  },
  {
    id: "bronze-basics-q05",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "5" },
      { label: "B", text: "6" },
      { label: "C", text: "7" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "A",
    explanation:
      "後置インクリメント(x++)は現在の値を返してからインクリメントします。つまり5が出力された後にxは6になります。",
    code: "int x = 5;\nSystem.out.println(x++);",
    chapter: "bronze-basics",
    level: "bronze",
  },
  {
    id: "bronze-basics-q06",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "java12" },
      { label: "B", text: "java3" },
      { label: "C", text: "3java" },
      { label: "D", text: "12java" },
    ],
    correctLabel: "A",
    explanation:
      '"java" + 1は"java1"（文字列連結）、"java1" + 2は"java12"（文字列連結）になります。左から順に評価され、Stringが含まれると以降は文字列連結になります。',
    code: 'System.out.println("java" + 1 + 2);',
    chapter: "bronze-basics",
    level: "bronze",
  },
  {
    id: "bronze-basics-q07",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "3" },
      { label: "B", text: "3.0" },
      { label: "C", text: "3.5" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "C",
    explanation:
      "7.0はdouble型なので、7.0 / 2はdouble型の除算となり3.5が返されます。一方、7 / 2は整数同士の除算となり3になります。",
    code: "double d = 7.0 / 2;\nSystem.out.println(d);",
    chapter: "bronze-basics",
    level: "bronze",
  },
  {
    id: "bronze-basics-q08",
    question: "for文について正しい記述はどれですか？",
    choices: [
      { label: "A", text: "初期化部・条件部・更新部はすべて必須である" },
      { label: "B", text: "条件部を省略するとコンパイルエラーになる" },
      { label: "C", text: "for(;;)と書くと無限ループになる" },
      { label: "D", text: "更新部にはインクリメントしか書けない" },
    ],
    correctLabel: "C",
    explanation:
      "for文の初期化部・条件部・更新部はそれぞれ省略可能です。すべて省略したfor(;;)は無限ループになります。条件部を省略するとtrueとみなされます。",
    chapter: "bronze-basics",
    level: "bronze",
  },
  {
    id: "bronze-basics-q09",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "火" },
      { label: "B", text: "火水" },
      { label: "C", text: "火水他" },
      { label: "D", text: "水" },
    ],
    correctLabel: "B",
    explanation:
      "case 2にマッチして「火」が出力されますが、breakがないためfall-throughが発生し、case 3の「水」も出力されます。case 3にはbreakがあるのでそこで終了します。",
    code: 'int day = 2;\nswitch (day) {\n    case 1: System.out.print("月"); break;\n    case 2: System.out.print("火");\n    case 3: System.out.print("水"); break;\n    default: System.out.print("他");\n}',
    chapter: "bronze-basics",
    level: "bronze",
  },
  {
    id: "bronze-basics-q10",
    question: "do-while文について正しい記述はどれですか？",
    choices: [
      { label: "A", text: "条件がfalseの場合、一度も実行されない" },
      { label: "B", text: "必ず最低1回は処理が実行される" },
      { label: "C", text: "while文と完全に同じ動作をする" },
      { label: "D", text: "breakを使うことができない" },
    ],
    correctLabel: "B",
    explanation:
      "do-while文は先にブロック内を実行してから条件を評価するため、条件がfalseでも最低1回は処理が実行されます。while文は条件を先に評価するため、最初からfalseだと1回も実行されません。",
    chapter: "bronze-basics",
    level: "bronze",
  },
  {
    id: "bronze-basics-q11",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "true" },
      { label: "B", text: "false" },
      { label: "C", text: "1" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "D",
    explanation:
      "Javaではboolean型とint型の間で暗黙の型変換は行われません。boolean d = 1;はコンパイルエラーになります。C言語とは異なり、Javaでは0/1をboolean値として扱えません。",
    code: "boolean d = 1;\nSystem.out.println(d);",
    chapter: "bronze-basics",
    level: "bronze",
  },
  {
    id: "bronze-basics-q12",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "3" },
      { label: "B", text: "3.0" },
      { label: "C", text: "4" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "A",
    explanation:
      "int同士の除算では小数部は切り捨てられます。7 / 2 = 3（整数除算）です。結果をdouble型にするには、少なくとも一方をdouble型にキャストする必要があります。",
    code: "int result = 7 / 2;\nSystem.out.println(result);",
    chapter: "bronze-basics",
    level: "bronze",
  },
  {
    id: "bronze-basics-q13",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "0 1 2 4" },
      { label: "B", text: "0 1 2 3 4" },
      { label: "C", text: "0 1 2" },
      { label: "D", text: "1 2 4" },
    ],
    correctLabel: "A",
    explanation:
      "i=0,1,2は通常出力されます。i==3のときcontinueでスキップされるので3は出力されません。i=4は通常出力されます。結果は「0 1 2 4」です。",
    code: 'for (int i = 0; i < 5; i++) {\n    if (i == 3) continue;\n    System.out.print(i + " ");\n}',
    chapter: "bronze-basics",
    level: "bronze",
  },
  // ════════════════════════════════════════
  // Bronze: オブジェクト指向の基礎 (bronze-oop) 13問
  // ════════════════════════════════════════
  {
    id: "bronze-oop-q01",
    question: "コンストラクタについて正しい記述はどれですか？",
    choices: [
      { label: "A", text: "戻り値の型を指定する必要がある" },
      { label: "B", text: "クラス名と同名で戻り値の型を書かない" },
      { label: "C", text: "staticメソッドとして定義する" },
      { label: "D", text: "必ず引数を持つ必要がある" },
    ],
    correctLabel: "B",
    explanation:
      "コンストラクタはクラス名と同じ名前を持ち、戻り値の型を記述しません。voidも書きません。引数なしのコンストラクタも定義できます。",
    chapter: "bronze-oop",
    level: "bronze",
  },
  {
    id: "bronze-oop-q02",
    question: "デフォルトコンストラクタが自動生成されるのはどの場合ですか？",
    choices: [
      { label: "A", text: "コンストラクタを1つでも定義した場合" },
      { label: "B", text: "コンストラクタを1つも定義しない場合" },
      { label: "C", text: "abstractクラスの場合のみ" },
      { label: "D", text: "常に自動生成される" },
    ],
    correctLabel: "B",
    explanation:
      "デフォルトコンストラクタは、クラスにコンストラクタが1つも定義されていない場合にのみコンパイラが自動生成します。1つでも定義すると生成されません。",
    chapter: "bronze-oop",
    level: "bronze",
  },
  {
    id: "bronze-oop-q03",
    question: "thisキーワードの説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "親クラスのインスタンスを参照する" },
      { label: "B", text: "現在のクラスのインスタンス自身を参照する" },
      { label: "C", text: "staticメソッド内で使用できる" },
      { label: "D", text: "他のクラスのインスタンスを参照する" },
    ],
    correctLabel: "B",
    explanation:
      "thisは現在のインスタンス自身を参照するキーワードです。フィールドとローカル変数の名前が同じ場合の区別や、コンストラクタの呼び出しに使います。staticメソッドではインスタンスが存在しないため使用できません。",
    chapter: "bronze-oop",
    level: "bronze",
  },
  {
    id: "bronze-oop-q04",
    question: "継承についてJavaで正しい記述はどれですか？",
    choices: [
      { label: "A", text: "複数のクラスを同時に継承できる" },
      { label: "B", text: "extendsキーワードで1つのクラスのみ継承できる" },
      { label: "C", text: "privateメソッドもサブクラスに継承される" },
      { label: "D", text: "finalクラスを継承できる" },
    ],
    correctLabel: "B",
    explanation:
      "Javaは単一継承のみサポートしており、extendsキーワードで1つのクラスだけを継承できます。多重継承はできません（インターフェースの多重実装は可能）。finalクラスは継承できません。",
    chapter: "bronze-oop",
    level: "bronze",
  },
  {
    id: "bronze-oop-q05",
    question: "オーバーライドの条件として正しいものはどれですか？",
    choices: [
      { label: "A", text: "メソッド名だけ同じであればよい" },
      { label: "B", text: "メソッド名、引数の型・数・順序、戻り値の型が同じであること" },
      { label: "C", text: "アクセス修飾子を厳しくできる" },
      { label: "D", text: "staticメソッドもオーバーライドできる" },
    ],
    correctLabel: "B",
    explanation:
      "オーバーライドはメソッド名、引数リスト、戻り値の型（共変戻り値型も可）が一致する必要があります。アクセス修飾子は同じか緩くする必要があり、staticメソッドはオーバーライドではなく隠蔽（hiding）になります。",
    chapter: "bronze-oop",
    level: "bronze",
  },
  {
    id: "bronze-oop-q06",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "ABC" },
      { label: "B", text: "CBA" },
      { label: "C", text: "C" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "A",
    explanation:
      "コンストラクタはスーパークラスから順に実行されます。new C()を呼ぶと、まずAのコンストラクタ、次にBのコンストラクタ、最後にCのコンストラクタが実行され、「ABC」が出力されます。",
    code: 'class A { A() { System.out.print("A"); } }\nclass B extends A { B() { System.out.print("B"); } }\nclass C extends B { C() { System.out.print("C"); } }\nnew C();',
    chapter: "bronze-oop",
    level: "bronze",
  },
  {
    id: "bronze-oop-q07",
    question: "superキーワードの用途として正しくないものはどれですか？",
    choices: [
      { label: "A", text: "親クラスのコンストラクタを呼び出す" },
      { label: "B", text: "親クラスのメソッドを呼び出す" },
      { label: "C", text: "親クラスのフィールドにアクセスする" },
      { label: "D", text: "親クラスのインスタンスを新たに生成する" },
    ],
    correctLabel: "D",
    explanation:
      "superは親クラスのコンストラクタ呼び出し(super())、メソッド呼び出し(super.method())、フィールドアクセス(super.field)に使用できます。新たなインスタンスの生成機能はありません。",
    chapter: "bronze-oop",
    level: "bronze",
  },
  {
    id: "bronze-oop-q08",
    question: "アクセス修飾子privateの説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "同じパッケージ内のクラスからアクセスできる" },
      { label: "B", text: "サブクラスからアクセスできる" },
      { label: "C", text: "同じクラス内からのみアクセスできる" },
      { label: "D", text: "すべてのクラスからアクセスできる" },
    ],
    correctLabel: "C",
    explanation:
      "privateは最も制限の強いアクセス修飾子で、同じクラス内からのみアクセスできます。サブクラスや同じパッケージの他クラスからもアクセスできません。",
    chapter: "bronze-oop",
    level: "bronze",
  },
  {
    id: "bronze-oop-q09",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "ポチがワンと鳴く" },
      { label: "B", text: "ポチが鳴く" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時エラー" },
    ],
    correctLabel: "A",
    explanation:
      "変数aの型はAnimalですが、実際のオブジェクトはDogです。ポリモーフィズムにより、実行時にはDogクラスのオーバーライドされたspeak()メソッドが呼ばれます。",
    code: 'class Animal {\n    String name;\n    Animal(String name) { this.name = name; }\n    void speak() { System.out.println(name + "が鳴く"); }\n}\nclass Dog extends Animal {\n    Dog(String name) { super(name); }\n    void speak() { System.out.println(name + "がワンと鳴く"); }\n}\nAnimal a = new Dog("ポチ");\na.speak();',
    chapter: "bronze-oop",
    level: "bronze",
  },
  {
    id: "bronze-oop-q10",
    question: "カプセル化の説明として最も適切なものはどれですか？",
    choices: [
      { label: "A", text: "すべてのフィールドをpublicにすること" },
      { label: "B", text: "フィールドをprivateにし、getter/setterで制御すること" },
      { label: "C", text: "クラスをfinalにすること" },
      { label: "D", text: "メソッドをstaticにすること" },
    ],
    correctLabel: "B",
    explanation:
      "カプセル化はオブジェクト指向の重要な原則で、フィールドをprivateにして外部から直接アクセスさせず、publicなgetter/setterメソッド経由でアクセスを制御する設計手法です。",
    chapter: "bronze-oop",
    level: "bronze",
  },
  {
    id: "bronze-oop-q11",
    question: "次のコードでコンパイルエラーになる行はどれですか？",
    choices: [
      { label: "A", text: "行1" },
      { label: "B", text: "行2" },
      { label: "C", text: "行3" },
      { label: "D", text: "エラーなし" },
    ],
    correctLabel: "B",
    explanation:
      "Animal型の変数aにはfetch()メソッドが定義されていないため、a.fetch()はコンパイルエラーになります。ポリモーフィズムでは、呼び出せるメソッドは変数の宣言型で決まります。",
    code: 'Animal a = new Dog("ポチ");  // 行1\na.fetch();                    // 行2\na.speak();                    // 行3',
    chapter: "bronze-oop",
    level: "bronze",
  },
  {
    id: "bronze-oop-q12",
    question: "オーバーロードの説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "同じクラス内で同名・同引数のメソッドを複数定義すること" },
      { label: "B", text: "同じクラス内で同名だが引数の型・数・順序が異なるメソッドを定義すること" },
      { label: "C", text: "親クラスのメソッドをサブクラスで再定義すること" },
      { label: "D", text: "戻り値の型だけが異なるメソッドを定義すること" },
    ],
    correctLabel: "B",
    explanation:
      "オーバーロードは同じクラス内で同名のメソッドを引数の型・数・順序を変えて複数定義することです。戻り値の型だけが異なるメソッドの定義はコンパイルエラーになります。オーバーライドは親クラスのメソッドの再定義です。",
    chapter: "bronze-oop",
    level: "bronze",
  },
  {
    id: "bronze-oop-q13",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "10" },
      { label: "B", text: "20" },
      { label: "C", text: "10と20" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "C",
    explanation:
      "フィールドへのアクセスは宣言型で決まるため、obj.xはBase型のx=10を返します。一方、メソッド呼び出しは実行時の型で決まるため、obj.getX()はSubクラスのgetX()が呼ばれx=20を返します。",
    code: 'class Base {\n    int x = 10;\n    int getX() { return x; }\n}\nclass Sub extends Base {\n    int x = 20;\n    int getX() { return x; }\n}\nBase obj = new Sub();\nSystem.out.println(obj.x + "と" + obj.getX());',
    chapter: "bronze-oop",
    level: "bronze",
  },
  // ════════════════════════════════════════
  // Bronze: 基本APIと配列 (bronze-api) 13問
  // ════════════════════════════════════════
  {
    id: "bronze-api-q01",
    question: "Stringクラスのメソッドで文字列の長さを返すものはどれですか？",
    choices: [
      { label: "A", text: "size()" },
      { label: "B", text: "count()" },
      { label: "C", text: "length()" },
      { label: "D", text: "getLength()" },
    ],
    correctLabel: "C",
    explanation:
      "Stringクラスの文字列長を取得するメソッドはlength()です。配列の場合は.lengthフィールド、Collectionの場合はsize()メソッドを使います。",
    chapter: "bronze-api",
    level: "bronze",
  },
  {
    id: "bronze-api-q02",
    question: "配列の要素数を取得する方法として正しいものはどれですか？",
    choices: [
      { label: "A", text: "array.length()" },
      { label: "B", text: "array.size()" },
      { label: "C", text: "array.length" },
      { label: "D", text: "array.count()" },
    ],
    correctLabel: "C",
    explanation:
      "配列の要素数は.lengthフィールド（メソッドではない）で取得します。Stringはlength()メソッド、Collectionはsize()メソッドを使う点との区別がBronze試験で頻出です。",
    chapter: "bronze-api",
    level: "bronze",
  },
  {
    id: "bronze-api-q03",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "true" },
      { label: "B", text: "false" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時エラー" },
    ],
    correctLabel: "B",
    explanation:
      '==演算子は参照型に対して参照（アドレス）を比較します。new String()で別々のオブジェクトを生成しているため、参照が異なりfalseになります。値の比較にはequals()を使用します。',
    code: 'String s1 = new String("hello");\nString s2 = new String("hello");\nSystem.out.println(s1 == s2);',
    chapter: "bronze-api",
    level: "bronze",
  },
  {
    id: "bronze-api-q04",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "Java" },
      { label: "B", text: "JAVA" },
      { label: "C", text: "java" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "A",
    explanation:
      "Stringはイミュータブル（不変）です。toUpperCase()は新しいStringを返しますが、戻り値を変数に代入していないため元のsは変わりません。s = s.toUpperCase()と書く必要があります。",
    code: 'String s = "Java";\ns.toUpperCase();\nSystem.out.println(s);',
    chapter: "bronze-api",
    level: "bronze",
  },
  {
    id: "bronze-api-q05",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "llo" },
      { label: "B", text: "ell" },
      { label: "C", text: "llo " },
      { label: "D", text: "lo W" },
    ],
    correctLabel: "A",
    explanation:
      "substring(2, 5)はインデックス2から4までの文字を返します（5は含まない）。\"Hello World\"のインデックス2='l', 3='l', 4='o'なので\"llo\"になります。",
    code: 'String s = "Hello World";\nSystem.out.println(s.substring(2, 5));',
    chapter: "bronze-api",
    level: "bronze",
  },
  {
    id: "bronze-api-q06",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "6" },
      { label: "B", text: "-1" },
      { label: "C", text: "0" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "A",
    explanation:
      "indexOf()は指定した文字列が最初に出現するインデックスを返します。\"Hello Java\"の中で\"Java\"はインデックス6から始まります。見つからない場合は-1を返します。",
    code: 'String s = "Hello Java";\nSystem.out.println(s.indexOf("Java"));',
    chapter: "bronze-api",
    level: "bronze",
  },
  {
    id: "bronze-api-q07",
    question: "ArrayListについて正しい記述はどれですか？",
    choices: [
      { label: "A", text: "プリミティブ型を直接格納できる" },
      { label: "B", text: "サイズが固定である" },
      { label: "C", text: "ジェネリクスでラッパークラスを指定して使用する" },
      { label: "D", text: "importなしで使用できる" },
    ],
    correctLabel: "C",
    explanation:
      "ArrayListはジェネリクス（<型>）で格納する型を指定します。プリミティブ型は直接格納できないため、ラッパークラス（Integer、Doubleなど）を使います。java.util.ArrayListのインポートが必要です。",
    chapter: "bronze-api",
    level: "bronze",
  },
  {
    id: "bronze-api-q08",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "[Java, Python, Go]" },
      { label: "B", text: "[Java, Kotlin, Go]" },
      { label: "C", text: "[Java, Kotlin]" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "C",
    explanation:
      "set(1, \"Kotlin\")でインデックス1の\"Python\"が\"Kotlin\"に置換され、remove(2)でインデックス2の\"Go\"が削除されます。結果は[Java, Kotlin]になります。",
    code: 'ArrayList<String> list = new ArrayList<>();\nlist.add("Java");\nlist.add("Python");\nlist.add("Go");\nlist.set(1, "Kotlin");\nlist.remove(2);\nSystem.out.println(list);',
    chapter: "bronze-api",
    level: "bronze",
  },
  {
    id: "bronze-api-q09",
    question: "オートボクシングの説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "参照型からプリミティブ型への自動変換" },
      { label: "B", text: "プリミティブ型からラッパークラスへの自動変換" },
      { label: "C", text: "String型からint型への自動変換" },
      { label: "D", text: "配列からArrayListへの自動変換" },
    ],
    correctLabel: "B",
    explanation:
      "オートボクシングはプリミティブ型（int等）からラッパークラス（Integer等）への自動変換です。逆方向の自動変換はアンボクシングと呼ばれます。Integer i = 10;のように書くと自動的にオートボクシングが行われます。",
    chapter: "bronze-api",
    level: "bronze",
  },
  {
    id: "bronze-api-q10",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "10 30 50" },
      { label: "B", text: "10 20 30" },
      { label: "C", text: "20 40" },
      { label: "D", text: "10 20 30 40 50" },
    ],
    correctLabel: "A",
    explanation:
      "ループ変数iは0,2,4と2ずつ増加します。arr[0]=10, arr[2]=30, arr[4]=50が出力され、結果は「10 30 50」になります。",
    code: 'int[] arr = {10, 20, 30, 40, 50};\nfor (int i = 0; i < arr.length; i += 2) {\n    System.out.print(arr[i] + " ");\n}',
    chapter: "bronze-api",
    level: "bronze",
  },
  {
    id: "bronze-api-q11",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "6" },
      { label: "B", text: "3" },
      { label: "C", text: "2" },
      { label: "D", text: "実行時エラー" },
    ],
    correctLabel: "A",
    explanation:
      "matrix[1][2]は2次元配列の2行目（インデックス1）の3列目（インデックス2）の要素を指します。{4, 5, 6}の3番目の要素なので6が出力されます。",
    code: "int[][] matrix = {\n    {1, 2, 3},\n    {4, 5, 6}\n};\nSystem.out.println(matrix[1][2]);",
    chapter: "bronze-api",
    level: "bronze",
  },
  {
    id: "bronze-api-q12",
    question: "Integer.parseInt(\"abc\")を実行するとどうなりますか？",
    choices: [
      { label: "A", text: "0が返される" },
      { label: "B", text: "nullが返される" },
      { label: "C", text: "NumberFormatExceptionが発生する" },
      { label: "D", text: "コンパイルエラーになる" },
    ],
    correctLabel: "C",
    explanation:
      "Integer.parseInt()は文字列を整数に変換しますが、数値に変換できない文字列を渡すとNumberFormatExceptionが発生します。\"abc\"は数値として解析できないため例外がスローされます。",
    chapter: "bronze-api",
    level: "bronze",
  },
  {
    id: "bronze-api-q13",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "1" },
      { label: "B", text: "99" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時エラー" },
    ],
    correctLabel: "B",
    explanation:
      "配列の代入は参照のコピーです。copyとoriginalは同じ配列オブジェクトを参照しているため、copy[0]を変更するとoriginal[0]も変わります。独立したコピーにはArrays.copyOf()を使います。",
    code: "int[] original = {1, 2, 3};\nint[] copy = original;\ncopy[0] = 99;\nSystem.out.println(original[0]);",
    chapter: "bronze-api",
    level: "bronze",
  },
  // ════════════════════════════════════════
  // Bronze: 試験対策 (bronze-exam) 13問
  // ════════════════════════════════════════
  {
    id: "bronze-exam-q01",
    question: "Javaプログラムの実行開始点となるmainメソッドの正しいシグネチャはどれですか？",
    choices: [
      { label: "A", text: "public void main(String[] args)" },
      { label: "B", text: "public static void main(String[] args)" },
      { label: "C", text: "static void main(String args)" },
      { label: "D", text: "public static int main(String[] args)" },
    ],
    correctLabel: "B",
    explanation:
      "mainメソッドのシグネチャはpublic static void main(String[] args)が正しい形式です。public、static、void、String[]引数のすべてが必要です。",
    chapter: "bronze-exam",
    level: "bronze",
  },
  {
    id: "bronze-exam-q02",
    question: "次のうちJavaの予約語でないものはどれですか？",
    choices: [
      { label: "A", text: "goto" },
      { label: "B", text: "const" },
      { label: "C", text: "sizeof" },
      { label: "D", text: "abstract" },
    ],
    correctLabel: "C",
    explanation:
      "sizeofはC/C++の演算子であり、Javaの予約語ではありません。gotoとconstはJavaの予約語として予約されていますが、実際には使用されていません。",
    chapter: "bronze-exam",
    level: "bronze",
  },
  {
    id: "bronze-exam-q03",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "RGB" },
      { label: "B", text: "R" },
      { label: "C", text: "RG" },
      { label: "D", text: "RGBD" },
    ],
    correctLabel: "A",
    explanation:
      "case \"red\"にマッチしてRが出力されますが、breakがないのでfall-throughが発生します。Gも出力され、case \"blue\"のBも出力されますが、そこにbreakがあるので停止します。",
    code: 'String color = "red";\nswitch (color) {\n    case "red":   System.out.print("R");\n    case "green": System.out.print("G");\n    case "blue":  System.out.print("B"); break;\n    default:      System.out.print("D");\n}',
    chapter: "bronze-exam",
    level: "bronze",
  },
  {
    id: "bronze-exam-q04",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "Java" },
      { label: "B", text: "Java SE" },
      { label: "C", text: "JAVA" },
      { label: "D", text: "null" },
    ],
    correctLabel: "A",
    explanation:
      "Stringはイミュータブルです。s.concat(\" SE\")とs.toUpperCase()は新しいStringを返しますが、その戻り値を変数に代入していないため、sは元の\"Java\"のままです。",
    code: 'String s = "Java";\ns.concat(" SE");\ns.toUpperCase();\nSystem.out.println(s);',
    chapter: "bronze-exam",
    level: "bronze",
  },
  {
    id: "bronze-exam-q05",
    question: "次のコードでコンパイルエラーになるものはどれですか？",
    choices: [
      { label: "A", text: "int a = 10L;" },
      { label: "B", text: "double b = 10;" },
      { label: "C", text: "float f = 3.14;" },
      { label: "D", text: "AとCの両方" },
    ],
    correctLabel: "D",
    explanation:
      "10Lはlong型なのでintに代入できません（縮小変換）。3.14はdouble型なのでfloatに代入できません。float f = 3.14f;と書く必要があります。double b = 10;はintからdoubleへの拡大変換なのでOKです。",
    chapter: "bronze-exam",
    level: "bronze",
  },
  {
    id: "bronze-exam-q06",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "Parent: 10" },
      { label: "B", text: "Child: hello" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "Parent: 10とChild: hello" },
    ],
    correctLabel: "A",
    explanation:
      "Childクラスのprint(String)はオーバーロード（引数の型が異なる）であり、オーバーライドではありません。c.print(10)はParentから継承したprint(int)が呼ばれます。",
    code: 'class Parent {\n    void print(int x) { System.out.println("Parent: " + x); }\n}\nclass Child extends Parent {\n    void print(String x) { System.out.println("Child: " + x); }\n}\nChild c = new Child();\nc.print(10);',
    chapter: "bronze-exam",
    level: "bronze",
  },
  {
    id: "bronze-exam-q07",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "10" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "0" },
      { label: "D", text: "実行時エラー" },
    ],
    correctLabel: "A",
    explanation:
      "if (true)の条件は常にtrueなのでコンパイラはxが必ず初期化されると判断します。そのためコンパイルエラーにはならず、10が出力されます。",
    code: "int x;\nif (true) {\n    x = 10;\n}\nSystem.out.println(x);",
    chapter: "bronze-exam",
    level: "bronze",
  },
  {
    id: "bronze-exam-q08",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "true" },
      { label: "B", text: "false" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時エラー" },
    ],
    correctLabel: "A",
    explanation:
      "文字列リテラル同士は文字列プールで共有されるため、同じ文字列リテラル\"hello\"は同じオブジェクトを参照します。そのため==比較でもtrueになります。new String()を使うと別オブジェクトになります。",
    code: 'String a = "hello";\nString b = "hello";\nSystem.out.println(a == b);',
    chapter: "bronze-exam",
    level: "bronze",
  },
  {
    id: "bronze-exam-q09",
    question: "Javaの識別子（変数名等）として正しいものはどれですか？",
    choices: [
      { label: "A", text: "3count" },
      { label: "B", text: "my-var" },
      { label: "C", text: "_total" },
      { label: "D", text: "class" },
    ],
    correctLabel: "C",
    explanation:
      "Javaの識別子は英字、アンダースコア(_)、ドル記号($)で始まる必要があります。数字で始まることはできず、ハイフンは使えません。予約語（class等）も識別子として使えません。",
    chapter: "bronze-exam",
    level: "bronze",
  },
  {
    id: "bronze-exam-q10",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "1" },
      { label: "B", text: "2" },
      { label: "C", text: "3" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "A",
    explanation:
      "do-while文は条件判定の前に必ず1回実行されます。count++でcountは1になり、while(count < 0)は偽なのでループ終了。結果は1が出力されます。",
    code: "int count = 0;\ndo {\n    count++;\n} while (count < 0);\nSystem.out.println(count);",
    chapter: "bronze-exam",
    level: "bronze",
  },
  {
    id: "bronze-exam-q11",
    question: "次のコードの実行結果はどうなりますか？",
    choices: [
      { label: "A", text: "0が出力される" },
      { label: "B", text: "nullが出力される" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時エラー（ArrayIndexOutOfBoundsException）" },
    ],
    correctLabel: "D",
    explanation:
      "配列のインデックスは0からlength-1までです。要素数3の配列に対してarr[3]はインデックス範囲外なので、実行時にArrayIndexOutOfBoundsExceptionが発生します。",
    code: "int[] arr = {10, 20, 30};\nSystem.out.println(arr[3]);",
    chapter: "bronze-exam",
    level: "bronze",
  },
  {
    id: "bronze-exam-q12",
    question: "インスタンス変数（フィールド）のデフォルト値として正しい組み合わせはどれですか？",
    choices: [
      { label: "A", text: "int: 0, boolean: false, String: null" },
      { label: "B", text: "int: 0, boolean: true, String: \"\"" },
      { label: "C", text: "int: -1, boolean: false, String: null" },
      { label: "D", text: "int: 0, boolean: false, String: \"\"" },
    ],
    correctLabel: "A",
    explanation:
      "インスタンス変数は自動的にデフォルト値で初期化されます。数値型は0（0.0）、booleanはfalse、参照型（Stringを含む）はnullです。ローカル変数はデフォルト値が設定されない点に注意です。",
    chapter: "bronze-exam",
    level: "bronze",
  },
  {
    id: "bronze-exam-q13",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "実行時エラー（NullPointerException）" },
      { label: "B", text: "0" },
      { label: "C", text: "null" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "A",
    explanation:
      "Integer型のnumにnullが代入されています。int x = num;でアンボクシングが試みられますが、nullをintに変換できないためNullPointerExceptionが発生します。",
    code: "Integer num = null;\nint x = num;\nSystem.out.println(x);",
    chapter: "bronze-exam",
    level: "bronze",
  },
  // ════════════════════════════════════════
  // Silver: データ型と演算子 (silver-types) 12問
  // ════════════════════════════════════════
  {
    id: "silver-types-q01",
    question: "varキーワードについて正しい記述はどれですか？",
    choices: [
      { label: "A", text: "フィールドの宣言に使用できる" },
      { label: "B", text: "メソッドの引数に使用できる" },
      { label: "C", text: "ローカル変数の型推論にのみ使用できる" },
      { label: "D", text: "nullで初期化できる" },
    ],
    correctLabel: "C",
    explanation:
      "var（ローカル変数型推論）はJava 10で導入され、ローカル変数の宣言にのみ使用できます。フィールド、メソッド引数、戻り値型には使えません。nullでの初期化はできません。",
    chapter: "silver-types",
    level: "silver",
  },
  {
    id: "silver-types-q02",
    question: "次のコードでコンパイルエラーになるのはどれですか？",
    choices: [
      { label: "A", text: "var x = 10;" },
      { label: "B", text: "var s = \"hello\";" },
      { label: "C", text: "var n = null;" },
      { label: "D", text: "var list = new ArrayList<>();" },
    ],
    correctLabel: "C",
    explanation:
      "var n = null;はコンパイルエラーになります。varは初期化子の型から推論するため、nullでは型を特定できません。他の選択肢はすべて有効な型推論が可能です。",
    chapter: "silver-types",
    level: "silver",
  },
  {
    id: "silver-types-q03",
    question: "テキストブロック（\"\"\"）について正しい記述はどれですか？",
    choices: [
      { label: "A", text: "Java 8から使用可能" },
      { label: "B", text: "開始の\"\"\"の後に文字列を書ける" },
      { label: "C", text: "自動的に末尾の改行が除去される" },
      { label: "D", text: "通常のStringリテラルと連結できない" },
    ],
    correctLabel: "C",
    explanation:
      "テキストブロックはJava 15で正式導入されました。開始の\"\"\"の後は改行が必要です。末尾の改行は自動除去され、共通のインデントも除去されます。通常のStringと連結可能です。",
    chapter: "silver-types",
    level: "silver",
  },
  {
    id: "silver-types-q04",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "false" },
      { label: "B", text: "true" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時エラー" },
    ],
    correctLabel: "A",
    explanation:
      "nullに対するinstanceof演算子は常にfalseを返します。NullPointerExceptionは発生しません。これはinstanceofの仕様として定められています。",
    code: "String str = null;\nSystem.out.println(str instanceof String);",
    chapter: "silver-types",
    level: "silver",
  },
  {
    id: "silver-types-q05",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "false" },
      { label: "B", text: "true" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時エラー（ArithmeticException）" },
    ],
    correctLabel: "A",
    explanation:
      "&&は短絡評価（ショートサーキット）を行います。x==0なので左辺が偽となり、右辺の10/x（ゼロ除算）は評価されません。結果はfalseです。&を使うと右辺も評価されて例外が発生します。",
    code: "int x = 0;\nboolean result = (x != 0) && (10 / x > 1);\nSystem.out.println(result);",
    chapter: "silver-types",
    level: "silver",
  },
  {
    id: "silver-types-q06",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "15" },
      { label: "B", text: "コンパイルエラー" },
      { label: "C", text: "10" },
      { label: "D", text: "実行時エラー" },
    ],
    correctLabel: "A",
    explanation:
      "複合代入演算子(+=)は暗黙のキャストを含みます。b += 5はb = (byte)(b + 5)と同等です。b + 5はint型になりますが、+=ではbyteに自動キャストされます。一方、b = b + 5;はコンパイルエラーになります。",
    code: "byte b = 10;\nb += 5;\nSystem.out.println(b);",
    chapter: "silver-types",
    level: "silver",
  },
  {
    id: "silver-types-q07",
    question: "次のリテラル表記のうち、正しいものはどれですか？",
    choices: [
      { label: "A", text: "int hex = 0xAF;" },
      { label: "B", text: "int bin = 0b102;" },
      { label: "C", text: "long l = 100_000_000;" },
      { label: "D", text: "AとCの両方" },
    ],
    correctLabel: "D",
    explanation:
      "0xAFは16進数リテラルで有効です。0b102は2進数リテラルですが2は無効な桁です（0と1のみ）。100_000_000はアンダースコア区切りで有効ですが、long型にはL接尾辞が推奨されます（intの範囲内なので省略可能）。",
    chapter: "silver-types",
    level: "silver",
  },
  {
    id: "silver-types-q08",
    question: "オートボクシングとアンボクシングについて正しいものはどれですか？",
    choices: [
      { label: "A", text: "Integer i = null; int x = i; は正常に動作する" },
      { label: "B", text: "Integer i = null; int x = i; はNullPointerExceptionが発生する" },
      { label: "C", text: "int型からString型へのオートボクシングが行われる" },
      { label: "D", text: "オートボクシングはJava 1.4から使用可能" },
    ],
    correctLabel: "B",
    explanation:
      "nullのIntegerをアンボクシングしようとするとNullPointerExceptionが発生します。オートボクシングはプリミティブ型とラッパークラス間の変換であり、Stringは対象外です。Java 5から導入されました。",
    chapter: "silver-types",
    level: "silver",
  },
  {
    id: "silver-types-q09",
    question: "型変換について正しい記述はどれですか？",
    choices: [
      { label: "A", text: "longからfloatへの変換は精度が落ちない" },
      { label: "B", text: "charからshortへの変換は暗黙的に行える" },
      { label: "C", text: "byteからintへの変換は暗黙的に行える" },
      { label: "D", text: "doubleからintへの変換は暗黙的に行える" },
    ],
    correctLabel: "C",
    explanation:
      "byteからintへの変換は拡大変換のため暗黙的に行えます。longからfloatは拡大変換ですが精度が落ちる可能性があります。charとshortは範囲が異なるため明示的キャストが必要です。doubleからintは縮小変換でキャスト必須です。",
    chapter: "silver-types",
    level: "silver",
  },
  {
    id: "silver-types-q10",
    question: "次のコードのうち、コンパイルエラーにならないものはどれですか？",
    choices: [
      { label: "A", text: "var x;" },
      { label: "B", text: "var arr = {1, 2, 3};" },
      { label: "C", text: "var list = List.of(1, 2, 3);" },
      { label: "D", text: "var lambda = (x) -> x * 2;" },
    ],
    correctLabel: "C",
    explanation:
      "var x;は初期値がないため型推論不能。var arr = {1,2,3};は配列初期化子では型推論不能。var lambda = ...はラムダ式の型が特定できないためエラー。List.of()はList<Integer>と推論可能です。",
    chapter: "silver-types",
    level: "silver",
  },
  {
    id: "silver-types-q11",
    question: "パターンマッチングinstanceof（Java 16+）について正しい記述はどれですか？",
    choices: [
      { label: "A", text: "型チェックとキャストを同時に行える" },
      { label: "B", text: "プリミティブ型に対して使用できる" },
      { label: "C", text: "null値に対してtrueを返すことがある" },
      { label: "D", text: "switchの中では使用できない" },
    ],
    correctLabel: "A",
    explanation:
      "パターンマッチングinstanceofは、if (obj instanceof String s)のように型チェックと変数への代入を同時に行えます。nullはinstanceofで常にfalseです。Java 21以降のswitchでも使用可能です。",
    chapter: "silver-types",
    level: "silver",
  },
  {
    id: "silver-types-q12",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "成人" },
      { label: "B", text: "未成年" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "null" },
    ],
    correctLabel: "A",
    explanation:
      "三項演算子は(条件) ? 真の値 : 偽の値の形式です。age >= 18はtrue（20 >= 18）なので\"成人\"が返されます。三項演算子は式であり、値を返すことができます。",
    code: "int age = 20;\nString status = (age >= 18) ? \"成人\" : \"未成年\";\nSystem.out.println(status);",
    chapter: "silver-types",
    level: "silver",
  },
  // ════════════════════════════════════════
  // Silver: 制御構文とメソッド (silver-flow) 12問
  // ════════════════════════════════════════
  {
    id: "silver-flow-q01",
    question: "拡張for文（for-each）で使用できるのはどれですか？",
    choices: [
      { label: "A", text: "配列とIterableを実装したクラス" },
      { label: "B", text: "配列のみ" },
      { label: "C", text: "Collectionのみ" },
      { label: "D", text: "Map" },
    ],
    correctLabel: "A",
    explanation:
      "拡張for文は配列とjava.lang.Iterableインターフェースを実装したクラス（List、Setなど）に使用できます。MapはIterableを実装していないため直接使えません。",
    chapter: "silver-flow",
    level: "silver",
  },
  {
    id: "silver-flow-q02",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "1 2 3" },
      { label: "B", text: "1 2" },
      { label: "C", text: "1 3" },
      { label: "D", text: "1 2 3 4" },
    ],
    correctLabel: "C",
    explanation:
      "i=1のとき出力、i=2のときcontinueでスキップ、i=3のとき出力、i=4のときbreakで終了。結果は「1 3」です。",
    code: 'for (int i = 1; i <= 5; i++) {\n    if (i == 2) continue;\n    if (i == 4) break;\n    System.out.print(i + " ");\n}',
    chapter: "silver-flow",
    level: "silver",
  },
  {
    id: "silver-flow-q03",
    question: "switch式（Java 14+）について正しい記述はどれですか？",
    choices: [
      { label: "A", text: "アロー構文(->)でもfall-throughが発生する" },
      { label: "B", text: "アロー構文(->)ではfall-throughが発生しない" },
      { label: "C", text: "値を返すことができない" },
      { label: "D", text: "defaultケースは常に省略できる" },
    ],
    correctLabel: "B",
    explanation:
      "switch式のアロー構文(->)ではfall-throughが発生しません。breakを書く必要もありません。switch式は値を返すことができ、すべてのケースを網羅する必要があるためdefaultが必要な場合があります。",
    chapter: "silver-flow",
    level: "silver",
  },
  {
    id: "silver-flow-q04",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "水曜日" },
      { label: "B", text: "週末" },
      { label: "C", text: "不明" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "A",
    explanation:
      "switch式でdayNum=3はcase 3に該当し、\"水曜日\"が返されます。アロー構文ではfall-throughが発生しないため、正確にマッチしたケースの値のみが返されます。",
    code: "int dayNum = 3;\nString dayName = switch (dayNum) {\n    case 1 -> \"月曜日\";\n    case 2 -> \"火曜日\";\n    case 3 -> \"水曜日\";\n    case 4, 5 -> \"後半\";\n    default -> \"不明\";\n};\nSystem.out.println(dayName);",
    chapter: "silver-flow",
    level: "silver",
  },
  {
    id: "silver-flow-q05",
    question: "yield文について正しい記述はどれですか？",
    choices: [
      { label: "A", text: "すべてのswitch式で必須である" },
      { label: "B", text: "switch式のアロー構文のブロック内で値を返すために使う" },
      { label: "C", text: "メソッドの戻り値を返すために使う" },
      { label: "D", text: "ループを中断するために使う" },
    ],
    correctLabel: "B",
    explanation:
      "yieldはswitch式でブロック({})内から値を返すために使います。アロー構文で単一式の場合はyield不要です。ブロック内で複数の処理を行ってから値を返す場合にyieldを使います。",
    chapter: "silver-flow",
    level: "silver",
  },
  {
    id: "silver-flow-q06",
    question: "ラベル付きbreakについて正しい記述はどれですか？",
    choices: [
      { label: "A", text: "メソッドから脱出できる" },
      { label: "B", text: "ネストしたループの外側ループから脱出できる" },
      { label: "C", text: "if文に対して使用できない" },
      { label: "D", text: "Java 17で廃止された" },
    ],
    correctLabel: "B",
    explanation:
      "ラベル付きbreakはネストしたループで外側のループから脱出するために使います。outer: for(...)のようにラベルを付けて、break outer;で外側ループを終了できます。",
    chapter: "silver-flow",
    level: "silver",
  },
  {
    id: "silver-flow-q07",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "00 01 02 10" },
      { label: "B", text: "00 01 02 10 11" },
      { label: "C", text: "00 01 02" },
      { label: "D", text: "00 01 10 11" },
    ],
    correctLabel: "A",
    explanation:
      "i=0のとき、j=0,1,2は通常出力。i=1, j=0は出力。i=1, j=1でbreak outerにより外側ループも終了。結果は「00 01 02 10」です。",
    code: "outer:\nfor (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        if (i == 1 && j == 1) break outer;\n        System.out.print(i + \"\" + j + \" \");\n    }\n}",
    chapter: "silver-flow",
    level: "silver",
  },
  {
    id: "silver-flow-q08",
    question: "メソッドの引数について正しい記述はどれですか？",
    choices: [
      { label: "A", text: "プリミティブ型は参照渡しである" },
      { label: "B", text: "参照型はオブジェクトのコピーが渡される" },
      { label: "C", text: "プリミティブ型は値のコピーが渡される" },
      { label: "D", text: "配列は値渡しである" },
    ],
    correctLabel: "C",
    explanation:
      "プリミティブ型は値のコピーが渡されます（値渡し）。参照型は参照の値のコピーが渡されるため、メソッド内で参照先のオブジェクトを変更すると呼び出し元にも影響します。",
    chapter: "silver-flow",
    level: "silver",
  },
  {
    id: "silver-flow-q09",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "10, 99" },
      { label: "B", text: "99, 99" },
      { label: "C", text: "10, 1" },
      { label: "D", text: "99, 1" },
    ],
    correctLabel: "A",
    explanation:
      "プリミティブ型numは値渡しのため元の値は変わりません。配列arrayは参照の値渡しなので、メソッド内でarray[0]を変更すると元の配列にも反映されます。",
    code: "static void change(int x, int[] arr) {\n    x = 99;\n    arr[0] = 99;\n}\nint num = 10;\nint[] array = {1, 2, 3};\nchange(num, array);\nSystem.out.println(num + \", \" + array[0]);",
    chapter: "silver-flow",
    level: "silver",
  },
  {
    id: "silver-flow-q10",
    question: "可変長引数（varargs）について正しい記述はどれですか？",
    choices: [
      { label: "A", text: "メソッドの最初の引数として定義する" },
      { label: "B", text: "1つのメソッドに複数の可変長引数を定義できる" },
      { label: "C", text: "メソッドの最後の引数として1つだけ定義できる" },
      { label: "D", text: "呼び出し時に必ず1つ以上の引数が必要" },
    ],
    correctLabel: "C",
    explanation:
      "可変長引数（int... numbers）はメソッドの最後の引数として1つだけ定義できます。0個以上の引数を受け取ることができ、メソッド内では配列として扱われます。",
    chapter: "silver-flow",
    level: "silver",
  },
  {
    id: "silver-flow-q11",
    question: "メソッドのオーバーロードについて正しい記述はどれですか？",
    choices: [
      { label: "A", text: "戻り値の型だけが異なればオーバーロードできる" },
      { label: "B", text: "アクセス修飾子が異なればオーバーロードできる" },
      { label: "C", text: "引数の型・数・順序が異なればオーバーロードできる" },
      { label: "D", text: "異なるクラス間でのみオーバーロードできる" },
    ],
    correctLabel: "C",
    explanation:
      "オーバーロードは同名メソッドで引数の型・数・順序が異なる場合に成立します。戻り値の型やアクセス修飾子だけの違いではオーバーロードとして認識されず、コンパイルエラーになります。",
    chapter: "silver-flow",
    level: "silver",
  },
  {
    id: "silver-flow-q12",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "6" },
      { label: "B", text: "0" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時エラー" },
    ],
    correctLabel: "A",
    explanation:
      "可変長引数はメソッド内で配列として扱われます。sum(1, 2, 3)の呼び出しでnumbersは{1, 2, 3}となり、合計6が返されます。引数なしのsum()は0を返します。",
    code: "static int sum(int... numbers) {\n    int total = 0;\n    for (int n : numbers) total += n;\n    return total;\n}\nSystem.out.println(sum(1, 2, 3));",
    chapter: "silver-flow",
    level: "silver",
  },
  // ════════════════════════════════════════
  // Silver: クラス設計とOOP (silver-oop) 12問
  // ════════════════════════════════════════
  {
    id: "silver-oop-q01",
    question: "抽象クラスについて正しい記述はどれですか？",
    choices: [
      { label: "A", text: "インスタンスを生成できる" },
      { label: "B", text: "抽象メソッドを持たなくても抽象クラスにできる" },
      { label: "C", text: "コンストラクタを定義できない" },
      { label: "D", text: "finalキーワードと併用できる" },
    ],
    correctLabel: "B",
    explanation:
      "抽象クラスは抽象メソッドを持たなくてもabstractを付けて宣言できます。インスタンスは生成できません。コンストラクタは定義可能です。finalとabstractは矛盾するため併用できません。",
    chapter: "silver-oop",
    level: "silver",
  },
  {
    id: "silver-oop-q02",
    question: "インターフェースのdefaultメソッドについて正しいものはどれですか？",
    choices: [
      { label: "A", text: "abstractキーワードが必要" },
      { label: "B", text: "実装クラスでオーバーライドできない" },
      { label: "C", text: "メソッド本体を持ち、実装クラスでオーバーライド可能" },
      { label: "D", text: "staticメソッドと同じである" },
    ],
    correctLabel: "C",
    explanation:
      "defaultメソッドはJava 8で導入され、インターフェース内にメソッド本体を定義できます。実装クラスはオーバーライドすることも、そのまま使うこともできます。",
    chapter: "silver-oop",
    level: "silver",
  },
  {
    id: "silver-oop-q03",
    question: "ポリモーフィズム（多態性）の説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "同じクラスのフィールドに異なる名前をつけること" },
      { label: "B", text: "親クラス型の変数でサブクラスのインスタンスを参照し、実行時にサブクラスのメソッドが呼ばれること" },
      { label: "C", text: "メソッドの戻り値の型を変更すること" },
      { label: "D", text: "クラスを複数回インスタンス化すること" },
    ],
    correctLabel: "B",
    explanation:
      "ポリモーフィズムとは、親クラスやインターフェース型の変数でサブクラスのインスタンスを扱い、実行時に実際のオブジェクトのメソッドが呼ばれる仕組みです。",
    chapter: "silver-oop",
    level: "silver",
  },
  {
    id: "silver-oop-q04",
    question: "sealed classについて正しい記述はどれですか？",
    choices: [
      { label: "A", text: "Java 11で導入された" },
      { label: "B", text: "permitsで継承を許可するクラスを明示的に指定する" },
      { label: "C", text: "サブクラスにfinal、sealed、non-sealedの制約は不要" },
      { label: "D", text: "インターフェースには適用できない" },
    ],
    correctLabel: "B",
    explanation:
      "sealed classesはJava 17で正式導入され、permitsキーワードで継承可能なサブクラスを明示的に制限します。サブクラスはfinal、sealed、non-sealedのいずれかを宣言する必要があります。インターフェースにも適用可能です。",
    chapter: "silver-oop",
    level: "silver",
  },
  {
    id: "silver-oop-q05",
    question: "recordについて正しい記述はどれですか？",
    choices: [
      { label: "A", text: "フィールドを後から追加できる" },
      { label: "B", text: "コンストラクタ、getter、equals、hashCode、toStringが自動生成される" },
      { label: "C", text: "継承が可能である" },
      { label: "D", text: "ミュータブルなデータクラスである" },
    ],
    correctLabel: "B",
    explanation:
      "record（Java 16+）はイミュータブルなデータキャリアクラスで、コンストラクタ、アクセサメソッド(x(), y()など)、equals、hashCode、toStringが自動生成されます。他のクラスを継承できませんが、インターフェースの実装は可能です。",
    chapter: "silver-oop",
    level: "silver",
  },
  {
    id: "silver-oop-q06",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "Animal" },
      { label: "B", text: "Cat" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時エラー" },
    ],
    correctLabel: "A",
    explanation:
      "フィールドへのアクセスは変数の宣言型で決まります（静的バインディング）。aの宣言型はAnimalなので、a.typeはAnimalクラスのtype=\"Animal\"を参照します。メソッド呼び出しは実際のオブジェクト型で決まる点と異なります。",
    code: "class Animal { String type = \"Animal\"; }\nclass Cat extends Animal { String type = \"Cat\"; }\nAnimal a = new Cat();\nSystem.out.println(a.type);",
    chapter: "silver-oop",
    level: "silver",
  },
  {
    id: "silver-oop-q07",
    question: "ダウンキャストについて正しい記述はどれですか？",
    choices: [
      { label: "A", text: "暗黙的に行われる" },
      { label: "B", text: "明示的なキャストが必要で、型が合わないとClassCastExceptionが発生する" },
      { label: "C", text: "コンパイル時に必ずエラーになる" },
      { label: "D", text: "プリミティブ型でのみ使用できる" },
    ],
    correctLabel: "B",
    explanation:
      "ダウンキャスト（親型→子型）は明示的なキャスト演算子が必要です。実行時に実際のオブジェクトの型が一致しない場合、ClassCastExceptionが発生します。instanceofで事前にチェックするのが安全です。",
    chapter: "silver-oop",
    level: "silver",
  },
  {
    id: "silver-oop-q08",
    question: "インターフェースのstaticメソッドについて正しい記述はどれですか？",
    choices: [
      { label: "A", text: "実装クラスからインターフェース名を省略して呼び出せる" },
      { label: "B", text: "インターフェース名.メソッド名()で呼び出す必要がある" },
      { label: "C", text: "オーバーライドできる" },
      { label: "D", text: "Java 7から使用可能" },
    ],
    correctLabel: "B",
    explanation:
      "インターフェースのstaticメソッドはインターフェース名.メソッド名()で呼び出す必要があり、実装クラスに継承されません。オーバーライドもできません。Java 8から導入されました。",
    chapter: "silver-oop",
    level: "silver",
  },
  {
    id: "silver-oop-q09",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "Point[x=3, y=4]" },
      { label: "B", text: "Point(3, 4)" },
      { label: "C", text: "3, 4" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "A",
    explanation:
      "recordは自動的にtoString()を生成します。生成されるtoString()はクラス名[フィールド名=値, ...]の形式です。Point[x=3, y=4]が出力されます。",
    code: "record Point(int x, int y) {}\nPoint p = new Point(3, 4);\nSystem.out.println(p);",
    chapter: "silver-oop",
    level: "silver",
  },
  {
    id: "silver-oop-q10",
    question: "次のコードでコンパイルエラーになる箇所はどこですか？",
    choices: [
      { label: "A", text: "行1" },
      { label: "B", text: "行2" },
      { label: "C", text: "行3" },
      { label: "D", text: "エラーなし" },
    ],
    correctLabel: "B",
    explanation:
      "抽象クラスはインスタンス化できません。new Shape()はコンパイルエラーになります。抽象クラスは具象サブクラスを通じてのみインスタンス化できます。",
    code: "abstract class Shape { abstract double area(); }  // 行1\nShape s = new Shape();                              // 行2\nSystem.out.println(s.area());                       // 行3",
    chapter: "silver-oop",
    level: "silver",
  },
  {
    id: "silver-oop-q11",
    question: "non-sealed classの説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "sealedクラスのサブクラスで、さらなる継承を禁止する" },
      { label: "B", text: "sealedクラスのサブクラスで、誰でも自由に継承できるようにする" },
      { label: "C", text: "sealed修飾子を取り消す独立したキーワードである" },
      { label: "D", text: "abstractクラスと同じ意味である" },
    ],
    correctLabel: "B",
    explanation:
      "non-sealedはsealedクラスのサブクラスに付ける修飾子で、そのクラスを誰でも自由に継承できるようにします。finalは継承を禁止し、sealedはpermitsで指定したクラスのみ許可します。",
    chapter: "silver-oop",
    level: "silver",
  },
  {
    id: "silver-oop-q12",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "ClassCastException" },
      { label: "B", text: "にゃー" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "ゴロゴロ" },
    ],
    correctLabel: "D",
    explanation:
      "パターンマッチングinstanceofにより、aがCat型であればcat変数にキャストされます。aの実際の型はCatなので条件はtrueとなり、cat.purr()が呼ばれます。",
    code: "class Animal { void sound() { System.out.println(\"...\"); } }\nclass Cat extends Animal {\n    void purr() { System.out.println(\"ゴロゴロ\"); }\n}\nAnimal a = new Cat();\nif (a instanceof Cat cat) {\n    cat.purr();\n}",
    chapter: "silver-oop",
    level: "silver",
  },
  // ════════════════════════════════════════
  // Silver: 例外処理 (silver-exception) 12問
  // ════════════════════════════════════════
  {
    id: "silver-exception-q01",
    question: "チェック例外はどれですか？",
    choices: [
      { label: "A", text: "NullPointerException" },
      { label: "B", text: "IOException" },
      { label: "C", text: "ArrayIndexOutOfBoundsException" },
      { label: "D", text: "ClassCastException" },
    ],
    correctLabel: "B",
    explanation:
      "IOExceptionはチェック例外（検査例外）で、try-catchまたはthrows宣言が必要です。他の3つはRuntimeExceptionのサブクラスで、非チェック例外です。",
    chapter: "silver-exception",
    level: "silver",
  },
  {
    id: "silver-exception-q02",
    question: "try-with-resources文について正しい記述はどれですか？",
    choices: [
      { label: "A", text: "catchブロックは必須である" },
      { label: "B", text: "AutoCloseableを実装したリソースを自動的に閉じる" },
      { label: "C", text: "finallyブロック内でリソースが閉じられる" },
      { label: "D", text: "Java 6から使用可能" },
    ],
    correctLabel: "B",
    explanation:
      "try-with-resources文はJava 7で導入され、AutoCloseable（またはCloseable）を実装したリソースをtryブロック終了時に自動的にclose()します。catchやfinallyは省略可能です。",
    chapter: "silver-exception",
    level: "silver",
  },
  {
    id: "silver-exception-q03",
    question: "例外の階層について正しい記述はどれですか？",
    choices: [
      { label: "A", text: "ErrorはExceptionのサブクラスである" },
      { label: "B", text: "RuntimeExceptionはExceptionのサブクラスである" },
      { label: "C", text: "ExceptionはErrorのサブクラスである" },
      { label: "D", text: "ThrowableはExceptionのサブクラスである" },
    ],
    correctLabel: "B",
    explanation:
      "例外の階層はThrowable→Exception→RuntimeExceptionです。ErrorはThrowableの直接のサブクラスでExceptionとは別の階層です。すべての例外とエラーはThrowableを頂点とします。",
    chapter: "silver-exception",
    level: "silver",
  },
  {
    id: "silver-exception-q04",
    question: "マルチキャッチについて正しい記述はどれですか？",
    choices: [
      { label: "A", text: "継承関係のある例外を同じcatchに書ける" },
      { label: "B", text: "マルチキャッチの変数に新しい例外を代入できる" },
      { label: "C", text: "マルチキャッチの変数は暗黙的にfinalである" },
      { label: "D", text: "3つ以上の例外を指定できない" },
    ],
    correctLabel: "C",
    explanation:
      "マルチキャッチ(catch(IOException | SQLException e))の変数eは暗黙的にfinalです。継承関係のある例外は同じマルチキャッチに書けません。3つ以上の例外も指定可能です。",
    chapter: "silver-exception",
    level: "silver",
  },
  {
    id: "silver-exception-q05",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "try finally" },
      { label: "B", text: "try catch finally" },
      { label: "C", text: "try" },
      { label: "D", text: "finally" },
    ],
    correctLabel: "A",
    explanation:
      "例外が発生しないのでcatchブロックは実行されません。finallyブロックは例外の有無に関わらず必ず実行されます。結果は「try finally」です。",
    code: "try {\n    System.out.print(\"try \");\n} catch (Exception e) {\n    System.out.print(\"catch \");\n} finally {\n    System.out.print(\"finally\");\n}",
    chapter: "silver-exception",
    level: "silver",
  },
  {
    id: "silver-exception-q06",
    question: "try-with-resourcesで複数リソースを宣言した場合、closeの順序はどうなりますか？",
    choices: [
      { label: "A", text: "宣言順にcloseされる" },
      { label: "B", text: "宣言と逆順にcloseされる" },
      { label: "C", text: "closeの順序は保証されない" },
      { label: "D", text: "最初のリソースのみcloseされる" },
    ],
    correctLabel: "B",
    explanation:
      "try-with-resourcesで複数のリソースを宣言した場合、宣言と逆順（後から宣言したものが先）にclose()が呼ばれます。これはスタック的な動作で、後入れ先出しです。",
    chapter: "silver-exception",
    level: "silver",
  },
  {
    id: "silver-exception-q07",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "try A B" },
      { label: "B", text: "try B A" },
      { label: "C", text: "A B try" },
      { label: "D", text: "try A" },
    ],
    correctLabel: "B",
    explanation:
      "try-with-resourcesではリソースが宣言の逆順でcloseされます。aが先に宣言、bが後に宣言されているため、bが先にclose(B)、次にaがclose(A)されます。",
    code: "class R implements AutoCloseable {\n    String name;\n    R(String n) { name = n; }\n    public void close() { System.out.print(name + \" \"); }\n}\ntry (var a = new R(\"A\"); var b = new R(\"B\")) {\n    System.out.print(\"try \");\n}",
    chapter: "silver-exception",
    level: "silver",
  },
  {
    id: "silver-exception-q08",
    question: "オーバーライドの例外ルールについて正しいものはどれですか？",
    choices: [
      { label: "A", text: "サブクラスはスーパークラスより広い例外をスローできる" },
      { label: "B", text: "サブクラスは例外をスローしないことができる" },
      { label: "C", text: "サブクラスは無関係なチェック例外をスローできる" },
      { label: "D", text: "スーパークラスにthrows宣言がなくても例外を追加できる" },
    ],
    correctLabel: "B",
    explanation:
      "オーバーライドでは、サブクラスのメソッドはスーパークラスと同じかより狭い（サブクラスの）チェック例外のみスロー可能です。例外をスローしないことも可能です。無関係な例外や広い例外はコンパイルエラーになります。",
    chapter: "silver-exception",
    level: "silver",
  },
  {
    id: "silver-exception-q09",
    question: "カスタム例外でRuntimeExceptionを継承した場合、その例外はどうなりますか？",
    choices: [
      { label: "A", text: "チェック例外になる" },
      { label: "B", text: "非チェック例外になる" },
      { label: "C", text: "Errorになる" },
      { label: "D", text: "catchできなくなる" },
    ],
    correctLabel: "B",
    explanation:
      "RuntimeExceptionを継承したカスタム例外は非チェック例外（実行時例外）になります。try-catchやthrows宣言は任意です。Exceptionを直接継承するとチェック例外になります。",
    chapter: "silver-exception",
    level: "silver",
  },
  {
    id: "silver-exception-q10",
    question: "finallyブロックについて正しい記述はどれですか？",
    choices: [
      { label: "A", text: "catchブロックで例外を再スローした場合、finallyは実行されない" },
      { label: "B", text: "System.exit()が呼ばれた場合もfinallyは実行される" },
      { label: "C", text: "tryブロックにreturn文がある場合もfinallyは実行される" },
      { label: "D", text: "finallyブロック内でreturnすると、tryのreturnが優先される" },
    ],
    correctLabel: "C",
    explanation:
      "finallyブロックはほぼ必ず実行されます。tryブロックのreturn文があっても、returnが実行される前にfinallyが実行されます。ただしSystem.exit()が呼ばれた場合はfinallyは実行されません。",
    chapter: "silver-exception",
    level: "silver",
  },
  {
    id: "silver-exception-q11",
    question: "次のコードでコンパイルエラーになる行はどれですか？",
    choices: [
      { label: "A", text: "行1" },
      { label: "B", text: "行2" },
      { label: "C", text: "行3" },
      { label: "D", text: "エラーなし" },
    ],
    correctLabel: "B",
    explanation:
      "FileNotFoundExceptionはIOExceptionのサブクラスなので、同じマルチキャッチに書くとコンパイルエラーになります。親子関係のある例外は個別のcatchブロックで処理するか、親の例外のみcatchします。",
    code: "try {\n    throw new java.io.FileNotFoundException();  // 行1\n} catch (java.io.FileNotFoundException | java.io.IOException e) {  // 行2\n    System.out.println(e.getMessage());  // 行3\n}",
    chapter: "silver-exception",
    level: "silver",
  },
  {
    id: "silver-exception-q12",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "1" },
      { label: "B", text: "2" },
      { label: "C", text: "3" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "A",
    explanation:
      "tryブロックでreturn 1が実行される前にfinallyブロックが実行されます。finallyでreturnしていないため、tryのreturn 1が返されます。finallyにreturn文を書くとそちらが優先されますが、それは非推奨です。",
    code: "static int test() {\n    try {\n        return 1;\n    } catch (Exception e) {\n        return 2;\n    } finally {\n        System.out.print(\"\");\n    }\n}\nSystem.out.println(test());",
    chapter: "silver-exception",
    level: "silver",
  },
  // ════════════════════════════════════════
  // Silver: 主要API (silver-api) 12問
  // ════════════════════════════════════════
  {
    id: "silver-api-q01",
    question: "StringBuilderの特徴として正しいものはどれですか？",
    choices: [
      { label: "A", text: "イミュータブル（不変）である" },
      { label: "B", text: "ミュータブル（可変）で、文字列を効率的に組み立てられる" },
      { label: "C", text: "スレッドセーフである" },
      { label: "D", text: "Stringクラスを継承している" },
    ],
    correctLabel: "B",
    explanation:
      "StringBuilderはミュータブルで、append()やinsert()などのメソッドで自身を変更できます。スレッドセーフではありません（スレッドセーフが必要ならStringBufferを使用）。Stringとは独立したクラスです。",
    chapter: "silver-api",
    level: "silver",
  },
  {
    id: "silver-api-q02",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "fed-cba" },
      { label: "B", text: "abc-def" },
      { label: "C", text: "abcdef" },
      { label: "D", text: "fedcba" },
    ],
    correctLabel: "A",
    explanation:
      "StringBuilder(\"abc\").append(\"def\")→\"abcdef\"、insert(3, \"-\")→\"abc-def\"、reverse()→\"fed-cba\"。StringBuilderのメソッドチェーンは左から順に実行されます。",
    code: "String result = new StringBuilder(\"abc\")\n    .append(\"def\")\n    .insert(3, \"-\")\n    .reverse()\n    .toString();\nSystem.out.println(result);",
    chapter: "silver-api",
    level: "silver",
  },
  {
    id: "silver-api-q03",
    question: "LocalDateについて正しい記述はどれですか？",
    choices: [
      { label: "A", text: "newキーワードでインスタンスを生成する" },
      { label: "B", text: "ミュータブルで操作すると自身が変更される" },
      { label: "C", text: "ofメソッドまたはnowメソッドで生成するイミュータブルなクラス" },
      { label: "D", text: "時刻情報も含む" },
    ],
    correctLabel: "C",
    explanation:
      "LocalDateはイミュータブルなクラスで、LocalDate.of()やLocalDate.now()で生成します。newは使えません。日付のみで時刻は含みません。操作メソッドは新しいオブジェクトを返します。",
    chapter: "silver-api",
    level: "silver",
  },
  {
    id: "silver-api-q04",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "2025-03-22" },
      { label: "B", text: "2025-03-15" },
      { label: "C", text: "2025-03-08" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "B",
    explanation:
      "LocalDateはイミュータブルです。plusWeeks(1)は新しいLocalDateオブジェクトを返しますが、その戻り値を変数に代入していないため、元のdateは変わりません。date = date.plusWeeks(1);と書く必要があります。",
    code: "LocalDate date = LocalDate.of(2025, 3, 15);\ndate.plusWeeks(1);\nSystem.out.println(date);",
    chapter: "silver-api",
    level: "silver",
  },
  {
    id: "silver-api-q05",
    question: "PeriodとDurationの違いについて正しい記述はどれですか？",
    choices: [
      { label: "A", text: "Periodは時刻ベース、Durationは日付ベース" },
      { label: "B", text: "Periodは日付ベース（年月日）、Durationは時刻ベース（時分秒）" },
      { label: "C", text: "どちらも同じ用途で使える" },
      { label: "D", text: "Periodは廃止されDurationに統合された" },
    ],
    correctLabel: "B",
    explanation:
      "Periodは日付ベースの期間（年、月、日）を表し、Durationは時刻ベースの期間（時、分、秒、ナノ秒）を表します。Periodは LocalDateに、DurationはLocalTimeやLocalDateTimeに適用します。",
    chapter: "silver-api",
    level: "silver",
  },
  {
    id: "silver-api-q06",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "Hello Java" },
      { label: "B", text: "  Hello Java  " },
      { label: "C", text: "Hello Java  " },
      { label: "D", text: "  Hello Java" },
    ],
    correctLabel: "A",
    explanation:
      "strip()はJava 11で導入されたメソッドで、文字列の前後の空白文字を除去します。trim()と似ていますが、stripはUnicodeの空白文字も正しく処理します。",
    code: "String s = \"  Hello Java  \";\nSystem.out.println(s.strip());",
    chapter: "silver-api",
    level: "silver",
  },
  {
    id: "silver-api-q07",
    question: "Arrays.asList()の戻り値について正しい記述はどれですか？",
    choices: [
      { label: "A", text: "要素の追加と削除が自由にできる" },
      { label: "B", text: "要素の変更はできるが、サイズの変更はできない" },
      { label: "C", text: "完全にイミュータブルなリストである" },
      { label: "D", text: "元の配列とは独立したコピーを返す" },
    ],
    correctLabel: "B",
    explanation:
      "Arrays.asList()は固定サイズのリストを返します。set()で要素の変更はできますが、add()やremove()はUnsupportedOperationExceptionが発生します。また元の配列とリストは連動します。",
    chapter: "silver-api",
    level: "silver",
  },
  {
    id: "silver-api-q08",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "true" },
      { label: "B", text: "false" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時エラー" },
    ],
    correctLabel: "A",
    explanation:
      "String.intern()はString定数プール内の参照を返します。文字列リテラル\"hello\"もプール内にあるため、a == dはtrueになります。intern()はプール内に同じ文字列があればその参照を返します。",
    code: "String a = \"hello\";\nString c = new String(\"hello\");\nString d = c.intern();\nSystem.out.println(a == d);",
    chapter: "silver-api",
    level: "silver",
  },
  {
    id: "silver-api-q09",
    question: "DateTimeFormatterの使い方として正しいものはどれですか？",
    choices: [
      { label: "A", text: "new DateTimeFormatter(\"yyyy/MM/dd\")で生成する" },
      { label: "B", text: "DateTimeFormatter.ofPattern(\"yyyy/MM/dd\")で生成する" },
      { label: "C", text: "SimpleDateFormatと同じ使い方をする" },
      { label: "D", text: "ミュータブルなクラスである" },
    ],
    correctLabel: "B",
    explanation:
      "DateTimeFormatterはofPatternメソッドで生成するイミュータブルなクラスです。スレッドセーフでSimpleDateFormatの代替として推奨されます。date.format(formatter)で文字列に変換できます。",
    chapter: "silver-api",
    level: "silver",
  },
  {
    id: "silver-api-q10",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "[1, 3, 5, 8, 9]" },
      { label: "B", text: "[9, 8, 5, 3, 1]" },
      { label: "C", text: "[5, 3, 8, 1, 9]" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "A",
    explanation:
      "Arrays.sort()は配列を昇順（小さい順）にソートします。元の配列が直接変更されます。降順にソートするにはComparator.reverseOrder()を使用します（参照型の配列のみ）。",
    code: "int[] nums = {5, 3, 8, 1, 9};\njava.util.Arrays.sort(nums);\nSystem.out.println(java.util.Arrays.toString(nums));",
    chapter: "silver-api",
    level: "silver",
  },
  {
    id: "silver-api-q11",
    question: "HashMapについて正しい記述はどれですか？",
    choices: [
      { label: "A", text: "キーの順序が保証される" },
      { label: "B", text: "キーにnullを使用できない" },
      { label: "C", text: "キーにnullを1つだけ使用できる" },
      { label: "D", text: "スレッドセーフである" },
    ],
    correctLabel: "C",
    explanation:
      "HashMapはキーにnullを1つだけ持てます。順序は保証されません（順序が必要ならLinkedHashMap）。スレッドセーフではありません（スレッドセーフにはConcurrentHashMapを使用）。",
    chapter: "silver-api",
    level: "silver",
  },
  {
    id: "silver-api-q12",
    question: "次のコードでUnsupportedOperationExceptionが発生するのはどれですか？",
    choices: [
      { label: "A", text: "list.get(0)" },
      { label: "B", text: "list.set(0, \"X\")" },
      { label: "C", text: "list.add(\"D\")" },
      { label: "D", text: "list.size()" },
    ],
    correctLabel: "C",
    explanation:
      "List.of()で作成されたリストは完全にイミュータブルです。要素の取得やサイズ確認はできますが、add()、set()、remove()などの変更操作はすべてUnsupportedOperationExceptionが発生します。",
    code: "var list = List.of(\"A\", \"B\", \"C\");",
    chapter: "silver-api",
    level: "silver",
  },
  // ════════════════════════════════════════
  // Silver: ラムダ式とモジュール (silver-lambda) 12問
  // ════════════════════════════════════════
  {
    id: "silver-lambda-q01",
    question: "ラムダ式で使用できる関数型インターフェースの条件はどれですか？",
    choices: [
      { label: "A", text: "abstractメソッドを2つ以上持つ" },
      { label: "B", text: "abstractメソッドを1つだけ持つ" },
      { label: "C", text: "defaultメソッドを持たない" },
      { label: "D", text: "@FunctionalInterfaceアノテーションが必須" },
    ],
    correctLabel: "B",
    explanation:
      "関数型インターフェースはabstractメソッドを1つだけ持つインターフェースです。defaultメソッドやstaticメソッドは複数持てます。@FunctionalInterfaceは推奨されますが必須ではありません。",
    chapter: "silver-lambda",
    level: "silver",
  },
  {
    id: "silver-lambda-q02",
    question: "次のラムダ式と等価な関数型インターフェースはどれですか？\n(x, y) -> x + y",
    choices: [
      { label: "A", text: "BiFunction<Integer,Integer,Integer>" },
      { label: "B", text: "Consumer<Integer>" },
      { label: "C", text: "Supplier<Integer>" },
      { label: "D", text: "Predicate<Integer>" },
    ],
    correctLabel: "A",
    explanation:
      "2つの引数を受け取り結果を返すラムダ式はBiFunctionに対応します。Consumerは引数を受け取り戻り値なし、Supplierは引数なしで結果を返す、Predicateはbooleanを返すインターフェースです。",
    chapter: "silver-lambda",
    level: "silver",
  },
  {
    id: "silver-lambda-q03",
    question: "Predicate<T>の抽象メソッド名は何ですか？",
    choices: [
      { label: "A", text: "apply()" },
      { label: "B", text: "accept()" },
      { label: "C", text: "test()" },
      { label: "D", text: "get()" },
    ],
    correctLabel: "C",
    explanation:
      "Predicate<T>の抽象メソッドはtest(T t)でboolean値を返します。Function<T,R>はapply()、Consumer<T>はaccept()、Supplier<T>はget()です。これらのメソッド名は試験で頻出です。",
    chapter: "silver-lambda",
    level: "silver",
  },
  {
    id: "silver-lambda-q04",
    question: "ラムダ式で外部のローカル変数を参照する条件は何ですか？",
    choices: [
      { label: "A", text: "変数がstaticであること" },
      { label: "B", text: "変数がfinalまたは実質的final（effectively final）であること" },
      { label: "C", text: "変数がpublicであること" },
      { label: "D", text: "特に条件はない" },
    ],
    correctLabel: "B",
    explanation:
      "ラムダ式から外部のローカル変数を参照するには、その変数がfinalまたは実質的final（宣言後に値が変更されない）である必要があります。値が変更される変数はラムダ内で参照できません。",
    chapter: "silver-lambda",
    level: "silver",
  },
  {
    id: "silver-lambda-q05",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "true" },
      { label: "B", text: "false" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時エラー" },
    ],
    correctLabel: "B",
    explanation:
      "isLong.test(\"Java\")は\"Java\".length() > 5を評価します。\"Java\"の長さは4で5以下なのでfalseが返されます。Predicateのtest()メソッドはboolean値を返します。",
    code: "Predicate<String> isLong = s -> s.length() > 5;\nSystem.out.println(isLong.test(\"Java\"));",
    chapter: "silver-lambda",
    level: "silver",
  },
  {
    id: "silver-lambda-q06",
    question: "Function<T,R>のandThenメソッドについて正しい記述はどれですか？",
    choices: [
      { label: "A", text: "引数の関数を先に実行し、自分を後に実行する" },
      { label: "B", text: "自分を先に実行し、引数の関数を後に実行する" },
      { label: "C", text: "2つの関数を並列に実行する" },
      { label: "D", text: "自分の結果を無視して引数の関数の結果を返す" },
    ],
    correctLabel: "B",
    explanation:
      "andThenは自分のapply()を先に実行し、その結果を引数の関数に渡して実行します。f.andThen(g).apply(x)はg(f(x))と同等です。逆にcomposeはg.compose(f).apply(x)=g(f(x))です。",
    chapter: "silver-lambda",
    level: "silver",
  },
  {
    id: "silver-lambda-q07",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "20" },
      { label: "B", text: "15" },
      { label: "C", text: "30" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "A",
    explanation:
      "doubleIt.andThen(addTen)は、まずdoubleIt(5*2=10)を実行し、その結果にaddTen(10+10=20)を実行します。結果は20です。",
    code: "Function<Integer, Integer> doubleIt = x -> x * 2;\nFunction<Integer, Integer> addTen = x -> x + 10;\nSystem.out.println(doubleIt.andThen(addTen).apply(5));",
    chapter: "silver-lambda",
    level: "silver",
  },
  {
    id: "silver-lambda-q08",
    question: "Consumer<T>の説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "引数を受け取り結果を返す" },
      { label: "B", text: "引数なしで結果を返す" },
      { label: "C", text: "引数を受け取り何も返さない（void）" },
      { label: "D", text: "引数を受け取りbooleanを返す" },
    ],
    correctLabel: "C",
    explanation:
      "Consumer<T>は引数Tを受け取り戻り値なし（void）のaccept(T t)メソッドを持つ関数型インターフェースです。副作用のある処理（出力やログなど）に使われます。",
    chapter: "silver-lambda",
    level: "silver",
  },
  {
    id: "silver-lambda-q09",
    question: "メソッド参照 String::length の等価なラムダ式はどれですか？",
    choices: [
      { label: "A", text: "() -> String.length()" },
      { label: "B", text: "s -> s.length()" },
      { label: "C", text: "(s, t) -> s.length()" },
      { label: "D", text: "s -> String.length(s)" },
    ],
    correctLabel: "B",
    explanation:
      "String::lengthはインスタンスメソッド参照で、s -> s.length()と等価です。第1引数がメソッドのレシーバとなります。Function<String, Integer>型として使用できます。",
    chapter: "silver-lambda",
    level: "silver",
  },
  {
    id: "silver-lambda-q10",
    question: "モジュールシステム（JPMS）について正しい記述はどれですか？",
    choices: [
      { label: "A", text: "Java 8で導入された" },
      { label: "B", text: "module-info.javaで依存関係と公開パッケージを定義する" },
      { label: "C", text: "すべてのパッケージはデフォルトで外部に公開される" },
      { label: "D", text: "java.baseモジュールは明示的にrequiresする必要がある" },
    ],
    correctLabel: "B",
    explanation:
      "JPMS（Java Platform Module System）はJava 9で導入されました。module-info.javaでrequires（依存モジュール）とexports（公開パッケージ）を定義します。java.baseは自動的にrequireされます。",
    chapter: "silver-lambda",
    level: "silver",
  },
  {
    id: "silver-lambda-q11",
    question: "Supplier<T>の説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "引数を1つ受け取り結果を返す" },
      { label: "B", text: "引数なしで結果Tを返すget()メソッドを持つ" },
      { label: "C", text: "2つの引数を受け取り結果を返す" },
      { label: "D", text: "引数を受け取りbooleanを返す" },
    ],
    correctLabel: "B",
    explanation:
      "Supplier<T>は引数なしで結果Tを返すget()メソッドを持つ関数型インターフェースです。ファクトリメソッドや遅延評価のパターンでよく使用されます。",
    chapter: "silver-lambda",
    level: "silver",
  },
  {
    id: "silver-lambda-q12",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "コンパイルエラー" },
      { label: "B", text: "Hello, Java(100)" },
      { label: "C", text: "Java(100)" },
      { label: "D", text: "Hello, Java" },
    ],
    correctLabel: "A",
    explanation:
      "baseが後で変更されている（base = 200）ため、ラムダ式内でbaseを参照できません。ラムダ式から参照するローカル変数はfinalまたは実質的finalである必要があります。",
    code: "int base = 100;\nFunction<String, String> f = name -> name + \"(\" + base + \")\";\nbase = 200;\nSystem.out.println(\"Hello, \" + f.apply(\"Java\"));",
    chapter: "silver-lambda",
    level: "silver",
  },
  // ════════════════════════════════════════
  // Silver: 試験対策 (silver-exam) 12問
  // ════════════════════════════════════════
  {
    id: "silver-exam-q01",
    question: "Javaのアクセス修飾子でアクセス範囲が広い順に並べたものはどれですか？",
    choices: [
      { label: "A", text: "public > protected > default > private" },
      { label: "B", text: "public > default > protected > private" },
      { label: "C", text: "protected > public > default > private" },
      { label: "D", text: "public > protected > private > default" },
    ],
    correctLabel: "A",
    explanation:
      "アクセス範囲は public（すべて） > protected（同パッケージ+サブクラス） > default/パッケージプライベート（同パッケージ） > private（同クラスのみ）の順です。",
    chapter: "silver-exam",
    level: "silver",
  },
  {
    id: "silver-exam-q02",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "[A, C]" },
      { label: "B", text: "[A, B, C]" },
      { label: "C", text: "[a, c]" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "A",
    explanation:
      "removeIf(s -> s.equals(\"b\"))で\"b\"が削除され[a, c]になります。replaceAll(String::toUpperCase)で各要素が大文字に変換され[A, C]になります。",
    code: "var list = new ArrayList<>(List.of(\"a\", \"b\", \"c\"));\nlist.removeIf(s -> s.equals(\"b\"));\nlist.replaceAll(String::toUpperCase);\nSystem.out.println(list);",
    chapter: "silver-exam",
    level: "silver",
  },
  {
    id: "silver-exam-q03",
    question: "final変数について正しい記述はどれですか？",
    choices: [
      { label: "A", text: "final List<String>のリストには要素を追加できない" },
      { label: "B", text: "final変数は参照の再代入ができないが、参照先の変更は可能" },
      { label: "C", text: "final変数はstaticと併用できない" },
      { label: "D", text: "ローカル変数にはfinalを付けられない" },
    ],
    correctLabel: "B",
    explanation:
      "finalは変数への再代入を禁止するだけで、参照先のオブジェクト自体の変更は妨げません。final List<String> list = new ArrayList<>();でlist.add(\"OK\")は可能ですが、list = new ArrayList<>();はエラーです。",
    chapter: "silver-exam",
    level: "silver",
  },
  {
    id: "silver-exam-q04",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "try B A" },
      { label: "B", text: "try A B" },
      { label: "C", text: "B A try" },
      { label: "D", text: "A B try" },
    ],
    correctLabel: "A",
    explanation:
      "tryブロックが先に実行され\"try \"が出力されます。その後try-with-resourcesのリソースが逆順でcloseされ、B→Aの順でcloseされます。",
    code: "class X implements AutoCloseable {\n    String n;\n    X(String n) { this.n = n; }\n    public void close() { System.out.print(n + \" \"); }\n}\ntry (var a = new X(\"A\"); var b = new X(\"B\")) {\n    System.out.print(\"try \");\n}",
    chapter: "silver-exam",
    level: "silver",
  },
  {
    id: "silver-exam-q05",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "hello" },
      { label: "B", text: "HELLO" },
      { label: "C", text: "Hello" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "A",
    explanation:
      "Stringはイミュータブルです。s.toUpperCase()は新しいStringを返しますが、戻り値を変数に代入していないためsは変わりません。s = s.toUpperCase()と書く必要があります。",
    code: "String s = \"hello\";\ns.toUpperCase();\nSystem.out.println(s);",
    chapter: "silver-exam",
    level: "silver",
  },
  {
    id: "silver-exam-q06",
    question: "次のvarの使用でコンパイルエラーにならないものはどれですか？",
    choices: [
      { label: "A", text: "var y;" },
      { label: "B", text: "var z = null;" },
      { label: "C", text: "var w = {1, 2, 3};" },
      { label: "D", text: "var arr = new int[]{1, 2, 3};" },
    ],
    correctLabel: "D",
    explanation:
      "var arr = new int[]{1,2,3};はint[]型と推論可能なので有効です。初期値なし、null初期化、配列初期化子({...})ではvarの型推論ができずコンパイルエラーになります。",
    chapter: "silver-exam",
    level: "silver",
  },
  {
    id: "silver-exam-q07",
    question: "switch式で値を返す場合にdefaultケースを省略できるのはどの場合ですか？",
    choices: [
      { label: "A", text: "int型のswitch式" },
      { label: "B", text: "enum型ですべての定数をcaseに記述した場合" },
      { label: "C", text: "String型のswitch式" },
      { label: "D", text: "defaultは常に省略できない" },
    ],
    correctLabel: "B",
    explanation:
      "switch式は値を返すためすべてのケースを網羅する必要があります。enum型ですべての定数をcaseに記述した場合のみdefaultを省略できます。int型やString型は値の範囲が無限なのでdefaultが必要です。",
    chapter: "silver-exam",
    level: "silver",
  },
  {
    id: "silver-exam-q08",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "2025年03月15日" },
      { label: "B", text: "2025/03/15" },
      { label: "C", text: "2025-03-15" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "A",
    explanation:
      "DateTimeFormatter.ofPattern(\"yyyy年MM月dd日\")で日付のフォーマットパターンを定義し、date.format(fmt)で文字列に変換します。yyyy=年4桁、MM=月2桁、dd=日2桁です。",
    code: "LocalDate date = LocalDate.of(2025, 3, 15);\nvar fmt = DateTimeFormatter.ofPattern(\"yyyy年MM月dd日\");\nSystem.out.println(date.format(fmt));",
    chapter: "silver-exam",
    level: "silver",
  },
  {
    id: "silver-exam-q09",
    question: "次のコードの結果はどうなりますか？",
    choices: [
      { label: "A", text: "コンパイルエラー" },
      { label: "B", text: "DateTimeExceptionが発生" },
      { label: "C", text: "2025-02-28が生成される" },
      { label: "D", text: "2025-03-02が生成される" },
    ],
    correctLabel: "B",
    explanation:
      "2025年2月30日は存在しない日付です。LocalDate.of()で不正な日付を指定するとDateTimeExceptionが発生します。自動的な日付調整は行われません。",
    code: "LocalDate date = LocalDate.of(2025, 2, 30);",
    chapter: "silver-exam",
    level: "silver",
  },
  {
    id: "silver-exam-q10",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "4" },
      { label: "B", text: "5" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時エラー" },
    ],
    correctLabel: "A",
    explanation:
      "String::lengthはメソッド参照で、s -> s.length()と等価です。toLen.apply(\"Java\")は\"Java\".length()を呼び出し4を返します。",
    code: "Function<String, Integer> toLen = String::length;\nSystem.out.println(toLen.apply(\"Java\"));",
    chapter: "silver-exam",
    level: "silver",
  },
  {
    id: "silver-exam-q11",
    question: "requires transitiveの効果として正しいものはどれですか？",
    choices: [
      { label: "A", text: "モジュールの依存を実行時のみに制限する" },
      { label: "B", text: "依存先のモジュールをこのモジュールの利用者にも公開する" },
      { label: "C", text: "パッケージを指定したモジュールにのみ公開する" },
      { label: "D", text: "循環依存を許可する" },
    ],
    correctLabel: "B",
    explanation:
      "requires transitiveは推移的依存を宣言し、このモジュールに依存するモジュールにも間接的に依存先モジュールへのアクセスを許可します。ライブラリのAPI型が依存モジュールの型を含む場合に使います。",
    chapter: "silver-exam",
    level: "silver",
  },
  {
    id: "silver-exam-q12",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "true" },
      { label: "B", text: "false" },
      { label: "C", text: "コンパイルエラー" },
      { label: "D", text: "実行時エラー" },
    ],
    correctLabel: "A",
    explanation:
      "Predicate.and()は2つのPredicateの論理ANDを取ります。isLong.and(startsJ).test(\"JavaScript\")は長さ>5かつJで始まるかをテストし、両方trueなのでtrueを返します。",
    code: "Predicate<String> isLong = s -> s.length() > 5;\nPredicate<String> startsJ = s -> s.startsWith(\"J\");\nSystem.out.println(isLong.and(startsJ).test(\"JavaScript\"));",
    chapter: "silver-exam",
    level: "silver",
  },
  // ════════════════════════════════════════
  // Gold: ジェネリクスとコレクション (gold-generics) 12問
  // ════════════════════════════════════════
  {
    id: "gold-generics-q01",
    question: "ジェネリクスの型消去（Type Erasure）について正しい記述はどれですか？",
    choices: [
      { label: "A", text: "実行時に型パラメータの情報が保持される" },
      { label: "B", text: "コンパイル時に型チェックが行われ、実行時には型パラメータの情報が消去される" },
      { label: "C", text: "型パラメータにプリミティブ型を使用できる" },
      { label: "D", text: "ジェネリクスの型情報はリフレクションで完全に取得できる" },
    ],
    correctLabel: "B",
    explanation:
      "Javaのジェネリクスは型消去方式を採用しており、コンパイル時に型安全性をチェックした後、実行時には型パラメータ情報は消去されます。プリミティブ型は使用できません。",
    chapter: "gold-generics",
    level: "gold",
  },
  {
    id: "gold-generics-q02",
    question: "ワイルドカード型で正しい記述はどれですか？",
    choices: [
      { label: "A", text: "List<?>は任意の型のListを受け取れるが要素の追加はできない（nullを除く）" },
      { label: "B", text: "List<? extends Number>にInteger要素を追加できる" },
      { label: "C", text: "List<? super Integer>からInteger型として要素を取得できる" },
      { label: "D", text: "List<Object>はList<String>のスーパータイプである" },
    ],
    correctLabel: "A",
    explanation:
      "List<?>は非境界ワイルドカードで、任意の型のListを受け取れますがnull以外の要素を追加できません。List<? extends T>は読み取り専用、List<? super T>は書き込み用です。",
    chapter: "gold-generics",
    level: "gold",
  },
  {
    id: "gold-generics-q03",
    question: "境界型パラメータの宣言として正しいものはどれですか？",
    choices: [
      { label: "A", text: "<T super Number>" },
      { label: "B", text: "<T extends Number & Comparable<T>>" },
      { label: "C", text: "<T implements Comparable<T>>" },
      { label: "D", text: "<T extends Number, Comparable<T>>" },
    ],
    correctLabel: "B",
    explanation:
      "境界型パラメータはextendsキーワードで上限を指定します。複数の境界は&で繋ぎます。superはワイルドカードでのみ使用可能で、型パラメータ宣言では使えません。implementsは使えず、extendsで統一されます。",
    chapter: "gold-generics",
    level: "gold",
  },
  {
    id: "gold-generics-q04",
    question: "List<? super Integer>に対してできる操作はどれですか？",
    choices: [
      { label: "A", text: "Number型として要素を取得できる" },
      { label: "B", text: "Integer型の要素を追加できる" },
      { label: "C", text: "String型の要素を追加できる" },
      { label: "D", text: "Double型の要素を追加できる" },
    ],
    correctLabel: "B",
    explanation:
      "List<? super Integer>はIntegerのスーパータイプ（Integer, Number, Object）のリストです。Integer（およびそのサブタイプ）の要素を安全に追加できますが、取得する際はObject型としてしか取得できません（PECS原則のConsumer）。",
    chapter: "gold-generics",
    level: "gold",
  },
  {
    id: "gold-generics-q05",
    question: "Collection frameworkでSetの特徴として正しいものはどれですか？",
    choices: [
      { label: "A", text: "重複要素を許可する" },
      { label: "B", text: "要素の順序が挿入順で保証される" },
      { label: "C", text: "重複要素を許可せず、nullを1つだけ格納できる（HashSet）" },
      { label: "D", text: "インデックスで要素にアクセスできる" },
    ],
    correctLabel: "C",
    explanation:
      "Setは重複要素を許可しないコレクションです。HashSetは順序を保証しませんがnullを1つ格納可能です。TreeSetはソート順、LinkedHashSetは挿入順を保証します。インデックスアクセスはできません。",
    chapter: "gold-generics",
    level: "gold",
  },
  {
    id: "gold-generics-q06",
    question: "Dequeインターフェースの説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "先入れ先出し（FIFO）のみサポートする" },
      { label: "B", text: "両端からの挿入・削除ができ、スタックとキューの両方として使える" },
      { label: "C", text: "ランダムアクセスが高速である" },
      { label: "D", text: "キーと値のペアを格納する" },
    ],
    correctLabel: "B",
    explanation:
      "Deque（Double-Ended Queue）は両端キューで、先頭と末尾の両方から挿入・削除ができます。FIFO（キュー）としてもLIFO（スタック）としても使えます。ArrayDequeやLinkedListが実装クラスです。",
    chapter: "gold-generics",
    level: "gold",
  },
  {
    id: "gold-generics-q07",
    question: "TreeMapの特徴として正しいものはどれですか？",
    choices: [
      { label: "A", text: "キーの挿入順序が保証される" },
      { label: "B", text: "キーが自然順序またはComparatorで定義された順序でソートされる" },
      { label: "C", text: "キーにnullを格納できる" },
      { label: "D", text: "HashMapより高速にアクセスできる" },
    ],
    correctLabel: "B",
    explanation:
      "TreeMapはキーが自然順序（Comparable）またはComparatorで指定された順序でソートされます。キーにnullは格納できません（NullPointerException）。操作の計算量はO(log n)でHashMapのO(1)より遅いです。",
    chapter: "gold-generics",
    level: "gold",
  },
  {
    id: "gold-generics-q08",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "[1, 2, 3]" },
      { label: "B", text: "[3, 2, 1]" },
      { label: "C", text: "[1, 2, 3, 2]" },
      { label: "D", text: "[1, 2, 3, 2, 1]" },
    ],
    correctLabel: "A",
    explanation:
      "HashSetは重複要素を許可しません。add(2)とadd(1)は既に存在する要素なので追加されません。結果は{1, 2, 3}ですが、HashSetの順序は不定です。ただしこの場合、数値の自然順序で[1, 2, 3]と表示されることが多いです。",
    code: "Set<Integer> set = new TreeSet<>();\nset.add(1);\nset.add(2);\nset.add(3);\nset.add(2);\nset.add(1);\nSystem.out.println(set);",
    chapter: "gold-generics",
    level: "gold",
  },
  {
    id: "gold-generics-q09",
    question: "PECS原則について正しい記述はどれですか？",
    choices: [
      { label: "A", text: "Producer Extends, Consumer Superの略である" },
      { label: "B", text: "Producer Super, Consumer Extendsの略である" },
      { label: "C", text: "Protected Extension, Controlled Subclassの略である" },
      { label: "D", text: "Java 17で導入された新しい概念である" },
    ],
    correctLabel: "A",
    explanation:
      "PECS（Producer Extends, Consumer Super）はワイルドカードの使い分け指針です。データを取り出す（produce）なら<? extends T>、データを追加する（consume）なら<? super T>を使います。",
    chapter: "gold-generics",
    level: "gold",
  },
  {
    id: "gold-generics-q10",
    question: "次のコードでコンパイルエラーになる行はどれですか？",
    choices: [
      { label: "A", text: "行1" },
      { label: "B", text: "行2" },
      { label: "C", text: "行3" },
      { label: "D", text: "エラーなし" },
    ],
    correctLabel: "B",
    explanation:
      "List<? extends Number>は読み取り専用（Producer）です。要素の型が不明なため、null以外の要素を追加できません。Numberとしての読み取り（行3）は安全に行えます。",
    code: "List<? extends Number> list = new ArrayList<Integer>();  // 行1\nlist.add(10);                                              // 行2\nNumber n = list.get(0);                                    // 行3",
    chapter: "gold-generics",
    level: "gold",
  },
  {
    id: "gold-generics-q11",
    question: "Map.of()で作成したMapの特徴は何ですか？",
    choices: [
      { label: "A", text: "要素の追加・削除が可能" },
      { label: "B", text: "nullキーとnull値を格納できる" },
      { label: "C", text: "完全にイミュータブルで変更操作は例外が発生する" },
      { label: "D", text: "キーの順序が保証される" },
    ],
    correctLabel: "C",
    explanation:
      "Map.of()はJava 9で導入されたイミュータブルなMapを生成するファクトリメソッドです。put()やremove()はUnsupportedOperationExceptionが発生します。nullキー・null値は許可されません。",
    chapter: "gold-generics",
    level: "gold",
  },
  {
    id: "gold-generics-q12",
    question: "ジェネリックメソッドの正しい定義はどれですか？",
    choices: [
      { label: "A", text: "public <T> void print(T item) { }" },
      { label: "B", text: "public void <T> print(T item) { }" },
      { label: "C", text: "public void print(<T> item) { }" },
      { label: "D", text: "public T void print(T item) { }" },
    ],
    correctLabel: "A",
    explanation:
      "ジェネリックメソッドの型パラメータは戻り値型の前に<T>を記述します。public <T> void print(T item)が正しい構文です。型パラメータはメソッド呼び出し時に推論されます。",
    chapter: "gold-generics",
    level: "gold",
  },
  // ════════════════════════════════════════
  // Gold: Stream API (gold-stream) 12問
  // ════════════════════════════════════════
  {
    id: "gold-stream-q01",
    question: "Stream APIの中間操作はどれですか？",
    choices: [
      { label: "A", text: "forEach()" },
      { label: "B", text: "collect()" },
      { label: "C", text: "filter()" },
      { label: "D", text: "count()" },
    ],
    correctLabel: "C",
    explanation:
      "filter()は中間操作（Streamを返す遅延評価）です。forEach()、collect()、count()はすべて終端操作（Streamを消費して結果を返す）です。中間操作は終端操作が呼ばれるまで実行されません。",
    chapter: "gold-stream",
    level: "gold",
  },
  {
    id: "gold-stream-q02",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "6" },
      { label: "B", text: "10" },
      { label: "C", text: "3" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "A",
    explanation:
      "filter(n -> n % 2 == 0)で偶数のみ（2, 4）を抽出し、mapToInt(n -> n)でIntStreamに変換、sum()で合計（2 + 4 = 6）を計算します。",
    code: "List<Integer> list = List.of(1, 2, 3, 4, 5);\nint result = list.stream()\n    .filter(n -> n % 2 == 0)\n    .mapToInt(n -> n)\n    .sum();\nSystem.out.println(result);",
    chapter: "gold-stream",
    level: "gold",
  },
  {
    id: "gold-stream-q03",
    question: "flatMapの用途として正しいものはどれですか？",
    choices: [
      { label: "A", text: "要素をフィルタリングする" },
      { label: "B", text: "各要素をStreamに変換し、1つのStreamにフラット化する" },
      { label: "C", text: "要素をソートする" },
      { label: "D", text: "要素の数をカウントする" },
    ],
    correctLabel: "B",
    explanation:
      "flatMapは各要素をStreamに変換し、結果のStreamを1つにフラット化（平坦化）します。例えばList<List<String>>の各要素をstream()で展開して1つのStream<String>にする場合などに使用します。",
    chapter: "gold-stream",
    level: "gold",
  },
  {
    id: "gold-stream-q04",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "[a, b, c, d]" },
      { label: "B", text: "[[a, b], [c, d]]" },
      { label: "C", text: "[ab, cd]" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "A",
    explanation:
      "flatMap(List::stream)は各内側リストをStreamに変換し、1つのStreamにフラット化します。[a, b]と[c, d]が結合されて[a, b, c, d]になります。",
    code: "List<List<String>> nested = List.of(\n    List.of(\"a\", \"b\"),\n    List.of(\"c\", \"d\")\n);\nvar result = nested.stream()\n    .flatMap(List::stream)\n    .collect(Collectors.toList());\nSystem.out.println(result);",
    chapter: "gold-stream",
    level: "gold",
  },
  {
    id: "gold-stream-q05",
    question: "Optionalについて正しい記述はどれですか？",
    choices: [
      { label: "A", text: "Optional.of(null)でnullを安全にラップできる" },
      { label: "B", text: "Optional.ofNullable(null)はOptional.empty()を返す" },
      { label: "C", text: "get()は値がなくてもnullを返す" },
      { label: "D", text: "Optionalはコレクションのフィールドとして推奨される" },
    ],
    correctLabel: "B",
    explanation:
      "Optional.ofNullable(null)はOptional.empty()を返します。Optional.of(null)はNullPointerExceptionが発生します。get()は値がないとNoSuchElementExceptionが発生します。Optionalはメソッドの戻り値に使うことが推奨されます。",
    chapter: "gold-stream",
    level: "gold",
  },
  {
    id: "gold-stream-q06",
    question: "reduce操作について正しい記述はどれですか？",
    choices: [
      { label: "A", text: "中間操作である" },
      { label: "B", text: "要素を1つの結果に集約する終端操作である" },
      { label: "C", text: "Streamの要素数を増やす操作である" },
      { label: "D", text: "Streamのソートを行う操作である" },
    ],
    correctLabel: "B",
    explanation:
      "reduce()はStreamの要素を1つの結果に集約する終端操作です。初期値とBinaryOperator（2つの要素を1つに結合する関数）を受け取ります。合計、最大値、文字列連結などに使用できます。",
    chapter: "gold-stream",
    level: "gold",
  },
  {
    id: "gold-stream-q07",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "15" },
      { label: "B", text: "10" },
      { label: "C", text: "Optional[15]" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "A",
    explanation:
      "reduce(0, Integer::sum)は初期値0から始めて各要素を加算します。0+1+2+3+4+5=15が返されます。初期値があるreduce()はOptionalではなく直接値を返します。",
    code: "int sum = Stream.of(1, 2, 3, 4, 5)\n    .reduce(0, Integer::sum);\nSystem.out.println(sum);",
    chapter: "gold-stream",
    level: "gold",
  },
  {
    id: "gold-stream-q08",
    question: "Collectors.groupingByの用途として正しいものはどれですか？",
    choices: [
      { label: "A", text: "要素を1つの文字列に結合する" },
      { label: "B", text: "要素を条件に基づいてグループ化しMapを生成する" },
      { label: "C", text: "要素をフィルタリングする" },
      { label: "D", text: "要素の重複を除去する" },
    ],
    correctLabel: "B",
    explanation:
      "Collectors.groupingBy()は分類関数に基づいて要素をグループ化し、Map<K, List<V>>を返します。SQLのGROUP BYに相当する操作です。第2引数にダウンストリームCollectorを指定することもできます。",
    chapter: "gold-stream",
    level: "gold",
  },
  {
    id: "gold-stream-q09",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "a-b-c" },
      { label: "B", text: "abc" },
      { label: "C", text: "a, b, c" },
      { label: "D", text: "[a-b-c]" },
    ],
    correctLabel: "A",
    explanation:
      "Collectors.joining(\"-\")は各要素を\"-\"で区切って1つの文字列に結合します。\"a\", \"b\", \"c\"が\"-\"で結合されて\"a-b-c\"になります。",
    code: "String result = Stream.of(\"a\", \"b\", \"c\")\n    .collect(Collectors.joining(\"-\"));\nSystem.out.println(result);",
    chapter: "gold-stream",
    level: "gold",
  },
  {
    id: "gold-stream-q10",
    question: "Streamの特性として正しい記述はどれですか？",
    choices: [
      { label: "A", text: "一度消費したStreamは再利用できる" },
      { label: "B", text: "Streamは一度だけ使用でき、終端操作後は再利用できない" },
      { label: "C", text: "中間操作は即座に実行される" },
      { label: "D", text: "Streamはデータを格納するコレクションである" },
    ],
    correctLabel: "B",
    explanation:
      "Streamは一度だけ使用でき、終端操作後に再利用しようとするとIllegalStateExceptionが発生します。中間操作は遅延評価され、終端操作が呼ばれるまで実行されません。Streamはデータのパイプラインで、格納はしません。",
    chapter: "gold-stream",
    level: "gold",
  },
  {
    id: "gold-stream-q11",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "HELLO" },
      { label: "B", text: "hello" },
      { label: "C", text: "NoSuchElementException" },
      { label: "D", text: "Optional[HELLO]" },
    ],
    correctLabel: "A",
    explanation:
      "Optional.of(\"hello\")でOptionalを生成し、map(String::toUpperCase)で値を大文字に変換、orElse(\"\")で値を取り出します。値が存在するので\"HELLO\"が返されます。",
    code: "String result = Optional.of(\"hello\")\n    .map(String::toUpperCase)\n    .orElse(\"\");\nSystem.out.println(result);",
    chapter: "gold-stream",
    level: "gold",
  },
  {
    id: "gold-stream-q12",
    question: "Stream.peek()の用途として正しいものはどれですか？",
    choices: [
      { label: "A", text: "要素をフィルタリングする" },
      { label: "B", text: "デバッグ目的で各要素を確認する中間操作" },
      { label: "C", text: "要素を別の型に変換する" },
      { label: "D", text: "Streamを終了させる終端操作" },
    ],
    correctLabel: "B",
    explanation:
      "peek()は各要素に対してアクションを実行する中間操作で、主にデバッグ目的で使用します。要素は変更されずそのまま次の操作に渡されます。Consumer<T>を引数に取ります。",
    chapter: "gold-stream",
    level: "gold",
  },
  // ════════════════════════════════════════
  // Gold: 並行処理 (gold-concurrency) 12問
  // ════════════════════════════════════════
  {
    id: "gold-concurrency-q01",
    question: "synchronizedキーワードの効果として正しいものはどれですか？",
    choices: [
      { label: "A", text: "メソッドの実行速度が向上する" },
      { label: "B", text: "同時に1つのスレッドだけがそのブロック/メソッドを実行できるようにする" },
      { label: "C", text: "デッドロックを完全に防止する" },
      { label: "D", text: "スレッドの優先度を設定する" },
    ],
    correctLabel: "B",
    explanation:
      "synchronizedはモニターロック（排他制御）を取得し、同時に1つのスレッドだけがそのブロックまたはメソッドを実行できるようにします。デッドロックの防止は保証しません。",
    chapter: "gold-concurrency",
    level: "gold",
  },
  {
    id: "gold-concurrency-q02",
    question: "ExecutorServiceについて正しい記述はどれですか？",
    choices: [
      { label: "A", text: "スレッドを手動でnewして管理する必要がある" },
      { label: "B", text: "スレッドプールを管理し、タスクの実行を制御するフレームワーク" },
      { label: "C", text: "Java 6で廃止された" },
      { label: "D", text: "単一スレッドのみサポートする" },
    ],
    correctLabel: "B",
    explanation:
      "ExecutorServiceはスレッドプールを管理するフレームワークで、submit()やinvokeAll()でタスクを実行できます。Executors.newFixedThreadPool()やnewCachedThreadPool()でインスタンスを取得します。",
    chapter: "gold-concurrency",
    level: "gold",
  },
  {
    id: "gold-concurrency-q03",
    question: "Future<T>のget()メソッドの動作として正しいものはどれですか？",
    choices: [
      { label: "A", text: "非同期で結果を返す" },
      { label: "B", text: "結果が利用可能になるまでブロックして待つ" },
      { label: "C", text: "結果が未完了の場合nullを返す" },
      { label: "D", text: "タイムアウトが指定できない" },
    ],
    correctLabel: "B",
    explanation:
      "Future.get()は計算結果が利用可能になるまで呼び出しスレッドをブロックします。get(long, TimeUnit)でタイムアウト付きの待機も可能です。isDone()で完了チェックもできます。",
    chapter: "gold-concurrency",
    level: "gold",
  },
  {
    id: "gold-concurrency-q04",
    question: "ConcurrentHashMapについて正しい記述はどれですか？",
    choices: [
      { label: "A", text: "キーにnullを格納できる" },
      { label: "B", text: "スレッドセーフだがnullキー・null値は許可しない" },
      { label: "C", text: "HashMapと同じパフォーマンスである" },
      { label: "D", text: "Collections.synchronizedMap()と同じ実装である" },
    ],
    correctLabel: "B",
    explanation:
      "ConcurrentHashMapはスレッドセーフなMap実装ですが、nullキー・null値を許可しません。HashMapと異なり、セグメント単位のロックにより高い並行性を実現します。synchronizedMapとは異なる実装です。",
    chapter: "gold-concurrency",
    level: "gold",
  },
  {
    id: "gold-concurrency-q05",
    question: "AtomicIntegerの特徴として正しいものはどれですか？",
    choices: [
      { label: "A", text: "synchronizedを内部で使用している" },
      { label: "B", text: "CAS（Compare-And-Swap）操作でロックなしにスレッドセーフな操作を実現する" },
      { label: "C", text: "通常のintと同じパフォーマンスである" },
      { label: "D", text: "immutableなクラスである" },
    ],
    correctLabel: "B",
    explanation:
      "AtomicIntegerはCAS（Compare-And-Swap）操作によりロックなしでスレッドセーフなインクリメント等の操作を実現します。incrementAndGet()、compareAndSet()などのアトミック操作を提供します。",
    chapter: "gold-concurrency",
    level: "gold",
  },
  {
    id: "gold-concurrency-q06",
    question: "parallelStream()の注意点として正しいものはどれですか？",
    choices: [
      { label: "A", text: "常にsequential()より高速である" },
      { label: "B", text: "要素の処理順序が保証される" },
      { label: "C", text: "共有可変状態を操作すると競合状態が発生する可能性がある" },
      { label: "D", text: "スレッドセーフなコレクションでのみ使用できる" },
    ],
    correctLabel: "C",
    explanation:
      "parallelStream()は要素を並列処理しますが、共有可変状態（外部の変数等）を操作すると競合状態（race condition）が発生する可能性があります。必ずしも高速ではなく、処理順序も保証されません。",
    chapter: "gold-concurrency",
    level: "gold",
  },
  {
    id: "gold-concurrency-q07",
    question: "Threadの生成方法として正しくないものはどれですか？",
    choices: [
      { label: "A", text: "Threadクラスを継承してrun()をオーバーライド" },
      { label: "B", text: "Runnableインターフェースを実装してThreadに渡す" },
      { label: "C", text: "Callableインターフェースを直接Threadに渡す" },
      { label: "D", text: "ラムダ式をThreadのコンストラクタに渡す" },
    ],
    correctLabel: "C",
    explanation:
      "CallableはThreadに直接渡せません。CallableはExecutorServiceのsubmit()で使用します。Thread生成にはThread継承、Runnable実装、またはラムダ式（Runnableとして）が使えます。",
    chapter: "gold-concurrency",
    level: "gold",
  },
  {
    id: "gold-concurrency-q08",
    question: "CompletableFutureの説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "同期処理にのみ使用する" },
      { label: "B", text: "非同期処理の結果を扱い、複数の非同期処理を合成できる" },
      { label: "C", text: "Java 6から使用可能" },
      { label: "D", text: "例外処理ができない" },
    ],
    correctLabel: "B",
    explanation:
      "CompletableFutureはJava 8で導入された非同期処理のためのクラスです。thenApply、thenCompose、thenCombineなどで非同期処理を合成でき、exceptionallyやhandleで例外処理も可能です。",
    chapter: "gold-concurrency",
    level: "gold",
  },
  {
    id: "gold-concurrency-q09",
    question: "RunnableとCallableの違いとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "Runnableは戻り値を返せるが、Callableは返せない" },
      { label: "B", text: "Callableは戻り値を返せて例外をスローでき、Runnableはどちらもできない" },
      { label: "C", text: "どちらも同じ機能を持つ" },
      { label: "D", text: "Callableはラムダ式で記述できない" },
    ],
    correctLabel: "B",
    explanation:
      "Callableのcall()メソッドは戻り値を返せてチェック例外もスローできます。Runnableのrun()メソッドは戻り値なし（void）でチェック例外もスローできません。どちらもラムダ式で記述可能です。",
    chapter: "gold-concurrency",
    level: "gold",
  },
  {
    id: "gold-concurrency-q10",
    question: "デッドロックが発生する条件として正しくないものはどれですか？",
    choices: [
      { label: "A", text: "相互排他（mutual exclusion）" },
      { label: "B", text: "保持と待機（hold and wait）" },
      { label: "C", text: "横取り可能（preemption）" },
      { label: "D", text: "循環待機（circular wait）" },
    ],
    correctLabel: "C",
    explanation:
      "デッドロックの4条件は相互排他、保持と待機、横取り不可（no preemption）、循環待機です。「横取り可能」ではなく「横取り不可」が条件です。これらすべてが同時に満たされるとデッドロックが発生します。",
    chapter: "gold-concurrency",
    level: "gold",
  },
  {
    id: "gold-concurrency-q11",
    question: "ExecutorServiceのshutdown()とshutdownNow()の違いは何ですか？",
    choices: [
      { label: "A", text: "どちらも同じ動作をする" },
      { label: "B", text: "shutdown()は新規タスクを拒否し実行中のタスクの完了を待つ、shutdownNow()は実行中のタスクも中断を試みる" },
      { label: "C", text: "shutdownNow()のみがtry-with-resourcesで使える" },
      { label: "D", text: "shutdown()は即座にすべてのスレッドを強制終了する" },
    ],
    correctLabel: "B",
    explanation:
      "shutdown()は新規タスクの受付を停止し、既に送信されたタスクの完了を待ちます。shutdownNow()は実行中のタスクへの割り込み（interrupt）を試み、未実行のタスクリストを返します。",
    chapter: "gold-concurrency",
    level: "gold",
  },
  {
    id: "gold-concurrency-q12",
    question: "volatileキーワードの効果として正しいものはどれですか？",
    choices: [
      { label: "A", text: "変数へのアクセスを排他制御する" },
      { label: "B", text: "変数の読み書きがメインメモリを通じて行われることを保証する" },
      { label: "C", text: "変数をイミュータブルにする" },
      { label: "D", text: "複合操作（i++など）をアトミックにする" },
    ],
    correctLabel: "B",
    explanation:
      "volatileはメモリ可視性を保証し、変数の読み書きがメインメモリを通じて行われます。ただし排他制御はせず、i++のような複合操作のアトミック性は保証しません。アトミック操作にはAtomicIntegerを使います。",
    chapter: "gold-concurrency",
    level: "gold",
  },
  // ════════════════════════════════════════
  // Gold: I/OとJDBC (gold-io) 12問
  // ════════════════════════════════════════
  {
    id: "gold-io-q01",
    question: "NIO.2のPathとFilesについて正しい記述はどれですか？",
    choices: [
      { label: "A", text: "PathはFileクラスのサブクラスである" },
      { label: "B", text: "Files.readAllLines()はファイルの全行をList<String>で返す" },
      { label: "C", text: "PathはJava 6で導入された" },
      { label: "D", text: "Filesクラスはインスタンスメソッドのみ持つ" },
    ],
    correctLabel: "B",
    explanation:
      "Files.readAllLines()はファイルの全行をList<String>として読み込みます。PathはJava 7で導入されたインターフェースで、Fileクラスとは独立しています。Filesはstaticメソッドのみ持つユーティリティクラスです。",
    chapter: "gold-io",
    level: "gold",
  },
  {
    id: "gold-io-q02",
    question: "Serializableインターフェースについて正しい記述はどれですか？",
    choices: [
      { label: "A", text: "抽象メソッドを実装する必要がある" },
      { label: "B", text: "マーカーインターフェースで、メソッドの実装は不要" },
      { label: "C", text: "transientフィールドもシリアライズされる" },
      { label: "D", text: "staticフィールドもシリアライズされる" },
    ],
    correctLabel: "B",
    explanation:
      "Serializableはマーカーインターフェースで、実装すべきメソッドはありません。transient修飾子を付けたフィールドはシリアライズ対象から除外されます。staticフィールドもシリアライズされません。",
    chapter: "gold-io",
    level: "gold",
  },
  {
    id: "gold-io-q03",
    question: "Path.resolve()の動作として正しいものはどれですか？",
    choices: [
      { label: "A", text: "パスの最後のコンポーネントを除去する" },
      { label: "B", text: "引数のパスを現在のパスに結合する" },
      { label: "C", text: "パスを正規化する（.や..を解決する）" },
      { label: "D", text: "2つのパス間の相対パスを計算する" },
    ],
    correctLabel: "B",
    explanation:
      "resolve()は引数のパスを現在のパスに結合します。例えばPath.of(\"/home\").resolve(\"user\")は/home/userになります。normalize()は.や..を解決し、relativize()は相対パスを計算します。",
    chapter: "gold-io",
    level: "gold",
  },
  {
    id: "gold-io-q04",
    question: "Files.walk()の戻り値は何ですか？",
    choices: [
      { label: "A", text: "List<Path>" },
      { label: "B", text: "Stream<Path>" },
      { label: "C", text: "Iterator<Path>" },
      { label: "D", text: "Path[]" },
    ],
    correctLabel: "B",
    explanation:
      "Files.walk()はディレクトリツリーを再帰的に走査し、Stream<Path>を返します。try-with-resourcesで使用してリソースを適切にクローズする必要があります。深さ制限も指定できます。",
    chapter: "gold-io",
    level: "gold",
  },
  {
    id: "gold-io-q05",
    question: "JDBCのPreparedStatementの利点として正しいものはどれですか？",
    choices: [
      { label: "A", text: "SQLの実行速度が常に遅くなる" },
      { label: "B", text: "SQLインジェクションを防止でき、プリコンパイルによりパフォーマンスも向上する" },
      { label: "C", text: "Statementと比べて使い方が複雑なだけでメリットはない" },
      { label: "D", text: "パラメータなしのクエリにのみ使用できる" },
    ],
    correctLabel: "B",
    explanation:
      "PreparedStatementはパラメータをバインドしてSQLインジェクションを防止し、プリコンパイルされたSQLの再利用によりパフォーマンスも向上します。パラメータ付き・なし両方のクエリに使用できます。",
    chapter: "gold-io",
    level: "gold",
  },
  {
    id: "gold-io-q06",
    question: "JDBCのConnectionの取得方法として正しいものはどれですか？",
    choices: [
      { label: "A", text: "new Connection()でインスタンスを生成する" },
      { label: "B", text: "DriverManager.getConnection(url, user, password)で取得する" },
      { label: "C", text: "Connection.open(url)で取得する" },
      { label: "D", text: "Statement.getConnection()で取得する" },
    ],
    correctLabel: "B",
    explanation:
      "JDBCのConnectionはDriverManager.getConnection(url, user, password)で取得します。ConnectionはAutoCloseableを実装しているため、try-with-resourcesで使用することが推奨されます。",
    chapter: "gold-io",
    level: "gold",
  },
  {
    id: "gold-io-q07",
    question: "ResultSetの操作について正しい記述はどれですか？",
    choices: [
      { label: "A", text: "最初のレコードから開始し、next()は不要" },
      { label: "B", text: "カーソルは最初のレコードの前にあり、next()で移動する" },
      { label: "C", text: "カラム番号は0から始まる" },
      { label: "D", text: "next()はレコードの内容を返す" },
    ],
    correctLabel: "B",
    explanation:
      "ResultSetのカーソルは最初のレコードの前に位置しています。next()でカーソルを次のレコードに移動し、データがあればtrueを返します。カラム番号は1から始まります。",
    chapter: "gold-io",
    level: "gold",
  },
  {
    id: "gold-io-q08",
    question: "BufferedReaderとBufferedWriterの利点は何ですか？",
    choices: [
      { label: "A", text: "バッファリングにより I/O操作の回数を減らし性能を向上させる" },
      { label: "B", text: "バイナリファイルの読み書きに特化している" },
      { label: "C", text: "自動的にファイルを暗号化する" },
      { label: "D", text: "マルチスレッド環境でのみ使用できる" },
    ],
    correctLabel: "A",
    explanation:
      "BufferedReader/Writerはバッファを使用してI/O操作をまとめて行い、ディスクアクセスの回数を減らしてパフォーマンスを向上させます。文字ストリームに対して使用し、readLine()なども提供します。",
    chapter: "gold-io",
    level: "gold",
  },
  {
    id: "gold-io-q09",
    question: "Files.copy()のデフォルトの動作として正しいものはどれですか？",
    choices: [
      { label: "A", text: "既存ファイルを上書きする" },
      { label: "B", text: "既存ファイルがある場合はFileAlreadyExistsExceptionが発生する" },
      { label: "C", text: "既存ファイルがある場合は何もしない" },
      { label: "D", text: "ファイル名に数字を付けてリネームする" },
    ],
    correctLabel: "B",
    explanation:
      "Files.copy()はデフォルトでは既存ファイルがある場合にFileAlreadyExistsExceptionをスローします。上書きするにはStandardCopyOption.REPLACE_EXISTINGオプションを指定する必要があります。",
    chapter: "gold-io",
    level: "gold",
  },
  {
    id: "gold-io-q10",
    question: "transientキーワードの効果は何ですか？",
    choices: [
      { label: "A", text: "フィールドをfinalにする" },
      { label: "B", text: "フィールドをシリアライズの対象から除外する" },
      { label: "C", text: "フィールドをスレッドローカルにする" },
      { label: "D", text: "フィールドをimmutableにする" },
    ],
    correctLabel: "B",
    explanation:
      "transient修飾子を付けたフィールドはシリアライズ（ObjectOutputStream）の対象から除外されます。デシリアライズ時にはデフォルト値（0, null等）に設定されます。パスワード等のセンシティブ情報に使用します。",
    chapter: "gold-io",
    level: "gold",
  },
  {
    id: "gold-io-q11",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "/home/user/docs/file.txt" },
      { label: "B", text: "/home/user/file.txt" },
      { label: "C", text: "docs/file.txt" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "A",
    explanation:
      "resolve()は引数のパスを現在のパスに結合します。/home/user/docsにfile.txtを結合して/home/user/docs/file.txtになります。引数が絶対パスの場合は引数がそのまま返されます。",
    code: "Path base = Path.of(\"/home/user/docs\");\nPath result = base.resolve(\"file.txt\");\nSystem.out.println(result);",
    chapter: "gold-io",
    level: "gold",
  },
  {
    id: "gold-io-q12",
    question: "JDBCでトランザクションを手動管理する方法として正しいものはどれですか？",
    choices: [
      { label: "A", text: "connection.setAutoCommit(false)でオートコミットを無効にする" },
      { label: "B", text: "connection.beginTransaction()を呼び出す" },
      { label: "C", text: "Statementにトランザクションモードを設定する" },
      { label: "D", text: "ResultSetのcommit()メソッドを呼び出す" },
    ],
    correctLabel: "A",
    explanation:
      "JDBCではconnection.setAutoCommit(false)でオートコミットを無効にしてトランザクションを手動管理します。connection.commit()でコミット、connection.rollback()でロールバックを行います。",
    chapter: "gold-io",
    level: "gold",
  },
  // ════════════════════════════════════════
  // Gold: 高度な機能 (gold-advanced) 12問
  // ════════════════════════════════════════
  {
    id: "gold-advanced-q01",
    question: "モジュールシステム（JPMS）について正しい記述はどれですか？",
    choices: [
      { label: "A", text: "Java 8で導入された" },
      { label: "B", text: "module-info.javaで依存関係と公開パッケージを定義する" },
      { label: "C", text: "すべてのパッケージはデフォルトで外部に公開される" },
      { label: "D", text: "循環依存が許可されている" },
    ],
    correctLabel: "B",
    explanation:
      "JPMSはJava 9で導入されました。module-info.javaでrequires（依存モジュール）とexports（公開パッケージ）を定義します。明示的にexportsしないパッケージは外部からアクセスできません。循環依存はエラーになります。",
    chapter: "gold-advanced",
    level: "gold",
  },
  {
    id: "gold-advanced-q02",
    question: "@Overrideアノテーションの目的として正しいものはどれですか？",
    choices: [
      { label: "A", text: "メソッドを自動的にオーバーライドする" },
      { label: "B", text: "コンパイラにオーバーライドの意図を伝え、正しくオーバーライドしていない場合にエラーにする" },
      { label: "C", text: "実行時にオーバーライドの検証を行う" },
      { label: "D", text: "メソッドのアクセス修飾子を自動的にpublicにする" },
    ],
    correctLabel: "B",
    explanation:
      "@Overrideはコンパイル時にオーバーライドの正しさを検証するアノテーションです。メソッド名のスペルミスや引数の間違いがあるとコンパイルエラーになります。付けなくてもオーバーライドは成立しますが、付けることが強く推奨されます。",
    chapter: "gold-advanced",
    level: "gold",
  },
  {
    id: "gold-advanced-q03",
    question: "カスタムアノテーションを定義する際の@Retentionの説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "アノテーションを付けられる対象（クラス、メソッド等）を指定する" },
      { label: "B", text: "アノテーション情報がどの段階まで保持されるかを指定する" },
      { label: "C", text: "アノテーションの繰り返し使用を許可する" },
      { label: "D", text: "アノテーションをサブクラスに継承させる" },
    ],
    correctLabel: "B",
    explanation:
      "@Retentionはアノテーションのライフサイクルを指定します。SOURCE（コンパイル時に破棄）、CLASS（クラスファイルに保持、実行時は不可）、RUNTIME（実行時にリフレクションで取得可能）の3段階です。",
    chapter: "gold-advanced",
    level: "gold",
  },
  {
    id: "gold-advanced-q04",
    question: "Locale クラスの用途として正しいものはどれですか？",
    choices: [
      { label: "A", text: "日時のフォーマットにのみ使用する" },
      { label: "B", text: "言語、国、地域に応じた国際化（i18n）の基準を表す" },
      { label: "C", text: "文字エンコーディングを変換する" },
      { label: "D", text: "タイムゾーンを管理する" },
    ],
    correctLabel: "B",
    explanation:
      "Localeは言語、国、地域の情報を持ち、日時・数値のフォーマット、通貨記号、メッセージの国際化など、ロケール依存の処理の基準となります。Locale.JAPAN, Locale.US等の定数も提供されています。",
    chapter: "gold-advanced",
    level: "gold",
  },
  {
    id: "gold-advanced-q05",
    question: "ResourceBundleの用途として正しいものはどれですか？",
    choices: [
      { label: "A", text: "JARファイルのリソースをロードする" },
      { label: "B", text: "ロケールに応じたメッセージやラベルを管理する国際化の仕組み" },
      { label: "C", text: "クラスパスの設定を管理する" },
      { label: "D", text: "データベース接続を管理する" },
    ],
    correctLabel: "B",
    explanation:
      "ResourceBundleはプロパティファイル（messages_ja.properties等）を使ってロケールに応じたメッセージを管理します。ResourceBundle.getBundle(\"messages\", locale)でロケールに対応するバンドルを取得します。",
    chapter: "gold-advanced",
    level: "gold",
  },
  {
    id: "gold-advanced-q06",
    question: "exports ... to の用途は何ですか？",
    choices: [
      { label: "A", text: "パッケージをすべてのモジュールに公開する" },
      { label: "B", text: "パッケージを指定したモジュールにのみ公開する" },
      { label: "C", text: "モジュールの依存を宣言する" },
      { label: "D", text: "サービスプロバイダを登録する" },
    ],
    correctLabel: "B",
    explanation:
      "exports パッケージ名 to モジュール名は、パッケージを特定のモジュールにのみ公開する限定公開です。外部APIは公開し、内部APIは特定のモジュールにのみ公開する場合に使用します。",
    chapter: "gold-advanced",
    level: "gold",
  },
  {
    id: "gold-advanced-q07",
    question: "@Targetアノテーションの役割は何ですか？",
    choices: [
      { label: "A", text: "アノテーションの保持期間を指定する" },
      { label: "B", text: "アノテーションを適用できる対象（クラス、メソッド等）を制限する" },
      { label: "C", text: "アノテーションのデフォルト値を設定する" },
      { label: "D", text: "アノテーションをJavadocに含める" },
    ],
    correctLabel: "B",
    explanation:
      "@Targetはカスタムアノテーションをどのプログラム要素に適用できるかを制限します。ElementType.TYPE（クラス）、METHOD（メソッド）、FIELD（フィールド）、PARAMETER（パラメータ）などを指定できます。",
    chapter: "gold-advanced",
    level: "gold",
  },
  {
    id: "gold-advanced-q08",
    question: "opensディレクティブの用途は何ですか？",
    choices: [
      { label: "A", text: "パッケージをコンパイル時にアクセス可能にする" },
      { label: "B", text: "パッケージを実行時のリフレクションアクセスに対して公開する" },
      { label: "C", text: "モジュールの依存関係を宣言する" },
      { label: "D", text: "パッケージをテスト用に公開する" },
    ],
    correctLabel: "B",
    explanation:
      "opensディレクティブはパッケージを実行時のリフレクションアクセスに公開します。exportsとは異なり、コンパイル時のアクセスは制限されます。DIフレームワーク（Spring等）がリフレクションでアクセスする場合に必要です。",
    chapter: "gold-advanced",
    level: "gold",
  },
  {
    id: "gold-advanced-q09",
    question: "NumberFormatクラスの用途として正しいものはどれですか？",
    choices: [
      { label: "A", text: "数値を文字列にフォーマットし、ロケールに応じた表記にする" },
      { label: "B", text: "日時を数値に変換する" },
      { label: "C", text: "文字列をバイト配列に変換する" },
      { label: "D", text: "数値型の精度を設定する" },
    ],
    correctLabel: "A",
    explanation:
      "NumberFormatはロケールに応じた数値のフォーマットを行います。NumberFormat.getInstance(Locale.JAPAN)で日本のフォーマット（カンマ区切り等）を取得し、format()で数値を文字列に変換できます。",
    chapter: "gold-advanced",
    level: "gold",
  },
  {
    id: "gold-advanced-q10",
    question: "@Deprecatedアノテーションの説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "メソッドの使用をコンパイル時にエラーにする" },
      { label: "B", text: "メソッドが非推奨であることを示し、使用時にコンパイラ警告を出す" },
      { label: "C", text: "メソッドを自動的に削除する" },
      { label: "D", text: "メソッドのアクセスをprivateに変更する" },
    ],
    correctLabel: "B",
    explanation:
      "@Deprecatedはメソッドやクラスが非推奨であることを示します。使用するとコンパイラ警告が出ますが、エラーにはなりません。Java 9以降はforRemoval=trueで将来削除予定であることも示せます。",
    chapter: "gold-advanced",
    level: "gold",
  },
  {
    id: "gold-advanced-q11",
    question: "サービスプロバイダの仕組みで、provides...withの役割は何ですか？",
    choices: [
      { label: "A", text: "モジュールの依存関係を宣言する" },
      { label: "B", text: "サービスインターフェースの実装クラスを登録する" },
      { label: "C", text: "パッケージを公開する" },
      { label: "D", text: "リフレクションアクセスを許可する" },
    ],
    correctLabel: "B",
    explanation:
      "provides サービスインターフェース with 実装クラスは、モジュールシステムのサービスプロバイダメカニズムで実装クラスを登録します。usesディレクティブでサービスを利用する側を宣言し、ServiceLoaderで実装を取得します。",
    chapter: "gold-advanced",
    level: "gold",
  },
  {
    id: "gold-advanced-q12",
    question: "ResourceBundleのファイル命名規則として正しいものはどれですか？",
    choices: [
      { label: "A", text: "messages-ja-JP.properties" },
      { label: "B", text: "messages_ja_JP.properties" },
      { label: "C", text: "messages.ja.JP.properties" },
      { label: "D", text: "ja_JP_messages.properties" },
    ],
    correctLabel: "B",
    explanation:
      "ResourceBundleのプロパティファイルはベース名_言語コード_国コードの形式で命名します。例：messages_ja_JP.properties（日本語・日本）、messages_en_US.properties（英語・米国）、messages.properties（デフォルト）。",
    chapter: "gold-advanced",
    level: "gold",
  },
  // ════════════════════════════════════════
  // Gold: 試験対策 (gold-exam) 10問
  // ════════════════════════════════════════
  {
    id: "gold-exam-q01",
    question: "sealed classesについて正しい記述はどれですか？",
    choices: [
      { label: "A", text: "Java 11で導入された" },
      { label: "B", text: "permitsで継承を許可するクラスを明示的に指定する" },
      { label: "C", text: "サブクラスにfinal、sealed、non-sealedの制約は不要" },
      { label: "D", text: "インターフェースには適用できない" },
    ],
    correctLabel: "B",
    explanation:
      "sealed classesはJava 17で正式導入され、permitsキーワードで継承可能なサブクラスを明示的に制限します。サブクラスはfinal、sealed、non-sealedのいずれかを宣言する必要があります。インターフェースにも適用可能です。",
    chapter: "gold-exam",
    level: "gold",
  },
  {
    id: "gold-exam-q02",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "Optional[HELLO]" },
      { label: "B", text: "HELLO" },
      { label: "C", text: "hello" },
      { label: "D", text: "NoSuchElementException" },
    ],
    correctLabel: "B",
    explanation:
      "Optional.ofNullable(\"hello\")でOptionalを生成、map(String::toUpperCase)で\"HELLO\"に変換、orElse(\"default\")で値を取り出します。値が存在するので\"HELLO\"が返されます。",
    code: "var result = Optional.ofNullable(\"hello\")\n    .map(String::toUpperCase)\n    .orElse(\"default\");\nSystem.out.println(result);",
    chapter: "gold-exam",
    level: "gold",
  },
  {
    id: "gold-exam-q03",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "{odd=[1, 3, 5], even=[2, 4]}" },
      { label: "B", text: "{false=[1, 3, 5], true=[2, 4]}" },
      { label: "C", text: "[1, 3, 5, 2, 4]" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "B",
    explanation:
      "Collectors.partitioningBy()はPredicateの結果（true/false）で要素を2つのグループに分割しMap<Boolean, List<T>>を返します。偶数はtrue、奇数はfalseのグループになります。",
    code: "var result = List.of(1, 2, 3, 4, 5).stream()\n    .collect(Collectors.partitioningBy(n -> n % 2 == 0));\nSystem.out.println(result);",
    chapter: "gold-exam",
    level: "gold",
  },
  {
    id: "gold-exam-q04",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "3" },
      { label: "B", text: "6" },
      { label: "C", text: "Optional[3]" },
      { label: "D", text: "IllegalStateException" },
    ],
    correctLabel: "A",
    explanation:
      "Stream.of(1,2,3)にpeek()を適用していますが、peek()は中間操作です。count()で要素数3が返されます。peek()はデバッグ用の中間操作で、要素に副作用を与えますが結果には影響しません。",
    code: "long count = Stream.of(1, 2, 3)\n    .peek(System.out::print)\n    .count();\nSystem.out.println(count);",
    chapter: "gold-exam",
    level: "gold",
  },
  {
    id: "gold-exam-q05",
    question: "次のコードの出力結果として正しいものはどれですか？",
    choices: [
      { label: "A", text: "[apple, banana]" },
      { label: "B", text: "[APPLE, BANANA]" },
      { label: "C", text: "[banana, cherry]" },
      { label: "D", text: "[BANANA, CHERRY]" },
    ],
    correctLabel: "D",
    explanation:
      "filter(s -> s.length() > 5)で長さ5以上の要素（banana, cherry）を抽出し、map(String::toUpperCase)で大文字に変換します。結果は[BANANA, CHERRY]です。",
    code: "var result = List.of(\"apple\", \"banana\", \"cherry\").stream()\n    .filter(s -> s.length() > 5)\n    .map(String::toUpperCase)\n    .collect(Collectors.toList());\nSystem.out.println(result);",
    chapter: "gold-exam",
    level: "gold",
  },
  {
    id: "gold-exam-q06",
    question: "Collectors.toUnmodifiableList()の特徴として正しいものはどれですか？",
    choices: [
      { label: "A", text: "null要素を含むことができる" },
      { label: "B", text: "イミュータブルなリストを返し、null要素は許可されない" },
      { label: "C", text: "ソート済みのリストを返す" },
      { label: "D", text: "重複要素を自動的に除去する" },
    ],
    correctLabel: "B",
    explanation:
      "Collectors.toUnmodifiableList()（Java 10+）はイミュータブルなリストを返します。null要素が含まれるとNullPointerExceptionが発生します。変更操作はUnsupportedOperationExceptionが発生します。",
    chapter: "gold-exam",
    level: "gold",
  },
  {
    id: "gold-exam-q07",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "default" },
      { label: "B", text: "null" },
      { label: "C", text: "Optional.empty" },
      { label: "D", text: "NullPointerException" },
    ],
    correctLabel: "A",
    explanation:
      "Optional.ofNullable(null)はOptional.empty()を返します。map()は空のOptionalに対しては何もせずOptional.empty()を返します。orElse(\"default\")で空の場合のデフォルト値\"default\"が返されます。",
    code: "var result = Optional.ofNullable(null)\n    .map(Object::toString)\n    .orElse(\"default\");\nSystem.out.println(result);",
    chapter: "gold-exam",
    level: "gold",
  },
  {
    id: "gold-exam-q08",
    question: "並列ストリームの使用で注意すべき点として正しいものはどれですか？",
    choices: [
      { label: "A", text: "forEachOrderedを使えば順序付きの処理が可能" },
      { label: "B", text: "parallelStreamは常にsequentialより高速" },
      { label: "C", text: "reduce操作は並列ストリームで使用できない" },
      { label: "D", text: "コレクションのサイズに関係なく並列化すべき" },
    ],
    correctLabel: "A",
    explanation:
      "forEachOrdered()を使うと並列ストリームでも処理順序が保証されます。ただし順序保証にはオーバーヘッドがあります。小さなデータや単純な処理では順次処理の方が高速な場合もあります。",
    chapter: "gold-exam",
    level: "gold",
  },
  {
    id: "gold-exam-q09",
    question: "次のコードの出力結果は何ですか？",
    choices: [
      { label: "A", text: "{3=[cat, dog], 5=[apple], 6=[banana]}" },
      { label: "B", text: "{apple=5, banana=6, cat=3, dog=3}" },
      { label: "C", text: "[3, 5, 6]" },
      { label: "D", text: "コンパイルエラー" },
    ],
    correctLabel: "A",
    explanation:
      "Collectors.groupingBy(String::length)は文字列を長さでグループ化します。長さ3は[cat, dog]、長さ5は[apple]、長さ6は[banana]のグループになります。",
    code: "var result = Stream.of(\"apple\", \"banana\", \"cat\", \"dog\")\n    .collect(Collectors.groupingBy(String::length));\nSystem.out.println(result);",
    chapter: "gold-exam",
    level: "gold",
  },
  {
    id: "gold-exam-q10",
    question: "モジュールシステムでopen moduleの効果は何ですか？",
    choices: [
      { label: "A", text: "すべてのパッケージをコンパイル時にアクセス可能にする" },
      { label: "B", text: "すべてのパッケージを実行時のリフレクションアクセスに公開する" },
      { label: "C", text: "循環依存を許可する" },
      { label: "D", text: "モジュールの依存をすべて自動的に解決する" },
    ],
    correctLabel: "B",
    explanation:
      "open moduleはモジュールのすべてのパッケージを実行時のリフレクションアクセスに公開します。SpringなどのDIフレームワークとの互換性を確保するために使用されます。exportsとは異なり、コンパイル時のアクセスは制限されたままです。",
    chapter: "gold-exam",
    level: "gold",
  },
];
