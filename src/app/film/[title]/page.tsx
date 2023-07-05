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
    }
  );
  const projectData = (await filmResponse.json()) as ResponseData;

  if (projectData.rows) {
    if (projectData.rows[0]) {
      return (
        <div className="">
          <div className="py-24 text-center text-2xl">
            {projectData.rows[0].Title}
          </div>
          <div
            className="text-center pb-12"
            dangerouslySetInnerHTML={{
              __html: projectData.rows[0].Blurb as string,
            }}
          />
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
