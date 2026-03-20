export type CicdLevel = "github-actions" | "jenkins" | "practice";

export interface CicdQuizQuestion {
  id: string;
  question: string;
  choices: { label: string; text: string }[];
  correctLabel: string;
  explanation: string;
  code?: string;
  level: CicdLevel;
  chapter: string;
}

export const cicdQuizQuestions: CicdQuizQuestion[] = [
  // ════════════════════════════════════════
  // github-actions: GitHub Actions (github-actions) 6問
  // ════════════════════════════════════════
  {
    id: "github-actions-q01",
    question: "GitHub Actionsのワークフローファイルを配置する正しいディレクトリはどれですか？",
    choices: [
      { label: "A", text: ".github/actions/" },
      { label: "B", text: ".github/workflows/" },
      { label: "C", text: ".ci/workflows/" },
      { label: "D", text: "github/actions/" },
    ],
    correctLabel: "B",
    explanation:
      "GitHub Actionsのワークフローファイルは .github/workflows/ ディレクトリにYAML形式で配置します。ファイル名は自由ですが、ci.ymlやbuild.ymlなど目的がわかる名前が推奨されます。",
    level: "github-actions",
    chapter: "github-actions",
  },
  {
    id: "github-actions-q02",
    question: "GitHub Actionsでプルリクエスト作成時とmainブランチへのプッシュ時にワークフローを実行するトリガー設定として正しいものはどれですか？",
    choices: [
      { label: "A", text: "trigger: [push, pull_request]" },
      { label: "B", text: "on:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]" },
      { label: "C", text: "events: [push, pull_request]" },
      { label: "D", text: "run_on: push, pull_request" },
    ],
    correctLabel: "B",
    explanation:
      "GitHub Actionsではonキーワードでトリガーイベントを定義します。pushとpull_requestで対象ブランチを指定することで、不要なブランチでの実行を防ぎリソースを節約できます。",
    code: "on:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]",
    level: "github-actions",
    chapter: "github-actions",
  },
  {
    id: "github-actions-q03",
    question: "GitHub Actionsでジョブ間の依存関係を定義するキーワードはどれですか？",
    choices: [
      { label: "A", text: "depends_on" },
      { label: "B", text: "requires" },
      { label: "C", text: "needs" },
      { label: "D", text: "after" },
    ],
    correctLabel: "C",
    explanation:
      "needsキーワードで前提ジョブを指定すると、そのジョブが成功した後にのみ実行されます。needsを指定しないジョブは並列実行されます。例えばbuildジョブ成功後にdeployジョブを実行する場合に使います。",
    code: "jobs:\n  build:\n    runs-on: ubuntu-latest\n    steps: ...\n  deploy:\n    needs: build\n    runs-on: ubuntu-latest\n    steps: ...",
    level: "github-actions",
    chapter: "github-actions",
  },
  {
    id: "github-actions-q04",
    question: "GitHub Actionsでシークレット（APIキー等）を安全に扱う方法として正しいものはどれですか？",
    choices: [
      { label: "A", text: "ワークフローファイルに直接記述する" },
      { label: "B", text: "リポジトリのSettingsでSecretsとして登録し、secrets.SECRET_NAMEで参照する" },
      { label: "C", text: ".envファイルをリポジトリにコミットする" },
      { label: "D", text: "READMEに記載する" },
    ],
    correctLabel: "B",
    explanation:
      "GitHub SecretsはリポジトリのSettings > Secrets and variablesで登録し、ワークフロー内で \\${{ secrets.SECRET_NAME }} として参照します。ログにはマスクされて表示されるため安全です。直接記述や.envファイルのコミットはセキュリティリスクです。",
    level: "github-actions",
    chapter: "github-actions",
  },
  {
    id: "github-actions-q05",
    question: "GitHub Actionsのmatrix strategyの用途として正しいものはどれですか？",
    choices: [
      { label: "A", text: "テスト結果をマトリックス表示する" },
      { label: "B", text: "複数のOS・言語バージョンの組み合わせで並列テストを実行する" },
      { label: "C", text: "ジョブの実行順序をランダムにする" },
      { label: "D", text: "ジョブの失敗時にリトライする" },
    ],
    correctLabel: "B",
    explanation:
      "matrix strategyは複数のパラメータの組み合わせ（OS、Javaバージョン等）で並列にジョブを実行します。例えばJava 17と21、Ubuntu とWindowsの組み合わせで4つのジョブを同時実行でき、クロスプラットフォーム対応の検証に最適です。",
    code: "strategy:\n  matrix:\n    java-version: [17, 21]\n    os: [ubuntu-latest, windows-latest]",
    level: "github-actions",
    chapter: "github-actions",
  },
  {
    id: "github-actions-q06",
    question: "GitHub Actionsでビルドキャッシュを利用してCI実行時間を短縮する方法として正しいものはどれですか？",
    choices: [
      { label: "A", text: "actions/cacheアクションで依存関係をキャッシュする" },
      { label: "B", text: "ジョブのtimeoutを短く設定する" },
      { label: "C", text: "ステップ数を減らす" },
      { label: "D", text: "self-hosted runnerを必ず使う" },
    ],
    correctLabel: "A",
    explanation:
      "actions/cacheアクションやsetup-javaアクションのcacheオプションで、Maven/Gradleの依存関係をキャッシュできます。2回目以降の実行でダウンロードをスキップし、CI実行時間を大幅に短縮できます。",
    code: "- uses: actions/setup-java@v4\n  with:\n    distribution: 'temurin'\n    java-version: '21'\n    cache: 'maven'",
    level: "github-actions",
    chapter: "github-actions",
  },
  // ════════════════════════════════════════
  // jenkins: Jenkins (jenkins) 4問
  // ════════════════════════════════════════
  {
    id: "jenkins-q01",
    question: "JenkinsのDeclarative PipelineとScripted Pipelineの違いとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "Declarativeは自由度が高く、Scriptedは構造化されている" },
      { label: "B", text: "Declarativeはpipeline {}ブロックで構造化され、Scriptedはnode {}で自由に記述できる" },
      { label: "C", text: "両者に違いはない" },
      { label: "D", text: "Scripted PipelineはJenkins 2で廃止された" },
    ],
    correctLabel: "B",
    explanation:
      "Declarative Pipelineはpipeline {}ブロック内で構造化された記法を使い、初心者にも読みやすい形式です。Scripted PipelineはGroovyスクリプトとしてnode {}内に自由に記述でき柔軟性が高いですが可読性は劣ります。新規プロジェクトではDeclarativeが推奨されます。",
    code: "pipeline {\n    agent any\n    stages {\n        stage('Build') {\n            steps {\n                sh 'mvn clean package'\n            }\n        }\n    }\n}",
    level: "jenkins",
    chapter: "jenkins",
  },
  {
    id: "jenkins-q02",
    question: "Jenkinsfileをリポジトリに含める（Pipeline as Code）利点として最も適切なものはどれですか？",
    choices: [
      { label: "A", text: "JenkinsのUI操作が不要になる" },
      { label: "B", text: "パイプライン定義がバージョン管理され、コードレビューが可能になる" },
      { label: "C", text: "ビルド速度が向上する" },
      { label: "D", text: "プラグインが不要になる" },
    ],
    correctLabel: "B",
    explanation:
      "JenkinsfileをGitリポジトリに含めることで、パイプライン定義がバージョン管理の対象となり変更履歴が追跡できます。プルリクエストによるコードレビューも可能になり、パイプラインの変更品質が向上します。",
    level: "jenkins",
    chapter: "jenkins",
  },
  {
    id: "jenkins-q03",
    question: "Jenkinsのエージェント（Agent）の役割として正しいものはどれですか？",
    choices: [
      { label: "A", text: "ユーザー認証を管理する" },
      { label: "B", text: "ビルドやテストの実行環境を提供する" },
      { label: "C", text: "プラグインの管理を行う" },
      { label: "D", text: "ログの保存を行う" },
    ],
    correctLabel: "B",
    explanation:
      "JenkinsのエージェントはController（旧Master）から指示を受けてビルドやテストを実行するマシンです。Dockerコンテナやクラウドインスタンスをエージェントとして動的に起動することも可能です。負荷分散やビルド環境の分離に活用されます。",
    level: "jenkins",
    chapter: "jenkins",
  },
  {
    id: "jenkins-q04",
    question: "Jenkinsパイプラインで環境変数を定義する正しい方法はどれですか？",
    choices: [
      { label: "A", text: "variables {} ブロック内で定義する" },
      { label: "B", text: "environment {} ブロック内で定義する" },
      { label: "C", text: "config {} ブロック内で定義する" },
      { label: "D", text: "params {} ブロック内で定義する" },
    ],
    correctLabel: "B",
    explanation:
      "Declarative Pipelineではenvironment {}ブロックでパイプライン全体またはステージ単位の環境変数を定義できます。credentials()関数で認証情報を安全に環境変数に設定することも可能です。",
    code: "pipeline {\n    agent any\n    environment {\n        JAVA_HOME = '/usr/lib/jvm/java-21'\n        DB_CREDENTIALS = credentials('db-creds')\n    }\n    stages { ... }\n}",
    level: "jenkins",
    chapter: "jenkins",
  },
  // ════════════════════════════════════════
  // practice: CI/CD実践 (cicd-practice) 5問
  // ════════════════════════════════════════
  {
    id: "cicd-practice-q01",
    question: "CI（継続的インテグレーション）の主な目的として最も適切なものはどれですか？",
    choices: [
      { label: "A", text: "本番環境への自動デプロイ" },
      { label: "B", text: "コード変更を頻繁に統合し、早期にバグを検出する" },
      { label: "C", text: "手動テストを自動化する" },
      { label: "D", text: "コードレビューを不要にする" },
    ],
    correctLabel: "B",
    explanation:
      "CIは開発者がコード変更を頻繁にメインブランチに統合し、自動ビルド・テストにより早期にバグを検出するプラクティスです。CDは本番環境への自動デプロイを指します。CIにより統合時の問題を小さく保ち、品質を維持できます。",
    level: "practice",
    chapter: "cicd-practice",
  },
  {
    id: "cicd-practice-q02",
    question: "CD（継続的デリバリー）と継続的デプロイの違いとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "両者は全く同じ概念である" },
      { label: "B", text: "継続的デリバリーは手動承認後にデプロイ、継続的デプロイは完全自動でデプロイ" },
      { label: "C", text: "継続的デプロイは手動承認後にデプロイ、継続的デリバリーは完全自動" },
      { label: "D", text: "継続的デリバリーはテストを含まない" },
    ],
    correctLabel: "B",
    explanation:
      "継続的デリバリー（Continuous Delivery）はいつでもデプロイ可能な状態を維持しつつ、本番デプロイは手動承認を経て行います。継続的デプロイ（Continuous Deployment）はテスト通過後に自動的に本番デプロイまで行います。",
    level: "practice",
    chapter: "cicd-practice",
  },
  {
    id: "cicd-practice-q03",
    question: "CIパイプラインにおけるテストの実行順序として最も効率的なものはどれですか？",
    choices: [
      { label: "A", text: "E2Eテスト → 統合テスト → ユニットテスト" },
      { label: "B", text: "ユニットテスト → 統合テスト → E2Eテスト" },
      { label: "C", text: "全てのテストを並列実行する" },
      { label: "D", text: "テストの順序は重要ではない" },
    ],
    correctLabel: "B",
    explanation:
      "CIパイプラインでは実行速度が速いユニットテストを最初に実行し、早期フィードバックを得ます。次に統合テスト、最後にE2Eテストを実行します。早い段階で失敗を検出すれば、コストの高いテストの実行を回避でき効率的です。",
    level: "practice",
    chapter: "cicd-practice",
  },
  {
    id: "cicd-practice-q04",
    question: "ブルーグリーンデプロイメントの特徴として正しいものはどれですか？",
    choices: [
      { label: "A", text: "新バージョンを段階的に一部のユーザーに公開する" },
      { label: "B", text: "本番環境と同一の環境を2つ用意し、切り替えによってダウンタイムゼロでデプロイする" },
      { label: "C", text: "1台ずつサーバーを更新するローリングアップデート" },
      { label: "D", text: "新旧バージョンを同時に稼働させ、A/Bテストを行う" },
    ],
    correctLabel: "B",
    explanation:
      "ブルーグリーンデプロイメントは本番（Blue）と同一構成のスタンバイ環境（Green）を用意し、新バージョンをGreenにデプロイ後、ロードバランサーでトラフィックを切り替えます。問題があれば即座にBlueに戻せるため、ダウンタイムとリスクを最小化できます。",
    level: "practice",
    chapter: "cicd-practice",
  },
  {
    id: "cicd-practice-q05",
    question: "Infrastructure as Code（IaC）の利点として最も適切なものはどれですか？",
    choices: [
      { label: "A", text: "手動でのサーバー設定が速くなる" },
      { label: "B", text: "インフラの構成をコードで管理し、再現性・バージョン管理・自動化が可能になる" },
      { label: "C", text: "サーバーのハードウェアコストが削減される" },
      { label: "D", text: "セキュリティパッチが自動適用される" },
    ],
    correctLabel: "B",
    explanation:
      "IaCはTerraformやAWS CloudFormation等を使い、インフラ構成をコードとして記述・管理します。これにより環境の再現性が保証され、Gitでバージョン管理でき、CI/CDパイプラインでの自動構築も可能になります。手動設定による人的ミスも防止できます。",
    level: "practice",
    chapter: "cicd-practice",
  },
];
