import { cn } from "@/lib/utils";

const branding = {
  logo: "https://www.health.gov.au/sites/default/files/styles/h_content_max_width_no_upscale/public/2023-11/easy-read-resources-for-people-with-intellectual-disability.png.webp",
  name: "ReadEasy",
};

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
