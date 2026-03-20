"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { CodeBlock } from "@/components/code-block";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileCode2 } from "lucide-react";

interface CheatItem {
  title: string;
  code: string;
  language?: string;
}

interface CheatSheet {
  id: string;
  name: string;
  color: string;
  items: CheatItem[];
}

const cheatSheets: CheatSheet[] = [
  {
    id: "java-syntax",
    name: "Java 構文",
    color: "#2563EB",
    items: [
      {
        title: "変数と型",
        code: `// プリミティブ型
int i = 42;          long l = 42L;
double d = 3.14;     float f = 3.14f;
boolean b = true;    char c = 'A';
byte by = 127;       short s = 32767;

// 参照型
String str = "Hello";
var list = List.of(1, 2, 3);   // Java 10+
var map = Map.of("a", 1);      // Java 9+

// 配列
int[] arr = {1, 2, 3};
String[][] matrix = new String[3][3];`,
      },
      {
        title: "制御構文",
        code: `// if-else
if (x > 0) { } else if (x == 0) { } else { }

// switch式 (Java 14+)
String result = switch (day) {
    case MONDAY, FRIDAY -> "Work";
    case SATURDAY, SUNDAY -> "Rest";
    default -> "Other";
};

// for / for-each / while
for (int i = 0; i < 10; i++) { }
for (var item : list) { }
while (condition) { }

// try-with-resources
try (var reader = new BufferedReader(new FileReader("f"))) {
    reader.lines().forEach(System.out::println);
} catch (IOException e) {
    e.printStackTrace();
}`,
      },
      {
        title: "Stream API",
        code: `List<String> names = List.of("Alice", "Bob", "Charlie", "Dave");

// フィルタ・変換・集約
List<String> result = names.stream()
    .filter(n -> n.length() > 3)
    .map(String::toUpperCase)
    .sorted()
    .toList();  // Java 16+

// 集約
int total = IntStream.rangeClosed(1, 100).sum();
long count = names.stream().filter(n -> n.startsWith("A")).count();
Optional<String> first = names.stream().findFirst();

// グルーピング
Map<Integer, List<String>> byLength =
    names.stream().collect(Collectors.groupingBy(String::length));

// 並列ストリーム
names.parallelStream().forEach(System.out::println);`,
      },
      {
        title: "レコード・Sealed・パターンマッチング",
        code: `// Record (Java 16+)
record Point(int x, int y) {
    Point { if (x < 0 || y < 0) throw new IllegalArgumentException(); }
}

// Sealed Class (Java 17+)
sealed interface Shape permits Circle, Rectangle { }
record Circle(double radius) implements Shape { }
record Rectangle(double w, double h) implements Shape { }

// パターンマッチング (Java 21+)
String describe(Shape shape) {
    return switch (shape) {
        case Circle(var r) when r > 10 -> "Big circle: " + r;
        case Circle(var r) -> "Circle: " + r;
        case Rectangle(var w, var h) -> "Rect: " + w + "x" + h;
    };
}`,
      },
    ],
  },
  {
    id: "spring-boot",
    name: "Spring Boot",
    color: "#059669",
    items: [
      {
        title: "主要アノテーション",
        code: `// --- アプリケーション ---
@SpringBootApplication       // メインクラス (@Configuration + @EnableAutoConfiguration + @ComponentScan)
@RestController              // REST コントローラ (@Controller + @ResponseBody)
@Service                     // ビジネスロジック層
@Repository                  // データアクセス層
@Component                   // 汎用 Bean

// --- DI ---
@Autowired                   // 依存注入 (コンストラクタ推奨)
@Qualifier("beanName")       // 複数候補から特定 Bean を選択
@Value("\${app.name}")        // プロパティ値の注入
@ConfigurationProperties     // プロパティをクラスにバインド

// --- Web ---
@GetMapping("/api/users")    // GET
@PostMapping("/api/users")   // POST
@PutMapping("/api/users/{id}")  // PUT
@DeleteMapping("/api/users/{id}")  // DELETE
@PathVariable                // パス変数
@RequestBody                 // リクエストボディ
@RequestParam                // クエリパラメータ
@Valid                       // バリデーション有効化

// --- JPA ---
@Entity                      // エンティティクラス
@Table(name = "users")       // テーブル名指定
@Id @GeneratedValue          // 主キー自動生成
@Column(nullable = false)    // カラム制約
@OneToMany / @ManyToOne      // リレーション
@Transactional               // トランザクション管理`,
      },
      {
        title: "application.yml 設定",
        code: `# application.yml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/mydb
    username: user
    password: pass
  jpa:
    hibernate:
      ddl-auto: update         # none / validate / update / create-drop
    show-sql: true
    properties:
      hibernate.format_sql: true

  # ログ
logging:
  level:
    root: INFO
    com.example: DEBUG
    org.springframework.web: DEBUG`,
        language: "yaml",
      },
    ],
  },
  {
    id: "git",
    name: "Git コマンド",
    color: "#D24939",
    items: [
      {
        title: "基本操作",
        code: `# 初期化・クローン
git init
git clone <url>

# 変更の確認・ステージング
git status
git diff                        # 差分確認
git add <file>                  # ステージング
git add -A                      # 全変更をステージング

# コミット
git commit -m "メッセージ"
git commit --amend              # 直前のコミット修正

# プッシュ・プル
git push origin main
git pull origin main
git fetch origin                # リモート情報取得のみ`,
        language: "bash",
      },
      {
        title: "ブランチ・マージ",
        code: `# ブランチ操作
git branch                      # 一覧表示
git branch feature/login        # 作成
git checkout -b feature/login   # 作成 + 切替
git switch -c feature/login     # 作成 + 切替 (新構文)

# マージ・リベース
git merge feature/login         # マージ
git rebase main                 # リベース

# スタッシュ
git stash                       # 一時退避
git stash pop                   # 復元
git stash list                  # 一覧

# ログ
git log --oneline --graph -20   # グラフ表示
git blame <file>                # 行ごとの変更者

# リセット (注意!)
git reset --soft HEAD~1         # コミットのみ取消
git reset --mixed HEAD~1        # ステージングも取消
git restore <file>              # 変更を破棄`,
        language: "bash",
      },
    ],
  },
  {
    id: "sql",
    name: "SQL",
    color: "#D97706",
    items: [
      {
        title: "SELECT / JOIN / 集約",
        code: `-- SELECT 基本
SELECT name, age FROM users WHERE age >= 20 ORDER BY name LIMIT 10;

-- JOIN
SELECT u.name, o.total
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.total > 1000;

-- LEFT JOIN (左外部結合)
SELECT u.name, COUNT(o.id) AS order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.name;

-- 集約関数
SELECT department, COUNT(*) AS cnt, AVG(salary) AS avg_salary
FROM employees
GROUP BY department
HAVING COUNT(*) >= 5
ORDER BY avg_salary DESC;`,
        language: "sql",
      },
      {
        title: "サブクエリ / ウィンドウ関数 / CTE",
        code: `-- サブクエリ (EXISTS)
SELECT * FROM users u
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);

-- CTE (WITH句)
WITH monthly_sales AS (
    SELECT DATE_TRUNC('month', order_date) AS month, SUM(total) AS total
    FROM orders GROUP BY 1
)
SELECT month, total, LAG(total) OVER (ORDER BY month) AS prev_month
FROM monthly_sales;

-- ウィンドウ関数
SELECT name, department, salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS rank,
    SUM(salary) OVER (PARTITION BY department) AS dept_total
FROM employees;

-- UPSERT (PostgreSQL)
INSERT INTO users (email, name) VALUES ('a@b.com', 'Alice')
ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name;`,
        language: "sql",
      },
    ],
  },
  {
    id: "linux",
    name: "Linux コマンド",
    color: "#059669",
    items: [
      {
        title: "ファイル・テキスト処理",
        code: `# ファイル操作
ls -la                    # 詳細表示
find . -name "*.java"     # ファイル検索
cp -r src/ backup/        # 再帰コピー

# テキスト処理
grep -rn "TODO" src/      # 再帰検索 + 行番号
grep -i "error" app.log | wc -l  # エラー数カウント
sed 's/old/new/g' file    # 置換
awk '{print $1, $3}' data # 列抽出
sort file | uniq -c | sort -rn  # 頻度順ソート
head -20 / tail -f app.log      # 先頭20行 / リアルタイム追跡

# パイプ・リダイレクト
cat access.log | grep "500" | awk '{print $1}' | sort | uniq -c | sort -rn
command > out.txt 2>&1    # stdout+stderr をファイルに
command | tee output.txt  # 画面とファイルに同時出力`,
        language: "bash",
      },
      {
        title: "プロセス・ネットワーク・権限",
        code: `# プロセス管理
ps aux | grep java        # Javaプロセス検索
top -p $(pgrep -d',' java)  # Java監視
kill -9 <PID>             # 強制終了
nohup java -jar app.jar & # バックグラウンド実行

# ネットワーク
curl -X POST -H "Content-Type: application/json" -d '{"name":"test"}' http://localhost:8080/api
ss -tlnp                  # ポートリスニング確認
ssh user@host             # リモート接続

# 権限
chmod 755 script.sh       # 実行権限付与
chown -R user:group dir/  # 所有者変更

# systemd サービス
sudo systemctl start myapp
sudo systemctl enable myapp  # 自動起動有効化
journalctl -u myapp -f       # ログ追跡`,
        language: "bash",
      },
    ],
  },
  {
    id: "docker",
    name: "Docker",
    color: "#2563EB",
    items: [
      {
        title: "Dockerfile & コマンド",
        code: `# --- マルチステージビルド ---
FROM eclipse-temurin:21-jdk AS build
WORKDIR /app
COPY . .
RUN ./gradlew bootJar --no-daemon

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

# --- 主要コマンド ---
# docker build -t myapp:latest .
# docker run -d -p 8080:8080 --name myapp myapp:latest
# docker logs -f myapp
# docker exec -it myapp /bin/sh
# docker stop myapp && docker rm myapp

# --- Docker Compose ---
# docker compose up -d
# docker compose logs -f
# docker compose down`,
        language: "dockerfile",
      },
      {
        title: "docker-compose.yml 例",
        code: `services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/mydb
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16
    environment:
      POSTGRES_DB: mydb
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d mydb"]
      interval: 5s
      retries: 5

volumes:
  pgdata:`,
        language: "yaml",
      },
    ],
  },
];

