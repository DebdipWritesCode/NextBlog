import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = cookies();

  if (cookieStore.has("token")) {
    cookieStore.delete("token");
    return NextResponse.json({ message: "Logged out successfully" }, { status: 200 });
  }
}