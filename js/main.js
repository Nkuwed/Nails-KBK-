



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
