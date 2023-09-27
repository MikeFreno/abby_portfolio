import { Commercial } from "~/types/db";
import { ConnectionFactory } from "../api/database/ConnectionFactory";

export default async function CommercialPage() {
  const conn = ConnectionFactory();
  const query = "SELECT * FROM Commercial WHERE Published = ?";
  const params = [true];
  const res = await conn.execute(query, params);

  const commercialData = res.rows as Commercial[];

  if (commercialData && commercialData.length > 0) {
    return commercialData.map((commercial) => (
      <CommercialProjectChunk
        key={commercial.id}
        id={commercial.id}
        title={commercial.title}
        blurb={commercial.blurb}
        link={commercial.link}
        attachments={commercial.attachments}
        published={commercial.published}
      />
    ));
  } else {
    return (
      <div className="h-screen w-screen flex flex-col justify-center">
        <div className="-mt-16 text-center">No Commercial Projects yet!</div>
      </div>
    );
  }
}

function CommercialProjectChunk(commercial: Commercial) {
  return (
    <div className="">
      <div className="pt-36 text-center text-4xl tracking-wide">
        {commercial.title}
      </div>
      <div
        className="text-center py-12"
        dangerouslySetInnerHTML={{
          __html: commercial.blurb as string,
        }}
      />
      {commercial.link ? (
        <div className="flex justify-center mx-auto">
          <iframe
            width="800"
            height="450"
            src={commercial.link}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          />
        </div>
      ) : null}
    </div>
  );
}
