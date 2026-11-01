import { FormEvent, useEffect, useMemo, useState } from 'react'

type Theme = 'dark' | 'light'
type ProjectCategory = 'all' | 'frontend' | 'backend'

const roles = ['Frontend developer', 'Cisco network specialist', 'Full-stack developer', 'Problem solver']

const skills = [
  { name: 'React & TypeScript', level: 90, category: 'Frontend' },
  { name: 'HTML & CSS', level: 95, category: 'Frontend' },
  { name: 'Node.js', level: 84, category: 'Backend' },
  { name: 'Python', level: 76, category: 'Backend' },
  { name: 'MongoDB & SQL', level: 80, category: 'Data' },
  { name: 'Git, Docker & AWS', level: 78, category: 'Tools' },
]

const projects = [
  {
    title: 'E-commerce platform',
    description: 'A full-stack shopping experience with authentication, payments, and a focused admin workflow.',
    category: 'frontend' as const,
    tech: ['React', 'Node.js', 'MongoDB'],
    icon: '🛒',
  },
  {
    title: 'Data visualization dashboard',
    description: 'An interactive analytics dashboard designed to turn live data into clear, useful decisions.',
    category: 'frontend' as const,
    tech: ['React', 'D3.js', 'Chart.js'],
    icon: '📊',
  },
  {
    title: 'Task management app',
    description: 'A mobile-first collaboration tool with drag-and-drop workflows and cloud synchronization.',
    category: 'backend' as const,
    tech: ['React Native', 'Firebase', 'Redux'],
    icon: '✅',
  },
]

const services = [
  ['01', 'Frontend development', 'Responsive interfaces that feel fast, clear, and natural on every screen.'],
  ['02', 'Backend APIs', 'Secure, maintainable services and data systems built to grow with your product.'],
  ['03', 'Network solutions', 'Reliable Cisco networking and technical problem-solving for connected teams.'],
]

