"use client";

import { PlusIcon, RefreshCwIcon } from "lucide-react";
import { useState } from "react";
import React from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { ImageGenerationOptions } from "@/components/dashboard/image-generation-options";
import { Section, addNewSection, fetchSections } from "@/lib/api/sections";
import { useFetchedState } from "@/lib/hooks/fetch";

function SectionsEditor(
  doc_id: string,
  selectedSection: Section | null,
  setSelectedSection: React.Dispatch<React.SetStateAction<Section | null>>,
  sections: Section[],
  setSections: React.Dispatch<React.SetStateAction<Section[]>>,
) {
  return (
    <div className="flex flex-col gap-4 py-1">
      {sections.map((section, index) => (
        <div key={index} className="flex gap-4">
          <div className="group relative w-1/3 overflow-hidden rounded">
            <img src={section.image} className="aspect-[4/3] w-full object-cover" />
            <button
              className="absolute inset-0 grid place-items-center bg-black/75 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => setSelectedSection(section)}
            >
              <span className="text-sm text-white">Click to edit</span>
            </button>
          </div>
          <Textarea className="flex-1 resize-none" defaultValue={section.text}></Textarea>
        </div>
      ))}
      <Button
        onClick={() => {
          addNewSection(doc_id).then((section) => {
            setSections([...sections, section]);
          });
        }}
      >
        <PlusIcon />
        <span>Add New Section</span>
      </Button>
    </div>
  );
}

function ImageEditor(selectedSection: Section | null) {
  if (!selectedSection) {
    return (
      <div className="grid size-full place-items-center">
        <span className="text-muted-foreground text-sm">Please select an image to edit</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-xs uppercase">Selected Image</span>
        <img src={selectedSection.image} className="aspect-[4/3] w-full rounded-lg object-cover" />
        <Button>Browse Your Library</Button>
        <Button variant="outline"> Upload Your Own Image</Button>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-muted-foreground text-xs uppercase">Generated Candidates</span>
        <div className="grid grid-cols-2 gap-2">
          {selectedSection.candidates.map((image) => (
            <div
              key={image}
              className="hover:ring-ring/50 cursor-pointer overflow-hidden rounded-lg transition-all hover:ring-[3px]"
            >
              <img src={image} className="aspect-[4/3] w-full object-cover" />
            </div>
          ))}
        </div>
        <ImageGenerationOptions />
        <Button className="my-1">
          <RefreshCwIcon />
          Regenerate Candidates
        </Button>
      </div>
    </>
  );
}

export default function ({ params }: { params: Promise<{ id: string }> }) {
  const { id: doc_id } = React.use(params);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [sections, setSections] = useFetchedState([], fetchSections, [doc_id]);

  return (
    <main className="flex max-md:flex-col max-md:gap-4 max-md:p-4 md:h-[var(--page-height)] md:items-stretch md:gap-8 md:p-8">
      <div className="-mx-4 flex-1 overflow-y-auto px-4 max-md:contents">
        {SectionsEditor(doc_id, selectedSection, setSelectedSection, sections, setSections)}
      </div>
      <div className="border-l max-md:hidden"></div>
      <div className="w-1/3 max-md:hidden">
        <div className="-mx-4 flex h-full flex-col gap-4 overflow-y-auto px-4">{ImageEditor(selectedSection)}</div>
      </div>
    </main>
  );
}
