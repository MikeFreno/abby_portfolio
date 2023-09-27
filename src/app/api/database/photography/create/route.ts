import { NextRequest, NextResponse } from "next/server";
import { ConnectionFactory } from "~/app/api/database/ConnectionFactory";

interface POSTInputData {
  title: string;
  blurb: string | null;
  images: string[] | null;
  captions: JSON | null;
  published: boolean;
}

export async function POST(input: NextRequest) {
  const inputData = (await input.json()) as POSTInputData;
  const { title, blurb, images, captions, published } = inputData;

  const conn = ConnectionFactory();
  const query = `
    INSERT INTO Photography (title, blurb, images, photography_flow, captions, published)
    VALUES (?, ?, ?, ?, ?, ?)
    `;
  const imagesJoined = images ? images.join(",") : {};
  const captions_entry = captions ? captions : {};
  const params = [title, blurb, imagesJoined, {}, captions_entry, published];
  const res = await conn.execute(query, params);
  return NextResponse.json({ res });
}
