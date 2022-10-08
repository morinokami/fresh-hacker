import { type Item } from "@/utils/types.ts";

type ListItemProps = {
  item: Item;
};

export function ListItem(props: ListItemProps) {
  const { item } = props;
  return (
    <li class="my-1">
      <div>
        <span class="cursor-pointer mr-1 text-sm text-gray-300">▲</span>
        <span class="mr-1 text-sm"><a href={getUrl(item)}>{item.title}</a></span>
        <span class="text-xs text-gray-500">({host(item.url ?? "")})</span>
      </div>
      <div class="text-xs text-gray-500">
        {item.points} point{item.points > 1 ? "s" : ""} by {item.user}{" "}
        {timeAgo(item.time)} ago |{" "}
        <a class="hover:underline" href={`/item?id=${item.id}`}>{item.comments_count} comments</a>
      </div>
    </li>
  );
}

function getUrl(item: Item) {
  return item.url && isAbsolute(item.url) ? item.url : `/item?id=${item.id}`;
}

function isAbsolute (url: string) {
  return /^https?:\/\//.test(url)
}

function host(url: string) {
  const host = url.replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(
    "?id=",
    "/",
  );
  const parts = host.split(".").slice(-3);
  if (parts[0] === "www") parts.shift();
  return parts.join(".");
}

function timeAgo(time: number | Date) {
  const between = Date.now() / 1000 - Number(time);
  if (between < 3600) return pluralize(~~(between / 60), " minute");
  else if (between < 86400) return pluralize(~~(between / 3600), " hour");
  else return pluralize(~~(between / 86400), " day");
}

function pluralize(time: number, label: string) {
  if (time === 1) return time + label;
  return `${time + label}s`;
}
