/* =====================================================================
   FEATURE · RIDE THE LINE — a gold train travels a line, stopping at each station.
   Speed: T.config.rideSeconds in js/config.js.
   ===================================================================== */
(function () {
  let timer = null, stops = [], i = 0, lineK = null;
  const status = () => document.getElementById("rideStatus");

  T.stopRide = function () {
    clearTimeout(timer); timer = null;
    status().hidden = true;
    if (T.tourTrain) T.tourTrain.style.display = "none";
    document.querySelectorAll("#rideRow .pill").forEach(b => b.setAttribute("aria-pressed", "false"));
  };
  const yFor = st => st.kind === "ix" ? T.lines[lineK].y : st.y;

  function step() {
    if (i >= stops.length) {
      document.getElementById("rideName").textContent = "End of the line. Select any station to explore.";
      timer = setTimeout(T.stopRide, 2600); return;
    }
    const st = stops[i++];
    T.tourTrain.style.display = "";
    T.tourTrain.style.transform = "translate(" + st.x + "px," + yFor(st) + "px)";
    T.selectOnMap(st.id);
    document.getElementById("rideName").textContent = st.title + " · " + st.when;
    status().dataset.id = st.id;
    timer = setTimeout(step, T.config.rideSeconds * 1000);
  }

  T.ride = function (k) {
    T.stopRide(); if (T.setSkill) T.setSkill(null); T.setLine(k);
    lineK = k; i = 0;
    stops = T.stations.filter(s => s.lines.includes(k)).sort((a, b) => a.x - b.x);
    status().hidden = false;
    document.querySelector('#rideRow [data-l="' + k + '"]').setAttribute("aria-pressed", "true");
    const first = stops[0];                         // place the train just before the first stop, without animating
    T.tourTrain.style.transition = "none";
    T.tourTrain.style.transform = "translate(" + (first.x - 40) + "px," + yFor(first) + "px)";
    T.tourTrain.style.display = "";
    void T.tourTrain.getBoundingClientRect();
    T.tourTrain.style.transition = "";
    timer = setTimeout(step, 150);
  };

  T.initRide = function () {
    const row = document.getElementById("rideRow");
    for (const k in T.lines) {                      // one button per line
      const b = document.createElement("button");
      b.type = "button"; b.className = "pill has-bul"; b.dataset.l = k;
      b.setAttribute("aria-label", "Ride the " + T.lines[k].name); b.setAttribute("aria-pressed", "false");
      b.innerHTML = '<span class="bul b-' + k + '">' + k + '</span>';
      b.addEventListener("click", () => T.ride(k));
      row.appendChild(b);
    }
    document.getElementById("rideStop").onclick = () => { T.stopRide(); T.setLine("all"); };
    document.getElementById("rideOpen").onclick = () => { const id = status().dataset.id; T.stopRide(); T.setLine("all"); T.openStation(id); };
  };
})();
