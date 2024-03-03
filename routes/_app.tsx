import { PageProps } from "$fresh/server.ts";
import { Header } from "@/components/Header.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#86efac" />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="mx-auto md:p-2 md:w-[85%] bg-[#f9f9f9]">
        <Header />
        <Component />
      </body>
    </html>
  );
}
