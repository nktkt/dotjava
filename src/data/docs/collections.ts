import type { DocsChapter } from "../java-docs";

export const collectionsChapters: DocsChapter[] = [
  {
    id: "collections-overview",
    title: "コレクションの概要",
    category: "collections",
    description: "コレクションフレームワークの階層構造と全体像",
    sections: [
      {
        title: "コレクション階層",
        content:
          "Javaのコレクションフレームワークは、データを格納・操作するための統一的なアーキテクチャを提供します。Iterable → Collection を頂点に、List、Set、Queue の主要インターフェースがあり、Map は別の階層です。",
        code: `// コレクション階層
// Iterable<E>
//   └── Collection<E>
//         ├── List<E>      ← 順序あり、重複あり
//         │     ├── ArrayList     （配列ベース、ランダムアクセス高速）
//         │     ├── LinkedList    （ノードベース、挿入/削除高速）
//         │     └── CopyOnWriteArrayList（スレッドセーフ）
//         ├── Set<E>       ← 重複なし
//         │     ├── HashSet       （順序なし、最速）
//         │     ├── LinkedHashSet （挿入順保持）
//         │     ├── TreeSet       （ソート済み）
//         │     └── EnumSet       （enum専用、最高性能）
//         └── Queue<E>     ← FIFO
//               ├── PriorityQueue （優先度順）
//               ├── ArrayDeque    （両端キュー）
//               └── LinkedList    （Queue実装も兼ねる）
//
// Map<K,V>              ← キーと値のペア
//   ├── HashMap           （最速、順序なし）
//   ├── LinkedHashMap      （挿入順 or アクセス順）
//   ├── TreeMap            （キーソート済み）
//   ├── ConcurrentHashMap  （スレッドセーフ）
//   └── EnumMap            （enumキー専用）

// 不変コレクションの生成（Java 9+）
List<String> list = List.of("a", "b", "c");
Set<Integer> set = Set.of(1, 2, 3);
Map<String, Integer> map = Map.of("x", 1, "y", 2);

// 可変コレクションの生成
List<String> mutable = new ArrayList<>(List.of("a", "b"));
mutable.add("c");  // OK`,
      },
    ],
  },
  {
    id: "list",
    title: "List インターフェース",
    category: "collections",
    description: "ArrayList, LinkedList の使い方、ソート、検索",
    sections: [
      {
        title: "Listの基本操作",
        content:
          "Listは順序を持ち、インデックスでアクセスできるコレクションです。重複要素を許可します。ArrayListは内部配列ベースでランダムアクセスが高速、LinkedListはノードベースで先頭・末尾の挿入削除が高速です。",
        code: `// 生成
List<String> list = new ArrayList<>();
List<String> linked = new LinkedList<>();
List<String> immutable = List.of("a", "b", "c");
List<String> copy = List.copyOf(list);

// 追加
list.add("Java");                 // 末尾に追加
list.add(0, "Hello");            // インデックス指定
list.addAll(List.of("a", "b")); // 一括追加

// 取得
list.get(0);                     // インデックスで取得
list.indexOf("Java");            // 最初の位置
list.lastIndexOf("Java");        // 最後の位置
list.contains("Java");           // 存在チェック
list.size();                     // 要素数
list.isEmpty();                  // 空チェック
list.subList(0, 2);              // 部分リスト（ビュー）

// 更新・削除
list.set(0, "Hi");               // インデックスで置換
list.remove(0);                  // インデックスで削除
list.remove("Java");             // 値で削除（最初の一致）
list.removeIf(s -> s.length() < 3);  // 条件で削除
list.replaceAll(String::toUpperCase); // 全要素を変換
list.clear();                    // 全削除

// ソート
list.sort(Comparator.naturalOrder());
list.sort(Comparator.comparing(String::length).reversed());

// イテレーション
for (String s : list) { /* 拡張for */ }
list.forEach(System.out::println);

// 配列との変換
String[] arr = list.toArray(new String[0]);
List<String> fromArr = new ArrayList<>(Arrays.asList(arr));`,
      },
    ],
  },
  {
    id: "set",
    title: "Set インターフェース",
    category: "collections",
    description: "HashSet, TreeSet, LinkedHashSet, EnumSet と集合演算",
    sections: [
      {
        title: "Setの操作と集合演算",
        content:
          "Setは重複を許さないコレクションです。HashSetはO(1)のアクセス、TreeSetはソート済み順序を保証、LinkedHashSetは挿入順を保持します。addAll（和集合）、retainAll（積集合）、removeAll（差集合）で集合演算が可能です。",
        code: `// 生成
Set<String> hash = new HashSet<>();          // 順序なし
Set<String> tree = new TreeSet<>();          // ソート済み
Set<String> linked = new LinkedHashSet<>();  // 挿入順
Set<String> immutable = Set.of("a", "b");   // 不変

// 基本操作
hash.add("Java");              // true（追加成功）
hash.add("Java");              // false（重複）
hash.remove("Java");
hash.contains("Java");
hash.size();

// 集合演算
Set<Integer> a = new HashSet<>(Set.of(1, 2, 3, 4));
Set<Integer> b = new HashSet<>(Set.of(3, 4, 5, 6));

// 和集合（union）
Set<Integer> union = new HashSet<>(a);
union.addAll(b);                // {1, 2, 3, 4, 5, 6}

// 積集合（intersection）
Set<Integer> inter = new HashSet<>(a);
inter.retainAll(b);             // {3, 4}

// 差集合（difference）
Set<Integer> diff = new HashSet<>(a);
diff.removeAll(b);              // {1, 2}

// TreeSet（ソート済み）
TreeSet<Integer> sorted = new TreeSet<>(List.of(5, 1, 3));
sorted.first();                 // 1
sorted.last();                  // 5
sorted.headSet(3);              // {1}（3未満）
sorted.tailSet(3);              // {3, 5}（3以上）

// EnumSet（enum専用、ビットベクタ実装で高速）
EnumSet<DayOfWeek> weekdays = EnumSet.range(
    DayOfWeek.MONDAY, DayOfWeek.FRIDAY);`,
      },
    ],
  },
  {
    id: "map",
    title: "Map インターフェース",
    category: "collections",
    description: "HashMap, TreeMap, LinkedHashMap の使い方と高度な操作",
    sections: [
      {
        title: "Mapの基本と高度な操作",
        content:
          "Mapはキーと値のペアを格納するコレクションです。キーは一意で、各キーは最大1つの値にマッピングされます。Java 8以降はcompute, merge, forEach等の便利なメソッドが追加されました。",
        code: `// 生成
Map<String, Integer> map = new HashMap<>();
Map<String, Integer> tree = new TreeMap<>();       // キー順
Map<String, Integer> linked = new LinkedHashMap<>(); // 挿入順
Map<String, Integer> immutable = Map.of("a", 1, "b", 2);

// 基本操作
map.put("Java", 21);
map.putIfAbsent("Java", 17);   // キーがない場合のみ
map.get("Java");                // 21
map.getOrDefault("Go", 0);     // 0（なければデフォルト）
map.containsKey("Java");
map.containsValue(21);
map.remove("Java");
map.size();

// Java 8+ の高度な操作
Map<String, Integer> scores = new HashMap<>();

// compute: キーに対する値を計算
scores.compute("Java", (k, v) -> v == null ? 1 : v + 1);

// merge: 値の結合
scores.merge("Java", 1, Integer::sum);  // 加算

// replaceAll: 全値を変換
scores.replaceAll((k, v) -> v * 2);

// イテレーション
map.forEach((k, v) -> System.out.println(k + "=" + v));

for (var entry : map.entrySet()) {
    System.out.println(entry.getKey() + "=" + entry.getValue());
}

// Stream 変換
Map<String, Integer> filtered = map.entrySet().stream()
    .filter(e -> e.getValue() > 10)
    .collect(Collectors.toMap(
        Map.Entry::getKey, Map.Entry::getValue));

// グルーピング（Stream → Map）
List<String> words = List.of("apple", "banana", "avocado", "berry");
Map<Character, List<String>> grouped = words.stream()
    .collect(Collectors.groupingBy(w -> w.charAt(0)));
// {a=[apple, avocado], b=[banana, berry]}`,
      },
    ],
  },
  {
    id: "queue-deque",
    title: "Queue / Deque",
    category: "collections",
    description: "PriorityQueue, ArrayDeque, スタックとキューの実装",
    sections: [
      {
        title: "キューとデックの使い方",
        content:
          "QueueはFIFO（先入先出）、DequeはDouble-Ended Queue（両端操作可能）です。PriorityQueueは優先度順、ArrayDequeはスタックやキューの汎用実装です。offer/poll/peek は失敗時にnullを返し、add/remove/element は例外を投げます。",
        code: `// Queue（FIFO: 先入先出）
Queue<String> queue = new LinkedList<>();
queue.offer("first");            // 末尾に追加（成功:true, 失敗:false）
queue.offer("second");
queue.offer("third");
queue.peek();                    // "first"（先頭を参照、削除しない）
queue.poll();                    // "first"（先頭を取り出して削除）

// PriorityQueue（優先度付きキュー）
Queue<Integer> pq = new PriorityQueue<>();  // 最小値が先頭
pq.offer(30); pq.offer(10); pq.offer(20);
pq.poll();  // 10
pq.poll();  // 20
pq.poll();  // 30

// 逆順（最大値が先頭）
Queue<Integer> maxPQ = new PriorityQueue<>(Comparator.reverseOrder());

// カスタム優先度
record Task(String name, int priority) {}
Queue<Task> taskQueue = new PriorityQueue<>(
    Comparator.comparingInt(Task::priority));

// Deque（両端キュー）
Deque<String> deque = new ArrayDeque<>();
deque.offerFirst("A");           // 先頭に追加
deque.offerLast("B");            // 末尾に追加
deque.peekFirst();               // "A"
deque.peekLast();                // "B"
deque.pollFirst();               // "A"（先頭取り出し）
deque.pollLast();                // "B"（末尾取り出し）

// Deque をスタック（LIFO: 後入先出）として使用
Deque<String> stack = new ArrayDeque<>();
stack.push("bottom");
stack.push("middle");
stack.push("top");
stack.peek();   // "top"
stack.pop();    // "top"
stack.pop();    // "middle"`,
      },
    ],
  },
  {
    id: "collections-utility",
    title: "Collections ユーティリティ",
    category: "collections",
    description: "Collections/Arraysクラス、不変コレクション、ファクトリメソッド",
    sections: [
      {
        title: "ユーティリティメソッドと不変コレクション",
        content:
          "Collectionsクラスはソート、検索、同期化、不変化などの便利メソッドを提供します。Java 9以降のファクトリメソッド（List.of, Map.of 等）で簡潔に不変コレクションを生成できます。",
        code: `List<Integer> list = new ArrayList<>(List.of(3, 1, 4, 1, 5, 9));

// ソート・検索
Collections.sort(list);                    // 自然順
Collections.sort(list, Comparator.reverseOrder());
Collections.binarySearch(list, 4);         // ソート済みで検索
Collections.max(list);                     // 最大値
Collections.min(list);                     // 最小値
Collections.frequency(list, 1);            // 出現回数

// 操作
Collections.reverse(list);
Collections.shuffle(list);
Collections.swap(list, 0, 1);
Collections.rotate(list, 2);
Collections.fill(list, 0);

// 不変ラッパー
List<Integer> unmod = Collections.unmodifiableList(list);
// unmod.add(1);  // UnsupportedOperationException

// Java 9+ ファクトリメソッド（推奨）
List<String> names = List.of("Alice", "Bob");
Set<Integer> nums = Set.of(1, 2, 3);
Map<String, Integer> ages = Map.of("Alice", 25, "Bob", 30);
Map<String, Integer> moreAges = Map.ofEntries(
    Map.entry("Alice", 25),
    Map.entry("Bob", 30),
    Map.entry("Charlie", 35)
);

// Java 10+ コピーファクトリ
List<String> copy = List.copyOf(names);

// Java 16+ Stream.toList()
List<String> result = names.stream()
    .map(String::toUpperCase)
    .toList();    // 不変リスト`,
      },
    ],
  },
];
