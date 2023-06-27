export default function DraftSpecificPage({
  params,
}: {
  params: { type: string; projectID: string };
}) {
  return (
    <>
      <div>Draft Type: {params.type}</div>
      <div>Draft ID: {params.projectID}</div>
    </>
  );
}
