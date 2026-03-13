import type { DocsChapter } from "../java-docs";

export const modulesJvmChapters: DocsChapter[] = [
  {
    id: "modules",
    title: "モジュールシステム",
    category: "modules-jvm",
    description: "module-info.java, exports, requires, provides/uses (Java 9+)",
    sections: [
      {
        title: "モジュールの基本",
        content:
          "Java Platform Module System（JPMS）はJava 9で導入されました。module-info.java でモジュールを定義し、exports でパッケージを公開、requires で依存関係を宣言します。強力なカプセル化により、内部実装を完全に隠蔽できます。",
        code: `// module-info.java（モジュール定義）
module com.example.app {
    // 依存モジュール
    requires java.net.http;          // HTTP Client
    requires java.sql;               // JDBC
    requires transitive java.logging; // 推移的な依存

    // 公開パッケージ
    exports com.example.app.api;     // 全モジュールに公開
    exports com.example.app.spi to   // 特定モジュールに限定公開
        com.example.plugin;

    // リフレクション用に開放
    opens com.example.app.model to
        com.fasterxml.jackson.databind;

    // サービスの提供と使用
    provides com.example.spi.Logger
        with com.example.impl.FileLogger;
    uses com.example.spi.Logger;
}

// プロジェクト構成
// src/
// ├── com.example.app/
// │   ├── module-info.java
// │   └── com/example/app/
// │       ├── api/           ← exports（公開）
// │       ├── internal/      ← 非公開
// │       └── model/         ← opens（リフレクションのみ）
// └── com.example.plugin/
//     ├── module-info.java
//     └── com/example/plugin/

// コマンドラインでのビルドと実行
// javac -d out --module-source-path src $(find src -name "*.java")
// java --module-path out -m com.example.app/com.example.app.Main`,
      },
      {
        title: "ServiceLoaderとモジュール",
        content:
          "ServiceLoader APIはモジュールシステムと統合され、疎結合なプラグイン機構を実現します。provides/uses 宣言でサービスの提供者と利用者を分離し、実行時に動的にロードします。",
        code: `// サービスインターフェース（SPI）
// module com.example.spi
package com.example.spi;
public interface MessageService {
    String getMessage();
}

// サービス実装
// module com.example.email
module com.example.email {
    requires com.example.spi;
    provides com.example.spi.MessageService
        with com.example.email.EmailService;
}
public class EmailService implements MessageService {
    @Override
    public String getMessage() { return "Email Service"; }
}

// サービスの利用
// module com.example.app
module com.example.app {
    requires com.example.spi;
    uses com.example.spi.MessageService;
}

// ServiceLoader で動的にロード
ServiceLoader<MessageService> loader =
    ServiceLoader.load(MessageService.class);

for (MessageService service : loader) {
    System.out.println(service.getMessage());
}

// Stream API と組み合わせ
Optional<MessageService> first = loader.stream()
    .map(ServiceLoader.Provider::get)
    .findFirst();`,
      },
    ],
  },
  {
    id: "jvm-tools",
    title: "JVM ツール",
    category: "modules-jvm",
    description: "javac, jar, javadoc, jlink, jpackage の使い方",
    sections: [
      {
        title: "主要なJDKツール",
        content:
          "JDKには多数のコマンドラインツールが含まれています。javac（コンパイラ）、jar（アーカイブ）、javadoc（ドキュメント生成）、jlink（カスタムランタイム）、jpackage（インストーラー作成）等を使いこなすことで効率的な開発が可能です。",
        code: `// javac（コンパイラ）
$ javac -d out src/Main.java
$ javac --release 21 -d out src/*.java
$ javac --module-path mods -d out src/module-info.java src/com/**/*.java

// jar（アーカイブ）
$ jar --create --file app.jar --main-class com.example.Main -C out .
$ jar --list --file app.jar
$ jar --extract --file app.jar
$ java -jar app.jar              // 実行可能JAR

// javadoc（ドキュメント生成）
$ javadoc -d docs -sourcepath src com.example

// jlink（カスタムランタイムイメージ）
$ jlink --module-path $JAVA_HOME/jmods:out \\
        --add-modules com.example.app \\
        --output custom-runtime \\
        --launcher start=com.example.app/com.example.Main
$ ./custom-runtime/bin/start     // カスタムランタイムで実行

// jpackage（インストーラー作成, Java 16+）
$ jpackage --name MyApp \\
           --input lib \\
           --main-jar app.jar \\
           --main-class com.example.Main \\
           --type dmg              // macOS: dmg, Windows: msi/exe

// その他のツール
$ jps                            // Javaプロセス一覧
$ jstack <pid>                   // スレッドダンプ
$ jmap -heap <pid>               // ヒープ情報
$ jcmd <pid> VM.system_properties  // システムプロパティ
$ jconsole                       // GUIモニタリングツール`,
      },
    ],
  },
  {
    id: "gc",
    title: "ガベージコレクション",
    category: "modules-jvm",
    description: "GCアルゴリズム、G1, ZGC, チューニング",
    sections: [
      {
        title: "GCの仕組みと選択",
        content:
          "JVMのガベージコレクタは不要なオブジェクトを自動回収します。G1GC（デフォルト）は汎用的、ZGCは超低レイテンシ、Shenandoahは並行GCです。アプリケーションの要件に応じて選択し、チューニングします。",
        code: `// GCの選択（JVMオプション）
$ java -XX:+UseG1GC MyApp          // G1GC（デフォルト, Java 9+）
$ java -XX:+UseZGC MyApp           // ZGC（低レイテンシ, Java 15+）
$ java -XX:+UseShenandoahGC MyApp  // Shenandoah
$ java -XX:+UseParallelGC MyApp    // Parallel GC（スループット重視）

// ヒープサイズの設定
$ java -Xms256m -Xmx2g MyApp      // 初期256MB, 最大2GB

// GCログの出力
$ java -Xlog:gc*:file=gc.log:time MyApp

// メモリ領域
// Young Generation: 新しいオブジェクト（Minor GC が頻繁に実行）
//   - Eden: オブジェクト生成領域
//   - Survivor (S0, S1): Minor GC を生き残ったオブジェクト
// Old Generation: 長寿命オブジェクト（Major/Full GC で回収）
// Metaspace: クラスメタデータ（Java 8+, PermGen の後継）

// GCチューニングの指針
// レスポンスタイム重視 → ZGC (停止時間 < 1ms)
//   $ java -XX:+UseZGC -XX:+ZGenerational MyApp
// スループット重視 → Parallel GC
//   $ java -XX:+UseParallelGC -XX:ParallelGCThreads=4 MyApp
// バランス（デフォルト）→ G1GC
//   $ java -XX:MaxGCPauseMillis=200 MyApp

// プログラムからのメモリ情報
Runtime rt = Runtime.getRuntime();
rt.maxMemory();                    // 最大ヒープ
rt.totalMemory();                  // 現在のヒープ
rt.freeMemory();                   // 空きメモリ`,
      },
    ],
  },
  {
    id: "jfr",
    title: "JDK Flight Recorder",
    category: "modules-jvm",
    description: "イベント記録、パフォーマンス分析、カスタムイベント",
    sections: [
      {
        title: "Flight Recorderの使い方",
        content:
          "JDK Flight Recorder（JFR）はJVMに組み込まれた低オーバーヘッドのプロファイリングツールです。CPU、メモリ、I/O、GC、スレッドなどのイベントを記録し、JDK Mission Control（JMC）で分析します。本番環境でも安全に使用できます。",
        code: `// JFRの起動（コマンドライン）
$ java -XX:StartFlightRecording=filename=app.jfr,duration=60s MyApp

// 実行中のアプリケーションに接続
$ jcmd <pid> JFR.start filename=app.jfr duration=120s
$ jcmd <pid> JFR.dump filename=dump.jfr
$ jcmd <pid> JFR.stop

// JFRファイルの解析（JDK Mission Control）
$ jmc  // GUIツールで app.jfr を開く

// プログラムからの制御
try (Recording recording = new Recording()) {
    recording.enable("jdk.CPULoad").withPeriod(Duration.ofSeconds(1));
    recording.enable("jdk.GarbageCollection");
    recording.start();

    // アプリケーション処理
    doWork();

    recording.stop();
    recording.dump(Path.of("recording.jfr"));
}

// カスタムイベント
@jdk.jfr.Name("com.example.OrderEvent")
@jdk.jfr.Label("Order Processed")
@jdk.jfr.Category("Business")
class OrderEvent extends jdk.jfr.Event {
    @jdk.jfr.Label("Order ID")
    String orderId;

    @jdk.jfr.Label("Amount")
    double amount;
}

// カスタムイベントの記録
OrderEvent event = new OrderEvent();
event.orderId = "ORD-001";
event.amount = 99.99;
event.begin();
processOrder();                    // 計測対象の処理
event.end();
event.commit();                    // イベントを記録

// イベントの読み取り (Java 14+)
try (var rs = RecordingFile.readAllEvents(Path.of("app.jfr"))) {
    for (RecordedEvent e : rs) {
        System.out.println(e.getEventType().getName());
    }
}`,
      },
    ],
  },
];
