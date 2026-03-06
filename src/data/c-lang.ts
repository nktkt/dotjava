export interface CLangSection {
  title: string;
  content: string;
  code?: string;
}

export interface CLangChapter {
  id: string;
  title: string;
  description: string;
  category: string;
  sections: CLangSection[];
}

export interface CLangCategory {
  id: string;
  name: string;
  color: string;
}

export const clangCategories: CLangCategory[] = [
  { id: "basics", name: "基礎文法", color: "var(--color-dads-cyan)" },
  { id: "intermediate", name: "中級", color: "var(--color-dads-blue)" },
  { id: "advanced", name: "上級", color: "var(--color-dads-purple)" },
  { id: "expert", name: "実践・応用", color: "var(--color-dads-success)" },
];

export const clangChapters: CLangChapter[] = [
  // ── 基礎文法 ──
  {
    id: "hello-world",
    title: "はじめてのC言語",
    description: "環境構築、コンパイル、main関数、printf、コメントの基礎",
    category: "basics",
    sections: [
      {
        title: "環境構築とコンパイル",
        content:
          "C言語のプログラムを実行するにはコンパイラが必要です。LinuxではGCC、macOSではClang、WindowsではMinGWやVisual Studioが一般的です。ソースファイル(.c)をコンパイラで機械語に変換し、実行可能ファイルを生成します。gcc hello.c -o helloのようにコンパイルし、./helloで実行します。",
        code: `/* hello.c — はじめてのCプログラム */
#include <stdio.h>

int main(void) {
    printf("Hello, World!\\n");
    return 0;
}

/* コンパイルと実行:
   $ gcc hello.c -o hello
   $ ./hello
   Hello, World!
*/`,
      },
      {
        title: "main関数とプログラム構造",
        content:
          "すべてのCプログラムはmain関数から実行が開始されます。main関数の戻り値はint型で、正常終了時は0を返します。#includeディレクティブでヘッダファイルを読み込み、標準ライブラリの関数を使用可能にします。stdio.hはprintf等の入出力関数を提供します。",
        code: `#include <stdio.h>  /* 標準入出力ヘッダ */
#include <stdlib.h> /* EXIT_SUCCESS等の定数 */

/* main関数 — プログラムのエントリポイント */
int main(int argc, char *argv[]) {
    /* argcはコマンドライン引数の数 */
    printf("引数の数: %d\\n", argc);

    /* argv[0]はプログラム名 */
    printf("プログラム名: %s\\n", argv[0]);

    return EXIT_SUCCESS; /* 0と同じ */
}`,
      },
      {
        title: "printf関数とコメント",
        content:
          "printf関数は書式指定子を使って様々なデータを出力します。%dは整数、%fは浮動小数点、%sは文字列、%cは文字を表示します。コメントは/* */で複数行、//で単一行のコメントを記述できます。コメントはコンパイル時に無視され、コードの説明に使用します。",
        code: `#include <stdio.h>

int main(void) {
    int age = 25;
    double height = 175.5;
    char grade = 'A';
    char name[] = "太郎";

    // 書式指定子を使った出力
    printf("名前: %s\\n", name);
    printf("年齢: %d歳\\n", age);
    printf("身長: %.1fcm\\n", height);
    printf("評価: %c\\n", grade);

    /* 複数行コメント:
       エスケープシーケンス
       \\n=改行, \\t=タブ, \\\\=バックスラッシュ */
    printf("タブ区切り:\\t値1\\t値2\\n");

    return 0;
}`,
      },
    ],
  },
  {
    id: "variables-types",
    title: "変数とデータ型",
    description: "int, char, float, double, 型変換、sizeof、定数の基礎",
    category: "basics",
    sections: [
      {
        title: "基本データ型",
        content:
          "C言語の基本データ型にはint（整数）、char（文字）、float（単精度浮動小数点）、double（倍精度浮動小数点）があります。各型にはshort、long、unsignedなどの修飾子を付けてサイズや範囲を変更できます。変数は使用前に宣言が必要で、型名 変数名;の形式で宣言します。",
        code: `#include <stdio.h>

int main(void) {
    /* 基本データ型 */
    int count = 100;           /* 整数型（通常4バイト） */
    char letter = 'A';         /* 文字型（1バイト） */
    float pi_f = 3.14f;        /* 単精度浮動小数点（4バイト） */
    double pi_d = 3.14159265;  /* 倍精度浮動小数点（8バイト） */

    /* 修飾子付きの型 */
    short int small = 32767;         /* 短い整数 */
    long int big = 2147483647L;      /* 長い整数 */
    unsigned int positive = 4000000; /* 符号なし整数 */
    long long huge = 9223372036854775807LL;

    printf("int: %d\\n", count);
    printf("char: %c (ASCII: %d)\\n", letter, letter);
    printf("float: %f\\n", pi_f);
    printf("double: %.8f\\n", pi_d);
    return 0;
}`,
      },
      {
        title: "型変換とsizeof",
        content:
          "C言語では暗黙的型変換と明示的型変換（キャスト）があります。演算時に異なる型が混在すると、小さい型が大きい型に自動変換されます（int→double等）。sizeof演算子は型や変数のバイト数を返します。型のサイズは環境依存であるため、移植性を考慮する場合はsizeofで確認が重要です。",
        code: `#include <stdio.h>

int main(void) {
    /* 暗黙的型変換 */
    int a = 5;
    double b = 2.0;
    double result = a / b;  /* aがdoubleに変換される */
    printf("5 / 2.0 = %f\\n", result);  /* 2.500000 */

    /* 明示的キャスト */
    int x = 7, y = 2;
    printf("7 / 2 = %d\\n", x / y);              /* 3（整数除算） */
    printf("7 / 2 = %f\\n", (double)x / y);       /* 3.500000 */

    /* sizeof演算子 */
    printf("char:   %zu バイト\\n", sizeof(char));
    printf("int:    %zu バイト\\n", sizeof(int));
    printf("float:  %zu バイト\\n", sizeof(float));
    printf("double: %zu バイト\\n", sizeof(double));
    printf("long:   %zu バイト\\n", sizeof(long));
    return 0;
}`,
      },
      {
        title: "定数とリテラル",
        content:
          "定数はプログラム中で変更できない値です。constキーワードで変数を定数化するか、#defineプリプロセッサで定数マクロを定義します。リテラルには整数リテラル（10, 0xFF, 077）、浮動小数点リテラル（3.14, 1.0e-3）、文字リテラル（'A'）、文字列リテラル（\"hello\"）があります。",
        code: `#include <stdio.h>

#define PI 3.14159265     /* マクロ定数 */
#define MAX_SIZE 100      /* 配列サイズ等に使用 */

int main(void) {
    const int DAYS_IN_WEEK = 7;  /* const定数 */
    const double TAX_RATE = 0.10;

    /* 各種リテラル */
    int dec = 255;        /* 10進数 */
    int hex = 0xFF;       /* 16進数 */
    int oct = 0377;       /* 8進数 */
    int bin = 0b11111111; /* 2進数（C23/GCC拡張） */

    printf("PI = %f\\n", PI);
    printf("1週間 = %d日\\n", DAYS_IN_WEEK);
    printf("10進: %d, 16進: %X, 8進: %o\\n", dec, hex, oct);
    printf("税込: %.0f円\\n", 1000 * (1 + TAX_RATE));
    return 0;
}`,
      },
    ],
  },
  {
    id: "operators-io",
    title: "演算子と入出力",
    description: "算術・比較・論理・ビット演算子、scanf/printfの書式指定子",
    category: "basics",
    sections: [
      {
        title: "算術・比較・論理演算子",
        content:
          "算術演算子には+, -, *, /, %（剰余）があります。比較演算子（==, !=, <, >, <=, >=）は条件の真偽を判定し、真なら1、偽なら0を返します。論理演算子は&&（AND）、||（OR）、!（NOT）で、短絡評価が行われます。代入演算子には+=, -=, *=, /=, %=があります。",
        code: `#include <stdio.h>

int main(void) {
    int a = 17, b = 5;

    /* 算術演算子 */
    printf("%d + %d = %d\\n", a, b, a + b);   /* 22 */
    printf("%d %% %d = %d\\n", a, b, a % b);  /* 2（剰余） */

    /* 比較演算子 */
    printf("%d == %d → %d\\n", a, b, a == b); /* 0（偽） */
    printf("%d > %d  → %d\\n", a, b, a > b);  /* 1（真） */

    /* 論理演算子と短絡評価 */
    int x = 0;
    if (x != 0 && 10 / x > 1) {
        /* xが0なので右辺は評価されない（短絡評価） */
        printf("到達しない\\n");
    }

    /* インクリメント・デクリメント */
    int c = 5;
    printf("後置: %d\\n", c++); /* 5を表示してから6に */
    printf("前置: %d\\n", ++c); /* 7に増やしてから表示 */
    return 0;
}`,
      },
      {
        title: "ビット演算子",
        content:
          "ビット演算子はデータをビット単位で操作します。&（AND）、|（OR）、^（XOR）、~（NOT）、<<（左シフト）、>>（右シフト）があります。フラグ管理、マスク処理、高速な2のべき乗演算などに使われます。ビット演算は整数型にのみ適用可能です。",
        code: `#include <stdio.h>

int main(void) {
    unsigned char a = 0b11001010;  /* 202 */
    unsigned char b = 0b10110101;  /* 181 */

    printf("a & b  = %d\\n", a & b);   /* AND: 10000000 = 128 */
    printf("a | b  = %d\\n", a | b);   /* OR:  11111111 = 255 */
    printf("a ^ b  = %d\\n", a ^ b);   /* XOR: 01111111 = 127 */
    printf("~a     = %d\\n", (unsigned char)~a); /* NOT: 00110101 = 53 */

    /* シフト演算 */
    int val = 1;
    printf("1 << 3 = %d\\n", val << 3);  /* 8 （2の3乗） */
    printf("16 >> 2 = %d\\n", 16 >> 2);  /* 4 （16÷4） */

    /* フラグ操作 */
    int flags = 0;
    flags |= (1 << 2);   /* ビット2をセット */
    flags |= (1 << 5);   /* ビット5をセット */
    printf("flags = %d\\n", flags); /* 36 (00100100) */
    return 0;
}`,
      },
      {
        title: "scanf/printfの書式指定子",
        content:
          "printfの書式指定子は%[フラグ][幅][.精度]変換文字の形式です。%dはint、%lfはdouble(scanf)/%f(printf)、%sは文字列、%xは16進数です。scanfは標準入力からデータを読み取り、変数のアドレス（&演算子）を渡します。バッファオーバーフローを防ぐためfgets等の使用が推奨されます。",
        code: `#include <stdio.h>

int main(void) {
    /* printf書式指定子 */
    printf("[%10d]\\n", 42);       /* 右寄せ10桁 */
    printf("[%-10d]\\n", 42);      /* 左寄せ10桁 */
    printf("[%010d]\\n", 42);      /* ゼロ埋め10桁 */
    printf("[%.3f]\\n", 3.14159);  /* 小数点以下3桁 */
    printf("[%8.2f]\\n", 3.14159); /* 全体8桁、小数2桁 */
    printf("[%x]\\n", 255);        /* 16進数: ff */
    printf("[%o]\\n", 255);        /* 8進数: 377 */

    /* scanf入力 */
    int age;
    char name[50];
    printf("名前を入力: ");
    fgets(name, sizeof(name), stdin); /* 安全な文字列入力 */

    printf("年齢を入力: ");
    scanf("%d", &age);  /* &でアドレスを渡す */

    printf("入力: %s, %d歳\\n", name, age);
    return 0;
}`,
      },
    ],
  },
  {
    id: "control-flow",
    title: "制御構文",
    description: "if-else, switch, for, while, do-while, break/continue, goto",
    category: "basics",
    sections: [
      {
        title: "条件分岐（if-else, switch）",
        content:
          "if文は条件式が真（0以外）のときブロックを実行します。else if/elseで複数条件を分岐できます。switch文は整数値や文字の多分岐に適しており、各caseにbreakが必要です。breakがないとフォールスルー（次のcaseも実行）が発生します。default節は一致するcaseがないときに実行されます。",
        code: `#include <stdio.h>

int main(void) {
    int score = 85;

    /* if-else文 */
    if (score >= 90) {
        printf("評価: A\\n");
    } else if (score >= 80) {
        printf("評価: B\\n");
    } else if (score >= 70) {
        printf("評価: C\\n");
    } else {
        printf("評価: D\\n");
    }

    /* switch文 */
    char grade = 'B';
    switch (grade) {
        case 'A': printf("優秀\\n"); break;
        case 'B': printf("良好\\n"); break;
        case 'C': printf("普通\\n"); break;
        default:  printf("要努力\\n"); break;
    }

    /* 三項演算子 */
    int abs_val = (score >= 0) ? score : -score;
    printf("絶対値: %d\\n", abs_val);
    return 0;
}`,
      },
      {
        title: "ループ（for, while, do-while）",
        content:
          "for文は初期化・条件・更新を1行で記述でき、回数が決まったループに適しています。while文は条件が真の間繰り返し、回数不定のループに使います。do-while文は最低1回実行が保証されます。無限ループはfor(;;)やwhile(1)で作成し、breakで脱出します。",
        code: `#include <stdio.h>

int main(void) {
    /* for文: 1〜10の合計 */
    int sum = 0;
    for (int i = 1; i <= 10; i++) {
        sum += i;
    }
    printf("1〜10の合計: %d\\n", sum); /* 55 */

    /* while文: 桁数カウント */
    int num = 12345, digits = 0;
    int temp = num;
    while (temp > 0) {
        digits++;
        temp /= 10;
    }
    printf("%dは%d桁\\n", num, digits);

    /* do-while文: 入力検証 */
    int input;
    do {
        printf("1〜10の数を入力: ");
        scanf("%d", &input);
    } while (input < 1 || input > 10);

    printf("入力値: %d\\n", input);
    return 0;
}`,
      },
      {
        title: "break, continue, goto",
        content:
          "breakはループやswitch文を即座に抜けます。continueはループの残りの処理をスキップして次のイテレーションに進みます。gotoは指定したラベルにジャンプしますが、コードの可読性を下げるため通常は使用を避けます。多重ループの脱出やエラー処理のクリーンアップではgotoが有用な場合もあります。",
        code: `#include <stdio.h>

int main(void) {
    /* break: 最初の偶数で停止 */
    int arr[] = {1, 3, 7, 4, 9, 2};
    for (int i = 0; i < 6; i++) {
        if (arr[i] % 2 == 0) {
            printf("最初の偶数: %d\\n", arr[i]); /* 4 */
            break;
        }
    }

    /* continue: 奇数のみ出力 */
    printf("奇数: ");
    for (int i = 0; i < 6; i++) {
        if (arr[i] % 2 == 0) continue;
        printf("%d ", arr[i]);
    }
    printf("\\n");

    /* goto: エラー処理パターン */
    FILE *fp = fopen("test.txt", "r");
    if (!fp) goto cleanup;
    /* ファイル処理... */
    fclose(fp);
cleanup:
    printf("処理完了\\n");
    return 0;
}`,
      },
    ],
  },
  {
    id: "arrays-strings",
    title: "配列と文字列",
    description: "一次元・多次元配列、文字列操作、string.h関数群",
    category: "basics",
    sections: [
      {
        title: "一次元・多次元配列",
        content:
          "配列は同じ型のデータを連続したメモリに格納するデータ構造です。int arr[5]で5要素のint配列を宣言し、インデックスは0から始まります。多次元配列はint matrix[3][4]のように宣言し、行×列の二次元テーブルを表現できます。配列のサイズは宣言時に決定され、実行時には変更できません。",
        code: `#include <stdio.h>

int main(void) {
    /* 一次元配列 */
    int scores[5] = {90, 85, 78, 92, 88};
    int n = sizeof(scores) / sizeof(scores[0]); /* 要素数の算出 */

    int total = 0;
    for (int i = 0; i < n; i++) {
        total += scores[i];
    }
    printf("平均点: %.1f\\n", (double)total / n);

    /* 二次元配列 */
    int matrix[2][3] = {
        {1, 2, 3},
        {4, 5, 6}
    };
    for (int i = 0; i < 2; i++) {
        for (int j = 0; j < 3; j++) {
            printf("%d ", matrix[i][j]);
        }
        printf("\\n");
    }
    return 0;
}`,
      },
      {
        title: "文字列の基礎",
        content:
          "C言語の文字列はchar型の配列で、末尾にヌル文字('\\0')を持ちます。文字列リテラル\"hello\"は自動的にヌル文字が付加されるため、6バイト必要です。文字列の長さはstrlen関数で取得でき、ヌル文字は含まれません。配列サイズは文字数+1以上を確保する必要があります。",
        code: `#include <stdio.h>
#include <string.h>

int main(void) {
    /* 文字列の宣言方法 */
    char s1[] = "Hello";           /* サイズ自動計算: 6 */
    char s2[20] = "World";         /* サイズ指定 */
    char s3[] = {'C', '言', '語', '\\0'}; /* 文字配列 */

    printf("s1 = %s (長さ: %zu)\\n", s1, strlen(s1));
    printf("s2 = %s (サイズ: %zu)\\n", s2, sizeof(s2));

    /* 文字列は配列なので直接代入不可 */
    /* s1 = "Hi"; はエラー */
    strcpy(s2, "C Language"); /* strcpyでコピー */
    printf("s2 = %s\\n", s2);

    /* 1文字ずつアクセス */
    for (int i = 0; s1[i] != '\\0'; i++) {
        printf("s1[%d] = '%c'\\n", i, s1[i]);
    }
    return 0;
}`,
      },
      {
        title: "string.h関数群",
        content:
          "string.hは文字列操作のための標準ライブラリ関数を提供します。strcpyはコピー、strcatは連結、strcmpは比較（0で一致）、strlenは長さ取得、strchrは文字検索、strstrは部分文字列検索を行います。バッファオーバーフロー防止のため、strncpy, strncat等の安全な関数を使うことが推奨されます。",
        code: `#include <stdio.h>
#include <string.h>

int main(void) {
    char dest[50];
    char src[] = "Hello";

    /* コピーと連結 */
    strcpy(dest, src);
    strcat(dest, ", World!");
    printf("連結: %s\\n", dest); /* Hello, World! */

    /* 比較 */
    printf("比較: %d\\n", strcmp("abc", "abc")); /* 0: 一致 */
    printf("比較: %d\\n", strcmp("abc", "abd")); /* 負: abc < abd */

    /* 検索 */
    char *p = strchr(dest, 'W');
    if (p) printf("'W'の位置: %s\\n", p); /* World! */

    char *sub = strstr(dest, "World");
    if (sub) printf("部分文字列: %s\\n", sub);

    /* 安全な関数 */
    char buf[10];
    strncpy(buf, "LongString", sizeof(buf) - 1);
    buf[sizeof(buf) - 1] = '\\0'; /* ヌル終端を保証 */
    printf("安全コピー: %s\\n", buf);
    return 0;
}`,
      },
    ],
  },
  // ── 中級 ──
  {
    id: "functions",
    title: "関数",
    description: "関数定義・プロトタイプ、引数、戻り値、再帰、可変長引数",
    category: "intermediate",
    sections: [
      {
        title: "関数定義とプロトタイプ",
        content:
          "関数は特定の処理をまとめた再利用可能なコードブロックです。戻り値の型・関数名・引数リストで定義します。関数プロトタイプは関数の宣言を先に行い、定義を後に記述できるようにします。プロトタイプがないと暗黙の宣言となり、警告やバグの原因になります。ヘッダファイルにプロトタイプを記述するのが一般的です。",
        code: `#include <stdio.h>

/* 関数プロトタイプ（宣言） */
int add(int a, int b);
void greet(const char *name);
double average(const int arr[], int size);

int main(void) {
    printf("3 + 5 = %d\\n", add(3, 5));
    greet("太郎");

    int nums[] = {10, 20, 30, 40, 50};
    printf("平均: %.1f\\n", average(nums, 5));
    return 0;
}

/* 関数定義 */
int add(int a, int b) { return a + b; }

void greet(const char *name) {
    printf("こんにちは、%sさん！\\n", name);
}

double average(const int arr[], int size) {
    int sum = 0;
    for (int i = 0; i < size; i++) sum += arr[i];
    return (double)sum / size;
}`,
      },
      {
        title: "再帰関数",
        content:
          "再帰関数は自分自身を呼び出す関数です。基底条件（終了条件）と再帰ステップで構成されます。階乗、フィボナッチ数列、ツリー走査など自然な再帰的構造の問題に適しています。ただし深い再帰はスタックオーバーフローの原因となるため、反復に書き換えるか末尾再帰の最適化を意識します。",
        code: `#include <stdio.h>

/* 階乗: n! = n * (n-1)! */
long factorial(int n) {
    if (n <= 1) return 1;       /* 基底条件 */
    return n * factorial(n - 1); /* 再帰ステップ */
}

/* フィボナッチ数列 */
int fib(int n) {
    if (n <= 0) return 0;
    if (n == 1) return 1;
    return fib(n - 1) + fib(n - 2);
}

/* 二分探索（再帰版） */
int binary_search(int arr[], int low, int high, int target) {
    if (low > high) return -1;
    int mid = low + (high - low) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] > target) return binary_search(arr, low, mid - 1, target);
    return binary_search(arr, mid + 1, high, target);
}

int main(void) {
    printf("5! = %ld\\n", factorial(5));  /* 120 */
    printf("fib(10) = %d\\n", fib(10));  /* 55 */
    return 0;
}`,
      },
      {
        title: "可変長引数",
        content:
          "stdarg.hを使うと、引数の数が不定の関数を作成できます。va_listで引数リストを管理し、va_start, va_arg, va_endマクロで順にアクセスします。printfも可変長引数関数です。最低1つの固定引数が必要で、引数の数や型を知る手段（個数引数や番兵値）が必要です。",
        code: `#include <stdio.h>
#include <stdarg.h>

/* 可変長引数: 合計を計算 */
int sum(int count, ...) {
    va_list args;
    va_start(args, count); /* 最後の固定引数を指定 */

    int total = 0;
    for (int i = 0; i < count; i++) {
        total += va_arg(args, int); /* 次の引数を取得 */
    }

    va_end(args); /* クリーンアップ */
    return total;
}

/* 簡易printf風関数 */
void my_printf(const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    while (*fmt) {
        if (*fmt == '%' && *(fmt + 1) == 'd') {
            printf("%d", va_arg(args, int));
            fmt += 2;
        } else {
            putchar(*fmt++);
        }
    }
    va_end(args);
}

int main(void) {
    printf("合計: %d\\n", sum(4, 10, 20, 30, 40)); /* 100 */
    my_printf("x=%d, y=%d\\n", 3, 7);
    return 0;
}`,
      },
    ],
  },
  {
    id: "pointers",
    title: "ポインタ",
    description: "アドレス・間接参照、ポインタ演算、配列とポインタ、NULLポインタ",
    category: "intermediate",
    sections: [
      {
        title: "アドレスと間接参照",
        content:
          "ポインタはメモリ上のアドレスを格納する変数です。&演算子で変数のアドレスを取得し、*演算子（間接参照）でポインタが指す値にアクセスします。int *pはint型のポインタ宣言で、p = &xでxのアドレスを格納し、*pでxの値を読み書きできます。ポインタにより関数から複数の値を返す等が可能になります。",
        code: `#include <stdio.h>

/* ポインタを使って値を交換 */
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main(void) {
    int x = 10, y = 20;
    int *p = &x; /* ポインタの宣言と初期化 */

    printf("xの値: %d\\n", x);
    printf("xのアドレス: %p\\n", (void *)&x);
    printf("pの値(アドレス): %p\\n", (void *)p);
    printf("*p(間接参照): %d\\n", *p);

    /* ポインタ経由で値を変更 */
    *p = 100;
    printf("x = %d\\n", x); /* 100 */

    /* swap関数でポインタ渡し */
    swap(&x, &y);
    printf("x=%d, y=%d\\n", x, y); /* 20, 100 */
    return 0;
}`,
      },
      {
        title: "ポインタ演算と配列",
        content:
          "ポインタに整数を加減算すると、型のサイズ分だけアドレスが移動します。int *pに1を加えるとsizeof(int)バイト分進みます。配列名は先頭要素へのポインタとして扱われ、arr[i]は*(arr+i)と等価です。この関係により、配列をポインタで効率的に操作できます。",
        code: `#include <stdio.h>

int main(void) {
    int arr[] = {10, 20, 30, 40, 50};
    int *p = arr; /* 配列名は先頭要素のポインタ */

    /* ポインタ演算でアクセス */
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d (*(p+%d) = %d)\\n",
               i, arr[i], i, *(p + i));
    }

    /* ポインタのインクリメント */
    printf("\\nポインタ走査:\\n");
    int *end = arr + 5;
    for (int *q = arr; q < end; q++) {
        printf("%d ", *q);
    }
    printf("\\n");

    /* ポインタ間の距離 */
    int *first = &arr[0];
    int *last = &arr[4];
    printf("要素間距離: %td\\n", last - first); /* 4 */
    return 0;
}`,
      },
      {
        title: "NULLポインタと安全な使用",
        content:
          "NULLポインタはどこも指さないポインタで、初期化やエラー表示に使われます。NULLポインタの間接参照は未定義動作（セグメンテーションフォルト等）を引き起こします。ポインタ使用前にNULLチェックを行うことが重要です。malloc等の動的メモリ確保関数は失敗時にNULLを返します。",
        code: `#include <stdio.h>
#include <stdlib.h>

/* NULLチェック付きの安全な関数 */
int safe_deref(const int *p) {
    if (p == NULL) {
        fprintf(stderr, "エラー: NULLポインタ\\n");
        return -1;
    }
    return *p;
}

int main(void) {
    int *p = NULL; /* 初期化 */

    /* NULLチェック */
    if (p == NULL) {
        printf("pはNULL\\n");
    }

    /* malloc失敗時のNULLチェック */
    int *arr = (int *)malloc(sizeof(int) * 100);
    if (arr == NULL) {
        fprintf(stderr, "メモリ確保失敗\\n");
        return 1;
    }

    arr[0] = 42;
    printf("値: %d\\n", safe_deref(arr));
    printf("NULL: %d\\n", safe_deref(NULL));

    free(arr);
    arr = NULL; /* 解放後はNULLに設定（ダングリング防止） */
    return 0;
}`,
      },
    ],
  },
  {
    id: "memory",
    title: "メモリ管理",
    description: "malloc/calloc/realloc/free、メモリリーク、スタック/ヒープ",
    category: "intermediate",
    sections: [
      {
        title: "動的メモリ確保",
        content:
          "malloc, calloc, reallocは動的メモリ確保関数です。mallocは指定バイト数を確保（初期化なし）、callocは要素数×サイズを確保し0で初期化、reallocは既存メモリのサイズを変更します。すべてvoid*を返し、使用後はfreeで解放が必須です。確保失敗時はNULLを返します。",
        code: `#include <stdio.h>
#include <stdlib.h>

int main(void) {
    /* malloc: 初期化なし */
    int *arr1 = (int *)malloc(sizeof(int) * 5);
    if (!arr1) { perror("malloc"); return 1; }

    /* calloc: 0初期化 */
    int *arr2 = (int *)calloc(5, sizeof(int));
    if (!arr2) { free(arr1); perror("calloc"); return 1; }

    for (int i = 0; i < 5; i++) {
        arr1[i] = i * 10;
        printf("arr1[%d]=%d, arr2[%d]=%d\\n", i, arr1[i], i, arr2[i]);
    }

    /* realloc: サイズ変更 */
    int *arr3 = (int *)realloc(arr1, sizeof(int) * 10);
    if (!arr3) { free(arr1); free(arr2); return 1; }
    arr1 = arr3; /* 成功時はarr1を更新 */

    for (int i = 5; i < 10; i++) arr1[i] = i * 10;

    free(arr1);
    free(arr2);
    return 0;
}`,
      },
      {
        title: "スタックとヒープ",
        content:
          "プログラムのメモリはテキスト領域、データ領域、スタック、ヒープに分かれます。スタックはローカル変数や関数呼び出し情報を自動管理し、高速ですがサイズに制限があります。ヒープはmalloc等で動的に確保し、プログラマが明示的に管理します。ヒープは大きなデータや可変サイズのデータに適しています。",
        code: `#include <stdio.h>
#include <stdlib.h>

int global_var = 100; /* データ領域（初期化済み） */
static int static_var; /* BSS領域（未初期化→0） */

void stack_demo(int depth) {
    int local = depth; /* スタック上に確保 */
    printf("スタック depth=%d: &local=%p\\n", depth, (void *)&local);
    if (depth < 3) stack_demo(depth + 1);
}

int main(void) {
    int stack_var = 10;  /* スタック */
    int *heap_var = (int *)malloc(sizeof(int)); /* ヒープ */

    printf("グローバル: %p\\n", (void *)&global_var);
    printf("スタック:   %p\\n", (void *)&stack_var);
    printf("ヒープ:     %p\\n", (void *)heap_var);

    stack_demo(0);

    free(heap_var);
    return 0;
}`,
      },
      {
        title: "メモリリークと安全な管理",
        content:
          "メモリリークはmallocで確保したメモリをfreeしないまま参照を失うことで発生します。長時間動作するプログラムではメモリ枯渇の原因になります。二重freeや解放済みメモリへのアクセスは未定義動作です。Valgrind等のツールでリークを検出できます。free後はポインタをNULLに設定する習慣が安全です。",
        code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* 安全なメモリ管理パターン */
char *create_string(const char *src) {
    if (!src) return NULL;
    char *s = (char *)malloc(strlen(src) + 1);
    if (!s) return NULL;
    strcpy(s, src);
    return s;
}

void safe_free(void **ptr) {
    if (ptr && *ptr) {
        free(*ptr);
        *ptr = NULL; /* ダングリングポインタ防止 */
    }
}

int main(void) {
    char *s = create_string("Hello, C!");
    if (s) {
        printf("%s\\n", s);
        safe_free((void **)&s);
        printf("解放後: s=%p\\n", (void *)s); /* NULL */
    }

    /* メモリリークの例（悪い例） */
    /* int *leak = malloc(100); */
    /* leak = malloc(200); ← 最初の100バイトがリーク */

    return 0;
}`,
      },
    ],
  },
  {
    id: "structs-unions",
    title: "構造体と共用体",
    description: "struct, union, enum, typedef, ビットフィールド",
    category: "intermediate",
    sections: [
      {
        title: "構造体（struct）",
        content:
          "構造体は異なる型のデータをひとまとめにするユーザ定義型です。struct キーワードで定義し、ドット演算子(.)でメンバにアクセスします。ポインタ経由ではアロー演算子(->)を使います。構造体はメンバのアラインメントによりパディングが挿入される場合があり、sizeofの値がメンバの合計より大きくなることがあります。",
        code: `#include <stdio.h>
#include <string.h>

struct Student {
    char name[50];
    int age;
    double gpa;
};

/* 構造体を引数に取る関数 */
void print_student(const struct Student *s) {
    printf("名前: %s, 年齢: %d, GPA: %.2f\\n",
           s->name, s->age, s->gpa);
}

int main(void) {
    /* 初期化 */
    struct Student s1 = {"田中太郎", 20, 3.5};
    struct Student s2;

    /* メンバへのアクセス */
    strcpy(s2.name, "佐藤花子");
    s2.age = 22;
    s2.gpa = 3.8;

    print_student(&s1);
    print_student(&s2);

    /* 構造体のサイズ（パディングに注意） */
    printf("sizeof(Student) = %zu\\n", sizeof(struct Student));
    return 0;
}`,
      },
      {
        title: "共用体・列挙型・typedef",
        content:
          "共用体(union)は全メンバが同じメモリ領域を共有し、サイズは最大メンバと同じです。同時に1つのメンバのみ有効です。列挙型(enum)は名前付き整数定数の集合です。typedefは型に別名を付け、コードの可読性を向上させます。typedef struct {...} TypeName;のパターンが頻繁に使われます。",
        code: `#include <stdio.h>

/* typedef + struct */
typedef struct {
    double x, y;
} Point;

/* 共用体: 異なる型を同じメモリに */
typedef union {
    int i;
    float f;
    char c;
} Value;

/* 列挙型 */
typedef enum {
    COLOR_RED,    /* 0 */
    COLOR_GREEN,  /* 1 */
    COLOR_BLUE    /* 2 */
} Color;

int main(void) {
    Point p = {3.0, 4.0};
    printf("Point: (%.1f, %.1f)\\n", p.x, p.y);

    Value v;
    v.i = 42;
    printf("int: %d\\n", v.i);
    v.f = 3.14f; /* iの値は上書きされる */
    printf("float: %f\\n", v.f);
    printf("sizeof(Value) = %zu\\n", sizeof(Value));

    Color c = COLOR_GREEN;
    printf("色: %d\\n", c); /* 1 */
    return 0;
}`,
      },
      {
        title: "ビットフィールドと実践パターン",
        content:
          "ビットフィールドは構造体メンバのビット幅を指定する機能で、メモリ効率やハードウェアレジスタのマッピングに使います。unsigned int flag : 1;のように宣言します。タグ付き共用体は列挙型と共用体を組み合わせて型安全なバリアント型を実現するパターンです。",
        code: `#include <stdio.h>

/* ビットフィールド: フラグ管理 */
typedef struct {
    unsigned int readable  : 1;
    unsigned int writable  : 1;
    unsigned int executable: 1;
    unsigned int reserved  : 5;
} Permission;

/* タグ付き共用体パターン */
typedef enum { TYPE_INT, TYPE_FLOAT, TYPE_STRING } ValueType;
typedef struct {
    ValueType type;
    union {
        int i;
        float f;
        char s[32];
    } data;
} TaggedValue;

void print_value(const TaggedValue *v) {
    switch (v->type) {
        case TYPE_INT:    printf("int: %d\\n", v->data.i); break;
        case TYPE_FLOAT:  printf("float: %f\\n", v->data.f); break;
        case TYPE_STRING: printf("string: %s\\n", v->data.s); break;
    }
}

int main(void) {
    Permission perm = {1, 1, 0, 0}; /* r=1, w=1, x=0 */
    printf("sizeof(Permission) = %zu\\n", sizeof(Permission));
    printf("読:%d 書:%d 実行:%d\\n",
           perm.readable, perm.writable, perm.executable);

    TaggedValue v = {TYPE_INT, {.i = 42}};
    print_value(&v);
    return 0;
}`,
      },
    ],
  },
  {
    id: "file-io",
    title: "ファイル入出力",
    description: "fopen/fclose, fread/fwrite, fprintf/fscanf, fseek/ftell",
    category: "intermediate",
    sections: [
      {
        title: "テキストファイルの読み書き",
        content:
          "ファイル操作はFILE型ポインタを使います。fopenでファイルを開き（\"r\"=読取, \"w\"=書込, \"a\"=追記）、fcloseで閉じます。fprintfはファイルへの書式付き出力、fgetsは1行読み取りを行います。fopenが失敗するとNULLを返すため、必ずエラーチェックが必要です。",
        code: `#include <stdio.h>

int main(void) {
    /* ファイルへの書き込み */
    FILE *fp = fopen("sample.txt", "w");
    if (!fp) { perror("fopen"); return 1; }

    fprintf(fp, "名前: %s\\n", "太郎");
    fprintf(fp, "年齢: %d\\n", 25);
    fprintf(fp, "得点: %.1f\\n", 89.5);
    fclose(fp);

    /* ファイルからの読み取り */
    fp = fopen("sample.txt", "r");
    if (!fp) { perror("fopen"); return 1; }

    char line[256];
    while (fgets(line, sizeof(line), fp)) {
        printf(">> %s", line);
    }
    fclose(fp);

    /* 追記モード */
    fp = fopen("sample.txt", "a");
    if (!fp) { perror("fopen"); return 1; }
    fprintf(fp, "追記データ\\n");
    fclose(fp);
    return 0;
}`,
      },
      {
        title: "バイナリファイルの読み書き",
        content:
          "バイナリモード(\"rb\", \"wb\")ではデータをそのままの形式で読み書きします。fwriteは指定バイト数をファイルに書き出し、freadはファイルから読み込みます。構造体の配列をまるごと保存・復元する場合に便利です。テキストモードとバイナリモードでは改行コードの扱いが異なります。",
        code: `#include <stdio.h>

typedef struct {
    int id;
    char name[32];
    double score;
} Record;

int main(void) {
    Record data[] = {
        {1, "Alice", 95.5},
        {2, "Bob", 82.0},
        {3, "Charlie", 91.3}
    };
    int count = sizeof(data) / sizeof(data[0]);

    /* バイナリ書き込み */
    FILE *fp = fopen("data.bin", "wb");
    if (!fp) { perror("fopen"); return 1; }
    fwrite(data, sizeof(Record), count, fp);
    fclose(fp);

    /* バイナリ読み込み */
    Record loaded[3];
    fp = fopen("data.bin", "rb");
    if (!fp) { perror("fopen"); return 1; }
    size_t read = fread(loaded, sizeof(Record), 3, fp);
    fclose(fp);

    for (size_t i = 0; i < read; i++) {
        printf("ID:%d 名前:%s 得点:%.1f\\n",
               loaded[i].id, loaded[i].name, loaded[i].score);
    }
    return 0;
}`,
      },
      {
        title: "ファイル位置操作",
        content:
          "fseekはファイル内の読み書き位置を移動します。SEEK_SET（先頭から）、SEEK_CUR（現在位置から）、SEEK_END（末尾から）を指定できます。ftellは現在のファイル位置を返します。これらを使ってファイルサイズの取得やランダムアクセスが可能です。rewindは位置を先頭に戻します。",
        code: `#include <stdio.h>

int main(void) {
    /* ファイルサイズの取得 */
    FILE *fp = fopen("sample.txt", "rb");
    if (!fp) { perror("fopen"); return 1; }

    fseek(fp, 0, SEEK_END);    /* 末尾に移動 */
    long size = ftell(fp);      /* 現在位置 = サイズ */
    printf("ファイルサイズ: %ld バイト\\n", size);

    rewind(fp);                 /* 先頭に戻る */
    printf("現在位置: %ld\\n", ftell(fp)); /* 0 */

    /* 指定位置から読み取り */
    fseek(fp, 5, SEEK_SET);    /* 先頭から5バイト目 */
    char buf[20];
    if (fgets(buf, sizeof(buf), fp)) {
        printf("5バイト目から: %s\\n", buf);
    }

    fclose(fp);
    return 0;
}`,
      },
    ],
  },
  // ── 上級 ──
  {
    id: "advanced-pointers",
    title: "高度なポインタ",
    description: "関数ポインタ、ダブルポインタ、void*、コールバック",
    category: "advanced",
    sections: [
      {
        title: "関数ポインタ",
        content:
          "関数ポインタは関数のアドレスを格納する変数です。int (*fp)(int, int)はint型引数2つを取りintを返す関数へのポインタです。コールバック関数、ディスパッチテーブル、qsortの比較関数など、動的に呼び出す関数を切り替える場面で使われます。",
        code: `#include <stdio.h>
#include <stdlib.h>

int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }
int mul(int a, int b) { return a * b; }

/* ディスパッチテーブル */
typedef int (*Operation)(int, int);

/* qsort用比較関数 */
int cmp_asc(const void *a, const void *b) {
    return (*(int *)a - *(int *)b);
}

int main(void) {
    Operation ops[] = {add, sub, mul};
    const char *names[] = {"+", "-", "*"};

    for (int i = 0; i < 3; i++) {
        printf("10 %s 3 = %d\\n", names[i], ops[i](10, 3));
    }

    int arr[] = {5, 2, 8, 1, 9};
    qsort(arr, 5, sizeof(int), cmp_asc);
    for (int i = 0; i < 5; i++) printf("%d ", arr[i]);
    printf("\\n");
    return 0;
}`,
      },
      {
        title: "ダブルポインタとvoid*",
        content:
          "ダブルポインタ(int **pp)はポインタのアドレスを格納し、関数内でポインタ変数自体を変更する場合や二次元配列の動的確保に使います。void*は型情報を持たない汎用ポインタで、mallocの戻り値やジェネリック関数に使われます。使用時にはキャストが必要です。",
        code: `#include <stdio.h>
#include <stdlib.h>

/* ダブルポインタで動的確保を関数内で行う */
int allocate_array(int **arr, int size) {
    *arr = (int *)malloc(sizeof(int) * size);
    return (*arr != NULL) ? 0 : -1;
}

/* 二次元配列の動的確保 */
int **create_matrix(int rows, int cols) {
    int **mat = (int **)malloc(sizeof(int *) * rows);
    for (int i = 0; i < rows; i++) {
        mat[i] = (int *)calloc(cols, sizeof(int));
    }
    return mat;
}

void free_matrix(int **mat, int rows) {
    for (int i = 0; i < rows; i++) free(mat[i]);
    free(mat);
}

int main(void) {
    int *arr = NULL;
    allocate_array(&arr, 5);
    for (int i = 0; i < 5; i++) arr[i] = i * 10;
    free(arr);

    int **mat = create_matrix(3, 4);
    mat[1][2] = 42;
    printf("mat[1][2] = %d\\n", mat[1][2]);
    free_matrix(mat, 3);
    return 0;
}`,
      },
      {
        title: "コールバックパターン",
        content:
          "コールバックは関数ポインタを引数として渡し、特定のイベントや条件で呼び出すパターンです。イベント駆動プログラミング、フィルタ関数、イテレータなどに広く使われます。void*を使うことで型に依存しない汎用的なコールバックを実装できます。",
        code: `#include <stdio.h>

/* 汎用的なforeach関数 */
void foreach(int *arr, int size, void (*callback)(int, int)) {
    for (int i = 0; i < size; i++) {
        callback(i, arr[i]);
    }
}

void print_element(int index, int value) {
    printf("[%d] = %d\\n", index, value);
}

/* フィルタ関数 */
int filter(const int *src, int size, int *dst,
           int (*predicate)(int)) {
    int count = 0;
    for (int i = 0; i < size; i++) {
        if (predicate(src[i])) {
            dst[count++] = src[i];
        }
    }
    return count;
}

int is_even(int x) { return x % 2 == 0; }

int main(void) {
    int arr[] = {1, 2, 3, 4, 5, 6, 7, 8};
    foreach(arr, 8, print_element);

    int evens[8];
    int n = filter(arr, 8, evens, is_even);
    printf("偶数: ");
    for (int i = 0; i < n; i++) printf("%d ", evens[i]);
    printf("\\n");
    return 0;
}`,
      },
    ],
  },
  {
    id: "preprocessor",
    title: "プリプロセッサ",
    description: "#define, #include, #ifdef, マクロ、条件コンパイル",
    category: "advanced",
    sections: [
      {
        title: "#defineマクロ",
        content:
          "#defineはコンパイル前のテキスト置換を行うプリプロセッサディレクティブです。定数マクロと関数マクロがあります。関数マクロは引数を括弧で囲まないと演算子の優先順位で予期しない結果になります。複数行マクロは行末にバックスラッシュを使います。do { } while(0)パターンはマクロを安全な文にします。",
        code: `#include <stdio.h>

/* 定数マクロ */
#define PI 3.14159265
#define MAX(a, b) ((a) > (b) ? (a) : (b))
#define MIN(a, b) ((a) < (b) ? (a) : (b))

/* 安全な複数文マクロ */
#define SWAP(a, b) do { \\
    typeof(a) _tmp = (a); \\
    (a) = (b);            \\
    (b) = _tmp;           \\
} while (0)

/* 文字列化演算子(#)とトークン結合(##) */
#define STRINGIFY(x) #x
#define CONCAT(a, b) a##b

int main(void) {
    printf("PI = %f\\n", PI);
    printf("MAX(3,7) = %d\\n", MAX(3, 7));

    int x = 10, y = 20;
    SWAP(x, y);
    printf("swap: x=%d, y=%d\\n", x, y);

    printf("%s\\n", STRINGIFY(Hello World));
    int CONCAT(var, 1) = 100; /* var1 = 100 */
    printf("var1 = %d\\n", var1);
    return 0;
}`,
      },
      {
        title: "条件コンパイル",
        content:
          "#ifdef, #ifndef, #if, #elif, #else, #endifで条件コンパイルを行います。デバッグコードの有効/無効切り替え、プラットフォーム依存コードの分岐、ヘッダファイルの多重インクルード防止（インクルードガード）に使われます。#pragma onceも同様の目的で広くサポートされています。",
        code: `#include <stdio.h>

/* インクルードガード（ヘッダファイルで使用） */
#ifndef MY_HEADER_H
#define MY_HEADER_H
/* ヘッダの内容 */
#endif

/* デバッグマクロ */
#define DEBUG 1

#if DEBUG
  #define LOG(fmt, ...) fprintf(stderr, "[DEBUG] " fmt "\\n", ##__VA_ARGS__)
#else
  #define LOG(fmt, ...)
#endif

/* プラットフォーム分岐 */
#if defined(__linux__)
  #define PLATFORM "Linux"
#elif defined(__APPLE__)
  #define PLATFORM "macOS"
#elif defined(_WIN32)
  #define PLATFORM "Windows"
#else
  #define PLATFORM "Unknown"
#endif

int main(void) {
    LOG("プログラム開始");
    printf("Platform: %s\\n", PLATFORM);
    LOG("値: %d", 42);
    return 0;
}`,
      },
      {
        title: "事前定義マクロと#pragma",
        content:
          "C言語には__FILE__（ファイル名）、__LINE__（行番号）、__DATE__（コンパイル日）、__TIME__（コンパイル時刻）、__func__（関数名）などの事前定義マクロがあります。#errorはコンパイルエラーを意図的に発生させ、#warningは警告を出します。#pragmaはコンパイラ固有の指示を与えます。",
        code: `#include <stdio.h>

/* デバッグ用マクロ */
#define ASSERT(cond) do { \\
    if (!(cond)) { \\
        fprintf(stderr, "ASSERT失敗: %s\\n  ファイル: %s\\n  行: %d\\n  関数: %s\\n", \\
                #cond, __FILE__, __LINE__, __func__); \\
    } \\
} while (0)

/* バージョンチェック */
#if __STDC_VERSION__ >= 201112L
  #define C_STANDARD "C11以降"
#elif __STDC_VERSION__ >= 199901L
  #define C_STANDARD "C99"
#else
  #define C_STANDARD "C89/C90"
#endif

int main(void) {
    printf("ファイル: %s\\n", __FILE__);
    printf("行番号: %d\\n", __LINE__);
    printf("コンパイル日時: %s %s\\n", __DATE__, __TIME__);
    printf("C標準: %s\\n", C_STANDARD);

    int x = 5;
    ASSERT(x > 0);   /* 成功 */
    ASSERT(x > 10);  /* 失敗メッセージ表示 */
    return 0;
}`,
      },
    ],
  },
  {
    id: "data-structures",
    title: "データ構造の実装",
    description: "連結リスト、スタック、キュー、二分木をCで実装",
    category: "advanced",
    sections: [
      {
        title: "連結リスト",
        content:
          "連結リストは各要素（ノード）がデータと次のノードへのポインタを持つデータ構造です。配列と異なり動的にサイズが変化し、中間への挿入・削除がO(1)で可能です。単方向リスト、双方向リスト、循環リストなどのバリエーションがあります。ヘッドポインタでリストの先頭を管理します。",
        code: `#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node *next;
} Node;

/* 先頭に挿入 */
void push(Node **head, int data) {
    Node *new_node = (Node *)malloc(sizeof(Node));
    new_node->data = data;
    new_node->next = *head;
    *head = new_node;
}

/* リスト表示 */
void print_list(const Node *head) {
    for (const Node *p = head; p; p = p->next)
        printf("%d -> ", p->data);
    printf("NULL\\n");
}

/* メモリ解放 */
void free_list(Node **head) {
    while (*head) {
        Node *tmp = *head;
        *head = (*head)->next;
        free(tmp);
    }
}

int main(void) {
    Node *list = NULL;
    push(&list, 30); push(&list, 20); push(&list, 10);
    print_list(list); /* 10 -> 20 -> 30 -> NULL */
    free_list(&list);
    return 0;
}`,
      },
      {
        title: "スタックとキュー",
        content:
          "スタックはLIFO（後入れ先出し）、キューはFIFO（先入れ先出し）のデータ構造です。スタックはpush/pop操作、キューはenqueue/dequeue操作を持ちます。配列や連結リストで実装でき、関数呼び出し、式の評価、幅優先探索などに使われます。循環キューは配列を効率的に再利用します。",
        code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

/* 配列ベースのスタック */
#define STACK_MAX 100
typedef struct { int data[STACK_MAX]; int top; } Stack;

void stack_init(Stack *s) { s->top = -1; }
bool stack_push(Stack *s, int val) {
    if (s->top >= STACK_MAX - 1) return false;
    s->data[++(s->top)] = val; return true;
}
int stack_pop(Stack *s) { return s->data[(s->top)--]; }
bool stack_empty(const Stack *s) { return s->top == -1; }

/* 連結リストベースのキュー */
typedef struct QNode { int data; struct QNode *next; } QNode;
typedef struct { QNode *front, *rear; } Queue;

void queue_init(Queue *q) { q->front = q->rear = NULL; }
void enqueue(Queue *q, int val) {
    QNode *n = (QNode *)malloc(sizeof(QNode));
    n->data = val; n->next = NULL;
    if (!q->rear) { q->front = q->rear = n; return; }
    q->rear->next = n; q->rear = n;
}
int dequeue(Queue *q) {
    QNode *tmp = q->front; int val = tmp->data;
    q->front = tmp->next;
    if (!q->front) q->rear = NULL;
    free(tmp); return val;
}

int main(void) {
    Stack s; stack_init(&s);
    stack_push(&s, 1); stack_push(&s, 2); stack_push(&s, 3);
    while (!stack_empty(&s)) printf("%d ", stack_pop(&s));
    printf("\\n"); /* 3 2 1 */

    Queue q; queue_init(&q);
    enqueue(&q, 1); enqueue(&q, 2); enqueue(&q, 3);
    for (int i = 0; i < 3; i++) printf("%d ", dequeue(&q));
    printf("\\n"); /* 1 2 3 */
    return 0;
}`,
      },
      {
        title: "二分探索木",
        content:
          "二分探索木（BST）は各ノードが最大2つの子を持ち、左の子は親より小さく、右の子は親より大きいという性質を持つ木構造です。平均的な検索・挿入・削除がO(log n)で可能です。中順走査（inorder）すると昇順に値が得られます。",
        code: `#include <stdio.h>
#include <stdlib.h>

typedef struct BSTNode {
    int data;
    struct BSTNode *left, *right;
} BSTNode;

BSTNode *bst_insert(BSTNode *root, int data) {
    if (!root) {
        BSTNode *n = (BSTNode *)malloc(sizeof(BSTNode));
        n->data = data; n->left = n->right = NULL;
        return n;
    }
    if (data < root->data) root->left = bst_insert(root->left, data);
    else if (data > root->data) root->right = bst_insert(root->right, data);
    return root;
}

void bst_inorder(const BSTNode *root) {
    if (!root) return;
    bst_inorder(root->left);
    printf("%d ", root->data);
    bst_inorder(root->right);
}

void bst_free(BSTNode *root) {
    if (!root) return;
    bst_free(root->left);
    bst_free(root->right);
    free(root);
}

int main(void) {
    BSTNode *root = NULL;
    int vals[] = {50, 30, 70, 20, 40, 60, 80};
    for (int i = 0; i < 7; i++)
        root = bst_insert(root, vals[i]);

    printf("昇順: ");
    bst_inorder(root); /* 20 30 40 50 60 70 80 */
    printf("\\n");
    bst_free(root);
    return 0;
}`,
      },
    ],
  },
  {
    id: "bitwise-lowlevel",
    title: "ビット操作と低レベル処理",
    description: "ビットマスク、エンディアン、volatile",
    category: "advanced",
    sections: [
      {
        title: "ビットマスクとフラグ操作",
        content:
          "ビットマスクは特定のビットを操作するためのパターンです。OR(|)でセット、AND(&)+NOT(~)でクリア、XOR(^)でトグル、AND(&)でテストします。ファイルパーミッション、ハードウェアレジスタ制御、コンパクトなフラグ管理に使われます。",
        code: `#include <stdio.h>

/* フラグ定義 */
#define FLAG_READ    (1 << 0)  /* 0001 */
#define FLAG_WRITE   (1 << 1)  /* 0010 */
#define FLAG_EXEC    (1 << 2)  /* 0100 */
#define FLAG_HIDDEN  (1 << 3)  /* 1000 */

void print_flags(unsigned int flags) {
    printf("R:%d W:%d X:%d H:%d\\n",
           !!(flags & FLAG_READ), !!(flags & FLAG_WRITE),
           !!(flags & FLAG_EXEC), !!(flags & FLAG_HIDDEN));
}

int main(void) {
    unsigned int perm = 0;

    perm |= FLAG_READ | FLAG_WRITE;  /* セット */
    print_flags(perm);               /* R:1 W:1 X:0 H:0 */

    perm ^= FLAG_WRITE;             /* トグル */
    print_flags(perm);               /* R:1 W:0 X:0 H:0 */

    perm &= ~FLAG_READ;             /* クリア */
    print_flags(perm);               /* R:0 W:0 X:0 H:0 */

    /* ビットカウント（popcount） */
    unsigned int v = 0b10110011;
    int count = 0;
    while (v) { count += v & 1; v >>= 1; }
    printf("セットビット数: %d\\n", count); /* 5 */
    return 0;
}`,
      },
      {
        title: "エンディアンとバイト操作",
        content:
          "エンディアンはマルチバイトデータのバイト順序です。リトルエンディアン（x86）は下位バイトが低アドレス、ビッグエンディアン（ネットワーク）は上位バイトが低アドレスです。ネットワーク通信やファイルフォーマット処理ではバイトオーダー変換が必要です。htonl/ntohlなどの関数で変換します。",
        code: `#include <stdio.h>
#include <stdint.h>

/* エンディアン検出 */
int is_little_endian(void) {
    uint16_t val = 0x0001;
    return *((uint8_t *)&val) == 0x01;
}

/* バイトスワップ */
uint32_t swap32(uint32_t val) {
    return ((val >> 24) & 0xFF)
         | ((val >> 8)  & 0xFF00)
         | ((val << 8)  & 0xFF0000)
         | ((val << 24) & 0xFF000000);
}

/* バイト表示 */
void print_bytes(const void *ptr, size_t size) {
    const uint8_t *p = (const uint8_t *)ptr;
    for (size_t i = 0; i < size; i++)
        printf("%02X ", p[i]);
    printf("\\n");
}

int main(void) {
    printf("エンディアン: %s\\n",
           is_little_endian() ? "リトル" : "ビッグ");

    uint32_t val = 0x12345678;
    printf("元の値:    0x%08X → ", val); print_bytes(&val, 4);
    uint32_t swapped = swap32(val);
    printf("スワップ後: 0x%08X → ", swapped); print_bytes(&swapped, 4);
    return 0;
}`,
      },
      {
        title: "volatileとメモリマップドI/O",
        content:
          "volatile修飾子はコンパイラに変数がプログラム外から変更される可能性を伝え、最適化を抑制します。ハードウェアレジスタのアクセス、シグナルハンドラの変数、マルチスレッドのフラグ（ただしatomicが推奨）で使います。volatileがないと、コンパイラがメモリ読み込みを省略する可能性があります。",
        code: `#include <stdio.h>
#include <signal.h>

/* シグナルハンドラで使うvolatile変数 */
volatile sig_atomic_t running = 1;

void handle_sigint(int sig) {
    (void)sig;
    running = 0; /* シグナルハンドラから安全に変更 */
}

/* ハードウェアレジスタ模擬 */
void hardware_example(void) {
    /* 実際のハードウェアではメモリマップドI/Oアドレス */
    volatile unsigned int *status_reg =
        (volatile unsigned int *)0xFFFF0000;

    /* volatileがないとコンパイラがループを最適化で除去する可能性 */
    /* while (*status_reg & 0x01) { ビジーウェイト } */
    (void)status_reg; /* コンパイル用のダミー */
}

int main(void) {
    signal(SIGINT, handle_sigint);
    printf("Ctrl+Cで停止...\\n");

    int count = 0;
    while (running) {
        /* volatileにより毎回メモリから読み込まれる */
        count++;
        if (count > 1000000) {
            printf("カウント: %d\\n", count);
            count = 0;
        }
    }
    printf("\\n停止しました\\n");
    return 0;
}`,
      },
    ],
  },
  {
    id: "multithreading",
    title: "マルチスレッド",
    description: "pthread、ミューテックス、セマフォ、デッドロック回避",
    category: "advanced",
    sections: [
      {
        title: "pthread基礎",
        content:
          "POSIX Threads（pthread）はUNIX系OSの標準スレッドAPIです。pthread_createでスレッドを作成し、pthread_joinで終了を待ちます。スレッド関数はvoid*を引数に取りvoid*を返します。コンパイル時に-lpthreadオプションが必要です。各スレッドは独立したスタックを持ちますが、ヒープやグローバル変数は共有されます。",
        code: `#include <stdio.h>
#include <pthread.h>

typedef struct {
    int id;
    int count;
} ThreadArg;

void *worker(void *arg) {
    ThreadArg *ta = (ThreadArg *)arg;
    int sum = 0;
    for (int i = 1; i <= ta->count; i++) sum += i;
    printf("スレッド%d: 1〜%dの合計 = %d\\n", ta->id, ta->count, sum);
    return NULL;
}

int main(void) {
    pthread_t threads[3];
    ThreadArg args[3] = {{1, 100}, {2, 200}, {3, 300}};

    /* スレッド作成 */
    for (int i = 0; i < 3; i++) {
        pthread_create(&threads[i], NULL, worker, &args[i]);
    }

    /* 全スレッドの終了を待つ */
    for (int i = 0; i < 3; i++) {
        pthread_join(threads[i], NULL);
    }

    printf("全スレッド完了\\n");
    return 0;
}
/* コンパイル: gcc -pthread thread.c -o thread */`,
      },
      {
        title: "ミューテックスと排他制御",
        content:
          "ミューテックスは共有リソースへの排他的アクセスを保証する同期プリミティブです。pthread_mutex_lockでロックを取得し、pthread_mutex_unlockで解放します。クリティカルセクション（共有データ操作部分）をロック/アンロックで囲みます。ロックの取得に失敗するとスレッドはブロックされます。",
        code: `#include <stdio.h>
#include <pthread.h>

int shared_counter = 0;
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;

void *increment(void *arg) {
    int times = *(int *)arg;
    for (int i = 0; i < times; i++) {
        pthread_mutex_lock(&mutex);   /* ロック取得 */
        shared_counter++;              /* クリティカルセクション */
        pthread_mutex_unlock(&mutex); /* ロック解放 */
    }
    return NULL;
}

int main(void) {
    pthread_t t1, t2;
    int count = 100000;

    pthread_create(&t1, NULL, increment, &count);
    pthread_create(&t2, NULL, increment, &count);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);

    /* ミューテックスなしだと200000にならない可能性がある */
    printf("カウンタ: %d (期待値: %d)\\n",
           shared_counter, count * 2);

    pthread_mutex_destroy(&mutex);
    return 0;
}`,
      },
      {
        title: "デッドロック回避とセマフォ",
        content:
          "デッドロックは複数スレッドが互いのロック解放を待って永久にブロックされる状態です。回避策としてロック順序の統一、タイムアウト付きロック（trylock）、ロックの階層化があります。セマフォはカウンタベースの同期で、sem_wait/sem_postで操作し、指定数のスレッドの同時アクセスを制御します。",
        code: `#include <stdio.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>

#define MAX_CONCURRENT 2  /* 同時アクセス最大数 */

sem_t semaphore;

void *limited_worker(void *arg) {
    int id = *(int *)arg;
    sem_wait(&semaphore);  /* セマフォ取得（カウンタ減少） */
    printf("スレッド%d: 開始\\n", id);
    sleep(1);  /* 重い処理のシミュレーション */
    printf("スレッド%d: 完了\\n", id);
    sem_post(&semaphore);  /* セマフォ解放（カウンタ増加） */
    return NULL;
}

int main(void) {
    sem_init(&semaphore, 0, MAX_CONCURRENT);

    pthread_t threads[5];
    int ids[5] = {1, 2, 3, 4, 5};

    for (int i = 0; i < 5; i++)
        pthread_create(&threads[i], NULL, limited_worker, &ids[i]);
    for (int i = 0; i < 5; i++)
        pthread_join(threads[i], NULL);

    sem_destroy(&semaphore);
    printf("全完了\\n");
    return 0;
}`,
      },
    ],
  },
  // ── 実践・応用 ──
  {
    id: "network",
    title: "ネットワークプログラミング",
    description: "ソケット、TCP/UDP、クライアント/サーバー実装",
    category: "expert",
    sections: [
      {
        title: "ソケットプログラミング基礎",
        content:
          "ソケットはネットワーク通信の端点を抽象化したAPIです。socket()で作成し、TCPではconnect()/accept()で接続、UDPではsendto()/recvfrom()で通信します。struct sockaddr_inでIPアドレスとポートを指定し、htons()でバイトオーダーを変換します。",
        code: `#include <stdio.h>
#include <string.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>

/* TCPクライアントの基本 */
int main(void) {
    int sock = socket(AF_INET, SOCK_STREAM, 0);
    if (sock < 0) { perror("socket"); return 1; }

    struct sockaddr_in server = {
        .sin_family = AF_INET,
        .sin_port = htons(8080),
    };
    inet_pton(AF_INET, "127.0.0.1", &server.sin_addr);

    if (connect(sock, (struct sockaddr *)&server, sizeof(server)) < 0) {
        perror("connect"); close(sock); return 1;
    }

    const char *msg = "Hello, Server!";
    send(sock, msg, strlen(msg), 0);

    char buf[1024] = {0};
    recv(sock, buf, sizeof(buf) - 1, 0);
    printf("受信: %s\\n", buf);

    close(sock);
    return 0;
}`,
      },
      {
        title: "TCPサーバー実装",
        content:
          "TCPサーバーはsocket→bind→listen→acceptの手順で接続を受け付けます。bindでポートに紐付け、listenで接続待ちキューを設定、acceptで個々の接続を受理します。acceptは新しいソケットを返し、そのソケットでクライアントと通信します。複数クライアントにはforkやスレッドで対応します。",
        code: `#include <stdio.h>
#include <string.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <unistd.h>

#define PORT 8080
#define BACKLOG 5

int main(void) {
    int server_fd = socket(AF_INET, SOCK_STREAM, 0);
    int opt = 1;
    setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

    struct sockaddr_in addr = {
        .sin_family = AF_INET,
        .sin_addr.s_addr = INADDR_ANY,
        .sin_port = htons(PORT),
    };
    bind(server_fd, (struct sockaddr *)&addr, sizeof(addr));
    listen(server_fd, BACKLOG);
    printf("ポート%dで待機中...\\n", PORT);

    while (1) {
        int client_fd = accept(server_fd, NULL, NULL);
        char buf[1024] = {0};
        ssize_t n = recv(client_fd, buf, sizeof(buf) - 1, 0);
        if (n > 0) {
            printf("受信: %s\\n", buf);
            const char *resp = "OK";
            send(client_fd, resp, strlen(resp), 0);
        }
        close(client_fd);
    }
    close(server_fd);
    return 0;
}`,
      },
      {
        title: "UDP通信",
        content:
          "UDPはコネクションレスのプロトコルで、TCPより軽量ですが到達保証がありません。sendto()/recvfrom()でアドレスを指定して送受信します。接続確立が不要なため、ブロードキャストやリアルタイム通信（ゲーム、音声）に適しています。",
        code: `#include <stdio.h>
#include <string.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>

/* UDPサーバー */
void udp_server(void) {
    int sock = socket(AF_INET, SOCK_DGRAM, 0);
    struct sockaddr_in addr = {
        .sin_family = AF_INET,
        .sin_addr.s_addr = INADDR_ANY,
        .sin_port = htons(9090),
    };
    bind(sock, (struct sockaddr *)&addr, sizeof(addr));

    char buf[1024];
    struct sockaddr_in client;
    socklen_t len = sizeof(client);
    ssize_t n = recvfrom(sock, buf, sizeof(buf)-1, 0,
                         (struct sockaddr *)&client, &len);
    buf[n] = '\\0';
    printf("UDP受信: %s\\n", buf);

    /* 送信元に返信 */
    const char *resp = "ACK";
    sendto(sock, resp, strlen(resp), 0,
           (struct sockaddr *)&client, len);
    close(sock);
}

int main(void) {
    udp_server();
    return 0;
}`,
      },
    ],
  },
  {
    id: "system-calls",
    title: "システムコール",
    description: "fork/exec、プロセス管理、シグナル、パイプ",
    category: "expert",
    sections: [
      {
        title: "fork/execによるプロセス生成",
        content:
          "fork()は現在のプロセスを複製し、親プロセスと子プロセスを生成します。子プロセスでは戻り値が0、親プロセスでは子のPIDが返ります。exec系関数は現在のプロセスイメージを別のプログラムに置き換えます。fork + execパターンで新しいプログラムを実行するのが一般的です。",
        code: `#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    pid_t pid = fork();

    if (pid < 0) {
        perror("fork");
        return 1;
    } else if (pid == 0) {
        /* 子プロセス */
        printf("子プロセス (PID: %d)\\n", getpid());
        execlp("ls", "ls", "-la", NULL); /* lsコマンドを実行 */
        perror("exec"); /* execが返ったらエラー */
        exit(1);
    } else {
        /* 親プロセス */
        printf("親プロセス (PID: %d), 子: %d\\n", getpid(), pid);
        int status;
        waitpid(pid, &status, 0); /* 子プロセスの終了を待つ */
        if (WIFEXITED(status)) {
            printf("子プロセス終了コード: %d\\n", WEXITSTATUS(status));
        }
    }
    return 0;
}`,
      },
      {
        title: "シグナル処理",
        content:
          "シグナルはプロセス間の非同期通知メカニズムです。signal()またはsigaction()でシグナルハンドラを登録します。SIGINTはCtrl+C、SIGTERMは終了要求、SIGSEGVはセグメンテーション違反です。sigaction()はsignal()より移植性が高く、推奨されます。",
        code: `#include <stdio.h>
#include <signal.h>
#include <unistd.h>
#include <stdlib.h>

volatile sig_atomic_t got_signal = 0;

void handler(int sig) {
    got_signal = sig;
}

int main(void) {
    /* sigactionで登録（推奨） */
    struct sigaction sa = {
        .sa_handler = handler,
        .sa_flags = 0,
    };
    sigemptyset(&sa.sa_mask);
    sigaction(SIGINT, &sa, NULL);
    sigaction(SIGTERM, &sa, NULL);

    printf("PID: %d (Ctrl+Cで停止)\\n", getpid());

    while (!got_signal) {
        printf("動作中...\\n");
        sleep(1);
    }

    printf("\\nシグナル %d を受信、終了します\\n", got_signal);
    return 0;
}`,
      },
      {
        title: "パイプによるプロセス間通信",
        content:
          "パイプはプロセス間でデータをストリームとして受け渡す仕組みです。pipe()で読み取り用と書き込み用の2つのファイルディスクリプタを作成します。親子プロセス間の通信やシェルのパイプライン（|）で使われます。名前付きパイプ(FIFO)は無関係なプロセス間でも通信可能です。",
        code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/wait.h>

int main(void) {
    int pipefd[2]; /* [0]=読取, [1]=書込 */
    pipe(pipefd);

    pid_t pid = fork();
    if (pid == 0) {
        /* 子プロセス: パイプから読み取り */
        close(pipefd[1]); /* 書込側を閉じる */

        char buf[256];
        ssize_t n = read(pipefd[0], buf, sizeof(buf) - 1);
        buf[n] = '\\0';
        printf("子が受信: %s\\n", buf);

        close(pipefd[0]);
        exit(0);
    } else {
        /* 親プロセス: パイプに書き込み */
        close(pipefd[0]); /* 読取側を閉じる */

        const char *msg = "Hello from parent!";
        write(pipefd[1], msg, strlen(msg));
        printf("親が送信: %s\\n", msg);

        close(pipefd[1]);
        wait(NULL);
    }
    return 0;
}`,
      },
    ],
  },
  {
    id: "c11-c17",
    title: "C11/C17新機能",
    description: "_Generic、_Atomic、_Thread_local、_Static_assert",
    category: "expert",
    sections: [
      {
        title: "_Generic（型ジェネリック選択）",
        content:
          "_GenericはC11で追加された型に基づく式の選択機構です。コンパイル時に式の型を判定し、対応する処理を選択します。C++のオーバーロードに似た機能をマクロで実現できます。型安全なジェネリックマクロの実装に使われます。",
        code: `#include <stdio.h>
#include <math.h>

/* 型に応じたabs関数を選択 */
#define my_abs(x) _Generic((x), \\
    int: abs,                    \\
    long: labs,                  \\
    float: fabsf,                \\
    double: fabs                 \\
)(x)

/* 型名を文字列で取得 */
#define type_name(x) _Generic((x), \\
    int: "int",                    \\
    float: "float",                \\
    double: "double",              \\
    char *: "char *",              \\
    default: "unknown"             \\
)

/* 型安全なprint */
#define print_val(x) _Generic((x),  \\
    int: printf("%d\\n", (x)),       \\
    double: printf("%f\\n", (x)),    \\
    char *: printf("%s\\n", (x))     \\
)

