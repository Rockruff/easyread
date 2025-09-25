import all_images from "@/app/api/(mock)/images";
import { toDto } from "@/lib/api/images";

export async function GET() {
  const dtos = all_images.sort((x, y) => y.created.getTime() - x.created.getTime()).map(toDto);
  return new Response(JSON.stringify(dtos), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