function App() {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'dark')
  const [menuOpen, setMenuOpen] = useState(false)
  const [roleIndex, setRoleIndex] = useState(0)
  const [roleText, setRoleText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [filter, setFilter] = useState<ProjectCategory>('all')
  const [formStatus, setFormStatus] = useState('')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const role = roles[roleIndex]
    const complete = roleText === role
    const empty = roleText.length === 0
    const delay = complete && !deleting ? 1800 : empty && deleting ? 500 : deleting ? 45 : 85
    const timer = window.setTimeout(() => {
      if (complete) setDeleting(true)
      else if (empty && deleting) {
        setDeleting(false)
        setRoleIndex((current: number) => (current + 1) % roles.length)
      } else {
        setRoleText((current: string) => deleting ? role.slice(0, current.length - 1) : role.slice(0, current.length + 1))
      }
    }, delay)
    return () => window.clearTimeout(timer)
  }, [deleting, roleIndex, roleText])

  const filteredProjects = useMemo(
    () => filter === 'all' ? projects : projects.filter((project) => project.category === filter),
    [filter],
  )

  function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormStatus('Thanks! Your message is ready to send. Please email me directly at alemnehenawgaw912@gmail.com.')
    event.currentTarget.reset()
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Alemneh Enawgaw home">AE<span>.</span></a>
        <button className="menu-button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>☰</button>
        <nav className={menuOpen ? 'site-nav is-open' : 'site-nav'}>
          {['about', 'skills', 'experience', 'projects', 'contact'].map((item) => (
            <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}>{item}</a>
          ))}
          <button className="theme-button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle color theme">
            {theme === 'dark' ? '☼' : '☾'}
          </button>
        </nav>
      </header>

      <main>
        <section id="home" className="hero section-wrap">
          <div className="hero-copy">
            <p className="eyebrow">Available for meaningful projects</p>
            <h1>Building digital experiences with <em>clarity</em> and purpose.</h1>
            <p className="hero-role">I am a <span>{roleText}</span><b aria-hidden="true">|</b></p>
            <p className="hero-intro">I’m Alemneh, a developer from Addis Ababa who turns ideas into thoughtful, reliable web products and connected systems.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore my work <span>↗</span></a>
              <a className="text-link" href="Alemneh_Enawgaw_FlowCV_Resume_2026-05-06.pdf" download>Download CV ↓</a>
            </div>
            <div className="quick-stats"><span><strong>5+</strong> years learning & building</span><span><strong>50+</strong> projects explored</span></div>
          </div>
          <div className="hero-visual">
            <div className="hero-orbit orbit-one" /><div className="hero-orbit orbit-two" />
            <div className="portrait-frame"><img src="photo_2026-05-10_10-00-05.jpg" alt="Portrait of Alemneh Enawgaw" /></div>
            <div className="floating-note note-top">Frontend<br /><strong>+ systems</strong></div>
            <div className="floating-note note-bottom">Based in<br /><strong>Ethiopia ↗</strong></div>
          </div>
        </section>

        <section id="about" className="section-wrap split-section">
          <div className="section-heading"><span>01</span><h2>A little about me</h2></div>
          <div className="section-body about-body">
            <div><p className="lead">Curious by nature, intentional by craft.</p><p>My journey started with curiosity and grew into a commitment to building digital solutions that make a real impact. I care about accessible interfaces, clean architecture, and the details people feel even when they don’t notice them.</p></div>
            <div className="details-grid"><div><small>Name</small><p>Alemneh Enawgaw</p></div><div><small>Location</small><p>Addis Ababa, Ethiopia</p></div><div><small>Email</small><p>alemnehenawgaw912@gmail.com</p></div><div><small>Focus</small><p>Web & network systems</p></div></div>
          </div>
        </section>

        <section id="skills" className="section-wrap tinted-section">
          <div className="section-heading"><span>02</span><h2>Skills that ship ideas</h2></div>
          <div className="skills-layout"><p className="lead">A practical toolkit for taking a project from first sketch to dependable product.</p><div className="skills-list">{skills.map((skill) => <div className="skill-row" key={skill.name}><div><span>{skill.name}</span><small>{skill.category}</small></div><strong>{skill.level}%</strong><div className="skill-track"><i style={{ width: `${skill.level}%` }} /></div></div>)}</div></div>
        </section>

        <section id="experience" className="section-wrap split-section">
          <div className="section-heading"><span>03</span><h2>Experience & direction</h2></div>
          <div className="experience-list"><article><span>2024 — Present</span><div><h3>Senior Frontend Developer</h3><p>Leading the delivery of scalable interfaces, improving performance, and supporting other developers through thoughtful reviews.</p></div></article><article><span>2021 — 2024</span><div><h3>Frontend & Systems Developer</h3><p>Built responsive web applications, collaborated across design and engineering, and developed a strong foundation in networking.</p></div></article><article><span>Always</span><div><h3>Learning in public</h3><p>Exploring better ways to build, document, and share useful technology with the community.</p></div></article></div>
        </section>

        <section id="projects" className="section-wrap tinted-section">
          <div className="section-heading"><span>04</span><h2>Selected work</h2></div>
          <div className="project-toolbar"><p className="lead">A few concepts and products that show how I think.</p><div className="filter-group">{(['all', 'frontend', 'backend'] as ProjectCategory[]).map((item) => <button className={filter === item ? 'filter active' : 'filter'} key={item} onClick={() => setFilter(item)}>{item}</button>)}</div></div>
          <div className="project-grid">{filteredProjects.map((project) => <article className="project-card" key={project.title}><div className="project-icon">{project.icon}</div><div className="project-card-content"><p className="project-type">{project.category} / selected work</p><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div></div></article>)}</div>
        </section>

        <section id="contact" className="section-wrap contact-section">
          <div className="contact-copy"><p className="eyebrow">Have a good idea?</p><h2>Let’s make something <em>useful.</em></h2><p>I’m open to conversations about products, collaborations, and opportunities where thoughtful technology can make a difference.</p><a className="email-link" href="mailto:amognehegnalemneh@gmail.com">amognehegnalemneh@gmail.com ↗</a></div>
          <form className="contact-form" onSubmit={submitForm}><label>Your name<input name="name" required placeholder="Alemneh" /></label><label>Your email<input type="email" name="email" required placeholder="you@example.com" /></label><label>Tell me about it<textarea name="message" rows={4} required placeholder="A short note about your project..." /></label><button className="button button-primary" type="submit">Send message <span>↗</span></button>{formStatus && <p className="form-status" role="status">{formStatus}</p>}</form>
        </section>
      </main>

      <footer><span>© 2026 Alemneh Enawgaw</span><span>Designed & built with React + TypeScript</span><div><a href="https://github.com/Ethio-Spider" target="_blank" rel="noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/alemneh-e-051152388" target="_blank" rel="noreferrer">LinkedIn ↗</a></div></footer>
    </div>
  )
}

export default App
