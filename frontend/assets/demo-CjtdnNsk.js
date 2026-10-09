import{r as l,j as a}from"./index-CdiR0C0d.js";function ia(t){let r=t>>>0;return()=>{r=r+1831565813>>>0;let e=r;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function W(t){let r=2166136261;for(let e=0;e<t.length;e++)r^=t.charCodeAt(e),r=Math.imul(r,16777619);return r>>>0}function T(t){return/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t.trim())}function na(t){return t.split(/\n|\\n/).filter(r=>r.length>0)}function oa(t,r,e=34,i=46){const n=ia(t),s=[];for(let c=0;c<e;c++){const m=Math.round(6+(i-6)*Math.pow(n(),1.8)),f=Math.round(n()*100),u=Math.round(n()*100),g=r[1+Math.floor(n()*Math.max(1,r.length-1))]??r[0];s.push("radial-gradient(circle at "+f+"% "+u+"%, "+g+" 0 "+m+"px, transparent "+(m+.6)+"px)")}return s.reverse().join(", ")+", "+(r[0]??"#2b3bff")}function sa(t,r){return"#"+String(100+W(t.trim().toLowerCase()+"|"+r.trim().toLowerCase())%9900).padStart(4,"0")}function la(t){return t.trim().split(/\s+/)[0]??""}function ca(t,r){let e=(r-t)%360;return e>180&&(e-=360),e<-180&&(e+=360),t+e}const P={cobalt:{name:"Cobalt",accent:"#2233ff",frame:"#8d9cff",colors:["#2f47ff","#1a2cff","#3d63ff","#1e88ff","#27b4f5","#12d0ff","#1fe3c0","#41ef96","#7f93ff","#b5c3ff","#dfe6ff","#0f1fc4","#5a46ff"]},aurora:{name:"Aurora",accent:"#00876a",frame:"#86dcc2",colors:["#00a884","#007a63","#00c49a","#25e0a7","#7ef5c4","#00b3c7","#1f8fff","#a8f0d8","#d9fff1","#00594a","#5be37f","#c6f86a"]},nebula:{name:"Nebula",accent:"#6a22ff",frame:"#c3a8ff",colors:["#6f3cff","#4b1fd6","#8f5bff","#c04dff","#ff4fd2","#ff8ad9","#3d6bff","#b8a4ff","#ead9ff","#2a118f","#ff6f91","#7cd3ff"]},solar:{name:"Solar",accent:"#e23d00",frame:"#ffb48c",colors:["#ff5a1f","#e23d00","#ff7a00","#ffa400","#ffd23f","#ff3d6e","#ff8f6b","#ffe08a","#fff1cc","#b52a00","#ff5fa2","#ffc2a1"]}},pa='"Poppins","Montserrat","Gilroy","Avenir Next","Century Gothic","Futura",ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif',da='"JetBrains Mono","IBM Plex Mono",ui-monospace,"SF Mono",Menlo,Consolas,monospace',ma=[{name:"Stargazer",price:"Free",blurb:"For the curious.",perks:["Monthly sky notes","Public star parties","Members' forum"]},{name:"Observer",price:"€6",period:"/mo",blurb:"For regulars at the eyepiece.",perks:["Everything in Stargazer","Telescope lending library","Dark-site trips","Project #102 access"],featured:!0},{name:"Patron",price:"€18",period:"/mo",blurb:"Keeps the domes open.",perks:["Everything in Observer","Your name on the dome wall","Astrophoto workshops","Two guest passes"]}];function fa({tag:t="Membership",title:r="Get your card. Find everything.",body:e="Pick a tier, type your name and watch your card print. You can change tiers any time.",tiers:i=ma,namePlaceholder:n="Your name",emailPlaceholder:s="you@domain.com",button:c="Print my card",success:m="Welcome aboard, {name}. Your card is in your inbox.",onJoin:f,cardTitle:u=`ASTRO.
ASSOCiATION`,ribbonText:g="astro. association",seed:N=102,id:L="join",palette:x="cobalt",defaultTheme:v="system",onThemeChange:d,frame:y=!0,fonts:M,maxWidth:A="1240px",className:V=""}){const R="aa"+l.useId().replace(/[^a-zA-Z0-9]/g,""),B=ua(),{pal:X,colors:_,theme:G}=ba(x,v,d),K=Math.max(0,i.findIndex(o=>o.featured)),[S,F]=l.useState(K),[w,H]=l.useState(""),[q,U]=l.useState(""),[k,z]=l.useState("idle"),[Z,E]=l.useState(""),[O,$]=l.useState(0),Y=sa(w||"guest",q),b=i[S]??i[0],J=async o=>{if(o.preventDefault(),k!=="loading"){if(!w.trim()){z("error"),E("Your card needs a name.");return}if(!T(q)){z("error"),E("That email doesn't look right.");return}z("loading"),E("Printing your card…");try{const h={name:w.trim(),email:q.trim(),tier:(b==null?void 0:b.name)??"",number:Y};f?await f(h):await new Promise(p=>setTimeout(p,900)),z("done"),E(m.replace("{name}",la(w))),$(p=>p+1)}catch{z("error"),E("Something went wrong. Try again in a moment.")}}},I=l.useRef(null),Q=o=>{const h=I.current;if(!h||B)return;const p=h.getBoundingClientRect(),C=(o.clientX-p.left)/p.width-.5,ta=(o.clientY-p.top)/p.height-.5;h.style.setProperty("--rx",(C*16).toFixed(2)+"deg"),h.style.setProperty("--ry",(-ta*12).toFixed(2)+"deg"),h.style.setProperty("--sx",((1-(C+.5))*100).toFixed(1)+"%")},aa=()=>{const o=I.current;o&&(o.style.setProperty("--rx","0deg"),o.style.setProperty("--ry","0deg"),o.style.setProperty("--sx","100%"))},[ea,ra]=xa(.12);return a.jsxs("div",{className:"aa-root"+(y?"":" aa-noframe")+" "+V,"data-theme":G,style:ha(X,M,A),children:[a.jsx("style",{children:ka}),a.jsx("div",{className:"aa-shell",children:a.jsx("section",{className:"aa-sec aa-pad",id:L||void 0,children:a.jsxs("div",{className:"aa-in aa-reveal",ref:ea,"data-in":ra,children:[a.jsxs("div",{className:"aa-meta",children:[a.jsx("span",{className:"aa-label",children:t}),a.jsxs("span",{className:"aa-label",children:["Member ",Y]}),a.jsx("span",{className:"aa-label",children:b==null?void 0:b.name})]}),a.jsxs("div",{className:"aa-join",children:[a.jsxs("div",{children:[a.jsx("h2",{className:"aa-h2",style:{marginTop:"clamp(18px,3cqi,30px)"},children:r}),a.jsx("p",{className:"aa-lede",style:{margin:"16px 0 22px"},children:e}),a.jsx("div",{className:"aa-tiers",role:"radiogroup","aria-label":"Membership tier",children:i.map((o,h)=>a.jsxs("button",{type:"button",role:"radio","aria-checked":S===h,className:"aa-tier",onClick:()=>F(h),onKeyDown:p=>{p.key==="ArrowRight"||p.key==="ArrowDown"?(p.preventDefault(),F((S+1)%i.length)):(p.key==="ArrowLeft"||p.key==="ArrowUp")&&(p.preventDefault(),F((S-1+i.length)%i.length))},tabIndex:S===h?0:-1,children:[o.featured&&a.jsx("span",{className:"aa-badge",children:"Popular"}),a.jsxs("span",{className:"aa-tier-name",children:[o.name,a.jsx("span",{className:"aa-radio"})]}),a.jsxs("span",{className:"aa-price",children:[o.price,o.period&&a.jsx("small",{children:o.period})]}),a.jsx("span",{style:{fontSize:13,color:"var(--aa-muted)"},children:o.blurb}),a.jsx("ul",{children:o.perks.map((p,C)=>a.jsxs("li",{children:[a.jsx(ya,{}),p]},C))})]},o.name+h))}),a.jsxs("form",{className:"aa-form",onSubmit:J,noValidate:!0,children:[a.jsx("label",{className:"aa-sr",htmlFor:R+"-name",children:"Name"}),a.jsx("input",{id:R+"-name",className:"aa-field",value:w,maxLength:40,autoComplete:"name",placeholder:n,"aria-invalid":k==="error"&&!w.trim()?!0:void 0,onChange:o=>{H(o.target.value),k!=="loading"&&z("idle")}}),a.jsx("label",{className:"aa-sr",htmlFor:R+"-email",children:"Email"}),a.jsx("input",{id:R+"-email",className:"aa-field",type:"email",value:q,autoComplete:"email",placeholder:s,"aria-invalid":k==="error"&&w.trim()&&!T(q)?!0:void 0,onChange:o=>{U(o.target.value),k!=="loading"&&z("idle")}}),a.jsxs("button",{type:"submit",className:"aa-btn aa-btn-solid",disabled:k==="loading",children:[k==="loading"?a.jsx("span",{className:"aa-spin"}):null,c]})]}),a.jsx("p",{className:"aa-msg","data-s":k,role:"status","aria-live":"polite",children:k==="idle"?"":Z})]}),a.jsxs("div",{className:"aa-card-wrap",children:[a.jsxs("div",{ref:I,className:"aa-member"+(O?" aa-printed":""),onPointerMove:Q,onPointerLeave:aa,"aria-label":"Member card preview for "+(w.trim()||"you"),role:"img",children:[a.jsx("div",{className:"aa-member-bg",style:{background:oa(W(w+(b==null?void 0:b.name))||N,_,46,60)}}),a.jsx("div",{className:"aa-member-rib",children:a.jsx(wa,{text:g,duration:18})}),a.jsxs("div",{className:"aa-member-in",children:[a.jsxs("div",{className:"aa-member-top",children:[a.jsx(va,{text:u}),a.jsx(D,{size:52,gap:"transparent"})]}),a.jsxs("div",{className:"aa-member-bottom",children:[a.jsxs("div",{style:{minWidth:0,flex:1},children:[a.jsxs("small",{children:[b==null?void 0:b.name," member"]}),a.jsx("div",{className:"aa-member-name",children:w.trim()||"Your Name"})]}),a.jsxs("div",{className:"aa-member-no",children:[a.jsx("small",{children:"No."}),Y]})]})]}),a.jsx("div",{className:"aa-member-shine"})]},O),a.jsx("span",{className:"aa-mono",style:{color:"var(--aa-muted)"},children:"Drag over the card · it tilts"})]})]})]})})})]})}function ua(){const[t,r]=l.useState(!1);return l.useEffect(()=>{var n;if(typeof matchMedia!="function")return;const e=matchMedia("(prefers-reduced-motion: reduce)"),i=()=>r(e.matches);return i(),(n=e.addEventListener)==null||n.call(e,"change",i),()=>{var s;return(s=e.removeEventListener)==null?void 0:s.call(e,"change",i)}},[]),t}function xa(t=.2){const r=l.useRef(null),[e,i]=l.useState(!1);return l.useEffect(()=>{const n=r.current;if(!n||e)return;if(typeof IntersectionObserver!="function"){i(!0);return}const s=new IntersectionObserver(c=>{c.some(m=>m.isIntersecting)&&(i(!0),s.disconnect())},{threshold:t});return s.observe(n),()=>s.disconnect()},[e,t]),[r,e]}function ba(t,r,e){const i=typeof t=="string"?P[t]??P.cobalt:t,[n,s]=l.useState(i),c=typeof t=="string"?t:t.name+t.colors.join("");l.useEffect(()=>s(typeof t=="string"?P[t]??P.cobalt:t),[c]);const m=n.colors.length?n.colors:P.cobalt.colors,[f,u]=l.useState(r==="dark"?"dark":"light"),[g,N]=l.useState(!1);return l.useEffect(()=>{var y;if(r!=="system"||g){g||u(r==="dark"?"dark":"light");return}const x=()=>u(document.documentElement.classList.contains("dark")||typeof matchMedia=="function"&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");x();const v=new MutationObserver(x);v.observe(document.documentElement,{attributes:!0,attributeFilter:["class"]});const d=typeof matchMedia=="function"?matchMedia("(prefers-color-scheme: dark)"):null;return(y=d==null?void 0:d.addEventListener)==null||y.call(d,"change",x),()=>{var M;v.disconnect(),(M=d==null?void 0:d.removeEventListener)==null||M.call(d,"change",x)}},[r,g]),{pal:n,setPal:s,colors:m,theme:f,toggleTheme:()=>{const x=f==="dark"?"light":"dark";N(!0),u(x),e==null||e(x)}}}function ha(t,r,e,i){const n=(r==null?void 0:r.display)??pa;return{"--aa-max":e,"--aa-accent":t.accent,"--aa-frame":t.frame,"--aa-display":n,"--aa-body":(r==null?void 0:r.body)??n,"--aa-mono":(r==null?void 0:r.mono)??da,...i}}const j={ring:"M14 50a36 36 0 1 0 72 0a36 36 0 1 0-72 0",left:"M34.4 34.4A22 22 0 0 0 34.4 65.6",right:"M65.6 34.4A22 22 0 0 1 65.6 65.6",u:"M43.5 41V53a6.5 6.5 0 0 0 13 0V41",bar:"M50 41V50",slash:"M8 50H86",arrow:"M86 50H98",head:"M85 38L98 50L85 62"};function D({size:t=40,follow:r=!1,reduced:e=!1,gap:i="var(--aa-paper)",className:n="",title:s}){const c=l.useRef(null),m=l.useRef(null);return l.useEffect(()=>{if(!r)return;let f=0,u=-45,g=0,N=0;const L=()=>{f=0;const v=c.current,d=m.current;if(!v||!d)return;const y=v.getBoundingClientRect(),M=y.left+y.width/2,A=y.top+y.height/2;Math.hypot(g-M,N-A)<y.width*.3||(u=ca(u,Math.atan2(N-A,g-M)*180/Math.PI),d.style.transform="rotate("+u.toFixed(1)+"deg)")},x=v=>{g=v.clientX,N=v.clientY,f||(f=requestAnimationFrame(L))};return addEventListener("pointermove",x,{passive:!0}),()=>{removeEventListener("pointermove",x),cancelAnimationFrame(f)}},[r]),a.jsxs("svg",{ref:c,className:"aa-logo "+n,width:t,height:t,viewBox:"0 0 100 100",fill:"none",stroke:"currentColor",strokeLinecap:"round",role:s?"img":void 0,"aria-label":s,"aria-hidden":s?void 0:!0,children:[a.jsxs("g",{className:"aa-logo-spin",children:[a.jsx("path",{d:j.ring,strokeWidth:"9"}),a.jsx("path",{d:j.left,strokeWidth:"6.5"}),a.jsx("path",{d:j.right,strokeWidth:"6.5"}),a.jsx("path",{d:j.u,strokeWidth:"6.5"}),a.jsx("path",{d:j.bar,strokeWidth:"5"})]}),a.jsxs("g",{ref:m,className:"aa-logo-arrow",style:{transform:"rotate(-45deg)",transition:e?"none":void 0},children:[a.jsx("path",{d:j.slash,strokeWidth:"5",stroke:i,strokeLinecap:"butt",style:{transform:"translate(0,8px)"}}),a.jsx("path",{d:j.arrow,strokeWidth:"8"}),a.jsx("path",{d:j.head,strokeWidth:"7",strokeLinejoin:"round"})]})]})}function ga({text:t}){return a.jsx("span",{className:"aa-echo",children:t})}function va({text:t,className:r="",as:e="div"}){const i=na(t),n=e;return a.jsx(n,{className:"aa-title "+r,children:i.map((s,c)=>a.jsx("span",{children:c===i.length-1?a.jsx(ga,{text:s}):s},c))})}function ya(){return a.jsx("svg",{width:"11",height:"11",viewBox:"0 0 12 12",fill:"none",stroke:"currentColor",strokeWidth:"2.2",strokeLinecap:"round",strokeLinejoin:"round","aria-hidden":"true",children:a.jsx("path",{d:"M2 6.5l2.6 2.5L10 3.5"})})}function wa({text:t,reverse:r,duration:e=26,big:i}){const s=Array.from({length:10}),c=m=>a.jsx("div",{style:{display:"flex"},"aria-hidden":m==="b"?!0:void 0,children:s.map((f,u)=>a.jsxs("span",{className:"aa-marq-item",children:[t,a.jsx(D,{size:i?64:36,gap:"var(--aa-ink)"})]},u))},m);return a.jsxs("div",{className:"aa-marq"+(r?" aa-marq-r":""),style:{"--d":e*10/4+"s"},children:[c("a"),c("b")]})}const ka=`
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
.aa-join{display:grid;gap:clamp(28px,5cqi,64px);margin-top:clamp(24px,4cqi,44px)}
@container (min-width:900px){.aa-join{grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);align-items:center}}
.aa-tiers{display:grid;gap:10px}
@container (min-width:620px){.aa-tiers{grid-template-columns:repeat(3,minmax(0,1fr))}}
.aa-tier{position:relative;display:flex;flex-direction:column;gap:8px;padding:16px;border-radius:18px;border:1.5px solid var(--aa-line-strong);background:var(--aa-paper);transition:border-color .25s,background-color .25s,transform .3s cubic-bezier(.2,.8,.2,1)}
.aa-tier:hover{border-color:var(--aa-blue);transform:translateY(-2px)}
.aa-tier[aria-checked="true"]{border-color:var(--aa-blue);background:color-mix(in srgb,var(--aa-blue) 8%,var(--aa-paper));box-shadow:inset 0 0 0 1px var(--aa-blue)}
.aa-tier-name{display:flex;align-items:center;justify-content:space-between;font-family:var(--aa-display);font-weight:800;font-size:15px;text-transform:uppercase;letter-spacing:.02em}
.aa-radio{width:18px;height:18px;border-radius:99px;border:2px solid var(--aa-line-strong);display:grid;place-items:center}
.aa-tier[aria-checked="true"] .aa-radio{border-color:var(--aa-blue)}
.aa-tier[aria-checked="true"] .aa-radio::after{content:"";width:8px;height:8px;border-radius:9px;background:var(--aa-blue)}
.aa-price{font-family:var(--aa-display);font-weight:800;font-size:28px;letter-spacing:-.03em;color:var(--aa-blue);line-height:1}
.aa-price small{font-size:13px;color:var(--aa-muted);letter-spacing:0}
.aa-tier ul{display:flex;flex-direction:column;gap:4px;font-size:13px;color:var(--aa-soft)}
.aa-tier li{display:flex;gap:7px;align-items:flex-start}
.aa-tier li svg{margin-top:4px;color:var(--aa-blue)}
.aa-badge{position:absolute;top:-10px;right:14px;padding:3px 9px;border-radius:99px;background:var(--aa-ink);color:var(--aa-paper);font-family:var(--aa-display);font-weight:800;font-size:9.5px;letter-spacing:.06em;text-transform:uppercase}
.aa-form{display:grid;gap:10px;margin-top:18px}
@container (min-width:620px){.aa-form{grid-template-columns:1fr 1fr auto}}
.aa-field{height:50px;padding:0 18px;border-radius:999px;border:1.5px solid var(--aa-line-strong);background:var(--aa-paper);outline:none;transition:border-color .2s,box-shadow .2s}
.aa-field::placeholder{color:var(--aa-muted)}
.aa-field:focus{border-color:var(--aa-blue);box-shadow:0 0 0 4px var(--aa-line)}
.aa-field[aria-invalid="true"]{border-color:#e5484d}
.aa-msg{min-height:22px;margin-top:10px;font-size:13.5px;color:var(--aa-muted)}
.aa-msg[data-s="error"]{color:#e5484d}
.aa-msg[data-s="done"]{color:var(--aa-blue);font-weight:700}
.aa-spin{width:14px;height:14px;border-radius:99px;border:2px solid currentColor;border-right-color:transparent;animation:aa-spin .7s linear infinite}
.aa-card-wrap{perspective:1100px;display:flex;flex-direction:column;align-items:center;gap:14px}
.aa-member{position:relative;width:min(100%,460px);aspect-ratio:1.586;border-radius:24px;overflow:hidden;color:#ffffff;transform:rotateX(var(--ry,0deg)) rotateY(var(--rx,0deg));transform-style:preserve-3d;transition:transform .5s cubic-bezier(.2,.8,.2,1),box-shadow .5s;box-shadow:0 34px 70px -34px rgba(8,14,80,.7);cursor:grab}
.aa-member-bg{position:absolute;inset:0;transition:opacity .5s}
.aa-member-rib{position:absolute;left:-12%;top:38%;width:130%;height:19%;background:var(--aa-ink);color:var(--aa-paper);transform:rotate(-14deg);display:flex;align-items:center;overflow:hidden}
.aa-member-rib .aa-marq-item{font-size:clamp(13px,2.4cqi,19px)}
.aa-member-rib .aa-logo{width:22px}
.aa-member-in{position:absolute;inset:0;background:linear-gradient(to top,rgba(4,6,40,.38),transparent 42%);display:flex;flex-direction:column;justify-content:space-between;padding:clamp(14px,2.4cqi,22px)}
.aa-member-top{display:flex;align-items:flex-start;justify-content:space-between}
.aa-member-top .aa-title{font-size:clamp(15px,2.2cqi,22px)}
.aa-member-top .aa-logo{width:clamp(34px,5cqi,52px);height:auto;color:#ffffff}
.aa-member-bottom{display:flex;align-items:flex-end;justify-content:space-between;gap:12px;font-family:var(--aa-display);font-weight:800;text-transform:uppercase}
.aa-member-name{font-size:clamp(17px,2.8cqi,26px);line-height:1;letter-spacing:-.01em;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;text-shadow:0 2px 14px rgba(0,0,0,.18)}
.aa-member-bottom small{display:block;font-size:10px;letter-spacing:.08em;opacity:.85;margin-bottom:4px}
.aa-member-no{text-align:right;font-size:clamp(14px,2cqi,18px)}
.aa-member-shine{position:absolute;inset:0;background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.28) 46%,transparent 60%);background-size:250% 100%;background-position:var(--sx,100%) 0;mix-blend-mode:soft-light;pointer-events:none;transition:background-position .5s}
.aa-printed{animation:aa-print .9s cubic-bezier(.2,.8,.2,1)}
.aa-marq{display:flex;width:max-content;animation:aa-marq var(--d,26s) linear infinite}
.aa-rib:hover .aa-marq{animation-play-state:paused}
.aa-marq-r{animation-direction:reverse}
.aa-marq-item{display:inline-flex;align-items:center;gap:clamp(10px,1.6cqi,22px);padding-right:clamp(16px,2.6cqi,36px);font-family:var(--aa-display);font-weight:800;font-size:clamp(17px,3cqi,40px);letter-spacing:-.01em;white-space:nowrap}
.aa-marq-item .aa-logo{width:clamp(30px,5.4cqi,74px);height:auto;color:var(--aa-paper)}
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
`;function Na(){return a.jsx("div",{className:"w-full",children:a.jsx(fa,{defaultTheme:"dark"})})}export{Na as default};
