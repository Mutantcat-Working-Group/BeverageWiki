import { readDrink, listDrinks } from "@/lib/drinks";
import { pickLocale } from "@/lib/i18n";
import { Metadata } from "next";
import { remark } from "remark";
import html from "remark-html";
import Header from "@/components/Header";
import DrinkDetail from "./Detail.client";
import GiscusComments from "@/components/GiscusComments";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const drinks = await listDrinks();
  return drinks.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await readDrink(slug);
  const titleLS = data?.frontmatter.title as any;
  const title = pickLocale(titleLS, "zh") || pickLocale(titleLS, "en") || slug;
  return { title };
}

export default async function DrinkPage({ params }: Props) {
  const { slug } = await params;
  const data = await readDrink(slug);
  if (!data) return <div className="p-6">Not found</div>;

  const title = pickLocale((data.frontmatter.title as any) || {}, "zh") ||
    pickLocale((data.frontmatter.title as any) || {}, "en") || slug;

  // For demo: render the body markdown to HTML
  const processed = await remark().use(html).process(data.content || "");
  const contentHtml = processed.toString();

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-12">
      <Header title={"BeverageWiki"} />
      <div className="max-w-3xl mx-auto px-0 sm:px-2">
        <DrinkDetail frontmatter={data.frontmatter as any} contentHtml={contentHtml} />
        <GiscusComments />
      </div>
    </div>
  );
}
