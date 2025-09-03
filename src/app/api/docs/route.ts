import { toDto } from "@/lib/api/docs";
import all_docs from "@/lib/api/mock/docs";

export async function GET() {
  const dtos = all_docs.map(toDto);
  return new Response(JSON.stringify(dtos), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
