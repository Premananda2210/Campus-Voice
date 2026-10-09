import{r as p,j as n}from"./index-CdiR0C0d.js";const Ee=28;function Te(t,v){const u={score:0,sweep:0,roundness:0,closure:0,cx:0,cy:0,r:0,ok:!1};if(t.length<12)return u;let m=0,F=0;for(const i of t)m+=i.x,F+=i.y;const _=m/t.length,k=F/t.length,w=t.map(i=>Math.hypot(i.x-_,i.y-k));let z=0;for(const i of w)z+=i;const x=z/w.length;if(x<Ee)return{...u,cx:_,cy:k,r:x};let N=0;for(const i of w)N+=(i-x)*(i-x);const B=1-Math.min(Math.sqrt(N/w.length)/x,1);let S=0,E=null;for(let i=0;i<t.length;i++){if(w[i]<x*.2){E=null;continue}const s=Math.atan2(t[i].y-k,t[i].x-_);if(E!==null){let o=s-E;for(;o>Math.PI;)o-=2*Math.PI;for(;o<-Math.PI;)o+=2*Math.PI;Math.abs(o)<Math.PI/2&&(S+=o)}E=s}const U=Math.abs(S)/(Math.PI*2),D=t[t.length-1],q=Math.hypot(t[0].x-D.x,t[0].y-D.y),A=1-Math.min(q/(x*2),1),P=B*.5+Math.min(U,1)*.3+A*.2;return{score:P,sweep:U,roundness:B,closure:A,cx:_,cy:k,r:x,ok:P>=v&&U>=.75}}const Re=`#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,ze=`#version 300 es
precision highp float;
uniform sampler2D uPrev;
uniform vec2 uRes;
uniform vec2 uA;
uniform vec2 uB;
uniform float uDown;
uniform float uBrush;
uniform float uDecay;
uniform float uAspect;
out vec4 o;

float segDist(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);
  return length(pa - ba * h);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float heat = texture(uPrev, uv).r * uDecay;
  if (uDown > 0.5) {
    vec2 sc = vec2(uAspect, 1.0);
    float d = segDist(uv * sc, uA * sc, uB * sc);
    heat = max(heat, 1.0 - smoothstep(uBrush * 0.2, uBrush, d));
  }
  o = vec4(heat, 0.0, 0.0, 1.0);
}`,Me=`#version 300 es
precision highp float;
uniform sampler2D uHeat;
uniform vec2 uRes;
uniform float uTime;
uniform float uWipe;
uniform float uFlash;
uniform float uOpen;
uniform vec3 uZero;
uniform float uAspect;
uniform vec3 uBase;
uniform vec3 uFrost;
uniform vec3 uMelt;
uniform vec3 uGlow;
out vec4 o;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

vec2 hash2(vec2 p) {
  return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.02 + vec2(3.1, 1.7);
    a *= 0.5;
  }
  return v;
}

// Ridged noise. abs() folds the field about its midline, and the fold itself is
// a LINE. That is the whole trick: plain fbm can only ever make blobs, so no
// amount of thresholding it will produce a crack.
float ridged(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * (1.0 - abs(noise(p) * 2.0 - 1.0));
    p = p * 2.13 + vec2(7.7, 2.9);
    a *= 0.5;
  }
  return v;
}

