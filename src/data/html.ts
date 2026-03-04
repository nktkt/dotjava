export interface HtmlSection {
  title: string;
  content: string;
  code?: string;
}

export interface HtmlChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: HtmlSection[];
}

export const htmlCategories = [
  { id: "basics", name: "基礎構造", color: "var(--color-dads-cyan)" },
  { id: "links-tables", name: "リンク・リスト・テーブル", color: "var(--color-dads-blue)" },
  { id: "forms", name: "フォーム", color: "var(--color-dads-purple)" },
  { id: "media", name: "メディア", color: "var(--color-dads-error)" },
  { id: "semantics", name: "セマンティクス", color: "var(--color-dads-warning)" },
  { id: "head-seo", name: "head・メタデータ", color: "var(--color-dads-success)" },
  { id: "modern", name: "モダンHTML", color: "var(--color-dads-navy)" },
] as const;

export const htmlChapters: HtmlChapter[] = [
  // ===== 基礎構造 =====
  {
    id: "html-basics",
    title: "HTMLの基本構造",
    category: "basics",
    description:
      "DOCTYPE宣言、html/head/body の文書構造、コメント、文字コードの基本を理解する",
    sections: [
      {
        title: "HTML文書の基本構造",
        content:
          "HTML（HyperText Markup Language）はWebページの構造を記述するマークアップ言語です。すべてのHTML文書は DOCTYPE 宣言で始まり、html 要素がルート要素となります。html 要素の中に head（メタ情報）と body（表示内容）が入ります。lang 属性でページの言語を指定することはアクセシビリティとSEOの両面で重要です。",
        code: `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ページタイトル</title>
  <meta name="description" content="ページの説明">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>見出し</h1>
  <p>段落テキスト</p>

  <script src="app.js"></script>
</body>
</html>

<!-- DOCTYPE: HTML5であることを宣言 -->
<!-- charset: 文字エンコーディング（UTF-8推奨） -->
<!-- viewport: レスポンシブデザインに必須 -->`,
      },
      {
        title: "要素・タグ・属性",
        content:
          "HTMLの要素は開始タグ、コンテンツ、終了タグで構成されます。開始タグには属性（attribute）を記述でき、要素に追加情報を付与します。空要素（img, br, input など）は終了タグを持ちません。属性値はダブルクォートで囲むのが推奨です。ブール属性（disabled, required など）は属性名だけで機能します。",
        code: `<!-- 要素の構造 -->
<p class="intro">これはテキストです。</p>
<!-- ↑開始タグ  ↑コンテンツ       ↑終了タグ -->

<!-- 属性の記述 -->
<a href="https://example.com" target="_blank" rel="noopener">
  リンク
</a>

<!-- 空要素（終了タグなし） -->
<br>
<hr>
<img src="photo.jpg" alt="写真の説明">
<input type="text" placeholder="入力してください">

<!-- ブール属性 -->
<input type="text" disabled>       <!-- 無効化 -->
<input type="text" required>       <!-- 必須 -->
<input type="checkbox" checked>    <!-- チェック済み -->
<details open>                     <!-- 開いた状態 -->
  <summary>詳細</summary>
  <p>詳細内容</p>
</details>

<!-- data-* カスタム属性 -->
<div data-user-id="123" data-role="admin">
  カスタムデータを持つ要素
</div>`,
      },
      {
        title: "コメントと特殊文字",
        content:
          "HTMLコメントは <!-- --> で記述し、ブラウザには表示されませんがソースコードには残ります。特殊文字（HTMLエンティティ）は &名前; または &#番号; の形式で記述します。< > & \" などの文字はHTMLの構文と衝突するため、エンティティを使う必要があります。",
        code: `<!-- HTMLコメント -->
<!-- このコメントはブラウザに表示されない -->

<!--
  複数行の
  コメントも可能
-->

<!-- 条件付きコメント（IE用、現在は不要） -->
<!--[if IE]>
  <p>Internet Explorer 用のコンテンツ</p>
<![endif]-->

<!-- HTMLエンティティ（特殊文字） -->
<p>&lt;p&gt; タグ</p>    <!-- <p> タグ -->
<p>&amp; アンパサンド</p>  <!-- & アンパサンド -->
<p>&quot;引用&quot;</p>    <!-- "引用" -->
<p>&copy; 2024</p>         <!-- © 2024 -->
<p>&yen; 1,000</p>         <!-- ¥ 1,000 -->
<p>A &gt; B</p>            <!-- A > B -->

<!-- スペース関連 -->
<p>複数の&nbsp;&nbsp;&nbsp;スペース</p>  <!-- 非改行スペース -->
<p>改行なし&shy;ハイフン</p>              <!-- ソフトハイフン -->

<!-- 数値参照 -->
<p>&#9829; &#9733; &#10003;</p> <!-- ♥ ★ ✓ -->`,
      },
    ],
  },
  {
    id: "text-elements",
    title: "テキスト要素",
    category: "basics",
    description:
      "見出し、段落、強調、引用、整形済みテキストなどテキスト関連の要素を使いこなす",
    sections: [
      {
        title: "見出しと段落",
        content:
          "見出し（h1〜h6）はページの構造を定義する重要な要素です。h1 はページに1つだけ使い、h2 → h3 → h4 の順に階層を守ることがSEOとアクセシビリティの基本です。段落は p 要素で記述し、改行は br 要素を使います。水平線は hr 要素で描画します。",
        code: `<!-- 見出し（h1〜h6） -->
<h1>メインタイトル（ページに1つ）</h1>
<h2>セクション見出し</h2>
<h3>サブセクション</h3>
<h4>小見出し</h4>
<h5>細見出し</h5>
<h6>最小見出し</h6>

<!-- ❌ 見出し階層をスキップしない -->
<h1>タイトル</h1>
<h3>いきなりh3</h3>  <!-- h2 をスキップ -->

<!-- ✅ 正しい階層 -->
<h1>タイトル</h1>
<h2>セクション</h2>
<h3>サブセクション</h3>

<!-- 段落と改行 -->
<p>最初の段落。テキストがここに入ります。</p>
<p>2番目の段落。新しい段落は p 要素を使います。</p>

<!-- 改行（段落内での強制改行） -->
<p>
  住所:<br>
  東京都千代田区<br>
  1-1-1
</p>

<!-- 水平線（テーマの区切り） -->
<p>第1章の内容</p>
<hr>
<p>第2章の内容</p>`,
      },
      {
        title: "テキストの強調と装飾",
        content:
          "strong は意味的に重要なテキスト、em は強調（アクセント）を表します。b は単なる太字、i は慣例的な斜体です。mark はハイライト、small は細則や注釈、del は削除されたテキスト、ins は追加されたテキストを表します。見た目ではなく意味（セマンティクス）に基づいて使い分けることが重要です。",
        code: `<!-- 意味的な強調 -->
<p>
  この操作は<strong>元に戻せません</strong>。  <!-- 重要性 -->
  本当に<em>削除</em>しますか？                 <!-- 強調 -->
</p>

<!-- 見た目の装飾（意味は弱い） -->
<p><b>太字テキスト</b></p>    <!-- 慣例的な太字 -->
<p><i>斜体テキスト</i></p>    <!-- 慣例的な斜体 -->
<p><u>下線テキスト</u></p>    <!-- 慣例的な下線 -->

<!-- ハイライト・注釈 -->
<p>検索結果: <mark>JavaScript</mark> の学習方法</p>
<p><small>※ 価格は税込みです</small></p>

<!-- 取り消し・挿入 -->
<p>
  価格: <del>¥5,000</del> <ins>¥3,980</ins>
</p>

<!-- 上付き・下付き -->
<p>H<sub>2</sub>O（水）</p>
<p>E = mc<sup>2</sup></p>

<!-- コード・キーボード -->
<p><code>console.log()</code> で出力します</p>
<p><kbd>Ctrl</kbd> + <kbd>C</kbd> でコピー</p>

<!-- 略語 -->
<p><abbr title="HyperText Markup Language">HTML</abbr></p>`,
      },
      {
        title: "引用と整形済みテキスト",
        content:
          "blockquote はブロックレベルの引用、q はインラインの引用に使います。cite で出典元を示すことができます。pre 要素は空白や改行をそのまま保持して表示します。pre と code を組み合わせてコードブロックを表現するのが一般的です。",
        code: `<!-- ブロック引用 -->
<blockquote cite="https://example.com/source">
  <p>シンプルにできるなら、シンプルにすべきだ。</p>
  <footer>— <cite>アルバート・アインシュタイン</cite></footer>
</blockquote>

<!-- インライン引用 -->
<p>
  彼は<q>明日は晴れるだろう</q>と言った。
</p>

<!-- 整形済みテキスト（空白・改行を保持） -->
<pre>
  function hello() {
    console.log("Hello!");
  }
</pre>

<!-- コードブロック（pre + code の組み合わせ） -->
<pre><code class="language-javascript">
const greeting = "Hello, World!";
console.log(greeting);
</code></pre>

<!-- 出力例 -->
<pre><samp>
$ node app.js
Hello, World!
</samp></pre>

<!-- アドレス -->
<address>
  お問い合わせ:
  <a href="mailto:info@example.com">info@example.com</a><br>
  東京都千代田区 1-1-1
</address>

<!-- 時間 -->
<p>
  <time datetime="2024-01-15">2024年1月15日</time>に公開
</p>`,
      },
    ],
  },

  // ===== リンク・リスト・テーブル =====
  {
    id: "links-lists",
    title: "リンクとリスト",
    category: "links-tables",
    description:
      "ハイパーリンクの種類、順序付き・順序なしリスト、定義リストを理解する",
    sections: [
      {
        title: "ハイパーリンク（a 要素）",
        content:
          "a 要素はハイパーリンクを作成します。href 属性にURLを指定し、target=\"_blank\" で新しいタブで開きます。外部リンクには rel=\"noopener noreferrer\" を付けるのがセキュリティ上推奨されます。ページ内リンク（アンカー）は # とid を使います。tel: や mailto: で電話やメールのリンクも作成できます。",
        code: `<!-- 基本的なリンク -->
<a href="https://example.com">外部リンク</a>
<a href="/about">内部リンク（相対パス）</a>
<a href="./page.html">同ディレクトリのページ</a>

<!-- 新しいタブで開く -->
<a href="https://example.com"
   target="_blank"
   rel="noopener noreferrer">
  外部リンク（新規タブ）
</a>

<!-- ページ内リンク（アンカー） -->
<a href="#section1">セクション1へ</a>
<a href="#top">ページ先頭へ</a>
<!-- リンク先 -->
<h2 id="section1">セクション1</h2>

<!-- 電話・メールリンク -->
<a href="tel:+81-3-1234-5678">03-1234-5678</a>
<a href="mailto:info@example.com">メールを送る</a>
<a href="mailto:info@example.com?subject=お問い合わせ&body=本文">
  件名付きメール
</a>

<!-- ダウンロードリンク -->
<a href="/files/document.pdf" download>PDFをダウンロード</a>
<a href="/files/data.csv" download="レポート.csv">CSVダウンロード</a>

<!-- リンクの状態（CSS で装飾） -->
<!-- :link（未訪問） :visited（訪問済み）
     :hover（ホバー） :active（クリック中） -->`,
      },
      {
        title: "リスト（ul / ol / dl）",
        content:
          "ul（unordered list）は順序のないリスト、ol（ordered list）は順序付きリストを作成します。li 要素がリスト項目です。dl（definition list）は用語と定義のペアを表現します。リストはネスト（入れ子）にすることもできます。ナビゲーションメニューもリストで作るのがセマンティック的に正しいです。",
        code: `<!-- 順序なしリスト -->
<ul>
  <li>りんご</li>
  <li>バナナ</li>
  <li>みかん</li>
</ul>

<!-- 順序付きリスト -->
<ol>
  <li>準備する</li>
  <li>実行する</li>
  <li>確認する</li>
</ol>

<!-- 開始番号・種類の指定 -->
<ol start="5" type="A" reversed>
  <li>項目A</li>  <!-- E（reversed なので逆順） -->
  <li>項目B</li>
</ol>

<!-- ネストしたリスト -->
<ul>
  <li>フロントエンド
    <ul>
      <li>HTML</li>
      <li>CSS</li>
      <li>JavaScript</li>
    </ul>
  </li>
  <li>バックエンド
    <ul>
      <li>Java</li>
      <li>Python</li>
    </ul>
  </li>
</ul>

<!-- 定義リスト -->
<dl>
  <dt>HTML</dt>
  <dd>Webページの構造を記述するマークアップ言語</dd>

  <dt>CSS</dt>
  <dd>Webページの見た目を装飾するスタイルシート言語</dd>
</dl>`,
      },
      {
        title: "ナビゲーションとメニュー",
        content:
          "ナビゲーションメニューは nav 要素の中にリストを配置して構築します。パンくずリスト、タブナビゲーション、サイドバーメニューなど、さまざまなパターンがあります。aria-current 属性で現在のページを示すことがアクセシビリティ上重要です。",
        code: `<!-- 基本的なナビゲーション -->
<nav aria-label="メインナビゲーション">
  <ul>
    <li><a href="/" aria-current="page">ホーム</a></li>
    <li><a href="/about">About</a></li>
    <li><a href="/blog">ブログ</a></li>
    <li><a href="/contact">お問い合わせ</a></li>
  </ul>
</nav>

<!-- パンくずリスト -->
<nav aria-label="パンくずリスト">
  <ol>
    <li><a href="/">ホーム</a></li>
    <li><a href="/products">製品</a></li>
    <li aria-current="page">製品詳細</li>
  </ol>
</nav>

<!-- ドロップダウンメニュー -->
<nav>
  <ul>
    <li>
      <a href="/services">サービス</a>
      <ul>
        <li><a href="/services/web">Web制作</a></li>
        <li><a href="/services/app">アプリ開発</a></li>
        <li><a href="/services/consulting">コンサルティング</a></li>
      </ul>
    </li>
  </ul>
</nav>

<!-- フッターナビゲーション -->
<footer>
  <nav aria-label="フッターナビゲーション">
    <ul>
      <li><a href="/privacy">プライバシーポリシー</a></li>
      <li><a href="/terms">利用規約</a></li>
      <li><a href="/sitemap">サイトマップ</a></li>
    </ul>
  </nav>
</footer>`,
      },
    ],
  },
  {
    id: "tables",
    title: "テーブル",
    category: "links-tables",
    description:
      "テーブルの構造、thead/tbody/tfoot、セルの結合、アクセシビリティ対応",
    sections: [
      {
        title: "テーブルの基本構造",
        content:
          "table 要素でテーブルを作成します。thead（ヘッダー）、tbody（本体）、tfoot（フッター）でセクションを分けます。tr は行、th はヘッダーセル、td はデータセルです。caption でテーブルの説明を記述します。レイアウト目的でのテーブル使用は非推奨です。",
        code: `<!-- 基本的なテーブル -->
<table>
  <caption>2024年 四半期売上</caption>
  <thead>
    <tr>
      <th>四半期</th>
      <th>売上</th>
      <th>前年比</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Q1</td>
      <td>¥1,200万</td>
      <td>+5%</td>
    </tr>
    <tr>
      <td>Q2</td>
      <td>¥1,500万</td>
      <td>+12%</td>
    </tr>
    <tr>
      <td>Q3</td>
      <td>¥1,100万</td>
      <td>-3%</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>合計</td>
      <td>¥3,800万</td>
      <td>+5%</td>
    </tr>
  </tfoot>
</table>`,
      },
      {
        title: "セルの結合と列グループ",
        content:
          "colspan 属性で横方向のセル結合、rowspan 属性で縦方向のセル結合ができます。colgroup と col 要素で列にスタイルを適用できます。複雑なテーブルでは scope 属性を使ってヘッダーとデータセルの関係を明示します。",
        code: `<!-- colspan（横方向の結合） -->
<table>
  <tr>
    <th colspan="2">名前</th>
    <th>年齢</th>
  </tr>
  <tr>
    <td>姓: 田中</td>
    <td>名: 太郎</td>
    <td>25</td>
  </tr>
</table>

<!-- rowspan（縦方向の結合） -->
<table>
  <tr>
    <th rowspan="2">東京</th>
    <td>新宿区</td>
    <td>350,000人</td>
  </tr>
  <tr>
    <td>渋谷区</td>
    <td>230,000人</td>
  </tr>
</table>

<!-- colgroup（列グループのスタイル） -->
<table>
  <colgroup>
    <col>
    <col style="background-color: #f0f0f0;">
    <col style="background-color: #e0e0e0;">
  </colgroup>
  <tr>
    <th>項目</th><th>2023</th><th>2024</th>
  </tr>
  <tr>
    <td>売上</td><td>100</td><td>120</td>
  </tr>
</table>

<!-- scope でヘッダーの適用範囲を明示 -->
<th scope="col">列ヘッダー</th>
<th scope="row">行ヘッダー</th>
<th scope="colgroup">列グループヘッダー</th>`,
      },
      {
        title: "テーブルのアクセシビリティ",
        content:
          "テーブルのアクセシビリティを確保するには、caption でテーブルの目的を説明し、th 要素と scope 属性でヘッダーとデータの関係を明示します。複雑なテーブルでは id と headers 属性で関連付けます。レスポンシブ対応では横スクロールやカードレイアウトへの変換を検討します。",
        code: `<!-- アクセシブルなテーブル -->
<table>
  <caption>
    社員一覧
    <span class="sr-only">（部署別にソート済み）</span>
  </caption>
  <thead>
    <tr>
      <th scope="col">名前</th>
      <th scope="col">部署</th>
      <th scope="col">役職</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">田中太郎</th>
      <td>開発部</td>
      <td>エンジニア</td>
    </tr>
  </tbody>
</table>

<!-- 複雑なテーブル（id と headers で関連付け） -->
<table>
  <tr>
    <th id="name">名前</th>
    <th id="mon">月曜</th>
    <th id="tue">火曜</th>
  </tr>
  <tr>
    <th id="alice" headers="name">Alice</th>
    <td headers="alice mon">出勤</td>
    <td headers="alice tue">休み</td>
  </tr>
</table>

<!-- レスポンシブテーブル（横スクロール） -->
<div style="overflow-x: auto;">
  <table>
    <!-- 横幅が広いテーブル -->
  </table>
</div>

<!-- role="table" は通常不要（table 要素に暗黙的に付与）-->
<!-- aria-describedby でテーブルの補足説明を関連付け -->
<p id="table-note">※ 金額は税込みです</p>
<table aria-describedby="table-note">
  <!-- テーブル内容 -->
</table>`,
      },
    ],
  },

  // ===== フォーム =====
  {
    id: "forms-basics",
    title: "フォームの基本",
    category: "forms",
    description:
      "form要素、input の種類、textarea、select、button、label の使い方",
    sections: [
      {
        title: "form 要素と input の基本",
        content:
          "form 要素はユーザー入力を収集してサーバーに送信するためのコンテナです。action 属性で送信先URL、method 属性で HTTP メソッド（GET/POST）を指定します。input 要素は type 属性で多様な入力フィールドを作成できます。label 要素は入力フィールドの説明を関連付け、アクセシビリティに不可欠です。",
        code: `<!-- 基本的なフォーム -->
<form action="/api/submit" method="POST">
  <!-- label と input の関連付け（for + id） -->
  <label for="username">ユーザー名:</label>
  <input type="text" id="username" name="username">

  <!-- label で input を囲む方法 -->
  <label>
    メールアドレス:
    <input type="email" name="email">
  </label>

  <button type="submit">送信</button>
</form>

<!-- input の主な type -->
<input type="text" placeholder="テキスト">
<input type="password" placeholder="パスワード">
<input type="email" placeholder="email@example.com">
<input type="number" min="0" max="100" step="1">
<input type="tel" placeholder="090-1234-5678">
<input type="url" placeholder="https://example.com">
<input type="search" placeholder="検索...">
<input type="date">
<input type="time">
<input type="datetime-local">
<input type="month">
<input type="color">
<input type="range" min="0" max="100" value="50">
<input type="file" accept="image/*">
<input type="hidden" name="csrf_token" value="abc123">`,
      },
      {
        title: "選択系の入力要素",
        content:
          "チェックボックスは複数選択、ラジオボタンは排他的な単一選択に使います。select 要素はドロップダウンリストを作成します。optgroup で選択肢をグループ化できます。datalist は input に候補リストを提供し、自由入力と選択の両方を可能にします。",
        code: `<!-- チェックボックス（複数選択） -->
<fieldset>
  <legend>好きな言語（複数選択可）:</legend>
  <label>
    <input type="checkbox" name="lang" value="java"> Java
  </label>
  <label>
    <input type="checkbox" name="lang" value="js" checked> JavaScript
  </label>
  <label>
    <input type="checkbox" name="lang" value="python"> Python
  </label>
</fieldset>

<!-- ラジオボタン（単一選択） -->
<fieldset>
  <legend>性別:</legend>
  <label>
    <input type="radio" name="gender" value="male"> 男性
  </label>
  <label>
    <input type="radio" name="gender" value="female"> 女性
  </label>
  <label>
    <input type="radio" name="gender" value="other"> その他
  </label>
</fieldset>

<!-- セレクトボックス -->
<label for="country">国:</label>
<select id="country" name="country">
  <option value="">選択してください</option>
  <optgroup label="アジア">
    <option value="jp">日本</option>
    <option value="kr">韓国</option>
  </optgroup>
  <optgroup label="ヨーロッパ">
    <option value="uk">イギリス</option>
    <option value="fr">フランス</option>
  </optgroup>
</select>

<!-- datalist（入力候補） -->
<input type="text" list="browsers" placeholder="ブラウザ名">
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Safari">
  <option value="Edge">
</datalist>`,
      },
      {
        title: "テキストエリアとボタン",
        content:
          "textarea は複数行のテキスト入力に使います。rows と cols で初期サイズを指定できます。button 要素には submit（送信）、reset（リセット）、button（汎用）の3つの type があります。fieldset と legend でフォーム要素をグループ化し、構造化と意味付けを行います。",
        code: `<!-- テキストエリア -->
<label for="message">メッセージ:</label>
<textarea id="message" name="message"
  rows="5" cols="40"
  placeholder="メッセージを入力..."
  maxlength="500"></textarea>

<!-- ボタンの種類 -->
<button type="submit">送信</button>    <!-- フォーム送信 -->
<button type="reset">リセット</button>  <!-- フォーム初期化 -->
<button type="button">ボタン</button>   <!-- JS用の汎用ボタン -->

<!-- input でのボタン（button 要素を推奨） -->
<input type="submit" value="送信">
<input type="reset" value="リセット">

<!-- fieldset と legend でグループ化 -->
<form>
  <fieldset>
    <legend>個人情報</legend>
    <label>名前: <input type="text" name="name"></label>
    <label>年齢: <input type="number" name="age"></label>
  </fieldset>

  <fieldset>
    <legend>連絡先</legend>
    <label>メール: <input type="email" name="email"></label>
    <label>電話: <input type="tel" name="phone"></label>
  </fieldset>

  <button type="submit">登録する</button>
</form>

<!-- output 要素（計算結果の表示） -->
<form oninput="result.value = Number(a.value) + Number(b.value)">
  <input type="number" name="a" value="0"> +
  <input type="number" name="b" value="0"> =
  <output name="result">0</output>
</form>`,
      },
    ],
  },
  {
    id: "form-validation",
    title: "フォームバリデーション",
    category: "forms",
    description:
      "HTML5ビルトインバリデーション、pattern 属性、カスタムバリデーションの実装",
    sections: [
      {
        title: "HTML5 ビルトインバリデーション",
        content:
          "HTML5 にはブラウザネイティブのバリデーション機能が組み込まれています。required で必須項目、minlength/maxlength で文字数制限、min/max で数値範囲を指定できます。type 属性による型チェック（email、url、number など）も自動で行われます。",
        code: `<!-- 必須項目 -->
<input type="text" required>

<!-- 文字数制限 -->
<input type="text" minlength="3" maxlength="20">

<!-- 数値範囲 -->
<input type="number" min="1" max="100" step="5">

<!-- メール・URL の自動検証 -->
<input type="email" required>  <!-- メール形式をチェック -->
<input type="url" required>    <!-- URL形式をチェック -->

<!-- 実践的なフォーム -->
<form>
  <label>
    ユーザー名（3〜20文字）:
    <input type="text" name="username"
      required minlength="3" maxlength="20"
      placeholder="ユーザー名を入力">
  </label>

  <label>
    メールアドレス:
    <input type="email" name="email" required
      placeholder="email@example.com">
  </label>

  <label>
    年齢（18〜120）:
    <input type="number" name="age"
      min="18" max="120" required>
  </label>

  <label>
    Webサイト:
    <input type="url" name="website"
      placeholder="https://example.com">
  </label>

  <button type="submit">送信</button>
</form>`,
      },
      {
        title: "pattern 属性と正規表現",
        content:
          "pattern 属性で正規表現によるバリデーションを行えます。title 属性でバリデーションエラー時のヒントメッセージを設定します。電話番号、郵便番号、パスワードの強度チェックなど、カスタムの入力形式を指定するのに便利です。",
        code: `<!-- 電話番号（ハイフン付き） -->
<input type="tel"
  pattern="\\d{2,4}-\\d{2,4}-\\d{4}"
  title="例: 03-1234-5678"
  placeholder="03-1234-5678">

<!-- 郵便番号 -->
<input type="text"
  pattern="\\d{3}-\\d{4}"
  title="例: 100-0001"
  placeholder="100-0001">

<!-- パスワード（英大文字・小文字・数字を含む8文字以上） -->
<input type="password"
  pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
  title="英大文字・小文字・数字を含む8文字以上"
  placeholder="パスワード">

<!-- カタカナのみ -->
<input type="text"
  pattern="[ァ-ヶー]+"
  title="カタカナで入力してください"
  placeholder="カタカナ">

<!-- 英数字のみ（3〜16文字） -->
<input type="text"
  pattern="[a-zA-Z0-9]{3,16}"
  title="英数字3〜16文字で入力してください">

<!-- 複数の pattern をまとめた実用例 -->
<form>
  <label>
    ユーザーID（英数字・アンダースコア）:
    <input type="text" name="userId"
      pattern="[a-zA-Z0-9_]{3,20}" required
      title="英数字とアンダースコア、3〜20文字">
  </label>
  <button type="submit">登録</button>
</form>`,
      },
      {
        title: "カスタムバリデーション",
        content:
          "JavaScript の Constraint Validation API を使って、HTML5 バリデーションをカスタマイズできます。setCustomValidity() でカスタムエラーメッセージを設定し、reportValidity() でバリデーションを手動実行します。:valid、:invalid、:user-valid 疑似クラスで CSS スタイルも制御できます。",
        code: `<!-- カスタムバリデーション -->
<form id="myForm">
  <label>
    パスワード:
    <input type="password" id="password" required>
  </label>
  <label>
    パスワード確認:
    <input type="password" id="confirmPassword" required>
  </label>
  <button type="submit">登録</button>
</form>

<script>
const password = document.getElementById("password");
const confirm = document.getElementById("confirmPassword");

confirm.addEventListener("input", () => {
  if (password.value !== confirm.value) {
    confirm.setCustomValidity("パスワードが一致しません");
  } else {
    confirm.setCustomValidity(""); // エラーをクリア
  }
});
</script>

<!-- CSS での表示制御 -->
<style>
/* バリデーション状態のスタイル */
input:valid {
  border-color: green;
}
input:invalid {
  border-color: red;
}
/* ユーザー操作後にのみ表示（CSS4） */
input:user-invalid {
  border-color: red;
  outline: 2px solid red;
}
</style>

<!-- novalidate でHTML5バリデーションを無効化 -->
<!-- （JS で独自バリデーションする場合） -->
<form novalidate>
  <input type="email" required>
  <button type="submit">送信</button>
</form>

<!-- formnovalidate（特定のボタンのみ無効化） -->
<button type="submit">送信（バリデーションあり）</button>
<button type="submit" formnovalidate>下書き保存</button>`,
      },
    ],
  },

  // ===== メディア =====
  {
    id: "images",
    title: "画像と図表",
    category: "media",
    description:
      "img 要素、picture による最適化、figure/figcaption、レスポンシブ画像の実装",
    sections: [
      {
        title: "img 要素の基本",
        content:
          "img 要素は画像を表示する空要素です。src 属性で画像のパスを指定し、alt 属性で代替テキストを必ず記述します。alt テキストはアクセシビリティ（スクリーンリーダー）とSEOの両方で重要です。装飾的な画像には空の alt=\"\" を指定します。width と height を指定するとレイアウトシフトを防げます。",
        code: `<!-- 基本的な画像 -->
<img src="photo.jpg" alt="東京タワーの夜景" width="800" height="600">

<!-- alt テキストのガイドライン -->
<!-- ✅ 内容を説明する -->
<img src="chart.png" alt="2024年の月別売上グラフ">

<!-- ✅ 装飾的な画像は空の alt -->
<img src="decorative-line.svg" alt="">

<!-- ✅ リンク内の画像はリンク先を説明 -->
<a href="/home">
  <img src="logo.svg" alt="ホームに戻る">
</a>

<!-- ❌ 不適切な alt -->
<img src="photo.jpg" alt="画像">       <!-- 情報がない -->
<img src="photo.jpg" alt="photo.jpg">  <!-- ファイル名 -->

<!-- loading 属性（遅延読み込み） -->
<img src="photo.jpg" alt="写真"
  loading="lazy"      <!-- スクロールで表示範囲に入った時に読み込み -->
  decoding="async">   <!-- 非同期デコード -->

<!-- ファーストビューの画像は eager（デフォルト） -->
<img src="hero.jpg" alt="ヒーロー画像"
  loading="eager"
  fetchpriority="high">  <!-- 優先読み込み -->`,
      },
      {
        title: "picture と srcset（レスポンシブ画像）",
        content:
          "picture 要素は表示条件に応じて異なる画像を提供できます。source 要素で条件（メディアクエリ、画像形式）を指定し、最適な画像をブラウザが選択します。srcset と sizes 属性でレスポンシブな画像サイズの切り替えも可能です。WebP や AVIF などの次世代フォーマットへのフォールバックにも使えます。",
        code: `<!-- picture 要素（アートディレクション） -->
<picture>
  <!-- 大画面向け -->
  <source media="(min-width: 1200px)"
    srcset="hero-large.jpg">
  <!-- 中画面向け -->
  <source media="(min-width: 768px)"
    srcset="hero-medium.jpg">
  <!-- フォールバック（小画面 / 非対応ブラウザ） -->
  <img src="hero-small.jpg" alt="ヒーロー画像">
</picture>

<!-- 画像フォーマットの出し分け -->
<picture>
  <source srcset="photo.avif" type="image/avif">
  <source srcset="photo.webp" type="image/webp">
  <img src="photo.jpg" alt="写真">
</picture>

<!-- srcset + sizes（解像度の切り替え） -->
<img
  src="photo-400.jpg"
  srcset="
    photo-400.jpg 400w,
    photo-800.jpg 800w,
    photo-1200.jpg 1200w
  "
  sizes="
    (max-width: 600px) 100vw,
    (max-width: 1200px) 50vw,
    33vw
  "
  alt="写真の説明">

<!-- 高解像度ディスプレイ対応 -->
<img
  src="logo.png"
  srcset="logo.png 1x, logo@2x.png 2x, logo@3x.png 3x"
  alt="ロゴ">`,
      },
      {
        title: "figure と画像マップ",
        content:
          "figure 要素は画像やコードブロックなどの自己完結したコンテンツを囲み、figcaption でキャプションを付けます。SVG はインラインで埋め込むことも、img や object で表示することもできます。画像マップ（map/area）はクリッカブルな領域を画像上に作成する機能です。",
        code: `<!-- figure + figcaption -->
<figure>
  <img src="chart.png" alt="売上推移グラフ">
  <figcaption>図1: 2024年の月別売上推移</figcaption>
</figure>

<!-- コードブロックの figure -->
<figure>
  <pre><code>console.log("Hello!");</code></pre>
  <figcaption>リスト1: Hello World プログラム</figcaption>
</figure>

<!-- 複数の画像を figure でグループ化 -->
<figure>
  <img src="before.jpg" alt="改修前">
  <img src="after.jpg" alt="改修後">
  <figcaption>図2: リニューアル前後の比較</figcaption>
</figure>

<!-- インライン SVG -->
<svg width="100" height="100" viewBox="0 0 100 100"
  role="img" aria-label="赤い丸">
  <circle cx="50" cy="50" r="40" fill="red" />
</svg>

<!-- SVG を img で表示 -->
<img src="icon.svg" alt="アイコン" width="24" height="24">

<!-- 画像マップ -->
<img src="map.png" alt="フロアマップ" usemap="#floor-map">
<map name="floor-map">
  <area shape="rect" coords="0,0,100,100"
    href="/room-a" alt="会議室A">
  <area shape="circle" coords="200,150,50"
    href="/room-b" alt="会議室B">
</map>`,
      },
    ],
  },
  {
    id: "media-embed",
    title: "動画・音声・埋め込み",
    category: "media",
    description:
      "video、audio、iframe による外部コンテンツの埋め込みと最適化",
    sections: [
      {
        title: "video 要素",
        content:
          "video 要素は動画を埋め込みます。controls 属性でプレイヤーのUIを表示し、source 要素で複数のフォーマットを提供できます。autoplay、loop、muted、poster などの属性で動画の挙動を制御します。自動再生は muted と組み合わせないとブラウザにブロックされます。",
        code: `<!-- 基本的な動画 -->
<video controls width="640" height="360">
  <source src="video.mp4" type="video/mp4">
  <source src="video.webm" type="video/webm">
  <p>お使いのブラウザは動画をサポートしていません。</p>
</video>

<!-- 属性の活用 -->
<video
  controls           <!-- 再生コントロールを表示 -->
  autoplay           <!-- 自動再生（muted 必須） -->
  muted              <!-- ミュート状態で開始 -->
  loop               <!-- ループ再生 -->
  playsinline         <!-- iOS でインライン再生 -->
  poster="thumb.jpg"  <!-- 再生前のサムネイル -->
  preload="metadata"  <!-- メタデータのみ先読み -->
  width="640"
  height="360">
  <source src="video.mp4" type="video/mp4">
</video>

<!-- 字幕・キャプション -->
<video controls>
  <source src="video.mp4" type="video/mp4">
  <track kind="subtitles" src="subs-ja.vtt"
    srclang="ja" label="日本語" default>
  <track kind="subtitles" src="subs-en.vtt"
    srclang="en" label="English">
</video>

<!-- preload の値 -->
<!-- none: 事前読み込みなし -->
<!-- metadata: メタデータのみ（推奨） -->
<!-- auto: 動画全体を事前読み込み -->`,
      },
      {
        title: "audio 要素",
        content:
          "audio 要素は音声ファイルを埋め込みます。video と同様に controls、autoplay、loop、muted などの属性が使えます。複数のフォーマット（MP3、OGG、WAV）を source で指定してブラウザ互換性を確保します。Web Audio API を使えばプログラムで音声を制御できます。",
        code: `<!-- 基本的な音声プレイヤー -->
<audio controls>
  <source src="audio.mp3" type="audio/mpeg">
  <source src="audio.ogg" type="audio/ogg">
  <p>お使いのブラウザは音声をサポートしていません。</p>
</audio>

<!-- 属性の活用 -->
<audio
  controls
  autoplay           <!-- 自動再生 -->
  muted              <!-- ミュート -->
  loop               <!-- ループ -->
  preload="metadata"  <!-- メタデータのみ先読み -->
>
  <source src="bgm.mp3" type="audio/mpeg">
</audio>

<!-- 対応フォーマット -->
<!-- MP3 (audio/mpeg): 最も広くサポート -->
<!-- OGG (audio/ogg): オープンフォーマット -->
<!-- WAV (audio/wav): 非圧縮、高品質 -->
<!-- AAC (audio/aac): Apple 推奨 -->
<!-- WebM (audio/webm): Google 推奨 -->

<!-- figure で音声にキャプション -->
<figure>
  <figcaption>第1回ポッドキャスト:</figcaption>
  <audio controls src="podcast-01.mp3"></audio>
</figure>

<!-- JavaScript での音声制御 -->
<audio id="alert-sound" src="alert.mp3" preload="auto"></audio>
<script>
const sound = document.getElementById("alert-sound");
// sound.play();   // 再生
// sound.pause();  // 一時停止
// sound.volume = 0.5; // 音量（0〜1）
</script>`,
      },
      {
        title: "iframe と埋め込みコンテンツ",
        content:
          "iframe は外部のWebページやサービス（YouTube、Google Maps、Twitter など）を埋め込みます。sandbox 属性でセキュリティ制限を設定し、loading=\"lazy\" で遅延読み込みができます。allow 属性で権限（カメラ、マイク、全画面）を制御します。",
        code: `<!-- YouTube の埋め込み -->
<iframe
  width="560" height="315"
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="動画のタイトル"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write;
         encrypted-media; gyroscope; picture-in-picture"
  allowfullscreen
  loading="lazy">
</iframe>

<!-- Google Maps の埋め込み -->
<iframe
  src="https://www.google.com/maps/embed?pb=..."
  width="600" height="450"
  style="border:0;"
  allowfullscreen
  loading="lazy"
  referrerpolicy="no-referrer-when-downgrade"
  title="地図">
</iframe>

<!-- sandbox でセキュリティ制限 -->
<iframe
  src="https://example.com"
  sandbox="allow-scripts allow-same-origin"
  title="外部コンテンツ">
  <!-- sandbox の値:
    allow-scripts: JS の実行を許可
    allow-same-origin: 同一オリジン扱い
    allow-forms: フォーム送信を許可
    allow-popups: ポップアップを許可
    （値なし = 全て制限）
  -->
</iframe>

<!-- レスポンシブ iframe（アスペクト比維持） -->
<div style="aspect-ratio: 16/9;">
  <iframe
    src="https://www.youtube.com/embed/VIDEO_ID"
    style="width: 100%; height: 100%;"
    title="動画">
  </iframe>
</div>`,
      },
    ],
  },

  // ===== セマンティクス =====
  {
    id: "semantic-html",
    title: "セマンティックHTML",
    category: "semantics",
    description:
      "header、nav、main、article、section、aside、footer の意味と使い分け",
    sections: [
      {
        title: "セマンティック要素とは",
        content:
          "セマンティックHTML は要素の意味（セマンティクス）に基づいてマークアップする手法です。div や span の代わりに header、nav、main、article、section、aside、footer などの意味を持つ要素を使います。SEO、アクセシビリティ、コードの可読性が向上し、スクリーンリーダーやクローラーが文書構造を正しく理解できます。",
        code: `<!-- セマンティックなページ構造 -->
<body>
  <header>
    <nav><!-- ナビゲーション --></nav>
  </header>

  <main>
    <article>
      <h1>記事タイトル</h1>
      <section>
        <h2>セクション1</h2>
        <p>内容...</p>
      </section>
      <section>
        <h2>セクション2</h2>
        <p>内容...</p>
      </section>
    </article>

    <aside>
      <!-- サイドバー -->
    </aside>
  </main>

  <footer>
    <!-- フッター -->
  </footer>
</body>

<!-- ❌ div だけの構造（意味がない） -->
<div class="header">
  <div class="nav">...</div>
</div>
<div class="main">
  <div class="article">...</div>
</div>

<!-- ✅ セマンティック要素を使用 -->
<header>
  <nav>...</nav>
</header>
<main>
  <article>...</article>
</main>`,
      },
      {
        title: "各セマンティック要素の使い分け",
        content:
          "header はセクションの導入部、nav はナビゲーション、main はページの主要コンテンツ（ページに1つ）、article は自己完結した内容（ブログ記事、ニュース）、section は汎用的なセクション分け、aside は補足情報（サイドバー、関連リンク）、footer はセクションの末尾情報です。",
        code: `<!-- header: セクションの導入 -->
<header>
  <h1>サイト名</h1>
  <nav>
    <a href="/">ホーム</a>
    <a href="/about">About</a>
  </nav>
</header>

<!-- main: ページの主要コンテンツ（1つだけ） -->
<main>
  <!-- article: 自己完結したコンテンツ -->
  <article>
    <header>
      <h2>ブログ記事タイトル</h2>
      <time datetime="2024-01-15">2024年1月15日</time>
    </header>

    <!-- section: 記事内のセクション -->
    <section>
      <h3>はじめに</h3>
      <p>...</p>
    </section>

    <footer>
      <p>著者: 田中太郎</p>
    </footer>
  </article>

  <!-- aside: 補足情報 -->
  <aside>
    <h2>関連記事</h2>
    <ul>
      <li><a href="/post/1">記事1</a></li>
      <li><a href="/post/2">記事2</a></li>
    </ul>
  </aside>
</main>

<!-- footer: ページのフッター -->
<footer>
  <p>&copy; 2024 サイト名</p>
  <nav><!-- フッターナビ --></nav>
</footer>`,
      },
      {
        title: "その他のセマンティック要素",
        content:
          "details/summary は折りたたみ可能なコンテンツ、dialog はモーダルダイアログ、figure/figcaption は図表とキャプション、time は日時、mark はハイライト、progress はプログレスバーを表現します。これらを適切に使うことで、JavaScript なしでもインタラクティブな要素を実現できます。",
        code: `<!-- details / summary（折りたたみ） -->
<details>
  <summary>よくある質問</summary>
  <p>ここに回答が入ります。</p>
</details>

<details open> <!-- 初期状態で開く -->
  <summary>詳細情報</summary>
  <p>展開された状態で表示</p>
</details>

<!-- dialog（モーダルダイアログ） -->
<dialog id="myDialog">
  <h2>確認</h2>
  <p>本当に削除しますか？</p>
  <form method="dialog">
    <button value="cancel">キャンセル</button>
    <button value="confirm">削除</button>
  </form>
</dialog>
<button onclick="myDialog.showModal()">削除</button>

<!-- progress / meter -->
<label>進捗: <progress value="70" max="100">70%</progress></label>
<label>容量: <meter value="0.7" min="0" max="1"
  low="0.3" high="0.8" optimum="0.5">70%</meter></label>

<!-- time 要素 -->
<p>公開日: <time datetime="2024-01-15T09:00:00+09:00">
  2024年1月15日 9:00
</time></p>

<!-- search 要素（HTML5.2） -->
<search>
  <form action="/search">
    <input type="search" name="q" placeholder="検索...">
    <button type="submit">検索</button>
  </form>
</search>`,
      },
    ],
  },
  {
    id: "accessibility",
    title: "アクセシビリティ",
    category: "semantics",
    description:
      "ARIA属性、role、alt テキスト、WAI-ARIA、スクリーンリーダー対応の実践",
    sections: [
      {
        title: "アクセシビリティの基本原則",
        content:
          "Webアクセシビリティは障害の有無に関わらず全てのユーザーがWebコンテンツを利用できるようにすることです。WCAG（Web Content Accessibility Guidelines）が国際基準で、知覚可能・操作可能・理解可能・堅牢の4原則があります。セマンティックHTMLを正しく使うことが最も効果的なアクセシビリティ対策です。",
        code: `<!-- ✅ アクセシブルな基本構造 -->
<html lang="ja">  <!-- ページの言語を指定 -->

<!-- 画像の代替テキスト -->
<img src="photo.jpg" alt="桜が満開の上野公園">
<img src="decoration.svg" alt="">  <!-- 装飾画像 -->

<!-- リンクの説明的なテキスト -->
<!-- ❌ -->
<a href="/report">こちら</a>をクリック
<!-- ✅ -->
<a href="/report">2024年度の年次報告書を見る</a>

<!-- フォームのラベル -->
<!-- ❌ ラベルなし -->
<input type="text" placeholder="名前">
<!-- ✅ label で関連付け -->
<label for="name">名前:</label>
<input type="text" id="name">

<!-- 見出し階層を守る -->
<h1>メインタイトル</h1>
<h2>セクション</h2>
<h3>サブセクション</h3>

<!-- スキップリンク -->
<a href="#main-content" class="sr-only focus:not-sr-only">
  メインコンテンツにスキップ
</a>
<nav><!-- ナビゲーション --></nav>
<main id="main-content">
  <!-- メインコンテンツ -->
</main>`,
      },
      {
        title: "ARIA 属性",
        content:
          "ARIA（Accessible Rich Internet Applications）属性はHTMLの意味を補完し、動的なWebアプリのアクセシビリティを向上させます。aria-label、aria-describedby、aria-hidden、aria-live などが頻繁に使われます。ただし、ネイティブのHTML要素で表現できる場合はARIAを使わないのが原則です（No ARIA is better than bad ARIA）。",
        code: `<!-- aria-label（要素にラベルを付与） -->
<button aria-label="閉じる">✕</button>
<nav aria-label="メインナビゲーション">...</nav>
<nav aria-label="フッターナビゲーション">...</nav>

<!-- aria-describedby（詳細説明の関連付け） -->
<input type="password" aria-describedby="pwd-help">
<p id="pwd-help">8文字以上、英数字を含めてください</p>

<!-- aria-hidden（スクリーンリーダーから隠す） -->
<button>
  <span aria-hidden="true">🗑️</span>
  削除
</button>

<!-- aria-live（動的に変わるコンテンツの通知） -->
<div aria-live="polite" aria-atomic="true">
  <!-- 内容が変わるとスクリーンリーダーに通知 -->
  検索結果: 42件
</div>

<!-- aria-expanded（展開状態） -->
<button aria-expanded="false" aria-controls="menu">
  メニュー
</button>
<ul id="menu" hidden>
  <li>項目1</li>
</ul>

<!-- aria-current（現在の項目） -->
<nav>
  <a href="/" aria-current="page">ホーム</a>
  <a href="/about">About</a>
</nav>

<!-- role（意味の付与 — ネイティブ要素を優先） -->
<!-- ❌ <div role="button"> より ✅ <button> を使う -->
<div role="alert">エラーが発生しました</div>
<div role="status">保存しました</div>`,
      },
      {
        title: "キーボード操作とフォーカス管理",
        content:
          "全ての操作がキーボードで行えることはアクセシビリティの基本要件です。tabindex でフォーカス順序を制御し、フォーカスの可視性を確保します。モーダルダイアログではフォーカストラップ（フォーカスをダイアログ内に閉じ込める）が必要です。カスタムコンポーネントにはキーボードイベントの処理を実装します。",
        code: `<!-- tabindex -->
<!-- tabindex="0": 自然な順序でフォーカス可能に -->
<div tabindex="0" role="button">カスタムボタン</div>

<!-- tabindex="-1": JS でのみフォーカス可能（Tab順には含まれない） -->
<div id="error-message" tabindex="-1">
  エラーが発生しました
</div>

<!-- ❌ tabindex="1" 以上は使わない（順序が壊れる） -->

<!-- フォーカスの可視性 -->
<style>
/* ❌ フォーカスリングを消さない */
*:focus { outline: none; }

/* ✅ カスタムフォーカススタイル */
*:focus-visible {
  outline: 2px solid #4A90D9;
  outline-offset: 2px;
}
</style>

<!-- キーボード操作の実装 -->
<div role="button" tabindex="0"
  onclick="handleClick()"
  onkeydown="if(event.key==='Enter'||event.key===' ')handleClick()">
  カスタムボタン
</div>

<!-- inert 属性（操作不能にする） -->
<main inert>
  <!-- モーダルが開いている間、背景を操作不能に -->
</main>
<dialog open>
  <p>モーダルコンテンツ</p>
</dialog>

<!-- 視覚的に隠すが読み上げは有効 -->
<span class="sr-only">スクリーンリーダー専用テキスト</span>
<!-- .sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0,0,0,0); border: 0;
} -->`,
      },
    ],
  },

  // ===== head・メタデータ =====
  {
    id: "head-meta",
    title: "headとメタデータ",
    category: "head-seo",
    description:
      "meta タグ、link 要素、title、OGP、favicon の設定方法を理解する",
    sections: [
      {
        title: "meta タグの基本",
        content:
          "head 要素内の meta タグはページのメタ情報を提供します。charset で文字エンコーディング、viewport でレスポンシブ設計、description で検索結果の説明文を指定します。robots でクローラーの動作を制御し、theme-color でブラウザのテーマカラーを設定できます。",
        code: `<head>
  <!-- 文字エンコーディング（最初に記述推奨） -->
  <meta charset="UTF-8">

  <!-- レスポンシブ設計に必須 -->
  <meta name="viewport"
    content="width=device-width, initial-scale=1.0">

  <!-- ページタイトル -->
  <title>ページタイトル | サイト名</title>

  <!-- ページの説明（検索結果に表示） -->
  <meta name="description"
    content="このページの説明文。120〜160文字が推奨。">

  <!-- 検索エンジンのクローラー制御 -->
  <meta name="robots" content="index, follow">
  <!-- noindex: インデックスしない -->
  <!-- nofollow: リンクを追わない -->

  <!-- ブラウザのテーマカラー -->
  <meta name="theme-color" content="#4A90D9">
  <meta name="theme-color" content="#1a1a1a"
    media="(prefers-color-scheme: dark)">

  <!-- IE互換モード（レガシー対応） -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <!-- Content Security Policy -->
  <meta http-equiv="Content-Security-Policy"
    content="default-src 'self'">

  <!-- 作成者 -->
  <meta name="author" content="著者名">
</head>`,
      },
      {
        title: "OGP（Open Graph Protocol）",
        content:
          "OGP はSNSでページを共有した際の表示を制御するメタデータです。Facebook、Twitter（X）、LINE、Slack などが対応しています。og:title、og:description、og:image、og:url が基本の4属性です。Twitter は独自の twitter:card メタタグも使います。",
        code: `<!-- OGP 基本タグ -->
<meta property="og:title" content="ページタイトル">
<meta property="og:description" content="ページの説明文">
<meta property="og:image"
  content="https://example.com/ogp-image.jpg">
<meta property="og:url" content="https://example.com/page">
<meta property="og:type" content="website">
<!-- type: website, article, product, profile -->
<meta property="og:site_name" content="サイト名">
<meta property="og:locale" content="ja_JP">

<!-- OGP 画像の推奨サイズ -->
<!-- 1200 x 630 px（1.91:1 の比率） -->

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<!-- summary: 小さいカード -->
<!-- summary_large_image: 大きい画像カード -->
<meta name="twitter:site" content="@username">
<meta name="twitter:title" content="ページタイトル">
<meta name="twitter:description" content="説明文">
<meta name="twitter:image"
  content="https://example.com/twitter-image.jpg">

<!-- 記事向けの追加情報 -->
<meta property="article:published_time"
  content="2024-01-15T09:00:00+09:00">
<meta property="article:author" content="著者名">
<meta property="article:tag" content="JavaScript">`,
      },
      {
        title: "link 要素と favicon",
        content:
          "link 要素はページと外部リソースの関係を定義します。スタイルシートの読み込み、favicon の設定、canonical URL の指定、プリロードなどに使います。favicon は複数のサイズとフォーマットを用意してさまざまなデバイスに対応するのが推奨です。",
        code: `<!-- スタイルシートの読み込み -->
<link rel="stylesheet" href="/css/style.css">
<link rel="stylesheet" href="/css/print.css" media="print">

<!-- favicon の設定 -->
<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" href="/icon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<!-- apple-touch-icon: 180x180px 推奨 -->

<!-- Web マニフェスト（PWA） -->
<link rel="manifest" href="/manifest.json">

<!-- canonical URL（重複コンテンツの正規化） -->
<link rel="canonical" href="https://example.com/page">

<!-- 前後のページ（ページネーション） -->
<link rel="prev" href="/blog?page=1">
<link rel="next" href="/blog?page=3">

<!-- 代替言語ページ -->
<link rel="alternate" hreflang="en"
  href="https://example.com/en/page">
<link rel="alternate" hreflang="ja"
  href="https://example.com/ja/page">

<!-- RSS/Atom フィード -->
<link rel="alternate" type="application/rss+xml"
  title="RSS" href="/feed.xml">

<!-- プリロード（重要リソースの先読み） -->
<link rel="preload" href="/fonts/main.woff2"
  as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/hero.jpg" as="image">

<!-- DNS プリフェッチ -->
<link rel="dns-prefetch" href="https://api.example.com">
<link rel="preconnect" href="https://cdn.example.com">`,
      },
    ],
  },
  {
    id: "seo",
    title: "SEOとHTML",
    category: "head-seo",
    description:
      "構造化データ、見出し階層、canonical、robots など SEO に重要な HTML 技法",
    sections: [
      {
        title: "SEOの基本とHTML構造",
        content:
          "検索エンジン最適化（SEO）において、HTMLの構造は非常に重要です。適切な title、description、見出し階層（h1〜h6）、セマンティック要素の使用が基本です。ページの読み込み速度、モバイル対応、アクセシビリティもランキング要因となります。",
        code: `<!-- SEO に重要な head の設定 -->
<head>
  <!-- タイトル: 30〜60文字、キーワードを含む -->
  <title>JavaScript入門ガイド | プログラミング学習サイト</title>

  <!-- 説明文: 120〜160文字、行動を促す -->
  <meta name="description"
    content="JavaScript の基礎から応用まで、
    初心者向けにコード例付きで解説。
    変数、関数、DOM操作をステップバイステップで学習。">

  <!-- canonical: 正規URLを指定 -->
  <link rel="canonical"
    href="https://example.com/javascript-guide">

  <!-- robots -->
  <meta name="robots" content="index, follow">
  <!-- noindex: 検索結果に表示しない -->
  <!-- nofollow: リンクを追わない -->
</head>

<!-- 見出し階層のベストプラクティス -->
<body>
  <h1>JavaScriptの完全ガイド</h1>       <!-- ページに1つ -->
  <h2>1. 基礎文法</h2>                   <!-- 主要セクション -->
  <h3>1.1 変数の宣言</h3>                 <!-- サブセクション -->
  <h3>1.2 データ型</h3>
  <h2>2. 関数</h2>
  <h3>2.1 関数宣言</h3>

  <!-- ❌ 見出しを装飾目的で使わない -->
  <h3>小さく表示したいだけのテキスト</h3>
  <!-- ✅ CSS でスタイルを調整 -->
  <p class="text-sm">小さく表示したいテキスト</p>
</body>`,
      },
      {
        title: "構造化データ（JSON-LD）",
        content:
          "構造化データは検索エンジンにページの内容を機械可読な形式で伝える仕組みです。JSON-LD 形式が推奨され、Schema.org の語彙を使います。リッチスニペット（評価の星、FAQ、パンくず、レシピなど）として検索結果に表示され、クリック率の向上が期待できます。",
        code: `<!-- JSON-LD 構造化データ -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "JavaScript入門ガイド",
  "author": {
    "@type": "Person",
    "name": "田中太郎"
  },
  "datePublished": "2024-01-15",
  "dateModified": "2024-06-01",
  "image": "https://example.com/js-guide.jpg",
  "publisher": {
    "@type": "Organization",
    "name": "プログラミング学習サイト",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  }
}
</script>

<!-- FAQ 構造化データ -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "JavaScriptとは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "JavaScriptはWebブラウザで動作する..."
      }
    }
  ]
}
</script>

<!-- パンくずリスト構造化データ -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1,
      "name": "ホーム", "item": "https://example.com/" },
    { "@type": "ListItem", "position": 2,
      "name": "JavaScript", "item": "https://example.com/js" }
  ]
}
</script>`,
      },
      {
        title: "パフォーマンスとSEO",
        content:
          "Core Web Vitals（LCP、INP、CLS）は Google のランキング要因です。HTMLレベルでの最適化として、画像の遅延読み込み、リソースの先読み、クリティカルCSSのインライン化、不要なリソースのブロック防止が重要です。ページの表示速度はユーザー体験とSEOの両方に直結します。",
        code: `<!-- Core Web Vitals 最適化 -->

<!-- LCP（Largest Contentful Paint）改善 -->
<!-- ヒーロー画像を優先読み込み -->
<link rel="preload" as="image" href="/hero.jpg">
<img src="/hero.jpg" alt="..." fetchpriority="high">

<!-- CLS（Cumulative Layout Shift）防止 -->
<!-- 画像に width/height を必ず指定 -->
<img src="photo.jpg" alt="..." width="800" height="600">

<!-- フォントの表示最適化 -->
<link rel="preload" href="/font.woff2"
  as="font" type="font/woff2" crossorigin>
<style>
@font-face {
  font-family: 'MyFont';
  src: url('/font.woff2') format('woff2');
  font-display: swap; /* テキストを先に表示 */
}
</style>

<!-- スクリプトの最適化 -->
<script src="app.js" defer></script>   <!-- DOMパース後に実行 -->
<script src="analytics.js" async></script> <!-- 非同期で実行 -->
<!-- defer: DOMパース完了後、順序を保って実行 -->
<!-- async: ダウンロード完了次第実行（順序保証なし） -->

<!-- クリティカルCSSのインライン化 -->
<style>
  /* ファーストビューに必要な最小限のCSS */
  body { margin: 0; font-family: sans-serif; }
  .hero { height: 100vh; }
</style>
<!-- 残りのCSSは非同期で読み込み -->
<link rel="preload" href="/style.css" as="style"
  onload="this.rel='stylesheet'">`,
      },
    ],
  },

  // ===== モダンHTML =====
  {
    id: "html5-apis",
    title: "HTML5 API",
    category: "modern",
    description:
      "Canvas、Geolocation、Drag & Drop など HTML5 で追加された API",
    sections: [
      {
        title: "Canvas API",
        content:
          "Canvas API は canvas 要素上にグラフィックを描画する JavaScript API です。2Dコンテキストで図形、テキスト、画像の描画が可能です。ゲーム、データ可視化、画像処理などに使われます。WebGL を使えば3Dグラフィックも描画できます。",
        code: `<!-- Canvas 要素 -->
<canvas id="myCanvas" width="400" height="300">
  お使いのブラウザは Canvas をサポートしていません。
</canvas>

<script>
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// 矩形の描画
ctx.fillStyle = "#4A90D9";
ctx.fillRect(10, 10, 150, 100);  // 塗りつぶし
ctx.strokeRect(10, 10, 150, 100); // 枠線

// 円の描画
ctx.beginPath();
ctx.arc(250, 60, 40, 0, Math.PI * 2); // x, y, 半径, 開始角, 終了角
ctx.fillStyle = "#E74C3C";
ctx.fill();

// 線の描画
ctx.beginPath();
ctx.moveTo(10, 150);
ctx.lineTo(200, 150);
ctx.lineTo(100, 250);
ctx.closePath();
ctx.strokeStyle = "#2ECC71";
ctx.lineWidth = 3;
ctx.stroke();

// テキストの描画
ctx.font = "24px sans-serif";
ctx.fillStyle = "#333";
ctx.fillText("Hello Canvas!", 10, 290);

// 画像の描画
const img = new Image();
img.onload = () => ctx.drawImage(img, 250, 150, 100, 100);
img.src = "photo.jpg";
</script>`,
      },
      {
        title: "Geolocation API と Drag & Drop",
        content:
          "Geolocation API はユーザーの現在位置（緯度・経度）を取得できます。ユーザーの許可が必要です。Drag & Drop API は HTML 要素のドラッグ＆ドロップ操作を実装できます。draggable 属性と各種ドラッグイベントを組み合わせて使います。",
        code: `<!-- Geolocation API -->
<button onclick="getLocation()">現在位置を取得</button>
<p id="location"></p>

<script>
function getLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation がサポートされていません");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      document.getElementById("location").textContent =
        \`緯度: \${latitude}, 経度: \${longitude}\`;
    },
    (error) => {
      console.error("位置情報エラー:", error.message);
    },
    { enableHighAccuracy: true, timeout: 5000 }
  );
}
</script>

<!-- Drag & Drop -->
<div id="drag-item" draggable="true"
  style="width:100px; height:100px; background:#4A90D9; cursor:grab;">
  ドラッグ
</div>
<div id="drop-zone"
  style="width:200px; height:200px; border:2px dashed #ccc;">
  ドロップゾーン
</div>

<script>
const item = document.getElementById("drag-item");
const zone = document.getElementById("drop-zone");

item.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", e.target.id);
});

zone.addEventListener("dragover", (e) => {
  e.preventDefault(); // ドロップを許可
  zone.style.borderColor = "#4A90D9";
});

zone.addEventListener("drop", (e) => {
  e.preventDefault();
  const id = e.dataTransfer.getData("text/plain");
  zone.appendChild(document.getElementById(id));
});
</script>`,
      },
      {
        title: "Web Components",
        content:
          "Web Components はカスタムHTML要素を作成する標準技術で、Custom Elements、Shadow DOM、HTML Template の3つの仕様で構成されます。フレームワークに依存しない再利用可能なコンポーネントを作成でき、既存のHTMLと同じように使えます。",
        code: `<!-- Custom Element の定義 -->
<script>
class UserCard extends HTMLElement {
  constructor() {
    super();
    // Shadow DOM を作成（スタイルのカプセル化）
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = \`
      <style>
        .card {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 16px;
          font-family: sans-serif;
        }
        .name { font-weight: bold; font-size: 1.2em; }
        .role { color: #666; }
      </style>
      <div class="card">
        <p class="name">\${this.getAttribute("name")}</p>
        <p class="role">\${this.getAttribute("role")}</p>
        <slot></slot>
      </div>
    \`;
  }
}
// カスタム要素を登録
customElements.define("user-card", UserCard);
</script>

<!-- カスタム要素の使用（通常のHTMLと同様） -->
<user-card name="Alice" role="エンジニア">
  <p>追加情報をここに記述</p>
</user-card>

<!-- HTML Template -->
<template id="card-template">
  <div class="card">
    <h3></h3>
    <p></p>
  </div>
</template>

<script>
const template = document.getElementById("card-template");
const clone = template.content.cloneNode(true);
clone.querySelector("h3").textContent = "タイトル";
clone.querySelector("p").textContent = "内容";
document.body.appendChild(clone);
</script>`,
      },
    ],
  },
  {
    id: "responsive-html",
    title: "レスポンシブHTML",
    category: "modern",
    description:
      "viewport の設定、picture/source、srcset、メディアクエリとの連携",
    sections: [
      {
        title: "viewport とレスポンシブの基本",
        content:
          "レスポンシブWebデザインはあらゆる画面サイズに対応するための手法です。viewport meta タグが基本で、CSS のメディアクエリと組み合わせてレイアウトを切り替えます。HTMLレベルでは適切な要素の選択、相対単位の使用、画像の最適化が重要です。",
        code: `<!-- viewport の設定（レスポンシブに必須） -->
<meta name="viewport"
  content="width=device-width, initial-scale=1.0">

<!-- width=device-width: デバイスの幅に合わせる -->
<!-- initial-scale=1.0: 初期ズーム倍率 -->

<!-- ❌ ユーザーのズームを無効にしない -->
<meta name="viewport"
  content="width=device-width, maximum-scale=1.0,
  user-scalable=no">
<!-- ✅ ズームを許可する（アクセシビリティ） -->
<meta name="viewport"
  content="width=device-width, initial-scale=1.0">

<!-- レスポンシブ画像 -->
<img src="photo.jpg" alt="写真"
  style="max-width: 100%; height: auto;">

<!-- レスポンシブテーブル -->
<div style="overflow-x: auto;">
  <table><!-- 幅の広いテーブル --></table>
</div>

<!-- レスポンシブ iframe -->
<div style="aspect-ratio: 16/9;">
  <iframe src="..." style="width: 100%; height: 100%;"></iframe>
</div>

<!-- メディアクエリ対応のスタイルシート -->
<link rel="stylesheet" href="mobile.css"
  media="(max-width: 768px)">
<link rel="stylesheet" href="desktop.css"
  media="(min-width: 769px)">
<link rel="stylesheet" href="print.css" media="print">`,
      },
      {
        title: "レスポンシブ画像の実践",
        content:
          "picture 要素と srcset/sizes 属性で、デバイスの画面サイズやピクセル密度に応じた最適な画像を配信できます。アートディレクション（画面サイズによる画像の切り替え）と解像度切り替えの2つのパターンがあります。WebP/AVIF フォーマットへのフォールバックも重要です。",
        code: `<!-- アートディレクション（構図を変える） -->
<picture>
  <!-- デスクトップ: 横長の全体写真 -->
  <source media="(min-width: 1024px)"
    srcset="hero-wide.jpg">
  <!-- タブレット: 中間サイズ -->
  <source media="(min-width: 768px)"
    srcset="hero-medium.jpg">
  <!-- モバイル: 縦長のクローズアップ -->
  <img src="hero-mobile.jpg" alt="ヒーロー画像">
</picture>

<!-- 解像度切り替え（同じ構図、異なるサイズ） -->
<img
  src="photo-400.jpg"
  srcset="
    photo-400.jpg 400w,
    photo-800.jpg 800w,
    photo-1200.jpg 1200w,
    photo-1600.jpg 1600w
  "
  sizes="
    (max-width: 600px) 100vw,
    (max-width: 1200px) 50vw,
    33vw
  "
  alt="写真"
  loading="lazy">

<!-- フォーマット + サイズの組み合わせ -->
<picture>
  <source
    type="image/avif"
    srcset="photo-400.avif 400w, photo-800.avif 800w"
    sizes="(max-width: 600px) 100vw, 50vw">
  <source
    type="image/webp"
    srcset="photo-400.webp 400w, photo-800.webp 800w"
    sizes="(max-width: 600px) 100vw, 50vw">
  <img
    src="photo-800.jpg"
    srcset="photo-400.jpg 400w, photo-800.jpg 800w"
    sizes="(max-width: 600px) 100vw, 50vw"
    alt="写真" loading="lazy">
</picture>`,
      },
      {
        title: "モバイルフレンドリーなHTML",
        content:
          "モバイルフレンドリーなHTMLを作るには、タッチ操作に適したサイズのボタン（44x44px 以上）、読みやすいフォントサイズ（16px 以上）、適切な入力タイプの指定が重要です。tel、email などの input type はモバイルで適切なキーボードを表示します。",
        code: `<!-- モバイル向け input type -->
<!-- 数字キーボード -->
<input type="tel" placeholder="電話番号">
<input type="number" inputmode="numeric" pattern="[0-9]*">

<!-- メールキーボード（@が表示される） -->
<input type="email" placeholder="メールアドレス">

<!-- URLキーボード -->
<input type="url" placeholder="https://...">

<!-- 検索キーボード -->
<input type="search" placeholder="検索...">

<!-- inputmode（キーボードのヒント） -->
<input type="text" inputmode="numeric">    <!-- 数字 -->
<input type="text" inputmode="decimal">    <!-- 小数点付き -->
<input type="text" inputmode="tel">        <!-- 電話番号 -->
<input type="text" inputmode="email">      <!-- メール -->
<input type="text" inputmode="url">        <!-- URL -->

<!-- autocomplete（自動入力） -->
<input type="text" autocomplete="name" placeholder="名前">
<input type="email" autocomplete="email">
<input type="tel" autocomplete="tel">
<input type="text" autocomplete="address-line1">
<input type="text" autocomplete="postal-code">

<!-- タッチターゲットの推奨サイズ -->
<style>
button, a, input[type="checkbox"] {
  min-width: 44px;   /* Apple推奨: 44px */
  min-height: 44px;  /* Google推奨: 48px */
}
</style>

<!-- iOS Safari でズーム防止（16px以上のフォント） -->
<style>
input, select, textarea {
  font-size: 16px; /* 16px未満だとiOSがズームする */
}
</style>`,
      },
    ],
  },
  {
    id: "performance",
    title: "パフォーマンス最適化",
    category: "modern",
    description:
      "lazy loading、preload/prefetch、defer/async、リソース最適化の実践",
    sections: [
      {
        title: "リソースの読み込み最適化",
        content:
          "Webページのパフォーマンスを改善するには、リソースの読み込み順序と方法の最適化が重要です。preload で重要リソースを先読みし、prefetch で次のページのリソースを事前取得します。dns-prefetch と preconnect で外部ドメインへの接続を高速化できます。",
        code: `<!-- preload: 現在のページで必要な重要リソースを先読み -->
<link rel="preload" href="/fonts/main.woff2"
  as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/css/critical.css" as="style">
<link rel="preload" href="/hero.jpg" as="image">
<link rel="preload" href="/app.js" as="script">

<!-- prefetch: 次のナビゲーションで必要なリソースを事前取得 -->
<link rel="prefetch" href="/next-page.html">
<link rel="prefetch" href="/data/next-page.json" as="fetch">

<!-- prerender: 次のページ全体を事前レンダリング -->
<link rel="prerender" href="/likely-next-page">

<!-- dns-prefetch: DNS 解決を先行 -->
<link rel="dns-prefetch" href="https://api.example.com">

<!-- preconnect: DNS + TCP + TLS を先行 -->
<link rel="preconnect" href="https://cdn.example.com">
<link rel="preconnect" href="https://fonts.googleapis.com"
  crossorigin>

<!-- modulepreload: ES Module を先読み -->
<link rel="modulepreload" href="/modules/utils.js">

<!-- リソースヒントの優先度 -->
<!-- 1. preconnect（接続先が確実な場合） -->
<!-- 2. dns-prefetch（接続先が不確実な場合） -->
<!-- 3. preload（現在のページで必要） -->
<!-- 4. prefetch（次のページで必要） -->`,
      },
      {
        title: "スクリプトと画像の最適化",
        content:
          "script 要素の defer/async 属性でJavaScriptの読み込みを非ブロック化します。画像の loading=\"lazy\" でビューポート外の画像を遅延読み込みし、fetchpriority で優先度を制御します。適切なフォーマット選択（WebP、AVIF）もパフォーマンスに大きく影響します。",
        code: `<!-- スクリプトの読み込み方法 -->
<!-- 通常: HTMLパースをブロック -->
<script src="app.js"></script>

<!-- defer: パース完了後に順序通り実行（推奨） -->
<script src="app.js" defer></script>

<!-- async: ダウンロード完了次第実行（順序保証なし） -->
<script src="analytics.js" async></script>

<!-- type="module": 自動的に defer -->
<script type="module" src="app.js"></script>

<!-- 使い分け -->
<!-- defer: アプリのメインJS、DOM操作するJS -->
<!-- async: 分析、広告、独立したスクリプト -->

<!-- 画像の遅延読み込み -->
<img src="photo.jpg" alt="写真" loading="lazy">
<!-- ファーストビューの画像は lazy にしない -->
<img src="hero.jpg" alt="ヒーロー" loading="eager"
  fetchpriority="high">

<!-- fetchpriority（リソースの優先度） -->
<img src="hero.jpg" fetchpriority="high">    <!-- 優先 -->
<img src="footer.jpg" fetchpriority="low">   <!-- 後回し -->
<link rel="preload" href="/font.woff2"
  as="font" fetchpriority="high">

<!-- iframe の遅延読み込み -->
<iframe src="https://youtube.com/embed/..."
  loading="lazy" title="動画">
</iframe>`,
      },
      {
        title: "HTML の軽量化とベストプラクティス",
        content:
          "パフォーマンスの良いHTMLを書くには、不要なDOMノードの削減、適切な要素の選択、インラインスタイル/スクリプトの最小化が重要です。HTML の minification、Gzip/Brotli 圧縮、CDN の活用も効果的です。Lighthouse でパフォーマンスを定期的に計測しましょう。",
        code: `<!-- ✅ DOM ノードを減らす -->
<!-- ❌ 不要なラッパー -->
<div class="wrapper">
  <div class="container">
    <div class="inner">
      <p>テキスト</p>
    </div>
  </div>
</div>

<!-- ✅ シンプルな構造 -->
<div class="container">
  <p>テキスト</p>
</div>

<!-- ✅ クリティカル CSS をインライン化 -->
<head>
  <style>
    /* ファーストビューに必要な最小限のCSS */
    * { margin: 0; box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; }
  </style>

  <!-- 残りのCSSは非同期読み込み -->
  <link rel="preload" href="/style.css" as="style"
    onload="this.rel='stylesheet'">
  <noscript>
    <link rel="stylesheet" href="/style.css">
  </noscript>
</head>

<!-- ✅ 効率的な画像配信 -->
<picture>
  <source type="image/avif" srcset="img.avif">
  <source type="image/webp" srcset="img.webp">
  <img src="img.jpg" alt="..."
    width="800" height="600"
    loading="lazy" decoding="async">
</picture>

<!-- パフォーマンス計測 -->
<!-- Lighthouse: Chrome DevTools > Lighthouse -->
<!-- Core Web Vitals:
  - LCP (Largest Contentful Paint): < 2.5s
  - INP (Interaction to Next Paint): < 200ms
  - CLS (Cumulative Layout Shift): < 0.1
-->`,
      },
    ],
  },
  {
    id: "best-practices",
    title: "HTMLベストプラクティス",
    category: "modern",
    description:
      "HTMLバリデーション、クロスブラウザ対応、コーディング規約と品質管理",
    sections: [
      {
        title: "HTML コーディング規約",
        content:
          "一貫性のあるHTMLを書くためのコーディング規約を守ることで、チーム開発での可読性と保守性が向上します。インデント（2スペースまたは4スペース）の統一、属性の順序、小文字の使用、ダブルクォートの使用が一般的な規約です。",
        code: `<!-- ✅ 推奨されるコーディングスタイル -->

<!-- 属性の推奨順序 -->
<input
  type="text"           <!-- 1. 種類・役割 -->
  id="username"          <!-- 2. ID -->
  class="form-input"    <!-- 3. クラス -->
  name="username"        <!-- 4. name -->
  required               <!-- 5. ブール属性 -->
  placeholder="入力..."  <!-- 6. その他の属性 -->
  aria-label="ユーザー名" <!-- 7. ARIA 属性 -->
  data-validate="true"   <!-- 8. data-* 属性 -->
>

<!-- ✅ 小文字を使用 -->
<div class="container">

<!-- ❌ 大文字 -->
<DIV CLASS="container">

<!-- ✅ ダブルクォートを使用 -->
<img src="photo.jpg" alt="写真">

<!-- ❌ クォートなし -->
<img src=photo.jpg alt=写真>

<!-- ✅ 空要素の閉じタグ -->
<br>      <!-- HTML5 -->
<br />    <!-- XHTML スタイル（どちらでも可） -->

<!-- ✅ インデントの統一（2スペース） -->
<ul>
  <li>
    <a href="/page">リンク</a>
  </li>
</ul>`,
      },
      {
        title: "HTMLバリデーションとデバッグ",
        content:
          "HTMLバリデーターでマークアップの正しさを検証することは品質管理の基本です。W3C の Nu HTML Checker がオンラインで使えます。ブラウザのDevToolsでDOM構造の確認、アクセシビリティ監査、パフォーマンス計測が可能です。",
        code: `<!-- W3C バリデーション -->
<!-- https://validator.w3.org/ でHTMLを検証 -->

<!-- よくあるバリデーションエラー -->

<!-- ❌ 閉じタグの忘れ -->
<div>
  <p>テキスト
</div>  <!-- </p> がない -->

<!-- ❌ 不正なネスト -->
<p>段落の中に<div>ブロック要素</div>は不可</p>

<!-- ❌ 重複した id -->
<div id="main">...</div>
<div id="main">...</div>  <!-- id は一意でなければならない -->

<!-- ❌ 非推奨の属性 -->
<body bgcolor="white">     <!-- CSS を使う -->
<table cellpadding="5">     <!-- CSS を使う -->
<font color="red">テキスト</font> <!-- CSS を使う -->

<!-- ✅ 正しい要素のネスト規則 -->
<!-- ブロック要素の中にインライン要素: ✅ -->
<div><span>OK</span></div>

<!-- インライン要素の中にブロック要素: ❌ -->
<span><div>NG</div></span>

<!-- a の中にインタラクティブ要素: ❌ -->
<a href="/"><button>NG</button></a>

<!-- 例外: a はフローコンテンツを含められる -->
<a href="/">
  <div>
    <h2>カードタイトル</h2>
    <p>説明文</p>
  </div>
</a>`,
      },
      {
        title: "クロスブラウザ対応とプログレッシブエンハンスメント",
        content:
          "異なるブラウザで一貫した表示を実現するには、標準に準拠したHTMLを書くことが基本です。プログレッシブエンハンスメントは基本的なコンテンツを全ブラウザで表示しつつ、対応ブラウザでは強化された機能を提供する考え方です。Can I Use で機能の対応状況を確認できます。",
        code: `<!-- プログレッシブエンハンスメント -->

<!-- 基本的なフォーム（全ブラウザで動作） -->
<input type="text" placeholder="日付を入力 (YYYY-MM-DD)">

<!-- 強化版（対応ブラウザでは日付ピッカーを表示） -->
<input type="date">

<!-- picture でフォーマットのフォールバック -->
<picture>
  <source srcset="img.avif" type="image/avif">
  <source srcset="img.webp" type="image/webp">
  <img src="img.jpg" alt="フォールバック">
</picture>

<!-- dialog のフォールバック -->
<dialog id="modal">
  <p>モーダルコンテンツ</p>
</dialog>
<!-- 非対応ブラウザ用のポリフィル -->
<script>
if (!window.HTMLDialogElement) {
  // ポリフィルを読み込み
}
</script>

<!-- details/summary のフォールバック -->
<details>
  <summary>詳細を見る</summary>
  <p>非対応ブラウザでは常に表示される</p>
</details>

<!-- noscript（JavaScript 無効時のフォールバック） -->
<noscript>
  <p>このサイトは JavaScript を有効にする必要があります。</p>
</noscript>

<!-- 対応状況の確認 -->
<!-- https://caniuse.com/ でブラウザ対応状況をチェック -->

<!-- チェックリスト -->
<!-- ✅ W3C バリデーション通過 -->
<!-- ✅ 主要ブラウザで表示確認 -->
<!-- ✅ スクリーンリーダーで動作確認 -->
<!-- ✅ キーボード操作で全機能利用可能 -->
<!-- ✅ Lighthouse スコア 90+ -->`,
      },
    ],
  },
];
