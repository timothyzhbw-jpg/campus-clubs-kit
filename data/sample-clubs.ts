import type { Club } from "../lib/types.ts";

/**
 * Made-up sample data for the demo. None of these clubs, people or places are real.
 * Replace this file with your own list.
 */
export const sampleClubs: Club[] = [
  {
    id: "night-sky-society",
    name: "Night Sky Society",
    summary: "Telescope nights, astrophotography and the occasional meteor-shower road trip.",
    about:
      "We borrow the department telescopes on clear evenings and teach anyone how to find planets, clusters and the odd comet. No equipment or experience needed.",
    interests: ["academic", "outdoors"],
    members: 64,
    meeting: { when: "Clear Thursdays, 8 pm", where: "Observatory roof" },
    contact: "nightsky@example.edu",
    accent: "#3949ab",
  },
  {
    id: "board-game-guild",
    name: "Board Game Guild",
    summary: "Hundreds of games, weekly open tables and a spring tournament.",
    about:
      "Bring a friend or come alone: we always have a table that needs one more player. Our library ranges from five-minute party games to six-hour campaigns.",
    interests: ["games"],
    members: 131,
    meeting: { when: "Fridays, 6 pm", where: "Student Center, Room 210" },
    contact: "guild@example.edu",
    accent: "#c62828",
  },
  {
    id: "riverside-rowing",
    name: "Riverside Rowing",
    summary: "Learn-to-row sessions for beginners and a racing squad for the keen.",
    about:
      "Early mornings on the water, erg sessions in winter and two regattas a semester. Beginners start in stable boats with an experienced cox.",
    interests: ["sports", "outdoors"],
    members: 48,
    meeting: { when: "Mon / Wed / Sat, 6 am", where: "Boathouse" },
    accent: "#00838f",
  },
  {
    id: "open-source-collective",
    name: "Open Source Collective",
    summary: "Ship small open-source tools together and make your first pull request.",
    about:
      "Each semester we pick a few small public projects and work on them in pairs. We cover git, code review and writing good issues.",
    interests: ["tech", "academic"],
    members: 92,
    meeting: { when: "Tuesdays, 7 pm", where: "Engineering Hall 104" },
    contact: "osc@example.edu",
    accent: "#2e7d32",
  },
  {
    id: "printmaking-studio",
    name: "Printmaking Studio",
    summary: "Linocut, screen printing and zines, with materials provided.",
    about:
      "Open studio hours plus a monthly workshop led by a member. Our zine fair at the end of each semester is open to everyone.",
    interests: ["arts"],
    members: 37,
    meeting: { when: "Sundays, 2 pm", where: "Arts Annex basement" },
    accent: "#ef6c00",
  },
  {
    id: "language-exchange",
    name: "Language Exchange Café",
    summary: "Swap conversation practice over coffee in more than a dozen languages.",
    about:
      "Tables are grouped by language each week. Speak half the time in the language you're learning, half in the one you know.",
    interests: ["culture"],
    members: 156,
    meeting: { when: "Wednesdays, 5 pm", where: "Library café" },
    contact: "exchange@example.edu",
    accent: "#6a1b9a",
  },
  {
    id: "community-garden",
    name: "Community Garden Crew",
    summary: "Grow vegetables on the campus plot and donate the harvest.",
    about:
      "We plant, weed and harvest together, then give produce to the local food bank. Gloves and tools on site.",
    interests: ["service", "outdoors"],
    members: 29,
    meeting: { when: "Saturdays, 10 am", where: "North lawn plot" },
    accent: "#558b2f",
  },
  {
    id: "debate-union",
    name: "Debate Union",
    summary: "Parliamentary debate practice and intercollegiate competitions.",
    about:
      "Weekly practice rounds with feedback, plus travel to four tournaments a year. Novices welcome; we run a training track every fall.",
    interests: ["academic"],
    members: 58,
    meeting: { when: "Thursdays, 6:30 pm", where: "Humanities 3rd floor" },
    accent: "#4e342e",
  },
];

export function findClub(id: string): Club | undefined {
  return sampleClubs.find((club) => club.id === id);
}
