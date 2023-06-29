import { NextRequest, NextResponse } from "next/server";
import { ConnectionFactory } from "~/app/api/database/ConnectionFactory";

interface InputData {
  type: string;
}
//get by type
export async function POST(input: NextRequest) {
  const inputData = (await input.json()) as InputData;
  const { type } = inputData;

  if (type === "film" || type === "commercial" || type === "photography") {
    const conn = ConnectionFactory();
    const query = "SELECT * FROM Project WHERE Published = ? AND Type = ?";
    const params = [false, type]; // false is represented as 0 in MySQL
    const results = await conn.execute(query, params);
    return NextResponse.json({ rows: results.rows }, { status: 200 });
  } else {
    return NextResponse.json(
      { error: "Invalid Type Request" },
      { status: 400 }
    );
  }
}
//get all
export async function GET() {
  const conn = ConnectionFactory();
  const query = "SELECT * FROM Project WHERE Published = ?";
  const params = [false]; // false is represented as 0 in MySQL
  const results = await conn.execute(query, params);
  return NextResponse.json({ rows: results.rows }, { status: 200 });
}
