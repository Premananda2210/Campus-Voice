import{r as d,j as c}from"./index-CdiR0C0d.js";const H=(M,B,S)=>Math.min(S,Math.max(B,M));function Ot({columns:M=3,rows:B=8,compactColumns:S=8,compactBreakpoint:ct=720,sections:D="[data-section]",introLabel:X="Introduction",offset:lt=28,idleMs:dt=1500,tileSize:U=30,gap:O=5,hint:W="Each tile is a slice of the page. Pick one to jump there, or drag across them to scrub.",hideNativeScrollbar:bt=!0,label:pt="Page position",controls:It,className:Ht=""}){const n=Math.max(1,Math.round(M)*Math.round(B)),ut=d.useRef(null),ft=d.useRef(null),mt=d.useRef(null),gt=d.useRef(null),Z=d.useRef(null),K=d.useRef(null),_=d.useRef(null),G=d.useRef(null),J=d.useRef(null),m=d.useRef([]);return m.current.length=n,d.useEffect(()=>{if(!bt)return;const i=document.documentElement;return i.setAttribute("data-tsb-hide-scrollbar",""),()=>i.removeAttribute("data-tsb-hide-scrollbar")},[bt]),d.useEffect(()=>{const i=ut.current,p=ft.current,a=mt.current,g=gt.current;if(!i||!p||!a||!g)return;const T=document.scrollingElement||document.documentElement,St=matchMedia("(prefers-reduced-motion: reduce)"),Q=matchMedia("(max-width: "+ct+"px)");let h=[],V=[],P=0,u=0,v=!1,x=M,Y=-1,z=-1,j=!1,l=null,$=null,vt=0,tt=0;const f=()=>{i.dataset.awake="true",clearTimeout(tt),tt=window.setTimeout(()=>{j||l||document.activeElement===a||(i.dataset.awake="false")},dt)},ht=t=>{const e=t+P*.35;let r=-1;return h.forEach((s,o)=>{s.top<=e&&(r=o)}),r},xt=()=>{if(P=T.clientHeight,u=Math.max(0,T.scrollHeight-P),i.hidden=u<2,i.hidden)return;v=Q.matches,x=Math.max(1,Math.round(v?S:M));const t=v?Math.max(8,Math.round(U*.66)):U,e=v?Math.max(2,Math.round(O*.8)):O,r=v?6:10;i.dataset.compact=String(v),a.style.setProperty("--tsb-cols",String(x)),a.style.setProperty("--tsb-tile",t+"px"),a.style.setProperty("--tsb-gap",e+"px"),a.style.setProperty("--tsb-pad",r+"px");const s=Math.ceil(n/x),o=x*t+(x-1)*e+r*2,b=s*t+(s-1)*e+r*2,A=(v?48:46)*Math.PI/180,y=(v?6:12)*Math.PI/180,C=Math.ceil(o*Math.cos(y)+b*Math.cos(A)*Math.sin(y)+12),N=Math.ceil(b*Math.cos(A)*Math.cos(y)+o*Math.sin(y)+12);p.style.width=C+"px",p.style.height=N+"px";const qt=T.scrollTop;h=(D?Array.from(document.querySelectorAll(D)):[]).map((w,F)=>{var E;const I=w.getBoundingClientRect().top+qt,k=w.querySelector("h1, h2, h3, h4");return{label:w.dataset.section||((E=k==null?void 0:k.textContent)==null?void 0:E.trim())||"Section "+(F+1),top:I,target:H(I-lt,0,u)}}),V=m.current.map((w,F)=>{const I=F/n*u,k=(F+1)/n*u,Nt=F===n-1,E=h.findIndex(it=>it.target>=I&&(it.target<k||Nt&&it.target<=k)),Ft=E>=0?E:ht((I+k)/2);return w&&(w.dataset.alt=String(Ft%2!==0),w.dataset.start=String(E>=0)),{section:Ft,starts:E}}),Y=-1,yt(),Xt(C,N)},Xt=(t,e)=>{const r=a.getBoundingClientRect(),s=p.getBoundingClientRect(),o=Math.max(0,s.left-r.left,r.right-s.right),b=Math.max(0,s.top-r.top,r.bottom-s.bottom);o>.5&&(p.style.width=Math.ceil(t+o*2)+"px"),b>.5&&(p.style.height=Math.ceil(e+b*2)+"px")},yt=()=>{var y;if(i.hidden)return;const t=T.scrollTop,e=u?H(t/u,0,1):0,r=Math.min(n-1,Math.floor(e*n)),s=(e*n-r)*100;r!==Y&&(m.current.forEach((C,N)=>{C&&(C.dataset.state=N<r?"done":N===r?"now":"todo")}),Y=r),(y=m.current[r])==null||y.style.setProperty("--tsb-fill",s.toFixed(1)+"%");let o=ht(t);e>.999&&h.length&&(o=h.length-1);const b=o>=0?h[o].label:X,A=Math.round(e*100);_.current&&(_.current.textContent=b),G.current&&(G.current.textContent=A+"%"),a.setAttribute("aria-valuenow",String(A)),a.setAttribute("aria-valuetext",A+"%, "+b),z>=0&&wt(z),f()},R=(t,e)=>{window.scrollTo({top:H(t,0,u),behavior:e&&!St.matches?"smooth":"auto"})},et=(t,e)=>R(t*u,e),Yt=(t,e)=>{const r=V[t];r&&r.starts>=0?R(h[r.starts].target,e):et(t/n,e)},wt=t=>{const e=m.current[t];if(!e)return;const r=e.getBoundingClientRect(),s=a.getBoundingClientRect();v?(g.style.left=r.left+r.width/2+"px",g.style.top=s.top-14+"px",g.style.transform="translate(-50%, -100%)"):(g.style.left=s.left-14+"px",g.style.top=r.top+r.height/2+"px",g.style.transform="translate(-100%, -50%)")},rt=t=>{var r,s,o;if(t!==z&&((r=m.current[z])==null||r.removeAttribute("data-hot"),t>=0&&((s=m.current[t])==null||s.setAttribute("data-hot","true")),z=t),t<0){g.dataset.on="false";return}const e=h[((o=V[t])==null?void 0:o.section)??-1];Z.current&&(Z.current.textContent=e?e.label:X),K.current&&(K.current.textContent=Math.round(t/n*100)+"%"),wt(t),g.dataset.on="true"},at=(t,e)=>{const r=document.elementFromPoint(t,e),s=r instanceof Element?r.closest(".tsb-tile"):null;return s&&a.contains(s)?Number(s.dataset.index):-1},kt=()=>{j=!1,rt(-1),f()},Et=()=>{j=!0,f()},Mt=()=>{l||kt()},Rt=t=>{if(t.button!==0)return;a.setPointerCapture(t.pointerId);const e=at(t.clientX,t.clientY);l={x:t.clientX,y:t.clientY,moved:!1,tile:e},j=!0,rt(e),f()},Lt=t=>{j=!0,f();const e=at(t.clientX,t.clientY);if(l&&(!l.moved&&Math.hypot(t.clientX-l.x,t.clientY-l.y)>4&&(l.moved=!0,i.dataset.dragging="true"),l.moved&&e>=0)){const r=m.current[e].getBoundingClientRect(),s=H((t.clientX-r.left)/r.width,0,.999);et((e+s)/n,!1)}(e>=0||!l)&&rt(e)},st=t=>{l=null,i.dataset.dragging="false",a.hasPointerCapture(t.pointerId)&&a.releasePointerCapture(t.pointerId);const e=document.elementFromPoint(t.clientX,t.clientY);t.pointerType==="mouse"&&e instanceof Node&&a.contains(e)?f():kt()},At=t=>{const e=l;if(e){if(!e.moved){const r=at(t.clientX,t.clientY),s=r>=0?r:e.tile;s>=0&&Yt(s,!0)}st(t)}},Tt=t=>{const e={ArrowRight:1,ArrowLeft:-1,ArrowDown:x,ArrowUp:-x}[t.key],r=T.scrollTop;if(e!==void 0){const o=performance.now()-vt<700&&$!==null?$:Y,b=H(o+e,0,n-1);$=b,vt=performance.now(),et(b/n,!0)}else if(t.key==="PageDown")R(r+P*.9,!0);else if(t.key==="PageUp")R(r-P*.9,!0);else if(t.key==="Home")R(0,!0);else if(t.key==="End")R(u,!0);else return;t.preventDefault()};let q=0;const Pt=()=>{q||(q=requestAnimationFrame(()=>{q=0,yt()}))};let ot=0;const L=()=>{cancelAnimationFrame(ot),ot=requestAnimationFrame(xt)},nt=()=>{J.current&&(J.current.dataset.gone="true")},zt=()=>{scrollY>innerHeight*.6&&nt()};addEventListener("scroll",Pt,{passive:!0}),addEventListener("scroll",zt,{passive:!0}),addEventListener("resize",L);const jt=new ResizeObserver(L);jt.observe(document.body),Q.addEventListener("change",L),document.fonts&&document.fonts.ready.then(L).catch(()=>{}),a.addEventListener("pointerenter",Et),a.addEventListener("pointerleave",Mt),a.addEventListener("pointermove",Lt),a.addEventListener("pointerdown",Rt),a.addEventListener("pointerup",At),a.addEventListener("pointercancel",st),a.addEventListener("keydown",Tt),a.addEventListener("focus",f),a.addEventListener("blur",f);const Ct=["pointerenter","pointerdown","focusin"];return Ct.forEach(t=>i.addEventListener(t,nt,{once:!0})),xt(),()=>{cancelAnimationFrame(q),cancelAnimationFrame(ot),clearTimeout(tt),removeEventListener("scroll",Pt),removeEventListener("scroll",zt),removeEventListener("resize",L),jt.disconnect(),Q.removeEventListener("change",L),a.removeEventListener("pointerenter",Et),a.removeEventListener("pointerleave",Mt),a.removeEventListener("pointermove",Lt),a.removeEventListener("pointerdown",Rt),a.removeEventListener("pointerup",At),a.removeEventListener("pointercancel",st),a.removeEventListener("keydown",Tt),a.removeEventListener("focus",f),a.removeEventListener("blur",f),Ct.forEach(t=>i.removeEventListener(t,nt))}},[n,M,S,ct,D,X,lt,dt,U,O,W]),c.jsxs(c.Fragment,{children:[c.jsxs("nav",{ref:ut,className:"tsb-root "+Ht,"aria-label":pt,"data-awake":"false","data-compact":"false","data-dragging":"false",children:[c.jsx("div",{ref:ft,className:"tsb-stage",children:c.jsx("div",{ref:mt,className:"tsb-tray",role:"scrollbar",tabIndex:0,"aria-label":pt,"aria-controls":It,"aria-orientation":"vertical","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":0,children:Array.from({length:n},(i,p)=>c.jsx("div",{ref:a=>{m.current[p]=a},className:"tsb-tile","data-index":p,"data-state":"todo"},p))})}),c.jsxs("p",{className:"tsb-caption","aria-hidden":"true",children:[c.jsx("span",{ref:_,className:"tsb-caption-name",children:X}),c.jsx("span",{ref:G,className:"tsb-caption-pct",children:"0%"})]}),W?c.jsx("p",{ref:J,className:"tsb-hint","data-gone":"false",children:W}):null]}),c.jsxs("div",{ref:gt,className:"tsb-tip","data-on":"false","aria-hidden":"true",children:[c.jsx("span",{ref:Z}),c.jsx("span",{ref:K,className:"tsb-tip-pct"})]}),c.jsx("style",{children:Bt})]})}const Bt=`
.tsb-root {
  --tsb-bg: var(--color-background, #ececec);
  --tsb-fg: var(--color-foreground, #1a1a1a);
  --tsb-tray: color-mix(in oklab, var(--tsb-fg) 9%, var(--tsb-bg));
  --tsb-edge: color-mix(in oklab, var(--tsb-fg) 24%, var(--tsb-bg));
  --tsb-tilt-x: 46deg;
  --tsb-tilt-z: -12deg;
  --tsb-rise: -22px;
  position: fixed;
  top: 50%;
  right: 36px;
  transform: translateY(-50%);
  z-index: 40;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  user-select: none;
  -webkit-user-select: none;
}
.tsb-root[hidden] { display: none; }

.tsb-stage {
  display: grid;
  place-items: center;
  perspective: 1200px;
  filter: blur(1.4px);
  opacity: 0.72;
  transition: filter 0.4s ease, opacity 0.4s ease;
}
.tsb-root[data-awake="true"] .tsb-stage { filter: none; opacity: 1; }

.tsb-tray {
  display: grid;
  grid-template-columns: repeat(var(--tsb-cols, 3), var(--tsb-tile, 30px));
  grid-auto-rows: var(--tsb-tile, 30px);
  gap: var(--tsb-gap, 5px);
  padding: var(--tsb-pad, 10px);
  background: var(--tsb-tray);
  border-radius: 10px;
  transform: translateY(var(--tsb-rise)) rotateX(var(--tsb-tilt-x)) rotateZ(var(--tsb-tilt-z));
  transform-style: preserve-3d;
  box-shadow: 0 9px 0 var(--tsb-edge), 0 22px 30px rgba(0, 0, 0, 0.16);
  cursor: pointer;
  touch-action: none;
  outline: none;
}
.tsb-tray:focus-visible {
  box-shadow:
    0 9px 0 var(--tsb-edge),
    0 0 0 3px var(--tsb-bg),
    0 0 0 5px var(--tsb-fg);
}
.tsb-root[data-dragging="true"] .tsb-tray { cursor: grabbing; }

.tsb-tile {
  --tsb-z: 7px;
  --tsb-h: 4px;
  --tsb-lift: 0px;
  --tsb-t: color-mix(in oklab, var(--tsb-fg) 18%, var(--tsb-bg));
  --tsb-s: color-mix(in oklab, var(--tsb-fg) 38%, var(--tsb-bg));
  position: relative;
  border-radius: 6px;
  background: var(--tsb-t);
  transform: translateZ(calc(var(--tsb-z) + var(--tsb-lift)));
  box-shadow:
    0 var(--tsb-h) 0 var(--tsb-s),
    0 calc(var(--tsb-h) * 2 + 2px) 6px rgba(0, 0, 0, 0.2);
  transition:
    transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 0.25s cubic-bezier(0.2, 0.8, 0.2, 1),
    background-color 0.3s ease;
}
.tsb-tile[data-alt="true"] {
  --tsb-t: color-mix(in oklab, var(--tsb-fg) 27%, var(--tsb-bg));
  --tsb-s: color-mix(in oklab, var(--tsb-fg) 46%, var(--tsb-bg));
}
.tsb-tile[data-state="done"] {
  --tsb-z: 2px;
  --tsb-h: 1px;
  --tsb-t: color-mix(in oklab, var(--tsb-fg) 68%, var(--tsb-bg));
  --tsb-s: color-mix(in oklab, var(--tsb-fg) 82%, var(--tsb-bg));
}
.tsb-tile[data-state="done"][data-alt="true"] {
  --tsb-t: color-mix(in oklab, var(--tsb-fg) 56%, var(--tsb-bg));
  --tsb-s: color-mix(in oklab, var(--tsb-fg) 72%, var(--tsb-bg));
}
.tsb-tile[data-state="now"] {
  --tsb-z: 16px;
  --tsb-h: 8px;
  --tsb-s: var(--tsb-fg);
  background: linear-gradient(
    90deg,
    var(--tsb-fg) var(--tsb-fill, 0%),
    color-mix(in oklab, var(--tsb-fg) 78%, var(--tsb-bg)) var(--tsb-fill, 0%)
  );
}
.tsb-tile[data-hot="true"] { --tsb-lift: 10px; }

.tsb-tile[data-start="true"]::after {
  content: "";
  position: absolute;
  top: 6px;
  left: 6px;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: color-mix(in oklab, var(--tsb-fg) 52%, var(--tsb-bg));
}
.tsb-tile[data-state="done"][data-start="true"]::after {
  background: color-mix(in oklab, var(--tsb-bg) 66%, var(--tsb-fg));
}
.tsb-tile[data-state="now"][data-start="true"]::after { background: var(--tsb-bg); }

.tsb-caption {
  position: relative;
  z-index: 1;
  margin: 6px 0 0;
  display: flex;
  gap: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1.3;
  color: color-mix(in oklab, var(--tsb-fg) 58%, var(--tsb-bg));
  opacity: 0.7;
  transition: opacity 0.4s ease;
}
.tsb-root[data-awake="true"] .tsb-caption { opacity: 1; }
.tsb-caption-name { color: var(--tsb-fg); }
.tsb-caption-pct { font-variant-numeric: tabular-nums; }

.tsb-hint {
  /* Absolute, not in flow: in flow it pushes the tray off the centre line, and
     it only fades out, so the tray would sit high for the life of the page. */
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  width: max-content;
  max-width: 15rem;
  margin: 0;
  padding: 0.65rem 0.8rem;
  border-radius: 8px;
  background: color-mix(in oklab, var(--tsb-fg) 7%, var(--tsb-bg));
  color: var(--tsb-fg);
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.4;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1), 0 0 0 1px var(--tsb-edge);
  transition: opacity 0.4s ease;
}
.tsb-hint[data-gone="true"] { opacity: 0; pointer-events: none; }

.tsb-tip {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 41;
  display: flex;
  gap: 0.5rem;
  padding: 6px 9px;
  border-radius: 6px;
  background: var(--color-foreground, #1a1a1a);
  color: var(--color-background, #ececec);
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  font-size: 0.8125rem;
  font-weight: 500;
  line-height: 1;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease;
}
.tsb-tip[data-on="true"] { opacity: 1; }
.tsb-tip-pct {
  color: color-mix(in oklab, var(--color-background, #ececec) 62%, var(--color-foreground, #1a1a1a));
  font-variant-numeric: tabular-nums;
}

.tsb-root[data-compact="true"] {
  --tsb-tilt-x: 48deg;
  --tsb-tilt-z: -6deg;
  --tsb-rise: -4px;
  top: auto;
  right: auto;
  left: 50%;
  bottom: 12px;
  transform: translateX(-50%);
  max-width: calc(100vw - 24px);
  padding: 10px 14px 8px;
  border-radius: 16px;
  background: color-mix(in oklab, var(--tsb-bg) 94%, transparent);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.12);
}
.tsb-root[data-compact="true"] .tsb-tray {
  border-radius: 8px;
  box-shadow: 0 5px 0 var(--tsb-edge), 0 12px 18px rgba(0, 0, 0, 0.14);
}
.tsb-root[data-compact="true"] .tsb-tile { border-radius: 4px; }
.tsb-root[data-compact="true"] .tsb-tile[data-start="true"]::after {
  top: 3px;
  left: 3px;
  width: 4px;
  height: 4px;
}
.tsb-root[data-compact="true"] .tsb-hint {
  top: auto;
  right: auto;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  max-width: min(20rem, 70vw);
  text-align: center;
}

[data-tsb-hide-scrollbar] {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
[data-tsb-hide-scrollbar]::-webkit-scrollbar { display: none; }

@media (prefers-reduced-motion: reduce) {
  .tsb-stage,
  .tsb-tile,
  .tsb-caption,
  .tsb-tip,
  .tsb-hint {
    transition: none;
  }
}
`;export{Ot as T};
