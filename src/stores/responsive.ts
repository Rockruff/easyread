import { atom } from "jotai";

// Media query breakpoints for Tailwind v4
// https://tailwindcss.com/docs/responsive-design
const Queries = {
  sm: "(width >= 40rem)",
  md: "(width >= 48rem)",
  lg: "(width >= 64rem)",
  xl: "(width >= 80rem)",
  "2xl": "(width >= 96rem)",
  "max-sm": "(width < 40rem)",
  "max-md": "(width < 48rem)",
  "max-lg": "(width < 64rem)",
  "max-xl": "(width < 80rem)",
  "max-2xl": "(width < 96rem)",
} as const;

type BreakPointType = keyof typeof Queries;

function createScreenMatchAtom(size: BreakPointType, init: boolean = false) {
  const screenMatchAtom = atom(init);

  screenMatchAtom.onMount = (setScreenMatchAtom) => {
    const query = Queries[size];
    const mediaQueryList = window.matchMedia(query);
    setScreenMatchAtom(mediaQueryList.matches);
    const listener = (event: MediaQueryListEvent) => setScreenMatchAtom(event.matches);
    mediaQueryList.addEventListener("change", listener);
    return () => mediaQueryList.removeEventListener("change", listener);
  };

  return screenMatchAtom;
}

export const isMaxMdScreenAtom = createScreenMatchAtom("max-md");
