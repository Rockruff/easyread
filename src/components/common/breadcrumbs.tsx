"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import useBreadcrumb from "nextjs-dynamic-breadcrumbs";

import { cn } from "@/lib/utils";

export function Breadcrumb({ children }: { children: React.ReactNode }) {
  const [href, isActive] = useBreadcrumb();

  return (
    <div className="group hidden md:contents max-md:[&:nth-last-child(2)]:contents">
      <Link href={href} className="flex items-center gap-2">
        <ChevronLeftIcon className="text-muted-foreground size-4 md:hidden" />
        <span
          className={cn(
            "truncate md:text-sm",
            isActive ? "text-primary pointer-events-none underline" : "hover:underline",
          )}
        >
          {children}
        </span>
      </Link>
      <ChevronRightIcon className="text-muted-foreground size-4 group-last:hidden max-md:hidden" />
    </div>
  );
}

export function BreadcrumbGroup({ className, children }: { className: string; children: React.ReactNode }) {
  return <div className={cn("flex items-center gap-1 overflow-hidden", className)}>{children}</div>;
}
