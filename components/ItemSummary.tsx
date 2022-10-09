import { type Item } from "@/utils/types.ts";
import { getUrl, host, timeAgo } from "@/utils/data.ts";

type ItemSummaryProps = {
  item: Item;
};

export function ItemSummary(props: ItemSummaryProps) {
  const { item } = props;

  return (
    <div>
      <div class="my-1">
        <span class="cursor-pointer mr-1 text-sm text-gray-300">▲</span>
        <span class="mr-1 text-sm">
          <a href={getUrl(item)}>{item.title}</a>
        </span>
        <span class="text-xs text-gray-500">
          {item.url ? `(${host(item.url)})` : ""}
        </span>
      </div>
      <div class="text-xs text-gray-500">
        {item.points} point{item.points > 1 ? "s" : ""} by{" "}
        <a class="hover:underline" href={`/user?id=${item.user}`}>
          {item.user}
        </a>{" "}
        {timeAgo(item.time)} ago |{" "}
        <a class="hover:underline" href={`/item?id=${item.id}`}>
          {item.comments_count}{" "}
          comment{item.comments_count && item.comments_count === 1 ? "" : "s"}
        </a>
      </div>
    </div>
  );
}
