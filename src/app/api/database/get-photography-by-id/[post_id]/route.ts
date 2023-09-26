import { NextRequest, NextResponse } from "next/server";
import { ConnectionFactory } from "../../ConnectionFactory";

export async function GET(
  request: NextRequest,
  context: { params: { post_id: string } },
) {
  const conn = ConnectionFactory();
  const query = "SELECT * FROM Project WHERE Type = 'photography' AND id = ?";
  const params = [context.params.post_id];
  const results = await conn.execute(query, params);
  return NextResponse.json({ rows: results.rows }, { status: 200 });
}
