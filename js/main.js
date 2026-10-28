



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

