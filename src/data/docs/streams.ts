import type { DocsChapter } from "../java-docs";

export const streamsChapters: DocsChapter[] = [
  {
    id: "stream-basics",
    title: "Stream の基本",
    category: "streams",
    description: "Streamの生成、中間操作、終端操作のパイプライン処理",
    sections: [
      {
        title: "Streamの生成と中間操作",
        content:
          "Stream APIはコレクションのデータをパイプライン形式で処理します。中間操作は遅延評価され、終端操作が呼ばれるまで実行されません。filter, map, sorted, distinct, limit, skip 等の中間操作でデータを変換します。",
        code: `// Stream の生成方法
Stream<String> s1 = List.of("a", "b", "c").stream();
Stream<String> s2 = Stream.of("x", "y", "z");
Stream<Integer> s3 = Stream.iterate(0, n -> n + 2).limit(5);  // 0,2,4,6,8
Stream<String> s4 = Stream.generate(() -> "hello").limit(3);
IntStream s5 = IntStream.range(1, 10);         // 1〜9
IntStream s6 = IntStream.rangeClosed(1, 10);   // 1〜10
Stream<String> s7 = "hello".chars().mapToObj(c -> String.valueOf((char) c));

// 中間操作（遅延評価）
List<String> names = List.of("Alice", "Bob", "Charlie", "David", "Alice");

List<String> result = names.stream()
    .filter(n -> n.length() > 3)     // フィルタ: 4文字以上
    .map(String::toUpperCase)        // 変換: 大文字に
    .distinct()                      // 重複除去
    .sorted()                        // ソート
    .limit(3)                        // 最大3件
    .skip(1)                         // 先頭1件スキップ
    .peek(System.out::println)       // デバッグ出力
    .toList();

// flatMap: ネストした構造を平坦化
List<List<Integer>> nested = List.of(
    List.of(1, 2, 3),
    List.of(4, 5),
    List.of(6, 7, 8, 9)
);
List<Integer> flat = nested.stream()
    .flatMap(Collection::stream)
    .toList();  // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// mapMulti (Java 16+)
Stream.of(1, 2, 3)
    .<String>mapMulti((n, consumer) -> {
        consumer.accept("num:" + n);
        consumer.accept("double:" + n * 2);
    }).toList(); // [num:1, double:2, num:2, double:4, ...]`,
      },
      {
        title: "終端操作",
        content:
          "終端操作はStreamパイプラインを実行し、結果を生成します。forEach, count, collect, reduce, findFirst, anyMatch 等があります。終端操作を呼んだ後のStreamは再利用できません。",
        code: `List<String> names = List.of("Alice", "Bob", "Charlie", "David");

// forEach: 各要素に処理
names.stream().forEach(System.out::println);

// count: 要素数
long count = names.stream().filter(n -> n.length() > 3).count();

// マッチング
boolean anyA = names.stream().anyMatch(n -> n.startsWith("A"));  // true
boolean allLong = names.stream().allMatch(n -> n.length() > 2);  // true
boolean noneZ = names.stream().noneMatch(n -> n.startsWith("Z")); // true

// 検索
Optional<String> first = names.stream()
    .filter(n -> n.startsWith("C")).findFirst();  // Optional[Charlie]

// reduce（畳み込み）
int sum = IntStream.rangeClosed(1, 10).reduce(0, Integer::sum);  // 55

String joined = names.stream()
    .reduce("", (a, b) -> a.isEmpty() ? b : a + ", " + b);

// toArray
String[] array = names.stream().toArray(String[]::new);

// min / max
Optional<String> shortest = names.stream()
    .min(Comparator.comparingInt(String::length));

// プリミティブStream
IntStream.rangeClosed(1, 100)
    .filter(n -> n % 2 == 0)
    .average()                   // OptionalDouble[51.0]
    .ifPresent(System.out::println);

IntSummaryStatistics stats = IntStream.of(1, 2, 3, 4, 5)
    .summaryStatistics();
stats.getSum();     // 15
stats.getAverage(); // 3.0
stats.getMax();     // 5
stats.getCount();   // 5`,
      },
    ],
  },
  {
    id: "stream-collectors",
    title: "Collectors",
    category: "streams",
    description: "toList, groupingBy, partitioningBy, joining 等の集約操作",
    sections: [
      {
        title: "Collectorsの活用",
        content:
          "Collectorsクラスは、Streamの結果を様々な形式に集約するファクトリメソッドを提供します。リスト、セット、マップへの変換、グルーピング、パーティション、結合、統計などが可能です。",
        code: `record Employee(String name, String dept, double salary) {}

List<Employee> employees = List.of(
    new Employee("Alice", "Dev", 80000),
    new Employee("Bob", "Dev", 75000),
    new Employee("Charlie", "Sales", 65000),
    new Employee("David", "Sales", 70000),
    new Employee("Eve", "Dev", 90000)
);

// 基本的な Collectors
List<String> names = employees.stream()
    .map(Employee::name)
    .collect(Collectors.toList());

Set<String> depts = employees.stream()
    .map(Employee::dept)
    .collect(Collectors.toSet());

String joined = employees.stream()
    .map(Employee::name)
    .collect(Collectors.joining(", ", "[", "]"));
// "[Alice, Bob, Charlie, David, Eve]"

// groupingBy（グルーピング）
Map<String, List<Employee>> byDept = employees.stream()
    .collect(Collectors.groupingBy(Employee::dept));

// groupingBy + 集計
Map<String, Double> avgSalaryByDept = employees.stream()
    .collect(Collectors.groupingBy(
        Employee::dept,
        Collectors.averagingDouble(Employee::salary)));

Map<String, Long> countByDept = employees.stream()
    .collect(Collectors.groupingBy(
        Employee::dept, Collectors.counting()));

// partitioningBy（2分割）
Map<Boolean, List<Employee>> highEarners = employees.stream()
    .collect(Collectors.partitioningBy(e -> e.salary() > 75000));

// toMap
Map<String, Double> salaryMap = employees.stream()
    .collect(Collectors.toMap(Employee::name, Employee::salary));

// toUnmodifiableList / toUnmodifiableSet (Java 10+)
List<String> immutable = employees.stream()
    .map(Employee::name)
    .collect(Collectors.toUnmodifiableList());`,
      },
    ],
  },
  {
    id: "stream-advanced",
    title: "高度なStream操作",
    category: "streams",
    description: "Optional, 並列ストリーム, Gatherer API (Java 22+)",
    sections: [
      {
        title: "OptionalとStream",
        content:
          "Optionalは値が存在するかしないかを明示的に表すコンテナです。Streamの終端操作（findFirst, min, max, reduce）はOptionalを返します。map, flatMap, filter で連鎖的に操作できます。",
        code: `// Optional の生成
Optional<String> opt = Optional.of("Hello");
Optional<String> empty = Optional.empty();
Optional<String> nullable = Optional.ofNullable(null);

// 値の取得
opt.get();                          // "Hello"（空なら例外）
opt.orElse("default");              // 値 or デフォルト
opt.orElseGet(() -> "computed");    // 値 or 遅延計算
opt.orElseThrow();                  // 値 or NoSuchElementException
opt.orElseThrow(() -> new RuntimeException("not found"));

// 変換と操作
opt.map(String::toUpperCase);       // Optional[HELLO]
opt.filter(s -> s.length() > 3);    // Optional[Hello]
opt.flatMap(s -> Optional.of(s.toLowerCase())); // Optional[hello]
opt.ifPresent(System.out::println); // 存在すれば実行
opt.ifPresentOrElse(                // Java 9+
    s -> System.out.println(s),
    () -> System.out.println("empty"));
opt.isEmpty();                      // false (Java 11+)

// Stream との連携
Optional<String> result = List.of("Alice", "Bob", "Charlie").stream()
    .filter(n -> n.startsWith("D"))
    .findFirst();                   // Optional.empty

// Optional の Stream 変換 (Java 9+)
List<String> values = List.of(
    Optional.of("a"), Optional.empty(), Optional.of("b")
).stream()
    .flatMap(Optional::stream)      // 空を除外
    .toList();                      // [a, b]`,
      },
      {
        title: "並列ストリーム",
        content:
          "parallelStream() で並列処理を行えます。Fork/Joinフレームワークを使い、マルチコアCPUを活用します。ただし、すべての処理で高速化するわけではなく、データ量やオーバーヘッドを考慮する必要があります。",
        code: `// 並列ストリーム
List<Integer> numbers = IntStream.rangeClosed(1, 1_000_000)
    .boxed().toList();

// 逐次処理
long seqSum = numbers.stream()
    .filter(n -> n % 2 == 0)
    .mapToLong(Integer::longValue)
    .sum();

// 並列処理
long parSum = numbers.parallelStream()
    .filter(n -> n % 2 == 0)
    .mapToLong(Integer::longValue)
    .sum();

// 逐次 ↔ 並列の切り替え
numbers.stream()
    .parallel()                      // 並列に切り替え
    .filter(n -> n > 500_000)
    .sequential()                    // 逐次に戻す
    .toList();

// 並列ストリームの注意点
// ✓ 大量データの独立した操作（フィルタ、変換、集計）
// ✗ 少量データ（オーバーヘッドが大きい）
// ✗ 順序依存の操作
// ✗ 共有可変状態へのアクセス
// ✗ I/Oバウンドの処理

// スレッドセーフな集約
Map<Integer, Long> freq = numbers.parallelStream()
    .collect(Collectors.groupingByConcurrent(
        n -> n % 10, Collectors.counting()));`,
      },
    ],
  },
];
