/* =====================================================================
   MAIN — starts everything. To turn a feature off, comment out its line
   (put // in front). To add a feature, make js/features/your-feature.js,
   add a <script> tag for it in index.html, and call its init here.
   ===================================================================== */
T.drawMap();          // core/map.js
T.initLineFilter();   // features/line-filter.js
T.initTripPlanner();  // features/trip-planner.js
T.initRide();         // features/ride-the-line.js
T.initInfoDesk();     // features/info-desk.js
T.initContact();      // features/contact.js
T.initAiChat();       // features/ai-chat.js
T.initStationPage();  // features/station-page.js (last, so a #station link opens on load)
