import all_docs from "@/app/api/(mock)/docs";
import { toDto } from "@/lib/api/docs";

export async function GET() {
  const dtos = all_docs.map(toDto);
  return new Response(JSON.stringify(dtos), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
