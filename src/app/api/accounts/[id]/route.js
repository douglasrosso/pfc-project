import Account from "@/models/Account";
import connectDB from "@/db/connect";

export async function PUT(request, { params }) {
  await connectDB();
  const body = await request.json();
  const account = await Account.findByIdAndUpdate(params.id, body);

  return new Response(
    JSON.stringify({ success: true, message: "", data: account })
  );
}

export async function GET(_, { params }) {
  await connectDB();
  const account = await Account.findById(params.id);

  return new Response(
    JSON.stringify({ success: true, message: "", data: account })
  );
}

export async function DELETE(_, { params }) {
  await connectDB();
  const account = await Account.findByIdAndDelete(params.id);

  return new Response(
    JSON.stringify({ success: true, message: "", data: account })
  );
}
