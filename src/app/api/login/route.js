import { authenticate } from "@/utils/auth";
import connectDB from "@/db/connect";
import User from "@/models/User";

export async function POST(request) {
  const body = await request.json();
  await connectDB();
  const user = (
    await User.find({ email: body.email, pwd: body.password })
  )?.[0];
  const hasUser = !!user?.id;

  if (!hasUser) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Usuário e/ou senha incorreto!",
      }),
      { status: 200 }
    );
  }

  if (user?.status !== "on") {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Usuário desativado por favor contate o administrador!",
      }),
      { status: 200 }
    );
  }

  return await authenticate(user).then(res => res);
}
