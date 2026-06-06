// audio.js — tiny Web Audio helpers for the site easter eggs.
// No external files required: the sinister drone and the celebration fanfare
// are fully synthesized. The São Paulo anthem plays from an optional MP3 the
// user can drop at site/public/audio/spfc-anthem.mp3 — otherwise it falls
// back to a synthesized fanfare. Nothing copyrighted is bundled.

let _ctx = null;
function getCtx() {
  if (typeof window === 'undefined') return null;
  if (!_ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    _ctx = new AC();
  }
  return _ctx;
}

// Browsers require a user gesture before audio can play. Resume the shared
// context on the first interaction so gesture-adjacent triggers (scrolling to
// a section, clicking the flag) have sound available.
if (typeof window !== 'undefined') {
  const unlock = () => {
    const c = getCtx();
    if (c && c.state === 'suspended') c.resume();
  };
  ['pointerdown', 'keydown', 'touchstart', 'click', 'wheel'].forEach((ev) =>
    window.addEventListener(ev, unlock, { passive: true })
  );
}

// ── Sinister drone (Ominiosos haunt) ──────────────────────────────
// Low detuned saws through a lowpass + an eerie wavering high sine.
export function startDrone() {
  const ctx = getCtx();
  if (!ctx) return { stop() {} };
  if (ctx.state === 'suspended') ctx.resume();

  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  const filt = ctx.createBiquadFilter();
  filt.type = 'lowpass';
  filt.frequency.value = 440;
  filt.Q.value = 6;
  filt.connect(master);

  const nodes = [];
  // root, minor-second-ish and a low fifth → dissonant, ominous bed
  [55, 58.27, 82.41].forEach((f) => {
    const o = ctx.createOscillator();
    o.type = 'sawtooth';
    o.frequency.value = f;
    const g = ctx.createGain();
    g.gain.value = 0.22;
    o.connect(g); g.connect(filt);
    o.start();
    nodes.push(o);
  });
  // eerie high tone slowly wavering in pitch
  const hi = ctx.createOscillator();
  hi.type = 'sine';
  hi.frequency.value = 670;
  const hg = ctx.createGain();
  hg.gain.value = 0.035;
  hi.connect(hg); hg.connect(filt);
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.18;
  const lfoG = ctx.createGain();
  lfoG.gain.value = 55;
  lfo.connect(lfoG); lfoG.connect(hi.frequency);
  hi.start(); lfo.start();
  nodes.push(hi, lfo);

  master.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 1.2);

  return {
    stop() {
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setTargetAtTime(0, now, 0.4);
      setTimeout(() => nodes.forEach((n) => { try { n.stop(); } catch (_) {} }), 900);
    },
  };
}

// ── Celebration fanfare (synthesized fallback for the anthem) ──────
export function playFanfare() {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();
  const t0 = ctx.currentTime + 0.05;
  const master = ctx.createGain();
  master.gain.value = 0.5;
  master.connect(ctx.destination);
  // [freq, startOffset, duration]
  const seq = [
    [392, 0, .18], [523, .18, .18], [659, .36, .18], [784, .54, .36],
    [659, .96, .18], [784, 1.14, .18], [1046, 1.32, .5],
    [880, 1.95, .2], [988, 2.15, .2], [1046, 2.35, .7],
  ];
  seq.forEach(([f, at, dur]) => {
    const s = t0 + at;
    const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.value = f;
    const g = ctx.createGain();
    g.gain.setValueAtTime(.0001, s);
    g.gain.linearRampToValueAtTime(.35, s + .02);
    g.gain.exponentialRampToValueAtTime(.0001, s + dur);
    o.connect(g); g.connect(master); o.start(s); o.stop(s + dur + .05);
    const b = ctx.createOscillator(); b.type = 'sawtooth'; b.frequency.value = f / 2;
    const bg = ctx.createGain();
    bg.gain.setValueAtTime(.0001, s);
    bg.gain.linearRampToValueAtTime(.12, s + .02);
    bg.gain.exponentialRampToValueAtTime(.0001, s + dur);
    b.connect(bg); bg.connect(master); b.start(s); b.stop(s + dur + .05);
  });
  setTimeout(() => { try { master.disconnect(); } catch (_) {} }, 3600);
}

// ── Anthem: real MP3 if provided, else synthesized fanfare ─────────
// Returns an HTMLAudioElement when the file plays (so the caller can stop it).
export function playAnthem() {
  if (typeof Audio === 'undefined') { playFanfare(); return null; }
  let fellBack = false;
  const fallback = () => { if (!fellBack) { fellBack = true; playFanfare(); } };
  try {
    const base = (import.meta.env && import.meta.env.BASE_URL) || '/';
    const a = new Audio(base + 'audio/spfc-anthem.mp3');
    a.volume = 0.7;
    a.addEventListener('error', fallback, { once: true });
    const p = a.play();
    if (p && p.catch) p.catch(fallback);
    return a;
  } catch (_) {
    fallback();
    return null;
  }
}
