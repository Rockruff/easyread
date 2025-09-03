export interface Doc {
  id: string;
  title: string;
  created: Date;
  status: "ready" | "pending";
}

export interface DocDTO {
  id: string;
  title: string;
  created: string; // serialized ISO string
  status: "ready" | "pending";
}

export function fromDto(dto: DocDTO): Doc {
  return { ...dto, created: new Date(dto.created) };
}

export function toDto(doc: Doc): DocDTO {
  return { ...doc, created: doc.created.toISOString() };
}

/**************************************************/

// Fetch all docs
export async function fetchDocs(): Promise<Doc[]> {
  const res = await fetch("/api/docs");
  if (!res.ok) throw new Error("Failed to fetch documents");

  const dtos: DocDTO[] = await res.json();
  return dtos.map(fromDto);
}

// Fetch a single doc
export async function fetchDoc(id: string): Promise<Doc> {
  const res = await fetch(`/api/docs/${id}`);
  if (!res.ok) throw new Error("Failed to fetch document");

  const dto: DocDTO = await res.json();
  return fromDto(dto);
}
