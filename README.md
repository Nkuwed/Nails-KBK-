# KreatedByKeora — Website

**WEDE5020 — Web Development (Introduction) · Portfolio of Evidence (Parts 1–3)**
**Student:** Nonkululeko Sibiya · **Student number:** ST10502108
**Repository:** <https://github.com/Nkuwed/WEDE5020-kbk-main-PoE>

## Project overview

Front-end build for **KreatedByKeora**, a real nail artistry studio run by Keora
in Kibler Park, Johannesburg South. Until now Keora has taken bookings through
TikTok/Instagram comments and DMs. This site gives her one professional place
to show her work, publish prices and policies, and take bookings.

The site was built to match the approved Website Project Proposal (Part 1) and
its low-fidelity wireframes. It uses plain HTML, CSS and JavaScript — no
frameworks — and is mobile-first and responsive.

## Website goals and objectives

- Move enquiries and bookings from scattered social-media comments/DMs onto a
  single professional platform.
- Increase discoverability for clients searching online for her style of nail
  art, not only people who already follow her.
- Showcase a curated portfolio that builds trust before a client's first visit.

**Target audience:** women aged 18–45 in and around Kibler Park and greater
Johannesburg looking for Gel-X extensions and dramatic nail art.

## Key features and functionality

| Page | What it does |
|---|---|
| `index.html` | Hero image, short introduction, "Book Now" call to action, quick category chips, featured and popular nail art |
| `about.html` | Keora's journey, business background and challenges, studio philosophy, mission and vision |
| `services.html` | Price list with **category filter chips and a live text search**, plus the studio price-list and policy posters |
| `enquiry.html` | Booking form with client-side validation, AJAX submit and an instant **estimate / deposit / availability** reply; policies in an accordion; POPIA privacy note |
| `contact.html` | Embedded Google Map, opening hours, WhatsApp/call/social links and a contact form that compiles an email to the studio |
| `art_work.html` | Gallery of 20 manicure and pedicure photos with a **scrollable lightbox** |
| *Every page* | Responsive header navigation + mobile drawer, **site-wide search bar**, footer with contact links |

## Sitemap

```
Home (index.html)
├── About (about.html)
├── Services (services.html) ── filter chips + text search
├── Enquiry (enquiry.html) ──── booking form, policies accordion
├── Contact (contact.html) ──── map, contact form
└── Art Work (art_work.html) ── gallery + lightbox
Site-wide: header search bar (js/search.js), robots.txt, sitemap.xml
```

## File and folder structure

```
KBK/
├── index.html · about.html · services.html · enquiry.html · contact.html · art_work.html
├── robots.txt            Crawler rules (links to the sitemap)
├── sitemap.xml           All six pages for search engines
├── css/
│   └── style.css         Reset, design tokens, layout, components, responsive rules, search/lightbox/accordion
├── js/
│   ├── main.js           Mobile drawer, services filter + search, form validation, AJAX submit, enquiry reply, contact email
│   ├── search.js         Site-wide search (index + panel)
│   └── lightbox.js       Art Work lightbox (zoom/scroll, prev/next, keyboard, swipe, deep links)
├── images/
│   ├── hero/             Logo
│   └── portfolio/        Nail art photography (descriptive file names)
│       └── thumbs/       480 px / 960 px thumbnails used by the gallery grid
├── docs/                 Project proposals, content research, approval letter
├── changelog.md · Changelog.docx   Same changelog as below
└── README.md
```

## Design system

- **Colour:** blush pink (`#f1c4d6`) and rose-gold (`#c79a7b`) on a charcoal
  base (`#18131a`), per the proposal's Design & UX brief.
- **Type:** Fraunces (serif, headings) paired with Manrope (sans-serif,
  body/UI), on a rem-based type scale.
- **Layout:** mobile-first single column; CSS Grid for card/gallery grids and
  Flexbox for the header, chips and forms.

## Part 1 — Building the foundation

Planning, proposals for two organisations, content research, sitemap,
wireframes, semantic HTML for all pages (`header`, `nav`, `main`, `section`,
`footer`) and the folder structure above. See `docs/` for the proposal documents.

### Timeline and milestones

