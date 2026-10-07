(function() {
  function initMenuAccessibility() {
    var copyrightYear = document.querySelector('[data-copyright-year]');
    if (copyrightYear) copyrightYear.textContent = new Date().getFullYear();
    var readingToc = document.querySelector('.lmink-reading-toc details');
    if (readingToc && window.matchMedia('(max-width: 991px)').matches) readingToc.open = false;
    var button = document.querySelector('.trm-menu-btn');
    var menu = document.querySelector('.trm-right-side');
    if (!button || !menu || button.dataset.accessibilityReady) return;
    button.dataset.accessibilityReady = 'true';

    var syncState = function() {
      var expanded = menu.classList.contains('trm-active');
      button.classList.toggle('trm-active', expanded);
      button.setAttribute('aria-expanded', String(expanded));
      var label = expanded ? '关闭导航菜单' : '打开导航菜单';
      button.setAttribute('aria-label', window.lminkI18n ? window.lminkI18n.translate(label) : label);
    };

    button.addEventListener('click', function() {
      window.requestAnimationFrame(syncState);
    });
    document.addEventListener('keydown', function(event) {
      if (event.key !== 'Escape' || !menu.classList.contains('trm-active')) return;
      button.classList.remove('trm-active');
      menu.classList.remove('trm-active');
      syncState();
      button.focus();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenuAccessibility);
  } else {
    initMenuAccessibility();
  }
})();
