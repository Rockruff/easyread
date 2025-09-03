"use client";

import { use } from "react";

import { Breadcrumb } from "@/components/dashboard/breadcrumbs";
import { fetchDoc } from "@/lib/api/docs";
import { useFetchedState } from "@/lib/hooks/fetch";

export default function ({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [documentTitle, _] = useFetchedState("", fetchDoc, [id], (doc) => doc.title);
  return <Breadcrumb>{documentTitle}</Breadcrumb>;
}
