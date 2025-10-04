import { listDrinks } from "@/lib/drinks";
import DrinksExplorer from "./parts/DrinksExplorer";
import type { Metadata } from "next";

export const revalidate = 60; // ISR: refresh list every 60s

export const metadata: Metadata = {
  title: "饮料百科 | BeverageWiki",
  description: "发现与搜索饮料条目，支持中英双语的 BeverageWiki。",
  openGraph: {
    title: "饮料百科 | BeverageWiki",
    description: "发现与搜索饮料条目，支持中英双语的 BeverageWiki。",
    url: "/",
    type: "website",
  },
  twitter: {
    title: "饮料百科 | BeverageWiki",
    description: "发现与搜索饮料条目，支持中英双语的 BeverageWiki。",
    card: "summary_large_image",
  },
};

export default async function PageServer() {
  const drinks = await listDrinks();
  return <DrinksExplorer drinks={drinks} />;
}
