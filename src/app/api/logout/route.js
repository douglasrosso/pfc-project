import { cookies } from "next/headers";

export async function GET() {
  if (cookies().has("auth")) {
    cookies().delete("auth");
  }

  return new Response(JSON.stringify({ success: true, message: "" }));
}
