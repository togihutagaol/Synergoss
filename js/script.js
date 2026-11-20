/* Synergos.Web - logika dan animasi. Data diambil dari data.js */
const $ = id => document.getElementById(id);
$("lead").textContent = SITE.lead;
$("yr").textContent = new Date().getFullYear();
$("badge").textContent = SITE.badge || "Tim pembuat website · 6 anggota";

const card=(m,c,i)=>`<article class="member" data-i="${i}"${c?' aria-hidden="true"':` tabindex="0" role="button" aria-label="Lihat profil ${m.name}"`}><div class="ph">${m.photo?`<img src="${m.photo}" alt="${c?"":"Foto "+m.name}" draggable="false">`:`<b>${m.name[0]}</b>`}</div><h3>${m.name}</h3><p>${m.role}</p><span class="mh">Lihat profil</span></article>`;
$("rail").innerHTML = [1,0,1].map(c=>TEAM.map((m,i)=>card(m,c,i)).join("")).join("");
/* Skill: filter bidang + kartu yang bisa dibalik */
(function(){const grid=$("skills"),tabs=$("sk-tabs"),reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
const COL={Frontend:"#fb923c",Backend:"#a78bfa",Database:"#34d399",Desain:"#f472b6",Tools:"#fbbf24",Marketing:"#22d3ee"};
const cats=["Semua",...new Set(SKILLS.map(k=>k.cat).filter(Boolean))];let cur="Semua",turns=0;
tabs.innerHTML=cats.map(c=>`<button class="tab${c==="Semua"?" on":""}" data-c="${c}" aria-pressed="${c==="Semua"}">${c}</button>`).join("")+`<button class="tab re" id="sk-re"><i>\u21BB</i> Putar ulang</button>`;
const face=k=>k.icon?`<img class="${k.inv?"inv":""}" src="${k.icon}" alt="" data-i="${k.n[0]}" onerror="this.outerHTML='<div class=bd>'+this.dataset.i+'</div>'">`:`<div class="bd">${k.emoji||k.n[0]}</div>`;
function render(){grid.innerHTML=SKILLS.filter(k=>cur==="Semua"||k.cat===cur).map((k,i)=>`<div class="sk-w" style="--i:${i};--ac:${COL[k.cat]||"#60a5fa"}"><button class="sk" aria-pressed="false" aria-label="${k.n}: klik untuk membaca penjelasan"><span class="sk-f">${face(k)}<b>${k.n}</b><small>${k.cat||""}</small><u>\u21BB</u></span><span class="sk-b"><b>${k.n}</b><small>${k.desc||"Skill yang kami kuasai."}</small></span></button></div>`).join("")}
function swap(){grid.classList.remove("pre");grid.classList.add("out");setTimeout(()=>{render();grid.classList.remove("out")},reduce?0:200)}
grid.addEventListener("click",e=>{const b=e.target.closest(".sk");if(b)b.setAttribute("aria-pressed",b.classList.toggle("flip"))});
tabs.addEventListener("click",e=>{const t=e.target.closest(".tab");if(!t)return;
  if(t.id==="sk-re"){t.querySelector("i").style.transform="rotate("+(turns+=360)+"deg)";swap();return}
  if(t.dataset.c===cur)return;cur=t.dataset.c;
  tabs.querySelectorAll(".tab[data-c]").forEach(x=>{const on=x===t;x.classList.toggle("on",on);x.setAttribute("aria-pressed",on)});swap()});
render();
new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){grid.classList.remove("pre");o.disconnect()}},{threshold:.15}).observe(grid)})();
$("services").innerHTML = SERVICES.map(s => `<div class="glass"><h3>${s.t}</h3><p>${s.d}</p></div>`).join("");
$("process").innerHTML = PROCESS.map((p,i) => `<div class="glass step"><b>${i+1}</b><h3>${p.t}</h3><p>${p.d}</p></div>`).join("");

/* teks mengetik */
(function(){const el=$("typed");let i=0,j=0,del=false;const w=SITE.typed;
(function tick(){const s=w[i];el.textContent=s.slice(0,j);
if(!del&&j===s.length){del=true;return setTimeout(tick,1400)}
if(del&&j===0){del=false;i=(i+1)%w.length}
j+=del?-1:1;setTimeout(tick,del?40:80)})()})();

