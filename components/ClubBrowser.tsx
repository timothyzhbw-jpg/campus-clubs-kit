"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { countByInterest, queryClubs } from "../lib/query.ts";
import { INTERESTS, type Club, type Interest, type SortKey } from "../lib/types.ts";
import { ClubCard } from "./ClubCard.tsx";

export interface ClubBrowserProps {
  clubs: readonly Club[];
  /** Interest list for the filter chips. Defaults to the built-in list. */
  interests?: readonly Interest[];
}

export function ClubBrowser({ clubs, interests = INTERESTS }: ClubBrowserProps) {
  const [text, setText] = useState("");
  const [interest, setInterest] = useState<Interest | "all">("all");
  const [sort, setSort] = useState<SortKey>("name");
  const deferredText = useDeferredValue(text);

  const counts = useMemo(() => countByInterest(clubs), [clubs]);
  const results = useMemo(
    () => queryClubs(clubs, { text: deferredText, interest, sort }),
    [clubs, deferredText, interest, sort],
  );

  return (
    <section className="browser">
      <div className="controls">
        <label className="search">
          <span className="visually-hidden">Search clubs</span>
          <input
            type="search"
            placeholder="Search by name, topic or interest"
            value={text}
            onChange={(event) => setText(event.target.value)}
          />
        </label>
        <label className="sort">
          Sort
          <select value={sort} onChange={(event) => setSort(event.target.value as SortKey)}>
            <option value="name">A–Z</option>
            <option value="members">Most members</option>
          </select>
        </label>
      </div>

      <div className="chips" role="group" aria-label="Filter by interest">
        <Chip label="all" count={clubs.length} active={interest === "all"} onClick={() => setInterest("all")} />
        {interests
          .filter((name) => counts.has(name))
          .map((name) => (
            <Chip
              key={name}
              label={name}
              count={counts.get(name) ?? 0}
              active={interest === name}
              onClick={() => setInterest(name)}
            />
          ))}
      </div>

      <p className="result-count" aria-live="polite">
        {results.length} {results.length === 1 ? "club" : "clubs"}
      </p>

      {results.length > 0 ? (
        <ul className="grid">
          {results.map((club) => (
            <ClubCard key={club.id} club={club} />
          ))}
        </ul>
      ) : (
        <p className="empty">No clubs match. Try a shorter search or another interest.</p>
      )}
    </section>
  );
}

function Chip(props: { label: string; count: number; active: boolean; onClick: () => void }) {
  return (
    <button type="button" className="chip" aria-pressed={props.active} onClick={props.onClick}>
      {props.label} <span className="chip-count">{props.count}</span>
    </button>
  );
}
