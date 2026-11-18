# Campus Clubs Kit

A small, generic React / Next.js kit for browsing campus clubs: text search, interest filter chips, sorting, club cards and a club profile page.

It works with any list of clubs. The demo ships with made-up sample clubs; none of them are real.

## Run it

Node.js 20.9 or newer.

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # unit tests for search and filtering
npm run build
```

No database, accounts or environment variables are needed.

## What's inside

| Path | What it is |
| --- | --- |
| `lib/types.ts` | `Club` type and the default interest list |
| `lib/query.ts` | Search, filter, sort and count helpers (framework-free) |
| `components/ClubBrowser.tsx` | Search box, sort menu, interest chips and results grid |
| `components/ClubCard.tsx` | One club in the grid |
| `app/clubs/[id]/page.tsx` | Club profile page |
| `data/sample-clubs.ts` | Made-up demo data — replace with your own |

## Using your own data

Give `ClubBrowser` any array that matches the `Club` type:

```tsx
import { ClubBrowser } from "./components/ClubBrowser.tsx";

<ClubBrowser clubs={myClubs} />;
```

Search matches every word of the query against the club's name, summary and interests, ignoring case and accents. `queryClubs()` in `lib/query.ts` can be used on its own, for example on a server.

## License

[MIT](LICENSE) © 2026 Bowen Zhang
