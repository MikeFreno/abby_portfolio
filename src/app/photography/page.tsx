/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Row } from "~/types/db";
import { ConnectionFactory } from "../api/database/ConnectionFactory";

export default async function PhotographyMainPage() {
  const conn = ConnectionFactory();
  const query = "SELECT * FROM Project WHERE Type = ?  AND Published = ?";
  const params = ["photography", true]; // false is represented as 0 in MySQL
  const photographyResponse = await conn.execute(query, params);

  const photographyData = photographyResponse.rows as Row[];

  if (photographyData) {
    if (photographyData.length > 0)
      return (
        <div className="min-h-screen">
          <div className="grid grid-cols-2 gap-2 grid-flow-col">
            {photographyData.map((row) => (
              <div key={row.id}>
                <img
                  src={
                    row.Attachments?.split(",")[0]
                      ? row.Attachments?.split(",")[0]
                      : "/placeholder.jpg"
                  }
                />
              </div>
            ))}
          </div>
        </div>
      );
    else {
      return (
        <div className="h-screen w-screen flex flex-col justify-center">
          <div className="text-center">No photography albums yet!</div>
        </div>
      );
    }
  } else {
    return (
      <div className="h-screen w-screen flex flex-col justify-center">
        <div className="text-center">Critical Error retrieving data!</div>
      </div>
    );
  }
}
