import{r as d,j as a}from"./index-CdiR0C0d.js";const nt={vermilion:{background:"#ec472c",ink:"#0d0b0a",accent:"#fff1df"},ink:{background:"#0f0e0d",ink:"#ec472c",accent:"#f4ede2"},paper:{background:"#efe9dd",ink:"#141312",accent:"#ec472c"},cobalt:{background:"#1d3bd1",ink:"#f3efe6",accent:"#ffcd3c"}},Nt='"JetBrains Mono", "SF Mono", ui-monospace, Menlo, Consolas, monospace',k=7,at=8,Tt=900,Rt=1100,Et=520,ct={0:["111","101","101","101","101","101","111"],1:["010","110","010","010","010","010","111"],2:["111","001","001","111","100","100","111"],3:["111","001","001","111","001","001","111"],4:["101","101","101","111","001","001","001"],5:["111","100","100","111","001","001","111"],6:["111","100","100","111","101","101","111"],7:["111","001","001","010","010","010","010"],8:["111","101","101","111","101","101","111"],9:["111","101","101","111","001","001","111"],A:["111","101","101","111","101","101","101"],B:["110","101","101","110","101","101","110"],C:["111","100","100","100","100","100","111"],D:["110","101","101","101","101","101","110"],E:["111","100","100","111","100","100","111"],F:["111","100","100","111","100","100","100"],G:["111","100","100","101","101","101","111"],H:["101","101","101","111","101","101","101"],I:["111","010","010","010","010","010","111"],J:["001","001","001","001","001","101","111"],K:["101","101","110","100","110","101","101"],L:["100","100","100","100","100","100","111"],M:["101","111","111","101","101","101","101"],N:["110","101","101","101","101","101","101"],O:["111","101","101","101","101","101","111"],P:["111","101","101","111","100","100","100"],Q:["111","101","101","101","101","111","001"],R:["111","101","101","110","101","101","101"],S:["111","100","100","111","001","001","111"],T:["111","010","010","010","010","010","010"],U:["101","101","101","101","101","101","111"],V:["101","101","101","101","101","101","010"],W:["101","101","101","101","111","111","101"],X:["101","101","101","010","101","101","101"],Y:["101","101","101","111","010","010","010"],Z:["111","001","001","010","100","100","111"],"-":["000","000","000","111","000","000","000"],"!":["010","010","010","010","010","000","010"],".":["000","000","000","000","000","000","010"]};function zt(i,s){const e=[];for(let r=0;r<3;r++)i[r]==="1"&&e.push(r);if(!e.length)return null;const u=[];for(let r=0;r<3;r++){if(e.indexOf(r)>-1){u.push(r);continue}let l=e[0];for(const n of e){const h=Math.abs(n-r),S=Math.abs(l-r);(h<S||h===S&&n!==l&&(s%2===0?n>l:n<l))&&(l=n)}u.push(l)}return u}function Ct(i){const s=(k-1)/2,e=[],u=(i||" ").toUpperCase();if(u===" "){for(let n=0;n<k;n++)for(let h=0;h<3;h++)e.push({col:h,dy:s-n,flat:!0});return e}const l=(ct[u]||ct["-"]).map((n,h)=>zt(n,h));for(let n=0;n<k;n++){let h=n;if(!l[n])for(let f=1;f<k;f++){if(n+f<k&&l[n+f]){h=n+f;break}if(n-f>=0&&l[n-f]){h=n-f;break}}const S=l[h]||[0,1,2];for(let f=0;f<3;f++)e.push({col:S[f],dy:h-n,flat:!l[h]})}return e}function qt(i){let s=0;return i%2===1&&(s=123),i>=3&&i%2===1&&(s=222),(i-1)%5===0&&(s=69),(i-2)%3===0&&(s=99),s}const B=[[0,0],[.18,.22],[.3,.27],[.55,.61],[.68,.66],[.86,.93],[1,1]];function Lt(i){if(i<=0)return 0;if(i>=1)return 1;for(let s=0;s<B.length-1;s++){const e=B[s],u=B[s+1];if(i<=u[0]){const r=(i-e[0])/(u[0]-e[0]),l=1-Math.pow(1-r,2);return e[1]+(u[1]-e[1])*l}}return 1}function H(i,s,e){if(typeof i=="number"){const l=String(Math.max(0,Math.round(i)));return l.length>=s?l:(e?"0":" ").repeat(s-l.length)+l}const u=i.toUpperCase();if(u.length>=s)return u;const r=Math.floor((s-u.length)/2);return" ".repeat(r)+u+" ".repeat(s-u.length-r)}function Pt(i){let s=i>>>0;return()=>{s=s+1831565813>>>0;let e=s;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}const Ot=`
.scp-root { position: relative; width: 100%; overflow: hidden; isolation: isolate; }
.scp-content { position: relative; height: 100%; overflow: auto; }
.scp-gate {
  position: absolute; inset: 0; z-index: 10; container-type: size;
  display: flex; align-items: center; justify-content: center;
  color: var(--scp-ink); box-sizing: border-box;
  -webkit-user-select: none; user-select: none;
}
.scp-gate[data-phase="done"] { display: none; }
.scp-gate > div, .scp-gate > button, .scp-gate span { box-sizing: border-box; }
.scp-gate svg { max-width: none; }

.scp-blinds { position: absolute; inset: 0; display: flex; flex-direction: column; z-index: 0; transition: opacity 600ms ease; }
.scp-blind {
  flex: 1 1 0; margin-bottom: -1px; background: var(--scp-bg);
  transition: transform 860ms cubic-bezier(0.76, 0, 0.24, 1);
}
.scp-gate[data-phase="exit"][data-exit="blinds"] .scp-blind:nth-child(odd) { transform: translateX(-101%); }
.scp-gate[data-phase="exit"][data-exit="blinds"] .scp-blind:nth-child(even) { transform: translateX(101%); }
.scp-gate[data-phase="exit"][data-exit="fade"] .scp-blinds { opacity: 0; }

.scp-stage {
  position: relative; z-index: 1; display: flex; align-items: center; justify-content: center;
  transition: opacity 380ms ease, transform 520ms cubic-bezier(0.65, 0, 0.35, 1);
}
.scp-gate[data-phase="exit"] .scp-stage { opacity: 0; transform: scale(0.94); }

.scp-counter {
  --g: calc(var(--scp-dh) * 0.024);
  --h: calc((var(--scp-dh) - 6 * var(--g)) / 7);
  --w: calc(var(--h) * var(--scp-ratio));
  position: relative; display: flex; gap: calc(var(--w) * 0.55);
  padding: calc(var(--h) * 0.6); margin: 0; border: 0; background: transparent; color: inherit;
  font: inherit; cursor: default; border-radius: 2px; outline: none;
  transform: skewX(var(--scp-lean, 0deg));
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}
.scp-counter[data-interactive="true"] { cursor: pointer; }
.scp-counter:focus-visible { box-shadow: 0 0 0 2px var(--scp-accent); }
.scp-digit { position: relative; flex: none; width: calc(3 * var(--w) + 2 * var(--g)); height: var(--scp-dh); }
.scp-slat {
  position: absolute; display: block;
  left: calc(var(--c) * (var(--w) + var(--g)));
  top: calc(var(--r) * (var(--h) + var(--g)));
  width: var(--w); height: var(--h);
  background: var(--scp-ink);
  transform: translate(calc(var(--x) * (100% + var(--g))), calc(var(--y) * (100% + var(--g)))) scaleX(var(--s));
  transition:
    transform var(--scp-speed) cubic-bezier(0.65, 0, 0.35, 1),
    background-color 220ms ease;
  will-change: transform;
}
.scp-slat[data-hot="true"] { background: var(--scp-accent); }
.scp-counter[data-scatter="true"] .scp-slat { transition-duration: 300ms, 220ms; transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1), ease; }

.scp-unit {
  position: absolute; top: calc(var(--h) * 0.6); left: 100%; margin-left: calc(var(--w) * 0.1);
  font-family: var(--scp-font); font-size: max(11px, calc(var(--h) * 0.62)); font-weight: 600; line-height: 1;
  transform: skewX(calc(var(--scp-lean, 0deg) * -1));
}

.scp-hud {
  position: absolute; z-index: 2; font-family: var(--scp-font);
  font-size: clamp(10px, 1.6cqmin, 13px); line-height: 1.35; letter-spacing: 0.14em; text-transform: uppercase;
  transition: opacity 300ms ease;
}
.scp-gate[data-phase="exit"] .scp-hud, .scp-gate[data-phase="exit"] .scp-mark { opacity: 0; }
.scp-tl { top: clamp(16px, 4cqmin, 40px); left: clamp(16px, 4cqmin, 40px); }
.scp-tr { top: clamp(16px, 4cqmin, 40px); right: clamp(16px, 4cqmin, 40px); text-align: right; }
.scp-bl { bottom: clamp(16px, 4cqmin, 40px); left: clamp(16px, 4cqmin, 40px); max-width: min(46cqw, 440px); }
.scp-br { bottom: clamp(16px, 4cqmin, 40px); right: clamp(16px, 4cqmin, 40px); display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
.scp-dim { opacity: 0.62; }
.scp-status { display: inline-flex; align-items: center; gap: 8px; }
.scp-dot { width: 7px; height: 7px; background: var(--scp-ink); display: inline-block; animation: scp-blink 1s steps(2, jump-none) infinite; }
.scp-gate[data-phase="hold"] .scp-dot { animation: none; background: var(--scp-accent); }

.scp-rail { display: flex; gap: 3px; }
.scp-tick { width: 14px; height: 7px; background: var(--scp-ink); opacity: 0.18; transition: opacity 300ms ease, background-color 300ms ease; }
.scp-tick[data-on="true"] { opacity: 1; }
.scp-tick[data-on="true"]:last-child { background: var(--scp-accent); }

.scp-skip {
  margin: 0; padding: 4px 0; border: 0; background: transparent; color: inherit; cursor: pointer;
  font: inherit; letter-spacing: inherit; text-transform: inherit;
  border-bottom: 1px solid currentColor; opacity: 0.8; transition: opacity 200ms ease, color 200ms ease;
}
.scp-skip:hover { opacity: 1; color: var(--scp-accent); }
.scp-skip:focus-visible { outline: 2px solid var(--scp-accent); outline-offset: 3px; }

.scp-mark { position: absolute; z-index: 2; width: 14px; height: 14px; opacity: 0.55; transition: opacity 300ms ease; }
.scp-mark::before, .scp-mark::after { content: ""; position: absolute; background: var(--scp-ink); }
.scp-mark::before { left: 6px; top: 0; width: 2px; height: 14px; }
.scp-mark::after { top: 6px; left: 0; width: 14px; height: 2px; }
.scp-m1 { top: 50%; left: clamp(16px, 4cqmin, 40px); margin-top: -7px; }
.scp-m2 { top: 50%; right: clamp(16px, 4cqmin, 40px); margin-top: -7px; }
.scp-hint { position: absolute; z-index: 2; left: 50%; top: clamp(16px, 4cqmin, 40px); transform: translateX(-50%); white-space: nowrap; }

.scp-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.scp-skip.scp-sr:focus-visible { width: auto; height: auto; clip: auto; overflow: visible; left: 16px; bottom: 16px; z-index: 3; }

@keyframes scp-blink { 0% { opacity: 1; } 100% { opacity: 0.15; } }

@container (max-width: 860px) {
  .scp-hint { display: none; }
}
@container (max-width: 560px) {
  .scp-hint, .scp-m1, .scp-m2 { display: none; }
  .scp-bl { max-width: 50cqw; }
  .scp-tick { width: 8px; }
}

@media (prefers-reduced-motion: reduce) {
  .scp-slat { transition-duration: 1ms, 1ms; transition-delay: 0ms !important; }
  .scp-counter { transition: none; transform: none; }
  .scp-unit { transform: none; }
  .scp-dot { animation: none; }
  .scp-blind { transition: none; }
  .scp-gate[data-phase="exit"] .scp-blind { transform: none; }
  .scp-gate[data-phase="exit"] .scp-blinds { opacity: 0; }
}
`;function _t({children:i,loop:s=!1,progress:e,durationMs:u=5600,sequence:r,digits:l=3,pad:n=!0,preset:h="vermilion",palette:S,label:f="Slat / Count — N°07",caption:it="Loading the good part. Every figure is twenty-one bars, shunted into place.",hud:K=!0,size:rt,slatRatio:U=2,speed:ot=520,stepMs:J=720,interactive:v=!0,exit:X="blinds",fontFamily:pt=Nt,height:lt="100svh",onComplete:W,className:dt=""}){const _={...nt[h]||nt.vermilion,...S},F=r?r.join(""):"",w=Math.max(1,l,...(r||[]).map(t=>String(t).length)),j=" ".repeat(w),E="-".repeat(w),[c,g]=d.useState("idle"),[Y,ut]=d.useState(0),[G,y]=d.useState(j),[D,z]=d.useState(0),[N,Q]=d.useState(0),[ht,V]=d.useState(-1),[C,mt]=d.useState(!1),Z=d.useRef(e);Z.current=e;const $=d.useRef(u);$.current=u;const q=d.useRef(W);q.current=W;const L=d.useRef(r);L.current=r;const P=d.useRef(!1),I=d.useRef(null);d.useEffect(()=>{var p;if(typeof window>"u"||!window.matchMedia)return;const t=window.matchMedia("(prefers-reduced-motion: reduce)"),o=()=>mt(t.matches);return o(),(p=t.addEventListener)==null||p.call(t,"change",o),()=>{var m;return(m=t.removeEventListener)==null?void 0:m.call(t,"change",o)}},[]),d.useEffect(()=>{if(c!=="idle")return;y(j);const t=window.setTimeout(()=>g("intro"),60);return()=>window.clearTimeout(t)},[c,j]),d.useEffect(()=>{if(c!=="intro")return;y(E),z(0),P.current=!1;const t=window.setTimeout(()=>g("count"),Tt);return()=>window.clearTimeout(t)},[c,E,Y]),d.useEffect(()=>{if(c!=="count")return;const t=F&&L.current?L.current.slice():null,o=performance.now();let p=0,m=0;const x=()=>{if(t){if(P.current&&(p=t.length-1),p>=t.length){g("hold");return}y(H(t[p],w,n)),z(Math.round((p+1)/t.length*100)),p++;return}const T=Z.current,O=P.current?100:typeof T=="number"?T:Lt((performance.now()-o)/Math.max(1,$.current))*100;m=Math.max(m,Math.min(100,Math.floor(O))),y(H(m,w,n)),z(m),m>=100&&g("hold")};x();const b=window.setInterval(x,J);return()=>window.clearInterval(b)},[c,Y,F,w,n,J]),d.useEffect(()=>{if(c!=="hold")return;const t=window.setTimeout(()=>g(s?"reset":"exit"),Rt);return()=>window.clearTimeout(t)},[c,s]),d.useEffect(()=>{if(c!=="reset")return;y(E);const t=window.setTimeout(()=>y(j),900),o=window.setTimeout(()=>{ut(p=>p+1),g("intro")},1600);return()=>{window.clearTimeout(t),window.clearTimeout(o)}},[c,E,j]),d.useEffect(()=>{if(c!=="exit")return;const t=C||X==="fade"?650:860+(at-1)*60+120,o=window.setTimeout(()=>{var p;g("done"),(p=q.current)==null||p.call(q)},t);return()=>window.clearTimeout(o)},[c,C,X]),d.useEffect(()=>{if(!N)return;const t=window.setTimeout(()=>Q(0),Et);return()=>window.clearTimeout(t)},[N]);const ft=c==="count"||c==="hold",A=c!=="exit"&&c!=="done",xt=t=>{if(!v)return;const o=I.current;if(!o)return;const p=o.getBoundingClientRect(),m=Math.min(p.height,p.width)*.06,x=(t.clientY-p.top-m)/Math.max(1,p.height-m*2),b=(t.clientX-p.left)/Math.max(1,p.width);V(x<0||x>=1?-1:Math.floor(x*k)),C||o.style.setProperty("--scp-lean",((.5-b)*9).toFixed(2)+"deg")},gt=()=>{var t;V(-1),(t=I.current)==null||t.style.setProperty("--scp-lean","0deg")},bt=()=>{!v||!A||Q(1+Math.floor(Math.random()*1e9))},tt=()=>{if(c!=="idle"&&c!=="intro"&&c!=="count")return;P.current=!0;const t=L.current;y(H(t&&t.length?t[t.length-1]:100,w,n)),z(100),g("hold")},M=N?Pt(N):null,vt=G.split(""),et=!F,st=12,wt=Math.round(D/100*st),yt=c==="hold"?s?"Ready — again":"Ready":c==="count"?"Loading":c==="exit"?"Enter":"Setting type",kt={"--scp-bg":_.background,"--scp-ink":_.ink,"--scp-accent":_.accent,"--scp-font":pt},St={"--scp-dh":rt||"min(50cqh, "+(82/(w*(.434*U+.048))).toFixed(2)+"cqw)","--scp-ratio":String(U),"--scp-speed":ot+"ms"};return a.jsxs("div",{className:"scp-root "+dt,style:{height:lt},children:[a.jsx("style",{children:Ot}),!s&&i!=null&&a.jsx("div",{className:"scp-content","aria-hidden":c!=="done"?!0:void 0,children:i}),a.jsxs("div",{className:"scp-gate","data-phase":c,"data-exit":X,style:kt,role:"progressbar","aria-label":f||"Loading","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":D,"aria-busy":c!=="done",children:[a.jsx("div",{className:"scp-blinds","aria-hidden":"true",children:Array.from({length:at},(t,o)=>a.jsx("div",{className:"scp-blind",style:{transitionDelay:(C?0:o*60)+"ms"}},o))}),a.jsx("div",{className:"scp-stage",children:a.jsxs("button",{ref:I,type:"button",className:"scp-counter","data-interactive":v?"true":"false","data-scatter":N?"true":"false",style:St,onClick:bt,onPointerMove:xt,onPointerLeave:gt,tabIndex:v?0:-1,"aria-label":v?"Scatter the slats":void 0,"aria-hidden":v?void 0:!0,children:[vt.map((t,o)=>{const p=Ct(t);return a.jsx("span",{className:"scp-digit","aria-hidden":"true",children:p.map((m,x)=>{const b=Math.floor(x/3),T=x%3;let O=m.col,R=m.dy;M&&(O=Math.floor(M()*3),R=m.dy+Math.round((M()-.5)*3),R=Math.max(-b,Math.min(k-1-b,R)));const Mt=M?Math.floor(M()*90):qt(x+1)+o*45,jt={"--c":T,"--r":b,"--x":O-T,"--y":R,"--s":m.flat&&!M?0:1,transitionDelay:Mt+"ms, 0ms"};return a.jsx("span",{className:"scp-slat","data-hot":ht===b+R?"true":void 0,style:jt},x)})},o)}),et&&ft&&a.jsx("span",{className:"scp-unit","aria-hidden":"true",children:"%"})]})}),K&&a.jsxs(a.Fragment,{children:[a.jsx("span",{className:"scp-mark scp-m1","aria-hidden":"true"}),a.jsx("span",{className:"scp-mark scp-m2","aria-hidden":"true"}),a.jsx("div",{className:"scp-hud scp-tl",children:f}),a.jsxs("div",{className:"scp-hud scp-tr",children:[a.jsxs("span",{className:"scp-status",children:[a.jsx("span",{className:"scp-dot","aria-hidden":"true"}),yt]}),a.jsx("div",{className:"scp-dim",children:et?String(D).padStart(3,"0")+" / 100":G.trim()||"—"})]}),a.jsx("div",{className:"scp-hud scp-bl scp-dim",children:it}),v&&a.jsx("div",{className:"scp-hud scp-hint scp-dim",children:"Hover the slats · click to scatter"}),a.jsxs("div",{className:"scp-hud scp-br",children:[a.jsx("div",{className:"scp-rail","aria-hidden":"true",children:Array.from({length:st},(t,o)=>a.jsx("span",{className:"scp-tick","data-on":o<wt?"true":void 0},o))}),!s&&A&&a.jsx("button",{type:"button",className:"scp-skip",onClick:tt,children:"Skip intro →"})]})]}),!K&&!s&&A&&a.jsx("button",{type:"button",className:"scp-skip scp-sr",onClick:tt,children:"Skip intro"}),a.jsx("span",{className:"scp-sr","aria-live":"polite",children:c==="hold"?"Loaded":""})]})]})}export{_t as S};
