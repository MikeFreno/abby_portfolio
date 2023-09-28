import { NextRequest, NextResponse } from "next/server";
import { ConnectionFactory } from "~/app/api/database/ConnectionFactory";

export async function DELETE(
  request: NextRequest,
  context: { params: { id: number } },
) {
  try {
    const conn = ConnectionFactory();
    const query = "DELETE FROM Photography WHERE id = ?";
    const params = [context.params.id];
    await conn.execute(query, params);
    return NextResponse.json({ status: 202 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: 500 });
  }
}
