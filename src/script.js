// ============================================================
// LAW-CARE BD — script.js
// Language toggle, mobile nav, scroll-reveal, hero entrance
// BUILD_SPEC.md §5, §6, §9
// ============================================================

(function () {
  'use strict';

  /* ── Constants ────────────────────────────────────────────── */
  var LS_KEY      = 'law-care-lang';
  var DEFAULT_LANG = 'bn';

  /* ── Language helpers ─────────────────────────────────────── */
  function getLang() {
    return localStorage.getItem(LS_KEY) || DEFAULT_LANG;
  }

  /**
   * Apply a language to <html lang=""> and sync toggle buttons.
   * Does NOT do any fading — call via switchLang() for the
   * cross-fade, or directly for the silent initial set.
   */
  function applyLang(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem(LS_KEY, lang);

    // Sync all toggle buttons on this page
    document.querySelectorAll('.lang-toggle button').forEach(function (btn) {
      var active = btn.dataset.lang === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  /**
   * Cross-fade switch: fade out main content, swap lang, fade back.
   * ~150 ms total per §5.3.
   */
  function switchLang(lang) {
    if (document.documentElement.lang === lang) return;

    // Prefer reduced-motion? Skip the fade entirely.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      applyLang(lang);
      return;
    }

    var targets = document.querySelectorAll('main, header.page-header, .hero-content, .nav-links, .nav-drawer, .site-footer');
    targets.forEach(function (el) {
      el.style.transition = 'opacity 120ms ease';
      el.style.opacity    = '0';
    });

    setTimeout(function () {
      applyLang(lang);
      targets.forEach(function (el) {
        el.style.opacity = '';
      });
      // Clean up inline transitions after animation completes
      setTimeout(function () {
        targets.forEach(function (el) {
          el.style.transition = '';
        });
      }, 160);
    }, 120);
  }

  /* ── Wire language toggle buttons ────────────────────────── */
  document.querySelectorAll('.lang-toggle button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      switchLang(btn.dataset.lang);
    });
  });

  /* ── Apply saved language on every page load ─────────────── */
  applyLang(getLang());

  /* ── Mobile Nav ───────────────────────────────────────────── */
  var hamburger = document.getElementById('nav-hamburger');
  var drawer    = document.getElementById('nav-drawer');

  if (hamburger && drawer) {
    function openDrawer() {
      drawer.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }

    hamburger.addEventListener('click', function () {
      if (drawer.classList.contains('open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    // Close when any drawer link is followed
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });

    // Close on outside click / tap
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !drawer.contains(e.target)) {
        closeDrawer();
      }
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });
  }

  /* ── Hero Entrance (fires once on DOMContentLoaded) ──────── */
  document.addEventListener('DOMContentLoaded', function () {
    var heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    // Small delay so the browser has painted the page first
    setTimeout(function () {
      heroContent.classList.add('animated');
    }, 80);
  });

  /* ── Scroll Reveal (IntersectionObserver) ────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    // Skip entirely for users who prefer reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Make all reveal elements immediately visible
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    if (!('IntersectionObserver' in window)) {
      // Fallback: just show everything
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // fire once, never re-trigger
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  });

  /* ── Active nav link (marks current page) ────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    var path = window.location.pathname;
    var page = path.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href) return;

      // Normalize: both empty string and 'index.html' mean the homepage
      var linkPage = href.split('/').pop() || 'index.html';
      if (linkPage === page || (page === '' && linkPage === 'index.html')) {
        link.setAttribute('aria-current', 'page');
      }
    });
  });

})();