int main(void) {
    printf("abs(-5) = %d\\n", my_abs(-5));
    printf("abs(-3.14) = %f\\n", my_abs(-3.14));

    int a = 42;
    double b = 3.14;
    printf("aの型: %s\\n", type_name(a));   /* int */
    printf("bの型: %s\\n", type_name(b));   /* double */
    return 0;
}`,
      },
      {
        title: "_Atomicとスレッドサポート",
        content:
          "_Atomic修飾子はC11で追加され、変数へのアトミック（不可分）操作を保証します。マルチスレッド環境でロックなしに安全な読み書きが可能です。_Thread_localは各スレッドが独自のコピーを持つ変数を定義します。stdatomic.hとthreads.hで型やマクロが提供されます。",
        code: `#include <stdio.h>
#include <stdatomic.h>
#include <pthread.h>

/* アトミック変数 — ロック不要で安全 */
_Atomic int atomic_counter = 0;

/* スレッドローカル変数 */
_Thread_local int tl_value = 0;

void *worker(void *arg) {
    int id = *(int *)arg;
    tl_value = id * 100; /* 各スレッドに独立 */

    for (int i = 0; i < 100000; i++) {
        atomic_fetch_add(&atomic_counter, 1); /* アトミック加算 */
    }

    printf("スレッド%d: tl_value=%d\\n", id, tl_value);
    return NULL;
}

