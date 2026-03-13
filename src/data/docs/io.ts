import type { DocsChapter } from "../java-docs";

export const ioChapters: DocsChapter[] = [
  {
    id: "file-io",
    title: "ファイル I/O",
    category: "io",
    description: "Path, Files を使ったモダンなファイル操作 (NIO.2)",
    sections: [
      {
        title: "PathとFilesの基本",
        content:
          "Java NIO.2の Path と Files はファイル操作の標準APIです。従来の java.io.File よりも強力で使いやすく、Java 7以降に推奨されます。Path はファイルパスを表し、Files はファイル操作のstaticメソッドを提供します。",
        code: `// Path の生成
Path path = Path.of("src", "main", "data.txt");
Path abs = Path.of("/Users/naoki/file.txt");

// Path の操作
path.getFileName();              // "data.txt"
path.getParent();                // "src/main"
path.toAbsolutePath();           // 絶対パス
path.resolve("sub/file.txt");    // パス結合
path.relativize(abs);            // 相対パス計算
path.normalize();                // "." ".." を解決

// ファイルの読み書き（Java 11+）
String content = Files.readString(path);
Files.writeString(path, "Hello Java", StandardCharsets.UTF_8);

// 全行読み込み
List<String> lines = Files.readAllLines(path);
Files.write(path, lines, StandardCharsets.UTF_8);

// バイト読み書き
byte[] bytes = Files.readAllBytes(path);
Files.write(path, bytes);

// ファイル情報
Files.exists(path);
Files.isRegularFile(path);
Files.isDirectory(path);
Files.size(path);                 // バイト数
Files.getLastModifiedTime(path);

// コピー・移動・削除
Files.copy(src, dst, StandardCopyOption.REPLACE_EXISTING);
Files.move(src, dst, StandardCopyOption.ATOMIC_MOVE);
Files.delete(path);
Files.deleteIfExists(path);

// ディレクトリ作成
Files.createDirectory(Path.of("newDir"));
Files.createDirectories(Path.of("a/b/c"));`,
      },
      {
        title: "ディレクトリ走査と検索",
        content:
          "Files.list() でディレクトリの直下を列挙、Files.walk() で再帰的に走査、Files.find() で条件付き検索が可能です。いずれもStreamを返すため、try-with-resourcesで使用します。",
        code: `// ディレクトリの内容を列挙
try (Stream<Path> paths = Files.list(Path.of("."))) {
    paths.filter(Files::isRegularFile)
         .forEach(System.out::println);
}

// 再帰的走査
try (Stream<Path> paths = Files.walk(Path.of("src"))) {
    List<Path> javaFiles = paths
        .filter(p -> p.toString().endsWith(".java"))
        .toList();
}

// 条件付き検索（最大深度10）
try (Stream<Path> paths = Files.find(Path.of("src"), 10,
        (p, attr) -> attr.isRegularFile()
            && p.toString().endsWith(".java")
            && attr.size() > 1000)) {
    paths.forEach(System.out::println);
}

// 一時ファイル・ディレクトリ
Path tempFile = Files.createTempFile("prefix-", ".tmp");
Path tempDir = Files.createTempDirectory("mytemp-");

// ファイルの行をStreamで処理（大きなファイルに適）
try (Stream<String> lines = Files.lines(Path.of("large.txt"))) {
    long count = lines
        .filter(line -> line.contains("ERROR"))
        .count();
}`,
      },
    ],
  },
  {
    id: "stream-io",
    title: "ストリーム I/O",
    category: "io",
    description: "InputStream/OutputStream, Reader/Writer, バッファリング",
    sections: [
      {
        title: "バイトストリームと文字ストリーム",
        content:
          "InputStream/OutputStreamはバイト単位、Reader/Writerは文字単位のI/Oです。BufferedReader/BufferedWriterでパフォーマンスを向上させます。try-with-resourcesで自動クローズします。",
        code: `// バイトストリーム（バイナリデータ向け）
try (var is = new FileInputStream("data.bin");
     var os = new FileOutputStream("out.bin")) {
    is.transferTo(os);             // 全データ転送 (Java 9+)
}

// バッファリング
try (var bis = new BufferedInputStream(new FileInputStream("data.bin"));
     var bos = new BufferedOutputStream(new FileOutputStream("out.bin"))) {
    byte[] buffer = new byte[8192];
    int bytesRead;
    while ((bytesRead = bis.read(buffer)) != -1) {
        bos.write(buffer, 0, bytesRead);
    }
}

// 文字ストリーム（テキスト向け）
try (var br = Files.newBufferedReader(Path.of("data.txt"))) {
    String line;
    while ((line = br.readLine()) != null) {
        System.out.println(line);
    }
}

// BufferedReader → Stream
try (var br = Files.newBufferedReader(Path.of("data.txt"))) {
    br.lines()
      .filter(line -> !line.isBlank())
      .forEach(System.out::println);
}

// 書き込み
try (var bw = Files.newBufferedWriter(Path.of("out.txt"))) {
    bw.write("Hello");
    bw.newLine();
    bw.write("World");
}

// PrintWriter
try (var pw = new PrintWriter(Files.newBufferedWriter(Path.of("log.txt")))) {
    pw.println("ログ出力");
    pw.printf("値: %d, 名前: %s%n", 42, "Java");
}`,
      },
    ],
  },
  {
    id: "serialization",
    title: "シリアライゼーション",
    category: "io",
    description: "Serializable, ObjectInputStream/ObjectOutputStream, JSON変換",
    sections: [
      {
        title: "オブジェクトの直列化",
        content:
          "シリアライゼーションはオブジェクトをバイト列に変換して保存・転送し、デシリアライゼーションで復元する機能です。Serializableインターフェースを実装しますが、セキュリティリスクがあるため、現代ではJSONなどのテキスト形式が推奨されます。",
        code: `// Serializable の実装
public class User implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String name;
    private int age;
    private transient String password;  // transient: 直列化対象外

    public User(String name, int age, String password) {
        this.name = name;
        this.age = age;
        this.password = password;
    }
}

// 書き出し（シリアライズ）
try (var oos = new ObjectOutputStream(
        new FileOutputStream("user.ser"))) {
    oos.writeObject(new User("Alice", 25, "secret"));
}

// 読み込み（デシリアライズ）
try (var ois = new ObjectInputStream(
        new FileInputStream("user.ser"))) {
    User user = (User) ois.readObject();
    // user.password は null（transient のため）
}

// JSON との比較（実務ではJSON推奨）
// Jackson ライブラリの例:
// ObjectMapper mapper = new ObjectMapper();
//
// // シリアライズ（Object → JSON）
// String json = mapper.writeValueAsString(user);
// // {"name":"Alice","age":25}
//
// // デシリアライズ（JSON → Object）
// User restored = mapper.readValue(json, User.class);`,
      },
    ],
  },
];
