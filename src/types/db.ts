// Photography Interface
export interface Photography {
  id: number;
  title: string;
  blurb: string | null;
  images: string | null;
  published: boolean | null;
  photography_flow: JsonString; // parses to ParsedPhotographyFlow
  captions: JsonString; // parses to ParsedCaptions
}

// Film Interface
export interface Film {
  id: number;
  title: string;
  blurb: string;
  link: string | null;
  attachments: string | null;
  published: boolean | null;
}

// Commercial Interface
export interface Commercial {
  id: number;
  title: string;
  blurb: string;
  link: string | null;
  attachments: string | null;
  published: boolean | null;
}

// Sketch Interface
export interface Sketch {
  id: number;
  title: string;
  blurb: string;
  link: string | null;
  attachments: string | null;
  published: boolean | null;
}

// Acting Interface
export interface Acting {
  id: number;
  title: string;
  blurb: string;
  link: string | null;
  attachments: string | null;
  published: boolean | null;
}

export type JsonString = string;

export type ParsedPhotographyFlow = { [key: number]: string[] };
export type ParsedCaptions = { [key: number]: string };