| Dates | Milestone |
|---|---|
| 24 – 31 July 2026 | Research and planning; sitemap, wireframes, content/image collection |
| 3 – 14 August 2026 | Create the HTML website using VS Code & GitHub (Part 1) |
| 17 – 28 August 2026 | Start Part 2: homepage and About Us, files and folders |
| 31 Aug – 11 Sept 2026 | Services, enquiry and contact pages; test navigation; styling and colours |
| 14 – 18 September 2026 | Proof-read, test links and loading times; submit Part 2 |
| 21 Sept – 2 October 2026 | Review Parts 1 and 2, fix errors, act on feedback |
| 6 – 23 October 2026 | Part 3: JavaScript, SEO, forms, search, lightbox |
| 27 Oct – 6 Nov 2026 | Review additions, fix bugs |
| 6 – 20 November 2026 | Final proof-read and testing of links and loading times |

## Part 2 — CSS and responsive design

- One external stylesheet (`css/style.css`) linked from every page; CSS reset,
  design tokens (custom properties), typography scale, grid/flex layouts,
  `:hover` / `:focus-visible` / `:active` states, `prefers-reduced-motion`.
- **Breakpoints:** mobile (default), tablet `≥ 600px` (2 → 3 column grids),
  desktop `≥ 860px` (top navigation replaces the hamburger drawer, two-column
  hero, 4-column gallery).
- Relative units (`rem`, `%`, `vw`, `aspect-ratio`) throughout; gallery images
  use `srcset` + `sizes` and `loading="lazy"`.

### DevTools screenshots

| Mobile (iPhone 16) | Tablet (iPad) | Desktop (laptop) |
|---|---|---|
| ![Mobile view](images/portfolio/iPhone%2016%20view.png) | ![Tablet view](images/portfolio/iPad%2013%20view.png) | ![Laptop view](images/portfolio/laptop%20view.png) |

## Part 3 — Functionality and SEO

- **Site-wide search** (`js/search.js`) — header search bar on every page.
- **Gallery lightbox** (`js/lightbox.js`) — large, scrollable, zoomable viewer.
- **Accordion** — enquiry-page policies (`<details>`/`<summary>`).
- **Dynamic content / search** — services list filters by chip and by typed text.
- **Forms** — `enquiry.html` (estimate / deposit / availability reply) and
  `contact.html` (compiled email). HTML5 attributes plus JavaScript
  validation with inline error messages; AJAX (`fetch`) submit.
- **Interactive map** — Google Map embedded on `contact.html`.
- **SEO** — unique `<title>` and meta description per page, meta keywords,
  one `<h1>` per page with logical `h2`/`h3` structure, descriptive image file
  names and alt text, internal links, mobile-friendly layout, `robots.txt`,
  `sitemap.xml`, lazy-loaded responsive images, `rel="noopener"` on external
  links and escaped user text in JavaScript output.
- **Deployment** — see "Known items" in the changelog below.

## Testing

Tested in Chromium at 360 px, 390 px, 768 px and 1280 px wide with no horizontal
scrolling on any page; search, lightbox (open, next/previous, zoom + scroll,
Esc, deep link), both forms (empty submit, invalid values, valid submit) and the
services filter/search were exercised with an automated browser script. Links
were checked from every page.

## Changelog

### Part 1 — 12–14 August 2026

12 August 2026
- First commit — initial HTML structure for the site.
- Added `art_work.html` to the project structure.
- Fixed two early typing errors.
- Created the initial README.md for the project.
- Removed a duplicated folder and a stray uploaded `KreatedByKeora-website 2.zip`.
- Fixed image and icon sizing across pages.
- Rearranged portfolio images and corrected image placement.
- Fixed broken `href` links and corrected them on the Art Work page.
- Updated README.md with project details.
- Fixed a title typo ("Enquire" → "Enquiry").
- Added updated portfolio images.
- Revised the Art Work page content and added draft images.
- Expanded README with fuller project details and file structure.

13 August 2026
- Cleaned up duplicate/incorrect image entries in `art_work.html`.
- Added studio policies content (deposits, late arrivals, cancellations) to the enquiry page.
- Created the `documents` folder.
- Added the initial (empty) JavaScript file, then removed and recreated the `js` folder while settling on a final structure.
- Created the `css` folder and an initial stylesheet, later renamed `KBK/styles.css` to `KBK/css/style.css` for consistent project organisation.
- Minor file/folder naming corrections.
- Added image assets via upload.
- Expanded the Website Project Proposal with additional detail, then created it as a dedicated document.
- Removed a stray `KBK/document` directory.
- Added primary navigation (`top-links`) to every page.

