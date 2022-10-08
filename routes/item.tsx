import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Header } from "@/components/Header.tsx";
import { Footer } from "@/components/Footer.tsx";

export const handler: Handlers = {};

export default function ItemPage() {
  return (
    <>
      <div class="bg-white pt-1 px-3">
        <div>item info</div>
        <Footer />
      </div>
    </>
  );
}
