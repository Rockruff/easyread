import branding from "./config";
import { cn } from "@/lib/utils";

export default function ({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-none items-center gap-4", className)}>
      <img src={branding.logo} className="size-10 overflow-hidden rounded-full" />
      <a href="/" className="text-xl font-bold">
        {branding.name}
      </a>
    </div>
  );
}
