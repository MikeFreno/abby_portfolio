import { NextRequest, NextResponse } from "next/server";
import { ConnectionFactory } from "../ConnectionFactory";

interface InputData {
  id: number;
}

export async function POST(input: NextRequest) {
  const inputData = (await input.json()) as InputData;
  const { id } = inputData;

  const conn = ConnectionFactory();
  const query = "SELECT * FROM Project WHERE id = ?";
  const params = [id];
  const results = await conn.execute(query, params);
  return NextResponse.json({ row: results.rows[0] }, { status: 200 });
}
