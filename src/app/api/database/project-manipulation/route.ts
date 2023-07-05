import { NextRequest } from "next/server";
import { ConnectionFactory } from "~/app/api/database/ConnectionFactory";

interface POSTInputData {
  title: string;
  blurb: string | null;
  embedded_link: string | null;
  attachments: string | null;
  published: boolean;
  type: string;
}
interface PATCHInputData {
  id: number;
  title: string | null;
  blurb: string | null;
  embedded_link: string | null;
  attachments: string | null;
  published: boolean | null;
  type: string | null;
}
//create a new project
export async function POST(input: NextRequest) {
  const inputData = (await input.json()) as POSTInputData;
  const { title, blurb, embedded_link, attachments, published, type } =
    inputData;

  const conn = ConnectionFactory();
  const query = `
    INSERT INTO Project (Title, Blurb, Embedded_Link, Attachments, Published, Type)
    VALUES (?, ?, ?, ?, ?, ?)
    `;

  const params = [title, blurb, embedded_link, attachments, published, type];
  const results = await conn.execute(query, params);
  console.log(results);
}
//update a project
export async function PATCH(input: NextRequest) {
  const inputData = (await input.json()) as PATCHInputData;
  const { id, title, blurb, embedded_link, attachments, published, type } =
    inputData;

  const conn = ConnectionFactory();

  let setFields = "";
  const updateParams = [];

  if (title !== null) {
    setFields += "Title = ?, ";
    updateParams.push(title);
  }
  if (blurb !== null) {
    setFields += "Blurb = ?, ";
    updateParams.push(blurb);
  }
  if (embedded_link !== null) {
    setFields += "Embedded_Link = ?, ";
    updateParams.push(embedded_link);
  }
  if (attachments !== null) {
    setFields += "Attachments = ?, ";
    updateParams.push(attachments);
  }
  if (published !== null) {
    setFields += "Published = ?, ";
    updateParams.push(published);
  }
  if (type !== null) {
    setFields += "Type = ?, ";
    updateParams.push(type);
  }

  const query = `UPDATE Project SET ${setFields.slice(0, -2)} WHERE id = ?`;
  const params = [...updateParams, id];

  await conn.execute(query, params);
}
