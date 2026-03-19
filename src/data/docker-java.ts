export interface DockerJavaSection {
  title: string;
  content: string;
  code?: string;
}

export interface DockerJavaChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: DockerJavaSection[];
}

export const dockerJavaCategories = [
  { id: "basics", name: "Docker基礎", color: "#2496ED" },
  { id: "java-container", name: "Javaコンテナ化", color: "#DC2626" },
  { id: "operations", name: "運用・CI/CD", color: "#059669" },
] as const;

export const dockerJavaChapters: DockerJavaChapter[] = [
  // ===== Docker基礎 =====
  {
    id: "docker-basics",
    title: "Dockerとは",
    category: "basics",
    description:
      "Dockerの基本概念、イメージ・コンテナ・レジストリの関係、主要コマンド、Dockerfileの書き方を学ぶ",
    sections: [
      {
        title: "Dockerとは何か",
        content:
          "Dockerは、アプリケーションとその依存関係をコンテナという軽量な仮想環境にパッケージングするためのプラットフォームです。従来の仮想マシン（VM）と異なり、ホストOSのカーネルを共有するため、起動が高速でリソース効率が良いのが特徴です。「自分の環境では動くのに本番では動かない」という問題を解消し、開発・テスト・本番で一貫した環境を提供します。",
        code: `# Dockerのバージョン確認
$ docker --version
Docker version 24.0.7, build afdd53b

# Docker情報の確認
$ docker info
Containers: 5
 Running: 2
 Paused: 0
 Stopped: 3
Images: 15
Server Version: 24.0.7
Storage Driver: overlay2

# VMとコンテナの違い
# ┌─────────────┐  ┌─────────────┐
# │   App A     │  │   App A     │
# │   Bins/Libs │  │   Bins/Libs │
# │   Guest OS  │  ├─────────────┤  ← コンテナはOSを共有
# ├─────────────┤  │   App B     │
# │   App B     │  │   Bins/Libs │
# │   Bins/Libs │  ├─────────────┤
# │   Guest OS  │  │ Docker Engine│
# ├─────────────┤  ├─────────────┤
# │ Hypervisor  │  │   Host OS   │
# ├─────────────┤  ├─────────────┤
# │   Host OS   │  │  Hardware   │
# └─────────────┘  └─────────────┘
#   VM方式           コンテナ方式`,
      },
      {
        title: "イメージ・コンテナ・レジストリ",
        content:
          "Dockerの3つの基本概念を理解しましょう。イメージはアプリケーションの実行に必要なすべてを含む読み取り専用のテンプレートです。コンテナはイメージから作成された実行中のインスタンスです。レジストリ（Docker Hubなど）はイメージを保存・配布する場所です。イメージとコンテナの関係は、Javaにおけるクラスとオブジェクトの関係に似ています。",
        code: `# イメージの一覧を表示
$ docker images
REPOSITORY    TAG       IMAGE ID       SIZE
eclipse-temurin  21-jdk   a1b2c3d4e5f6   460MB
postgres      16        f6e5d4c3b2a1   430MB
nginx         latest    1a2b3c4d5e6f   190MB

# Docker Hubからイメージを取得（pull）
$ docker pull eclipse-temurin:21-jdk
21-jdk: Pulling from library/eclipse-temurin
Digest: sha256:abc123...
Status: Downloaded newer image for eclipse-temurin:21-jdk

# コンテナの一覧（実行中のもの）
$ docker ps
CONTAINER ID   IMAGE              STATUS          PORTS
a1b2c3d4e5f6   eclipse-temurin    Up 5 minutes    8080->8080

# コンテナの一覧（停止中を含む全て）
$ docker ps -a

# イメージをレジストリにプッシュ
$ docker tag myapp:latest myregistry/myapp:1.0
$ docker push myregistry/myapp:1.0`,
      },
      {
        title: "docker run / build / push",
        content:
          "Dockerの最も重要な3つのコマンドを理解しましょう。docker runはイメージからコンテナを起動します。docker buildはDockerfileからイメージをビルドします。docker pushはイメージをレジストリにアップロードします。runコマンドには多数のオプションがあり、ポートマッピング（-p）、環境変数（-e）、ボリュームマウント（-v）、バックグラウンド実行（-d）などを指定できます。",
        code: `# コンテナの起動（基本）
$ docker run eclipse-temurin:21-jdk java -version
openjdk version "21.0.2" 2024-01-16 LTS

# コンテナの起動（オプション付き）
$ docker run -d \\
    --name my-java-app \\
    -p 8080:8080 \\
    -e SPRING_PROFILES_ACTIVE=prod \\
    -e JAVA_OPTS="-Xmx512m" \\
    -v ./logs:/app/logs \\
    --restart unless-stopped \\
    myapp:1.0

# -d: バックグラウンド実行（デタッチモード）
# --name: コンテナ名を指定
# -p: ポートマッピング（ホスト:コンテナ）
# -e: 環境変数の設定
# -v: ボリュームマウント（ホスト:コンテナ）
# --restart: 再起動ポリシー

# イメージのビルド
$ docker build -t myapp:1.0 .
$ docker build -t myapp:1.0 -f Dockerfile.prod .

# イメージのプッシュ
$ docker login
$ docker tag myapp:1.0 ghcr.io/myuser/myapp:1.0
$ docker push ghcr.io/myuser/myapp:1.0`,
      },
      {
        title: "Dockerfile基礎",
        content:
          "Dockerfileはイメージのビルド手順を記述するテキストファイルです。FROM命令でベースイメージを指定し、RUN命令でコマンドを実行、COPY命令でファイルをコピー、CMD命令でコンテナ起動時のデフォルトコマンドを設定します。各命令はレイヤーとして積み重なり、変更がないレイヤーはキャッシュされるため、変更頻度の低いものを先に記述するとビルドが高速化されます。",
        code: `# Dockerfile の基本構成
FROM eclipse-temurin:21-jdk

# メタデータの設定
LABEL maintainer="dev@example.com"
LABEL version="1.0"

# 作業ディレクトリの設定
WORKDIR /app

# 依存関係ファイルを先にコピー（キャッシュ活用）
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
RUN ./mvnw dependency:go-offline

# ソースコードのコピーとビルド
COPY src ./src
RUN ./mvnw package -DskipTests

# ポートの公開（ドキュメント用）
EXPOSE 8080

# 環境変数の設定
ENV JAVA_OPTS="-Xmx256m"

# コンテナ起動時のコマンド
CMD ["java", "-jar", "target/app.jar"]

# 主要な命令まとめ:
# FROM    - ベースイメージ指定
# WORKDIR - 作業ディレクトリ設定
# COPY    - ファイルコピー
# RUN     - ビルド時にコマンド実行
# EXPOSE  - ポート公開（ドキュメント）
# ENV     - 環境変数設定
# CMD     - コンテナ起動コマンド
# ENTRYPOINT - 固定の実行コマンド`,
      },
      {
        title: "コンテナのライフサイクル管理",
        content:
          "コンテナにはCreated・Running・Paused・Stopped・Deletedというライフサイクルがあります。docker startで起動、docker stopで停止、docker rmで削除します。不要なイメージやコンテナが溜まるとディスクを圧迫するため、定期的にdocker system pruneでクリーンアップすることが重要です。また、docker execで実行中のコンテナ内でコマンドを実行できます。",
        code: `# コンテナのライフサイクル操作
$ docker create --name myapp myapp:1.0   # 作成
$ docker start myapp                      # 起動
$ docker pause myapp                      # 一時停止
$ docker unpause myapp                    # 再開
$ docker stop myapp                       # 停止（SIGTERM送信）
$ docker kill myapp                       # 強制停止（SIGKILL送信）
$ docker rm myapp                         # 削除

# 実行中のコンテナ内でコマンドを実行
$ docker exec -it myapp bash
$ docker exec myapp cat /app/config.yml

# ログの確認
$ docker logs myapp
$ docker logs -f --tail 100 myapp  # 最新100行 + フォロー

# リソース使用量の確認
$ docker stats myapp
CONTAINER   CPU %   MEM USAGE / LIMIT   NET I/O
myapp       1.5%    256MiB / 512MiB     1.2kB / 0B

# クリーンアップ
$ docker system prune           # 未使用リソースの削除
$ docker system prune -a        # 未使用イメージも含めて削除
$ docker image prune            # 不要イメージのみ削除
$ docker volume prune           # 未使用ボリュームの削除

# ディスク使用量の確認
$ docker system df
TYPE            TOTAL   ACTIVE   SIZE      RECLAIMABLE
Images          15      5        4.2GB     2.8GB (66%)
Containers      8       2        150MB     120MB (80%)
Volumes         3       2        500MB     200MB (40%)`,
      },
    ],
  },
  {
    id: "docker-compose",
    title: "Docker Compose",
    category: "basics",
    description:
      "Docker Composeによる複数コンテナの定義・管理、ネットワーク設定、ボリューム、依存関係の制御を学ぶ",
    sections: [
      {
        title: "Docker Composeとは",
        content:
          "Docker Composeは、複数のコンテナで構成されるアプリケーションを定義・管理するためのツールです。compose.yaml（旧docker-compose.yml）ファイルにサービス、ネットワーク、ボリュームを宣言的に記述し、docker compose upコマンド一つで全てのコンテナを起動できます。Java + PostgreSQL + Redisのような典型的な構成を簡単にセットアップできます。",
        code: `# compose.yaml - Java + PostgreSQL + Redis の構成
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://db:5432/myapp
      SPRING_DATASOURCE_USERNAME: postgres
      SPRING_DATASOURCE_PASSWORD: secret
      SPRING_REDIS_HOST: redis
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started

  db:
    image: postgres:16
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secret
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres-data:`,
      },
      {
        title: "複数コンテナ管理",
        content:
          "docker composeコマンドで複数コンテナを一括操作できます。upで起動、downで停止・削除、logsでログ確認、psでステータス確認が可能です。--buildオプションでイメージの再ビルド、--scaleで特定サービスのスケーリング、-dでバックグラウンド実行を指定できます。開発時はwatch機能でファイル変更を自動検知してリビルド・再起動も可能です。",
        code: `# 全サービスの起動
$ docker compose up -d
[+] Running 3/3
 ✔ Container myapp-redis-1  Started
 ✔ Container myapp-db-1     Started
 ✔ Container myapp-app-1    Started

# イメージを再ビルドして起動
$ docker compose up -d --build

# 特定のサービスのみ起動
$ docker compose up -d db redis

# サービスのスケーリング
$ docker compose up -d --scale app=3

# 全サービスの停止・削除
$ docker compose down
$ docker compose down -v  # ボリュームも削除

# ステータス確認
$ docker compose ps
NAME              STATUS          PORTS
myapp-app-1       Up 5 minutes    0.0.0.0:8080->8080/tcp
myapp-db-1        Up 5 minutes    5432/tcp
myapp-redis-1     Up 5 minutes    0.0.0.0:6379->6379/tcp

# ログの確認
$ docker compose logs app         # 特定サービスのログ
$ docker compose logs -f          # 全サービスのログをフォロー
$ docker compose logs --tail 50   # 最新50行

# サービスの再起動
$ docker compose restart app

# 開発モード（ファイル変更の自動検知）
$ docker compose watch`,
      },
      {
        title: "ネットワーク",
        content:
          "Docker Composeでは、デフォルトでプロジェクト名のネットワークが自動作成され、サービス名でコンテナ間通信ができます。たとえばappコンテナからdb:5432でPostgreSQLにアクセスできます。カスタムネットワークを定義することで、フロントエンド用・バックエンド用のようにネットワークを分離し、セキュリティを向上させることも可能です。",
        code: `# ネットワーク分離の構成例
services:
  # フロントエンド - フロントネットワークのみ
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    networks:
      - frontend

  # アプリケーション - 両方のネットワークに接続
  app:
    build: .
    networks:
      - frontend
      - backend

  # データベース - バックエンドネットワークのみ
  db:
    image: postgres:16
    networks:
      - backend

  # 管理ツール - バックエンドネットワークのみ
  adminer:
    image: adminer
    ports:
      - "8081:8080"
    networks:
      - backend

networks:
  frontend:
    driver: bridge
  backend:
    driver: bridge
    # 外部から直接アクセスできない内部ネットワーク
    internal: true

# ネットワークの確認コマンド
# $ docker network ls
# $ docker network inspect myapp_backend
# $ docker compose exec app ping db    # 名前解決の確認`,
      },
      {
        title: "ボリュームとデータ永続化",
        content:
          "コンテナは停止・削除するとデータが失われるため、永続化にはボリュームを使用します。名前付きボリューム（Named Volume）はDockerが管理する領域にデータを保存します。バインドマウントはホストのディレクトリをコンテナ内にマウントし、開発時のコード共有に便利です。tmpfsマウントはメモリ上の一時領域で、機密情報の一時保存に使われます。",
        code: `services:
  app:
    build: .
    volumes:
      # バインドマウント: ホストのディレクトリをマウント（開発用）
      - ./src:/app/src
      # 名前付きボリューム: ログの永続化
      - app-logs:/app/logs
      # tmpfs: 一時ファイル（メモリ上）
      - type: tmpfs
        target: /app/tmp
        tmpfs:
          size: 100m

  db:
    image: postgres:16
    volumes:
      # 名前付きボリューム: DBデータの永続化
      - postgres-data:/var/lib/postgresql/data
      # 初期化SQL（読み取り専用でマウント）
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql:ro
      # PostgreSQL設定ファイル
      - ./postgresql.conf:/etc/postgresql/postgresql.conf:ro

  # バックアップサービス
  backup:
    image: postgres:16
    volumes:
      - postgres-data:/data/db:ro      # DBデータを読み取り専用で参照
      - ./backups:/backups              # バックアップ先
    command: >
      sh -c "pg_dump -h db -U postgres myapp > /backups/backup_$$(date +%Y%m%d).sql"
    profiles:
      - tools  # docker compose --profile tools run backup

volumes:
  postgres-data:
    driver: local
  app-logs:
    driver: local

# ボリューム管理コマンド
# $ docker volume ls
# $ docker volume inspect postgres-data
# $ docker volume rm postgres-data`,
      },
      {
        title: "depends_onと起動順序制御",
        content:
          "depends_onを使うと、サービス間の依存関係を定義し、起動順序を制御できます。ただし、デフォルトではコンテナの起動を待つだけで、アプリケーションの準備完了は待ちません。condition: service_healthyを指定すると、ヘルスチェックが通るまで依存サービスの起動を待つことができます。これにより、DBが完全に起動してからアプリケーションを起動するような制御が可能になります。",
        code: `services:
  app:
    build: .
    depends_on:
      db:
        condition: service_healthy    # DBのヘルスチェック通過を待つ
        restart: true                 # DB再起動時にappも再起動
      redis:
        condition: service_healthy
      migrations:
        condition: service_completed_successfully  # マイグレーション完了を待つ
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 30s              # 起動猶予期間

  db:
    image: postgres:16
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: secret
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d myapp"]
      interval: 5s
      timeout: 3s
      retries: 10

  redis:
    image: redis:7-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5

  # DBマイグレーション（一度だけ実行）
  migrations:
    build: .
    command: ["java", "-jar", "app.jar", "--spring.flyway.enabled=true", "--run-migration"]
    depends_on:
      db:
        condition: service_healthy
    # 完了したらコンテナは停止する

# 起動順序: db → redis → migrations → app
# depends_on の condition オプション:
# - service_started    : コンテナが起動したら（デフォルト）
# - service_healthy    : ヘルスチェックが通ったら
# - service_completed_successfully : 正常終了したら`,
      },
    ],
  },

  // ===== Javaコンテナ化 =====
  {
    id: "java-dockerfile",
    title: "JavaアプリのDockerfile",
    category: "java-container",
    description:
      "Javaアプリケーション向けDockerfileの書き方、マルチステージビルド、ベースイメージの選択を学ぶ",
    sections: [
      {
        title: "JavaアプリのDockerfile設計",
        content:
          "JavaアプリケーションのDockerfileでは、ベースイメージの選択、ビルド環境と実行環境の分離、レイヤーキャッシュの最適化が重要です。Maven/Gradleプロジェクトでは、依存関係の解決とアプリケーションのビルドを分離することで、ソースコード変更時のビルド時間を大幅に短縮できます。",
        code: `# 基本的なJava Dockerfile（Maven プロジェクト）
FROM eclipse-temurin:21-jdk AS build

WORKDIR /app

# 1. 依存関係ファイルのみ先にコピー（キャッシュ活用）
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn
RUN chmod +x mvnw && ./mvnw dependency:go-offline -B

# 2. ソースコードのコピーとビルド
COPY src ./src
RUN ./mvnw package -DskipTests -B

# 実行用ステージ
FROM eclipse-temurin:21-jre

WORKDIR /app

# ビルド成果物のみコピー
COPY --from=build /app/target/*.jar app.jar

# 非rootユーザーで実行（セキュリティ）
RUN addgroup --system appgroup && \\
    adduser --system --ingroup appgroup appuser
USER appuser

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]`,
      },
      {
        title: "マルチステージビルド",
        content:
          "マルチステージビルドを使うと、ビルド環境（JDK + Maven/Gradle）と実行環境（JREのみ）を分離でき、最終イメージのサイズを大幅に削減できます。ビルドステージではフルのJDKとビルドツールを使い、実行ステージではJREと成果物のみを含めます。これにより、イメージサイズを数百MB削減できることも珍しくありません。",
        code: `# マルチステージビルド（Gradle プロジェクト）
# Stage 1: ビルド
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app

COPY gradle gradle
COPY gradlew build.gradle.kts settings.gradle.kts ./
RUN chmod +x gradlew && ./gradlew dependencies --no-daemon

COPY src ./src
RUN ./gradlew bootJar --no-daemon

# Stage 2: テスト（オプション）
FROM build AS test
RUN ./gradlew test --no-daemon

# Stage 3: 実行
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# ビルドステージから JAR のみコピー
COPY --from=build /app/build/libs/*.jar app.jar

# タイムゾーン設定
ENV TZ=Asia/Tokyo

RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

EXPOSE 8080
ENTRYPOINT ["java", \\
  "-XX:MaxRAMPercentage=75.0", \\
  "-XX:+UseG1GC", \\
  "-jar", "app.jar"]

# イメージサイズ比較:
# eclipse-temurin:21-jdk         ~460MB
# eclipse-temurin:21-jre         ~270MB
# eclipse-temurin:21-jre-alpine  ~180MB
# → マルチステージで JDK → JRE-alpine に変えるだけで 280MB 削減`,
      },
      {
        title: "JDK vs JRE の選択",
        content:
          "実行環境ではJRE（Java Runtime Environment）を使用すべきです。JDKにはコンパイラやデバッグツールが含まれますが、実行時には不要で、攻撃対象面（Attack Surface）を増やしてしまいます。ただし、jlinkやjdepsを使うカスタムランタイム作成、JFRでの本番プロファイリング、troubleshootingツールが必要な場合はJDKイメージも検討します。",
        code: `# 比較: JDK vs JRE vs カスタムランタイム

# 1. JDK（開発・ビルド用）
FROM eclipse-temurin:21-jdk
# サイズ: ~460MB / javac, jdb, jconsole等を含む

# 2. JRE（実行用 - 推奨）
FROM eclipse-temurin:21-jre-alpine
# サイズ: ~180MB / 実行に必要な最小限

# 3. カスタムランタイム（jlinkで最小構成）
FROM eclipse-temurin:21-jdk AS jre-build
RUN jlink \\
    --add-modules java.base,java.logging,java.net.http,java.sql \\
    --strip-debug \\
    --no-man-pages \\
    --no-header-files \\
    --compress=zip-6 \\
    --output /custom-jre

FROM debian:bookworm-slim
COPY --from=jre-build /custom-jre /opt/java
ENV PATH="/opt/java/bin:\${PATH}"
COPY --from=build /app/target/app.jar /app/app.jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
# サイズ: ~100MB / 必要なモジュールのみ

# jdepsで必要なモジュールを調べる
# $ jdeps --print-module-deps --ignore-missing-deps target/app.jar
# java.base,java.logging,java.net.http,java.sql,java.xml`,
      },
      {
        title: "distroless / Alpine イメージ",
        content:
          "ベースイメージの選択はセキュリティとサイズに大きく影響します。Alpine Linuxベースのイメージはmusl libcを使い、非常に軽量です。Google distrolessイメージはシェルやパッケージマネージャすら含まず、最もセキュアですがデバッグが困難です。用途に応じて適切なベースイメージを選択しましょう。",
        code: `# 1. 標準 JRE イメージ
FROM eclipse-temurin:21-jre
# サイズ: ~270MB / Debian ベース / シェルあり

# 2. Alpine ベース（軽量）
FROM eclipse-temurin:21-jre-alpine
# サイズ: ~180MB / Alpine Linux / シェルあり
# 注意: musl libc のため一部ライブラリで互換性問題あり

# 3. Google distroless（最もセキュア）
FROM gcr.io/distroless/java21-debian12
# サイズ: ~220MB / シェルなし / デバッグが困難
COPY --from=build /app/target/app.jar /app/app.jar
ENTRYPOINT ["java", "-jar", "/app/app.jar"]

# 4. distroless debug（デバッグ用 - busybox付き）
FROM gcr.io/distroless/java21-debian12:debug
# 本番では使わない

# Dockerfile での .dockerignore 設定も重要
# .dockerignore ファイル:
# .git
# .gitignore
# *.md
# target/
# build/
# .idea/
# .vscode/
# *.iml
# .env
# docker-compose*.yml

# セキュリティスキャン
# $ docker scout cves myapp:latest
# $ trivy image myapp:latest`,
      },
      {
        title: "Dockerfileのベストプラクティス",
        content:
          "効率的でセキュアなDockerfileを書くためのベストプラクティスをまとめます。レイヤーの最小化、キャッシュの活用、非rootユーザーでの実行、ヘルスチェックの設定、適切なラベルの付与が重要です。また、.dockerignoreファイルでビルドコンテキストから不要なファイルを除外し、ビルド速度とセキュリティを向上させましょう。",
        code: `# ベストプラクティスを全て適用した Dockerfile
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# 依存関係の解決（変更頻度低 → キャッシュ活用）
COPY pom.xml mvnw ./
COPY .mvn .mvn
RUN chmod +x mvnw && \\
    ./mvnw dependency:go-offline -B

# ソースコードのビルド（変更頻度高）
COPY src ./src
RUN ./mvnw package -DskipTests -B && \\
    # Layered JAR を展開
    java -Djarmode=layertools -jar target/*.jar extract --destination extracted

# 実行ステージ
FROM eclipse-temurin:21-jre-alpine

# セキュリティ: 非rootユーザー
RUN addgroup -S spring && adduser -S spring -G spring

# メタデータ
LABEL org.opencontainers.image.title="My Java App" \\
      org.opencontainers.image.version="1.0.0" \\
      org.opencontainers.image.vendor="Example Inc."

WORKDIR /app

# Layered JAR: 変更頻度順にコピー（キャッシュ最適化）
COPY --from=build /app/extracted/dependencies/ ./
COPY --from=build /app/extracted/spring-boot-loader/ ./
COPY --from=build /app/extracted/snapshot-dependencies/ ./
COPY --from=build /app/extracted/application/ ./

USER spring

EXPOSE 8080

# ヘルスチェック
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \\
  CMD wget --no-verbose --tries=1 --spider http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java", \\
  "-XX:MaxRAMPercentage=75.0", \\
  "-XX:+UseG1GC", \\
  "-Djava.security.egd=file:/dev/./urandom", \\
  "org.springframework.boot.loader.launch.JarLauncher"]`,
      },
    ],
  },
  {
    id: "jvm-container",
    title: "コンテナ内JVM設定",
    category: "java-container",
    description:
      "コンテナ環境でのJVMチューニング、MaxRAMPercentage、cgroup制限、メモリ設定のベストプラクティスを学ぶ",
    sections: [
      {
        title: "コンテナ環境のJVM課題",
        content:
          "コンテナ内でJVMを実行する場合、特有の課題があります。古いJVM（Java 8u131以前）はcgroup制限を認識せず、ホストの物理メモリ全体を見てヒープを計算してしまいます。Java 10以降はコンテナを認識しますが、適切な設定が重要です。コンテナのメモリ制限とJVMのヒープ設定の不一致は、OOMKillerによる突然のコンテナ終了を引き起こします。",
        code: `# コンテナのメモリ制限とJVMの関係

# コンテナに512MBのメモリ制限を設定
$ docker run -m 512m eclipse-temurin:21-jdk java -XX:+PrintFlagsFinal \\
    -version 2>&1 | grep -i "maxheapsize\\|maxram"
# MaxHeapSize = 134217728 (128MB) ← デフォルトでは RAM の 1/4

# JVMメモリの内訳（512MBコンテナの場合）
# ┌──────────────────────────────────┐
# │ コンテナメモリ制限: 512MB         │
# ├──────────────────────────────────┤
# │ Javaヒープ        : ~384MB (75%)│  ← MaxRAMPercentage で制御
# │ Metaspace         : ~50MB       │
# │ スレッドスタック    : ~20MB       │  ← 各スレッド 1MB × 20
# │ ネイティブメモリ   : ~30MB       │
# │ コードキャッシュ   : ~20MB       │
# │ OS + その他        : ~8MB        │
# └──────────────────────────────────┘

# cgroup制限の確認（コンテナ内）
$ docker exec myapp cat /sys/fs/cgroup/memory.max
# 536870912 (512MB)

# JVMのコンテナ認識を確認
$ docker run -m 512m eclipse-temurin:21-jdk java \\
    -XshowSettings:system -version 2>&1
# Operating System Metrics:
#   Provider: cgroupv2
#   Memory Limit: 536870912 (512MB)`,
      },
      {
        title: "-XX:MaxRAMPercentage",
        content:
          "MaxRAMPercentageは、コンテナのメモリ制限に対するJavaヒープの割合を指定するオプションです。デフォルトは25%と保守的な値のため、通常は75%程度に設定します。固定値の-Xmxではなく割合指定を使うことで、コンテナのメモリ制限を変更した際にJVM設定を変更する必要がなくなります。",
        code: `# MaxRAMPercentage の使い方

# 非推奨: 固定値指定（コンテナのメモリ制限と二重管理になる）
$ docker run -m 512m myapp java -Xmx384m -jar app.jar

# 推奨: 割合指定
$ docker run -m 512m myapp java \\
    -XX:MaxRAMPercentage=75.0 \\
    -jar app.jar
# → ヒープ最大値 = 512MB × 75% = 384MB

# Dockerfile での設定例
ENTRYPOINT ["java", \\
    "-XX:MaxRAMPercentage=75.0", \\
    "-XX:InitialRAMPercentage=50.0", \\
    "-XX:MinRAMPercentage=50.0", \\
    "-jar", "app.jar"]

# 各パラメータの意味:
# -XX:MaxRAMPercentage=75.0    最大ヒープ（RAMの75%）
# -XX:InitialRAMPercentage=50.0 初期ヒープ（RAMの50%）
# -XX:MinRAMPercentage=50.0    小メモリ環境での最大ヒープ割合

# 環境変数で柔軟に設定する方法
ENV JAVA_OPTS="-XX:MaxRAMPercentage=75.0"
ENTRYPOINT ["sh", "-c", "java \${JAVA_OPTS} -jar app.jar"]

# Spring Boot の場合
$ docker run -m 512m \\
    -e JAVA_TOOL_OPTIONS="-XX:MaxRAMPercentage=75.0" \\
    myapp:latest
# JAVA_TOOL_OPTIONS は JVM が自動的に読み取る`,
      },
      {
        title: "cgroup制限の理解",
        content:
          "Dockerコンテナのリソース制限はLinuxのcgroupで実現されています。メモリ制限（-m）を超えるとOOMKillerがコンテナを強制終了します。CPU制限（--cpus）はJVMのスレッドプール設定に影響します。JVMはRuntime.getRuntime().availableProcessors()でcgroup制限を認識するため、CPUベースのスレッドプール設定が正しく動作します。",
        code: `# メモリ制限
$ docker run -m 512m myapp:latest              # ハード制限 512MB
$ docker run -m 512m --memory-swap 512m myapp  # スワップ無効

# CPU制限
$ docker run --cpus=2.0 myapp:latest           # CPU 2コア分
$ docker run --cpu-shares=512 myapp:latest     # 相対的なCPU配分

# JVMでのCPU認識確認
$ docker run --cpus=2.0 eclipse-temurin:21-jdk java -XshowSettings:system -version
# Available processors: 2

// Java コードでの確認
public class ContainerResources {
    public static void main(String[] args) {
        Runtime runtime = Runtime.getRuntime();

        // cgroup制限を認識したプロセッサ数
        int cpus = runtime.availableProcessors();
        System.out.println("Available CPUs: " + cpus);

        // メモリ情報
        long maxMemory = runtime.maxMemory();
        long totalMemory = runtime.totalMemory();
        long freeMemory = runtime.freeMemory();

        System.out.println("Max Memory: " + maxMemory / 1024 / 1024 + "MB");
        System.out.println("Total Memory: " + totalMemory / 1024 / 1024 + "MB");
        System.out.println("Free Memory: " + freeMemory / 1024 / 1024 + "MB");

        // スレッドプールサイズはCPU数に基づいて設定
        int poolSize = cpus * 2;
        System.out.println("Recommended thread pool size: " + poolSize);
    }
}`,
      },
      {
        title: "メモリ設定のベストプラクティス",
        content:
          "コンテナ環境でのJVMメモリ設定には、いくつかのベストプラクティスがあります。ヒープはコンテナメモリの75%以下に抑え、ネイティブメモリ用の余裕を確保します。GCアルゴリズムはコンテナ環境ではG1GCまたはZGCが推奨です。メモリ不足時のヒープダンプ自動生成、GCログの出力設定も本番運用では必須です。",
        code: `# 本番用コンテナ起動コマンド
$ docker run -m 1g \\
    -e JAVA_TOOL_OPTIONS=" \\
    -XX:MaxRAMPercentage=75.0 \\
    -XX:InitialRAMPercentage=75.0 \\
    -XX:+UseG1GC \\
    -XX:MaxGCPauseMillis=200 \\
    -XX:+HeapDumpOnOutOfMemoryError \\
    -XX:HeapDumpPath=/app/logs/heapdump.hprof \\
    -XX:+ExitOnOutOfMemoryError \\
    -Xlog:gc*:file=/app/logs/gc.log:time,level,tags:filecount=5,filesize=10m \\
    " myapp:latest

# Dockerfile でのベストプラクティス設定
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app
RUN mkdir -p /app/logs

COPY --from=build /app/target/app.jar app.jar

# 環境変数でJVMオプションを管理（上書き可能に）
ENV JAVA_HEAP_OPTS="-XX:MaxRAMPercentage=75.0 -XX:InitialRAMPercentage=75.0"
ENV JAVA_GC_OPTS="-XX:+UseG1GC -XX:MaxGCPauseMillis=200"
ENV JAVA_DIAG_OPTS="-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/app/logs/ -XX:+ExitOnOutOfMemoryError"
ENV JAVA_LOG_OPTS="-Xlog:gc*:file=/app/logs/gc.log:time,level,tags:filecount=5,filesize=10m"
ENV JAVA_EXTRA_OPTS=""

ENTRYPOINT ["sh", "-c", \\
  "java \${JAVA_HEAP_OPTS} \${JAVA_GC_OPTS} \${JAVA_DIAG_OPTS} \${JAVA_LOG_OPTS} \${JAVA_EXTRA_OPTS} -jar app.jar"]

# メモリ設定目安:
# コンテナ 256MB → ヒープ 192MB（小規模/マイクロサービス）
# コンテナ 512MB → ヒープ 384MB（標準的なAPI）
# コンテナ  1GB  → ヒープ 768MB（中規模アプリ）
# コンテナ  2GB  → ヒープ 1.5GB（大規模アプリ）`,
      },
      {
        title: "コンテナ環境のGCチューニング",
        content:
          "コンテナ環境ではGC（ガベージコレクション）の選択とチューニングが特に重要です。メモリが限られるため、GCの効率が直接パフォーマンスに影響します。Java 21ではG1GCがデフォルトで、ほとんどのケースで適切です。低レイテンシが必要な場合はZGC、ヒープが小さい場合はSerial GCも選択肢になります。",
        code: `# GCアルゴリズムの選択ガイド

# G1GC（デフォルト・推奨）
# ヒープ 256MB〜数GB、バランスの取れたパフォーマンス
$ docker run -m 1g myapp java \\
    -XX:+UseG1GC \\
    -XX:MaxGCPauseMillis=200 \\
    -XX:MaxRAMPercentage=75.0 \\
    -jar app.jar

# ZGC（低レイテンシ向け）
# 1ms以下のGCポーズ、ただしメモリオーバーヘッドが大きい
$ docker run -m 2g myapp java \\
    -XX:+UseZGC \\
    -XX:+ZGenerational \\
    -XX:MaxRAMPercentage=70.0 \\
    -jar app.jar

# Serial GC（小メモリ向け）
# ヒープ 100MB以下のマイクロサービス
$ docker run -m 256m myapp java \\
    -XX:+UseSerialGC \\
    -XX:MaxRAMPercentage=75.0 \\
    -jar app.jar

# GCログの解析
# compose.yaml での設定
services:
  app:
    image: myapp:latest
    deploy:
      resources:
        limits:
          memory: 1g
          cpus: "2.0"
        reservations:
          memory: 512m
          cpus: "1.0"
    environment:
      JAVA_TOOL_OPTIONS: >
        -XX:+UseG1GC
        -XX:MaxRAMPercentage=75.0
        -Xlog:gc*:file=/app/logs/gc.log:time,level,tags
    volumes:
      - ./logs:/app/logs`,
      },
    ],
  },
  {
    id: "spring-boot-docker",
    title: "Spring Boot Docker化",
    category: "java-container",
    description:
      "Spring BootアプリケーションのDocker化、Buildpacks、Jib、layered JAR、起動時間最適化を学ぶ",
    sections: [
      {
        title: "Spring Boot のDocker化",
        content:
          "Spring BootはDockerとの親和性が高く、複数のコンテナ化手法を提供しています。Dockerfileによる従来のビルド、Cloud Native Buildpacksによる自動ビルド、Google Jibによるデーモンレスビルドの3つが主流です。それぞれにメリット・デメリットがあり、プロジェクトの要件に応じて選択します。",
        code: `// build.gradle.kts - Spring Boot Docker 関連設定
plugins {
    id("org.springframework.boot") version "3.3.0"
    id("io.spring.dependency-management") version "1.1.5"
    id("com.google.cloud.tools.jib") version "3.4.1"
}

// Spring Boot の場合、3つの主要なDocker化手法がある

// 1. Dockerfile（最もカスタマイズ可能）
//    → docker build -t myapp .

// 2. Buildpacks（Dockerfile不要）
//    → ./gradlew bootBuildImage

// 3. Jib（Dockerデーモン不要）
//    → ./gradlew jibDockerBuild

// application.yml - Docker環境用の設定
// spring:
//   profiles:
//     active: \${SPRING_PROFILES_ACTIVE:default}
//   datasource:
//     url: \${SPRING_DATASOURCE_URL:jdbc:h2:mem:testdb}
//     username: \${SPRING_DATASOURCE_USERNAME:sa}
//     password: \${SPRING_DATASOURCE_PASSWORD:}
// server:
//   port: \${SERVER_PORT:8080}
// management:
//   endpoints:
//     web:
//       exposure:
//         include: health,info,metrics`,
      },
      {
        title: "Cloud Native Buildpacks",
        content:
          "BuildpacksはDockerfileを書かずにコンテナイメージを生成できるツールです。Spring BootはGradle/Mavenプラグインを通じてBuildpacksをサポートしています。Paketo Buildpacksが内部で使われ、最適なJDK/JREの選択、レイヤー構成、セキュリティ設定を自動的に行います。カスタマイズも可能で、メモリ計算やベースイメージの変更ができます。",
        code: `# Gradle で Buildpacks を使う
$ ./gradlew bootBuildImage

# カスタマイズした設定（build.gradle.kts）
tasks.named<org.springframework.boot.gradle.tasks.bundling.BootBuildImage>(
    "bootBuildImage"
) {
    imageName.set("ghcr.io/myuser/myapp:\${project.version}")

    // ベースイメージの指定
    builder.set("paketobuildpacks/builder-jammy-base:latest")

    // 環境変数でBuildpackの動作を制御
    environment.set(mapOf(
        "BP_JVM_VERSION" to "21",
        "BP_JVM_TYPE" to "JRE",
        "BPE_JAVA_TOOL_OPTIONS" to "-XX:MaxRAMPercentage=75.0",
        "BPE_SPRING_PROFILES_ACTIVE" to "prod"
    ))

    // Docker レジストリへの公開設定
    publish.set(true)
    docker {
        publishRegistry {
            username.set(System.getenv("DOCKER_USERNAME"))
            password.set(System.getenv("DOCKER_PASSWORD"))
            url.set("https://ghcr.io")
        }
    }
}

# Maven で Buildpacks を使う
$ ./mvnw spring-boot:build-image \\
    -Dspring-boot.build-image.imageName=myapp:latest

# Buildpacks のメリット:
# - Dockerfile 不要
# - セキュリティパッチの自動適用（rebase）
# - 最適なレイヤー構成
# - メモリ計算の自動化（JVM Memory Calculator）`,
      },
      {
        title: "Google Jib",
        content:
          "Jibは、Googleが開発したJavaアプリケーション向けのコンテナビルドツールです。Dockerデーモンが不要で、Mavenビルドの一部としてイメージを直接レジストリにプッシュできます。ビルドが高速で再現性が高く、CI/CD環境での利用に特に適しています。アプリケーションをレイヤーに分割し、変更された部分のみ再ビルドします。",
        code: `// build.gradle.kts - Jib 設定
plugins {
    id("com.google.cloud.tools.jib") version "3.4.1"
}

jib {
    from {
        image = "eclipse-temurin:21-jre-alpine"
        platforms {
            platform {
                architecture = "amd64"
                os = "linux"
            }
            platform {
                architecture = "arm64"
                os = "linux"
            }
        }
    }
    to {
        image = "ghcr.io/myuser/myapp"
        tags = setOf("latest", project.version.toString())
        auth {
            username = System.getenv("DOCKER_USERNAME")
            password = System.getenv("DOCKER_PASSWORD")
        }
    }
    container {
        jvmFlags = listOf(
            "-XX:MaxRAMPercentage=75.0",
            "-XX:+UseG1GC",
            "-XX:+HeapDumpOnOutOfMemoryError"
        )
        ports = listOf("8080")
        environment = mapOf(
            "SPRING_PROFILES_ACTIVE" to "prod"
        )
        user = "1000:1000"
        creationTime.set("USE_CURRENT_TIMESTAMP")
    }
}

// ビルドコマンド
// $ ./gradlew jib           # 直接レジストリにプッシュ
// $ ./gradlew jibDockerBuild # ローカルDockerに保存
// $ ./gradlew jibBuildTar   # tar ファイルとして出力

// Jib のメリット:
// - Dockerデーモン不要（CI/CDで便利）
// - 高速な増分ビルド
// - マルチアーキテクチャ対応
// - 再現可能なビルド`,
      },
      {
        title: "Layered JAR",
        content:
          "Spring Boot 3のlayered JARは、JARファイルをdependencies、spring-boot-loader、snapshot-dependencies、applicationの4層に分割します。Dockerのレイヤーキャッシュと組み合わせることで、ソースコード変更時に再ビルドが必要なレイヤーをapplicationだけに限定でき、ビルドとプッシュが大幅に高速化されます。",
        code: `# Layered JAR の展開と確認
$ java -Djarmode=layertools -jar app.jar list
dependencies
spring-boot-loader
snapshot-dependencies
application

$ java -Djarmode=layertools -jar app.jar extract --destination extracted
$ ls extracted/
dependencies/  spring-boot-loader/  snapshot-dependencies/  application/

# Layered JAR 用 Dockerfile
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
COPY . .
RUN ./gradlew bootJar --no-daemon

# レイヤー展開ステージ
FROM eclipse-temurin:21-jdk-alpine AS extract
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
RUN java -Djarmode=layertools -jar app.jar extract --destination extracted

# 実行ステージ
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

RUN addgroup -S spring && adduser -S spring -G spring
USER spring

# 変更頻度の低い順にコピー（キャッシュ最適化）
COPY --from=extract /app/extracted/dependencies/ ./
COPY --from=extract /app/extracted/spring-boot-loader/ ./
COPY --from=extract /app/extracted/snapshot-dependencies/ ./
COPY --from=extract /app/extracted/application/ ./

EXPOSE 8080
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75.0", \\
  "org.springframework.boot.loader.launch.JarLauncher"]

# レイヤーサイズの比較（変更時の再ビルド量）:
# dependencies         ~80MB  → ほぼ変更なし（キャッシュ）
# spring-boot-loader    ~0.3MB → 変更なし（キャッシュ）
# snapshot-dependencies ~5MB   → まれに変更
# application           ~2MB   → 毎回変更 ← ここだけ再ビルド！`,
      },
      {
        title: "起動時間の最適化",
        content:
          "コンテナ環境ではアプリケーションの起動時間が重要です。Kubernetesのスケーリングやローリングアップデートで新しいPodが素早く起動する必要があるためです。Spring Boot 3ではAOTコンパイル、GraalVM Native Image、クラスデータシェアリング（CDS）、仮想スレッドなどの技術で起動時間を大幅に短縮できます。",
        code: `# 1. GraalVM Native Image（最速の起動）
# build.gradle.kts
plugins {
    id("org.graalvm.buildtools.native") version "0.10.1"
}

# ネイティブイメージのビルド
$ ./gradlew nativeCompile

# Native Image 用 Dockerfile
FROM ghcr.io/graalvm/native-image:21 AS build
WORKDIR /app
COPY . .
RUN ./gradlew nativeCompile --no-daemon

FROM debian:bookworm-slim
COPY --from=build /app/build/native/nativeCompile/myapp /app/myapp
EXPOSE 8080
ENTRYPOINT ["/app/myapp"]
# 起動時間: ~0.1秒（通常のJARは3-10秒）
# イメージサイズ: ~80MB

# 2. Spring AOT（Ahead-of-Time コンパイル）
$ ./gradlew processAot
$ java -Dspring.aot.enabled=true -jar app.jar
# 起動時間: 約30%短縮

# 3. クラスデータシェアリング（CDS）
FROM eclipse-temurin:21-jre-alpine AS cds
WORKDIR /app
COPY --from=build /app/target/app.jar app.jar
# CDSアーカイブの作成
RUN java -XX:ArchiveClassesAtExit=app-cds.jsa -Dspring.context.exit=onRefresh -jar app.jar
# CDSアーカイブを使って起動（約20%高速化）
ENTRYPOINT ["java", "-XX:SharedArchiveFile=app-cds.jsa", "-jar", "app.jar"]

# 4. 起動時間の比較
# 手法                 起動時間    イメージサイズ
# 通常の JAR            ~5秒      ~270MB
# Layered JAR          ~5秒      ~270MB（ビルドが速い）
# AOT                  ~3.5秒    ~270MB
# CDS                  ~4秒      ~300MB
# Native Image         ~0.1秒    ~80MB`,
      },
    ],
  },
  {
    id: "docker-debug",
    title: "コンテナ内デバッグ",
    category: "java-container",
    description:
      "コンテナ内でのJavaアプリケーションのデバッグ手法、ログ確認、ヘルスチェック、リモートデバッグを学ぶ",
    sections: [
      {
        title: "コンテナ内デバッグの基本",
        content:
          "コンテナ内のJavaアプリケーションをデバッグするには、docker execでコンテナに入る、docker logsでログを確認する、docker inspectでコンテナ情報を取得する、といった方法があります。distrolessイメージではシェルがないため、debugタグのイメージを使うか、ephemeralコンテナ（kubectl debug）を活用します。",
        code: `# コンテナにシェルで入る
$ docker exec -it myapp bash
$ docker exec -it myapp sh    # Alpine の場合

# コンテナ内でJavaプロセスの確認
$ docker exec myapp jps -lv
1 /app/app.jar -XX:MaxRAMPercentage=75.0

# コンテナ内のファイル確認
$ docker exec myapp ls -la /app/
$ docker exec myapp cat /app/config/application.yml

# コンテナの詳細情報
$ docker inspect myapp
$ docker inspect --format='{{.State.Status}}' myapp
$ docker inspect --format='{{.NetworkSettings.IPAddress}}' myapp
$ docker inspect --format='{{json .Config.Env}}' myapp | jq

# コンテナのリソース使用状況
$ docker stats myapp --no-stream
CONTAINER   CPU %   MEM USAGE / LIMIT   NET I/O       BLOCK I/O
myapp       2.3%    384MiB / 512MiB     1.2MB / 800kB 0B / 4.1MB

# コンテナ内のプロセス一覧
$ docker top myapp
PID   USER   COMMAND
1     spring java -XX:MaxRAMPercentage=75.0 -jar app.jar

# コンテナのファイルシステム差分
$ docker diff myapp
C /app/logs
A /app/logs/app.log
A /app/logs/gc.log`,
      },
      {
        title: "ログの確認と管理",
        content:
          "コンテナのログは標準出力（stdout）と標準エラー出力（stderr）に出力するのがベストプラクティスです。Docker はこれらを自動的に収集し、docker logsコマンドで確認できます。Spring Bootの場合、ConsoleAppenderでログを標準出力に出力し、ファイルへの出力はボリュームマウントで行います。本番ではFluentd/Fluent Bitなどのログ収集ツールと組み合わせます。",
        code: `# ログの確認
$ docker logs myapp                    # 全ログ
$ docker logs -f myapp                 # リアルタイムフォロー
$ docker logs --tail 100 myapp         # 最新100行
$ docker logs --since 1h myapp         # 直近1時間
$ docker logs --since 2024-01-01 myapp # 指定日時以降
$ docker logs -f --tail 0 myapp        # 新しいログのみフォロー

# Spring Boot のログ設定（logback-spring.xml）
# <configuration>
#   <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
#     <encoder>
#       <!-- JSON形式でログ出力（ログ収集ツールとの連携に便利） -->
#       <pattern>{"time":"%d","level":"%level","logger":"%logger",
#         "msg":"%msg","thread":"%thread"}%n</pattern>
#     </encoder>
#   </appender>
#   <root level="INFO">
#     <appender-ref ref="STDOUT" />
#   </root>
# </configuration>

# Docker Compose でのログ設定
services:
  app:
    image: myapp:latest
    logging:
      driver: "json-file"
      options:
        max-size: "10m"    # ログファイルの最大サイズ
        max-file: "5"      # ローテーション数
        tag: "myapp"

# Fluentd でのログ収集
  app:
    logging:
      driver: "fluentd"
      options:
        fluentd-address: "localhost:24224"
        tag: "myapp.{{.Name}}"

# Docker Compose で全サービスのログを確認
$ docker compose logs -f
$ docker compose logs -f app db  # 特定サービスのみ`,
      },
      {
        title: "ヘルスチェック",
        content:
          "ヘルスチェックはコンテナ内のアプリケーションが正常に動作しているかを定期的に確認する仕組みです。Dockerfileにヘルスチェックを定義すると、Docker/Kubernetes がアプリケーションの状態を把握し、異常時にコンテナの再起動やトラフィックの遮断を行えます。Spring Boot Actuatorの/actuator/healthエンドポイントを活用するのが一般的です。",
        code: `// Spring Boot Actuator のヘルスチェック設定
// build.gradle.kts
dependencies {
    implementation("org.springframework.boot:spring-boot-starter-actuator")
}

// application.yml
// management:
//   endpoints:
//     web:
//       exposure:
//         include: health,info,metrics
//   endpoint:
//     health:
//       show-details: always
//       probes:
//         enabled: true  # liveness / readiness プローブ有効化
//   health:
//     db:
//       enabled: true
//     redis:
//       enabled: true

// カスタムヘルスインジケーター
@Component
public class ExternalApiHealthIndicator implements HealthIndicator {

    private final RestClient restClient;

    public ExternalApiHealthIndicator(RestClient.Builder builder) {
        this.restClient = builder.baseUrl("https://api.example.com").build();
    }

    @Override
    public Health health() {
        try {
            restClient.get().uri("/health").retrieve().body(String.class);
            return Health.up()
                .withDetail("api", "reachable")
                .build();
        } catch (Exception e) {
            return Health.down()
                .withDetail("api", "unreachable")
                .withException(e)
                .build();
        }
    }
}

// Dockerfile でのヘルスチェック
// HEALTHCHECK --interval=30s --timeout=3s --retries=3 --start-period=40s \
//   CMD wget -qO- http://localhost:8080/actuator/health || exit 1`,
      },
      {
        title: "リモートデバッグ",
        content:
          "JVMのリモートデバッグ機能を使えば、IDE（IntelliJ IDEA等）からコンテナ内のアプリケーションにアタッチしてブレークポイントデバッグができます。JDWPプロトコルを使い、コンテナのデバッグポートを公開します。開発環境でのみ使用し、本番環境では絶対にデバッグポートを公開しないでください。",
        code: `# リモートデバッグ用の JVM オプション
# Java 9+
# -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005

# Docker でデバッグポートを公開
$ docker run -d \\
    --name myapp-debug \\
    -p 8080:8080 \\
    -p 5005:5005 \\
    -e JAVA_TOOL_OPTIONS="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005" \\
    myapp:latest

# Docker Compose でのデバッグ設定
services:
  app:
    build: .
    ports:
      - "8080:8080"
      - "5005:5005"     # デバッグポート
    environment:
      JAVA_TOOL_OPTIONS: >
        -agentlib:jdwp=transport=dt_socket,
        server=y,suspend=n,address=*:5005

# IntelliJ IDEA での設定:
# 1. Run → Edit Configurations
# 2. + → Remote JVM Debug
# 3. Host: localhost, Port: 5005
# 4. Use module classpath: myapp
# 5. デバッグ実行 → ブレークポイントで停止

# JVM のスレッドダンプ取得（問題診断）
$ docker exec myapp jstack 1 > threaddump.txt

# ヒープダンプ取得
$ docker exec myapp jmap -dump:format=b,file=/tmp/heap.hprof 1
$ docker cp myapp:/tmp/heap.hprof ./heap.hprof

# JFR（Java Flight Recorder）
$ docker exec myapp jcmd 1 JFR.start duration=60s filename=/tmp/recording.jfr
$ docker cp myapp:/tmp/recording.jfr ./recording.jfr`,
      },
      {
        title: "トラブルシューティング",
        content:
          "コンテナ環境で発生しやすい問題とその診断方法をまとめます。OOMKiller、起動失敗、ネットワーク接続エラー、パーミッションエラーなど、よくある問題の原因と解決策を理解しておくことで、本番障害に迅速に対応できます。",
        code: `# 1. OOMKiller - コンテナが突然停止する
$ docker inspect myapp --format='{{.State.OOMKilled}}'
# true → メモリ不足でKillされた
# 対策: メモリ制限の引き上げ or JVMヒープの削減

# 2. コンテナの終了コードを確認
$ docker inspect myapp --format='{{.State.ExitCode}}'
# 0: 正常終了
# 1: アプリケーションエラー
# 137: SIGKILL (OOMKiller or docker kill)
# 143: SIGTERM (docker stop)

# 3. 起動に失敗する場合
$ docker logs myapp 2>&1 | head -50
# ClassNotFoundException → 依存関係の不足
# BindException → ポートが既に使用中
# ConnectionRefused → DBが未起動

# 4. ネットワーク接続のデバッグ
$ docker exec myapp ping db             # 名前解決の確認
$ docker exec myapp wget -qO- http://db:5432  # 接続確認
$ docker network inspect myapp_default  # ネットワーク設定確認

# 5. パーミッションエラー
$ docker exec myapp ls -la /app/logs/
# 対策: Dockerfile で適切な権限設定
# RUN chown -R spring:spring /app/logs

# 6. コンテナ内の環境変数確認
$ docker exec myapp env | sort
$ docker exec myapp java -XshowSettings:all -version 2>&1

# 7. ディスク容量不足
$ docker system df
$ docker system prune -a --volumes

# 8. イメージの脆弱性確認
$ docker scout cves myapp:latest
$ trivy image --severity HIGH,CRITICAL myapp:latest`,
      },
    ],
  },

  // ===== 運用・CI/CD =====
  {
    id: "docker-ci-cd",
    title: "Docker CI/CD",
    category: "operations",
    description:
      "GitHub ActionsでのDocker CI/CDパイプライン構築、イメージの自動ビルド・プッシュ、脆弱性スキャンを学ぶ",
    sections: [
      {
        title: "GitHub ActionsでのDocker CI",
        content:
          "GitHub Actionsを使ってDockerイメージのビルド・テスト・プッシュを自動化できます。docker/build-push-actionを使えば、マルチプラットフォームビルド、レイヤーキャッシュ、レジストリへの自動プッシュが簡単に設定できます。PRごとにイメージをビルドしてテストし、mainブランチへのマージ時に本番イメージをプッシュするのが一般的なワークフローです。",
        code: `# .github/workflows/docker-ci.yml
name: Docker CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up JDK 21
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'

      - name: Run tests
        run: ./gradlew test

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to Container Registry
        if: github.event_name != 'pull_request'
        uses: docker/login-action@v3
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Extract metadata
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}
          tags: |
            type=sha
            type=ref,event=branch
            type=semver,pattern={{version}}

      - name: Build and push
        uses: docker/build-push-action@v5
        with:
          context: .
          push: \${{ github.event_name != 'pull_request' }}
          tags: \${{ steps.meta.outputs.tags }}
          labels: \${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max`,
      },
      {
        title: "イメージの自動ビルド・プッシュ",
        content:
          "本番用のDocker CIパイプラインでは、マルチプラットフォーム対応（amd64/arm64）、セマンティックバージョニングによるタグ付け、ビルドキャッシュの活用が重要です。GitHub Container Registry（ghcr.io）を使うと、GitHubのパーミッションモデルと統合でき、プライベートイメージの管理も容易です。",
        code: `# マルチプラットフォーム対応のCI設定
# .github/workflows/release.yml
name: Release

on:
  push:
    tags: ['v*']

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - uses: actions/checkout@v4

      - name: Set up QEMU (マルチプラットフォーム用)
        uses: docker/setup-qemu-action@v3

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Log in to ghcr.io
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: Extract version from tag
        id: version
        run: echo "VERSION=\${GITHUB_REF#refs/tags/v}" >> \$GITHUB_OUTPUT

      - name: Build and push multi-platform
        uses: docker/build-push-action@v5
        with:
          context: .
          platforms: linux/amd64,linux/arm64
          push: true
          tags: |
            ghcr.io/\${{ github.repository }}:latest
            ghcr.io/\${{ github.repository }}:\${{ steps.version.outputs.VERSION }}
          cache-from: type=gha
          cache-to: type=gha,mode=max
          build-args: |
            APP_VERSION=\${{ steps.version.outputs.VERSION }}

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          generate_release_notes: true`,
      },
      {
        title: "脆弱性スキャン",
        content:
          "コンテナイメージには、ベースイメージのOSパッケージやアプリケーションの依存ライブラリに脆弱性が含まれている可能性があります。CI/CDパイプラインに脆弱性スキャンを組み込み、重大な脆弱性がある場合はデプロイをブロックすることが重要です。Trivy、Snyk、Docker Scoutなどのツールが利用できます。",
        code: `# GitHub Actions での Trivy スキャン
- name: Run Trivy vulnerability scanner
  uses: aquasecurity/trivy-action@master
  with:
    image-ref: ghcr.io/myuser/myapp:latest
    format: 'sarif'
    output: 'trivy-results.sarif'
    severity: 'CRITICAL,HIGH'
    exit-code: '1'  # 脆弱性発見時にジョブ失敗

- name: Upload Trivy scan results
  uses: github/codeql-action/upload-sarif@v3
  if: always()
  with:
    sarif_file: 'trivy-results.sarif'

# ローカルでの Trivy 実行
$ trivy image myapp:latest
$ trivy image --severity HIGH,CRITICAL myapp:latest
$ trivy image --format json -o results.json myapp:latest

# Docker Scout（Docker Desktop統合）
$ docker scout cves myapp:latest
$ docker scout recommendations myapp:latest

# 脆弱性を含む依存関係のスキャン
$ trivy fs --scanners vuln,secret,misconfig .

# Snyk でのスキャン
$ snyk container test myapp:latest
$ snyk container monitor myapp:latest  # 継続監視

# CI で全てをまとめた例
jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - name: Build image
        run: docker build -t myapp:test .

      - name: Trivy image scan
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'myapp:test'
          severity: 'CRITICAL,HIGH'
          exit-code: '1'

      - name: Trivy config scan (Dockerfile)
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'config'
          scan-ref: '.'
          severity: 'CRITICAL,HIGH'`,
      },
      {
        title: "Trivyによるセキュリティスキャン詳細",
        content:
          "Trivyはオープンソースの総合的なセキュリティスキャナーで、コンテナイメージ、ファイルシステム、Gitリポジトリ、IaCファイルの脆弱性を検出できます。Java/Mavenプロジェクトでは、pom.xmlやbuild.gradleの依存関係も自動的にスキャンされます。.trivyignoreファイルで誤検知を抑制することも可能です。",
        code: `# Trivy の包括的なスキャン

# コンテナイメージのスキャン
$ trivy image --severity CRITICAL,HIGH myapp:latest

# 出力例:
# myapp:latest (debian 12.4)
# =============================================
# Library    Vulnerability  Severity  Status   Version
# libssl3    CVE-2024-xxxx  HIGH      fixed    3.0.11-1
# libcurl4   CVE-2024-yyyy  CRITICAL  fixed    7.88.1-10
#
# Java (jar)
# =============================================
# Library              Vulnerability  Severity  Version
# jackson-databind     CVE-2024-zzzz  HIGH      2.15.0
# spring-web           CVE-2024-aaaa  CRITICAL  6.1.0

# Dockerfile のベストプラクティス違反チェック
$ trivy config Dockerfile
# CRITICAL: Running as root (DS002)
# HIGH: No HEALTHCHECK defined (DS004)

# .trivyignore で誤検知を抑制
# CVE-2024-xxxx  # 影響なし: 該当機能を使用していない
# CVE-2024-yyyy  # 受容済み: 次回アップデートで対応予定

# SBOM（Software Bill of Materials）の生成
$ trivy image --format spdx-json -o sbom.json myapp:latest

# CI/CD 統合のベストプラクティス
# 1. PR時: CRITICAL のみブロック
# 2. main マージ時: HIGH + CRITICAL をレポート
# 3. 定期スキャン: 既存イメージの継続的な監視
# 4. SBOM生成: ライセンス・依存関係の可視化`,
      },
      {
        title: "Docker CI/CDのベストプラクティス",
        content:
          "効果的なDocker CI/CDパイプラインのベストプラクティスをまとめます。ビルドキャッシュの活用、イメージの署名、環境ごとの設定分離、ロールバック戦略、Blue-Green/Canaryデプロイメントなど、本番運用に必要な要素を総合的に理解しましょう。",
        code: `# 本番用 CI/CD パイプライン全体像
# .github/workflows/production.yml
name: Production Pipeline

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
          cache: 'gradle'
      - run: ./gradlew test

  build-and-push:
    needs: test
    runs-on: ubuntu-latest
    outputs:
      image-tag: \${{ steps.meta.outputs.tags }}
    steps:
      - uses: actions/checkout@v4
      - uses: docker/setup-buildx-action@v3
      - uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}
      - id: meta
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/\${{ github.repository }}
          tags: type=sha,prefix=
      - uses: docker/build-push-action@v5
        with:
          push: true
          tags: \${{ steps.meta.outputs.tags }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

  security-scan:
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - uses: aquasecurity/trivy-action@master
        with:
          image-ref: \${{ needs.build-and-push.outputs.image-tag }}
          severity: 'CRITICAL'
          exit-code: '1'

  deploy:
    needs: [build-and-push, security-scan]
    runs-on: ubuntu-latest
    environment: production  # 手動承認ゲート
    steps:
      - name: Deploy to Kubernetes
        run: |
          kubectl set image deployment/myapp \\
            myapp=\${{ needs.build-and-push.outputs.image-tag }}
          kubectl rollout status deployment/myapp --timeout=300s`,
      },
    ],
  },
  {
    id: "kubernetes-intro",
    title: "Kubernetes入門",
    category: "operations",
    description:
      "Kubernetesの基本概念（Pod/Service/Deployment）、JavaアプリのK8sデプロイ、Helmチャートを学ぶ",
    sections: [
      {
        title: "Kubernetesとは",
        content:
          "Kubernetes（K8s）は、コンテナ化されたアプリケーションのデプロイ、スケーリング、管理を自動化するオーケストレーションプラットフォームです。Googleが開発し、現在はCNCF（Cloud Native Computing Foundation）が管理しています。自動スケーリング、自己修復、ローリングアップデート、サービスディスカバリなどの機能を提供し、大規模なコンテナ運用を効率化します。",
        code: `# Kubernetes の基本構成
# ┌──────────────────────────────────────┐
# │          Kubernetes Cluster           │
# │  ┌────────────────────────────────┐  │
# │  │      Control Plane              │  │
# │  │  ┌──────┐ ┌──────┐ ┌───────┐  │  │
# │  │  │ API  │ │ etcd │ │Sched- │  │  │
# │  │  │Server│ │      │ │ uler  │  │  │
# │  │  └──────┘ └──────┘ └───────┘  │  │
# │  └────────────────────────────────┘  │
# │  ┌────────────┐  ┌────────────┐      │
# │  │  Worker     │  │  Worker     │     │
# │  │  Node 1     │  │  Node 2     │     │
# │  │ ┌───┐┌───┐ │  │ ┌───┐┌───┐ │     │
# │  │ │Pod││Pod│ │  │ │Pod││Pod│ │     │
# │  │ └───┘└───┘ │  │ └───┘└───┘ │     │
# │  │  kubelet   │  │  kubelet   │     │
# │  └────────────┘  └────────────┘      │
# └──────────────────────────────────────┘

# kubectl の基本コマンド
$ kubectl version
$ kubectl cluster-info
$ kubectl get nodes
$ kubectl get pods -A            # 全namespace
$ kubectl get pods -n myapp      # 特定namespace
$ kubectl get services
$ kubectl get deployments

# リソースの詳細確認
$ kubectl describe pod myapp-xxx-yyy
$ kubectl logs myapp-xxx-yyy -f
$ kubectl exec -it myapp-xxx-yyy -- bash`,
      },
      {
        title: "Pod / Service / Deployment",
        content:
          "Kubernetesの主要なリソースを理解しましょう。Podはコンテナの実行単位で、1つ以上のコンテナをまとめたものです。Serviceは一連のPodへのネットワークアクセスを提供する抽象化です。DeploymentはPodの望ましい状態（レプリカ数、イメージバージョンなど）を宣言的に定義し、ローリングアップデートやスケーリングを管理します。",
        code: `# Deployment（アプリケーションのデプロイ定義）
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
  namespace: production
  labels:
    app: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: myapp
          image: ghcr.io/myuser/myapp:1.0.0
          ports:
            - containerPort: 8080
          resources:
            requests:
              memory: "512Mi"
              cpu: "500m"
            limits:
              memory: "1Gi"
              cpu: "1000m"
          readinessProbe:
            httpGet:
              path: /actuator/health/readiness
              port: 8080
            initialDelaySeconds: 20
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: /actuator/health/liveness
              port: 8080
            initialDelaySeconds: 30
            periodSeconds: 15
---
# Service（ネットワーク公開）
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp
  ports:
    - port: 80
      targetPort: 8080
  type: ClusterIP`,
      },
      {
        title: "JavaアプリのK8sデプロイ",
        content:
          "JavaアプリケーションをKubernetesにデプロイする際は、リソース制限の設定、ヘルスチェックプローブの構成、ConfigMap/Secretによる設定管理、Graceful Shutdownの設定が重要です。Spring Boot Actuatorのliveness/readinessプローブと連携させることで、適切なトラフィック制御と障害検知が可能になります。",
        code: `# Java アプリ用 K8s マニフェスト一式

# ConfigMap（アプリケーション設定）
apiVersion: v1
kind: ConfigMap
metadata:
  name: myapp-config
data:
  application.yml: |
    spring:
      datasource:
        url: jdbc:postgresql://postgres-service:5432/myapp
      jpa:
        hibernate:
          ddl-auto: validate
    server:
      shutdown: graceful
    management:
      endpoint:
        health:
          probes:
            enabled: true
---
# Secret（機密情報）
apiVersion: v1
kind: Secret
metadata:
  name: myapp-secret
type: Opaque
stringData:
  db-username: myuser
  db-password: mysecretpassword
---
# Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    spec:
      terminationGracePeriodSeconds: 60
      containers:
        - name: myapp
          image: ghcr.io/myuser/myapp:1.0.0
          ports:
            - containerPort: 8080
          env:
            - name: SPRING_DATASOURCE_USERNAME
              valueFrom:
                secretKeyRef:
                  name: myapp-secret
                  key: db-username
            - name: SPRING_DATASOURCE_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: myapp-secret
                  key: db-password
            - name: JAVA_TOOL_OPTIONS
              value: "-XX:MaxRAMPercentage=75.0 -XX:+UseG1GC"
          volumeMounts:
            - name: config
              mountPath: /app/config
          resources:
            requests:
              memory: "512Mi"
              cpu: "500m"
            limits:
              memory: "1Gi"
              cpu: "1000m"
      volumes:
        - name: config
          configMap:
            name: myapp-config`,
      },
      {
        title: "Helmチャート",
        content:
          "HelmはKubernetesのパッケージマネージャーで、マニフェストファイルをテンプレート化してチャートとしてパッケージングできます。環境ごとの設定値をvaluesファイルで切り替えられるため、開発・ステージング・本番で同じチャートを再利用できます。バージョン管理とロールバックも容易です。",
        code: `# Helm チャートの構成
# myapp-chart/
# ├── Chart.yaml
# ├── values.yaml
# ├── values-staging.yaml
# ├── values-production.yaml
# └── templates/
#     ├── deployment.yaml
#     ├── service.yaml
#     ├── configmap.yaml
#     └── hpa.yaml

# Chart.yaml
apiVersion: v2
name: myapp
description: A Java Spring Boot application
version: 1.0.0
appVersion: "1.0.0"

# values.yaml（デフォルト値）
replicaCount: 2
image:
  repository: ghcr.io/myuser/myapp
  tag: "latest"
  pullPolicy: IfNotPresent
resources:
  requests:
    memory: "512Mi"
    cpu: "500m"
  limits:
    memory: "1Gi"
    cpu: "1000m"
jvm:
  maxRAMPercentage: "75.0"
  gcType: "G1GC"
spring:
  profiles: default

# values-production.yaml（本番用上書き）
replicaCount: 5
image:
  tag: "1.0.0"
resources:
  requests:
    memory: "1Gi"
    cpu: "1000m"
  limits:
    memory: "2Gi"
    cpu: "2000m"
spring:
  profiles: prod

# Helm コマンド
$ helm install myapp ./myapp-chart
$ helm install myapp ./myapp-chart -f values-production.yaml
$ helm upgrade myapp ./myapp-chart --set image.tag=1.1.0
$ helm rollback myapp 1    # 前バージョンに戻す
$ helm list                # インストール済みリリース一覧
$ helm history myapp       # リリース履歴`,
      },
      {
        title: "K8sのスケーリングと監視",
        content:
          "Kubernetesでは、Horizontal Pod Autoscaler（HPA）でCPU/メモリ使用率に基づく自動スケーリングが可能です。JavaアプリケーションではJVMのメトリクスをPrometheusで収集し、Grafanaでダッシュボードを作成するのが一般的です。Spring Boot ActuatorとMicrometrのPrometheusエンドポイントを活用してメトリクスを公開します。",
        code: `# HPA（水平自動スケーリング）
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
    - type: Resource
      resource:
        name: memory
        target:
          type: Utilization
          averageUtilization: 80

# Spring Boot の Prometheus メトリクス設定
# build.gradle.kts
# implementation("io.micrometer:micrometer-registry-prometheus")

# application.yml
# management:
#   endpoints:
#     web:
#       exposure:
#         include: health,info,metrics,prometheus
#   metrics:
#     tags:
#       application: myapp

# Prometheus の ServiceMonitor
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: myapp-monitor
spec:
  selector:
    matchLabels:
      app: myapp
  endpoints:
    - port: http
      path: /actuator/prometheus
      interval: 15s

# kubectl でのスケーリング操作
$ kubectl scale deployment myapp --replicas=5
$ kubectl get hpa
$ kubectl top pods -l app=myapp
# NAME             CPU(cores)   MEMORY(bytes)
# myapp-xxx-aaa    150m         384Mi
# myapp-xxx-bbb    200m         420Mi
# myapp-xxx-ccc    180m         400Mi`,
      },
    ],
  },
];
