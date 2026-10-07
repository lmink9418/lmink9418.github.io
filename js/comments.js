(function () {
  'use strict';
  const section = document.querySelector('.lmink-comments');
  if (!section) return;
  const button = section.querySelector('[data-load-comments]');
  const status = section.querySelector('[data-comment-status]');
  const container = section.querySelector('.giscus');
  const english = document.documentElement.lang === 'en';
  const mode = () => document.documentElement.classList.contains('dark') ? 'transparent_dark' : 'light';
  window.changeGiscusTheme = function () {
    const frame = container.querySelector('iframe.giscus-frame');
    if (frame) frame.contentWindow.postMessage({ giscus: { setConfig: { theme: mode() } } }, 'https://giscus.app');
  };
  new MutationObserver(window.changeGiscusTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  function loadComments() {
    if (button.disabled) return;
    button.disabled = true;
    button.hidden = true;
    status.textContent = english ? 'Loading…' : '加载中……';
    const script = document.createElement('script');
    const attributes = {
      src: 'https://giscus.app/client.js',
      'data-repo': section.dataset.repo,
      'data-repo-id': section.dataset.repoId,
      'data-category': section.dataset.category,
      'data-category-id': section.dataset.categoryId,
      'data-mapping': 'pathname', 'data-strict': '1',
      'data-reactions-enabled': '1', 'data-emit-metadata': '0',
      'data-input-position': 'top', 'data-theme': mode(),
      'data-lang': english ? 'en' : 'zh-CN', crossorigin: 'anonymous'
    };
    Object.keys(attributes).forEach(key => script.setAttribute(key, attributes[key]));
    script.async = true;
    script.onload = function () {
      button.hidden = true;
      status.textContent = '';
    };
    script.onerror = function () {
      script.remove();
      button.disabled = false;
      button.hidden = false;
      button.textContent = english ? 'Retry' : '重试';
      status.textContent = english ? 'Unable to load. Retry or open GitHub.' : '加载失败，请重试或前往 GitHub。';
    };
    container.appendChild(script);
  }
  button.addEventListener('click', loadComments);
  if ('IntersectionObserver' in window) {
    const visibility = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        visibility.disconnect();
        loadComments();
      }
    }, { rootMargin: '200px 0px' });
    visibility.observe(section);
  } else {
    button.hidden = false;
  }
})();
