(function () {
  var fontHref = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Outfit:wght@300;400;500;600;700&family=Spectral:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap';

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
