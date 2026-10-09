import{r as C,j as K}from"./index-CdiR0C0d.js";function Ue(e){let i=e>>>0;return()=>{i=i+1831565813>>>0;let r=i;return r=Math.imul(r^r>>>15,r|1),r^=r+Math.imul(r^r>>>7,r|61),((r^r>>>14)>>>0)/4294967296}}function je(e){return(Math.imul((e^2654435769)>>>0,2246822507)>>>0)%999983+1}function ae(e){let i=e.trim().replace(/^#/,"");i.length===3&&(i=i.replace(/./g,"$&$&"));const r=/^[0-9a-f]{6}$/i.test(i)?parseInt(i,16):0;return[(r>>16&255)/255,(r>>8&255)/255,(r&255)/255]}function Ve(e,i){const r=Ue(e),t=(s,n)=>s+(r()*2-1)*n,l=i<.85,a=[t(.5,.05),t(l?.52:.58,.04)],m=[],u=[],p=[];for(const s of[-2.55,-2.1,-1.7,-1.3,-.85,-.35,.15,.6,2.5,2.95,3.4])m.push({kind:"leaf",x:a[0]+t(0,.03),y:a[1]+t(0,.03),r:t(l?.4:.47,.08),a:t(s,.14),k:t(.27,.05),b:t(0,.3),tone:t(.55,.15)});(l?[[.5,.1,.32],[.26,.4,.26],[.74,.63,.28],[.3,.88,.29]]:[[.47,.12,.33],[.24,.8,.29],[.7,.8,.32]]).forEach(([s,n,c],d)=>{const T=r()<(d===0?.75:.5)?"lily":"rose",w=2+Math.floor(r()*2);for(let M=0;M<w;M++)m.push({kind:"leaf",x:s+t(0,.02),y:n+t(0,.02),r:c*t(1.45,.25),a:r()*Math.PI*2,k:t(.3,.05),b:t(0,.35),tone:t(.5,.15)});u.push({kind:T,x:t(s,.05),y:t(n,.04),r:t(c,.035)*(T==="rose"?.85:1),a:r()*Math.PI*2,k:t(.78,.14),b:0,tone:t(.94,.05)})}),u.some(s=>s.kind==="rose")||(u[1]={...u[1],kind:"rose",r:u[1].r*.85}),u.some(s=>s.kind==="lily")||(u[2]={...u[2],kind:"lily"});for(const[s,n]of[[.19,.3],[.84,.17],[.9,.56]]){const c=t(s,.04),d=t(n,.04);p.push({kind:"bud",x:c,y:d,r:t(.075,.02),a:Math.atan2(d-a[1],(c-a[0])*i)+t(0,.3),k:0,b:0,tone:t(.8,.1)})}return u.sort((s,n)=>s.y-n.y),{heart:a,blooms:[...m,...p,...u]}}function Be(e,i,r){const t=Math.min(Math.min(r,1.5),1600/Math.max(e,i,1));return[Math.max(2,Math.round(e*t)),Math.max(2,Math.round(i*t))]}const D=Math.PI*2,_=e=>{const i=Math.round(Math.min(1,Math.max(0,e))*255);return"rgb("+i+","+i+","+i+")"},y=e=>"rgba(0,0,0,"+e+")",me=e=>"rgba(255,255,255,"+e+")";function Ke(e,i,r,t,l){const a=t*l.k,m=l.b,u=l.tone,p=M=>m*t*M*M;e.save(),e.translate(i,r),e.rotate(l.a);const h=new Path2D;h.moveTo(0,0),h.bezierCurveTo(t*.22,-a*1.05+p(.22),t*.68,-a*.8+p(.68),t,p(1)),h.quadraticCurveTo(t*.5,0,0,0);const s=new Path2D;s.moveTo(0,0),s.bezierCurveTo(t*.22,a*.95+p(.22),t*.68,a*.72+p(.68),t,p(1)),s.quadraticCurveTo(t*.5,0,0,0);const n=new Path2D;n.addPath(h),n.addPath(s);const c=p(.5),d=e.createLinearGradient(0,c,0,c-a*.9);d.addColorStop(0,_(u*.42)),d.addColorStop(.35,_(u*.78)),d.addColorStop(1,_(u*.98)),e.fillStyle=d,e.fill(h);const T=e.createLinearGradient(0,c,0,c+a*.85);T.addColorStop(0,_(u*.2)),T.addColorStop(.5,_(u*.46)),T.addColorStop(1,_(u*.3)),e.fillStyle=T,e.fill(s),e.save(),e.clip(n);const w=e.createLinearGradient(0,0,t,0);w.addColorStop(0,y(.85)),w.addColorStop(.3,y(.15)),w.addColorStop(.85,y(0)),w.addColorStop(1,y(.25)),e.fillStyle=w,e.fillRect(-4,-t,t+8,t*2),e.lineCap="round";for(let M=1;M<8;M++){const E=M/8.5,k=Math.min(1,E+.16);for(const L of[-1,1])e.beginPath(),e.moveTo(t*E,p(E)),e.quadraticCurveTo(t*(E+.07),p(E+.07)+L*a*.35,t*k,p(k)+L*a*.85*(1-E*.8)),e.strokeStyle=y(.32),e.lineWidth=Math.max(1,a*.035),e.stroke()}e.restore(),e.beginPath(),e.moveTo(0,0),e.quadraticCurveTo(t*.5,0,t*.97,p(.97)),e.strokeStyle=y(.6),e.lineWidth=Math.max(1,a*.09),e.stroke(),e.beginPath(),e.moveTo(t*.05,-a*.06),e.quadraticCurveTo(t*.5,-a*.06,t*.9,p(.9)-a*.04),e.strokeStyle=me(.22),e.lineWidth=Math.max(1,a*.03),e.stroke(),e.strokeStyle=y(.7),e.lineWidth=Math.max(1,t*.006),e.stroke(n),e.restore()}function $e(e,i,r){const t=new Path2D;return t.moveTo(0,0),t.bezierCurveTo(e*.25,-i*1.1,e*.66,-i*.95,e,r),t.bezierCurveTo(e*.66,i*.8,e*.25,i*1,0,0),t}function Je(e,i,r,t,l,a){e.save(),e.translate(i,r),e.rotate(l.a),e.scale(1,l.k);for(const u of[!0,!1])for(let p=0;p<3;p++){const h=p*D/3+(u?Math.PI/3:0)+(a()-.5)*.25,s=t*(u?.9:1)*(.92+a()*.12),n=t*(u?.29:.34),c=n*(a()-.3)*.5,d=l.tone*(u?.68:1);e.save(),e.rotate(h);const T=$e(s,n,c),w=e.createLinearGradient(0,0,s,0);w.addColorStop(0,_(.04)),w.addColorStop(.16,_(d*.32)),w.addColorStop(.5,_(d*.97)),w.addColorStop(.82,_(d*.86)),w.addColorStop(1,_(d*.5)),e.fillStyle=w,e.fill(T),e.save(),e.clip(T);const M=e.createLinearGradient(0,-n,0,n);M.addColorStop(0,y(0)),M.addColorStop(.48,y(.05)),M.addColorStop(.55,y(.4)),M.addColorStop(1,y(.55)),e.fillStyle=M,e.fillRect(0,-n*1.2,s,n*2.4);for(let E=0;E<22;E++){const k=s*(.14+a()*.36),L=(a()-.5)*n*1.1*(k/s+.3);e.beginPath(),e.arc(k,L,t*(.006+a()*.01),0,D),e.fillStyle=y(.75),e.fill()}e.restore(),e.beginPath(),e.moveTo(s*.08,0),e.quadraticCurveTo(s*.5,n*.05,s*.86,c*.8),e.strokeStyle=y(.55),e.lineWidth=Math.max(1,n*.1),e.stroke(),e.beginPath(),e.moveTo(s*.12,-n*.1),e.quadraticCurveTo(s*.5,-n*.08,s*.8,c*.8-n*.08),e.strokeStyle=me(.28),e.lineWidth=Math.max(1,n*.04),e.stroke(),e.strokeStyle=y(.65),e.lineWidth=Math.max(1,t*.01),e.stroke(T),e.restore()}const m=e.createRadialGradient(0,0,0,0,0,t*.24);m.addColorStop(0,y(.95)),m.addColorStop(1,y(0)),e.fillStyle=m,e.beginPath(),e.arc(0,0,t*.24,0,D),e.fill(),e.lineCap="round";for(let u=0;u<7;u++){const p=u===6,h=p?a()*D:u*D/6+(a()-.5)*.6,s=t*(p?.62:.45+a()*.15),n=Math.cos(h)*s,c=Math.sin(h)*s,d=(a()-.5)*t*.2;e.beginPath(),e.moveTo(0,0),e.quadraticCurveTo(n*.5-Math.sin(h)*d,c*.5+Math.cos(h)*d,n,c),e.strokeStyle=y(.8),e.lineWidth=Math.max(1.5,t*.022),e.stroke(),e.strokeStyle=_(.72),e.lineWidth=Math.max(1,t*.011),e.stroke(),e.save(),e.translate(n,c),e.rotate(h+Math.PI/2+(a()-.5)*.8),e.beginPath(),p?e.arc(0,0,t*.03,0,D):e.ellipse(0,0,t*.06,t*.022,0,0,D);const T=e.createLinearGradient(0,-t*.022,0,t*.022);T.addColorStop(0,_(p?.8:.9)),T.addColorStop(1,_(.35)),e.fillStyle=T,e.fill(),e.restore()}e.restore()}function Qe(e,i,r,t,l,a){e.save(),e.translate(i,r),e.rotate(l.a),e.lineJoin="round";const m=l.tone,u=(h,s,n,c,d,T,w)=>{e.beginPath();const M=3+Math.floor(a()*3),E=a()*D;for(let L=0;L<=64;L++){const G=L/64*D,$=Math.max(0,Math.cos(G)),J=1+.05*Math.sin(M*G+E)*$+.025*Math.sin(11*G+E*2)-.07*Math.pow($,24),N=Math.cos(G)*n*J,q=Math.sin(G)*c*J,R=h+N*Math.cos(d)-q*Math.sin(d),Q=s+N*Math.sin(d)+q*Math.cos(d);L?e.lineTo(R,Q):e.moveTo(R,Q)}e.closePath();const k=e.createRadialGradient(0,0,T*.1,0,0,T);k.addColorStop(0,_(.03)),k.addColorStop(.55,_(w*.45)),k.addColorStop(.9,_(w*.95)),k.addColorStop(1,_(w)),e.fillStyle=k,e.fill(),e.strokeStyle=y(.75),e.lineWidth=Math.max(1.5,t*.014),e.stroke(),e.beginPath(),e.ellipse(h,s,n*.94,c*.94,d,-1.1,1.1),e.strokeStyle=me(.3),e.lineWidth=Math.max(1,t*.01),e.stroke()};for(let h=0;h<5;h++){const s=h*D/5+(a()-.5)*.4,n=t*.42;u(Math.cos(s)*n,Math.sin(s)*n,t*.6,t*.46,s,t,m*.85)}const p=16;for(let h=0;h<p;h++){const s=1-h/p,n=t*.72*Math.pow(s,.9),c=h*2.39996+a()*.2,d=n*.28;u(Math.cos(c)*d,Math.sin(c)*d,n*.78,n*.6,c,n*1.1,m*(.7+.3*s))}e.beginPath(),e.arc(0,0,t*.05,0,D),e.fillStyle=y(.9),e.fill(),e.restore()}function Ze(e,i,r,t,l){e.save(),e.translate(i,r),e.rotate(l.a);const a=new Path2D;a.moveTo(0,0),a.bezierCurveTo(t*.2,-t*.55,t*.9,-t*.35,t*1.5,0),a.bezierCurveTo(t*.9,t*.35,t*.2,t*.55,0,0);const m=e.createLinearGradient(0,-t*.45,0,t*.45);m.addColorStop(0,_(l.tone)),m.addColorStop(.45,_(l.tone*.7)),m.addColorStop(1,_(l.tone*.2)),e.fillStyle=m,e.fill(a),e.strokeStyle=y(.7),e.lineWidth=Math.max(1,t*.04),e.stroke(a),e.beginPath(),e.moveTo(t*.1,0),e.quadraticCurveTo(t*.8,-t*.08,t*1.45,0),e.strokeStyle=y(.5),e.stroke();for(const u of[-1,1])e.beginPath(),e.moveTo(0,0),e.quadraticCurveTo(t*.3,u*t*.5,t*.75,u*t*.32),e.quadraticCurveTo(t*.3,u*t*.2,0,0),e.fillStyle=_(.3),e.fill(),e.stroke();e.restore()}function et(e,i,r,t){e.width=i,e.height=r;const l=e.getContext("2d");if(!l)return;l.fillStyle="#000",l.fillRect(0,0,i,r);const a=Math.sqrt(i*r),{heart:m,blooms:u}=Ve(t,i/r),p=Ue(t^1540483477),h=m[0]*i,s=m[1]*r;l.lineCap="round";for(const n of u){if(n.kind==="leaf")continue;const c=n.x*i,d=n.y*r;l.beginPath(),l.moveTo(h,s),l.quadraticCurveTo((h+c)/2+(p()-.5)*a*.15,(s+d)/2,c,d),l.strokeStyle=y(1),l.lineWidth=a*.016,l.stroke(),l.strokeStyle=_(.4),l.lineWidth=a*.008,l.stroke()}for(const n of u){const c=n.x*i,d=n.y*r,T=n.r*a;n.kind==="leaf"?Ke(l,c,d,T,n):n.kind==="bud"?Ze(l,c,d,T,n):n.kind==="lily"?Je(l,c,d,T,n,p):Qe(l,c,d,T,n,p)}}const tt=`
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`,ot=`
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform sampler2D u_texA;
uniform sampler2D u_texB;
uniform vec4 u_scene;    // resolution.xy, time, dpr
uniform vec4 u_pointer;  // xy (device px, y up), presence, tear
uniform vec4 u_print;    // line spacing, mode, dot size, sway
uniform vec4 u_fx;       // lens radius, rebloom progress, intro, scan offset
uniform vec4 u_frame;    // aspect A, aspect B, frame inset, field seed
uniform vec4 u_post;     // grain, vignette
uniform vec3 u_ink;
uniform vec3 u_hot;
uniform vec3 u_bg;
uniform vec3 u_frameColor;

// Dave Hoskins hash12: even white noise with no lattice showing.
float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y);
}

