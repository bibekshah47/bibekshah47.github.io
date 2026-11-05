/* =====================================================================
   FEATURE · AI CHAT ("Ask the desk") — chat window in the Information desk.
   It sends questions to YOUR backend (chatbot-worker/worker.js on Cloudflare),
   which holds the OpenAI key. This file never sees the key.
   Turn on: set T.config.chatEndpoint in js/config.js.
   Station ids in answers, like [[pettis]], become buttons that open that station.
   ===================================================================== */
(function () {
  const history = [];              // the conversation so far, sent with each question
  let busy = false;

  /* Turn the answer text into safe HTML, with [[station]] → button */
  function format(text) {
    return T.esc(text)
      .replace(/\[\[([a-z0-9-]+)\]\]/gi, (m, id) => T.byId[id]
        ? '<button type="button" class="chat-stop" data-go="' + id + '">' + T.bullets([T.byId[id].lines[0]]) + T.esc(T.byId[id].name) + '</button>'
        : "")
      .replace(/\n/g, "<br>");
  }

  function add(role, html) {
    const log = document.getElementById("chatLog");
    const div = document.createElement("div");
    div.className = "msg " + role;
    div.innerHTML = html;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
    return div;
  }

  async function ask(question) {
    question = question.trim();
    if (!question || busy) return;
    busy = true;
    const input = document.getElementById("chatInput"), send = document.getElementById("chatSend");
    input.value = ""; send.disabled = true;
    document.getElementById("chatSuggest").hidden = true;
    add("user", T.esc(question));
    const wait = add("bot pending", '<span class="dots"><i></i><i></i><i></i></span>');
    try {
      const res = await fetch(T.config.chatEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, history: history.slice(-8) })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.error) throw new Error(data.error || "The information desk didn't respond. Please try again.");
      wait.className = "msg bot"; wait.innerHTML = format(data.answer);
      history.push({ role: "user", content: question }, { role: "assistant", content: data.answer });
    } catch (e) {
      wait.className = "msg bot err";
      wait.textContent = (e && e.message && !/fetch/i.test(e.message)) ? e.message : "Couldn't reach the information desk. Check your connection and try again.";
    }
    busy = false; send.disabled = false; input.focus();
  }

  T.initAiChat = function () {
    const box = document.getElementById("chat");
    if (!box || !T.config.chatEndpoint) return;     // stays hidden until an endpoint is set
    box.hidden = false;
    add("bot", "Hi! I’m the information desk. Ask me anything about Bibek’s work, research, or projects.");
    const sug = document.getElementById("chatSuggest");
    (T.config.chatSuggestions || []).forEach(q => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "pill"; b.textContent = q;
      b.addEventListener("click", () => ask(q));
      sug.appendChild(b);
    });
    document.getElementById("chatForm").addEventListener("submit", e => { e.preventDefault(); ask(document.getElementById("chatInput").value); });
    document.getElementById("chatLog").addEventListener("click", e => { const b = e.target.closest("[data-go]"); if (b) T.openStation(b.dataset.go); });
  };
})();
