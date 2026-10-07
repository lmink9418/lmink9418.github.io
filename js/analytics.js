(function () {
  'use strict';
  const config = document.currentScript.dataset;
  if (location.origin !== config.siteOrigin || window.goatcounter || navigator.globalPrivacyControl || navigator.doNotTrack === '1') return;
  if (!/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(config.counterCode || '')) return;
  // Query strings may contain search text; language variants share one path.
  window.goatcounter = { path: location.pathname, title: document.title, no_onload: true, no_events: true };
  const script = document.createElement('script');
  script.src = 'https://gc.zgo.at/count.js';
  script.async = true;
  script.dataset.goatcounter = 'https://' + config.counterCode + '.goatcounter.com/count';
  script.onload = function () {
    const counter = window.goatcounter;
    if (typeof counter.get_data !== 'function' || typeof counter.count !== 'function') return;
    const getData = counter.get_data;
    counter.get_data = function (vars) {
      const data = getData.call(counter, vars);
      delete data.q;
      return data;
    };
    counter.count();
  };
  document.head.appendChild(script);
})();
