(function() {
  if (window.innerWidth < 1920 || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
  var preference;
  try { preference = localStorage.getItem('lmink-live2d'); } catch (_) {}
  var override = new URLSearchParams(location.search).get('live2d');
  var enabled = (override === 'on' || override === 'off' ? override : preference) !== 'off';
  var toggle = document.querySelector('.lmink-live2d-toggle');
  if (toggle) {
    toggle.hidden = false;
    toggle.setAttribute('aria-pressed', String(enabled));
    var label = enabled ? '关闭看板娘' : '开启看板娘';
    toggle.textContent = window.lminkI18n ? window.lminkI18n.translate(label) : label;
    toggle.addEventListener('click', function() {
      var next = enabled ? 'off' : 'on';
      try { localStorage.setItem('lmink-live2d', next); } catch (_) {}
      var url = new URL(location.href);
      url.searchParams.set('live2d', next);
      location.assign(url.href);
    });
  }
  if (!enabled) return;
  var loaded = false;
  var load = function() {
    if (loaded) return;
    loaded = true;
    var s = document.createElement('script');
    s.src = '/live2dw/lib/L2Dwidget.min.js?094cbace49a39548bed64abff5988b05';
    s.onload = function() {
      L2Dwidget.init({
        pluginRootPath: 'live2dw/',
        pluginJsPath: 'lib/',
        pluginModelPath: 'assets/',
        tagMode: false,
        debug: false,
        model: { jsonPath: '/live2dw/assets/assets/asuna_04.model.json' },
        display: {
          position: 'right',
          width: 230,
          height: 460,
          hOffset: 10,
          vOffset: -20
        },
        log: false,
        mobile: { show: false }
      });
      var markDecorative = function() {
        var widget = document.getElementById('live2d-widget');
        if (!widget) return false;
        widget.setAttribute('aria-hidden', 'true');
        return true;
      };
      if (!markDecorative()) {
        var observer = new MutationObserver(function() {
          if (markDecorative()) observer.disconnect();
        });
        observer.observe(document.body, { childList: true, subtree: true });
      }
    };
    document.body.appendChild(s);
  };
  load();
})();
