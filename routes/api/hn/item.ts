import { Handlers } from "$fresh/server.ts";
import { type Item, type ItemRaw } from "@/utils/types.ts";

export async function fetchItem(
  id: number,
  withComments = false,
): Promise<Item> {
  const resp = await fetch(
    `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
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

export const handler: Handlers = {
  async GET() {
    return new Response("TODO");
  },
};
