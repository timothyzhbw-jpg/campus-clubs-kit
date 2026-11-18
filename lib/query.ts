import type { Club, ClubQuery } from "./types.ts";

/** Lower-cases, strips accents and collapses whitespace so "  Café  Club" matches "cafe club". */
export function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

/** Every word of the query must appear somewhere in the club's name, summary or interests. */
export function matchesText(club: Club, text: string): boolean {
  const words = normalize(text).split(" ").filter(Boolean);
  if (words.length === 0) return true;
  const haystack = normalize([club.name, club.summary, ...club.interests].join(" "));
  return words.every((word) => haystack.includes(word));
}

export function queryClubs(clubs: readonly Club[], query: ClubQuery = {}): Club[] {
  const { text = "", interest = "all", sort = "name" } = query;
  const result = clubs.filter(
    (club) =>
      (interest === "all" || club.interests.includes(interest)) && matchesText(club, text),
  );
  return result.sort((a, b) =>
    sort === "members"
      ? b.members - a.members || a.name.localeCompare(b.name)
      : a.name.localeCompare(b.name),
  );
}

/** How many clubs fall under each interest, for filter chips. */
export function countByInterest(clubs: readonly Club[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const club of clubs) {
    for (const interest of club.interests) {
      counts.set(interest, (counts.get(interest) ?? 0) + 1);
    }
  }
  return counts;
}

/** Two-letter monogram from a club name: "Night Sky Society" -> "NS". */
export function monogram(name: string): string {
  const letters = name
    .split(/\s+/)
    .filter((word) => /^[\p{L}\p{N}]/u.test(word))
    .map((word) => word[0]!.toUpperCase());
  return letters.slice(0, 2).join("") || "?";
}
