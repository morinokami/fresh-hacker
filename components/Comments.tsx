import { type Item } from "@/utils/types.ts";

type CommentsProps = {
  comments?: Item[];
};

// TODO: Open/Close
export function Comments(props: CommentsProps) {
  const { comments } = props;
  return (
    comments && comments.length > 0
      ? (
        <div>
          {comments.map((comment) => (
            <>
              <div class="text-xs text-gray-500 pt-2 pb-1">
                <span class="cursor-pointer mr-1 text-sm text-gray-300">▲</span>
                {comment.user} {timeAgo(comment.time)} ago [-]
              </div>
              <div
                class="text-[0.825rem] break-words"
                dangerouslySetInnerHTML={{ __html: comment.content ?? "" }}
              />
              <div class="pl-5">
                <Comments comments={comment.comments} />
              </div>
            </>
          ))}
        </div>
      )
      : null
  );
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
