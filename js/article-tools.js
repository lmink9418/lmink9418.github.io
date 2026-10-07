(function() {
  'use strict';
  const header = document.querySelector('[data-article-url]');
  if (!header) return;
  const canonical = new URL(header.dataset.articleUrl);
  canonical.search = '';
  canonical.hash = '';
  const t = text => window.lminkI18n ? window.lminkI18n.translate(text) : text;
  const status = document.querySelector('.lmink-copy-status');
  function bindCopy(button, url) {
    const originalLabel = button.textContent;
    let fallback;
    button.hidden = false;
    button.addEventListener('click', async () => {
      button.disabled = true;
      button.textContent = originalLabel;
      status.textContent = '';
      fallback?.remove();
      try {
        await navigator.clipboard.writeText(url);
        status.textContent = t('链接已复制');
        button.textContent = originalLabel === '#' ? '✓' : t('已复制');
      } catch (_) {
        status.textContent = t('无法自动复制，请手动复制下方链接。');
        const input = document.createElement('input');
        input.className = 'lmink-copy-fallback';
        input.value = url;
        input.readOnly = true;
        input.setAttribute('aria-label', t('手动复制链接'));
        fallback = document.createElement('div');
        fallback.className = 'lmink-copy-fallback-container';
        const hint = document.createElement('p');
        hint.textContent = t('无法自动复制，请手动复制下方链接。');
        fallback.append(hint, input);
        button.parentElement.insertAdjacentElement('afterend', fallback);
        input.focus();
        input.select();
      } finally {
        button.disabled = false;
      }
    });
  }
  bindCopy(document.querySelector('.lmink-copy-article'), canonical.href);
  document.querySelectorAll('#article-container h2[id], #article-container h3[id]').forEach(heading => {
    const url = new URL(canonical.href);
    url.hash = encodeURIComponent(heading.id);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'lmink-copy-section';
    button.textContent = '#';
    button.setAttribute('aria-label', t('复制章节链接') + '：' + heading.textContent.trim());
    button.title = t('复制章节链接');
    bindCopy(button, url.href);
    heading.appendChild(button);
  });
})();
