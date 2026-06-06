// Eggs.jsx — two playful easter eggs:
//  1) OminososHaunt — when the #union (Ominiosos) section is centered in the
//     viewport, a sinister drone plays and yellow eyes open and track the
//     mouse. Scrolling away closes the eyes and stops the sound.
//  2) FlagEgg — 1-in-3 chance per load to hide a red/black/white tricolor flag
//     in a random corner. Click it for a flag storm, a screen quake and the
//     São Paulo anthem.
import React, { useState, useEffect, useRef } from 'react';
import { startDrone, playAnthem } from '../lib/audio.js';
import { useL } from '../lib/LangContext.jsx';
import { t, DATA } from '../data/content.js';

// ── 1) Ominiosos haunt ────────────────────────────────────────────
const EYES = [
  { x: 12, y: 22 }, { x: 24, y: 70 }, { x: 38, y: 34 }, { x: 50, y: 84 },
  { x: 62, y: 26 }, { x: 76, y: 64 }, { x: 88, y: 30 }, { x: 17, y: 48 },
  { x: 71, y: 86 }, { x: 45, y: 16 }, { x: 85, y: 80 }, { x: 31, y: 90 },
];

export function OminososHaunt({ enabled = true }) {
  const [on, setOn] = useState(false);
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

  // pupils follow the cursor while active
  useEffect(() => {
    if (!on) return;
    const move = (e) => {
      const vw = window.innerWidth, vh = window.innerHeight;
      pupils.current.forEach((p, i) => {
        if (!p) return;
        const cx = (EYES[i].x / 100) * vw, cy = (EYES[i].y / 100) * vh;
        const dx = e.clientX - cx, dy = e.clientY - cy;
        const len = Math.hypot(dx, dy) || 1;
        const off = Math.min(7, len / 12);
        p.style.transform = `translate(calc(-50% + ${(dx / len) * off}px), calc(-50% + ${(dy / len) * off}px))`;
      });
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, [on]);

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
      <div className="haunt-tint" />
      {EYES.map((e, i) => (
        <div className="eye" key={i} style={{ left: e.x + '%', top: e.y + '%' }}>
          <div className="eye-ball" style={{ transitionDelay: (i % 6) * 0.05 + 's' }}>
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
    document.body.classList.add('sp-quake');
    const tq = setTimeout(() => document.body.classList.remove('sp-quake'), 4200);
    const tp = setTimeout(() => setParty(false), 9000);
    return () => {
      clearTimeout(tq); clearTimeout(tp);
      document.body.classList.remove('sp-quake');
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
      {party && (
        <div className="sp-party" aria-hidden="true">
          {Array.from({ length: 44 }).map((_, i) => {
            const left = Math.random() * 100;
            const dur = 2.4 + Math.random() * 2.6;
            const delay = Math.random() * 1.6;
            const scale = 0.6 + Math.random() * 1.3;
            return (
              <Flag
                key={i}
                className="sp-fly"
                style={{
                  left: left + 'vw',
                  animationDuration: dur + 's',
                  animationDelay: delay + 's',
                  transform: `scale(${scale})`,
                }}
              />
            );
          })}
          {DATA.anthemCredit ? <div className="sp-credit">♪ {DATA.anthemCredit}</div> : null}
        </div>
      )}
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
    <div className="fun-pop" role="dialog" aria-label={t('fun_title', lang)}>
      <div className="ttl"><span role="img" aria-hidden="true">😄</span> {t('fun_title', lang)}</div>
      <p>{t('fun_p', lang)}</p>
      <div className="row">
        <button className="ok" onClick={close}>{t('fun_ok', lang)}</button>
        <button onClick={() => { setFun(false); close(); }}>{t('fun_off_now', lang)}</button>
      </div>
    </div>
  );
}
