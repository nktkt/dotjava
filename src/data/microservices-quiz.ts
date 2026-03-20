export type MicroservicesLevel = "basics" | "patterns" | "infrastructure";

export interface MicroservicesQuizQuestion {
  id: string;
  question: string;
  choices: { label: string; text: string }[];
  correctLabel: string;
  explanation: string;
  code?: string;
  level: MicroservicesLevel;
  chapter: string;
}

export const microservicesQuizQuestions: MicroservicesQuizQuestion[] = [
  // ════════════════════════════════════════
  // basics: マイクロサービスの基礎 5問
  // ════════════════════════════════════════
  {
    id: "ms-basics-q01",
    question: "マイクロサービスアーキテクチャの特徴として正しいものはどれですか？",
    choices: [
      { label: "A", text: "すべてのサービスが1つのデータベースを共有する" },
      { label: "B", text: "各サービスが独立してデプロイ可能で、特定のビジネス機能に特化している" },
      { label: "C", text: "すべてのサービスが同じプログラミング言語で実装される必要がある" },
      { label: "D", text: "サービス間の通信は常に同期的に行う" },
    ],
    correctLabel: "B",
    explanation:
      "マイクロサービスは、各サービスが独立したプロセスとして動作し、特定のビジネスドメインに特化しています。独立してデプロイ・スケーリングが可能で、各サービスは独自のデータストアを持ちます（Database per Service）。言語やフレームワークも各サービスで自由に選択できます。",
    level: "basics",
    chapter: "ms-basics",
  },
  {
    id: "ms-basics-q02",
    question: "マイクロサービスとモノリシックアーキテクチャの比較として正しいものはどれですか？",
    choices: [
      { label: "A", text: "マイクロサービスは常にモノリスより優れている" },
      { label: "B", text: "モノリスは小規模チームには適しているが、マイクロサービスは大規模組織に適している" },
      { label: "C", text: "モノリスではCI/CDが不可能である" },
      { label: "D", text: "マイクロサービスは運用が単純である" },
    ],
    correctLabel: "B",
    explanation:
      "モノリスはシンプルで開発初期には効率的ですが、規模が大きくなると変更の影響範囲やデプロイの複雑さが増します。マイクロサービスは大規模組織で独立したチームが並行開発する場合に適していますが、分散システムの複雑さ（ネットワーク遅延、データ整合性等）が増す欠点もあります。",
    level: "basics",
    chapter: "ms-basics",
  },
  {
    id: "ms-basics-q03",
    question: "マイクロサービス間の通信方式として正しい組み合わせはどれですか？",
    choices: [
      { label: "A", text: "同期通信（REST/gRPC）と非同期通信（メッセージキュー）" },
      { label: "B", text: "共有メモリとファイル共有のみ" },
      { label: "C", text: "データベースの共有テーブルを介した通信のみ" },
      { label: "D", text: "RMI（Remote Method Invocation）のみ" },
    ],
    correctLabel: "A",
    explanation:
      "マイクロサービス間の通信には、同期通信（REST API、gRPC）と非同期通信（Kafka、RabbitMQなどのメッセージキュー）があります。同期通信はシンプルですがサービス間の結合度が高くなり、非同期通信は疎結合ですが複雑さが増します。用途に応じて使い分けます。",
    level: "basics",
    chapter: "ms-basics",
  },
  {
    id: "ms-basics-q04",
    question: "ドメイン駆動設計（DDD）の「境界づけられたコンテキスト」がマイクロサービスに重要な理由はどれですか？",
    choices: [
      { label: "A", text: "データベースのテーブル設計を自動生成するため" },
      { label: "B", text: "サービスの境界を明確にし、各サービスが独自のドメインモデルを持てるようにするため" },
      { label: "C", text: "すべてのサービスで共通のデータモデルを共有するため" },
      { label: "D", text: "REST APIのエンドポイントを自動生成するため" },
    ],
    correctLabel: "B",
    explanation:
      "境界づけられたコンテキスト（Bounded Context）は、ドメインモデルが適用される明確な境界を定義します。マイクロサービスの分割単位として使うことで、各サービスが独自のドメインモデルを持ち、他のサービスとの結合度を低く保てます。同じ概念（例：「顧客」）でもコンテキストによって異なるモデルを持てます。",
    level: "basics",
    chapter: "ms-basics",
  },
  {
    id: "ms-basics-q05",
    question: "マイクロサービスにおけるAPI First設計アプローチの説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "実装後にAPIドキュメントを生成する" },
      { label: "B", text: "APIの仕様（契約）を最初に定義し、それに基づいて実装を行う" },
      { label: "C", text: "APIを使わずにサービス間通信を行う" },
      { label: "D", text: "すべてのAPIをGraphQLで実装する" },
    ],
    correctLabel: "B",
    explanation:
      "API First設計ではOpenAPI（Swagger）仕様などでAPIの契約を先に定義し、チーム間で合意した上で実装に入ります。これにより、フロントエンドとバックエンドの並行開発が可能になり、APIの一貫性も保たれます。契約テスト（Contract Testing）と組み合わせることで品質も向上します。",
    level: "basics",
    chapter: "ms-basics",
  },
  // ════════════════════════════════════════
  // patterns: マイクロサービスパターン 5問
  // ════════════════════════════════════════
  {
    id: "patterns-q01",
    question: "サーキットブレーカーパターンの目的として正しいものはどれですか？",
    choices: [
      { label: "A", text: "ネットワークの暗号化を行う" },
      { label: "B", text: "障害が発生したサービスへの呼び出しを遮断し、連鎖的な障害（カスケード障害）を防ぐ" },
      { label: "C", text: "データベースのトランザクションを管理する" },
      { label: "D", text: "サービスの認証を行う" },
    ],
    correctLabel: "B",
    explanation:
      "サーキットブレーカーは、呼び出し先サービスの障害を検知すると回路を「Open」状態にして呼び出しを遮断し、フォールバック処理を返します。一定時間後に「Half-Open」状態で試行し、成功すれば「Closed」に戻ります。Resilience4jが代表的なJavaライブラリです。",
    level: "patterns",
    chapter: "patterns",
  },
  {
    id: "patterns-q02",
    question: "Sagaパターンの説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "分散トランザクションを2相コミットで実現する" },
      { label: "B", text: "複数サービスにまたがるトランザクションを、ローカルトランザクションの連鎖と補償処理で実現する" },
      { label: "C", text: "サービスメッシュのルーティングを管理する" },
      { label: "D", text: "イベントのバージョニングを行う" },
    ],
    correctLabel: "B",
    explanation:
      "Sagaパターンは分散トランザクションを管理するパターンです。各サービスがローカルトランザクションを実行し、失敗時には補償トランザクション（Compensating Transaction）を実行してロールバックします。Choreography方式（イベント駆動）とOrchestration方式（中央制御）の2種類があります。",
    level: "patterns",
    chapter: "patterns",
  },
  {
    id: "patterns-q03",
    question: "CQRSパターン（Command Query Responsibility Segregation）の説明として正しいものはどれですか？",
    choices: [
      { label: "A", text: "読み取りと書き込みを同じモデルで処理する" },
      { label: "B", text: "読み取り（Query）と書き込み（Command）のモデルを分離し、それぞれを最適化する" },
      { label: "C", text: "すべてのクエリをキャッシュする" },
      { label: "D", text: "データベースを読み取り専用にする" },
    ],
    correctLabel: "B",
    explanation:
      "CQRSは読み取りモデルと書き込みモデルを分離するパターンです。書き込みは正規化されたデータモデル、読み取りはクエリに最適化された非正規化モデルを使用できます。Event Sourcingと組み合わせることが多く、高い読み取りスケーラビリティを実現できます。",
    level: "patterns",
    chapter: "patterns",
  },
  {
    id: "patterns-q04",
    question: "API Gatewayパターンの役割として正しいものはどれですか？",
    choices: [
      { label: "A", text: "各マイクロサービスのデータベースを管理する" },
      { label: "B", text: "クライアントからのリクエストを受け付け、適切なサービスにルーティングし、認証やレート制限を提供する" },
      { label: "C", text: "サービス間のデータベーストランザクションを管理する" },
      { label: "D", text: "マイクロサービスのソースコードを管理する" },
    ],
    correctLabel: "B",
    explanation:
      "API Gatewayはクライアントとマイクロサービス群の間に位置する単一のエントリポイントです。リクエストのルーティング、認証・認可、レート制限、レスポンスの集約、プロトコル変換などを担当します。Spring Cloud Gateway、Kong、AWS API Gatewayが代表的な実装です。",
    level: "patterns",
    chapter: "patterns",
  },
  {
    id: "patterns-q05",
    question: "Strangler Figパターンの目的として正しいものはどれですか？",
    choices: [
      { label: "A", text: "新しいマイクロサービスを一から構築する" },
      { label: "B", text: "モノリシックアプリケーションを段階的にマイクロサービスに移行する" },
      { label: "C", text: "サービス間の通信を暗号化する" },
      { label: "D", text: "データベースのスキーマを移行する" },
    ],
    correctLabel: "B",
    explanation:
      "Strangler Fig（絞め殺しのイチジク）パターンは、既存のモノリスを一度に置き換えるのではなく、新機能をマイクロサービスとして構築しながら、既存機能も段階的にマイクロサービスに移行していくパターンです。プロキシ層を介してトラフィックを新旧のシステムに振り分けます。",
    level: "patterns",
    chapter: "patterns",
  },
  // ════════════════════════════════════════
  // infrastructure: インフラストラクチャ 5問
  // ════════════════════════════════════════
  {
    id: "infrastructure-q01",
    question: "サービスディスカバリの役割として正しいものはどれですか？",
    choices: [
      { label: "A", text: "サービスのソースコードを管理する" },
      { label: "B", text: "各サービスのネットワーク上の位置（IPアドレス・ポート）を動的に登録・検索する" },
      { label: "C", text: "サービスのログを収集する" },
      { label: "D", text: "サービスのデプロイを自動化する" },
    ],
    correctLabel: "B",
    explanation:
      "サービスディスカバリは、マイクロサービスのインスタンスのネットワーク位置を動的に管理する仕組みです。サービスが起動するとレジストリに登録し、他のサービスはレジストリに問い合わせて接続先を取得します。Netflix Eureka、Consul、Kubernetes DNSが代表的な実装です。",
    level: "infrastructure",
    chapter: "infrastructure",
  },
  {
    id: "infrastructure-q02",
    question: "分散トレーシングの目的として正しいものはどれですか？",
    choices: [
      { label: "A", text: "サービスのデプロイを自動化する" },
      { label: "B", text: "複数のサービスにまたがるリクエストの流れを追跡し、パフォーマンスのボトルネックを特定する" },
      { label: "C", text: "サービスのコンテナイメージを管理する" },
      { label: "D", text: "データベースのクエリを最適化する" },
    ],
    correctLabel: "B",
    explanation:
      "分散トレーシングは、マイクロサービス間を流れるリクエストにトレースIDを付与して追跡する仕組みです。各サービスでの処理時間（スパン）を記録し、レイテンシのボトルネックやエラーの発生箇所を可視化します。Zipkin、Jaeger、OpenTelemetryが代表的なツールです。",
    level: "infrastructure",
    chapter: "infrastructure",
  },
  {
    id: "infrastructure-q03",
    question: "コンテナオーケストレーション（Kubernetes）がマイクロサービスに提供する機能として正しいものはどれですか？",
    choices: [
      { label: "A", text: "コンテナの自動スケーリング、セルフヒーリング、サービスディスカバリ" },
      { label: "B", text: "ソースコードのバージョン管理" },
      { label: "C", text: "APIの仕様書自動生成" },
      { label: "D", text: "データベースのスキーマ管理" },
    ],
    correctLabel: "A",
    explanation:
      "Kubernetesはコンテナの自動スケーリング（HPA）、障害時の自動再起動（セルフヒーリング）、サービスディスカバリ（DNS/Service）、ローリングアップデート、設定管理（ConfigMap/Secret）などを提供します。マイクロサービスの運用を効率化する基盤として広く利用されています。",
    level: "infrastructure",
    chapter: "infrastructure",
  },
  {
    id: "infrastructure-q04",
    question: "サービスメッシュ（例：Istio）の役割として正しいものはどれですか？",
    choices: [
      { label: "A", text: "アプリケーションのビジネスロジックを実装する" },
      { label: "B", text: "サービス間通信のトラフィック管理、セキュリティ、監視をインフラ層で提供する" },
      { label: "C", text: "データベースのレプリケーションを管理する" },
      { label: "D", text: "フロントエンドのUIを提供する" },
    ],
    correctLabel: "B",
    explanation:
      "サービスメッシュはサイドカープロキシ（Envoy等）を各サービスに配置し、サービス間通信の制御をアプリケーションコードから分離します。トラフィック制御（カナリアリリース等）、mTLSによる通信の暗号化、分散トレーシング、リトライ・サーキットブレーカーなどをインフラ層で提供します。",
    level: "infrastructure",
    chapter: "infrastructure",
  },
  {
    id: "infrastructure-q05",
    question: "マイクロサービスにおける「外部設定（Externalized Configuration）」の利点はどれですか？",
    choices: [
      { label: "A", text: "コンパイル時間が短縮される" },
      { label: "B", text: "環境ごとの設定をコードから分離し、再ビルドなしで設定を変更できる" },
      { label: "C", text: "セキュリティが自動的に強化される" },
      { label: "D", text: "データベースのパフォーマンスが向上する" },
    ],
    correctLabel: "B",
    explanation:
      "外部設定パターンは、環境依存の設定値（DB接続先、APIキー等）をコードから分離し、環境変数や設定サーバー（Spring Cloud Config、Consul等）で管理します。同じビルド成果物を開発・ステージング・本番環境で使い回せるため、12-Factor Appの原則にも合致します。",
    level: "infrastructure",
    chapter: "infrastructure",
  },
];
