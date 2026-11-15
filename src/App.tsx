import { useEffect, useMemo, useState } from 'react';

type Repository = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
};

const email = 'alemnehenawgaw912@gmail.com';
const github = 'https://github.com/Ethio-Spider';
const linkedin = 'https://www.linkedin.com/in/alemneh-e-051152388';

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState(false);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme');
    setDarkMode(savedTheme !== 'light');
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    window.localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Ethio-Spider/repos?sort=updated&per_page=12');
        if (!response.ok) throw new Error('GitHub request failed');
        const data = (await response.json()) as Repository[];
        setRepositories(data.filter((repo) => !repo.name.toLowerCase().includes('portfolio') && !repo.name.toLowerCase().includes('alex')));
      } catch {
        setProjectsError(true);
      } finally {
        setProjectsLoading(false);
      }
    };
    void loadProjects();
  }, []);

  const languages = useMemo(
    () => ['All', ...new Set(repositories.map((repo) => repo.language).filter((language): language is string => Boolean(language)))],
    [repositories],
  );
  const visibleProjects = repositories.filter((repo) => filter === 'All' || repo.language === filter);
  const closeMenu = () => setMenuOpen(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#home" onClick={closeMenu} aria-label="Alemneh Enawgaw home"><span>AE</span>Alemneh Enawgaw</a>
          <button className="menu-toggle" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>Menu</button>
          <nav className={menuOpen ? 'site-nav open' : 'site-nav'} aria-label="Primary navigation">
            {['About', 'Skills', 'Projects', 'Contact'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>)}
            <button className="theme-toggle" type="button" onClick={() => setDarkMode((current) => !current)} aria-label={`Switch to ${darkMode ? 'light' : 'dark'} theme`}>{darkMode ? '☼' : '☾'}</button>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section id="home" className="hero section-reveal">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">IT student · networking · frontend development</p>
              <h1>Building practical technology for <span>people and communities.</span></h1>
              <p className="lead">I’m Alemneh, an Information Technology student at Bahir Dar University and an aspiring network engineer based in Bahir Dar, Ethiopia.</p>
              <div className="hero-actions"><a className="button button-primary" href="#projects">Explore my work <Arrow /></a><a className="button button-secondary" href="/Alemneh_Enawgaw_FlowCV_Resume_2026-05-06.pdf" download>Download CV</a></div>
              <div className="social-row" aria-label="Social links"><a href={github} target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href={linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a href={`mailto:${email}`}>Email <Arrow /></a></div>
            </div>
            <div className="hero-visual"><div className="portrait-frame"><img src="/photo_2026-05-10_10-00-05.jpg" alt="Portrait of Alemneh Enawgaw" /></div><div className="status-card"><span className="status-dot" /><div><strong>Open to opportunities</strong><small>Internships and entry-level networking roles</small></div></div></div>
          </div>
        </section>

        <section id="about" className="section section-reveal"><div className="container two-column"><div><p className="eyebrow">01 / About</p><h2>Curious by nature.<br /><em>Useful by design.</em></h2></div><div className="section-copy"><p>I’m a motivated and detail-oriented Information Technology student with a strong interest in computer networking, system administration, and web development.</p><p>My current focus is turning fundamentals into hands-on work: TCP/IP, subnetting, routing, switching, Cisco Packet Tracer, and accessible frontend interfaces.</p><dl className="facts"><div><dt>Currently</dt><dd>BSc Information Technology (in progress)</dd></div><div><dt>University</dt><dd>Bahir Dar University</dd></div><div><dt>Location</dt><dd>Bahir Dar, Ethiopia</dd></div><div><dt>Languages</dt><dd>Amharic · English</dd></div></dl></div></div></section>

        <section id="skills" className="section section-muted section-reveal"><div className="container"><p className="eyebrow">02 / Capabilities</p><h2>Tools I use to solve problems.</h2><div className="skills-grid"><article className="skill-card"><span className="skill-number">01</span><h3>Networking</h3><p>TCP/IP, subnetting, network troubleshooting, routing, switching, and Cisco Packet Tracer.</p></article><article className="skill-card"><span className="skill-number">02</span><h3>Frontend</h3><p>Semantic HTML, modern CSS, JavaScript, responsive design, and React fundamentals.</p></article><article className="skill-card"><span className="skill-number">03</span><h3>Foundations</h3><p>Operating systems, database systems, basic system administration, Git, and documentation.</p></article></div><div className="tag-list" aria-label="Technical skills">{['HTML5', 'CSS3', 'JavaScript', 'React', 'PHP', 'Git', 'SQL', 'Cisco Packet Tracer'].map((skill) => <span key={skill}>{skill}</span>)}</div></div></section>

        <section id="projects" className="section section-reveal"><div className="container"><div className="section-heading"><div><p className="eyebrow">03 / Selected work</p><h2>Projects from GitHub.</h2></div><a className="text-link" href={`${github}?tab=repositories`} target="_blank" rel="noreferrer">View profile <Arrow /></a></div><p className="section-intro">A live view of my public repositories, loaded directly from GitHub so the work stays current.</p><div className="filter-list" role="group" aria-label="Filter projects">{languages.map((language) => <button className={filter === language ? 'filter-button active' : 'filter-button'} key={language} type="button" onClick={() => setFilter(language)} aria-pressed={filter === language}>{language}</button>)}</div><div className="projects-grid" aria-live="polite">{projectsLoading && <p className="loading">Loading repositories…</p>}{!projectsLoading && projectsError && <p className="loading">Projects are temporarily unavailable. <a className="project-link" href={`${github}?tab=repositories`}>View them on GitHub <Arrow /></a></p>}{!projectsLoading && !projectsError && visibleProjects.length === 0 && <p className="loading">No public projects found yet.</p>}{visibleProjects.map((repo) => <article className="project-card" key={repo.id}><span className="eyebrow">{repo.language || 'Code'}</span><h3>{repo.name.replaceAll('-', ' ')}</h3><p>{repo.description || 'A software project exploring practical technology and problem solving.'}</p><div className="project-tech"><span>★ {repo.stargazers_count}</span><span>⑂ {repo.forks_count}</span></div><div className="project-meta"><span>Updated {new Date(repo.updated_at).toLocaleDateString('en', { month: 'short', year: 'numeric' })}</span><a className="project-link" href={repo.html_url} target="_blank" rel="noreferrer">View on GitHub <Arrow /></a></div></article>)}</div></div></section>

        <section id="contact" className="section section-dark section-reveal"><div className="container contact-grid"><div><p className="eyebrow">04 / Contact</p><h2>Let’s start a conversation.</h2><p className="section-copy">I’m looking for an internship or entry-level opportunity where I can grow, contribute, and solve meaningful technical problems.</p><div className="contact-links"><a href={`mailto:${email}`}>{email}</a><a href="tel:+251964700538">+251 964 700 538</a></div><button className="copy-link" type="button" onClick={() => void copyEmail()}>Copy email address</button></div><form className="contact-form" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const subject = encodeURIComponent(`Portfolio enquiry from ${data.get('name') || 'a visitor'}`); const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`); window.location.href = `mailto:${email}?subject=${subject}&body=${body}`; }}><label htmlFor="name">Name<input id="name" name="name" type="text" required minLength={2} /></label><label htmlFor="contact-email">Email<input id="contact-email" name="email" type="email" required /></label><label htmlFor="message">Message<textarea id="message" name="message" rows={5} required minLength={10} /></label><button className="button button-primary" type="submit">Open email draft <Arrow /></button></form></div></section>
      </main>
      <footer className="site-footer"><div className="container footer-inner"><span>© 2026 Alemneh Enawgaw</span><span>Built with React, TypeScript, Vite & GitHub API</span></div></footer>
    </div>
  );
}

export default App;
