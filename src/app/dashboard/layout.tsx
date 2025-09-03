"use client";

// as this website is just for ui prototyping and demonstration
// to make things simple, we just make root layout of dashboard as client component
import Header from "../../components/dashboard/header";
import Sidebar from "../../components/dashboard/sidebar";
import { BreadcrumbGroup } from "@/components/dashboard/breadcrumbs";

export default function DashboardLayout({
  children,
  breadcrumbs,
}: {
  children: React.ReactNode;
  breadcrumbs: React.ReactNode;
}) {
  breadcrumbs = <BreadcrumbGroup>{breadcrumbs}</BreadcrumbGroup>;

  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="bg-primary text-primary-foreground h-screen w-64 overflow-y-auto max-md:hidden">
        <Sidebar />
      </aside>
      <div className="h-screen flex-1 overflow-y-auto">
        <header className="bg-card text-card-foreground h-header-height sticky top-0 z-10 border-b">
          <Header breadcrumbs={breadcrumbs} />
        </header>
        <main className="p-page-padding">{children}</main>
      </div>
    </div>
  );
}
