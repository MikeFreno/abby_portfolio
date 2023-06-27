export default function CreatePage({ params }: { params: { type: string } }) {
  return <div>Create Type: {params.type}</div>;
}
