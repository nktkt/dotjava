export interface CicdSection {
  title: string;
  content: string;
  code?: string;
}

export interface CicdChapter {
  id: string;
  title: string;
  description: string;
  category: string;
  sections: CicdSection[];
}

export interface CicdCategory {
  id: string;
  name: string;
  color: string;
}

export const cicdCategories: CicdCategory[] = [
  { id: "github-actions", name: "GitHub Actions", color: "#2563EB" },
  { id: "jenkins", name: "Jenkins", color: "#D24939" },
  { id: "practice", name: "CI/CD実践", color: "#059669" },
];

export const cicdChapters: CicdChapter[] = [
  // ===== GitHub Actions =====
  {
    id: "github-actions-basics",
    title: "GitHub Actionsの基本",
    category: "github-actions",
    description:
      "GitHub Actionsのワークフロー構文、トリガー、ジョブ、ステップの基礎を学ぶ",
    sections: [
      {
        title: "ワークフローYAMLの基本構造",
        content:
          "GitHub Actionsのワークフローは、リポジトリの .github/workflows/ ディレクトリに YAML ファイルとして定義します。ワークフローは1つ以上のジョブで構成され、各ジョブはステップの集合です。name でワークフロー名を定義し、on でトリガーイベントを指定し、jobs でジョブを定義するのが基本構造です。runs-on でジョブの実行環境（ランナー）を指定し、steps で実行するアクションやコマンドを順番に記述します。",
        code: `# .github/workflows/ci.yml
name: Java CI Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: リポジトリをチェックアウト
        uses: actions/checkout@v4

      - name: JDK 21 をセットアップ
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'

      - name: Mavenビルド実行
        run: mvn clean verify`,
      },
      {
        title: "トリガーイベントの種類",
        content:
          "GitHub Actionsでは、push、pull_request、schedule（cron）、workflow_dispatch（手動実行）、release など多様なトリガーイベントを使えます。on キーワードで指定し、branches、tags、paths などのフィルターを組み合わせることで、特定の条件でのみワークフローを起動できます。paths フィルターを使えば、特定のディレクトリ配下のファイルが変更された場合のみCIを実行するといった効率的な運用が可能です。",
        code: `# 多様なトリガー設定の例
on:
  push:
    branches:
      - main
      - 'release/**'
    tags:
      - 'v*'
    paths:
      - 'src/**'
      - 'pom.xml'

  pull_request:
    branches: [ main ]
    types: [ opened, synchronize, reopened ]

  # cron スケジュール（毎日午前2時 JST）
  schedule:
    - cron: '0 17 * * *'

  # 手動トリガー（パラメータ付き）
  workflow_dispatch:
    inputs:
      environment:
        description: 'デプロイ先環境'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production
      skip_tests:
        description: 'テストをスキップするか'
        required: false
        type: boolean
        default: false`,
      },
      {
        title: "ジョブの定義と依存関係",
        content:
          "ジョブはワークフローの実行単位で、デフォルトでは並列に実行されます。needs キーワードを使うことでジョブ間の依存関係を定義し、順序制御が可能です。if 条件を使えば特定の条件下でのみジョブを実行でき、strategy.matrix を使えば複数の環境や設定で同一ジョブを並列実行できます。outputs を使ってジョブ間でデータを受け渡すことも可能です。",
        code: `jobs:
  # テストジョブ
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        java-version: [ '17', '21' ]
      fail-fast: false
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          java-version: \${{ matrix.java-version }}
          distribution: 'temurin'
      - run: mvn test

    # ジョブの出力を定義
    outputs:
      test-result: \${{ steps.test-step.outputs.result }}

  # ビルドジョブ（テスト成功後に実行）
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: mvn package -DskipTests

  # デプロイジョブ（mainブランチのみ）
  deploy:
    needs: [ test, build ]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - name: デプロイ実行
        run: echo "Deploying to production..."`,
      },
      {
        title: "ステップとアクションの使い方",
        content:
          "ステップはジョブ内で順番に実行される個々の処理です。uses で公開アクション（Marketplace のアクション）を利用するか、run でシェルコマンドを直接実行します。with でアクションにパラメータを渡し、env で環境変数を設定できます。id を付与したステップの出力は、後続のステップから steps.<id>.outputs.<name> で参照可能です。working-directory でコマンドの実行ディレクトリも指定できます。",
        code: `steps:
  # 公開アクションの利用
  - name: リポジトリをチェックアウト
    uses: actions/checkout@v4
    with:
      fetch-depth: 0  # 全履歴を取得

  # シェルコマンドの実行
  - name: プロジェクトバージョンを取得
    id: get-version
    run: |
      VERSION=$(mvn help:evaluate -Dexpression=project.version -q -DforceStdout)
      echo "version=\${VERSION}" >> "\$GITHUB_OUTPUT"
      echo "プロジェクトバージョン: \${VERSION}"

  # 前のステップの出力を参照
  - name: バージョン情報を表示
    run: echo "Version is \${{ steps.get-version.outputs.version }}"

  # 環境変数の設定
  - name: テスト実行
    env:
      SPRING_PROFILES_ACTIVE: test
      DATABASE_URL: \${{ secrets.TEST_DB_URL }}
    run: mvn test

  # 特定ディレクトリで実行
  - name: サブモジュールのビルド
    working-directory: ./backend
    run: mvn clean package`,
      },
      {
        title: "シークレットと環境変数の管理",
        content:
          "GitHub Actionsでは、secrets でリポジトリやOrganizationレベルの機密情報を安全に管理できます。secrets はワークフロー実行時に自動的にマスクされ、ログに平文で出力されません。vars で暗号化不要の設定変数を管理でき、env キーワードでワークフロー・ジョブ・ステップの各レベルで環境変数を定義できます。Environments 機能を使えば、環境ごとに異なるシークレットや保護ルールを適用できます。",
        code: `name: Secrets と環境変数の管理

on: push

# ワークフローレベルの環境変数
env:
  JAVA_VERSION: '21'
  REGISTRY: ghcr.io

jobs:
  deploy:
    runs-on: ubuntu-latest
    # Environment を指定（保護ルール適用可能）
    environment:
      name: production
      url: https://myapp.example.com

    # ジョブレベルの環境変数
    env:
      APP_NAME: my-java-app

    steps:
      - uses: actions/checkout@v4

      # シークレットの利用
      - name: Docker レジストリにログイン
        uses: docker/login-action@v3
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      # 設定変数（vars）の利用
      - name: アプリケーション設定
        env:
          DB_HOST: \${{ vars.DB_HOST }}
          DB_NAME: \${{ vars.DB_NAME }}
          DB_PASSWORD: \${{ secrets.DB_PASSWORD }}
        run: |
          echo "Connecting to \${DB_HOST}/\${DB_NAME}"
          mvn spring-boot:run

      # GITHUB_TOKEN（自動生成）の利用
      - name: リリースの作成
        uses: softprops/action-gh-release@v2
        with:
          token: \${{ secrets.GITHUB_TOKEN }}
          files: target/*.jar`,
      },
    ],
  },
  {
    id: "java-ci-pipeline",
    title: "JavaプロジェクトのCI",
    category: "github-actions",
    description:
      "Maven/Gradleを使ったJavaプロジェクトのビルド、テスト実行、キャッシュ戦略を学ぶ",
    sections: [
      {
        title: "MavenプロジェクトのCIワークフロー",
        content:
          "JavaプロジェクトのCIでは、JDKのセットアップ、依存関係の解決、コンパイル、テスト実行、成果物の保存が基本フローです。actions/setup-java アクションでJDKを設定し、Mavenラッパー（mvnw）を使うことでMavenバージョンの一貫性を保てます。テスト結果やJARファイルをアーティファクトとして保存すれば、後続のジョブやダウンロードで利用可能です。",
        code: `name: Maven CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: JDK 21 セットアップ
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
          cache: 'maven'

      - name: Maven Wrapper に実行権限付与
        run: chmod +x mvnw

      - name: ビルドとテスト
        run: ./mvnw clean verify -B

      - name: テストレポートをアップロード
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-reports
          path: target/surefire-reports/

      - name: JARファイルをアップロード
        uses: actions/upload-artifact@v4
        with:
          name: app-jar
          path: target/*.jar
          retention-days: 7`,
      },
      {
        title: "GradleプロジェクトのCIワークフロー",
        content:
          "GradleプロジェクトでもGitHub Actionsで効率的なCIを構築できます。gradle/actions/setup-gradle アクションを使えば、Gradleのキャッシュやビルドスキャンの連携が自動化されます。Gradleラッパー（gradlew）を使うことでビルドの再現性を確保し、--parallel オプションで並列ビルドによる高速化も可能です。マルチモジュールプロジェクトでは、特定のサブプロジェクトのみテストする設定も有用です。",
        code: `name: Gradle CI

on:
  push:
    branches: [ main ]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: JDK 21 セットアップ
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'

      - name: Gradle セットアップ
        uses: gradle/actions/setup-gradle@v3
        with:
          gradle-version: wrapper

      - name: Gradle Wrapper に実行権限付与
        run: chmod +x gradlew

      - name: ビルドとテスト
        run: ./gradlew build --parallel

      - name: テスト結果をアップロード
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-results
          path: |
            **/build/reports/tests/
            **/build/test-results/

      # マルチモジュール：特定モジュールのみテスト
      - name: APIモジュールのテスト
        run: ./gradlew :api:test :api:jacocoTestReport`,
      },
      {
        title: "依存関係のキャッシュ戦略",
        content:
          "CI実行時間を短縮するには、依存関係のキャッシュが非常に重要です。actions/cache アクションを使えば、Mavenのローカルリポジトリ（~/.m2/repository）やGradleのキャッシュディレクトリを永続化できます。キャッシュキーにpom.xmlやbuild.gradleのハッシュを含めることで、依存関係が変わったときだけキャッシュが更新されます。restore-keys を設定すれば、完全一致しなくても部分一致でキャッシュを復元でき、初回ビルド以外は大幅に高速化されます。",
        code: `jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # Maven キャッシュ（手動設定）
      - name: Maven キャッシュ
        uses: actions/cache@v4
        with:
          path: ~/.m2/repository
          key: maven-\${{ runner.os }}-\${{ hashFiles('**/pom.xml') }}
          restore-keys: |
            maven-\${{ runner.os }}-

      # Gradle キャッシュ（手動設定）
      - name: Gradle キャッシュ
        uses: actions/cache@v4
        with:
          path: |
            ~/.gradle/caches
            ~/.gradle/wrapper
          key: gradle-\${{ runner.os }}-\${{ hashFiles('**/*.gradle*', '**/gradle-wrapper.properties') }}
          restore-keys: |
            gradle-\${{ runner.os }}-

      # setup-java の cache オプション（簡易設定）
      - name: JDK セットアップ（キャッシュ付き）
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
          cache: 'maven'  # 'gradle' も指定可能

      - name: ビルド実行
        run: mvn clean verify -B`,
      },
      {
        title: "マトリクスビルドとマルチJDKテスト",
        content:
          "strategy.matrix を活用すれば、複数のJDKバージョンやOS環境で同時にテストを実行できます。これにより、JDK 17とJDK 21の両方で動作確認したり、Ubuntu・macOS・Windowsのクロスプラットフォームテストを効率的に行えます。include/exclude で特定の組み合わせを追加・除外することも可能で、fail-fast: false を設定すれば一部が失敗しても全組み合わせのテストを完走させられます。",
        code: `name: マルチバージョン CI

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: \${{ matrix.os }}
    strategy:
      fail-fast: false
      matrix:
        os: [ ubuntu-latest, windows-latest ]
        java-version: [ '17', '21' ]
        include:
          # 特定の組み合わせを追加
          - os: ubuntu-latest
            java-version: '23'
            experimental: true
        exclude:
          # 特定の組み合わせを除外
          - os: windows-latest
            java-version: '17'

    steps:
      - uses: actions/checkout@v4

      - name: JDK \${{ matrix.java-version }} セットアップ
        uses: actions/setup-java@v4
        with:
          java-version: \${{ matrix.java-version }}
          distribution: 'temurin'
          cache: 'maven'

      - name: テスト実行
        run: mvn test -B

      - name: テスト結果をアップロード
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: test-results-\${{ matrix.os }}-java\${{ matrix.java-version }}
          path: target/surefire-reports/`,
      },
      {
        title: "コード品質チェックの統合",
        content:
          "CIパイプラインにコード品質チェックを統合することで、コードレビューの効率と品質を向上させます。SpotBugs、Checkstyle、PMD などの静的解析ツールをMaven/Gradleプラグインとして実行し、結果をPRコメントとして自動投稿できます。SonarCloudと連携すれば、コードスメル、バグ、セキュリティ脆弱性の包括的な分析をダッシュボードで確認でき、品質ゲートの設定も可能です。",
        code: `name: Code Quality

on:
  push:
    branches: [ main ]
  pull_request:

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0  # SonarCloud に必要

      - uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
          cache: 'maven'

      # SpotBugs と Checkstyle の実行
      - name: 静的解析
        run: mvn verify -P quality-checks -B

      # SonarCloud 解析
      - name: SonarCloud 解析
        env:
          SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
        run: |
          mvn sonar:sonar \\
            -Dsonar.projectKey=my-org_my-app \\
            -Dsonar.organization=my-org \\
            -Dsonar.host.url=https://sonarcloud.io \\
            -Dsonar.token=\${SONAR_TOKEN}

      # PRにチェック結果をコメント
      - name: Checkstyle レポート
        if: github.event_name == 'pull_request'
        uses: jwgmeligmeyling/checkstyle-github-action@master
        with:
          path: '**/checkstyle-result.xml'`,
      },
    ],
  },
  {
    id: "cd-auto-deploy",
    title: "CD自動デプロイ",
    category: "github-actions",
    description:
      "DockerイメージのビルドとPush、AWS/GCPへの自動デプロイ、環境変数・secretsの管理を学ぶ",
    sections: [
      {
        title: "DockerイメージのビルドとPush",
        content:
          "GitHub ActionsでDockerイメージをビルドし、GitHub Container Registry（ghcr.io）やDockerHubにプッシュするのがCD基本パターンです。docker/build-push-action を使えば、マルチプラットフォームビルド、レイヤーキャッシュ、タグ付けを効率的に行えます。metadata-action でGitタグやブランチ名からDockerタグを自動生成し、PRではビルドのみ、mainブランチではPushまで実行するフローが一般的です。",
        code: `name: Docker Build & Push

on:
  push:
    branches: [ main ]
    tags: [ 'v*' ]
  pull_request:
    branches: [ main ]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  docker:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write

    steps:
      - uses: actions/checkout@v4

      - name: Docker メタデータ設定
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}
          tags: |
            type=ref,event=branch
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}
            type=sha

      - name: Docker Buildx セットアップ
        uses: docker/setup-buildx-action@v3

      - name: レジストリにログイン
        if: github.event_name != 'pull_request'
        uses: docker/login-action@v3
        with:
          registry: \${{ env.REGISTRY }}
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: ビルドとプッシュ
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
        title: "AWS ECSへの自動デプロイ",
        content:
          "AWS ECS（Elastic Container Service）への自動デプロイは、Dockerイメージをビルド・Push後にタスク定義を更新してサービスを再デプロイする流れです。aws-actions/configure-aws-credentials でAWS認証を行い、aws-actions/amazon-ecs-deploy-task-definition でタスク定義のイメージタグを更新します。OIDC連携を使えば、長期的なアクセスキーの管理が不要になり、よりセキュアなデプロイが実現できます。",
        code: `name: Deploy to AWS ECS

on:
  push:
    branches: [ main ]

env:
  AWS_REGION: ap-northeast-1
  ECR_REPOSITORY: my-java-app
  ECS_SERVICE: my-java-service
  ECS_CLUSTER: my-cluster
  CONTAINER_NAME: app

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read

    steps:
      - uses: actions/checkout@v4

      # OIDC による AWS 認証（推奨）
      - name: AWS 認証
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/github-actions-role
          aws-region: \${{ env.AWS_REGION }}

      # ECR へログイン
      - name: ECR ログイン
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v2

      # イメージビルドとプッシュ
      - name: Docker ビルド＆プッシュ
        id: build-image
        env:
          ECR_REGISTRY: \${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: \${{ github.sha }}
        run: |
          docker build -t \${ECR_REGISTRY}/\${ECR_REPOSITORY}:\${IMAGE_TAG} .
          docker push \${ECR_REGISTRY}/\${ECR_REPOSITORY}:\${IMAGE_TAG}
          echo "image=\${ECR_REGISTRY}/\${ECR_REPOSITORY}:\${IMAGE_TAG}" >> "\$GITHUB_OUTPUT"

      # タスク定義の更新
      - name: ECS タスク定義を更新
        id: task-def
        uses: aws-actions/amazon-ecs-render-task-definition@v1
        with:
          task-definition: task-definition.json
          container-name: \${{ env.CONTAINER_NAME }}
          image: \${{ steps.build-image.outputs.image }}

      # ECS サービスの更新
      - name: ECS デプロイ
        uses: aws-actions/amazon-ecs-deploy-task-definition@v1
        with:
          task-definition: \${{ steps.task-def.outputs.task-definition }}
          service: \${{ env.ECS_SERVICE }}
          cluster: \${{ env.ECS_CLUSTER }}
          wait-for-service-stability: true`,
      },
      {
        title: "GCP Cloud Runへのデプロイ",
        content:
          "Google Cloud Run へのデプロイは、Artifact Registry にDockerイメージをPushした後、Cloud Run サービスを更新する流れです。google-github-actions/auth でWorkload Identity連携によるセキュアな認証を行い、gcloud コマンドでデプロイを実行します。Cloud Runはサーバーレスでスケーリングを自動管理するため、Javaアプリケーションの手軽なデプロイ先として最適です。",
        code: `name: Deploy to Cloud Run

on:
  push:
    branches: [ main ]

env:
  PROJECT_ID: my-gcp-project
  REGION: asia-northeast1
  SERVICE: my-java-app
  REPOSITORY: my-repo

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      id-token: write
      contents: read

    steps:
      - uses: actions/checkout@v4

      # Workload Identity 連携による認証
      - name: GCP 認証
        uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: 'projects/123456/locations/global/workloadIdentityPools/github-pool/providers/github-provider'
          service_account: 'github-actions@my-gcp-project.iam.gserviceaccount.com'

      # gcloud CLI セットアップ
      - name: gcloud セットアップ
        uses: google-github-actions/setup-gcloud@v2

      # Docker 認証設定
      - name: Docker 認証
        run: gcloud auth configure-docker \${{ env.REGION }}-docker.pkg.dev

      # イメージビルドとプッシュ
      - name: ビルド＆プッシュ
        run: |
          IMAGE="\${{ env.REGION }}-docker.pkg.dev/\${{ env.PROJECT_ID }}/\${{ env.REPOSITORY }}/\${{ env.SERVICE }}"
          docker build -t "\${IMAGE}:\${{ github.sha }}" .
          docker push "\${IMAGE}:\${{ github.sha }}"

      # Cloud Run デプロイ
      - name: Cloud Run デプロイ
        uses: google-github-actions/deploy-cloudrun@v2
        with:
          service: \${{ env.SERVICE }}
          region: \${{ env.REGION }}
          image: \${{ env.REGION }}-docker.pkg.dev/\${{ env.PROJECT_ID }}/\${{ env.REPOSITORY }}/\${{ env.SERVICE }}:\${{ github.sha }}
          flags: '--memory=512Mi --cpu=1 --min-instances=1 --max-instances=10'`,
      },
      {
        title: "環境ごとのデプロイ戦略",
        content:
          "本番デプロイでは、staging → production の段階的デプロイが重要です。GitHub Environments 機能で環境ごとの保護ルール（承認者の指定、待機時間）を設定し、reusable workflow で共通のデプロイロジックを再利用できます。ブランチ戦略と連携し、develop ブランチは自動でstagingへ、mainブランチは承認後にproductionへデプロイするフローが安全で効率的です。",
        code: `name: 段階的デプロイ

on:
  push:
    branches: [ main, develop ]

jobs:
  build:
    runs-on: ubuntu-latest
    outputs:
      image-tag: \${{ steps.build.outputs.tag }}
    steps:
      - uses: actions/checkout@v4
      - name: ビルド
        id: build
        run: |
          TAG="\${{ github.sha }}"
          echo "tag=\${TAG}" >> "\$GITHUB_OUTPUT"
          docker build -t "myapp:\${TAG}" .
          docker push "ghcr.io/myorg/myapp:\${TAG}"

  # Staging デプロイ（自動）
  deploy-staging:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: staging
      url: https://staging.myapp.example.com
    steps:
      - name: Staging にデプロイ
        run: |
          echo "Deploying \${{ needs.build.outputs.image-tag }} to staging"
          # デプロイコマンド実行

  # E2E テスト（Staging 環境で実行）
  e2e-test:
    needs: deploy-staging
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: E2E テスト
        env:
          BASE_URL: https://staging.myapp.example.com
        run: mvn test -P e2e

  # Production デプロイ（承認必要、mainブランチのみ）
  deploy-production:
    needs: [ build, e2e-test ]
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://myapp.example.com
    steps:
      - name: Production にデプロイ
        run: |
          echo "Deploying \${{ needs.build.outputs.image-tag }} to production"
          # デプロイコマンド実行`,
      },
      {
        title: "Reusable Workflowの作成",
        content:
          "Reusable Workflow（再利用可能ワークフロー）は、共通のCI/CDロジックをテンプレート化し、複数のリポジトリやワークフローから呼び出せる機能です。workflow_call トリガーで定義し、inputs でパラメータを、secrets で機密情報を受け取ります。組織全体で統一されたCI/CDパイプラインを維持でき、変更の一元管理が可能になります。",
        code: `# .github/workflows/reusable-java-ci.yml（再利用可能ワークフロー）
name: Reusable Java CI

on:
  workflow_call:
    inputs:
      java-version:
        description: 'JDK バージョン'
        required: false
        type: string
        default: '21'
      build-tool:
        description: 'ビルドツール（maven or gradle）'
        required: true
        type: string
    secrets:
      SONAR_TOKEN:
        required: false

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-java@v4
        with:
          java-version: \${{ inputs.java-version }}
          distribution: 'temurin'
          cache: \${{ inputs.build-tool }}

      - name: Maven ビルド
        if: inputs.build-tool == 'maven'
        run: mvn clean verify -B

      - name: Gradle ビルド
        if: inputs.build-tool == 'gradle'
        run: ./gradlew build

---
# 呼び出し側ワークフロー
name: CI
on: [ push, pull_request ]

jobs:
  ci:
    uses: my-org/.github/.github/workflows/reusable-java-ci.yml@main
    with:
      java-version: '21'
      build-tool: 'maven'
    secrets:
      SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}`,
      },
    ],
  },

  // ===== Jenkins =====
  {
    id: "jenkins-basics",
    title: "Jenkinsの基本設定",
    category: "jenkins",
    description:
      "Jenkinsのインストール、初期設定、パイプラインの基本、Jenkinsfileの記述方法を学ぶ",
    sections: [
      {
        title: "JenkinsのDockerインストール",
        content:
          "Jenkinsは最も広く使われるオープンソースの自動化サーバーです。Dockerを使えば簡単にJenkins環境を構築できます。jenkins/jenkins:lts イメージを使い、データ永続化のためボリュームをマウントします。初回起動時に管理者パスワードが生成され、Webブラウザからの初期設定ウィザードでプラグインのインストールとユーザー作成を行います。Docker in Docker（DinD）構成にすれば、Jenkins上でDockerビルドも可能です。",
        code: `# docker-compose.yml
version: '3.8'
services:
  jenkins:
    image: jenkins/jenkins:lts-jdk21
    container_name: jenkins
    ports:
      - "8080:8080"
      - "50000:50000"
    volumes:
      - jenkins_home:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - JAVA_OPTS=-Xmx2g -Xms512m
    restart: unless-stopped

volumes:
  jenkins_home:

# --- 起動コマンド ---
# docker-compose up -d
# 初回パスワード取得:
# docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword

# --- 推奨プラグイン ---
# - Pipeline
# - Git
# - Docker Pipeline
# - Blue Ocean
# - JUnit
# - Credentials Binding
# - Slack Notification`,
      },
      {
        title: "Declarative Pipelineの基本",
        content:
          "JenkinsのDeclarative Pipelineは、Jenkinsfileとしてパイプラインをコードで定義する方法です。pipeline ブロック内に agent（実行環境）、stages（ステージ群）、steps（手順）を記述します。Declarative構文は構造化されており読みやすく、Scripted Pipelineに比べて学習コストが低いのが特徴です。Jenkinsfileをリポジトリに含めることで、パイプラインもバージョン管理され、「Pipeline as Code」が実現できます。",
        code: `// Jenkinsfile（Declarative Pipeline）
pipeline {
    agent any

    tools {
        jdk 'JDK21'
        maven 'Maven3'
    }

    environment {
        APP_NAME = 'my-java-app'
        VERSION = readMavenPom().getVersion()
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
        disableConcurrentBuilds()
    }

    stages {
        stage('チェックアウト') {
            steps {
                checkout scm
            }
        }

        stage('ビルド') {
            steps {
                sh 'mvn clean compile -B'
            }
        }

        stage('テスト') {
            steps {
                sh 'mvn test -B'
            }
            post {
                always {
                    junit '**/target/surefire-reports/*.xml'
                }
            }
        }

        stage('パッケージ') {
            steps {
                sh 'mvn package -DskipTests -B'
                archiveArtifacts artifacts: 'target/*.jar'
            }
        }
    }

    post {
        success {
            echo 'ビルド成功！'
        }
        failure {
            echo 'ビルド失敗...'
        }
        always {
            cleanWs()
        }
    }
}`,
      },
      {
        title: "Jenkinsfileのブランチ戦略",
        content:
          "MultiBranch Pipelineを使えば、リポジトリ内の全ブランチを自動的に検出し、それぞれのJenkinsfileに基づいてパイプラインを実行できます。when ディレクティブを使って、ブランチ名やタグに応じて特定のステージをスキップまたは実行する条件分岐が可能です。feature ブランチではテストのみ、main ブランチではデプロイまで実行するといった戦略を、単一のJenkinsfileで表現できます。",
        code: `// Jenkinsfile - ブランチごとの条件分岐
pipeline {
    agent any

    stages {
        stage('ビルド＆テスト') {
            steps {
                sh 'mvn clean verify -B'
            }
        }

        stage('Staging デプロイ') {
            when {
                branch 'develop'
            }
            steps {
                echo 'Staging 環境にデプロイ中...'
                sh './deploy.sh staging'
            }
        }

        stage('本番デプロイ承認') {
            when {
                branch 'main'
            }
            steps {
                input message: '本番デプロイを承認しますか？',
                      ok: 'デプロイ実行',
                      submitter: 'admin,release-manager'
            }
        }

        stage('本番デプロイ') {
            when {
                branch 'main'
            }
            steps {
                echo '本番環境にデプロイ中...'
                sh './deploy.sh production'
            }
        }

        stage('タグリリース') {
            when {
                tag pattern: 'v\\\\d+\\\\.\\\\d+\\\\.\\\\d+',
                    comparator: 'REGEXP'
            }
            steps {
                echo "リリース: \${TAG_NAME}"
                sh './release.sh'
            }
        }
    }
}`,
      },
      {
        title: "認証情報の管理",
        content:
          "Jenkinsの認証情報（Credentials）管理機能は、パスワード、SSHキー、APIトークンなどの機密情報を安全に保管します。Jenkins管理画面から認証情報を登録し、Jenkinsfile内で credentials() や withCredentials ブロックを使ってアクセスします。認証情報はスコープ（Global/Folder/System）で管理でき、ログ出力時には自動的にマスクされます。環境変数として展開する方法と、ファイルとして利用する方法があります。",
        code: `pipeline {
    agent any

    environment {
        // ユーザー名/パスワード型の認証情報
        DB_CREDS = credentials('database-credentials')
        // DB_CREDS_USR と DB_CREDS_PSW が自動設定される

        // シークレットテキスト型
        API_TOKEN = credentials('api-token')
    }

    stages {
        stage('認証情報の利用') {
            steps {
                // 環境変数として利用
                sh """
                    echo "DB User: \${DB_CREDS_USR}"
                    mysql -u \${DB_CREDS_USR} -p\${DB_CREDS_PSW} mydb
                """

                // withCredentials ブロック内で利用
                withCredentials([
                    usernamePassword(
                        credentialsId: 'docker-hub',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh """
                        docker login -u \${DOCKER_USER} -p \${DOCKER_PASS}
                        docker push myapp:latest
                    """
                }

                // SSH 鍵の利用
                withCredentials([
                    sshUserPrivateKey(
                        credentialsId: 'deploy-key',
                        keyFileVariable: 'SSH_KEY'
                    )
                ]) {
                    sh """
                        ssh -i \${SSH_KEY} user@server 'deploy.sh'
                    """
                }
            }
        }
    }
}`,
      },
      {
        title: "パイプラインのトリガー設定",
        content:
          "Jenkinsパイプラインのトリガーには、SCMポーリング、Webhook、定期実行（cron）、他ジョブからの呼び出しなど複数の方法があります。triggers ディレクティブでJenkinsfile内にトリガーを定義でき、pollSCM でリポジトリの変更を定期チェック、cron で時刻指定実行が可能です。GitHub Webhookを設定すれば、コードのPush直後にパイプラインが起動し、最も迅速なCI/CDが実現できます。",
        code: `pipeline {
    agent any

    triggers {
        // SCM ポーリング（5分ごとにチェック）
        pollSCM('H/5 * * * *')

        // cron 定期実行（平日の午前9時）
        cron('0 9 * * 1-5')

        // 上流ジョブの完了をトリガー
        upstream(
            upstreamProjects: 'lib-build',
            threshold: hudson.model.Result.SUCCESS
        )
    }

    parameters {
        string(name: 'BRANCH', defaultValue: 'main',
               description: 'ビルドブランチ')
        choice(name: 'ENV', choices: ['dev', 'staging', 'prod'],
               description: 'デプロイ先環境')
        booleanParam(name: 'SKIP_TESTS', defaultValue: false,
                     description: 'テストをスキップ')
    }

    stages {
        stage('ビルド') {
            steps {
                echo "ブランチ: \${params.BRANCH}"
                echo "環境: \${params.ENV}"

                script {
                    if (params.SKIP_TESTS) {
                        sh 'mvn package -DskipTests -B'
                    } else {
                        sh 'mvn clean verify -B'
                    }
                }
            }
        }

        stage('デプロイ') {
            when {
                expression { params.ENV != 'prod' ||
                    currentBuild.result == null }
            }
            steps {
                sh "./deploy.sh \${params.ENV}"
            }
        }
    }
}`,
      },
    ],
  },
  {
    id: "jenkins-pipeline-advanced",
    title: "Jenkins パイプライン実践",
    category: "jenkins",
    description:
      "マルチステージパイプライン、パラメータ化ビルド、共有ライブラリの活用方法を学ぶ",
    sections: [
      {
        title: "マルチステージパイプライン",
        content:
          "本格的なJenkinsパイプラインでは、ビルド→テスト→品質チェック→デプロイの複数ステージを並列・直列に組み合わせます。parallel ブロックを使えば、単体テストと結合テストを同時実行してパイプライン時間を短縮できます。各ステージの成果物は stash/unstash で受け渡し、post セクションで成功・失敗時の処理を定義します。",
        code: `pipeline {
    agent none

    stages {
        stage('ビルド') {
            agent { label 'build-node' }
            steps {
                sh 'mvn clean package -DskipTests -B'
                stash includes: 'target/*.jar', name: 'app-jar'
            }
        }

        stage('並列テスト') {
            parallel {
                stage('単体テスト') {
                    agent { label 'test-node' }
                    steps {
                        unstash 'app-jar'
                        sh 'mvn test -B'
                    }
                    post {
                        always {
                            junit '**/surefire-reports/*.xml'
                        }
                    }
                }

                stage('結合テスト') {
                    agent { label 'test-node' }
                    steps {
                        unstash 'app-jar'
                        sh 'mvn verify -P integration-test -B'
                    }
                    post {
                        always {
                            junit '**/failsafe-reports/*.xml'
                        }
                    }
                }

                stage('静的解析') {
                    agent { label 'test-node' }
                    steps {
                        sh 'mvn checkstyle:check spotbugs:check -B'
                    }
                }
            }
        }

        stage('デプロイ') {
            agent { label 'deploy-node' }
            when {
                branch 'main'
            }
            steps {
                unstash 'app-jar'
                sh './deploy.sh production'
            }
        }
    }
}`,
      },
      {
        title: "Docker Agentの活用",
        content:
          "Jenkins Pipeline では agent { docker } を使って、Docker コンテナ内でステップを実行できます。これにより、ビルドツールのバージョン管理がDockerイメージで完結し、ビルド環境の再現性が向上します。異なるステージで異なるDockerイメージを指定したり、Dockerfileからカスタムイメージをビルドして使うことも可能です。",
        code: `pipeline {
    agent none

    stages {
        stage('ビルド') {
            agent {
                docker {
                    image 'maven:3.9-eclipse-temurin-21'
                    args '-v \$HOME/.m2:/root/.m2'
                }
            }
            steps {
                sh 'mvn clean package -DskipTests -B'
                stash includes: 'target/*.jar', name: 'jar'
            }
        }

        stage('テスト') {
            agent {
                docker {
                    image 'maven:3.9-eclipse-temurin-21'
                    args """
                        -v \$HOME/.m2:/root/.m2
                        --network test-network
                    """
                }
            }
            steps {
                sh 'mvn test -B'
            }
        }

        stage('Docker イメージビルド') {
            agent any
            steps {
                unstash 'jar'
                script {
                    def image = docker.build(
                        "myapp:\${env.BUILD_NUMBER}"
                    )
                    docker.withRegistry(
                        'https://registry.example.com',
                        'docker-creds'
                    ) {
                        image.push()
                        image.push('latest')
                    }
                }
            }
        }

        stage('カスタムDockerfileでビルド') {
            agent {
                dockerfile {
                    filename 'Dockerfile.ci'
                    dir 'docker'
                    additionalBuildArgs '--build-arg VERSION=21'
                }
            }
            steps {
                sh 'mvn verify -B'
            }
        }
    }
}`,
      },
      {
        title: "共有ライブラリの作成と利用",
        content:
          "Jenkins Shared Libraryは、複数のパイプラインで共通のロジックを再利用するための仕組みです。vars/ ディレクトリにグローバル関数を、src/ ディレクトリにGroovyクラスを配置し、Gitリポジトリとして管理します。@Library アノテーションでライブラリを読み込み、定義した関数をパイプライン内で呼び出せます。組織全体でビルド・デプロイ手順を統一し、保守性を大幅に向上させます。",
        code: `// === 共有ライブラリのディレクトリ構造 ===
// jenkins-shared-library/
//   vars/
//     javaBuild.groovy
//     deployApp.groovy
//   src/
//     com/myorg/Pipeline.groovy

// --- vars/javaBuild.groovy ---
def call(Map config = [:]) {
    def jdkVersion = config.jdkVersion ?: '21'
    def buildTool = config.buildTool ?: 'maven'

    pipeline {
        agent any

        tools {
            jdk "JDK\${jdkVersion}"
        }

        stages {
            stage('ビルド') {
                steps {
                    script {
                        if (buildTool == 'maven') {
                            sh 'mvn clean package -B'
                        } else {
                            sh './gradlew build'
                        }
                    }
                }
            }

            stage('テスト') {
                steps {
                    script {
                        if (buildTool == 'maven') {
                            sh 'mvn test -B'
                        } else {
                            sh './gradlew test'
                        }
                    }
                }
                post {
                    always {
                        junit '**/test-results/*.xml'
                    }
                }
            }
        }
    }
}

// --- vars/deployApp.groovy ---
def call(String environment, String version) {
    echo "Deploying version \${version} to \${environment}"
    sh "./deploy.sh \${environment} \${version}"
}

// === Jenkinsfile（利用側） ===
@Library('my-shared-library') _

javaBuild(jdkVersion: '21', buildTool: 'maven')`,
      },
      {
        title: "パイプラインのエラーハンドリング",
        content:
          "本番運用のパイプラインでは、適切なエラーハンドリングが不可欠です。try-catch-finally でGroovyの例外処理を行い、retry で一時的なエラーに対してリトライ、timeout でハングアップを防止します。catchError や unstable ステップを使えばステージ単位での失敗制御が可能で、パイプライン全体を失敗させずに続行するかどうかを柔軟に制御できます。",
        code: `pipeline {
    agent any

    options {
        timeout(time: 60, unit: 'MINUTES')
        retry(2)
    }

    stages {
        stage('ビルド') {
            steps {
                sh 'mvn clean package -B'
            }
        }

        stage('デプロイ') {
            steps {
                // リトライ付きデプロイ
                retry(3) {
                    timeout(time: 5, unit: 'MINUTES') {
                        sh './deploy.sh'
                    }
                }
            }
        }

        stage('E2Eテスト') {
            steps {
                // 失敗してもパイプラインを続行
                catchError(
                    buildResult: 'UNSTABLE',
                    stageResult: 'FAILURE'
                ) {
                    sh 'mvn test -P e2e'
                }
            }
        }

        stage('通知') {
            steps {
                script {
                    try {
                        sh './notify.sh'
                    } catch (Exception e) {
                        echo "通知送信に失敗: \${e.message}"
                        // 通知失敗はビルド失敗にしない
                        unstable('通知送信失敗')
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'パイプライン成功'
        }
        unstable {
            echo 'パイプライン不安定'
        }
        failure {
            echo 'パイプライン失敗'
            // 失敗時のロールバック
            sh './rollback.sh'
        }
        always {
            // テストレポート収集
            junit allowEmptyResults: true,
                 testResults: '**/test-results/*.xml'
            cleanWs()
        }
    }
}`,
      },
      {
        title: "Blue OceanとPipeline可視化",
        content:
          "Blue Oceanは、Jenkinsのモダンなパイプライン可視化UIです。パイプラインの実行状況をグラフィカルに表示し、各ステージのログ確認やパイプラインの編集が直感的に行えます。また、Pipeline Stage View プラグインを使えば、従来のJenkins UIでもステージごとの実行時間や成功率を一覧表示できます。API経由でパイプライン情報を取得し、外部のモニタリングツールと連携することも可能です。",
        code: `// Blue Ocean 対応のJenkinsfile
pipeline {
    agent any

    stages {
        stage('準備') {
            steps {
                echo 'ソースコード取得...'
                checkout scm
            }
        }

        stage('品質チェック') {
            parallel {
                stage('Lint') {
                    steps {
                        sh 'mvn checkstyle:check -B'
                    }
                }
                stage('セキュリティスキャン') {
                    steps {
                        sh 'mvn dependency-check:check -B'
                    }
                }
            }
        }

        stage('ビルド＆テスト') {
            steps {
                sh 'mvn clean verify -B'
            }
            post {
                always {
                    junit '**/surefire-reports/*.xml'
                    jacoco(
                        execPattern: '**/jacoco.exec',
                        classPattern: '**/classes',
                        sourcePattern: '**/src/main/java'
                    )
                }
            }
        }

        stage('デプロイ判定') {
            when { branch 'main' }
            steps {
                input message: 'デプロイしますか？',
                      ok: '承認'
            }
        }

        stage('デプロイ') {
            when { branch 'main' }
            steps {
                sh './deploy.sh production'
            }
        }
    }

    post {
        always {
            // パイプラインメトリクスの収集
            script {
                def duration = currentBuild.durationString
                echo "ビルド時間: \${duration}"
            }
        }
    }
}`,
      },
    ],
  },

  // ===== CI/CD実践 =====
  {
    id: "test-automation-strategy",
    title: "テスト自動化戦略",
    category: "practice",
    description:
      "テストピラミッド、カバレッジレポート、品質ゲートによるCI/CDの品質管理を学ぶ",
    sections: [
      {
        title: "テストピラミッドとCI戦略",
        content:
          "テストピラミッドは、単体テスト（多数・高速）→ 結合テスト（中程度）→ E2Eテスト（少数・低速）の3層構造で、下層ほど多く・高速に実行する戦略です。CI/CDでは、Pushのたびに単体テストを実行し、PRマージ時に結合テスト、デプロイ前にE2Eテストを実行する段階的アプローチが効果的です。各層のテストを適切に配分することで、フィードバックの速さとカバレッジのバランスを最適化します。",
        code: `# テストピラミッドに基づくCIワークフロー
name: テストピラミッド CI

on:
  push:
    branches: [ main, develop ]
  pull_request:

jobs:
  # 第1層：単体テスト（毎回実行・高速）
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
          cache: 'maven'
      - name: 単体テスト実行
        run: mvn test -B
      - name: テスト結果
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: unit-test-results
          path: target/surefire-reports/

  # 第2層：結合テスト（PR・mainのみ）
  integration-tests:
    needs: unit-tests
    if: github.event_name == 'pull_request' || github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_DB: testdb
          POSTGRES_USER: test
          POSTGRES_PASSWORD: test
        ports: [ '5432:5432' ]
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
      - name: 結合テスト実行
        run: mvn verify -P integration-test -B

  # 第3層：E2Eテスト（mainのみ）
  e2e-tests:
    needs: integration-tests
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: E2Eテスト実行
        run: mvn verify -P e2e -B`,
      },
      {
        title: "JaCoCoカバレッジレポート",
        content:
          "JaCoCoは、Javaのコードカバレッジを計測するための標準ツールです。Maven/Gradleプラグインとして組み込み、テスト実行時にカバレッジデータを収集します。CIパイプラインでJaCoCoレポートを生成し、PRにコメントとしてカバレッジ情報を自動投稿すれば、コードレビューの品質が向上します。カバレッジの閾値を設定し、基準を下回るとビルドを失敗させる品質ゲートとしても機能します。",
        code: `<!-- pom.xml - JaCoCo 設定 -->
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
        <!-- カバレッジ閾値チェック -->
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
                            <limit>
                                <counter>BRANCH</counter>
                                <value>COVEREDRATIO</value>
                                <minimum>0.70</minimum>
                            </limit>
                        </limits>
                    </rule>
                </rules>
            </configuration>
        </execution>
    </executions>
</plugin>

<!-- GitHub Actions でカバレッジレポートをPRにコメント -->
<!--
- name: JaCoCo カバレッジレポート
  uses: madrapps/jacoco-report@v1.6
  with:
    paths: target/site/jacoco/jacoco.xml
    token: \${{ secrets.GITHUB_TOKEN }}
    min-coverage-overall: 80
    min-coverage-changed-files: 90
-->`,
      },
      {
        title: "SonarQubeによる品質ゲート",
        content:
          "SonarQubeは、コードの品質とセキュリティを包括的に分析するプラットフォームです。バグ、脆弱性、コードスメル、重複コード、カバレッジを自動検出し、品質ゲート（Quality Gate）で基準を満たさないコードのマージを防止します。CIパイプラインにSonarQube解析を組み込むことで、継続的なコード品質の維持が可能になります。SonarCloudを使えばクラウドで手軽に利用できます。",
        code: `# SonarQube 解析を含むCIワークフロー
name: SonarQube Quality Gate

on:
  push:
    branches: [ main ]
  pull_request:

jobs:
  sonar:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
          cache: 'maven'

      - name: ビルドとテスト
        run: mvn clean verify -B

      - name: SonarQube 解析
        env:
          SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}
          SONAR_HOST_URL: \${{ vars.SONAR_HOST_URL }}
        run: |
          mvn sonar:sonar \\
            -Dsonar.host.url=\${SONAR_HOST_URL} \\
            -Dsonar.token=\${SONAR_TOKEN} \\
            -Dsonar.projectKey=my-java-app \\
            -Dsonar.qualitygate.wait=true

      # 品質ゲートの結果をチェック
      - name: 品質ゲート確認
        uses: SonarSource/sonarqube-quality-gate-action@master
        timeout-minutes: 5
        env:
          SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}

# --- sonar-project.properties ---
# sonar.projectKey=my-java-app
# sonar.projectName=My Java Application
# sonar.sources=src/main/java
# sonar.tests=src/test/java
# sonar.java.binaries=target/classes
# sonar.java.coveragePlugin=jacoco
# sonar.coverage.jacoco.xmlReportPaths=target/site/jacoco/jacoco.xml
# sonar.exclusions=**/config/**,**/dto/**`,
      },
      {
        title: "ミューテーションテスト",
        content:
          "ミューテーションテスト（変異テスト）は、ソースコードに意図的な変更（ミュータント）を加え、テストがその変更を検出できるかを検証する手法です。PITest はJava向けの代表的なミューテーションテストフレームワークで、テストスイートの品質を客観的に評価できます。カバレッジだけでは分からない「テストの有効性」を測定し、テスト改善のガイドラインを提供します。",
        code: `<!-- pom.xml - PITest 設定 -->
<plugin>
    <groupId>org.pitest</groupId>
    <artifactId>pitest-maven</artifactId>
    <version>1.16.1</version>
    <dependencies>
        <dependency>
            <groupId>org.pitest</groupId>
            <artifactId>pitest-junit5-plugin</artifactId>
            <version>1.2.1</version>
        </dependency>
    </dependencies>
    <configuration>
        <targetClasses>
            <param>com.myapp.service.*</param>
            <param>com.myapp.domain.*</param>
        </targetClasses>
        <targetTests>
            <param>com.myapp.*Test</param>
        </targetTests>
        <mutationThreshold>80</mutationThreshold>
        <coverageThreshold>90</coverageThreshold>
        <timestampedReports>false</timestampedReports>
        <outputFormats>
            <outputFormat>HTML</outputFormat>
            <outputFormat>XML</outputFormat>
        </outputFormats>
    </configuration>
</plugin>

<!-- CI での実行例 -->
<!--
name: Mutation Testing
on: [pull_request]
jobs:
  pitest:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
      - name: ミューテーションテスト実行
        run: mvn test pitest:mutationCoverage -B
      - name: レポートアップロード
        uses: actions/upload-artifact@v4
        with:
          name: pitest-report
          path: target/pit-reports/
-->`,
      },
      {
        title: "テスト結果の集約と可視化",
        content:
          "CI/CDパイプラインで生成されるテスト結果を集約・可視化することで、品質の傾向を継続的に把握できます。GitHub ActionsのJUnitレポートアクションを使えば、PRにテスト結果のサマリーを自動表示できます。Allure Reportを導入すれば、テスト履歴の推移、失敗パターンの分析、テストカテゴリ別の結果表示など、詳細な可視化が可能です。",
        code: `# テスト結果の集約と可視化ワークフロー
name: Test Reporting

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'
          cache: 'maven'

      - name: テスト実行（Allure対応）
        run: mvn clean test -B

      # JUnit レポート（PRサマリー表示）
      - name: JUnit レポート
        if: always()
        uses: dorny/test-reporter@v1
        with:
          name: JUnit テスト結果
          path: '**/surefire-reports/*.xml'
          reporter: java-junit

      # Allure レポート生成
      - name: Allure レポート取得
        if: always()
        uses: actions/checkout@v4
        with:
          ref: gh-pages
          path: gh-pages

      - name: Allure レポート生成
        if: always()
        uses: simple-elf/allure-report-action@master
        with:
          allure_results: target/allure-results
          allure_history: gh-pages/allure-history

      - name: GitHub Pages にデプロイ
        if: always() && github.ref == 'refs/heads/main'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
          publish_dir: allure-history
          publish_branch: gh-pages`,
      },
    ],
  },
  {
    id: "container-based-cicd",
    title: "コンテナベースCI/CD",
    category: "practice",
    description:
      "Docker in CI、マルチステージビルド、コンテナレジストリの活用方法を学ぶ",
    sections: [
      {
        title: "JavaアプリのDockerfile最適化",
        content:
          "JavaアプリケーションのDockerイメージは、マルチステージビルドで最適化します。第1ステージでMaven/Gradleによるビルドを行い、第2ステージではJREのみを含む軽量ベースイメージにJARをコピーします。これによりイメージサイズを大幅に削減し、ビルドツールや中間ファイルを最終イメージに含めない安全な構成になります。jlink でカスタムJREを作成すればさらに軽量化できます。",
        code: `# Dockerfile - マルチステージビルド
# ステージ1: ビルド
FROM maven:3.9-eclipse-temurin-21 AS builder
WORKDIR /app
COPY pom.xml .
# 依存関係のみ先にダウンロード（キャッシュ活用）
RUN mvn dependency:go-offline -B
COPY src ./src
RUN mvn clean package -DskipTests -B

# ステージ2: 実行環境（軽量イメージ）
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# セキュリティ：非rootユーザーで実行
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# JARファイルのみコピー
COPY --from=builder /app/target/*.jar app.jar

# ヘルスチェック設定
HEALTHCHECK --interval=30s --timeout=3s --retries=3 \\
  CMD wget -qO- http://localhost:8080/actuator/health || exit 1

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

# --- jlink でカスタムJREを作る場合 ---
# FROM eclipse-temurin:21-jdk-alpine AS jre-builder
# RUN jlink --add-modules java.base,java.logging,java.sql, \\
#       java.naming,java.management,java.instrument, \\
#       java.desktop,java.security.jgss \\
#       --strip-debug --no-man-pages \\
#       --output /custom-jre
#
# FROM alpine:3.19
# COPY --from=jre-builder /custom-jre /opt/java
# ENV PATH="/opt/java/bin:\$PATH"`,
      },
      {
        title: "CIでのDockerビルドとキャッシュ",
        content:
          "CI環境でのDockerビルドは、適切なキャッシュ戦略で大幅に高速化できます。GitHub Actionsでは docker/build-push-action の cache-from/cache-to オプションでGitHub Actions Cache（GHA）やレジストリキャッシュを利用できます。BuildKitのインラインキャッシュやレイヤーキャッシュを活用し、変更のないレイヤーの再ビルドを防止します。",
        code: `name: Docker Build with Cache

on:
  push:
    branches: [ main ]
  pull_request:

jobs:
  docker-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Docker Buildx セットアップ
        uses: docker/setup-buildx-action@v3

      - name: レジストリログイン
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      # 方法1: GitHub Actions Cache を利用
      - name: ビルド（GHA キャッシュ）
        uses: docker/build-push-action@v5
        with:
          context: .
          push: false
          tags: myapp:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max

      # 方法2: レジストリキャッシュを利用
      - name: ビルド（レジストリキャッシュ）
        uses: docker/build-push-action@v5
        with:
          context: .
          push: true
          tags: ghcr.io/myorg/myapp:latest
          cache-from: type=registry,ref=ghcr.io/myorg/myapp:cache
          cache-to: type=registry,ref=ghcr.io/myorg/myapp:cache,mode=max

      # 方法3: ローカルキャッシュ
      - name: ビルド（ローカルキャッシュ）
        uses: docker/build-push-action@v5
        with:
          context: .
          push: false
          tags: myapp:latest
          cache-from: type=local,src=/tmp/.buildx-cache
          cache-to: type=local,dest=/tmp/.buildx-cache-new,mode=max

      # キャッシュローテーション
      - name: キャッシュ更新
        run: |
          rm -rf /tmp/.buildx-cache
          mv /tmp/.buildx-cache-new /tmp/.buildx-cache`,
      },
      {
        title: "Docker Composeによるテスト環境構築",
        content:
          "CI環境でDocker Composeを使えば、データベースやメッセージキューなどの外部依存サービスを含むテスト環境を簡単に構築できます。docker-compose.test.yml を用意してテスト用の設定を分離し、テスト実行後にコンテナを自動的にクリーンアップします。Testcontainersライブラリを使えば、Javaコード内からプログラマティカルにコンテナを管理することも可能です。",
        code: `# docker-compose.test.yml
version: '3.8'
services:
  app:
    build:
      context: .
      target: builder
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    environment:
      SPRING_DATASOURCE_URL: jdbc:postgresql://postgres:5432/testdb
      SPRING_DATASOURCE_USERNAME: test
      SPRING_DATASOURCE_PASSWORD: test
      SPRING_REDIS_HOST: redis
    command: mvn verify -P integration-test -B

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: testdb
      POSTGRES_USER: test
      POSTGRES_PASSWORD: test
    healthcheck:
      test: [ "CMD-SHELL", "pg_isready -U test" ]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    healthcheck:
      test: [ "CMD", "redis-cli", "ping" ]
      interval: 5s
      timeout: 5s
      retries: 5

# --- GitHub Actions での利用 ---
# jobs:
#   integration-test:
#     runs-on: ubuntu-latest
#     steps:
#       - uses: actions/checkout@v4
#       - name: 結合テスト実行
#         run: |
#           docker compose -f docker-compose.test.yml up \\
#             --build --abort-on-container-exit \\
#             --exit-code-from app
#       - name: クリーンアップ
#         if: always()
#         run: docker compose -f docker-compose.test.yml down -v`,
      },
      {
        title: "コンテナセキュリティスキャン",
        content:
          "コンテナイメージにはOSパッケージやライブラリの脆弱性が含まれる可能性があるため、CI/CDパイプラインにセキュリティスキャンを組み込むことが重要です。Trivy はAqua Securityが開発するOSSの脆弱性スキャナーで、コンテナイメージ、ファイルシステム、IaCファイルの脆弱性を検出できます。CRITICALやHIGHの脆弱性が見つかった場合にビルドを失敗させる品質ゲートとして機能させます。",
        code: `name: Container Security Scan

on:
  push:
    branches: [ main ]
  pull_request:

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # Docker イメージビルド
      - name: Docker ビルド
        run: docker build -t myapp:scan .

      # Trivy によるイメージスキャン
      - name: Trivy 脆弱性スキャン
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'myapp:scan'
          format: 'sarif'
          output: 'trivy-results.sarif'
          severity: 'CRITICAL,HIGH'
          exit-code: '1'

      # 結果を GitHub Security に連携
      - name: セキュリティ結果アップロード
        if: always()
        uses: github/codeql-action/upload-sarif@v3
        with:
          sarif_file: 'trivy-results.sarif'

      # Trivy による依存関係スキャン
      - name: 依存関係スキャン
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'table'
          severity: 'CRITICAL,HIGH'
          exit-code: '1'

      # Trivy による IaC スキャン
      - name: IaC セキュリティチェック
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'config'
          scan-ref: '.'
          format: 'table'
          severity: 'CRITICAL,HIGH'`,
      },
      {
        title: "マルチアーキテクチャビルド",
        content:
          "クラウドネイティブ環境では、AMD64とARM64の両方に対応したマルチアーキテクチャイメージが求められます。Docker BuildxとQEMUを使えば、GitHub Actions上でクロスプラットフォームビルドが可能です。docker/build-push-action の platforms パラメータで対象アーキテクチャを指定し、マニフェストリストとして1つのタグで複数アーキテクチャをサポートするイメージをPushできます。",
        code: `name: Multi-Architecture Build

on:
  push:
    tags: [ 'v*' ]

jobs:
  multi-arch:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # QEMU セットアップ（クロスプラットフォーム対応）
      - name: QEMU セットアップ
        uses: docker/setup-qemu-action@v3

      # Buildx セットアップ
      - name: Docker Buildx セットアップ
        uses: docker/setup-buildx-action@v3

      - name: レジストリログイン
        uses: docker/login-action@v3
        with:
          registry: ghcr.io
          username: \${{ github.actor }}
          password: \${{ secrets.GITHUB_TOKEN }}

      - name: メタデータ設定
        id: meta
        uses: docker/metadata-action@v5
        with:
          images: ghcr.io/myorg/myapp
          tags: |
            type=semver,pattern={{version}}
            type=semver,pattern={{major}}.{{minor}}

      # マルチアーキテクチャビルド＆プッシュ
      - name: マルチアーキテクチャビルド
        uses: docker/build-push-action@v5
        with:
          context: .
          platforms: linux/amd64,linux/arm64
          push: true
          tags: \${{ steps.meta.outputs.tags }}
          labels: \${{ steps.meta.outputs.labels }}
          cache-from: type=gha
          cache-to: type=gha,mode=max

      # イメージの検証
      - name: マニフェスト確認
        run: |
          docker manifest inspect ghcr.io/myorg/myapp:\${{ steps.meta.outputs.version }}`,
      },
    ],
  },
  {
    id: "monitoring-and-notification",
    title: "モニタリングと通知",
    category: "practice",
    description:
      "Slack通知、デプロイ追跡、ロールバック戦略によるCI/CDの運用管理を学ぶ",
    sections: [
      {
        title: "Slack通知の設定",
        content:
          "CI/CDパイプラインの結果をSlackに通知することで、チーム全体がビルド・デプロイの状況をリアルタイムに把握できます。GitHub ActionsではSlack Incoming Webhookを使った通知が一般的です。成功・失敗の色分け、コミット情報やPRリンクの付与、メンション機能を活用して、必要な人に適切な情報を届けます。",
        code: `name: CI with Slack Notification

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'

      - name: ビルドとテスト
        run: mvn clean verify -B

  notify:
    needs: build
    if: always()
    runs-on: ubuntu-latest
    steps:
      # 方法1: Slack Incoming Webhook
      - name: Slack 通知
        uses: slackapi/slack-github-action@v1.26
        with:
          payload: |
            {
              "blocks": [
                {
                  "type": "header",
                  "text": {
                    "type": "plain_text",
                    "text": "\${{ needs.build.result == 'success' && 'ビルド成功' || 'ビルド失敗' }}"
                  }
                },
                {
                  "type": "section",
                  "fields": [
                    {
                      "type": "mrkdwn",
                      "text": "*リポジトリ:*\\n\${{ github.repository }}"
                    },
                    {
                      "type": "mrkdwn",
                      "text": "*ブランチ:*\\n\${{ github.ref_name }}"
                    },
                    {
                      "type": "mrkdwn",
                      "text": "*コミット:*\\n\${{ github.event.head_commit.message }}"
                    },
                    {
                      "type": "mrkdwn",
                      "text": "*実行者:*\\n\${{ github.actor }}"
                    }
                  ]
                },
                {
                  "type": "actions",
                  "elements": [
                    {
                      "type": "button",
                      "text": { "type": "plain_text", "text": "ワークフローを確認" },
                      "url": "\${{ github.server_url }}/\${{ github.repository }}/actions/runs/\${{ github.run_id }}"
                    }
                  ]
                }
              ]
            }
        env:
          SLACK_WEBHOOK_URL: \${{ secrets.SLACK_WEBHOOK_URL }}
          SLACK_WEBHOOK_TYPE: INCOMING_WEBHOOK`,
      },
      {
        title: "デプロイ追跡とGitHub Deployments",
        content:
          "GitHub Deployments APIを使えば、デプロイの状態をGitHubのUI上で追跡できます。デプロイ開始時にdeploymentを作成し、成功・失敗に応じてステータスを更新します。これによりPRやコミットに対してどの環境にデプロイ済みかが一目で分かり、チーム全体のデプロイ状況の可視性が向上します。Environment機能と組み合わせれば、デプロイ履歴の管理も容易です。",
        code: `name: Deploy with Tracking

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://myapp.example.com
    steps:
      - uses: actions/checkout@v4

      # デプロイ開始を記録
      - name: デプロイ開始通知
        uses: bobheadxi/deployments@v1
        id: deployment
        with:
          step: start
          token: \${{ secrets.GITHUB_TOKEN }}
          env: production

      # ビルドとデプロイ
      - uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'

      - name: ビルド
        run: mvn clean package -DskipTests -B

      - name: デプロイ実行
        id: deploy-step
        run: |
          echo "Deploying to production..."
          ./deploy.sh production
          echo "deploy-url=https://myapp.example.com" >> "\$GITHUB_OUTPUT"

      # デプロイ結果を記録
      - name: デプロイ結果更新
        uses: bobheadxi/deployments@v1
        if: always()
        with:
          step: finish
          token: \${{ secrets.GITHUB_TOKEN }}
          status: \${{ job.status }}
          deployment_id: \${{ steps.deployment.outputs.deployment_id }}
          env_url: \${{ steps.deploy-step.outputs.deploy-url }}

      # デプロイ情報をアノテーション
      - name: デプロイサマリー
        if: success()
        run: |
          echo "## デプロイ完了" >> "\$GITHUB_STEP_SUMMARY"
          echo "- **環境:** production" >> "\$GITHUB_STEP_SUMMARY"
          echo "- **コミット:** \${{ github.sha }}" >> "\$GITHUB_STEP_SUMMARY"
          echo "- **時刻:** $(date '+%Y-%m-%d %H:%M:%S JST')" >> "\$GITHUB_STEP_SUMMARY"
          echo "- **URL:** https://myapp.example.com" >> "\$GITHUB_STEP_SUMMARY"`,
      },
      {
        title: "自動ロールバック戦略",
        content:
          "デプロイ後に障害が発生した場合の自動ロールバック機構は、CI/CD運用の安全ネットです。ヘルスチェックでデプロイ後のアプリケーション状態を確認し、異常検知時に前のバージョンに自動的に戻す仕組みを構築します。Blue-Greenデプロイやカナリアリリースと組み合わせることで、影響範囲を最小化しつつ安全にリリースできます。",
        code: `name: Deploy with Auto Rollback

on:
  push:
    branches: [ main ]

env:
  APP_URL: https://myapp.example.com

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      # 現在のバージョンを記録（ロールバック用）
      - name: 現在のバージョンを取得
        id: current
        run: |
          CURRENT_VERSION=$(curl -s \${{ env.APP_URL }}/actuator/info | jq -r '.build.version')
          echo "version=\${CURRENT_VERSION}" >> "\$GITHUB_OUTPUT"
          echo "現在のバージョン: \${CURRENT_VERSION}"

      # デプロイ実行
      - name: デプロイ
        id: deploy
        run: |
          echo "新バージョンをデプロイ中..."
          ./deploy.sh production

      # ヘルスチェック
      - name: ヘルスチェック
        id: health-check
        run: |
          echo "ヘルスチェック開始..."
          MAX_RETRIES=10
          RETRY_INTERVAL=15

          for i in $(seq 1 \$MAX_RETRIES); do
            STATUS=$(curl -s -o /dev/null -w "%{http_code}" \${{ env.APP_URL }}/actuator/health)
            if [ "\$STATUS" = "200" ]; then
              echo "ヘルスチェック成功（試行 \$i/\$MAX_RETRIES）"
              echo "healthy=true" >> "\$GITHUB_OUTPUT"
              exit 0
            fi
            echo "ヘルスチェック失敗（試行 \$i/\$MAX_RETRIES）: HTTP \$STATUS"
            sleep \$RETRY_INTERVAL
          done

          echo "healthy=false" >> "\$GITHUB_OUTPUT"
          exit 1

      # ロールバック実行
      - name: ロールバック
        if: failure() && steps.deploy.outcome == 'success'
        run: |
          echo "デプロイ失敗 - ロールバック開始"
          PREVIOUS_VERSION="\${{ steps.current.outputs.version }}"
          echo "バージョン \${PREVIOUS_VERSION} にロールバック中..."
          ./rollback.sh "\${PREVIOUS_VERSION}"

      # ロールバック通知
      - name: ロールバック通知
        if: failure()
        uses: slackapi/slack-github-action@v1.26
        with:
          payload: |
            {
              "text": "ロールバック実行: \${{ github.repository }} のデプロイ失敗。バージョン \${{ steps.current.outputs.version }} にロールバックしました。"
            }
        env:
          SLACK_WEBHOOK_URL: \${{ secrets.SLACK_WEBHOOK_URL }}
          SLACK_WEBHOOK_TYPE: INCOMING_WEBHOOK`,
      },
      {
        title: "デプロイメトリクスの収集",
        content:
          "Four Keys（デプロイ頻度、変更リードタイム、変更失敗率、復旧時間）はDevOpsのパフォーマンスを測る重要指標です。GitHub ActionsのワークフローデータとGitHub APIを組み合わせて、これらのメトリクスを自動収集し、チームの改善サイクルに活用できます。収集したメトリクスをダッシュボードに可視化し、継続的な改善の判断材料にします。",
        code: `name: Deployment Metrics

on:
  workflow_run:
    workflows: [ "Deploy" ]
    types: [ completed ]

jobs:
  collect-metrics:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: デプロイメトリクス収集
        uses: actions/github-script@v7
        with:
          script: |
            // デプロイ頻度の計算
            const deployments = await github.rest.repos.listDeployments({
              owner: context.repo.owner,
              repo: context.repo.repo,
              environment: 'production',
              per_page: 100
            });

            const now = new Date();
            const thirtyDaysAgo = new Date(now - 30 * 24 * 60 * 60 * 1000);
            const recentDeploys = deployments.data.filter(
              d => new Date(d.created_at) > thirtyDaysAgo
            );

            // 変更リードタイム（コミットからデプロイまで）
            const leadTimes = [];
            for (const deploy of recentDeploys.slice(0, 10)) {
              const commit = await github.rest.repos.getCommit({
                owner: context.repo.owner,
                repo: context.repo.repo,
                ref: deploy.sha
              });
              const commitTime = new Date(commit.data.commit.committer.date);
              const deployTime = new Date(deploy.created_at);
              leadTimes.push((deployTime - commitTime) / 3600000);
            }

            const avgLeadTime = leadTimes.length > 0
              ? (leadTimes.reduce((a, b) => a + b, 0) / leadTimes.length).toFixed(1)
              : 'N/A';

            // サマリー出力
            const summary = [
              '## デプロイメトリクス（過去30日間）',
              '',
              '| 指標 | 値 |',
              '|------|-----|',
              \`| デプロイ頻度 | \${recentDeploys.length}回/月 |\`,
              \`| 平均リードタイム | \${avgLeadTime}時間 |\`,
              \`| 最終デプロイ | \${recentDeploys[0]?.created_at || 'N/A'} |\`,
            ].join('\\n');

            core.summary.addRaw(summary).write();

      # メトリクスをDatadog等に送信
      - name: メトリクス送信
        if: vars.DATADOG_API_KEY != ''
        env:
          DD_API_KEY: \${{ secrets.DATADOG_API_KEY }}
        run: |
          curl -X POST "https://api.datadoghq.com/api/v1/series" \\
            -H "Content-Type: application/json" \\
            -H "DD-API-KEY: \${DD_API_KEY}" \\
            -d '{
              "series": [{
                "metric": "cicd.deploy.count",
                "points": [['$(date +%s)', 1]],
                "tags": ["env:production", "repo:\${{ github.repository }}"]
              }]
            }'`,
      },
      {
        title: "GitHub Actionsのセキュリティベストプラクティス",
        content:
          "CI/CDパイプラインのセキュリティは、ソフトウェアサプライチェーン全体の安全性に直結します。サードパーティアクションはコミットSHAで固定し、最小権限の原則でpermissionsを設定します。シークレットの適切な管理、依存関係の脆弱性スキャン、SLSA準拠のアーティファクト署名などを組み合わせて、安全なCI/CDパイプラインを構築します。",
        code: `name: Secure CI Pipeline

on:
  push:
    branches: [ main ]

# ワークフローレベルで最小権限を設定
permissions:
  contents: read

jobs:
  secure-build:
    runs-on: ubuntu-latest

    # ジョブレベルで必要な権限のみ付与
    permissions:
      contents: read
      packages: write
      security-events: write

    steps:
      # アクションはSHAで固定（タグは改ざん可能）
      - uses: actions/checkout@b4ffde65f46336ab88eb53be808477a3936bae11 # v4.1.1

      - uses: actions/setup-java@99b8673ff64fbf99d8d325f52d9a5bdedb8483e9 # v4.2.1
        with:
          java-version: '21'
          distribution: 'temurin'

      # 依存関係の脆弱性チェック
      - name: OWASP Dependency Check
        run: mvn dependency-check:check -B

      # ビルド
      - name: ビルド
        run: mvn clean package -DskipTests -B

      # SBOMの生成（ソフトウェア部品表）
      - name: SBOM 生成
        run: mvn org.cyclonedx:cyclonedx-maven-plugin:makeBom -B

      - name: SBOM アップロード
        uses: actions/upload-artifact@a8a3f3ad30e3422c9c7b888a15615d19a852ae32 # v3
        with:
          name: sbom
          path: target/bom.json

      # アーティファクト署名
      - name: Cosign でイメージ署名
        if: github.ref == 'refs/heads/main'
        uses: sigstore/cosign-installer@59acb6260d9c0ba8f4a2f9d9b48431a222b68e20 # v3
      # cosign sign --key env://COSIGN_PRIVATE_KEY ghcr.io/myorg/myapp:latest

# --- .github/dependabot.yml ---
# version: 2
# updates:
#   - package-ecosystem: "github-actions"
#     directory: "/"
#     schedule:
#       interval: "weekly"
#   - package-ecosystem: "maven"
#     directory: "/"
#     schedule:
#       interval: "weekly"`,
      },
    ],
  },
];
