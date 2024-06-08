import Category from "@/models/Category";
import connectDB from "@/db/connect";

export async function PUT(request, { params }) {
  await connectDB();
  const body = await request.json();
  const category = await Category.findByIdAndUpdate(params.id, body);

  return new Response(
    JSON.stringify({ success: true, message: "", data: category })
  );
}

export async function GET(request, { params }) {
  await connectDB();
  const category = await Category.findById(params.id);

  return new Response(
    JSON.stringify({ success: true, message: "", data: category })
  );
}

export async function DELETE(request, { params }) {
  await connectDB();
  const category = await Category.findByIdAndDelete(params.id);

  return new Response(
    JSON.stringify({ success: true, message: "", data: category })
  );
}
