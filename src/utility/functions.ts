export function toTitleCase(title: string) {
  const first = title[0].toUpperCase();
  const rest = title.slice(1);
  return first + rest;
}
