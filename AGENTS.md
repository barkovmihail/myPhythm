# Repository Guidelines

## Project structure

My Rhythm is a Russian-language landing page with an interactive dinner demo and an early-access signup form. Use `docs/SPEC.md` for the approved copy, interaction states, and accessibility criteria.

- `src/main.jsx` contains the React components. Edit layout and responsive styles in `src/style.css`, and keep static images in `public/`.
- `server/signup.mjs` handles `POST /api/early-access` and stores signups in SQLite. Both the form and the handler use `server/email.mjs` for validation.
- `vite.config.mjs` registers the signup handler for development and preview. `server/start.mjs` serves the production build from `dist/` with the same handler.

## Development commands

Run these commands from the project root with a Node.js version that supports Vite 8 and `node:sqlite`.

- `npm ci` installs dependencies from the lockfile.
- `npm run dev` starts the development server with hot reload.
- `npm run build` generates the production assets in `dist/`.
- After building, use `npm run preview` for Vite preview or `npm run start` for the Node server (default port 4173).

## Coding conventions

Use ES modules, two-space indentation, single-quoted JavaScript strings, and no trailing semicolons. Use PascalCase for components (`Hero`), camelCase for functions (`validEmail`), and kebab-case for CSS classes (`hero-copy`). Match surrounding formatting; the project has no configured lint or format script.

## Testing

Follow the acceptance scenario in `docs/SPEC.md` at 360, 768, and 1440 px. Check keyboard navigation, meal switching and saving, invalid emails, retry after network failure, and duplicate signups. No coverage threshold or `npm test` script is configured.

This workspace includes a Git-ignored Playwright check in `.qa/check.mjs`. With its local `playwright-core` dependency and Chrome installed, start a QA server in PowerShell:

```powershell
$env:RHYTHM_DATA_DIR = '.qa/data'
npm run dev -- --host 127.0.0.1 --port 4185 --strictPort
```

Run `node .qa/check.mjs` from the project root in a second terminal.

## Commits and pull requests

Use a short imperative subject such as `Preserve signup email after a failed request`. Describe the user-visible change and checks run. Link a related issue when available and include mobile and desktop screenshots for layout changes.

## Agent instructions

For library, API, or CLI questions, resolve the library ID in Context7 and query its documentation separately for each concept. Use an exact library ID directly when supplied. Use local source for project-specific behavior.
