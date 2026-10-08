(function() {
  function initPasswordVisibility() {
    var input = document.querySelector('#hbePass');
    if (!input || document.querySelector('.lmink-password-toggle')) return;
    var wrapper = document.createElement('div');
    wrapper.className = 'lmink-password-field';
    input.parentNode.insertBefore(wrapper, input);
    wrapper.appendChild(input);
    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'lmink-password-toggle';
    toggle.setAttribute('aria-controls', input.id);
    var translate = function(text) {
      return window.lminkI18n ? window.lminkI18n.translate(text) : text;
    };
    toggle.setAttribute('aria-label', translate('显示密码'));
    var setVisible = function(visible) {
      input.type = visible ? 'text' : 'password';
      toggle.textContent = translate(visible ? '隐藏' : '显示');
      toggle.setAttribute('aria-pressed', String(visible));
    };
    setVisible(false);
    toggle.addEventListener('click', function() {
      if (!input.disabled) setVisible(input.type === 'password');
    });
    input.form.addEventListener('submit', function() { setVisible(false); });
    wrapper.appendChild(toggle);
  }

  function initMenuAccessibility() {
    initPasswordVisibility();
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
