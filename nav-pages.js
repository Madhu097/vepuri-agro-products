(function () {
  const nav = document.getElementById('nav');
  const navLinks = document.getElementById('navLinks');
  const hbg = document.getElementById('hbg');

  if (!nav || !navLinks || !hbg) return;

  window.toggleNav = function toggleNav() {
    const isOpen = navLinks.classList.toggle('open');
    hbg.classList.toggle('active', isOpen);
    if (!isOpen) {
      document.querySelectorAll('.has-submenu').forEach(function (li) {
        li.classList.remove('open');
      });
    }
  };

  window.addEventListener('scroll', function () {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  function isMobileNav() {
    return window.matchMedia('(max-width: 1080px)').matches;
  }

  document.querySelectorAll('.has-submenu > a').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (!isMobileNav()) return;
      e.preventDefault();
      a.parentElement.classList.toggle('open');
    });
  });

  document.querySelectorAll('.nav-links a').forEach(function (a) {
    a.addEventListener('click', function () {
      if (isMobileNav() && a.parentElement && a.parentElement.classList.contains('has-submenu')) return;
      navLinks.classList.remove('open');
      hbg.classList.remove('active');
    });
  });
})();
