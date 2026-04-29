// -- LOADER --
const loaderEl = document.getElementById('loader');
function hideLoader() {
  if (!loaderEl) return;
  loaderEl.classList.add('gone');
  document.body.classList.add('hero-ready');
  // Keep vertical scrolling enabled even if any future style changes attempt to lock it.
  document.body.style.overflowY = 'auto';
}
window.addEventListener('load', () => setTimeout(hideLoader, 220));
// Fallback: never let loader block interaction for too long.
window.addEventListener('DOMContentLoaded', () => setTimeout(hideLoader, 900));
window.addEventListener('pageshow', hideLoader);

const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
const saveDataMode = Boolean(conn && (conn.saveData || /2g/.test(conn.effectiveType || '')));

function scrollToSection(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function initHeroVideoPlayback() {
  const heroVideo = document.querySelector('.hero-bg-video');
  if (!heroVideo) return;

  if (reduceMotionQuery.matches || saveDataMode) {
    heroVideo.pause();
    return;
  }

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        heroVideo.play().catch(() => { });
      } else {
        heroVideo.pause();
      }
    });
  }, { threshold: 0.2 });

  obs.observe(heroVideo);
}

initHeroVideoPlayback();

// -- HERO CARD INTERACTION --
const heroCardEl = document.querySelector('.hero-card.hero-tilt');
if (heroCardEl && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  heroCardEl.addEventListener('pointermove', (event) => {
    const rect = heroCardEl.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rx = (0.5 - y) * 2.6;
    const ry = (x - 0.5) * 3.6;
    heroCardEl.style.transform = `perspective(1100px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    heroCardEl.style.setProperty('--hero-card-x', `${(x * 100).toFixed(2)}%`);
    heroCardEl.style.setProperty('--hero-card-y', `${(y * 100).toFixed(2)}%`);
  });

  heroCardEl.addEventListener('pointerleave', () => {
    heroCardEl.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg)';
  });
}

function animateHeroCounters() {
  const counters = Array.from(document.querySelectorAll('.hs-num[data-hero-target]'));
  if (!counters.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const run = () => {
    counters.forEach(counter => {
      const target = Number(counter.dataset.heroTarget || 0);
      const valueEl = counter.querySelector('.hs-val');
      if (!valueEl || !Number.isFinite(target)) return;
      if (reduceMotion) {
        valueEl.textContent = String(target);
        return;
      }

      const duration = 1200;
      const start = performance.now();
      const from = 0;
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.round(from + (target - from) * eased);
        valueEl.textContent = String(val);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  };

  const hero = document.getElementById('hero');
  if (!hero) {
    run();
    return;
  }

  const io = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting) return;
    run();
    io.disconnect();
  }, { threshold: 0.4 });

  io.observe(hero);
}

animateHeroCounters();

// -- LIVE COCONUT COUNTERS --
(function initLiveCounters() {
  const dailyEl = document.getElementById('liveDailyCount');
  const totalEl = document.getElementById('liveTotalCount');
  if (!dailyEl || !totalEl) return;

  const DAILY_TARGET = 17000;
  const BASE_TOTAL = 25000000; // 2.5 Crore — existing historical total
  const START_DATE = new Date(2026, 3, 25); // April 25, 2026 (month is 0-indexed)
  const SECONDS_IN_DAY = 86400;

  function secondsSinceMidnight() {
    const now = new Date();
    return now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  }

  function daysSinceStart() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diff = today - START_DATE;
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  }

  function formatIndian(n) {
    n = Math.floor(n);
    const s = n.toString();
    if (s.length <= 3) return s;
    let last3 = s.slice(-3);
    let rest = s.slice(0, -3);
    rest = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
    return rest + ',' + last3;
  }

  function updateCounters() {
    const elapsed = secondsSinceMidnight();
    const dailyCount = Math.floor((elapsed / SECONDS_IN_DAY) * DAILY_TARGET);
    const completedDays = daysSinceStart();
    const currentTotal = BASE_TOTAL + (completedDays * DAILY_TARGET) + dailyCount;

    dailyEl.textContent = formatIndian(dailyCount);
    totalEl.textContent = formatIndian(currentTotal);
  }

  let counterTimer = null;
  function startCounterLoop() {
    const intervalMs = document.hidden ? 5000 : 1000;
    if (counterTimer) clearInterval(counterTimer);
    counterTimer = setInterval(updateCounters, intervalMs);
  }

  updateCounters();
  startCounterLoop();
  document.addEventListener('visibilitychange', startCounterLoop);
})();

// -- NAV --
window.addEventListener('scroll', () => {
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });
function toggleNav() {
  const navLinks = document.getElementById('navLinks');
  const isOpen = navLinks.classList.toggle('open');
  document.getElementById('hbg').classList.toggle('active', isOpen);
  if (!isOpen) document.querySelectorAll('.has-submenu').forEach(li => li.classList.remove('open'));
}

function isMobileNav() {
  return window.matchMedia('(max-width: 1080px)').matches;
}

document.querySelectorAll('.has-submenu > a').forEach(a => {
  a.addEventListener('click', e => {
    if (!isMobileNav()) return;
    e.preventDefault();
    a.parentElement.classList.toggle('open');
  });
});

document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
  if (isMobileNav() && a.parentElement && a.parentElement.classList.contains('has-submenu')) return;
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('hbg').classList.remove('active');
}));

function applyProductImagesFromConfig() {
  const imageMap = window.PRODUCT_IMAGE_MAP || {};
  document.querySelectorAll('.pc-link[data-product-key]').forEach(link => {
    const key = link.getAttribute('data-product-key');
    const image = imageMap[key];
    const imgEl = link.querySelector('.pc-img img');
    if (!image || !imgEl) return;
    imgEl.src = image.src;
    imgEl.alt = image.alt || imgEl.alt;
    imgEl.style.objectFit = image.fit || 'cover';
    imgEl.style.objectPosition = image.position || 'center center';
  });
}

applyProductImagesFromConfig();

function initInteractiveProductCards() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (reduceMotion || !canHover) return;

  document.querySelectorAll('.pc').forEach(card => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const px = x / rect.width;
      const py = y / rect.height;
      const rx = (0.5 - py) * 7;
      const ry = (px - 0.5) * 9;

      card.style.setProperty('--pc-rx', `${rx.toFixed(2)}deg`);
      card.style.setProperty('--pc-ry', `${ry.toFixed(2)}deg`);
      card.style.setProperty('--pc-gx', `${(px * 100).toFixed(2)}%`);
      card.style.setProperty('--pc-gy', `${(py * 100).toFixed(2)}%`);
      card.style.setProperty('--pc-glare', '1');
    });

    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--pc-rx', '0deg');
      card.style.setProperty('--pc-ry', '0deg');
      card.style.setProperty('--pc-gx', '50%');
      card.style.setProperty('--pc-gy', '50%');
      card.style.setProperty('--pc-glare', '0');
    });
  });
}

initInteractiveProductCards();

// -- SCROLL REVEAL (IntersectionObserver -- no JS on scroll) --
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); ro.unobserve(e.target); } });
}, { threshold: 0.1 });
document.querySelectorAll('.rv,.rvl,.rvr').forEach(el => ro.observe(el));

// -- COUNTER ANIMATION --
const co = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '+';
    const decimal = parseInt(el.dataset.decimal) || 0;

    let v = 0;
    const duration = 2000; // 2 seconds
    const start = performance.now();

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic

      const current = v + (target - v) * eased;
      el.textContent = current.toFixed(decimal) + suffix;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
    co.unobserve(el);
  });
}, { threshold: 0.2 });
document.querySelectorAll('[data-target]').forEach(el => co.observe(el));

// -- FRESH AGRICULTURAL CANVAS (Agriculture/Coconut Theme) --
const canvas = document.getElementById('sphCanvas');
const ctx = canvas.getContext('2d');
let W, H, cx, cy, time = 0;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function resize() {
  W = canvas.width = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
  cx = W / 2;
  cy = H / 2;
}
resize();
window.addEventListener('resize', resize, { passive: true });

// Agricultural Color Palettes (Greens, Creams, Soft Whites)
const colors = ['#96AC38', '#D7D5CE', '#FFFFFF', '#606C38'];

const particles = Array.from({ length: prefersReducedMotion ? 70 : 130 }, () => ({
  x: Math.random(),
  y: Math.random(),
  size: 0.3 + Math.random() * 1.8,
  speed: 0.00015 + Math.random() * 0.0008,
  opacity: 0.1 + Math.random() * 0.8,
  drift: (Math.random() - 0.5) * 0.00015,
  pulse: Math.random() * Math.PI * 2,
  pulseSpeed: 0.01 + Math.random() * 0.02,
  color: colors[Math.floor(Math.random() * colors.length)]
}));

let canvasVisible = false;
const observer = new IntersectionObserver(entries => {
  canvasVisible = entries[0].isIntersecting;
  if (canvasVisible && !document.hidden) {
    startCanvasLoop();
  } else {
    stopCanvasLoop();
  }
}, { threshold: 0.1 });
observer.observe(canvas);

let rafId = null;
let lastFrameTime = 0;
const frameInterval = prefersReducedMotion ? 100 : 33;

function draw(ts) {
  if (!canvasVisible || document.hidden) {
    rafId = null;
    return;
  }

  if (ts - lastFrameTime < frameInterval) {
    rafId = requestAnimationFrame(draw);
    return;
  }

  lastFrameTime = ts;

  time = ts / 1000;
  ctx.clearRect(0, 0, W, H);

  // 1. Draw Morning Sun (Agriculture Spotlight)
  const sunX = cx;
  const sunY = -80;

  // Sun Core
  const sunCore = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 200);
  sunCore.addColorStop(0, 'rgba(255, 255, 240, 0.45)'); // Soft morning sun
  sunCore.addColorStop(0.3, 'rgba(150, 172, 56, 0.12)'); // Hint of green in the scatter
  sunCore.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = sunCore;
  ctx.fillRect(0, 0, W, H);

  // Natural Light Scatter
  const flare = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, H * 1.5);
  flare.addColorStop(0, 'rgba(150, 172, 56, 0.25)'); // Organic green scatter
  flare.addColorStop(0.4, 'rgba(96, 108, 56, 0.04)');
  flare.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = flare;
  ctx.fillRect(0, 0, W, H);

  // 2. Cinematic Organic Particles (Pollen/Spores/Life)
  particles.forEach((p, idx) => {
    // Gentle upward drifting
    p.y -= p.speed;
    p.x += p.drift;

    // Bounds wrap
    if (p.y < -0.05) { p.y = 1.05; p.x = Math.random(); }
    if (p.x < -0.05) p.x = 1.05;
    if (p.x > 1.05) p.x = -0.05;

    const x = p.x * W;
    const y = p.y * H;

    // Smooth shimmering
    const shimmer = 0.5 + Math.sin(time * 2 + p.pulse) * 0.5;
    const finalOpacity = p.opacity * (0.3 + shimmer * 0.7);

    // Soft Bokeh Glow
    const blurSize = p.size * (idx % 2 === 0 ? 6 : 3);
    const particleGlow = ctx.createRadialGradient(x, y, 0, x, y, blurSize);
    particleGlow.addColorStop(0, p.color + Math.floor(finalOpacity * 255).toString(16).padStart(2, '0'));
    particleGlow.addColorStop(1, 'transparent');

    ctx.beginPath();
    ctx.arc(x, y, blurSize, 0, Math.PI * 2);
    ctx.fillStyle = particleGlow;
    ctx.fill();

    // Organic Core
    if (p.size > 0.8) {
      ctx.beginPath();
      ctx.arc(x, y, p.size * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${finalOpacity * 0.8})`;
      ctx.fill();
    }
  });

  // 3. Natural Vignette (Earthy green bottom)
  const vig = ctx.createLinearGradient(0, H * 0.6, 0, H);
  vig.addColorStop(0, 'rgba(21, 29, 14, 0)');
  vig.addColorStop(1, 'rgba(21, 29, 14, 0.9)'); // Matches new deep background #151d0e
  ctx.fillStyle = vig;
  ctx.fillRect(0, H * 0.6, W, H * 0.4);

  rafId = requestAnimationFrame(draw);
}

