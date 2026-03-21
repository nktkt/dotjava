export interface GitPracticalSection {
  title: string;
  content: string;
  code?: string;
}

export interface GitPracticalChapter {
  id: string;
  title: string;
  description: string;
  category: string;
  sections: GitPracticalSection[];
}

export interface GitPracticalCategory {
  id: string;
  name: string;
  color: string;
}

export const gitPracticalCategories: GitPracticalCategory[] = [
  { id: "basics", name: "Git基礎", color: "#2563EB" },
  { id: "branching", name: "ブランチ戦略", color: "#059669" },
  { id: "collaboration", name: "チーム開発", color: "#D97706" },
  { id: "advanced", name: "Git応用", color: "#DC2626" },
];

export const gitPracticalChapters: GitPracticalChapter[] = [
  // ===== Git基礎 =====
  {
    id: "git-fundamentals",
    title: "Gitの仕組みと基本概念",
    description:
      "オブジェクトモデル、HEAD・インデックス・ワーキングツリー、.gitディレクトリ構造を理解する",
    category: "basics",
    sections: [
      {
        title: "Gitオブジェクトモデル（blob/tree/commit）",
        content:
          "Gitは内部的に4種類のオブジェクトでデータを管理します。blob はファイルの内容そのもの、tree はディレクトリ構造（blob や他の tree への参照）、commit はスナップショット（tree への参照 + メタデータ）、tag はコミットへの名前付き参照です。すべてのオブジェクトは SHA-1 ハッシュで一意に識別されます。このコンテンツアドレス型の設計により、同じ内容のファイルは常に同じハッシュを持ち、効率的なストレージと完全なデータ整合性が実現されています。",
        code: `# Gitオブジェクトの確認
# blob: ファイルの内容を格納
echo "Hello Git" | git hash-object --stdin
# => e965047ad7c57865823c7d992b1d046ea66edf78

# オブジェクトの中身を表示
git cat-file -p e96504
# => Hello Git

# オブジェクトの種類を確認
git cat-file -t e96504
# => blob

# コミットオブジェクトの構造を確認
git cat-file -p HEAD
# tree 4b825dc642cb6eb9a060e54bf899d15600e6c5a2
# parent a1b2c3d4e5f6...
# author Taro <taro@example.com> 1700000000 +0900
# committer Taro <taro@example.com> 1700000000 +0900
#
# Initial commit

# tree オブジェクトの中身を確認
git cat-file -p HEAD^{tree}
# 100644 blob a1b2c3...  README.md
# 040000 tree d4e5f6...  src

# オブジェクトの関係図
# commit ─→ tree（ルート）
#              ├── blob（README.md）
#              ├── blob（.gitignore）
#              └── tree（src/）
#                    ├── blob（Main.java）
#                    └── blob（Utils.java）`,
      },
      {
        title: "HEAD・インデックス・ワーキングツリー",
        content:
          "Gitには3つの主要な領域があります。ワーキングツリー（作業ディレクトリ）は実際にファイルを編集する場所です。インデックス（ステージングエリア）は次のコミットに含める変更を準備する中間領域です。HEAD は現在チェックアウトしているブランチの最新コミットを指すポインタです。git add でワーキングツリーからインデックスに変更をステージし、git commit でインデックスの内容を新しいコミットとして記録します。この3層構造を理解することが、Gitを使いこなす鍵です。",
        code: `# 3つの領域の関係
#
# ┌──────────────┐  git add   ┌──────────────┐  git commit  ┌──────────────┐
# │ ワーキング    │ ─────────→ │ インデックス  │ ──────────→  │   HEAD       │
# │ ツリー        │            │（ステージ）   │              │ （リポジトリ） │
# │              │ ←───────── │              │ ←──────────  │              │
# └──────────────┘ git restore └──────────────┘  git reset   └──────────────┘

# 各領域の状態を確認
git status
# On branch main
# Changes to be committed:       ← インデックスにある変更
#   modified:   src/Main.java
# Changes not staged for commit:  ← ワーキングツリーのみの変更
#   modified:   README.md
# Untracked files:                ← Git管理外のファイル
#   docs/

# HEAD が指すコミットを確認
git rev-parse HEAD
# => a1b2c3d4e5f6789...

# HEAD が指すブランチを確認
git symbolic-ref HEAD
# => refs/heads/main

# インデックスの内容を表示
git ls-files --stage
# 100644 a1b2c3... 0  README.md
# 100644 d4e5f6... 0  src/Main.java

# 各領域間の差分
git diff              # ワーキングツリー vs インデックス
git diff --staged     # インデックス vs HEAD
git diff HEAD         # ワーキングツリー vs HEAD`,
      },
      {
        title: ".gitディレクトリの構造",
        content:
          ".git ディレクトリはリポジトリのすべてのメタデータとオブジェクトデータを格納します。objects/ にはすべての Git オブジェクト（blob/tree/commit/tag）が圧縮されて保存されます。refs/ にはブランチやタグの参照（特定のコミットハッシュへのポインタ）が格納されます。HEAD ファイルは現在のブランチを示し、config ファイルにはリポジトリ固有の設定が記録されます。hooks/ にはフック用のスクリプトを配置できます。この構造を理解しておくと、トラブル時の調査や復旧に役立ちます。",
        code: `# .git ディレクトリの構造
tree .git -L 1
# .git/
# ├── HEAD          # 現在のブランチへの参照
# ├── config        # リポジトリ設定
# ├── description   # GitWebで使用（通常不要）
# ├── hooks/        # フックスクリプト
# ├── index         # ステージングエリア（バイナリ）
# ├── info/         # .gitignore以外の除外設定
# ├── logs/         # reflog（参照の変更履歴）
# ├── objects/      # すべてのGitオブジェクト
# ├── packed-refs   # パック済みの参照
# └── refs/         # ブランチ・タグの参照

# HEAD の中身を確認
cat .git/HEAD
# ref: refs/heads/main

# ブランチの実体（コミットハッシュ）
cat .git/refs/heads/main
# a1b2c3d4e5f6789...

# リモートブランチの参照
ls .git/refs/remotes/origin/
# main
# develop
# feature/login

# objects の格納方式（ハッシュの先頭2文字がディレクトリ名）
ls .git/objects/
# 0a/ 1b/ 2c/ ... e9/ info/ pack/

# パックファイル（効率化のためオブジェクトをまとめたもの）
ls .git/objects/pack/
# pack-abc123...def.idx   # インデックスファイル
# pack-abc123...def.pack  # パックファイル`,
      },
      {
        title: "git initからの流れ",
        content:
          "リポジトリの作成から最初のコミットまでの流れを確認しましょう。git init で空のリポジトリを初期化し、ファイルを作成して git add でステージし、git commit でコミットします。また、既存のリモートリポジトリを git clone で取得する方法もあります。リポジトリの初期化時にはデフォルトブランチ名の設定（main / master）に注意が必要です。git init --bare はサーバー上のベアリポジトリ（ワーキングツリーなし）を作成する際に使用します。",
        code: `# === 新しいリポジトリを作成 ===
# リポジトリを初期化
git init my-project
cd my-project

# デフォルトブランチ名を main に設定（グローバル設定）
git config --global init.defaultBranch main

# ユーザー情報を設定（リポジトリ単位）
git config user.name "Taro Yamada"
git config user.email "taro@example.com"

# 最初のファイルを作成してコミット
echo "# My Project" > README.md
git add README.md
git commit -m "feat: 初期コミット"

# リモートリポジトリを追加
git remote add origin https://github.com/user/my-project.git
git push -u origin main

# === 既存リポジトリをクローン ===
# HTTPS でクローン
git clone https://github.com/user/my-project.git

# SSH でクローン（推奨）
git clone git@github.com:user/my-project.git

# 特定のブランチのみクローン
git clone -b develop --single-branch https://github.com/user/repo.git

# シャロークローン（最新履歴のみ、CI向け）
git clone --depth 1 https://github.com/user/repo.git

# ベアリポジトリの作成（サーバー用）
git init --bare /srv/git/my-project.git`,
      },
    ],
  },
  {
    id: "staging-committing",
    title: "ステージングとコミット戦略",
    description:
      "git add の詳細オプション、良いコミットメッセージの書き方、amendとgitignoreを学ぶ",
    category: "basics",
    sections: [
      {
        title: "git add の詳細（-p / --patch）",
        content:
          "git add にはファイル単位だけでなく、変更の一部だけをステージングする機能があります。git add -p（--patch）を使うと、各変更箇所（hunk）ごとにステージするかどうかを対話的に選択できます。1つのファイル内の複数の変更を論理的に分けて別々のコミットにする場合に非常に便利です。また、git add -N（--intent-to-add）は新規ファイルをパスだけ登録し、内容のステージングは後から行う場合に使います。",
        code: `# ファイル全体をステージ
git add README.md

# ディレクトリ内のすべてをステージ
git add src/

# すべての変更をステージ（新規・変更・削除）
git add -A

# 変更・削除のみ（新規ファイルは除外）
git add -u

# パッチモード：変更箇所を選択的にステージ
git add -p src/Main.java
# y - この hunk をステージする
# n - この hunk をスキップする
# s - この hunk をさらに小さく分割する
# e - この hunk を手動で編集する
# q - 終了（残りはすべてスキップ）

# 例: 1つのファイルに機能追加とバグ修正が混在する場合
git add -p src/UserService.java
# → バグ修正部分のみ y でステージ
git commit -m "fix: ユーザー検索のNullPointerExceptionを修正"

git add -p src/UserService.java
# → 機能追加部分を y でステージ
git commit -m "feat: ユーザー検索にページネーションを追加"

# 新規ファイルのパス登録のみ（内容はステージしない）
git add -N new-file.txt
# → git diff で差分が見える状態になる`,
      },
      {
        title: "良いコミットメッセージの書き方（Conventional Commits）",
        content:
          "良いコミットメッセージはプロジェクトの変更履歴を追跡しやすくします。Conventional Commits は業界標準のフォーマットで、type(scope): description の形式を取ります。type には feat（新機能）、fix（バグ修正）、docs（ドキュメント）、style（フォーマット）、refactor（リファクタリング）、test（テスト）、chore（雑務）などがあります。BREAKING CHANGE がある場合は型の後に ! を付けるか、フッターに記載します。このフォーマットに従うと、CHANGELOGの自動生成やセマンティックバージョニングとの連携が可能になります。",
        code: `# Conventional Commits のフォーマット
# <type>(<scope>): <description>
#
# [optional body]
#
# [optional footer(s)]

# === 良い例 ===

# 新機能の追加
git commit -m "feat(auth): ソーシャルログイン機能を追加"

# バグ修正
git commit -m "fix(api): ユーザー一覧APIの500エラーを修正"

# 破壊的変更（BREAKING CHANGE）
git commit -m "feat(api)!: レスポンス形式をJSONAPIに変更

BREAKING CHANGE: レスポンスのdata構造が変わりました。
移行手順は MIGRATION.md を参照してください。"

# 複数行のコミットメッセージ
git commit -m "refactor(user): UserServiceのDI方式を変更

コンストラクタインジェクションに統一することで、
テスタビリティとイミュータビリティを向上させた。

Refs: #142"

# === 悪い例 ===
# git commit -m "修正"           ← 何を修正したか不明
# git commit -m "バグ直した"     ← 具体性がない
# git commit -m "WIP"            ← 作業途中でコミットしない

# === type 一覧 ===
# feat:     新機能
# fix:      バグ修正
# docs:     ドキュメントのみの変更
# style:    フォーマット（セミコロンの追加など）
# refactor: 機能追加もバグ修正もないコード変更
# perf:     パフォーマンス改善
# test:     テストの追加・修正
# build:    ビルドシステムや外部依存の変更
# ci:       CI設定の変更
# chore:    その他の雑務`,
      },
      {
        title: "git commit --amend",
        content:
          "git commit --amend は直前のコミットを修正するためのコマンドです。コミットメッセージの誤字修正や、ステージし忘れたファイルの追加に使います。--amend は実際には新しいコミットオブジェクトを作成して古いものを置き換えるため、コミットハッシュが変わります。したがって、既にリモートにプッシュ済みのコミットに対して amend を使うと、force push が必要になり、他の開発者に影響を与える可能性があります。ローカルのコミットに対してのみ使用するのが安全です。",
        code: `# コミットメッセージを修正
git commit --amend -m "fix: 正しいコミットメッセージに修正"

# 直前のコミットにファイルを追加（メッセージはそのまま）
git add forgotten-file.txt
git commit --amend --no-edit

# 直前のコミットの著者情報を修正
git commit --amend --author="Taro Yamada <taro@example.com>"

# 直前のコミットの日時を修正
git commit --amend --date="2024-01-15T10:00:00+09:00"

# === 注意: amend 後のプッシュ ===
# amend するとコミットハッシュが変わるため、
# 既にプッシュ済みの場合は force push が必要
git push --force-with-lease origin feature/login
# --force-with-lease は --force より安全
# （他の人がプッシュしていた場合に失敗する）

# === amend の仕組み ===
# Before:
#   A → B → C (HEAD, main)
#
# After amend:
#   A → B → C' (HEAD, main)  ← 新しいハッシュのコミット
#        ↘ C                  ← 古いコミット（reflogに残る）

# 間違えて amend した場合の復旧
git reflog
# abc1234 HEAD@{0}: commit (amend): 修正後のメッセージ
# def5678 HEAD@{1}: commit: 元のメッセージ
git reset --soft def5678  # amend前の状態に戻す`,
      },
      {
        title: ".gitignore の設定",
        content:
          ".gitignore ファイルを使用すると、Git の追跡対象から特定のファイルやディレクトリを除外できます。ビルド成果物、IDE設定ファイル、環境変数ファイル、依存ライブラリなどを除外するのが一般的です。パターンにはグロブ構文が使えます。ディレクトリの各階層に .gitignore を配置でき、より深い階層の設定が優先されます。すでに追跡されているファイルは .gitignore に追加しても無視されないため、git rm --cached で追跡を解除する必要があります。",
        code: `# .gitignore の基本的なパターン

# === Java プロジェクトの例 ===

# ビルド成果物
target/
build/
*.class
*.jar
*.war

# IDE 設定ファイル
.idea/
*.iml
.vscode/
.settings/
.project
.classpath

# 環境変数・秘密情報
.env
.env.local
*.key
*.pem
application-local.yml

# OS 生成ファイル
.DS_Store
Thumbs.db

# ログファイル
logs/
*.log

# 依存ライブラリ
node_modules/

# === パターン構文 ===
# *        : 任意の文字列（/ を除く）
# **       : 任意のディレクトリ
# ?        : 任意の1文字
# [abc]    : a, b, c のいずれか
# !        : 除外の除外（無視しない）

# 例: docs/ 以下の .md は無視するが README.md は追跡
docs/**/*.md
!docs/README.md

# === 既に追跡中のファイルを除外する ===
# .gitignore に追記しただけでは効果がない
git rm --cached .env
git rm --cached -r .idea/
git commit -m "chore: .envと.ideaを追跡対象から除外"

# === グローバル gitignore（全リポジトリ共通） ===
git config --global core.excludesfile ~/.gitignore_global

# === .gitignore が効いているか確認 ===
git check-ignore -v target/app.jar
# .gitignore:3:target/  target/app.jar`,
      },
    ],
  },

  // ===== ブランチ戦略 =====
  {
    id: "branch-basics",
    title: "ブランチの基本操作",
    description:
      "ブランチの作成・切替・削除、git switch、命名規則、リモートブランチの追跡を学ぶ",
    category: "branching",
    sections: [
      {
        title: "ブランチの作成・切替・削除",
        content:
          "Gitのブランチは特定のコミットへの軽量なポインタに過ぎません。新しいブランチを作成してもコミット履歴のコピーは行われず、41バイトの参照ファイルが作られるだけです。この軽量さが、Git の強力なブランチモデルの基盤です。ブランチの作成には git branch、切り替えには git switch（または git checkout）、削除には git branch -d を使います。-d はマージ済みのブランチのみ削除し、-D は未マージでも強制削除します。",
        code: `# ブランチ一覧を表示
git branch          # ローカルブランチ
git branch -r       # リモートブランチ
git branch -a       # すべてのブランチ
git branch -v       # 最新コミット情報付き
git branch --merged # マージ済みブランチ

# ブランチの作成
git branch feature/login

# ブランチの作成と切り替えを同時に行う
git switch -c feature/login
# または
git checkout -b feature/login

# ブランチの切り替え
git switch feature/login
git switch main
git switch -       # 直前のブランチに戻る

# ブランチの削除
git branch -d feature/login      # マージ済みのみ削除可
git branch -D feature/login      # 強制削除

# リモートブランチの削除
git push origin --delete feature/login

# ブランチ名の変更
git branch -m old-name new-name  # 任意のブランチ
git branch -m new-name           # 現在のブランチ

# ブランチの比較
git log main..feature/login       # main にないコミット
git log feature/login..main       # feature にないコミット
git diff main...feature/login     # 分岐後の差分`,
      },
      {
        title: "git switch vs git checkout",
        content:
          "Git 2.23 で導入された git switch と git restore は、それまで git checkout が担っていた2つの異なる機能を分離したコマンドです。git switch はブランチの切り替え専用、git restore はファイルの復元専用です。git checkout は両方の機能を持つため混乱しやすく、新しいコマンドの使用が推奨されています。ただし、git checkout も引き続き使用可能であり、多くのドキュメントやチュートリアルでは今も checkout が使われています。",
        code: `# === git switch（ブランチ操作専用） ===

# ブランチ切り替え
git switch main
git switch feature/login

# 新規ブランチ作成 + 切り替え
git switch -c feature/signup

# リモートブランチをチェックアウト
git switch -c feature/login origin/feature/login
# または自動追跡
git switch feature/login  # origin/feature/login が存在すれば自動追跡

# 直前のブランチに戻る
git switch -

# detached HEAD でコミットをチェックアウト
git switch --detach abc1234

# === git restore（ファイル復元専用） ===

# ワーキングツリーの変更を取り消す
git restore src/Main.java

# ステージを取り消す（インデックスから除去）
git restore --staged src/Main.java

# 特定コミットの状態にファイルを復元
git restore --source=HEAD~3 src/Main.java

# === 旧: git checkout（両方の機能） ===

# ブランチ切り替え → git switch に対応
git checkout main
git checkout -b feature/new

# ファイル復元 → git restore に対応
git checkout -- src/Main.java
git checkout HEAD~3 -- src/Main.java

# 推奨: switch + restore を使い分ける方が意図が明確`,
      },
      {
        title: "ブランチの命名規則",
        content:
          "チーム開発ではブランチの命名規則を統一することが重要です。一般的な規則では、プレフィックスで種類を示します：feature/ は新機能、fix/ または bugfix/ はバグ修正、hotfix/ は緊急修正、release/ はリリース準備、chore/ は雑務です。プレフィックスの後にはチケット番号や簡潔な説明を付けます。スラッシュ区切りにすることで、多くのGitクライアントでフォルダ的にグルーピングされます。ブランチ名にはASCII文字、ハイフン、スラッシュを使い、スペースや日本語は避けましょう。",
        code: `# === ブランチ命名規則の例 ===

# 機能開発
git switch -c feature/user-authentication
git switch -c feature/JIRA-123-add-login-page
git switch -c feature/payment-integration

# バグ修正
git switch -c fix/null-pointer-in-search
git switch -c fix/JIRA-456-login-error
git switch -c bugfix/memory-leak

# 緊急修正（本番障害）
git switch -c hotfix/security-vulnerability
git switch -c hotfix/v2.1.1

# リリース準備
git switch -c release/v2.0.0
git switch -c release/2024-01

# リファクタリング・雑務
git switch -c chore/update-dependencies
git switch -c refactor/extract-user-service
git switch -c docs/api-documentation

# === 命名ルール ===
# ✅ 良い例
# feature/add-user-search
# fix/PROJ-123-fix-timeout
# release/v1.2.0

# ❌ 悪い例
# my-branch           ← プレフィックスがない
# Feature/Login       ← 大文字は避ける
# feature/add login   ← スペースは使えない
# fix/修正            ← 日本語は避ける
# feature/add-user-search-functionality-to-admin-panel  ← 長すぎる

# === チーム設定例（ブランチ保護と組み合わせ）===
# main     : 本番環境（直接プッシュ禁止）
# develop  : 開発ブランチ
# feature/* : 機能ブランチ（develop から分岐）
# release/* : リリースブランチ
# hotfix/*  : 緊急修正（main から分岐）`,
      },
      {
        title: "リモートブランチの追跡",
        content:
          "リモート追跡ブランチは、リモートリポジトリのブランチの状態を表すローカルの参照です。origin/main のような名前で表示されます。git fetch でリモートの最新情報を取得し、リモート追跡ブランチを更新します。ローカルブランチとリモートブランチの関連付け（追跡設定）を行うと、git pull や git push でリモート名やブランチ名を省略できます。git push -u（--set-upstream）で追跡設定を行うのが一般的です。",
        code: `# リモート情報の確認
git remote -v
# origin  git@github.com:user/repo.git (fetch)
# origin  git@github.com:user/repo.git (push)

# リモートの詳細情報
git remote show origin

# リモートの最新情報を取得（マージはしない）
git fetch origin
git fetch --all          # すべてのリモート
git fetch --prune        # リモートで削除されたブランチを反映

# 追跡関係の設定
git push -u origin feature/login
# -u は --set-upstream の略

# 既存ブランチに追跡設定を追加
git branch --set-upstream-to=origin/feature/login feature/login
# 短縮形
git branch -u origin/feature/login

# 追跡状況の確認
git branch -vv
# * main           abc1234 [origin/main] feat: 初期コミット
#   feature/login  def5678 [origin/feature/login: ahead 2] feat: ログイン画面
#   old-branch     ghi9012 [origin/old-branch: gone] chore: 古い作業

# ahead / behind の意味
# ahead 2:  ローカルに2つのプッシュしていないコミットがある
# behind 3: リモートに3つのまだ取り込んでいないコミットがある
# gone:     リモートブランチが削除されている

# リモートから新しいブランチを取得して切り替え
git switch feature/login  # origin/feature/login を自動追跡

# リモートで削除されたブランチをローカルでも削除
git fetch --prune
git branch -d old-branch`,
      },
    ],
  },
  {
    id: "branch-strategies",
    title: "ブランチ戦略",
    description:
      "Git Flow、GitHub Flow、Trunk-Based Developmentの特徴と選び方を学ぶ",
    category: "branching",
    sections: [
      {
        title: "Git Flow",
        content:
          "Git Flow は Vincent Driessen が2010年に提案したブランチモデルで、main（本番）と develop（開発）の2つの永続ブランチを持ちます。feature ブランチは develop から分岐して develop にマージ、release ブランチは develop から分岐して main と develop の両方にマージ、hotfix は main から分岐して main と develop にマージします。複雑なリリースサイクルを持つプロジェクトに適していますが、ブランチが多くなり管理が煩雑になるという欠点もあります。",
        code: `# Git Flow のブランチ構成
#
# main ─────●──────────────●──────────●──→ (本番リリース)
#            ↑              ↑          ↑
#    hotfix ─┤   release ───┤          │
#            ↓              ↓          │
# develop ──●──●──●──●──●──●──●──●──●──→ (開発ブランチ)
#               ↑     ↑     ↑     ↑
#    feature ───┘     │     │     │
#    feature ─────────┘     │     │
#    feature ───────────────┘     │
#    feature ─────────────────────┘

# === Git Flow の実践 ===

# 1. 機能開発
git switch develop
git switch -c feature/user-search
# ... 開発作業 ...
git switch develop
git merge --no-ff feature/user-search
git branch -d feature/user-search

# 2. リリース準備
git switch develop
git switch -c release/v1.2.0
# ... バージョン番号更新、最終テスト ...
git switch main
git merge --no-ff release/v1.2.0
git tag -a v1.2.0 -m "Release v1.2.0"
git switch develop
git merge --no-ff release/v1.2.0
git branch -d release/v1.2.0

# 3. 緊急修正
git switch main
git switch -c hotfix/security-fix
# ... 修正作業 ...
git switch main
git merge --no-ff hotfix/security-fix
git tag -a v1.2.1 -m "Hotfix v1.2.1"
git switch develop
git merge --no-ff hotfix/security-fix
git branch -d hotfix/security-fix

# --no-ff はマージコミットを必ず作成（履歴を明確に保つ）`,
      },
      {
        title: "GitHub Flow",
        content:
          "GitHub Flow は Git Flow よりもシンプルなワークフローで、main ブランチと feature ブランチのみを使います。main は常にデプロイ可能な状態を保ち、すべての変更は feature ブランチで行い、Pull Request を通じてレビュー後に main にマージします。マージ後は即座にデプロイできる状態であることが前提です。CI/CD との相性が良く、継続的デリバリーを実践するチームに最適です。Web アプリケーションのように頻繁にリリースするプロジェクトに向いています。",
        code: `# GitHub Flow のブランチ構成
#
# main ──●──●──●──●──●──●──●──→ (常にデプロイ可能)
#         ↑  ↑     ↑     ↑
#  feat ──┘  │     │     │
#  fix  ─────┘     │     │
#  feat ───────────┘     │
#  feat ─────────────────┘
#
# ※ PR + レビュー + CI を経てマージ

# === GitHub Flow の実践 ===

# 1. main から feature ブランチを作成
git switch main
git pull origin main
git switch -c feature/add-search-api

# 2. 開発・コミット
git add src/SearchController.java
git commit -m "feat: 検索APIのエンドポイントを追加"
git add src/SearchService.java
git commit -m "feat: 検索ロジックを実装"

# 3. リモートにプッシュ
git push -u origin feature/add-search-api

# 4. Pull Request を作成（GitHub CLI）
gh pr create --title "feat: 検索API追加" \\
  --body "## 概要
検索APIのエンドポイントを追加

## 変更内容
- GET /api/search エンドポイント
- SearchService の実装
- 単体テスト追加

## テスト
- [x] 単体テスト
- [x] 結合テスト"

# 5. レビュー後にマージ（GitHub上 or CLI）
gh pr merge --squash

# 6. ローカルのクリーンアップ
git switch main
git pull origin main
git branch -d feature/add-search-api`,
      },
      {
        title: "Trunk-Based Development",
        content:
          "Trunk-Based Development（TBD）は、すべての開発者が main（trunk）ブランチに直接、または非常に短命な feature ブランチを通じてコミットする戦略です。ブランチの寿命は最長でも1-2日に制限します。大規模な機能は Feature Flag（機能フラグ）を使って制御し、コードは main に統合しつつ機能の有効/無効をランタイムで切り替えます。Google、Meta などの大企業が採用しており、マージコンフリクトの最小化と継続的インテグレーションの実現に優れています。",
        code: `# Trunk-Based Development のブランチ構成
#
# main ──●──●──●──●──●──●──●──●──●──→ (1つのブランチ)
#         ↑  ↑     ↑
#  短命 ──┘  │     │  ← 最長1-2日
#  短命 ─────┘     │
#  短命 ───────────┘
#
# ※ Feature Flag でリリース制御

# === TBD の実践 ===

# 1. main から短命ブランチを作成
git switch main
git pull origin main
git switch -c feat/search-api

# 2. Feature Flag を使った実装
# application.yml
# feature:
#   search-api:
#     enabled: false  ← 本番ではまだ無効

# 3. 小さな単位でコミット（1日以内にマージ）
git add .
git commit -m "feat: 検索APIの基盤を追加（Feature Flag: OFF）"
git push -u origin feat/search-api

# 4. すぐにPRを作成してマージ
gh pr create --title "feat: 検索API基盤" --body "Feature Flag: OFF"
# レビュー後すぐにマージ

# 5. 翌日: 次の部分を実装
git switch main
git pull
git switch -c feat/search-api-v2
# ... 実装 ...
git push -u origin feat/search-api-v2

# === Feature Flag の管理 ===
# 機能が完成したら Flag を ON にしてリリース
# application.yml
# feature:
#   search-api:
#     enabled: true  ← 本番で有効化

# 安定したら Feature Flag のコードを削除
git switch -c chore/remove-search-flag
# ... Flag 分岐コードを削除 ...`,
      },
      {
        title: "チーム規模に応じた選び方",
        content:
          "ブランチ戦略は銀の弾丸ではなく、チームの規模、リリースサイクル、プロダクトの性質に応じて選択する必要があります。小規模チーム（1-5人）では GitHub Flow のシンプルさが有効です。中規模チーム（5-20人）では Git Flow や GitHub Flow にリリースブランチを追加した形が適しています。大規模チーム（20人以上）では Trunk-Based Development と Feature Flag の組み合わせが効果的です。重要なのは、チーム全員がルールを理解し、一貫して従うことです。",
        code: `# === ブランチ戦略の比較表 ===
#
# 項目              Git Flow    GitHub Flow   TBD
# ──────────────────────────────────────────────
# 複雑さ            高い        低い          中程度
# ブランチ数        多い        少ない        最小
# リリースサイクル  定期的      随時          随時
# CI/CD 要求度      中          高            最高
# 向いているチーム  中〜大規模  小〜中規模    大規模
# 学習コスト        高い        低い          中程度
# マージコンフリクト 多い       少ない        最小
# ロールバック      容易        容易          Flag制御

# === 選び方のフローチャート ===
#
# Q: リリースサイクルは?
#   ├─ 月1回以下 → Git Flow
#   └─ 週1回以上
#       ├─ Q: チームサイズは?
#       │   ├─ 〜10人 → GitHub Flow
#       │   └─ 10人以上 → Trunk-Based
#       └─ Q: Feature Flag 導入可能?
#           ├─ はい → Trunk-Based
#           └─ いいえ → GitHub Flow

# === 実践的なチーム設定 ===

# GitHub Flow + ブランチ保護（推奨構成）
# main ブランチの保護ルール:
# - 直接プッシュ禁止
# - PRに最低1人のレビュー必須
# - CI パス必須
# - ブランチを最新に保つ

# GitHub CLI でブランチ保護を設定
gh api repos/{owner}/{repo}/branches/main/protection \\
  --method PUT \\
  --field required_pull_request_reviews='{"required_approving_review_count":1}' \\
  --field required_status_checks='{"strict":true,"contexts":["ci/test"]}' \\
  --field enforce_admins=true`,
      },
    ],
  },
  {
    id: "merge-rebase",
    title: "マージとリベース",
    description:
      "git merge の種類、rebase の仕組み、使い分け、interactive rebase を学ぶ",
    category: "branching",
    sections: [
      {
        title: "git merge の種類（fast-forward / recursive）",
        content:
          "git merge には主に2つの方式があります。Fast-forward マージは、分岐先のブランチに新しいコミットがない場合に行われ、単にポインタを前に進めるだけです。マージコミットは作成されません。Recursive（3-way）マージは、両方のブランチに新しいコミットがある場合に行われ、共通の祖先から両方の変更を統合するマージコミットを作成します。--no-ff オプションを使うと、fast-forward 可能な場合でもマージコミットを強制的に作成できます。これにより、feature ブランチの存在が履歴に残ります。",
        code: `# === Fast-forward マージ ===
#
# Before:
# main:    A → B
# feature:       → C → D
#
# After (git merge feature):
# main:    A → B → C → D
#
# ※ マージコミットなし、ポインタが移動するだけ

git switch main
git merge feature/login
# Fast-forward （ポインタが進むだけ）

# === Recursive（3-way）マージ ===
#
# Before:
# main:    A → B → E
# feature:       → C → D
#
# After (git merge feature):
# main:    A → B → E → M  (M = マージコミット)
#                ↗      ↗
# feature:    C → D ──┘

git switch main
git merge feature/login
# Merge made by the 'recursive' strategy.

# === --no-ff: マージコミットを強制作成 ===
#
# After (git merge --no-ff feature):
# main:    A → B → M  (マージコミットあり)
#                ↗  ↗
# feature:    C → D

git switch main
git merge --no-ff feature/login -m "feat: ログイン機能をマージ"

# === --squash: コミットをまとめてマージ ===
#
# feature のコミット C, D を1つにまとめて main に追加
git switch main
git merge --squash feature/login
git commit -m "feat: ログイン機能を追加"

# === マージ方式の比較 ===
# fast-forward: 履歴が直線的、ブランチの存在が残らない
# --no-ff:     マージコミットあり、ブランチの存在が残る
# --squash:    複数コミットを1つにまとめる、履歴がきれい`,
      },
      {
        title: "git rebase の仕組みと使い所",
        content:
          "git rebase はブランチの分岐元を移動させるコマンドです。feature ブランチで git rebase main を実行すると、feature ブランチのコミットが main の最新コミットの後ろに付け替えられます。内部的には、各コミットの変更パッチを順番に main の先端に適用し直しています。そのため、コミットハッシュが変わります。rebase の主な利点は、直線的で読みやすい履歴を作れることです。ただし、公開済みのコミットを rebase すると他の開発者に影響するため、ローカルの未プッシュコミットに対してのみ使用するのが原則です。",
        code: `# === rebase の仕組み ===
#
# Before:
# main:    A → B → E → F
# feature:       → C → D
#
# After (git rebase main on feature):
# main:    A → B → E → F
# feature:                → C' → D'
#
# C, D が E, F の後ろに付け替えられる
# C', D' は新しいハッシュを持つ

# feature ブランチを main の最新に追従させる
git switch feature/login
git rebase main

# コンフリクトが発生した場合
# 1. コンフリクトを解決
# 2. git add で解決済みをステージ
# 3. git rebase --continue で続行
git add src/Main.java
git rebase --continue

# rebase を中止して元の状態に戻す
git rebase --abort

# === rebase の使い所 ===

# 1. feature ブランチを main の最新に追従させる
git switch feature/login
git fetch origin
git rebase origin/main

# 2. プッシュ前にコミット履歴を整理する
git rebase -i HEAD~3  # 直近3コミットを整理

# 3. git pull 時に rebase を使う（マージコミットを避ける）
git pull --rebase origin main

# pull 時のデフォルトを rebase に設定
git config --global pull.rebase true

# === 注意事項 ===
# ❌ 公開済み（push済み）のコミットを rebase しない
# ❌ 共有ブランチ（main, develop）を rebase しない
# ✅ ローカルの未プッシュコミットのみ rebase する
# ✅ feature ブランチの更新に使う`,
      },
      {
        title: "merge vs rebase の使い分け",
        content:
          "merge と rebase のどちらを使うかは、チームのルールとケースバイケースで決めます。merge はコミット履歴をそのまま保存し、マージの事実を記録します。rebase は直線的な履歴を作りますが、コミットが書き換えられます。一般的な戦略は「feature ブランチの更新には rebase を使い、main への統合には merge を使う」です。つまり、git pull --rebase で main の変更を feature に取り込み、PR マージ時は merge（または squash merge）を使います。",
        code: `# === 推奨ワークフロー ===
#
# 1. feature ブランチの更新: rebase
# 2. main への統合: merge (or squash merge)

# === ワークフロー例 ===

# Step 1: feature ブランチで開発
git switch -c feature/user-api
git commit -m "feat: ユーザーAPIの基盤を作成"
git commit -m "feat: CRUD操作を実装"

# Step 2: main に新しいコミットが追加された
# → rebase で最新に追従
git fetch origin
git rebase origin/main

# Step 3: main にマージ（PRのマージボタン or コマンド）
git switch main
git merge --no-ff feature/user-api

# === merge を使うべき場合 ===
# - main / develop への統合時
# - コンフリクトが多い共同作業ブランチ
# - 正確な履歴（いつマージされたか）が重要な場合
# - 公開済みのブランチ

# === rebase を使うべき場合 ===
# - ローカルの feature ブランチを最新化する時
# - PR前にコミット履歴を整理する時
# - 直線的できれいな履歴が必要な時

# === 各マージ方式で生成される履歴 ===
#
# merge --no-ff:
# main: A → B → E → M
#             ↗      ↗
# feat:    C → D ──┘
# → ブランチの存在が明確に残る
#
# rebase + fast-forward merge:
# main: A → B → E → C' → D'
# → 直線的な履歴
#
# squash merge:
# main: A → B → E → S
# → 1コミットにまとまる（PR単位で1コミット）`,
      },
      {
        title: "Interactive Rebase（git rebase -i）",
        content:
          "Interactive rebase（git rebase -i）はコミット履歴を対話的に編集する強力な機能です。コミットの順序変更、メッセージの編集、コミットの統合（squash/fixup）、コミットの分割、不要なコミットの削除などが行えます。PR 作成前にコミット履歴を整理するのに最適です。ただし、rebase 同様にコミットハッシュが変わるため、プッシュ済みのコミットに対して使用する場合は force push が必要になります。",
        code: `# 直近3コミットを対話的に編集
git rebase -i HEAD~3

# エディタが開き、以下のような内容が表示される:
# pick abc1234 feat: ユーザーモデルを追加
# pick def5678 fix: typo修正
# pick ghi9012 feat: バリデーションを追加

# === 使用可能なコマンド ===
# pick   (p) : コミットをそのまま使用
# reword (r) : コミットメッセージを変更
# edit   (e) : コミットを編集（一時停止）
# squash (s) : 前のコミットに統合（メッセージ編集あり）
# fixup  (f) : 前のコミットに統合（メッセージ破棄）
# drop   (d) : コミットを削除

# === 例1: typo修正を前のコミットに統合 ===
# pick abc1234 feat: ユーザーモデルを追加
# fixup def5678 fix: typo修正           ← squashの代わりにfixup
# pick ghi9012 feat: バリデーションを追加

# === 例2: コミットメッセージを修正 ===
# reword abc1234 feat: ユーザーモデルを追加  ← rewordに変更
# pick def5678 fix: typo修正
# pick ghi9012 feat: バリデーションを追加

# === 例3: コミットの順序を入れ替え ===
# pick ghi9012 feat: バリデーションを追加    ← 順序を入れ替え
# pick abc1234 feat: ユーザーモデルを追加

# === autosquash: fixup コミットの自動整理 ===
# fixup! プレフィックスでコミットすると自動的に整理される
git commit -m "fixup! feat: ユーザーモデルを追加"
git rebase -i --autosquash HEAD~4

# autosquash をデフォルトで有効化
git config --global rebase.autoSquash true`,
      },
    ],
  },

  // ===== チーム開発 =====
  {
    id: "conflict-resolution",
    title: "コンフリクト解決",
    description:
      "コンフリクトの発生原因、解決手順、rerereの活用、ツールでの解決方法を学ぶ",
    category: "collaboration",
    sections: [
      {
        title: "コンフリクトの発生原因",
        content:
          "コンフリクト（衝突）は、2つのブランチで同じファイルの同じ箇所を異なる方法で変更した場合に発生します。Git は自動的に変更を統合できない場合、開発者に手動での解決を求めます。コンフリクトは merge、rebase、cherry-pick、stash pop などの操作時に発生する可能性があります。コンフリクトを最小限に抑えるには、ブランチの寿命を短くする、こまめに main から変更を取り込む、チーム内でファイルの担当を分けるなどの工夫が有効です。",
        code: `# === コンフリクトが発生する例 ===

# main ブランチ: greeting を変更
echo 'System.out.println("Hello World!");' > Main.java
git add Main.java && git commit -m "main: 挨拶を英語に"

# feature ブランチ: 同じ行を別の内容に変更
git switch feature/japanese
echo 'System.out.println("こんにちは世界！");' > Main.java
git add Main.java && git commit -m "feat: 挨拶を日本語に"

# main にマージしようとするとコンフリクト
git switch main
git merge feature/japanese
# CONFLICT (content): Merge conflict in Main.java
# Automatic merge failed; fix conflicts and then commit.

# === コンフリクトの状態を確認 ===
git status
# Unmerged paths:
#   both modified:   Main.java

# === コンフリクトが発生しやすいケース ===
# 1. 同じファイルの同じ行を編集
# 2. 一方でファイルを削除、他方で同じファイルを編集
# 3. 両方で同名のファイルを新規作成
# 4. ファイル名の変更が衝突

# === コンフリクトを防ぐ工夫 ===
# - ブランチの寿命を短く（1-2日）
# - こまめに main の変更を取り込む
# - チーム内でファイルの担当を明確にする
# - 大きな変更はチームに事前共有する
# - フォーマッターの設定をチームで統一する`,
      },
      {
        title: "コンフリクト解決手順（マーカーの読み方）",
        content:
          "コンフリクトが発生すると、Git はファイル内にコンフリクトマーカーを挿入します。<<<<<<< HEAD から ======= までが現在のブランチの変更、======= から >>>>>>> branch-name までがマージ対象ブランチの変更です。解決するには、マーカーを含む部分を正しい内容に書き換え、マーカー自体を削除します。その後 git add でステージし、git commit（merge の場合）または git rebase --continue（rebase の場合）で完了します。",
        code: `# === コンフリクトマーカーの構造 ===
#
# <<<<<<< HEAD
# （現在のブランチの内容）
# =======
# （マージ対象ブランチの内容）
# >>>>>>> feature/japanese

# 実際のファイル例:
# <<<<<<< HEAD
# System.out.println("Hello World!");
# =======
# System.out.println("こんにちは世界！");
# >>>>>>> feature/japanese

# === 解決方法 ===

# 方法1: 現在のブランチの変更を採用（ours）
git checkout --ours Main.java

# 方法2: マージ対象の変更を採用（theirs）
git checkout --theirs Main.java

# 方法3: 手動で編集（両方の変更を統合するなど）
# エディタでマーカーを削除し、正しい内容に編集
# System.out.println("Hello World! / こんにちは世界！");

# === 解決後の手順 ===

# merge の場合
git add Main.java
git commit -m "merge: feature/japaneseのコンフリクトを解決"

# rebase の場合
git add Main.java
git rebase --continue

# === 操作の中止 ===
git merge --abort     # merge を中止
git rebase --abort    # rebase を中止

# === コンフリクトファイルの一覧 ===
git diff --name-only --diff-filter=U

# === 3-way diff で確認 ===
git diff --merge      # 3者間の差分を表示`,
      },
      {
        title: "rerere の活用",
        content:
          "rerere（Reuse Recorded Resolution）は、過去に解決したコンフリクトの解決方法を記録し、同じコンフリクトが再発した場合に自動的に同じ方法で解決する機能です。長期間のブランチ開発で main からの rebase を繰り返す場合や、同じコンフリクトが何度も発生するケースで非常に有効です。rerere を有効にすると、.git/rr-cache/ ディレクトリにコンフリクトの解決パターンが保存されます。",
        code: `# rerere を有効化
git config --global rerere.enabled true

# === rerere の動作 ===
#
# 1回目のコンフリクト解決:
#   → コンフリクトのパターンと解決方法を記録
#
# 2回目以降の同じコンフリクト:
#   → 自動的に前回と同じ方法で解決

# === 実践例 ===

# 1回目: コンフリクトを手動で解決
git merge feature/login
# CONFLICT in Main.java
# Recorded preimage for 'Main.java'  ← rerere が記録開始

# 手動で解決
git add Main.java
git commit
# Recorded resolution for 'Main.java'  ← 解決方法を記録

# 2回目: 同じコンフリクトが発生
git rebase main
# CONFLICT in Main.java
# Resolved 'Main.java' using previous resolution  ← 自動解決!

# 解決内容を確認して問題なければ続行
git add Main.java
git rebase --continue

# === rerere の管理 ===

# 記録された解決パターンを確認
git rerere status
git rerere diff

# 記録された解決を削除（間違った解決を記録した場合）
git rerere forget Main.java

# rerere キャッシュの場所
ls .git/rr-cache/

# === rerere が有効なケース ===
# - 長期 feature ブランチで繰り返し rebase する場合
# - リリースブランチに複数回マージする場合
# - マージを試してから元に戻し、後で再マージする場合`,
      },
      {
        title: "VSCode / IntelliJ でのコンフリクト解決",
        content:
          "モダンなIDEやエディタには、コンフリクト解決を支援する優れたGUI機能があります。VSCode ではコンフリクトマーカーの上に「Accept Current Change」「Accept Incoming Change」「Accept Both Changes」「Compare Changes」のボタンが表示され、ワンクリックで解決できます。IntelliJ IDEA の Merge Tool は3ペイン表示で、左にローカルの変更、右にリモートの変更、中央に結果を表示し、直感的にコンフリクトを解決できます。",
        code: `# === VSCode でのコンフリクト解決 ===
#
# コンフリクトファイルを開くと自動的にハイライトされる
#
# ┌─────────────────────────────────────────┐
# │ Accept Current Change | Accept Incoming │
# │ Change | Accept Both | Compare Changes │
# │                                         │
# │ <<<<<<< HEAD                            │
# │ ┌─ Current Change (緑) ──────────────┐  │
# │ │ System.out.println("Hello");       │  │
# │ └────────────────────────────────────┘  │
# │ =======                                 │
# │ ┌─ Incoming Change (青) ─────────────┐  │
# │ │ System.out.println("こんにちは");    │  │
# │ └────────────────────────────────────┘  │
# │ >>>>>>> feature/japanese                │
# └─────────────────────────────────────────┘

# VSCode の Git 拡張機能
# - Source Control パネル (Ctrl+Shift+G)
# - Merge Editor（3-way マージ）
# - Timeline ビュー（ファイルの変更履歴）

# === IntelliJ IDEA でのコンフリクト解決 ===
#
# Git → Resolve Conflicts... でマージツールが起動
#
# ┌──────────┬──────────┬──────────┐
# │ Yours    │ Result   │ Theirs   │
# │ (Local)  │ (Output) │ (Remote) │
# │          │          │          │
# │ >> ボタン │          │ << ボタン │
# │で採用    │          │ で採用   │
# └──────────┴──────────┴──────────┘

# === コマンドラインのマージツール ===

# マージツールの設定
git config --global merge.tool vimdiff
# vimdiff, meld, kdiff3, p4merge など

# マージツールを起動
git mergetool

# マージツール使用後の .orig ファイルを自動削除
git config --global mergetool.keepBackup false

# === 推奨: IDE のマージツールを使う ===
# - 視覚的に差分が確認しやすい
# - ワンクリックで変更を採用できる
# - 構文ハイライトが効く
# - 即座にテスト実行できる`,
      },
    ],
  },
  {
    id: "pull-request",
    title: "プルリクエスト実践",
    description:
      "PRの作成方法、コードレビューのポイント、指摘への対応、CIとの連携を学ぶ",
    category: "collaboration",
    sections: [
      {
        title: "PRの作成と良い書き方",
        content:
          "プルリクエスト（PR）は、自分の変更をレビューしてもらい、メインブランチに統合するための仕組みです。良いPRは適切なサイズ（200-400行以内が目安）で、明確なタイトルと説明を持ち、変更の目的と背景がわかる内容になっています。PRテンプレートを活用すると、チーム全体で一貫した品質のPR説明を書くことができます。また、Draft PR を使って作業途中の段階からフィードバックを得ることも効果的です。",
        code: `# === PR の作成（GitHub CLI）===

# 基本的なPR作成
gh pr create --title "feat: ユーザー検索機能を追加" \\
  --body "## 概要
ユーザー名またはメールアドレスで検索できる機能を追加しました。

## 変更内容
- SearchController: 検索エンドポイント追加
- SearchService: 検索ロジック実装
- UserRepository: findByNameOrEmail メソッド追加

## テスト
- [x] 単体テスト (SearchServiceTest)
- [x] 統合テスト (SearchControllerTest)
- [ ] E2Eテスト

## スクリーンショット
（UI変更がある場合はここに画像を添付）

## 関連Issue
Closes #123"

# Draft PR の作成（作業途中）
gh pr create --draft --title "WIP: 決済機能の実装"

# === PR テンプレートの設定 ===
# .github/pull_request_template.md を作成
# ## 概要
# <!-- 変更の概要を1-2行で -->
#
# ## 変更内容
# <!-- 変更の詳細 -->
#
# ## テスト
# - [ ] 単体テスト
# - [ ] 統合テスト
#
# ## チェックリスト
# - [ ] コードレビュー指摘対応
# - [ ] ドキュメント更新

# === PRの良いプラクティス ===
# ✅ 1PR = 1機能（小さく分割）
# ✅ 200-400行以内を目安に
# ✅ テストを含める
# ✅ セルフレビューしてから提出
# ✅ 変更の目的を明記
# ❌ 複数の機能を1PRにまとめない
# ❌ リファクタリングと機能追加を混ぜない`,
      },
      {
        title: "コードレビューのポイント",
        content:
          "コードレビューは品質向上だけでなく、知識共有とチーム学習の場でもあります。レビューでは機能的な正しさ、読みやすさ、パフォーマンス、セキュリティ、テストカバレッジの観点から確認します。レビューコメントは具体的かつ建設的に書き、「なぜ」その変更が必要かを説明することが重要です。Approve（承認）、Request Changes（変更要求）、Comment（コメント）の3段階のレビュー結果を適切に使い分けましょう。",
        code: `# === GitHub CLI でのレビュー操作 ===

# PRの差分を確認
gh pr diff 123

# PRにレビューコメントを追加
gh pr review 123 --comment --body "全体的にきれいな実装ですね"

# PRを承認
gh pr review 123 --approve --body "LGTM! テストも十分です"

# 変更を要求
gh pr review 123 --request-changes \\
  --body "セキュリティの観点で修正が必要です"

# === レビューの観点 ===
#
# 1. 機能性
#    - 要件を満たしているか
#    - エッジケースは考慮されているか
#    - エラーハンドリングは適切か
#
# 2. 可読性
#    - 命名は分かりやすいか
#    - 複雑すぎるロジックはないか
#    - コメントは適切か
#
# 3. パフォーマンス
#    - N+1問題はないか
#    - 不要なDB/APIクエリはないか
#    - メモリリークの懸念はないか
#
# 4. セキュリティ
#    - SQLインジェクション対策
#    - XSS対策
#    - 認証・認可チェック
#
# 5. テスト
#    - テストは十分か
#    - 境界値テストがあるか
#    - モック/スタブの使い方は適切か

# === 良いレビューコメントの例 ===
# ❌ "ここ直して"
# ✅ "このメソッドは責務が大きいため、検索ロジックを
#     SearchService に抽出すると SRP に沿った設計になります"
#
# ❌ "null チェックして"
# ✅ "この引数はnullの可能性があります。Optional を使うか、
#     @NotNull アノテーションでガードすることを推奨します"`,
      },
      {
        title: "レビュー指摘への対応",
        content:
          "レビュー指摘を受けたら、各指摘に対して修正コミットを追加するか、議論して結論を出します。指摘に対応したコミットは fixup コミット（fixup! 元のコミットメッセージ）として作成し、最終的に interactive rebase で整理するのがきれいな方法です。すべての指摘に対応したら re-request review を行い、レビュアーに再レビューを依頼します。指摘への反応は感謝の気持ちを忘れず、技術的な議論は建設的に行いましょう。",
        code: `# === レビュー指摘への対応フロー ===

# 1. 指摘内容を確認
gh pr view 123 --comments

# 2. 修正コミットを追加
git add src/SearchService.java
git commit -m "fix: レビュー指摘 - null チェックを追加"

git add src/SearchController.java
git commit -m "fix: レビュー指摘 - バリデーションを強化"

# 3. プッシュ
git push origin feature/user-search

# 4. 再レビューを依頼
gh pr edit 123 --add-reviewer reviewer-name

# === fixup コミットを使った整理 ===

# fixup コミントで修正を追加
git commit -m "fixup! feat: 検索ロジックを実装"

# rebase で fixup コミットを統合（PR マージ前に整理）
git rebase -i --autosquash origin/main

# === Suggestion の適用（GitHub上の提案） ===
# レビュアーがコードの修正案を suggestion で提示した場合
# GitHub 上で "Apply suggestion" ボタンで即座に適用可能

# CLI でローカルに反映する場合
git pull origin feature/user-search

# === 議論が必要な場合 ===
# - 技術的な理由があれば丁寧に説明する
# - 「確かにそうですね」と認める柔軟さも大切
# - 長い議論はオフラインやSlackで解決
# - 結論をPRコメントに記録する

# === 対応完了のチェックリスト ===
# - [ ] すべての指摘に対応またはコメント
# - [ ] テストが通ることを確認
# - [ ] CIがグリーンであることを確認
# - [ ] Resolve conversation で対応済みをマーク
# - [ ] 再レビューを依頼`,
      },
      {
        title: "CI との連携",
        content:
          "PR と CI（継続的インテグレーション）を連携させることで、コードの品質を自動的にチェックできます。GitHub Actions などのCI ツールで、PR作成時やコミットプッシュ時にテスト実行、静的解析、ビルド確認を自動化します。ブランチ保護ルールで CI のパスを必須にすると、テストが通らないPRはマージできなくなります。ステータスチェックの結果はPR画面に表示され、レビュアーは品質が担保されたコードのみをレビューすればよくなります。",
        code: `# === PR 用の CI ワークフロー ===
# .github/workflows/pr-check.yml

# name: PR Check
# on:
#   pull_request:
#     branches: [main]
#
# jobs:
#   test:
#     runs-on: ubuntu-latest
#     steps:
#       - uses: actions/checkout@v4
#       - uses: actions/setup-java@v4
#         with:
#           java-version: '21'
#           distribution: 'temurin'
#       - run: mvn clean verify
#
#   lint:
#     runs-on: ubuntu-latest
#     steps:
#       - uses: actions/checkout@v4
#       - run: mvn checkstyle:check
#
#   coverage:
#     runs-on: ubuntu-latest
#     steps:
#       - uses: actions/checkout@v4
#       - run: mvn clean verify jacoco:report
#       - uses: codecov/codecov-action@v4

# === CI ステータスの確認（CLI）===

# PRのステータスチェックを確認
gh pr checks 123

# 特定のチェックの詳細を確認
gh run view 123456789

# === ブランチ保護ルールの設定 ===
# GitHub Settings → Branches → Branch protection rules

# 必須項目の設定例:
# ✅ Require a pull request before merging
# ✅ Require approvals: 1
# ✅ Require status checks to pass
#    - test (required)
#    - lint (required)
# ✅ Require branches to be up to date
# ✅ Require conversation resolution

# === PR マージの自動化 ===

# 自動マージの有効化（CI通過後に自動マージ）
gh pr merge 123 --auto --squash

# マージキューの利用（大規模プロジェクト向け）
# GitHub Settings で Merge Queue を有効化
# → PR が順番にCI実行＋マージされる`,
      },
    ],
  },

  // ===== Git応用 =====
  {
    id: "git-stash-cherry",
    title: "stash・cherry-pick・bisect",
    description:
      "git stash、cherry-pick、bisect、worktree の実践的な使い方を学ぶ",
    category: "advanced",
    sections: [
      {
        title: "git stash の活用法",
        content:
          "git stash は作業途中の変更を一時的に退避させるコマンドです。ブランチを切り替えたいが、現在の作業をコミットしたくない場合に便利です。stash はスタック構造で管理され、複数の stash を保持できます。git stash push でステージ済み・未ステージの変更を退避し、git stash pop で復元します。メッセージを付けて stash すると後で判別しやすくなります。git stash push -p で変更の一部だけを stash することも可能です。",
        code: `# 作業中の変更を stash に退避
git stash
# または、メッセージ付き（推奨）
git stash push -m "WIP: ログイン画面の実装途中"

# stash の一覧を確認
git stash list
# stash@{0}: On feature/login: WIP: ログイン画面の実装途中
# stash@{1}: On main: WIP: README修正
# stash@{2}: On develop: WIP: テスト追加

# 最新の stash を復元して stash から削除
git stash pop

# 特定の stash を復元
git stash pop stash@{1}

# stash を復元するが、stash 自体は残す
git stash apply
git stash apply stash@{2}

# stash の内容を確認
git stash show           # 変更ファイル一覧
git stash show -p        # 差分を表示
git stash show stash@{1} -p

# 未追跡ファイルも含めて stash
git stash push -u -m "WIP: 新規ファイルも含む"
# -u は --include-untracked の略

# 変更の一部だけを stash（パッチモード）
git stash push -p -m "WIP: 一部の変更のみ退避"

# stash からブランチを作成
git stash branch feature/from-stash stash@{0}

# stash を削除
git stash drop stash@{0}  # 特定の stash を削除
git stash clear            # すべての stash を削除`,
      },
      {
        title: "cherry-pick で特定コミットを取り込む",
        content:
          "git cherry-pick は特定のコミットの変更を現在のブランチに適用するコマンドです。別のブランチで行われたバグ修正を自分のブランチに取り込みたい場合や、特定のコミットだけを release ブランチに反映したい場合に使います。cherry-pick は新しいコミットを作成するため、元のコミットとは異なるハッシュを持ちます。複数のコミットを一度に cherry-pick することもでき、範囲指定やマージコミットの cherry-pick も可能です。",
        code: `# 特定のコミットを現在のブランチに適用
git cherry-pick abc1234

# コミットメッセージを変更して適用
git cherry-pick abc1234 --edit

# コミットを作成せず、変更だけ適用
git cherry-pick abc1234 --no-commit
# → 複数の cherry-pick をまとめて1コミットにしたい場合に便利

# 複数のコミットを cherry-pick
git cherry-pick abc1234 def5678 ghi9012

# 範囲指定（abc1234 は含まない、def5678 は含む）
git cherry-pick abc1234..def5678

# 範囲指定（abc1234 も含む）
git cherry-pick abc1234^..def5678

# === 実践例: バグ修正を release ブランチに適用 ===
#
# develop ブランチでバグを修正
git switch develop
git commit -m "fix: ログインエラーの修正"
# → コミットハッシュ: abc1234

# release ブランチに同じ修正を適用
git switch release/v1.2
git cherry-pick abc1234

# === コンフリクトが発生した場合 ===
# 1. コンフリクトを解決
git add resolved-file.java
# 2. cherry-pick を続行
git cherry-pick --continue
# 3. または中止
git cherry-pick --abort

# === 注意事項 ===
# - cherry-pick は新しいコミット（別ハッシュ）を作成する
# - 同じ変更が2箇所に存在するため、後でマージ時に
#   コンフリクトする可能性がある
# - 頻繁に使う場合はブランチ戦略を見直すべき`,
      },
      {
        title: "git bisect でバグ混入コミットを特定",
        content:
          "git bisect は二分探索アルゴリズムを使って、バグが混入したコミットを効率的に特定するコマンドです。正常に動作する（good）コミットとバグがある（bad）コミットを指定すると、Git がその中間のコミットをチェックアウトし、そのコミットが good か bad かを判定することを繰り返します。N 個のコミットがある場合、最大 log2(N) 回の確認でバグの原因コミットを特定できます。自動テストスクリプトを指定すれば、完全に自動化することも可能です。",
        code: `# === git bisect の基本的な使い方 ===

# bisect を開始
git bisect start

# バグがあるコミットを指定（通常は HEAD）
git bisect bad

# 正常に動作するコミットを指定
git bisect good v1.0.0
# または特定のハッシュ
git bisect good abc1234

# → Git が中間のコミットをチェックアウトする
# Bisecting: 16 revisions left to test after this
# [def5678...] feat: ユーザー検索を追加

# テストして結果を報告
# バグがある場合:
git bisect bad
# バグがない場合:
git bisect good

# → 次の中間コミットがチェックアウトされる
# これを繰り返す...

# 原因コミットが特定される
# abc1234 is the first bad commit
# commit abc1234
# Author: Taro <taro@example.com>
# Date:   Mon Jan 15 10:00:00 2024 +0900
#
#     feat: キャッシュ機能を追加

# bisect を終了して元のブランチに戻る
git bisect reset

# === 自動化: テストスクリプトで自動判定 ===
git bisect start HEAD v1.0.0
git bisect run mvn test -pl module-name
# → テストが失敗するコミットを自動特定

# シェルスクリプトで自動判定
git bisect run ./test-script.sh
# スクリプトの終了コード: 0=good, 1-127(125以外)=bad

# === bisect のログ確認 ===
git bisect log    # bisect の履歴を表示
git bisect visualize  # gitk で可視化`,
      },
      {
        title: "git worktree",
        content:
          "git worktree は1つのリポジトリから複数のワーキングツリーを作成できる機能です。別のブランチの作業を行いたいが、現在の作業をコミットや stash したくない場合に便利です。各 worktree は独立したディレクトリに作成され、別々のブランチをチェックアウトした状態で同時に作業できます。レビュー中のPRのコードを確認しながら自分の開発を続けたい場合や、長時間のビルドを別の worktree で実行する場合などに活用できます。",
        code: `# === git worktree の基本操作 ===

# 新しい worktree を作成（既存ブランチ）
git worktree add ../my-project-review feature/login
# → ../my-project-review に feature/login がチェックアウトされる

# 新しい worktree を作成（新規ブランチ）
git worktree add -b hotfix/urgent ../my-project-hotfix main

# worktree の一覧を確認
git worktree list
# /home/user/my-project               abc1234 [main]
# /home/user/my-project-review        def5678 [feature/login]
# /home/user/my-project-hotfix        ghi9012 [hotfix/urgent]

# === 実践的な使い方 ===

# 1. PR レビュー用の worktree
git worktree add ../review-pr-123 feature/user-search
cd ../review-pr-123
mvn test
# テスト実行後、元のディレクトリに戻って開発を続行

# 2. 緊急修正用の worktree
git worktree add ../hotfix-work hotfix/security-fix
cd ../hotfix-work
# ... 修正作業 ...
git commit -m "fix: セキュリティ脆弱性を修正"
git push origin hotfix/security-fix
cd ../my-project

# 3. ビルド比較用
git worktree add ../build-comparison v1.0.0
cd ../build-comparison
mvn package
# → 旧バージョンのビルド結果と比較

# === worktree の削除 ===
# ディレクトリを削除してから prune
rm -rf ../my-project-review
git worktree prune

# または直接削除
git worktree remove ../my-project-review

# 強制削除（未コミットの変更がある場合）
git worktree remove --force ../my-project-review

# === 注意事項 ===
# - 同じブランチを複数の worktree でチェックアウトできない
# - .git は共有されるため、stash や設定は共通
# - worktree ごとにインデックスは独立している`,
      },
    ],
  },
  {
    id: "git-reset-revert",
    title: "取り消し操作",
    description:
      "git reset、revert、restore、reflogによる復旧方法を学ぶ",
    category: "advanced",
    sections: [
      {
        title: "git reset（soft / mixed / hard）",
        content:
          "git reset はコミットを取り消すコマンドで、3つのモードがあります。--soft は HEAD のみを移動し、インデックスとワーキングツリーはそのままです（コミットだけ取り消してステージ済み状態に戻す）。--mixed（デフォルト）は HEAD とインデックスをリセットし、ワーキングツリーはそのままです（コミットとステージングを取り消す）。--hard は3つの領域すべてをリセットし、変更を完全に破棄します。--hard は破壊的操作なので慎重に使用してください。",
        code: `# === git reset の3つのモード ===
#
# コミット A → B → C (HEAD)
#
# --soft HEAD~1:
#   HEAD → B, インデックス = C の状態, ワーキングツリー = そのまま
#   → コミットだけ取り消し（変更はステージ済み）
#
# --mixed HEAD~1（デフォルト）:
#   HEAD → B, インデックス = B の状態, ワーキングツリー = そのまま
#   → コミットとステージを取り消し（変更は未ステージ）
#
# --hard HEAD~1:
#   HEAD → B, インデックス = B の状態, ワーキングツリー = B の状態
#   → すべて完全に取り消し（変更は消える！）

# === 実践例 ===

# 直前のコミットを取り消し（変更はステージ済み）
git reset --soft HEAD~1
# → メッセージを変えて再コミットしたい場合に便利

# 直前のコミットとステージを取り消し
git reset HEAD~1
# → 変更内容を再編集したい場合に便利

# 直前のコミットを完全に取り消し（変更も破棄）
git reset --hard HEAD~1
# ⚠️ 取り消し不可（reflog で復旧可能だが注意）

# 直近3コミットを取り消し
git reset --soft HEAD~3

# 特定のコミットまで戻す
git reset --hard abc1234

# ステージの取り消しのみ（コミットは変更しない）
git reset HEAD src/Main.java
# git restore --staged src/Main.java と同等

# === push 済みの場合 ===
# reset 後に force push が必要（危険！）
git push --force-with-lease origin feature/login
# --force-with-lease: 他の人がプッシュしていたら失敗する（安全弁）

# === リモートの main を reset してはいけない ===
# ❌ git push --force origin main  ← チーム全員に影響
# ✅ 代わりに git revert を使う`,
      },
      {
        title: "git revert",
        content:
          "git revert は指定したコミットの変更を打ち消す新しいコミットを作成するコマンドです。reset と異なり、履歴を書き換えないため、既にプッシュ済みのコミットを安全に取り消す場合に使います。revert はコミット履歴に「取り消した」という事実が記録されるため、チーム開発での透明性が高い方法です。マージコミットの revert には -m オプションでメインラインの指定が必要です。",
        code: `# 直前のコミットを revert
git revert HEAD

# 特定のコミットを revert
git revert abc1234

# コミットを作成せずに変更だけ適用
git revert --no-commit abc1234
# → 複数の revert をまとめて1コミットにしたい場合

# 複数コミットを revert（新しい方から順に）
git revert HEAD~2..HEAD

# === revert の仕組み ===
#
# Before:
# A → B → C (HEAD)
#
# git revert C:
# A → B → C → C' (HEAD)
#              ↑
#           C の変更を打ち消す逆パッチ
#
# ※ C は履歴に残る（消えない）

# === マージコミットの revert ===
# -m 1: マージ先（main）の変更を残す
# -m 2: マージ元（feature）の変更を残す
git revert -m 1 merge-commit-hash
# → feature ブランチの変更をすべて取り消す

# === revert の revert（取り消しの取り消し） ===
# 一度 revert した機能を再度有効にする場合
git revert revert-commit-hash

# === reset vs revert の使い分け ===
#
# reset:
#   - ローカルのみの変更を取り消す場合
#   - コミット履歴を書き換える
#   - プッシュ前に使う
#
# revert:
#   - プッシュ済みの変更を取り消す場合
#   - 履歴を書き換えない
#   - チーム開発で安全

# === コンフリクトが発生した場合 ===
git revert abc1234
# CONFLICT が発生
git add resolved-file.java
git revert --continue
# または中止
git revert --abort`,
      },
      {
        title: "git restore",
        content:
          "git restore は Git 2.23 で導入された、ファイルの復元に特化したコマンドです。ワーキングツリーの変更を取り消す（git restore ファイル名）、ステージングを取り消す（git restore --staged ファイル名）、特定のコミット時点のファイルに戻す（git restore --source=コミット ファイル名）といった操作ができます。従来 git checkout -- ファイル名 で行っていた操作の代替で、より直感的な名前とオプションを持っています。",
        code: `# === ワーキングツリーの変更を取り消す ===

# 特定ファイルの変更を取り消し
git restore src/Main.java

# 複数ファイルの変更を取り消し
git restore src/Main.java src/Utils.java

# ディレクトリ内のすべての変更を取り消し
git restore src/

# すべての変更を取り消し
git restore .

# === ステージングの取り消し ===

# 特定ファイルをアンステージ
git restore --staged src/Main.java

# すべてのファイルをアンステージ
git restore --staged .

# ステージとワーキングツリーの両方を取り消し
git restore --staged --worktree src/Main.java

# === 特定のコミット時点に復元 ===

# HEAD から2つ前の状態に復元
git restore --source=HEAD~2 src/Main.java

# 特定のコミットの状態に復元
git restore --source=abc1234 src/Main.java

# 特定のブランチの状態に復元
git restore --source=main src/Main.java

# === 旧コマンドとの対応 ===
#
# 旧: git checkout -- file
# 新: git restore file
#
# 旧: git reset HEAD file
# 新: git restore --staged file
#
# 旧: git checkout abc1234 -- file
# 新: git restore --source=abc1234 file

# === 削除したファイルの復元 ===

# 直前のコミットから復元
git restore deleted-file.java

# 特定のコミットから復元
git restore --source=abc1234 deleted-file.java

# === パッチモード（部分的な復元） ===
git restore -p src/Main.java
# → 変更箇所ごとに復元するか選択できる`,
      },
      {
        title: "reflog による復旧",
        content:
          "reflog（参照ログ）はHEADやブランチの参照が変更された履歴を記録しています。git reset --hard やブランチの削除で「失った」と思ったコミットも、reflog から復旧できます。reflog はローカルリポジトリにのみ存在し、デフォルトで90日間保持されます。reflog は Git のセーフティネットであり、ほぼすべての操作を元に戻すことができます。「Git でデータを失うのは非常に難しい」と言われるのは、reflog があるからです。",
        code: `# === reflog の確認 ===

# HEAD の参照変更履歴を表示
git reflog
# abc1234 HEAD@{0}: commit: feat: 新機能を追加
# def5678 HEAD@{1}: checkout: moving from main to feature
# ghi9012 HEAD@{2}: commit: fix: バグ修正
# jkl3456 HEAD@{3}: reset: moving to HEAD~3
# mno7890 HEAD@{4}: commit: feat: 古い機能

# 特定のブランチの reflog
git reflog show main

# 日時付きで表示
git reflog --date=iso

# === 復旧例1: reset --hard で消したコミットを復旧 ===

# 誤って reset --hard した場合
git reset --hard HEAD~3
# → 3つのコミットが「消えた」

# reflog でコミットハッシュを探す
git reflog
# abc1234 HEAD@{0}: reset: moving to HEAD~3
# def5678 HEAD@{1}: commit: feat: 3つ目のコミット  ← ここに戻したい

# reset 前の状態に復旧
git reset --hard def5678

# === 復旧例2: 削除したブランチを復旧 ===

# ブランチを削除してしまった
git branch -D feature/important

# reflog でブランチの最後のコミットを探す
git reflog | head -20
# → feature/important の最後のコミットハッシュを見つける

# ブランチを再作成
git branch feature/important abc1234

# === 復旧例3: rebase で壊れた履歴を復旧 ===

# rebase 前の状態を reflog で確認
git reflog
# abc1234 HEAD@{0}: rebase (finish): ...
# def5678 HEAD@{5}: rebase (start): ...
# ghi9012 HEAD@{6}: checkout: ...  ← rebase 前

# rebase 前の状態に戻す
git reset --hard ghi9012

# === reflog の保持期間設定 ===
# 到達可能なエントリ: 90日（デフォルト）
# 到達不可能なエントリ: 30日（デフォルト）
git config --global gc.reflogExpire 180.days
git config --global gc.reflogExpireUnreachable 90.days`,
      },
    ],
  },
  {
    id: "git-hooks-config",
    title: "フックと設定",
    description:
      "Git フック、husky + lint-staged、git config のカスタマイズ、git alias を学ぶ",
    category: "advanced",
    sections: [
      {
        title: "pre-commit / pre-push フック",
        content:
          "Git フックは、特定のGitイベント（コミット、プッシュなど）の前後に自動的に実行されるスクリプトです。.git/hooks/ ディレクトリに配置します。pre-commit はコミット前にコードの品質チェック（リント、フォーマット、テスト）を実行し、問題があればコミットを中止できます。pre-push はプッシュ前にテストを実行するなど、リモートへの送信前の最終チェックに使います。commit-msg はコミットメッセージの形式を検証するのに使えます。",
        code: `# === Git フックの種類 ===
#
# クライアントサイドフック:
#   pre-commit     : コミット前（lint, format）
#   prepare-commit-msg : コミットメッセージ作成前
#   commit-msg     : コミットメッセージ検証
#   post-commit    : コミット後（通知など）
#   pre-push       : プッシュ前（テスト実行）
#   pre-rebase     : リベース前
#
# サーバーサイドフック:
#   pre-receive    : プッシュ受信前
#   update         : 各ブランチ更新前
#   post-receive   : プッシュ受信後

# === pre-commit フックの例 ===
# .git/hooks/pre-commit

#!/bin/sh
# Java ファイルのフォーマットチェック
echo "Running code format check..."
mvn spotless:check
if [ $? -ne 0 ]; then
  echo "❌ コードフォーマットが不正です。mvn spotless:apply を実行してください"
  exit 1
fi

# テストの実行
echo "Running tests..."
mvn test -q
if [ $? -ne 0 ]; then
  echo "❌ テストが失敗しました"
  exit 1
fi

echo "✅ すべてのチェックをパスしました"

# === commit-msg フックの例 ===
# .git/hooks/commit-msg

#!/bin/sh
# Conventional Commits フォーマットを検証
commit_msg=$(cat "$1")
pattern="^(feat|fix|docs|style|refactor|perf|test|build|ci|chore)(\\(.+\\))?(!)?: .+"
if ! echo "$commit_msg" | grep -qE "$pattern"; then
  echo "❌ コミットメッセージが Conventional Commits 形式ではありません"
  echo "例: feat(auth): ログイン機能を追加"
  exit 1
fi

# フックに実行権限を付与
chmod +x .git/hooks/pre-commit
chmod +x .git/hooks/commit-msg`,
      },
      {
        title: "husky + lint-staged",
        content:
          "husky は Git フックを npm プロジェクトで簡単に管理するためのツールです。.git/hooks/ に直接スクリプトを配置する方法ではチーム共有が難しいですが、husky を使えばフック定義をリポジトリに含めてチーム全員で共有できます。lint-staged はステージされたファイルのみに対してリントやフォーマットを実行するツールで、husky と組み合わせてコミット前の品質チェックを効率的に行えます。Java プロジェクトでも、フロントエンド部分がある場合は活用できます。",
        code: `# === husky のセットアップ ===

# husky をインストール
npm install --save-dev husky

# husky を初期化
npx husky init

# pre-commit フックを作成
# .husky/pre-commit に自動生成される

# === lint-staged のセットアップ ===
npm install --save-dev lint-staged

# package.json に lint-staged 設定を追加
# {
#   "lint-staged": {
#     "*.{js,ts,tsx}": [
#       "eslint --fix",
#       "prettier --write"
#     ],
#     "*.{json,md,yml}": [
#       "prettier --write"
#     ],
#     "*.java": [
#       "google-java-format --replace"
#     ]
#   }
# }

# .husky/pre-commit の内容
# #!/bin/sh
# npx lint-staged

# === 実行の流れ ===
# 1. git commit を実行
# 2. husky が pre-commit フックを起動
# 3. lint-staged がステージされたファイルのみに実行
# 4. ESLint / Prettier / Formatter が自動実行
# 5. 修正されたファイルが自動的に再ステージ
# 6. すべてパスすればコミット成功

# === Java プロジェクトでの代替手段 ===

# Maven: spotless-maven-plugin
# pom.xml に以下を追加:
# <plugin>
#   <groupId>com.diffplug.spotless</groupId>
#   <artifactId>spotless-maven-plugin</artifactId>
#   <version>2.43.0</version>
#   <configuration>
#     <java>
#       <googleJavaFormat/>
#     </java>
#   </configuration>
# </plugin>

# コミット前チェック
mvn spotless:check

# 自動フォーマット
mvn spotless:apply`,
      },
      {
        title: "git config のカスタマイズ",
        content:
          "git config はGitの動作をカスタマイズする設定コマンドです。3つのレベルがあり、--system（システム全体）、--global（ユーザー全体）、--local（リポジトリ単位、デフォルト）の順で優先されます。ユーザー名・メール、デフォルトブランチ名、マージ戦略、差分表示、エディタ設定などを細かくカスタマイズできます。設定ファイルは直接編集することも可能です（~/.gitconfig または .git/config）。",
        code: `# === 基本設定 ===
git config --global user.name "Taro Yamada"
git config --global user.email "taro@example.com"
git config --global init.defaultBranch main
git config --global core.editor "code --wait"

# === 便利な設定 ===

# pull 時にデフォルトで rebase を使う
git config --global pull.rebase true

# push 時に現在のブランチ名を自動使用
git config --global push.default current

# 自動的に追跡ブランチを設定
git config --global push.autoSetupRemote true

# マージ時のコンフリクトスタイル（3-way表示）
git config --global merge.conflictstyle diff3

# 差分表示を見やすく
git config --global diff.colorMoved default

# fetch 時に削除済みリモートブランチを自動 prune
git config --global fetch.prune true

# 日本語ファイル名の文字化け対策
git config --global core.quotepath false

# 改行コードの自動変換
git config --global core.autocrlf input  # macOS/Linux
# git config --global core.autocrlf true # Windows

# === 設定の確認 ===
git config --list                 # すべての設定を表示
git config --global --list        # グローバル設定のみ
git config user.name              # 特定の設定値を確認
git config --show-origin user.name # 設定ファイルの場所も表示

# === 設定ファイルを直接編集 ===
git config --global --edit
# → ~/.gitconfig が開く

# === リポジトリ単位の設定（.git/config） ===
# 仕事用とプライベートでメールを使い分ける場合
cd ~/work/project
git config user.email "taro@company.com"

# === Conditional Include（ディレクトリ別設定） ===
# ~/.gitconfig に追加:
# [includeIf "gitdir:~/work/"]
#   path = ~/.gitconfig-work
# [includeIf "gitdir:~/personal/"]
#   path = ~/.gitconfig-personal`,
      },
      {
        title: "git alias",
        content:
          "git alias を使うと、頻繁に使うコマンドに短い別名を付けることができます。長いコマンドやオプションの組み合わせを短縮することで、日常の作業効率が大幅に向上します。alias は git config で設定するか、~/.gitconfig ファイルに直接記述します。シェルコマンドを実行する alias は先頭に ! を付けます。チームで共通の alias を定義するのも良いプラクティスです。",
        code: `# === 基本的な alias 設定 ===

git config --global alias.st status
git config --global alias.co checkout
git config --global alias.sw switch
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.df diff
git config --global alias.lg "log --oneline --graph --decorate"

# === 便利な alias ===

# きれいなログ表示
git config --global alias.ll "log --oneline --graph --all --decorate"

# 直前のコミットを表示
git config --global alias.last "log -1 HEAD --stat"

# ステージされた差分を表示
git config --global alias.ds "diff --staged"

# 変更ファイルの一覧
git config --global alias.changed "diff --name-only"

# コミットの取り消し（soft reset）
git config --global alias.undo "reset --soft HEAD~1"

# すべての変更を stash
git config --global alias.save "stash push -u -m"

# ブランチの整理（マージ済みブランチを削除）
git config --global alias.cleanup "!git branch --merged main | grep -v 'main' | xargs git branch -d"

# === シェルコマンドを使った alias（! で開始）===

# 現在のブランチ名を表示
git config --global alias.current "!git branch --show-current"

# 最近チェックアウトしたブランチ一覧
git config --global alias.recent "!git reflog | grep checkout | head -10"

# === ~/.gitconfig での alias 設定 ===
# [alias]
#   st = status
#   co = checkout
#   sw = switch
#   br = branch
#   ci = commit
#   df = diff
#   lg = log --oneline --graph --decorate
#   ll = log --oneline --graph --all --decorate
#   last = log -1 HEAD --stat
#   ds = diff --staged
#   undo = reset --soft HEAD~1
#   save = stash push -u -m
#   cleanup = !git branch --merged main | grep -v 'main' | xargs git branch -d

# === alias の確認 ===
git config --get-regexp alias
# alias.st status
# alias.co checkout
# ...

# === alias の使用例 ===
git st              # git status
git lg              # 見やすいログ
git undo            # 直前のコミットを取り消し
git save "作業中"    # stash に保存`,
      },
    ],
  },
];
