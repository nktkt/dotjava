export interface JmeterSection {
  title: string;
  content: string;
  code?: string;
}

export interface JmeterChapter {
  id: string;
  title: string;
  description: string;
  category: string;
  sections: JmeterSection[];
}

export interface JmeterCategory {
  id: string;
  name: string;
  color: string;
}

export const jmeterCategories: JmeterCategory[] = [
  { id: "basics", name: "基礎", color: "#2563EB" },
  { id: "components", name: "コンポーネント", color: "#059669" },
  { id: "testing", name: "テスト実践", color: "#D97706" },
  { id: "advanced", name: "応用・運用", color: "#DC2626" },
];

export const jmeterChapters: JmeterChapter[] = [
  // ===== 基礎 =====
  {
    id: "jmeter-intro",
    title: "JMeterの概要とインストール",
    category: "basics",
    description:
      "JMeterとは何か、インストール手順、基本的なGUI画面構成、CLIモードでの実行方法を学ぶ",
    sections: [
      {
        title: "JMeterとは何か",
        content:
          "Apache JMeterはオープンソースの負荷テストツールで、WebアプリケーションやAPIのパフォーマンスを測定するために広く使われています。元々はWebアプリケーションのテスト用に開発されましたが、現在ではJDBC、FTP、LDAP、SOAPなど多様なプロトコルに対応しています。100%Javaで実装されているため、Java環境があれば Windows・Mac・Linux を問わず動作します。",
        code: `<!-- JMeterの基本テスト計画（.jmx）の最小構造 -->
<jmeterTestPlan version="1.2" properties="5.0" jmeter="5.6.3">
  <hashTree>
    <TestPlan guiclass="TestPlanGui" testclass="TestPlan"
              testname="サンプルテスト計画" enabled="true">
      <stringProp name="TestPlan.comments">
        JMeterの基本的なテスト計画ファイルです
      </stringProp>
      <boolProp name="TestPlan.functional_mode">false</boolProp>
      <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
    </TestPlan>
    <hashTree/>
  </hashTree>
</jmeterTestPlan>`,
      },
      {
        title: "インストール手順",
        content:
          "JMeterを利用するにはJava 8以上（推奨はJava 17以上）がインストールされている必要があります。Apache JMeterの公式サイトからバイナリ版をダウンロードし、解凍するだけで利用可能です。Windowsではjmeter.bat、Mac/Linuxではjmeter.shを実行してGUIモードで起動できます。",
        code: `# ===== JMeterのインストールと起動手順 =====

# 1. Javaバージョンの確認（Java 8以上が必要）
java -version
# java version "17.0.8" 2023-07-18 LTS

# 2. JMeterのダウンロードと解凍
wget https://archive.apache.org/dist/jmeter/binaries/apache-jmeter-5.6.3.tgz
tar -xzf apache-jmeter-5.6.3.tgz
cd apache-jmeter-5.6.3

# 3. GUIモードで起動
# Windows:
bin/jmeter.bat
# Mac/Linux:
bin/jmeter.sh

# 4. 環境変数の設定（推奨）
export JMETER_HOME=/opt/apache-jmeter-5.6.3
export PATH=\${JMETER_HOME}/bin:\${PATH}

# 5. Homebrewでのインストール（Mac）
brew install jmeter`,
      },
      {
        title: "GUI画面の基本構成",
        content:
          "JMeterのGUI画面は左側のツリービューと右側の設定パネルで構成されています。ツリーの最上位には「テスト計画（Test Plan）」があり、その下にスレッドグループ、サンプラー、リスナーなどの要素を階層的に配置します。メニューバーからは要素の追加、テストの実行・停止、ファイルの保存・読み込みが行えます。",
        code: `<!-- GUI画面で構成する基本的なテスト計画の構造 -->
<TestPlan guiclass="TestPlanGui" testclass="TestPlan"
          testname="Webアプリ負荷テスト" enabled="true">
  <stringProp name="TestPlan.comments">
    基本構成: テスト計画 > スレッドグループ > サンプラー > リスナー
  </stringProp>
  <!-- ユーザー定義変数 -->
  <elementProp name="TestPlan.user_defined_variables"
               elementType="Arguments">
    <collectionProp name="Arguments.arguments">
      <elementProp name="BASE_URL" elementType="Argument">
        <stringProp name="Argument.name">BASE_URL</stringProp>
        <stringProp name="Argument.value">http://localhost:8080</stringProp>
      </elementProp>
      <elementProp name="CONTEXT_PATH" elementType="Argument">
        <stringProp name="Argument.name">CONTEXT_PATH</stringProp>
        <stringProp name="Argument.value">/api/v1</stringProp>
      </elementProp>
    </collectionProp>
  </elementProp>
</TestPlan>`,
      },
      {
        title: "CLIモード実行",
        content:
          "本番の負荷テストではGUIモードではなくCLI（Non-GUI）モードで実行することが推奨されます。GUIモードはリソースを多く消費するため、大規模テストでは正確な結果が得られない場合があります。-n オプションでCLIモード、-t でテスト計画ファイル、-l で結果ファイルを指定して実行します。",
        code: `# ===== CLIモード（Non-GUIモード）での実行 =====

# 基本的な実行コマンド
jmeter -n -t test-plan.jmx -l result.jtl

# オプション付き実行
jmeter -n \\
  -t /path/to/test-plan.jmx \\
  -l /path/to/result.jtl \\
  -e \\                          # テスト後にHTMLレポート生成
  -o /path/to/report-output \\   # HTMLレポート出力先
  -Jthreads=100 \\               # JMeterプロパティの上書き
  -Jrampup=60 \\
  -Jduration=300

# JVMヒープサイズの調整（大規模テスト時）
export JVM_ARGS="-Xms1g -Xmx4g -XX:MaxMetaspaceSize=512m"
jmeter -n -t large-test.jmx -l result.jtl

# テスト結果からHTMLレポートを後から生成
jmeter -g result.jtl -o /path/to/html-report

# ログレベルの変更
jmeter -n -t test.jmx -l result.jtl -Lorg.apache.jmeter=DEBUG`,
      },
    ],
  },
  {
    id: "thread-group",
    title: "スレッドグループの理解",
    category: "basics",
    description:
      "スレッドグループの概念、スレッド数・Ramp-Up・ループ回数の設定、スケジューラ機能、Ultimate Thread Groupプラグインを学ぶ",
    sections: [
      {
        title: "スレッドグループとは",
        content:
          "スレッドグループはJMeterにおける仮想ユーザーの集まりを表す最も基本的な要素です。すべてのサンプラーやコントローラーはスレッドグループの配下に配置する必要があります。1つのテスト計画に複数のスレッドグループを含めることができ、それぞれ独立した仮想ユーザーシナリオとして並列に実行されます。",
        code: `<!-- スレッドグループの基本定義 -->
<ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup"
             testname="基本スレッドグループ" enabled="true">
  <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
  <elementProp name="ThreadGroup.main_controller"
               elementType="LoopController">
    <boolProp name="LoopController.continue_forever">false</boolProp>
    <stringProp name="LoopController.loops">1</stringProp>
  </elementProp>
  <!-- スレッド数（仮想ユーザー数） -->
  <stringProp name="ThreadGroup.num_threads">10</stringProp>
  <!-- Ramp-Up期間（秒） -->
  <stringProp name="ThreadGroup.ramp_time">30</stringProp>
  <!-- エラー時の動作: continue / startnextloop / stopthread / stoptest / stoptestnow -->
  <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
</ThreadGroup>`,
      },
      {
        title: "スレッド数・Ramp-Up・ループ回数",
        content:
          "スレッド数は同時に実行する仮想ユーザーの数を表します。Ramp-Up期間はすべてのスレッドが起動するまでの時間（秒）で、例えばスレッド数100でRamp-Upが10秒なら、1秒あたり10スレッドずつ起動します。ループ回数は各スレッドがテストシナリオを繰り返す回数で、「無限」に設定するとスケジューラまたは手動停止まで繰り返します。",
        code: `<!-- 段階的な負荷テストの設定例 -->
<!-- シナリオ: 100ユーザーが60秒かけて徐々に増加し、各ユーザーが5回繰り返す -->
<ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup"
             testname="段階的負荷テスト" enabled="true">
  <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
  <elementProp name="ThreadGroup.main_controller"
               elementType="LoopController">
    <boolProp name="LoopController.continue_forever">false</boolProp>
    <!-- ループ回数: 各スレッドが5回繰り返す -->
    <stringProp name="LoopController.loops">5</stringProp>
  </elementProp>
  <!-- 100スレッド（仮想ユーザー） -->
  <stringProp name="ThreadGroup.num_threads">100</stringProp>
  <!-- 60秒かけて100スレッドを起動（1秒あたり約1.67スレッド） -->
  <stringProp name="ThreadGroup.ramp_time">60</stringProp>
  <!-- 遅延起動を有効にする -->
  <boolProp name="ThreadGroup.delayedStart">true</boolProp>
</ThreadGroup>

<!--
  計算例:
  - スレッド数: 100
  - Ramp-Up: 60秒 → 1秒あたり 100/60 ≒ 1.67 スレッド起動
  - ループ回数: 5
  - 合計リクエスト数: 100 × 5 = 500 リクエスト
-->`,
      },
      {
        title: "スケジューラ設定",
        content:
          "スケジューラを有効にすると、テストの実行時間（Duration）と開始遅延（Startup Delay）を秒単位で指定できます。ループ回数を「無限」に設定してスケジューラのDurationで実行時間を制御するのが一般的なパターンです。これにより一定時間の負荷テストを実施できます。",
        code: `<!-- スケジューラを使った時間制御テスト -->
<!-- シナリオ: 50ユーザーが5分間（300秒）連続して負荷をかける -->
<ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup"
             testname="時間指定負荷テスト" enabled="true">
  <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
  <elementProp name="ThreadGroup.main_controller"
               elementType="LoopController">
    <boolProp name="LoopController.continue_forever">false</boolProp>
    <!-- ループ回数を -1（無限）に設定 -->
    <intProp name="LoopController.loops">-1</intProp>
  </elementProp>
  <stringProp name="ThreadGroup.num_threads">50</stringProp>
  <stringProp name="ThreadGroup.ramp_time">30</stringProp>
  <!-- スケジューラを有効化 -->
  <boolProp name="ThreadGroup.scheduler">true</boolProp>
  <!-- テスト実行時間: 300秒（5分間） -->
  <stringProp name="ThreadGroup.duration">300</stringProp>
  <!-- 開始遅延: 5秒待ってから開始 -->
  <stringProp name="ThreadGroup.delay">5</stringProp>
</ThreadGroup>`,
      },
      {
        title: "Ultimate Thread Group（プラグイン）",
        content:
          "Ultimate Thread Groupは JMeter Plugins から提供される拡張スレッドグループで、複数の負荷段階を柔軟に定義できます。標準のスレッドグループでは表現しにくい段階的な負荷増加・一定負荷維持・段階的な負荷減少といったシナリオを1つのスレッドグループで構成できます。プラグインマネージャ（jmeter-plugins-manager）を使ってインストールします。",
        code: `# ===== Ultimate Thread Group プラグインのインストール =====

# 1. プラグインマネージャのダウンロード
wget -O lib/ext/jmeter-plugins-manager-1.10.jar \\
  https://jmeter-plugins.org/get/

# 2. JMeter再起動後、メニューから
#    Options > Plugins Manager > Available Plugins
#    「Custom Thread Groups」を検索してインストール

# ===== Ultimate Thread Groupの設定例（JMX抜粋） =====
# 以下の設定で段階的な負荷パターンを定義:
#   Phase 1: 0→50ユーザー（30秒Ramp-Up）→ 60秒維持 → 10秒Ramp-Down
#   Phase 2: 0→100ユーザー（60秒Ramp-Up）→ 120秒維持 → 30秒Ramp-Down

<!-- Ultimate Thread Group設定 -->
<kg.apc.jmeter.threads.UltimateThreadGroup
    guiclass="kg.apc.jmeter.threads.UltimateThreadGroupGui"
    testclass="kg.apc.jmeter.threads.UltimateThreadGroup"
    testname="段階的負荷シナリオ" enabled="true">
  <collectionProp name="ultimatethreadgroupdata">
    <!-- Phase 1: 開始遅延0秒, 50スレッド, 30秒Ramp-Up, 60秒維持, 10秒Ramp-Down -->
    <collectionProp name="phase1">
      <stringProp name="Start Threads Count">50</stringProp>
      <stringProp name="Initial Delay, sec">0</stringProp>
      <stringProp name="Startup Time, sec">30</stringProp>
      <stringProp name="Hold Load For, sec">60</stringProp>
      <stringProp name="Shutdown Time">10</stringProp>
    </collectionProp>
    <!-- Phase 2: 開始遅延30秒, 100スレッド, 60秒Ramp-Up, 120秒維持, 30秒Ramp-Down -->
    <collectionProp name="phase2">
      <stringProp name="Start Threads Count">100</stringProp>
      <stringProp name="Initial Delay, sec">30</stringProp>
      <stringProp name="Startup Time, sec">60</stringProp>
      <stringProp name="Hold Load For, sec">120</stringProp>
      <stringProp name="Shutdown Time">30</stringProp>
    </collectionProp>
  </collectionProp>
</kg.apc.jmeter.threads.UltimateThreadGroup>`,
      },
    ],
  },
  // ===== コンポーネント =====
  {
    id: "http-sampler",
    title: "HTTPリクエストサンプラー",
    category: "components",
    description:
      "HTTPリクエストサンプラーの設定方法、ヘッダーマネージャ、パラメータ・ボディデータの送信、Cookie/認証マネージャを学ぶ",
    sections: [
      {
        title: "GET/POSTリクエスト設定",
        content:
          "HTTPリクエストサンプラーはJMeterで最も使用頻度の高いサンプラーで、Webサーバーに対してHTTPリクエストを送信します。プロトコル（http/https）、サーバー名、ポート番号、パス、HTTPメソッド（GET/POST/PUT/DELETE等）を指定します。HTTPリクエストデフォルト（HTTP Request Defaults）を使えば、共通設定を一括で管理できます。",
        code: `<!-- GETリクエストサンプラー -->
<HTTPSamplerProxy guiclass="HttpTestSampleGui"
                  testclass="HTTPSamplerProxy"
                  testname="ユーザー一覧取得 GET" enabled="true">
  <stringProp name="HTTPSampler.domain">\${BASE_URL}</stringProp>
  <stringProp name="HTTPSampler.port">8080</stringProp>
  <stringProp name="HTTPSampler.protocol">http</stringProp>
  <stringProp name="HTTPSampler.path">/api/v1/users</stringProp>
  <stringProp name="HTTPSampler.method">GET</stringProp>
  <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
  <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
  <stringProp name="HTTPSampler.connect_timeout">5000</stringProp>
  <stringProp name="HTTPSampler.response_timeout">30000</stringProp>
</HTTPSamplerProxy>

<!-- POSTリクエストサンプラー -->
<HTTPSamplerProxy guiclass="HttpTestSampleGui"
                  testclass="HTTPSamplerProxy"
                  testname="ユーザー登録 POST" enabled="true">
  <stringProp name="HTTPSampler.domain">\${BASE_URL}</stringProp>
  <stringProp name="HTTPSampler.port">8080</stringProp>
  <stringProp name="HTTPSampler.protocol">http</stringProp>
  <stringProp name="HTTPSampler.path">/api/v1/users</stringProp>
  <stringProp name="HTTPSampler.method">POST</stringProp>
  <boolProp name="HTTPSampler.postBodyRaw">true</boolProp>
  <elementProp name="HTTPsampler.Arguments" elementType="Arguments">
    <collectionProp name="Arguments.arguments">
      <elementProp name="" elementType="HTTPArgument">
        <boolProp name="HTTPArgument.always_encode">false</boolProp>
        <stringProp name="Argument.value">{"name":"田中太郎","email":"tanaka@example.com"}</stringProp>
      </elementProp>
    </collectionProp>
  </elementProp>
</HTTPSamplerProxy>`,
      },
      {
        title: "ヘッダーマネージャ",
        content:
          "HTTPヘッダーマネージャ（HTTP Header Manager）はリクエストに送信するHTTPヘッダーを管理する設定要素です。Content-Type、Authorization、Accept などのヘッダーを追加できます。スレッドグループ直下に配置すると配下のすべてのサンプラーに適用され、個別のサンプラーの子要素として配置すると、そのサンプラーのみに適用されます。",
        code: `<!-- HTTPヘッダーマネージャ -->
<HeaderManager guiclass="HeaderPanel" testclass="HeaderManager"
               testname="共通HTTPヘッダー" enabled="true">
  <collectionProp name="HeaderManager.headers">
    <elementProp name="Content-Type" elementType="Header">
      <stringProp name="Header.name">Content-Type</stringProp>
      <stringProp name="Header.value">application/json</stringProp>
    </elementProp>
    <elementProp name="Accept" elementType="Header">
      <stringProp name="Header.name">Accept</stringProp>
      <stringProp name="Header.value">application/json</stringProp>
    </elementProp>
    <elementProp name="Authorization" elementType="Header">
      <stringProp name="Header.name">Authorization</stringProp>
      <stringProp name="Header.value">Bearer \${ACCESS_TOKEN}</stringProp>
    </elementProp>
    <elementProp name="X-Request-ID" elementType="Header">
      <stringProp name="Header.name">X-Request-ID</stringProp>
      <stringProp name="Header.value">\${__UUID()}</stringProp>
    </elementProp>
    <elementProp name="Accept-Language" elementType="Header">
      <stringProp name="Header.name">Accept-Language</stringProp>
      <stringProp name="Header.value">ja-JP</stringProp>
    </elementProp>
  </collectionProp>
</HeaderManager>`,
      },
      {
        title: "パラメータ・ボディデータ",
        content:
          "HTTPリクエストサンプラーでは、GETリクエストのクエリパラメータやPOSTリクエストのフォームデータを「Parameters」タブで名前と値のペアとして設定できます。JSON等のボディデータを送信する場合は「Body Data」タブに直接記述します。JMeter変数（\${変数名}）や関数（\${__function()}）を使って動的な値を設定することも可能です。",
        code: `<!-- クエリパラメータ付きGETリクエスト -->
<!-- GET /api/v1/users?page=1&size=20&sort=name&order=asc -->
<HTTPSamplerProxy guiclass="HttpTestSampleGui"
                  testclass="HTTPSamplerProxy"
                  testname="ユーザー検索" enabled="true">
  <stringProp name="HTTPSampler.path">/api/v1/users</stringProp>
  <stringProp name="HTTPSampler.method">GET</stringProp>
  <elementProp name="HTTPsampler.Arguments" elementType="Arguments">
    <collectionProp name="Arguments.arguments">
      <elementProp name="page" elementType="HTTPArgument">
        <stringProp name="Argument.name">page</stringProp>
        <stringProp name="Argument.value">\${PAGE_NUM}</stringProp>
        <boolProp name="HTTPArgument.always_encode">true</boolProp>
      </elementProp>
      <elementProp name="size" elementType="HTTPArgument">
        <stringProp name="Argument.name">size</stringProp>
        <stringProp name="Argument.value">20</stringProp>
      </elementProp>
      <elementProp name="sort" elementType="HTTPArgument">
        <stringProp name="Argument.name">sort</stringProp>
        <stringProp name="Argument.value">name</stringProp>
      </elementProp>
    </collectionProp>
  </elementProp>
</HTTPSamplerProxy>

<!-- JSONボディデータ付きPOSTリクエスト -->
<!-- POST /api/v1/orders -->
<HTTPSamplerProxy guiclass="HttpTestSampleGui"
                  testclass="HTTPSamplerProxy"
                  testname="注文登録" enabled="true">
  <stringProp name="HTTPSampler.path">/api/v1/orders</stringProp>
  <stringProp name="HTTPSampler.method">POST</stringProp>
  <boolProp name="HTTPSampler.postBodyRaw">true</boolProp>
  <elementProp name="HTTPsampler.Arguments" elementType="Arguments">
    <collectionProp name="Arguments.arguments">
      <elementProp name="" elementType="HTTPArgument">
        <stringProp name="Argument.value">{
  "userId": \${USER_ID},
  "items": [
    {"productId": "\${PRODUCT_ID}", "quantity": \${__Random(1,5)}},
    {"productId": "P002", "quantity": 1}
  ],
  "shippingAddress": "\${ADDRESS}",
  "paymentMethod": "CREDIT_CARD"
}</stringProp>
      </elementProp>
    </collectionProp>
  </elementProp>
</HTTPSamplerProxy>`,
      },
      {
        title: "Cookie/認証マネージャ",
        content:
          "HTTPクッキーマネージャはセッション管理に不可欠な要素で、サーバーから受信したCookieを自動的に保存し後続のリクエストに付与します。HTTP認証マネージャはBasic認証やDigest認証が必要なサイトに対して認証情報を自動的に送信します。どちらもスレッドグループ直下に配置すると配下の全サンプラーに適用されます。",
        code: `<!-- HTTPクッキーマネージャ -->
<CookieManager guiclass="CookiePanel" testclass="CookieManager"
               testname="HTTPクッキーマネージャ" enabled="true">
  <collectionProp name="CookieManager.cookies">
    <!-- 手動でCookieを追加する場合 -->
    <elementProp name="session_lang" elementType="Cookie"
                 testname="session_lang">
      <stringProp name="Cookie.value">ja</stringProp>
      <stringProp name="Cookie.domain">example.com</stringProp>
      <stringProp name="Cookie.path">/</stringProp>
      <boolProp name="Cookie.secure">false</boolProp>
      <longProp name="Cookie.expires">0</longProp>
    </elementProp>
  </collectionProp>
  <boolProp name="CookieManager.clearEachIteration">false</boolProp>
  <!-- Cookie Policy: standard / compatibility / netscape / best-match -->
  <stringProp name="CookieManager.policy">standard</stringProp>
  <stringProp name="CookieManager.implementation">
    org.apache.jmeter.protocol.http.control.HC4CookieHandler
  </stringProp>
</CookieManager>

<!-- HTTP認証マネージャ（Basic認証） -->
<AuthManager guiclass="AuthPanel" testclass="AuthManager"
             testname="HTTP認証マネージャ" enabled="true">
  <collectionProp name="AuthManager.auth_list">
    <elementProp name="" elementType="Authorization">
      <stringProp name="Authorization.url">http://\${BASE_URL}:8080</stringProp>
      <stringProp name="Authorization.username">\${AUTH_USER}</stringProp>
      <stringProp name="Authorization.password">\${AUTH_PASSWORD}</stringProp>
      <stringProp name="Authorization.domain"></stringProp>
      <stringProp name="Authorization.realm"></stringProp>
      <!-- BASIC / DIGEST / KERBEROS -->
      <stringProp name="Authorization.mechanism">BASIC</stringProp>
    </elementProp>
  </collectionProp>
  <boolProp name="AuthManager.controlledByThreadGroup">false</boolProp>
</AuthManager>`,
      },
    ],
  },
  {
    id: "listeners",
    title: "リスナーと結果分析",
    category: "components",
    description:
      "View Results Tree、Summary Report、グラフ表示、CSVファイル出力設定など、テスト結果の確認・分析手法を学ぶ",
    sections: [
      {
        title: "結果ツリー（View Results Tree）",
        content:
          "View Results Treeは各リクエストの詳細を個別に確認できるリスナーで、デバッグ時に最も多用されます。リクエストデータ、レスポンスヘッダー、レスポンスボディをそれぞれ確認でき、テキスト・JSON・XML・HTMLなどの表示形式を切り替えられます。ただし大量のデータを保持するためメモリを消費するので、本番の負荷テストでは無効化することが推奨されます。",
        code: `<!-- View Results Treeリスナー -->
<ResultCollector guiclass="ViewResultsFullVisualizer"
                 testclass="ResultCollector"
                 testname="結果ツリー" enabled="true">
  <boolProp name="ResultCollector.error_logging">false</boolProp>
  <objProp>
    <name>saveConfig</name>
    <value class="SampleSaveConfiguration">
      <time>true</time>
      <latency>true</latency>
      <timestamp>true</timestamp>
      <success>true</success>
      <label>true</label>
      <code>true</code>
      <message>true</message>
      <threadName>true</threadName>
      <dataType>true</dataType>
      <encoding>false</encoding>
      <assertions>true</assertions>
      <subresults>true</subresults>
      <responseData>true</responseData>
      <samplerData>true</samplerData>
      <xml>false</xml>
      <fieldNames>true</fieldNames>
      <responseHeaders>true</responseHeaders>
      <requestHeaders>true</requestHeaders>
      <responseDataOnError>true</responseDataOnError>
      <saveAssertionResultsFailureMessage>true</saveAssertionResultsFailureMessage>
      <url>true</url>
    </value>
  </objProp>
  <stringProp name="filename">/path/to/results/detail.jtl</stringProp>
</ResultCollector>`,
      },
      {
        title: "集約レポート（Summary Report）",
        content:
          "集約レポートはテスト結果の統計情報をサンプラーごとにまとめて表示するリスナーです。平均応答時間、中央値、90%タイル、最小値、最大値、スループット（リクエスト/秒）、エラー率などの主要な指標が一覧で確認できます。パフォーマンス要件の合否判定やボトルネックの特定に活用します。",
        code: `<!-- 集約レポートリスナー -->
<ResultCollector guiclass="SummaryReport"
                 testclass="ResultCollector"
                 testname="集約レポート" enabled="true">
  <boolProp name="ResultCollector.error_logging">false</boolProp>
  <objProp>
    <name>saveConfig</name>
    <value class="SampleSaveConfiguration">
      <time>true</time>
      <latency>true</latency>
      <timestamp>true</timestamp>
      <success>true</success>
      <label>true</label>
      <code>true</code>
      <message>true</message>
      <threadName>true</threadName>
      <dataType>false</dataType>
      <encoding>false</encoding>
      <assertions>false</assertions>
      <subresults>false</subresults>
      <responseData>false</responseData>
      <samplerData>false</samplerData>
      <xml>false</xml>
      <fieldNames>true</fieldNames>
      <responseHeaders>false</responseHeaders>
      <requestHeaders>false</requestHeaders>
    </value>
  </objProp>
  <stringProp name="filename">/path/to/results/summary.jtl</stringProp>
</ResultCollector>

<!--
  集約レポートの出力項目:
  ┌──────────────┬──────┬──────┬──────┬──────┬──────┬────────┬────────┐
  │ Label        │ #Sam │ Avg  │ Med  │ 90%  │ 95%  │ Error% │ Thr/s  │
  ├──────────────┼──────┼──────┼──────┼──────┼──────┼────────┼────────┤
  │ ユーザー一覧 │ 500  │ 120  │ 95   │ 210  │ 280  │ 0.00%  │ 45.2   │
  │ ユーザー登録 │ 500  │ 250  │ 200  │ 450  │ 520  │ 0.40%  │ 22.1   │
  │ TOTAL        │ 1000 │ 185  │ 148  │ 330  │ 400  │ 0.20%  │ 67.3   │
  └──────────────┴──────┴──────┴──────┴──────┴──────┴────────┴────────┘
-->`,
      },
      {
        title: "グラフ表示",
        content:
          "JMeterにはGraph ResultsやResponse Time Graphなどのグラフ表示リスナーが標準搭載されていますが、より詳細な分析にはJMeter Pluginsの各種グラフが推奨されます。Response Times Over Time、Active Threads Over Time、Transactions Per Second などのプラグインリスナーを使うことで、時系列でのパフォーマンス変化を視覚的に把握できます。",
        code: `<!-- 標準のグラフ結果リスナー -->
<ResultCollector guiclass="GraphVisualizer"
                 testclass="ResultCollector"
                 testname="グラフ結果" enabled="true">
  <boolProp name="ResultCollector.error_logging">false</boolProp>
  <objProp>
    <name>saveConfig</name>
    <value class="SampleSaveConfiguration">
      <time>true</time>
      <latency>true</latency>
      <timestamp>true</timestamp>
      <success>true</success>
      <label>true</label>
      <code>true</code>
    </value>
  </objProp>
  <stringProp name="filename"></stringProp>
</ResultCollector>

<!-- JMeter Plugins: Response Times Over Time -->
<kg.apc.jmeter.vizualizers.CorrectedResultCollector
    guiclass="kg.apc.jmeter.vizualizers.ResponseTimesOverTimeGui"
    testclass="kg.apc.jmeter.vizualizers.CorrectedResultCollector"
    testname="Response Times Over Time" enabled="true">
  <boolProp name="ResultCollector.error_logging">false</boolProp>
  <objProp>
    <name>saveConfig</name>
    <value class="SampleSaveConfiguration">
      <time>true</time>
      <latency>true</latency>
      <timestamp>true</timestamp>
      <success>true</success>
      <label>true</label>
    </value>
  </objProp>
  <stringProp name="filename">/path/to/results/response-times.jtl</stringProp>
  <longProp name="interval_grouping">1000</longProp>
</kg.apc.jmeter.vizualizers.CorrectedResultCollector>`,
      },
      {
        title: "CSVファイル出力設定",
        content:
          "JMeterのテスト結果はJTL形式（CSV形式またはXML形式）でファイルに保存できます。CSV形式はファイルサイズが小さく処理が高速なため、大規模テストではCSV形式が推奨されます。jmeter.propertiesまたはuser.propertiesファイルで出力項目をカスタマイズでき、結果ファイルからHTMLダッシュボードレポートを生成することも可能です。",
        code: `# ===== user.properties での結果出力設定 =====

# 結果ファイルの形式（csv / xml）
jmeter.save.saveservice.output_format=csv

# CSVファイルに保存する項目の設定
jmeter.save.saveservice.data_type=true
jmeter.save.saveservice.label=true
jmeter.save.saveservice.response_code=true
jmeter.save.saveservice.response_data=false
jmeter.save.saveservice.response_data.on_error=true
jmeter.save.saveservice.response_message=true
jmeter.save.saveservice.successful=true
jmeter.save.saveservice.thread_name=true
jmeter.save.saveservice.time=true
jmeter.save.saveservice.subresults=true
jmeter.save.saveservice.assertions=true
jmeter.save.saveservice.latency=true
jmeter.save.saveservice.connect_time=true
jmeter.save.saveservice.bytes=true
jmeter.save.saveservice.sent_bytes=true
jmeter.save.saveservice.thread_counts=true
jmeter.save.saveservice.idle_time=true
jmeter.save.saveservice.timestamp_format=ms
jmeter.save.saveservice.default_delimiter=,

# タイムスタンプ形式
# ms: ミリ秒（デフォルト、高速処理向き）
# yyyy/MM/dd HH:mm:ss.SSS: 人間が読める形式
jmeter.save.saveservice.timestamp_format=ms

# ===== CLIからHTMLレポートを生成 =====
jmeter -g result.jtl -o ./html-report/`,
      },
    ],
  },
  {
    id: "assertions",
    title: "アサーションと検証",
    category: "components",
    description:
      "レスポンスアサーション、JSONアサーション、期間アサーション、カスタムアサーション（BeanShell/JSR223）によるテスト検証を学ぶ",
    sections: [
      {
        title: "レスポンスアサーション",
        content:
          "レスポンスアサーションはHTTPレスポンスの内容を検証する最も基本的なアサーションです。レスポンスボディ、レスポンスコード、レスポンスヘッダー、リクエストURLなどを対象に、文字列の包含・一致・正規表現パターンを使って検証できます。複数の検証条件を1つのアサーションに設定することも可能です。",
        code: `<!-- レスポンスアサーション: ステータスコードの検証 -->
<ResponseAssertion guiclass="AssertionGui" testclass="ResponseAssertion"
                   testname="ステータスコード検証" enabled="true">
  <!-- テスト対象: Response Code -->
  <stringProp name="Assertion.test_field">Assertion.response_code</stringProp>
  <intProp name="Assertion.test_type">8</intProp> <!-- Equals -->
  <collectionProp name="Asserion.test_strings">
    <stringProp name="49586">200</stringProp>
  </collectionProp>
  <boolProp name="Assertion.assume_success">false</boolProp>
</ResponseAssertion>

<!-- レスポンスアサーション: レスポンスボディの文字列検証 -->
<ResponseAssertion guiclass="AssertionGui" testclass="ResponseAssertion"
                   testname="レスポンスボディ検証" enabled="true">
  <!-- テスト対象: Response Body (Text) -->
  <stringProp name="Assertion.test_field">Assertion.response_data</stringProp>
  <!-- テストタイプ: 2=Contains, 8=Equals, 1=Matches(正規表現), 16=Substring -->
  <intProp name="Assertion.test_type">2</intProp> <!-- Contains -->
  <collectionProp name="Asserion.test_strings">
    <stringProp name="success_check">"status":"success"</stringProp>
    <stringProp name="data_check">"data":</stringProp>
  </collectionProp>
  <boolProp name="Assertion.assume_success">false</boolProp>
  <stringProp name="Assertion.custom_message">
    レスポンスにstatus:successが含まれていません
  </stringProp>
</ResponseAssertion>`,
      },
      {
        title: "JSONアサーション",
        content:
          "JSONアサーションはJSON形式のレスポンスを効率的に検証するためのアサーションです。JSONPathを使って特定の要素の値を検証でき、ネストされた構造やリストの要素にもアクセスできます。REST APIのテストでは頻繁に使用され、レスポンスアサーションよりも構造化されたJSON検証が可能です。",
        code: `<!-- JSONアサーション: JSONPath式で値を検証 -->
<JSONPathAssertion guiclass="JSONPathAssertionGui"
                   testclass="JSONPathAssertion"
                   testname="JSONレスポンス検証" enabled="true">
  <!-- JSONPath式 -->
  <stringProp name="JSON_PATH">$.status</stringProp>
  <!-- 期待値 -->
  <stringProp name="EXPECTED_VALUE">success</stringProp>
  <boolProp name="JSONVALIDATION">true</boolProp>
  <boolProp name="EXPECT_NULL">false</boolProp>
  <boolProp name="INVERT">false</boolProp>
  <boolProp name="ISREGEX">false</boolProp>
</JSONPathAssertion>

<!-- JSONアサーション: 配列の要素数を検証 -->
<JSONPathAssertion guiclass="JSONPathAssertionGui"
                   testclass="JSONPathAssertion"
                   testname="配列要素数チェック" enabled="true">
  <stringProp name="JSON_PATH">$.data.users</stringProp>
  <stringProp name="EXPECTED_VALUE"></stringProp>
  <boolProp name="JSONVALIDATION">false</boolProp>
  <boolProp name="EXPECT_NULL">false</boolProp>
  <boolProp name="INVERT">false</boolProp>
  <boolProp name="ISREGEX">false</boolProp>
  <!-- パスが存在することのみ検証（値の検証なし） -->
</JSONPathAssertion>

<!-- JSONアサーション: 正規表現で値を検証 -->
<JSONPathAssertion guiclass="JSONPathAssertionGui"
                   testclass="JSONPathAssertion"
                   testname="メールアドレス形式チェック" enabled="true">
  <stringProp name="JSON_PATH">$.data.users[0].email</stringProp>
  <stringProp name="EXPECTED_VALUE">^[\\w.+-]+@[\\w-]+\\.[\\w.]+$</stringProp>
  <boolProp name="JSONVALIDATION">true</boolProp>
  <boolProp name="EXPECT_NULL">false</boolProp>
  <boolProp name="INVERT">false</boolProp>
  <!-- 正規表現として検証 -->
  <boolProp name="ISREGEX">true</boolProp>
</JSONPathAssertion>`,
      },
      {
        title: "期間アサーション（Duration Assertion）",
        content:
          "期間アサーション（Duration Assertion）はレスポンスの応答時間が指定したミリ秒以内であることを検証します。パフォーマンス要件（SLA）として「APIの応答時間は3秒以内」などの基準がある場合に有効です。アサーションに失敗したリクエストはエラーとしてカウントされ、リスナーで確認できます。",
        code: `<!-- 期間アサーション: 応答時間が3000ms以内であることを検証 -->
<DurationAssertion guiclass="DurationAssertionGui"
                   testclass="DurationAssertion"
                   testname="応答時間チェック (3秒以内)" enabled="true">
  <!-- 許容する最大応答時間（ミリ秒） -->
  <stringProp name="DurationAssertion.duration">3000</stringProp>
</DurationAssertion>

<!-- テスト計画での配置例 -->
<!--
テスト計画
  └── スレッドグループ
        ├── HTTPリクエスト: ログインAPI
        │     ├── レスポンスアサーション（ステータス200）
        │     └── 期間アサーション（2000ms以内）
        ├── HTTPリクエスト: データ取得API
        │     ├── JSONアサーション（レスポンス検証）
        │     └── 期間アサーション（3000ms以内）
        ├── HTTPリクエスト: レポート生成API（重い処理）
        │     ├── レスポンスアサーション（ステータス200）
        │     └── 期間アサーション（10000ms以内）
        └── 集約レポート
-->`,
      },
      {
        title: "カスタムアサーション（BeanShell/JSR223）",
        content:
          "JSR223アサーション（Groovy）やBeanShellアサーションを使うと、スクリプトで複雑なカスタム検証ロジックを記述できます。レスポンスデータの解析、複数条件の組み合わせ、動的な期待値との比較など、標準アサーションでは対応できない高度な検証が可能です。パフォーマンスの観点からGroovy（JSR223）の使用が推奨されます。",
        code: `<!-- JSR223アサーション（Groovy）でのカスタム検証 -->
<JSR223Assertion guiclass="TestBeanGUI" testclass="JSR223Assertion"
                 testname="カスタムJSON検証" enabled="true">
  <stringProp name="scriptLanguage">groovy</stringProp>
  <stringProp name="parameters"></stringProp>
  <stringProp name="filename"></stringProp>
  <stringProp name="cacheKey">true</stringProp>
  <stringProp name="script">
import groovy.json.JsonSlurper

// レスポンスデータを取得
def responseData = prev.getResponseDataAsString()
def json = new JsonSlurper().parseText(responseData)

// 1. ステータスコードの検証
if (prev.getResponseCode() != "200") {
    AssertionResult.setFailure(true)
    AssertionResult.setFailureMessage(
        "期待: 200, 実際: " + prev.getResponseCode()
    )
    return
}

// 2. JSONの構造検証
if (json.data == null) {
    AssertionResult.setFailure(true)
    AssertionResult.setFailureMessage("dataフィールドがnullです")
    return
}

// 3. レスポンス件数の検証（1件以上）
if (json.data.users == null || json.data.users.size() == 0) {
    AssertionResult.setFailure(true)
    AssertionResult.setFailureMessage("ユーザーデータが空です")
    return
}

// 4. 各ユーザーのフィールド検証
json.data.users.each { user ->
    if (!user.email?.contains("@")) {
        AssertionResult.setFailure(true)
        AssertionResult.setFailureMessage(
            "不正なメールアドレス: " + user.email
        )
    }
    if (user.name == null || user.name.trim().isEmpty()) {
        AssertionResult.setFailure(true)
        AssertionResult.setFailureMessage(
            "名前が空のユーザーが存在します: ID=" + user.id
        )
    }
}

// 5. 応答時間の検証（カスタムしきい値）
def responseTime = prev.getTime()
def threshold = 5000
if (responseTime > threshold) {
    AssertionResult.setFailure(true)
    AssertionResult.setFailureMessage(
        "応答時間超過: " + responseTime + "ms (しきい値: " + threshold + "ms)"
    )
}

log.info("カスタム検証完了: " + json.data.users.size() + "件のユーザーを検証")
  </stringProp>
</JSR223Assertion>`,
      },
    ],
  },
  {
    id: "logic-controllers",
    title: "ロジックコントローラ",
    category: "components",
    description:
      "テストの実行フローを制御するロジックコントローラの種類と使い方",
    sections: [
      {
        title: "If Controller（条件分岐）",
        content:
          "If Controllerは、指定した条件式がtrueの場合にのみ配下のサンプラーを実行します。JMeter変数やJMeter関数を使って条件を指定でき、テストシナリオに分岐ロジックを組み込めます。条件式はJavaScriptまたはJMeter式（__jexl3, __groovy）で記述します。",
        code: `<!-- If Controller: ステータスコードが200の場合のみ実行 -->
<IfController guiclass="IfControllerPanel"
    testclass="IfController" testname="成功時の処理">
  <stringProp name="IfController.condition">
    \${__groovy("\${statusCode}" == "200")}
  </stringProp>
  <boolProp name="IfController.evaluateAll">false</boolProp>
  <boolProp name="IfController.useExpression">true</boolProp>
</IfController>

<!-- 使用例: ログイン成功時のみ後続処理を実行 -->
<!--
  If Controller の条件例:
  - \${__groovy("\${token}" != "")}       トークンが空でない場合
  - \${__jexl3("\${count}" > 0)}          カウントが0より大きい場合
  - \${__groovy("\${role}" == "admin")}    管理者ロールの場合
-->`,
      },
      {
        title: "Loop Controller（ループ）",
        content:
          "Loop Controllerは、配下のサンプラーを指定回数繰り返し実行します。ループ回数は固定値またはJMeter変数で動的に設定可能です。-1を指定すると無限ループになります。Thread Groupのループカウントとは独立して動作するため、細かいループ制御が可能です。",
        code: `<!-- Loop Controller: 5回繰り返し実行 -->
<LoopController guiclass="LoopControlPanel"
    testclass="LoopController" testname="5回ループ">
  <boolProp name="LoopController.continue_forever">true</boolProp>
  <stringProp name="LoopController.loops">5</stringProp>
</LoopController>

<!-- 変数でループ回数を動的に設定 -->
<LoopController guiclass="LoopControlPanel"
    testclass="LoopController" testname="動的ループ">
  <stringProp name="LoopController.loops">\${loopCount}</stringProp>
</LoopController>

<!-- ループカウンタの取得（Counter要素と併用） -->
<!--
  Counter 設定:
    Start: 1
    Increment: 1
    Reference Name: counter
  → 各ループで \${counter} が 1, 2, 3... と増加
-->`,
      },
      {
        title: "Transaction Controller（トランザクション）",
        content:
          "Transaction Controllerは、複数のサンプラーをひとまとめのトランザクションとしてグループ化します。配下のすべてのリクエストの合計時間を1つのトランザクションとして計測できます。ビジネスシナリオ全体のレスポンスタイムを測定したい場合に使用します。",
        code: `<!-- Transaction Controller: ログインフロー全体を計測 -->
<TransactionController guiclass="TransactionControllerGui"
    testclass="TransactionController"
    testname="ログインフロー">
  <!-- 子サンプラーの時間を含める -->
  <boolProp name="TransactionController.includeTimers">
    false
  </boolProp>
  <!-- 親サンプラーを生成する -->
  <boolProp name="TransactionController.parent">true</boolProp>
</TransactionController>

<!--
  Transaction Controller の設定:
  ├── ログインページ表示 (GET /login)
  ├── ログイン実行 (POST /api/auth/login)
  └── ダッシュボード表示 (GET /dashboard)

  結果:
  「ログインフロー」として合計レスポンスタイムが記録される
  例: 150ms + 300ms + 200ms = 650ms（トランザクション全体）
-->`,
      },
      {
        title: "Random Controller（ランダム実行）",
        content:
          "Random Controllerは、配下のサンプラーからランダムに1つを選択して実行します。実際のユーザー行動をシミュレーションする場合に有効で、ページ遷移パターンの多様性を再現できます。Random Order Controllerを使うと、すべてのサンプラーをランダムな順序で実行します。",
        code: `<!-- Random Controller: ランダムに1つのページにアクセス -->
<RandomController guiclass="RandomControlGui"
    testclass="RandomController"
    testname="ランダムページアクセス">
  <intProp name="InterleaveControl.style">1</intProp>
</RandomController>

<!--
  Random Controller の配下に複数リクエストを配置:
  ├── 商品一覧ページ (GET /products)
  ├── お知らせページ (GET /news)
  ├── FAQページ (GET /faq)
  └── ブログページ (GET /blog)

  → 各イテレーションで上記のうち1つがランダムに選択される
-->

<!-- Random Order Controller: 全て実行するが順序はランダム -->
<RandomOrderController guiclass="RandomOrderControllerGui"
    testclass="RandomOrderController"
    testname="ランダム順序で全ページアクセス">
</RandomOrderController>
<!-- → 全リクエストを実行するが、毎回異なる順序で実行 -->`,
      },
    ],
  },
  {
    id: "timers-processors",
    title: "タイマーと前後処理",
    category: "components",
    description:
      "リクエスト間の待機時間制御と、リクエスト前後のデータ処理方法",
    sections: [
      {
        title: "Constant Timer（固定タイマー）",
        content:
          "Constant Timerは、各リクエストの前に固定時間の遅延を挿入します。実際のユーザーがページ間で思考・操作する時間（Think Time）をシミュレーションするために使用します。ミリ秒単位で指定し、サーバーへの過剰な負荷集中を防ぐ効果もあります。",
        code: `<!-- Constant Timer: 各リクエスト前に3秒待機 -->
<ConstantTimer guiclass="ConstantTimerGui"
    testclass="ConstantTimer"
    testname="3秒待機">
  <stringProp name="ConstantTimer.delay">3000</stringProp>
</ConstantTimer>

<!-- 変数を使った動的な待機時間 -->
<ConstantTimer guiclass="ConstantTimerGui"
    testclass="ConstantTimer"
    testname="動的待機">
  <stringProp name="ConstantTimer.delay">
    \${thinkTime}
  </stringProp>
</ConstantTimer>

<!--
  タイマーのスコープ:
  - Thread Group直下: 全サンプラーに適用
  - サンプラーの子要素: そのサンプラーのみに適用
  - Controller内: Controller配下のサンプラーに適用
-->`,
      },
      {
        title: "Gaussian Random Timer（ガウス分布タイマー）",
        content:
          "Gaussian Random Timerは、ガウス分布（正規分布）に基づいたランダムな遅延を挿入します。固定遅延値を中心に、指定した偏差の範囲でランダムにばらつきます。実際のユーザー行動はばらつきがあるため、Constant Timerより現実的なシミュレーションが可能です。",
        code: `<!-- Gaussian Random Timer -->
<!-- 遅延 = ガウス分布の乱数値 + 固定オフセット -->
<GaussianRandomTimer guiclass="GaussianRandomTimerGui"
    testclass="GaussianRandomTimer"
    testname="ランダム待機">
  <!-- 偏差: 1000ms（ばらつきの範囲） -->
  <stringProp name="RandomTimer.range">1000.0</stringProp>
  <!-- 固定オフセット: 2000ms（最低待機時間） -->
  <stringProp name="ConstantTimer.delay">2000</stringProp>
</GaussianRandomTimer>

<!--
  上記の設定の場合:
  - 中心値: 2000ms
  - 偏差: 1000ms
  - 実際の待機時間: 約1000ms〜3000ms（正規分布に従う）

  その他のタイマー:
  - Uniform Random Timer: 均一分布のランダム遅延
  - Poisson Random Timer: ポアソン分布のランダム遅延
  - Synchronizing Timer: 複数スレッドを同期させる
-->`,
      },
      {
        title: "前処理（PreProcessor）",
        content:
          "PreProcessorは、サンプラーの実行前にデータの準備や変数の設定を行います。代表的なものにJSR223 PreProcessorがあり、GroovyやJavaScriptでリクエストパラメータの動的生成やデータの前処理が可能です。タイムスタンプの生成やトークンの設定などに活用します。",
        code: `<!-- JSR223 PreProcessor: リクエスト前の前処理 -->
<JSR223PreProcessor guiclass="TestBeanGUI"
    testclass="JSR223PreProcessor"
    testname="リクエスト前処理">
  <stringProp name="scriptLanguage">groovy</stringProp>
  <stringProp name="script">
// タイムスタンプを変数に設定
def timestamp = System.currentTimeMillis()
vars.put("timestamp", timestamp.toString())

// UUIDを生成してリクエストIDとして使用
def requestId = UUID.randomUUID().toString()
vars.put("requestId", requestId)

// ランダムなユーザーエージェントを設定
def userAgents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
    "Mozilla/5.0 (Linux; Android 12)"
]
def random = new Random()
def ua = userAgents[random.nextInt(userAgents.size())]
sampler.getHeaderManager()?.add(
    new org.apache.jmeter.protocol.http.control.Header(
        "User-Agent", ua
    )
)

log.info("前処理完了: requestId=" + requestId)
  </stringProp>
</JSR223PreProcessor>`,
      },
      {
        title: "後処理（PostProcessor / 正規表現抽出）",
        content:
          "PostProcessorは、サンプラーの実行後にレスポンスからデータを抽出・加工します。正規表現抽出（Regular Expression Extractor）やJSR223 PostProcessorを使って、レスポンスから必要な値を取得し後続のリクエストで使用できます。セッションIDやトークンの取得に不可欠です。",
        code: `<!-- Regular Expression Extractor: CSRFトークン抽出 -->
<RegexExtractor guiclass="RegexExtractorGui"
    testclass="RegexExtractor"
    testname="CSRFトークン抽出">
  <!-- 対象: レスポンスボディ -->
  <stringProp name="RegexExtractor.useHeaders">false</stringProp>
  <stringProp name="RegexExtractor.refname">csrfToken</stringProp>
  <stringProp name="RegexExtractor.regex">
    name="csrf_token" value="(.+?)"
  </stringProp>
  <stringProp name="RegexExtractor.template">$1$</stringProp>
  <stringProp name="RegexExtractor.match_number">1</stringProp>
  <stringProp name="RegexExtractor.default">NOT_FOUND</stringProp>
</RegexExtractor>

<!-- JSR223 PostProcessor: レスポンス解析 -->
<JSR223PostProcessor guiclass="TestBeanGUI"
    testclass="JSR223PostProcessor"
    testname="レスポンス後処理">
  <stringProp name="scriptLanguage">groovy</stringProp>
  <stringProp name="script">
// レスポンスコードを確認
def responseCode = prev.getResponseCode()
def responseTime = prev.getTime()

// レスポンスボディをJSON解析
import groovy.json.JsonSlurper
def json = new JsonSlurper().parseText(
    prev.getResponseDataAsString()
)
vars.put("userId", json.data.id.toString())
vars.put("authToken", json.data.token)

log.info("後処理: userId=" + json.data.id
    + ", 応答時間=" + responseTime + "ms")
  </stringProp>
</JSR223PostProcessor>`,
      },
    ],
  },
  {
    id: "load-testing",
    title: "負荷テスト実践",
    category: "testing",
    description:
      "実践的な負荷テストの計画・実行方法とボトルネックの特定手法",
    sections: [
      {
        title: "負荷テスト計画の立て方",
        content:
          "負荷テストを成功させるには、事前に明確なテスト計画を立てることが重要です。目標とするKPI（レスポンスタイム、スループット、エラー率）を定義し、想定ユーザー数やシナリオを設計します。本番環境に近いテスト環境を用意し、段階的にテストを実施することが推奨されます。",
        code: `<!--
  負荷テスト計画書の主要項目:

  1. テスト目的
     - 目標レスポンスタイム: 95%ile ≤ 2秒
     - 目標スループット: 100 req/sec
     - 許容エラー率: < 1%

  2. テストシナリオ
     - ログイン → 商品検索 → カート追加 → 購入
     - 想定同時ユーザー数: 500人
     - テスト時間: 30分

  3. テスト環境
     - アプリサーバー: 4CPU / 8GB RAM × 2台
     - DBサーバー: 8CPU / 16GB RAM × 1台
     - ネットワーク: 1Gbps
-->

<!-- Thread Group: 段階的な負荷テスト設定 -->
<ThreadGroup guiclass="ThreadGroupGui"
    testclass="ThreadGroup"
    testname="負荷テスト計画">
  <!-- 同時ユーザー数 -->
  <stringProp name="ThreadGroup.num_threads">500</stringProp>
  <!-- ランプアップ時間（秒）: 5分かけて全ユーザー起動 -->
  <stringProp name="ThreadGroup.ramp_time">300</stringProp>
  <!-- テスト実行時間: 30分 -->
  <boolProp name="ThreadGroup.scheduler">true</boolProp>
  <stringProp name="ThreadGroup.duration">1800</stringProp>
</ThreadGroup>`,
      },
      {
        title: "段階的負荷テスト（ステップアップ）",
        content:
          "段階的負荷テストでは、同時ユーザー数を段階的に増加させて、システムの限界点を特定します。JMeterのStepping Thread Group（プラグイン）やjp@gc - Ultimate Thread Groupを使うと、複雑な負荷パターンを設計できます。各段階でシステムの挙動を観察し、性能劣化が始まるポイントを見極めます。",
        code: `<!-- Stepping Thread Group（プラグイン）の設定例 -->
<!--
  ステップアップ負荷パターン:
  時間  | ユーザー数
  0分   | 0
  2分   | 100    ← 第1段階
  4分   | 200    ← 第2段階
  6分   | 300    ← 第3段階
  8分   | 400    ← 第4段階
  10分  | 500    ← 第5段階（ピーク）
  15分  | 500    ← ピーク維持
  17分  | 0      ← ランプダウン
-->

<!-- コマンドラインで段階的負荷テストを実行 -->
<!-- JMeterプロパティで段階数を制御 -->
# 第1段階: 100ユーザー
jmeter -n -t load_test.jmx \\
  -Jusers=100 -Jduration=300 \\
  -l result_step1.jtl

# 第2段階: 200ユーザー
jmeter -n -t load_test.jmx \\
  -Jusers=200 -Jduration=300 \\
  -l result_step2.jtl

# 第3段階: 500ユーザー（ピーク）
jmeter -n -t load_test.jmx \\
  -Jusers=500 -Jduration=600 \\
  -l result_step3.jtl`,
      },
      {
        title: "スパイクテスト",
        content:
          "スパイクテストは、突然の大量アクセス（スパイク）に対するシステムの耐性を検証します。通常の負荷状態から急激にユーザー数を増加させ、システムがクラッシュせずに処理を継続できるか、またスパイク後に正常な状態に復帰できるかを確認します。タイムセールやキャンペーン開始時のシナリオに対応します。",
        code: `<!-- スパイクテスト用のThread Group設定 -->
<!--
  スパイクテストパターン:
  時間   | ユーザー数 | フェーズ
  0-5分  | 50        | 通常負荷
  5分    | 50→500    | スパイク発生（急激に増加）
  5-8分  | 500       | スパイク維持
  8分    | 500→50    | スパイク終了（急激に減少）
  8-13分 | 50        | 復帰確認
-->

<!-- Synchronizing Timer でスパイクをシミュレーション -->
<SyncTimer guiclass="TestBeanGUI"
    testclass="SyncTimer"
    testname="同時アクセス">
  <!-- 同時にリリースするユーザー数 -->
  <intProp name="groupSize">500</intProp>
  <!-- タイムアウト（ms） -->
  <longProp name="timeoutInMs">10000</longProp>
</SyncTimer>

<!--
  スパイクテストの確認ポイント:
  ✓ エラー率がしきい値以下か
  ✓ レスポンスタイムの急激な悪化がないか
  ✓ スパイク後にレスポンスタイムが正常に戻るか
  ✓ メモリリークやコネクションリークがないか
  ✓ サーキットブレーカーが正しく動作するか
-->`,
      },
      {
        title: "結果分析とボトルネック特定",
        content:
          "負荷テスト後の結果分析では、レスポンスタイムの推移、スループット、エラー率を多角的に分析します。パーセンタイル値（90%ile, 95%ile, 99%ile）を確認し、外れ値の影響を排除した実態把握が重要です。ボトルネックはCPU、メモリ、DB接続プール、ネットワーク帯域のいずれかに起因することが多いです。",
        code: `# JMeter結果ファイル(.jtl)の分析

# コマンドラインでサマリーレポート生成
jmeter -g result.jtl -o ./report_output

# JTLファイルの主要メトリクス:
# - elapsed: レスポンスタイム（ms）
# - responseCode: HTTPステータスコード
# - success: 成功/失敗
# - bytes: レスポンスサイズ
# - grpThreads: アクティブスレッド数

# Groovyスクリプトで結果分析
# JSR223 Listenerで集計処理
import org.apache.jmeter.util.JMeterUtils

// 結果の集計
def results = prev.getResponseCode()
def latency = prev.getLatency()
def connectTime = prev.getConnectTime()

log.info("""
  === パフォーマンス分析 ===
  レスポンスコード: \${results}
  レイテンシ: \${latency}ms
  接続時間: \${connectTime}ms
  ボディサイズ: \${prev.getBytesAsLong()} bytes
""".toString())

// ボトルネック判定の目安:
// レスポンスタイム > 5秒 → アプリ層を調査
// 接続時間 > 1秒 → ネットワーク/DB接続プール
// エラー率 > 5% → リソース枯渇の可能性`,
      },
    ],
  },
  {
    id: "api-testing",
    title: "REST APIテスト",
    category: "testing",
    description:
      "JMeterを使ったREST APIの自動テストとCI/CDパイプラインへの統合",
    sections: [
      {
        title: "REST APIテストの設計",
        content:
          "JMeterでREST APIをテストするには、HTTP Requestサンプラーでエンドポイント、HTTPメソッド、ヘッダー、ボディを設定します。HTTP Header Managerで共通ヘッダー（Content-Type, Authorization）を一括管理し、JSON Assertionでレスポンスの検証を行います。RESTful APIのCRUD操作を網羅的にテストできます。",
        code: `<!-- REST API テストの基本構成 -->
<!-- HTTP Header Manager: 共通ヘッダー設定 -->
<HeaderManager guiclass="HeaderPanel"
    testclass="HeaderManager"
    testname="APIヘッダー">
  <collectionProp name="HeaderManager.headers">
    <elementProp name="" elementType="Header">
      <stringProp name="Header.name">Content-Type</stringProp>
      <stringProp name="Header.value">application/json</stringProp>
    </elementProp>
    <elementProp name="" elementType="Header">
      <stringProp name="Header.name">Authorization</stringProp>
      <stringProp name="Header.value">Bearer \${authToken}</stringProp>
    </elementProp>
  </collectionProp>
</HeaderManager>

<!-- POST リクエスト: ユーザー作成API -->
<HTTPSamplerProxy guiclass="HttpTestSampleGui"
    testclass="HTTPSamplerProxy"
    testname="ユーザー作成 POST /api/users">
  <stringProp name="HTTPSampler.domain">\${baseUrl}</stringProp>
  <stringProp name="HTTPSampler.port">8080</stringProp>
  <stringProp name="HTTPSampler.path">/api/users</stringProp>
  <stringProp name="HTTPSampler.method">POST</stringProp>
  <boolProp name="HTTPSampler.postBodyRaw">true</boolProp>
  <elementProp name="HTTPsampler.Arguments"
      elementType="Arguments">
    <collectionProp name="Arguments.arguments">
      <elementProp name="" elementType="HTTPArgument">
        <stringProp name="Argument.value">
{
  "name": "\${userName}",
  "email": "\${userEmail}",
  "role": "user"
}
        </stringProp>
      </elementProp>
    </collectionProp>
  </elementProp>
</HTTPSamplerProxy>`,
      },
      {
        title: "JSON Extractorでレスポンス値取得",
        content:
          "JSON Extractorは、JSONレスポンスからJSON Path式を使って値を抽出するPostProcessorです。正規表現よりも直感的にJSONデータを扱えます。抽出した値はJMeter変数に格納され、後続のリクエストで利用できます。ネストされたJSONオブジェクトや配列からの値取得も容易です。",
        code: `<!-- JSON Extractor: レスポンスからユーザーID取得 -->
<JSONPostProcessor guiclass="JSONPostProcessorGui"
    testclass="JSONPostProcessor"
    testname="ユーザーID抽出">
  <stringProp name="JSONPostProcessor.referenceNames">
    userId
  </stringProp>
  <stringProp name="JSONPostProcessor.jsonPathExprs">
    $.data.id
  </stringProp>
  <stringProp name="JSONPostProcessor.match_numbers">1</stringProp>
  <stringProp name="JSONPostProcessor.defaultValues">
    NOT_FOUND
  </stringProp>
</JSONPostProcessor>

<!--
  JSON Path 式の例:
  $.data.id              → ルートのdata.idを取得
  $.users[0].name        → 配列の最初のユーザー名
  $.users[*].email       → 全ユーザーのメール（複数取得）
  $.items[?(@.price>100)] → 価格100超の商品をフィルタ
-->

<!-- JSON Assertion: レスポンス検証 -->
<JSONPathAssertion guiclass="JSONPathAssertionGui"
    testclass="JSONPathAssertion"
    testname="ステータス検証">
  <stringProp name="JSON_PATH">$.status</stringProp>
  <stringProp name="EXPECTED_VALUE">success</stringProp>
  <boolProp name="JSONVALIDATION">true</boolProp>
  <boolProp name="EXPECT_NULL">false</boolProp>
  <boolProp name="INVERT">false</boolProp>
</JSONPathAssertion>`,
      },
      {
        title: "CSVデータセットでパラメータ化",
        content:
          "CSV Data Set Configを使うと、CSVファイルからテストデータを読み込み、各リクエストに異なるパラメータを設定できます。ユーザーアカウント情報やテストデータをCSVファイルで管理することで、大量のバリエーションテストが可能になります。スレッドごとに異なるデータ行が自動的に割り当てられます。",
        code: `<!-- テストデータCSVファイル: test_users.csv -->
<!--
username,password,email
user001,Pass123!,user001@example.com
user002,Pass456!,user002@example.com
user003,Pass789!,user003@example.com
-->

<!-- CSV Data Set Config -->
<CSVDataSet guiclass="TestBeanGUI"
    testclass="CSVDataSet"
    testname="ユーザーデータ読込">
  <!-- CSVファイルパス -->
  <stringProp name="filename">test_users.csv</stringProp>
  <!-- 変数名（カンマ区切り） -->
  <stringProp name="variableNames">
    username,password,email
  </stringProp>
  <!-- 区切り文字 -->
  <stringProp name="delimiter">,</stringProp>
  <!-- ファイルエンコーディング -->
  <stringProp name="fileEncoding">UTF-8</stringProp>
  <!-- ファイル末尾到達時の動作 -->
  <boolProp name="recycle">true</boolProp>
  <!-- データ不足時にスレッドを停止するか -->
  <boolProp name="stopThread">false</boolProp>
  <!-- 共有モード: All threads / Current thread group -->
  <stringProp name="shareMode">shareMode.all</stringProp>
  <!-- 最初の行を変数名として使うか -->
  <boolProp name="ignoreFirstLine">true</boolProp>
</CSVDataSet>

<!-- 使用例: CSVの値をリクエストで参照 -->
<!-- POST /api/login -->
<!--
  Body: {
    "username": "\${username}",
    "password": "\${password}"
  }
-->`,
      },
      {
        title: "APIテストの自動化（CI/CD連携）",
        content:
          "JMeterテストをCI/CDパイプラインに組み込むことで、デプロイのたびに自動的にAPIテストを実行できます。JMeterのCLIモード（-nオプション）で実行し、結果をJUnit形式やCSV形式で出力します。GitHub ActionsやJenkinsと連携して、品質ゲートとして活用します。",
        code: `# JMeter CLIモードで実行（CI/CD用）
jmeter -n -t api_test.jmx \\
  -l results.jtl \\
  -j jmeter.log \\
  -e -o ./html_report \\
  -Jbase_url=https://staging-api.example.com \\
  -Jthreads=10 \\
  -Jduration=60

# GitHub Actions ワークフロー例
# .github/workflows/api-test.yml
# name: API Performance Test
# on:
#   push:
#     branches: [main]
# jobs:
#   performance-test:
#     runs-on: ubuntu-latest
#     steps:
#       - uses: actions/checkout@v4
#       - name: Install JMeter
#         run: |
#           wget https://dlcdn.apache.org/jmeter/binaries/\\
#           apache-jmeter-5.6.3.tgz
#           tar -xzf apache-jmeter-5.6.3.tgz
#       - name: Run API Tests
#         run: |
#           ./apache-jmeter-5.6.3/bin/jmeter -n \\
#             -t tests/api_test.jmx \\
#             -l results.jtl \\
#             -e -o report/
#       - name: Check Results
#         run: |
#           # エラー率チェック（1%以上で失敗）
#           ERROR_RATE=$(grep -c 'false' results.jtl || true)
#           TOTAL=$(wc -l < results.jtl)
#           echo "Error rate: $ERROR_RATE / $TOTAL"
#       - uses: actions/upload-artifact@v4
#         with:
#           name: jmeter-report
#           path: report/`,
      },
    ],
  },
  {
    id: "distributed-testing",
    title: "分散テストと運用",
    category: "advanced",
    description:
      "複数マシンを使った大規模分散テストとテスト結果の運用管理",
    sections: [
      {
        title: "分散テストの構成（Master/Slave）",
        content:
          "JMeterの分散テストでは、1台のMaster（コントローラ）が複数のSlave（エージェント）にテストを配信して実行します。各Slaveが独立してリクエストを送信し、結果をMasterに返送します。1台のマシンでは生成できない大規模な負荷を実現でき、数千〜数万の同時ユーザーをシミュレーションできます。",
        code: `<!--
  JMeter 分散テスト構成図:

  ┌─────────────┐
  │   Master     │  テスト計画を配信・結果を集約
  │ (Controller) │
  └──────┬───────┘
         │
    ┌────┼────┐
    │    │    │
  ┌─┴─┐┌─┴─┐┌─┴─┐
  │ S1 ││ S2 ││ S3 │  各Slaveが並列にリクエスト送信
  └─┬──┘└─┬──┘└─┬──┘
    │     │     │
    ▼     ▼     ▼
  ┌───────────────┐
  │  対象サーバー   │
  └───────────────┘

  設計のポイント:
  - Master: 結果収集のみ（負荷生成しない推奨）
  - Slave: 各マシンで250-500スレッドが目安
  - 3台のSlaveで500スレッド = 合計1500同時ユーザー
  - Slave間でCSVデータを分割して配置
-->

# Slave側: JMeter Serverモードで起動
# マシン1 (192.168.1.101)
jmeter-server -Djava.rmi.server.hostname=192.168.1.101

# マシン2 (192.168.1.102)
jmeter-server -Djava.rmi.server.hostname=192.168.1.102

# マシン3 (192.168.1.103)
jmeter-server -Djava.rmi.server.hostname=192.168.1.103`,
      },
      {
        title: "リモートテストの設定",
        content:
          "分散テストを実行するには、Masterのjmeter.propertiesにSlaveサーバーのIPアドレスを登録し、RMI通信のポート設定やファイアウォールの開放を行います。SSL通信の設定やテストファイルの同期も重要です。CLIモードでリモートテストを実行することで、大規模負荷テストを効率的に運用できます。",
        code: `# jmeter.properties の分散テスト設定

# Slaveサーバーのリスト
# remote_hosts=192.168.1.101,192.168.1.102,192.168.1.103
# server.rmi.ssl.disable=false

# RMIポート設定（固定ポートを推奨）
# server.rmi.localport=4000
# server_port=1099

# ファイアウォール設定（各Slaveで実行）
# sudo ufw allow 1099/tcp   # RMI Registry
# sudo ufw allow 4000/tcp   # RMI LocalPort

# SSL用のキーストア作成（セキュアな通信用）
keytool -genkey -keyalg RSA -alias rmi \\
  -keystore rmi_keystore.jks \\
  -storepass changeit \\
  -keypass changeit \\
  -validity 365 \\
  -dname "CN=JMeter,OU=Test,O=Org,L=Tokyo,S=Tokyo,C=JP"

# Master側からリモートテスト実行
# 全Slaveで実行
jmeter -n -t test_plan.jmx \\
  -r \\
  -l remote_results.jtl \\
  -Djava.rmi.server.hostname=192.168.1.100

# 特定のSlaveのみで実行
jmeter -n -t test_plan.jmx \\
  -R 192.168.1.101,192.168.1.102 \\
  -l remote_results.jtl

# テストファイルをSlaveに同期（事前準備）
for host in 192.168.1.101 192.168.1.102 192.168.1.103; do
  scp test_data.csv jmeter@\${host}:/opt/jmeter/bin/
  scp test_plan.jmx jmeter@\${host}:/opt/jmeter/bin/
done`,
      },
      {
        title: "JMeterプラグイン活用",
        content:
          "JMeter Plugins Managerを使うと、追加のリスナー、タイマー、サンプラーなどのプラグインを簡単にインストールできます。Custom Thread Groups（ステップ負荷やスパイク負荷のパターン設定）、Throughput Shaping Timer（スループット制御）、3 Basic Graphs（レスポンスタイム・スループット・アクティブスレッドのリアルタイムグラフ）が特に有用です。",
        code: `# JMeter Plugins Managerのインストール
# plugins-manager.jar を lib/ext/ に配置
wget -O lib/ext/jmeter-plugins-manager-1.10.jar \\
  https://jmeter-plugins.org/get/

# コマンドラインでプラグインをインストール
# PluginsManagerCMD.sh を使用
./bin/PluginsManagerCMD.sh install \\
  jpgc-casutg,\\
  jpgc-tst,\\
  jpgc-graphs-basic,\\
  jpgc-graphs-additional,\\
  jpgc-perfmon

# 主要プラグイン一覧:
# jpgc-casutg    : Custom Thread Groups
#                  (Ultimate Thread Group,
#                   Stepping Thread Group)
# jpgc-tst       : Throughput Shaping Timer
#                  (目標スループットを時系列で制御)
# jpgc-graphs-basic : 3 Basic Graphs
#                  (Response Times Over Time,
#                   Active Threads Over Time,
#                   Transactions per Second)
# jpgc-perfmon   : PerfMon Metrics Collector
#                  (サーバーCPU/メモリ/IO監視)
# jpgc-graphs-additional : Additional Graphs
#                  (Response Codes per Second等)

# インストール済みプラグインの確認
./bin/PluginsManagerCMD.sh status`,
      },
      {
        title: "テスト結果レポート生成（HTMLレポート）",
        content:
          "JMeter 3.0以降では、テスト結果からリッチなHTMLレポートを自動生成できます。レスポンスタイムの分布、スループットの推移、エラー率のサマリーなどがグラフ付きで出力されます。カスタムプロパティでレポートの内容をカスタマイズでき、ステークホルダーへの報告にそのまま使用できます。",
        code: `# HTMLレポートの生成方法

# 方法1: テスト実行と同時にレポート生成
jmeter -n -t test_plan.jmx \\
  -l results.jtl \\
  -e -o ./html_report

# 方法2: 既存のJTLファイルからレポート生成
jmeter -g results.jtl -o ./html_report

# レポートのカスタマイズ（reportgenerator.properties）
# jmeter.reportgenerator.overall_granularity=60000
# jmeter.reportgenerator.graph.responseTimeOverTime\\
#   .title=Response Time Over Time
# jmeter.reportgenerator.apdex_satisfied_threshold=500
# jmeter.reportgenerator.apdex_tolerated_threshold=1500

# HTMLレポートの主要セクション:
# ┌─────────────────────────────────────┐
# │ Dashboard                           │
# │ - APDEX (Application Performance)   │
# │ - リクエストサマリー                    │
# │ - エラー率統計                         │
# ├─────────────────────────────────────┤
# │ Charts                              │
# │ - Over Time: レスポンスタイム推移       │
# │ - Throughput: スループット推移          │
# │ - Response Times: 分布・パーセンタイル  │
# ├─────────────────────────────────────┤
# │ Statistics                          │
# │ - リクエスト別の詳細統計               │
# │ - 90%ile / 95%ile / 99%ile          │
# │ - Min / Max / Avg / Median          │
# └─────────────────────────────────────┘

# CI/CDでのレポート活用
# テスト後にレポートをアーティファクトとして保存
# 閾値チェックスクリプト例:
# python3 check_results.py results.jtl \\
#   --max-error-rate 1.0 \\
#   --max-response-time 2000 \\
#   --min-throughput 50`,
      },
    ],
  },
];
