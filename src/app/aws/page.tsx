import type { Metadata } from "next";
import ClientPage from "./_client";

export const metadata: Metadata = {
  title: "AWS学習 | Java学習サイト",
  description:
    "AWSの主要サービスを体系的に学習。EC2、S3、Lambda、VPC、IAM、ECS、CloudFormation、CloudWatch、Bedrock、Well-Architectedまで幅広くカバー。",
};

export default function Page() {
  return <ClientPage />;
}
