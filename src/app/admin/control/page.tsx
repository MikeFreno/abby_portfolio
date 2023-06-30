import Link from "next/link";

interface Row {
  id: number;
  Title: string;
  Blurb: string | null;
  Embedded_Link: string | null;
  Attachments: string | null;
  Published: 0 | 1;
  Type: "film" | "commercial" | "photography";
}

interface ResponseData {
  error: string | null;
  rows: Row[] | null;
}

export default async function AdminMainPage() {
  const responseRows = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/get-all-drafts`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const resData = (await responseRows.json()) as ResponseData;

  if (resData.rows) {
    return (
      <div className="px-12 min-h-screen w-full pb-40">
        <div className="py-16 text-center text-2xl">Browsing all drafts</div>
        <div className="">
          {resData.rows.length == 0 ? (
            <div className="text-center">No drafts currently!</div>
          ) : (
            <>
              {resData.rows.filter((row) => row.Type == "film").length > 0 ? (
                <>
                  <div className="text-center py-2 text-xl underline underline-offset-4 tracking-wide">
                    Film drafts
                  </div>
                  <div className="grid grid-cols-2 gap-8 grid-flow-row pb-4">
                    {resData.rows
                      .filter((row) => row.Type == "film")
                      .map((row) => (
                        <div
                          key={row.id}
                          className="px-8 py-4 rounded-md shadow-xl bg-zinc-100 h-fit"
                        >
                          <div className="flex flex-col justify-evenly">
                            <div className="text-2xl text-center py-4">
                              Title: {row.Title}
                            </div>
                            <div className="flex justify-center py-4">
                              <a
                                href={`/admin/control/edit/${row.id}`}
                                className="w-fit rounded border text-white shadow-md border-emerald-500 bg-emerald-400 hover:bg-emerald-500 active:scale-90 transition-all duration-300 ease-in-out px-4 py-2"
                              >
                                Edit this film post
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  <hr />
                </>
              ) : null}
              {resData.rows.filter((row) => row.Type == "photography").length >
              0 ? (
                <>
                  <div className="text-center">Photography drafts</div>
                  {resData.rows
                    .filter((row) => row.Type == "photography")
                    .map((row) => (
                      <div key={row.id}></div>
                    ))}
                  <hr />
                </>
              ) : null}
              {resData.rows.filter((row) => row.Type == "commercial").length >
              0 ? (
                <>
                  <div className="text-center">Commercial drafts</div>
                  {resData.rows
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
      </div>
    );
  }
}
