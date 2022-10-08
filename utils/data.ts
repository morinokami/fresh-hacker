import { type Item } from "@/utils/types.ts";

const API_URL = Deno.env.get("API_URL") || "http://localhost:8000/api";

export async function getItems(): Promise<Item[]> {
  const resp = await fetch(`${API_URL}/hn/items`);
  return await resp.json();
}
