# Repository Guidelines

## Project Structure & Module Organization
The app uses the Next.js App Router under `src/app`, with the primary UI defined in `src/components/Page.tsx` and consumed via `src/app/page.tsx`. API handlers live alongside pages (for example, `src/app/api/claude/route.ts` for Anthropic requests), and shared styling sits in `src/app/index.css`. Static assets belong in `public/`, while configuration files (`next.config.ts`, `eslint.config.mjs`, `tsconfig.json`) remain at the repository root.

## Build, Test, and Development Commands
- `npm run dev` – start the Turbopack development server on port 3000.
- `npm run build` – compile the production bundle; run before deploying.
- `npm run start` – serve the built app locally for final smoke checks.
- `npm run lint` – execute the Next.js/TypeScript ESLint rules; ensure a clean run before committing.

## Coding Style & Naming Conventions
Prefer TypeScript with strict typing; avoid `// @ts-nocheck` unless third-party code demands it. Components are client-only unless they omit `'use client'`; keep server logic in API routes. Use two-space indentation, single quotes, PascalCase for components (`Page.tsx`), camelCase for hooks/utilities, and SCREAMING_SNAKE_CASE for environment variables. Let the `next/core-web-vitals` ESLint config guide formatting and run `npm run lint -- --fix` to resolve minor violations.

## Testing Guidelines
Automated tests are not yet configured; introduce Testing Library or Playwright coverage when extending UI flows, placing specs under `src/__tests__/` or alongside the component. At minimum, document manual verification steps in the pull request (for example, screenshots of the prompt workflow). Keep test names descriptive (`renders login gate when unauthenticated`) so failures are clear.

## Commit & Pull Request Guidelines
Write imperative, concise commits (`feat: add drag-and-drop preview`) and group related changes together. Pull requests should explain the motivation, outline key changes, list testing evidence, and link issues or tasks. Request reviews before merging and address feedback promptly.

## Security & Configuration Tips
Do not commit live API keys; replace the hard-coded Anthropic key in `src/app/api/claude/route.ts` with `process.env.ANTHROPIC_API_KEY`, stored in `.env.local`. Document any new secrets or config flags in `README.md` so other contributors can reproduce the setup.
