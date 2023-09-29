// Photography Interface
export interface Photography {
  id: number;
  title: string;
  blurb: string | null;
  images: string | null;
  cover_image: string | null;
  published: boolean;
  photography_flow: any; // parses to ParsedPhotographyFlow
  captions: any; // parses to ParsedCaptions
}

// Film Interface
export interface Film {
  id: number;
  title: string;
  blurb: string | null;
  link: string | null;
  attachments: string | null;
  published: boolean;
}

// Commercial Interface
export interface Commercial {
  id: number;
  title: string;
  blurb: string | null;
  link: string | null;
  attachments: string | null;
  published: boolean;
}

// Sketch Interface
export interface Sketch {
  id: number;
  title: string;
  blurb: string | null;
  link: string | null;
  attachments: string | null;
  published: boolean;
}

// Acting Interface
export interface Acting {
  id: number;
  title: string;
  blurb: string | null;
  link: string | null;
  attachments: string | null;
  published: boolean;
}

export type ParsedPhotographyFlow = { [key: number]: string[] };
export type ParsedCaptions = { [key: number]: string };