/* carousel tak berujung: kartu terus bergulir ke kanan, berhenti saat hover, bisa di-drag/swipe */
(function(){const r=$("rail"),N=TEAM.length,SPEED=.7;let setW=0,paused=false,down=false,sx=0,sl=0,acc=0;
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
function measure(){const c=r.children;if(c.length<2*N)return;setW=c[N].offsetLeft-c[0].offsetLeft;
  if(setW>0&&(r.scrollLeft<setW*.5||r.scrollLeft>=setW*1.5))r.scrollLeft=setW}
function wrap(){if(!setW)return;let d=0;if(r.scrollLeft<setW*.5)d=setW;else if(r.scrollLeft>=setW*1.5)d=-setW;if(d){r.scrollLeft+=d;sl+=d}}
measure();addEventListener("resize",measure);addEventListener("load",measure);
r.addEventListener("scroll",wrap,{passive:true});
r.addEventListener("mouseenter",()=>paused=true);r.addEventListener("mouseleave",()=>{paused=false;down=false;r.classList.remove("drag")});
r.addEventListener("touchstart",()=>paused=true,{passive:true});r.addEventListener("touchend",()=>setTimeout(()=>paused=false,1500));
r.addEventListener("mousedown",e=>{down=true;sx=e.pageX;sl=r.scrollLeft;r.classList.add("drag")});
addEventListener("mouseup",()=>{down=false;r.classList.remove("drag")});
r.addEventListener("mousemove",e=>{if(down)r.scrollLeft=sl-(e.pageX-sx)});
(function loop(){if(!paused&&!down&&!reduce&&!document.body.classList.contains("pf-open")){acc-=SPEED;const n=Math.trunc(acc);if(n){r.scrollLeft+=n;acc-=n}}requestAnimationFrame(loop)})()})();

