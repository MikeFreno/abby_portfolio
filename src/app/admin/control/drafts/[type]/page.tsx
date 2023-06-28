export default function DraftMainPage({
  params,
}: {
  params: { type: string };
}) {
  return <div className="px-12">Draft Type: {params.type}</div>;
}
