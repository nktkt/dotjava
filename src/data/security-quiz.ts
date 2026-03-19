export type SecurityLevel = "basics" | "auth" | "crypto" | "web" | "coding" | "ops";

export interface SecurityQuizQuestion {
  id: string;
  question: string;
  choices: { label: string; text: string }[];
  correctLabel: string;
  explanation: string;
  code?: string;
  level: SecurityLevel;
  chapter: string;
}

export const securityQuizQuestions: SecurityQuizQuestion[] = [
  // ════════════════════════════════════════
  // basics: セキュリティの基本概念 (security-overview) 3問
  // ════════════════════════════════════════
  {
    id: "security-overview-q01",
    question: "情報セキュリティのCIA三要素に含まれないものはどれですか？",
    choices: [
      { label: "A", text: "機密性（Confidentiality）" },
      { label: "B", text: "完全性（Integrity）" },
      { label: "C", text: "可用性（Availability）" },
      { label: "D", text: "認証性（Authentication）" },
    ],
    correctLabel: "D",
    explanation:
      "CIA三要素は機密性（Confidentiality）、完全性（Integrity）、可用性（Availability）の3つです。認証性はセキュリティの重要な概念ですが、CIA三要素には含まれません。認証性・責任追跡性・否認防止・信頼性を加えた7要素で定義される場合もあります。",
    level: "basics",
    chapter: "security-overview",
  },
  {
    id: "security-overview-q02",
    question: "OWASP Top 10 (2021) で最もリスクが高いとされるカテゴリはどれですか？",
    choices: [
      { label: "A", text: "インジェクション" },
      { label: "B", text: "アクセス制御の不備（Broken Access Control）" },
      { label: "C", text: "クロスサイトスクリプティング" },
      { label: "D", text: "暗号化の失敗" },
    ],
    correctLabel: "B",
    explanation:
      "OWASP Top 10 (2021) では「アクセス制御の不備（Broken Access Control）」が第1位です。認可されていないリソースへのアクセスや権限昇格が含まれます。インジェクションは第3位に下がり、暗号化の失敗が第2位となっています。",
    level: "basics",
    chapter: "security-overview",
  },
  {
    id: "security-overview-q03",
    question: "STRIDEモデルにおける「Tampering」が意味するセキュリティ脅威はどれですか？",
    choices: [
      { label: "A", text: "なりすまし" },
      { label: "B", text: "データの改ざん" },
      { label: "C", text: "情報漏洩" },
      { label: "D", text: "サービス拒否" },
    ],
    correctLabel: "B",
    explanation:
      "STRIDEモデルのTamperingはデータの改ざんを意味します。S=Spoofing（なりすまし）、T=Tampering（改ざん）、R=Repudiation（否認）、I=Information Disclosure（情報漏洩）、D=Denial of Service（サービス拒否）、E=Elevation of Privilege（権限昇格）です。",
    level: "basics",
    chapter: "security-overview",
  },
  // ════════════════════════════════════════
  // basics: Javaセキュリティアーキテクチャ (java-security-arch) 2問
  // ════════════════════════════════════════
  {
    id: "java-security-arch-q01",
    question: "JavaのJCA（Java Cryptography Architecture）で暗号アルゴリズムの実装を提供する仕組みはどれですか？",
    choices: [
      { label: "A", text: "ClassLoader" },
      { label: "B", text: "SecurityProvider" },
      { label: "C", text: "ServiceLoader" },
      { label: "D", text: "ModuleLayer" },
    ],
    correctLabel: "B",
    explanation:
      "JCAではSecurityProvider（セキュリティプロバイダ）が暗号アルゴリズムの実装を提供します。プロバイダベースのアーキテクチャにより、実装を差し替え可能です。標準ではSunJCE、SunRsaSignなどのプロバイダが含まれています。",
    level: "basics",
    chapter: "java-security-arch",
  },
  {
    id: "java-security-arch-q02",
    question: "Java 17以降でSecurityManagerの状態として正しいものはどれですか？",
    choices: [
      { label: "A", text: "デフォルトで有効" },
      { label: "B", text: "非推奨（deprecated for removal）" },
      { label: "C", text: "完全に削除済み" },
      { label: "D", text: "パフォーマンスが改善され推奨" },
    ],
    correctLabel: "B",
    explanation:
      "SecurityManagerはJava 17で非推奨（deprecated for removal）となりました。モダンなJavaアプリケーションでは、代わりにモジュールシステム（JPMS）によるアクセス制御や、コンテナレベルのセキュリティが推奨されています。",
    level: "basics",
    chapter: "java-security-arch",
  },
  // ════════════════════════════════════════
  // auth: 認証の基礎 (authentication) 3問
  // ════════════════════════════════════════
  {
    id: "authentication-q01",
    question: "認証（Authentication）と認可（Authorization）の違いとして正しいものはどれですか？",
    choices: [
      { label: "A", text: "認証はアクセス権限の確認、認可は本人確認" },
      { label: "B", text: "認証は本人確認、認可はアクセス権限の確認" },
      { label: "C", text: "認証と認可は同じ意味で使い分ける必要はない" },
      { label: "D", text: "認証はサーバー側の処理、認可はクライアント側の処理" },
    ],
    correctLabel: "B",
    explanation:
      "認証（Authentication）は「あなたは誰ですか？」を確認する本人確認プロセスです。認可（Authorization）は「あなたは何ができますか？」を確認するアクセス権限の付与プロセスです。通常、認証が先に行われ、その後に認可が行われます。",
    level: "auth",
    chapter: "authentication",
  },
  {
    id: "authentication-q02",
    question: "セッションベースの認証で、セッション固定攻撃（Session Fixation）を防ぐ方法として正しいものはどれですか？",
    choices: [
      { label: "A", text: "セッションIDをURLに埋め込む" },
      { label: "B", text: "ログイン成功時にセッションIDを再生成する" },
      { label: "C", text: "セッションの有効期限を長く設定する" },
      { label: "D", text: "HTTPのみ（HTTPSを使わない）で運用する" },
    ],
    correctLabel: "B",
    explanation:
      "セッション固定攻撃は、攻撃者が事前に取得したセッションIDを被害者に使わせる攻撃です。ログイン成功時にセッションIDを再生成（invalidate + create）することで、攻撃者の知るセッションIDが無効になり防御できます。Spring Securityではデフォルトでこの対策が有効です。",
    level: "auth",
    chapter: "authentication",
  },
  {
    id: "authentication-q03",
    question: "多要素認証（MFA）の「要素」として正しい組み合わせはどれですか？",
    choices: [
      { label: "A", text: "パスワードとPINコード" },
      { label: "B", text: "パスワードと秘密の質問" },
      { label: "C", text: "パスワード（知識）とスマートフォンアプリのOTP（所持）" },
      { label: "D", text: "ユーザー名とパスワード" },
    ],
    correctLabel: "C",
    explanation:
      "多要素認証は「知識要素」（パスワード等）、「所持要素」（スマートフォン等）、「生体要素」（指紋等）のうち2つ以上を組み合わせます。パスワードとPINは両方とも知識要素なので多要素にはなりません。OTPアプリは所持要素に分類されます。",
    level: "auth",
    chapter: "authentication",
  },
  // ════════════════════════════════════════
  // auth: Spring Security 入門 (spring-security) 3問
  // ════════════════════════════════════════
  {
    id: "spring-security-q01",
    question: "Spring Securityのアーキテクチャでリクエストを最初に処理するコンポーネントはどれですか？",
    choices: [
      { label: "A", text: "AuthenticationManager" },
      { label: "B", text: "SecurityFilterChain" },
      { label: "C", text: "UserDetailsService" },
      { label: "D", text: "PasswordEncoder" },
    ],
    correctLabel: "B",
    explanation:
      "Spring Securityはサーブレットフィルターチェーンとして動作します。DelegatingFilterProxyを通じてSecurityFilterChainが最初にリクエストを受け取り、複数のSecurityFilter（CSRF、認証、認可等）を順番に適用します。AuthenticationManagerは認証処理を担当する内部コンポーネントです。",
    level: "auth",
    chapter: "spring-security",
  },
  {
    id: "spring-security-q02",
    question: "Spring SecurityのUserDetailsServiceインターフェースが提供するメソッドはどれですか？",
    choices: [
      { label: "A", text: "authenticate(String username, String password)" },
      { label: "B", text: "loadUserByUsername(String username)" },
      { label: "C", text: "findUser(String username)" },
      { label: "D", text: "getUser(Long id)" },
    ],
    correctLabel: "B",
    explanation:
      "UserDetailsServiceはloadUserByUsername(String username)メソッドを持つインターフェースです。ユーザー名からUserDetailsオブジェクトを返し、Spring Securityの認証プロセスで使用されます。パスワードの検証はAuthenticationManagerが行います。",
    code: `@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException(
                "User not found: " + username));
        return new org.springframework.security.core.userdetails.User(
            user.getUsername(),
            user.getPassword(),
            user.getAuthorities()
        );
    }
}`,
    level: "auth",
    chapter: "spring-security",
  },
  {
    id: "spring-security-q03",
    question: "@PreAuthorize アノテーションの用途として正しいものはどれですか？",
    choices: [
      { label: "A", text: "メソッド実行前にトランザクションを開始する" },
      { label: "B", text: "メソッドレベルでアクセス制御（認可）を行う" },
      { label: "C", text: "リクエストのバリデーションを行う" },
      { label: "D", text: "メソッドの実行結果をキャッシュする" },
    ],
    correctLabel: "B",
    explanation:
      "@PreAuthorizeはSpring Securityのメソッドレベルセキュリティ機能で、SpEL式でアクセス条件を指定します。@EnableMethodSecurityで有効化し、hasRole('ADMIN')やhasAuthority('WRITE')などの式でメソッド単位の認可を実現します。",
    code: `@PreAuthorize("hasRole('ADMIN')")
public void deleteUser(Long id) {
    userRepository.deleteById(id);
}

@PreAuthorize("#userId == authentication.principal.id")
public UserDto getProfile(Long userId) {
    return userService.findById(userId);
}`,
    level: "auth",
    chapter: "spring-security",
  },
  // ════════════════════════════════════════
  // auth: JWT 認証 (jwt-auth) 3問
  // ════════════════════════════════════════
  {
    id: "jwt-auth-q01",
    question: "JWTの3つの構成要素として正しいものはどれですか？",
    choices: [
      { label: "A", text: "ユーザー名、パスワード、トークン" },
      { label: "B", text: "ヘッダー、ペイロード、署名" },
      { label: "C", text: "公開鍵、秘密鍵、証明書" },
      { label: "D", text: "認証、認可、暗号化" },
    ],
    correctLabel: "B",
    explanation:
      "JWTはヘッダー（アルゴリズム情報）、ペイロード（クレーム/データ）、署名（改ざん検証用）の3部分をドット（.）で連結した構造です。各部分はBase64URLエンコードされています。ペイロードは暗号化されないため、機密情報を含めてはいけません。",
    level: "auth",
    chapter: "jwt-auth",
  },
  {
    id: "jwt-auth-q02",
    question: "JWTのアクセストークンとリフレッシュトークンの運用方針として最も適切なものはどれですか？",
    choices: [
      { label: "A", text: "アクセストークンの有効期限を長く（1年）設定する" },
      { label: "B", text: "アクセストークンは短い有効期限（15分程度）、リフレッシュトークンは長い有効期限で管理する" },
      { label: "C", text: "リフレッシュトークンは不要で、アクセストークンのみ使用する" },
      { label: "D", text: "リフレッシュトークンをlocalStorageに保存する" },
    ],
    correctLabel: "B",
    explanation:
      "アクセストークンは短い有効期限（15分〜1時間）で頻繁に使用し、期限切れ時にリフレッシュトークン（数日〜数週間）で再取得します。アクセストークンが漏洩した場合の被害を時間的に限定できます。リフレッシュトークンはHttpOnly Cookieで安全に保存すべきです。",
    level: "auth",
    chapter: "jwt-auth",
  },
  {
    id: "jwt-auth-q03",
    question: "JWTの署名アルゴリズムとしてHS256を使用する場合、署名と検証に使われる鍵はどれですか？",
    choices: [
      { label: "A", text: "署名に公開鍵、検証に秘密鍵" },
      { label: "B", text: "署名に秘密鍵、検証に公開鍵" },
      { label: "C", text: "署名と検証に同一の秘密鍵（共通鍵）" },
      { label: "D", text: "鍵は不要でハッシュ値のみ使用" },
    ],
    correctLabel: "C",
    explanation:
      "HS256（HMAC-SHA256）は対称鍵アルゴリズムで、署名と検証に同じ秘密鍵を使用します。RS256やES256は非対称鍵アルゴリズムで、署名に秘密鍵、検証に公開鍵を使います。マイクロサービス環境ではRS256が推奨されることが多いです。",
    level: "auth",
    chapter: "jwt-auth",
  },
  // ════════════════════════════════════════
  // auth: OAuth 2.0 / OpenID Connect (oauth2-oidc) 2問
  // ════════════════════════════════════════
  {
    id: "oauth2-oidc-q01",
    question: "OAuth 2.0の認可コードフロー（Authorization Code Flow）で、認可コードをアクセストークンに交換するのはどこですか？",
    choices: [
      { label: "A", text: "ブラウザ（クライアントサイド）" },
      { label: "B", text: "サーバーサイド（バックエンド）" },
      { label: "C", text: "認可サーバー" },
      { label: "D", text: "リソースサーバー" },
    ],
    correctLabel: "B",
    explanation:
      "認可コードフローでは、ブラウザが認可サーバーから認可コードを受け取り、サーバーサイド（バックエンド）が認可コードとクライアントシークレットを使って認可サーバーにアクセストークンを要求します。トークンがブラウザに露出しないため安全です。",
    level: "auth",
    chapter: "oauth2-oidc",
  },
  {
    id: "oauth2-oidc-q02",
    question: "OpenID ConnectがOAuth 2.0に追加する主な機能はどれですか？",
    choices: [
      { label: "A", text: "リソースへのアクセス制御" },
      { label: "B", text: "ユーザーの認証とIDトークンによるID情報の提供" },
      { label: "C", text: "トークンの暗号化" },
      { label: "D", text: "APIのレート制限" },
    ],
    correctLabel: "B",
    explanation:
      "OAuth 2.0は認可のフレームワークですが、認証の仕組みは定義していません。OpenID Connect（OIDC）はOAuth 2.0の上にIDトークン（ユーザー情報を含むJWT）を追加し、標準化された認証プロトコルを提供します。",
    level: "auth",
    chapter: "oauth2-oidc",
  },
  // ════════════════════════════════════════
  // crypto: ハッシュとメッセージダイジェスト (hashing) 3問
  // ════════════════════════════════════════
  {
    id: "hashing-q01",
    question: "パスワードのハッシュ化にSHA-256を直接使うことが推奨されない理由はどれですか？",
    choices: [
      { label: "A", text: "ハッシュ値が短すぎるため" },
      { label: "B", text: "計算が高速すぎてブルートフォース攻撃に弱いため" },
      { label: "C", text: "ハッシュの衝突が頻繁に起きるため" },
      { label: "D", text: "Javaの標準ライブラリでサポートされていないため" },
    ],
    correctLabel: "B",
    explanation:
      "SHA-256は汎用ハッシュ関数で計算が高速なため、GPUを使った総当たり攻撃で短時間に大量のハッシュを計算できます。パスワード専用のBCrypt、Argon2は意図的に計算コストを高く設定でき、ブルートフォース攻撃への耐性があります。",
    level: "crypto",
    chapter: "hashing",
  },
  {
    id: "hashing-q02",
    question: "BCryptのソルトの役割として正しいものはどれですか？",
    choices: [
      { label: "A", text: "ハッシュ値を暗号化する" },
      { label: "B", text: "同じパスワードでも異なるハッシュ値を生成し、レインボーテーブル攻撃を防ぐ" },
      { label: "C", text: "パスワードを復号可能にする" },
      { label: "D", text: "ハッシュの計算速度を向上させる" },
    ],
    correctLabel: "B",
    explanation:
      "ソルトはハッシュ化の前にパスワードに追加されるランダムな値です。同じパスワードでもソルトが異なれば別のハッシュ値になるため、事前計算済みハッシュテーブル（レインボーテーブル）による攻撃を無効化できます。BCryptはソルトを自動生成してハッシュ値に含めます。",
    code: `// BCryptによるパスワードハッシュ
String rawPassword = "myPassword123";

// ハッシュ化（ソルトは自動生成）
String hashed = BCrypt.hashpw(rawPassword, BCrypt.gensalt(12));
// $2a$12$LJ3m4ys... （12はコストファクター）

// 検証
boolean matches = BCrypt.checkpw(rawPassword, hashed); // true`,
    level: "crypto",
    chapter: "hashing",
  },
  {
    id: "hashing-q03",
    question: "Argon2がBCryptより優れている点として正しいものはどれですか？",
    choices: [
      { label: "A", text: "計算速度が速い" },
      { label: "B", text: "メモリ使用量を調整でき、GPUによる並列攻撃への耐性が高い" },
      { label: "C", text: "ソルトが不要" },
      { label: "D", text: "JCA標準プロバイダに含まれている" },
    ],
    correctLabel: "B",
    explanation:
      "Argon2はPassword Hashing Competition（2015年）の勝者で、計算コストに加えてメモリ使用量と並列度を調整できます。GPUは大量のコアを持ちますが各コアのメモリが限られるため、メモリハードな関数はGPU並列攻撃に対して高い耐性を持ちます。",
    level: "crypto",
    chapter: "hashing",
  },
  // ════════════════════════════════════════
  // crypto: 暗号化と復号 (encryption) 2問
  // ════════════════════════════════════════
  {
    id: "encryption-q01",
    question: "AES暗号化でCBCモードを使用する際に必要なものはどれですか？",
    choices: [
      { label: "A", text: "秘密鍵のみ" },
      { label: "B", text: "秘密鍵と初期化ベクトル（IV）" },
      { label: "C", text: "公開鍵と秘密鍵" },
      { label: "D", text: "ハッシュ値" },
    ],
    correctLabel: "B",
    explanation:
      "AES-CBCモードでは秘密鍵に加えて初期化ベクトル（IV）が必要です。IVは暗号化ごとにランダムに生成し、同じ平文から異なる暗号文を生成することで、パターン分析攻撃を防ぎます。IVは秘密にする必要はなく、暗号文と一緒に保存・送信します。",
    code: `// AES-CBC暗号化
SecretKey key = KeyGenerator.getInstance("AES").generateKey();
byte[] iv = new byte[16];
new SecureRandom().nextBytes(iv);

Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
cipher.init(Cipher.ENCRYPT_MODE, key, new IvParameterSpec(iv));
byte[] encrypted = cipher.doFinal(plainText.getBytes());`,
    level: "crypto",
    chapter: "encryption",
  },
  {
    id: "encryption-q02",
    question: "公開鍵暗号（RSA等）と共通鍵暗号（AES等）を組み合わせたハイブリッド暗号の利点はどれですか？",
    choices: [
      { label: "A", text: "実装が簡単になる" },
      { label: "B", text: "公開鍵暗号の鍵配送の利便性とAESの高速な暗号化を両立できる" },
      { label: "C", text: "鍵管理が不要になる" },
      { label: "D", text: "量子コンピュータへの耐性が得られる" },
    ],
    correctLabel: "B",
    explanation:
      "ハイブリッド暗号では、まずランダムな共通鍵（セッション鍵）でデータを高速にAES暗号化し、そのセッション鍵のみをRSA等の公開鍵で暗号化します。TLS/HTTPSでもこの方式が使われており、鍵配送問題の解決と高速な暗号化を両立します。",
    level: "crypto",
    chapter: "encryption",
  },
  // ════════════════════════════════════════
  // crypto: デジタル署名と証明書 (digital-signature) 2問
  // ════════════════════════════════════════
  {
    id: "digital-signature-q01",
    question: "デジタル署名が保証する特性として正しいものはどれですか？",
    choices: [
      { label: "A", text: "データの機密性（暗号化）" },
      { label: "B", text: "データの完全性と送信者の認証（否認防止）" },
      { label: "C", text: "データの可用性" },
      { label: "D", text: "通信の匿名性" },
    ],
    correctLabel: "B",
    explanation:
      "デジタル署名は秘密鍵で署名し公開鍵で検証することで、データが改ざんされていない（完全性）こと、そして署名者が確かにその人である（認証・否認防止）ことを保証します。データ自体の暗号化（機密性）は行いません。",
    level: "crypto",
    chapter: "digital-signature",
  },
  {
    id: "digital-signature-q02",
    question: "HTTPS通信でサーバー証明書を検証する際、クライアントが確認する項目として適切でないものはどれですか？",
    choices: [
      { label: "A", text: "証明書の有効期限" },
      { label: "B", text: "信頼できるCAによる署名" },
      { label: "C", text: "証明書のドメイン名とリクエスト先の一致" },
      { label: "D", text: "サーバーのCPU使用率" },
    ],
    correctLabel: "D",
    explanation:
      "HTTPS証明書の検証では、有効期限、信頼できる認証局（CA）の署名、ドメイン名の一致、証明書チェーンの検証、失効状態の確認（CRL/OCSP）を行います。サーバーのCPU使用率は証明書検証とは無関係です。",
    level: "crypto",
    chapter: "digital-signature",
  },
  // ════════════════════════════════════════
  // web: XSS 対策 (xss-prevention) 3問
  // ════════════════════════════════════════
  {
    id: "xss-prevention-q01",
    question: "反射型XSS（Reflected XSS）の攻撃手法として正しいものはどれですか？",
    choices: [
      { label: "A", text: "データベースに悪意のあるスクリプトを保存し、他のユーザーに表示させる" },
      { label: "B", text: "URLパラメータに悪意のあるスクリプトを埋め込み、被害者にクリックさせる" },
      { label: "C", text: "サーバーの設定ファイルを直接変更する" },
      { label: "D", text: "DNSサーバーを改ざんする" },
    ],
    correctLabel: "B",
    explanation:
      "反射型XSSは、攻撃者が細工したURLのパラメータにスクリプトを埋め込み、そのURLを被害者にクリックさせる攻撃です。サーバーがパラメータを適切にエスケープせずHTMLに出力すると、ブラウザでスクリプトが実行されます。格納型XSSはデータベースに保存するパターンです。",
    level: "web",
    chapter: "xss-prevention",
  },
  {
    id: "xss-prevention-q02",
    question: "XSS対策として、HTMLコンテキストで特殊文字をエスケープする際、< を変換する正しい表記はどれですか？",
    choices: [
      { label: "A", text: "&lt;" },
      { label: "B", text: "\\<" },
      { label: "C", text: "%3C" },
      { label: "D", text: "&#60" },
    ],
    correctLabel: "A",
    explanation:
      "HTMLコンテキストでは < を &lt; に、> を &gt; に、& を &amp; に、\" を &quot; にエスケープします。ThymeleafのTh:textは自動でHTMLエスケープを行います。%3CはURLエンコーディングで、HTMLエスケープとは異なります。",
    level: "web",
    chapter: "xss-prevention",
  },
  {
    id: "xss-prevention-q03",
    question: "Content Security Policy（CSP）ヘッダーの主な目的はどれですか？",
    choices: [
      { label: "A", text: "サーバーのCPU使用率を制限する" },
      { label: "B", text: "ブラウザがロードできるリソースの出典を制限し、XSS攻撃を緩和する" },
      { label: "C", text: "HTTPSへのリダイレクトを強制する" },
      { label: "D", text: "Cookieの有効期限を設定する" },
    ],
    correctLabel: "B",
    explanation:
      "CSPはブラウザに対してスクリプト、スタイル、画像などのリソースのロード元を制限するセキュリティポリシーを指定するHTTPヘッダーです。インラインスクリプトの実行を禁止したり、許可されたドメインからのみスクリプトをロードさせることでXSS攻撃を緩和します。",
    code: `// CSPヘッダーの例
Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.example.com; style-src 'self' 'unsafe-inline'

// Spring Securityでの設定
http.headers(h -> h.contentSecurityPolicy(csp ->
    csp.policyDirectives("default-src 'self'; script-src 'self'")
));`,
    level: "web",
    chapter: "xss-prevention",
  },
  // ════════════════════════════════════════
  // web: CSRF 対策 (csrf-protection) 2問
  // ════════════════════════════════════════
  {
    id: "csrf-protection-q01",
    question: "CSRF（Cross-Site Request Forgery）攻撃が成立する条件として正しいものはどれですか？",
    choices: [
      { label: "A", text: "被害者がターゲットサイトにログイン中で、Cookieが有効な状態" },
      { label: "B", text: "被害者のパスワードが攻撃者に漏洩している" },
      { label: "C", text: "ターゲットサイトがHTTPSを使用していない" },
      { label: "D", text: "被害者のブラウザが古いバージョンである" },
    ],
    correctLabel: "A",
    explanation:
      "CSRFは被害者がターゲットサイトにログイン中（Cookieが有効）の状態で、攻撃者が用意した罠サイトから被害者のブラウザ経由でリクエストを送信させる攻撃です。ブラウザが自動でCookieを付与するため、パスワードの漏洩は不要です。",
    level: "web",
    chapter: "csrf-protection",
  },
  {
    id: "csrf-protection-q02",
    question: "SameSite Cookie属性の値として「Strict」を設定した場合の動作はどれですか？",
    choices: [
      { label: "A", text: "すべてのクロスサイトリクエストでCookieが送信される" },
      { label: "B", text: "GETリクエストのみクロスサイトでCookieが送信される" },
      { label: "C", text: "クロスサイトリクエストでは一切Cookieが送信されない" },
      { label: "D", text: "HTTPSリクエストのみCookieが送信される" },
    ],
    correctLabel: "C",
    explanation:
      "SameSite=Strictは最も厳格な設定で、別サイトからのリクエストでは一切Cookieが送信されません。SameSite=LaxはGETなど安全なメソッドのみ許可、SameSite=Noneは全てのクロスサイトリクエストで送信（Secure属性が必須）されます。",
    level: "web",
    chapter: "csrf-protection",
  },
  // ════════════════════════════════════════
  // web: SQLインジェクション対策 (sql-injection) 2問
  // ════════════════════════════════════════
  {
    id: "sql-injection-q01",
    question: "次のコードにSQLインジェクションの脆弱性がある理由はどれですか？",
    choices: [
      { label: "A", text: "SELECT文を使用しているため" },
      { label: "B", text: "ユーザー入力を文字列結合でSQL文に埋め込んでいるため" },
      { label: "C", text: "WHERE句を使用しているため" },
      { label: "D", text: "ResultSetを使用しているため" },
    ],
    correctLabel: "B",
    explanation:
      "ユーザー入力（userInput）を文字列結合でSQL文に直接埋め込むと、攻撃者が ' OR '1'='1 などの値を入力してSQL文の構造を改変できます。PreparedStatementのバインド変数（?）を使えば、入力は値として扱われSQL構造は変更されません。",
    code: `// 脆弱なコード
String sql = "SELECT * FROM users WHERE name = '" + userInput + "'";
Statement stmt = conn.createStatement();
ResultSet rs = stmt.executeQuery(sql);

// userInput に ' OR '1'='1 と入力されると…
// SELECT * FROM users WHERE name = '' OR '1'='1'
// → 全レコードが返される`,
    level: "web",
    chapter: "sql-injection",
  },
  {
    id: "sql-injection-q02",
    question: "Spring Data JPAを使用する場合、SQLインジェクション対策として注意が必要なケースはどれですか？",
    choices: [
      { label: "A", text: "Derived Queryメソッド（findByName等）の使用" },
      { label: "B", text: "@Queryで:paramを使ったJPQLクエリ" },
      { label: "C", text: "nativeQuery=trueで文字列結合を使ったSQL" },
      { label: "D", text: "JpaRepositoryの標準メソッド（findById等）" },
    ],
    correctLabel: "C",
    explanation:
      "Derived Query、@Queryのバインドパラメータ、JpaRepositoryの標準メソッドは安全です。しかしnativeQuery=trueで直接SQLを記述し、文字列結合でパラメータを埋め込むとSQLインジェクションの脆弱性が生じます。ネイティブクエリでも必ずバインド変数を使用してください。",
    level: "web",
    chapter: "sql-injection",
  },
  // ════════════════════════════════════════
  // web: セキュリティヘッダー (security-headers) 1問
  // ════════════════════════════════════════
  {
    id: "security-headers-q01",
    question: "Strict-Transport-Security（HSTS）ヘッダーの役割はどれですか？",
    choices: [
      { label: "A", text: "XSS攻撃を防止する" },
      { label: "B", text: "ブラウザにHTTPS接続を強制し、HTTPダウングレード攻撃を防ぐ" },
      { label: "C", text: "CORSの設定を行う" },
      { label: "D", text: "Cookieの有効期限を設定する" },
    ],
    correctLabel: "B",
    explanation:
      "HSTSはブラウザに対して指定期間（max-age）、そのドメインへのアクセスを常にHTTPSで行うよう指示するヘッダーです。中間者攻撃によるHTTPへのダウングレードを防止します。includeSubDomainsでサブドメインも対象にできます。",
    level: "web",
    chapter: "security-headers",
  },
  // ════════════════════════════════════════
  // coding: 入力バリデーション (input-validation) 2問
  // ════════════════════════════════════════
  {
    id: "input-validation-q01",
    question: "セキュアな入力バリデーションの方針として最も適切なものはどれですか？",
    choices: [
      { label: "A", text: "クライアントサイドのバリデーションのみで十分" },
      { label: "B", text: "サーバーサイドでのバリデーションが必須で、クライアントサイドはUX向上の補助" },
      { label: "C", text: "危険な文字のみをブラックリストで除外する" },
      { label: "D", text: "バリデーションはパフォーマンスを低下させるため最小限にする" },
    ],
    correctLabel: "B",
    explanation:
      "クライアントサイドのバリデーションはブラウザの開発者ツール等で回避可能です。サーバーサイドでの検証が必須であり、ホワイトリスト方式（許可する値を明示）が推奨されます。クライアントサイドはユーザー体験の向上を目的とした補助的な役割です。",
    level: "coding",
    chapter: "input-validation",
  },
  {
    id: "input-validation-q02",
    question: "Bean Validation（Jakarta Validation）でカスタムバリデーションを作成する際に必要なものはどれですか？",
    choices: [
      { label: "A", text: "カスタムアノテーションとConstraintValidatorの実装" },
      { label: "B", text: "SecurityFilterの拡張" },
      { label: "C", text: "ExceptionHandlerの実装" },
      { label: "D", text: "Interceptorの登録" },
    ],
    correctLabel: "A",
    explanation:
      "カスタムバリデーションには、@Constraintメタアノテーションを付けたカスタムアノテーションと、ConstraintValidator<A, T>インターフェースを実装したバリデータクラスが必要です。isValid()メソッドに検証ロジックを記述します。",
    level: "coding",
    chapter: "input-validation",
  },
  // ════════════════════════════════════════
  // coding: エラーハンドリング (error-handling) 1問
  // ════════════════════════════════════════
  {
    id: "error-handling-q01",
    question: "セキュアなエラーハンドリングの原則として正しいものはどれですか？",
    choices: [
      { label: "A", text: "スタックトレースをそのままユーザーに表示する" },
      { label: "B", text: "ユーザーには一般的なメッセージを返し、詳細はサーバーログに記録する" },
      { label: "C", text: "エラーは全て握りつぶして正常レスポンスを返す" },
      { label: "D", text: "SQLのエラーメッセージをそのまま返す" },
    ],
    correctLabel: "B",
    explanation:
      "スタックトレースやSQLエラーにはテーブル名、カラム名、技術スタックなど攻撃者にとって有用な情報が含まれます。ユーザーには「処理に失敗しました」等の一般的メッセージを返し、詳細なエラー情報はサーバーサイドのログに記録して、開発者のみがアクセスできるようにします。",
    level: "coding",
    chapter: "error-handling",
  },
  // ════════════════════════════════════════
  // coding: 依存関係のセキュリティ (dependency-security) 1問
  // ════════════════════════════════════════
  {
    id: "dependency-security-q01",
    question: "サードパーティライブラリの脆弱性を検出するツールとして適切なものはどれですか？",
    choices: [
      { label: "A", text: "JUnit" },
      { label: "B", text: "OWASP Dependency-Check / Snyk" },
      { label: "C", text: "JProfiler" },
      { label: "D", text: "VisualVM" },
    ],
    correctLabel: "B",
    explanation:
      "OWASP Dependency-CheckやSnykは、プロジェクトの依存ライブラリに既知の脆弱性（CVE）がないかスキャンするツールです。CI/CDパイプラインに組み込むことで、脆弱なライブラリの使用を早期に検出できます。JUnitはテスト、JProfiler/VisualVMはパフォーマンス分析ツールです。",
    level: "coding",
    chapter: "dependency-security",
  },
  // ════════════════════════════════════════
  // ops: セキュリティテスト (security-testing) 1問
  // ════════════════════════════════════════
  {
    id: "security-testing-q01",
    question: "ペネトレーションテスト（ペンテスト）の説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "単体テストの一種で、各メソッドの入出力を検証する" },
      { label: "B", text: "実際の攻撃手法を模擬してシステムの脆弱性を検証するテスト" },
      { label: "C", text: "負荷テストの一種で、同時アクセス数を測定する" },
      { label: "D", text: "コードレビューの自動化ツール" },
    ],
    correctLabel: "B",
    explanation:
      "ペネトレーションテストは、ホワイトハッカーが実際の攻撃手法を使ってシステムの脆弱性を発見・検証するセキュリティテストです。SQLインジェクション、XSS、認証バイパスなどの攻撃をシミュレートし、対策の有効性を確認します。",
    level: "ops",
    chapter: "security-testing",
  },
  // ════════════════════════════════════════
  // ops: セキュアなデプロイ (secure-deployment) 1問
  // ════════════════════════════════════════
  {
    id: "secure-deployment-q01",
    question: "本番環境へのデプロイで、シークレット（DBパスワード等）を管理する方法として最も適切なものはどれですか？",
    choices: [
      { label: "A", text: "ソースコードにハードコーディングする" },
      { label: "B", text: "application.ymlに平文で記述してGitにコミットする" },
      { label: "C", text: "環境変数やシークレット管理サービス（Vault等）を使用する" },
      { label: "D", text: "READMEファイルに記載してチーム内で共有する" },
    ],
    correctLabel: "C",
    explanation:
      "シークレットはソースコードやバージョン管理に含めてはいけません。環境変数、HashiCorp Vault、AWS Secrets Manager、KubernetesのSecretなどのシークレット管理の仕組みを使用し、アクセス権限を最小限に制御して管理します。",
    level: "ops",
    chapter: "secure-deployment",
  },
];
