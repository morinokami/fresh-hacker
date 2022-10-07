import { Handlers } from "$fresh/server.ts";
import { fetchItem } from "./item.ts";

export const handler: Handlers = {
  async GET() {
    const resp = await fetch(
      "https://hacker-news.firebaseio.com/v0/topstories.json",
    );
    if (!resp.ok) {
      // TODO: handle error
    }
    const items = Object.values(await resp.json()).slice(0, 30) as number[];
    return new Response(
      JSON.stringify(
        await Promise.all(
          items.map((id) => fetchItem(id)),
        ),
      ),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  },
};