// Object-fit: cover.
vec2 cover(vec2 uv, float texAspect) {
  float ca = u_scene.x / u_scene.y;
  vec2 s = ca > texAspect ? vec2(1.0, texAspect / ca) : vec2(ca / texAspect, 1.0);
  return clamp((uv - 0.5) * s + 0.5, 0.0, 1.0);
}

// A scan front falling from the top: 1 above it, 0 below, ragged per row.
float scanned(float fromTop, float row, float progress) {
  float front = progress * 1.2 - 0.1;
  return step(fromTop + (hash(vec2(row, 3.7)) - 0.5) * 0.05, front);
}

void main() {
  vec2 res = u_scene.xy;
  float time = u_scene.z;
  float dpr = u_scene.w;
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frag / res;
  float fromTop = 1.0 - uv.y;

  float sp = max(u_print.x, 1.5) * dpr;
  vec2 pd = (frag - u_pointer.xy) / dpr;
  float R = max(u_fx.x, 1.0);
  float lens = u_pointer.z * exp(-dot(pd, pd) / (R * R)) * step(1.0, u_fx.x);

  // Rows arch over the lens, and the whole sheet crawls.
  float ly = frag.y + u_fx.w * dpr + lens * sp * 1.8;
  float row = floor(ly / sp);
  float band = floor(frag.y / (sp * 3.0));

  // Sample point: breathing sway, lens magnification, torn rows.
  vec2 s = uv;
  s += u_print.w * 0.004 * vec2(
    sin(uv.y * 7.0 + time * 0.8) + 0.5 * sin(uv.y * 17.0 - time * 1.3),
    0.6 * sin(uv.x * 5.0 + time * 0.6));
  s -= (frag - u_pointer.xy) / res * lens * 0.4;
  float tick = floor(time * 9.0);
  float tear = u_pointer.w;
  float torn = step(1.0 - tear * 0.45, hash(vec2(band, tick)));
  s.x += (hash(vec2(band + 11.0, tick)) - 0.5) * tear * 0.09 * torn;

  float tone = texture2D(u_texA, cover(s, u_frame.x)).r;
  float swapping = step(u_fx.y, 0.999);
  if (swapping > 0.5) {
    float toneB = texture2D(u_texB, cover(s, u_frame.y)).r;
    tone = mix(tone, toneB, scanned(fromTop, row, u_fx.y));
  }
  tone *= scanned(fromTop, row, u_fx.z);
  tone = clamp((tone - 0.03) * 1.12, 0.0, 1.0);
  tone = min(1.0, tone + lens * 0.14 * step(0.02, tone));

  // Print mode per region: 0 lines, 1 stipple. Mixed mode stipples the bottom
  // through a noisy border; the lens flips whatever is under it.
  float field = noise(uv * vec2(2.2, 2.8) + u_frame.w * 1.37);
  float m = smoothstep(0.5, 0.18, uv.y + (field - 0.5) * 0.55);
  m = clamp(m * min(u_print.y, 1.0) + max(u_print.y - 1.0, 0.0), 0.0, 1.0);
  m = mix(m, 1.0 - m, lens);

  // Scanlines: thickness follows the tone, edges chewed by noise.
  float across = abs(fract(ly / sp) - 0.5) * 2.0;
  float rag = (noise(vec2(frag.x / (dpr * 2.5), row * 1.7)) - 0.5) * 0.45;
  float th = clamp(pow(tone, 0.8) * 1.05 + rag * tone, 0.0, 1.0);
  float aa = 1.4 / sp;
  float lines = 1.0 - smoothstep(th - aa, th + aa, across);
  float dotPx = max(1.0, floor(u_print.z * dpr + 0.5));
  vec2 cell = floor(frag / dotPx);
  lines *= step(0.1, hash(cell + 7.3)) * step(0.015, tone);

  // Stipple: a white-noise dither. It boils under the lens.
  float boil = floor(time * 10.0) * step(0.25, lens);
  float stipple = step(hash(cell + boil * vec2(17.0, 31.0)), pow(tone, 1.3) * 1.04);

  float lit = hash(cell + 91.0) < m ? stipple : lines;

  // Paper: grain, a faint ghost of the picture, the frame behind the ink.
  float grain = u_post.x;
  vec3 paper = u_bg * (1.0 - grain * 0.35 + grain * 0.7 * hash(cell + 5.0));
  paper += u_bg * (noise(frag / (dpr * 40.0)) - 0.5) * grain * 0.6;
  paper += u_ink * tone * 0.1;
  if (u_frame.z > 0.0) {
    vec2 edge = min(frag, res - frag) / dpr;
    float d = abs(min(edge.x, edge.y) - u_frame.z);
    float inside = step(u_frame.z - 1.0, min(edge.x, edge.y));
    paper = mix(paper, u_frameColor, (1.0 - smoothstep(0.5, 1.3, d)) * inside * 0.9);
  }

  vec3 ink = mix(u_ink * 0.5, u_ink, smoothstep(0.08, 0.55, tone));
  ink = mix(ink, u_hot, smoothstep(0.7, 1.0, tone) * 0.75 + lens * 0.15);
  vec3 col = mix(paper, ink, lit);

  // The scan fronts glow as they pass.
  float introFront = u_fx.z * 1.2 - 0.1;
  float swapFront = u_fx.y * 1.2 - 0.1;
  col += u_hot * 0.55 * lines * exp(-abs(fromTop - introFront) * 60.0) * step(u_fx.z, 0.999);
  col += u_hot * 0.55 * lines * exp(-abs(fromTop - swapFront) * 60.0) * swapping;

  // The loupe's edge: a dashed ring that turns slowly.
  float ringD = abs(length(pd) - R * 0.9);
  float dash = step(0.5, fract(atan(pd.y, pd.x) * 3.8197 + time * 0.15));
  float ring = u_pointer.z * (1.0 - smoothstep(0.4, 1.2, ringD)) * dash * step(1.0, u_fx.x);
  col = mix(col, u_hot, ring * 0.75);

  float vd = length(uv - 0.5) * 1.41421356;
  col *= 1.0 - u_post.y * smoothstep(0.4, 1.05, vd);
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;function nt(e,i,r){const t=e.createProgram();if(!t)return null;for(const[l,a]of[[e.VERTEX_SHADER,i],[e.FRAGMENT_SHADER,r]]){const m=e.createShader(l);if(!m)return null;if(e.shaderSource(m,a),e.compileShader(m),!e.getShaderParameter(m,e.COMPILE_STATUS))return console.warn(e.getShaderInfoLog(m)),e.deleteShader(m),e.deleteProgram(t),null;e.attachShader(t,m),e.deleteShader(m)}return e.linkProgram(t),e.getProgramParameter(t,e.LINK_STATUS)?t:(console.warn(e.getProgramInfoLog(t)),e.deleteProgram(t),null)}function rt(){const[e,i]=C.useState(!1);return C.useEffect(()=>{const r=window.matchMedia("(prefers-reduced-motion: reduce)"),t=()=>i(r.matches);return t(),r.addEventListener("change",t),()=>r.removeEventListener("change",t)},[]),e}const at=1700,it=1300,Ge=e=>e<.5?2*e*e:1-Math.pow(-2*e+2,2)/2;function lt({src:e,seed:i=7,ink:r="#e3161f",highlight:t="#ff6a4f",background:l="#0b0909",mode:a="mixed",lineSpacing:m=5,dotSize:u=1.6,frame:p=!0,frameInset:h=18,frameColor:s,lensRadius:n=150,glitch:c=.3,sway:d=1,scanSpeed:T=5,grain:w=.5,vignette:M=.35,interactive:E=!0,onBloom:k,paused:L=!1,label:G="Red lilies and roses printed in scanlines on black paper",height:$="100svh",className:J="",children:N}){const q=C.useRef(null),R=rt(),[Q,ze]=C.useState(0),[Xe,ve]=C.useState(!1),ge={ink:r,highlight:t,background:l,frameColor:s??r,mode:a,lineSpacing:m,dotSize:u,frame:p,frameInset:h,lensRadius:n,glitch:c,sway:d,scanSpeed:T,grain:w,vignette:M,seed:i,paused:L},ie=C.useRef(ge);ie.current=ge;const Z=C.useRef(k);Z.current=k;const se=C.useRef(()=>{}),Y=C.useRef(()=>{});C.useEffect(()=>{const v=q.current;if(!v)return;const o=v.getContext("webgl",{antialias:!1,alpha:!1});if(!o){ve(!0);return}const H=nt(o,tt,ot);if(!H){ve(!0);return}const _e=o.createBuffer();o.bindBuffer(o.ARRAY_BUFFER,_e),o.bufferData(o.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),o.STATIC_DRAW);const ye=o.getAttribLocation(H,"a_position");o.enableVertexAttribArray(ye),o.vertexAttribPointer(ye,2,o.FLOAT,!1,0,0),o.useProgram(H);const P=f=>o.getUniformLocation(H,f),A={texA:P("u_texA"),texB:P("u_texB"),scene:P("u_scene"),pointer:P("u_pointer"),print:P("u_print"),fx:P("u_fx"),frame:P("u_frame"),post:P("u_post"),ink:P("u_ink"),hot:P("u_hot"),bg:P("u_bg"),frameColor:P("u_frameColor")};o.uniform1i(A.texA,0),o.uniform1i(A.texB,1);const be=()=>{const f=o.createTexture();return o.bindTexture(o.TEXTURE_2D,f),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MAG_FILTER,o.LINEAR),o.texImage2D(o.TEXTURE_2D,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,new Uint8Array([0,0,0,255])),f};let z=be(),O=be(),j=1,le=1;o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,!0);const Se=(f,S)=>{o.bindTexture(o.TEXTURE_2D,f),o.texImage2D(o.TEXTURE_2D,0,o.RGBA,o.RGBA,o.UNSIGNED_BYTE,S)},we=document.createElement("canvas");let X=null,V=0,fe=0,x=ie.current.seed;const ee=(f,S)=>{if(X)return Se(f,X),X.naturalWidth/Math.max(1,X.naturalHeight);const g=window.devicePixelRatio||1,[U,W]=Be(v.clientWidth||1,v.clientHeight||1,g);return et(we,U,W,S),V=U,fe=W,Se(f,we),U/W},b={x:0,y:0,inside:!1,speed:0,lastX:0,lastY:0,lastT:0};let te=0,oe=0,Me=0,ue=0,ne=0,I=0,re=-1,F=-1,de=x;const We=()=>{const f=Math.min(window.devicePixelRatio||1,2),S=Math.max(1,Math.round(v.clientWidth*f)),g=Math.max(1,Math.round(v.clientHeight*f));(v.width!==S||v.height!==g)&&(v.width=S,v.height=g)};let ce=0;const Ne=()=>{if(X||!V)return;const[f,S]=Be(v.clientWidth||1,v.clientHeight||1,window.devicePixelRatio||1);Math.abs(f/S-V/fe)/(V/fe)<.04&&f<=V*1.25||(window.clearTimeout(ce),ce=window.setTimeout(()=>{j=ee(z,x),B()},160))},Ee=f=>{var Ie;I=0;const S=ne?Math.min((f-ne)/1e3,.05):.016;ne=f,We();const g=ie.current,U=!R&&!g.paused;U&&(Me+=S,ue=(ue+S*g.scanSpeed)%(Math.max(g.lineSpacing,1)*240)),re<0&&(re=f);const W=R?1:Math.min(1,(f-re)/at);let pe=1;if(F>=0&&(pe=R?1:Math.min(1,(f-F)/it),pe>=1)){const Oe=z;z=O,O=Oe,j=le,x=de,F=-1,(Ie=Z.current)==null||Ie.call(Z,x)}te+=((b.inside?1:0)-te)*(R?1:1-Math.exp(-S/.18)),b.speed*=Math.exp(-S/.12);const Re=R?0:Math.min(1,g.glitch*.25+b.speed/2600);oe+=(Re-oe)*(1-Math.exp(-S/.08));const he=v.width/Math.max(1,v.clientWidth),Ye=g.mode==="lines"?0:g.mode==="stipple"?2:1;o.viewport(0,0,v.width,v.height),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,z),o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_2D,O),o.uniform4f(A.scene,v.width,v.height,Me,he),o.uniform4f(A.pointer,b.x*he,(v.clientHeight-b.y)*he,te,oe),o.uniform4f(A.print,g.lineSpacing,Ye,g.dotSize,R?0:g.sway),o.uniform4f(A.fx,g.lensRadius,Ge(pe),Ge(W),ue),o.uniform4f(A.frame,j,le,g.frame?g.frameInset:0,g.seed%97),o.uniform4f(A.post,g.grain,g.vignette,0,0),o.uniform3fv(A.ink,ae(g.ink)),o.uniform3fv(A.hot,ae(g.highlight)),o.uniform3fv(A.bg,ae(g.background)),o.uniform3fv(A.frameColor,ae(g.frameColor)),o.drawArrays(o.TRIANGLES,0,3);const He=W<1||F>=0||Math.abs((b.inside?1:0)-te)>.002||Math.abs(oe-Re)>.002;(U||He)&&!document.hidden&&(I=requestAnimationFrame(Ee))},B=()=>{!I&&!document.hidden&&(I=requestAnimationFrame(Ee))},qe=f=>{F>=0||(de=f??je(x),le=ee(O,de),F=performance.now(),B())};if(j=ee(z,x),B(),se.current=B,Y.current=qe,e){const f=new Image;f.crossOrigin="anonymous",f.decoding="async",f.onload=()=>{X=f;try{j=ee(z,x),re=-1}catch{X=null}B()},f.src=e}const ke=new ResizeObserver(()=>{Ne(),B()});ke.observe(v);const Ce=f=>{const S=v.getBoundingClientRect();b.inside=f.clientX>=S.left&&f.clientX<=S.right&&f.clientY>=S.top&&f.clientY<=S.bottom,b.x=f.clientX-S.left,b.y=f.clientY-S.top;const g=f.timeStamp||performance.now();if(b.lastT&&g>b.lastT){const U=Math.hypot(f.clientX-b.lastX,f.clientY-b.lastY)/((g-b.lastT)/1e3);b.inside&&(b.speed=Math.max(b.speed,Math.min(U,6e3)))}b.lastX=f.clientX,b.lastY=f.clientY,b.lastT=g,B()},Pe=()=>{b.inside=!1,B()},Ae=()=>{document.hidden?(cancelAnimationFrame(I),I=0):(ne=0,B())},Le=f=>{f.preventDefault(),cancelAnimationFrame(I),I=0},De=()=>ze(f=>f+1);return window.addEventListener("pointermove",Ce,{passive:!0}),document.documentElement.addEventListener("pointerleave",Pe),document.addEventListener("visibilitychange",Ae),v.addEventListener("webglcontextlost",Le),v.addEventListener("webglcontextrestored",De),()=>{se.current=()=>{},Y.current=()=>{},cancelAnimationFrame(I),window.clearTimeout(ce),ke.disconnect(),window.removeEventListener("pointermove",Ce),document.documentElement.removeEventListener("pointerleave",Pe),document.removeEventListener("visibilitychange",Ae),v.removeEventListener("webglcontextlost",Le),v.removeEventListener("webglcontextrestored",De),o.deleteTexture(z),o.deleteTexture(O),o.deleteBuffer(_e),o.deleteProgram(H)}},[R,Q,e]);const Te=C.useRef(i);C.useEffect(()=>{Te.current!==i&&(Te.current=i,Y.current(i))},[i]),C.useEffect(()=>se.current());const xe=v=>{!E||v.target.closest("a, button, input, select, textarea, label, [data-no-bloom]")||Y.current()},Fe=v=>{!E||v.key!=="Enter"&&v.key!==" "||(v.preventDefault(),Y.current())};return K.jsxs("section",{className:"relative w-full overflow-hidden "+(E?"cursor-crosshair ":"")+J,style:{height:$,background:l},onClick:xe,children:[Xe?K.jsx("div",{"aria-hidden":"true",className:"absolute inset-0",style:{background:"repeating-linear-gradient(0deg, "+l+" 0 3px, transparent 3px 5px), radial-gradient(ellipse at 45% 45%, "+r+" 0%, "+l+" 62%)",boxShadow:p?"inset 0 0 0 "+h+"px "+l+", inset 0 0 0 "+(h+1.5)+"px "+(s??r):void 0}}):K.jsx("canvas",{ref:q,"aria-hidden":"true",className:"pointer-events-none absolute inset-0 block h-full w-full"}),K.jsx("div",{role:E?"button":"img",tabIndex:E?0:void 0,"aria-label":E?G+". Press Enter to rebloom.":G,onKeyDown:Fe,className:"absolute inset-0 outline-none focus-visible:ring-2 focus-visible:ring-inset",style:{"--tw-ring-color":r}}),N&&K.jsx("div",{className:"pointer-events-none absolute inset-0 z-10 [&>*]:pointer-events-auto",children:N})]})}export{lt as S};
