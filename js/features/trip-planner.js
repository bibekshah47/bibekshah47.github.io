/* =====================================================================
   FEATURE · TRIP PLANNER — pick a skill, matching stations light up.
   Skills and their stations live in js/data/skills.js.
   ===================================================================== */
(function () {
  let active = null;
  T.setSkill = function (k) {
    const svg = document.getElementById("map");
    active = (k && k !== active) ? k : null;          // clicking the same skill again turns it off
    document.querySelectorAll("#skillRow .pill").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.skill === active)));
    svg.classList.toggle("skill-mode", !!active);
    for (const id in T.nodes) T.nodes[id].classList.toggle("match", !!active && T.skills[active].stations.includes(id));
    if (active) { T.setLine("all"); const n = T.skills[active].stations.length; T.toast(T.skills[active].label + ": " + n + " station" + (n > 1 ? "s" : "")); }
  };
  T.initTripPlanner = function () {
    const row = document.getElementById("skillRow");
    for (const k in T.skills) {
      const b = document.createElement("button");
      b.type = "button"; b.className = "pill"; b.dataset.skill = k; b.setAttribute("aria-pressed", "false");
      b.textContent = T.skills[k].label; row.appendChild(b);
    }
    row.addEventListener("click", e => { const b = e.target.closest("[data-skill]"); if (b) { if (T.stopRide) T.stopRide(); T.setSkill(b.dataset.skill); } });
  };
})();
