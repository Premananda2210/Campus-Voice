import{r as s,j as a}from"./index-CdiR0C0d.js";function _(e,t){let o=(t-e)%360;return o>180&&(o-=360),o<-180&&(o+=360),e+o}function E(e){const t=/^#([A-Za-z][\w-]*)$/.exec(e.trim());return t?t[1]:null}const M={cobalt:{name:"Cobalt",accent:"#2233ff",frame:"#8d9cff",colors:["#2f47ff","#1a2cff","#3d63ff","#1e88ff","#27b4f5","#12d0ff","#1fe3c0","#41ef96","#7f93ff","#b5c3ff","#dfe6ff","#0f1fc4","#5a46ff"]},aurora:{name:"Aurora",accent:"#00876a",frame:"#86dcc2",colors:["#00a884","#007a63","#00c49a","#25e0a7","#7ef5c4","#00b3c7","#1f8fff","#a8f0d8","#d9fff1","#00594a","#5be37f","#c6f86a"]},nebula:{name:"Nebula",accent:"#6a22ff",frame:"#c3a8ff",colors:["#6f3cff","#4b1fd6","#8f5bff","#c04dff","#ff4fd2","#ff8ad9","#3d6bff","#b8a4ff","#ead9ff","#2a118f","#ff6f91","#7cd3ff"]},solar:{name:"Solar",accent:"#e23d00",frame:"#ffb48c",colors:["#ff5a1f","#e23d00","#ff7a00","#ffa400","#ffd23f","#ff3d6e","#ff8f6b","#ffe08a","#fff1cc","#b52a00","#ff5fa2","#ffc2a1"]}},q=["cobalt","aurora","nebula","solar"],K='"Poppins","Montserrat","Gilroy","Avenir Next","Century Gothic","Futura",ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif',V='"JetBrains Mono","IBM Plex Mono",ui-monospace,"SF Mono",Menlo,Consolas,monospace',G=[{label:"Mission",href:"#mission"},{label:"Projects",href:"#projects"},{label:"Nights",href:"#nights"},{label:"Join",href:"#join"}];function H({brand:e="ASTRO.",issue:t="#102",links:o=G,cta:c="Join",onCta:l,paletteSwitcher:f=!0,onPaletteChange:g,sticky:y=!0,palette:i="cobalt",defaultTheme:h="system",onThemeChange:x,frame:k=!1,fonts:N,maxWidth:p="1240px",className:m=""}){const n=J(),{pal:d,setPal:w,theme:j,toggleTheme:O}=U(i,h,x),C=typeof i=="string"?i:i.name+i.colors.join(""),T=s.useMemo(()=>{const r=q.map(u=>M[u]);return typeof i=="string"?r:[i,...r]},[C]),F=r=>{w(r),g==null||g(r)},S=s.useRef(null),[Y,A]=s.useState(""),[L,R]=s.useState(!1),P=o.map(r=>r.href).join("|");s.useEffect(()=>{if(typeof IntersectionObserver!="function")return;const r=o.map(b=>E(b.href)?document.getElementById(E(b.href)):null).filter(Boolean);if(!r.length)return;const u=new IntersectionObserver(b=>{for(const z of b)z.isIntersecting&&A("#"+z.target.id)},{rootMargin:"-40% 0px -55% 0px"});return r.forEach(b=>u.observe(b)),()=>u.disconnect()},[P]);const D=r=>u=>{var W;R(!1);const b=E(r),z=b?document.getElementById(b):null;if(!z)return;u.preventDefault();const X=y?((W=S.current)==null?void 0:W.getBoundingClientRect().height)??0:0;window.scrollTo({top:z.getBoundingClientRect().top+window.scrollY-X,behavior:n?"auto":"smooth"}),A(r)},B=(r,u)=>a.jsx("a",{className:"aa-link",href:r.href,"aria-current":Y===r.href?"true":void 0,onClick:D(r.href),children:r.label},u),I=f?a.jsx("div",{className:"aa-swatches",role:"radiogroup","aria-label":"Bubble palette",children:T.map((r,u)=>a.jsx("button",{type:"button",role:"radio","aria-checked":r.name===d.name&&r.accent===d.accent,"aria-label":r.name+" palette",title:r.name,className:"aa-sw",style:{background:"conic-gradient("+[r.colors[1],r.colors[4],r.colors[6],r.colors[1]].join(",")+")"},onClick:()=>F(r)},r.name+u))}):null;return a.jsxs("div",{ref:S,className:"aa-root"+(k?"":" aa-noframe")+(y?" aa-sticky":"")+" "+m,"data-theme":j,style:Z(d,N,p),children:[a.jsx("style",{children:ea}),a.jsx("div",{className:"aa-shell",children:a.jsxs("header",{className:"aa-nav",style:{position:"relative"},children:[a.jsxs("div",{className:"aa-in",children:[a.jsxs("a",{className:"aa-brand",href:"#",onClick:r=>{r.preventDefault(),window.scrollTo({top:0,behavior:n?"auto":"smooth"})},"aria-label":e+" home",children:[a.jsx($,{size:34,follow:!0,reduced:n}),a.jsx("span",{children:e})]}),t&&a.jsx("span",{className:"aa-issue",children:t}),a.jsx("nav",{className:"aa-links","aria-label":"Sections",children:o.map(B)}),a.jsxs("div",{className:"aa-nav-end",children:[I,a.jsx("button",{type:"button",className:"aa-icon",onClick:O,"aria-label":j==="dark"?"Switch to light theme":"Switch to dark theme",children:a.jsx(Q,{dark:j==="dark"})}),c&&a.jsxs("button",{type:"button",className:"aa-btn aa-btn-solid",onClick:l,children:[c,a.jsx(aa,{size:12})]}),o.length>0&&a.jsx("button",{type:"button",className:"aa-icon aa-menu-btn","aria-expanded":L,"aria-label":"Menu",onClick:()=>R(r=>!r),children:a.jsx("svg",{width:"16",height:"16",viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round","aria-hidden":"true",children:L?a.jsx("path",{d:"M3.5 3.5l9 9M12.5 3.5l-9 9"}):a.jsx("path",{d:"M2.5 5h11M2.5 11h11"})})})]})]}),L&&a.jsxs("nav",{className:"aa-mobile","aria-label":"Sections",children:[o.map(B),I]})]})})]})}function J(){const[e,t]=s.useState(!1);return s.useEffect(()=>{var l;if(typeof matchMedia!="function")return;const o=matchMedia("(prefers-reduced-motion: reduce)"),c=()=>t(o.matches);return c(),(l=o.addEventListener)==null||l.call(o,"change",c),()=>{var f;return(f=o.removeEventListener)==null?void 0:f.call(o,"change",c)}},[]),e}function U(e,t,o){const c=typeof e=="string"?M[e]??M.cobalt:e,[l,f]=s.useState(c),g=typeof e=="string"?e:e.name+e.colors.join("");s.useEffect(()=>f(typeof e=="string"?M[e]??M.cobalt:e),[g]);const y=l.colors.length?l.colors:M.cobalt.colors,[i,h]=s.useState(t==="dark"?"dark":"light"),[x,k]=s.useState(!1);return s.useEffect(()=>{var d;if(t!=="system"||x){x||h(t==="dark"?"dark":"light");return}const p=()=>h(document.documentElement.classList.contains("dark")||typeof matchMedia=="function"&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");p();const m=new MutationObserver(p);m.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]});const n=typeof matchMedia=="function"?matchMedia("(prefers-color-scheme: dark)"):null;return(d=n==null?void 0:n.addEventListener)==null||d.call(n,"change",p),()=>{var w;m.disconnect(),(w=n==null?void 0:n.removeEventListener)==null||w.call(n,"change",p)}},[t,x]),{pal:l,setPal:f,colors:y,theme:i,toggleTheme:()=>{const p=i==="dark"?"light":"dark";k(!0),h(p),o==null||o(p)}}}function Z(e,t,o,c){const l=(t==null?void 0:t.display)??K;return{"--aa-max":o,"--aa-accent":e.accent,"--aa-frame":e.frame,"--aa-display":l,"--aa-body":(t==null?void 0:t.body)??l,"--aa-mono":(t==null?void 0:t.mono)??V,...c}}const v={ring:"M14 50a36 36 0 1 0 72 0a36 36 0 1 0-72 0",left:"M34.4 34.4A22 22 0 0 0 34.4 65.6",right:"M65.6 34.4A22 22 0 0 1 65.6 65.6",u:"M43.5 41V53a6.5 6.5 0 0 0 13 0V41",bar:"M50 41V50",slash:"M8 50H86",arrow:"M86 50H98",head:"M85 38L98 50L85 62"};function $({size:e=40,follow:t=!1,reduced:o=!1,gap:c="var(--aa-paper)",className:l="",title:f}){const g=s.useRef(null),y=s.useRef(null);return s.useEffect(()=>{if(!t)return;let i=0,h=-45,x=0,k=0;const N=()=>{i=0;const m=g.current,n=y.current;if(!m||!n)return;const d=m.getBoundingClientRect(),w=d.left+d.width/2,j=d.top+d.height/2;Math.hypot(x-w,k-j)<d.width*.3||(h=_(h,Math.atan2(k-j,x-w)*180/Math.PI),n.style.transform="rotate("+h.toFixed(1)+"deg)")},p=m=>{x=m.clientX,k=m.clientY,i||(i=requestAnimationFrame(N))};return addEventListener("pointermove",p,{passive:!0}),()=>{removeEventListener("pointermove",p),cancelAnimationFrame(i)}},[t]),a.jsxs("svg",{ref:g,className:"aa-logo "+l,width:e,height:e,viewBox:"0 0 100 100",fill:"none",stroke:"currentColor",strokeLinecap:"round",role:f?"img":void 0,"aria-label":f,"aria-hidden":f?void 0:!0,children:[a.jsxs("g",{className:"aa-logo-spin",children:[a.jsx("path",{d:v.ring,strokeWidth:"9"}),a.jsx("path",{d:v.left,strokeWidth:"6.5"}),a.jsx("path",{d:v.right,strokeWidth:"6.5"}),a.jsx("path",{d:v.u,strokeWidth:"6.5"}),a.jsx("path",{d:v.bar,strokeWidth:"5"})]}),a.jsxs("g",{ref:y,className:"aa-logo-arrow",style:{transform:"rotate(-45deg)",transition:o?"none":void 0},children:[a.jsx("path",{d:v.slash,strokeWidth:"5",stroke:c,strokeLinecap:"butt",style:{transform:"translate(0,8px)"}}),a.jsx("path",{d:v.arrow,strokeWidth:"8"}),a.jsx("path",{d:v.head,strokeWidth:"7",strokeLinejoin:"round"})]})]})}function Q({dark:e}){return e?a.jsxs("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round","aria-hidden":"true",children:[a.jsx("circle",{cx:"12",cy:"12",r:"4.2"}),a.jsx("path",{d:"M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8L6 18M18 6l1.8-1.8"})]}):a.jsx("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:a.jsx("path",{d:"M20.5 14.6A8.5 8.5 0 0 1 9.4 3.5a8.5 8.5 0 1 0 11.1 11.1z"})})}function aa({size:e=14}){return a.jsx("svg",{className:"aa-arr",width:e,height:e,viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:a.jsx("path",{d:"M3 8h10M9 4l4 4-4 4"})})}const ea=`
.aa-root{--aa-accent:#2233ff;--aa-frame:#8d9cff;--aa-paper:#ffffff;--aa-ink:#0b0c16;--aa-soft:#2b2e45;--aa-muted:#6b7090;--aa-card:#f5f6ff;--aa-moon:#e6e9ff;--aa-blue:var(--aa-accent);--aa-line:color-mix(in srgb,var(--aa-accent) 16%,transparent);--aa-line-strong:color-mix(in srgb,var(--aa-accent) 34%,transparent);--aa-display:"Poppins",sans-serif;--aa-body:var(--aa-display);--aa-mono:ui-monospace,monospace;position:relative;width:100%;box-sizing:border-box;background:var(--aa-paper);color:var(--aa-ink);font-family:var(--aa-body);font-size:15px;line-height:1.5;-webkit-font-smoothing:antialiased;border:clamp(6px,1.1vw,12px) solid var(--aa-frame);transition:background-color .45s ease,color .45s ease,border-color .45s ease;overflow:clip}
.aa-root[data-theme="dark"]{--aa-paper:#060821;--aa-ink:#f2f4ff;--aa-soft:#c8cdf2;--aa-muted:#8a90bd;--aa-card:#0c1033;--aa-moon:#1a1f4d;--aa-blue:color-mix(in srgb,var(--aa-accent) 52%,#ffffff);--aa-line:color-mix(in srgb,var(--aa-blue) 18%,transparent);--aa-line-strong:color-mix(in srgb,var(--aa-blue) 36%,transparent);border-color:color-mix(in srgb,var(--aa-frame) 45%,#060821)}
.aa-root :where(*){box-sizing:border-box}
.aa-root ::selection{background:var(--aa-blue);color:var(--aa-paper)}
.aa-root :focus-visible{outline:2px solid var(--aa-blue);outline-offset:3px}
.aa-root :where(button){font:inherit;color:inherit;background:none;border:0;padding:0;margin:0;cursor:pointer;text-align:inherit;letter-spacing:inherit}
.aa-root :where(a){color:inherit;text-decoration:none}
.aa-root :where(svg){display:block;max-width:none;flex:none}
.aa-root :where(canvas){display:block;max-width:none}
.aa-root :where(h1,h2,h3,h4,p,ul,ol,li,dl,dd,figure){margin:0;padding:0;font-size:inherit;font-weight:inherit;list-style:none}
.aa-root :where(input){font:inherit;color:inherit;margin:0}
.aa-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.aa-shell{width:100%;container-type:inline-size;position:relative}
.aa-in{width:100%;max-width:var(--aa-max,1240px);margin:0 auto;padding:0 clamp(16px,4cqi,48px)}
.aa-disp{font-family:var(--aa-display);font-weight:800;letter-spacing:-.02em;line-height:.86;text-transform:none}
.aa-mono{font-family:var(--aa-mono);font-size:11px;letter-spacing:.06em;text-transform:uppercase}
.aa-label{font-family:var(--aa-display);font-weight:800;font-size:11px;letter-spacing:.04em;text-transform:uppercase;color:var(--aa-blue)}
.aa-echo{display:inline-block;white-space:nowrap}
.aa-title{display:flex;flex-direction:column;font-family:var(--aa-display);font-weight:800;letter-spacing:-.01em;line-height:.9;text-transform:none}
.aa-title>span:last-child{padding-bottom:.42em}
.aa-noframe{border:0}
.aa-sticky{position:sticky;top:0;z-index:40;overflow:visible}
.aa-btn{position:relative;display:inline-flex;align-items:center;justify-content:center;gap:9px;padding:13px 20px;border-radius:999px;font-family:var(--aa-display);font-weight:800;font-size:13px;letter-spacing:.03em;text-transform:uppercase;line-height:1;white-space:nowrap;transition:background-color .2s,color .2s,box-shadow .25s,transform .25s cubic-bezier(.2,.8,.2,1)}
.aa-btn-solid{background:var(--aa-blue);color:var(--aa-paper);box-shadow:0 10px 24px -14px var(--aa-blue)}
.aa-btn-solid:hover{transform:translateY(-2px);box-shadow:0 16px 30px -14px var(--aa-blue)}
.aa-btn-line{color:var(--aa-blue);box-shadow:inset 0 0 0 2px var(--aa-blue)}
.aa-btn-line:hover{background:var(--aa-blue);color:var(--aa-paper)}
.aa-btn-ink{background:var(--aa-ink);color:var(--aa-paper)}
.aa-btn-ink:hover{transform:translateY(-2px)}
.aa-btn:active{transform:scale(.97)}
.aa-btn[disabled]{opacity:.55;cursor:default;transform:none}
.aa-btn .aa-arr{transition:transform .25s cubic-bezier(.2,.8,.2,1)}
.aa-btn:hover .aa-arr{transform:translateX(3px)}
.aa-nav .aa-btn{padding:11px 16px;font-size:12px}
.aa-bub{position:absolute;inset:0}
.aa-bub canvas{position:absolute;left:0;top:0;width:100%;height:100%}
.aa-ast{display:inline-grid;place-items:center;color:var(--aa-blue);transition:transform .8s cubic-bezier(.2,.8,.2,1)}
.aa-ast:hover{transform:rotate(60deg) scale(1.15)}
.aa-logo{overflow:visible}
.aa-logo-arrow{transform-box:view-box;transform-origin:50px 50px;transition:transform .6s cubic-bezier(.2,.8,.2,1)}
.aa-logo-spin{transform-box:view-box;transform-origin:50px 50px;transition:transform .9s cubic-bezier(.2,.8,.2,1)}
.aa-brand:hover .aa-logo-spin{transform:rotate(-360deg)}
.aa-sec{position:relative;scroll-margin-top:62px}
.aa-pad{padding:clamp(48px,8cqi,104px) 0}
.aa-reveal{opacity:0;transform:translateY(22px);transition:opacity .9s cubic-bezier(.2,.7,.2,1),transform .9s cubic-bezier(.2,.7,.2,1)}
.aa-reveal[data-in="true"]{opacity:1;transform:none}
.aa-kicker{display:flex;flex-direction:column;align-items:center;gap:14px;padding:clamp(18px,3cqi,30px) 0 clamp(26px,4cqi,44px)}
.aa-kicker .aa-label{font-size:clamp(12px,1.3cqi,15px)}
.aa-meta{display:flex;flex-wrap:wrap;justify-content:space-between;gap:8px 20px;padding:10px 0;border-top:1px solid var(--aa-line-strong)}
.aa-meta span{font-size:10px}
.aa-h2{font-family:var(--aa-display);font-weight:800;font-size:clamp(30px,5cqi,62px);line-height:.98;letter-spacing:-.03em}
.aa-lede{font-size:clamp(15px,1.5cqi,17px);color:var(--aa-soft);line-height:1.65;max-width:56ch}
.aa-mission{display:grid;gap:clamp(28px,5cqi,64px);padding-top:clamp(32px,5cqi,64px)}
.aa-stats{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0;border-top:1.5px solid var(--aa-ink)}
.aa-stat{padding:18px 4px 18px 0;border-bottom:1px solid var(--aa-line-strong)}
.aa-stat dt{font-family:var(--aa-display);font-weight:800;font-size:clamp(32px,4.6cqi,56px);line-height:1;letter-spacing:-.03em;color:var(--aa-blue);font-variant-numeric:tabular-nums}
.aa-stat dd{margin-top:6px}
@container (min-width:860px){.aa-mission{grid-template-columns:1.1fr 1fr;align-items:start}}
.aa-orbits{position:absolute;inset:0;pointer-events:none;color:var(--aa-line-strong)}
.aa-orbits svg{position:absolute}
.aa-orbit-spin{transform-box:view-box;transform-origin:50% 50%;animation:aa-spin 60s linear infinite}
.aa-orbit-spin-r{animation-duration:90s;animation-direction:reverse}
.aa-nav{position:sticky;top:0;z-index:40;background:color-mix(in srgb,var(--aa-paper) 84%,transparent);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid var(--aa-line);transition:background-color .45s,border-color .45s}
.aa-nav .aa-in{display:flex;align-items:center;gap:14px;height:62px}
.aa-brand{display:inline-flex;align-items:center;gap:10px;font-family:var(--aa-display);font-weight:800;font-size:17px;letter-spacing:-.01em;white-space:nowrap}
.aa-issue{display:none;padding:3px 7px;border:1.5px solid currentColor;border-radius:999px;font-family:var(--aa-display);font-weight:800;font-size:11px;color:var(--aa-blue)}
.aa-links{display:none;align-items:center;gap:2px;margin:0 auto}
.aa-link{position:relative;padding:8px 12px;font-family:var(--aa-display);font-weight:700;font-size:13px;letter-spacing:.02em;text-transform:uppercase;color:var(--aa-soft);transition:color .2s}
.aa-link::after{content:"";position:absolute;left:12px;right:12px;bottom:3px;height:2px;border-radius:2px;background:var(--aa-blue);transform:scaleX(0);transform-origin:left;transition:transform .35s cubic-bezier(.2,.8,.2,1)}
.aa-link:hover,.aa-link[aria-current="true"]{color:var(--aa-blue)}
.aa-link[aria-current="true"]::after,.aa-link:hover::after{transform:scaleX(1)}
.aa-nav-end{display:flex;align-items:center;gap:8px;margin-left:auto}
.aa-swatches{display:none;align-items:center;gap:5px;padding:4px;border:1px solid var(--aa-line);border-radius:999px}
.aa-sw{position:relative;width:18px;height:18px;border-radius:999px;transition:transform .25s cubic-bezier(.2,.8,.2,1)}
.aa-sw:hover{transform:scale(1.15)}
.aa-sw[aria-checked="true"]{box-shadow:0 0 0 2px var(--aa-paper),0 0 0 3.5px var(--aa-ink)}
.aa-icon{display:inline-grid;place-items:center;width:36px;height:36px;border-radius:999px;color:var(--aa-soft);border:1px solid var(--aa-line);transition:color .2s,border-color .2s,transform .3s}
.aa-icon:hover{color:var(--aa-blue);border-color:var(--aa-blue)}
.aa-menu-btn{display:inline-grid}
.aa-mobile{position:absolute;left:0;right:0;top:100%;display:grid;gap:2px;padding:10px clamp(16px,4cqi,48px) 16px;background:var(--aa-paper);border-bottom:1px solid var(--aa-line);animation:aa-drop .3s cubic-bezier(.2,.8,.2,1) both}
.aa-mobile .aa-link{padding:12px 0;font-size:16px}
.aa-mobile .aa-link::after{left:0;right:auto;width:28px}
.aa-mobile .aa-swatches{display:inline-flex;justify-self:start;margin-top:8px}
@container (min-width:860px){.aa-links{display:flex}.aa-menu-btn{display:none}.aa-mobile{display:none}.aa-nav-end{margin-left:0}.aa-issue{display:inline-block}.aa-nav-end .aa-swatches{display:inline-flex}}
@keyframes aa-spin{to{transform:rotate(360deg)}}
@keyframes aa-marq{to{transform:translateX(-50%)}}
@keyframes aa-blink{0%,100%{opacity:1}50%{opacity:.25}}
@keyframes aa-drop{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}
@keyframes aa-rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
@keyframes aa-print{0%{transform:translateY(16px) scale(.96);filter:brightness(1.6)}100%{transform:none;filter:none}}
@media (prefers-reduced-motion:reduce){
.aa-root,.aa-root :where(*){scroll-behavior:auto}
.aa-reveal{opacity:1;transform:none;transition:none}
.aa-marq,.aa-orbit-spin,.aa-pop-dot,.aa-chip i,.aa-event,.aa-printed,.aa-mobile{animation:none}
.aa-logo-arrow,.aa-logo-spin,.aa-rib,.aa-card,.aa-card-fill,.aa-member,.aa-ast,.aa-bar i,.aa-more{transition:none}
}
`;function ta(){return a.jsxs("div",{className:"w-full",style:{background:"#060821"},children:[a.jsx(H,{defaultTheme:"dark"}),["mission","projects","nights","join"].map((e,t)=>a.jsx("section",{id:e,style:{height:460,margin:"18px clamp(12px,3vw,40px)",display:"grid",placeItems:"center",borderRadius:26,background:"radial-gradient(circle at "+(20+t*22)+"% 40%, #41ef96 0 34px, transparent 35px), radial-gradient(circle at "+(70-t*12)+"% 62%, #12d0ff 0 52px, transparent 53px), radial-gradient(circle at "+(45+t*8)+"% 20%, #b5c3ff 0 22px, transparent 23px), #2f47ff",color:"#ffffff",fontFamily:"Poppins, ui-sans-serif, system-ui, sans-serif",fontWeight:800,fontSize:"clamp(40px,9vw,120px)",letterSpacing:"-.03em",textTransform:"uppercase"},children:e},e))]})}export{ta as default};
