import { NextRequest, NextResponse } from "next/server";
import { ConnectionFactory } from "~/app/api/database/ConnectionFactory";

interface PATCHInputData {
  id: number;
  title: string | null;
  blurb: string | null;
  link: string | null;
  attachments: string | null;
  published: boolean | null;
}
export async function PATCH(input: NextRequest) {
  const inputData = (await input.json()) as PATCHInputData;
  const { id, title, blurb, link, attachments, published } = inputData;

  const conn = ConnectionFactory();

  let setFields = "";
  const updateParams = [];

  if (title !== null) {
    setFields += "title = ?, ";
    updateParams.push(title);
  }
  if (blurb !== null) {
    setFields += "blurb = ?, ";
    updateParams.push(blurb);
  }
  if (link !== null) {
    setFields += "link = ?, ";
    updateParams.push(link);
  }
  if (attachments !== null) {
    setFields += "attachments = ?, ";
    updateParams.push(attachments);
  }
  if (published !== null) {
    setFields += "published = ?, ";
    updateParams.push(published);
  }

  const query = `UPDATE Film SET ${setFields.slice(0, -2)} WHERE id = ?`;
  const params = [...updateParams, id];

  const res = await conn.execute(query, params);
  return NextResponse.json({ res });
}
