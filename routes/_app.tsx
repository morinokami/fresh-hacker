import { AppProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { Header } from "@/components/Header.tsx";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/app.css" />
      </Head>
      <div class="mx-auto md:p-2 md:w-[85%]">
        <Header />
        <Component />
      </div>
    </>
  );
}
