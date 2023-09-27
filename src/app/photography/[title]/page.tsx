/* eslint-disable @next/next/no-img-element */
import { ResponseData } from "~/types/db";
import Image from "next/image";
import { env } from "~/env.mjs";

export default async function DynamicPhotographyPage({
  params,
}: {
  params: { title: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/get-live-project-by-type-and-title`,
    {
      method: "POST",
      body: JSON.stringify({
        type: "photography",
        title: params.title.replace("%20", " "),
      }),
    },
  );

  const photographyData = (await res.json()) as ResponseData;

  const photographyFlow = photographyData.rows[0]?.PhotographyFlow;

  if (photographyData.rows) {
    if (photographyData.rows[0]) {
      return (
        <div className="">
          <div className="py-24 text-center text-2xl">
            {photographyData.rows[0].Title}
          </div>
        </div>
      );
    } else {
      return (
        <div className="h-screen w-screen flex flex-col justify-center">
          <div className="-mt-16 text-center">Album not found</div>
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
