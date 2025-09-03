import type { NextConfig } from "next";
import BreadcrumbGenerator from "nextjs-dynamic-breadcrumbs/generator";

const generator = new BreadcrumbGenerator("./src/app/dashboard");

if (process.env.NODE_ENV === "development") {
  // Clean up previously generated files
  generator.clean();
}

// Automatically generate files to show breadcrumbs
generator.start();

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
