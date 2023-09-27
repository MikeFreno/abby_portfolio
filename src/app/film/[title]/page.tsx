/* eslint-disable @next/next/no-img-element */
import { env } from "~/env.mjs";
import { Film } from "~/types/db";

export default async function DynamicFilmPage({
  params,
}: {
  params: { title: string };
}) {
  const filmResponse = await fetch(
    `${
      process.env.NEXT_PUBLIC_DOMAIN
    }/api/database/film/get_by_title/${params.title.replace("%20", " ")}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  const film = (await filmResponse.json()).row as Film;

  if (film) {
    return (
      <div className="">
        {film.link ? (
          <div className="py-24 flex justify-center mx-auto">
            <iframe
              width="800"
              height="450"
              src={film.link}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            />
          </div>
        ) : (
          <div className="h-96" />
        )}

        <div className="text-center text-4xl tracking-wide font-semibold">
          {film.title.toUpperCase()}
        </div>
        <div
          className="flex justify-center text-center mx-auto py-12 max-w-[60vw] md:max-w-[40vw]"
          dangerouslySetInnerHTML={{
            __html: film.blurb as string,
          }}
        />
        <div className="grid grid-cols-3 gap-4">
          {film.attachments
            ?.split(",")
            .map((key, index) => (
              <img
                key={index}
                src={env.NEXT_PUBLIC_AWS_BUCKET_STRING + key}
                alt={index.toString()}
              />
            ))}
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
