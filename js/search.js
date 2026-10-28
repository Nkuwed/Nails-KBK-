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




