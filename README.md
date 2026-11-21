# Close 1 website

Static marketing site for **Close 1**, an iPhone app that sends a notification when a game gets close or goes to overtime. Hosted on GitHub Pages at <https://close1app.zkeldesign.com>.

Plain semantic HTML and one CSS file. No framework, no build step, no third-party requests. The only JavaScript is `faq.js`, a small optional enhancement on the Support page (see below).

## Files

```
/
  index.html            Home: hero, no-ads band, features, footer
  support/index.html    Support + FAQ (native <details>)
  privacy/index.html    Privacy Policy (verbatim from BRIEF.md Appendix A)
  404.html              Served by GitHub Pages for unknown URLs
  styles.css            All styles; design tokens are CSS custom properties in :root
  faq.js                Support page only: opens the FAQ answer named in the URL (#close-game)
  apple-touch-icon.png  180×180, generated from images/app-icon.png
  images/               Source images plus generated versions (see below)
  fonts/                Barlow .ttf originals, .woff2 conversions, OFL.txt
  CNAME                 close1app.zkeldesign.com
  .nojekyll             Tells GitHub Pages to serve files as-is
  robots.txt, sitemap.xml
  BRIEF.md              Build brief
```

Generated files in `images/` (originals are untouched):

- `mockup-{light,dark}-{480,720,960}.{webp,png}`: resized hero mockups (from `mockup-{light,dark}.png`, 1350×2760) with transparency kept. The page serves WebP with a PNG fallback through `srcset`.
- `favicon.svg`: the C1 monogram. It switches between a white tile (light) and a navy tile (dark) using `prefers-color-scheme`.
- `favicon-32.png`: PNG favicon fallback.

### Feature images

Each feature block on the home page has a light and a dark PNG, swapped with a `<picture>` and `prefers-color-scheme`:

| Section | Files | Style |
| --- | --- | --- |
| Quiet until it's close. | `notifications-{light,dark}.png` | Cutout |
| Your teams, front and center. | `home-{light,dark}.png` | Cutout |
| Scores on your Home Screen. | `widget-{light,dark}.png` | Screenshot |
| Everything, one tap away. | `follow-along-{light,dark}.png` | Cutout |

