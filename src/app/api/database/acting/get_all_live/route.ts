import { NextRequest, NextResponse } from "next/server";
import { ConnectionFactory } from "~/app/api/database/ConnectionFactory";

export async function GET(request: NextRequest) {
  try {
    const conn = ConnectionFactory();
    const query = "SELECT * FROM Acting WHERE published = ?";
    const params = [true];
    const results = await conn.execute(query, params);
    console.log("acting live:" + results);
    return NextResponse.json({ rows: results.rows }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: e }, { status: 500 });
  }
}
