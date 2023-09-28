export default function MinusIcon(props: {
  height: number;
  width: number;
  strokeWidth: number;
  stroke: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={props.strokeWidth}
      width={props.width}
      height={props.height}
      stroke={props.stroke}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
  );
}
