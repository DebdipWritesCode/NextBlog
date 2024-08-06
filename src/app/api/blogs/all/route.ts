import { NextResponse } from "next/server";
import dummyBlogs from "@/data/dummyData";

export async function GET() {
  return NextResponse.json(dummyBlogs, { status: 200 });
} 