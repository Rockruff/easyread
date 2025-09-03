import { builtinModules } from "module";

const builtinsPattern = "^(" + builtinModules.join("|") + ")$";

const basePrettierConfig = {
  // Config for prettier
  htmlWhitespaceSensitivity: "ignore",
  printWidth: 120,
  plugins: ["@trivago/prettier-plugin-sort-imports"],

  // Config for @trivago/prettier-plugin-sort-imports
  importOrder: [
    builtinsPattern, // Node.js built-ins
    "<THIRD_PARTY_MODULES>", // Third-party modules
    String.raw`^(@|\.{1,2})?/`, // Internal modules: alias (@/) and relative paths (/, ./, ../)
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default {
  ...basePrettierConfig,

  // Add support for Tailwind CSS
  plugins: [...basePrettierConfig.plugins, "prettier-plugin-tailwindcss"],

  // Config for prettier-plugin-tailwindcss
  tailwindAttributes: [],
};