- **Cutout** images have transparent backgrounds and use `feature-media feature-media--cutout`, which shows them as-is.
- **Screenshot** images are full rectangles and use `feature-media`, which rounds the corners.
- No feature image gets a CSS shadow. Any shadow you see is part of the PNG itself.
- To replace an image, export it with the same filename. If its pixel size changes, update the `width` and `height` on the `<img>` (and on the dark `<source>`, if the dark file's size differs) so the browser reserves the right space while it loads.
- The hero's mint glow is turned off. The rule is commented out in `styles.css` (`.hero-media::before` and the `--hero-glow` variables), with instructions for turning it back on.

Paths are root-relative (`/styles.css`), which works because the site is served from the domain root.

### Wordmark file naming

The wordmark files are named for their **letter color**, not the background they sit on:

- `wordmark-dark.svg` has navy letters, so it's used in **light** mode.
- `wordmark-light.svg` has white letters, so it's used in **dark** mode.

The monograms are named the other way (`monogram-light.svg` is for light mode). The HTML accounts for both.

### FAQ deep links

Each FAQ item has an id, so the app or an email can link straight to an answer:

| Question | Link |
| --- | --- |
| What counts as a close game? | `/support/#close-game` |
| Which leagues are supported? | `/support/#leagues` |
| Why didn't I get a notification? | `/support/#missing-notification` |
| How do I choose which games notify me? | `/support/#choose-games` |
| How do I cut down on college notifications? | `/support/#college-notifications` |
| How fresh are the scores? | `/support/#score-freshness` |
| Is Close 1 free? | `/support/#free` |
| Does it have widgets and light mode? | `/support/#widgets-light-mode` |
| What do I need to run it? | `/support/#requirements` |
| Where does the data come from? | `/support/#data-source` |
| How do I delete my data? | `/support/#delete-data` |

With JavaScript on, `faq.js` opens the linked answer. With it off, the page scrolls to the question, which stays closed.

## Run locally

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Python's server doesn't use `404.html` for missing pages; GitHub Pages does. To see that page locally, open `/404.html` directly.

## Deploy to GitHub Pages

1. Create a GitHub repository and push this folder to the `main` branch.
2. In the repository, go to **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
3. Under **Custom domain**, enter `close1app.zkeldesign.com` and save. The `CNAME` file in the repository already contains this value.
4. At your DNS provider, add a `CNAME` record with host `close1app` pointing to `<your-github-username>.github.io`.
5. Wait for GitHub to issue the TLS certificate (this can take a while after DNS resolves), then check **Enforce HTTPS**.

## Placeholders

| Placeholder | Current state | Where to change it |
| --- | --- | --- |
| `SUPPORT_EMAIL` | `zach@zkeldesign.com` | It appears 3 times: `support/index.html` (intro and the "delete my data" answer) and `privacy/index.html` (Contact). A static site has no shared include, so find and replace `zach@zkeldesign.com` across the repository. Note that the privacy policy wording is yours to change. |
| `TIP_URL` | Not provided, so the tip line is omitted | `index.html`: replace the comment `<!-- TODO(close1): add tip line when TIP_URL is available -->` (end of `<main>`) with `<p class="tip container section">Close 1 is free. If you like it, you can <a href="TIP_URL" rel="noopener noreferrer">leave a tip</a>.</p>`. Keep it on the home page only. |
| App Store link and badge | "Coming soon" pill | `index.html`: the comment above `<p class="pill">Coming soon</p>` in the hero. Replace the pill with the badge link. Use Apple's official badge artwork, saved into `images/`, with a `<picture>` for the light and dark versions. Then delete the "Coming soon" pill. |
| Smart App Banner | Not added | `index.html` `<head>`: the commented `<meta name="apple-itunes-app" content="app-id=APP_STORE_ID">`. Uncomment it and fill in the ID. |
| Privacy "Last updated" date | October 16, 2026 | `privacy/index.html`, the `<p class="meta">` under the `<h1>`. |
| Open Graph image | Not present | Add `images/og-image.png` (1200×630), then add the `og:image` and `twitter:image` tags described in the TODO comment in the `index.html` `<head>`. |
## Contrast ratios

Measured from the final tokens in `styles.css` using the WCAG 2.x relative-luminance formula. Card colors are the translucent surface blended over the page background. All text needs 4.5:1; UI components and focus indicators need 3:1.

**Light**

| Foreground | Background | Ratio |
| --- | --- | --- |
| Primary text `#14132B` | Page top `#FFFFFF` | 18.14:1 |
| Primary text `#14132B` | Page bottom (soft mint) `#CFF4F1` | 15.43:1 |
| Secondary text `#4A4964` | Page top `#FFFFFF` | 8.65:1 |
| Secondary text `#4A4964` | Page bottom `#CFF4F1` | 7.36:1 |
| Secondary text `#4A4964` | Card on page bottom `#D1F1EE` | 7.22:1 |
| Navy accent / links / focus `#292768` | Page top `#FFFFFF` | 13.25:1 |
| Navy accent / links / focus `#292768` | Page bottom `#CFF4F1` | 11.27:1 |
| Navy accent `#292768` | Card on page bottom `#D1F1EE` | 11.06:1 |
| Mint `#00C7BE` (decorative only, never text) | White | 2.12:1 |

**Dark**

| Foreground | Background | Ratio |
| --- | --- | --- |
| Primary text `#FFFFFF` | Page top `#201E50` | 15.41:1 |
| Primary text `#FFFFFF` | Page bottom `#07061A` | 20.00:1 |
| Secondary text `#C3C2DC` | Page top `#201E50` | 8.86:1 |
| Secondary text `#C3C2DC` | Card on page top `#26253F` | 8.51:1 |
| Mint accent / links / focus `#63E6E2` | Page top `#201E50` | 10.23:1 |
| Mint accent `#63E6E2` | Card on page top `#26253F` | 9.83:1 |
| Navy on mint (skip link) `#201E50` | `#63E6E2` | 10.23:1 |

I also measured the computed text colors against both ends of the page gradient on every page in the browser. The lowest was 7.36:1 in light and 8.86:1 in dark.

## Verification and what I couldn't verify

Checked:

- Every page at 320, 768 and 1280px wide, in light and dark (emulated `prefers-color-scheme`). No horizontal scrolling.
- Keyboard: the skip link is the first focusable element and moves focus to `main`. Nav, footer links and FAQ summaries all show a 3px focus ring. Enter toggles the FAQ items.
- Structure: one `<h1>` per page, no skipped heading levels, the required landmarks, `aria-current` on the current nav link, alt text on every image, explicit `width`/`height`, targets at least 44px tall.
- Every page parses as strict HTML5 (html5lib). Every internal link and image path resolves. No duplicate ids.
- No requests leave the origin. No console errors.
- No mention of tipping on any page (the tip line is omitted until `TIP_URL` exists).
- The privacy text matches BRIEF.md Appendix A word for word.

Not verified:

- **Automated axe or Lighthouse scan.** Node isn't installed here, and loading axe-core from a CDN into the test page was blocked. Running Lighthouse in Chrome DevTools, or `npx @axe-core/cli`, once deployed is a good follow-up.
- **The W3C Nu validator** wasn't run; html5lib strict parsing was used instead.
- **Reduced motion:** the site has no animations or transitions, so there's nothing to reduce. A global `prefers-reduced-motion` rule is still in place for anything added later.
- **Forced colors (Windows High Contrast)** styles are written but weren't tested on Windows.
- **200% text zoom and 400% page zoom** weren't tested separately. Text uses `rem` and `clamp()`, and the 320px check covers the reflow case at 400% zoom.
- **Real iOS Safari** wasn't tested. In the test browser, `<picture>` picks its light or dark source when the page loads, so switching appearance mid-visit can need a reload to swap the wordmark and hero. Safari usually swaps them live.
