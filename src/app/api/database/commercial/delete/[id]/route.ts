import { NextRequest, NextResponse } from "next/server";
import { ConnectionFactory } from "~/app/api/database/ConnectionFactory";

export async function POST(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const conn = ConnectionFactory();
  const query = "DELETE FROM Commercial WHERE id = ?";
  const params = [context.params.id];
  const results = await conn.execute(query, params);
  console.log(results);

  return NextResponse.json({ status: 202 });
}