export default function CheatSheetClientPage() {
  const [activeSheet, setActiveSheet] = useState(cheatSheets[0].id);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <div className="inline-flex items-center gap-2 mb-4">
          <FileCode2 className="h-8 w-8 text-[#2563EB]" />
          <h1 className="text-3xl md:text-4xl font-bold">
            チートシート<span className="text-[#2563EB]">早見表</span>
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Java構文、Spring Boot、Git、SQL、Linux、Dockerの早見表を一覧で確認
        </p>
      </motion.div>

      <Tabs value={activeSheet} onValueChange={setActiveSheet}>
        <TabsList className="flex flex-wrap justify-center mb-8 h-auto gap-1 bg-transparent">
          {cheatSheets.map((sheet) => (
            <TabsTrigger
              key={sheet.id}
              value={sheet.id}
              className="rounded-full data-[state=active]:text-white"
              style={{
                ...(activeSheet === sheet.id
                  ? { backgroundColor: sheet.color, color: "white" }
                  : {}),
              }}
            >
              {sheet.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {cheatSheets.map((sheet) => (
          <TabsContent key={sheet.id} value={sheet.id}>
            <div className="space-y-6">
              {sheet.items.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="outline"
                          style={{ borderColor: sheet.color, color: sheet.color }}
                        >
                          {sheet.name}
                        </Badge>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CodeBlock
                        code={item.code}
                        language={item.language || "java"}
                      />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
