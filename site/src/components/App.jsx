// App.jsx — assemble the portfolio app (single React island).
import React from 'react';
import { L } from '../lib/LangContext.jsx';
import { BootSequence } from './Boot.jsx';
import { ParticleField } from './fx.jsx';
import { Nav, Hero, About, KineticStrip } from './sections1.jsx';
import { Stack, Experience } from './sections2.jsx';
import { Work, BadgeUnion, Contact } from './sections3.jsx';

export default function App({ heroSrc }) {
  const [lang, setLang] = React.useState(() =>
    (typeof localStorage !== 'undefined' && localStorage.getItem('lt_lang')) || 'pt');
  const [booting, setBooting] = React.useState(() =>
    typeof sessionStorage === 'undefined' ? true : !sessionStorage.getItem('lt_booted'));

  React.useEffect(() => {
    localStorage.setItem('lt_lang', lang);
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

  React.useEffect(() => { if (booting) document.body.classList.add('booting'); }, []);

  React.useEffect(() => {
    const replay = () => { document.body.classList.add('booting'); window.scrollTo(0, 0); setBooting(true); };
    window.addEventListener('lt-replay-intro', replay);
    return () => window.removeEventListener('lt-replay-intro', replay);
  }, []);

  const endBoot = () => { sessionStorage.setItem('lt_booted', '1'); setBooting(false); };

  return (
    <L.Provider value={{ lang, setLang }}>
      {booting && <BootSequence onDone={endBoot} />}
      <ParticleField />
      <div className="fx-overlay" />
      <div className="fx-scanbar" />
      <Nav />
      <main>
        <Hero heroSrc={heroSrc} />
        <KineticStrip />
        <About />
        <Stack />
        <Experience />
        <Work />
        <BadgeUnion />
        <Contact />
      </main>
    </L.Provider>
  );
}
