import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Footer } from "@/components/Footer.tsx";
import { ItemSummary } from "@/components/ItemSummary.tsx";
import { Comments } from "@/components/Comments.tsx";
import { type Item } from "@/utils/types.ts";
import { getItem } from "../utils/data.ts";

const TITLE = "Fresh - Hacker News";
const DESCRIPTION = "Hacker News clone made with Fresh";

export const handler: Handlers<Item> = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return ctx.renderNotFound();
    }
    const item = await getItem(Number(id));
    return ctx.render(item);
  },
};

export default function ItemPage(props: PageProps<Item>) {
  const { data: item } = props;
  return (
    <>
      <Head>
        <title>{TITLE} | {item.title}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content={`${TITLE} | ${item.title}`} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={props.url.href} />
        {/* TODO: <meta property="og:image" content={ogImageUrl} /> */}
      </Head>
      <div class="bg-white pt-1 px-3">
        <div class="divide-y-1 space-y-3">
          <ItemSummary item={item} />
          <Comments comments={item.comments} />
        </div>
        <div class="h-3" />
      </div>
      <Footer />
    </>
  );
}
