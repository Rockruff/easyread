"use client";

import { CloudUploadIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { ImageGenerationOptions } from "@/components/app/image-generation-options";
import { useStableMemo } from "@/lib/hooks/stable-memo";
import { cn, pickFiles } from "@/lib/utils";

export default function () {
  const router = useRouter();

  const [files, setFiles] = useState<File[]>([]);
  const [tabIndex, setTabIndex] = useState(0);

  const fileUrls = useStableMemo(
    files,
    (file) => URL.createObjectURL(file),
    (url, _file) => URL.revokeObjectURL(url),
  );

  const unselectFile = () => {
    setFiles(files.toSpliced(tabIndex, 1));
    if (tabIndex >= files.length - 1) {
      setTabIndex(tabIndex - 1);
    } else {
    }
  };
  const selectFile = async () => {
    let picked = await pickFiles(".pdf");
    picked = picked.filter((f) => !files.includes(f));
    if (picked.length === 0) return;
    setFiles([...files, ...picked]);
    setTabIndex(files.length);
  };

  const [enableImages, setEnableImages] = useState(true);

  const handleCreateDocument = () => {
    toast.success(
      "Document Successfully Created. Once the initial processing is done, you can export or edit the result.",
    );
    router.push("/docs");
  };

  return (
    <main
      className={cn(
        "flex",
        "max-md:min-h-[var(--page-height)] max-md:flex-col max-md:gap-4 max-md:p-4",
        "md:h-[var(--page-height)] md:items-stretch md:overflow-hidden",
      )}
    >
      {files.length > 0 ? (
        <div className="flex flex-1 flex-col gap-4 overflow-hidden p-8 max-md:contents">
          <iframe src={fileUrls[tabIndex]} className="min-h-0 flex-1 rounded-lg border max-md:min-h-96"></iframe>
          <div className="flex items-center gap-2">
            <Select value={String(tabIndex)} onValueChange={(v) => setTabIndex(Number(v))}>
              <SelectTrigger className="flex-1 truncate">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {files.map((file, index) => (
                  <SelectItem key={index} value={String(index)}>
                    {file.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={unselectFile}>
              <Trash2Icon />
            </Button>
            <Button size="icon" onClick={selectFile}>
              <PlusIcon />
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 p-8 max-md:min-h-106 max-md:rounded-lg max-md:border max-md:border-dashed max-md:px-4 md:flex-1">
          <CloudUploadIcon className="text-muted-foreground size-12" />
          <div className="text-muted-foreground text-xs">Supported formats: PDF, DOCX (Max 10MB)</div>
          <Button onClick={selectFile}>Browse Files</Button>
        </div>
      )}

      <div className="flex w-3/8 flex-col gap-8 overflow-x-hidden overflow-y-auto border-l p-8 max-md:contents">
        <div className="flex flex-1 flex-col gap-4 max-md:contents">
          <div className="flex flex-col gap-2">
            <label className="text-sm">Language Style</label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Please Select..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="library">Plain English</SelectItem>
                <SelectItem value="stable-diffusion">Easy Read</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox checked={enableImages} onCheckedChange={(checked) => setEnableImages(!!checked)} />
            <label className="text-sm">Auto Generate Images</label>
          </div>
          <ImageGenerationOptions enabled={enableImages} />
        </div>
        {files.length > 1 && (
          <div className="text-muted-foreground flex flex-col items-center text-xs">
            <span>Note: You selected multiple files.</span>
            <span>The first file will be treated as the primary file,</span>
            <span> while the others provide additional context.</span>
          </div>
        )}
        <Button onClick={handleCreateDocument}>Upload &amp; Process</Button>
      </div>
    </main>
  );
}
