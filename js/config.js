/* =====================================================================
   CONFIG — site-wide switches. Everything else reads from window.T.
   ===================================================================== */
window.T = window.T || {};

T.config = {
  // true  = show gray dashed "Add: ..." boxes for evidence you haven't added yet (good while building)
  // false = hide them, so visitors only see real evidence (use this on the live site)
  showPlaceholders: true,

  // Where the gold "YOU ARE HERE" line sits on the map, and its label
  nowX: 920,
  nowLabel: "YOU ARE HERE · NOV 2026",

  // Where every line ends (the Commencement terminal)
  endX: 1120,

  // Seconds the "Ride the line" train waits at each station
  rideSeconds: 2.2,

  // AI chat: paste your Cloudflare Worker URL here (see CHATBOT-SETUP.md).
  // Leave it as "" to hide the chat. NEVER put your OpenAI key in this file.
  chatEndpoint: "https://bibek-info-desk.shahbibek774.workers.dev",

  // Suggested questions shown under the chat
  chatSuggestions: [
    "What research is Bibek working on?",
    "Tell me about the Pettis competition",
    "What websites has he built?",
    "What campus jobs has he had?"
  ]
};
