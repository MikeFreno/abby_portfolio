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

export default async function DraftMainPage({
  params,
}: {
  params: { type: string };
}) {
  const responseRows = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/get-all-drafts`,
    {
      method: "POST",
      body: JSON.stringify({ type: params.type }),
      cache: "no-store",
    }
  );

  const resData = (await responseRows.json()) as ResponseData;

  if (responseRows.status === 200 && resData.rows) {
    return (
      <div className="px-12 min-h-screen w-full pb-40">
        <div className="py-16 text-center text-2xl">
          Browsing {params.type} drafts
        </div>
        <div className="">
          {resData.rows.length == 0 ? (
            <div className="text-center">
              No {params.type} drafts currently!
            </div>
          ) : (
            resData.rows.map((row) => <div key={row.id}></div>)
          )}
        </div>
      </div>
    );
  } else if (responseRows.status === 400) {
    return (
      <div className="px-12 min-h-screen w-full flex justify-center align-middle">
        <div className="py-8 text-center text-2xl">Incorrect Param type</div>
      </div>
    );
  } else {
    <div className="px-12 min-h-screen w-full flex justify-center align-middle">
      <div className="py-8 text-center text-2xl">
        A server error occurred fetching the data
      </div>
    </div>;
  }
}
