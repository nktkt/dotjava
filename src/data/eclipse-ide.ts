export interface EclipseSection {
  title: string;
  content: string;
  code?: string;
}

export interface EclipseChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: EclipseSection[];
}

export const eclipseCategories = [
  { id: "basics", name: "基本操作", color: "var(--color-dads-purple)" },
  { id: "editor", name: "エディタ機能", color: "var(--color-dads-blue)" },
  { id: "debug", name: "デバッグ", color: "var(--color-dads-error)" },
  { id: "refactoring", name: "リファクタリング", color: "var(--color-dads-success)" },
  { id: "build", name: "ビルド・実行", color: "var(--color-dads-warning)" },
  { id: "plugins", name: "プラグイン・カスタマイズ", color: "var(--color-dads-cyan)" },
] as const;

export const eclipseChapters: EclipseChapter[] = [
  // ===== 基本操作 =====
  {
    id: "eclipse-setup",
    title: "インストールと初期設定",
    category: "basics",
    description: "Eclipse のダウンロード、JDK 設定、日本語化プラグイン導入など初期セットアップ手順",
    sections: [
      {
        title: "ダウンロードとインストール",
        content:
          "Eclipse は eclipse.org から Eclipse IDE for Java Developers パッケージをダウンロードします。Windows の場合は Eclipse Installer を使うと JRE 同梱で簡単にセットアップできます。macOS では .dmg を Applications にドラッグ、Linux では tar.gz を展開して eclipse を実行します。",
        code: `# Eclipse Installer の利用例 (Linux)
# 1. ダウンロード
wget https://www.eclipse.org/downloads/download.php?file=/oomph/epp/latest/eclipse-inst-jre-linux64.tar.gz

# 2. 展開
tar -xzf eclipse-inst-jre-linux64.tar.gz

# 3. インストーラ起動
cd eclipse-installer
./eclipse-inst

# → 「Eclipse IDE for Java Developers」を選択してインストール`,
      },
      {
        title: "JDK の設定",
        content:
          "Eclipse はインストール済みの JDK（JRE）を自動検出しますが、明示的に設定することを推奨します。Window > Preferences > Java > Installed JREs から JDK を追加し、プロジェクトのビルドパスで使用する JRE を選択します。複数バージョンの JDK を切り替えて使うことも可能です。",
        code: `// eclipse.ini で起動 JVM を指定する例
// eclipse.ini ファイルに以下を追加（-vmargs の前に記述）
-vm
/usr/lib/jvm/java-21-openjdk/bin/java

// Preferences での JDK 追加手順:
// 1. Window > Preferences > Java > Installed JREs
// 2. [Add] > Standard VM > [Next]
// 3. JRE home: /usr/lib/jvm/java-21-openjdk
// 4. [Finish] > チェックを入れてデフォルトに設定`,
      },
      {
        title: "日本語化（Pleiades）",
        content:
          "Eclipse を日本語化するには Pleiades プラグインを導入します。Pleiades All in One をダウンロードすると、日本語化済みの Eclipse がすぐに使えます。既存の Eclipse に後から Pleiades を適用する場合は、プラグインを配置して eclipse.ini に設定を追加します。",
        code: `// 既存 Eclipse への Pleiades 適用手順
// 1. https://willbrains.jp/ から Pleiades プラグインをダウンロード
// 2. plugins/ と features/ フォルダを Eclipse に配置
// 3. eclipse.ini の末尾に追加:
-javaagent:plugins/jp.sourceforge.mergedoc.pleiades/pleiades.jar

// ※ Pleiades All in One なら設定不要で日本語版がすぐ使える
// https://willbrains.jp/ からダウンロード`,
      },
    ],
  },
  {
    id: "workspace-project",
    title: "ワークスペースとプロジェクト管理",
    category: "basics",
    description: "ワークスペースの作成・切替、プロジェクトのインポート、ビルドパス設定",
    sections: [
      {
        title: "ワークスペースの概念と管理",
        content:
          "ワークスペースは Eclipse がプロジェクトや設定を管理するディレクトリです。起動時にワークスペースを選択でき、用途別に複数のワークスペースを使い分けられます。.metadata フォルダに設定情報が格納されるため、ワークスペースごとに独立した環境が維持されます。",
        code: `// ワークスペースの構造
workspace/
├── .metadata/          ← Eclipse の設定情報
│   ├── .plugins/       ← プラグインの状態
│   └── .log            ← ログファイル
├── ProjectA/           ← プロジェクト1
│   ├── src/
│   ├── bin/
│   └── .classpath
└── ProjectB/           ← プロジェクト2
    ├── src/
    ├── bin/
    └── .classpath

// ワークスペース切替: File > Switch Workspace > Other
// 起動時選択: -data オプションで指定
// eclipse -data /path/to/workspace`,
      },
      {
        title: "プロジェクトのインポートと作成",
        content:
          "新規プロジェクトは File > New > Java Project で作成します。既存プロジェクトのインポートは File > Import > Existing Projects into Workspace を使います。Maven/Gradle プロジェクトは専用のインポートウィザードがあり、pom.xml や build.gradle を自動認識します。",
        code: `// 新規 Java プロジェクト作成手順
// 1. File > New > Java Project
// 2. プロジェクト名を入力
// 3. JRE: Use an execution environment JRE (JavaSE-21)
// 4. Project layout: Create separate folders for sources and class files
// 5. [Finish]

// Maven プロジェクトのインポート
// 1. File > Import > Maven > Existing Maven Projects
// 2. Root Directory でプロジェクトフォルダを選択
// 3. pom.xml が検出される → [Finish]

// Gradle プロジェクトのインポート
// 1. File > Import > Gradle > Existing Gradle Project
// 2. Project root directory を指定 → [Finish]`,
      },
      {
        title: "ビルドパスの設定",
        content:
          "ビルドパスはコンパイルに必要なソースフォルダ、ライブラリ、出力先を定義します。プロジェクトを右クリック > Build Path > Configure Build Path で設定画面を開きます。外部 JAR の追加、プロジェクト間の依存関係設定、ソースフォルダの追加などを行えます。",
        code: `// .classpath ファイルの例（Eclipse が自動管理）
<?xml version="1.0" encoding="UTF-8"?>
<classpath>
  <!-- ソースフォルダ -->
  <classpathentry kind="src" path="src/main/java"/>
  <classpathentry kind="src" path="src/test/java"/>

  <!-- JRE システムライブラリ -->
  <classpathentry kind="con"
    path="org.eclipse.jdt.launching.JRE_CONTAINER/
          org.eclipse.jdt.internal.debug.ui.launcher.StandardVMType/
          JavaSE-21"/>

  <!-- 外部ライブラリ -->
  <classpathentry kind="lib" path="lib/gson-2.10.jar"/>

  <!-- 出力フォルダ -->
  <classpathentry kind="output" path="bin"/>
</classpath>`,
      },
    ],
  },
  {
    id: "ui-overview",
    title: "Eclipse UI の基本",
    category: "basics",
    description: "パースペクティブ、ビュー、エディタ領域の使い方と画面構成の理解",
    sections: [
      {
        title: "パースペクティブ",
        content:
          "パースペクティブはビュー・エディタ・メニュー・ツールバーのレイアウトセットです。Java パースペクティブでは Package Explorer、エディタ、Outline が表示され、Debug パースペクティブではデバッグに必要なビューが配置されます。右上のボタンやWindow > Perspective で切り替えられます。",
        code: `// 主要なパースペクティブ
// ┌─────────────────────────────────────┐
// │ Java パースペクティブ               │
// │  - Package Explorer                 │
// │  - エディタ                         │
// │  - Outline / Problems / Console     │
// ├─────────────────────────────────────┤
// │ Debug パースペクティブ              │
// │  - Debug ビュー                     │
// │  - Variables / Breakpoints          │
// │  - エディタ（ステップ実行位置表示） │
// ├─────────────────────────────────────┤
// │ Git パースペクティブ                │
// │  - Git Repositories                 │
// │  - Git Staging                      │
// │  - History                          │
// └─────────────────────────────────────┘

// パースペクティブの切替: Window > Perspective > Open Perspective
// リセット: Window > Perspective > Reset Perspective`,
      },
      {
        title: "ビューとエディタ",
        content:
          "ビューはプロジェクト一覧（Package Explorer）、コンソール出力（Console）、問題一覧（Problems）など補助的な情報を表示するパネルです。エディタはソースコードを編集する中央領域です。ビューは Window > Show View から追加でき、ドラッグで自由に配置変更できます。",
        code: `// よく使うビュー一覧
//
// Package Explorer  - プロジェクト・ファイル一覧
// Outline           - 現在のファイルの構造（メソッド・フィールド）
// Problems          - エラー・警告の一覧
// Console           - 実行結果・ログ出力
// Search            - 検索結果
// JUnit             - テスト結果
// Servers           - サーバー管理
// Terminal          - 内蔵ターミナル
//
// ビューの追加: Window > Show View > Other...
// ビューのリセット: Window > Perspective > Reset Perspective
// ビューの移動: タブをドラッグ＆ドロップ`,
      },
      {
        title: "エディタの基本操作",
        content:
          "エディタ領域では複数ファイルをタブで切り替えて編集できます。分割表示（エディタを左右・上下に並べる）も可能です。タブをダブルクリックするとエディタが最大化され、再度ダブルクリックで元に戻ります。マーカーバー（左端）にはブレークポイントやエラーアイコンが表示されます。",
        code: `// エディタの便利な操作
//
// タブ切替:       Ctrl+E（エディタ一覧）/ Ctrl+F6（次のエディタ）
// エディタ最大化: タブをダブルクリック / Ctrl+M
// 分割表示:       タブをドラッグしてエディタ端にドロップ
// 全タブを閉じる: Ctrl+Shift+W
//
// マーカーバー（左端）:
//   🔴 ブレークポイント
//   ❌ コンパイルエラー
//   ⚠️ 警告
//   💡 クイックフィックス提案
//
// 右端のミニマップ（Overview Ruler）でファイル全体のエラー位置を確認`,
      },
    ],
  },

  // ===== エディタ機能 =====
  {
    id: "code-editing",
    title: "コード編集の基本",
    category: "editor",
    description: "コード補完、テンプレート、フォーマッターによる効率的なコード編集",
    sections: [
      {
        title: "コード補完（Content Assist）",
        content:
          "Ctrl+Space でコード補完が起動します。クラス名、メソッド名、変数名を途中まで入力して補完できます。Java のコード補完は型情報を活用して適切な候補を提示します。メソッドの引数やジェネリクスも自動補完されるため、API を覚えていなくても効率よくコーディングできます。",
        code: `// コード補完の例
// 1. 変数名の補完
String message = "Hello";
// 「mes」と入力して Ctrl+Space → message が候補に

// 2. メソッドの補完
List<String> list = new ArrayList<>();
list.  // ← Ctrl+Space で add, get, size, stream 等が表示

// 3. static import の補完
// 「assertEq」と入力して Ctrl+Space
// → assertEquals が候補に（static import も自動追加）

// 4. コンストラクタの補完
// 「new Array」と入力して Ctrl+Space
// → new ArrayList<>() が候補に

// 設定: Window > Preferences > Java > Editor > Content Assist
// Auto activation delay: 200ms（反応速度）
// Auto activation triggers: . （トリガー文字）`,
      },
      {
        title: "コードテンプレート",
        content:
          "テンプレートは定型コードを素早く入力する機能です。sysout と入力して Ctrl+Space で System.out.println() が展開されます。main でメインメソッド、for/foreach でループ、try で try-catch ブロックが生成されます。独自テンプレートの追加も可能です。",
        code: `// 主要なコードテンプレート
//
// sysout → System.out.println();
// syserr → System.err.println();
// main   → public static void main(String[] args) { }
// for    → for (int i = 0; i < length; i++) { }
// foreach→ for (element : collection) { }
// while  → while (condition) { }
// try    → try { } catch (Exception e) { }
// if     → if (condition) { }
// new    → 新しいオブジェクトの生成
// test   → @Test public void test() { }

// カスタムテンプレートの追加:
// Window > Preferences > Java > Editor > Templates > [New]
// 例: "logger" テンプレート
// private static final Logger logger =
//     LoggerFactory.getLogger(\${enclosing_type}.class);`,
      },
      {
        title: "フォーマッターと保存アクション",
        content:
          "Ctrl+Shift+F でコードを自動フォーマットします。フォーマットルールはプロファイルとして管理でき、チーム全体で統一できます。保存アクション（Save Actions）を設定すると、ファイル保存時に自動でフォーマット、import の整理、不要なキャストの除去などを実行できます。",
        code: `// フォーマッタープロファイルの設定
// Window > Preferences > Java > Code Style > Formatter
// [New] でプロファイル作成
//
// 主な設定項目:
//   - インデント: タブ / スペース（4）
//   - 行の最大幅: 120文字
//   - ブレースの位置: 同じ行 / 改行
//   - import の順序: java → javax → org → com
//
// 保存アクション (Save Actions):
// Window > Preferences > Java > Editor > Save Actions
//   ✅ Format source code
//   ✅ Organize imports
//   ✅ Add missing @Override annotations
//   ✅ Remove unnecessary casts
//   ✅ Remove trailing whitespace
//
// フォーマット: Ctrl+Shift+F
// import 整理: Ctrl+Shift+O`,
      },
    ],
  },
  {
    id: "shortcuts",
    title: "ショートカットキー",
    category: "editor",
    description: "生産性を大幅に向上させる必須ショートカットキー集",
    sections: [
      {
        title: "編集系ショートカット",
        content:
          "Eclipse には多数のショートカットが用意されており、マウスを使わずに高速にコーディングできます。行の移動、行の複製、行の削除といった基本操作から、矩形選択、マルチカーソルまでサポートしています。Ctrl+1（クイックフィックス）は最も重要なショートカットの一つです。",
        code: `// 編集系ショートカット
//
// Ctrl+1           クイックフィックス（最重要！）
// Ctrl+D           行の削除
// Alt+↑/↓          行の移動
// Ctrl+Alt+↑/↓     行の複製
// Ctrl+Shift+F     コードフォーマット
// Ctrl+Shift+O     import の整理
// Ctrl+/           行コメント切替
// Ctrl+Shift+/     ブロックコメント追加
// Ctrl+Shift+\\    ブロックコメント解除
// Ctrl+Space       コード補完
// Ctrl+Z           元に戻す
// Ctrl+Y           やり直し
// Alt+Shift+R      リネーム（リファクタリング）
//
// Ctrl+1 の活用例:
//   - 未 import クラスの import 追加
//   - 変数の型推論（var への変換）
//   - try-catch の自動生成
//   - インターフェースメソッドの実装生成`,
      },
      {
        title: "ナビゲーション系ショートカット",
        content:
          "大規模プロジェクトでは効率的なナビゲーションが不可欠です。型を開く（Ctrl+Shift+T）、リソースを開く（Ctrl+Shift+R）で素早くファイルにジャンプできます。F3 で宣言にジャンプ、Ctrl+T で型階層の表示など、コードの構造を理解するためのショートカットも充実しています。",
        code: `// ナビゲーション系ショートカット
//
// Ctrl+Shift+T     型を開く（クラス名で検索）
// Ctrl+Shift+R     リソースを開く（ファイル名で検索）
// F3               宣言にジャンプ
// Ctrl+クリック    宣言にジャンプ（マウス）
// Ctrl+T           型階層の表示
// Ctrl+O           アウトライン（メソッド一覧）
// Ctrl+L           行番号を指定してジャンプ
// Ctrl+E           開いているエディタの一覧
// Ctrl+F6          次のエディタに切替
// Alt+←/→          前/次の編集位置に戻る
// Ctrl+Shift+G     参照箇所の検索
// Ctrl+G           宣言箇所の検索
// Ctrl+Alt+H       呼び出し階層（Call Hierarchy）
// F4               型階層ビューを開く`,
      },
      {
        title: "実行・デバッグ系ショートカット",
        content:
          "プログラムの実行やデバッグにもショートカットが用意されています。Ctrl+F11 で前回の実行を繰り返し、F11 でデバッグ実行します。デバッグ中は F5〜F8 でステップ実行を制御します。これらのショートカットを覚えると開発サイクルが大幅に速くなります。",
        code: `// 実行・デバッグ系ショートカット
//
// Ctrl+F11         前回の構成で実行
// F11              前回の構成でデバッグ実行
// Ctrl+Shift+B     ブレークポイントの切替
//
// デバッグ中:
// F5               ステップイン（メソッド内に入る）
// F6               ステップオーバー（次の行へ）
// F7               ステップリターン（メソッドから戻る）
// F8               再開（次のブレークポイントまで）
// Ctrl+R           カーソル行まで実行
// Ctrl+Shift+I     式の評価（選択した式の値を表示）
//
// その他:
// Ctrl+S           保存
// Ctrl+Shift+S     全て保存
// Ctrl+B           ビルド（自動ビルド無効時）
// Ctrl+H           検索ダイアログ
// Ctrl+3           クイックアクセス（何でも検索）`,
      },
    ],
  },
  {
    id: "search-navigation",
    title: "検索とナビゲーション",
    category: "editor",
    description: "型検索、参照検索、コールヒエラルキーで大規模コードベースを効率的に探索",
    sections: [
      {
        title: "型とリソースの検索",
        content:
          "Ctrl+Shift+T で型（クラス、インターフェース、列挙型）を検索できます。キャメルケースの頭文字だけで検索可能で、「NPE」で NullPointerException を見つけられます。Ctrl+Shift+R でファイル名検索、Ctrl+H でテキスト検索・Java 検索のダイアログが開きます。",
        code: `// Open Type (Ctrl+Shift+T) の検索パターン
//
// "ArrayList"      → java.util.ArrayList
// "AL"             → ArrayList（キャメルケース頭文字）
// "NPE"            → NullPointerException
// "*Service"       → 末尾が Service のクラス
// "com.app.User"   → 完全修飾名で検索
//
// Open Resource (Ctrl+Shift+R) の検索パターン
//
// "App.java"       → ファイル名で検索
// "*.xml"          → XML ファイルを一覧
// "app*config"     → ワイルドカード検索
//
// Java Search (Ctrl+H > Java タブ)
// → メソッド、フィールド、型を Java 構文を理解して検索
// → テキスト検索と違い、正確な参照を見つけられる`,
      },
      {
        title: "参照検索と宣言ジャンプ",
        content:
          "メソッドやクラスがどこから使われているかを調べるには参照検索（Ctrl+Shift+G）を使います。F3 または Ctrl+クリックで宣言にジャンプし、Alt+← で元の位置に戻れます。変数やメソッドを選択して Ctrl+Shift+G を押すと、ワークスペース全体から参照箇所を検索します。",
        code: `// 参照検索の活用
//
// 1. メソッドの呼び出し元を調べる
//    メソッド名にカーソル → Ctrl+Shift+G
//    → Search ビューに全呼び出し箇所が表示
//
// 2. フィールドの使用箇所を調べる
//    フィールド名にカーソル → Ctrl+Shift+G
//    → 読み取り/書き込みの区別も可能
//
// 3. クラスの使用箇所を調べる
//    クラス名にカーソル → Ctrl+Shift+G
//    → import、new、型宣言など全箇所
//
// 宣言ジャンプ:
//   F3 / Ctrl+クリック  → 宣言にジャンプ
//   Alt+←               → 前の位置に戻る
//   Alt+→               → 次の位置に進む`,
      },
      {
        title: "コールヒエラルキーと型階層",
        content:
          "コールヒエラルキー（Ctrl+Alt+H）はメソッドの呼び出し関係をツリー表示します。選択したメソッドを呼び出しているメソッドを上方向に、そのメソッドが呼び出しているメソッドを下方向に辿れます。型階層（Ctrl+T / F4）はクラスの継承関係を可視化します。",
        code: `// コールヒエラルキーの例
// UserService.findById() を選択して Ctrl+Alt+H
//
// ▼ 呼び出し元 (Caller Hierarchy)
// findById(Long)
//   ├── UserController.getUser()
//   │     └── DispatcherServlet.doDispatch()
//   ├── OrderService.createOrder()
//   │     └── OrderController.create()
//   └── UserServiceTest.testFindById()
//
// ▼ 呼び出し先 (Callee Hierarchy)
// findById(Long)
//   ├── UserRepository.findById()
//   ├── UserMapper.toDto()
//   └── Optional.orElseThrow()
//
// 型階層 (Ctrl+T):
// ▼ AbstractList
//   ├── ArrayList
//   ├── LinkedList
//   └── Vector
//       └── Stack`,
      },
    ],
  },

  // ===== デバッグ =====
  {
    id: "debug-basics",
    title: "デバッグの基本",
    category: "debug",
    description: "ブレークポイント、ステップ実行、変数ビューを使ったデバッグ手法",
    sections: [
      {
        title: "ブレークポイントの設定",
        content:
          "エディタの左端（マーカーバー）をダブルクリックするとブレークポイントを設定できます。ブレークポイントはプログラムの実行を指定行で一時停止させます。Ctrl+Shift+B でも切り替えられます。Breakpoints ビューで全ブレークポイントを一覧管理でき、一括有効/無効化も可能です。",
        code: `// ブレークポイントの種類
//
// 1. 行ブレークポイント（最も基本）
//    → エディタ左端をダブルクリック
//
// 2. メソッドブレークポイント
//    → メソッド宣言行に設定、メソッド入口/出口で停止
//
// 3. ウォッチポイント（フィールドブレークポイント）
//    → フィールド宣言に設定、値の読み書き時に停止
//
// 4. 例外ブレークポイント
//    → 特定の例外がスローされた時に停止
//    → Run > Add Java Exception Breakpoint
//    → NullPointerException を追加すると便利
//
// Breakpoints ビュー:
//   ✅/☐ で個別に有効/無効
//   右クリック > Disable All で一括無効化
//   Hit Count（N回目に停止）の設定も可能`,
      },
      {
        title: "ステップ実行",
        content:
          "デバッグ実行（F11）でブレークポイントに到達すると Debug パースペクティブに切り替わります。F5（ステップイン）でメソッド内に入り、F6（ステップオーバー）で次の行に進み、F7（ステップリターン）でメソッドから戻ります。F8 で次のブレークポイントまで実行を再開します。",
        code: `// ステップ実行の例
public void processOrder(Order order) {
    validate(order);        // ← F5: validate() の中に入る
                            //    F6: 次の行（calculate）に進む
    double total = calculate(order);  // ← F6 で次の行へ
    order.setTotal(total);            // ← 変数 total の値を確認
    save(order);                      // ← F7: processOrder を抜ける
}

// ステップ実行の操作まとめ:
// F5  Step Into    → メソッドの中に入る
// F6  Step Over    → メソッドを実行して次の行へ
// F7  Step Return  → 現在のメソッドを抜ける
// F8  Resume       → 次のブレークポイントまで実行
// Ctrl+R           → カーソル行まで実行（Run to Line）

// Drop to Frame: スタックフレームを選択して右クリック
// → メソッドの先頭からやり直し（副作用に注意）`,
      },
      {
        title: "変数ビューと式の評価",
        content:
          "Variables ビューでは現在のスコープで見えるすべての変数の値を確認できます。オブジェクトを展開してフィールドの中身も確認可能です。Expressions ビューに式を追加すると任意の Java 式をリアルタイムに評価できます。変数の値を右クリックで変更することもできます。",
        code: `// Variables ビューの使い方
//
// ローカル変数、引数、フィールドが自動表示
// オブジェクトはツリーで展開可能
// toString() の結果も表示される
//
// Expressions ビュー (Window > Show View > Expressions)
//   任意の式を追加して評価:
//   - list.size()
//   - user.getName().toUpperCase()
//   - order.getItems().stream().mapToInt(Item::getPrice).sum()
//
// 値の変更:
//   Variables ビューで値を右クリック > Change Value
//   → デバッグ中に値を変更してテスト可能
//
// Inspect（Ctrl+Shift+I）:
//   コード中の式を選択 → Ctrl+Shift+I
//   → ポップアップで式の評価結果を表示
//   → Watch に追加して常時監視も可能`,
      },
    ],
  },
  {
    id: "advanced-debug",
    title: "高度なデバッグ",
    category: "debug",
    description: "条件付きブレークポイント、リモートデバッグ、ホットコード置換",
    sections: [
      {
        title: "条件付きブレークポイント",
        content:
          "条件付きブレークポイントは指定した条件が true のときだけ停止します。ブレークポイントを右クリック > Breakpoint Properties で条件式を入力します。大量のループの中で特定の条件のときだけ停止させたい場合に非常に便利です。ヒットカウント（N回目に停止）との組み合わせも可能です。",
        code: `// 条件付きブレークポイントの設定
// ブレークポイントを右クリック > Breakpoint Properties
//
// 例1: 特定の値のときだけ停止
for (User user : users) {
    process(user);  // ← 条件: user.getName().equals("admin")
}

// 例2: null チェック
Object result = service.find(id);
// ← 条件: result == null

// 例3: 特定回数目で停止
for (int i = 0; i < 1000; i++) {
    calculate(i);   // ← Hit Count: 500（500回目で停止）
}

// Conditional のオプション:
//   Suspend when 'true':  条件が true なら停止
//   Hit count:            N回目の到達で停止
//   Trigger point:        このBPに到達後、他のBPを有効化`,
      },
      {
        title: "リモートデバッグ",
        content:
          "リモートデバッグは別の JVM で実行中のアプリケーションに Eclipse からデバッグ接続する機能です。サーバー上で動作するアプリケーションのデバッグに使います。対象の JVM をデバッグオプション付きで起動し、Eclipse から Remote Java Application として接続します。",
        code: `// 1. 対象アプリケーションをデバッグモードで起動
java -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005 \\
     -jar myapp.jar

// JVM オプションの意味:
//   transport=dt_socket  ソケット通信を使用
//   server=y             デバッガからの接続を待つ
//   suspend=n            起動時に待機しない（y なら接続まで待つ）
//   address=*:5005       ポート 5005 で待ち受け

// 2. Eclipse での接続
//   Run > Debug Configurations > Remote Java Application
//   - Project: 対象プロジェクト
//   - Host: localhost（またはリモートホスト）
//   - Port: 5005
//   → [Debug] をクリック

// Spring Boot の場合:
// application.properties に追加不要、起動時にオプション指定
// mvn spring-boot:run -Dspring-boot.run.jvmArguments=
//     "-agentlib:jdwp=transport=dt_socket,server=y,address=5005"`,
      },
      {
        title: "ホットコード置換（Hot Code Replace）",
        content:
          "ホットコード置換はデバッグ中にソースコードを変更して即座に反映させる機能です。メソッド本体の変更であれば JVM を再起動せずに反映されます。ただしメソッドの追加・削除、フィールドの変更、クラスの構造変更は Hot Code Replace できないため、再起動が必要です。",
        code: `// ホットコード置換の使い方
//
// 1. デバッグ実行中にソースコードを編集
// 2. Ctrl+S で保存 → 自動的にコードが置換される
// 3. ステップ実行で変更が反映されていることを確認
//
// ✅ 対応する変更:
//   - メソッド内のロジック変更
//   - ローカル変数の追加・変更
//   - 条件分岐の変更
//
// ❌ 対応しない変更:
//   - メソッドの追加・削除
//   - メソッドのシグネチャ変更
//   - フィールドの追加・削除
//   - クラスの追加・削除
//   - enum 定数の変更
//
// 設定: Window > Preferences > Java > Debug
//   ✅ Enable hot code replace when launching
//   ✅ Show error when hot code replace fails`,
      },
    ],
  },

  {
    id: "debug-tools",
    title: "デバッグツールの使い方",
    category: "debug",
    description: "Display ビュー、メモリ解析、スレッドダンプ、プロファイリングなど Eclipse のデバッグツールを活用",
    sections: [
      {
        title: "Display ビューと Debug Shell",
        content:
          "Display ビュー（Window > Show View > Display）はデバッグ中に任意の Java コードを記述・実行できる強力なツールです。変数の値を変更したり、メソッドを呼び出したり、一時的なコードを試すことができます。選択したコードを Ctrl+Shift+D で実行（Display）、Ctrl+Shift+I で評価（Inspect）できます。",
        code: `// Display ビューの使い方
//
// 1. デバッグ中に Window > Show View > Display を開く
// 2. Display ビューに Java コードを入力
// 3. コードを選択して実行
//
// 実行方法:
//   Ctrl+Shift+D  → 結果を Display ビューに表示
//   Ctrl+Shift+I  → 結果をポップアップで表示
//   Ctrl+U        → コードを実行（戻り値なし）
//
// 使用例:
// ① 変数の中身を整形して確認
user.toString()
Arrays.toString(items.toArray())
list.stream().map(Object::toString).collect(Collectors.joining("\\n"))

// ② 変数の値を強制的に変更
user.setName("テストユーザー")
counter = 100

// ③ private メソッドの呼び出し
var method = obj.getClass().getDeclaredMethod("privateMethod");
method.setAccessible(true);
method.invoke(obj);`,
      },
      {
        title: "メモリ解析とヒープダンプ",
        content:
          "Eclipse Memory Analyzer（MAT）を使うと、ヒープダンプを解析してメモリリークの原因を特定できます。デバッグ中に Debug ビューのツールバーから「Monitor」ボタンでメモリ使用量を監視でき、OutOfMemoryError 発生時にヒープダンプを自動取得する設定も可能です。",
        code: `// ヒープダンプの取得と解析
//
// 1. JVM オプションで自動取得を設定
//    Run Configurations > Arguments > VM arguments:
//    -XX:+HeapDumpOnOutOfMemoryError
//    -XX:HeapDumpPath=/tmp/heapdump.hprof
//
// 2. 手動でヒープダンプを取得
//    jmap -dump:format=b,file=heap.hprof <PID>
//    または: jcmd <PID> GC.heap_dump heap.hprof
//
// 3. Eclipse MAT で解析
//    File > Open Heap Dump > heap.hprof
//
// MAT の主要機能:
//   Leak Suspects Report  → メモリリーク候補を自動検出
//   Dominator Tree        → メモリ占有量の大きいオブジェクト
//   Histogram             → クラス別のインスタンス数・サイズ
//   Top Consumers         → メモリ消費の多いオブジェクト群
//   Path to GC Roots      → GC ルートまでの参照パス
//                           （なぜ回収されないか）
//
// MAT のインストール:
//   Help > Eclipse Marketplace > "Memory Analyzer" で検索`,
      },
      {
        title: "スレッドダンプとデッドロック検出",
        content:
          "マルチスレッドアプリケーションのデバッグでは Debug ビューのスレッド一覧が重要です。各スレッドのスタックトレースを確認でき、デッドロックの検出にも使えます。スレッドを個別に一時停止・再開させたり、特定スレッドだけをステップ実行することも可能です。",
        code: `// スレッドデバッグの操作
//
// Debug ビューのスレッド一覧:
// ┌──────────────────────────────────┐
// │ ▼ MyApp [Java Application]       │
// │   ├── Thread [main] (Suspended)  │
// │   │     └── MyApp.main() line: 15│
// │   ├── Thread [worker-1] (Running)│
// │   ├── Thread [worker-2] (Blocked)│
// │   └── Thread [pool-1] (Waiting)  │
// └──────────────────────────────────┘
//
// スレッド操作:
//   スレッド右クリック > Suspend    → 個別に一時停止
//   スレッド右クリック > Resume     → 個別に再開
//   スレッド選択 → F5/F6/F7        → そのスレッドをステップ実行
//
// デッドロックの検出:
//   1. 全スレッドが Blocked/Waiting の場合
//   2. 各スレッドのスタックトレースでロック対象を確認
//   3. synchronized ブロックの取得順序をチェック
//
// jstack でスレッドダンプ取得:
//   jstack <PID> > thread_dump.txt
//   → "Found N deadlocks" でデッドロック検出`,
      },
    ],
  },

  // ===== リファクタリング =====
  {
    id: "refactoring-basics",
    title: "リファクタリング機能",
    category: "refactoring",
    description: "リネーム、メソッド抽出、変数抽出で安全にコードを改善",
    sections: [
      {
        title: "リネーム（Rename）",
        content:
          "Alt+Shift+R でクラス、メソッド、変数、パッケージなどの名前を安全に変更できます。テキスト置換と異なり、Java の構文を理解した上で参照箇所を正確に更新します。プレビューで変更箇所を確認してから適用できるため、大規模なリネームも安心して実行できます。",
        code: `// リネームの例
//
// 1. 変数のリネーム
int cnt = 0;  // cnt にカーソル → Alt+Shift+R → count に変更
// → 同一スコープ内の全ての cnt が count に変更される

// 2. メソッドのリネーム
public void calc() { ... }
// calc にカーソル → Alt+Shift+R → calculate に変更
// → 全呼び出し箇所も自動更新

// 3. クラスのリネーム
public class UserDto { ... }
// UserDto にカーソル → Alt+Shift+R → UserResponse に変更
// → ファイル名、import、参照箇所すべて更新

// 4. パッケージのリネーム
// Package Explorer でパッケージ選択 → Alt+Shift+R
// → サブパッケージ、import 文もすべて更新

// インラインリネーム:
// 変数にカーソル → Alt+Shift+R → 直接入力して Enter`,
      },
      {
        title: "メソッド抽出（Extract Method）",
        content:
          "コードの一部を選択して Alt+Shift+M でメソッドとして抽出できます。Eclipse が自動的に引数と戻り値を分析し、適切なメソッドシグネチャを生成します。長いメソッドを意味のある単位に分割する際に使います。例外処理やローカル変数も正しくハンドリングされます。",
        code: `// メソッド抽出の例
// Before: 長いメソッド
public void processOrder(Order order) {
    // ---- ここから選択 ----
    if (order.getTotal() <= 0) {
        throw new IllegalArgumentException("Invalid total");
    }
    if (order.getItems().isEmpty()) {
        throw new IllegalArgumentException("No items");
    }
    // ---- ここまで選択して Alt+Shift+M ----

    double discount = calculateDiscount(order);
    order.setTotal(order.getTotal() - discount);
    repository.save(order);
}

// After: メソッド抽出後
public void processOrder(Order order) {
    validateOrder(order);  // ← 抽出されたメソッド
    double discount = calculateDiscount(order);
    order.setTotal(order.getTotal() - discount);
    repository.save(order);
}

private void validateOrder(Order order) {
    if (order.getTotal() <= 0) {
        throw new IllegalArgumentException("Invalid total");
    }
    if (order.getItems().isEmpty()) {
        throw new IllegalArgumentException("No items");
    }
}`,
      },
      {
        title: "変数抽出と定数抽出",
        content:
          "式を選択して Alt+Shift+L で変数として抽出（Extract Local Variable）、Ctrl+1 > Extract to constant で定数として抽出できます。マジックナンバーや複雑な式に名前を付けてコードの可読性を向上させます。インライン化（Alt+Shift+I）で逆に変数を式に戻すことも可能です。",
        code: `// 変数抽出の例 (Alt+Shift+L)
// Before:
if (order.getTotal() * 1.1 > 10000) { ... }

// order.getTotal() * 1.1 を選択 → Alt+Shift+L
// After:
double totalWithTax = order.getTotal() * 1.1;
if (totalWithTax > 10000) { ... }

// 定数抽出の例
// Before:
if (retryCount > 3) { ... }

// 3 を選択 → Ctrl+1 > Extract to constant
// After:
private static final int MAX_RETRY_COUNT = 3;
// ...
if (retryCount > MAX_RETRY_COUNT) { ... }

// インライン化 (Alt+Shift+I) - 逆操作
// 変数にカーソル → Alt+Shift+I
// → 変数の使用箇所が元の式に置換される`,
      },
    ],
  },
  {
    id: "code-generation",
    title: "コード生成",
    category: "refactoring",
    description: "getter/setter、コンストラクタ、equals/hashCode の自動生成",
    sections: [
      {
        title: "getter/setter の生成",
        content:
          "Source > Generate Getters and Setters（Alt+Shift+S → R）でフィールドに対する getter/setter を一括生成できます。生成するメソッドを個別に選択でき、挿入位置やソート順も指定可能です。Lombok を使う場合は @Getter/@Setter アノテーションで代替できます。",
        code: `// フィールドを定義
public class User {
    private Long id;
    private String name;
    private String email;
    private LocalDateTime createdAt;
}

// Alt+Shift+S → R（Generate Getters and Setters）
// → 生成するフィールドを選択 → [Generate]

// 生成結果:
public Long getId() { return id; }
public void setId(Long id) { this.id = id; }
public String getName() { return name; }
public void setName(String name) { this.name = name; }
public String getEmail() { return email; }
public void setEmail(String email) { this.email = email; }
public LocalDateTime getCreatedAt() { return createdAt; }
public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
}`,
      },
      {
        title: "コンストラクタの生成",
        content:
          "Source > Generate Constructor using Fields（Alt+Shift+S → O）でフィールドを引数に取るコンストラクタを生成します。初期化するフィールドを選択でき、スーパークラスのコンストラクタ呼び出しも自動挿入されます。",
        code: `// Alt+Shift+S → O（Generate Constructor using Fields）
// → フィールドを選択 → [Generate]

public class User {
    private Long id;
    private String name;
    private String email;

    // 生成されたコンストラクタ
    public User(Long id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}

// スーパークラスのコンストラクタ:
// Source > Generate Constructors from Superclass
// → 親クラスのコンストラクタをオーバーライド

public class AdminUser extends User {
    private String role;

    public AdminUser(Long id, String name, String email, String role) {
        super(id, name, email);
        this.role = role;
    }
}`,
      },
      {
        title: "equals/hashCode と toString の生成",
        content:
          "Source > Generate hashCode() and equals()（Alt+Shift+S → H）でオブジェクトの等価比較メソッドを生成します。比較に使うフィールドを選択できます。Source > Generate toString()（Alt+Shift+S → S）でデバッグに便利な toString メソッドも生成できます。",
        code: `// Alt+Shift+S → H（Generate hashCode() and equals()）
// → 比較に使うフィールドを選択 → [Generate]

@Override
public int hashCode() {
    return Objects.hash(id, email);
}

@Override
public boolean equals(Object obj) {
    if (this == obj) return true;
    if (obj == null) return false;
    if (getClass() != obj.getClass()) return false;
    User other = (User) obj;
    return Objects.equals(id, other.id)
        && Objects.equals(email, other.email);
}

// Alt+Shift+S → S（Generate toString()）
@Override
public String toString() {
    return "User [id=" + id + ", name=" + name
         + ", email=" + email + "]";
}

// Java 16+ では record を使うと自動生成不要:
public record User(Long id, String name, String email) {}
// → equals, hashCode, toString が自動実装される`,
      },
    ],
  },

  // ===== ビルド・実行 =====
  {
    id: "maven-gradle",
    title: "Maven / Gradle 連携",
    category: "build",
    description: "Maven/Gradle プロジェクトの作成、依存関係管理、Eclipse でのビルド実行",
    sections: [
      {
        title: "Maven プロジェクト",
        content:
          "Eclipse には M2Eclipse（m2e）プラグインが内蔵されており、Maven プロジェクトをネイティブにサポートします。pom.xml を編集すると自動的に依存関係がダウンロードされ、ビルドパスに追加されます。Maven ビルドは Run As > Maven build で実行でき、ゴール（clean, install 等）を指定します。",
        code: `<!-- pom.xml の例 -->
<project>
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.example</groupId>
  <artifactId>my-app</artifactId>
  <version>1.0-SNAPSHOT</version>

  <properties>
    <maven.compiler.source>21</maven.compiler.source>
    <maven.compiler.target>21</maven.compiler.target>
  </properties>

  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
      <version>3.3.0</version>
    </dependency>
  </dependencies>
</project>

<!-- Eclipse での操作 -->
<!-- 依存関係更新: プロジェクト右クリック > Maven > Update Project (Alt+F5) -->
<!-- ビルド: プロジェクト右クリック > Run As > Maven build > Goals: clean install -->`,
      },
      {
        title: "Gradle プロジェクト",
        content:
          "Buildship プラグインにより Gradle プロジェクトも Eclipse で管理できます。build.gradle の変更は Gradle > Refresh Gradle Project で反映させます。Gradle タスクは Gradle Tasks ビューからダブルクリックで実行できます。",
        code: `// build.gradle の例
plugins {
    id 'java'
    id 'org.springframework.boot' version '3.3.0'
    id 'io.spring.dependency-management' version '1.1.5'
}

group = 'com.example'
version = '1.0-SNAPSHOT'

java {
    sourceCompatibility = JavaVersion.VERSION_21
}

repositories {
    mavenCentral()
}

dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-web'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
}

// Eclipse での操作:
// プロジェクト同期: 右クリック > Gradle > Refresh Gradle Project
// タスク実行: Gradle Tasks ビュー > build > ダブルクリック
// または: Run As > Gradle Build > Tasks: clean build`,
      },
      {
        title: "依存関係の管理",
        content:
          "Maven/Gradle の依存関係は Eclipse のビルドパスに自動反映されます。Maven Dependencies や Gradle Dependencies としてライブラリが一覧表示され、JAR の中身やソースコード、Javadoc もダウンロードして閲覧できます。依存関係のツリー表示で推移的依存関係も確認できます。",
        code: `// 依存関係の確認と管理
//
// Maven:
//   pom.xml を開く > Dependency Hierarchy タブ
//   → ツリー構造で推移的依存関係を確認
//   → 競合する依存関係の特定にも便利
//
// コマンドでも確認:
//   Run As > Maven build > Goals: dependency:tree
//
// Gradle:
//   Gradle Tasks ビュー > dependencies タスク実行
//
// ソースコードの添付:
//   Maven: 自動ダウンロード（設定による）
//   Preferences > Maven > Download Artifact Sources ✅
//   Preferences > Maven > Download Artifact JavaDoc ✅
//
// ライブラリの JAR 内を確認:
//   Package Explorer > Maven Dependencies
//   → JAR を展開するとクラス一覧が表示される
//   → ソースがあればコードも閲覧可能`,
      },
    ],
  },
  {
    id: "run-config",
    title: "実行構成",
    category: "build",
    description: "実行/デバッグ構成、JVM 引数、環境変数の設定",
    sections: [
      {
        title: "実行構成の作成と管理",
        content:
          "Run > Run Configurations で実行構成を管理します。Java Application、Maven Build、JUnit テストなど種類ごとに構成を作成でき、メインクラス、引数、環境変数を個別に設定できます。よく使う構成はお気に入りに登録してツールバーから素早く起動できます。",
        code: `// 実行構成の作成手順
// Run > Run Configurations > Java Application > [New]
//
// Main タブ:
//   Project: my-app
//   Main class: com.example.Application
//   ☐ Stop in main (デバッグ時にmainで自動停止)
//
// Arguments タブ:
//   Program arguments: --server.port=9090
//   VM arguments: -Xmx512m -Dspring.profiles.active=dev
//
// Environment タブ:
//   [New] で環境変数を追加
//   DB_HOST=localhost
//   DB_PORT=5432
//
// お気に入り登録:
//   Common タブ > Display in favorites menu
//   ✅ Run / ✅ Debug
//   → ツールバーのドロップダウンに表示される`,
      },
      {
        title: "JVM 引数の設定",
        content:
          "実行構成の Arguments タブで JVM 引数を設定します。ヒープサイズ（-Xmx, -Xms）、システムプロパティ（-D）、ガベージコレクタの選択など、アプリケーションの動作を制御する重要な設定を行えます。プロファイリングやリモートデバッグ用の引数もここで指定します。",
        code: `// よく使う JVM 引数
//
// メモリ設定:
//   -Xms256m          初期ヒープサイズ
//   -Xmx1024m         最大ヒープサイズ
//   -XX:MaxMetaspaceSize=256m  Metaspace上限
//
// システムプロパティ:
//   -Dspring.profiles.active=dev
//   -Dfile.encoding=UTF-8
//   -Duser.timezone=Asia/Tokyo
//
// GC 設定:
//   -XX:+UseG1GC
//   -XX:+PrintGCDetails
//
// デバッグ・プロファイリング:
//   -agentlib:jdwp=transport=dt_socket,server=y,address=5005
//   -XX:+HeapDumpOnOutOfMemoryError
//   -XX:HeapDumpPath=/tmp/heapdump.hprof
//
// Eclipse 変数の利用:
//   \${project_loc}    プロジェクトのパス
//   \${workspace_loc}  ワークスペースのパス`,
      },
      {
        title: "プログラム引数と環境変数",
        content:
          "プログラム引数（Program arguments）は main メソッドの args に渡される値です。環境変数（Environment）は OS の環境変数を上書き・追加できます。Eclipse 変数（\${workspace_loc} 等）も使用可能で、ポータブルな構成を作れます。",
        code: `// プログラム引数の例
// Arguments タブ > Program arguments:
--spring.config.location=classpath:/application-dev.yml
--server.port=8081
input.csv output.csv

// main メソッドで受け取る:
public static void main(String[] args) {
    // args[0] = "--spring.config.location=..."
    // args[1] = "--server.port=8081"
    // args[2] = "input.csv"
    // args[3] = "output.csv"
}

// 環境変数の例
// Environment タブ > [New]:
//   JAVA_TOOL_OPTIONS = -Dfile.encoding=UTF-8
//   APP_ENV           = development
//   DATABASE_URL      = jdbc:postgresql://localhost:5432/mydb
//
// ☐ Append environment to native environment
//   → チェックを外すと OS の環境変数を引き継がない
//   → 通常はチェックを入れておく

// Eclipse 変数:
//   \${project_loc}     → /home/user/workspace/my-app
//   \${project_name}    → my-app
//   \${resource_loc}    → 選択中のファイルパス`,
      },
    ],
  },
  {
    id: "junit-testing",
    title: "JUnit テスト",
    category: "build",
    description: "テストの作成・実行、カバレッジ計測の方法",
    sections: [
      {
        title: "テストクラスの作成と実行",
        content:
          "テスト対象クラスを右クリック > New > JUnit Test Case でテストクラスを自動生成できます。テストしたいメソッドを選択すると、テストメソッドの雛形が作られます。テストの実行は右クリック > Run As > JUnit Test、またはクラス/メソッドにカーソルを置いて Ctrl+F11 で実行します。",
        code: `// テストクラスの生成手順
// 1. テスト対象クラスを右クリック > New > JUnit Test Case
// 2. JUnit Jupiter (JUnit 5) を選択
// 3. テストするメソッドを選択 → [Finish]

// 生成されたテストクラス:
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class CalculatorTest {

    @Test
    void testAdd() {
        Calculator calc = new Calculator();
        assertEquals(5, calc.add(2, 3));
    }

    @Test
    void testDivide() {
        Calculator calc = new Calculator();
        assertEquals(2.5, calc.divide(5, 2));
    }

    @Test
    void testDivideByZero() {
        Calculator calc = new Calculator();
        assertThrows(ArithmeticException.class,
            () -> calc.divide(1, 0));
    }
}

// 実行: テストクラス/メソッドを右クリック > Run As > JUnit Test`,
      },
      {
        title: "JUnit ビューの活用",
        content:
          "テスト実行後、JUnit ビューに結果が表示されます。緑のバーは全テスト成功、赤のバーは失敗があることを示します。失敗したテストをクリックすると期待値と実際の値の差分が表示され、スタックトレースからソースコードにジャンプできます。テストの再実行もワンクリックで行えます。",
        code: `// JUnit ビューの機能
//
// ┌──────────────────────────────┐
// │ JUnit [緑バー: 5/5 passed]  │
// ├──────────────────────────────┤
// │ ✅ CalculatorTest            │
// │   ✅ testAdd         (0.01s) │
// │   ✅ testSubtract    (0.00s) │
// │   ✅ testMultiply    (0.00s) │
// │   ✅ testDivide      (0.01s) │
// │   ✅ testDivideByZero(0.00s) │
// └──────────────────────────────┘
//
// 失敗時:
// ┌──────────────────────────────┐
// │ JUnit [赤バー: 4/5, 1 fail] │
// │   ❌ testAdd                 │
// │   Failure Trace:             │
// │   Expected: 5                │
// │   Actual:   4                │
// └──────────────────────────────┘
//
// 操作:
//   🔄 全テスト再実行
//   🔄 失敗テストのみ再実行
//   📋 テスト結果のコピー`,
      },
      {
        title: "コードカバレッジ",
        content:
          "Eclipse には EclEmma（JaCoCo）プラグインが内蔵されており、テストのコードカバレッジを計測できます。テストを Coverage As > JUnit Test で実行すると、ソースコードが色分け表示されます。緑は実行された行、赤は未実行の行、黄色は分岐の一部のみ実行された行を示します。",
        code: `// カバレッジ実行
// テストクラス右クリック > Coverage As > JUnit Test
//
// エディタでの色分け:
//   🟩 緑: 実行された行
//   🟥 赤: 実行されていない行
//   🟨 黄: 分岐の一部のみ実行（if の true だけ等）
//
// Coverage ビュー:
// ┌──────────────────────────────────────┐
// │ Element         │ Coverage │ Covered │
// ├──────────────────────────────────────┤
// │ com.example     │  85.3%   │ 52/61   │
// │  Calculator     │  92.0%   │ 23/25   │
// │  UserService    │  78.6%   │ 29/36   │
// └──────────────────────────────────────┘
//
// カバレッジレポートのエクスポート:
// Coverage ビューで右クリック > Export Session
// → HTML / CSV / XML 形式で出力可能
//
// 目標: 行カバレッジ 80% 以上を目指す`,
      },
    ],
  },

  // ===== プラグイン・カスタマイズ =====
  {
    id: "marketplace",
    title: "Eclipse Marketplace",
    category: "plugins",
    description: "プラグインのインストール方法とおすすめプラグイン",
    sections: [
      {
        title: "Marketplace の使い方",
        content:
          "Help > Eclipse Marketplace で公式のプラグインストアにアクセスできます。キーワード検索やカテゴリ別にプラグインを探せます。Install ボタンをクリックするだけでインストールでき、Eclipse の再起動後に有効になります。インストール済みプラグインの更新もここから行えます。",
        code: `// Marketplace からのインストール手順
// 1. Help > Eclipse Marketplace
// 2. 検索欄にプラグイン名を入力
// 3. [Install] をクリック
// 4. ライセンスを確認 → [Finish]
// 5. Eclipse を再起動
//
// 手動インストール（更新サイト経由）:
// 1. Help > Install New Software
// 2. [Add] で更新サイト URL を追加
//    Name: プラグイン名
//    Location: https://example.com/update-site
// 3. プラグインを選択 → [Next] → [Finish]
//
// プラグインの管理:
// Help > About Eclipse IDE > Installation Details
//   → インストール済みプラグインの一覧
//   → 不要なプラグインのアンインストール`,
      },
      {
        title: "おすすめプラグイン",
        content:
          "Eclipse の機能を拡張するおすすめプラグインを紹介します。Spring Tools（Spring Boot 開発）、SonarLint（コード品質）、Checkstyle（コーディング規約）、SpotBugs（バグ検出）、EclEmma（カバレッジ）は Java 開発で特に有用です。",
        code: `// おすすめプラグイン一覧
//
// 【開発支援】
// Spring Tools 4      - Spring Boot の自動補完、実行支援
// Lombok               - @Getter/@Setter 等のアノテーション対応
// WindowBuilder        - GUI ビルダー（Swing/SWT）
//
// 【コード品質】
// SonarLint            - コード品質・脆弱性のリアルタイム検出
// Checkstyle           - コーディング規約チェック
// SpotBugs             - バグパターン検出（旧 FindBugs）
// PMD                  - 静的コード解析
//
// 【ユーティリティ】
// AnyEdit Tools        - テキスト変換（大文字↔小文字等）
// Eclipse Color Theme  - エディタのカラーテーマ
// Enhanced Class       - .class ファイルの逆コンパイル表示
//   Decompiler
//
// 【バージョン管理】
// EGit                 - Git 連携（標準搭載）
// Subversive           - SVN 連携`,
      },
      {
        title: "プラグインのトラブルシューティング",
        content:
          "プラグインの競合やエラーが発生した場合は、Eclipse を -clean オプションで起動するとキャッシュがクリアされます。問題が解決しない場合は Error Log ビューでエラーの詳細を確認し、該当プラグインをアンインストールします。",
        code: `// トラブルシューティング手順
//
// 1. キャッシュクリア起動
//    eclipse -clean
//    → プラグインのキャッシュを再構築
//
// 2. エラーログの確認
//    Window > Show View > Error Log
//    → スタックトレースからプラグインを特定
//
// 3. セーフモード起動（プラグイン無効）
//    eclipse -debug
//
// 4. 設定のリセット
//    ワークスペース/.metadata/.plugins/ の該当フォルダを削除
//
// 5. プラグインのアンインストール
//    Help > About > Installation Details
//    → プラグインを選択 > [Uninstall]
//
// 6. 新しいワークスペースで起動
//    eclipse -data /path/to/new/workspace
//    → 設定の問題かプラグインの問題かを切り分け
//
// ログファイルの場所:
//    workspace/.metadata/.log`,
      },
    ],
  },
  {
    id: "preferences",
    title: "設定のカスタマイズ",
    category: "plugins",
    description: "テーマ、フォント、保存アクション、コードスタイルのカスタマイズ",
    sections: [
      {
        title: "テーマとフォント",
        content:
          "Window > Preferences > General > Appearance でテーマを変更できます。Eclipse 標準ではライトテーマとダークテーマが選べます。フォントは Preferences > General > Appearance > Colors and Fonts で設定します。プログラミング向けフォント（JetBrains Mono、Fira Code 等）の利用を推奨します。",
        code: `// テーマ設定
// Window > Preferences > General > Appearance
//   Theme: Dark / Light / Classic
//
// フォント設定
// Window > Preferences > General > Appearance > Colors and Fonts
//   Basic > Text Font: JetBrains Mono 14
//   Java > Java Editor Text Font: （テキストフォントを使用）
//
// おすすめプログラミングフォント:
//   - JetBrains Mono（リガチャ対応）
//   - Fira Code（リガチャ対応）
//   - Source Code Pro
//   - Cascadia Code（Microsoft）
//   - HackGen（日本語対応の等幅フォント）
//
// ダークテーマの追加カスタマイズ:
// Eclipse Color Theme プラグインで Monokai, Dracula 等を選択
// → エディタの配色をさらにカスタマイズ可能`,
      },
      {
        title: "保存アクションとクリーンアップ",
        content:
          "保存アクション（Save Actions）はファイル保存時に自動実行されるアクションです。コードフォーマット、import の整理、@Override の付与、不要な修飾子の除去など、コードの品質を保つための設定を自動化できます。チームで設定を共有するとコードスタイルが統一されます。",
        code: `// 保存アクションの設定
// Window > Preferences > Java > Editor > Save Actions
//
// ✅ Perform the selected actions on save
//
// Format:
//   ✅ Format source code（ソースコードの整形）
//      ○ Format all lines / ● Format edited lines
//   ✅ Organize imports（import の整理）
//
// Additional actions > [Configure]:
//   Code Organizing:
//     ✅ Remove trailing whitespace
//     ✅ Correct indentation
//   Code Style:
//     ✅ Use blocks in if/while/for/do statements
//     ✅ Use parentheses in expressions
//   Member Accesses:
//     ✅ Use 'this' qualifier for field accesses
//   Missing Code:
//     ✅ Add missing @Override annotations
//     ✅ Add missing @Deprecated annotations
//   Unnecessary Code:
//     ✅ Remove unnecessary casts
//     ✅ Remove unnecessary '$NON-NLS$' tags`,
      },
      {
        title: "コードスタイルとテンプレート",
        content:
          "コードスタイルの設定はチーム全体で共有できます。Clean Up プロファイル、Formatter プロファイル、Code Templates をエクスポートして共有することで、プロジェクト全体で一貫したコーディングスタイルを維持できます。プロジェクト固有の設定はプロジェクトの .settings フォルダに保存されます。",
        code: `// コードスタイルの共有
//
// 1. フォーマッター設定のエクスポート
//    Preferences > Java > Code Style > Formatter
//    [Export] → team-formatter.xml
//
// 2. クリーンアップ設定のエクスポート
//    Preferences > Java > Code Style > Clean Up
//    [Export] → team-cleanup.xml
//
// 3. コードテンプレートのエクスポート
//    Preferences > Java > Code Style > Code Templates
//    [Export All] → team-codetemplates.xml
//
// プロジェクト固有設定の有効化:
//   プロジェクト右クリック > Properties > Java Code Style
//   ✅ Enable project specific settings
//   → .settings/org.eclipse.jdt.core.prefs に保存
//   → Git で共有可能
//
// チームでの運用:
//   .settings/ フォルダをバージョン管理に含める
//   → メンバー全員が同じ設定で開発できる`,
      },
    ],
  },
  {
    id: "git-integration",
    title: "Git 連携",
    category: "plugins",
    description: "EGit によるコミット、ブランチ、マージ、競合解決の操作",
    sections: [
      {
        title: "EGit の基本操作",
        content:
          "EGit は Eclipse 標準の Git プラグインです。Git Staging ビューでファイルのステージング、コミットメッセージの入力、コミットを行えます。Package Explorer のファイルアイコンに Git の状態（変更、追加、競合等）が表示され、変更状態を一目で確認できます。",
        code: `// Git Staging ビューでのコミット手順
// Window > Show View > Git > Git Staging
//
// ┌─────────────────────────────┐
// │ Unstaged Changes            │
// │   modified: UserService.java│
// │   new file: Config.java     │
// ├─────────────────────────────┤
// │ Staged Changes              │
// │   （ドラッグ or + でステージ）│
// ├─────────────────────────────┤
// │ Commit Message:             │
// │ [feat: Add user config]     │
// │                             │
// │ [Commit] [Commit and Push]  │
// └─────────────────────────────┘
//
// ファイルアイコンの装飾:
//   > 変更あり（dirty）
//   + 新規追加（untracked → staged）
//   ⚡ 競合（conflict）
//   ✓ 追跡済み（tracked, clean）
//
// 右クリックメニュー:
//   Team > Commit / Push / Pull / Fetch`,
      },
      {
        title: "ブランチとマージ",
        content:
          "Team > Switch To でブランチの切り替え、Team > Merge でマージを行います。Git Repositories ビューではブランチの作成・削除・リネームが可能です。History ビューではコミット履歴をグラフ表示で確認でき、任意のコミットにチェックアウトすることもできます。",
        code: `// ブランチ操作
//
// ブランチ作成:
//   Team > Switch To > New Branch
//   Source: main（派生元）
//   Branch name: feature/user-auth
//   ✅ Checkout new branch
//
// ブランチ切替:
//   Team > Switch To > feature/user-auth
//   または: Ctrl+3 > "Switch" と入力
//
// マージ:
//   1. マージ先ブランチ（main）にチェックアウト
//   2. Team > Merge > feature/user-auth を選択
//   3. [Merge]
//
// History ビュー:
//   Team > Show in History
//   → コミットグラフ、メッセージ、変更ファイルを確認
//   → コミット右クリック > Cherry Pick / Revert
//
// リモート操作:
//   Team > Push Branch   → リモートにプッシュ
//   Team > Pull          → リモートからプル
//   Team > Fetch         → リモート情報を取得`,
      },
      {
        title: "競合解決",
        content:
          "マージやプルで競合が発生すると、ファイルアイコンに競合マークが表示されます。Team > Merge Tool で 3-way マージエディタが開き、ローカルの変更とリモートの変更を比較しながら解決できます。解決後は Team > Add to Index でステージングし、コミットします。",
        code: `// 競合解決の手順
//
// 1. 競合の発生（マージ/プル後）
//    Package Explorer で ⚡ マークのファイルを確認
//
// 2. マージツールを開く
//    競合ファイルを右クリック > Team > Merge Tool
//
// ┌─────────┬──────────┬─────────┐
// │  Local  │ Ancestor │ Remote  │
// │ (自分)  │ (共通)   │(相手)   │
// ├─────────┴──────────┴─────────┤
// │          Result              │
// │  （マージ結果をここで編集）   │
// └──────────────────────────────┘
//
// 3. 手動で競合を解決
//    <<<<<<< HEAD
//    自分の変更
//    =======
//    相手の変更
//    >>>>>>> feature-branch
//
// 4. 解決後のステージング
//    右クリック > Team > Add to Index
//
// 5. コミット
//    Git Staging ビューでコミットメッセージを入力 → [Commit]`,
      },
    ],
  },
];
