import{r as j,j as i}from"./index-CdiR0C0d.js";const _t={stage:"#050505",ink:"#f2f0ea",dim:"#8c8a84"},Bt=["Gathering starlight","Charting the orbit","Waking the moon","Raising the curtain"],Ut='"Cormorant Garamond", "Playfair Display", Didot, "Bodoni 72", Georgia, "Times New Roman", serif',Gt='"JetBrains Mono", "SF Mono", ui-monospace, Menlo, Consolas, monospace',Pt="M0-1C.07-.24.24-.07 1 0 .24.07.07.24 0 1-.07.24-.24.07-1 0-.24-.07-.07-.24 0-1Z",Kt=(()=>{const s=[];let t=9;const a=()=>((t=t*16807%2147483647)-1)/2147483646;for(let r=0;r<44;r++){const o=r/44*Math.PI*2+(a()-.5)*.08;s.push([o,22+a()*6,52+a()*48,.6+a()*1.6,.6+a()*1.2])}return s})(),Vt=[[-.66,.3,.2,0,9],[.78,-.42,.4,1,13],[-.44,-.34,.075,2,7],[.42,.32,.11,3,11]],Jt=[[36,14,.026,0],[67,25,.018,1.4],[57,9,.014,2.3],[28,31,.012,.7],[74,12,.012,3.1]],Zt=[[9,18,.03,.4],[88,64,.036,1.8],[16,78,.022,2.9],[93,14,.018,1.1]],ns=s=>s<=0?0:s>=1?1:s,$s=[[0,0],[.2,.27],[.31,.3],[.58,.66],[.7,.7],[1,1]];function Qt(s){if(s<=0)return 0;if(s>=1)return 1;for(let t=0;t<$s.length-1;t++){const a=$s[t],r=$s[t+1];if(s<=r[0]){const o=(s-a[0])/(r[0]-a[0]),e=1-Math.pow(1-o,3);return a[1]+(r[1]-a[1])*e}}return 1}function $t(s){const t=ns(s);return t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2}function sa(s,t){return ns((s-t)/.6)}function ta(s,t){return ns((t*(31/30)-s)*30)}function aa(s,t){return Math.max(0,Math.min(t-1,Math.floor(ns(s)*t)))}function ea(s,t){const a=Math.min(1.45,Math.max(.9,s/Math.max(1,t))),r=Math.min(t*.74,s*.94/a),o=r*a,e=(s-o)/2,p=(t-r)/2-t*.015;return{w:s,h:t,u:Math.min(s,t),cx:s/2,cy:t*.47,x0:e,y0:p,W:o,H:r,left:e+o*.075,right:e+o*.925,spring:p+r*.36,crown:p+r*.02,floor:p+r*.86,moonX:s/2,moonY:p+r*.22,moonR:Math.min(o,r)*.066}}function oa(s,t,a){const r=s.left+a,o=s.right-a,e=(o-r)/2,p=s.spring-s.crown-a,l=r+e,f=s.floor-s.spring,m=Math.PI*(3*(e+p)-Math.sqrt((3*e+p)*(e+3*p)))/2,u=ns(t)*(f*2+m);if(u<=f)return{x:r,y:s.floor-u};if(u<=f+m){const b=Math.PI-(u-f)/m*Math.PI;return{x:l+e*Math.cos(b),y:s.spring-p*Math.sin(b)}}return{x:o,y:s.spring+(u-f-m)}}function O(s){let t=s>>>0;return()=>{t=t+1831565813>>>0;let a=t;return a=Math.imul(a^a>>>15,a|1),a^=a+Math.imul(a^a>>>7,a|61),((a^a>>>14)>>>0)/4294967296}}const Tt=[[.02,.6,.46,.6,.75,13],[.52,.6,.46,.6,.9,15],[.14,.3,.72,.3,.5,17],[.06,.13,.88,.15,1.1,11]],It=.15,st=.16;function na(s,t){const a=r=>Math.max(8,Math.round(r*t));return{moon:a(s.moonR*2),clouds:Tt.map(([,,r,o])=>[a(s.W*r),a(s.H*o)]),curtain:[a(s.W*It),a(s.floor-s.spring+s.H*.02)],figure:[a(s.H*st/2),a(s.H*st)]}}function rs(s,t){const a=document.createElement("canvas");return a.width=s,a.height=t,a}function is(s){const t=s.getContext("2d",{willReadFrequently:!0});if(!t)throw new Error("no 2d context");return t}const Ft=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5].map(s=>(s+.5)/16);function jt(s){const t=O(s),a=64,r=Array.from({length:a*a},t),o=(l,f)=>r[(f%a+a)%a*a+(l%a+a)%a],e=l=>l*l*(3-2*l),p=(l,f)=>{const m=Math.floor(l),u=Math.floor(f),b=e(l-m),c=e(f-u),h=o(m,u)+(o(m+1,u)-o(m,u))*b,x=o(m,u+1)+(o(m+1,u+1)-o(m,u+1))*b;return h+(x-h)*c};return(l,f)=>{let m=0,u=.5,b=1;for(let c=0;c<5;c++)m+=p(l*b,f*b)*u,b*=2,u*=.5;return m/.97}}function Ws(s,t,a,r,o,e,p,l){const f=rs(s,t),m=is(f);a(m);const u=m.getImageData(0,0,s,t).data,b=rs(s,t),c=is(b);l&&(c.drawImage(f,0,0),c.globalCompositeOperation="source-in",c.fillStyle=l,c.fillRect(0,0,s,t),c.globalCompositeOperation="source-over");const h=O(p);c.fillStyle=o;const x=Math.round(s*t*e);for(let k=0;k<x;k++){const P=h()*s,v=h()*t,A=u[((v|0)*s+(P|0))*4+3]/255,F=h();if(A<=.004||F>r(P/s,v/t,A))continue;c.globalAlpha=.5+h()*.5;const E=h()>.93?1.6:1;c.fillRect(P,v,E,E)}return c.globalAlpha=1,b}function ra(s){const a=rs(512,512),r=is(a),o=O(3);r.fillStyle=s;for(let e=0;e<520;e++){const p=o();r.globalAlpha=.15+p*p*.85;const l=p>.985?2:p>.9?1.4:1,f=o()*512,m=o()*512;r.fillRect(f,m,l,l),p>.993&&(r.globalAlpha=.5,r.fillRect(f-4,m+.5,9,1),r.fillRect(f+.5,m-4,1,9))}return a}function ia(s){const r=rs(320,180),o=is(r),e=jt(19),p=jt(41),l=O(23);o.fillStyle=s;for(let f=0;f<180;f++)for(let m=0;m<320;m++){const u=m/60,b=f/60,c=e(u+p(u,b)*1.6,b+p(u+5,b+3)*1.6),h=1-Math.min(1,Math.abs(f/180-.5-(m/320-.5)*.55)*2.3);let x=(c-.42)*2.4*(.35+h*.9);x=Math.max(0,Math.min(1,x));const k=Math.min(3,Math.floor(x*3+Ft[f%4*4+m%4]));k<=0||(o.globalAlpha=k===1?.22:k===2?.5:.85,o.fillRect(m,f,1,1))}for(let f=0;f<110;f++){const m=Math.floor(l()*320),u=Math.floor(l()*180),b=l();o.globalAlpha=.4+b*.6,o.fillRect(m,u,1,1),b>.95&&(o.globalAlpha=.55,o.fillRect(m-2,u,5,1),o.fillRect(m,u-2,1,5))}return o.globalAlpha=1,r}function ca(s,t,a){const r=s===1?72:s===0?44:26,o=s===3?Math.round(r*.45):0,e=r+o*2,p=rs(e,e),l=is(p),f=O(61+s*13),m=r/2-.5,u=Array.from({length:s===0?7:s===2?2:0},()=>({x:(f()-.5)*1.3,y:(f()-.5)*1.3,r:.1+f()*.16})),b=[-.55,-.5,.67],c=(h,x)=>{const k=(h-e/2)/(r*.95),P=(x-e/2)/(r*.95),v=P*Math.cos(.3)-k*Math.sin(.3),A=k*Math.cos(.3)+P*Math.sin(.3),F=Math.hypot(A,v*3.6);return F>.78&&F<.98?v>0?1:-1:0};for(let h=0;h<e;h++)for(let x=0;x<e;x++){const k=(x-e/2+.5)/m,P=(h-e/2+.5)/m,v=k*k+P*P,A=s===3?c(x+.5,h+.5):0,F=Ft[h%4*4+x%4];if(v>1){A&&(l.globalAlpha=1,l.fillStyle=t,F<.7&&l.fillRect(x,h,1,1));continue}const E=Math.sqrt(1-v);let Q=Math.max(0,k*b[0]+P*b[1]+E*b[2]);s===1&&(Q*=.75+.25*Math.sin(P*11+Math.sin(k*3)*1.4));for(const _ of u){const ms=Math.hypot(k-_.x,P-_.y);ms<_.r&&(Q*=ms<_.r*.75?.45:1.25)}if(l.globalAlpha=1,l.fillStyle=a,l.fillRect(x,h,1,1),A>0){l.fillStyle=t,F<.7&&l.fillRect(x,h,1,1);continue}const fs=Math.min(1,Q*1.15);fs>F&&(l.fillStyle=t,l.globalAlpha=fs>.8?1:.8,l.fillRect(x,h,1,1))}return l.globalAlpha=1,p}function la(s,t,a,r){const o=O(83),e=Array.from({length:16},()=>({x:(o()-.5)*1.5,y:(o()-.5)*1.5,r:.05+o()*o()*.22}));return Ws(s,s,p=>{p.fillStyle="#fff",p.beginPath(),p.arc(s/2,s/2,s/2-2,0,Math.PI*2),p.fill()},(p,l)=>{const f=p*2-1,m=l*2-1,u=Math.sqrt(Math.max(0,1-f*f-m*m));let b=Math.max(0,-.42*f-.46*m+.78*u);for(const c of e){const h=Math.hypot(f-c.x,m-c.y)/c.r;h<1&&(b*=h<.8?.6:1.15)}return .06+.94*Math.pow(b,1.15)},t,.95*r,84,a)}function pa(s,t,a,r,o,e,p){const l=O(s),f=[];for(let c=0;c<46;c++){const h=l(),x=Math.min(t*.18,h*t*.9,(1-h)*t*.9,(.2+.8*r(h))*a*(.14+l()*.14));if(x<4)continue;const k=r(h)*(a-x*2.7)*Math.pow(l(),.8);f.push({x:h*t,y:Math.max(x*1.04,a-x*.75-k),r:x})}f.sort((c,h)=>c.y-h.y);const m=rs(t,a),u=is(m);for(const c of f){const h=u.createRadialGradient(c.x,c.y,0,c.x,c.y,c.r);h.addColorStop(0,"rgba(34,34,34,1)"),h.addColorStop(.74,"rgba(30,30,30,1)"),h.addColorStop(1,"rgba(30,30,30,0)"),u.fillStyle=h,u.fillRect(c.x-c.r,c.y-c.r,c.r*2,c.r*2),u.save(),u.beginPath(),u.arc(c.x,c.y,c.r*.98,0,Math.PI*2),u.clip();const x=u.createRadialGradient(c.x-c.r*.2,c.y-c.r*.6,0,c.x-c.r*.2,c.y-c.r*.6,c.r*.9);x.addColorStop(0,"rgba(255,255,255,1)"),x.addColorStop(.45,"rgba(230,230,230,0.6)"),x.addColorStop(1,"rgba(255,255,255,0)"),u.fillStyle=x,u.fillRect(c.x-c.r,c.y-c.r,c.r*2,c.r*2),u.restore()}const b=u.getImageData(0,0,t,a).data;return Ws(t,a,c=>c.drawImage(m,0,0),(c,h,x)=>{const k=(Math.min(a-1,h*a|0)*t+Math.min(t-1,c*t|0))*4,P=b[k]/255;return Math.min(1,Math.pow(P,2)*1.5*x+x*(1-x)*.7+.02)},o,.85*p,s+1,e)}function da(s,t,a,r,o){return Ws(s,t,e=>{e.fillStyle="#fff",e.beginPath(),e.moveTo(0,0),e.lineTo(s*.9,0),e.bezierCurveTo(s*.84,t*.45,s*.72,t*.8,s*.98,t*.965),e.quadraticCurveTo(s*.72,t*1,s*.46,t*.975),e.quadraticCurveTo(s*.22,t*.995,0,t*.97),e.closePath(),e.fill()},(e,p)=>{const l=e/(.55+.45*Math.min(1,p*1.6)),f=.5+.5*Math.sin(l*Math.PI*2*2.6+Math.sin(p*5)*.5),m=Math.max(0,1-Math.abs(e-(.86-p*.12))*6),u=Math.min(1,p*4);return(.08+.62*f*f+.3*m)*(.45+.55*u)},a,1.05*o,211,r)}function ua(s,t,a,r,o){return Ws(s,t,e=>{e.fillStyle="#fff",e.beginPath(),e.ellipse(s*.5,t*.15,s*.15,t*.085,0,0,Math.PI*2),e.fill(),e.beginPath(),e.moveTo(s*.33,t*.25),e.quadraticCurveTo(s*.5,t*.215,s*.67,t*.25),e.quadraticCurveTo(s*.8,t*.28,s*.78,t*.42),e.lineTo(s*.86,t*.84),e.quadraticCurveTo(s*.5,t*.88,s*.14,t*.84),e.lineTo(s*.22,t*.42),e.quadraticCurveTo(s*.2,t*.28,s*.33,t*.25),e.fill(),e.fillRect(s*.38,t*.83,s*.09,t*.15),e.fillRect(s*.53,t*.83,s*.09,t*.15),e.beginPath(),e.ellipse(s*.17,t*.47,s*.055,t*.03,-.5,0,Math.PI*2),e.ellipse(s*.83,t*.47,s*.055,t*.03,.5,0,Math.PI*2),e.fill()},(e,p)=>{const l=Math.max(0,1-Math.abs(e-.5)*2.4);return .6+.4*(1-p)*(.5+l*.5)},a,2.2*o,307,r)}function fa(s){const a=rs(256,256),r=is(a),o=O(97);r.fillStyle=s;for(let e=0;e<90;e++){r.globalAlpha=.08+o()*.3;const p=6+o()*26;r.fillRect(Math.floor(o()*256),o()*256,1,p)}return a}function ma(){const t=rs(160,160),a=is(t),r=a.createImageData(160,160),o=O(7);for(let e=0;e<r.data.length;e+=4){const p=Math.round(o()*255);r.data[e]=p,r.data[e+1]=p,r.data[e+2]=p,r.data[e+3]=30}return a.putImageData(r,0,0),t}const Z=s=>s.toDataURL("image/png");function ha(s,t,a){const{ink:r,stage:o}=s,e=[p=>Math.pow(1-Math.abs(p-.22)/.78,1.6),p=>Math.pow(1-Math.abs(p-.78)/.78,1.6),p=>.35+.65*Math.sin(p*Math.PI),()=>.4];return{stars:Z(ra(r)),nebula:Z(ia(r)),planets:[0,1,2,3].map(p=>Z(ca(p,r,o))),moon:Z(la(a.moon,r,o,t)),clouds:a.clouds.map(([p,l],f)=>Z(pa(401+f*31,p,l,e[f],r,o,t))),curtain:Z(da(a.curtain[0],a.curtain[1],r,o,t)),figure:Z(ua(a.figure[0],a.figure[1],r,o,t)),rain:Z(fa(r)),grain:Z(ma())}}function ya(s,t){const a=t,r=O(5),o={n:a,role:new Uint8Array(a),r1:new Float32Array(a),r2:new Float32Array(a),r3:new Float32Array(a),r4:new Float32Array(a),bx:new Float32Array(a),by:new Float32Array(a),ba:new Float32Array(a),delay:new Float32Array(a),twist:new Float32Array(a),size:new Float32Array(a),depth:new Float32Array(a),ox:new Float32Array(a),oy:new Float32Array(a)},e=[-.42,-.46,.78],p=s.W*.028;for(let l=0;l<a;l++){const f=l/a,m=f<.22?0:f<.46?1:f<.78?2:3,u=r(),b=r(),c=r(),h=r();o.role[l]=m,o.r1[l]=u,o.r2[l]=b,o.r3[l]=c,o.r4[l]=h,o.size[l]=.9+Math.pow(h,5)*1.3,o.depth[l]=s.u*(m===3?.012+h*.014:.008),o.twist[l]=(c-.5)*.7;let x=0,k=0,P=0;if(m===0){const v=s.moonR*Math.sqrt(u)*.97,A=b*Math.PI*2,F=Math.cos(A)*v/s.moonR,E=Math.sin(A)*v/s.moonR,Q=Math.sqrt(Math.max(0,1-F*F-E*E)),fs=Math.max(0,F*e[0]+E*e[1]+Q*e[2]);x=s.moonX+F*s.moonR,k=s.moonY+E*s.moonR,P=.12+.88*fs,o.delay[l]=h*.15}else if(m===1){const v=u+h-1,A=c<.55?s.moonR*(1.5+v*.16):s.moonR*(2.15+v*.3);x=s.moonX+Math.cos(b*Math.PI*2)*A,k=s.moonY+Math.sin(b*Math.PI*2)*A,P=c<.55?.55:.3,o.delay[l]=.08+h*.2}else if(m===2){const v=oa(s,u,b<.55?0:p);x=v.x+(c-.5)*2.2,k=v.y+(h-.5)*2.2,P=.55+.45*c,o.delay[l]=.12+u*.28}else if(c<.5){const v=(s.right-s.left)*.5,A=(u-.5)*2;x=s.cx+A*v,k=s.floor+(b-.35)*s.H*.025*(.4+Math.abs(A)),P=.15+.7*Math.pow(1-Math.abs(A),1.5),o.delay[l]=.2+h*.2}else x=u*s.w,k=b*s.h,P=.1+.55*Math.pow(h,3),o.delay[l]=h*.4;o.bx[l]=x,o.by[l]=k,o.ba[l]=P}return o}const ga=`
.ssp-root {
  position: relative;
  width: 100%;
  overflow: hidden;
  isolation: isolate;
  background: var(--ssp-stage);
  color: var(--ssp-ink);
  font-family: var(--ssp-mono);
  -webkit-tap-highlight-color: transparent;
}
.ssp-root svg, .ssp-root canvas, .ssp-root img { max-width: none; }
.ssp-dest {
  position: absolute;
  inset: 0;
  overflow-y: auto;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.9s ease 0.15s;
}
.ssp-root[data-phase="lift"] .ssp-dest, .ssp-dest[data-active="true"] { opacity: 1; pointer-events: auto; }
.ssp-gate {
  position: absolute;
  inset: 0;
  z-index: 10;
  background: var(--ssp-stage);
  cursor: pointer;
  outline: none;
  user-select: none;
  -webkit-user-select: none;
  transition: opacity 1.1s cubic-bezier(0.7, 0, 0.3, 1) 0.2s;
}
.ssp-root[data-phase="lift"] .ssp-gate { opacity: 0; pointer-events: none; }
.ssp-gate:focus-visible .ssp-frame { box-shadow: inset 0 0 0 1px var(--ssp-dim); }
.ssp-layer { position: absolute; inset: 0; pointer-events: none; }

/* ---- the sky ---- */
.ssp-sky {
  inset: -4%;
  background-image: var(--ssp-stars);
  background-size: 512px 512px;
  opacity: 0.75;
  transform: translate3d(calc(var(--ssp-mx) * -8px), calc(var(--ssp-my) * -6px), 0);
}
.ssp-nebula {
  inset: -6%;
  opacity: 0.3;
  transform: translate3d(calc(var(--ssp-mx) * -16px), calc(var(--ssp-my) * -12px), 0) scale(1);
  transition: opacity 1.8s ease, transform 2.6s cubic-bezier(0.55, 0, 0.2, 1);
}
.ssp-nebula-drift {
  position: absolute;
  inset: 0;
  background-image: var(--ssp-nebula);
  background-size: cover;
  background-position: 50% 50%;
  image-rendering: pixelated;
  animation: ssp-nebula 60s ease-in-out infinite alternate;
}
.ssp-root:not([data-phase="load"]) .ssp-nebula {
  opacity: 0;
  transform: translate3d(calc(var(--ssp-mx) * -16px), calc(var(--ssp-my) * -12px), 0) scale(1.6);
}
.ssp-spark {
  position: absolute;
  display: block;
  fill: var(--ssp-ink);
  filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.55));
  animation: ssp-twinkle 3.6s ease-in-out infinite;
}
.ssp-skyspark { transform: translate(-50%, -50%); }

/* ---- the cosmos: star, flares, planets ---- */
.ssp-rig {
  position: absolute;
  width: 0;
  height: 0;
  transition: transform 2s cubic-bezier(0.65, 0, 0.25, 1) 0.1s, opacity 1.2s ease 1.1s;
}
.ssp-root:not([data-phase="load"]) .ssp-rig { transform: translate(var(--ssp-dx), var(--ssp-dy)) scale(0.35); opacity: 0; }
.ssp-glow {
  position: absolute;
  left: calc(var(--ssp-u) * -0.32);
  top: calc(var(--ssp-u) * -0.32);
  width: calc(var(--ssp-u) * 0.64);
  height: calc(var(--ssp-u) * 0.64);
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.05) 40%, transparent);
  opacity: calc(0.35 + var(--ssp-p) * 0.65);
}
.ssp-flare {
  position: absolute;
  left: calc(var(--ssp-u) * -0.75);
  top: -0.5px;
  width: calc(var(--ssp-u) * 1.5);
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--ssp-ink) 47%, var(--ssp-ink) 53%, transparent);
  opacity: 0.75;
  transform: rotate(var(--a)) scaleX(calc(0.18 + var(--ssp-p) * 0.82));
}
.ssp-flare-b { opacity: 0.4; }
.ssp-core {
  position: absolute;
  left: calc(var(--ssp-u) * -0.06);
  top: calc(var(--ssp-u) * -0.06);
  width: calc(var(--ssp-u) * 0.12);
  height: calc(var(--ssp-u) * 0.12);
  animation: ssp-pulse 2.4s ease-in-out infinite;
}
.ssp-core svg {
  display: block;
  width: 100%;
  height: 100%;
  fill: var(--ssp-ink);
  filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.9)) drop-shadow(0 0 18px rgba(255, 255, 255, 0.5));
}
.ssp-orbit {
  position: absolute;
  left: calc(var(--ssp-u) * -0.2);
  top: calc(var(--ssp-u) * -0.2);
  width: calc(var(--ssp-u) * 0.4);
  height: calc(var(--ssp-u) * 0.4);
  animation: ssp-spin 16s linear infinite;
}
.ssp-moonlet {
  position: absolute;
  width: 5px;
  height: 5px;
  margin: -2.5px 0 0 -2.5px;
  border-radius: 50%;
  background: var(--ssp-ink);
  box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
}
.ssp-planet-par {
  position: absolute;
  width: 0;
  height: 0;
  transform: translate3d(calc(var(--ssp-mx) * var(--d) * -1px), calc(var(--ssp-my) * var(--d) * -1px), 0);
}
.ssp-planet {
  position: absolute;
  transition: transform 1.5s cubic-bezier(0.6, 0, 0.9, 0.4), opacity 1.1s ease 0.25s;
}
.ssp-root:not([data-phase="load"]) .ssp-planet {
  transform: translate(calc(var(--vx) * var(--ssp-u) * 0.9), calc(var(--vy) * var(--ssp-u) * 0.9)) scale(2.4);
  opacity: 0;
}
.ssp-planet img {
  display: block;
  width: 100%;
  height: 100%;
  image-rendering: pixelated;
  animation: ssp-float var(--f) ease-in-out infinite alternate;
}

.ssp-rays {
  position: absolute;
  left: calc(var(--ssp-u) * -0.9);
  top: calc(var(--ssp-u) * -0.9);
  width: calc(var(--ssp-u) * 1.8);
  height: calc(var(--ssp-u) * 1.8);
  overflow: visible;
  stroke: var(--ssp-ink);
  stroke-width: 0.22;
  stroke-linecap: round;
  opacity: calc(0.12 + var(--ssp-p) * 0.6);
  -webkit-mask-image: radial-gradient(closest-side, #000 30%, transparent 100%);
  mask-image: radial-gradient(closest-side, #000 30%, transparent 100%);
}
.ssp-rays line { animation: ssp-flow linear infinite; }

/* ---- the dots ---- */
.ssp-dots { position: absolute; left: 0; top: 0; pointer-events: none; }

/* ---- the stage ---- */
.ssp-stage {
  position: absolute;
  pointer-events: none;
  transform-origin: 50% 40%;
  transition: transform 1.6s cubic-bezier(0.7, 0, 0.84, 0), filter 1.6s ease;
}
.ssp-root[data-phase="lift"] .ssp-stage { transform: scale(2.6); filter: blur(6px); }
.ssp-par { position: absolute; inset: 0; }
.ssp-par-far { transform: translate3d(calc(var(--ssp-mx) * -6px), calc(var(--ssp-my) * -4px), 0); }
.ssp-par-mid { transform: translate3d(calc(var(--ssp-mx) * -12px), calc(var(--ssp-my) * -6px), 0); }
.ssp-par-near { transform: translate3d(calc(var(--ssp-mx) * -20px), calc(var(--ssp-my) * -8px), 0); }
.ssp-moon {
  position: absolute;
  border-radius: 50%;
  background-size: 100% 100%;
  opacity: 0;
  transform: scale(0.7);
  transition: opacity 1.4s ease, transform 2.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.ssp-root:not([data-phase="load"]) .ssp-moon { opacity: 1; transform: none; transition-delay: 1.5s; }
.ssp-moonglow {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.04) 55%, transparent);
  opacity: 0;
  transition: opacity 2s ease 1.6s;
}
.ssp-root:not([data-phase="load"]) .ssp-moonglow { opacity: 1; }
.ssp-cloud {
  position: absolute;
  opacity: 0;
  transform: translate3d(0, 34%, 0);
  transition: transform 2.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.6s ease;
}
.ssp-root:not([data-phase="load"]) .ssp-cloud { opacity: 1; transform: none; transition-delay: var(--w); }
.ssp-cloud-drift, .ssp-curtain-sway { position: absolute; inset: 0; background-image: var(--bg); background-size: 100% 100%; }
.ssp-cloud-drift { animation: ssp-drift var(--f) ease-in-out infinite alternate; }
.ssp-arch {
  position: absolute;
  left: 0;
  top: 0;
  overflow: visible;
  fill: none;
  stroke: var(--ssp-ink);
  stroke-linecap: round;
}
.ssp-draw {
  stroke-dasharray: 1 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 2.4s cubic-bezier(0.65, 0, 0.35, 1);
}
.ssp-root:not([data-phase="load"]) .ssp-draw { stroke-dashoffset: 0; transition-delay: var(--w); }
.ssp-orn { opacity: 0; transition: opacity 1.4s ease; }
.ssp-root:not([data-phase="load"]) .ssp-orn { opacity: 1; transition-delay: 2s; }
.ssp-curtain {
  position: absolute;
  clip-path: inset(0 0 100% 0);
  transition: clip-path 2.2s cubic-bezier(0.65, 0, 0.35, 1);
}
.ssp-curtain-r { transform: scaleX(-1); }
.ssp-root:not([data-phase="load"]) .ssp-curtain { clip-path: inset(0 0 0 0); transition-delay: 1.1s; }
.ssp-curtain-sway { transform-origin: 50% 0; animation: ssp-sway 7s ease-in-out infinite alternate; }
.ssp-figure {
  position: absolute;
  background-size: 100% 100%;
  opacity: 0;
  transform: translateY(8%);
  transition: opacity 1.4s ease, transform 2s cubic-bezier(0.16, 1, 0.3, 1);
}
.ssp-root:not([data-phase="load"]) .ssp-figure { opacity: 1; transform: none; transition-delay: 2.1s; }
.ssp-pool {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.05) 50%, transparent);
  opacity: 0;
  transition: opacity 1.6s ease 1.9s;
}
.ssp-root:not([data-phase="load"]) .ssp-pool { opacity: 1; }
.ssp-mirror {
  position: absolute;
  left: 0;
  overflow: hidden;
  opacity: 0.32;
  filter: blur(0.6px);
  -webkit-mask-image: linear-gradient(to bottom, #000, transparent 75%);
  mask-image: linear-gradient(to bottom, #000, transparent 75%);
}
.ssp-mirror-flip { position: absolute; left: 0; }
.ssp-stagespark { opacity: 0; transition: opacity 1s ease; }
.ssp-root:not([data-phase="load"]) .ssp-stagespark { opacity: 1; transition-delay: 2.4s; }

/* ---- weather, lens and film ---- */
.ssp-rain {
  background-image: var(--ssp-rain);
  background-size: 256px 256px;
  opacity: 0;
  transition: opacity 2s ease 1s;
  animation: ssp-rain 0.9s linear infinite;
}
.ssp-root[data-rain="true"]:not([data-phase="load"]) .ssp-rain { opacity: 0.45; }
.ssp-vignette { background: radial-gradient(ellipse at 50% 46%, transparent 42%, rgba(0, 0, 0, 0.82) 100%); }
.ssp-grain {
  inset: -50%;
  opacity: 0.5;
  mix-blend-mode: overlay;
  background-image: var(--ssp-grain);
  background-size: 160px 160px;
  animation: ssp-grain 0.8s steps(5) infinite;
}
.ssp-bar {
  position: absolute;
  left: 0;
  right: 0;
  height: max(26px, calc(var(--ssp-u) * 0.065));
  background: #000;
  z-index: 3;
  transition: transform 1.4s cubic-bezier(0.7, 0, 0.3, 1);
}
.ssp-bar-top { top: 0; transform: translateY(-100%); }
.ssp-bar-bot { bottom: 0; transform: translateY(100%); }
.ssp-root[data-phase="morph"] .ssp-bar, .ssp-root[data-phase="reveal"] .ssp-bar { transform: none; }

/* ---- read-outs ---- */
.ssp-readout {
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  pointer-events: none;
  transition: opacity 0.7s ease, transform 1.1s cubic-bezier(0.6, 0, 0.3, 1);
}
.ssp-root:not([data-phase="load"]) .ssp-readout { opacity: 0; transform: translateY(16px); }
.ssp-count {
  margin: 0;
  font-size: max(13px, calc(var(--ssp-u) * 0.026));
  font-weight: 300;
  letter-spacing: 0.5em;
  text-indent: 0.5em;
  font-variant-numeric: tabular-nums;
}
.ssp-act {
  margin: calc(var(--ssp-u) * 0.012) 0 0;
  font-size: max(9px, calc(var(--ssp-u) * 0.0135));
  letter-spacing: 0.34em;
  text-indent: 0.34em;
  text-transform: uppercase;
  color: var(--ssp-dim);
  animation: ssp-act-in 0.9s ease both;
}
.ssp-title {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 2;
  text-align: center;
  pointer-events: none;
}
.ssp-word {
  margin: 0;
  font-family: var(--ssp-display);
  font-size: max(26px, calc(var(--ssp-u) * 0.072));
  font-weight: 400;
  letter-spacing: 0.3em;
  text-indent: 0.3em;
  line-height: 1;
  text-transform: uppercase;
  white-space: nowrap;
}
.ssp-letter {
  display: inline-block;
  color: transparent;
  background: linear-gradient(180deg, var(--ssp-ink) 20%, var(--ssp-dim) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  opacity: 0;
  filter: blur(12px);
  transform: translateY(0.35em) scale(1.15);
}
.ssp-root[data-phase="reveal"] .ssp-letter, .ssp-root[data-phase="lift"] .ssp-letter {
  animation: ssp-letter 1.4s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
}
.ssp-caption, .ssp-hint {
  margin: calc(var(--ssp-u) * 0.02) 0 0;
  font-size: max(9px, calc(var(--ssp-u) * 0.0145));
  letter-spacing: 0.34em;
  text-indent: 0.34em;
  text-transform: uppercase;
  color: var(--ssp-dim);
  opacity: 0;
  transition: opacity 1.2s ease 1s, letter-spacing 2s cubic-bezier(0.2, 0.7, 0.2, 1) 1s;
}
.ssp-hint { font-size: max(8px, calc(var(--ssp-u) * 0.012)); transition-delay: 2.2s; }
.ssp-root[data-phase="reveal"] .ssp-caption { opacity: 1; letter-spacing: 0.44em; }
.ssp-root[data-phase="reveal"] .ssp-hint { opacity: 0.7; animation: ssp-breathe 2.6s ease-in-out 3s infinite; }
.ssp-veil {
  position: absolute;
  inset: 0;
  z-index: 6;
  background: var(--ssp-stage);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.75s ease;
}
.ssp-veil[data-on="true"] { opacity: 1; }
.ssp-frame { position: absolute; inset: 0; z-index: 7; pointer-events: none; }
.ssp-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

@keyframes ssp-flow { to { stroke-dashoffset: -12; } }
@keyframes ssp-spin { to { transform: rotate(360deg); } }
@keyframes ssp-pulse {
  0%, 100% { transform: scale(0.88) rotate(0deg); }
  50% { transform: scale(1.08) rotate(8deg); }
}
@keyframes ssp-twinkle {
  0%, 100% { transform: translate(-50%, -50%) scale(0.55) rotate(0deg); opacity: 0.45; }
  50% { transform: translate(-50%, -50%) scale(1) rotate(45deg); opacity: 1; }
}
@keyframes ssp-float {
  from { transform: translate3d(0, -4%, 0); }
  to { transform: translate3d(0, 4%, 0); }
}
@keyframes ssp-drift {
  from { transform: translate3d(-1.2%, 0, 0); }
  to { transform: translate3d(1.2%, -1%, 0); }
}
@keyframes ssp-sway {
  from { transform: skewX(-0.6deg); }
  to { transform: skewX(0.6deg); }
}
@keyframes ssp-nebula {
  from { transform: translate3d(-1.5%, 1%, 0); }
  to { transform: translate3d(1.5%, -1%, 0); }
}
@keyframes ssp-rain {
  from { background-position: 0 0; }
  to { background-position: -24px 256px; }
}
@keyframes ssp-grain {
  0% { transform: translate(0, 0); }
  25% { transform: translate(-6%, 4%); }
  50% { transform: translate(5%, -6%); }
  75% { transform: translate(-3%, -8%); }
  100% { transform: translate(7%, 3%); }
}
@keyframes ssp-letter {
  to { opacity: 1; filter: blur(0); transform: none; }
}
@keyframes ssp-act-in {
  from { opacity: 0; filter: blur(6px); }
  to { opacity: 1; filter: blur(0); }
}
@keyframes ssp-breathe { 50% { opacity: 0.3; } }

@media (prefers-reduced-motion: reduce) {
  .ssp-nebula-drift, .ssp-rays line, .ssp-core, .ssp-orbit, .ssp-planet img, .ssp-cloud-drift, .ssp-curtain-sway { animation: none; }
  .ssp-spark { animation: none; transform: translate(-50%, -50%); }
  .ssp-rain { display: none; }
  .ssp-grain { animation: none; }
  .ssp-hint { animation: none; }
  .ssp-rig, .ssp-planet, .ssp-cloud, .ssp-moon, .ssp-figure, .ssp-stage { transition-property: opacity; }
  .ssp-curtain { transition: none; }
  .ssp-draw { transition-duration: 0.01s; }
  .ssp-root:not([data-phase="load"]) .ssp-rig, .ssp-root:not([data-phase="load"]) .ssp-planet { transform: none; }
  .ssp-root[data-phase="lift"] .ssp-stage { transform: none; filter: none; }
  .ssp-letter { filter: none; transform: none; }
}
`,Nt=3e3,xa=4200,At=1500,ba=800;function St({className:s,style:t}){return i.jsx("svg",{className:"ssp-spark "+s,viewBox:"-1 -1 2 2",style:t,"aria-hidden":"true",children:i.jsx("path",{d:Pt})})}function Ma({children:s,loop:t=!1,progress:a,durationMs:r=5200,word:o="Nocturne",caption:e="Act I · The sky takes the stage",acts:p=Bt,palette:l,density:f=1,figure:m=!0,rain:u=!0,planets:b=!0,counter:c=!0,fontFamily:h=Ut,height:x="100svh",onComplete:k,className:P=""}){const[v,A]=j.useState("load"),[F,E]=j.useState(0),[Q,fs]=j.useState(0),[_,ms]=j.useState(!1),[w,Ht]=j.useState(null),[hs,Ct]=j.useState({w:1280,h:800}),xs=j.useRef(null),tt=j.useRef(null),Ds=j.useRef(null),ws=j.useRef(!1),at=j.useRef(0),et=j.useRef("load"),Es=j.useRef(0),ot=j.useRef(a);ot.current=a;const Rs=j.useRef(k);Rs.current=k;const cs={..._t,...l},nt=j.useRef(cs.ink);nt.current=cs.ink;const qs=Math.min(2,Math.max(.3,f)),n=j.useMemo(()=>ea(hs.w,hs.h),[hs.w,hs.h]),Ys=j.useRef(n);Ys.current=n;const rt=Math.round(Math.min(3600,Math.max(1300,hs.w*hs.h/300))*qs),it=j.useMemo(()=>ya(n,rt),[n,rt]),ct=j.useRef(it);ct.current=it,j.useEffect(()=>{et.current=v,Es.current=performance.now()},[v]);const lt=Math.min(2,typeof devicePixelRatio=="number"?devicePixelRatio:1),zt=JSON.stringify([cs,qs,Math.round(n.W/60),Math.round(n.H/60),lt]);j.useEffect(()=>{try{Ht(ha(cs,qs,na(Ys.current,lt)))}catch{}},[zt]),j.useEffect(()=>{const d=xs.current;if(!d)return;const y=()=>{const M=d.getBoundingClientRect();M.width>0&&M.height>0&&Ct({w:Math.round(M.width),h:Math.round(M.height)})};if(y(),typeof ResizeObserver>"u")return;const g=new ResizeObserver(y);return g.observe(d),()=>g.disconnect()},[]),j.useEffect(()=>{if(v!=="load")return;const d=xs.current;let y=0,g=0,M=performance.now();const H=M;let I=-1;ws.current=!1;const U=Y=>{at.current=Y,d==null||d.style.setProperty("--ssp-p",Y.toFixed(4));const X=Math.round(Y*100);X!==I&&(I=X,E(X))},D=Y=>{const X=Math.min(64,Y-M);M=Y;const ss=ot.current;let ps=ss!==void 0?ns(ss/100):Qt((Y-H)/Math.max(400,r));ws.current&&(ps=1);const ds=ws.current?.09:ss!==void 0?.1:1;if(g+=(ps-g)*Math.min(1,ds*(X/16.7)),ps-g<.002&&(g=ps),U(g),g>=1){A("morph");return}y=requestAnimationFrame(D)};return U(0),y=requestAnimationFrame(D),()=>cancelAnimationFrame(y)},[v,Q,r]),j.useEffect(()=>{const d=tt.current,y=xs.current;if(!d||!y)return;const g=d.getContext("2d");if(!g)return;const M=typeof matchMedia<"u"&&matchMedia("(prefers-reduced-motion: reduce)").matches;let H=0,I=performance.now();const U=I;let D=0,Y=0,X=0,ss=0;const ps=ds=>{const yt=Math.min(64,ds-I);I=ds;const ts=M?0:(ds-U)/1e3,N=Ys.current,T=ct.current,Bs=et.current,Ps=at.current,as=Ds.current;let Us=0,Gs=0;as&&!as.touch?(Us=as.x,Gs=as.y):M||(Us=Math.sin(ts*.37)*.4,Gs=Math.sin(ts*.23+1.1)*.25),X+=(Us-X)*.06,ss+=(Gs-ss)*.06,y.style.setProperty("--ssp-mx",X.toFixed(4)),y.style.setProperty("--ssp-my",ss.toFixed(4)),Bs==="load"?D=0:Bs==="morph"?D=Math.max(D,ns((ds-Es.current)/(M?500:Nt*.85))):D=Math.min(1,D+yt/700);const Ts=Bs==="lift"?ns((ds-Es.current)/At):0;Y+=yt/1e3*(.05+.3*Ps)*(M?0:1);const Is=Math.min(2,typeof devicePixelRatio=="number"?devicePixelRatio:1),gt=Math.round(N.w*Is),xt=Math.round(N.h*Is);(d.width!==gt||d.height!==xt)&&(d.width=gt,d.height=xt,d.style.width=N.w+"px",d.style.height=N.h+"px"),g.setTransform(Is,0,0,Is,0,0),g.clearRect(0,0,N.w,N.h),g.fillStyle=nt.current;const bt=N.u*.2,Ks=Math.PI*2,vt=Math.cos(ts*.05),Mt=Math.sin(ts*.05),Fs=N.u*.12,Xt=as?as.px:-1e5,Ot=as?as.py:-1e5;for(let S=0;S<T.n;S++){const Hs=T.role[S],us=T.r1[S],vs=T.r2[S],gs=T.r3[S],Cs=T.r4[S];let G=0,K=0,V=0;if(D<1)if(Hs===0){const R=N.u*.075*Math.pow(us,1.5)*(1+.06*Math.sin(ts*1.6+gs*9)),C=vs*Ks+ts*.14*(1-us);G=N.cx+Math.cos(C)*R,K=N.cy+Math.sin(C)*R,V=(.25+.75*(1-us))*(.35+.65*Ps)}else if(Hs===1){const R=-Math.PI/2+us*Ks+Math.sin(ts*.6+gs*6)*.004,C=bt*(1+(vs-.5)*.045);G=N.cx+Math.cos(R)*C,K=N.cy+Math.sin(R)*C,V=.09+.91*ta(us,Ps)}else if(Hs===2){const R=Math.floor(us*64)/64*Ks+(vs-.5)*.02+.05,C=(gs+Y*(.6+.8*Cs))%1,L=bt*1.18+Math.pow(C,1.7)*N.u*.95;G=N.cx+Math.cos(R)*L,K=N.cy+Math.sin(R)*L,V=Math.sin(Math.PI*C)*(.1+.7*Ps)*(.4+.6*Cs)}else gs<.5?(G=us*N.w,K=Cs*N.h,V=.1+.45*vs*vs):(G=T.bx[S],K=T.by[S],V=T.ba[S]);let Ms=T.bx[S],ks=T.by[S];if(Hs===1){const R=Ms-N.moonX,C=ks-N.moonY,L=gs<.55?1:-1;Ms=N.moonX+R*vt-C*Mt*L,ks=N.moonY+R*Mt*L+C*vt}const Vs=T.ba[S];let es=G,os=K,J=V;if(D>=1)es=Ms,os=ks,J=Vs;else if(D>0){const R=$t(sa(D,T.delay[S]));if(M)es=R<.5?G:Ms,os=R<.5?K:ks,J=R<.5?V*(1-R*2):Vs*(R*2-1);else{const C=Math.sin(Math.PI*R)*T.twist[S],L=Ms-G,Rt=ks-K;es=G+L*R-Rt*C,os=K+Rt*R+L*C,J=V+(Vs-V)*R+Math.sin(Math.PI*R)*.35}}if(M||(J*=.8+.2*Math.sin(ts*(1.4+gs*3)+Cs*40)),Ts>0){const R=1+Ts*Ts*2.4;es=N.moonX+(es-N.moonX)*R,os=N.moonY+(os-N.moonY)*R,J*=1-Ts}let kt=0,wt=0;const Js=es-Xt,Zs=os-Ot,Qs=Js*Js+Zs*Zs;if(Qs<Fs*Fs&&Qs>.01){const R=Math.sqrt(Qs),C=1-R/Fs,L=C*C*Fs*.55;kt=Js/R*L,wt=Zs/R*L,J+=C*.5}if(T.ox[S]+=(kt-T.ox[S])*.12,T.oy[S]+=(wt-T.oy[S])*.12,es+=T.ox[S]-X*T.depth[S],os+=T.oy[S]-ss*T.depth[S],J<.02)continue;g.globalAlpha=J>1?1:J;const zs=T.size[S];g.fillRect(es-zs*.5,os-zs*.5,zs,zs)}g.globalAlpha=1,H=requestAnimationFrame(ps)};return H=requestAnimationFrame(ps),()=>cancelAnimationFrame(H)},[]),j.useEffect(()=>{if(v==="morph"){const d=setTimeout(()=>A("reveal"),Nt);return()=>clearTimeout(d)}if(v==="reveal"){const d=setTimeout(()=>{t?ms(!0):A("lift")},xa);return()=>clearTimeout(d)}if(v==="lift"){const d=setTimeout(()=>{var y;A("done"),(y=Rs.current)==null||y.call(Rs)},At);return()=>clearTimeout(d)}},[v,t]),j.useEffect(()=>{if(!_)return;const d=setTimeout(()=>{E(0),A("load"),fs(y=>y+1),ms(!1)},ba);return()=>clearTimeout(d)},[_]);const pt=()=>{_||(v==="load"?ws.current=!0:v==="morph"?A("reveal"):v==="reveal"&&(t?ms(!0):A("lift")))},dt=d=>{const y=xs.current;if(!y)return;const g=y.getBoundingClientRect();Ds.current={x:(d.clientX-g.left)/g.width*2-1,y:(d.clientY-g.top)/g.height*2-1,px:d.clientX-g.left,py:d.clientY-g.top,touch:d.pointerType==="touch"}},Wt=()=>{Ds.current=null},ut=v==="load",js=p.length?p[aa(F/100,p.length)]:"",Dt=t?"Click to replay":"Click to enter",B=d=>d?'url("'+d+'")':"none",Ns=d=>d-n.x0,bs=d=>d-n.y0,$=Ns(n.left),ls=Ns(n.right),q=bs(n.spring),Et=bs(n.crown),z=bs(n.floor),As=(ls-$)/2,Ls=q-Et,ys=n.W*.028,qt="M"+$+" "+z+"V"+q+"A"+As+" "+Ls+" 0 0 1 "+ls+" "+q+"V"+z,Yt="M"+($+ys)+" "+z+"V"+q+"A"+(As-ys)+" "+(Ls-ys)+" 0 0 1 "+(ls-ys)+" "+q+"V"+z,W=n.W*.022,Lt=(()=>{const y=As-ys*2.1,g=Ls-ys*2.1,M=$+As;let H="";for(let I=0;I<=16;I++){const U=Math.PI-I/16*Math.PI,D=M+y*Math.cos(U),Y=q-g*Math.sin(U);H+=(I===0?"M":"A"+(y*.11).toFixed(1)+" "+(y*.11).toFixed(1)+" 0 0 0 ")+D.toFixed(1)+" "+Y.toFixed(1)}return H})(),Xs=n.H*st,ft=Xs/2,Os=q-n.H*.02,_s=n.W*It,mt=z-Os,Ss=d=>{const[y,g,M,H,I,U]=Tt[d];return i.jsx("div",{className:"ssp-cloud",style:{left:n.W*y,top:z-n.H*g,width:n.W*M,height:n.H*H,"--bg":B(w==null?void 0:w.clouds[d]),"--w":I+"s"},children:i.jsx("div",{className:"ssp-cloud-drift",style:{"--f":U+"s"}})})},ht=d=>i.jsxs(i.Fragment,{children:[i.jsxs("div",{className:"ssp-par ssp-par-far",children:[i.jsx("div",{className:"ssp-moonglow",style:{left:Ns(n.moonX)-n.moonR*4,top:bs(n.moonY)-n.moonR*4,width:n.moonR*8,height:n.moonR*8}}),i.jsx("div",{className:"ssp-moon",style:{left:Ns(n.moonX)-n.moonR,top:bs(n.moonY)-n.moonR,width:n.moonR*2,height:n.moonR*2,backgroundImage:B(w==null?void 0:w.moon)}}),Ss(2)]}),i.jsxs("div",{className:"ssp-par ssp-par-mid",children:[Ss(0),Ss(1),Ss(3)]}),i.jsxs("div",{className:"ssp-par ssp-par-near",children:[i.jsxs("svg",{className:"ssp-arch",width:n.W,height:n.H,viewBox:"0 0 "+n.W+" "+n.H,"aria-hidden":"true",children:[i.jsx("path",{className:"ssp-draw",pathLength:1,d:qt,strokeWidth:2.2,style:{"--w":"0.4s"}}),i.jsx("path",{className:"ssp-draw",pathLength:1,d:Yt,strokeWidth:1,opacity:.7,style:{"--w":"0.7s"}}),i.jsx("path",{className:"ssp-orn",d:Lt,strokeWidth:1,strokeDasharray:"1.5 3",opacity:.65}),[$-W,ls+W].map((y,g)=>i.jsx("path",{className:"ssp-draw",pathLength:1,d:"M"+y+" "+z+"V"+(q+n.H*.02),strokeWidth:1,opacity:.55,style:{"--w":"0.9s"}},g)),[$,ls].map((y,g)=>i.jsxs("g",{className:"ssp-orn",strokeWidth:1.2,children:[i.jsx("path",{d:"M"+(y-W*1.6)+" "+(q+n.H*.02)+"H"+(y+W*1.6)}),i.jsx("path",{d:"M"+(y-W*1.3)+" "+(q+n.H*.035)+"H"+(y+W*1.3),opacity:.6}),i.jsx("path",{d:"M"+(y-W*1.7)+" "+(z-1)+"H"+(y+W*1.7)}),i.jsx("path",{d:"M"+(y-W*.5)+" "+(q+n.H*.05)+"V"+(z-n.H*.01),strokeDasharray:"1 4",opacity:.5}),i.jsx("path",{d:"M"+(y+W*.5)+" "+(q+n.H*.05)+"V"+(z-n.H*.01),strokeDasharray:"1 4",opacity:.5})]},"cap"+g)),i.jsx("path",{className:"ssp-orn",d:"M"+($-W*2)+" "+z+"H"+(ls+W*2),strokeWidth:1,opacity:.5})]}),i.jsx("div",{className:"ssp-curtain",style:{left:$+W*.4,top:Os,width:_s,height:mt,"--bg":B(w==null?void 0:w.curtain)},children:i.jsx("div",{className:"ssp-curtain-sway"})}),i.jsx("div",{className:"ssp-curtain ssp-curtain-r",style:{left:ls-W*.4-_s,top:Os,width:_s,height:mt,"--bg":B(w==null?void 0:w.curtain)},children:i.jsx("div",{className:"ssp-curtain-sway",style:{animationDelay:"-3s"}})}),i.jsx("div",{className:"ssp-pool",style:{left:n.W/2-n.W*.2,top:z-n.H*.04,width:n.W*.4,height:n.H*.08}}),m?i.jsx("div",{className:"ssp-figure",style:{left:n.W/2-ft/2,top:z-Xs+1,width:ft,height:Xs,backgroundImage:B(w==null?void 0:w.figure)}}):null,d?null:Jt.map(([y,g,M,H],I)=>i.jsx(St,{className:"ssp-skyspark ssp-stagespark",style:{left:y+"%",top:g+"%",width:n.u*M,height:n.u*M,animationDelay:H+"s"}},I))]})]});return i.jsxs("div",{ref:xs,className:"ssp-root "+P,"data-phase":v,"data-rain":u,style:{height:x,"--ssp-u":n.u+"px","--ssp-mx":0,"--ssp-my":0,"--ssp-p":0,"--ssp-dx":n.moonX-n.cx+"px","--ssp-dy":n.moonY-n.cy+"px","--ssp-stage":cs.stage,"--ssp-ink":cs.ink,"--ssp-dim":cs.dim,"--ssp-display":h,"--ssp-mono":Gt,"--ssp-stars":B(w==null?void 0:w.stars),"--ssp-nebula":B(w==null?void 0:w.nebula),"--ssp-rain":B(w==null?void 0:w.rain),"--ssp-grain":B(w==null?void 0:w.grain)},onPointerMove:dt,onPointerDown:dt,onPointerLeave:Wt,children:[i.jsx("style",{children:ga}),!t&&s?i.jsx("div",{className:"ssp-dest","data-active":v==="done","aria-hidden":v!=="done",children:s}):null,v!=="done"?i.jsxs("div",{className:"ssp-gate",role:"progressbar","aria-label":o+" is loading","aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":F,"aria-valuetext":ut?F+"%":"Loaded. Press Enter to continue.",tabIndex:0,onClick:pt,onKeyDown:d=>{(d.key==="Enter"||d.key===" ")&&(d.preventDefault(),pt())},children:[i.jsx("div",{className:"ssp-layer ssp-sky"}),i.jsx("div",{className:"ssp-layer ssp-nebula",children:i.jsx("div",{className:"ssp-nebula-drift"})}),Zt.map(([d,y,g,M],H)=>i.jsx(St,{className:"ssp-skyspark",style:{left:d+"%",top:y+"%",width:n.u*g,height:n.u*g,animationDelay:M+"s"}},H)),i.jsxs("div",{className:"ssp-layer","aria-hidden":"true",children:[b&&w?Vt.map(([d,y,g,M,H],I)=>i.jsx("div",{className:"ssp-planet-par",style:{left:n.cx+d*n.u,top:n.cy+y*n.u,"--d":10+g*60},children:i.jsx("div",{className:"ssp-planet",style:{left:-n.u*g*(M===3?1.9:1)/2,top:-n.u*g*(M===3?1.9:1)/2,width:n.u*g*(M===3?1.9:1),height:n.u*g*(M===3?1.9:1),"--vx":d,"--vy":y,"--f":H+"s"},children:i.jsx("img",{src:w.planets[M],alt:"",draggable:!1})})},I)):null,i.jsxs("div",{className:"ssp-stage",style:{left:n.x0,top:n.y0,width:n.W,height:n.H},children:[ht(!1),i.jsx("div",{className:"ssp-mirror",style:{top:z,width:n.W,height:n.H-z+n.H*.16},children:i.jsx("div",{className:"ssp-mirror-flip",style:{top:-z,width:n.W,height:n.H,transformOrigin:"50% "+z+"px",transform:"scaleY(-1)"},children:ht(!0)})})]}),i.jsxs("div",{className:"ssp-rig",style:{left:n.cx,top:n.cy},children:[i.jsx("div",{className:"ssp-glow"}),i.jsx("svg",{className:"ssp-rays",viewBox:"-100 -100 200 200","aria-hidden":"true",children:Kt.map(([d,y,g,M,H],I)=>i.jsx("line",{x1:Math.cos(d)*y,y1:Math.sin(d)*y,x2:Math.cos(d)*g,y2:Math.sin(d)*g,strokeDasharray:M+" "+(12-M),style:{animationDuration:H+"s"}},I))}),i.jsx("span",{className:"ssp-flare",style:{"--a":"-27deg"}}),i.jsx("span",{className:"ssp-flare ssp-flare-b",style:{"--a":"58deg"}}),i.jsxs("div",{className:"ssp-orbit",children:[i.jsx("i",{className:"ssp-moonlet",style:{left:"50%",top:"0%"}}),i.jsx("i",{className:"ssp-moonlet",style:{left:"93.3%",top:"75%"}}),i.jsx("i",{className:"ssp-moonlet",style:{left:"6.7%",top:"75%",transform:"scale(0.6)"}})]}),i.jsx("div",{className:"ssp-core",children:i.jsx("svg",{viewBox:"-1 -1 2 2","aria-hidden":"true",children:i.jsx("path",{d:Pt})})})]})]},Q),i.jsx("canvas",{ref:tt,className:"ssp-dots","aria-hidden":"true"}),c?i.jsxs("div",{className:"ssp-readout",style:{top:n.cy+n.u*.27},"aria-hidden":"true",children:[i.jsx("p",{className:"ssp-count",children:String(F).padStart(3,"0")}),js?i.jsx("p",{className:"ssp-act",children:js},js):null]}):null,i.jsxs("div",{className:"ssp-title",style:{top:n.floor+n.H*.045},"aria-hidden":"true",children:[i.jsx("p",{className:"ssp-word",children:Array.from(o).map((d,y)=>i.jsx("span",{className:"ssp-letter",style:{animationDelay:.1+y*.09+"s"},children:d===" "?" ":d},y+d))}),e?i.jsx("p",{className:"ssp-caption",children:e}):null,i.jsx("p",{className:"ssp-hint",children:Dt})]}),i.jsx("div",{className:"ssp-layer ssp-rain"}),i.jsx("div",{className:"ssp-layer ssp-vignette"}),i.jsx("div",{className:"ssp-layer ssp-grain"}),i.jsx("div",{className:"ssp-bar ssp-bar-top"}),i.jsx("div",{className:"ssp-bar ssp-bar-bot"}),i.jsx("div",{className:"ssp-frame"}),i.jsx("div",{className:"ssp-veil","data-on":_}),i.jsx("span",{className:"ssp-sr","aria-live":"polite",children:ut?js:o+" — "+e})]}):null]})}export{Ma as S};
