# Mind to Safety

Independent, dependency-free static website for Mind to Safety. The public pages are Swedish HTML documents styled with `styles.css`; `/scripts/site.js` only prepares the existing contact mail draft and prefills a selected service.

## Run locally

Requires Node.js 20 or later. No package installation is required.

```sh
npm run dev
```

Open `http://localhost:4173`. Direct navigation and refresh work for `/`, `/om-oss`, `/tjanster`, and `/kontakt`.

## Build and deploy

```sh
npm run build
npm run preview
```

Push to `main` to run the GitHub Actions deployment in `.github/workflows/pages.yml`. In the repository settings, select **Pages → Build and deployment → Source → GitHub Actions**. The workflow tests and builds the site, then deploys the `dist/` artifact. For a project Pages URL, it prefixes local page and asset links with the repository path. For a custom domain, add its verified domain to a root `CNAME` file; the workflow then builds with `/` as the base path. Do not add a `CNAME` until the domain is configured for GitHub Pages.

No package installation, secrets, or environment variables are needed for local development. The sitemap, robots file, canonical links, and social URLs use `https://mindtosafety.se`, the domain supplied by the existing site; update them together only if the production domain changes. The workflow does not change DNS or claim that a domain is configured.

The contact form does not submit data to a server. It validates the fields in the browser and opens a prefilled email draft to `info@mindtosafety.com`; visitors can also use the direct email link. There is no authentication, database, payment, or API integration in this project.

## Maintain pages and SEO

Each route is a standalone HTML file under its route directory. Keep its title, description, canonical URL, Open Graph values, and sitemap entry aligned when editing routes. Shared visual tokens and responsive styles live in `styles.css`; checked-in site imagery and the favicon live in `assets/`. Keep route URLs slashless in source HTML; the static host resolves each route directory's `index.html`.
