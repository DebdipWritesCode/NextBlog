import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { token } = await req.json();

  if(!token) {
    return NextResponse.json({ message: "No token provided" }, { status: 400 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    return NextResponse.json({ message: "Token is valid", valid: true, decoded }, { status: 200 });
  }
  catch(err) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
}