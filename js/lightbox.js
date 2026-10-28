/* ==========================================================================
   lightbox.js — gallery lightbox for art_work.html
   --------------------------------------------------------------------------
   * Every gallery photo is a <button data-lightbox-item> wrapping the <img>.
     The button's data-full attribute points at the full-size file and
     data-caption holds the description.
   * Clicking a photo opens a full-screen overlay showing the large image.
   * The overlay stage is SCROLLABLE: the photo opens "fit to screen" and a
     click / tap (or the zoom button) switches it to full size, which the
     visitor can scroll around in both directions.
   * Previous / Next buttons, the arrow keys and a left/right swipe move
     through the photos; Escape or the × button closes the overlay.
   * Opening art_work.html#art-N (from the site search) opens photo N.
   * Focus is moved into the overlay when it opens, kept inside while it is
     open (Tab trap), and returned to the photo that opened it when it closes.
   ========================================================================== */

(function () {
  'use strict';

  const items = Array.from(document.querySelectorAll('[data-lightbox-item]'));
  if (items.length === 0) return;               // not the Art Work page

  /* ---- 1. Build the overlay once and add it to the page --------------- */
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.hidden = true;
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Art work viewer');
  box.innerHTML =
    '<div class="lightbox-bar">' +
      '<span class="lightbox-count" aria-live="polite"></span>' +
      '<div class="lightbox-tools">' +
        '<button type="button" class="lightbox-btn" data-lb-zoom aria-pressed="false">Full size</button>' +
        '<button type="button" class="lightbox-btn lightbox-close" data-lb-close aria-label="Close viewer">&times;</button>' +
      '</div>' +
    '</div>' +
    '<div class="lightbox-stage" data-lb-stage tabindex="0">' +
      '<img class="lightbox-img" alt="">' +
    '</div>' +
    '<p class="lightbox-caption"></p>' +
    '<button type="button" class="lightbox-nav lightbox-prev" data-lb-prev aria-label="Previous photo">&#8249;</button>' +
    '<button type="button" class="lightbox-nav lightbox-next" data-lb-next aria-label="Next photo">&#8250;</button>';
  document.body.appendChild(box);

  const stage   = box.querySelector('[data-lb-stage]');
  const img     = box.querySelector('.lightbox-img');
  const caption = box.querySelector('.lightbox-caption');
  const count   = box.querySelector('.lightbox-count');
  const zoomBtn = box.querySelector('[data-lb-zoom]');

  let current = 0;          // index of the photo being shown
  let lastFocus = null;     // element to give focus back to on close

  /* ---- 2. Show photo number i ---------------------------------------- */
  function show(i) {
    current = (i + items.length) % items.length;   // wrap around both ends
    const btn = items[current];
    const thumb = btn.querySelector('img');

    setZoom(false);                                 // every photo opens "fit"
    stage.scrollTo(0, 0);
    img.src = btn.dataset.full || thumb.src;
    img.alt = thumb.alt;
    caption.textContent = btn.dataset.caption || thumb.alt;
    count.textContent = (current + 1) + ' / ' + items.length;
  }

  /* ---- 3. Zoom: fit-to-screen <-> full size (scrollable) -------------- */
  function setZoom(on) {
    box.classList.toggle('is-zoomed', on);
    zoomBtn.setAttribute('aria-pressed', String(on));
    zoomBtn.textContent = on ? 'Fit to screen' : 'Full size';
    if (on) {
      // Start in the middle of the big image rather than the top-left corner.
      requestAnimationFrame(() => {
        stage.scrollLeft = (stage.scrollWidth - stage.clientWidth) / 2;
        stage.scrollTop  = (stage.scrollHeight - stage.clientHeight) / 2;
      });
    }
  }

  /* ---- 4. Open / close ------------------------------------------------ */
  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    box.hidden = false;
    document.body.classList.add('lightbox-open');   // stops the page scrolling behind
    box.querySelector('[data-lb-close]').focus();
    // keep the address bar in step so a photo can be shared/bookmarked
    history.replaceState(null, '', '#art-' + (current + 1));
  }

  function close() {
    box.hidden = true;
    document.body.classList.remove('lightbox-open');
    img.removeAttribute('src');
    history.replaceState(null, '', window.location.pathname + window.location.search);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  const step = (d) => { show(current + d); history.replaceState(null, '', '#art-' + (current + 1)); };

  /* ---- 5. Wire up the controls --------------------------------------- */
  items.forEach((btn, i) => btn.addEventListener('click', () => open(i)));

  box.querySelector('[data-lb-close]').addEventListener('click', close);
  box.querySelector('[data-lb-prev]').addEventListener('click', () => step(-1));
  box.querySelector('[data-lb-next]').addEventListener('click', () => step(1));
  zoomBtn.addEventListener('click', () => setZoom(!box.classList.contains('is-zoomed')));
  img.addEventListener('click', () => setZoom(!box.classList.contains('is-zoomed')));

  // Click on the dark backdrop (not the photo) closes the viewer.
  stage.addEventListener('click', (e) => { if (e.target === stage) close(); });

  document.addEventListener('keydown', (e) => {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft')  { e.preventDefault(); step(-1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
    else if (e.key === 'Tab') {
      // Focus trap: Tab cycles through the overlay's own controls only.
      const focusables = box.querySelectorAll('button, [tabindex="0"]');
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
