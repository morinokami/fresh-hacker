import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Footer } from "@/components/Footer.tsx";
import { ItemSummary } from "@/components/ItemSummary.tsx";
import { type Item } from "@/utils/types.ts";
import { getItems } from "@/utils/data.ts";

const TITLE = "Fresh - Hacker News";
const DESCRIPTION = "Hacker News clone made with Fresh";

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
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={props.url.href} />
        {/* TODO: <meta property="og:image" content={ogImageUrl} /> */}
      </Head>
      <div class="bg-white pt-1 px-3">
        {items.map((item) => <ItemSummary item={item} />)}
        <div class="h-3" />
      </div>
      <Footer />
    </>
  );
}
