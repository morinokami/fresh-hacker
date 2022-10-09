import { type Item, type ItemRaw, User, UserRaw } from "@/utils/types.ts";

const API_BASE = "https://hacker-news.firebaseio.com/v0";

export async function getItems(): Promise<Item[]> {
  const resp = await fetch(
    `${API_BASE}/topstories.json`,
  );
  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`${resp.status} ${body}`);
  }
  const itemIds = Object.values(await resp.json()).slice(0, 30) as number[];
  return await Promise.all(
    itemIds.map((id) => fetchItem(id)),
  );
}

export async function getItem(id: number): Promise<Item> {
  const item = await fetchItem(id, true);
  return item;
}

export async function getUser(id: string): Promise<User> {
  const user = await fetchUser(id);
  return user;
}

async function fetchItem(
  id: number,
  withComments = false,
): Promise<Item> {
  const resp = await fetch(
    `${API_BASE}/item/${id}.json`,
  );
  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`${resp.status} ${body}`);
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

async function fetchUser(id: string): Promise<User> {
  const resp = await fetch(`${API_BASE}/user/${id}.json`);
  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`${resp.status} ${body}`);
  }

  const user = await resp.json() as UserRaw;
  return {
    id: user.id,
    created_at: user.created,
    karma: user.karma,
  };
}

export function getUrl(item: Item) {
  return item.url && isAbsolute(item.url) ? item.url : `/item?id=${item.id}`;
}

export function isAbsolute(url: string) {
  return /^https?:\/\//.test(url);
}

export function host(url: string) {
  const host = url.replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(
    "?id=",
    "/",
  );
  const parts = host.split(".").slice(-3);
  if (parts[0] === "www") parts.shift();
  return parts.join(".");
}

export function timeAgo(time: number | Date) {
  const between = Date.now() / 1000 - Number(time);
  if (between < 3600) return pluralize(~~(between / 60), " minute");
  else if (between < 86400) return pluralize(~~(between / 3600), " hour");
  else return pluralize(~~(between / 86400), " day");
}

export function pluralize(time: number, label: string) {
  if (time === 1) return time + label;
  return `${time + label}s`;
}
