<div align="center">

# Dipzin

**A curated collection of design works meant to inspire.**

[dipzin.com](https://dipzin.com) · [Issues](https://github.com/dabbonet/dipzin-frontend/issues)

</div>

---

Dipzin is a design inspiration platform for product designers and design teams. It collects and curates real-world app screenshots, UI components, marketing screens, and user flows from popular iOS, Android, and web applications so you can find visual references without manually digging through dozens of apps.

Browse by platform (`iOS`, `Android`, `Web`) and by pattern (`Apps`, `Components`, `Marketing`, `Flows`, `Screens`), search the full library, save what you like to collections, and export everything you need in one click.

---

## ✨ Features

- 🔎 **Curated library** — Screenshots and flows hand-picked from popular mobile and web apps.
- 📱 **Platform-aware browsing** — Filter inspiration by `iOS`, `Android`, or `Web`.
- 🧩 **Pattern filters** — Drill down into `Apps`, `Components`, `Marketing`, `Flows`, or `Screens`.
- 🔍 **Search** — Full-text search across apps, components, marketing, flows, and screens.
- 📚 **Collections** — Save references into personal collections to keep your boards organized.
- 📦 **Bulk download** — Select multiple screens and download or copy them in one go.
- 👤 **Account & profiles** — Personalize your library and access your collections from any device.
- 🌍 **Internationalization** — Multi-language UI via `next-intl` and Crowdin.
- 🎨 **Built on a modern Next.js stack** — App Router, Server Components, parallel routes, and intercepting routes for instant modals.

---

## 🧱 Tech Stack

| Layer              | Tech                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------- |
| Framework          | [Next.js 14](https://nextjs.org/) (App Router)                                              |
| Language           | TypeScript                                                                                  |
| UI                 | [Tailwind CSS](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/) primitives |
| Icons              | [Heroicons](https://heroicons.com/)                                                         |
| Auth               | [NextAuth.js](https://authjs.dev/)                                                          |
| Forms & Validation | React Hook Form + Zod                                                                       |
| i18n               | [next-intl](https://next-intl-docs.vercel.app/) + [Crowdin](https://crowdin.com/)           |
| Testing            | [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/)       |
| E2E                | [Playwright](https://playwright.dev/)                                                       |
| Linting            | ESLint · Prettier · Husky · lint-staged · Commitlint                                        |
| CI / Quality       | GitHub Actions · Sentry · Codecov · Checkly                                                 |

This project is built on top of the [Next.js Boilerplate](https://github.com/ixartz/Next-js-Boilerplate) starter by [@ixartz](https://github.com/ixartz), then significantly customized to power Dipzin.

---

## 🚀 Getting Started

### Requirements

- **Node.js 20+**
- **npm**, **pnpm**, or **yarn**

### Install

```bash
git clone https://github.com/dabbonet/dipzin-frontend.git
cd dipzin-frontend
npm install
```

### Configure environment

Create a `.env.local` file at the project root with the variables your local setup needs. The most important ones are:

```env
# Public API the frontend talks to
NEXT_PUBLIC_API=https://your-api.example.com

# Auth (NextAuth)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=***

# Optional
SENTRY_DSN=
```

> The full env schema lives in `.env.example` (if present) or in the deployment config used by your hosting provider.

### Run the dev server

```bash
npm run dev
```

Open <http://localhost:3000> in your browser.

---

## 🗂️ Project Structure

```
.
├── public/                  # Static assets (icons, illustrations, OG images)
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (explorer)/      # Browse / search / screen & flow detail routes
│   │   ├── (account)/       # Profile, access, OTP login
│   │   ├── (static)/        # Marketing pages (legal, etc.)
│   │   ├── api/             # Route handlers
│   │   ├── layout.tsx       # Root layout
│   │   ├── sitemap.ts       # Dynamic sitemap
│   │   └── robots.ts        # Robots policy
│   ├── components/          # Shared & feature components
│   │   ├── Account/
│   │   ├── Collection/
│   │   ├── Explorer/        # Browse, search, bulk actions
│   │   ├── Shared/          # Generic UI primitives
│   │   ├── Static/          # Marketing-page components
│   │   └── UI/              # Tailwind/Radix-styled primitives
│   ├── hooks/               # Reusable React hooks
│   ├── stores/              # Zustand stores
│   ├── styles/              # Global styles & Tailwind entry
│   ├── utils/               # Helpers (API client, storage, search utils, …)
│   ├── lib/                 # Third-party integrations (analytics, auth client, …)
│   └── validations/         # Zod schemas
├── tests/
│   └── e2e/                 # Playwright E2E tests
├── tailwind.config.ts
├── next.config.mjs
└── tsconfig.json
```

---

## 🧪 Available Scripts

| Command               | What it does                                            |
| --------------------- | ------------------------------------------------------- |
| `npm run dev`         | Run the app in development mode with live reload        |
| `npm run build`       | Build the production bundle                             |
| `npm run start`       | Start the production server                             |
| `npm run lint`        | Lint the codebase                                       |
| `npm run format`      | Auto-fix lint issues                                    |
| `npm run check-types` | TypeScript type-check the project                       |
| `npm run test`        | Run unit tests (Vitest)                                 |
| `npm run test:e2e`    | Run end-to-end tests (Playwright)                       |
| `npm run build-stats` | Build with the bundle analyzer enabled                  |
| `npm run storybook`   | Launch Storybook for component development              |
| `npm run commit`      | Interactive CLI to write a Conventional Commits message |

---

## 🌍 Internationalization

Localization is powered by [`next-intl`](https://next-intl-docs.vercel.app/) and synchronized through [Crowdin](https://crowdin.com/). As a developer you only need to keep the default-language messages up to date — translations are pushed and pulled automatically through Crowdin.

To enable the sync in CI, set the following secrets on your GitHub repository:

- `CROWDIN_PROJECT_ID`
- `CROWDIN_PERSONAL_TOKEN`

See [`crowdin.yml`](./crowdin.yml) for the file mapping.

---

## 🧭 Code Style

- **TypeScript** everywhere — keep `npm run check-types` green.
- **ESLint + Prettier** — Husky and lint-staged run them automatically on commit.
- **Conventional Commits** — enforced by Commitlint. Use `npm run commit` for an interactive prompt, or write messages like `feat: add bulk copy-to-clipboard`.

Commit messages drive the auto-generated [`CHANGELOG.md`](./CHANGELOG.md).

---

## 🧱 Architecture Notes

A few choices worth knowing if you're hacking on this repo:

- **Parallel + intercepting routes.** Screen and flow detail pages live under `app/(explorer)/@modal` and `app/(explorer)/@modal/(.)…`, so deep-linking a screen also renders it as a modal over the explorer.
- **URL as state.** Filters, the active app, and the explorer context are all kept in sync with the URL (`useQuery`, `updateStateAndUrl`, `updateUrlPart`) — shareable links Just Work.
- **Bulk actions.** The `useBulkActionStore` Zustand store holds the current multi-select so the action bar can appear on any panel.
- **Strapi-backed data.** The frontend reads from a separate headless CMS API (`NEXT_PUBLIC_API`). Schema and content live in a sister repo, not here.

---

## 🚢 Deployment

Any Next.js-friendly host works. The reference setup is:

1. Set the env vars from [Configure environment](#configure-environment) in your hosting provider.
2. Run `npm run build` (the platform does this for you on most hosts).
3. Point the public domain at the generated build.
4. Make sure `NEXTAUTH_URL` and `SENTRY_DSN` (if used) are set to the production values.

Recommended platforms: Vercel, AWS Amplify, or any container host running `node` against the production build.

---

## 🤝 Contributing

Pull requests are welcome! A few guidelines:

1. Fork the repo and create a branch off `main`.
2. Keep changes focused; one feature or fix per PR.
3. Run `npm run lint`, `npm run check-types`, and `npm run test` before opening the PR.
4. Add or update tests for any new behavior.
5. Use Conventional Commits so `CHANGELOG.md` stays accurate.

For larger changes, please open an issue first to discuss what you'd like to do.

---

## 📄 License

This project is released under the [MIT License](./LICENSE). It builds on the MIT-licensed [Next.js Boilerplate](https://github.com/ixartz/Next-js-Boilerplate) — see that repo for upstream attribution.

---

<div align="center">

Made with care by the [Dipzin](https://dipzin.com) team.

</div>
