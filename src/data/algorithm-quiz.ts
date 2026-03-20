export type AlgorithmLevel = "basics" | "sort-search" | "data-structure" | "advanced";

export interface AlgorithmQuizQuestion {
  id: string;
  question: string;
  choices: { label: string; text: string }[];
  correctLabel: string;
  explanation: string;
  code?: string;
  level: AlgorithmLevel;
  chapter: string;
}

export const algorithmQuizQuestions: AlgorithmQuizQuestion[] = [
  // ════════════════════════════════════════
  // basics: アルゴリズムの基礎 4問
  // ════════════════════════════════════════
  {
    id: "algo-basics-q01",
    question: "時間計算量 O(n log n) に該当するアルゴリズムはどれですか？",
    choices: [
      { label: "A", text: "バブルソート" },
      { label: "B", text: "マージソート" },
      { label: "C", text: "線形探索" },
      { label: "D", text: "定数時間のハッシュ検索" },
    ],
    correctLabel: "B",
    explanation:
      "マージソートの平均・最悪時間計算量は O(n log n) です。バブルソートは O(n²)、線形探索は O(n)、ハッシュ検索の平均は O(1) です。マージソートは分割統治法を用いてデータを再帰的に半分に分割し、マージする際に効率的にソートを行います。",
    level: "basics",
    chapter: "algo-basics",
  },
  {
    id: "algo-basics-q02",
    question: "再帰アルゴリズムにおいて「ベースケース」が必要な理由として正しいものはどれですか？",
    choices: [
      { label: "A", text: "処理速度を向上させるため" },
      { label: "B", text: "メモリ使用量を削減するため" },
      { label: "C", text: "無限再帰を防ぎ、再帰を終了させるため" },
      { label: "D", text: "並列処理を可能にするため" },
    ],
    correctLabel: "C",
    explanation:
      "ベースケース（基底条件）は再帰呼び出しを終了させる条件です。ベースケースがないと関数が無限に自分自身を呼び出し続け、最終的にStackOverflowErrorが発生します。再帰アルゴリズムを設計する際は、必ず到達可能なベースケースを定義する必要があります。",
    level: "basics",
    chapter: "algo-basics",
  },
  {
    id: "algo-basics-q03",
    question: "次のコードの時間計算量はどれですか？",
    code: `for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
        System.out.println(i + j);
    }
}`,
    choices: [
      { label: "A", text: "O(n)" },
      { label: "B", text: "O(n log n)" },
      { label: "C", text: "O(n²)" },
      { label: "D", text: "O(2ⁿ)" },
    ],
    correctLabel: "C",
    explanation:
      "外側のループが n 回、内側のループも n 回実行されるため、合計の処理回数は n × n = n² となります。したがって時間計算量は O(n²) です。ネストされたループの計算量は各ループの回数を掛け合わせて求めます。",
    level: "basics",
    chapter: "algo-basics",
  },
  {
    id: "algo-basics-q04",
    question: "空間計算量（スペースコンプレキシティ）が O(1) であるアルゴリズムの特徴はどれですか？",
    choices: [
      { label: "A", text: "入力サイズに比例してメモリを使用する" },
      { label: "B", text: "入力サイズに関係なく一定のメモリで動作する" },
      { label: "C", text: "再帰呼び出しを使用する" },
      { label: "D", text: "追加の配列を必要とする" },
    ],
    correctLabel: "B",
    explanation:
      "空間計算量 O(1) は、入力サイズに関係なく使用するメモリが一定であることを意味します。インプレースアルゴリズム（例：バブルソート）がこれに該当します。追加の配列を確保したり、再帰でスタックフレームを消費するアルゴリズムは O(1) にはなりません。",
    level: "basics",
    chapter: "algo-basics",
  },
  // ════════════════════════════════════════
  // sort-search: ソートと探索 4問
  // ════════════════════════════════════════
  {
    id: "sort-search-q01",
    question: "二分探索を適用するための前提条件はどれですか？",
    choices: [
      { label: "A", text: "データがリンクリストに格納されていること" },
      { label: "B", text: "データがソート済みであること" },
      { label: "C", text: "データが偶数個であること" },
      { label: "D", text: "データにnullが含まれないこと" },
    ],
    correctLabel: "B",
    explanation:
      "二分探索はデータがソート済みであることを前提とします。中央の要素と比較して探索範囲を半分に絞り込むため、データが順序付けられている必要があります。時間計算量は O(log n) で、線形探索の O(n) より効率的です。",
    level: "sort-search",
    chapter: "sort-search",
  },
  {
    id: "sort-search-q02",
    question: "クイックソートの最悪時間計算量と、それが発生する条件の組み合わせとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "O(n log n) — データがランダムな場合" },
      { label: "B", text: "O(n²) — ピボットが常に最小または最大値の場合" },
      { label: "C", text: "O(n) — データがすでにソート済みの場合" },
      { label: "D", text: "O(n²) — データに重複がある場合" },
    ],
    correctLabel: "B",
    explanation:
      "クイックソートの最悪時間計算量は O(n²) で、ピボットが常に最小または最大の要素に選ばれた場合に発生します。この場合、分割が偏り、一方のサブ配列が空になるため効率が低下します。ランダムなピボット選択やmedian-of-threeなどの手法で回避できます。",
    level: "sort-search",
    chapter: "sort-search",
  },
  {
    id: "sort-search-q03",
    question: "安定ソート（stable sort）の説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "常に O(n log n) で動作するソート" },
      { label: "B", text: "同じ値の要素の相対的な順序がソート後も保持されるソート" },
      { label: "C", text: "メモリを追加で使用しないソート" },
      { label: "D", text: "入力データに依存せず同じ性能を発揮するソート" },
    ],
    correctLabel: "B",
    explanation:
      "安定ソートとは、同じキー値を持つ要素の相対的な順序がソート前後で変わらないソートアルゴリズムです。マージソート、挿入ソート、バブルソートは安定ソートです。クイックソートやヒープソートは一般的に不安定ソートです。",
    level: "sort-search",
    chapter: "sort-search",
  },
  {
    id: "sort-search-q04",
    question: "JavaのArrays.sort()メソッドについて正しい説明はどれですか？",
    choices: [
      { label: "A", text: "常にクイックソートを使用する" },
      { label: "B", text: "プリミティブ型にはDual-Pivot Quicksort、オブジェクト型にはTimSortを使用する" },
      { label: "C", text: "常にマージソートを使用する" },
      { label: "D", text: "データサイズに関係なく同じアルゴリズムを使用する" },
    ],
    correctLabel: "B",
    explanation:
      "JavaのArrays.sort()はプリミティブ型配列にはDual-Pivot Quicksortを、オブジェクト型配列にはTimSort（マージソートと挿入ソートのハイブリッド）を使用します。オブジェクト型に安定ソートを使うのは、等しい要素の順序保持が重要だからです。",
    level: "sort-search",
    chapter: "sort-search",
  },
  // ════════════════════════════════════════
  // data-structure: データ構造 4問
  // ════════════════════════════════════════
  {
    id: "data-structure-q01",
    question: "ハッシュマップ（HashMap）の平均的な検索・挿入・削除の時間計算量はどれですか？",
    choices: [
      { label: "A", text: "O(1)" },
      { label: "B", text: "O(log n)" },
      { label: "C", text: "O(n)" },
      { label: "D", text: "O(n log n)" },
    ],
    correctLabel: "A",
    explanation:
      "ハッシュマップはハッシュ関数を使ってキーからインデックスを計算するため、平均的な検索・挿入・削除は O(1) です。ただし、ハッシュ衝突が多い最悪のケースでは O(n) になります。Java 8以降ではチェインが長くなると赤黒木に変換され、最悪でも O(log n) になります。",
    level: "data-structure",
    chapter: "data-structure",
  },
  {
    id: "data-structure-q02",
    question: "スタック（Stack）のデータ操作方式として正しいものはどれですか？",
    choices: [
      { label: "A", text: "FIFO（先入れ先出し）" },
      { label: "B", text: "LIFO（後入れ先出し）" },
      { label: "C", text: "ランダムアクセス" },
      { label: "D", text: "優先度順" },
    ],
    correctLabel: "B",
    explanation:
      "スタックはLIFO（Last In, First Out）方式のデータ構造です。最後に追加された要素が最初に取り出されます。メソッド呼び出しのコールスタック、ブラウザの戻る機能、式の評価（逆ポーランド記法）などで使用されます。FIFOはキュー（Queue）の方式です。",
    level: "data-structure",
    chapter: "data-structure",
  },
  {
    id: "data-structure-q03",
    question: "二分探索木（BST）において、要素の挿入・検索の平均時間計算量はどれですか？",
    choices: [
      { label: "A", text: "O(1)" },
      { label: "B", text: "O(log n)" },
      { label: "C", text: "O(n)" },
      { label: "D", text: "O(n²)" },
    ],
    correctLabel: "B",
    explanation:
      "平衡な二分探索木では、各操作で木の高さ分だけ走査するため、平均時間計算量は O(log n) です。ただし、偏った木（例：ソート済みデータを順に挿入した場合）では最悪 O(n) になります。AVL木や赤黒木は平衡を保つことで最悪でも O(log n) を保証します。",
    level: "data-structure",
    chapter: "data-structure",
  },
  {
    id: "data-structure-q04",
    question: "JavaのLinkedListとArrayListの比較として正しいものはどれですか？",
    choices: [
      { label: "A", text: "LinkedListはインデックスによるランダムアクセスが O(1) である" },
      { label: "B", text: "ArrayListは先頭への挿入が O(1) である" },
      { label: "C", text: "LinkedListは先頭・末尾への挿入が O(1) で、ArrayListはランダムアクセスが O(1) である" },
      { label: "D", text: "両者の性能はすべての操作で同じである" },
    ],
    correctLabel: "C",
    explanation:
      "LinkedListは双方向リンクリストであり、先頭・末尾への挿入は O(1) ですが、ランダムアクセスは O(n) です。ArrayListは内部で配列を使用しており、インデックスによるランダムアクセスは O(1) ですが、先頭への挿入は要素のシフトが必要なため O(n) です。",
    level: "data-structure",
    chapter: "data-structure",
  },
  // ════════════════════════════════════════
  // advanced: 高度なアルゴリズム 3問
  // ════════════════════════════════════════
  {
    id: "advanced-q01",
    question: "動的計画法（DP）の基本的な考え方として正しいものはどれですか？",
    choices: [
      { label: "A", text: "問題をランダムに分割して並列処理する" },
      { label: "B", text: "部分問題の解をメモ化し、重複計算を避けて最適解を求める" },
      { label: "C", text: "常に貪欲法で局所最適解を選択する" },
      { label: "D", text: "すべての組み合わせを全探索する" },
    ],
    correctLabel: "B",
    explanation:
      "動的計画法は、問題を部分問題に分割し、各部分問題の解をテーブルやメモに保存（メモ化）することで重複計算を回避します。最適部分構造と重複する部分問題という2つの性質を持つ問題に適用できます。フィボナッチ数列、ナップサック問題、最長共通部分列などが代表的な応用例です。",
    level: "advanced",
    chapter: "advanced",
  },
  {
    id: "advanced-q02",
    question: "ダイクストラ法（Dijkstra's Algorithm）の説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "負の重みを持つ辺があるグラフでも正しく動作する" },
      { label: "B", text: "非負の重みを持つグラフにおいて、単一始点最短経路を求めるアルゴリズムである" },
      { label: "C", text: "すべての頂点間の最短経路を同時に求める" },
      { label: "D", text: "深さ優先探索（DFS）を基にしたアルゴリズムである" },
    ],
    correctLabel: "B",
    explanation:
      "ダイクストラ法は非負の重み付きグラフにおいて、ある始点から他のすべての頂点への最短経路を求めるアルゴリズムです。優先度付きキューを使った実装で O(E log V) の時間計算量を持ちます。負の重みがある場合はベルマンフォード法を使用します。",
    level: "advanced",
    chapter: "advanced",
  },
  {
    id: "advanced-q03",
    question: "グラフの幅優先探索（BFS）の特徴として正しいものはどれですか？",
    choices: [
      { label: "A", text: "スタックを使用して実装する" },
      { label: "B", text: "重み付きグラフの最短経路を求めるのに適している" },
      { label: "C", text: "キューを使用し、重みなしグラフの最短経路を求めるのに適している" },
      { label: "D", text: "探索順序は深い頂点を優先する" },
    ],
    correctLabel: "C",
    explanation:
      "BFS（幅優先探索）はキューを使用して実装し、始点に近い頂点から順に探索します。重みなしグラフにおいて最短経路（最小ホップ数）を求めるのに適しています。スタックを使うのはDFS（深さ優先探索）です。重み付きグラフの最短経路にはダイクストラ法を使います。",
    level: "advanced",
    chapter: "advanced",
  },
];
