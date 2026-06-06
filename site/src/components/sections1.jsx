// sections1.jsx — Nav, Hero, About, KineticStrip
import React from 'react';
import { useL } from '../lib/LangContext.jsx';
import { t, DATA } from '../data/content.js';
import { Reveal, Typewriter, Counter, GlitchText, ScrambleText, Marquee } from './fx.jsx';

// ── NAV ───────────────────────────────────────────────────────────
export function Nav({ fun, setFun }) {
  const { lang, setLang } = useL();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const f = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', f); return () => window.removeEventListener('scroll', f);
  }, []);
  const links = [['about', 'nav_about'], ['stack', 'nav_stack'], ['xp', 'nav_xp'], ['edu', 'nav_edu'], ['work', 'nav_work'], ['union', 'nav_union'], ['contact', 'nav_contact']];
  const go = (id) => { setOpen(false); const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(10,10,10,.82)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      transition: 'all .3s var(--ease)' }}>
      <div className="wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>
        <a href="#top" onClick={(e) => { e.preventDefault(); go('top'); }} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 30, height: 30, border: '1.5px solid var(--red)', borderRadius: 7, display: 'grid', placeItems: 'center', fontFamily: 'var(--mono)', fontWeight: 700, fontSize: 13, color: 'var(--red)', boxShadow: '0 0 14px rgba(225,29,42,.35)' }}>LT</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--white)', letterSpacing: '.02em' }}>leandro<span style={{ color: 'var(--red)' }}>.</span>teruya</span>
        </a>

        <nav className="nav-links" style={{ display: 'flex', gap: 26, alignItems: 'center' }}>
          {links.map(([id, k]) => (
            <a key={id} href={'#' + id} onClick={(e) => { e.preventDefault(); go(id); }}
              className="navlink" style={{ fontFamily: 'var(--mono)', fontSize: 12.5, color: 'var(--muted)', transition: 'color .2s', position: 'relative' }}>
              {t(k, lang)}
            </a>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', border: '1px solid var(--line)', borderRadius: 7, overflow: 'hidden' }}>
            {['pt', 'en'].map(lg => (
              <button key={lg} onClick={() => setLang(lg)} style={{
                fontFamily: 'var(--mono)', fontSize: 11.5, fontWeight: 600, padding: '6px 10px', border: 'none',
                background: lang === lg ? 'var(--red)' : 'transparent', color: lang === lg ? '#fff' : 'var(--muted)',
                transition: 'all .2s' }}>{lg.toUpperCase()}</button>
            ))}
          </div>
          <button className="btn btn-red cv-btn" style={{ padding: '9px 14px' }}>{t('cv', lang)}</button>
          <button className="intro-btn fun-toggle" aria-pressed={fun}
            title={t(fun ? 'fun_on_title' : 'fun_off_title', lang)}
            aria-label={t(fun ? 'fun_on_title' : 'fun_off_title', lang)}
            onClick={() => setFun(f => !f)}>{fun ? '😄' : '😐'}</button>
          <button className="menu-btn" onClick={() => setOpen(o => !o)} style={{ display: 'none', background: 'transparent', border: '1px solid var(--line)', borderRadius: 7, width: 38, height: 36, color: 'var(--white)', fontSize: 18 }}>{open ? '✕' : '≡'}</button>
        </div>
      </div>

      {/* mobile drawer */}
      <div style={{ display: open ? 'block' : 'none', borderTop: '1px solid var(--line)', background: 'rgba(10,10,10,.97)' }}>
        <div className="wrap" style={{ padding: '16px 28px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {links.map(([id, k]) => (
            <a key={id} href={'#' + id} onClick={(e) => { e.preventDefault(); go(id); }}
              style={{ fontFamily: 'var(--mono)', fontSize: 15, color: 'var(--white)', padding: '11px 0', borderBottom: '1px solid var(--line)' }}>{t(k, lang)}</a>
          ))}
          <button className="btn btn-red" style={{ marginTop: 12, justifyContent: 'center' }}>{t('cv', lang)}</button>
        </div>
      </div>
    </header>
  );
}

