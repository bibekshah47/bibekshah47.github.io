/* =====================================================================
   FEATURE · CONTACT — the "Copy email" button on the ticket.
   ===================================================================== */
T.initContact = function () {
  const btn = document.getElementById("copy-email"), email = document.getElementById("email");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const done = () => { btn.textContent = "Copied"; setTimeout(() => btn.textContent = "Copy email", 1600); };
    const fallback = () => { const r = document.createRange(); r.selectNodeContents(email); const s = getSelection(); s.removeAllRanges(); s.addRange(r); btn.textContent = "Selected, press Ctrl+C"; };
    try { navigator.clipboard.writeText(email.textContent).then(done, fallback); } catch (e) { fallback(); }
  });
};
