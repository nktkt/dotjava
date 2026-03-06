export interface CppLangSection {
  title: string;
  content: string;
  code?: string;
}

export interface CppLangChapter {
  id: string;
  title: string;
  description: string;
  category: string;
  sections: CppLangSection[];
}

export interface CppLangCategory {
  id: string;
  name: string;
  color: string;
}

export const cppLangCategories: CppLangCategory[] = [
  { id: "basics", name: "基礎文法", color: "var(--color-dads-cyan)" },
  { id: "intermediate", name: "中級", color: "var(--color-dads-blue)" },
  { id: "advanced", name: "上級", color: "var(--color-dads-purple)" },
  { id: "expert", name: "実践・応用", color: "var(--color-dads-success)" },
];

export const cppLangChapters: CppLangChapter[] = [
  // ── 基礎文法 ──
  {
    id: "hello-world",
    title: "はじめてのC++",
    description: "環境構築、コンパイル、main関数、cout/cin、名前空間",
    category: "basics",
    sections: [
      {
        title: "環境構築とコンパイル",
        content:
          "C++プログラムの開発にはコンパイラが必要です。GCC(g++)、Clang(clang++)、MSVC(Visual Studio)が代表的です。ソースファイルの拡張子は.cppが一般的で、g++ hello.cpp -o helloでコンパイルし、./helloで実行します。C++はC言語を拡張した言語で、オブジェクト指向やテンプレートなどの機能を持ちます。",
        code: `// hello.cpp — はじめてのC++プログラム
#include <iostream>

int main() {
    std::cout << "Hello, C++!" << std::endl;
    return 0;
}

// コンパイルと実行:
// $ g++ -std=c++17 hello.cpp -o hello
// $ ./hello
// Hello, C++!`,
      },
      {
        title: "cout/cinによる入出力",
        content:
          "C++ではiostreamヘッダのstd::coutで出力、std::cinで入力を行います。<<は出力演算子（挿入演算子）、>>は入力演算子（抽出演算子）です。printfと異なり型を自動判別するため書式指定子が不要です。std::endlは改行とフラッシュ、'\\n'は改行のみです。",
        code: `#include <iostream>
#include <string>

int main() {
    // 出力
    int age = 25;
    double height = 175.5;
    std::string name = "太郎";

    std::cout << "名前: " << name << std::endl;
    std::cout << "年齢: " << age << "歳" << std::endl;
    std::cout << "身長: " << height << "cm" << '\\n';

    // 入力
    std::cout << "名前を入力: ";
    std::string input;
    std::getline(std::cin, input); // スペース含む行全体を読む
    std::cout << "こんにちは、" << input << "さん！" << std::endl;

    return 0;
}`,
      },
      {
        title: "名前空間（namespace）",
        content:
          "名前空間は識別子の衝突を防ぐ仕組みです。標準ライブラリはstd名前空間に属します。using namespace std;で省略可能ですが、大規模プロジェクトでは名前衝突の原因になるため、std::coutのように明示的に使うか、using std::cout;のように個別にインポートするのが推奨です。",
        code: `#include <iostream>

// 独自の名前空間
namespace math {
    double pi = 3.14159265;
    double area(double r) { return pi * r * r; }
}

namespace physics {
    double pi = 3.14159; // 別の名前空間なので衝突しない
}

// ネストされた名前空間（C++17）
namespace company::project::module {
    void func() { std::cout << "ネスト名前空間" << std::endl; }
}

int main() {
    // 完全修飾名
    std::cout << "円の面積: " << math::area(5.0) << std::endl;

    // using宣言（個別インポート）
    using std::cout;
    using std::endl;
    cout << "math::pi = " << math::pi << endl;

    company::project::module::func();
    return 0;
}`,
      },
    ],
  },
  {
    id: "variables-types",
    title: "変数とデータ型",
    description: "基本型、auto、const、constexpr、型推論、enum class",
    category: "basics",
    sections: [
      {
        title: "基本データ型とauto",
        content:
          "C++はC言語の型に加え、bool型（true/false）が正式にサポートされています。auto キーワード（C++11）は初期化式から型を自動推論します。コードの簡潔さと保守性が向上しますが、型が不明確になる場合は明示的な型宣言が推奨です。decltype は式の型を取得します。",
        code: `#include <iostream>
#include <vector>
#include <typeinfo>

int main() {
    // 基本型
    bool flag = true;
    int count = 42;
    double pi = 3.14159;
    char ch = 'A';

    // auto型推論（C++11）
    auto x = 10;          // int
    auto y = 3.14;        // double
    auto s = std::string("Hello"); // std::string
    auto v = std::vector<int>{1, 2, 3};

    // decltype: 式の型を取得
    decltype(x) z = 20;   // xと同じ型（int）

    std::cout << std::boolalpha; // truefalse表示
    std::cout << "flag = " << flag << std::endl;
    std::cout << "auto x = " << x << std::endl;
    std::cout << "vector size = " << v.size() << std::endl;

    return 0;
}`,
      },
      {
        title: "const と constexpr",
        content:
          "constは変数を変更不可にする修飾子です。constexpr（C++11）はコンパイル時に値が確定する定数を定義し、コンパイル時計算を可能にします。constは実行時定数、constexprはコンパイル時定数という違いがあります。constexpr関数はコンパイル時にも実行時にも呼び出せます。",
        code: `#include <iostream>

// constexpr関数: コンパイル時に計算可能
constexpr int factorial(int n) {
    return (n <= 1) ? 1 : n * factorial(n - 1);
}

constexpr double PI = 3.14159265;
constexpr int MAX_SIZE = 100;

int main() {
    const int runtime_val = 42; // 実行時定数

    // コンパイル時に計算される
    constexpr int fact5 = factorial(5); // 120
    static_assert(fact5 == 120, "5! should be 120");

    // constexpr配列
    constexpr int arr[] = {1, 2, 3, 4, 5};
    constexpr int sum = arr[0] + arr[1] + arr[2];

    std::cout << "5! = " << fact5 << std::endl;
    std::cout << "PI = " << PI << std::endl;
    std::cout << "sum = " << sum << std::endl;

    return 0;
}`,
      },
      {
        title: "enum classと型安全",
        content:
          "enum class（スコープ付き列挙型、C++11）は従来のenumを改良し、型安全性とスコープを提供します。暗黙の整数変換がなく、列挙子は列挙型名でスコープされます。基底型の指定も可能です。従来のenumはグローバルスコープに列挙子を公開し、暗黙的にintに変換されるため推奨されません。",
        code: `#include <iostream>
#include <cstdint>

// enum class（推奨）
enum class Color : uint8_t {
    Red = 1,
    Green = 2,
    Blue = 3
};

enum class Direction {
    North, South, East, West
};

// 従来のenum（非推奨）
// enum OldColor { Red, Green, Blue }; // グローバルに公開される

std::string color_name(Color c) {
    switch (c) {
        case Color::Red:   return "赤";
        case Color::Green: return "緑";
        case Color::Blue:  return "青";
        default:           return "不明";
    }
}

int main() {
    Color c = Color::Red;
    Direction d = Direction::North;

    // 型安全: Color同士しか比較できない
    if (c == Color::Red) {
        std::cout << color_name(c) << std::endl;
    }

    // 明示的キャストが必要
    int val = static_cast<int>(c);
    std::cout << "値: " << val << std::endl;

    return 0;
}`,
      },
    ],
  },
  {
    id: "control-flow",
    title: "制御構文",
    description: "if-else、switch、for、while、範囲for、if初期化文",
    category: "basics",
    sections: [
      {
        title: "条件分岐とC++17拡張",
        content:
          "C++のif/switchはC言語と同様ですが、C++17ではif文とswitch文に初期化文を追加できます。if (auto it = m.find(key); it != m.end())のようにスコープを限定した変数宣言が可能です。また、if constexpr（C++17）はコンパイル時条件分岐を行い、テンプレートでの分岐に有用です。",
        code: `#include <iostream>
#include <map>
#include <string>

int main() {
    // C++17: if初期化文
    std::map<std::string, int> scores = {
        {"太郎", 90}, {"花子", 85}
    };
    if (auto it = scores.find("太郎"); it != scores.end()) {
        std::cout << it->first << ": " << it->second << std::endl;
    }

    // C++17: switch初期化文
    switch (int val = 42; val % 3) {
        case 0: std::cout << "3の倍数" << std::endl; break;
        case 1: std::cout << "余り1" << std::endl; break;
        default: std::cout << "余り2" << std::endl; break;
    }

    // 構造化束縛 + if初期化文
    if (auto [it, success] = scores.insert({"次郎", 78}); success) {
        std::cout << "挿入成功: " << it->second << std::endl;
    }

    return 0;
}`,
      },
      {
        title: "範囲forループ",
        content:
          "範囲forループ（C++11）はコンテナや配列の全要素を簡潔に走査します。for (auto& elem : container)の形式で、イテレータやインデックスの管理が不要です。const auto&で読み取り専用、auto&で変更可能、auto&&で完全転送を行います。初期化リストやカスタムコンテナにも使えます。",
        code: `#include <iostream>
#include <vector>
#include <map>

int main() {
    std::vector<int> nums = {1, 2, 3, 4, 5};

    // 範囲for（読み取り専用）
    for (const auto& n : nums) {
        std::cout << n << " ";
    }
    std::cout << std::endl;

    // 範囲for（変更あり）
    for (auto& n : nums) {
        n *= 2;
    }

    // C++20: 範囲forに初期化文
    // for (auto v = get_data(); auto& e : v) { ... }

    // mapの範囲for + 構造化束縛
    std::map<std::string, int> ages = {{"Alice", 25}, {"Bob", 30}};
    for (const auto& [name, age] : ages) {
        std::cout << name << ": " << age << "歳" << std::endl;
    }

    // 初期化リストで直接
    for (auto x : {10, 20, 30}) {
        std::cout << x << " ";
    }
    std::cout << std::endl;

    return 0;
}`,
      },
      {
        title: "ループとアルゴリズムの選択",
        content:
          "C++ではfor/whileループの代わりにSTLアルゴリズム（std::for_each, std::transform等）を使うとより宣言的で安全なコードが書けます。従来のforはインデックスが必要な場合に、範囲forは全要素走査に、STLアルゴリズムは変換・フィルタ等に使い分けます。",
        code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>

int main() {
    std::vector<int> v = {5, 3, 8, 1, 9, 2, 7};

    // 従来のforループ
    for (size_t i = 0; i < v.size(); ++i) {
        // インデックスが必要な場合
    }

    // STLアルゴリズム
    std::sort(v.begin(), v.end());
    std::cout << "ソート後: ";
    std::for_each(v.begin(), v.end(),
        [](int n) { std::cout << n << " "; });
    std::cout << std::endl;

    // 合計
    int sum = std::accumulate(v.begin(), v.end(), 0);
    std::cout << "合計: " << sum << std::endl;

    // 条件カウント
    auto count = std::count_if(v.begin(), v.end(),
        [](int n) { return n > 5; });
    std::cout << "5超の個数: " << count << std::endl;

    return 0;
}`,
      },
    ],
  },
  {
    id: "functions",
    title: "関数",
    description: "オーバーロード、デフォルト引数、参照渡し、インライン・constexpr関数",
    category: "basics",
    sections: [
      {
        title: "関数オーバーロードとデフォルト引数",
        content:
          "C++では同じ名前で引数の型や数が異なる関数を定義できます（オーバーロード）。コンパイラが呼び出し時の引数から最適な関数を選びます。デフォルト引数を使うと、引数を省略した場合にデフォルト値が使われます。デフォルト引数は右端から指定する必要があります。",
        code: `#include <iostream>
#include <string>

// 関数オーバーロード
void print(int x)    { std::cout << "int: " << x << std::endl; }
void print(double x) { std::cout << "double: " << x << std::endl; }
void print(const std::string& x) { std::cout << "string: " << x << std::endl; }

// デフォルト引数
std::string greet(const std::string& name, const std::string& greeting = "こんにちは") {
    return greeting + "、" + name + "さん！";
}

// テンプレートとオーバーロードの組み合わせ
template<typename T>
T max_of(T a, T b) { return (a > b) ? a : b; }

int main() {
    print(42);
    print(3.14);
    print(std::string("Hello"));

    std::cout << greet("太郎") << std::endl;
    std::cout << greet("花子", "おはよう") << std::endl;

    std::cout << max_of(3, 7) << std::endl;
    std::cout << max_of(3.14, 2.72) << std::endl;
    return 0;
}`,
      },
      {
        title: "参照渡しとconst参照",
        content:
          "C++の参照（&）はポインタより安全なエイリアスです。関数の引数を参照渡しすると、コピーを避けて効率的にデータを受け渡せます。const参照（const T&）は変更を防ぎつつコピーコストを避ける推奨パターンです。右辺値参照（T&&）はムーブセマンティクスに使われます。",
        code: `#include <iostream>
#include <string>
#include <vector>

// 値渡し（コピーが発生）
void by_value(std::string s) { s += "!"; }

// 参照渡し（変更可能）
void by_ref(std::string& s) { s += "!"; }

// const参照渡し（読み取り専用、コピーなし）
void by_const_ref(const std::string& s) {
    std::cout << s << " (長さ: " << s.size() << ")" << std::endl;
}

// 複数の値を返す（構造化束縛で受け取り）
std::pair<int, int> min_max(const std::vector<int>& v) {
    int mn = v[0], mx = v[0];
    for (const auto& x : v) {
        if (x < mn) mn = x;
        if (x > mx) mx = x;
    }
    return {mn, mx};
}

int main() {
    std::string s = "Hello";
    by_value(s);
    std::cout << s << std::endl; // "Hello"（変更されない）
    by_ref(s);
    std::cout << s << std::endl; // "Hello!"（変更される）
    by_const_ref(s);

    auto [lo, hi] = min_max({5, 2, 8, 1, 9});
    std::cout << "min=" << lo << " max=" << hi << std::endl;
    return 0;
}`,
      },
      {
        title: "インライン関数とconstexpr関数",
        content:
          "inline関数はコンパイラに関数の展開を提案し、呼び出しオーバーヘッドを削減します。constexpr関数（C++11）はコンパイル時に評価可能な関数で、定数式として使えます。C++14以降ではconstexpr関数にループや変数宣言も使えます。C++20のconsteval関数は必ずコンパイル時に評価されます。",
        code: `#include <iostream>
#include <array>

// inline関数
inline int square(int x) { return x * x; }

// constexpr関数（コンパイル時計算）
constexpr int fibonacci(int n) {
    if (n <= 1) return n;
    int a = 0, b = 1;
    for (int i = 2; i <= n; ++i) {
        int tmp = a + b;
        a = b;
        b = tmp;
    }
    return b;
}

// constexprクラス（C++14）
constexpr auto make_table() {
    std::array<int, 10> table{};
    for (int i = 0; i < 10; ++i) {
        table[i] = i * i;
    }
    return table;
}

int main() {
    std::cout << square(5) << std::endl;

    // コンパイル時に計算
    constexpr int fib10 = fibonacci(10);
    static_assert(fib10 == 55);
    std::cout << "fib(10) = " << fib10 << std::endl;

    constexpr auto squares = make_table();
    for (auto x : squares) std::cout << x << " ";
    std::cout << std::endl;
    return 0;
}`,
      },
    ],
  },
  {
    id: "strings-arrays",
    title: "文字列と配列",
    description: "std::string、std::array、std::vector、イテレータ、string_view",
    category: "basics",
    sections: [
      {
        title: "std::stringと文字列操作",
        content:
          "std::stringはC++の標準文字列クラスで、Cの文字配列より安全で便利です。メモリ管理が自動化され、+演算子による連結、size()、substr()、find()などのメソッドが使えます。C++17のstd::string_viewはコピーなしの読み取り専用参照で、パフォーマンス向上に有効です。",
        code: `#include <iostream>
#include <string>
#include <string_view>

// string_viewで効率的な文字列受け渡し
void print_info(std::string_view sv) {
    std::cout << sv << " (長さ: " << sv.size() << ")" << std::endl;
}

int main() {
    std::string s1 = "Hello";
    std::string s2 = "World";

    // 連結
    std::string s3 = s1 + ", " + s2 + "!";
    std::cout << s3 << std::endl;

    // 検索と部分文字列
    auto pos = s3.find("World");
    if (pos != std::string::npos) {
        std::cout << "位置: " << pos << std::endl;
        std::cout << "部分: " << s3.substr(pos, 5) << std::endl;
    }

    // C++20: starts_with / ends_with
    // if (s3.starts_with("Hello")) { ... }

    // string_view（コピーなし）
    print_info(s3);
    print_info("リテラルも直接渡せる");

    return 0;
}`,
      },
      {
        title: "std::arrayとstd::vector",
        content:
          "std::array（C++11）は固定長配列のラッパーで、サイズ情報を保持し安全です。std::vectorは可変長配列で、push_back()で要素を追加し、自動的にメモリを管理します。vectorは最もよく使われるコンテナで、連続メモリ配置によりキャッシュ効率が高いです。",
        code: `#include <iostream>
#include <array>
#include <vector>
#include <algorithm>

int main() {
    // std::array（固定長）
    std::array<int, 5> arr = {5, 3, 1, 4, 2};
    std::sort(arr.begin(), arr.end());
    std::cout << "array size: " << arr.size() << std::endl;

    // std::vector（可変長）
    std::vector<int> vec = {10, 20, 30};
    vec.push_back(40);
    vec.emplace_back(50); // 直接構築（効率的）

    // 初期化方法
    std::vector<int> zeros(10, 0);       // 10個の0
    std::vector<int> range = {1, 2, 3};  // 初期化リスト

    // 要素アクセス
    std::cout << "vec[0] = " << vec[0] << std::endl;
    std::cout << "vec.at(1) = " << vec.at(1) << std::endl; // 境界チェック付き
    std::cout << "front = " << vec.front() << std::endl;
    std::cout << "back = " << vec.back() << std::endl;

    // 容量管理
    std::cout << "size: " << vec.size() << std::endl;
    std::cout << "capacity: " << vec.capacity() << std::endl;

    return 0;
}`,
      },
      {
        title: "イテレータ",
        content:
          "イテレータはコンテナの要素を順にアクセスするための抽象化です。begin()/end()でイテレータ範囲を取得し、++で次の要素に進み、*で値にアクセスします。STLアルゴリズムはイテレータを使って動作するため、コンテナの種類に依存しない汎用的なコードが書けます。",
        code: `#include <iostream>
#include <vector>
#include <list>
#include <algorithm>

int main() {
    std::vector<int> v = {5, 2, 8, 1, 9};

    // イテレータによる走査
    for (auto it = v.begin(); it != v.end(); ++it) {
        std::cout << *it << " ";
    }
    std::cout << std::endl;

    // 逆イテレータ
    for (auto rit = v.rbegin(); rit != v.rend(); ++rit) {
        std::cout << *rit << " ";
    }
    std::cout << std::endl;

    // constイテレータ（変更不可）
    for (auto cit = v.cbegin(); cit != v.cend(); ++cit) {
        std::cout << *cit << " ";
    }
    std::cout << std::endl;

    // イテレータでSTLアルゴリズム
    auto it = std::find(v.begin(), v.end(), 8);
    if (it != v.end()) {
        std::cout << "8の位置: " << std::distance(v.begin(), it) << std::endl;
    }

    // eraseイディオム
    v.erase(std::remove_if(v.begin(), v.end(),
        [](int n) { return n < 5; }), v.end());

    return 0;
}`,
      },
    ],
  },
  // ── 中級 ──
  {
    id: "classes",
    title: "クラスとオブジェクト",
    description: "コンストラクタ、デストラクタ、アクセス修飾子、コピー制御",
    category: "intermediate",
    sections: [
      {
        title: "クラスの基礎",
        content:
          "C++のクラスはデータ（メンバ変数）と操作（メンバ関数）をカプセル化します。アクセス修飾子public/private/protectedでアクセス範囲を制御します。structはデフォルトpublic、classはデフォルトprivateです。thisポインタは自オブジェクトを指し、メンバ関数内で使用できます。",
        code: `#include <iostream>
#include <string>

class Person {
private:
    std::string name_;
    int age_;

public:
    // コンストラクタ
    Person(const std::string& name, int age)
        : name_(name), age_(age) {}  // メンバ初期化リスト

    // ゲッター
    const std::string& name() const { return name_; }
    int age() const { return age_; }

    // メソッド
    void greet() const {
        std::cout << "こんにちは、" << name_ << "（" << age_ << "歳）です" << std::endl;
    }

    // メソッドチェーン
    Person& set_age(int age) {
        age_ = age;
        return *this; // 自身の参照を返す
    }
};

int main() {
    Person p("太郎", 25);
    p.greet();
    p.set_age(26).greet(); // メソッドチェーン
    return 0;
}`,
      },
      {
        title: "コンストラクタとデストラクタ",
        content:
          "コンストラクタはオブジェクト生成時に呼ばれ、初期化を行います。デフォルト/引数付き/コピー/ムーブコンストラクタがあります。メンバ初期化リストは直接初期化を行い効率的です。デストラクタはオブジェクト破棄時に呼ばれ、リソースの解放に使います。",
        code: `#include <iostream>
#include <string>

class Resource {
    std::string name_;
    int* data_;

public:
    // デフォルトコンストラクタ
    Resource() : name_("default"), data_(nullptr) {
        std::cout << "デフォルト構築: " << name_ << std::endl;
    }

    // 引数付きコンストラクタ
    explicit Resource(const std::string& name, int size)
        : name_(name), data_(new int[size]{}) {
        std::cout << "構築: " << name_ << std::endl;
    }

    // デストラクタ
    ~Resource() {
        delete[] data_;
        std::cout << "破棄: " << name_ << std::endl;
    }

    // コピー禁止（後の章で詳述）
    Resource(const Resource&) = delete;
    Resource& operator=(const Resource&) = delete;
};

int main() {
    Resource r1;                          // デフォルト
    Resource r2("リソースA", 10);          // 引数付き
    {
        Resource r3("リソースB", 5);       // スコープ内
    } // r3のデストラクタが呼ばれる
    std::cout << "--- main終了 ---" << std::endl;
    return 0;
} // r2, r1の順にデストラクタが呼ばれる`,
      },
      {
        title: "staticメンバとフレンド",
        content:
          "staticメンバ変数はクラスの全インスタンスで共有される変数です。staticメンバ関数はインスタンスなしで呼び出せ、thisポインタを持ちません。friend宣言は他のクラスや関数にprivateメンバへのアクセスを許可します。演算子オーバーロードでfriendが使われることが多いです。",
        code: `#include <iostream>
#include <string>

class Counter {
    static int total_count_; // 全インスタンス共有
    int id_;

    friend std::ostream& operator<<(std::ostream& os, const Counter& c);

public:
    Counter() : id_(++total_count_) {
        std::cout << "Counter#" << id_ << " 作成" << std::endl;
    }

    ~Counter() {
        std::cout << "Counter#" << id_ << " 破棄" << std::endl;
    }

    // staticメンバ関数
    static int total() { return total_count_; }
};

// static変数の定義（クラス外）
int Counter::total_count_ = 0;

// friend関数（privateにアクセス可能）
std::ostream& operator<<(std::ostream& os, const Counter& c) {
    return os << "Counter#" << c.id_;
}

int main() {
    Counter a, b, c;
    std::cout << "総数: " << Counter::total() << std::endl;
    std::cout << a << std::endl;
    return 0;
}`,
      },
    ],
  },
  {
    id: "inheritance",
    title: "継承とポリモーフィズム",
    description: "virtual、override、final、抽象クラス、dynamic_cast",
    category: "intermediate",
    sections: [
      {
        title: "継承の基礎",
        content:
          "継承は既存クラス（基底クラス）の機能を受け継いで新しいクラス（派生クラス）を作る機能です。publicな継承ではis-a関係を表現します。基底クラスのコンストラクタは派生クラスのメンバ初期化リストから呼び出します。protectedメンバは派生クラスからアクセス可能です。",
        code: `#include <iostream>
#include <string>

class Animal {
protected:
    std::string name_;
public:
    Animal(const std::string& name) : name_(name) {}
    virtual ~Animal() = default; // 仮想デストラクタ

    const std::string& name() const { return name_; }
    virtual void speak() const {
        std::cout << name_ << "は鳴きません" << std::endl;
    }
};

class Dog : public Animal {
public:
    Dog(const std::string& name) : Animal(name) {}
    void speak() const override {
        std::cout << name_ << ": ワン！" << std::endl;
    }
};

class Cat : public Animal {
public:
    Cat(const std::string& name) : Animal(name) {}
    void speak() const override {
        std::cout << name_ << ": ニャー！" << std::endl;
    }
};

int main() {
    Dog d("ポチ");
    Cat c("タマ");
    d.speak();
    c.speak();

    // ポリモーフィズム（基底クラスポインタ）
    Animal* animals[] = {&d, &c};
    for (auto* a : animals) a->speak();
    return 0;
}`,
      },
      {
        title: "仮想関数と抽象クラス",
        content:
          "virtualキーワードは動的ディスパッチ（実行時に呼び出す関数を決定）を有効にします。overrideは基底クラスの仮想関数をオーバーライドすることを明示し、スペルミスを防ぎます。純粋仮想関数（= 0）を持つクラスは抽象クラスとなり、インスタンス化できません。finalは継承やオーバーライドを禁止します。",
        code: `#include <iostream>
#include <vector>
#include <memory>

// 抽象クラス（インターフェース）
class Shape {
public:
    virtual ~Shape() = default;
    virtual double area() const = 0;   // 純粋仮想関数
    virtual void draw() const = 0;
};

class Circle final : public Shape {   // finalで継承禁止
    double radius_;
public:
    explicit Circle(double r) : radius_(r) {}
    double area() const override { return 3.14159 * radius_ * radius_; }
    void draw() const override {
        std::cout << "○ (半径" << radius_ << ", 面積" << area() << ")" << std::endl;
    }
};

class Rectangle : public Shape {
    double w_, h_;
public:
    Rectangle(double w, double h) : w_(w), h_(h) {}
    double area() const override { return w_ * h_; }
    void draw() const override {
        std::cout << "□ (" << w_ << "x" << h_ << ", 面積" << area() << ")" << std::endl;
    }
};

int main() {
    std::vector<std::unique_ptr<Shape>> shapes;
    shapes.push_back(std::make_unique<Circle>(5.0));
    shapes.push_back(std::make_unique<Rectangle>(3.0, 4.0));

    for (const auto& s : shapes) s->draw();
    return 0;
}`,
      },
      {
        title: "多重継承とdynamic_cast",
        content:
          "C++は多重継承をサポートしますが、ダイヤモンド問題（菱形継承）に注意が必要です。virtual継承で重複を解決できます。dynamic_castは実行時型情報（RTTI）を使って安全にダウンキャストし、失敗時にnullptrを返します。一般にインターフェース（純粋仮想クラス）での多重継承が推奨されます。",
        code: `#include <iostream>
#include <memory>

// インターフェース的な多重継承
class Printable {
public:
    virtual ~Printable() = default;
    virtual void print() const = 0;
};

class Serializable {
public:
    virtual ~Serializable() = default;
    virtual std::string serialize() const = 0;
};

class User : public Printable, public Serializable {
    std::string name_;
public:
    User(const std::string& name) : name_(name) {}
    void print() const override {
        std::cout << "User: " << name_ << std::endl;
    }
    std::string serialize() const override {
        return "{\"name\":\"" + name_ + "\"}";
    }
};

int main() {
    auto user = std::make_unique<User>("太郎");
    user->print();
    std::cout << user->serialize() << std::endl;

    // dynamic_castによる安全なダウンキャスト
    Printable* p = user.get();
    if (auto* u = dynamic_cast<User*>(p)) {
        std::cout << "キャスト成功: " << u->serialize() << std::endl;
    }
    return 0;
}`,
      },
    ],
  },
  {
    id: "operator-overload",
    title: "演算子オーバーロード",
    description: "算術・比較・ストリーム・代入演算子、三方比較(<=>)",
    category: "intermediate",
    sections: [
      {
        title: "算術・比較演算子",
        content:
          "C++ではクラスに対して演算子の動作を定義できます。メンバ関数またはフリー関数として実装します。算術演算子（+, -, *, /）は通常フリー関数、複合代入演算子（+=）はメンバ関数として実装します。C++20の三方比較演算子(<=>)は一つの定義で全比較演算子を自動生成します。",
        code: `#include <iostream>
#include <compare>

class Vec2 {
    double x_, y_;
public:
    Vec2(double x = 0, double y = 0) : x_(x), y_(y) {}

    // 複合代入（メンバ関数）
    Vec2& operator+=(const Vec2& rhs) {
        x_ += rhs.x_; y_ += rhs.y_;
        return *this;
    }

    // 算術演算子（フリー関数）
    friend Vec2 operator+(Vec2 lhs, const Vec2& rhs) {
        return lhs += rhs;
    }

    // C++20: 三方比較（全比較を自動生成）
    auto operator<=>(const Vec2&) const = default;

    // ストリーム出力
    friend std::ostream& operator<<(std::ostream& os, const Vec2& v) {
        return os << "(" << v.x_ << ", " << v.y_ << ")";
    }
};

int main() {
    Vec2 a(1, 2), b(3, 4);
    std::cout << a + b << std::endl;   // (4, 6)
    a += b;
    std::cout << a << std::endl;       // (4, 6)
    std::cout << std::boolalpha << (a == b + Vec2(1, 2)) << std::endl;
    return 0;
}`,
      },
      {
        title: "添字・関数呼出し演算子",
        content:
          "operator[]は配列風のアクセスを実装します。constと非constの2つのオーバーロードを提供するのが一般的です。operator()は関数オブジェクト（ファンクタ）を作り、ラムダ式の内部実装にも使われています。STLアルゴリズムのカスタム比較に有用です。",
        code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <stdexcept>

// 安全な配列ラッパー
class SafeArray {
    std::vector<int> data_;
public:
    SafeArray(size_t size) : data_(size, 0) {}

    // 添字演算子（非const）
    int& operator[](size_t i) {
        if (i >= data_.size()) throw std::out_of_range("範囲外");
        return data_[i];
    }

    // 添字演算子（const）
    const int& operator[](size_t i) const {
        if (i >= data_.size()) throw std::out_of_range("範囲外");
        return data_[i];
    }

    size_t size() const { return data_.size(); }
};

// 関数オブジェクト（ファンクタ）
struct Multiplier {
    int factor;
    int operator()(int x) const { return x * factor; }
};

int main() {
    SafeArray arr(5);
    arr[0] = 10; arr[1] = 20;
    std::cout << "arr[0] = " << arr[0] << std::endl;

    Multiplier triple{3};
    std::cout << "triple(5) = " << triple(5) << std::endl;

    std::vector<int> v = {1, 2, 3};
    std::transform(v.begin(), v.end(), v.begin(), Multiplier{10});
    for (auto x : v) std::cout << x << " "; // 10 20 30
    std::cout << std::endl;
    return 0;
}`,
      },
      {
        title: "型変換演算子とユーザー定義リテラル",
        content:
          "型変換演算子（operator T()）でクラスを別の型に暗黙変換できます。explicitを付けると明示的変換のみ許可され、意図しない変換を防げます。ユーザー定義リテラル（C++11）はoperator\"\"で独自のリテラル接尾辞を定義でき、単位付き数値などを直感的に表現できます。",
        code: `#include <iostream>
#include <string>

class Distance {
    double meters_;
public:
    explicit Distance(double m) : meters_(m) {}

    // explicit型変換演算子
    explicit operator double() const { return meters_; }

    double meters() const { return meters_; }

    friend Distance operator+(Distance a, Distance b) {
        return Distance(a.meters_ + b.meters_);
    }

    friend std::ostream& operator<<(std::ostream& os, const Distance& d) {
        return os << d.meters_ << "m";
    }
};

// ユーザー定義リテラル
Distance operator"" _m(long double val) {
    return Distance(static_cast<double>(val));
}

Distance operator"" _km(long double val) {
    return Distance(static_cast<double>(val) * 1000);
}

int main() {
    auto d1 = 100.0_m;
    auto d2 = 1.5_km;
    auto total = d1 + d2;
    std::cout << "合計: " << total << std::endl; // 1600m

    // explicit変換
    double raw = static_cast<double>(total);
    std::cout << "double: " << raw << std::endl;
    return 0;
}`,
      },
    ],
  },
  {
    id: "memory",
    title: "メモリ管理",
    description: "new/delete、スマートポインタ、RAII、ムーブセマンティクス",
    category: "intermediate",
    sections: [
      {
        title: "スマートポインタ",
        content:
          "C++11のスマートポインタは自動メモリ管理を提供します。unique_ptrは排他的所有権（コピー不可、ムーブのみ）、shared_ptrは共有所有権（参照カウント）、weak_ptrはshared_ptrの循環参照を防ぎます。生のnew/deleteの代わりにmake_unique/make_sharedを使うのが現代のC++の標準です。",
        code: `#include <iostream>
#include <memory>
#include <vector>

class Widget {
    std::string name_;
public:
    Widget(const std::string& n) : name_(n) {
        std::cout << name_ << " 構築" << std::endl;
    }
    ~Widget() { std::cout << name_ << " 破棄" << std::endl; }
    void use() const { std::cout << name_ << " 使用中" << std::endl; }
};

int main() {
    // unique_ptr: 排他的所有権
    auto w1 = std::make_unique<Widget>("Unique");
    w1->use();
    // auto w2 = w1; // コンパイルエラー（コピー不可）
    auto w2 = std::move(w1); // ムーブは可能
    // w1はnullptrになる

    // shared_ptr: 共有所有権
    auto s1 = std::make_shared<Widget>("Shared");
    {
        auto s2 = s1; // 参照カウント+1
        std::cout << "参照数: " << s1.use_count() << std::endl; // 2
    } // s2破棄、参照カウント-1

    // vectorでunique_ptr管理
    std::vector<std::unique_ptr<Widget>> widgets;
    widgets.push_back(std::make_unique<Widget>("W1"));
    widgets.push_back(std::make_unique<Widget>("W2"));
    return 0;
} // 自動的に全て破棄`,
      },
      {
        title: "RAII（Resource Acquisition Is Initialization）",
        content:
          "RAIIはC++の最も重要なイディオムで、リソースの取得をオブジェクトの初期化に、解放をデストラクタに結びつけます。例外発生時もスタック巻き戻しでデストラクタが呼ばれるため、リソースリークを防げます。スマートポインタ、ロックガード、ファイルストリームなどがRAIIの代表例です。",
        code: `#include <iostream>
#include <fstream>
#include <mutex>
#include <memory>

// RAIIラッパーの自作例
class FileGuard {
    std::FILE* fp_;
public:
    explicit FileGuard(const char* path, const char* mode)
        : fp_(std::fopen(path, mode)) {}

    ~FileGuard() {
        if (fp_) std::fclose(fp_);
    }

    // コピー禁止、ムーブのみ
    FileGuard(const FileGuard&) = delete;
    FileGuard& operator=(const FileGuard&) = delete;

    std::FILE* get() const { return fp_; }
    explicit operator bool() const { return fp_ != nullptr; }
};

// ミューテックスのRAII（lock_guard）
std::mutex mtx;
void safe_operation() {
    std::lock_guard<std::mutex> lock(mtx); // 構築時にロック
    std::cout << "安全な操作" << std::endl;
} // スコープ終了で自動アンロック

int main() {
    // RAIIでファイル操作
    {
        FileGuard fg("test.txt", "w");
        if (fg) {
            std::fputs("RAII example\\n", fg.get());
        }
    } // 自動的にfclose

    // C++標準のRAII
    {
        std::ofstream ofs("output.txt");
        ofs << "Hello RAII" << std::endl;
    } // 自動的にclose

    safe_operation();
    return 0;
}`,
      },
      {
        title: "ムーブセマンティクス",
        content:
          "ムーブセマンティクス（C++11）は、不要になったオブジェクトのリソースをコピーではなく「移動」することで効率を向上させます。右辺値参照（T&&）で一時オブジェクトを受け取り、std::moveで左辺値を右辺値にキャストします。ムーブ後のオブジェクトは有効だが不定の状態になります。",
        code: `#include <iostream>
#include <string>
#include <vector>
#include <utility>

class Buffer {
    int* data_;
    size_t size_;
public:
    explicit Buffer(size_t size) : data_(new int[size]{}), size_(size) {
        std::cout << "構築(" << size << ")" << std::endl;
    }

    // ムーブコンストラクタ
    Buffer(Buffer&& other) noexcept
        : data_(other.data_), size_(other.size_) {
        other.data_ = nullptr;
        other.size_ = 0;
        std::cout << "ムーブ構築" << std::endl;
    }

    // ムーブ代入演算子
    Buffer& operator=(Buffer&& other) noexcept {
        if (this != &other) {
            delete[] data_;
            data_ = other.data_; size_ = other.size_;
            other.data_ = nullptr; other.size_ = 0;
        }
        return *this;
    }

    ~Buffer() { delete[] data_; }

    // コピー禁止
    Buffer(const Buffer&) = delete;
    Buffer& operator=(const Buffer&) = delete;

    size_t size() const { return size_; }
};

int main() {
    Buffer b1(100);
    Buffer b2 = std::move(b1); // ムーブ（コピーではない）
    std::cout << "b2 size: " << b2.size() << std::endl;
    std::cout << "b1 size: " << b1.size() << std::endl; // 0

    // vectorでのムーブ活用
    std::vector<Buffer> v;
    v.push_back(Buffer(50)); // 一時オブジェクトがムーブされる
    return 0;
}`,
      },
    ],
  },
  {
    id: "stl-containers",
    title: "STLコンテナ",
    description: "vector、map、set、unordered_map、deque、list",
    category: "intermediate",
    sections: [
      {
        title: "シーケンスコンテナ",
        content:
          "vectorは連続メモリの可変長配列で最も汎用的です。dequeは両端からの挿入・削除がO(1)です。listは双方向連結リストで中間の挿入・削除がO(1)ですがランダムアクセスは不可です。forward_listは単方向連結リストでメモリ効率が良いです。用途に応じて選択しますが、まずvectorを検討するのが原則です。",
        code: `#include <iostream>
#include <vector>
#include <deque>
#include <list>
#include <array>

int main() {
    // vector: 最も一般的
    std::vector<int> v = {1, 2, 3};
    v.push_back(4);
    v.emplace_back(5);

    // deque: 両端操作
    std::deque<int> dq = {2, 3, 4};
    dq.push_front(1);
    dq.push_back(5);

    // list: 双方向連結リスト
    std::list<int> lst = {1, 2, 3, 4, 5};
    auto it = std::next(lst.begin(), 2);
    lst.insert(it, 99); // O(1)挿入

    // 出力
    std::cout << "vector: ";
    for (auto x : v) std::cout << x << " ";
    std::cout << "\\ndeque: ";
    for (auto x : dq) std::cout << x << " ";
    std::cout << "\\nlist: ";
    for (auto x : lst) std::cout << x << " ";
    std::cout << std::endl;

    return 0;
}`,
      },
      {
        title: "連想コンテナ",
        content:
          "mapはキーと値のペアを格納し、キーでソートされます（赤黒木）。setは一意な値の集合です。unordered_map/unordered_setはハッシュテーブルベースで平均O(1)のアクセスが可能です。multimapとmultisetは重複キーを許容します。",
        code: `#include <iostream>
#include <map>
#include <unordered_map>
#include <set>

int main() {
    // map（ソート済み）
    std::map<std::string, int> scores;
    scores["太郎"] = 90;
    scores["花子"] = 85;
    scores.insert({"次郎", 78});

    for (const auto& [name, score] : scores) {
        std::cout << name << ": " << score << std::endl;
    }

    // unordered_map（ハッシュ、高速）
    std::unordered_map<std::string, int> freq;
    std::string words[] = {"apple", "banana", "apple", "cherry", "apple"};
    for (const auto& w : words) freq[w]++;

    for (const auto& [word, count] : freq) {
        std::cout << word << ": " << count << std::endl;
    }

    // set（一意な値の集合）
    std::set<int> s = {5, 3, 8, 1, 3, 5};
    std::cout << "set: ";
    for (auto x : s) std::cout << x << " "; // 1 3 5 8
    std::cout << "\\ncontains 3: " << s.count(3) << std::endl;

    return 0;
}`,
      },
      {
        title: "コンテナアダプタと選択指針",
        content:
          "stack（LIFO）、queue（FIFO）、priority_queue（優先度付き）はコンテナアダプタで、内部コンテナをラップします。コンテナ選択の指針：まずvectorを検討、キー検索が必要ならmap/unordered_map、一意性が必要ならset、両端操作ならdeque、頻繁な中間挿入ならlistを使います。",
        code: `#include <iostream>
#include <stack>
#include <queue>
#include <vector>

int main() {
    // stack（LIFO）
    std::stack<int> stk;
    stk.push(1); stk.push(2); stk.push(3);
    std::cout << "stack: ";
    while (!stk.empty()) {
        std::cout << stk.top() << " "; // 3 2 1
        stk.pop();
    }
    std::cout << std::endl;

    // queue（FIFO）
    std::queue<int> q;
    q.push(1); q.push(2); q.push(3);
    std::cout << "queue: ";
    while (!q.empty()) {
        std::cout << q.front() << " "; // 1 2 3
        q.pop();
    }
    std::cout << std::endl;

    // priority_queue（最大ヒープ）
    std::priority_queue<int> pq;
    for (int x : {3, 1, 4, 1, 5, 9}) pq.push(x);
    std::cout << "priority_queue: ";
    while (!pq.empty()) {
        std::cout << pq.top() << " "; // 9 5 4 3 1 1
        pq.pop();
    }
    std::cout << std::endl;

    return 0;
}`,
      },
    ],
  },
  // ── 上級 ──
  {
    id: "templates",
    title: "テンプレート",
    description: "関数・クラステンプレート、特殊化、可変長テンプレート",
    category: "advanced",
    sections: [
      {
        title: "関数テンプレートとクラステンプレート",
        content:
          "テンプレートは型をパラメータ化し、ジェネリックなコードを実現します。関数テンプレートは呼び出し時に型推論が行われます。クラステンプレートはstd::vectorのように型パラメータを持つクラスです。テンプレートはヘッダファイルに定義を記述するのが一般的です。",
        code: `#include <iostream>
#include <string>

// 関数テンプレート
template<typename T>
T max_of(T a, T b) {
    return (a > b) ? a : b;
}

// クラステンプレート
template<typename T, size_t N>
class FixedStack {
    T data_[N];
    size_t top_ = 0;
public:
    void push(const T& val) {
        if (top_ < N) data_[top_++] = val;
    }
    T pop() { return data_[--top_]; }
    bool empty() const { return top_ == 0; }
    size_t size() const { return top_; }
};

int main() {
    // 型推論
    std::cout << max_of(3, 7) << std::endl;
    std::cout << max_of(3.14, 2.72) << std::endl;
    std::cout << max_of(std::string("abc"), std::string("xyz")) << std::endl;

    // クラステンプレート使用
    FixedStack<int, 10> stack;
    stack.push(1); stack.push(2); stack.push(3);
    while (!stack.empty()) {
        std::cout << stack.pop() << " ";
    }
    std::cout << std::endl;
    return 0;
}`,
      },
      {
        title: "テンプレート特殊化",
        content:
          "テンプレート特殊化は特定の型に対して異なる実装を提供します。完全特殊化は特定の型をすべて指定し、部分特殊化は一部のパラメータを特殊化します（クラステンプレートのみ）。特殊化により、特定の型で最適な処理を実装できます。",
        code: `#include <iostream>
#include <cstring>

// プライマリテンプレート
template<typename T>
struct TypeInfo {
    static const char* name() { return "unknown"; }
};

// 完全特殊化
template<>
struct TypeInfo<int> {
    static const char* name() { return "int"; }
};

template<>
struct TypeInfo<double> {
    static const char* name() { return "double"; }
};

template<>
struct TypeInfo<std::string> {
    static const char* name() { return "string"; }
};

// 部分特殊化（ポインタ型）
template<typename T>
struct TypeInfo<T*> {
    static const char* name() { return "pointer"; }
};

template<typename T>
void print_type(const T&) {
    std::cout << "型: " << TypeInfo<T>::name() << std::endl;
}

int main() {
    print_type(42);           // int
    print_type(3.14);         // double
    print_type(std::string("hi")); // string
    int* p = nullptr;
    print_type(p);            // pointer
    return 0;
}`,
      },
      {
        title: "可変長テンプレートとfold式",
        content:
          "可変長テンプレート（C++11）は任意の数の型パラメータを受け取れます。typename... Argsはパラメータパック、args...はパック展開です。C++17のfold式は再帰なしでパック全体に演算を適用できます。make_unique等の標準ライブラリ関数も可変長テンプレートで実装されています。",
        code: `#include <iostream>
#include <string>

// C++17: fold式
template<typename... Args>
auto sum(Args... args) {
    return (args + ...); // 右fold
}

// パラメータパックの展開
template<typename... Args>
void print_all(const Args&... args) {
    ((std::cout << args << " "), ...); // fold式で出力
    std::cout << std::endl;
}

// 再帰的な可変長テンプレート
template<typename T>
T my_max(T val) { return val; }

template<typename T, typename... Rest>
T my_max(T first, Rest... rest) {
    auto rest_max = my_max(rest...);
    return (first > rest_max) ? first : rest_max;
}

int main() {
    std::cout << sum(1, 2, 3, 4, 5) << std::endl;      // 15
    std::cout << sum(1.5, 2.5, 3.5) << std::endl;       // 7.5

    print_all(1, "hello", 3.14, 'A');
    std::cout << "max: " << my_max(3, 7, 2, 9, 1) << std::endl;

    return 0;
}`,
      },
    ],
  },
  {
    id: "lambda",
    title: "ラムダ式と関数オブジェクト",
    description: "ラムダ式、キャプチャ、std::function、ジェネリックラムダ",
    category: "advanced",
    sections: [
      {
        title: "ラムダ式の基礎",
        content:
          "ラムダ式（C++11）は匿名関数を定義する構文です。[キャプチャ](引数) -> 戻り値型 { 本体 }の形式です。キャプチャで外側の変数を取り込めます。[=]はコピー、[&]は参照、[x, &y]は個別指定です。STLアルゴリズムのカスタム処理やコールバックに多用されます。",
        code: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    // 基本的なラムダ
    auto greet = [](const std::string& name) {
        std::cout << "Hello, " << name << "!" << std::endl;
    };
    greet("C++");

    // キャプチャ
    int threshold = 5;
    auto is_above = [threshold](int x) { return x > threshold; };
    auto increment = [&threshold]() { threshold++; };

    // STLアルゴリズムとの組み合わせ
    std::vector<int> v = {1, 8, 3, 7, 2, 9, 4};
    std::sort(v.begin(), v.end(), [](int a, int b) { return a > b; });

    auto count = std::count_if(v.begin(), v.end(), is_above);
    std::cout << threshold << "超の個数: " << count << std::endl;

    // 即時呼び出し（IIFE）
    auto result = [](int x, int y) { return x * y; }(6, 7);
    std::cout << "6 * 7 = " << result << std::endl;

    return 0;
}`,
      },
      {
        title: "ジェネリックラムダとstd::function",
        content:
          "ジェネリックラムダ（C++14）はauto引数を使って型に依存しないラムダを定義します。C++20ではテンプレートラムダも使えます。std::functionは関数ポインタ、ラムダ、ファンクタを統一的に格納できる型消去ラッパーで、コールバックの保存に使います。",
        code: `#include <iostream>
#include <functional>
#include <vector>
#include <string>

// std::functionでコールバック保存
class EventEmitter {
    std::vector<std::function<void(const std::string&)>> listeners_;
public:
    void on(std::function<void(const std::string&)> fn) {
        listeners_.push_back(std::move(fn));
    }
    void emit(const std::string& event) {
        for (auto& fn : listeners_) fn(event);
    }
};

int main() {
    // ジェネリックラムダ（C++14）
    auto print = [](const auto& x) { std::cout << x << std::endl; };
    print(42);
    print("hello");
    print(3.14);

    // 高階関数
    auto make_adder = [](int n) {
        return [n](int x) { return x + n; };
    };
    auto add5 = make_adder(5);
    std::cout << "add5(3) = " << add5(3) << std::endl;

    // イベントシステム
    EventEmitter emitter;
    emitter.on([](const std::string& e) { std::cout << "A: " << e << std::endl; });
    emitter.on([](const std::string& e) { std::cout << "B: " << e << std::endl; });
    emitter.emit("click");

    return 0;
}`,
      },
      {
        title: "ラムダの高度な使い方",
        content:
          "C++14ではラムダのキャプチャで初期化式が使えます（init capture）。ムーブキャプチャやカウンタの埋め込みに有用です。C++17ではconstexprラムダ、C++20ではテンプレートラムダやステートレスラムダのデフォルト構築が可能になりました。mutableキーワードでコピーキャプチャした変数を変更できます。",
        code: `#include <iostream>
#include <memory>
#include <vector>
#include <algorithm>

int main() {
    // init capture（C++14）— ムーブキャプチャ
    auto ptr = std::make_unique<int>(42);
    auto lambda = [p = std::move(ptr)]() {
        std::cout << "ムーブキャプチャ: " << *p << std::endl;
    };
    lambda();

    // mutableラムダ（コピーキャプチャの変更）
    int count = 0;
    auto counter = [count]() mutable {
        return ++count; // コピーを変更
    };
    std::cout << counter() << std::endl; // 1
    std::cout << counter() << std::endl; // 2
    std::cout << "元のcount: " << count << std::endl; // 0

    // 再帰ラムダ（std::function経由）
    std::function<int(int)> factorial = [&factorial](int n) -> int {
        return (n <= 1) ? 1 : n * factorial(n - 1);
    };
    std::cout << "5! = " << factorial(5) << std::endl;

    return 0;
}`,
      },
    ],
  },
  {
    id: "exceptions",
    title: "例外処理",
    description: "try-catch、カスタム例外、例外安全性、noexcept",
    category: "advanced",
    sections: [
      {
        title: "try-catchの基礎",
        content:
          "例外処理はtryブロックで例外が発生する可能性のある処理を囲み、catchブロックで捕捉します。throwで例外を投げます。C++の標準例外はstd::exceptionを基底クラスとする階層構造です。catchは型でマッチし、catch(...)はすべての例外を捕捉します。",
        code: `#include <iostream>
#include <stdexcept>
#include <string>

double divide(double a, double b) {
    if (b == 0.0) {
        throw std::invalid_argument("ゼロ除算エラー");
    }
    return a / b;
}

int main() {
    try {
        std::cout << divide(10, 3) << std::endl;
        std::cout << divide(10, 0) << std::endl; // 例外発生
    } catch (const std::invalid_argument& e) {
        std::cerr << "引数エラー: " << e.what() << std::endl;
    } catch (const std::exception& e) {
        std::cerr << "例外: " << e.what() << std::endl;
    } catch (...) {
        std::cerr << "不明な例外" << std::endl;
    }

    std::cout << "プログラム続行" << std::endl;
    return 0;
}`,
      },
      {
        title: "カスタム例外クラス",
        content:
          "独自の例外クラスはstd::exceptionまたはその派生クラスを継承して作成します。what()メソッドをオーバーライドしてエラーメッセージを提供します。エラーコードや追加情報をメンバ変数として持たせることで、詳細なエラー処理が可能になります。",
        code: `#include <iostream>
#include <stdexcept>
#include <string>

// カスタム例外クラス
class AppError : public std::runtime_error {
    int code_;
public:
    AppError(int code, const std::string& msg)
        : std::runtime_error(msg), code_(code) {}
    int code() const { return code_; }
};

class NotFoundError : public AppError {
public:
    NotFoundError(const std::string& item)
        : AppError(404, item + "が見つかりません") {}
};

class AuthError : public AppError {
public:
    AuthError() : AppError(401, "認証エラー") {}
};

void process(int id) {
    if (id < 0) throw AuthError();
    if (id == 0) throw NotFoundError("ユーザー");
}

int main() {
    for (int id : {1, 0, -1}) {
        try {
            process(id);
            std::cout << "ID " << id << " 成功" << std::endl;
        } catch (const AppError& e) {
            std::cerr << "[" << e.code() << "] " << e.what() << std::endl;
        }
    }
    return 0;
}`,
      },
      {
        title: "例外安全性とnoexcept",
        content:
          "例外安全性には3つのレベルがあります。基本保証（リーク無し）、強い保証（失敗時に元の状態に戻る）、例外を投げない保証（nothrow）です。noexcept修飾子は関数が例外を投げないことを宣言し、コンパイラの最適化を促進します。デストラクタとムーブ操作はnoexceptにすべきです。",
        code: `#include <iostream>
#include <vector>
#include <utility>

class SafeBuffer {
    int* data_;
    size_t size_;
public:
    explicit SafeBuffer(size_t n)
        : data_(new int[n]{}), size_(n) {}

    // noexceptムーブ（vectorの再配置で効率的）
    SafeBuffer(SafeBuffer&& other) noexcept
        : data_(other.data_), size_(other.size_) {
        other.data_ = nullptr;
        other.size_ = 0;
    }

    SafeBuffer& operator=(SafeBuffer&& other) noexcept {
        if (this != &other) {
            delete[] data_;
            data_ = other.data_; size_ = other.size_;
            other.data_ = nullptr; other.size_ = 0;
        }
        return *this;
    }

    // noexceptデストラクタ（デフォルトでnoexcept）
    ~SafeBuffer() { delete[] data_; }

    // コピー禁止
    SafeBuffer(const SafeBuffer&) = delete;
    SafeBuffer& operator=(const SafeBuffer&) = delete;

    size_t size() const noexcept { return size_; }
};

int main() {
    // noexceptチェック
    static_assert(std::is_nothrow_move_constructible_v<SafeBuffer>);

    std::vector<SafeBuffer> v;
    v.push_back(SafeBuffer(100)); // ムーブが使われる
    v.push_back(SafeBuffer(200));
    std::cout << "要素数: " << v.size() << std::endl;
    return 0;
}`,
      },
    ],
  },
  {
    id: "stl-algorithms",
    title: "STLアルゴリズム",
    description: "sort、find、transform、accumulate、ranges（C++20）",
    category: "advanced",
    sections: [
      {
        title: "基本アルゴリズム",
        content:
          "STLアルゴリズムはイテレータベースの汎用関数で、algorithmヘッダに定義されています。sort（ソート）、find/find_if（検索）、count/count_if（カウント）、for_each（走査）、copy（コピー）、reverse（反転）など豊富に用意されています。ラムダ式と組み合わせて強力な処理を簡潔に記述できます。",
        code: `#include <iostream>
#include <vector>
#include <algorithm>

int main() {
    std::vector<int> v = {5, 2, 8, 1, 9, 3, 7, 4, 6};

    // ソート
    std::sort(v.begin(), v.end());

    // 二分探索（ソート済み前提）
    bool found = std::binary_search(v.begin(), v.end(), 7);
    std::cout << "7: " << (found ? "あり" : "なし") << std::endl;

    // find_if
    auto it = std::find_if(v.begin(), v.end(),
        [](int n) { return n > 5; });
    if (it != v.end()) std::cout << "5超の最初: " << *it << std::endl;

    // min/max
    auto [mn, mx] = std::minmax_element(v.begin(), v.end());
    std::cout << "min=" << *mn << " max=" << *mx << std::endl;

    // unique（連続する重複を除去）
    v.push_back(9); v.push_back(9);
    std::sort(v.begin(), v.end());
    v.erase(std::unique(v.begin(), v.end()), v.end());

    for (auto x : v) std::cout << x << " ";
    std::cout << std::endl;
    return 0;
}`,
      },
      {
        title: "変換・集約アルゴリズム",
        content:
          "transformはコンテナの要素を変換し、accumulateは集約（合計等）を行います。partial_sortは上位n個のみソート、nth_elementはn番目の要素を正しい位置に配置します。remove_if + eraseパターンは条件に合う要素を削除する標準イディオムです。",
        code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <numeric>
#include <string>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};

    // transform: 各要素を変換
    std::vector<int> squared(v.size());
    std::transform(v.begin(), v.end(), squared.begin(),
        [](int n) { return n * n; });

    // accumulate: 合計
    int sum = std::accumulate(v.begin(), v.end(), 0);
    std::cout << "合計: " << sum << std::endl;

    // 文字列結合
    std::vector<std::string> words = {"C++", "is", "powerful"};
    auto joined = std::accumulate(
        std::next(words.begin()), words.end(), words[0],
        [](const std::string& a, const std::string& b) {
            return a + " " + b;
        });
    std::cout << joined << std::endl;

    // remove-erase イディオム
    std::vector<int> nums = {1, 2, 3, 4, 5, 6, 7, 8};
    std::erase_if(nums, [](int n) { return n % 2 == 0; }); // C++20
    for (auto x : nums) std::cout << x << " "; // 1 3 5 7
    std::cout << std::endl;

    return 0;
}`,
      },
      {
        title: "Ranges（C++20）",
        content:
          "C++20のRangesライブラリは遅延評価のビュー（views）とパイプ演算子(|)で、アルゴリズムをチェーンできます。views::filter、views::transform、views::takeなどで宣言的なデータ処理パイプラインを構築します。begin/endの代わりにコンテナを直接渡せるため簡潔です。",
        code: `#include <iostream>
#include <vector>
#include <ranges>
#include <algorithm>

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

    // Rangesパイプライン
    auto result = v
        | std::views::filter([](int n) { return n % 2 == 0; })
        | std::views::transform([](int n) { return n * n; })
        | std::views::take(3);

    std::cout << "偶数の二乗（上位3つ）: ";
    for (auto x : result) std::cout << x << " "; // 4 16 36
    std::cout << std::endl;

    // ranges::sort（コンテナ直接渡し）
    std::vector<int> nums = {5, 3, 8, 1, 9};
    std::ranges::sort(nums);

    // ranges::find
    if (auto it = std::ranges::find(nums, 8); it != nums.end()) {
        std::cout << "8 found" << std::endl;
    }

    // views::iota（数列生成）
    for (auto i : std::views::iota(1, 6)) {
        std::cout << i << " "; // 1 2 3 4 5
    }
    std::cout << std::endl;

    return 0;
}`,
      },
    ],
  },
  {
    id: "concurrency",
    title: "並行処理",
    description: "std::thread、mutex、future/promise、async",
    category: "advanced",
    sections: [
      {
        title: "std::threadとmutex",
        content:
          "std::thread（C++11）はスレッドの生成と管理を提供します。join()で終了待ち、detach()で独立実行します。std::mutexで共有データの排他制御を行い、std::lock_guardでRAIIベースのロック管理を行います。std::scoped_lock（C++17）は複数のmutexを安全にロックします。",
        code: `#include <iostream>
#include <thread>
#include <mutex>
#include <vector>

std::mutex mtx;
int counter = 0;

void increment(int n) {
    for (int i = 0; i < n; ++i) {
        std::lock_guard<std::mutex> lock(mtx);
        ++counter;
    }
}

int main() {
    std::vector<std::thread> threads;
    for (int i = 0; i < 4; ++i) {
        threads.emplace_back(increment, 100000);
    }
    for (auto& t : threads) t.join();

    std::cout << "カウンタ: " << counter << std::endl; // 400000

    // ラムダでスレッド
    std::thread t([](std::string msg) {
        std::cout << "スレッド: " << msg << std::endl;
    }, "Hello from thread");
    t.join();

    // ハードウェア並行数
    std::cout << "コア数: " << std::thread::hardware_concurrency() << std::endl;
    return 0;
}`,
      },
      {
        title: "future/promiseとasync",
        content:
          "std::asyncは非同期タスクを起動し、std::futureで結果を取得します。std::promiseは任意のタイミングで値をセットでき、対応するfutureで受け取れます。asyncはスレッドプールの利用やポリシー（launch::async/launch::deferred）の指定が可能です。",
        code: `#include <iostream>
#include <future>
#include <numeric>
#include <vector>

// 非同期で合計計算
long long parallel_sum(const std::vector<int>& v) {
    auto mid = v.begin() + v.size() / 2;

    auto future_sum = std::async(std::launch::async,
        [&v, mid]() {
            return std::accumulate(v.begin(), mid, 0LL);
        });

    auto right_sum = std::accumulate(mid, v.end(), 0LL);
    return future_sum.get() + right_sum; // 結果を待って取得
}

int main() {
    // std::async
    auto f = std::async(std::launch::async, []() {
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
        return 42;
    });
    std::cout << "結果: " << f.get() << std::endl;

    // 並列合計
    std::vector<int> v(1000000);
    std::iota(v.begin(), v.end(), 1);
    std::cout << "合計: " << parallel_sum(v) << std::endl;

    // promise/future
    std::promise<std::string> p;
    auto fut = p.get_future();
    std::thread t([&p]() {
        p.set_value("promise完了");
    });
    std::cout << fut.get() << std::endl;
    t.join();
    return 0;
}`,
      },
      {
        title: "atomicと条件変数",
        content:
          "std::atomicはロックフリーのアトミック操作を提供し、単純なカウンタやフラグに効率的です。std::condition_variableはスレッド間の通知と待機を実現し、生産者-消費者パターンの実装に使われます。mutexと組み合わせてスプリアスウェイクアップにも対処します。",
        code: `#include <iostream>
#include <thread>
#include <atomic>
#include <condition_variable>
#include <queue>

// atomic: ロックフリーカウンタ
std::atomic<int> atomic_count{0};

// 生産者-消費者パターン
std::mutex mtx;
std::condition_variable cv;
std::queue<int> buffer;
bool done = false;

void producer() {
    for (int i = 0; i < 10; ++i) {
        {
            std::lock_guard<std::mutex> lock(mtx);
            buffer.push(i);
        }
        cv.notify_one();
    }
    { std::lock_guard<std::mutex> lock(mtx); done = true; }
    cv.notify_all();
}

void consumer(int id) {
    while (true) {
        std::unique_lock<std::mutex> lock(mtx);
        cv.wait(lock, [] { return !buffer.empty() || done; });
        while (!buffer.empty()) {
            int val = buffer.front(); buffer.pop();
            lock.unlock();
            std::cout << "消費者" << id << ": " << val << std::endl;
            lock.lock();
        }
        if (done && buffer.empty()) break;
    }
}

int main() {
    std::thread p(producer);
    std::thread c1(consumer, 1), c2(consumer, 2);
    p.join(); c1.join(); c2.join();
    return 0;
}`,
      },
    ],
  },
  // ── 実践・応用 ──
  {
    id: "modern-cpp",
    title: "Modern C++",
    description: "C++17/20/23新機能、構造化束縛、concepts、optional/variant",
    category: "expert",
    sections: [
      {
        title: "C++17の主要機能",
        content:
          "C++17では構造化束縛、if/switch初期化文、std::optional、std::variant、std::any、std::filesystem、fold式、クラステンプレート引数推論（CTAD）などが追加されました。構造化束縛はペアやタプル、構造体の分解を簡潔に記述できます。",
        code: `#include <iostream>
#include <optional>
#include <variant>
#include <tuple>
#include <map>

// std::optional: 値があるかもしれない
std::optional<int> find_value(const std::map<std::string, int>& m,
                              const std::string& key) {
    if (auto it = m.find(key); it != m.end())
        return it->second;
    return std::nullopt;
}

// std::variant: 型安全な共用体
using Value = std::variant<int, double, std::string>;

void print_value(const Value& v) {
    std::visit([](const auto& val) {
        std::cout << val << std::endl;
    }, v);
}

int main() {
    // 構造化束縛
    auto [x, y, z] = std::tuple{1, 2.0, "three"};
    std::cout << x << ", " << y << ", " << z << std::endl;

    // optional
    std::map<std::string, int> m = {{"a", 1}, {"b", 2}};
    if (auto val = find_value(m, "a")) {
        std::cout << "found: " << *val << std::endl;
    }

    // variant
    Value v1 = 42; Value v2 = "hello";
    print_value(v1);
    print_value(v2);

    return 0;
}`,
      },
      {
        title: "C++20 Concepts",
        content:
          "Concepts（C++20）はテンプレートパラメータに対する制約を名前付きで定義する機能です。コンパイルエラーメッセージが分かりやすくなり、テンプレートの意図を明確にします。requires節でアドホックな制約も記述でき、SFINAEの代替として推奨されます。",
        code: `#include <iostream>
#include <concepts>
#include <string>

// concept定義
template<typename T>
concept Addable = requires(T a, T b) {
    { a + b } -> std::convertible_to<T>;
};

template<typename T>
concept Printable = requires(T a, std::ostream& os) {
    { os << a } -> std::same_as<std::ostream&>;
};

// conceptを使った関数テンプレート
template<Addable T>
T add(T a, T b) { return a + b; }

// requires節で直接制約
template<typename T>
    requires Printable<T> && std::copyable<T>
void print(const T& val) {
    std::cout << val << std::endl;
}

// 省略構文
void show(const std::integral auto& val) {
    std::cout << "整数: " << val << std::endl;
}

int main() {
    std::cout << add(3, 5) << std::endl;
    std::cout << add(1.5, 2.5) << std::endl;
    // add("a", "b"); // コンパイルエラー（明確なメッセージ）

    print(42);
    print(std::string("hello"));
    show(100);
    return 0;
}`,
      },
      {
        title: "C++23以降の新機能",
        content:
          "C++23ではstd::expected（エラー処理）、std::print/println（書式付き出力）、deducing this（明示的オブジェクトパラメータ）、std::flat_map、multidimensional subscript operatorなどが追加されました。C++26に向けてreflection、contracts等も進行中です。",
        code: `#include <iostream>
#include <string>
#include <format>

// std::format（C++20）
void format_demo() {
    std::string name = "太郎";
    int age = 25;
    auto msg = std::format("名前: {}, 年齢: {}歳", name, age);
    std::cout << msg << std::endl;

    // 書式指定
    std::cout << std::format("{:>10}", "right") << std::endl;
    std::cout << std::format("{:<10}", "left") << std::endl;
    std::cout << std::format("{:.2f}", 3.14159) << std::endl;
    std::cout << std::format("{:#x}", 255) << std::endl; // 0xff
}

// C++23: std::expected (概念的な例)
// #include <expected>
// std::expected<int, std::string> parse(const std::string& s) {
//     try { return std::stoi(s); }
//     catch (...) { return std::unexpected("parse error"); }
// }

int main() {
    format_demo();

    // C++23: std::println
    // std::println("Hello, {}!", "C++23");

    return 0;
}`,
      },
    ],
  },
  {
    id: "design-patterns",
    title: "デザインパターン",
    description: "Singleton、Factory、Observer、Strategy、RAII、Pimpl",
    category: "expert",
    sections: [
      {
        title: "生成パターン（Singleton, Factory）",
        content:
          "Singletonはインスタンスを1つに制限するパターンで、C++11以降はMeyers' Singleton（関数内static変数）がスレッドセーフです。Factoryパターンはオブジェクト生成をカプセル化し、クライアントコードを具象クラスから分離します。unique_ptrを返すのが現代的な実装です。",
        code: `#include <iostream>
#include <memory>
#include <string>
#include <unordered_map>

// Meyers' Singleton
class Logger {
    Logger() = default;
public:
    static Logger& instance() {
        static Logger inst; // スレッドセーフ（C++11保証）
        return inst;
    }
    void log(const std::string& msg) {
        std::cout << "[LOG] " << msg << std::endl;
    }
    Logger(const Logger&) = delete;
    Logger& operator=(const Logger&) = delete;
};

// Factory
class Shape {
public:
    virtual ~Shape() = default;
    virtual void draw() const = 0;
};
class Circle : public Shape {
public: void draw() const override { std::cout << "○" << std::endl; }
};
class Square : public Shape {
public: void draw() const override { std::cout << "□" << std::endl; }
};

std::unique_ptr<Shape> create_shape(const std::string& type) {
    if (type == "circle") return std::make_unique<Circle>();
    if (type == "square") return std::make_unique<Square>();
    return nullptr;
}

int main() {
    Logger::instance().log("開始");
    auto s = create_shape("circle");
    if (s) s->draw();
    return 0;
}`,
      },
      {
        title: "振る舞いパターン（Observer, Strategy）",
        content:
          "Observerパターンはオブジェクトの状態変化を複数の監視者に通知します。Strategyパターンはアルゴリズムをオブジェクトとしてカプセル化し、実行時に切り替え可能にします。C++ではstd::functionやラムダ式で軽量に実装できます。",
        code: `#include <iostream>
#include <functional>
#include <vector>
#include <string>

// Observer（std::function版）
class EventBus {
    std::unordered_map<std::string,
        std::vector<std::function<void(const std::string&)>>> handlers_;
public:
    void on(const std::string& event,
            std::function<void(const std::string&)> fn) {
        handlers_[event].push_back(std::move(fn));
    }
    void emit(const std::string& event, const std::string& data = "") {
        if (auto it = handlers_.find(event); it != handlers_.end()) {
            for (auto& fn : it->second) fn(data);
        }
    }
};

// Strategy（ラムダ版）
class Sorter {
    std::function<bool(int, int)> strategy_;
public:
    void set_strategy(std::function<bool(int, int)> s) { strategy_ = std::move(s); }
    void sort(std::vector<int>& v) {
        std::sort(v.begin(), v.end(), strategy_);
    }
};

int main() {
    EventBus bus;
    bus.on("click", [](const std::string& d) { std::cout << "A: " << d << std::endl; });
    bus.on("click", [](const std::string& d) { std::cout << "B: " << d << std::endl; });
    bus.emit("click", "button1");

    Sorter sorter;
    std::vector<int> v = {5, 2, 8, 1};
    sorter.set_strategy([](int a, int b) { return a > b; });
    sorter.sort(v);
    for (auto x : v) std::cout << x << " ";
    std::cout << std::endl;
    return 0;
}`,
      },
      {
        title: "Pimplイディオム",
        content:
          "Pimpl（Pointer to Implementation）はコンパイル時の依存関係を減らすイディオムです。実装詳細をcppファイルに隠蔽し、ヘッダの変更によるリコンパイルを最小化します。unique_ptrでImplクラスを保持し、デストラクタをcppファイルで定義します。ABIの安定性にも寄与します。",
        code: `#include <iostream>
#include <memory>
#include <string>

// ── widget.h ──
class Widget {
    struct Impl;
    std::unique_ptr<Impl> pimpl_;
public:
    Widget(const std::string& name);
    ~Widget(); // cppで定義（Implの完全型が必要）
    Widget(Widget&&) noexcept;
    Widget& operator=(Widget&&) noexcept;
    void do_something() const;
};

// ── widget.cpp（通常は別ファイル）──
struct Widget::Impl {
    std::string name;
    int counter = 0;
    void internal_work() {
        ++counter;
        std::cout << name << " (回数: " << counter << ")" << std::endl;
    }
};

Widget::Widget(const std::string& name)
    : pimpl_(std::make_unique<Impl>()) { pimpl_->name = name; }
Widget::~Widget() = default;
Widget::Widget(Widget&&) noexcept = default;
Widget& Widget::operator=(Widget&&) noexcept = default;
void Widget::do_something() const { pimpl_->internal_work(); }

int main() {
    Widget w("MyWidget");
    w.do_something();
    w.do_something();
    return 0;
}`,
      },
    ],
  },
  {
    id: "file-io",
    title: "ファイルとストリーム",
    description: "fstream、ifstream/ofstream、stringstream、filesystem",
    category: "expert",
    sections: [
      {
        title: "テキストファイルI/O",
        content:
          "C++のファイルI/Oはfstreamライブラリで行います。ofstreamは書き込み、ifstreamは読み取り、fstreamは両方です。ストリーム演算子(<<, >>)や getline()で読み書きし、RAIIによりスコープ終了時に自動的にクローズされます。",
        code: `#include <iostream>
#include <fstream>
#include <string>
#include <vector>

int main() {
    // 書き込み
    {
        std::ofstream ofs("data.txt");
        if (!ofs) { std::cerr << "書き込み失敗" << std::endl; return 1; }
        ofs << "名前,年齢,得点" << std::endl;
        ofs << "太郎,20,85" << std::endl;
        ofs << "花子,22,92" << std::endl;
    } // 自動close

    // 読み取り
    {
        std::ifstream ifs("data.txt");
        std::string line;
        while (std::getline(ifs, line)) {
            std::cout << line << std::endl;
        }
    }

    // 追記
    {
        std::ofstream ofs("data.txt", std::ios::app);
        ofs << "次郎,21,78" << std::endl;
    }

    return 0;
}`,
      },
      {
        title: "stringstreamとバイナリI/O",
        content:
          "std::stringstreamは文字列をストリームとして扱い、型変換やパースに便利です。バイナリI/Oはstd::ios::binaryフラグを使い、write()/read()でデータをそのまま読み書きします。構造体の直列化やバイナリファイルフォーマットの処理に使われます。",
        code: `#include <iostream>
#include <sstream>
#include <fstream>
#include <string>
#include <vector>

// CSVパース（stringstream活用）
std::vector<std::string> split(const std::string& s, char delim) {
    std::vector<std::string> tokens;
    std::istringstream iss(s);
    std::string token;
    while (std::getline(iss, token, delim)) {
        tokens.push_back(token);
    }
    return tokens;
}

// バイナリI/O
struct Record {
    int id;
    double value;
};

int main() {
    // stringstream
    auto fields = split("太郎,20,85", ',');
    for (const auto& f : fields) std::cout << "[" << f << "] ";
    std::cout << std::endl;

    // 型変換
    std::ostringstream oss;
    oss << "x=" << 42 << " y=" << 3.14;
    std::cout << oss.str() << std::endl;

    // バイナリ書き込み
    Record records[] = {{1, 3.14}, {2, 2.72}};
    {
        std::ofstream ofs("data.bin", std::ios::binary);
        ofs.write(reinterpret_cast<const char*>(records), sizeof(records));
    }

    // バイナリ読み取り
    Record loaded[2];
    {
        std::ifstream ifs("data.bin", std::ios::binary);
        ifs.read(reinterpret_cast<char*>(loaded), sizeof(loaded));
    }
    std::cout << loaded[0].id << ": " << loaded[0].value << std::endl;
    return 0;
}`,
      },
      {
        title: "std::filesystem（C++17）",
        content:
          "std::filesystem（C++17）はファイルシステム操作のクロスプラットフォームAPIを提供します。パス操作、ファイル/ディレクトリの作成・削除・列挙、ファイルサイズ取得、権限管理などが可能です。pathクラスはOS依存のパス区切りを自動処理します。",
        code: `#include <iostream>
#include <filesystem>
#include <fstream>

namespace fs = std::filesystem;

int main() {
    // パス操作
    fs::path p = fs::current_path() / "test_dir" / "file.txt";
    std::cout << "パス: " << p << std::endl;
    std::cout << "親: " << p.parent_path() << std::endl;
    std::cout << "ファイル名: " << p.filename() << std::endl;
    std::cout << "拡張子: " << p.extension() << std::endl;

    // ディレクトリ作成
    fs::create_directories("test_dir/sub");

    // ファイル作成
    { std::ofstream("test_dir/a.txt") << "hello"; }
    { std::ofstream("test_dir/b.cpp") << "int main(){}"; }

    // ディレクトリ走査
    for (const auto& entry : fs::directory_iterator("test_dir")) {
        std::cout << entry.path().filename();
        if (entry.is_regular_file())
            std::cout << " (" << entry.file_size() << " bytes)";
        std::cout << std::endl;
    }

    // 存在チェックとサイズ
    if (fs::exists("test_dir/a.txt")) {
        std::cout << "サイズ: " << fs::file_size("test_dir/a.txt") << std::endl;
    }

    fs::remove_all("test_dir"); // 再帰削除
    return 0;
}`,
      },
    ],
  },
  {
    id: "debugging",
    title: "デバッグとテスト",
    description: "gdb、Sanitizers、Google Test、static_assert、ベンチマーク",
    category: "expert",
    sections: [
      {
        title: "デバッグツール",
        content:
          "GDBはC++でも使用可能で、-gオプション付きコンパイルが必要です。AddressSanitizer（-fsanitize=address）はメモリエラーを実行時に検出します。UndefinedBehaviorSanitizer（-fsanitize=undefined）は未定義動作を検出します。ThreadSanitizer（-fsanitize=thread）はデータ競合を検出します。",
        code: `#include <iostream>
#include <vector>
#include <cassert>

// static_assert: コンパイル時チェック
static_assert(sizeof(int) >= 4, "intは4バイト以上必要");
static_assert(sizeof(void*) == 8, "64bit必須");

// assert: 実行時チェック
void process(int* ptr, size_t size) {
    assert(ptr != nullptr && "nullポインタ");
    assert(size > 0 && "サイズが0");
    for (size_t i = 0; i < size; ++i) {
        ptr[i] *= 2;
    }
}

int main() {
    std::vector<int> v = {1, 2, 3, 4, 5};
    process(v.data(), v.size());

    for (auto x : v) std::cout << x << " ";
    std::cout << std::endl;

    return 0;
}

// コンパイルオプション:
// デバッグ:     g++ -g -O0 -std=c++17 debug.cpp
// ASan:         g++ -g -fsanitize=address debug.cpp
// UBSan:        g++ -g -fsanitize=undefined debug.cpp
// TSan:         g++ -g -fsanitize=thread -pthread debug.cpp`,
      },
      {
        title: "ユニットテスト",
        content:
          "Google Test（gtest）はC++の代表的なテストフレームワークです。TEST/TEST_Fマクロでテストケースを定義し、EXPECT_EQ/ASSERT_EQで検証します。Catch2やdoctestも人気のある軽量フレームワークです。テストはCI/CDパイプラインに組み込むのが標準的です。",
        code: `// Google Testの例
// #include <gtest/gtest.h>
#include <iostream>
#include <string>
#include <stdexcept>

// テスト対象
class Calculator {
public:
    int add(int a, int b) const { return a + b; }
    int divide(int a, int b) const {
        if (b == 0) throw std::invalid_argument("zero division");
        return a / b;
    }
};

// 簡易テストフレームワーク
#define TEST_EQ(name, expr, expected) do { \\
    auto result = (expr); \\
    if (result == (expected)) { \\
        std::cout << "[PASS] " << name << std::endl; \\
    } else { \\
        std::cout << "[FAIL] " << name \\
                  << " (got " << result << ")" << std::endl; \\
    } \\
} while(0)

#define TEST_THROW(name, expr, exc_type) do { \\
    try { expr; std::cout << "[FAIL] " << name << " (no throw)" << std::endl; } \\
    catch (const exc_type&) { std::cout << "[PASS] " << name << std::endl; } \\
    catch (...) { std::cout << "[FAIL] " << name << " (wrong type)" << std::endl; } \\
} while(0)

int main() {
    Calculator calc;
    TEST_EQ("add positive", calc.add(2, 3), 5);
    TEST_EQ("add negative", calc.add(-1, -2), -3);
    TEST_EQ("divide", calc.divide(10, 3), 3);
    TEST_THROW("divide by zero", calc.divide(1, 0), std::invalid_argument);
    return 0;
}`,
      },
      {
        title: "パフォーマンス計測",
        content:
          "std::chrono（C++11）で高精度な時間計測が可能です。Google Benchmarkは統計的に信頼性の高いマイクロベンチマークを提供します。最適化によりコードが除去されないよう、benchmark::DoNotOptimize等で結果を使用する必要があります。",
        code: `#include <iostream>
#include <chrono>
#include <vector>
#include <algorithm>
#include <numeric>
#include <random>

// 計測ヘルパー
template<typename Func>
double benchmark(const std::string& name, Func f, int iterations = 100) {
    auto start = std::chrono::high_resolution_clock::now();
    for (int i = 0; i < iterations; ++i) f();
    auto end = std::chrono::high_resolution_clock::now();
    auto ms = std::chrono::duration<double, std::milli>(end - start).count();
    std::cout << name << ": " << ms / iterations << "ms (avg)" << std::endl;
    return ms / iterations;
}

int main() {
    constexpr int N = 100000;
    std::mt19937 rng(42);

    benchmark("vector sort", [&]() {
        std::vector<int> v(N);
        std::iota(v.begin(), v.end(), 0);
        std::shuffle(v.begin(), v.end(), rng);
        std::sort(v.begin(), v.end());
    }, 10);

    benchmark("accumulate", [&]() {
        std::vector<int> v(N, 1);
        volatile auto sum = std::accumulate(v.begin(), v.end(), 0);
        (void)sum;
    }, 100);

    return 0;
}`,
      },
    ],
  },
  {
    id: "best-practices",
    title: "ベストプラクティス",
    description: "Core Guidelines、const正確性、Rule of 5、パフォーマンス",
    category: "expert",
    sections: [
      {
        title: "C++ Core Guidelines",
        content:
          "C++ Core Guidelinesはストラウストラップとサッターが策定したベストプラクティス集です。主な原則：型安全・リソース安全・パフォーマンス。生のポインタの所有権管理を避けスマートポインタを使う、constを積極的に使う、小さな関数を書く、グローバル変数を避けるなどが挙げられます。",
        code: `#include <iostream>
#include <memory>
#include <vector>
#include <string>
#include <span>

// ガイドライン準拠の関数設計
// I.4: インターフェースを正確かつ厳密に型付けする
// F.16: "in"パラメータは安価なコピーは値渡し、それ以外はconst参照
void process(std::string_view name, int count) {
    std::cout << name << ": " << count << std::endl;
}

// F.21: 複数の値を返すにはstructかtupleを使う
struct Result {
    bool success;
    std::string message;
};

Result do_work(int id) {
    if (id > 0) return {true, "成功"};
    return {false, "無効なID"};
}

// R.1: リソースはスマートポインタで管理
// C.149: naked new/deleteを避ける
class Widget {
    std::string name_;
public:
    explicit Widget(std::string name) : name_(std::move(name)) {}
    const std::string& name() const { return name_; }
};

int main() {
    // スマートポインタ
    auto w = std::make_unique<Widget>("example");

    // span: 配列の安全なビュー（C++20）
    int arr[] = {1, 2, 3, 4, 5};
    std::span<int> s(arr);
    for (auto x : s) std::cout << x << " ";
    std::cout << std::endl;

    auto [ok, msg] = do_work(1);
    std::cout << msg << std::endl;
    return 0;
}`,
      },
      {
        title: "Rule of 0/3/5",
        content:
          "Rule of 0: リソースを直接管理しないクラスはデストラクタ、コピー、ムーブ演算子を定義しない（スマートポインタに任せる）。Rule of 5: リソースを直接管理する場合、デストラクタ・コピーコンストラクタ・コピー代入・ムーブコンストラクタ・ムーブ代入の5つすべてを定義する。Rule of 0が最も推奨されます。",
        code: `#include <iostream>
#include <memory>
#include <string>
#include <vector>

// Rule of 0（推奨）: スマートポインタに任せる
class UserProfile {
    std::string name_;
    std::vector<std::string> tags_;
    std::unique_ptr<int[]> data_;
public:
    UserProfile(std::string name, size_t data_size)
        : name_(std::move(name))
        , data_(std::make_unique<int[]>(data_size)) {}
    // デストラクタ、コピー、ムーブは全て自動生成で正しく動作
};

// Rule of 5: 生リソース管理（避けるべきだが教育目的）
class RawBuffer {
    int* data_;
    size_t size_;
public:
    explicit RawBuffer(size_t n) : data_(new int[n]{}), size_(n) {}
    ~RawBuffer() { delete[] data_; }

    // コピー
    RawBuffer(const RawBuffer& o) : data_(new int[o.size_]), size_(o.size_) {
        std::copy(o.data_, o.data_ + size_, data_);
    }
    RawBuffer& operator=(const RawBuffer& o) {
        if (this != &o) { RawBuffer tmp(o); std::swap(data_, tmp.data_); std::swap(size_, tmp.size_); }
        return *this;
    }
    // ムーブ
    RawBuffer(RawBuffer&& o) noexcept : data_(o.data_), size_(o.size_) { o.data_ = nullptr; o.size_ = 0; }
    RawBuffer& operator=(RawBuffer&& o) noexcept {
        if (this != &o) { delete[] data_; data_ = o.data_; size_ = o.size_; o.data_ = nullptr; o.size_ = 0; }
        return *this;
    }
};

int main() {
    UserProfile p("太郎", 100); // Rule of 0
    return 0;
}`,
      },
      {
        title: "パフォーマンス最適化",
        content:
          "最適化の原則：まず正しく書き、次に計測し、最後に最適化します。reserve()でvectorの再確保を防ぐ、emplace系で直接構築、ムーブセマンティクスの活用、SSOを意識した短い文字列の活用、キャッシュフレンドリーなデータ配置などが基本的なテクニックです。",
        code: `#include <iostream>
#include <vector>
#include <string>
#include <chrono>

// reserve()による最適化
void demo_reserve() {
    // 悪い例: 再確保が多発
    std::vector<int> v1;
    for (int i = 0; i < 100000; ++i) v1.push_back(i);

    // 良い例: 事前確保
    std::vector<int> v2;
    v2.reserve(100000);
    for (int i = 0; i < 100000; ++i) v2.push_back(i);
}

// emplace vs push
void demo_emplace() {
    std::vector<std::pair<std::string, int>> v;

    // push_back: 一時オブジェクト作成→ムーブ
    v.push_back(std::make_pair("太郎", 25));

    // emplace_back: 直接構築（効率的）
    v.emplace_back("花子", 22);
}

// ムーブの活用
std::vector<std::string> create_data() {
    std::vector<std::string> v;
    v.reserve(3);
    v.emplace_back("alpha");
    v.emplace_back("beta");
    v.emplace_back("gamma");
    return v; // NRVOまたはムーブ（コピーなし）
}

int main() {
    demo_reserve();
    demo_emplace();
    auto data = create_data();
    for (const auto& s : data) std::cout << s << " ";
    std::cout << std::endl;
    return 0;
}`,
      },
    ],
  },
];
