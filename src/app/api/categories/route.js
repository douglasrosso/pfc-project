import dotenv from "dotenv";
import Category from "@/models/Category";
import connectDB from "@/db/connect";

dotenv.config();

export async function GET(request) {
  await connectDB();
  const categories = await Category.find();

  return new Response(
    JSON.stringify({ success: true, message: "", data: categories })
  );
}

export async function POST(request) {
  await connectDB();
  const body = await request.json();
  const category = await Category.create(body);

  return new Response(
    JSON.stringify({ success: true, message: "", data: category })
  );
}
