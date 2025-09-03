import { me } from "@/lib/api/mock/users";
import { toDto } from "@/lib/api/users";

export async function GET() {
  const dto = toDto(me);
  return new Response(JSON.stringify(dto), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
