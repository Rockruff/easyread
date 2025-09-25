import clsx from "clsx";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function ImageGenerationOptions({ enabled = true }: { enabled?: boolean }) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <label className={clsx("text-sm", !enabled && "text-muted-foreground")}>Image Source</label>
        <Select disabled={!enabled}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Please Select..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="library">Image Library</SelectItem>
            <SelectItem value="stable-diffusion">AI Generated</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <label className={clsx("text-sm", !enabled && "text-muted-foreground")}>Image Style</label>
        <Select disabled={!enabled}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Please Select..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="realistic">Realistic</SelectItem>
            <SelectItem value="artistic">Artistic</SelectItem>
            <SelectItem value="minimalist">Minimalist</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
