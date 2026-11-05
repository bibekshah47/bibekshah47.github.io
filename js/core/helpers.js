/* =====================================================================
   HELPERS — small tools shared by every feature. You rarely need to edit this.
   ===================================================================== */
T.byId = {};
T.stations.forEach(s => {
  T.byId[s.id] = s;
  // which skills mention this station (used by the Skills tab)
  s.skills = Object.keys(T.skills).filter(k => T.skills[k].stations.includes(s.id));
  s.evidence = s.evidence || [];
  s.transfers = s.transfers || [];
});

T.NS = "http://www.w3.org/2000/svg";
T.reduceMotion = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Make an SVG element: T.svgEl("circle", {cx:10, cy:10, r:5}, parent) */
T.svgEl = function (tag, attrs, parent) {
  const e = document.createElementNS(T.NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
};

/* Make text safe to put inside HTML */
T.esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));

/* Round line bullets as HTML: T.bullets(["A","W"]) */
T.bullets = lines => lines.map(l => '<span class="bul b-' + l + '" aria-hidden="true">' + l + '</span>').join("");

/* Classes so the line filter can dim everything not on a line */
T.segClass = lines => "seg " + lines.map(l => "on-" + l).join(" ");

/* Short message at the bottom of the screen */
T.toast = function (msg) {
  const t = document.getElementById("toast");
  t.textContent = msg; t.classList.add("show");
  clearTimeout(T._toastTimer);
  T._toastTimer = setTimeout(() => t.classList.remove("show"), 1800);
};

/* Scroll the map into view */
T.scrollToMap = () => document.querySelector(".map-card").scrollIntoView({ behavior: T.reduceMotion ? "auto" : "smooth", block: "start" });
