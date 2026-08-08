import { readDrink, listDrinks } from "@/lib/drinks";
import { remark } from "remark";
import html from "remark-html";
import Header from "@/components/Header";
import GiscusComments from "@/components/GiscusComments";
import DrinkDetail from "./Detail.client";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const drinks = await listDrinks();
  return drinks.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const data = await readDrink(slug);
  const title = data?.locales[data.defaultLocale]?.frontmatter.title || slug;
  return { title };
}

export default async function DrinkPage({ params }: Props) {
  const { slug } = await params;
  const data = await readDrink(slug);
  if (!data) return <div className="p-6">Not found</div>;

  // Render markdown for each locale
  const renderedLocales: Record<string, { frontmatter: any; contentHtml: string }> = {};

  for (const [locale, { frontmatter, content }] of Object.entries(data.locales)) {
    const processed = await remark().use(html).process(content || "");
    renderedLocales[locale] = {
      frontmatter,
      contentHtml: processed.toString(),
    };
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-12">
      <Header title={"BeverageWiki"} />
      <div className="max-w-3xl mx-auto px-0 sm:px-2">
        <DrinkDetail
          locales={renderedLocales}
          defaultLocale={data.defaultLocale}
        />
        <div className="mt-10">
          <GiscusComments />
        </div>
      </div>
    </div>
  );
}
