import Link from "next/link";
import { monogram } from "../lib/query.ts";
import type { Club } from "../lib/types.ts";

export interface ClubCardProps {
  club: Club;
  /** Where the card links to. Defaults to /clubs/<id>. */
  href?: string;
}

export function ClubCard({ club, href = `/clubs/${club.id}` }: ClubCardProps) {
  return (
    <li className="card">
      <Link href={href} className="card-link">
        <span className="monogram" style={{ background: club.accent }} aria-hidden="true">
          {monogram(club.name)}
        </span>
        <span className="card-body">
          <span className="card-title">{club.name}</span>
          <span className="card-summary">{club.summary}</span>
          <span className="card-meta">
            {club.members} members
            {club.meeting ? ` · ${club.meeting.when}` : null}
          </span>
        </span>
      </Link>
      <ul className="tags" aria-label="Interests">
        {club.interests.map((interest) => (
          <li key={interest} className="tag">
            {interest}
          </li>
        ))}
      </ul>
    </li>
  );
}
