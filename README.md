# mindtosafety

Static website for Mind to Safety, made with HTML, CSS, and a small browser script for the mobile menu and contact email draft. There is no app runtime, package manager, build step, or backend.

## Preview locally

Open `index.html` in a browser. The site can also be served by any basic static-file server.

## Publish on GitHub Pages

In repository settings, choose **Pages → Build and deployment → Source → GitHub Actions**. The workflow in `.github/workflows/static.yml` deploys the repository root on pushes to `main`. After renaming the repository to `mindtosafety`, GitHub changes the default project-site URL to use `/mindtosafety/`; the relative HTML, CSS, JavaScript, and asset links continue to work without a build. If `mindtosafety.se` is configured as a custom Pages domain, its URL stays the same. Domain and DNS settings are separate from the repository rename.

The contact form does not submit data to a server. It validates the fields in the browser and opens a prefilled email draft to `info@mindtosafety.com`; visitors can also use the direct email link. There is no authentication, database, payment, or API integration in this project.

## Maintain pages and SEO

Each route is a standalone HTML file under its route directory. Keep its title, description, canonical URL, Open Graph values, and sitemap entry aligned when editing routes. Shared visual tokens and responsive styles live in `styles.css`; site imagery and the favicon live in `assets/`. Keep navigation and asset references relative so GitHub Pages project URLs continue to work.
