import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function now() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = now.getMonth() + 1;
  const dd = now.getDate();
  const HH = now.getHours();
  const MM = now.getMinutes();
  const SS = now.getSeconds();
  return { yyyy, mm, dd, HH, MM, SS };
}

export function browserDownload(url: string, filename: string) {
  fetch(url)
    .then((res) => res.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    });
}

export function pickFile(accept: string): Promise<File | null> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.multiple = false;
    input.style.display = "none";

    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0] ?? null;
      resolve(file);
      document.body.removeChild(input);
    };

    document.body.appendChild(input);
    input.click();
  });
}

export function pickFiles(accept: string): Promise<File[]> {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = accept;
    input.multiple = true;
    input.style.display = "none";

    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = target.files ? Array.from(target.files) : [];
      resolve(files);
      document.body.removeChild(input);
    };

    document.body.appendChild(input);
    input.click();
  });
}
