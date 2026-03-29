(function () {
  var fontHref = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700;800&display=swap';

  function injectLink(rel, href, crossOrigin) {
    var link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    if (crossOrigin) {
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  }

  function loadFonts() {
    if (document.querySelector('link[data-fonts="primary"]')) {
      return;
    }

    injectLink('preconnect', 'https://fonts.googleapis.com');
    injectLink('preconnect', 'https://fonts.gstatic.com', true);

    var fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = fontHref;
    fontLink.setAttribute('data-fonts', 'primary');
    document.head.appendChild(fontLink);
  }

  if (navigator.onLine) {
    loadFonts();
  }

  window.addEventListener('online', loadFonts, { once: true });
})();
