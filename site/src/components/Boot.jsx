// Boot.jsx — terminal boot/intro sequence that reveals the page.
import React, { useState, useEffect, useRef } from 'react';

export function BootSequence({ onDone }) {
  const [lines, setLines] = useState([]);      // committed lines
  const [cur, setCur] = useState(null);        // currently typing line
  const [fading, setFading] = useState(false);
  const bodyRef = useRef(null);
  const canc = useRef(false);
  const timers = useRef([]);

  const F = 0.34; // global speed factor — ~3x faster
  const wait = (ms) => new Promise((r) => { const id = setTimeout(r, ms * F); timers.current.push(id); });

  // sequence ──────────────────────────────────────────────
  const RED = 'var(--red)', GRN = '#3ddc84', MUT = 'var(--muted)', WHT = 'var(--white)', FNT = 'var(--faint)';
  const seq = [
    { type: 'type', p: '$', text: 'cd ~/dev', cls: WHT },
    { type: 'type', p: '$', text: 'ls -la', cls: WHT },
    { type: 'out',  p: '',  text: 'drwxr-xr-x  badge-union/  portfolio/  projects/', cls: MUT, delay: 160 },
    { type: 'type', p: '$', text: 'cd portfolio-leandro', cls: WHT },
    { type: 'type', p: '$', text: 'git pull origin main', cls: WHT },
    { type: 'out',  p: '',  text: 'Already up to date — working tree clean', cls: GRN, delay: 160 },
    { type: 'type', p: '$', text: 'dotnet restore && npm install', cls: WHT },
    { type: 'out',  p: '',  text: '✓ restored 42 packages (1.2s)', cls: GRN, delay: 220 },
    { type: 'out',  p: '',  text: '✓ added 1337 packages (7.8s)', cls: GRN, delay: 320 },
    { type: 'type', p: '$', text: 'ssh leandro@badgeunion.dev', cls: WHT },
    { type: 'out',  p: '',  text: 'authenticating...', cls: FNT, delay: 200 },
    { type: 'type', p: 'login:', text: 'leandro.teruya', cls: WHT, speed: 55 },
    { type: 'type', p: 'password:', text: '••••••••••••', cls: RED, speed: 60 },
    { type: 'out',  p: '',  text: '✓ access granted — welcome back, Leandro', cls: GRN, delay: 260 },
    { type: 'type', p: '$', text: 'npm run dev', cls: WHT },
    { type: 'out',  p: '',  text: '▲ compiling portfolio...', cls: MUT, delay: 220 },
    { type: 'out',  p: '',  text: '✓ ready in 1.2s — http://localhost:3000', cls: GRN, delay: 460 },
    { type: 'out',  p: '→', text: 'launching portfolio', cls: RED, delay: 360 },
  ];

  useEffect(() => {
    (async () => {
      await wait(350);
      for (const s of seq) {
        if (canc.current) return;
        if (s.type === 'type') {
          setCur({ p: s.p, text: '', cls: s.cls });
          for (let i = 1; i <= s.text.length; i++) {
            if (canc.current) return;
            setCur({ p: s.p, text: s.text.slice(0, i), cls: s.cls });
            await wait((s.speed || 34) + Math.random() * 34);
          }
          await wait(s.pause || 240);
          setLines((l) => [...l, { p: s.p, text: s.text, cls: s.cls }]);
          setCur(null);
        } else {
          await wait(s.delay || 200);
          setLines((l) => [...l, { p: s.p, text: s.text, cls: s.cls }]);
        }
      }
      await wait(300);
      if (canc.current) return;
      setFading(true);
      await new Promise((r) => { const id = setTimeout(r, 420); timers.current.push(id); });
      finish();
    })();
    return () => { canc.current = true; timers.current.forEach(clearTimeout); };
  }, []);

  // auto-scroll terminal body
  useEffect(() => { const b = bodyRef.current; if (b) b.scrollTop = b.scrollHeight; }, [lines, cur]);

  const done = useRef(false);
  const finish = () => {
    if (done.current) return;
    done.current = true;
    document.body.classList.remove('booting');
    onDone();
  };
  const skip = () => {
    canc.current = true; timers.current.forEach(clearTimeout);
    setFading(true); setTimeout(finish, 280);
  };

  return (
    <div className={'boot' + (fading ? ' out' : '')} onClick={skip}>
      <div className="boot-grid" />
      <div className="boot-term">
        <div className="boot-bar">
          <span className="d r" /><span className="d y" /><span className="d g" />
          <span className="boot-bar-title">leandro@badgeunion: ~/dev</span>
        </div>
        <div className="boot-body" ref={bodyRef}>
          {lines.map((l, i) => (
            <div className="boot-line" key={i}>
              {l.p && <span className="boot-p">{l.p}</span>}
              <span style={{ color: l.cls }}>{l.text}</span>
            </div>
          ))}
          {cur && (
            <div className="boot-line">
              {cur.p && <span className="boot-p">{cur.p}</span>}
              <span style={{ color: cur.cls }}>{cur.text}</span>
              <span className="caret" />
            </div>
          )}
        </div>
      </div>
      <button type="button" className="boot-skip" onClick={(e) => { e.stopPropagation(); skip(); }}>skip intro →</button>
    </div>
  );
}
