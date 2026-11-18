import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { findClub, sampleClubs } from "../../../data/sample-clubs.ts";
import { monogram } from "../../../lib/query.ts";

type Params = Promise<{ id: string }>;

export function generateStaticParams() {
  return sampleClubs.map((club) => ({ id: club.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const club = findClub((await params).id);
  return { title: club ? `${club.name} · Campus Clubs Kit` : "Club not found" };
}

export default async function ClubPage({ params }: { params: Params }) {
  const club = findClub((await params).id);
  if (!club) notFound();

  return (
    <article className="profile">
      <Link href="/" className="back">
        ← All clubs
      </Link>
      <header className="profile-header">
        <span className="monogram large" style={{ background: club.accent }} aria-hidden="true">
          {monogram(club.name)}
        </span>
        <div>
          <h1>{club.name}</h1>
          <p className="lede">{club.summary}</p>
        </div>
      </header>

      <dl className="facts">
        <div>
          <dt>Members</dt>
          <dd>{club.members}</dd>
        </div>
        {club.meeting ? (
          <div>
            <dt>Meets</dt>
            <dd>
              {club.meeting.when}
              <br />
              {club.meeting.where}
            </dd>
          </div>
        ) : null}
        {club.contact ? (
          <div>
            <dt>Contact</dt>
            <dd>
              <a href={`mailto:${club.contact}`}>{club.contact}</a>
            </dd>
          </div>
        ) : null}
      </dl>

      <section>
        <h2>About</h2>
        <p>{club.about}</p>
      </section>

      <ul className="tags" aria-label="Interests">
        {club.interests.map((interest) => (
          <li key={interest} className="tag">
            {interest}
          </li>
        ))}
      </ul>
    </article>
  );
}
