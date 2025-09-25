"use client";

import { EditIcon, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { pickFile } from "@/lib/utils";

interface ImageInputProps {
  value?: string; // base64 string
  onChange?: (base64: string) => void;
  className?: string;
}

export function ImageInput({ value, onChange, className }: ImageInputProps) {
  const [preview, setPreview] = useState(value);

  async function handlePick() {
    const file = await pickFile("image/*");
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      onChange?.(base64);
    };
    reader.readAsDataURL(file);
  }

  return (
    <Button variant="outline" className={`relative overflow-hidden p-0 ${className || ""}`} onClick={handlePick}>
      {preview ? (
        <img src={preview} alt="preview" className="size-full object-cover" />
      ) : (
        <div className="bg-muted flex size-full items-center justify-center">
          <ImageIcon className="text-muted-foreground size-6" />
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white opacity-0 transition-opacity hover:opacity-100">
        <EditIcon className="mr-1 size-4" /> Edit
      </div>
    </Button>
  );
}