/* Kontak: form pesan, temukan kami, komentar */
(function(){
const F=typeof CONTACT_FORM!=="undefined"?CONTACT_FORM:{},C=typeof COMMENTS!=="undefined"?COMMENTS:{enabled:false};
const say=(el,t,k)=>{el.textContent=t;el.className="st "+(k||"")};
$("ct-title").textContent=F.title||"Hubungi kami";$("ct-intro").textContent=F.intro||"";
$("ct-find").innerHTML=CONTACT.map(c=>`<a class="find" href="${c.href}"${/^https?:/.test(c.href)?' target="_blank" rel="noopener"':""}><span class="fi">${c.icon&&/[\/.]/.test(c.icon)?`<img src="${c.icon}" alt="" onerror="this.remove()">`:(c.icon||c.t[0])}</span><span><b>${c.t}</b><small>${c.d}</small></span><i>\u2197</i></a>`).join("");
$("ct-form").addEventListener("submit",async e=>{e.preventDefault();const f=e.target,st=$("ct-st"),n=f.nama.value.trim(),m=f.email.value.trim(),p=f.pesan.value.trim();
  if(!n||!m||!p)return say(st,"Lengkapi semua kolom dulu ya.","err");
  if(!/^\S+@\S+\.\S+$/.test(m))return say(st,"Format email belum benar.","err");
  const text=`Halo Synergos.Web, saya ${n} (${m}).\n\n${p}`;
  if(F.endpoint){say(st,"Mengirim...");
    try{const r=await fetch(F.endpoint,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({name:n,email:m,message:p})});if(!r.ok)throw 0;f.reset();say(st,"Pesan terkirim. Terima kasih, kami segera membalas.","ok")}
    catch(_){say(st,"Pesan gagal dikirim. Coba lagi, atau hubungi kami lewat kontak di bawah.","err")}return}
  const wa=String(F.whatsapp||"").replace(/\D/g,"").replace(/^0/,"62");
  if(wa){window.open("https://wa.me/"+wa+"?text="+encodeURIComponent(text),"_blank");say(st,"WhatsApp dibuka. Tekan kirim di sana untuk mengirim pesan.","ok");return}
  if(F.email){location.href="mailto:"+F.email+"?subject="+encodeURIComponent("Pesan dari "+n)+"&body="+encodeURIComponent(text);return}
  say(st,"Tujuan pesan belum diatur di data.js (CONTACT_FORM).","err")});

const box=$("cm");if(!C.enabled){box.hidden=true;$("ct-grid").classList.add("solo");return}
const ready=!!(C.supabaseUrl&&C.supabaseKey),form=$("cm-form"),note=$("cm-note");
if(!ready){note.hidden=false;note.textContent="Komentar belum aktif. Hubungkan database di data.js (lihat supabase-comments.sql), atau matikan kartu ini dengan enabled: false.";
  form.querySelectorAll("input,textarea,button").forEach(x=>x.disabled=true);return}
const H={apikey:C.supabaseKey,Authorization:"Bearer "+C.supabaseKey},base=C.supabaseUrl.replace(/\/$/,"")+"/rest/v1/comments";
const rt=new Intl.RelativeTimeFormat("id",{numeric:"auto"});
function ago(t){const s=(new Date(t)-Date.now())/1000,a=Math.abs(s),u=a<60?["second",s]:a<3600?["minute",s/60]:a<86400?["hour",s/3600]:a<2592000?["day",s/86400]:["month",s/2592000];return rt.format(Math.round(u[1]),u[0])}
function render(a){const L=$("cm-list");$("cm-n").textContent=a.length;L.innerHTML="";
  if(!a.length){L.innerHTML='<div class="cm-note">Belum ada komentar. Jadilah yang pertama!</div>';return}
  a.forEach(c=>{const d=document.createElement("div");d.className="cm";d.innerHTML='<div class="av"></div><div><div class="cm-top"><b></b><time></time></div><p></p></div>';
    d.querySelector(".av").textContent=(c.name||"?")[0].toUpperCase();d.querySelector("b").textContent=c.name;d.querySelector("time").textContent=ago(c.created_at);d.querySelector("p").textContent=c.message;L.appendChild(d)})}
async function load(){try{const r=await fetch(base+"?select=name,message,created_at&order=created_at.desc&limit=30",{headers:H});if(!r.ok)throw 0;render(await r.json())}
  catch(_){$("cm-list").innerHTML='<div class="cm-note">Komentar belum bisa dimuat sekarang.</div>'}}
load();
form.addEventListener("submit",async e=>{e.preventDefault();const f=e.target,st=$("cm-st");if(f.website.value)return;
  const n=f.nama.value.trim(),m=f.komentar.value.trim();
  if(!n||!m)return say(st,"Isi nama dan komentar dulu ya.","err");
  let last=0;try{last=+localStorage.getItem("cm_t")||0}catch(_){}
  if(Date.now()-last<30000)return say(st,"Tunggu sebentar sebelum mengirim lagi.","err");
  say(st,"Mengirim...");
  try{const r=await fetch(base,{method:"POST",headers:{...H,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify({name:n.slice(0,40),message:m.slice(0,500)})});if(!r.ok)throw 0;
    try{localStorage.setItem("cm_t",Date.now())}catch(_){}
    f.reset();say(st,"Terima kasih! Komentar kamu akan tampil setelah disetujui tim.","ok")}
  catch(_){say(st,"Komentar gagal dikirim. Coba lagi nanti.","err")}})})();

/* Footer + tombol kembali ke atas */
(function(){const Fo=typeof FOOTER!=="undefined"?FOOTER:{},reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
const ext=h=>/^https?:/.test(h)?' target="_blank" rel="noopener"':"";
$("ft-ct-t").textContent=Fo.ctaTitle||"Siap membuat website bersama kami?";$("ft-ct-p").textContent=Fo.ctaText||"";
$("ft-about").textContent=Fo.about||"";$("ft-status").textContent=Fo.status||"Terbuka untuk proyek baru";
$("ft-ct").innerHTML=CONTACT.map(c=>`<a href="${c.href}"${ext(c.href)}>${c.d}</a>`).join("")+(Fo.location?`<span class="ft-loc">${Fo.location}</span>`:"");
$("ft-soc").innerHTML=CONTACT.map(c=>`<a href="${c.href}"${ext(c.href)} aria-label="${c.t}" title="${c.t}">${c.icon&&/[\/.]/.test(c.icon)?`<img src="${c.icon}" alt="" onerror="this.remove()">`:(c.icon||c.t[0])}</a>`).join("");
const btn=$("totop"),pg=$("totop-pg");
function upd(){const y=scrollY,mx=document.documentElement.scrollHeight-innerHeight;pg.style.strokeDashoffset=132*(1-(mx>0?Math.min(1,y/mx):0));btn.classList.toggle("show",y>500)}
addEventListener("scroll",upd,{passive:true});upd();
btn.addEventListener("click",()=>scrollTo({top:0,behavior:reduce?"auto":"smooth"}))})();

