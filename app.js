const DATA=[['01/09/2026','B001',1200,850,280,70],['02/09/2026','B002',1350,920,350,80],['03/09/2026','B003',1100,790,250,60],['04/09/2026','B004',1450,980,380,90],['05/09/2026','B005',1280,890,320,70],['06/09/2026','B006',1500,1030,380,90]].map(x=>({tanggal:x[0],batch:x[1],total:x[2],a:x[3],b:x[4],reject:x[5]}));
function guard(){if(localStorage.getItem('qcLoggedIn')!=='true')location.href='index.html';document.querySelectorAll('#currentUser').forEach(x=>x.textContent=localStorage.getItem('qcUser')||'admin');const l=document.getElementById('logoutBtn');if(l)l.onclick=()=>{localStorage.clear();location.href='index.html'}}
function sum(){return DATA.reduce((s,r)=>({total:s.total+r.total,a:s.a+r.a,b:s.b+r.b,reject:s.reject+r.reject}),{total:0,a:0,b:0,reject:0})}
function row(r){return `<tr><td>${r.tanggal}</td><td>${r.batch}</td><td>${r.total.toLocaleString('id-ID')}</td><td>${r.a.toLocaleString('id-ID')}</td><td>${r.b.toLocaleString('id-ID')}</td><td>${r.reject.toLocaleString('id-ID')}</td></tr>`}
function dashboard(){const s=sum();[['totalChecked',s.total],['gradeA',s.a],['gradeB',s.b],['reject',s.reject],['legendA',s.a],['legendB',s.b],['legendReject',s.reject]].forEach(([id,v])=>{const e=document.getElementById(id);if(e)e.textContent=v.toLocaleString('id-ID')});const t=document.getElementById('recentTable');if(t)t.innerHTML=DATA.slice().reverse().slice(0,5).map(row).join('');const c=document.getElementById('barChart');if(c){const m=Math.max(...DATA.map(x=>x.total));c.innerHTML=DATA.map(r=>`<div class="bar-item"><div class="bar" style="height:${Math.max(20,r.total/m*150)}px"></div><small>${r.batch}</small></div>`).join('')}}
function tables(){const t=document.getElementById('dataTable');if(t){const render=a=>t.innerHTML=a.map(row).join('');render(DATA);const s=document.getElementById('searchInput');if(s)s.oninput=()=>render(DATA.filter(r=>r.batch.toLowerCase().includes(s.value.toLowerCase())))}}
function monitoring(){const s=sum(),last=DATA.at(-1);const set=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v};set('lastBatch',last.batch);set('rejectRate',(s.reject/s.total*100).toFixed(1)+'%');set('gradeARate',(s.a/s.total*100).toFixed(1)+'%');const t=document.getElementById('monitoringTable');if(t)t.innerHTML=DATA.slice().reverse().map(r=>row(r).replace('</tr>','<td><span class="status">OK</span></td></tr>')).join('')}
function report(){const s=sum(),pct=n=>(n/s.total*100).toFixed(1)+'%';[['reportTotal',s.total.toLocaleString('id-ID')],['reportA',pct(s.a)],['reportB',pct(s.b)],['reportReject',pct(s.reject)]].forEach(([id,v])=>{const e=document.getElementById(id);if(e)e.textContent=v});const e=document.getElementById('reportText');if(e)e.textContent=`Dari ${s.total.toLocaleString('id-ID')} buah yang diperiksa pada data dummy, ${s.a.toLocaleString('id-ID')} masuk Grade A, ${s.b.toLocaleString('id-ID')} Grade B, dan ${s.reject.toLocaleString('id-ID')} Reject.`}
document.addEventListener('DOMContentLoaded',()=>{if(!location.pathname.endsWith('index.html')&&!location.pathname.endsWith('/')){guard();dashboard();tables();monitoring();report()}});
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.querySelector(".sidebar");

if (menuToggle && sidebar) {

  const overlay = document.createElement("div");

  overlay.className = "menu-overlay";

  document.body.appendChild(overlay);

  menuToggle.addEventListener("click", () => {

    sidebar.classList.toggle("show");

    overlay.classList.toggle("show");

  });

  overlay.addEventListener("click", () => {

    sidebar.classList.remove("show");

    overlay.classList.remove("show");

  });

}