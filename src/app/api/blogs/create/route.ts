import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const newBlog = await req.json();
    if (!newBlog) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }
    return NextResponse.json({ message: "Blog created", blog: newBlog });
  }
  catch(err) {
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}