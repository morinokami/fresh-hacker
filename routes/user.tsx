import { Handlers, PageProps } from "$fresh/server.ts";
import { type User } from "@/utils/types.ts";
import { getUser } from "@/utils/data.ts";

export const handler: Handlers<User> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return ctx.renderNotFound();
    }
    const user = await getUser(id);
    return ctx.render(user);
  }
}

export default function UserPage(props: PageProps<User>) {
  const { data: user } = props;

  return (
    <>
      <div>{JSON.stringify(user)}</div>
    </>
  )
}
