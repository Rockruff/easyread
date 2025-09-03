import all_docs from "@/lib/api/mock/docs";
import all_sections from "@/lib/api/mock/sections";
import { Section, toDto } from "@/lib/api/sections";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doc = all_docs.find((doc) => doc.id === id);
  if (!doc) {
    return new Response(null, { status: 404 });
  }
  const sections = all_sections.filter((section) => section.doc_id === id);
  const dtos = sections.map(toDto);
  return new Response(JSON.stringify(dtos), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doc = all_docs.find((doc) => doc.id === id);
  if (!doc) {
    return new Response(null, { status: 404 });
  }

  const section: Section = {
    doc_id: id,
    id: String(all_sections.length),
    order: all_sections.length,
    text: "Text",
    image: "https://placehold.co/600x400?text=Image",
    candidates: [
      "https://placehold.co/600x400?text=Candidate 1",
      "https://placehold.co/600x400?text=Candidate 2",
      "https://placehold.co/600x400?text=Candidate 3",
      "https://placehold.co/600x400?text=Candidate 4",
    ],
  };

  all_sections.push(section);

  const dto = toDto(section);
  return new Response(JSON.stringify(dto), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
