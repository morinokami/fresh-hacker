import { Handlers, PageProps } from "$fresh/server.ts";
import { Footer } from "@/components/Footer.tsx";
import { ItemSummary } from "@/components/ItemSummary.tsx";
import { type Item } from "@/utils/types.ts";
import { getItems } from "@/utils/data.ts";
import { DESCRIPTION, SITE_TITLE } from "@/utils/constants.ts";
import { PageHead } from "@/components/PageHead.tsx";

export const handler: Handlers<Item[]> = {
  async GET(_req, ctx) {
    const items = await getItems();
    return ctx.render(items);
  },
};

export default function Home(props: PageProps<Item[]>) {
  const { data: items } = props;

  return (
    <>
      <PageHead
        title={SITE_TITLE}
        description={DESCRIPTION}
        url={props.url.href}
      />
      <div class="bg-white pt-1 pb-3 px-3">
        {items.map((item) => <ItemSummary item={item} />)}
      </div>
      <Footer />
    </>
  );
}
