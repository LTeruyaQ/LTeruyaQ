// confetti.js — Google-match-win style celebration: two confetti cannons fire
// from the bottom corners toward the center, with gravity, plus a light top
// rain. Pieces are tricolor (red/black/white); some are little 3-stripe flags.
// Pure canvas, no dependencies. Returns { stop } for early cleanup.

const COLORS = ['#e11d2a', '#0a0a0a', '#f4f4f5'];

export function celebrate({ duration = 6500 } = {}) {
  if (typeof document === 'undefined') return { stop() {} };
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const canvas = document.createElement('canvas');
  Object.assign(canvas.style, {
    position: 'fixed', inset: '0', width: '100%', height: '100%',
    zIndex: '65', pointerEvents: 'none',
  });
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  const resize = () => {
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  resize();
  window.addEventListener('resize', resize);

  const MAX = reduce ? 90 : 520;
  const G = 0.32;
  const parts = [];

  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = () => COLORS[(Math.random() * COLORS.length) | 0];

  function spawn(x, y, vx, vy) {
    if (parts.length >= MAX) return;
    const flag = Math.random() < 0.32;
    parts.push({
      x, y, vx, vy,
      rot: rnd(0, Math.PI * 2),
      vrot: rnd(-0.3, 0.3),
      w: flag ? rnd(13, 19) : rnd(6, 10),
      h: flag ? rnd(9, 13) : rnd(4, 8),
      color: pick(),
      flag,
      wob: rnd(0, Math.PI * 2),
    });
  }

  // a cannon burst from a bottom corner aimed toward the center-top
  function cannon(side, count) {
    const x = side < 0 ? 8 : W - 8;
    const y = H - 6;
    const base = side < 0 ? -Math.PI / 3 : -2 * Math.PI / 3; // up-right / up-left
    for (let i = 0; i < count; i++) {
      const a = base + rnd(-0.28, 0.28);
      const sp = rnd(12, 19);
      spawn(x, y, Math.cos(a) * sp, Math.sin(a) * sp);
    }
  }

  // light confetti rain from the top
  function rain(count) {
    for (let i = 0; i < count; i++) spawn(rnd(0, W), -10, rnd(-1, 1), rnd(1, 3));
  }

  // schedule bursts
  const per = reduce ? 26 : 80;
  const fire = () => { cannon(-1, per); cannon(1, per); };
  fire();
  const timers = [];
  if (!reduce) {
    timers.push(setTimeout(fire, 260), setTimeout(fire, 540), setTimeout(() => { cannon(-1, 50); cannon(1, 50); }, 1100));
  }

  const start = Date.now();
  let raf = 0, stopped = false;

  function frame() {
    if (stopped) return;
    const elapsed = Date.now() - start;
    if (!reduce && elapsed < duration && Math.random() < 0.4) rain(3);

    ctx.clearRect(0, 0, W, H);
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.vy += G;
      p.vx *= 0.992; p.vy *= 0.992;
      p.wob += 0.1;
      p.x += p.vx + Math.sin(p.wob) * 0.6;
      p.y += p.vy;
      p.rot += p.vrot;
      if (p.y > H + 40 || p.x < -60 || p.x > W + 60) { parts.splice(i, 1); continue; }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      if (p.flag) {
        const w = p.w, h = p.h, t = h / 3;
        ctx.fillStyle = '#e11d2a'; ctx.fillRect(-w / 2, -h / 2, w, t);
        ctx.fillStyle = '#0a0a0a'; ctx.fillRect(-w / 2, -h / 2 + t, w, t);
        ctx.fillStyle = '#f4f4f5'; ctx.fillRect(-w / 2, -h / 2 + 2 * t, w, t);
      } else {
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      }
      ctx.restore();
    }

    if (elapsed > duration + 2500 || (elapsed > duration && parts.length === 0)) {
      cleanup();
      return;
    }
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  function cleanup() {
    if (stopped) return;
    stopped = true;
    cancelAnimationFrame(raf);
    timers.forEach(clearTimeout);
    window.removeEventListener('resize', resize);
    canvas.remove();
  }

  return { stop: cleanup };
}
