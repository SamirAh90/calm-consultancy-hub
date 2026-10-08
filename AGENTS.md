<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep public company content in dedicated TanStack routes and shared presentation in `src/components/site.tsx` so navigation and branding stay consistent.
- Keep service facts and leaf-page metadata in `src/lib/site-content.ts` to avoid conflicting descriptions across pages.
- Contact forms prepare a mailto draft, not a simulated submission; no email delivery service is connected.
- Store all visual tokens and editorial styles in `src/styles.css`; use Button variants for calls to action.
- Keep service image mappings in `src/lib/service-images.ts` and render them through shared `ServiceImage` so overview and detail imagery remain consistent.
