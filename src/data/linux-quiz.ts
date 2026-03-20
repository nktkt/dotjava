export type LinuxLevel = "basics" | "system" | "devops";

export interface LinuxQuizQuestion {
  id: string;
  question: string;
  choices: { label: string; text: string }[];
  correctLabel: string;
  explanation: string;
  code?: string;
  level: LinuxLevel;
  chapter: string;
}

export const linuxQuizQuestions: LinuxQuizQuestion[] = [
  // ════════════════════════════════════════
  // basics: ファイル操作・基本コマンド (linux-basics) 5問
  // ════════════════════════════════════════
  {
    id: "linux-basics-q01",
    question: "Linuxのファイルパーミッション「755」の意味として正しいものはどれですか？",
    choices: [
      { label: "A", text: "所有者: 読み書き実行、グループ: 読み書き、その他: 読み書き" },
      { label: "B", text: "所有者: 読み書き実行、グループ: 読み実行、その他: 読み実行" },
      { label: "C", text: "所有者: 読み実行、グループ: 読み書き実行、その他: 読み書き実行" },
      { label: "D", text: "全ユーザー: 読み書き実行" },
    ],
    correctLabel: "B",
    explanation:
      "パーミッション数値は3桁で、左から所有者・グループ・その他の権限を表します。7=rwx（読み書き実行）、5=r-x（読み実行）です。755はスクリプトやディレクトリで一般的な設定で、所有者のみが変更可能です。",
    level: "basics",
    chapter: "linux-basics",
  },
  {
    id: "linux-basics-q02",
    question: "findコマンドで/var/log以下の7日以上前に更新されたログファイルを検索するコマンドはどれですか？",
    choices: [
      { label: "A", text: "find /var/log -name '*.log' -mtime +7" },
      { label: "B", text: "find /var/log -name '*.log' -mtime -7" },
      { label: "C", text: "find /var/log -type d -mtime 7" },
      { label: "D", text: "search /var/log -name '*.log' -days 7" },
    ],
    correctLabel: "A",
    explanation:
      "findコマンドの-mtimeオプションで更新日時による検索ができます。+7は7日より前、-7は7日以内を意味します。-name '*.log'でログファイルに限定しています。古いログの削除やアーカイブの自動化でよく使われるパターンです。",
    level: "basics",
    chapter: "linux-basics",
  },
  {
    id: "linux-basics-q03",
    question: "パイプ（|）とリダイレクト（>）の違いとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "パイプはファイルに出力、リダイレクトは次のコマンドに出力" },
      { label: "B", text: "パイプは前のコマンドの出力を次のコマンドの入力にし、リダイレクトはファイルに出力する" },
      { label: "C", text: "両者は同じ機能である" },
      { label: "D", text: "パイプはエラー出力のみ、リダイレクトは標準出力のみ扱う" },
    ],
    correctLabel: "B",
    explanation:
      "パイプ（|）はコマンドの標準出力を次のコマンドの標準入力に接続します。リダイレクト（>）は標準出力をファイルに書き込みます。>>は追記、2>はエラー出力のリダイレクトです。これらを組み合わせてデータ処理パイプラインを構築します。",
    code: "# パイプ: grepの結果をwcに渡す\ncat access.log | grep 'ERROR' | wc -l\n\n# リダイレクト: 結果をファイルに書き込む\ngrep 'ERROR' access.log > errors.txt",
    level: "basics",
    chapter: "linux-basics",
  },
  {
    id: "linux-basics-q04",
    question: "grepコマンドでディレクトリ内のファイルを再帰的に検索するオプションはどれですか？",
    choices: [
      { label: "A", text: "-i" },
      { label: "B", text: "-v" },
      { label: "C", text: "-r" },
      { label: "D", text: "-c" },
    ],
    correctLabel: "C",
    explanation:
      "-rオプションはディレクトリを再帰的に検索します。-iは大文字小文字を無視、-vはマッチしない行を表示、-cはマッチ数をカウントします。実務では grep -rn 'pattern' . のように-nで行番号を表示するのが便利です。",
    level: "basics",
    chapter: "linux-basics",
  },
  {
    id: "linux-basics-q05",
    question: "テキスト処理でawkコマンドの基本的な使い方として正しいものはどれですか？",
    choices: [
      { label: "A", text: "ファイルの圧縮に使用する" },
      { label: "B", text: "テキストをフィールド（列）単位で処理する" },
      { label: "C", text: "ファイルの暗号化に使用する" },
      { label: "D", text: "ディレクトリの作成に使用する" },
    ],
    correctLabel: "B",
    explanation:
      "awkはテキストをフィールド（列）単位で処理する強力なコマンドです。デフォルトの区切り文字は空白/タブです。$1は1番目のフィールド、$NFは最後のフィールドを表します。ログ解析やCSVデータの加工で頻繁に使用されます。",
    code: "# アクセスログからIPアドレス（1列目）を抽出\nawk '{print $1}' access.log | sort | uniq -c | sort -rn",
    level: "basics",
    chapter: "linux-basics",
  },
  // ════════════════════════════════════════
  // system: システム管理 (linux-system) 5問
  // ════════════════════════════════════════
  {
    id: "linux-system-q01",
    question: "プロセスのCPU・メモリ使用率をリアルタイムに確認するコマンドとして最も適切なものはどれですか？",
    choices: [
      { label: "A", text: "ls -la" },
      { label: "B", text: "top または htop" },
      { label: "C", text: "df -h" },
      { label: "D", text: "free -m" },
    ],
    correctLabel: "B",
    explanation:
      "topは各プロセスのCPU使用率、メモリ使用率、実行時間などをリアルタイムに表示します。htopはtopの拡張版でカラー表示やマウス操作に対応しています。df -hはディスク使用量、free -mはメモリの合計・使用量を確認するコマンドです。",
    level: "system",
    chapter: "linux-system",
  },
  {
    id: "linux-system-q02",
    question: "Javaプロセスのスレッドダンプを取得するコマンドとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "kill -9 <PID>" },
      { label: "B", text: "jstack <PID> または kill -3 <PID>" },
      { label: "C", text: "jmap <PID>" },
      { label: "D", text: "ps aux | grep java" },
    ],
    correctLabel: "B",
    explanation:
      "jstackはJavaプロセスのスレッドダンプ（全スレッドのスタックトレース）を出力します。kill -3（SIGQUIT）でもスレッドダンプを標準出力に出力できます。デッドロックや高CPU使用率の原因調査に使います。kill -9はプロセスを強制終了するので要注意です。",
    level: "system",
    chapter: "linux-system",
  },
  {
    id: "linux-system-q03",
    question: "systemctlでサービスの自動起動を有効にするコマンドはどれですか？",
    choices: [
      { label: "A", text: "systemctl start myapp" },
      { label: "B", text: "systemctl enable myapp" },
      { label: "C", text: "systemctl restart myapp" },
      { label: "D", text: "systemctl status myapp" },
    ],
    correctLabel: "B",
    explanation:
      "systemctl enableはサービスのOS起動時の自動起動を有効にします。startは即座にサービスを開始しますが自動起動設定はしません。両方を同時に行うにはsystemctl enable --now myappが便利です。disableで自動起動を無効化できます。",
    level: "system",
    chapter: "linux-system",
  },
  {
    id: "linux-system-q04",
    question: "ディスク使用量を確認するコマンドでduとdfの違いとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "duはファイルシステム全体の使用量、dfは個別のファイル・ディレクトリのサイズ" },
      { label: "B", text: "dfはファイルシステム全体の使用量、duは個別のファイル・ディレクトリのサイズ" },
      { label: "C", text: "両者は同じ情報を表示する" },
      { label: "D", text: "duはメモリ使用量を表示する" },
    ],
    correctLabel: "B",
    explanation:
      "df（disk free）はマウントされたファイルシステムごとの全体的な使用量・空き容量を表示します。du（disk usage）は指定したディレクトリやファイルの使用サイズを表示します。df -hで人間が読みやすい単位、du -sh *で各項目のサイズを確認できます。",
    level: "system",
    chapter: "linux-system",
  },
  {
    id: "linux-system-q05",
    question: "cronでJavaのバッチ処理を毎日午前3時に実行する設定として正しいものはどれですか？",
    choices: [
      { label: "A", text: "3 0 * * * java -jar /opt/batch/app.jar" },
      { label: "B", text: "0 3 * * * java -jar /opt/batch/app.jar" },
      { label: "C", text: "* 3 * * * java -jar /opt/batch/app.jar" },
      { label: "D", text: "3 * * * * java -jar /opt/batch/app.jar" },
    ],
    correctLabel: "B",
    explanation:
      "cron式は「分 時 日 月 曜日」の順です。0 3 * * *は毎日3時0分を意味します。* 3 * * *は3時台の毎分（60回実行）になるので注意が必要です。cronの設定はcrontab -eで編集し、crontab -lで確認できます。",
    level: "system",
    chapter: "linux-system",
  },
  // ════════════════════════════════════════
  // devops: DevOps向けLinux (linux-devops) 5問
  // ════════════════════════════════════════
  {
    id: "linux-devops-q01",
    question: "SSH公開鍵認証でサーバーに接続するための手順として正しいものはどれですか？",
    choices: [
      { label: "A", text: "秘密鍵をサーバーに配置する" },
      { label: "B", text: "クライアントで鍵ペアを生成し、公開鍵をサーバーの~/.ssh/authorized_keysに追加する" },
      { label: "C", text: "パスワードを~/.ssh/configに記述する" },
      { label: "D", text: "サーバーとクライアントで同じ秘密鍵を共有する" },
    ],
    correctLabel: "B",
    explanation:
      "SSH公開鍵認証では、クライアント側でssh-keygenで鍵ペア（公開鍵・秘密鍵）を生成し、公開鍵をサーバーの~/.ssh/authorized_keysに追加します。秘密鍵はクライアント側で厳重に管理し、パーミッションは600に設定します。",
    level: "devops",
    chapter: "linux-devops",
  },
  {
    id: "linux-devops-q02",
    question: "Linuxでポート8080を使用しているプロセスを特定するコマンドはどれですか？",
    choices: [
      { label: "A", text: "ps aux | grep 8080" },
      { label: "B", text: "lsof -i :8080 または ss -tlnp | grep 8080" },
      { label: "C", text: "netstat 8080" },
      { label: "D", text: "port 8080" },
    ],
    correctLabel: "B",
    explanation:
      "lsof -i :8080は指定ポートを使用しているプロセスの詳細（PID、コマンド名等）を表示します。ss -tlnpはListenしているTCPポートとプロセスを一覧表示し、grepで絞り込めます。Spring Bootのデフォルトポート8080の競合調査でよく使います。",
    level: "devops",
    chapter: "linux-devops",
  },
  {
    id: "linux-devops-q03",
    question: "環境変数を永続的に設定するファイルとして最も適切なものはどれですか？",
    choices: [
      { label: "A", text: "/etc/passwd" },
      { label: "B", text: "~/.bashrc または /etc/environment" },
      { label: "C", text: "/etc/hosts" },
      { label: "D", text: "/var/log/syslog" },
    ],
    correctLabel: "B",
    explanation:
      "~/.bashrcはユーザー固有の環境変数設定で、ログインシェル起動時に読み込まれます。/etc/environmentはシステム全体の環境変数です。JAVA_HOMEやPATHの設定でよく使われます。exportコマンドだけでは現在のセッション限りです。",
    code: "# ~/.bashrc に追加\nexport JAVA_HOME=/usr/lib/jvm/java-21\nexport PATH=\\$JAVA_HOME/bin:\\$PATH",
    level: "devops",
    chapter: "linux-devops",
  },
  {
    id: "linux-devops-q04",
    question: "Javaアプリケーションをバックグラウンドで実行し、ターミナルを閉じても動作し続けるコマンドとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "java -jar app.jar &" },
      { label: "B", text: "nohup java -jar app.jar > app.log 2>&1 &" },
      { label: "C", text: "java -jar app.jar --background" },
      { label: "D", text: "bg java -jar app.jar" },
    ],
    correctLabel: "B",
    explanation:
      "nohupはHUPシグナル（ターミナル切断）を無視してプロセスを実行します。> app.log 2>&1で標準出力とエラー出力をファイルにリダイレクトし、&でバックグラウンド実行します。本番環境ではsystemdサービスとして管理するのが推奨です。",
    level: "devops",
    chapter: "linux-devops",
  },
  {
    id: "linux-devops-q05",
    question: "Linuxのログ管理でjournalctlの用途として正しいものはどれですか？",
    choices: [
      { label: "A", text: "ファイルの圧縮・アーカイブ" },
      { label: "B", text: "systemdが管理するサービスのログを表示・検索する" },
      { label: "C", text: "ネットワークの設定を行う" },
      { label: "D", text: "ユーザーの管理を行う" },
    ],
    correctLabel: "B",
    explanation:
      "journalctlはsystemdのジャーナルログを表示・検索するコマンドです。-u myappでサービス指定、-fでリアルタイム追跡、--since '1 hour ago'で時間指定ができます。Javaアプリケーションの障害調査で頻繁に使用します。",
    code: "# 特定サービスのログをリアルタイム表示\njournalctl -u myapp.service -f\n\n# 直近1時間のエラーのみ表示\njournalctl -u myapp.service --since '1 hour ago' -p err",
    level: "devops",
    chapter: "linux-devops",
  },
];
