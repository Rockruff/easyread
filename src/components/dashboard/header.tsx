"use client";

import { fetchCurrentUser } from "@/lib/api/users";
import { useFetchedState } from "@/lib/hooks/fetch";

export default function Header({ breadcrumbs }: { breadcrumbs?: React.ReactNode }) {
  const [user, _] = useFetchedState(null, fetchCurrentUser, []);

  return (
    <div className="flex h-full w-full items-center px-8">
      {breadcrumbs}
      {user && (
        <div className="ml-auto flex items-center gap-4">
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
