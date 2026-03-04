export interface JavaScriptSection {
  title: string;
  content: string;
  code?: string;
}

export interface JavaScriptChapter {
  id: string;
  title: string;
  category: string;
  description: string;
  sections: JavaScriptSection[];
}

export const javascriptCategories = [
  { id: "basics", name: "基礎文法", color: "var(--color-dads-cyan)" },
  { id: "functions", name: "関数・スコープ", color: "var(--color-dads-blue)" },
  { id: "objects", name: "オブジェクト・配列", color: "var(--color-dads-purple)" },
  { id: "async", name: "非同期処理", color: "var(--color-dads-error)" },
  { id: "dom", name: "DOM・ブラウザAPI", color: "var(--color-dads-warning)" },
  { id: "modern", name: "モダンJavaScript", color: "var(--color-dads-success)" },
  { id: "practice", name: "実践パターン", color: "var(--color-dads-navy)" },
] as const;

export const javascriptChapters: JavaScriptChapter[] = [
  // ===== 基礎文法 =====
  {
    id: "variables-types",
    title: "変数とデータ型",
    category: "basics",
    description:
      "let/const/var の違い、プリミティブ型、型変換、typeof 演算子を理解する",
    sections: [
      {
        title: "let / const / var の違い",
        content:
          "JavaScript には変数宣言に let、const、var の3つがあります。let はブロックスコープの変数宣言で再代入可能です。const もブロックスコープですが再代入不可（ただしオブジェクトのプロパティは変更可能）。var は関数スコープで巻き上げ（hoisting）が発生するため、現代の JavaScript では let/const の使用が推奨されます。",
        code: `// let — 再代入可能、ブロックスコープ
let count = 0;
count = 1; // OK

// const — 再代入不可、ブロックスコープ
const PI = 3.14159;
// PI = 3; // TypeError: Assignment to constant variable

// const でもオブジェクトの中身は変更可能
const user = { name: "Alice" };
user.name = "Bob"; // OK（プロパティの変更は可能）
// user = {};      // TypeError（再代入は不可）

// var — 関数スコープ、巻き上げあり（非推奨）
console.log(x); // undefined（エラーにならない！）
var x = 10;

// let/const はブロックスコープ
{
  let a = 1;
  const b = 2;
}
// console.log(a); // ReferenceError`,
      },
      {
        title: "プリミティブ型とオブジェクト型",
        content:
          "JavaScript のデータ型は7つのプリミティブ型（string, number, bigint, boolean, undefined, null, symbol）とオブジェクト型に分かれます。プリミティブ型は値そのものが変数に格納され、イミュータブルです。オブジェクト型は参照が格納され、プロパティの変更が可能です。",
        code: `// プリミティブ型（7種類）
const str = "Hello";          // string
const num = 42;               // number
const big = 9007199254740991n; // bigint
const bool = true;            // boolean
const undef = undefined;      // undefined
const empty = null;            // null
const sym = Symbol("id");     // symbol

// number の特殊値
console.log(0.1 + 0.2);          // 0.30000000000000004
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Infinity, -Infinity, NaN);

// typeof 演算子
typeof "hello"    // "string"
typeof 42         // "number"
typeof true       // "boolean"
typeof undefined  // "undefined"
typeof null       // "object" ← 歴史的なバグ
typeof {}         // "object"
typeof []         // "object" ← 配列も object
Array.isArray([]) // true（配列判定はこちら）`,
      },
      {
        title: "型変換と等価比較",
        content:
          "JavaScript は動的型付けのため、暗黙的な型変換（型強制）が頻繁に発生します。== は型変換を伴う等価比較、=== は型変換なしの厳密等価比較です。予期しないバグを防ぐため、常に === の使用が推奨されます。明示的な型変換には String(), Number(), Boolean() を使います。",
        code: `// 暗黙的な型変換（型強制）
"5" + 3      // "53"（文字列結合）
"5" - 3      // 2（数値演算）
"5" * "2"    // 10
true + 1     // 2
null + 1     // 1
undefined + 1 // NaN

// == vs ===
0 == false     // true（型変換が発生）
0 === false    // false（型が異なる）
"" == false    // true
"" === false   // false
null == undefined  // true
null === undefined // false

// 明示的な型変換
String(123)     // "123"
Number("42")    // 42
Number("")      // 0
Number("abc")   // NaN
Boolean(0)      // false
Boolean("")     // false
Boolean(null)   // false
Boolean("hello") // true

// falsy な値（false と評価される）
// false, 0, -0, 0n, "", null, undefined, NaN`,
      },
    ],
  },
  {
    id: "control-flow",
    title: "制御構文",
    category: "basics",
    description:
      "if/else、switch、for/while ループ、三項演算子、for...of/in の使い分け",
    sections: [
      {
        title: "条件分岐（if / switch）",
        content:
          "if/else は条件に基づいて処理を分岐する最も基本的な構文です。switch は特定の値に対する複数の分岐に適しています。三項演算子（条件 ? 真 : 偽）は簡潔な条件式に便利です。Nullish coalescing（??）や Optional chaining（?.）もモダン JavaScript では頻繁に使われます。",
        code: `// if / else if / else
const score = 85;
if (score >= 90) {
  console.log("A");
} else if (score >= 80) {
  console.log("B"); // ← これが実行される
} else {
  console.log("C");
}

// switch（break を忘れるとフォールスルー）
const fruit = "apple";
switch (fruit) {
  case "apple":
    console.log("りんご");
    break;
  case "banana":
    console.log("バナナ");
    break;
  default:
    console.log("不明");
}

// 三項演算子
const age = 20;
const status = age >= 18 ? "成人" : "未成年";

// Nullish coalescing（?? — null/undefined のみ）
const name = null;
console.log(name ?? "ゲスト"); // "ゲスト"
console.log(name || "ゲスト"); // "ゲスト"
console.log(0 ?? 42);    // 0（?? は 0 を有効値と扱う）
console.log(0 || 42);    // 42（|| は 0 を falsy と扱う）`,
      },
      {
        title: "ループ（for / while / for...of）",
        content:
          "for ループは回数が決まった繰り返し、while は条件ベースの繰り返しに使います。for...of はイテラブル（配列、文字列、Map、Set）の値を順に取得します。for...in はオブジェクトのプロパティキーを列挙しますが、配列には使用しないのが推奨です。",
        code: `// for ループ
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// while / do...while
let count = 0;
while (count < 3) {
  console.log(count++); // 0, 1, 2
}

// for...of（配列・文字列・Map・Set に使用）
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(fruit);
}

// インデックスも必要な場合
for (const [index, fruit] of fruits.entries()) {
  console.log(\`\${index}: \${fruit}\`);
}

// for...in（オブジェクトのキーを列挙）
const obj = { a: 1, b: 2, c: 3 };
for (const key in obj) {
  console.log(\`\${key}: \${obj[key]}\`);
}

// break と continue
for (let i = 0; i < 10; i++) {
  if (i === 3) continue; // 3 をスキップ
  if (i === 7) break;    // 7 で終了
  console.log(i); // 0, 1, 2, 4, 5, 6
}`,
      },
      {
        title: "例外処理と制御フロー",
        content:
          "try-catch-finally はエラーが発生する可能性のあるコードを安全に実行するための構文です。throw で任意のエラーをスローできます。ラベル付き break/continue はネストしたループの制御に使います。早期リターンパターンはネストを減らしてコードを読みやすくします。",
        code: `// try-catch-finally
try {
  const data = JSON.parse('{"name": "Alice"}');
  console.log(data.name);
} catch (error) {
  console.error("パース失敗:", error.message);
} finally {
  console.log("常に実行される");
}

// throw でエラーをスロー
function divide(a, b) {
  if (b === 0) {
    throw new Error("0で割ることはできません");
  }
  return a / b;
}

// 早期リターン（ガード節）
// ❌ ネストが深い
function processUser(user) {
  if (user) {
    if (user.isActive) {
      if (user.hasPermission) {
        // 処理...
      }
    }
  }
}

// ✅ 早期リターンで読みやすく
function processUser(user) {
  if (!user) return;
  if (!user.isActive) return;
  if (!user.hasPermission) return;
  // 処理...
}`,
      },
    ],
  },

  // ===== 関数・スコープ =====
  {
    id: "functions",
    title: "関数の基本",
    category: "functions",
    description:
      "関数宣言と関数式、アロー関数、デフォルト引数、残余引数を理解する",
    sections: [
      {
        title: "関数宣言と関数式",
        content:
          "JavaScript の関数定義には関数宣言と関数式の2つの方法があります。関数宣言は巻き上げ（hoisting）されるため、定義前に呼び出せます。関数式は変数に代入する形で定義し、巻き上げされません。関数はファーストクラスオブジェクトであり、変数に代入したり引数として渡したりできます。",
        code: `// 関数宣言（hoisting される）
greet("Alice"); // OK — 定義前に呼び出せる
function greet(name) {
  return \`Hello, \${name}!\`;
}

// 関数式（hoisting されない）
// sayHi("Bob"); // ReferenceError
const sayHi = function(name) {
  return \`Hi, \${name}!\`;
};

// 関数はファーストクラスオブジェクト
const add = function(a, b) { return a + b; };
const calc = add; // 関数を変数に代入
console.log(calc(2, 3)); // 5

// 関数を引数として渡す（コールバック）
function execute(fn, a, b) {
  return fn(a, b);
}
execute(add, 10, 20); // 30

// 関数を返す（高階関数）
function multiplier(factor) {
  return function(num) {
    return num * factor;
  };
}
const double = multiplier(2);
double(5); // 10`,
      },
      {
        title: "アロー関数",
        content:
          "アロー関数（=>）は ES6 で導入された関数の簡潔な記法です。function キーワードを省略でき、本体が1つの式なら return と波括弧も省略可能です。重要な違いとして、アロー関数は自身の this を持たず、外側のスコープの this を継承します（レキシカル this）。",
        code: `// アロー関数の基本
const add = (a, b) => a + b;
const square = x => x * x;  // 引数1つなら () 省略可
const greet = () => "Hello!"; // 引数なし

// 複数行の場合は {} と return が必要
const getUser = (id) => {
  const user = { id, name: "Alice" };
  return user;
};

// オブジェクトを返す場合は () で囲む
const makeUser = (name) => ({ name, active: true });

// this の違い
const obj = {
  name: "Alice",
  // 通常の関数 — this は obj を参照
  greet() {
    console.log(\`Hello, \${this.name}\`);
  },
  // アロー関数 — this は外側のスコープ（グローバル）
  greetArrow: () => {
    console.log(\`Hello, \${this.name}\`); // undefined
  },
  // setTimeout でのよくあるパターン
  delayedGreet() {
    setTimeout(() => {
      // アロー関数なので this は obj を参照
      console.log(\`Hello, \${this.name}\`);
    }, 1000);
  },
};`,
      },
      {
        title: "デフォルト引数と残余引数",
        content:
          "デフォルト引数は引数が渡されなかった場合のデフォルト値を設定できます。残余引数（...args）は可変長の引数を配列として受け取ります。スプレッド演算子（...）は配列を展開して個別の引数として渡します。これらは ES6 で導入され、柔軟な関数定義を可能にします。",
        code: `// デフォルト引数
function greet(name = "ゲスト", greeting = "こんにちは") {
  return \`\${greeting}、\${name}さん！\`;
}
greet();              // "こんにちは、ゲストさん！"
greet("Alice");       // "こんにちは、Aliceさん！"
greet("Bob", "やあ"); // "やあ、Bobさん！"

// 残余引数（Rest parameters）
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3);     // 6
sum(1, 2, 3, 4, 5); // 15

// 最初の引数と残りを分離
function log(level, ...messages) {
  console.log(\`[\${level}]\`, ...messages);
}
log("INFO", "サーバー起動", "ポート3000");

// スプレッド演算子（配列を展開）
const nums = [3, 1, 4, 1, 5];
Math.max(...nums); // 5

// 配列の結合
const a = [1, 2];
const b = [3, 4];
const combined = [...a, ...b]; // [1, 2, 3, 4]`,
      },
    ],
  },
  {
    id: "scope-closure",
    title: "スコープとクロージャ",
    category: "functions",
    description:
      "レキシカルスコープ、クロージャの仕組み、ブロックスコープ、巻き上げを理解する",
    sections: [
      {
        title: "レキシカルスコープ",
        content:
          "JavaScript のスコープは関数が定義された場所で決定されます（レキシカルスコープ）。内側のスコープから外側のスコープの変数にアクセスできますが、逆はできません。スコープチェーンは現在のスコープから順に外側のスコープを辿って変数を探索します。",
        code: `// レキシカルスコープ
const global = "グローバル";

function outer() {
  const outerVar = "外側";

  function inner() {
    const innerVar = "内側";
    console.log(global);   // "グローバル" — アクセス可能
    console.log(outerVar); // "外側" — アクセス可能
    console.log(innerVar); // "内側" — 自身のスコープ
  }

  inner();
  // console.log(innerVar); // ReferenceError
}

// スコープチェーンの探索順序
// inner → outer → global

// ブロックスコープ（let / const）
if (true) {
  let blockVar = "ブロック内";
  var funcVar = "関数内"; // var は関数スコープ
}
// console.log(blockVar); // ReferenceError
console.log(funcVar);     // "関数内" — アクセス可能`,
      },
      {
        title: "クロージャ",
        content:
          "クロージャは関数とその関数が作られた環境（レキシカル環境）の組み合わせです。内側の関数が外側の関数の変数を参照し続ける仕組みで、外側の関数が実行を終えた後も変数が保持されます。データのカプセル化、ファクトリー関数、イベントハンドラなどで広く使われます。",
        code: `// クロージャの基本
function createCounter() {
  let count = 0; // クロージャで保持される
  return {
    increment() { return ++count; },
    decrement() { return --count; },
    getCount() { return count; },
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.getCount();  // 2
// count に直接アクセスはできない（カプセル化）

// クロージャによるファクトリー
function createGreeter(greeting) {
  return function(name) {
    return \`\${greeting}, \${name}!\`;
  };
}
const hello = createGreeter("Hello");
const hola = createGreeter("Hola");
hello("Alice"); // "Hello, Alice!"
hola("Bob");    // "Hola, Bob!"

// よくある落とし穴: ループとクロージャ
// ❌ var — 全て同じ i を参照
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 3, 3, 3
}
// ✅ let — 各反復で新しいスコープ
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // 0, 1, 2
}`,
      },
      {
        title: "巻き上げ（Hoisting）",
        content:
          "巻き上げは JavaScript エンジンが変数や関数の宣言をスコープの先頭に移動させる動作です。var 宣言は undefined で初期化されますが、let/const は「一時的なデッドゾーン（TDZ）」に入り、宣言に到達するまでアクセスするとエラーになります。関数宣言は完全に巻き上げられますが、関数式は巻き上げされません。",
        code: `// var の巻き上げ
console.log(x); // undefined（宣言だけ巻き上げ）
var x = 10;
// ↑ 実際の動作:
// var x;           // 宣言が巻き上げ
// console.log(x);  // undefined
// x = 10;          // 代入はそのまま

// let/const の TDZ（Temporal Dead Zone）
// console.log(y); // ReferenceError
let y = 20;        // ここまでが TDZ

// 関数宣言の巻き上げ（完全に巻き上げ）
hello(); // "Hello!" — 定義前に呼べる
function hello() {
  console.log("Hello!");
}

// 関数式は巻き上げされない
// greet(); // TypeError: greet is not a function
var greet = function() {
  console.log("Hi!");
};

// const + アロー関数も同様
// add(1, 2); // ReferenceError
const add = (a, b) => a + b;`,
      },
    ],
  },

  // ===== オブジェクト・配列 =====
  {
    id: "objects",
    title: "オブジェクト操作",
    category: "objects",
    description:
      "プロパティとメソッド、スプレッド構文、分割代入、Optional chaining を使いこなす",
    sections: [
      {
        title: "オブジェクトの基本操作",
        content:
          "JavaScript のオブジェクトはキーと値のペアの集合です。プロパティにはドット記法またはブラケット記法でアクセスします。ES6 ではプロパティの短縮記法、計算されたプロパティ名、メソッドの短縮記法が使えます。Object.keys/values/entries でプロパティを列挙できます。",
        code: `// オブジェクトリテラル
const user = {
  name: "Alice",
  age: 25,
  greet() {
    return \`Hello, I'm \${this.name}\`;
  },
};

// アクセス
user.name;          // "Alice"
user["age"];        // 25（ブラケット記法）
const key = "name";
user[key];          // "Alice"（動的キー）

// ES6 プロパティ短縮記法
const name = "Bob";
const age = 30;
const bob = { name, age }; // { name: "Bob", age: 30 }

// 計算されたプロパティ名
const prop = "score";
const obj = { [prop]: 100 }; // { score: 100 }

// Object メソッド
Object.keys(user);    // ["name", "age", "greet"]
Object.values(user);  // ["Alice", 25, ƒ]
Object.entries(user);  // [["name","Alice"],["age",25],...]

// プロパティの存在確認
"name" in user;              // true
user.hasOwnProperty("name"); // true`,
      },
      {
        title: "スプレッド構文と分割代入",
        content:
          "スプレッド構文（...）はオブジェクトの全プロパティを展開してコピーや結合ができます。分割代入はオブジェクトのプロパティを個別の変数に取り出す構文です。デフォルト値、リネーム、ネストした分割代入も可能です。関数の引数でも頻繁に使われるパターンです。",
        code: `// スプレッド構文（シャローコピー）
const original = { a: 1, b: 2 };
const copy = { ...original };
const extended = { ...original, c: 3 }; // { a:1, b:2, c:3 }

// プロパティの上書き（後勝ち）
const defaults = { theme: "light", lang: "ja" };
const config = { ...defaults, theme: "dark" };
// { theme: "dark", lang: "ja" }

// 分割代入
const { name, age } = { name: "Alice", age: 25 };

// デフォルト値
const { role = "user" } = {};
console.log(role); // "user"

// リネーム
const { name: userName } = { name: "Alice" };
console.log(userName); // "Alice"

// ネストした分割代入
const { address: { city } } = {
  address: { city: "Tokyo", zip: "100-0001" },
};

// 関数引数での分割代入
function greet({ name, age = 0 }) {
  return \`\${name} (\${age}歳)\`;
}
greet({ name: "Alice", age: 25 });`,
      },
      {
        title: "Optional chaining とプロパティ操作",
        content:
          "Optional chaining（?.）は null/undefined のプロパティにアクセスしてもエラーにならず undefined を返す演算子です。深くネストしたオブジェクトの安全なアクセスに便利です。Object.assign、Object.freeze、Object.fromEntries なども実用的なメソッドです。",
        code: `// Optional chaining（?.）
const user = {
  name: "Alice",
  address: { city: "Tokyo" },
};

user.address?.city;      // "Tokyo"
user.phone?.number;      // undefined（エラーにならない）
user.getAge?.();         // undefined（メソッド呼び出し）
user.friends?.[0];       // undefined（配列アクセス）

// ?? と組み合わせ
const city = user.address?.city ?? "不明";

// Object.assign（マージ）
const target = { a: 1 };
Object.assign(target, { b: 2 }, { c: 3 });
// target = { a: 1, b: 2, c: 3 }

// Object.freeze（凍結 — 変更不可に）
const frozen = Object.freeze({ name: "Alice" });
frozen.name = "Bob"; // 無視される（strict mode ではエラー）

// Object.fromEntries（エントリからオブジェクト生成）
const entries = [["a", 1], ["b", 2]];
Object.fromEntries(entries); // { a: 1, b: 2 }

// プロパティの削除
const obj = { a: 1, b: 2, c: 3 };
delete obj.b; // { a: 1, c: 3 }

// 残余プロパティで削除（イミュータブル）
const { b, ...rest } = obj; // rest = { a: 1, c: 3 }`,
      },
    ],
  },
  {
    id: "arrays",
    title: "配列操作",
    category: "objects",
    description:
      "map/filter/reduce、find、some/every、flat、ソートなど配列メソッドを使いこなす",
    sections: [
      {
        title: "配列の変換（map / filter / reduce）",
        content:
          "map は各要素を変換して新しい配列を返します。filter は条件に合う要素だけの新しい配列を返します。reduce は配列を単一の値に集約します。これらは元の配列を変更しない非破壊的メソッドで、関数型プログラミングの基本です。チェーンして組み合わせることができます。",
        code: `const numbers = [1, 2, 3, 4, 5];

// map — 各要素を変換
const doubled = numbers.map(n => n * 2);
// [2, 4, 6, 8, 10]

// filter — 条件に合う要素を抽出
const evens = numbers.filter(n => n % 2 === 0);
// [2, 4]

// reduce — 単一の値に集約
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 15

// チェーン: 偶数を2倍にして合計
const result = numbers
  .filter(n => n % 2 === 0)   // [2, 4]
  .map(n => n * 2)             // [4, 8]
  .reduce((acc, n) => acc + n, 0); // 12

// reduce で集計
const fruits = ["apple", "banana", "apple", "cherry", "banana", "apple"];
const counts = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
// { apple: 3, banana: 2, cherry: 1 }`,
      },
      {
        title: "検索・判定メソッド",
        content:
          "find は条件に合う最初の要素を返します。findIndex はそのインデックスを返します。some は1つでも条件に合う要素があれば true、every は全要素が条件を満たせば true を返します。includes は値の存在確認に使います。これらを使い分けることで効率的な配列操作が可能になります。",
        code: `const users = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];

// find — 条件に合う最初の要素
const bob = users.find(u => u.name === "Bob");
// { id: 2, name: "Bob", age: 30 }

// findIndex — 条件に合う最初のインデックス
const index = users.findIndex(u => u.age > 28); // 1

// some — 1つでも条件を満たすか
users.some(u => u.age >= 30); // true

// every — 全て条件を満たすか
users.every(u => u.age >= 20); // true

// includes — 値の存在確認
[1, 2, 3].includes(2); // true
"hello".includes("ell"); // true

// indexOf — 値のインデックス
[10, 20, 30].indexOf(20); // 1
[10, 20, 30].indexOf(99); // -1（見つからない）

// findLast / findLastIndex（ES2023）
const lastAdult = users.findLast(u => u.age >= 30);
// { id: 3, name: "Charlie", age: 35 }`,
      },
      {
        title: "その他の配列操作",
        content:
          "flat は多次元配列を平坦化します。flatMap は map と flat(1) を組み合わせた処理です。sort は配列をソートしますが、破壊的操作なので注意が必要です。toSorted/toReversed（ES2023）は非破壊的な代替メソッドです。スプレッド構文や Array.from も頻繁に使われます。",
        code: `// flat（多次元配列を平坦化）
[1, [2, 3], [4, [5]]].flat();    // [1, 2, 3, 4, [5]]
[1, [2, 3], [4, [5]]].flat(Infinity); // [1, 2, 3, 4, 5]

// flatMap（map + flat(1)）
const sentences = ["Hello World", "Goodbye Moon"];
sentences.flatMap(s => s.split(" "));
// ["Hello", "World", "Goodbye", "Moon"]

// sort（破壊的！）
const nums = [3, 1, 4, 1, 5];
nums.sort((a, b) => a - b); // [1, 1, 3, 4, 5] 昇順
nums.sort((a, b) => b - a); // [5, 4, 3, 1, 1] 降順

// toSorted（非破壊的、ES2023）
const sorted = [3, 1, 2].toSorted((a, b) => a - b);
// [1, 2, 3]（元の配列は変更されない）

// スプレッドでコピーしてからソート
const original = [3, 1, 2];
const sorted2 = [...original].sort((a, b) => a - b);

// Array.from
Array.from({ length: 5 }, (_, i) => i);
// [0, 1, 2, 3, 4]

// 配列の結合
const a = [1, 2];
const b = [3, 4];
[...a, ...b];    // [1, 2, 3, 4]
a.concat(b);     // [1, 2, 3, 4]

// 重複の除去
const unique = [...new Set([1, 2, 2, 3, 3])];
// [1, 2, 3]`,
      },
    ],
  },
  {
    id: "classes",
    title: "クラスとプロトタイプ",
    category: "objects",
    description:
      "class 構文、継承、プロトタイプチェーン、static メソッドを理解する",
    sections: [
      {
        title: "class 構文の基本",
        content:
          "ES6 の class 構文はプロトタイプベースの継承を分かりやすく記述するためのシンタックスシュガーです。constructor でインスタンスの初期化を行い、メソッドはプロトタイプに定義されます。getter/setter でプロパティのアクセスを制御できます。",
        code: `class User {
  // コンストラクタ
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  // メソッド
  greet() {
    return \`Hello, I'm \${this.name}\`;
  }

  // getter
  get info() {
    return \`\${this.name} (\${this.age}歳)\`;
  }

  // setter
  set nickname(value) {
    if (value.length < 2) throw new Error("短すぎます");
    this._nickname = value;
  }

  get nickname() {
    return this._nickname || this.name;
  }
}

const alice = new User("Alice", 25);
alice.greet();  // "Hello, I'm Alice"
alice.info;     // "Alice (25歳)"

// instanceof で型チェック
alice instanceof User; // true`,
      },
      {
        title: "継承と super",
        content:
          "extends キーワードでクラスを継承できます。子クラスのコンストラクタでは super() を呼んで親クラスのコンストラクタを実行する必要があります。super.method() で親クラスのメソッドを呼び出せます。メソッドのオーバーライドも可能です。",
        code: `class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return \`\${this.name} が鳴く\`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // 親のコンストラクタを呼ぶ（必須）
    this.breed = breed;
  }

  // メソッドのオーバーライド
  speak() {
    return \`\${this.name} がワンと鳴く\`;
  }

  // 親メソッドの呼び出し
  info() {
    return \`\${super.speak()} — 犬種: \${this.breed}\`;
  }
}

const dog = new Dog("ポチ", "柴犬");
dog.speak(); // "ポチ がワンと鳴く"
dog.info();  // "ポチ が鳴く — 犬種: 柴犬"

dog instanceof Dog;    // true
dog instanceof Animal; // true`,
      },
      {
        title: "static とプロトタイプチェーン",
        content:
          "static メソッド/プロパティはクラス自体に属し、インスタンスからはアクセスできません。プライベートフィールド（#）は ES2022 で導入され、クラス外からアクセスできません。JavaScript のクラスは内部的にプロトタイプチェーンで動作しています。",
        code: `class MathUtils {
  // static メソッド（クラスから直接呼び出す）
  static add(a, b) { return a + b; }
  static PI = 3.14159;
}
MathUtils.add(1, 2); // 3
MathUtils.PI;        // 3.14159
// new MathUtils().add(1, 2); // TypeError

// プライベートフィールド（ES2022）
class BankAccount {
  #balance = 0; // プライベート

  deposit(amount) {
    if (amount <= 0) throw new Error("無効な金額");
    this.#balance += amount;
  }

  get balance() {
    return this.#balance;
  }
}
const account = new BankAccount();
account.deposit(1000);
account.balance;   // 1000
// account.#balance; // SyntaxError

// プロトタイプチェーン
class A { method() { return "A"; } }
class B extends A { }
class C extends B { }

const c = new C();
c.method(); // "A" — C → B → A のチェーンで探索

// プロトタイプの確認
Object.getPrototypeOf(c) === C.prototype; // true
c.__proto__.__proto__ === A.prototype;    // true`,
      },
    ],
  },

  // ===== 非同期処理 =====
  {
    id: "promises",
    title: "Promise",
    category: "async",
    description:
      "Promise の基本、チェーン、Promise.all/race/allSettled/any を理解する",
    sections: [
      {
        title: "Promise の基本",
        content:
          "Promise は非同期処理の結果を表すオブジェクトです。状態は pending（保留）、fulfilled（成功）、rejected（失敗）の3つ。then() で成功時の処理、catch() でエラー処理、finally() で完了後の処理を登録します。コールバック地獄を解消するために導入されました。",
        code: `// Promise の作成
const promise = new Promise((resolve, reject) => {
  const success = true;
  setTimeout(() => {
    if (success) {
      resolve("成功！");
    } else {
      reject(new Error("失敗"));
    }
  }, 1000);
});

// Promise の使用
promise
  .then(result => console.log(result))   // "成功！"
  .catch(error => console.error(error))
  .finally(() => console.log("完了"));

// Promise.resolve / Promise.reject
const resolved = Promise.resolve(42);
const rejected = Promise.reject(new Error("エラー"));

// コールバック地獄 → Promise チェーン
// ❌ コールバック地獄
getData(id, (data) => {
  process(data, (result) => {
    save(result, (response) => {
      // ネストが深くなる...
    });
  });
});

// ✅ Promise チェーン
getData(id)
  .then(data => process(data))
  .then(result => save(result))
  .then(response => console.log(response))
  .catch(error => console.error(error));`,
      },
      {
        title: "Promise チェーン",
        content:
          "then() は新しい Promise を返すため、チェーンして連続した非同期処理を記述できます。then() から値を返すとその値で resolve された Promise になり、Promise を返すとその Promise の結果が次の then に渡されます。エラーはチェーンの途中で catch() で捕捉できます。",
        code: `// Promise チェーンの詳細
fetch("/api/user/1")
  .then(response => {
    if (!response.ok) throw new Error("HTTP Error");
    return response.json(); // Promise を返す
  })
  .then(user => {
    console.log(user.name);
    return fetch(\`/api/posts?userId=\${user.id}\`);
  })
  .then(response => response.json())
  .then(posts => {
    console.log(\`投稿数: \${posts.length}\`);
  })
  .catch(error => {
    // チェーン内のどこでエラーが発生しても捕捉
    console.error("エラー:", error.message);
  })
  .finally(() => {
    console.log("リクエスト完了");
  });

// then の戻り値
Promise.resolve(1)
  .then(x => x + 1)          // 2（値を返す → resolve(2)）
  .then(x => x * 3)          // 6
  .then(x => {
    console.log(x);           // 6
    // return がないと undefined
  })
  .then(x => console.log(x)); // undefined`,
      },
      {
        title: "Promise の並行処理",
        content:
          "Promise.all は全 Promise が成功した場合に結果の配列を返します（1つでも失敗すると reject）。Promise.race は最初に完了した Promise の結果を返します。Promise.allSettled は全 Promise の完了を待ち、成功/失敗の両方の結果を返します。Promise.any は最初に成功した結果を返します。",
        code: `const p1 = fetch("/api/users").then(r => r.json());
const p2 = fetch("/api/posts").then(r => r.json());
const p3 = fetch("/api/comments").then(r => r.json());

// Promise.all — 全て成功なら結果配列、1つでも失敗で reject
const [users, posts, comments] = await Promise.all([p1, p2, p3]);

// Promise.allSettled — 全て完了を待つ（失敗しても続行）
const results = await Promise.allSettled([p1, p2, p3]);
results.forEach(result => {
  if (result.status === "fulfilled") {
    console.log("成功:", result.value);
  } else {
    console.log("失敗:", result.reason);
  }
});

// Promise.race — 最初に完了した結果
const fastest = await Promise.race([p1, p2, p3]);

// タイムアウトの実装
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("タイムアウト")), ms)
  );
  return Promise.race([promise, timeout]);
}

// Promise.any — 最初に成功した結果（全失敗で AggregateError）
const first = await Promise.any([p1, p2, p3]);`,
      },
    ],
  },
  {
    id: "async-await",
    title: "async/await",
    category: "async",
    description:
      "async/await の基本、エラーハンドリング、並列実行、トップレベル await",
    sections: [
      {
        title: "async/await の基本",
        content:
          "async/await は Promise をより同期的なコードのように書ける構文です。async 関数は常に Promise を返します。await は Promise の解決を待って値を取得します。Promise チェーンよりも読みやすく、エラーハンドリングも try-catch で直感的に行えます。",
        code: `// async 関数の基本
async function fetchUser(id) {
  const response = await fetch(\`/api/users/\${id}\`);
  const user = await response.json();
  return user; // Promise.resolve(user) と同じ
}

// 呼び出し
const user = await fetchUser(1);
console.log(user.name);

// アロー関数版
const fetchPosts = async (userId) => {
  const response = await fetch(\`/api/posts?userId=\${userId}\`);
  return response.json();
};

// 逐次処理（直列）
async function getUserWithPosts(id) {
  const user = await fetchUser(id);         // 1つ目を待つ
  const posts = await fetchPosts(user.id);  // 2つ目を待つ
  return { ...user, posts };
}

// async 関数は常に Promise を返す
async function greet() {
  return "Hello"; // Promise.resolve("Hello")
}
greet().then(msg => console.log(msg)); // "Hello"`,
      },
      {
        title: "エラーハンドリング",
        content:
          "async/await では try-catch で同期コードと同じようにエラーを処理できます。await した Promise が reject されると例外がスローされます。複数の非同期処理を個別にエラーハンドリングしたり、共通のエラーハンドラにまとめたりできます。",
        code: `// try-catch でエラー処理
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}\`);
    }
    return await response.json();
  } catch (error) {
    console.error("データ取得失敗:", error.message);
    return null; // フォールバック値
  } finally {
    console.log("リクエスト完了");
  }
}

// 個別のエラーハンドリング
async function loadDashboard() {
  let user = null;
  let posts = [];

  try {
    user = await fetchUser(1);
  } catch (e) {
    console.error("ユーザー取得失敗");
  }

  try {
    posts = await fetchPosts(user?.id);
  } catch (e) {
    console.error("投稿取得失敗");
  }

  return { user, posts };
}

// .catch() を使う方法（try-catch を使わない）
const data = await fetchData("/api/data")
  .catch(err => {
    console.error(err);
    return defaultData;
  });`,
      },
      {
        title: "並列実行とパターン",
        content:
          "複数の独立した非同期処理は Promise.all と await を組み合わせて並列実行できます。逐次実行と並列実行の違いを理解し、適切に使い分けることが重要です。for-await-of で非同期イテレータを処理できます。トップレベル await は ES2022 のモジュールで使用可能です。",
        code: `// ❌ 逐次実行（遅い — 合計3秒）
const a = await fetchA(); // 1秒
const b = await fetchB(); // 1秒
const c = await fetchC(); // 1秒

// ✅ 並列実行（速い — 最大1秒）
const [a, b, c] = await Promise.all([
  fetchA(),
  fetchB(),
  fetchC(),
]);

// 並列実行 + 個別エラー処理
const results = await Promise.allSettled([
  fetchA(),
  fetchB(),
  fetchC(),
]);
const succeeded = results
  .filter(r => r.status === "fulfilled")
  .map(r => r.value);

// for-await-of（非同期イテレータ）
async function* generateIds() {
  let id = 1;
  while (id <= 3) {
    await new Promise(r => setTimeout(r, 100));
    yield id++;
  }
}

for await (const id of generateIds()) {
  console.log(id); // 1, 2, 3（100ms間隔）
}

// 配列の逐次処理（順序が重要な場合）
const urls = ["/api/1", "/api/2", "/api/3"];
for (const url of urls) {
  const data = await fetch(url).then(r => r.json());
  console.log(data);
}`,
      },
    ],
  },

  // ===== DOM・ブラウザAPI =====
  {
    id: "dom-manipulation",
    title: "DOM操作",
    category: "dom",
    description:
      "要素の取得・生成・変更・削除、テンプレートリテラルによるDOM構築",
    sections: [
      {
        title: "要素の取得",
        content:
          "DOM（Document Object Model）はHTML文書をツリー構造のオブジェクトとして表現したものです。querySelector はCSSセレクタで最初の一致要素を、querySelectorAll は全一致要素を返します。getElementById、getElementsByClassName なども使えますが、querySelector が最も柔軟です。",
        code: `// querySelector（最初の一致要素）
const header = document.querySelector("h1");
const btn = document.querySelector(".btn-primary");
const nav = document.querySelector("#nav");
const link = document.querySelector("nav a.active");

// querySelectorAll（全一致要素 — NodeList）
const items = document.querySelectorAll(".item");
items.forEach(item => console.log(item.textContent));

// NodeList を配列に変換
const itemsArray = [...document.querySelectorAll(".item")];
const filtered = itemsArray.filter(el =>
  el.classList.contains("active")
);

// その他の取得メソッド
document.getElementById("app");
document.getElementsByClassName("btn"); // HTMLCollection
document.getElementsByTagName("p");     // HTMLCollection

// 親子・兄弟要素の取得
const el = document.querySelector(".target");
el.parentElement;          // 親要素
el.children;               // 子要素（HTMLCollection）
el.firstElementChild;      // 最初の子要素
el.nextElementSibling;     // 次の兄弟要素
el.closest(".container");  // 最も近い祖先要素`,
      },
      {
        title: "要素の生成と変更",
        content:
          "createElement で新しいDOM要素を作成し、appendChild や insertBefore で配置します。textContent でテキストを設定、innerHTML でHTMLを直接挿入できます（XSS注意）。classList でCSSクラスを操作、style で直接スタイルを変更できます。",
        code: `// 要素の生成と追加
const div = document.createElement("div");
div.textContent = "Hello World";
div.classList.add("message", "active");
div.setAttribute("data-id", "123");
document.body.appendChild(div);

// insertAdjacentHTML（位置を指定してHTML挿入）
const container = document.querySelector(".container");
container.insertAdjacentHTML("beforeend",
  \`<div class="card">
    <h3>タイトル</h3>
    <p>内容</p>
  </div>\`
);

// テキストとHTMLの設定
const el = document.querySelector(".target");
el.textContent = "安全なテキスト";  // XSS安全
el.innerHTML = "<strong>太字</strong>"; // HTML解釈

// クラスの操作
el.classList.add("active");
el.classList.remove("hidden");
el.classList.toggle("expanded");
el.classList.contains("active"); // true

// スタイルの操作
el.style.color = "red";
el.style.fontSize = "16px";
el.style.display = "none";

// 属性の操作
el.setAttribute("aria-label", "閉じる");
el.getAttribute("data-id"); // "123"
el.removeAttribute("hidden");`,
      },
      {
        title: "要素の削除とテンプレート",
        content:
          "remove() で要素自身を削除、replaceWith() で要素を置換できます。DocumentFragment は複数の要素をまとめてDOMに追加する際のパフォーマンス最適化に使います。template タグはクライアントサイドでのDOM構築のテンプレートとして使えます。",
        code: `// 要素の削除
const el = document.querySelector(".target");
el.remove(); // 自身を削除

// 子要素の削除
const parent = document.querySelector(".list");
parent.removeChild(parent.firstElementChild);

// 全子要素の削除
parent.innerHTML = ""; // シンプルだが非推奨
// 推奨
while (parent.firstChild) {
  parent.removeChild(parent.firstChild);
}

// replaceWith（要素の置換）
const oldEl = document.querySelector(".old");
const newEl = document.createElement("div");
newEl.textContent = "新しい要素";
oldEl.replaceWith(newEl);

// DocumentFragment（バッチ追加でパフォーマンス向上）
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const li = document.createElement("li");
  li.textContent = \`アイテム \${i + 1}\`;
  fragment.appendChild(li); // まだDOMに反映されない
}
document.querySelector("ul").appendChild(fragment); // 一括追加

// <template> タグの活用
// HTML: <template id="card-template">...</template>
const template = document.querySelector("#card-template");
const clone = template.content.cloneNode(true);
clone.querySelector(".title").textContent = "新しいカード";
document.querySelector(".grid").appendChild(clone);`,
      },
    ],
  },
  {
    id: "events",
    title: "イベント処理",
    category: "dom",
    description:
      "イベントリスナー、バブリングとキャプチャ、イベントデリゲーション",
    sections: [
      {
        title: "イベントリスナーの基本",
        content:
          "addEventListener でイベントリスナーを登録し、ユーザー操作やブラウザイベントに応答できます。removeEventListener で解除できます。イベントオブジェクトにはイベントの詳細情報（ターゲット要素、座標、キーなど）が含まれます。",
        code: `// イベントリスナーの登録
const button = document.querySelector("#myBtn");

button.addEventListener("click", (event) => {
  console.log("クリックされた！");
  console.log("対象:", event.target);
  console.log("座標:", event.clientX, event.clientY);
});

// イベントリスナーの解除（名前付き関数が必要）
function handleClick(event) {
  console.log("クリック");
}
button.addEventListener("click", handleClick);
button.removeEventListener("click", handleClick);

// よく使うイベント
element.addEventListener("click", handler);      // クリック
element.addEventListener("dblclick", handler);    // ダブルクリック
element.addEventListener("input", handler);       // 入力変更
element.addEventListener("change", handler);      // 値確定
element.addEventListener("submit", handler);      // フォーム送信
element.addEventListener("keydown", handler);     // キー押下
element.addEventListener("keyup", handler);       // キー離す
element.addEventListener("mouseover", handler);   // マウスオーバー
element.addEventListener("scroll", handler);      // スクロール

// once オプション（1回だけ実行）
button.addEventListener("click", handler, { once: true });`,
      },
      {
        title: "バブリングとキャプチャ",
        content:
          "イベントは3つのフェーズで伝播します: キャプチャフェーズ（外→内）、ターゲットフェーズ、バブリングフェーズ（内→外）。デフォルトではバブリングフェーズでリスナーが呼ばれます。stopPropagation() で伝播を停止、preventDefault() でデフォルト動作を防止できます。",
        code: `// バブリング（内側 → 外側へ伝播）
// <div id="outer">
//   <div id="inner">
//     <button id="btn">Click</button>
//   </div>
// </div>

document.querySelector("#outer").addEventListener("click", () => {
  console.log("outer"); // 3番目に実行
});
document.querySelector("#inner").addEventListener("click", () => {
  console.log("inner"); // 2番目に実行
});
document.querySelector("#btn").addEventListener("click", () => {
  console.log("btn");   // 1番目に実行
});
// btn をクリック → "btn" → "inner" → "outer"

// stopPropagation() で伝播を停止
document.querySelector("#btn").addEventListener("click", (e) => {
  e.stopPropagation(); // これ以上バブリングしない
  console.log("btn のみ実行");
});

// preventDefault() でデフォルト動作を防止
document.querySelector("a").addEventListener("click", (e) => {
  e.preventDefault(); // リンク遷移を防止
  console.log("リンククリック（遷移しない）");
});

// フォーム送信の防止
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  // カスタムのバリデーションや送信処理
});`,
      },
      {
        title: "イベントデリゲーション",
        content:
          "イベントデリゲーションはバブリングを利用して、子要素のイベントを親要素で一括処理するパターンです。動的に追加される要素にも対応でき、大量のリスナー登録を避けられるためパフォーマンスが向上します。event.target で実際のクリック対象を特定します。",
        code: `// ❌ 各アイテムにリスナーを登録（非効率）
document.querySelectorAll(".item").forEach(item => {
  item.addEventListener("click", () => {
    console.log(item.textContent);
  });
});

// ✅ イベントデリゲーション（親に1つだけ）
document.querySelector(".list").addEventListener("click", (e) => {
  const item = e.target.closest(".item");
  if (!item) return; // .item 以外のクリックは無視
  console.log(item.textContent);
});

// 動的に追加された要素にも対応
const list = document.querySelector(".list");

// 後から追加してもイベントが動作する
const newItem = document.createElement("li");
newItem.className = "item";
newItem.textContent = "新しいアイテム";
list.appendChild(newItem);

// 実践: タブ切り替え
document.querySelector(".tabs").addEventListener("click", (e) => {
  const tab = e.target.closest("[data-tab]");
  if (!tab) return;

  // 全タブを非アクティブ化
  document.querySelectorAll("[data-tab]").forEach(t =>
    t.classList.remove("active")
  );
  // クリックされたタブをアクティブ化
  tab.classList.add("active");

  // 対応するパネルを表示
  const panelId = tab.dataset.tab;
  document.querySelectorAll(".panel").forEach(p =>
    p.classList.toggle("hidden", p.id !== panelId)
  );
});`,
      },
    ],
  },
  {
    id: "browser-apis",
    title: "ブラウザAPI",
    category: "dom",
    description:
      "Fetch API、LocalStorage/SessionStorage、IntersectionObserver を活用する",
    sections: [
      {
        title: "Fetch API",
        content:
          "Fetch API はネットワークリクエストを行うためのモダンな API です。Promise ベースで、XMLHttpRequest の代替として広く使われます。GET/POST/PUT/DELETE などの HTTP メソッドに対応し、ヘッダーやボディの設定も柔軟に行えます。",
        code: `// GET リクエスト
const response = await fetch("/api/users");
const users = await response.json();

// POST リクエスト
const newUser = await fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Alice",
    email: "alice@example.com",
  }),
});

// エラーハンドリング
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(\`HTTP Error: \${response.status}\`);
  }
  return response.json();
}

// リクエストのキャンセル（AbortController）
const controller = new AbortController();
setTimeout(() => controller.abort(), 5000); // 5秒でタイムアウト

try {
  const response = await fetch("/api/data", {
    signal: controller.signal,
  });
  const data = await response.json();
} catch (error) {
  if (error.name === "AbortError") {
    console.log("リクエストがキャンセルされました");
  }
}`,
      },
      {
        title: "Web Storage（LocalStorage / SessionStorage）",
        content:
          "LocalStorage はブラウザにデータを永続的に保存できる API です（ドメイン単位、約5MB）。SessionStorage はタブを閉じると消える一時的なストレージです。キーと値は文字列のみなので、オブジェクトは JSON.stringify/parse で変換する必要があります。",
        code: `// LocalStorage（永続的）
localStorage.setItem("theme", "dark");
const theme = localStorage.getItem("theme"); // "dark"
localStorage.removeItem("theme");
localStorage.clear(); // 全削除

// オブジェクトの保存
const user = { name: "Alice", age: 25 };
localStorage.setItem("user", JSON.stringify(user));
const saved = JSON.parse(localStorage.getItem("user"));

// SessionStorage（タブを閉じると消える）
sessionStorage.setItem("token", "abc123");
const token = sessionStorage.getItem("token");

// ユーティリティ関数
const storage = {
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key) {
    localStorage.removeItem(key);
  },
};

// 使用例
storage.set("settings", { theme: "dark", lang: "ja" });
const settings = storage.get("settings", {});`,
      },
      {
        title: "IntersectionObserver",
        content:
          "IntersectionObserver は要素がビューポートに入った/出たことを検出する API です。スクロールイベントを使うよりもパフォーマンスが良く、遅延読み込み（Lazy Loading）、無限スクロール、スクロールアニメーションなどに使われます。",
        code: `// IntersectionObserver の基本
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // 要素がビューポートに入った
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // 1回だけ
      }
    });
  },
  {
    threshold: 0.1, // 10% 見えたら発火
    rootMargin: "0px 0px -50px 0px", // 50px 手前で発火
  }
);

// 要素を監視
document.querySelectorAll(".animate-on-scroll").forEach(el => {
  observer.observe(el);
});

// 画像の遅延読み込み
const imgObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src; // data-src → src
      img.classList.remove("lazy");
      imgObserver.unobserve(img);
    }
  });
});

document.querySelectorAll("img.lazy").forEach(img => {
  imgObserver.observe(img);
});

// 無限スクロール
const sentinel = document.querySelector("#sentinel");
const scrollObserver = new IntersectionObserver(async (entries) => {
  if (entries[0].isIntersecting) {
    await loadMoreItems(); // 次のページを読み込む
  }
});
scrollObserver.observe(sentinel);`,
      },
    ],
  },

  // ===== モダンJavaScript =====
  {
    id: "es6-syntax",
    title: "ES6+の構文",
    category: "modern",
    description:
      "テンプレートリテラル、分割代入、スプレッド構文、Nullish coalescing などモダン構文",
    sections: [
      {
        title: "テンプレートリテラル",
        content:
          "テンプレートリテラル（バッククォート ``）は文字列内に式を埋め込み、複数行の文字列を自然に記述できます。タグ付きテンプレートリテラルを使えば、文字列の処理をカスタマイズできます。従来の文字列結合（+）よりも読みやすく安全です。",
        code: `// 基本的な式の埋め込み
const name = "Alice";
const age = 25;
const msg = \`\${name}さんは\${age}歳です\`;

// 式の評価
\`合計: \${1 + 2 + 3}\`  // "合計: 6"
\`状態: \${age >= 18 ? "成人" : "未成年"}\`

// 複数行の文字列
const html = \`
  <div class="card">
    <h2>\${name}</h2>
    <p>年齢: \${age}</p>
  </div>
\`;

// タグ付きテンプレートリテラル
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    const value = values[i] ? \`<mark>\${values[i]}</mark>\` : "";
    return result + str + value;
  }, "");
}

const result = highlight\`\${name}さんは\${age}歳です\`;
// "<mark>Alice</mark>さんは<mark>25</mark>歳です"

// String.raw（エスケープを無視）
String.raw\`改行は \\n です\`; // "改行は \\n です"`,
      },
      {
        title: "分割代入の応用",
        content:
          "分割代入はオブジェクトや配列から値を取り出して変数に代入する構文です。関数の戻り値、import文、React の useState など、モダン JavaScript のあらゆる場所で使われます。ネストした構造、デフォルト値、残余要素との組み合わせも可能です。",
        code: `// 配列の分割代入
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first=1, second=2, rest=[3,4,5]

// 要素のスキップ
const [, , third] = [1, 2, 3]; // third=3

// 変数の入れ替え
let a = 1, b = 2;
[a, b] = [b, a]; // a=2, b=1

// オブジェクトの分割代入（ネスト）
const {
  name,
  address: { city, zip = "000-0000" },
  hobbies: [firstHobby],
} = {
  name: "Alice",
  address: { city: "Tokyo" },
  hobbies: ["読書", "旅行"],
};

// 関数の引数での分割代入
function createUser({
  name,
  age = 0,
  role = "user",
} = {}) {
  return { name, age, role };
}
createUser({ name: "Alice", age: 25 });

// 複数の戻り値
function getMinMax(arr) {
  return [Math.min(...arr), Math.max(...arr)];
}
const [min, max] = getMinMax([3, 1, 4, 1, 5]);

// import での分割代入
// import { useState, useEffect } from "react";`,
      },
      {
        title: "モダン演算子と構文",
        content:
          "Nullish coalescing（??）は null/undefined のみをフォールバックし、OR（||）と異なり 0 や '' を有効値として扱います。Optional chaining（?.）、論理代入演算子（??=, ||=, &&=）、構造化クローン（structuredClone）など、ES2020 以降で追加された便利な構文を活用できます。",
        code: `// Nullish coalescing（??）vs OR（||）
0 ?? 42      // 0   ← null/undefined のみフォールバック
0 || 42      // 42  ← falsy 全てフォールバック
"" ?? "default"  // ""
"" || "default"  // "default"

// 論理代入演算子（ES2021）
let a = null;
a ??= 42;     // a = 42（null/undefined なら代入）

let b = 0;
b ||= 10;    // b = 10（falsy なら代入）

let c = true;
c &&= false; // c = false（truthy なら代入）

// structuredClone（ディープコピー、ES2022）
const obj = {
  name: "Alice",
  scores: [90, 85, 92],
  date: new Date(),
};
const deep = structuredClone(obj);
deep.scores.push(100);
console.log(obj.scores.length); // 3（元は変わらない）

// Object.hasOwn()（ES2022 — hasOwnProperty の代替）
const user = { name: "Alice" };
Object.hasOwn(user, "name");     // true
Object.hasOwn(user, "toString"); // false

// Array.at()（ES2022 — 負のインデックス対応）
const arr = [1, 2, 3, 4, 5];
arr.at(0);   // 1
arr.at(-1);  // 5（最後の要素）
arr.at(-2);  // 4`,
      },
    ],
  },
  {
    id: "modules",
    title: "モジュールシステム",
    category: "modern",
    description:
      "import/export、名前付きエクスポートとデフォルトエクスポート、動的インポート",
    sections: [
      {
        title: "import と export の基本",
        content:
          "ES Modules（ESM）は JavaScript の公式モジュールシステムです。export でモジュールから値を公開し、import で他のモジュールから値を取り込みます。名前付きエクスポートは複数の値を公開でき、デフォルトエクスポートはモジュールの主要な値を1つ公開します。",
        code: `// ===== math.js =====
// 名前付きエクスポート
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export function multiply(a, b) { return a * b; }

// ===== user.js =====
// デフォルトエクスポート（モジュールに1つだけ）
export default class User {
  constructor(name) { this.name = name; }
}
// 名前付きと併用可能
export const ROLES = ["admin", "user", "guest"];

// ===== app.js =====
// 名前付きインポート
import { add, multiply } from "./math.js";
add(1, 2); // 3

// デフォルトインポート（任意の名前で受け取る）
import User from "./user.js";
import User, { ROLES } from "./user.js"; // 併用

// 名前の変更（リネーム）
import { add as sum } from "./math.js";
sum(1, 2); // 3

// 全てをまとめてインポート
import * as MathUtils from "./math.js";
MathUtils.add(1, 2);
MathUtils.PI;`,
      },
      {
        title: "エクスポートパターン",
        content:
          "名前付きエクスポートは明示的で tree-shaking に優れ、デフォルトエクスポートはモジュールの主要な値を直感的に取り込めます。再エクスポート（バレルファイル）でモジュールの公開 API を整理できます。プロジェクトの規模や用途に応じて使い分けます。",
        code: `// 宣言時にエクスポート
export const name = "Alice";
export function greet() { return "Hello"; }
export class User {}

// まとめてエクスポート
const a = 1;
const b = 2;
function helper() {}
export { a, b, helper };

// リネームしてエクスポート
export { helper as utilHelper };

// 再エクスポート（バレルファイル / index.js）
// ===== components/index.js =====
export { Button } from "./Button.js";
export { Input } from "./Input.js";
export { Card } from "./Card.js";
// → import { Button, Input, Card } from "./components";

// 全てを再エクスポート
export * from "./math.js";

// デフォルトの再エクスポート
export { default as User } from "./User.js";

// 条件付きエクスポート（パターン）
// ===== api.js =====
const api = {
  getUsers: () => fetch("/api/users"),
  getUser: (id) => fetch(\`/api/users/\${id}\`),
};
export default api;`,
      },
      {
        title: "動的インポートとモジュールパターン",
        content:
          "動的インポート（import()）は実行時にモジュールを読み込む機能で、コード分割（Code Splitting）やルートベースの遅延読み込みに使われます。Promise を返すため async/await と組み合わせて使います。条件分岐でのインポートやオンデマンドのライブラリ読み込みに便利です。",
        code: `// 動的インポート（遅延読み込み）
const module = await import("./heavy-module.js");
module.doSomething();

// 条件付きインポート
if (needsChart) {
  const { Chart } = await import("./chart.js");
  new Chart(canvas);
}

// React での遅延読み込み
import { lazy, Suspense } from "react";
const Dashboard = lazy(() => import("./Dashboard"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </Suspense>
  );
}

// ルートベースの Code Splitting（React Router）
const routes = [
  {
    path: "/dashboard",
    component: lazy(() => import("./pages/Dashboard")),
  },
  {
    path: "/settings",
    component: lazy(() => import("./pages/Settings")),
  },
];

// 環境に応じたモジュール切り替え
const config = await import(
  process.env.NODE_ENV === "production"
    ? "./config.prod.js"
    : "./config.dev.js"
);`,
      },
    ],
  },

  // ===== 実践パターン =====
  {
    id: "error-handling",
    title: "エラーハンドリング",
    category: "practice",
    description:
      "try-catch-finally、カスタムエラー、グローバルハンドリングの実践パターン",
    sections: [
      {
        title: "try-catch-finally の実践",
        content:
          "JavaScript のエラーハンドリングは try-catch-finally で行います。catch でエラーオブジェクト（Error、TypeError、RangeError など）を受け取り、finally は成功・失敗に関わらず実行されます。async/await と組み合わせた非同期エラーハンドリングが重要です。",
        code: `// 基本的なエラーハンドリング
try {
  const data = JSON.parse(invalidJson);
} catch (error) {
  // error の種類で分岐
  if (error instanceof SyntaxError) {
    console.error("JSON パースエラー:", error.message);
  } else if (error instanceof TypeError) {
    console.error("型エラー:", error.message);
  } else {
    throw error; // 未知のエラーは再スロー
  }
} finally {
  console.log("クリーンアップ処理");
}

// エラーの種類
new Error("一般的なエラー");
new TypeError("型が不正");
new RangeError("範囲外の値");
new ReferenceError("未定義の変数");
new SyntaxError("構文エラー");

// 安全な JSON パース
function safeJsonParse(str, fallback = null) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

// Result パターン（エラーを戻り値で返す）
function safeDivide(a, b) {
  if (b === 0) {
    return { ok: false, error: "0で割ることはできません" };
  }
  return { ok: true, value: a / b };
}
const result = safeDivide(10, 0);
if (!result.ok) console.error(result.error);`,
      },
      {
        title: "カスタムエラー",
        content:
          "カスタムエラークラスを作成して、アプリケーション固有のエラーを表現できます。Error を継承し、名前やステータスコードなどの追加情報を持たせます。これにより catch ブロックでエラーの種類を判別し、適切な処理を行えます。",
        code: `// カスタムエラークラス
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
  }
}

class NotFoundError extends AppError {
  constructor(resource) {
    super(\`\${resource} が見つかりません\`, 404);
    this.name = "NotFoundError";
  }
}

class ValidationError extends AppError {
  constructor(field, message) {
    super(\`\${field}: \${message}\`, 400);
    this.name = "ValidationError";
    this.field = field;
  }
}

// 使用例
async function getUser(id) {
  const user = await db.findUser(id);
  if (!user) {
    throw new NotFoundError("ユーザー");
  }
  return user;
}

// エラーの種類で分岐
try {
  const user = await getUser(999);
} catch (error) {
  if (error instanceof NotFoundError) {
    console.log(error.statusCode); // 404
  } else if (error instanceof ValidationError) {
    console.log(error.field);
  } else {
    throw error; // 未知のエラーは再スロー
  }
}`,
      },
      {
        title: "グローバルエラーハンドリング",
        content:
          "window.onerror や window.addEventListener('unhandledrejection') でキャッチされなかったエラーをグローバルに処理できます。本番環境ではエラー監視サービス（Sentry など）にエラーを送信し、ユーザーにはフレンドリーなエラー画面を表示するのが一般的です。",
        code: `// グローバルエラーハンドラ（同期エラー）
window.addEventListener("error", (event) => {
  console.error("未キャッチエラー:", event.error);
  // エラー監視サービスに送信
  reportError({
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
    error: event.error,
  });
});

// 未処理の Promise rejection
window.addEventListener("unhandledrejection", (event) => {
  console.error("未処理の Promise rejection:", event.reason);
  event.preventDefault(); // デフォルトのコンソールエラーを抑制
  reportError({ reason: event.reason });
});

// エラーバウンダリ（React）
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    reportError({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return <h1>エラーが発生しました</h1>;
    }
    return this.props.children;
  }
}

// ユーティリティ: 安全な関数実行
function tryCatch(fn, fallback) {
  try {
    return fn();
  } catch {
    return fallback;
  }
}`,
      },
    ],
  },
  {
    id: "functional",
    title: "関数型プログラミング",
    category: "practice",
    description:
      "純粋関数、高階関数、カリー化、イミュータブル操作の実践パターン",
    sections: [
      {
        title: "純粋関数と副作用",
        content:
          "純粋関数は同じ入力に対して常に同じ出力を返し、副作用（外部状態の変更、I/O操作など）を持たない関数です。テストしやすく、予測可能で、並列実行にも安全です。実際のアプリケーションでは純粋関数と副作用のある処理を明確に分離することが重要です。",
        code: `// ✅ 純粋関数（副作用なし）
function add(a, b) {
  return a + b;
}

function formatUser(user) {
  return \`\${user.name} (\${user.age}歳)\`;
}

function sortByAge(users) {
  return [...users].sort((a, b) => a.age - b.age);
  // 元の配列は変更しない
}

// ❌ 非純粋関数（副作用あり）
let total = 0;
function addToTotal(n) {
  total += n; // 外部状態を変更（副作用）
  return total;
}

// ❌ 配列を直接変更（破壊的）
function addItem(arr, item) {
  arr.push(item); // 元の配列を変更
  return arr;
}

// ✅ 新しい配列を返す（非破壊的）
function addItem(arr, item) {
  return [...arr, item]; // 新しい配列を作成
}

// ✅ オブジェクトの非破壊的更新
function updateUser(user, updates) {
  return { ...user, ...updates };
}
const alice = { name: "Alice", age: 25 };
const updated = updateUser(alice, { age: 26 });
// alice は変更されない`,
      },
      {
        title: "高階関数",
        content:
          "高階関数は関数を引数として受け取る、または関数を戻り値として返す関数です。map、filter、reduce は代表的な高階関数です。関数を組み合わせることで、宣言的で再利用可能なコードを書けます。パイプラインパターンで複数の処理を連結できます。",
        code: `// 関数を返す高階関数
function greaterThan(n) {
  return (x) => x > n;
}
const gt10 = greaterThan(10);
[5, 10, 15, 20].filter(gt10); // [15, 20]

// 関数合成（compose）
function compose(...fns) {
  return (x) => fns.reduceRight((acc, fn) => fn(acc), x);
}

const double = x => x * 2;
const addOne = x => x + 1;
const square = x => x * x;

const transform = compose(square, addOne, double);
transform(3); // square(addOne(double(3))) = square(7) = 49

// パイプ（左から右へ）
function pipe(...fns) {
  return (x) => fns.reduce((acc, fn) => fn(acc), x);
}

const process = pipe(double, addOne, square);
process(3); // square(addOne(double(3))) = 49

// 実践: データ変換パイプライン
const users = [
  { name: "Alice", age: 25, active: true },
  { name: "Bob", age: 17, active: true },
  { name: "Charlie", age: 30, active: false },
];

const result = users
  .filter(u => u.active)
  .filter(u => u.age >= 18)
  .map(u => u.name)
  .sort();
// ["Alice"]`,
      },
      {
        title: "カリー化とイミュータブル操作",
        content:
          "カリー化は複数の引数を取る関数を、1つの引数を取る関数のチェーンに変換する技法です。部分適用と組み合わせて再利用可能な関数を作れます。イミュータブル操作は元のデータを変更せず新しいデータを返すパターンで、予測可能な状態管理に不可欠です。",
        code: `// カリー化
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return (...args2) => curried(...args, ...args2);
  };
}

const add = curry((a, b, c) => a + b + c);
add(1)(2)(3);    // 6
add(1, 2)(3);    // 6
add(1)(2, 3);    // 6

// 部分適用の実用例
const multiply = curry((a, b) => a * b);
const double = multiply(2);
const triple = multiply(3);
[1, 2, 3].map(double); // [2, 4, 6]
[1, 2, 3].map(triple); // [3, 6, 9]

// イミュータブルな配列操作
const arr = [1, 2, 3];
const added = [...arr, 4];           // 追加
const removed = arr.filter(x => x !== 2); // 削除
const updated = arr.map(x =>
  x === 2 ? 20 : x                  // 更新
);

// イミュータブルなオブジェクト操作
const state = { count: 0, name: "Alice" };
const newState = { ...state, count: state.count + 1 };

// ネストしたオブジェクトの更新
const user = {
  name: "Alice",
  address: { city: "Tokyo", zip: "100-0001" },
};
const moved = {
  ...user,
  address: { ...user.address, city: "Osaka" },
};`,
      },
    ],
  },
];
