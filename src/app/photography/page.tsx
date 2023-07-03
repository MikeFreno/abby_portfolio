/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ResponseData, Row } from "~/types/db";

async function getPhotographyData() {
  const photographyResponse = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/get-live-projects-by-type`,
    {
      method: "POST",
      body: JSON.stringify({ type: "photography" }),
    }
  );

  const projects = (await photographyResponse.json()) as ResponseData;

  return projects;
}

export default async function PhotographyPage() {
  const photographyData = await getPhotographyData();

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
                    : "/placeholder.jpg"
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
