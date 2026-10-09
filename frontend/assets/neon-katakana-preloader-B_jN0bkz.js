import{r as y,j as l}from"./index-CdiR0C0d.js";const Qt={background:"#040306",glow:"#22c8ff",core:"#cdf6ff",accent:"#ff2742",haze:"#5c0820"},$t='"Yuji Syuku", "Zen Antique", "Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", "Noto Sans JP", "Hiragino Sans", "Yu Gothic", Meiryo, "IPAGothic", "WenQuanYi Zen Hei", sans-serif',Bt='"JetBrains Mono", "IBM Plex Mono", "SFMono-Regular", Menlo, Consolas, "Liberation Mono", monospace',Gt="ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜｦﾝ0123456789",Mt=h=>h<=0?0:h>=1?1:h,Lt=[[0,0],[.3,.38],[.4,.41],[.68,.77],[.78,.8],[1,1]];function Vt(h){if(h<=0)return 0;if(h>=1)return 1;for(let c=0;c<Lt.length-1;c++){const f=Lt[c],p=Lt[c+1];if(h<=p[0]){const b=(h-f[0])/(p[0]-f[0]),i=1-Math.pow(1-b,3);return f[1]+(p[1]-f[1])*i}}return 1}function x(h){const c=Math.sin(h*127.1+311.7)*43758.5453;return c-Math.floor(c)}const te="アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン",ee="abcdefghijklmnopqrstuvwxyz0123456789#$%&@";function ne(h,c,f){const p=Array.from(h),b=Math.floor(Mt(c)*p.length+1e-9);return p.map((i,u)=>{if(u<b||i===" ")return i;const C=/[぀-ヿ一-鿿]/.test(i)?te:ee,R=C.charAt(Math.floor(x(u*31+f*7.13)*C.length));return/[A-Z]/.test(i)?R.toUpperCase():R}).join("")}function Ut(h){const c=Math.round(Math.min(100,Math.max(0,h)));return String(c).padStart(3,"0")}function ae(h,c,f,p){const b=Math.min(f*.84*100/Math.max(1,c),p*.32),i=Math.min(p*.6/Math.max(1,h),f*.42),u=h>1&&p>f*1.15&&i>b*1.25;return{size:Math.max(18,Math.round(u?i:b)),vertical:u}}function Jt(h,c){const f=Math.floor(h),p=Math.floor(c),b=h-f,i=c-p,u=b*b*(3-2*b),C=i*i*(3-2*i),R=(rt,tt)=>x(rt*57+tt*113),z=R(f,p)+(R(f+1,p)-R(f,p))*u,O=R(f,p+1)+(R(f+1,p+1)-R(f,p+1))*u;return z+(O-z)*C}function oe(h,c,f,p,b){const i=Math.max(1,Math.ceil(h)),u=Math.max(1,Math.ceil(c)),C=Array.from(f.trim()||" "),R=document.createElement("canvas");R.width=i,R.height=u;const z=R.getContext("2d",{willReadFrequently:!0});z.font="900 100px "+p;const{size:O,vertical:rt}=ae(C.length,z.measureText(C.join("")).width,i,u);z.font="900 "+O+"px "+p,z.fillStyle="#fff",z.textAlign="center",z.textBaseline="middle";const tt=u*.5;rt?C.forEach((e,a)=>z.fillText(e,i/2,tt+(a-(C.length-1)/2)*O*1.02)):z.fillText(C.join(""),i/2,tt);const At=z.getImageData(0,0,i,u).data,_=(e,a)=>e>=0&&a>=0&&e<i&&a<u&&At[(Math.round(a)*i+Math.round(e))*4+3]>110,N=Math.max(2,Math.round(O/68)),v=O*.2,K=[],ut=[];let H=i,Y=0,U=u,et=0;for(let e=0;e<u;e+=N)for(let a=0;a<i;a+=N){if(!_(a,e))continue;const M=a*7.31+e*1.97,X=.6*Jt(a/v,e/v)+.4*Jt(a/(N*2.4),e/(O*.9)),w=.98-.7*Math.min(1,Math.max(0,(X-.52)/.3));if(x(M)>w)continue;H=Math.min(H,a),Y=Math.max(Y,a),U=Math.min(U,e),et=Math.max(et,e);const mt=x(M+11),dt=!(_(a-N*2,e)&&_(a+N*2,e)&&_(a,e-N*2)&&_(a,e+N*2)),xt=[a+(x(M+13)-.5)*N*.7,e,N*(.55+.6*mt),(dt?.45:.62)+.38*x(M+3),0,30+170*x(M+5),x(M+9)];!dt&&x(M+21)<.55?ut.push(xt):K.push(xt);const gt=!_(a,e+N),jt=!_(a,e-N);if(gt&&x(M+31)<.2||jt&&x(M+37)<.08){const W=gt?1:-1,bt=2+Math.floor(Math.pow(x(M+41),2)*30);for(let Q=1;Q<=bt;Q++){const yt=1-Q/(bt+1);K.push([a,e+W*Q*N*1.7,N*.55,.55*yt*yt,0,30+170*x(M+Q),x(M+Q*3)])}}}Y<H&&(H=Y=i/2,U=et=u/2);const nt=Math.max(1,Y-H),F=Math.max(1,et-U),Rt=e=>{const a=rt?(e[1]-U)/F:(e[0]-H)/nt;return Math.min(1,.55*Mt(a)+.45*e[6])},st=K.concat(ut),A=st.length,E={n:A,hotFrom:K.length,hx:new Float32Array(A),hy:new Float32Array(A),size:new Float32Array(A),alpha:new Float32Array(A),rank:new Float32Array(A),fall:new Float32Array(A),seed:new Float32Array(A),act:new Float32Array(A).fill(-1),ox:new Float32Array(A),oy:new Float32Array(A),dx:new Float32Array(A),dy:new Float32Array(A),box:{x:H,y:U,w:nt,h:F},reach:Math.max(50,O*.42),cols:[],strands:[]};st.forEach((e,a)=>{E.hx[a]=e[0],E.hy[a]=e[1],E.size[a]=e[2],E.alpha[a]=e[3],E.rank[a]=Rt(e),E.fall[a]=e[5],E.seed[a]=e[6]});const J=11/Math.max(.05,b),kt=i/2,pt=Math.max(nt,i*.3)*.62;if(b>0)for(let e=J*.5,a=0;e<i;e+=J,a++){const M=(x(a+.5)-.5)*J*.6,X=(e-kt)/pt,w=.12+.88*Math.exp(-X*X);E.cols.push({x:Math.round(e+M)+.5,head:x(a+1.7)*u*1.4-u*.2,speed:(50+190*x(a+2.9))*(.6+w),len:30+u*.55*x(a+4.1)*(.35+w),weight:w,glyph:x(a+6.3)<.28})}const it=Math.round(10+nt/60);for(let e=0;e<it;e++){const a=x(e+90.1);E.strands.push({x:Math.round(H+nt*x(e+77.7))+.5,top:U-(.2+.9*a)*Math.min(u*.35,F*1.2),bottom:et+(.2+.9*x(e+55.5))*Math.min(u*.35,F*1.2),seed:a})}return E}function re(h,c){c.fillStyle="#000",c.fillStyle=h;const f=String(c.fillStyle);if(f.charAt(0)==="#"){const b=f.slice(1);return[parseInt(b.slice(0,2),16),parseInt(b.slice(2,4),16),parseInt(b.slice(4,6),16)]}const p=f.match(/[\d.]+/g);return p?[Number(p[0]),Number(p[1]),Number(p[2])]:[255,255,255]}const se=`
.nkp-root {
  --nkp-p: 0;
  --nkp-bx: 0px;
  --nkp-by: 0px;
  --nkp-bw: 0px;
  --nkp-bh: 0px;
  position: relative;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  container-type: size;
  background: var(--nkp-bg);
  color: var(--nkp-glow);
  font-family: var(--nkp-mono);
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  -webkit-user-select: none;
}
.nkp-root canvas { max-width: none; }

.nkp-dest {
  position: absolute;
  inset: 0;
  overflow-y: auto;
  visibility: hidden;
}
.nkp-root[data-phase="open"] .nkp-dest,
.nkp-root[data-phase="done"] .nkp-dest { visibility: visible; }

.nkp-gate {
  position: absolute;
  inset: 0;
  z-index: 2;
  overflow: hidden;
  cursor: pointer;
  outline: none;
  background: var(--nkp-bg);
}
.nkp-gate:focus-visible { box-shadow: inset 0 0 0 2px var(--nkp-accent); }
.nkp-root[data-phase="open"] .nkp-gate { animation: nkp-open 1.2s cubic-bezier(0.7, 0, 0.2, 1) forwards; }

.nkp-haze {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(ellipse 110% 70% at 50% 115%, var(--nkp-haze) 0%, transparent 72%),
    radial-gradient(ellipse 70% 34% at 50% 102%, var(--nkp-haze) 0%, transparent 80%),
    radial-gradient(ellipse 40% 60% at 0% 100%, var(--nkp-haze) 0%, transparent 70%),
    radial-gradient(ellipse 40% 60% at 100% 100%, var(--nkp-haze) 0%, transparent 70%);
  animation: nkp-breathe 6s ease-in-out infinite;
}
.nkp-halo {
  position: absolute;
  left: var(--nkp-bx);
  top: var(--nkp-by);
  width: var(--nkp-bw);
  height: var(--nkp-bh);
  pointer-events: none;
  border-radius: 50%;
  background: radial-gradient(closest-side, var(--nkp-glow), transparent);
  opacity: calc(0.03 + var(--nkp-p) * 0.11);
  filter: blur(40px);
  transform: scale(1.35, 2.2);
}
.nkp-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  filter: drop-shadow(0 0 2px var(--nkp-glow)) drop-shadow(0 0 14px var(--nkp-glow));
}
.nkp-root[data-phase="lock"] .nkp-canvas { animation: nkp-surge 1.3s ease-out both; }

.nkp-sweep {
  position: absolute;
  left: 0;
  right: 0;
  top: var(--nkp-by);
  height: 2px;
  opacity: 0;
  pointer-events: none;
  background: linear-gradient(90deg, transparent, var(--nkp-core) 30%, var(--nkp-core) 70%, transparent);
  box-shadow: 0 0 18px 3px var(--nkp-glow);
}
.nkp-root[data-phase="lock"] .nkp-sweep { animation: nkp-sweep 0.95s cubic-bezier(0.6, 0, 0.3, 1) 0.15s both; }

.nkp-scanlines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 0 1px, transparent 1px 3px);
  mix-blend-mode: overlay;
}
.nkp-roll {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 18%;
  pointer-events: none;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.025), transparent);
  animation: nkp-roll 7s linear infinite;
}
.nkp-vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse at 50% 46%, transparent 42%, rgba(0, 0, 0, 0.78) 100%);
}
.nkp-grain {
  position: absolute;
  inset: -50%;
  pointer-events: none;
  opacity: 0.1;
  mix-blend-mode: screen;
  animation: nkp-grain 0.8s steps(5) infinite;
}

/* ---- dot-matrix labels -------------------------------------------------- */
.nkp-label {
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  color: var(--nkp-accent);
  font-size: clamp(12px, 2.3cqmin, 26px);
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.6em;
  text-indent: 0.6em;
  white-space: pre;
  pointer-events: none;
  filter: drop-shadow(0 0 5px var(--nkp-accent));
  transition: opacity 0.5s ease;
}
.nkp-label-top { top: var(--nkp-by); transform: translateY(calc(-100% - max(18px, 4.5cqmin))); }
.nkp-label-bottom { top: calc(var(--nkp-by) + var(--nkp-bh)); transform: translateY(max(18px, 4.5cqmin)); }
.nkp-dots {
  display: inline-block;
  -webkit-mask-image: radial-gradient(circle, #000 0 48%, transparent 58%);
  mask-image: radial-gradient(circle, #000 0 48%, transparent 58%);
  -webkit-mask-size: 0.16em 0.16em;
  mask-size: 0.16em 0.16em;
}
.nkp-flip { display: inline-block; animation: nkp-flip 3.8s steps(1) infinite; }
.nkp-root[data-phase="release"] .nkp-label,
.nkp-root[data-phase="open"] .nkp-label { opacity: 0; }

/* ---- HUD corners -------------------------------------------------------- */
.nkp-hud {
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 10px;
  line-height: 1;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--nkp-glow);
  opacity: 0.6;
  pointer-events: none;
  white-space: nowrap;
}
.nkp-tl { top: 18px; left: 20px; }
.nkp-tr { top: 18px; right: 20px; }
.nkp-bl { bottom: 18px; left: 20px; }
.nkp-br { bottom: 18px; right: 20px; }
.nkp-led {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--nkp-accent);
  box-shadow: 0 0 8px var(--nkp-accent);
  animation: nkp-blink 1.2s steps(2) infinite;
}
.nkp-track {
  position: relative;
  width: clamp(56px, 16cqw, 200px);
  height: 1px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.14);
}
.nkp-fill {
  position: absolute;
  inset: 0;
  transform-origin: left center;
  transform: scaleX(var(--nkp-p));
  background: var(--nkp-glow);
  box-shadow: 0 0 8px var(--nkp-glow);
}
.nkp-hint { animation: nkp-blink 1.4s steps(2) infinite; }

/* ---- the window opening ------------------------------------------------- */
.nkp-frame {
  position: absolute;
  z-index: 3;
  pointer-events: none;
  border: 1px solid var(--nkp-core);
  box-shadow: 0 0 24px 2px var(--nkp-glow), inset 0 0 24px 2px var(--nkp-glow);
  animation: nkp-frame 1.2s cubic-bezier(0.7, 0, 0.2, 1) forwards;
}
.nkp-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

@keyframes nkp-open {
  0% { clip-path: polygon(evenodd, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%); }
  40% { clip-path: polygon(evenodd, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, 5% 49.6%, 95% 49.6%, 95% 50.4%, 5% 50.4%, 5% 49.6%); }
  100% { clip-path: polygon(evenodd, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 0%, -2% -2%, 102% -2%, 102% 102%, -2% 102%, -2% -2%); }
}
@keyframes nkp-frame {
  0% { inset: 50% 50%; opacity: 1; }
  40% { inset: 49.6% 5%; opacity: 1; }
  85% { inset: 0%; opacity: 0.8; }
  100% { inset: 0%; opacity: 0; }
}
@keyframes nkp-surge {
  0% { filter: brightness(2.8) drop-shadow(0 0 4px var(--nkp-glow)) drop-shadow(0 0 26px var(--nkp-glow)); }
  100% { filter: brightness(1) drop-shadow(0 0 2px var(--nkp-glow)) drop-shadow(0 0 14px var(--nkp-glow)); }
}
@keyframes nkp-sweep {
  0% { opacity: 0; transform: translateY(-8px); }
  15% { opacity: 1; }
  85% { opacity: 1; }
  100% { opacity: 0; transform: translateY(calc(var(--nkp-bh) + 8px)); }
}
@keyframes nkp-flip {
  0% { transform: none; }
  84% { transform: scaleY(-1); }
  87% { transform: scaleY(-1) translateX(3px); }
  89% { transform: none; }
  94% { transform: scaleY(-1); }
  96% { transform: none; }
}
@keyframes nkp-blink { 50% { opacity: 0.25; } }
@keyframes nkp-breathe { 50% { opacity: 0.75; } }
@keyframes nkp-roll {
  from { transform: translateY(-100%); }
  to { transform: translateY(560%); }
}
@keyframes nkp-grain {
  0% { transform: translate(0, 0); }
  20% { transform: translate(-6%, 4%); }
  40% { transform: translate(5%, -7%); }
  60% { transform: translate(-3%, 8%); }
  80% { transform: translate(7%, 2%); }
  100% { transform: translate(0, 0); }
}
@keyframes nkp-fade { to { opacity: 0; } }

@media (prefers-reduced-motion: reduce) {
  .nkp-grain { animation: none; }
  .nkp-roll { display: none; }
  .nkp-haze { animation: none; }
  .nkp-flip, .nkp-led, .nkp-hint { animation: none; }
  .nkp-root[data-phase="lock"] .nkp-canvas { animation: none; }
  .nkp-root[data-phase="lock"] .nkp-sweep { animation: none; }
  .nkp-root[data-phase="open"] .nkp-gate { animation: nkp-fade 0.6s ease forwards; }
  .nkp-frame { display: none; }
}
`,ie=1700,le=2600,ce=1200,pe=1500;function he({children:h,loop:c=!1,progress:f,durationMs:p=4200,word:b="ウィンドウ",label:i="window",caption:u="open",kicker:C="窓 / mado-os",hud:R=!0,density:z=1,interactive:O=!0,palette:rt,fontFamily:tt=$t,height:At="100svh",onComplete:_,className:N=""}){const[v,K]=y.useState("boot"),[ut,H]=y.useState(0),[Y,U]=y.useState(0),[et,nt]=y.useState(0),[F,Rt]=y.useState(!1),st=y.useRef(null),A=y.useRef(null),E=y.useRef(null),J=y.useRef(v);J.current=v;const kt=y.useRef(0),pt=y.useRef(!0),it=y.useRef(!1),e=y.useRef({until:0,next:0}),a=y.useRef({x:0,y:0,on:!1}),M=y.useRef(f);M.current=f;const X=y.useRef(_);X.current=_;const w={...Qt,...rt},mt=Math.max(0,Math.min(2,z));y.useEffect(()=>{const s=window.matchMedia("(prefers-reduced-motion: reduce)"),d=()=>Rt(s.matches);return d(),s.addEventListener("change",d),()=>s.removeEventListener("change",d)},[]),y.useEffect(()=>{const s=E.current;if(!s)return;const d=document.createElement("canvas");d.width=d.height=128;const o=d.getContext("2d");if(!o)return;const j=o.createImageData(128,128);for(let B=0;B<j.data.length;B+=4){const ht=Math.random()*255;j.data[B]=j.data[B+1]=j.data[B+2]=ht,j.data[B+3]=255}o.putImageData(j,0,0),s.style.backgroundImage="url("+d.toDataURL()+")"},[]),y.useEffect(()=>{kt.current=performance.now(),v==="boot"&&(pt.current=!0,it.current=!1),v==="lock"&&(e.current.until=performance.now()+280)},[v,ut]),y.useEffect(()=>{let s;return v==="lock"&&(s=setTimeout(()=>K(c?"release":"open"),c?le:ie)),v==="open"&&(s=setTimeout(()=>{var d;K("done"),(d=X.current)==null||d.call(X)},ce)),v==="release"&&(s=setTimeout(()=>{K("boot"),H(d=>d+1)},pe)),()=>clearTimeout(s)},[v,c]),y.useEffect(()=>{var qt;const s=st.current,d=A.current,o=d==null?void 0:d.getContext("2d");if(!s||!d||!o)return;const j=document.createElement("canvas"),B=j.getContext("2d"),ht=re(w.glow,B),St=k=>"rgba("+ht[0]+","+ht[1]+","+ht[2]+","+k.toFixed(3)+")";let lt=null,ft=0,at=0,$=1,L=0,Ct=performance.now(),Dt=performance.now(),vt=0,Ot=-1,Yt=-1,zt=!1;const Pt=()=>{const k=s.getBoundingClientRect();if(k.width<2||k.height<2)return;ft=k.width,at=k.height,$=Math.min(2,window.devicePixelRatio||1),d.width=Math.round(ft*$),d.height=Math.round(at*$),j.width=d.width,j.height=d.height,lt=oe(ft,at,b,tt,F?0:mt);const wt=performance.now(),D=J.current;for(let P=0;P<lt.n;P++)(D!=="boot"||lt.rank[P]<=L)&&(lt.act[P]=wt-5e3);const t=lt.box;s.style.setProperty("--nkp-bx",t.x+"px"),s.style.setProperty("--nkp-by",t.y+"px"),s.style.setProperty("--nkp-bw",t.w+"px"),s.style.setProperty("--nkp-bh",t.h+"px")},Tt=k=>{if(zt)return;const wt=Math.min(64,k-Dt);Dt=k;const D=J.current;if(D==="done")return;const t=lt;if(pt.current&&(pt.current=!1,L=0,Ct=k,t&&t.act.fill(-1)),D==="boot"){const g=M.current;let T=g!==void 0?Mt(g/100):Vt((k-Ct)/Math.max(600,p));it.current&&(T=1);const n=it.current?.12:g!==void 0?.08:1;L+=(T-L)*Math.min(1,n*(wt/16.7)),T-L<.002&&(L=T);const r=Math.round(L*100);r!==Ot&&(Ot=r,U(r));const m=Math.floor(k/85);m!==Yt&&(Yt=m,nt(m)),L>=1&&(J.current="lock",K("lock"))}else L=1;if(s.style.setProperty("--nkp-p",L.toFixed(4)),!t){vt=requestAnimationFrame(Tt);return}o.setTransform($,0,0,$,0,0),o.clearRect(0,0,ft,at);const P=a.current,Ft=P.on&&O&&!F,Et=k-kt.current,_t=D==="release"||D==="open",G=t.box,Kt=Ft&&P.x>G.x-20&&P.x<G.x+G.w+20&&P.y>G.y-20&&P.y<G.y+G.h+20;if(t.cols.length){const g=D==="boot"?.45+.55*L:D==="open"?Math.max(0,1-Et/700):1;o.lineWidth=1.3,o.setLineDash([1.4,2.8]),o.font="11px "+Bt,o.textAlign="center";for(let n=0;n<t.cols.length;n++){const r=t.cols[n],m=Ft&&Math.abs(r.x-P.x)<70?1-Math.abs(r.x-P.x)/70:0;r.head+=r.speed*(1+m*2.2)*(_t?1.6:1)*wt/1e3,r.head-r.len>at&&(r.head=-Math.random()*at*.4,r.len=30+at*.55*Math.random()*(.35+r.weight));const S=r.head-r.len,I=Math.min(1,(r.weight*.6+m*.4)*g);if(I<.01)continue;const q=o.createLinearGradient(0,S,0,r.head);if(q.addColorStop(0,St(0)),q.addColorStop(1,St(I)),o.strokeStyle=q,o.beginPath(),o.moveTo(r.x,S),o.lineTo(r.x,r.head),o.stroke(),o.fillStyle=w.core,o.globalAlpha=Math.min(1,I*1.4),r.glyph){const Z=Gt.charAt(Math.floor(k/110+n*7)%Gt.length);o.fillText(Z,r.x,r.head+4)}else o.fillRect(r.x-1.1,r.head-1.1,2.2,2.2);o.globalAlpha=1}const T=.24*L*g;if(T>.01){o.lineWidth=1,o.setLineDash([1.2,3.6]);for(const n of t.strands)o.strokeStyle=St(T*(.5+.5*Math.sin(k*.002+n.seed*40))),o.lineDashOffset=-k*.02*(.5+n.seed),o.beginPath(),o.moveTo(n.x,n.top),o.lineTo(n.x,n.bottom),o.stroke();o.lineDashOffset=0}o.setLineDash([])}const Zt=D==="boot"?L:1,ot=t.reach;for(let g=0;g<t.n;g++){D==="boot"&&t.act[g]<0&&t.rank[g]<=Zt&&(t.act[g]=k);let T=0,n=0;if(Ft){const r=t.hx[g]-P.x,m=t.hy[g]-P.y;if(r>-ot&&r<ot&&m>-ot&&m<ot){const S=Math.sqrt(r*r+m*m)||1;if(S<ot){const I=1-S/ot,q=I*I*ot*.5;T=r/S*q,n=m/S*q}}}t.ox[g]+=(T-t.ox[g])*.16,t.oy[g]+=(n-t.oy[g])*.16}const Ht=(g,T)=>{for(let n=g;n<T;n++){let r=t.alpha[n];const m=t.size[n];let S=t.hx[n]+t.ox[n],I=t.hy[n]+t.oy[n],q=m;if(_t)if(F)r*=Math.max(0,1-Et/700);else{const Z=Math.max(0,Et-t.rank[n]*420)/1e3,V=.5*1100*Z*Z*(.5+t.seed[n]);I+=V,q+=Math.min(48,V*.3),r*=Math.max(0,1-Z*1.5),D==="open"&&(S+=(S-ft/2)*Z*.35)}else{const Z=t.act[n];if(Z<0){t.dx[n]=-1e5;continue}const V=F?1:Math.min(1,(k-Z)/640);if(V<1){const Wt=1-(1-V)*(1-V)*(1-V);I-=t.fall[n]*(1-Wt),q+=(1-Wt)*t.fall[n]*.32,r*=.3+.7*V}D==="lock"&&!F&&(r*=.84+.16*Math.sin(k*.006+t.seed[n]*60)),!F&&t.seed[n]>.985&&(S+=(x(Math.floor(k/90)+n)-.5)*m*3)}if(r<=.01){t.dx[n]=-1e5;continue}t.dx[n]=S,t.dy[n]=I,o.globalAlpha=r>1?1:r,o.fillRect(S-m*.4,I-m*.7-(q-m),m*.8,q+m*.4)}};o.fillStyle=w.glow,Ht(0,t.hotFrom),o.fillStyle=w.core,Ht(t.hotFrom,t.n),o.globalAlpha=1;const ct=e.current;if(!F&&(k>ct.next&&(ct.next>0&&(ct.until=Math.max(ct.until,k+80+Math.random()*190)),ct.next=k+(Kt?450:1700)+Math.random()*(Kt?900:2800)),k<ct.until)){const g=3+Math.random()*7;o.fillStyle=w.accent,o.globalAlpha=.38;for(let n=Math.random()*3|0;n<t.n;n+=3)t.dx[n]<-1e4||o.fillRect(t.dx[n]+g,t.dy[n]-t.size[n]*.5,t.size[n],t.size[n]);o.globalAlpha=1,o.setTransform(1,0,0,1,0,0),B.clearRect(0,0,j.width,j.height),B.drawImage(d,0,0);const T=2+(Math.random()*4|0);for(let n=0;n<T;n++){const r=(G.y-G.h*.3+Math.random()*G.h*1.6)*$,m=(2+Math.random()*G.h*.12)*$,S=(Math.random()-.5)*70*$;o.clearRect(0,r,d.width,m),o.drawImage(j,0,r,j.width,m,S,r,j.width,m)}}vt=requestAnimationFrame(Tt)};Pt();const It=new ResizeObserver(()=>Pt());return It.observe(s),(qt=document.fonts)==null||qt.ready.then(()=>{zt||Pt()}),vt=requestAnimationFrame(Tt),()=>{zt=!0,cancelAnimationFrame(vt),It.disconnect()}},[b,tt,mt,F,O,w.glow,w.core,w.accent,p]);const dt=()=>{const s=J.current;s==="boot"?it.current=!0:s==="lock"&&K(c?"release":"open")},Nt=s=>{var o;const d=(o=st.current)==null?void 0:o.getBoundingClientRect();d&&(a.current={x:s.clientX-d.left,y:s.clientY-d.top,on:s.pointerType!=="touch"||s.buttons>0})},xt=()=>{a.current.on=!1},gt=s=>{Nt(s),s.pointerType==="touch"&&(a.current.on=!0),e.current.until=performance.now()+200},jt=s=>{s.pointerType==="touch"&&(a.current.on=!1)},W=v==="boot",bt=W?"decoding":v==="lock"?"signal locked":v==="open"?"opening":"release",Q=c?W?"tap to rush":"tap to cycle":W?"tap to skip":"tap to open",yt=W?ne(i,Mt(Y/70),et):i,Xt=W?Ut(Y)+"%":u;return l.jsxs("div",{ref:st,className:"nkp-root "+N,"data-phase":v,style:{height:At,"--nkp-bg":w.background,"--nkp-glow":w.glow,"--nkp-core":w.core,"--nkp-accent":w.accent,"--nkp-haze":w.haze,"--nkp-mono":Bt},children:[l.jsx("style",{children:se}),!c&&h?l.jsx("div",{className:"nkp-dest","aria-hidden":v!=="open"&&v!=="done",children:h}):null,v!=="done"?l.jsxs("div",{className:"nkp-gate",role:"progressbar","aria-label":i+" — "+b,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":Y,"aria-valuetext":W?Y+"%":"Loaded. Press Enter to open.",tabIndex:0,onClick:dt,onKeyDown:s=>{(s.key==="Enter"||s.key===" ")&&(s.preventDefault(),dt())},onPointerMove:Nt,onPointerDown:gt,onPointerUp:jt,onPointerLeave:xt,children:[l.jsx("div",{className:"nkp-haze","aria-hidden":"true"}),l.jsx("div",{className:"nkp-halo","aria-hidden":"true"}),l.jsx("canvas",{ref:A,className:"nkp-canvas","aria-hidden":"true"}),l.jsx("div",{className:"nkp-sweep","aria-hidden":"true"}),l.jsx("div",{className:"nkp-label nkp-label-top","aria-hidden":"true",children:l.jsx("span",{className:"nkp-dots",children:yt})}),l.jsx("div",{className:"nkp-label nkp-label-bottom","aria-hidden":"true",children:l.jsx("span",{className:W?"nkp-dots":"nkp-dots nkp-flip",children:Xt})}),l.jsx("div",{className:"nkp-scanlines","aria-hidden":"true"}),l.jsx("div",{className:"nkp-roll","aria-hidden":"true"}),l.jsx("div",{className:"nkp-vignette","aria-hidden":"true"}),l.jsx("div",{ref:E,className:"nkp-grain","aria-hidden":"true"}),R?l.jsxs(l.Fragment,{children:[l.jsx("div",{className:"nkp-hud nkp-tl","aria-hidden":"true",children:C}),l.jsxs("div",{className:"nkp-hud nkp-tr","aria-hidden":"true",children:[l.jsx("span",{className:"nkp-led"}),bt]}),l.jsxs("div",{className:"nkp-hud nkp-bl","aria-hidden":"true",children:[l.jsx("span",{children:Ut(Y)}),l.jsx("span",{className:"nkp-track",children:l.jsx("span",{className:"nkp-fill"})}),l.jsx("span",{children:"100"})]}),l.jsx("div",{className:"nkp-hud nkp-br","aria-hidden":"true",children:l.jsx("span",{className:"nkp-hint",children:Q})})]}):null,l.jsx("span",{className:"nkp-sr","aria-live":"polite",children:W?"":i+" ready"})]}):null,v==="open"?l.jsx("div",{className:"nkp-frame","aria-hidden":"true"}):null]})}export{he as N};
