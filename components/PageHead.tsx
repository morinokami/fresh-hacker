import { Head } from "$fresh/runtime.ts";

type PageHeadProps = {
  title: string;
  description: string;
  url: string;
};

export function PageHead({ title, description, url }: PageHeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta
        property="og:image"
        content="https://fresh-hacker-news.deno.dev/ogp.png"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@onDemocracy" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content="https://fresh-hacker-news.deno.dev/ogp.png"
      />
    </Head>
  );
}