function startCanvasLoop() {
  if (rafId !== null || !canvasVisible || document.hidden) return;
  rafId = requestAnimationFrame(draw);
}

function stopCanvasLoop() {
  if (rafId === null) return;
  cancelAnimationFrame(rafId);
  rafId = null;
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopCanvasLoop();
    return;
  }
  startCanvasLoop();
});

startCanvasLoop();

// -- FORM (FormSubmit.co via AJAX) --
const enquiryForm = document.getElementById('enquiryForm');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formBox = document.getElementById('formContent');
    const successBox = document.getElementById('fSuccess');
    const formData = new FormData(enquiryForm);

    fetch(enquiryForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
      .then(response => {
        if (response.ok) {
          formBox.style.display = 'none';
          successBox.style.display = 'block';
          enquiryForm.reset();

          setTimeout(() => {
            successBox.style.display = 'none';
            formBox.style.display = 'block';
          }, 4000);
        } else {
          alert('Something went wrong. Please try again.');
        }
      })
      .catch(() => {
        alert('Network error. Please check your connection and try again.');
      });
  });
}

// -- NEWSLETTER (FormSubmit.co via AJAX) --
const nlForm = document.getElementById('newsletterForm');
if (nlForm) {
  nlForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const nlRow = document.getElementById('nlRow');
    const nlSuccess = document.getElementById('nlSuccess');
    const formData = new FormData(nlForm);

    fetch(nlForm.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
      .then(response => {
        if (response.ok) {
          nlRow.style.display = 'none';
          nlSuccess.style.display = 'block';
          nlForm.reset();
        }
      })
      .catch(() => { });
  });
}
// -- ABOUT VIDEO PERSISTENCE --
const aboutVid = document.querySelector('.a-main-video');
if (aboutVid) {
  // Play only when visible to avoid below-fold video load on startup.
  const vidObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        aboutVid.play().catch(() => { });
      } else {
        aboutVid.pause();
      }
    });
  }, { threshold: 0.1 });
  vidObs.observe(aboutVid);
}
function formatHeadingText(text) {
  if (!text) return '';
  const parts = text.split(' ');
  if (parts.length <= 1) return text.toUpperCase();
  const splitIdx = Math.max(1, Math.floor(parts.length / 2));
  const caps = parts.slice(0, splitIdx).join(' ').toUpperCase();
  const italics = parts.slice(splitIdx).join(' ');
  return `${caps} <em>${italics}</em>`;
}

// Format all product titles on the home page
document.querySelectorAll('.pc-title').forEach(title => {
  title.innerHTML = formatHeadingText(title.textContent.trim());
});
