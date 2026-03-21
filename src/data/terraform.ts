export interface TerraformSection {
  title: string;
  content: string;
  code?: string;
}

export interface TerraformChapter {
  id: string;
  title: string;
  description: string;
  category: string;
  sections: TerraformSection[];
}

export interface TerraformCategory {
  id: string;
  name: string;
  color: string;
}

export const terraformCategories: TerraformCategory[] = [
  { id: "basics", name: "Terraform基礎", color: "#7B42BC" },
  { id: "aws", name: "AWS構築", color: "#FF9900" },
  { id: "practice", name: "実践・運用", color: "#059669" },
];

export const terraformChapters: TerraformChapter[] = [
  // ── Terraform基礎 ──
  {
    id: "terraform-intro",
    title: "Terraformの概要",
    description: "IaCの概念からTerraformの基本操作まで",
    category: "basics",
    sections: [
      {
        title: "IaC（Infrastructure as Code）とは",
        content:
          "IaC（Infrastructure as Code）とは、サーバーやネットワークなどのインフラをコードで定義・管理する手法です。従来は管理コンソールやCLIで手動構築していたインフラを、コードとして記述することで再現性・一貫性・バージョン管理が可能になります。IaCの主なメリットとして、(1) 手作業によるミスの排除、(2) 環境の再現性（dev/stg/prodを同じコードから作成）、(3) Gitによる変更履歴の追跡、(4) コードレビューによるインフラ変更の品質担保が挙げられます。IaCツールには宣言的アプローチ（Terraform, CloudFormation）と命令的アプローチ（Ansible, Chef）があり、Terraformは宣言的アプローチを採用しています。宣言的アプローチでは「あるべき状態」を記述し、ツールが現在の状態との差分を計算して必要な操作を実行します。",
      },
      {
        title: "Terraformの特徴（HCLとプロバイダ）",
        content:
          "TerraformはHashiCorp社が開発したオープンソースのIaCツールです。最大の特徴はマルチクラウド対応であり、AWS・Azure・GCP・Kubernetesなど数千のプロバイダに対応しています。設定ファイルはHCL（HashiCorp Configuration Language）という独自言語で記述します。HCLはJSONより人間が読みやすく、宣言的な記法でインフラリソースを定義できます。プロバイダはTerraformとクラウドAPIの橋渡しをするプラグインで、terraform initコマンドで自動的にダウンロードされます。Terraform RegistryにはHashiCorp公式・コミュニティ製のプロバイダやモジュールが公開されています。",
        code: `# プロバイダの設定（main.tf）
terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# AWSプロバイダの設定
provider "aws" {
  region = "ap-northeast-1"  # 東京リージョン

  default_tags {
    tags = {
      Environment = "dev"
      ManagedBy   = "terraform"
    }
  }
}`,
      },
      {
        title: "Terraformのインストール",
        content:
          "TerraformはGo言語で書かれた単一バイナリとして配布されており、各OS向けにインストールが可能です。macOSではHomebrewで簡単にインストールできます。また、tfenvを使うと複数バージョンの切り替えが容易になり、プロジェクトごとに異なるバージョンを使い分けることができます。.terraform-versionファイルにバージョンを記載しておくと、tfenvが自動的にそのバージョンを使用します。インストール後はterraform versionコマンドでバージョンを確認しましょう。",
        code: `# macOS（Homebrew）
brew install terraform

# tfenv（バージョン管理ツール）を使う場合
brew install tfenv
tfenv install 1.9.0
tfenv use 1.9.0

# バージョン確認
terraform version
# Terraform v1.9.0
# on darwin_arm64

# .terraform-version ファイルでプロジェクト固定
echo "1.9.0" > .terraform-version

# Linux（手動インストール）
wget https://releases.hashicorp.com/terraform/1.9.0/terraform_1.9.0_linux_amd64.zip
unzip terraform_1.9.0_linux_amd64.zip
sudo mv terraform /usr/local/bin/
terraform version`,
      },
      {
        title: "基本コマンド（init / plan / apply / destroy）",
        content:
          "Terraformの基本ワークフローはinit → plan → apply → destroyの4ステップです。terraform initはプロジェクトの初期化を行い、プロバイダプラグインのダウンロードや.terraformディレクトリの作成を行います。terraform planは実行計画を表示し、どのリソースが作成・変更・削除されるかを事前に確認できます。terraform applyは実際にインフラを構築・変更します。実行前に確認プロンプトが表示され、yesと入力すると処理が開始されます。terraform destroyは管理中のリソースをすべて削除します。本番環境での実行には細心の注意が必要です。-auto-approveフラグを付けると確認なしで実行されますが、CI/CD以外では使用を避けるべきです。",
        code: `# 1. 初期化（プロバイダのダウンロード）
terraform init
# Initializing the backend...
# Initializing provider plugins...
# - Finding hashicorp/aws versions matching "~> 5.0"...
# - Installing hashicorp/aws v5.60.0...

# 2. 実行計画の確認
terraform plan
# Plan: 3 to add, 0 to change, 0 to destroy.

# 実行計画をファイルに保存（推奨）
terraform plan -out=tfplan

# 3. インフラの構築
terraform apply
# Do you want to perform these actions? yes

# 保存した計画を使って適用（確認なしで実行される）
terraform apply tfplan

# 4. リソースの削除
terraform destroy
# Do you really want to destroy all resources? yes

# 特定リソースだけを操作
terraform apply -target=aws_instance.web
terraform destroy -target=aws_instance.web

# フォーマット・バリデーション
terraform fmt       # コードの自動整形
terraform validate  # 構文チェック`,
      },
    ],
  },
  {
    id: "hcl-syntax",
    title: "HCL構文",
    description: "HCLの基本構文から型システム・式・モジュールまで",
    category: "basics",
    sections: [
      {
        title: "resource / data / variable / output",
        content:
          "HCLの基本ブロックは4種類あります。resourceブロックはインフラリソースを定義します。「resource \"リソースタイプ\" \"名前\"」の形式で記述し、リソースタイプはプロバイダが提供するものを使います。dataブロックは既存リソースの情報を参照するために使います。手動で作成済みのリソースやAWSが提供するAMI一覧などを検索・取得できます。variableブロックは入力変数を定義し、外部からパラメータを注入できるようにします。default値、type制約、description、validationルールを設定できます。outputブロックはTerraform実行後に値を出力するために使います。他のモジュールから値を参照する際にも使用します。",
        code: `# --- resource: リソースの定義 ---
resource "aws_instance" "web" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = var.instance_type
  subnet_id     = aws_subnet.public.id

  tags = {
    Name = "\${var.project}-web"
  }
}

# --- data: 既存リソースの参照 ---
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-*-x86_64"]
  }
}

data "aws_caller_identity" "current" {}

# --- variable: 入力変数 ---
variable "instance_type" {
  description = "EC2インスタンスタイプ"
  type        = string
  default     = "t3.micro"

  validation {
    condition     = contains(["t3.micro", "t3.small", "t3.medium"], var.instance_type)
    error_message = "許可されたインスタンスタイプを指定してください。"
  }
}

variable "project" {
  description = "プロジェクト名"
  type        = string
}

# --- output: 出力値 ---
output "instance_id" {
  description = "EC2インスタンスID"
  value       = aws_instance.web.id
}

output "public_ip" {
  description = "パブリックIPアドレス"
  value       = aws_instance.web.public_ip
}`,
      },
      {
        title: "型システム（string / number / list / map）",
        content:
          "HCLの型システムはプリミティブ型とコレクション型に分類されます。プリミティブ型にはstring（文字列）、number（数値）、bool（真偽値）があります。コレクション型にはlist（順序付きリスト）、map（キーと値のペア）、set（重複なしの集合）があります。さらに構造型としてobject（名前付き属性の集合）とtuple（異なる型の順序付きリスト）があります。anyは任意の型を受け入れる特殊な型です。変数にtype制約を付けることで、不正な値が渡された場合にエラーを検出できます。",
        code: `# --- プリミティブ型 ---
variable "app_name" {
  type    = string
  default = "my-app"
}

variable "instance_count" {
  type    = number
  default = 2
}

variable "enable_monitoring" {
  type    = bool
  default = true
}

# --- list型 ---
variable "availability_zones" {
  type    = list(string)
  default = ["ap-northeast-1a", "ap-northeast-1c"]
}

# --- map型 ---
variable "instance_types" {
  type = map(string)
  default = {
    dev  = "t3.micro"
    stg  = "t3.small"
    prod = "t3.medium"
  }
}

# --- object型（構造体） ---
variable "database_config" {
  type = object({
    engine         = string
    engine_version = string
    instance_class = string
    allocated_storage = number
    multi_az       = bool
  })
  default = {
    engine            = "postgres"
    engine_version    = "15.4"
    instance_class    = "db.t3.micro"
    allocated_storage = 20
    multi_az          = false
  }
}

# --- 使用例 ---
resource "aws_instance" "app" {
  count         = var.instance_count
  ami           = data.aws_ami.amazon_linux.id
  instance_type = var.instance_types[terraform.workspace]
  availability_zone = var.availability_zones[count.index]

  tags = {
    Name = "\${var.app_name}-\${count.index + 1}"
  }
}`,
      },
      {
        title: "locals / 条件式 / for式",
        content:
          "localsブロックはローカル変数を定義するために使います。複雑な式の結果を変数に格納して再利用でき、コードの可読性が向上します。条件式は「condition ? true_val : false_val」の三項演算子形式で記述します。リソースの作成有無をcountと組み合わせて制御するパターンがよく使われます。for式はリストやマップを変換・フィルタリングするために使います。[for ... in ... : ...]でリストを生成し、{for ... in ... : ... => ...}でマップを生成します。ifキーワードでフィルタリングも可能です。",
        code: `# --- locals: ローカル変数 ---
locals {
  env    = terraform.workspace
  region = "ap-northeast-1"
  prefix = "\${var.project}-\${local.env}"

  common_tags = {
    Project     = var.project
    Environment = local.env
    ManagedBy   = "terraform"
  }

  # 環境ごとの設定をマップで管理
  env_config = {
    dev  = { instance_type = "t3.micro",  min_size = 1, max_size = 2 }
    stg  = { instance_type = "t3.small",  min_size = 2, max_size = 4 }
    prod = { instance_type = "t3.medium", min_size = 2, max_size = 10 }
  }

  current_config = local.env_config[local.env]
}

# --- 条件式 ---
resource "aws_eip" "nat" {
  # prod環境のみNAT Gatewayを作成
  count  = local.env == "prod" ? 1 : 0
  domain = "vpc"
  tags   = local.common_tags
}

resource "aws_instance" "bastion" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = local.env == "prod" ? "t3.small" : "t3.micro"
  monitoring    = local.env == "prod" ? true : false

  tags = merge(local.common_tags, {
    Name = "\${local.prefix}-bastion"
  })
}

# --- for式 ---
# リストの変換
locals {
  az_names = ["ap-northeast-1a", "ap-northeast-1c", "ap-northeast-1d"]

  # サブネットCIDRの生成
  subnet_cidrs = [for i, az in local.az_names : cidrsubnet("10.0.0.0/16", 8, i)]

  # マップの生成
  az_subnet_map = { for i, az in local.az_names : az => cidrsubnet("10.0.0.0/16", 8, i) }

  # フィルタリング
  large_instances = [
    for name, config in local.env_config : name
    if config.instance_type != "t3.micro"
  ]
}

# for_eachでリソースを複数作成
resource "aws_subnet" "public" {
  for_each = toset(local.az_names)

  vpc_id            = aws_vpc.main.id
  cidr_block        = local.az_subnet_map[each.value]
  availability_zone = each.value

  tags = merge(local.common_tags, {
    Name = "\${local.prefix}-public-\${each.value}"
  })
}`,
      },
      {
        title: "モジュールの基本",
        content:
          "モジュールはTerraformコードの再利用可能なパッケージです。すべてのTerraform設定は暗黙的にルートモジュールであり、moduleブロックで子モジュールを呼び出します。モジュールのソースにはローカルパス、Terraform Registry、GitリポジトリURL、S3バケットなどを指定できます。モジュールへの入力はvariable、出力はoutputで定義します。モジュールを使うことで、VPCやECSクラスタなどの定型的なインフラ構成をテンプレート化し、複数のプロジェクトや環境で再利用できます。",
        code: `# --- モジュールの呼び出し ---
# ローカルモジュール
module "vpc" {
  source = "./modules/vpc"

  project     = var.project
  environment = local.env
  cidr_block  = "10.0.0.0/16"
  az_count    = 2
}

# Terraform Registry公式モジュール
module "s3_bucket" {
  source  = "terraform-aws-modules/s3-bucket/aws"
  version = "~> 4.0"

  bucket = "\${local.prefix}-assets"
  acl    = "private"

  versioning = {
    enabled = true
  }

  tags = local.common_tags
}

# GitHubリポジトリ
module "custom_module" {
  source = "git::https://github.com/example/terraform-modules.git//network?ref=v1.0.0"

  vpc_cidr = "10.0.0.0/16"
}

# --- モジュールの出力を参照 ---
resource "aws_instance" "app" {
  ami           = data.aws_ami.amazon_linux.id
  instance_type = "t3.micro"
  subnet_id     = module.vpc.public_subnet_ids[0]

  tags = {
    Name = "\${local.prefix}-app"
  }
}

output "vpc_id" {
  value = module.vpc.vpc_id
}

# --- モジュール側の定義例（modules/vpc/variables.tf）---
# variable "project" {
#   type = string
# }
# variable "environment" {
#   type = string
# }
# variable "cidr_block" {
#   type = string
# }
# variable "az_count" {
#   type    = number
#   default = 2
# }`,
      },
    ],
  },
  {
    id: "state-management",
    title: "State管理",
    description: "tfstateの仕組みからリモートバックエンド・状態操作まで",
    category: "basics",
    sections: [
      {
        title: "terraform.tfstateの役割",
        content:
          "Terraform Stateはインフラの現在の状態を記録するJSONファイル（terraform.tfstate）です。Terraformはこのファイルを使って、コードで定義した「あるべき状態」と「現在の状態」を比較し、差分（変更計画）を算出します。Stateにはリソースの属性値・依存関係・メタデータが含まれ、apply実行のたびに更新されます。Stateファイルには機密情報（パスワード、アクセスキーなど）が平文で含まれることがあるため、.gitignoreに追加してバージョン管理から除外し、暗号化されたリモートバックエンドで管理することが推奨されます。terraform.tfstate.backupは前回のStateのバックアップファイルです。",
        code: `# terraform.tfstate の構造（例）
{
  "version": 4,
  "terraform_version": "1.9.0",
  "serial": 5,
  "lineage": "a1b2c3d4-...",
  "outputs": {
    "vpc_id": {
      "value": "vpc-0123456789abcdef0",
      "type": "string"
    }
  },
  "resources": [
    {
      "mode": "managed",
      "type": "aws_vpc",
      "name": "main",
      "provider": "provider[\\"registry.terraform.io/hashicorp/aws\\"]",
      "instances": [
        {
          "attributes": {
            "id": "vpc-0123456789abcdef0",
            "cidr_block": "10.0.0.0/16",
            "tags": { "Name": "my-vpc" }
          }
        }
      ]
    }
  ]
}

# .gitignore に追加すべきファイル
# *.tfstate
# *.tfstate.backup
# .terraform/
# *.tfplan
# .terraform.lock.hcl（チームではコミット推奨）`,
      },
      {
        title: "リモートバックエンド（S3 + DynamoDB）",
        content:
          "チーム開発ではStateファイルをローカルではなくリモートバックエンドに保存します。AWS環境ではS3バケット + DynamoDBテーブルの組み合わせが定番です。S3はStateファイルの保存先として使い、バージョニングを有効にすることで履歴管理が可能です。DynamoDBはState Lockingに使用し、複数人が同時にapplyすることを防ぎます。S3バックエンドでは暗号化（SSE-S3/SSE-KMS）も設定できるため、機密情報の保護にも対応できます。バックエンドの設定変更にはterraform init -migrateオプションを使います。",
        code: `# --- バックエンド用リソースの事前作成 ---
# backend.tf（最初にローカルstateでapplyする）
resource "aws_s3_bucket" "tfstate" {
  bucket = "my-project-terraform-state"

  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_versioning" "tfstate" {
  bucket = aws_s3_bucket.tfstate.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "tfstate" {
  bucket = aws_s3_bucket.tfstate.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "aws:kms"
    }
  }
}

resource "aws_dynamodb_table" "tfstate_lock" {
  name         = "terraform-state-lock"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }
}

# --- リモートバックエンドの設定 ---
# main.tf
terraform {
  backend "s3" {
    bucket         = "my-project-terraform-state"
    key            = "env/dev/terraform.tfstate"
    region         = "ap-northeast-1"
    dynamodb_table = "terraform-state-lock"
    encrypt        = true
  }
}

# バックエンド移行コマンド
# terraform init -migrate-state`,
      },
      {
        title: "terraform import",
        content:
          "terraform importは手動で作成済みの既存リソースをTerraformの管理下に取り込むコマンドです。importを実行するとStateファイルにリソース情報が追加されますが、HCLコードは自動生成されません（Terraform 1.5以降ではimportブロックとterraform plan -generate-config-outで自動生成が可能になりました）。importの手順は、(1) 対応するresourceブロックをコードに記述、(2) terraform import コマンドでStateに取り込み、(3) terraform planで差分がないことを確認、(4) 必要に応じてコードを調整する流れです。",
        code: `# --- 従来のimport方法 ---
# 1. まずresourceブロックを書く
resource "aws_vpc" "existing" {
  # 属性は後で埋める
}

# 2. importコマンドでStateに取り込む
# terraform import aws_vpc.existing vpc-0123456789abcdef0

# 3. planで差分を確認し、コードを合わせる
# terraform plan

# --- Terraform 1.5+ import ブロック ---
# import.tf
import {
  to = aws_vpc.existing
  id = "vpc-0123456789abcdef0"
}

import {
  to = aws_subnet.public
  id = "subnet-0123456789abcdef0"
}

import {
  to = aws_security_group.web
  id = "sg-0123456789abcdef0"
}

# コードの自動生成（Terraform 1.5+）
# terraform plan -generate-config-out=generated.tf

# 生成されたコードを確認・調整後にapply
# terraform apply`,
      },
      {
        title: "State操作（mv / rm / show）",
        content:
          "terraform stateコマンドでStateファイルを直接操作できます。state mvはリソースの名前変更やモジュール間の移動に使います。コード上でリソース名を変更した場合、mvを使わないとTerraformは「旧リソースの削除 + 新リソースの作成」と判断してしまいます。state rmはリソースをStateから除外します（実際のインフラは削除されません）。Terraform管理外にしたい場合に使います。state showはリソースの詳細情報をStateから表示します。state listで管理中の全リソースを一覧できます。state pullでリモートStateをダウンロードし、state pushでアップロードできます。",
        code: `# --- state list: リソース一覧 ---
terraform state list
# aws_vpc.main
# aws_subnet.public[0]
# aws_subnet.public[1]
# module.ec2.aws_instance.app

# --- state show: リソース詳細 ---
terraform state show aws_vpc.main
# id          = "vpc-0123456789abcdef0"
# cidr_block  = "10.0.0.0/16"
# tags        = { "Name" = "my-vpc" }

# --- state mv: リソースの移動/名前変更 ---
# リソース名の変更
terraform state mv aws_instance.web aws_instance.app

# モジュールへの移動
terraform state mv aws_vpc.main module.network.aws_vpc.main

# モジュール名の変更
terraform state mv module.old_name module.new_name

# --- state rm: Stateからの除外 ---
# Terraform管理から外す（実リソースは残る）
terraform state rm aws_instance.legacy

# モジュール全体をStateから除外
terraform state rm module.deprecated

# --- state pull / push ---
# リモートStateのダウンロード
terraform state pull > backup.tfstate

# Stateの上書きアップロード（危険！）
terraform state push backup.tfstate

# --- moved ブロック（Terraform 1.1+）---
# コード内でリソース移動を宣言的に記述
moved {
  from = aws_instance.web
  to   = aws_instance.app
}

moved {
  from = aws_instance.app
  to   = module.compute.aws_instance.app
}`,
      },
    ],
  },

  // ── AWS構築 ──
  {
    id: "vpc-network",
    title: "VPCとネットワーク",
    description: "VPC・サブネット・ゲートウェイ・ルーティングの構築",
    category: "aws",
    sections: [
      {
        title: "VPC / サブネット / IGW構築",
        content:
          "Amazon VPC（Virtual Private Cloud）はAWS上に論理的に隔離されたネットワーク空間を作成するサービスです。TerraformではVPC、サブネット、インターネットゲートウェイをリソースとして定義します。VPCにはCIDRブロック（例: 10.0.0.0/16）を指定し、その範囲内でサブネットを分割します。パブリックサブネットはインターネットゲートウェイへのルートを持ち、外部からアクセス可能です。プライベートサブネットはNAT Gateway経由でのみ外部通信が可能です。可用性のために複数のAZ（アベイラビリティゾーン）にサブネットを配置することが推奨されます。",
        code: `# --- VPCの作成 ---
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "\${var.project}-vpc"
  }
}

# --- インターネットゲートウェイ ---
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "\${var.project}-igw"
  }
}

# --- パブリックサブネット（複数AZ） ---
resource "aws_subnet" "public" {
  count = length(var.availability_zones)

  vpc_id                  = aws_vpc.main.id
  cidr_block              = cidrsubnet(aws_vpc.main.cidr_block, 8, count.index)
  availability_zone       = var.availability_zones[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "\${var.project}-public-\${var.availability_zones[count.index]}"
    Tier = "public"
  }
}

# --- プライベートサブネット（複数AZ） ---
resource "aws_subnet" "private" {
  count = length(var.availability_zones)

  vpc_id            = aws_vpc.main.id
  cidr_block        = cidrsubnet(aws_vpc.main.cidr_block, 8, count.index + 10)
  availability_zone = var.availability_zones[count.index]

  tags = {
    Name = "\${var.project}-private-\${var.availability_zones[count.index]}"
    Tier = "private"
  }
}`,
      },
      {
        title: "セキュリティグループ",
        content:
          "セキュリティグループはVPCレベルの仮想ファイアウォールで、インスタンスへのトラフィックを制御します。Terraformではaws_security_groupリソースでグループを定義し、aws_security_group_ruleまたはinline（ingress/egressブロック）でルールを記述します。ベストプラクティスとしてinlineルールよりも個別のruleリソースを使うことが推奨されます。これにより、複数のモジュールやリソースから同じセキュリティグループにルールを追加でき、管理が容易になります。セキュリティグループはステートフルなため、許可したインバウンド通信のレスポンスは自動的に許可されます。",
        code: `# --- Webサーバー用セキュリティグループ ---
resource "aws_security_group" "web" {
  name        = "\${var.project}-web-sg"
  description = "Security group for web servers"
  vpc_id      = aws_vpc.main.id

  tags = {
    Name = "\${var.project}-web-sg"
  }
}

# インバウンドルール: HTTP
resource "aws_security_group_rule" "web_http" {
  type              = "ingress"
  from_port         = 80
  to_port           = 80
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.web.id
  description       = "Allow HTTP"
}

# インバウンドルール: HTTPS
resource "aws_security_group_rule" "web_https" {
  type              = "ingress"
  from_port         = 443
  to_port           = 443
  protocol          = "tcp"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.web.id
  description       = "Allow HTTPS"
}

# アウトバウンドルール: すべて許可
resource "aws_security_group_rule" "web_egress" {
  type              = "egress"
  from_port         = 0
  to_port           = 0
  protocol          = "-1"
  cidr_blocks       = ["0.0.0.0/0"]
  security_group_id = aws_security_group.web.id
  description       = "Allow all outbound"
}

# --- DB用セキュリティグループ ---
resource "aws_security_group" "db" {
  name        = "\${var.project}-db-sg"
  description = "Security group for database"
  vpc_id      = aws_vpc.main.id

  tags = {
    Name = "\${var.project}-db-sg"
  }
}

# WebサーバーからのみDB接続を許可
resource "aws_security_group_rule" "db_from_web" {
  type                     = "ingress"
  from_port                = 5432
  to_port                  = 5432
  protocol                 = "tcp"
  source_security_group_id = aws_security_group.web.id
  security_group_id        = aws_security_group.db.id
  description              = "Allow PostgreSQL from web servers"
}`,
      },
      {
        title: "NAT Gateway",
        content:
          "NAT Gatewayはプライベートサブネットのリソースがインターネットへアウトバウンド通信を行うために使用します。NAT Gatewayはパブリックサブネットに配置し、Elastic IPを関連付けます。高可用性を実現するには、各AZにNAT Gatewayを配置することが推奨されます。ただしNAT Gatewayはコストが高い（約45ドル/月 + データ転送量）ため、開発環境では1つだけ配置したり、NAT Instanceで代替する場合もあります。Terraformではaws_eipとaws_nat_gatewayリソースを組み合わせて定義します。",
        code: `# --- Elastic IP for NAT Gateway ---
resource "aws_eip" "nat" {
  count  = length(var.availability_zones)
  domain = "vpc"

  tags = {
    Name = "\${var.project}-nat-eip-\${count.index + 1}"
  }
}

# --- NAT Gateway（AZごとに配置） ---
resource "aws_nat_gateway" "main" {
  count = length(var.availability_zones)

  allocation_id = aws_eip.nat[count.index].id
  subnet_id     = aws_subnet.public[count.index].id

  tags = {
    Name = "\${var.project}-nat-\${var.availability_zones[count.index]}"
  }

  depends_on = [aws_internet_gateway.main]
}

# --- 開発環境: NAT Gateway 1つだけ（コスト削減） ---
# resource "aws_eip" "nat_single" {
#   count  = local.env == "prod" ? length(var.availability_zones) : 1
#   domain = "vpc"
# }
#
# resource "aws_nat_gateway" "single" {
#   count         = local.env == "prod" ? length(var.availability_zones) : 1
#   allocation_id = aws_eip.nat_single[count.index].id
#   subnet_id     = aws_subnet.public[count.index].id
# }`,
      },
      {
        title: "Route Table設定",
        content:
          "ルートテーブルはサブネット内のトラフィックのルーティング先を定義します。パブリックサブネットにはインターネットゲートウェイへのデフォルトルート（0.0.0.0/0 → IGW）を設定します。プライベートサブネットにはNAT Gatewayへのデフォルトルート（0.0.0.0/0 → NAT GW）を設定します。VPC内のローカル通信（10.0.0.0/16）は自動的にルートテーブルに追加されます。Terraformではaws_route_tableリソースでルートテーブルを作成し、aws_route_table_associationリソースでサブネットに関連付けます。",
        code: `# --- パブリック用ルートテーブル ---
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "\${var.project}-public-rt"
  }
}

# パブリックサブネットへの関連付け
resource "aws_route_table_association" "public" {
  count = length(var.availability_zones)

  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

# --- プライベート用ルートテーブル（AZごと） ---
resource "aws_route_table" "private" {
  count  = length(var.availability_zones)
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.main[count.index].id
  }

  tags = {
    Name = "\${var.project}-private-rt-\${var.availability_zones[count.index]}"
  }
}

# プライベートサブネットへの関連付け
resource "aws_route_table_association" "private" {
  count = length(var.availability_zones)

  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private[count.index].id
}

# --- VPCの全体構成確認 ---
output "vpc_summary" {
  value = {
    vpc_id             = aws_vpc.main.id
    vpc_cidr           = aws_vpc.main.cidr_block
    public_subnet_ids  = aws_subnet.public[*].id
    private_subnet_ids = aws_subnet.private[*].id
    nat_gateway_ids    = aws_nat_gateway.main[*].id
  }
}`,
      },
    ],
  },
  {
    id: "ec2-rds",
    title: "EC2/RDS構築",
    description: "EC2インスタンス・RDS・ロードバランサー・Auto Scalingの構築",
    category: "aws",
    sections: [
      {
        title: "EC2インスタンス（AMI / キーペア）",
        content:
          "TerraformでEC2インスタンスを構築するにはaws_instanceリソースを使います。AMI（Amazon Machine Image）はdataブロックで最新のものを動的に取得するのが推奨されます。キーペアはaws_key_pairリソースで登録するか、既存のものをkey_name属性で指定します。ユーザーデータ（user_data）を使うと、インスタンス起動時にスクリプトを自動実行できます。Webサーバーのインストールやアプリケーションのデプロイに活用します。user_dataを変更するとインスタンスが再作成されるため、注意が必要です。",
        code: `# --- 最新AMIの取得 ---
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-*-x86_64"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# --- キーペアの登録 ---
resource "aws_key_pair" "deployer" {
  key_name   = "\${var.project}-deployer-key"
  public_key = file("~/.ssh/id_rsa.pub")
}

# --- EC2インスタンス ---
resource "aws_instance" "web" {
  ami                    = data.aws_ami.amazon_linux.id
  instance_type          = var.instance_type
  key_name               = aws_key_pair.deployer.key_name
  subnet_id              = aws_subnet.public[0].id
  vpc_security_group_ids = [aws_security_group.web.id]

  # IAMロールの割り当て
  iam_instance_profile = aws_iam_instance_profile.ec2_profile.name

  # ルートボリューム
  root_block_device {
    volume_type           = "gp3"
    volume_size           = 20
    encrypted             = true
    delete_on_termination = true
  }

  # ユーザーデータ（起動時スクリプト）
  user_data = <<-EOF
    #!/bin/bash
    dnf update -y
    dnf install -y nginx
    systemctl start nginx
    systemctl enable nginx
    echo "<h1>\${var.project} Web Server</h1>" > /usr/share/nginx/html/index.html
  EOF

  tags = {
    Name = "\${var.project}-web"
  }

  lifecycle {
    ignore_changes = [ami]  # AMI更新による再作成を防止
  }
}`,
      },
      {
        title: "RDS（PostgreSQL / MySQL）",
        content:
          "Amazon RDSのTerraform構築にはaws_db_instanceリソースを使います。本番環境ではMulti-AZ配置、暗号化の有効化、自動バックアップの設定が必須です。パスワードはterraform.tfvarsやAWS Secrets Managerで管理し、コードにハードコードしないようにします。DBサブネットグループ（aws_db_subnet_group）でRDSを配置するサブネットを指定し、通常はプライベートサブネットに配置します。パラメータグループ（aws_db_parameter_group）でデータベースエンジンの設定をカスタマイズできます。",
        code: `# --- DBサブネットグループ ---
resource "aws_db_subnet_group" "main" {
  name       = "\${var.project}-db-subnet"
  subnet_ids = aws_subnet.private[*].id

  tags = {
    Name = "\${var.project}-db-subnet-group"
  }
}

# --- パラメータグループ ---
resource "aws_db_parameter_group" "postgres" {
  family = "postgres15"
  name   = "\${var.project}-pg15-params"

  parameter {
    name  = "log_statement"
    value = "all"
  }

  parameter {
    name  = "log_min_duration_statement"
    value = "1000"  # 1秒以上のクエリをログ出力
  }
}

# --- RDSインスタンス（PostgreSQL） ---
resource "aws_db_instance" "main" {
  identifier = "\${var.project}-db"

  # エンジン設定
  engine               = "postgres"
  engine_version       = "15.4"
  instance_class       = "db.t3.micro"
  allocated_storage    = 20
  max_allocated_storage = 100  # ストレージ自動拡張

  # 認証情報
  db_name  = "appdb"
  username = "dbadmin"
  password = var.db_password  # tfvarsまたはSecrets Manager

  # ネットワーク
  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.db.id]
  publicly_accessible    = false

  # バックアップ・メンテナンス
  backup_retention_period = 7
  backup_window           = "03:00-04:00"
  maintenance_window      = "Mon:04:00-Mon:05:00"

  # 可用性・セキュリティ
  multi_az            = var.environment == "prod" ? true : false
  storage_encrypted   = true
  deletion_protection = var.environment == "prod" ? true : false
  skip_final_snapshot = var.environment == "prod" ? false : true

  parameter_group_name = aws_db_parameter_group.postgres.name

  tags = {
    Name = "\${var.project}-db"
  }
}

# --- 接続情報の出力 ---
output "db_endpoint" {
  value = aws_db_instance.main.endpoint
}`,
      },
      {
        title: "ELB / ALB",
        content:
          "Application Load Balancer（ALB）はHTTP/HTTPSトラフィックを複数のターゲットに分散させるロードバランサーです。Terraformではaws_lb（ALB本体）、aws_lb_target_group（ターゲットグループ）、aws_lb_listener（リスナー）の3つのリソースを組み合わせて構築します。ALBはパブリックサブネットに配置し、ヘルスチェックでターゲットの正常性を監視します。HTTPS通信にはACM（AWS Certificate Manager）で取得した証明書をリスナーに設定します。パスベースルーティングやホストベースルーティングも設定可能です。",
        code: `# --- ALB ---
resource "aws_lb" "main" {
  name               = "\${var.project}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = aws_subnet.public[*].id

  enable_deletion_protection = var.environment == "prod"

  tags = {
    Name = "\${var.project}-alb"
  }
}

# --- ターゲットグループ ---
resource "aws_lb_target_group" "app" {
  name     = "\${var.project}-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id

  health_check {
    enabled             = true
    healthy_threshold   = 3
    unhealthy_threshold = 3
    timeout             = 5
    interval            = 30
    path                = "/health"
    matcher             = "200"
  }

  tags = {
    Name = "\${var.project}-tg"
  }
}

# --- HTTPリスナー（HTTPSへリダイレクト） ---
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.main.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"
    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

# --- HTTPSリスナー ---
resource "aws_lb_listener" "https" {
  load_balancer_arn = aws_lb.main.arn
  port              = 443
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"
  certificate_arn   = aws_acm_certificate.main.arn

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app.arn
  }
}

# --- ALBのDNS名を出力 ---
output "alb_dns_name" {
  value = aws_lb.main.dns_name
}`,
      },
      {
        title: "Auto Scaling Group",
        content:
          "Auto Scaling Group（ASG）はEC2インスタンスの台数を自動的にスケーリングする仕組みです。TerraformではまずLaunch Template（aws_launch_template）でインスタンスの設定テンプレートを定義し、それを使ってASG（aws_autoscaling_group）を作成します。スケーリングポリシーではCPU使用率やリクエスト数などのメトリクスに基づいてインスタンス数を自動調整できます。Target Tracking Scaling PolicyはCloudWatchメトリクスの目標値を設定するだけで自動スケーリングが実現でき、最も簡単に使えるポリシーです。",
        code: `# --- 起動テンプレート ---
resource "aws_launch_template" "app" {
  name_prefix   = "\${var.project}-lt-"
  image_id      = data.aws_ami.amazon_linux.id
  instance_type = local.current_config.instance_type
  key_name      = aws_key_pair.deployer.key_name

  vpc_security_group_ids = [aws_security_group.web.id]

  iam_instance_profile {
    name = aws_iam_instance_profile.ec2_profile.name
  }

  user_data = base64encode(<<-EOF
    #!/bin/bash
    dnf update -y
    dnf install -y nginx
    systemctl start nginx
    systemctl enable nginx
  EOF
  )

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = "\${var.project}-app"
    }
  }

  lifecycle {
    create_before_destroy = true
  }
}

# --- Auto Scaling Group ---
resource "aws_autoscaling_group" "app" {
  name                = "\${var.project}-asg"
  desired_capacity    = local.current_config.min_size
  min_size            = local.current_config.min_size
  max_size            = local.current_config.max_size
  vpc_zone_identifier = aws_subnet.private[*].id
  target_group_arns   = [aws_lb_target_group.app.arn]
  health_check_type   = "ELB"

  launch_template {
    id      = aws_launch_template.app.id
    version = "$Latest"
  }

  instance_refresh {
    strategy = "Rolling"
    preferences {
      min_healthy_percentage = 50
    }
  }

  tag {
    key                 = "Environment"
    value               = local.env
    propagate_at_launch = true
  }
}

# --- スケーリングポリシー（CPU 70%目標） ---
resource "aws_autoscaling_policy" "cpu_target" {
  name                   = "\${var.project}-cpu-target"
  autoscaling_group_name = aws_autoscaling_group.app.name
  policy_type            = "TargetTrackingScaling"

  target_tracking_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ASGAverageCPUUtilization"
    }
    target_value = 70.0
  }
}`,
      },
    ],
  },
  {
    id: "ecs-fargate",
    title: "ECS/Fargate",
    description: "ECSタスク定義・サービス・ECR・ログの構築",
    category: "aws",
    sections: [
      {
        title: "タスク定義",
        content:
          "ECSタスク定義はコンテナの実行設定を記述するテンプレートです。Fargate起動タイプではCPU・メモリの組み合わせに制約があり（例: 256 CPU / 512 MBメモリ〜4096 CPU / 30720 MBメモリ）、適切な値を選択する必要があります。コンテナ定義にはイメージURL、ポートマッピング、環境変数、ログ設定などを含めます。機密情報はSecrets Managerから取得するsecretsパラメータで注入し、環境変数に直接書かないようにします。タスク実行ロール（execution_role_arn）はECSエージェントがECRからイメージをプルしたりCloudWatch Logsにログを書き込むために必要です。タスクロール（task_role_arn）はコンテナ内のアプリケーションがAWSサービスにアクセスするために使います。",
        code: `# --- タスク実行ロール ---
resource "aws_iam_role" "ecs_execution" {
  name = "\${var.project}-ecs-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_execution" {
  role       = aws_iam_role.ecs_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# --- タスク定義 ---
resource "aws_ecs_task_definition" "app" {
  family                   = "\${var.project}-app"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = aws_iam_role.ecs_execution.arn
  task_role_arn            = aws_iam_role.ecs_task.arn

  container_definitions = jsonencode([
    {
      name      = "app"
      image     = "\${aws_ecr_repository.app.repository_url}:latest"
      essential = true

      portMappings = [
        {
          containerPort = 8080
          protocol      = "tcp"
        }
      ]

      environment = [
        { name = "APP_ENV", value = var.environment },
        { name = "DB_HOST", value = aws_db_instance.main.address }
      ]

      secrets = [
        {
          name      = "DB_PASSWORD"
          valueFrom = aws_secretsmanager_secret.db_password.arn
        }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.app.name
          "awslogs-region"        = var.region
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])
}`,
      },
      {
        title: "サービス定義",
        content:
          "ECSサービスはタスク定義をもとにコンテナを起動・維持する機能です。desired_countで常時稼働させるタスク数を指定し、タスクが停止した場合は自動的に新しいタスクが起動されます。Fargateではネットワーク設定（awsvpc）でサブネットとセキュリティグループを指定します。ALBと連携することでトラフィックの分散とヘルスチェックによる自動復旧が実現できます。デプロイ時にはローリングアップデートが行われ、最小ヘルス率と最大率を設定することでダウンタイムなしのデプロイが可能です。Auto Scalingの設定でCPU・メモリ使用率に応じたタスク数の自動調整も行えます。",
        code: `# --- ECSクラスター ---
resource "aws_ecs_cluster" "main" {
  name = "\${var.project}-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }
}

# --- ECSサービス ---
resource "aws_ecs_service" "app" {
  name            = "\${var.project}-app-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = 2
  launch_type     = "FARGATE"

  # デプロイ設定
  deployment_minimum_healthy_percent = 50
  deployment_maximum_percent         = 200

  network_configuration {
    subnets          = aws_subnet.private[*].id
    security_groups  = [aws_security_group.ecs.id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.app.arn
    container_name   = "app"
    container_port   = 8080
  }

  # デプロイ時のサーキットブレーカー
  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }

  depends_on = [aws_lb_listener.https]
}

# --- Auto Scaling ---
resource "aws_appautoscaling_target" "ecs" {
  max_capacity       = 10
  min_capacity       = 2
  resource_id        = "service/\${aws_ecs_cluster.main.name}/\${aws_ecs_service.app.name}"
  scalable_dimension = "ecs:service:DesiredCount"
  service_namespace  = "ecs"
}

resource "aws_appautoscaling_policy" "ecs_cpu" {
  name               = "\${var.project}-cpu-scaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = aws_appautoscaling_target.ecs.resource_id
  scalable_dimension = aws_appautoscaling_target.ecs.scalable_dimension
  service_namespace  = aws_appautoscaling_target.ecs.service_namespace

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "ECSServiceAverageCPUUtilization"
    }
    target_value       = 70.0
    scale_in_cooldown  = 300
    scale_out_cooldown = 60
  }
}`,
      },
      {
        title: "ECRリポジトリ",
        content:
          "Amazon ECR（Elastic Container Registry）はDockerイメージを保存・管理するプライベートレジストリです。TerraformではECRリポジトリの作成、ライフサイクルポリシー（古いイメージの自動削除）、リポジトリポリシー（アクセス制御）を設定できます。イメージのスキャン機能（scan_on_push）を有効にすると、プッシュ時に脆弱性スキャンが自動実行されます。イメージタグのイミュータビリティを有効にすると、同じタグでイメージを上書きできなくなり、意図しないデプロイの防止に役立ちます。",
        code: `# --- ECRリポジトリ ---
resource "aws_ecr_repository" "app" {
  name                 = "\${var.project}-app"
  image_tag_mutability = "IMMUTABLE"  # タグの上書き禁止

  image_scanning_configuration {
    scan_on_push = true  # プッシュ時に脆弱性スキャン
  }

  encryption_configuration {
    encryption_type = "AES256"
  }

  tags = {
    Name = "\${var.project}-app"
  }
}

# --- ライフサイクルポリシー ---
resource "aws_ecr_lifecycle_policy" "app" {
  repository = aws_ecr_repository.app.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "未タグイメージを7日後に削除"
        selection = {
          tagStatus   = "untagged"
          countType   = "sinceImagePushed"
          countUnit   = "days"
          countNumber = 7
        }
        action = {
          type = "expire"
        }
      },
      {
        rulePriority = 2
        description  = "最新30イメージのみ保持"
        selection = {
          tagStatus     = "tagged"
          tagPrefixList = ["v"]
          countType     = "imageCountMoreThan"
          countNumber   = 30
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}

# --- ECRへのプッシュコマンド ---
output "ecr_push_commands" {
  value = <<-EOT
    # ECRログイン
    aws ecr get-login-password --region \${var.region} | \\
      docker login --username AWS --password-stdin \${aws_ecr_repository.app.repository_url}

    # ビルド & プッシュ
    docker build -t \${var.project}-app .
    docker tag \${var.project}-app:latest \${aws_ecr_repository.app.repository_url}:latest
    docker push \${aws_ecr_repository.app.repository_url}:latest
  EOT
}`,
      },
      {
        title: "CloudWatch Logs連携",
        content:
          "ECS FargateではコンテナのログをawslogsドライバーでCloudWatch Logsに自動転送できます。ロググループのリテンション期間を設定して古いログを自動削除し、コストを管理します。メトリクスフィルターを使うとログに特定のパターン（ERROR、Exception等）が含まれる場合にCloudWatchメトリクスを発行でき、アラームと組み合わせてSlack通知などを実現できます。CloudWatch Logs Insightsでは構造化クエリでログの集計・分析が可能です。",
        code: `# --- CloudWatch ロググループ ---
resource "aws_cloudwatch_log_group" "app" {
  name              = "/ecs/\${var.project}-app"
  retention_in_days = 30  # 30日間保持

  tags = {
    Name = "\${var.project}-app-logs"
  }
}

# --- メトリクスフィルター（エラー検知） ---
resource "aws_cloudwatch_log_metric_filter" "error_count" {
  name           = "\${var.project}-error-count"
  pattern        = "ERROR"
  log_group_name = aws_cloudwatch_log_group.app.name

  metric_transformation {
    name          = "ErrorCount"
    namespace     = "\${var.project}/Application"
    value         = "1"
    default_value = "0"
  }
}

# --- CloudWatch アラーム ---
resource "aws_cloudwatch_metric_alarm" "error_alarm" {
  alarm_name          = "\${var.project}-high-error-rate"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "ErrorCount"
  namespace           = "\${var.project}/Application"
  period              = 300  # 5分
  statistic           = "Sum"
  threshold           = 10
  alarm_description   = "5分間にエラーが10件以上発生"

  alarm_actions = [aws_sns_topic.alerts.arn]
}

# --- SNSトピック（通知先） ---
resource "aws_sns_topic" "alerts" {
  name = "\${var.project}-alerts"
}

resource "aws_sns_topic_subscription" "email" {
  topic_arn = aws_sns_topic.alerts.arn
  protocol  = "email"
  endpoint  = var.alert_email
}

# --- ECSサービスのCloudWatchダッシュボード ---
resource "aws_cloudwatch_dashboard" "ecs" {
  dashboard_name = "\${var.project}-ecs-dashboard"

  dashboard_body = jsonencode({
    widgets = [
      {
        type   = "metric"
        x      = 0
        y      = 0
        width  = 12
        height = 6
        properties = {
          metrics = [
            ["AWS/ECS", "CPUUtilization", "ClusterName", aws_ecs_cluster.main.name,
             "ServiceName", aws_ecs_service.app.name]
          ]
          period = 300
          title  = "ECS CPU Utilization"
        }
      }
    ]
  })
}`,
      },
    ],
  },

  // ── 実践・運用 ──
  {
    id: "modules",
    title: "モジュール設計",
    description: "再利用可能なモジュールの設計・環境分離・Terragrunt",
    category: "practice",
    sections: [
      {
        title: "モジュールの構造（main / variables / outputs）",
        content:
          "Terraformモジュールは再利用可能なインフラコンポーネントのパッケージです。標準的なモジュール構造はmain.tf（リソース定義）、variables.tf（入力変数）、outputs.tf（出力値）の3ファイルで構成されます。加えてversions.tf（プロバイダ要件）、README.md（ドキュメント）、examples/（使用例）を含めることが推奨されます。モジュールの設計原則として、(1) 単一責任：1つのモジュールは1つの機能に集中する、(2) 適切な抽象化レベル：細かすぎず大きすぎないサイズ、(3) 必要最小限のvariable：合理的なデフォルト値を設定する、(4) 有用なoutput：他モジュールが必要とする値を公開する、が重要です。",
        code: `# === modules/vpc/ ディレクトリ構成 ===
# modules/vpc/
# ├── main.tf          # リソース定義
# ├── variables.tf     # 入力変数
# ├── outputs.tf       # 出力値
# ├── versions.tf      # プロバイダ要件
# └── README.md        # ドキュメント

# --- modules/vpc/versions.tf ---
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
}

# --- modules/vpc/variables.tf ---
variable "project" {
  description = "プロジェクト名"
  type        = string
}

variable "environment" {
  description = "環境名（dev/stg/prod）"
  type        = string
}

variable "cidr_block" {
  description = "VPCのCIDRブロック"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "使用するAZのリスト"
  type        = list(string)
  default     = ["ap-northeast-1a", "ap-northeast-1c"]
}

variable "enable_nat_gateway" {
  description = "NAT Gatewayを作成するか"
  type        = bool
  default     = true
}

# --- modules/vpc/outputs.tf ---
output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "public_subnet_ids" {
  description = "パブリックサブネットIDのリスト"
  value       = aws_subnet.public[*].id
}

output "private_subnet_ids" {
  description = "プライベートサブネットIDのリスト"
  value       = aws_subnet.private[*].id
}`,
      },
      {
        title: "公開モジュールの活用",
        content:
          "Terraform Registryには多くの公開モジュールが登録されており、検証済みのベストプラクティスに基づいたインフラを簡単に構築できます。特にterraform-aws-modulesオーガニゼーションのモジュールはAWSの主要サービスをカバーしており、品質が高く広く使われています。バージョン制約（version = \"~> 5.0\"）を指定することで、意図しない破壊的変更を防ぐことが重要です。公開モジュールをそのまま使う場合と、ラッパーモジュールを作成して組織のポリシーに合わせてカスタマイズする場合があります。",
        code: `# --- VPCモジュール（公式） ---
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "\${var.project}-\${var.environment}"
  cidr = "10.0.0.0/16"

  azs             = ["ap-northeast-1a", "ap-northeast-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = var.environment != "prod"

  tags = local.common_tags
}

# --- EKSモジュール ---
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = "\${var.project}-\${var.environment}"
  cluster_version = "1.30"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets

  eks_managed_node_groups = {
    default = {
      instance_types = ["t3.medium"]
      min_size       = 2
      max_size       = 5
      desired_size   = 2
    }
  }

  tags = local.common_tags
}

# --- RDSモジュール ---
module "rds" {
  source  = "terraform-aws-modules/rds/aws"
  version = "~> 6.0"

  identifier = "\${var.project}-\${var.environment}"

  engine               = "postgres"
  engine_version       = "15.4"
  family               = "postgres15"
  major_engine_version = "15"
  instance_class       = "db.t3.micro"

  allocated_storage     = 20
  max_allocated_storage = 100

  db_name  = "appdb"
  username = "dbadmin"
  port     = 5432

  multi_az               = var.environment == "prod"
  db_subnet_group_name   = module.vpc.database_subnet_group_name
  vpc_security_group_ids = [aws_security_group.db.id]

  backup_retention_period = 7
  deletion_protection     = var.environment == "prod"

  tags = local.common_tags
}`,
      },
      {
        title: "環境別構成（dev / stg / prod）",
        content:
          "複数環境（dev/stg/prod）を管理する方法は主に3つあります。(1) Workspace方式：terraform workspaceコマンドで環境を切り替え、terraform.workspaceの値で設定を分岐させます。シンプルですが、環境間の差異が大きい場合は管理が複雑になります。(2) ディレクトリ分離方式：environments/dev/、environments/stg/、environments/prod/のようにディレクトリを分け、それぞれからモジュールを呼び出します。環境ごとの独立性が高く、最も広く使われている方式です。(3) tfvarsファイル方式：環境ごとのtfvarsファイル（dev.tfvars、prod.tfvars）を使い、apply時に-var-fileで切り替えます。",
        code: `# === ディレクトリ分離方式（推奨） ===
# project/
# ├── modules/
# │   ├── vpc/
# │   ├── ecs/
# │   └── rds/
# ├── environments/
# │   ├── dev/
# │   │   ├── main.tf
# │   │   ├── variables.tf
# │   │   ├── terraform.tfvars
# │   │   └── backend.tf
# │   ├── stg/
# │   │   ├── main.tf
# │   │   ├── variables.tf
# │   │   ├── terraform.tfvars
# │   │   └── backend.tf
# │   └── prod/
# │       ├── main.tf
# │       ├── variables.tf
# │       ├── terraform.tfvars
# │       └── backend.tf

# --- environments/dev/main.tf ---
module "vpc" {
  source = "../../modules/vpc"

  project            = var.project
  environment        = "dev"
  cidr_block         = "10.0.0.0/16"
  enable_nat_gateway = false  # dev環境はNAT不要
}

module "app" {
  source = "../../modules/ecs"

  project       = var.project
  environment   = "dev"
  desired_count = 1
  instance_type = "t3.micro"
  vpc_id        = module.vpc.vpc_id
  subnet_ids    = module.vpc.private_subnet_ids
}

# --- environments/dev/terraform.tfvars ---
# project = "my-app"
# region  = "ap-northeast-1"

# --- environments/prod/terraform.tfvars ---
# project = "my-app"
# region  = "ap-northeast-1"

# --- environments/dev/backend.tf ---
terraform {
  backend "s3" {
    bucket         = "my-app-terraform-state"
    key            = "env/dev/terraform.tfstate"
    region         = "ap-northeast-1"
    dynamodb_table = "terraform-state-lock"
    encrypt        = true
  }
}

# === Workspace方式 ===
# terraform workspace new dev
# terraform workspace new prod
# terraform workspace select dev
# terraform apply -var-file="\${terraform.workspace}.tfvars"`,
      },
      {
        title: "Terragrunt入門",
        content:
          "TerragruntはGruntwork社が開発したTerraformのラッパーツールです。Terraformのコードを複数環境で運用する際のDRY（Don't Repeat Yourself）原則を実現します。主な機能として、(1) バックエンド設定の自動生成：環境ごとにbackend設定を記述する手間を省きます。(2) 依存関係の管理：モジュール間の依存関係を宣言的に記述し、適切な順序で実行します。(3) 入力変数のカスケード：親ディレクトリのterragrunt.hclから子ディレクトリへ変数を継承できます。(4) run-all：複数モジュールを一括でplan/applyできます。",
        code: `# === Terragruntのディレクトリ構成 ===
# live/
# ├── terragrunt.hcl          # ルート設定
# ├── dev/
# │   ├── env.hcl             # 環境固有の変数
# │   ├── vpc/
# │   │   └── terragrunt.hcl
# │   ├── ecs/
# │   │   └── terragrunt.hcl
# │   └── rds/
# │       └── terragrunt.hcl
# └── prod/
#     ├── env.hcl
#     ├── vpc/
#     │   └── terragrunt.hcl
#     └── ...

# --- live/terragrunt.hcl（ルート） ---
remote_state {
  backend = "s3"
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite_terragrunt"
  }
  config = {
    bucket         = "my-app-terraform-state"
    key            = "\${path_relative_to_include()}/terraform.tfstate"
    region         = "ap-northeast-1"
    dynamodb_table = "terraform-state-lock"
    encrypt        = true
  }
}

generate "provider" {
  path      = "provider.tf"
  if_exists = "overwrite_terragrunt"
  contents  = <<EOF
provider "aws" {
  region = "ap-northeast-1"
}
EOF
}

# --- live/dev/env.hcl ---
locals {
  environment = "dev"
  project     = "my-app"
}

# --- live/dev/vpc/terragrunt.hcl ---
include "root" {
  path = find_in_parent_folders()
}

locals {
  env_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
}

terraform {
  source = "../../../modules/vpc"
}

inputs = {
  project            = local.env_vars.locals.project
  environment        = local.env_vars.locals.environment
  cidr_block         = "10.0.0.0/16"
  enable_nat_gateway = false
}

# --- live/dev/ecs/terragrunt.hcl ---
include "root" {
  path = find_in_parent_folders()
}

dependency "vpc" {
  config_path = "../vpc"
}

terraform {
  source = "../../../modules/ecs"
}

inputs = {
  vpc_id     = dependency.vpc.outputs.vpc_id
  subnet_ids = dependency.vpc.outputs.private_subnet_ids
}

# Terragruntコマンド
# terragrunt plan            # 単一モジュール
# terragrunt run-all plan    # 全モジュール一括
# terragrunt run-all apply   # 全モジュール一括適用`,
      },
    ],
  },
  {
    id: "cicd-terraform",
    title: "CI/CDとベストプラクティス",
    description: "GitHub ActionsでのCI/CD・セキュリティ・チーム運用",
    category: "practice",
    sections: [
      {
        title: "GitHub ActionsでのTerraform CI",
        content:
          "GitHub Actionsを使ってTerraformのCI/CDパイプラインを構築できます。一般的なワークフローは、(1) PRが作成されたらterraform planを自動実行してPRコメントに結果を投稿、(2) mainブランチへのマージ時にterraform applyを自動実行する流れです。AWSの認証にはOIDC（OpenID Connect）を使うことで、長期的なアクセスキーの管理が不要になります。hashicorp/setup-terraformアクションでTerraformをインストールし、terraform planの出力をPRコメントとして自動投稿する仕組みを組み込みます。",
        code: `# .github/workflows/terraform.yml
name: Terraform CI/CD

on:
  pull_request:
    branches: [main]
    paths: ['infrastructure/**']
  push:
    branches: [main]
    paths: ['infrastructure/**']

permissions:
  id-token: write   # OIDC認証用
  contents: read
  pull-requests: write  # PRコメント用

env:
  TF_WORKING_DIR: infrastructure/environments/dev
  AWS_REGION: ap-northeast-1

jobs:
  plan:
    name: Terraform Plan
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4

      # OIDC認証でAWSにアクセス
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/github-actions-terraform
          aws-region: \${{ env.AWS_REGION }}

      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: 1.9.0

      - name: Terraform Init
        run: terraform init
        working-directory: \${{ env.TF_WORKING_DIR }}

      - name: Terraform Plan
        id: plan
        run: terraform plan -no-color -out=tfplan
        working-directory: \${{ env.TF_WORKING_DIR }}

      # PRにplan結果をコメント
      - uses: actions/github-script@v7
        with:
          script: |
            const output = \`#### Terraform Plan
            \\\`\\\`\\\`
            \${{ steps.plan.outputs.stdout }}
            \\\`\\\`\\\`
            \`;
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: output
            });

  apply:
    name: Terraform Apply
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    environment: production
    steps:
      - uses: actions/checkout@v4
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/github-actions-terraform
          aws-region: \${{ env.AWS_REGION }}
      - uses: hashicorp/setup-terraform@v3
      - run: terraform init
        working-directory: \${{ env.TF_WORKING_DIR }}
      - run: terraform apply -auto-approve
        working-directory: \${{ env.TF_WORKING_DIR }}`,
      },
      {
        title: "terraform planの自動レビュー",
        content:
          "terraform planの結果を自動的にレビューする仕組みを導入することで、インフラ変更の品質と安全性を向上できます。PRコメントへのplan結果投稿に加えて、(1) 破壊的変更（destroy）の検知と警告、(2) plan結果のアーティファクト保存、(3) コスト見積もり（infracost）の統合、(4) ポリシーチェック（OPA/Sentinel）の実行が効果的です。infracostはTerraformの変更によるクラウドコストの増減を見積もるツールで、PRコメントにコスト差分を自動投稿できます。",
        code: `# --- infracost（コスト見積もり）の統合 ---
# .github/workflows/infracost.yml
name: Infracost

on:
  pull_request:
    paths: ['infrastructure/**']

jobs:
  infracost:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: actions/checkout@v4

      - name: Setup Infracost
        uses: infracost/actions/setup@v3
        with:
          api-key: \${{ secrets.INFRACOST_API_KEY }}

      - name: Generate Infracost diff
        run: |
          infracost diff \\
            --path=infrastructure/environments/dev \\
            --format=json \\
            --out-file=/tmp/infracost.json

      - name: Post Infracost comment
        uses: infracost/actions/comment@v3
        with:
          path: /tmp/infracost.json
          behavior: update

# --- OPA（Open Policy Agent）でポリシーチェック ---
# policy/terraform.rego
# package terraform
#
# deny[msg] {
#   resource := input.resource_changes[_]
#   resource.type == "aws_s3_bucket"
#   not resource.change.after.server_side_encryption_configuration
#   msg := sprintf("S3バケット '%s' に暗号化が設定されていません", [resource.address])
# }
#
# deny[msg] {
#   resource := input.resource_changes[_]
#   resource.type == "aws_security_group_rule"
#   resource.change.after.cidr_blocks[_] == "0.0.0.0/0"
#   resource.change.after.from_port == 22
#   msg := "SSH(22)をフルオープン(0.0.0.0/0)にしないでください"
# }

# plan結果をJSON出力してOPAでチェック
# terraform plan -out=tfplan
# terraform show -json tfplan > tfplan.json
# opa eval --data policy/ --input tfplan.json "data.terraform.deny"`,
      },
      {
        title: "セキュリティ（tfsec / checkov）",
        content:
          "Terraformコードのセキュリティ静的解析ツールとしてtfsecとcheckovが広く使われています。tfsecはAqua Security（現Trivy）が開発したツールで、Terraformコードに対して数百のセキュリティルールをチェックします。S3バケットの暗号化漏れ、セキュリティグループのフルオープン、IAMポリシーのワイルドカード使用などを検出できます。checkovはBridgecrew社が開発したマルチフレームワーク対応のスキャナで、Terraform以外にもCloudFormation、Kubernetes、Dockerfileなどもスキャン可能です。CI/CDパイプラインに組み込むことで、セキュリティ上の問題があるコードのマージを防止できます。",
        code: `# --- tfsec（Trivy）によるスキャン ---
# インストール
brew install tfsec
# または Trivy（tfsecの後継）
brew install trivy

# スキャン実行
tfsec .
# trivy config .

# 出力例:
# Result 1
# [AWS018] Resource 'aws_security_group_rule.web_ssh'
#   allows ingress from 0.0.0.0/0 to port 22
#
# Result 2
# [AWS002] Resource 'aws_s3_bucket.data'
#   does not have encryption enabled

# 特定ルールの無視（コード内アノテーション）
resource "aws_security_group_rule" "web_http" {
  #tfsec:ignore:aws-ec2-no-public-ingress-sgr
  type        = "ingress"
  from_port   = 80
  to_port     = 80
  protocol    = "tcp"
  cidr_blocks = ["0.0.0.0/0"]  # HTTPは許可
  security_group_id = aws_security_group.web.id
}

# --- checkov によるスキャン ---
# インストール
pip install checkov

# スキャン実行
checkov -d .
checkov -f main.tf

# 特定チェックのスキップ
# checkov -d . --skip-check CKV_AWS_18,CKV_AWS_19

# --- GitHub Actions への統合 ---
# .github/workflows/security.yml
# name: Security Scan
# on:
#   pull_request:
#     paths: ['infrastructure/**']
# jobs:
#   tfsec:
#     runs-on: ubuntu-latest
#     steps:
#       - uses: actions/checkout@v4
#       - name: Run Trivy
#         uses: aquasecurity/trivy-action@master
#         with:
#           scan-type: 'config'
#           scan-ref: 'infrastructure/'
#           exit-code: '1'
#           severity: 'HIGH,CRITICAL'
#
#   checkov:
#     runs-on: ubuntu-latest
#     steps:
#       - uses: actions/checkout@v4
#       - name: Run Checkov
#         uses: bridgecrewio/checkov-action@master
#         with:
#           directory: infrastructure/
#           framework: terraform
#           soft_fail: false`,
      },
      {
        title: "チーム運用のベストプラクティス",
        content:
          "チームでTerraformを運用する際のベストプラクティスをまとめます。(1) コード構成：小さなモジュールに分割し、blast radius（影響範囲）を小さくする。環境ごとにStateファイルを分離する。(2) ブランチ戦略：feature branchでplanを実行し、PRレビュー後にmainマージでapply。直接mainへのプッシュは禁止する。(3) State管理：リモートバックエンドを使い、State Lockingを有効化する。手動でのState編集は極力避ける。(4) シークレット管理：tfvarsにパスワードを記載しない。AWS Secrets Manager/SSM Parameter Storeを使う。(5) 命名規則の統一：リソース名にプロジェクト名・環境名のプレフィックスを付ける。(6) ドキュメント化：terraform-docsでREADME.mdを自動生成する。",
        code: `# --- terraform-docs でドキュメント自動生成 ---
# インストール
brew install terraform-docs

# README.md の自動生成
terraform-docs markdown table ./modules/vpc > ./modules/vpc/README.md

# pre-commitフック設定
# .pre-commit-config.yaml
# repos:
#   - repo: https://github.com/antonbabenko/pre-commit-terraform
#     rev: v1.92.0
#     hooks:
#       - id: terraform_fmt
#       - id: terraform_validate
#       - id: terraform_tflint
#       - id: terraform_docs
#         args: ['--args=--output-file=README.md']
#       - id: terraform_tfsec

# --- .tflint.hcl（リンター設定） ---
# plugin "aws" {
#   enabled = true
#   version = "0.31.0"
#   source  = "github.com/terraform-linters/tflint-ruleset-aws"
# }
#
# rule "terraform_naming_convention" {
#   enabled = true
#   format  = "snake_case"
# }
#
# rule "terraform_documented_variables" {
#   enabled = true
# }

# --- チーム運用のディレクトリ構成例 ---
# terraform-infra/
# ├── .github/
# │   └── workflows/
# │       ├── terraform-plan.yml
# │       └── terraform-apply.yml
# ├── .pre-commit-config.yaml
# ├── .tflint.hcl
# ├── modules/
# │   ├── vpc/
# │   ├── ecs/
# │   ├── rds/
# │   └── monitoring/
# ├── environments/
# │   ├── dev/
# │   ├── stg/
# │   └── prod/
# ├── policies/              # OPAポリシー
# │   └── terraform.rego
# └── scripts/
#     ├── setup-backend.sh   # バックエンド初期構築
#     └── import-resources.sh # 既存リソース取り込み

# --- Makefileでコマンド簡略化 ---
# Makefile
# ENV ?= dev
# DIR = environments/$(ENV)
#
# .PHONY: init plan apply destroy fmt lint
#
# init:
# 	cd $(DIR) && terraform init
#
# plan:
# 	cd $(DIR) && terraform plan -out=tfplan
#
# apply:
# 	cd $(DIR) && terraform apply tfplan
#
# destroy:
# 	cd $(DIR) && terraform destroy
#
# fmt:
# 	terraform fmt -recursive
#
# lint:
# 	tflint --recursive
# 	tfsec .
#
# docs:
# 	find modules -name '*.tf' -exec dirname {} \\; | sort -u | \\
# 	  xargs -I{} terraform-docs markdown table {} > {}/README.md`,
      },
    ],
  },
];
