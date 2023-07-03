import { NextRequest, NextResponse } from "next/server";
import { ConnectionFactory } from "../ConnectionFactory";

interface InputData {
  title: string;
  type: string;
}

export async function POST(input: NextRequest) {
  const inputData = (await input.json()) as InputData;
  const { title, type } = inputData;

  const conn = ConnectionFactory();
  const query =
    "SELECT * FROM Project WHERE Type = ? AND Title = ? AND Published = ?";
  const params = [type, title, true];
  const results = await conn.execute(query, params);
  return NextResponse.json({ rows: results.rows }, { status: 200 });
}
