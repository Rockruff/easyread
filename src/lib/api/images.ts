export interface Image {
  id: string;
  created: Date;
  url: string;
}

export interface ImageDTO {
  id: string;
  created: string; // serialized ISO string
  url: string;
}

export function fromDto(dto: ImageDTO): Image {
  return { ...dto, created: new Date(dto.created) };
}

export function toDto(doc: Image): ImageDTO {
  return { ...doc, created: doc.created.toISOString() };
}

// Fetch all images
export async function fetchImages(): Promise<Image[]> {
  const res = await fetch("/api/images");
  if (!res.ok) throw new Error("Failed to fetch images");

  const dtos: ImageDTO[] = await res.json();
  return dtos.map(fromDto);
}