/* Proyek: filter, kartu, tampilkan lebih banyak, jendela detail */
(function(){const sec=$("proyek");
if(typeof PROJECTS==="undefined"||!PROJECTS.length){sec.hidden=true;document.querySelectorAll('a[href="#proyek"]').forEach(a=>a.style.display="none");return}
const soon=document.querySelector(".soon");if(soon)soon.style.display="none";
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches,PAGE=6,PAL=["#60a5fa","#a78bfa","#fbbf24","#22d3ee","#34d399","#f472b6"];
const cats=[...new Set(PROJECTS.map(p=>p.cat).filter(Boolean))],col=c=>PAL[Math.max(0,cats.indexOf(c))%PAL.length];
const tabs=$("pj-tabs"),grid=$("pj-grid"),more=$("pj-more");let cur="Semua",shown=PAGE,list=[];
tabs.innerHTML=["Semua",...cats].map(c=>`<button class="tab${c==="Semua"?" on":""}" data-c="${c}" aria-pressed="${c==="Semua"}">${c}</button>`).join("");
const thumb=p=>p.img?`<img src="${p.img}" alt="" loading="lazy" data-i="${p.title[0]}" onerror="this.outerHTML='<span class=pj-ph>'+this.dataset.i+'</span>'">`:`<span class="pj-ph">${p.title[0]}</span>`;
const cards=(a,b)=>list.slice(a,b).map((p,k)=>{const i=a+k;return `<div class="pj-w" style="--i:${k};--ac:${col(p.cat)}"><button class="pj" data-i="${i}"><span class="pj-img">${thumb(p)}</span><small class="c">${p.cat||""}</small><h3>${p.title}</h3><p>${p.desc||""}</p><span class="go">Lihat detail <i>\u2192</i></span></button></div>`}).join("");
function more_(){const r=list.length-shown;more.hidden=r<=0;more.textContent="Tampilkan lebih banyak ("+r+")"}
function render(){list=PROJECTS.filter(p=>cur==="Semua"||p.cat===cur);grid.innerHTML=cards(0,shown);more_()}
function swap(){grid.classList.remove("pre");grid.classList.add("out");setTimeout(()=>{render();grid.classList.remove("out")},reduce?0:200)}
tabs.addEventListener("click",e=>{const t=e.target.closest(".tab");if(!t||t.dataset.c===cur)return;cur=t.dataset.c;shown=PAGE;
  tabs.querySelectorAll(".tab").forEach(x=>{const on=x===t;x.classList.toggle("on",on);x.setAttribute("aria-pressed",on)});swap()});
more.addEventListener("click",()=>{const a=shown;shown+=PAGE;grid.insertAdjacentHTML("beforeend",cards(a,shown));more_()});
render();
new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){grid.classList.remove("pre");o.disconnect()}},{threshold:.1}).observe(grid);

/* jendela detail */
const m=$("pj"),mc=m.querySelector(".pf-card"),SK=Object.fromEntries((typeof SKILLS!=="undefined"?SKILLS:[]).map(k=>[k.n,k]));let idx=0,last=null;
function fill(i){const p=list[i];idx=i;
  $("pj-ph").innerHTML=p.img?`<img src="${p.img}" alt="${p.title}" data-i="${p.title[0]}" onerror="this.outerHTML='<span class=pj-ph>'+this.dataset.i+'</span>'">`:`<span class="pj-ph">${p.title[0]}</span>`;
  $("pj-cat").textContent=[p.cat,p.year].filter(Boolean).join(" \u00B7 ");$("pj-t").textContent=p.title;
  const d=p.detail||p.desc||"";$("pj-d").textContent=d;$("pj-d").hidden=!d;
  $("pj-meta").textContent=p.by?"Dikerjakan oleh: "+p.by:"";$("pj-meta").hidden=!p.by;
  $("pj-sk").innerHTML=(p.tech||[]).map(n=>{const k=SK[n]||{};return `<span>${k.icon?`<img class="${k.inv?"inv":""}" src="${k.icon}" alt="" onerror="this.remove()">`:(k.emoji||"")}${n}</span>`}).join("");
  const b=[];if(p.link)b.push(`<a class="pf-btn pj" href="${p.link}" target="_blank" rel="noopener">Lihat proyek</a>`);if(p.repo)b.push(`<a class="pf-btn em" href="${p.repo}" target="_blank" rel="noopener">Lihat kode</a>`);
  $("pj-cb").innerHTML=b.join("");$("pj-c").textContent=(i+1)+" / "+list.length}
