import Link from "next/link";
import { env } from "~/env.mjs";
import { Acting, Commercial, Film, Photography, Sketch } from "~/types/db";
import { toTitleCase } from "~/utility/functions";

export default async function EditOverviewPage({
  params,
}: {
  params: { type: string };
}) {
  const livePostsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/${params.type}/get_all_live`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  const posts = await livePostsResponse.json();

  if (posts.rows)
    return (
      <div className="min-h-screen w-full">
        <div className="text-2xl text-center pt-24">
          {toTitleCase(params.type)} projects
        </div>
        <div>
          {posts.rows.length == 0 ? (
            <div className="text-center pt-24">
              No {params.type} posts currently!
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-8 grid-flow-row pb-4 px-24 pt-24 last:flex last:justify-center">
              {posts.rows.map(
                (row: Acting | Commercial | Film | Sketch | Photography) => (
                  <div
                    key={row.id}
                    className="px-8 py-4 rounded-md shadow-xl bg-zinc-100 h-fit"
                  >
                    <div className="flex flex-col justify-evenly">
                      <div className="text-2xl text-center py-4">
                        {row.title.replaceAll("_", " ")}
                      </div>
                      <div className="flex justify-center py-4">
                        <div className="flex flex-col">
                          {params.type == "photography" ? (
                            <img
                              className="mx-auto py-2"
                              width="120px"
                              src={
                                (row as Photography).cover_image
                                  ? env.NEXT_PUBLIC_AWS_BUCKET_STRING +
                                    (
                                      row as Photography
                                    ).cover_image?.replaceAll('"', "")
                                  : env.NEXT_PUBLIC_AWS_BUCKET_STRING +
                                    (row as Photography).images?.split("\\,")[0]
                              }
                              alt={"post image"}
                            />
                          ) : null}
                          <Link
                            href={`/admin/control/edit/${params.type}/${row.id}`}
                            className="w-fit rounded border text-white shadow-md border-emerald-500 bg-emerald-400 hover:bg-emerald-500 active:scale-90 transition-all duration-300 ease-in-out px-4 py-2"
                          >
                            Edit this {toTitleCase(params.type)} post
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </div>
      </div>
    );
}
