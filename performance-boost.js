(function () {
  var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  var isDataSaver = Boolean(connection && (connection.saveData || /2g/.test(connection.effectiveType || '')));
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function optimizeImages() {
    var eagerCutoff = Math.max(window.innerHeight * 1.2, 900);

    document.querySelectorAll('img').forEach(function (img) {
      if (!img.hasAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }

      if (!img.hasAttribute('loading')) {
        var rect = img.getBoundingClientRect();
        var shouldLazyLoad = rect.top > eagerCutoff;
        img.setAttribute('loading', shouldLazyLoad ? 'lazy' : 'eager');
      }

      if (isDataSaver && !img.hasAttribute('fetchpriority')) {
        img.setAttribute('fetchpriority', 'low');
      }
    });
  }

  function optimizeIframes() {
    document.querySelectorAll('iframe').forEach(function (iframe) {
      if (!iframe.hasAttribute('loading')) {
        iframe.setAttribute('loading', 'lazy');
      }
      if (!iframe.hasAttribute('referrerpolicy')) {
        iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      }
    });
  }

  function optimizeVideos() {
    var videos = Array.from(document.querySelectorAll('video'));
    if (!videos.length) return;

    if (isDataSaver) {
      videos.forEach(function (video) {
        video.preload = 'none';
      });
    }

    var canAutoPause = 'IntersectionObserver' in window;
    if (!canAutoPause || reducedMotion) return;

    var videoObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var video = entry.target;
        if (entry.isIntersecting) {
          if (video.autoplay && video.paused) {
            video.play().catch(function () { });
          }
        } else if (!video.paused) {
          video.pause();
        }
      });
    }, { threshold: 0.2 });

    videos.forEach(function (video) { videoObserver.observe(video); });
  }

  function runOptimizations() {
    optimizeImages();
    optimizeIframes();
    optimizeVideos();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runOptimizations, { once: true });
  } else {
    runOptimizations();
  }
})();
