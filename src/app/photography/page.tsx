import { Photography } from "~/types/db";
import { ConnectionFactory } from "../api/database/ConnectionFactory";
import AlbumCover from "./AlbumCover";

export default async function PhotographyMainPage() {
  const conn = ConnectionFactory();
  const query = "SELECT * FROM Photography WHERE Published = ?";
  const params = [true];
  const photographyResponse = await conn.execute(query, params);

  const photographyData = photographyResponse.rows as Photography[];

  if (photographyData) {
    if (photographyData.length > 0)
      return (
        <div className="min-h-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 px-12 py-24">
            {photographyData.map((row) => (
              <AlbumCover
                key={row.id}
                id={row.id}
                title={row.title}
                blurb={row.blurb}
                images={row.images}
                published={row.published}
                photography_flow={row.photography_flow}
                captions={row.captions}
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
