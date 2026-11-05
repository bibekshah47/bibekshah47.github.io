/* =====================================================================
   FEATURE · INFORMATION DESK — keyword search across every station.
   Later this is where an "Ask about Bibek" AI chat could live.
   ===================================================================== */
T.initInfoDesk = function () {
  const q = document.getElementById("q"), res = document.getElementById("results");
  const haystack = s => [s.name, s.title, s.org, s.project, s.summary, (s.bullets || []).join(" "),
    s.story ? Object.values(s.story).join(" ") : "", s.skills.map(k => T.skills[k].label).join(" "),
    s.evidence.map(e => e.title + " " + (e.text || "")).join(" ")].join(" ").toLowerCase();

  function search() {
    const v = q.value.trim().toLowerCase();
    if (!v) { res.innerHTML = '<span class="none">Results appear here.</span>'; return; }
    const hits = T.stations.filter(s => haystack(s).includes(v));
    res.innerHTML = hits.length
      ? hits.map(s => '<button type="button" class="pill has-bul" data-go="' + s.id + '">' + T.bullets([s.lines[0]]) + T.esc(s.title) + '</button>').join("")
      : '<span class="none">No stations match “' + T.esc(v) + '”.</span>';
  }
  q.addEventListener("input", search);
  res.addEventListener("click", e => { const b = e.target.closest("[data-go]"); if (b) T.openStation(b.dataset.go); });
  search();
};
