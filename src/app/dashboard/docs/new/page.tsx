"use client";

import { CloudUploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { ImageGenerationOptions } from "@/components/dashboard/image-generation-options";

export default function () {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const unselectFile = () => {
    setFile(null);
    setFileUrl(null);
  };
  const selectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setFileUrl(URL.createObjectURL(selectedFile));
  };

  const [enableImages, setEnableImages] = useState(true);

  const handleCreateDocument = () => {
    toast.success(
      "Document Successfully Created. Once the initial processing is done, you can export or edit the result.",
    );
    router.push("/dashboard/docs");
  };

  return (
    <main className="flex max-md:flex-col max-md:gap-4 max-md:p-4 md:h-[var(--page-height)] md:items-stretch md:gap-8 md:p-8">
      <div className="flex flex-col items-center max-md:gap-2 max-md:rounded-lg max-md:border max-md:border-dashed max-md:p-4 md:flex-1 md:justify-center md:gap-4">
        {file && fileUrl ? (
          <>
            <iframe src={fileUrl} className="w-full rounded-lg border max-md:h-[50vh] md:flex-1"></iframe>
            <p className="text-muted-foreground text-xs">{file.name}</p>
            <Button className="max-md:w-full" onClick={unselectFile}>
              Reset Selected File
            </Button>
          </>
        ) : (
          <>
            <CloudUploadIcon className="text-muted-foreground size-12" />
            <div className="text-muted-foreground text-xs">Supported formats: PDF, DOCX (Max 10MB)</div>
            <Button asChild className="max-md:w-full">
              <label>
                Browse Files
                <input type="file" className="hidden" accept=".pdf" onChange={selectFile} />
              </label>
            </Button>
          </>
        )}
      </div>
      <div className="border-l max-md:hidden"></div>
      <div className="flex w-1/3 flex-col gap-4 max-md:contents">
        <div className="flex flex-col gap-4 max-md:rounded-lg max-md:border max-md:border-dashed max-md:p-4 md:-mx-4 md:flex-1 md:overflow-y-auto md:px-4">
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
        <Button onClick={handleCreateDocument}>Upload &amp; Process</Button>
      </div>
    </main>
  );
}
