import Link from "next/link";
import { Suspense } from "react";
import { ResponseData, Row } from "~/types/db";
import Loading from "./loading";

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

  return draftResData.rows && publishedResData.rows ? (
    <div className="px-12 min-h-screen w-full pb-40 fade-in">
      <div className="py-16 text-center text-2xl">All project drafts</div>
      <div className="">
        {draftResData.rows.length == 0 ? (
          <div className="text-center">No drafts currently!</div>
        ) : (
          <>
            <ProjectSection
              data={draftResData.rows}
              filterType="film"
              published={false}
            />
            <ProjectSection
              data={draftResData.rows}
              filterType="photography"
              published={false}
            />
            <ProjectSection
              data={draftResData.rows}
              filterType="commercial"
              published={false}
            />
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
            <ProjectSection
              data={publishedResData.rows}
              filterType="film"
              published={true}
            />
            <ProjectSection
              data={publishedResData.rows}
              filterType="photography"
              published={true}
            />
            <ProjectSection
              data={publishedResData.rows}
              filterType="commercial"
              published={true}
            />
          </>
        )}
      </div>
    </div>
  ) : (
    <></>
  );
}

function ProjectSection(props: {
  data: Row[];
  filterType: string;
  published: boolean;
}) {
  return props.data.filter((row) => row.Type == props.filterType).length > 0 ? (
    <>
      <div className="text-center py-2 text-xl underline underline-offset-4 tracking-wide">
        {props.published
          ? `Live ${props.filterType} projects`
          : `${props.filterType} drafts`}
      </div>
      <div className="grid grid-cols-2 gap-8 pb-4 last:flex last:justify-center">
        {props.data
          .filter((row) => row.Type == props.filterType)
          .map((row) => (
            <div
              key={row.id}
              className="px-8 py-4 my-4 rounded-md shadow-xl bg-emerald-50 h-fit"
            >
              <div className="flex flex-col justify-evenly">
                <div className="text-2xl text-center py-4">{row.Title}</div>
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
    </>
  ) : null;
}
