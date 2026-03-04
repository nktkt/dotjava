export interface CssSection {
  title: string;
  content: string;
  code?: string;
}

export interface CssChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: CssSection[];
}

export const cssCategories = [
  { id: "basics", name: "基礎文法", color: "var(--color-dads-cyan)" },
  { id: "layout", name: "レイアウト", color: "var(--color-dads-blue)" },
  { id: "design", name: "デザイン・装飾", color: "var(--color-dads-purple)" },
  { id: "responsive", name: "レスポンシブ", color: "var(--color-dads-warning)" },
  { id: "animation", name: "アニメーション", color: "var(--color-dads-error)" },
  { id: "modern", name: "モダンCSS", color: "var(--color-dads-success)" },
  { id: "practice", name: "実践パターン", color: "var(--color-dads-navy)" },
] as const;

export const cssChapters: CssChapter[] = [
  // ===== 基礎文法 =====
  {
    id: "selectors",
    title: "セレクタ",
    category: "basics",
    description:
      "要素・クラス・IDセレクタ、属性セレクタ、擬似クラス・擬似要素、結合子を理解する",
    sections: [
      {
        title: "基本セレクタ",
        content:
          "CSSセレクタはスタイルを適用する対象を指定するパターンです。要素セレクタ（タグ名）、クラスセレクタ（.class）、IDセレクタ（#id）が最も基本的なセレクタです。クラスセレクタは再利用可能で複数の要素に適用でき、IDセレクタはページ内で一意の要素に使います。ユニバーサルセレクタ（*）はすべての要素に一致します。",
        code: `/* 要素セレクタ — すべての p 要素 */
p {
  color: #333;
  line-height: 1.8;
}

/* クラスセレクタ — class="highlight" を持つ要素 */
.highlight {
  background-color: yellow;
  font-weight: bold;
}

/* IDセレクタ — id="main-title" の要素 */
#main-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

/* ユニバーサルセレクタ — すべての要素 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 複数セレクタ — カンマで区切る */
h1, h2, h3 {
  font-family: "Noto Sans JP", sans-serif;
}`,
      },
      {
        title: "属性セレクタと結合子",
        content:
          "属性セレクタは要素の属性値に基づいてスタイルを適用します。[attr]（属性存在）、[attr=value]（完全一致）、[attr^=value]（前方一致）、[attr$=value]（後方一致）、[attr*=value]（部分一致）があります。結合子は要素間の関係を指定します。子孫結合子（空白）、子結合子（>）、隣接兄弟結合子（+）、一般兄弟結合子（~）を使い分けます。",
        code: `/* 属性セレクタ */
a[href] { color: blue; }             /* href属性を持つa要素 */
a[href="https://example.com"] { }    /* 完全一致 */
a[href^="https"] { }                 /* httpsで始まる */
a[href$=".pdf"] { color: red; }      /* .pdfで終わる */
a[href*="example"] { }               /* exampleを含む */
input[type="email"] { }              /* type="email" */

/* 子孫結合子（空白）— nav内のすべてのa */
nav a { text-decoration: none; }

/* 子結合子（>）— 直接の子要素のみ */
ul > li { list-style: disc; }

/* 隣接兄弟結合子（+）— 直後の兄弟 */
h2 + p { margin-top: 0; }

/* 一般兄弟結合子（~）— 後続の兄弟すべて */
h2 ~ p { color: #555; }`,
      },
      {
        title: "擬似クラスと擬似要素",
        content:
          "擬似クラスは要素の特定の状態を対象にします。:hover（マウスオーバー）、:focus（フォーカス中）、:first-child、:last-child、:nth-child() などがあります。擬似要素は要素の一部にスタイルを適用し、::before と ::after で仮想的なコンテンツを挿入できます。::first-line、::first-letter、::selection なども便利な擬似要素です。",
        code: `/* 擬似クラス — 状態ベース */
a:hover { color: #0066cc; }
a:visited { color: purple; }
input:focus { outline: 2px solid blue; }
button:disabled { opacity: 0.5; }

/* 擬似クラス — 構造ベース */
li:first-child { font-weight: bold; }
li:last-child { border-bottom: none; }
tr:nth-child(even) { background: #f9f9f9; }
p:not(.special) { color: #333; }

/* 擬似要素 — ::before / ::after */
.required::after {
  content: " *";
  color: red;
}

blockquote::before {
  content: "\\201C";  /* 左ダブル引用符 */
  font-size: 3rem;
  color: #ccc;
}

/* ::selection — テキスト選択時 */
::selection {
  background: #0066cc;
  color: white;
}`,
      },
    ],
  },
  {
    id: "box-model",
    title: "ボックスモデル",
    category: "basics",
    description:
      "margin、padding、border、box-sizing、overflow の仕組みを理解する",
    sections: [
      {
        title: "ボックスモデルの構造",
        content:
          "CSSのすべての要素は「ボックス」として扱われます。ボックスは内側から content（コンテンツ領域）、padding（内側余白）、border（境界線）、margin（外側余白）の4層で構成されます。デフォルトの content-box では width/height は content 領域のみを指定しますが、border-box を使うと padding と border を含めたサイズ指定になり、レイアウト計算が直感的になります。",
        code: `/* ボックスモデルの基本 */
.box {
  width: 300px;
  padding: 20px;
  border: 2px solid #333;
  margin: 16px;
  /* content-box: 実際の幅 = 300 + 20*2 + 2*2 = 344px */
}

/* border-box — padding・border込みのサイズ指定 */
.box-border {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 2px solid #333;
  /* 実際の幅 = 300px（padding・border含む） */
}

/* 全要素にborder-boxを適用（推奨リセット） */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* ショートハンド */
.shorthand {
  margin: 10px 20px;          /* 上下10px 左右20px */
  padding: 10px 20px 30px;    /* 上10 左右20 下30 */
  border: 1px solid #ddd;     /* 幅 スタイル 色 */
}`,
      },
      {
        title: "marginの相殺とauto",
        content:
          "隣接する縦方向のmarginは「相殺（margin collapsing）」が発生し、大きい方の値のみが適用されます。これはブロック要素の上下marginで起き、左右marginや Flexbox/Grid 内では発生しません。margin: auto はブロック要素の水平中央配置に使えます。左右にautoを指定すると、利用可能な空間が均等に分配されます。",
        code: `/* margin の相殺 */
.box-a { margin-bottom: 30px; }
.box-b { margin-top: 20px; }
/* 実際の間隔は 30px（大きい方が採用される） */

/* ブロック要素の中央配置 */
.centered {
  width: 600px;
  margin: 0 auto;  /* 上下0、左右autoで中央 */
}

/* marginの個別指定 */
.element {
  margin-top: 16px;
  margin-right: 24px;
  margin-bottom: 16px;
  margin-left: 24px;
  /* 論理プロパティ（推奨） */
  margin-block: 16px;     /* 上下 */
  margin-inline: 24px;    /* 左右 */
}

/* 負のmargin */
.overlap {
  margin-top: -20px;  /* 上に20px食い込む */
}`,
      },
      {
        title: "overflowとdisplay",
        content:
          "overflow プロパティはボックスからはみ出したコンテンツの表示方法を制御します。visible（はみ出し表示）、hidden（非表示）、scroll（常にスクロールバー）、auto（必要時のみスクロールバー）があります。display プロパティは要素の表示タイプを指定し、block、inline、inline-block、none、flex、grid などがあります。inline-block は inline のように横に並びつつ、width/height を指定できます。",
        code: `/* overflow */
.scrollable {
  width: 300px;
  height: 200px;
  overflow: auto;  /* 必要な時だけスクロール */
}

.clipped {
  overflow: hidden;  /* はみ出し部分を非表示 */
}

/* overflow-x / overflow-y 個別指定 */
.horizontal-scroll {
  overflow-x: auto;
  overflow-y: hidden;
}

/* display */
.block { display: block; }     /* 幅いっぱい・改行あり */
.inline { display: inline; }   /* テキストの流れ・width/height無効 */
.hidden { display: none; }     /* 完全非表示（スペースも消える） */

/* inline-block — 横並び + サイズ指定可能 */
.tag {
  display: inline-block;
  padding: 4px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* visibility: hidden はスペースを保持して非表示 */
.invisible { visibility: hidden; }`,
      },
    ],
  },

  // ===== レイアウト =====
  {
    id: "flexbox",
    title: "Flexbox",
    category: "layout",
    description:
      "flex-direction、justify-content、align-items、flex-wrap、gap で柔軟なレイアウトを構築する",
    sections: [
      {
        title: "Flexboxの基本",
        content:
          "Flexbox（Flexible Box Layout）は一次元のレイアウトシステムで、コンテナ内のアイテムを柔軟に配置できます。親要素に display: flex を指定するとFlexコンテナになり、直接の子要素がFlexアイテムになります。flex-direction で主軸の方向（row/column）を指定し、justify-content で主軸方向、align-items で交差軸方向の配置を制御します。",
        code: `/* Flexコンテナの基本 */
.container {
  display: flex;
  flex-direction: row;       /* 横並び（デフォルト） */
  justify-content: center;   /* 主軸方向の配置 */
  align-items: center;       /* 交差軸方向の配置 */
  gap: 16px;                 /* アイテム間のスペース */
}

/* justify-content の値 */
.start { justify-content: flex-start; }     /* 先頭寄せ */
.center { justify-content: center; }        /* 中央 */
.end { justify-content: flex-end; }         /* 末尾寄せ */
.between { justify-content: space-between; } /* 均等配置 */
.around { justify-content: space-around; }   /* 均等余白 */
.evenly { justify-content: space-evenly; }   /* 完全均等 */

/* align-items の値 */
.stretch { align-items: stretch; }    /* 伸縮（デフォルト） */
.top { align-items: flex-start; }     /* 上揃え */
.middle { align-items: center; }      /* 中央揃え */
.bottom { align-items: flex-end; }    /* 下揃え */
.baseline { align-items: baseline; }  /* ベースライン揃え */`,
      },
      {
        title: "flex-wrapとアイテムプロパティ",
        content:
          "flex-wrap を使うとアイテムがコンテナに収まらない場合に折り返しが発生します。Flexアイテム側のプロパティとして、flex-grow（余白の分配比率）、flex-shrink（縮小比率）、flex-basis（基本サイズ）があります。flex ショートハンドで一括指定でき、flex: 1 は「均等に伸びる」という一般的なパターンです。order でアイテムの表示順序を変更できます。",
        code: `/* flex-wrap — 折り返し */
.wrap-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

/* Flexアイテムのプロパティ */
.item {
  flex-grow: 1;    /* 余白を均等に分配 */
  flex-shrink: 0;  /* 縮小しない */
  flex-basis: 200px; /* 基本幅 */
}

/* flex ショートハンド */
.grow { flex: 1; }           /* flex: 1 1 0% — 均等伸縮 */
.fixed { flex: 0 0 200px; }  /* 固定幅200px */
.auto { flex: 0 1 auto; }    /* 自然幅・縮小あり */

/* 個別アイテムの配置 */
.self-end { align-self: flex-end; }

/* order — 表示順の変更（HTML順序は変わらない） */
.first { order: -1; }
.last { order: 999; }

/* よくあるパターン: ヘッダーレイアウト */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}`,
      },
      {
        title: "Flexboxの実践パターン",
        content:
          "Flexboxは多くのレイアウトパターンで活躍します。ナビゲーションバー、カードの均等配置、フッターの底面固定、サイドバーレイアウトなどが典型的です。flex-direction: column と min-height: 100vh を組み合わせると、コンテンツが少ない場合でもフッターを画面下部に固定できます。gap プロパティを使えばアイテム間のスペースを簡潔に指定できます。",
        code: `/* カード均等配置 */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
.card-grid > .card {
  flex: 1 1 300px;  /* 最小300px、均等に伸びる */
}

/* Sticky footer（Flexbox版） */
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main { flex: 1; }  /* メインコンテンツが伸びる */
footer { /* 自然な高さで下に固定 */ }

/* サイドバーレイアウト */
.layout {
  display: flex;
  gap: 32px;
}
.sidebar { flex: 0 0 250px; }  /* 固定幅サイドバー */
.main { flex: 1; }             /* 残りをメインが使う */

/* 中央配置（縦横中央） */
.center-all {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}`,
      },
    ],
  },
  {
    id: "grid",
    title: "CSS Grid",
    category: "layout",
    description:
      "grid-template、fr単位、エリア配置、auto-fill/auto-fit で二次元レイアウトを構築する",
    sections: [
      {
        title: "Gridの基本",
        content:
          "CSS Grid は二次元のレイアウトシステムで、行と列の両方を同時に制御できます。display: grid でGridコンテナを作り、grid-template-columns と grid-template-rows で行列を定義します。fr 単位は利用可能な空間の比率を表し、1fr は1 fraction（1等分）を意味します。repeat() 関数で繰り返しパターンを簡潔に記述できます。",
        code: `/* 基本的なGrid */
.grid {
  display: grid;
  grid-template-columns: 200px 1fr 200px;  /* 3列 */
  grid-template-rows: auto 1fr auto;       /* 3行 */
  gap: 16px;
}

/* fr単位 — 比率で分配 */
.three-cols {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;  /* 1:2:1 */
  gap: 24px;
}

/* repeat() — 繰り返し */
.four-cols {
  grid-template-columns: repeat(4, 1fr);  /* 4等分 */
}

/* px と fr の混在 */
.sidebar-layout {
  grid-template-columns: 250px 1fr;
  /* 左サイドバー250px固定、残りメイン */
}

/* minmax() — 最小・最大サイズ */
.responsive {
  grid-template-columns: repeat(3, minmax(200px, 1fr));
}`,
      },
      {
        title: "アイテム配置とエリア",
        content:
          "Gridアイテムは grid-column と grid-row でセル位置を指定できます。span キーワードで複数のセルにまたがるアイテムを作成できます。grid-template-areas を使うと名前付きエリアで直感的にレイアウトを定義でき、レスポンシブ対応時にエリアの再配置が容易になります。",
        code: `/* アイテムの配置 */
.header { grid-column: 1 / -1; }  /* 全列にまたがる */
.sidebar { grid-row: 2 / 4; }     /* 2行分 */
.wide { grid-column: span 2; }    /* 2列分 */

/* grid-template-areas — 名前付きレイアウト */
.page {
  display: grid;
  grid-template-areas:
    "header  header  header"
    "sidebar main    main"
    "footer  footer  footer";
  grid-template-columns: 250px 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.page-header  { grid-area: header; }
.page-sidebar { grid-area: sidebar; }
.page-main    { grid-area: main; }
.page-footer  { grid-area: footer; }

/* アイテムの配置プロパティ */
.center-item {
  justify-self: center;  /* 水平方向 */
  align-self: center;    /* 垂直方向 */
  /* または place-self: center; */
}`,
      },
      {
        title: "レスポンシブGridパターン",
        content:
          "auto-fill と auto-fit を repeat() と組み合わせると、列数が自動的に調整されるレスポンシブレイアウトを作れます。auto-fill は空のトラックを保持し、auto-fit は空のトラックを折りたたみます。メディアクエリなしでレスポンシブなカードグリッドが実現できるため、非常に実用的なパターンです。",
        code: `/* auto-fill — 自動列数調整 */
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
}
/* 画面幅に応じて列数が自動変更（メディアクエリ不要） */

/* auto-fit — 空トラックを折りたたむ */
.auto-fit-grid {
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  /* アイテムが少ない場合、残りの空間を埋める */
}

/* レスポンシブ: エリアの再配置 */
.responsive-page {
  display: grid;
  grid-template-areas:
    "header"
    "main"
    "sidebar"
    "footer";
}

@media (min-width: 768px) {
  .responsive-page {
    grid-template-areas:
      "header  header"
      "sidebar main"
      "footer  footer";
    grid-template-columns: 250px 1fr;
  }
}

/* subgrid — 子要素が親のグリッドラインを継承 */
.parent { display: grid; grid-template-columns: repeat(3, 1fr); }
.child { grid-column: span 3; display: grid; grid-template-columns: subgrid; }`,
      },
    ],
  },
  {
    id: "positioning",
    title: "配置とレイヤー",
    category: "layout",
    description:
      "position（static/relative/absolute/fixed/sticky）、z-index、float を理解する",
    sections: [
      {
        title: "positionプロパティ",
        content:
          "position プロパティは要素の配置方法を指定します。static はデフォルトで通常のフローに従います。relative は元の位置を基準にオフセットし、元のスペースは保持されます。absolute は最も近い positioned（static以外）祖先を基準に配置され、通常のフローから外れます。fixed はビューポートを基準に固定配置され、スクロールしても位置が変わりません。",
        code: `/* static（デフォルト） — 通常フロー */
.default { position: static; }

/* relative — 元の位置からオフセット */
.relative {
  position: relative;
  top: 10px;
  left: 20px;
  /* 元の位置にスペースは残る */
}

/* absolute — positioned祖先基準で配置 */
.parent {
  position: relative;  /* 基準を作る */
}
.child {
  position: absolute;
  top: 0;
  right: 0;
  /* 親の右上に配置。通常フローから外れる */
}

/* fixed — ビューポート基準で固定 */
.fixed-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
}`,
      },
      {
        title: "sticky配置とz-index",
        content:
          "position: sticky はスクロールに応じて relative と fixed を切り替えるハイブリッドな配置方法です。指定した閾値（例: top: 0）に達するまでは通常フローで表示され、閾値に達すると固定されます。z-index は positioned 要素のスタック順序を制御します。値が大きいほど前面に表示されますが、スタッキングコンテキストの仕組みを理解することが重要です。",
        code: `/* sticky — スクロールで固定 */
.sticky-nav {
  position: sticky;
  top: 0;            /* 上端に達したら固定 */
  background: white;
  z-index: 10;
}

/* テーブルのヘッダー固定 */
thead th {
  position: sticky;
  top: 0;
  background: #f5f5f5;
}

/* z-index — スタック順序 */
.behind { z-index: -1; }
.normal { z-index: 0; }
.above { z-index: 10; }
.modal-overlay { z-index: 100; }
.modal { z-index: 101; }
.tooltip { z-index: 200; }

/* スタッキングコンテキストを作る要素 */
.new-context {
  position: relative;
  z-index: 1;
  /* この中のz-indexは外部と独立 */
}

/* isolation でスタッキングコンテキストを明示的に作成 */
.isolated {
  isolation: isolate;
}`,
      },
      {
        title: "floatとクリアフィックス",
        content:
          "float は要素を左右に寄せ、後続のテキストが回り込むレイアウトを作ります。元々は画像の回り込み用ですが、かつてはレイアウト全般に使われていました。現在は Flexbox/Grid が推奨されますが、テキストの回り込みには依然として有用です。float を使用した親要素の高さ問題には clearfix で対応します。",
        code: `/* float — テキストの回り込み */
.float-img {
  float: left;
  margin: 0 16px 16px 0;
  width: 200px;
}
/* 後続のテキストが画像の右側に回り込む */

/* clear — 回り込みの解除 */
.clear-both {
  clear: both;  /* 左右両方の float を解除 */
}

/* clearfix（親要素の高さ問題を解決） */
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}

/* shape-outside — 回り込みの形状指定 */
.circle-wrap {
  float: left;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  shape-outside: circle(50%);
  /* テキストが円形に回り込む */
}

/* 現代ではFlexbox/Gridを推奨 */
/* floatはテキスト回り込み用途に限定 */`,
      },
    ],
  },

  // ===== デザイン・装飾 =====
  {
    id: "colors-backgrounds",
    title: "色と背景",
    category: "design",
    description:
      "色指定方法、グラデーション、背景画像、background-size を理解する",
    sections: [
      {
        title: "色の指定方法",
        content:
          "CSSでの色指定にはキーワード（red, blue）、HEX値（#ff0000）、RGB/RGBA（rgb(255,0,0)）、HSL/HSLA（hsl(0,100%,50%)）があります。現代では HSL が最も直感的で、色相（0-360）、彩度（0-100%）、明度（0-100%）で指定します。透明度は alpha チャンネルで指定し、rgba() や hsla() の第4引数、または色の後に / で指定します。",
        code: `/* 色の指定方法 */
.keyword { color: tomato; }
.hex { color: #ff6347; }
.hex-short { color: #f63; }        /* #ff6633 の省略形 */
.rgb { color: rgb(255, 99, 71); }
.hsl { color: hsl(9, 100%, 64%); } /* 色相9° 彩度100% 明度64% */

/* 透明度（alpha） */
.rgba { color: rgba(255, 99, 71, 0.5); }   /* 50%透明 */
.hsla { color: hsla(9, 100%, 64%, 0.8); }  /* 80%不透明 */

/* モダンな構文（スペース区切り） */
.modern-rgb { color: rgb(255 99 71 / 0.5); }
.modern-hsl { color: hsl(9 100% 64% / 0.8); }

/* currentColor — 現在のcolor値を参照 */
.icon {
  color: #0066cc;
  border: 2px solid currentColor;  /* borderもcolor値を使う */
  fill: currentColor;              /* SVGにも有効 */
}

/* opacity — 要素全体の透明度 */
.semi-transparent { opacity: 0.7; }`,
      },
      {
        title: "グラデーション",
        content:
          "CSSグラデーションは画像として扱われ、background-image プロパティで指定します。linear-gradient（直線）、radial-gradient（放射状）、conic-gradient（円錐状）の3種類があります。方向、色停止位置、繰り返しパターンを指定でき、複数のグラデーションを重ねることも可能です。repeating-linear-gradient でストライプパターンも作れます。",
        code: `/* 線形グラデーション */
.linear {
  background: linear-gradient(to right, #667eea, #764ba2);
}

/* 方向指定 */
.diagonal {
  background: linear-gradient(135deg, #f093fb, #f5576c);
}

/* 複数色 + 色停止位置 */
.multi {
  background: linear-gradient(
    to bottom,
    #667eea 0%,
    #764ba2 50%,
    #f093fb 100%
  );
}

/* 放射状グラデーション */
.radial {
  background: radial-gradient(circle, #667eea, #764ba2);
}

/* 円錐グラデーション */
.conic {
  background: conic-gradient(#f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);
  border-radius: 50%;  /* カラーホイール */
}

/* ストライプパターン */
.stripes {
  background: repeating-linear-gradient(
    45deg,
    #606dbc,
    #606dbc 10px,
    #465298 10px,
    #465298 20px
  );
}`,
      },
      {
        title: "背景画像とプロパティ",
        content:
          "background プロパティで画像を背景に設定できます。background-size で画像のサイズ（cover で全体をカバー、contain で全体を収容）、background-position で表示位置、background-repeat で繰り返しパターンを制御します。複数の背景画像を重ねることも可能で、ショートハンドで一括指定できます。",
        code: `/* 背景画像の基本 */
.hero {
  background-image: url("/images/hero.jpg");
  background-size: cover;       /* 要素全体をカバー */
  background-position: center;  /* 中央に配置 */
  background-repeat: no-repeat;
}

/* background-size */
.cover { background-size: cover; }     /* はみ出しOK・隙間なし */
.contain { background-size: contain; } /* 全体表示・隙間あり */
.custom { background-size: 200px 100px; }

/* background-attachment — スクロール固定 */
.parallax {
  background-attachment: fixed;  /* パララックス効果 */
}

/* ショートハンド */
.bg-short {
  background: url("/img.jpg") center / cover no-repeat;
  /* image position / size repeat */
}

/* 複数背景の重ね合わせ */
.layered {
  background:
    linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
    url("/hero.jpg") center / cover no-repeat;
  /* グラデーションオーバーレイ + 背景画像 */
}`,
      },
    ],
  },
  {
    id: "typography",
    title: "タイポグラフィ",
    category: "design",
    description:
      "font-family、font-size、line-height、text-decoration、Web Fonts を理解する",
    sections: [
      {
        title: "フォントプロパティ",
        content:
          "font-family でフォントの種類、font-size でサイズ、font-weight で太さ、font-style でイタリックを指定します。フォントスタックは優先順にフォントを列挙し、最後にジェネリックファミリ（sans-serif、serif、monospace）を指定します。font-size は rem（ルート要素基準）を使うと、ユーザーのブラウザ設定を尊重しつつ一貫したサイズ管理ができます。",
        code: `/* フォントスタック */
body {
  font-family: "Noto Sans JP", "Hiragino Sans", "Yu Gothic",
    sans-serif;
  font-size: 16px;       /* ベースサイズ */
  font-weight: 400;      /* 通常の太さ */
  line-height: 1.8;      /* 行の高さ（日本語は1.7〜2.0推奨） */
}

/* rem — ルート基準のサイズ */
h1 { font-size: 2rem; }     /* 32px (16 × 2) */
h2 { font-size: 1.5rem; }   /* 24px */
h3 { font-size: 1.25rem; }  /* 20px */
small { font-size: 0.875rem; } /* 14px */

/* font-weight */
.light { font-weight: 300; }
.regular { font-weight: 400; }
.medium { font-weight: 500; }
.bold { font-weight: 700; }

/* font ショートハンド */
.shorthand {
  font: italic 700 1.25rem/1.6 "Noto Sans JP", sans-serif;
  /* style weight size/line-height family */
}`,
      },
      {
        title: "テキストプロパティ",
        content:
          "text-align はテキストの水平揃え、text-decoration は装飾線（下線・取り消し線など）、text-transform は大文字・小文字変換を制御します。letter-spacing（字間）と word-spacing（語間）でテキストの間隔を調整でき、text-indent で段落の字下げを指定できます。text-overflow: ellipsis と overflow: hidden を組み合わせるとテキストの省略表示が可能です。",
        code: `/* text-align */
.left { text-align: left; }
.center { text-align: center; }
.right { text-align: right; }
.justify { text-align: justify; }

/* text-decoration */
.underline { text-decoration: underline; }
.line-through { text-decoration: line-through; }
.no-underline { text-decoration: none; }  /* リンクの下線除去 */
.fancy-underline {
  text-decoration: underline wavy #ff6347;
  text-underline-offset: 4px;
}

/* letter-spacing / word-spacing */
.wide-letters { letter-spacing: 0.1em; }
.tight-letters { letter-spacing: -0.02em; }

/* テキスト省略（1行） */
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* テキスト省略（複数行 — 3行まで） */
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}`,
      },
      {
        title: "Web Fontsとfont-face",
        content:
          "Web Fontsを使えばユーザーの端末にインストールされていないフォントも使用できます。Google Fonts のような外部サービスから読み込むか、@font-face で自前のフォントファイルを指定します。パフォーマンスを考慮して font-display: swap を指定すると、フォント読み込み中はシステムフォントで表示し、読み込み完了後に切り替わります。",
        code: `/* Google Fonts の読み込み（HTML <head> 内） */
/* <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet"> */

/* @font-face — 自前フォント */
@font-face {
  font-family: "MyFont";
  src: url("/fonts/myfont.woff2") format("woff2"),
       url("/fonts/myfont.woff") format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap;  /* フォント読み込み戦略 */
}

/* font-display の値 */
/* swap   — システムフォントで即座に表示→切替 */
/* block  — 短時間透明→フォント表示 */
/* fallback — 短い swap + タイムアウト */
/* optional — ネットワーク状況で判断 */

/* 使用 */
body {
  font-family: "MyFont", "Noto Sans JP", sans-serif;
}

/* 可変フォント（Variable Fonts） */
@font-face {
  font-family: "InterVariable";
  src: url("/fonts/Inter-Variable.woff2") format("woff2");
  font-weight: 100 900;  /* 可変範囲 */
}
.variable {
  font-variation-settings: "wght" 450;
}`,
      },
    ],
  },
  {
    id: "borders-shadows",
    title: "枠線と影",
    category: "design",
    description:
      "border-radius、box-shadow、text-shadow、outline を使った装飾テクニック",
    sections: [
      {
        title: "borderとborder-radius",
        content:
          "border プロパティは要素に境界線を追加します。幅（width）、スタイル（solid/dashed/dotted/double/groove/ridge）、色を指定します。border-radius で角を丸くでき、4つの角を個別に指定することも可能です。50% を指定すると正方形は円に、長方形は楕円になります。",
        code: `/* border の基本 */
.solid { border: 1px solid #ddd; }
.dashed { border: 2px dashed #999; }
.dotted { border: 3px dotted #666; }
.double { border: 4px double #333; }

/* 個別指定 */
.custom {
  border-top: 3px solid #0066cc;
  border-bottom: 1px solid #eee;
}

/* border-radius — 角丸 */
.rounded { border-radius: 8px; }
.pill { border-radius: 9999px; }     /* カプセル型 */
.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;               /* 完全な円 */
}

/* 個別の角を指定 */
.custom-radius {
  border-radius: 20px 0 20px 0;     /* 左上 右上 右下 左下 */
}

/* 楕円の角丸 */
.elliptical {
  border-radius: 50px / 25px;       /* 水平 / 垂直 */
}`,
      },
      {
        title: "box-shadowとtext-shadow",
        content:
          "box-shadow は要素にドロップシャドウを追加し、影の位置（x, y）、ぼかし半径、拡散半径、色を指定します。inset キーワードで内側の影も作成可能です。複数の影を重ねて立体感のあるデザインを実現できます。text-shadow はテキストに影を追加し、読みやすさの向上や装飾に使えます。",
        code: `/* box-shadow: x y blur spread color */
.shadow-sm { box-shadow: 0 1px 3px rgba(0,0,0,0.12); }
.shadow-md { box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
.shadow-lg { box-shadow: 0 10px 25px rgba(0,0,0,0.15); }

/* 内側の影 */
.inset {
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
}

/* 複数の影（重ね合わせ） */
.layered-shadow {
  box-shadow:
    0 1px 3px rgba(0,0,0,0.12),
    0 4px 8px rgba(0,0,0,0.06);
}

/* 影でボーダー効果（レイアウトに影響しない） */
.outline-shadow {
  box-shadow: 0 0 0 2px #0066cc;
}

/* text-shadow: x y blur color */
.text-shadow {
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

/* 光彩テキスト */
.glow {
  text-shadow: 0 0 10px rgba(0,102,204,0.8);
}`,
      },
      {
        title: "outlineとフィルター",
        content:
          "outline は border に似ていますが、ボックスモデルのスペースを取りません。主にフォーカス表示に使われ、アクセシビリティの観点で重要です。outline-offset で要素からの距離を指定できます。filter プロパティは blur、brightness、contrast、grayscale、drop-shadow などの視覚効果を適用でき、backdrop-filter はその背景に効果を適用します。",
        code: `/* outline — フォーカス表示 */
.focus-visible:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 2px;
}

/* アクセシビリティ: outlineを消す場合は代替を用意 */
button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0,102,204,0.5);
}

/* filter — 視覚効果 */
.blur { filter: blur(4px); }
.bright { filter: brightness(1.2); }
.gray { filter: grayscale(100%); }
.sepia { filter: sepia(80%); }

/* 複数フィルターの組み合わせ */
.combined {
  filter: brightness(1.1) contrast(1.1) saturate(1.2);
}

/* ホバーで効果を適用 */
img:hover { filter: brightness(1.1); transition: filter 0.3s; }
img { filter: grayscale(100%); }
img:hover { filter: grayscale(0); }

/* backdrop-filter — 背景に効果（すりガラス） */
.glass {
  background: rgba(255,255,255,0.2);
  backdrop-filter: blur(10px);
}`,
      },
    ],
  },

  // ===== レスポンシブ =====
  {
    id: "media-queries",
    title: "メディアクエリ",
    category: "responsive",
    description:
      "ブレークポイント、モバイルファースト、prefers-color-scheme でデバイス対応する",
    sections: [
      {
        title: "メディアクエリの基本",
        content:
          "メディアクエリ（@media）は画面サイズやデバイス特性に応じてスタイルを切り替えます。モバイルファーストアプローチでは、まず小さい画面用のスタイルを書き、min-width で大きい画面用のスタイルを追加していきます。一般的なブレークポイントは 640px（sm）、768px（md）、1024px（lg）、1280px（xl）です。",
        code: `/* モバイルファースト — 小さい画面がベース */
.container {
  padding: 16px;
  width: 100%;
}

/* sm: 640px以上 */
@media (min-width: 640px) {
  .container { padding: 24px; }
}

/* md: 768px以上 */
@media (min-width: 768px) {
  .container { max-width: 768px; margin: 0 auto; }
}

/* lg: 1024px以上 */
@media (min-width: 1024px) {
  .container { max-width: 1024px; }
}

/* xl: 1280px以上 */
@media (min-width: 1280px) {
  .container { max-width: 1280px; }
}

/* 範囲指定 — 特定の範囲のみ */
@media (min-width: 768px) and (max-width: 1023px) {
  /* タブレットのみ */
}`,
      },
      {
        title: "ユーザー設定の検出",
        content:
          "メディアクエリは画面サイズだけでなく、ユーザーのOSやブラウザの設定を検出できます。prefers-color-scheme でダークモード対応、prefers-reduced-motion でアニメーション軽減、prefers-contrast でコントラスト調整が可能です。これらはアクセシビリティとユーザー体験の向上に重要な機能です。",
        code: `/* ダークモード対応 */
:root {
  --bg: #ffffff;
  --text: #333333;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1a1a1a;
    --text: #e0e0e0;
  }
}

body {
  background: var(--bg);
  color: var(--text);
}

/* アニメーション軽減 */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* ハイコントラスト */
@media (prefers-contrast: high) {
  .card { border: 2px solid; }
}

/* hover対応の検出 */
@media (hover: hover) {
  .link:hover { text-decoration: underline; }
}`,
      },
      {
        title: "コンテナクエリ",
        content:
          "コンテナクエリ（@container）は要素のサイズに基づいてスタイルを切り替える機能です。メディアクエリがビューポート全体のサイズに依存するのに対し、コンテナクエリは親コンテナのサイズに応じて子要素のスタイルを変更できます。これにより、再利用可能なコンポーネントが自身の配置場所に応じて適応的に表示を変えられます。",
        code: `/* コンテナの定義 */
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

/* コンテナクエリ */
@container card (min-width: 400px) {
  .card {
    display: flex;
    gap: 16px;
  }
  .card-image {
    width: 200px;
    flex-shrink: 0;
  }
}

@container card (max-width: 399px) {
  .card {
    display: block;
  }
  .card-image {
    width: 100%;
  }
}

/* コンテナクエリ単位 */
.responsive-text {
  font-size: clamp(1rem, 3cqi, 2rem);
  /* cqi = コンテナのインラインサイズの1% */
}

/* ショートハンド */
.wrapper {
  container: sidebar / inline-size;
  /* name / type */
}`,
      },
    ],
  },
  {
    id: "responsive-units",
    title: "レスポンシブ単位と設計",
    category: "responsive",
    description:
      "rem/em/vw/vh、clamp()、レスポンシブ画像、アスペクト比の使い方を学ぶ",
    sections: [
      {
        title: "相対単位",
        content:
          "CSS の単位は絶対単位（px）と相対単位に分けられます。rem はルート要素（html）の font-size を基準とし、em は親要素の font-size を基準とします。vw はビューポート幅の1%、vh はビューポート高さの1%です。lvh/svh/dvh はモバイルブラウザのアドレスバーを考慮した新しいビューポート単位です。",
        code: `/* px — 絶対単位 */
.fixed { font-size: 16px; width: 300px; }

/* rem — ルート要素(html)基準 */
html { font-size: 16px; }  /* 1rem = 16px */
h1 { font-size: 2rem; }    /* 32px */
p { margin-bottom: 1.5rem; } /* 24px */

/* em — 親要素基準（ネストで累積） */
.parent { font-size: 20px; }
.child { font-size: 0.8em; }  /* 16px (20 × 0.8) */
/* padding/margin の em は自身の font-size 基準 */
.button { padding: 0.5em 1em; } /* font-sizeに比例 */

/* ビューポート単位 */
.full-screen { height: 100vh; width: 100vw; }

/* dvh — 動的ビューポート高さ（モバイル対応） */
.mobile-full { height: 100dvh; }

/* % — 親要素基準 */
.half { width: 50%; }

/* ch — 文字「0」の幅基準（読みやすい行幅に） */
.readable { max-width: 70ch; }`,
      },
      {
        title: "clamp()とレスポンシブタイポグラフィ",
        content:
          "clamp(min, preferred, max) は最小値・推奨値・最大値の3つを指定し、推奨値がその範囲内に収まるように値を自動調整します。ビューポート幅に応じたフォントサイズの滑らかな変化を実現でき、メディアクエリなしでレスポンシブなタイポグラフィが可能です。min()、max() と組み合わせると柔軟なサイズ指定ができます。",
        code: `/* clamp(最小値, 推奨値, 最大値) */
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
  /* 最小24px、推奨4vw、最大48px */
}

p {
  font-size: clamp(0.875rem, 1vw + 0.5rem, 1.125rem);
}

/* レスポンシブな余白 */
section {
  padding: clamp(1rem, 5vw, 4rem);
}

/* min() / max() */
.container {
  width: min(90%, 1200px);
  /* 画面の90%か1200pxの小さい方 */
}

.sidebar {
  width: max(250px, 25%);
  /* 250pxか25%の大きい方 */
}

/* レスポンシブなタイプスケール */
:root {
  --step-0: clamp(1rem, 0.5vw + 0.875rem, 1.125rem);
  --step-1: clamp(1.2rem, 1vw + 0.95rem, 1.5rem);
  --step-2: clamp(1.44rem, 1.5vw + 1.05rem, 2rem);
  --step-3: clamp(1.728rem, 2vw + 1.15rem, 2.665rem);
}`,
      },
      {
        title: "レスポンシブ画像とアスペクト比",
        content:
          "レスポンシブ画像は max-width: 100% と height: auto で親要素に収まるようにします。aspect-ratio プロパティで要素のアスペクト比を指定でき、画像や動画の比率を維持できます。object-fit プロパティは画像が指定されたサイズにどう収まるかを制御し、cover（トリミング）や contain（余白あり）が一般的です。",
        code: `/* レスポンシブ画像 — 基本 */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* aspect-ratio — アスペクト比の指定 */
.video-container {
  aspect-ratio: 16 / 9;
  width: 100%;
}

.square { aspect-ratio: 1; }        /* 1:1 正方形 */
.portrait { aspect-ratio: 3 / 4; }  /* 3:4 縦長 */

/* object-fit — 画像のフィット方法 */
.cover-img {
  width: 100%;
  height: 300px;
  object-fit: cover;      /* トリミングして全体をカバー */
  object-position: center; /* トリミング位置 */
}

.contain-img {
  width: 100%;
  height: 300px;
  object-fit: contain;  /* 全体表示（余白あり） */
}

/* レスポンシブ背景画像 */
.hero {
  aspect-ratio: 21 / 9;
  background: url("/hero.jpg") center / cover no-repeat;
}`,
      },
    ],
  },

  // ===== アニメーション =====
  {
    id: "transitions",
    title: "トランジション",
    category: "animation",
    description:
      "transition-property、duration、timing-function、delay で滑らかな状態変化を実現する",
    sections: [
      {
        title: "transitionの基本",
        content:
          "CSS トランジションはプロパティの値の変化を滑らかにアニメーションさせます。transition-property で対象のプロパティ、transition-duration で所要時間、transition-timing-function で加速曲線、transition-delay で遅延を指定します。ショートハンドで一括指定でき、複数のプロパティに異なるトランジションを適用することも可能です。",
        code: `/* トランジションの基本 */
.button {
  background: #0066cc;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  transition: background 0.3s ease;
}
.button:hover {
  background: #0052a3;
}

/* 複数プロパティ */
.card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

/* ショートハンド: property duration timing delay */
.link {
  transition: color 0.2s ease-in-out 0s;
}

/* all — すべてのプロパティ（パフォーマンス注意） */
.all-transition {
  transition: all 0.3s ease;
}

/* transition: none でアニメーションを無効化 */
@media (prefers-reduced-motion: reduce) {
  * { transition: none !important; }
}`,
      },
      {
        title: "タイミング関数",
        content:
          "transition-timing-function はアニメーションの加速曲線（イージング）を制御します。ease（緩やかに開始・終了）、linear（一定速度）、ease-in（緩やかに開始）、ease-out（緩やかに終了）、ease-in-out（両方）があります。cubic-bezier() で独自のカーブを定義でき、steps() でコマ送りのような不連続なアニメーションも可能です。",
        code: `/* 組み込みのタイミング関数 */
.ease { transition-timing-function: ease; }
.linear { transition-timing-function: linear; }
.ease-in { transition-timing-function: ease-in; }
.ease-out { transition-timing-function: ease-out; }
.ease-in-out { transition-timing-function: ease-in-out; }

/* cubic-bezier — カスタムカーブ */
.bounce {
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
  /* バウンス効果 */
}

.snappy {
  transition-timing-function: cubic-bezier(0.25, 0.1, 0.25, 1);
}

/* steps — コマ送り */
.typewriter {
  width: 0;
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid;
  transition: width 3s steps(20);
}
.typewriter.active { width: 20ch; }

/* 実用的なホバー効果 */
.nav-link {
  position: relative;
  transition: color 0.2s ease;
}
.nav-link::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: currentColor;
  transition: width 0.3s ease;
}
.nav-link:hover::after { width: 100%; }`,
      },
      {
        title: "トランジション可能なプロパティ",
        content:
          "すべてのCSSプロパティがトランジション可能ではありません。数値、色、長さなどの補間可能な値を持つプロパティがトランジションできます。transform と opacity はGPUアクセラレーションが効き、パフォーマンスに優れています。width/height より transform: scale()、left/top より transform: translate() を使うことが推奨されます。",
        code: `/* パフォーマンスの良いプロパティ（GPU加速） */
.optimized {
  transition: transform 0.3s, opacity 0.3s;
}
.optimized:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

/* 避けるべき: width/height/left/top の直接アニメーション */
/* ❌ レイアウトの再計算が走る */
.bad { transition: width 0.3s, height 0.3s; }

/* ✅ transform で代替 */
.good { transition: transform 0.3s; }
.good:hover { transform: scale(1.05); }

/* will-change — ブラウザに最適化のヒント */
.animated {
  will-change: transform;
  transition: transform 0.3s ease;
}

/* display はトランジション不可だが回避策あり */
/* ❌ display: none → block はアニメーション不可 */
/* ✅ opacity + visibility の組み合わせ */
.fade-out {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s, visibility 0.3s;
}
.fade-in {
  opacity: 1;
  visibility: visible;
}`,
      },
    ],
  },
  {
    id: "animations",
    title: "CSSアニメーション",
    category: "animation",
    description:
      "@keyframes、animation-name、iteration-count、fill-mode で複雑なアニメーションを作成する",
    sections: [
      {
        title: "@keyframesの基本",
        content:
          "CSS アニメーションは @keyframes でアニメーションのステップを定義し、animation プロパティで要素に適用します。from / to（0% / 100%）や中間のパーセンテージで各時点のスタイルを指定します。animation-duration で所要時間、animation-timing-function でイージング、animation-iteration-count で繰り返し回数を制御します。",
        code: `/* @keyframes — アニメーション定義 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.5s ease forwards;
}

/* 中間ステップ */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.bounce {
  animation: bounce 1s ease infinite;
}

/* animation ショートハンド */
/* name duration timing delay count direction fill-mode */
.animated {
  animation: fadeIn 0.6s ease-out 0.2s 1 normal forwards;
}

/* 複数アニメーション */
.multi {
  animation:
    fadeIn 0.5s ease,
    bounce 2s ease 0.5s infinite;
}`,
      },
      {
        title: "アニメーションの制御",
        content:
          "animation-fill-mode はアニメーション前後のスタイル保持を制御します。forwards で終了後に最後のキーフレームを維持、backwards で開始前に最初のキーフレームを適用します。animation-direction で再生方向、animation-play-state で再生・一時停止の切り替えが可能です。animation-delay で開始の遅延を指定し、負の値を使うとアニメーションの途中から開始できます。",
        code: `/* fill-mode */
.forwards {
  animation: fadeIn 0.5s ease forwards;
  /* 終了後に最後の状態を保持 */
}

.backwards {
  animation: fadeIn 0.5s ease 1s backwards;
  /* 開始前（delay中）に最初の状態を適用 */
}

.both {
  animation: fadeIn 0.5s ease 0.5s both;
  /* forwards + backwards */
}

/* direction */
.reverse { animation-direction: reverse; }
.alternate { animation-direction: alternate; } /* 往復 */

/* play-state — ホバーで一時停止 */
.marquee {
  animation: scroll 10s linear infinite;
}
.marquee:hover {
  animation-play-state: paused;
}

/* 負のdelay — 途中から開始 */
.item:nth-child(1) { animation-delay: 0s; }
.item:nth-child(2) { animation-delay: -0.1s; }
.item:nth-child(3) { animation-delay: -0.2s; }

@keyframes scroll {
  from { transform: translateX(100%); }
  to { transform: translateX(-100%); }
}`,
      },
      {
        title: "実践的なアニメーションパターン",
        content:
          "実務でよく使うアニメーションパターンを紹介します。ローディングスピナー、スケルトンスクリーン、パルスエフェクト、スライドインなどはWebアプリでよく見かけるアニメーションです。パフォーマンスの観点では、transform と opacity のみをアニメーションさせ、will-change でブラウザにヒントを与えるのがベストプラクティスです。",
        code: `/* ローディングスピナー */
@keyframes spin {
  to { transform: rotate(360deg); }
}
.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #eee;
  border-top-color: #0066cc;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* スケルトンスクリーン */
@keyframes shimmer {
  to { background-position: -200% 0; }
}
.skeleton {
  background: linear-gradient(
    90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

/* パルスエフェクト */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.pulse { animation: pulse 2s ease-in-out infinite; }

/* スライドイン */
@keyframes slideUp {
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.slide-up {
  animation: slideUp 0.4s ease forwards;
}`,
      },
    ],
  },

  // ===== モダンCSS =====
  {
    id: "custom-properties",
    title: "カスタムプロパティ（CSS変数）",
    category: "modern",
    description:
      "CSS変数の定義と使用、var()、フォールバック値、テーマ切替を実装する",
    sections: [
      {
        title: "CSS変数の基本",
        content:
          "CSSカスタムプロパティ（CSS変数）は -- で始まる名前で定義し、var() 関数で参照します。:root（html要素）に定義するとグローバルスコープになります。変数はカスケードと継承に従うため、子要素や特定のセレクタで上書きできます。var() の第2引数にフォールバック値を指定でき、変数が未定義の場合に使用されます。",
        code: `/* :root でグローバル変数を定義 */
:root {
  --color-primary: #0066cc;
  --color-secondary: #6c757d;
  --color-accent: #ff6347;
  --font-body: "Noto Sans JP", sans-serif;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 32px;
  --radius: 8px;
}

/* var() で参照 */
.button {
  background: var(--color-primary);
  font-family: var(--font-body);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius);
}

/* フォールバック値 */
.text {
  color: var(--color-text, #333333);
  /* --color-text が未定義なら #333333 */
}

/* スコープ内で上書き */
.card {
  --color-primary: #28a745;  /* このcard内だけ緑 */
}
.card .button {
  background: var(--color-primary);  /* 緑になる */
}`,
      },
      {
        title: "テーマ切替の実装",
        content:
          "CSS変数を使えばダークモード・ライトモードの切替が簡単に実装できます。:root にライトテーマの変数を定義し、data属性やクラスでダークテーマの変数を上書きします。prefers-color-scheme メディアクエリと組み合わせることで、OSの設定に自動対応しつつ、ユーザーの手動切替も可能にできます。",
        code: `/* ライトテーマ（デフォルト） */
:root {
  --bg: #ffffff;
  --bg-secondary: #f5f5f5;
  --text: #333333;
  --text-muted: #6c757d;
  --border: #e0e0e0;
  --shadow: rgba(0, 0, 0, 0.1);
}

/* ダークテーマ — data属性で切替 */
[data-theme="dark"] {
  --bg: #1a1a2e;
  --bg-secondary: #16213e;
  --text: #e0e0e0;
  --text-muted: #a0a0a0;
  --border: #333355;
  --shadow: rgba(0, 0, 0, 0.3);
}

/* OS設定に自動対応 */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #1a1a2e;
    --bg-secondary: #16213e;
    --text: #e0e0e0;
    --text-muted: #a0a0a0;
    --border: #333355;
  }
}

/* 変数を使ったスタイル */
body { background: var(--bg); color: var(--text); }
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  box-shadow: 0 2px 8px var(--shadow);
}`,
      },
      {
        title: "CSS変数の活用テクニック",
        content:
          "CSS変数はJavaScriptから動的に変更でき、インタラクティブな効果に活用できます。calc() と組み合わせて動的な計算を行ったり、コンポーネント単位で変数を定義して再利用性を高めることができます。変数の値には任意のCSS値（色、長さ、文字列など）を設定でき、メディアクエリ内で値を変更してレスポンシブ対応することも可能です。",
        code: `/* JavaScriptから変数を変更 */
/* document.documentElement.style.setProperty('--primary', '#ff0000'); */

/* calc() と組み合わせ */
:root {
  --base-size: 16px;
  --scale: 1.25;
}
h3 { font-size: calc(var(--base-size) * var(--scale)); }
h2 { font-size: calc(var(--base-size) * var(--scale) * var(--scale)); }

/* コンポーネント変数 */
.btn {
  --btn-bg: var(--color-primary);
  --btn-color: white;
  --btn-padding: 8px 16px;

  background: var(--btn-bg);
  color: var(--btn-color);
  padding: var(--btn-padding);
}

/* バリエーション — 変数だけ変更 */
.btn-danger { --btn-bg: #dc3545; }
.btn-success { --btn-bg: #28a745; }
.btn-lg { --btn-padding: 12px 24px; }

/* メディアクエリで変数を変更 */
:root {
  --container-padding: 16px;
}
@media (min-width: 768px) {
  :root { --container-padding: 32px; }
}
.container { padding: var(--container-padding); }`,
      },
    ],
  },
  {
    id: "modern-features",
    title: "モダンCSS機能",
    category: "modern",
    description:
      ":has()、:is()、:where()、ネスティング、カスケードレイヤーなど最新機能を学ぶ",
    sections: [
      {
        title: ":is()、:where()、:has()",
        content:
          ":is() は複数のセレクタをグループ化し、冗長な記述を減らします。:where() は :is() と同じ機能ですが、詳細度が常に0になるためリセットCSSに便利です。:has() は「親セレクタ」として機能し、特定の子要素を含む親要素を選択できます。:has() はCSSセレクタの中で最も革新的な追加と言われています。",
        code: `/* :is() — セレクタのグループ化 */
/* 従来の書き方 */
article h1, article h2, article h3,
section h1, section h2, section h3 {
  color: #333;
}
/* :is() で簡潔に */
:is(article, section) :is(h1, h2, h3) {
  color: #333;
}

/* :where() — 詳細度0でグループ化 */
:where(article, section) p {
  line-height: 1.8;
  /* 詳細度が0なので上書きしやすい */
}

/* :has() — 親セレクタ（子の有無で親を選択） */
.card:has(img) {
  /* 画像を含むカードだけに適用 */
  display: grid;
  grid-template-rows: auto 1fr;
}

.form-group:has(:invalid) {
  /* 無効な入力を含むグループ */
  border-color: red;
}

/* :has() + 隣接兄弟 */
h2:has(+ p) {
  /* 直後にpが続くh2 */
  margin-bottom: 0.5rem;
}`,
      },
      {
        title: "CSSネスティング",
        content:
          "CSSネスティングはSassのようにセレクタをネストして記述できるネイティブCSS機能です。& を使って親セレクタを参照し、擬似クラス、擬似要素、メディアクエリもネスト可能です。コードの構造化と可読性の向上に役立ち、プリプロセッサなしでコンポーネント的なCSS記述ができます。",
        code: `/* CSSネスティング（ネイティブ） */
.card {
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;

  /* 子要素 */
  & .title {
    font-size: 1.25rem;
    font-weight: bold;
  }

  & .description {
    color: #666;
    margin-top: 8px;
  }

  /* 擬似クラス */
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }

  /* 擬似要素 */
  &::before {
    content: "";
    display: block;
  }

  /* メディアクエリのネスト */
  @media (min-width: 768px) {
    padding: 24px;
    display: flex;
  }

  /* 修飾子 */
  &.featured {
    border-color: gold;
  }
}`,
      },
      {
        title: "カスケードレイヤーとその他の新機能",
        content:
          "@layer はスタイルの優先順位をレイヤーで管理する機能です。リセットCSS、ベーススタイル、コンポーネント、ユーティリティなどの層を明示的に定義でき、詳細度の競合を減らせます。その他、color-mix() で色のミックス、light-dark() でテーマ対応の色指定、scroll-timeline でスクロール駆動アニメーションなどの新機能が登場しています。",
        code: `/* @layer — カスケードレイヤー */
@layer reset, base, components, utilities;

@layer reset {
  * { margin: 0; padding: 0; box-sizing: border-box; }
}

@layer base {
  body { font-family: sans-serif; line-height: 1.6; }
  a { color: #0066cc; }
}

@layer components {
  .btn { padding: 8px 16px; border-radius: 4px; }
  .card { border: 1px solid #ddd; padding: 16px; }
}

@layer utilities {
  .text-center { text-align: center; }
  .mt-4 { margin-top: 1rem; }
}

/* 後のレイヤーが優先（詳細度に関係なく） */

/* color-mix() — 色のブレンド */
.lighter {
  background: color-mix(in srgb, #0066cc, white 30%);
}

/* light-dark() — テーマ対応 */
:root { color-scheme: light dark; }
.text {
  color: light-dark(#333, #eee);
}`,
      },
    ],
  },

  // ===== 実践パターン =====
  {
    id: "architecture",
    title: "CSS設計手法",
    category: "practice",
    description:
      "BEM、CSS Modules、Tailwind CSS、詳細度の管理、ファイル構成のベストプラクティス",
    sections: [
      {
        title: "BEMとCSS命名規則",
        content:
          "BEM（Block Element Modifier）はCSS命名の方法論で、Block（コンポーネント）、Element（構成要素）、Modifier（バリエーション）を明確に分けます。命名規則は block__element--modifier です。これにより詳細度を低く保ち、名前の衝突を防ぎ、コンポーネントの構造が一目で分かるようになります。",
        code: `/* BEM — Block Element Modifier */

/* Block: 独立したコンポーネント */
.card { }

/* Element: Blockの構成要素（__で接続） */
.card__header { }
.card__title { }
.card__body { }
.card__footer { }

/* Modifier: バリエーション（--で接続） */
.card--featured { border-color: gold; }
.card--compact { padding: 8px; }
.card__title--large { font-size: 1.5rem; }

/* 実例 */
.nav { display: flex; }
.nav__list { display: flex; gap: 16px; }
.nav__item { }
.nav__link { color: #333; text-decoration: none; }
.nav__link--active { color: #0066cc; font-weight: bold; }

/* HTML:
<nav class="nav">
  <ul class="nav__list">
    <li class="nav__item">
      <a class="nav__link nav__link--active" href="/">Home</a>
    </li>
  </ul>
</nav>
*/`,
      },
      {
        title: "詳細度の理解と管理",
        content:
          "CSSの詳細度（Specificity）はセレクタの優先順位を決めるルールです。ID（100）> クラス/属性/擬似クラス（10）> 要素/擬似要素（1）の重みで計算されます。!important は最優先ですが乱用は禁物です。詳細度を低く一定に保つことで、予測可能で保守しやすいCSSになります。クラスセレクタのみを使い、IDやネストを深くしないのがベストプラクティスです。",
        code: `/* 詳細度の計算 (ID, Class, Element) */
p { }                    /* (0, 0, 1) */
.text { }                /* (0, 1, 0) */
#main { }                /* (1, 0, 0) */
p.text { }               /* (0, 1, 1) */
#main .text p { }        /* (1, 1, 1) */

/* ❌ 詳細度が高すぎる */
#header nav ul li a.active { color: blue; }
/* これを上書きするには同等以上の詳細度が必要 */

/* ✅ クラスセレクタで詳細度を均一に */
.nav-link { color: #333; }
.nav-link.is-active { color: blue; }

/* :where() で詳細度0のベーススタイル */
:where(.reset) a {
  color: inherit;
  text-decoration: none;
  /* 詳細度0なので簡単に上書き可能 */
}

/* !important は最終手段 */
.utility-class {
  display: none !important;
  /* ユーティリティクラスでのみ許容 */
}

/* @layer でレイヤー優先順位を管理 */
@layer base, components, utilities;`,
      },
      {
        title: "CSS ModulesとCSS-in-JSの概要",
        content:
          "モダンなフレームワークではスコープ付きCSSが一般的です。CSS Modules はクラス名を自動でユニーク化し、名前の衝突を防ぎます。Tailwind CSSはユーティリティファーストのアプローチで、HTMLに直接クラスを記述します。CSS-in-JS（styled-components、Emotion）はJavaScript内でCSSを記述し、動的なスタイルを実現します。",
        code: `/* CSS Modules — ファイル名: Button.module.css */
.button {
  padding: 8px 16px;
  border-radius: 4px;
}
.primary { background: #0066cc; color: white; }
.secondary { background: #6c757d; color: white; }

/* React での使用例:
import styles from './Button.module.css';
<button className={\`\${styles.button} \${styles.primary}\`}>
  Click
</button>
→ 実際のクラス名: Button_button_x7ks2 Button_primary_a3bk1
*/

/* Tailwind CSS — ユーティリティファースト */
/* <button class="px-4 py-2 bg-blue-600 text-white rounded-lg
                  hover:bg-blue-700 transition-colors">
     Click
   </button> */

/* styled-components (CSS-in-JS) の概念:
const Button = styled.button\`
  padding: 8px 16px;
  background: \${props => props.primary ? '#0066cc' : '#6c757d'};
  color: white;
  border-radius: 4px;
\`;
*/`,
      },
    ],
  },
  {
    id: "practical-tips",
    title: "実践テクニック",
    category: "practice",
    description:
      "リセットCSS、センタリング、sticky footer、スクロールスナップなど実務パターン集",
    sections: [
      {
        title: "リセットCSSとベーススタイル",
        content:
          "ブラウザにはデフォルトのスタイルがあり、ブラウザ間で差異があります。リセットCSSはこれらを統一し、一貫したスタイリングの基盤を作ります。モダンなリセットは必要最小限のリセットに留め、有用なデフォルト（リストのマーカーなど）まで消さないアプローチが主流です。",
        code: `/* モダンなCSSリセット */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

html {
  -webkit-text-size-adjust: 100%;
  tab-size: 4;
}

body {
  min-height: 100vh;
  line-height: 1.6;
  font-family: system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;  /* フォームはフォントを継承しない */
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}

/* スムーズスクロール（ただしアニメーション軽減時は無効） */
@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}`,
      },
      {
        title: "センタリングパターン集",
        content:
          "CSSで要素を中央に配置する方法は複数あります。水平中央は margin: 0 auto（ブロック）、text-align: center（インライン）で対応できます。縦横中央には Flexbox や Grid が最も簡潔です。place-items: center は Grid で1行でセンタリングを実現できる便利なプロパティです。",
        code: `/* 1. Flexbox — 最も汎用的 */
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 2. Grid — 最も簡潔 */
.grid-center {
  display: grid;
  place-items: center;
}

/* 3. margin auto（ブロック要素の水平中央） */
.block-center {
  width: fit-content;  /* またはmax-width */
  margin-inline: auto;
}

/* 4. absolute + transform */
.absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* 5. text-align（インライン/インラインブロック） */
.text-center { text-align: center; }

/* 6. margin auto in Flex（特定のアイテム） */
.push-right { margin-left: auto; }
.push-center { margin: auto; }

/* 7. Grid + place-self（特定のアイテム） */
.self-center { place-self: center; }`,
      },
      {
        title: "スクロールスナップと実用パターン",
        content:
          "scroll-snap はスクロール位置を特定のポイントにスナップさせる機能です。カルーセルやフルページスクロールに便利です。その他、scroll-margin でスクロール先のオフセット調整、scrollbar-gutter でスクロールバーの領域を予約、overscroll-behavior でスクロールチェーンを制御できます。",
        code: `/* スクロールスナップ — 横スクロールカルーセル */
.carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 16px;
  scrollbar-width: none;  /* スクロールバー非表示 */
}
.carousel::-webkit-scrollbar { display: none; }

.carousel-item {
  scroll-snap-align: start;
  flex: 0 0 80%;
}

/* フルページスクロール */
.fullpage {
  height: 100vh;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
}
.fullpage > section {
  height: 100vh;
  scroll-snap-align: start;
}

/* scroll-margin — fixedヘッダーのオフセット */
[id] {
  scroll-margin-top: 80px;
  /* アンカーリンクでfixedヘッダー分ずらす */
}

/* overscroll-behavior — スクロールチェーン防止 */
.modal-content {
  overflow-y: auto;
  overscroll-behavior: contain;
  /* モーダル内スクロールが背景に伝播しない */
}`,
      },
    ],
  },
];
