const projects={social:[
 ['Growth through clearer stories.','PT PROMO LITERASI PRIMA / STRATEGY','Social strategy across organic and paid platforms.','s1','social-growth'],
 ['Making communities participate.','ANANTARUPA / COMMUNITY','Content, live interaction and day-to-day engagement across gaming communities.','s2','gaming-community'],
 ['Explaining complex change.','KINDI PR / COMMUNICATION','Editorial discipline for public-facing electric vehicle communication.','s3','public-communication'],
 ['One strategy, nine brand voices.','VHISOMO / EDITORIAL','Multi-brand content management and measured distribution.','s4','brand-voices']
],programming:[
 ['A clearer view of marketplace performance.','SAMPE / PROTOTYPE','A clearer view of marketplace performance.','p1','sampe'],
 ['Small tools for complex seller tasks.','MARKETPLACE TOOLS / EXPERIMENTAL','A collection of seller workflow utilities, from fees to listing support.','p2','marketplace-tools'],
 ['Practise the conversation.','BISA CLOSING / LOCAL PROTOTYPE','Practice for better customer conversations.','p3','bisa-closing'],
 ['Clearer reports for sellers.','PROFITREX / LOCAL PROJECT','Marketplace data, made easier to read.','p4','profitrex']
]};
const repoLinks={'sampe':['SAMPE','https://github.com/rickyzakariap/sampe'],'marketplace-tools':['id-marketplace-tools','https://github.com/rickyzakariap/id-marketplace-tools']};
const repoIcon='<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 .8a11.2 11.2 0 0 0-3.54 21.82c.56.1.76-.24.76-.54v-2.16c-3.11.68-3.77-1.32-3.77-1.32-.51-1.3-1.25-1.64-1.25-1.64-1.02-.7.08-.69.08-.69 1.12.08 1.71 1.16 1.71 1.16 1 1.71 2.62 1.22 3.26.93.1-.73.39-1.22.71-1.5-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.23 1.16-3.01-.12-.28-.5-1.43.11-2.97 0 0 .95-.3 3.08 1.15a10.7 10.7 0 0 1 5.61 0c2.13-1.45 3.08-1.15 3.08-1.15.62 1.54.23 2.69.11 2.97.72.78 1.16 1.79 1.16 3.01 0 4.3-2.62 5.24-5.11 5.52.4.35.76 1.02.76 2.07v3.16c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z"/></svg>';
const clients=[
 ['Heru Dewanto','Promo Literasi Prima',null],['PII (Persatuan Insinyur Indonesia)','Promo Literasi Prima','pii.png'],['Palyja','Promo Literasi Prima','palyja.png'],['Kideco','Promo Literasi Prima','kideco.png'],
 ['AMO Drink','Vhisomo','amo.png'],['Fiesta Nugget','Vhisomo','fiesta.png'],['TAPO TP-Link','Vhisomo','tapo.png'],['PLN Mobile','Vhisomo','pln-mobile.png'],
 ['ENTREV','Kindi PR','entrev.png'],['Pelindo Banten','Kindi PR','pelindo.png'],['Electricity Connect','Kindi PR','electricity.png'],['MKI','Kindi PR','mki.png'],
 ['Lokapala','Anantarupa','lokapala.jpg'],['J&T Cargo','Global Jet Cargo','jt-cargo.svg']
];
const projectNames={'sampe':'SAMPE','marketplace-tools':'id-marketplace-tools','bisa-closing':'Bisa Closing','profitrex':'ProfitRex'};
const container=document.querySelector('#projects'); let mode='social', timer;
function readMode(){return new URL(location.href).searchParams.get('discipline')==='programming'?'programming':'social'}
function render(next,update=false){
 mode=next;document.body.classList.toggle('programming',mode==='programming');document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));
 document.querySelector('#work-word').textContent='work.';document.querySelector('#work-intro').textContent=mode==='social'?'Stories and campaigns.':'Tools and digital projects.';document.querySelector('#work-label').textContent=mode==='social'?'SOCIAL MEDIA / 14 CLIENTS':'PROGRAMMING / AI';
 if(mode==='programming'){container.innerHTML=window.renderProgrammingGallery();if(update){const url=new URL(location.href);url.searchParams.set('discipline',mode);history.pushState({mode},'',url)}return}
 const tiles=mode==='social'?clients.map(([name,company,image],i)=>`<article class="gallery-tile project social-gallery-tile client-node" data-group="${i<12?Math.floor(i/4):i-9}" data-company="${company}"><button class="social-gallery-link social-gallery-info-only" type="button" aria-label="${name} — ${company}" aria-pressed="false"><span class="social-logo-stage"><span class="social-logo-media client-node-media">${image?`<img src="assets/client-logos/${image}" alt="">`:`<span class="client-text-fallback">${name}</span>`}</span><span class="client-node-name">${name}</span><span class="social-logo-info"><strong>${name}</strong><span>${company}</span></span></span></button></article>`).join('')+`<svg class="social-network" aria-hidden="true" focusable="false"><defs><mask id="client-line-mask" maskUnits="userSpaceOnUse"><rect fill="white"/><g class="client-mask-nodes"></g></mask></defs><g mask="url(#client-line-mask)">${'<path/>'.repeat(12)}</g></svg>`:projects[mode].map(p=>{
  const slug=p[4],repo=repoLinks[slug],name=projectNames[slug];
  const inner=`<span class="gallery-art gallery-github ${p[3]}">${repoIcon}<strong>${name}</strong>${repo?'':'<small>REPOSITORY NOT VERIFIED</small>'}</span>`;
  return `<article class="gallery-tile project">${repo?`<a href="${repo[1]}" target="_blank" rel="noopener noreferrer" aria-label="Open repository for ${name}">${inner}</a>`:inner}</article>`;
 }).join('');
 const rows=projects[mode].map((p,i)=>{const slug=p[4],repo=repoLinks[slug];return `<div class="gallery-entry"><a class="gallery-row" href="work/${slug}/"><span>${p[0]}<small>${p[2]}</small></span><span>${String(i+1).padStart(2,'0')} ↗</span></a>${mode==='programming'&&repo?`<a class="repo-link gallery-repo" href="${repo[1]}" target="_blank" rel="noopener noreferrer" aria-label="Open repository for ${repo[0]}">${repoIcon}<span>${repo[0]}</span></a>`:''}</div>`}).join('');
 container.innerHTML='<div class="gallery-field" aria-label="Selected project visuals">'+tiles+'</div><div class="gallery-index"><span class="gallery-index-label">Selected projects</span><div>'+rows+'</div></div>';
 if(update){const url=new URL(location.href);url.searchParams.set('discipline',mode);history.pushState({mode},'',url)}
}

