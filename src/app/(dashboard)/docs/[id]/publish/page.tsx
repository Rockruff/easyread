"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { pickFile } from "@/lib/utils";

export default function ExportPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);

  const [format, setFormat] = useState("pdf");
  const [sectionsPerPage, setSectionsPerPage] = useState(5);
  const [template, setTemplate] = useState("none");
  const [templateFile, setTemplateFile] = useState<File>();

  // Reset invalid template when switching formats
  useEffect(() => {
    if (["html", "page"].includes(format) && template === "file") {
      setTemplate("none");
      setTemplateFile(undefined);
    }
  }, [format, template]);

  return (
    <main className="flex flex-col gap-8 p-8 max-md:gap-4 max-md:p-4">
      <Card>
        <CardHeader>
          <CardTitle>Target Format</CardTitle>
          <CardDescription>Choose how you want to publish your document.</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={format} onValueChange={setFormat} className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <RadioGroupItem value="pdf" />
              <div className="flex flex-col">
                <label>PDF Document</label>
                <p className="text-muted-foreground text-xs">Best for printing and sharing.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <RadioGroupItem value="word" />
              <div className="flex flex-col">
                <label>Word Document</label>
                <p className="text-muted-foreground text-xs">Editable and easy to customize.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <RadioGroupItem value="html" />
              <div className="flex flex-col">
                <label>Minimal Webpage</label>
                <p className="text-muted-foreground text-xs">Lightweight HTML for embedding.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <RadioGroupItem value="page" />
              <div className="flex flex-col">
                <label>Hosted Webpage</label>
                <p className="text-muted-foreground text-xs">Publish directly to an Intelife URL.</p>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Document Options</CardTitle>
          <CardDescription>
            {["pdf", "word"].includes(format)
              ? "Customize the layout and apply templates."
              : "Apply branding to your exported page."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {["pdf", "word"].includes(format) && (
            <div className="flex flex-col gap-2">
              <label>Sections Per Page</label>
              <p className="text-muted-foreground text-sm">Control how many sections appear on each page.</p>
              <Select value={String(sectionsPerPage)} onValueChange={(v) => setSectionsPerPage(Number(v))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select count" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 8 }, (_, i) => (
                    <SelectItem key={i + 1} value={String(i + 1)}>
                      {i + 1} Sections
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label>Document Template</label>
            <p className="text-muted-foreground text-sm">
              {["pdf", "word"].includes(format)
                ? "Apply branding from settings or upload a custom template."
                : "Only branding from your account settings can be applied here."}
            </p>
            <Select
              value={template}
              onValueChange={async (v) => {
                setTemplateFile(undefined);
                if (v === "file") {
                  const file = await pickFile(".docx");
                  if (!file) return;
                  setTemplateFile(file);
                }
                setTemplate(v);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brand">From Branding (set in Settings)</SelectItem>
                <SelectItem value="none">No Template (content only)</SelectItem>
                {["pdf", "word"].includes(format) && (
                  <SelectItem value="file">From File {templateFile && `(${templateFile.name})`}</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Button>Publish Document</Button>
    </main>
  );
}