int main(void) {
    pthread_t t1, t2;
    int id1 = 1, id2 = 2;

    pthread_create(&t1, NULL, worker, &id1);
    pthread_create(&t2, NULL, worker, &id2);
    pthread_join(t1, NULL);
    pthread_join(t2, NULL);

    /* アトミックなので正確に200000 */
    printf("カウンタ: %d\\n", atomic_load(&atomic_counter));
    return 0;
}`,
      },
      {
        title: "_Static_assertとその他C11機能",
        content:
          "_Static_assertはコンパイル時にアサーションを評価し、条件が偽ならコンパイルエラーを発生させます。型のサイズチェックやプラットフォーム要件の検証に有用です。C11では他にも匿名構造体・共用体、alignas/alignof、noreturn属性などが追加されました。",
        code: `#include <stdio.h>
#include <stdalign.h>
#include <assert.h>

/* _Static_assert: コンパイル時チェック */
_Static_assert(sizeof(int) >= 4, "intは4バイト以上必要");
_Static_assert(sizeof(void *) == 8, "64bitプラットフォーム必須");

/* アラインメント指定 */
typedef struct {
    alignas(16) float data[4]; /* 16バイトアラインメント */
} AlignedVec;

/* 匿名構造体・共用体（C11） */
typedef struct {
    int type;
    union {
        struct { float x, y; };    /* 匿名構造体 */
        float coords[2];
    };
} Point2D;

