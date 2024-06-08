import Account from "@/models/Account";
import connectDB from "@/db/connect";

export async function GET() {
  await connectDB();
  const accounts = await Account.find();

  return new Response(
    JSON.stringify({ success: true, message: "", data: accounts })
  );
}

export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const account = await Account.create(body);

  return new Response(
    JSON.stringify({ success: true, message: "", data: account })
  );
}
