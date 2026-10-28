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

