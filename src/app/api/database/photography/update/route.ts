import { NextRequest, NextResponse } from "next/server";
import { ConnectionFactory } from "~/app/api/database/ConnectionFactory";

interface PATCHInputData {
  id: number;
  title?: string | null;
  blurb?: string | null;
  images?: string[] | null;
  photography_flow?: JSON | null;
  captions?: JSON | null;
  published?: boolean | null;
}

export async function PATCH(input: NextRequest) {
  const inputData = (await input.json()) as PATCHInputData;
  const { id, title, blurb, images, photography_flow, captions, published } =
    inputData;

  const conn = ConnectionFactory();

  let setFields = "";
  const updateParams = [];

  if (title) {
    setFields += "title = ?, ";
    updateParams.push(title);
  }
  if (blurb) {
    setFields += "blurb = ?, ";
    updateParams.push(blurb);
  }
  if (images) {
    setFields += "images = ?, ";
    const imagesJoined = images.join(",");
    updateParams.push(imagesJoined);
  }
  if (photography_flow) {
    setFields += "photography_flow = ?, ";
    updateParams.push(JSON.stringify(photography_flow));
  }
  if (captions) {
    setFields += "captions = ?, ";
    updateParams.push(captions);
  }
  if (published) {
    setFields += "published = ?, ";
    updateParams.push(published);
  }

  const query = `UPDATE Photography SET ${setFields.slice(0, -2)} WHERE id = ?`;
  const params = [...updateParams, id];

  const res = await conn.execute(query, params);
  console.log(res);
  return NextResponse.json({ res });
}