function openM(i){last=document.activeElement;fill(i);m.classList.add("open");m.setAttribute("aria-hidden","false");document.body.classList.add("pf-open");m.querySelector(".pf-x").focus()}
function closeM(){m.classList.remove("open");m.setAttribute("aria-hidden","true");document.body.classList.remove("pf-open");if(last&&last.focus)last.focus()}
function step(d){mc.style.setProperty("--dx",d>0?"-24px":"24px");mc.classList.add("sw");setTimeout(()=>{fill((idx+d+list.length)%list.length);mc.classList.remove("sw")},170)}
grid.addEventListener("click",e=>{const b=e.target.closest(".pj");if(b)openM(+b.dataset.i)});
m.querySelector(".pf-bg").addEventListener("click",closeM);m.querySelector(".pf-x").addEventListener("click",closeM);
m.querySelector(".pf-p").addEventListener("click",()=>step(-1));m.querySelector(".pf-n").addEventListener("click",()=>step(1));
addEventListener("keydown",e=>{if(!m.classList.contains("open"))return;
  if(e.key==="Escape")closeM();else if(e.key==="ArrowLeft")step(-1);else if(e.key==="ArrowRight")step(1);
  else if(e.key==="Tab"){const f=[...m.querySelectorAll("button,a[href]")].filter(x=>x.offsetParent);if(!f.length)return;const a=f[0],z=f[f.length-1];
    if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}})})();

/* profil anggota: klik kartu membuka panel biodata */
(function(){const pf=$("pf"),card=pf.querySelector(".pf-card"),N=TEAM.length;let cur=0,last=null,px=0,py=0;
const SK=Object.fromEntries((typeof SKILLS!=="undefined"?SKILLS:[]).map(k=>[k.n,k]));
const waNum=v=>{let n=String(v||"").replace(/\D/g,"");if(!n)return"";if(n[0]==="0")n="62"+n.slice(1);return n};
function fill(i){const m=TEAM[i];cur=i;
  $("pf-ph").innerHTML=m.photo?`<img src="${m.photo}" alt="Foto ${m.name}">`:`<b>${m.name[0]}</b>`;
  $("pf-role").textContent=m.role;$("pf-name").textContent=m.name;
  $("pf-bio").textContent=m.bio||"";$("pf-bio").hidden=!m.bio;
  $("pf-q").textContent=m.quote?"\u201C"+m.quote+"\u201D":"";$("pf-q").hidden=!m.quote;
  $("pf-sk").innerHTML=(m.skills||[]).map(n=>{const k=SK[n]||{};return `<span>${k.icon?`<img class="${k.inv?"inv":""}" src="${k.icon}" alt="" onerror="this.remove()">`:(k.emoji||"")}${n}</span>`}).join("");
  const L=m.links||{},wa=waNum(m.whatsapp||L.whatsapp),em=m.email||L.email,msg=((typeof SITE!=="undefined"&&SITE.waMessage)||"Halo {nama}, saya melihat website Synergos.Web dan ingin berdiskusi.").replace("{nama}",m.name),btns=[];
  if(wa)btns.push(`<a class="pf-btn wa" href="https://wa.me/${wa}?text=${encodeURIComponent(msg)}" target="_blank" rel="noopener">Chat WhatsApp</a>`);
  if(em)btns.push(`<a class="pf-btn em" href="mailto:${em}?subject=${encodeURIComponent("Dari website Synergos.Web: "+m.name)}">Kirim email</a>`);
  $("pf-cb").innerHTML=btns.join("");$("pf-ch").textContent="Hubungi "+m.name;
  $("pf-ask").textContent=m.ask?"Bisa ditanya soal: "+m.ask:"";$("pf-ask").hidden=!m.ask;
  const soc=[["github","GitHub"],["linkedin","LinkedIn"],["instagram","Instagram"]].filter(([k])=>L[k]);
  $("pf-ln").innerHTML=soc.map(([k,n])=>`<a href="${L[k]}" target="_blank" rel="noopener">${n}</a>`).join("");
  $("pf-ct").hidden=!(btns.length||soc.length);
  $("pf-c").textContent=(i+1)+" / "+N}
function openPf(i){last=document.activeElement;fill(i);pf.classList.add("open");pf.setAttribute("aria-hidden","false");document.body.classList.add("pf-open");pf.querySelector(".pf-x").focus()}
function closePf(){pf.classList.remove("open");pf.setAttribute("aria-hidden","true");document.body.classList.remove("pf-open");if(last&&last.focus)last.focus()}
function step(d){card.style.setProperty("--dx",d>0?"-24px":"24px");card.classList.add("sw");setTimeout(()=>{fill((cur+d+N)%N);card.classList.remove("sw")},170)}
const rail=$("rail");
rail.addEventListener("pointerdown",e=>{px=e.clientX;py=e.clientY});
rail.addEventListener("click",e=>{const m=e.target.closest(".member");if(m&&Math.hypot(e.clientX-px,e.clientY-py)<=6)openPf(+m.dataset.i)});
rail.addEventListener("keydown",e=>{const m=e.target.closest(".member");if(m&&(e.key==="Enter"||e.key===" ")){e.preventDefault();openPf(+m.dataset.i)}});
pf.querySelector(".pf-bg").addEventListener("click",closePf);pf.querySelector(".pf-x").addEventListener("click",closePf);
pf.querySelector(".pf-p").addEventListener("click",()=>step(-1));pf.querySelector(".pf-n").addEventListener("click",()=>step(1));
addEventListener("keydown",e=>{if(!pf.classList.contains("open"))return;
  if(e.key==="Escape")closePf();else if(e.key==="ArrowLeft")step(-1);else if(e.key==="ArrowRight")step(1);
  else if(e.key==="Tab"){const f=[...pf.querySelectorAll("button,a[href]")].filter(x=>x.offsetParent);if(!f.length)return;const a=f[0],z=f[f.length-1];
    if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}})})();

