"use client";

import { BreadcrumbGroup } from "./breadcrumbs";
import { fetchCurrentUser } from "@/lib/api/users";
import { useFetchedState } from "@/lib/hooks/fetch";

export default function Header({ breadcrumbs }: { breadcrumbs?: React.ReactNode }) {
  const [user, _] = useFetchedState(undefined, fetchCurrentUser, []);

  return (
    <div className="flex h-full w-full items-center max-md:px-4 md:px-8">
      <BreadcrumbGroup className="flex-1">{breadcrumbs}</BreadcrumbGroup>
      {user && (
        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="hover:text-primary text-muted-foreground p-2">
              <i className="fas fa-bell"></i>
              <span className="bg-primary absolute top-0 right-0 h-2 w-2 rounded-full"></span>
            </button>
          </div>
          <img src={user.avatar} className="size-8 overflow-hidden rounded-full" />
          <span className="text-sm">
            {user.firstName} {user.lastName}
          </span>
        </div>
      )}
    </div>
  );
}
