import Link from "next/link";
import { ResponseData } from "~/types/db";

export default async function EditOverviewPage({
  params,
}: {
  params: { type: string };
}) {
  const liveProjectResponse = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/get-live-projects-by-type`,
    {
      method: "POST",
      body: JSON.stringify({ type: params.type }),
      cache: "no-store",
    }
  );

  const projects = (await liveProjectResponse.json()) as ResponseData;

  if (projects.rows)
    return (
      <div className="min-h-screen w-full">
        <div className="text-2xl text-center pt-24">
          Live {params.type} projects
        </div>
        <div>
          {projects.rows.length == 0 ? (
            <div className="text-center pt-24">
              No live {params.type} currently!
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-8 grid-flow-row pb-4 px-24 pt-24">
              {projects.rows.map((row) => (
                <div
                  key={row.id}
                  className="px-8 py-4 rounded-md shadow-xl bg-zinc-100 h-fit"
                >
                  <div className="flex flex-col justify-evenly">
                    <div className="text-2xl text-center py-4">{row.Title}</div>
                    <div className="flex justify-center py-4">
                      <Link
                        href={`/admin/control/edit/${row.Type}/${row.id}`}
                        className="w-fit rounded border text-white shadow-md border-emerald-500 bg-emerald-400 hover:bg-emerald-500 active:scale-90 transition-all duration-300 ease-in-out px-4 py-2"
                      >
                        Edit this {params.type} post
                      </Link>
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
