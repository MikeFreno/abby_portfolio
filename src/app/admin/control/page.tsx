import Link from "next/link";
import { ResponseData } from "~/types/db";

export default async function AdminMainPage() {
  const draftResponseRows = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/get-all-drafts`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  const publishedResponseRows = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/get-all-published`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const draftResData = (await draftResponseRows.json()) as ResponseData;
  const publishedResData = (await publishedResponseRows.json()) as ResponseData;

  if (draftResData.rows && publishedResData.rows) {
    return (
      <div className="px-12 min-h-screen w-full pb-40">
        <div className="py-16 text-center text-2xl">All project drafts</div>
        <div className="">
          {draftResData.rows.length == 0 ? (
            <div className="text-center">No drafts currently!</div>
          ) : (
            <>
              {draftResData.rows.filter((row) => row.Type == "film").length >
              0 ? (
                <>
                  <div className="text-center py-2 text-xl underline underline-offset-4 tracking-wide">
                    Film drafts
                  </div>
                  <div className="grid grid-cols-2 gap-8 grid-flow-row pb-4">
                    {draftResData.rows
                      .filter((row) => row.Type == "film")
                      .map((row) => (
                        <div
                          key={row.id}
                          className="px-8 py-4 rounded-md shadow-xl bg-zinc-100 h-fit"
                        >
                          <div className="flex flex-col justify-evenly">
                            <div className="text-2xl text-center py-4">
                              {row.Title}
                            </div>
                            <div className="flex justify-center py-4">
                              <Link
                                href={`/admin/control/edit/${row.Type}/${row.id}`}
                                className="w-fit rounded border text-white shadow-md border-emerald-500 bg-emerald-400 hover:bg-emerald-500 active:scale-90 transition-all duration-300 ease-in-out px-4 py-2"
                              >
                                Edit this film post
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <hr />
                </>
              ) : null}
              {draftResData.rows.filter((row) => row.Type == "photography")
                .length > 0 ? (
                <>
                  <div className="text-center">Photography drafts</div>
                  {draftResData.rows
                    .filter((row) => row.Type == "photography")
                    .map((row) => (
                      <div key={row.id}></div>
                    ))}
                  <hr />
                </>
              ) : null}
              {draftResData.rows.filter((row) => row.Type == "commercial")
                .length > 0 ? (
                <>
                  <div className="text-center">Commercial drafts</div>
                  {draftResData.rows
                    .filter((row) => row.Type == "commercial")
                    .map((row) => (
                      <div key={row.id}></div>
                    ))}
                  <hr />
                </>
              ) : null}
            </>
          )}
        </div>
        <hr className="my-16" />
        <div className="pb-16 text-center text-2xl">All live projects</div>
        <div className="">
          {publishedResData.rows.length == 0 ? (
            <div className="text-center">No live projects currently!</div>
          ) : (
            <>
              {publishedResData.rows.filter((row) => row.Type == "film")
                .length > 0 ? (
                <>
                  <div className="text-center py-2 text-xl underline underline-offset-4 tracking-wide">
                    Film projects
                  </div>
                  <div className="grid grid-cols-2 gap-8 grid-flow-row pb-4">
                    {publishedResData.rows
                      .filter((row) => row.Type == "film")
                      .map((row) => (
                        <div
                          key={row.id}
                          className="px-8 py-4 rounded-md shadow-xl bg-zinc-100 h-fit"
                        >
                          <div className="flex flex-col justify-evenly">
                            <div className="text-2xl text-center py-4">
                              {row.Title}
                            </div>
                            <div className="flex justify-center py-4">
                              <Link
                                href={`/admin/control/edit/${row.Type}/${row.id}`}
                                className="w-fit rounded border text-white shadow-md border-emerald-500 bg-emerald-400 hover:bg-emerald-500 active:scale-90 transition-all duration-300 ease-in-out px-4 py-2"
                              >
                                Edit this {row.Type} post
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <hr />
                </>
              ) : null}
              {publishedResData.rows.filter((row) => row.Type == "photography")
                .length > 0 ? (
                <>
                  <div className="text-center">Photography projects</div>
                  {publishedResData.rows
                    .filter((row) => row.Type == "photography")
                    .map((row) => (
                      <div
                        key={row.id}
                        className="px-8 py-4 rounded-md shadow-xl bg-zinc-100 h-fit"
                      >
                        <div className="flex flex-col justify-evenly">
                          <div className="text-2xl text-center py-4">
                            {row.Title}
                          </div>
                          <div className="flex justify-center py-4">
                            <Link
                              href={`/admin/control/edit/${row.Type}/${row.id}`}
                              className="w-fit rounded border text-white shadow-md border-emerald-500 bg-emerald-400 hover:bg-emerald-500 active:scale-90 transition-all duration-300 ease-in-out px-4 py-2"
                            >
                              Edit this {row.Type} post
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  <hr />
                </>
              ) : null}
              {publishedResData.rows.filter((row) => row.Type == "commercial")
                .length > 0 ? (
                <>
                  <div className="text-center">Commercial projects</div>
                  {publishedResData.rows
                    .filter((row) => row.Type == "commercial")
                    .map((row) => (
                      <div
                        key={row.id}
                        className="px-8 py-4 rounded-md shadow-xl bg-zinc-100 h-fit"
                      >
                        <div className="flex flex-col justify-evenly">
                          <div className="text-2xl text-center py-4">
                            {row.Title}
                          </div>
                          <div className="flex justify-center py-4">
                            <Link
                              href={`/admin/control/edit/${row.Type}/${row.id}`}
                              className="w-fit rounded border text-white shadow-md border-emerald-500 bg-emerald-400 hover:bg-emerald-500 active:scale-90 transition-all duration-300 ease-in-out px-4 py-2"
                            >
                              Edit this {row.Type} post
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  <hr />
                </>
              ) : null}
            </>
          )}
        </div>
      </div>
    );
  }
}
