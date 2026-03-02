# My Organization

![My Organization](https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive nonprofit website built with **Next.js 16** and powered by **[Cosmic](https://www.cosmicjs.com/docs)** CMS. Dynamically displays mission statements, programs, events, impact stories, and team members — all managed through Cosmic's intuitive dashboard.

## Features

- 🏠 **Dynamic Homepage** — Hero with mission statement, featured programs, events, stories & team
- 📋 **Programs** — Filterable directory with status badges and detail pages
- 📅 **Events** — Chronologically sorted with dates, locations, and registration links
- 💛 **Impact Stories** — Testimonials with photos and linked programs
- 👥 **Team Members** — Professional profiles with roles, bios, photos, and email
- 🎨 **Modern Design** — Clean, warm, card-based layout with smooth animations
- 📱 **Fully Responsive** — Mobile-first design for every screen size
- ⚡ **Server Components** — Fast loading with Next.js 16 server-side rendering
- 🔒 **Type-Safe** — Full TypeScript with strict mode and pre-build validation

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmic-staging.com/projects/new?clone_bucket=69a5159333dd5691286459bf&clone_repository=69a517161223a8f601dc7f20)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for a nonprofit website with mission statement, programs, events, impact stories, and a team section."

### Code Generation Prompt

> "Build a Next.js application for a company website called 'My Organization'. The content is managed in Cosmic CMS with the following object types: site-settings, programs, events, impact-stories, team-members. Create a beautiful, modern, responsive design with a homepage and pages for each content type."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS for content management
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [Inter Font](https://fonts.google.com/specimen/Inter) — Modern sans-serif typeface

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with the nonprofit content model

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd my-organization

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Start the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

## Cosmic SDK Examples

### Fetching Programs

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: programs } = await cosmic.objects
  .find({ type: 'programs' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Event

```typescript
const { object: event } = await cosmic.objects
  .findOne({ type: 'events', slug: 'annual-gala' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Impact Stories with Connected Programs

```typescript
const { objects: stories } = await cosmic.objects
  .find({ type: 'impact-stories' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1) // Resolves connected program objects
```

## Cosmic CMS Integration

This application integrates with the following Cosmic object types:

| Object Type | Slug | Description |
|---|---|---|
| 🌍 Site Settings | `site-settings` | Organization name, tagline, mission, logo |
| 📋 Programs | `programs` | Program descriptions, images, status |
| 📅 Events | `events` | Event dates, locations, descriptions, registration |
| 💛 Impact Stories | `impact-stories` | Testimonials with person, quote, story, photo, program |
| 👥 Team Members | `team-members` | Staff roles, bios, photos, contact emails |

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`
4. Deploy!

### Netlify

1. Push your code to GitHub
2. Import the repository on [Netlify](https://netlify.com)
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables
6. Deploy!

<!-- README_END -->