14 August 2026
- Updated the References list in README.md ahead of submission.

### Part 2 — 09 September 2026

**Addressing Part 1 feedback:**
- Added this Changelog section to the README. This was the only mark lost in
Part 1 (0/5, "No changelog provided") — all edits made from this point on
  are logged here going forward.

**CSS styling (desktop):**
- Linked `css/style.css` in the `<head>` of every page (it existed from
Part 1 but was never linked, so none of the site's styling was actually
  loading in the browser).
- Added Google Fonts `<link>` tags (Fraunces + Manrope) to every page, per
  the design system below.
- Built a full external stylesheet: CSS reset, design-token variables
  (colour, type scale, spacing, radius), base typography, header/nav,
  mobile drawer, buttons, hero, chip filters, card/grid layouts (services,
  gallery, featured/popular), forms, footer, and the sticky bottom tab bar.
- Used CSS Grid for card grids (`grid-3`, `grid-2`, `gallery-grid`) and
Flexbox for the header, hero, chip row and forms.
- Added `:hover`, `:focus-visible` and `:active` states across nav links,
  buttons, chips, cards and form fields.
- Respected `prefers-reduced-motion` for all transitions.

**Responsive design:**
- Mobile-first base styles, with breakpoints at `600px` (tablet: 2→3 column
  grids) and `860px` (desktop: top nav replaces the hamburger/tab-bar, hero
  switches to a two-column layout).
- Used relative units (`rem`, `%`, `vw`) and `aspect-ratio` for responsive
  images instead of fixed pixel dimensions.

**Bug fixes:**
- `art_work.html` had a mismatched closing `</a>` tag, a duplicated
  `</body>` tag, and was missing the shared header/drawer/footer/tab-bar
  markup used on every other page — rebuilt it to match the rest of the
  site so the shared stylesheet applies consistently. Also replaced its
  placeholder `<title>Document</title>` with a real title and meta
  description.
- `enquiry.html` had a stray closing `</section>` tag with no matching
  opening tag around the page intro — fixed so the page's HTML is valid.

  ### Part 3 — 11 October 2026 (Part 2 feedback)

**Part 2 feedback:**
> Layout structure is present but could be improved.Elements are positioned correctly, but there may be minor issues with alignment or spacing. (4/5)
> Layout is improved and constant throughout

Fixing layout of pages and navigations tabs. 
Adding images to art.html
Fixing enquiry form and contact form, to tell the customers when they when missed a block to fill it in. 
Worked page by page to redo the code so the JavaScript is working throughout all pages.

### Part 3 — 24 October 2026 -29 October 2026 (search, lightbox and rubric review)

**Requested changes**

**Site-wide search bar (new `js/search.js`).**
- Added a magnifier button to the
  header of all six pages. Opens a search panel under the header. Typing searches an index of every page, service (with prices), policy, opening hours/location/contact detail and all 20 Art Work photos.
-Every typed word must match, results are ranked (title → keywords → description, pages/services above photos), matches are highlighted, and the panel is keyboard friendly. Art Work results deep-link to it opens that photo in the lightbox. The panel has its own styles in section 16 of `style.css` and a `role="search"` form with a label for screen readers.

 **Art Work lightbox (new `js/lightbox.js`).**
- Every photo on `art_work.html` is now a `<button>` that opens a full-screen viewer showing the large image
  with its caption.
  -The viewer is **scrollable**: "Full size" (or clicking the
  photo) shows the image at its real pixel size inside a scroll area so the
  visitor can scroll/drag around it in both directions; "Fit to screen"
  returns to the whole photo.
  
  **Gallery images.**
- Replaced the 20 generic photos' `alt` text
  ("Nail art design", "Slight mix of colours") with accurate descriptions;
  added `loading="lazy"`, `width`/`height` (no layout jump) and responsive
  `srcset` + `sizes` thumbnails (480 px / 960 px, new `images/portfolio/thumbs/`
  folder) so the grid loads fast while the lightbox loads the full-size file.
-The Manicures/Pedicures headings are now proper `<section>`s with ids.

