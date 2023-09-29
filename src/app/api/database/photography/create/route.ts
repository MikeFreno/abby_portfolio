import { NextRequest, NextResponse } from "next/server";
import { ConnectionFactory } from "~/app/api/database/ConnectionFactory";
import { Photography } from "~/types/db";

interface POSTInputData {
  title: string;
  blurb: string | null;
  images?: string[] | null;
  cover_image?: string | null;
  captions?: JSON | null;
  published: boolean;
}

export async function POST(input: NextRequest) {
  const inputData = (await input.json()) as POSTInputData;
  const { title, blurb, images, cover_image, captions, published } = inputData;

  const conn = ConnectionFactory();
  const query = `
    INSERT INTO Photography (title, blurb, images, cover_image, photography_flow, captions, published)
    VALUES (?, ?, ?, ?, ?, ?)
    `;
  const imagesJoined = images ? images.join("\\,") : null;
  const captions_entry = captions ? captions : null;
  const params = [
    title,
    blurb,
    imagesJoined,
    cover_image,
    null,
    captions_entry,
    published,
  ];
  try {
    await conn.execute(query, params);
    const followup_query = `SELECT * FROM Photography`;
    const followup_res = await conn.execute(followup_query);
    const albums = followup_res.rows as Photography[];
    const last_id = albums[albums.length - 1].id;
    return NextResponse.json({ id: last_id }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
