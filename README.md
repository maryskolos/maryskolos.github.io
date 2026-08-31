# maryskolos.github.io

Personal portfolio site for [maryskolos.github.io](https://maryskolos.github.io).

## Stack

- Next.js 15 (App Router) + TypeScript + React 19
- Material UI v7
- Static export (`output: 'export'`) → GitHub Pages via Actions

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development |
| `npm run export` | Production static build → `out/` |
| `npm run preview` | Serve `out/` locally |

## Deploy

Pushes to `main` run [.github/workflows/deploy.yml](.github/workflows/deploy.yml) (build `out/`, deploy Pages). Pages source must be **GitHub Actions**.

## Layout

```
src/app/           # routes (home, sapp, flash-sale-lab, blog)
src/components/    # UI by area (portfolio, sapp, flashSale, blog)
src/constants/     # content, themes, nav
public/            # static assets, resume.html / resume.pdf
```

MIT — see [LICENSE](LICENSE).
