import { Photography } from "~/types/db";
import FlowClient from "./FlowClient";

export default async function EditFlowControl({
  params,
}: {
  params: { post_id: number };
}) {
  const postData = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/photography/get_by_id/${params.post_id}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  const album = (await postData.json()).row as Photography;

  return (
    <>
      <FlowClient post={album} />
    </>
  );
}
