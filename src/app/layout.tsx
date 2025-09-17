import type { Metadata } from "next";
import { Toaster } from "sonner";

import "./globals.css";

export const metadata: Metadata = {};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground overflow-x-hidden overflow-y-auto">
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
