// confetti.js — celebration confetti that FALLS from the top (no upward shot),
// meant to run together with the screen shake. Pieces are tricolor
// (red/black/white); some are little 3-stripe flags. Pure canvas, no deps.
// Returns { stop } for early cleanup.

const COLORS = ['#e11d2a', '#0a0a0a', '#f4f4f5'];

export function celebrate({ duration = 7000 } = {}) {
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

  const MAX = reduce ? 50 : 110;   // keep it sparse, not bloated
  const G = 0.045;                 // very gentle gravity → slow drift down
  const TERM = 2.1;                // low terminal velocity
  const parts = [];

  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = () => COLORS[(Math.random() * COLORS.length) | 0];

  function spawn() {
    if (parts.length >= MAX) return;
    const flag = Math.random() < 0.3;
    parts.push({
      x: rnd(0, W), y: rnd(-40, -10),
      vx: rnd(-0.5, 0.5), vy: rnd(0.3, 1),
      rot: rnd(0, Math.PI * 2), vrot: rnd(-0.12, 0.12),
      w: flag ? rnd(12, 17) : rnd(6, 9),
      h: flag ? rnd(8, 11) : rnd(4, 7),
      color: pick(), flag,
      wob: rnd(0, Math.PI * 2), wobSp: rnd(0.02, 0.06), sway: rnd(0.3, 0.8),
    });
  }

  // a light sprinkle to begin, then a steady gentle stream for `duration`
  for (let i = 0; i < (reduce ? 14 : 26); i++) spawn();

  const start = Date.now();
  let raf = 0, stopped = false;

  function frame() {
    if (stopped) return;
    const elapsed = Date.now() - start;
    if (!reduce && elapsed < duration) spawn(); // one piece per frame → sparse

    ctx.clearRect(0, 0, W, H);
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.vy = Math.min(p.vy + G, TERM);
      p.vx *= 0.99;
      p.wob += p.wobSp;
      p.x += p.vx + Math.sin(p.wob) * p.sway;
      p.y += p.vy;
      p.rot += p.vrot;
      if (p.y > H + 40) { parts.splice(i, 1); continue; }
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
    window.removeEventListener('resize', resize);
    canvas.remove();
  }

  return { stop: cleanup };
}