/* _Noreturn関数 */
_Noreturn void fatal_error(const char *msg) {
    fprintf(stderr, "致命的エラー: %s\\n", msg);
    abort();
}

int main(void) {
    printf("int: %zuバイト\\n", sizeof(int));
    printf("AlignedVecのアラインメント: %zu\\n", alignof(AlignedVec));

    Point2D p = {.type = 1, .x = 3.0f, .y = 4.0f};
    printf("x=%.1f, y=%.1f\\n", p.x, p.y);
    printf("coords[0]=%.1f\\n", p.coords[0]); /* 同じ値 */
    return 0;
}`,
      },
    ],
  },
  {
    id: "debugging",
    title: "デバッグとテスト",
    description: "gdb、valgrind、アサーション、静的解析",
    category: "expert",
    sections: [
      {
        title: "gdbデバッガ",
        content:
          "GDBはGNUのデバッガで、ブレークポイント設定、ステップ実行、変数の検査が可能です。-gオプション付きでコンパイルするとデバッグ情報が埋め込まれます。break, run, next, step, print, backtrace, watchなどのコマンドで対話的にデバッグできます。",
        code: `/* デバッグ用コンパイル: gcc -g -O0 debug.c -o debug */
#include <stdio.h>
#include <stdlib.h>

/* バグのあるコード（デバッグ対象） */
int find_max(const int *arr, int size) {
    if (size <= 0) return -1;
    int max = arr[0];
    for (int i = 1; i < size; i++) { /* i=0から始めるべきだが正しい */
        if (arr[i] > max) max = arr[i];
    }
    return max;
}

