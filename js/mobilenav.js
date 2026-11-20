/* Navbar rel titik untuk HP. Titik dibuat otomatis dari bagian (section) yang ada di halaman. */
(function () {
  const NAMES = { home: "Home", tentang: "Tentang", tim: "Tim", skill: "Skill", layanan: "Layanan", proyek: "Proyek", faq: "FAQ", kontak: "Kontak" };
  const mq = matchMedia("(max-width:820px) and (min-height:520px)");
  const reduce = matchMedia("(prefers-reduced-motion:reduce)").matches;
  const secs = [...document.querySelectorAll("section[id]")].filter(s => !s.hidden);
  if (secs.length < 2) return;

  const el = document.createElement("div");
  el.className = "mnav";
  el.setAttribute("role", "navigation");
  el.setAttribute("aria-label", "Navigasi bagian");
  el.innerHTML = '<div class="mn-track"><i class="mn-fill"></i></div>' +
    secs.map((s, i) => '<button class="mn-dot" data-i="' + i + '" aria-label="' + (NAMES[s.id] || s.id) + '"><span></span></button>').join("") +
    '<div class="mn-label" aria-hidden="true"></div>';
  document.body.appendChild(el);

  const dots = [...el.querySelectorAll(".mn-dot")], fill = el.querySelector(".mn-fill"), label = el.querySelector(".mn-label");
  let cur = -1, timer = 0, raf = 0;
  const nm = i => String(i + 1).padStart(2, "0") + " \u00B7 " + (NAMES[secs[i].id] || secs[i].id);
  function show(ms) { el.classList.add("on"); clearTimeout(timer); timer = setTimeout(() => el.classList.remove("on"), ms || 1500); }
  function place(i) { const d = dots[i]; label.textContent = nm(i); label.style.top = (d.offsetTop + d.offsetHeight / 2) + "px"; }

  function update() {
    raf = 0;
    if (!mq.matches) return;
    const y = scrollY, ref = y + innerHeight * 0.35;
    const tops = secs.map(s => s.getBoundingClientRect().top + y);
    let i = 0;
    for (let k = 0; k < tops.length; k++) if (tops[k] <= ref) i = k;
    if (innerHeight + y >= document.documentElement.scrollHeight - 4) i = secs.length - 1;
    const nxt = tops[i + 1];
    const t = nxt ? Math.min(1, Math.max(0, (ref - tops[i]) / (nxt - tops[i]))) : 0;
    fill.style.height = (100 * (i + t) / (secs.length - 1)) + "%";
    if (i !== cur) {
      cur = i;
      dots.forEach((d, k) => {
        d.classList.toggle("past", k <= i);
        d.classList.toggle("act", k === i);
        if (k === i) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current");
      });
      place(i);
      show(1400);
    }
  }
  const queue = () => { if (!raf) raf = requestAnimationFrame(update); };

  el.addEventListener("click", e => {
    const b = e.target.closest(".mn-dot");
    if (!b) return;
    const i = +b.dataset.i, behavior = reduce ? "auto" : "smooth";
    place(i); show(1800);
    if (i === 0) scrollTo({ top: 0, behavior }); else secs[i].scrollIntoView({ behavior, block: "start" });
  });
  el.addEventListener("touchstart", () => { show(2200); if (cur >= 0) place(cur); }, { passive: true });
  el.addEventListener("focusin", () => show(2200));
  addEventListener("scroll", queue, { passive: true });
  addEventListener("resize", queue);
  if (mq.addEventListener) mq.addEventListener("change", queue);
  update();
})();