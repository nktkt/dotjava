export interface ExcelSection {
  title: string;
  content: string;
  code?: string;
}

export interface ExcelChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: ExcelSection[];
}

export const excelCategories = [
  { id: "basic", name: "基本操作", color: "#0017C1" },
  { id: "formula", name: "数式・関数", color: "#259D63" },
  { id: "data", name: "データ管理", color: "#C26A00" },
  { id: "chart", name: "グラフ・可視化", color: "#6B21A8" },
  { id: "pivot", name: "ピボットテーブル", color: "#EC0000" },
  { id: "practical", name: "実務テクニック", color: "#0891B2" },
  { id: "advanced-func", name: "関数の応用", color: "#259D63" },
  { id: "vba", name: "VBA・マクロ", color: "#546E7A" },
] as const;

export const excelChapters: ExcelChapter[] = [
  // ===== 基本操作 =====
  {
    id: "cell-sheet-book",
    title: "セル・シート・ブックの基本操作",
    category: "basic",
    description: "Excelの基本要素であるセル・シート・ブックの操作方法を学ぶ",
    sections: [
      {
        title: "セルの基本操作",
        content:
          "セルはExcelの最小単位です。セル参照（A1形式・R1C1形式）、セル範囲の選択、データの入力・編集・削除の基本操作を学びます。",
      },
      {
        title: "シートの操作",
        content:
          "シート（ワークシート）の追加・削除・コピー・移動・名前変更、シート間の参照、シートの表示/非表示の切り替え方法を解説します。",
      },
      {
        title: "ブックの管理",
        content:
          "ブック（ファイル）の新規作成・保存・名前を付けて保存、ファイル形式（.xlsx, .xlsm, .csv）の違い、複数ブック間の参照とリンクについて解説します。",
      },
    ],
  },
  {
    id: "data-input-format",
    title: "データ入力と書式設定",
    category: "basic",
    description: "効率的なデータ入力方法と、セルの書式設定テクニック",
    sections: [
      {
        title: "データ入力のテクニック",
        content:
          "オートフィル、フラッシュフィル、連続データの入力、ドロップダウンリストの作成、ショートカットキーを使った効率的な入力方法を学びます。",
      },
      {
        title: "セルの書式設定",
        content:
          "フォント・配置・罫線・塗りつぶし、表示形式（数値・日付・通貨・パーセンテージ）のカスタマイズ、セルのスタイルとテーマの活用方法を解説します。",
      },
      {
        title: "行と列の操作",
        content:
          "行・列の挿入・削除・非表示、行の高さ・列の幅の調整、ウィンドウ枠の固定、グループ化による表示の折りたたみを解説します。",
      },
    ],
  },

  // ===== 数式・関数 =====
  {
    id: "basic-formulas",
    title: "基本的な数式と関数",
    category: "formula",
    description: "SUM, IF, VLOOKUP等の必須関数と数式の基礎を学ぶ",
    sections: [
      {
        title: "数式の基本とセル参照",
        content:
          "数式の入力方法、算術演算子（+, -, *, /）、相対参照・絶対参照・複合参照（$記号）の使い分けを解説します。",
        code: `= A1 + B1          ' 加算
= A1 * B1          ' 乗算
= A1 / B1          ' 除算
= A1 ^ 2           ' べき乗

' 相対参照・絶対参照
= A1 * B1           ' 相対参照（コピー時にずれる）
= $A$1 * B1         ' 絶対参照（コピーしてもA1を参照）
= A$1 * $B1         ' 複合参照（行または列を固定）`,
      },
      {
        title: "基本関数（SUM, AVERAGE, COUNT, MAX, MIN）",
        content:
          "最もよく使われる集計関数の使い方を解説します。SUMIF, COUNTIF, AVERAGEIF などの条件付き集計も学びます。",
        code: `= SUM(A1:A100)              ' 合計
= AVERAGE(A1:A100)          ' 平均
= COUNT(A1:A100)            ' 数値セルの個数
= COUNTA(A1:A100)           ' 空でないセルの個数
= MAX(A1:A100)              ' 最大値
= MIN(A1:A100)              ' 最小値

' 条件付き集計
= SUMIF(B:B, "東京", C:C)       ' B列が"東京"のC列合計
= COUNTIF(A:A, ">=100")         ' A列で100以上の個数
= AVERAGEIF(B:B, "営業部", C:C) ' B列が"営業部"のC列平均

' 複数条件
= SUMIFS(D:D, B:B, "東京", C:C, ">=2024/1/1")`,
      },
      {
        title: "IF関数と VLOOKUP",
        content:
          "条件分岐の IF 関数と、データ検索の VLOOKUP 関数の使い方を解説します。ネストした IF や IFERROR との組み合わせも紹介します。",
        code: `' IF関数（条件分岐）
= IF(A1>=80, "合格", "不合格")
= IF(A1>=90, "A", IF(A1>=80, "B", IF(A1>=70, "C", "D")))

' IFS関数（複数条件、Excel 2019以降）
= IFS(A1>=90, "A", A1>=80, "B", A1>=70, "C", TRUE, "D")

' VLOOKUP（垂直検索）
= VLOOKUP(検索値, 範囲, 列番号, FALSE)
= VLOOKUP(A1, Sheet2!A:D, 3, FALSE)   ' 完全一致検索
= VLOOKUP(A1, $B$1:$E$100, 2, TRUE)   ' 近似一致検索

' IFERROR でエラー処理
= IFERROR(VLOOKUP(A1, B:D, 3, FALSE), "該当なし")

' XLOOKUP（Excel 365 / 2021以降、VLOOKUP の後継）
= XLOOKUP(A1, B:B, D:D, "該当なし")`,
      },
    ],
  },
  {
    id: "text-date-logic",
    title: "文字列・日付・論理関数",
    category: "formula",
    description: "テキスト操作、日付計算、論理演算の関数群を学ぶ",
    sections: [
      {
        title: "文字列関数",
        content:
          "テキストデータの操作に使う関数群です。結合、分割、検索、置換、大文字・小文字変換など、データクレンジングに欠かせない関数を解説します。",
        code: `' 文字列の結合
= CONCATENATE(A1, " ", B1)  ' 旧方式
= A1 & " " & B1             ' &演算子
= TEXTJOIN(", ", TRUE, A1:A5) ' 区切り文字で結合

' 文字列の抽出
= LEFT(A1, 3)        ' 左から3文字
= RIGHT(A1, 4)       ' 右から4文字
= MID(A1, 3, 5)      ' 3文字目から5文字

' 検索・置換
= FIND("@", A1)          ' 位置を検索（大文字小文字区別）
= SEARCH("abc", A1)      ' 位置を検索（大文字小文字無視）
= SUBSTITUTE(A1, "旧", "新")  ' 文字列置換

' 変換
= UPPER(A1)          ' 大文字に変換
= LOWER(A1)          ' 小文字に変換
= PROPER(A1)         ' 先頭を大文字に
= TRIM(A1)           ' 余分な空白を除去
= LEN(A1)            ' 文字数
= VALUE("123")       ' 文字列→数値
= TEXT(A1, "#,##0")  ' 数値→書式付き文字列`,
      },
      {
        title: "日付・時刻関数",
        content:
          "日付や時刻の計算に使う関数群です。日付の差分計算、営業日計算、年齢計算などの実務的なパターンを解説します。",
        code: `' 現在の日付・時刻
= TODAY()           ' 今日の日付
= NOW()             ' 現在の日時

' 日付の構成要素
= YEAR(A1)          ' 年
= MONTH(A1)         ' 月
= DAY(A1)           ' 日
= WEEKDAY(A1)       ' 曜日（1=日曜 ～ 7=土曜）

' 日付の作成・計算
= DATE(2024, 4, 1)            ' 2024/4/1
= EDATE(A1, 3)                ' 3ヶ月後
= EOMONTH(A1, 0)              ' 月末日
= DATEDIF(A1, B1, "Y")        ' 年数の差（年齢計算）
= NETWORKDAYS(A1, B1)         ' 営業日数
= WORKDAY(A1, 10)             ' 10営業日後

' 時刻
= HOUR(A1)          ' 時
= MINUTE(A1)        ' 分
= TIME(14, 30, 0)   ' 14:30:00`,
      },
      {
        title: "論理関数",
        content:
          "条件の組み合わせや判定に使う論理関数です。AND, OR, NOT と IF の組み合わせで複雑な条件判定を行います。",
        code: `' 論理関数
= AND(A1>=80, B1>=80)       ' すべて真ならTRUE
= OR(A1="東京", A1="大阪")  ' いずれか真ならTRUE
= NOT(A1="除外")            ' 真偽を反転

' IF との組み合わせ
= IF(AND(A1>=80, B1>=80), "合格", "不合格")
= IF(OR(A1="", A1=0), "未入力", A1)

' SWITCH（Excel 2019以降）
= SWITCH(A1, "A", "優", "B", "良", "C", "可", "不明")

' CHOOSE
= CHOOSE(WEEKDAY(A1), "日","月","火","水","木","金","土")`,
      },
    ],
  },
  {
    id: "stat-math",
    title: "統計・数学関数",
    category: "formula",
    description: "ROUND, RANK, 統計関数、数学関数の活用方法",
    sections: [
      {
        title: "端数処理・数学関数",
        content:
          "数値の端数処理（四捨五入・切り上げ・切り捨て）と、実務で使う数学関数を解説します。",
        code: `' 端数処理
= ROUND(A1, 2)       ' 小数第2位に四捨五入
= ROUNDUP(A1, 0)     ' 切り上げ（整数に）
= ROUNDDOWN(A1, 0)   ' 切り捨て（整数に）
= INT(A1)            ' 整数部分を返す
= MOD(A1, 3)         ' 余り（A1÷3の余り）
= CEILING(A1, 100)   ' 100単位に切り上げ
= FLOOR(A1, 100)     ' 100単位に切り捨て

' 数学関数
= ABS(A1)            ' 絶対値
= SQRT(A1)           ' 平方根
= POWER(A1, 3)       ' A1の3乗
= RAND()             ' 0～1の乱数
= RANDBETWEEN(1, 100)' 1～100の整数乱数`,
      },
      {
        title: "統計関数・順位",
        content:
          "データの統計分析に使う関数群です。順位付け、偏差値計算、頻度分布などの手法を解説します。",
        code: `' 順位
= RANK.EQ(A1, A:A)           ' 順位（同順位は最上位）
= RANK.AVG(A1, A:A)          ' 順位（同順位は平均）
= PERCENTRANK.INC(A:A, A1)   ' パーセント順位

' 統計値
= MEDIAN(A1:A100)    ' 中央値
= MODE.SNGL(A1:A100) ' 最頻値
= STDEV.S(A1:A100)   ' 標準偏差（標本）
= VAR.S(A1:A100)     ' 分散（標本）
= LARGE(A1:A100, 3)  ' 3番目に大きい値
= SMALL(A1:A100, 3)  ' 3番目に小さい値

' 偏差値の計算
= (A1 - AVERAGE(A:A)) / STDEV.S(A:A) * 10 + 50

' 条件付きの集計（複数条件）
= COUNTIFS(A:A, ">=80", A:A, "<90")
= SUMPRODUCT((A2:A100="東京")*(B2:B100>=100)*C2:C100)`,
      },
    ],
  },

  // ===== データ管理 =====
  {
    id: "table-organize",
    title: "テーブルとデータの整理",
    category: "data",
    description: "Excelテーブル機能と、データを効率的に整理する方法",
    sections: [
      {
        title: "テーブルの作成と活用",
        content:
          "範囲をテーブルに変換すると、構造化参照、自動拡張、自動書式、集計行などの機能が使えます。データ管理の基本となるテーブル機能を学びます。",
      },
      {
        title: "データの整理と変換",
        content:
          "重複の削除、データの分割・結合、区切り位置、フラッシュフィルによるパターン抽出、Power Query によるデータ変換の基本を解説します。",
      },
    ],
  },
  {
    id: "filter-sort-cf",
    title: "フィルター・並べ替え・条件付き書式",
    category: "data",
    description: "データの絞り込み、並べ替え、視覚的な条件付き書式の活用",
    sections: [
      {
        title: "フィルターと並べ替え",
        content:
          "オートフィルター、カスタムフィルター、複数条件での絞り込み、昇順・降順・カスタム順の並べ替え、色やアイコンによるフィルタリングを解説します。",
      },
      {
        title: "条件付き書式",
        content:
          "セルの値に応じて自動的に書式を変更する条件付き書式の使い方です。データバー、カラースケール、アイコンセット、数式ベースのルール設定を解説します。",
      },
    ],
  },

  // ===== グラフ・可視化 =====
  {
    id: "chart-create",
    title: "グラフの作成とカスタマイズ",
    category: "chart",
    description: "各種グラフの作成方法と、見やすく伝わるグラフのカスタマイズ",
    sections: [
      {
        title: "グラフの種類と使い分け",
        content:
          "棒グラフ、折れ線グラフ、円グラフ、散布図、面グラフ、複合グラフなど、データの特性に合ったグラフの選び方と作成方法を解説します。",
      },
      {
        title: "グラフのカスタマイズ",
        content:
          "タイトル、軸ラベル、凡例、データラベル、目盛線の設定、色やフォントの変更、第2軸の追加、トレンドラインの表示など、グラフの見栄えを整える方法を解説します。",
      },
    ],
  },
  {
    id: "sparkline-cf-advanced",
    title: "スパークライン・条件付き書式の応用",
    category: "chart",
    description: "セル内グラフ（スパークライン）と条件付き書式の高度な活用",
    sections: [
      {
        title: "スパークライン",
        content:
          "セル内に小さなグラフを表示するスパークライン機能です。折れ線・縦棒・勝敗の3種類があり、データの傾向を一目で把握できます。",
      },
      {
        title: "条件付き書式の応用テクニック",
        content:
          "数式ベースの条件付き書式、行全体への適用、交互の行色、期限切れの強調表示、ガントチャートの作成など、高度な活用テクニックを解説します。",
      },
    ],
  },

  // ===== ピボットテーブル =====
  {
    id: "pivot-basic",
    title: "ピボットテーブルの基礎",
    category: "pivot",
    description: "ピボットテーブルの作成方法と、データの集計・分析の基本",
    sections: [
      {
        title: "ピボットテーブルの作成",
        content:
          "ピボットテーブルの作成手順、行・列・値・フィルターの各フィールドの配置方法、集計方法の変更（合計・平均・個数等）を解説します。",
      },
      {
        title: "ピボットテーブルの操作",
        content:
          "グループ化（日付の月別・四半期別、数値の範囲別）、フィルターとスライサー、並べ替え、レイアウトの変更、ピボットグラフの作成方法を解説します。",
      },
    ],
  },
  {
    id: "pivot-advanced",
    title: "ピボットテーブルの応用",
    category: "pivot",
    description: "計算フィールド、データモデル、高度な分析テクニック",
    sections: [
      {
        title: "計算フィールドとアイテム",
        content:
          "ピボットテーブル内で独自の計算式を作成する計算フィールドと計算アイテム、値の表示方法（前年比、構成比、累計等）の活用方法を解説します。",
      },
      {
        title: "データモデルとリレーション",
        content:
          "複数テーブルのリレーションシップ設定、データモデルを使ったピボットテーブル、DAX 数式の基本、Power Pivot の活用方法を解説します。",
      },
    ],
  },

  // ===== 実務テクニック =====
  {
    id: "validation-protection",
    title: "データの入力規則・保護",
    category: "practical",
    description: "入力ミスを防ぐ入力規則と、シート・ブックの保護機能",
    sections: [
      {
        title: "データの入力規則",
        content:
          "セルに入力できるデータを制限する入力規則の設定方法です。リスト選択、数値範囲、日付範囲、文字数制限、カスタム数式による規則を解説します。",
      },
      {
        title: "シートとブックの保護",
        content:
          "シートの保護（特定セルのみ編集可能に）、ブックの保護（構造の変更を防止）、パスワード設定、共有ブックでの変更の追跡について解説します。",
      },
    ],
  },
  {
    id: "print-layout",
    title: "印刷設定とページレイアウト",
    category: "practical",
    description: "きれいに印刷するための設定とページレイアウトのテクニック",
    sections: [
      {
        title: "ページ設定と印刷プレビュー",
        content:
          "用紙サイズ、余白、印刷の向き、拡大縮小、印刷範囲の設定、ヘッダー・フッターの追加、改ページプレビューの活用方法を解説します。",
      },
      {
        title: "印刷テクニック",
        content:
          "タイトル行の繰り返し印刷、複数シートの一括印刷、PDF出力、1ページに収める設定、印刷タイトル（行列の固定）について解説します。",
      },
    ],
  },

  // ===== 関数の応用 =====
  {
    id: "dynamic-array",
    title: "配列数式と動的配列",
    category: "advanced-func",
    description: "FILTER, SORT, UNIQUE等の動的配列関数とスピル機能を学ぶ",
    sections: [
      {
        title: "動的配列とスピル",
        content:
          "Excel 365 / 2021 で導入された動的配列は、1つの数式から複数のセルに結果を自動展開（スピル）します。従来の Ctrl+Shift+Enter が不要になりました。",
        code: `' FILTER: 条件に一致する行を抽出
= FILTER(A2:D100, B2:B100="東京")
= FILTER(A2:D100, (B2:B100="東京")*(C2:C100>=100), "該当なし")

' SORT: データを並べ替え
= SORT(A2:D100, 3, -1)         ' 3列目で降順ソート
= SORTBY(A2:D100, C2:C100, -1) ' C列の値で降順ソート

' UNIQUE: 重複を除いた一覧
= UNIQUE(B2:B100)              ' 一意の値一覧
= UNIQUE(A2:D100, FALSE, TRUE) ' 1回のみ出現する行

' SEQUENCE: 連続数値の生成
= SEQUENCE(10)            ' 1～10の縦リスト
= SEQUENCE(5, 3, 0, 2)    ' 5行3列、0から2ずつ増加

' RANDARRAY: ランダム配列
= RANDARRAY(5, 3, 1, 100, TRUE)  ' 5行3列の整数乱数

' スピル範囲参照
= SUMPRODUCT(A2#)     ' A2のスピル範囲全体を参照`,
      },
    ],
  },
  {
    id: "index-match",
    title: "INDEX/MATCH と高度な検索",
    category: "advanced-func",
    description: "VLOOKUP を超える柔軟な検索テクニック",
    sections: [
      {
        title: "INDEX/MATCH の基本",
        content:
          "INDEX と MATCH を組み合わせることで、VLOOKUP では不可能だった左方向の検索や複数条件検索が可能になります。",
        code: `' INDEX: 範囲から行番号・列番号で値を取得
= INDEX(A1:D100, 5, 3)     ' 5行目3列目の値

' MATCH: 範囲から値の位置を検索
= MATCH("Alice", B:B, 0)   ' B列で"Alice"の行番号

' INDEX/MATCH の組み合わせ（VLOOKUPの代替）
= INDEX(C:C, MATCH(A1, B:B, 0))
' → B列でA1を検索し、同じ行のC列の値を返す

' 左方向の検索（VLOOKUPでは不可能）
= INDEX(A:A, MATCH(D1, C:C, 0))
' → C列でD1を検索し、同じ行のA列（左側）の値を返す

' 複数条件検索
= INDEX(D:D, MATCH(1, (A:A=G1)*(B:B=H1), 0))
' → A列=G1 かつ B列=H1 の行のD列値

' XLOOKUP（Excel 365 / 2021以降）
= XLOOKUP(A1, B:B, D:D, "該当なし", 0, 1)
' 検索値, 検索範囲, 戻り範囲, 見つからない場合, 一致モード, 検索モード`,
      },
    ],
  },
  {
    id: "lambda-let-new",
    title: "LAMBDA・LET・新関数",
    category: "advanced-func",
    description: "Excel 365 の最新関数で数式をよりシンプルに書く",
    sections: [
      {
        title: "LET関数",
        content:
          "LET関数は数式内で変数を定義できます。複雑な数式を読みやすくし、同じ計算の繰り返しを避けてパフォーマンスを向上させます。",
        code: `' LET: 数式内で変数を定義
= LET(
    税率, 0.1,
    小計, SUM(B2:B100),
    税額, 小計 * 税率,
    小計 + 税額
  )

' 複雑な計算を読みやすく
= LET(
    データ, FILTER(A2:D100, B2:B100="東京"),
    件数, ROWS(データ),
    合計, SUM(INDEX(データ,,3)),
    "件数: " & 件数 & " / 合計: " & TEXT(合計, "#,##0")
  )`,
      },
      {
        title: "LAMBDA関数と名前付き関数",
        content:
          "LAMBDA関数で独自の関数を定義できます。名前の管理に登録すれば、シート全体で再利用可能なカスタム関数になります。",
        code: `' LAMBDA: カスタム関数の定義
= LAMBDA(x, x^2 + 2*x + 1)(5)    ' 36を返す

' 名前の管理に登録して再利用（例: 税込計算）
' 名前: 税込
' 参照先: =LAMBDA(金額, 税率, 金額 * (1 + 税率))
' 使用: =税込(1000, 0.1)  → 1100

' MAP: 配列の各要素に関数を適用
= MAP(A2:A100, LAMBDA(x, IF(x>=80, "合格", "不合格")))

' REDUCE: 配列を1つの値に集約
= REDUCE(0, A2:A100, LAMBDA(acc, x, acc + x^2))

' SCAN: 累積計算
= SCAN(0, B2:B100, LAMBDA(acc, x, acc + x))`,
      },
      {
        title: "その他の新関数",
        content:
          "Excel 365 で追加された便利な新関数を紹介します。TEXTSPLIT, VSTACK/HSTACK, TAKE/DROP, CHOOSECOLS/CHOOSEROWS など。",
        code: `' TEXTSPLIT: テキストを分割して配列に
= TEXTSPLIT(A1, ",")            ' カンマで横方向に分割
= TEXTSPLIT(A1, ",", ";")       ' 列・行の区切りを指定

' VSTACK / HSTACK: 範囲を結合
= VSTACK(Sheet1!A1:C10, Sheet2!A1:C10)  ' 縦に結合
= HSTACK(A1:B10, D1:E10)                ' 横に結合

' TAKE / DROP: 先頭・末尾の行を取得/除外
= TAKE(A1:D100, 5)       ' 先頭5行
= TAKE(A1:D100, -3)      ' 末尾3行
= DROP(A1:D100, 1)       ' 先頭1行を除外

' CHOOSECOLS / CHOOSEROWS
= CHOOSECOLS(A1:E100, 1, 3, 5)  ' 1,3,5列目のみ
= CHOOSEROWS(A1:D100, 1, 5, 10) ' 1,5,10行目のみ

' WRAPCOLS / WRAPROWS: 1次元→2次元配列
= WRAPROWS(A1:A12, 4)    ' 12個を4列ずつ折り返し

' TOCOL / TOROW: 2次元→1次元配列
= TOCOL(A1:C10)           ' 全データを1列に`,
      },
    ],
  },

  // ===== VBA・マクロ =====
  {
    id: "macro-recording",
    title: "マクロの記録と実行",
    category: "vba",
    description: "マクロの記録、実行、ボタン割り当て、セキュリティ設定",
    sections: [
      {
        title: "マクロの記録と実行",
        content:
          "マクロは操作を自動化する機能です。マクロの記録で操作を記録し、再実行することで繰り返し作業を効率化できます。マクロ有効ブック（.xlsm）として保存する必要があります。",
      },
      {
        title: "マクロの管理とセキュリティ",
        content:
          "マクロの編集（VBAエディターの基本操作）、ボタンやショートカットキーへの割り当て、マクロのセキュリティ設定、個人用マクロブックの活用方法を解説します。",
      },
    ],
  },
  {
    id: "vba-intro",
    title: "VBA プログラミング入門",
    category: "vba",
    description: "VBA の基本構文、変数、制御構造、セル操作の基礎",
    sections: [
      {
        title: "VBAの基本構文",
        content:
          "VBA（Visual Basic for Applications）の基本構文を学びます。変数宣言、データ型、条件分岐、繰り返し処理など、プログラミングの基本要素を解説します。",
        code: `' サブプロシージャ（マクロ）
Sub HelloWorld()
    MsgBox "Hello, World!"
End Sub

' 変数と型
Sub Variables()
    Dim name As String
    Dim age As Integer
    Dim price As Double
    Dim isActive As Boolean

    name = "Alice"
    age = 30
    price = 1234.56
    isActive = True
End Sub

' 条件分岐
Sub CheckScore()
    Dim score As Integer
    score = Range("A1").Value

    If score >= 80 Then
        MsgBox "合格"
    ElseIf score >= 60 Then
        MsgBox "追試"
    Else
        MsgBox "不合格"
    End If
End Sub

' 繰り返し
Sub LoopExample()
    Dim i As Integer
    For i = 1 To 10
        Cells(i, 1).Value = i * 10
    Next i

    ' For Each
    Dim cell As Range
    For Each cell In Range("A1:A10")
        If cell.Value > 50 Then
            cell.Font.Bold = True
        End If
    Next cell
End Sub`,
      },
      {
        title: "セルとシートの操作",
        content:
          "VBA でセルの値の読み書き、書式設定、シートの操作、ブック操作を行う方法を解説します。",
        code: `' セルの操作
Sub CellOperations()
    ' 値の読み書き
    Range("A1").Value = "Hello"
    Cells(1, 2).Value = 100       ' B1セル
    Range("A1:C3").Value = 0      ' 範囲に一括代入

    ' 書式設定
    Range("A1").Font.Bold = True
    Range("A1").Font.Color = RGB(255, 0, 0)
    Range("B1:B10").NumberFormat = "#,##0"
    Range("A1").Interior.Color = RGB(255, 255, 200)

    ' 範囲操作
    Range("A1:D10").Copy Range("F1")     ' コピー&ペースト
    Range("A1:D10").Sort Key1:=Range("B1"), Order1:=xlAscending

    ' 最終行の取得
    Dim lastRow As Long
    lastRow = Cells(Rows.Count, 1).End(xlUp).Row

    ' シート操作
    Worksheets("Sheet1").Activate
    Worksheets.Add After:=ActiveSheet
    ActiveSheet.Name = "新しいシート"
End Sub

' 実用例: データの集計
Sub SummarizeData()
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("売上データ")

    Dim lastRow As Long
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row

    Dim total As Double
    Dim i As Long
    For i = 2 To lastRow
        total = total + ws.Cells(i, 4).Value
    Next i

    MsgBox "合計: " & Format(total, "#,##0") & "円"
End Sub`,
      },
    ],
  },
];
