'use strict';
const $=s=>document.querySelector(s);
const S={g(k,d){try{const v=localStorage.getItem('el_'+k);return v?JSON.parse(v):d}catch(e){return d}},s(k,v){try{localStorage.setItem('el_'+k,JSON.stringify(v))}catch(e){}}};
const h=(t,a,...c)=>{const e=document.createElement(t);for(const k in a||{}){if(k==='class')e.className=a[k];else if(k.startsWith('on'))e.addEventListener(k.slice(2),a[k]);else e.setAttribute(k,a[k])}c.flat().forEach(x=>{if(x!=null&&x!==false)e.append(x.nodeType?x:document.createTextNode(String(x)))});return e};
const SEED={items:[
{id:1,t:'dest',n:'Ekowisata Mangrove Kuala Langsa',c:'Alam',l:'Kuala Langsa',p:10000,e:'🌿',d:'Hutan bakau dengan jembatan kayu untuk berjalan santai dan mengamati satwa.',f:'Jembatan kayu, musala, parkir',j:'08.00–17.00',x:80,y:25},
{id:2,t:'dest',n:'Masjid Agung Darul Falah Langsa',c:'Religi',l:'Pusat Kota',p:0,e:'🕌',d:'Masjid megah dengan arsitektur khas, cocok untuk wisata religi dan swafoto.',f:'Parkir, tempat wudhu, toilet',j:'06.00–21.00',x:40,y:45},
{id:3,t:'dest',n:'Taman Kota Langsa',c:'Taman',l:'Pusat Kota',p:0,e:'🌳',d:'Ruang terbuka hijau untuk bersantai bersama keluarga di sore hari.',f:'Area bermain, jogging track, kantin',j:'Sepanjang hari',x:48,y:58},
{id:4,t:'dest',n:'Pelabuhan Kuala Langsa',c:'Bahari',l:'Kuala Langsa',p:5000,e:'⚓',d:'Menikmati suasana pelabuhan dan matahari terbenam di tepi laut.',f:'Dermaga, warung, parkir',j:'07.00–18.00',x:76,y:42},
{id:5,t:'food',n:'Mie Aceh Pusat Langsa',c:'Mie & Nasi',l:'Pusat Kota',p:25000,e:'🍜',d:'Mie Aceh pedas berbumbu rempah, pilihan goreng atau kuah.',f:'Dine-in, take away',j:'10.00–22.00',x:34,y:60},
{id:6,t:'food',n:'Warung Kopi Sanger',c:'Minuman',l:'Pusat Kota',p:12000,e:'☕',d:'Kopi Aceh dengan susu ala sanger, tempat nongkrong khas Aceh.',f:'Wi-Fi, colokan',j:'06.00–23.00',x:52,y:50},
{id:7,t:'food',n:'Nasi Gurih Pagi',c:'Mie & Nasi',l:'Langsa Kota',p:15000,e:'🍚',d:'Sarapan nasi gurih gurih dengan lauk khas Aceh.',f:'Take away',j:'06.00–11.00',x:58,y:64},
{id:8,t:'food',n:'Martabak Aceh Malam',c:'Jajanan',l:'Langsa Baro',p:20000,e:'🥞',d:'Martabak telur gurih dengan kuah acar segar.',f:'Dine-in, take away',j:'17.00–23.00',x:30,y:48},
{id:9,t:'umkm',n:'Anyaman Pandan Langsa',c:'Kerajinan',l:'Langsa Lama',p:35000,e:'🧺',d:'Tikar, tas, dan tempat tisu anyaman pandan buatan perajin lokal.',f:'Pesan khusus',j:'09.00–17.00',x:20,y:40},
{id:10,t:'umkm',n:'Timphan & Kue Kering Khas',c:'Oleh-oleh',l:'Langsa Kota',p:40000,e:'🍰',d:'Aneka kue tradisional Aceh sebagai buah tangan.',f:'Kemasan hadiah',j:'08.00–20.00',x:26,y:66},
{id:11,t:'umkm',n:'Kopi Bubuk Aceh Langsa',c:'Oleh-oleh',l:'Langsa Barat',p:50000,e:'🫘',d:'Kopi bubuk sangrai lokal dalam kemasan 250 gram.',f:'Kemasan vakum',j:'08.00–18.00',x:15,y:55}],
events:[{id:1,n:'Festival Kuliner Langsa',d:'2027-01-23',l:'Taman Kota Langsa',k:'Festival'},{id:2,n:'Bazar UMKM Akhir Pekan',d:'2027-02-06',l:'Pusat Kota',k:'Bazar'},{id:3,n:'Pesta Rakyat Kuala Langsa',d:'2027-03-13',l:'Pelabuhan Kuala Langsa',k:'Kegiatan'}]};
const D=S.g('data',null)||SEED;
const save=()=>S.s('data',D);
const rp=p=>p?'Rp '+p.toLocaleString('id-ID'):'Gratis';
const fav=()=>S.g('fav',[]);
const revs=id=>S.g('rev',{})[id]||[];
const rate=id=>{const r=revs(id);return r.length?r.reduce((a,b)=>a+b.s,0)/r.length:0};
const me=()=>S.g('session',null);
const user=()=>{const m=me();return m&&!m.guest?m:null};
const TL={dest:'Destinasi',food:'Kuliner',umkm:'UMKM'};
const fmt=d=>new Date(d+'T00:00:00').toLocaleDateString('id-ID',{day:'numeric',month:'long',year:'numeric'});
function toast(m){const t=h('div',{class:'toast',role:'status'},m);$('#toasts').append(t);setTimeout(()=>t.remove(),3200)}
function modal(title,body,acts){const o=h('div',{class:'ov'});const x=()=>o.remove();o.append(h('div',{class:'card md',role:'dialog','aria-modal':'true'},h('h3',{},title),body,h('div',{class:'row'},...(acts||[]).map(a=>h('button',{class:'btn gold',onclick:()=>{if(a.f()!==false)x()}},a.t)),h('button',{class:'btn ghost',onclick:x},'Tutup'))));document.body.append(o)}
const fl=(l,e)=>h('label',{class:'fl'},l,e);
const inp=(id,type,ph,max)=>h('input',{class:'in',id,type:type||'text',placeholder:ph||'',maxlength:String(max||80),autocomplete:'off'});
const val=id=>$('#'+id).value.trim();
async function hash(p,s){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s+p));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}
function toggleFav(id,b){let f=fav();const on=f.includes(id);f=on?f.filter(x=>x!==id):[...f,id];S.s('fav',f);toast(on?'Dihapus dari favorit':'Disimpan ke favorit');if(location.hash==='#/favorit')go();else b.textContent=on?'♡ Simpan':'♥ Tersimpan'}
const card=i=>h('article',{class:'card'},pic(i),h('span',{class:'badge'},i.c),h('h3',{},i.n),h('p',{class:'mut'},'📍 '+i.l+' · '+rp(i.p)+(rate(i.id)?' · ⭐ '+rate(i.id).toFixed(1):'')),h('div',{class:'row'},h('a',{class:'btn sm',href:'#/detail/'+i.id},'Detail'),h('button',{class:'btn sm ghost',onclick:e=>toggleFav(i.id,e.currentTarget)},fav().includes(i.id)?'♥ Tersimpan':'♡ Simpan')));
const R={};
function list(t,title){const all=t==='gem'?D.items.filter(i=>GEM.includes(i.id)):D.items.filter(i=>i.t===t);const q=h('input',{class:'in',placeholder:'Cari nama…',maxlength:'60','aria-label':'Cari'});
const sel=(a,lab)=>h('select',{class:'in','aria-label':lab},h('option',{value:''},lab),a.map(v=>h('option',{value:v},v)));
const c=sel([...new Set(all.map(i=>i.c))],'Semua kategori'),l=sel([...new Set(all.map(i=>i.l))],'Semua lokasi');
const p=h('select',{class:'in','aria-label':'Harga'},h('option',{value:''},'Semua harga'),h('option',{value:'0'},'Gratis'),h('option',{value:'20000'},'≤ Rp 20.000'),h('option',{value:'50000'},'≤ Rp 50.000'));
const g=h('div',{class:'grid'});
const f=()=>{const k=q.value.trim().toLowerCase();const r=all.filter(i=>(!k||i.n.toLowerCase().includes(k))&&(!c.value||i.c===c.value)&&(!l.value||i.l===l.value)&&(p.value===''||i.p<=+p.value));g.replaceChildren(...(r.length?r.map(card):[h('p',{class:'mut'},'Tidak ada hasil.')]))};
[q,c,l,p].forEach(e=>e.addEventListener('input',f));f();
const K={dest:'destinasi',food:'kuliner',umkm:'umkm',gem:'permata'};return h('section',{},h('h2',{},title),h('div',{class:'chips'},[['destinasi','Wisata'],['kuliner','Kuliner'],['umkm','UMKM'],['permata','Hidden Gems']].map(([k,n])=>h('a',{class:'chip'+(K[t]===k?' on':''),href:'#/'+k},n))),h('div',{class:'filters'},q,c,l,p),g)}
R.home=()=>{const ev=[...D.events].sort((a,b)=>a.d.localeCompare(b.d))[0];
return h('div',{},h('div',{class:'hero'},h('span',{class:'badge'},'Wisata Kota Langsa'),h('h1',{},'Jelajahi Langsa, nikmati setiap sudutnya'),h('p',{},'Destinasi, kuliner khas, UMKM, event, dan itinerary otomatis dalam satu aplikasi.'),h('div',{class:'stats'},[['dest','Destinasi'],['food','Kuliner'],['umkm','UMKM']].map(([t,l])=>h('div',{},h('b',{},String(D.items.filter(i=>i.t===t).length)),h('span',{},l)))),h('div',{class:'row'},h('a',{class:'btn gold',href:'#/itinerary'},'Buat Itinerary'),h('a',{class:'btn gold',href:'#/destinasi'},'Jelajahi'))),
ev?h('p',{},h('span',{class:'badge'},'Promo Event'),' '+ev.n+' · '+fmt(ev.d)):null,
h('h2',{},'Pilihan Terbaik'),h('div',{class:'grid'},[...D.items].sort((a,b)=>rate(b.id)-rate(a.id)).slice(0,3).map(card)))};
R.destinasi=()=>list('dest','Destinasi Wisata');R.kuliner=()=>list('food','Kuliner Khas');R.umkm=()=>list('umkm','UMKM Lokal');
R.detail=a=>{const i=D.items.find(x=>x.id===Number(a));if(!i)return h('p',{},'Data tidak ditemukan.');
const rs=h('div',{});const draw=()=>rs.replaceChildren(...(revs(i.id).length?revs(i.id).map(r=>h('div',{class:'card'},h('strong',{},r.u+' · '+'⭐'.repeat(r.s)),h('p',{},r.t))):[h('p',{class:'mut'},'Belum ada ulasan.')]));draw();
const s=h('select',{class:'in',id:'rs'},[5,4,3,2,1].map(n=>h('option',{value:String(n)},n+' bintang')));const t=h('textarea',{class:'in',id:'rt',maxlength:'300',rows:'3'});
const send=()=>{const u=user();if(!u)return toast('Masuk dulu untuk memberi ulasan');const x=t.value.trim();if(x.length<5)return toast('Ulasan minimal 5 karakter');const all=S.g('rev',{});all[i.id]=[...(all[i.id]||[]),{u:u.name,s:Number(s.value),t:x}];S.s('rev',all);t.value='';draw();toast('Ulasan terkirim')};
const visit=()=>{const u=user();if(!u)return toast('Masuk dulu untuk mencatat riwayat');const k='hist_'+u.email;const v=S.g(k,[]);v.push({id:i.id,d:new Date().toISOString().slice(0,10)});S.s(k,v);toast('Dicatat ke riwayat perjalanan')};
return h('section',{},h('a',{href:'#/'+(i.t==='dest'?'destinasi':i.t==='food'?'kuliner':'umkm')},'← Kembali'),pic(i,1),h('h2',{},i.n),h('span',{class:'badge'},TL[i.t]+' · '+i.c),
h('p',{},i.d),h('p',{},'🎟️ Tiket/Harga: '+rp(i.p)),h('p',{},'🛠️ Fasilitas: '+i.f),h('p',{},'🕒 Jam operasional: '+i.j),h('p',{},'📍 '+i.l),
h('div',{class:'row'},h('button',{class:'btn',onclick:e=>toggleFav(i.id,e.currentTarget)},fav().includes(i.id)?'♥ Tersimpan':'♡ Simpan'),h('button',{class:'btn gold',onclick:visit},'Tandai dikunjungi'),h('a',{class:'btn ghost',href:'#/peta'},'Lihat di Peta')),
h('h3',{},'Ulasan ('+(rate(i.id)?rate(i.id).toFixed(1)+'/5':'-')+')'),rs,h('div',{class:'card'},fl('Rating',s),fl('Ulasan',t),h('button',{class:'btn',onclick:send},'Kirim Ulasan')))};
R.peta=()=>{let f='all';const m=h('div',{class:'map',role:'group','aria-label':'Peta Langsa'}),info=h('div',{class:'card'},h('p',{class:'mut'},'Pilih penanda untuk melihat info.'));
const draw=()=>{m.replaceChildren(h('span',{class:'badge'},'Selat Malaka →'));D.items.filter(i=>f==='all'||i.t===f).forEach(i=>{const b=h('button',{class:'pin','aria-label':i.n,onclick:()=>info.replaceChildren(h('h3',{},i.e+' '+i.n),h('p',{},i.l+' · '+rp(i.p)),h('a',{class:'btn sm',href:'#/detail/'+i.id},'Detail'))},i.e);b.style.left=i.x+'%';b.style.top=i.y+'%';m.append(b)})};draw();
return h('section',{},h('h2',{},'Peta Interaktif'),h('div',{class:'row'},[['all','Semua'],['dest','Wisata'],['food','Kuliner'],['umkm','UMKM']].map(([k,l])=>h('button',{class:'btn sm ghost',onclick:()=>{f=k;draw()}},l))),m,info)};
R.event=()=>h('section',{},h('h2',{},'Kalender Event'),h('div',{class:'grid'},[...D.events].sort((a,b)=>a.d.localeCompare(b.d)).map(e=>h('article',{class:'card'},h('span',{class:'badge'},e.k),h('h3',{},e.n),h('p',{class:'mut'},'📅 '+fmt(e.d)),h('p',{class:'mut'},'📍 '+e.l)))));
R.favorit=()=>{const r=D.items.filter(i=>fav().includes(i.id));return h('section',{},h('h2',{},'Favorit Saya'),r.length?h('div',{class:'grid'},r.map(card)):h('p',{class:'mut'},'Belum ada favorit.'))};
R.itinerary=()=>{const out=h('div',{});const d=h('select',{class:'in',id:'id'},[1,2,3].map(n=>h('option',{value:String(n)},n+' hari')));const b=inp('ib','number','Anggaran (Rp)',9);const k=h('select',{class:'in',id:'ik'},['Semua','Alam','Religi','Taman','Bahari'].map(v=>h('option',{value:v},v)));
const go2=()=>{const n=Number(d.value),bud=Number(b.value)||0;let ds=D.items.filter(i=>i.t==='dest'&&(k.value==='Semua'||i.c===k.value));if(!ds.length)ds=D.items.filter(i=>i.t==='dest');ds.sort((x,y)=>rate(y.id)-rate(x.id));const fd=D.items.filter(i=>i.t==='food'),um=D.items.filter(i=>i.t==='umkm');let tot=0;const days=[];
for(let x=0;x<n;x++){const a=ds[(2*x)%ds.length],c=ds[(2*x+1)%ds.length],f=fd[x%fd.length],u=um[x%um.length];const cost=(a?a.p:0)+(c&&c!==a?c.p:0)+f.p*2+50000;tot+=cost;days.push(h('div',{class:'card'},h('h3',{},'Hari '+(x+1)),h('p',{},'🌅 Pagi: '+a.n),c&&c!==a?h('p',{},'☀️ Siang: '+c.n):null,h('p',{},'🍽️ Makan: '+f.n),h('p',{},'🎁 Oleh-oleh: '+u.n),h('p',{class:'mut'},'Estimasi: '+rp(cost)+' (tiket, 2x makan, transport)')))}
out.replaceChildren(...days,h('p',{},h('span',{class:'badge'},'Total ≈ '+rp(tot)),bud?(tot<=bud?' Sesuai anggaran 👍':' Melebihi anggaran '+rp(tot-bud)):''))};
return h('section',{},h('h2',{},'Itinerary Otomatis'),h('p',{class:'mut'},'Dibuat otomatis berdasarkan rating, minat, dan harga (tanpa API key).'),h('div',{class:'card'},fl('Durasi',d),fl('Minat',k),fl('Anggaran',b),h('button',{class:'btn gold',onclick:go2},'Buat Itinerary')),out)};
R.masuk=()=>{let reg=false;const box=h('div',{class:'card'});const draw=()=>{const nm=inp('an','text','Nama',40),em=inp('ae','email','Email',80),pw=inp('ap','password','Kata sandi (min. 8)',64);
const sub=async()=>{const e=em.value.trim().toLowerCase(),p=pw.value;if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))return toast('Email tidak valid');if(p.length<8)return toast('Kata sandi minimal 8 karakter');const us=S.g('users',[]);
if(reg){const n=nm.value.trim();if(n.length<2)return toast('Nama minimal 2 karakter');if(us.some(u=>u.e===e))return toast('Email sudah terdaftar');const salt=[...crypto.getRandomValues(new Uint8Array(8))].map(x=>x.toString(16)).join('');us.push({e,n,salt,hs:await hash(p,salt),role:us.length?'user':'admin'});S.s('users',us);S.s('session',{email:e,name:n,role:us[us.length-1].role});toast('Registrasi berhasil')}
else{const u=us.find(x=>x.e===e);if(!u||u.hs!==await hash(p,u.salt))return toast('Email atau kata sandi salah');S.s('session',{email:e,name:u.n,role:u.role});toast('Selamat datang, '+u.n)}nav();location.hash='#/profil'};
box.replaceChildren(h('h2',{},reg?'Registrasi':'Masuk'),reg?fl('Nama',nm):null,fl('Email',em),fl('Kata sandi',pw),h('div',{class:'row'},h('button',{class:'btn',onclick:sub},reg?'Daftar':'Masuk'),h('button',{class:'btn ghost',onclick:()=>{reg=!reg;draw()}},reg?'Sudah punya akun':'Buat akun'),h('button',{class:'btn gold',onclick:()=>{S.s('session',{guest:true,name:'Tamu'});nav();toast('Masuk sebagai tamu');location.hash='#/home'}},'Lanjut sebagai Tamu')),h('p',{class:'mut'},'Akun pertama yang terdaftar menjadi Admin. Penyimpanan lokal di peramban (demo).'))};draw();return box};
R.profil=()=>{const u=user();if(!u)return h('section',{},h('h2',{},'Profil'),h('p',{},'Anda belum masuk.'),h('a',{class:'btn',href:'#/masuk'},'Masuk / Daftar'));
const nm=inp('pn','text','Nama',40);nm.value=u.name;const hs=S.g('hist_'+u.email,[]);
return h('section',{},h('h2',{},'Profil'),h('div',{class:'card'},h('p',{},'📧 '+u.email+' · '+(u.role==='admin'?'Admin':'Pengguna')),fl('Nama',nm),h('div',{class:'row'},h('button',{class:'btn',onclick:()=>{const n=nm.value.trim();if(n.length<2)return toast('Nama minimal 2 karakter');const us=S.g('users',[]);const x=us.find(z=>z.e===u.email);if(x)x.n=n;S.s('users',us);S.s('session',{...u,name:n});toast('Profil diperbarui')}},'Simpan'),h('button',{class:'btn ghost',onclick:()=>{S.s('session',null);nav();location.hash='#/home';toast('Anda telah keluar')}},'Keluar'))),
h('h3',{},'Riwayat Perjalanan'),hs.length?hs.map(r=>{const i=D.items.find(x=>x.id===r.id);return i?h('p',{},r.d+' — '+i.n):null}):h('p',{class:'mut'},'Belum ada riwayat.'))};
R.admin=()=>{const u=user();if(!u||u.role!=='admin')return h('section',{},h('h2',{},'Admin'),h('p',{},'Akses khusus Admin.'));
const del=(arr,id,lab)=>modal('Hapus data?',h('p',{},lab),[{t:'Hapus',f:()=>{D[arr]=D[arr].filter(x=>x.id!==id);save();go()}}]);
const addI=()=>{const t=h('select',{class:'in',id:'xt'},Object.keys(TL).map(k=>h('option',{value:k},TL[k])));modal('Tambah Item',h('div',{},fl('Jenis',t),fl('Nama',inp('xn')),fl('Kategori',inp('xc')),fl('Lokasi',inp('xl')),fl('Harga',inp('xp','number','0',9)),fl('Emoji',inp('xe','text','📍',4)),fl('Deskripsi',inp('xd','text','',200))),[{t:'Simpan',f:()=>{const n=val('xn'),c=val('xc'),l=val('xl'),p=Number(val('xp'))||0;if(!n||!c||!l||p<0){toast('Nama, kategori, lokasi wajib diisi');return false}D.items.push({id:Date.now(),t:t.value,n,c,l,p,e:val('xe')||'📍',d:val('xd')||'-',f:'-',j:'-',x:15+Math.floor(Math.random()*70),y:15+Math.floor(Math.random()*70)});save();go();toast('Item ditambahkan')}}])};
const addE=()=>modal('Tambah Event',h('div',{},fl('Nama',inp('en')),fl('Tanggal',inp('ed','date')),fl('Lokasi',inp('el')),fl('Jenis',inp('ek','text','Festival'))),[{t:'Simpan',f:()=>{if(!val('en')||!val('ed')||!val('el')){toast('Semua kolom wajib diisi');return false}D.events.push({id:Date.now(),n:val('en'),d:val('ed'),l:val('el'),k:val('ek')||'Kegiatan'});save();go();toast('Event ditambahkan')}}]);
return h('section',{},h('h2',{},'Dashboard Admin'),h('div',{class:'row'},h('button',{class:'btn',onclick:addI},'+ Item'),h('button',{class:'btn gold',onclick:addE},'+ Event')),h('h3',{},'Destinasi, Kuliner, UMKM'),D.items.map(i=>h('div',{class:'row'},h('span',{},TL[i.t]+': '+i.n),h('button',{class:'btn sm ghost',onclick:()=>del('items',i.id,i.n)},'Hapus'))),h('h3',{},'Event'),D.events.map(e=>h('div',{class:'row'},h('span',{},e.n+' ('+fmt(e.d)+')'),h('button',{class:'btn sm ghost',onclick:()=>del('events',e.id,e.n)},'Hapus'))))};
const IMG={1:'mangrov-1.png',2:'masjid-islamic-center-langsa.png',3:'taman-kota-langsa.png',4:'pelabuhan-kuala-langsa.png'};
const pic=(i,b)=>{const d=h('div',{class:'ph'+(b?' big':'')});const em=()=>d.replaceChildren(i.e);if(IMG[i.id]){const m=h('img',{src:IMG[i.id],alt:'Foto '+i.n,decoding:'async'});m.addEventListener('error',em);d.append(m)}else em();return d};
const SVC=[{n:'Pemandu Lokal Mangrove',e:'🧭',p:150000,u:'per trip'},{n:'Fotografer Wisata',e:'📷',p:250000,u:'per sesi'},{n:'Sewa Perahu Kuala Langsa',e:'🛶',p:300000,u:'per perahu'},{n:'Pemandu Kuliner Langsa',e:'🍜',p:100000,u:'per trip'}];
const ECO=[{id:1,n:'Penanaman Mangrove',pt:50},{id:2,n:'Aksi Bersih Destinasi',pt:30},{id:3,n:'Bawa Tumbler / Tas Belanja Sendiri',pt:10}];
const GEM=[3,7,8,9,10];
const need=()=>h('section',{},h('p',{},'Silakan masuk terlebih dahulu.'),h('a',{class:'btn',href:'#/masuk'},'Masuk / Daftar'));
R.permata=()=>list('gem','Hidden Gems Explorer');
R.anggaran=()=>{const ds=D.items.filter(i=>i.t==='dest'),sel=new Set(),out=h('div',{class:'card'});const n=id=>Math.max(0,Number(val(id))||0);
const f=[['bo','Jumlah orang',2],['bh','Jumlah hari',1],['bt','Transport per hari (Rp)',50000],['bm','Makan per orang per hari (Rp)',60000],['bs','Oleh-oleh total (Rp)',100000]].map(([id,l,v])=>{const e=inp(id,'number','',9);e.value=v;return fl(l,e)});
const chk=ds.map(i=>{const c=h('input',{type:'checkbox'});c.addEventListener('change',()=>{c.checked?sel.add(i):sel.delete(i)});return h('label',{class:'fl'},c,' '+i.n+' ('+rp(i.p)+')')});
const calc=()=>{const o=Math.max(1,n('bo')),d=Math.max(1,n('bh')),tk=[...sel].reduce((a,i)=>a+i.p,0)*o,tr=n('bt')*d,fo=n('bm')*o*d,ol=n('bs'),t=tk+tr+fo+ol;out.replaceChildren(h('p',{},'🎟️ Tiket: '+rp(tk)),h('p',{},'🚗 Transportasi: '+rp(tr)),h('p',{},'🍽️ Makanan: '+rp(fo)),h('p',{},'🎁 Oleh-oleh: '+rp(ol)),h('h3',{},'Total: '+rp(t)),h('p',{class:'mut'},'Per orang: '+rp(Math.round(t/o))))};
return h('section',{},h('h2',{},'Smart Budget Planner'),h('div',{class:'card'},f,h('strong',{},'Destinasi dikunjungi'),chk,h('button',{class:'btn gold',onclick:calc},'Hitung')),out)};
R.guide=()=>{const log=h('div',{class:'card chat'}),q=inp('gq','text','Tanya soal wisata Langsa…',120),G=['langsa','kota','pusat','kuala','wisata','aceh','khas','dan','lokal','baro','pagi','malam'];
const say=(w,t)=>{log.append(h('p',{class:w},(w==='me'?'Anda: ':'Guide: ')+t));log.scrollTop=log.scrollHeight};
const L=ty=>D.items.filter(i=>i.t===ty).map(i=>i.n).join(', ');
const ans=t=>{t=t.toLowerCase();const x=D.items.find(i=>t.includes(i.n.toLowerCase())||i.n.toLowerCase().split(' ').some(w=>w.length>2&&!G.includes(w)&&t.includes(w)));
if(x)return x.n+': '+x.d+' Harga '+rp(x.p)+', jam '+x.j+', lokasi '+x.l+'.';
if(/kuliner|makan|minum/.test(t))return 'Kuliner: '+L('food')+'.';if(/oleh|souvenir|umkm/.test(t))return 'UMKM: '+L('umkm')+'.';
if(/gratis|murah/.test(t))return 'Gratis: '+D.items.filter(i=>!i.p).map(i=>i.n).join(', ')+'.';
if(/event|festival|bazar/.test(t))return 'Event: '+D.events.map(e=>e.n+' ('+fmt(e.d)+')').join('; ')+'.';
if(/wisata|destinasi|tempat|jalan/.test(t))return 'Destinasi: '+L('dest')+'.';
if(/budaya|adat/.test(t))return 'Cicipi kopi sanger, mie Aceh, dan timphan; berpakaian sopan saat ke masjid.';
return 'Coba tanya soal destinasi, kuliner, oleh-oleh, event, tempat gratis, atau nama tempat.'};
const send=()=>{const t=q.value.trim();if(!t)return;say('me',t);say('bot',ans(t));q.value=''};
q.addEventListener('keydown',e=>{if(e.key==='Enter')send()});say('bot','Halo! Saya pemandu digital Langsa. Jawaban berasal dari data aplikasi.');
return h('section',{},h('h2',{},'Langsa AI Guide'),log,h('div',{class:'row'},q,h('button',{class:'btn',onclick:send},'Kirim')))};
R.paspor=()=>{const u=user();if(!u)return need();const k='stamp_'+u.email,st=S.g(k,[]),ds=D.items.filter(i=>i.t==='dest'),c=inp('sc','text','Kode QR, mis. LANGSA-1',20);
const add=()=>{const m=/^LANGSA-(\d+)$/i.exec(val('sc')),i=m&&ds.find(x=>x.id===Number(m[1]));if(!i)return toast('Kode tidak valid');if(st.includes(i.id))return toast('Stempel sudah dimiliki');S.s(k,[...st,i.id]);toast('Stempel '+i.n+' didapat!');go()};
return h('section',{},h('h2',{},'Paspor Wisata Digital'),h('p',{class:'mut'},'Pindai QR di destinasi, lalu masukkan kode yang tertera (demo, kamera tidak dipakai).'),
h('div',{class:'grid'},ds.map(i=>h('div',{class:'card'},h('div',{class:'ph'},st.includes(i.id)?'✅':'⬜'),h('h3',{},i.n)))),h('div',{class:'card'},fl('Kode stempel',c),h('button',{class:'btn',onclick:add},'Klaim Stempel')),
h('h3',{},'Pencapaian'),[[1,'Penjelajah Baru'],[3,'Penjelajah Langsa'],[ds.length,'Master Langsa']].map(([n,l])=>h('p',{},(st.length>=n?'🏅 ':'🔒 ')+l+' ('+n+' stempel)')),
st.length>=2?h('p',{},h('span',{class:'badge'},'Promo'),' Tunjukkan paspor ke mitra UMKM untuk diskon 10%.'):h('p',{class:'mut'},'Kumpulkan 2 stempel untuk membuka promo UMKM.'))};
R.eco=()=>{const u=user();if(!u)return need();const cl=S.g('claims',[]),mine=cl.filter(c=>c.e===u.email),pts=mine.filter(c=>c.st==='Disetujui').reduce((a,c)=>a+c.pt,0);
const claim=a=>{if(mine.some(c=>c.a===a.id&&c.st==='Menunggu verifikasi'))return toast('Klaim masih menunggu verifikasi');cl.push({id:Date.now(),e:u.email,n:u.name,a:a.id,l:a.n,pt:a.pt,st:'Menunggu verifikasi'});S.s('claims',cl);go();toast('Klaim terkirim, menunggu verifikasi Admin')};
return h('section',{},h('h2',{},'Eco Tourism Rewards'),h('p',{},h('span',{class:'badge'},'Poin: '+pts)),h('p',{class:'mut'},'Poin cair setelah Admin memverifikasi kegiatan. 100 poin = voucher mitra UMKM.'),pts>=100?h('p',{},'🎁 Voucher terbuka!'):null,
h('div',{class:'grid'},ECO.map(a=>h('article',{class:'card'},h('h3',{},a.n),h('p',{class:'mut'},'+'+a.pt+' poin'),h('button',{class:'btn',onclick:()=>claim(a)},'Klaim')))),h('h3',{},'Riwayat Klaim'),mine.length?mine.map(c=>h('p',{},c.l+' — '+c.st)):h('p',{class:'mut'},'Belum ada klaim.'))};
R.booking=()=>{const u=user(),bk=S.g('bookings',[]),mine=u?bk.filter(b=>b.e===u.email):[];
const book=s=>{if(!u)return toast('Masuk dulu untuk memesan');modal('Pesan: '+s.n,h('div',{},fl('Tanggal',inp('bd','date')),fl('Jumlah orang',inp('bp','number','1',2)),fl('Catatan',inp('bn','text','',100))),[{t:'Pesan',f:()=>{const d=val('bd'),p=Number(val('bp'))||0;if(!d||d<new Date().toISOString().slice(0,10)||p<1||p>50){toast('Tanggal atau jumlah tidak valid');return false}bk.push({id:Date.now(),e:u.email,n:u.name,s:s.n,d,p,t:s.p,st:'Menunggu konfirmasi'});S.s('bookings',bk);go();toast('Pesanan terkirim')}}])};
return h('section',{},h('h2',{},'Pengalaman Lokal'),h('div',{class:'grid'},SVC.map(s=>h('article',{class:'card'},h('div',{class:'ph'},s.e),h('h3',{},s.n),h('p',{class:'mut'},rp(s.p)+' '+s.u),h('button',{class:'btn',onclick:()=>book(s)},'Pesan')))),h('h3',{},'Pesanan Saya'),mine.length?mine.map(b=>h('p',{},b.s+' · '+fmt(b.d)+' · '+b.p+' orang · '+rp(b.t)+' · '+b.st)):h('p',{class:'mut'},'Belum ada pesanan.'))};
const A0=R.admin;R.admin=a=>{const n=A0(a),u=user();if(!u||u.role!=='admin')return n;const cl=S.g('claims',[]),bk=S.g('bookings',[]);
const upd=(k,id,st)=>{const r=S.g(k,[]),x=r.find(z=>z.id===id);if(x)x.st=st;S.s(k,r);go();toast('Status diperbarui')};
n.append(h('h3',{},'Klaim Eco'),cl.map(c=>h('div',{class:'row'},h('span',{},c.n+' — '+c.l+' — '+c.st),c.st==='Menunggu verifikasi'?h('button',{class:'btn sm gold',onclick:()=>upd('claims',c.id,'Disetujui')},'Setujui'):null)),h('h3',{},'Pesanan Pengalaman'),bk.map(b=>h('div',{class:'row'},h('span',{},b.n+' — '+b.s+' — '+fmt(b.d)+' — '+b.st),b.st!=='Dikonfirmasi'?h('button',{class:'btn sm gold',onclick:()=>upd('bookings',b.id,'Dikonfirmasi')},'Konfirmasi'):null)));return n};
const G={kuliner:'destinasi',umkm:'destinasi',permata:'destinasi',detail:'destinasi',itinerary:'fitur',anggaran:'fitur',guide:'fitur',paspor:'fitur',eco:'fitur',booking:'fitur',favorit:'fitur',profil:'akun',masuk:'akun'};
R.fitur=()=>h('section',{},h('h2',{},'Fitur Wisata'),h('div',{class:'grid'},[['itinerary','🗺️','Itinerary AI','Rencana perjalanan otomatis'],['anggaran','💰','Anggaran','Hitung biaya perjalanan'],['guide','💬','AI Guide','Tanya pemandu digital'],['paspor','🎫','Paspor','Kumpulkan stempel'],['eco','🌱','Eco Rewards','Poin ramah lingkungan'],['booking','🧭','Pengalaman','Pesan pemandu & perahu'],['favorit','♥','Favorit','Tempat tersimpan']].map(([k,e,t,s])=>h('a',{class:'card tile',href:'#/'+k},h('div',{class:'ic'},e),h('h3',{},t),h('p',{class:'mut'},s)))));
function nav(){const u=user();const L=[['home','🏠','Beranda'],['destinasi','🧭','Jelajah'],['peta','📍','Peta'],['event','📅','Event'],['fitur','✨','Fitur'],[u?'profil':'masuk','👤',u?'Profil':'Masuk']];if(u&&u.role==='admin')L.push(['admin','⚙️','Admin']);$('#nav').replaceChildren(...L.map(([k,e,l])=>h('a',{href:'#/'+k,'data-k':k==='profil'||k==='masuk'?'akun':k},h('b',{},e),h('span',{},l))))}
function go(){const p=location.hash.split('/');const r=p[1]||'home';$('#app').replaceChildren((R[r]||R.home)(p[2]));window.scrollTo(0,0);$('#nav').classList.remove('open');$('#mb').setAttribute('aria-expanded','false');const k=G[r]||r;document.querySelectorAll('#nav a').forEach(x=>x.classList.toggle('act',x.dataset.k===k))}
$('#mb').addEventListener('click',()=>{const o=$('#nav').classList.toggle('open');$('#mb').setAttribute('aria-expanded',String(o))});
addEventListener('hashchange',go);nav();go();
addEventListener('scroll',()=>$('header').classList.toggle('sc',scrollY>8),{passive:true});
