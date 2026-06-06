// sections3.jsx — Work (Netflix carousel), Badge Union, Contact / Footer
import React from 'react';
import { useL } from '../lib/LangContext.jsx';
import { t, DATA } from '../data/content.js';
import { Reveal, MagneticCard, GlitchText, ScrambleText } from './fx.jsx';

// ── WORK — Netflix-style draggable carousel ───────────────────────
export function Work() {
  const { lang } = useL();
  const rowRef = React.useRef(null);
  const drag = React.useRef({ down: false, sx: 0, sl: 0, moved: false });

  const scrollBy = (dir) => {
    const el = rowRef.current; if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 700), behavior: 'smooth' });
  };
  const onDown = (e) => {
    const el = rowRef.current; drag.current = { down: true, sx: e.clientX, sl: el.scrollLeft, moved: false };
    el.style.cursor = 'grabbing'; el.style.scrollSnapType = 'none';
  };
  const onMove = (e) => {
    if (!drag.current.down) return;
    const el = rowRef.current; const dx = e.clientX - drag.current.sx;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    el.scrollLeft = drag.current.sl - dx;
  };
  const onUp = () => {
    const el = rowRef.current; if (!el) return;
    drag.current.down = false; el.style.cursor = 'grab'; el.style.scrollSnapType = 'x mandatory';
  };

  return (
    <section id="work" className="sec-pad" style={{ background: 'linear-gradient(180deg, transparent, rgba(143,15,23,.05), transparent)' }}>
      <div className="wrap">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <Reveal><span className="eyebrow">{t('work_eye', lang)}</span></Reveal>
            <Reveal delay={1}><h2 className="sec-title"><ScrambleText text={t('work_title', lang)} /></h2></Reveal>
          </div>
          <Reveal delay={2}>
            <div className="nf-arrows">
              <button className="nf-arrow" onClick={() => scrollBy(-1)} aria-label="prev">‹</button>
              <button className="nf-arrow" onClick={() => scrollBy(1)} aria-label="next">›</button>
            </div>
          </Reveal>
        </div>
        <Reveal delay={2}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--faint)', marginTop: 14, letterSpacing: '.06em' }}>{t('work_drag', lang)}</div>
        </Reveal>
      </div>
      {/* full-bleed row */}
      <div style={{ marginTop: 26 }}>
        <div className="wrap" style={{ paddingRight: 0 }}>
          <div className="nf-row" ref={rowRef} style={{ cursor: 'grab' }}
            onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}
            onClickCapture={(e) => { if (drag.current.moved) { e.preventDefault(); e.stopPropagation(); } }}>
            {DATA.work.map((p, i) => (
              <div className="nf-card" key={i}>
                <MagneticCard style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ position: 'relative', height: 170, background: 'repeating-linear-gradient(135deg, #161616 0 14px, #131313 14px 28px)', overflow: 'hidden', borderBottom: '1px solid var(--line)' }}>
                    <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: 52, fontWeight: 700, color: 'rgba(225,29,42,.32)' }}>{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <span style={{ position: 'absolute', top: 12, left: 12, fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--faint)' }}>./project</span>
                    <span style={{ position: 'absolute', top: 12, right: 12, fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: '#fff', background: 'var(--red)', padding: '3px 8px', borderRadius: 5 }}>{p.tag[lang]}</span>
                  </div>
                  <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                    <h3 style={{ fontFamily: 'var(--sans)', fontWeight: 600, fontSize: 20, color: 'var(--white)' }}>{p.n[lang]}</h3>
                    <p style={{ color: 'var(--muted)', fontSize: 14.5, lineHeight: 1.6, flex: 1 }}>{p.d[lang]}</p>
                    <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                      {p.stack.map(s => <span key={s} className="tag" style={{ border: '1px solid var(--line)', borderRadius: 6, padding: '4px 9px' }}>{s}</span>)}
                    </div>
                    <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                      <a href="#" className="btn" style={{ flex: 1, justifyContent: 'center', padding: '10px' }} onClick={(e) => e.preventDefault()}>{t('work_repo', lang)}</a>
                      <a href="#" className="btn btn-red" style={{ flex: 1, justifyContent: 'center', padding: '10px' }} onClick={(e) => e.preventDefault()}>{t('work_live', lang)} <span className="arw">↗</span></a>
                    </div>
                  </div>
                </MagneticCard>
              </div>
            ))}
            <div className="nf-card" style={{ flexBasis: 1 }} aria-hidden="true"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── BADGE UNION ───────────────────────────────────────────────────
