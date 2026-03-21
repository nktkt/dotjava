export interface RedisSection {
  title: string;
  content: string;
  code?: string;
}

export interface RedisChapter {
  id: string;
  title: string;
  description: string;
  category: string;
  sections: RedisSection[];
}

export interface RedisCategory {
  id: string;
  name: string;
  color: string;
}

export const redisCategories: RedisCategory[] = [
  { id: "basics", name: "Redis基礎", color: "#DC2626" },
  { id: "spring", name: "Spring Boot連携", color: "#059669" },
  { id: "advanced", name: "応用・運用", color: "#2563EB" },
];

export const redisChapters: RedisChapter[] = [
  // ===== Redis基礎 =====
  {
    id: "redis-intro",
    title: "Redisの概要とインストール",
    description:
      "Redisの特徴（インメモリ・キーバリュー型データストア）、インストール方法とDocker起動、redis-cliの基本操作、データ永続化（RDB/AOF）を学ぶ",
    category: "basics",
    sections: [
      {
        title: "Redisの特徴（インメモリ/キーバリュー）",
        content:
          "Redis（Remote Dictionary Server）は、オープンソースのインメモリデータストアです。すべてのデータをメモリ上に保持するため、ディスクベースのデータベースと比較して圧倒的な読み書き速度を実現します。キーバリュー型のデータモデルを基本としながら、String・List・Set・Hash・Sorted Setなど豊富なデータ型をサポートし、キャッシュ、セッション管理、リアルタイムランキング、メッセージキューなど多様な用途に利用されます。シングルスレッドモデルにより、アトミックな操作が保証されるのも大きな特徴です。",
        code: `// Redisの主な特徴
// ┌─────────────────────────────────────────────┐
// │            Redis の特徴                      │
// ├─────────────────────────────────────────────┤
// │ 1. インメモリ     → 超高速（10万+ ops/sec）   │
// │ 2. キーバリュー型  → シンプルなデータモデル     │
// │ 3. 豊富なデータ型  → String/List/Set/Hash等    │
// │ 4. シングルスレッド → アトミック操作保証        │
// │ 5. 永続化対応     → RDB / AOF               │
// │ 6. レプリケーション → 高可用性                 │
// │ 7. Pub/Sub       → メッセージング             │
// └─────────────────────────────────────────────┘

// Redisの代表的なユースケース
// - キャッシュ（DBクエリ結果、API応答）
// - セッション管理（Spring Session + Redis）
// - リアルタイムランキング（Sorted Set）
// - レートリミッター（スライディングウィンドウ）
// - メッセージキュー（Pub/Sub, Streams）
// - 分散ロック（Redisson）`,
      },
      {
        title: "インストールとDocker起動",
        content:
          "Redisの導入方法はいくつかありますが、開発環境ではDockerを使用するのが最も手軽です。docker runコマンド一つでRedisサーバーを起動でき、docker-compose.ymlを使えばアプリケーションと一緒に管理できます。本番環境ではOS直接インストールやマネージドサービス（Amazon ElastiCache、Azure Cache for Redis等）の利用も検討しましょう。",
        code: `# === Dockerを使ったRedis起動 ===

# 基本的な起動
$ docker run -d --name my-redis -p 6379:6379 redis:7-alpine

# パスワード付きで起動
$ docker run -d --name my-redis \\
  -p 6379:6379 \\
  redis:7-alpine --requirepass mypassword

# データを永続化する場合（ボリュームマウント）
$ docker run -d --name my-redis \\
  -p 6379:6379 \\
  -v redis-data:/data \\
  redis:7-alpine --appendonly yes

# === docker-compose.yml ===
# version: '3.8'
# services:
#   redis:
#     image: redis:7-alpine
#     ports:
#       - "6379:6379"
#     volumes:
#       - redis-data:/data
#     command: redis-server --appendonly yes --requirepass mypassword
#   app:
#     build: .
#     depends_on:
#       - redis
#     environment:
#       SPRING_DATA_REDIS_HOST: redis
#       SPRING_DATA_REDIS_PORT: 6379
#       SPRING_DATA_REDIS_PASSWORD: mypassword
# volumes:
#   redis-data:

# Docker Composeで起動
$ docker-compose up -d

# Redisコンテナのログ確認
$ docker logs my-redis`,
      },
      {
        title: "redis-cliの基本操作",
        content:
          "redis-cliはRedisに同梱されるコマンドラインクライアントで、Redisサーバーとの対話的な操作が可能です。Dockerコンテナ内のredis-cliに接続して、キーの設定・取得、一覧表示、削除、有効期限の設定といった基本的な操作を習得しましょう。これらのコマンドはRedisを理解する土台となります。",
        code: `# Dockerコンテナ内のredis-cliに接続
$ docker exec -it my-redis redis-cli

# パスワード認証が必要な場合
$ docker exec -it my-redis redis-cli -a mypassword

# === 基本的なコマンド ===

# 接続確認
127.0.0.1:6379> PING
PONG

# キーに値を設定
127.0.0.1:6379> SET greeting "Hello, Redis!"
OK

# キーの値を取得
127.0.0.1:6379> GET greeting
"Hello, Redis!"

# 有効期限付きで設定（60秒）
127.0.0.1:6379> SET session:abc123 "user-data" EX 60
OK

# 残りの有効期限を確認（秒）
127.0.0.1:6379> TTL session:abc123
(integer) 57

# キーの存在確認
127.0.0.1:6379> EXISTS greeting
(integer) 1

# キーの削除
127.0.0.1:6379> DEL greeting
(integer) 1

# パターンに一致するキーを検索
127.0.0.1:6379> KEYS session:*
1) "session:abc123"

# すべてのキーを表示（本番では SCAN を使用）
127.0.0.1:6379> KEYS *
1) "session:abc123"

# キーの型を確認
127.0.0.1:6379> TYPE session:abc123
string

# データベースの全キー数
127.0.0.1:6379> DBSIZE
(integer) 1

# サーバー情報の確認
127.0.0.1:6379> INFO server`,
      },
      {
        title: "データ永続化（RDB/AOF）",
        content:
          "Redisはインメモリデータベースですが、再起動時にデータが失われないよう2つの永続化方式を提供します。RDB（Redis Database）はスナップショット方式で、指定間隔でメモリ全体をディスクに保存します。AOF（Append Only File）はすべての書き込みコマンドをログファイルに追記する方式です。それぞれのメリット・デメリットを理解し、用途に応じて選択しましょう。RDBとAOFの両方を有効にすることも可能です。",
        code: `# === RDB（スナップショット）設定 ===
# redis.conf での設定例
# 900秒(15分)間に1回以上の変更があればスナップショット
# save 900 1
# 300秒(5分)間に10回以上の変更があればスナップショット
# save 300 10
# 60秒間に10000回以上の変更があればスナップショット
# save 60 10000

# 手動でRDBスナップショットを作成
127.0.0.1:6379> BGSAVE
Background saving started

# 最後のスナップショット時刻を確認
127.0.0.1:6379> LASTSAVE
(integer) 1700000000

# === AOF（Append Only File）設定 ===
# redis.conf での設定例
# appendonly yes
# appendfsync everysec   ← 推奨（1秒ごとにfsync）
# appendfsync always     ← 毎回fsync（安全だが遅い）
# appendfsync no         ← OSに任せる（高速だがリスクあり）

# AOFの手動書き込み
127.0.0.1:6379> BGREWRITEAOF
Background append only file rewriting started

# === 永続化方式の比較 ===
# ┌──────────┬──────────────────┬──────────────────┐
# │          │      RDB         │      AOF         │
# ├──────────┼──────────────────┼──────────────────┤
# │ 方式     │ スナップショット   │ コマンドログ      │
# │ 復旧速度  │ 高速             │ やや遅い          │
# │ データ損失│ 間隔分のデータ     │ 最大1秒分         │
# │ ファイル  │ コンパクト        │ 大きくなりやすい   │
# │ 適用場面  │ バックアップ      │ データ保全重視     │
# └──────────┴──────────────────┴──────────────────┘

# Docker起動時にAOFを有効化
# docker run -d --name my-redis \\
#   -v redis-data:/data \\
#   redis:7-alpine --appendonly yes

# 永続化情報の確認
127.0.0.1:6379> INFO persistence`,
      },
    ],
  },
  {
    id: "data-types",
    title: "Redisのデータ型",
    description:
      "RedisがサポートするString型、List型、Set/Sorted Set型、Hash型の操作方法と活用パターンを学ぶ",
    category: "basics",
    sections: [
      {
        title: "String型",
        content:
          "String型はRedisの最も基本的なデータ型で、テキスト、数値、バイナリデータ（最大512MB）を格納できます。SET/GETによる単純な読み書きに加え、INCR/DECRによるアトミックなカウンタ操作、MSET/MGETによる複数キーの一括操作、SETNX（SET if Not eXists）による排他制御にも利用されます。キャッシュやセッション管理に頻繁に使われるデータ型です。",
        code: `# === String型の基本操作 ===

# 値の設定と取得
127.0.0.1:6379> SET user:1:name "田中太郎"
OK
127.0.0.1:6379> GET user:1:name
"田中太郎"

# 数値のインクリメント / デクリメント（アトミック操作）
127.0.0.1:6379> SET page:views 0
OK
127.0.0.1:6379> INCR page:views
(integer) 1
127.0.0.1:6379> INCR page:views
(integer) 2
127.0.0.1:6379> INCRBY page:views 10
(integer) 12
127.0.0.1:6379> DECR page:views
(integer) 11

# 複数キーの一括操作
127.0.0.1:6379> MSET user:1:name "田中" user:1:email "tanaka@example.com"
OK
127.0.0.1:6379> MGET user:1:name user:1:email
1) "田中"
2) "tanaka@example.com"

# キーが存在しない場合のみ設定（分散ロックの基礎）
127.0.0.1:6379> SETNX lock:resource1 "holder-1"
(integer) 1    ← 成功（キーが存在しなかった）
127.0.0.1:6379> SETNX lock:resource1 "holder-2"
(integer) 0    ← 失敗（キーが既に存在）

# 有効期限付きSET（EX=秒, PX=ミリ秒）
127.0.0.1:6379> SET cache:product:1 "{\\"name\\":\\"商品A\\",\\"price\\":1000}" EX 3600
OK

# 値の長さを取得
127.0.0.1:6379> STRLEN user:1:name
(integer) 6

# 文字列の追記
127.0.0.1:6379> APPEND user:1:name "様"
(integer) 9
127.0.0.1:6379> GET user:1:name
"田中様"`,
      },
      {
        title: "List型",
        content:
          "List型は順序付きの文字列リストで、リンクリストとして実装されています。先頭・末尾への要素追加がO(1)で高速なため、キューやスタックとして利用できます。LPUSH/RPUSHで要素を追加し、LPOP/RPOPで取り出します。BLPOPを使えばブロッキングキュー（メッセージキュー）としても機能し、タスクキューやタイムライン（最新N件の管理）に適しています。",
        code: `# === List型の基本操作 ===

# 左側（先頭）に要素を追加
127.0.0.1:6379> LPUSH queue:tasks "task1"
(integer) 1
127.0.0.1:6379> LPUSH queue:tasks "task2" "task3"
(integer) 3

# 右側（末尾）に要素を追加
127.0.0.1:6379> RPUSH queue:tasks "task4"
(integer) 4

# リストの内容を確認（0から-1で全件）
127.0.0.1:6379> LRANGE queue:tasks 0 -1
1) "task3"
2) "task2"
3) "task1"
4) "task4"

# リストの長さを取得
127.0.0.1:6379> LLEN queue:tasks
(integer) 4

# 先頭から要素を取り出し（キューとして使用）
127.0.0.1:6379> LPOP queue:tasks
"task3"

# 末尾から要素を取り出し（スタックとして使用）
127.0.0.1:6379> RPOP queue:tasks
"task4"

# インデックスで要素を取得
127.0.0.1:6379> LINDEX queue:tasks 0
"task2"

# === ブロッキングキュー ===
# 要素が来るまで最大30秒待機
127.0.0.1:6379> BLPOP queue:tasks 30
1) "queue:tasks"
2) "task2"

# === タイムラインの実装例 ===
# 最新の投稿を追加
127.0.0.1:6379> LPUSH timeline:user1 "post:100"
127.0.0.1:6379> LPUSH timeline:user1 "post:101"
127.0.0.1:6379> LPUSH timeline:user1 "post:102"

# 最新3件を取得
127.0.0.1:6379> LRANGE timeline:user1 0 2
1) "post:102"
2) "post:101"
3) "post:100"

# リストを最新100件に制限（古いデータを自動削除）
127.0.0.1:6379> LTRIM timeline:user1 0 99
OK`,
      },
      {
        title: "Set/Sorted Set型",
        content:
          "Set型は重複を許さない文字列の集合で、要素の追加・削除・存在確認がO(1)で行えます。和集合・積集合・差集合といった集合演算もサポートし、タグ管理やユニークユーザーの追跡に適しています。Sorted Set（ZSet）はスコア付きのSetで、スコアによる自動ソートが行われます。リアルタイムランキングやスケジューリングに最適なデータ型です。",
        code: `# === Set型の基本操作 ===

# 要素の追加
127.0.0.1:6379> SADD tags:article:1 "Java" "Spring" "Redis"
(integer) 3
127.0.0.1:6379> SADD tags:article:2 "Java" "Docker" "Redis"
(integer) 3

# 全要素を取得
127.0.0.1:6379> SMEMBERS tags:article:1
1) "Java"
2) "Spring"
3) "Redis"

# 要素の存在確認
127.0.0.1:6379> SISMEMBER tags:article:1 "Java"
(integer) 1

# 要素数を取得
127.0.0.1:6379> SCARD tags:article:1
(integer) 3

# 集合演算
127.0.0.1:6379> SINTER tags:article:1 tags:article:2    # 積集合
1) "Java"
2) "Redis"
127.0.0.1:6379> SUNION tags:article:1 tags:article:2    # 和集合
1) "Java"
2) "Spring"
3) "Redis"
4) "Docker"
127.0.0.1:6379> SDIFF tags:article:1 tags:article:2     # 差集合
1) "Spring"

# === Sorted Set（ZSet）型の基本操作 ===

# スコア付きで要素を追加（ランキングの例）
127.0.0.1:6379> ZADD ranking:game 1500 "player:A"
(integer) 1
127.0.0.1:6379> ZADD ranking:game 2300 "player:B"
(integer) 1
127.0.0.1:6379> ZADD ranking:game 1800 "player:C"
(integer) 1
127.0.0.1:6379> ZADD ranking:game 3100 "player:D"
(integer) 1

# スコア降順で上位3名を取得（WITHSCORES付き）
127.0.0.1:6379> ZREVRANGE ranking:game 0 2 WITHSCORES
1) "player:D"
2) "3100"
3) "player:B"
4) "2300"
5) "player:C"
6) "1800"

# 特定メンバーの順位を取得（0始まり、降順）
127.0.0.1:6379> ZREVRANK ranking:game "player:B"
(integer) 1

# スコアの加算（インクリメント）
127.0.0.1:6379> ZINCRBY ranking:game 500 "player:A"
"2000"

# スコア範囲で検索
127.0.0.1:6379> ZRANGEBYSCORE ranking:game 2000 3500
1) "player:A"
2) "player:B"
3) "player:D"`,
      },
      {
        title: "Hash型",
        content:
          "Hash型はフィールドと値のペアを持つデータ型で、オブジェクトやレコードの表現に最適です。個々のフィールドを独立して読み書きできるため、ユーザープロフィールや設定情報など構造化データの格納に向いています。String型でJSONを保存する場合と比較して、一部のフィールドだけを更新・取得できる利点があり、メモリ効率も良好です。",
        code: `# === Hash型の基本操作 ===

# フィールドと値を設定
127.0.0.1:6379> HSET user:1001 name "佐藤花子" email "sato@example.com" age "28"
(integer) 3

# 特定フィールドの値を取得
127.0.0.1:6379> HGET user:1001 name
"佐藤花子"

# 複数フィールドを一括取得
127.0.0.1:6379> HMGET user:1001 name email
1) "佐藤花子"
2) "sato@example.com"

# すべてのフィールドと値を取得
127.0.0.1:6379> HGETALL user:1001
1) "name"
2) "佐藤花子"
3) "email"
4) "sato@example.com"
5) "age"
6) "28"

# フィールドの存在確認
127.0.0.1:6379> HEXISTS user:1001 email
(integer) 1

# フィールドの削除
127.0.0.1:6379> HDEL user:1001 age
(integer) 1

# フィールド数を取得
127.0.0.1:6379> HLEN user:1001
(integer) 2

# 数値フィールドのインクリメント
127.0.0.1:6379> HSET product:1 name "ノートPC" price 89800 stock 50
(integer) 3
127.0.0.1:6379> HINCRBY product:1 stock -1
(integer) 49
127.0.0.1:6379> HINCRBY product:1 price 1000
(integer) 90800

# すべてのフィールド名を取得
127.0.0.1:6379> HKEYS product:1
1) "name"
2) "price"
3) "stock"

# すべての値を取得
127.0.0.1:6379> HVALS product:1
1) "ノートPC"
2) "90800"
3) "49"

# === String型との比較 ===
# String型: JSON全体を保存
# SET user:1001 '{"name":"佐藤","email":"sato@example.com"}'
# → 1フィールドの更新でもJSON全体を読み書き
#
# Hash型: フィールド単位で操作
# HSET user:1001 name "佐藤"
# HGET user:1001 email
# → 必要なフィールドだけ効率的に操作`,
      },
    ],
  },

  // ===== Spring Boot連携 =====
  {
    id: "spring-data-redis",
    title: "Spring Data Redis",
    description:
      "Spring BootアプリケーションからRedisを操作するためのSpring Data Redisの設定方法、RedisTemplateの使い方、キャッシュアノテーション、シリアライゼーション設定を学ぶ",
    category: "spring",
    sections: [
      {
        title: "依存関係と設定",
        content:
          "Spring Data Redisを使用するには、spring-boot-starter-data-redisを依存関係に追加し、application.ymlでRedis接続情報を設定します。内部ではデフォルトでLettuceクライアントが使用されます。Lettuceはノンブロッキング・スレッドセーフなクライアントで、コネクションプールの設定も可能です。Jedisクライアントに切り替えることもできますが、Lettuceが推奨されています。",
        code: `// === build.gradle（依存関係の追加） ===
// dependencies {
//     implementation 'org.springframework.boot:spring-boot-starter-data-redis'
//     // コネクションプールを使用する場合
//     implementation 'org.apache.commons:commons-pool2'
// }

// === application.yml ===
// spring:
//   data:
//     redis:
//       host: localhost
//       port: 6379
//       password: mypassword
//       timeout: 2000ms
//       lettuce:
//         pool:
//           max-active: 8     # 最大コネクション数
//           max-idle: 8       # 最大アイドルコネクション数
//           min-idle: 2       # 最小アイドルコネクション数
//           max-wait: -1ms    # コネクション取得の最大待機時間

// === Redis設定クラス ===
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<String, Object> redisTemplate(
            RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory);

        // キーはString、値はJSONでシリアライズ
        template.setKeySerializer(new StringRedisSerializer());
        template.setValueSerializer(
            new GenericJackson2JsonRedisSerializer());
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setHashValueSerializer(
            new GenericJackson2JsonRedisSerializer());

        template.afterPropertiesSet();
        return template;
    }
}`,
      },
      {
        title: "RedisTemplate操作",
        content:
          "RedisTemplateはSpring Data Redisの中心的なクラスで、Redisの各データ型に対応した操作メソッドを提供します。opsForValue()でString型、opsForList()でList型、opsForSet()でSet型、opsForHash()でHash型、opsForZSet()でSorted Set型の操作が可能です。型安全な操作のために、StringRedisTemplateも利用できます。",
        code: `import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import java.time.Duration;
import java.util.List;
import java.util.Set;
import java.util.Map;

@Service
public class RedisService {

    private final RedisTemplate<String, Object> redisTemplate;

    public RedisService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    // === String型操作 ===
    public void setString(String key, Object value, Duration ttl) {
        redisTemplate.opsForValue().set(key, value, ttl);
    }

    public Object getString(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    // カウンタのインクリメント
    public Long increment(String key) {
        return redisTemplate.opsForValue().increment(key);
    }

    // === List型操作 ===
    public void addToList(String key, Object value) {
        redisTemplate.opsForList().rightPush(key, value);
    }

    public List<Object> getList(String key, long start, long end) {
        return redisTemplate.opsForList().range(key, start, end);
    }

    // === Hash型操作 ===
    public void setHash(String key, String field, Object value) {
        redisTemplate.opsForHash().put(key, field, value);
    }

    public Object getHash(String key, String field) {
        return redisTemplate.opsForHash().get(key, field);
    }

    public Map<Object, Object> getAllHash(String key) {
        return redisTemplate.opsForHash().entries(key);
    }

    // === Set型操作 ===
    public void addToSet(String key, Object... values) {
        redisTemplate.opsForSet().add(key, values);
    }

    public Set<Object> getSet(String key) {
        return redisTemplate.opsForSet().members(key);
    }

    // === 共通操作 ===
    public Boolean deleteKey(String key) {
        return redisTemplate.delete(key);
    }

    public Boolean hasKey(String key) {
        return redisTemplate.hasKey(key);
    }

    public Boolean setExpire(String key, Duration duration) {
        return redisTemplate.expire(key, duration);
    }
}`,
      },
      {
        title: "@Cacheable/@CacheEvictアノテーション",
        content:
          "Spring Cacheアブストラクションを使えば、アノテーションだけでRedisキャッシュを透過的に利用できます。@Cacheableはメソッドの戻り値をキャッシュし、次回以降はキャッシュから返却します。@CacheEvictはキャッシュを無効化し、@CachePutは常にメソッドを実行してキャッシュを更新します。これらを組み合わせることで、データの一貫性を保ちながらパフォーマンスを向上できます。",
        code: `import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

// === メインアプリケーションクラスでキャッシュを有効化 ===
// @SpringBootApplication
// @EnableCaching  ← これを追加
// public class Application { ... }

@Service
public class ProductService {

    private final ProductRepository repository;

    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    // キャッシュから取得。なければDBから取得してキャッシュに保存
    @Cacheable(value = "products", key = "#id")
    public Product findById(Long id) {
        // このメソッドはキャッシュミス時のみ実行される
        return repository.findById(id)
            .orElseThrow(() -> new ProductNotFoundException(id));
    }

    // 条件付きキャッシュ（価格が1000円以上のみキャッシュ）
    @Cacheable(value = "products", key = "#id",
               condition = "#id > 0",
               unless = "#result.price < 1000")
    public Product findByIdConditional(Long id) {
        return repository.findById(id).orElseThrow();
    }

    // 更新時はキャッシュも更新
    @CachePut(value = "products", key = "#product.id")
    public Product update(Product product) {
        return repository.save(product);
    }

    // 削除時はキャッシュを無効化
    @CacheEvict(value = "products", key = "#id")
    public void delete(Long id) {
        repository.deleteById(id);
    }

    // 全キャッシュを無効化
    @CacheEvict(value = "products", allEntries = true)
    public void clearAllCache() {
        // キャッシュクリアのみ
    }

    // 複数キャッシュ操作を組み合わせ
    @Caching(
        put = @CachePut(value = "products", key = "#product.id"),
        evict = @CacheEvict(value = "productList",
                            allEntries = true)
    )
    public Product createOrUpdate(Product product) {
        return repository.save(product);
    }
}`,
      },
      {
        title: "シリアライゼーション設定",
        content:
          "Redisにオブジェクトを保存する際のシリアライゼーション方式は、パフォーマンスやデバッグ容易性に大きく影響します。デフォルトのJDKシリアライゼーションは可読性が低くサイズも大きいため、JSON（Jackson）への変更が推奨されます。Spring Cacheを使用する場合は、RedisCacheManagerにもシリアライザーを設定する必要があります。カスタムObjectMapperの設定で日付フォーマットやnull値の扱いも制御できます。",
        code: `import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.cache.CacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Configuration
public class RedisCacheConfig {

    @Bean
    public ObjectMapper redisObjectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        // Java 8 Date/Time APIのサポート
        mapper.registerModule(new JavaTimeModule());
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        // 型情報を含める（デシリアライズ時に正しい型に復元）
        mapper.setVisibility(
            PropertyAccessor.ALL, JsonAutoDetect.Visibility.ANY);
        mapper.activateDefaultTyping(
            mapper.getPolymorphicTypeValidator(),
            ObjectMapper.DefaultTyping.NON_FINAL);
        return mapper;
    }

    @Bean
    public CacheManager cacheManager(
            RedisConnectionFactory connectionFactory) {
        // デフォルトのキャッシュ設定（TTL: 30分）
        RedisCacheConfiguration defaultConfig =
            RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofMinutes(30))
                .serializeKeysWith(
                    RedisSerializationContext
                        .SerializationPair
                        .fromSerializer(new StringRedisSerializer()))
                .serializeValuesWith(
                    RedisSerializationContext
                        .SerializationPair
                        .fromSerializer(
                            new GenericJackson2JsonRedisSerializer(
                                redisObjectMapper())))
                .disableCachingNullValues();

        // キャッシュ名ごとに異なるTTLを設定
        Map<String, RedisCacheConfiguration> cacheConfigs =
            new HashMap<>();
        cacheConfigs.put("products",
            defaultConfig.entryTtl(Duration.ofHours(1)));
        cacheConfigs.put("sessions",
            defaultConfig.entryTtl(Duration.ofMinutes(30)));
        cacheConfigs.put("rankings",
            defaultConfig.entryTtl(Duration.ofMinutes(5)));

        return RedisCacheManager.builder(connectionFactory)
            .cacheDefaults(defaultConfig)
            .withInitialCacheConfigurations(cacheConfigs)
            .transactionAware()
            .build();
    }
}

// === シリアライザーの比較 ===
// ┌────────────────────┬────────────┬──────────┬──────────┐
// │ シリアライザー       │ 可読性     │ サイズ    │ 速度     │
// ├────────────────────┼────────────┼──────────┼──────────┤
// │ JdkSerialization   │ ✕         │ 大       │ 普通     │
// │ Jackson2Json       │ ◎         │ 中       │ 速い     │
// │ GenericJackson2Json│ ○（型情報付）│ やや大   │ 速い     │
// │ StringRedisSerializer│ ◎       │ 最小     │ 最速     │
// └────────────────────┴────────────┴──────────┴──────────┘`,
      },
    ],
  },
  {
    id: "caching",
    title: "キャッシュ戦略",
    description:
      "Cache-Aside、Write-Through、Write-Behindなどのキャッシュパターン、TTL設定、キャッシュの問題と対策、Spring Cacheの実装パターンを学ぶ",
    category: "spring",
    sections: [
      {
        title: "Cache-Aside/Write-Through/Write-Behind",
        content:
          "キャッシュ戦略にはいくつかのパターンがあります。Cache-Aside（Lazy Loading）はアプリケーションがキャッシュとDBを明示的に管理する最も一般的なパターンです。Write-Through はデータ書き込み時にキャッシュとDBを同時に更新し、データの一貫性を重視します。Write-Behind（Write-Back）は書き込みをキャッシュにのみ行い、非同期でDBに反映することで書き込み性能を向上させます。",
        code: `// === Cache-Aside パターン（最も一般的） ===
@Service
public class UserService {

    private final UserRepository userRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    // 読み取り: キャッシュ → ミスならDB → キャッシュに保存
    public User findById(Long id) {
        String key = "user:" + id;

        // 1. キャッシュを確認
        User cached = (User) redisTemplate.opsForValue().get(key);
        if (cached != null) {
            return cached; // キャッシュヒット
        }

        // 2. DBから取得
        User user = userRepository.findById(id)
            .orElseThrow();

        // 3. キャッシュに保存（TTL: 1時間）
        redisTemplate.opsForValue()
            .set(key, user, Duration.ofHours(1));

        return user;
    }

    // 書き込み: DB更新 → キャッシュ無効化
    public User update(User user) {
        User saved = userRepository.save(user);
        redisTemplate.delete("user:" + user.getId());
        return saved;
    }
}

// === Write-Through パターン ===
@Service
public class ProductCatalogService {

    // 書き込み: DB + キャッシュを同時に更新
    public Product save(Product product) {
        // 1. DBに保存
        Product saved = productRepository.save(product);

        // 2. キャッシュにも即座に反映
        String key = "product:" + saved.getId();
        redisTemplate.opsForValue()
            .set(key, saved, Duration.ofHours(2));

        return saved;
    }
}

// === Write-Behind パターン（非同期書き込み） ===
@Service
public class AnalyticsService {

    // 書き込み: キャッシュのみ更新、DBは非同期で反映
    public void recordPageView(String pageId) {
        // 1. Redisのカウンタをインクリメント（即座に完了）
        String key = "pageview:" + pageId;
        redisTemplate.opsForValue().increment(key);
    }

    // 定期的にDBに書き戻し（@Scheduledで実行）
    @Scheduled(fixedRate = 60000)  // 1分間隔
    public void flushToDatabase() {
        Set<String> keys = redisTemplate.keys("pageview:*");
        if (keys != null) {
            for (String key : keys) {
                Long count = Long.valueOf(
                    redisTemplate.opsForValue().get(key).toString());
                String pageId = key.replace("pageview:", "");
                analyticsRepository.updateCount(pageId, count);
                redisTemplate.delete(key);
            }
        }
    }
}`,
      },
      {
        title: "TTL設定とキャッシュ無効化",
        content:
          "TTL（Time To Live）は、キャッシュの有効期限を設定してデータの鮮度を保つ重要な仕組みです。適切なTTLは、データの更新頻度やビジネス要件に応じて決定します。短すぎるとキャッシュヒット率が低下し、長すぎると古いデータを返すリスクがあります。また、キャッシュの無効化戦略も重要で、イベント駆動型の無効化やバージョニングによるキャッシュキー管理が有効です。",
        code: `// === TTL設定のパターン ===
@Service
public class CacheService {

    private final RedisTemplate<String, Object> redisTemplate;

    // 固定TTLでキャッシュ
    public void cacheWithFixedTtl(String key, Object value) {
        redisTemplate.opsForValue()
            .set(key, value, Duration.ofMinutes(30));
    }

    // データ種別に応じたTTL設定
    public void cacheWithDynamicTtl(String category,
                                     String key, Object value) {
        Duration ttl = switch (category) {
            case "static"  -> Duration.ofHours(24);  // マスタデータ
            case "user"    -> Duration.ofHours(1);   // ユーザーデータ
            case "session" -> Duration.ofMinutes(30); // セッション
            case "realtime"-> Duration.ofSeconds(30); // リアルタイム
            default        -> Duration.ofMinutes(10);
        };
        redisTemplate.opsForValue().set(key, value, ttl);
    }

    // TTLのリフレッシュ（アクセスごとに延長）
    public Object getAndRefresh(String key, Duration ttl) {
        Object value = redisTemplate.opsForValue().get(key);
        if (value != null) {
            redisTemplate.expire(key, ttl); // TTLを延長
        }
        return value;
    }
}

// === キャッシュ無効化戦略 ===
@Service
public class CacheInvalidationService {

    private final RedisTemplate<String, Object> redisTemplate;

    // 1. 個別キーの無効化
    public void invalidateByKey(String key) {
        redisTemplate.delete(key);
    }

    // 2. パターンマッチによる一括無効化
    public void invalidateByPattern(String pattern) {
        // 例: "product:*" で商品キャッシュを全削除
        Set<String> keys = redisTemplate.keys(pattern);
        if (keys != null && !keys.isEmpty()) {
            redisTemplate.delete(keys);
        }
    }

    // 3. バージョニングによる無効化
    //    キーにバージョンを含め、バージョン変更で自然に無効化
    public Object getVersionedCache(String entity, Long id) {
        String version = (String) redisTemplate.opsForValue()
            .get("version:" + entity);
        String key = entity + ":v" + version + ":" + id;
        return redisTemplate.opsForValue().get(key);
    }

    public void bumpVersion(String entity) {
        redisTemplate.opsForValue().increment("version:" + entity);
    }
}`,
      },
      {
        title: "キャッシュ貫通・雪崩・ブレークダウン対策",
        content:
          "キャッシュ運用で注意すべき3つの問題があります。キャッシュ貫通（Cache Penetration）は存在しないキーへの大量リクエストがDBに直撃する問題です。キャッシュ雪崩（Cache Avalanche）は大量のキャッシュが同時に期限切れになりDBに負荷が集中する問題です。キャッシュブレークダウン（Cache Breakdown / Hotspot Invalid）は人気のキャッシュキーが期限切れになった瞬間に大量リクエストがDBに殺到する問題です。",
        code: `@Service
public class ResilientCacheService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ProductRepository productRepository;

    // === 1. キャッシュ貫通対策 ===
    // 存在しないデータにはnullマーカーをキャッシュ
    public Product findProductSafe(Long id) {
        String key = "product:" + id;
        Object cached = redisTemplate.opsForValue().get(key);

        // nullマーカーが入っている場合（存在しないデータ）
        if ("NULL_MARKER".equals(cached)) {
            return null;
        }
        if (cached != null) {
            return (Product) cached;
        }

        // DBから取得
        Product product = productRepository.findById(id)
            .orElse(null);

        if (product != null) {
            redisTemplate.opsForValue()
                .set(key, product, Duration.ofHours(1));
        } else {
            // 存在しないキーにも短TTLでマーカーを設定
            redisTemplate.opsForValue()
                .set(key, "NULL_MARKER", Duration.ofMinutes(5));
        }
        return product;
    }

    // === 2. キャッシュ雪崩対策 ===
    // TTLにランダムなオフセットを追加して期限切れを分散
    public void cacheWithJitter(String key, Object value,
                                 Duration baseTtl) {
        // 基本TTL + 0〜5分のランダム値
        long jitterSeconds = ThreadLocalRandom.current()
            .nextLong(0, 300);
        Duration ttl = baseTtl.plusSeconds(jitterSeconds);
        redisTemplate.opsForValue().set(key, value, ttl);
    }

    // === 3. キャッシュブレークダウン対策 ===
    // ミューテックス（排他ロック）でDB問い合わせを直列化
    public Product findHotProduct(Long id) {
        String key = "product:hot:" + id;
        Object cached = redisTemplate.opsForValue().get(key);
        if (cached != null) {
            return (Product) cached;
        }

        // ロックを取得して1つのスレッドだけDBに問い合わせ
        String lockKey = "lock:product:" + id;
        Boolean acquired = redisTemplate.opsForValue()
            .setIfAbsent(lockKey, "1", Duration.ofSeconds(10));

        if (Boolean.TRUE.equals(acquired)) {
            try {
                // ダブルチェック
                cached = redisTemplate.opsForValue().get(key);
                if (cached != null) {
                    return (Product) cached;
                }
                Product product = productRepository.findById(id)
                    .orElseThrow();
                redisTemplate.opsForValue()
                    .set(key, product, Duration.ofHours(1));
                return product;
            } finally {
                redisTemplate.delete(lockKey);
            }
        } else {
            // ロック取得失敗 → 少し待ってリトライ
            try { Thread.sleep(50); } catch (Exception e) {}
            return findHotProduct(id);
        }
    }
}`,
      },
      {
        title: "Spring Cacheの実装パターン",
        content:
          "Spring Cacheアブストラクションを活用した実践的な実装パターンを紹介します。マルチレベルキャッシュ（ローカル + Redis）、条件付きキャッシュ、カスタムキー生成、キャッシュ統計情報の取得など、実運用で役立つテクニックを学びます。また、@CacheConfigによるクラスレベルのキャッシュ設定で、アノテーションの重複を減らすことができます。",
        code: `// === クラスレベルのキャッシュ設定 ===
@Service
@CacheConfig(cacheNames = "orders")
public class OrderService {

    // @CacheConfigで指定した"orders"が自動適用
    @Cacheable(key = "#id")
    public Order findById(Long id) {
        return orderRepository.findById(id).orElseThrow();
    }

    @CacheEvict(key = "#id")
    public void cancel(Long id) {
        orderRepository.updateStatus(id, OrderStatus.CANCELLED);
    }
}

// === カスタムキー生成 ===
@Component
public class CustomKeyGenerator
        implements org.springframework.cache.interceptor.KeyGenerator {

    @Override
    public Object generate(Object target, Method method,
                           Object... params) {
        return target.getClass().getSimpleName()
            + ":" + method.getName()
            + ":" + Arrays.stream(params)
                .map(String::valueOf)
                .collect(Collectors.joining(":"));
    }
}

// カスタムKeyGeneratorの使用
@Service
public class SearchService {

    @Cacheable(value = "search",
               keyGenerator = "customKeyGenerator")
    public List<Product> search(String keyword,
                                 int page, int size) {
        return productRepository
            .findByNameContaining(keyword,
                PageRequest.of(page, size));
    }
}

// === SpEL式を使った高度なキャッシュ制御 ===
@Service
public class UserProfileService {

    // ユーザーのロールに応じてキャッシュ名を切り替え
    @Cacheable(
        value = "userProfile",
        key = "#userId",
        condition = "#userId != null",
        unless = "#result == null"
    )
    public UserProfile getProfile(Long userId) {
        return userProfileRepository.findByUserId(userId);
    }

    // 複合キー
    @Cacheable(
        value = "userActivity",
        key = "T(String).format('%s:%s', #userId, #date)"
    )
    public List<Activity> getActivity(Long userId,
                                       LocalDate date) {
        return activityRepository
            .findByUserIdAndDate(userId, date);
    }
}

// === application.yml でのTTL設定 ===
// spring:
//   cache:
//     type: redis
//     redis:
//       time-to-live: 600000   # デフォルトTTL（10分）
//       cache-null-values: false
//       key-prefix: "myapp:"
//       use-key-prefix: true`,
      },
    ],
  },
  {
    id: "session",
    title: "セッション管理",
    description:
      "Spring Session + Redisによるセッション管理、複数インスタンス間でのセッション共有、タイムアウト設定、セキュアなセッション管理を学ぶ",
    category: "spring",
    sections: [
      {
        title: "Spring Session + Redis",
        content:
          "Spring Session with Redisは、HTTPセッションの保存先をServletコンテナからRedisに切り替えるフレームワークです。これにより、アプリケーションサーバーを再起動してもセッションが失われず、複数インスタンス間でセッションを共有できます。導入はspring-session-data-redisの依存関係を追加し、わずかな設定を行うだけで完了します。",
        code: `// === build.gradle ===
// dependencies {
//     implementation 'org.springframework.boot:spring-boot-starter-web'
//     implementation 'org.springframework.session:spring-session-data-redis'
//     implementation 'org.springframework.boot:spring-boot-starter-data-redis'
// }

// === application.yml ===
// spring:
//   session:
//     store-type: redis
//     redis:
//       namespace: myapp:session
//       flush-mode: on-save    # immediate にすると即座に保存
//   data:
//     redis:
//       host: localhost
//       port: 6379

// === セッション設定クラス ===
import org.springframework.context.annotation.Configuration;
import org.springframework.session.data.redis.config.annotation.web
    .http.EnableRedisHttpSession;

@Configuration
@EnableRedisHttpSession(
    maxInactiveIntervalInSeconds = 1800  // 30分
)
public class SessionConfig {
}

// === コントローラーでのセッション操作 ===
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class SessionController {

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request,
                        HttpSession session) {
        // 認証処理...
        User user = authService.authenticate(
            request.getUsername(), request.getPassword());

        // セッションにユーザー情報を保存
        session.setAttribute("user", user);
        session.setAttribute("loginTime",
            System.currentTimeMillis());

        return "ログイン成功: セッションID=" + session.getId();
    }

    @GetMapping("/profile")
    public User getProfile(HttpSession session) {
        User user = (User) session.getAttribute("user");
        if (user == null) {
            throw new UnauthorizedException("ログインが必要です");
        }
        return user;
    }

    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate(); // セッション破棄
        return "ログアウトしました";
    }
}`,
      },
      {
        title: "セッション共有（複数インスタンス）",
        content:
          "マイクロサービスやスケールアウト構成では、複数のアプリケーションインスタンスが同じセッションデータにアクセスする必要があります。Spring Session + Redisを使えば、ロードバランサーの背後にある全インスタンスがRedis上のセッションを共有でき、スティッキーセッションが不要になります。これにより、インスタンスの追加・削除が容易になり、弾力的なスケーリングが実現します。",
        code: `// === セッション共有の構成図 ===
// ┌──────────┐
// │ Client   │
// └─────┬────┘
//       │
// ┌─────▼─────┐
// │   Nginx   │   ← ロードバランサー（ラウンドロビン）
// │  (LB)     │      スティッキーセッション不要！
// └─┬───┬───┬─┘
//   │   │   │
// ┌─▼┐┌─▼┐┌─▼┐
// │#1││#2││#3│   ← Spring Bootインスタンス
// └─┬┘└─┬┘└─┬┘
//   │   │   │
// ┌─▼───▼───▼─┐
// │   Redis    │   ← セッションストア（共有）
// └────────────┘

// === Nginx設定例（ラウンドロビン） ===
// upstream app_servers {
//     server app1:8080;
//     server app2:8080;
//     server app3:8080;
// }
// server {
//     location / {
//         proxy_pass http://app_servers;
//     }
// }

// === docker-compose.yml（マルチインスタンス構成） ===
// services:
//   app:
//     build: .
//     deploy:
//       replicas: 3
//     environment:
//       SPRING_DATA_REDIS_HOST: redis
//   redis:
//     image: redis:7-alpine
//     ports:
//       - "6379:6379"
//   nginx:
//     image: nginx:alpine
//     ports:
//       - "80:80"
//     volumes:
//       - ./nginx.conf:/etc/nginx/nginx.conf

// === セッションIDの確認と共有テスト ===
@RestController
public class SessionTestController {

    @GetMapping("/session-info")
    public Map<String, Object> sessionInfo(HttpSession session,
            HttpServletRequest request) {
        // どのインスタンスが処理したか確認
        Map<String, Object> info = new HashMap<>();
        info.put("sessionId", session.getId());
        info.put("serverPort",
            request.getLocalPort());
        info.put("hostname",
            InetAddress.getLocalHost().getHostName());

        // アクセスカウンタ（セッション共有の確認）
        Integer count = (Integer) session
            .getAttribute("accessCount");
        count = (count == null) ? 1 : count + 1;
        session.setAttribute("accessCount", count);
        info.put("accessCount", count);

        return info;
    }
}`,
      },
      {
        title: "セッションタイムアウト設定",
        content:
          "セッションタイムアウトは、ユーザーの非アクティブ期間後にセッションを自動的に無効化する仕組みです。適切なタイムアウト値の設定はセキュリティとユーザビリティのバランスが重要です。Spring Session + Redisでは、グローバル設定だけでなく、セッション単位で動的にタイムアウトを変更することも可能です。Redisのキー有効期限機能を活用して実現されます。",
        code: `// === タイムアウト設定方法 ===

// 方法1: application.yml で設定
// spring:
//   session:
//     timeout: 30m    # 30分（デフォルト）
// server:
//   servlet:
//     session:
//       timeout: 30m  # こちらでも設定可能

// 方法2: @EnableRedisHttpSession で設定
@Configuration
@EnableRedisHttpSession(
    maxInactiveIntervalInSeconds = 1800  // 30分
)
public class SessionConfig {
}

// 方法3: プログラムによる動的設定
@RestController
public class SessionTimeoutController {

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request,
                        HttpSession session) {
        User user = authService.authenticate(
            request.getUsername(), request.getPassword());
        session.setAttribute("user", user);

        // "ログイン状態を維持する"がチェックされた場合
        if (request.isRememberMe()) {
            session.setMaxInactiveInterval(
                7 * 24 * 60 * 60); // 7日間
        } else {
            session.setMaxInactiveInterval(1800); // 30分
        }

        return "ログイン成功";
    }
}

// === セッションイベントのリスニング ===
import org.springframework.context.event.EventListener;
import org.springframework.session.events.SessionCreatedEvent;
import org.springframework.session.events.SessionDeletedEvent;
import org.springframework.session.events.SessionExpiredEvent;
import org.springframework.stereotype.Component;

@Component
public class SessionEventListener {

    @EventListener
    public void onSessionCreated(SessionCreatedEvent event) {
        String sessionId = event.getSessionId();
        log.info("セッション作成: {}", sessionId);
    }

    @EventListener
    public void onSessionDeleted(SessionDeletedEvent event) {
        String sessionId = event.getSessionId();
        log.info("セッション削除: {}", sessionId);
    }

    @EventListener
    public void onSessionExpired(SessionExpiredEvent event) {
        String sessionId = event.getSessionId();
        log.info("セッション期限切れ: {}", sessionId);
        // クリーンアップ処理（一時ファイル削除など）
    }
}

// === Redisでのセッション確認 ===
// 127.0.0.1:6379> KEYS myapp:session:*
// 1) "myapp:session:sessions:abc-123-def"
// 127.0.0.1:6379> TTL myapp:session:sessions:abc-123-def
// (integer) 1745   ← 残り約29分`,
      },
      {
        title: "セキュアなセッション管理",
        content:
          "セッション管理はセキュリティの要であり、セッションハイジャック、セッション固定攻撃、クロスサイトスクリプティング（XSS）といった攻撃への対策が必要です。Spring Security + Spring Sessionを組み合わせることで、セッションIDの自動再生成、同時セッション制御、セキュアなCookie属性設定など、堅牢なセッション管理を実現できます。",
        code: `// === Spring Security + Spring Session 設定 ===
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web
    .builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {
        http
            .sessionManagement(session -> session
                // セッション固定攻撃対策
                //（認証後にセッションIDを変更）
                .sessionFixation().migrateSession()
                // 同時セッション数を制限（1ユーザー1セッション）
                .maximumSessions(1)
                // 既存セッションを無効化（新しいログインを優先）
                .maxSessionsPreventsLogin(false)
            )
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/login", "/api/public/**")
                    .permitAll()
                .anyRequest().authenticated()
            );

        return http.build();
    }
}

// === セキュアなCookie設定 ===
import org.springframework.session.web.http.DefaultCookieSerializer;
import org.springframework.session.web.http.CookieSerializer;

@Configuration
public class CookieConfig {

    @Bean
    public CookieSerializer cookieSerializer() {
        DefaultCookieSerializer serializer =
            new DefaultCookieSerializer();
        serializer.setCookieName("SESSION");
        serializer.setCookiePath("/");
        serializer.setDomainNamePattern(
            "^.+?(\\\\w+\\\\.[a-z]+)$");
        // HTTPS環境ではtrueに設定
        serializer.setUseSecureCookie(true);
        // JavaScriptからCookieにアクセス不可（XSS対策）
        serializer.setUseHttpOnlyCookie(true);
        // SameSite属性（CSRF対策）
        serializer.setSameSite("Lax");
        return serializer;
    }
}

// === セッションのセキュリティチェックリスト ===
// ┌───┬─────────────────────────┬───────────────────┐
// │ # │ 対策                     │ 設定              │
// ├───┼─────────────────────────┼───────────────────┤
// │ 1 │ セッションID再生成       │ migrateSession()  │
// │ 2 │ HttpOnly Cookie         │ setUseHttpOnly    │
// │ 3 │ Secure Cookie           │ setUseSecureCookie│
// │ 4 │ SameSite属性            │ setSameSite       │
// │ 5 │ 同時セッション制限       │ maximumSessions   │
// │ 6 │ セッションタイムアウト   │ maxInactiveInterval│
// │ 7 │ RedisのTLS通信          │ ssl: true         │
// └───┴─────────────────────────┴───────────────────┘`,
      },
    ],
  },

  // ===== 応用・運用 =====
  {
    id: "pub-sub",
    title: "Pub/SubとStreams",
    description:
      "RedisのPub/Sub機能によるリアルタイムメッセージング、Spring Bootとの連携、Redis Streams、イベント駆動アーキテクチャの実装を学ぶ",
    category: "advanced",
    sections: [
      {
        title: "Pub/Subの仕組み",
        content:
          "Redis Pub/Subは、パブリッシャーがチャンネルにメッセージを送信し、サブスクライバーがそのチャンネルを購読してメッセージを受信するメッセージングパターンです。リアルタイム通知、チャットシステム、イベントブロードキャストなどに利用されます。メッセージはファイア・アンド・フォーゲットで、永続化されない点に注意が必要です。永続化が必要な場合はRedis Streamsを使用します。",
        code: `# === redis-cli で Pub/Sub を試す ===

# --- ターミナル1: サブスクライバー ---
127.0.0.1:6379> SUBSCRIBE notifications
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "notifications"
3) (integer) 1

# メッセージ受信時:
1) "message"
2) "notifications"
3) "新しい注文が入りました: order-123"

# --- ターミナル2: パブリッシャー ---
127.0.0.1:6379> PUBLISH notifications "新しい注文が入りました: order-123"
(integer) 1    ← 受信したサブスクライバー数

# === パターンマッチ購読 ===
# チャンネル名のパターンで購読
127.0.0.1:6379> PSUBSCRIBE news.*
Reading messages...
1) "psubscribe"
2) "news.*"
3) (integer) 1

# パブリッシャー側:
127.0.0.1:6379> PUBLISH news.sports "野球の試合結果"
(integer) 1
127.0.0.1:6379> PUBLISH news.tech "新しいJavaバージョンリリース"
(integer) 1

# サブスクライバーは両方受信:
1) "pmessage"
2) "news.*"
3) "news.sports"
4) "野球の試合結果"

# === Pub/Sub の特徴と注意点 ===
# ┌──────────────────────────────────────────┐
# │ ✓ リアルタイム配信（低レイテンシ）        │
# │ ✓ ブロードキャスト（1対多）               │
# │ ✓ パターンマッチ購読                      │
# │ ✗ メッセージの永続化なし                  │
# │ ✗ オフラインのサブスクライバーに届かない   │
# │ ✗ メッセージの確認応答（ACK）なし          │
# └──────────────────────────────────────────┘`,
      },
      {
        title: "Spring BootでのPub/Subメッセージング",
        content:
          "Spring Data Redisを使用すると、Java/Spring BootアプリケーションからRedis Pub/Subを簡単に利用できます。メッセージリスナーをBeanとして登録し、RedisTemplateのconvertAndSendメソッドでメッセージを発行します。MessageListenerAdapterを使えば、POJO のメソッドをメッセージハンドラとして利用できます。",
        code: `// === メッセージリスナー設定 ===
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.PatternTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.data.redis.listener.adapter
    .MessageListenerAdapter;

@Configuration
public class RedisPubSubConfig {

    @Bean
    public RedisMessageListenerContainer container(
            RedisConnectionFactory connectionFactory,
            MessageListenerAdapter orderListener,
            MessageListenerAdapter notificationListener) {

        RedisMessageListenerContainer container =
            new RedisMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);

        // 特定チャンネルの購読
        container.addMessageListener(orderListener,
            new ChannelTopic("orders"));

        // パターンマッチ購読
        container.addMessageListener(notificationListener,
            new PatternTopic("notification.*"));

        return container;
    }

    @Bean
    public MessageListenerAdapter orderListener(
            OrderMessageHandler handler) {
        return new MessageListenerAdapter(handler,
            "handleOrder");
    }

    @Bean
    public MessageListenerAdapter notificationListener(
            NotificationHandler handler) {
        return new MessageListenerAdapter(handler,
            "handleNotification");
    }
}

// === メッセージハンドラ ===
@Component
public class OrderMessageHandler {

    public void handleOrder(String message) {
        // JSONをパースして処理
        OrderEvent event = objectMapper
            .readValue(message, OrderEvent.class);
        log.info("注文イベント受信: orderId={}",
            event.getOrderId());
        // 注文処理ロジック...
    }
}

// === メッセージパブリッシャー ===
@Service
public class EventPublisher {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;

    public void publishOrderEvent(OrderEvent event) {
        String json = objectMapper.writeValueAsString(event);
        redisTemplate.convertAndSend("orders", json);
        log.info("注文イベント発行: orderId={}",
            event.getOrderId());
    }

    public void publishNotification(String type, String msg) {
        redisTemplate.convertAndSend(
            "notification." + type, msg);
    }
}`,
      },
      {
        title: "Redis Streams",
        content:
          "Redis Streamsは Redis 5.0 で追加された永続的なメッセージキューです。Pub/Subと異なり、メッセージが永続化され、コンシューマーグループによる負荷分散やメッセージの確認応答（ACK）をサポートします。Apache Kafkaに似た機能をRedis上で実現でき、イベントソーシングやマイクロサービス間のメッセージングに適しています。",
        code: `# === Redis Streams の基本操作 ===

# メッセージの追加（* はIDの自動生成）
127.0.0.1:6379> XADD orders * orderId "ORD-001" product "Java Book" amount "2980"
"1700000000000-0"

127.0.0.1:6379> XADD orders * orderId "ORD-002" product "Redis Guide" amount "3500"
"1700000000001-0"

# ストリームの長さ
127.0.0.1:6379> XLEN orders
(integer) 2

# 全メッセージを読み取り（- は最小ID、+ は最大ID）
127.0.0.1:6379> XRANGE orders - +
1) 1) "1700000000000-0"
   2) 1) "orderId" 2) "ORD-001"
      3) "product" 4) "Java Book"
      5) "amount"  6) "2980"
2) 1) "1700000000001-0"
   2) 1) "orderId" 2) "ORD-002"
      3) "product" 4) "Redis Guide"
      5) "amount"  6) "3500"

# === コンシューマーグループ ===
# グループ作成（0 = 最初から読む、$ = 新しいメッセージのみ）
127.0.0.1:6379> XGROUP CREATE orders order-processors 0
OK

# コンシューマーがメッセージを取得
# ">" は未配信のメッセージを取得
127.0.0.1:6379> XREADGROUP GROUP order-processors consumer-1 COUNT 1 STREAMS orders >
1) 1) "orders"
   2) 1) 1) "1700000000000-0"
         2) 1) "orderId" 2) "ORD-001"
            3) "product" 4) "Java Book"

# メッセージの確認応答（ACK）
127.0.0.1:6379> XACK orders order-processors "1700000000000-0"
(integer) 1

# 未ACKメッセージの確認（Pending Entry List）
127.0.0.1:6379> XPENDING orders order-processors - + 10

# === Spring Boot での Redis Streams ===
// StreamListener の実装
@Component
public class OrderStreamListener
        implements StreamListener<String, MapRecord<String, String, String>> {

    @Override
    public void onMessage(MapRecord<String, String, String> message) {
        Map<String, String> body = message.getValue();
        log.info("Stream受信: id={}, orderId={}, product={}",
            message.getId(),
            body.get("orderId"),
            body.get("product"));
        // 処理完了後にACK
    }
}`,
      },
      {
        title: "イベント駆動アーキテクチャ",
        content:
          "Redis Streams を活用したイベント駆動アーキテクチャでは、サービス間の疎結合を実現しながら信頼性の高いメッセージングが可能です。Spring Data Redis の StreamMessageListenerContainer を使えば、コンシューマーグループベースの自動メッセージ受信、エラーハンドリング、リトライ処理を宣言的に設定できます。",
        code: `// === Redis Streams のイベント駆動設定 ===
@Configuration
public class StreamConfig {

    @Bean
    public StreamMessageListenerContainer<String,
            MapRecord<String, String, String>>
        streamListenerContainer(
            RedisConnectionFactory connectionFactory,
            OrderStreamListener listener) {

        var options = StreamMessageListenerContainer
            .StreamMessageListenerContainerOptions
            .builder()
            .pollTimeout(Duration.ofSeconds(1))
            .batchSize(10)
            .build();

        var container = StreamMessageListenerContainer
            .create(connectionFactory, options);

        // コンシューマーグループでの購読
        container.receiveAutoAck(
            Consumer.from("order-group", "consumer-1"),
            StreamOffset.create("orders",
                ReadOffset.lastConsumed()),
            listener
        );

        container.start();
        return container;
    }
}

// === イベント発行サービス ===
@Service
public class OrderEventPublisher {

    private final RedisTemplate<String, Object> redisTemplate;

    public void publishOrderCreated(Order order) {
        Map<String, String> fields = Map.of(
            "eventType", "ORDER_CREATED",
            "orderId", order.getId().toString(),
            "userId", order.getUserId().toString(),
            "totalAmount", order.getTotalAmount().toString(),
            "timestamp", Instant.now().toString()
        );

        StringRecord record = StreamRecords.string(fields)
            .withStreamKey("events:orders");
        redisTemplate.opsForStream().add(record);
    }
}

// === イベント駆動アーキテクチャの全体像 ===
// ┌────────────┐     ┌──────────────┐
// │ Order      │────▶│ Redis Stream │
// │ Service    │     │ events:orders│
// └────────────┘     └──┬───┬───┬───┘
//                       │   │   │
//              ┌────────┘   │   └────────┐
//              ▼            ▼            ▼
//   ┌──────────────┐ ┌──────────┐ ┌───────────┐
//   │ Notification │ │ Analytics│ │ Inventory │
//   │ Service      │ │ Service  │ │ Service   │
//   └──────────────┘ └──────────┘ └───────────┘
//
// 各サービスは独立したコンシューマーグループで
// 同じストリームからメッセージを受信できる`,
      },
    ],
  },
  {
    id: "distributed-lock",
    title: "分散ロックとレート制限",
    description:
      "Redissonによる分散ロック、Luaスクリプトを使ったアトミック操作、レートリミッターの実装、その他のアトミック操作パターンを学ぶ",
    category: "advanced",
    sections: [
      {
        title: "Redissonによる分散ロック",
        content:
          "分散システムでは、複数のプロセスやインスタンスが同じリソースに同時にアクセスすることを防ぐために、分散ロックが必要です。Redissonは、Redisを使った高機能な分散ロックライブラリで、リエントラントロック、公平ロック、読み書きロック、セマフォなど多彩なロック機構を提供します。ロックの自動延長（ウォッチドッグ機構）により、デッドロックのリスクも低減されます。",
        code: `// === build.gradle ===
// dependencies {
//     implementation 'org.redisson:redisson-spring-boot-starter:3.27.0'
// }

// === application.yml ===
// spring:
//   data:
//     redis:
//       host: localhost
//       port: 6379

// === Redisson設定 ===
import org.redisson.Redisson;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RedissonConfig {

    @Bean
    public RedissonClient redissonClient() {
        Config config = new Config();
        config.useSingleServer()
            .setAddress("redis://localhost:6379")
            .setConnectionPoolSize(10)
            .setConnectionMinimumIdleSize(5);
        return Redisson.create(config);
    }
}

// === 分散ロックの使用例 ===
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import java.util.concurrent.TimeUnit;

@Service
public class InventoryService {

    private final RedissonClient redissonClient;
    private final ProductRepository productRepository;

    // 在庫の減算（分散ロックで排他制御）
    public boolean decrementStock(Long productId, int quantity) {
        String lockKey = "lock:inventory:" + productId;
        RLock lock = redissonClient.getLock(lockKey);

        try {
            // ロック取得を試行（最大5秒待機、30秒後に自動解放）
            boolean acquired = lock.tryLock(5, 30,
                TimeUnit.SECONDS);
            if (!acquired) {
                throw new RuntimeException(
                    "ロック取得に失敗しました");
            }

            // クリティカルセクション
            Product product = productRepository
                .findById(productId).orElseThrow();
            if (product.getStock() < quantity) {
                return false; // 在庫不足
            }
            product.setStock(product.getStock() - quantity);
            productRepository.save(product);
            return true;

        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("ロック取得中に割り込み", e);
        } finally {
            // ロックを解放（自分が保持している場合のみ）
            if (lock.isHeldByCurrentThread()) {
                lock.unlock();
            }
        }
    }
}`,
      },
      {
        title: "Luaスクリプト",
        content:
          "Redis上でLuaスクリプトを実行すると、複数のRedisコマンドをアトミックに実行できます。Luaスクリプトはサーバーサイドで実行されるため、ネットワークラウンドトリップを削減しつつ、トランザクション的な処理を実現します。在庫チェックと減算、条件付き更新など、複数ステップの操作を安全に行うのに最適です。",
        code: `// === Spring Data Redis で Luaスクリプトを実行 ===
import org.springframework.data.redis.core.script.DefaultRedisScript;
import org.springframework.data.redis.core.script.RedisScript;

@Service
public class LuaScriptService {

    private final RedisTemplate<String, Object> redisTemplate;

    // === 在庫のアトミックな確認と減算 ===
    public boolean atomicDecrementStock(String productId,
                                         int quantity) {
        String script = """
            local stock = tonumber(redis.call('GET', KEYS[1]))
            if stock == nil then
                return -1
            end
            if stock >= tonumber(ARGV[1]) then
                redis.call('DECRBY', KEYS[1], ARGV[1])
                return 1
            else
                return 0
            end
            """;

        RedisScript<Long> redisScript =
            new DefaultRedisScript<>(script, Long.class);

        Long result = redisTemplate.execute(
            redisScript,
            List.of("stock:" + productId),
            String.valueOf(quantity)
        );

        return result != null && result == 1;
    }

    // === 条件付きキャッシュ更新（Compare and Set） ===
    public boolean compareAndSet(String key,
                                  String expectedValue,
                                  String newValue) {
        String script = """
            local current = redis.call('GET', KEYS[1])
            if current == ARGV[1] then
                redis.call('SET', KEYS[1], ARGV[2])
                return 1
            else
                return 0
            end
            """;

        RedisScript<Long> redisScript =
            new DefaultRedisScript<>(script, Long.class);

        Long result = redisTemplate.execute(
            redisScript,
            List.of(key),
            expectedValue, newValue
        );

        return result != null && result == 1;
    }

    // === スライディングウィンドウ（Luaで実装） ===
    public boolean isWithinRateLimit(String clientId,
                                      int maxRequests,
                                      int windowSeconds) {
        String script = """
            local key = KEYS[1]
            local maxReq = tonumber(ARGV[1])
            local window = tonumber(ARGV[2])
            local now = tonumber(ARGV[3])
            redis.call('ZREMRANGEBYSCORE', key, 0, now - window * 1000)
            local count = redis.call('ZCARD', key)
            if count < maxReq then
                redis.call('ZADD', key, now, now .. ':' .. math.random())
                redis.call('EXPIRE', key, window)
                return 1
            else
                return 0
            end
            """;

        RedisScript<Long> redisScript =
            new DefaultRedisScript<>(script, Long.class);

        Long result = redisTemplate.execute(
            redisScript,
            List.of("ratelimit:" + clientId),
            String.valueOf(maxRequests),
            String.valueOf(windowSeconds),
            String.valueOf(System.currentTimeMillis())
        );

        return result != null && result == 1;
    }
}`,
      },
      {
        title: "レートリミッターの実装",
        content:
          "レートリミッターは、特定のクライアントやAPIエンドポイントに対するリクエスト数を制限する仕組みです。Redisを使えば、分散環境でも正確なレート制限を実現できます。固定ウィンドウ、スライディングウィンドウ、トークンバケットなどのアルゴリズムがあり、用途に応じて選択します。Spring BootではインターセプターやフィルターとしてAPI全体に適用できます。",
        code: `// === 固定ウィンドウ方式のレートリミッター ===
@Service
public class RateLimiterService {

    private final RedisTemplate<String, Object> redisTemplate;

    // 固定ウィンドウ: 1分間にmaxRequests回まで許可
    public boolean isAllowed(String clientId, int maxRequests) {
        String key = "rate:" + clientId + ":"
            + (System.currentTimeMillis() / 60000);

        Long count = redisTemplate.opsForValue().increment(key);
        if (count != null && count == 1) {
            redisTemplate.expire(key, Duration.ofMinutes(1));
        }

        return count != null && count <= maxRequests;
    }
}

// === Spring Boot インターセプターとして適用 ===
@Component
public class RateLimitInterceptor
        implements HandlerInterceptor {

    private final RateLimiterService rateLimiter;

    @Override
    public boolean preHandle(HttpServletRequest request,
                              HttpServletResponse response,
                              Object handler) throws Exception {
        String clientIp = request.getRemoteAddr();

        if (!rateLimiter.isAllowed(clientIp, 100)) {
            response.setStatus(429); // Too Many Requests
            response.setHeader("Retry-After", "60");
            response.getWriter().write(
                "{\\"error\\":\\"リクエスト制限を超えました。"
                + "1分後に再試行してください。\\"}");
            return false;
        }

        return true;
    }
}

// === WebMvcConfigurerに登録 ===
@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final RateLimitInterceptor rateLimitInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(rateLimitInterceptor)
            .addPathPatterns("/api/**");
    }
}

// === アノテーションベースのレート制限 ===
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RateLimit {
    int maxRequests() default 100;
    int windowSeconds() default 60;
}

@Aspect
@Component
public class RateLimitAspect {

    private final RedisTemplate<String, Object> redisTemplate;

    @Around("@annotation(rateLimit)")
    public Object checkRateLimit(ProceedingJoinPoint joinPoint,
                                  RateLimit rateLimit)
            throws Throwable {
        // リクエストからクライアントIDを取得
        HttpServletRequest request =
            ((ServletRequestAttributes) RequestContextHolder
                .currentRequestAttributes()).getRequest();
        String clientId = request.getRemoteAddr();
        String key = "rate:" + clientId + ":"
            + joinPoint.getSignature().getName();

        Long count = redisTemplate.opsForValue().increment(key);
        if (count == 1) {
            redisTemplate.expire(key,
                Duration.ofSeconds(rateLimit.windowSeconds()));
        }

        if (count > rateLimit.maxRequests()) {
            throw new RateLimitExceededException(
                "リクエスト制限を超過しました");
        }

        return joinPoint.proceed();
    }
}

// 使用例:
@RestController
public class ApiController {

    @RateLimit(maxRequests = 10, windowSeconds = 60)
    @GetMapping("/api/data")
    public ResponseEntity<String> getData() {
        return ResponseEntity.ok("データ取得成功");
    }
}`,
      },
      {
        title: "アトミック操作",
        content:
          "Redisのシングルスレッドモデルを活用すると、ロック不要でアトミックな操作を実現できます。INCR/DECRによるカウンタ、SETNX（SET if Not eXists）による排他制御、GETSET（旧値を返しつつ新値を設定）やMULTI/EXECトランザクションなど、用途に応じた方法があります。Luaスクリプトを組み合わせれば、より複雑なアトミック操作も可能です。",
        code: `// === アトミックカウンタ ===
@Service
public class AtomicCounterService {

    private final RedisTemplate<String, Object> redisTemplate;

    // ユニークビジターのカウント（HyperLogLog）
    public void recordVisitor(String page, String visitorId) {
        redisTemplate.opsForHyperLogLog()
            .add("hll:visitors:" + page, visitorId);
    }

    public Long getUniqueVisitorCount(String page) {
        return redisTemplate.opsForHyperLogLog()
            .size("hll:visitors:" + page);
    }

    // 日次カウンタ（自動リセット）
    public Long incrementDailyCounter(String name) {
        String key = "counter:" + name + ":"
            + LocalDate.now().toString();
        Long count = redisTemplate.opsForValue().increment(key);
        if (count != null && count == 1) {
            // 初回のみTTLを設定（翌日自動削除）
            redisTemplate.expire(key, Duration.ofDays(2));
        }
        return count;
    }
}

// === MULTI/EXEC トランザクション ===
@Service
public class TransactionService {

    private final RedisTemplate<String, Object> redisTemplate;

    // ポイント移動のトランザクション
    public void transferPoints(String fromUser,
                                String toUser, int points) {
        redisTemplate.execute(new SessionCallback<>() {
            @Override
            public Object execute(RedisOperations operations) {
                operations.multi(); // トランザクション開始
                operations.opsForValue()
                    .decrement("points:" + fromUser, points);
                operations.opsForValue()
                    .increment("points:" + toUser, points);
                return operations.exec(); // コミット
            }
        });
    }
}

// === パイプライン（バッチ処理） ===
@Service
public class PipelineService {

    private final RedisTemplate<String, Object> redisTemplate;

    // 大量データの一括書き込み（パイプラインで高速化）
    public void bulkInsert(Map<String, Object> dataMap) {
        redisTemplate.executePipelined(
            new SessionCallback<>() {
                @Override
                public Object execute(
                        RedisOperations operations) {
                    for (var entry : dataMap.entrySet()) {
                        operations.opsForValue()
                            .set(entry.getKey(),
                                 entry.getValue(),
                                 Duration.ofHours(1));
                    }
                    return null;
                }
            }
        );
    }
}

// === Bitmap を使ったフラグ管理 ===
// 例: ユーザーの日次ログイン記録
@Service
public class BitmapService {

    private final RedisTemplate<String, Object> redisTemplate;

    // ログイン記録（日番号をビット位置として使用）
    public void recordLogin(Long userId, LocalDate date) {
        int dayOfYear = date.getDayOfYear();
        redisTemplate.opsForValue()
            .setBit("login:" + userId + ":"
                + date.getYear(), dayOfYear, true);
    }

    // ログイン日数のカウント
    // redis-cli: BITCOUNT login:1001:2026
}`,
      },
    ],
  },
  {
    id: "cluster-ops",
    title: "クラスタと運用",
    description:
      "Redis Sentinelによる高可用性、Redis Clusterによるシャーディング、監視とメトリクス収集、バックアップとリストア手順を学ぶ",
    category: "advanced",
    sections: [
      {
        title: "Redis Sentinel（高可用性）",
        content:
          "Redis Sentinelは、Redisの高可用性を実現するための監視システムです。マスターノードの障害を自動検出し、レプリカをマスターに昇格させるフェイルオーバーを実行します。複数のSentinelプロセスが協調して動作し、誤検知を防ぎます。Spring Boot からはSentinel対応の接続設定を行うだけで、フェイルオーバー時も自動的に新しいマスターに接続が切り替わります。",
        code: `# === Redis Sentinel 構成図 ===
# ┌──────────┐  ┌──────────┐  ┌──────────┐
# │Sentinel 1│  │Sentinel 2│  │Sentinel 3│
# └─────┬────┘  └─────┬────┘  └─────┬────┘
#       │             │             │
#       │     監視     │     監視    │
#       ▼             ▼             ▼
# ┌──────────┐  ┌──────────┐  ┌──────────┐
# │  Master  │─▶│ Replica 1│  │ Replica 2│
# │ (write)  │  │  (read)  │  │  (read)  │
# └──────────┘  └──────────┘  └──────────┘

# === sentinel.conf（Sentinel設定） ===
# sentinel monitor mymaster 192.168.1.10 6379 2
#   ↑ マスター名   ↑ マスターIP    ↑ ポート  ↑ クォーラム
# sentinel down-after-milliseconds mymaster 5000
#   ↑ 5秒応答がなければダウンと判定
# sentinel failover-timeout mymaster 60000
#   ↑ フェイルオーバーのタイムアウト
# sentinel parallel-syncs mymaster 1
#   ↑ フェイルオーバー後の同期レプリカ数

# === Docker Composeでの構成 ===
# services:
#   redis-master:
#     image: redis:7-alpine
#     command: redis-server --port 6379
#   redis-replica1:
#     image: redis:7-alpine
#     command: redis-server --port 6379 --replicaof redis-master 6379
#   redis-replica2:
#     image: redis:7-alpine
#     command: redis-server --port 6379 --replicaof redis-master 6379
#   sentinel1:
#     image: redis:7-alpine
#     command: redis-sentinel /etc/sentinel.conf

# === Spring Boot での Sentinel接続設定 ===
# application.yml
# spring:
#   data:
#     redis:
#       sentinel:
#         master: mymaster
#         nodes:
#           - sentinel1:26379
#           - sentinel2:26379
#           - sentinel3:26379
#       password: mypassword

// Spring Boot設定クラス（Sentinel対応）
@Configuration
public class RedisSentinelConfig {

    @Bean
    public LettuceConnectionFactory connectionFactory() {
        RedisSentinelConfiguration sentinelConfig =
            new RedisSentinelConfiguration()
                .master("mymaster")
                .sentinel("sentinel1", 26379)
                .sentinel("sentinel2", 26379)
                .sentinel("sentinel3", 26379);
        sentinelConfig.setPassword("mypassword");
        return new LettuceConnectionFactory(sentinelConfig);
    }
}`,
      },
      {
        title: "Redis Cluster（シャーディング）",
        content:
          "Redis Clusterは、データを複数のノードに自動分散（シャーディング）する仕組みです。16384個のハッシュスロットをノード間で分割し、キーのハッシュ値に基づいてデータを配置します。自動フェイルオーバーも組み込まれており、一部ノードが停止しても残りのノードでサービスを継続できます。大規模なデータセットや高スループットが必要な場合に選択されます。",
        code: `# === Redis Cluster 構成図 ===
# ┌─────────────────────────────────────────────┐
# │           Redis Cluster（6ノード）            │
# │                                             │
# │  ┌─Master1─┐  ┌─Master2─┐  ┌─Master3─┐    │
# │  │slot 0-  │  │slot 5461│  │slot 10923│   │
# │  │    5460 │  │  -10922 │  │  -16383 │    │
# │  └────┬────┘  └────┬────┘  └────┬────┘    │
# │       │            │            │          │
# │  ┌────▼────┐  ┌────▼────┐  ┌────▼────┐    │
# │  │Replica1 │  │Replica2 │  │Replica3 │    │
# │  └─────────┘  └─────────┘  └─────────┘    │
# └─────────────────────────────────────────────┘

# === Redis Clusterの作成 ===
# 6ノード（3マスター + 3レプリカ）で構成
$ redis-cli --cluster create \\
  192.168.1.1:6379 192.168.1.2:6379 192.168.1.3:6379 \\
  192.168.1.4:6379 192.168.1.5:6379 192.168.1.6:6379 \\
  --cluster-replicas 1

# クラスタ情報の確認
$ redis-cli -c -h 192.168.1.1 cluster info
cluster_state:ok
cluster_slots_assigned:16384
cluster_slots_ok:16384
cluster_known_nodes:6
cluster_size:3

# ノード一覧の確認
$ redis-cli -c -h 192.168.1.1 cluster nodes

# ハッシュスロットの確認
$ redis-cli -c -h 192.168.1.1 cluster slots

# === Spring Boot での Cluster接続設定 ===
# application.yml
# spring:
#   data:
#     redis:
#       cluster:
#         nodes:
#           - 192.168.1.1:6379
#           - 192.168.1.2:6379
#           - 192.168.1.3:6379
#         max-redirects: 3
#       lettuce:
#         cluster:
#           refresh:
#             adaptive: true
#             period: 30s   # トポロジ更新間隔

// Cluster対応の設定クラス
@Configuration
public class RedisClusterConfig {

    @Bean
    public LettuceConnectionFactory connectionFactory() {
        RedisClusterConfiguration clusterConfig =
            new RedisClusterConfiguration(List.of(
                "192.168.1.1:6379",
                "192.168.1.2:6379",
                "192.168.1.3:6379"
            ));
        clusterConfig.setMaxRedirects(3);

        LettuceClientConfiguration clientConfig =
            LettuceClientConfiguration.builder()
                .readFrom(ReadFrom.REPLICA_PREFERRED)
                .build();

        return new LettuceConnectionFactory(
            clusterConfig, clientConfig);
    }
}`,
      },
      {
        title: "監視とメトリクス",
        content:
          "Redisの安定運用には、パフォーマンスメトリクスの継続的な監視が不可欠です。Redis INFOコマンドで取得できるメモリ使用量、接続数、コマンド実行統計、レプリケーション状態などを定期的に確認します。Prometheus + Grafanaを使ったダッシュボード構築や、Spring Boot Actuator + Micrometerによるアプリケーション側からのRedisメトリクス収集も有効です。",
        code: `# === Redis INFO コマンドで監視 ===

# メモリ使用量の確認
127.0.0.1:6379> INFO memory
used_memory:1048576
used_memory_human:1.00M
used_memory_peak:2097152
used_memory_peak_human:2.00M
maxmemory:0           ← 制限なし（本番では設定推奨）
maxmemory_policy:noeviction

# 接続情報の確認
127.0.0.1:6379> INFO clients
connected_clients:10
blocked_clients:0
maxclients:10000

# コマンド統計
127.0.0.1:6379> INFO commandstats
cmdstat_get:calls=15000,usec=22500,usec_per_call=1.50
cmdstat_set:calls=8000,usec=16000,usec_per_call=2.00

# スロークエリログの確認
127.0.0.1:6379> SLOWLOG GET 10
1) 1) (integer) 1              ← ID
   2) (integer) 1700000000     ← タイムスタンプ
   3) (integer) 15234          ← 実行時間(μ秒)
   4) 1) "KEYS"               ← コマンド
      2) "*"

# スロークエリの閾値設定（10ミリ秒以上を記録）
127.0.0.1:6379> CONFIG SET slowlog-log-slower-than 10000

# === Spring Boot Actuator + Micrometer ===
// build.gradle
// implementation 'org.springframework.boot:spring-boot-starter-actuator'
// implementation 'io.micrometer:micrometer-registry-prometheus'

// application.yml
// management:
//   endpoints:
//     web:
//       exposure:
//         include: health,info,prometheus,metrics
//   metrics:
//     tags:
//       application: my-app

// Redis関連メトリクスの確認
// GET /actuator/metrics/spring.data.redis.commands
// GET /actuator/metrics/lettuce.command.completion

// === カスタム Redis ヘルスチェック ===
@Component
public class RedisHealthIndicator
        implements HealthIndicator {

    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public Health health() {
        try {
            String pong = redisTemplate.getConnectionFactory()
                .getConnection().ping();
            if ("PONG".equals(pong)) {
                return Health.up()
                    .withDetail("status", "Redis is running")
                    .build();
            }
        } catch (Exception e) {
            return Health.down()
                .withException(e)
                .build();
        }
        return Health.down().build();
    }
}`,
      },
      {
        title: "バックアップとリストア",
        content:
          "Redisデータのバックアップは、RDBスナップショットを利用するのが一般的です。BGSAVEコマンドでバックグラウンドでダンプファイル（dump.rdb）を生成し、安全な場所にコピーします。AOFファイルのバックアップも可能です。リストアはダンプファイルをRedisのデータディレクトリに配置して再起動するだけです。本番環境では定期バックアップの自動化と、リストア手順の定期的なテストが重要です。",
        code: `# === バックアップ手順 ===

# 1. BGSAVEでRDBスナップショットを作成
127.0.0.1:6379> BGSAVE
Background saving started

# 2. 保存完了を確認
127.0.0.1:6379> LASTSAVE
(integer) 1700000000

# 3. RDBファイルのパスを確認
127.0.0.1:6379> CONFIG GET dir
1) "dir"
2) "/data"
127.0.0.1:6379> CONFIG GET dbfilename
1) "dbfilename"
2) "dump.rdb"

# 4. RDBファイルをバックアップ先にコピー
$ cp /data/dump.rdb /backup/dump-$(date +%Y%m%d-%H%M%S).rdb

# === 自動バックアップスクリプト ===
#!/bin/bash
# backup-redis.sh
BACKUP_DIR="/backup/redis"
REDIS_DATA="/data"
DATE=$(date +%Y%m%d-%H%M%S)

# BGSAVEを実行
redis-cli BGSAVE

# 保存完了を待機
while [ "$(redis-cli LASTSAVE)" == "$LAST_SAVE" ]; do
    sleep 1
done

# バックアップをコピー
cp \${REDIS_DATA}/dump.rdb \${BACKUP_DIR}/dump-\${DATE}.rdb

# 7日以上前のバックアップを削除
find \${BACKUP_DIR} -name "dump-*.rdb" -mtime +7 -delete

echo "バックアップ完了: dump-\${DATE}.rdb"

# cronで毎日3時に実行
# 0 3 * * * /scripts/backup-redis.sh

# === リストア手順 ===

# 1. Redisを停止
$ redis-cli SHUTDOWN NOSAVE

# 2. バックアップファイルをデータディレクトリにコピー
$ cp /backup/dump-20260321-030000.rdb /data/dump.rdb

# 3. Redisを起動（自動的にdump.rdbを読み込み）
$ redis-server /etc/redis/redis.conf

# 4. データの確認
127.0.0.1:6379> DBSIZE
(integer) 15234
127.0.0.1:6379> INFO keyspace
db0:keys=15234,expires=8901

# === Docker環境でのバックアップ ===
# Dockerコンテナ内のRDBファイルをホストにコピー
$ docker cp my-redis:/data/dump.rdb ./backup/dump.rdb

# リストア: ホストのRDBをコンテナに配置して再起動
$ docker cp ./backup/dump.rdb my-redis:/data/dump.rdb
$ docker restart my-redis

# === オンラインバックアップのベストプラクティス ===
# ┌───┬──────────────────────────────────────────┐
# │ 1 │ レプリカからバックアップを取得する          │
# │   │ （マスターへの負荷を避ける）               │
# │ 2 │ バックアップの整合性を定期的に検証する      │
# │ 3 │ 複数世代のバックアップを保持する            │
# │ 4 │ バックアップを別リージョンに保管する        │
# │ 5 │ リストア手順を定期的にテストする            │
# │ 6 │ RDB + AOF の両方をバックアップする         │
# └───┴──────────────────────────────────────────┘`,
      },
    ],
  },
];
