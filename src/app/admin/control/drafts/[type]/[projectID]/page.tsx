export default function DraftSpecificPage({
  params,
}: {
  params: { type: string; projectID: string };
}) {
  return (
    <div className="px-12">
      <div>Draft Type: {params.type}</div>
      <div>Draft ID: {params.projectID}</div>
    </div>
  );
}
