import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { env } from "~/env.mjs";

export async function POST(request: NextRequest) {
  const token = request.cookies.get("token");

  if (token == null)
    return NextResponse.json({ error: "No Authentication" }, { status: 401 });

  jwt.verify(token.value, env.JWT_SECRET_KEY, (err) => {
    if (err)
      return NextResponse.json({ error: "No Authentication" }, { status: 403 });
    else {
      return NextResponse.json({ status: 202 });
    }
  });
}
