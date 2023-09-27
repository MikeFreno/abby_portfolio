import Link from "next/link";
import { Acting, Commercial, Film, Photography, Sketch } from "~/types/db";
import { toTitleCase } from "~/utility/functions";

export default async function AdminMainPage() {
  const actingDraftResponse = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/acting/get-all-drafts`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  const actingLiveResponse = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/acting/get-all-live`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  const commercialDraftResponse = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/commercial/get-all-drafts`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  const commercialLiveResponse = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/commercial/get-all-live`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  const filmDraftResponse = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/film/get-all-drafts`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  const filmLiveResponse = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/film/get-all-live`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  const photographyDraftResponse = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/photography/get-all-drafts`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  const photographyLiveResponse = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/photography/get-all-live`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  const sketchDraftResponse = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/photography/get-all-drafts`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  const sketchLiveResponse = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/photography/get-all-live`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  const actingDrafts = (await actingDraftResponse.json()).rows as Acting[];
  const actingLive = (await actingLiveResponse.json()).rows as Acting[];
  const commercialDrafts = (await commercialDraftResponse.json())
    .rows as Commercial[];
  const commercialLive = (await commercialLiveResponse.json())
    .rows as Commercial[];
  const filmDrafts = (await filmDraftResponse.json()).rows as Film[];
  const filmLive = (await filmLiveResponse.json()).rows as Film[];
  const photographyDrafts = (await photographyDraftResponse.json())
    .rows as Photography[];
  const photographyLive = (await photographyLiveResponse.json())
    .rows as Photography[];
  const sketchDrafts = (await sketchDraftResponse.json()).rows as Sketch[];
  const sketchLive = (await sketchLiveResponse.json()).rows as Sketch[];

  return (
    <div className="px-12 min-h-screen w-full pb-40 fade-in">
      <div className="py-16 text-center text-2xl">All project drafts</div>
      <div className="">
        {actingDrafts.length +
          commercialDrafts.length +
          filmDrafts.length +
          photographyDrafts.length +
          sketchDrafts.length ==
        0 ? (
          <div className="text-center">No drafts currently!</div>
        ) : (
          <>
            <ProjectSection
              data={actingDrafts}
              type={"acting"}
              published={false}
            />
            <ProjectSection
              data={commercialDrafts}
              type={"commercial"}
              published={false}
            />
            <ProjectSection data={filmDrafts} type={"film"} published={false} />
            <ProjectSection
              data={photographyDrafts}
              type={"photography"}
              published={false}
            />
            <ProjectSection
              data={sketchDrafts}
              type={"sketch"}
              published={false}
            />
          </>
        )}
      </div>
      <hr className="my-16" />
      <div className="pb-16 text-center text-2xl">All live projects</div>
      <div className="">
        {actingLive.length +
          commercialLive.length +
          filmLive.length +
          photographyLive.length +
          sketchLive.length ==
        0 ? (
          <div className="text-center">No live projects currently!</div>
        ) : (
          <>
            <ProjectSection
              data={actingLive}
              type={"acting"}
              published={true}
            />
            <ProjectSection
              data={commercialLive}
              type={"commercial"}
              published={true}
            />
            <ProjectSection data={filmLive} type={"film"} published={true} />
            <ProjectSection
              data={photographyLive}
              type={"photography"}
              published={true}
            />
            <ProjectSection
              data={sketchLive}
              type={"sketch"}
              published={true}
            />
          </>
        )}
      </div>
    </div>
  );
}

function ProjectSection(props: {
  data: Acting[] | Commercial[] | Film[] | Photography[] | Sketch[];
  type: "acting" | "commercial" | "film" | "photography" | "sketch";
  published: boolean;
}) {
  return props.data?.length > 0 ? (
    <>
      <div className="text-center py-2 text-xl underline underline-offset-4 tracking-wide">
        {props.published
          ? `Live ${props.type} projects`
          : `${toTitleCase(props.type)} drafts`}
      </div>
      <div className="grid grid-cols-2 gap-8 pb-4 last:flex last:justify-center">
        {props.data.map((row) => (
          <div
            key={row.id}
            className="px-8 py-4 my-4 rounded-md shadow-xl bg-emerald-50 h-fit"
          >
            <div className="flex flex-col justify-evenly">
              <div className="text-2xl text-center py-4">{row.title}</div>
              <div className="flex justify-center py-4">
                <Link
                  href={`/admin/control/edit/${props.published}/${row.id}`}
                  className="w-fit rounded border text-white shadow-md border-emerald-500 bg-emerald-400 hover:bg-emerald-500 active:scale-90 transition-all duration-300 ease-in-out px-4 py-2"
                >
                  Edit this {props.type} post
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  ) : null;
}
