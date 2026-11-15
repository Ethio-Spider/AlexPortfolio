const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const menuButton = $('.menu-toggle');
const nav = $('#site-nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
$$('#site-nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

const themeButton = $('#theme-toggle');
const storedTheme = localStorage.getItem('theme');
if (storedTheme === 'light') document.body.classList.add('light');
function updateThemeButton() {
  const light = document.body.classList.contains('light');
  themeButton.textContent = light ? '☾' : '☼';
  themeButton.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
}
themeButton?.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
  updateThemeButton();
});
updateThemeButton();

const projectsGrid = $('#projects-grid');
const projectSearch = $('#project-search');
const projectFilters = $('#project-filters');
let repositories = [];
let activeFilter = 'All';
function projectCard(repo) {
  const description = repo.description || 'A software project exploring practical technology and problem solving.';
  const language = repo.language || 'Code';
  return `<article class="project-card"><span class="eyebrow">${escapeHtml(language)}</span><h3>${escapeHtml(repo.name.replaceAll('-', ' '))}</h3><p>${escapeHtml(description)}</p><div class="project-tech"><span>★ ${repo.stargazers_count}</span><span>⑂ ${repo.forks_count}</span></div><div class="project-meta"><span>Updated ${formatDate(repo.updated_at)}</span><a class="project-link" href="${escapeHtml(repo.html_url)}" target="_blank" rel="noopener noreferrer">View on GitHub ↗</a></div></article>`;
}
function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
}
function formatDate(value) {
  return new Intl.DateTimeFormat('en', {month: 'short', year: 'numeric'}).format(new Date(value));
}
function renderFilters() {
  const languages = [...new Set(repositories.map(repo => repo.language).filter(Boolean))].slice(0, 5);
  projectFilters.innerHTML = ['All', ...languages].map(filter => `<button class="filter-button${filter === activeFilter ? ' active' : ''}" type="button" aria-pressed="${filter === activeFilter}">${escapeHtml(filter)}</button>`).join('');
  $$('.filter-button', projectFilters).forEach(button => button.addEventListener('click', () => {
    activeFilter = button.textContent;
    renderFilters();
    renderProjects();
  }));
}
function renderProjects() {
  const query = projectSearch.value.trim().toLowerCase();
  const visible = repositories.filter(repo => {
    const matchesFilter = activeFilter === 'All' || repo.language === activeFilter;
    const haystack = `${repo.name} ${repo.description || ''} ${repo.language || ''}`.toLowerCase();
    return matchesFilter && haystack.includes(query);
  });
  projectsGrid.innerHTML = visible.length ? visible.map(projectCard).join('') : '<p class="loading">No projects match that search.</p>';
}
async function loadProjects() {
  try {
    const response = await fetch('https://api.github.com/users/Ethio-Spider/repos?sort=updated&per_page=12');
    if (!response.ok) throw new Error('GitHub request failed');
    repositories = (await response.json()).filter(repo => !repo.fork && repo.name !== 'AlexPortfolio' && repo.name !== 'Ethio-Spider-Portfolio-').slice(0, 9);
    if (repositories.length) {
      renderFilters();
      renderProjects();
    } else projectsGrid.innerHTML = '<p class="loading">No public projects found yet.</p>';
  } catch {
    projectsGrid.innerHTML = '<p class="loading">Projects are temporarily unavailable. <a class="project-link" href="https://github.com/Ethio-Spider?tab=repositories">View them on GitHub ↗</a></p>';
  }
}
projectSearch?.addEventListener('input', renderProjects);
loadProjects();

const contactForm = $('#contact-form');
contactForm?.addEventListener('submit', event => {
  event.preventDefault();
  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }
  const data = new FormData(contactForm);
  const subject = encodeURIComponent(`Portfolio enquiry from ${data.get('name')}`);
  const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);
  $('#form-status').textContent = 'Opening your email application…';
  window.location.href = `mailto:alemnehenawgaw912@gmail.com?subject=${subject}&body=${body}`;
});

const copyEmailButton = $('#copy-email');
copyEmailButton?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('alemnehenawgaw912@gmail.com');
    copyEmailButton.textContent = 'Email copied';
  } catch {
    copyEmailButton.textContent = 'Email: alemnehenawgaw@gmail.com';
  }
  window.setTimeout(() => { copyEmailButton.textContent = 'Copy email address'; }, 2500);
});

const backToTop = $('#back-to-top');
window.addEventListener('scroll', () => backToTop?.classList.toggle('visible', window.scrollY > 500), {passive: true});
backToTop?.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
