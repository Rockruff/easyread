"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface UploadContext {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  fileUrl: string | null;
  setFileUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

function FileUpload({ file, setFile, fileUrl, setFileUrl }: UploadContext) {
  const fileInput = useRef<HTMLInputElement>(null);

  if (!file || !fileUrl) {
    return (
      <>
        <i className="fas fa-cloud-upload-alt text-muted-foreground text-4xl"></i>
        <div className="text-muted-foreground text-xs">Supported formats: PDF, DOCX (Max 10MB)</div>
        <input
          ref={fileInput}
          type="file"
          className="hidden"
          accept=".pdf"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const selectedFile = e.target.files?.[0];
            if (!selectedFile) return;
            setFile(selectedFile);
            setFileUrl(URL.createObjectURL(selectedFile));
          }}
        />
        <button
          className="bg-secondary text-secondary-foreground rounded-md px-6 py-2 max-md:w-full"
          onClick={() => fileInput.current?.click()}
        >
          Browse Files
        </button>
      </>
    );
  }

  return (
    <>
      <p className="text-muted-foreground text-xs">{file.name}</p>
      <iframe src={fileUrl} className="w-full rounded-lg border max-md:h-[50vh] md:flex-1"></iframe>
      <button
        className="bg-secondary text-secondary-foreground rounded-md px-6 py-2 max-md:w-full"
        onClick={() => {
          setFile(null);
          setFileUrl(null);
        }}
      >
        Reset Selected File
      </button>
    </>
  );
}

function ConfigureOptions() {
  const [enableImages, setEnableImages] = useState(true);

  return (
    <>
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={enableImages}
          onChange={(e) => setEnableImages(e.target.checked)}
          className="text-primary focus:ring-primary h-4 w-4 rounded"
        />
        <label className="ml-2 text-sm text-gray-700">Auto Generate Images</label>
      </div>

      <div className={`contents ${!enableImages ? "[&>*]:pointer-events-none [&>*]:opacity-50" : ""}`}>
        <div>
          <label className="text-sm">Image Source</label>
          <select
            id="aiModel"
            className="focus:ring-primary focus:border-primary w-full rounded-md border px-3 py-2 focus:outline-none"
            disabled={!enableImages}
          >
            <option>Image Pool</option>
            <option>AI Generated</option>
          </select>
        </div>

        <div>
          <label className="text-sm">Image Style</label>
          <select
            id="imageStyle"
            className="focus:ring-primary focus:border-primary w-full rounded-md border px-3 py-2 focus:outline-none"
            disabled={!enableImages}
          >
            <option value="realistic">Realistic</option>
            <option value="artistic">Artistic</option>
            <option value="minimalist">Minimalist</option>
            <option value="vintage">Vintage</option>
            <option value="modern">Modern</option>
          </select>
        </div>

        <div>
          <label className="text-sm">Paragraphs Per Image</label>
          <input
            type="number"
            id="imageCount"
            min="1"
            max="5"
            defaultValue="1"
            disabled={!enableImages}
            className="focus:ring-primary focus:border-primary w-full rounded-md border px-3 py-2 focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-auto flex">
        <Link
          href="/dashboard/docs"
          className="bg-primary focus:ring-primary text-primary-foreground rounded-md px-6 py-2 focus:ring-2 focus:ring-offset-2"
          onClick={() => {
            toast.success(
              "Document Successfully Created. Once the initial processing is done, you can export or edit the result.",
            );
          }}
        >
          Upload &amp; Process
        </Link>
      </div>
    </>
  );
}

export default function () {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  const context: UploadContext = { file, setFile, fileUrl, setFileUrl };

  return (
    <div className="gap-page-padding flex flex-col md:flex-row">
      <div className="md:h-content-window flex flex-col items-center justify-center gap-4 md:flex-1">
        <FileUpload {...context} />
      </div>
      <div className="max-md:hidden md:block md:border-l"></div>
      <div className="md:h-content-window flex flex-col gap-4 md:w-1/3">
        <ConfigureOptions />
      </div>
    </div>
  );
}
