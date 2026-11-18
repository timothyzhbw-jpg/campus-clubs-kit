import { ClubBrowser } from "../components/ClubBrowser.tsx";
import { sampleClubs } from "../data/sample-clubs.ts";

export default function HomePage() {
  return (
    <>
      <h1>Find a club</h1>
      <p className="lede">Search by name or topic, or narrow the list by interest.</p>
      <ClubBrowser clubs={sampleClubs} />
    </>
  );
}