export function BadgeUnion() {
  const { lang } = useL();
  return (
    <section id="union" className="sec-pad">
      <div className="wrap">
        <Reveal>
          <div className="card om-card" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
            <div className="om-glow" style={{ position: 'absolute', inset: 0 }} />
            <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,.9fr)', gap: 30, padding: 'clamp(28px,4vw,52px)', alignItems: 'center' }} className="bu-grid">
              <div>
                <span className="eyebrow om-eyebrow">{t('bu_eye', lang)}</span>
                <h2 style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 'clamp(34px,5vw,58px)', letterSpacing: '-.02em', margin: '16px 0 0', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                  <span style={{ width: 52, height: 52, border: '2px solid var(--om-yellow)', borderRadius: 12, display: 'grid', placeItems: 'center', fontFamily: 'var(--mono)', fontSize: 20, fontWeight: 700, color: 'var(--om-yellow)', boxShadow: '0 0 22px rgba(255,195,0,.4)' }}>OM</span>
                  <GlitchText className="om-title">{t('bu_title', lang)}</GlitchText>
                </h2>
                <p className="sec-sub" style={{ maxWidth: 540 }}>{t('bu_sub', lang)}</p>
                <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); }} className="btn btn-om" style={{ marginTop: 26 }}>{t('bu_cta', lang)} <span className="arw">→</span></a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {(lang === 'en'
                  ? [['hobbies', '+', 'code'], ['dreams', '→', 'reality'], ['passion', '→', 'product']]
                  : [['hobbies', '+', 'código'], ['sonhos', '→', 'realidade'], ['paixão', '→', 'produto']]
                ).map((row, ri) => (
                  <div key={ri} style={{ display: 'flex', gap: 10 }}>
                    {row.map((c, ci) => (
                      <span key={ci} className="chip" style={{ flex: 1, justifyContent: 'center', fontSize: 12, background: '#0e0e0e' }}>{c}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── CONTACT / FOOTER ──────────────────────────────────────────────
export function Contact() {
  const { lang } = useL();
  const field = { fontFamily: 'var(--mono)', fontSize: 14, color: 'var(--white)', background: '#0e0e0e',
    border: '1px solid var(--line)', borderRadius: 9, padding: '13px 14px', width: '100%', outline: 'none', transition: 'border-color .2s' };
  const lab = { fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 7, display: 'block' };
  const onFocus = (e) => e.target.style.borderColor = 'var(--red)';
  const onBlur = (e) => e.target.style.borderColor = 'var(--line)';
  return (
    <section id="contact" className="sec-pad">
      <div className="wrap">
        <Reveal><span className="eyebrow">{t('ct_eye', lang)}</span></Reveal>
        <Reveal delay={1}><h2 className="sec-title"><ScrambleText text={t('ct_title', lang)} /></h2></Reveal>
        <Reveal delay={2}><p className="sec-sub">{t('ct_sub', lang)}</p></Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.2fr) minmax(0,.8fr)', gap: 40, marginTop: 40 }} className="ct-grid">
          <Reveal delay={2}>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="ct-row">
                <div><label style={lab}>{t('ct_name', lang)}</label><input style={field} onFocus={onFocus} onBlur={onBlur} /></div>
                <div><label style={lab}>{t('ct_email', lang)}</label><input style={field} onFocus={onFocus} onBlur={onBlur} /></div>
              </div>
              <div><label style={lab}>{t('ct_msg', lang)}</label><textarea rows="5" style={{ ...field, resize: 'vertical' }} onFocus={onFocus} onBlur={onBlur} /></div>
              <button type="submit" className="btn btn-red" style={{ alignSelf: 'flex-start', padding: '13px 24px' }}>{t('ct_send', lang)} <span className="arw">→</span></button>
            </form>
          </Reveal>
          <Reveal delay={3}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--faint)' }}>{t('ct_or', lang)}</span>
              {DATA.social.map(s => (
                <a key={s.k} href={s.h} target="_blank" rel="noreferrer" className="card" style={{ padding: '15px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 14 }}>
                  <span>{s.k}</span><span style={{ color: 'var(--red)' }}>↗</span>
                </a>
              ))}
            </div>
          </Reveal>
        </div>
        {/* footer */}
        <div style={{ marginTop: 70, paddingTop: 26, borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 12.5, color: 'var(--white)' }}>leandro<span style={{ color: 'var(--red)' }}>.</span>teruya</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11.5, color: 'var(--faint)' }}>{t('foot_made', lang)} · © 2026</span>
        </div>
      </div>
    </section>
  );
}
