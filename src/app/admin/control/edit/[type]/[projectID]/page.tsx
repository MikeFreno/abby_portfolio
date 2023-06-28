export default function EditSpecificPage({
  params,
}: {
  params: { type: string; projectID: string };
}) {
  return (
    <div className="px-12">
      <div>Edit type: {params.type}</div>
      <div>Edit ID: {params.projectID}</div>
    </div>
  );
}