// ── HERO (Lando-style: full-bleed background image behind title) ──
export function Hero({ heroSrc }) {
  const { lang } = useL();
  return (
    <section id="top" className="hero-lando">
      {/* full-bleed background image */}
      <div className="hero-bg">
        {heroSrc && <img src={heroSrc} alt="Leandro Teruya" />}
        <div className="hero-bg-grad"></div>
        <div className="hero-bg-grid"></div>
      </div>

      <div className="wrap hero-lando-inner">
        <Reveal>
          <span className="chip" style={{ borderColor: 'var(--line-red)' }}>
            <span className="dot" style={{ boxShadow: '0 0 8px var(--red)', animation: 'blink 1.6s steps(1) infinite' }} />
            {t('hero_status', lang)}
          </span>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="hero-name">
            <GlitchText as="span" style={{ display: 'block' }}>{t('hero_l1', lang)}</GlitchText>
            <GlitchText as="span" style={{ display: 'block', color: 'var(--red)' }}>{t('hero_l2', lang)}</GlitchText>
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <div style={{ marginTop: 18, fontSize: 'clamp(15px,2.2vw,20px)', minHeight: 30, fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
            <span style={{ color: 'var(--faint)' }}>$ </span>
            <Typewriter words={t('hero_typed', lang)} />
          </div>
        </Reveal>
        <Reveal delay={3}>
          <p style={{ marginTop: 20, maxWidth: 520, color: 'var(--muted)', fontSize: 16.5, lineHeight: 1.65 }}>{t('hero_sub', lang)}</p>
        </Reveal>
        <Reveal delay={4}>
          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <a className="btn btn-red" href="#work" onClick={(e) => { e.preventDefault(); document.getElementById('work').scrollIntoView({ behavior: 'smooth' }); }}>
              {t('hero_cta1', lang)} <span className="arw">→</span>
            </a>
            <a className="btn" href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); }}>
              {t('hero_cta2', lang)}
            </a>
          </div>
        </Reveal>
        <Reveal delay={5}>
          <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
            {DATA.social.map(s => (
              <a key={s.k} href={s.h} target="_blank" rel="noreferrer" className="chip" style={{ fontSize: 11.5 }} title={s.k}>{s.k}</a>
            ))}
          </div>
        </Reveal>
      </div>

      {/* floating terminal, lower-right */}
      <Reveal delay={3} className="hero-term-corner">
        <TerminalCard />
      </Reveal>

      {/* scroll cue */}
      <div style={{ position: 'absolute', bottom: 26, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: 'var(--faint)', zIndex: 3 }}>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, letterSpacing: '.18em', textTransform: 'uppercase' }}>{t('hero_scroll', lang)}</span>
        <span style={{ width: 1, height: 34, background: 'linear-gradient(var(--red), transparent)' }} />
      </div>
    </section>
  );
}

// fake live terminal in hero
function TerminalCard() {
  const lines = [
    { p: '$', t: 'whoami', c: 'var(--white)' },
    { p: '>', t: 'leandro_teruya — fullstack engineer', c: 'var(--muted)' },
    { p: '$', t: 'cat stack.json', c: 'var(--white)' },
    { p: '', t: '{ "core": ".NET", "front": "Angular",', c: 'var(--red)' },
    { p: '', t: '  "cloud": "AWS", "mobile": "Flutter" }', c: 'var(--red)' },
    { p: '$', t: 'deploy --prod', c: 'var(--white)' },
    { p: '✓', t: 'build passed · 0 errors', c: '#3ddc84' },
    { p: '✓', t: 'shipped to production', c: '#3ddc84' },
  ];
  return (
    <div className="card" style={{ padding: 0, background: '#0d0d0d', boxShadow: '0 30px 80px rgba(0,0,0,.6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '12px 14px', borderBottom: '1px solid var(--line)' }}>
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
        <span style={{ marginLeft: 'auto', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--faint)' }}>~/leandro — zsh</span>
      </div>
      <div style={{ padding: '16px 18px', fontFamily: 'var(--mono)', fontSize: 13, lineHeight: 1.9 }}>
        {lines.map((l, i) => (
          <div key={i} className="term-line" style={{ animationDelay: (i * 0.35 + 0.6) + 's' }}>
            <span style={{ color: 'var(--red)', marginRight: 8 }}>{l.p}</span>
            <span style={{ color: l.c }}>{l.t}</span>
          </div>
        ))}
        <div className="term-line" style={{ animationDelay: '3.4s' }}>
          <span style={{ color: 'var(--red)', marginRight: 8 }}>$</span><span className="caret" />
        </div>
      </div>
    </div>
  );
}

// ── ABOUT ─────────────────────────────────────────────────────────
export function About() {
  const { lang } = useL();
  const stats = [
    { to: 5, suffix: '+', k: 'stat_years' },
    { to: 40, suffix: '+', k: 'stat_proj' },
    { to: 99.9, suffix: '%', k: 'stat_up', dec: 1 },
    { to: 120, suffix: '+', k: 'stat_auto' },
  ];
  return (
    <section id="about" className="sec-pad">
      <div className="wrap">
        <Reveal><span className="eyebrow">{t('about_eye', lang)}</span></Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,.9fr)', gap: 48, marginTop: 18, alignItems: 'start' }} className="about-grid">
          <div>
            <Reveal delay={1}><h2 className="sec-title"><ScrambleText text={t('about_title', lang)} /></h2></Reveal>
            <Reveal delay={2}><p className="sec-sub" style={{ maxWidth: 600 }}>{t('about_p1', lang)}</p></Reveal>
            <Reveal delay={3}><p className="sec-sub" style={{ maxWidth: 600 }}>{t('about_p2', lang)}</p></Reveal>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {stats.map((s, i) => (
              <Reveal key={s.k} delay={i + 1}>
                <div className="card" style={{ padding: '22px 20px' }}>
                  <div style={{ fontFamily: 'var(--sans)', fontWeight: 700, fontSize: 'clamp(32px,4vw,44px)', color: 'var(--white)', lineHeight: 1 }}>
                    <Counter to={s.to} suffix={s.suffix} decimals={s.dec || 0} />
                  </div>
                  <div style={{ marginTop: 10, fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)' }}>{t(s.k, lang)}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── KINETIC STRIP (landonorris-style marquee bands) ───────────────
export function KineticStrip() {
  const a = ['Fullstack Developer', '.NET', 'Angular', 'AWS', 'System Design'];
  const b = ['Automation', 'DevOps', 'Flutter', 'SQL', 'Clean Architecture'];
  return (
    <div className="kin" aria-hidden="true">
      <Marquee items={a} speed={28} />
      <Marquee items={b} ghost reverse speed={34} />
    </div>
  );
}
