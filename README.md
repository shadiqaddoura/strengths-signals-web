<p align="center">
  <img src="./public/branding/strength-signals-logo.png" alt="Strength Signals" width="720" />
</p>

<p align="center">
  A focused workout-progress dashboard built with Next.js and styled with the Tokyo Night color palette.
</p>

<p align="center">
  <img alt="Version 0.1.0" src="https://img.shields.io/badge/version-0.1.0-9ece6a" />
  <img alt="Next.js 16" src="https://img.shields.io/badge/Next.js-16.2.9-7aa2f7" />
  <img alt="MIT License" src="https://img.shields.io/badge/license-MIT-e0af68" />
</p>

## Overview

Strength Signals turns workout history into a clear, calm dashboard for tracking consistency and safe strength progression. Version **0.1.0** is a frontend-only release powered by local mock data, with the structure prepared for a future database integration.

## Features

- Weekly workout-goal progress and monthly session totals
- Exercise progression chart for key working weights
- Recent-workout history with focus, exercises, top sets, and notes
- Functional workout-logging modal with an in-browser preview state
- Saturday-to-Friday workout-week convention
- Responsive desktop and mobile layouts
- Tokyo Night dark theme with accessible green, blue, cyan, and amber accents
- Isolated mock-data layer ready to be replaced by a database or API

## Tech Stack

- [Next.js 16](https://nextjs.org/) with the App Router
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Recharts](https://recharts.org/) for progress visualization
- [Phosphor Icons](https://phosphoricons.com/)
- Plain CSS with Tokyo Night design tokens

## Getting Started

### Requirements

- Node.js 20 or newer
- npm

### Installation

```bash
git clone https://github.com/shadiqaddoura/strengths-signals-web.git
cd strengths-signals-web
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create an optimized production build |
| `npm start` | Start the production server |
| `npm run lint` | Run TypeScript validation without emitting files |

## Project Structure

```text
app/
  globals.css        Tokyo Night theme and responsive styles
  layout.tsx         Root application layout
  page.tsx           Dashboard UI and local interactions
lib/
  workout-data.ts    Mock workout data and frontend types
public/
  branding/          Project logo and brand assets
```

## Data Status

This release intentionally has no backend. Workout entries created through the modal exist only in the current browser session and reset on refresh. The mock dataset in `lib/workout-data.ts` provides a clear replacement point for a future database, authentication layer, and API.

## Version

Current release: **0.1.0**

## License

Strength Signals is available under the [MIT License](./LICENSE).