/* Tentang: cerita, angka, orbit peran, nilai tim, timeline */
(function(){if(typeof ABOUT==="undefined")return;const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
$("story").innerHTML=`<h3 class="story-h">${ABOUT.lead}</h3>`+ABOUT.story.map(t=>`<p>${t}</p>`).join("");
$("stats").innerHTML=ABOUT.stats.map(s=>`<div class="stat"><b data-n="${s.n}">${reduce?s.n:0}</b><span>${s.l}</span></div>`).join("");
const roles=[...new Set(TEAM.map(m=>m.role))];
$("rot").innerHTML=roles.map((r,i)=>`<div class="node" style="--a:${Math.round(360/roles.length*i-90)}"><div class="chip role">${r}</div></div>`).join("");
$("values").innerHTML=ABOUT.values.map(v=>`<div class="glass"><div class="vi">${v.i}</div><h3>${v.t}</h3><p>${v.d}</p></div>`).join("");
$("tl").innerHTML=`<div class="tl-line"><i></i></div>`+ABOUT.steps.map((s,i)=>`<div class="glass tl-step${i?"":" on"}"><span class="dot"></span><h3>${s.t}</h3><p>${s.d}</p></div>`).join("");
if(reduce){$("tl").classList.add("in");return}
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;io.unobserve(e.target);
  if(e.target.id==="tl"){e.target.classList.add("in");return}
  e.target.querySelectorAll("b").forEach(b=>{const n=+b.dataset.n,t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/1300);b.textContent=Math.round(n*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)})(t0)})}),{threshold:.4});
io.observe($("stats"));io.observe($("tl"))})();

/* menu aktif saat scroll */
(function(){const links=[...document.querySelectorAll("nav a")];
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+e.target.id))}),{rootMargin:"-45% 0px -50% 0px"});
document.querySelectorAll("section").forEach(s=>io.observe(s))})();

/* animasi: kursor bercahaya, spotlight kartu, tilt kartu tim, reveal, progress */
(function(){const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
const hover=matchMedia("(hover:hover)").matches;
const glow=$("glow"),prog=$("prog");
if(hover&&!reduce){addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});
document.querySelectorAll(".glass").forEach(el=>el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect();el.style.setProperty("--mx",e.clientX-r.left+"px");el.style.setProperty("--my",e.clientY-r.top+"px")}));
document.querySelectorAll(".member").forEach(el=>{el.addEventListener("pointermove",e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
el.style.transform=`perspective(700px) rotateY(${x*14}deg) rotateX(${-y*14}deg) translateY(-10px) scale(1.04)`});
el.addEventListener("pointerleave",()=>el.style.transform="")})}
addEventListener("scroll",()=>{prog.style.width=scrollY/(document.documentElement.scrollHeight-innerHeight)*100+"%"},{passive:true});
if(reduce)return;
const sel="section:not(#home) h2,section:not(#home) .sub,section:not(#home) .sec3,section:not(#home) .glass,section:not(#home) .orbit,section:not(#home) .stats,section:not(#home) .story-h";
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target;io.unobserve(el);
const d=parseFloat(el.style.getPropertyValue("--d"))||0;el.classList.add("in");setTimeout(()=>el.classList.remove("rv","in"),1100+d*1000)}),{threshold:.12});
document.querySelectorAll(sel).forEach(el=>{const k=[...el.parentElement.children].indexOf(el);el.style.setProperty("--d",Math.min(k,6)*.08+"s");el.classList.add("rv");io.observe(el)})})();

