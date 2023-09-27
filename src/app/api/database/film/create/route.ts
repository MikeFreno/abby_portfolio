import { NextRequest, NextResponse } from "next/server";
import { ConnectionFactory } from "~/app/api/database/ConnectionFactory";

interface POSTInputData {
  title: string;
  blurb: string | null;
  link: string | null;
  attachments: string | null;
  published: boolean;
}

export async function POST(input: NextRequest) {
  const inputData = (await input.json()) as POSTInputData;
  const { title, blurb, link, attachments, published } = inputData;

  const conn = ConnectionFactory();
  const query = `
    INSERT INTO Film (title, blurb, link, attachments, published)
    VALUES (?, ?, ?, ?, ?)
    `;

  try {
    const params = [title, blurb, link, attachments, published];
    const res = await conn.execute(query, params);
    console.log(res);
    return NextResponse.json({ result: res });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
