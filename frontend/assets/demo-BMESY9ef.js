import{r as l,j as a}from"./index-CdiR0C0d.js";function A(r,e,t){return Math.min(t,Math.max(e,r))}function O(r){let e=r>>>0;return()=>{e=e+1831565813>>>0;let t=e;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}}function P(r,e,t=34,c=46){const i=O(r),n=[];for(let p=0;p<t;p++){const f=Math.round(6+(c-6)*Math.pow(i(),1.8)),m=Math.round(i()*100),h=Math.round(i()*100),u=e[1+Math.floor(i()*Math.max(1,e.length-1))]??e[0];n.push("radial-gradient(circle at "+m+"% "+h+"%, "+u+" 0 "+f+"px, transparent "+(f+.6)+"px)")}return n.reverse().join(", ")+", "+(e[0]??"#2b3bff")}function S(r,e){let t=(e-r)%360;return t>180&&(t-=360),t<-180&&(t+=360),r+t}const M={cobalt:{name:"Cobalt",accent:"#2233ff",frame:"#8d9cff",colors:["#2f47ff","#1a2cff","#3d63ff","#1e88ff","#27b4f5","#12d0ff","#1fe3c0","#41ef96","#7f93ff","#b5c3ff","#dfe6ff","#0f1fc4","#5a46ff"]},aurora:{name:"Aurora",accent:"#00876a",frame:"#86dcc2",colors:["#00a884","#007a63","#00c49a","#25e0a7","#7ef5c4","#00b3c7","#1f8fff","#a8f0d8","#d9fff1","#00594a","#5be37f","#c6f86a"]},nebula:{name:"Nebula",accent:"#6a22ff",frame:"#c3a8ff",colors:["#6f3cff","#4b1fd6","#8f5bff","#c04dff","#ff4fd2","#ff8ad9","#3d6bff","#b8a4ff","#ead9ff","#2a118f","#ff6f91","#7cd3ff"]},solar:{name:"Solar",accent:"#e23d00",frame:"#ffb48c",colors:["#ff5a1f","#e23d00","#ff7a00","#ffa400","#ffd23f","#ff3d6e","#ff8f6b","#ffe08a","#fff1cc","#b52a00","#ff5fa2","#ffc2a1"]}},F='"Poppins","Montserrat","Gilroy","Avenir Next","Century Gothic","Futura",ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif',I='"JetBrains Mono","IBM Plex Mono",ui-monospace,"SF Mono",Menlo,Consolas,monospace',W=[{code:"#099",title:"Dark-Sky Census",summary:"Members measure how bright the night is above their own street.",detail:"A pocket meter, a free app and ten minutes after midnight. Every reading lands on a public map that city planners and lighting engineers use to argue for darker streets.",status:"ongoing",progress:.74,goal:"7,412 of 10,000 readings",cta:"Log a reading"},{code:"#100",title:"Lunar Sketchbook",summary:"One crater a night, drawn by hand at the eyepiece.",detail:"Two hundred and twelve pencil drawings of the terminator, bound into a printed atlas. The book is sold out; the scans are free to download from the archive.",status:"archived",progress:1,goal:"212 drawings published",cta:"Browse the atlas"},{code:"#101",title:"Meteor Radio Watch",summary:"Listening for meteors through the clouds with home-built receivers.",detail:"Fourteen stations count forward-scatter echoes from a distant broadcast transmitter, day and night, rain or shine. Build kits are lent out from the club library.",status:"ongoing",progress:.42,goal:"6 of 14 stations online this month",cta:"Borrow a kit"},{code:"#102",title:"All Can Be Found",summary:"The daily design project: one object, one poster, every day.",detail:"Pitch a planet, a nebula or a lost probe. Each day a member designs its poster, and every poster ships with the coordinates to find the real thing in the sky.",status:"open",progress:.1,goal:"Open call — 102 posters so far",cta:"Pitch an object"}];function B({heading:r="Projects, numbered like issues.",projects:e=W,onContribute:t,seed:c=102,id:i="projects",palette:n="cobalt",defaultTheme:p="system",onThemeChange:f,frame:m=!0,fonts:h,maxWidth:u="1240px",className:w=""}){const j="aa"+l.useId().replace(/[^a-zA-Z0-9]/g,""),{pal:d,colors:x,theme:s}=q(n,p,f),[g,k]=l.useState(-1),z=o=>P(c*31+o*7,x,30,52),N=o=>{const b=o.currentTarget,v=b.getBoundingClientRect();b.style.setProperty("--px",((o.clientX-v.left)/v.width*100).toFixed(1)+"%"),b.style.setProperty("--py",((o.clientY-v.top)/v.height*100).toFixed(1)+"%")},[E,L]=C(.1);return a.jsxs("div",{className:"aa-root"+(m?"":" aa-noframe")+" "+w,"data-theme":s,style:R(d,h,u),children:[a.jsx("style",{children:D}),a.jsx("div",{className:"aa-shell",children:a.jsx("section",{className:"aa-sec aa-pad",id:i||void 0,children:a.jsxs("div",{className:"aa-in aa-reveal",ref:E,"data-in":L,children:[a.jsxs("div",{className:"aa-proj-head",children:[a.jsx("h2",{className:"aa-h2",style:{maxWidth:"16ch"},children:r}),a.jsxs("span",{className:"aa-label",children:[e.length," projects · ",e.filter(o=>o.status!=="archived").length," active"]})]}),a.jsx("div",{className:"aa-proj-grid",children:e.map((o,b)=>{const v=g===b;return a.jsxs("article",{className:"aa-card","data-open":v,children:[a.jsxs("div",{className:"aa-card-top",onPointerMove:N,onPointerEnter:N,children:[a.jsx("div",{className:"aa-card-fill",style:{background:z(b)}}),a.jsx("span",{className:"aa-card-code",children:o.code}),a.jsx(Y,{size:44})]}),a.jsxs("div",{className:"aa-card-body",children:[a.jsxs("span",{className:"aa-chip","data-s":o.status,children:[a.jsx("i",{}),o.status==="open"?"Open call":o.status==="ongoing"?"Ongoing":"Archived"]}),a.jsx("h3",{children:o.title}),a.jsx("p",{children:o.summary}),typeof o.progress=="number"&&a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:6},children:[a.jsx("div",{className:"aa-bar",role:"progressbar","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":Math.round(A(o.progress,0,1)*100),"aria-label":o.title+" progress",children:a.jsx("i",{style:{transform:"scaleX("+(L?A(o.progress,0,1):0)+")"}})}),o.goal&&a.jsx("span",{className:"aa-mono",style:{color:"var(--aa-muted)"},children:o.goal})]}),a.jsx("div",{className:"aa-more",id:j+"-p"+b,children:a.jsx("div",{children:a.jsxs("div",{className:"aa-more-in",children:[a.jsx("p",{children:o.detail}),o.cta&&a.jsxs("button",{type:"button",className:"aa-btn aa-btn-ink",style:{alignSelf:"flex-start"},onClick:()=>t==null?void 0:t(o),tabIndex:v?0:-1,children:[o.cta,a.jsx(T,{})]})]})})}),a.jsx("div",{className:"aa-card-foot",children:a.jsxs("button",{type:"button",className:"aa-toggle","aria-expanded":v,"aria-controls":j+"-p"+b,onClick:()=>k(v?-1:b),children:[a.jsx(V,{}),v?"Close dossier":"Open dossier"]})})]})]},o.code+b)})})]})})})]})}function C(r=.2){const e=l.useRef(null),[t,c]=l.useState(!1);return l.useEffect(()=>{const i=e.current;if(!i||t)return;if(typeof IntersectionObserver!="function"){c(!0);return}const n=new IntersectionObserver(p=>{p.some(f=>f.isIntersecting)&&(c(!0),n.disconnect())},{threshold:r});return n.observe(i),()=>n.disconnect()},[t,r]),[e,t]}function q(r,e,t){const c=typeof r=="string"?M[r]??M.cobalt:r,[i,n]=l.useState(c),p=typeof r=="string"?r:r.name+r.colors.join("");l.useEffect(()=>n(typeof r=="string"?M[r]??M.cobalt:r),[p]);const f=i.colors.length?i.colors:M.cobalt.colors,[m,h]=l.useState(e==="dark"?"dark":"light"),[u,w]=l.useState(!1);return l.useEffect(()=>{var g;if(e!=="system"||u){u||h(e==="dark"?"dark":"light");return}const d=()=>h(document.documentElement.classList.contains("dark")||typeof matchMedia=="function"&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");d();const x=new MutationObserver(d);x.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]});const s=typeof matchMedia=="function"?matchMedia("(prefers-color-scheme: dark)"):null;return(g=s==null?void 0:s.addEventListener)==null||g.call(s,"change",d),()=>{var k;x.disconnect(),(k=s==null?void 0:s.removeEventListener)==null||k.call(s,"change",d)}},[e,u]),{pal:i,setPal:n,colors:f,theme:m,toggleTheme:()=>{const d=m==="dark"?"light":"dark";w(!0),h(d),t==null||t(d)}}}function R(r,e,t,c){const i=(e==null?void 0:e.display)??F;return{"--aa-max":t,"--aa-accent":r.accent,"--aa-frame":r.frame,"--aa-display":i,"--aa-body":(e==null?void 0:e.body)??i,"--aa-mono":(e==null?void 0:e.mono)??I,...c}}const y={ring:"M14 50a36 36 0 1 0 72 0a36 36 0 1 0-72 0",left:"M34.4 34.4A22 22 0 0 0 34.4 65.6",right:"M65.6 34.4A22 22 0 0 1 65.6 65.6",u:"M43.5 41V53a6.5 6.5 0 0 0 13 0V41",bar:"M50 41V50",slash:"M8 50H86",arrow:"M86 50H98",head:"M85 38L98 50L85 62"};function Y({size:r=40,follow:e=!1,reduced:t=!1,gap:c="var(--aa-paper)",className:i="",title:n}){const p=l.useRef(null),f=l.useRef(null);return l.useEffect(()=>{if(!e)return;let m=0,h=-45,u=0,w=0;const j=()=>{m=0;const x=p.current,s=f.current;if(!x||!s)return;const g=x.getBoundingClientRect(),k=g.left+g.width/2,z=g.top+g.height/2;Math.hypot(u-k,w-z)<g.width*.3||(h=S(h,Math.atan2(w-z,u-k)*180/Math.PI),s.style.transform="rotate("+h.toFixed(1)+"deg)")},d=x=>{u=x.clientX,w=x.clientY,m||(m=requestAnimationFrame(j))};return addEventListener("pointermove",d,{passive:!0}),()=>{removeEventListener("pointermove",d),cancelAnimationFrame(m)}},[e]),a.jsxs("svg",{ref:p,className:"aa-logo "+i,width:r,height:r,viewBox:"0 0 100 100",fill:"none",stroke:"currentColor",strokeLinecap:"round",role:n?"img":void 0,"aria-label":n,"aria-hidden":n?void 0:!0,children:[a.jsxs("g",{className:"aa-logo-spin",children:[a.jsx("path",{d:y.ring,strokeWidth:"9"}),a.jsx("path",{d:y.left,strokeWidth:"6.5"}),a.jsx("path",{d:y.right,strokeWidth:"6.5"}),a.jsx("path",{d:y.u,strokeWidth:"6.5"}),a.jsx("path",{d:y.bar,strokeWidth:"5"})]}),a.jsxs("g",{ref:f,className:"aa-logo-arrow",style:{transform:"rotate(-45deg)",transition:t?"none":void 0},children:[a.jsx("path",{d:y.slash,strokeWidth:"5",stroke:c,strokeLinecap:"butt",style:{transform:"translate(0,8px)"}}),a.jsx("path",{d:y.arrow,strokeWidth:"8"}),a.jsx("path",{d:y.head,strokeWidth:"7",strokeLinejoin:"round"})]})]})}function T({size:r=14}){return a.jsx("svg",{className:"aa-arr",width:r,height:r,viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:a.jsx("path",{d:"M3 8h10M9 4l4 4-4 4"})})}function V(){return a.jsx("svg",{width:"14",height:"14",viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:"2.4",strokeLinecap:"round","aria-hidden":"true",children:a.jsx("path",{d:"M8 2.5v11M2.5 8h11"})})}const D=`
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
.aa-proj-head{display:flex;flex-wrap:wrap;align-items:end;justify-content:space-between;gap:16px;margin-bottom:clamp(22px,3.4cqi,40px)}
.aa-proj-grid{display:grid;gap:14px}
@container (min-width:760px){.aa-proj-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.aa-stage-foot{grid-template-columns:1fr auto}}
.aa-card{position:relative;display:flex;flex-direction:column;border:1.5px solid var(--aa-line-strong);border-radius:22px;background:var(--aa-paper);overflow:hidden;transition:border-color .3s,transform .4s cubic-bezier(.2,.8,.2,1),box-shadow .4s}
.aa-card:hover{border-color:var(--aa-blue);transform:translateY(-3px);box-shadow:0 24px 50px -32px var(--aa-blue)}
.aa-card-top{position:relative;height:clamp(118px,15cqi,168px);overflow:hidden;--px:50%;--py:50%}
.aa-card-fill{position:absolute;inset:0;clip-path:circle(0% at var(--px) var(--py));transition:clip-path .8s cubic-bezier(.2,.8,.2,1)}
.aa-card:hover .aa-card-fill,.aa-card[data-open="true"] .aa-card-fill{clip-path:circle(150% at var(--px) var(--py))}
.aa-card-code{position:absolute;left:18px;bottom:6px;font-family:var(--aa-display);font-weight:800;font-size:clamp(54px,8cqi,96px);line-height:.9;letter-spacing:-.04em;color:var(--aa-blue);transition:color .5s}
.aa-card:hover .aa-card-code,.aa-card[data-open="true"] .aa-card-code{color:#ffffff}
.aa-card-top .aa-logo{position:absolute;right:16px;top:14px;width:44px;height:auto;color:var(--aa-blue);transition:color .5s}
.aa-card:hover .aa-card-top .aa-logo,.aa-card[data-open="true"] .aa-card-top .aa-logo{color:#ffffff}
.aa-card-body{display:flex;flex-direction:column;gap:10px;padding:18px 20px 20px}
.aa-chip{display:inline-flex;align-items:center;gap:6px;align-self:flex-start;padding:4px 10px;border-radius:999px;font-family:var(--aa-display);font-weight:800;font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;border:1.5px solid currentColor;color:var(--aa-blue)}
.aa-chip i{width:6px;height:6px;border-radius:9px;background:currentColor}
.aa-chip[data-s="ongoing"] i{animation:aa-blink 1.6s ease-in-out infinite}
.aa-chip[data-s="archived"]{color:var(--aa-muted)}
.aa-card h3{font-family:var(--aa-display);font-weight:800;font-size:clamp(20px,2.3cqi,26px);line-height:1.1;letter-spacing:-.02em}
.aa-card p{color:var(--aa-soft);font-size:14.5px}
.aa-bar{height:8px;border-radius:9px;background:var(--aa-line);overflow:hidden}
.aa-bar i{display:block;height:100%;border-radius:9px;background:var(--aa-blue);transform-origin:left;transition:transform 1.4s cubic-bezier(.2,.8,.2,1)}
.aa-more{display:grid;grid-template-rows:0fr;transition:grid-template-rows .5s cubic-bezier(.2,.8,.2,1)}
.aa-card[data-open="true"] .aa-more{grid-template-rows:1fr}
.aa-more>div{overflow:hidden}
.aa-more-in{display:flex;flex-direction:column;gap:14px;padding-top:6px}
.aa-card-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-top:4px}
.aa-toggle{display:inline-flex;align-items:center;gap:8px;font-family:var(--aa-display);font-weight:800;font-size:12px;letter-spacing:.04em;text-transform:uppercase;color:var(--aa-blue)}
.aa-toggle svg{transition:transform .4s cubic-bezier(.2,.8,.2,1)}
.aa-toggle[aria-expanded="true"] svg{transform:rotate(45deg)}
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
`;function _(){return a.jsx("div",{className:"w-full",children:a.jsx(B,{defaultTheme:"dark"})})}export{_ as default};
