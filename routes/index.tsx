import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Header } from "@/components/Header.tsx";
import { Footer } from "@/components/Footer.tsx";
import { Item } from "@/utils/types.ts";

const TITLE = "Fresh - Hacker News";
const DESCRIPTION = "Hacker News clone made with Fresh";

export const handler: Handlers<Item[]> = {
  async GET(req, ctx) {
    const items = await fetch(`${req.url}api/hn/items`);
    return ctx.render(await items.json() as Item[]);
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
      <div class="mx-auto md:p-2 md:w-[85%]">
        <Header />
        <div>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                {JSON.stringify(item)}
              </li>
            ))}
          </ul>
          <Footer />
        </div>
      </div>
    </>
  );
}
