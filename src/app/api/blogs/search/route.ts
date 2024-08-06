import dummyBlogs from "@/data/dummyData";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const query = url.searchParams.get("q") || "";
  
  const filteredBlogs = dummyBlogs.filter(blog => 
    blog.title.toLowerCase().includes(query.toLowerCase())
  )

  return NextResponse.json(filteredBlogs)
}