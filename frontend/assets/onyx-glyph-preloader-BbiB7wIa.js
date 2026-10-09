import{r as h,j as o}from"./index-CdiR0C0d.js";const So={stage:"#030303",metal:"#2e2e32",shade:"#0a0a0b",rim:"#6a6a72",glitter:"#f4f4f7",ink:"#e9e9ee"},Mo=[{d:"M57 11 L26 55 H47 L41 89 L74 42 H53 Z",label:"Bolt"},{d:"M50 11 L81 22 V46 C81 66 67 80 50 89 C33 80 19 66 19 46 V22 Z M33 49 L44 60 L67 37 L73 43 L44 72 L27 55 Z",label:"Shield"},{d:"M65 33 C61 25 55 22 49 22 C40 22 34 27 34 35 C34 43 41 46 50 48 C59 50 66 53 66 62 C66 71 59 76 50 76 C43 76 37 73 33 66 M50 12 V22 M50 76 V88",stroke:9,label:"Ledger"},{d:"M41 26 L65 50 L41 74",stroke:12,label:"Forward"},{d:"M50 13 C53 40 60 47 87 50 C60 53 53 60 50 87 C47 60 40 53 13 50 C40 47 47 40 50 13 Z",label:"Spark"}],No={d:"M38 18 V44 M82 38 H56 M62 82 V56 M18 62 H44",stroke:15,label:"Onyx"},Co='"Inter Tight", "Helvetica Neue", Helvetica, Arial, system-ui, sans-serif',zo='"JetBrains Mono", "SF Mono", ui-monospace, Menlo, Consolas, monospace',fo=[[18,-24,-12],[-12,28,9],[22,16,-4],[-20,-18,14],[12,24,-16],[-10,-14,7],[16,12,-9],[-16,20,5]],Ro=[[22,64,2,13,-2],[31,38,1.5,17,-9],[44,72,2.5,15,-4],[52,30,1.5,19,-12],[61,58,2,14,-7],[70,42,1.5,16,-1],[77,68,2,18,-14],[38,52,1,12,-5],[57,80,1.5,20,-10],[66,24,1,15,-3],[27,28,1,21,-16],[48,46,1,13,-8]],Q=a=>a<=0?0:a>=1?1:a,ao=[[0,0],[.24,.31],[.34,.34],[.62,.72],[.71,.74],[1,1]];function Lo(a){if(a<=0)return 0;if(a>=1)return 1;for(let t=0;t<ao.length-1;t++){const e=ao[t],p=ao[t+1];if(a<=p[0]){const i=(a-e[0])/(p[0]-e[0]),c=1-Math.pow(1-i,3);return e[1]+(p[1]-e[1])*c}}return 1}function To(a,t,e){return Q(Q(a)*e-t)}function Ao(a,t){return Math.min(t,Math.floor(Q(a)*t+1e-9))}function Eo(a,t){const e=(-90+360/t*a)*Math.PI/180;return{x:Math.round(Math.cos(e)*1e4)/1e4,y:Math.round(Math.sin(e)*1e4)/1e4}}function so(a){let t=a>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}const _=512;function A(a){const t=document.createElement("canvas");return t.width=a,t.height=a,t}function E(a){const t=a.getContext("2d");if(!t)throw new Error("no 2d context");return t}function mo(a,t,e){a.beginPath(),a.moveTo(e,0),a.arcTo(t,0,t,t,e),a.arcTo(t,t,0,t,e),a.arcTo(0,t,0,0,e),a.arcTo(0,0,t,0,e),a.closePath()}function ro(a,t,e,p,i,c){a.fillStyle=i;for(let r=0;r<p;r++){const b=t()*e,l=t()*e,x=t(),m=.4+.6*(1-(b+l)/(2*e));a.globalAlpha=c*m*(x*x*.9+.04);const k=x>.99?2.4:x>.92?1.6:1;a.fillRect(b,l,k,k)}a.globalAlpha=1}function Fo(a){const t=A(_),e=E(t),p=_*.66/100;e.setTransform(p,0,0,p,_*.17,_*.17);const i=new Path2D(a.d);return e.fillStyle="#fff",e.strokeStyle="#fff",a.stroke?(e.lineWidth=a.stroke,e.lineCap="round",e.lineJoin="round",e.stroke(i)):e.fill(i,"evenodd"),t}function no(a,t,e,p,i){const c=so(i),r=_,b=A(r),l=E(b);mo(l,r,r*.2),l.clip();const x=l.createLinearGradient(0,0,r,r);x.addColorStop(0,e.metal),x.addColorStop(.62,e.shade),x.addColorStop(1,e.shade),l.fillStyle=x,l.fillRect(0,0,r,r);const m=l.createRadialGradient(r*.26,r*.2,0,r*.26,r*.2,r*.85);if(m.addColorStop(0,"rgba(255,255,255,0.11)"),m.addColorStop(1,"rgba(255,255,255,0)"),l.fillStyle=m,l.fillRect(0,0,r,r),ro(l,c,r,14e3,"#000",.5),ro(l,c,r,Math.round(16e3*p),e.glitter,.95),a){const F=Fo(a),X=A(r),O=E(X);O.fillStyle="#fff",O.fillRect(0,0,r,r),O.globalCompositeOperation="destination-out",O.drawImage(F,0,0);const G=A(r),f=E(G);if(f.drawImage(F,0,0),f.globalCompositeOperation="source-in",t==="cut")f.fillStyle=e.stage,f.fillRect(0,0,r,r);else{const M=f.createLinearGradient(0,0,r,r);M.addColorStop(0,"#030304"),M.addColorStop(1,"#131315"),f.fillStyle=M,f.fillRect(0,0,r,r),f.globalCompositeOperation="source-atop",ro(f,c,r,Math.round(2400*p),e.glitter,.4)}f.globalCompositeOperation="source-atop";const z=(M,H,Y,$)=>{f.shadowColor=M,f.shadowBlur=H,f.shadowOffsetX=Y+r*3,f.shadowOffsetY=$,f.drawImage(X,-r*3,0)};t==="cut"?(z("rgba(0,0,0,1)",6,0,7),z("rgba(150,150,160,0.55)",5,-3,-9),z("rgba(255,255,255,0.35)",1,-1,-2)):(z("rgba(0,0,0,0.95)",9,7,10),z("rgba(0,0,0,0.8)",2,2,3),z("rgba(255,255,255,0.24)",2,-2,-3)),f.shadowColor="transparent",l.drawImage(G,0,0);const d=A(r),v=E(d);v.shadowColor="rgba(255,255,255,0.22)",v.shadowBlur=2,v.shadowOffsetX=r*3+1.5,v.shadowOffsetY=2,v.drawImage(F,-r*3,0),v.globalCompositeOperation="destination-out",v.shadowColor="transparent",v.drawImage(F,0,0),l.drawImage(d,0,0)}const k=l.createLinearGradient(0,0,r,r);return k.addColorStop(0,"rgba(255,255,255,0.34)"),k.addColorStop(.45,"rgba(255,255,255,0.03)"),k.addColorStop(1,"rgba(255,255,255,0.18)"),l.lineWidth=r*.028,l.strokeStyle=k,mo(l,r,r*.2),l.stroke(),b}function uo(a,t){const p=A(256),i=E(p),c=so(a);for(let r=0;r<t;r++){const b=c()*256,l=c()*256,x=c(),m=.35+x*.75,k=i.createRadialGradient(b,l,0,b,l,m*2);k.addColorStop(0,"rgba(255,255,255,"+(.55+x*.45).toFixed(2)+")"),k.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=k,i.fillRect(b-m*3,l-m*3,m*6,m*6),x>.94&&(i.fillStyle="rgba(255,255,255,0.5)",i.fillRect(b-m*5,l-.3,m*10,.6),i.fillRect(b-.3,l-m*5,.6,m*10))}return p}function Oo(){const t=A(160),e=E(t),p=e.createImageData(160,160),i=so(7);for(let c=0;c<p.data.length;c+=4){const r=Math.round(i()*255);p.data[c]=r,p.data[c+1]=r,p.data[c+2]=r,p.data[c+3]=34}return e.putImageData(p,0,0),t}const P=a=>'url("'+a.toDataURL("image/webp",.92)+'")';function Zo(a,t,e,p,i){return{faces:a.map((c,r)=>P(no(c,"deboss",p,i,101+r*17))),hero:P(no(t,e,p,i,977)),back:P(no(null,"deboss",p,i,1301)),glitA:P(uo(11,Math.round(110*Math.max(.2,i)))),glitB:P(uo(29,Math.round(110*Math.max(.2,i)))),grain:P(Oo())}}const Do=`
.ogp-root {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: var(--ogp-stage);
  color: var(--ogp-ink);
  font-family: var(--ogp-display);
  --ogp-t: calc(var(--ogp-u) * 0.18);
  --ogp-r: calc(var(--ogp-u) * 0.245);
  --ogp-h: calc(var(--ogp-u) * 0.32);
  --ogp-bar: max(38px, calc(var(--ogp-u) * 0.085));
  -webkit-tap-highlight-color: transparent;
}
.ogp-gate *, .ogp-gate *::before, .ogp-gate *::after { box-sizing: border-box; }
.ogp-dest {
  position: absolute;
  inset: 0;
  overflow-y: auto;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.8s ease 0.2s;
}
.ogp-dest[data-active="true"] { opacity: 1; pointer-events: auto; }

.ogp-gate {
  position: absolute;
  inset: 0;
  z-index: 10;
  background: var(--ogp-stage);
  cursor: pointer;
  outline: none;
  user-select: none;
  -webkit-user-select: none;
  transition: opacity 0.9s cubic-bezier(0.7, 0, 0.3, 1) 0.15s;
}
.ogp-gate:focus-visible .ogp-frame { box-shadow: inset 0 0 0 1px var(--ogp-rim); }
.ogp-root[data-phase="lift"] .ogp-gate { opacity: 0; pointer-events: none; }

/* ---- light ---- */
.ogp-spot {
  position: absolute;
  inset: -20%;
  pointer-events: none;
  background: radial-gradient(
    closest-side at calc(50% + var(--ogp-mx) * 4%) calc(46% + var(--ogp-my) * 4%),
    rgba(255, 255, 255, 0.075),
    rgba(255, 255, 255, 0.02) 55%,
    transparent 100%
  );
  opacity: 0;
  animation: ogp-fade-in 2.4s ease 0.2s forwards;
}
.ogp-cone {
  position: absolute;
  left: 50%;
  top: -10%;
  width: calc(var(--ogp-u) * 1.1);
  height: 75%;
  transform: translateX(-50%);
  pointer-events: none;
  background: conic-gradient(from 180deg at 50% 0%, transparent 162deg, rgba(255, 255, 255, 0.05) 180deg, transparent 198deg);
  filter: blur(18px);
  opacity: 0;
  transition: opacity 1.4s ease;
}
.ogp-root[data-phase="forge"] .ogp-cone, .ogp-root[data-phase="reveal"] .ogp-cone { opacity: 1; }
.ogp-vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse at 50% 46%, transparent 38%, rgba(0, 0, 0, 0.75) 100%);
}
.ogp-grain {
  position: absolute;
  inset: -50%;
  pointer-events: none;
  opacity: 0.55;
  mix-blend-mode: overlay;
  background-image: var(--ogp-grain);
  background-size: 160px 160px;
  animation: ogp-grain 0.9s steps(6) infinite;
}
.ogp-dust { position: absolute; inset: 0; pointer-events: none; }
.ogp-mote {
  position: absolute;
  border-radius: 50%;
  background: var(--ogp-glitter);
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.6);
  opacity: 0;
  animation: ogp-drift linear infinite;
}

/* ---- camera ---- */
.ogp-cam {
  position: absolute;
  inset: 0;
  perspective: calc(var(--ogp-u) * 2.2);
  perspective-origin: 50% 48%;
}
.ogp-rig {
  position: absolute;
  left: 50%;
  top: 48%;
  width: 0;
  height: 0;
  transform-style: preserve-3d;
  transform: rotateX(calc(var(--ogp-my) * -11deg)) rotateY(calc(var(--ogp-mx) * 14deg));
}
.ogp-ring {
  position: absolute;
  transform-style: preserve-3d;
  animation: ogp-spin var(--ogp-spin) linear infinite;
}
.ogp-slot {
  position: absolute;
  left: calc(var(--ogp-t) * -0.5);
  top: calc(var(--ogp-t) * -0.5);
  width: var(--ogp-t);
  height: var(--ogp-t);
  transform-style: preserve-3d;
  transform: translate3d(calc(var(--x) * var(--ogp-r)), calc(var(--y) * var(--ogp-r)), 0);
  transition: transform 1.25s cubic-bezier(0.65, 0, 0.25, 1);
  transition-delay: calc(var(--i) * 70ms);
}
.ogp-root[data-phase="forge"] .ogp-slot,
.ogp-root[data-phase="reveal"] .ogp-slot,
.ogp-root[data-phase="lift"] .ogp-slot {
  transform: translate3d(0, 0, calc(var(--ogp-u) * -0.12)) rotateZ(180deg) scale(0.55);
}
.ogp-counter, .ogp-bob, .ogp-tile, .ogp-hero, .ogp-hero-turn, .ogp-hero-bob {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
}
.ogp-counter { animation: ogp-spin var(--ogp-spin) linear infinite reverse; }
.ogp-bob { animation: ogp-bob 5.5s ease-in-out infinite alternate; }
.ogp-tile {
  --ogp-hz: 0;
  transform: translateZ(calc(var(--ogp-hz) * var(--ogp-t) * 0.28))
    rotateX(calc(var(--rx) * (1 - var(--ogp-hz) * 0.7)))
    rotateY(calc(var(--ry) * (1 - var(--ogp-hz) * 0.7)))
    rotateZ(var(--rz));
  transition: transform 0.6s cubic-bezier(0.2, 0.9, 0.25, 1.15);
}
.ogp-tile:hover { --ogp-hz: 1; }

/* the stack that gives each tile its thickness */
.ogp-layer, .ogp-face {
  position: absolute;
  inset: 0;
  border-radius: 20%;
}
.ogp-layer {
  transform: translateZ(calc(var(--ogp-t) * var(--ogp-depth) * var(--k) * -1));
  background: linear-gradient(215deg, #26262a 0%, #08080a 42%, #121214 66%, var(--ogp-rim) 100%);
}
.ogp-hero .ogp-layer { transform: translateZ(calc(var(--ogp-h) * var(--ogp-depth) * var(--k) * -1)); }
.ogp-face {
  overflow: hidden;
  background-color: var(--ogp-shade);
  background-image: linear-gradient(135deg, var(--ogp-metal), var(--ogp-shade) 62%);
  background-size: 100% 100%;
  filter: blur(0px) brightness(calc(0.3 + var(--ogp-lit) * 0.7));
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.05);
}
.ogp-glit {
  position: absolute;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: screen;
  background-size: 55% 55%;
  background-repeat: repeat;
}
.ogp-glit-a {
  background-image: var(--ogp-glit-a);
  opacity: calc(0.08 + (0.5 + var(--ogp-mx) * 0.5) * (0.35 + var(--ogp-lit) * 0.55));
  background-position: calc(var(--ox) + var(--ogp-mx) * 6px) calc(var(--oy) + var(--ogp-my) * 6px);
}
.ogp-glit-b {
  background-image: var(--ogp-glit-b);
  opacity: calc(0.08 + (0.5 - var(--ogp-mx) * 0.5) * (0.35 + var(--ogp-lit) * 0.55));
  background-position: calc(var(--oy) - var(--ogp-mx) * 6px) calc(var(--ox) - var(--ogp-my) * 6px);
}
.ogp-sheen {
  position: absolute;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: screen;
  background: radial-gradient(
    circle at calc(30% - var(--ogp-mx) * 28%) calc(24% - var(--ogp-my) * 28%),
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.04) 38%,
    transparent 62%
  );
  opacity: calc(0.35 + var(--ogp-lit) * 0.5);
  transition: opacity 0.4s ease;
}
.ogp-tile:hover .ogp-sheen { opacity: 1; }
.ogp-sweep {
  position: absolute;
  inset: -40%;
  pointer-events: none;
  mix-blend-mode: screen;
  background: linear-gradient(115deg, transparent 42%, rgba(255, 255, 255, 0.28) 50%, transparent 58%);
  transform: translateX(-70%);
  opacity: 0;
}
.ogp-tile[data-lit="1"] .ogp-sweep { animation: ogp-sweep 1.1s cubic-bezier(0.3, 0, 0.2, 1) forwards; }
.ogp-tile:hover .ogp-sweep { animation: ogp-sweep 0.9s cubic-bezier(0.3, 0, 0.2, 1) forwards; }

/* the orbit racks in from soft focus, and dissolves into the hero */
.ogp-leaf { animation: ogp-rack 1.6s cubic-bezier(0.2, 0.7, 0.2, 1) backwards; animation-delay: calc(0.15s + var(--i) * 0.14s); }
.ogp-slot .ogp-leaf { transition: opacity 0.7s ease; }
.ogp-root[data-phase="forge"] .ogp-slot .ogp-leaf,
.ogp-root[data-phase="reveal"] .ogp-slot .ogp-leaf,
.ogp-root[data-phase="lift"] .ogp-slot .ogp-leaf {
  opacity: 0;
  transition-delay: calc(0.75s + var(--i) * 60ms);
}

/* ---- the hero tile ---- */
.ogp-hero {
  left: calc(var(--ogp-h) * -0.5);
  top: calc(var(--ogp-h) * -0.5);
  right: auto;
  bottom: auto;
  width: var(--ogp-h);
  height: var(--ogp-h);
  transform: translateZ(calc(var(--ogp-u) * -0.5)) scale(0.4);
  transition: transform 1.7s cubic-bezier(0.16, 1, 0.3, 1) 0.55s;
  pointer-events: none;
}
.ogp-hero .ogp-leaf { animation: none; opacity: 0; transition: opacity 0.6s ease 0.6s; }
.ogp-hero-turn {
  transform: rotateY(-180deg) rotateZ(-30deg);
  transition: transform 1.9s cubic-bezier(0.22, 1, 0.36, 1) 0.6s;
}
.ogp-hero-bob { animation: ogp-bob 6s ease-in-out infinite alternate; }
.ogp-root[data-phase="reveal"] .ogp-hero, .ogp-root[data-phase="forge"] .ogp-hero {
  transform: translateZ(0) scale(1);
  pointer-events: auto;
}
.ogp-root[data-phase="reveal"] .ogp-hero-turn, .ogp-root[data-phase="forge"] .ogp-hero-turn { transform: rotateX(14deg) rotateY(-20deg) rotateZ(-4deg); }
.ogp-root[data-phase="reveal"] .ogp-hero .ogp-leaf,
.ogp-root[data-phase="forge"] .ogp-hero .ogp-leaf,
.ogp-root[data-phase="lift"] .ogp-hero .ogp-leaf { opacity: 1; }
.ogp-root[data-phase="lift"] .ogp-hero {
  transform: translateZ(calc(var(--ogp-u) * 1.6)) scale(1.3);
  transition: transform 1.1s cubic-bezier(0.7, 0, 0.84, 0);
}
.ogp-root[data-phase="lift"] .ogp-hero-turn { transform: rotateX(14deg) rotateY(-20deg) rotateZ(-4deg); transition: none; }
.ogp-face-front { transform: translateZ(0.5px); backface-visibility: hidden; -webkit-backface-visibility: hidden; }
.ogp-face-back {
  transform: translateZ(calc(var(--ogp-h) * var(--ogp-depth) * -1 - 0.5px)) rotateY(180deg);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}
.ogp-root[data-phase="reveal"] .ogp-hero .ogp-sweep { animation: ogp-sweep 1.6s cubic-bezier(0.3, 0, 0.2, 1) 0.2s forwards; }
.ogp-hero .ogp-tile:hover .ogp-sweep { animation: ogp-sweep 1.1s cubic-bezier(0.3, 0, 0.2, 1) forwards; }
.ogp-hero .ogp-tile { --ogp-lit: 1; transform: none; }
.ogp-hero .ogp-tile:hover { transform: translateZ(calc(var(--ogp-h) * 0.12)); }

.ogp-flash {
  position: absolute;
  left: 50%;
  top: 48%;
  width: calc(var(--ogp-u) * 0.9);
  height: calc(var(--ogp-u) * 0.9);
  margin: calc(var(--ogp-u) * -0.45) 0 0 calc(var(--ogp-u) * -0.45);
  border-radius: 50%;
  pointer-events: none;
  background: radial-gradient(closest-side, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.05) 45%, transparent);
  opacity: 0;
  transform: scale(0.3);
}
.ogp-root[data-phase="forge"] .ogp-flash { animation: ogp-flash 1.6s cubic-bezier(0.2, 0.7, 0.2, 1) 0.8s both; }

/* ---- wordmark ---- */
.ogp-title {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(48% + var(--ogp-h) * 0.5 + var(--ogp-u) * 0.075);
  text-align: center;
  pointer-events: none;
}
.ogp-word {
  display: inline-block;
  margin: 0;
  font-size: max(22px, calc(var(--ogp-u) * 0.062));
  font-weight: 600;
  letter-spacing: 0.42em;
  text-indent: 0.42em;
  line-height: 1;
  text-transform: uppercase;
  white-space: nowrap;
}
.ogp-letter {
  display: inline-block;
  color: transparent;
  background: linear-gradient(180deg, var(--ogp-ink) 10%, #8a8a92 62%, #3d3d42 100%);
  -webkit-background-clip: text;
  background-clip: text;
  opacity: 0;
  filter: blur(10px);
  transform: translateY(0.25em);
}
.ogp-root[data-phase="reveal"] .ogp-letter, .ogp-root[data-phase="lift"] .ogp-letter {
  animation: ogp-letter 1.1s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
}
.ogp-caption {
  margin: calc(var(--ogp-u) * 0.024) 0 0;
  font-family: var(--ogp-mono);
  font-size: max(10px, calc(var(--ogp-u) * 0.016));
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: #8b8b93;
  opacity: 0;
  transition: opacity 1s ease 0.9s, letter-spacing 1.6s cubic-bezier(0.2, 0.7, 0.2, 1) 0.9s;
}
.ogp-root[data-phase="reveal"] .ogp-caption { opacity: 1; letter-spacing: 0.44em; }

/* ---- letterbox + HUD ---- */
.ogp-bar {
  position: absolute;
  left: 0;
  right: 0;
  height: var(--ogp-bar);
  z-index: 3;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0 clamp(16px, 4vw, 44px);
  font-family: var(--ogp-mono);
  font-size: max(9px, calc(var(--ogp-u) * 0.0145));
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #74747c;
  white-space: nowrap;
  transition: transform 1s cubic-bezier(0.7, 0, 0.3, 1);
}
.ogp-bar-top { top: 0; transform: translateY(-100%); animation: ogp-bar-in 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; }
.ogp-bar-bot { bottom: 0; transform: translateY(100%); animation: ogp-bar-in 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.1s forwards; }
.ogp-root[data-phase="lift"] .ogp-bar-top { animation: none; transform: translateY(-100%); }
.ogp-root[data-phase="lift"] .ogp-bar-bot { animation: none; transform: translateY(100%); }
.ogp-bar b { font-weight: 500; color: var(--ogp-ink); }
.ogp-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 10px;
  border-radius: 50%;
  background: #d8d8de;
  vertical-align: 1px;
  animation: ogp-blink 1.2s steps(2) infinite;
}
.ogp-root[data-phase="reveal"] .ogp-dot { animation: none; background: var(--ogp-ink); box-shadow: 0 0 8px rgba(255, 255, 255, 0.6); }
.ogp-track {
  position: relative;
  flex: 1;
  max-width: 420px;
  height: 1px;
  background: rgba(255, 255, 255, 0.12);
}
.ogp-fill {
  position: absolute;
  inset: 0;
  background: var(--ogp-ink);
  transform-origin: 0 50%;
  transform: scaleX(var(--ogp-p));
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}
.ogp-ticks { position: absolute; inset: -3px 0; display: flex; justify-content: space-between; }
.ogp-ticks i { width: 1px; height: 7px; background: rgba(255, 255, 255, 0.25); }
.ogp-pct { min-width: 4.6em; text-align: right; font-variant-numeric: tabular-nums; }
.ogp-pct b { font-size: 1.5em; letter-spacing: 0.08em; }
.ogp-hide-sm { display: inline; }
.ogp-hint { animation: ogp-blink 1.6s ease-in-out infinite; color: var(--ogp-ink); }
.ogp-frame { position: absolute; inset: 0; pointer-events: none; }
.ogp-veil {
  position: absolute;
  inset: 0;
  z-index: 5;
  background: var(--ogp-stage);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.65s ease;
}
.ogp-veil[data-on="true"] { opacity: 1; }
.ogp-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

@keyframes ogp-spin { to { transform: rotateZ(360deg); } }
@keyframes ogp-bob {
  from { transform: translate3d(0, calc(var(--ogp-u) * -0.008), calc(var(--ogp-u) * -0.012)); }
  to { transform: translate3d(0, calc(var(--ogp-u) * 0.008), calc(var(--ogp-u) * 0.02)); }
}
/* no "to": each leaf settles onto its own resting filter */
@keyframes ogp-rack {
  from { opacity: 0; filter: blur(14px) brightness(0.2); }
}
@keyframes ogp-sweep {
  0% { transform: translateX(-70%); opacity: 1; }
  100% { transform: translateX(70%); opacity: 1; }
}
@keyframes ogp-flash {
  0% { opacity: 0; transform: scale(0.3); }
  35% { opacity: 1; }
  100% { opacity: 0; transform: scale(1.4); }
}
@keyframes ogp-letter { to { opacity: 1; filter: blur(0); transform: none; } }
@keyframes ogp-bar-in { to { transform: none; } }
@keyframes ogp-blink { 50% { opacity: 0.35; } }
@keyframes ogp-fade-in { to { opacity: 1; } }
@keyframes ogp-grain {
  0% { transform: translate(0, 0); }
  20% { transform: translate(-7%, 4%); }
  40% { transform: translate(5%, -6%); }
  60% { transform: translate(-3%, -9%); }
  80% { transform: translate(8%, 3%); }
  100% { transform: translate(-5%, 7%); }
}
@keyframes ogp-drift {
  0% { opacity: 0; transform: translate3d(0, 0, 0); }
  20% { opacity: 0.7; }
  80% { opacity: 0.5; }
  100% { opacity: 0; transform: translate3d(calc(var(--ogp-u) * 0.05), calc(var(--ogp-u) * -0.22), 0); }
}

.ogp-root svg, .ogp-root canvas, .ogp-root img { max-width: none; }

@media (max-width: 520px) {
  .ogp-hide-sm { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .ogp-ring, .ogp-counter, .ogp-bob, .ogp-hero-bob { animation: none; }
  .ogp-grain { animation: none; }
  .ogp-dust { display: none; }
  .ogp-leaf { animation: none; }
  .ogp-sweep { display: none; }
  .ogp-flash { display: none; }
  .ogp-slot { transition: none; }
  .ogp-hero, .ogp-hero-turn { transition: opacity 0.4s ease; }
  .ogp-hero-turn { transform: none; }
  .ogp-root[data-phase="lift"] .ogp-hero { transform: translateZ(0) scale(1); transition: none; }
  .ogp-letter { filter: none; transform: none; }
  .ogp-root[data-phase="reveal"] .ogp-letter, .ogp-root[data-phase="lift"] .ogp-letter { animation: none; opacity: 1; }
  .ogp-tile { transition: none; }
}
`,Po=2300,Yo=3200,Io=1200,_o=700,Xo=9,Go=14;function ho({layers:a,faceStyle:t,back:e,children:p}){return o.jsxs(o.Fragment,{children:[Array.from({length:a},(i,c)=>o.jsx("span",{className:"ogp-layer ogp-leaf",style:{"--k":((c+1)/a).toFixed(3)}},c)),e?o.jsx("span",{className:"ogp-face ogp-face-back ogp-leaf",style:e}):null,o.jsx("span",{className:"ogp-face ogp-leaf"+(e?" ogp-face-front":""),style:t,children:p})]})}function Bo({children:a,loop:t=!1,progress:e,durationMs:p=4200,glyphs:i=Mo,mark:c=No,markStyle:r="cut",word:b="Onyx",caption:l="Every tool, one mark",palette:x,glitter:m=1,depth:k=.12,spin:F=48,hud:X=!1,fontFamily:O=Co,height:G="100svh",onComplete:f,className:z=""}){var go;const[d,v]=h.useState("load"),[M,H]=h.useState(0),[Y,$]=h.useState(0),[B,oo]=h.useState(!1),[u,bo]=h.useState(null),[vo,xo]=h.useState(640),I=h.useRef(null),io=h.useRef([]),eo=h.useRef(null),U=h.useRef(!1),po=h.useRef(e);po.current=e;const V=h.useRef(f);V.current=f;const R={...So,...x},Z=Math.max(1,i.length),K=Ao(M/100,Z),q=i[Math.min(Z-1,K)],yo=JSON.stringify([i,c,r,R,m]);h.useEffect(()=>{try{bo(Zo(i,c,r,R,Math.max(0,m)))}catch{}},[yo]),h.useEffect(()=>{const n=I.current;if(!n)return;const s=()=>{const y=n.getBoundingClientRect(),w=Math.min(y.width,y.height);w>0&&xo(Math.round(w))};if(s(),typeof ResizeObserver>"u")return;const g=new ResizeObserver(s);return g.observe(n),()=>g.disconnect()},[]),h.useEffect(()=>{const n=I.current;if(!n)return;const s=typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches;let g=0,y=0,w=0;const L=performance.now(),T=D=>{const j=eo.current;let N=0,S=0;if(j)N=j.x,S=j.y;else if(!s){const C=(D-L)/1e3;N=Math.sin(C*.45)*.5,S=Math.sin(C*.31+1.2)*.32}y+=(N-y)*.07,w+=(S-w)*.07,n.style.setProperty("--ogp-mx",y.toFixed(4)),n.style.setProperty("--ogp-my",w.toFixed(4)),g=requestAnimationFrame(T)};return g=requestAnimationFrame(T),()=>cancelAnimationFrame(g)},[]),h.useEffect(()=>{if(d!=="load")return;const n=I.current;let s=0,g=0,y=performance.now();const w=y;let L=-1;U.current=!1;const T=j=>{n==null||n.style.setProperty("--ogp-p",j.toFixed(4)),io.current.forEach((S,C)=>{if(!S)return;const W=To(j,C,Z);S.style.setProperty("--ogp-lit",(1-Math.pow(1-W,2)).toFixed(3)),S.dataset.lit=W>=1?"1":"0"});const N=Math.round(j*100);N!==L&&(L=N,H(N))},D=j=>{const N=Math.min(64,j-y);y=j;const S=po.current;let C=S!==void 0?Q(S/100):Lo((j-w)/Math.max(400,p));U.current&&(C=1);const W=U.current?.12:S!==void 0?.1:1;if(g+=(C-g)*Math.min(1,W*(N/16.7)),C-g<.002&&(g=C),T(g),g>=1){v("forge");return}s=requestAnimationFrame(D)};return T(0),s=requestAnimationFrame(D),()=>cancelAnimationFrame(s)},[d,Y,p,Z]),h.useEffect(()=>{if(d==="forge"){const n=setTimeout(()=>v("reveal"),Po);return()=>clearTimeout(n)}if(d==="reveal"){const n=setTimeout(()=>{t?oo(!0):v("lift")},Yo);return()=>clearTimeout(n)}if(d==="lift"){const n=setTimeout(()=>{var s;v("done"),(s=V.current)==null||s.call(V)},Io);return()=>clearTimeout(n)}},[d,t]),h.useEffect(()=>{if(!B)return;const n=setTimeout(()=>{H(0),v("load"),$(s=>s+1),oo(!1)},_o);return()=>clearTimeout(n)},[B]);const lo=()=>{B||(d==="load"?U.current=!0:d==="forge"?v("reveal"):d==="reveal"&&(t?oo(!0):v("lift")))},ko=n=>{const s=I.current;if(!s||n.pointerType==="touch")return;const g=s.getBoundingClientRect();eo.current={x:(n.clientX-g.left)/g.width*2-1,y:(n.clientY-g.top)/g.height*2-1}},wo=()=>{eo.current=null},J=d==="load",co=J?"Assembling":d==="forge"?"Forging":"Ready",jo=t?"Click to replay":"Click to enter",to=n=>n?{backgroundImage:n}:{};return o.jsxs("div",{ref:I,className:"ogp-root "+z,"data-phase":d,style:{height:G,"--ogp-u":vo+"px","--ogp-mx":0,"--ogp-my":0,"--ogp-p":0,"--ogp-lit":0,"--ogp-spin":Math.max(4,F)+"s","--ogp-depth":Math.max(0,k),"--ogp-stage":R.stage,"--ogp-metal":R.metal,"--ogp-shade":R.shade,"--ogp-rim":R.rim,"--ogp-glitter":R.glitter,"--ogp-ink":R.ink,"--ogp-display":O,"--ogp-mono":zo,"--ogp-glit-a":(u==null?void 0:u.glitA)??"none","--ogp-glit-b":(u==null?void 0:u.glitB)??"none","--ogp-grain":(u==null?void 0:u.grain)??"none"},onPointerMove:ko,onPointerLeave:wo,children:[o.jsx("style",{children:Do}),!t&&a?o.jsx("div",{className:"ogp-dest","data-active":d==="done","aria-hidden":d!=="done",children:a}):null,d!=="done"?o.jsxs("div",{className:"ogp-gate",role:"progressbar","aria-label":b+" is loading","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":M,"aria-valuetext":J?M+"%":"Loaded. Press Enter to continue.",tabIndex:0,onClick:lo,onKeyDown:n=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),lo())},children:[o.jsx("div",{className:"ogp-spot"}),o.jsx("div",{className:"ogp-cone"}),o.jsx("div",{className:"ogp-dust","aria-hidden":"true",children:Ro.map(([n,s,g,y,w],L)=>o.jsx("span",{className:"ogp-mote",style:{left:n+"%",top:s+"%",width:g,height:g,animationDuration:y+"s",animationDelay:w+"s"}},L))}),o.jsx("div",{className:"ogp-flash"}),o.jsx("div",{className:"ogp-cam","aria-hidden":"true",children:o.jsxs("div",{className:"ogp-rig",children:[o.jsx("div",{className:"ogp-ring",children:i.map((n,s)=>{const{x:g,y}=Eo(s,Z),[w,L,T]=fo[s%fo.length];return o.jsx("div",{className:"ogp-slot",style:{"--x":g,"--y":y,"--i":s},children:o.jsx("div",{className:"ogp-counter",children:o.jsx("div",{className:"ogp-bob",style:{animationDelay:-s*1.3+"s",animationDuration:4.6+s%3*.9+"s"},children:o.jsx("div",{ref:D=>{io.current[s]=D},className:"ogp-tile",title:n.label,style:{"--rx":w+"deg","--ry":L+"deg","--rz":T+"deg","--ox":s*37%100+"px","--oy":s*61%100+"px"},children:o.jsxs(ho,{layers:Xo,faceStyle:to(u==null?void 0:u.faces[s]),children:[o.jsx("i",{className:"ogp-glit ogp-glit-a"}),o.jsx("i",{className:"ogp-glit ogp-glit-b"}),o.jsx("i",{className:"ogp-sheen"}),o.jsx("i",{className:"ogp-sweep"})]})})})})},s)})}),o.jsx("div",{className:"ogp-hero",children:o.jsx("div",{className:"ogp-hero-bob",children:o.jsx("div",{className:"ogp-hero-turn",children:o.jsx("div",{className:"ogp-tile",style:{"--ox":"13px","--oy":"29px"},children:o.jsxs(ho,{layers:Go,faceStyle:to(u==null?void 0:u.hero),back:to(u==null?void 0:u.back),children:[o.jsx("i",{className:"ogp-glit ogp-glit-a"}),o.jsx("i",{className:"ogp-glit ogp-glit-b"}),o.jsx("i",{className:"ogp-sheen"}),o.jsx("i",{className:"ogp-sweep"})]})})})})})]})},Y),o.jsxs("div",{className:"ogp-title","aria-hidden":"true",children:[o.jsx("p",{className:"ogp-word",children:Array.from(b).map((n,s)=>o.jsx("span",{className:"ogp-letter",style:{animationDelay:.08+s*.07+"s"},children:n===" "?" ":n},s+n))}),l?o.jsx("p",{className:"ogp-caption",children:l}):null]}),o.jsx("div",{className:"ogp-vignette"}),o.jsx("div",{className:"ogp-grain"}),X?o.jsxs(o.Fragment,{children:[o.jsxs("div",{className:"ogp-bar ogp-bar-top","aria-hidden":"true",children:[o.jsxs("span",{children:[o.jsx("span",{className:"ogp-dot"}),o.jsx("b",{children:b}),o.jsxs("span",{className:"ogp-hide-sm",children:[" — ",co]})]}),o.jsx("span",{children:J?o.jsxs(o.Fragment,{children:[o.jsx("span",{className:"ogp-hide-sm",children:q!=null&&q.label?q.label+" · ":""}),String(K).padStart(2,"0")," / ",String(Z).padStart(2,"0")]}):o.jsx("span",{className:d==="reveal"?"ogp-hint":"",children:d==="reveal"?jo:co})})]}),o.jsxs("div",{className:"ogp-bar ogp-bar-bot","aria-hidden":"true",children:[o.jsxs("span",{className:"ogp-hide-sm",children:["Reel ",String(Y+1).padStart(2,"0")]}),o.jsxs("span",{className:"ogp-track",children:[o.jsx("span",{className:"ogp-fill"}),o.jsxs("span",{className:"ogp-ticks",children:[i.map((n,s)=>o.jsx("i",{},s)),o.jsx("i",{})]})]}),o.jsxs("span",{className:"ogp-pct",children:[o.jsx("b",{children:String(M).padStart(3,"0")})," %"]})]})]}):null,o.jsx("div",{className:"ogp-frame"}),o.jsx("div",{className:"ogp-veil","data-on":B}),o.jsx("span",{className:"ogp-sr","aria-live":"polite",children:J?K>0?((go=i[K-1])==null?void 0:go.label)??"":"":b+" — "+l})]}):null]})}export{Bo as O};
