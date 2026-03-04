export interface AwsSection {
  title: string;
  content: string;
  code?: string;
}

export interface AwsChapter {
  id: string;
  title: string;
  description: string;
  category: string;
  sections: AwsSection[];
}

export interface AwsCategory {
  id: string;
  name: string;
  color: string;
}

export const awsCategories: AwsCategory[] = [
  { id: "compute", name: "コンピューティング", color: "#2196F3" },
  { id: "storage", name: "ストレージ", color: "#4CAF50" },
  { id: "database", name: "データベース", color: "#9C27B0" },
  { id: "networking", name: "ネットワーキング", color: "#FF9800" },
  { id: "security", name: "セキュリティ", color: "#F44336" },
  { id: "containers", name: "コンテナ・サーバーレス", color: "#00BCD4" },
  { id: "devops", name: "DevOps・IaC", color: "#795548" },
  { id: "monitoring", name: "監視・運用", color: "#607D8B" },
  { id: "ai-ml", name: "AI・機械学習", color: "#E91E63" },
  { id: "architecture", name: "設計・アーキテクチャ", color: "#3F51B5" },
];

export const awsChapters: AwsChapter[] = [
  // ── コンピューティング ──
  {
    id: "ec2",
    title: "Amazon EC2",
    description: "仮想サーバーの基本からAuto Scaling、EBS連携まで",
    category: "compute",
    sections: [
      {
        title: "EC2の基本概念",
        content:
          "Amazon EC2（Elastic Compute Cloud）はAWSのコア・コンピューティングサービスです。インスタンスタイプは用途別にファミリーが分かれており、汎用（t3, m6i）、コンピューティング最適化（c6i）、メモリ最適化（r6i）、ストレージ最適化（i3）などがあります。AMI（Amazon Machine Image）はインスタンスの起動に使うテンプレートで、OS・ソフトウェアの構成を含みます。",
        code: `# EC2インスタンスの起動（AWS CLI）
aws ec2 run-instances \\
  --image-id ami-0abcdef1234567890 \\
  --instance-type t3.micro \\
  --key-name my-key-pair \\
  --security-group-ids sg-0123456789abcdef0 \\
  --subnet-id subnet-0123456789abcdef0 \\
  --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=MyServer}]'

# インスタンス一覧の確認
aws ec2 describe-instances \\
  --filters "Name=instance-state-name,Values=running" \\
  --query 'Reservations[].Instances[].[InstanceId,InstanceType,PublicIpAddress]' \\
  --output table`,
      },
      {
        title: "セキュリティグループとキーペア",
        content:
          "セキュリティグループはインスタンスへのトラフィックを制御する仮想ファイアウォールです。インバウンド（受信）とアウトバウンド（送信）ルールを設定できます。デフォルトではすべてのインバウンドトラフィックが拒否され、すべてのアウトバウンドが許可されます。キーペアはSSH接続に使用する公開鍵・秘密鍵のペアです。",
        code: `# セキュリティグループの作成
aws ec2 create-security-group \\
  --group-name web-server-sg \\
  --description "Web server security group" \\
  --vpc-id vpc-0123456789abcdef0

# SSH（22番ポート）を許可
aws ec2 authorize-security-group-ingress \\
  --group-id sg-0123456789abcdef0 \\
  --protocol tcp --port 22 \\
  --cidr 203.0.113.0/24

# HTTP（80番ポート）を許可
aws ec2 authorize-security-group-ingress \\
  --group-id sg-0123456789abcdef0 \\
  --protocol tcp --port 80 \\
  --cidr 0.0.0.0/0`,
      },
      {
        title: "Auto ScalingとEBS",
        content:
          "Auto Scalingは需要に応じてEC2インスタンスの数を自動調整します。起動テンプレートで構成を定義し、Auto Scalingグループで最小・最大・希望容量を設定します。EBS（Elastic Block Store）はEC2にアタッチするブロックストレージで、gp3（汎用SSD）、io2（プロビジョンドIOPS）、st1（スループット最適化HDD）などのタイプがあります。スナップショットによるバックアップも可能です。",
        code: `# 起動テンプレートの作成
aws ec2 create-launch-template \\
  --launch-template-name web-template \\
  --launch-template-data '{
    "ImageId": "ami-0abcdef1234567890",
    "InstanceType": "t3.micro",
    "SecurityGroupIds": ["sg-0123456789abcdef0"]
  }'

# Auto Scalingグループの作成
aws autoscaling create-auto-scaling-group \\
  --auto-scaling-group-name web-asg \\
  --launch-template LaunchTemplateName=web-template,Version='$Latest' \\
  --min-size 2 --max-size 10 --desired-capacity 2 \\
  --vpc-zone-identifier "subnet-abc123,subnet-def456"`,
      },
    ],
  },
  {
    id: "lambda",
    title: "AWS Lambda",
    description: "サーバーレス関数の作成からトリガー設定、最適化まで",
    category: "compute",
    sections: [
      {
        title: "Lambda関数の基本",
        content:
          "AWS Lambdaはサーバーレスコンピューティングサービスで、コードをアップロードするだけで実行できます。サーバーのプロビジョニングや管理は不要です。対応言語はPython、Node.js、Java、Go、.NET、Rubyなど。実行時間は最大15分、メモリは128MB〜10GBまで設定可能です。料金はリクエスト数と実行時間に基づきます。",
        code: `// Lambda関数の例（Node.js）
export const handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));

  const name = event.queryStringParameters?.name || 'World';

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: \`Hello, \${name}!\`,
      timestamp: new Date().toISOString(),
    }),
  };
};`,
      },
      {
        title: "トリガーとイベントソース",
        content:
          "Lambda関数はさまざまなAWSサービスからトリガーできます。API GatewayでHTTPリクエスト、S3でオブジェクトの作成/削除、DynamoDB Streamsでテーブル変更、SQSでメッセージ受信、EventBridgeでスケジュール実行など。イベントソースマッピングにより、ポーリングベースのトリガー（SQS、Kinesis、DynamoDB）も設定できます。",
        code: `# Lambda関数の作成（AWS CLI）
aws lambda create-function \\
  --function-name my-function \\
  --runtime nodejs20.x \\
  --handler index.handler \\
  --role arn:aws:iam::123456789012:role/lambda-role \\
  --zip-file fileb://function.zip

# S3トリガーの追加
aws lambda add-permission \\
  --function-name my-function \\
  --statement-id s3-trigger \\
  --action lambda:InvokeFunction \\
  --principal s3.amazonaws.com \\
  --source-arn arn:aws:s3:::my-bucket

# スケジュール実行（EventBridge）
aws events put-rule \\
  --name "every-5-minutes" \\
  --schedule-expression "rate(5 minutes)"`,
      },
      {
        title: "レイヤーと最適化",
        content:
          "Lambdaレイヤーは共通ライブラリやカスタムランタイムを複数の関数で共有する仕組みです。コールドスタート（初回起動の遅延）を軽減するには、Provisioned Concurrencyの設定、関数のメモリ増加、パッケージサイズの最小化が有効です。環境変数で設定値を外部化し、AWS Systems Managerのパラメータストアと連携することも推奨されます。",
        code: `# レイヤーの作成
aws lambda publish-layer-version \\
  --layer-name my-utils \\
  --zip-file fileb://layer.zip \\
  --compatible-runtimes nodejs20.x

# Provisioned Concurrencyの設定
aws lambda put-provisioned-concurrency-config \\
  --function-name my-function \\
  --qualifier prod \\
  --provisioned-concurrent-executions 10

# 環境変数の設定
aws lambda update-function-configuration \\
  --function-name my-function \\
  --environment Variables='{
    DB_HOST=mydb.cluster-xyz.ap-northeast-1.rds.amazonaws.com,
    STAGE=production
  }'`,
      },
    ],
  },

  // ── ストレージ ──
  {
    id: "s3",
    title: "Amazon S3",
    description: "オブジェクトストレージの基本からアクセス制御、ライフサイクルまで",
    category: "storage",
    sections: [
      {
        title: "バケットとオブジェクト操作",
        content:
          "Amazon S3（Simple Storage Service）はスケーラブルなオブジェクトストレージです。データはバケット内にオブジェクトとして格納されます。バケット名はグローバルに一意で、リージョンに作成されます。オブジェクトのサイズは最大5TBで、キー（パス）によりアクセスします。バージョニングを有効にすると、オブジェクトの全バージョンを保持できます。",
        code: `# バケットの作成
aws s3 mb s3://my-unique-bucket-name --region ap-northeast-1

# ファイルのアップロード
aws s3 cp ./local-file.txt s3://my-bucket/path/file.txt

# ディレクトリの同期
aws s3 sync ./local-dir s3://my-bucket/prefix/ --delete

# バージョニングの有効化
aws s3api put-bucket-versioning \\
  --bucket my-bucket \\
  --versioning-configuration Status=Enabled

# オブジェクト一覧
aws s3 ls s3://my-bucket/prefix/ --recursive`,
      },
      {
        title: "アクセス制御とポリシー",
        content:
          "S3のアクセス制御にはバケットポリシー、IAMポリシー、ACL、S3アクセスポイントがあります。パブリックアクセスブロック設定でバケット全体の公開を制御できます。署名付きURL（Presigned URL）を使えば、一時的なアクセス権を付与できます。S3 Object Lockでオブジェクトの変更・削除を防止するWORM（Write Once Read Many）保護も可能です。",
        code: `// バケットポリシーの例（読み取り専用公開）
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "PublicReadGetObject",
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::my-bucket/*",
    "Condition": {
      "StringEquals": {
        "aws:SourceVpc": "vpc-0123456789abcdef0"
      }
    }
  }]
}

// 署名付きURLの生成（AWS SDK for JavaScript）
// const command = new GetObjectCommand({ Bucket: 'my-bucket', Key: 'file.txt' });
// const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });`,
      },
      {
        title: "ストレージクラスとライフサイクル",
        content:
          "S3には複数のストレージクラスがあります。Standard（頻繁アクセス）、Intelligent-Tiering（自動階層化）、Standard-IA（低頻度アクセス）、One Zone-IA、Glacier Instant Retrieval、Glacier Flexible Retrieval、Glacier Deep Archive（最低コスト）。ライフサイクルルールで自動的にストレージクラスを移行したり、オブジェクトを削除できます。",
        code: `# ライフサイクルルールの設定
aws s3api put-bucket-lifecycle-configuration \\
  --bucket my-bucket \\
  --lifecycle-configuration '{
    "Rules": [{
      "ID": "ArchiveRule",
      "Status": "Enabled",
      "Filter": { "Prefix": "logs/" },
      "Transitions": [
        { "Days": 30, "StorageClass": "STANDARD_IA" },
        { "Days": 90, "StorageClass": "GLACIER" },
        { "Days": 365, "StorageClass": "DEEP_ARCHIVE" }
      ],
      "Expiration": { "Days": 730 }
    }]
  }'`,
      },
    ],
  },
  {
    id: "storage-services",
    title: "EBS・EFS・その他ストレージ",
    description: "ブロックストレージ、ファイルシステム、アーカイブストレージ",
    category: "storage",
    sections: [
      {
        title: "Amazon EBS",
        content:
          "EBS（Elastic Block Store）はEC2インスタンスにアタッチするブロックストレージです。gp3（汎用SSD、3000 IOPS基本）、io2（高パフォーマンス、最大64000 IOPS）、st1（スループット最適化HDD）、sc1（コールドHDD）のタイプがあります。スナップショットはS3に増分バックアップとして保存され、リージョン間コピーも可能です。",
        code: `# EBSボリュームの作成
aws ec2 create-volume \\
  --volume-type gp3 \\
  --size 100 \\
  --iops 3000 \\
  --throughput 125 \\
  --availability-zone ap-northeast-1a

# スナップショットの作成
aws ec2 create-snapshot \\
  --volume-id vol-0123456789abcdef0 \\
  --description "Daily backup"

# ボリュームのアタッチ
aws ec2 attach-volume \\
  --volume-id vol-0123456789abcdef0 \\
  --instance-id i-0123456789abcdef0 \\
  --device /dev/sdf`,
      },
      {
        title: "Amazon EFS",
        content:
          "EFS（Elastic File System）は複数のEC2インスタンスから同時にマウントできるマネージドNFSファイルシステムです。自動でスケールし、ペタバイト規模まで対応します。Standard（頻繁アクセス）とInfrequent Access（低頻度）のストレージクラスがあり、ライフサイクルポリシーで自動移行可能です。Lambda関数からのアクセスもサポートしています。",
        code: `# EFSファイルシステムの作成
aws efs create-file-system \\
  --performance-mode generalPurpose \\
  --throughput-mode bursting \\
  --encrypted \\
  --tags Key=Name,Value=shared-data

# マウントターゲットの作成
aws efs create-mount-target \\
  --file-system-id fs-0123456789abcdef0 \\
  --subnet-id subnet-0123456789abcdef0 \\
  --security-groups sg-0123456789abcdef0

# EC2からのマウント
# sudo mount -t efs fs-0123456789abcdef0:/ /mnt/efs`,
      },
      {
        title: "FSx・Snow Family・Transfer Family",
        content:
          "Amazon FSxはフルマネージドファイルシステムで、Windows File Server、Lustre、NetApp ONTAP、OpenZFS向けがあります。AWS Snow FamilyはSnowcone、Snowball Edge、Snowmobileなど、大量データの物理的な移行に使います。AWS Transfer Familyは SFTP/FTPS/FTPプロトコルでS3・EFSへのファイル転送を提供します。DataSyncはオンプレミスとAWS間のデータ転送を自動化します。",
        code: `# FSx for Windows File Serverの作成
aws fsx create-file-system \\
  --file-system-type WINDOWS \\
  --storage-capacity 300 \\
  --subnet-ids subnet-abc123 \\
  --windows-configuration '{
    "ThroughputCapacity": 16,
    "ActiveDirectoryId": "d-0123456789"
  }'

# DataSyncタスクの作成
aws datasync create-task \\
  --source-location-arn arn:aws:datasync:...:location/loc-src \\
  --destination-location-arn arn:aws:datasync:...:location/loc-dst \\
  --options '{
    "VerifyMode": "POINT_IN_TIME_CONSISTENT",
    "TransferMode": "CHANGED"
  }'`,
      },
    ],
  },

  // ── データベース ──
  {
    id: "rds-aurora",
    title: "Amazon RDS・Aurora",
    description: "リレーショナルデータベースの構築・運用・高可用性",
    category: "database",
    sections: [
      {
        title: "RDSの基本",
        content:
          "Amazon RDS（Relational Database Service）はマネージドRDBMSです。MySQL、PostgreSQL、MariaDB、Oracle、SQL Serverに対応しています。自動バックアップ、パッチ適用、スケーリングが管理されます。マルチAZ配置でスタンバイを別AZに配置し、自動フェイルオーバーで高可用性を実現します。リードレプリカで読み取りをスケールアウトできます。",
        code: `# RDSインスタンスの作成
aws rds create-db-instance \\
  --db-instance-identifier mydb \\
  --db-instance-class db.t3.medium \\
  --engine postgres \\
  --engine-version 15.4 \\
  --master-username admin \\
  --master-user-password MyPassword123 \\
  --allocated-storage 100 \\
  --multi-az \\
  --storage-encrypted

# リードレプリカの作成
aws rds create-db-instance-read-replica \\
  --db-instance-identifier mydb-read \\
  --source-db-instance-identifier mydb \\
  --db-instance-class db.t3.medium`,
      },
      {
        title: "Amazon Aurora",
        content:
          "AuroraはAWS独自のクラウドネイティブRDBMSで、MySQL互換とPostgreSQL互換があります。ストレージは自動で最大128TBまで拡張し、3つのAZに6つのコピーを保持します。標準のRDSより最大5倍（MySQL）・3倍（PostgreSQL）高速です。Aurora Serverless v2ではACU（Aurora Capacity Unit）に基づく自動スケーリングが可能で、使った分だけ課金されます。",
        code: `# Auroraクラスターの作成
aws rds create-db-cluster \\
  --db-cluster-identifier my-aurora \\
  --engine aurora-postgresql \\
  --engine-version 15.4 \\
  --master-username admin \\
  --master-user-password MyPassword123 \\
  --serverless-v2-scaling-configuration MinCapacity=0.5,MaxCapacity=16

# Auroraインスタンスの追加
aws rds create-db-instance \\
  --db-instance-identifier my-aurora-instance-1 \\
  --db-cluster-identifier my-aurora \\
  --db-instance-class db.serverless \\
  --engine aurora-postgresql`,
      },
      {
        title: "バックアップ・監視・Proxy",
        content:
          "RDSの自動バックアップはポイントインタイムリカバリ（PITR）をサポートし、最大35日間の任意の時点に復元できます。Performance Insightsでデータベースの負荷を可視化し、ボトルネックを特定できます。RDS ProxyはLambdaなどからの接続を効率的にプーリングし、フェイルオーバー時間を短縮します。IAM認証によるセキュアな接続もサポートしています。",
        code: `# RDS Proxyの作成
aws rds create-db-proxy \\
  --db-proxy-name my-proxy \\
  --engine-family POSTGRESQL \\
  --auth '[{
    "AuthScheme": "SECRETS",
    "SecretArn": "arn:aws:secretsmanager:...:secret:mydb",
    "IAMAuth": "REQUIRED"
  }]' \\
  --role-arn arn:aws:iam::123456789012:role/rds-proxy-role \\
  --vpc-subnet-ids subnet-abc123 subnet-def456

# Performance Insightsの有効化
aws rds modify-db-instance \\
  --db-instance-identifier mydb \\
  --enable-performance-insights \\
  --performance-insights-retention-period 731`,
      },
    ],
  },
  {
    id: "dynamodb",
    title: "Amazon DynamoDB",
    description: "NoSQLデータベースの設計・インデックス・ストリーム",
    category: "database",
    sections: [
      {
        title: "テーブル設計とデータモデル",
        content:
          "DynamoDBは完全マネージド型NoSQLデータベースで、ミリ秒単位のレイテンシーを提供します。パーティションキー（ハッシュキー）とオプションのソートキー（レンジキー）でプライマリキーを構成します。アクセスパターンに基づいたテーブル設計が重要で、1テーブルで複数のエンティティを扱うシングルテーブルデザインが推奨されます。",
        code: `# テーブルの作成
aws dynamodb create-table \\
  --table-name Users \\
  --attribute-definitions \\
    AttributeName=PK,AttributeType=S \\
    AttributeName=SK,AttributeType=S \\
  --key-schema \\
    AttributeName=PK,KeyType=HASH \\
    AttributeName=SK,KeyType=RANGE \\
  --billing-mode PAY_PER_REQUEST

# アイテムの追加
aws dynamodb put-item \\
  --table-name Users \\
  --item '{
    "PK": {"S": "USER#001"},
    "SK": {"S": "PROFILE"},
    "name": {"S": "田中太郎"},
    "email": {"S": "tanaka@example.com"}
  }'`,
      },
      {
        title: "GSI・LSI・クエリ",
        content:
          "GSI（グローバルセカンダリインデックス）はテーブルと異なるパーティションキーでクエリできるインデックスです。テーブル作成後でも追加可能です。LSI（ローカルセカンダリインデックス）は同じパーティションキーで異なるソートキーを使え、テーブル作成時のみ定義できます。Query操作はキー条件でアイテムを取得し、Scan操作はテーブル全体を走査します。",
        code: `# GSIの追加
aws dynamodb update-table \\
  --table-name Users \\
  --attribute-definitions AttributeName=email,AttributeType=S \\
  --global-secondary-index-updates '[{
    "Create": {
      "IndexName": "email-index",
      "KeySchema": [{"AttributeName":"email","KeyType":"HASH"}],
      "Projection": {"ProjectionType":"ALL"}
    }
  }]'

# クエリの実行
aws dynamodb query \\
  --table-name Users \\
  --key-condition-expression "PK = :pk AND begins_with(SK, :sk)" \\
  --expression-attribute-values '{
    ":pk": {"S": "USER#001"},
    ":sk": {"S": "ORDER#"}
  }'`,
      },
      {
        title: "ストリーム・DAX・トランザクション",
        content:
          "DynamoDB Streamsはテーブルへの変更をリアルタイムにキャプチャし、Lambda関数でCDC（Change Data Capture）パターンを実装できます。DAX（DynamoDB Accelerator）はインメモリキャッシュで、読み取りレイテンシーをマイクロ秒レベルに短縮します。TransactWriteItems / TransactGetItemsでACIDトランザクションも実行可能です。",
        code: `# DynamoDB Streamsの有効化
aws dynamodb update-table \\
  --table-name Users \\
  --stream-specification StreamEnabled=true,StreamViewType=NEW_AND_OLD_IMAGES

# トランザクション書き込み
aws dynamodb transact-write-items \\
  --transact-items '[
    {
      "Put": {
        "TableName": "Users",
        "Item": {"PK":{"S":"ORDER#100"},"SK":{"S":"INFO"},"total":{"N":"5000"}}
      }
    },
    {
      "Update": {
        "TableName": "Users",
        "Key": {"PK":{"S":"USER#001"},"SK":{"S":"PROFILE"}},
        "UpdateExpression": "SET orderCount = orderCount + :inc",
        "ExpressionAttributeValues": {":inc":{"N":"1"}}
      }
    }
  ]'`,
      },
    ],
  },

  // ── ネットワーキング ──
  {
    id: "vpc",
    title: "Amazon VPC",
    description: "仮想ネットワークの設計・サブネット・ゲートウェイ",
    category: "networking",
    sections: [
      {
        title: "VPCとサブネット設計",
        content:
          "VPC（Virtual Private Cloud）はAWS上の論理的に分離されたネットワーク空間です。CIDRブロック（例: 10.0.0.0/16）を指定して作成します。サブネットはVPC内のIPアドレス範囲で、パブリックサブネット（インターネットゲートウェイへのルート有）とプライベートサブネット（NAT経由のみ）に分けるのが一般的です。マルチAZ構成で可用性を確保します。",
        code: `# VPCの作成
aws ec2 create-vpc --cidr-block 10.0.0.0/16 \\
  --tag-specifications 'ResourceType=vpc,Tags=[{Key=Name,Value=production-vpc}]'

# パブリックサブネット（AZ-a）
aws ec2 create-subnet --vpc-id vpc-xxx \\
  --cidr-block 10.0.1.0/24 --availability-zone ap-northeast-1a \\
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=public-1a}]'

# プライベートサブネット（AZ-a）
aws ec2 create-subnet --vpc-id vpc-xxx \\
  --cidr-block 10.0.10.0/24 --availability-zone ap-northeast-1a \\
  --tag-specifications 'ResourceType=subnet,Tags=[{Key=Name,Value=private-1a}]'`,
      },
      {
        title: "ゲートウェイとルーティング",
        content:
          "インターネットゲートウェイ（IGW）はVPCとインターネットを接続します。NATゲートウェイはプライベートサブネットからのアウトバウンド通信を可能にします。ルートテーブルでトラフィックの経路を制御し、各サブネットに関連付けます。Transit Gatewayを使えば、複数のVPCやオンプレミスネットワークをハブ&スポーク型で接続できます。",
        code: `# インターネットゲートウェイの作成とアタッチ
aws ec2 create-internet-gateway
aws ec2 attach-internet-gateway \\
  --internet-gateway-id igw-xxx --vpc-id vpc-xxx

# NATゲートウェイの作成
aws ec2 allocate-address --domain vpc
aws ec2 create-nat-gateway \\
  --subnet-id subnet-public-1a \\
  --allocation-id eipalloc-xxx

# パブリックサブネットのルートテーブル
aws ec2 create-route \\
  --route-table-id rtb-public \\
  --destination-cidr-block 0.0.0.0/0 \\
  --gateway-id igw-xxx

# プライベートサブネットのルートテーブル
aws ec2 create-route \\
  --route-table-id rtb-private \\
  --destination-cidr-block 0.0.0.0/0 \\
  --nat-gateway-id nat-xxx`,
      },
      {
        title: "VPCエンドポイントとピアリング",
        content:
          "VPCエンドポイントを使うとAWSサービスへのアクセスをインターネットを経由せずVPC内部で完結できます。ゲートウェイエンドポイント（S3、DynamoDB向け）とインターフェイスエンドポイント（PrivateLink、他の多くのサービス向け）があります。VPCピアリングは2つのVPC間のプライベート接続で、Transit Gatewayを使えば大規模なネットワーク接続も管理できます。",
        code: `# S3用ゲートウェイエンドポイント
aws ec2 create-vpc-endpoint \\
  --vpc-id vpc-xxx \\
  --service-name com.amazonaws.ap-northeast-1.s3 \\
  --route-table-ids rtb-private

# インターフェイスエンドポイント（SSM用）
aws ec2 create-vpc-endpoint \\
  --vpc-id vpc-xxx \\
  --vpc-endpoint-type Interface \\
  --service-name com.amazonaws.ap-northeast-1.ssm \\
  --subnet-ids subnet-private-1a \\
  --security-group-ids sg-endpoint

# VPCピアリング
aws ec2 create-vpc-peering-connection \\
  --vpc-id vpc-requester \\
  --peer-vpc-id vpc-accepter \\
  --peer-region ap-northeast-1`,
      },
    ],
  },
  {
    id: "dns-cdn-lb",
    title: "Route 53・CloudFront・ELB",
    description: "DNS・CDN・ロードバランサーの設定と連携",
    category: "networking",
    sections: [
      {
        title: "Amazon Route 53",
        content:
          "Route 53はスケーラブルなDNSサービスです。ドメイン登録、DNSルーティング、ヘルスチェックの3機能を提供します。ルーティングポリシーにはシンプル、加重、レイテンシーベース、フェイルオーバー、地理的近接性、マルチバリューがあります。エイリアスレコードはAWSリソース（ELB、CloudFront、S3）に直接マッピングでき、Zone Apexでも使用可能です。",
        code: `# ホストゾーンの作成
aws route53 create-hosted-zone \\
  --name example.com \\
  --caller-reference $(date +%s)

# ALBへのエイリアスレコード
aws route53 change-resource-record-sets \\
  --hosted-zone-id Z0123456789 \\
  --change-batch '{
    "Changes": [{
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "app.example.com",
        "Type": "A",
        "AliasTarget": {
          "HostedZoneId": "Z35SXDOTRQ7X7K",
          "DNSName": "my-alb-123.ap-northeast-1.elb.amazonaws.com",
          "EvaluateTargetHealth": true
        }
      }
    }]
  }'`,
      },
      {
        title: "Amazon CloudFront",
        content:
          "CloudFrontはグローバルCDN（Content Delivery Network）で、世界中のエッジロケーションからコンテンツを配信します。S3、ALB、EC2、カスタムオリジンに対応しています。キャッシュポリシーでTTLやキャッシュキーを制御し、Lambda@EdgeやCloudFront Functionsでエッジでの処理をカスタマイズできます。OAC（Origin Access Control）でS3への直接アクセスを制限できます。",
        code: `# CloudFrontディストリビューションの作成（S3オリジン）
aws cloudfront create-distribution \\
  --distribution-config '{
    "CallerReference": "my-dist-001",
    "Origins": {
      "Quantity": 1,
      "Items": [{
        "Id": "S3Origin",
        "DomainName": "my-bucket.s3.ap-northeast-1.amazonaws.com",
        "S3OriginConfig": { "OriginAccessIdentity": "" },
        "OriginAccessControlId": "EXXXXX"
      }]
    },
    "DefaultCacheBehavior": {
      "TargetOriginId": "S3Origin",
      "ViewerProtocolPolicy": "redirect-to-https",
      "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
      "Compress": true
    },
    "Enabled": true
  }'`,
      },
      {
        title: "Elastic Load Balancing",
        content:
          "ELBはトラフィックを複数のターゲットに分散します。ALB（Application Load Balancer）はHTTP/HTTPSのレイヤー7で、パスベース・ホストベースルーティングが可能。NLB（Network Load Balancer）はTCP/UDPのレイヤー4で超低レイテンシー。GWLB（Gateway Load Balancer）はサードパーティアプライアンスの展開に使います。ターゲットグループとヘルスチェックで正常なインスタンスにのみ振り分けます。",
        code: `# ALBの作成
aws elbv2 create-load-balancer \\
  --name my-alb \\
  --type application \\
  --subnets subnet-public-1a subnet-public-1c \\
  --security-groups sg-alb

# ターゲットグループ
aws elbv2 create-target-group \\
  --name web-targets \\
  --protocol HTTP --port 80 \\
  --vpc-id vpc-xxx \\
  --health-check-path /health \\
  --target-type instance

# リスナー（HTTPS）
aws elbv2 create-listener \\
  --load-balancer-arn arn:aws:...alb/my-alb/xxx \\
  --protocol HTTPS --port 443 \\
  --certificates CertificateArn=arn:aws:acm:...:certificate/xxx \\
  --default-actions Type=forward,TargetGroupArn=arn:aws:...targetgroup/web-targets/xxx`,
      },
    ],
  },

  // ── セキュリティ ──
  {
    id: "iam",
    title: "AWS IAM",
    description: "ユーザー・ロール・ポリシーによるアクセス管理",
    category: "security",
    sections: [
      {
        title: "ユーザー・グループ・ロール",
        content:
          "IAM（Identity and Access Management）はAWSリソースへのアクセスを安全に管理します。IAMユーザーは個人のAWSアカウント、IAMグループは複数ユーザーへの一括権限付与、IAMロールはEC2やLambdaなどのAWSサービスに権限を付与する仕組みです。ルートユーザーは使わず、MFA（多要素認証）を必ず有効にすることが推奨されます。",
        code: `# IAMユーザーの作成
aws iam create-user --user-name developer

# IAMグループにユーザーを追加
aws iam create-group --group-name developers
aws iam add-user-to-group --user-name developer --group-name developers

# IAMロールの作成（EC2用）
aws iam create-role --role-name EC2-S3-Role \\
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": {"Service": "ec2.amazonaws.com"},
      "Action": "sts:AssumeRole"
    }]
  }'

# MFAの有効化
aws iam enable-mfa-device --user-name developer \\
  --serial-number arn:aws:iam::123456789012:mfa/developer \\
  --authentication-code1 123456 --authentication-code2 789012`,
      },
      {
        title: "IAMポリシーの設計",
        content:
          "IAMポリシーはJSON形式でアクセス権限を定義します。AWS管理ポリシー（AWS定義済み）、カスタマー管理ポリシー（ユーザー定義）、インラインポリシー（直接埋め込み）があります。最小権限の原則に従い、必要な権限のみ付与します。条件キー（Condition）でIP制限、MFA要求、タグベースのアクセス制御が可能です。",
        code: `// 最小権限のポリシー例
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:PutObject"
      ],
      "Resource": "arn:aws:s3:::my-bucket/projects/*",
      "Condition": {
        "StringEquals": {
          "aws:RequestedRegion": "ap-northeast-1"
        },
        "Bool": {
          "aws:MultiFactorAuthPresent": "true"
        }
      }
    },
    {
      "Effect": "Deny",
      "Action": "s3:DeleteObject",
      "Resource": "*"
    }
  ]
}`,
      },
      {
        title: "STS・Organizations・SSO",
        content:
          "STS（Security Token Service）は一時的な認証情報を発行します。AssumeRoleでクロスアカウントアクセスや権限の切り替えが可能です。AWS Organizationsは複数AWSアカウントの一元管理で、SCP（サービスコントロールポリシー）で組織全体の権限境界を設定します。IAM Identity Center（旧SSO）はSAML/OIDCでシングルサインオンを実現します。",
        code: `# AssumeRoleで一時認証情報を取得
aws sts assume-role \\
  --role-arn arn:aws:iam::987654321098:role/CrossAccountRole \\
  --role-session-name my-session \\
  --duration-seconds 3600

# Organizationsでアカウント作成
aws organizations create-account \\
  --email dev@example.com \\
  --account-name "Development"

# SCPの例（特定リージョンのみ許可）
# {
#   "Version": "2012-10-17",
#   "Statement": [{
#     "Effect": "Deny",
#     "Action": "*",
#     "Resource": "*",
#     "Condition": {
#       "StringNotEquals": {
#         "aws:RequestedRegion": ["ap-northeast-1", "us-east-1"]
#       }
#     }
#   }]
# }`,
      },
    ],
  },
  {
    id: "security-services",
    title: "セキュリティサービス群",
    description: "KMS・WAF・Shield・GuardDuty・Security Hub",
    category: "security",
    sections: [
      {
        title: "AWS KMS・Secrets Manager",
        content:
          "KMS（Key Management Service）は暗号化キーの作成・管理・ローテーションを行います。CMK（カスタマーマスターキー）でS3、EBS、RDS、Lambda環境変数などを暗号化します。AWS Secrets ManagerはデータベースパスワードやAPIキーなどのシークレットを安全に保管し、自動ローテーション機能も提供します。Parameter StoreはSSMの一部で、設定値の管理に使います。",
        code: `# KMSキーの作成
aws kms create-key \\
  --description "Application encryption key" \\
  --key-usage ENCRYPT_DECRYPT

# キーエイリアスの作成
aws kms create-alias \\
  --alias-name alias/app-key \\
  --target-key-id xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Secrets Managerにシークレットを保存
aws secretsmanager create-secret \\
  --name prod/db/password \\
  --secret-string '{"username":"admin","password":"MySecretPass123"}'

# Parameter Storeに値を保存
aws ssm put-parameter \\
  --name "/app/config/api-url" \\
  --value "https://api.example.com" \\
  --type SecureString --key-id alias/app-key`,
      },
      {
        title: "WAF・Shield・Firewall Manager",
        content:
          "AWS WAF（Web Application Firewall）はSQLインジェクション、XSS、DDoSなどのWeb攻撃から保護します。CloudFront、ALB、API Gatewayに適用できます。マネージドルールグループ（AWSやサードパーティ提供）も利用可能です。AWS ShieldはDDoS攻撃対策で、StandardはすべてのAWSアカウントで無料有効、Advancedは高度な保護とコスト保護を提供します。",
        code: `# WAF Web ACLの作成
aws wafv2 create-web-acl \\
  --name my-web-acl \\
  --scope REGIONAL \\
  --default-action Allow={} \\
  --rules '[{
    "Name": "AWS-AWSManagedRulesCommonRuleSet",
    "Priority": 1,
    "Statement": {
      "ManagedRuleGroupStatement": {
        "VendorName": "AWS",
        "Name": "AWSManagedRulesCommonRuleSet"
      }
    },
    "OverrideAction": {"None": {}},
    "VisibilityConfig": {
      "SampledRequestsEnabled": true,
      "CloudWatchMetricsEnabled": true,
      "MetricName": "CommonRules"
    }
  }]' \\
  --visibility-config SampledRequestsEnabled=true,CloudWatchMetricsEnabled=true,MetricName=MyWebACL`,
      },
      {
        title: "GuardDuty・Security Hub・Inspector",
        content:
          "Amazon GuardDutyは機械学習を使って脅威を自動検知します。VPCフローログ、CloudTrail、DNSクエリを分析し、不正アクセスやマルウェアを検出します。AWS Security Hubは複数のセキュリティサービスの検出結果を一元管理し、AWSセキュリティベストプラクティスへの準拠状況を評価します。Amazon Inspectorは自動的にEC2やECRイメージの脆弱性をスキャンします。",
        code: `# GuardDutyの有効化
aws guardduty create-detector --enable

# Security Hubの有効化
aws securityhub enable-security-hub \\
  --enable-default-standards

# Inspectorの有効化
aws inspector2 enable \\
  --resource-types EC2 ECR LAMBDA

# 検出結果の取得
aws guardduty list-findings \\
  --detector-id xxxxxxxxxxxxxxxxxxxx \\
  --finding-criteria '{
    "Criterion": {
      "severity": {"Gte": 7}
    }
  }'`,
      },
    ],
  },

  // ── コンテナ・サーバーレス ──
  {
    id: "ecs-fargate",
    title: "Amazon ECS・Fargate",
    description: "コンテナオーケストレーションとサーバーレスコンテナ",
    category: "containers",
    sections: [
      {
        title: "ECSの基本概念",
        content:
          "Amazon ECS（Elastic Container Service）はフルマネージドのコンテナオーケストレーションサービスです。タスク定義でコンテナの設定（イメージ、CPU、メモリ、ポート）を定義し、サービスでタスクの起動数やロードバランサー連携を管理します。起動タイプはEC2（自分でインスタンス管理）とFargate（サーバーレス）から選べます。",
        code: `// タスク定義（JSON）
{
  "family": "web-app",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "executionRoleArn": "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
  "containerDefinitions": [{
    "name": "web",
    "image": "123456789012.dkr.ecr.ap-northeast-1.amazonaws.com/my-app:latest",
    "portMappings": [{"containerPort": 3000, "protocol": "tcp"}],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "/ecs/web-app",
        "awslogs-region": "ap-northeast-1",
        "awslogs-stream-prefix": "web"
      }
    }
  }]
}`,
      },
      {
        title: "Fargateサービスの構築",
        content:
          "Fargateはコンテナ実行のためのサーバーレスコンピューティングエンジンで、EC2インスタンスの管理が不要です。サービスを作成するとタスクの起動・維持を自動で行い、ALBと連携してトラフィックを分散します。Service Connectでサービス間通信をシンプルに設定でき、Application Auto Scalingでタスク数を自動スケールします。",
        code: `# ECSクラスターの作成
aws ecs create-cluster --cluster-name production

# Fargateサービスの作成
aws ecs create-service \\
  --cluster production \\
  --service-name web-service \\
  --task-definition web-app:1 \\
  --desired-count 2 \\
  --launch-type FARGATE \\
  --network-configuration '{
    "awsvpcConfiguration": {
      "subnets": ["subnet-private-1a", "subnet-private-1c"],
      "securityGroups": ["sg-ecs-tasks"],
      "assignPublicIp": "DISABLED"
    }
  }' \\
  --load-balancers '[{
    "targetGroupArn": "arn:aws:...targetgroup/ecs-targets/xxx",
    "containerName": "web",
    "containerPort": 3000
  }]'`,
      },
      {
        title: "ECR・デプロイ戦略",
        content:
          "Amazon ECR（Elastic Container Registry）はDockerイメージのプライベートレジストリです。イメージスキャン機能で脆弱性を検出できます。ECSのデプロイにはローリングアップデート（段階的に入れ替え）とBlue/Green（CodeDeployによる切り替え）があります。タスク配置戦略（spread、binpack）やキャパシティプロバイダーで効率的なリソース配置を行います。",
        code: `# ECRリポジトリの作成
aws ecr create-repository \\
  --repository-name my-app \\
  --image-scanning-configuration scanOnPush=true

# Dockerイメージのプッシュ
aws ecr get-login-password | docker login \\
  --username AWS \\
  --password-stdin 123456789012.dkr.ecr.ap-northeast-1.amazonaws.com

docker build -t my-app .
docker tag my-app:latest 123456789012.dkr.ecr.ap-northeast-1.amazonaws.com/my-app:latest
docker push 123456789012.dkr.ecr.ap-northeast-1.amazonaws.com/my-app:latest

# サービスの更新（新イメージでデプロイ）
aws ecs update-service \\
  --cluster production \\
  --service web-service \\
  --force-new-deployment`,
      },
    ],
  },
  {
    id: "api-gateway",
    title: "API Gateway・Step Functions",
    description: "APIの構築とサーバーレスワークフロー",
    category: "containers",
    sections: [
      {
        title: "Amazon API Gateway",
        content:
          "API Gatewayは完全マネージドのAPI作成・公開・管理サービスです。REST API（フル機能）、HTTP API（低コスト・高速）、WebSocket APIの3種類があります。Lambda統合、HTTPプロキシ統合、AWSサービス統合をサポートし、ステージ（dev/staging/prod）によるバージョン管理が可能です。使用量プランとAPIキーでスロットリングとクォータを制御します。",
        code: `# HTTP APIの作成（Lambda統合）
aws apigatewayv2 create-api \\
  --name my-api \\
  --protocol-type HTTP \\
  --target arn:aws:lambda:ap-northeast-1:123456789012:function:my-function

# REST APIのリソースとメソッド
aws apigateway create-resource \\
  --rest-api-id abc123 \\
  --parent-id rootId \\
  --path-part users

aws apigateway put-method \\
  --rest-api-id abc123 \\
  --resource-id resId \\
  --http-method GET \\
  --authorization-type COGNITO_USER_POOLS \\
  --authorizer-id authId

# デプロイ
aws apigateway create-deployment \\
  --rest-api-id abc123 \\
  --stage-name prod`,
      },
      {
        title: "認証と保護",
        content:
          "API GatewayはCognito User Pools、Lambda Authorizer、IAM認証の3つの認証方法をサポートします。CORSの設定でクロスオリジンリクエストを制御し、リクエストバリデーションで不正なリクエストを拒否できます。WAFとの統合でWeb攻撃から保護し、使用量プランでAPIキーごとのレートリミットを設定します。",
        code: `# Cognitoオーソライザーの作成
aws apigateway create-authorizer \\
  --rest-api-id abc123 \\
  --name cognito-auth \\
  --type COGNITO_USER_POOLS \\
  --provider-arns arn:aws:cognito-idp:ap-northeast-1:123456789012:userpool/ap-northeast-1_XXXXX \\
  --identity-source method.request.header.Authorization

# 使用量プランの作成
aws apigateway create-usage-plan \\
  --name "Basic" \\
  --throttle burstLimit=100,rateLimit=50 \\
  --quota limit=10000,period=MONTH \\
  --api-stages apiId=abc123,stage=prod`,
      },
      {
        title: "AWS Step Functions",
        content:
          "Step Functionsはサーバーレスワークフローオーケストレーションサービスで、Lambda関数やAWSサービスを組み合わせてビジネスプロセスを構築します。ASL（Amazon States Language）でステートマシンを定義し、逐次実行、並列実行、条件分岐、エラーハンドリング、待機、ループなどを表現できます。Standard（長時間）とExpress（高スループット）の2種類があります。",
        code: `// Step Functionsステートマシン定義（ASL）
{
  "Comment": "注文処理ワークフロー",
  "StartAt": "ValidateOrder",
  "States": {
    "ValidateOrder": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:function:validate-order",
      "Next": "ProcessPayment",
      "Catch": [{
        "ErrorEquals": ["ValidationError"],
        "Next": "OrderFailed"
      }]
    },
    "ProcessPayment": {
      "Type": "Task",
      "Resource": "arn:aws:lambda:...:function:process-payment",
      "Next": "ParallelNotify"
    },
    "ParallelNotify": {
      "Type": "Parallel",
      "Branches": [
        {"StartAt": "SendEmail", "States": {"SendEmail": {"Type": "Task", "Resource": "arn:aws:states:::sns:publish", "End": true}}},
        {"StartAt": "UpdateDB", "States": {"UpdateDB": {"Type": "Task", "Resource": "arn:aws:states:::dynamodb:putItem", "End": true}}}
      ],
      "End": true
    },
    "OrderFailed": { "Type": "Fail", "Error": "OrderError" }
  }
}`,
      },
    ],
  },

  // ── DevOps・IaC ──
  {
    id: "cloudformation",
    title: "CloudFormation・CDK",
    description: "インフラのコード化とテンプレート管理",
    category: "devops",
    sections: [
      {
        title: "CloudFormationテンプレート",
        content:
          "AWS CloudFormationはインフラをコード（IaC）として管理するサービスです。YAML/JSON形式のテンプレートでAWSリソースを定義し、スタックとしてデプロイします。Parameters（パラメータ）、Mappings（マッピング）、Conditions（条件）、Resources（リソース）、Outputs（出力）のセクションで構成されます。変更セットで事前に差分を確認してから適用できます。",
        code: `# CloudFormationテンプレート（YAML）
AWSTemplateFormatVersion: '2010-09-09'
Description: Web Server Stack

Parameters:
  InstanceType:
    Type: String
    Default: t3.micro
    AllowedValues: [t3.micro, t3.small, t3.medium]

Resources:
  WebServer:
    Type: AWS::EC2::Instance
    Properties:
      ImageId: ami-0abcdef1234567890
      InstanceType: !Ref InstanceType
      SecurityGroupIds:
        - !Ref WebSecurityGroup
      Tags:
        - Key: Name
          Value: !Sub "\${AWS::StackName}-web"

  WebSecurityGroup:
    Type: AWS::EC2::SecurityGroup
    Properties:
      GroupDescription: Web server SG
      SecurityGroupIngress:
        - IpProtocol: tcp
          FromPort: 80
          ToPort: 80
          CidrIp: 0.0.0.0/0

Outputs:
  PublicIP:
    Value: !GetAtt WebServer.PublicIp`,
      },
      {
        title: "スタック操作とネスト",
        content:
          "スタックの作成・更新・削除はAWS CLIやコンソールから行います。ネストスタックで大規模なインフラをモジュール化し、クロススタック参照で値を共有できます。StackSetsを使えば複数アカウント・リージョンに同時デプロイが可能です。ドリフト検出で実際のリソースとテンプレートの差異を確認できます。",
        code: `# スタックの作成
aws cloudformation create-stack \\
  --stack-name web-stack \\
  --template-body file://template.yaml \\
  --parameters ParameterKey=InstanceType,ParameterValue=t3.small \\
  --capabilities CAPABILITY_IAM

# 変更セットの作成と実行
aws cloudformation create-change-set \\
  --stack-name web-stack \\
  --change-set-name update-instance \\
  --template-body file://template-v2.yaml

aws cloudformation execute-change-set \\
  --stack-name web-stack \\
  --change-set-name update-instance

# ドリフト検出
aws cloudformation detect-stack-drift \\
  --stack-name web-stack`,
      },
      {
        title: "AWS CDK",
        content:
          "AWS CDK（Cloud Development Kit）はTypeScript、Python、Java、Go、C#などのプログラミング言語でインフラを定義できるフレームワークです。L1（CloudFormation直接）、L2（高レベル抽象化）、L3（パターン）のコンストラクトレベルがあり、L2を使うとベストプラクティスに沿った設定がデフォルトで適用されます。cdk synthでCloudFormationテンプレートに変換されます。",
        code: `// AWS CDKの例（TypeScript）
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as ecs_patterns from 'aws-cdk-lib/aws-ecs-patterns';

export class AppStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string) {
    super(scope, id);

    const vpc = new ec2.Vpc(this, 'AppVpc', { maxAzs: 2 });

    const cluster = new ecs.Cluster(this, 'Cluster', { vpc });

    // L3パターン: ALB + Fargate を一行で
    new ecs_patterns.ApplicationLoadBalancedFargateService(this, 'Service', {
      cluster,
      taskImageOptions: {
        image: ecs.ContainerImage.fromRegistry('nginx'),
      },
      desiredCount: 2,
      publicLoadBalancer: true,
    });
  }
}`,
      },
    ],
  },
  {
    id: "cicd",
    title: "CI/CD パイプライン",
    description: "CodePipeline・CodeBuild・CodeDeployによる自動化",
    category: "devops",
    sections: [
      {
        title: "AWS CodePipeline",
        content:
          "CodePipelineは継続的デリバリーサービスで、ソースコードの変更から本番デプロイまでの一連のステージを自動化します。ソースステージ（CodeCommit、GitHub、S3）、ビルドステージ（CodeBuild）、デプロイステージ（CodeDeploy、ECS、CloudFormation）を組み合わせます。手動承認ステージを挟んで本番デプロイ前の確認も可能です。",
        code: `# CodePipelineの作成（JSON設定）
aws codepipeline create-pipeline --pipeline '{
  "name": "my-pipeline",
  "roleArn": "arn:aws:iam::123456789012:role/codepipeline-role",
  "stages": [
    {
      "name": "Source",
      "actions": [{
        "name": "GitHub",
        "actionTypeId": {
          "category": "Source",
          "owner": "ThirdParty",
          "provider": "GitHub",
          "version": "1"
        },
        "configuration": {
          "Owner": "my-org",
          "Repo": "my-app",
          "Branch": "main"
        },
        "outputArtifacts": [{"name": "SourceOutput"}]
      }]
    },
    {
      "name": "Build",
      "actions": [{
        "name": "CodeBuild",
        "actionTypeId": {
          "category": "Build",
          "owner": "AWS",
          "provider": "CodeBuild",
          "version": "1"
        },
        "inputArtifacts": [{"name": "SourceOutput"}],
        "outputArtifacts": [{"name": "BuildOutput"}]
      }]
    }
  ]
}'`,
      },
      {
        title: "AWS CodeBuild",
        content:
          "CodeBuildはフルマネージドのビルドサービスで、ソースコードのコンパイル、テスト実行、パッケージ作成を行います。buildspec.ymlファイルでビルド手順を定義します。install、pre_build、build、post_buildの各フェーズで処理を記述し、artifactsでビルド成果物を出力します。Dockerイメージのビルドにも対応しています。",
        code: `# buildspec.yml
version: 0.2

phases:
  install:
    runtime-versions:
      nodejs: 20
    commands:
      - npm ci

  pre_build:
    commands:
      - echo "Running tests..."
      - npm test
      - echo "Logging in to ECR..."
      - aws ecr get-login-password | docker login --username AWS --password-stdin $ECR_REPO

  build:
    commands:
      - echo "Building Docker image..."
      - docker build -t $ECR_REPO:$CODEBUILD_RESOLVED_SOURCE_VERSION .
      - docker push $ECR_REPO:$CODEBUILD_RESOLVED_SOURCE_VERSION

  post_build:
    commands:
      - echo "Generating imagedefinitions.json..."
      - printf '[{"name":"web","imageUri":"%s"}]' $ECR_REPO:$CODEBUILD_RESOLVED_SOURCE_VERSION > imagedefinitions.json

artifacts:
  files:
    - imagedefinitions.json`,
      },
      {
        title: "AWS CodeDeploy",
        content:
          "CodeDeployはEC2、Lambda、ECSへのデプロイを自動化するサービスです。デプロイ設定でAll-at-once（一括）、Half-at-a-time（半数ずつ）、One-at-a-time（1台ずつ）、Canary（カナリア）、Linear（段階的）のデプロイ戦略を選べます。appspec.ymlでデプロイ時のライフサイクルフック（BeforeInstall、AfterInstall、ValidateService等）を定義します。",
        code: `# appspec.yml（EC2/オンプレミス用）
version: 0.0
os: linux

files:
  - source: /
    destination: /var/www/html

hooks:
  BeforeInstall:
    - location: scripts/stop_server.sh
      timeout: 300
  AfterInstall:
    - location: scripts/install_dependencies.sh
      timeout: 300
  ApplicationStart:
    - location: scripts/start_server.sh
      timeout: 300
  ValidateService:
    - location: scripts/health_check.sh
      timeout: 60

# ECS Blue/Greenデプロイ用appspec.yml
# version: 0.0
# Resources:
#   - TargetService:
#       Type: AWS::ECS::Service
#       Properties:
#         TaskDefinition: "arn:aws:ecs:...:task-definition/web-app:2"
#         LoadBalancerInfo:
#           ContainerName: "web"
#           ContainerPort: 3000`,
      },
    ],
  },

  // ── 監視・運用 ──
  {
    id: "cloudwatch",
    title: "Amazon CloudWatch",
    description: "メトリクス監視・ログ分析・アラーム設定",
    category: "monitoring",
    sections: [
      {
        title: "メトリクスとダッシュボード",
        content:
          "CloudWatchはAWSリソースとアプリケーションの監視サービスです。EC2のCPU使用率、RDSの接続数、Lambda実行時間など、AWSサービスが自動で標準メトリクスを送信します。カスタムメトリクスで独自の値も監視可能です。ダッシュボードでメトリクスをグラフ化し、リアルタイムに状況を把握できます。",
        code: `# カスタムメトリクスの送信
aws cloudwatch put-metric-data \\
  --namespace "MyApp" \\
  --metric-name "ActiveUsers" \\
  --value 42 \\
  --unit Count \\
  --dimensions Environment=production,Service=web

# ダッシュボードの作成
aws cloudwatch put-dashboard \\
  --dashboard-name "ProductionOverview" \\
  --dashboard-body '{
    "widgets": [{
      "type": "metric",
      "properties": {
        "metrics": [
          ["AWS/EC2", "CPUUtilization", "AutoScalingGroupName", "web-asg"],
          ["AWS/ApplicationELB", "RequestCount", "LoadBalancer", "app/my-alb/xxx"]
        ],
        "period": 300,
        "stat": "Average",
        "region": "ap-northeast-1",
        "title": "System Overview"
      }
    }]
  }'`,
      },
      {
        title: "アラームとアクション",
        content:
          "CloudWatchアラームはメトリクスが閾値を超えた場合に通知やアクションを実行します。SNSトピックへの通知、Auto Scalingポリシーの実行、EC2アクション（停止・終了・再起動）が設定可能です。複合アラームで複数のアラームを論理的に組み合わせることもできます。異常検知（Anomaly Detection）は機械学習でベースラインを学習し、異常を自動検知します。",
        code: `# CPUアラームの作成
aws cloudwatch put-metric-alarm \\
  --alarm-name "HighCPU" \\
  --metric-name CPUUtilization \\
  --namespace AWS/EC2 \\
  --statistic Average \\
  --period 300 \\
  --threshold 80 \\
  --comparison-operator GreaterThanThreshold \\
  --evaluation-periods 2 \\
  --alarm-actions arn:aws:sns:ap-northeast-1:123456789012:alerts \\
  --dimensions Name=AutoScalingGroupName,Value=web-asg

# 異常検知アラーム
aws cloudwatch put-anomaly-detector \\
  --namespace AWS/ApplicationELB \\
  --metric-name TargetResponseTime \\
  --stat Average \\
  --dimensions Name=LoadBalancer,Value=app/my-alb/xxx`,
      },
      {
        title: "CloudWatch Logs",
        content:
          "CloudWatch Logsはログデータの収集、監視、分析を行います。ロググループにストリームが格納され、保持期間を設定できます。Logs Insightsでクエリ言語を使った高速なログ分析が可能です。メトリクスフィルターでログパターンからカスタムメトリクスを生成し、サブスクリプションフィルターでLambdaやKinesisにリアルタイム転送もできます。",
        code: `# ロググループの作成
aws logs create-log-group \\
  --log-group-name /app/production \\
  --retention-in-days 90

# Logs Insightsクエリ
aws logs start-query \\
  --log-group-name /app/production \\
  --start-time $(date -d '-1 hour' +%s) \\
  --end-time $(date +%s) \\
  --query-string '
    fields @timestamp, @message
    | filter @message like /ERROR/
    | stats count(*) as errorCount by bin(5m)
    | sort errorCount desc
    | limit 20
  '

# メトリクスフィルターの作成
aws logs put-metric-filter \\
  --log-group-name /app/production \\
  --filter-name ErrorCount \\
  --filter-pattern "ERROR" \\
  --metric-transformations \\
    metricName=AppErrors,metricNamespace=MyApp,metricValue=1`,
      },
    ],
  },
  {
    id: "operations",
    title: "運用管理ツール",
    description: "CloudTrail・Config・Systems Manager・Trusted Advisor",
    category: "monitoring",
    sections: [
      {
        title: "AWS CloudTrail",
        content:
          "CloudTrailはAWSアカウント内のすべてのAPI呼び出しを記録する監査ログサービスです。誰が、いつ、何のAPIを呼び出したかを追跡でき、セキュリティ分析やコンプライアンス監査に不可欠です。管理イベント（コンソール操作、CLI実行）とデータイベント（S3オブジェクト操作、Lambda実行）を記録できます。CloudTrail Lakeで高度な分析クエリも可能です。",
        code: `# 証跡の作成（全リージョン）
aws cloudtrail create-trail \\
  --name management-trail \\
  --s3-bucket-name my-cloudtrail-logs \\
  --is-multi-region-trail \\
  --enable-log-file-validation

# 証跡のロギング開始
aws cloudtrail start-logging --name management-trail

# イベント履歴の検索
aws cloudtrail lookup-events \\
  --lookup-attributes AttributeKey=EventName,AttributeValue=DeleteBucket \\
  --start-time 2024-01-01T00:00:00Z \\
  --max-results 10`,
      },
      {
        title: "AWS Config・Trusted Advisor",
        content:
          "AWS Configはリソースの設定変更を記録し、コンプライアンスルールで評価します。Config Rulesで「S3バケットが暗号化されているか」「セキュリティグループがSSHを全公開していないか」などを自動チェックし、修復アクション（Systems Manager Automation）で自動修正も可能です。Trusted Advisorはコスト最適化、パフォーマンス、セキュリティ、耐障害性、サービス制限の5カテゴリでアカウントを評価します。",
        code: `# AWS Configの有効化
aws configservice put-configuration-recorder \\
  --configuration-recorder name=default,roleARN=arn:aws:iam::123456789012:role/config-role \\
  --recording-group allSupported=true,includeGlobalResourceTypes=true

# Configルールの追加
aws configservice put-config-rule \\
  --config-rule '{
    "ConfigRuleName": "s3-bucket-server-side-encryption-enabled",
    "Source": {
      "Owner": "AWS",
      "SourceIdentifier": "S3_BUCKET_SERVER_SIDE_ENCRYPTION_ENABLED"
    }
  }'

# コンプライアンス状況の確認
aws configservice get-compliance-summary-by-resource-type`,
      },
      {
        title: "AWS Systems Manager",
        content:
          "Systems Managerはインフラ管理の統合プラットフォームです。Session ManagerでSSHなしにEC2にセキュアに接続、パッチマネージャーでOS/ソフトウェアパッチを自動適用、Automationでランブック（手順書）を定義して運用タスクを自動化します。Inventoryでインスタンスのソフトウェア情報を収集し、Compliance機能でパッチ適用状況を評価します。",
        code: `# Session Managerでインスタンスに接続
aws ssm start-session --target i-0123456789abcdef0

# コマンドの一括実行（Run Command）
aws ssm send-command \\
  --document-name "AWS-RunShellScript" \\
  --targets "Key=tag:Environment,Values=production" \\
  --parameters 'commands=["yum update -y","systemctl restart httpd"]'

# パッチベースラインの作成
aws ssm create-patch-baseline \\
  --name "ProductionBaseline" \\
  --operating-system AMAZON_LINUX_2023 \\
  --approval-rules '{
    "PatchRules": [{
      "PatchFilterGroup": {
        "PatchFilters": [
          {"Key":"SEVERITY","Values":["Critical","Important"]}
        ]
      },
      "ApproveAfterDays": 7
    }]
  }'`,
      },
    ],
  },

  // ── AI・機械学習 ──
  {
    id: "ai-ml",
    title: "AI・MLサービス",
    description: "Bedrock・SageMaker・AIサービス群",
    category: "ai-ml",
    sections: [
      {
        title: "Amazon Bedrock",
        content:
          "Amazon Bedrockは基盤モデル（Foundation Model）へのAPIアクセスを提供するサービスです。Claude（Anthropic）、Titan（Amazon）、Llama（Meta）、Mistral、Stable Diffusionなどのモデルを統一APIで利用できます。Knowledge Basesでドキュメントを取り込みRAG（Retrieval Augmented Generation）を構築し、AgentsでLLMにツール呼び出しや外部データアクセスを行わせることができます。",
        code: `# Bedrock APIの呼び出し（AWS CLI）
aws bedrock-runtime invoke-model \\
  --model-id anthropic.claude-3-sonnet-20240229-v1:0 \\
  --content-type application/json \\
  --accept application/json \\
  --body '{
    "anthropic_version": "bedrock-2023-05-31",
    "max_tokens": 1024,
    "messages": [{
      "role": "user",
      "content": "AWSのベストプラクティスを3つ教えてください。"
    }]
  }' \\
  output.json

# ナレッジベースの作成
aws bedrock-agent create-knowledge-base \\
  --name "product-docs" \\
  --role-arn arn:aws:iam::123456789012:role/bedrock-kb-role \\
  --knowledge-base-configuration '{
    "type": "VECTOR",
    "vectorKnowledgeBaseConfiguration": {
      "embeddingModelArn": "arn:aws:bedrock:...:foundation-model/amazon.titan-embed-text-v2:0"
    }
  }'`,
      },
      {
        title: "Amazon SageMaker",
        content:
          "SageMakerは機械学習モデルの構築・訓練・デプロイのためのフルマネージドプラットフォームです。SageMaker Studioは統合開発環境、組み込みアルゴリズム（XGBoost、線形回帰、画像分類等）を提供します。訓練ジョブでは分散学習やスポットインスタンスによるコスト削減が可能です。エンドポイントでリアルタイム推論、バッチ変換でバッチ推論を実行できます。",
        code: `# SageMaker訓練ジョブの作成
aws sagemaker create-training-job \\
  --training-job-name my-model-training \\
  --algorithm-specification '{
    "TrainingImage": "123456789012.dkr.ecr.ap-northeast-1.amazonaws.com/xgboost:latest",
    "TrainingInputMode": "File"
  }' \\
  --role-arn arn:aws:iam::123456789012:role/sagemaker-role \\
  --input-data-config '[{
    "ChannelName": "train",
    "DataSource": {
      "S3DataSource": {
        "S3Uri": "s3://my-bucket/train/",
        "S3DataType": "S3Prefix"
      }
    }
  }]' \\
  --output-data-config '{
    "S3OutputPath": "s3://my-bucket/output/"
  }' \\
  --resource-config '{
    "InstanceType": "ml.m5.xlarge",
    "InstanceCount": 1,
    "VolumeSizeInGB": 50
  }' \\
  --stopping-condition MaxRuntimeInSeconds=3600`,
      },
      {
        title: "AIサービス群",
        content:
          "AWSは事前訓練済みのAIサービスを多数提供しています。Amazon Rekognitionは画像・動画の分析（顔検出、ラベル付け、テキスト検出）、Amazon Transcribeは音声をテキストに変換、Amazon Translateは多言語翻訳、Amazon Comprehendは自然言語処理（感情分析、エンティティ抽出）、Amazon Textractはドキュメントからのテキスト・テーブル抽出を行います。",
        code: `# Rekognitionでラベル検出
aws rekognition detect-labels \\
  --image '{"S3Object":{"Bucket":"my-bucket","Name":"photo.jpg"}}' \\
  --max-labels 10

# Transcribeで文字起こし
aws transcribe start-transcription-job \\
  --transcription-job-name my-job \\
  --language-code ja-JP \\
  --media MediaFileUri=s3://my-bucket/audio.mp3 \\
  --output-bucket-name my-bucket

# Comprehendで感情分析
aws comprehend detect-sentiment \\
  --text "この製品は素晴らしいです。大変満足しています。" \\
  --language-code ja

# Textractでドキュメント分析
aws textract analyze-document \\
  --document '{"S3Object":{"Bucket":"my-bucket","Name":"invoice.pdf"}}' \\
  --feature-types '["TABLES","FORMS"]'`,
      },
    ],
  },

  // ── 設計・アーキテクチャ ──
  {
    id: "well-architected",
    title: "Well-Architectedフレームワーク",
    description: "6つの柱とクラウド設計原則",
    category: "architecture",
    sections: [
      {
        title: "6つの柱",
        content:
          "AWS Well-Architectedフレームワークは、クラウドアーキテクチャを評価・改善するための指針です。6つの柱は、①運用上の優秀性（自動化、IaC、小さな変更、運用手順書）、②セキュリティ（最小権限、暗号化、トレーサビリティ）、③信頼性（自動復旧、水平スケーリング、障害分離）、④パフォーマンス効率（適切なリソース選択、実験、サーバーレス活用）、⑤コスト最適化（消費モデル、規模の経済）、⑥持続可能性（環境影響の最小化）です。",
        code: `# Well-Architected Toolでワークロードレビュー
aws wellarchitected create-workload \\
  --workload-name "Production Web App" \\
  --description "Main customer-facing application" \\
  --environment PRODUCTION \\
  --lenses wellarchitected \\
  --aws-regions ap-northeast-1

# レンズ回答の更新
aws wellarchitected update-answer \\
  --workload-id wl-xxxxxxxxxxxxx \\
  --lens-alias wellarchitected \\
  --question-id ops-1 \\
  --selected-choices choice1 choice2

# 改善計画の取得
aws wellarchitected list-lens-review-improvements \\
  --workload-id wl-xxxxxxxxxxxxx \\
  --lens-alias wellarchitected \\
  --pillar-id security`,
      },
      {
        title: "高可用性・災害復旧",
        content:
          "AWSでの高可用性はマルチAZ、マルチリージョン構成で実現します。RTO（目標復旧時間）とRPO（目標復旧時点）に基づいてDR戦略を選択します。バックアップ&リストア（低コスト、RTO数時間）、パイロットライト（最小限の環境を常時起動）、ウォームスタンバイ（縮小版を稼働）、マルチサイトアクティブ/アクティブ（最高可用性）の4段階があります。",
        code: `# マルチリージョンDR構成の例

# 1. S3クロスリージョンレプリケーション
aws s3api put-bucket-replication \\
  --bucket source-bucket \\
  --replication-configuration '{
    "Role": "arn:aws:iam::123456789012:role/replication-role",
    "Rules": [{
      "Status": "Enabled",
      "Destination": {
        "Bucket": "arn:aws:s3:::dr-bucket",
        "StorageClass": "STANDARD_IA"
      }
    }]
  }'

# 2. RDSクロスリージョンリードレプリカ
aws rds create-db-instance-read-replica \\
  --db-instance-identifier mydb-dr \\
  --source-db-instance-identifier arn:aws:rds:ap-northeast-1:123456789012:db:mydb \\
  --db-instance-class db.t3.medium \\
  --region us-west-2

# 3. Route 53フェイルオーバールーティング
# プライマリ → ap-northeast-1
# セカンダリ → us-west-2（ヘルスチェック失敗時に切り替え）`,
      },
      {
        title: "コスト最適化",
        content:
          "AWSのコスト最適化にはリザーブドインスタンス（RI、1年/3年契約で最大72%割引）、Savings Plans（コンピューティング使用量のコミット割引）、スポットインスタンス（最大90%割引、中断あり）があります。AWS Cost ExplorerやBudgetsでコストを可視化・管理し、Compute OptimizerでEC2/Lambda/EBSの最適なサイズを提案してもらえます。タグ付け戦略でコスト配分を正確に行うことが重要です。",
        code: `# Savings Plansの確認
aws savingsplans describe-savings-plans

# コスト配分タグの有効化
aws ce update-cost-allocation-tags-status \\
  --cost-allocation-tags-status '[
    {"TagKey": "Environment", "Status": "Active"},
    {"TagKey": "Project", "Status": "Active"},
    {"TagKey": "Team", "Status": "Active"}
  ]'

# 予算アラームの作成
aws budgets create-budget \\
  --account-id 123456789012 \\
  --budget '{
    "BudgetName": "Monthly-Budget",
    "BudgetLimit": {"Amount": "1000", "Unit": "USD"},
    "TimeUnit": "MONTHLY",
    "BudgetType": "COST"
  }' \\
  --notifications-with-subscribers '[{
    "Notification": {
      "NotificationType": "ACTUAL",
      "ComparisonOperator": "GREATER_THAN",
      "Threshold": 80
    },
    "Subscribers": [{
      "SubscriptionType": "EMAIL",
      "Address": "admin@example.com"
    }]
  }]'`,
      },
    ],
  },
  {
    id: "messaging",
    title: "メッセージングと統合",
    description: "SQS・SNS・EventBridge・Kinesis",
    category: "architecture",
    sections: [
      {
        title: "Amazon SQS",
        content:
          "SQS（Simple Queue Service）はフルマネージドのメッセージキューサービスです。Standard Queue（高スループット、ベストエフォート順序）とFIFO Queue（正確な順序保証、重複排除）があります。可視性タイムアウトで処理中のメッセージの再配信を防ぎ、デッドレターキュー（DLQ）で処理失敗メッセージを別キューに退避します。メッセージの最大サイズは256KBです。",
        code: `# SQSキューの作成
aws sqs create-queue \\
  --queue-name order-queue \\
  --attributes '{
    "VisibilityTimeout": "60",
    "MessageRetentionPeriod": "1209600",
    "ReceiveMessageWaitTimeSeconds": "20",
    "RedrivePolicy": "{\\\"deadLetterTargetArn\\\":\\\"arn:aws:sqs:...:order-dlq\\\",\\\"maxReceiveCount\\\":\\\"3\\\"}"
  }'

# メッセージの送信
aws sqs send-message \\
  --queue-url https://sqs.ap-northeast-1.amazonaws.com/123456789012/order-queue \\
  --message-body '{"orderId":"ORD-001","amount":5000}'

# メッセージの受信と削除
aws sqs receive-message \\
  --queue-url https://sqs.../order-queue \\
  --max-number-of-messages 10 \\
  --wait-time-seconds 20`,
      },
      {
        title: "Amazon SNS・EventBridge",
        content:
          "SNS（Simple Notification Service）はPub/Subメッセージングサービスです。トピックにメッセージを発行すると、サブスクライバー（Email、SQS、Lambda、HTTP/S）に配信されます。ファンアウトパターン（SNS→複数SQS）でイベントを複数のシステムに同時配信できます。EventBridgeはイベント駆動アーキテクチャの中核で、AWSサービス、SaaSアプリ、カスタムアプリからのイベントをルールに基づいてターゲットにルーティングします。",
        code: `# SNSトピックとサブスクリプション
aws sns create-topic --name order-events
aws sns subscribe \\
  --topic-arn arn:aws:sns:...:order-events \\
  --protocol sqs \\
  --notification-endpoint arn:aws:sqs:...:notification-queue

# EventBridgeルールの作成
aws events put-rule \\
  --name "ec2-state-change" \\
  --event-pattern '{
    "source": ["aws.ec2"],
    "detail-type": ["EC2 Instance State-change Notification"],
    "detail": {"state": ["stopped", "terminated"]}
  }'

aws events put-targets \\
  --rule ec2-state-change \\
  --targets '[{
    "Id": "notify-sns",
    "Arn": "arn:aws:sns:...:infra-alerts"
  }]'`,
      },
      {
        title: "Amazon Kinesis",
        content:
          "Kinesisはリアルタイムストリーミングデータの収集・処理プラットフォームです。Kinesis Data Streams（カスタム処理）、Kinesis Data Firehose（S3/Redshift/OpenSearchへの配信）、Kinesis Data Analytics（SQLやApache Flinkによるリアルタイム分析）があります。シャード単位でスケーリングし、1シャードあたり1MB/秒の書き込みと2MB/秒の読み取りが可能です。",
        code: `# Kinesisストリームの作成
aws kinesis create-stream \\
  --stream-name clickstream \\
  --shard-count 2

# レコードの送信
aws kinesis put-record \\
  --stream-name clickstream \\
  --partition-key user-123 \\
  --data '{"userId":"user-123","action":"click","page":"/products","ts":"2024-01-15T10:30:00Z"}'

# Firehose配信ストリームの作成（S3宛）
aws firehose create-delivery-stream \\
  --delivery-stream-name clickstream-to-s3 \\
  --delivery-stream-type KinesisStreamAsSource \\
  --kinesis-stream-source-configuration '{
    "KinesisStreamARN": "arn:aws:kinesis:...:stream/clickstream",
    "RoleARN": "arn:aws:iam::123456789012:role/firehose-role"
  }' \\
  --s3-destination-configuration '{
    "RoleARN": "arn:aws:iam::123456789012:role/firehose-role",
    "BucketARN": "arn:aws:s3:::analytics-bucket",
    "Prefix": "clickstream/year=!{timestamp:yyyy}/month=!{timestamp:MM}/"
  }'`,
      },
    ],
  },
];