/* layar loading: sambaran petir realistis + progres, lalu masuk ke Home */
(function(){const L=$("loader"),B=document.body;let end=false;
function done(){if(end)return;end=true;try{sessionStorage.setItem("sw_seen","1")}catch(_){}B.classList.remove("loading");L.classList.add("out");setTimeout(()=>L.remove(),1000)}
if(document.documentElement.classList.contains("seen")){end=true;B.classList.remove("loading");L.remove();return}
if(matchMedia("(prefers-reduced-motion:reduce)").matches){done();return}
setTimeout(done,9000);
const c=$("bolt"),x=c.getContext("2d");let W,H,S=[],strike=null,nextAt=500;
function size(){W=c.width=innerWidth;H=c.height=innerHeight;S=Array.from({length:Math.min(190,W/8|0)},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.6+.3,a:Math.random()*6,c:Math.random()>.7?"#22d3ee":"#9db8ff"}))}
size();addEventListener("resize",size);
/* petir: garis dibelah dua berulang dan digeser acak, kadang bercabang */
function gen(x0,y0,x1,y1,disp,out,depth){
  if(disp<4){out.push([x0,y0,x1,y1,depth]);return}
  const mx=(x0+x1)/2+(Math.random()-.5)*disp,my=(y0+y1)/2+(Math.random()-.5)*disp*.35;
  gen(x0,y0,mx,my,disp/2,out,depth);gen(mx,my,x1,y1,disp/2,out,depth);
  if(depth<2&&disp>14&&Math.random()<.3){const ang=Math.PI/2+(Math.random()-.5)*1.7,len=Math.hypot(x1-x0,y1-y0)*(.45+Math.random()*.5);
    gen(mx,my,mx+Math.cos(ang)*len,my+Math.abs(Math.sin(ang))*len,disp*.6,out,depth+1)}}
function newStrike(t){const a=[],x0=W*(.15+Math.random()*.7);gen(x0,-10,x0+(Math.random()-.5)*W*.3,H*(.72+Math.random()*.25),H*.3,a,0);strike={t,s:a}}
/* kecerahan: menyambar cepat, redup sebentar, sambaran balik, lalu memudar */
function inten(d){if(d<50)return d/50;if(d<110)return 1-(d-50)/60*.65;if(d<190)return .35+(d-110)/80*.65;return Math.exp(-(d-190)/210)}
const W0=[4.2,2.2,1.2],T=3600,t0=performance.now();let fin=false;
(function frame(now){if(end)return;const t=now-t0,k=Math.min(1,t/T),p=Math.min(100,(1-Math.pow(1-k,2.2))*100);
$("pct").textContent=Math.floor(p)+"%";$("pbar").style.width=p+"%";
x.clearRect(0,0,W,H);
for(const q of S){x.globalAlpha=.3+.4*Math.abs(Math.sin(q.a+t/1100));x.fillStyle=q.c;x.beginPath();x.arc(q.x,q.y,q.r,0,7);x.fill()}x.globalAlpha=1;
if(!strike&&!fin&&t>nextAt)newStrike(t);
if(strike){const d=t-strike.t,I=inten(d);
  if(d>1000){strike=null;nextAt=t+700+Math.random()*700}
  else if(I>.01){
    x.fillStyle="rgba(110,150,255,"+.11*I+")";x.fillRect(0,0,W,H);
    const n=strike.s.length,m=Math.min(n,Math.ceil(n*Math.min(1,d/70)));x.lineCap="round";
    for(const [mul,col,al,blur] of [[5,"37,99,235",.22*I,28],[2,"96,165,250",.55*I,0],[.8,"255,255,255",I,0]]){
      x.shadowBlur=blur;x.shadowColor="#3b82f6";x.strokeStyle="rgba("+col+","+al+")";
      for(let i=0;i<m;i++){const g=strike.s[i];x.lineWidth=W0[g[4]]*mul;x.beginPath();x.moveTo(g[0],g[1]);x.lineTo(g[2],g[3]);x.stroke()}}
    x.shadowBlur=0}}
if(p>=100&&!fin){fin=true;setTimeout(done,700)}
requestAnimationFrame(frame)})(t0)})();