// Voronoi F2 - F1: near zero exactly where two cells meet, so it draws the
// polygonal boundaries a real sheet of ice fractures along.
float cellEdge(vec2 p) {
  vec2 n = floor(p);
  vec2 f = fract(p);
  float f1 = 8.0;
  float f2 = 8.0;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      float d = length(g + hash2(n + g) - f);
      if (d < f1) { f2 = f1; f1 = d; } else if (d < f2) { f2 = d; }
    }
  }
  return f2 - f1;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 sp = vec2(uv.x * uAspect, uv.y);
  float t = uTime;

  /* ------------------------------------------------------------------ ice */
  float caustic = fbm(sp * 9.0 + vec2(t * 0.035, t * 0.025));
  float warpC = fbm(sp * 3.0) * 0.55;

  // Cracks have to be SPARSE. An even Voronoi net at full strength reads as
  // cellular skin, not ice; real ice is mostly clear with fracture running in
  // patches, so a low-frequency mask decides where any of it shows at all.
  float where = smoothstep(0.34, 0.72, fbm(sp * 2.1 + 11.3));
  float plates = (1.0 - smoothstep(0.0, 0.018, cellEdge(sp * 4.2 + warpC))) * where;
  float shards = (1.0 - smoothstep(0.0, 0.028, cellEdge(sp * 9.5 - warpC * 0.7)))
               * (1.0 - where) * 0.7;
  float fil = pow(ridged(sp * 30.0), 5.0);
  float web = pow(ridged(sp * 8.0 + vec2(t * 0.02, 0.0)), 2.0);

  // Broad soft light bands first, hard lines on top of them.
  vec3 ice = mix(uFrost * 0.62, uFrost * 1.06, caustic);
  ice = mix(ice, uFrost * 1.22, web * 0.55);
  ice = mix(ice, vec3(1.0), plates * 0.5);
  ice = mix(ice, vec3(1.0), shards * 0.22);
  ice = mix(ice, vec3(1.0), fil * 0.5);
  ice *= 0.86 + 0.28 * caustic;

  vec3 base = uBase * (0.82 + 0.35 * uv.y);

  /* ---------------------------------------------------------- sheet wipe */
  // GLSL smoothstep is undefined when edge0 > edge1, so every ramp here runs
  // low-to-high and is inverted explicitly where it needs to fall off.
  float front = uWipe * 1.25 - 0.12 + fbm(sp * 7.0) * 0.12;
  float depth = 1.0 - uv.y;
  float sheet = 1.0 - smoothstep(front - 0.05, front + 0.05, depth);
  vec3 surface = mix(base, ice, sheet);

  /* ---------------------------------------------------------------- melt */
  float heat = texture(uHeat, uv).r;
  // Frequencies matter more than amplitudes: the low octave has to be around
  // the brush width, or it slides the whole boundary instead of lobing it.
  // Three octaves, and the top one matters most: it has to be fine enough to
  // fray the boundary itself. Low octaves only slide the whole edge around.
  float warp = fbm(sp * 7.0 + t * 0.03) * 0.42
             + fbm(sp * 18.0 - t * 0.05) * 0.26
             + fbm(sp * 40.0) * 0.16;
  // Keep the raw field: the hole and its rim need different, WIDER bands of it.
  // Deriving the rim from the already-thresholded hole is what made it a
  // 3px outline instead of the soft cloud that sells the ice as melting.
  float hw = heat + warp - 0.42;
  float m = smoothstep(0.30, 0.58, hw);

  /* ------------------------------------------------------------- opening */
  // Once a zero is accepted the hole grows out of the ring that was drawn.
  // Cross-fading the whole frame to white instead throws away the one moment
  // the interaction is actually paying off.
  float dz = length((uv - uZero.xy) * vec2(uAspect, 1.0));
  float grow = 0.0;
  if (uOpen > 0.001) {
    float radius = uZero.z * (0.92 + uOpen * uOpen * 2.2);
    float edge = 0.03 + uOpen * 0.10;
    float g = 1.0 - smoothstep(radius - edge, radius + edge, dz);
    // Heavier warp against a narrower band: the front lobes and frays instead
    // of expanding as a clean circle.
    grow = smoothstep(0.40, 0.60, g + warp * 0.78 - 0.39);
  }
  float mm = max(m, grow);

  // hw is zero-mean away from the stroke, so a rim band this wide would light
  // up anywhere the warp noise peaks. Gate it on heat actually being present.
  float touched = smoothstep(0.008, 0.22, heat);
  float rim = smoothstep(-0.03, 0.30, hw) * (1.0 - smoothstep(0.34, 0.74, hw)) * touched;
  rim = max(rim, smoothstep(0.15, 0.55, grow) * (1.0 - smoothstep(0.55, 0.95, grow)));

  // Half-melted ice keeps a wet tint before it opens; fully melted is a HOLE,
  // and the page behind the canvas is what shows through it.
  vec3 col = mix(surface, mix(surface, uMelt, 0.6), smoothstep(0.0, 0.6, mm) * touched * sheet);
  col += uGlow * rim * sheet * 2.7;

  // Only what the pointer melted is a HOLE. The opening is not a bigger hole:
  // it is light pouring out of the ring, which is why it fills rather than
  // reveals. Driving alpha down with it made the page show through instead.
  float a = 1.0 - smoothstep(0.40, 0.66, hw) * touched * sheet;

  if (uOpen > 0.001) {
    col = mix(col, vec3(1.0, 0.972, 0.86), grow * 0.94);
    a = max(a, grow * 0.97);
    float core = (1.0 - smoothstep(0.0, uZero.z * 1.6, dz)) * uOpen;
    col = mix(col, vec3(1.0, 0.985, 0.92), core * 0.85);
    a = max(a, core * 0.95);
  }

  col = mix(col, vec3(1.0), uFlash);
  a = max(a, uFlash);
  o = vec4(col, a);
}`,Fe=`
.zmp-root {
  --zmp-ease-out: cubic-bezier(0.23, 1, 0.32, 1);
  --zmp-ease-io: cubic-bezier(0.77, 0, 0.175, 1);
  cursor: grab;
}
.zmp-root[data-status="drawing"] { cursor: grabbing; }
.zmp-root[data-status="open"] { cursor: auto; }
.zmp-hud {
  transition: opacity 260ms var(--zmp-ease-out), transform 260ms var(--zmp-ease-out);
}
.zmp-hud[data-hide="true"] { opacity: 0; transform: scale(0.98); }
.zmp-hud[data-hide="dim"] { opacity: 0.28; }
.zmp-hud[data-shake="true"] { animation: zmp-shake 320ms var(--zmp-ease-out); }
.zmp-veil {
  transition: opacity 620ms var(--zmp-ease-io);
}
.zmp-reward {
  animation: zmp-pop 620ms var(--zmp-ease-out) both;
}
.zmp-spark {
  animation: zmp-spark 900ms var(--zmp-ease-out) both;
}
.zmp-enter { transition: transform 160ms var(--zmp-ease-out); }
.zmp-enter:active { transform: scale(0.97); }
@keyframes zmp-shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-6px); }
  40% { transform: translateX(5px); }
  60% { transform: translateX(-3px); }
  80% { transform: translateX(2px); }
}
@keyframes zmp-pop {
  from { opacity: 0; transform: translateY(6px) scale(0.94); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes zmp-spark {
  0% { opacity: 0; transform: scale(0.4) rotate(-25deg); }
  45% { opacity: 1; transform: scale(1.15) rotate(0deg); }
  100% { opacity: 1; transform: scale(1) rotate(0deg); }
}
@media (prefers-reduced-motion: reduce) {
  .zmp-hud, .zmp-veil { transition-duration: 1ms; }
  .zmp-hud[data-shake="true"], .zmp-reward, .zmp-spark { animation: none; }
}
`;function ue(t,v,u){const m=t.createShader(v);if(t.shaderSource(m,u),t.compileShader(m),!t.getShaderParameter(m,t.COMPILE_STATUS))throw new Error(t.getShaderInfoLog(m)||"shader compile failed");return m}function fe(t,v){const u=t.createProgram();if(t.attachShader(u,ue(t,t.VERTEX_SHADER,Re)),t.attachShader(u,ue(t,t.FRAGMENT_SHADER,v)),t.linkProgram(u),!t.getProgramParameter(u,t.LINK_STATUS))throw new Error(t.getProgramInfoLog(u)||"program link failed");return u}function le(t,v,u){const m=t.createTexture();t.bindTexture(t.TEXTURE_2D,m),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,v,u,0,t.RGBA,t.UNSIGNED_BYTE,null),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE);const F=t.createFramebuffer();return t.bindFramebuffer(t.FRAMEBUFFER,F),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,m,0),{tex:m,fbo:F}}const W=t=>{const v=t.replace("#",""),u=parseInt(v.length===3?v.replace(/./g,m=>m+m):v,16);return[(u>>16&255)/255,(u>>8&255)/255,(u&255)/255]};function Ae({children:t,prompt:v="Draw a zero",hint:u="Trace a full circle to melt your way in",wordmark:m="zero",retryHint:F="Not quite — one closed circle",tolerance:_=.6,brush:k=.075,loadMs:w=1800,reward:z="+100 XP",baseColor:x="#1d6b52",frostColor:N="#9fd8c0",meltColor:B="#48c257",glowColor:S="#eafff4",onUnlock:E,className:U=""}){const D=p.useRef(null),q=p.useRef(null),A=p.useRef([]),P=p.useRef(null),i=p.useRef([]),s=p.useRef({down:!1,a:[.5,.5],b:[.5,.5],decay:1,flash:0,open:0,zero:[.5,.5,.15],brushK:1,start:0}),[o,T]=p.useState("loading"),[he,me]=p.useState(99),[$,ee]=p.useState(!1),[Z,te]=p.useState(!1),[pe,re]=p.useState(!0),[de,K]=p.useState(""),oe=p.useRef(o);oe.current=o;const X=(r,e)=>{i.current.push(setTimeout(r,e))};p.useEffect(()=>{const r=q.current;if(!r)return;const e=r.getContext("webgl2",{alpha:!0,premultipliedAlpha:!1,antialias:!1,depth:!1});if(!e){te(!0);return}let f,a;try{f=fe(e,ze),a=fe(e,Me)}catch{te(!0);return}const d=e.createVertexArray();e.bindVertexArray(d);let h=[],R=0,I=0,g=0,O=0;const L=performance.now();s.current.start=L;const G=()=>{const y=Math.min(window.devicePixelRatio||1,1.5),c=Math.max(1,Math.round(r.clientWidth*y)),j=Math.max(1,Math.round(r.clientHeight*y));if(r.width===c&&r.height===j&&h.length)return;r.width=c,r.height=j;const H=Math.max(1,Math.round(c/2)),Q=Math.max(1,Math.round(j/2));for(const V of h)e.deleteTexture(V.tex),e.deleteFramebuffer(V.fbo);h=[le(e,H,Q),le(e,H,Q)],R=H,I=Q;for(const V of h)e.bindFramebuffer(e.FRAMEBUFFER,V.fbo),e.clearColor(0,0,0,1),e.clear(e.COLOR_BUFFER_BIT)},C=new ResizeObserver(G);C.observe(r),G();const l=(y,c)=>e.getUniformLocation(y,c),M={prev:l(f,"uPrev"),res:l(f,"uRes"),a:l(f,"uA"),b:l(f,"uB"),down:l(f,"uDown"),brush:l(f,"uBrush"),decay:l(f,"uDecay"),aspect:l(f,"uAspect")},b={heat:l(a,"uHeat"),res:l(a,"uRes"),time:l(a,"uTime"),wipe:l(a,"uWipe"),flash:l(a,"uFlash"),open:l(a,"uOpen"),zero:l(a,"uZero"),aspect:l(a,"uAspect"),base:l(a,"uBase"),frost:l(a,"uFrost"),melt:l(a,"uMelt"),glow:l(a,"uGlow")},be=W(x),we=W(N),ge=W(B),ye=W(S),ce=y=>{if(O=requestAnimationFrame(ce),!h.length)return;const c=s.current,j=r.width/Math.max(r.height,1),H=h[1-g];e.bindFramebuffer(e.FRAMEBUFFER,H.fbo),e.viewport(0,0,R,I),e.useProgram(f),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,h[g].tex),e.uniform1i(M.prev,0),e.uniform2f(M.res,R,I),e.uniform2f(M.a,c.a[0],c.a[1]),e.uniform2f(M.b,c.b[0],c.b[1]),e.uniform1f(M.down,c.down?1:0),e.uniform1f(M.brush,k*c.brushK),e.uniform1f(M.decay,c.decay),e.uniform1f(M.aspect,j),e.drawArrays(e.TRIANGLES,0,3),g=1-g,c.a=c.b,e.bindFramebuffer(e.FRAMEBUFFER,null),e.viewport(0,0,r.width,r.height),e.useProgram(a),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,h[g].tex),e.uniform1i(b.heat,0),e.uniform2f(b.res,r.width,r.height),e.uniform1f(b.time,(y-L)/1e3),e.uniform1f(b.wipe,Math.min((y-c.start)/Math.max(w,1),1)),e.uniform1f(b.flash,c.flash),e.uniform1f(b.open,c.open),e.uniform3f(b.zero,c.zero[0],c.zero[1],c.zero[2]),e.uniform1f(b.aspect,j),e.uniform3fv(b.base,be),e.uniform3fv(b.frost,we),e.uniform3fv(b.melt,ge),e.uniform3fv(b.glow,ye),e.drawArrays(e.TRIANGLES,0,3)};return O=requestAnimationFrame(ce),()=>{cancelAnimationFrame(O),C.disconnect();for(const y of h)e.deleteTexture(y.tex),e.deleteFramebuffer(y.fbo);e.deleteProgram(f),e.deleteProgram(a),e.deleteVertexArray(d)}},[x,N,B,S,k,w]),p.useEffect(()=>{if(o!=="loading")return;const r=performance.now();let e=0;const f=a=>{const d=Math.min((a-r)/Math.max(w,1),1);me(Math.round(99*(1-d))),d<1?e=requestAnimationFrame(f):T("idle")};return e=requestAnimationFrame(f),()=>cancelAnimationFrame(e)},[o,w]),p.useEffect(()=>()=>{i.current.forEach(clearTimeout)},[]);const ae=r=>{const e=P.current;return e?{px:r.clientX-e.left,py:r.clientY-e.top,u:(r.clientX-e.left)/e.width,v:1-(r.clientY-e.top)/e.height}:null},se=r=>{const e=ae(r),f=P.current;if(!e||!f)return;const a=A.current,d=a[a.length-1];if(!(d&&Math.hypot(e.px-d.x,e.py-d.y)<3)){if(d){const h=Math.hypot(e.px-d.x,e.py-d.y)/Math.max(f.height,1),R=1.18-Math.min(h/.03,1)*.62;s.current.brushK+=(R-s.current.brushK)*.35}a.push({x:e.px,y:e.py}),s.current.b=[e.u,e.v],Z&&K(h=>(a.length===1?"M ":h+" L ")+e.px+" "+e.py)}},ve=r=>{if(o==="unlocking"||o==="open"||o==="loading")return;i.current.forEach(clearTimeout),i.current=[],r.currentTarget.setPointerCapture(r.pointerId),P.current=D.current?D.current.getBoundingClientRect():null,A.current=[],K(""),ee(!1);const e=ae(r);e&&(s.current.a=[e.u,e.v],s.current.b=[e.u,e.v]),s.current.decay=1,s.current.brushK=1,s.current.open=0,s.current.down=!0,re(!1),T("drawing"),se(r)},ne=()=>{if(oe.current!=="drawing")return;s.current.down=!1;const r=Te(A.current,_);if(!r.ok){T("fail"),ee(!0),s.current.decay=.93,X(()=>{s.current.decay=1,A.current=[],K(""),T("idle")},700);return}T("unlocking");const e=P.current,f=e?e.height:1,a=e?e.width:1;s.current.zero=[r.cx/a,1-r.cy/f,r.r/f];const d=performance.now();s.current.decay=1;const h=620,R=260,I=O=>{const L=O-d,G=Math.min(L/h,1);s.current.open=1-(1-G)*(1-G);const C=Math.min(Math.max(L-h,0)/R,1);s.current.flash=C*C,L<h+R&&requestAnimationFrame(I)};requestAnimationFrame(I);const g=h+R+40;X(()=>T(z?"reward":"open"),g),z&&X(()=>T("open"),g+1100),X(()=>{E&&E()},z?g+1100:g)},xe=()=>{o==="unlocking"||o==="open"||(T("unlocking"),s.current.open=1,s.current.flash=1,X(()=>{T("open"),E&&E()},260))},Y=o==="open",J=o!=="open"&&o!=="reward",ie=o==="unlocking"?"true":o==="drawing"?"dim":"false";return n.jsxs(n.Fragment,{children:[n.jsx("style",{children:Fe}),n.jsxs("div",{ref:D,"data-status":o,className:"zmp-root relative isolate h-full w-full select-none overflow-hidden bg-background text-foreground "+U,children:[n.jsx("div",{className:"absolute inset-0 z-0",children:t}),J&&n.jsxs("div",{className:"absolute inset-0 z-10",style:{touchAction:"none",backgroundColor:Z?x:void 0},onPointerDown:ve,onPointerMove:r=>{o==="drawing"&&se(r)},onPointerUp:ne,onPointerCancel:ne,"aria-hidden":"true",children:[n.jsx("canvas",{ref:q,className:"block h-full w-full"}),Z&&n.jsx("svg",{className:"absolute inset-0 h-full w-full",fill:"none",children:n.jsx("path",{d:de,stroke:S,strokeWidth:14,strokeLinecap:"round",strokeLinejoin:"round",opacity:.9})}),n.jsx("div",{className:"pointer-events-none absolute inset-x-0 bottom-0 p-8 sm:p-12",children:n.jsx("span",{className:"zmp-mark block text-7xl font-bold leading-[0.8] tracking-tight text-white/95 sm:text-8xl",style:{textShadow:"0 2px 30px rgba(0,0,0,0.18)"},children:o==="loading"?he:m})}),n.jsx("div",{className:"pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center",children:o!=="loading"&&n.jsxs(n.Fragment,{children:[n.jsx("p",{className:"zmp-hud text-[11px] font-medium uppercase tracking-[0.3em] text-black/45","data-hide":ie,"data-shake":String(o==="fail"),children:v}),($||u)&&n.jsx("p",{className:"zmp-hud text-[10px] uppercase tracking-[0.2em] text-black/30","data-hide":ie,"data-shake":String(o==="fail"),children:$?F:u})]})})]}),!pe&&!J&&n.jsx("div",{className:"zmp-veil pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-white",style:{opacity:Y?0:1},onTransitionEnd:()=>Y&&re(!0),children:(o==="reward"||Y)&&z&&n.jsxs(n.Fragment,{children:[n.jsx("svg",{viewBox:"0 0 24 24",className:"zmp-spark h-10 w-10","aria-hidden":"true",children:n.jsx("path",{d:"M12 1.5l2.2 6.1 6.3 2.4-6.3 2.4L12 18.5l-2.2-6.1L3.5 10l6.3-2.4z",fill:"#f5c518"})}),n.jsx("span",{className:"zmp-reward text-sm font-medium tracking-wide text-neutral-400",children:z})]})}),J&&n.jsx("button",{type:"button",onClick:xe,className:"zmp-enter sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:bottom-8 focus-visible:left-1/2 focus-visible:z-30 focus-visible:-translate-x-1/2 focus-visible:rounded-full focus-visible:border focus-visible:border-white/30 focus-visible:bg-black/40 focus-visible:px-5 focus-visible:py-2 focus-visible:text-sm focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",children:"Skip and enter"})]})]})}export{Ae as Z};
