# 🎨 Prompt para gerar os Wireframes do Portfólio (Claude)

Este arquivo contém um **prompt pronto para colar no Claude** (claude.ai / Artifacts) e gerar os
wireframes do site de portfólio do Leandro Teruya.

## Como usar

1. Abra uma nova conversa no [claude.ai](https://claude.ai).
2. Copie **todo o bloco "PROMPT (PT-BR)"** abaixo e cole na conversa.
3. O Claude vai (idealmente) fazer algumas perguntas e então gerar um **Artifact** com os wireframes.
4. Itere: peça ajustes em seções específicas ("refaça só o Hero", "deixe o mobile mais compacto", etc.).
5. Para a versão em inglês, use a seção **"PROMPT (EN)"** ou peça ao Claude para traduzir o conteúdo.

> 💡 Dica: comece pedindo **baixa fidelidade** (caixas e rótulos). Só depois de aprovar a estrutura
> peça média/alta fidelidade com cores e tipografia.

---

## PROMPT (PT-BR)

```text
Você é um designer de produto sênior especializado em UI/UX para sites pessoais.
Seu objetivo é criar WIREFRAMES (baixa-para-média fidelidade) para o site de portfólio
de um desenvolvedor. Produza o resultado como um ARTIFACT em HTML/CSS único e
responsivo, representando blocos, rótulos e hierarquia (não precisa de design final).

## Sobre a pessoa
- Nome: Leandro Teruya de Queiroz.
- Cargo: Desenvolvedor Fullstack (sênior).
- Stacks principais: C#/.NET, Angular, AWS/Cloud, SQL, Flutter, Java, Python, Node/NestJS.
- Também atua com: DevOps, design de sistemas e arquitetura de software.
- Diferenciais: já trabalhou em algumas das maiores empresas de tecnologia do Brasil;
  aprende rápido; gosta de automatizar tudo.
- Personalidade: cultura geek (RPG, jogos, filmes, livros) — pode aparecer de forma sutil.

## Objetivo do site
- Apresentar Leandro para RECRUTADORES e CLIENTES de forma profissional e memorável.
- Bilíngue PT/EN (preveja um seletor de idioma no header).
- Tema DARK como padrão, com vibe moderna/tech (roxo/violeta como cor de destaque,
  alinhado ao tema "radical" do GitHub). Considere também um modo claro opcional.
- Responsivo: entregue wireframe para DESKTOP e para MOBILE de cada seção.

## Seções a wireframar (nesta ordem)
1. Header/Nav: logo/nome, links (Sobre, Skills, Experiência, Projetos, Contato),
   seletor de idioma PT/EN, toggle de tema, botão "Download CV".
2. Hero: nome, headline ("Fullstack Developer"), subheadline curta, 2 CTAs
   ("Ver projetos" e "Falar comigo"), links sociais (GitHub, LinkedIn, Email, Discord).
3. Sobre: foto/avatar + bio resumida + lista de destaques (anos de experiência, principais
   forças). Tom profissional com um toque geek discreto.
4. Skills / Tech Stack: agrupado por categorias (Linguagens, Frontend, Backend, Mobile,
   Cloud & DevOps, Banco de dados, Ferramentas) usando ícones/badges.
5. Experiência: timeline vertical (empresa, cargo, período, principais entregas).
6. Projetos em destaque: grid de cards (thumbnail, título, stack usada, descrição curta,
   links "Repo" e "Live"). Mostre 3 cards de exemplo.
7. (Opcional) Depoimentos: 1-2 cards de citação.
8. Contato / Footer: formulário simples (nome, email, mensagem) OU CTA de email,
   links sociais, copyright.

## Entregáveis
- Para CADA seção, mostre o layout DESKTOP e o layout MOBILE (pode ser lado a lado ou
  empilhado, com rótulos "Desktop" e "Mobile").
- Use placeholders de texto e blocos cinza para imagens.
- Adicione anotações curtas explicando a intenção de cada seção e a hierarquia visual.
- No final, sugira: paleta de cores (com hex), 1 fonte para títulos e 1 para corpo,
  e princípios de espaçamento.

## Restrições e formato
- Entregue como UM artifact HTML autocontido (estilos inline ou <style> no topo).
- Mantenha baixa fidelidade: foco em estrutura, não em pixel-perfect.
- Use conteúdo de exemplo realista em PT (posso pedir a versão EN depois).
- Garanta acessibilidade básica (contraste, ordem de leitura lógica).

## Antes de começar
Me faça até 3 perguntas de esclarecimento SE algo essencial estiver ambíguo
(ex.: incluir formulário ou só email? quantos projetos destacar?). Caso contrário,
pode gerar a primeira versão direto e eu itero a partir dela.
```

---

## PROMPT (EN)

```text
You are a senior product designer specialized in UI/UX for personal websites.
Your goal is to create WIREFRAMES (low-to-mid fidelity) for a developer's portfolio
website. Produce the result as a single, responsive HTML/CSS ARTIFACT showing blocks,
labels and hierarchy (final visual design is not required).

## About the person
- Name: Leandro Teruya de Queiroz.
- Role: Fullstack Developer (senior).
- Core stacks: C#/.NET, Angular, AWS/Cloud, SQL, Flutter, Java, Python, Node/NestJS.
- Also works with: DevOps, systems design and software architecture.
- Highlights: has worked at some of the largest tech companies in Brazil; fast learner;
  loves automating everything.
- Personality: geek culture (RPG, games, movies, books) — can show up subtly.

## Site goal
- Present Leandro to RECRUITERS and CLIENTS in a professional, memorable way.
- Bilingual PT/EN (include a language switcher in the header).
- DARK theme by default, modern/tech vibe (purple/violet accent, matching the GitHub
  "radical" theme). Optional light mode.
- Responsive: deliver DESKTOP and MOBILE wireframes for every section.

## Sections to wireframe (in this order)
1. Header/Nav: logo/name, links (About, Skills, Experience, Projects, Contact),
   PT/EN language switcher, theme toggle, "Download CV" button.
2. Hero: name, headline ("Fullstack Developer"), short subheadline, 2 CTAs
   ("View projects" and "Get in touch"), social links (GitHub, LinkedIn, Email, Discord).
3. About: photo/avatar + short bio + highlights list (years of experience, key strengths).
4. Skills / Tech Stack: grouped by categories (Languages, Frontend, Backend, Mobile,
   Cloud & DevOps, Databases, Tools) using icons/badges.
5. Experience: vertical timeline (company, role, period, key deliverables).
6. Featured projects: grid of cards (thumbnail, title, stack, short description,
   "Repo" and "Live" links). Show 3 sample cards.
7. (Optional) Testimonials: 1-2 quote cards.
8. Contact / Footer: simple form (name, email, message) OR email CTA, social links, copyright.

## Deliverables
- For EACH section, show the DESKTOP and MOBILE layout (side by side or stacked, labeled).
- Use text placeholders and gray blocks for images.
- Add short annotations explaining the intent and visual hierarchy of each section.
- At the end, suggest: a color palette (with hex), 1 heading font + 1 body font,
  and spacing principles.

## Constraints and format
- Deliver as ONE self-contained HTML artifact (inline styles or a <style> block).
- Keep it low fidelity: focus on structure, not pixel-perfect.
- Use realistic sample content in English.
- Ensure basic accessibility (contrast, logical reading order).

## Before you start
Ask me up to 3 clarifying questions IF something essential is ambiguous
(e.g., include a form or just email? how many featured projects?). Otherwise,
generate the first version directly and I'll iterate from there.
```

---

## Próximos passos (depois dos wireframes)

- Validar a estrutura aprovada e escolher a paleta/tipografia sugeridas.
- Fazer o scaffold do site em **Astro** (rápido, ótimo SEO, deploy fácil no GitHub Pages).
- Implementar seção por seção a partir dos wireframes.
- Publicar e atualizar o link "Portfolio" no README do perfil.
