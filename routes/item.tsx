import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Footer } from "@/components/Footer.tsx";
import { ItemSummary } from "@/components/ItemSummary.tsx";
import Comments from "@/islands/Comments.tsx";
import { type Item } from "@/utils/types.ts";
import { getItem } from "@/utils/data.ts";
import { DESCRIPTION, SITE_TITLE } from "@/utils/constants.ts";
import { PageHead } from "@/components/PageHead.tsx";

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
      <PageHead
        title={`${SITE_TITLE} | ${item.title}`}
        description={DESCRIPTION}
        url={props.url.href}
      />
      <div class="bg-white pt-1 pb-3 px-3">
        <div class="divide-y space-y-3">
          <ItemSummary item={item} />
          <Comments comments={item.comments} />
        </div>
      </div>
      <Footer />
    </>
  );
}
