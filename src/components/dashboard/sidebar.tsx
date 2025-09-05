import Link from "next/link";

import Logo from "@/components/branding/logo";

export default function Sidebar() {
  return (
    <aside className="bg-sidebar text-sidebar-foreground h-screen w-64 overflow-y-auto max-md:hidden">
      <div className="flex flex-col gap-6 p-4">
        <div className="flex justify-center">
          <Logo />
        </div>
        <nav>
          <div className="px-4 py-3">
            <span className="text-sm font-medium">Main</span>
          </div>
          <Link
            href="/dashboard/docs"
            className="text-sidebar-foreground flex items-center px-4 py-3 hover:bg-current/10"
          >
            <i className="fas fa-file-alt mr-3"></i>
            <span>Documents</span>
          </Link>
          <Link href="#" className="text-sidebar-foreground flex items-center px-4 py-3 hover:bg-current/10">
            <i className="fas fa-image mr-3"></i>
            <span>Library</span>
          </Link>
        </nav>
        <nav>
          <div className="px-4 py-3">
            <span className="text-sm font-medium">Account</span>
          </div>
          <Link href="#" className="text-sidebar-foreground flex items-center px-4 py-3 hover:bg-current/10">
            <i className="fas fa-users mr-3"></i>
            <span>Profile</span>
          </Link>
          <Link href="#" className="text-sidebar-foreground flex items-center px-4 py-3 hover:bg-current/10">
            <i className="fas fa-cog mr-3"></i>
            <span>Settings</span>
          </Link>
          <Link href="#" className="text-sidebar-foreground flex items-center px-4 py-3 hover:bg-current/10">
            <i className="fas fa-sign-out mr-3"></i>
            <span>Logout</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
}
