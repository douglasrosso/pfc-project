import Entry from "@/models/Entry";
import connectDB from "@/db/connect";

export async function GET() {
  await connectDB();
  const entries = await Entry.find();

  return new Response(
    JSON.stringify({ success: true, message: "", data: entries })
  );
}

export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const entry = await Entry.create(body);

  return new Response(
    JSON.stringify({ success: true, message: "", data: entry })
  );
}
