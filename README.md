# Alemneh Enawgaw — Portfolio

Personal portfolio for Alemneh Enawgaw, an Information Technology student at Bahir Dar University and aspiring network engineer in Bahir Dar, Ethiopia.

## What is included

- Responsive, accessible single-page portfolio with a light/dark theme.
- Accurate profile, education, skills, interests, and contact information from the current CV.
- Live public project cards loaded from the GitHub API (`Ethio-Spider`).
- Client-side contact form that opens a prefilled email draft without exposing a third-party service key.
- SEO metadata, canonical URL, Open Graph metadata, `robots.txt`, and sitemap.
- No build step or framework: open `index.html` directly or serve the folder with any static web server.

## Local development

```bash
git clone https://github.com/Ethio-Spider/AlexPortfolio.git
cd AlexPortfolio
python3 -m http.server 8000
```

Open <http://localhost:8000>. GitHub project loading requires an internet connection; the page falls back to the profile link if the API is unavailable.

## Deployment

The site is static and can be deployed with GitHub Pages, Netlify, Vercel, or any static hosting provider. For GitHub Pages, publish the `main` branch from the repository settings.

## Contact

- Email: alemnehenawgaw912@gmail.com
- LinkedIn: https://www.linkedin.com/in/alemneh-e-051152388
- GitHub: https://github.com/Ethio-Spider
