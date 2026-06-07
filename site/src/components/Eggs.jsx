// Eggs.jsx — two playful easter eggs:
//  1) OminososHaunt — when the #union (Ominiosos) section is centered in the
//     viewport, a sinister drone plays and yellow eyes open and track the
//     mouse. Scrolling away closes the eyes and stops the sound.
//  2) FlagEgg — 1-in-3 chance per load to hide a red/black/white tricolor flag
//     in a random corner. Click it for a flag storm, a screen quake and the
//     São Paulo anthem.
import React, { useState, useEffect, useRef } from 'react';
import { startDrone, playAnthem } from '../lib/audio.js';
import { celebrate } from '../lib/confetti.js';
import { useL } from '../lib/LangContext.jsx';
import { t, DATA } from '../data/content.js';

// ── 1) Ominiosos haunt ────────────────────────────────────────────
const EYE_COUNT = 32;
const randomEyes = () =>
  Array.from({ length: EYE_COUNT }, () => ({
    x: 3 + Math.random() * 94,   // vw %
    y: 6 + Math.random() * 88,   // vh %
    s: 0.55 + Math.random() * 1.05, // scale
  }));

export function OminososHaunt({ enabled = true }) {
  const [on, setOn] = useState(false);
  const [eyes, setEyes] = useState(randomEyes);
  const pupils = useRef([]);
  const drone = useRef(null);

  // active when the Ominiosos section's center sits near the viewport center
  useEffect(() => {
    if (!enabled) { setOn(false); return; }
    const check = () => {
      const el = document.getElementById('union');
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const center = (r.top + r.bottom) / 2;
      setOn(Math.abs(center - vh / 2) < vh * 0.28);
    };
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [enabled]);

  // re-scatter the eyes to fresh random spots each time they open
  useEffect(() => { if (on) setEyes(randomEyes()); }, [on]);

  // pupils follow the cursor while active
  useEffect(() => {
    if (!on) return;
    const move = (e) => {
      const vw = window.innerWidth, vh = window.innerHeight;
      pupils.current.forEach((p, i) => {
        if (!p || !eyes[i]) return;
        const cx = (eyes[i].x / 100) * vw, cy = (eyes[i].y / 100) * vh;
        const dx = e.clientX - cx, dy = e.clientY - cy;
        const len = Math.hypot(dx, dy) || 1;
        const off = Math.min(7, len / 12);
        p.style.transform = `translate(calc(-50% + ${(dx / len) * off}px), calc(-50% + ${(dy / len) * off}px))`;
      });
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [on, eyes]);

  // sinister drone on/off
  useEffect(() => {
    if (on) {
      if (!drone.current) drone.current = startDrone();
    } else if (drone.current) {
      drone.current.stop();
      drone.current = null;
    }
    return () => { if (drone.current) { drone.current.stop(); drone.current = null; } };
  }, [on]);

  return (
    <div className={'haunt' + (on ? ' on' : '')} aria-hidden="true">
      {/* shared gradient for the almond eye shape */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <radialGradient id="omEyeGrad" cx="50%" cy="45%" r="62%">
            <stop offset="0%" stopColor="#fff4ad" />
            <stop offset="45%" stopColor="#ffd000" />
            <stop offset="100%" stopColor="#9c7400" />
          </radialGradient>
        </defs>
      </svg>
      {eyes.map((e, i) => (
        <div className="eye" key={i}
          style={{ left: e.x + '%', top: e.y + '%', width: 50 * e.s + 'px', height: 30 * e.s + 'px' }}>
          <div className="eye-ball" style={{ transitionDelay: (i % 8) * 0.03 + 's' }}>
            <svg className="eye-shape" viewBox="0 0 100 56" preserveAspectRatio="none">
              <path d="M2,28 C 26,9 74,9 98,28 C 74,47 26,47 2,28 Z" fill="url(#omEyeGrad)" />
            </svg>
            <div className="eye-pupil" ref={(el) => (pupils.current[i] = el)} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── 2) São Paulo tricolor flag egg ────────────────────────────────
function Flag({ className = '', style }) {
  return (
    <span className={'sp-flag ' + className} style={style}>
      <i className="r" /><i className="k" /><i className="w" />
    </span>
  );
}

const CORNERS = [
  { top: '14px', left: '14px' },
  { top: '78px', right: '16px' },
  { bottom: '16px', left: '16px' },
  { bottom: '16px', right: '16px' },
];

export function FlagEgg({ enabled = true }) {
  // 1/3 chance per page load, in a random corner
  const [found] = useState(() => Math.random() < 1 / 3);
  const [corner] = useState(() => CORNERS[Math.floor(Math.random() * CORNERS.length)]);
  const [party, setParty] = useState(false);
  const audio = useRef(null);

  // turning fun mode off mid-celebration calms everything down
  useEffect(() => {
    if (!enabled) {
      setParty(false);
      document.body.classList.remove('sp-quake');
      if (audio.current) { try { audio.current.pause(); } catch (_) {} }
    }
  }, [enabled]);

  useEffect(() => {
    if (!party) return;
    audio.current = playAnthem();
    const conf = celebrate({ duration: 9000 });
    document.body.classList.add('sp-quake');
    const tq = setTimeout(() => document.body.classList.remove('sp-quake'), 2600);
    const tp = setTimeout(() => setParty(false), 11500);
    return () => {
      clearTimeout(tq); clearTimeout(tp);
      document.body.classList.remove('sp-quake');
      if (conf && conf.stop) conf.stop();
    };
  }, [party]);

  // clean up audio if unmounted mid-party
  useEffect(() => () => {
    if (audio.current) { try { audio.current.pause(); } catch (_) {} }
  }, []);

  if (!enabled || !found) return null;

  return (
    <>
      {!party && (
        <button
          className="sp-egg"
          style={corner}
          title="?"
          aria-label="easter egg"
          onClick={() => setParty(true)}
        >
          <Flag />
        </button>
      )}
      {party && DATA.anthemCredit ? (
        <div className="sp-party" aria-hidden="true">
          <div className="sp-credit">♪ {DATA.anthemCredit}</div>
        </div>
      ) : null}
    </>
  );
}

// ── Fun-mode intro popup (shown once per session) ─────────────────
export function FunIntro({ fun, setFun }) {
  const { lang } = useL();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!fun) return;
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('lt_fun_intro')) return;
    const tid = setTimeout(() => setShow(true), 600);
    return () => clearTimeout(tid);
  }, [fun]);

  const close = () => {
    setShow(false);
    try { sessionStorage.setItem('lt_fun_intro', '1'); } catch (_) {}
  };

  if (!show) return null;
  return (
    <div className="fun-pop" role="status">
      <span className="fun-msg">{t('fun_p', lang)}</span>
      <button className="fun-x" onClick={close} aria-label={t('fun_ok', lang)} title={t('fun_ok', lang)}>×</button>
    </div>
  );
}
