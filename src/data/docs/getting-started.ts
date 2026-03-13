import type { DocsChapter } from "../java-docs";

export const gettingStartedChapters: DocsChapter[] = [
  {
    id: "getting-started",
    title: "はじめてのJavaアプリケーション",
    category: "getting-started",
    description: "JDKのセットアップからHello Worldの実行まで、Java開発の第一歩",
    sections: [
      {
        title: "Javaプログラムの構成要素",
        content:
          "Javaプログラムはクラスとメソッドで構成されます。Java 21以降では、簡略化されたmainメソッドにより、初心者でもすぐにプログラムを書き始められます。ソースコードは .java ファイルに記述し、JDKに含まれるコンパイラでバイトコードに変換して実行します。",
        code: `// Java 21+ 簡略化されたエントリポイント
void main() {
    System.out.println("Hello, World!");
}

// 従来の書き方（すべてのバージョンで動作）
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
      },
      {
        title: "JDKのセットアップ",
        content:
          "Java Development Kit（JDK）にはコンパイラ（javac）、ランタイム（java）、その他のツールが含まれます。Oracle JDK や OpenJDK をダウンロードし、JAVA_HOME 環境変数を設定します。java -version で正しくインストールされたか確認できます。",
        code: `// JDKのインストール確認
// ターミナルで以下を実行
$ java -version
// java version "21.0.2" 2024-01-16 LTS

$ javac -version
// javac 21.0.2

// 環境変数の設定 (macOS/Linux)
$ export JAVA_HOME=/path/to/jdk-21
$ export PATH=$JAVA_HOME/bin:$PATH

// 環境変数の設定 (Windows)
$ set JAVA_HOME=C:\\Program Files\\Java\\jdk-21
$ set PATH=%JAVA_HOME%\\bin;%PATH%`,
      },
      {
        title: "コンパイルと実行",
        content:
          "Java のソースファイルはまずバイトコード（.class ファイル）にコンパイルされ、JVM（Java仮想マシン）上で実行されます。Java 11以降では単一ファイルプログラムをコンパイルなしで直接実行することも可能です。",
        code: `// ファイル: MyApp.java
public class MyApp {
    public static void main(String[] args) {
        String name = args.length > 0 ? args[0] : "Java";
        System.out.println("Hello, " + name + "!");
    }
}

// コンパイルして実行（従来の方法）
$ javac MyApp.java       // MyApp.class が生成される
$ java MyApp World       // "Hello, World!"

// 直接実行（Java 11+, 単一ファイル）
$ java MyApp.java World  // コンパイル不要で直接実行

// 複数ファイルのコンパイル
$ javac -d out src/*.java  // out ディレクトリにクラスファイルを出力
$ java -cp out MyApp       // クラスパスを指定して実行`,
      },
    ],
  },
  {
    id: "jshell",
    title: "JShell（対話型シェル）",
    category: "getting-started",
    description: "REPL環境でJavaコードを対話的に実行・実験する (Java 9+)",
    sections: [
      {
        title: "JShellの基本操作",
        content:
          "JShellはJava 9で導入されたREPL（Read-Eval-Print Loop）ツールです。コードをコンパイル・実行のサイクルなしに対話的に実行でき、式の評価、メソッド定義、APIの実験に便利です。",
        code: `// JShellの起動
$ jshell

// 式の評価
jshell> 1 + 2
$1 ==> 3

jshell> "Hello".toUpperCase()
$2 ==> "HELLO"

// 変数の宣言と使用
jshell> var name = "Java"
name ==> "Java"

jshell> var version = 21
version ==> 21

jshell> System.out.println(name + " " + version)
Java 21

// メソッドの定義
jshell> int add(int a, int b) { return a + b; }
|  created method add(int,int)

jshell> add(3, 4)
$6 ==> 7`,
      },
      {
        title: "JShellのコマンド",
        content:
          "JShellにはスニペットの管理、インポート、ファイルの読み込みなどのための組み込みコマンドがあります。/list でスニペット一覧、/edit で編集、/save でファイルに保存できます。",
        code: `// よく使うJShellコマンド
jshell> /help          // ヘルプを表示
jshell> /list          // 入力したスニペットの一覧
jshell> /vars          // 定義した変数の一覧
jshell> /methods       // 定義したメソッドの一覧
jshell> /imports       // インポート済みパッケージの一覧

jshell> /edit add      // メソッドをエディタで編集
jshell> /save my.jsh   // スニペットをファイルに保存
jshell> /open my.jsh   // ファイルからスニペットを読み込み
jshell> /reset         // すべてのスニペットをクリア
jshell> /exit          // JShellを終了

// タブ補完
jshell> "Hello".to     // Tabキーで補完候補を表示
// toCharArray()  toLowerCase()  toString()  toUpperCase()

// デフォルトインポート
// java.lang.*, java.util.*, java.io.*,
// java.math.*, java.net.*, java.util.stream.* 等`,
      },
    ],
  },
  {
    id: "ide-setup",
    title: "開発環境の構築",
    category: "getting-started",
    description: "IntelliJ IDEA, Eclipse, VS Code での Java 開発環境セットアップ",
    sections: [
      {
        title: "IDEの選択と比較",
        content:
          "Java開発には統合開発環境（IDE）の使用が推奨されます。IntelliJ IDEA はコード補完が強力で最も人気があります。Eclipse は無料でプラグインが豊富です。VS Code は軽量で Extension Pack for Java を導入することで Java 開発が可能になります。",
        code: `// IntelliJ IDEA でのプロジェクト作成
// 1. File → New → Project
// 2. Language: Java, Build System: Maven or Gradle
// 3. JDK: 21 を選択
// 4. Create

// Eclipse でのプロジェクト作成
// 1. File → New → Java Project
// 2. Project name: MyProject
// 3. JRE: JavaSE-21
// 4. Finish

// VS Code でのセットアップ
// 1. Extension Pack for Java をインストール
// 2. Ctrl+Shift+P → "Java: Create Java Project"
// 3. ビルドツールを選択（Maven / Gradle / No build tools）

// Maven プロジェクトの標準構成
// myproject/
// ├── pom.xml
// └── src/
//     ├── main/java/      ← ソースコード
//     └── test/java/      ← テストコード`,
      },
      {
        title: "ビルドツール (Maven / Gradle)",
        content:
          "Maven と Gradle はJavaの主要なビルドツールです。依存関係の管理、コンパイル、テスト、パッケージングを自動化します。Maven は XML ベース（pom.xml）、Gradle は Groovy/Kotlin DSL ベース（build.gradle）で設定します。",
        code: `// Maven (pom.xml)
<project>
    <groupId>com.example</groupId>
    <artifactId>myapp</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <maven.compiler.source>21</maven.compiler.source>
        <maven.compiler.target>21</maven.compiler.target>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>5.10.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>

// Gradle (build.gradle.kts)
plugins {
    java
}
java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}
dependencies {
    testImplementation("org.junit.jupiter:junit-jupiter:5.10.2")
}

// コマンド
// Maven: mvn compile / mvn test / mvn package
// Gradle: gradle build / gradle test / gradle jar`,
      },
    ],
  },
];
