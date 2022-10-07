import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";
import { Header } from "../components/Header.tsx";
import { Footer } from "../components/Footer.tsx";

const TITLE = "Fresh - Hacker News";
const DESCRIPTION = "Hacker News clone made with Fresh";

export default function Home(props: PageProps) {
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
            <li>item1</li>
            <li>item2</li>
            <li>item3</li>
            <li>item4</li>
            <li>item5</li>
            <li>item6</li>
          </ul>
          <Footer />
        </div>
      </div>
    </>
  );
}
