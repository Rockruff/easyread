"use client";

import { DownloadIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { fetchImages } from "@/lib/api/images";
import { useFetchedState } from "@/lib/hooks/fetch";
import { browserDownload, now } from "@/lib/utils";

function groupItemsByDate<T>(items: T[], span: string, getDate: (item: T) => Date) {
  const groups: Record<string, { items: T[]; sortKey: number }> = {};

  for (const item of items) {
    const date = getDate(item);
    let key: string;
    let sortKey: number;

    switch (span) {
      case "week": {
        const day = date.getDay(); // 0 = Sunday, 1 = Monday, ...
        const diffToMonday = (day + 6) % 7; // shift so Monday = 0
        const monday = new Date(date);
        monday.setDate(date.getDate() - diffToMonday);
        monday.setHours(0, 0, 0, 0);

        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);

        key = `${monday.toLocaleDateString()} - ${sunday.toLocaleDateString()}`;
        sortKey = monday.getTime();
        break;
      }

      case "month":
        key = date.toLocaleDateString(undefined, { year: "numeric", month: "long" });
        // normalize to first day of month
        sortKey = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
        break;

      case "year":
        key = date.toLocaleDateString(undefined, { year: "numeric" });
        // normalize to Jan 1
        sortKey = new Date(date.getFullYear(), 0, 1).getTime();
        break;

      default: // "day"
        key = date.toLocaleDateString();
        // exact day
        sortKey = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
        break;
    }

    if (!groups[key]) {
      groups[key] = { items: [], sortKey };
    }
    groups[key].items.push(item);
  }

  return Object.entries(groups)
    .map(([key, { items, sortKey }]) => ({ key, items, sortKey }))
    .sort((a, b) => b.sortKey - a.sortKey) // descending
    .map(({ key, items }) => [key, items] as const); // drop sortKey
}

function downloadImage(url: string) {
  const { yyyy, mm, dd, HH, MM, SS } = now();
  const name = `Image_${yyyy}-${mm}-${dd}_${HH}-${MM}-${SS}`;
  browserDownload(url, name);
}

export default function () {
  const [images] = useFetchedState([], fetchImages, []);

  const [groupBy, setGroupBy] = useState("month");

  const groups = groupItemsByDate(images, groupBy, (i) => i.created);

  return (
    <main className="flex flex-col max-md:gap-4 max-md:p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-end gap-4">
        <label className="text-sm">Group Images By</label>
        <Select value={groupBy} onValueChange={setGroupBy}>
          <SelectTrigger>
            <SelectValue placeholder="Please Select..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Day</SelectItem>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {groups.map(([group_title, group_images], index) => (
        <div className="flex flex-col max-md:gap-2 md:gap-4" key={index}>
          <div className="text-sm font-semibold">{group_title}</div>
          <div className="@container">
            <div className="grid grid-cols-3 gap-2 @md:grid-cols-4 @xl:grid-cols-5">
              {group_images.map((image, index) => (
                <div key={index} className="group relative aspect-4/3">
                  <img src={image.url} className="size-full object-cover"></img>
                  <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/75 text-white opacity-0 group-hover:opacity-100">
                    <Button size="icon" variant="ghost" onClick={() => downloadImage(image.url)}>
                      <DownloadIcon />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <TrashIcon />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}
