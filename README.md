# Redefine Normal — Speaker Website

Single-page site for **Redefine Normal**, the interactive keynote by Cameron Schiller.
Astro 5 · Tailwind CSS 4 · TypeScript · static output for GitHub Pages.

## Preview locally

Requires Node 20+ (22 recommended).

```bash
npm install
npm run dev        # http://localhost:4321 — live-reloading dev server
npm run build      # production build into dist/
npm run preview    # serve the production build at http://localhost:4321
```

Optional: `cp .env.example .env` to set the form endpoint, booking email, or analytics.

## Project structure

```
src/
  config/site.ts        site name, SEO text, booking + one-sheet + analytics settings
  config/assets.ts      photography slots (null = labelled placeholder)
  assets/photography/   put approved photos here (Astro optimises them)
  components/           one component per section: Hero, Idea, Experience, Pledge,
                        Speaker, Audiences, Booking, Footer + Nav, Portrait, Review
  scripts/motion.ts     all motion (reveals, strike-throughs, nav state, menu)
  styles/global.css     design tokens + type system
public/assets/
  og/og-image.png       1200×630 social sharing image
  one-sheet/            drop the speaker one-sheet PDF here
  brand/  reel/         future brand graphics and speaker reel
```

## Common updates

- **Photos:** add the file to `src/assets/photography/`, then import it in `src/config/assets.ts` (instructions inline).
- **One-sheet:** put the PDF in `public/assets/one-sheet/` and set `oneSheet` in `src/config/site.ts`.
- **Booking form:** set `PUBLIC_FORM_ENDPOINT` to any service that accepts a POST and returns 2xx (e.g. Formspree). Until then the form validates but clearly says *not sent* — it never fakes success.
- **Booking email:** set `PUBLIC_BOOKING_EMAIL`. It appears in Booking and is offered as a fallback if a submission fails.
- **Review markers:** red tags mark copy/credentials awaiting approval. Set `PUBLIC_REVIEW_MODE=false` for launch. While review mode is on, the site also sends `noindex` and a blocking robots.txt.

## Deploying to GitHub Pages (when approved)

1. Push this folder to a GitHub repository.
2. Settings → Pages → Source: **GitHub Actions**.
3. Settings → Secrets and variables → Actions → **Variables** (all optional):
   - `SITE_URL` — e.g. `https://redefinenormal.com` (default: `https://<owner>.github.io`)
   - `BASE_PATH` — `/` for a custom domain (default: `/<repo-name>`)
   - `CUSTOM_DOMAIN` — writes the CNAME file, e.g. `redefinenormal.com`
   - `PUBLIC_FORM_ENDPOINT`, `PUBLIC_BOOKING_EMAIL`, `PUBLIC_PLAUSIBLE_DOMAIN`
   - `PUBLIC_REVIEW_MODE` — defaults to `false` in the workflow
4. Actions → **Deploy to GitHub Pages** → Run workflow. (It's manual-only until you enable the `push` trigger in `.github/workflows/deploy.yml`.)

HTTPS is automatic on GitHub Pages; tick "Enforce HTTPS" after the custom domain verifies.
