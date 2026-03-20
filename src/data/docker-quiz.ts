export type DockerLevel = "basics" | "java" | "operations";

export interface DockerQuizQuestion {
  id: string;
  question: string;
  choices: { label: string; text: string }[];
  correctLabel: string;
  explanation: string;
  code?: string;
  level: DockerLevel;
  chapter: string;
}

export const dockerQuizQuestions: DockerQuizQuestion[] = [
  // ════════════════════════════════════════
  // basics: Docker基礎 (docker-basics) 5問
  // ════════════════════════════════════════
  {
    id: "docker-basics-q01",
    question: "Dockerコンテナと仮想マシン（VM）の違いとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "コンテナはホストOSのカーネルを共有し、VMは独自のOSカーネルを持つ" },
      { label: "B", text: "コンテナは独自のOSカーネルを持ち、VMはカーネルを共有する" },
      { label: "C", text: "コンテナとVMは技術的に同一である" },
      { label: "D", text: "コンテナはVMより常に安全である" },
    ],
    correctLabel: "A",
    explanation:
      "Dockerコンテナはホストのカーネルを共有し、プロセスレベルの分離を行います。そのため起動が速く軽量です。VMはハイパーバイザ上で独自のOSカーネルを持つため、分離性は高いですがリソース消費が大きくなります。",
    level: "basics",
    chapter: "docker-basics",
  },
  {
    id: "docker-basics-q02",
    question: "DockerfileのCOPYとADDの違いとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "両者は完全に同じ機能である" },
      { label: "B", text: "ADDはリモートURL取得やtar自動展開が可能、COPYは単純なファイルコピーのみ" },
      { label: "C", text: "COPYはリモートURL取得が可能、ADDは不可能" },
      { label: "D", text: "ADDはDockerfile内で使用できない" },
    ],
    correctLabel: "B",
    explanation:
      "ADDはリモートURLからのファイル取得やtar.gzの自動展開機能がありますが、予期しない動作を避けるためCOPYの使用が推奨されています。COPYはローカルファイルの単純なコピーのみ行い、動作が明確です。",
    level: "basics",
    chapter: "docker-basics",
  },
  {
    id: "docker-basics-q03",
    question: "Dockerイメージのレイヤーキャッシュを最大限活用するDockerfileの書き方として正しいものはどれですか？",
    choices: [
      { label: "A", text: "変更頻度の高い処理を先に書く" },
      { label: "B", text: "変更頻度の低い処理を先に書き、高い処理を後に書く" },
      { label: "C", text: "全ての処理を1つのRUN命令にまとめる" },
      { label: "D", text: "レイヤーの順序は影響しない" },
    ],
    correctLabel: "B",
    explanation:
      "Dockerはレイヤーが変更されると、それ以降の全レイヤーのキャッシュが無効になります。そのためOS依存パッケージのインストールなど変更頻度の低い処理を先に書き、ソースコードのコピーなど変更頻度の高い処理を後に書くとキャッシュ効率が上がります。",
    level: "basics",
    chapter: "docker-basics",
  },
  {
    id: "docker-basics-q04",
    question: "docker composeで複数サービスを定義する利点として最も適切なものはどれですか？",
    choices: [
      { label: "A", text: "単一のコンテナで全サービスを実行できる" },
      { label: "B", text: "複数コンテナの定義・ネットワーク・依存関係を一つのファイルで管理できる" },
      { label: "C", text: "Dockerfileが不要になる" },
      { label: "D", text: "本番環境でのみ使用される" },
    ],
    correctLabel: "B",
    explanation:
      "docker composeはcompose.yaml（またはdocker-compose.yml）でアプリケーション、データベース、キャッシュなど複数コンテナの構成を宣言的に定義でき、ネットワークやボリュームの管理、起動順序の制御をまとめて行えます。",
    level: "basics",
    chapter: "docker-basics",
  },
  {
    id: "docker-basics-q05",
    question: "DockerのENTRYPOINTとCMDの違いとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "ENTRYPOINTはdocker run時に上書きできない（--entrypointを除く）が、CMDは上書きできる" },
      { label: "B", text: "CMDはdocker run時に上書きできないが、ENTRYPOINTは上書きできる" },
      { label: "C", text: "両者は完全に同じ機能である" },
      { label: "D", text: "ENTRYPOINTはビルド時のみ、CMDは実行時のみ有効" },
    ],
    correctLabel: "A",
    explanation:
      "ENTRYPOINTはコンテナの実行コマンドを固定し、docker runの引数はENTRYPOINTの引数として渡されます。CMDはdocker runの引数で上書き可能です。両者を組み合わせてENTRYPOINTに実行ファイル、CMDにデフォルト引数を指定するパターンが一般的です。",
    code: "ENTRYPOINT [\"java\", \"-jar\", \"app.jar\"]\nCMD [\"--spring.profiles.active=prod\"]",
    level: "basics",
    chapter: "docker-basics",
  },
  // ════════════════════════════════════════
  // java: Java向けDocker (docker-java) 5問
  // ════════════════════════════════════════
  {
    id: "docker-java-q01",
    question: "JavaアプリケーションのDockerイメージでマルチステージビルドを使う主な利点はどれですか？",
    choices: [
      { label: "A", text: "ビルド速度が向上する" },
      { label: "B", text: "ビルドツール（Maven/Gradle）を含まない軽量な本番イメージを作成できる" },
      { label: "C", text: "Javaのバージョンを複数同時に使用できる" },
      { label: "D", text: "Dockerfileの記述量が減る" },
    ],
    correctLabel: "B",
    explanation:
      "マルチステージビルドでは最初のステージでMaven/Gradleを使いビルドし、最終ステージではJREのみの軽量ベースイメージにJARだけをコピーします。ビルドツールやソースコードが含まれないため、イメージサイズが大幅に縮小されセキュリティも向上します。",
    code: "FROM maven:3.9-eclipse-temurin-21 AS build\nWORKDIR /app\nCOPY pom.xml .\nRUN mvn dependency:go-offline\nCOPY src ./src\nRUN mvn package -DskipTests\n\nFROM eclipse-temurin:21-jre-alpine\nCOPY --from=build /app/target/*.jar app.jar\nENTRYPOINT [\"java\", \"-jar\", \"app.jar\"]",
    level: "java",
    chapter: "docker-java",
  },
  {
    id: "docker-java-q02",
    question: "Dockerコンテナ内でJavaアプリケーションのヒープメモリを適切に制限する方法はどれですか？",
    choices: [
      { label: "A", text: "コンテナのメモリ制限のみ設定すれば自動的にJVMが調整する" },
      { label: "B", text: "-Xmx固定値を設定する" },
      { label: "C", text: "-XX:MaxRAMPercentageでコンテナメモリに対する割合を指定する" },
      { label: "D", text: "メモリ制限は不要である" },
    ],
    correctLabel: "C",
    explanation:
      "-XX:MaxRAMPercentageを使うとコンテナに割り当てられたメモリの割合でヒープサイズを動的に設定できます。例えば75.0に設定すると、コンテナメモリの75%をJVMヒープに使います。固定値の-Xmxより柔軟で、コンテナメモリを変更しても自動調整されます。",
    code: "ENTRYPOINT [\"java\", \"-XX:MaxRAMPercentage=75.0\", \"-jar\", \"app.jar\"]",
    level: "java",
    chapter: "docker-java",
  },
  {
    id: "docker-java-q03",
    question: "Spring BootアプリケーションのDockerイメージを軽量化するベースイメージの選択として最も適切なものはどれですか？",
    choices: [
      { label: "A", text: "ubuntu:latest" },
      { label: "B", text: "eclipse-temurin:21-jdk" },
      { label: "C", text: "eclipse-temurin:21-jre-alpine" },
      { label: "D", text: "centos:7" },
    ],
    correctLabel: "C",
    explanation:
      "本番環境ではJDK（開発ツール含む）ではなくJRE（実行環境のみ）で十分です。さらにAlpine Linuxベースのイメージは通常のLinuxベースより大幅に小さいです。eclipse-temurin:21-jre-alpineは約80MBと軽量です。",
    level: "java",
    chapter: "docker-java",
  },
  {
    id: "docker-java-q04",
    question: "DockerでSpring Bootアプリケーションとデータベースを一緒に起動するcompose.yamlの設定で正しいものはどれですか？",
    choices: [
      { label: "A", text: "depends_onで起動順序を制御し、healthcheckで接続可能になるまで待つ" },
      { label: "B", text: "同じコンテナにアプリとDBを入れる" },
      { label: "C", text: "links設定だけで十分である" },
      { label: "D", text: "起動順序は制御できない" },
    ],
    correctLabel: "A",
    explanation:
      "depends_onのcondition: service_healthyとhealthcheckを組み合わせることで、DBが接続可能になってからアプリを起動できます。単純なdepends_onはコンテナの起動順序のみで、サービスが準備完了するまで待ちません。",
    code: "services:\n  app:\n    build: .\n    depends_on:\n      db:\n        condition: service_healthy\n  db:\n    image: postgres:16\n    healthcheck:\n      test: [\"CMD-SHELL\", \"pg_isready -U postgres\"]\n      interval: 5s\n      timeout: 5s\n      retries: 5",
    level: "java",
    chapter: "docker-java",
  },
  {
    id: "docker-java-q05",
    question: "Dockerイメージ内でJavaアプリケーションをroot以外のユーザーで実行する理由として正しいものはどれですか？",
    choices: [
      { label: "A", text: "パフォーマンスが向上する" },
      { label: "B", text: "コンテナが侵害された際の影響範囲を限定するセキュリティ対策" },
      { label: "C", text: "ログファイルの出力先が変わる" },
      { label: "D", text: "rootユーザーではJavaが動作しない" },
    ],
    correctLabel: "B",
    explanation:
      "コンテナ内でrootで実行すると、脆弱性が悪用された場合にホストシステムへの影響が大きくなります。非rootユーザーで実行することで最小権限の原則を守り、セキュリティリスクを軽減できます。",
    code: "RUN addgroup --system appgroup && adduser --system appuser --ingroup appgroup\nUSER appuser\nENTRYPOINT [\"java\", \"-jar\", \"app.jar\"]",
    level: "java",
    chapter: "docker-java",
  },
  // ════════════════════════════════════════
  // operations: Docker運用 (docker-operations) 5問
  // ════════════════════════════════════════
  {
    id: "docker-operations-q01",
    question: "Dockerボリューム（named volume）とバインドマウントの違いとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "ボリュームはDockerが管理し、バインドマウントはホストのディレクトリを直接マウントする" },
      { label: "B", text: "バインドマウントはDockerが管理し、ボリュームはホストのディレクトリを直接マウントする" },
      { label: "C", text: "両者に違いはない" },
      { label: "D", text: "ボリュームは一時的で、コンテナ削除時に消える" },
    ],
    correctLabel: "A",
    explanation:
      "Docker named volumeはDockerエンジンが管理するストレージで、コンテナ間で共有・再利用が容易です。バインドマウントはホストの特定ディレクトリをコンテナにマウントするため、開発時のソースコード共有に便利ですが、パスがホストに依存します。",
    level: "operations",
    chapter: "docker-operations",
  },
  {
    id: "docker-operations-q02",
    question: "Dockerイメージの脆弱性スキャンを行うコマンドとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "docker inspect" },
      { label: "B", text: "docker scout cves" },
      { label: "C", text: "docker ps --security" },
      { label: "D", text: "docker logs --vulnerabilities" },
    ],
    correctLabel: "B",
    explanation:
      "docker scout cvesはDockerイメージに含まれるパッケージの既知の脆弱性（CVE）をスキャンします。CI/CDパイプラインに組み込んで、脆弱性が含まれるイメージのデプロイを防止するのが推奨プラクティスです。Trivy等のサードパーティツールも利用できます。",
    level: "operations",
    chapter: "docker-operations",
  },
  {
    id: "docker-operations-q03",
    question: "実行中のDockerコンテナの中に入ってデバッグする正しいコマンドはどれですか？",
    choices: [
      { label: "A", text: "docker run -it コンテナ名 /bin/sh" },
      { label: "B", text: "docker exec -it コンテナ名 /bin/sh" },
      { label: "C", text: "docker attach コンテナ名 /bin/sh" },
      { label: "D", text: "docker ssh コンテナ名" },
    ],
    correctLabel: "B",
    explanation:
      "docker exec -itは実行中のコンテナ内で新しいプロセスを起動します。-iはインタラクティブモード、-tは疑似TTYを割り当てます。docker runは新しいコンテナを作成するため既存コンテナのデバッグには使えません。docker sshというコマンドは存在しません。",
    level: "operations",
    chapter: "docker-operations",
  },
  {
    id: "docker-operations-q04",
    question: "Dockerのマルチプラットフォームビルドで、ARM64とAMD64の両方のイメージを作成するコマンドとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "docker build --platform linux/amd64 ." },
      { label: "B", text: "docker buildx build --platform linux/amd64,linux/arm64 -t myapp:latest --push ." },
      { label: "C", text: "docker compose build --multi-arch" },
      { label: "D", text: "docker build --arch arm64,amd64 ." },
    ],
    correctLabel: "B",
    explanation:
      "docker buildxはBuildKitを使った拡張ビルド機能で、--platformオプションで複数のプラットフォーム向けイメージを同時にビルドできます。Apple Silicon（ARM64）とクラウドサーバー（AMD64）の両方をサポートする際に重要です。",
    level: "operations",
    chapter: "docker-operations",
  },
  {
    id: "docker-operations-q05",
    question: "Docker運用でコンテナのログを確認する適切な方法はどれですか？",
    choices: [
      { label: "A", text: "docker logs コンテナ名" },
      { label: "B", text: "docker inspect --logs コンテナ名" },
      { label: "C", text: "docker cat /var/log/container.log" },
      { label: "D", text: "docker status コンテナ名" },
    ],
    correctLabel: "A",
    explanation:
      "docker logsはコンテナのstdout/stderrに出力されたログを表示します。-fオプションでリアルタイム追跡、--tailで行数指定、--sinceで時間指定が可能です。本番環境ではFluentdやCloudWatch Logsなどのログドライバを使ったログ収集が推奨されます。",
    level: "operations",
    chapter: "docker-operations",
  },
];
