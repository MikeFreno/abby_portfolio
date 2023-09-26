"use server";

import { ConnectionFactory } from "~/app/api/database/ConnectionFactory";
import { env } from "~/env.mjs";

export async function InitDatabase(input: FormData) {
  const tableName = input.get("tableName")?.toString();
  const password = input.get("password")?.toString();
  if (
    tableName === "Project" &&
    password === env.DANGEROUS_DBCOMMAND_PASSWORD
  ) {
    const conn = ConnectionFactory();
    const query = `
CREATE TABLE Project (
    id INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Blurb TEXT,
    Embedded_Link VARCHAR(2048),
    Attachments TEXT,
    Published BOOLEAN NOT NULL DEFAULT 0,
    Type VARCHAR(255) NOT NULL,
    PhotographyFlow TEXT,
)
`;

    const results = await conn.execute(query);
    console.log(results);
  }
}

export async function DeleteTable(input: FormData) {
  const tableName = input.get("tableName")?.toString();
  const password = input.get("password")?.toString();

  if (
    tableName === "Project" &&
    password === env.DANGEROUS_DBCOMMAND_PASSWORD
  ) {
    const conn = ConnectionFactory();
    const query = "DROP TABLE Project";
    const results = await conn.execute(query);
    console.log(results);
  }
}
