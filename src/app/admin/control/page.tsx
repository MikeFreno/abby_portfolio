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
                  <div className="text-center">Film drafts</div>
                  {resData.rows
                    .filter((row) => row.Type == "film")
                    .map((row) => (
                      <div key={row.id}></div>
                    ))}
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
