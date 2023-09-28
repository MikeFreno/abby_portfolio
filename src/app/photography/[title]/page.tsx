/* eslint-disable @next/next/no-img-element */
import { ParsedPhotographyFlow, Photography } from "~/types/db";
import { env } from "~/env.mjs";
import { ConnectionFactory } from "~/app/api/database/ConnectionFactory";

export default async function DynamicPhotographyPage({
  params,
}: {
  params: { title: string };
}) {
  const conn = ConnectionFactory();
  const query = `SELECT * FROM Photography WHERE title = ? AND published = ?`;
  const db_params = [params.title.replace("%20", " "), true];
  const res = await conn.execute(query, db_params);

  const album = res.rows[0] as Photography;

  let flow: { [key: number]: string[] } = {};
  if (album.photography_flow) {
    flow = album.photography_flow as ParsedPhotographyFlow;
  } else {
    if (album.images) {
      // render default flowState
      let localAttachments = album.images.split(",");
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
    return (
      <div className="">
        <div
          className={`${album.blurb ? "pt-24" : "py-24"} text-center text-2xl`}
        >
          {album.title}
        </div>
        {album.blurb ? (
          <div
            className="pt-8 pb-24 text-center text-xl"
            dangerouslySetInnerHTML={{
              __html: album.blurb,
            }}
          />
        ) : null}
        <div className="px-4">
          {Object.entries(flow).map(([row, values]) => (
            <div key={row} className="flex justify-evenly">
              {values.map((leaf, idx) => (
                <div key={idx} className="flex">
                  <img
                    alt={`photo_${row}_${idx}`}
                    src={env.NEXT_PUBLIC_AWS_BUCKET_STRING + leaf}
                    className="my-auto"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-screen w-screen flex flex-col justify-center">
        <div className="-mt-16 text-center">Album not found</div>
      </div>
    );
  }
}
