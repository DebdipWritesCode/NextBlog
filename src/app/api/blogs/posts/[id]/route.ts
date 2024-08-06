import { NextRequest, NextResponse } from 'next/server';
import dummyBlogs from "@/data/dummyData";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    const post = dummyBlogs.find((post) => post.id === id);

    if (!post) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json({ message: 'Failed to fetch blog post' }, { status: 500 });
  }
}
