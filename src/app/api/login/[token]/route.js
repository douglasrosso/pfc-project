import { isTokenValid } from "@/utils/auth";

export async function GET(_, { params }) {
  const isAuthenticated = await isTokenValid(params.token);

  return new Response(
    JSON.stringify({ success: isAuthenticated, message: "" })
  );
}