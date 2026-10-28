// Scroll motion for the restyle. Original code, vanilla (no libraries): one rAF loop, passive listeners,
// IntersectionObserver for reveals. Every effect is a progressive enhancement and is gated by the
// html.reveal-on / html.film-on classes set in <head> (never set for prefers-reduced-motion).
const root = document.documentElement;
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const smooth = (t: number) => t * t * (3 - 2 * t);

(window as any).__seReady = true;

const header = document.querySelector<HTMLElement>('.site-header');
const progressBar = document.querySelector<HTMLElement>('.scroll-progress');
const motionOk = root.classList.contains('reveal-on');

/* ---------- 1. scroll reveals ---------- */
function setupReveals() {
  // Auto-tag headings, eyebrows, cards and list rows (skips the pinned hero stage).
  const sel = [
    'main section:not(.film) .eyebrow',
    'main section:not(.film) h1',
    'main section:not(.film) h2',
    'main section:not(.film) h2 + p',
    'main section:not(.film) .card',
    'main section:not(.film) details',
    'main section:not(.film) ol > li',
    'main section:not(.film) article',
    'main section:not(.film) figure',
    'main section:not(.film) [data-rv]',
  ].join(',');
  const all = Array.from(document.querySelectorAll<HTMLElement>(sel)).filter((el) => !el.closest('.film'));
  const set = new Set(all);
  // Only the outermost match animates; nested matches ride along with their parent.
  const els = all.filter((el) => {
    for (let p = el.parentElement; p; p = p.parentElement) if (set.has(p)) return false;
    return true;
  });
  // Stagger siblings that share a parent.
  const seen = new Map<Element, number>();
  els.forEach((el) => {
    const parent = el.parentElement as Element;
    const i = seen.get(parent) ?? 0;
    seen.set(parent, i + 1);
    el.style.setProperty('--d', `${Math.min(i, 5) * 90}ms`);
  });
  const vh = window.innerHeight;
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
  );
  els.forEach((el) => {
    el.setAttribute('data-reveal', '');
    // Already on screen at load: show immediately, no hide-then-fade flash.
    if (el.getBoundingClientRect().top < vh * 0.92) el.classList.add('is-in');
    else io.observe(el);
  });
}

/* ---------- 2. rAF scroll loop: header, progress, pinned hero, parallax, process line ---------- */
const film = document.querySelector<HTMLElement>('.film');
const stage = film?.querySelector<HTMLElement>('.stage') ?? null;
const photo = film?.querySelector<HTMLElement>('.film-photo') ?? null;
const creds = film?.querySelector<HTMLElement>('.film-creds') ?? null;
const hint = film?.querySelector<HTMLElement>('.film-scroll-hint') ?? null;
const filmOn = root.classList.contains('film-on') && !!film && !!stage;
const dock = document.querySelector<HTMLElement>('.dock');
const parallax = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
const lines = Array.from(document.querySelectorAll<HTMLElement>('[data-line]'));

let ticking = false;
let cur = 0; // eased film progress
let rafOn = false;

function filmTarget() {
  if (!film || !stage) return 0;
  const r = film.getBoundingClientRect();
  const range = r.height - stage.offsetHeight;
  return range > 0 ? clamp(-r.top / range) : 0;
}

function paintFilm(p: number) {
  if (!filmOn || !film) return;
  // photo: slow push-in + drift
  if (photo) photo.style.transform = `translate3d(0, ${(-p * 3).toFixed(2)}%, 0) scale(${(1.04 + p * 0.2).toFixed(4)})`;
  // hero copy exits, credentials card enters
  const ho = 1 - smooth(seg(p, 0.16, 0.4));
  film.style.setProperty('--ho', ho.toFixed(3));
  film.style.setProperty('--hy', `${(-60 * smooth(seg(p, 0.12, 0.42))).toFixed(1)}px`);
  const co = smooth(seg(p, 0.46, 0.64));
  film.style.setProperty('--co', co.toFixed(3));
  film.style.setProperty('--cy', `${(46 * (1 - co)).toFixed(1)}px`);
  film.style.setProperty('--hint', (1 - seg(p, 0, 0.08)).toFixed(3));
  film.style.setProperty('--shade', (0.9 + 0.1 * smooth(seg(p, 0.1, 0.5))).toFixed(3));
  creds?.classList.toggle('is-live', co > 0.7);
  (film.querySelector('.film-hero') as HTMLElement | null)?.toggleAttribute('inert', ho < 0.2);
}

function frame() {
  const target = filmTarget();
  cur += (target - cur) * 0.14;
  if (Math.abs(target - cur) < 0.0006) cur = target;
  paintFilm(cur);
  if (cur !== target) requestAnimationFrame(frame); else rafOn = false;
}
function wake() { if (!rafOn) { rafOn = true; requestAnimationFrame(frame); } }

const sections = Array.from(document.querySelectorAll<HTMLElement>('.dock a[href^="#"]')).map((a) => ({ a, el: document.querySelector<HTMLElement>(a.getAttribute('href')!) }));

function onScroll() {
  const y = window.scrollY;
  header?.classList.toggle('solid', y > 24);
  if (progressBar) {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.setProperty('--sp', (h > 0 ? clamp(y / h) : 0).toFixed(4));
  }
  if (motionOk) {
    const vh = window.innerHeight;
    for (const el of parallax) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      const k = parseFloat(el.dataset.parallax || '0.08');
      const c = (r.top + r.height / 2 - vh / 2) / vh; // -1..1 around viewport centre
      el.style.transform = `translate3d(0, ${(-c * k * 100).toFixed(1)}px, 0)`;
    }
    for (const el of lines) {
      const host = el.closest('ol') as HTMLElement | null;
      const r = (host ?? el).getBoundingClientRect();
      el.style.setProperty('--lp', clamp((vh * 0.78 - r.top) / Math.max(r.height, 1)).toFixed(3));
    }
    if (dock && film) {
      const r = film.getBoundingClientRect();
      const ft = document.querySelector('footer')?.getBoundingClientRect().top ?? 1e9;
      dock.classList.toggle('is-on', r.bottom < window.innerHeight * 0.55 && ft > vh - 40);
      let active: HTMLAnchorElement | null = null;
      for (const s of sections) { if (s.el && s.el.getBoundingClientRect().top < vh * 0.45) active = s.a as HTMLAnchorElement; }
      for (const s of sections) s.a.classList.toggle('is-active', s.a === active);
    }
  }
  if (filmOn) wake();
}
function req() { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; onScroll(); }); } }

try {
  if (motionOk) setupReveals();
  window.addEventListener('scroll', req, { passive: true });
  window.addEventListener('resize', req, { passive: true });
  if (filmOn) { cur = filmTarget(); paintFilm(cur); }
  onScroll();
} catch (err) {
  console.error('motion init failed', err);
  root.classList.remove('reveal-on', 'film-on');
  document.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-in'));
}
