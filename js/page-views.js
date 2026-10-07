(async function () {
  'use strict';
  const counter = document.querySelector('[data-page-views]');
  if (!counter || navigator.globalPrivacyControl || navigator.doNotTrack === '1') return;
  const code = counter.dataset.counterCode;
  if (!/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(code || '')) return;
  const output = counter.querySelector('[data-view-count]');
  const english = document.documentElement.lang === 'en';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 5000);
  try {
    // GoatCounter stores percent escapes in lowercase; preserve ordinary path letters.
    const path = location.pathname.replace(/%[0-9a-f]{2}/gi, value => value.toLowerCase());
    const response = await fetch('https://' + code + '.goatcounter.com/counter/' + encodeURIComponent(path) + '.json', {
      signal: controller.signal, credentials: 'omit', referrerPolicy: 'no-referrer'
    });
    if (!response.ok) throw new Error('Counter unavailable');
    const data = await response.json();
    if (typeof data.count !== 'string' || !/^\d+(?:[,.\s]\d+)*$/.test(data.count)) throw new Error('Invalid count');
    output.textContent = data.count;
    counter.title = english ? 'GoatCounter visitor count; updates may be delayed.' : 'GoatCounter 访客计数，更新可能有延迟。';
  } catch (_) {
    output.textContent = '—';
    counter.title = english ? 'Visitor count is temporarily unavailable.' : '阅读统计暂不可用。';
  } finally {
    clearTimeout(timer);
  }
})();
