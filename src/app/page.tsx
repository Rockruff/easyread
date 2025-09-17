import Link from "next/link";

export default function () {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-2">
      <span>This is a placeholder for future landing page.</span>
      <Link href="/docs" className="text-primary hover:underline">
        Dashboard
      </Link>
    </div>
  );
}
