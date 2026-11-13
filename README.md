# AXONO — Website

Marketing website for AXONO, the multi-sport automated match recording platform.
**Play. Capture. Relive.**

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Lucide.
Frontend only — no backend, database or auth.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

## Pages

Three pages. The recording process is the same for every sport, so Sports, How It Works and About
are sections of the home page (linked from the nav as `/#sports`, `/#how-it-works`, `/#about`).

| Route | Page |
|---|---|
| `/` | Home — hero, sports, how it works, journey, why Axono, about, venues, CTA |
| `/venues` | Venue partnerships + partner form (`/venues#partner`) |
| `/contact` | Contact form + FAQ (`/contact?enquiry=find-venue` / `venue` preselects) |
| `/privacy`, `/terms` | Draft legal pages (footer only) — review before launch |

## Where to change things

| What | File |
|---|---|
| Contact emails, social links, site URL, nav | `src/content/site.ts` |
| Sport names & taglines | `src/content/sports.ts` |
| Heading sizes (`.h-hero`, `.h-section`, `.h-card`) | `src/app/globals.css` |
| **All photos & videos** | `src/content/media.ts` + files in `public/media/` |
| Brand colours & fonts (design tokens) | `src/app/globals.css` (`@theme`) |
| Contact form delivery | `src/lib/contact.ts` |

### Replacing media with AXONO footage
Drop files into `public/media/images` or `public/media/videos` and update the paths in
`src/content/media.ts`. Videos: H.264 MP4, 6–12 s, 720p–1080p, ideally < 8 MB, plus a poster image.
Current placeholders are Pexels-licensed — see `public/media/CREDITS.md`.

Video behaviour: muted, looped, inline; lazy-loaded outside the hero; showcase tiles load video only on hover;
phones, data-saver and reduced-motion users get the poster image (the hero and sport-page heroes still play on phones);
any load error falls back to the poster.

### Connecting the contact form
Set `NEXT_PUBLIC_CONTACT_ENDPOINT` in `.env.local` (and on your host) to any JSON form endpoint,
e.g. Formspree `https://formspree.io/f/<id>`. Until then, the form validates input and clearly tells the
visitor the message was **not** sent, offering a pre-filled email instead.

## Before launch — checklist
- [ ] Real contact/partnership emails and Instagram/LinkedIn URLs in `src/content/site.ts`
- [ ] `NEXT_PUBLIC_SITE_URL` set to the production domain (used for SEO, sitemap, OG)
- [ ] `NEXT_PUBLIC_CONTACT_ENDPOINT` configured
- [ ] Privacy Policy and Terms reviewed by legal
- [ ] Swap stock media for AXONO's own venue footage
