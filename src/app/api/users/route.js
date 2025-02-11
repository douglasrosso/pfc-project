import User from "@/models/User";
import connectDB from "@/db/connect";

export async function GET() {
  await connectDB();
  const users = await User.find();

  return new Response(
    JSON.stringify({ success: true, message: "", data: users })
  );
}

export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const user = await User.create(body);

  return new Response(
    JSON.stringify({ success: true, message: "", data: user })
  );
}
