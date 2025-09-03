"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";
import React from "react";

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
    <>
      <div className="flex flex-col gap-4 py-1">
        {sections.map((section, index) => {
          return (
            <div key={index} className="flex gap-4">
              <div className="group relative w-1/3">
                <img src={section.image} className="aspect-[4/3] w-full object-cover" />
                <button
                  className="bg-opacity-0 group-hover:bg-opacity-30 absolute inset-0 flex items-center justify-center bg-black opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  onClick={() => setSelectedSection(section)}
                >
                  <span className="text-white">Click to edit</span>
                </button>
              </div>
              <textarea className="flex-1 p-2" defaultValue={section.text}></textarea>
            </div>
          );
        })}
        <button
          className="bg-secondary text-secondary-foreground flex w-full items-center justify-center gap-2 rounded px-6 py-2"
          onClick={() => {
            addNewSection(doc_id).then((section) => {
              setSections([...sections, section]);
            });
          }}
        >
          <PlusIcon />
          <span>Add New Section</span>
        </button>
      </div>
    </>
  );
}

function ImageEditor(selectedSection: Section | null) {
  if (!selectedSection) {
    return <div className="flex flex-col items-center justify-center gap-4">Please select an image to edit</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-sm text-gray-500">SELECTED IMAGE</h3>
        <img src={selectedSection.image} alt="Selected image" className="aspect-[4/3] w-full object-cover" />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm text-gray-500">AI GENERATED OPTIONS</h3>
        <div className="grid grid-cols-2 gap-3">
          {selectedSection.candidates.map((image) => {
            return (
              <div
                key={image}
                className="hover:border-secondary cursor-pointer overflow-hidden rounded-lg border transition-colors"
              >
                <img src={image} className="aspect-[4/3] w-full object-cover" />
              </div>
            );
          })}
        </div>
        <button className="bg-secondary text-secondary-foreground hover:bg-opacity-90 w-full rounded-md px-4 py-2 transition-colors">
          Regenerate Images
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm text-gray-500">GENERATION OPTIONS</h3>

        <label className="block text-sm text-gray-700">Image Source</label>
        <select
          id="aiModel"
          className="focus:ring-primary focus:border-primary w-full rounded-md border px-3 py-2 focus:outline-none"
        >
          <option>Image Pool</option>
          <option>AI Generated</option>
        </select>

        <label className="block text-sm text-gray-700">Image Style</label>
        <select
          id="imageStyle"
          className="focus:ring-primary focus:border-primary w-full rounded-md border px-3 py-2 focus:outline-none"
        >
          <option value="realistic">Realistic</option>
          <option value="artistic">Artistic</option>
          <option value="minimalist">Minimalist</option>
          <option value="vintage">Vintage</option>
          <option value="modern">Modern</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm text-gray-500">IMAGE LIBRARY</h3>
        <button className="text-primary w-full rounded-md border px-4 py-2 transition-colors hover:bg-gray-50">
          Browse Your Library
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm text-gray-500">UPLOAD YOUR OWN</h3>
        <div className="rounded-lg border-2 border-dashed p-6 text-center">
          <p className="text-sm text-gray-600">Drag and drop your image here or click to browse</p>
          <input type="file" className="hidden" />
          <button className="text-primary mt-4 rounded-md border px-4 py-2 transition-colors hover:bg-gray-50">
            Select Image
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ({ params }: { params: Promise<{ id: string }> }) {
  const { id: doc_id } = React.use(params);
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  const [sections, setSections] = useFetchedState([], fetchSections, [doc_id]);

  return (
    <div className="gap-page-padding flex flex-col md:flex-row">
      <div className="flex-1">
        <div className="h-content-window -mr-4 overflow-y-auto pr-4">
          {SectionsEditor(doc_id, selectedSection, setSelectedSection, sections, setSections)}
        </div>
      </div>
      <div className="max-md:hidden md:block md:border-l"></div>
      <div className="md:w-1/3">
        <div className="h-content-window -mr-4 overflow-y-auto pr-4">{ImageEditor(selectedSection)}</div>
      </div>
    </div>
  );
}
