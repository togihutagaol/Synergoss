/* Bagian FAQ Synergos.Web: data dan logika ada di file ini, tidak perlu mengubah data.js.
   - Tambah / ubah / hapus pertanyaan di daftar "items".
   - Kosongkan daftar ( items: [] ) untuk menyembunyikan seluruh bagian FAQ. */
const FAQ = {
  title: "Pertanyaan umum",
  intro: "Jawaban singkat untuk hal-hal yang sering ditanyakan sebelum memesan website.",
  items: [
    { q: "Berapa lama pengerjaan sebuah website?",
      a: "Tergantung jenis dan kerumitan websitenya. Landing page biasanya lebih singkat daripada website bisnis dengan banyak halaman. Setelah kamu menceritakan kebutuhan, kami beri estimasi waktu sebelum pengerjaan dimulai." },
    { q: "Berapa biayanya?",
      a: "Biaya mengikuti jenis website, jumlah halaman, dan fitur yang dibutuhkan. Hubungi kami dengan kebutuhanmu, lalu kami kirim penawaran yang jelas sebelum pengerjaan dimulai." },
    { q: "Apa yang perlu saya siapkan?",
      a: "Logo, teks, dan foto bila sudah ada, serta contoh website yang kamu sukai. Kalau belum ada, tidak masalah. Ceritakan saja dulu kebutuhanmu." },
    { q: "Apakah sudah termasuk domain dan hosting?",
      a: "Domain (alamat website) dan hosting (tempat website tayang) kami bahas saat diskusi. Kami jelaskan pilihannya dan apakah termasuk dalam penawaran, supaya semuanya jelas sejak awal." },
    { q: "Bagaimana sistem pembayarannya?",
      a: "Sistem pembayaran kami sepakati bersama sebelum pengerjaan dimulai, termasuk tahapan dan metodenya, supaya jelas bagi kedua pihak." },
    { q: "Apakah website bisa dibuka dengan nyaman di HP?",
      a: "Ya. Setiap website kami buat responsif, sehingga tampil rapi di HP, tablet, maupun komputer." },
    { q: "Apakah kalian bisa membuat aplikasi?",
      a: "Belum. Saat ini kami fokus pada landing page, website, company profile, dan website bisnis. Pembuatan aplikasi sedang kami pelajari dan akan kami umumkan saat tim siap." }
  ],
  more: { title: "Pertanyaanmu belum terjawab?", text: "Tanyakan langsung, kami balas secepatnya.", button: "Hubungi kami" }
};

(function () {
  if (!FAQ.items || !FAQ.items.length) return;
  const kontak = document.getElementById("kontak");
  if (!kontak) return;
  const sec = document.createElement("section");
  sec.id = "faq";
  sec.innerHTML = '<h2></h2><p class="sub"></p><div class="fq-list pre"></div><div class="fq-more"><div><h3></h3><p></p></div><a class="btn p" href="#kontak"></a></div>';
  sec.querySelector("h2").textContent = FAQ.title;
  sec.querySelector(".sub").textContent = FAQ.intro;
  const m = FAQ.more || {};
  sec.querySelector(".fq-more h3").textContent = m.title || "";
  sec.querySelector(".fq-more p").textContent = m.text || "";
  sec.querySelector(".fq-more a").textContent = m.button || "Hubungi kami";
  const list = sec.querySelector(".fq-list");
  FAQ.items.forEach((it, i) => {
    const d = document.createElement("div");
    d.className = "fq";
    d.style.setProperty("--i", i);
    d.innerHTML = '<button class="fq-q" id="fq-q' + i + '" aria-expanded="false" aria-controls="fq-a' + i + '"><span></span><i aria-hidden="true">+</i></button><div class="fq-a" id="fq-a' + i + '" role="region" aria-labelledby="fq-q' + i + '"><div><p></p></div></div>';
    d.querySelector("span").textContent = it.q;
    d.querySelector("p").textContent = it.a;
    list.appendChild(d);
  });
  list.addEventListener("click", e => {
    const b = e.target.closest(".fq-q");
    if (!b) return;
    const f = b.parentElement, willOpen = !f.classList.contains("open");
    list.querySelectorAll(".fq.open").forEach(x => { x.classList.remove("open"); x.querySelector(".fq-q").setAttribute("aria-expanded", "false"); });
    if (willOpen) { f.classList.add("open"); b.setAttribute("aria-expanded", "true"); }
  });
  kontak.parentNode.insertBefore(sec, kontak);
  new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { list.classList.remove("pre"); o.disconnect(); } }, { threshold: 0.1 }).observe(list);
  const k = document.querySelector('.ft-col[aria-label="Menu footer"] a[href="#kontak"]');
  if (k) { const a = document.createElement("a"); a.href = "#faq"; a.textContent = "FAQ"; k.before(a); }
})();