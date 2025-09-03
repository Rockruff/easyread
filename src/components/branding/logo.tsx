import branding from "./config";

export default function Logo() {
  return (
    <div className="flex items-center gap-4">
      <img src={branding.logo} className="-ml-4 size-10 overflow-hidden rounded-full" />
      <a href="/" className="text-xl font-bold">
        {branding.name}
      </a>
    </div>
  );
}
