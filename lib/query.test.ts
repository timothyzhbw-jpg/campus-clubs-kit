import { test } from "node:test";
import assert from "node:assert/strict";
import { countByInterest, matchesText, monogram, normalize, queryClubs } from "./query.ts";
import type { Club } from "./types.ts";

const make = (id: string, name: string, members: number, extra: Partial<Club> = {}): Club => ({
  id,
  name,
  summary: "",
  about: "",
  interests: [],
  members,
  accent: "#000000",
  ...extra,
});

const clubs: Club[] = [
  make("chess", "Chess Circle", 40, { interests: ["games"], summary: "Casual and rated play" }),
  make("hike", "Trail Walkers", 85, { interests: ["outdoors", "sports"] }),
  make("cafe", "Café Linguistique", 12, { interests: ["culture"], summary: "French conversation" }),
  make("robots", "Robotics Lab", 85, { interests: ["tech", "academic"] }),
];

test("normalize strips accents, case and extra spaces", () => {
  assert.equal(normalize("  Café   CLUB "), "cafe club");
});

test("text search matches every word in any field", () => {
  assert.ok(matchesText(clubs[2]!, "cafe french"));
  assert.ok(matchesText(clubs[0]!, "RATED chess"));
  assert.ok(!matchesText(clubs[0]!, "chess outdoors"));
  assert.ok(matchesText(clubs[1]!, "   "));
});

test("interest filter and name sort", () => {
  assert.deepEqual(
    queryClubs(clubs, { interest: "sports" }).map((c) => c.id),
    ["hike"],
  );
  assert.deepEqual(
    queryClubs(clubs).map((c) => c.id),
    ["cafe", "chess", "robots", "hike"],
  );
});

test("member sort breaks ties by name", () => {
  assert.deepEqual(
    queryClubs(clubs, { sort: "members" }).map((c) => c.id),
    ["robots", "hike", "chess", "cafe"],
  );
});

test("query does not mutate the input list", () => {
  const before = clubs.map((c) => c.id);
  queryClubs(clubs, { sort: "members" });
  assert.deepEqual(clubs.map((c) => c.id), before);
});

test("countByInterest", () => {
  const counts = countByInterest(clubs);
  assert.equal(counts.get("tech"), 1);
  assert.equal(counts.get("sports"), 1);
  assert.equal(counts.get("arts"), undefined);
});

test("monogram", () => {
  assert.equal(monogram("Night Sky Society"), "NS");
  assert.equal(monogram("chess"), "C");
  assert.equal(monogram("& co"), "C");
  assert.equal(monogram(""), "?");
});
