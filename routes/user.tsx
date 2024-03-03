import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { type User } from "@/utils/types.ts";
import { getUser } from "@/utils/data.ts";
import { DESCRIPTION, SITE_TITLE } from "@/utils/constants.ts";
import { PageHead } from "@/components/PageHead.tsx";

export const handler: Handlers<User> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return ctx.renderNotFound();
    }
    const user = await getUser(id);
    return ctx.render(user);
  },
};

export default function UserPage(props: PageProps<User>) {
  const { data: user } = props;

  return (
    <>
      <PageHead
        title={`${SITE_TITLE} | ${user.id}`}
        description={DESCRIPTION}
        url={props.url.href}
      />
      <div class="bg-white pt-1 pb-3 px-3">
        <ul class="my-1 text-sm">
          <li>
            <span class="inline-block min-w-[3.5rem]">User:</span> {user.id}
          </li>
          <li>
            <span class="inline-block min-w-[3.5rem]">Created:</span>{" "}
            {user.created_at}
          </li>
          <li>
            <span class="inline-block min-w-[3.5rem]">Karma:</span> {user.karma}
          </li>
        </ul>
        <p class="pt-2 text-sm">
          <a
            class="underline"
            href={`https://news.ycombinator.com/submitted?id=${user.id}`}
          >
            submissions
          </a>{" "}
          |{" "}
          <a
            class="underline"
            href={`https://news.ycombinator.com/threads?id=${user.id}`}
          >
            comments
          </a>{" "}
          |{" "}
          <a
            class="underline"
            href={`https://news.ycombinator.com/favorites?id=${user.id}`}
          >
            favorites
          </a>
        </p>
      </div>
    </>
  );
}
