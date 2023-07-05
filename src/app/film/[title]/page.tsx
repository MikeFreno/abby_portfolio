/* eslint-disable @next/next/no-img-element */
import { env } from "~/env.mjs";
import { ResponseData } from "~/types/db";

export default async function DynamicFilmPage({
  params,
}: {
  params: { title: string };
}) {
  const filmResponse = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/get-live-project-by-type-and-title`,
    {
      method: "POST",
      body: JSON.stringify({
        type: "film",
        title: params.title.replace("%20", " "),
      }),
      cache: "no-store",
    }
  );
  const projectData = (await filmResponse.json()) as ResponseData;

  if (projectData.rows) {
    if (projectData.rows[0]) {
      console.log(
        "attachments: " + projectData.rows[0].Attachments?.split(",")
      );

      return (
        <div className="">
          {projectData.rows[0].Embedded_Link ? (
            <div className="py-24 flex justify-center mx-auto">
              <iframe
                width="800"
                height="450"
                src={projectData.rows[0].Embedded_Link}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              />
            </div>
          ) : (
            <div className="h-96" />
          )}

          <div className="text-center text-4xl tracking-wide font-semibold">
            {projectData.rows[0].Title}
          </div>
          <div
            className="text-center py-12"
            dangerouslySetInnerHTML={{
              __html: projectData.rows[0].Blurb as string,
            }}
          />
          <div className="grid grid-cols-3 gap-4">
            {projectData.rows[0].Attachments?.split(",").map((key, index) => (
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
  } else {
    return (
      <div className="h-screen w-screen flex flex-col justify-center">
        <div className="-mt-16 text-center">
          Data fetching from server failed!
        </div>
      </div>
    );
  }
}
