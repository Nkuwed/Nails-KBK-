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


