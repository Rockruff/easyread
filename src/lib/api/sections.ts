export interface Section {
  doc_id: string;
  id: string;
  order: number;
  text: string;
  image: string;
  candidates: string[];
}

export type SectionDTO = Section;

export function fromDto(section: SectionDTO): Section {
  return section;
}

export function toDto(section: Section): SectionDTO {
  return section;
}

/**************************************************/

// Fetch all sections of a doc
export async function fetchSections(doc_id: string): Promise<Section[]> {
  const res = await fetch(`/api/docs/${doc_id}/sections`);
  if (!res.ok) throw new Error("Failed to fetch sections");
  const dtos: SectionDTO[] = await res.json();
  return dtos.map(fromDto);
}

export async function addNewSection(doc_id: string): Promise<Section> {
  const res = await fetch(`/api/docs/${doc_id}/sections`, {
    method: "PUT",
  });
  if (!res.ok) throw new Error("Failed to add new section");
  const dto: SectionDTO = await res.json();
  return fromDto(dto);
}