**Rubric check list: Part 1–3**

 *SEO:*
  added: `<meta name="keywords">`, `author`, `robots` and `referrer` tags
  to every page;
  added `robots.txt` and `sitemap.xml`; renamed gallery and updated every reference.
  
 *Forms — enquiry:*
- rewrote validation, live error messages that update as
  the visitor corrects a field, `aria-invalid`/`aria-describedby` for screen
  readers, the date picker blocks past dates and Sundays (studio is closed).
  -The submit uses `fetch()` (AJAX, no page reload) and the reply now shows an
  estimate, the 50 % deposit amount and availability for the chosen
  service/date.
  
 *Forms — contact:*
- added the phone number and "Type of message" fields the
  brief asks for, the same validation, and on a valid submit the details are
  compiled into an email addressed to the studio.
  
- *Interactive elements:*
- the enquiry page policies are now an accordion with open/close animation; added a live text search
  box to the Services page that works together with the category chips.
  
- *Services page:*
- fixed an unbalanced `</div>` and a second `data-service-grid` outside `<main>`; the three price-list/policy posters now
  sit in their own labelled section with alt text and correct proportions; added missing/incorrect `alt` text and swapped
  the Pedicure card's manicure photo for a pedicure photo.
  
 *Links:*
- WhatsApp and call links were inconsistent (`wa.me/0820951275`,
  `tel:+0820951275`, `27000000000` placeholders) — all now use
  `wa.me/27820951275` and `tel:+27820951275`.

   *About page:* 
-removed a stray image that sat outside any section above the
  page heading.
  

## References

Glamour South Africa, 2025. Nailed it: 9 local nail artists who are changing the game. [online] Available at: [Accessed 27 July 2026].
KreatedByKeora, 2026. TikTok profile. [TikTok] Available at: [Accessed 27 July 2026].
All images are taken from KreatedByKeora's main business account on Instagram <https://www.instagram.com/kreatedbykeora/> [Accessed 28 July 2026].

**Part 2 additions**

Google Fonts, 2026. Fraunces. [online] Available at: <https://fonts.google.com/specimen/Fraunces> [Accessed 10 September 2026].
Google Fonts, 2026. Manrope. [online] Available at: <https://fonts.google.com/specimen/Manrope> [Accessed 10 September 2026].
MDN Web Docs, 2026. CSS Grid Layout. [online] Available at: <https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout> [Accessed 10 September 2026].
MDN Web Docs, 2026. Using media queries. [online] Available at: <https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries> [Accessed 10 September 2026].
OpenAI, 2026. ChatGPT response to prompt regarding the changelog and what it needs to contain. [AI language model online] Available at: <https://chatgpt.com/> [Accessed 12 September 2026].

**Part 3 additions**

Tiiny Tips, 2024. How to Add JavaScript to HTML. [online] Available at: <https://www.youtube.com/watch?v=lvvXw3HncDM> [Accessed 10 October 2026].
Bro Code, 2024. JavaScript tutorial for beginners. [online] Available at: <https://youtu.be/Ihy0QziLDf0> [Accessed 10 October 2026].
Anthropic, 2026. Claude (Sonnet 5.5) response to prompts requesting a site-wide search bar, an Art Work lightbox and a review of the site against the WEDE5020 rubric. [AI language model online] Available at: <https://claude.ai/> [Accessed 22 October 2026].
MDN Web Docs, 2026. The Details disclosure element. [online] Available at: <https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details> [Accessed 17 October 2026].
MDN Web Docs, 2026. Fetch API. [online] Available at: <https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API> [Accessed 23 October 2026].
MDN Web Docs, 2026. Responsive images. [online] Available at: <https://developer.mozilla.org/en-US/docs/Web/HTML/Responsive_images> [Accessed 22 October 2026].
W3C, 2026. Modal Dialog Pattern, WAI-ARIA Authoring Practices Guide. [online] Available at: <https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/> [Accessed 22 October 2026].
Sitemaps.org, 2026. Sitemaps XML format. [online] Available at: <https://www.sitemaps.org/protocol.html> [Accessed 20 October 2026].
Google Search Central, 2026. Introduction to robots.txt. [online] Available at: <https://developers.google.com/search/docs/crawling-indexing/robots/intro> [Accessed 25 October 2026].
