/* Host adapter: pause the unmodified embedded demo outside the viewport. */
(()=>{
 const frame=document.querySelector('.shark-frame');if(!frame)return;
 let visible=false,ready=false,paused=false,autoPaused=false,poll=0;
 function key(){frame.contentWindow.dispatchEvent(new KeyboardEvent('keydown',{key:' ',bubbles:true}))}
 function sync(){if(!ready)return;if(!visible&&!paused){autoPaused=true;key()}else if(visible&&autoPaused&&paused){autoPaused=false;key()}}
 function connect(){clearTimeout(poll);ready=false;paused=false;autoPaused=false;let attempts=0;function check(){try{const w=frame.contentWindow;if(!w?.kanjiSea){if(++attempts<150)poll=setTimeout(check,100);return}if(!w.__portfolioSharkSizeAdjusted){for(const shark of w.kanjiSea.ocean.sharks){const x=shark.nodes[0],y=shark.nodes[1];for(let i=2;i<shark.nodes.length;i+=2){shark.nodes[i]=x+(shark.nodes[i]-x)*.85;shark.nodes[i+1]=y+(shark.nodes[i+1]-y)*.85}shark.L*=.85}w.__portfolioSharkSizeAdjusted=true;if(w.matchMedia('(prefers-reduced-motion: reduce)').matches)w.kanjiSea.painter.render(w.kanjiSea.ocean,0)}w.addEventListener('keydown',e=>{if(e.key===' '){paused=!paused;if(e.isTrusted)autoPaused=false}});ready=true;frame.dataset.hostReady='true';sync()}catch{}}check()}
 frame.addEventListener('load',connect);
 try{if(frame.contentDocument?.readyState==='complete'&&frame.contentWindow.location.href!=='about:blank')connect()}catch{}
 if('IntersectionObserver'in window)new IntersectionObserver(entries=>entries.forEach(e=>{visible=e.isIntersecting;frame.dataset.hostVisible=String(visible);sync()}),{threshold:0}).observe(frame);else{visible=true}
})();
