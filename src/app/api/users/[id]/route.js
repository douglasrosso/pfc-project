import User from "@/models/User";
import connectDB from "@/db/connect";

export async function PUT(request, { params }) {
  await connectDB();
  const body = await request.json();
  const user = await User.findByIdAndUpdate(params.id, body);

  return new Response(
    JSON.stringify({ success: true, message: "", data: user })
  );
}

export async function GET(_, { params }) {
  await connectDB();
  const user = await User.findById(params.id);

  return new Response(
    JSON.stringify({ success: true, message: "", data: user })
  );
}

export async function DELETE(_, { params }) {
  await connectDB();
  const user = await User.findByIdAndDelete(params.id);

  return new Response(
    JSON.stringify({ success: true, message: "", data: user })
  );
}
