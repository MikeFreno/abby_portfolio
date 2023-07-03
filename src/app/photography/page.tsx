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
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!photographyResponse.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch photography album data");
  }

  return photographyResponse.json();
}

export default async function PhotographyPage() {
  const photographyData = (await getPhotographyData()) as ResponseData;

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
