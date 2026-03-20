export interface LinuxCliSection {
  title: string;
  content: string;
  code?: string;
}

export interface LinuxCliChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: LinuxCliSection[];
}

export const linuxCliCategories = [
  { id: "basics", name: "基本操作", color: "#059669" },
  { id: "system", name: "システム管理", color: "#2563EB" },
  { id: "devops", name: "Java開発運用", color: "#D97706" },
] as const;

export type LinuxCliCategory = (typeof linuxCliCategories)[number];

export const linuxCliChapters: LinuxCliChapter[] = [
  // ===== 基本操作 =====
  {
    id: "file-directory",
    title: "ファイル・ディレクトリ操作",
    category: "basics",
    description:
      "Linux の基本であるファイルとディレクトリの操作コマンドを学ぶ。ls, cd, cp, mv, rm, mkdir, find など日常的に使うコマンドを網羅的に解説する。",
    sections: [
      {
        title: "ディレクトリの移動と一覧表示（cd / ls）",
        content:
          "cd コマンドでディレクトリを移動し、ls コマンドでファイル一覧を表示します。ls -l で詳細表示、ls -a で隠しファイルを含む全ファイルの表示ができます。ls -lh でファイルサイズを人間が読みやすい形式（KB, MB）で表示します。cd ~ でホームディレクトリ、cd - で直前のディレクトリに戻れます。pwd コマンドで現在のディレクトリを確認できます。",
        code: `# 現在のディレクトリを確認
pwd
# /home/user

# ホームディレクトリに移動
cd ~

# プロジェクトディレクトリに移動
cd /opt/java-app

# 一つ上のディレクトリに移動
cd ..

# 直前のディレクトリに戻る
cd -

# ファイル一覧を表示
ls

# 詳細表示（パーミッション、所有者、サイズ、更新日時）
ls -l

# 隠しファイルを含む全ファイルを詳細表示
ls -la

# ファイルサイズを読みやすい形式で表示
ls -lh

# ディレクトリの中身を再帰的に表示
ls -R src/

# 更新日時順にソート（新しい順）
ls -lt`,
      },
      {
        title: "ファイルのコピー・移動・削除（cp / mv / rm）",
        content:
          "cp でファイルやディレクトリをコピー、mv で移動またはリネーム、rm で削除を行います。cp -r でディレクトリを再帰的にコピー、rm -r でディレクトリごと削除できます。rm -f で確認なしに強制削除しますが、rm -rf は非常に危険なため慎重に使用してください。mv はファイルの移動とリネームの両方に使えます。",
        code: `# ファイルをコピー
cp application.properties application.properties.bak

# ディレクトリを再帰的にコピー
cp -r src/ src-backup/

# コピー時にタイムスタンプやパーミッションを保持
cp -p config.yml /etc/myapp/

# ファイルを移動
mv old-app.jar /opt/deploy/app.jar

# ファイル名を変更（リネーム）
mv MyApp.java MyApplication.java

# ファイルを削除
rm temp.log

# ディレクトリを再帰的に削除（確認あり）
rm -ri build/

# ディレクトリを強制削除（※注意して使用）
rm -rf target/`,
      },
      {
        title: "ディレクトリの作成と削除（mkdir / rmdir）",
        content:
          "mkdir でディレクトリを作成し、rmdir で空のディレクトリを削除します。mkdir -p で中間ディレクトリも含めて一括作成できます。Java プロジェクトのパッケージ構成に合わせたディレクトリ作成でよく使います。rmdir は空のディレクトリしか削除できないため、中身があるディレクトリは rm -r を使います。",
        code: `# ディレクトリを作成
mkdir logs

# 中間ディレクトリも含めて一括作成
mkdir -p src/main/java/com/example/service

# 複数ディレクトリを同時作成
mkdir -p {src,test}/{main,resources}

# Javaプロジェクトの典型的なディレクトリ構成を一括作成
mkdir -p src/main/java/com/example/{controller,service,repository,model}
mkdir -p src/main/resources/{static,templates}
mkdir -p src/test/java/com/example

# 空のディレクトリを削除
rmdir empty-dir/

# 空の親ディレクトリも含めて削除
rmdir -p a/b/c/`,
      },
      {
        title: "ファイル検索（find）",
        content:
          "find コマンドはディレクトリツリーを再帰的に検索し、条件に一致するファイルやディレクトリを見つけます。名前、サイズ、更新日時、パーミッションなど多彩な検索条件を指定できます。-exec オプションで見つかったファイルに対してコマンドを実行することもできます。Java 開発では .java ファイルの検索やログファイルの管理によく使います。",
        code: `# カレントディレクトリ以下で .java ファイルを検索
find . -name "*.java"

# src ディレクトリ以下で特定のクラスを検索（大文字小文字を無視）
find src/ -iname "UserService.java"

# 7日以内に更新されたファイルを検索
find /var/log -mtime -7

# 100MB 以上のファイルを検索
find / -size +100M 2>/dev/null

# 空のディレクトリを検索
find . -type d -empty

# .class ファイルを検索して削除
find . -name "*.class" -exec rm {} \\;

# .log ファイルを検索して一覧表示
find /var/log/myapp -name "*.log" -exec ls -lh {} \\;

# 特定パッケージのJavaファイル数をカウント
find src/ -path "*/service/*.java" | wc -l`,
      },
      {
        title: "ファイルの内容確認（cat / less / file / stat）",
        content:
          "cat でファイルの内容を表示、less でページ送りしながら閲覧できます。file コマンドでファイルの種類を判定し、stat でファイルの詳細情報（サイズ、タイムスタンプ、inode など）を確認できます。大きなファイルは cat ではなく less を使うのが推奨です。touch コマンドでファイルのタイムスタンプを更新したり、空ファイルを作成できます。",
        code: `# ファイルの内容を表示
cat application.properties

# 行番号付きで表示
cat -n Main.java

# 複数ファイルを結合して表示
cat part1.sql part2.sql

# ページ送りで閲覧（q で終了、/ で検索）
less application.log

# ファイルの種類を判定
file app.jar
# app.jar: Java archive data (JAR)

file run.sh
# run.sh: Bourne-Again shell script, ASCII text executable

# ファイルの詳細情報を表示
stat pom.xml

# 空ファイルを作成
touch newfile.txt

# タイムスタンプを更新
touch -t 202601010000 config.yml`,
      },
    ],
  },
  {
    id: "text-processing",
    title: "テキスト処理",
    category: "basics",
    description:
      "grep, sed, awk, sort などのテキスト処理コマンドを学ぶ。ログ解析やコード検索、設定ファイルの編集など、Java 開発者が日常的に使うテキスト操作を習得する。",
    sections: [
      {
        title: "パターン検索（grep）",
        content:
          "grep はファイル内のテキストをパターン（正規表現）で検索するコマンドです。-r で再帰検索、-i で大文字小文字を無視、-n で行番号を表示、-c でマッチ件数を表示します。Java 開発ではログの検索、ソースコード内のクラスやメソッドの検索に頻繁に使います。-E で拡張正規表現、-P で Perl 互換正規表現が使えます。",
        code: `# ファイル内でパターンを検索
grep "Exception" application.log

# 再帰的に検索（ディレクトリ内の全ファイル）
grep -r "TODO" src/

# 大文字小文字を無視して検索
grep -i "error" server.log

# 行番号付きで検索
grep -n "public class" src/main/java/com/example/*.java

# マッチ件数をカウント
grep -c "NullPointerException" error.log

# マッチしない行を表示（除外検索）
grep -v "DEBUG" application.log

# 正規表現で検索（拡張正規表現）
grep -E "WARN|ERROR|FATAL" application.log

# 前後の行も表示（-A: 後、-B: 前、-C: 前後）
grep -C 3 "StackTrace" error.log

# 特定の拡張子のファイルのみ検索
grep -r --include="*.java" "Autowired" src/`,
      },
      {
        title: "テキスト置換（sed）",
        content:
          "sed（stream editor）はテキストの置換・削除・挿入を行うストリームエディタです。s コマンドで文字列置換、d コマンドで行削除、-i オプションでファイルを直接編集できます。設定ファイルの値変更やログの整形によく使います。正規表現によるパターンマッチと後方参照も可能です。",
        code: `# 文字列を置換（最初の1つだけ）
sed 's/localhost/192.168.1.100/' application.properties

# 全出現箇所を置換（g フラグ）
sed 's/8080/9090/g' application.properties

# ファイルを直接編集（-i オプション）
sed -i 's/spring.profiles.active=dev/spring.profiles.active=prod/' application.properties

# 特定行を削除
sed '1d' file.txt          # 1行目を削除
sed '/^#/d' config.properties  # コメント行を削除
sed '/^$/d' file.txt       # 空行を削除

# 特定行に文字列を挿入
sed '1i\\# Generated config file' application.properties

# 正規表現と後方参照
sed -E 's/version=([0-9]+)\\.([0-9]+)/version=\\1.\\2.0/' pom.properties

# 複数の置換を一度に実行
sed -e 's/foo/bar/g' -e 's/baz/qux/g' file.txt

# 特定範囲の行だけ処理
sed '10,20s/old/new/g' file.txt`,
      },
      {
        title: "テキストの列処理（awk）",
        content:
          "awk はテキストを列（フィールド）単位で処理する強力なコマンドです。デフォルトでは空白やタブ区切りでフィールドを分割し、$1, $2 ... で各フィールドにアクセスします。-F で区切り文字を変更できます。ログの特定カラムの抽出や集計処理に非常に便利です。",
        code: `# スペース区切りの2列目を表示
awk '{print $2}' access.log

# CSV ファイルの特定列を抽出
awk -F',' '{print $1, $3}' data.csv

# 条件に一致する行だけ処理
awk '$9 >= 500 {print $1, $7, $9}' access.log

# 特定列の合計を計算
awk '{sum += $5} END {print "Total:", sum}' report.txt

# ログからステータスコード別の件数を集計
awk '{count[$9]++} END {for (code in count) print code, count[code]}' access.log

# 区切り文字を指定して処理
awk -F':' '{print $1, $3}' /etc/passwd

# フォーマット出力
awk -F',' '{printf "%-20s %10d\\n", $1, $2}' data.csv

# 行番号を付けて出力
awk '{print NR ":", $0}' file.txt`,
      },
      {
        title: "ソートと重複排除（sort / uniq）",
        content:
          "sort はテキストを行単位でソートするコマンドで、uniq は連続する重複行を除去します。sort と uniq を組み合わせて、データの集計やランキング作成によく使います。sort -k で特定の列をキーにソート、sort -n で数値としてソート、sort -r で逆順ソートができます。",
        code: `# アルファベット順にソート
sort names.txt

# 数値としてソート
sort -n scores.txt

# 逆順にソート
sort -r file.txt

# 特定列をキーにソート（3列目を数値として降順）
sort -t',' -k3 -n -r data.csv

# 重複を除去（事前にソートが必要）
sort file.txt | uniq

# 重複件数をカウント
sort access.log | uniq -c | sort -rn

# IPアドレス別のアクセス数ランキング
awk '{print $1}' access.log | sort | uniq -c | sort -rn | head -10

# ユニークな値だけ表示（重複していない行のみ）
sort file.txt | uniq -u`,
      },
      {
        title: "テキストの切り出し（head / tail / cut / wc）",
        content:
          "head でファイルの先頭部分、tail で末尾部分を表示します。tail -f でファイルをリアルタイムに監視でき、ログの監視に不可欠です。cut は行から特定の列やフィールドを切り出します。wc は行数・単語数・バイト数をカウントします。これらを組み合わせることで効率的にテキストデータを処理できます。",
        code: `# 先頭10行を表示
head application.log

# 先頭20行を表示
head -n 20 application.log

# 末尾10行を表示
tail application.log

# リアルタイムでログを監視（Ctrl+C で終了）
tail -f /var/log/myapp/application.log

# 複数ファイルを同時に監視
tail -f /var/log/myapp/*.log

# 末尾100行を表示
tail -n 100 error.log

# 区切り文字で特定フィールドを切り出し
cut -d',' -f1,3 data.csv

# 固定位置で切り出し（1〜10文字目）
cut -c1-10 file.txt

# 行数をカウント
wc -l src/main/java/com/example/**/*.java

# 単語数をカウント
wc -w document.txt

# Javaソースコードの総行数
find src/ -name "*.java" -exec wc -l {} + | tail -1`,
      },
    ],
  },
  {
    id: "pipe-redirect",
    title: "パイプとリダイレクト",
    category: "basics",
    description:
      "パイプ（|）とリダイレクト（>, >>）を使ったコマンドの連結と出力制御を学ぶ。複数のコマンドを組み合わせて複雑なデータ処理を行う方法を習得する。",
    sections: [
      {
        title: "パイプ（|）による連結",
        content:
          "パイプ（|）は前のコマンドの標準出力を次のコマンドの標準入力に渡します。複数のコマンドを連結することで、1つのコマンドでは実現できない複雑な処理を組み立てられます。Linux の哲学である「1つのことをうまくやる小さなプログラムを組み合わせる」の実践です。",
        code: `# プロセス一覧から java プロセスを検索
ps aux | grep java

# ログからエラーを抽出して件数をカウント
cat application.log | grep "ERROR" | wc -l

# アクセスログからIPアドレス別アクセス数トップ10
cat access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head -10

# Javaソースファイルの行数ランキング
find src/ -name "*.java" -exec wc -l {} + | sort -rn | head -20

# 設定ファイルからコメントと空行を除外して表示
cat application.properties | grep -v "^#" | grep -v "^$"

# ログの特定時間帯を抽出してエラーだけ表示
cat application.log | grep "2026-03-20 14:" | grep "ERROR"

# JSON レスポンスを整形して表示（jq がインストール済みの場合）
curl -s http://localhost:8080/api/users | jq '.'`,
      },
      {
        title: "標準出力のリダイレクト（> / >>）",
        content:
          "リダイレクト（>）はコマンドの出力をファイルに書き込みます。> は上書き、>> は追記です。コマンドの実行結果をファイルに保存したり、ログを記録するのに使います。> でファイルが存在する場合は内容がすべて上書きされるため注意が必要です。",
        code: `# コマンドの出力をファイルに保存（上書き）
ls -la > filelist.txt

# コマンドの出力をファイルに追記
echo "=== Build started ===" >> build.log
mvn clean package >> build.log

# 検索結果をファイルに保存
grep -r "TODO" src/ > todo-list.txt

# 日付付きでログファイルに記録
echo "$(date): Deployment completed" >> deploy.log

# ファイルを空にする
> application.log

# 複数コマンドの結果をまとめて保存
{
  echo "=== System Info ==="
  uname -a
  echo "=== Java Version ==="
  java -version 2>&1
  echo "=== Disk Usage ==="
  df -h
} > system-report.txt`,
      },
      {
        title: "標準エラー出力のリダイレクト（2> / 2>&1）",
        content:
          "Linux にはファイルディスクリプタ 0（標準入力）、1（標準出力）、2（標準エラー出力）があります。2> で標準エラー出力のみをリダイレクトし、2>&1 で標準エラー出力を標準出力にマージできます。Java アプリケーションのログ管理ではこの区別が重要です。",
        code: `# 標準エラー出力をファイルに保存
java -jar app.jar 2> error.log

# 標準出力と標準エラー出力を別々のファイルに保存
java -jar app.jar > stdout.log 2> stderr.log

# 標準出力と標準エラー出力を同じファイルに保存
java -jar app.jar > app.log 2>&1

# 同じことをより簡潔に（bash）
java -jar app.jar &> app.log

# エラー出力を捨てる（/dev/null に送る）
find / -name "*.conf" 2>/dev/null

# 標準出力を捨ててエラーだけ表示
mvn clean package > /dev/null 2>&1 && echo "Build succeeded" || echo "Build failed"`,
      },
      {
        title: "tee コマンド（画面とファイルに同時出力）",
        content:
          "tee コマンドは標準入力を受け取り、標準出力とファイルの両方に同時に書き込みます。パイプの途中でデータを分岐させたいときに使います。ビルドやデプロイのログを画面で確認しながらファイルにも記録する場合に便利です。-a オプションで追記モードになります。",
        code: `# 画面に表示しながらファイルにも保存
mvn clean package 2>&1 | tee build.log

# 追記モード
echo "Deploy started" | tee -a deploy.log

# パイプの途中で分岐
cat access.log | grep "ERROR" | tee error-only.log | wc -l

# ビルド＋テストのログを記録しながら実行
./gradlew build 2>&1 | tee -a "build-$(date +%Y%m%d-%H%M%S).log"

# sudo と組み合わせてroot権限でファイル書き込み
echo "server.port=8080" | sudo tee /etc/myapp/application.properties

# 複数ファイルに同時書き込み
echo "log entry" | tee file1.log file2.log file3.log`,
      },
      {
        title: "xargs（引数の組み立て）",
        content:
          "xargs は標準入力から受け取ったデータを、別のコマンドの引数として渡します。find の結果を他のコマンドに渡したり、ファイル一覧に対して一括処理を行う場合に使います。-I {} でプレースホルダーを指定して引数の位置を制御できます。-P でコマンドを並列実行することも可能です。",
        code: `# find の結果を rm に渡して一括削除
find . -name "*.class" | xargs rm

# ファイル名にスペースがある場合（-0 と -print0 の組み合わせ）
find . -name "*.log" -print0 | xargs -0 rm

# プレースホルダーを使って引数の位置を指定
find . -name "*.java" | xargs -I {} cp {} backup/

# 複数ファイルに対して grep を実行
find src/ -name "*.java" | xargs grep "Deprecated"

# 並列実行（4プロセス同時）
find . -name "*.java" | xargs -P 4 -I {} javac {}

# Git で変更されたJavaファイルだけフォーマット
git diff --name-only -- "*.java" | xargs google-java-format -i

# 一度に渡す引数の数を制限
find . -name "*.txt" | xargs -n 5 echo`,
      },
    ],
  },

  // ===== システム管理 =====
  {
    id: "process-management",
    title: "プロセス管理",
    category: "system",
    description:
      "プロセスの確認、停止、バックグラウンド実行、スケジュール実行を学ぶ。Java アプリケーションの運用に必要なプロセス管理の基本を習得する。",
    sections: [
      {
        title: "プロセスの確認（ps / top）",
        content:
          "ps コマンドで現在実行中のプロセスの一覧を表示し、top コマンドでリアルタイムにプロセスの状態を監視します。ps aux で全ユーザーの全プロセスを表示し、Java アプリケーションのプロセスID（PID）やメモリ使用量を確認できます。top では CPU 使用率やメモリ使用率でソートして、リソースを多く消費しているプロセスを特定できます。",
        code: `# 全プロセスを表示
ps aux

# Java プロセスだけ表示
ps aux | grep java

# プロセスツリーを表示
ps auxf

# 特定ユーザーのプロセスを表示
ps -u tomcat

# リアルタイムでプロセスを監視
top

# top でメモリ使用率順にソート（M キー）
# top で CPU 使用率順にソート（P キー）

# 特定プロセスのみ top で監視
top -p $(pgrep -d',' java)

# Java プロセスの詳細情報（JDK付属）
jps -lv

# メモリ使用状況を確認
free -h

# CPU 情報を確認
lscpu | head -20`,
      },
      {
        title: "プロセスの停止（kill / pkill）",
        content:
          "kill コマンドでプロセスにシグナルを送信して停止します。デフォルトは SIGTERM（15）で正常終了を要求し、SIGKILL（9）で強制終了します。Java アプリケーションには SIGTERM を送ることで、ShutdownHook が実行されてリソースの解放が行われます。pkill はプロセス名で指定でき、PID を調べる手間が省けます。",
        code: `# プロセスIDを指定して正常終了（SIGTERM）
kill 12345

# プロセスIDを指定して強制終了（SIGKILL）
kill -9 12345

# シグナル一覧を表示
kill -l

# プロセス名で終了
pkill -f "java -jar app.jar"

# Java プロセスを全て正常終了
pkill java

# プロセスIDを名前から検索して終了
kill $(pgrep -f "spring-boot")

# 段階的な停止（まず正常終了を試み、5秒後に強制終了）
PID=$(pgrep -f "app.jar")
kill \${PID}
sleep 5
if kill -0 \${PID} 2>/dev/null; then
  echo "プロセスが停止しないため強制終了します"
  kill -9 \${PID}
fi`,
      },
      {
        title: "バックグラウンド実行（nohup / &）",
        content:
          "& をコマンドの末尾に付けるとバックグラウンドで実行され、nohup を付けるとログアウト後もプロセスが継続します。Java アプリケーションをSSH経由で起動してログアウトしても実行を継続させたい場合に nohup を使います。出力は nohup.out に保存されますが、リダイレクトで任意のファイルに変更できます。",
        code: `# バックグラウンドで実行
java -jar app.jar &

# nohup でログアウト後も継続（出力は nohup.out へ）
nohup java -jar app.jar &

# 出力ファイルを指定して nohup 実行
nohup java -jar app.jar > /var/log/myapp/app.log 2>&1 &

# PID をファイルに記録
nohup java -jar app.jar > app.log 2>&1 &
echo $! > app.pid

# PID ファイルを使った停止
kill $(cat app.pid)

# バックグラウンドジョブの確認
jobs

# フォアグラウンドに戻す
fg %1

# バックグラウンドに送る（Ctrl+Z で停止後）
bg %1`,
      },
      {
        title: "サービス管理（systemctl）",
        content:
          "systemctl は systemd によるサービス管理コマンドです。サービスの起動・停止・再起動・状態確認、OS起動時の自動起動設定ができます。Java アプリケーションを systemd サービスとして登録することで、安定した運用管理が実現できます。journalctl でサービスのログを確認できます。",
        code: `# サービスの状態確認
sudo systemctl status myapp

# サービスの起動
sudo systemctl start myapp

# サービスの停止
sudo systemctl stop myapp

# サービスの再起動
sudo systemctl restart myapp

# 設定再読み込み後に再起動
sudo systemctl daemon-reload
sudo systemctl restart myapp

# OS起動時の自動起動を有効化
sudo systemctl enable myapp

# 自動起動を無効化
sudo systemctl disable myapp

# サービスのログを確認
journalctl -u myapp -f

# 最近のログのみ表示
journalctl -u myapp --since "1 hour ago"

# 全サービスの状態一覧
systemctl list-units --type=service --state=running`,
      },
      {
        title: "定期実行（cron）",
        content:
          "cron はコマンドやスクリプトを定期的に自動実行するスケジューラです。crontab -e でスケジュールを編集し、分・時・日・月・曜日の5つのフィールドで実行タイミングを指定します。Java アプリケーションの定期バッチ処理、ログローテーション、バックアップなどに使います。",
        code: `# crontab の編集
crontab -e

# 現在の crontab を表示
crontab -l

# cron の書式: 分 時 日 月 曜日 コマンド
# ┌───────── 分 (0-59)
# │ ┌─────── 時 (0-23)
# │ │ ┌───── 日 (1-31)
# │ │ │ ┌─── 月 (1-12)
# │ │ │ │ ┌─ 曜日 (0-7, 0と7は日曜)
# │ │ │ │ │
# * * * * * コマンド

# 毎日3時にバックアップスクリプトを実行
0 3 * * * /opt/scripts/backup.sh >> /var/log/backup.log 2>&1

# 毎時0分にヘルスチェック
0 * * * * curl -s http://localhost:8080/actuator/health >> /var/log/healthcheck.log

# 5分ごとに実行
*/5 * * * * /opt/scripts/monitor.sh

# 平日の9時〜18時に30分ごとに実行
*/30 9-18 * * 1-5 /opt/scripts/sync.sh

# 毎月1日の0時にログクリーンアップ
0 0 1 * * find /var/log/myapp -name "*.log" -mtime +30 -delete`,
      },
    ],
  },
  {
    id: "network",
    title: "ネットワーク・通信",
    category: "system",
    description:
      "curl, ssh, scp などのネットワーク関連コマンドを学ぶ。Java アプリケーションのAPI テスト、リモートサーバーへの接続、ファイル転送の方法を習得する。",
    sections: [
      {
        title: "HTTP リクエスト（curl）",
        content:
          "curl はコマンドラインから HTTP リクエストを送信するツールです。REST API のテストやヘルスチェックに頻繁に使います。GET、POST、PUT、DELETE などのメソッドを指定でき、ヘッダーやリクエストボディも設定できます。Java の Spring Boot アプリケーションの動作確認に欠かせないツールです。",
        code: `# GET リクエスト
curl http://localhost:8080/api/users

# レスポンスヘッダーも表示
curl -i http://localhost:8080/api/users

# JSON データを POST
curl -X POST http://localhost:8080/api/users \\
  -H "Content-Type: application/json" \\
  -d '{"name":"田中","email":"tanaka@example.com"}'

# PUT リクエスト
curl -X PUT http://localhost:8080/api/users/1 \\
  -H "Content-Type: application/json" \\
  -d '{"name":"田中太郎"}'

# DELETE リクエスト
curl -X DELETE http://localhost:8080/api/users/1

# Bearer トークンを使った認証
curl -H "Authorization: Bearer eyJhbGciOi..." http://localhost:8080/api/secure

# レスポンスを整形して表示
curl -s http://localhost:8080/api/users | jq '.'

# タイムアウトを設定
curl --connect-timeout 5 --max-time 10 http://localhost:8080/actuator/health

# ファイルをダウンロード
curl -O https://example.com/app.jar`,
      },
      {
        title: "ファイルダウンロード（wget）",
        content:
          "wget はファイルをダウンロードするコマンドです。curl と異なり、再帰的なダウンロードやダウンロードの再開機能があります。JDK やライブラリの取得、ウェブサイトのミラーリングに使います。-c オプションで中断したダウンロードを再開できます。",
        code: `# ファイルをダウンロード
wget https://example.com/jdk-21_linux-x64.tar.gz

# 出力ファイル名を指定
wget -O app.jar https://example.com/releases/latest/app.jar

# ダウンロードを再開
wget -c https://example.com/large-file.tar.gz

# バックグラウンドでダウンロード
wget -b https://example.com/jdk-21_linux-x64.tar.gz

# 静かなモード（プログレスバーを非表示）
wget -q https://example.com/app.jar

# 基本認証付きダウンロード
wget --user=admin --password=secret https://nexus.example.com/artifact.jar

# 複数ファイルを一括ダウンロード
wget -i download-list.txt`,
      },
      {
        title: "リモート接続（ssh）",
        content:
          "ssh（Secure Shell）はリモートサーバーに安全に接続するコマンドです。公開鍵認証を設定すればパスワードなしでログインでき、~/.ssh/config に接続情報を登録すれば短い名前でアクセスできます。ポートフォワーディングでリモートサーバーのサービスにローカルからアクセスすることも可能です。",
        code: `# リモートサーバーに接続
ssh user@192.168.1.100

# ポートを指定して接続
ssh -p 2222 user@example.com

# 秘密鍵を指定して接続
ssh -i ~/.ssh/my-key.pem ec2-user@ec2-xxx.amazonaws.com

# リモートでコマンドを実行（接続→実行→切断）
ssh user@server "java -version"

# ポートフォワーディング（ローカルの8080でリモートの8080にアクセス）
ssh -L 8080:localhost:8080 user@server

# SSH 設定ファイル（~/.ssh/config）
# Host myserver
#   HostName 192.168.1.100
#   User deploy
#   Port 22
#   IdentityFile ~/.ssh/id_rsa

# 設定後は短い名前で接続可能
ssh myserver

# SSH 鍵の生成
ssh-keygen -t ed25519 -C "user@example.com"

# 公開鍵をリモートサーバーに登録
ssh-copy-id user@server`,
      },
      {
        title: "ファイル転送（scp / rsync）",
        content:
          "scp は SSH を使ったセキュアなファイルコピー、rsync は差分転送による効率的なファイル同期コマンドです。Java アプリケーションのデプロイやログの収集でよく使います。rsync は変更されたファイルだけを転送するため、大量のファイルを扱う場合に scp より高速です。",
        code: `# ローカルからリモートにファイルをコピー
scp app.jar user@server:/opt/deploy/

# リモートからローカルにファイルをコピー
scp user@server:/var/log/app.log ./

# ディレクトリを再帰的にコピー
scp -r config/ user@server:/opt/myapp/config/

# ポートを指定
scp -P 2222 app.jar user@server:/opt/deploy/

# rsync でディレクトリを同期（差分転送）
rsync -avz ./target/ user@server:/opt/deploy/

# rsync で削除も同期（ミラーリング）
rsync -avz --delete ./config/ user@server:/opt/myapp/config/

# rsync の転送進捗を表示
rsync -avz --progress app.jar user@server:/opt/deploy/

# 特定ファイルを除外して同期
rsync -avz --exclude='*.log' --exclude='target/' ./ user@server:/opt/myapp/`,
      },
      {
        title: "ネットワーク状態の確認（ss / netstat / ping）",
        content:
          "ss（socket statistics）や netstat でネットワーク接続やリスニングポートを確認します。Java アプリケーションがどのポートで待ち受けているか、どの接続が確立されているかを調べるのに使います。ping でネットワークの疎通確認も行えます。",
        code: `# リスニングポートを表示
ss -tlnp

# 特定ポートを使っているプロセスを確認
ss -tlnp | grep 8080

# TCP 接続状態を確認
ss -tn

# netstat でリスニングポートを表示（レガシー）
netstat -tlnp

# 特定ポートが使用中かチェック
lsof -i :8080

# ネットワーク疎通確認
ping -c 3 google.com

# DNS 名前解決の確認
nslookup example.com

# ポートの到達可能性を確認
nc -zv example.com 443

# ルーティングテーブルを表示
ip route show

# ネットワークインターフェースの情報
ip addr show`,
      },
    ],
  },
  {
    id: "permission-user",
    title: "パーミッションとユーザー管理",
    category: "system",
    description:
      "ファイルのパーミッション、所有者の変更、sudo によるroot権限の実行、ユーザー管理を学ぶ。サーバー上で Java アプリケーションを安全に運用するための基本知識を習得する。",
    sections: [
      {
        title: "パーミッションの概念と確認",
        content:
          "Linux のファイルにはオーナー（u）、グループ（g）、その他（o）の3種類のユーザーに対して、読み取り（r=4）、書き込み（w=2）、実行（x=1）の3種類の権限が設定されます。ls -l の出力の先頭10文字がパーミッションを示します。例えば -rwxr-xr-- は、オーナーが全権限、グループが読み取りと実行、その他が読み取りのみです。",
        code: `# パーミッションを確認
ls -l app.jar
# -rw-r--r-- 1 deploy deploy 52428800 Mar 20 10:00 app.jar
# │└┬┘└┬┘└┬┘
# │ │   │   └── その他（other）: r-- (読み取りのみ)
# │ │   └────── グループ（group）: r-- (読み取りのみ)
# │ └────────── オーナー（user）: rw- (読み書き)
# └──────────── ファイルタイプ: - (通常ファイル), d (ディレクトリ)

# ディレクトリのパーミッション
ls -ld /opt/myapp
# drwxr-xr-x 5 deploy deploy 4096 Mar 20 10:00 /opt/myapp

# 数値表記の対応
# r(読み取り) = 4
# w(書き込み) = 2
# x(実行)     = 1
# 例: rwxr-xr-- = 754`,
      },
      {
        title: "パーミッションの変更（chmod）",
        content:
          "chmod でファイルやディレクトリのパーミッションを変更します。数値指定（例: 755）とシンボリック指定（例: u+x）の2種類の方法があります。シェルスクリプトに実行権限を付与したり、設定ファイルのアクセスを制限するのに使います。-R で再帰的に変更できます。",
        code: `# 数値指定でパーミッションを変更（rwxr-xr-x = 755）
chmod 755 start.sh

# 実行権限を付与（シンボリック指定）
chmod +x deploy.sh

# オーナーにのみ読み書き権限（設定ファイルの保護）
chmod 600 application-secret.properties

# オーナーに全権限、グループに読み取りと実行
chmod 750 /opt/myapp/

# 再帰的にパーミッションを変更
chmod -R 644 /opt/myapp/config/

# ディレクトリだけ実行権限を付与
find /opt/myapp -type d -exec chmod 755 {} \\;

# ファイルだけ読み書き権限に設定
find /opt/myapp -type f -exec chmod 644 {} \\;

# グループに書き込み権限を追加
chmod g+w shared-config.properties

# その他から全権限を除去
chmod o-rwx sensitive-data.txt`,
      },
      {
        title: "所有者の変更（chown / chgrp）",
        content:
          "chown でファイルの所有者（オーナー）とグループを変更します。Java アプリケーション用の専用ユーザーを作成してファイルの所有者を変更することで、セキュリティを向上させます。chgrp でグループのみを変更することもできます。root 権限（sudo）が必要です。",
        code: `# ファイルの所有者を変更
sudo chown deploy app.jar

# 所有者とグループを同時に変更
sudo chown deploy:deploy app.jar

# ディレクトリ以下を再帰的に変更
sudo chown -R deploy:deploy /opt/myapp/

# グループのみを変更
sudo chgrp developers shared-config.properties

# デプロイ用ディレクトリの準備
sudo mkdir -p /opt/myapp
sudo chown -R deploy:deploy /opt/myapp
sudo chmod 755 /opt/myapp

# ログディレクトリの権限設定
sudo mkdir -p /var/log/myapp
sudo chown deploy:deploy /var/log/myapp
sudo chmod 755 /var/log/myapp`,
      },
      {
        title: "root 権限の実行（sudo）",
        content:
          "sudo は一般ユーザーが一時的に root 権限でコマンドを実行するためのコマンドです。サーバーの設定変更やサービスの管理などシステム管理作業に必要です。/etc/sudoers ファイルで sudo の使用権限を管理します。セキュリティのため、root で直接ログインするのではなく sudo を使うのが推奨されます。",
        code: `# root 権限でコマンドを実行
sudo systemctl restart myapp

# root 権限でファイルを編集
sudo vi /etc/systemd/system/myapp.service

# root ユーザーに切り替え
sudo su -

# 別のユーザーに切り替え
sudo su - deploy

# 現在のユーザーの sudo 権限を確認
sudo -l

# sudoers ファイルの編集（必ず visudo を使用）
sudo visudo

# sudoers の設定例（/etc/sudoers.d/deploy）
# deploy ALL=(ALL) NOPASSWD: /bin/systemctl restart myapp
# deploy ALL=(ALL) NOPASSWD: /bin/systemctl stop myapp
# deploy ALL=(ALL) NOPASSWD: /bin/systemctl start myapp

# sudo でパスワードなしで特定コマンドを許可する設定
echo "deploy ALL=(ALL) NOPASSWD: /bin/systemctl * myapp" | sudo tee /etc/sudoers.d/deploy`,
      },
      {
        title: "ユーザーとグループの管理",
        content:
          "Linux ではユーザーとグループを使ってアクセス制御を行います。Java アプリケーション用の専用ユーザー（例: deploy）を作成し、最小権限の原則に従ってアクセスを制限します。/etc/passwd にユーザー情報、/etc/group にグループ情報が記録されます。",
        code: `# 現在のユーザー情報を確認
whoami
id

# ユーザーの詳細情報
id deploy

# ユーザーを作成（ホームディレクトリも作成）
sudo useradd -m -s /bin/bash deploy

# パスワードを設定
sudo passwd deploy

# システムユーザーを作成（ログイン不可、サービス実行用）
sudo useradd -r -s /sbin/nologin myapp

# グループを作成
sudo groupadd developers

# ユーザーをグループに追加
sudo usermod -aG developers deploy

# ユーザー一覧を確認
cat /etc/passwd | cut -d: -f1

# グループ一覧を確認
cat /etc/group | cut -d: -f1,4

# ユーザーを削除（ホームディレクトリも削除）
sudo userdel -r olduser`,
      },
    ],
  },

  // ===== Java開発運用 =====
  {
    id: "java-deploy",
    title: "Javaアプリのデプロイ",
    category: "devops",
    description:
      "Java アプリケーションを Linux サーバーにデプロイする方法を学ぶ。JAR ファイルの実行、JVM 引数の設定、systemd サービス化、ログ管理まで実践的なスキルを習得する。",
    sections: [
      {
        title: "JAR ファイルの実行と JVM 引数",
        content:
          "java -jar コマンドで実行可能 JAR ファイルを起動します。JVM 引数でヒープメモリ、GC設定、システムプロパティを指定できます。本番環境ではメモリ設定を適切に行い、GC ログを有効にすることが重要です。Spring Boot アプリケーションではプロファイルの切り替えもコマンドラインで行えます。",
        code: `# 基本的な JAR 実行
java -jar app.jar

# ヒープメモリを設定（最小512MB、最大2GB）
java -Xms512m -Xmx2g -jar app.jar

# Spring Boot のプロファイルを指定
java -jar app.jar --spring.profiles.active=prod

# システムプロパティを指定
java -Dserver.port=9090 -Dspring.profiles.active=prod -jar app.jar

# GC ログを有効化（Java 11+）
java -Xlog:gc*:file=/var/log/myapp/gc.log:time,tags:filecount=5,filesize=10m \\
  -jar app.jar

# 本番環境向けの推奨設定
java \\
  -server \\
  -Xms1g -Xmx1g \\
  -XX:+UseG1GC \\
  -XX:MaxGCPauseMillis=200 \\
  -XX:+HeapDumpOnOutOfMemoryError \\
  -XX:HeapDumpPath=/var/log/myapp/heapdump.hprof \\
  -Dfile.encoding=UTF-8 \\
  -Duser.timezone=Asia/Tokyo \\
  -jar app.jar

# Java のバージョンを確認
java -version

# JVM の設定値を確認
java -XX:+PrintFlagsFinal -version 2>&1 | grep HeapSize`,
      },
      {
        title: "systemd サービスの作成",
        content:
          "Java アプリケーションを systemd サービスとして登録すると、OS 起動時の自動起動、異常終了時の自動再起動、ログの統合管理が可能になります。ユニットファイルを /etc/systemd/system/ に作成し、ExecStart でJava の起動コマンドを指定します。Restart=always で異常終了時に自動再起動されます。",
        code: `# systemd ユニットファイルの作成
sudo vi /etc/systemd/system/myapp.service

# --- /etc/systemd/system/myapp.service ---
# [Unit]
# Description=My Java Application
# After=network.target
# Wants=network-online.target
#
# [Service]
# Type=simple
# User=deploy
# Group=deploy
# WorkingDirectory=/opt/myapp
# ExecStart=/usr/bin/java -Xms512m -Xmx1g -jar /opt/myapp/app.jar --spring.profiles.active=prod
# ExecStop=/bin/kill -TERM $MAINPID
# Restart=always
# RestartSec=10
# StandardOutput=journal
# StandardError=journal
# SyslogIdentifier=myapp
# Environment=JAVA_HOME=/usr/lib/jvm/java-21
# Environment=SPRING_PROFILES_ACTIVE=prod
#
# [Install]
# WantedBy=multi-user.target
# --- ファイル終了 ---

# 設定を再読み込み
sudo systemctl daemon-reload

# サービスを起動して自動起動を有効化
sudo systemctl start myapp
sudo systemctl enable myapp

# 状態を確認
sudo systemctl status myapp`,
      },
      {
        title: "アプリケーションログの管理",
        content:
          "Java アプリケーションのログは、標準出力・ファイル出力・journald の3つの方法で管理できます。systemd サービスの場合は journalctl で参照できます。logrotate でログファイルのローテーションを設定し、ディスク容量の枯渇を防ぎます。Spring Boot では Logback の設定でログレベルやフォーマットを制御します。",
        code: `# journalctl でサービスログを確認
journalctl -u myapp

# リアルタイムでログを監視
journalctl -u myapp -f

# 日付範囲を指定してログを表示
journalctl -u myapp --since "2026-03-20 09:00" --until "2026-03-20 18:00"

# エラーレベル以上のログのみ表示
journalctl -u myapp -p err

# logrotate の設定（/etc/logrotate.d/myapp）
# /var/log/myapp/*.log {
#     daily
#     rotate 30
#     compress
#     delaycompress
#     missingok
#     notifempty
#     copytruncate
#     dateext
# }

# logrotate の手動実行（テスト）
sudo logrotate -d /etc/logrotate.d/myapp

# ログファイルのサイズ確認
du -sh /var/log/myapp/

# 古いログファイルの削除（30日以上前）
find /var/log/myapp -name "*.log.gz" -mtime +30 -delete`,
      },
      {
        title: "デプロイの自動化",
        content:
          "Java アプリケーションのデプロイを自動化するスクリプトを作成します。JAR ファイルの配置、旧バージョンのバックアップ、サービスの再起動、ヘルスチェックまでを一連の流れで実行します。ダウンタイムを最小限にするためのローリングデプロイも考慮します。",
        code: `#!/bin/bash
# deploy.sh - Javaアプリケーションのデプロイスクリプト

APP_NAME="myapp"
APP_DIR="/opt/myapp"
JAR_NAME="app.jar"
BACKUP_DIR="/opt/myapp/backup"
HEALTH_URL="http://localhost:8080/actuator/health"

echo "=== \${APP_NAME} デプロイ開始 ==="

# 1. バックアップ
echo "旧バージョンをバックアップ..."
mkdir -p \${BACKUP_DIR}
cp \${APP_DIR}/\${JAR_NAME} \${BACKUP_DIR}/\${JAR_NAME}.$(date +%Y%m%d%H%M%S)

# 2. 新しいJARを配置
echo "新しいJARファイルを配置..."
cp /tmp/\${JAR_NAME} \${APP_DIR}/\${JAR_NAME}

# 3. サービスを再起動
echo "サービスを再起動..."
sudo systemctl restart \${APP_NAME}

# 4. ヘルスチェック
echo "ヘルスチェック中..."
for i in $(seq 1 30); do
  if curl -s \${HEALTH_URL} | grep -q '"status":"UP"'; then
    echo "デプロイ成功！"
    exit 0
  fi
  echo "  起動待ち... (\${i}/30)"
  sleep 2
done

echo "ヘルスチェック失敗。ロールバックします..."
cp \${BACKUP_DIR}/\${JAR_NAME}.* \${APP_DIR}/\${JAR_NAME}
sudo systemctl restart \${APP_NAME}
exit 1`,
      },
      {
        title: "環境構築と確認コマンド",
        content:
          "Linux サーバーに Java アプリケーションの実行環境を構築する手順を解説します。JDK のインストール、環境変数の設定、ディレクトリの準備、ファイアウォールの設定など、デプロイ前の準備作業をまとめます。",
        code: `# JDK のインストール（Amazon Linux 2 / CentOS）
sudo yum install java-21-amazon-corretto-devel

# JDK のインストール（Ubuntu / Debian）
sudo apt update
sudo apt install openjdk-21-jdk

# JAVA_HOME の設定
echo 'export JAVA_HOME=/usr/lib/jvm/java-21' >> ~/.bashrc
echo 'export PATH=\$JAVA_HOME/bin:\$PATH' >> ~/.bashrc
source ~/.bashrc

# Java のバージョン確認
java -version
javac -version

# アプリケーション用ディレクトリの作成
sudo mkdir -p /opt/myapp/{config,logs,backup}
sudo chown -R deploy:deploy /opt/myapp

# ログディレクトリの作成
sudo mkdir -p /var/log/myapp
sudo chown deploy:deploy /var/log/myapp

# ファイアウォールの設定（firewalld）
sudo firewall-cmd --permanent --add-port=8080/tcp
sudo firewall-cmd --reload

# ファイアウォールの設定（ufw - Ubuntu）
sudo ufw allow 8080/tcp

# ディスク容量の確認
df -h

# メモリの確認
free -h`,
      },
    ],
  },
  {
    id: "shell-script",
    title: "シェルスクリプト",
    category: "devops",
    description:
      "bash シェルスクリプトの基本を学ぶ。変数、条件分岐、ループ、関数を使って、Java アプリケーションのビルド・デプロイ・監視を自動化するスクリプトを作成する。",
    sections: [
      {
        title: "シェルスクリプトの基本",
        content:
          "シェルスクリプトは Linux コマンドをファイルにまとめて自動実行するプログラムです。1行目に #!/bin/bash（シバン）を記述し、chmod +x で実行権限を付与して実行します。set -e でエラー時に即終了、set -u で未定義変数の使用時にエラーにする設定が推奨されます。",
        code: `#!/bin/bash
# スクリプトの基本構成

# エラーハンドリングの設定
set -euo pipefail

# 変数の定義
APP_NAME="myapp"
VERSION="1.0.0"
DATE=$(date +%Y-%m-%d)

# 変数の参照
echo "アプリケーション: \${APP_NAME}"
echo "バージョン: \${VERSION}"
echo "日付: \${DATE}"

# コマンドの実行結果を変数に格納
JAVA_VERSION=$(java -version 2>&1 | head -1)
echo "Java: \${JAVA_VERSION}"

# 引数の取得
# $0: スクリプト名、$1: 第1引数、$#: 引数の数
echo "スクリプト: $0"
echo "引数の数: $#"
echo "全引数: $@"

# 終了コード
# exit 0  # 正常終了
# exit 1  # 異常終了`,
      },
      {
        title: "条件分岐（if / case）",
        content:
          "if 文でコマンドの実行結果や条件式に基づいて処理を分岐します。test コマンド（[ ] や [[ ]] ）で条件を評価します。case 文はパターンマッチによる多分岐に使います。Java アプリの状態チェックや環境ごとの設定切り替えに活用します。",
        code: `#!/bin/bash
set -euo pipefail

# ファイルの存在チェック
if [ -f "/opt/myapp/app.jar" ]; then
  echo "JARファイルが見つかりました"
else
  echo "JARファイルが見つかりません"
  exit 1
fi

# ディレクトリの存在チェック
if [ ! -d "/var/log/myapp" ]; then
  mkdir -p /var/log/myapp
  echo "ログディレクトリを作成しました"
fi

# 文字列の比較
ENV=\${1:-dev}
if [[ "\${ENV}" == "prod" ]]; then
  echo "本番環境の設定を使用します"
  JAVA_OPTS="-Xms1g -Xmx2g"
elif [[ "\${ENV}" == "staging" ]]; then
  echo "ステージング環境の設定を使用します"
  JAVA_OPTS="-Xms512m -Xmx1g"
else
  echo "開発環境の設定を使用します"
  JAVA_OPTS="-Xms256m -Xmx512m"
fi

# case 文による分岐
case "\${1:-}" in
  start)   echo "アプリを起動します" ;;
  stop)    echo "アプリを停止します" ;;
  restart) echo "アプリを再起動します" ;;
  status)  echo "アプリの状態を確認します" ;;
  *)       echo "Usage: $0 {start|stop|restart|status}" && exit 1 ;;
esac`,
      },
      {
        title: "ループ（for / while）",
        content:
          "for ループはリストの各要素に対して処理を繰り返し、while ループは条件が真の間繰り返します。サーバー一覧に対する一括操作、ログ監視、リトライ処理などに活用します。break でループを抜け、continue で次の反復にスキップできます。",
        code: `#!/bin/bash
set -euo pipefail

# for ループ: リストを反復
for server in web01 web02 web03; do
  echo "Deploying to \${server}..."
  scp app.jar deploy@\${server}:/opt/myapp/
  ssh deploy@\${server} "sudo systemctl restart myapp"
done

# for ループ: 数値範囲
for i in $(seq 1 5); do
  echo "試行 \${i}/5"
done

# for ループ: ファイルを反復
for file in /var/log/myapp/*.log; do
  echo "処理中: \${file} ($(wc -l < "\${file}") 行)"
done

# while ループ: ヘルスチェックのリトライ
MAX_RETRIES=30
RETRY_COUNT=0
while [ \${RETRY_COUNT} -lt \${MAX_RETRIES} ]; do
  if curl -s http://localhost:8080/actuator/health | grep -q '"UP"'; then
    echo "ヘルスチェック成功！"
    break
  fi
  RETRY_COUNT=$((RETRY_COUNT + 1))
  echo "リトライ中... (\${RETRY_COUNT}/\${MAX_RETRIES})"
  sleep 2
done

if [ \${RETRY_COUNT} -eq \${MAX_RETRIES} ]; then
  echo "ヘルスチェックがタイムアウトしました"
  exit 1
fi

# while ループ: ファイルを1行ずつ読み込み
while IFS= read -r line; do
  echo "処理: \${line}"
done < servers.txt`,
      },
      {
        title: "関数とエラーハンドリング",
        content:
          "シェルスクリプトでは関数を定義して処理を部品化できます。return で終了コード（0: 成功、1: 失敗）を返し、呼び出し側で $? を確認します。trap コマンドでシグナルをキャッチして後処理（クリーンアップ）を実行でき、エラー時の安全な終了処理に使います。",
        code: `#!/bin/bash
set -euo pipefail

# ログ出力関数
log_info() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] [INFO] $1"
}

log_error() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] [ERROR] $1" >&2
}

# ヘルスチェック関数
check_health() {
  local url="$1"
  local max_retries="\${2:-30}"
  local retry_count=0

  while [ \${retry_count} -lt \${max_retries} ]; do
    if curl -sf "\${url}" > /dev/null 2>&1; then
      return 0
    fi
    retry_count=$((retry_count + 1))
    sleep 2
  done
  return 1
}

# トラップ（クリーンアップ処理）
cleanup() {
  log_info "クリーンアップ処理を実行..."
  rm -f /tmp/myapp-deploy.lock
}
trap cleanup EXIT ERR

# ロックファイルで二重実行を防止
LOCK_FILE="/tmp/myapp-deploy.lock"
if [ -f "\${LOCK_FILE}" ]; then
  log_error "別のデプロイが実行中です"
  exit 1
fi
touch "\${LOCK_FILE}"

# メイン処理
log_info "デプロイを開始します"

if check_health "http://localhost:8080/actuator/health"; then
  log_info "アプリケーションは正常です"
else
  log_error "アプリケーションが応答しません"
  exit 1
fi`,
      },
      {
        title: "Java ビルド・デプロイスクリプトの実践",
        content:
          "実際のJavaプロジェクトで使えるビルドからデプロイまでの一連のスクリプトを作成します。Maven/Gradle によるビルド、テストの実行、JAR ファイルの配布、サービスの再起動、ヘルスチェックまでを自動化します。環境変数やコマンドライン引数で動作を制御します。",
        code: `#!/bin/bash
# build-and-deploy.sh - ビルドからデプロイまでの自動化スクリプト
set -euo pipefail

# 設定
APP_NAME="myapp"
PROJECT_DIR="/home/deploy/\${APP_NAME}"
DEPLOY_DIR="/opt/\${APP_NAME}"
LOG_FILE="/var/log/\${APP_NAME}/deploy.log"
ENV=\${1:-dev}

log() { echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "\${LOG_FILE}"; }

# 1. ソースコードの取得
log "=== ソースコードを更新 ==="
cd "\${PROJECT_DIR}"
git fetch origin
git checkout main
git pull origin main

# 2. ビルド
log "=== ビルド開始 ==="
if [ -f "pom.xml" ]; then
  ./mvnw clean package -DskipTests -q
  JAR_FILE=$(find target -name "*.jar" -not -name "*-sources.jar" | head -1)
elif [ -f "build.gradle" ]; then
  ./gradlew clean bootJar -q
  JAR_FILE=$(find build/libs -name "*.jar" | head -1)
else
  log "ビルドファイルが見つかりません"
  exit 1
fi
log "ビルド完了: \${JAR_FILE}"

# 3. バックアップ
log "=== バックアップ ==="
BACKUP="\${DEPLOY_DIR}/backup/app-$(date +%Y%m%d%H%M%S).jar"
cp "\${DEPLOY_DIR}/app.jar" "\${BACKUP}" 2>/dev/null || true

# 4. デプロイ
log "=== デプロイ ==="
cp "\${JAR_FILE}" "\${DEPLOY_DIR}/app.jar"
sudo systemctl restart \${APP_NAME}

# 5. ヘルスチェック
log "=== ヘルスチェック ==="
for i in $(seq 1 30); do
  if curl -sf http://localhost:8080/actuator/health > /dev/null; then
    log "デプロイ成功！（\${i}秒）"
    exit 0
  fi
  sleep 1
done
log "ヘルスチェック失敗。ロールバック中..."
cp "\${BACKUP}" "\${DEPLOY_DIR}/app.jar"
sudo systemctl restart \${APP_NAME}
exit 1`,
      },
    ],
  },
];
