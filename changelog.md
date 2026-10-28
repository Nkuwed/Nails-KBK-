K## Changelog

### Part 1 —> 12–14 August 2026

**12 August 2026**
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

**13 August 2026**
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

**14 August 2026**
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

### Part 3 — 22 October 2026 (search, lightbox and rubric review)

- **Site-wide search bar (for new `js/search.js`).**
-  Added a magnifier button to the header of all six pages. It opens a search panel under the header.
-Typing searches an index of every page, service (with prices), policy, opening hours/location/contact detail and all 20 Art_Work photos.
-Every typed word matches, and results are ranked (title →
  keywords → description, pages/services above photos), matches are
  highlighted, and the panel is keyboard friendly. Art_Work results deep-link to
  `art_work.html#art-N`, opening photos in the lightbox.

- **Art Work lightbox (new `js/lightbox.js`).**
- Every photo on `art_work.html` is now a `<button>` that opens a full-screen viewer showing the large image with its caption.
-  The viewer is **scrollable**: "Full size" shows the image at its real pixel size inside a scroll area so the visitor can scroll/drag around it in both directions; "Fit to screen"
  returns to the whole photo.
-Also added Previous/Next buttons, ← → keys,
  swipe on touch screens, Esc / × / backdrop-click to close, a "n / 20"
  counter, a keyboard focus trap, focus returned to the photo on close, and the
  page behind no longer scrolls while it is open.
- **Gallery images.** Replaced the 20 generic photos' `alt` text
  ("Nail art design", "Slight mix of colours") with accurate descriptions;
  added `loading="lazy"`, `width`/`height` (no layout jump) and responsive
  `srcset` + `sizes` thumbnails (480 px / 960 px, new `images/portfolio/thumbs/`
  folder) so the grid loads fast while the lightbox loads the full-size file.
The Manicures/Pedicures headings are now proper `<section>`s with ids.

**Rubric review — fixes made so the site meets the Part 1–3 rubric**

- *SEO:* added `<meta name="keywords">`, `author`, `robots` and `referrer` tags
  to every page; added `robots.txt` and `sitemap.xml`; renamed gallery images
  from names like `huh.jpg`, `T1.png`, `mix 3.jpg` to descriptive, hyphenated
  names (e.g. `red-grid-i-love-me-nails.jpg`) and updated every reference.
- *Forms — enquiry:* rewrote validation (name, South African phone number,
  email, service, date, message length), live error messages that update as
  the visitor corrects a field, `aria-invalid`/`aria-describedby` for screen
  readers, the date picker blocks past dates and Sundays (studio is closed),
  the submit uses `fetch()` (AJAX, no page reload) and the reply now shows an
  estimate, the 50 % deposit amount and availability for the chosen
  service/date. Removed the stray `>` from the "Reference Image" label.
- *Forms — contact:* added the phone number and "Type of message" fields the
  brief asks for, the same validation, and on a valid submit the details are
  compiled into an email addressed to the studio (`mailto:` link built in
  `main.js`, recipient set once in the `CONTACT_EMAIL` constant).
- *Interactive elements:* the enquiry page policies are now an accordion
  (`<details>`/`<summary>`) with open/close animation; added a live text search
  box to the Services page that works together with the category chips.
- *Services page:* fixed an unbalanced `</div>` and a second
  `data-service-grid` outside `<main>`; the three price-list/policy posters now
  sit in their own labelled section with alt text and correct proportions
  (they were forced to 400×400); added missing/incorrect `alt` text and swapped
  the Pedicure card's manicure photo for a pedicure photo.
- *Links:* WhatsApp and call links were inconsistent (`wa.me/0820951275`,
  `tel:+0820951275`, `27000000000` placeholders) — all now use
  `wa.me/27820951275` and `tel:+27820951275`.
- *About page:* removed a stray image that sat outside any section above the
  page heading.
- *README:* rebuilt this README (it contained duplicated sections and listed a
  `form-validation.js` file that does not exist); added student details, goals,
  features, sitemap, per-part notes, testing evidence and an updated reference
  list. The changelog is kept here and mirrored in `changelog.md` and
  `Changelog.docx`.

**Known items still to do (need the student's input)**

- Set the real studio email in `CONTACT_EMAIL` (`js/main.js`) — it is a
  placeholder (`keora@example.com`).
- Deploy on GitHub Pages/Netlify (Part 3 requirement) and, if the live address
  differs from `https://nkuwed.github.io/WEDE5020-kbk-main-PoE/KBK/`, update the
URLs in `sitemap.xml` and `robots.txt`.
- The contact page map is a single embedded Google Map (Kibler Park). The
  brief asks for more than one location — add a second real location (e.g. a
  mobile-service area or partner venue) if the studio has one.
