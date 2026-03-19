export interface GitHubPRSection {
  title: string;
  content: string;
  code?: string;
}

export interface GitHubPRChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: GitHubPRSection[];
}

export const githubPRCategories = [
  { id: "git-basics", name: "Git基礎", color: "#F05032" },
  { id: "github-basics", name: "GitHub基礎", color: "#2563EB" },
  { id: "pr-workflow", name: "PRワークフロー", color: "#059669" },
  { id: "review", name: "コードレビュー", color: "#7C3AED" },
  { id: "advanced", name: "高度な運用", color: "#D97706" },
  { id: "ci-cd", name: "CI/CD・自動化", color: "#DC2626" },
] as const;

export const githubPRChapters: GitHubPRChapter[] = [
  // ===== Git基礎 =====
  {
    id: "git-init",
    title: "Gitの基本操作",
    category: "git-basics",
    description: "リポジトリの初期化、ステージング、コミット、差分確認",
    sections: [
      {
        title: "リポジトリの初期化と設定",
        content:
          "Git はファイルの変更履歴を管理する分散バージョン管理システムです。git init でリポジトリを作成し、git config でユーザー情報を設定します。.gitignore で追跡対象外のファイルを指定します。",
        code: `# リポジトリの初期化
$ git init
$ git init my-project            # ディレクトリ作成と同時に初期化

# ユーザー設定（初回のみ）
$ git config --global user.name "Your Name"
$ git config --global user.email "you@example.com"

# プロジェクト固有の設定
$ git config user.name "Work Name"
$ git config user.email "work@company.com"

# .gitignore の作成
$ cat .gitignore
# ビルド成果物
target/
build/
*.class

# IDE設定
.idea/
.vscode/
*.iml

# 環境変数・秘密情報
.env
*.key
credentials.json

# OS ファイル
.DS_Store
Thumbs.db

# 設定確認
$ git config --list
$ git config user.name`,
      },
      {
        title: "ステージングとコミット",
        content:
          "Git のワークフローは「ワーキングディレクトリ → ステージングエリア → リポジトリ」の3段階です。git add でステージに追加し、git commit で履歴に記録します。コミットメッセージは変更の意図を簡潔に記述します。",
        code: `# ファイルの状態確認
$ git status

# ステージング（インデックスに追加）
$ git add file.txt               # 特定ファイル
$ git add src/                   # ディレクトリ
$ git add -A                     # 全変更をステージ
$ git add -p                     # 変更を対話的に選択

# コミット
$ git commit -m "Add user authentication feature"
$ git commit                     # エディタでメッセージ入力

# コミットメッセージの慣例（Conventional Commits）
# feat: 新機能追加
# fix: バグ修正
# docs: ドキュメントの変更
# style: コードスタイルの変更（動作に影響なし）
# refactor: リファクタリング
# test: テストの追加・修正
# chore: ビルド・ツールの変更

# 例
$ git commit -m "feat: ユーザー登録APIを追加"
$ git commit -m "fix: ログイン時のNullPointerExceptionを修正"

# 差分確認
$ git diff                       # ワーキング vs ステージ
$ git diff --staged              # ステージ vs 最新コミット
$ git diff HEAD                  # ワーキング vs 最新コミット
$ git diff main..feature         # ブランチ間の差分`,
      },
      {
        title: "履歴の確認と操作",
        content:
          "git log でコミット履歴を確認し、git show で特定コミットの詳細を表示します。git stash で作業中の変更を一時退避し、後から復元できます。",
        code: `# コミット履歴の表示
$ git log                        # 詳細表示
$ git log --oneline              # 1行表示
$ git log --graph --oneline      # グラフ付き
$ git log --author="Alice"       # 特定の著者
$ git log -n 5                   # 直近5件
$ git log --since="2024-01-01"   # 日付指定
$ git log -- src/Main.java       # 特定ファイルの履歴

# 特定コミットの詳細
$ git show abc1234               # コミットの差分を表示
$ git show HEAD                  # 最新コミット
$ git show HEAD~2                # 2つ前のコミット

# 変更の取り消し
$ git restore file.txt           # ワーキングの変更を取り消し
$ git restore --staged file.txt  # ステージングを取り消し（変更は保持）

# stash（一時退避）
$ git stash                      # 変更を退避
$ git stash list                 # 退避リスト
$ git stash pop                  # 最新の退避を復元して削除
$ git stash apply                # 最新の退避を復元（削除しない）
$ git stash drop                 # 最新の退避を削除

# コミットの修正（※ push前のみ）
$ git commit --amend -m "修正したメッセージ"

# タグ
$ git tag v1.0.0
$ git tag -a v1.0.0 -m "Release version 1.0.0"
$ git push origin v1.0.0`,
      },
    ],
  },
  {
    id: "git-branch",
    title: "ブランチ操作",
    category: "git-basics",
    description: "ブランチの作成・切り替え・マージ・削除",
    sections: [
      {
        title: "ブランチの基本",
        content:
          "ブランチはコミット履歴の独立した流れを作る機能です。機能開発やバグ修正を独立して行い、完了後にメインブランチにマージします。Git Flow や GitHub Flow などのブランチ戦略が一般的です。",
        code: `# ブランチの一覧
$ git branch                     # ローカルブランチ
$ git branch -r                  # リモートブランチ
$ git branch -a                  # 全ブランチ

# ブランチの作成と切り替え
$ git branch feature/login       # ブランチ作成
$ git switch feature/login       # 切り替え（推奨）
$ git switch -c feature/login    # 作成と切り替えを同時に
$ git checkout -b feature/login  # 従来の方法

# ブランチの削除
$ git branch -d feature/login    # マージ済みのブランチを削除
$ git branch -D feature/login    # 強制削除

# ブランチのマージ
$ git switch main
$ git merge feature/login        # feature/login を main にマージ

# マージの種類
# Fast-forward: 分岐がない場合（直線的な履歴）
$ git merge feature/login

# マージコミット: 分岐がある場合
$ git merge --no-ff feature/login  # 常にマージコミットを作成

# ブランチ名の慣例
# feature/xxx   : 新機能
# fix/xxx       : バグ修正
# hotfix/xxx    : 緊急修正
# release/xxx   : リリース準備
# chore/xxx     : メンテナンス`,
      },
      {
        title: "コンフリクトの解決",
        content:
          "同じファイルの同じ箇所を異なるブランチで編集した場合、マージ時にコンフリクト（衝突）が発生します。コンフリクトマーカーを確認して手動で解決し、コミットします。",
        code: `# マージ時にコンフリクトが発生
$ git merge feature/login
# CONFLICT (content): Merge conflict in src/User.java
# Automatic merge failed; fix conflicts and then commit

# コンフリクトマーカー
<<<<<<< HEAD
    private String email;        // main ブランチの変更
=======
    private String mailAddress;  // feature ブランチの変更
>>>>>>> feature/login

# 解決手順
# 1. ファイルを開いてコンフリクトマーカーを削除
# 2. 正しいコードに修正
    private String email;        // 採用する方を残す

# 3. ステージしてコミット
$ git add src/User.java
$ git commit -m "Merge feature/login, resolve email field conflict"

# コンフリクト解決を中止
$ git merge --abort              # マージ前の状態に戻る

# ツールでコンフリクトを解決
$ git mergetool                  # 設定済みのマージツールを起動

# リベースでコンフリクト解決
$ git rebase main
# コンフリクト発生時
$ git add <resolved-file>
$ git rebase --continue
# または中止
$ git rebase --abort`,
      },
    ],
  },
  // ===== GitHub基礎 =====
  {
    id: "github-setup",
    title: "GitHubの基本設定",
    category: "github-basics",
    description: "アカウント設定、SSH鍵、リポジトリ作成、クローン",
    sections: [
      {
        title: "SSH鍵の設定とリポジトリ操作",
        content:
          "GitHubはGitリポジトリのホスティングサービスです。SSH鍵を設定することでパスワードなしで安全に通信できます。リモートリポジトリをcloneして、push/pullでコードを同期します。",
        code: `# SSH鍵の生成
$ ssh-keygen -t ed25519 -C "you@example.com"
# → ~/.ssh/id_ed25519（秘密鍵）と ~/.ssh/id_ed25519.pub（公開鍵）

# 公開鍵をGitHubに登録
$ cat ~/.ssh/id_ed25519.pub
# → GitHub > Settings > SSH and GPG keys > New SSH key に貼り付け

# 接続テスト
$ ssh -T git@github.com
# Hi username! You've successfully authenticated

# リポジトリのクローン
$ git clone git@github.com:user/repo.git
$ git clone https://github.com/user/repo.git  # HTTPS

# リモートの管理
$ git remote -v                  # リモート一覧
$ git remote add origin git@github.com:user/repo.git
$ git remote set-url origin git@github.com:user/new-repo.git

# プッシュ（ローカル → リモート）
$ git push origin main
$ git push -u origin main        # 上流ブランチを設定（初回）
$ git push                       # 設定後は省略可能

# プル（リモート → ローカル）
$ git pull origin main
$ git pull                       # 設定済みなら省略可能

# フェッチ（リモートの情報を取得、マージはしない）
$ git fetch origin
$ git fetch --all                # 全リモート`,
      },
      {
        title: "リポジトリの作成とREADME",
        content:
          "GitHubでリポジトリを作成し、README.md、LICENSE、.gitignore を設定します。README はプロジェクトの説明、セットアップ手順、使い方を記述する重要なドキュメントです。",
        code: `# GitHub CLI (gh) でリポジトリ作成
$ gh repo create my-project --public --clone
$ gh repo create my-project --private --add-readme

# 既存のローカルリポジトリをGitHubに公開
$ cd my-project
$ git init
$ git add -A
$ git commit -m "Initial commit"
$ gh repo create my-project --source=. --public --push

# README.md の構成例
# # プロジェクト名
#
# プロジェクトの概要を1-2行で説明。
#
# ## 機能
# - 機能1
# - 機能2
#
# ## 必要条件
# - Java 21+
# - Maven 3.9+
#
# ## セットアップ
# \`\`\`bash
# git clone https://github.com/user/project.git
# cd project
# mvn install
# \`\`\`
#
# ## 使い方
# \`\`\`bash
# java -jar target/app.jar
# \`\`\`
#
# ## ライセンス
# MIT License

# gh コマンドでリポジトリ操作
$ gh repo view                   # リポジトリ情報を表示
$ gh repo list                   # 自分のリポジトリ一覧
$ gh repo fork user/repo         # フォーク
$ gh repo clone user/repo        # クローン`,
      },
    ],
  },
  {
    id: "github-issues",
    title: "Issues（課題管理）",
    category: "github-basics",
    description: "Issueの作成、ラベル、マイルストーン、テンプレート",
    sections: [
      {
        title: "Issueの活用",
        content:
          "Issues はバグ報告、機能リクエスト、タスク管理に使用します。ラベルで分類し、マイルストーンでリリースに紐づけ、担当者をアサインします。Issue テンプレートでフォーマットを統一できます。",
        code: `# GitHub CLI で Issue 操作
$ gh issue create --title "ログイン画面のバグ" \\
  --body "パスワードが空でもログインできてしまう" \\
  --label "bug" --assignee "@me"

$ gh issue list                  # Issue一覧
$ gh issue list --label "bug"    # ラベルでフィルタ
$ gh issue view 42               # Issue #42 の詳細
$ gh issue close 42              # Issue をクローズ
$ gh issue reopen 42             # Issue を再オープン

# Issue テンプレート (.github/ISSUE_TEMPLATE/bug_report.md)
# ---
# name: バグ報告
# about: バグの報告はこのテンプレートを使用してください
# labels: bug
# ---
#
# ## バグの概要
# 何が起きているか簡潔に説明してください。
#
# ## 再現手順
# 1. '...' に移動
# 2. '...' をクリック
# 3. エラーが表示される
#
# ## 期待される動作
#
# ## スクリーンショット
#
# ## 環境
# - OS: [例: macOS 14.0]
# - Java: [例: 21.0.2]
# - ブラウザ: [例: Chrome 120]

# コミットメッセージで Issue を参照
$ git commit -m "fix: パスワード空欄チェックを追加 (closes #42)"
# → マージ時に Issue #42 が自動クローズされる

# キーワード: closes, fixes, resolves
# 例: "fixes #42", "resolves #42"`,
      },
    ],
  },
  // ===== PRワークフロー =====
  {
    id: "pr-create",
    title: "Pull Requestの作成",
    category: "pr-workflow",
    description: "ブランチ作成からPR作成、説明文の書き方まで",
    sections: [
      {
        title: "PRの基本ワークフロー",
        content:
          "Pull Request（PR）はブランチの変更をメインブランチに取り込むためのリクエストです。ブランチを作成→コード変更→コミット→プッシュ→PR作成→レビュー→マージの流れで進めます。",
        code: `# 1. ブランチを作成して切り替え
$ git switch -c feature/user-auth

# 2. コードを変更してコミット
$ git add src/auth/LoginService.java
$ git commit -m "feat: ログイン機能を実装"

$ git add src/auth/LoginServiceTest.java
$ git commit -m "test: ログイン機能のテストを追加"

# 3. リモートにプッシュ
$ git push -u origin feature/user-auth

# 4. Pull Request を作成（GitHub CLI）
$ gh pr create \\
  --title "feat: ユーザー認証機能の追加" \\
  --body "## 概要
- ログイン/ログアウト機能を実装
- JWTトークンによる認証
- パスワードのbcryptハッシュ化

## 変更内容
- LoginService: 認証ロジック
- JwtUtil: トークン生成・検証
- SecurityConfig: Spring Security設定

## テスト
- [x] 単体テスト追加
- [x] 統合テスト追加
- [ ] E2Eテスト

Closes #42" \\
  --reviewer alice,bob \\
  --label "feature"

# ブラウザでPRを開く
$ gh pr view --web`,
      },
      {
        title: "良いPR説明文の書き方",
        content:
          "PR説明文はレビュアーが変更を理解するための重要なドキュメントです。変更の目的、方法、影響範囲を明確に記述し、スクリーンショットやテスト手順を含めるとスムーズにレビューが進みます。",
        code: `# PRテンプレート (.github/pull_request_template.md)
## 概要
<!-- このPRで何を変更し、なぜ変更するのかを説明 -->

## 変更の種類
- [ ] バグ修正 (bug fix)
- [ ] 新機能 (new feature)
- [ ] 破壊的変更 (breaking change)
- [ ] リファクタリング (refactoring)
- [ ] ドキュメント (documentation)

## 変更内容
<!-- 主要な変更点を箇条書きで -->

## テスト
<!-- テスト方法や確認手順を記述 -->
- [ ] 単体テストを追加/更新
- [ ] 手動テスト済み

## スクリーンショット
<!-- UIの変更がある場合はスクリーンショットを添付 -->

## 関連Issue
<!-- 例: Closes #123, Refs #456 -->

## レビューのポイント
<!-- レビュアーに特に見てほしい箇所 -->

# PRのベストプラクティス
# ✓ PRは小さく保つ（200-400行以内が理想）
# ✓ 1つのPRは1つの目的に集中
# ✓ タイトルは変更内容を簡潔に表現
# ✓ WIP（作業中）の場合はDraftPRを使用
# ✓ セルフレビューしてからレビュー依頼
# ✗ 複数の無関係な変更を1つのPRに含めない
# ✗ 巨大なPRを一度に作成しない`,
      },
    ],
  },
  {
    id: "pr-draft",
    title: "Draft PRと作業中の管理",
    category: "pr-workflow",
    description: "Draft PR、WIP、作業途中のフィードバック取得",
    sections: [
      {
        title: "Draft PRの活用",
        content:
          "Draft PR は作業途中のPRをレビュー前に共有する機能です。方向性の確認や早期フィードバックの取得に便利です。Ready for review に変更するまでマージはできません。",
        code: `# Draft PR の作成
$ gh pr create --draft \\
  --title "WIP: 決済機能の実装" \\
  --body "## 作業中
- [x] PaymentService の基本実装
- [ ] エラーハンドリング
- [ ] テスト追加
- [ ] ドキュメント更新

## フィードバック求む
PaymentGateway のインターフェース設計について
意見をいただきたいです。"

# Ready for review に変更
$ gh pr ready

# PR の状態確認
$ gh pr status
$ gh pr list --draft             # Draft PRのみ表示

# PR にコメント追加
$ gh pr comment 123 --body "テスト追加しました。レビューお願いします。"

# PR の更新（追加コミット）
$ git add .
$ git commit -m "fix: レビュー指摘の修正"
$ git push                       # PRに自動反映

# 作業中の進捗を共有するコミット例
$ git commit -m "WIP: PaymentService の基本実装"
$ git commit -m "WIP: エラーハンドリング追加"
$ git commit -m "feat: 決済機能の実装完了"

# スカッシュ（複数コミットを1つに整理）
$ git rebase -i HEAD~3
# pick → squash に変更してまとめる`,
      },
    ],
  },
  {
    id: "pr-merge",
    title: "PRのマージ戦略",
    category: "pr-workflow",
    description: "Merge commit, Squash merge, Rebase merge の使い分け",
    sections: [
      {
        title: "3つのマージ方法",
        content:
          "GitHubには3つのマージ方法があります。Merge commit（全履歴保持）、Squash and merge（1コミットにまとめ）、Rebase and merge（線形履歴）です。チームのルールに従って使い分けます。",
        code: `# 1. Merge commit（デフォルト）
# - 全コミット履歴を保持
# - マージコミットが作成される
# - 開発の経緯がわかりやすい
$ gh pr merge 123 --merge

# 2. Squash and merge（推奨が多い）
# - 全コミットを1つにまとめる
# - メインブランチの履歴がクリーン
# - 細かいWIPコミットが消える
$ gh pr merge 123 --squash

# 3. Rebase and merge
# - コミットを線形に並べ替え
# - マージコミットなし
# - きれいな直線的履歴
$ gh pr merge 123 --rebase

# マージ後のブランチ削除
$ gh pr merge 123 --squash --delete-branch

# 自動マージ（CI通過後に自動マージ）
$ gh pr merge 123 --auto --squash

# マージの使い分けガイド
# Merge commit:
#   大きな機能開発、履歴を残したい場合
#
# Squash and merge:
#   小〜中規模のPR、WIPコミットが多い場合
#   → 最も一般的な選択
#
# Rebase and merge:
#   少数の整理されたコミット、線形履歴を好む場合

# マージ後のローカル更新
$ git switch main
$ git pull origin main
$ git branch -d feature/user-auth  # ローカルブランチ削除`,
      },
    ],
  },
  // ===== コードレビュー =====
  {
    id: "review-basics",
    title: "コードレビューの基本",
    category: "review",
    description: "レビューの目的、観点、コメントの書き方",
    sections: [
      {
        title: "効果的なコードレビュー",
        content:
          "コードレビューはバグの早期発見、コード品質の向上、知識の共有を目的とします。レビュアーはコードの正しさ、可読性、保守性、セキュリティの観点からフィードバックします。建設的で具体的なコメントが重要です。",
        code: `# レビューの開始（GitHub CLI）
$ gh pr review 123 --comment --body "全体的にきれいなコードです"
$ gh pr review 123 --approve      # 承認
$ gh pr review 123 --request-changes --body "修正が必要です"

# レビューの観点チェックリスト
# □ 正しさ: ロジックにバグはないか
# □ 可読性: 変数名・メソッド名は明確か
# □ 保守性: 将来の変更に対応しやすいか
# □ テスト: 十分なテストがあるか
# □ セキュリティ: 脆弱性はないか
# □ パフォーマンス: 非効率な処理はないか
# □ 一貫性: プロジェクトの規約に従っているか

# 良いレビューコメントの例
# ✓ "このメソッドは30行を超えているので、
#     バリデーション部分を extractValidation() に
#     切り出すとテストしやすくなります"
#
# ✓ "ここで SQLインジェクションの可能性があります。
#     PreparedStatement を使いましょう。
#     参考: https://..."
#
# ✓ "nit: この変数名は data より userList の方が
#     意図が明確になると思います"

# 避けるべきコメント
# ✗ "ここはダメです"（理由がない）
# ✗ "自分ならこう書く"（好みの押し付け）
# ✗ "なぜこうしたの？"（批判的な質問）
# → "このアプローチを選んだ理由を教えてください"`,
      },
      {
        title: "レビューコメントの種類",
        content:
          "レビューコメントにはプレフィックスをつけて意図を明示すると効率的です。必須修正、提案、質問、軽微な指摘（nit）を区別することで、レビュイーが優先度を判断しやすくなります。",
        code: `# コメントのプレフィックス慣例

# [must] 必ず修正が必要
# "must: この入力バリデーションがないと、
#  NumberFormatException が発生する可能性があります"

# [should] 強く推奨する修正
# "should: この処理は try-with-resources を使うべきです。
#  リソースリークの原因になります"

# [nit] 軽微な指摘（任意修正）
# "nit: インデントが4スペースではなくタブになっています"
# "nit: メソッド名は getUsers より findActiveUsers の方が明確です"

# [question] 質問・確認
# "question: このタイムアウト値 30秒 の根拠はありますか？"

# [suggestion] 提案（別の実装方法）
# "suggestion: Stream API を使うとこう書けます:
#  users.stream()
#      .filter(User::isActive)
#      .map(User::getName)
#      .toList();"

# [praise] 良い点の称賛
# "praise: このエラーハンドリングの設計は素晴らしいです。
#  再利用性が高いですね。"

# GitHub の Suggestion 機能（コード修正の提案）
# レビューコメントで以下のように書くと、
# レビュイーが1クリックで適用可能：
# \`\`\`suggestion
# private static final int TIMEOUT = 30;
# \`\`\``,
      },
    ],
  },
  {
    id: "review-java",
    title: "Javaコードのレビュー観点",
    category: "review",
    description: "Java特有のレビューポイント、よくある指摘パターン",
    sections: [
      {
        title: "Javaコードでよくある指摘",
        content:
          "Javaのコードレビューでは、NullPointerException対策、リソース管理、スレッドセーフティ、例外処理、パフォーマンスなどが頻出の指摘ポイントです。",
        code: `// ❌ NullPointerException のリスク
String name = user.getName();  // user が null なら NPE
name.toUpperCase();

// ✅ Null安全な実装
String name = Optional.ofNullable(user)
    .map(User::getName)
    .orElse("Unknown");

// ❌ リソースリーク
FileReader reader = new FileReader("data.txt");
String data = reader.read();
// reader.close() を忘れている

// ✅ try-with-resources
try (var reader = new FileReader("data.txt")) {
    // 自動的にクローズされる
}

// ❌ 文字列連結のパフォーマンス
String result = "";
for (String s : list) {
    result += s + ", ";          // 毎回新しいStringを生成
}

// ✅ StringBuilder / String.join
String result = String.join(", ", list);

// ❌ == でオブジェクト比較
if (str1 == str2) { ... }

// ✅ equals で比較
if (Objects.equals(str1, str2)) { ... }

// ❌ 例外の握りつぶし
try {
    riskyMethod();
} catch (Exception e) {
    // 何もしない
}

// ✅ 適切な例外処理
try {
    riskyMethod();
} catch (IOException e) {
    logger.error("ファイル読み込みエラー", e);
    throw new ServiceException("処理に失敗しました", e);
}

// ❌ マジックナンバー
if (status == 3) { ... }

// ✅ 定数または enum
if (status == Status.APPROVED) { ... }`,
      },
    ],
  },
  // ===== 高度な運用 =====
  {
    id: "git-rebase",
    title: "リベースとコミット整理",
    category: "advanced",
    description: "rebase, interactive rebase, cherry-pick, コミットの整理",
    sections: [
      {
        title: "リベースの使い方",
        content:
          "git rebase は分岐元を変更してコミットを再適用する操作です。merge と異なり、線形的で読みやすい履歴を作ります。interactive rebase でコミットの順序変更、統合、編集が可能です。",
        code: `# 基本的なリベース
# feature ブランチを main の最新に追従させる
$ git switch feature/login
$ git rebase main
# → feature のコミットが main の先頭に再適用される

# Interactive rebase（コミット整理）
$ git rebase -i HEAD~4
# エディタが開く：
# pick abc1234 WIP: 初期実装
# pick def5678 WIP: バグ修正
# pick ghi9012 feat: ログイン機能完成
# pick jkl3456 fix: typo修正

# 操作コマンド:
# pick   = コミットをそのまま使用
# squash = 前のコミットと統合
# fixup  = squash と同じだがメッセージは破棄
# reword = コミットメッセージを変更
# edit   = コミットを編集
# drop   = コミットを削除

# 整理後:
# pick abc1234 WIP: 初期実装
# squash def5678 WIP: バグ修正
# squash ghi9012 feat: ログイン機能完成
# fixup jkl3456 fix: typo修正
# → 4つのコミットが1つにまとまる

# cherry-pick（特定コミットを適用）
$ git switch main
$ git cherry-pick abc1234         # 特定のコミットだけ適用
$ git cherry-pick abc1234..def5678  # 範囲指定

# 注意: push済みのコミットは rebase しない
# → 他の開発者の履歴と矛盾が生じるため`,
      },
    ],
  },
  {
    id: "branching-strategy",
    title: "ブランチ戦略",
    category: "advanced",
    description: "GitHub Flow, Git Flow, トランクベース開発",
    sections: [
      {
        title: "ブランチ戦略の比較",
        content:
          "プロジェクトの規模やリリースサイクルに合わせてブランチ戦略を選択します。GitHub Flow はシンプルで小規模チーム向け、Git Flow はリリースが明確な大規模プロジェクト向け、トランクベースはCI/CDが整ったチーム向けです。",
        code: `# ============ GitHub Flow（推奨・シンプル） ============
# 1. main ブランチは常にデプロイ可能
# 2. 機能ブランチを作成して作業
# 3. PRを作成してレビュー
# 4. main にマージ → 自動デプロイ

$ git switch -c feature/xxx
# ... 開発 ...
$ git push -u origin feature/xxx
$ gh pr create
# レビュー → マージ → 自動デプロイ

# ============ Git Flow ============
# main:    リリース済みの安定コード
# develop: 開発中の最新コード
# feature/*: 機能開発
# release/*: リリース準備
# hotfix/*:  緊急修正

# 機能開発
$ git switch -c feature/xxx develop
# ... 開発 ...
$ git switch develop
$ git merge --no-ff feature/xxx

# リリース準備
$ git switch -c release/1.0 develop
# ... バージョン更新、最終テスト ...
$ git switch main && git merge release/1.0
$ git tag v1.0.0
$ git switch develop && git merge release/1.0

# ============ トランクベース開発 ============
# - main（trunk）に直接または短命ブランチでマージ
# - ブランチは1-2日で消化
# - Feature Flag で未完成機能を隠す
# - 強力なCI/CDが前提

$ git switch -c short-lived-branch
# ... 少量の変更 ...
$ gh pr create && gh pr merge --squash`,
      },
    ],
  },
  {
    id: "fork-oss",
    title: "フォークとOSSコントリビューション",
    category: "advanced",
    description: "フォーク、アップストリーム同期、OSSへのPR",
    sections: [
      {
        title: "OSSへのコントリビューション手順",
        content:
          "オープンソースプロジェクトにコントリビューションする場合、リポジトリをフォークし、自分のフォーク上で変更を加え、本家にPRを送ります。アップストリームとの同期を定期的に行います。",
        code: `# 1. リポジトリをフォーク
$ gh repo fork upstream/project --clone
$ cd project

# 2. アップストリームを確認
$ git remote -v
# origin    git@github.com:your/project.git (fetch)
# upstream  git@github.com:upstream/project.git (fetch)

# 3. 機能ブランチを作成
$ git switch -c fix/typo-in-readme

# 4. 変更をコミット
$ git add README.md
$ git commit -m "docs: README.md の誤字を修正"

# 5. フォークにプッシュ
$ git push origin fix/typo-in-readme

# 6. 本家にPRを作成
$ gh pr create --repo upstream/project \\
  --title "docs: README.md の誤字を修正" \\
  --body "## 概要
typo を修正しました。

## 変更内容
- 'recieve' → 'receive' に修正"

# アップストリームとの同期
$ git fetch upstream
$ git switch main
$ git merge upstream/main
$ git push origin main

# リベースで最新に追従
$ git switch fix/typo-in-readme
$ git rebase upstream/main
$ git push --force-with-lease     # フォースプッシュ（安全版）

# コントリビューションの心得
# 1. CONTRIBUTING.md を読む
# 2. Issue を先に作成して方針を確認
# 3. コーディング規約に従う
# 4. テストを追加する
# 5. コミットメッセージの規約を確認
# 6. 小さなPRから始める`,
      },
    ],
  },
  // ===== CI/CD・自動化 =====
  {
    id: "github-actions",
    title: "GitHub Actions",
    category: "ci-cd",
    description: "CI/CDワークフローの構築、テスト自動化、デプロイ",
    sections: [
      {
        title: "GitHub Actions の基本",
        content:
          "GitHub Actions はリポジトリ内にYAMLファイルでCI/CDパイプラインを定義する自動化プラットフォームです。PR作成時にテストを自動実行し、マージ時にデプロイを行うなど、開発ワークフローを自動化できます。",
        code: `# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Set up JDK 21
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'

      - name: Cache Maven packages
        uses: actions/cache@v4
        with:
          path: ~/.m2
          key: \${{ runner.os }}-m2-\${{ hashFiles('**/pom.xml') }}

      - name: Build with Maven
        run: mvn compile

      - name: Run tests
        run: mvn test

      - name: Check code style
        run: mvn checkstyle:check

  deploy:
    needs: build                 # build ジョブの後に実行
    if: github.ref == 'refs/heads/main'  # main のみ
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Deploy
        run: echo "Deploy to production"`,
      },
      {
        title: "PR用のワークフロー",
        content:
          "PRに対して自動テスト、コードカバレッジ、静的解析を実行し、結果をPRにコメントとして表示できます。ブランチ保護ルールと組み合わせることで、品質ゲートを設定します。",
        code: `# .github/workflows/pr-check.yml
name: PR Check

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'

      - name: Run tests with coverage
        run: mvn test jacoco:report

      - name: Post coverage comment
        uses: madrapps/jacoco-report@v1.6
        with:
          paths: target/site/jacoco/jacoco.xml
          token: \${{ secrets.GITHUB_TOKEN }}
          min-coverage-overall: 80

  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run SpotBugs
        run: mvn spotbugs:check

# ブランチ保護ルール（Settings → Branches）
# ✓ Require pull request reviews (1人以上の承認)
# ✓ Require status checks to pass (CIが成功)
# ✓ Require branches to be up to date
# ✓ Require linear history (Squash merge推奨)
# ✗ Allow force pushes (禁止)
# ✗ Allow deletions (禁止)

# GitHub CLI でチェックのステータス確認
$ gh pr checks 123
$ gh run list
$ gh run view 12345              # ワークフロー実行の詳細
$ gh run watch 12345             # リアルタイムで監視`,
      },
    ],
  },
  {
    id: "gh-cli",
    title: "GitHub CLI (gh) 活用",
    category: "ci-cd",
    description: "gh コマンドによるGitHub操作の効率化",
    sections: [
      {
        title: "gh コマンドリファレンス",
        content:
          "GitHub CLI (gh) はターミナルからGitHubの機能をフル活用できるツールです。PR、Issue、Actions、リリース、コードレビューなどの操作をコマンドラインから効率的に行えます。",
        code: `# インストール
$ brew install gh                # macOS
$ sudo apt install gh            # Ubuntu

# 認証
$ gh auth login
$ gh auth status

# ============ PR操作 ============
$ gh pr create                   # PR作成（対話形式）
$ gh pr list                     # PR一覧
$ gh pr view 123                 # PR詳細
$ gh pr view --web               # ブラウザで開く
$ gh pr diff 123                 # 差分表示
$ gh pr checkout 123             # PRのブランチをチェックアウト
$ gh pr merge 123 --squash --delete-branch
$ gh pr close 123                # PRクローズ

# ============ Issue操作 ============
$ gh issue create                # Issue作成
$ gh issue list --label bug      # ラベルフィルタ
$ gh issue view 42               # 詳細
$ gh issue close 42              # クローズ

# ============ リポジトリ操作 ============
$ gh repo create                 # リポジトリ作成
$ gh repo clone user/repo        # クローン
$ gh repo view                   # 情報表示
$ gh repo fork                   # フォーク

# ============ Actions ============
$ gh run list                    # ワークフロー一覧
$ gh run view 12345              # 実行詳細
$ gh run rerun 12345             # 再実行
$ gh run watch                   # リアルタイム監視

# ============ リリース ============
$ gh release create v1.0.0 --title "v1.0.0" --notes "Initial release"
$ gh release list
$ gh release download v1.0.0

# ============ API直接呼び出し ============
$ gh api repos/owner/repo/pulls  # REST API
$ gh api graphql -f query='{ viewer { login } }'

# エイリアス設定
$ gh alias set prc 'pr create'
$ gh alias set prm 'pr merge --squash --delete-branch'`,
      },
    ],
  },
];
