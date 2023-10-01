/* eslint-disable @next/next/no-img-element */
import { Photography } from "~/types/db";
import { env } from "~/env.mjs";
import { ConnectionFactory } from "~/app/api/database/ConnectionFactory";
import PhotographyAlbum from "./client";

export default async function DynamicPhotographyPage({
  params,
}: {
  params: { title: string };
}) {
  const conn = ConnectionFactory();
  const query = `SELECT * FROM Photography WHERE title = ? AND published = ?`;
  const db_params = [params.title.replaceAll("%2C", ","), true];

  const res = await conn.execute(query, db_params);
  //console.log("Results:" + res.rows[0]);
  const album = res.rows[0] as Photography;

  let flow: { [key: number]: string[] } = {};
  if (album && album.photography_flow) {
    flow = album.photography_flow;
  } else {
    if (album.images) {
      // render default flowState
      let localAttachments = album.images.split("\\,");
      let srced: { src: string }[] = [];
      localAttachments.forEach((attachment) =>
        srced.push({ src: env.NEXT_PUBLIC_AWS_BUCKET_STRING + attachment }),
      );

      let necessaryRows = Math.ceil(localAttachments.length / 3);
      for (let n = 0; n < necessaryRows; n++) {
        flow[n] = localAttachments.slice(n * 3, n * 3 + 3);
      }
    }
  }

  if (album) {
    return <PhotographyAlbum album={album} flow={flow} />;
  } else {
    return (
      <div className="h-screen w-screen flex flex-col justify-center">
        <div className="-mt-16 text-center">Album not found</div>
      </div>
    );
  }
}