document.querySelectorAll('[data-mode]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.mode===mode)return;clearTimeout(timer);render(b.dataset.mode,true)}));window.addEventListener('popstate',()=>render(readMode()));render(readMode());
const object=document.querySelector('.object-button');object?.addEventListener('click',()=>object.classList.toggle('turned'));
const menu=document.querySelector('#site-menu'),toggle=document.querySelector('.menu-toggle');
function setMenu(open){menu.classList.toggle('open',open);document.body.classList.toggle('menu-open',open);menu.inert=!open;menu.setAttribute('aria-hidden',String(!open));toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'Close':'Menu';document.body.style.overflow=open?'hidden':'';if(open)menu.querySelector('a').focus();else toggle.focus()}
toggle?.addEventListener('click',()=>setMenu(!menu.classList.contains('open')));
menu?.addEventListener('click',e=>{if(e.target.closest('a')){menu.classList.remove('open');document.body.classList.remove('menu-open');menu.inert=true;menu.setAttribute('aria-hidden','true');toggle.setAttribute('aria-expanded','false');toggle.textContent='Menu';document.body.style.overflow=''}});
document.addEventListener('keydown',e=>{if(!menu?.classList.contains('open'))return;if(e.key==='Escape'){e.preventDefault();setMenu(false)}if(e.key==='Tab'){const links=[...menu.querySelectorAll('a'),toggle];let i=links.indexOf(document.activeElement);if(e.shiftKey&&i===0){e.preventDefault();toggle.focus()}else if(!e.shiftKey&&document.activeElement===toggle){e.preventDefault();links[0].focus()}}});
const heroScene=document.querySelector('.hero-scene');if(heroScene&&'IntersectionObserver' in window){new IntersectionObserver(entries=>document.body.classList.toggle('scrolled',!entries[0].isIntersecting),{threshold:0}).observe(heroScene)}





container.addEventListener('error',e=>{if(e.target.tagName!=='IMG')return;const img=e.target;img.hidden=true;const note=document.createElement('small');note.textContent='IMAGE UNAVAILABLE';img.parentElement.append(note)},{capture:true});

