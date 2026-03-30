// -- LOADER --
const loaderEl = document.getElementById('loader');
function hideLoader() {
  if (!loaderEl) return;
  loaderEl.classList.add('gone');
  // Keep vertical scrolling enabled even if any future style changes attempt to lock it.
  document.body.style.overflowY = 'auto';
}
window.addEventListener('load', () => setTimeout(hideLoader, 220));
// Fallback: never let loader block interaction for too long.
window.addEventListener('DOMContentLoaded', () => setTimeout(hideLoader, 900));
window.addEventListener('pageshow', hideLoader);

function scrollToSection(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

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
  return window.matchMedia('(max-width: 900px)').matches;
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
    const el = e.target, target = +el.dataset.target;
    let v = 0;
    const inc = Math.ceil(target / 50);
    const t = setInterval(() => {
      v = Math.min(v + inc, target);
      el.textContent = v + '+';
      if (v >= target) clearInterval(t);
    }, 30);
    co.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-target]').forEach(el => co.observe(el));

// -- 3D SPHERE CANVAS (optimised: fewer points, throttled RAF) --
const canvas = document.getElementById('sphCanvas');
const ctx = canvas.getContext('2d');
let W, H, cx, cy;
function resize() {
  W = canvas.width = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
  cx = W / 2; cy = H / 2;
}
resize();
window.addEventListener('resize', resize, { passive: true });

// Only 80 points, 30 lines -- much lighter
const pts = Array.from({ length: 80 }, () => ({
  th: Math.random() * Math.PI * 2,
  ph: Math.acos(2 * Math.random() - 1),
  r: 120 + Math.random() * 15,
  sp: .0015 + Math.random() * .002
}));
const lns = Array.from({ length: 30 }, () => ({
  th1: Math.random() * Math.PI * 2, ph1: Math.random() * Math.PI,
  th2: Math.random() * Math.PI * 2, ph2: Math.random() * Math.PI, r: 128
}));

let ang = 0, canvasVisible = false;
const co2 = new IntersectionObserver(entries => {
  canvasVisible = entries[0].isIntersecting;
}, { threshold: 0.1 });
co2.observe(canvas);

function proj(th, ph, r, rot) {
  const x3 = r * Math.sin(ph) * Math.cos(th + rot);
  const y3 = r * Math.cos(ph);
  const z3 = r * Math.sin(ph) * Math.sin(th + rot);
  const s = 380 / (380 + z3);
  return { x: cx + x3 * s, y: cy + y3 * s, z: z3, s };
}

let last = 0;
function draw(ts) {
  requestAnimationFrame(draw);
  if (!canvasVisible) return;
  if (ts - last < 33) return; // cap ~30fps -- smooth but low CPU
  last = ts;
  ctx.clearRect(0, 0, W, H);
  lns.forEach(l => {
    const p1 = proj(l.th1, l.ph1, l.r, ang), p2 = proj(l.th2, l.ph2, l.r, ang);
    if (p1.z > -40 && p2.z > -40) {
      ctx.beginPath(); ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = `rgba(122,154,58,${Math.min(p1.s, p2.s) * .12})`;
      ctx.lineWidth = .5; ctx.stroke();
    }
  });
  pts.forEach(p => {
    p.th += p.sp;
    const q = proj(p.th, p.ph, p.r, ang);
    if (q.z > -50) {
      ctx.beginPath();
      ctx.arc(q.x, q.y, q.s * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(122,154,58,${q.s * .65})`;
      ctx.fill();
    }
  });
  // soft glow
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 100);
  g.addColorStop(0, 'rgba(122,154,58,0.06)');
  g.addColorStop(1, 'rgba(122,154,58,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  ang += .004;
}
requestAnimationFrame(draw);

// -- FORM --
function submitForm() {
  if (!document.getElementById('fn').value || !document.getElementById('fp').value || !document.getElementById('fe').value) {
    alert('Please fill Name, Phone & Email.'); return;
  }
  document.getElementById('formContent').style.display = 'none';
  document.getElementById('fSuccess').style.display = 'block';
}
