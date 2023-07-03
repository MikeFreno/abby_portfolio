import { NextRequest, NextResponse } from "next/server";
import { ConnectionFactory } from "../ConnectionFactory";

export async function GET() {
  const conn = ConnectionFactory();
  const query = "SELECT * FROM Project WHERE Type = ?";
  const params = ["photography"]; // false is represented as 0 in MySQL
  const results = await conn.execute(query, params);
  return NextResponse.json({ rows: results.rows }, { status: 200 });
}
