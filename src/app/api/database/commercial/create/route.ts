import { NextRequest, NextResponse } from "next/server";
import { ConnectionFactory } from "~/app/api/database/ConnectionFactory";
import { Acting } from "~/types/db";

interface POSTInputData {
  title: string;
  blurb: string | null;
  link: string | null;
  attachments: string[];
  published: boolean;
}

export async function POST(input: NextRequest) {
  const inputData = (await input.json()) as POSTInputData;
  const { title, blurb, link, attachments, published } = inputData;

  const conn = ConnectionFactory();
  const query = `
    INSERT INTO Commercial (title, blurb, link, attachments, published)
    VALUES (?, ?, ?, ?, ?)
    `;
  try {
    const params = [
      title,
      blurb,
      link,
      attachments ? attachments?.join("\\,") : null,
      published,
    ];
    await conn.execute(query, params);
    const followup_query = `SELECT * FROM Commercial`;
    const followup_res = await conn.execute(followup_query);
    const rows = followup_res.rows as Acting[];
    const last_title = rows[rows.length - 1].title;
    return NextResponse.json({ title: last_title }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
