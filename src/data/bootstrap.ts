export interface BootstrapSection {
  title: string;
  content: string;
  code?: string;
}

export interface BootstrapChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: BootstrapSection[];
}

export const bootstrapCategories = [
  { id: "basics", name: "基礎・導入", color: "var(--color-dads-purple)" },
  { id: "layout", name: "レイアウト", color: "var(--color-dads-blue)" },
  { id: "content", name: "コンテンツ・タイポグラフィ", color: "var(--color-dads-cyan)" },
  { id: "components", name: "コンポーネント", color: "var(--color-dads-success)" },
  { id: "forms", name: "フォーム", color: "var(--color-dads-warning)" },
  { id: "utilities", name: "ユーティリティ", color: "var(--color-dads-error)" },
  { id: "advanced", name: "カスタマイズ・実践", color: "var(--color-dads-navy)" },
] as const;

export const bootstrapChapters: BootstrapChapter[] = [
  // ===== 基礎・導入 =====
  {
    id: "introduction",
    title: "Bootstrapの導入",
    category: "basics",
    description:
      "Bootstrapの概要、CDN・npm導入方法、基本テンプレート、バージョン5の特徴を理解する",
    sections: [
      {
        title: "Bootstrapとは",
        content:
          "Bootstrap は Twitter 社が開発したオープンソースの CSS フレームワークです。レスポンシブデザイン、豊富なコンポーネント、ユーティリティクラスを提供し、素早くモダンなWebサイトを構築できます。Bootstrap 5 では jQuery 依存が廃止され、Vanilla JavaScript のみで動作します。モバイルファーストのアプローチを採用し、あらゆるデバイスに対応したレイアウトを簡単に作成できます。",
        code: `<!-- CDN で Bootstrap 5 を導入 -->
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Bootstrap 入門</title>
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
        rel="stylesheet">
</head>
<body>
  <div class="container">
    <h1 class="mt-5">Hello, Bootstrap!</h1>
    <p class="lead">Bootstrap 5 で構築されたページです。</p>
    <button class="btn btn-primary">ボタン</button>
  </div>

  <!-- Bootstrap JS（Popper.js 同梱版） -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`,
      },
      {
        title: "npmでの導入とビルド",
        content:
          "プロジェクトで Bootstrap を npm で管理する方法です。npm install bootstrap でインストールし、Sass を使えば変数のカスタマイズやツリーシェイキングで必要なコンポーネントだけを取り込めます。Vite、Webpack、Parcel などのバンドラーと組み合わせて使用するのが一般的です。JavaScript コンポーネントは個別にインポートできるため、バンドルサイズを最適化できます。",
        code: `# npm でインストール
npm install bootstrap @popperjs/core

# Sass コンパイラ（必要に応じて）
npm install -D sass

/* ===== main.scss — Sass でカスタマイズ ===== */
/* 変数を先に上書きしてからインポート */
$primary: #6f42c1;
$border-radius: 0.5rem;

/* Bootstrap 全体を読み込み */
@import "bootstrap/scss/bootstrap";

/* または必要な部分だけ読み込み */
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/grid";
@import "bootstrap/scss/utilities";
@import "bootstrap/scss/buttons";

/* ===== main.js — JS コンポーネントの個別インポート ===== */
// import { Modal, Tooltip } from 'bootstrap';
// const myModal = new Modal('#myModal');`,
      },
      {
        title: "ブレークポイントとモバイルファースト",
        content:
          "Bootstrap はモバイルファーストのブレークポイントシステムを採用しています。デフォルトで6段階のブレークポイント（xs, sm, md, lg, xl, xxl）が定義され、グリッドシステムやユーティリティクラスで使用できます。すべてのスタイルはまずモバイル向けに書かれ、min-width メディアクエリで大きい画面向けのスタイルが追加されます。",
        code: `/* Bootstrap 5 のブレークポイント */
/* xs:  0px 以上（デフォルト、接頭辞なし）*/
/* sm:  576px 以上  — スマートフォン横向き */
/* md:  768px 以上  — タブレット */
/* lg:  992px 以上  — デスクトップ */
/* xl:  1200px 以上 — ワイドデスクトップ */
/* xxl: 1400px 以上 — 超ワイド */

<!-- レスポンシブなクラスの例 -->
<!-- sm以上で2列、md以上で3列、lg以上で4列 -->
<div class="row">
  <div class="col-12 col-sm-6 col-md-4 col-lg-3">
    カラム1
  </div>
  <div class="col-12 col-sm-6 col-md-4 col-lg-3">
    カラム2
  </div>
  <div class="col-12 col-sm-6 col-md-4 col-lg-3">
    カラム3
  </div>
  <div class="col-12 col-sm-6 col-md-4 col-lg-3">
    カラム4
  </div>
</div>

<!-- 表示/非表示の切り替え -->
<div class="d-none d-md-block">タブレット以上で表示</div>
<div class="d-md-none">モバイルのみ表示</div>`,
      },
    ],
  },
  {
    id: "colors-theme",
    title: "テーマカラーとカラーモード",
    category: "basics",
    description:
      "Bootstrap のテーマカラー体系、テキスト・背景色クラス、ダークモード対応を学ぶ",
    sections: [
      {
        title: "テーマカラー",
        content:
          "Bootstrap にはセマンティックなテーマカラーが定義されています。primary（青）、secondary（グレー）、success（緑）、danger（赤）、warning（黄）、info（水色）、light、dark の8色が基本です。これらはボタン、アラート、バッジなど多くのコンポーネントで一貫して使用でき、Sass 変数でカスタマイズ可能です。",
        code: `<!-- テーマカラーの適用例 -->

<!-- 背景色 -->
<div class="bg-primary text-white p-3">Primary</div>
<div class="bg-secondary text-white p-3">Secondary</div>
<div class="bg-success text-white p-3">Success</div>
<div class="bg-danger text-white p-3">Danger</div>
<div class="bg-warning text-dark p-3">Warning</div>
<div class="bg-info text-dark p-3">Info</div>

<!-- テキスト色 -->
<p class="text-primary">Primary テキスト</p>
<p class="text-success">Success テキスト</p>
<p class="text-danger">Danger テキスト</p>
<p class="text-muted">Muted テキスト（薄いグレー）</p>

<!-- 微妙な背景色（subtle） -->
<div class="bg-primary-subtle text-primary-emphasis p-3">
  薄い Primary 背景
</div>
<div class="bg-danger-subtle text-danger-emphasis p-3">
  薄い Danger 背景
</div>

/* Sass でテーマカラーをカスタマイズ */
$theme-colors: (
  "primary":   #6f42c1,
  "secondary": #6c757d,
  "success":   #198754,
  "danger":    #dc3545,
  "custom":    #ff6b6b,  /* カスタム色の追加 */
);`,
      },
      {
        title: "カラーモード（ダークモード）",
        content:
          "Bootstrap 5.3 からカラーモードが公式サポートされました。data-bs-theme 属性を html 要素に指定するだけで、ダーク/ライトモードを切り替えられます。コンポーネント単位での切り替えも可能で、ページの一部だけをダークモードにすることもできます。prefers-color-scheme メディアクエリと組み合わせてOS設定に自動対応させることもできます。",
        code: `<!-- ライトモード（デフォルト） -->
<html lang="ja" data-bs-theme="light">

<!-- ダークモード -->
<html lang="ja" data-bs-theme="dark">

<!-- コンポーネント単位でのモード切替 -->
<div data-bs-theme="dark" class="p-4 bg-body">
  <h5 class="text-body">この部分だけダークモード</h5>
  <button class="btn btn-primary">ボタン</button>
</div>

<!-- JavaScript での切替 -->
<script>
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-bs-theme');
  html.setAttribute('data-bs-theme',
    current === 'dark' ? 'light' : 'dark'
  );
}
</script>

<!-- OS 設定に自動対応 -->
<script>
const prefersDark = window.matchMedia(
  '(prefers-color-scheme: dark)'
).matches;
document.documentElement.setAttribute(
  'data-bs-theme', prefersDark ? 'dark' : 'light'
);
</script>

<!-- bg-body / text-body はモードに応じて自動変化 -->
<div class="bg-body text-body">
  モードに応じて背景・テキスト色が変わる
</div>`,
      },
      {
        title: "背景グラデーションと透明度",
        content:
          "Bootstrap はグラデーント背景やテキスト・背景の透明度調整もユーティリティクラスで提供しています。bg-gradient クラスでグラデーションを追加でき、bg-opacity-* や text-opacity-* で透明度を0〜100の範囲で指定できます。link-* クラスはリンクに色を適用し、ホバー時のスタイルも自動で設定されます。",
        code: `<!-- グラデーション背景 -->
<div class="bg-primary bg-gradient text-white p-3">
  Primary グラデーション
</div>
<div class="bg-danger bg-gradient text-white p-3">
  Danger グラデーション
</div>

<!-- 背景の透明度 -->
<div class="bg-primary bg-opacity-75 text-white p-3">75%</div>
<div class="bg-primary bg-opacity-50 text-white p-3">50%</div>
<div class="bg-primary bg-opacity-25 p-3">25%</div>
<div class="bg-primary bg-opacity-10 p-3">10%</div>

<!-- テキストの透明度 -->
<p class="text-primary text-opacity-75">75% Primary</p>
<p class="text-primary text-opacity-50">50% Primary</p>

<!-- リンク色 -->
<a href="#" class="link-primary">Primary リンク</a>
<a href="#" class="link-danger">Danger リンク</a>
<a href="#" class="link-body-emphasis">Body emphasis リンク</a>

<!-- リンクの下線制御 -->
<a href="#" class="link-underline-primary">
  Primary 下線付きリンク
</a>
<a href="#" class="link-underline-opacity-0
  link-underline-opacity-100-hover">
  ホバーで下線が表示されるリンク
</a>`,
      },
    ],
  },

  // ===== レイアウト =====
  {
    id: "grid-system",
    title: "グリッドシステム",
    category: "layout",
    description:
      "12列グリッド、container、row/col、レスポンシブ列指定、オフセット、入れ子を使いこなす",
    sections: [
      {
        title: "コンテナとグリッドの基本",
        content:
          "Bootstrap のグリッドシステムは12列ベースで、container → row → col の構造で使います。container はコンテンツの最大幅を制御し、container-fluid で全幅、container-{bp} でブレークポイント以上で固定幅になります。row は列のラッパーで負のマージンを持ち、col はその中に配置するカラムです。col に数値を指定すると12列中の占有数を決められます。",
        code: `<!-- コンテナの種類 -->
<div class="container">固定幅（ブレークポイント毎に変化）</div>
<div class="container-fluid">常に100%幅</div>
<div class="container-md">md以上で固定幅</div>

<!-- 基本的なグリッド -->
<div class="container">
  <div class="row">
    <div class="col-4">4列分（1/3）</div>
    <div class="col-4">4列分（1/3）</div>
    <div class="col-4">4列分（1/3）</div>
  </div>
</div>

<!-- 均等分割（数値なし） -->
<div class="row">
  <div class="col">均等</div>
  <div class="col">均等</div>
  <div class="col">均等</div>
</div>

<!-- 1つだけサイズ指定 -->
<div class="row">
  <div class="col">残り</div>
  <div class="col-6">6列固定</div>
  <div class="col">残り</div>
</div>

<!-- col-auto: コンテンツ幅に自動調整 -->
<div class="row">
  <div class="col-auto">コンテンツに合わせた幅</div>
  <div class="col">残りの空間</div>
</div>`,
      },
      {
        title: "レスポンシブ列とオフセット",
        content:
          "レスポンシブなグリッドは col-{bp}-{n} の形式で指定します。小さい画面では積み重ね、大きい画面で横並びにするパターンが一般的です。offset-{bp}-{n} で列のオフセット（左余白）を追加でき、中央配置などのレイアウトに活用できます。order-{bp}-{n} で表示順序の変更も可能です。",
        code: `<!-- レスポンシブグリッド -->
<!-- モバイル: 1列 → sm: 2列 → lg: 4列 -->
<div class="row">
  <div class="col-12 col-sm-6 col-lg-3">カード1</div>
  <div class="col-12 col-sm-6 col-lg-3">カード2</div>
  <div class="col-12 col-sm-6 col-lg-3">カード3</div>
  <div class="col-12 col-sm-6 col-lg-3">カード4</div>
</div>

<!-- オフセット — 列を右にずらす -->
<div class="row">
  <div class="col-md-6 offset-md-3">
    中央配置（3列空けて6列分）
  </div>
</div>

<!-- マージンの自動配分で中央配置 -->
<div class="row">
  <div class="col-md-4 mx-auto">mx-auto で中央</div>
</div>

<!-- order — 表示順序の変更 -->
<div class="row">
  <div class="col order-3">HTML上は1番目、表示は3番目</div>
  <div class="col order-1">HTML上は2番目、表示は1番目</div>
  <div class="col order-2">HTML上は3番目、表示は2番目</div>
</div>

<!-- order-first / order-last -->
<div class="row">
  <div class="col order-last">最後に表示</div>
  <div class="col">通常</div>
  <div class="col order-first">最初に表示</div>
</div>`,
      },
      {
        title: "Gutterと入れ子グリッド",
        content:
          "Gutter はカラム間のパディング（余白）です。g-{n}（全方向）、gx-{n}（水平）、gy-{n}（垂直）で指定し、0〜5の値をとります。g-0 で余白なしにできます。グリッドの入れ子は col の中に新たな row を配置して実現します。row-cols-{n} で行あたりの列数を一括指定できる便利なクラスもあります。",
        code: `<!-- Gutter（カラム間の余白） -->
<div class="row g-4">
  <!-- 全方向に gutter: 1.5rem -->
  <div class="col-6">カラム</div>
  <div class="col-6">カラム</div>
</div>

<!-- 水平 gutter のみ -->
<div class="row gx-5">
  <div class="col-4">左</div>
  <div class="col-4">中</div>
  <div class="col-4">右</div>
</div>

<!-- Gutter なし -->
<div class="row g-0">
  <div class="col-6">隙間なし</div>
  <div class="col-6">隙間なし</div>
</div>

<!-- 入れ子グリッド -->
<div class="row">
  <div class="col-8">
    レベル1
    <div class="row">
      <div class="col-6">入れ子 L</div>
      <div class="col-6">入れ子 R</div>
    </div>
  </div>
  <div class="col-4">サイドバー</div>
</div>

<!-- row-cols: 行あたりの列数を一括指定 -->
<div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
  <div class="col">自動幅1</div>
  <div class="col">自動幅2</div>
  <div class="col">自動幅3</div>
  <div class="col">自動幅4</div>
</div>`,
      },
    ],
  },
  {
    id: "flex-utilities",
    title: "Flexユーティリティ",
    category: "layout",
    description:
      "d-flex、方向、配置、折り返し、grow/shrink、align-self をクラスで操作する",
    sections: [
      {
        title: "Flexboxの有効化と方向",
        content:
          "Bootstrap では d-flex / d-inline-flex でFlexboxを有効化し、flex-row / flex-column で方向を切り替えます。すべてのFlexユーティリティにはレスポンシブ版（d-{bp}-flex、flex-{bp}-row など）があり、ブレークポイントに応じてレイアウトを変更できます。flex-row-reverse / flex-column-reverse で逆方向にもできます。",
        code: `<!-- Flex の有効化 -->
<div class="d-flex">Flexbox コンテナ</div>
<div class="d-inline-flex">インライン Flex</div>

<!-- 方向 -->
<div class="d-flex flex-row">横並び（デフォルト）</div>
<div class="d-flex flex-column">縦並び</div>
<div class="d-flex flex-row-reverse">横並び（逆順）</div>
<div class="d-flex flex-column-reverse">縦並び（逆順）</div>

<!-- レスポンシブ対応 -->
<!-- モバイル: 縦並び → md以上: 横並び -->
<div class="d-flex flex-column flex-md-row gap-3">
  <div class="p-3 bg-primary text-white">項目1</div>
  <div class="p-3 bg-secondary text-white">項目2</div>
  <div class="p-3 bg-success text-white">項目3</div>
</div>

<!-- gap — Flex/Grid アイテム間のスペース -->
<div class="d-flex gap-1">gap: 0.25rem</div>
<div class="d-flex gap-2">gap: 0.5rem</div>
<div class="d-flex gap-3">gap: 1rem</div>
<div class="d-flex gap-4">gap: 1.5rem</div>
<div class="d-flex gap-5">gap: 3rem</div>`,
      },
      {
        title: "配置と折り返し",
        content:
          "justify-content-* で主軸方向、align-items-* で交差軸方向の配置を制御します。start / center / end / between / around / evenly が使えます。flex-wrap で折り返しを有効にし、align-content-* で複数行の配置を制御します。これらすべてにレスポンシブ版があり、画面サイズに応じた柔軟な配置が可能です。",
        code: `<!-- justify-content — 主軸方向 -->
<div class="d-flex justify-content-start">左寄せ</div>
<div class="d-flex justify-content-center">中央</div>
<div class="d-flex justify-content-end">右寄せ</div>
<div class="d-flex justify-content-between">両端配置</div>
<div class="d-flex justify-content-around">均等余白</div>
<div class="d-flex justify-content-evenly">完全均等</div>

<!-- align-items — 交差軸方向 -->
<div class="d-flex align-items-start" style="height:100px">上揃え</div>
<div class="d-flex align-items-center" style="height:100px">中央</div>
<div class="d-flex align-items-end" style="height:100px">下揃え</div>
<div class="d-flex align-items-stretch" style="height:100px">伸縮</div>

<!-- flex-wrap — 折り返し -->
<div class="d-flex flex-wrap">折り返しあり</div>
<div class="d-flex flex-nowrap">折り返しなし</div>

<!-- align-self — 個別アイテムの配置 -->
<div class="d-flex" style="height: 100px">
  <div class="align-self-start">上</div>
  <div class="align-self-center">中央</div>
  <div class="align-self-end">下</div>
</div>

<!-- flex-grow / flex-shrink -->
<div class="d-flex">
  <div class="flex-grow-1">残り全部（grow）</div>
  <div class="flex-shrink-0">縮小しない</div>
</div>`,
      },
      {
        title: "Flexの実践パターン",
        content:
          "Bootstrap の Flex ユーティリティを組み合わせると、ヘッダー、ナビゲーション、カードレイアウト、フッターなど実用的なレイアウトを素早く構築できます。ms-auto（左マージン自動）で要素を右寄せしたり、flex-fill で均等幅にしたり、order-* で表示順を変更したりできます。",
        code: `<!-- ヘッダー: ロゴ左・ナビ右 -->
<header class="d-flex justify-content-between align-items-center p-3">
  <div class="fw-bold">ロゴ</div>
  <nav class="d-flex gap-3">
    <a href="#">ホーム</a>
    <a href="#">概要</a>
    <a href="#">連絡</a>
  </nav>
</header>

<!-- ナビ: 一部を右寄せ -->
<nav class="d-flex gap-2">
  <a href="#" class="btn btn-outline-primary">ホーム</a>
  <a href="#" class="btn btn-outline-primary">機能</a>
  <a href="#" class="btn btn-outline-primary ms-auto">ログイン</a>
  <a href="#" class="btn btn-primary">登録</a>
</nav>

<!-- 中央配置（縦横中央） -->
<div class="d-flex justify-content-center align-items-center"
     style="min-height: 50vh">
  <div class="text-center">
    <h2>縦横中央</h2>
    <p>Flex で簡単に実現</p>
  </div>
</div>

<!-- flex-fill: 均等幅のタブ -->
<div class="d-flex">
  <div class="flex-fill text-center p-3 bg-light border">タブ1</div>
  <div class="flex-fill text-center p-3 bg-light border">タブ2</div>
  <div class="flex-fill text-center p-3 bg-light border">タブ3</div>
</div>

<!-- モバイル: 縦積み → PC: 横並びサイドバー -->
<div class="d-flex flex-column flex-lg-row gap-4">
  <aside class="flex-shrink-0" style="width: 250px">サイドバー</aside>
  <main class="flex-grow-1">メインコンテンツ</main>
</div>`,
      },
    ],
  },

  // ===== コンテンツ・タイポグラフィ =====
  {
    id: "typography",
    title: "タイポグラフィ",
    category: "content",
    description:
      "見出し、本文、リード文、リスト、引用、テキストユーティリティを使いこなす",
    sections: [
      {
        title: "見出しとディスプレイ",
        content:
          "Bootstrap は h1〜h6 の見出しにスタイルを提供し、.h1〜.h6 クラスで任意の要素に見出しスタイルを適用できます。display-1〜display-6 はより大きく目立つ見出しで、ヒーローセクションに適しています。lead クラスはリード文（導入段落）を強調し、small や text-muted で補足情報を添えられます。",
        code: `<!-- 見出し -->
<h1>h1 見出し</h1>
<h2>h2 見出し</h2>
<h3>h3 見出し</h3>

<!-- クラスで見出しスタイルを適用 -->
<p class="h1">p要素にh1スタイル</p>
<span class="h3">spanにh3スタイル</span>

<!-- ディスプレイ見出し（より大きく） -->
<h1 class="display-1">Display 1</h1>
<h1 class="display-3">Display 3</h1>
<h1 class="display-6">Display 6</h1>

<!-- リード文 -->
<p class="lead">
  この段落はリード文として強調表示されます。
  通常のテキストより大きく、薄い色で表示されます。
</p>

<!-- 見出し + 補足 -->
<h3>
  メインタイトル
  <small class="text-body-secondary">補足テキスト</small>
</h3>

<!-- インライン装飾 -->
<p><mark>ハイライト</mark>テキスト</p>
<p><del>取り消し線</del></p>
<p><small>小さいテキスト</small></p>
<p><strong>太字</strong> と <em>イタリック</em></p>`,
      },
      {
        title: "テキストユーティリティ",
        content:
          "Bootstrap はテキストの配置、装飾、変換、折り返し、フォントサイズ/ウェイトなどを制御するユーティリティクラスを提供します。text-{bp}-start / center / end でレスポンシブな文字揃えが可能です。fs-1〜fs-6 でフォントサイズ、fw-bold / fw-light でフォントウェイト、lh-1 / lh-sm / lh-base / lh-lg で行の高さを制御できます。",
        code: `<!-- テキスト配置（レスポンシブ対応） -->
<p class="text-start">左揃え</p>
<p class="text-center">中央揃え</p>
<p class="text-end">右揃え</p>
<p class="text-md-center">md以上で中央揃え</p>

<!-- フォントサイズ (fs-1 が最大、fs-6 が最小) -->
<p class="fs-1">fs-1: 2.5rem</p>
<p class="fs-3">fs-3: 1.75rem</p>
<p class="fs-6">fs-6: 1rem（body と同じ）</p>

<!-- フォントウェイト -->
<p class="fw-bold">Bold (700)</p>
<p class="fw-semibold">Semibold (600)</p>
<p class="fw-normal">Normal (400)</p>
<p class="fw-light">Light (300)</p>

<!-- 行の高さ -->
<p class="lh-1">行の高さ 1</p>
<p class="lh-sm">行の高さ small (1.25)</p>
<p class="lh-base">行の高さ base (1.5)</p>
<p class="lh-lg">行の高さ large (2)</p>

<!-- テキスト装飾 -->
<p class="text-decoration-underline">下線</p>
<p class="text-decoration-line-through">取り消し線</p>
<p class="text-decoration-none">装飾なし</p>

<!-- テキスト変換 -->
<p class="text-uppercase">uppercase</p>
<p class="text-lowercase">LOWERCASE</p>
<p class="text-capitalize">capitalize each word</p>`,
      },
      {
        title: "リスト、引用、テキスト省略",
        content:
          "Bootstrap はリストのスタイル除去（list-unstyled）、インラインリスト（list-inline）、引用ブロック（blockquote）、テキスト省略（text-truncate）などを提供します。list-group はインタラクティブなリストコンポーネントとしても使えます。text-truncate は1行省略、line-clamp は複数行省略に使用します。",
        code: `<!-- リストスタイルの除去 -->
<ul class="list-unstyled">
  <li>マーカーなしリスト</li>
  <li>2番目</li>
  <li>3番目</li>
</ul>

<!-- インラインリスト -->
<ul class="list-inline">
  <li class="list-inline-item">項目1</li>
  <li class="list-inline-item">項目2</li>
  <li class="list-inline-item">項目3</li>
</ul>

<!-- 引用ブロック -->
<figure>
  <blockquote class="blockquote">
    <p>これは引用テキストです。</p>
  </blockquote>
  <figcaption class="blockquote-footer">
    出典: <cite>著者名</cite>
  </figcaption>
</figure>

<!-- テキスト省略（1行） -->
<p class="text-truncate" style="max-width: 200px;">
  この長いテキストは省略されて末尾に...が表示されます
</p>

<!-- テキスト折り返し -->
<p class="text-wrap">折り返しあり（デフォルト）</p>
<p class="text-nowrap">折り返しなし</p>
<p class="text-break">長い英単語をbreak-wordで折り返す</p>

<!-- font-monospace -->
<p class="font-monospace">等幅フォント: console.log("hello")</p>`,
      },
    ],
  },
  {
    id: "tables-images",
    title: "テーブルと画像",
    category: "content",
    description:
      "テーブルのスタイリング、ストライプ、ホバー、レスポンシブ対応、画像のフィットを学ぶ",
    sections: [
      {
        title: "テーブルスタイル",
        content:
          "Bootstrap の table クラスはテーブルに基本的なスタイルを適用します。table-striped（縞模様）、table-hover（ホバー効果）、table-bordered（枠線）を組み合わせてカスタマイズできます。table-sm でコンパクトに、テーマカラー（table-primary、table-danger など）で行や列を色付けできます。",
        code: `<!-- 基本テーブル -->
<table class="table">
  <thead>
    <tr>
      <th>#</th>
      <th>名前</th>
      <th>メール</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>田中太郎</td>
      <td>tanaka@example.com</td>
    </tr>
    <tr>
      <td>2</td>
      <td>鈴木花子</td>
      <td>suzuki@example.com</td>
    </tr>
  </tbody>
</table>

<!-- スタイルの組み合わせ -->
<table class="table table-striped table-hover table-bordered">
  ...
</table>

<!-- ダーク版テーブル -->
<table class="table table-dark table-striped">
  ...
</table>

<!-- コンパクト -->
<table class="table table-sm">...</table>

<!-- 行の色付け -->
<tr class="table-success">成功行</tr>
<tr class="table-danger">エラー行</tr>
<tr class="table-warning">警告行</tr>
<tr class="table-active">アクティブ行</tr>

<!-- ヘッダーの色 -->
<thead class="table-dark">...</thead>
<thead class="table-light">...</thead>`,
      },
      {
        title: "レスポンシブテーブルと画像",
        content:
          "table-responsive クラスで横スクロール可能なテーブルを作成でき、table-responsive-{bp} でブレークポイント以下でのみスクロールを有効にできます。画像には img-fluid（レスポンシブ）、rounded（角丸）、img-thumbnail（枠線付きサムネイル）などのクラスが用意されています。",
        code: `<!-- レスポンシブテーブル -->
<div class="table-responsive">
  <table class="table">
    <thead>
      <tr>
        <th>列1</th><th>列2</th><th>列3</th>
        <th>列4</th><th>列5</th><th>列6</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>データ1</td><td>データ2</td><td>データ3</td>
        <td>データ4</td><td>データ5</td><td>データ6</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- ブレークポイント指定 -->
<div class="table-responsive-md">
  <!-- md未満でのみ横スクロール -->
  <table class="table">...</table>
</div>

<!-- 画像 -->
<img src="photo.jpg" class="img-fluid" alt="レスポンシブ画像">
<!-- max-width: 100%; height: auto; -->

<img src="photo.jpg" class="img-thumbnail" alt="サムネイル">
<!-- 枠線 + 角丸 + パディング -->

<!-- 画像の角丸 -->
<img src="photo.jpg" class="rounded" alt="角丸">
<img src="photo.jpg" class="rounded-circle" alt="円形">
<img src="photo.jpg" class="rounded-pill" alt="カプセル型">

<!-- 画像の配置 -->
<img src="photo.jpg" class="d-block mx-auto" alt="中央配置">
<img src="photo.jpg" class="float-start" alt="左寄せ">`,
      },
      {
        title: "figure と object-fit",
        content:
          "figure 要素と figcaption を Bootstrap のクラスでスタイリングでき、画像にキャプションを付けるセマンティックな構造を作れます。object-fit ユーティリティで画像のフィット方法を制御でき、固定サイズのコンテナ内で画像をトリミングしたり全体表示したりできます。",
        code: `<!-- figure コンポーネント -->
<figure class="figure">
  <img src="photo.jpg" class="figure-img img-fluid rounded"
       alt="写真">
  <figcaption class="figure-caption">
    写真のキャプションテキスト
  </figcaption>
</figure>

<!-- キャプション右寄せ -->
<figure class="figure">
  <img src="photo.jpg" class="figure-img img-fluid rounded"
       alt="写真">
  <figcaption class="figure-caption text-end">
    右寄せキャプション
  </figcaption>
</figure>

<!-- object-fit ユーティリティ -->
<img src="photo.jpg" class="object-fit-cover"
     style="width: 200px; height: 200px" alt="cover">
<!-- contain / cover / fill / scale / none -->

<img src="photo.jpg" class="object-fit-contain border rounded"
     style="width: 200px; height: 200px" alt="contain">

<!-- レスポンシブ object-fit -->
<img class="object-fit-sm-cover" alt="sm以上でcover">

<!-- カードの画像にobject-fitを使う例 -->
<div class="card" style="width: 18rem">
  <img src="photo.jpg"
       class="card-img-top object-fit-cover"
       style="height: 180px" alt="カード画像">
  <div class="card-body">
    <p class="card-text">カードの内容</p>
  </div>
</div>`,
      },
    ],
  },

  // ===== コンポーネント =====
  {
    id: "buttons-badges",
    title: "ボタンとバッジ",
    category: "components",
    description:
      "ボタンの種類・サイズ・状態、ボタングループ、バッジの使い方を学ぶ",
    sections: [
      {
        title: "ボタンの種類とサイズ",
        content:
          "Bootstrap のボタンは btn クラスに btn-{color} で色を指定します。塗りつぶし（btn-primary）、アウトライン（btn-outline-primary）、リンク風（btn-link）の3種類があります。btn-lg / btn-sm でサイズを変更でき、w-100 でブロック幅ボタンを作成できます。a、button、input の各要素に適用可能です。",
        code: `<!-- 塗りつぶしボタン -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-danger">Danger</button>
<button class="btn btn-warning">Warning</button>
<button class="btn btn-info">Info</button>
<button class="btn btn-dark">Dark</button>
<button class="btn btn-light">Light</button>

<!-- アウトラインボタン -->
<button class="btn btn-outline-primary">Outline Primary</button>
<button class="btn btn-outline-danger">Outline Danger</button>

<!-- サイズ -->
<button class="btn btn-primary btn-lg">Large</button>
<button class="btn btn-primary">Default</button>
<button class="btn btn-primary btn-sm">Small</button>

<!-- ブロック幅ボタン -->
<div class="d-grid gap-2">
  <button class="btn btn-primary">ブロックボタン</button>
  <button class="btn btn-secondary">ブロックボタン</button>
</div>

<!-- md以上で横並び、それ以下でブロック -->
<div class="d-grid gap-2 d-md-flex">
  <button class="btn btn-primary">ボタン1</button>
  <button class="btn btn-secondary">ボタン2</button>
</div>

<!-- 状態 -->
<button class="btn btn-primary" disabled>無効化</button>
<button class="btn btn-primary active">アクティブ</button>`,
      },
      {
        title: "ボタングループとツールバー",
        content:
          "btn-group で複数のボタンを横並びにグループ化できます。btn-group-vertical で縦並びにもなります。btn-toolbar で複数のグループをまとめてツールバーを構成できます。ドロップダウンと組み合わせた分割ボタンも作成可能です。",
        code: `<!-- ボタングループ -->
<div class="btn-group" role="group">
  <button class="btn btn-primary">左</button>
  <button class="btn btn-primary">中</button>
  <button class="btn btn-primary">右</button>
</div>

<!-- アウトラインのグループ -->
<div class="btn-group" role="group">
  <button class="btn btn-outline-primary active">月</button>
  <button class="btn btn-outline-primary">週</button>
  <button class="btn btn-outline-primary">日</button>
</div>

<!-- 縦並び -->
<div class="btn-group-vertical" role="group">
  <button class="btn btn-primary">上</button>
  <button class="btn btn-primary">中</button>
  <button class="btn btn-primary">下</button>
</div>

<!-- ツールバー -->
<div class="btn-toolbar gap-2" role="toolbar">
  <div class="btn-group" role="group">
    <button class="btn btn-outline-secondary">B</button>
    <button class="btn btn-outline-secondary">I</button>
    <button class="btn btn-outline-secondary">U</button>
  </div>
  <div class="btn-group" role="group">
    <button class="btn btn-outline-secondary">L</button>
    <button class="btn btn-outline-secondary">C</button>
    <button class="btn btn-outline-secondary">R</button>
  </div>
</div>

<!-- サイズ -->
<div class="btn-group btn-group-sm">...</div>
<div class="btn-group btn-group-lg">...</div>`,
      },
      {
        title: "バッジ",
        content:
          "バッジはカウンターやラベルの表示に使います。badge クラスにテーマカラー（bg-primary など）を組み合わせます。rounded-pill で丸型バッジ、ボタン内に配置して通知カウンターとしても使用できます。position-absolute と translate-middle で要素の角にバッジを重ねるパターンも一般的です。",
        code: `<!-- 基本バッジ -->
<span class="badge bg-primary">Primary</span>
<span class="badge bg-secondary">Secondary</span>
<span class="badge bg-success">Success</span>
<span class="badge bg-danger">Danger</span>
<span class="badge bg-warning text-dark">Warning</span>
<span class="badge bg-info text-dark">Info</span>

<!-- 丸型バッジ -->
<span class="badge rounded-pill bg-primary">99+</span>
<span class="badge rounded-pill bg-danger">New</span>

<!-- 見出し内のバッジ -->
<h3>新機能 <span class="badge bg-success">New</span></h3>

<!-- ボタン内のカウンターバッジ -->
<button class="btn btn-primary">
  通知 <span class="badge bg-danger">4</span>
</button>

<!-- 位置付きバッジ（通知ドット） -->
<button class="btn btn-primary position-relative">
  メール
  <span class="position-absolute top-0 start-100 translate-middle
    badge rounded-pill bg-danger">
    99+
    <span class="visually-hidden">未読メッセージ</span>
  </span>
</button>

<!-- 通知ドット（数字なし） -->
<button class="btn btn-primary position-relative">
  通知
  <span class="position-absolute top-0 start-100 translate-middle
    p-2 bg-danger border border-light rounded-circle">
    <span class="visually-hidden">新着通知</span>
  </span>
</button>`,
      },
    ],
  },
  {
    id: "cards-alerts",
    title: "カードとアラート",
    category: "components",
    description:
      "カードコンポーネントのバリエーション、アラート、コールアウトの使い方を学ぶ",
    sections: [
      {
        title: "カードの基本",
        content:
          "カードは Bootstrap で最も汎用的なコンポーネントです。card-body がコンテンツ領域、card-title / card-text で構造化します。card-header / card-footer でヘッダー・フッターを追加でき、card-img-top / card-img-bottom で画像を配置します。list-group と組み合わせたリスト付きカードも作成できます。",
        code: `<!-- 基本カード -->
<div class="card" style="width: 18rem">
  <img src="image.jpg" class="card-img-top" alt="画像">
  <div class="card-body">
    <h5 class="card-title">カードタイトル</h5>
    <p class="card-text">カードの説明テキスト。</p>
    <a href="#" class="btn btn-primary">詳細を見る</a>
  </div>
</div>

<!-- ヘッダー・フッター付きカード -->
<div class="card">
  <div class="card-header">ヘッダー</div>
  <div class="card-body">
    <h5 class="card-title">タイトル</h5>
    <p class="card-text">本文テキスト</p>
  </div>
  <div class="card-footer text-body-secondary">
    2日前に更新
  </div>
</div>

<!-- リスト付きカード -->
<div class="card">
  <div class="card-header">メニュー</div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">項目1</li>
    <li class="list-group-item">項目2</li>
    <li class="list-group-item">項目3</li>
  </ul>
</div>

<!-- 色付きカード -->
<div class="card text-bg-primary mb-3">
  <div class="card-body">
    <h5 class="card-title">Primary カード</h5>
    <p class="card-text">テーマカラーの背景</p>
  </div>
</div>`,
      },
      {
        title: "カードレイアウト",
        content:
          "複数のカードをグリッドで並べるにはグリッドシステムと組み合わせます。card-group で同じ高さのカードを横並びにし、row-cols-* と h-100 で均等なカードグリッドを実現します。card-img-overlay で背景画像の上にテキストを重ねるオーバーレイカードも作成できます。",
        code: `<!-- カードグリッド（row-cols） -->
<div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
  <div class="col">
    <div class="card h-100">
      <img src="img1.jpg" class="card-img-top" alt="画像1">
      <div class="card-body">
        <h5 class="card-title">カード1</h5>
        <p class="card-text">説明テキスト</p>
      </div>
      <div class="card-footer">
        <small class="text-body-secondary">3分前</small>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">カード2</h5>
        <p class="card-text">長いテキスト...</p>
      </div>
    </div>
  </div>
</div>

<!-- カードグループ（同じ高さ・隙間なし） -->
<div class="card-group">
  <div class="card">...</div>
  <div class="card">...</div>
  <div class="card">...</div>
</div>

<!-- オーバーレイカード -->
<div class="card text-bg-dark">
  <img src="bg.jpg" class="card-img" alt="背景">
  <div class="card-img-overlay">
    <h5 class="card-title">画像の上にテキスト</h5>
    <p class="card-text">オーバーレイコンテンツ</p>
  </div>
</div>

<!-- 横向きカード -->
<div class="card mb-3">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="photo.jpg" class="img-fluid rounded-start" alt="写真">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">横向きカード</h5>
        <p class="card-text">画像とテキストが横並び</p>
      </div>
    </div>
  </div>
</div>`,
      },
      {
        title: "アラート",
        content:
          "アラートはフィードバックメッセージの表示に使います。テーマカラーで色分けし、alert-link で統一されたリンクスタイルを適用できます。alert-dismissible と btn-close で閉じるボタンを追加でき、JavaScript の Bootstrap Alert プラグインで制御します。アイコンとの組み合わせでより分かりやすいアラートになります。",
        code: `<!-- 基本アラート -->
<div class="alert alert-primary" role="alert">
  Primary アラートメッセージ
</div>
<div class="alert alert-success" role="alert">
  成功しました！
</div>
<div class="alert alert-danger" role="alert">
  エラーが発生しました。
</div>
<div class="alert alert-warning" role="alert">
  注意が必要です。
</div>

<!-- リンク付きアラート -->
<div class="alert alert-info" role="alert">
  詳細は<a href="#" class="alert-link">こちら</a>を参照。
</div>

<!-- 閉じるボタン付きアラート -->
<div class="alert alert-warning alert-dismissible fade show"
     role="alert">
  <strong>警告!</strong> この操作は取り消せません。
  <button type="button" class="btn-close"
          data-bs-dismiss="alert"></button>
</div>

<!-- 複雑なアラート -->
<div class="alert alert-success" role="alert">
  <h4 class="alert-heading">登録完了!</h4>
  <p>アカウントが正常に作成されました。</p>
  <hr>
  <p class="mb-0">
    <a href="/dashboard" class="alert-link">
      ダッシュボード
    </a>に移動して始めましょう。
  </p>
</div>`,
      },
    ],
  },
  {
    id: "navbar-nav",
    title: "ナビゲーション",
    category: "components",
    description:
      "Navbar、Nav、タブ、パンくずリスト、ページネーションのコンポーネントを活用する",
    sections: [
      {
        title: "Navbar",
        content:
          "Navbar は Bootstrap で最も使われるナビゲーションコンポーネントです。navbar-expand-{bp} でレスポンシブな折りたたみ、navbar-brand でロゴ、navbar-toggler でモバイルメニューボタンを配置します。bg-body-tertiary や navbar-dark bg-dark でテーマを設定し、container で幅を制限します。",
        code: `<!-- レスポンシブ Navbar -->
<nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container">
    <!-- ロゴ -->
    <a class="navbar-brand" href="#">MySite</a>

    <!-- モバイルメニューボタン -->
    <button class="navbar-toggler" type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navContent">
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- ナビゲーションリンク -->
    <div class="collapse navbar-collapse" id="navContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" href="#">ホーム</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">機能</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#"
             data-bs-toggle="dropdown">その他</a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">項目1</a></li>
            <li><a class="dropdown-item" href="#">項目2</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">項目3</a></li>
          </ul>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search"
               placeholder="検索">
        <button class="btn btn-outline-success">検索</button>
      </form>
    </div>
  </div>
</nav>`,
      },
      {
        title: "Navとタブ",
        content:
          "nav コンポーネントはシンプルなナビゲーションを提供します。nav-tabs でタブ、nav-pills でピル型ナビゲーションを作成できます。tab-content と tab-pane を組み合わせてタブ切替コンテンツを実装します。nav-fill で均等幅、nav-justified で均等幅+余白なしのナビゲーションが作れます。",
        code: `<!-- タブナビゲーション -->
<ul class="nav nav-tabs" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" data-bs-toggle="tab"
            data-bs-target="#home" type="button">ホーム</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" data-bs-toggle="tab"
            data-bs-target="#profile" type="button">プロフィール</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" data-bs-toggle="tab"
            data-bs-target="#contact" type="button">連絡先</button>
  </li>
</ul>
<div class="tab-content p-3 border border-top-0">
  <div class="tab-pane fade show active" id="home">
    ホームの内容
  </div>
  <div class="tab-pane fade" id="profile">
    プロフィールの内容
  </div>
  <div class="tab-pane fade" id="contact">
    連絡先の内容
  </div>
</div>

<!-- ピル型ナビ -->
<ul class="nav nav-pills">
  <li class="nav-item">
    <a class="nav-link active" href="#">アクティブ</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">リンク</a>
  </li>
</ul>

<!-- 均等幅 -->
<ul class="nav nav-pills nav-fill">...</ul>
<ul class="nav nav-pills nav-justified">...</ul>`,
      },
      {
        title: "パンくずリストとページネーション",
        content:
          "パンくずリスト（breadcrumb）はサイト階層のナビゲーションを提供します。ページネーション（pagination）はページ分割ナビゲーションで、サイズやアクティブ/無効状態のスタイルが用意されています。どちらもアクセシビリティのための aria 属性を正しく設定することが推奨されます。",
        code: `<!-- パンくずリスト -->
<nav aria-label="パンくず">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">ホーム</a></li>
    <li class="breadcrumb-item"><a href="#">カテゴリ</a></li>
    <li class="breadcrumb-item active" aria-current="page">
      現在のページ
    </li>
  </ol>
</nav>

<!-- 区切り文字の変更（CSS変数） -->
<style>
  .breadcrumb {
    --bs-breadcrumb-divider: '>';
  }
</style>

<!-- ページネーション -->
<nav aria-label="ページナビゲーション">
  <ul class="pagination">
    <li class="page-item disabled">
      <a class="page-link" href="#">&laquo; 前へ</a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item active">
      <a class="page-link" href="#">2</a>
    </li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#">次へ &raquo;</a>
    </li>
  </ul>
</nav>

<!-- サイズ -->
<ul class="pagination pagination-sm">...</ul>
<ul class="pagination pagination-lg">...</ul>

<!-- 中央配置 -->
<ul class="pagination justify-content-center">...</ul>`,
      },
    ],
  },

  // ===== フォーム =====
  {
    id: "form-controls",
    title: "フォームコントロール",
    category: "forms",
    description:
      "テキスト入力、セレクト、チェックボックス、ラジオ、range、ファイル入力を実装する",
    sections: [
      {
        title: "テキスト入力とラベル",
        content:
          "Bootstrap のフォームコントロールは form-control クラスで統一されたスタイルを適用します。form-label でラベル、form-text で補足テキストを表示します。form-control-lg / form-control-sm でサイズ変更、form-control-plaintext で読み取り専用の平文表示ができます。フローティングラベルも Bootstrap 5 で追加されました。",
        code: `<!-- 基本のテキスト入力 -->
<div class="mb-3">
  <label for="email" class="form-label">メールアドレス</label>
  <input type="email" class="form-control" id="email"
         placeholder="name@example.com">
  <div class="form-text">メールアドレスは公開されません。</div>
</div>

<!-- テキストエリア -->
<div class="mb-3">
  <label for="message" class="form-label">メッセージ</label>
  <textarea class="form-control" id="message" rows="3"></textarea>
</div>

<!-- サイズ -->
<input class="form-control form-control-lg" placeholder="Large">
<input class="form-control" placeholder="Default">
<input class="form-control form-control-sm" placeholder="Small">

<!-- 読み取り専用 -->
<input class="form-control" value="読み取り専用" readonly>
<input class="form-control-plaintext" value="平文表示" readonly>

<!-- 無効化 -->
<input class="form-control" value="無効" disabled>

<!-- フローティングラベル -->
<div class="form-floating mb-3">
  <input type="email" class="form-control" id="floatEmail"
         placeholder="name@example.com">
  <label for="floatEmail">メールアドレス</label>
</div>
<div class="form-floating">
  <textarea class="form-control" id="floatMsg"
            placeholder="メッセージ" style="height: 100px"></textarea>
  <label for="floatMsg">メッセージ</label>
</div>`,
      },
      {
        title: "セレクトとチェックボックス",
        content:
          "セレクトボックスは form-select クラスで Bootstrap スタイルを適用します。チェックボックスとラジオボタンは form-check クラスでラッピングし、form-check-input と form-check-label を使います。form-check-inline で横並び、form-switch でスイッチスタイルに変更できます。",
        code: `<!-- セレクトボックス -->
<select class="form-select mb-3">
  <option selected>選択してください</option>
  <option value="1">オプション1</option>
  <option value="2">オプション2</option>
  <option value="3">オプション3</option>
</select>

<!-- セレクトサイズ -->
<select class="form-select form-select-lg">...</select>
<select class="form-select form-select-sm">...</select>

<!-- 複数選択 -->
<select class="form-select" multiple>...</select>

<!-- チェックボックス -->
<div class="form-check">
  <input class="form-check-input" type="checkbox" id="check1">
  <label class="form-check-label" for="check1">同意する</label>
</div>

<!-- ラジオボタン -->
<div class="form-check">
  <input class="form-check-input" type="radio" name="plan"
         id="plan1" checked>
  <label class="form-check-label" for="plan1">無料プラン</label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="plan"
         id="plan2">
  <label class="form-check-label" for="plan2">有料プラン</label>
</div>

<!-- インライン -->
<div class="form-check form-check-inline">
  <input class="form-check-input" type="checkbox" id="i1">
  <label class="form-check-label" for="i1">A</label>
</div>

<!-- スイッチ -->
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="sw1">
  <label class="form-check-label" for="sw1">通知ON/OFF</label>
</div>`,
      },
      {
        title: "Range、ファイル、カラー入力",
        content:
          "range 入力は form-range クラスで Bootstrap スタイルのスライダーになります。ファイル入力は form-control でスタイリングされ、multiple 属性で複数ファイル選択が可能です。カラーピッカーは form-control-color クラスで統一されたスタイルを適用します。input-group で入力とアドオン（テキスト・ボタン）を組み合わせることもできます。",
        code: `<!-- Range スライダー -->
<label for="volume" class="form-label">音量</label>
<input type="range" class="form-range" id="volume"
       min="0" max="100" step="5">

<!-- ファイル入力 -->
<div class="mb-3">
  <label for="file" class="form-label">ファイルを選択</label>
  <input class="form-control" type="file" id="file">
</div>

<!-- 複数ファイル -->
<input class="form-control" type="file" multiple>

<!-- カラーピッカー -->
<label for="color" class="form-label">テーマカラー</label>
<input type="color" class="form-control form-control-color"
       id="color" value="#6f42c1">

<!-- Input Group — アドオン付き入力 -->
<div class="input-group mb-3">
  <span class="input-group-text">@</span>
  <input type="text" class="form-control" placeholder="ユーザー名">
</div>

<div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="検索...">
  <button class="btn btn-primary">検索</button>
</div>

<div class="input-group">
  <span class="input-group-text">¥</span>
  <input type="number" class="form-control" placeholder="金額">
  <span class="input-group-text">.00</span>
</div>

<!-- サイズ -->
<div class="input-group input-group-lg">...</div>
<div class="input-group input-group-sm">...</div>`,
      },
    ],
  },
  {
    id: "form-layout-validation",
    title: "フォームレイアウトとバリデーション",
    category: "forms",
    description:
      "フォームのグリッドレイアウト、水平フォーム、バリデーションスタイルを実装する",
    sections: [
      {
        title: "フォームレイアウト",
        content:
          "Bootstrap のグリッドシステムを使ってフォームのレイアウトを構成できます。row と col-* でフィールドを横並びに配置し、水平フォーム（ラベルと入力が横並び）は row と col-form-label で実現します。col-auto でフィールドをコンテンツ幅にしたり、align-items-center で縦位置を揃えたりできます。",
        code: `<!-- グリッドフォーム（2列） -->
<form>
  <div class="row mb-3">
    <div class="col-md-6">
      <label for="firstName" class="form-label">姓</label>
      <input type="text" class="form-control" id="firstName">
    </div>
    <div class="col-md-6">
      <label for="lastName" class="form-label">名</label>
      <input type="text" class="form-control" id="lastName">
    </div>
  </div>
  <div class="mb-3">
    <label for="address" class="form-label">住所</label>
    <input type="text" class="form-control" id="address">
  </div>
  <div class="row mb-3">
    <div class="col-md-5">
      <label class="form-label">市区町村</label>
      <input type="text" class="form-control">
    </div>
    <div class="col-md-4">
      <label class="form-label">都道府県</label>
      <select class="form-select">
        <option>選択...</option>
      </select>
    </div>
    <div class="col-md-3">
      <label class="form-label">郵便番号</label>
      <input type="text" class="form-control">
    </div>
  </div>
</form>

<!-- 水平フォーム（ラベル横） -->
<form>
  <div class="row mb-3">
    <label for="hEmail" class="col-sm-3 col-form-label">
      メール
    </label>
    <div class="col-sm-9">
      <input type="email" class="form-control" id="hEmail">
    </div>
  </div>
  <div class="row mb-3">
    <label for="hPass" class="col-sm-3 col-form-label">
      パスワード
    </label>
    <div class="col-sm-9">
      <input type="password" class="form-control" id="hPass">
    </div>
  </div>
</form>`,
      },
      {
        title: "インラインフォームとフローティングラベル",
        content:
          "インラインフォームは row と col-auto / row-cols-lg-auto を使って1行に収める方法です。フローティングラベルは入力フィールド内にラベルが浮かんで表示され、フォーカスや入力時にラベルが小さくなって上に移動します。モダンなフォームデザインに活用でき、省スペースで見た目もすっきりします。",
        code: `<!-- インラインフォーム -->
<form class="row row-cols-lg-auto g-3 align-items-center">
  <div class="col-12">
    <label class="visually-hidden" for="inlineUser">ユーザー名</label>
    <div class="input-group">
      <span class="input-group-text">@</span>
      <input type="text" class="form-control" id="inlineUser"
             placeholder="ユーザー名">
    </div>
  </div>
  <div class="col-12">
    <label class="visually-hidden" for="inlineCity">都市</label>
    <select class="form-select" id="inlineCity">
      <option>都市を選択...</option>
      <option>東京</option>
      <option>大阪</option>
    </select>
  </div>
  <div class="col-12">
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="inlineAgree">
      <label class="form-check-label" for="inlineAgree">同意</label>
    </div>
  </div>
  <div class="col-12">
    <button type="submit" class="btn btn-primary">送信</button>
  </div>
</form>

<!-- フローティングラベル -->
<div class="form-floating mb-3">
  <input type="email" class="form-control" id="fEmail"
         placeholder="name@example.com">
  <label for="fEmail">メールアドレス</label>
</div>
<div class="form-floating mb-3">
  <input type="password" class="form-control" id="fPass"
         placeholder="パスワード">
  <label for="fPass">パスワード</label>
</div>
<div class="form-floating mb-3">
  <select class="form-select" id="fSelect">
    <option>選択してください</option>
    <option value="1">オプション1</option>
  </select>
  <label for="fSelect">カテゴリ</label>
</div>`,
      },
      {
        title: "バリデーション",
        content:
          "Bootstrap はフォームバリデーションのスタイルを提供します。is-valid / is-invalid クラスで入力フィールドの状態を示し、valid-feedback / invalid-feedback でメッセージを表示します。HTML5 のネイティブバリデーションを活用するか、JavaScript でカスタムバリデーションを実装できます。needs-validation と novalidate を組み合わせてカスタムバリデーションを構築するのが一般的です。",
        code: `<!-- バリデーションスタイル -->
<!-- 成功 -->
<div class="mb-3">
  <label class="form-label">ユーザー名</label>
  <input type="text" class="form-control is-valid"
         value="naoki">
  <div class="valid-feedback">利用可能です！</div>
</div>

<!-- エラー -->
<div class="mb-3">
  <label class="form-label">メール</label>
  <input type="email" class="form-control is-invalid">
  <div class="invalid-feedback">
    有効なメールアドレスを入力してください。
  </div>
</div>

<!-- カスタムバリデーション -->
<form class="needs-validation" novalidate>
  <div class="mb-3">
    <label for="vName" class="form-label">名前</label>
    <input type="text" class="form-control" id="vName" required>
    <div class="invalid-feedback">名前は必須です。</div>
  </div>
  <div class="mb-3">
    <label for="vEmail" class="form-label">メール</label>
    <input type="email" class="form-control" id="vEmail" required>
    <div class="invalid-feedback">
      有効なメールアドレスを入力してください。
    </div>
  </div>
  <button class="btn btn-primary" type="submit">送信</button>
</form>

<script>
// カスタムバリデーション JavaScript
document.querySelectorAll('.needs-validation')
  .forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    });
  });
</script>`,
      },
    ],
  },

  // ===== ユーティリティ =====
  {
    id: "spacing-sizing",
    title: "スペーシングとサイジング",
    category: "utilities",
    description:
      "margin/padding ユーティリティ、width/height、最大幅、ビューポート単位を使いこなす",
    sections: [
      {
        title: "マージンとパディング",
        content:
          "Bootstrap のスペーシングユーティリティは {property}{sides}-{size} の形式です。property は m（margin）/p（padding）、sides は t/b/s/e/x/y（top/bottom/start/end/水平/垂直）、size は 0〜5 と auto です。レスポンシブ版（m{sides}-{bp}-{size}）も全て利用でき、画面サイズに応じた余白調整ができます。",
        code: `<!-- マージン -->
<div class="mt-3">margin-top: 1rem</div>
<div class="mb-4">margin-bottom: 1.5rem</div>
<div class="ms-2">margin-start(left): 0.5rem</div>
<div class="me-auto">margin-end: auto（右寄せの解除）</div>
<div class="mx-3">margin 左右: 1rem</div>
<div class="my-5">margin 上下: 3rem</div>
<div class="mx-auto" style="width:200px">中央配置</div>

<!-- パディング -->
<div class="p-3">padding 全方向: 1rem</div>
<div class="pt-2">padding-top: 0.5rem</div>
<div class="px-4">padding 左右: 1.5rem</div>
<div class="py-5">padding 上下: 3rem</div>

<!-- サイズ一覧 -->
<!-- 0: 0       -->
<!-- 1: 0.25rem (4px)  -->
<!-- 2: 0.5rem  (8px)  -->
<!-- 3: 1rem    (16px) -->
<!-- 4: 1.5rem  (24px) -->
<!-- 5: 3rem    (48px) -->

<!-- レスポンシブスペーシング -->
<div class="p-2 p-md-4 p-lg-5">
  モバイル: p-2, タブレット: p-4, デスクトップ: p-5
</div>

<!-- 負のマージン -->
<div class="mt-n3">margin-top: -1rem</div>`,
      },
      {
        title: "幅と高さ",
        content:
          "w-{value} と h-{value} で幅と高さを指定します。25, 50, 75, 100, auto の5段階に加え、mw-100（最大幅100%）、mh-100（最大高さ100%）があります。ビューポート単位の vw-100、vh-100、min-vw-100、min-vh-100 も利用可能です。これらはレイアウトの微調整に頻繁に使われます。",
        code: `<!-- 幅ユーティリティ -->
<div class="w-25">25%</div>
<div class="w-50">50%</div>
<div class="w-75">75%</div>
<div class="w-100">100%</div>
<div class="w-auto">auto</div>

<!-- 高さユーティリティ -->
<div style="height: 200px">
  <div class="h-25 bg-primary text-white">25%</div>
  <div class="h-50 bg-secondary text-white">50%</div>
</div>

<!-- 最大幅 / 最大高さ -->
<img src="photo.jpg" class="mw-100" alt="最大幅100%">
<div class="mh-100">最大高さ100%</div>

<!-- ビューポート単位 -->
<div class="vw-100">ビューポート幅100%</div>
<div class="vh-100">ビューポート高さ100%</div>
<div class="min-vw-100">最小ビューポート幅100%</div>
<div class="min-vh-100">最小ビューポート高さ100%</div>

<!-- 実用例: フルスクリーンヒーロー -->
<div class="min-vh-100 d-flex align-items-center
            justify-content-center bg-dark text-white">
  <div class="text-center">
    <h1 class="display-1">ヒーローセクション</h1>
    <p class="lead">画面全体を使ったレイアウト</p>
  </div>
</div>`,
      },
      {
        title: "ボーダーと角丸",
        content:
          "border ユーティリティでボーダーの追加・削除、色、幅を制御できます。border-{side} で特定の辺にボーダーを追加し、border-{side}-0 で削除します。rounded-{value} で角丸を指定し、rounded-circle で円形、rounded-pill でカプセル型になります。border-{color} でテーマカラーのボーダーを適用できます。",
        code: `<!-- ボーダーの追加 -->
<div class="border">全辺ボーダー</div>
<div class="border-top">上のみ</div>
<div class="border-bottom">下のみ</div>
<div class="border-start">左のみ</div>
<div class="border-end">右のみ</div>

<!-- ボーダーの削除 -->
<div class="border border-top-0">上以外</div>
<div class="border border-bottom-0">下以外</div>

<!-- ボーダーの色 -->
<div class="border border-primary">Primary</div>
<div class="border border-danger">Danger</div>
<div class="border border-success">Success</div>

<!-- ボーダーの幅 -->
<div class="border border-1">1px</div>
<div class="border border-2">2px</div>
<div class="border border-3">3px</div>
<div class="border border-5">5px</div>

<!-- 角丸 -->
<div class="rounded">角丸（デフォルト）</div>
<div class="rounded-0">角丸なし</div>
<div class="rounded-1">小さい角丸</div>
<div class="rounded-3">大きい角丸</div>
<div class="rounded-4">より大きい角丸</div>
<div class="rounded-5">最大角丸</div>
<div class="rounded-circle">円形</div>
<div class="rounded-pill">カプセル型</div>

<!-- 特定の角のみ -->
<div class="rounded-top">上だけ角丸</div>
<div class="rounded-end">右だけ角丸</div>
<div class="rounded-bottom">下だけ角丸</div>
<div class="rounded-start">左だけ角丸</div>`,
      },
    ],
  },
  {
    id: "display-position",
    title: "表示・配置・その他ユーティリティ",
    category: "utilities",
    description:
      "display、position、overflow、shadow、opacity、z-index のユーティリティを活用する",
    sections: [
      {
        title: "displayとvisibility",
        content:
          "display ユーティリティは d-{value} でレスポンシブな表示制御を行います。d-none で非表示、d-block / d-flex / d-inline で表示タイプを変更します。レスポンシブ版（d-{bp}-{value}）で画面サイズに応じた表示切替ができます。invisible クラスはスペースを保持したまま非表示にし、visually-hidden はスクリーンリーダー用にのみ表示します。",
        code: `<!-- display ユーティリティ -->
<div class="d-none">非表示</div>
<div class="d-block">ブロック表示</div>
<div class="d-inline">インライン表示</div>
<div class="d-inline-block">インラインブロック</div>
<div class="d-flex">Flex</div>
<div class="d-grid">Grid</div>

<!-- レスポンシブ表示/非表示 -->
<div class="d-none d-md-block">
  md以上で表示（モバイルでは非表示）
</div>
<div class="d-md-none">
  md未満で表示（タブレット以上では非表示）
</div>
<div class="d-none d-lg-flex">
  lg以上でFlex表示
</div>

<!-- 印刷時の表示制御 -->
<div class="d-print-none">印刷しない</div>
<div class="d-none d-print-block">印刷時のみ表示</div>

<!-- visibility -->
<div class="visible">表示</div>
<div class="invisible">非表示（スペース保持）</div>

<!-- visually-hidden（スクリーンリーダー用） -->
<span class="visually-hidden">
  スクリーンリーダーのみ読み上げるテキスト
</span>

<!-- フォーカス時に表示 -->
<a class="visually-hidden-focusable" href="#main">
  メインコンテンツにスキップ
</a>`,
      },
      {
        title: "positionとoverflow",
        content:
          "position ユーティリティは position-{value} で要素の配置方法を指定します。top-0 / start-0 / bottom-0 / end-0 でオフセットを設定し、translate-middle で中央配置します。overflow-{value} ではみ出しコンテンツの制御、overflow-x / overflow-y で方向別の制御が可能です。",
        code: `<!-- position -->
<div class="position-relative">
  <div class="position-absolute top-0 start-0">左上</div>
  <div class="position-absolute top-0 end-0">右上</div>
  <div class="position-absolute bottom-0 start-0">左下</div>
  <div class="position-absolute bottom-0 end-0">右下</div>
</div>

<!-- 中央配置 -->
<div class="position-relative" style="height:200px">
  <div class="position-absolute top-50 start-50
              translate-middle">
    縦横中央
  </div>
</div>

<!-- translate-middle-x / translate-middle-y -->
<div class="position-absolute top-0 start-50
            translate-middle-x">
  上辺の中央
</div>

<!-- position の種類 -->
<div class="position-static">static</div>
<div class="position-relative">relative</div>
<div class="position-absolute">absolute</div>
<div class="position-fixed">fixed</div>
<div class="position-sticky">sticky</div>

<!-- overflow -->
<div class="overflow-auto" style="height:100px">
  自動スクロール...
</div>
<div class="overflow-hidden">はみ出し非表示</div>
<div class="overflow-visible">はみ出し表示</div>
<div class="overflow-scroll">常にスクロールバー</div>
<div class="overflow-x-auto">横方向のみ自動スクロール</div>`,
      },
      {
        title: "影、透明度、z-index",
        content:
          "shadow ユーティリティで要素にドロップシャドウを追加します。shadow-none / shadow-sm / shadow / shadow-lg の4段階があります。opacity-{value} で透明度を制御し、z-{value} で z-index を指定できます。これらのユーティリティを組み合わせて、カード、モーダル、ドロップダウンなどの視覚的な階層を表現できます。",
        code: `<!-- Shadow（影） -->
<div class="shadow-none p-3 mb-3">影なし</div>
<div class="shadow-sm p-3 mb-3">小さい影</div>
<div class="shadow p-3 mb-3">通常の影</div>
<div class="shadow-lg p-3 mb-3">大きい影</div>

<!-- Opacity（透明度） -->
<div class="opacity-100">100%（不透明）</div>
<div class="opacity-75">75%</div>
<div class="opacity-50">50%</div>
<div class="opacity-25">25%</div>
<div class="opacity-0">0%（透明）</div>

<!-- z-index -->
<div class="z-0">z-index: 0</div>
<div class="z-1">z-index: 1</div>
<div class="z-2">z-index: 2</div>
<div class="z-3">z-index: 3</div>

<!-- 実用例: カードのホバー効果 -->
<style>
.hover-card {
  transition: box-shadow 0.3s, transform 0.3s;
}
.hover-card:hover {
  box-shadow: var(--bs-box-shadow-lg) !important;
  transform: translateY(-4px);
}
</style>
<div class="card shadow-sm hover-card">
  <div class="card-body">
    ホバーで影が変化するカード
  </div>
</div>

<!-- ポインターイベント -->
<div class="pe-none opacity-50">クリック不可</div>
<div class="pe-auto">クリック可能</div>

<!-- ユーザー選択 -->
<p class="user-select-all">クリックで全選択</p>
<p class="user-select-none">選択不可</p>`,
      },
    ],
  },

  // ===== カスタマイズ・実践 =====
  {
    id: "sass-customization",
    title: "Sassカスタマイズ",
    category: "advanced",
    description:
      "Sass変数の上書き、カスタムテーマ作成、ユーティリティAPIの拡張方法を学ぶ",
    sections: [
      {
        title: "Sass変数のカスタマイズ",
        content:
          "Bootstrap の見た目はSass変数を通じて幅広くカスタマイズできます。変数の上書きは Bootstrap の @import の前に行います。テーマカラー、フォント、間隔、ボーダー、シャドウなどほぼすべてのスタイルがSass変数で制御されています。$enable-* 変数でオプション機能（角丸、影、グラデーションなど）のON/OFFも可能です。",
        code: `/* custom.scss — Bootstrap のカスタマイズ */

/* ===== 変数の上書き（@import の前に記述） ===== */

/* テーマカラー */
$primary:   #6f42c1;
$secondary: #495057;
$success:   #20c997;
$info:      #0dcaf0;
$warning:   #ffc107;
$danger:    #e63946;

/* フォント */
$font-family-sans-serif: "Noto Sans JP", system-ui, sans-serif;
$font-size-base: 1rem;

/* 間隔 */
$spacer: 1rem;

/* ボーダー */
$border-radius: 0.5rem;
$border-radius-lg: 1rem;

/* 影 */
$box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
$box-shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);

/* 機能の有効/無効 */
$enable-rounded: true;
$enable-shadows: true;
$enable-gradients: false;
$enable-negative-margins: true;

/* Bootstrap をインポート */
@import "bootstrap/scss/bootstrap";`,
      },
      {
        title: "テーマカラーの拡張とマップ操作",
        content:
          "Bootstrap のテーマカラーは $theme-colors マップで管理されます。map-merge() でカスタムカラーを追加したり、map-remove() で不要な色を削除できます。追加したカラーは自動的に btn-*、bg-*、text-*、alert-* などすべてのコンポーネントで使用可能になります。",
        code: `/* カスタムテーマカラーの追加 */

/* 既存のマップに色を追加 */
$custom-colors: (
  "purple":  #6f42c1,
  "orange":  #fd7e14,
  "teal":    #20c997,
  "pink":    #d63384,
);

/* Bootstrap の変数の後、インポートの前で結合 */
@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";

$theme-colors: map-merge($theme-colors, $custom-colors);

@import "bootstrap/scss/maps";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/root";
@import "bootstrap/scss/bootstrap";

/* これで以下のクラスが自動生成される:
   .btn-purple, .btn-outline-purple
   .bg-purple, .text-purple
   .alert-purple, .badge-purple
   .border-purple
   など */

/* 不要な色の削除 */
$theme-colors: map-remove($theme-colors, "info", "light");

/* 使用例 */
/* <button class="btn btn-purple">Purple</button> */
/* <div class="bg-teal text-white">Teal背景</div> */
/* <span class="badge bg-orange">Orange</span> */`,
      },
      {
        title: "ユーティリティAPIの拡張",
        content:
          "Bootstrap 5 のユーティリティAPIを使えば、独自のユーティリティクラスを生成できます。$utilities マップにエントリを追加することで、レスポンシブ対応やステート対応の新しいユーティリティを作成できます。既存のユーティリティの値を拡張したり、不要なユーティリティを無効化したりすることも可能です。",
        code: `/* ユーティリティAPIでカスタムクラスを生成 */

@import "bootstrap/scss/functions";
@import "bootstrap/scss/variables";
@import "bootstrap/scss/maps";
@import "bootstrap/scss/mixins";
@import "bootstrap/scss/utilities";

/* カスタムユーティリティの追加 */
$utilities: map-merge(
  $utilities,
  (
    /* カーソルユーティリティ */
    "cursor": (
      property: cursor,
      class: cursor,
      values: auto pointer grab not-allowed,
    ),
    /* max-width ユーティリティ（レスポンシブ対応） */
    "max-width-custom": (
      property: max-width,
      class: mxw,
      responsive: true,
      values: (
        sm: 540px,
        md: 720px,
        lg: 960px,
        xl: 1140px,
      ),
    ),
  )
);

/* 生成されるクラス:
   .cursor-auto, .cursor-pointer, .cursor-grab
   .mxw-sm, .mxw-md-sm, .mxw-lg-md
   など */

/* 既存のユーティリティに値を追加 */
$utilities: map-merge(
  $utilities,
  (
    "width": map-merge(
      map-get($utilities, "width"),
      (values: map-merge(
        map-get(map-get($utilities, "width"), "values"),
        (33: 33.333%, 66: 66.666%)
      ))
    ),
  )
);
/* .w-33, .w-66 が追加される */

@import "bootstrap/scss/utilities/api";`,
      },
    ],
  },
  {
    id: "practical-layouts",
    title: "実践レイアウトパターン",
    category: "advanced",
    description:
      "ランディングページ、ダッシュボード、ログインページなど実践的なレイアウトを構築する",
    sections: [
      {
        title: "ランディングページ",
        content:
          "Bootstrap のコンポーネントとユーティリティを組み合わせて、ヒーローセクション、特徴紹介、CTA（行動喚起）、フッターを含むランディングページを構築できます。グリッドシステムでレスポンシブ対応し、テーマカラーとスペーシングで統一感のあるデザインを実現します。",
        code: `<!-- ヒーローセクション -->
<section class="bg-dark text-white py-5">
  <div class="container">
    <div class="row align-items-center min-vh-75 py-5">
      <div class="col-lg-6">
        <h1 class="display-4 fw-bold mb-3">
          プロダクト名
        </h1>
        <p class="lead mb-4">
          あなたのビジネスを加速する
          次世代プラットフォーム。
        </p>
        <div class="d-flex gap-3">
          <a href="#" class="btn btn-primary btn-lg">始める</a>
          <a href="#" class="btn btn-outline-light btn-lg">
            詳細を見る
          </a>
        </div>
      </div>
      <div class="col-lg-6">
        <img src="hero.png" class="img-fluid" alt="ヒーロー画像">
      </div>
    </div>
  </div>
</section>

<!-- 特徴セクション -->
<section class="py-5">
  <div class="container">
    <h2 class="text-center mb-5">主な特徴</h2>
    <div class="row g-4">
      <div class="col-md-4">
        <div class="card h-100 border-0 shadow-sm text-center p-4">
          <div class="card-body">
            <div class="bg-primary bg-opacity-10 rounded-circle
              d-inline-flex p-3 mb-3">
              <!-- アイコン -->
            </div>
            <h5 class="card-title">高速</h5>
            <p class="card-text text-muted">
              超高速なパフォーマンス。
            </p>
          </div>
        </div>
      </div>
      <!-- 繰り返し... -->
    </div>
  </div>
</section>`,
      },
      {
        title: "ダッシュボードレイアウト",
        content:
          "管理画面やダッシュボードのレイアウトは、固定サイドバーとメインコンテンツ領域の組み合わせで構成します。サイドバーは position-fixed と vh-100 で画面全体に固定し、メインコンテンツは margin-start でサイドバー分のオフセットを取ります。モバイルでは Offcanvas でスライドイン型のサイドバーに切り替えます。",
        code: `<!-- ダッシュボードレイアウト -->
<div class="d-flex">
  <!-- サイドバー -->
  <nav class="d-none d-lg-flex flex-column flex-shrink-0 p-3
              bg-body-tertiary border-end"
       style="width: 250px; min-height: 100vh">
    <a class="d-flex align-items-center mb-3 text-decoration-none"
       href="#">
      <span class="fs-4 fw-bold">Dashboard</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a class="nav-link active" href="#">ホーム</a>
      </li>
      <li><a class="nav-link" href="#">注文</a></li>
      <li><a class="nav-link" href="#">商品</a></li>
      <li><a class="nav-link" href="#">顧客</a></li>
      <li><a class="nav-link" href="#">レポート</a></li>
    </ul>
  </nav>

  <!-- メインコンテンツ -->
  <main class="flex-grow-1 p-4">
    <div class="d-flex justify-content-between align-items-center
                mb-4">
      <h1 class="h3">ダッシュボード</h1>
      <button class="btn btn-primary">レポート出力</button>
    </div>

    <!-- 統計カード -->
    <div class="row g-3 mb-4">
      <div class="col-sm-6 col-xl-3">
        <div class="card border-start border-primary border-4">
          <div class="card-body">
            <h6 class="text-muted">売上</h6>
            <h3 class="mb-0">¥1,250,000</h3>
          </div>
        </div>
      </div>
      <!-- 繰り返し... -->
    </div>
  </main>
</div>`,
      },
      {
        title: "ログイン・認証ページ",
        content:
          "ログインページは中央配置のカードフォームで構成するのが一般的です。min-vh-100 と Flex のセンタリングで画面中央に配置し、カード内にフォームコントロール、フローティングラベル、バリデーションを組み合わせます。ソーシャルログインボタンや「パスワードを忘れた場合」のリンクも Bootstrap のクラスで簡単に実装できます。",
        code: `<!-- ログインページ -->
<div class="min-vh-100 d-flex align-items-center
            bg-body-tertiary">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5 col-xl-4">
        <div class="card shadow-sm">
          <div class="card-body p-4 p-md-5">
            <!-- ロゴ -->
            <h3 class="text-center mb-4 fw-bold">ログイン</h3>

            <!-- フォーム -->
            <form>
              <div class="form-floating mb-3">
                <input type="email" class="form-control"
                       id="loginEmail" placeholder="メール">
                <label for="loginEmail">メールアドレス</label>
              </div>
              <div class="form-floating mb-3">
                <input type="password" class="form-control"
                       id="loginPass" placeholder="パスワード">
                <label for="loginPass">パスワード</label>
              </div>

              <div class="d-flex justify-content-between
                          align-items-center mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox"
                         id="remember">
                  <label class="form-check-label" for="remember">
                    ログイン情報を保存
                  </label>
                </div>
                <a href="#" class="text-decoration-none small">
                  パスワードを忘れた場合
                </a>
              </div>

              <button class="btn btn-primary w-100 mb-3"
                      type="submit">
                ログイン
              </button>
            </form>

            <div class="text-center">
              <span class="text-muted">or</span>
            </div>
            <hr>

            <!-- ソーシャルログイン -->
            <div class="d-grid gap-2">
              <button class="btn btn-outline-dark">
                Googleでログイン
              </button>
              <button class="btn btn-outline-dark">
                GitHubでログイン
              </button>
            </div>

            <p class="text-center mt-4 mb-0 text-muted">
              アカウントがない場合は
              <a href="#">新規登録</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
      },
    ],
  },
];
