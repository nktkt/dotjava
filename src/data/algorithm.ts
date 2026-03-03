export interface AlgorithmSection {
  title: string;
  content: string;
  code?: string;
}

export interface AlgorithmChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: AlgorithmSection[];
}

export const algorithmCategories = [
  { id: "complexity", name: "計算量・基礎", color: "var(--color-dads-cyan)" },
  { id: "sort", name: "ソート", color: "var(--color-dads-blue)" },
  { id: "search", name: "探索", color: "var(--color-dads-success)" },
  { id: "data-structure", name: "データ構造", color: "var(--color-dads-purple)" },
  { id: "graph", name: "グラフ", color: "var(--color-dads-warning)" },
  { id: "dp", name: "動的計画法", color: "var(--color-dads-error)" },
  { id: "technique", name: "実践テクニック", color: "var(--color-dads-navy)" },
] as const;

export const algorithmChapters: AlgorithmChapter[] = [
  // ===== 計算量・基礎 =====
  {
    id: "big-o",
    title: "計算量と Big-O 記法",
    category: "complexity",
    description: "アルゴリズムの効率を評価する計算量の概念と Big-O 記法を理解する",
    sections: [
      {
        title: "Big-O 記法とは",
        content:
          "Big-O 記法はアルゴリズムの実行時間やメモリ使用量が入力サイズ n に対してどのように増加するかを表す表記法です。定数係数や低次の項を無視し、最も支配的な項だけを残します。O(1) は定数時間、O(n) は線形時間、O(n²) は二次時間を意味します。",
        code: `// 主要な計算量（速い順）
// O(1)       定数時間 — 配列のインデックスアクセス
// O(log n)   対数時間 — 二分探索
// O(n)       線形時間 — 線形探索
// O(n log n) 準線形   — マージソート、Arrays.sort()
// O(n²)      二次時間 — バブルソート、二重ループ
// O(2^n)     指数時間 — 部分集合の全列挙
// O(n!)      階乗時間 — 順列の全列挙

// n = 1,000,000 の場合の概算ステップ数:
// O(log n)   ≈ 20
// O(n)       ≈ 1,000,000
// O(n log n) ≈ 20,000,000
// O(n²)      ≈ 1,000,000,000,000 ← 実用不可`,
      },
      {
        title: "時間計算量の分析",
        content:
          "アルゴリズムの時間計算量を求めるには、基本操作の回数を入力サイズ n の関数として数えます。ループが1つなら O(n)、ネストしたループなら O(n²)、ループ内で半分に分割するなら O(n log n) になります。最悪計算量・平均計算量・最良計算量を区別することも重要です。",
        code: `// O(n) — 単一ループ
int sum = 0;
for (int i = 0; i < n; i++) {
    sum += arr[i];
}

// O(n²) — 二重ループ
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        // n × n 回実行
    }
}

// O(log n) — 半分ずつ縮小
int i = n;
while (i > 1) {
    i = i / 2; // log₂(n) 回実行
}

// O(n log n) — 各段階で n 回の処理を log n 段階
// → マージソート、クイックソート（平均）`,
      },
      {
        title: "空間計算量",
        content:
          "空間計算量はアルゴリズムが使用する追加メモリの量を表します。入力データそのものを除いた補助的なメモリ使用量を評価します。in-place アルゴリズム（追加メモリ O(1)）はメモリ効率が良いです。再帰アルゴリズムではコールスタックの深さも空間計算量に含まれます。",
        code: `// O(1) 空間 — 変数のみ使用（in-place）
void reverse(int[] arr) {
    int left = 0, right = arr.length - 1;
    while (left < right) {
        int tmp = arr[left];
        arr[left++] = arr[right];
        arr[right--] = tmp;
    }
}

// O(n) 空間 — 新しい配列を作成
int[] copy = Arrays.copyOf(arr, arr.length);

// O(n) 空間 — 再帰のコールスタック
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1); // スタック深さ n
}`,
      },
    ],
  },
  {
    id: "recursion",
    title: "再帰とメモ化",
    category: "complexity",
    description: "再帰的思考法、再帰からの脱却（末尾再帰、ループ化）、メモ化による最適化",
    sections: [
      {
        title: "再帰の基本",
        content:
          "再帰はメソッドが自分自身を呼び出す手法です。再帰には「基底条件（ベースケース）」と「再帰ステップ」が必要です。基底条件がないと無限再帰になり StackOverflowError が発生します。問題を同じ構造のより小さな部分問題に分割できる場合に有効です。",
        code: `// フィボナッチ数列（単純再帰）— O(2^n)
int fib(int n) {
    if (n <= 1) return n;         // 基底条件
    return fib(n - 1) + fib(n - 2); // 再帰ステップ
}

// 階乗 — O(n)
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// べき乗（分割統治）— O(log n)
long power(long base, int exp) {
    if (exp == 0) return 1;
    if (exp % 2 == 0) {
        long half = power(base, exp / 2);
        return half * half;
    }
    return base * power(base, exp - 1);
}`,
      },
      {
        title: "メモ化（Memoization）",
        content:
          "メモ化は計算結果をキャッシュして同じ計算の重複を避ける技法です。再帰アルゴリズムで同じ引数に対して何度も呼ばれる場合に劇的な高速化が可能です。フィボナッチの場合、O(2^n) を O(n) に改善できます。HashMap やの配列でキャッシュを管理します。",
        code: `// メモ化フィボナッチ — O(n)
int fib(int n, int[] memo) {
    if (n <= 1) return n;
    if (memo[n] != 0) return memo[n]; // キャッシュヒット
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}

// HashMap を使ったメモ化
Map<String, Integer> cache = new HashMap<>();

int solve(int i, int j) {
    String key = i + "," + j;
    if (cache.containsKey(key)) return cache.get(key);
    // ... 計算 ...
    cache.put(key, result);
    return result;
}`,
      },
      {
        title: "再帰からループへの変換",
        content:
          "再帰はスタックオーバーフローのリスクがあるため、反復（ループ）に変換することが推奨される場合があります。末尾再帰はループに直接変換可能です。また、明示的なスタック（Deque）を使えばあらゆる再帰をループに変換できます。動的計画法のボトムアップ解法も再帰の代替です。",
        code: `// 末尾再帰 → ループ変換
// 再帰版
int gcd(int a, int b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

// ループ版
int gcd(int a, int b) {
    while (b != 0) {
        int tmp = b;
        b = a % b;
        a = tmp;
    }
    return a;
}

// フィボナッチ: 再帰 → ボトムアップ
int fib(int n) {
    if (n <= 1) return n;
    int prev2 = 0, prev1 = 1;
    for (int i = 2; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
      },
    ],
  },

  // ===== ソート =====
  {
    id: "basic-sort",
    title: "基本ソートアルゴリズム",
    category: "sort",
    description: "バブルソート、選択ソート、挿入ソートの仕組みと実装",
    sections: [
      {
        title: "バブルソート",
        content:
          "隣り合う要素を比較・交換しながら、大きい値を末尾に「泡のように浮かべる」アルゴリズムです。最悪・平均計算量は O(n²)、最良計算量は O(n)（既にソート済みの場合）。安定ソートです。実用性は低いですが、アルゴリズムの入門として重要です。",
        code: `void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                swapped = true;
            }
        }
        if (!swapped) break; // 交換なし → ソート完了
    }
}
// 時間: O(n²)  空間: O(1)  安定: ○`,
      },
      {
        title: "選択ソート",
        content:
          "未ソート部分から最小値を見つけて先頭と交換する操作を繰り返します。常に O(n²) の計算量で、入力に依存しません。交換回数が最大 O(n) と少ないのが特徴です。不安定ソートですが、実装が非常にシンプルです。",
        code: `void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        // 最小値を先頭と交換
        int tmp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = tmp;
    }
}
// 時間: O(n²)  空間: O(1)  安定: ×`,
      },
      {
        title: "挿入ソート",
        content:
          "未ソート部分から1つずつ取り出し、ソート済み部分の正しい位置に挿入するアルゴリズムです。ほぼソート済みのデータに対しては O(n) で動作し、非常に効率的です。小さなデータセットや、他のアルゴリズムの部分処理として使われます（TimSort 内部で使用）。",
        code: `void insertionSort(int[] arr) {
    for (int i = 1; i < arr.length; i++) {
        int key = arr[i];
        int j = i - 1;
        // key より大きい要素を右にシフト
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}
// 時間: O(n²) 最良O(n)  空間: O(1)  安定: ○
// ※ Arrays.sort() は小さい区間で挿入ソートを使用`,
      },
    ],
  },
  {
    id: "advanced-sort",
    title: "高速ソートアルゴリズム",
    category: "sort",
    description: "マージソート、クイックソート、Java 標準の Arrays.sort() の仕組み",
    sections: [
      {
        title: "マージソート",
        content:
          "配列を半分に分割し、それぞれを再帰的にソートしてからマージ（統合）するアルゴリズムです。分割統治法の代表例で、常に O(n log n) の計算量を保証します。安定ソートですが、O(n) の追加メモリが必要です。LinkedList のソートに適しています。",
        code: `void mergeSort(int[] arr, int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

void merge(int[] arr, int left, int mid, int right) {
    int[] tmp = new int[right - left + 1];
    int i = left, j = mid + 1, k = 0;

    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) tmp[k++] = arr[i++];
        else                  tmp[k++] = arr[j++];
    }
    while (i <= mid)   tmp[k++] = arr[i++];
    while (j <= right) tmp[k++] = arr[j++];

    System.arraycopy(tmp, 0, arr, left, tmp.length);
}
// 時間: O(n log n)  空間: O(n)  安定: ○`,
      },
      {
        title: "クイックソート",
        content:
          "ピボット（基準値）を選び、ピボットより小さい要素と大きい要素に分割して再帰的にソートします。平均計算量は O(n log n) ですが、最悪は O(n²)（ピボットが最大/最小になる場合）。in-place でソートでき、実務では最も高速なソートの一つです。",
        code: `void quickSort(int[] arr, int low, int high) {
    if (low >= high) return;
    int pivotIdx = partition(arr, low, high);
    quickSort(arr, low, pivotIdx - 1);
    quickSort(arr, pivotIdx + 1, high);
}

int partition(int[] arr, int low, int high) {
    int pivot = arr[high]; // 末尾をピボットに
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
        }
    }
    int tmp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = tmp;
    return i + 1;
}
// 時間: 平均O(n log n) 最悪O(n²)  空間: O(log n)  安定: ×`,
      },
      {
        title: "Java 標準のソート（TimSort）",
        content:
          "Java の Arrays.sort()（オブジェクト型）は TimSort を使用します。挿入ソートとマージソートのハイブリッドで、実データのパターン（既にソートされた区間 = run）を活用して高速化します。プリミティブ型の Arrays.sort() は Dual-Pivot Quicksort を使用します。",
        code: `// オブジェクト型 → TimSort（安定、O(n log n)）
String[] names = {"Charlie", "Alice", "Bob"};
Arrays.sort(names); // [Alice, Bob, Charlie]

// プリミティブ型 → Dual-Pivot Quicksort（不安定、O(n log n)）
int[] nums = {3, 1, 4, 1, 5};
Arrays.sort(nums); // [1, 1, 3, 4, 5]

// カスタム Comparator
List<String> list = List.of("banana", "apple", "cherry");
list.stream()
    .sorted(Comparator.comparingInt(String::length))
    .toList(); // [apple, banana, cherry]

// Collections.sort() も内部的に Arrays.sort() を使用
List<Integer> nums2 = new ArrayList<>(List.of(3, 1, 2));
Collections.sort(nums2);`,
      },
    ],
  },

  // ===== 探索 =====
  {
    id: "linear-binary-search",
    title: "線形探索と二分探索",
    category: "search",
    description: "線形探索の基本と二分探索の仕組み・応用パターン",
    sections: [
      {
        title: "線形探索",
        content:
          "配列の先頭から順に要素を1つずつ比較して目的の値を探す最もシンプルな探索アルゴリズムです。計算量は O(n)。ソートされていないデータにも使えます。Java では indexOf() や contains() が内部で線形探索を行っています。",
        code: `// 線形探索
int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) return i; // 見つかった
    }
    return -1; // 見つからなかった
}

// Java 標準の線形探索
List<String> list = List.of("A", "B", "C");
int idx = list.indexOf("B");       // 1
boolean has = list.contains("C");  // true

// 番兵法（Sentinel Search）— ループ条件を簡略化
int sentinelSearch(int[] arr, int target) {
    int n = arr.length;
    int last = arr[n - 1];
    arr[n - 1] = target; // 番兵を配置
    int i = 0;
    while (arr[i] != target) i++;
    arr[n - 1] = last;   // 元に戻す
    return (i < n - 1 || last == target) ? i : -1;
}`,
      },
      {
        title: "二分探索",
        content:
          "ソート済み配列の中央要素と目標値を比較し、探索範囲を半分に絞り込むアルゴリズムです。計算量は O(log n) で、100万件のデータでも約20回の比較で見つけられます。前提条件として配列がソート済みである必要があります。",
        code: `// 二分探索の実装
int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2; // オーバーフロー防止
        if (arr[mid] == target) return mid;
        else if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1; // 見つからなかった
}

// Java 標準の二分探索
int[] sorted = {1, 3, 5, 7, 9, 11};
int idx = Arrays.binarySearch(sorted, 7);  // 3
// 見つからない場合: -(挿入位置) - 1

// Collections の二分探索
List<Integer> list = List.of(1, 3, 5, 7, 9);
int idx2 = Collections.binarySearch(list, 5); // 2`,
      },
      {
        title: "二分探索の応用（lower_bound / upper_bound）",
        content:
          "二分探索は値の完全一致だけでなく「条件を満たす最小/最大の位置」を求めるのにも使えます。lower_bound（target 以上の最小位置）と upper_bound（target より大きい最小位置）は頻出パターンです。「答えで二分探索」という手法では、最適化問題を判定問題に変換して解けます。",
        code: `// lower_bound: target 以上の最小インデックス
int lowerBound(int[] arr, int target) {
    int left = 0, right = arr.length;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] < target) left = mid + 1;
        else right = mid;
    }
    return left;
}

// upper_bound: target より大きい最小インデックス
int upperBound(int[] arr, int target) {
    int left = 0, right = arr.length;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] <= target) left = mid + 1;
        else right = mid;
    }
    return left;
}

// 活用例: target の出現回数
int count = upperBound(arr, target) - lowerBound(arr, target);`,
      },
    ],
  },

  // ===== データ構造 =====
  {
    id: "stack-queue",
    title: "スタックとキュー",
    category: "data-structure",
    description: "LIFO / FIFO の概念と Java での実装・活用パターン",
    sections: [
      {
        title: "スタック（LIFO）",
        content:
          "スタックは Last-In-First-Out（後入れ先出し）のデータ構造です。push（追加）と pop（取り出し）が O(1)。括弧の対応チェック、深さ優先探索（DFS）、式の評価、Undo 機能などに使われます。Java では Deque（ArrayDeque）をスタックとして使うのが推奨されます。",
        code: `// Java でのスタック実装（ArrayDeque 推奨）
Deque<Integer> stack = new ArrayDeque<>();
stack.push(1);  // [1]
stack.push(2);  // [2, 1]
stack.push(3);  // [3, 2, 1]
stack.pop();    // 3 を取得、[2, 1]
stack.peek();   // 2 を参照（取り出さない）

// 応用: 括弧の対応チェック
boolean isValid(String s) {
    Deque<Character> stack = new ArrayDeque<>();
    for (char c : s.toCharArray()) {
        if (c == '(' || c == '{' || c == '[') {
            stack.push(c);
        } else {
            if (stack.isEmpty()) return false;
            char open = stack.pop();
            if (c == ')' && open != '(') return false;
            if (c == '}' && open != '{') return false;
            if (c == ']' && open != '[') return false;
        }
    }
    return stack.isEmpty();
}`,
      },
      {
        title: "キュー（FIFO）",
        content:
          "キューは First-In-First-Out（先入れ先出し）のデータ構造です。offer（末尾に追加）と poll（先頭から取り出し）が O(1)。幅優先探索（BFS）、タスクスケジューリング、バッファリングに使われます。Java では ArrayDeque または LinkedList を使用します。",
        code: `// Java でのキュー実装
Queue<Integer> queue = new ArrayDeque<>();
queue.offer(1);  // [1]
queue.offer(2);  // [1, 2]
queue.offer(3);  // [1, 2, 3]
queue.poll();    // 1 を取得、[2, 3]
queue.peek();    // 2 を参照

// 優先度付きキュー（ヒープ）
PriorityQueue<Integer> pq = new PriorityQueue<>(); // 最小ヒープ
pq.offer(30);
pq.offer(10);
pq.offer(20);
pq.poll(); // 10（最小値が先に出る）

// 最大ヒープ
PriorityQueue<Integer> maxPQ =
    new PriorityQueue<>(Comparator.reverseOrder());`,
      },
      {
        title: "双方向キュー（Deque）",
        content:
          "Deque（Double-Ended Queue）は両端から追加・削除が可能なデータ構造です。スタックとしてもキューとしても使えます。Java の ArrayDeque は配列ベースの実装で、Stack クラスや LinkedList より高速です。スライディングウィンドウの最大値問題などで活用されます。",
        code: `// Deque の操作
Deque<String> deque = new ArrayDeque<>();

// 先頭への操作
deque.offerFirst("A");  // [A]
deque.offerFirst("B");  // [B, A]
deque.pollFirst();      // B を取得

// 末尾への操作
deque.offerLast("C");   // [A, C]
deque.offerLast("D");   // [A, C, D]
deque.pollLast();       // D を取得

// スタックとして: push/pop（先頭操作）
// キューとして: offer/poll（末尾追加・先頭取得）`,
      },
    ],
  },
  {
    id: "hash-set-map",
    title: "ハッシュテーブル（HashMap / HashSet）",
    category: "data-structure",
    description: "ハッシュの仕組み、衝突解決、HashMap / HashSet の活用パターン",
    sections: [
      {
        title: "ハッシュテーブルの仕組み",
        content:
          "ハッシュテーブルはキーのハッシュ値を使って要素を格納・検索するデータ構造です。平均 O(1) で get/put/contains が可能です。ハッシュ衝突が発生した場合は連結リスト（Java 8 以降は赤黒木）で解決します。負荷係数（load factor）が閾値を超えるとリサイズされます。",
        code: `// HashMap の基本操作 — すべて平均 O(1)
Map<String, Integer> map = new HashMap<>();
map.put("apple", 3);        // 追加
map.get("apple");            // 3（取得）
map.containsKey("apple");   // true
map.getOrDefault("banana", 0); // 0（デフォルト値）
map.remove("apple");        // 削除

// 頻出パターン: 出現回数カウント
Map<Character, Integer> freq = new HashMap<>();
for (char c : str.toCharArray()) {
    freq.merge(c, 1, Integer::sum);
}

// HashSet — 重複排除・存在確認 O(1)
Set<Integer> seen = new HashSet<>();
for (int num : arr) {
    if (!seen.add(num)) {
        System.out.println("重複: " + num);
    }
}`,
      },
      {
        title: "Two Sum パターン",
        content:
          "Two Sum は「配列から合計が target になる2要素のペアを見つける」問題で、HashMap を使ったアルゴリズムの代表例です。要素を走査しながら HashMap に格納し、target - current が既に存在するかを O(1) で確認します。O(n²) の全探索を O(n) に改善できます。",
        code: `// Two Sum: 合計が target になるペアのインデックスを返す
int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[]{map.get(complement), i};
        }
        map.put(nums[i], i);
    }
    return new int[]{};
}

// 例: nums = [2, 7, 11, 15], target = 9
// i=0: complement=7, map={2:0}
// i=1: complement=2, map に 2 がある → [0, 1]`,
      },
      {
        title: "TreeMap と LinkedHashMap",
        content:
          "TreeMap はキーをソート順（赤黒木）で管理し、get/put が O(log n)。範囲検索（subMap、headMap、tailMap）が可能です。LinkedHashMap は挿入順序を保持する HashMap で、LRU キャッシュの実装に使われます。用途に応じて使い分けることが重要です。",
        code: `// TreeMap: ソート順で管理
TreeMap<Integer, String> tree = new TreeMap<>();
tree.put(30, "C"); tree.put(10, "A"); tree.put(20, "B");
tree.firstKey();            // 10（最小キー）
tree.lastKey();             // 30（最大キー）
tree.floorKey(15);          // 10（15以下の最大キー）
tree.ceilingKey(15);        // 20（15以上の最小キー）
tree.subMap(10, true, 25, true); // {10=A, 20=B}

// LinkedHashMap: LRU キャッシュ
class LRUCache<K, V> extends LinkedHashMap<K, V> {
    private final int capacity;
    LRUCache(int capacity) {
        super(capacity, 0.75f, true); // accessOrder=true
        this.capacity = capacity;
    }
    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > capacity;
    }
}`,
      },
    ],
  },
  {
    id: "tree",
    title: "木構造と二分探索木",
    category: "data-structure",
    description: "二分木の走査（前順・中順・後順・レベル順）と二分探索木の操作",
    sections: [
      {
        title: "二分木の表現と走査",
        content:
          "二分木は各ノードが最大2つの子ノード（左・右）を持つ木構造です。走査方法は4種類: 前順（Preorder: 根→左→右）、中順（Inorder: 左→根→右）、後順（Postorder: 左→右→根）、レベル順（BFS）。中順走査で二分探索木のノードをソート順に取得できます。",
        code: `// ノードの定義
class TreeNode {
    int val;
    TreeNode left, right;
    TreeNode(int val) { this.val = val; }
}

// 中順走査（Inorder）— 再帰
void inorder(TreeNode node, List<Integer> result) {
    if (node == null) return;
    inorder(node.left, result);
    result.add(node.val);         // 根の処理
    inorder(node.right, result);
}

// レベル順走査（BFS）
List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new ArrayDeque<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        result.add(level);
    }
    return result;
}`,
      },
      {
        title: "二分探索木（BST）",
        content:
          "二分探索木は「左の子 < 親 < 右の子」という制約を持つ二分木です。探索・挿入・削除が平均 O(log n) で行えます。偏った木では O(n) に退化するため、平衡二分探索木（AVL 木、赤黒木）が使われます。Java の TreeMap/TreeSet は赤黒木で実装されています。",
        code: `// BST の探索
TreeNode search(TreeNode root, int target) {
    if (root == null || root.val == target) return root;
    if (target < root.val) return search(root.left, target);
    return search(root.right, target);
}

// BST への挿入
TreeNode insert(TreeNode root, int val) {
    if (root == null) return new TreeNode(val);
    if (val < root.val) root.left = insert(root.left, val);
    else if (val > root.val) root.right = insert(root.right, val);
    return root;
}

// BST の検証（中順走査で昇順か確認）
boolean isValidBST(TreeNode node, long min, long max) {
    if (node == null) return true;
    if (node.val <= min || node.val >= max) return false;
    return isValidBST(node.left, min, node.val)
        && isValidBST(node.right, node.val, max);
}`,
      },
      {
        title: "ヒープ（優先度付きキュー）",
        content:
          "ヒープは「親 ≤ 子」（最小ヒープ）または「親 ≥ 子」（最大ヒープ）を満たす完全二分木です。最小値/最大値の取得が O(1)、挿入・削除が O(log n)。Java の PriorityQueue は最小ヒープです。Top-K 問題、ダイクストラ法、中央値の計算に活用されます。",
        code: `// Top-K 要素（K 個の最大値を求める）
int[] topK(int[] nums, int k) {
    // 最小ヒープでサイズ k を維持
    PriorityQueue<Integer> pq = new PriorityQueue<>();
    for (int num : nums) {
        pq.offer(num);
        if (pq.size() > k) pq.poll(); // 最小値を除去
    }
    return pq.stream().mapToInt(Integer::intValue).toArray();
}

// 中央値の動的計算（最大ヒープ + 最小ヒープ）
PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Comparator.reverseOrder());
PriorityQueue<Integer> minHeap = new PriorityQueue<>();

void addNum(int num) {
    maxHeap.offer(num);
    minHeap.offer(maxHeap.poll());
    if (minHeap.size() > maxHeap.size()) {
        maxHeap.offer(minHeap.poll());
    }
}

double findMedian() {
    if (maxHeap.size() > minHeap.size()) return maxHeap.peek();
    return (maxHeap.peek() + minHeap.peek()) / 2.0;
}`,
      },
    ],
  },

  // ===== グラフ =====
  {
    id: "graph-basics",
    title: "グラフの基本と探索",
    category: "graph",
    description: "グラフの表現方法、DFS（深さ優先探索）と BFS（幅優先探索）",
    sections: [
      {
        title: "グラフの表現方法",
        content:
          "グラフはノード（頂点）とエッジ（辺）の集合です。表現方法は2つ: 隣接リスト（各ノードの隣接ノードをリストで管理、疎グラフ向け）と隣接行列（2次元配列、密グラフ向け）。Java では隣接リストを Map<Integer, List<Integer>> や List<List<Integer>> で実装します。",
        code: `// 隣接リスト（最も一般的）
Map<Integer, List<Integer>> graph = new HashMap<>();
// 辺の追加（無向グラフ）
void addEdge(int u, int v) {
    graph.computeIfAbsent(u, k -> new ArrayList<>()).add(v);
    graph.computeIfAbsent(v, k -> new ArrayList<>()).add(u);
}

// 隣接リスト（配列版、ノード番号が 0〜n-1 の場合）
List<List<Integer>> graph2 = new ArrayList<>();
for (int i = 0; i < n; i++) graph2.add(new ArrayList<>());
graph2.get(0).add(1); // 0 → 1 の辺

// 隣接行列（密グラフ・重み付きグラフ向け）
int[][] matrix = new int[n][n];
matrix[0][1] = 1; // 0 → 1 の辺（重み 1）`,
      },
      {
        title: "DFS（深さ優先探索）",
        content:
          "DFS は一方向に可能な限り深く探索し、行き止まりになったら戻って別の経路を探索するアルゴリズムです。再帰またはスタックで実装します。経路探索、連結成分の検出、トポロジカルソート、サイクル検出に使われます。計算量は O(V + E)（V: 頂点数、E: 辺数）。",
        code: `// DFS（再帰版）
void dfs(Map<Integer, List<Integer>> graph, int node, Set<Integer> visited) {
    visited.add(node);
    System.out.println("訪問: " + node);
    for (int neighbor : graph.getOrDefault(node, List.of())) {
        if (!visited.contains(neighbor)) {
            dfs(graph, neighbor, visited);
        }
    }
}

// DFS（スタック版）
void dfsIterative(Map<Integer, List<Integer>> graph, int start) {
    Set<Integer> visited = new HashSet<>();
    Deque<Integer> stack = new ArrayDeque<>();
    stack.push(start);
    while (!stack.isEmpty()) {
        int node = stack.pop();
        if (visited.add(node)) {
            System.out.println("訪問: " + node);
            for (int neighbor : graph.getOrDefault(node, List.of())) {
                if (!visited.contains(neighbor)) {
                    stack.push(neighbor);
                }
            }
        }
    }
}`,
      },
      {
        title: "BFS（幅優先探索）",
        content:
          "BFS は開始ノードから近い順に探索するアルゴリズムです。キューを使って実装します。重みなしグラフの最短経路を求めるのに最適です。レベル順走査、最短距離の計算、二部グラフの判定に使われます。計算量は O(V + E)。",
        code: `// BFS（最短距離の計算）
int[] bfs(Map<Integer, List<Integer>> graph, int start, int n) {
    int[] dist = new int[n];
    Arrays.fill(dist, -1);
    Queue<Integer> queue = new ArrayDeque<>();
    queue.offer(start);
    dist[start] = 0;

    while (!queue.isEmpty()) {
        int node = queue.poll();
        for (int neighbor : graph.getOrDefault(node, List.of())) {
            if (dist[neighbor] == -1) { // 未訪問
                dist[neighbor] = dist[node] + 1;
                queue.offer(neighbor);
            }
        }
    }
    return dist; // 各ノードへの最短距離
}

// 2次元グリッドの BFS（迷路の最短経路）
int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};
// queue に (row, col) を入れて4方向に探索`,
      },
    ],
  },
  {
    id: "shortest-path",
    title: "最短経路アルゴリズム",
    category: "graph",
    description: "ダイクストラ法、ベルマンフォード法による重み付きグラフの最短経路",
    sections: [
      {
        title: "ダイクストラ法",
        content:
          "ダイクストラ法は重み付きグラフ（非負の辺のみ）で単一始点最短経路を求めるアルゴリズムです。優先度付きキューを使い、最短距離が確定したノードから順に隣接ノードの距離を更新します。計算量は O((V + E) log V)。カーナビの経路探索などに使われます。",
        code: `// ダイクストラ法
int[] dijkstra(List<List<int[]>> graph, int start, int n) {
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[start] = 0;

    // {距離, ノード} の最小ヒープ
    PriorityQueue<int[]> pq = new PriorityQueue<>(
        Comparator.comparingInt(a -> a[0])
    );
    pq.offer(new int[]{0, start});

    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        int d = curr[0], u = curr[1];
        if (d > dist[u]) continue; // 古い情報はスキップ

        for (int[] edge : graph.get(u)) {
            int v = edge[0], w = edge[1]; // 隣接ノード, 重み
            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                pq.offer(new int[]{dist[v], v});
            }
        }
    }
    return dist;
}`,
      },
      {
        title: "ベルマンフォード法",
        content:
          "ベルマンフォード法は負の辺を含むグラフでも単一始点最短経路を求められるアルゴリズムです。全辺を V-1 回繰り返し緩和します。V 回目でさらに更新があれば負の閉路が存在します。計算量は O(V * E)。為替レートのアービトラージ検出などに使われます。",
        code: `// ベルマンフォード法
int[] bellmanFord(int[][] edges, int n, int start) {
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[start] = 0;

    // V-1 回、全辺を緩和
    for (int i = 0; i < n - 1; i++) {
        for (int[] edge : edges) {
            int u = edge[0], v = edge[1], w = edge[2];
            if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }

    // 負の閉路の検出
    for (int[] edge : edges) {
        int u = edge[0], v = edge[1], w = edge[2];
        if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
            throw new RuntimeException("負の閉路が存在します");
        }
    }
    return dist;
}`,
      },
      {
        title: "ワーシャルフロイド法",
        content:
          "ワーシャルフロイド法は全頂点間の最短経路を求めるアルゴリズムです。3重ループで「経由ノード k を使うとより短くなるか」を全ペアに対して判定します。計算量は O(V³)。頂点数が少ない（数百以下）場合に適しており、実装がシンプルです。",
        code: `// ワーシャルフロイド法
void floydWarshall(int[][] dist, int n) {
    // dist[i][j] = i から j への直接辺の重み
    // 辺がない場合は Integer.MAX_VALUE / 2

    for (int k = 0; k < n; k++) {         // 経由ノード
        for (int i = 0; i < n; i++) {     // 始点
            for (int j = 0; j < n; j++) { // 終点
                if (dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    // dist[i][j] が全頂点間の最短距離
}
// 時間: O(V³)  空間: O(V²)`,
      },
    ],
  },

  // ===== 動的計画法 =====
  {
    id: "dp-basics",
    title: "動的計画法（DP）の基本",
    category: "dp",
    description: "DP の考え方、漸化式の立て方、ナップサック問題・LCS などの典型パターン",
    sections: [
      {
        title: "DP の基本的な考え方",
        content:
          "動的計画法は問題を部分問題に分割し、その結果を表（テーブル）に記録して再利用する手法です。「最適部分構造」（最適解が部分問題の最適解から構成できる）と「重複部分問題」（同じ部分問題が複数回現れる）の2つの性質を持つ問題に適用できます。ボトムアップ（テーブル埋め）とトップダウン（メモ化再帰）の2つのアプローチがあります。",
        code: `// 例: 階段の登り方（1段 or 2段で n 段を登る方法の数）
// dp[i] = i 段目に到達する方法の数
// 漸化式: dp[i] = dp[i-1] + dp[i-2]

int climbStairs(int n) {
    if (n <= 2) return n;
    int[] dp = new int[n + 1];
    dp[1] = 1;
    dp[2] = 2;
    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    return dp[n];
}

// 空間最適化（変数2つで十分）
int climbStairsOptimized(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
      },
      {
        title: "ナップサック問題",
        content:
          "0/1 ナップサック問題は「容量 W のナップサックに、各アイテム（重さ・価値）を入れるか入れないかで価値を最大化する」問題です。dp[i][w] = 最初の i 個のアイテムで容量 w の場合の最大価値。DP の典型問題であり、リソース配分の最適化に広く応用されます。",
        code: `// 0/1 ナップサック問題
int knapsack(int[] weights, int[] values, int W) {
    int n = weights.length;
    int[][] dp = new int[n + 1][W + 1];

    for (int i = 1; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            dp[i][w] = dp[i - 1][w]; // アイテム i を入れない
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(dp[i][w],
                    dp[i - 1][w - weights[i - 1]] + values[i - 1]);
            }
        }
    }
    return dp[n][W];
}

// 空間最適化（1次元 DP）
int knapsackOpt(int[] weights, int[] values, int W) {
    int[] dp = new int[W + 1];
    for (int i = 0; i < weights.length; i++) {
        for (int w = W; w >= weights[i]; w--) { // 逆順！
            dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
        }
    }
    return dp[W];
}`,
      },
      {
        title: "最長共通部分列（LCS）",
        content:
          "LCS は2つの文字列に共通する最長の部分列（連続でなくてよい）の長さを求める問題です。dp[i][j] = s1 の先頭 i 文字と s2 の先頭 j 文字の LCS の長さ。文字が一致すれば dp[i-1][j-1]+1、不一致なら max(dp[i-1][j], dp[i][j-1])。diff ツールやバージョン管理の差分検出に応用されます。",
        code: `// 最長共通部分列（LCS）
int lcs(String s1, String s2) {
    int m = s1.length(), n = s2.length();
    int[][] dp = new int[m + 1][n + 1];

    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    return dp[m][n];
}

// 例: s1 = "ABCBDAB", s2 = "BDCAB"
// LCS = "BCAB" (長さ 4)`,
      },
    ],
  },

  // ===== 実践テクニック =====
  {
    id: "two-pointers",
    title: "二つのポインタとスライディングウィンドウ",
    category: "technique",
    description: "配列・文字列の効率的な処理テクニック",
    sections: [
      {
        title: "二つのポインタ（Two Pointers）",
        content:
          "二つのポインタはソート済み配列や文字列の両端からポインタを動かして問題を解くテクニックです。O(n²) の探索を O(n) に削減できることが多いです。ペアの探索、回文判定、マージ操作、重複除去などに使われます。",
        code: `// ソート済み配列で合計が target になるペアを見つける
int[] twoSumSorted(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) return new int[]{left, right};
        else if (sum < target) left++;
        else right--;
    }
    return new int[]{}; // 見つからない
}

// 回文判定
boolean isPalindrome(String s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        if (s.charAt(left) != s.charAt(right)) return false;
        left++;
        right--;
    }
    return true;
}`,
      },
      {
        title: "スライディングウィンドウ",
        content:
          "スライディングウィンドウは配列/文字列上で固定長または可変長の「窓」をスライドさせて部分列の性質を調べるテクニックです。窓の右端を広げ、条件を満たさなくなったら左端を縮める操作を繰り返します。部分配列の最大和、最長/最短の条件付き部分文字列の計算に使われます。",
        code: `// 固定長ウィンドウ: サイズ k の部分配列の最大合計
int maxSumSubarray(int[] arr, int k) {
    int windowSum = 0;
    for (int i = 0; i < k; i++) windowSum += arr[i];
    int maxSum = windowSum;
    for (int i = k; i < arr.length; i++) {
        windowSum += arr[i] - arr[i - k]; // 右端追加・左端除去
        maxSum = Math.max(maxSum, windowSum);
    }
    return maxSum;
}

// 可変長ウィンドウ: 合計が target 以上の最短部分配列
int minSubArrayLen(int target, int[] nums) {
    int left = 0, sum = 0, minLen = Integer.MAX_VALUE;
    for (int right = 0; right < nums.length; right++) {
        sum += nums[right];
        while (sum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            sum -= nums[left++];
        }
    }
    return minLen == Integer.MAX_VALUE ? 0 : minLen;
}`,
      },
      {
        title: "累積和（Prefix Sum）",
        content:
          "累積和は配列の先頭からの合計を事前計算しておくテクニックです。任意の区間 [l, r] の合計を O(1) で求められます。prefix[r+1] - prefix[l] で計算します。2次元の場合は2次元累積和を使います。区間クエリが頻繁な場合に有効です。",
        code: `// 1次元累積和
int[] prefixSum(int[] arr) {
    int[] prefix = new int[arr.length + 1];
    for (int i = 0; i < arr.length; i++) {
        prefix[i + 1] = prefix[i] + arr[i];
    }
    return prefix;
}

// 区間 [l, r] の合計を O(1) で取得
int rangeSum(int[] prefix, int l, int r) {
    return prefix[r + 1] - prefix[l];
}

// 活用例: 合計が k になる部分配列の数
int subarraySum(int[] nums, int k) {
    Map<Integer, Integer> prefixCount = new HashMap<>();
    prefixCount.put(0, 1);
    int sum = 0, count = 0;
    for (int num : nums) {
        sum += num;
        count += prefixCount.getOrDefault(sum - k, 0);
        prefixCount.merge(sum, 1, Integer::sum);
    }
    return count;
}`,
      },
    ],
  },
  {
    id: "backtracking",
    title: "バックトラッキングと貪欲法",
    category: "technique",
    description: "全探索の効率化（枝刈り）と貪欲法による最適化",
    sections: [
      {
        title: "バックトラッキング",
        content:
          "バックトラッキングは解候補を構築しながら探索し、条件を満たさなくなったら直前の状態に戻る（バックトラック）手法です。全探索を効率化する「枝刈り」とも呼ばれます。順列・組み合わせの列挙、N-Queen 問題、数独、迷路探索などに使われます。",
        code: `// 組み合わせの列挙: n 個から k 個選ぶ
List<List<Integer>> combine(int n, int k) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(result, new ArrayList<>(), 1, n, k);
    return result;
}

void backtrack(List<List<Integer>> result, List<Integer> current,
               int start, int n, int k) {
    if (current.size() == k) {
        result.add(new ArrayList<>(current)); // 解を記録
        return;
    }
    for (int i = start; i <= n; i++) {
        current.add(i);                 // 選択
        backtrack(result, current, i + 1, n, k); // 再帰
        current.remove(current.size() - 1);     // 元に戻す
    }
}

// combine(4, 2) → [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]`,
      },
      {
        title: "貪欲法（Greedy）",
        content:
          "貪欲法は各ステップで局所的に最適な選択をする手法です。全体として最適解になる保証はありませんが、特定の問題では正当性が証明できます。活動選択問題（区間スケジューリング）、ハフマン符号化、最小全域木（クラスカル法）などが代表例です。",
        code: `// 区間スケジューリング問題
// → 重ならない区間を最大何個選べるか
int maxMeetings(int[][] intervals) {
    // 終了時刻でソート
    Arrays.sort(intervals, Comparator.comparingInt(a -> a[1]));

    int count = 1;
    int lastEnd = intervals[0][1];
    for (int i = 1; i < intervals.length; i++) {
        if (intervals[i][0] >= lastEnd) { // 重ならない
            count++;
            lastEnd = intervals[i][1];
        }
    }
    return count;
}

// コイン問題（貪欲が最適な場合）
// 日本の硬貨 [500, 100, 50, 10, 5, 1] ではOK
int minCoins(int amount, int[] coins) {
    Arrays.sort(coins); // 降順にソート
    int count = 0;
    for (int i = coins.length - 1; i >= 0; i--) {
        count += amount / coins[i];
        amount %= coins[i];
    }
    return count;
}`,
      },
      {
        title: "ビット演算テクニック",
        content:
          "ビット演算は整数のビットレベルの操作で、定数倍の高速化や省メモリに役立ちます。XOR を使ったペア検出、ビットマスクによる集合表現、2のべき乗判定などが頻出です。競技プログラミングだけでなく、実務のフラグ管理やパフォーマンス最適化にも使われます。",
        code: `// ビット演算の基本
int a = 5;  // 101
int b = 3;  // 011
a & b;  // 001 (AND)
a | b;  // 111 (OR)
a ^ b;  // 110 (XOR)
~a;     // ...11111010 (NOT)
a << 1; // 1010 (左シフト = ×2)
a >> 1; // 10 (右シフト = ÷2)

// 1つだけ出現する数を見つける（XOR）
int singleNumber(int[] nums) {
    int result = 0;
    for (int num : nums) result ^= num;
    return result; // XOR: a ^ a = 0, a ^ 0 = a
}

// 2のべき乗か判定
boolean isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}

// ビットマスクで部分集合を列挙
for (int mask = 0; mask < (1 << n); mask++) {
    for (int i = 0; i < n; i++) {
        if ((mask & (1 << i)) != 0) {
            // i 番目の要素を選択
        }
    }
}`,
      },
    ],
  },
];
