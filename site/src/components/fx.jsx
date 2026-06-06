// fx.jsx — reusable animation primitives.
// Exports: Reveal, Typewriter, Counter, SkillBar, GlitchText, ScrambleText,
//          Marquee, MagneticCard, ParticleField, useInView, useTween, useDraggable.
import React, { useState, useEffect, useRef, useCallback } from 'react';

// ── useInView (robust: manual rect check + scroll/resize + IO fallback) ──
export function useInView(opts = { threshold: 0.18, once: true }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const check = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.92 && r.bottom > 0;
    };
    if (check()) { setSeen(true); return; }
    let io;
    const onScroll = () => { if (check()) { setSeen(true); cleanup(); } };
    const cleanup = () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (io) io.disconnect();
    };
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { setSeen(true); cleanup(); }
      }, { threshold: opts.threshold, rootMargin: '0px 0px -6% 0px' });
      io.observe(el);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // settle check after layout/fonts
    const tid = setTimeout(onScroll, 120);
    return () => { clearTimeout(tid); cleanup(); };
  }, [seen]);
  return [ref, seen];
}

// ── useTween (timer-driven progress 0→1; reliable even when rAF throttled) ──
export function useTween(active, { dur = 700, delay = 0 } = {}) {
  const [p, setP] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setP(1); return; }
    let id, start = null;
    const begin = setTimeout(() => {
      start = Date.now();
      id = setInterval(() => {
        const t = Math.min((Date.now() - start) / dur, 1);
        setP(1 - Math.pow(1 - t, 3));
        if (t >= 1) clearInterval(id);
      }, 16);
    }, delay);
    return () => { clearTimeout(begin); clearInterval(id); };
  }, [active]);
  return p;
}

// ── Reveal wrapper (JS tween: fade + slide up) ────────────────────
export function Reveal({ children, delay = 0, as = 'div', className = '', style, ...rest }) {
  const [ref, seen] = useInView();
  const p = useTween(seen, { dur: 750, delay: delay * 80 });
  const Tag = as;
  return (
    <Tag ref={ref} className={className} style={{
      opacity: p,
      transform: `translateY(${(1 - p) * 26}px)`,
      willChange: p < 1 ? 'opacity, transform' : 'auto',
      ...style,
    }} {...rest}>
      {children}
    </Tag>
  );
}

// ── Typewriter (cycles a list of phrases) ─────────────────────────
export function Typewriter({ words, speed = 55, pause = 1400 }) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState('');
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = words[i % words.length];
    let to;
    if (!del && txt === cur) {
      to = setTimeout(() => setDel(true), pause);
    } else if (del && txt === '') {
      setDel(false); setI(v => v + 1);
    } else {
      to = setTimeout(() => {
        setTxt(del ? cur.slice(0, txt.length - 1) : cur.slice(0, txt.length + 1));
      }, del ? speed / 1.8 : speed);
    }
    return () => clearTimeout(to);
  }, [txt, del, i, words]);
  return (
    <span style={{ fontFamily: 'var(--mono)', color: 'var(--red)' }}>
      {txt}<span className="caret" />
    </span>
  );
}

// ── Counter (counts up when in view) ──────────────────────────────
export function Counter({ to, suffix = '', decimals = 0, dur = 1500 }) {
  const [ref, seen] = useInView();
  const p = useTween(seen, { dur });
  return <span ref={ref}>{(to * p).toFixed(decimals)}{suffix}</span>;
}

// ── SkillBar (animated fill via JS tween) ─────────────────────────
export function SkillBar({ name, lvl }) {
  const [ref, seen] = useInView();
  const p = useTween(seen, { dur: 1100 });
  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 13.5, color: 'var(--white)' }}>{name}</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--faint)' }}>{Math.round(lvl * p)}</span>
      </div>
      <div style={{ height: 6, borderRadius: 4, background: '#1d1d1d', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: (lvl * p) + '%', borderRadius: 4,
          background: 'linear-gradient(90deg, var(--red-deep), var(--red), var(--red-bright))',
          boxShadow: '0 0 12px rgba(225,29,42,.5)',
        }} />
      </div>
    </div>
  );
}

// ── GlitchText (glitches briefly on hover / in view) ──────────────
export function GlitchText({ children, className = '', style, as = 'span' }) {
  const [on, setOn] = useState(false);
  const Tag = as;
  const trigger = () => { setOn(true); setTimeout(() => setOn(false), 600); };
  return (
    <Tag className={`glitch ${className}`} data-text={children} data-on={on ? 1 : 0}
      style={style} onMouseEnter={trigger}>
      {children}
    </Tag>
  );
}

