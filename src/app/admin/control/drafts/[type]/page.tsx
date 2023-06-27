export default function DraftMainPage({
  params,
}: {
  params: { type: string };
}) {
  return <div>Draft Type: {params.type}</div>;
}
