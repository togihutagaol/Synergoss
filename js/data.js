/* Synergos.Web - data website. Edit file ini untuk mengganti teks, tim, skill, layanan, dan kontak. */
/* ============ EDIT DI SINI SAJA ============ */
const SITE = {
  name: "Synergos.Web",
  badge: "Tim pembuat website · 6 anggota",
  waMessage: "Halo {nama}, saya melihat website Synergos.Web dan ingin berdiskusi.",   // pesan awal WhatsApp
  code: `const tim = "Synergos.Web";
const layanan = [
  "Landing page",
  "Company profile",
  "Website bisnis"
];

function bangun(ide) {
  return desain(ide) + kode(ide);
}

bangun("website impianmu");
// selesai, siap tayang`,
  typed: ["Landing page.", "Company profile.", "Website bisnis.", "Aplikasi, segera."],
  lead: "Kami membantu bisnis tampil profesional di internet lewat website yang cepat, rapi, dan mudah dipakai pelanggan.",
};
const TEAM = [   // semua kolom selain name dan role boleh dikosongkan; yang kosong otomatis disembunyikan.
  // photo: "photos/nama.png" | whatsapp: tulis biasa, contoh "08123456789" (otomatis diubah ke format WhatsApp)
  // email: "nama@email.com" | links: alamat lengkap, contoh github: "https://github.com/username"
  { name: "Togi", role: "Frontend Developer", photo: "photos/Togi.jpeg",
    bio: "Membangun tampilan website yang cepat, responsif, dan nyaman dipakai.",
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Tailwind CSS"],
    quote: "Tampilan yang baik dimulai dari detail kecil.",
    ask: "tampilan website, animasi, dan performa halaman",
    whatsapp: "085297086811", email: "",
    links: { github: "https://github.com/togihutagaol/Travel-Go.git", linkedin: "", instagram: "https://www.instagram.com/togihtgll?psln=bnc0YWJnNjBhaTJu&utm_source=qr" } },
  { name: "Sonang", role: "Database Developer", photo: "photos/Sonang.jpeg",
    bio: "Merancang dan mengelola database agar data tersimpan rapi dan mudah diakses.",
    skills: ["MySQL", "Supabase", "PHP"],
    quote: "Data yang tertata membuat semuanya lebih mudah.",
    ask: "database, struktur data, dan penyimpanan data",
    whatsapp: "085270494303", email: "",
    links: { github: "", linkedin: "", instagram: "https://www.instagram.com/sonang_trgn?fqnt=MXYzMHY4bzF6NWgxaw==" } },
  { name: "Suhastio", role: "UI/UX Designer", photo: "photos/Suhastio.jpeg",
    bio: "Merancang tampilan dan alur pengguna supaya website mudah dimengerti.",
    skills: ["Figma", "CSS3"],
    quote: "Desain yang baik terasa mudah dipakai.",
    ask: "desain tampilan dan pengalaman pengguna",
    whatsapp: "0895324984425", email: "",
    links: { github: "", linkedin: "", instagram: "https://www.instagram.com/enantionomai?bqrl=MTRqNmJid2lrYTFpcg%3D%3D&utm_source=qr" } },
  { name: "Fazar", role: "UI/UX Designer", photo: "photos/Fazar.jpeg",
    bio: "Membuat desain visual yang konsisten dan enak dilihat di semua ukuran layar.",
    skills: ["Figma", "Tailwind CSS"],
    quote: "Setiap detail punya alasan.",
    ask: "desain visual, warna, dan identitas tampilan",
    whatsapp: "082379236641", email: "",
    links: { github: "", linkedin: "", instagram: "https://www.instagram.com/fazarsmkr?hvrq=NTIzN3VoazlxN2Ri&utm_source=qr" } },
  { name: "Frieza", role: "Backend Developer", photo: "photos/Frieza.jpeg",
    bio: "Membangun sistem di balik layar agar website berjalan stabil dan aman.",
    skills: ["PHP", "Node.js", "MySQL", "Git", "GitHub"],
    quote: "Di balik layar yang rapi, ada sistem yang kokoh.",
    ask: "sistem, login, dan keamanan website",
    whatsapp: "", email: "",
    links: { github: "", linkedin: "", instagram: "" } },
  { name: "Cordiaz", role: "Marketing Specialist", photo: "photos/Cordiez.jpeg",
    bio: "Membantu website dan bisnis klien dikenal lebih banyak orang.",
    skills: ["SEO", "Social Media"],
    quote: "Website yang bagus perlu dilihat banyak orang.",
    ask: "promosi, SEO, dan media sosial",
    whatsapp: "082284075093", email: "",
    links: { github: "", linkedin: "", instagram: "https://www.instagram.com/cordiaztampubolon?evlk=emwxcWtkZmliZGww" } }
];
const I = "icons/";  // folder gambar skill
const SKILLS = [  // cat = bidang (dipakai untuk filter), desc = penjelasan di sisi belakang kartu
  // Ganti gambar sendiri: icon: I+"nama-file.png". inv:true = ikon hitam dibalik jadi putih. Tanpa icon: pakai emoji.
  { n: "React", cat: "Frontend", icon: I+"react.svg", desc: "Library JavaScript untuk membangun tampilan website yang interaktif." },
  { n: "JavaScript", cat: "Frontend", icon: I+"javascript.svg", desc: "Bahasa pemrograman yang membuat halaman web bergerak dan merespons pengguna." },
  { n: "HTML5", cat: "Frontend", icon: I+"html5.svg", desc: "Kerangka dasar halaman web: struktur teks, gambar, dan tautan." },
  { n: "CSS3", cat: "Frontend", icon: I+"css3.svg", desc: "Mengatur warna, tata letak, dan animasi agar tampilan menarik." },
  { n: "Tailwind CSS", cat: "Frontend", icon: I+"tailwindcss.svg", desc: "Framework CSS berbasis kelas untuk membuat desain dengan cepat dan konsisten." },
  { n: "PHP", cat: "Backend", icon: I+"php.svg", desc: "Bahasa sisi server untuk membuat website dinamis dan sistem login." },
  { n: "Node.js", cat: "Backend", icon: I+"nodejs.svg", desc: "Menjalankan JavaScript di server untuk membangun API dan layanan web." },
  { n: "MySQL", cat: "Database", icon: I+"mysql.svg", desc: "Database relasional untuk menyimpan dan mengelola data dalam tabel." },
  { n: "Supabase", cat: "Database", icon: I+"supabase.svg", desc: "Layanan database dan login siap pakai berbasis PostgreSQL." },
  { n: "Figma", cat: "Desain", icon: I+"figma.svg", desc: "Aplikasi desain untuk membuat rancangan tampilan dan prototipe bersama tim." },
  { n: "Git", cat: "Tools", icon: I+"git.svg", desc: "Mencatat riwayat perubahan kode agar mudah ditelusuri dan dikembalikan." },
  { n: "GitHub", cat: "Tools", icon: I+"github.svg", inv: true, desc: "Tempat menyimpan kode secara online dan berkolaborasi dalam tim." },
  { n: "Vercel", cat: "Tools", icon: I+"vercel.svg", inv: true, desc: "Layanan hosting untuk menayangkan website agar bisa dibuka lewat link." },
  { n: "SEO", cat: "Marketing", emoji: "🔍", desc: "Mengoptimalkan website agar mudah ditemukan di hasil pencarian Google." },
  { n: "Social Media", cat: "Marketing", emoji: "📣", desc: "Mengelola konten media sosial untuk menjangkau dan menarik calon klien." }
];
const SERVICES = [
  { t: "Landing page", d: "Satu halaman yang fokus mengajak pengunjung membeli, mendaftar, atau menghubungi kamu." },
  { t: "Website", d: "Website beberapa halaman yang tampil baik di HP maupun komputer." },
  { t: "Company profile + menu", d: "Profil usaha lengkap dengan daftar menu atau produk yang mudah dilihat pelanggan." },
  { t: "Website bisnis", d: "Website untuk usaha yang butuh tampil kredibel, dengan data yang rapi dan mudah dikelola." },
  { t: "Aplikasi (segera hadir)", d: "Kami sedang belajar ke arah ini. Layanan ini akan dibuka setelah tim siap." }
];
const PROCESS = [
  { t: "Konsultasi", d: "Kami dengar kebutuhan dan tujuan bisnis kamu." },
  { t: "Desain", d: "Tim UI/UX membuat rancangan tampilan untuk kamu setujui." },
  { t: "Pengembangan", d: "Developer membangun website dari desain yang disetujui." },
  { t: "Peluncuran", d: "Website dites, ditayangkan, dan kami temani saat ada revisi." }
];
const CONTACT = [  // "Temukan kami". icon: emoji atau gambar, contoh I+"linkedin.svg"
  { t: "WhatsApp", d: "", href: "https://wa.link/29o1xu", icon: "💬" },
  { t: "Email", d: "", href: "talentacordiaz06@gmail.com", icon: "✉️" },
  { t: "Instagram", d: "", href: "https://instagram.com/synergos.web", icon: "📸" }
  // contoh tambahan: { t: "GitHub", d: "@synergosweb", href: "https://github.com/synergosweb", icon: I+"github.svg" },
  //                  { t: "LinkedIn", d: "Synergos.Web", href: "https://linkedin.com/company/xxx", icon: I+"linkedin.svg" }
];

