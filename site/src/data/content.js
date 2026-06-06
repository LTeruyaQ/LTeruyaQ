// content.js — i18n dictionary + site content (PT/EN). Placeholder-but-realistic.
// Exports: t(key, lang), DATA, STR.

const STR = {
  // nav
  nav_about:   { pt: 'Sobre',       en: 'About' },
  nav_stack:   { pt: 'Stack',       en: 'Stack' },
  nav_xp:      { pt: 'Trajetória',  en: 'Career' },
  nav_work:    { pt: 'Projetos',    en: 'Work' },
  nav_union:   { pt: 'Ominiosos', en: 'Ominiosos' },
  nav_contact: { pt: 'Contato',     en: 'Contact' },
  cv:          { pt: 'Baixar CV',   en: 'Download CV' },

  // hero
  hero_status: { pt: 'disponível para projetos', en: 'available for projects' },
  hero_l1:     { pt: 'Desenvolvedor', en: 'Fullstack' },
  hero_l2:     { pt: 'Fullstack',     en: 'Developer' },
  hero_typed:  { pt: ['arquiteto sistemas em .NET', 'automatizo tudo que repete', 'do banco de dados à interface', 'escalo na nuvem AWS'],
                 en: ['I architect systems in .NET', 'I automate everything repetitive', 'from database to interface', 'I scale on AWS cloud'] },
  hero_sub:    { pt: 'Construo produtos de ponta a ponta. 5+ anos entregando backend robusto, frontend Angular e infra na nuvem — inclusive para um dos maiores bancos do Brasil.',
                 en: 'I build products end to end. 5+ years shipping robust backends, Angular frontends and cloud infra — including for one of Brazil’s largest banks.' },
  hero_cta1:   { pt: 'Ver projetos',  en: 'View work' },
  hero_cta2:   { pt: 'Falar comigo',  en: 'Get in touch' },
  hero_scroll: { pt: 'role para explorar', en: 'scroll to explore' },

  // about
  about_eye:   { pt: 'whoami',      en: 'whoami' },
  about_title: { pt: 'Engenharia de software, do banco ao pixel.', en: 'Software engineering, from database to pixel.' },
  about_p1:    { pt: 'Sou o Leandro Teruya — desenvolvedor fullstack sênior. Passei por algumas das maiores empresas de tecnologia e finanças do Brasil, entregando sistemas críticos que não podem cair.',
                 en: 'I’m Leandro Teruya — senior fullstack developer. I’ve worked at some of Brazil’s largest tech and finance companies, shipping critical systems that can’t go down.' },
  about_p2:    { pt: 'Aprendo rápido, gosto de arquitetura limpa e automatizo tudo que dá. Do design do sistema ao deploy, do C#/.NET ao Angular, do SQL à AWS.',
                 en: 'Fast learner, fan of clean architecture, and I automate everything I can. From system design to deploy, from C#/.NET to Angular, from SQL to AWS.' },
  stat_years:  { pt: 'anos de experiência', en: 'years of experience' },
  stat_proj:   { pt: 'projetos entregues',  en: 'projects shipped' },
  stat_up:     { pt: 'uptime em produção',  en: 'production uptime' },
  stat_auto:   { pt: 'fluxos automatizados', en: 'automated workflows' },

  // stack
  stack_eye:   { pt: 'tech stack',  en: 'tech stack' },
  stack_title: { pt: 'Ferramentas que eu domino.', en: 'Tools I master.' },
  stack_sub:   { pt: 'Cada tecnologia com meu nível de afinidade. Arraste os cards — monte o board do seu jeito.', en: 'Each technology with my affinity level. Drag the cards — arrange the board your way.' },
  stack_hint:  { pt: '✦ arraste os cards livremente', en: '✦ drag the cards freely' },

  // experience
  xp_eye:   { pt: 'git log --career', en: 'git log --career' },
  xp_title: { pt: 'Trajetória.', en: 'Career.' },
  xp_now:   { pt: 'atual', en: 'now' },

  // work
  work_eye:   { pt: 'projetos',  en: 'featured work' },
  work_title: { pt: 'Coisas que eu construí.', en: 'Things I built.' },
  work_repo:  { pt: 'Repositório', en: 'Repo' },
  work_live:  { pt: 'Ao vivo',     en: 'Live' },
  work_drag:  { pt: 'arraste o carrossel — ou role na lateral', en: 'drag the carousel — or scroll sideways' },

  // photo wall
  pw_eye:   { pt: 'bastidores', en: 'behind the scenes' },
  pw_title: { pt: 'Por trás do código.', en: 'Behind the code.' },
  pw_hint:  { pt: '✦ arraste as fotos — bagunce à vontade', en: '✦ drag the photos around — make a mess' },

  // ominiosos (side venture)
  bu_eye:   { pt: 'side venture', en: 'side venture' },
  bu_title: { pt: 'Ominiosos', en: 'Ominiosos' },
  bu_sub:   { pt: 'Meu estúdio próprio de software — onde eu transformo ideias em produtos, do protótipo ao deploy.', en: 'My own software studio — where I turn ideas into products, from prototype to deploy.' },
  bu_cta:   { pt: 'Conhecer a Ominiosos', en: 'Explore Ominiosos' },

  // contact
  ct_eye:   { pt: 'contato', en: 'get in touch' },
  ct_title: { pt: 'Vamos construir algo.', en: 'Let’s build something.' },
  ct_sub:   { pt: 'Recrutando ou com um projeto em mente? Me chama — respondo rápido.', en: 'Recruiting or have a project in mind? Reach out — I reply fast.' },
  ct_name:  { pt: 'nome',     en: 'name' },
  ct_email: { pt: 'email',    en: 'email' },
  ct_msg:   { pt: 'mensagem', en: 'message' },
  ct_send:  { pt: 'Enviar mensagem', en: 'Send message' },
  ct_or:    { pt: 'ou pelos canais diretos', en: 'or through direct channels' },
  foot_made:{ pt: 'Construído com café e .NET', en: 'Built with coffee and .NET' },
};

