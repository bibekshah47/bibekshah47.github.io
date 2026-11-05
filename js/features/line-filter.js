/* =====================================================================
   FEATURE · LINE FILTER — "All lines / Academic / Campus Work ..." buttons.
   ===================================================================== */
T.setLine = function (l) {
  const svg = document.getElementById("map");
  document.querySelectorAll("#lineFilter .pill").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.l === l)));
  if (l === "all") svg.removeAttribute("data-focus"); else svg.setAttribute("data-focus", l);
};
T.initLineFilter = function () {
  document.querySelectorAll("#lineFilter .pill").forEach(b => b.addEventListener("click", () => {
    if (T.setSkill) T.setSkill(null);
    if (T.stopRide) T.stopRide();
    T.setLine(b.dataset.l);
  }));
};
