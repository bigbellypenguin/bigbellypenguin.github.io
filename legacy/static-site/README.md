# Previous static site

These files are the GitHub Pages site that lived at the repository root on `main`: `index.html`, `assets/`, and `images/`. The layout is the [Strata](https://html5up.net/strata) template by HTML5 UP, used under the [Creative Commons Attribution 3.0 license](https://html5up.net/license).

The Next.js app does not import or serve this folder. It is kept on this branch so the previous site can be compared or recovered without digging through history. A later cleanup can delete `legacy/` once the redesign has replaced the published site.

Merging the foundation branch removes `index.html` from the repository root. If GitHub Pages is publishing `main` as a static site, that merge would stop the old site from being served. Host the Next.js app on Vercel or another Node host before switching the public URL.
