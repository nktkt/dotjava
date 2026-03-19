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
  { id: "basic", name: "基本操作", color: "var(--color-dads-blue)" },
  { id: "formula", name: "数式・関数", color: "var(--color-dads-success)" },
  { id: "data", name: "データ管理", color: "var(--color-dads-warning)" },
  { id: "chart", name: "グラフ・可視化", color: "var(--color-dads-purple)" },
  { id: "pivot", name: "ピボットテーブル", color: "var(--color-dads-error)" },
  { id: "practical", name: "実務テクニック", color: "var(--color-dads-cyan)" },
  { id: "advanced-func", name: "関数の応用", color: "var(--color-dads-success)" },
  { id: "vba", name: "VBA・マクロ", color: "var(--color-dads-gray)" },
  { id: "mos", name: "MOS Excel 365", color: "var(--color-dads-success)" },
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
  {
    id: "lookup-reference",
    title: "検索・参照関数",
    category: "formula",
    description:
      "INDIRECT, OFFSET, ADDRESS, ROW, COLUMN 等のセル参照を動的に操作する関数群",
    sections: [
      {
        title: "INDIRECT・ADDRESS（動的参照）",
        content:
          "INDIRECT 関数は文字列をセル参照に変換し、ADDRESS 関数は行番号・列番号からセルアドレス文字列を生成します。動的にシートやセルを参照する際に必須の関数です。",
        code: `' INDIRECT: 文字列をセル参照として評価
= INDIRECT("A1")                     ' "A1" → セルA1の値
= INDIRECT("Sheet2!B5")              ' 別シートを参照
= INDIRECT(A1)                       ' A1に"C10"と入力→C10の値
= SUM(INDIRECT("A1:A" & B1))         ' B1の値で範囲を動的に指定

' シート名を動的に切り替え
= INDIRECT("'" & A1 & "'!B2")        ' A1にシート名が入っている場合

' ADDRESS: 行番号・列番号からアドレス文字列を生成
= ADDRESS(3, 2)                      ' "$B$3"（絶対参照）
= ADDRESS(3, 2, 4)                   ' "B3"（相対参照）
= ADDRESS(3, 2, 1, TRUE, "Sheet2")   ' "Sheet2!$B$3"

' INDIRECT + ADDRESS で動的参照を構築
= INDIRECT(ADDRESS(ROW(), MATCH("売上", 1:1, 0)))`,
      },
      {
        title: "OFFSET（動的範囲）",
        content:
          "OFFSET 関数は基準セルから指定した行数・列数だけ移動した位置のセルや範囲を返します。動的な範囲指定やリストの自動拡張に活用されます。",
        code: `' OFFSET: 基準セルから移動してセル/範囲を返す
' OFFSET(基準, 行移動, 列移動, [高さ], [幅])
= OFFSET(A1, 2, 3)                   ' A1から下2・右3 → D3の値
= OFFSET(A1, 0, 0, 5, 1)             ' A1から5行1列の範囲 = A1:A5
= SUM(OFFSET(A1, 0, 0, 10, 1))       ' A1:A10の合計

' 動的範囲: データの増減に自動対応
= SUM(OFFSET(A1, 0, 0, COUNTA(A:A), 1))
' → A列のデータ件数分だけ合計範囲を自動拡張

' 直近N件の平均（例: 直近7日分）
= AVERAGE(OFFSET(A1, COUNTA(A:A)-7, 0, 7, 1))

' 移動平均（3期間）
= AVERAGE(OFFSET(B2, -1, 0, 3, 1))`,
      },
      {
        title: "ROW・COLUMN・ROWS・COLUMNS",
        content:
          "セルの行番号・列番号を取得する関数群です。連番の作成や動的な位置計算に活用されます。",
        code: `' ROW / COLUMN: セルの行番号/列番号を返す
= ROW()              ' 数式が入っているセルの行番号
= ROW(C5)            ' 5
= COLUMN(C5)         ' 3

' 連番の自動生成（行の挿入・削除に強い）
= ROW() - 1          ' 2行目から始まる場合、1, 2, 3...
= ROW(A1)            ' どのセルにコピーしても1, 2, 3...

' ROWS / COLUMNS: 範囲の行数/列数を返す
= ROWS(A1:A100)      ' 100
= COLUMNS(A1:E1)     ' 5

' MATCH: 範囲内で値の位置を返す（検索関数の要）
= MATCH("りんご", A:A, 0)      ' 完全一致の位置
= MATCH(MAX(B:B), B:B, 0)     ' 最大値の位置

' HYPERLINK: ハイパーリンクの作成
= HYPERLINK("https://example.com", "リンク")
= HYPERLINK("#Sheet2!A1", "Sheet2へ移動")

' TRANSPOSE: 行と列を入れ替え（動的配列）
= TRANSPOSE(A1:D1)   ' 横→縦
= TRANSPOSE(A1:A10)  ' 縦→横`,
      },
    ],
  },
  {
    id: "info-error-functions",
    title: "情報関数・エラー処理関数",
    category: "formula",
    description:
      "IS系関数、TYPE、CELL、エラー処理（IFERROR, IFNA）でデータを検査・保護する",
    sections: [
      {
        title: "IS系関数（データ判定）",
        content:
          "セルの内容を検査して TRUE/FALSE を返す IS 系関数です。データの入力チェックや条件分岐で活用されます。",
        code: `' データ型の判定
= ISBLANK(A1)        ' 空白セルならTRUE
= ISNUMBER(A1)       ' 数値ならTRUE
= ISTEXT(A1)         ' 文字列ならTRUE
= ISLOGICAL(A1)      ' TRUE/FALSEならTRUE
= ISFORMULA(A1)      ' 数式ならTRUE

' エラーの判定
= ISERROR(A1)        ' 任意のエラーならTRUE
= ISERR(A1)          ' #N/A以外のエラーならTRUE
= ISNA(A1)           ' #N/Aエラーのみ TRUE
= ERROR.TYPE(A1)     ' エラー種別の番号を返す

' 実用例: 入力チェック
= IF(ISBLANK(A1), "未入力", IF(ISNUMBER(A1), "OK", "数値を入力"))

' TYPE関数: データ型を番号で返す
= TYPE(A1)
' 1=数値, 2=文字列, 4=論理値, 16=エラー, 64=配列

' N / T: 型変換
= N(TRUE)            ' 1（論理値→数値）
= T(100)             ' ""（数値→空文字列）`,
      },
      {
        title: "エラー処理関数",
        content:
          "数式のエラーを適切に処理して、見やすく堅牢なシートを作る方法です。IFERROR と IFNA を使い分けましょう。",
        code: `' IFERROR: すべてのエラーをキャッチ
= IFERROR(A1/B1, 0)                      ' ゼロ除算時に0を返す
= IFERROR(VLOOKUP(A1, B:D, 3, FALSE), "該当なし")

' IFNA: #N/Aエラーのみキャッチ（Excel 2013以降）
= IFNA(VLOOKUP(A1, B:D, 3, FALSE), "見つかりません")
' → #N/A以外のエラー（#REF!等）はそのまま表示される（バグに気づける）

' 使い分けの指針:
' IFERROR → 計算式のエラー処理全般
' IFNA   → VLOOKUP/MATCH/XLOOKUPの「見つからない」処理

' エラーの種類
' #DIV/0!  ゼロ除算
' #VALUE!  型の不一致
' #REF!    無効な参照
' #NAME?   認識できない名前
' #N/A     値が見つからない
' #NUM!    無効な数値
' #NULL!   範囲の共通部分なし

' CELL関数: セルの情報を取得
= CELL("address", A1)     ' "$A$1"
= CELL("col", A1)         ' 1
= CELL("type", A1)        ' "v"(数値), "l"(文字列), "b"(空白)
= CELL("format", A1)      ' 表示形式の情報
= CELL("filename")        ' ファイルパスとシート名`,
      },
    ],
  },
  {
    id: "financial-functions",
    title: "財務関数",
    category: "formula",
    description:
      "ローン返済、投資分析、減価償却など、ビジネスで必須の財務関数を学ぶ",
    sections: [
      {
        title: "ローン・返済の計算",
        content:
          "住宅ローンや借入金の月額返済額、利息、元金を計算する関数です。PMT を中心に、IPMT（利息部分）・PPMT（元金部分）も解説します。",
        code: `' PMT: 定期支払額（ローン返済額）
' PMT(利率, 期間, 現在価値, [将来価値], [支払時期])
= PMT(5%/12, 360, -30000000)
' → 月利0.417%、360回払い（30年）、借入3000万円 → 約161,046円/月

' 年利3%・35年・借入4000万円の月額返済
= PMT(3%/12, 35*12, -40000000)          ' 約153,940円/月

' IPMT: 指定期間の利息部分
= IPMT(5%/12, 1, 360, -30000000)        ' 1回目の利息 = 125,000円
= IPMT(5%/12, 360, 360, -30000000)      ' 最終回の利息 = 667円

' PPMT: 指定期間の元金部分
= PPMT(5%/12, 1, 360, -30000000)        ' 1回目の元金 = 36,046円

' NPER: 返済期間の計算
= NPER(3%/12, -100000, 30000000)         ' 月10万円で3000万円完済 → 約432回

' RATE: 金利の逆算
= RATE(360, -150000, 30000000) * 12      ' 月15万円×360回で3000万円 → 年利約4.5%`,
      },
      {
        title: "投資分析",
        content:
          "投資の収益性やキャッシュフローを分析する関数です。将来価値（FV）、現在価値（PV）、正味現在価値（NPV）、内部収益率（IRR）を解説します。",
        code: `' FV: 将来価値（積立投資の最終金額）
' FV(利率, 期間, 定期支払額, [現在価値], [支払時期])
= FV(5%/12, 240, -30000)
' → 月利0.417%、240回（20年）、毎月3万円積立 → 約1,233万円

' 年利7%・30年・毎月5万円積立
= FV(7%/12, 30*12, -50000)              ' 約6,100万円

' PV: 現在価値（将来のお金を今の価値に換算）
= PV(5%/12, 120, -50000)                ' 月5万円を10年間受け取る現在価値

' NPV: 正味現在価値（投資判断）
= NPV(10%, B2:B6)                        ' 割引率10%で各年のCFを現在価値に
= NPV(10%, B2:B6) + B1                   ' 初期投資(B1)を加算

' IRR: 内部収益率
= IRR(A1:A6)
' A1=-1000000（初期投資）, A2:A6 が各年のキャッシュフロー

' XNPV / XIRR: 不定期キャッシュフロー
= XNPV(10%, B1:B6, A1:A6)     ' 日付(A列)とCF(B列)を指定
= XIRR(B1:B6, A1:A6)          ' 不定期CFのIRR`,
      },
      {
        title: "減価償却と実務関数",
        content:
          "固定資産の減価償却計算や、ビジネス実務で使われる財務関数を解説します。",
        code: `' SLN: 定額法による減価償却費
' SLN(取得価額, 残存価額, 耐用年数)
= SLN(1000000, 100000, 5)               ' 年間180,000円

' DB: 定率法による減価償却費
= DB(1000000, 100000, 5, 1)             ' 1年目の償却費
= DB(1000000, 100000, 5, 2)             ' 2年目の償却費

' SYD: 級数法による減価償却費
= SYD(1000000, 100000, 5, 1)            ' 1年目（最も大きい）

' DDB: 倍額定率法
= DDB(1000000, 100000, 5, 1)            ' 1年目

' EFFECT / NOMINAL: 実効年利率と名目年利率の変換
= EFFECT(5%, 12)       ' 名目年利5%・月複利 → 実効年利 5.116%
= NOMINAL(5.116%, 12)  ' 実効年利5.116%・月複利 → 名目年利 5%

' PRICE / YIELD: 債券の価格・利回り（固定利付債）
' （証券分析向けの高度な関数）

' ACCRINT: 経過利息の計算
' DURATION: デュレーション`,
      },
    ],
  },
  {
    id: "database-functions",
    title: "データベース関数",
    category: "formula",
    description:
      "DSUM, DCOUNT, DAVERAGE 等、条件付きでリストを集計するデータベース関数",
    sections: [
      {
        title: "データベース関数の基本",
        content:
          "データベース関数（Dで始まる関数）は、リスト形式のデータに対して条件範囲を使った柔軟な集計を行います。SUMIFS 等では難しい OR 条件や複雑な条件の組み合わせに対応できます。",
        code: `' データベース関数の構文:
' D関数(データベース範囲, フィールド, 条件範囲)
'
' データベース範囲: ヘッダーを含むリスト全体（A1:E100）
' フィールド: 集計する列の名前またはの番号
' 条件範囲: ヘッダー+条件を記述したセル範囲

' --- 条件範囲の例（G1:H3に記述）---
'   G1: 部門    H1: 売上
'   G2: 営業    H2: >=100000
'   G3: 開発    （← 2行目OR 3行目: 営業で10万以上 OR 開発）

' DSUM: 条件に一致する合計
= DSUM(A1:E100, "売上", G1:H3)

' DCOUNT: 条件に一致する数値セルの個数
= DCOUNT(A1:E100, "売上", G1:H2)

' DCOUNTA: 条件に一致する空でないセルの個数
= DCOUNTA(A1:E100, "名前", G1:H2)

' DAVERAGE: 条件に一致する平均
= DAVERAGE(A1:E100, "売上", G1:H2)

' DMAX / DMIN: 条件に一致する最大/最小
= DMAX(A1:E100, "売上", G1:H2)
= DMIN(A1:E100, "売上", G1:H2)

' DGET: 条件に一致する1つの値を返す（一意の場合）
= DGET(A1:E100, "メール", G1:H2)

' DVAR / DSTDEV: 条件付きの分散/標準偏差
= DVAR(A1:E100, "売上", G1:H2)
= DSTDEV(A1:E100, "売上", G1:H2)

' ★ OR条件が扱えるのが最大の利点
' 条件範囲の同一行 = AND条件
' 条件範囲の別の行 = OR条件`,
      },
    ],
  },
  {
    id: "text-functions-advanced",
    title: "文字列関数の応用",
    category: "formula",
    description:
      "EXACT, REPT, CLEAN, CODE/CHAR, NUMBERVALUE 等の高度な文字列操作",
    sections: [
      {
        title: "文字列の比較・変換",
        content:
          "大文字小文字を区別した比較、文字コード変換、データクレンジングに使う高度な文字列関数を解説します。",
        code: `' EXACT: 大文字小文字を区別して比較
= EXACT("ABC", "abc")       ' FALSE
= EXACT("ABC", "ABC")       ' TRUE

' CODE / CHAR: 文字コード変換
= CODE("A")                 ' 65（文字→コード）
= CHAR(65)                  ' "A"（コード→文字）
= CHAR(10)                  ' 改行文字（セル内改行に使用）

' CLEAN: 印刷できない制御文字を除去
= CLEAN(A1)                 ' 制御文字（タブ等）を削除

' TRIM: 余分なスペースを除去（語間は1つ残す）
= TRIM("  Hello   World  ")  ' "Hello World"

' REPT: 文字列を繰り返す
= REPT("★", A1)             ' A1の値分だけ★を繰り返す
= REPT("█", A1/MAX(A:A)*20) ' 簡易棒グラフ

' NUMBERVALUE: 地域書式に依存しない数値変換
= NUMBERVALUE("1.234,56", ",", ".")  ' 1234.56（欧州表記→数値）

' FIXED: 数値を書式付き文字列に変換
= FIXED(1234567, 2, FALSE)  ' "1,234,567.00"
= FIXED(1234567, 0, TRUE)   ' "1234567"（桁区切りなし）`,
      },
      {
        title: "文字列の分割・結合・抽出",
        content:
          "実務でよく使う文字列の分割パターン、正規表現的な抽出テクニック、TEXTJOIN/TEXTSPLIT を使った高度な操作を解説します。",
        code: `' TEXTJOIN: 区切り文字で配列を結合（Excel 2019以降）
= TEXTJOIN(", ", TRUE, A1:A10)       ' 空白セルを無視して結合
= TEXTJOIN(CHAR(10), TRUE, A1:A5)    ' 改行で結合

' TEXTSPLIT: 文字列を分割（Excel 365）
= TEXTSPLIT("A,B,C", ",")            ' 横方向に分割
= TEXTSPLIT("1-2;3-4", "-", ";")     ' 列区切りと行区切り

' SUBSTITUTE で n 番目の特定文字を操作
= SUBSTITUTE("A-B-C-D", "-", "|", 2)  ' "A-B|C-D"（2番目の-を|に）

' メールアドレスからドメインを抽出
= MID(A1, FIND("@", A1)+1, LEN(A1))

' 姓と名を分割（スペース区切り）
= LEFT(A1, FIND(" ", A1)-1)           ' 姓
= MID(A1, FIND(" ", A1)+1, LEN(A1))   ' 名

' 全角↔半角の変換
= ASC(A1)                 ' 全角英数→半角
= JIS(A1)                 ' 半角→全角

' PHONETIC: ふりがなを取得
= PHONETIC(A1)            ' セルのふりがな情報を取得

' BAHTTEXT / YEN: 通貨表示
= YEN(1234.5, 0)          ' "¥1,235"
= TEXT(A1, "[DBNum1]0")   ' 壱弐参...（漢数字）`,
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
  // ===== VBA 変数・データ型・演算子 =====
  {
    id: "vba-variables-types",
    title: "VBA 変数・データ型・演算子",
    category: "vba",
    description:
      "変数宣言、データ型の使い分け、Option Explicit、定数、配列、演算子",
    sections: [
      {
        title: "変数宣言と Option Explicit",
        content:
          "VBA では Dim, Public, Private, Static を使って変数を宣言します。Option Explicit をモジュールの先頭に記述すると、未宣言の変数を使用した場合にコンパイルエラーが発生します。これにより、タイプミスによるバグの混入を防止できます。VBE の「ツール」→「オプション」→「変数の宣言を強制する」にチェックを入れると、新規モジュールに自動挿入されます。",
        code: `Option Explicit

' モジュールレベル変数（モジュール内で共有）
Private mCount As Long

Sub VariableDeclarations()
    ' ローカル変数（プロシージャ内のみ有効）
    Dim userName As String
    Dim age As Integer
    Dim salary As Double

    ' Static 変数（プロシージャ終了後も値を保持）
    Static callCount As Long
    callCount = callCount + 1

    userName = "田中太郎"
    age = 35
    salary = 450000

    ' 変数の値を表示
    Debug.Print "名前: " & userName
    Debug.Print "年齢: " & age
    Debug.Print "給与: " & Format(salary, "#,##0") & "円"
    Debug.Print "呼出回数: " & callCount
End Sub

' Public 変数（他のモジュールからもアクセス可能）
Public gAppName As String`,
      },
      {
        title: "データ型の詳細",
        content:
          "VBA には多くのデータ型があり、用途に応じて使い分けます。String は文字列、Integer は -32,768～32,767 の整数、Long は約±21億の整数です。Double は浮動小数点数、Currency は通貨計算に適した固定小数点型です。Variant はどんな型でも格納できますが、メモリ消費が大きく処理も遅いため、明示的な型指定が推奨されます。",
        code: `Sub DataTypes()
    ' 文字列型
    Dim fullName As String
    fullName = "山田花子"

    ' 整数型（小さい範囲）
    Dim score As Integer  ' -32,768 ～ 32,767

    ' 長整数型（大きい範囲）- 行番号に最適
    Dim rowNum As Long    ' -2,147,483,648 ～ 2,147,483,647

    ' 浮動小数点型
    Dim rate As Double    ' 15桁の精度
    rate = 0.08

    ' 通貨型（誤差なし、小数4桁）
    Dim price As Currency
    price = 19800.5

    ' 日付型
    Dim today As Date
    today = Date  ' 本日の日付

    ' ブール型
    Dim isValid As Boolean
    isValid = True

    ' Variant型（型が不定の場合のみ使用）
    Dim anything As Variant
    anything = "文字列も数値も格納可能"

    ' Object型
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets(1)

    Debug.Print TypeName(fullName)  ' String
    Debug.Print TypeName(rate)      ' Double
    Debug.Print TypeName(today)     ' Date
End Sub`,
      },
      {
        title: "定数と列挙型",
        content:
          "Const を使うと値が変更できない定数を定義できます。マジックナンバーを避け、コードの可読性を高めるために活用します。Enum を使うと関連する定数をグループ化できます。また VBA には vbCrLf（改行）、vbTab（タブ）などの組み込み定数が用意されています。",
        code: `' 定数の宣言
Const TAX_RATE As Double = 0.1
Const MAX_ROWS As Long = 1000
Const APP_TITLE As String = "売上管理システム"

' 列挙型の定義
Enum Department
    Sales = 1
    Marketing = 2
    Engineering = 3
    HumanResources = 4
    Finance = 5
End Enum

Sub UseConstants()
    ' 定数を使った計算
    Dim price As Currency
    price = 10000
    Dim taxIncluded As Currency
    taxIncluded = price * (1 + TAX_RATE)

    ' 列挙型の使用
    Dim dept As Department
    dept = Sales

    ' 組み込み定数の活用
    Dim msg As String
    msg = "商品名: Excel教本" & vbCrLf
    msg = msg & "価格: " & Format(price, "#,##0") & "円" & vbCrLf
    msg = msg & "税込: " & Format(taxIncluded, "#,##0") & "円"

    MsgBox msg, vbInformation, APP_TITLE
End Sub`,
      },
      {
        title: "配列",
        content:
          "配列は同じ型のデータを連続して格納できるデータ構造です。静的配列はサイズが固定で、動的配列は ReDim でサイズを変更できます。ReDim Preserve を使うと既存のデータを保持したままサイズを拡張できます。UBound と LBound で配列の上限・下限のインデックスを取得できます。",
        code: `Sub ArrayExamples()
    ' 静的配列（固定サイズ）
    Dim scores(1 To 5) As Long
    scores(1) = 85
    scores(2) = 92
    scores(3) = 78
    scores(4) = 95
    scores(5) = 88

    ' 動的配列
    Dim names() As String
    ReDim names(1 To 3)
    names(1) = "佐藤"
    names(2) = "鈴木"
    names(3) = "高橋"

    ' ReDim Preserve でサイズ拡張（データ保持）
    ReDim Preserve names(1 To 5)
    names(4) = "田中"
    names(5) = "伊藤"

    ' Array関数で初期化
    Dim fruits As Variant
    fruits = Array("りんご", "みかん", "ぶどう")

    ' UBound / LBound で範囲を取得
    Dim i As Long
    For i = LBound(scores) To UBound(scores)
        Debug.Print "スコア" & i & ": " & scores(i)
    Next i

    ' 多次元配列（行×列）
    Dim matrix(1 To 3, 1 To 2) As String
    matrix(1, 1) = "田中"
    matrix(1, 2) = "営業部"
    matrix(2, 1) = "鈴木"
    matrix(2, 2) = "開発部"
    matrix(3, 1) = "佐藤"
    matrix(3, 2) = "総務部"
End Sub`,
      },
      {
        title: "演算子",
        content:
          "VBA の算術演算子には +, -, *, /, \\（整数除算）, Mod（剰余）, ^（べき乗）があります。比較演算子は =, <>, <, >, <=, >= で、論理演算子は And, Or, Not, Xor です。文字列の連結には & 演算子を使います。+ でも連結できますが、型の不一致でエラーになる可能性があるため & が推奨されます。",
        code: `Sub OperatorExamples()
    ' 算術演算子
    Debug.Print 10 + 3    ' 13（加算）
    Debug.Print 10 - 3    ' 7（減算）
    Debug.Print 10 * 3    ' 30（乗算）
    Debug.Print 10 / 3    ' 3.333...（除算）
    Debug.Print 10 \\ 3    ' 3（整数除算）
    Debug.Print 10 Mod 3  ' 1（剰余）
    Debug.Print 2 ^ 10    ' 1024（べき乗）

    ' 比較演算子
    Dim x As Long: x = 50
    Debug.Print x > 30    ' True
    Debug.Print x = 50    ' True
    Debug.Print x <> 100  ' True

    ' 論理演算子
    Dim a As Boolean: a = True
    Dim b As Boolean: b = False
    Debug.Print a And b   ' False
    Debug.Print a Or b    ' True
    Debug.Print Not a     ' False

    ' 実用例: 条件の組み合わせ
    Dim age As Long: age = 25
    Dim score As Long: score = 80
    If age >= 20 And score >= 70 Then
        Debug.Print "合格条件を満たしています"
    End If

    ' 文字列連結（& を推奨）
    Dim firstName As String: firstName = "太郎"
    Dim lastName As String: lastName = "山田"
    Debug.Print lastName & " " & firstName  ' 山田 太郎
End Sub`,
      },
    ],
  },
  // ===== VBA 制御構造 =====
  {
    id: "vba-control-flow",
    title: "VBA 制御構造",
    category: "vba",
    description:
      "条件分岐、繰り返し、Select Case、エラー処理の完全ガイド",
    sections: [
      {
        title: "If文の応用",
        content:
          "If...Then...ElseIf...Else...End If は最も基本的な条件分岐です。複数の条件を ElseIf で連結でき、ネストも可能です。1行で書ける IIf 関数もありますが、両方の引数が評価される点に注意が必要です。実務では入力チェックや条件に応じたセル書式の変更などに多用されます。",
        code: `Sub IfStatementExamples()
    Dim ws As Worksheet
    Set ws = ActiveSheet
    Dim lastRow As Long
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row

    ' 各行の売上データを評価して判定列に結果を出力
    Dim i As Long
    For i = 2 To lastRow
        Dim sales As Double
        sales = ws.Cells(i, 2).Value  ' B列: 売上金額

        ' 複数条件の分岐
        If sales >= 1000000 Then
            ws.Cells(i, 3).Value = "S ランク"
            ws.Cells(i, 3).Font.Color = RGB(0, 128, 0)
        ElseIf sales >= 500000 Then
            ws.Cells(i, 3).Value = "A ランク"
            ws.Cells(i, 3).Font.Color = RGB(0, 0, 255)
        ElseIf sales >= 200000 Then
            ws.Cells(i, 3).Value = "B ランク"
            ws.Cells(i, 3).Font.Color = RGB(0, 0, 0)
        Else
            ws.Cells(i, 3).Value = "C ランク"
            ws.Cells(i, 3).Font.Color = RGB(255, 0, 0)
        End If

        ' IIf関数（1行If）
        ws.Cells(i, 4).Value = IIf(sales >= 500000, "目標達成", "未達成")
    Next i

    MsgBox "評価が完了しました", vbInformation
End Sub`,
      },
      {
        title: "Select Case",
        content:
          "Select Case は複数の値を比較する場合に If 文よりも読みやすいコードが書けます。数値範囲の指定には To 演算子、比較には Is 演算子を使います。Case Else ですべての条件に一致しない場合の処理を記述できます。文字列の比較や複数値の列挙も可能です。",
        code: `Sub SelectCaseExamples()
    ' 点数に応じた成績判定
    Dim score As Long
    score = Range("A1").Value

    Select Case score
        Case 90 To 100
            MsgBox "秀（A+）"
        Case 80 To 89
            MsgBox "優（A）"
        Case 70 To 79
            MsgBox "良（B）"
        Case 60 To 69
            MsgBox "可（C）"
        Case Is < 60
            MsgBox "不可（F）"
        Case Else
            MsgBox "不正な点数です"
    End Select

    ' 文字列の比較
    Dim dept As String
    dept = Range("B1").Value

    Select Case dept
        Case "営業", "マーケティング"
            MsgBox "フロントオフィス部門です"
        Case "開発", "インフラ"
            MsgBox "テクノロジー部門です"
        Case "人事", "総務", "経理"
            MsgBox "バックオフィス部門です"
        Case Else
            MsgBox "不明な部門: " & dept
    End Select
End Sub`,
      },
      {
        title: "For ループ",
        content:
          "For...Next は回数が決まっている繰り返しに使います。Step で増分を指定でき、負の値にすれば逆順ループも可能です。For Each...Next はコレクションや配列の全要素を順に処理する場合に最適です。Exit For でループを途中で抜けることもできます。",
        code: `Sub ForLoopExamples()
    Dim ws As Worksheet
    Set ws = ActiveSheet

    ' 基本的な For ループ（1～10行目に連番を入力）
    Dim i As Long
    For i = 1 To 10
        ws.Cells(i, 1).Value = i
    Next i

    ' Step を使った逆順ループ（空白行の削除に便利）
    Dim lastRow As Long
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
    Dim r As Long
    For r = lastRow To 1 Step -1
        If ws.Cells(r, 1).Value = "" Then
            ws.Rows(r).Delete
        End If
    Next r

    ' For Each でセル範囲を処理
    Dim cell As Range
    For Each cell In ws.Range("B2:B100")
        If IsNumeric(cell.Value) And cell.Value <> "" Then
            If cell.Value < 0 Then
                cell.Font.Color = RGB(255, 0, 0)  ' 負の値は赤
            End If
        End If
    Next cell

    ' For Each でシートを処理
    Dim sht As Worksheet
    For Each sht In ThisWorkbook.Worksheets
        Debug.Print sht.Name & ": " & sht.UsedRange.Rows.Count & "行"
    Next sht
End Sub`,
      },
      {
        title: "Do ループ",
        content:
          "Do While...Loop は条件が True の間繰り返し、Do Until...Loop は条件が True になるまで繰り返します。条件をループの先頭に置く前判定と、末尾に置く後判定があり、後判定は最低1回実行されます。無限ループ防止のため、カウンタ変数やタイムアウト処理を入れることが重要です。",
        code: `Sub DoLoopExamples()
    Dim ws As Worksheet
    Set ws = ActiveSheet

    ' Do While...Loop（空でないセルを順に処理）
    Dim r As Long: r = 1
    Do While ws.Cells(r, 1).Value <> ""
        ws.Cells(r, 2).Value = UCase(ws.Cells(r, 1).Value)
        r = r + 1
    Loop
    Debug.Print r - 1 & "行を処理しました"

    ' Do Until...Loop（条件が満たされるまで繰り返す）
    Dim total As Double: total = 0
    Dim row As Long: row = 2
    Do Until total >= 1000000
        If ws.Cells(row, 3).Value = "" Then Exit Do
        total = total + ws.Cells(row, 3).Value
        row = row + 1
    Loop
    Debug.Print "合計が100万に達した行: " & row

    ' 後判定ループ（最低1回実行）
    Dim input_ As String
    Do
        input_ = InputBox("パスワードを入力してください")
        If input_ = "" Then Exit Do  ' キャンセル対策
    Loop While input_ <> "pass1234"

    ' 無限ループ防止のカウンタ
    Dim safeCount As Long: safeCount = 0
    Do While True
        safeCount = safeCount + 1
        If safeCount > 10000 Then
            MsgBox "ループ上限に達しました", vbExclamation
            Exit Do
        End If
        ' 処理...
        If ws.Cells(safeCount, 1).Value = "END" Then Exit Do
    Loop
End Sub`,
      },
      {
        title: "エラー処理",
        content:
          "On Error GoTo でエラー発生時にラベルにジャンプし、Err オブジェクトでエラー情報を取得します。On Error Resume Next は次の行に処理を続行しますが、必ず直後にエラーチェックを行う必要があります。堅牢なマクロにはエラーハンドラが不可欠で、リソースの解放や画面更新の復帰処理も忘れずに記述します。",
        code: `Sub ErrorHandlingExample()
    On Error GoTo ErrorHandler

    ' 画面更新を停止（高速化）
    Application.ScreenUpdating = False
    Application.Calculation = xlCalculationManual

    ' メイン処理
    Dim wb As Workbook
    Set wb = Workbooks.Open("C:\\Data\\売上データ.xlsx")

    Dim ws As Worksheet
    Set ws = wb.Sheets("月次集計")

    Dim lastRow As Long
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row

    Dim total As Double
    Dim i As Long
    For i = 2 To lastRow
        total = total + ws.Cells(i, 4).Value
    Next i

    MsgBox "合計: " & Format(total, "#,##0") & "円"

CleanUp:
    ' リソース解放（エラー時も必ず実行）
    Application.ScreenUpdating = True
    Application.Calculation = xlCalculationAutomatic
    If Not wb Is Nothing Then wb.Close SaveChanges:=False
    Exit Sub

ErrorHandler:
    ' エラー情報を表示
    MsgBox "エラーが発生しました" & vbCrLf & _
           "エラー番号: " & Err.Number & vbCrLf & _
           "説明: " & Err.Description, vbCritical
    Resume CleanUp
End Sub`,
      },
    ],
  },
  // ===== VBA セル・範囲操作の完全ガイド =====
  {
    id: "vba-cells-ranges",
    title: "VBA セル・範囲操作の完全ガイド",
    category: "vba",
    description:
      "Range, Cells, Offset, Resize, CurrentRegion, SpecialCells",
    sections: [
      {
        title: "Range と Cells",
        content:
          "セルの参照には Range と Cells の2つの方法があります。Range(\"A1\") はアドレス文字列で指定し、Cells(1,1) は行番号と列番号で指定します。変数でループ処理する場合は Cells が便利で、固定のセル範囲を指定する場合は Range が読みやすくなります。名前付き範囲は Range(\"売上合計\") のように名前で参照できます。",
        code: `Sub RangeAndCells()
    Dim ws As Worksheet
    Set ws = ActiveSheet

    ' Range でセルを参照
    ws.Range("A1").Value = "商品名"
    ws.Range("B1").Value = "価格"
    ws.Range("C1").Value = "数量"
    ws.Range("D1").Value = "小計"

    ' Cells で行・列番号を使って参照
    Dim i As Long
    For i = 2 To 11
        ws.Cells(i, 1).Value = "商品" & (i - 1)
        ws.Cells(i, 2).Value = Int(Rnd() * 1000 + 100)  ' 価格
        ws.Cells(i, 3).Value = Int(Rnd() * 50 + 1)      ' 数量
        ws.Cells(i, 4).Formula = "=B" & i & "*C" & i     ' 小計
    Next i

    ' 範囲を一括で参照
    ws.Range("A1:D1").Font.Bold = True
    ws.Range("A1:D1").Interior.Color = RGB(200, 220, 255)

    ' 名前付き範囲の作成と参照
    ws.Names.Add Name:="商品リスト", RefersTo:=ws.Range("A2:A11")
    Debug.Print ws.Range("商品リスト").Cells.Count & "件の商品"

    ' Range と Cells の組み合わせ
    Dim rng As Range
    Set rng = ws.Range(ws.Cells(2, 1), ws.Cells(11, 4))
    rng.Borders.LineStyle = xlContinuous
End Sub`,
      },
      {
        title: "セルの読み書き",
        content:
          "Value プロパティでセルの値を読み書きします。Value2 は Date 型や Currency 型を Double として返すため高速です。Text プロパティは表示されている文字列を取得します。Formula で数式を設定でき、PasteSpecial で値のみ・書式のみの貼り付けが可能です。",
        code: `Sub ReadWriteCells()
    Dim ws As Worksheet
    Set ws = ActiveSheet

    ' 値の書き込み
    ws.Range("A1").Value = "テスト"
    ws.Range("B1").Value = 12345.678
    ws.Range("C1").Value = Now  ' 現在の日時

    ' 値の読み取り
    Dim val1 As Variant
    val1 = ws.Range("B1").Value   ' 12345.678（Currency/Date型を保持）
    Dim val2 As Double
    val2 = ws.Range("B1").Value2  ' 高速（型変換なし）
    Dim txt As String
    txt = ws.Range("B1").Text     ' 表示文字列 "12,346" など

    ' 数式の設定
    ws.Range("D1").Formula = "=SUM(B1:B100)"
    ws.Range("D2").FormulaR1C1 = "=SUM(R1C2:R100C2)"

    ' コピー＆ペースト
    ws.Range("A1:D1").Copy
    ws.Range("A10").PasteSpecial xlPasteValues      ' 値のみ貼付
    ws.Range("A11").PasteSpecial xlPasteFormats      ' 書式のみ貼付
    ws.Range("A12").PasteSpecial xlPasteFormulas     ' 数式のみ貼付
    Application.CutCopyMode = False  ' コピーモード解除

    ' セル内容のクリア
    ws.Range("A20").ClearContents  ' 値のみクリア
    ws.Range("A21").ClearFormats   ' 書式のみクリア
    ws.Range("A22").Clear          ' すべてクリア
End Sub`,
      },
      {
        title: "範囲の動的取得",
        content:
          "CurrentRegion はアクティブセルを含む連続データ範囲を自動検出します。End プロパティは Ctrl+矢印キーと同じ動きで、最終行や最終列の取得に使います。UsedRange はシート上の使用済み範囲全体を返します。これらを組み合わせることで、データ量が変化しても正確に範囲を特定できます。",
        code: `Sub DynamicRanges()
    Dim ws As Worksheet
    Set ws = ActiveSheet

    ' 最終行の取得（最も信頼性の高い方法）
    Dim lastRow As Long
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
    Debug.Print "A列の最終行: " & lastRow

    ' 最終列の取得
    Dim lastCol As Long
    lastCol = ws.Cells(1, ws.Columns.Count).End(xlToLeft).Column
    Debug.Print "1行目の最終列: " & lastCol

    ' データ範囲全体を取得
    Dim dataRange As Range
    Set dataRange = ws.Range("A1").CurrentRegion
    Debug.Print "データ範囲: " & dataRange.Address
    Debug.Print "行数: " & dataRange.Rows.Count
    Debug.Print "列数: " & dataRange.Columns.Count

    ' UsedRange（シート全体の使用範囲）
    Debug.Print "使用範囲: " & ws.UsedRange.Address

    ' 動的範囲の指定（ヘッダー除く）
    Dim bodyRange As Range
    Set bodyRange = ws.Range("A2:A" & lastRow)

    ' 動的に全データ範囲を選択
    Dim fullRange As Range
    Set fullRange = ws.Range(ws.Cells(1, 1), ws.Cells(lastRow, lastCol))
    fullRange.Borders.LineStyle = xlContinuous

    ' データの件数を表示
    MsgBox "データ件数: " & (lastRow - 1) & "件" & vbCrLf & _
           "列数: " & lastCol & "列", vbInformation
End Sub`,
      },
      {
        title: "Offset と Resize",
        content:
          "Offset は基準セルから行方向・列方向に相対移動した位置のセルを返します。Resize は範囲のサイズ（行数・列数）を変更します。この2つを組み合わせると、ヘッダー行を除いたデータ範囲の取得や、動的にサイズが変わる範囲の指定が簡潔に書けます。",
        code: `Sub OffsetAndResize()
    Dim ws As Worksheet
    Set ws = ActiveSheet
    Dim baseCell As Range
    Set baseCell = ws.Range("B2")

    ' Offset: 基準セルからの相対移動
    baseCell.Offset(0, 0).Value = "基準"   ' B2（移動なし）
    baseCell.Offset(1, 0).Value = "1行下"  ' B3
    baseCell.Offset(0, 1).Value = "1列右"  ' C2
    baseCell.Offset(-1, 0).Value = "1行上" ' B1
    baseCell.Offset(2, 3).Value = "2行下3列右" ' E4

    ' Resize: 範囲サイズの変更
    Dim singleCell As Range
    Set singleCell = ws.Range("A1")

    ' 1セルを5行×3列に拡大
    singleCell.Resize(5, 3).Interior.Color = RGB(255, 255, 200)

    ' CurrentRegion からヘッダーを除外
    Dim fullRange As Range
    Set fullRange = ws.Range("A1").CurrentRegion

    ' ヘッダー行を除いたデータ範囲
    Dim dataRange As Range
    Set dataRange = fullRange.Offset(1, 0).Resize(fullRange.Rows.Count - 1)
    Debug.Print "データ範囲: " & dataRange.Address

    ' 実用例: 最終行の次の行にデータを追加
    Dim lastRow As Long
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
    Dim newRow As Range
    Set newRow = ws.Cells(lastRow, 1).Offset(1, 0).Resize(1, 4)
    newRow.Value = Array("新商品", 5000, 10, 50000)
End Sub`,
      },
      {
        title: "SpecialCells と Find",
        content:
          "SpecialCells メソッドで空白セル、数式セル、定数セル、可視セルなど特定の条件に合うセルだけを取得できます。Find メソッドはセル内の文字列を検索し、FindNext で次の一致を探します。Replace メソッドで一括置換も可能です。これらはデータのクリーニングや検索処理で頻繁に使用されます。",
        code: `Sub SpecialCellsAndFind()
    Dim ws As Worksheet
    Set ws = ActiveSheet
    Dim rng As Range

    ' 空白セルを取得して「N/A」を入力
    On Error Resume Next
    Set rng = ws.UsedRange.SpecialCells(xlCellTypeBlanks)
    On Error GoTo 0
    If Not rng Is Nothing Then
        rng.Value = "N/A"
        Debug.Print "空白セル数: " & rng.Cells.Count
    End If

    ' 数式セルだけを取得
    On Error Resume Next
    Set rng = ws.UsedRange.SpecialCells(xlCellTypeFormulas)
    On Error GoTo 0
    If Not rng Is Nothing Then
        rng.Font.Color = RGB(0, 0, 255)  ' 数式セルを青字に
    End If

    ' Find でセルを検索
    Dim foundCell As Range
    Set foundCell = ws.Range("A:A").Find( _
        What:="東京", LookIn:=xlValues, LookAt:=xlPart)

    If Not foundCell Is Nothing Then
        Dim firstAddr As String
        firstAddr = foundCell.Address
        Do
            Debug.Print "発見: " & foundCell.Address & " = " & foundCell.Value
            Set foundCell = ws.Range("A:A").FindNext(foundCell)
        Loop While Not foundCell Is Nothing And foundCell.Address <> firstAddr
    End If

    ' Replace で一括置換
    ws.Range("A:A").Replace What:="旧会社名", _
        Replacement:="新会社名", LookAt:=xlPart
End Sub`,
      },
    ],
  },
  // ===== VBA シート・ブック操作 =====
  {
    id: "vba-worksheet-workbook",
    title: "VBA シート・ブック操作",
    category: "vba",
    description:
      "シートの追加・削除・コピー、ブックの開閉・保存、ファイル操作",
    sections: [
      {
        title: "シート操作",
        content:
          "Worksheets.Add でシートを追加し、Name プロパティで名前を変更できます。Copy メソッドでシートを複製、Move で移動、Delete で削除します。削除時の確認ダイアログは Application.DisplayAlerts = False で抑制できます。Visible プロパティでシートの表示・非表示・完全非表示を制御できます。",
        code: `Sub SheetOperations()
    Dim wb As Workbook
    Set wb = ThisWorkbook

    ' シートの追加（末尾に追加）
    Dim newSheet As Worksheet
    Set newSheet = wb.Worksheets.Add(After:=wb.Sheets(wb.Sheets.Count))
    newSheet.Name = "集計_" & Format(Date, "yyyymmdd")

    ' シートのコピー（指定シートの後ろに複製）
    wb.Sheets("テンプレート").Copy After:=wb.Sheets(wb.Sheets.Count)
    ActiveSheet.Name = "報告書_" & Format(Date, "yyyymm")

    ' シートの表示/非表示
    wb.Sheets("設定").Visible = xlSheetHidden      ' 非表示（ユーザーが再表示可能）
    wb.Sheets("マスタ").Visible = xlSheetVeryHidden ' 完全非表示（VBAでのみ再表示）

    ' シートの存在確認
    Dim sheetExists As Boolean
    Dim ws As Worksheet
    For Each ws In wb.Worksheets
        If ws.Name = "集計" Then
            sheetExists = True
            Exit For
        End If
    Next ws

    ' シートの削除（確認ダイアログを抑制）
    If sheetExists Then
        Application.DisplayAlerts = False
        wb.Sheets("集計").Delete
        Application.DisplayAlerts = True
    End If

    ' シート一覧を出力
    For Each ws In wb.Worksheets
        Debug.Print ws.Index & ": " & ws.Name
    Next ws
End Sub`,
      },
      {
        title: "ブック操作",
        content:
          "Workbooks.Open でブックを開き、Workbooks.Add で新規ブックを作成します。Save で上書き保存、SaveAs で別名保存、Close で閉じます。ブック間のデータコピーでは、ソースと先のワークシートを明示的に指定することが重要です。",
        code: `Sub WorkbookOperations()
    ' 既存ブックを開く
    Dim srcWB As Workbook
    Set srcWB = Workbooks.Open("C:\\Data\\元データ.xlsx", ReadOnly:=True)

    ' 新規ブックの作成
    Dim newWB As Workbook
    Set newWB = Workbooks.Add

    ' ブック間のデータコピー
    Dim srcWS As Worksheet
    Set srcWS = srcWB.Sheets("売上")
    Dim dstWS As Worksheet
    Set dstWS = newWB.Sheets(1)
    dstWS.Name = "売上コピー"

    ' データ範囲をコピー
    Dim lastRow As Long
    lastRow = srcWS.Cells(srcWS.Rows.Count, 1).End(xlUp).Row
    srcWS.Range("A1:D" & lastRow).Copy dstWS.Range("A1")

    ' 別名で保存
    Dim savePath As String
    savePath = "C:\\Data\\売上レポート_" & Format(Date, "yyyymmdd") & ".xlsx"
    newWB.SaveAs Filename:=savePath, FileFormat:=xlOpenXMLWorkbook

    ' ブックを閉じる
    srcWB.Close SaveChanges:=False
    MsgBox "保存完了: " & savePath, vbInformation
End Sub`,
      },
      {
        title: "ファイルダイアログ",
        content:
          "Application.FileDialog を使うと、ユーザーにファイルやフォルダを選択させるダイアログを表示できます。msoFileDialogFilePicker でファイル選択、msoFileDialogFolderPicker でフォルダ選択が可能です。フィルター設定で特定の拡張子のみ表示でき、複数ファイルの選択にも対応しています。",
        code: `Sub FileDialogExamples()
    ' ファイル選択ダイアログ
    Dim fd As FileDialog
    Set fd = Application.FileDialog(msoFileDialogFilePicker)

    With fd
        .Title = "取り込むファイルを選択してください"
        .InitialFileName = "C:\\Data\\"
        .AllowMultiSelect = True
        .Filters.Clear
        .Filters.Add "Excelファイル", "*.xlsx; *.xlsm; *.xls"
        .Filters.Add "CSVファイル", "*.csv"
        .Filters.Add "すべてのファイル", "*.*"

        If .Show = -1 Then
            Dim i As Long
            For i = 1 To .SelectedItems.Count
                Debug.Print "選択: " & .SelectedItems(i)
            Next i
        Else
            MsgBox "キャンセルされました"
            Exit Sub
        End If
    End With

    ' フォルダ選択ダイアログ
    Dim fdFolder As FileDialog
    Set fdFolder = Application.FileDialog(msoFileDialogFolderPicker)

    With fdFolder
        .Title = "出力先フォルダを選択してください"
        .InitialFileName = "C:\\Output\\"
        If .Show = -1 Then
            Dim folderPath As String
            folderPath = .SelectedItems(1)
            Debug.Print "出力先: " & folderPath
        End If
    End With
End Sub`,
      },
      {
        title: "ファイルシステム操作",
        content:
          "Dir 関数を使うとフォルダ内のファイル一覧を取得できます。FileSystemObject（FSO）を使うとファイルやフォルダのより高度な操作が可能です。フォルダ内の全 Excel ファイルを順に処理するマクロは、月次データの一括集計などで頻繁に使用されます。",
        code: `Sub FileSystemExamples()
    ' Dir関数でフォルダ内のファイルを順に処理
    Dim folderPath As String
    folderPath = "C:\\Data\\月次報告\\"

    Dim fileName As String
    fileName = Dir(folderPath & "*.xlsx")

    Do While fileName <> ""
        Debug.Print "処理中: " & fileName

        Dim wb As Workbook
        Set wb = Workbooks.Open(folderPath & fileName, ReadOnly:=True)

        ' データ処理...
        Dim lastRow As Long
        lastRow = wb.Sheets(1).Cells(wb.Sheets(1).Rows.Count, 1).End(xlUp).Row
        Debug.Print "  行数: " & lastRow

        wb.Close SaveChanges:=False
        fileName = Dir()  ' 次のファイル
    Loop

    ' FileSystemObject を使った高度な操作
    Dim fso As Object
    Set fso = CreateObject("Scripting.FileSystemObject")

    ' フォルダの存在確認と作成
    If Not fso.FolderExists("C:\\Data\\出力") Then
        fso.CreateFolder "C:\\Data\\出力"
    End If

    ' ファイルのコピー
    If fso.FileExists("C:\\Data\\元.xlsx") Then
        fso.CopyFile "C:\\Data\\元.xlsx", "C:\\Data\\出力\\バックアップ.xlsx"
    End If

    ' ファイル情報の取得
    Dim f As Object
    Set f = fso.GetFile("C:\\Data\\元.xlsx")
    Debug.Print "サイズ: " & f.Size & " bytes"
    Debug.Print "更新日: " & f.DateLastModified
End Sub`,
      },
      {
        title: "CSV/テキストファイル操作",
        content:
          "Open ステートメントで CSV やテキストファイルの読み書きができます。Input モードで読み込み、Output/Append モードで書き込みます。文字コードの指定が必要な場合は ADODB.Stream を使用します。大量データの CSV 処理は QueryTable や Power Query との組み合わせも検討しましょう。",
        code: `Sub CSVOperations()
    ' CSVファイルの読み込み
    Dim filePath As String
    filePath = "C:\\Data\\売上データ.csv"

    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets.Add
    ws.Name = "CSV取込"

    Dim fileNum As Integer
    fileNum = FreeFile
    Open filePath For Input As #fileNum

    Dim row As Long: row = 1
    Dim line As String
    Do While Not EOF(fileNum)
        Line Input #fileNum, line
        Dim cols As Variant
        cols = Split(line, ",")
        Dim col As Long
        For col = 0 To UBound(cols)
            ws.Cells(row, col + 1).Value = cols(col)
        Next col
        row = row + 1
    Loop
    Close #fileNum

    ' CSVファイルの書き出し
    Dim outPath As String
    outPath = "C:\\Data\\出力結果.csv"
    fileNum = FreeFile
    Open outPath For Output As #fileNum

    Dim lastRow As Long
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
    Dim i As Long
    For i = 1 To lastRow
        Dim csvLine As String
        csvLine = ws.Cells(i, 1).Value & "," & _
                  ws.Cells(i, 2).Value & "," & _
                  ws.Cells(i, 3).Value
        Print #fileNum, csvLine
    Next i
    Close #fileNum

    ' UTF-8 対応（ADODB.Stream）
    Dim stm As Object
    Set stm = CreateObject("ADODB.Stream")
    stm.Type = 2  ' テキスト
    stm.Charset = "UTF-8"
    stm.Open
    stm.WriteText "名前,部門,売上" & vbCrLf
    stm.WriteText "田中,営業,500000" & vbCrLf
    stm.SaveToFile "C:\\Data\\utf8出力.csv", 2  ' 上書き
    stm.Close
End Sub`,
      },
    ],
  },
  // ===== VBA 書式設定・表の作成 =====
  {
    id: "vba-formatting",
    title: "VBA 書式設定・表の作成",
    category: "vba",
    description:
      "フォント、罫線、色、条件付き書式、テーブル作成の自動化",
    sections: [
      {
        title: "フォント設定",
        content:
          "Font オブジェクトのプロパティでフォント名、サイズ、太字、斜体、色などを設定できます。Color プロパティには RGB 関数で色を指定し、ColorIndex では Excel の標準56色パレットのインデックスを使います。複数のプロパティを With ステートメントでまとめて設定すると効率的です。",
        code: `Sub FontSettings()
    Dim ws As Worksheet
    Set ws = ActiveSheet

    ' 基本的なフォント設定
    With ws.Range("A1")
        .Value = "売上レポート"
        .Font.Name = "メイリオ"
        .Font.Size = 16
        .Font.Bold = True
        .Font.Color = RGB(0, 51, 102)  ' 濃い青
    End With

    ' 範囲に一括でフォント設定
    With ws.Range("A3:E3")  ' ヘッダー行
        .Font.Name = "游ゴシック"
        .Font.Size = 11
        .Font.Bold = True
        .Font.Color = RGB(255, 255, 255)  ' 白文字
        .Interior.Color = RGB(0, 102, 153) ' 背景色
    End With

    ' データ部分のフォント
    Dim lastRow As Long
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
    With ws.Range("A4:E" & lastRow)
        .Font.Name = "游ゴシック"
        .Font.Size = 10
    End With

    ' 特定条件でフォントを変更
    Dim cell As Range
    For Each cell In ws.Range("E4:E" & lastRow)
        If IsNumeric(cell.Value) Then
            If cell.Value < 0 Then
                cell.Font.Color = RGB(255, 0, 0)
                cell.Font.Bold = True
            ElseIf cell.Value >= 1000000 Then
                cell.Font.Color = RGB(0, 128, 0)
            End If
        End If
    Next cell
End Sub`,
      },
      {
        title: "セルの書式",
        content:
          "NumberFormat で日付、通貨、パーセントなどの表示形式を設定します。HorizontalAlignment と VerticalAlignment でセル内の文字位置を制御します。MergeCells でセルの結合、WrapText で文字の折り返し、RowHeight と ColumnWidth でサイズを調整できます。",
        code: `Sub CellFormatting()
    Dim ws As Worksheet
    Set ws = ActiveSheet

    ' 表示形式の設定
    ws.Range("A2:A100").NumberFormat = "yyyy/mm/dd"       ' 日付
    ws.Range("B2:B100").NumberFormat = "#,##0"             ' 数値（千桁カンマ）
    ws.Range("C2:C100").NumberFormat = "\\¥#,##0"           ' 通貨
    ws.Range("D2:D100").NumberFormat = "0.0%"              ' パーセント
    ws.Range("E2:E100").NumberFormat = "000-0000"          ' 郵便番号

    ' 文字の配置
    With ws.Range("A1:F1")
        .HorizontalAlignment = xlCenter    ' 水平: 中央揃え
        .VerticalAlignment = xlCenter      ' 垂直: 中央揃え
    End With
    ws.Range("B2:D100").HorizontalAlignment = xlRight  ' 数値は右揃え

    ' セルの結合
    ws.Range("A1:F1").Merge
    ws.Range("A1").Value = "月次売上レポート"
    ws.Range("A1").Font.Size = 14

    ' 文字の折り返し
    ws.Range("F2:F100").WrapText = True

    ' 行の高さ・列の幅
    ws.Rows(1).RowHeight = 30
    ws.Rows("2:100").RowHeight = 20
    ws.Columns("A").ColumnWidth = 12
    ws.Columns("F").ColumnWidth = 30

    ' 列幅の自動調整
    ws.Range("A:E").Columns.AutoFit
End Sub`,
      },
      {
        title: "罫線",
        content:
          "Borders コレクションで罫線のスタイル、太さ、色を設定できます。xlEdgeTop, xlEdgeBottom, xlInsideHorizontal などの定数で個別の辺を指定します。格子線を一括設定するには Borders 全体に LineStyle を設定し、外枠だけ太線にするなどの調整が可能です。",
        code: `Sub BorderSettings()
    Dim ws As Worksheet
    Set ws = ActiveSheet
    Dim lastRow As Long
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
    Dim dataRange As Range
    Set dataRange = ws.Range("A2:E" & lastRow)

    ' 格子線（内側の罫線）
    With dataRange.Borders
        .LineStyle = xlContinuous  ' 実線
        .Weight = xlThin           ' 細線
        .Color = RGB(180, 180, 180) ' グレー
    End With

    ' ヘッダー行の下線を太く
    With ws.Range("A2:E2").Borders(xlEdgeBottom)
        .LineStyle = xlContinuous
        .Weight = xlMedium
        .Color = RGB(0, 0, 0)
    End With

    ' 表全体の外枠を太線
    Dim tableRange As Range
    Set tableRange = ws.Range("A2:E" & lastRow)
    With tableRange
        .Borders(xlEdgeTop).Weight = xlMedium
        .Borders(xlEdgeBottom).Weight = xlMedium
        .Borders(xlEdgeLeft).Weight = xlMedium
        .Borders(xlEdgeRight).Weight = xlMedium
    End With

    ' 罫線をクリア
    ' ws.Range("A1:E1").Borders.LineStyle = xlNone

    ' 実用的な表作成マクロ
    Dim headerRange As Range
    Set headerRange = ws.Range("A2:E2")
    headerRange.Borders(xlEdgeBottom).LineStyle = xlDouble  ' 二重線
    headerRange.Borders(xlEdgeBottom).Weight = xlThick
End Sub`,
      },
      {
        title: "色と塗りつぶし",
        content:
          "Interior.Color に RGB 関数で任意の色を設定できます。交互に行を色分け（縞模様）すると表が見やすくなります。Theme Color を使うとブックのテーマに連動した色を設定でき、統一感のあるデザインが実現できます。",
        code: `Sub ColorSettings()
    Dim ws As Worksheet
    Set ws = ActiveSheet
    Dim lastRow As Long
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row

    ' ヘッダー行の背景色
    With ws.Range("A2:E2")
        .Interior.Color = RGB(0, 102, 153)      ' 濃い青緑
        .Font.Color = RGB(255, 255, 255)         ' 白文字
    End With

    ' 交互に行を色分け（縞模様）
    Dim i As Long
    For i = 3 To lastRow
        If i Mod 2 = 1 Then  ' 奇数行
            ws.Range("A" & i & ":E" & i).Interior.Color = RGB(230, 240, 250)
        Else  ' 偶数行
            ws.Range("A" & i & ":E" & i).Interior.Color = RGB(255, 255, 255)
        End If
    Next i

    ' 条件に応じた色分け
    Dim cell As Range
    For Each cell In ws.Range("E3:E" & lastRow)
        If IsNumeric(cell.Value) And cell.Value <> "" Then
            Select Case cell.Value
                Case Is >= 1000000
                    cell.Interior.Color = RGB(198, 239, 206)  ' 緑（達成）
                Case Is >= 500000
                    cell.Interior.Color = RGB(255, 235, 156)  ' 黄（要注意）
                Case Else
                    cell.Interior.Color = RGB(255, 199, 206)  ' 赤（未達）
            End Select
        End If
    Next cell

    ' 合計行のスタイル
    With ws.Range("A" & lastRow + 1 & ":E" & lastRow + 1)
        .Interior.Color = RGB(220, 220, 220)
        .Font.Bold = True
    End With
End Sub`,
      },
      {
        title: "条件付き書式の自動化",
        content:
          "FormatConditions.Add メソッドで VBA から条件付き書式を設定できます。数値の大小、セルの値、数式による条件を指定し、フォント色や背景色を動的に変更できます。アイコンセット、データバー、カラースケールなどの高度な書式も VBA で追加可能です。",
        code: `Sub ConditionalFormatting()
    Dim ws As Worksheet
    Set ws = ActiveSheet
    Dim lastRow As Long
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
    Dim dataRange As Range
    Set dataRange = ws.Range("E3:E" & lastRow)

    ' 既存の条件付き書式をクリア
    dataRange.FormatConditions.Delete

    ' 条件1: 100万以上は緑背景
    With dataRange.FormatConditions.Add(Type:=xlCellValue, _
        Operator:=xlGreaterEqual, Formula1:="1000000")
        .Interior.Color = RGB(198, 239, 206)
        .Font.Color = RGB(0, 97, 0)
    End With

    ' 条件2: 50万未満は赤背景
    With dataRange.FormatConditions.Add(Type:=xlCellValue, _
        Operator:=xlLess, Formula1:="500000")
        .Interior.Color = RGB(255, 199, 206)
        .Font.Color = RGB(156, 0, 6)
    End With

    ' データバーの追加
    Dim dbRange As Range
    Set dbRange = ws.Range("D3:D" & lastRow)
    dbRange.FormatConditions.Delete
    Dim db As Object
    Set db = dbRange.FormatConditions.AddDatabar
    db.BarColor.Color = RGB(99, 142, 198)

    ' カラースケール（3色）
    Dim csRange As Range
    Set csRange = ws.Range("C3:C" & lastRow)
    csRange.FormatConditions.Delete
    Dim cs As Object
    Set cs = csRange.FormatConditions.AddColorScale(ColorScaleType:=3)
    cs.ColorScaleCriteria(1).FormatColor.Color = RGB(248, 105, 107) ' 赤
    cs.ColorScaleCriteria(2).FormatColor.Color = RGB(255, 235, 132) ' 黄
    cs.ColorScaleCriteria(3).FormatColor.Color = RGB(99, 190, 123)  ' 緑

    MsgBox "条件付き書式を設定しました", vbInformation
End Sub`,
      },
    ],
  },
  // ===== VBA 関数・プロシージャ =====
  {
    id: "vba-functions",
    title: "VBA 関数・プロシージャ",
    category: "vba",
    description:
      "Sub, Function, 引数、戻り値、スコープ、ワークシート関数の呼び出し",
    sections: [
      {
        title: "Sub プロシージャ",
        content:
          "Sub プロシージャは戻り値を持たない手続きで、マクロとして実行できます。引数は ByRef（参照渡し、既定）と ByVal（値渡し）で渡せます。Optional キーワードで省略可能な引数を定義でき、IsMissing 関数で省略されたか判定できます。",
        code: `' 基本的な Sub プロシージャ
Sub FormatReport()
    Call SetHeaders
    Call FormatDataArea(ActiveSheet)
    MsgBox "レポートの書式設定が完了しました"
End Sub

' 引数付き Sub（ByVal: 値渡し、ByRef: 参照渡し）
Sub CalculateBonus(ByVal sales As Double, ByRef bonus As Double)
    ' ByVal: sales の値は呼び出し元に影響しない
    ' ByRef: bonus の値は呼び出し元に反映される
    If sales >= 1000000 Then
        bonus = sales * 0.1
    ElseIf sales >= 500000 Then
        bonus = sales * 0.05
    Else
        bonus = 0
    End If
End Sub

' Optional 引数
Sub PrintMessage(ByVal msg As String, _
                 Optional ByVal prefix As String = "INFO", _
                 Optional ByVal showTime As Boolean = True)
    Dim output As String
    If showTime Then
        output = Format(Now, "hh:mm:ss") & " "
    End If
    output = output & "[" & prefix & "] " & msg
    Debug.Print output
End Sub

' 呼び出し例
Sub TestProcedures()
    Dim myBonus As Double
    Call CalculateBonus(800000, myBonus)
    Debug.Print "ボーナス: " & Format(myBonus, "#,##0") & "円"

    Call PrintMessage("処理開始")
    Call PrintMessage("エラー発生", "ERROR")
    Call PrintMessage("完了", showTime:=False)
End Sub`,
      },
      {
        title: "Function プロシージャ",
        content:
          "Function プロシージャは戻り値を返す関数です。関数名に値を代入することで戻り値を設定します。ユーザー定義関数（UDF）として作成すると、ワークシートのセルから =関数名() で呼び出すこともできます。UDF はセルの値を変更する処理は実行できない制約があります。",
        code: `' 基本的な Function
Function CalcTax(ByVal price As Double, _
                 Optional ByVal taxRate As Double = 0.1) As Double
    CalcTax = price * taxRate
End Function

' 文字列処理の Function
Function ExtractDomain(ByVal email As String) As String
    Dim atPos As Long
    atPos = InStr(email, "@")
    If atPos > 0 Then
        ExtractDomain = Mid(email, atPos + 1)
    Else
        ExtractDomain = ""
    End If
End Function

' ユーザー定義関数（UDF）- シートのセルから呼び出し可能
' セルに =JapaneseEra(A1) と入力して使用
Function JapaneseEra(ByVal targetDate As Date) As String
    Dim y As Long: y = Year(targetDate)
    Select Case True
        Case y >= 2019
            JapaneseEra = "令和" & (y - 2018) & "年"
        Case y >= 1989
            JapaneseEra = "平成" & (y - 1988) & "年"
        Case y >= 1926
            JapaneseEra = "昭和" & (y - 1925) & "年"
        Case Else
            JapaneseEra = "対応外"
    End Select
End Function

' Function の呼び出し例
Sub TestFunctions()
    Dim tax As Double
    tax = CalcTax(10000)
    Debug.Print "税額: " & tax  ' 1000

    Debug.Print ExtractDomain("user@example.com")  ' example.com
    Debug.Print JapaneseEra(Date)
End Sub`,
      },
      {
        title: "スコープと寿命",
        content:
          "変数やプロシージャのスコープ（有効範囲）は宣言場所とキーワードで決まります。Dim で宣言したローカル変数はプロシージャ内のみ有効です。モジュールの先頭で Private として宣言するとモジュール内で共有され、Public にすると全モジュールからアクセスできます。Static 変数はプロシージャ終了後も値を保持します。",
        code: `' モジュールレベル変数
Private mRecordCount As Long     ' このモジュール内でのみ有効
Public gUserName As String       ' すべてのモジュールから参照可能

' Private プロシージャ（このモジュール内でのみ呼び出し可能）
Private Sub InternalProcess()
    mRecordCount = mRecordCount + 1
    Debug.Print "内部処理 #" & mRecordCount
End Sub

' Public プロシージャ（他のモジュールからも呼び出し可能）
Public Sub MainProcess()
    gUserName = Environ("USERNAME")
    Debug.Print "ユーザー: " & gUserName

    Call InternalProcess
    Call InternalProcess

    Debug.Print "処理回数: " & mRecordCount
End Sub

' Static 変数の例（プロシージャ終了後も値を保持）
Sub CountCalls()
    Static callCount As Long
    callCount = callCount + 1
    Debug.Print "この関数は " & callCount & " 回呼ばれました"
End Sub

' 定数のスコープ
Private Const MODULE_VERSION As String = "1.0"  ' モジュール内
Public Const APP_NAME As String = "売上管理"     ' グローバル

Sub ShowScope()
    ' ローカル変数（このプロシージャ内のみ）
    Dim localVar As String
    localVar = "ローカル"

    Debug.Print APP_NAME & " v" & MODULE_VERSION
    Debug.Print "ユーザー: " & gUserName
    Debug.Print localVar
End Sub`,
      },
      {
        title: "ワークシート関数の呼び出し",
        content:
          "Application.WorksheetFunction を使うと、VBA から VLOOKUP, SUMIF, COUNTIF などのワークシート関数を呼び出せます。VBA にない関数でもシート関数として利用可能です。Evaluate メソッドを使うとシート上の数式文字列を直接評価することもできます。",
        code: `Sub WorksheetFunctionExamples()
    Dim ws As Worksheet
    Set ws = ActiveSheet
    Dim lastRow As Long
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
    Dim dataRange As Range
    Set dataRange = ws.Range("A2:E" & lastRow)

    ' SUMIF: 条件に合うセルの合計
    Dim totalTokyo As Double
    totalTokyo = Application.WorksheetFunction.SumIf( _
        ws.Range("B2:B" & lastRow), "東京", _
        ws.Range("E2:E" & lastRow))
    Debug.Print "東京の売上合計: " & Format(totalTokyo, "#,##0")

    ' COUNTIF: 条件に合うセルの個数
    Dim countTokyo As Long
    countTokyo = Application.WorksheetFunction.CountIf( _
        ws.Range("B2:B" & lastRow), "東京")
    Debug.Print "東京のデータ件数: " & countTokyo

    ' VLOOKUP（エラー対策付き）
    On Error Resume Next
    Dim result As Variant
    result = Application.WorksheetFunction.VLookup( _
        "商品A", ws.Range("A2:E" & lastRow), 5, False)
    If Err.Number <> 0 Then
        Debug.Print "商品Aは見つかりませんでした"
        Err.Clear
    Else
        Debug.Print "商品Aの売上: " & result
    End If
    On Error GoTo 0

    ' Evaluate メソッド（数式を直接評価）
    Dim avgSales As Double
    avgSales = ws.Evaluate("AVERAGE(E2:E" & lastRow & ")")
    Debug.Print "平均売上: " & Format(avgSales, "#,##0")

    ' MATCH + INDEX の組み合わせ
    Dim matchRow As Long
    matchRow = Application.WorksheetFunction.Match( _
        "商品B", ws.Range("A2:A" & lastRow), 0)
    Debug.Print "商品Bの行位置: " & matchRow
End Sub`,
      },
      {
        title: "コールバックとイベント",
        content:
          "ワークシートやブックのイベントプロシージャを使うと、セルの変更やブックの開閉時に自動的にマクロを実行できます。Worksheet_Change はセルの値変更時、Workbook_Open はブックを開いた時に発動します。Application.OnTime でマクロの定期実行スケジュールも設定できます。",
        code: `' === ThisWorkbook モジュールに記述 ===
' ブックを開いた時に実行
Private Sub Workbook_Open()
    MsgBox "売上管理システムへようこそ", vbInformation
    ' 最終更新日時を記録
    ThisWorkbook.Sheets("設定").Range("A1").Value = Now
End Sub

' ブックを閉じる前に実行
Private Sub Workbook_BeforeClose(Cancel As Boolean)
    Dim answer As VbMsgBoxResult
    answer = MsgBox("保存して閉じますか？", vbYesNoCancel)
    Select Case answer
        Case vbYes: ThisWorkbook.Save
        Case vbCancel: Cancel = True  ' 閉じるのをキャンセル
    End Select
End Sub

' === Sheet1 モジュールに記述 ===
' セルが変更された時に実行
Private Sub Worksheet_Change(ByVal Target As Range)
    ' B列（価格）またはC列（数量）が変更された場合
    If Not Intersect(Target, Me.Range("B:C")) Is Nothing Then
        Application.EnableEvents = False  ' 再帰防止
        Dim cell As Range
        For Each cell In Target
            If cell.Row >= 2 Then
                ' D列に小計を自動計算
                Me.Cells(cell.Row, 4).Value = _
                    Me.Cells(cell.Row, 2).Value * Me.Cells(cell.Row, 3).Value
            End If
        Next cell
        Application.EnableEvents = True
    End If
End Sub

' === 標準モジュールに記述 ===
' 定期実行の設定
Sub StartTimer()
    Application.OnTime Now + TimeValue("00:05:00"), "AutoSaveProc"
End Sub

Sub AutoSaveProc()
    ThisWorkbook.Save
    Debug.Print "自動保存: " & Format(Now, "hh:mm:ss")
    Call StartTimer  ' 次の実行をスケジュール
End Sub`,
      },
    ],
  },
  // ===== VBA ユーザーフォーム =====
  {
    id: "vba-userform",
    title: "VBA ユーザーフォーム",
    category: "vba",
    description:
      "入力フォームの作成、コントロール配置、データの入出力",
    sections: [
      {
        title: "ユーザーフォームの基本",
        content:
          "UserForm は VBE の「挿入」→「ユーザーフォーム」で作成します。Show メソッドでフォームを表示し、Hide で非表示、Unload でメモリから解放します。vbModal（既定）ではフォームを閉じるまで他の操作ができず、vbModeless では Excel の操作を続けながらフォームを使用できます。",
        code: `' === 標準モジュール ===
' フォームの表示（モーダル: 閉じるまで操作不可）
Sub ShowInputForm()
    Dim frm As New UserForm1
    frm.Show vbModal
    ' フォームが閉じられた後の処理
    If frm.Tag = "OK" Then
        MsgBox "データが入力されました"
    End If
    Unload frm
    Set frm = Nothing
End Sub

' フォームの表示（モードレス: 操作しながら使用可能）
Sub ShowToolForm()
    UserForm2.Show vbModeless
End Sub

' === UserForm1 のコード ===
' フォーム初期化
Private Sub UserForm_Initialize()
    Me.Caption = "データ入力フォーム"
    Me.Width = 350
    Me.Height = 250
    Me.StartUpPosition = 0  ' 手動位置
    Me.Left = Application.Left + 100
    Me.Top = Application.Top + 100
End Sub

' OKボタンクリック
Private Sub btnOK_Click()
    Me.Tag = "OK"
    Me.Hide
End Sub

' キャンセルボタンクリック
Private Sub btnCancel_Click()
    Me.Tag = "Cancel"
    Me.Hide
End Sub

' ×ボタンで閉じた場合
Private Sub UserForm_QueryClose(Cancel As Integer, CloseMode As Integer)
    If CloseMode = vbFormControlMenu Then
        Me.Tag = "Cancel"
        Me.Hide
        Cancel = True  ' Unload を防止
    End If
End Sub`,
      },
      {
        title: "基本コントロール",
        content:
          "ユーザーフォームには TextBox（テキスト入力）、Label（ラベル）、CommandButton（ボタン）、ComboBox（ドロップダウン）、ListBox（リスト）、CheckBox（チェック）、OptionButton（ラジオ）などのコントロールを配置できます。各コントロールはプロパティウィンドウまたは VBA コードで設定します。",
        code: `' フォーム初期化でコントロールを設定
Private Sub UserForm_Initialize()
    ' ラベルの設定
    lblTitle.Caption = "社員情報入力"
    lblTitle.Font.Size = 12
    lblTitle.Font.Bold = True

    ' テキストボックスの設定
    txtName.Text = ""
    txtName.MaxLength = 20  ' 最大文字数

    ' コンボボックスの設定（部門選択）
    With cmbDepartment
        .AddItem "営業部"
        .AddItem "開発部"
        .AddItem "総務部"
        .AddItem "経理部"
        .AddItem "人事部"
        .ListIndex = 0  ' 最初の項目を選択
    End With

    ' チェックボックスの設定
    chkManager.Caption = "管理職"
    chkManager.Value = False

    ' オプションボタンの設定（性別）
    optMale.Caption = "男性"
    optFemale.Caption = "女性"
    optMale.Value = True  ' 既定で男性を選択

    ' リストボックスの設定（スキル選択）
    With lstSkills
        .MultiSelect = fmMultiSelectMulti  ' 複数選択可能
        .AddItem "Excel"
        .AddItem "Word"
        .AddItem "PowerPoint"
        .AddItem "Access"
        .AddItem "VBA"
    End With

    ' ボタンの設定
    btnRegister.Caption = "登録"
    btnClear.Caption = "クリア"
    btnClose.Caption = "閉じる"
End Sub`,
      },
      {
        title: "データ入力フォーム",
        content:
          "フォームからセルへデータを書き込む処理では、入力値のバリデーション（空欄チェック、数値チェック、範囲チェック）を必ず行います。最終行を取得して次の行に追記するパターンが一般的です。入力完了後はフォームをクリアして連続入力に対応させます。",
        code: `' 登録ボタンのクリックイベント
Private Sub btnRegister_Click()
    ' 入力チェック（バリデーション）
    If Trim(txtName.Text) = "" Then
        MsgBox "名前を入力してください", vbExclamation
        txtName.SetFocus
        Exit Sub
    End If

    If Not IsNumeric(txtAge.Text) Then
        MsgBox "年齢は数値で入力してください", vbExclamation
        txtAge.SetFocus
        Exit Sub
    End If

    If CLng(txtAge.Text) < 18 Or CLng(txtAge.Text) > 70 Then
        MsgBox "年齢は18～70の範囲で入力してください", vbExclamation
        txtAge.SetFocus
        Exit Sub
    End If

    ' シートにデータを書き込み
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("社員名簿")
    Dim nextRow As Long
    nextRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row + 1

    ws.Cells(nextRow, 1).Value = nextRow - 1           ' 連番
    ws.Cells(nextRow, 2).Value = txtName.Text           ' 名前
    ws.Cells(nextRow, 3).Value = CLng(txtAge.Text)      ' 年齢
    ws.Cells(nextRow, 4).Value = cmbDepartment.Value    ' 部門
    ws.Cells(nextRow, 5).Value = IIf(optMale.Value, "男", "女")
    ws.Cells(nextRow, 6).Value = chkManager.Value       ' 管理職フラグ
    ws.Cells(nextRow, 7).Value = Now                    ' 登録日時

    ' フォームをクリアして連続入力可能に
    Call ClearForm
    MsgBox "登録しました（No." & (nextRow - 1) & "）", vbInformation
    txtName.SetFocus
End Sub

' フォームクリア
Private Sub ClearForm()
    txtName.Text = ""
    txtAge.Text = ""
    cmbDepartment.ListIndex = 0
    optMale.Value = True
    chkManager.Value = False
End Sub

Private Sub btnClear_Click()
    Call ClearForm
End Sub`,
      },
      {
        title: "コンボボックスとリスト",
        content:
          "ComboBox の RowSource プロパティでシート上のデータ範囲と連携できます。AddItem で動的にアイテムを追加し、RemoveItem で削除できます。ListBox では MultiSelect プロパティで複数選択を有効にし、Selected プロパティで各項目の選択状態を確認します。",
        code: `' フォーム初期化: コンボボックスにデータ連携
Private Sub UserForm_Initialize()
    ' シートのデータをコンボボックスに設定
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("マスタ")
    Dim lastRow As Long
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row

    ' RowSource でシートと連携
    cmbCustomer.RowSource = "マスタ!A2:A" & lastRow

    ' 2列表示（コード + 名前）
    With cmbProduct
        .ColumnCount = 2
        .ColumnWidths = "40;120"
        .BoundColumn = 1  ' 値として返す列
        Dim i As Long
        For i = 2 To lastRow
            .AddItem ws.Cells(i, 3).Value          ' 商品コード
            .List(.ListCount - 1, 1) = ws.Cells(i, 4).Value  ' 商品名
        Next i
    End With

    ' リストボックス（複数選択）
    With lstCategories
        .MultiSelect = fmMultiSelectMulti
        .AddItem "食品"
        .AddItem "飲料"
        .AddItem "日用品"
        .AddItem "文具"
        .AddItem "電化製品"
    End With
End Sub

' 選択された項目を取得
Private Sub btnApply_Click()
    ' コンボボックスの選択値
    Debug.Print "顧客: " & cmbCustomer.Value
    Debug.Print "商品コード: " & cmbProduct.Value
    Debug.Print "商品名: " & cmbProduct.Column(1)  ' 2列目

    ' リストボックスの複数選択を取得
    Dim selected As String
    Dim i As Long
    For i = 0 To lstCategories.ListCount - 1
        If lstCategories.Selected(i) Then
            If selected <> "" Then selected = selected & ", "
            selected = selected & lstCategories.List(i)
        End If
    Next i
    Debug.Print "カテゴリ: " & selected
End Sub`,
      },
      {
        title: "フォームのイベント",
        content:
          "各コントロールには Click, Change, Enter, Exit などのイベントがあり、ユーザーの操作に応じた処理を記述できます。コントロール間を連動させることで、動的なフォームを実現できます。例えば部門の選択に応じて担当者リストを絞り込むカスケード選択が可能です。",
        code: `' テキストボックスの変更イベント（リアルタイム計算）
Private Sub txtQuantity_Change()
    Call CalcSubtotal
End Sub

Private Sub txtPrice_Change()
    Call CalcSubtotal
End Sub

' 小計の自動計算
Private Sub CalcSubtotal()
    If IsNumeric(txtPrice.Text) And IsNumeric(txtQuantity.Text) Then
        Dim subtotal As Double
        subtotal = CDbl(txtPrice.Text) * CDbl(txtQuantity.Text)
        lblSubtotal.Caption = Format(subtotal, "#,##0") & " 円"
    Else
        lblSubtotal.Caption = "---"
    End If
End Sub

' コンボボックス変更でリストを連動（カスケード選択）
Private Sub cmbDepartment_Change()
    cmbEmployee.Clear

    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("社員マスタ")
    Dim lastRow As Long
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row

    Dim i As Long
    For i = 2 To lastRow
        If ws.Cells(i, 2).Value = cmbDepartment.Value Then
            cmbEmployee.AddItem ws.Cells(i, 1).Value
        End If
    Next i

    If cmbEmployee.ListCount > 0 Then
        cmbEmployee.ListIndex = 0
    End If
End Sub

' テキストボックスの Exit イベント（フォーカスが外れた時）
Private Sub txtEmail_Exit(ByVal Cancel As MSForms.ReturnBoolean)
    ' メールアドレスの簡易チェック
    If txtEmail.Text <> "" Then
        If InStr(txtEmail.Text, "@") = 0 Then
            MsgBox "正しいメールアドレスを入力してください", vbExclamation
            Cancel = True  ' フォーカスを移動させない
        End If
    End If
End Sub`,
      },
    ],
  },
  // ===== 実務で使えるマクロ集 =====
  {
    id: "vba-practical-macros",
    title: "実務で使えるマクロ集",
    category: "vba",
    description:
      "データ整形、レポート自動作成、メール送信、PDF出力の自動化",
    sections: [
      {
        title: "データクリーニング",
        content:
          "実務では外部から取り込んだデータの整形が頻繁に発生します。空白行の削除、前後の空白除去（Trim）、重複データの削除、全角/半角の統一などを自動化することで、手作業による時間のロスとミスを大幅に削減できます。",
        code: `Sub DataCleaning()
    Dim ws As Worksheet
    Set ws = ActiveSheet
    Dim lastRow As Long
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
    Dim lastCol As Long
    lastCol = ws.Cells(1, ws.Columns.Count).End(xlToLeft).Column

    Application.ScreenUpdating = False

    ' 1. 前後の空白を除去（Trim）
    Dim cell As Range
    For Each cell In ws.Range(ws.Cells(1, 1), ws.Cells(lastRow, lastCol))
        If Not IsEmpty(cell) And Not IsError(cell) Then
            If VarType(cell.Value) = vbString Then
                cell.Value = Trim(cell.Value)
            End If
        End If
    Next cell

    ' 2. 全角スペースを半角に変換
    Dim r As Long, c As Long
    For r = 1 To lastRow
        For c = 1 To lastCol
            If VarType(ws.Cells(r, c).Value) = vbString Then
                ws.Cells(r, c).Value = Replace(ws.Cells(r, c).Value, _
                    ChrW(&H3000), " ")
            End If
        Next c
    Next r

    ' 3. 空白行の削除（下から上に処理）
    Dim delCount As Long: delCount = 0
    For r = lastRow To 2 Step -1
        If Application.WorksheetFunction.CountA(ws.Rows(r)) = 0 Then
            ws.Rows(r).Delete
            delCount = delCount + 1
        End If
    Next r

    ' 4. 重複行の削除（A列基準）
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
    ws.Range("A1:A" & lastRow).RemoveDuplicates Columns:=1, Header:=xlYes

    Application.ScreenUpdating = True
    MsgBox "クリーニング完了" & vbCrLf & _
           "削除した空白行: " & delCount & "行", vbInformation
End Sub`,
      },
      {
        title: "レポート自動作成",
        content:
          "テンプレートシートをコピーしてレポートを自動生成するマクロは、月次・週次の定型レポート作成を効率化します。複数シートのデータを1つのシートに統合する処理も、手作業では時間がかかりますが VBA で自動化できます。",
        code: `Sub CreateMonthlyReport()
    Dim wb As Workbook: Set wb = ThisWorkbook
    Dim dataWS As Worksheet: Set dataWS = wb.Sheets("売上データ")
    Dim lastRow As Long
    lastRow = dataWS.Cells(dataWS.Rows.Count, 1).End(xlUp).Row

    ' テンプレートシートをコピー
    Dim reportName As String
    reportName = Format(Date, "yyyy年mm月") & "_月次レポート"

    ' 既存シートがあれば削除
    Application.DisplayAlerts = False
    Dim ws As Worksheet
    For Each ws In wb.Worksheets
        If ws.Name = reportName Then ws.Delete
    Next ws
    Application.DisplayAlerts = True

    wb.Sheets("テンプレート").Copy After:=wb.Sheets(wb.Sheets.Count)
    Dim reportWS As Worksheet
    Set reportWS = ActiveSheet
    reportWS.Name = reportName

    ' ヘッダー情報の設定
    reportWS.Range("B2").Value = Format(Date, "yyyy年mm月度")
    reportWS.Range("B3").Value = "作成日: " & Format(Now, "yyyy/mm/dd hh:mm")

    ' 部門別集計
    Dim depts As Variant
    depts = Array("営業部", "開発部", "総務部", "経理部")
    Dim i As Long
    For i = 0 To UBound(depts)
        Dim total As Double
        total = Application.WorksheetFunction.SumIf( _
            dataWS.Range("C2:C" & lastRow), depts(i), _
            dataWS.Range("E2:E" & lastRow))
        reportWS.Cells(6 + i, 2).Value = depts(i)
        reportWS.Cells(6 + i, 3).Value = total
    Next i

    ' 合計行
    reportWS.Cells(6 + UBound(depts) + 1, 2).Value = "合計"
    reportWS.Cells(6 + UBound(depts) + 1, 3).Formula = _
        "=SUM(C6:C" & (6 + UBound(depts)) & ")"

    MsgBox reportName & " を作成しました", vbInformation
End Sub`,
      },
      {
        title: "請求書・見積書の自動作成",
        content:
          "データ一覧から請求書や見積書を自動生成するマクロは、経理・営業部門で非常に重宝されます。テンプレートに値を流し込み、連番を管理し、PDF で出力するまでの一連の流れを自動化できます。",
        code: `Sub CreateInvoices()
    Dim dataWS As Worksheet: Set dataWS = ThisWorkbook.Sheets("請求データ")
    Dim tmplWS As Worksheet: Set tmplWS = ThisWorkbook.Sheets("請求書テンプレート")
    Dim lastRow As Long
    lastRow = dataWS.Cells(dataWS.Rows.Count, 1).End(xlUp).Row

    Dim outputPath As String
    outputPath = ThisWorkbook.Path & "\請求書出力\"

    ' 出力フォルダの作成
    If Dir(outputPath, vbDirectory) = "" Then MkDir outputPath

    Application.ScreenUpdating = False
    Dim i As Long
    For i = 2 To lastRow
        ' テンプレートにデータを流し込み
        tmplWS.Range("D3").Value = dataWS.Cells(i, 1).Value  ' 請求番号
        tmplWS.Range("B5").Value = dataWS.Cells(i, 2).Value & " 御中"  ' 顧客名
        tmplWS.Range("D5").Value = Date  ' 請求日
        tmplWS.Range("B10").Value = dataWS.Cells(i, 3).Value  ' 品目
        tmplWS.Range("D10").Value = dataWS.Cells(i, 4).Value  ' 数量
        tmplWS.Range("E10").Value = dataWS.Cells(i, 5).Value  ' 単価

        ' 小計・税・合計の計算
        Dim subtotal As Double
        subtotal = dataWS.Cells(i, 4).Value * dataWS.Cells(i, 5).Value
        tmplWS.Range("F10").Value = subtotal
        tmplWS.Range("F20").Value = subtotal
        tmplWS.Range("F21").Value = subtotal * 0.1
        tmplWS.Range("F22").Value = subtotal * 1.1

        ' PDF出力
        Dim pdfName As String
        pdfName = outputPath & "請求書_" & dataWS.Cells(i, 1).Value & ".pdf"
        tmplWS.ExportAsFixedFormat Type:=xlTypePDF, _
            Filename:=pdfName, Quality:=xlQualityStandard
    Next i

    Application.ScreenUpdating = True
    MsgBox (lastRow - 1) & "件の請求書をPDF出力しました" & vbCrLf & _
           "出力先: " & outputPath, vbInformation
End Sub`,
      },
      {
        title: "メール送信の自動化",
        content:
          "Outlook と連携してメールを自動送信するマクロは、請求書の送付や定期レポートの配信に活用できます。宛先、件名、本文をシートのデータから読み取り、添付ファイル付きのメールを一括作成できます。送信前に確認のため Display で表示することも可能です。",
        code: `Sub SendEmailsViaOutlook()
    ' Outlook アプリケーションの起動
    Dim olApp As Object
    Set olApp = CreateObject("Outlook.Application")

    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets("送信リスト")
    Dim lastRow As Long
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row

    Dim sendCount As Long: sendCount = 0
    Dim i As Long
    For i = 2 To lastRow
        ' 送信済みフラグをチェック
        If ws.Cells(i, 6).Value <> "送信済" Then
            Dim mail As Object
            Set mail = olApp.CreateItem(0)  ' olMailItem

            With mail
                .To = ws.Cells(i, 2).Value        ' 宛先
                .CC = ws.Cells(i, 3).Value         ' CC
                .Subject = ws.Cells(i, 4).Value    ' 件名

                ' 本文の作成（テンプレート）
                .Body = ws.Cells(i, 1).Value & " 様" & vbCrLf & vbCrLf & _
                        "いつもお世話になっております。" & vbCrLf & _
                        ws.Cells(i, 5).Value & vbCrLf & vbCrLf & _
                        "何卒よろしくお願いいたします。" & vbCrLf & _
                        "---" & vbCrLf & _
                        "株式会社サンプル 営業部"

                ' 添付ファイル（パスが指定されている場合）
                If ws.Cells(i, 7).Value <> "" Then
                    .Attachments.Add ws.Cells(i, 7).Value
                End If

                .Display  ' 確認用に表示（自動送信は .Send）
            End With

            ws.Cells(i, 6).Value = "送信済"
            ws.Cells(i, 8).Value = Now  ' 送信日時
            sendCount = sendCount + 1
        End If
    Next i

    MsgBox sendCount & "件のメールを作成しました", vbInformation
End Sub`,
      },
      {
        title: "PDF出力と印刷",
        content:
          "ExportAsFixedFormat メソッドで Excel シートを PDF として出力できます。PrintOut メソッドで直接印刷も可能です。印刷範囲、余白、ヘッダー/フッター、改ページなどの設定を VBA で制御することで、常に統一されたフォーマットで出力できます。",
        code: `Sub PDFExportAndPrint()
    Dim ws As Worksheet
    Set ws = ActiveSheet

    ' ページ設定
    With ws.PageSetup
        .PrintArea = "A1:F" & ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
        .Orientation = xlLandscape         ' 横向き
        .PaperSize = xlPaperA4             ' A4用紙
        .Zoom = False
        .FitToPagesWide = 1                ' 横1ページに収める
        .FitToPagesTall = False            ' 縦は自動
        .TopMargin = Application.CentimetersToPoints(2)
        .BottomMargin = Application.CentimetersToPoints(2)
        .LeftMargin = Application.CentimetersToPoints(1.5)
        .RightMargin = Application.CentimetersToPoints(1.5)
        .CenterHeader = "&B" & ws.Name     ' ヘッダー中央（太字）
        .RightFooter = "&P / &N ページ"    ' フッター右（ページ番号）
        .PrintTitleRows = "$1:$2"           ' 行タイトル（各ページに印刷）
    End With

    ' PDF出力
    Dim pdfPath As String
    pdfPath = ThisWorkbook.Path & "\" & ws.Name & "_" & _
              Format(Date, "yyyymmdd") & ".pdf"

    ws.ExportAsFixedFormat _
        Type:=xlTypePDF, _
        Filename:=pdfPath, _
        Quality:=xlQualityStandard, _
        IncludeDocProperties:=True, _
        IgnorePrintAreas:=False, _
        OpenAfterPublish:=True  ' 出力後にPDFを開く

    ' 複数シートを1つのPDFに出力
    Dim sheets As Variant
    sheets = Array("Sheet1", "Sheet2", "Sheet3")
    ThisWorkbook.Sheets(sheets).Select
    ActiveSheet.ExportAsFixedFormat Type:=xlTypePDF, _
        Filename:=ThisWorkbook.Path & "\統合レポート.pdf"
    ws.Select  ' 選択を戻す

    MsgBox "PDF出力完了: " & pdfPath, vbInformation
End Sub`,
      },
    ],
  },
  // ===== VBA 上級テクニック =====
  {
    id: "vba-advanced",
    title: "VBA 上級テクニック",
    category: "vba",
    description:
      "クラスモジュール、辞書、正規表現、外部データ連携、高速化",
    sections: [
      {
        title: "クラスモジュール",
        content:
          "クラスモジュールを使うとオブジェクト指向的な設計が可能です。Property Get/Let/Set でプロパティを定義し、データと処理をカプセル化できます。Collection と組み合わせてオブジェクトのリストを管理するパターンは、複雑な業務ロジックの整理に役立ちます。",
        code: `' === クラスモジュール: CEmployee ===
Private mName As String
Private mDepartment As String
Private mSalary As Currency

' プロパティ: 名前
Public Property Get Name() As String
    Name = mName
End Property
Public Property Let Name(ByVal value As String)
    mName = value
End Property

' プロパティ: 部門
Public Property Get Department() As String
    Department = mDepartment
End Property
Public Property Let Department(ByVal value As String)
    mDepartment = value
End Property

' プロパティ: 給与
Public Property Get Salary() As Currency
    Salary = mSalary
End Property
Public Property Let Salary(ByVal value As Currency)
    If value < 0 Then Err.Raise 5, , "給与は0以上を指定してください"
    mSalary = value
End Property

' メソッド: ボーナス計算
Public Function CalcBonus() As Currency
    CalcBonus = mSalary * 2.5  ' 給与の2.5ヶ月分
End Function

' === 標準モジュール ===
Sub UseClass()
    Dim employees As New Collection
    Dim ws As Worksheet: Set ws = ActiveSheet
    Dim lastRow As Long
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row

    ' シートからオブジェクトを生成
    Dim i As Long
    For i = 2 To lastRow
        Dim emp As New CEmployee
        emp.Name = ws.Cells(i, 1).Value
        emp.Department = ws.Cells(i, 2).Value
        emp.Salary = ws.Cells(i, 3).Value
        employees.Add emp, emp.Name  ' 名前をキーに
    Next i

    ' コレクションを使った処理
    Dim e As CEmployee
    For Each e In employees
        Debug.Print e.Name & " (" & e.Department & "): " & _
                    "ボーナス " & Format(e.CalcBonus(), "#,##0") & "円"
    Next e
End Sub`,
      },
      {
        title: "Dictionary オブジェクト",
        content:
          "Scripting.Dictionary はキーと値のペアでデータを管理するオブジェクトです。キーの重複チェック、データのグルーピング、高速な検索に優れています。Exists メソッドでキーの存在確認、Keys/Items メソッドで全キー・全値の配列を取得できます。",
        code: `Sub DictionaryExamples()
    ' Dictionary の作成
    Dim dict As Object
    Set dict = CreateObject("Scripting.Dictionary")

    Dim ws As Worksheet: Set ws = ActiveSheet
    Dim lastRow As Long
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row

    ' 部門別の売上合計を集計
    Dim i As Long
    For i = 2 To lastRow
        Dim dept As String
        dept = ws.Cells(i, 2).Value  ' B列: 部門名
        Dim sales As Double
        sales = ws.Cells(i, 4).Value ' D列: 売上

        If dict.Exists(dept) Then
            dict(dept) = dict(dept) + sales  ' 既存キーに加算
        Else
            dict.Add dept, sales             ' 新規キーを追加
        End If
    Next i

    ' 結果を出力
    Dim resultWS As Worksheet
    Set resultWS = ThisWorkbook.Sheets.Add
    resultWS.Name = "部門別集計"
    resultWS.Range("A1").Value = "部門"
    resultWS.Range("B1").Value = "売上合計"

    Dim keys As Variant: keys = dict.keys
    Dim items As Variant: items = dict.items
    For i = 0 To dict.Count - 1
        resultWS.Cells(i + 2, 1).Value = keys(i)
        resultWS.Cells(i + 2, 2).Value = items(i)
    Next i

    ' 重複チェックへの活用
    Dim dupeDict As Object
    Set dupeDict = CreateObject("Scripting.Dictionary")
    For i = 2 To lastRow
        Dim key As String
        key = ws.Cells(i, 1).Value
        If dupeDict.Exists(key) Then
            ws.Cells(i, 5).Value = "重複"
            ws.Cells(i, 5).Font.Color = RGB(255, 0, 0)
        Else
            dupeDict.Add key, i
        End If
    Next i

    Debug.Print "部門数: " & dict.Count
    Debug.Print "ユニーク件数: " & dupeDict.Count
End Sub`,
      },
      {
        title: "正規表現",
        content:
          "VBScript.RegExp オブジェクトを使うと、VBA で正規表現によるパターンマッチ、文字列の抽出・置換ができます。電話番号、メールアドレス、郵便番号などの書式チェックや、複雑なパターンの文字列抽出に威力を発揮します。Global プロパティを True にすると全一致を検索します。",
        code: `Sub RegExpExamples()
    ' 正規表現オブジェクトの作成
    Dim re As Object
    Set re = CreateObject("VBScript.RegExp")

    ' 電話番号の抽出
    re.Pattern = "\d{2,4}-\d{2,4}-\d{4}"
    re.Global = True

    Dim testStr As String
    testStr = "連絡先: 03-1234-5678 または 090-9876-5432"
    Dim matches As Object
    Set matches = re.Execute(testStr)
    Dim m As Object
    For Each m In matches
        Debug.Print "電話番号: " & m.Value
    Next m

    ' メールアドレスのバリデーション
    re.Pattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
    re.Global = False
    Debug.Print "test@example.com: " & re.Test("test@example.com")  ' True
    Debug.Print "invalid-email: " & re.Test("invalid-email")        ' False

    ' シート上のデータを正規表現で処理
    Dim ws As Worksheet: Set ws = ActiveSheet
    Dim lastRow As Long
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row

    ' 郵便番号の形式チェック（A列）
    re.Pattern = "^\d{3}-?\d{4}$"
    Dim i As Long
    For i = 2 To lastRow
        Dim cellVal As String
        cellVal = CStr(ws.Cells(i, 1).Value)
        If re.Test(cellVal) Then
            ws.Cells(i, 2).Value = "OK"
        Else
            ws.Cells(i, 2).Value = "形式エラー"
            ws.Cells(i, 2).Font.Color = RGB(255, 0, 0)
        End If
    Next i

    ' 文字列の置換（カッコ内を削除）
    re.Pattern = "\(.*?\)"
    re.Global = True
    Dim cleaned As String
    cleaned = re.Replace("東京都渋谷区(本社)神南1-2-3(5F)", "")
    Debug.Print cleaned  ' 東京都渋谷区神南1-2-3
End Sub`,
      },
      {
        title: "外部データ連携",
        content:
          "ADO（ActiveX Data Objects）を使うと VBA から Access や SQL Server などのデータベースに接続し、SQL を実行できます。接続文字列でデータソースを指定し、Recordset でクエリ結果を取得してシートに展開します。大量データの読み書きに適した方法です。",
        code: `Sub DatabaseConnection()
    ' ADO オブジェクトの作成
    Dim conn As Object
    Set conn = CreateObject("ADODB.Connection")
    Dim rs As Object
    Set rs = CreateObject("ADODB.Recordset")

    On Error GoTo ErrorHandler

    ' Access データベースに接続
    Dim connStr As String
    connStr = "Provider=Microsoft.ACE.OLEDB.12.0;" & _
              "Data Source=C:\Data\業務DB.accdb;"
    conn.Open connStr

    ' SQL を実行してデータを取得
    Dim sql As String
    sql = "SELECT 顧客名, 部門, 売上金額, 受注日 " & _
          "FROM T_売上 " & _
          "WHERE 受注日 >= #2024-01-01# " & _
          "ORDER BY 売上金額 DESC"
    rs.Open sql, conn, 1, 1  ' adOpenKeyset, adLockReadOnly

    ' シートにデータを展開
    Dim ws As Worksheet
    Set ws = ThisWorkbook.Sheets.Add
    ws.Name = "DB取得データ"

    ' ヘッダーの出力
    Dim col As Long
    For col = 0 To rs.Fields.Count - 1
        ws.Cells(1, col + 1).Value = rs.Fields(col).Name
    Next col
    ws.Range("A1").Resize(1, rs.Fields.Count).Font.Bold = True

    ' データの出力（CopyFromRecordset で高速展開）
    ws.Range("A2").CopyFromRecordset rs

    Dim rowCount As Long
    rowCount = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row - 1
    ws.Columns.AutoFit

    MsgBox rowCount & "件のデータを取得しました", vbInformation

CleanUp:
    If Not rs Is Nothing Then
        If rs.State = 1 Then rs.Close
    End If
    If Not conn Is Nothing Then
        If conn.State = 1 Then conn.Close
    End If
    Set rs = Nothing
    Set conn = Nothing
    Exit Sub

ErrorHandler:
    MsgBox "DB接続エラー: " & Err.Description, vbCritical
    Resume CleanUp
End Sub`,
      },
      {
        title: "高速化テクニック",
        content:
          "大量データを処理するマクロでは、ScreenUpdating や Calculation の制御、配列を使った一括読み書きが高速化の鍵です。セルへの1つずつのアクセスは非常に遅いため、データを配列に読み込んで処理し、結果を一括で書き戻す方法が推奨されます。処理時間が数十分から数秒に短縮されることもあります。",
        code: `Sub PerformanceOptimization()
    Dim startTime As Double
    startTime = Timer

    ' === 高速化設定 ===
    Application.ScreenUpdating = False     ' 画面更新を停止
    Application.Calculation = xlCalculationManual  ' 自動計算を停止
    Application.EnableEvents = False       ' イベントを停止

    Dim ws As Worksheet: Set ws = ActiveSheet
    Dim lastRow As Long
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
    Dim lastCol As Long
    lastCol = ws.Cells(1, ws.Columns.Count).End(xlToLeft).Column

    ' === 配列を使った高速処理 ===
    ' シートのデータを配列に一括読み込み
    Dim data As Variant
    data = ws.Range(ws.Cells(2, 1), ws.Cells(lastRow, lastCol)).Value

    ' 配列上で処理（セルアクセスなし = 超高速）
    Dim result() As Variant
    ReDim result(1 To UBound(data, 1), 1 To 1)

    Dim i As Long
    For i = 1 To UBound(data, 1)
        ' 例: D列(4) × E列(5) の計算結果をresultに格納
        If IsNumeric(data(i, 4)) And IsNumeric(data(i, 5)) Then
            result(i, 1) = data(i, 4) * data(i, 5)
        Else
            result(i, 1) = 0
        End If
    Next i

    ' 結果を一括書き込み
    ws.Range("F2").Resize(UBound(result, 1), 1).Value = result

    ' === 高速化設定の復帰 ===
    Application.ScreenUpdating = True
    Application.Calculation = xlCalculationAutomatic
    Application.EnableEvents = True

    Dim elapsed As Double
    elapsed = Timer - startTime
    MsgBox "処理完了: " & lastRow - 1 & "行" & vbCrLf & _
           "処理時間: " & Format(elapsed, "0.00") & "秒", vbInformation
End Sub`,
      },
    ],
  },
  // ===== VBA デバッグとエラー対処 =====
  {
    id: "vba-debugging",
    title: "VBA デバッグとエラー対処",
    category: "vba",
    description:
      "デバッグ技法、ブレークポイント、ウォッチ式、よくあるエラーと対処法",
    sections: [
      {
        title: "VBE（Visual Basic Editor）",
        content:
          "VBE は Alt+F11 で起動する VBA の統合開発環境です。プロジェクトエクスプローラーでモジュールを管理し、プロパティウィンドウでオブジェクトの設定を変更します。イミディエイトウィンドウ（Ctrl+G）は Debug.Print の出力先であり、式の即時評価やプロシージャの直接実行にも使えます。",
        code: `' Debug.Print でイミディエイトウィンドウに出力
Sub DebugPrintExamples()
    ' 変数の値を確認
    Dim ws As Worksheet
    Set ws = ActiveSheet
    Dim lastRow As Long
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
    Debug.Print "最終行: " & lastRow

    ' 処理の経過を記録
    Dim i As Long
    For i = 2 To lastRow
        Dim val As Variant
        val = ws.Cells(i, 1).Value

        ' 条件付きで出力（大量出力を避ける）
        If i <= 5 Or i = lastRow Then
            Debug.Print "行" & i & ": " & val & _
                        " (型: " & TypeName(val) & ")"
        End If
    Next i

    ' オブジェクトの情報を出力
    Debug.Print "シート名: " & ws.Name
    Debug.Print "使用範囲: " & ws.UsedRange.Address
    Debug.Print "セル数: " & ws.UsedRange.Cells.Count

    ' 処理時間の計測
    Dim startTime As Double
    startTime = Timer
    ' ... 処理 ...
    Debug.Print "処理時間: " & Format(Timer - startTime, "0.000") & "秒"

    ' タイムスタンプ付きログ
    Debug.Print Format(Now, "hh:mm:ss.000") & " [INFO] 処理完了"
End Sub`,
      },
      {
        title: "デバッグ技法",
        content:
          "ブレークポイント（F9）を設定するとその行で実行が一時停止します。F8 でステップ実行（1行ずつ）、Shift+F8 でステップオーバー（プロシージャを飛ばす）ができます。ウォッチ式を追加すると変数の値をリアルタイムで監視でき、ローカルウィンドウでは現在のプロシージャの全変数を確認できます。",
        code: `' デバッグしやすいコードの書き方
Sub DebuggableMacro()
    ' 処理の各段階にログを入れる
    Debug.Print "===== 処理開始 ====="

    ' Step 1: データの読み込み
    Debug.Print "Step 1: データ読み込み..."
    Dim ws As Worksheet
    Set ws = ActiveSheet
    Dim lastRow As Long
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
    Debug.Print "  対象行数: " & (lastRow - 1)

    ' Step 2: データの検証
    Debug.Print "Step 2: データ検証..."
    Dim errorCount As Long: errorCount = 0
    Dim i As Long
    For i = 2 To lastRow
        ' ここにブレークポイント（F9）を設定して変数を確認
        Dim cellValue As Variant
        cellValue = ws.Cells(i, 1).Value

        If IsEmpty(cellValue) Then
            errorCount = errorCount + 1
            Debug.Print "  警告: 行" & i & " - 空セル検出"
        End If
    Next i
    Debug.Print "  エラー件数: " & errorCount

    ' Step 3: 処理の実行
    Debug.Print "Step 3: メイン処理..."
    ' Stop  ' ← コメントを外すとここで一時停止（デバッグ用）

    ' 中間結果の確認
    Debug.Print "  処理済み行数: " & (lastRow - 1 - errorCount)

    Debug.Print "===== 処理完了 ====="
End Sub`,
      },
      {
        title: "イミディエイトウィンドウ",
        content:
          "イミディエイトウィンドウ（Ctrl+G）は VBA 開発で最も活用されるデバッグツールです。Debug.Print で出力された値の確認はもちろん、? に続けて式を入力すると即座に結果を表示します。変数への値の代入やプロシージャの直接実行も可能で、動作確認やテストに非常に便利です。",
        code: `' イミディエイトウィンドウでの操作例
' （以下は Ctrl+G で開いたウィンドウに直接入力する内容）

' ? で式を即時評価
' ?Range("A1").Value          → セルA1の値を表示
' ?ActiveSheet.Name           → アクティブシート名
' ?ThisWorkbook.Path          → ブックのパス
' ?Now                        → 現在の日時
' ?TypeName(Selection)        → 選択中のオブジェクト型

' 変数の値を確認（ブレークポイントで停止中）
' ?lastRow                    → 変数の値
' ?UBound(myArray)            → 配列の上限

' 式の計算
' ?10 * 1.1                   → 11
' ?Format(12345, "#,##0")     → 12,345

' プロシージャの直接実行
' Call MySub
' MySub                       → Call は省略可能

Sub ImmediateWindowDemo()
    ' このプロシージャをイミディエイトウィンドウからテスト
    Dim ws As Worksheet
    Set ws = ActiveSheet

    ' ブレークポイントをここに設定して以下を確認
    Dim testValue As Variant
    testValue = ws.Range("A1").Value
    Debug.Print "A1の値: " & testValue
    Debug.Print "型: " & TypeName(testValue)

    ' イミディエイトウィンドウで以下を試す:
    ' ?testValue
    ' testValue = "新しい値"   ← 変数の値を変更可能
    ' ?testValue

    ' セルの値も直接変更可能
    ' Range("A1").Value = "テスト"
    ' Range("A1").Font.Bold = True
End Sub`,
      },
      {
        title: "よくあるエラーと対処",
        content:
          "VBA 開発でよく遭遇するエラーには、実行時エラー1004（Range 指定ミス）、エラー13（型不一致）、エラー91（オブジェクト未設定）、エラー9（添字が範囲外）があります。各エラーの典型的な原因を理解し、発生条件を事前にチェックするコードを書くことで、安定したマクロを作成できます。",
        code: `Sub CommonErrors()
    On Error GoTo ErrorHandler

    Dim ws As Worksheet

    ' エラー91: オブジェクト変数が設定されていません
    ' 原因: Set を忘れた、またはシートが存在しない
    Set ws = Nothing
    ' ws.Range("A1").Value = "test"  ' ← ここでエラー91

    ' 対策: Nothing チェック
    If ws Is Nothing Then
        Set ws = ActiveSheet
    End If

    ' エラー1004: アプリケーション定義またはオブジェクト定義のエラー
    ' 原因: 存在しないシート名、不正なRange指定
    ' Set ws = Sheets("存在しないシート")  ' ← エラー1004

    ' 対策: シートの存在確認
    Dim sheetExists As Boolean: sheetExists = False
    Dim s As Worksheet
    For Each s In ThisWorkbook.Worksheets
        If s.Name = "データ" Then sheetExists = True
    Next s

    ' エラー13: 型が一致しません
    ' 原因: 文字列を数値変数に代入
    Dim num As Long
    Dim cellVal As Variant
    cellVal = ws.Range("A1").Value
    ' num = cellVal  ' ← セルが文字列ならエラー13

    ' 対策: 型チェック
    If IsNumeric(cellVal) Then
        num = CLng(cellVal)
    End If

    ' エラー9: インデックスが有効範囲にありません
    ' 原因: 存在しない配列インデックス、シートインデックス
    Dim arr(1 To 5) As Long
    ' arr(6) = 100  ' ← エラー9

    Exit Sub

ErrorHandler:
    Debug.Print "エラー" & Err.Number & ": " & Err.Description
    Debug.Print "発生箇所: " & Erl  ' 行番号（設定時のみ）
    Resume Next  ' デバッグ用: 次の行に進む
End Sub`,
      },
      {
        title: "堅牢なコードの書き方",
        content:
          "本番運用するマクロには、Option Explicit の宣言、統一されたエラーハンドラ、入力値の事前チェック、ログ出力が不可欠です。処理の開始時に ScreenUpdating 等を OFF にした場合、エラー発生時にも必ず復帰するよう CleanUp セクションを設けます。このテンプレートを基にマクロを作成することで、安定した運用が可能です。",
        code: `Option Explicit

' 本番用マクロのテンプレート
Sub ProductionMacroTemplate()
    ' === 初期設定 ===
    Dim startTime As Double: startTime = Timer
    Call LogMessage("処理開始")

    On Error GoTo ErrorHandler
    Application.ScreenUpdating = False
    Application.Calculation = xlCalculationManual
    Application.EnableEvents = False

    ' === 事前チェック ===
    Dim ws As Worksheet
    On Error Resume Next
    Set ws = ThisWorkbook.Sheets("データ")
    On Error GoTo ErrorHandler

    If ws Is Nothing Then
        MsgBox "「データ」シートが見つかりません", vbCritical
        GoTo CleanUp
    End If

    Dim lastRow As Long
    lastRow = ws.Cells(ws.Rows.Count, 1).End(xlUp).Row
    If lastRow < 2 Then
        MsgBox "処理対象のデータがありません", vbExclamation
        GoTo CleanUp
    End If

    ' === メイン処理 ===
    Call LogMessage("対象: " & (lastRow - 1) & "行")
    Dim processedCount As Long: processedCount = 0
    Dim errorRows As String: errorRows = ""

    Dim i As Long
    For i = 2 To lastRow
        ' 個別行のエラーは記録して続行
        On Error Resume Next
        ' ... 処理 ...
        processedCount = processedCount + 1
        If Err.Number <> 0 Then
            errorRows = errorRows & i & ", "
            Err.Clear
        End If
        On Error GoTo ErrorHandler
    Next i

    Call LogMessage("処理完了: " & processedCount & "件")
    If errorRows <> "" Then
        Call LogMessage("エラー行: " & errorRows)
    End If

CleanUp:
    Application.ScreenUpdating = True
    Application.Calculation = xlCalculationAutomatic
    Application.EnableEvents = True
    Call LogMessage("終了（" & Format(Timer - startTime, "0.00") & "秒）")
    Exit Sub

ErrorHandler:
    Call LogMessage("致命的エラー: " & Err.Number & " - " & Err.Description)
    MsgBox "エラーが発生しました" & vbCrLf & Err.Description, vbCritical
    Resume CleanUp
End Sub

' ログ出力ユーティリティ
Private Sub LogMessage(ByVal msg As String)
    Debug.Print Format(Now, "yyyy/mm/dd hh:mm:ss") & " " & msg
End Sub`,
      },
    ],
  },
  // ===== MOS Excel 365（一般レベル）対策 =====
  {
    id: "mos",
    title: "MOS Excel 365（一般レベル）試験対策",
    category: "mos",
    description:
      "MOS Excel 365（一般レベル）の出題範囲を完全網羅。5つのドメインすべての操作手順・関数・ポイントを解説します。",
    sections: [
      // Domain 1: ワークシートやブックの管理
      {
        title: "【Domain 1-1】ブックにデータをインポートする",
        content:
          "外部データをExcelに取り込む操作は頻出です。「データ」タブ→「データの取得」から、テキストファイル（.txt / .csv）やWebデータを取り込めます。CSVインポートではPower Queryエディターが開き、区切り文字（カンマ・タブ・セミコロンなど）の指定、データ型の変更、不要列の削除が可能です。「.txt」ファイルは固定幅または区切り記号で列を分割します。既存のブックからデータを取り込む場合は「データの取得」→「ファイルから」→「ブックから」を使用します。インポート後のデータは「クエリと接続」ウィンドウで管理でき、「すべて更新」で最新データに更新できます。",
      },
      {
        title: "【Domain 1-2】ブック内を移動する",
        content:
          "効率的なブック内移動は試験で問われます。主な方法: ①名前ボックス — セル参照（例: A1）やセル範囲名を入力してEnterで即座にジャンプ。②Ctrl+G（または F5）で「ジャンプ」ダイアログを表示し、セル参照や名前付き範囲を指定。③「ジャンプ」→「セル選択」で空白セル・数式セル・条件付き書式のセルなど特定条件のセルを一括選択。④Ctrl+Home で A1、Ctrl+End でデータ末尾へ移動。⑤Ctrl+矢印キー でデータ範囲の端へジャンプ。⑥シート間の移動 — Ctrl+PageDown で次のシート、Ctrl+PageUp で前のシートに移動。シート見出しを右クリック→「すべてのシート」で多数のシートから選択。⑦Ctrl+F で検索ダイアログを表示し、ブック全体またはシート内でデータを検索。⑧ハイパーリンクを使った別シート・別ブックへのリンク移動も出題されます。「挿入」タブ→「リンク」（Ctrl+K）でハイパーリンクを設定できます。",
      },
      {
        title: "【Domain 1-3】ワークシートやブックの書式を設定する",
        content:
          "ページレイアウトの設定が問われます。「ページレイアウト」タブから以下を設定: ①余白 — 標準・広い・狭い、またはユーザー設定。②印刷の向き — 縦・横。③用紙サイズ — A4・B5・レターなど。④印刷範囲 — 範囲選択後「印刷範囲の設定」で指定、「印刷範囲のクリア」で解除。⑤改ページ — 「改ページの挿入」「改ページの解除」「すべての改ページの解除」。改ページプレビューで青い線をドラッグして調整可能。ヘッダー/フッターは「挿入」タブ→「ヘッダーとフッター」で設定。ページ番号（&[ページ番号]）、日付（&[日付]）、ファイル名（&[ファイル名]）などの自動コードを挿入できます。先頭ページのみ別指定、奇数/偶数ページ別指定も設定可能。行・列の繰り返しは「ページレイアウト」→「印刷タイトル」で「タイトル行」「タイトル列」に範囲を指定します。",
      },
      {
        title: "【Domain 1-3b】シートの操作と行列の調整",
        content:
          "シート単位の操作と行列サイズの調整も出題されます。①シートの挿入 — シート見出しの右にある「+」ボタン、または右クリック→「挿入」。②シートの削除 — シート見出しを右クリック→「削除」（データがある場合は確認ダイアログが表示）。③シートの移動/コピー — シート見出しをドラッグで移動。Ctrlを押しながらドラッグでコピー。右クリック→「移動またはコピー」で別ブックへの移動/コピーも可能。「コピーを作成する」にチェックでコピー。④シート名の変更 — シート見出しをダブルクリックして入力。⑤シートタブの色 — シート見出しを右クリック→「シート見出しの色」でカラーを設定。内容の分類に便利。⑥行の高さ/列の幅 — 行番号/列番号の境界をドラッグで調整。右クリック→「行の高さ」/「列の幅」で数値指定。「ホーム」タブ→「書式」→「行の高さの自動調整」/「列の幅の自動調整」でコンテンツに合わせて自動調整。列番号の境界をダブルクリックでも自動調整。⑦既定の列幅 — 「ホーム」タブ→「書式」→「既定の幅」でシート全体の標準列幅を変更。",
      },
      {
        title: "【Domain 1-4】オプションと表示をカスタマイズする",
        content:
          "表示設定のカスタマイズが出題されます。①ウィンドウ枠の固定 — 「表示」タブ→「ウィンドウ枠の固定」で選択セルの上と左を固定。先頭行の固定・先頭列の固定もあり。②分割 — 「表示」タブ→「分割」でワークシートを最大4分割し、別々にスクロール可能。③数式バーの表示/非表示 — 「表示」タブのチェックボックス。④目盛線・見出しの表示/非表示 — 「表示」タブまたは「ページレイアウト」タブのチェックボックス。⑤ズーム — 「表示」タブ→「ズーム」で倍率指定、Ctrl+マウスホイールでも変更可能。⑥「表示」タブの「ブック表示」でノーマル・ページレイアウト・改ページプレビューを切替。⑦行・列の表示/非表示 — 行または列を選択→右クリック→「非表示」/「再表示」。シートの表示/非表示も同様に右クリックから操作。⑧クイックアクセスツールバー — タイトルバー付近に表示される小さなツールバー。よく使うコマンド（保存・元に戻す・やり直し等）を自由に追加/削除できます。リボンのコマンドを右クリック→「クイックアクセスツールバーに追加」で登録。⑨「ファイル」→「オプション」→「詳細設定」で各種オプションをカスタマイズ。",
      },
      {
        title: "【Domain 1-5】共同作業と配付のためにブックを準備する",
        content:
          "ブックの保護・共有・配付に関する操作が問われます。①印刷設定 — 「ファイル」→「印刷」で、印刷範囲・部数・片面/両面・部単位の設定。印刷プレビューで結果を確認。②別のファイル形式で保存 — 「ファイル」→「名前を付けて保存」→「ファイルの種類」でPDF、CSV、XLS（97-2003形式）、テンプレート(.xltx)などに保存。「エクスポート」→「PDF/XPSドキュメントの作成」でも可能。③ブックのプロパティ設定 — 「ファイル」→「情報」でタイトル・作成者・タグ・カテゴリなどを設定。④ドキュメント検査 — 「ファイル」→「情報」→「問題のチェック」→「ドキュメント検査」でコメント、個人情報、非表示データ等を検出・削除。⑤シートの保護 — 「校閲」タブ→「シートの保護」でパスワード設定、許可する操作を選択。⑥ブックの保護 — 「校閲」タブ→「ブックの保護」でシート構成（追加・削除・移動・名前変更）を保護。⑦数式の表示 — 「数式」タブ→「数式の表示」（Ctrl+`）で全セルの数式を表示。⑧コメントとメモ — 「校閲」タブ→「新しいコメント」でスレッド形式のコメントを追加（共同作業で返信可能）。「校閲」タブ→「メモ」→「新しいメモ」で従来のメモ（旧コメント）を追加。コメントの編集・削除・解決も「校閲」タブから操作。Shift+F2 でメモを挿入するショートカットもあります。⑨アクセシビリティチェック — 「校閲」タブ→「アクセシビリティチェック」で、スクリーンリーダー等の支援技術で問題がないか確認。画像の代替テキスト未設定、シート名の不適切さ、セルの結合、空白シートなどを検出し改善提案を表示します。",
      },
      // Domain 2: セルやセル範囲のデータの管理
      {
        title: "【Domain 2-1】シートのデータを操作する",
        content:
          "データの操作は最も出題数が多い領域です。①貼り付けオプション — コピー後の貼り付けで「値のみ」「書式のみ」「数式」「列幅」「行列の入れ替え」「リンク貼り付け」を使い分け。Ctrl+Alt+V で「形式を選択して貼り付け」ダイアログ表示。演算オプション（加算・減算・乗算・除算）も選択でき、貼り付け先の既存値に対して四則演算を適用可能（例: コピーした値を全セルに加算）。②オートフィル — 連続データ（日付・曜日・月・数値）をドラッグで自動入力。フィルハンドル（セル右下の+）をドラッグ。Ctrlを押しながらドラッグでコピー/連続の切替。③フラッシュフィル — Ctrl+E でパターンを自動認識して一括入力（例: 姓名の分割、メールアドレスからドメイン抽出）。「データ」タブ→「フラッシュフィル」からも実行可能。④データの並べ替え — 「データ」タブ→「並べ替え」で複数キーでの並べ替え。ユーザー設定リスト順（月〜日曜日など）も可能。フィルターのドロップダウンからも昇順/降順で並べ替え可能。⑤データのフィルター — 「データ」タブ→「フィルター」（Ctrl+Shift+L）でオートフィルター有効化。テキストフィルター（含む・先頭が・末尾が）、数値フィルター（以上・以下・範囲）、日付フィルター（今週・先月・期間指定）が使用可能。⑥セル/行/列の挿入・削除 — セルを右クリック→「挿入」/「削除」で周囲のセルの移動方向を指定。行番号/列番号を選択して右クリック→「挿入」/「削除」で行/列全体の操作。⑦検索と置換 — Ctrl+F で検索、Ctrl+H で置換。「オプション」で検索対象（値・数式・コメント）、大文字/小文字の区別、セル内容の完全一致、書式による検索を設定可能。⑧区切り位置 — 「データ」タブ→「区切り位置」で1つのセルに入っている文字列をカンマやスペースなどの区切り文字で複数セルに分割。⑨データの入力規則 — 「データ」タブ→「データの入力規則」で入力できる値の種類（整数・小数・リスト・日付・時刻・文字列の長さ）を制限。「リスト」を選択してドロップダウンリストを作成。「入力時メッセージ」タブでセル選択時のガイドメッセージ、「エラーメッセージ」タブで不正入力時のアラートを設定。",
      },
      {
        title: "【Domain 2-2】セルやセル範囲の書式を設定する",
        content:
          "書式設定は幅広く出題されます。①セルの結合 — 「セルを結合して中央揃え」「横方向に結合」「セルの結合」の違いを理解。②表示形式 — 「ホーム」タブまたはCtrl+1で「セルの書式設定」→「表示形式」。数値（小数点以下桁数・桁区切り）、通貨（¥記号）、日付（yyyy/mm/dd, m月d日等）、パーセンテージ、文字列。ユーザー定義形式（例: #,##0\"円\"; [赤]-#,##0\"円\"）も出題されます。③配置 — 水平/垂直方向の配置、折り返して全体を表示、縮小して全体を表示、インデント、文字の方向（角度指定）。④フォント — フォント名・サイズ・太字(Ctrl+B)・斜体(Ctrl+I)・下線(Ctrl+U)・文字色・取り消し線。⑤罫線 — 外枠・内側・下罫線・斜め罫線、線のスタイル（実線・点線・二重線）と色の指定。⑥塗りつぶし — セルの背景色とパターン。⑦条件付き書式 — 「ホーム」タブ→「条件付き書式」でセルの強調表示ルール（指定値より大きい/小さい/範囲内/重複など）、上位/下位ルール、データバー、カラースケール、アイコンセット。ルールの管理で条件の編集・削除・優先順位変更が可能。⑧書式のコピー — 書式のコピー/貼り付けボタン（ハケアイコン）をクリックまたはダブルクリック（連続適用）。⑨セルのスタイル — 「ホーム」タブ→「セルのスタイル」で定義済みスタイル（「タイトル」「見出し1〜4」「合計」「良い/普通/悪い」「注意」「計算」など）をワンクリックで適用。フォント・塗りつぶし・罫線が一括で設定され、統一感のある書式を簡単に適用できます。",
      },
      {
        title: "【Domain 2-3】名前付き範囲を定義する、参照する",
        content:
          "名前付き範囲は数式の可読性向上に重要です。①名前の定義 — セル範囲を選択→名前ボックスに名前を入力してEnter。または「数式」タブ→「名前の定義」でダイアログから設定（範囲のスコープをブック全体またはシート単位で指定可能）。②名前の管理 — 「数式」タブ→「名前の管理」で既存の名前付き範囲の参照先変更・削除・コメント追加。③数式での使用 — 名前付き範囲は数式内でセル参照の代わりに使用（例: =SUM(売上データ) ）。「数式」タブ→「数式で使用」からリスト選択も可能。④テーブル構造化参照 — テーブルでは自動的に列名が使える（例: =SUM(テーブル1[売上])）。[@列名] で同じ行の値を参照。⑤名前の自動作成 — 「数式」タブ→「選択範囲から作成」で行/列の見出しから名前を一括定義。",
        code: `=SUM(売上データ)          ' 名前付き範囲「売上データ」の合計
=AVERAGE(四半期売上)      ' 名前付き範囲を関数で使用
=SUM(テーブル1[売上])     ' テーブル構造化参照
=[@単価]*[@数量]          ' テーブル内の同じ行参照`,
      },
      {
        title: "【Domain 2-4】データを視覚的にまとめる",
        content:
          "視覚化によるデータの要約が問われます。①スパークライン — 「挿入」タブ→「スパークライン」で、折れ線・縦棒・勝敗の3種類から選択。セル内に小さなグラフを表示。「スパークライン」タブで頂点（高い/低い/最初/最後/負のポイント）の強調、色・線の太さの変更が可能。グループ解除で個別編集。②条件付き書式による視覚化 — データバー（棒の長さで値を比較）、カラースケール（色のグラデーションで分布を表示）、アイコンセット（矢印・信号機・旗で状態を表示）。ルールの編集でしきい値の変更が可能。③小計 — 「データ」タブ→「小計」で、グループごとの集計行を自動挿入（事前にデータの並べ替えが必要）。集計方法は合計・個数・平均など。アウトライン記号（1, 2, 3）でレベル表示を切替。④グループ化 — 行または列を選択して「データ」タブ→「グループ化」でアウトラインを作成し、+/- ボタンで展開/折りたたみ。",
      },
      // Domain 3: テーブルとテーブルのデータの管理
      {
        title: "【Domain 3-1】テーブルを作成する、書式設定する",
        content:
          "テーブル操作は必ず出題されます。①テーブルの作成 — データ範囲内のセルを選択→「挿入」タブ→「テーブル」（Ctrl+T）。「先頭行をテーブルの見出しとして使用する」にチェック。②テーブルスタイル — 「テーブルデザイン」タブでスタイルギャラリーから選択。淡色・中間・濃色の3カテゴリ。「縞模様（行）」「縞模様（列）」「最初の列」「最後の列」「集計行」「見出し行」のチェックボックスでスタイルオプションを切替。③テーブルへの変換 — 既存のセル範囲にスタイル適用: 「ホーム」タブ→「テーブルとして書式設定」→スタイル選択。④テーブル名の変更 — 「テーブルデザイン」タブの左端「テーブル名」で変更。数式内で使用するため分かりやすい名前にする。",
      },
      {
        title: "【Domain 3-2】テーブルを変更する",
        content:
          "テーブルの構造変更に関する操作です。①行・列の追加 — テーブルの最終行の次のセルにデータ入力で自動拡張。テーブル内で右クリック→「挿入」→「テーブルの行（上/下）」「テーブルの列（左/右）」。②行・列の削除 — テーブル内で右クリック→「削除」→「テーブルの行」「テーブルの列」。③集計行 — 「テーブルデザイン」タブ→「集計行」にチェック。集計行の各セルのドロップダウンから合計・平均・個数・最大・最小などの集計関数を選択（SUBTOTAL関数が自動使用される）。④テーブルのサイズ変更 — 「テーブルデザイン」タブ→「テーブルのサイズ変更」で新しい範囲を指定。⑤範囲に変換 — 「テーブルデザイン」タブ→「範囲に変換」でテーブルを通常の範囲に戻す（書式は保持、テーブル機能は解除）。⑥重複の削除 — 「テーブルデザイン」タブ→「重複の削除」で指定列の重複データを削除。",
      },
      {
        title: "【Domain 3-3】テーブルのデータをフィルターする、並べ替える",
        content:
          "テーブルのフィルターと並べ替えは試験で頻出です。①オートフィルター — テーブルでは自動的にフィルターボタンが表示される。ドロップダウンからチェックボックスで項目を選択/解除。②テキストフィルター — 「指定の値に等しい」「指定の値を含む」「指定の値で始まる」「指定の値で終わる」。ワイルドカード（* は任意の文字列、? は任意の1文字）が使用可能。③数値フィルター — 「指定の値以上」「指定の値以下」「指定の範囲内」「トップテン」。④日付フィルター — 「今日」「今週」「今月」「今四半期」「昨年」「期間指定」など。⑤色フィルター — セルの塗りつぶし色やフォント色でフィルター。⑥並べ替え — 列見出しのドロップダウンから昇順（A→Z, 小→大）/降順。「データ」タブ→「並べ替え」で複数レベルの並べ替え。セルの色・フォントの色・アイコンでも並べ替え可能。⑦スライサー — テーブル選択時「テーブルデザイン」タブ→「スライサーの挿入」で視覚的なフィルターボタンを作成。複数のスライサーを連動させることも可能。",
      },
      // Domain 4: 数式や関数を使用した演算の実行
      {
        title: "【Domain 4-1】参照を追加する — セル参照と関数のネスト",
        content:
          "セル参照の種類と使い分けは試験の基本です。①相対参照（A1） — コピー時に行列番号が自動調整される。②絶対参照（$A$1） — コピーしても参照先が固定。F4キーで切替。③複合参照（$A1 / A$1） — 行または列のみ固定。④別シート参照 — シート名!セル参照（例: Sheet2!A1）。シート名にスペースを含む場合は 'Sheet 2'!A1 のように引用符で囲む。⑤関数のネスト — 関数の引数に別の関数を使用（例: =IF(SUM(A1:A10)>100, \"達成\", \"未達\")）。最大64レベルまでネスト可能。⑥IFERROR関数 — エラー処理に使用。=IFERROR(数式, エラー時の値) でエラー表示を防止。",
        code: `=A1                      ' 相対参照（コピーで自動調整）
=$A$1                    ' 絶対参照（コピーでも固定）
=A$1                     ' 複合参照（行のみ固定）
=$A1                     ' 複合参照（列のみ固定）
=Sheet2!A1               ' 別シート参照
=IF(SUM(A1:A10)>100,"達成","未達")  ' ネストした関数
=IFERROR(A1/B1,"")       ' エラー時に空白表示`,
      },
      {
        title: "【Domain 4-2】データを計算する、加工する（基本関数）",
        content:
          "MOS試験で問われる主要な計算関数です。①SUM — 合計。=SUM(A1:A10)。②AVERAGE — 平均。③MIN / MAX — 最小値/最大値。④COUNT — 数値セルの個数。COUNTA — 空でないセルの個数。COUNTBLANK — 空白セルの個数。⑤IF — 条件分岐。=IF(条件, 真の値, 偽の値)。ネストで複数条件対応。⑥SUMIF / SUMIFS — 条件付き合計。SUMIF(範囲, 条件, 合計範囲)。SUMIFSは複数条件。⑦COUNTIF / COUNTIFS — 条件付きカウント。⑧AVERAGEIF / AVERAGEIFS — 条件付き平均。⑨VLOOKUP — 垂直検索。=VLOOKUP(検索値, 範囲, 列番号, FALSE)。TRUEで近似一致（データの昇順が必要）、FALSEで完全一致。⑩XLOOKUP — VLOOKUP の後継。=XLOOKUP(検索値, 検索範囲, 戻り範囲, 見つからない場合)。左方向検索も可能。⑪HLOOKUP — 水平検索。",
        code: `=SUM(A1:A10)                        ' 合計
=AVERAGE(A1:A10)                    ' 平均
=COUNT(A1:A10)                      ' 数値の個数
=COUNTA(A1:A10)                     ' 空でないセルの個数
=COUNTBLANK(A1:A10)                 ' 空白セルの個数
=IF(A1>=80,"合格","不合格")          ' 条件分岐
=SUMIF(B:B,"東京",C:C)              ' 条件付き合計
=SUMIFS(C:C,B:B,"東京",D:D,">=100") ' 複数条件の合計
=COUNTIF(A:A,">=60")                ' 条件付きカウント
=AVERAGEIF(B:B,"営業部",C:C)        ' 条件付き平均
=AVERAGEIFS(C:C,B:B,"東京",D:D,">=100") ' 複数条件の平均
=VLOOKUP(E1,A1:C10,3,FALSE)        ' 完全一致の垂直検索
=XLOOKUP(E1,A1:A10,C1:C10,"該当なし") ' XLOOKUP`,
      },
      {
        title: "【Domain 4-2b】データを計算する、加工する（日付・論理・その他）",
        content:
          "日付関数と論理関数も頻出です。①TODAY — 今日の日付。=TODAY()。②NOW — 現在の日時。=NOW()。③DATE — 年月日から日付を作成。=DATE(2024,4,1)。④YEAR / MONTH / DAY — 日付から年/月/日を取得。⑤DATEDIF — 2つの日付の差。=DATEDIF(開始日, 終了日, \"Y\") で年数、\"M\" で月数、\"D\" で日数。⑥AND — 複数条件がすべてTRUEか判定。=AND(A1>0, A1<100)。⑦OR — いずれかがTRUEか判定。⑧NOT — TRUE/FALSEを反転。⑨IFS — 複数条件の分岐。=IFS(条件1, 値1, 条件2, 値2, TRUE, 既定値)。⑩SWITCH — 値の一致で分岐。=SWITCH(A1, 1,\"優\", 2,\"良\", 3,\"可\", \"不明\")。⑪ROUND / ROUNDUP / ROUNDDOWN — 四捨五入/切り上げ/切り捨て。⑫INT — 整数に切り捨て。⑬MOD — 余り。⑭ABS — 絶対値。⑮LARGE / SMALL — n番目に大きい/小さい値。⑯RANK.EQ — 順位。",
        code: `=TODAY()                            ' 今日の日付
=NOW()                              ' 現在の日時
=DATE(2024,4,1)                     ' 2024/4/1
=YEAR(A1)                           ' 日付から年を取得
=DATEDIF(A1,B1,"Y")                 ' 2日付間の年数
=AND(A1>=60,B1>=60)                 ' 両方60以上か
=IFS(A1>=90,"A",A1>=70,"B",TRUE,"C") ' 複数条件分岐
=ROUND(A1,2)                        ' 小数第2位で四捨五入
=ROUNDUP(A1,0)                      ' 整数に切り上げ
=LARGE(A1:A10,3)                    ' 3番目に大きい値
=RANK.EQ(A1,A:A)                    ' 順位を求める`,
      },
      {
        title: "【Domain 4-3】文字列を変更する、書式設定する",
        content:
          "文字列関数も試験範囲に含まれます。①LEFT / RIGHT / MID — 文字の抽出。LEFT(文字列, 文字数)、RIGHT(文字列, 文字数)、MID(文字列, 開始位置, 文字数)。②LEN — 文字数。③CONCAT / CONCATENATE — 文字列の結合。CONCAT(A1,\"-\",B1) または =A1&\"-\"&B1。④TEXTJOIN — 区切り文字付き結合。=TEXTJOIN(\",\", TRUE, A1:A10) でTRUEは空白を無視。⑤UPPER / LOWER / PROPER — 大文字/小文字/先頭大文字に変換。⑥TRIM — 余分なスペースを削除（文字間のスペースは1つに統一）。⑦SUBSTITUTE — 文字の置換。=SUBSTITUTE(A1,\"旧\",\"新\")。⑧FIND / SEARCH — 文字の位置を検索。FINDは大文字小文字を区別、SEARCHはワイルドカード対応。⑨VALUE — 文字列を数値に変換。⑩TEXT — 数値を指定の書式で文字列に変換。=TEXT(A1,\"yyyy年m月d日\")。",
        code: `=LEFT(A1,3)                         ' 左から3文字
=RIGHT(A1,4)                        ' 右から4文字
=MID(A1,2,5)                        ' 2文字目から5文字
=LEN(A1)                            ' 文字数
=CONCAT(A1," ",B1)                  ' 文字列結合
=TEXTJOIN(",",TRUE,A1:A5)           ' カンマ区切りで結合
=UPPER("hello")                     ' → "HELLO"
=TRIM("  hello  world  ")           ' → "hello world"
=SUBSTITUTE(A1,"株式会社","(株)")     ' 文字の置換
=TEXT(44927,"yyyy/mm/dd")           ' → "2023/01/01"`,
      },
      // Domain 5: グラフの管理
      {
        title: "【Domain 5-1】グラフを作成する",
        content:
          "グラフ作成は毎回出題されます。①グラフの挿入 — データ範囲を選択→「挿入」タブ→グラフの種類を選択。主なグラフ: 縦棒グラフ（比較）、横棒グラフ（項目名が長い比較）、折れ線グラフ（時系列の推移）、円グラフ（構成比）、面グラフ（累積の推移）、散布図（2変数の相関）、複合グラフ（異なる種類の組み合わせ）。②おすすめグラフ — 「挿入」タブ→「おすすめグラフ」でデータに適したグラフを自動提案。③グラフシート — グラフを右クリック→「グラフの移動」で新しいシートまたは既存のシートを選択。グラフシートにするとシート全体がグラフになる。④データ範囲の変更 — グラフを選択→「グラフデザイン」タブ→「データの選択」でデータ範囲を変更。系列の追加・削除・編集が可能。行/列の切り替えもここで行う。⑤クイックレイアウト — 「グラフデザイン」タブ→「クイックレイアウト」で定義済みのレイアウトを適用。",
      },
      {
        title: "【Domain 5-2】グラフを変更する",
        content:
          "グラフの編集操作が問われます。①グラフ要素の追加/削除 — グラフ右上の「+」ボタンまたは「グラフデザイン」タブ→「グラフ要素を追加」で、グラフタイトル・軸ラベル・データラベル・凡例・目盛線・データテーブル・近似曲線・誤差範囲を追加/削除。②データラベル — 値・カテゴリ名・系列名・パーセンテージの表示。ラベルの位置（外側・内側・中央など）を変更。③凡例 — 上・下・左・右の配置変更。④グラフの種類の変更 — グラフを右クリック→「グラフの種類の変更」。複合グラフでは系列ごとに種類と第2軸の使用を設定。⑤行/列の切り替え — 「グラフデザイン」タブ→「行/列の切り替え」でX軸とデータ系列を入れ替え。⑥データ系列の書式 — 系列をダブルクリックで「データ系列の書式設定」。円グラフの切り離し、棒グラフの要素の間隔、折れ線グラフのマーカー設定。⑦軸の書式設定 — 軸をダブルクリックで最小値・最大値・目盛間隔・表示単位（百・千・万）の設定。対数目盛の設定も可能。",
      },
      {
        title: "【Domain 5-3】グラフを書式設定する",
        content:
          "グラフの見た目を整える操作です。①グラフスタイル — グラフ選択時の「グラフデザイン」タブ→スタイルギャラリーから選択。グラフ右上の筆アイコンからも選択可能。②色の変更 — 「グラフデザイン」タブ→「色の変更」でカラーパレットを切替。③個別要素の書式設定 — 要素をダブルクリック→「書式設定」作業ウィンドウで塗りつぶし（単色・グラデーション・パターン・図）、枠線（色・太さ・線種）、影・光彩・ぼかしなどの効果を設定。④テキストの書式 — グラフタイトル・軸ラベル・データラベルのフォント・サイズ・色・配置を変更。⑤グラフのサイズと位置 — ドラッグでサイズ変更。「書式」タブで正確なサイズを数値指定。Alt+ドラッグでセルに合わせて配置。⑥テンプレートとして保存 — グラフを右クリック→「テンプレートとして保存」で .crtx ファイルとして保存。次回から「テンプレート」カテゴリで再利用可能。⑦Alt テキスト — グラフを右クリック→「代替テキストの編集」でアクセシビリティ用の説明文を設定。",
      },
      // 試験対策のポイント
      {
        title: "【試験対策】合格のための重要ポイント",
        content:
          "MOS Excel 365（一般レベル）の合格ライン（約700/1000点）をクリアするための重要ポイントをまとめます。①出題形式 — プロジェクト形式（ストーリーに沿って複数タスクを実行）。約35分で5〜7個のプロジェクトに解答。②頻出操作 — 条件付き書式、VLOOKUP/XLOOKUP、IF/SUMIF/COUNTIF、テーブルの作成と操作、グラフの作成と編集、印刷設定、データの並べ替えとフィルター。③キーボードショートカット — Ctrl+C/V/X（コピー/貼付/切取）、Ctrl+Z/Y（元に戻す/やり直し）、Ctrl+S（保存）、Ctrl+1（セルの書式設定）、Ctrl+T（テーブル作成）、Ctrl+Shift+L（フィルター）、F4（参照切替）、F2（セル編集）。④注意点 — 問題文を最後まで読む。「名前を付けて保存」と「エクスポート」の違いに注意。テーブルの構造化参照と通常のセル参照を区別する。グラフ要素の名称（データラベル・凡例・軸ラベル等）を正確に覚える。「リセット」ボタンで各プロジェクトの初期状態に戻せる。⑤時間配分 — 1プロジェクトあたり約5〜7分。分からない問題は後回しにして全体を解答することを優先。",
      },
    ],
  },
];
