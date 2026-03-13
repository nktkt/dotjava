import type { DocsChapter } from "../java-docs";

export const exceptionsChapters: DocsChapter[] = [
  {
    id: "exceptions",
    title: "例外処理",
    category: "exceptions",
    description: "try/catch/finally、try-with-resources、チェック例外と非チェック例外、カスタム例外",
    sections: [
      {
        title: "try / catch / finally",
        content:
          "例外はプログラムの正常な流れを中断するイベントです。try ブロックで例外が発生する可能性のあるコードを囲み、catch で例外を捕捉して処理します。finally は例外の有無にかかわらず必ず実行されます。",
        code: `// 基本的な try-catch-finally
try {
    int result = 10 / 0;
} catch (ArithmeticException e) {
    System.out.println("ゼロ除算: " + e.getMessage());
} finally {
    System.out.println("必ず実行される");
}

// 複数の例外を捕捉
try {
    String s = null;
    s.length();
} catch (NullPointerException e) {
    System.out.println("Nullポインタ: " + e.getMessage());
} catch (Exception e) {
    System.out.println("その他: " + e.getMessage());
}

// マルチキャッチ（Java 7+）
try {
    // ...
} catch (IOException | SQLException e) {
    System.out.println("I/OまたはSQLエラー: " + e.getMessage());
}

// try-with-resources（Java 7+） — AutoCloseable を自動クローズ
try (var reader = new BufferedReader(new FileReader("data.txt"));
     var writer = new BufferedWriter(new FileWriter("out.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        writer.write(line);
        writer.newLine();
    }
} catch (IOException e) {
    e.printStackTrace();
}
// reader と writer は自動的にクローズされる`,
      },
      {
        title: "例外の種類とカスタム例外",
        content:
          "Javaの例外はチェック例外（Exception のサブクラス）と非チェック例外（RuntimeException のサブクラス）に分かれます。チェック例外はコンパイラが処理を強制します。アプリケーション固有のカスタム例外を定義することも一般的です。",
        code: `// 例外の階層
// Throwable
// ├── Error           ← 回復不可能（OutOfMemoryError等）
// └── Exception       ← チェック例外
//     └── RuntimeException  ← 非チェック例外

// チェック例外: throws 宣言が必要
public String readFile(String path) throws IOException {
    return Files.readString(Path.of(path));
}

// 非チェック例外: throws 宣言は不要
public int divide(int a, int b) {
    if (b == 0) throw new ArithmeticException("ゼロ除算");
    return a / b;
}

// カスタム例外（チェック例外）
public class UserNotFoundException extends Exception {
    private final String userId;

    public UserNotFoundException(String userId) {
        super("ユーザーが見つかりません: " + userId);
        this.userId = userId;
    }

    public String getUserId() { return userId; }
}

// カスタム例外（非チェック例外）
public class InvalidInputException extends RuntimeException {
    public InvalidInputException(String message) {
        super(message);
    }

    public InvalidInputException(String message, Throwable cause) {
        super(message, cause);    // 原因の例外を連鎖
    }
}

// 使用例
public User findUser(String id) throws UserNotFoundException {
    return userMap.get(id);
    if (user == null) {
        throw new UserNotFoundException(id);
    }
    return user;
}`,
      },
    ],
  },
];