/* hero sinematik: ketik kode, parallax kursor, hero memudar saat scroll */
(function(){const home=$("home"),el=$("code"),src=SITE.code||`const tim = "Synergos.Web";
const layanan = [
  "Landing page",
  "Company profile",
  "Website bisnis"
];

function bangun(ide) {
  return desain(ide) + kode(ide);
}

bangun("website impianmu");
// selesai, siap tayang`,reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
const esc=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;");
const hl=t=>esc(t).replace(/(\/\/.*)|("[^"]*"?)|\b(const|let|function|return|if|for|of|new)\b|\b([a-zA-Z_]+)(?=\()|\b(\d+)\b/g,(m,c,s,k,f,n)=>c?`<span class="c">${c}</span>`:s?`<span class="s">${s}</span>`:k?`<span class="k">${k}</span>`:f?`<span class="f">${f}</span>`:`<span class="n">${n}</span>`);
let i=0;
const start=()=>document.body.classList.contains("loading")?setTimeout(start,150):reduce?(el.innerHTML=hl(src)):setTimeout(()=>{i=0;typeFn()},1500);
const typeFn=()=>{i=Math.min(src.length,i+(Math.random()<.35?2:1));el.innerHTML=hl(src.slice(0,i));if(i<src.length)setTimeout(typeFn,src[i-1]==="\n"?170:26)};
start();
if(matchMedia("(hover:hover)").matches&&!reduce){home.addEventListener("pointermove",e=>{const r=home.getBoundingClientRect();home.style.setProperty("--rx",((e.clientX-r.left)/r.width-.5).toFixed(3));home.style.setProperty("--ry",((e.clientY-r.top)/r.height-.5).toFixed(3))});
home.addEventListener("pointerleave",()=>{home.style.setProperty("--rx",0);home.style.setProperty("--ry",0)})}
if(!reduce)addEventListener("scroll",()=>home.style.setProperty("--sy",Math.min(1,scrollY/(innerHeight*.8)).toFixed(3)),{passive:true})})();

/* bintang melayang */
(function(){const c=$("stars"),x=c.getContext("2d");let W,H,P=[],M=[];
function size(){W=c.width=innerWidth;H=c.height=innerHeight;P=Array.from({length:Math.min(190,W/8|0)},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.6+.3,v:Math.random()*.25+.05,a:Math.random()}))}
size();addEventListener("resize",size);
const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
(function draw(){x.clearRect(0,0,W,H);for(const p of P){if(!reduce){p.y-=p.v;p.a+=.01;if(p.y<0){p.y=H;p.x=Math.random()*W}}
x.globalAlpha=.35+.35*Math.sin(p.a*6);x.fillStyle=p.r>1.2?"#22d3ee":"#9db8ff";x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill()}
if(!reduce){if(Math.random()<.009&&M.length<4){const v=11+Math.random()*6;M.push({x:W*(.3+Math.random()*.8),y:-20,vx:-v*.6,vy:v*.8,l:0,life:70+Math.random()*40})}
for(let i=M.length-1;i>=0;i--){const m=M[i];m.x+=m.vx;m.y+=m.vy;m.l++;const t=Math.min(1,m.l/8)*Math.max(0,1-m.l/m.life);
const tx=m.x-m.vx*10,ty=m.y-m.vy*10,g=x.createLinearGradient(m.x,m.y,tx,ty);g.addColorStop(0,"rgba(190,240,255,"+t+")");g.addColorStop(1,"rgba(59,130,246,0)");
x.globalAlpha=1;x.strokeStyle=g;x.lineWidth=2;x.beginPath();x.moveTo(m.x,m.y);x.lineTo(tx,ty);x.stroke();
x.fillStyle="rgba(255,255,255,"+t+")";x.beginPath();x.arc(m.x,m.y,1.8,0,7);x.fill();
if(m.l>m.life||m.y>H+40||m.x<-40)M.splice(i,1)}}
requestAnimationFrame(draw)})()})();