/* =====================================================================
   STATIONS — every stop on the map and everything on its station page.
   This is the file you'll edit most.

   ---------------------------------------------------------------------
   FIELDS
   id        unique short name, also the shareable link: thebibekshah.com/#pettis
   kind      "stop" (circle) · "tick" (honor mark) · "ix" (interchange pill)
   lines     which line(s) it sits on, e.g. ["V"] or ["A","W"]
   x         left-right position (time). 100 = 2022 ... 920 = now ... 1120 = May 2028
   y         height = the line's y from lines.js (stop/tick only)
   y1, y2    top and bottom of an interchange pill (ix only)
   side      "above" or "below": where the map label goes (stop/tick)
   labelX, labelY, anchor   label position for an interchange ("start"|"middle"|"end")
   name, sub label on the map (keep short)
   future    true = dashed outline (planned)
   featured  true = gold dot on the map (has a full station page)

   title, org, when, project     header of the station page
   story     { problem, did, result }  shown as rows on Overview (leave problem: "" to show a placeholder)
   summary   one paragraph for Overview (used when there's no story)
   bullets   list of bullet points for Overview
   stats     [["66.5K","social media views"], ...]
   evidence  list of evidence items (see below)
   transfers [["stationId", "why they connect"], ...]

   ---------------------------------------------------------------------
   EVIDENCE ITEMS: leave the content field out and a placeholder shows instead
   { type:"photo", title:"...", src:"assets/pettis/stage.jpg", caption:"..." }
   { type:"deck",  title:"...", src:"assets/pettis/deck.pdf", cover:"assets/pettis/cover.png" }
   { type:"link",  title:"...", url:"https://..." }
   { type:"text",  title:"...", text:"Your paragraph" }
   { type:"quote", title:"...", text:"The quote", by:"Who said it" }
   "add" is the hint shown on the placeholder; it's ignored once real content is there.

   TO ADD A STATION: copy a whole { ... } block, give it a new id, change x/y, save.
   ===================================================================== */

