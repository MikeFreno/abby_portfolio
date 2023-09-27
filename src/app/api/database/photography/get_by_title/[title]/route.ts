import { NextRequest, NextResponse } from "next/server";
import { ConnectionFactory } from "~/app/api/database/ConnectionFactory";

export async function GET(
  request: NextRequest,
  context: { params: { title: string } },
) {
  try {
    const conn = ConnectionFactory();
    const query = "SELECT * FROM Photography WHERE title = ?";
    const params = [context.params.title];
    const results = await conn.execute(query, params);
    return NextResponse.json({ row: results.rows[0] }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