int main(void) {
    int data[] = {3, 7, 1, 9, 4, 6};
    int n = sizeof(data) / sizeof(data[0]);
    printf("最大値: %d\\n", find_max(data, n));
    return 0;
}

/* GDB使用例:
   $ gdb ./debug
   (gdb) break find_max    # ブレークポイント設定
   (gdb) run               # 実行開始
   (gdb) print arr[0]      # 変数表示
   (gdb) next              # 次の行へ
   (gdb) print max         # 現在のmax値
   (gdb) backtrace         # コールスタック表示
   (gdb) watch max         # 変数の変更を監視
   (gdb) continue          # 続行
*/`,
      },
      {
        title: "Valgrindによるメモリ検証",
        content:
          "Valgrindはメモリリーク、未初期化メモリの使用、バッファオーバーフロー、二重freeなどを検出するツールです。valgrind --leak-check=full ./programで実行します。メモリの確保・解放を追跡し、プログラム終了時にリークレポートを出力します。",
        code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* メモリ問題のあるコード */
void memory_bugs(void) {
    /* 1. メモリリーク */
    int *leak = (int *)malloc(sizeof(int) * 10);
    leak[0] = 42;
    /* free(leak); ← これがないとリーク */

    /* 2. バッファオーバーラン */
    int *buf = (int *)malloc(sizeof(int) * 5);
    /* buf[5] = 99; ← 範囲外アクセス */
    free(buf);

    /* 3. 正しい使い方 */
    char *str = (char *)malloc(32);
    if (str) {
        strcpy(str, "Hello");
        printf("%s\\n", str);
        free(str); /* 確実に解放 */
    }
}

int main(void) {
    memory_bugs();
    return 0;
}

/* Valgrind実行例:
   $ gcc -g debug.c -o debug
   $ valgrind --leak-check=full --show-reachable=yes ./debug
   ==1234== 40 bytes in 1 blocks are definitely lost
   ==1234== LEAK SUMMARY:
   ==1234==   definitely lost: 40 bytes in 1 blocks
*/`,
      },
      {
        title: "アサーションと静的解析",
        content:
          "assert()マクロは条件が偽のとき実行を中断し、エラー位置を表示します。開発時のバグ検出に有効で、NDEFINEマクロで本番ビルド時に無効化できます。静的解析ツール（clang-tidy, cppcheck）はコンパイル前にコード品質やバグの可能性を検出します。",
        code: `#include <stdio.h>
#include <assert.h>
#include <stdlib.h>

/* カスタムアサート（ログ付き） */
#define ASSERT_MSG(cond, msg) do { \\
    if (!(cond)) { \\
        fprintf(stderr, "ASSERT: %s\\n  %s:%d %s()\\n", \\
                msg, __FILE__, __LINE__, __func__); \\
        abort(); \\
    } \\
} while(0)

/* 事前条件・事後条件パターン */
int safe_divide(int a, int b) {
    assert(b != 0 && "ゼロ除算は不正");
    int result = a / b;
    return result;
}

/* 配列アクセス検証 */
int safe_get(const int *arr, int size, int index) {
    ASSERT_MSG(arr != NULL, "配列がNULL");
    ASSERT_MSG(index >= 0 && index < size, "インデックス範囲外");
    return arr[index];
}

int main(void) {
    printf("%d\\n", safe_divide(10, 3));

    int data[] = {10, 20, 30};
    printf("%d\\n", safe_get(data, 3, 1)); /* 20 */
    /* safe_get(data, 3, 5); ← ASSERTで停止 */
    return 0;
}

/* 静的解析:
   $ cppcheck --enable=all source.c
   $ clang-tidy source.c -- -std=c11
*/`,
      },
    ],
  },
  {
    id: "best-practices",
    title: "ベストプラクティス",
    description: "コーディング規約、セキュアコーディング、パフォーマンス",
    category: "expert",
    sections: [
      {
        title: "コーディング規約",
        content:
          "統一されたコーディングスタイルはチーム開発の効率を上げます。変数名にはスネークケース（my_variable）、型名にはパスカルケース（MyStruct）が一般的です。関数は1つの役割に絞り、適切な長さに保ちます。MISRA-CやCERT Cなどの業界標準規約を参考にすることが推奨されます。",
        code: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

/* 命名規約 */
#define MAX_BUFFER_SIZE 1024  /* マクロ: 大文字スネークケース */

typedef struct {              /* 型: パスカルケース */
    int item_count;           /* メンバ: スネークケース */
    double total_price;
} ShoppingCart;

/* 関数: 動詞+名詞、スネークケース */
static bool is_valid_cart(const ShoppingCart *cart) {
    if (cart == NULL) return false;
    return cart->item_count >= 0 && cart->total_price >= 0.0;
}

/* エラーハンドリングパターン */
typedef enum {
    ERR_NONE = 0,
    ERR_NULL_PTR,
    ERR_INVALID_ARG,
    ERR_OUT_OF_MEMORY,
} ErrorCode;

ErrorCode create_cart(ShoppingCart **out) {
    if (out == NULL) return ERR_NULL_PTR;
    *out = (ShoppingCart *)calloc(1, sizeof(ShoppingCart));
    if (*out == NULL) return ERR_OUT_OF_MEMORY;
    return ERR_NONE;
}

int main(void) {
    ShoppingCart *cart = NULL;
    ErrorCode err = create_cart(&cart);
    if (err != ERR_NONE) { return 1; }
    if (is_valid_cart(cart)) printf("有効なカート\\n");
    free(cart);
    return 0;
}`,
      },
      {
        title: "セキュアコーディング",
        content:
          "C言語ではバッファオーバーフロー、整数オーバーフロー、書式文字列攻撃、use-after-freeなどの脆弱性に注意が必要です。入力の検証、安全な関数の使用（snprintf, strncpy）、境界チェック、メモリ管理の徹底が基本です。CERT Cコーディング標準は具体的なガイドラインを提供しています。",
        code: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <limits.h>

/* 安全な文字列コピー */
void safe_copy(char *dst, size_t dst_size, const char *src) {
    if (!dst || !src || dst_size == 0) return;
    snprintf(dst, dst_size, "%s", src); /* 自動でヌル終端 */
}

/* 整数オーバーフローチェック */
int safe_add(int a, int b, int *result) {
    if ((b > 0 && a > INT_MAX - b) ||
        (b < 0 && a < INT_MIN - b)) {
        return -1; /* オーバーフロー */
    }
    *result = a + b;
    return 0;
}

/* 書式文字列攻撃の防止 */
void safe_print(const char *user_input) {
    /* printf(user_input); ← 危険！書式文字列攻撃 */
    printf("%s", user_input); /* 安全 */
}

int main(void) {
    char buf[10];
    safe_copy(buf, sizeof(buf), "Very long string");
    printf("安全コピー: %s\\n", buf);

    int result;
    if (safe_add(INT_MAX, 1, &result) < 0) {
        printf("オーバーフロー検出\\n");
    }
    return 0;
}`,
      },
      {
        title: "パフォーマンス最適化",
        content:
          "パフォーマンス最適化はまず計測（profiling）から始めます。gprof等のプロファイラでボトルネックを特定し、アルゴリズム改善→データ構造改善→低レベル最適化の順で対処します。コンパイラの最適化オプション（-O2, -O3）を活用し、キャッシュフレンドリーなデータ配置も重要です。",
        code: `#include <stdio.h>
#include <stdlib.h>
#include <time.h>

/* パフォーマンス計測マクロ */
#define BENCH(name, code) do { \\
    clock_t start = clock(); \\
    code; \\
    double elapsed = (double)(clock() - start) / CLOCKS_PER_SEC; \\
    printf("%s: %.4f秒\\n", name, elapsed); \\
} while(0)

/* キャッシュフレンドリー: 行優先アクセス */
void row_major(int n) {
    int (*mat)[1000] = malloc(sizeof(int[1000][1000]));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            mat[i][j] = i + j; /* 連続メモリアクセス（高速） */
    free(mat);
}

/* キャッシュ非効率: 列優先アクセス */
void col_major(int n) {
    int (*mat)[1000] = malloc(sizeof(int[1000][1000]));
    for (int j = 0; j < n; j++)
        for (int i = 0; i < n; i++)
            mat[i][j] = i + j; /* 飛び飛びアクセス（低速） */
    free(mat);
}

int main(void) {
    int n = 1000;
    BENCH("行優先（高速）", row_major(n));
    BENCH("列優先（低速）", col_major(n));
    return 0;
}

/* コンパイル最適化:
   gcc -O0 bench.c -o bench_O0  # 最適化なし
   gcc -O2 bench.c -o bench_O2  # 推奨最適化
   gcc -O3 bench.c -o bench_O3  # 最大最適化
   プロファイル: gcc -pg bench.c && ./a.out && gprof a.out
*/`,
      },
    ],
  },
];
