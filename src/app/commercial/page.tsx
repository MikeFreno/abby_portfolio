/* eslint-disable @next/next/no-img-element */
import { ResponseData, Row } from "~/types/db";
import Image from "next/image";
import { env } from "~/env.mjs";

export default async function CommercialPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/get-all-published`,
    {
      method: "POST",
      body: JSON.stringify({
        type: "commercial",
      }),
    }
  );

  const photographyData = (await res.json()) as ResponseData;

  if (photographyData.rows) {
    if (photographyData.rows[0]) {
      return photographyData.rows.map((commercial) => (
        <CommercialProjectChunk
          key={commercial.id}
          id={commercial.id}
          Title={commercial.Title}
          Blurb={commercial.Blurb}
          Embedded_Link={commercial.Embedded_Link}
          Attachments={commercial.Attachments}
          Published={commercial.Published}
          Type={commercial.Type}
        />
      ));
    } else {
      return (
        <div className="h-screen w-screen flex flex-col justify-center">
          <div className="-mt-16 text-center">No Commercial Projects yet!</div>
        </div>
      );
    }
  } else {
    return (
      <div className="h-screen w-screen flex flex-col justify-center">
        <div className="-mt-16 text-center">
          Data fetching from server failed!
        </div>
      </div>
    );
  }
}

function CommercialProjectChunk(commercial: Row) {
  return (
    <div className="">
      <div className="pt-36 text-center text-4xl tracking-wide">
        {commercial.Title}
      </div>
      <div
        className="text-center py-12"
        dangerouslySetInnerHTML={{
          __html: commercial.Blurb as string,
        }}
      />
      {commercial.Embedded_Link ? (
        <div className="flex justify-center mx-auto">
          <iframe
            width="800"
            height="450"
            src={commercial.Embedded_Link}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
          />
        </div>
      ) : null}
    </div>
  );
}