T.stations = [

  /* ---------------- V · VENTURE LINE ---------------- */
  {
    id: "ycc", kind: "stop", lines: ["V"], x: 100, y: 170, side: "below",
    name: "YCC Ambassador", sub: "Dubai · 2022",
    title: "Young Citizens Conference (YCC) Ambassador", org: "MILSET Expo Asia, Dubai", when: "2022",
    summary: "Represented at an international science exhibition and engaged with participants from 30+ countries.",
    evidence: [
      { type: "photo", title: "Ambassador certificate", add: "assets/ycc/certificate.jpg" },
      { type: "photo", title: "At MILSET Expo Asia", add: "assets/ycc/expo.jpg" },
      { type: "text",  title: "What you exhibited", add: "2–3 sentences" }
    ],
    transfers: [["pettis", "Presenting ideas to an audience, again in 2025"]]
  },
  {
    id: "pettis", kind: "stop", lines: ["V"], x: 480, y: 110, side: "above", featured: true,
    name: "Pettis Competition Finalist", sub: "PeekMind · 2025",
    title: "Pettis Business Idea Competition, Finalist", org: "SUNY Brockport", when: "2025",
    story: {
      problem: "test",  // ← write 1–2 sentences on the problem PeekMind solves
      did: "Presented PeekMind, a productivity platform concept, to judges and an audience.",
      result: "Named a finalist in the 2025 Pettis Business Idea Competition."
    },
    evidence: [
      { type: "deck",  title: "PeekMind pitch deck", add: "assets/pettis/peekmind-deck.pdf" },
      { type: "photo", title: "Presenting on stage", add: "assets/pettis/stage.jpg" },
      { type: "text",  title: "One-page summary: problem, solution, market", add: "Write it here in the text field" },
      { type: "quote", title: "A question the judges asked, and your answer", add: "Your words" },
      { type: "text",  title: "What I'd change about PeekMind now", add: "2–3 sentences of reflection" }
    ],
    transfers: [
      ["central", "Minor in Entrepreneurship at SUNY Brockport"],
      ["ycc", "Where presenting to an audience started"],
      ["club", "The next venture stop: a campus startup club"]
    ]
  },
  {
    id: "club", kind: "stop", lines: ["V"], x: 990, y: 110, side: "below", future: true,
    name: "Startup Club", sub: "in planning",
    title: "SUNY Brockport Startup Club", org: "In planning", when: "Planned",
    summary: "Building a startup community at SUNY Brockport, open to students from any major, to collaborate and build startup projects together.",
    evidence: [
      { type: "text",  title: "Mission and plan", add: "Short paragraph" },
      { type: "photo", title: "First meeting photo", add: "assets/club/first-meeting.jpg" }
    ],
    transfers: [["pettis", "Started from the Pettis competition experience"]]
  },

  /* ---------------- A · ACADEMIC LINE ---------------- */
  {
    id: "central", kind: "ix", lines: ["A","W"], x: 300, y1: 230, y2: 350,
    labelX: 280, labelY: 286, anchor: "end",
    name: "Brockport Central", sub: "SUNY Brockport",
    title: "State University of New York at Brockport", org: "B.S. Computer Science, Minor in Entrepreneurship", when: "Exp. May 2028",
    summary: "Brockport, NY. Where the Academic and Campus Work lines begin.",
    evidence: [
      { type: "text", title: "Relevant coursework", add: "List 4–6 courses" },
      { type: "link", title: "Link to a class project", add: "github.com/bibekshah47/…" }
    ],
    transfers: [["pettis","Entrepreneurship minor in action"],["creator","CIS 422 Database Design project"],["grad","Final stop: Commencement"]]
  },
  { id: "dl24", kind: "tick", lines: ["A"], x: 385, y: 230, side: "above", name: "Dean’s List", sub: "Fall 2024",
    title: "Dean’s List", org: "SUNY Brockport", when: "Fall 2024", summary: "First of three Dean’s List semesters.",
    evidence: [], transfers: [["dl25","Dean’s List again, Fall 2025"]] },
  { id: "pl25", kind: "tick", lines: ["A"], x: 460, y: 230, side: "below", name: "President’s List", sub: "Spring 2025",
    title: "President’s List", org: "SUNY Brockport", when: "Spring 2025", evidence: [], transfers: [] },
  { id: "basc", kind: "tick", lines: ["A"], x: 530, y: 230, side: "above", name: "BASC Scholarship", sub: "$1,000 · 2025",
    title: "BASC Scholarship", org: "$1,000", when: "2025",
    evidence: [{ type: "text", title: "What the scholarship recognizes", add: "1–2 sentences" }],
    transfers: [["harrison","Worked at Harrison Dining (BASC)"]] },
  { id: "dl25", kind: "tick", lines: ["A"], x: 600, y: 230, side: "below", name: "Dean’s List", sub: "Fall 2025",
    title: "Dean’s List", org: "SUNY Brockport", when: "Fall 2025", evidence: [], transfers: [] },
  { id: "dl26", kind: "tick", lines: ["A"], x: 680, y: 230, side: "above", name: "Dean’s List", sub: "Spring 2026",
    title: "Dean’s List", org: "SUNY Brockport", when: "Spring 2026", summary: "Third Dean’s List semester: Fall 2024, Fall 2025, Spring 2026.",
    evidence: [], transfers: [] },
  { id: "died", kind: "tick", lines: ["A"], x: 740, y: 230, side: "below", name: "Diederich", sub: "$5,000 · 2026",
    title: "Thomas C. ’63 and Judy Diederich Scholarship", org: "$5,000", when: "2026",
    evidence: [{ type: "text", title: "What the scholarship recognizes", add: "1–2 sentences" }], transfers: [] },

  /* ---------------- W · CAMPUS WORK LINE ---------------- */
  {
    id: "night", kind: "stop", lines: ["W"], x: 330, y: 350, side: "below",
    name: "Night Desk Attendant", sub: "Aug–Dec 2024",
    title: "Night Desk Attendant", org: "SUNY Brockport Residence Life", when: "Aug 2024 – Dec 2024",
    bullets: [
      "Assisted students and visitors with questions while maintaining a welcoming and professional front-desk environment.",
      "Verified student identification, managed guest sign-ins, and followed university procedures."
    ],
    evidence: [], transfers: [["harrison","Next campus job"]]
  },
  {
    id: "harrison", kind: "stop", lines: ["W"], x: 380, y: 350, side: "above",
    name: "Harrison Dining", sub: "2024–2026",
    title: "Student Employee", org: "Brockport Auxiliary Service Corporation, Harrison Dining", when: "2024 – 2026",
    bullets: [
      "Provided friendly customer service while assisting hundreds of students in a fast-paced campus environment.",
      "Demonstrated reliability, punctuality, and professionalism during scheduled shifts."
    ],
    evidence: [], transfers: [["basc","BASC Scholarship, 2025"]]
  },
  {
    id: "pts", kind: "stop", lines: ["W"], x: 520, y: 350, side: "below", featured: true,
    name: "Marketing Manager", sub: "Parking & Transportation",
    title: "Marketing Manager", org: "Parking & Transportation Services, SUNY Brockport", when: "2025 – Present",
    bullets: [
      "Help students understand campus transportation and parking services by providing clear information through digital platforms.",
      "Helped generate 66.5K social media views and 1.4K interactions during a three-month reporting period."
    ],
    stats: [["66.5K","social media views"],["1.4K","interactions"],["3 mo","reporting period"]],
    evidence: [
      { type: "photo", title: "Post you made #1", add: "assets/pts/post-1.jpg" },
      { type: "photo", title: "Post you made #2", add: "assets/pts/post-2.jpg" },
      { type: "photo", title: "Analytics screenshot (66.5K views)", add: "assets/pts/analytics.png" }
    ],
    transfers: [["site","The job that inspired this transit-map site"]]
  },

  /* ---------------- R · RESEARCH & TEACHING LINE ---------------- */
  {
    id: "junction", kind: "ix", lines: ["A","W","R"], x: 800, y1: 230, y2: 470,
    labelX: 776, labelY: 408, anchor: "end",
    name: "Fall ’26 Junction", sub: "Lab Assistant · CSC 311",
    title: "Lab Assistant, CSC 311: Computer Organization & Architecture", org: "SUNY Brockport", when: "Aug 2026 – Present",
    bullets: [
      "Help students troubleshoot lab assignments and identify problems with their code and computer architecture exercises.",
      "Work with the instructor to support students and keep lab sessions organized."
    ],
    evidence: [
      { type: "text",  title: "Topics you help with", add: "e.g. assembly, logic gates, memory" },
      { type: "quote", title: "Quote from the instructor", add: "Ask permission first" }
    ],
    transfers: [["nsf","Started the same semester"]]
  },
  {
    id: "nsf", kind: "stop", lines: ["R"], x: 870, y: 470, side: "below", featured: true,
    name: "NSF Research Assistant", sub: "Aug 2026 – now",
    title: "Undergraduate Research Assistant", org: "SUNY Brockport, NSF-Funded Research",
    project: "Data-Centric AI for Proactive Telecom Network Operations", when: "Aug 2026 – Present",
    bullets: [
      "Work with faculty on an NSF-funded research project focused on AI and telecommunications network operations.",
      "Assist with research involving datasets, data analysis, and AI/ML concepts while developing technical problem-solving and research skills."
    ],
    evidence: [
      { type: "text",  title: "Plain-language abstract", add: "Check with your advisor first" },
      { type: "photo", title: "A chart or poster", add: "assets/nsf/chart.png" },
      { type: "text",  title: "Tools and methods", add: "e.g. Python, pandas" }
    ],
    transfers: [["junction","Lab Assistant, same semester"]]
  },

  /* ---------------- P · PROJECTS LINE ---------------- */
  {
    id: "creator", kind: "stop", lines: ["P"], x: 720, y: 590, side: "below", featured: true,
    name: "CreatorConnect", sub: "CIS 422",
    title: "CreatorConnect", org: "Content Creator & Brand Collaboration Management System · CIS 422, team of four", when: "Fall 2026",
    summary: "Database design project for CIS 422 (Database Design & Implementation) at SUNY Brockport. The design has 10 entities, including Brand, Creator, Campaign, ContentSubmission and Payment.",
    evidence: [
      { type: "photo", title: "ER diagram", add: "assets/creatorconnect/er-diagram.png" },
      { type: "deck",  title: "Phase 1 design review deck", add: "assets/creatorconnect/design-review.pdf" },
      { type: "text",  title: "Your role on the team", add: "1–2 sentences" }
    ],
    transfers: [["central","CIS 422 at SUNY Brockport"]]
  },
  {
    id: "carshare", kind: "stop", lines: ["P"], x: 785, y: 590, side: "above", featured: true,
    name: "Brockport CarShare", sub: "Website",
    title: "Brockport CarShare", org: "Website, presented at SUNY Brockport", when: "Fall 2026",
    summary: "Built the Brockport CarShare website and presented it at SUNY Brockport.",
    evidence: [
      { type: "link",  title: "Live site", add: "add the URL" },
      { type: "photo", title: "Homepage screenshot", add: "assets/carshare/home.png" },
      { type: "text",  title: "What you built it with", add: "stack and features" }
    ],
    transfers: [["pts","Transportation, again"],["site","Another site you shipped"]]
  },
  {
    id: "evervist", kind: "stop", lines: ["P"], x: 845, y: 590, side: "below", featured: true,
    name: "Evervist", sub: "Building now",
    title: "Evervist", org: "A guide for international students coming to or studying in the USA", when: "Fall 2026 – Present",
    summary: "Building a website that covers what international students need: finding a college, visa interview prep, documents, a shopping checklist and a departure checklist.",
    evidence: [
      { type: "link",  title: "Live site", add: "add the URL" },
      { type: "link",  title: "GitHub repo", url: "https://github.com/bibekshah47/evervist" },
      { type: "photo", title: "Screenshot", add: "assets/evervist/home.png" }
    ],
    transfers: [["ycc","International experience, from Dubai to Brockport"],["club","Ventures in progress"]]
  },
  {
    id: "site", kind: "stop", lines: ["P"], x: 900, y: 590, side: "above",
    name: "This website", sub: "Nov 2026",
    title: "thebibekshah.com", org: "This transit-map resume site", when: "Nov 2026",
    summary: "Designed and shipped a resume site drawn as a subway map, hosted on GitHub Pages on a custom domain.",
    evidence: [
      { type: "link", title: "GitHub repo", url: "https://github.com/bibekshah47/bibekshah47.github.io" }
    ],
    transfers: [["pts","Inspired by the Parking & Transportation job"]]
  },

  /* ---------------- TERMINAL ---------------- */
  {
    id: "grad", kind: "ix", lines: ["A","W","R","V","P"], x: 1120, y1: 110, y2: 590, future: true,
    labelX: 1120, labelY: 68, anchor: "middle",
    name: "Commencement", sub: "May 2028 · planned",
    title: "Commencement", org: "B.S. Computer Science, Minor in Entrepreneurship, SUNY Brockport", when: "May 2028",
    summary: "Every line runs to this terminal. Expected graduation: May 2028.",
    evidence: [], transfers: [["central","Where it started"]]
  }
];
