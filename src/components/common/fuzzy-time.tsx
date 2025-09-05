import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

export function FuzzyTimeDisplay({ className, value }: { className?: string; value: number | string | Date }) {
  if (!(value instanceof Date)) {
    // Covert to Date if not a Date object
    value = new Date(value);
  }

  const fuzzy = timeAgo.format(value);
  const precise = value.toLocaleString();

  return (
    <Tooltip>
      <TooltipTrigger className={className}>{fuzzy}</TooltipTrigger>
      <TooltipContent>{precise}</TooltipContent>
    </Tooltip>
  );
}
