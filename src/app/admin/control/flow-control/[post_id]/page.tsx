import FlowClient from "./FlowClient";

export default async function EditFlowControl({
  params,
}: {
  params: { post_id: string };
}) {
  const postData = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/database/get-photography-by-id/${params.post_id}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  let postDataParsed;
  try {
    postDataParsed = await postData.json();
    //console.log(postDataParsed.rows[0]);
  } catch (e) {
    console.error("Got Parse error: " + e);
  }

  return (
    <>
      <FlowClient post={postDataParsed.rows[0]} />
    </>
  );
}
