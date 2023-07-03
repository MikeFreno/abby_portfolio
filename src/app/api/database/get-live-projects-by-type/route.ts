import { NextRequest, NextResponse } from "next/server";
import { ConnectionFactory } from "../ConnectionFactory";

interface InputData {
  type: string;
}

export async function POST(input: NextRequest) {
  const inputData = (await input.json()) as InputData;
  const { type } = inputData;

  const conn = ConnectionFactory();
  const query = "SELECT * FROM Project WHERE Type = ?";
  const params = [type];
  const results = await conn.execute(query, params);
  return NextResponse.json({ rows: results.rows }, { status: 200 });
}
