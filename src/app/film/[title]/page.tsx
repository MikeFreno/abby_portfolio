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
      body: JSON.stringify({ type: "film", title: params.title }),
      cache: "no-store",
    }
  );
  const project = (await filmResponse.json()) as ResponseData;

  if (project.rows && project.rows[0]) {
    return (
      <div className="min-h-screen w-full">
        <div>{project.rows[0].Title}</div>
        <div>{project.rows[0].Blurb}</div>
        <div>{project.rows[0].Embedded_Link}</div>
        <div>{project.rows[0].Attachments}</div>
      </div>
    );
  } else
    return (
      <div className="h-screen w-full flex flex-col justify-center">
        <div className="mx-auto text-xl -mt-[10vh]">Error: no film found</div>
      </div>
    );
}
