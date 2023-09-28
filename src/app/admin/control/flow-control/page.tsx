import Link from "next/link";
import { env } from "~/env.mjs";
import { Photography } from "~/types/db";

export default async function EditOverviewPage() {
  const publishedPhotography = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/photography/get_all_live`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  const pub_projects = (await publishedPhotography.json())
    .rows as Photography[];

  const draftPhotography = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/photography/get_all_drafts`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  const draft_projects = (await draftPhotography.json()).rows as Photography[];

  return (
    <div className="min-h-screen w-full">
      <div className="text-3xl underline underline-offset-4 tracking-wider italic text-center pt-4">
        Flow Control
      </div>
      <div className="text-2xl text-center pt-24">
        Live photography projects
      </div>
      <div>
        {pub_projects.length == 0 ? (
          <div className="text-center pt-24">
            No live photography currently!
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-8 grid-flow-row pb-4 px-24 pt-24 last:flex last:justify-center">
            {pub_projects.map((row) => (
              <div
                key={row.id}
                className="px-8 py-4 rounded-md shadow-xl bg-zinc-100 h-fit"
              >
                <div className="flex flex-col justify-evenly">
                  <div className="text-2xl text-center pt-2">
                    {row.title.replace("_", " ")}
                  </div>
                  <div className="flex justify-center">
                    <div className="flex flex-col">
                      <img
                        className="mx-auto py-2"
                        width="120px"
                        src={
                          env.NEXT_PUBLIC_AWS_BUCKET_STRING +
                          row.images?.split("\\,")[0]
                        }
                        alt={"post image"}
                      />
                      <Link
                        href={`/admin/control/flow-control/${row.id}/`}
                        className="w-fit rounded border text-white shadow-md border-emerald-500 bg-emerald-400 hover:bg-emerald-500 active:scale-90 transition-all duration-300 ease-in-out px-4 py-2"
                      >
                        Edit this photography post
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-2xl text-center pt-24">
        Draft photography projects
      </div>
      <div>
        {draft_projects.length == 0 ? (
          <div className="text-center pt-24">
            No photography drafts currently!
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-8 grid-flow-row pb-4 px-24 pt-24 last:flex last:justify-center">
            {draft_projects.map((row) => (
              <div
                key={row.id}
                className="px-8 py-4 rounded-md shadow-xl bg-zinc-100 h-fit"
              >
                <div className="flex flex-col justify-evenly">
                  <div className="text-2xl text-center pt-2">{row.title}</div>
                  <div className="flex justify-center">
                    <div className="flex flex-col">
                      <img
                        className="mx-auto py-2"
                        width="120px"
                        src={
                          env.NEXT_PUBLIC_AWS_BUCKET_STRING +
                          row.images?.split("\\,")[0]
                        }
                        alt={"post image"}
                      />
                      <Link
                        href={`/admin/control/flow-control/${row.id}/`}
                        className="w-fit rounded border text-white shadow-md border-emerald-500 bg-emerald-400 hover:bg-emerald-500 active:scale-90 transition-all duration-300 ease-in-out px-4 py-2"
                      >
                        Edit this photography post
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
