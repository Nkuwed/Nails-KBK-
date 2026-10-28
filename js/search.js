/* ==========================================================================
   search.js — site-wide search for KreatedByKeora
   --------------------------------------------------------------------------
   How it works
   1. SEARCH_INDEX (below) lists every searchable thing on the site: each page,
      each service, each policy and each Art Work photo.
   2. The header on every page has a magnifier button. Clicking it (or
      pressing "/") opens the search panel that sits under the header.
   3. As the visitor types, every word they typed must appear somewhere in an
      entry's title / keywords / description (AND matching). Title matches
      rank above keyword matches, which rank above description matches.
   4. Results are plain links. Enter opens the top result, the arrow keys
      move between results, and Escape closes the panel.
   Art Work results link to art_work.html#art-N — lightbox.js reads that hash
   and opens the matching photo in the lightbox straight away.
   ========================================================================== */

(function () {
  'use strict';

  /* ---- 1. The search index ---------------------------------------------
     type:     label shown on the result ("Page", "Service", ...)
     title:    result heading
     url:      where the result links to (relative, so it works on any page)
     text:     short description shown under the title
     keywords: extra words people might type that are not in title/text      */
  const SEARCH_INDEX = [
    /* Pages */
    { type: 'Page', title: 'Home', url: 'index.html',
      text: 'Nail artistry studio in Kibler Park, Johannesburg South — featured nail art and popular sets.',
      keywords: 'welcome homepage krafted keora studio book now' },
    { type: 'Page', title: 'About Keora', url: 'about.html',
      text: "Keora's journey, the studio's story, mission, vision and philosophy.",
      keywords: 'about us story journey mission vision philosophy nail technician founder who' },
    { type: 'Page', title: 'Services & Pricing', url: 'services.html',
      text: 'Indicative prices for manicures, Gel-X, nail art, overlays and pedicures.',
      keywords: 'menu price prices cost how much list treatments' },
    { type: 'Page', title: 'Book / Enquire', url: 'enquiry.html',
      text: 'Booking form — choose a service and date and get an instant estimate.',
      keywords: 'book booking appointment enquiry enquire form reserve estimate' },
    { type: 'Page', title: 'Contact', url: 'contact.html',
      text: 'Map, opening hours, WhatsApp, phone, socials and a contact form.',
      keywords: 'contact map address location directions hours whatsapp call phone email message instagram tiktok find us' },
    { type: 'Page', title: 'Art Work gallery', url: 'art_work.html',
      text: 'Gallery of manicure and pedicure designs — tap any photo to view it larger.',
      keywords: 'gallery portfolio photos pictures designs lightbox' },

    /* Services (anchors match the ids on services.html) */
    { type: 'Service', title: 'Classic Manicure — from R150', url: 'services.html#manicures',
      text: 'Shape, cuticle care and a clean polish finish.',
      keywords: 'manicure classic polish cuticle R150 natural nails' },
    { type: 'Service', title: 'Gel-X Extensions — from R350', url: 'services.html#gel-x',
      text: 'Lightweight, long-lasting length in your choice of shape.',
      keywords: 'gel x gelx extensions length shape stiletto almond coffin R350' },
    { type: 'Service', title: 'Custom Nail Art — from R450', url: 'services.html#nail-art',
      text: 'Hand-painted, jewelled or dramatic sculptural designs.',
      keywords: 'nail art custom hand painted jewelled charms chrome design R450' },
    { type: 'Service', title: 'Gel Overlay — from R250', url: 'services.html#gel-overlay',
      text: 'Strengthens and glosses your natural nail with gel.',
      keywords: 'gel overlay strengthen natural nails gloss R250' },
    { type: 'Service', title: 'Pedicure — from R200', url: 'services.html#pedicures',
      text: 'Soak, exfoliation and polish for tired feet.',
      keywords: 'pedicure feet toes toenails soak exfoliation french R200' },
    { type: 'Service', title: 'Add-on Design — from R50', url: 'services.html',
      text: 'A single accent nail or extra detail added to any set.',
      keywords: 'add on addon accent nail extra detail R50' },

    /* Policies & info */
    { type: 'Info', title: 'Deposit policy', url: 'enquiry.html#policies',
      text: 'A non-refundable deposit confirms every booking and is deducted from your final price.',
      keywords: 'deposit payment pay non-refundable confirm booking' },
    { type: 'Info', title: 'Late arrivals', url: 'enquiry.html#policies',
      text: 'Arrivals more than 15 minutes late may be asked to rebook or a late fee may apply.',
      keywords: 'late arrival fee rebook running late 15 minutes' },
    { type: 'Info', title: 'Cancellations', url: 'enquiry.html#policies',
      text: 'Cancelling less than 24 hours before your appointment forfeits the deposit.',
      keywords: 'cancel cancellation 24 hours refund forfeit reschedule' },
    { type: 'Info', title: 'Your privacy (POPIA)', url: 'enquiry.html#policies',
      text: 'Your details are only used to confirm and manage your appointment.',
      keywords: 'privacy popia data personal information protection' },
    { type: 'Info', title: 'Opening hours', url: 'contact.html',
      text: 'Monday to Saturday, 09:00 – 17:00.',
      keywords: 'hours open opening times monday saturday when' },
    { type: 'Info', title: 'Studio location — Kibler Park', url: 'contact.html',
      text: 'Kibler Park, Johannesburg South, Gauteng. Map on the contact page.',
      keywords: 'where address map directions johannesburg gauteng south africa' },
    { type: 'Info', title: 'WhatsApp & phone', url: 'contact.html',
      text: 'Message or call the studio directly to book.',
      keywords: 'whatsapp call phone number telephone message' },
    { type: 'Info', title: 'Instagram & TikTok', url: 'contact.html',
      text: 'Follow @kreatedbykeora for more designs.',
      keywords: 'instagram tiktok social media follow kreatedbykeora' },

    /* Art Work photos — the number after "art-" matches the photo's position
       in art_work.html, which is what lightbox.js looks for in the hash.     */
    { type: 'Art Work', title: 'Blue chrome almond nails', url: 'art_work.html#art-1', text: 'Manicure · blue chrome with silver French tips.', keywords: 'blue chrome almond manicure silver french' },
    { type: 'Art Work', title: 'Black bow charm nails', url: 'art_work.html#art-2', text: 'Manicure · pink base with black bow charms.', keywords: 'black bow charms bohemian boh pink manicure' },
    { type: 'Art Work', title: 'Green and gold chrome stilettos', url: 'art_work.html#art-3', text: 'Manicure · green chrome with gold detailing.', keywords: 'green gold chrome stiletto rings manicure' },
    { type: 'Art Work', title: 'Gold jewelled stilettos', url: 'art_work.html#art-4', text: 'Manicure · gold chrome with crystals and gems.', keywords: 'gold jewel jewelled gems crystals stiletto manicure' },
    { type: 'Art Work', title: 'Pink French with gold charms', url: 'art_work.html#art-5', text: 'Manicure · pink stilettos with gold charms.', keywords: 'pink french gold charms stiletto gel overlay manicure' },
    { type: 'Art Work', title: 'Red grid and "I love me" nails', url: 'art_work.html#art-6', text: 'Manicure · red grid, leopard and heart-text accents.', keywords: 'red grid leopard heart love me coffin manicure' },
    { type: 'Art Work', title: 'Gold jewel nails', url: 'art_work.html#art-7', text: 'Manicure · gold filigree with red gems.', keywords: 'gold jewel filigree red gems manicure' },
    { type: 'Art Work', title: 'Pink French charm set', url: 'art_work.html#art-8', text: 'Manicure · soft pink French with charm accents.', keywords: 'pink french charms soft manicure' },
    { type: 'Art Work', title: 'Soft pink with silver lines', url: 'art_work.html#art-9', text: 'Manicure · sheer pink with silver line art.', keywords: 'pink silver lines minimal chrome manicure' },
    { type: 'Art Work', title: 'Olive chrome almond nails', url: 'art_work.html#art-10', text: 'Manicure · olive and gold chrome with rings.', keywords: 'olive green gold chrome almond manicure' },
    { type: 'Art Work', title: 'Lime and teal gem stilettos', url: 'art_work.html#art-11', text: 'Manicure · lime green chrome with teal gems.', keywords: 'lime green teal gems silver stiletto manicure' },
    { type: 'Art Work', title: 'Burgundy French stilettos', url: 'art_work.html#art-12', text: 'Manicure · burgundy tips with silver bar detail.', keywords: 'burgundy wine red french stiletto silver manicure' },
    { type: 'Art Work', title: 'Black French mix', url: 'art_work.html#art-13', text: 'Manicure · nude set with black French tips and charms.', keywords: 'black french mix nude charms manicure' },
    { type: 'Art Work', title: 'Black and white pattern nails', url: 'art_work.html#art-14', text: 'Manicure · nude base with black and white pattern.', keywords: 'black white pattern animal print nude manicure' },
    { type: 'Art Work', title: 'Red ombré nails', url: 'art_work.html#art-15', text: 'Manicure · red and pink ombré short set.', keywords: 'red pink ombre gradient short manicure' },
    { type: 'Art Work', title: 'Classic white manicure', url: 'art_work.html#art-16', text: 'Manicure · clean milky white short nails.', keywords: 'classic white milky simple short manicure' },
    { type: 'Art Work', title: 'French pedicure — pink gloves', url: 'art_work.html#art-17', text: 'Pedicure · pink base with white French tips.', keywords: 'french pedicure toes white pink' },
    { type: 'Art Work', title: 'French pedicure — close-up', url: 'art_work.html#art-18', text: 'Pedicure · natural pink with crisp white tips.', keywords: 'french pedicure toes white natural' },
    { type: 'Art Work', title: 'French pedicure — sandals', url: 'art_work.html#art-19', text: 'Pedicure · white French tips in black sandals.', keywords: 'french pedicure toes white sandals' },
    { type: 'Art Work', title: 'French pedicure — flower sandals', url: 'art_work.html#art-20', text: 'Pedicure · white French tips with floral flip-flops.', keywords: 'french pedicure toes white flower flip flops' }
  ];

  /* ---- 2. Grab the elements added to every page's header -------------- */
  const panel   = document.querySelector('[data-search-panel]');
  const openBtn = document.querySelector('[data-search-open]');
  if (!panel || !openBtn) return;               // page has no search markup

  const input   = panel.querySelector('[data-search-input]');
  const results = panel.querySelector('[data-search-results]');
  const status  = panel.querySelector('[data-search-status]');
  const closeBtn = panel.querySelector('[data-search-close]');
  const form    = panel.querySelector('[data-search-form]');

  /* ---- 3. Helpers ------------------------------------------------------ */
  // Lower-case and strip accents so "ombre" finds "ombré".
  const normalise = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

  // Escape text before it goes into innerHTML (titles/text are ours, but the
  // highlighted query is typed by the visitor).
  const escapeHtml = (s) => s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // Wrap each searched word in <mark> inside an (already plain) string.
  function highlight(text, words) {
    let safe = escapeHtml(text);
    words.forEach((w) => {
      if (!w) return;
      const re = new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
      safe = safe.replace(re, '<mark>$1</mark>');
    });
    return safe;
  }
const TYPE_BOOST = { Page: 8, Service: 6, Info: 3 };

  // Score one entry for the typed words; 0 means "does not match".
  function score(entry, words) {
    const title = normalise(entry.title);
    const text  = normalise(entry.text);
    const keys  = normalise(entry.keywords || '');
    // Pages and services rank above photos when the match is otherwise equal.
    let total = TYPE_BOOST[entry.type] || 0;
    for (const w of words) {
      let s = 0;
      if (title.includes(w)) s += 10;
      if (keys.includes(w))  s += 5;
      if (text.includes(w))  s += 3;
      if (s === 0) return 0;                    // every word must match somewhere
      total += s;
    }
    return total;
  }

  /* ---- 4. Run a search and draw the results --------------------------- */
  function runSearch() {
    const query = input.value.trim();
    results.innerHTML = '';

    if (query.length < 2) {
      status.textContent = query ? 'Keep typing…' : 'Search services, prices, policies, art work and more.';
      return;
    }

    const words = normalise(query).split(/\s+/).filter(Boolean);
    const hits = SEARCH_INDEX
      .map((entry) => ({ entry, score: score(entry, words) }))
      .filter((h) => h.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);

    if (hits.length === 0) {
      status.textContent = 'No results for “' + query + '”. Try “gel”, “price”, “pedicure” or “deposit”.';
      return;
    }

    status.textContent = hits.length + (hits.length === 1 ? ' result' : ' results') + ' for “' + query + '”';

    hits.forEach(({ entry }) => {
      const li = document.createElement('li');
      li.innerHTML =
        '<a href="' + entry.url + '" class="search-result">' +
          '<span class="search-type">' + escapeHtml(entry.type) + '</span>' +
          '<span class="search-title">' + highlight(entry.title, words) + '</span>' +
          '<span class="search-text">' + highlight(entry.text, words) + '</span>' +
        '</a>';
      results.appendChild(li);
    });
  }


  /* ---- 5. Open / close the panel -------------------------------------- */
  function openPanel() {
    panel.hidden = false;
    openBtn.setAttribute('aria-expanded', 'true');
    input.focus();
    input.select();
    runSearch();
  }

  function closePanel() {
    panel.hidden = true;
    openBtn.setAttribute('aria-expanded', 'false');
    openBtn.focus();
  }

  openBtn.addEventListener('click', () => (panel.hidden ? openPanel() : closePanel()));
  closeBtn.addEventListener('click', closePanel);
  input.addEventListener('input', runSearch);

  // Enter in the box opens the best match instead of reloading the page.
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const first = results.querySelector('a');
    if (first) window.location.href = first.getAttribute('href');
  });

  document.addEventListener('keydown', (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);

    // "/" opens search from anywhere (unless the visitor is typing in a form).
    if (e.key === '/' && !typing && panel.hidden) {
      e.preventDefault();
      openPanel();
      return;
    }
    if (panel.hidden) return;

    if (e.key === 'Escape') {
      closePanel();
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      // Move focus through the input and the result links.
      const items = [input, ...results.querySelectorAll('a')];
      const i = items.indexOf(document.activeElement);
      if (i === -1) return;
      e.preventDefault();
      const next = e.key === 'ArrowDown' ? Math.min(i + 1, items.length - 1) : Math.max(i - 1, 0);
      items[next].focus();
    }
  });









