/* =====================================================================
   FEATURE · STATION PAGE — the side sheet with Overview / Evidence / Skills / Transfers.
   Also handles shareable links (thebibekshah.com/#pettis) and "Copy link".
   To change what a tab SHOWS for one station, edit stations.js.
   To change how a tab is LAID OUT for every station, edit the render functions below.
   ===================================================================== */
(function () {
  const sheet = () => document.getElementById("sheet");
  const body  = () => document.getElementById("sh-body");
  let current = null, tab = "overview", lastFocus = null;
  const showPh = () => T.config.showPlaceholders;
  const ph = text => showPh() ? '<div class="ph"><b>Add:</b> ' + T.esc(text) + '</div>' : "";

  /* ---------- Tab: Overview ---------- */
  function renderOverview(st) {
    let h = "";
    if (st.story) {
      const row = (label, val, hint) => (val ? '<div class="row"><div class="t">' + label + '</div><div>' + T.esc(val) + '</div></div>'
        : (showPh() ? '<div class="row"><div class="t">' + label + '</div>' + ph(hint) + '</div>' : ""));
      h += '<h4>The story</h4><div class="story">' +
        row("Problem", st.story.problem, "1–2 sentences on the problem") +
        row("What I did", st.story.did, "what you did") +
        row("Result", st.story.result, "the outcome") + '</div>';
    }
    if (st.summary) h += '<p style="margin-top:0">' + T.esc(st.summary) + '</p>';
    if (st.bullets) h += '<ul>' + st.bullets.map(b => '<li>' + T.esc(b) + '</li>').join("") + '</ul>';
    if (st.stats) h += '<div class="stats">' + st.stats.map(s => '<div class="stat"><b>' + T.esc(s[0]) + '</b><small>' + T.esc(s[1]) + '</small></div>').join("") + '</div>';
    if (!h) h = ph("a sentence on what this recognizes") || '<p class="muted">' + T.esc(st.org) + '</p>';
    const n = visibleEvidence(st).length;
    if (n) h += '<p class="muted small" style="margin-top:18px">' + n + ' evidence item' + (n > 1 ? 's' : '') + '. See the Evidence tab.</p>';
    return h;
  }

  /* ---------- Tab: Evidence ---------- */
  const hasContent = e => !!(e.src || e.url || e.text);
  const visibleEvidence = st => st.evidence.filter(e => hasContent(e) || showPh());

  function renderEvidenceItem(e, i) {
    const wide = (e.type === "deck" && i === 0) ? " wide" : "";
    let inner = "";
    if (hasContent(e)) {                                   // real evidence
      if (e.type === "photo") inner = '<img src="' + T.esc(e.src) + '" alt="' + T.esc(e.title) + '" loading="lazy">';
      else if (e.type === "deck") inner = (e.cover ? '<img src="' + T.esc(e.cover) + '" alt="' + T.esc(e.title) + ' cover" loading="lazy">' : "") +
                                           '<a class="btn" href="' + T.esc(e.src) + '" target="_blank" rel="noopener">Open deck (PDF) ↗</a>';
      else if (e.type === "link") inner = '<a class="btn" href="' + T.esc(e.url) + '" target="_blank" rel="noopener">Open ↗</a>';
      else if (e.type === "quote") inner = '<blockquote>“' + T.esc(e.text) + '”' + (e.by ? '<cite>— ' + T.esc(e.by) + '</cite>' : '') + '</blockquote>';
      else inner = '<div class="real-text">' + T.esc(e.text) + '</div>';
      return '<div class="ev' + wide + '">' + inner + '<div class="ttl">' + T.esc(e.title) + '</div>' + (e.caption ? '<div class="cap">' + T.esc(e.caption) + '</div>' : '') + '</div>';
    }
    // placeholder
    const frames = {
      photo: '<div class="frame f-photo">Photo</div>',
      deck:  '<div class="frame f-deck">Slide deck</div>',
      quote: '<div class="frame f-quote">“ Quote goes here</div>',
      link:  '<div class="frame f-link">↗ Link</div>',
      text:  '<div class="frame f-text"><i style="width:90%"></i><i style="width:75%"></i><i style="width:82%"></i><i style="width:55%"></i></div>'
    };
    return '<div class="ev' + wide + '">' + (frames[e.type] || frames.text) + '<div class="ttl">' + T.esc(e.title) + '</div><div class="add">Add: ' + T.esc(e.add || "") + '</div></div>';
  }
  function renderEvidence(st) {
    const items = visibleEvidence(st);
    if (!items.length) return '<p class="muted">Evidence for this station is on its way.</p>';
    return '<div class="ev-grid">' + items.map(renderEvidenceItem).join("") + '</div>';
  }

  /* ---------- Tab: Skills used ---------- */
  function renderSkills(st) {
    if (!st.skills.length) return '<p class="muted">No skills tagged for this station yet.</p>';
    return '<p class="muted" style="margin-top:0">Select a skill to see every station where it shows up.</p><div class="skill-list">' +
      st.skills.map(k => { const n = T.skills[k].stations.length; return '<button type="button" data-skill="' + k + '">' + T.esc(T.skills[k].label) + ' · ' + n + ' station' + (n > 1 ? 's' : '') + '</button>'; }).join("") + '</div>';
  }

  /* ---------- Tab: Transfers ---------- */
  function renderTransfers(st) {
    const list = st.transfers.filter(([id]) => T.byId[id]);
    if (!list.length) return '<p class="muted">No transfers from this station.</p>';
    return '<div class="xfer">' + list.map(([id, why]) => { const t = T.byId[id];
      return '<button type="button" data-go="' + id + '">' + T.bullets(t.lines) + '<span>' + T.esc(t.title) + '<span class="why">' + T.esc(why) + '</span></span><span class="go">Transfer →</span></button>'; }).join("") + '</div>';
  }

  const RENDER = { overview: renderOverview, evidence: renderEvidence, skills: renderSkills, transfers: renderTransfers };

  function renderTab() {
    document.querySelectorAll("#sh-tabs button").forEach(b => b.setAttribute("aria-selected", String(b.dataset.t === tab)));
    body().innerHTML = RENDER[tab](T.byId[current]);
    body().scrollTop = 0;
  }

  /* ---------- Open / close ---------- */
  T.openStation = function (id) {
    const st = T.byId[id]; if (!st) return;
    if (T.stopRide) T.stopRide();
    if (!sheet().classList.contains("open")) lastFocus = document.activeElement;
    current = id; tab = "overview";
    T.selectOnMap(id);
    document.getElementById("sh-k").innerHTML = T.bullets(st.lines) + '<span>' + st.lines.map(l => T.lines[l].name).join(" · ") + '</span>';
    document.getElementById("sh-title").textContent = st.title;
    document.getElementById("sh-org").textContent = st.org + (st.project ? " · " + st.project : "");
    document.getElementById("sh-when").textContent = st.when;
    renderTab();
    sheet().classList.add("open"); document.getElementById("scrim").classList.add("open");
    sheet().setAttribute("aria-hidden", "false"); document.body.classList.add("locked");
    if (location.hash !== "#" + id) { try { history.replaceState(null, "", "#" + id); } catch (e) {} }
    document.getElementById("sh-close").focus();
  };
  T.closeStation = function () {
    sheet().classList.remove("open"); document.getElementById("scrim").classList.remove("open");
    sheet().setAttribute("aria-hidden", "true"); document.body.classList.remove("locked");
    try { history.replaceState(null, "", location.pathname + location.search); } catch (e) {}
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  };

  T.initStationPage = function () {
    document.getElementById("sh-close").onclick = T.closeStation;
    document.getElementById("scrim").onclick = T.closeStation;
    document.addEventListener("keydown", e => { if (e.key === "Escape" && sheet().classList.contains("open")) T.closeStation(); });
    document.getElementById("sh-tabs").addEventListener("click", e => { const b = e.target.closest("button"); if (b) { tab = b.dataset.t; renderTab(); } });
    body().addEventListener("click", e => {
      const go = e.target.closest("[data-go]"); if (go) { T.openStation(go.dataset.go); return; }
      const sk = e.target.closest("[data-skill]"); if (sk) { T.closeStation(); T.setSkill(sk.dataset.skill); T.scrollToMap(); }
    });
    // Copy a shareable link to this station
    document.getElementById("sh-copy").addEventListener("click", () => {
      const url = location.href.split("#")[0] + "#" + current;
      try { navigator.clipboard.writeText(url).then(() => T.toast("Link copied"), () => T.toast(url)); } catch (e) { T.toast(url); }
    });
    // Open a station from the link: thebibekshah.com/#pettis
    const fromHash = () => { const id = location.hash.slice(1); if (T.byId[id]) T.openStation(id); };
    window.addEventListener("hashchange", fromHash);
    fromHash();
  };
})();
