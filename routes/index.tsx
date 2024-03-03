import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Footer } from "@/components/Footer.tsx";
import { ItemSummary } from "@/components/ItemSummary.tsx";
import { type Item } from "@/utils/types.ts";
import { getItems } from "@/utils/data.ts";
import { DESCRIPTION, SITE_TITLE } from "@/utils/constants.ts";

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
      <Head>
        <title>{SITE_TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content={SITE_TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={props.url.href} />
        <meta property="og:image" content="/ogp.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@onDemocracy" />
        <meta name="twitter:title" content={SITE_TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content="/ogp.png" />
      </Head>
      <div class="bg-white pt-1 pb-3 px-3">
        {items.map((item) => <ItemSummary item={item} />)}
      </div>
      <Footer />
    </>
  );
}
