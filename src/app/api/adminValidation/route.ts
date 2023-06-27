import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { env } from "~/env.mjs";
import { cookies } from "next/headers";

interface InputData {
  username: string;
  password: string;
}

export async function POST(input: NextRequest) {
  const inputData = (await input.json()) as InputData;
  const { username, password } = inputData;
  if (username == env.ADMIN_USERNAME && password == env.ADMIN_PASSWORD) {
    const accessToken = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 14,
        data: username,
      },
      env.JWT_SECRET_KEY
    );
    let response = NextResponse.next().cookies.set("token", accessToken);
    return response;
  } else {
    return NextResponse.json({ error: "Bad Authentication" }, { status: 401 });
  }
}
