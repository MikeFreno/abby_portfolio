// "use server";

// import { ConnectionFactory } from "~/app/api/database/ConnectionFactory";

// export async function GetAllDrafts(input: string) {
//   if (input === "film" || input === "commercial" || input === "photography") {
//     const conn = ConnectionFactory();
//     const query =
//       "SELECT * FROM YourTableName WHERE Published = ? AND Type = ?";
//     const params = [false, input]; // false is represented as 0 in MySQL
//     const results = await conn.execute(query, params);
//     return results.rows;
//   }
// }
