export default function EditSpecificPage({
  params,
}: {
  params: { type: string; projectID: string };
}) {
  return (
    <>
      <div>Edit type: {params.type}</div>
      <div>Edit ID: {params.projectID}</div>
    </>
  );
}
