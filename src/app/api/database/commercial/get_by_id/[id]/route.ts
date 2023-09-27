import { NextRequest, NextResponse } from "next/server";
import { ConnectionFactory } from "~/app/api/database/ConnectionFactory";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } },
) {
  try {
    const conn = ConnectionFactory();
    const query = "SELECT * FROM Commercial WHERE id = ?";
    const params = [+context.params.id];
    const results = await conn.execute(query, params);
    return NextResponse.json({ row: results.rows[0] }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
