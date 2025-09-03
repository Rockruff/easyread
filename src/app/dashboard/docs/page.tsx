"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DownloadIcon,
  EditIcon,
  EllipsisIcon,
  LoaderIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react";
import Link from "next/link";

import { fetchDocs } from "@/lib/api/docs";
import { useFetchedState } from "@/lib/hooks/fetch";

export default function () {
  const [docs, _] = useFetchedState([], fetchDocs, []);

  return (
    <div className="gap-page-padding flex flex-col">
      <div className="contents md:flex md:items-center md:justify-between">
        <div className="relative max-md:w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <SearchIcon className="size-[1em]" />
          </div>
          <input
            type="text"
            className="focus:border-primary block w-full rounded-md border py-2 pr-3 pl-10 leading-5 placeholder-gray-500 focus:outline-none sm:text-sm"
            placeholder="Search documents..."
          />
        </div>
        <Link
          href="/dashboard/docs/new"
          className="bg-secondary text-secondary-foreground flex items-center gap-2 rounded-md px-4 py-2 text-sm max-md:w-full max-md:justify-center"
        >
          <PlusIcon className="size-[1em]" />
          New Document
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-y bg-gray-50">
              <th scope="col" className="px-6 py-4 text-left text-xs whitespace-nowrap text-gray-500 uppercase">
                Document Name
              </th>
              <th scope="col" className="w-48 px-6 py-4 text-left text-xs/2 whitespace-nowrap text-gray-500 uppercase">
                Last Modified
              </th>
              <th scope="col" className="w-32 px-6 py-4 text-right text-xs whitespace-nowrap text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {docs.map((doc) => {
              return (
                <tr key={doc.id} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {/* <input type="checkbox" className="mr-4" /> */}
                      <Link className="text-sm text-gray-900" href={`/dashboard/docs/${doc.id}`}>
                        {doc.title}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{doc.created.toLocaleDateString()}</div>
                  </td>
                  <td className="flex items-center justify-end gap-2 px-6 py-4">
                    {doc.status === "pending" ? (
                      <>
                        <LoaderIcon className="size-[1em] animate-spin" />
                        <span className="text-xs">Processing</span>
                      </>
                    ) : (
                      <>
                        <Link title="EditIcon" className="hover:text-secondary" href={`/dashboard/docs/${doc.id}`}>
                          <EditIcon className="size-[1em]" />
                        </Link>
                        <button title="Export" className="hover:text-secondary">
                          <DownloadIcon className="size-[1em]" />
                        </button>
                        <button title="More" className="hover:text-secondary">
                          <EllipsisIcon className="size-[1em]" />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <nav className="relative flex h-10 items-center justify-center [&>*]:h-full" aria-label="Pagination">
        <a
          href="#"
          className="relative flex items-center rounded-l-md border px-2 py-2 text-sm text-gray-500 hover:bg-gray-50"
        >
          <ChevronLeftIcon />
        </a>
        <a
          href="#"
          aria-current="page"
          className="bg-secondary border-secondary text-secondary-foreground relative z-10 flex items-center border px-4 py-2 text-sm"
        >
          1
        </a>
        <a href="#" className="relative flex items-center border px-4 py-2 text-sm text-gray-500 hover:bg-gray-50">
          2
        </a>
        <a href="#" className="relative flex items-center border px-4 py-2 text-sm text-gray-500 hover:bg-gray-50">
          3
        </a>
        <a
          href="#"
          className="relative flex items-center rounded-r-md border px-2 py-2 text-sm text-gray-500 hover:bg-gray-50"
        >
          <ChevronRightIcon />
        </a>
      </nav>
    </div>
  );
}
