export interface HtmxSection {
  title: string;
  content: string;
  code?: string;
}

export interface HtmxChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: HtmxSection[];
}

export const htmxCategories = [
  { id: "basics", name: "基礎", color: "var(--color-dads-cyan)" },
  { id: "request-response", name: "リクエスト・レスポンス", color: "var(--color-dads-blue)" },
  { id: "triggers", name: "トリガー・イベント", color: "var(--color-dads-purple)" },
  { id: "ui-patterns", name: "UIパターン", color: "var(--color-dads-error)" },
  { id: "advanced", name: "高度な機能", color: "var(--color-dads-warning)" },
  { id: "extensions", name: "拡張・統合", color: "var(--color-dads-success)" },
  { id: "practice", name: "実践パターン", color: "var(--color-dads-navy)" },
] as const;

export const htmxChapters: HtmxChapter[] = [
  // ===== 基礎 =====
  {
    id: "htmx-basics",
    title: "HTMXの基本",
    category: "basics",
    description:
      "HTMXの導入、hx-get/hx-post、hx-trigger による基本的なAJAXリクエスト",
    sections: [
      {
        title: "HTMXとは",
        content:
          "HTMX は HTML の属性を使って AJAX リクエスト、CSS トランジション、WebSocket、Server-Sent Events を直接 HTML から利用できる軽量ライブラリです。JavaScript を書かずにインタラクティブな Web アプリケーションを構築できます。Hypermedia（HTML）駆動のアプローチで、サーバーからは JSON ではなく HTML フラグメントを返します。",
        code: `<!-- CDN から読み込み -->
<script src="https://unpkg.com/htmx.org@2.0.4"></script>

<!-- または npm -->
<!-- npm install htmx.org -->

<!-- 基本的な例: ボタンクリックでコンテンツを取得 -->
<button hx-get="/api/greeting" hx-target="#result">
  挨拶を取得
</button>
<div id="result">ここにレスポンスが入る</div>

<!-- サーバーは HTML フラグメントを返す -->
<!-- GET /api/greeting のレスポンス: -->
<!-- <p>こんにちは！現在時刻: 14:30:00</p> -->

<!-- HTMX の基本概念 -->
<!-- 1. HTML属性でAJAXリクエストを定義 -->
<!-- 2. サーバーはHTMLフラグメントを返す（JSONではない） -->
<!-- 3. レスポンスをDOMにスワップ（挿入）する -->
<!-- 4. JavaScript を書く必要がない -->`,
      },
      {
        title: "hx-get / hx-post によるリクエスト",
        content:
          "hx-get と hx-post は最も基本的な HTMX 属性で、それぞれ GET と POST リクエストを送信します。クリック（ボタン）やサブミット（フォーム）がデフォルトのトリガーです。hx-put、hx-patch、hx-delete も同様に使えます。リクエスト先の URL を属性値に指定します。",
        code: `<!-- GET リクエスト（ボタンのデフォルトトリガー: click） -->
<button hx-get="/api/users">ユーザー一覧を取得</button>

<!-- POST リクエスト -->
<button hx-post="/api/users"
        hx-vals='{"name": "Alice", "role": "admin"}'>
  ユーザーを追加
</button>

<!-- フォームの送信（デフォルトトリガー: submit） -->
<form hx-post="/api/users" hx-target="#user-list">
  <input type="text" name="name" placeholder="名前">
  <input type="email" name="email" placeholder="メール">
  <button type="submit">登録</button>
</form>
<div id="user-list"></div>

<!-- PUT / PATCH / DELETE -->
<button hx-put="/api/users/1"
        hx-vals='{"name": "Bob"}'>
  更新
</button>

<button hx-patch="/api/users/1"
        hx-vals='{"status": "active"}'>
  ステータス変更
</button>

<button hx-delete="/api/users/1"
        hx-confirm="本当に削除しますか？">
  削除
</button>`,
      },
      {
        title: "hx-target と hx-swap の基本",
        content:
          "hx-target はレスポンスを挿入する先の要素を CSS セレクタで指定します。デフォルトではリクエストを発火した要素自体が対象です。hx-swap はレスポンスの挿入方法を指定します。デフォルトは innerHTML（要素の中身を置換）です。これらを組み合わせてページの任意の部分を動的に更新できます。",
        code: `<!-- hx-target: レスポンスの挿入先を指定 -->
<button hx-get="/api/users"
        hx-target="#user-list">
  ユーザーを取得
</button>
<div id="user-list"><!-- ここにレスポンスが入る --></div>

<!-- hx-target の CSS セレクタ -->
<button hx-get="/api/data" hx-target="#result">ID指定</button>
<button hx-get="/api/data" hx-target=".output">クラス指定</button>
<button hx-get="/api/data" hx-target="closest div">最近のdiv</button>
<button hx-get="/api/data" hx-target="find .content">子要素</button>
<button hx-get="/api/data" hx-target="next div">次の兄弟</button>
<button hx-get="/api/data" hx-target="previous div">前の兄弟</button>

<!-- hx-swap: 挿入方法を指定 -->
<button hx-get="/api/item" hx-swap="innerHTML">
  中身を置換（デフォルト）
</button>
<button hx-get="/api/item" hx-swap="outerHTML">
  要素ごと置換
</button>
<button hx-get="/api/item" hx-swap="beforeend">
  末尾に追加
</button>
<button hx-get="/api/item" hx-swap="afterbegin">
  先頭に追加
</button>
<button hx-get="/api/item" hx-swap="beforebegin">
  要素の前に挿入
</button>
<button hx-get="/api/item" hx-swap="afterend">
  要素の後に挿入
</button>
<button hx-delete="/api/item/1" hx-swap="delete">
  要素を削除
</button>`,
      },
    ],
  },
  {
    id: "hx-swap",
    title: "スワップ戦略",
    category: "basics",
    description:
      "innerHTML、outerHTML、beforeend などスワップ方法の詳細と修飾子",
    sections: [
      {
        title: "スワップ方法の詳細",
        content:
          "hx-swap にはさまざまな挿入方法があり、用途に応じて使い分けます。innerHTML は要素の中身を置換、outerHTML は要素自体を置換、beforeend/afterbegin はリスト追加に便利です。none を指定するとDOMの更新を行わず、サーバーサイドの処理だけを実行できます。",
        code: `<!-- innerHTML（デフォルト）— 中身を置換 -->
<!-- 元: <div id="box"><p>古い内容</p></div> -->
<button hx-get="/new-content" hx-target="#box" hx-swap="innerHTML">
  更新
</button>
<!-- 結果: <div id="box"><p>新しい内容</p></div> -->

<!-- outerHTML — 要素ごと置換 -->
<!-- リストアイテムの更新に便利 -->
<div id="user-1" hx-get="/api/users/1" hx-swap="outerHTML">
  <p>Alice（クリックで更新）</p>
</div>
<!-- 結果: <div id="user-1"><p>Alice（更新済み）</p></div> -->

<!-- beforeend — 末尾に追加（リスト追加に最適） -->
<ul id="todo-list">
  <li>既存のアイテム</li>
</ul>
<form hx-post="/api/todos"
      hx-target="#todo-list"
      hx-swap="beforeend">
  <input type="text" name="task">
  <button type="submit">追加</button>
</form>
<!-- サーバーレスポンス: <li>新しいアイテム</li> -->

<!-- delete — 要素を削除 -->
<div id="item-1">
  <span>アイテム1</span>
  <button hx-delete="/api/items/1"
          hx-target="closest div"
          hx-swap="delete">
    削除
  </button>
</div>

<!-- none — DOM を更新しない -->
<button hx-post="/api/analytics/track" hx-swap="none">
  追跡のみ（表示変更なし）
</button>`,
      },
      {
        title: "スワップ修飾子",
        content:
          "hx-swap にはタイミングやスクロール動作を制御する修飾子を追加できます。swap: でスワップのディレイ、settle: で属性の落ち着き時間、scroll: でスクロール位置、show: で表示位置を制御します。transition:true で View Transitions API を有効にできます。",
        code: `<!-- スワップのディレイ -->
<button hx-get="/api/data"
        hx-swap="innerHTML swap:500ms">
  500ms 後にスワップ
</button>

<!-- settle ディレイ（CSSトランジション用） -->
<button hx-get="/api/data"
        hx-swap="innerHTML settle:300ms">
  属性の安定まで 300ms 待つ
</button>

<!-- スクロール制御 -->
<button hx-get="/api/items"
        hx-target="#list"
        hx-swap="beforeend scroll:#list:bottom">
  追加してスクロール（末尾へ）
</button>

<button hx-get="/api/items"
        hx-swap="innerHTML show:top">
  更新してページ先頭を表示
</button>

<!-- transition: View Transitions API を使用 -->
<button hx-get="/api/content"
        hx-swap="innerHTML transition:true">
  トランジション付きで更新
</button>

<!-- フォーカスのスクロール制御 -->
<button hx-get="/api/data"
        hx-swap="innerHTML focus-scroll:false">
  フォーカスによるスクロールを防止
</button>

<!-- 組み合わせ -->
<div hx-get="/api/messages"
     hx-trigger="every 2s"
     hx-swap="beforeend swap:100ms settle:200ms scroll:bottom show:bottom">
  <!-- 2秒ごとに新メッセージを追加、下にスクロール -->
</div>`,
      },
      {
        title: "Out of Band スワップ",
        content:
          "Out of Band (OOB) スワップはメインレスポンスとは別に、ページ内の他の要素も同時に更新する機能です。サーバーレスポンスに hx-swap-oob=\"true\" 属性を持つ要素を含めると、その要素の id と一致するページ内の要素が置換されます。1つのリクエストで複数の領域を更新するのに便利です。",
        code: `<!-- メインリクエスト -->
<button hx-post="/api/todos"
        hx-target="#todo-list"
        hx-swap="beforeend">
  タスクを追加
</button>
<ul id="todo-list"></ul>
<div id="todo-count">タスク数: 0</div>

<!-- サーバーのレスポンス（メイン + OOB） -->
<!--
<li>新しいタスク</li>

<div id="todo-count" hx-swap-oob="true">
  タスク数: 5
</div>
-->
<!-- メインレスポンス → #todo-list に追加 -->
<!-- OOB → #todo-count を同時に更新 -->

<!-- OOB のスワップ方法を指定 -->
<!--
<div id="notifications" hx-swap-oob="beforeend">
  <p>新しい通知</p>
</div>
-->

<!-- 複数の OOB 更新 -->
<!--
<li>新しいアイテム</li>

<span id="item-count" hx-swap-oob="true">10件</span>
<span id="last-updated" hx-swap-oob="true">14:30</span>
-->

<!-- 実用例: フォーム送信後にリストとカウンターを同時更新 -->
<form hx-post="/api/comments"
      hx-target="#comments"
      hx-swap="beforeend">
  <textarea name="body"></textarea>
  <button type="submit">コメント</button>
</form>
<div id="comments"></div>
<span id="comment-count">0件</span>
<!-- サーバーがコメントHTML + OOBでカウント更新を返す -->`,
      },
    ],
  },

  // ===== リクエスト・レスポンス =====
  {
    id: "requests",
    title: "リクエスト操作",
    category: "request-response",
    description:
      "hx-vals、hx-headers、hx-include、hx-params でリクエストを細かく制御する",
    sections: [
      {
        title: "リクエストデータの送信",
        content:
          "hx-vals は追加のパラメータを JSON 形式でリクエストに含めます。hx-include は指定した要素の値をリクエストに含めます。フォーム内の要素は自動的に含まれますが、フォーム外の値を含めたい場合に便利です。hx-params でどのパラメータを送信するか制御できます。",
        code: `<!-- hx-vals: 追加パラメータを送信 -->
<button hx-post="/api/action"
        hx-vals='{"action": "approve", "priority": "high"}'>
  承認
</button>

<!-- JavaScript式でのhx-vals -->
<button hx-post="/api/action"
        hx-vals="js:{timestamp: Date.now()}">
  タイムスタンプ付き送信
</button>

<!-- hx-include: 他の要素の値を含める -->
<input type="text" id="search-input" name="q" placeholder="検索...">
<select id="category" name="category">
  <option value="all">すべて</option>
  <option value="tech">技術</option>
</select>
<button hx-get="/api/search"
        hx-include="#search-input, #category"
        hx-target="#results">
  検索
</button>

<!-- hx-include="closest form" でフォーム全体を含める -->

<!-- hx-params: 送信パラメータの制御 -->
<form hx-post="/api/users" hx-params="*">すべて送信</form>
<form hx-post="/api/users" hx-params="none">パラメータなし</form>
<form hx-post="/api/users" hx-params="name,email">
  name と email のみ
</form>
<form hx-post="/api/users" hx-params="not password">
  password 以外
</form>`,
      },
      {
        title: "リクエストヘッダーと設定",
        content:
          "hx-headers でカスタムヘッダーを追加できます。HTMX は自動的に HX-Request: true ヘッダーを送信するため、サーバー側で HTMX リクエストかどうかを判別できます。CSRF トークンの送信にも hx-headers が使えます。hx-encoding でエンコーディング方式を指定できます。",
        code: `<!-- hx-headers: カスタムヘッダーの追加 -->
<button hx-get="/api/data"
        hx-headers='{"X-Custom-Header": "value"}'>
  カスタムヘッダー付き
</button>

<!-- CSRF トークンの送信 -->
<meta name="csrf-token" content="abc123">
<body hx-headers='{"X-CSRF-Token": "abc123"}'>
  <!-- 全リクエストに CSRF トークンを含める -->
</body>

<!-- HTMX が自動送信するヘッダー -->
<!-- HX-Request: true -->
<!-- HX-Trigger: トリガー要素のID -->
<!-- HX-Trigger-Name: トリガー要素のname -->
<!-- HX-Target: ターゲット要素のID -->
<!-- HX-Current-URL: 現在のURL -->

<!-- サーバー側での判別（例: Express.js） -->
<!--
app.get("/api/data", (req, res) => {
  if (req.headers["hx-request"]) {
    // HTMX リクエスト → HTMLフラグメントを返す
    res.send("<p>部分的なHTML</p>");
  } else {
    // 通常リクエスト → 完全なページを返す
    res.render("full-page");
  }
});
-->

<!-- hx-encoding: マルチパートフォーム -->
<form hx-post="/api/upload"
      hx-encoding="multipart/form-data">
  <input type="file" name="file">
  <button type="submit">アップロード</button>
</form>`,
      },
      {
        title: "リクエストの制御",
        content:
          "hx-confirm はリクエスト前に確認ダイアログを表示します。hx-disable はリクエスト中に要素を無効化します。hx-disabled-elt でリクエスト中に無効化する要素を指定できます。hx-sync は複数のリクエストの同期方法を制御します。",
        code: `<!-- hx-confirm: 確認ダイアログ -->
<button hx-delete="/api/users/1"
        hx-confirm="本当に削除しますか？この操作は元に戻せません。">
  ユーザーを削除
</button>

<!-- hx-disabled-elt: リクエスト中に無効化する要素 -->
<form hx-post="/api/submit"
      hx-disabled-elt="#submit-btn">
  <input type="text" name="data">
  <button id="submit-btn" type="submit">送信</button>
</form>

<!-- hx-sync: リクエストの同期制御 -->
<!-- drop: 進行中のリクエストがあれば新しいリクエストを破棄 -->
<input type="text" name="q"
       hx-get="/api/search"
       hx-trigger="input changed delay:300ms"
       hx-sync="this:drop">

<!-- replace: 進行中のリクエストをキャンセルして新しいリクエストを実行 -->
<input type="text" name="q"
       hx-get="/api/search"
       hx-trigger="input changed delay:300ms"
       hx-sync="this:replace">

<!-- queue: リクエストをキューに入れて順番に実行 -->
<button hx-post="/api/action"
        hx-sync="this:queue first">
  キュー（最初のみ）
</button>

<!-- abort: 進行中のリクエストを中止 -->
<button hx-post="/api/action"
        hx-sync="this:abort">
  中止して実行
</button>`,
      },
    ],
  },
  {
    id: "responses",
    title: "レスポンス処理",
    category: "request-response",
    description:
      "OOB スワップ、レスポンスヘッダー、HX-Trigger、HX-Redirect の活用",
    sections: [
      {
        title: "レスポンスヘッダーによる制御",
        content:
          "サーバーはレスポンスヘッダーを使って HTMX のクライアント側の動作を制御できます。HX-Redirect でリダイレクト、HX-Refresh でページ全体をリフレッシュ、HX-Retarget でターゲットを変更、HX-Reswap でスワップ方法を変更できます。",
        code: `<!-- サーバーが返すレスポンスヘッダー -->

<!-- HX-Redirect: クライアントサイドリダイレクト -->
<!-- レスポンスヘッダー: HX-Redirect: /dashboard -->
<!-- → ブラウザが /dashboard に遷移 -->

<!-- HX-Refresh: ページ全体をリフレッシュ -->
<!-- レスポンスヘッダー: HX-Refresh: true -->

<!-- HX-Retarget: ターゲット要素を変更 -->
<!-- レスポンスヘッダー: HX-Retarget: #error-div -->
<!-- → hx-target の指定を上書き -->

<!-- HX-Reswap: スワップ方法を変更 -->
<!-- レスポンスヘッダー: HX-Reswap: outerHTML -->

<!-- HX-Replace-Url: URLバーを更新 -->
<!-- レスポンスヘッダー: HX-Replace-Url: /users/1 -->

<!-- HX-Push-Url: 履歴にプッシュ -->
<!-- レスポンスヘッダー: HX-Push-Url: /users/1 -->

<!-- サーバー実装例（Express.js） -->
<!--
app.post("/api/login", (req, res) => {
  if (authenticated) {
    res.set("HX-Redirect", "/dashboard");
    res.send("");
  } else {
    res.set("HX-Retarget", "#error");
    res.set("HX-Reswap", "innerHTML");
    res.send("<p class='error'>ログイン失敗</p>");
  }
});
-->`,
      },
      {
        title: "HX-Trigger レスポンスヘッダー",
        content:
          "サーバーは HX-Trigger レスポンスヘッダーでクライアント側のカスタムイベントを発火できます。これにより、レスポンス後に他の要素のリフレッシュ、通知の表示、カウンターの更新などを連鎖的に実行できます。JSON 形式でイベントにデータを付与することも可能です。",
        code: `<!-- HX-Trigger ヘッダーでイベントを発火 -->
<!-- レスポンスヘッダー: HX-Trigger: itemAdded -->

<!-- クライアント側でイベントをリッスン -->
<div hx-get="/api/item-count"
     hx-trigger="itemAdded from:body"
     hx-target="this">
  アイテム数: 0
</div>

<!-- 複数のイベントを発火 -->
<!-- HX-Trigger: itemAdded, statsUpdated -->

<!-- イベントにデータを付与（JSON） -->
<!-- HX-Trigger: {"showNotification": {"message": "保存しました", "type": "success"}} -->

<!-- JavaScript でカスタムイベントを処理 -->
<!--
document.body.addEventListener("showNotification", (e) => {
  const { message, type } = e.detail;
  showToast(message, type);
});
-->

<!-- HX-Trigger-After-Swap: スワップ後にイベント発火 -->
<!-- HX-Trigger-After-Settle: セトル後にイベント発火 -->

<!-- サーバー実装例 -->
<!--
app.post("/api/todos", (req, res) => {
  const todo = createTodo(req.body);
  res.set("HX-Trigger", JSON.stringify({
    todoAdded: { id: todo.id },
    showNotification: { message: "タスクを追加しました" }
  }));
  res.send(\`<li>\${todo.title}</li>\`);
});
-->`,
      },
      {
        title: "エラーハンドリング",
        content:
          "HTMX はHTTPステータスコードに基づいてレスポンスを処理します。2xx はスワップを実行し、4xx/5xx はデフォルトではスワップしません。htmx:responseError イベントでエラーを捕捉できます。hx-on 属性やイベントリスナーでエラー時の表示を制御できます。",
        code: `<!-- エラーレスポンスの処理 -->
<!-- 4xx/5xx ステータスではデフォルトでスワップしない -->

<!-- エラーでもスワップする設定（response-targets 拡張） -->
<div hx-ext="response-targets">
  <form hx-post="/api/submit"
        hx-target="#result"
        hx-target-422="#errors"
        hx-target-5*="#server-error">
    <input type="text" name="data">
    <button type="submit">送信</button>
  </form>
  <div id="result"></div>
  <div id="errors"></div>
  <div id="server-error"></div>
</div>

<!-- htmx イベントでエラーハンドリング -->
<!--
document.body.addEventListener("htmx:responseError", (e) => {
  console.error("リクエスト失敗:", e.detail);
  alert("エラーが発生しました");
});
-->

<!-- hx-on でインラインイベント処理 -->
<button hx-get="/api/data"
        hx-on::response-error="alert('エラーが発生しました')">
  データ取得
</button>

<!-- ネットワークエラーの処理 -->
<!--
document.body.addEventListener("htmx:sendError", (e) => {
  alert("ネットワークエラー: サーバーに接続できません");
});
-->

<!-- タイムアウトの設定 -->
<div hx-get="/api/slow-data"
     hx-trigger="load"
     hx-request='{"timeout": 5000}'>
  読み込み中...
</div>`,
      },
    ],
  },

  // ===== トリガー・イベント =====
  {
    id: "triggers-detail",
    title: "トリガーの詳細",
    category: "triggers",
    description:
      "hx-trigger の修飾子、ポーリング、load、revealed、intersect の活用",
    sections: [
      {
        title: "hx-trigger の修飾子",
        content:
          "hx-trigger はリクエストのトリガー条件を細かく制御できます。delay: でディレイ、throttle: でスロットリング、changed で値が変わった時のみ、once で1回だけ、from: で他の要素のイベントをリッスンなど、さまざまな修飾子を組み合わせて使えます。",
        code: `<!-- 基本的なトリガー -->
<button hx-get="/api/data" hx-trigger="click">
  クリック（デフォルト）
</button>

<!-- delay: ディレイ（デバウンス） -->
<input type="text" name="q"
       hx-get="/api/search"
       hx-trigger="input changed delay:300ms"
       hx-target="#results">
<!-- 入力後 300ms 待ってからリクエスト -->

<!-- throttle: スロットリング -->
<div hx-get="/api/position"
     hx-trigger="mousemove throttle:500ms">
  マウス位置（500ms 間隔で更新）
</div>

<!-- changed: 値が変わった時のみ -->
<select hx-get="/api/filter"
        hx-trigger="change changed"
        hx-target="#list">
  <option value="all">すべて</option>
  <option value="active">アクティブ</option>
</select>

<!-- once: 1回だけ実行 -->
<div hx-get="/api/heavy-content"
     hx-trigger="click once">
  クリックで一度だけ読み込み
</div>

<!-- from: 他の要素のイベントをリッスン -->
<input type="text" id="search-box" name="q">
<div hx-get="/api/search"
     hx-include="#search-box"
     hx-trigger="keyup changed delay:300ms from:#search-box">
  検索結果がここに表示
</div>

<!-- 複数のトリガー -->
<div hx-get="/api/data"
     hx-trigger="click, keyup[key=='Enter'] from:body">
  クリックまたは Enter キーで取得
</div>`,
      },
      {
        title: "特殊なトリガー",
        content:
          "HTMX には特殊なトリガーがあります。load は要素がDOMに追加された時、revealed は要素がビューポートに表示された時、intersect は IntersectionObserver ベースのトリガーです。every はポーリング（定期実行）に使います。これらを使ってインタラクティブなUIを構築できます。",
        code: `<!-- load: DOM に追加された時 -->
<div hx-get="/api/initial-data"
     hx-trigger="load"
     hx-swap="innerHTML">
  読み込み中...
</div>

<!-- revealed: ビューポートに表示された時 -->
<div hx-get="/api/lazy-content"
     hx-trigger="revealed"
     hx-swap="outerHTML">
  スクロールで読み込み
</div>

<!-- intersect: IntersectionObserver ベース -->
<img hx-get="/api/image-data"
     hx-trigger="intersect once threshold:0.5"
     hx-swap="outerHTML">
<!-- threshold: 50% 表示されたら発火 -->

<!-- every: ポーリング（定期実行） -->
<div hx-get="/api/notifications"
     hx-trigger="every 5s"
     hx-swap="innerHTML">
  通知: 0件
</div>

<!-- 条件付きポーリング -->
<div hx-get="/api/job-status"
     hx-trigger="every 2s [checkStatus()]"
     hx-swap="outerHTML">
  ジョブ実行中...
</div>
<!--
<script>
function checkStatus() {
  return document.querySelector("#job").dataset.status !== "complete";
}
</script>
-->

<!-- イベントフィルター -->
<input hx-get="/api/search"
       hx-trigger="keyup[key!='Shift' && key!='Control']
                    changed delay:300ms">

<!-- SSE (Server-Sent Events) トリガー -->
<div hx-ext="sse"
     sse-connect="/api/events"
     sse-swap="newMessage">
  <!-- サーバーから newMessage イベントが来たらスワップ -->
</div>`,
      },
      {
        title: "カスタムイベントとhx-on",
        content:
          "hx-on 属性で HTMX イベントや DOM イベントにインラインハンドラを設定できます。カスタムイベントを htmx.trigger() で発火し、他の要素のリクエストをトリガーすることもできます。HTMX のライフサイクルイベントを利用して処理をカスタマイズできます。",
        code: `<!-- hx-on でイベント処理 -->
<button hx-get="/api/data"
        hx-on::before-request="console.log('リクエスト開始')"
        hx-on::after-swap="console.log('スワップ完了')">
  データ取得
</button>

<!-- hx-on でフォームリセット -->
<form hx-post="/api/todos"
      hx-target="#list"
      hx-swap="beforeend"
      hx-on::after-request="this.reset()">
  <input type="text" name="task">
  <button type="submit">追加</button>
</form>

<!-- カスタムイベントの発火 -->
<button onclick="htmx.trigger('#data-panel', 'refresh')">
  データを更新
</button>
<div id="data-panel"
     hx-get="/api/data"
     hx-trigger="refresh">
  データパネル
</div>

<!-- HTMX ライフサイクルイベント -->
<!--
htmx:configRequest   — リクエスト設定時
htmx:beforeRequest   — リクエスト前
htmx:afterRequest    — リクエスト後
htmx:beforeSwap      — スワップ前
htmx:afterSwap       — スワップ後
htmx:afterSettle     — セトル後
htmx:responseError   — レスポンスエラー時
htmx:sendError       — 送信エラー時
-->

<!-- イベントリスナーの登録 -->
<!--
document.body.addEventListener("htmx:beforeSwap", (e) => {
  if (e.detail.xhr.status === 404) {
    e.detail.shouldSwap = true;
    e.detail.isError = false;
  }
});
-->`,
      },
    ],
  },
  {
    id: "events",
    title: "イベント処理",
    category: "triggers",
    description:
      "HTMXライフサイクルイベント、htmx:configRequest、htmx:afterSwap の実践",
    sections: [
      {
        title: "リクエストライフサイクルイベント",
        content:
          "HTMX のリクエストは複数のステージを経て実行されます。各ステージでイベントが発火され、リクエストの設定変更、レスポンスの加工、エラーハンドリングなどを行えます。htmx:configRequest でヘッダーやパラメータを動的に変更し、htmx:beforeSwap でスワップの挙動をカスタマイズできます。",
        code: `<!-- リクエストのライフサイクル -->
<!--
1. htmx:confirm      — 確認（hx-confirm の前）
2. htmx:configRequest — リクエスト設定のカスタマイズ
3. htmx:beforeRequest — リクエスト送信直前
4. htmx:beforeSend    — XMLHttpRequest 送信直前
5. htmx:afterRequest  — レスポンス受信後
6. htmx:beforeSwap    — DOM スワップ前
7. htmx:afterSwap     — DOM スワップ後
8. htmx:afterSettle   — 属性のセトル後
-->

<!-- htmx:configRequest でリクエストをカスタマイズ -->
<script>
document.body.addEventListener("htmx:configRequest", (e) => {
  // 認証トークンを動的に追加
  e.detail.headers["Authorization"] =
    "Bearer " + getAuthToken();

  // パラメータの追加
  e.detail.parameters["timestamp"] = Date.now();
});
</script>

<!-- htmx:beforeSwap でスワップを制御 -->
<script>
document.body.addEventListener("htmx:beforeSwap", (e) => {
  // 204 No Content でも既存コンテンツを維持
  if (e.detail.xhr.status === 204) {
    e.detail.shouldSwap = false;
  }

  // 422 バリデーションエラーでもスワップする
  if (e.detail.xhr.status === 422) {
    e.detail.shouldSwap = true;
    e.detail.isError = false;
  }
});
</script>

<!-- htmx:afterSettle で後処理 -->
<script>
document.body.addEventListener("htmx:afterSettle", (e) => {
  // スワップ後にサードパーティライブラリを初期化
  initTooltips(e.detail.elt);
  highlightCode(e.detail.elt);
});
</script>`,
      },
      {
        title: "DOM イベントとの連携",
        content:
          "HTMX は標準の DOM イベントと組み合わせて使えます。hx-trigger で任意の DOM イベントをトリガーに設定でき、カスタムイベントも利用可能です。htmx.trigger() で プログラムからイベントを発火し、要素間の連携を実現できます。",
        code: `<!-- 標準 DOM イベントの活用 -->

<!-- フォーカス時にデータ取得 -->
<input type="text"
       hx-get="/api/suggestions"
       hx-trigger="focus"
       hx-target="#suggestions">

<!-- スクロールイベント -->
<div hx-get="/api/scroll-data"
     hx-trigger="scroll throttle:1s from:window">
  スクロールデータ
</div>

<!-- キーボードイベント -->
<div hx-get="/api/shortcuts"
     hx-trigger="keydown[key=='?'] from:body">
  ショートカットヘルプ
</div>

<!-- カスタムイベントで要素間連携 -->
<!-- タブ選択 → コンテンツ更新 -->
<div class="tabs">
  <button onclick="htmx.trigger('#content', 'loadTab',
    {detail: {tab: 'users'}})">
    ユーザー
  </button>
  <button onclick="htmx.trigger('#content', 'loadTab',
    {detail: {tab: 'posts'}})">
    投稿
  </button>
</div>
<div id="content"
     hx-get="/api/tab-content"
     hx-trigger="loadTab"
     hx-vals="js:{tab: event.detail.tab}">
  タブコンテンツ
</div>

<!-- htmx.ajax() でプログラムからリクエスト -->
<!--
htmx.ajax("GET", "/api/data", {
  target: "#result",
  swap: "innerHTML"
});
-->`,
      },
      {
        title: "イベントのキャンセルと伝播",
        content:
          "HTMX のイベントは通常の DOM イベントと同様にキャンセルや伝播の制御ができます。htmx:confirm イベントで確認ダイアログをカスタマイズしたり、htmx:beforeRequest でリクエストを条件付きでキャンセルしたりできます。イベントの伝播（バブリング）も標準の仕組みに従います。",
        code: `<!-- htmx:confirm でカスタム確認ダイアログ -->
<button hx-delete="/api/users/1"
        hx-confirm="削除しますか？">
  削除
</button>

<script>
document.body.addEventListener("htmx:confirm", (e) => {
  e.preventDefault(); // デフォルトの confirm を防止

  // カスタムモーダルで確認
  showCustomConfirm(e.detail.question).then((confirmed) => {
    if (confirmed) {
      e.detail.issueRequest(); // リクエストを実行
    }
  });
});
</script>

<!-- htmx:beforeRequest でリクエストをキャンセル -->
<script>
document.body.addEventListener("htmx:beforeRequest", (e) => {
  const input = document.querySelector("#search");
  if (input.value.length < 3) {
    e.preventDefault(); // 3文字未満ならリクエストしない
  }
});
</script>

<!-- 特定の要素にのみイベントハンドラを設定 -->
<div id="user-form">
  <form hx-post="/api/users">
    <input type="text" name="name">
    <button type="submit">送信</button>
  </form>
</div>

<script>
const form = document.getElementById("user-form");
form.addEventListener("htmx:afterRequest", (e) => {
  if (e.detail.successful) {
    e.target.reset(); // フォームをリセット
    showToast("保存しました");
  }
});
</script>`,
      },
    ],
  },

  // ===== UIパターン =====
  {
    id: "indicators",
    title: "インジケーター",
    category: "ui-patterns",
    description:
      "hx-indicator によるローディング表示、リクエスト状態の視覚的フィードバック",
    sections: [
      {
        title: "hx-indicator の基本",
        content:
          "hx-indicator はリクエスト中に表示するローディングインジケーターを指定します。HTMX はリクエスト中に htmx-request クラスを追加するため、CSS でインジケーターの表示/非表示を制御できます。.htmx-indicator クラスのデフォルトスタイルでは opacity: 0 → 1 の切り替えが行われます。",
        code: `<!-- 基本的なインジケーター -->
<button hx-get="/api/data"
        hx-indicator="#spinner">
  データ取得
  <img id="spinner" class="htmx-indicator"
       src="/spinner.svg" alt="読み込み中">
</button>

<!-- CSS でのインジケーター制御 -->
<style>
/* デフォルトのHTMXインジケータースタイル */
.htmx-indicator {
  opacity: 0;
  transition: opacity 200ms ease-in;
}
.htmx-request .htmx-indicator {
  opacity: 1;
}
.htmx-request.htmx-indicator {
  opacity: 1;
}
</style>

<!-- テキストベースのインジケーター -->
<button hx-get="/api/data" hx-indicator="#loading">
  保存
</button>
<span id="loading" class="htmx-indicator">
  保存中...
</span>

<!-- ボタン自体を無効化 + インジケーター -->
<button hx-post="/api/submit"
        hx-disabled-elt="this"
        hx-indicator="this">
  <span class="normal-text">送信</span>
  <span class="htmx-indicator">送信中...</span>
</button>

<!-- グローバルインジケーター -->
<div id="global-indicator" class="htmx-indicator"
     style="position:fixed; top:0; left:0; right:0;
            height:3px; background:var(--color-primary);">
</div>
<body hx-indicator="#global-indicator">
  <!-- 全リクエストで表示 -->
</body>`,
      },
      {
        title: "ローディングスケルトンとプレースホルダー",
        content:
          "htmx-indicator 以外にも、スケルトンスクリーンやプレースホルダーでローディング状態を表現できます。hx-trigger=\"load\" と組み合わせて初期表示時のスケルトンを実現したり、htmx-settling クラスでアニメーションを制御したりできます。",
        code: `<!-- スケルトンスクリーン -->
<div hx-get="/api/user-card"
     hx-trigger="load"
     hx-swap="outerHTML">
  <!-- 読み込み前のスケルトン -->
  <div class="skeleton">
    <div class="skeleton-avatar"></div>
    <div class="skeleton-text"></div>
    <div class="skeleton-text short"></div>
  </div>
</div>

<style>
.skeleton { padding: 16px; }
.skeleton-avatar {
  width: 48px; height: 48px;
  border-radius: 50%;
  background: #e0e0e0;
  animation: pulse 1.5s infinite;
}
.skeleton-text {
  height: 16px; margin-top: 8px;
  background: #e0e0e0; border-radius: 4px;
  animation: pulse 1.5s infinite;
}
.skeleton-text.short { width: 60%; }
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>

<!-- htmx-settling クラスでアニメーション -->
<style>
.fade-in {
  opacity: 0;
}
.fade-in.htmx-settling {
  opacity: 0;
}
.fade-in.htmx-added {
  opacity: 0;
}
.fade-in {
  opacity: 1;
  transition: opacity 300ms ease-in;
}
</style>

<div hx-get="/api/content"
     hx-swap="innerHTML settle:300ms"
     class="fade-in">
  コンテンツ
</div>`,
      },
      {
        title: "プログレスバーとリクエスト状態",
        content:
          "リクエストの進行状態をプログレスバーやステータスメッセージで表示できます。htmx:xhr:progress イベントでアップロードの進行状況を取得し、htmx:beforeRequest / htmx:afterRequest でリクエスト状態を管理します。",
        code: `<!-- プログレスバー -->
<div id="progress-bar"
     style="height:3px; background:#4A90D9;
            width:0%; transition:width 200ms;">
</div>

<form hx-post="/api/upload"
      hx-encoding="multipart/form-data"
      hx-indicator="#progress-bar">
  <input type="file" name="file">
  <button type="submit">アップロード</button>
</form>

<!-- アップロード進行状況の監視 -->
<script>
document.body.addEventListener("htmx:xhr:progress", (e) => {
  const progress = e.detail.loaded / e.detail.total * 100;
  document.getElementById("progress-bar")
    .style.width = progress + "%";
});
</script>

<!-- リクエスト状態のカスタム管理 -->
<script>
let activeRequests = 0;

document.body.addEventListener("htmx:beforeRequest", () => {
  activeRequests++;
  document.body.classList.add("loading");
});

document.body.addEventListener("htmx:afterRequest", () => {
  activeRequests--;
  if (activeRequests === 0) {
    document.body.classList.remove("loading");
  }
});
</script>

<!-- NProgress との統合 -->
<!--
document.body.addEventListener("htmx:beforeRequest", () => {
  NProgress.start();
});
document.body.addEventListener("htmx:afterRequest", () => {
  NProgress.done();
});
-->`,
      },
    ],
  },
  {
    id: "active-search",
    title: "アクティブサーチ",
    category: "ui-patterns",
    description:
      "リアルタイム検索、デバウンス、検索サジェスト、フィルタリングの実装",
    sections: [
      {
        title: "リアルタイム検索の実装",
        content:
          "HTMX を使えば、入力に応じてリアルタイムに検索結果を表示する機能を簡単に実装できます。hx-trigger=\"input changed delay:300ms\" でデバウンスを行い、不要なリクエストを削減します。hx-indicator でローディング表示を追加し、UXを向上させます。",
        code: `<!-- リアルタイム検索 -->
<div class="search-container">
  <input type="text" name="q"
         hx-get="/api/search"
         hx-trigger="input changed delay:300ms"
         hx-target="#search-results"
         hx-indicator="#search-spinner"
         hx-sync="this:replace"
         placeholder="ユーザーを検索...">
  <span id="search-spinner" class="htmx-indicator">
    検索中...
  </span>
</div>
<div id="search-results"></div>

<!-- サーバーのレスポンス例 -->
<!--
GET /api/search?q=alice

<div class="result-item">
  <h3>Alice Johnson</h3>
  <p>alice@example.com</p>
</div>
<div class="result-item">
  <h3>Alice Smith</h3>
  <p>asmith@example.com</p>
</div>
-->

<!-- フィルター付き検索 -->
<div class="search-form">
  <input type="text" name="q"
         hx-get="/api/search"
         hx-trigger="input changed delay:300ms"
         hx-target="#results"
         hx-include="[name='category'], [name='sort']">

  <select name="category"
          hx-get="/api/search"
          hx-trigger="change"
          hx-target="#results"
          hx-include="[name='q'], [name='sort']">
    <option value="">すべて</option>
    <option value="tech">技術</option>
    <option value="design">デザイン</option>
  </select>

  <select name="sort"
          hx-get="/api/search"
          hx-trigger="change"
          hx-target="#results"
          hx-include="[name='q'], [name='category']">
    <option value="relevance">関連度</option>
    <option value="date">新着順</option>
  </select>
</div>
<div id="results"></div>`,
      },
      {
        title: "検索サジェストとオートコンプリート",
        content:
          "検索サジェストはユーザーの入力に応じて候補を表示する機能です。HTMX で入力フィールドの下にドロップダウンを表示し、候補をクリックすると値がセットされるように実装できます。キーボードナビゲーションの実装にはJavaScriptが少し必要です。",
        code: `<!-- オートコンプリート -->
<div class="autocomplete" style="position: relative;">
  <input type="text" name="city"
         hx-get="/api/cities/suggest"
         hx-trigger="input changed delay:200ms"
         hx-target="#suggestions"
         autocomplete="off"
         placeholder="都市名を入力...">
  <div id="suggestions"
       style="position:absolute; top:100%; left:0; right:0;
              background:white; border:1px solid #ddd;
              display:none; z-index:10;">
  </div>
</div>

<!-- サーバーのレスポンス例 -->
<!--
GET /api/cities/suggest?city=tok

<div style="display:block;">
  <button class="suggestion"
          hx-get="/api/cities/select"
          hx-vals='{"city":"東京"}'
          hx-target="closest .autocomplete input"
          hx-swap="outerHTML"
          onclick="this.closest('#suggestions')
                   .style.display='none'">
    東京
  </button>
  <button class="suggestion"
          hx-get="/api/cities/select"
          hx-vals='{"city":"徳島"}'
          ...>
    徳島
  </button>
</div>
-->

<!-- テーブルのライブフィルター -->
<input type="text" name="filter"
       hx-get="/api/users/filter"
       hx-trigger="input changed delay:200ms"
       hx-target="tbody"
       placeholder="テーブルをフィルター...">
<table>
  <thead>
    <tr><th>名前</th><th>メール</th><th>役割</th></tr>
  </thead>
  <tbody>
    <!-- フィルタ結果の行がここに入る -->
  </tbody>
</table>`,
      },
      {
        title: "検索結果のハイライトとページネーション",
        content:
          "検索結果のキーワードハイライト、ヒット件数の表示、結果のページネーションを HTMX で実装できます。OOB スワップでヒット件数を別エリアに表示し、「もっと見る」ボタンで追加結果を読み込むパターンが実用的です。",
        code: `<!-- 検索 + ヒット件数 + ページネーション -->
<input type="text" name="q"
       hx-get="/api/search"
       hx-trigger="input changed delay:300ms"
       hx-target="#results">

<div id="hit-count">0 件</div>
<div id="results"></div>

<!-- サーバーレスポンス（OOB でヒット件数も更新） -->
<!--
<div class="result-item">
  <h3>JavaScript<mark>入門</mark>ガイド</h3>
  <p>...<mark>入門</mark>者向けの解説...</p>
</div>
<div class="result-item">
  <h3>React<mark>入門</mark></h3>
  <p>Reactの基礎から...</p>
</div>

<div id="hit-count" hx-swap-oob="true">42 件</div>
-->

<!-- 「もっと見る」ボタン（追加読み込み） -->
<!--
サーバーレスポンスの末尾:

<div class="result-item">...</div>
<div class="result-item">...</div>

<button hx-get="/api/search?q=入門&page=2"
        hx-target="#results"
        hx-swap="beforeend"
        hx-select=".result-item"
        hx-indicator="#load-more-spinner">
  もっと見る
  <span id="load-more-spinner" class="htmx-indicator">
    読み込み中...
  </span>
</button>
-->

<!-- 無限スクロール -->
<div id="results">
  <!-- 結果のアイテム -->
  <div hx-get="/api/search?q=keyword&page=2"
       hx-trigger="revealed"
       hx-swap="outerHTML"
       hx-select=".result-item">
    <!-- スクロールで自動読み込み -->
  </div>
</div>`,
      },
    ],
  },

  // ===== 高度な機能 =====
  {
    id: "hx-target-advanced",
    title: "ターゲット指定",
    category: "advanced",
    description:
      "hx-target の CSS セレクタ、closest、find、next、previous による柔軟なターゲット指定",
    sections: [
      {
        title: "拡張 CSS セレクタ",
        content:
          "hx-target は標準の CSS セレクタに加えて、HTMX 独自の拡張セレクタをサポートしています。this は自身、closest は最も近い祖先要素、find は子孫要素、next/previous は兄弟要素を指定できます。これにより柔軟なターゲット指定が可能です。",
        code: `<!-- this: 自身を対象 -->
<button hx-get="/api/update" hx-target="this" hx-swap="outerHTML">
  自分自身を置換
</button>

<!-- closest: 最も近い祖先要素 -->
<div class="card">
  <h3>カードタイトル</h3>
  <button hx-delete="/api/cards/1"
          hx-target="closest .card"
          hx-swap="outerHTML"
          hx-confirm="削除しますか？">
    削除
  </button>
</div>

<!-- find: 子孫要素 -->
<div class="panel">
  <button hx-get="/api/content"
          hx-target="find .content">
    コンテンツを更新
  </button>
  <div class="content">ここが更新される</div>
</div>

<!-- next / previous: 兄弟要素 -->
<button hx-get="/api/data" hx-target="next .output">
  次の .output を更新
</button>
<div class="output">ここが更新される</div>

<div class="output">ここが更新される</div>
<button hx-get="/api/data" hx-target="previous .output">
  前の .output を更新
</button>

<!-- body をターゲットにする -->
<a hx-get="/page/about" hx-target="body" hx-push-url="true">
  About ページ（SPA風遷移）
</a>`,
      },
      {
        title: "hx-select によるレスポンスの部分抽出",
        content:
          "hx-select はサーバーレスポンスから特定の要素だけを抽出してスワップします。完全なHTMLページを返すサーバーから必要な部分だけを取り出すのに便利です。hx-select-oob で OOB スワップの対象を絞り込むこともできます。",
        code: `<!-- hx-select: レスポンスから部分抽出 -->
<button hx-get="/full-page"
        hx-target="#content"
        hx-select="#main-content">
  メインコンテンツだけ取得
</button>

<!-- サーバーが完全なHTMLを返しても必要な部分だけ使う -->
<!--
サーバーレスポンス（完全なHTML）:
<html>
  <head>...</head>
  <body>
    <nav>...</nav>
    <div id="main-content">
      <h1>ページタイトル</h1>
      <p>コンテンツ</p>
    </div>
    <footer>...</footer>
  </body>
</html>

→ #main-content の中身だけ抽出してスワップ
-->

<!-- hx-select-oob: OOB の部分抽出 -->
<button hx-get="/full-page"
        hx-target="#content"
        hx-select="#main-content"
        hx-select-oob="#sidebar">
  コンテンツとサイドバーを同時に更新
</button>

<!-- 複数の要素を選択 -->
<button hx-get="/api/dashboard"
        hx-target="#stats"
        hx-select=".stat-card">
  統計カードを取得
</button>

<!-- プログレッシブエンハンスメント -->
<!-- サーバーは完全なHTMLを返すが、
     HTMX リクエスト時は必要な部分だけ使う -->
<a href="/products"
   hx-get="/products"
   hx-target="#product-list"
   hx-select="#product-list"
   hx-push-url="true">
  製品一覧
</a>`,
      },
      {
        title: "継承とデフォルト設定",
        content:
          "HTMX の属性は親要素から子要素に継承されます。この仕組みを利用して、共通の設定を親要素に1回だけ記述し、子要素全体に適用できます。hx-disinherit で特定の属性の継承を無効化できます。meta タグでグローバルなデフォルト設定も可能です。",
        code: `<!-- 属性の継承 -->
<div hx-target="#result"
     hx-swap="innerHTML"
     hx-indicator="#spinner">
  <!-- 子要素は hx-target, hx-swap, hx-indicator を継承 -->
  <button hx-get="/api/users">ユーザー</button>
  <button hx-get="/api/posts">投稿</button>
  <button hx-get="/api/comments">コメント</button>
</div>
<div id="result"></div>
<span id="spinner" class="htmx-indicator">読み込み中...</span>

<!-- body レベルでのデフォルト設定 -->
<body hx-headers='{"X-CSRF-Token": "abc123"}'
      hx-indicator="#global-spinner">
  <!-- 全リクエストに CSRF トークンとスピナーを適用 -->
</body>

<!-- hx-disinherit: 継承を無効化 -->
<div hx-target="#result" hx-swap="innerHTML">
  <button hx-get="/api/data">継承される</button>

  <!-- この要素は hx-target を継承しない -->
  <button hx-get="/api/other"
          hx-disinherit="hx-target"
          hx-target="this">
    独自のターゲット
  </button>

  <!-- 全属性の継承を無効化 -->
  <div hx-disinherit="*">
    <button hx-get="/api/data" hx-target="#other">
      継承なし
    </button>
  </div>
</div>

<!-- meta タグでグローバル設定 -->
<meta name="htmx-config"
      content='{"defaultSwapStyle": "outerHTML",
                "defaultSettleDelay": 100,
                "historyCacheSize": 20}'>`,
      },
    ],
  },
  {
    id: "history",
    title: "History管理",
    category: "advanced",
    description:
      "hx-push-url、hx-replace-url、ブラウザ履歴との連携、ディープリンク対応",
    sections: [
      {
        title: "hx-push-url と hx-replace-url",
        content:
          "hx-push-url は AJAX リクエスト後にブラウザの URL バーを更新し、履歴エントリを追加します。これにより SPA のようなページ遷移とブラウザの「戻る」ボタンの両立が実現できます。hx-replace-url は履歴に追加せずに URL を置換します。",
        code: `<!-- hx-push-url: URLを更新して履歴に追加 -->
<nav>
  <a hx-get="/page/home"
     hx-target="#content"
     hx-push-url="true">
    ホーム
  </a>
  <a hx-get="/page/about"
     hx-target="#content"
     hx-push-url="true">
    About
  </a>
  <a hx-get="/page/contact"
     hx-target="#content"
     hx-push-url="true">
    お問い合わせ
  </a>
</nav>
<main id="content">
  <!-- ここがAJAXで切り替わる -->
</main>
<!-- 「戻る」ボタンで前のコンテンツに戻れる -->

<!-- カスタムURLを指定 -->
<button hx-get="/api/users?page=2"
        hx-target="#user-list"
        hx-push-url="/users?page=2">
  次のページ
</button>

<!-- hx-replace-url: URLを置換（履歴に追加しない） -->
<form hx-post="/api/search"
      hx-target="#results"
      hx-replace-url="/search?q={q}">
  <input type="text" name="q">
  <button type="submit">検索</button>
</form>

<!-- hx-push-url="false" で URL変更を防止 -->
<button hx-get="/api/modal-content"
        hx-target="#modal"
        hx-push-url="false">
  モーダルを開く（URL変更なし）
</button>`,
      },
      {
        title: "hx-boost によるプログレッシブエンハンスメント",
        content:
          "hx-boost はページ内のリンクとフォームを自動的に AJAX 化する機能です。通常のリンクやフォームが HTMX による部分更新に変換され、ページ全体のリロードが不要になります。JavaScript が無効な場合は通常のリンク/フォームとして動作するため、プログレッシブエンハンスメントが自然に実現できます。",
        code: `<!-- hx-boost: リンクとフォームを自動AJAX化 -->
<div hx-boost="true">
  <!-- これらのリンクは AJAX で遷移する -->
  <a href="/about">About</a>
  <a href="/blog">ブログ</a>
  <a href="/contact">お問い合わせ</a>

  <!-- フォームも AJAX で送信 -->
  <form action="/api/search" method="get">
    <input type="text" name="q">
    <button type="submit">検索</button>
  </form>
</div>

<!-- body 全体に適用 -->
<body hx-boost="true">
  <!-- サイト内の全リンク・フォームが AJAX 化 -->

  <!-- 特定のリンクを除外 -->
  <a href="/download.pdf" hx-boost="false">
    PDF ダウンロード（通常遷移）
  </a>

  <!-- 外部リンクは自動的に除外 -->
  <a href="https://example.com">外部サイト</a>
</body>

<!-- hx-boost + hx-push-url の組み合わせ -->
<!-- boost されたリンクは自動的に push-url される -->

<!-- hx-boost + hx-target で部分更新 -->
<body hx-boost="true" hx-target="#main-content">
  <nav>
    <a href="/page1">ページ1</a>
    <a href="/page2">ページ2</a>
  </nav>
  <main id="main-content">
    <!-- ここだけ更新される -->
  </main>
</body>`,
      },
      {
        title: "History API との連携",
        content:
          "HTMX は History API を使ってブラウザの「戻る」「進む」ボタンに対応します。キャッシュされたコンテンツを復元し、必要に応じてサーバーから再取得します。htmx:historyCacheMiss イベントでキャッシュミス時の動作をカスタマイズできます。",
        code: `<!-- History のキャッシュサイズ設定 -->
<meta name="htmx-config"
      content='{"historyCacheSize": 10}'>

<!-- History 復元時のイベント -->
<script>
// キャッシュから復元された時
document.body.addEventListener("htmx:historyRestore", (e) => {
  console.log("履歴から復元:", e.detail.path);
  // サードパーティライブラリの再初期化など
  initComponents();
});

// キャッシュミス（サーバーから再取得）
document.body.addEventListener("htmx:historyCacheMiss", (e) => {
  console.log("キャッシュミス、再取得:", e.detail.path);
});

// キャッシュミス時にフルページリロード
document.body.addEventListener("htmx:historyCacheMissLoad",
  (e) => {
    e.preventDefault();
    window.location.href = e.detail.path;
  }
);
</script>

<!-- hx-history="false" で履歴キャッシュを無効化 -->
<!-- 機密情報を含むページで使用 -->
<div hx-history="false">
  <h1>アカウント設定</h1>
  <p>この内容は履歴キャッシュに保存されない</p>
</div>

<!-- View Transitions API との統合 -->
<meta name="htmx-config"
      content='{"globalViewTransitions": true}'>
<!-- ページ遷移時にブラウザのView Transitionsが適用される -->

<style>
::view-transition-old(root) {
  animation: fade-out 200ms ease-out;
}
::view-transition-new(root) {
  animation: fade-in 200ms ease-in;
}
</style>`,
      },
    ],
  },

  // ===== 拡張・統合 =====
  {
    id: "extensions-detail",
    title: "拡張機能",
    category: "extensions",
    description:
      "hx-ext、json-enc、response-targets、SSE、WebSocket の活用",
    sections: [
      {
        title: "拡張機能の基本",
        content:
          "HTMX は拡張機能（extensions）でさまざまな機能を追加できます。hx-ext 属性で拡張を有効化します。公式の拡張には JSON エンコーディング、レスポンスターゲット、クラスツール、ヘッドサポートなどがあります。独自の拡張を作成することも可能です。",
        code: `<!-- 拡張機能の読み込みと有効化 -->
<script src="https://unpkg.com/htmx-ext-json-enc@2.0.1/json-enc.js">
</script>

<!-- json-enc: リクエストボディをJSONで送信 -->
<form hx-ext="json-enc"
      hx-post="/api/users"
      hx-target="#result">
  <input type="text" name="name" value="Alice">
  <input type="email" name="email" value="alice@example.com">
  <button type="submit">送信</button>
</form>
<!-- Content-Type: application/json -->
<!-- Body: {"name":"Alice","email":"alice@example.com"} -->

<!-- response-targets: ステータスコード別のターゲット -->
<script src="https://unpkg.com/htmx-ext-response-targets@2.0.1/response-targets.js">
</script>
<div hx-ext="response-targets">
  <form hx-post="/api/submit"
        hx-target="#success"
        hx-target-422="#validation-errors"
        hx-target-500="#server-error"
        hx-target-4*="#client-error">
    <input type="text" name="data">
    <button type="submit">送信</button>
  </form>
  <div id="success"></div>
  <div id="validation-errors"></div>
  <div id="client-error"></div>
  <div id="server-error"></div>
</div>

<!-- head-support: <head> 要素のマージ -->
<script src="https://unpkg.com/htmx-ext-head-support@2.0.1/head-support.js">
</script>
<body hx-ext="head-support">
  <!-- ページ遷移時にtitle, meta, linkなどを自動更新 -->
</body>`,
      },
      {
        title: "SSE と WebSocket",
        content:
          "HTMX は Server-Sent Events（SSE）と WebSocket をサポートしています。SSE はサーバーからクライアントへの一方向リアルタイム通信、WebSocket は双方向通信を提供します。リアルタイム通知、チャット、ライブフィードなどに活用できます。",
        code: `<!-- SSE（Server-Sent Events）拡張 -->
<script src="https://unpkg.com/htmx-ext-sse@2.2.2/sse.js">
</script>

<div hx-ext="sse"
     sse-connect="/api/events">

  <!-- 特定のイベント名でスワップ -->
  <div sse-swap="newMessage">
    メッセージがここに表示される
  </div>

  <div sse-swap="notification" hx-swap="beforeend">
    <!-- 通知が追加される -->
  </div>
</div>

<!-- サーバー側の SSE 実装（Node.js） -->
<!--
app.get("/api/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");

  setInterval(() => {
    res.write(\`event: newMessage\\n\`);
    res.write(\`data: <p>新しいメッセージ: \${Date.now()}</p>\\n\\n\`);
  }, 5000);
});
-->

<!-- WebSocket 拡張 -->
<script src="https://unpkg.com/htmx-ext-ws@2.0.1/ws.js">
</script>

<div hx-ext="ws" ws-connect="/ws/chat">
  <!-- WebSocket でメッセージ受信時にスワップ -->
  <div id="chat-messages" hx-swap-oob="beforeend">
  </div>

  <!-- フォーム送信で WebSocket にメッセージ送信 -->
  <form ws-send>
    <input type="text" name="message" placeholder="メッセージ...">
    <button type="submit">送信</button>
  </form>
</div>`,
      },
      {
        title: "Alpine.js との統合",
        content:
          "HTMX と Alpine.js は相性が良く、HTMX でサーバーとの通信を、Alpine.js でクライアントサイドのインタラクションを担当する分業が効果的です。HTMX が返したHTMLフラグメント内の Alpine.js コンポーネントも自動的に初期化されます。",
        code: `<!-- HTMX + Alpine.js の組み合わせ -->
<script defer src="https://unpkg.com/alpinejs@3/dist/cdn.min.js">
</script>
<script src="https://unpkg.com/htmx.org@2.0.4"></script>

<!-- Alpine.js でUI状態を管理、HTMXでサーバー通信 -->
<div x-data="{ showFilters: false }">
  <!-- Alpine.js でフィルターの表示/非表示を制御 -->
  <button @click="showFilters = !showFilters">
    フィルター
  </button>

  <div x-show="showFilters" x-transition>
    <select name="category"
            hx-get="/api/products"
            hx-trigger="change"
            hx-target="#product-list">
      <option value="all">すべて</option>
      <option value="electronics">電子機器</option>
    </select>
  </div>

  <div id="product-list"
       hx-get="/api/products"
       hx-trigger="load">
    <!-- 製品リスト -->
  </div>
</div>

<!-- HTMXレスポンス内でAlpine.jsを使う -->
<!-- サーバーレスポンス: -->
<!--
<div class="product-card"
     x-data="{ expanded: false }">
  <h3>商品名</h3>
  <button @click="expanded = !expanded">
    詳細を見る
  </button>
  <div x-show="expanded" x-transition>
    <p>商品の詳細説明...</p>
    <button hx-post="/api/cart/add"
            hx-vals='{"productId": "123"}'>
      カートに追加
    </button>
  </div>
</div>
-->`,
      },
    ],
  },
  {
    id: "server-integration",
    title: "サーバー統合",
    category: "extensions",
    description:
      "Spring Boot、Express.js、Django など各フレームワークとの連携パターン",
    sections: [
      {
        title: "Express.js との統合",
        content:
          "Express.js（Node.js）は HTMX との統合が非常にシンプルです。ルートハンドラで HTML フラグメントを返し、HX-Request ヘッダーで HTMX リクエストを判別します。テンプレートエンジン（EJS、Handlebars など）と組み合わせてHTMLを動的に生成します。",
        code: `// Express.js + HTMX の基本パターン

const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));

// HTMX リクエストの判別ミドルウェア
function isHtmx(req) {
  return req.headers["hx-request"] === "true";
}

// ユーザー一覧
app.get("/api/users", (req, res) => {
  const users = getUsers();
  if (isHtmx(req)) {
    // HTMX → HTMLフラグメントを返す
    const html = users.map(u =>
      \`<tr>
        <td>\${u.name}</td>
        <td>\${u.email}</td>
        <td>
          <button hx-delete="/api/users/\${u.id}"
                  hx-target="closest tr"
                  hx-swap="outerHTML"
                  hx-confirm="削除しますか？">
            削除
          </button>
        </td>
      </tr>\`
    ).join("");
    res.send(html);
  } else {
    // 通常 → 完全なHTMLページを返す
    res.render("users", { users });
  }
});

// ユーザー追加（OOB でカウント更新）
app.post("/api/users", (req, res) => {
  const user = createUser(req.body);
  const count = getUserCount();
  res.send(\`
    <tr>
      <td>\${user.name}</td>
      <td>\${user.email}</td>
    </tr>
    <span id="user-count" hx-swap-oob="true">
      \${count}件
    </span>
  \`);
});`,
      },
      {
        title: "Spring Boot との統合",
        content:
          "Spring Boot では Thymeleaf テンプレートエンジンと HTMX の組み合わせが一般的です。コントローラーで HTMX リクエストを判別し、フラグメント（th:fragment）を返します。htmx-spring-boot ライブラリを使うとレスポンスヘッダーの設定が簡単になります。",
        code: `// Spring Boot Controller
@Controller
public class UserController {

    @GetMapping("/users")
    public String users(Model model,
            @RequestHeader(value = "HX-Request",
                required = false) String htmxRequest) {
        model.addAttribute("users", userService.findAll());

        if ("true".equals(htmxRequest)) {
            // HTMX → フラグメントだけ返す
            return "users :: user-list";
        }
        // 通常 → 完全なページを返す
        return "users";
    }

    @PostMapping("/users")
    public String createUser(@ModelAttribute UserForm form,
            Model model, HttpServletResponse response) {
        User user = userService.create(form);
        model.addAttribute("user", user);
        model.addAttribute("count", userService.count());

        // HX-Trigger でイベントを発火
        response.setHeader("HX-Trigger", "userAdded");
        return "users :: user-row";
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        // 空レスポンス（hx-swap="delete" で要素削除）
        return ResponseEntity.ok("");
    }
}

<!-- Thymeleaf テンプレート (users.html) -->
<!--
<table>
  <tbody id="user-list" th:fragment="user-list">
    <tr th:each="user : \${users}" th:fragment="user-row">
      <td th:text="\${user.name}"></td>
      <td th:text="\${user.email}"></td>
    </tr>
  </tbody>
</table>
-->`,
      },
      {
        title: "サーバーサイドのベストプラクティス",
        content:
          "HTMX アプリケーションのサーバーサイド設計では、HTMLフラグメントを返す API と完全なページを返す通常リクエストの両対応が重要です。CSRF 保護、エラーレスポンスの HTML 化、OOB スワップの活用、テンプレートのフラグメント化が主要なパターンです。",
        code: `// サーバーサイド設計のベストプラクティス

// 1. HTMX/通常リクエストの両対応
app.get("/products", (req, res) => {
  const products = getProducts(req.query);
  if (isHtmx(req)) {
    res.render("products/_list", { products });
  } else {
    res.render("products/index", { products });
  }
});

// 2. バリデーションエラーのHTMLレスポンス
app.post("/api/users", (req, res) => {
  const errors = validate(req.body);
  if (errors.length > 0) {
    res.status(422).send(\`
      <div class="errors">
        \${errors.map(e =>
          \`<p class="error">\${e.message}</p>\`
        ).join("")}
      </div>
    \`);
    return;
  }
  // 成功処理...
});

// 3. リダイレクト
app.post("/api/login", (req, res) => {
  if (authenticated) {
    if (isHtmx(req)) {
      res.set("HX-Redirect", "/dashboard");
      res.send("");
    } else {
      res.redirect("/dashboard");
    }
  }
});

// 4. CSRF 保護
app.use((req, res, next) => {
  res.locals.csrfToken = generateToken();
  next();
});
// HTML: <body hx-headers='{"X-CSRF-Token": "{{csrfToken}}"}'>

// 5. レスポンスヘッダーのユーティリティ
function htmxResponse(res, options = {}) {
  if (options.trigger) res.set("HX-Trigger", options.trigger);
  if (options.redirect) res.set("HX-Redirect", options.redirect);
  if (options.refresh) res.set("HX-Refresh", "true");
  return res;
}`,
      },
    ],
  },

  // ===== 実践パターン =====
  {
    id: "patterns",
    title: "実践UIパターン",
    category: "practice",
    description:
      "無限スクロール、インライン編集、モーダル、タブの HTMX による実装",
    sections: [
      {
        title: "無限スクロール",
        content:
          "HTMX を使った無限スクロールは、リストの最後のアイテムに hx-trigger=\"revealed\" を設定するだけで実装できます。アイテムが表示されると自動的に次のページを読み込み、最後のアイテムの後に追加します。ページ番号の管理も属性で完結します。",
        code: `<!-- 無限スクロール -->
<div id="feed">
  <div class="post">投稿1</div>
  <div class="post">投稿2</div>
  <div class="post">投稿3</div>
  <!-- 最後のアイテムにトリガーを設定 -->
  <div hx-get="/api/posts?page=2"
       hx-trigger="revealed"
       hx-swap="outerHTML"
       hx-indicator="#load-spinner">
    <!-- このdivが表示されたら次のページを読み込み -->
  </div>
</div>
<div id="load-spinner" class="htmx-indicator">
  読み込み中...
</div>

<!-- サーバーレスポンス（page=2）-->
<!--
<div class="post">投稿4</div>
<div class="post">投稿5</div>
<div class="post">投稿6</div>

<div hx-get="/api/posts?page=3"
     hx-trigger="revealed"
     hx-swap="outerHTML">
</div>
-->
<!-- 最後のページではトリガー要素を含めない -->

<!-- 「もっと見る」ボタンパターン -->
<div id="post-list">
  <div class="post">投稿1</div>
  <div class="post">投稿2</div>
</div>
<button hx-get="/api/posts?page=2"
        hx-target="#post-list"
        hx-swap="beforeend"
        hx-indicator=".spinner">
  もっと見る
  <span class="spinner htmx-indicator">...</span>
</button>`,
      },
      {
        title: "インライン編集",
        content:
          "インライン編集は表示モードと編集モードを切り替えるパターンです。テキストをクリックすると入力フィールドに変わり、保存するとテキスト表示に戻ります。hx-swap=\"outerHTML\" で要素全体を切り替えるのが基本パターンです。",
        code: `<!-- 表示モード -->
<div id="user-1" class="user-card">
  <span class="name">Alice</span>
  <span class="email">alice@example.com</span>
  <button hx-get="/api/users/1/edit"
          hx-target="#user-1"
          hx-swap="outerHTML">
    編集
  </button>
</div>

<!-- GET /api/users/1/edit のレスポンス（編集モード） -->
<!--
<form id="user-1" class="user-card"
      hx-put="/api/users/1"
      hx-target="this"
      hx-swap="outerHTML">
  <input type="text" name="name" value="Alice">
  <input type="email" name="email" value="alice@example.com">
  <button type="submit">保存</button>
  <button hx-get="/api/users/1"
          hx-target="#user-1"
          hx-swap="outerHTML"
          type="button">
    キャンセル
  </button>
</form>
-->

<!-- PUT /api/users/1 のレスポンス（表示モードに戻る） -->
<!--
<div id="user-1" class="user-card">
  <span class="name">Alice (更新済み)</span>
  <span class="email">alice@example.com</span>
  <button hx-get="/api/users/1/edit"
          hx-target="#user-1"
          hx-swap="outerHTML">
    編集
  </button>
</div>
-->

<!-- Click-to-Edit（シンプル版） -->
<span hx-get="/api/field/edit"
      hx-trigger="click"
      hx-swap="outerHTML">
  クリックで編集
</span>`,
      },
      {
        title: "モーダルとタブ",
        content:
          "モーダルダイアログは HTMX でサーバーからコンテンツを取得して表示するパターンです。タブ切り替えは各タブの hx-get でコンテンツを動的に読み込みます。hx-push-url と組み合わせてディープリンクにも対応できます。",
        code: `<!-- モーダルダイアログ -->
<div id="modal-container"></div>

<button hx-get="/api/users/1/detail"
        hx-target="#modal-container">
  ユーザー詳細
</button>

<!-- サーバーレスポンス -->
<!--
<div id="modal" class="modal-overlay"
     _="on click if event.target === me remove me">
  <div class="modal-content">
    <h2>ユーザー詳細</h2>
    <p>名前: Alice</p>
    <p>メール: alice@example.com</p>
    <button onclick="this.closest('#modal').remove()">
      閉じる
    </button>
  </div>
</div>
-->

<!-- タブ切り替え -->
<div class="tabs">
  <button hx-get="/api/tabs/profile"
          hx-target="#tab-content"
          hx-push-url="/user/1/profile"
          class="active">
    プロフィール
  </button>
  <button hx-get="/api/tabs/posts"
          hx-target="#tab-content"
          hx-push-url="/user/1/posts">
    投稿
  </button>
  <button hx-get="/api/tabs/settings"
          hx-target="#tab-content"
          hx-push-url="/user/1/settings">
    設定
  </button>
</div>
<div id="tab-content"
     hx-get="/api/tabs/profile"
     hx-trigger="load">
  <!-- 初期コンテンツ -->
</div>

<!-- アクティブタブのスタイル制御 -->
<!--
hx-on::after-request="
  document.querySelectorAll('.tabs button')
    .forEach(b => b.classList.remove('active'));
  this.classList.add('active');
"
-->`,
      },
    ],
  },
  {
    id: "best-practices",
    title: "ベストプラクティス",
    category: "practice",
    description:
      "セキュリティ、パフォーマンス、デバッグ、テストの実践的なガイドライン",
    sections: [
      {
        title: "セキュリティ",
        content:
          "HTMX アプリケーションのセキュリティでは、CSRF 保護、XSS 対策、認証・認可が重要です。サーバーが返す HTML フラグメントもエスケープが必要です。hx-disable を使って信頼できないコンテンツ内の HTMX 属性を無効化できます。Content Security Policy との整合性にも注意が必要です。",
        code: `<!-- CSRF 保護 -->
<!-- メタタグでトークンを設定 -->
<meta name="csrf-token" content="{{csrfToken}}">

<!-- 全リクエストにトークンを含める -->
<body hx-headers='{"X-CSRF-Token": "{{csrfToken}}"}'>
  <!-- ... -->
</body>

<!-- JavaScript で動的にトークンを設定 -->
<script>
document.body.addEventListener("htmx:configRequest", (e) => {
  e.detail.headers["X-CSRF-Token"] =
    document.querySelector("meta[name=csrf-token]").content;
});
</script>

<!-- XSS 対策 -->
<!-- サーバー側で必ず HTML エスケープする -->
<!--
❌ res.send(\`<p>\${userInput}</p>\`);
✅ res.send(\`<p>\${escapeHtml(userInput)}</p>\`);
-->

<!-- hx-disable: 信頼できないコンテンツ内のHTMXを無効化 -->
<div hx-disable>
  <!-- ユーザー生成コンテンツ -->
  <!-- この中の hx-* 属性は無視される -->
</div>

<!-- hx-history="false": 機密ページをキャッシュしない -->
<div hx-history="false">
  <h1>アカウント情報</h1>
  <!-- 履歴キャッシュに保存されない -->
</div>

<!-- 認証エラー時のリダイレクト -->
<script>
document.body.addEventListener("htmx:responseError", (e) => {
  if (e.detail.xhr.status === 401) {
    window.location.href = "/login";
  }
});
</script>`,
      },
      {
        title: "パフォーマンスとデバッグ",
        content:
          "HTMX のパフォーマンスを最適化するには、レスポンスサイズの最小化、適切なキャッシュ、不要なリクエストの削減が重要です。htmx.logAll() でデバッグログを有効化でき、ブラウザの DevTools でリクエストとレスポンスを確認できます。",
        code: `<!-- デバッグ -->
<script>
// 全イベントのログを有効化
htmx.logAll();

// 特定のイベントだけログ
htmx.logger = function(elt, event, data) {
  if (event === "htmx:afterSwap") {
    console.log("スワップ完了:", elt, data);
  }
};
</script>

<!-- パフォーマンス最適化 -->

<!-- 1. デバウンスでリクエストを削減 -->
<input hx-get="/api/search"
       hx-trigger="input changed delay:300ms"
       hx-sync="this:replace">

<!-- 2. レスポンスの最小化（必要な部分だけ返す） -->
<!-- ❌ 完全なHTMLページを返す -->
<!-- ✅ 必要なHTMLフラグメントだけ返す -->

<!-- 3. hx-select で必要部分だけ抽出 -->
<div hx-get="/full-page"
     hx-select="#content-only">

<!-- 4. preload 拡張でホバー時に先読み -->
<script src="https://unpkg.com/htmx-ext-preload@2.0.1/preload.js">
</script>
<body hx-ext="preload">
  <a href="/page" preload="mousedown">
    マウスダウンで先読み
  </a>
  <a href="/page2" preload>
    ホバーで先読み
  </a>
</body>

<!-- 5. 不要な再レンダリングを防ぐ -->
<div hx-get="/api/status"
     hx-trigger="every 5s"
     hx-swap="innerHTML"
     hx-select-oob="#status-only">
</div>`,
      },
      {
        title: "テストとアーキテクチャ",
        content:
          "HTMX アプリケーションのテストは主にサーバーサイドの統合テストで行います。サーバーが正しい HTML フラグメントを返すかを検証し、E2E テスト（Playwright、Cypress）でクライアントサイドの動作を確認します。HTMX のアーキテクチャは Hypermedia 駆動設計（HATEOAS）に基づいています。",
        code: `// サーバーサイドのテスト（Jest + Express）
describe("GET /api/users", () => {
  test("HTMX リクエストでHTMLフラグメントを返す", async () => {
    const res = await request(app)
      .get("/api/users")
      .set("HX-Request", "true");

    expect(res.status).toBe(200);
    expect(res.text).toContain("<tr>");
    expect(res.text).toContain("Alice");
    // HTMLフラグメントであること（<html>を含まない）
    expect(res.text).not.toContain("<html>");
  });

  test("通常リクエストで完全なページを返す", async () => {
    const res = await request(app).get("/api/users");
    expect(res.text).toContain("<html>");
  });
});

// E2E テスト（Playwright）
test("インライン編集", async ({ page }) => {
  await page.goto("/users");
  await page.click("text=編集");
  await page.fill("input[name=name]", "Bob");
  await page.click("text=保存");
  await expect(page.locator(".name")).toHaveText("Bob");
});

// HTMX アーキテクチャの原則
// 1. サーバーが HTML を返す（JSON API ではない）
// 2. クライアントの状態は最小限（サーバーが真実）
// 3. Hypermedia（リンク/フォーム）で遷移を表現
// 4. プログレッシブエンハンスメント
//    （JS無効でも基本機能が動作）
// 5. 小さなHTMLフラグメントで部分更新`,
      },
    ],
  },
];
