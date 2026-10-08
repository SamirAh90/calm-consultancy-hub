# Mind to Safety

Static website for Mind to Safety, made with HTML, CSS, and a small browser script for the mobile menu and contact email draft. There is no app runtime, package manager, build step, or backend.

## Preview locally

Open `index.html` in a browser. The site can also be served by any basic static-file server.

## Publish on GitHub Pages

In repository settings, choose **Pages → Build and deployment → Deploy from a branch**, then select `main` and `/ (root)`. The HTML pages, CSS, JavaScript, and assets are served directly from the repository; relative links also work under the project-site URL prefix. No workflow, build command, Node.js, secrets, or dependencies are required. The sitemap, robots file, canonical links, and social URLs use `https://mindtosafety.se`, the domain supplied by the existing site. Configure that custom domain separately if it should host this version.

The contact form does not submit data to a server. It validates the fields in the browser and opens a prefilled email draft to `info@mindtosafety.com`; visitors can also use the direct email link. There is no authentication, database, payment, or API integration in this project.

## Maintain pages and SEO

Each route is a standalone HTML file under its route directory. Keep its title, description, canonical URL, Open Graph values, and sitemap entry aligned when editing routes. Shared visual tokens and responsive styles live in `styles.css`; site imagery and the favicon live in `assets/`. Keep navigation and asset references relative so GitHub Pages project URLs continue to work.
