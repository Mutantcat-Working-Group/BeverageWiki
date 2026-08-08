import { MetadataRoute } from "next";
import { listDrinks } from "@/lib/drinks";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = "https://beverage.wiki";

  const drinks = await listDrinks();

  const drinkPages: MetadataRoute.Sitemap = drinks.map((d) => ({
    url: `${siteUrl}/drink/${d.slug}/`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/contribution/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    ...drinkPages,
  ];
}