/* Form "Hubungi kami". Urutan kerja: endpoint (pesan masuk ke email tim) -> whatsapp -> email */
const CONTACT_FORM = {
  title: "Hubungi kami",
  intro: "Ada proyek atau pertanyaan? Kirim pesan, kami balas secepatnya.",
  endpoint: "",   // opsional: alamat Formspree, contoh "https://formspree.io/f/xxxxxxx"
  whatsapp: "",   // nomor WhatsApp tim, contoh "08123456789". Dipakai bila endpoint kosong
  email: ""       // cadangan terakhir bila endpoint dan whatsapp kosong
};

/* Komentar publik (butuh database Supabase gratis, panduan di supabase-comments.sql).
   enabled: false = kartu komentar disembunyikan. */
const COMMENTS = {
  enabled: false,
  supabaseUrl: "",   // contoh "https://abcdxyz.supabase.co"
  supabaseKey: ""    // anon public key dari Supabase (aman dipublikasikan)
};
/* ============================================ */

/* ---------- Bagian Tentang ---------- */
const ABOUT = {
  lead: "Satu nama, satu arti: bekerja bersama.",
  story: [
    "Synergos berasal dari bahasa Yunani dan berarti bekerja bersama. Kami memilih nama ini karena website yang baik lahir dari banyak keahlian yang saling melengkapi: desain, kode, data, dan pemasaran.",
    "Kami tim yang masih baru dan terus belajar. Karena itu setiap proyek kami kerjakan dengan teliti, dan kami selalu terbuka pada masukan dari klien."
  ],
  stats: [   // angka otomatis mengikuti jumlah anggota dan peran di TEAM
    { n: TEAM.length, l: "Anggota tim" },
    { n: 4, l: "Layanan" },
    { n: [...new Set(TEAM.map(m => m.role))].length, l: "Bidang keahlian" }
  ],
  values: [
    { i: "🎯", t: "Desain yang jelas", d: "Tampilan rapi yang langsung dimengerti pengunjung." },
    { i: "🧩", t: "Kode yang rapi", d: "Dibangun terstruktur supaya mudah dirawat dan dikembangkan." },
    { i: "💬", t: "Komunikasi terbuka", d: "Klien tahu perkembangan proyek dari awal sampai tayang." },
    { i: "🌱", t: "Terus belajar", d: "Kami rutin menambah skill agar hasil kerja makin baik." }
  ],
  steps: [
    { t: "Sekarang", d: "Landing page, website, dan website bisnis." },
    { t: "Berikutnya", d: "Company profile lengkap dengan menu dan produk." },
    { t: "Ke depan", d: "Aplikasi, setelah tim siap dan matang." }
  ]
};

