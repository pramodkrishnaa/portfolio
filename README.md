# Pramod Krishna Sunkara — Portfolio

One site, two worlds. A minimal, technical developer portfolio at `/` and a loud,
cinematic personal world at `/life`, joined by a signature full-screen curtain
transition. Built from scratch, no template.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind v4** with CSS-variable design tokens (one dark theme; accent swaps per world)
- **Framer Motion** (reveals, transition, lightbox, terminal)
- **GSAP + Lenis** (smooth scroll synced to ScrollTrigger)
- **React Three Fiber + drei** (hero shader background, guarded + reduced-motion aware)
- **react-icons** (Tabler UI glyphs + brand marks) — no hand-rolled SVGs

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Keyboard

- `⌘K` / `Ctrl+K` — command terminal (type `help`)
- `P` — flip between the tech and life worlds

## Where the content lives

Everything swappable is in **`src/content/site.ts`** — name, taglines, the eight
technical disciplines, the six personal exhibitions, and the blog posts. Edit that
one file to update the site.

- **Media**: the tech "Selected work" uses labeled placeholder slots naming the file to
  drop into `public/` later. The `/life` lookbook uses seeded `picsum.photos` images as
  stand-ins — swap the `gallery()` URLs in `src/components/life/lookbook.tsx` for real
  photos, or point them at files in `public/`.

## Contact form

The form posts to `src/app/api/contact/route.ts`. It sends via [Resend](https://resend.com)
when configured; otherwise it returns an honest "not wired up yet" message (no fake
success). Set these env vars to enable real delivery:

```
RESEND_API_KEY=re_xxx
CONTACT_TO=pramodkrishnaa29@gmail.com     # optional, defaults to the site email
CONTACT_FROM=Portfolio <onboarding@resend.dev>   # optional
```

## Blog / CMS upgrade (optional)

The blog is live now, served from `BLOG_POSTS` in `src/content/site.ts` through the
data seam in `src/lib/blog.ts`. To move editing into a browser-based CMS:

1. Create a free Sanity project, note the `projectId`.
2. `npm install sanity next-sanity @portabletext/react`
3. Add `NEXT_PUBLIC_SANITY_PROJECT_ID` + `NEXT_PUBLIC_SANITY_DATASET` to `.env`.
4. Swap the two functions in `src/lib/blog.ts` for GROQ queries, and add a
   `src/app/studio/[[...tool]]/page.tsx` embedding the Studio. The blog pages don't change.

## Deploy (Vercel)

1. Push to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Add the contact env vars (and Sanity vars if used).
4. Attach a custom domain when ready; `*.vercel.app` works until then.

## Notes

- One dark theme, locked; accent is electric blue on `/`, signal red on `/life`.
- Honors `prefers-reduced-motion` everywhere (WebGL, transition, reveals, marquee all
  collapse to static). Mobile-first, no horizontal overflow. Per-route metadata, sitemap,
  robots included.
