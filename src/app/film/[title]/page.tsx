/* eslint-disable @next/next/no-img-element */
import { ConnectionFactory } from "~/app/api/database/ConnectionFactory";
import { env } from "~/env.mjs";
import { Film } from "~/types/db";

export default async function DynamicFilmPage({
  params,
}: {
  params: { title: string };
}) {
  const conn = ConnectionFactory();
  const query = `SELECT * FROM Film WHERE title = ? AND published = ?`;
  const db_params = [params.title, true];
  const res = await conn.execute(query, db_params);
  const film = res.rows[0] as Film;

  if (film) {
    return (
      <div className="">
        {film.link ? (
          <div className="py-24 flex justify-center mx-auto">
            <iframe
              width="1200"
              height="700"
              src={film.link}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            />
          </div>
        ) : (
          <div className="h-96" />
        )}

        <div className="text-center text-4xl tracking-wide font-semibold">
          {film.title.replaceAll("_", " ").toUpperCase()}
        </div>
        {film.blurb ? (
          <div
            className="flex justify-center text-center mx-auto py-12 max-w-[60vw] md:max-w-[40vw]"
            dangerouslySetInnerHTML={{
              __html: film.blurb,
            }}
          />
        ) : (
          <div className="py-12" />
        )}
        <div className="flex justify-evenly w-full">
          {film.attachments
            ? film.attachments.split("\\,").map((key, index) => (
                <img
                  key={index}
                  src={env.NEXT_PUBLIC_AWS_BUCKET_STRING + key}
                  alt={index.toString()}
                  style={{
                    maxWidth: `${
                      100 / (film.attachments!.split(",").length + 1)
                    }%`,
                  }}
                />
              ))
            : null}
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-screen w-screen flex flex-col justify-center">
        <div className="-mt-16 text-center">Film not found</div>
      </div>
    );
  }
}
