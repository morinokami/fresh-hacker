export function Header() {
  return (
    <header class="bg-green-200">
      <nav class="h-14 p-[2px] md:h-8 flex gap-1 items-center">
        <a href="/">
          <img
            src="/logo.svg"
            alt="Fresh Logo"
            class="h-5 w-5"
          />
        </a>
        <a href="/">
          <span class="font-bold">Fresh Hacker News</span>
        </a>
      </nav>
    </header>
  );
}
