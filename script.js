/* ====== Year ====== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ====== Theme toggle (persisted) ====== */
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const saved = localStorage.getItem('theme');
if (saved) root.setAttribute('data-theme', saved);
themeToggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ====== Navbar scroll state + scroll progress ====== */
const nav = document.getElementById('nav');
const progress = document.getElementById('scrollProgress');
function onScroll() {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 30);
  const h = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ====== Mobile menu ====== */
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  })
);

/* ====== Spotlight follows cursor ====== */
const spotlight = document.querySelector('.spotlight');
window.addEventListener('pointermove', e => {
  spotlight.style.setProperty('--mx', e.clientX + 'px');
  spotlight.style.setProperty('--my', e.clientY + 'px');
}, { passive: true });

/* ====== Typing effect ====== */
const roles = [
  'Senior Software Engineer',
  'Full-Stack Developer',
  'Laravel & Node.js Expert',
  'SaaS Architect',
  'Technical Team Lead',
];
const typedEl = document.getElementById('typed');
let rIdx = 0, cIdx = 0, deleting = false;
function type() {
  const word = roles[rIdx];
  typedEl.textContent = word.slice(0, cIdx);
  if (!deleting && cIdx < word.length) {
    cIdx++; setTimeout(type, 70);
  } else if (!deleting && cIdx === word.length) {
    deleting = true; setTimeout(type, 1600);
  } else if (deleting && cIdx > 0) {
    cIdx--; setTimeout(type, 35);
  } else {
    deleting = false; rIdx = (rIdx + 1) % roles.length; setTimeout(type, 350);
  }
}
type();

/* ====== Reveal on scroll ====== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = Math.min(i % 6, 5) * 60 + 'ms';
  revealObserver.observe(el);
});

/* ====== Animated stat counters ====== */
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.target;
    const suffix = el.dataset.suffix || '';
    const dur = 1400;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    statObserver.unobserve(el);
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat__num').forEach(el => statObserver.observe(el));

/* ====== Active nav link on scroll ====== */
const sections = [...document.querySelectorAll('main section[id]')];
const linkMap = {};
document.querySelectorAll('.nav__links a').forEach(a => {
  linkMap[a.getAttribute('href').slice(1)] = a;
});
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      Object.values(linkMap).forEach(a => a.classList.remove('active'));
      const link = linkMap[entry.target.id];
      if (link) link.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => navObserver.observe(s));

/* ====== Contact form (POST to Google Apps Script → Sheet log + email) ====== */
const form = document.getElementById('contactForm');
if (form) {
  const status = document.getElementById('formStatus');
  const submitBtn = document.getElementById('cf-submit');
  const FALLBACK_EMAIL = 'ymohit65127@gmail.com';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const d = new FormData(form);

    // If the endpoint hasn't been configured yet, fall back to a mailto: draft.
    if (!form.action || form.action.includes('YOUR_SCRIPT_URL')) {
      const body = `Name: ${d.get('name')}%0D%0AEmail: ${d.get('email')}%0D%0A%0D%0A${(d.get('message') || '')}`;
      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=${encodeURIComponent(d.get('subject') || 'Portfolio enquiry')}&body=${body}`;
      status.textContent = 'Opening your email app…';
      status.className = 'form-status ok';
      return;
    }

    d.append('page', location.href);
    d.append('ua', navigator.userAgent);

    submitBtn.disabled = true;
    const original = submitBtn.textContent;
    submitBtn.textContent = 'Sending…';
    status.textContent = '';
    status.className = 'form-status';
    try {
      // No custom headers → "simple" CORS request, which Apps Script web apps accept.
      const res = await fetch(form.action, { method: 'POST', body: d });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        form.reset();
        status.textContent = '✓ Thanks! Your message has been sent.';
        status.className = 'form-status ok';
      } else {
        throw new Error(data.error || 'Server error');
      }
    } catch (err) {
      status.innerHTML = `✗ Something went wrong. Please email me at <a href="mailto:${FALLBACK_EMAIL}">${FALLBACK_EMAIL}</a>.`;
      status.className = 'form-status err';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = original;
    }
  });
}

/* ====== Card tilt on hover (subtle) ====== */
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
  });
  card.addEventListener('pointerleave', () => { card.style.transform = ''; });
});
