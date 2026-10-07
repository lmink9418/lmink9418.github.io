(function() {
  const root = document.querySelector('[data-lmink-search]');
  if (!root) return;
  const input = root.querySelector('input');
  const results = root.querySelector('.lmink-search-results');
  const status = root.querySelector('[role="status"]');
  const panel = root.querySelector('[data-search-panel]');
  const feed = root.querySelector('[data-search-feed]');
  let indexPromise;
  let revision = 0;
  const t = text => window.lminkI18n ? window.lminkI18n.translate(text) : text;

  function loadIndex() {
    if (!indexPromise) {
      indexPromise = fetch('/search.json').then(response => {
        if (!response.ok) throw new Error('Search index unavailable');
        return response.json();
      }).catch(error => {
        indexPromise = null;
        throw error;
      });
    }
    return indexPromise;
  }

  async function search() {
    const current = ++revision;
    const terms = input.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    results.replaceChildren();
    if (panel) panel.hidden = !terms.length;
    if (feed) feed.hidden = !!terms.length;
    if (!terms.length) {
      status.textContent = t('输入关键词开始搜索。');
      return;
    }
    status.textContent = t('正在搜索……');
    try {
      const posts = await loadIndex();
      if (current !== revision) return;
      const matches = posts.map(post => {
        const title = post.title.toLocaleLowerCase();
        const tags = post.tags.join(' ').toLocaleLowerCase();
        const text = [title, tags, post.summary, post.content].join(' ').toLocaleLowerCase();
        const score = terms.reduce((sum, term) => sum + (title.includes(term) ? 4 : tags.includes(term) ? 2 : 1), 0);
        return { post, score, match: terms.every(term => text.includes(term)) };
      }).filter(item => item.match).sort((a, b) => b.score - a.score);
      status.textContent = t(matches.length ? `找到 ${matches.length} 篇文章。` : '没有找到匹配文章，试试其他关键词。');
      for (const { post } of matches) {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = post.url;
        if (window.lminkI18n?.language === 'en') link.search = '?lang=en';
        link.textContent = post.title;
        const summary = document.createElement('p');
        summary.textContent = post.summary;
        item.append(link, summary);
        results.append(item);
      }
    } catch (error) {
      if (current === revision) status.textContent = t('搜索暂时不可用，请点击「搜索」重试。');
    }
  }

  root.querySelector('form').addEventListener('submit', event => {
    event.preventDefault();
    search();
  });
  input.addEventListener('input', search);
})();
