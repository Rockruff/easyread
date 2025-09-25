import type { Metadata } from "next";
import { Toaster } from "sonner";

import "@/app/globals.css";

export const metadata: Metadata = {};

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-background text-foreground overflow-x-hidden overflow-y-auto">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
