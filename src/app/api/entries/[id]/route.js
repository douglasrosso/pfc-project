import Entry from "@/models/Entry";
import connectDB from "@/db/connect";

export async function PUT(request, { params }) {
  await connectDB();
  const body = await request.json();
  const entry = await Entry.findByIdAndUpdate(params.id, body);

  return new Response(
    JSON.stringify({ success: true, message: "", data: entry })
  );
}

export async function GET(_, { params }) {
  await connectDB();
  const entry = await Entry.findById(params.id);

  return new Response(
    JSON.stringify({ success: true, message: "", data: entry })
  );
}

export async function DELETE(_, { params }) {
  await connectDB();
  const entry = await Entry.findByIdAndDelete(params.id);

  return new Response(
    JSON.stringify({ success: true, message: "", data: entry })
  );
}