// ── ScrambleText (decode/glitch-in effect when in view) ───────────
export function ScrambleText({ text, className = '', style, as = 'span', dur = 850 }) {
  const [ref, seen] = useInView();
  const [out, setOut] = useState(text);
  const Tag = as;
  useEffect(() => {
    if (!seen) return;
    const glyphs = '!<>-_\\/[]{}=+*^?#________01XZ';
    const start = Date.now();
    const id = setInterval(() => {
      const p = Math.min((Date.now() - start) / dur, 1);
      const reveal = p * text.length;
      let s = '';
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') { s += ' '; continue; }
        if (i < reveal) s += text[i];
        else s += glyphs[Math.floor(Math.random() * glyphs.length)];
      }
      setOut(s);
      if (p >= 1) { setOut(text); clearInterval(id); }
    }, 38);
    return () => clearInterval(id);
  }, [seen, text]);
  return <Tag ref={ref} className={className} style={style}>{out}</Tag>;
}

// ── Marquee (CSS-driven kinetic strip) ────────────────────────────
export function Marquee({ items, ghost, reverse, speed = 26 }) {
  const run = items.map((w, i) => (
    <span key={i} className={'mq-item' + (ghost ? ' ghost' : '')}>
      {w}<span className="mq-star">✦</span>
    </span>
  ));
  return (
    <div className="mq">
      <div className={'mq-track' + (reverse ? ' rev' : '')} style={{ animationDuration: speed + 's' }}>
        {run}{run}
      </div>
    </div>
  );
}

// ── MagneticCard (red glow follows cursor) ────────────────────────
export function MagneticCard({ children, className = '', style, ...rest }) {
  const ref = useRef(null);
  const onMove = useCallback((e) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    el.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }, []);
  return (
    <div ref={ref} className={`card ${className}`} style={style} onMouseMove={onMove} {...rest}>
      {children}
    </div>
  );
}

// ── ParticleField (canvas, mouse-reactive network) ────────────────
export function ParticleField() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, dpr;
    const mouse = { x: -9999, y: -9999 };
    let pts = [];
    const COUNT = () => Math.min(150, Math.floor((w * h) / 11000));

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = COUNT();
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35,
      }));
    }
    function step() {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dm = Math.hypot(dx, dy);
        if (dm < 130) { p.x += (dx / dm) * .9; p.y += (dy / dm) * .9; }
      }
      // links
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.strokeStyle = `rgba(225,29,42,${(1 - d / 120) * 0.16})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      // dots
      for (const p of pts) {
        const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        const near = dm < 130;
        ctx.fillStyle = near ? 'rgba(255,51,64,.9)' : 'rgba(180,180,185,.5)';
        ctx.beginPath(); ctx.arc(p.x, p.y, near ? 2.4 : 1.6, 0, Math.PI * 2); ctx.fill();
      }
    }
    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    resize();
    const id = setInterval(step, 33);
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout', onLeave);
    return () => {
      clearInterval(id);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
    };
  }, []);
  return <canvas id="particles" ref={ref} />;
}

// ── useDraggable (pointer-based free drag; no rAF needed) ─────────
export function useDraggable(initial = { x: 0, y: 0, rot: 0 }) {
  const ref = useRef(null);
  const st = useRef({ ...initial });
  const apply = () => {
    const s = st.current;
    if (ref.current) ref.current.style.transform = `translate(${s.x}px, ${s.y}px) rotate(${s.rot}deg)`;
  };
  useEffect(() => { apply(); }, []);
  const onPointerDown = (e) => {
    e.preventDefault();
    const s = st.current;
    const sx = e.clientX, sy = e.clientY, ox = s.x, oy = s.y;
    const el = ref.current;
    el.style.zIndex = 1000; el.style.cursor = 'grabbing';
    el.classList.add('is-dragging');
    try { el.setPointerCapture(e.pointerId); } catch (_) {}
    const move = (ev) => { s.x = ox + (ev.clientX - sx); s.y = oy + (ev.clientY - sy); apply(); };
    const up = () => {
      el.style.cursor = 'grab'; el.classList.remove('is-dragging');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  const reset = () => { Object.assign(st.current, initial); apply(); };
  return { ref, onPointerDown, reset };
}
