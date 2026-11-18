import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1>Club not found</h1>
      <p className="lede">
        That club isn&apos;t in the list. <Link href="/">Back to all clubs</Link>
      </p>
    </>
  );
}
