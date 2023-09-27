/* eslint-disable @next/next/no-img-element */
import { ParsedPhotographyFlow, Photography } from "~/types/db";
import { env } from "~/env.mjs";

export default async function DynamicPhotographyPage({
  params,
}: {
  params: { title: string };
}) {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_DOMAIN
    }/api/database/photography/get_by_title/${params.title.replace(
      "%20",
      " ",
    )}`,
    {
      method: "GET",
    },
  );

  const album = (await res.json()).row as Photography;

  const flow = (await album.photography_flow.json()) as ParsedPhotographyFlow;

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
            <div key={row} className="">
              {values.map((leaf, idx) => (
                <div key={idx}>
                  <img
                    alt={`photo_${row}_${idx}`}
                    src={env.NEXT_PUBLIC_AWS_BUCKET_STRING + leaf}
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
