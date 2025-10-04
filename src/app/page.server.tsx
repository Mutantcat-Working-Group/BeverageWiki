import { listDrinks } from "@/lib/drinks";
import DrinksExplorer from "./parts/DrinksExplorer";

export const revalidate = 60; // ISR: refresh list every 60s

export default async function PageServer() {
  const drinks = await listDrinks();
  return <DrinksExplorer drinks={drinks} />;
}
