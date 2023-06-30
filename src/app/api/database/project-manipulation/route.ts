"use server";

import { NextRequest } from "next/server";
import { ConnectionFactory } from "~/app/api/database/ConnectionFactory";

interface InputData {
  title: string;
  blurb: string | null;
  embedded_link: string | null;
  attachments: string | null;
  published: boolean;
  type: string;
}
//create a new project
export async function POST(input: NextRequest) {
  const inputData = (await input.json()) as InputData;
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
