// sections2.jsx — Stack, Experience
import React from 'react';
import { useL } from '../lib/LangContext.jsx';
import { t, DATA } from '../data/content.js';
import { Reveal, ScrambleText, useDraggable } from './fx.jsx';

// ── STACK — draggable tech board (icon + affinity stars) ──────────
function Stars({ n }) {
  return (
    <div className="tech-stars" aria-label={n + ' de 5'}>
      {[1, 2, 3, 4, 5].map(i => <span key={i} className={'star' + (i <= n ? ' on' : '')}>★</span>)}
    </div>
  );
}

function TechCard({ tech, pos }) {
  const drag = useDraggable(pos);
  return (
    <div className="tech-card" ref={drag.ref} onPointerDown={drag.onPointerDown}>
      <div className="tech-ico"><i className={tech.icon}></i></div>
      <div className="tech-meta">
        <span className="tech-name">{tech.n}</span>
        <Stars n={tech.stars} />
      </div>
    </div>
  );
}

export function Stack() {
  const { lang } = useL();
  // deterministic scatter layout across the board
  const COLS = 4, GAP_X = 250, GAP_Y = 150, OX = 20, OY = 24;
  const layout = DATA.techs.map((tech, i) => {
    const col = i % COLS, row = Math.floor(i / COLS);
    const jx = ((i * 37) % 40) - 20, jy = ((i * 53) % 32) - 16;
    const rot = (((i * 29) % 14) - 7);
    return { tech, pos: { x: OX + col * GAP_X + jx, y: OY + row * GAP_Y + jy, rot } };
  });
  return (
    <section id="stack" className="sec-pad" style={{ background: 'linear-gradient(180deg, transparent, rgba(143,15,23,.05), transparent)' }}>
      <div className="wrap">
        <Reveal><span className="eyebrow">{t('stack_eye', lang)}</span></Reveal>
        <Reveal delay={1}><h2 className="sec-title"><ScrambleText text={t('stack_title', lang)} /></h2></Reveal>
        <Reveal delay={2}><p className="sec-sub">{t('stack_sub', lang)}</p></Reveal>
        <Reveal delay={2}>
          <div className="tech-stage">
            <span className="tech-hint">{t('stack_hint', lang)}</span>
            {layout.map(({ tech, pos }) => <TechCard key={tech.n} tech={tech} pos={pos} />)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── EXPERIENCE ────────────────────────────────────────────────────
export function Experience() {
  const { lang } = useL();
  const cname = (c) => (typeof c === 'string' ? c : c[lang]);
  return (
    <section id="xp" className="sec-pad">
      <div className="wrap">
        <Reveal><span className="eyebrow">{t('xp_eye', lang)}</span></Reveal>
        <Reveal delay={1}><h2 className="sec-title"><ScrambleText text={t('xp_title', lang)} /></h2></Reveal>
        <div style={{ position: 'relative', marginTop: 44, paddingLeft: 34 }}>
          {/* vertical line */}
          <div style={{ position: 'absolute', left: 9, top: 6, bottom: 6, width: 2,
            background: 'linear-gradient(var(--red), var(--line) 80%)' }} />
          {DATA.xp.map((e, i) => (
            <Reveal key={i} delay={Math.min(i + 1, 3)}>
              <div style={{ position: 'relative', paddingBottom: i < DATA.xp.length - 1 ? 30 : 0 }}>
                {/* node */}
                <span style={{ position: 'absolute', left: -34, top: 4, width: 20, height: 20, borderRadius: '50%',
                  background: 'var(--bg)', border: '2px solid var(--red)', display: 'grid', placeItems: 'center',
                  boxShadow: e.now ? '0 0 16px var(--red)' : 'none' }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: e.now ? 'var(--red)' : 'var(--faint)' }} />
                </span>
                <div className="card" style={{ padding: '22px 24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 14, flexWrap: 'wrap' }}>
                    <div>
                      <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 'clamp(18px,2.4vw,23px)', color: 'var(--white)' }}>{e.role[lang]}</h3>
                      <div style={{ fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--red)', marginTop: 5 }}>{cname(e.company)}</div>
                    </div>
                    <span className="chip" style={{ fontSize: 11.5, borderColor: e.now ? 'var(--line-red)' : 'var(--line)' }}>
                      {e.period}{e.now && <span style={{ color: 'var(--red)' }}>{t('xp_now', lang)}</span>}
                    </span>
                  </div>
                  <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.6, marginTop: 14, maxWidth: 720 }}>{e.desc[lang]}</p>
                  <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
                    {e.tags.map(tg => <span key={tg} className="tag" style={{ border: '1px solid var(--line)', borderRadius: 6, padding: '4px 9px' }}>{tg}</span>)}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── EDUCATION ─────────────────────────────────────────────────────
function initials(name) {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  const stop = ['de', 'da', 'do', 'das', 'dos', 'e', 'of', 'the'];
  return words.filter(w => !stop.includes(w.toLowerCase())).slice(0, 2).map(w => w[0].toUpperCase()).join('');
}

export function Education() {
  const { lang } = useL();
  const val = (c) => (typeof c === 'string' ? c : c[lang]);
  return (
    <section id="edu" className="sec-pad" style={{ background: 'linear-gradient(180deg, transparent, rgba(143,15,23,.05), transparent)' }}>
      <div className="wrap">
        <Reveal><span className="eyebrow">{t('edu_eye', lang)}</span></Reveal>
        <Reveal delay={1}><h2 className="sec-title"><ScrambleText text={t('edu_title', lang)} /></h2></Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 44 }}>
          {DATA.edu.map((e, i) => {
            const school = val(e.school);
            return (
              <Reveal key={i} delay={Math.min(i + 1, 3)}>
                <div className="card" style={{ padding: '22px 22px', display: 'flex', gap: 16, alignItems: 'flex-start', height: '100%' }}>
                  <span style={{ flex: '0 0 auto', width: 46, height: 46, border: '1.5px solid var(--red)', borderRadius: 10, display: 'grid', placeItems: 'center', fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 14, color: 'var(--red)', boxShadow: '0 0 14px rgba(225,29,42,.25)' }}>{initials(school)}</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
                    <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 18, color: 'var(--white)', lineHeight: 1.2 }}>{school}</h3>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--red)', lineHeight: 1.45 }}>{val(e.degree)}</div>
                    <span className="chip" style={{ alignSelf: 'flex-start', fontSize: 11.5, marginTop: 4, borderColor: e.now ? 'var(--line-red)' : 'var(--line)' }}>
                      {e.period}{e.now && <span style={{ color: 'var(--red)' }}>· {t('edu_now', lang)}</span>}
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
