/** Broad interest areas a club can belong to. Projects can supply their own list. */
export const INTERESTS = [
  "academic",
  "arts",
  "culture",
  "games",
  "outdoors",
  "service",
  "sports",
  "tech",
] as const;

export type Interest = (typeof INTERESTS)[number];

export interface Meeting {
  /** Free text, e.g. "Tuesdays 7 pm". */
  when: string;
  where: string;
}

export interface Club {
  /** URL-safe identifier, unique within a list. */
  id: string;
  name: string;
  /** One sentence shown on cards. */
  summary: string;
  /** Longer description shown on the profile page. */
  about: string;
  interests: Interest[];
  members: number;
  meeting?: Meeting;
  contact?: string;
  /** Hex colour used for the card monogram. */
  accent: string;
}

export type SortKey = "name" | "members";

export interface ClubQuery {
  text?: string;
  interest?: Interest | "all";
  sort?: SortKey;
}
