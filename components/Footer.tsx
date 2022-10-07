import IconGithub from "./IconGithub.tsx";

export function Footer() {
  return (
    <footer class="border-t-2 border-green-200">
      <div class="flex justify-center gap-4 py-2">
        <a href="https://fresh.deno.dev">
          <img
            width="197"
            height="37"
            src="https://fresh.deno.dev/fresh-badge.svg"
            alt="Made with Fresh"
          />
        </a>
        <a
          class="flex items-center"
          href="https://github.com/morinokami/fresh-hacker"
        >
          <IconGithub />
        </a>
      </div>
    </footer>
  );
}
