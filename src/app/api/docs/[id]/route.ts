import all_docs from "@/app/api/(mock)/docs";
import { toDto } from "@/lib/api/docs";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doc = all_docs.find((doc) => doc.id === id);
  if (!doc) {
    return new Response(null, { status: 404 });
  }
  const dto = toDto(doc);
  return new Response(JSON.stringify(dto), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
