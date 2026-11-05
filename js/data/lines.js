/* =====================================================================
   LINES — the colored lines on the map.
   Each line needs: a name, a y position (height on the map), and a start point.
   The solid part runs from the start to "now"; the dashed part runs from "now" to the end.
   Colors live in css/01-tokens.css (--line-a, --line-w, ...).

   To ADD A LINE (e.g. "L" for Leadership):
     1. Add an entry below with a new y (e.g. 710) and a start.
     2. Add --line-l colors in css/01-tokens.css, and .s-L / .f-L / .b-L rules
        (copy the pattern in css/04-map.css and css/02-base.css).
     3. Increase the map height in index.html: viewBox="0 0 1210 760".
     4. Add a filter button in index.html (copy one in #lineFilter).
   ===================================================================== */
T.lines = {
  A: { name: "Academic Line",            y: 230, start: "M300 230" },
  W: { name: "Campus Work Line",         y: 350, start: "M300 350" },
  R: { name: "Research & Teaching Line", y: 470, start: "M800 470" },
  V: { name: "Venture Line",             y: 110, start: "M100 170 H150 L210 110" }, // starts low, then bends up
  P: { name: "Projects Line",            y: 590, start: "M660 590" }
};

/* Year labels along the top of the map: [x position, label] */
T.years = [[100,"2022"],[260,"2024"],[400,"2025"],[660,"2026"],[1000,"2027"],[1080,"2028"]];
