import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

// Currently, only shows a static markup.
// Extracting this as a component for future development.

export function Pagination() {
  return (
    <nav className="relative flex h-10 items-center justify-center [&>*]:h-full">
      <a href="#" className="hover:bg-accent relative flex items-center rounded-l-md border px-2 py-2 text-sm">
        <ChevronLeftIcon />
      </a>
      <a
        href="#"
        className="bg-primary border-primary text-primary-foreground relative z-10 flex items-center border px-4 py-2 text-sm"
      >
        1
      </a>
      <a href="#" className="hover:bg-accent relative flex items-center border px-4 py-2 text-sm">
        2
      </a>
      <a href="#" className="hover:bg-accent relative flex items-center border px-4 py-2 text-sm">
        3
      </a>
      <a href="#" className="hover:bg-accent relative flex items-center rounded-r-md border px-2 py-2 text-sm">
        <ChevronRightIcon />
      </a>
    </nav>
  );
}
