"use client";

import { useSetAtom } from "jotai";
import { BellIcon, MenuIcon } from "lucide-react";

import { Button } from "../ui/button";
import { BreadcrumbGroup } from "./breadcrumbs";
import { isMobileSidebarOpenAtom } from "@/stores/sidebar";

export default function Header({ breadcrumbs }: { breadcrumbs?: React.ReactNode }) {
  const setIsMobileSidebarOpen = useSetAtom(isMobileSidebarOpenAtom);

  return (
    <div className="flex h-full w-full items-center gap-4 max-md:px-4 md:px-8">
      <BreadcrumbGroup className="flex-1">{breadcrumbs}</BreadcrumbGroup>
      <Button size="icon" variant="ghost" className="text-muted-foreground relative">
        <BellIcon fill="currentColor" className="size-4.25" />
        <span className="bg-primary absolute top-1 right-1 h-2 w-2 rounded-full"></span>
      </Button>
      <Button
        size="icon"
        variant="ghost"
        className="text-muted-foreground md:hidden"
        onClick={() => setIsMobileSidebarOpen((x) => !x)}
      >
        <MenuIcon className="size-5" />
      </Button>
    </div>
  );
}
