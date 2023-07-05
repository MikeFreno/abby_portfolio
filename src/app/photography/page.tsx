import { Row } from "~/types/db";
import { ConnectionFactory } from "../api/database/ConnectionFactory";
import AlbumCover from "./AlbumCover";

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-12 py-24">
            {photographyData.map((row) => (
              <AlbumCover
                key={row.id}
                id={row.id}
                Title={row.Title}
                Blurb={row.Blurb}
                Embedded_Link={row.Embedded_Link}
                Attachments={row.Attachments}
                Published={row.Published}
                Type={row.Type}
              />
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
