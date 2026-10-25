# Jonathan Hsu

Personal site for [Jonathan Hsu](https://github.com/bigbellypenguin) (`bigbellypenguin`).

Once this version is on `main`, GitHub Pages serves it at <https://bigbellypenguin.github.io/>.

## How GitHub Pages serves this site

Pages is already turned on for this repository:

- Source: branch `main`, folder `/` (the repository root)
- Entry point: `index.html`
- Build: none. The site is HTML and CSS only.

`.nojekyll` tells GitHub Pages to copy these files as they are, instead of running them through Jekyll. There is no install step and no generated output to commit.

To publish an edit, merge it to `main`. Pages rebuilds from that branch. In the repository settings, leave the source as **Deploy from a branch → `main` → `/ (root)`**.

Asset paths such as `/styles.css` start at the domain root because this repository is a user site (`bigbellypenguin.github.io`), not a project site in a subfolder.

## How to edit

| File | What it controls |
| --- | --- |
| `index.html` | All visible copy: introduction, About, Projects, and Contact |
| `styles.css` | Layout, type, and color |
| `images/avatar.jpg` | Portrait next to the name |
| `images/projects/` | Screenshots on the project cards |
| `favicon.svg` | Browser tab icon |
| `404.html` | Page shown for an unknown address |

Preview from the repository root:

```bash
python3 -m http.server 8080
```

Then open <http://127.0.0.1:8080/>.

### Placeholders to replace

Two blocks in `index.html` are marked **Placeholder**:

1. The one-line introduction under the name.
2. The About section.

Write those in your own words. They are blank on purpose. The public GitHub profile for `bigbellypenguin` has no name, bio, company, or location filled in, so this page does not state a job title, employer, or biography. The name Jonathan Hsu comes from the previous version of this site.

The previous About text (a software-engineer introduction, New York City, and photography) is still in the git history of `index.html` if you want to paste any of it back.

### Projects

The cards are the non-fork public repositories on the profile, other than this site itself:

- [slack-clone-repo](https://github.com/bigbellypenguin/slack-clone-repo) — Python. Most recently pushed of the three.
- [venmo-clone](https://github.com/bigbellypenguin/venmo-clone) — Python.
- [fitness-overflow](https://github.com/bigbellypenguin/fitness-overflow) — JavaScript.

Each sentence is a short version of that repository’s README. The language tag is the primary language GitHub reports. Forks on the profile (including `nanochat`, `pynterest`, and `python-project-starter`) are omitted so they are not presented as original projects.

To add a card, copy an `<article class="project">` block inside the Projects section. Use a root path for the image, for example `/images/projects/my-project.jpg`, and link the heading at the repository.

Screenshots on the cards are the photos already in this repository (`images/thumbs/03.jpg`, `02.jpg`, and `01.jpg`), resized. Replace the files in `images/projects/` to change them.

### Contact

- GitHub: <https://github.com/bigbellypenguin>
- Email `jonathan.hsu112@gmail.com`, LinkedIn (`/in/jonathancchsu`), and Wellfound (`/u/jonathan-hsu-22`) were already published in the previous `index.html`. The old AngelList URL redirects to that Wellfound page.

Update or remove those three in the Contact section if they are out of date. A commit email found in git history is not listed here.

## What changed from the previous site

The previous page was an HTML5 UP Strata template (jQuery, Font Awesome, and Sass sources), last updated in 2022. It is replaced by this static page. Removed with it:

- A resume link to `images/Jonathan Hsu Resume.pdf`, which was not in the repository (live URL returned 404).
- Heroku demo links for the three projects. Those URLs now return 404, so the cards link only to GitHub.
- Hotlinked technology logos, the old `jonathancchsu` GitHub URL, template gallery images, and `.DS_Store` files.

Every stylesheet and image referenced by `index.html` is a file in this repository. The page does not load JavaScript.
