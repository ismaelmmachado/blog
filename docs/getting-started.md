# Getting Started

## Prerequisites

- Node.js ^18 or ^20
- npm or bun

## Installation

```bash
# Clone the repository
git clone <repo-url>
cd blog

# Install dependencies
npm install
# or
bun install
```

## Development

Start the development server:

```bash
npm run dev
```

The server will be available at `http://localhost:3000`.

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with auto-reload |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Lint all source files |
| `npm run test` | Run test suite |
| `npm run seed` | Seed initial content |
| `npm run clean` | Remove build artifacts |
| `npm run format` | Format all source files |

## Project Structure

```
blog/
├── src/              # Source files
│   └── index.js      # Main Express server
├── scripts/          # Operational scripts
│   └── seed.js       # Seed initial content
├── docs/             # Documentation
│   ├── getting-started.md
│   └── contributing.md
├── dist/             # Built output (created by build)
├── package.json      # Project configuration
└── ...
```

## Adding New Content

Create markdown files in `src/content/posts/` with front matter:

```markdown
---
title: 'Your Post Title'
slug: 'your-post-title'
tags: ['tag1', 'tag2']
---

Your content here.
```

## Deployment

Build and start production:

```bash
npm run build
npm run start
```

The production server serves static assets from `dist/` and listens on the port defined by `PORT` env var.