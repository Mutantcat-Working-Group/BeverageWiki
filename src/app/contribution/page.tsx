import type { Metadata } from "next";
import Header from "@/components/Header";
import ContributionClient from "./Contribution.client";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "贡献 | BeverageWiki",
  description: "参与 BeverageWiki：程序员通过 GitHub 提交 PR，非开发者可在页面底部评论区提交饮料信息。",
};

export default async function ContributionPage() {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-12">
      <Header title={"BeverageWiki"} />
      <ContributionClient />
    </div>
  );
}
