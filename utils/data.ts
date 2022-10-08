import { type Item } from "@/utils/types.ts";
import { fetchItem } from "@/routes/api/hn/item.ts";

const API_URL = Deno.env.get("API_URL") || "http://localhost:8000/api";

export async function getItems(): Promise<Item[]> {
  // TODO: not working on Deno Deploy
  // const resp = await fetch(`${API_URL}/hn/items`);

  const resp = await fetch(
    "https://hacker-news.firebaseio.com/v0/topstories.json",
  );
  const items = Object.values(await resp.json()).slice(0, 30) as number[];
  return await Promise.all(
    items.map((id) => fetchItem(id)),
  );
}