/* ---------- Footer ---------- */
const FOOTER = {
  about: "Tim pembuat website yang bekerja bersama: landing page, website, company profile, dan website bisnis.",
  status: "Terbuka untuk proyek baru",   // ganti sesuai kondisi, contoh "Sedang penuh, antre dulu ya"
  location: "",                           // contoh "Medan, Indonesia" (kosong = disembunyikan)
  ctaTitle: "Siap membuat website bersama kami?",
  ctaText: "Ceritakan kebutuhanmu, kami bantu dari desain sampai website tayang."
};

/* ---------- Proyek / Portofolio ---------- */
/* Hapus tiga contoh di bawah, lalu isi proyek asli kalian. Tambah sebanyak yang kamu mau.
   title: judul | cat: kategori (bebas: Web, Aplikasi, Sertifikat, Lainnya, ...; tombol filter otomatis dibuat)
   desc: deskripsi singkat di kartu | detail: penjelasan panjang di jendela detail (boleh kosong)
   img: gambar, contoh "projects/nama.jpg" (rasio 16:10, sekitar 1200x750, di bawah 500 KB) | tech: nama skill (sama dengan di SKILLS)
   by: nama pengerja | year: tahun | link: alamat website/demo | repo: alamat kode (GitHub). Semua boleh dikosongkan.
   Kalau PROJECTS kosong ([]), bagian Proyek disembunyikan. */
const PROJECTS = [
  { title: "Website Danau Toba", cat: "Web", year: "2026",
    desc: "Indahnya danau toba dengan sejarah nya yang sangat unik",
    detail: "", img: "photos/dantob.png", tech: ["HTML5", "CSS3", "JavaScript"], by: "Togi & Fazar", link: "", repo: "" },
  { title: "Website Mini Store", cat: "Aplikasi", year: "2025",
    desc: "Mini Store yang menjual semua alat olahraga kamu!",
    detail: "", img: "photos/toko.png", tech: ["PHP", "MySQL"], by: "Sonang, Yongkis, Cordiaz", link: "https://mini-store-togi.vercel.app/", repo: "" },
  { title: "Sertifikat Code Academy", cat: "Sertifikat", year: "2025",
    desc: "Certificate Completion by Togi Hutagaol as Full Stack Web Development",
    detail: "", img: "photos/sertifikat.png", tech: [], by: "Togi Hutagaol", link: "", repo: "" }
];