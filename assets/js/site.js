/*
  irccf.org site script: year, theme switch, cookie consent + GA4, menu.
  Shared by index.html, privacy.html and 404.html; every block tolerates
  missing elements. Loaded with `defer` from /assets/js/site.js?v=N.
  When you change this file, bump ?v= in all three pages (assets are cached).
*/
(function () {
  var root = document.documentElement;

  /* Current year */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* Theme */
  var toggle = document.querySelector('.theme-toggle');
  var metaTheme = document.querySelector('meta[name="theme-color"]');
  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    if (toggle) toggle.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    if (metaTheme) metaTheme.setAttribute('content', t === 'dark' ? '#0f0f10' : '#ffffff');
  }
  applyTheme(root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
  if (toggle) toggle.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('irccf-theme', next); } catch (e) {}
    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!document.startViewTransition || reduce) { applyTheme(next); return; }
    /* New theme spreads out in a circle from the switch */
    var r = toggle.getBoundingClientRect();
    var x = r.left + r.width / 2, y = r.top + r.height / 2;
    var radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    var vt = document.startViewTransition(function () { applyTheme(next); });
    vt.ready.then(function () {
      root.animate(
        { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + radius + 'px at ' + x + 'px ' + y + 'px)'] },
        { duration: 480, easing: 'cubic-bezier(0.23, 1, 0.32, 1)', pseudoElement: '::view-transition-new(root)' }
      );
    }).catch(function () {});
  });
  if (window.matchMedia) {
    var mq = matchMedia('(prefers-color-scheme: dark)');
    var onSystem = function (e) {
      var stored = null;
      try { stored = localStorage.getItem('irccf-theme'); } catch (err) {}
      if (!stored) applyTheme(e.matches ? 'dark' : 'light');
    };
    if (mq.addEventListener) mq.addEventListener('change', onSystem);
  }

  /* Cookie consent + Google Analytics 4 (loads only after "Accept") */
  var GA_ID = 'G-6512PHVSLV';
  var KEY = 'irccf-consent';
  var consentBox = document.getElementById('consent');
  function readConsent() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function saveConsent(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  var gaLoaded = false;
  function loadGA() {
    if (gaLoaded || !GA_ID) return;
    gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    gtag('js', new Date());
    gtag('config', GA_ID);
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }
  function clearGACookies() {
    var host = location.hostname.replace(/^www\./, '');
    document.cookie.split(';').forEach(function (c) {
      var name = c.split('=')[0].trim();
      if (name === '_ga' || name.indexOf('_ga_') === 0) {
        ['', '; domain=' + host, '; domain=.' + host].forEach(function (d) {
          document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + d;
        });
      }
    });
  }
  function showConsent() {
    if (!consentBox) return;
    requestAnimationFrame(function () { consentBox.setAttribute('data-show', ''); });
  }
  function hideConsent() { if (consentBox) consentBox.removeAttribute('data-show'); }
  if (consentBox) consentBox.querySelectorAll('[data-consent]').forEach(function (b) {
    b.addEventListener('click', function () {
      var v = b.getAttribute('data-consent');
      saveConsent(v);
      hideConsent();
      if (v === 'granted') {
        loadGA();
      } else {
        if (window.gtag) gtag('consent', 'update', { analytics_storage: 'denied' });
        window['ga-disable-' + GA_ID] = true;
        clearGACookies();
      }
    });
  });
  document.querySelectorAll('[data-consent-open]').forEach(function (b) {
    b.addEventListener('click', showConsent);
  });
  var stored = readConsent();
  if (stored === 'granted') loadGA();
  else if (stored !== 'denied') setTimeout(showConsent, 900);

  /* Menu */
  var btn = document.querySelector('.menu-btn');
  var menu = document.getElementById('site-menu');
  if (!btn || !menu) return;
  var links = menu.querySelectorAll('a');
  function setOpen(open, focusTrigger) {
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (open) {
      menu.setAttribute('data-open', '');
      links[0].focus({ preventScroll: true });
    } else {
      menu.removeAttribute('data-open');
      if (focusTrigger) btn.focus();
    }
  }
  btn.addEventListener('click', function () { setOpen(btn.getAttribute('aria-expanded') !== 'true', false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.hasAttribute('data-open')) setOpen(false, true);
  });
  document.addEventListener('pointerdown', function (e) {
    if (menu.hasAttribute('data-open') && !menu.contains(e.target) && !btn.contains(e.target)) setOpen(false, false);
  });
  menu.addEventListener('focusout', function (e) {
    if (menu.hasAttribute('data-open') && e.relatedTarget && !menu.contains(e.relatedTarget) && e.relatedTarget !== btn) setOpen(false, false);
  });
  links.forEach(function (a) { a.addEventListener('click', function () { setOpen(false, false); }); });
})();
  
