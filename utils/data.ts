import { type Item, type ItemRaw } from "@/utils/types.ts";

const API_BASE = "https://hacker-news.firebaseio.com/v0";

async function fetchItem(
  id: number,
  withComments = false,
): Promise<Item> {
  const resp = await fetch(
    `${API_BASE}/item/${id}.json`,
  );
  if (!resp.ok) {
    // TODO: handle error
  }
  const item = await resp.json() as ItemRaw;
  item.kids = item.kids || [];
  return {
    id: item.id,
    user: item.by,
    points: item.score,
    time: item.time,
    content: item.text,
    url: item.url,
    type: item.type,
    title: item.title,
    comments_count: Object.values(item.kids).length,
    comments: withComments
      ? await Promise.all(
        Object.values(item.kids).map((id) => fetchItem(id, withComments)),
      )
      : [],
  };
}

export async function getItems(): Promise<Item[]> {
  const resp = await fetch(
    `${API_BASE}/topstories.json`,
  );
  if (!resp.ok) {
      // TODO: handle error
    }
  const itemIds = Object.values(await resp.json()).slice(0, 30) as number[];
  return await Promise.all(
    itemIds.map((id) => fetchItem(id)),
  );
}
