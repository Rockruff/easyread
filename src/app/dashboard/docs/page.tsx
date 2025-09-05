"use client";

import { DownloadIcon, EditIcon, EllipsisIcon, LoaderCircleIcon, PlusIcon, SearchIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Checkbox as CheckBoxOriginal } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

import { FuzzyTimeDisplay } from "@/components/common/fuzzy-time";
import { Pagination } from "@/components/common/pagination";
import { Doc, fetchDocs } from "@/lib/api/docs";
import { useFetchedState } from "@/lib/hooks/fetch";

function Checkbox(props: React.ComponentProps<typeof CheckBoxOriginal>) {
  // Workaround for https://github.com/shadcn-ui/ui/issues/2604
  return (
    <div className="flex items-center">
      <CheckBoxOriginal {...props} />
    </div>
  );
}

function Actions({ doc }: { doc: Doc }) {
  if (doc.status === "pending") {
    return (
      <div className="flex items-center justify-center text-xs">
        <LoaderCircleIcon className="size-4 animate-spin" />
        <span className="ml-[1ch]">Processing</span>
      </div>
    );
  }

  return (
    <div className="[&>*]:hover:text-primary flex items-center justify-center gap-2">
      <Link title="Edit" href={`/dashboard/docs/${doc.id}`}>
        <EditIcon className="size-4" />
      </Link>
      <Link title="Publish" href={`/dashboard/docs/${doc.id}/publish`}>
        <DownloadIcon className="size-4" />
      </Link>
      <button title="Delete">
        <Trash2Icon className="size-4" />
      </button>
      <button title="More">
        <EllipsisIcon className="size-4" />
      </button>
    </div>
  );
}

export default function () {
  const [docs, _] = useFetchedState([], fetchDocs, []);

  return (
    <main className="flex flex-col max-md:gap-4 max-md:p-4 md:gap-8 md:p-8">
      <div className="contents md:flex md:items-center md:justify-between">
        <div className="relative">
          <SearchIcon className="text-muted-foreground absolute top-2.5 left-3 size-4" />
          <Input type="text" className="pl-10" placeholder="Search documents..." />
        </div>
        <Button asChild>
          <Link href="/dashboard/docs/new">
            <PlusIcon />
            New Document
          </Link>
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed [&_th]:box-content [&_th]:text-left [&_th]:last:text-right [&_th,td]:px-4 [&_th,td]:whitespace-nowrap [&_th,td]:first:pl-8 [&_th,td]:last:pr-8 [&_tr]:h-14">
          <thead className="bg-muted text-muted-foreground border-y text-xs uppercase">
            <tr>
              <th scope="col" className="w-4">
                <Checkbox className="bg-background" />
              </th>
              <th scope="col" className="w-auto">
                Document Name
              </th>
              <th scope="col" className="w-40">
                Last Modified
              </th>
              <th scope="col" className="w-22">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y border-b text-sm">
            {docs.map((doc) => (
              <tr key={doc.id}>
                <td>
                  <Checkbox />
                </td>
                <td>
                  <Link href={`/dashboard/docs/${doc.id}`}>{doc.title}</Link>
                </td>
                <td>
                  <FuzzyTimeDisplay value={doc.created} />
                </td>
                <td>
                  <Actions doc={doc} />
                </td>
              </tr>
            ))}
            <tr className="not-first:hidden">
              <td colSpan={4} className="text-center">
                No Items
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Pagination />
    </main>
  );
}
