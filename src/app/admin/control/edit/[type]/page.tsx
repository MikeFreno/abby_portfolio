export default function EditMainPage({ params }: { params: { type: string } }) {
  return <div className="px-12">Edit type: {params.type}</div>;
}