export const t = (k, lang) => (STR[k] ? STR[k][lang] : k);

export const DATA = {
  // skills — flat tech board (icon + affinity stars), draggable
  techs: [
    { n: 'C#',         icon: 'devicon-csharp-plain colored',            stars: 5 },
    { n: '.NET',       icon: 'devicon-dotnetcore-plain colored',        stars: 5 },
    { n: 'Angular',    icon: 'devicon-angularjs-plain colored',         stars: 5 },
    { n: 'TypeScript', icon: 'devicon-typescript-plain colored',        stars: 5 },
    { n: 'Git',        icon: 'devicon-git-plain colored',               stars: 5 },
    { n: 'AWS',        icon: 'devicon-amazonwebservices-plain-wordmark colored', stars: 4 },
    { n: 'Docker',     icon: 'devicon-docker-plain colored',            stars: 4 },
    { n: 'Node.js',    icon: 'devicon-nodejs-plain colored',            stars: 4 },
    { n: 'NestJS',     icon: 'devicon-nestjs-plain colored',            stars: 4 },
    { n: 'SQL Server', icon: 'devicon-microsoftsqlserver-plain',        stars: 4 },
    { n: 'PostgreSQL', icon: 'devicon-postgresql-plain colored',        stars: 4 },
    { n: 'Python',     icon: 'devicon-python-plain colored',            stars: 4 },
    { n: 'Java',       icon: 'devicon-java-plain colored',              stars: 4 },
    { n: 'Linux',      icon: 'devicon-linux-plain colored',             stars: 4 },
    { n: 'Flutter',    icon: 'devicon-flutter-plain colored',           stars: 3 },
    { n: 'Redis',      icon: 'devicon-redis-plain colored',             stars: 3 },
  ],
  xp: [
    { role: { pt: 'Engenheiro de Software Pleno', en: 'Software Engineer (Mid-level)' }, company: 'Rede (Itaú)',
      period: 'mai 2025 — ', now: true, tags: ['.NET', 'Angular', 'AWS'],
      desc: { pt: 'Engenharia de software em tempo integral na Rede (grupo Itaú), modelo híbrido em São Paulo. Atuação em sistemas de pagamentos e meios de captura.',
              en: 'Full-time software engineering at Rede (Itaú group), hybrid in São Paulo. Working on payments and card-acquiring systems.' } },
    { role: { pt: 'Engenheiro de Software Júnior', en: 'Junior Software Engineer' }, company: 'Itaú Unibanco',
      period: 'abr 2023 — jun 2025', tags: ['C#', '.NET', 'SQL'],
      desc: { pt: 'Desenvolvimento de sistemas críticos de banking. Quase 3 anos no Itaú, evoluindo de estagiário a engenheiro pleno.',
              en: 'Built critical banking systems. Nearly 3 years at Itaú, growing from intern to mid-level engineer.' } },
    { role: { pt: 'Estagiário de Engenharia de Software', en: 'Software Engineering Intern' }, company: 'Itaú Unibanco',
      period: 'set 2022 — abr 2023', tags: ['C#', 'JavaScript'],
      desc: { pt: 'Início no Itaú como estagiário, atuando com C#, JavaScript e mais. Efetivado como engenheiro júnior.',
              en: 'Started at Itaú as an intern working with C#, JavaScript and more. Converted to junior engineer.' } },
    { role: { pt: 'Desenvolvedor Júnior', en: 'Junior Developer' }, company: '4WORLD Consultoria',
      period: 'jan 2022 — set 2022', tags: ['C#', 'JavaScript'],
      desc: { pt: 'Desenvolvedor terceirizado em São Paulo, entregando soluções para clientes da consultoria.',
              en: 'Outsourced developer in São Paulo, delivering solutions for the consultancy’s clients.' } },
    { role: { pt: 'Suporte e Desenvolvimento', en: 'Support & Development' }, company: '4WORLD Consultoria',
      period: 'jun 2021 — jan 2022', tags: ['Suporte', 'Dev'],
      desc: { pt: 'Primeira experiência profissional (estágio): suporte e desenvolvimento, onde aprendi a base do dia a dia de engenharia.',
              en: 'First professional experience (internship): support and development, where I learned the engineering day-to-day.' } },
  ],
  work: [
    { n: { pt: 'Plataforma de Pagamentos', en: 'Payments Platform' }, stack: ['.NET', 'AWS', 'SQL'], tag: { pt: 'Banking', en: 'Banking' },
      d: { pt: 'Núcleo transacional de alta disponibilidade processando milhares de operações por segundo.',
           en: 'High-availability transactional core processing thousands of operations per second.' } },
    { n: { pt: 'Painel de Observabilidade', en: 'Observability Dashboard' }, stack: ['Angular', 'RxJS', 'Node'], tag: { pt: 'Frontend', en: 'Frontend' },
      d: { pt: 'Dashboard em tempo real de métricas e logs, com alertas automatizados.',
           en: 'Real-time metrics and logs dashboard with automated alerting.' } },
    { n: { pt: 'App Mobile Fintech', en: 'Fintech Mobile App' }, stack: ['Flutter', 'NestJS', 'Postgres'], tag: { pt: 'Mobile', en: 'Mobile' },
      d: { pt: 'Aplicativo multiplataforma com backend próprio e autenticação segura.',
           en: 'Cross-platform app with its own backend and secure authentication.' } },
    { n: { pt: 'Pipeline de CI/CD', en: 'CI/CD Pipeline' }, stack: ['Docker', 'AWS', 'Linux'], tag: { pt: 'DevOps', en: 'DevOps' },
      d: { pt: 'Esteira de deploy automatizada com testes, build e rollback em minutos.',
           en: 'Automated deploy pipeline with tests, build and rollback in minutes.' } },
    { n: { pt: 'Motor de Regras', en: 'Rules Engine' }, stack: ['C#', '.NET', 'Redis'], tag: { pt: 'Backend', en: 'Backend' },
      d: { pt: 'Engine configurável de regras de negócio para decisões de crédito em tempo real.',
           en: 'Configurable business-rules engine for real-time credit decisions.' } },
    { n: { pt: 'Design System Interno', en: 'Internal Design System' }, stack: ['Angular', 'Storybook', 'CSS'], tag: { pt: 'Frontend', en: 'Frontend' },
      d: { pt: 'Biblioteca de componentes compartilhada entre múltiplos times e produtos.',
           en: 'Shared component library across multiple teams and products.' } },
  ],
  photos: [
    { cap: { pt: 'no code', en: 'on code' }, x: 40,  y: 60,  rot: -7 },
    { cap: { pt: 'palco / talk', en: 'on stage' }, x: 260, y: 30,  rot: 5 },
    { cap: { pt: 'setup', en: 'the setup' }, x: 500, y: 80,  rot: -4 },
    { cap: { pt: 'time', en: 'the team' }, x: 150, y: 250, rot: 8 },
    { cap: { pt: 'deploy day', en: 'deploy day' }, x: 420, y: 280, rot: -9 },
    { cap: { pt: 'café & .NET', en: 'coffee & .NET' }, x: 660, y: 230, rot: 6 },
  ],
  social: [
    { k: 'GitHub',   h: 'https://github.com/LTeruyaQ' },
    { k: 'LinkedIn', h: 'https://www.linkedin.com/in/leandro-teruya-de-queiroz-014514181' },
    { k: 'Email',    h: 'mailto:lteruya.queiroz@gmail.com' },
    { k: 'Discord',  h: 'https://discord.gg/WnCXbauur7' },
  ],
};

export { STR };
