# thebibekshah.com: Transit Map Resume

My resume drawn as a subway map. Plain HTML, CSS and JavaScript with no build step. Hosted on GitHub Pages.

---

## 1. Open it in VS Code

1. Unzip this folder somewhere you'll keep it, e.g. `Documents/bibek-transit-site`.
2. Open VS Code → **File → Open Folder…** → choose `bibek-transit-site`.
3. VS Code will suggest the **Live Server** extension (bottom-right popup). Click **Install**.
   (Or: Extensions panel → search "Live Server" by Ritwick Dey → Install.)
4. Right-click `index.html` → **Open with Live Server**.
   The site opens in your browser and **reloads every time you save a file**.

> Double-clicking `index.html` also works, but Live Server is better because it auto-reloads.

---

## 2. Where everything lives

```
bibek-transit-site/
├── index.html                 ← page layout: header, strips, timetable, contact (text you edit directly)
├── css/                       ← how things LOOK
│   ├── 01-tokens.css          ← colors + fonts for the whole site (line colors here)
│   ├── 02-base.css            ← page basics, buttons, line bullets
│   ├── 03-header.css          ← name sign, "Now serving", "Service alert"
│   ├── 04-map.css             ← map card, toolbar, shapes on the map
│   ├── 05-station-page.css    ← the side panel that opens on a station
│   ├── 06-info-desk.css       ← search box
│   └── 07-timetable.css       ← plain resume, contact ticket, footer
├── js/                        ← what things DO
│   ├── config.js              ← switches: placeholders on/off, "you are here" position, ride speed
│   ├── data/                  ← ★ CONTENT. Most edits happen here.
│   │   ├── stations.js        ← every station + its station page (evidence, story, transfers)
│   │   ├── lines.js           ← the colored lines and year labels
│   │   └── skills.js          ← trip-planner skills → which stations
│   ├── core/
│   │   ├── helpers.js         ← shared little tools
│   │   └── map.js             ← draws the map from the data files
│   ├── features/              ← one file per feature
│   │   ├── station-page.js    ← side panel, tabs, shareable #links, copy link
│   │   ├── line-filter.js     ← "All lines / Academic / ..." buttons
│   │   ├── trip-planner.js    ← skill buttons that light up stations
│   │   ├── ride-the-line.js   ← animated train tour
│   │   ├── info-desk.js       ← station search
│   │   └── contact.js         ← copy-email button
│   └── main.js                ← turns features on (comment a line out to turn one off)
└── assets/                    ← your photos, PDFs, screenshots (one folder per station)
```

---

## 3. Common tasks

| I want to… | Open this file | What to do |
|---|---|---|
| Change text on a station page | `js/data/stations.js` | Find the station by `id` and edit `title`, `summary`, `bullets`, `story` |
| Add a photo/deck/link as evidence | `assets/<station>/` + `stations.js` | Put the file in the folder, then add `src: "assets/pettis/stage.jpg"` to that evidence item |
| Add a new station | `js/data/stations.js` | Copy a whole `{ ... }` block, change `id`, `x`, `y`, `name`, etc. |
| Move a station left/right | `js/data/stations.js` | Change `x` (100 = 2022, 920 = now, 1120 = May 2028) |
| Update "Now serving" / "Service alert" | `index.html` | Edit the text in those two sections |
| Update the plain resume | `index.html` | Edit the `TIMETABLE` section |
| Add a trip-planner skill | `js/data/skills.js` | Copy a line, list station ids |
| Change a line color | `css/01-tokens.css` | Edit `--line-a`, `--line-w`, … |
| Hide placeholders for the live site | `js/config.js` | Set `showPlaceholders: false` |
| Move "You are here" each month | `js/config.js` | Change `nowX` and `nowLabel` |
| Turn a feature off | `js/main.js` | Put `//` in front of its line |

### Example: adding real Pettis evidence

1. Copy your files into `assets/pettis/`, e.g. `stage.jpg` and `peekmind-deck.pdf`.
2. In `js/data/stations.js`, find `id: "pettis"` and change:

```js
{ type: "photo", title: "Presenting on stage", add: "assets/pettis/stage.jpg" },
```
to
```js
{ type: "photo", title: "Presenting on stage", src: "assets/pettis/stage.jpg", caption: "Final round, Pettis 2025" },
```

3. Fill in the story's problem: `problem: "Students lose track of ..."`
4. Save, and Live Server refreshes. Click Pettis to check it.

Keep photos under ~500 KB (use squoosh.app to shrink them).

---

## 4. Adding a new feature

1. Create `js/features/my-feature.js`:
   ```js
   T.initMyFeature = function () {
     // your code; you can use T.stations, T.openStation(id), T.toast("hi") ...
   };
   ```
2. Add it in `index.html` above `main.js`: `<script src="js/features/my-feature.js"></script>`
3. Call it in `js/main.js`: `T.initMyFeature();`
4. If it needs styles, add `css/08-my-feature.css` and link it in `index.html`.

Everything shared lives on one object, `T` (T.stations, T.lines, T.skills, T.config, T.byId["pettis"] …).

---

## 5. Publish changes (Git, inside VS Code)

**One-time setup:** your GitHub repo `bibekshah47.github.io` currently has a single `index.html`.
Replace it with this folder:

1. VS Code → **Source Control** panel (branch icon) → **Clone Repository** → paste
   `https://github.com/bibekshah47/bibekshah47.github.io.git` → pick a folder → open it.
2. Copy everything from `bibek-transit-site/` into that cloned folder (replace `index.html`).
   **Keep the `CNAME` file**, since it holds your domain `thebibekshah.com`.
3. Source Control panel → type a message ("Split site into sections") → **Commit** → **Sync/Push**.

**Every time after:** edit → save → Source Control → message → Commit → Push.
GitHub Pages updates the live site in about a minute.

Before pushing to the live site, set `showPlaceholders: false` in `js/config.js`
(or leave it on while you're still filling things in).
