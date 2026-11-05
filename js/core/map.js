/* =====================================================================
   MAP — draws the SVG map from js/data/*.js.
   Drawing order: year axis → lines → "you are here" → stations → line bullets → tour train.
   To change WHAT is on the map, edit the data files instead of this one.
   ===================================================================== */
T.drawMap = function () {
  const svg = document.getElementById("map");
  const el = T.svgEl, NOW = T.config.nowX, END = T.config.endX;
  T.nodes = {}; // station id → its <g> on the map

  /* 1. Year axis */
  const ax = el("g", {}, svg);
  el("line", { x1: 80, y1: 40, x2: 1150, y2: 40, class: "axis-l" }, ax);
  T.years.forEach(([x, label]) => {
    el("line", { x1: x, y1: 36, x2: x, y2: 44, class: "axis-l" }, ax);
    el("text", { x, y: 28, "text-anchor": "middle", class: "axis-t" }, ax).textContent = label;
  });
  el("text", { x: 180, y: 45, "text-anchor": "middle", class: "axis-t" }, ax).textContent = "//"; // time gap 2022→2024

  /* 2. Lines: solid until now, dashed after, plus a small moving train */
  const lg = el("g", {}, svg);
  Object.keys(T.lines).forEach((k, i) => {
    const L = T.lines[k];
    L.solid = L.start + " H" + NOW;
    L.future = "M" + NOW + " " + L.y + " H" + END;
    el("path", { d: L.future, class: "ln fut s-" + k + " " + T.segClass([k]) }, lg);
    el("path", { d: L.solid,  class: "ln s-" + k + " " + T.segClass([k]) }, lg);
    if (!T.reduceMotion) {
      const c = el("circle", { r: 3.5, class: "train " + T.segClass([k]) }, lg);
      el("animateMotion", { path: L.solid, dur: (9 + i * 2.5) + "s", begin: (i * 1.3) + "s", repeatCount: "indefinite" }, c);
    }
  });

  /* 3. "You are here" marker */
  const bottom = Math.max(...Object.values(T.lines).map(l => l.y)) + 40;
  el("line", { x1: NOW, y1: 62, x2: NOW, y2: bottom, class: "here-l" }, svg);
  el("rect", { x: NOW - 88, y: 50, width: 176, height: 24, rx: 12, class: "here-b" }, svg);
  el("text", { x: NOW, y: 67, "text-anchor": "middle", class: "here-t" }, svg).textContent = T.config.nowLabel;

  /* 4. Stations */
  const sg = el("g", {}, svg);
  T.stations.forEach(st => {
    const g = el("g", { class: "st " + T.segClass(st.lines), tabindex: "0", role: "button", "aria-label": "Open station page: " + st.title + ", " + st.when }, sg);
    T.nodes[st.id] = g;
    let lx, ly, anchor = "middle";

    if (st.kind === "ix") {                       // interchange pill
      const w = 26;
      el("rect", { x: st.x - w / 2, y: st.y1 - w / 2, width: w, height: st.y2 - st.y1 + w, rx: w / 2, class: "ix" + (st.future ? " future" : "") }, g);
      if (st.featured) el("circle", { cx: st.x + 11, cy: st.y1 - 11, r: 5, class: "ev-dot" }, g);
      lx = st.labelX; ly = st.labelY; anchor = st.anchor || "middle";
    } else {
      el("circle", { cx: st.x, cy: st.y, r: 18, class: "hit" }, g); // bigger click area
      if (st.kind === "tick") {                   // honor tick
        const up = st.side === "above";
        el("rect", { x: st.x - 3, y: up ? st.y - 15 : st.y, width: 6, height: 15, class: "f-" + st.lines[0] }, g);
      } else {                                    // regular stop
        el("circle", { cx: st.x, cy: st.y, r: 8.5, class: "stop" + (st.future ? " future" : "") }, g);
      }
      if (st.featured) el("circle", { cx: st.x + 8, cy: st.y - 8, r: 5, class: "ev-dot" }, g);
      lx = st.x; ly = st.side === "above" ? st.y - 36 : st.y + 30;
    }
    el("text", { x: lx, y: ly,      "text-anchor": anchor, class: "lbl-n" }, g).textContent = st.name;
    el("text", { x: lx, y: ly + 15, "text-anchor": anchor, class: "lbl-s" }, g).textContent = st.sub;

    g.addEventListener("click", () => T.openStation(st.id));
    g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); T.openStation(st.id); } });
  });

  /* 5. Line bullets on the right edge */
  for (const k in T.lines) {
    const g = el("g", { class: T.segClass([k]) }, svg);
    el("circle", { cx: 1172, cy: T.lines[k].y, r: 16, class: "f-" + k }, g);
    el("text", { x: 1172, y: T.lines[k].y + 6, "text-anchor": "middle", class: "bul-t" }, g).textContent = k;
  }

  /* 6. Big gold train used by "Ride the line" (hidden until a ride starts) */
  T.tourTrain = el("g", { id: "tourTrain", style: "display:none" }, svg);
  el("circle", { r: 12 }, T.tourTrain);

  /* Mark one station as selected on the map */
  T.selectOnMap = id => { for (const k in T.nodes) T.nodes[k].classList.toggle("sel", k === id); };
};
