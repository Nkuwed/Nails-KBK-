



document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile nav drawer ---- */
  const drawer = document.querySelector('[data-drawer]');
  const openBtn = document.querySelector('[data-menu-open]');
  const closeBtn = document.querySelector('[data-menu-close]');

  if (drawer && openBtn) {
    const openDrawer = () => {
      drawer.classList.add('is-open');
      openBtn.setAttribute('aria-expanded', 'true');
    };
    const closeDrawer = () => {
      drawer.classList.remove('is-open');
      openBtn.setAttribute('aria-expanded', 'false');
    };

    openBtn.addEventListener('click', openDrawer);
    closeBtn?.addEventListener('click', closeDrawer);
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) closeDrawer();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDrawer();
    });
  }


  /* ---- Services filter (services.html) ---- */
  const filterRow = document.querySelector('[data-filter-row]');
  const serviceGrid = document.querySelector('[data-service-grid]');
  const emptyState = document.getElementById('empty-state');

  if (filterRow && serviceGrid) {
    const cards = serviceGrid.querySelectorAll('.service-card');

    filterRow.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-filter]');
      if (!btn) return;

      filterRow.querySelectorAll('.chip').forEach((chip) => chip.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      let visibleCount = 0;

      cards.forEach((card) => {
        const match = filter === 'all' || card.getAttribute('data-category') === filter;
        card.toggleAttribute('data-hidden-by-chip', !match);
        card.style.display = (match && !card.hasAttribute('data-hidden-by-text')) ? '' : 'none';
        if (card.style.display !== 'none') visibleCount += 1;
      });

      if (emptyState) {
        emptyState.classList.toggle('is-visible', visibleCount === 0);
      }
    });
  }

  /* ====================================================================
     SERVICES: live text search (combines with the category chips above)
     ==================================================================== */
  const serviceSearch = document.querySelector('[data-service-search]');
  if (serviceSearch && serviceGrid) {
    const cards = serviceGrid.querySelectorAll('.service-card');
    const applyServiceSearch = () => {
      const q = serviceSearch.value.trim().toLowerCase();
      let shown = 0;
      cards.forEach((card) => {
        // chip filter hides cards with data-hidden-by-chip; text search hides with data-hidden-by-text
        const match = q === '' || card.textContent.toLowerCase().includes(q);
        card.toggleAttribute('data-hidden-by-text', !match);
        card.style.display = (match && !card.hasAttribute('data-hidden-by-chip')) ? '' : 'none';
        if (card.style.display !== 'none') shown += 1;
      });
      if (emptyState) emptyState.classList.toggle('is-visible', shown === 0);
    };
    serviceSearch.addEventListener('input', applyServiceSearch);
    // let the chip filter know about the text filter
    filterRow?.addEventListener('click', () => setTimeout(applyServiceSearch, 0));
  }

  /* ====================================================================
     FORMS (enquiry.html + contact.html)
     --------------------------------------------------------------------
     1. Client-side validation — every field is checked before submit and
        an error message is shown under any field that is wrong. Fields are
        re-checked as the visitor fixes them.
     2. Rules are chosen per field with data-rule="..." in the HTML.
     3. Submit is handled with fetch() (AJAX), so the page never reloads.
        - enquiry: the answer (estimate, deposit, availability) is worked
          out from the chosen service and date and shown on the page.
        - contact: the details are compiled into an email addressed to
          CONTACT_EMAIL, which the visitor sends from their email app.
     ==================================================================== */

  // The studio's email address. Change it here and both the contact form
  // and the "email instead" link pick it up.
  const CONTACT_EMAIL = 'keora@example.com';

  // Prices come from services.html ("from" prices, in rand).
  const SERVICE_PRICES = {
    'classic-manicure': { name: 'Classic Manicure', from: 150 },
    'gel-x':            { name: 'Gel-X Extensions', from: 350 },
    'custom-nail-art':  { name: 'Custom Nail Art',  from: 450 },
    'gel-overlay':      { name: 'Gel Overlay',      from: 250 },
    'pedicure':         { name: 'Pedicure',         from: 200 },
    'not-sure':         { name: 'a service to be confirmed', from: null }
  };

