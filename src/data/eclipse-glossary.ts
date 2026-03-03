export interface EclipseGlossaryTerm {
  term: string;
  reading?: string;
  category: string;
  description: string;
  related?: string[];
  code?: string;
}

export const eclipseGlossaryCategories = [
  { id: "ui", name: "UI・画面構成", color: "var(--color-dads-purple)" },
  { id: "editor", name: "エディタ・編集", color: "var(--color-dads-blue)" },
  { id: "debug", name: "デバッグ", color: "var(--color-dads-error)" },
  { id: "build", name: "ビルド・実行", color: "var(--color-dads-warning)" },
  { id: "refactoring", name: "リファクタリング", color: "var(--color-dads-success)" },
  { id: "plugin", name: "プラグイン・拡張", color: "var(--color-dads-cyan)" },
  { id: "vcs", name: "バージョン管理", color: "var(--color-dads-navy)" },
] as const;

export const eclipseGlossaryTerms: EclipseGlossaryTerm[] = [
  // ===== UI・画面構成 =====
  {
    term: "ワークスペース",
    reading: "ワークスペース",
    category: "ui",
    description:
      "Eclipse がプロジェクトや設定情報を管理するディレクトリ。起動時に選択でき、用途別に複数使い分けられる。.metadata フォルダに設定が保存される。",
    related: ["プロジェクト", "パースペクティブ", ".metadata"],
  },
  {
    term: "パースペクティブ",
    reading: "パースペクティブ",
    category: "ui",
    description:
      "ビュー・エディタ・メニュー・ツールバーの配置セット。作業内容に応じて切り替える。Java パースペクティブ、Debug パースペクティブ、Git パースペクティブなどがある。",
    related: ["ビュー", "エディタ", "ワークベンチ"],
    code: `// パースペクティブの切替
// Window > Perspective > Open Perspective > Java / Debug / Git
// ショートカット: Ctrl+F8`,
  },
  {
    term: "ビュー",
    reading: "ビュー",
    category: "ui",
    description:
      "補助的な情報を表示するパネル。Package Explorer、Console、Problems、Outline などがある。Window > Show View から追加でき、ドラッグで自由に配置変更可能。",
    related: ["パースペクティブ", "エディタ", "Package Explorer", "Console ビュー"],
  },
  {
    term: "エディタ",
    reading: "エディタ",
    category: "ui",
    description:
      "ソースコードを編集する中央領域。複数ファイルをタブで切り替え可能。分割表示やタブのダブルクリックで最大化もできる。左端のマーカーバーにブレークポイントやエラーが表示される。",
    related: ["ビュー", "マーカーバー", "Content Assist"],
  },
  {
    term: "ワークベンチ",
    reading: "ワークベンチ",
    category: "ui",
    description:
      "Eclipse のメインウィンドウ全体のこと。メニューバー、ツールバー、パースペクティブ（ビュー＋エディタ）で構成される。",
    related: ["パースペクティブ", "ビュー", "エディタ"],
  },
  {
    term: "Package Explorer",
    reading: "パッケージエクスプローラー",
    category: "ui",
    description:
      "プロジェクト・パッケージ・ファイルをツリー表示するビュー。Java パースペクティブのデフォルトナビゲーター。ファイルの作成、削除、リファクタリングの起点になる。",
    related: ["Project Explorer", "ビュー", "Navigator"],
  },
  {
    term: "Project Explorer",
    reading: "プロジェクトエクスプローラー",
    category: "ui",
    description:
      "Package Explorer と似たファイルナビゲーションビューだが、Java パッケージ構造ではなくディレクトリ構造でファイルを表示する。非 Java プロジェクトでも使いやすい。",
    related: ["Package Explorer", "ビュー"],
  },
  {
    term: "Outline ビュー",
    reading: "アウトラインビュー",
    category: "ui",
    description:
      "現在エディタで開いているファイルの構造（クラス、メソッド、フィールド）をツリー表示するビュー。項目をクリックすると該当箇所にジャンプする。",
    related: ["ビュー", "Quick Outline"],
  },
  {
    term: "Console ビュー",
    reading: "コンソールビュー",
    category: "ui",
    description:
      "プログラムの標準出力・標準エラー出力やビルドログを表示するビュー。複数のコンソールをピン留めして切り替えることもできる。",
    related: ["ビュー", "実行構成"],
  },
  {
    term: "Problems ビュー",
    reading: "プロブレムズビュー",
    category: "ui",
    description:
      "コンパイルエラー、警告、情報メッセージを一覧表示するビュー。項目をダブルクリックするとエディタの該当行にジャンプする。フィルターでプロジェクトや重大度を絞り込める。",
    related: ["ビュー", "マーカー", "クイックフィックス"],
  },
  {
    term: "マーカーバー",
    reading: "マーカーバー",
    category: "ui",
    description:
      "エディタの左端に表示される縦帯。ブレークポイント、エラーアイコン、警告アイコン、クイックフィックス（💡）などが表示される領域。",
    related: ["エディタ", "ブレークポイント", "クイックフィックス"],
  },
  {
    term: ".metadata",
    reading: "ドットメタデータ",
    category: "ui",
    description:
      "ワークスペース内の隠しフォルダ。Eclipse の設定、プラグインの状態、ログファイルなどが保存される。削除するとワークスペースの設定がリセットされる。",
    related: ["ワークスペース", ".settings"],
  },
  {
    term: ".settings",
    reading: "ドットセッティングス",
    category: "ui",
    description:
      "プロジェクト直下の隠しフォルダ。プロジェクト固有のコンパイラ設定、フォーマッター設定などが保存される。Git で共有するとチーム全体で設定を統一できる。",
    related: [".metadata", ".classpath", ".project"],
  },
  {
    term: ".project",
    reading: "ドットプロジェクト",
    category: "ui",
    description:
      "Eclipse プロジェクトのメタデータファイル。プロジェクト名、ネイチャー（Java、Maven 等）、ビルダーの情報が XML 形式で記録される。",
    related: [".classpath", ".settings", "ネイチャー"],
  },
  {
    term: ".classpath",
    reading: "ドットクラスパス",
    category: "ui",
    description:
      "Java プロジェクトのビルドパス設定ファイル。ソースフォルダ、出力フォルダ、依存ライブラリのパスが XML 形式で記録される。Build Path の設定変更で自動更新される。",
    related: [".project", "ビルドパス", ".settings"],
  },
  {
    term: "Quick Access",
    reading: "クイックアクセス",
    category: "ui",
    description:
      "Ctrl+3 で開く万能検索バー。コマンド、設定、ビュー、パースペクティブなど Eclipse のあらゆる機能をキーワードで検索して実行できる。",
    related: ["パースペクティブ", "ビュー"],
    code: `// Ctrl+3 で起動
// 入力例:
//   "font"     → フォント設定を開く
//   "debug"    → Debug パースペクティブに切替
//   "format"   → フォーマッター設定を開く`,
  },

  // ===== エディタ・編集 =====
  {
    term: "Content Assist",
    reading: "コンテントアシスト",
    category: "editor",
    description:
      "Ctrl+Space で起動するコード補完機能。クラス名、メソッド名、変数名などを自動補完する。Java の型情報を活用した正確な候補提示が特徴。",
    related: ["コードテンプレート", "クイックフィックス"],
    code: `// Ctrl+Space でコード補完
// 例: "sysout" + Ctrl+Space → System.out.println();
// 例: list. + Ctrl+Space → メソッド候補表示`,
  },
  {
    term: "クイックフィックス",
    reading: "クイックフィックス",
    category: "editor",
    description:
      "Ctrl+1 で表示されるエラー・警告の修正候補。import 文の追加、変数の作成、try-catch の自動生成など、多彩な修正アクションを提案する。Eclipse で最も使用頻度の高い機能の一つ。",
    related: ["Content Assist", "マーカーバー", "Problems ビュー"],
    code: `// Ctrl+1 の活用例:
// - 未インポートクラスの import 追加
// - ローカル変数の作成
// - メソッドの作成
// - try-catch ブロックの自動生成
// - @SuppressWarnings の追加`,
  },
  {
    term: "コードテンプレート",
    reading: "コードテンプレート",
    category: "editor",
    description:
      "定型コードを素早く入力するためのテンプレート機能。sysout、main、for、foreach、try などのキーワードで展開される。独自テンプレートの追加も可能。",
    related: ["Content Assist"],
    code: `// 組み込みテンプレート例:
// sysout  → System.out.println();
// main    → public static void main(String[] args) {}
// foreach → for (element : collection) {}`,
  },
  {
    term: "Quick Outline",
    reading: "クイックアウトライン",
    category: "editor",
    description:
      "Ctrl+O で表示されるファイル内のメソッド・フィールド一覧のポップアップ。インクリメンタル検索で素早くジャンプできる。2回押すと継承メンバーも表示される。",
    related: ["Outline ビュー"],
    code: `// Ctrl+O     → 現在のクラスのメンバー一覧
// Ctrl+O × 2 → 継承メンバーも含めた一覧`,
  },
  {
    term: "Open Type",
    reading: "オープンタイプ",
    category: "editor",
    description:
      "Ctrl+Shift+T で起動するクラス・インターフェース検索ダイアログ。キャメルケースの頭文字で検索可能（例: NPE → NullPointerException）。ワークスペース内と依存ライブラリの型を横断検索できる。",
    related: ["Open Resource", "Quick Access"],
    code: `// Ctrl+Shift+T の検索パターン:
// "ArrayList"  → java.util.ArrayList
// "AL"         → ArrayList (キャメルケース)
// "NPE"        → NullPointerException`,
  },
  {
    term: "Open Resource",
    reading: "オープンリソース",
    category: "editor",
    description:
      "Ctrl+Shift+R で起動するファイル名検索ダイアログ。ワイルドカード（*、?）やキャメルケース検索でファイルを素早く開ける。",
    related: ["Open Type", "Quick Access"],
  },
  {
    term: "Call Hierarchy",
    reading: "コールヒエラルキー",
    category: "editor",
    description:
      "Ctrl+Alt+H でメソッドの呼び出し関係をツリー表示する機能。呼び出し元（Caller）と呼び出し先（Callee）を双方向に辿れる。影響範囲の調査に必須。",
    related: ["Type Hierarchy", "参照検索"],
    code: `// メソッド上で Ctrl+Alt+H
// Caller Hierarchy: このメソッドを呼んでいるメソッド
// Callee Hierarchy: このメソッドが呼んでいるメソッド`,
  },
  {
    term: "Type Hierarchy",
    reading: "タイプヒエラルキー",
    category: "editor",
    description:
      "Ctrl+T またはF4でクラスの継承関係をツリー表示する機能。スーパークラス・サブクラス・実装クラスの関係を可視化する。Ctrl+T はポップアップ、F4 はビューで表示。",
    related: ["Call Hierarchy"],
  },
  {
    term: "参照検索",
    reading: "サンショウケンサク",
    category: "editor",
    description:
      "Ctrl+Shift+G でメソッド、フィールド、クラスの使用箇所をワークスペース全体から検索する機能。テキスト検索と異なり、Java 構文を理解した正確な検索が可能。",
    related: ["Call Hierarchy", "Java Search"],
  },
  {
    term: "Java Search",
    reading: "ジャバサーチ",
    category: "editor",
    description:
      "Ctrl+H の Java タブで使える Java 構文を理解した検索機能。型、メソッド、フィールド、パッケージを対象に、宣言・参照・実装を区別して検索できる。",
    related: ["参照検索", "Open Type"],
  },
  {
    term: "フォーマッター",
    reading: "フォーマッター",
    category: "editor",
    description:
      "Ctrl+Shift+F でコードを自動整形する機能。インデント、ブレース位置、行幅などのルールをプロファイルで管理。チームで共有して統一的なコードスタイルを維持できる。",
    related: ["Save Actions", "Clean Up"],
    code: `// Ctrl+Shift+F でフォーマット
// 設定: Preferences > Java > Code Style > Formatter`,
  },
  {
    term: "Save Actions",
    reading: "セーブアクション",
    category: "editor",
    description:
      "ファイル保存時に自動実行されるアクション。コードフォーマット、import 整理、@Override 付与、不要なキャストの除去など、コード品質を自動で維持できる。",
    related: ["フォーマッター", "Clean Up", "Organize Imports"],
  },
  {
    term: "Organize Imports",
    reading: "オーガナイズインポーツ",
    category: "editor",
    description:
      "Ctrl+Shift+O で import 文を自動整理する機能。不足している import の追加、不要な import の削除、順序の整列を一括で行う。",
    related: ["Save Actions", "フォーマッター"],
  },
  {
    term: "Clean Up",
    reading: "クリーンアップ",
    category: "editor",
    description:
      "ソースコードの一括修正機能。不要な修飾子の削除、型推論への変換、拡張 for 文への変換など、コードの現代化やスタイル統一をまとめて適用できる。",
    related: ["Save Actions", "フォーマッター"],
  },
  {
    term: "ローカルヒストリー",
    reading: "ローカルヒストリー",
    category: "editor",
    description:
      "ファイルの変更履歴を Eclipse が自動保存する機能。右クリック > Compare With > Local History で過去の状態と比較・復元できる。Git コミット前の変更も追跡される。",
    related: ["Compare Editor"],
  },
  {
    term: "Compare Editor",
    reading: "コンペアエディタ",
    category: "editor",
    description:
      "2つのファイルやバージョンを左右並べて差分表示するエディタ。ローカルヒストリー、Git の変更比較、ファイル間の差分確認に使用される。変更箇所のマージ操作も可能。",
    related: ["ローカルヒストリー", "マージツール"],
  },

  // ===== デバッグ =====
  {
    term: "ブレークポイント",
    reading: "ブレークポイント",
    category: "debug",
    description:
      "プログラムの実行を指定行で一時停止させるマーカー。エディタ左端をダブルクリック、または Ctrl+Shift+B で設定する。条件付き、ヒットカウント、例外ブレークポイントなどの種類がある。",
    related: ["条件付きブレークポイント", "例外ブレークポイント", "ウォッチポイント", "ステップ実行"],
    code: `// 行ブレークポイント: エディタ左端をダブルクリック
// 条件付き: 右クリック > Breakpoint Properties > 条件式入力
// 例外: Run > Add Java Exception Breakpoint`,
  },
  {
    term: "条件付きブレークポイント",
    reading: "ジョウケンツキブレークポイント",
    category: "debug",
    description:
      "指定した条件式が true のときだけ停止するブレークポイント。大量のループの中で特定の条件を満たす場合のみ停止させたいときに使用する。",
    related: ["ブレークポイント", "ヒットカウント"],
  },
  {
    term: "例外ブレークポイント",
    reading: "レイガイブレークポイント",
    category: "debug",
    description:
      "特定の例外がスローされた瞬間に実行を停止するブレークポイント。NullPointerException などの原因箇所を素早く特定できる。Run > Add Java Exception Breakpoint で追加する。",
    related: ["ブレークポイント"],
  },
  {
    term: "ウォッチポイント",
    reading: "ウォッチポイント",
    category: "debug",
    description:
      "フィールドの値が読み書きされたときに実行を停止するブレークポイント。フィールドの値がいつ・どこで変更されるかを追跡するのに有効。フィールド宣言行にブレークポイントを設定して作成する。",
    related: ["ブレークポイント"],
  },
  {
    term: "ステップ実行",
    reading: "ステップジッコウ",
    category: "debug",
    description:
      "デバッグ中にプログラムを1行ずつ実行する操作。Step Into（F5）でメソッド内に入り、Step Over（F6）で次の行に進み、Step Return（F7）でメソッドから戻る。",
    related: ["ブレークポイント", "Debug パースペクティブ"],
    code: `// F5  Step Into    メソッド内に入る
// F6  Step Over    次の行へ進む
// F7  Step Return  メソッドから戻る
// F8  Resume       次のブレークポイントまで実行`,
  },
  {
    term: "Variables ビュー",
    reading: "バリアブルズビュー",
    category: "debug",
    description:
      "デバッグ中に現在のスコープの変数とその値を表示するビュー。オブジェクトを展開してフィールドの中身を確認でき、値の変更も可能。",
    related: ["Expressions ビュー", "Display ビュー"],
  },
  {
    term: "Expressions ビュー",
    reading: "エクスプレッションズビュー",
    category: "debug",
    description:
      "デバッグ中に任意の Java 式をリアルタイムに評価・監視するビュー。ステップ実行するたびに式の評価結果が更新される。複雑な条件やメソッド呼び出しの結果を常時監視できる。",
    related: ["Variables ビュー", "Display ビュー"],
  },
  {
    term: "Display ビュー",
    reading: "ディスプレイビュー",
    category: "debug",
    description:
      "デバッグ中に任意の Java コードを記述して実行できるスクラッチパッドビュー。変数の値の変更やメソッドの呼び出しを即座に試せる。Ctrl+Shift+D で式の結果を表示、Ctrl+U で実行。",
    related: ["Variables ビュー", "Expressions ビュー"],
  },
  {
    term: "Debug パースペクティブ",
    reading: "デバッグパースペクティブ",
    category: "debug",
    description:
      "デバッグ作業に最適化されたパースペクティブ。Debug ビュー、Variables、Breakpoints、Expressions、エディタがレイアウトされている。デバッグ開始時に自動で切り替わる。",
    related: ["パースペクティブ", "ステップ実行", "Variables ビュー"],
  },
  {
    term: "Hot Code Replace",
    reading: "ホットコードリプレース",
    category: "debug",
    description:
      "デバッグ中にソースコードを変更して即座に反映させる機能。メソッド本体の変更は JVM 再起動なしで反映される。メソッドの追加・削除やフィールドの変更は対応外。",
    related: ["ステップ実行", "リモートデバッグ"],
  },
  {
    term: "リモートデバッグ",
    reading: "リモートデバッグ",
    category: "debug",
    description:
      "別の JVM で実行中のアプリケーションに Eclipse からネットワーク経由で接続してデバッグする機能。対象 JVM をデバッグ用ポートで起動し、Remote Java Application 構成で接続する。",
    related: ["Hot Code Replace", "実行構成"],
    code: `// 対象 JVM の起動オプション:
// -agentlib:jdwp=transport=dt_socket,server=y,address=5005
// Eclipse: Run > Debug Configurations > Remote Java Application`,
  },
  {
    term: "Drop to Frame",
    reading: "ドロップトゥフレーム",
    category: "debug",
    description:
      "デバッグ中にスタックフレームを選択して、そのメソッドの先頭から再実行する機能。実行をやり直したい場合に使用する。ただし副作用（DB 更新、ファイル書き込み等）は元に戻らない。",
    related: ["ステップ実行"],
  },

  // ===== ビルド・実行 =====
  {
    term: "ビルドパス",
    reading: "ビルドパス",
    category: "build",
    description:
      "Java プロジェクトのコンパイルに必要なソースフォルダ、ライブラリ、出力先の設定。Build Path > Configure Build Path で管理する。.classpath ファイルに保存される。",
    related: [".classpath", "JRE System Library"],
    code: `// ビルドパスの設定:
// プロジェクト右クリック > Build Path > Configure Build Path`,
  },
  {
    term: "JRE System Library",
    reading: "ジェイアールイーシステムライブラリ",
    category: "build",
    description:
      "プロジェクトが使用する JRE/JDK のライブラリセット。ビルドパスに自動追加される。Execution Environment（JavaSE-21 等）またはインストール済み JRE を指定できる。",
    related: ["ビルドパス", "Installed JREs"],
  },
  {
    term: "Installed JREs",
    reading: "インストールドジェイアールイーズ",
    category: "build",
    description:
      "Eclipse に登録されたJDK/JREの一覧。Preferences > Java > Installed JREs で管理する。複数バージョンの JDK を登録して、プロジェクトごとに切り替えて使用できる。",
    related: ["JRE System Library", "ビルドパス"],
  },
  {
    term: "実行構成",
    reading: "ジッコウコウセイ",
    category: "build",
    description:
      "Run Configurations。プログラムの実行/デバッグ条件をまとめた設定。メインクラス、引数、環境変数、JVM オプションなどを定義する。複数の構成を保存して切り替え可能。",
    related: ["リモートデバッグ", "JVM 引数"],
    code: `// Run > Run Configurations で管理
// Ctrl+F11 で前回の構成を再実行
// F11 で前回の構成をデバッグ実行`,
  },
  {
    term: "JVM 引数",
    reading: "ジェイブイエムヒキスウ",
    category: "build",
    description:
      "実行構成の Arguments > VM arguments で設定する JVM オプション。ヒープサイズ（-Xmx）、システムプロパティ（-D）、ガベージコレクタの選択などを指定する。",
    related: ["実行構成"],
    code: `// 例: -Xmx1024m -Dspring.profiles.active=dev`,
  },
  {
    term: "自動ビルド",
    reading: "ジドウビルド",
    category: "build",
    description:
      "ファイル保存時に自動でコンパイルする機能。Project > Build Automatically で切り替え可能。有効の場合、保存するだけでエラーがリアルタイムに検出される。",
    related: ["インクリメンタルビルド"],
  },
  {
    term: "インクリメンタルビルド",
    reading: "インクリメンタルビルド",
    category: "build",
    description:
      "変更されたファイルのみを再コンパイルする効率的なビルド方式。Eclipse のデフォルトのビルド方式で、フルビルドに比べて大幅に高速。依存関係も自動的に解析して影響範囲を再ビルドする。",
    related: ["自動ビルド", "Clean Build"],
  },
  {
    term: "Clean Build",
    reading: "クリーンビルド",
    category: "build",
    description:
      "すべてのコンパイル済みファイルを削除してゼロからビルドし直す操作。Project > Clean で実行。原因不明のビルドエラーが解決することがある。",
    related: ["インクリメンタルビルド", "自動ビルド"],
  },
  {
    term: "M2Eclipse (m2e)",
    reading: "エムツーイクリプス",
    category: "build",
    description:
      "Eclipse 内蔵の Maven 統合プラグイン。pom.xml の編集、依存関係の自動ダウンロード、Maven ビルドの実行をサポート。Alt+F5 でプロジェクトの更新が可能。",
    related: ["Buildship", "ビルドパス"],
    code: `// Maven プロジェクト更新: Alt+F5
// Maven ビルド: 右クリック > Run As > Maven build`,
  },
  {
    term: "Buildship",
    reading: "ビルドシップ",
    category: "build",
    description:
      "Eclipse の Gradle 統合プラグイン。build.gradle の認識、Gradle タスクの実行、依存関係の管理をサポート。Gradle Tasks ビューからタスクを実行できる。",
    related: ["M2Eclipse (m2e)", "ビルドパス"],
  },
  {
    term: "ネイチャー",
    reading: "ネイチャー",
    category: "build",
    description:
      "プロジェクトの種類を示す属性。Java Nature、Maven Nature などがあり、.project ファイルに記録される。ネイチャーに応じてメニューやビルダーが自動構成される。",
    related: [".project", "ビルダー"],
  },
  {
    term: "ビルダー",
    reading: "ビルダー",
    category: "build",
    description:
      "ビルドプロセスの一部として実行されるプログラム。Java Builder（コンパイラ）、Maven Project Builder などがある。.project ファイルの buildSpec に定義される。",
    related: ["ネイチャー", ".project", "自動ビルド"],
  },

  // ===== リファクタリング =====
  {
    term: "Rename",
    reading: "リネーム",
    category: "refactoring",
    description:
      "Alt+Shift+R でクラス、メソッド、変数、パッケージなどの名前を安全に変更するリファクタリング。Java 構文を理解し、全参照箇所を正確に更新する。",
    related: ["Move", "Extract Method"],
    code: `// 変数/メソッド/クラスにカーソル → Alt+Shift+R → 新名称入力`,
  },
  {
    term: "Extract Method",
    reading: "エクストラクトメソッド",
    category: "refactoring",
    description:
      "選択したコードブロックを新しいメソッドとして抽出するリファクタリング（Alt+Shift+M）。引数と戻り値が自動分析され、適切なメソッドシグネチャが生成される。",
    related: ["Extract Local Variable", "Rename"],
  },
  {
    term: "Extract Local Variable",
    reading: "エクストラクトローカルバリアブル",
    category: "refactoring",
    description:
      "選択した式をローカル変数として抽出するリファクタリング（Alt+Shift+L）。マジックナンバーや複雑な式に名前を付けて可読性を向上させる。",
    related: ["Extract Method", "Extract Constant", "Inline"],
  },
  {
    term: "Extract Constant",
    reading: "エクストラクトコンスタント",
    category: "refactoring",
    description:
      "選択した値を static final 定数として抽出するリファクタリング。マジックナンバーの排除に使用する。Ctrl+1 > Extract to constant で実行。",
    related: ["Extract Local Variable"],
  },
  {
    term: "Inline",
    reading: "インライン",
    category: "refactoring",
    description:
      "変数やメソッドを使用箇所にインライン展開するリファクタリング（Alt+Shift+I）。Extract の逆操作。不要な一時変数やラッパーメソッドの除去に使用する。",
    related: ["Extract Local Variable", "Extract Method"],
  },
  {
    term: "Move",
    reading: "ムーブ",
    category: "refactoring",
    description:
      "クラスやメソッドを別のパッケージ・クラスに移動するリファクタリング。参照箇所の import 文やパッケージ宣言も自動更新される。Alt+Shift+V で実行。",
    related: ["Rename"],
  },
  {
    term: "Change Method Signature",
    reading: "チェンジメソッドシグネチャ",
    category: "refactoring",
    description:
      "メソッドの引数の追加・削除・並び替え、戻り値型の変更、可視性の変更を行うリファクタリング。全呼び出し箇所が自動更新される。Alt+Shift+C で実行。",
    related: ["Rename", "Extract Method"],
  },
  {
    term: "Pull Up / Push Down",
    reading: "プルアップ / プッシュダウン",
    category: "refactoring",
    description:
      "Pull Up はメソッドやフィールドを親クラスに移動、Push Down は子クラスに移動するリファクタリング。クラス階層の責務を適切に配置するために使用する。",
    related: ["Move", "Extract Interface"],
  },
  {
    term: "Extract Interface",
    reading: "エクストラクトインターフェース",
    category: "refactoring",
    description:
      "クラスのメソッドからインターフェースを抽出するリファクタリング。選択したメソッドを含むインターフェースが生成され、元クラスが implements する形に変換される。",
    related: ["Pull Up / Push Down"],
  },
  {
    term: "コード生成",
    reading: "コードセイセイ",
    category: "refactoring",
    description:
      "Source メニュー（Alt+Shift+S）から getter/setter、コンストラクタ、equals/hashCode、toString などの定型メソッドを自動生成する機能。",
    related: ["Content Assist", "コードテンプレート"],
    code: `// Alt+Shift+S > R: getter/setter 生成
// Alt+Shift+S > O: コンストラクタ生成
// Alt+Shift+S > H: hashCode/equals 生成
// Alt+Shift+S > S: toString 生成`,
  },

  // ===== プラグイン・拡張 =====
  {
    term: "Eclipse Marketplace",
    reading: "イクリプスマーケットプレイス",
    category: "plugin",
    description:
      "Eclipse 公式のプラグインストア。Help > Eclipse Marketplace からアクセスし、キーワード検索でプラグインを探してワンクリックでインストールできる。",
    related: ["更新サイト", "Pleiades"],
  },
  {
    term: "更新サイト",
    reading: "コウシンサイト",
    category: "plugin",
    description:
      "プラグインの配布・更新に使われる URL。Help > Install New Software で更新サイトを追加してプラグインをインストールする。Marketplace にないプラグインはこの方法で導入する。",
    related: ["Eclipse Marketplace"],
  },
  {
    term: "Pleiades",
    reading: "プレアデス",
    category: "plugin",
    description:
      "Eclipse を日本語化するプラグイン。Pleiades All in One は日本語化済み Eclipse をパッケージ化した配布形態で、追加設定なしで日本語版がすぐ使える。",
    related: ["Eclipse Marketplace"],
  },
  {
    term: "Spring Tools",
    reading: "スプリングツールズ",
    category: "plugin",
    description:
      "Spring Boot 開発を強力に支援するプラグイン（旧 STS）。Bean の自動補完、application.properties のサポート、Spring Boot ダッシュボードなどを提供する。",
    related: ["Eclipse Marketplace", "Lombok プラグイン"],
  },
  {
    term: "Lombok プラグイン",
    reading: "ロンボクプラグイン",
    category: "plugin",
    description:
      "Lombok アノテーション（@Getter、@Setter、@Builder 等）を Eclipse で正しく認識させるプラグイン。コード補完やエラー検出で Lombok 生成コードを反映する。",
    related: ["Spring Tools", "コード生成"],
  },
  {
    term: "SonarLint",
    reading: "ソナーリント",
    category: "plugin",
    description:
      "コードの品質問題やセキュリティ脆弱性をリアルタイムに検出するプラグイン。エディタ上で問題箇所をハイライトし、修正方法を提案する。SonarQube/SonarCloud と連携可能。",
    related: ["Checkstyle", "SpotBugs"],
  },
  {
    term: "Checkstyle",
    reading: "チェックスタイル",
    category: "plugin",
    description:
      "Java のコーディング規約をチェックするプラグイン。Google Java Style、Sun Conventions などのルールセットに準拠しているかを自動検証する。",
    related: ["SonarLint", "SpotBugs", "フォーマッター"],
  },
  {
    term: "SpotBugs",
    reading: "スポットバグズ",
    category: "plugin",
    description:
      "Java のバグパターンを静的解析で検出するプラグイン（旧 FindBugs）。NullPointerException のリスク、リソースリーク、同期の問題などを報告する。",
    related: ["SonarLint", "Checkstyle"],
  },
  {
    term: "EclEmma",
    reading: "エクレマ",
    category: "plugin",
    description:
      "JaCoCo ベースのコードカバレッジプラグイン。Eclipse に標準搭載。Coverage As > JUnit Test でテスト実行すると、実行された行（緑）/ 未実行の行（赤）が色分け表示される。",
    related: ["JUnit"],
  },
  {
    term: "Eclipse Color Theme",
    reading: "イクリプスカラーテーマ",
    category: "plugin",
    description:
      "エディタの配色テーマを追加するプラグイン。Monokai、Dracula、Solarized などの人気カラーテーマを適用して、好みの見た目にカスタマイズできる。",
    related: ["Eclipse Marketplace"],
  },

  // ===== バージョン管理 =====
  {
    term: "EGit",
    reading: "イーギット",
    category: "vcs",
    description:
      "Eclipse 標準の Git プラグイン。Git リポジトリの初期化、コミット、ブランチ操作、マージ、プッシュ/プルなどの Git 操作を Eclipse 内で完結できる。",
    related: ["Git Staging ビュー", "History ビュー", "マージツール"],
  },
  {
    term: "Git Staging ビュー",
    reading: "ギットステージングビュー",
    category: "vcs",
    description:
      "ファイルのステージング、コミットメッセージの入力、コミットをまとめて行えるビュー。Unstaged Changes と Staged Changes のドラッグ＆ドロップでステージングを管理する。",
    related: ["EGit", "History ビュー"],
  },
  {
    term: "History ビュー",
    reading: "ヒストリービュー",
    category: "vcs",
    description:
      "コミット履歴をグラフ表示するビュー。ブランチの分岐・マージの流れが視覚的に確認できる。コミットの詳細、変更ファイル、差分の確認、Cherry Pick なども可能。",
    related: ["EGit", "Git Staging ビュー"],
  },
  {
    term: "マージツール",
    reading: "マージツール",
    category: "vcs",
    description:
      "マージ時の競合を解決するための3-way マージエディタ。ローカル（自分）、リモート（相手）、共通祖先の3つを並べて表示し、結果を編集してマージを完了させる。",
    related: ["EGit", "Compare Editor"],
  },
  {
    term: "Team メニュー",
    reading: "チームメニュー",
    category: "vcs",
    description:
      "プロジェクトやファイルの右クリックメニュー内の Git 操作メニュー。Commit、Push、Pull、Switch To（ブランチ切替）、Show in History などの操作にアクセスできる。",
    related: ["EGit", "Git Staging ビュー"],
  },
  {
    term: "アノテーション（Blame）",
    reading: "アノテーション",
    category: "vcs",
    description:
      "ファイルの各行を誰がいつ変更したかを表示する機能。Team > Show Annotations で表示。コードの変更者・変更理由を追跡するのに使用する。git blame に相当。",
    related: ["EGit", "History ビュー"],
  },
  {
    term: ".gitignore",
    reading: "ドットギットイグノア",
    category: "vcs",
    description:
      "Git の追跡対象から除外するファイルパターンを定義するファイル。Eclipse プロジェクトでは bin/、.settings/、.classpath、.project などをプロジェクトに応じて設定する。",
    related: ["EGit"],
    code: `# Eclipse 用 .gitignore の例
bin/
.metadata/
*.class
.settings/
# .classpath と .project は共有する場合もある`,
  },

  // ===== その他便利な用語 =====
  {
    term: "JUnit",
    reading: "ジェイユニット",
    category: "build",
    description:
      "Java の単体テストフレームワーク。Eclipse はテストの作成・実行・結果表示を統合的にサポートする。JUnit ビューでテスト結果を確認し、失敗箇所にワンクリックでジャンプできる。",
    related: ["EclEmma", "実行構成"],
    code: `// テスト実行: 右クリック > Run As > JUnit Test
// カバレッジ: 右クリック > Coverage As > JUnit Test`,
  },
  {
    term: "ヒットカウント",
    reading: "ヒットカウント",
    category: "debug",
    description:
      "ブレークポイントに到達した回数で停止条件を設定する機能。例えばヒットカウントを 100 に設定すると、100回目の到達で初めて停止する。大量のループのデバッグに有効。",
    related: ["ブレークポイント", "条件付きブレークポイント"],
  },
  {
    term: "Mylyn",
    reading: "マイリン",
    category: "plugin",
    description:
      "タスク管理とコンテキスト管理のプラグイン。タスク（Issue）に関連するファイルを自動追跡し、タスク切替時にエディタの状態を復元する。JIRA、Bugzilla、GitHub Issues と連携可能。",
    related: ["Eclipse Marketplace"],
  },
  {
    term: "ワーキングセット",
    reading: "ワーキングセット",
    category: "ui",
    description:
      "プロジェクトやリソースをグループ化して管理する仕組み。Package Explorer でワーキングセットを使うと、大量のプロジェクトから関連プロジェクトだけをフィルター表示できる。",
    related: ["Package Explorer", "ワークスペース"],
  },
  {
    term: "Linked Resources",
    reading: "リンクトリソーシズ",
    category: "build",
    description:
      "ワークスペース外のフォルダやファイルをプロジェクト内にリンクとして参照する機能。実ファイルを移動せずに複数プロジェクトからアクセスできる。",
    related: ["ワークスペース", "プロジェクト"],
  },
  {
    term: "プロジェクト",
    reading: "プロジェクト",
    category: "ui",
    description:
      "Eclipse で管理されるソースコードやリソースの単位。ワークスペース内に複数作成でき、それぞれ独立したビルドパスと設定を持つ。Java プロジェクト、Maven プロジェクトなどの種類がある。",
    related: ["ワークスペース", ".project", "ビルドパス"],
  },
  {
    term: "Navigator",
    reading: "ナビゲーター",
    category: "ui",
    description:
      "ファイルシステムの実際のディレクトリ構造をそのまま表示するビュー。.project、.classpath などの隠しファイルも表示される。Package Explorer や Project Explorer で見えないファイルの確認に使用する。",
    related: ["Package Explorer", "Project Explorer"],
  },
];
