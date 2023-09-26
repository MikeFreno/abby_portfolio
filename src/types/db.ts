export interface Row {
  id: number;
  Title: string;
  Blurb: string | null;
  Embedded_Link: string | null;
  Attachments: string | null;
  Published: 0 | 1;
  Type: "film" | "commercial" | "photography";
  PhotographyFlow: string | null;
}

export interface ResponseData {
  error: string | null;
  rows: Row[] | null;
}

export interface FlowEntry {
  cols: string[];
  spacer: number;
}
