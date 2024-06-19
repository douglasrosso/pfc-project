import { getUserFromToken } from "@/utils/auth";

export async function GET(_, { params }) {
  const user = await getUserFromToken(params.token);

  return new Response(
    JSON.stringify({ success: !!user?._id, message: "" })
  );
}