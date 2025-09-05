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
    <div className="flex h-screen overflow-hidden max-md:contents">
      <Sidebar />
      <div className="h-screen flex-1 overflow-y-auto max-md:contents">
        <header className="bg-background text-foreground sticky top-0 z-10 h-[var(--header-height)] border-b">
          <Header breadcrumbs={breadcrumbs} />
        </header>
        {children}
      </div>
    </div>
  );
}
