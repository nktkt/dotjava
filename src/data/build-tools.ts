export interface BuildToolsSection {
  title: string;
  content: string;
  code?: string;
}

export interface BuildToolsChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: BuildToolsSection[];
}

export const buildToolsCategories = [
  { id: "maven", name: "Maven", color: "#C71A36" },
  { id: "gradle", name: "Gradle", color: "#02303A" },
  { id: "common", name: "共通・実践", color: "#2563EB" },
] as const;

export const buildToolsChapters: BuildToolsChapter[] = [
  // ===== Maven =====
  {
    id: "maven-basics",
    title: "Mavenの基礎",
    category: "maven",
    description:
      "Mavenのプロジェクト構成、pom.xml、ビルドライフサイクル、ゴールの基本を学ぶ",
    sections: [
      {
        title: "Mavenプロジェクト構成",
        content:
          "Mavenは「Convention over Configuration（設定より規約）」の思想に基づいたビルドツールです。標準ディレクトリレイアウトに従うことで、最小限の設定でプロジェクトを構築できます。src/main/java にプロダクションコード、src/test/java にテストコード、src/main/resources にリソースファイルを配置します。この規約を守ることで、チーム間での統一性が保たれます。",
        code: `# Maven標準ディレクトリ構成
my-project/
├── pom.xml                    # プロジェクト定義ファイル
├── src/
│   ├── main/
│   │   ├── java/              # プロダクションコード
│   │   │   └── com/example/
│   │   │       └── App.java
│   │   └── resources/         # リソースファイル
│   │       ├── application.properties
│   │       └── logback.xml
│   └── test/
│       ├── java/              # テストコード
│       │   └── com/example/
│       │       └── AppTest.java
│       └── resources/         # テスト用リソース
│           └── test-data.json
└── target/                    # ビルド出力（自動生成）
    ├── classes/
    ├── test-classes/
    └── my-project-1.0.0.jar`,
      },
      {
        title: "pom.xmlの基本構造",
        content:
          "pom.xml（Project Object Model）はMavenプロジェクトの中核ファイルです。groupId、artifactId、versionの3つの座標でプロジェクトを一意に識別します。依存関係、プラグイン、ビルド設定など、プロジェクトに必要な全情報を宣言的に記述します。親POMからの継承により、共通設定を集約することも可能です。",
        code: `<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <!-- プロジェクト座標（GAV） -->
    <groupId>com.example</groupId>
    <artifactId>my-app</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <packaging>jar</packaging>

    <name>My Application</name>
    <description>サンプルMavenプロジェクト</description>

    <!-- プロパティ定義 -->
    <properties>
        <maven.compiler.source>21</maven.compiler.source>
        <maven.compiler.target>21</maven.compiler.target>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <junit.version>5.10.2</junit.version>
    </properties>

    <!-- 依存関係 -->
    <dependencies>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter</artifactId>
            <version>\${junit.version}</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>`,
      },
      {
        title: "ビルドライフサイクル",
        content:
          "Mavenには3つのビルドライフサイクル（default、clean、site）があります。defaultライフサイクルは、validate → compile → test → package → verify → install → deploy の順に実行されます。後のフェーズを指定すると、それ以前のフェーズも自動的に実行されます。例えば mvn package を実行すると、validate から package まで全て実行されます。",
        code: `# ===== Mavenビルドライフサイクル =====

# cleanライフサイクル - ビルド成果物を削除
mvn clean

# defaultライフサイクルの主要フェーズ
mvn validate    # プロジェクト構成の検証
mvn compile     # ソースコードのコンパイル
mvn test        # ユニットテストの実行
mvn package     # JAR/WARの作成
mvn verify      # 統合テスト結果の検証
mvn install     # ローカルリポジトリへインストール
mvn deploy      # リモートリポジトリへデプロイ

# 組み合わせ実行（よく使うコマンド）
mvn clean package           # クリーンしてからパッケージング
mvn clean install           # クリーンしてローカルリポジトリへ
mvn clean package -DskipTests  # テストをスキップしてパッケージング

# siteライフサイクル - プロジェクトドキュメント生成
mvn site`,
      },
      {
        title: "ゴールとプラグイン",
        content:
          "Mavenのゴールは、プラグインが提供する具体的な処理単位です。フェーズにゴールがバインドされることで、ライフサイクルの各段階で適切な処理が実行されます。例えば compile フェーズには compiler:compile ゴールがバインドされています。プラグインのゴールを直接実行することも可能で、mvn dependency:tree のように使います。",
        code: `# ===== ゴールの直接実行 =====

# 依存関係ツリーを表示
mvn dependency:tree

# 依存関係の分析（未使用・未宣言の検出）
mvn dependency:analyze

# 有効なPOMを表示（継承・プロファイル解決後）
mvn help:effective-pom

# 有効な設定を表示
mvn help:effective-settings

# プラグインのヘルプ表示
mvn compiler:help -Ddetail=true

# ===== フェーズとゴールのバインド =====
# デフォルトのバインド例:
#   compile    → compiler:compile
#   test       → surefire:test
#   package    → jar:jar (JARプロジェクトの場合)
#   install    → install:install
#   deploy     → deploy:deploy

# プラグインの設定でゴールをカスタムフェーズにバインド
# pom.xml:
# <plugin>
#   <groupId>org.apache.maven.plugins</groupId>
#   <artifactId>maven-antrun-plugin</artifactId>
#   <executions>
#     <execution>
#       <phase>validate</phase>
#       <goals><goal>run</goal></goals>
#     </execution>
#   </executions>
# </plugin>`,
      },
      {
        title: "Mavenリポジトリとsettings.xml",
        content:
          "Mavenリポジトリにはローカル（~/.m2/repository）とリモート（Central, 社内Nexusなど）の2種類があります。依存解決時はまずローカルを検索し、なければリモートからダウンロードします。settings.xml（~/.m2/settings.xml）でミラー設定やプロキシ設定、認証情報を管理します。CI環境ではリポジトリキャッシュの活用がビルド高速化の鍵です。",
        code: `<!-- ~/.m2/settings.xml の設定例 -->
<settings xmlns="http://maven.apache.org/SETTINGS/1.2.0">
    <!-- ローカルリポジトリのパス（デフォルト: ~/.m2/repository） -->
    <localRepository>\${user.home}/.m2/repository</localRepository>

    <!-- プロキシ設定（社内ネットワーク用） -->
    <proxies>
        <proxy>
            <id>corporate-proxy</id>
            <active>true</active>
            <protocol>https</protocol>
            <host>proxy.example.com</host>
            <port>8080</port>
        </proxy>
    </proxies>

    <!-- リモートリポジトリの認証情報 -->
    <servers>
        <server>
            <id>nexus-releases</id>
            <username>\${env.NEXUS_USER}</username>
            <password>\${env.NEXUS_PASS}</password>
        </server>
    </servers>

    <!-- ミラー設定（Central → 社内Nexus経由） -->
    <mirrors>
        <mirror>
            <id>nexus-mirror</id>
            <mirrorOf>central</mirrorOf>
            <url>https://nexus.example.com/repository/maven-central/</url>
        </mirror>
    </mirrors>

    <!-- プロファイル -->
    <profiles>
        <profile>
            <id>nexus</id>
            <repositories>
                <repository>
                    <id>nexus-releases</id>
                    <url>https://nexus.example.com/repository/maven-releases/</url>
                </repository>
            </repositories>
        </profile>
    </profiles>

    <activeProfiles>
        <activeProfile>nexus</activeProfile>
    </activeProfiles>
</settings>`,
      },
    ],
  },
  {
    id: "maven-dependency",
    title: "Mavenの依存管理",
    category: "maven",
    description:
      "依存管理の仕組み、スコープ、BOM、バージョン競合の解決方法、exclusionsを学ぶ",
    sections: [
      {
        title: "依存管理の基本",
        content:
          "Mavenの依存管理は、pom.xmlのdependencies要素で宣言します。推移的依存関係（transitive dependencies）により、直接依存するライブラリが依存するライブラリも自動的に解決されます。依存関係のスコープ、バージョン管理、除外設定を適切に行うことで、クリーンなクラスパスを維持できます。",
        code: `<dependencies>
    <!-- 直接依存 - プロダクションコードで使用 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <version>3.2.4</version>
    </dependency>

    <!-- テスト用依存 -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <version>3.2.4</version>
        <scope>test</scope>
    </dependency>

    <!-- オプション依存（推移的に伝播しない） -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.32</version>
        <optional>true</optional>
    </dependency>
</dependencies>

<!-- dependencyManagement で推奨バージョンを一元管理 -->
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.fasterxml.jackson</groupId>
            <artifactId>jackson-bom</artifactId>
            <version>2.17.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>`,
      },
      {
        title: "依存スコープ",
        content:
          "Mavenの依存スコープはクラスパスの適用範囲を制御します。compile（デフォルト）は全フェーズで有効、providedはコンパイル時のみ（実行時はコンテナが提供）、runtimeは実行時のみ、testはテスト時のみ、systemはローカルJARを指定、importはBOM読み込み用です。適切なスコープ設定により、不要な依存をパッケージに含めずに済みます。",
        code: `<dependencies>
    <!-- compile（デフォルト）: コンパイル・テスト・実行すべてで有効 -->
    <dependency>
        <groupId>com.google.guava</groupId>
        <artifactId>guava</artifactId>
        <version>33.1.0-jre</version>
        <!-- <scope>compile</scope> 省略可 -->
    </dependency>

    <!-- provided: コンパイル時は必要だが、実行時はコンテナが提供 -->
    <dependency>
        <groupId>jakarta.servlet</groupId>
        <artifactId>jakarta.servlet-api</artifactId>
        <version>6.0.0</version>
        <scope>provided</scope>
    </dependency>

    <!-- runtime: コンパイル時は不要だが、実行時に必要 -->
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <version>42.7.3</version>
        <scope>runtime</scope>
    </dependency>

    <!-- test: テストのコンパイル・実行時のみ有効 -->
    <dependency>
        <groupId>org.assertj</groupId>
        <artifactId>assertj-core</artifactId>
        <version>3.25.3</version>
        <scope>test</scope>
    </dependency>

    <!-- import: BOMの依存バージョン定義を取り込む -->
    <!-- dependencyManagement内でのみ使用可能 -->
</dependencies>`,
      },
      {
        title: "BOM（Bill of Materials）",
        content:
          "BOMはライブラリ群のバージョンを一元管理するための仕組みです。dependencyManagementでBOMをimportすると、対象ライブラリのバージョンを個別に指定する必要がなくなります。Spring Boot、Jackson、JUnitなど主要フレームワークはBOMを提供しています。BOMを活用することで、バージョンの不整合を防ぎ、アップグレードも容易になります。",
        code: `<!-- BOM（Bill of Materials）の活用 -->
<dependencyManagement>
    <dependencies>
        <!-- Spring Boot BOM -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>3.2.4</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>

        <!-- JUnit BOM -->
        <dependency>
            <groupId>org.junit</groupId>
            <artifactId>junit-bom</artifactId>
            <version>5.10.2</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>

        <!-- Jackson BOM -->
        <dependency>
            <groupId>com.fasterxml.jackson</groupId>
            <artifactId>jackson-bom</artifactId>
            <version>2.17.0</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<!-- BOMで管理されるためバージョン指定が不要 -->
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <!-- バージョン不要：BOMから自動解決 -->
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <!-- バージョン不要：BOMから自動解決 -->
    </dependency>
    <dependency>
        <groupId>org.junit.jupiter</groupId>
        <artifactId>junit-jupiter</artifactId>
        <scope>test</scope>
        <!-- バージョン不要：BOMから自動解決 -->
    </dependency>
</dependencies>`,
      },
      {
        title: "バージョン競合の解決",
        content:
          "推移的依存で同じライブラリの異なるバージョンが要求される場合、Mavenは「最近勝ち（nearest wins）」戦略で解決します。依存ツリーの深さが浅い方が優先されます。意図しないバージョンが選択された場合は、dependencyManagementで明示的に指定するか、exclusionsで除外します。mvn dependency:tree で依存関係を可視化し、問題を特定しましょう。",
        code: `# 依存関係ツリーの確認
mvn dependency:tree

# 特定のアーティファクトをフィルタして確認
mvn dependency:tree -Dincludes=com.fasterxml.jackson.core

# 依存関係の競合を分析
mvn dependency:analyze

# ===== 出力例 =====
# [INFO] com.example:my-app:jar:1.0.0
# [INFO] +- org.springframework.boot:spring-boot-starter-web:jar:3.2.4
# [INFO] |  +- com.fasterxml.jackson.core:jackson-databind:jar:2.15.4
# [INFO] +- some-library:some-lib:jar:1.0.0
# [INFO] |  +- com.fasterxml.jackson.core:jackson-databind:jar:2.14.0 (omitted)
#
# → jackson-databind 2.15.4 と 2.14.0 が競合
# → 深さが浅い 2.15.4 が選択される

# dependencyManagement で明示的にバージョンを固定
# <dependencyManagement>
#     <dependencies>
#         <dependency>
#             <groupId>com.fasterxml.jackson.core</groupId>
#             <artifactId>jackson-databind</artifactId>
#             <version>2.17.0</version>
#         </dependency>
#     </dependencies>
# </dependencyManagement>`,
      },
      {
        title: "exclusionsによる依存除外",
        content:
          "exclusionsを使うと、推移的依存関係から特定のライブラリを除外できます。ログライブラリの統一（例：commons-logging を除外して SLF4J に統一）、不要な依存の削減、脆弱性のあるバージョンの排除などに使います。除外は直接依存している要素に対して指定し、groupIdとartifactIdで対象を特定します。",
        code: `<dependencies>
    <!-- Spring Bootはデフォルトで Logback を使用 -->
    <!-- commons-logging を除外して SLF4J に統一 -->
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-core</artifactId>
        <version>6.1.5</version>
        <exclusions>
            <exclusion>
                <groupId>commons-logging</groupId>
                <artifactId>commons-logging</artifactId>
            </exclusion>
        </exclusions>
    </dependency>

    <!-- SLF4Jブリッジで統一 -->
    <dependency>
        <groupId>org.slf4j</groupId>
        <artifactId>jcl-over-slf4j</artifactId>
        <version>2.0.12</version>
    </dependency>

    <!-- 脆弱なバージョンの推移的依存を除外して安全なバージョンに -->
    <dependency>
        <groupId>com.example</groupId>
        <artifactId>legacy-library</artifactId>
        <version>2.0.0</version>
        <exclusions>
            <!-- 脆弱な log4j 1.x を除外 -->
            <exclusion>
                <groupId>log4j</groupId>
                <artifactId>log4j</artifactId>
            </exclusion>
            <!-- 古い commons-collections を除外 -->
            <exclusion>
                <groupId>commons-collections</groupId>
                <artifactId>commons-collections</artifactId>
            </exclusion>
        </exclusions>
    </dependency>

    <!-- 安全なバージョンを明示的に追加 -->
    <dependency>
        <groupId>org.apache.commons</groupId>
        <artifactId>commons-collections4</artifactId>
        <version>4.4</version>
    </dependency>
</dependencies>`,
      },
    ],
  },
  {
    id: "maven-plugins",
    title: "Maven主要プラグイン",
    category: "maven",
    description:
      "compiler、surefire、shade、resourcesなど、実務で必須のMavenプラグインを学ぶ",
    sections: [
      {
        title: "maven-compiler-plugin",
        content:
          "maven-compiler-pluginはJavaソースコードのコンパイルを担当する最も基本的なプラグインです。Javaバージョンの指定、コンパイラオプション、アノテーションプロセッサの設定などを行います。Java 9以降ではsourceとtargetの代わりにreleaseオプションを使うことで、APIの互換性も確保できます。",
        code: `<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.13.0</version>
    <configuration>
        <!-- Java 21を使用（release推奨） -->
        <release>21</release>

        <!-- コンパイラ引数 -->
        <compilerArgs>
            <arg>-Xlint:all</arg>
            <arg>--enable-preview</arg>
        </compilerArgs>

        <!-- アノテーションプロセッサの設定 -->
        <annotationProcessorPaths>
            <path>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>1.18.32</version>
            </path>
            <path>
                <groupId>org.mapstruct</groupId>
                <artifactId>mapstruct-processor</artifactId>
                <version>1.5.5.Final</version>
            </path>
        </annotationProcessorPaths>

        <!-- インクリメンタルコンパイル -->
        <useIncrementalCompilation>true</useIncrementalCompilation>

        <!-- エンコーディング -->
        <encoding>UTF-8</encoding>
    </configuration>
</plugin>`,
      },
      {
        title: "maven-surefire-plugin",
        content:
          "maven-surefire-pluginはユニットテストの実行を担当します。testフェーズで自動的に実行され、*Test.java、Test*.java、*Tests.java、*TestCase.java にマッチするクラスをテスト対象とします。並列実行、テストのフィルタリング、JVMオプションの指定などを設定できます。",
        code: `<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-surefire-plugin</artifactId>
    <version>3.2.5</version>
    <configuration>
        <!-- 並列実行設定 -->
        <parallel>methods</parallel>
        <threadCount>4</threadCount>

        <!-- JVMオプション -->
        <argLine>
            -Xmx1024m
            --add-opens java.base/java.lang=ALL-UNNAMED
        </argLine>

        <!-- テストのインクルード/エクスクルード -->
        <includes>
            <include>**/*Test.java</include>
            <include>**/*Tests.java</include>
        </includes>
        <excludes>
            <exclude>**/*IntegrationTest.java</exclude>
            <exclude>**/*SlowTest.java</exclude>
        </excludes>

        <!-- テストレポートの設定 -->
        <reportsDirectory>
            \${project.build.directory}/surefire-reports
        </reportsDirectory>

        <!-- 失敗時の動作 -->
        <testFailureIgnore>false</testFailureIgnore>
        <rerunFailingTestsCount>2</rerunFailingTestsCount>

        <!-- システムプロパティの設定 -->
        <systemPropertyVariables>
            <spring.profiles.active>test</spring.profiles.active>
            <db.url>jdbc:h2:mem:testdb</db.url>
        </systemPropertyVariables>
    </configuration>
</plugin>

<!-- 統合テスト用: maven-failsafe-plugin -->
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-failsafe-plugin</artifactId>
    <version>3.2.5</version>
    <executions>
        <execution>
            <goals>
                <goal>integration-test</goal>
                <goal>verify</goal>
            </goals>
        </execution>
    </executions>
    <configuration>
        <includes>
            <include>**/*IntegrationTest.java</include>
            <include>**/*IT.java</include>
        </includes>
    </configuration>
</plugin>`,
      },
      {
        title: "maven-shade-plugin",
        content:
          "maven-shade-pluginは、全依存ライブラリを含む実行可能なfat JAR（uber JAR）を作成します。マイクロサービスやCLIツールのデプロイに便利です。パッケージリロケーション機能により、依存ライブラリのパッケージ名を変更してクラスパス競合を防ぐこともできます。",
        code: `<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-shade-plugin</artifactId>
    <version>3.5.2</version>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>shade</goal>
            </goals>
            <configuration>
                <!-- メインクラスを指定して実行可能JARに -->
                <transformers>
                    <transformer implementation=
                        "org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
                        <mainClass>com.example.App</mainClass>
                    </transformer>
                    <!-- Spring用: META-INF/spring.*の結合 -->
                    <transformer implementation=
                        "org.apache.maven.plugins.shade.resource.AppendingTransformer">
                        <resource>META-INF/spring.handlers</resource>
                    </transformer>
                    <!-- SPI設定ファイルの結合 -->
                    <transformer implementation=
                        "org.apache.maven.plugins.shade.resource.ServicesResourceTransformer"/>
                </transformers>

                <!-- パッケージリロケーション（競合回避） -->
                <relocations>
                    <relocation>
                        <pattern>com.google.common</pattern>
                        <shadedPattern>
                            com.example.shaded.com.google.common
                        </shadedPattern>
                    </relocation>
                </relocations>

                <!-- 不要なファイルをフィルタ -->
                <filters>
                    <filter>
                        <artifact>*:*</artifact>
                        <excludes>
                            <exclude>META-INF/*.SF</exclude>
                            <exclude>META-INF/*.DSA</exclude>
                            <exclude>META-INF/*.RSA</exclude>
                        </excludes>
                    </filter>
                </filters>

                <!-- 元のJARを置き換え -->
                <shadedArtifactAttached>false</shadedArtifactAttached>
            </configuration>
        </execution>
    </executions>
</plugin>`,
      },
      {
        title: "maven-resources-plugin",
        content:
          "maven-resources-pluginはリソースファイルのコピーとフィルタリングを行います。プロパティの値をリソースファイルに埋め込む「リソースフィルタリング」機能が特に便利です。application.propertiesにMavenプロパティを展開したり、環境ごとに異なる設定を適用したりできます。",
        code: `<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-resources-plugin</artifactId>
    <version>3.3.1</version>
    <configuration>
        <encoding>UTF-8</encoding>
    </configuration>
</plugin>

<!-- リソースフィルタリング設定 -->
<build>
    <resources>
        <resource>
            <directory>src/main/resources</directory>
            <!-- フィルタリング有効（プロパティ値を展開） -->
            <filtering>true</filtering>
            <includes>
                <include>**/*.properties</include>
                <include>**/*.yml</include>
            </includes>
        </resource>
        <resource>
            <directory>src/main/resources</directory>
            <!-- バイナリファイルはフィルタリング無効 -->
            <filtering>false</filtering>
            <includes>
                <include>**/*.png</include>
                <include>**/*.jpg</include>
                <include>**/*.keystore</include>
            </includes>
        </resource>
    </resources>
</build>

<!-- src/main/resources/application.properties -->
<!-- フィルタリングにより \${...} がMavenプロパティ値に展開される -->
<!--
app.name=\${project.name}
app.version=\${project.version}
build.timestamp=\${maven.build.timestamp}
db.url=\${db.url}
-->

<!-- プロファイルで環境ごとの値を切り替え -->
<profiles>
    <profile>
        <id>dev</id>
        <properties>
            <db.url>jdbc:postgresql://localhost:5432/devdb</db.url>
        </properties>
    </profile>
    <profile>
        <id>prod</id>
        <properties>
            <db.url>jdbc:postgresql://prod-db:5432/appdb</db.url>
        </properties>
    </profile>
</profiles>`,
      },
      {
        title: "その他の重要プラグイン",
        content:
          "実務ではコード品質やセキュリティ関連のプラグインも重要です。jacoco-maven-pluginでテストカバレッジを測定し、maven-enforcer-pluginでビルド条件を強制し、spotbugs-maven-pluginで静的解析を行います。これらをCI/CDパイプラインに組み込むことで、品質を自動的に担保できます。",
        code: `<!-- JaCoCo: テストカバレッジ -->
<plugin>
    <groupId>org.jacoco</groupId>
    <artifactId>jacoco-maven-plugin</artifactId>
    <version>0.8.12</version>
    <executions>
        <execution>
            <id>prepare-agent</id>
            <goals><goal>prepare-agent</goal></goals>
        </execution>
        <execution>
            <id>report</id>
            <phase>test</phase>
            <goals><goal>report</goal></goals>
        </execution>
        <execution>
            <id>check</id>
            <goals><goal>check</goal></goals>
            <configuration>
                <rules>
                    <rule>
                        <element>BUNDLE</element>
                        <limits>
                            <limit>
                                <counter>LINE</counter>
                                <value>COVEREDRATIO</value>
                                <minimum>0.80</minimum>
                            </limit>
                        </limits>
                    </rule>
                </rules>
            </configuration>
        </execution>
    </executions>
</plugin>

<!-- Enforcer: ビルド条件の強制 -->
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-enforcer-plugin</artifactId>
    <version>3.4.1</version>
    <executions>
        <execution>
            <id>enforce</id>
            <goals><goal>enforce</goal></goals>
            <configuration>
                <rules>
                    <requireMavenVersion>
                        <version>[3.9,)</version>
                    </requireMavenVersion>
                    <requireJavaVersion>
                        <version>[21,)</version>
                    </requireJavaVersion>
                    <banDuplicatePomDependencyVersions/>
                </rules>
            </configuration>
        </execution>
    </executions>
</plugin>

<!-- SpotBugs: 静的解析 -->
<plugin>
    <groupId>com.github.spotbugs</groupId>
    <artifactId>spotbugs-maven-plugin</artifactId>
    <version>4.8.4.0</version>
    <configuration>
        <effort>Max</effort>
        <threshold>Medium</threshold>
    </configuration>
</plugin>`,
      },
    ],
  },
  {
    id: "maven-multi-module",
    title: "Mavenマルチモジュール",
    category: "maven",
    description:
      "マルチモジュールプロジェクトの構成、parent POM、モジュール間依存を学ぶ",
    sections: [
      {
        title: "マルチモジュールの概要",
        content:
          "マルチモジュールプロジェクトは、関連する複数のモジュール（サブプロジェクト）を一つの親プロジェクトで管理する構成です。共通設定の一元管理、モジュール間の依存管理、一括ビルドが可能になります。大規模アプリケーションでは、ドメイン層、API層、Web層などをモジュールに分離し、責務を明確にします。",
        code: `# マルチモジュールプロジェクト構成
my-project/
├── pom.xml                     # 親POM（aggregator）
├── my-common/                  # 共通モジュール
│   ├── pom.xml
│   └── src/main/java/
│       └── com/example/common/
│           ├── dto/
│           ├── exception/
│           └── util/
├── my-domain/                  # ドメインモジュール
│   ├── pom.xml
│   └── src/main/java/
│       └── com/example/domain/
│           ├── model/
│           ├── repository/
│           └── service/
├── my-api/                     # APIモジュール
│   ├── pom.xml
│   └── src/main/java/
│       └── com/example/api/
│           ├── controller/
│           └── config/
└── my-batch/                   # バッチモジュール
    ├── pom.xml
    └── src/main/java/
        └── com/example/batch/
            ├── job/
            └── tasklet/`,
      },
      {
        title: "親POM（Parent POM）",
        content:
          "親POMはpackagingをpomに設定し、子モジュールの共通設定を集約します。dependencyManagementで全モジュールの依存バージョンを統一し、pluginManagementでプラグイン設定を共有します。子モジュールはparent要素で親を参照し、共通設定を継承します。",
        code: `<!-- 親POM: pom.xml -->
<project>
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.example</groupId>
    <artifactId>my-project</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <packaging>pom</packaging>

    <!-- 子モジュールの列挙（ビルド順序はMavenが依存関係から自動決定） -->
    <modules>
        <module>my-common</module>
        <module>my-domain</module>
        <module>my-api</module>
        <module>my-batch</module>
    </modules>

    <properties>
        <java.version>21</java.version>
        <spring-boot.version>3.2.4</spring-boot.version>
        <maven.compiler.release>\${java.version}</maven.compiler.release>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    </properties>

    <!-- 全モジュール共通の依存バージョン管理 -->
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-dependencies</artifactId>
                <version>\${spring-boot.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <!-- 自プロジェクトのモジュールバージョン管理 -->
            <dependency>
                <groupId>com.example</groupId>
                <artifactId>my-common</artifactId>
                <version>\${project.version}</version>
            </dependency>
            <dependency>
                <groupId>com.example</groupId>
                <artifactId>my-domain</artifactId>
                <version>\${project.version}</version>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <!-- 全モジュール共通の依存 -->
    <dependencies>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
    </dependencies>
</project>`,
      },
      {
        title: "子モジュールの設定",
        content:
          "子モジュールはparent要素で親POMを参照し、必要な設定のみを記述します。親のdependencyManagementで管理されている依存はバージョン指定が不要です。モジュール固有の依存やプラグインだけを追加すれば良いため、pom.xmlがシンプルに保てます。",
        code: `<!-- my-common/pom.xml（共通モジュール） -->
<project>
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.example</groupId>
        <artifactId>my-project</artifactId>
        <version>1.0.0-SNAPSHOT</version>
    </parent>

    <artifactId>my-common</artifactId>

    <dependencies>
        <!-- バージョンは親のdependencyManagementから継承 -->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
        </dependency>
    </dependencies>
</project>

<!-- my-domain/pom.xml（ドメインモジュール） -->
<project>
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.example</groupId>
        <artifactId>my-project</artifactId>
        <version>1.0.0-SNAPSHOT</version>
    </parent>

    <artifactId>my-domain</artifactId>

    <dependencies>
        <!-- 自プロジェクトの共通モジュールに依存 -->
        <dependency>
            <groupId>com.example</groupId>
            <artifactId>my-common</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
    </dependencies>
</project>

<!-- my-api/pom.xml（APIモジュール） -->
<project>
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>com.example</groupId>
        <artifactId>my-project</artifactId>
        <version>1.0.0-SNAPSHOT</version>
    </parent>

    <artifactId>my-api</artifactId>

    <dependencies>
        <dependency>
            <groupId>com.example</groupId>
            <artifactId>my-domain</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
    </dependencies>
</project>`,
      },
      {
        title: "モジュール間依存の管理",
        content:
          "モジュール間の依存関係は循環しないよう注意が必要です。一般的に common → domain → api/batch のような一方向の依存にします。Mavenは依存グラフを解析してビルド順序を自動決定しますが、循環依存があるとビルドに失敗します。リアクター（reactor）はこの順序制御を行うMavenの仕組みです。",
        code: `# ===== リアクタービルド =====

# 全モジュールを一括ビルド
mvn clean install

# リアクター順序の確認
mvn validate
# [INFO] Reactor Build Order:
# [INFO]   my-project (pom)
# [INFO]   my-common (jar)
# [INFO]   my-domain (jar)
# [INFO]   my-api (jar)
# [INFO]   my-batch (jar)

# 特定モジュールのみビルド
mvn clean install -pl my-common

# 特定モジュールとその依存モジュールをビルド
mvn clean install -pl my-api -am

# 特定モジュール以降をビルド（変更後の再ビルドに便利）
mvn clean install -rf :my-domain

# モジュール間依存の可視化
mvn dependency:tree -pl my-api
# [INFO] com.example:my-api:jar:1.0.0-SNAPSHOT
# [INFO] +- com.example:my-domain:jar:1.0.0-SNAPSHOT
# [INFO] |  +- com.example:my-common:jar:1.0.0-SNAPSHOT
# [INFO] |  \\- org.springframework.boot:spring-boot-starter-data-jpa:jar
# [INFO] +- org.springframework.boot:spring-boot-starter-web:jar`,
      },
      {
        title: "プロファイルとリリース管理",
        content:
          "マルチモジュールプロジェクトでは、プロファイルを活用して環境ごとのビルドを切り替えます。また、maven-release-pluginで全モジュールのバージョンを一括管理し、リリースプロセスを自動化できます。versions-maven-pluginで依存バージョンの更新チェックも行えます。",
        code: `<!-- プロファイルによる環境切り替え -->
<profiles>
    <profile>
        <id>dev</id>
        <activation>
            <activeByDefault>true</activeByDefault>
        </activation>
        <properties>
            <spring.profiles.active>dev</spring.profiles.active>
        </properties>
    </profile>
    <profile>
        <id>prod</id>
        <properties>
            <spring.profiles.active>prod</spring.profiles.active>
        </properties>
        <build>
            <plugins>
                <plugin>
                    <groupId>org.apache.maven.plugins</groupId>
                    <artifactId>maven-enforcer-plugin</artifactId>
                    <executions>
                        <execution>
                            <goals><goal>enforce</goal></goals>
                            <configuration>
                                <rules>
                                    <!-- SNAPSHOT依存を禁止 -->
                                    <requireReleaseDeps/>
                                </rules>
                            </configuration>
                        </execution>
                    </executions>
                </plugin>
            </plugins>
        </build>
    </profile>
</profiles>

<!-- バージョン管理コマンド -->
<!--
# 全モジュールのバージョンを一括変更
mvn versions:set -DnewVersion=1.1.0-SNAPSHOT

# 依存バージョンの更新チェック
mvn versions:display-dependency-updates

# プラグインバージョンの更新チェック
mvn versions:display-plugin-updates

# プロファイル指定でビルド
mvn clean package -Pprod
-->`,
      },
    ],
  },

  // ===== Gradle =====
  {
    id: "gradle-basics",
    title: "Gradleの基礎",
    category: "gradle",
    description:
      "Gradleのプロジェクト構成、build.gradle.kts、タスク、Wrapperの基本を学ぶ",
    sections: [
      {
        title: "Gradleプロジェクト構成",
        content:
          "Gradleは柔軟で高速なビルドツールです。Groovy DSLまたはKotlin DSL（build.gradle.kts）でビルドスクリプトを記述します。Kotlin DSLは型安全でIDEの補完が効くため、近年推奨されています。Mavenと同じ標準ディレクトリレイアウトを使用しつつ、より柔軟なカスタマイズが可能です。",
        code: `# Gradleプロジェクト構成
my-project/
├── build.gradle.kts           # ビルドスクリプト（Kotlin DSL）
├── settings.gradle.kts        # プロジェクト設定
├── gradle.properties          # Gradleプロパティ
├── gradle/
│   ├── wrapper/
│   │   ├── gradle-wrapper.jar
│   │   └── gradle-wrapper.properties
│   └── libs.versions.toml     # バージョンカタログ
├── gradlew                    # Wrapper（Unix）
├── gradlew.bat                # Wrapper（Windows）
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/
│   │   │       └── App.java
│   │   └── resources/
│   │       └── application.properties
│   └── test/
│       ├── java/
│       │   └── com/example/
│       │       └── AppTest.java
│       └── resources/
└── build/                     # ビルド出力（自動生成）
    ├── classes/
    ├── libs/
    └── reports/`,
      },
      {
        title: "build.gradle.ktsの基本",
        content:
          "build.gradle.ktsはKotlin DSLで記述するビルド定義ファイルです。plugins、repositories、dependencies、tasksの4つのブロックが基本構成です。Mavenのpom.xmlと比べて、プログラマティックに記述できるため、条件分岐やループなどのロジックも組み込めます。",
        code: `// build.gradle.kts
plugins {
    java
    application
    id("org.springframework.boot") version "3.2.4"
    id("io.spring.dependency-management") version "1.1.4"
}

group = "com.example"
version = "1.0.0-SNAPSHOT"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

repositories {
    mavenCentral()
    // 社内リポジトリ
    maven {
        url = uri("https://nexus.example.com/repository/maven-releases/")
        credentials {
            username = project.findProperty("nexusUser") as String? ?: ""
            password = project.findProperty("nexusPass") as String? ?: ""
        }
    }
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")

    compileOnly("org.projectlombok:lombok")
    annotationProcessor("org.projectlombok:lombok")

    runtimeOnly("org.postgresql:postgresql")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
}

application {
    mainClass = "com.example.App"
}

tasks.test {
    useJUnitPlatform()
}`,
      },
      {
        title: "settings.gradle.ktsとプロパティ",
        content:
          "settings.gradle.ktsはプロジェクト名やサブプロジェクトの定義を行います。gradle.propertiesではビルドのパフォーマンス設定やプロジェクト変数を定義します。環境変数やコマンドライン引数からのプロパティ取得も可能で、CI/CD環境での設定切り替えに活用します。",
        code: `// settings.gradle.kts
rootProject.name = "my-project"

// プラグインリポジトリの設定
pluginManagement {
    repositories {
        gradlePluginPortal()
        mavenCentral()
    }
}

// 依存リポジトリの設定（全サブプロジェクト共通）
dependencyResolutionManagement {
    repositoriesMode = RepositoriesMode.FAIL_ON_PROJECT_REPOS
    repositories {
        mavenCentral()
    }
}

// ===== gradle.properties =====
// # パフォーマンス設定
// org.gradle.parallel=true
// org.gradle.caching=true
// org.gradle.daemon=true
// org.gradle.jvmargs=-Xmx2g -XX:+UseParallelGC
//
// # プロジェクトプロパティ
// appVersion=1.0.0
// springBootVersion=3.2.4

// ===== build.gradle.kts でプロパティ参照 =====
// val appVersion: String by project
// val springBootVersion: String by project
//
// version = appVersion
//
// // 環境変数の参照
// val dbUrl = System.getenv("DB_URL") ?: "jdbc:h2:mem:testdb"
//
// // コマンドライン引数: ./gradlew build -PmyProp=value
// val myProp = project.findProperty("myProp") as String? ?: "default"`,
      },
      {
        title: "Gradle Wrapper",
        content:
          "Gradle Wrapperは、プロジェクトに適切なGradleバージョンを同梱する仕組みです。gradlewコマンドを使うことで、開発者がGradleを別途インストールする必要がなく、チーム全員が同じバージョンでビルドできます。CI/CD環境でも一貫性のあるビルドが保証されます。Wrapperファイルはバージョン管理に含めます。",
        code: `# ===== Gradle Wrapper =====

# Wrapperの生成（初回のみ、Gradleがインストールされている環境で）
gradle wrapper --gradle-version 8.7

# Wrapperでビルド実行（Gradleのインストール不要）
./gradlew build

# Wrapperのバージョン確認
./gradlew --version

# Wrapperのバージョンアップ
./gradlew wrapper --gradle-version 8.7

# ===== gradle/wrapper/gradle-wrapper.properties =====
# distributionBase=GRADLE_USER_HOME
# distributionPath=wrapper/dists
# distributionUrl=https\\://services.gradle.org/distributions/gradle-8.7-bin.zip
# networkTimeout=10000
# validateDistributionUrl=true
# zipStoreBase=GRADLE_USER_HOME
# zipStorePath=wrapper/dists

# ===== よく使うGradleコマンド =====
./gradlew tasks              # 使用可能なタスク一覧
./gradlew tasks --all        # 全タスク一覧（非表示含む）
./gradlew build              # ビルド（コンパイル+テスト+JAR作成）
./gradlew clean build        # クリーンビルド
./gradlew test               # テスト実行
./gradlew bootRun            # Spring Boot アプリ実行
./gradlew dependencies       # 依存関係ツリー
./gradlew build --scan       # ビルドスキャン（詳細分析）`,
      },
      {
        title: "基本的なタスクの使い方",
        content:
          "Gradleのタスクはビルドの基本単位です。標準プラグインが提供するタスク（build、test、clean等）に加え、カスタムタスクも定義できます。タスク間の依存関係を定義することで、正しい順序で実行されます。--dry-runオプションで実行予定のタスクを事前確認できます。",
        code: `// build.gradle.kts

// カスタムタスクの定義
tasks.register("hello") {
    group = "custom"
    description = "挨拶を表示するタスク"
    doLast {
        println("Hello from Gradle!")
    }
}

// 既存タスクの設定変更
tasks.named<JavaCompile>("compileJava") {
    options.encoding = "UTF-8"
    options.compilerArgs.add("-Xlint:all")
}

// テストタスクの設定
tasks.test {
    useJUnitPlatform()
    maxParallelForks = Runtime.getRuntime().availableProcessors()

    testLogging {
        events("passed", "skipped", "failed")
        showStandardStreams = true
    }

    // テストレポート
    reports {
        html.required = true
        junitXml.required = true
    }
}

// JARタスクの設定
tasks.jar {
    manifest {
        attributes(
            "Implementation-Title" to project.name,
            "Implementation-Version" to project.version,
            "Main-Class" to "com.example.App"
        )
    }
}

// タスクの依存関係
// ./gradlew hello         → "Hello from Gradle!"
// ./gradlew build         → compile → test → jar
// ./gradlew build --dry-run  → 実行されるタスクの確認`,
      },
    ],
  },
  {
    id: "gradle-dependency",
    title: "Gradleの依存管理",
    category: "gradle",
    description:
      "implementation/api/compileOnly等の構成、バージョンカタログ、BOMの活用を学ぶ",
    sections: [
      {
        title: "依存構成（Configuration）",
        content:
          "Gradleの依存構成はMavenのスコープに相当しますが、より細かい制御が可能です。implementationは内部実装用（推移的に公開しない）、apiは公開API用（推移的に公開）、compileOnlyはコンパイル時のみ、runtimeOnlyは実行時のみ、testImplementationはテスト用です。implementation vs apiの選択はモジュール間の結合度に影響します。",
        code: `// build.gradle.kts
plugins {
    \`java-library\`  // api構成を使うにはjava-libraryプラグインが必要
}

dependencies {
    // implementation: 内部実装用（推移的に公開されない）
    // → このモジュールに依存する他モジュールからは見えない
    implementation("com.google.guava:guava:33.1.0-jre")
    implementation("org.apache.commons:commons-lang3:3.14.0")

    // api: 公開API用（推移的に公開される）
    // → このモジュールに依存する他モジュールからも見える
    api("com.fasterxml.jackson.core:jackson-databind:2.17.0")

    // compileOnly: コンパイル時のみ（JARに含まれない）
    compileOnly("org.projectlombok:lombok:1.18.32")
    annotationProcessor("org.projectlombok:lombok:1.18.32")

    // runtimeOnly: 実行時のみ（コンパイル時は不要）
    runtimeOnly("org.postgresql:postgresql:42.7.3")

    // testImplementation: テストコンパイル・実行時
    testImplementation("org.junit.jupiter:junit-jupiter:5.10.2")
    testImplementation("org.assertj:assertj-core:3.25.3")

    // testRuntimeOnly: テスト実行時のみ
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

// implementation vs api の違い
// moduleA が jackson-databind を api で宣言 → moduleB は jackson を直接使える
// moduleA が guava を implementation で宣言 → moduleB は guava を使えない`,
      },
      {
        title: "バージョンカタログ",
        content:
          "Gradle 7.0以降で導入されたバージョンカタログ（Version Catalog）は、依存バージョンをTOMLファイルで一元管理する仕組みです。gradle/libs.versions.tomlに定義し、ビルドスクリプトからタイプセーフに参照できます。マルチプロジェクトでの統一管理に特に有効で、IDEの補完も効きます。",
        code: `# gradle/libs.versions.toml

[versions]
java = "21"
spring-boot = "3.2.4"
spring-dependency-management = "1.1.4"
jackson = "2.17.0"
junit = "5.10.2"
assertj = "3.25.3"
lombok = "1.18.32"
postgresql = "42.7.3"
guava = "33.1.0-jre"

[libraries]
spring-boot-starter-web = { module = "org.springframework.boot:spring-boot-starter-web" }
spring-boot-starter-test = { module = "org.springframework.boot:spring-boot-starter-test" }
spring-boot-starter-data-jpa = { module = "org.springframework.boot:spring-boot-starter-data-jpa" }
jackson-databind = { module = "com.fasterxml.jackson.core:jackson-databind", version.ref = "jackson" }
junit-jupiter = { module = "org.junit.jupiter:junit-jupiter", version.ref = "junit" }
assertj-core = { module = "org.assertj:assertj-core", version.ref = "assertj" }
lombok = { module = "org.projectlombok:lombok", version.ref = "lombok" }
postgresql = { module = "org.postgresql:postgresql", version.ref = "postgresql" }
guava = { module = "com.google.guava:guava", version.ref = "guava" }

[bundles]
testing = ["junit-jupiter", "assertj-core"]

[plugins]
spring-boot = { id = "org.springframework.boot", version.ref = "spring-boot" }
spring-dependency-management = { id = "io.spring.dependency-management", version.ref = "spring-dependency-management" }

# ===== build.gradle.kts での使用 =====
# plugins {
#     alias(libs.plugins.spring.boot)
#     alias(libs.plugins.spring.dependency.management)
# }
#
# dependencies {
#     implementation(libs.spring.boot.starter.web)
#     implementation(libs.guava)
#     compileOnly(libs.lombok)
#     runtimeOnly(libs.postgresql)
#     testImplementation(libs.bundles.testing)  // バンドル参照
# }`,
      },
      {
        title: "BOMとプラットフォーム依存",
        content:
          "GradleではplatformまたはenforcedPlatformを使ってBOMを読み込みます。platformは推奨バージョン（上書き可能）、enforcedPlatformは強制バージョン（上書き不可）です。Spring Bootのdependency managementプラグインを使う方法もあります。",
        code: `// build.gradle.kts

dependencies {
    // platform: BOMから推奨バージョンを取得（個別に上書き可能）
    implementation(platform("org.springframework.boot:spring-boot-dependencies:3.2.4"))
    implementation(platform("com.fasterxml.jackson:jackson-bom:2.17.0"))

    // enforcedPlatform: 強制バージョン（推移的依存も含め上書き不可）
    implementation(enforcedPlatform("org.junit:junit-bom:5.10.2"))

    // BOMで管理されるためバージョン指定不要
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.fasterxml.jackson.core:jackson-databind")
    testImplementation("org.junit.jupiter:junit-jupiter")
}

// ===== Spring Boot プラグインを使う方法 =====
// plugins {
//     id("org.springframework.boot") version "3.2.4"
//     id("io.spring.dependency-management") version "1.1.4"
// }
//
// dependencyManagement {
//     imports {
//         mavenBom("com.fasterxml.jackson:jackson-bom:2.17.0")
//     }
// }
//
// dependencies {
//     // Spring Boot管理のバージョン → 指定不要
//     implementation("org.springframework.boot:spring-boot-starter-web")
// }

// ===== 依存関係の確認 =====
// ./gradlew dependencies --configuration runtimeClasspath
// ./gradlew dependencyInsight --dependency jackson-databind`,
      },
      {
        title: "依存競合の解決",
        content:
          "Gradleはデフォルトで最新バージョンを選択する戦略（newest wins）を使います。Mavenの「最近勝ち」とは異なる点に注意が必要です。競合時の動作はresolutionStrategyで細かく制御でき、特定バージョンの強制、動的バージョンのキャッシュ期間設定、競合時のビルド失敗設定などが可能です。",
        code: `// build.gradle.kts

configurations.all {
    resolutionStrategy {
        // バージョン競合時にビルドを失敗させる（推奨：問題を早期発見）
        failOnVersionConflict()

        // 特定バージョンの強制
        force(
            "com.fasterxml.jackson.core:jackson-databind:2.17.0",
            "org.slf4j:slf4j-api:2.0.12"
        )

        // 動的バージョンのキャッシュ期間
        cacheDynamicVersionsFor(10, "minutes")

        // SNAPSHOTのキャッシュ期間
        cacheChangingModulesFor(0, "seconds")
    }
}

// 依存の除外
dependencies {
    implementation("org.springframework:spring-core:6.1.5") {
        // 特定の推移的依存を除外
        exclude(group = "commons-logging", module = "commons-logging")
    }

    // グローバルな除外
    configurations.all {
        exclude(group = "log4j", module = "log4j")
        exclude(group = "commons-logging", module = "commons-logging")
    }

    // 依存の置換
    // modules {
    //     module("commons-logging:commons-logging") {
    //         replacedBy("org.slf4j:jcl-over-slf4j",
    //             "SLF4Jで統一するため")
    //     }
    // }
}

// 依存レポート
// ./gradlew dependencies --configuration runtimeClasspath
// ./gradlew dependencyInsight --dependency jackson-databind --configuration runtimeClasspath`,
      },
      {
        title: "依存のロックとセキュリティ",
        content:
          "依存ロック（Dependency Locking）は、動的バージョンや変更可能バージョンの依存を特定バージョンに固定する仕組みです。再現性のあるビルドを保証するために重要です。また、依存の脆弱性スキャンを行うプラグインを導入して、セキュリティリスクを管理します。",
        code: `// build.gradle.kts

// 依存ロックの有効化
dependencyLocking {
    lockAllConfigurations()
}

// ロックファイルの生成
// ./gradlew dependencies --write-locks

// ロックファイルの更新
// ./gradlew dependencies --update-locks com.fasterxml.jackson.core:jackson-databind

// ===== セキュリティスキャン =====
// OWASP Dependency-Check プラグイン
plugins {
    id("org.owasp.dependencycheck") version "9.1.0"
}

// 脆弱性スキャンの設定
// dependencyCheck {
//     // CVSSスコア7.0以上でビルド失敗
//     failBuildOnCVSS = 7.0f
//     // サプレッションファイル
//     suppressionFile = "config/dependency-check-suppression.xml"
//     // レポート形式
//     formats = listOf("HTML", "JSON")
// }

// 実行: ./gradlew dependencyCheckAnalyze

// ===== 依存の検証（Gradle 6.2+） =====
// gradle/verification-metadata.xml で
// チェックサムや署名を検証
// ./gradlew --write-verification-metadata sha256,pgp help`,
      },
    ],
  },
  {
    id: "gradle-tasks",
    title: "Gradleタスクとビルド最適化",
    category: "gradle",
    description:
      "カスタムタスク、タスクグラフ、ビルドキャッシュ、インクリメンタルビルドを学ぶ",
    sections: [
      {
        title: "カスタムタスクの定義",
        content:
          "Gradleでは独自のタスクを定義して、ビルドプロセスを拡張できます。タスクはdoFirst、doLastブロックでアクションを追加します。タイプ付きタスク（Copy、Zip、Exec等）を使えば、よくある処理を簡潔に記述できます。再利用可能なタスクはクラスとして定義することも可能です。",
        code: `// build.gradle.kts

// 基本的なカスタムタスク
tasks.register("generateBuildInfo") {
    group = "build"
    description = "ビルド情報ファイルを生成"

    val outputFile = layout.buildDirectory.file("resources/main/build-info.properties")
    outputs.file(outputFile)

    doLast {
        outputFile.get().asFile.apply {
            parentFile.mkdirs()
            writeText("""
                build.version=\${project.version}
                build.timestamp=\${java.time.Instant.now()}
                build.java.version=\${System.getProperty("java.version")}
            """.trimIndent())
        }
        println("ビルド情報を生成しました")
    }
}

// Copyタスク
tasks.register<Copy>("copyDocs") {
    from("docs/")
    into(layout.buildDirectory.dir("docs"))
    include("**/*.md", "**/*.html")
    filter { line -> line.replace("{{VERSION}}", project.version.toString()) }
}

// Zipタスク
tasks.register<Zip>("packageDist") {
    dependsOn("build")
    archiveBaseName = "my-app"
    archiveVersion = project.version.toString()

    from(layout.buildDirectory.dir("libs"))
    from("config/") { into("config") }
    from("scripts/") { into("bin") }
}

// Execタスク（外部コマンド実行）
tasks.register<Exec>("dockerBuild") {
    group = "docker"
    commandLine("docker", "build", "-t", "my-app:\${project.version}", ".")
}`,
      },
      {
        title: "タスクの型定義（再利用可能なタスク）",
        content:
          "プロジェクト固有の処理を繰り返し使う場合は、タスクをクラスとして定義します。@TaskAction、@Input、@OutputFile等のアノテーションを使って入出力を宣言的に定義すると、Gradleの増分ビルドやキャッシュの恩恵を受けられます。",
        code: `// build.gradle.kts 内でタスク型を定義

// カスタムタスク型
abstract class CodeGenerationTask : DefaultTask() {
    @get:Input
    abstract val packageName: Property<String>

    @get:Input
    abstract val className: Property<String>

    @get:OutputDirectory
    abstract val outputDir: DirectoryProperty

    @TaskAction
    fun generate() {
        val pkg = packageName.get()
        val cls = className.get()
        val dir = outputDir.get().asFile

        val pkgDir = File(dir, pkg.replace(".", "/"))
        pkgDir.mkdirs()

        File(pkgDir, "\${cls}.java").writeText("""
            package $pkg;

            /**
             * 自動生成されたクラス
             * 生成日時: \${java.time.LocalDateTime.now()}
             */
            public class $cls {
                public static final String VERSION = "\${project.version}";

                public String getInfo() {
                    return "$cls v" + VERSION;
                }
            }
        """.trimIndent())

        logger.lifecycle("生成完了: \${pkg}.\${cls}")
    }
}

// タスクの登録
tasks.register<CodeGenerationTask>("generateVersionClass") {
    group = "generation"
    description = "バージョン情報クラスを自動生成"
    packageName = "com.example.generated"
    className = "BuildVersion"
    outputDir = layout.buildDirectory.dir("generated/sources/version")
}

// コンパイルの前に生成タスクを実行
tasks.compileJava {
    dependsOn("generateVersionClass")
}

// 生成ソースをソースセットに追加
sourceSets.main {
    java.srcDir(layout.buildDirectory.dir("generated/sources/version"))
}`,
      },
      {
        title: "タスクグラフと実行順序",
        content:
          "Gradleはタスク間の依存関係をDAG（有向非巡回グラフ）として管理します。dependsOn、mustRunAfter、shouldRunAfter、finalizedByで実行順序を制御します。タスクグラフはビルドの設定フェーズで構築され、実行フェーズで順序通りに処理されます。",
        code: `// build.gradle.kts

// タスク間の依存関係
tasks.register("prepare") {
    doLast { println("1. 準備") }
}

tasks.register("compile") {
    dependsOn("prepare")  // prepareの後に実行
    doLast { println("2. コンパイル") }
}

tasks.register("test") {
    dependsOn("compile")
    doLast { println("3. テスト") }
}

tasks.register("deploy") {
    dependsOn("test")
    doLast { println("4. デプロイ") }
}

// mustRunAfter: 両方が実行される場合の順序を指定
tasks.register("integrationTest") {
    mustRunAfter("test")  // testの後に実行（ただしtestを強制しない）
    doLast { println("統合テスト") }
}

// shouldRunAfter: mustRunAfterの緩い版（循環を許容）
tasks.register("smokeTest") {
    shouldRunAfter("integrationTest")
    doLast { println("スモークテスト") }
}

// finalizedBy: タスク完了後に必ず実行
tasks.test {
    finalizedBy("jacocoTestReport")  // テスト後にカバレッジレポート
}

// タスクグラフのリスナー
gradle.taskGraph.whenReady {
    println("実行予定タスク: \${allTasks.map { it.name }}")
    if (hasTask(":deploy")) {
        println("デプロイタスクが含まれています")
    }
}

// ./gradlew deploy --dry-run で実行順序を確認`,
      },
      {
        title: "ビルドキャッシュ",
        content:
          "Gradleのビルドキャッシュは、過去のビルド結果を再利用して高速化する仕組みです。ローカルキャッシュとリモートキャッシュがあり、CI/CD環境ではリモートキャッシュを共有することで、チーム全体のビルド時間を短縮できます。タスクの入出力が正しく宣言されていれば、自動的にキャッシュが効きます。",
        code: `// settings.gradle.kts

buildCache {
    // ローカルキャッシュ（デフォルトで有効）
    local {
        directory = File(rootDir, ".gradle/build-cache")
        removeUnusedEntriesAfterDays = 30
    }

    // リモートキャッシュ（チーム共有）
    remote<HttpBuildCache> {
        url = uri("https://cache.example.com/cache/")
        isPush = System.getenv("CI") != null  // CIのみプッシュ
        credentials {
            username = System.getenv("CACHE_USER") ?: ""
            password = System.getenv("CACHE_PASS") ?: ""
        }
    }
}

// ===== gradle.properties =====
// # ビルドキャッシュの有効化
// org.gradle.caching=true

// ===== build.gradle.kts =====
// キャッシュ可能なカスタムタスク
// @CacheableTask  // このアノテーションでキャッシュ有効
// abstract class MyTask : DefaultTask() {
//     @get:InputFile
//     @get:PathSensitive(PathSensitivity.RELATIVE)
//     abstract val inputFile: RegularFileProperty
//
//     @get:OutputFile
//     abstract val outputFile: RegularFileProperty
//
//     @TaskAction
//     fun execute() { /* ... */ }
// }

// キャッシュの確認コマンド
// ./gradlew build --build-cache
// ./gradlew build --build-cache --info  # キャッシュヒット率を確認
// ./gradlew clean build --no-build-cache  # キャッシュ無効で実行`,
      },
      {
        title: "インクリメンタルビルド",
        content:
          "Gradleのインクリメンタルビルドは、変更のあったファイルだけを再処理する仕組みです。タスクの入力と出力が前回の実行から変わっていなければ、タスクをスキップします（UP-TO-DATE）。正確な入出力宣言が重要で、適切に設定すれば大幅なビルド時間短縮が実現できます。",
        code: `// build.gradle.kts

// インクリメンタルビルドの仕組み
// Gradleは各タスクの入出力のスナップショットを保持
// 入力が変わっていなければ → UP-TO-DATE としてスキップ

// 入出力を正しく宣言したタスク例
tasks.register("processTemplates") {
    // 入力の宣言
    inputs.dir("src/templates")
    inputs.property("version", project.version)

    // 出力の宣言
    outputs.dir(layout.buildDirectory.dir("processed-templates"))

    doLast {
        // テンプレート処理...
        println("テンプレートを処理しました")
    }
}

// ===== ビルド高速化のベストプラクティス =====

// gradle.properties
// # 並列実行
// org.gradle.parallel=true
//
// # デーモンの使用
// org.gradle.daemon=true
//
// # JVMメモリ設定
// org.gradle.jvmargs=-Xmx2g -XX:+UseParallelGC
//                    -XX:+HeapDumpOnOutOfMemoryError
//
// # コンフィグレーションキャッシュ（Gradle 8.1+）
// org.gradle.configuration-cache=true
//
// # ビルドキャッシュ
// org.gradle.caching=true

// コンフィグレーションキャッシュ
// 設定フェーズの結果をキャッシュし、再設定をスキップ
// ./gradlew build --configuration-cache

// ビルドパフォーマンスの分析
// ./gradlew build --scan         # Gradle Build Scan
// ./gradlew build --profile      # ローカルプロファイルレポート
// → build/reports/profile/ にHTMLレポート生成`,
      },
    ],
  },
  {
    id: "gradle-multi-module",
    title: "Gradleマルチプロジェクト",
    category: "gradle",
    description:
      "マルチプロジェクト構成、buildSrc、Convention Pluginによる設定共有を学ぶ",
    sections: [
      {
        title: "マルチプロジェクトの構成",
        content:
          "Gradleのマルチプロジェクトはルートプロジェクトとサブプロジェクトで構成されます。settings.gradle.ktsでサブプロジェクトを宣言し、各サブプロジェクトにbuild.gradle.ktsを配置します。ルートプロジェクトのsubprojects、allprojectsブロックで共通設定を適用できます。",
        code: `# マルチプロジェクト構成
my-project/
├── settings.gradle.kts        # サブプロジェクト宣言
├── build.gradle.kts           # ルートビルドスクリプト
├── gradle/
│   └── libs.versions.toml     # バージョンカタログ（共有）
├── common/
│   ├── build.gradle.kts
│   └── src/main/java/
├── domain/
│   ├── build.gradle.kts
│   └── src/main/java/
├── api/
│   ├── build.gradle.kts
│   └── src/main/java/
└── batch/
    ├── build.gradle.kts
    └── src/main/java/

// settings.gradle.kts
rootProject.name = "my-project"

include("common")
include("domain")
include("api")
include("batch")

// ネストしたサブプロジェクト
// include("services:user-service")
// include("services:order-service")

// ルート build.gradle.kts
// 全サブプロジェクトに適用
subprojects {
    apply(plugin = "java")

    group = "com.example"
    version = "1.0.0-SNAPSHOT"

    java {
        toolchain {
            languageVersion = JavaLanguageVersion.of(21)
        }
    }

    repositories {
        mavenCentral()
    }

    tasks.test {
        useJUnitPlatform()
    }
}`,
      },
      {
        title: "サブプロジェクトの依存関係",
        content:
          "サブプロジェクト間の依存はproject関数で宣言します。Gradleが依存グラフを解析してビルド順序を自動決定します。implementationとapiの使い分けにより、モジュール間の公開インターフェースを制御できます。",
        code: `// common/build.gradle.kts
plugins {
    \`java-library\`
}

dependencies {
    // 外部依存のみ
    api("com.fasterxml.jackson.core:jackson-databind")
    implementation("org.apache.commons:commons-lang3:3.14.0")
}

// domain/build.gradle.kts
plugins {
    \`java-library\`
}

dependencies {
    // サブプロジェクト依存
    api(project(":common"))
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
}

// api/build.gradle.kts
plugins {
    id("org.springframework.boot")
}

dependencies {
    implementation(project(":domain"))
    // domain → common の推移的依存
    // common が api で jackson を公開しているので api から使える
    implementation("org.springframework.boot:spring-boot-starter-web")
}

// batch/build.gradle.kts
plugins {
    id("org.springframework.boot")
}

dependencies {
    implementation(project(":domain"))
    implementation("org.springframework.boot:spring-boot-starter-batch")
}

// 依存グラフの確認
// ./gradlew :api:dependencies --configuration runtimeClasspath`,
      },
      {
        title: "buildSrcによる共通ロジック",
        content:
          "buildSrcはビルドロジックを集約する特別なディレクトリです。ここに配置したコードは全サブプロジェクトから自動的に参照可能になります。カスタムタスク、ユーティリティ関数、バージョン定数などを定義して、ビルドスクリプトの重複を排除します。",
        code: `# buildSrc構成
my-project/
├── buildSrc/
│   ├── build.gradle.kts      # buildSrc自体のビルド設定
│   └── src/main/kotlin/
│       ├── Versions.kt        # バージョン定数
│       └── Deps.kt            # 依存関係ヘルパー
├── settings.gradle.kts
└── ...

// buildSrc/build.gradle.kts
plugins {
    \`kotlin-dsl\`
}

repositories {
    mavenCentral()
}

// buildSrc/src/main/kotlin/Versions.kt
object Versions {
    const val java = 21
    const val springBoot = "3.2.4"
    const val junit = "5.10.2"
    const val jackson = "2.17.0"
}

// buildSrc/src/main/kotlin/Deps.kt
object Deps {
    const val springBootWeb =
        "org.springframework.boot:spring-boot-starter-web"
    const val springBootTest =
        "org.springframework.boot:spring-boot-starter-test"
    const val junitJupiter =
        "org.junit.jupiter:junit-jupiter:\${Versions.junit}"
}

// サブプロジェクトでの使用
// dependencies {
//     implementation(Deps.springBootWeb)
//     testImplementation(Deps.junitJupiter)
// }

// 注意: バージョンカタログ(libs.versions.toml)が推奨される場合も多い
// buildSrcはロジックの共有に、バージョンカタログはバージョン管理に使い分ける`,
      },
      {
        title: "Convention Plugin",
        content:
          "Convention Pluginは、共通のビルド設定をプラグインとしてパッケージ化する手法です。buildSrc内にGradleプラグインを作成し、java-common-conventionsのような名前で適用します。subprojects/allprojectsブロックよりも明示的で、設定の組み合わせも柔軟に行えます。",
        code: `# Convention Plugin構成
buildSrc/
├── build.gradle.kts
└── src/main/kotlin/
    ├── java-common-conventions.gradle.kts
    ├── java-library-conventions.gradle.kts
    └── java-application-conventions.gradle.kts

// buildSrc/build.gradle.kts
plugins {
    \`kotlin-dsl\`
}

repositories {
    gradlePluginPortal()
    mavenCentral()
}

// java-common-conventions.gradle.kts（共通設定）
plugins {
    java
    jacoco
}

group = "com.example"

java {
    toolchain {
        languageVersion = JavaLanguageVersion.of(21)
    }
}

repositories {
    mavenCentral()
}

dependencies {
    testImplementation("org.junit.jupiter:junit-jupiter:5.10.2")
    testImplementation("org.assertj:assertj-core:3.25.3")
}

tasks.test {
    useJUnitPlatform()
    finalizedBy(tasks.jacocoTestReport)
}

// java-library-conventions.gradle.kts（ライブラリモジュール用）
plugins {
    id("java-common-conventions")
    \`java-library\`
}

// java-application-conventions.gradle.kts（アプリケーション用）
plugins {
    id("java-common-conventions")
    application
}

// ===== サブプロジェクトでの適用 =====
// common/build.gradle.kts
// plugins {
//     id("java-library-conventions")
// }
//
// api/build.gradle.kts
// plugins {
//     id("java-application-conventions")
// }`,
      },
      {
        title: "包括的なマルチプロジェクト設定",
        content:
          "実務では、Convention Plugin、バージョンカタログ、共通テスト設定、コード品質ツールを組み合わせて、統一的なマルチプロジェクト環境を構築します。新しいモジュールの追加時もプラグインを適用するだけで標準設定が適用されるため、メンテナンスコストが大幅に削減されます。",
        code: `// ===== 実践的なマルチプロジェクト設定 =====

// settings.gradle.kts
rootProject.name = "my-enterprise-app"

include("common", "domain", "api", "batch", "integration-test")

enableFeaturePreview("TYPESAFE_PROJECT_ACCESSORS")

// ルート build.gradle.kts
plugins {
    id("org.owasp.dependencycheck") version "9.1.0" apply false
}

// 全プロジェクト共通のリポジトリ設定は
// settings.gradle.kts の dependencyResolutionManagement で行う

// api/build.gradle.kts（実践例）
plugins {
    id("java-application-conventions")
    id("org.springframework.boot")
    id("org.owasp.dependencycheck")
}

dependencies {
    // タイプセーフなプロジェクト参照（enableFeaturePreview使用時）
    implementation(projects.domain)

    implementation(libs.spring.boot.starter.web)
    implementation(libs.spring.boot.starter.actuator)
    runtimeOnly(libs.postgresql)
    testImplementation(libs.spring.boot.starter.test)
}

// タスクの依存関係設定
tasks.named("check") {
    dependsOn("dependencyCheckAnalyze")
}

// ===== コマンド例 =====
// ./gradlew build                    # 全モジュールビルド
// ./gradlew :api:build              # apiモジュールのみ
// ./gradlew :api:dependencies       # 依存関係確認
// ./gradlew build --parallel        # 並列ビルド
// ./gradlew build --scan            # ビルドスキャン
// ./gradlew dependencyCheckAnalyze  # 全モジュールの脆弱性スキャン`,
      },
    ],
  },

  // ===== 共通・実践 =====
  {
    id: "dependency-management",
    title: "依存管理の原則とセキュリティ",
    category: "common",
    description:
      "依存管理のベストプラクティス、セキュリティスキャン、ライセンス管理、脆弱性対応を学ぶ",
    sections: [
      {
        title: "依存管理の基本原則",
        content:
          "依存管理の基本原則は「最小限の依存」「バージョンの固定」「定期的な更新」です。必要最低限のライブラリだけを使い、バージョンは明示的に固定し、セキュリティアップデートは速やかに適用します。推移的依存も含めた全体像を把握し、不要な依存や重複を排除することが重要です。",
        code: `// ===== 依存管理の基本原則 =====

// 1. 最小限の依存
// Bad: 小さな機能のために大きなライブラリを追加
// dependencies {
//     implementation("org.apache.commons:commons-lang3:3.14.0")
//     // StringUtils.isBlank() だけのために追加？
// }
//
// Good: Java標準APIで代替可能か検討
// String.isBlank() // Java 11+

// 2. バージョンの明示的固定
// Bad: 動的バージョン
// implementation("com.google.guava:guava:+")
// implementation("com.google.guava:guava:33.+")

// Good: 固定バージョン
// implementation("com.google.guava:guava:33.1.0-jre")

// 3. バージョンの一元管理
// Maven: dependencyManagement / BOM
// Gradle: バージョンカタログ / BOM

// 4. 定期的な依存更新チェック
// Maven:
//   mvn versions:display-dependency-updates
//   mvn versions:display-plugin-updates
//
// Gradle:
//   ./gradlew dependencyUpdates  // ben-manes/gradle-versions-plugin
//
// Renovate / Dependabot で自動PR作成

// 5. 依存関係の可視化と分析
// Maven: mvn dependency:tree
// Maven: mvn dependency:analyze
// Gradle: ./gradlew dependencies
// Gradle: ./gradlew buildHealth  // dependency-analysis plugin`,
      },
      {
        title: "セキュリティスキャン",
        content:
          "依存ライブラリの脆弱性は重大なセキュリティリスクです。OWASP Dependency-Check、Snyk、GitHub Dependabotなどのツールで定期的にスキャンし、既知の脆弱性（CVE）を検出します。CIパイプラインに組み込むことで、脆弱なライブラリの混入を防ぎます。",
        code: `// ===== Maven: OWASP Dependency-Check =====
// <plugin>
//     <groupId>org.owasp</groupId>
//     <artifactId>dependency-check-maven</artifactId>
//     <version>9.1.0</version>
//     <configuration>
//         <failBuildOnCVSS>7</failBuildOnCVSS>
//         <formats>
//             <format>HTML</format>
//             <format>JSON</format>
//         </formats>
//     </configuration>
// </plugin>
// mvn dependency-check:check

// ===== Gradle: OWASP Dependency-Check =====
// plugins {
//     id("org.owasp.dependencycheck") version "9.1.0"
// }
// dependencyCheck {
//     failBuildOnCVSS = 7.0f
//     formats = listOf("HTML", "JSON")
// }
// ./gradlew dependencyCheckAnalyze

// ===== GitHub Actions でのスキャン =====
// .github/workflows/security-scan.yml
// name: Security Scan
// on:
//   push:
//     branches: [main]
//   schedule:
//     - cron: '0 0 * * 1'  # 毎週月曜
//
// jobs:
//   dependency-check:
//     runs-on: ubuntu-latest
//     steps:
//       - uses: actions/checkout@v4
//       - uses: actions/setup-java@v4
//         with:
//           java-version: '21'
//           distribution: 'temurin'
//       - name: OWASP Dependency Check
//         run: ./gradlew dependencyCheckAnalyze
//       - name: Upload Report
//         uses: actions/upload-artifact@v4
//         with:
//           name: dependency-check-report
//           path: build/reports/dependency-check-report.html`,
      },
      {
        title: "ライセンス管理",
        content:
          "使用するライブラリのライセンスを把握し、プロジェクトのライセンスと互換性があることを確認する必要があります。商用プロジェクトではGPL系ライセンスの混入に注意が必要です。ライセンスチェックツールをCIに組み込み、禁止ライセンスの自動検出を行います。",
        code: `// ===== 主要なOSSライセンス =====
// MIT / Apache 2.0 / BSD → 商用利用可、制約が少ない
// LGPL → ダイナミックリンクなら商用OK、静的リンクは注意
// GPL → 派生物もGPLにする必要あり（商用注意）
// AGPL → ネットワーク経由でもGPL適用

// ===== Maven: License Plugin =====
// <plugin>
//     <groupId>com.mycila</groupId>
//     <artifactId>license-maven-plugin</artifactId>
//     <version>4.3</version>
//     <configuration>
//         <licenseSets>
//             <licenseSet>
//                 <header>LICENSE_HEADER.txt</header>
//                 <includes>
//                     <include>src/main/java/**</include>
//                 </includes>
//             </licenseSet>
//         </licenseSets>
//     </configuration>
// </plugin>

// ===== Gradle: License Report Plugin =====
// plugins {
//     id("com.github.jk1.dependency-license-report") version "2.6"
// }
//
// licenseReport {
//     // 許可するライセンスを定義
//     allowedLicensesFile = file("config/allowed-licenses.json")
//     renderers = arrayOf(
//         com.github.jk1.license.render.JsonReportRenderer("licenses.json"),
//         com.github.jk1.license.render.SimpleHtmlReportRenderer("licenses.html")
//     )
// }
// ./gradlew generateLicenseReport

// ===== allowed-licenses.json の例 =====
// {
//   "allowedLicenses": [
//     { "moduleLicense": "Apache License, Version 2.0" },
//     { "moduleLicense": "MIT License" },
//     { "moduleLicense": "BSD License" },
//     { "moduleLicense": "Eclipse Public License 2.0" }
//   ]
// }`,
      },
      {
        title: "脆弱性対応プロセス",
        content:
          "脆弱性が発見された場合の対応プロセスを事前に定めておくことが重要です。CVSSスコアに基づく優先度分類、影響範囲の調査、パッチ適用、テスト、リリースの流れを標準化します。Dependabotやrenovateで自動PRを作成し、対応を迅速化します。",
        code: `// ===== 脆弱性対応フロー =====
//
// 1. 検出: CI/CD での定期スキャン or Dependabot アラート
// 2. 評価: CVSSスコアと影響範囲の確認
//    - Critical (9.0-10.0): 24時間以内に対応
//    - High (7.0-8.9): 1週間以内に対応
//    - Medium (4.0-6.9): 次回リリースで対応
//    - Low (0.1-3.9): バックログに追加
// 3. 対応: バージョンアップ or ワークアラウンド
// 4. テスト: 回帰テスト実行
// 5. リリース: 修正版のデプロイ

// ===== Dependabot 設定 =====
// .github/dependabot.yml
// version: 2
// updates:
//   - package-ecosystem: "maven"
//     directory: "/"
//     schedule:
//       interval: "weekly"
//       day: "monday"
//     open-pull-requests-limit: 10
//     labels:
//       - "dependencies"
//       - "security"
//     # 自動マージ設定（patch バージョンのみ）
//     # GitHub Actions で条件付きマージを設定

// ===== 脆弱性の一時的な抑制 =====
// 誤検知や対応不要な場合にスキャン警告を抑制
//
// OWASP Dependency-Check suppression.xml:
// <suppressions>
//   <suppress>
//     <notes>テスト用依存のため本番影響なし</notes>
//     <cve>CVE-2024-XXXXX</cve>
//   </suppress>
//   <suppress>
//     <notes>該当機能を使用していないため影響なし</notes>
//     <gav regex="true">.*:some-library:.*</gav>
//     <cve>CVE-2024-YYYYY</cve>
//   </suppress>
// </suppressions>`,
      },
      {
        title: "依存管理ツールの比較",
        content:
          "MavenとGradleの依存管理には重要な違いがあります。Mavenは「nearest wins」、Gradleは「newest wins」の競合解決戦略を採用しています。BOMの扱い、スコープ/構成の粒度、ロック機構なども異なります。プロジェクトの特性に応じて適切なツールを選択しましょう。",
        code: `// ===== Maven vs Gradle 依存管理の比較 =====

// 競合解決戦略
// Maven:  nearest wins（依存ツリーで近い方が勝つ）
// Gradle: newest wins（最新バージョンが勝つ）

// スコープ / 構成
// Maven            | Gradle
// compile          | implementation (非公開) / api (公開)
// provided         | compileOnly
// runtime          | runtimeOnly
// test             | testImplementation
// (なし)           | testCompileOnly / testRuntimeOnly

// BOM
// Maven:  <scope>import</scope> in dependencyManagement
// Gradle: platform() / enforcedPlatform()

// バージョン一元管理
// Maven:  properties + dependencyManagement
// Gradle: Version Catalog (libs.versions.toml)

// 依存ロック
// Maven:  なし（versions-maven-plugin で補完）
// Gradle: dependencyLocking { lockAllConfigurations() }

// 選定基準:
// Maven が向いているケース:
//   - XML設定に慣れたチーム
//   - シンプルなプロジェクト構成
//   - Javaエコシステム中心
//
// Gradle が向いているケース:
//   - 高速ビルドが必要（キャッシュ、並列実行）
//   - 複雑なビルドロジックが必要
//   - マルチ言語プロジェクト（Java + Kotlin等）
//   - Android 開発`,
      },
    ],
  },
  {
    id: "ci-integration",
    title: "CI/CD連携",
    category: "common",
    description:
      "GitHub Actionsとの連携、テスト自動化、リリース自動化、アーティファクト管理を学ぶ",
    sections: [
      {
        title: "GitHub Actionsの基本設定",
        content:
          "GitHub Actionsはリポジトリに.github/workflows/ディレクトリを作成し、YAMLファイルでワークフローを定義します。Javaプロジェクトでは、JDKのセットアップ、依存キャッシュ、ビルド・テスト実行が基本構成です。MavenとGradleそれぞれに最適化された設定があります。",
        code: `# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Java 21
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'

      # === Maven の場合 ===
      - name: Cache Maven packages
        uses: actions/cache@v4
        with:
          path: ~/.m2/repository
          key: \${{ runner.os }}-maven-\${{ hashFiles('**/pom.xml') }}
          restore-keys: |
            \${{ runner.os }}-maven-

      - name: Build with Maven
        run: mvn clean verify --batch-mode --no-transfer-progress

      # === Gradle の場合 ===
      # - name: Setup Gradle
      #   uses: gradle/actions/setup-gradle@v3
      #
      # - name: Build with Gradle
      #   run: ./gradlew build

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-results
          path: |
            **/target/surefire-reports/
            **/build/reports/tests/`,
      },
      {
        title: "テスト自動化",
        content:
          "CIパイプラインでのテスト自動化は品質保証の要です。ユニットテスト、統合テスト、カバレッジレポートを段階的に実行します。テスト結果をPRにコメントとして表示したり、カバレッジの閾値を設定してビルドを制御したりできます。",
        code: `# .github/workflows/test.yml
name: Test

on:
  pull_request:
    branches: [main]

jobs:
  unit-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
          cache: 'maven'

      - name: Run unit tests with coverage
        run: mvn clean test jacoco:report -B

      - name: Check coverage threshold
        run: mvn jacoco:check -B

      - name: Publish test results
        if: always()
        uses: dorny/test-reporter@v1
        with:
          name: Unit Tests
          path: '**/target/surefire-reports/TEST-*.xml'
          reporter: java-junit

      - name: Add coverage to PR
        if: github.event_name == 'pull_request'
        uses: madrapps/jacoco-report@v1.6
        with:
          paths: \${{ github.workspace }}/target/site/jacoco/jacoco.xml
          token: \${{ secrets.GITHUB_TOKEN }}
          min-coverage-overall: 80
          min-coverage-changed-files: 90

  integration-test:
    runs-on: ubuntu-latest
    needs: unit-test
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_DB: testdb
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
          cache: 'maven'

      - name: Run integration tests
        run: mvn clean verify -Pintegration-test -B
        env:
          DB_URL: jdbc:postgresql://localhost:5432/testdb`,
      },
      {
        title: "リリース自動化",
        content:
          "リリースプロセスの自動化により、ヒューマンエラーを減らし一貫性のあるリリースを実現します。セマンティックバージョニングに基づくバージョン管理、CHANGELOGの自動生成、タグの作成、アーティファクトの公開を自動化します。",
        code: `# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # 全履歴を取得（CHANGELOG生成用）

      - uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
          cache: 'maven'

      - name: Extract version from tag
        id: version
        run: echo "VERSION=\${GITHUB_REF#refs/tags/v}" >> \$GITHUB_OUTPUT

      - name: Set version
        run: mvn versions:set -DnewVersion=\${{ steps.version.outputs.VERSION }} -B

      - name: Build release
        run: mvn clean package -DskipTests -Pprod -B

      - name: Run tests
        run: mvn test -B

      - name: Generate changelog
        id: changelog
        uses: mikepenz/release-changelog-builder-action@v4
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          body: \${{ steps.changelog.outputs.changelog }}
          files: |
            target/*.jar
          fail_on_unmatched_files: true

      # Maven Central へのデプロイ
      # - name: Deploy to Maven Central
      #   run: mvn deploy -Pprod -DskipTests -B
      #   env:
      #     MAVEN_USERNAME: \${{ secrets.OSSRH_USERNAME }}
      #     MAVEN_PASSWORD: \${{ secrets.OSSRH_TOKEN }}
      #     MAVEN_GPG_PASSPHRASE: \${{ secrets.GPG_PASSPHRASE }}`,
      },
      {
        title: "アーティファクト管理",
        content:
          "ビルド成果物（アーティファクト）の管理は、リリース管理と依存解決の基盤です。Nexus、Artifactory、GitHub PackagesなどのリポジトリマネージャでJARファイルを管理します。SNAPSHOT版とRelease版を分離し、適切なリテンションポリシーを設定します。",
        code: `// ===== Maven: Nexus へのデプロイ設定 =====
// pom.xml
// <distributionManagement>
//     <repository>
//         <id>nexus-releases</id>
//         <url>https://nexus.example.com/repository/maven-releases/</url>
//     </repository>
//     <snapshotRepository>
//         <id>nexus-snapshots</id>
//         <url>https://nexus.example.com/repository/maven-snapshots/</url>
//     </snapshotRepository>
// </distributionManagement>
//
// mvn deploy -B

// ===== Gradle: GitHub Packages へのデプロイ =====
// build.gradle.kts
// plugins {
//     \`maven-publish\`
// }
//
// publishing {
//     publications {
//         create<MavenPublication>("maven") {
//             from(components["java"])
//             pom {
//                 name = project.name
//                 description = "My Library"
//                 url = "https://github.com/example/my-lib"
//                 licenses {
//                     license {
//                         name = "Apache 2.0"
//                         url = "https://www.apache.org/licenses/LICENSE-2.0"
//                     }
//                 }
//             }
//         }
//     }
//     repositories {
//         maven {
//             name = "GitHubPackages"
//             url = uri("https://maven.pkg.github.com/OWNER/REPO")
//             credentials {
//                 username = System.getenv("GITHUB_ACTOR")
//                 password = System.getenv("GITHUB_TOKEN")
//             }
//         }
//     }
// }
// ./gradlew publish

// ===== Docker イメージのビルドとプッシュ =====
// # Jib プラグインで Docker なしでイメージビルド
// # Maven: mvn jib:build
// # Gradle: ./gradlew jib
//
// plugins {
//     id("com.google.cloud.tools.jib") version "3.4.1"
// }
//
// jib {
//     from { image = "eclipse-temurin:21-jre" }
//     to {
//         image = "ghcr.io/example/my-app"
//         tags = setOf(project.version.toString(), "latest")
//     }
//     container {
//         jvmFlags = listOf("-Xmx512m", "-XX:+UseG1GC")
//         mainClass = "com.example.App"
//         ports = listOf("8080")
//     }
// }`,
      },
      {
        title: "マトリクスビルドと最適化",
        content:
          "マトリクスビルドでは複数のJDKバージョンやOS環境での互換性テストを並列実行できます。キャッシュの最適化、不要なステップのスキップ、条件付き実行などの工夫で、CIの実行時間を短縮し、開発生産性を向上させます。",
        code: `# .github/workflows/matrix-build.yml
name: Matrix Build

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: \${{ matrix.os }}
    strategy:
      fail-fast: false
      matrix:
        os: [ubuntu-latest, macos-latest]
        java-version: ['17', '21']
        include:
          - os: ubuntu-latest
            java-version: '21'
            coverage: true

    steps:
      - uses: actions/checkout@v4

      - name: Setup Java \${{ matrix.java-version }}
        uses: actions/setup-java@v4
        with:
          java-version: \${{ matrix.java-version }}
          distribution: 'temurin'
          cache: 'gradle'

      - name: Setup Gradle
        uses: gradle/actions/setup-gradle@v3

      - name: Build
        run: ./gradlew build

      - name: Coverage Report
        if: matrix.coverage
        run: ./gradlew jacocoTestReport

      - name: Upload coverage
        if: matrix.coverage
        uses: codecov/codecov-action@v4
        with:
          file: build/reports/jacoco/test/jacocoTestReport.xml

  # 全マトリクス完了後にデプロイ
  deploy:
    needs: build
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
          cache: 'gradle'
      - name: Deploy
        run: ./gradlew publish
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}`,
      },
    ],
  },
];
