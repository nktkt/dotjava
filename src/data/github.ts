export interface GitHubSection {
  title: string;
  content: string;
  code?: string;
}

export interface GitHubChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: GitHubSection[];
}

export const githubCategories = [
  { id: "overview", name: "GitHubとは", color: "#24292F", darkColor: "#8B949E" },
  { id: "account", name: "アカウントと設定", color: "#2563EB" },
  { id: "repo", name: "リポジトリ管理", color: "#059669" },
  { id: "collaboration", name: "コラボレーション", color: "#7C3AED" },
  { id: "project", name: "プロジェクト管理", color: "#D97706" },
  { id: "pages-wiki", name: "Pages・Wiki・Discussions", color: "#0891B2" },
  { id: "security", name: "セキュリティ", color: "#DC2626" },
  { id: "actions", name: "GitHub Actions", color: "#2088FF" },
  { id: "advanced", name: "高度な機能", color: "#9333EA" },
] as const;

export const githubChapters: GitHubChapter[] = [
  // ===== GitHubとは =====
  {
    id: "what-is-github",
    title: "GitHubの概要",
    category: "overview",
    description: "GitHubの役割、GitとGitHubの違い、主要な機能",
    sections: [
      {
        title: "GitHubとは何か",
        content:
          "GitHubは世界最大のソースコードホスティングサービスです。Gitのリポジトリをクラウド上に保管し、チーム開発、コードレビュー、プロジェクト管理、CI/CDなどの機能を提供します。オープンソースプロジェクトの中心地であり、1億人以上の開発者が利用しています。",
        code: `# Git と GitHub の違い
#
# Git:
#   - 分散バージョン管理システム（ツール）
#   - ローカルで動作する
#   - コマンドラインで操作
#   - Linus Torvalds が開発
#
# GitHub:
#   - Git リポジトリのホスティングサービス（プラットフォーム）
#   - クラウド上で動作
#   - Web UI / API / CLI で操作
#   - Microsoft が運営

# GitHub の主要機能
# ┌─────────────────────────────────────┐
# │ リポジトリ    : コードの保管・共有    │
# │ Pull Request  : コードレビュー・マージ │
# │ Issues        : バグ・タスク管理      │
# │ Actions       : CI/CD 自動化         │
# │ Projects      : プロジェクト管理      │
# │ Packages      : パッケージレジストリ   │
# │ Pages         : 静的サイトホスティング │
# │ Copilot       : AI コーディング支援   │
# │ Codespaces    : クラウド開発環境      │
# │ Security      : 脆弱性検出・管理      │
# └─────────────────────────────────────┘

# プランの比較
# Free:       無制限パブリック/プライベートリポジトリ
# Pro:        高度なツール、2000分/月 Actions
# Team:       チーム管理、3000分/月 Actions
# Enterprise: SAML SSO、50000分/月 Actions`,
      },
      {
        title: "GitHubのUI構成",
        content:
          "GitHubのWebインターフェースは直感的に設計されています。リポジトリページではコード、Issues、Pull Requests、Actions、Projects、Wiki、Settings などのタブからすべての機能にアクセスできます。",
        code: `# リポジトリページの構成（タブ）
#
# <> Code        : ソースコード、README 表示
# ○ Issues       : バグ報告、機能リクエスト
# ↗ Pull requests: コードレビュー、マージ
# ▷ Actions      : CI/CD ワークフロー
# ⊞ Projects     : カンバン・タスクボード
# ◉ Wiki         : ドキュメント
# ⚙ Settings     : リポジトリ設定

# ユーザーダッシュボード
# - フィード: フォロー中の活動
# - リポジトリ一覧
# - Pull Requests / Issues の一覧
# - Explore: 新しいプロジェクトの発見
# - Notifications: 通知管理

# プロフィールページ
# - ピンされたリポジトリ（最大6つ）
# - コントリビューションカレンダー（草）
# - README（プロフィール表示）
# - アクティビティ概要

# 検索
# 検索バー: リポジトリ、コード、ユーザー、Issue を横断検索
# 例: "language:java stars:>100 topic:spring-boot"
# 例: "is:issue is:open label:bug"
# 例: "org:apache filename:pom.xml"`,
      },
    ],
  },
  // ===== アカウントと設定 =====
  {
    id: "account-setup",
    title: "アカウントの作成と初期設定",
    category: "account",
    description: "アカウント作成、プロフィール設定、二要素認証",
    sections: [
      {
        title: "アカウント作成とプロフィール",
        content:
          "GitHubアカウントはメールアドレスで作成します。プロフィールにはアバター、自己紹介、所在地、SNSリンクを設定できます。ユーザー名と同名のリポジトリにREADME.mdを置くと、プロフィールページに表示されます。",
        code: `# プロフィール README の作成
# 1. ユーザー名と同じ名前のリポジトリを作成
#    例: github.com/username/username
# 2. README.md を作成

# README.md の例
### Hi there 👋

**Java Developer**

- 🔭 現在 Spring Boot で Web アプリケーションを開発中
- 🌱 AWS と Kubernetes を学習中
- 📫 連絡先: example@email.com

#### 技術スタック
![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)

#### GitHub Stats
![GitHub Stats](https://github-readme-stats.vercel.app/api?username=YOUR_USERNAME)

# プロフィール設定（Settings > Profile）
# - Name: 表示名
# - Bio: 一言自己紹介
# - Company: 所属組織
# - Location: 所在地
# - Website: 個人サイト
# - Social accounts: X, LinkedIn 等`,
      },
      {
        title: "セキュリティ設定",
        content:
          "二要素認証（2FA）の有効化はGitHubで強く推奨されています。SSH鍵やPersonal Access Token（PAT）でセキュアな認証を設定します。セッション管理やアプリ連携も重要です。",
        code: `# 二要素認証（2FA）の有効化
# Settings > Password and authentication > Two-factor authentication
# - 認証アプリ（Google Authenticator, Authy 等）を推奨
# - SMS は非推奨（SIMスワップ攻撃のリスク）
# - リカバリーコードを安全な場所に保管

# SSH鍵の設定
$ ssh-keygen -t ed25519 -C "you@example.com"
$ cat ~/.ssh/id_ed25519.pub
# → Settings > SSH and GPG keys > New SSH key に登録

# 接続テスト
$ ssh -T git@github.com

# Personal Access Token（PAT）の作成
# Settings > Developer settings > Personal access tokens
# > Fine-grained tokens（推奨）
#
# スコープ設定:
# - Repository access: 特定のリポジトリのみ
# - Permissions: 必要最小限の権限
#   - Contents: Read/Write
#   - Pull requests: Read/Write
#   - Issues: Read/Write

# PAT の使用（HTTPS 認証）
$ git clone https://github.com/user/repo.git
# Username: your-username
# Password: ghp_xxxxxxxxxxxx（PAT を入力）

# 認証情報のキャッシュ
$ git config --global credential.helper cache
$ git config --global credential.helper 'cache --timeout=3600'

# GitHub CLI での認証（推奨）
$ gh auth login
# ブラウザで認証 → 自動設定`,
      },
    ],
  },
  {
    id: "notifications",
    title: "通知の管理",
    category: "account",
    description: "通知設定、Watch/Unwatch、メール通知のカスタマイズ",
    sections: [
      {
        title: "通知の設定とフィルタリング",
        content:
          "GitHubの通知はWeb通知とメール通知があります。Watch設定でリポジトリごとの通知レベルを制御し、カスタムフィルタで重要な通知を見逃さないようにします。通知が多すぎる場合はWatch対象を見直します。",
        code: `# Watch レベル（リポジトリごと）
# - Participating and @mentions: 参加中・メンション時のみ（デフォルト）
# - All Activity: すべてのアクティビティ
# - Ignore: 通知を受け取らない
# - Custom: Issue, PR, Release 等を個別選択

# 通知設定 (Settings > Notifications)
# ✓ Participating: 参加中のスレッドの通知
# ✓ Watching: Watch中のリポジトリの通知
# ✓ メール通知の ON/OFF
# ✓ GitHub Mobile のプッシュ通知

# 通知のフィルタリング（Web UI: github.com/notifications）
# - is:unread          未読のみ
# - reason:mention     @メンションされた通知
# - reason:review-requested  レビュー依頼
# - repo:owner/repo    特定リポジトリ
# - is:issue / is:pull-request

# GitHub CLI で通知管理
$ gh notification list
$ gh notification list --unread
$ gh notification mark-read

# メール通知のカスタマイズ
# - 特定のメールアドレスに送信
# - 組織ごとに異なるメールを設定可能
# - フィルタルールでメールクライアント側でも整理

# ベストプラクティス
# 1. 必要なリポジトリだけ Watch する
# 2. Participating and @mentions をデフォルトに
# 3. 重要なリポジトリだけ All Activity
# 4. 定期的に通知を確認して未読を消化`,
      },
    ],
  },
  // ===== リポジトリ管理 =====
  {
    id: "repo-create",
    title: "リポジトリの作成と設定",
    category: "repo",
    description: "リポジトリ作成、README、LICENSE、.gitignore、テンプレート",
    sections: [
      {
        title: "リポジトリの作成",
        content:
          "リポジトリはプロジェクトの全ファイルと変更履歴を格納する場所です。Public（全員に公開）またはPrivate（招待者のみ）を選択し、README、LICENSE、.gitignoreを初期設定します。",
        code: `# Web UI でリポジトリ作成
# github.com > + > New repository
# - Repository name: my-java-app
# - Description: Java Spring Boot アプリケーション
# - Public / Private を選択
# - ✓ Add a README file
# - ✓ Add .gitignore → Java を選択
# - ✓ Choose a license → MIT License

# GitHub CLI で作成
$ gh repo create my-java-app --public --clone \\
  --add-readme --gitignore Java --license MIT

# 既存プロジェクトをGitHubに公開
$ cd my-project
$ git init
$ git add -A
$ git commit -m "Initial commit"
$ gh repo create my-project --source=. --public --push

# テンプレートリポジトリ
# Settings > General > Template repository にチェック
# → 他のユーザーがこのリポジトリをテンプレートとして使用可能
$ gh repo create my-new-app --template user/template-repo

# リポジトリの転送・アーカイブ・削除
# Settings > Danger Zone
# - Transfer: 別のユーザー/組織に移管
# - Archive: 読み取り専用に変更（元に戻せる）
# - Delete: 完全削除（元に戻せない）`,
      },
      {
        title: "ブランチ保護ルール",
        content:
          "ブランチ保護ルールは main ブランチへの直接プッシュを防ぎ、PRレビューやCIチェックを必須にする設定です。コード品質を維持するために重要な設定です。",
        code: `# ブランチ保護ルールの設定
# Settings > Branches > Add branch protection rule
#
# Branch name pattern: main
#
# ✓ Require a pull request before merging
#   ✓ Require approvals: 1（承認数）
#   ✓ Dismiss stale pull request approvals when new commits are pushed
#   ✓ Require review from Code Owners
#
# ✓ Require status checks to pass before merging
#   ✓ Require branches to be up to date before merging
#   - Status checks: "build", "test"（CI ジョブ名）
#
# ✓ Require conversation resolution before merging
#
# ✓ Require signed commits（署名付きコミット）
#
# ✗ Allow force pushes（禁止推奨）
# ✗ Allow deletions（禁止推奨）

# CODEOWNERS ファイル（.github/CODEOWNERS）
# 特定のファイル/ディレクトリの変更時に自動でレビュアーを指定
* @default-reviewer
/src/auth/          @security-team
/docs/              @docs-team
*.java              @java-developers
/pom.xml            @build-team @java-developers

# Ruleset（新しいブランチ保護、推奨）
# Settings > Rules > Rulesets
# - より柔軟なルール設定
# - 組織全体に適用可能
# - bypass リストの設定`,
      },
    ],
  },
  {
    id: "repo-files",
    title: "リポジトリの重要ファイル",
    category: "repo",
    description: "README, LICENSE, CONTRIBUTING, CODE_OF_CONDUCT, CODEOWNERS",
    sections: [
      {
        title: "コミュニティファイル",
        content:
          "GitHubリポジトリには、プロジェクトの説明、ライセンス、コントリビューションガイド、行動規範などの標準ファイルがあります。これらは.githubディレクトリに置くこともでき、Community Profile で充実度を確認できます。",
        code: `# 重要ファイル一覧
#
# README.md          : プロジェクトの説明（必須）
# LICENSE            : ライセンス（必須）
# CONTRIBUTING.md    : コントリビューションガイド
# CODE_OF_CONDUCT.md : 行動規範
# SECURITY.md        : 脆弱性報告のガイド
# CHANGELOG.md       : 変更履歴
# .github/
#   ├── CODEOWNERS              : コードオーナーの定義
#   ├── FUNDING.yml             : スポンサーリンク
#   ├── ISSUE_TEMPLATE/
#   │   ├── bug_report.md       : バグ報告テンプレート
#   │   └── feature_request.md  : 機能リクエストテンプレート
#   ├── pull_request_template.md: PRテンプレート
#   └── workflows/              : GitHub Actions

# LICENSE の選択ガイド
# MIT License     : 最も自由、商用利用可、帰属表示のみ
# Apache-2.0      : 特許権の明示的な付与、商用利用可
# GPL-3.0         : コピーレフト、派生物も同ライセンス
# BSD-2-Clause    : MITに近い、シンプル
# Unlicense       : パブリックドメイン

# CONTRIBUTING.md の例
# ## コントリビューション方法
#
# 1. リポジトリをフォーク
# 2. 機能ブランチを作成 (\`git switch -c feature/xxx\`)
# 3. 変更をコミット (\`git commit -m 'feat: xxx'\`)
# 4. ブランチをプッシュ (\`git push origin feature/xxx\`)
# 5. Pull Request を作成
#
# ## コーディング規約
# - Java: Google Java Style Guide に従う
# - コミットメッセージ: Conventional Commits
# - テスト: 新機能には必ずテストを追加

# SECURITY.md の例
# ## 脆弱性の報告
# セキュリティ上の問題を発見した場合は、
# Issue を作成せず security@example.com に連絡してください。`,
      },
    ],
  },
  // ===== コラボレーション =====
  {
    id: "collaborators",
    title: "コラボレーターと権限",
    category: "collaboration",
    description: "コラボレーターの招待、権限レベル、Organization",
    sections: [
      {
        title: "アクセス権限の管理",
        content:
          "リポジトリへのアクセスはコラボレーターの招待やOrganizationのチーム機能で管理します。権限レベルは Read, Triage, Write, Maintain, Admin の5段階です。Organizationでは複数のリポジトリをまとめて管理できます。",
        code: `# 権限レベル
# Read:     コードの閲覧、Issue作成、PRコメント
# Triage:   Issue/PRの管理（ラベル、アサイン等）
# Write:    プッシュ、PRマージ、Issue管理
# Maintain: リポジトリ設定（一部）、ブランチ管理
# Admin:    全権限（削除、設定変更、コラボレーター管理）

# コラボレーターの招待
# Settings > Collaborators > Add people
# → ユーザー名またはメールアドレスで招待

# GitHub CLI で操作
$ gh api repos/owner/repo/collaborators/username \\
  -X PUT -f permission=write

# Organization（組織アカウント）
# - 複数のリポジトリをまとめて管理
# - チームを作成して権限を付与
# - SSO（シングルサインオン）設定
# - 監査ログ

# チームの管理
# Organization > Teams > New team
# - チーム名: backend-developers
# - 説明: バックエンド開発チーム
# - Visibility: Visible / Secret
# - メンバーを追加
# - リポジトリへの権限を設定

# チームメンションでレビュー依頼
# PR 作成時: @org/backend-developers をレビュアーに指定
# CODEOWNERS: /src/api/ @org/backend-developers

# フォーク権限
# Organization > Settings > Member privileges
# - Allow forking of private repositories
# - Repository creation: 制限可能`,
      },
    ],
  },
  {
    id: "code-review",
    title: "コードレビューの実践",
    category: "collaboration",
    description: "レビューリクエスト、Suggestion、レビューの承認・却下",
    sections: [
      {
        title: "レビューの流れ",
        content:
          "PRが作成されるとレビュアーに通知が送られます。レビュアーはFiles changedタブで差分を確認し、行コメント、Suggestion（修正提案）、全体コメントを残します。Approve（承認）、Request changes（修正要求）、Comment（コメントのみ）の3つのアクションがあります。",
        code: `# レビューの開始
# PR ページ > Files changed タブ
# - 行をクリックしてコメント追加
# - 複数行を選択してコメント可能
# - + ボタンでインラインコメント

# Suggestion 機能（修正提案）
# コメント内で以下のように書くと、
# レビュイーが1クリックで適用可能:
#
# \`\`\`suggestion
# private static final int TIMEOUT_SECONDS = 30;
# \`\`\`
#
# 複数行の Suggestion も可能:
# \`\`\`suggestion
# public String getName() {
#     return Objects.requireNonNullElse(name, "Unknown");
# }
# \`\`\`

# レビューの完了
# Review changes ボタン
# - Comment:         コメントのみ（承認でも却下でもない）
# - Approve:         承認（マージ可能に）
# - Request changes: 修正要求（修正後に再レビュー）

# GitHub CLI でレビュー
$ gh pr review 123 --approve
$ gh pr review 123 --request-changes --body "修正してください"
$ gh pr review 123 --comment --body "良い実装です"

# レビュー依頼
$ gh pr create --reviewer alice,bob
$ gh pr edit 123 --add-reviewer charlie

# レビューの自動割り当て
# Settings > Code review assignment
# - 自動的にチームメンバーをレビュアーに割り当て
# - ラウンドロビンまたは負荷分散

# Re-request review（再レビュー依頼）
# 修正後、レビュアーの横の🔄アイコンをクリック`,
      },
    ],
  },
  {
    id: "releases",
    title: "リリースとタグ",
    category: "collaboration",
    description: "Gitタグ、GitHubリリース、自動リリースノート、アセット添付",
    sections: [
      {
        title: "リリースの作成と管理",
        content:
          "GitHubリリースはGitのタグに紐づけて、バイナリやリリースノートを公開する機能です。セマンティックバージョニング（SemVer）でバージョンを管理し、自動リリースノート生成も利用できます。",
        code: `# Git タグの作成
$ git tag v1.0.0
$ git tag -a v1.0.0 -m "Release version 1.0.0"
$ git push origin v1.0.0
$ git push origin --tags         # 全タグをプッシュ

# GitHub リリースの作成（Web UI）
# リポジトリ > Releases > Draft a new release
# - Tag: v1.0.0
# - Target: main
# - Title: v1.0.0 - Initial Release
# - Description: リリースノート
# - Attach binaries: JAR, ZIP 等をアップロード
# - Pre-release: ベータ版の場合チェック

# GitHub CLI でリリース作成
$ gh release create v1.0.0 \\
  --title "v1.0.0 - Initial Release" \\
  --notes "## What's Changed
- feat: ユーザー認証機能
- feat: REST API 追加
- fix: データベース接続の安定性向上

## Contributors
@alice @bob" \\
  target/app-1.0.0.jar           # アセット添付

# 自動リリースノート生成
$ gh release create v1.0.0 --generate-notes

# .github/release.yml で分類をカスタマイズ
changelog:
  categories:
    - title: "🚀 New Features"
      labels: ["feature", "enhancement"]
    - title: "🐛 Bug Fixes"
      labels: ["bug", "fix"]
    - title: "📖 Documentation"
      labels: ["docs"]

# セマンティックバージョニング (SemVer)
# MAJOR.MINOR.PATCH
# v1.0.0 → v1.0.1  パッチ（バグ修正）
# v1.0.0 → v1.1.0  マイナー（後方互換の機能追加）
# v1.0.0 → v2.0.0  メジャー（破壊的変更）

# リリース管理
$ gh release list
$ gh release view v1.0.0
$ gh release download v1.0.0
$ gh release delete v1.0.0`,
      },
    ],
  },
  // ===== プロジェクト管理 =====
  {
    id: "github-projects",
    title: "GitHub Projects",
    category: "project",
    description: "プロジェクトボード、カスタムフィールド、ビュー、自動化",
    sections: [
      {
        title: "Projects（V2）の活用",
        content:
          "GitHub Projects はIssueやPRを整理するプロジェクト管理ツールです。テーブルビュー、ボードビュー、ロードマップビューでタスクを可視化し、カスタムフィールドやフィルタで柔軟に管理できます。",
        code: `# プロジェクトの作成
# ユーザーまたは Organization の Projects タブ
# > New project > Board / Table / Roadmap

# ボードビュー（カンバン）
# ┌─────────┬──────────┬──────────┬─────────┐
# │  Todo   │ In Progress │ Review  │  Done   │
# ├─────────┼──────────┼──────────┼─────────┤
# │ #12     │ #15      │ #18      │ #10     │
# │ #13     │ #16      │          │ #11     │
# │ #14     │          │          │         │
# └─────────┴──────────┴──────────┴─────────┘

# カスタムフィールド
# - Status: Todo / In Progress / Review / Done
# - Priority: 🔴 High / 🟡 Medium / 🟢 Low
# - Sprint: Sprint 1 / Sprint 2 / ...
# - Estimate: 数値（ストーリーポイント）
# - Start date / End date

# フィルタとグルーピング
# status:todo,in-progress        ステータスでフィルタ
# assignee:@me                   自分のタスク
# label:bug                      ラベルでフィルタ
# milestone:"v1.0"               マイルストーン

# 自動化（Workflows）
# - Item added to project → Status を Todo に設定
# - Pull request merged → Status を Done に変更
# - Item closed → Status を Done に変更

# GitHub CLI でプロジェクト操作
$ gh project list
$ gh project view 1
$ gh project item-list 1`,
      },
    ],
  },
  {
    id: "labels-milestones",
    title: "ラベルとマイルストーン",
    category: "project",
    description: "Issueの分類、優先度管理、リリース計画",
    sections: [
      {
        title: "ラベルの設計とマイルストーン",
        content:
          "ラベルでIssueやPRを分類し、マイルストーンでリリース目標を設定します。一貫したラベル体系により、タスクの検索やフィルタリングが効率化されます。マイルストーンの進捗率でリリースの準備状況を把握できます。",
        code: `# 推奨ラベル体系

# タイプ
# bug:          🔴 バグ報告
# feature:      🟢 新機能
# enhancement:  🔵 既存機能の改善
# documentation:📖 ドキュメント
# refactor:     🔄 リファクタリング
# test:         🧪 テスト

# 優先度
# priority:high:   🔴 高（緊急対応）
# priority:medium: 🟡 中（次スプリント）
# priority:low:    🟢 低（余裕がある時）

# 状態
# good first issue: 初心者向け
# help wanted:      ヘルプ歓迎
# wontfix:          対応しない
# duplicate:        重複
# invalid:          無効

# GitHub CLI でラベル操作
$ gh label create "priority:high" --color FF0000 \\
  --description "高優先度"
$ gh label list
$ gh issue edit 42 --add-label "bug,priority:high"

# マイルストーン
# Issues > Milestones > New milestone
# - Title: v1.0.0
# - Due date: 2025-03-31
# - Description: 初回リリース

# Issue をマイルストーンに紐づけ
$ gh issue edit 42 --milestone "v1.0.0"

# マイルストーンの進捗確認
$ gh api repos/owner/repo/milestones
# → open_issues, closed_issues で進捗率を計算`,
      },
    ],
  },
  // ===== Pages・Wiki・Discussions =====
  {
    id: "github-pages",
    title: "GitHub Pages",
    category: "pages-wiki",
    description: "静的サイトのホスティング、カスタムドメイン、Jekyll",
    sections: [
      {
        title: "GitHub Pagesの設定",
        content:
          "GitHub PagesはGitHubリポジトリから直接静的Webサイトを公開できる無料のホスティングサービスです。ドキュメントサイト、ポートフォリオ、プロジェクトページに最適です。username.github.io のドメインが割り当てられます。",
        code: `# GitHub Pages の有効化
# Settings > Pages
# - Source: Deploy from a branch / GitHub Actions
# - Branch: main (or gh-pages) / /(root) or /docs

# ユーザーサイト: username.github.io
# リポジトリ名を "username.github.io" にする
# → https://username.github.io/ でアクセス可能

# プロジェクトサイト: username.github.io/repo-name
# → https://username.github.io/repo-name/

# 静的サイトジェネレーター
# Jekyll（デフォルト）: Ruby ベース
# Hugo: Go ベース、高速
# Next.js / Astro: React ベース

# index.html を作成するだけでも公開可能
<!DOCTYPE html>
<html>
<head><title>My Project</title></head>
<body>
  <h1>My Java Project</h1>
  <p>プロジェクトのドキュメント</p>
</body>
</html>

# カスタムドメインの設定
# Settings > Pages > Custom domain
# 1. ドメインのDNS設定（CNAMEまたはAレコード）
#    CNAME: username.github.io
# 2. GitHub Pages でカスタムドメインを入力
# 3. ✓ Enforce HTTPS

# GitHub Actions でデプロイ
# .github/workflows/deploy.yml で自動デプロイ設定`,
      },
    ],
  },
  {
    id: "wiki-discussions",
    title: "Wiki と Discussions",
    category: "pages-wiki",
    description: "Wikiでドキュメント作成、Discussionsでコミュニティ運営",
    sections: [
      {
        title: "Wiki の活用",
        content:
          "WikiはプロジェクトのドキュメントをMarkdownで作成・管理する機能です。ページの階層化、サイドバー、フッターのカスタマイズが可能です。WikiもGitリポジトリとしてクローンして編集できます。",
        code: `# Wiki の有効化
# Settings > General > Features > ✓ Wikis

# Wiki ページの構成例
# Home（トップページ）
# ├── Getting-Started（はじめに）
# ├── Installation（インストール）
# ├── Configuration（設定）
# ├── API-Reference（API リファレンス）
# │   ├── Authentication
# │   └── Endpoints
# ├── FAQ（よくある質問）
# └── Troubleshooting（トラブルシューティング）

# サイドバーのカスタマイズ（_Sidebar.md）
## ドキュメント
- [Home](Home)
- [はじめに](Getting-Started)
- [インストール](Installation)
- [設定](Configuration)

## API
- [認証](Authentication)
- [エンドポイント](Endpoints)

# Wiki を Git でクローン
$ git clone https://github.com/user/repo.wiki.git
# → ローカルで Markdown ファイルを編集してプッシュ

# ========== Discussions ==========
# Settings > General > Features > ✓ Discussions

# Discussions のカテゴリ
# 📣 Announcements:  お知らせ（メンテナーのみ投稿）
# 💬 General:        一般的な会話
# 💡 Ideas:          アイデア・提案
# 🙏 Q&A:            質問と回答（回答をマーク可能）
# 🗳️ Polls:          投票

# GitHub CLI で Discussions 操作
$ gh discussion list
$ gh discussion create --category "Ideas" \\
  --title "新機能の提案" --body "..."`,
      },
    ],
  },
  // ===== セキュリティ =====
  {
    id: "security-features",
    title: "セキュリティ機能",
    category: "security",
    description: "Dependabot、Code scanning、Secret scanning、セキュリティアドバイザリ",
    sections: [
      {
        title: "GitHub のセキュリティ機能",
        content:
          "GitHubは脆弱性の検出と管理のための包括的なセキュリティ機能を提供します。Dependabotが依存関係の脆弱性を自動検出し、Code scanningがコードの脆弱性を発見し、Secret scanningがシークレットの漏洩を防止します。",
        code: `# ========== Dependabot ==========
# 依存関係の脆弱性を自動検出・PRで修正提案

# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "maven"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
    labels:
      - "dependencies"
    reviewers:
      - "security-team"

  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"

# ========== Code Scanning ==========
# CodeQL でコードの脆弱性を自動検出

# .github/workflows/codeql.yml
name: CodeQL Analysis
on: [push, pull_request]
jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: github/codeql-action/init@v3
        with:
          languages: java
      - uses: github/codeql-action/autobuild@v3
      - uses: github/codeql-action/analyze@v3

# ========== Secret Scanning ==========
# Settings > Code security and analysis
# ✓ Secret scanning: シークレットの漏洩を検出
# ✓ Push protection: プッシュ時にブロック
# → API キー、トークン、パスワードを検出

# セキュリティアドバイザリ
# Security > Advisories > New draft advisory
# → 非公開で脆弱性を報告・修正・公開`,
      },
    ],
  },
  // ===== GitHub Actions =====
  {
    id: "actions-basics",
    title: "GitHub Actions の基本",
    category: "actions",
    description: "ワークフロー、ジョブ、ステップ、トリガー",
    sections: [
      {
        title: "ワークフローの構造",
        content:
          "GitHub Actionsはイベント（push, PR, schedule等）をトリガーにワークフローを自動実行するCI/CDプラットフォームです。YAMLファイルでワークフローを定義し、ジョブとステップで処理を構成します。",
        code: `# .github/workflows/ci.yml
name: CI Pipeline             # ワークフロー名

on:                            # トリガー
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 0 * * 1'        # 毎週月曜 0:00 UTC
  workflow_dispatch:            # 手動実行

env:                           # 全ジョブ共通の環境変数
  JAVA_VERSION: '21'

jobs:
  build:                       # ジョブ名
    runs-on: ubuntu-latest     # 実行環境
    timeout-minutes: 15

    steps:                     # ステップ（順番に実行）
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Set up JDK
        uses: actions/setup-java@v4
        with:
          java-version: \${{ env.JAVA_VERSION }}
          distribution: 'temurin'
          cache: 'maven'

      - name: Build
        run: mvn compile -B

      - name: Test
        run: mvn test -B

      - name: Upload test results
        if: always()           # テスト失敗時も実行
        uses: actions/upload-artifact@v4
        with:
          name: test-results
          path: target/surefire-reports/

  deploy:
    needs: build               # build 完了後に実行
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - name: Deploy
        run: echo "Deploying..."`,
      },
      {
        title: "Secrets と環境変数",
        content:
          "APIキーやパスワードなどの機密情報はSecretsとして安全に保管し、ワークフロー内で参照します。Environmentを使って本番/ステージング環境ごとに異なるSecretsを管理できます。",
        code: `# Secrets の設定
# Settings > Secrets and variables > Actions > New repository secret
# - DOCKER_USERNAME: ユーザー名
# - DOCKER_PASSWORD: パスワード
# - DEPLOY_KEY: デプロイキー

# ワークフロー内で使用
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Login to Docker Hub
        run: |
          echo \${{ secrets.DOCKER_PASSWORD }} | \\
          docker login -u \${{ secrets.DOCKER_USERNAME }} --password-stdin

# Environment（デプロイ環境）
# Settings > Environments > New environment
# - staging: 自動デプロイ
# - production: 承認が必要
#   → Required reviewers: デプロイ承認者を設定

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production    # 承認が必要
    steps:
      - name: Deploy to production
        env:
          API_KEY: \${{ secrets.PROD_API_KEY }}
        run: ./deploy.sh

# Variables（非機密の設定値）
# Settings > Secrets and variables > Actions > Variables
# - APP_NAME: my-java-app
# - REGION: ap-northeast-1

# 使用
# \${{ vars.APP_NAME }}

# GitHub提供の変数（コンテキスト）
# \${{ github.sha }}          コミットSHA
# \${{ github.ref }}          ブランチ/タグ
# \${{ github.actor }}        実行者
# \${{ github.repository }}   リポジトリ名
# \${{ github.event_name }}   トリガーイベント名`,
      },
    ],
  },
  {
    id: "actions-marketplace",
    title: "Actions マーケットプレイス",
    category: "actions",
    description: "人気のAction、再利用可能ワークフロー、カスタムAction",
    sections: [
      {
        title: "便利なActionsとカスタマイズ",
        content:
          "GitHub Marketplace には数千のActionが公開されており、テスト、デプロイ、通知などの処理を簡単に組み込めます。再利用可能ワークフロー（Reusable Workflows）で組織横断的にワークフローを共有することも可能です。",
        code: `# 人気の Actions

# チェックアウト
- uses: actions/checkout@v4

# Java セットアップ
- uses: actions/setup-java@v4
  with:
    java-version: '21'
    distribution: 'temurin'

# キャッシュ
- uses: actions/cache@v4
  with:
    path: ~/.m2
    key: \${{ runner.os }}-m2-\${{ hashFiles('**/pom.xml') }}

# Slack通知
- uses: slackapi/slack-github-action@v1
  with:
    payload: '{"text": "Build succeeded!"}'
  env:
    SLACK_WEBHOOK_URL: \${{ secrets.SLACK_WEBHOOK }}

# PR にコメント
- uses: actions/github-script@v7
  with:
    script: |
      github.rest.issues.createComment({
        owner: context.repo.owner,
        repo: context.repo.repo,
        issue_number: context.issue.number,
        body: 'テスト成功しました ✅'
      })

# 再利用可能ワークフロー（呼び出す側）
jobs:
  call-ci:
    uses: org/.github/.github/workflows/java-ci.yml@main
    with:
      java-version: '21'
    secrets: inherit

# 再利用可能ワークフロー（定義側）
# .github/workflows/java-ci.yml
on:
  workflow_call:
    inputs:
      java-version:
        required: true
        type: string
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-java@v4
        with:
          java-version: \${{ inputs.java-version }}
      - run: mvn test`,
      },
    ],
  },
  // ===== 高度な機能 =====
  {
    id: "github-api",
    title: "GitHub API",
    category: "advanced",
    description: "REST API, GraphQL API, Webhooks, GitHub Apps",
    sections: [
      {
        title: "APIとWebhooks",
        content:
          "GitHub REST APIとGraphQL APIを使ってプログラムからGitHubを操作できます。Webhooksでイベント発生時に外部サービスへ通知を送信し、GitHub Appsで高度な統合を実現します。",
        code: `# REST API（GitHub CLI 経由が簡単）
$ gh api repos/owner/repo
$ gh api repos/owner/repo/pulls --jq '.[].title'
$ gh api repos/owner/repo/issues -X POST \\
  -f title="API Issue" -f body="Created via API"

# REST API（curl）
$ curl -H "Authorization: Bearer ghp_xxx" \\
  https://api.github.com/repos/owner/repo

# GraphQL API
$ gh api graphql -f query='
  query {
    repository(owner: "owner", name: "repo") {
      pullRequests(last: 5, states: OPEN) {
        nodes {
          title
          author { login }
          createdAt
        }
      }
    }
  }
'

# Webhooks の設定
# Settings > Webhooks > Add webhook
# - Payload URL: https://your-server.com/webhook
# - Content type: application/json
# - Secret: webhook_secret
# - Events: Push, Pull Request, Issues 等

# Webhook のペイロード例（PRイベント）
{
  "action": "opened",
  "pull_request": {
    "title": "feat: 新機能",
    "user": { "login": "alice" },
    "html_url": "https://github.com/..."
  }
}

# GitHub Apps
# Settings > Developer settings > GitHub Apps
# - より細かい権限管理
# - インストールごとの認証
# - Webhooks の受信
# - Marketplace に公開可能`,
      },
    ],
  },
  {
    id: "github-codespaces",
    title: "Codespaces と便利機能",
    category: "advanced",
    description: "クラウド開発環境、GitHub CLI Tips、ショートカット",
    sections: [
      {
        title: "Codespacesとその他の便利機能",
        content:
          "GitHub Codespacesはブラウザ上でVS Codeを使える完全な開発環境です。セットアップ不要でどこからでも開発でき、devcontainer.jsonで環境を統一できます。その他にもGitHubには多くの便利機能があります。",
        code: `# Codespaces の起動
# リポジトリ > Code > Codespaces > New codespace
# → ブラウザ上で VS Code が起動

# devcontainer.json で環境を定義
# .devcontainer/devcontainer.json
{
  "name": "Java Development",
  "image": "mcr.microsoft.com/devcontainers/java:21",
  "features": {
    "ghcr.io/devcontainers/features/maven:1": {}
  },
  "customizations": {
    "vscode": {
      "extensions": [
        "vscjava.vscode-java-pack",
        "vmware.vscode-spring-boot"
      ]
    }
  },
  "forwardPorts": [8080]
}

# GitHub CLI でCodespace管理
$ gh codespace create --repo owner/repo
$ gh codespace list
$ gh codespace ssh

# ========== 便利なショートカット ==========
# リポジトリページで:
# .   → github.dev でコードエディタを開く
# t   → ファイル検索
# /   → 検索にフォーカス
# g c → Code タブに移動
# g i → Issues タブに移動
# g p → Pull Requests タブに移動

# URL テクニック
# github.com → github.dev  : Web エディタ
# github.com → github1s.com : VS Code 風ビューア
# /compare/main...branch   : ブランチ比較
# /blame/main/file.java    : 行ごとの変更者
# #L10-L20                 : 行の範囲をハイライト

# Gist（コードスニペット共有）
$ gh gist create file.java --public
$ gh gist list
$ gh gist view abc123`,
      },
    ],
  },
];
