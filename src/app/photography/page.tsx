/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ResponseData } from "~/types/db";

export default async function PhotographyPage() {
  const photographyResponse = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/get-all-live-photography`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const photographyData = (await photographyResponse.json()) as ResponseData;

  if (photographyData.rows && photographyData.rows.length > 0) {
    return (
      <div className="min-h-screen">
        <div className="grid grid-cols-2 gap-2 grid-flow-col">
          {photographyData.rows.map((row) => (
            <div key={row.id}>
              <img
                src={
                  row.Attachments?.split(",")[0]
                    ? row.Attachments?.split(",")[0]
                    : "placeholder"
                }
              />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return <></>;
  }
}
