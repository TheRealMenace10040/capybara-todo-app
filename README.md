# Capybara Todo

A shared to-do list for Dennis & Ramila, capybara-themed. Tasks can be assigned to either person or both, tagged with a category, given a due date and priority flag, and completed with a confetti + mascot celebration.

Recreated from a high-fidelity design handoff (`C:\Claude Projects\capy todo`) into a real, working app.

## Tech stack

- React 19 + TypeScript + Vite
- Firebase Firestore (real-time shared state — both partners see the same list live, no login required)
- Firebase Hosting (deploy target)
- Plain CSS using the design handoff's OKLCH design tokens (no UI framework)

## Setup

```bash
npm install
npm run dev
```

Requires a `.env` file (see `.env.example`) with the Firebase web app config. This project is already wired to the `to-do-list-d6b2c` Firebase project — copy `.env.example` to `.env` and fill in the values from the Firebase console if setting up on a new machine.

## Data model

Tasks live in the Firestore `tasks` collection:

```ts
{ id, title, category: 'chores'|'errands'|'dates'|'other', assignee: 'dennis'|'ramila'|'both', due: 'Today'|'Tomorrow'|'This week', priority: boolean, done: boolean, createdAt: number }
```

**Security note:** Firestore rules (`firestore.rules`) currently allow open read/write on `tasks` with no authentication — appropriate for a private two-person app not linked publicly, but not suitable if the URL is ever shared widely.

## Deployment

```bash
npm run build
firebase deploy --only hosting
firebase deploy --only firestore:rules   # only needed if rules change
```

Live at: https://to-do-list-d6b2c.web.app
