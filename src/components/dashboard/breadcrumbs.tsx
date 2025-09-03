"use client";

import Link from "next/link";
import useBreadcrumb from "nextjs-dynamic-breadcrumbs";

export function Breadcrumb({ children }: { children: React.ReactNode }) {
  const [href, isActive] = useBreadcrumb();

  return (
    <div className="group contents">
      <Link
        href={href}
        className={isActive ? "text-secondary pointer-events-none text-sm underline" : "text-sm hover:underline"}
      >
        {children}
      </Link>
      <span className="text-xs text-neutral-900 select-none group-last:hidden">&gt;</span>
    </div>
  );
}

export function BreadcrumbGroup({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-2">{children}</div>;
}
