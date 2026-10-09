import{r as j,j as D}from"./index-CdiR0C0d.js";const yt={background:"#000000",light:"#ffffff",laser:"#ff1f2a",hot:"#ffe6cc"},Z=e=>e<=0?0:e>=1?1:e,d0=[[0,1],[.07,.3],[.1,1],[.2,.92],[.23,.04],[.26,.85],[.29,.12],[.34,1],[.5,.94],[.53,.18],[.56,.62],[.58,0],[.65,.48],[.68,0],[.77,.22],[.79,0]],u0=[[0,0],[.12,.55],[.17,0],[.3,.9],[.35,.2],[.45,1]];function s0(e,l){let i=e[0][1];for(const p of e)l>=p[0]&&(i=p[1]);return i}function g0(e){return e<=0?1:e>=1?0:s0(d0,e)}function x0(e){return e<=0?0:e>=1?1:s0(u0,e)}function t0(e){const l=Math.sin(e*127.1+311.7)*43758.5453;return l-Math.floor(l)}function Et(e,l){const i=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;let a=(i.exec((e||"").trim())||i.exec(l)||["","fff"])[1];return a.length===3&&(a=a[0]+a[0]+a[1]+a[1]+a[2]+a[2]),[parseInt(a.slice(0,2),16),parseInt(a.slice(2,4),16),parseInt(a.slice(4,6),16)]}function m(e,l,i,p,a,P){const d=Math.max(4,Math.ceil(Math.abs(P-a)/10)),u=[];for(let T=0;T<=d;T++){const k=(a+(P-a)*T/d)*Math.PI/180;u.push([e+i*Math.cos(k),l+p*Math.sin(k)])}return u}const m0=new Map([["A",[[[0,1],[.3,0],[.6,1]],[[.11,.64],[.49,.64]]]],["B",[[[0,1],[0,0],[.32,0],...m(.32,.24,.22,.24,-90,90),[0,.48]],[[.34,.48],...m(.34,.74,.25,.26,-90,90),[0,1]]]],["C",[m(.33,.5,.32,.5,-40,-320)]],["D",[[[0,1],[0,0],[.2,0],...m(.2,.5,.4,.5,-90,90),[0,1]]]],["E",[[[.54,0],[0,0],[0,1],[.54,1]],[[0,.49],[.42,.49]]]],["F",[[[.54,0],[0,0],[0,1]],[[0,.49],[.42,.49]]]],["G",[[...m(.33,.5,.32,.5,-40,-360),[.38,.5]]]],["H",[[[0,0],[0,1]],[[.58,0],[.58,1]],[[0,.5],[.58,.5]]]],["I",[[[.04,0],[.32,0]],[[.18,0],[.18,1]],[[.04,1],[.32,1]]]],["J",[[[.48,0],[.48,.7],...m(.25,.7,.23,.3,0,170)]]],["K",[[[0,0],[0,1]],[[.56,0],[0,.6]],[[.18,.42],[.58,1]]]],["L",[[[0,0],[0,1],[.52,1]]]],["M",[[[0,1],[0,0],[.36,.64],[.72,0],[.72,1]]]],["N",[[[0,1],[0,0],[.6,1],[.6,0]]]],["O",[m(.34,.5,.34,.5,-90,270)]],["P",[[[0,1],[0,0],[.32,0],...m(.32,.26,.24,.26,-90,90),[0,.52]]]],["Q",[m(.34,.5,.34,.5,-90,270),[[.42,.7],[.72,1.04]]]],["R",[[[0,1],[0,0],[.32,0],...m(.32,.26,.24,.26,-90,90),[0,.52]],[[.26,.52],[.58,1]]]],["S",[[...m(.29,.25,.26,.25,-20,-270),...m(.29,.75,.29,.25,-90,160)]]],["T",[[[0,0],[.6,0]],[[.3,0],[.3,1]]]],["U",[[[0,0],[0,.66],...m(.29,.66,.29,.34,180,0),[.58,0]]]],["V",[[[0,0],[.3,1],[.6,0]]]],["W",[[[0,0],[.2,1],[.41,.3],[.62,1],[.82,0]]]],["X",[[[0,0],[.58,1]],[[.58,0],[0,1]]]],["Y",[[[0,0],[.3,.5],[.6,0]],[[.3,.5],[.3,1]]]],["Z",[[[0,0],[.58,0],[0,1],[.58,1]]]],["0",[m(.28,.5,.28,.5,-90,270),[[.47,.18],[.09,.82]]]],["1",[[[.06,.2],[.28,0],[.28,1]],[[.04,1],[.52,1]]]],["2",[[...m(.28,.27,.26,.27,-165,15),[0,1],[.56,1]]]],["3",[[...m(.27,.25,.25,.25,-160,90),...m(.27,.75,.29,.25,-90,160)]]],["4",[[[.42,1],[.42,0],[0,.7],[.58,.7]]]],["5",[[[.52,0],[.08,0],[.04,.45],...m(.27,.69,.29,.31,-125,160)]]],["6",[[[.46,0],[.06,.52],...m(.29,.68,.27,.32,-150,210)]]],["7",[[[0,0],[.56,0],[.2,1]]]],["8",[m(.28,.25,.22,.25,90,450),m(.28,.75,.28,.25,-90,270)]],["9",[[...m(.29,.32,.27,.32,30,390),[.14,1]]]],["-",[[[.04,.56],[.4,.56]]]],[".",[m(.05,.96,.02,.02,0,360)]],["!",[[[.07,0],[.07,.7]],m(.07,.96,.02,.02,0,360)]],["?",[[...m(.26,.24,.25,.24,-160,90),[.26,.68]],m(.26,.96,.02,.02,0,360)]],["/",[[[.46,0],[0,1]]]],["'",[[[.06,0],[.04,.3]]]]]),r0=.27,y0=.5;function l0(e){return m0.get(e)||null}function jt(e){const l=l0(e);if(!l)return y0;let i=.1;for(const p of l)for(const a of p)a[0]>i&&(i=a[0]);return i}function e0(e){let l=0;return e.forEach((i,p)=>{l+=jt(i)+(p<e.length-1?r0:0)}),l}function v0(e,l,i){const p=Array.from(e.toUpperCase().trim()),a=[[p]],P=p.map((g,M)=>g===" "?M:-1).filter(g=>g>0);if(P.length){let g=P[0];for(const M of P)Math.abs(M-p.length/2)<Math.abs(g-p.length/2)&&(g=M);a.push([p.slice(0,g),p.slice(g+1)])}let d=a[0],u=0;a.forEach((g,M)=>{const B=Math.max(.1,...g.map(e0)),X=g.length+(g.length-1)*.6,U=Math.min(l*.8/B,i*(g.length>1?.38:.2)/X);(M===0||U>u*1.3)&&(d=g,u=U)}),u=Math.max(14,Math.floor(u));const T=[],k=(d.length+(d.length-1)*.6)*u;let G=i*.5-k/2,C=1/0,N=-1/0;for(const g of d){let M=(l-e0(g)*u)/2;for(const B of g){const X=l0(B);if(X)for(const U of X)T.push(U.map(at=>[M+at[0]*u,G+at[1]*u]));C=Math.min(C,M),N=Math.max(N,M+jt(B)*u),M+=(jt(B)+r0)*u}G+=u*1.6}const W=i*.5-k/2;return{size:u,strokes:T,box:{x:C,y:W,w:Math.max(0,N-C),h:k}}}function o0(e,l){const i=Math.max(1.5,l*.022),p=l*.55,a={n:0,x0:[],y0:[],x1:[],y1:[],u0:[],u1:[],starts:[],first:[],dwell:p,total:0};let P=0;for(const d of e)if(!(d.length<2)){a.starts.push(P),a.first.push(a.n),P+=p;for(let u=0;u<d.length-1;u++){const[T,k]=d[u],[G,C]=d[u+1],N=Math.hypot(G-T,C-k);if(N<1e-6)continue;const W=Math.max(1,Math.ceil(N/i));for(let g=0;g<W;g++)a.x0.push(T+(G-T)*g/W),a.y0.push(k+(C-k)*g/W),a.x1.push(T+(G-T)*(g+1)/W),a.y1.push(k+(C-k)*(g+1)/W),a.u0.push(P),P+=N/W,a.u1.push(P),a.n++}}return a.total=P,a}function b0(e,l){if(!e.n)return{x:0,y:0,on:!1,done:0,part:0};if(l>=e.total)return{x:e.x1[e.n-1],y:e.y1[e.n-1],on:!1,done:e.n,part:0};l<0&&(l=0);let i=0;for(;i+1<e.starts.length&&e.starts[i+1]<=l;)i++;const p=e.first[i],a=(l-e.starts[i])/e.dwell;if(a<1){const k=Z(a/.45),G=k*k*(3-2*k),C=i>0?e.x1[p-1]:e.x0[p],N=i>0?e.y1[p-1]:e.y0[p];return{x:C+(e.x0[p]-C)*G,y:N+(e.y0[p]-N)*G,on:a>.45,done:p,part:0}}const P=i+1<e.first.length?e.first[i+1]-1:e.n-1;let d=p,u=P;for(;d<u;){const k=d+u+1>>1;e.u0[k]<=l?d=k:u=k-1}const T=Z((l-e.u0[d])/(e.u1[d]-e.u0[d]));return{x:e.x0[d]+(e.x1[d]-e.x0[d])*T,y:e.y0[d]+(e.y1[d]-e.y0[d])*T,on:!0,done:d,part:T}}const ot=(e,l,i)=>e.map((p,a)=>Math.round(p+(l[a]-p)*i)),y=(e,l=1)=>"rgba("+e[0]+","+e[1]+","+e[2]+","+l.toFixed(3)+")",M0=`
.slp-root {
  position: relative;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  background: var(--slp-bg);
  color: #fff;
}
.slp-root .slp-dest {
  position: absolute;
  inset: 0;
  overflow: auto;
  z-index: 0;
}
.slp-root .slp-gate {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  background: var(--slp-bg);
  outline: none;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  touch-action: manipulation;
}
.slp-root .slp-gate:focus-visible {
  box-shadow: inset 0 0 0 1px rgba(var(--slp-red), 0.45);
}
.slp-root .slp-cone {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: var(--slp-l, 1);
  transform: translateX(var(--slp-lean, 0px));
  background:
    radial-gradient(ellipse 13% 9% at 50% 4%, rgba(var(--slp-light), 0.42), rgba(var(--slp-light), 0) 100%),
    radial-gradient(ellipse 30% 42% at 50% 6%, rgba(var(--slp-light), 0.24), rgba(var(--slp-light), 0) 100%),
    radial-gradient(ellipse 38% 52% at 50% 36%, rgba(var(--slp-light), 0.16) 0%, rgba(var(--slp-light), 0.08) 50%, rgba(var(--slp-light), 0) 100%);
}
.slp-root .slp-pool {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: var(--slp-l, 1);
  background:
    radial-gradient(ellipse 14% 2.6% at 50% 86%, rgba(var(--slp-light), 0.1), rgba(var(--slp-light), 0) 100%),
    radial-gradient(ellipse 36% 7% at 50% 86%, rgba(var(--slp-light), 0.07), rgba(var(--slp-light), 0) 100%);
}
.slp-root .slp-spill {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: var(--slp-r, 0);
  background:
    radial-gradient(ellipse 30% 6% at 50% 86%, rgba(var(--slp-red), 0.22), rgba(var(--slp-red), 0) 100%),
    radial-gradient(ellipse 46% 30% at 50% 50%, rgba(var(--slp-red), 0.05), rgba(var(--slp-red), 0) 100%);
}
.slp-root .slp-streak {
  position: absolute;
  left: 12%;
  right: 12%;
  top: 4%;
  height: 2px;
  margin-top: -1px;
  pointer-events: none;
  opacity: var(--slp-f, 1);
  background: linear-gradient(90deg, rgba(var(--slp-light), 0), rgba(var(--slp-light), 0.16) 30%, rgba(var(--slp-light), 0.3) 50%, rgba(var(--slp-light), 0.16) 70%, rgba(var(--slp-light), 0));
  filter: blur(1px);
}
.slp-root .slp-lamp {
  position: absolute;
  left: 50%;
  top: 4%;
  width: clamp(96px, 15%, 280px);
  height: clamp(7px, 1.6%, 14px);
  transform: translate(-50%, -50%);
  border-radius: 50%;
  pointer-events: none;
  opacity: var(--slp-f, 1);
  background: radial-gradient(ellipse at center, #fff 0%, rgba(var(--slp-light), 0.96) 38%, rgba(var(--slp-light), 0.45) 62%, rgba(var(--slp-light), 0) 74%);
  box-shadow: 0 0 16px 3px rgba(var(--slp-light), 0.32), 0 0 70px 14px rgba(var(--slp-light), 0.1);
}
.slp-root .slp-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  display: block;
  pointer-events: none;
}
.slp-root .slp-vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse 75% 70% at 50% 45%, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, 0.55) 100%);
}
.slp-root .slp-grain {
  position: absolute;
  inset: -50%;
  pointer-events: none;
  opacity: 0.035;
  mix-blend-mode: screen;
  background-size: 128px 128px;
  animation: slp-grain 0.9s steps(5) infinite;
}
.slp-root .slp-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}
.slp-root[data-phase="exit"] .slp-gate {
  animation: slp-out 0.9s ease forwards;
  pointer-events: none;
}

@keyframes slp-grain {
  0% { transform: translate(0, 0); }
  20% { transform: translate(-5%, 3%); }
  40% { transform: translate(4%, -6%); }
  60% { transform: translate(-2%, 7%); }
  80% { transform: translate(6%, 2%); }
  100% { transform: translate(0, 0); }
}
@keyframes slp-out { to { opacity: 0; } }

@media (prefers-reduced-motion: reduce) {
  .slp-root .slp-grain { animation: none; }
  .slp-root .slp-cone { transform: none; }
}
`,k0=1400,w0=1600,S0=1800,a0=800,R0=2e3,n0=1200,P0=900;function T0({name:e="KEDHAR",children:l,loop:i=!1,progress:p,durationMs:a=3600,sparks:P=!0,interactive:d=!0,palette:u,height:T="100svh",onComplete:k,className:G=""}){const[C,N]=j.useState("light"),[W,g]=j.useState(0),[M,B]=j.useState(!1),X=j.useRef(null),U=j.useRef(null),at=j.useRef(null),rt=j.useRef("light"),vt=j.useRef(!1),lt=j.useRef(!1),it=j.useRef({x:0,y:0,on:!1}),At=j.useRef(p);At.current=p;const Ft=j.useRef(i);Ft.current=i;const ct=j.useRef(k);ct.current=k;const pt={...yt,...u},i0=Et(pt.light,yt.light),Lt=Et(pt.laser,yt.laser),c0=Et(pt.hot,yt.hot),Dt=Lt.join(","),Nt=c0.join(",");j.useEffect(()=>{const v=window.matchMedia("(prefers-reduced-motion: reduce)"),I=()=>B(v.matches);return I(),v.addEventListener("change",I),()=>v.removeEventListener("change",I)},[]),j.useEffect(()=>{const v=at.current;if(!v)return;const I=document.createElement("canvas");I.width=I.height=128;const t=I.getContext("2d");if(!t)return;const b=t.createImageData(128,128);for(let A=0;A<b.data.length;A+=4){const ft=Math.random()*255;b.data[A]=b.data[A+1]=b.data[A+2]=ft,b.data[A+3]=255}t.putImageData(b,0,0),v.style.backgroundImage="url("+I.toDataURL()+")"},[]),j.useEffect(()=>{const v=X.current,I=U.current,t=I==null?void 0:I.getContext("2d");if(!v||!I||!t)return;const b=Dt.split(",").map(Number),A=Nt.split(",").map(Number),ft=ot(b,A,.5),bt=[0,1,2,3,4,5].map(h=>{const S=h/5;return S<.5?ot(b,ft,S*2):ot(ft,A,(S-.5)*2)}),f0=bt.map(h=>ot(h,A,.6)),ht=[255,255,255];let K=0,q=0,nt=1,w=40,c=o0([],1),Y=new Float64Array(0),Mt=new Float32Array(0),_=0,kt=1,dt=0,wt=performance.now(),Ot=wt,ut=0,Ht=!1,_t=-1,St=-1,Rt=0,Pt=0;const $=[],tt=[],gt=[[],[],[],[],[],[]],zt=()=>{const h=v.getBoundingClientRect();if(h.width<2||h.height<2)return;const S=c.total>0?_/c.total:0;K=h.width,q=h.height,nt=Math.min(2,window.devicePixelRatio||1),I.width=Math.round(K*nt),I.height=Math.round(q*nt);const f=v0(e,K,q);w=f.size,c=o0(f.strokes,w),_=S*c.total,Y=new Float64Array(c.n).fill(-1e9),Mt=new Float32Array(c.n)},J=(h,S)=>{rt.current=h,wt=S,N(h)},Ct=(h,S,f)=>{if($.length>380)return;const F=-Math.PI/2+(Math.random()-.5)*Math.PI*1.5,Q=(.5+Math.random())*w*2.6*f;$.push({x:h,y:S,vx:Math.cos(F)*Q,vy:Math.sin(F)*Q,age:0,life:260+Math.random()*520})},It=h=>{var Vt;if(Ht)return;const S=Math.min(50,h-Ot);Ot=h;let f=rt.current;if(f==="done")return;const F=h-wt,Q=vt.current;vt.current=!1;let st=0;if(f==="light"){const r=dt>0?w0:k0;st=dt>0&&!M?x0(F/(r*.55)):M&&dt>0?Z(F/600):1,(F>r||Q)&&J("flicker",h)}else if(f==="flicker"){const r=F/S0;st=M?1-r*r*(3-2*Z(r)):g0(r)*(.9+.1*t0(Math.floor(h/40))),(r>=1||Q)&&J("dark",h)}else if(f==="dark")(F>a0||Q)&&J("write",h);else if(f==="write"){const r=c.total/Math.max(400,a),n=At.current,E=n===void 0?c.total:Z(n/100)*c.total,O=lt.current?5:1;_=Math.min(E,_+r*O*S),_>=c.total&&(n===void 0||n>=100)&&(_=c.total,J("hold",h))}else if(f==="hold")(F>R0||Q)&&J(Ft.current?"fade":"exit",h);else if(f==="fade")F>n0&&(dt++,_=0,St=-1,Y.fill(-1e9),J("light",h));else if(f==="exit"&&F>P0){J("done",h),(Vt=ct.current)==null||Vt.call(ct);return}f=rt.current,f!=="write"&&(lt.current=!1),kt=Math.max(st,kt-S/420);const xt=it.current,qt=xt.on&&d&&!M,h0=qt&&K?(xt.x-K/2)/K*18:0;v.style.setProperty("--slp-l",st.toFixed(3)),v.style.setProperty("--slp-f",Math.max(st,kt*.85).toFixed(3)),v.style.setProperty("--slp-lean",h0.toFixed(1)+"px");const Bt=c.total>0?_/c.total:0,Ut=f==="fade"?1-Z(F/n0):f==="light"||f==="flicker"||f==="dark"?0:1;v.style.setProperty("--slp-r",(Bt*Ut*.9).toFixed(3));const Tt=f==="write"?Math.floor(Bt*100):f==="hold"||f==="exit"||f==="fade"?100:0;if(Tt!==_t&&(_t=Tt,g(Tt)),t.setTransform(nt,0,0,nt,0,0),t.clearRect(0,0,K,q),!K){ut=requestAnimationFrame(It);return}t.globalCompositeOperation="lighter",t.lineCap="round",t.lineJoin="round";const V=f==="write",s=b0(c,_),Yt=V&&s.on&&!M,Jt=K/2,Qt=q*.04;if((f==="write"||f==="hold"||f==="fade"||f==="exit")&&c.n){const r=s.done;for(let o=0;o<r;o++)Y[o]<-1e8&&V&&(Y[o]=h);V&&s.part>0&&Y[r]<-1e8&&(Y[r]=h);const n=w*.6,E=Math.exp(-S/800);for(let o=0;o<6;o++)gt[o].length=0;const O=Math.min(c.n,r+(s.part>0?1:0));for(let o=0;o<O;o++){let x=Mt[o]*E;if(qt){const z=(c.x0[o]+c.x1[o])/2-xt.x,mt=(c.y0[o]+c.y1[o])/2-xt.y;if(z>-n&&z<n&&mt>-n&&mt<n){const Zt=Math.sqrt(z*z+mt*mt);if(Zt<n){const $t=1-Zt/n;$t*.9>x+.25&&P&&Math.random()<.08&&Ct((c.x0[o]+c.x1[o])/2,(c.y0[o]+c.y1[o])/2,.45),x=Math.max(x,Math.min(1,$t*1.3))}}}Mt[o]=x;const L=h-Y[o],H=M?0:Math.min(1,Math.exp(-L/650)+x);gt[Math.min(5,Math.floor(H*5.999))].push(o)}let R=Ut;if((f==="hold"||f==="fade"||f==="exit")&&(R*=M?1:.93+.07*Math.sin(h*.011)*t0(Math.floor(h/70))),R>.01){const o=new Path2D;for(let x=0;x<6;x++)for(const L of gt[x])o.moveTo(c.x0[L],c.y0[L]),L===r&&V?o.lineTo(s.x,s.y):o.lineTo(c.x1[L],c.y1[L]);t.lineWidth=w*.18,t.strokeStyle=y(b,.09*R),t.stroke(o),t.shadowColor=y(b,.9*R),t.shadowBlur=w*.4,t.lineWidth=w*.05,t.strokeStyle=y(b,.7*R),t.stroke(o),t.shadowBlur=0,t.shadowColor="transparent",t.lineCap="butt";for(let x=0;x<6;x++){const L=gt[x];if(!L.length)continue;const H=new Path2D;for(const z of L)H.moveTo(c.x0[z],c.y0[z]),z===r&&V?H.lineTo(s.x,s.y):H.lineTo(c.x1[z],c.y1[z]);x>1&&(t.lineWidth=w*.1,t.strokeStyle=y(bt[x],.05*x*R),t.stroke(H)),t.lineWidth=w*.042,t.strokeStyle=y(bt[x],.55*R),t.stroke(H),t.lineWidth=Math.max(1.2,w*.016*(1+x*.12)),t.strokeStyle=y(f0[x],.95*R),t.stroke(H)}t.lineCap="round"}}let et=0;if(f==="dark"?et=M?0:Z((F-a0+320)/320)*.7:V?et=M?0:Yt?1:.7:f==="hold"&&(et=M?0:Math.max(0,.7-F/600)),et>.01){t.save(),t.translate(Jt,Qt),t.scale(4.5,1);const r=t.createRadialGradient(0,0,0,0,0,16);r.addColorStop(0,y(ht,.9*et)),r.addColorStop(.25,y(b,.8*et)),r.addColorStop(1,y(b,0)),t.fillStyle=r,t.beginPath(),t.arc(0,0,16,0,Math.PI*2),t.fill(),t.restore()}if(V&&!M&&c.n){const r=.82+.18*Math.random();if(Yt){t.lineWidth=7,t.strokeStyle=y(b,.07*r),t.beginPath(),t.moveTo(Jt,Qt),t.lineTo(s.x,s.y),t.stroke(),t.lineWidth=1.3,t.strokeStyle=y(ot(b,A,.25),.65*r),t.stroke();const n=t.createRadialGradient(s.x,s.y,0,s.x,s.y,Math.max(K,q)*.45);n.addColorStop(0,y(b,.07*r)),n.addColorStop(1,y(b,0)),t.fillStyle=n,t.fillRect(0,0,K,q);const E=t.createRadialGradient(s.x,s.y,0,s.x,s.y,w*.5);E.addColorStop(0,y(A,.5*r)),E.addColorStop(.2,y(b,.3*r)),E.addColorStop(1,y(b,0)),t.fillStyle=E,t.beginPath(),t.arc(s.x,s.y,w*.5,0,Math.PI*2),t.fill();const O=Math.max(2.5,w*.05),R=t.createRadialGradient(s.x,s.y,0,s.x,s.y,O);if(R.addColorStop(0,y(ht,r)),R.addColorStop(.5,y(A,.8*r)),R.addColorStop(1,y(A,0)),t.fillStyle=R,t.beginPath(),t.arc(s.x,s.y,O,0,Math.PI*2),t.fill(),P){let o=0;for(;o+1<c.starts.length&&c.starts[o+1]<=_;)o++;if(o!==St){St=o;for(let x=0;x<16;x++)Ct(s.x,s.y,1.15)}for(Pt+=S*.11*(lt.current?1.8:1);Pt>1;)Pt--,Ct(s.x,s.y,1);Rt+=S,Rt>70&&tt.length<46&&(Rt=0,tt.push({x:s.x,y:s.y,vx:(Math.random()-.5)*w*.25,vy:-w*(.25+Math.random()*.3),age:0,life:1400+Math.random()*900,r:w*(.06+Math.random()*.05)}))}}else{const n=t.createRadialGradient(s.x,s.y,0,s.x,s.y,w*.12);n.addColorStop(0,y(b,.5)),n.addColorStop(1,y(b,0)),t.fillStyle=n,t.beginPath(),t.arc(s.x,s.y,w*.12,0,Math.PI*2),t.fill()}}if(tt.length){t.globalCompositeOperation="source-over";for(let r=tt.length-1;r>=0;r--){const n=tt[r];if(n.age+=S,n.age>n.life){tt.splice(r,1);continue}const E=n.age/n.life;n.x+=n.vx*S/1e3+Math.sin(n.age*.004+r)*.15,n.y+=n.vy*S/1e3;const O=n.r+w*.5*E,R=.07*(1-E)*Math.min(1,E*8),o=t.createRadialGradient(n.x,n.y,0,n.x,n.y,O);o.addColorStop(0,y(ot(b,ht,.55),R)),o.addColorStop(1,y(b,0)),t.fillStyle=o,t.beginPath(),t.arc(n.x,n.y,O,0,Math.PI*2),t.fill()}t.globalCompositeOperation="lighter"}if($.length){const r=w*9,n=q*.9,E=[new Path2D,new Path2D,new Path2D];for(let R=$.length-1;R>=0;R--){const o=$[R];if(o.age+=S,o.age>o.life){$.splice(R,1);continue}const x=S/1e3;o.vy+=r*x,o.vx*=.985,o.x+=o.vx*x,o.y+=o.vy*x,o.y>n&&o.vy>0&&(o.y=n,o.vy*=-.32,o.vx*=.6);const L=o.age/o.life,H=E[L<.25?0:L<.6?1:2];H.moveTo(o.x,o.y),H.lineTo(o.x-o.vx*.016,o.y-o.vy*.016)}const O=Math.max(1,w*.011);t.lineWidth=O,t.strokeStyle=y(ht,.95),t.stroke(E[0]),t.strokeStyle=y(A,.85),t.stroke(E[1]),t.strokeStyle=y(b,.7),t.stroke(E[2])}t.globalCompositeOperation="source-over",ut=requestAnimationFrame(It)};zt();const Xt=new ResizeObserver(()=>zt());return Xt.observe(v),ut=requestAnimationFrame(It),()=>{Ht=!0,cancelAnimationFrame(ut),Xt.disconnect()}},[e,a,P,d,M,Dt,Nt]);const Gt=()=>{rt.current==="write"?lt.current=!0:vt.current=!0},Wt=v=>{var t;const I=(t=X.current)==null?void 0:t.getBoundingClientRect();I&&(it.current={x:v.clientX-I.left,y:v.clientY-I.top,on:v.pointerType!=="touch"||v.buttons>0})},p0=()=>{it.current.on=!1},Kt=C==="hold"||C==="exit"||C==="fade";return D.jsxs("div",{ref:X,className:"slp-root "+G,"data-phase":C,style:{height:T,"--slp-bg":pt.background,"--slp-light":i0.join(", "),"--slp-red":Lt.join(", ")},children:[D.jsx("style",{children:M0}),!i&&l?D.jsx("div",{className:"slp-dest","aria-hidden":C!=="exit"&&C!=="done",children:l}):null,C!=="done"?D.jsxs("div",{className:"slp-gate",role:"progressbar","aria-label":"Loading "+e,"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":W,"aria-valuetext":Kt?e+" — loaded":W+"%",tabIndex:0,onClick:Gt,onKeyDown:v=>{(v.key==="Enter"||v.key===" ")&&(v.preventDefault(),Gt())},onPointerMove:Wt,onPointerDown:Wt,onPointerUp:v=>{v.pointerType==="touch"&&(it.current.on=!1)},onPointerLeave:p0,children:[D.jsx("div",{className:"slp-cone","aria-hidden":"true"}),D.jsx("div",{className:"slp-pool","aria-hidden":"true"}),D.jsx("div",{className:"slp-spill","aria-hidden":"true"}),D.jsx("div",{className:"slp-streak","aria-hidden":"true"}),D.jsx("div",{className:"slp-lamp","aria-hidden":"true"}),D.jsx("canvas",{ref:U,className:"slp-canvas","aria-hidden":"true"}),D.jsx("div",{className:"slp-vignette","aria-hidden":"true"}),D.jsx("div",{ref:at,className:"slp-grain","aria-hidden":"true"}),D.jsx("span",{className:"slp-sr","aria-live":"polite",children:Kt?e+" ready":""})]}):null]})}export{T0 as S};
